import React, { useContext, useEffect, useState, useRef, useCallback, useMemo, memo } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import useSound from "use-sound";
import nextDayAudio from "../../public/sounds/nextDayAudio.mp3";
import newStageAudio from "../../public/sounds/newStageAudio.mp3";
import { LoadingScreen } from "./LoadingScreen";
import { executarLiquidacaoAutomatica } from "./SlotManager";
import musicaTemaLoading from "../../public/sounds/Swinging Sweet.ogg";
import musicaCentral from "../../public/sounds/S31-The Gears of Progress.ogg";
import clockAudio from "../../public/sounds/freesound_community-kitchen-timer-87485.mp3";
import { DraftSystemContinuo, DraftSystemInicial, useDraftContinuo, getRankPorDia } from "./DraftSystem.jsx";
import { ModalSetorSelection } from "./ModalSetorSelection.jsx";

// ─── CONSTANTES (FORA DO COMPONENTE) ──────────────────────────────
const TODAS_LOJAS = ["terrenos", "lojasP", "lojasM", "lojasG"];
const SETORES_ARR = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

const FATOR_ECONOMIA = {
    recessão: 0.4,
    declinio: 0.8,
    estável: 1,
    progressiva: 1.1,
    aquecida: 1.25
};

// ─── MAPA DE ESTADOS ECONÔMICOS ──────────────────────────────────
const ESTADO_ECONOMIA = {
    recessão: 0.4,
    declinio: 0.8,
    estável: 1,
    progressiva: 1.1,
    aquecida: 1.25
};

// ─── COMPONENTE TOOLTIP (MEMOIZADO) ─────────────────────────────
const TooltipPadrao = memo(({ id }) => {
    const tooltipStyle = {
        backgroundColor: "#FFFFFF",
        color: "#350973",
        borderRadius: "6px",
        padding: "6px 10px",
        fontWeight: "600",
        fontSize: "14px",
    };
    return (
        <Tooltip
            id={id}
            style={tooltipStyle}
            border="1px solid #350973"
        />
    );
});

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────
export const SystemTurn = memo(() => {
    const { dados, atualizarDados, atualizarDadosProf2 } = useContext(CentraldeDadosContext);
    const {
        economiaSetores,
        setEconomiaSetores,
        atualizarEcoSafely,
        atualizarEco,
    } = useContext(DadosEconomyGlobalContext);

    // ─── SOUND HOOKS ──────────────────────────────────────────────
    const [buttonNextDayAudio] = useSound(nextDayAudio);
    const [buttonNewStageAudio] = useSound(newStageAudio);
    const [playAudioMapa, { stop: stopAudioMapa }] = useSound(musicaTemaLoading, { volume: 0.4, loop: true });
    const [playAudioCentral, { stop: stopAudioCentral }] = useSound(musicaCentral, { volume: 0.02, loop: true });
    const [playClockAudio, { stop: stopClockAudio }] = useSound(clockAudio, { volume: 0.3, loop: true });

    // ─── STATES ──────────────────────────────────────────────────
    const [mostrarLoading, setMostrarLoading] = useState(false);
    const [pacotesIniciaisAbertos, setPacotesIniciaisAbertos] = useState(false);
    const [countdown, setCountdown] = useState(30);
    const [diasPendentes, setDiasPendentes] = useState(0);
    const [estaProcessando, setEstaProcessando] = useState(false);
    const [draftAberto, setDraftAberto] = useState(false);
    const [draftConcluido, setDraftConcluido] = useState(false);
    const [cartasSelecionadas, setCartasSelecionadas] = useState([]);
    const [ultimoDiaDraft, setUltimoDiaDraft] = useState(-1);
    const [draftInicialAberto, setDraftInicialAberto] = useState(false);
    const [draftInicialConcluido, setDraftInicialConcluido] = useState(false);
    const [setorSelecionado, setSetorSelecionado] = useState(null);
    const [modalSetorOpen, setModalSetorOpen] = useState(false);
    const [aguardandoSetor, setAguardandoSetor] = useState(false);
    // ─── REFS ────────────────────────────────────────────────────
    const processandoRef = useRef(false);
    const dadosRef = useRef(dados);
    const saldoRef = useRef(economiaSetores.saldo);
    const diasRestantesRef = useRef(0);
    const impostoMensalRef = useRef(0);
    const impostoFixoMensalRef = useRef(0);
    const impostoFaturamentoMensalRef = useRef(0);
    const faturamentoMensalRef = useRef(0);
    const impostoFixoCalculadoRef = useRef(false);
    const cartasSelecionadasRef = useRef([]);
    const cartasSelecionadasMapRef = useRef(new Map());
    const atualizandoCartasRef = useRef(false);
    const ultimoHashCartasRef = useRef("");

    const audioEstadoRef = useRef({
        loadingTocando: false,
        centralTocando: false,
        clockTocando: false,
        transicaoEmAndamento: false
    });

    // ─── MEMO: JOGO INICIADO ─────────────────────────────────────
    const jogoIniciado = dados.jogoIniciado || false;

    // ─── MEMO: TEMPO COUNTDOWN ──────────────────────────────────
    const getTempoCountdown = useCallback(() => {
        const dia = dados.dia || 0;
        if (dia > 180) return 90;
        if (dia > 90) return 60;
        return 30;
    }, [dados.dia]);

    // ─── ATUALIZA COUNTDOWN ─────────────────────────────────────
    useEffect(() => {
        if (!jogoIniciado) return;
        if (diasPendentes > 0 || estaProcessando) return;
        setCountdown(getTempoCountdown());
    }, [dados.dia, jogoIniciado, diasPendentes, estaProcessando, getTempoCountdown]);

    // ─── ATUALIZA REFS ──────────────────────────────────────────
    useEffect(() => { dadosRef.current = dados; }, [dados]);
    useEffect(() => { saldoRef.current = economiaSetores.saldo; }, [economiaSetores.saldo]);

    // ─── FUNÇÃO: CRIAR MAPA DE EDIFÍCIOS ────────────────────────
    const criarMapaEdificios = useCallback((dadosAtuais) => {
        const mapa = new Map();
        for (const setor of SETORES_ARR) {
            if (dadosAtuais[setor]?.edificios) {
                for (const ed of dadosAtuais[setor].edificios) {
                    mapa.set(ed.nome, ed);
                }
            }
        }
        return mapa;
    }, []);

    // ─── FUNÇÃO: CALCULAR CUSTO EDIFÍCIO ────────────────────────
    const calcularCustoEdificio = useCallback((ed, dadosAtuais, mapaEdificios = null) => {
        if (!ed) return 0;

        const custoBase = ed.custoConstrucao || 0;
        const tNec = ed.lojasNecessarias?.terrenos || 0;
        const pNec = ed.lojasNecessarias?.lojasP || 0;
        const mNec = ed.lojasNecessarias?.lojasM || 0;
        const gNec = ed.lojasNecessarias?.lojasG || 0;

        let custoTotal = custoBase
            + tNec * (dadosAtuais.terrenos?.preçoConstrução || 0)
            + pNec * ((dadosAtuais.lojasP?.preçoConstrução || 0) + (dadosAtuais.lojasP?.quantidadeNecTerreno || 0) * (dadosAtuais.terrenos?.preçoConstrução || 0))
            + mNec * ((dadosAtuais.lojasM?.preçoConstrução || 0) + (dadosAtuais.lojasM?.quantidadeNecTerreno || 0) * (dadosAtuais.terrenos?.preçoConstrução || 0))
            + gNec * ((dadosAtuais.lojasG?.preçoConstrução || 0) + (dadosAtuais.lojasG?.quantidadeNecTerreno || 0) * (dadosAtuais.terrenos?.preçoConstrução || 0));

        if (Array.isArray(ed.recursoDeConstrução)) {
            const mapa = mapaEdificios || criarMapaEdificios(dadosAtuais);
            for (const nome of ed.recursoDeConstrução) {
                const recurso = mapa.get(nome);
                if (recurso) {
                    custoTotal += calcularCustoEdificio(recurso, dadosAtuais, mapa);
                }
            }
        }

        return custoTotal;
    }, [criarMapaEdificios]);

    // ─── FUNÇÃO: GERAR HASH DAS CARTAS ──────────────────────────
    const gerarHashCartas = useCallback((cartas) => {
        return JSON.stringify(cartas.map(c =>
            c.nome || (c.setor !== undefined && c.index !== undefined ? `${c.setor}-${c.index}` : '')
        ).sort());
    }, []);

    // ─── FUNÇÃO: FORÇAR ATUALIZAÇÃO DAS CARTAS ──────────────────
    const forcarAtualizacaoCartas = useCallback(() => {
        if (atualizandoCartasRef.current) {
            return { nomes: cartasSelecionadasRef.current, mapa: cartasSelecionadasMapRef.current };
        }

        atualizandoCartasRef.current = true;

        try {
            const cartas = dados.cartasSelecionadas || [];
            const hashAtual = gerarHashCartas(cartas);

            if (hashAtual === ultimoHashCartasRef.current) {
                atualizandoCartasRef.current = false;
                return { nomes: cartasSelecionadasRef.current, mapa: cartasSelecionadasMapRef.current };
            }

            ultimoHashCartasRef.current = hashAtual;

            const nomes = [];
            const mapa = new Map();

            for (const carta of cartas) {
                let nome = null;
                let ed = null;

                if (carta.nome) {
                    nome = carta.nome;
                    for (const setor of SETORES_ARR) {
                        const encontrado = dados[setor]?.edificios?.find(e => e.nome === nome);
                        if (encontrado) {
                            ed = encontrado;
                            break;
                        }
                    }
                } else if (carta.setor !== undefined && carta.index !== undefined) {
                    ed = dados[carta.setor]?.edificios?.[carta.index];
                    if (ed) {
                        nome = ed.nome;
                    }
                }

                if (nome && ed) {
                    nomes.push(nome);
                    mapa.set(nome, {
                        nome,
                        quantidade: ed.quantidade || 0,
                        ed,
                        setor: carta.setor || ed.setor,
                        index: carta.index
                    });
                }
            }

            cartasSelecionadasRef.current = nomes;
            cartasSelecionadasMapRef.current = mapa;

            atualizandoCartasRef.current = false;
            return { nomes, mapa };

        } catch (error) {
            console.error("❌ [SystemTurn] Erro ao atualizar cartas:", error);
            atualizandoCartasRef.current = false;
            return { nomes: cartasSelecionadasRef.current, mapa: cartasSelecionadasMapRef.current };
        }
    }, [dados.cartasSelecionadas, dados, gerarHashCartas]);

    // ─── FUNÇÃO: CARREGAR CARTAS SELECIONADAS ───────────────────
    const carregarCartasSelecionadas = useCallback(() => {
        const resultado = forcarAtualizacaoCartas();
        if (resultado.nomes.length === 0) {
            const cartas = dados.cartasSelecionadas || [];
            const nomes = [];
            for (const carta of cartas) {
                if (carta.nome) {
                    nomes.push(carta.nome);
                } else if (carta.setor !== undefined && carta.index !== undefined) {
                    const ed = dados[carta.setor]?.edificios?.[carta.index];
                    if (ed) {
                        nomes.push(ed.nome);
                    }
                }
            }
            cartasSelecionadasRef.current = nomes;
            return nomes;
        }
        return resultado.nomes;
    }, [forcarAtualizacaoCartas, dados.cartasSelecionadas, dados]);

    // ─── CARREGA CARTAS INICIALMENTE ─────────────────────────────
    useEffect(() => {
        if (jogoIniciado && !atualizandoCartasRef.current) {
            const hash = gerarHashCartas(dados.cartasSelecionadas || []);
            if (hash !== ultimoHashCartasRef.current) {
                carregarCartasSelecionadas();
            }
        }
    }, [jogoIniciado, dados.cartasSelecionadas, gerarHashCartas, carregarCartasSelecionadas]);

    // ─── VERIFICA SE EDIFÍCIO ESTÁ SELECIONADO ──────────────────
    const isEdificioSelecionado = useCallback((ed) => {
        if (!ed || !ed.nome) return false;
        const info = cartasSelecionadasMapRef.current.get(ed.nome);
        if (info) {
            if (info.quantidade !== ed.quantidade) {
                info.quantidade = ed.quantidade;
            }
            return true;
        }
        return cartasSelecionadasRef.current.includes(ed.nome);
    }, []);

    // ─── FUNÇÃO: CALCULAR PATRIMÔNIO DOS SETORES ────────────────
    const calcularPatrimonioSetores = useCallback((dadosAtuais) => {
        const patrimonioSetores = {};
        let patrimonioTotalInventario = 0;
        const mapaEdificios = criarMapaEdificios(dadosAtuais);

        for (const setor of SETORES_ARR) {
            let patrimonioSetor = 0;
            const edificios = dadosAtuais[setor]?.edificios || [];

            for (const ed of edificios) {
                if (ed.quantidade > 0) {
                    const custoUnitario = calcularCustoEdificio(ed, dadosAtuais, mapaEdificios);
                    patrimonioSetor += custoUnitario * ed.quantidade;
                    patrimonioTotalInventario += custoUnitario * ed.quantidade;
                }
            }

            patrimonioSetores[setor] = patrimonioSetor;
        }

        for (const setor of SETORES_ARR) {
            const patrimAtual = patrimonioSetores[setor] || 0;
            const arrayPatrimonio = economiaSetores[setor]?.economiaSetor?.patrimonioHistorico || [];

            const novoArray = [...arrayPatrimonio, patrimAtual];
            if (novoArray.length > 360) {
                novoArray.splice(0, novoArray.length - 360);
            }

            atualizarEcoSafely(setor, {
                patrimonioHistorico: novoArray,
                patrimonioAtual: patrimAtual
            });
        }

        const arrayPatrimonioInventario = economiaSetores.patrimonioInventarioHistorico || [];
        const novoArrayInventario = [...arrayPatrimonioInventario, patrimonioTotalInventario];

        if (novoArrayInventario.length > 360) {
            novoArrayInventario.splice(0, novoArrayInventario.length - 360);
        }

        atualizarEco("patrimonioInventarioHistorico", novoArrayInventario);
        atualizarEco("patrimonioInventarioAtual", patrimonioTotalInventario);

        return { patrimonioSetores, patrimonioTotalInventario };
    }, [criarMapaEdificios, calcularCustoEdificio, economiaSetores, atualizarEcoSafely, atualizarEco]);

    // ─── FUNÇÃO: CALCULAR IMPOSTO FIXO MENSAL ───────────────────
    const calcularImpostoFixoMensal = useCallback((dadosAtuais) => {
        let totalImpostoFixo = 0;
        const mapaEdificios = criarMapaEdificios(dadosAtuais);

        for (const loja of TODAS_LOJAS) {
            const dadosLoja = dadosAtuais[loja] || {};
            totalImpostoFixo += (dadosLoja.quantidade || 0) * (dadosLoja.impostoFixo || 0);
        }

        for (const setor of SETORES_ARR) {
            const edificios = dadosAtuais[setor]?.edificios || [];
            for (const ed of edificios) {
                const quantidade = ed.quantidade || 0;
                if (quantidade > 0 && isEdificioSelecionado(ed)) {
                    const impostoFixo = ed.finanças?.impostoFixo || 0;
                    const qtdMin2 = ed?.powerUp?.nível2?.quantidadeMínima ?? Infinity;
                    const qtdMin3 = ed?.powerUp?.nível3?.quantidadeMínima ?? Infinity;
                    const nivelPU = quantidade >= qtdMin3 ? "powerUpNv3"
                        : quantidade >= qtdMin2 ? "powerUpNv2"
                            : "powerUpNv1";

                    let redCusto = 0;
                    if (Array.isArray(ed?.RecebeMelhoraEficiencia)) {
                        for (const rel of ed.RecebeMelhoraEficiencia) {
                            const outroEd = mapaEdificios.get(rel.nome);
                            if (outroEd && outroEd.quantidade > 0) {
                                const nivel = nivelPU === "powerUpNv1" ? "nível1"
                                    : nivelPU === "powerUpNv2" ? "nível2"
                                        : "nível3";
                                redCusto += rel?.redCusto?.[nivel] || 0;
                            }
                        }
                    }

                    const impostoFixoFinal = impostoFixo * (1 - redCusto / 100);
                    totalImpostoFixo += quantidade * impostoFixoFinal;
                }
            }
        }

        return totalImpostoFixo;
    }, [criarMapaEdificios, isEdificioSelecionado]);

    // ─── FUNÇÃO: CALCULAR IMPOSTO SOBRE FATURAMENTO DIÁRIO ──────
    const calcularImpostoSobreFaturamentoDiario = useCallback((dadosAtuais) => {
        let totalImpostoFaturamento = 0;
        const mapaEdificios = criarMapaEdificios(dadosAtuais);

        for (const loja of TODAS_LOJAS) {
            const dadosLoja = dadosAtuais[loja] || {};
            totalImpostoFaturamento += (dadosLoja.faturamentoTotal || 0) * (dadosLoja.impostoSobreFaturamento || 0);
        }

        for (const setor of SETORES_ARR) {
            const edificios = dadosAtuais[setor]?.edificios || [];
            for (const ed of edificios) {
                const quantidade = ed.quantidade || 0;
                if (quantidade > 0 && isEdificioSelecionado(ed)) {
                    const faturamento = ed.faturamentoTotal || 0;
                    const aliquota = ed.finanças?.impostoSobreFatu || 0;
                    const qtdMin2 = ed?.powerUp?.nível2?.quantidadeMínima ?? Infinity;
                    const qtdMin3 = ed?.powerUp?.nível3?.quantidadeMínima ?? Infinity;
                    const nivelPU = quantidade >= qtdMin3 ? "powerUpNv3"
                        : quantidade >= qtdMin2 ? "powerUpNv2"
                            : "powerUpNv1";

                    let redCusto = 0;
                    if (Array.isArray(ed?.RecebeMelhoraEficiencia)) {
                        for (const rel of ed.RecebeMelhoraEficiencia) {
                            const outroEd = mapaEdificios.get(rel.nome);
                            if (outroEd && outroEd.quantidade > 0) {
                                const nivel = nivelPU === "powerUpNv1" ? "nível1"
                                    : nivelPU === "powerUpNv2" ? "nível2"
                                        : "nível3";
                                redCusto += rel?.redCusto?.[nivel] || 0;
                            }
                        }
                    }

                    const aliquotaFinal = aliquota * (1 - redCusto / 100);
                    totalImpostoFaturamento += faturamento * aliquotaFinal;
                }
            }
        }

        return totalImpostoFaturamento;
    }, [criarMapaEdificios, isEdificioSelecionado]);

    // ─── FUNÇÃO: CALCULAR FATURAMENTO DO DIA ────────────────────
    const calcularFaturamentoDoDia = useCallback((diaAtual, dadosAtuais) => {
        let faturamentoTotal = 0;
        let faturamentoLojas = 0;
        let faturamentoEdificios = 0;
        const mapaEdificios = criarMapaEdificios(dadosAtuais);

        let totalAumFatu = 0;
        let totalRedCusto = 0;
        const detalhesEdificios = [];

        const novasLojas = [];
        for (const loja of TODAS_LOJAS) {
            const dadosLoja = dadosAtuais[loja] || {};
            const valorUnitário = dadosLoja.faturamentoUnitárioPadrão || 0;
            const quantidade = dadosLoja.quantidade || 0;

            const valorVariável = parseFloat(
                (valorUnitário * (1 + (Math.random() * 0.6 - 0.3))).toFixed(2)
            );
            const faturamentoLoja = parseFloat(
                (valorVariável * quantidade).toFixed(2)
            );

            faturamentoLojas += faturamentoLoja;

            const novoArrayFatu = [
                ...(dadosLoja.arrayFatu || []),
                faturamentoLoja,
            ].slice(-360);

            const somaMensalFatu = novoArrayFatu.reduce((acc, val) => acc + val, 0);

            novasLojas.push({
                ...dadosLoja,
                faturamentoUnitário: valorVariável,
                faturamentoTotal: faturamentoLoja,
                arrayFatu: novoArrayFatu,
                somaArrayFatu: somaMensalFatu,
            });
        }

        const ehPrimeiroDiaDoMes = diaAtual % 30 === 1;

        for (const setor of SETORES_ARR) {
            const edificiosOriginais = dadosAtuais[setor]?.edificios || [];
            let faturamentoTotalSetor = 0;

            const edificiosAtualizados = [];
            for (const ed of edificiosOriginais) {
                const quantidade = ed.quantidade || 0;
                const selecionado = isEdificioSelecionado(ed);
                const deveProcessar = quantidade > 0 && selecionado;

                if (!deveProcessar) {
                    edificiosAtualizados.push(ed);
                    continue;
                }

                const faturamentoUnitario = ed?.finanças?.faturamentoUnitário || 0;

                const qtdMin2 = ed?.powerUp?.nível2?.quantidadeMínima ?? Infinity;
                const qtdMin3 = ed?.powerUp?.nível3?.quantidadeMínima ?? Infinity;
                const nivelPU = quantidade >= qtdMin3 ? "powerUpNv3"
                    : quantidade >= qtdMin2 ? "powerUpNv2"
                        : "powerUpNv1";

                let aumFatu = 0;
                let redCusto = 0;

                if (Array.isArray(ed?.RecebeMelhoraEficiencia)) {
                    for (const rel of ed.RecebeMelhoraEficiencia) {
                        const outroEd = mapaEdificios.get(rel.nome);
                        if (outroEd && outroEd.quantidade > 0) {
                            const nivel = nivelPU === "powerUpNv1" ? "nível1"
                                : nivelPU === "powerUpNv2" ? "nível2"
                                    : "nível3";
                            aumFatu += rel?.aumFatu?.[nivel] || 0;
                            redCusto += rel?.redCusto?.[nivel] || 0;
                        }
                    }
                }

                totalAumFatu += aumFatu;
                totalRedCusto += redCusto;

                const valorFatuFinal = faturamentoUnitario * (1 + aumFatu / 100);
                const economiaSetor = economiaSetores[setor]?.economiaSetor?.estadoAtual || "estável";
                const fatorEconomico = ESTADO_ECONOMIA[economiaSetor] || 1;
                const faturamentoDiario = valorFatuFinal * quantidade * fatorEconomico;

                faturamentoTotalSetor += faturamentoDiario;
                faturamentoEdificios += faturamentoDiario;

                detalhesEdificios.push({
                    nome: ed.nome,
                    quantidade: quantidade,
                    faturamento: faturamentoDiario,
                    aumFatu: aumFatu,
                    redCusto: redCusto
                });

                const arrayFatu = ed.arrayFatu || [];
                let novoArrayFatu;
                if (ehPrimeiroDiaDoMes) {
                    novoArrayFatu = [faturamentoDiario];
                } else {
                    novoArrayFatu = [...arrayFatu, faturamentoDiario].slice(-360);
                }

                const somaMensalFatu = novoArrayFatu.reduce((acc, val) => acc + val, 0);

                edificiosAtualizados.push({
                    ...ed,
                    arrayFatu: novoArrayFatu,
                    somaArrayFatu: somaMensalFatu,
                    faturamentoTotal: faturamentoDiario,
                });
            }

            if (edificiosAtualizados.length > 0) {
                atualizarDados(setor, {
                    ...dadosAtuais[setor],
                    edificios: edificiosAtualizados,
                });
            }

            const arrayFatuSetor = economiaSetores[setor]?.economiaSetor?.ArrayFatu || [];
            const novoArrayFatuSetor = ehPrimeiroDiaDoMes
                ? [faturamentoTotalSetor]
                : [...arrayFatuSetor, faturamentoTotalSetor].slice(-360);

            atualizarEcoSafely(setor, {
                ArrayFatu: novoArrayFatuSetor,
            });
        }

        faturamentoTotal = faturamentoLojas + faturamentoEdificios;

        const faturamentoMensalAnterior = dadosAtuais.faturamento?.faturamentoMensal || 0;
        const novoFaturamentoMensal =
            diaAtual % 30 === 0
                ? faturamentoTotal
                : faturamentoMensalAnterior + faturamentoTotal;

        if (diaAtual <= 270) {
            atualizarDados("faturamento", {
                ...dadosAtuais.faturamento,
                faturamentoDiário: faturamentoTotal,
                faturamentoMensal: novoFaturamentoMensal,
                arrayFatuDiário: [
                    ...(dadosAtuais.faturamento?.arrayFatuDiário || []),
                    faturamentoTotal,
                ],
            });
        }

        for (let i = 0; i < TODAS_LOJAS.length; i++) {
            atualizarDados(TODAS_LOJAS[i], novasLojas[i]);
        }

        return {
            faturamentoDiario: faturamentoTotal,
            detalhesEdificios,
            totalAumFatu,
            totalRedCusto
        };
    }, [criarMapaEdificios, isEdificioSelecionado, economiaSetores, atualizarDados, atualizarEcoSafely]);

    // ─── FUNÇÃO: FINALIZAR PROCESSAMENTO MENSAL ─────────────────
    const finalizarProcessamentoMensal = useCallback(() => {
        setMostrarLoading(false);

        const impostoTotalMensal = impostoFixoMensalRef.current + impostoFaturamentoMensalRef.current;
        impostoMensalRef.current = impostoTotalMensal;

        const saldoFinal = saldoRef.current - impostoFixoMensalRef.current;
        atualizarEco("saldo", saldoFinal);
        saldoRef.current = saldoFinal;

        const powerUpsAumFatu = economiaSetores.powerUps?.aumentoFaturamentoDiario || [];
        const powerUpsRedCusto = economiaSetores.powerUps?.reducaoCustoDiario || [];

        atualizarDados("faturamento", {
            ...dadosRef.current.faturamento,
            faturamentoMensal: faturamentoMensalRef.current,
            faturamentoDiário: faturamentoMensalRef.current / 30,
        });

        atualizarEco("imposto", {
            ...economiaSetores.imposto,
            impostoMensal: impostoTotalMensal,
            impostoDiário: impostoTotalMensal / 30,
            impostoFixoMensal: impostoFixoMensalRef.current,
            impostoFaturamentoMensal: impostoFaturamentoMensalRef.current,
            impostoSobreFaturamentoDiário: impostoFaturamentoMensalRef.current / 30,
        });

        if (dadosRef.current.dia % 30 === 0) {
            atualizarDados("despesas", {
                ...dadosRef.current.despesas,
                despesasPagas: true,
                diaPagarDespesas: true,
            });
        }
    }, [atualizarDados, atualizarEco, economiaSetores]);

    // ─── FUNÇÃO: EXECUTAR LIQUIDAÇÃO ─────────────────────────────
    const executarLiquidacao = useCallback(async () => {
        console.log("🔄 [SystemTurn] Verificando excedentes para liquidação...");
        try {
            const dadosAtuais = dadosRef.current;
            const resultado = await executarLiquidacaoAutomatica(
                dadosAtuais,
                atualizarDadosProf2,
                economiaSetores,
                atualizarEco
            );

            if (resultado?.sucesso && resultado?.liquidados > 0) {
                console.log(`✅ [SystemTurn] ${resultado.liquidados} tipo(s) liquidados! Total: R$ ${resultado.totalRecebido.toFixed(2)}`);
                dadosRef.current = { ...dadosAtuais };
            } else if (resultado?.sucesso) {
                console.log("ℹ️ [SystemTurn] Nenhum excedente para liquidar.");
            }
            return resultado;
        } catch (error) {
            console.error("❌ [SystemTurn] Erro na liquidação:", error);
            return null;
        }
    }, [atualizarDadosProf2, economiaSetores, atualizarEco]);

    // ─── FUNÇÕES DE ÁUDIO ────────────────────────────────────────
    const pararTodosAudios = useCallback(() => {
        if (audioEstadoRef.current.loadingTocando) {
            stopAudioMapa();
            audioEstadoRef.current.loadingTocando = false;
        }
        if (audioEstadoRef.current.centralTocando) {
            stopAudioCentral();
            audioEstadoRef.current.centralTocando = false;
        }
        if (audioEstadoRef.current.clockTocando) {
            stopClockAudio();
            audioEstadoRef.current.clockTocando = false;
        }
        audioEstadoRef.current.transicaoEmAndamento = false;
    }, [stopAudioMapa, stopAudioCentral, stopClockAudio]);

    const tocarAudioCentral = useCallback(() => {
        if (audioEstadoRef.current.centralTocando || audioEstadoRef.current.transicaoEmAndamento) return;

        if (audioEstadoRef.current.loadingTocando) {
            stopAudioMapa();
            audioEstadoRef.current.loadingTocando = false;
        }
        if (audioEstadoRef.current.clockTocando) {
            stopClockAudio();
            audioEstadoRef.current.clockTocando = false;
        }
        playAudioCentral();
        audioEstadoRef.current.centralTocando = true;
    }, [playAudioCentral, stopAudioMapa, stopClockAudio]);

    const tocarAudioLoading = useCallback(() => {
        if (audioEstadoRef.current.loadingTocando || audioEstadoRef.current.transicaoEmAndamento) return;

        if (audioEstadoRef.current.centralTocando) {
            stopAudioCentral();
            audioEstadoRef.current.centralTocando = false;
        }
        if (audioEstadoRef.current.clockTocando) {
            stopClockAudio();
            audioEstadoRef.current.clockTocando = false;
        }
        playAudioMapa();
        audioEstadoRef.current.loadingTocando = true;
    }, [playAudioMapa, stopAudioCentral, stopClockAudio]);

    const tocarClock = useCallback(() => {
        if (audioEstadoRef.current.clockTocando || audioEstadoRef.current.transicaoEmAndamento) return;

        if (audioEstadoRef.current.centralTocando) {
            stopAudioCentral();
            audioEstadoRef.current.centralTocando = false;
        }
        if (audioEstadoRef.current.loadingTocando) {
            stopAudioMapa();
            audioEstadoRef.current.loadingTocando = false;
        }
        playClockAudio();
        audioEstadoRef.current.clockTocando = true;
    }, [playClockAudio, stopAudioCentral, stopAudioMapa]);

    // ─── CONTROLE DE ÁUDIO ──────────────────────────────────────
    useEffect(() => {
        return () => pararTodosAudios();
    }, [pararTodosAudios]);

    useEffect(() => {
        if (mostrarLoading) {
            tocarAudioLoading();
        } else if (jogoIniciado && dados.dia < 360 && !diasPendentes > 0 && !estaProcessando && !draftAberto && !draftInicialAberto) {
            const timer = setTimeout(tocarAudioCentral, 300);
            return () => clearTimeout(timer);
        } else if (audioEstadoRef.current.loadingTocando) {
            stopAudioMapa();
            audioEstadoRef.current.loadingTocando = false;
        }
    }, [mostrarLoading, jogoIniciado, dados.dia, diasPendentes, estaProcessando, tocarAudioLoading, tocarAudioCentral, stopAudioMapa, draftAberto, draftInicialAberto]);

    useEffect(() => {
        if (!jogoIniciado) return;
        if (dados.dia > 0) return;
        if (setorSelecionado) return;
        if (modalSetorOpen) return;
        if (draftInicialAberto) return;
        if (pacotesIniciaisAbertos) return;

        setModalSetorOpen(true);
        setAguardandoSetor(true);
    }, [jogoIniciado, dados.dia, setorSelecionado, modalSetorOpen, draftInicialAberto, pacotesIniciaisAbertos]);

    useEffect(() => {
        if (diasPendentes > 0 || estaProcessando || draftAberto || draftInicialAberto) {
            if (audioEstadoRef.current.clockTocando) {
                stopClockAudio();
                audioEstadoRef.current.clockTocando = false;
            }
            return;
        }

        if (!jogoIniciado || dados.dia >= 360) {
            if (audioEstadoRef.current.clockTocando) {
                stopClockAudio();
                audioEstadoRef.current.clockTocando = false;
            }
            return;
        }

        if (!mostrarLoading && !audioEstadoRef.current.loadingTocando) {
            if (countdown <= 10 && countdown > 0) {
                if (!audioEstadoRef.current.clockTocando) {
                    tocarClock();
                }
            } else if (audioEstadoRef.current.clockTocando) {
                stopClockAudio();
                audioEstadoRef.current.clockTocando = false;
            } else if (!audioEstadoRef.current.centralTocando && !audioEstadoRef.current.loadingTocando) {
                const timer = setTimeout(tocarAudioCentral, 200);
                return () => clearTimeout(timer);
            }
        }
    }, [countdown, mostrarLoading, jogoIniciado, dados.dia, diasPendentes, estaProcessando, tocarClock, tocarAudioCentral, stopClockAudio, draftAberto, draftInicialAberto]);

    useEffect(() => {
        if (countdown === 0 && audioEstadoRef.current.clockTocando) {
            stopClockAudio();
            audioEstadoRef.current.clockTocando = false;
        }
    }, [countdown, stopClockAudio]);

    // ─── DRAFT INICIAL ───────────────────────────────────────────
    useEffect(() => {
        if (!jogoIniciado) return;
        if (draftInicialConcluido) return;
        if (draftInicialAberto) return;
        if (dados.dia > 0) return;

        setDraftInicialAberto(true);
    }, [jogoIniciado, dados.dia, draftInicialConcluido, draftInicialAberto]);

    // ─── DRAFT CONTÍNUO ──────────────────────────────────────────
    useEffect(() => {
        if (!jogoIniciado) return;
        if (draftInicialAberto) return;
        if (!draftInicialConcluido) return;
        if (draftAberto) return;
        if (dados.dia <= 0) return;
        if (dados.dia >= 360) return;

        const dia = dados.dia || 0;
        const deveAbrir = (dia % 30 === 0 && dia > 0);

        if (deveAbrir && ultimoDiaDraft !== dia) {
            setDraftAberto(true);
            setUltimoDiaDraft(dia);
        }
    }, [jogoIniciado, dados.dia, draftAberto, ultimoDiaDraft, draftInicialAberto, draftInicialConcluido]);

    // ─── HANDLERS DRAFT ──────────────────────────────────────────

    const abrirPacotesIniciais = useCallback(() => {
        if (pacotesIniciaisAbertos) return;
        setPacotesIniciaisAbertos(true);
    }, [pacotesIniciaisAbertos]);

    const handleSetorSelecionado = useCallback((setor) => {
        setSetorSelecionado(setor);
        setAguardandoSetor(false);
        setModalSetorOpen(false);

        atualizarDados("setorEscolhido", setor);

        setDraftInicialAberto(true);
    }, [atualizarDados]);

    // ─── HANDLE DRAFT INICIAL COMPLETE ──────────────────────────
    const handleDraftInicialComplete = useCallback((cartas) => {
        setDraftInicialConcluido(true);
        setDraftInicialAberto(false);

        abrirPacotesIniciais();
    }, [abrirPacotesIniciais]);

    const handleComplete = useCallback((cartas) => {
        setCartasSelecionadas(cartas);
        setDraftConcluido(true);
        setDraftAberto(false);
    }, []);

    const fecharDraft = useCallback(() => {
        setDraftAberto(false);
    }, []);

    // ─── TIMER PRINCIPAL ─────────────────────────────────────────
    useEffect(() => {
        if (!jogoIniciado) return;
        if (diasPendentes > 0 || estaProcessando) return;
        if (draftInicialAberto) return;
        if (draftAberto) return;
        if (dados.dia >= 360) return;

        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    const diasRestantesParaFim = 360 - dados.dia;
                    if (diasRestantesParaFim <= 0) {
                        return getTempoCountdown();
                    }

                    const totalDias = Math.min(30, diasRestantesParaFim);
                    impostoFixoCalculadoRef.current = false;
                    diasRestantesRef.current = totalDias;

                    console.log("🔄 [SystemTurn] Iniciando liquidação de excedentes antes do novo mês...");
                    executarLiquidacao().then(() => {
                        console.log("✅ [SystemTurn] Liquidação concluída, iniciando novo mês...");
                    });

                    setDiasPendentes(totalDias);
                    return getTempoCountdown();
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [diasPendentes, estaProcessando, jogoIniciado, dados.dia, getTempoCountdown, draftInicialAberto, draftAberto, executarLiquidacao]);

    // ─── PROCESSAMENTO DOS DIAS ─────────────────────────────────
    useEffect(() => {
        if (!jogoIniciado) return;
        if (diasPendentes <= 0 || processandoRef.current) return;
        if (draftInicialAberto) return;
        if (draftAberto) return;
        if (dados.dia >= 360) {
            setDiasPendentes(0);
            setEstaProcessando(false);
            processandoRef.current = false;
            setMostrarLoading(false);
            return;
        }

        processandoRef.current = true;
        setEstaProcessando(true);

        const processarProximoDia = () => {
            if (dadosRef.current.dia >= 360) {
                setDiasPendentes(0);
                setEstaProcessando(false);
                processandoRef.current = false;
                setMostrarLoading(false);
                return;
            }

            if (diasRestantesRef.current <= 0) {
                finalizarProcessamentoMensal();
                setCountdown(getTempoCountdown());
                setDiasPendentes(0);
                setEstaProcessando(false);
                processandoRef.current = false;
                return;
            }

            setMostrarLoading(true);

            const dadosAtuais = dadosRef.current;
            const saldoAtual = saldoRef.current || 0;
            const diaAtual = dadosAtuais.dia;
            const proximoDia = diaAtual + 1;

            if (proximoDia > 360) {
                setDiasPendentes(0);
                setEstaProcessando(false);
                processandoRef.current = false;
                setMostrarLoading(false);
                return;
            }
            // Último dia
            if (proximoDia === 360) {
                setTimeout(() => {
                    try {
                        const resultadoDia = calcularFaturamentoDoDia(proximoDia, dadosAtuais);
                        const { faturamentoDiario, totalAumFatu, totalRedCusto } = resultadoDia;

                        calcularPatrimonioSetores(dadosAtuais);
                        const impostoSobreFatuDia = calcularImpostoSobreFaturamentoDiario(dadosAtuais);

                        const impostoTotalDia = impostoSobreFatuDia;

                        atualizarDados("dia", proximoDia);
                        dadosRef.current = { ...dadosAtuais, dia: proximoDia };

                        const novoSaldo = saldoAtual + faturamentoDiario - impostoTotalDia;
                        atualizarEco("saldo", novoSaldo);
                        saldoRef.current = novoSaldo;

                        const powerUpsAumFatu = economiaSetores.powerUps?.aumentoFaturamentoDiario || [];
                        const powerUpsRedCusto = economiaSetores.powerUps?.reducaoCustoDiario || [];

                        const novoAumFatu = [...powerUpsAumFatu, totalAumFatu].slice(-360);
                        const novoRedCusto = [...powerUpsRedCusto, totalRedCusto].slice(-360);

                        atualizarEco("powerUps", {
                            ...economiaSetores.powerUps,
                            aumentoFaturamentoDiario: novoAumFatu,
                            reducaoCustoDiario: novoRedCusto,
                            aumentoFaturamentoAtual: totalAumFatu,
                            reducaoCustoAtual: totalRedCusto,
                        });

                        setTimeout(() => {
                            setDiasPendentes(0);
                            setEstaProcessando(false);
                            processandoRef.current = false;
                            setMostrarLoading(false);
                            if (window.dispatchEvent) {
                                window.dispatchEvent(new Event('resize'));
                            }
                        }, 1000);

                    } catch (error) {
                        console.error("❌ Erro no último dia:", error);
                        setDiasPendentes(0);
                        setEstaProcessando(false);
                        processandoRef.current = false;
                        setMostrarLoading(false);
                    }
                }, 300);
                return;
            }

            // Processamento normal
            const resultadoDia = calcularFaturamentoDoDia(proximoDia, dadosAtuais);
            const { faturamentoDiario, totalAumFatu, totalRedCusto } = resultadoDia;

            calcularPatrimonioSetores(dadosAtuais);
            const impostoSobreFatuDia = calcularImpostoSobreFaturamentoDiario(dadosAtuais);

            faturamentoMensalRef.current += faturamentoDiario;
            impostoFaturamentoMensalRef.current += impostoSobreFatuDia;

            let impostoFixoMensal = 0;
            if (!impostoFixoCalculadoRef.current) {
                impostoFixoMensal = calcularImpostoFixoMensal(dadosAtuais);
                impostoFixoMensalRef.current = impostoFixoMensal;
                impostoFixoCalculadoRef.current = true;
            }

            const impostoTotalDia = impostoSobreFatuDia;
            atualizarDados("dia", proximoDia);
            dadosRef.current = { ...dadosAtuais, dia: proximoDia };

            const novoSaldo = saldoAtual + faturamentoDiario - impostoTotalDia;
            atualizarEco("saldo", novoSaldo);
            saldoRef.current = novoSaldo;

            const powerUpsAumFatu = economiaSetores.powerUps?.aumentoFaturamentoDiario || [];
            const powerUpsRedCusto = economiaSetores.powerUps?.reducaoCustoDiario || [];

            const novoAumFatu = [...powerUpsAumFatu, totalAumFatu].slice(-360);
            const novoRedCusto = [...powerUpsRedCusto, totalRedCusto].slice(-360);

            atualizarEco("powerUps", {
                ...economiaSetores.powerUps,
                aumentoFaturamentoDiario: novoAumFatu,
                reducaoCustoDiario: novoRedCusto,
                aumentoFaturamentoAtual: totalAumFatu,
                reducaoCustoAtual: totalRedCusto,
            });

            diasRestantesRef.current--;
            setDiasPendentes(diasRestantesRef.current);
            if (diasRestantesRef.current % 5 === 0) {
                executarLiquidacao().then(() => {
                    dadosRef.current = { ...dadosRef.current };
                });
            }
            if (diasRestantesRef.current > 0) {
                setTimeout(processarProximoDia, 500);
            } else {
                setTimeout(() => {
                    finalizarProcessamentoMensal();
                    setEstaProcessando(false);
                    processandoRef.current = false;
                    setDiasPendentes(0);
                }, 500);
            }
        };

        setTimeout(processarProximoDia, 500);

    }, [diasPendentes, jogoIniciado, dados.dia, getTempoCountdown, draftInicialAberto, draftAberto, calcularFaturamentoDoDia, calcularPatrimonioSetores, calcularImpostoSobreFaturamentoDiario, calcularImpostoFixoMensal, finalizarProcessamentoMensal, atualizarDados, atualizarEco, economiaSetores]);

    // ─── RENDER ──────────────────────────────────────────────────
    return (
        <div className="flex h-full items-center gap-3">
            <LoadingScreen
                visible={mostrarLoading}
                onComplete={() => setMostrarLoading(false)}
            />
            {modalSetorOpen && (
                <ModalSetorSelection
                    isOpen={modalSetorOpen}
                    onClose={() => {
                        setModalSetorOpen(false);
                        setAguardandoSetor(false);
                    }}
                    onSelect={handleSetorSelecionado}
                />
            )}
            {/* DRAFT INICIAL */}
            {draftInicialAberto && (
                <DraftSystemInicial
                    onClose={() => { }}
                    onComplete={handleDraftInicialComplete}
                    quantidadeOpcoes={3}
                    titulo="📋 Draft Inicial"
                    instrucao="📌 Escolha as suas cartas para começar sua jornada!"
                />
            )}

            {/* DRAFT CONTÍNUO */}
            {draftAberto && (
                <DraftSystemContinuo
                    diaAtual={dados.dia || 0}
                    onClose={fecharDraft}
                    onComplete={handleComplete}
                    quantidadeOpcoes={3}
                    titulo={`📋 Draft - Dia ${dados.dia || 0}`}
                    instrucao={`📌 Escolha uma carta ${getRankPorDia(dados.dia || 0)} para sua coleção!`}
                />
            )}

            {/* TIMER - VERSÃO ESTILIZADA */}
            <div
                data-tooltip-id="timer-tip"
                data-tooltip-content={
                    diasPendentes > 0 || estaProcessando
                        ? `Processando ${30 - (diasPendentes || 0)}/30 dias...`
                        : countdown > 10
                            ? `Próxima simulação em ${countdown} segundos`
                            : `⚠️ ÚLTIMOS ${countdown} SEGUNDOS!`
                }

                className="justify-around"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    // justifyContent: "center",
                    background: countdown <= 10 && countdown > 0 
                        ? "rgba(255,0,0,0.15)" 
                        : "rgba(242,116,5,0.1)",
                    borderRadius: "10px",
                    border: countdown <= 10 && countdown > 0 
                        ? "2px solid #ff3333" 
                        : "1px solid rgba(242,116,5,0.2)",
                    padding: "4px 16px",
                    minWidth: "80px",
                    height: "80%",
                    transition: "all 0.3s ease",
                    backdropFilter: "blur(4px)",
                }}
            >
                <span style={{
                    fontFamily: "'Rajdhani',sans-serif",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: ".08em",
                    color: countdown <= 10 && countdown > 0 ? "#ff6666" : "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                }}>
                    {diasPendentes > 0 || estaProcessando ? "Processando" : "Próximo Turno"}
                </span>
                <span style={{
                    fontFamily: "'Rajdhani',sans-serif",
                    fontSize: "22px",
                    fontWeight: 800,
                    color: countdown <= 10 && countdown > 0 ? "#ff3333" : "#FFFFFF",
                    lineHeight: 1.2,
                    transition: "color 0.3s ease",
                }}>
                    {diasPendentes > 0 || estaProcessando
                        ? `${30 - (diasPendentes || 0)}/30`
                        : countdown <= 10 && countdown > 0
                            ? `⚠️ ${String(countdown).padStart(2, "0")}s`
                            : `${String(countdown).padStart(2, "0")}s`}
                </span>
            </div>

            <TooltipPadrao id="timer-tip" />

            <style>{`
                @keyframes pulse-timer {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.6; }
                }
            `}</style>
        </div>
    );
});