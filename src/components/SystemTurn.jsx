import React, { useContext, useEffect, useState, useRef, useCallback } from "react";
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

// 🔥 CONSTANTES MOVIDAS PARA O TOPO
const todasLojas = ["terrenos", "lojasP", "lojasM", "lojasG"];
const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

const FATOR_ECONOMIA = {
    recessão: 0.4,
    declinio: 0.8,
    estável: 1,
    progressiva: 1.1,
    aquecida: 1.25
};

export function SystemTurn() {
    const { dados, atualizarDados, atualizarDadosProf2 } = useContext(CentraldeDadosContext);
    const {
        economiaSetores,
        setEconomiaSetores,
        atualizarEcoSafely,
        atualizarEco,
    } = useContext(DadosEconomyGlobalContext);

    const [mostrarLoading, setMostrarLoading] = useState(false);
    const [pacotesIniciaisAbertos, setPacotesIniciaisAbertos] = useState(false);

    // 🔥 VERIFICA SE O JOGO JÁ FOI INICIADO
    const jogoIniciado = dados.jogoIniciado || false;

    // 🔥 FUNÇÃO PARA CALCULAR O TEMPO DO COUNTDOWN BASEADO NO DIA
    const getTempoCountdown = useCallback(() => {
        const dia = dados.dia || 0;
        if (dia > 180) return 90;
        if (dia > 90) return 60;
        return 30;
    }, [dados.dia]);

    const [countdown, setCountdown] = useState(getTempoCountdown());
    const [diasPendentes, setDiasPendentes] = useState(0);
    const [estaProcessando, setEstaProcessando] = useState(false);

    // 🔥 ATUALIZA O COUNTDOWN QUANDO O DIA MUDA
    useEffect(() => {
        if (!jogoIniciado) return;
        if (diasPendentes > 0 || estaProcessando) return;
        setCountdown(getTempoCountdown());
    }, [dados.dia, jogoIniciado, diasPendentes, estaProcessando, getTempoCountdown]);

    const processandoRef = useRef(false);
    const dadosRef = useRef(dados);
    const saldoRef = useRef(economiaSetores.saldo);
    const diasRestantesRef = useRef(0);
    
    // 🔥 ACUMULADORES DE IMPOSTOS
    const impostoMensalRef = useRef(0);
    const impostoFixoMensalRef = useRef(0);
    const impostoFaturamentoMensalRef = useRef(0);
    const faturamentoMensalRef = useRef(0);
    
    // 🔥 FLAG PARA SABER SE JÁ CALCULOU O IMPOSTO FIXO NO MÊS
    const impostoFixoCalculadoRef = useRef(false);

    // 🔥 REF PARA CARTAS SELECIONADAS
    const cartasSelecionadasRef = useRef([]);
    const cartasSelecionadasMapRef = useRef(new Map());
    
    // 🔥 FLAG PARA EVITAR LOOP INFINITO
    const atualizandoCartasRef = useRef(false);
    const ultimoHashCartasRef = useRef("");

    // 🔥 SOUND HOOKS
    const [buttonNextDayAudio] = useSound(nextDayAudio);
    const [buttonNewStageAudio] = useSound(newStageAudio);
    const [playAudioMapa, { stop: stopAudioMapa }] = useSound(musicaTemaLoading, {
        volume: 0.4,
        loop: true,
    });
    const [playAudioCentral, { stop: stopAudioCentral }] = useSound(musicaCentral, {
        volume: 0.02,
        loop: true,
    });
    const [playClockAudio, { stop: stopClockAudio }] = useSound(clockAudio, {
        volume: 0.3,
        loop: true,
    });

    // 🔥 REF PARA CONTROLAR O ESTADO DO ÁUDIO
    const audioEstadoRef = useRef({
        loadingTocando: false,
        centralTocando: false,
        clockTocando: false,
        transicaoEmAndamento: false
    });

    // ── DRAFT CONTÍNUO ──
    const [draftAberto, setDraftAberto] = useState(false);
    const [draftConcluido, setDraftConcluido] = useState(false);
    const [cartasSelecionadas, setCartasSelecionadas] = useState([]);
    const [ultimoDiaDraft, setUltimoDiaDraft] = useState(-1);

    const abrirDraft = useCallback((dia) => {
        console.log(`📋 [SystemTurn] Abrindo draft para dia ${dia}`);
        setDraftAberto(true);
        setDraftConcluido(false);
        setUltimoDiaDraft(dia);
    }, []);

    const fecharDraft = useCallback(() => {
        console.log(`📋 [SystemTurn] Fechando draft`);
        setDraftAberto(false);
    }, []);

    const handleComplete = useCallback((cartas) => {
        console.log(`📋 [SystemTurn] Draft concluído com ${cartas.length} cartas`);
        setCartasSelecionadas(cartas);
        setDraftConcluido(true);
    }, []);

    // ── DRAFT INICIAL (4 C + 1 B) ──
    const [draftInicialAberto, setDraftInicialAberto] = useState(false);
    const [draftInicialConcluido, setDraftInicialConcluido] = useState(false);

    // 🔥 VERIFICA SE DEVE ABRIR O DRAFT INICIAL (DIA 0)
    useEffect(() => {
        if (!jogoIniciado) return;
        if (draftInicialConcluido) return;
        if (draftInicialAberto) return;
        if (dados.dia > 0) return;
        
        console.log("📋 [SystemTurn] Abrindo draft inicial (4C + 1B)");
        setDraftInicialAberto(true);
    }, [jogoIniciado, dados.dia, draftInicialConcluido, draftInicialAberto]);

    // ── VERIFICA SE DEVE ABRIR DRAFT CONTÍNUO ──
    useEffect(() => {
        if (!jogoIniciado) return;
        if (draftInicialAberto) return;
        if (!draftInicialConcluido) return;
        if (draftAberto) return;
        if (draftConcluido) return;
        if (dados.dia <= 0) return;
        if (dados.dia >= 360) return;
        
        const dia = dados.dia || 0;
        const rankAtual = getRankPorDia(dia);
        const rankAnterior = getRankPorDia(dia - 1);
        
        // ABRE DRAFT EM CADA DIA QUE MUDA DE RANK OU NO DIA 1
        // E TAMBÉM QUANDO O DIA É MÚLTIPLO DE 30 (CADA MÊS)
        const deveAbrir = 
            dia === 1 || 
            (rankAtual !== rankAnterior && dia > 0) ||
            (dia % 30 === 0 && dia > 0);
        
        if (deveAbrir && ultimoDiaDraft !== dia) {
            console.log(`📋 [SystemTurn] Abrindo draft contínuo para dia ${dia} - Rank ${rankAtual}`);
            abrirDraft(dia);
        }
    }, [jogoIniciado, dados.dia, draftAberto, draftConcluido, ultimoDiaDraft, abrirDraft, draftInicialAberto, draftInicialConcluido]);

    // ── FECHA DRAFT QUANDO CONCLUÍDO ──
    useEffect(() => {
        if (draftConcluido && draftAberto) {
            console.log(`📋 [SystemTurn] Draft contínuo concluído, fechando...`);
            setTimeout(() => {
                fecharDraft();
                // Reseta para permitir próximo draft
                setDraftConcluido(false);
            }, 1500);
        }
    }, [draftConcluido, draftAberto, fecharDraft]);

    // ── FUNÇÃO PARA CONCLUIR DRAFT INICIAL ──
    const handleDraftInicialComplete = useCallback((cartas) => {
        console.log(`📋 [SystemTurn] Draft inicial concluído com ${cartas.length} cartas`);
        setDraftInicialConcluido(true);
        setDraftInicialAberto(false);
        
        // Abre pacotes iniciais APÓS o draft inicial
        setTimeout(() => {
            console.log("🎁 [SystemTurn] Abrindo pacotes iniciais...");
            abrirPacotesIniciais();
        }, 500);
    }, []);

    // ── FUNÇÃO PARA ABRIR PACOTES INICIAIS ──
    const abrirPacotesIniciais = useCallback(() => {
        if (pacotesIniciaisAbertos) return;
        
        console.log("🎁 [SystemTurn] Abrindo 2 pacotes comuns para o jogador...");
        setPacotesIniciaisAbertos(true);
        
        setTimeout(() => {
            console.log("🎁 [SystemTurn] Pacote comum #1 aberto!");
        }, 500);
        
        setTimeout(() => {
            console.log("🎁 [SystemTurn] Pacote comum #2 aberto!");
        }, 1500);
    }, [pacotesIniciaisAbertos]);

    // 🔥 FUNÇÃO PARA TOCAR ÁUDIO CENTRAL
    const tocarAudioCentral = useCallback(() => {
        if (audioEstadoRef.current.centralTocando) return;
        if (audioEstadoRef.current.transicaoEmAndamento) return;
        
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
        console.log("🎵 [SystemTurn] Áudio central iniciado");
    }, [playAudioCentral, stopAudioMapa, stopClockAudio]);

    // 🔥 FUNÇÃO PARA TOCAR ÁUDIO DE LOADING
    const tocarAudioLoading = useCallback(() => {
        if (audioEstadoRef.current.loadingTocando) return;
        if (audioEstadoRef.current.transicaoEmAndamento) return;
        
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
        console.log("🎵 [SystemTurn] Áudio de loading iniciado");
    }, [playAudioMapa, stopAudioCentral, stopClockAudio]);

    // 🔥 FUNÇÃO PARA TOCAR O CLOCK
    const tocarClock = useCallback(() => {
        if (audioEstadoRef.current.clockTocando) return;
        if (audioEstadoRef.current.transicaoEmAndamento) return;
        
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
        console.log("🎵 [SystemTurn] Áudio do clock iniciado");
    }, [playClockAudio, stopAudioCentral, stopAudioMapa]);

    // 🔥 FUNÇÃO PARA PARAR TODOS OS ÁUDIOS
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
        console.log("🎵 [SystemTurn] Todos os áudios parados");
    }, [stopAudioMapa, stopAudioCentral, stopClockAudio]);

    // 🔥 CONTROLE DO ÁUDIO
    useEffect(() => {
        return () => {
            pararTodosAudios();
        };
    }, [pararTodosAudios]);

    // 🔥 CONTROLE DO ÁUDIO BASEADO NO ESTADO DO LOADING
    useEffect(() => {
        if (mostrarLoading) {
            tocarAudioLoading();
        } else {
            if (jogoIniciado && dados.dia < 360 && !diasPendentes > 0 && !estaProcessando && !draftAberto && !draftInicialAberto) {
                const timer = setTimeout(() => {
                    tocarAudioCentral();
                }, 300);
                return () => clearTimeout(timer);
            } else {
                if (audioEstadoRef.current.loadingTocando) {
                    stopAudioMapa();
                    audioEstadoRef.current.loadingTocando = false;
                }
            }
        }
    }, [mostrarLoading, jogoIniciado, dados.dia, diasPendentes, estaProcessando, tocarAudioLoading, tocarAudioCentral, stopAudioMapa, draftAberto, draftInicialAberto]);

    // 🔥 CONTROLE DO CLOCK
    useEffect(() => {
        if (diasPendentes > 0 || estaProcessando || draftAberto || draftInicialAberto) {
            if (audioEstadoRef.current.clockTocando) {
                stopClockAudio();
                audioEstadoRef.current.clockTocando = false;
                console.log("🎵 [SystemTurn] Áudio do clock parado");
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

        if (mostrarLoading === false && audioEstadoRef.current.loadingTocando === false) {
            if (countdown <= 10 && countdown > 0) {
                if (!audioEstadoRef.current.clockTocando) {
                    tocarClock();
                }
            } else {
                if (audioEstadoRef.current.clockTocando) {
                    stopClockAudio();
                    audioEstadoRef.current.clockTocando = false;
                }
                if (!audioEstadoRef.current.centralTocando && !audioEstadoRef.current.loadingTocando) {
                    const timer = setTimeout(() => {
                        tocarAudioCentral();
                    }, 200);
                    return () => clearTimeout(timer);
                }
            }
        }
    }, [countdown, mostrarLoading, jogoIniciado, dados.dia, diasPendentes, estaProcessando, tocarClock, tocarAudioCentral, stopClockAudio, stopAudioCentral, draftAberto, draftInicialAberto]);

    // 🔥 CONTROLE DO CLOCK - quando o countdown chega a 0
    useEffect(() => {
        if (countdown === 0 && audioEstadoRef.current.clockTocando) {
            stopClockAudio();
            audioEstadoRef.current.clockTocando = false;
            console.log("🎵 [SystemTurn] Áudio do clock parado (countdown = 0)");
        }
    }, [countdown, stopClockAudio]);

    // 🔥 FUNÇÃO PARA CRIAR MAPA DE EDIFÍCIOS
    const criarMapaEdificios = (dadosAtuais) => {
        const mapa = new Map();
        setoresArr.forEach(setor => {
            if (dadosAtuais[setor]?.edificios) {
                dadosAtuais[setor].edificios.forEach(ed => {
                    mapa.set(ed.nome, ed);
                });
            }
        });
        return mapa;
    };

    // 🔥 FUNÇÃO PARA CALCULAR O CUSTO TOTAL DE UM EDIFÍCIO
    const calcularCustoEdificio = (ed, dadosAtuais) => {
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
            const mapaEdificios = criarMapaEdificios(dadosAtuais);
            ed.recursoDeConstrução.forEach(nome => {
                const recurso = mapaEdificios.get(nome);
                if (recurso) {
                    custoTotal += calcularCustoEdificio(recurso, dadosAtuais);
                }
            });
        }

        return custoTotal;
    };

    // 🔥 FUNÇÃO PARA CALCULAR PATRIMÔNIO DOS SETORES
    const calcularPatrimonioSetores = (dadosAtuais) => {
        const patrimonioSetores = {};
        let patrimonioTotalInventario = 0;

        setoresArr.forEach(setor => {
            let patrimonioSetor = 0;
            const edificios = dadosAtuais[setor]?.edificios || [];
            
            edificios.forEach(ed => {
                if (ed.quantidade > 0) {
                    const custoUnitario = calcularCustoEdificio(ed, dadosAtuais);
                    patrimonioSetor += custoUnitario * ed.quantidade;
                    patrimonioTotalInventario += custoUnitario * ed.quantidade;
                }
            });
            
            patrimonioSetores[setor] = patrimonioSetor;
        });

        setoresArr.forEach(setor => {
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
        });

        const arrayPatrimonioInventario = economiaSetores.patrimonioInventarioHistorico || [];
        const novoArrayInventario = [...arrayPatrimonioInventario, patrimonioTotalInventario];
        
        if (novoArrayInventario.length > 360) {
            novoArrayInventario.splice(0, novoArrayInventario.length - 360);
        }
        
        atualizarEco("patrimonioInventarioHistorico", novoArrayInventario);
        atualizarEco("patrimonioInventarioAtual", patrimonioTotalInventario);

        return { patrimonioSetores, patrimonioTotalInventario };
    };

    // 🔥 FUNÇÃO PARA GERAR HASH DAS CARTAS SELECIONADAS
    const gerarHashCartas = (cartas) => {
        return JSON.stringify(cartas.map(c => 
            c.nome || (c.setor !== undefined && c.index !== undefined ? `${c.setor}-${c.index}` : '')
        ).sort());
    };

    // 🔥 FUNÇÃO PARA FORÇAR ATUALIZAÇÃO DAS CARTAS SELECIONADAS
    const forcarAtualizacaoCartas = useCallback(() => {
        if (atualizandoCartasRef.current) {
            console.log("⚠️ [SystemTurn] Atualização de cartas já em andamento, ignorando...");
            return { nomes: cartasSelecionadasRef.current, mapa: cartasSelecionadasMapRef.current };
        }

        atualizandoCartasRef.current = true;
        
        try {
            const cartas = dados.cartasSelecionadas || [];
            const hashAtual = gerarHashCartas(cartas);
            
            if (hashAtual === ultimoHashCartasRef.current) {
                console.log("ℹ️ [SystemTurn] Hash de cartas não mudou, mantendo atual");
                atualizandoCartasRef.current = false;
                return { nomes: cartasSelecionadasRef.current, mapa: cartasSelecionadasMapRef.current };
            }
            
            console.log(`🔄 [SystemTurn] Hash mudou de "${ultimoHashCartasRef.current}" para "${hashAtual}"`);
            ultimoHashCartasRef.current = hashAtual;
            
            const nomes = [];
            const mapa = new Map();
            
            cartas.forEach((carta) => {
                let nome = null;
                let quantidade = 0;
                let ed = null;
                
                if (carta.nome) {
                    nome = carta.nome;
                    for (const setor of setoresArr) {
                        const encontrado = dados[setor]?.edificios?.find(e => e.nome === nome);
                        if (encontrado) {
                            ed = encontrado;
                            quantidade = encontrado.quantidade || 0;
                            break;
                        }
                    }
                } else if (carta.setor !== undefined && carta.index !== undefined) {
                    ed = dados[carta.setor]?.edificios?.[carta.index];
                    if (ed) {
                        nome = ed.nome;
                        quantidade = ed.quantidade || 0;
                    }
                }
                
                if (nome && ed) {
                    nomes.push(nome);
                    mapa.set(nome, { 
                        nome, 
                        quantidade, 
                        ed,
                        setor: carta.setor || ed.setor,
                        index: carta.index
                    });
                }
            });
            
            cartasSelecionadasRef.current = nomes;
            cartasSelecionadasMapRef.current = mapa;
            console.log(`✅ [SystemTurn] Cartas atualizadas: ${nomes.length} edifícios`);
            
            atualizandoCartasRef.current = false;
            return { nomes, mapa };
            
        } catch (error) {
            console.error("❌ [SystemTurn] Erro ao atualizar cartas:", error);
            atualizandoCartasRef.current = false;
            return { nomes: cartasSelecionadasRef.current, mapa: cartasSelecionadasMapRef.current };
        }
    }, [dados.cartasSelecionadas, dados]);

    // 🔥 FUNÇÃO PARA CARREGAR AS CARTAS SELECIONADAS
    const carregarCartasSelecionadas = useCallback(() => {
        const resultado = forcarAtualizacaoCartas();
        if (resultado.nomes.length === 0) {
            const cartas = dados.cartasSelecionadas || [];
            const nomes = [];
            cartas.forEach((carta) => {
                if (carta.nome) {
                    nomes.push(carta.nome);
                } else if (carta.setor !== undefined && carta.index !== undefined) {
                    const ed = dados[carta.setor]?.edificios?.[carta.index];
                    if (ed) {
                        nomes.push(ed.nome);
                    }
                }
            });
            cartasSelecionadasRef.current = nomes;
            return nomes;
        }
        return resultado.nomes;
    }, [forcarAtualizacaoCartas, dados.cartasSelecionadas, dados]);

    // 🔥 CARREGA AS CARTAS INICIALMENTE
    useEffect(() => {
        if (jogoIniciado && !atualizandoCartasRef.current) {
            const hash = gerarHashCartas(dados.cartasSelecionadas || []);
            if (hash !== ultimoHashCartasRef.current) {
                carregarCartasSelecionadas();
            }
        }
    }, [jogoIniciado]);

    // 🔥 Atualiza o ref sempre que dados mudar
    useEffect(() => {
        dadosRef.current = dados;
    }, [dados]);

    // 🔥 Atualiza o saldo ref sempre que mudar
    useEffect(() => {
        saldoRef.current = economiaSetores.saldo;
    }, [economiaSetores.saldo]);

    const tooltipStyle = {
        backgroundColor: "#FFFFFF",
        color: "#350973",
        borderRadius: "6px",
        padding: "6px 10px",
        fontWeight: "600",
        fontSize: "14px",
    };

    // 🔥 FUNÇÃO PARA EXECUTAR LIQUIDAÇÃO DE EXCEDENTES
    const executarLiquidacao = async () => {
        console.log("🗑️ [SystemTurn] Executando liquidação de excedentes antes do novo mês...");
        try {
            const resultado = await executarLiquidacaoAutomatica(
                dadosRef.current,
                atualizarDadosProf2,
                economiaSetores,
                atualizarEco
            );
            if (resultado.sucesso && resultado.liquidados > 0) {
                console.log(`✅ [SystemTurn] Liquidação concluída: ${resultado.liquidados} tipo(s) vendidos`);
            } else {
                console.log("ℹ️ [SystemTurn] Nenhum excedente para liquidar");
            }
            return resultado;
        } catch (error) {
            console.error("❌ [SystemTurn] Erro na liquidação:", error);
            return null;
        }
    };

    // 🔥 TIMER PRINCIPAL
    useEffect(() => {
        if (!jogoIniciado) return;
        if (diasPendentes > 0 || estaProcessando) return;
        if (draftInicialAberto) return;
        if (draftAberto) return;
        
        if (dados.dia >= 360) {
            console.log("🏁 [SystemTurn] Jogo finalizado! Timer desativado.");
            return;
        }

        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    const diasRestantesParaFim = 360 - dados.dia;
                    
                    if (diasRestantesParaFim <= 0) {
                        console.log("🏁 [SystemTurn] Jogo finalizado! Parando timer.");
                        return getTempoCountdown();
                    }
                    
                    const totalDias = Math.min(30, diasRestantesParaFim);

                    impostoMensalRef.current = 0;
                    faturamentoMensalRef.current = 0;
                    impostoFixoMensalRef.current = 0;
                    impostoFaturamentoMensalRef.current = 0;
                    impostoFixoCalculadoRef.current = false;

                    console.log("🔄 [SystemTurn] Iniciando liquidação de excedentes...");
                    executarLiquidacao().then(() => {
                        console.log("✅ [SystemTurn] Liquidação concluída, iniciando novo mês...");
                    });

                    console.log("🔄 [PREPARANDO MÊS] Forçando sincronização das cartas...");
                    dadosRef.current = dados;
                    
                    const cartas = dados.cartasSelecionadas || [];
                    const mapa = new Map();
                    const nomes = [];
                    
                    console.log(`📋 [PREPARANDO MÊS] ${cartas.length} cartas no context`);
                    
                    cartas.forEach((carta) => {
                        let ed = null;
                        let nome = null;
                        
                        if (carta.nome) {
                            nome = carta.nome;
                            for (const setor of setoresArr) {
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
                                setor: carta.setor,
                                index: carta.index
                            });
                        }
                    });
                    
                    cartasSelecionadasRef.current = nomes;
                    cartasSelecionadasMapRef.current = mapa;
                    
                    console.log("═══════════════════════════════════════════════════════════");
                    console.log(`📋 [INÍCIO DO MÊS] ${nomes.length} EDIFÍCIOS SELECIONADOS:`);
                    if (nomes.length > 0) {
                        nomes.forEach(nome => {
                            const info = mapa.get(nome);
                            console.log(`   📌 ${nome}: ${info.quantidade} unidade${info.quantidade > 1 ? 's' : ''}`);
                        });
                    } else {
                        console.log("   ⚠️ Nenhum edifício selecionado");
                    }
                    console.log("═══════════════════════════════════════════════════════════");

                    diasRestantesRef.current = totalDias;
                    setDiasPendentes(totalDias);

                    return getTempoCountdown();
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [diasPendentes, estaProcessando, dados.cartasSelecionadas, jogoIniciado, dados.dia, getTempoCountdown, draftInicialAberto, draftAberto]);

    // 🔥 PROCESSAMENTO DOS DIAS
    useEffect(() => {
        if (!jogoIniciado) return;
        if (diasPendentes <= 0 || processandoRef.current) return;
        if (draftInicialAberto) return;
        if (draftAberto) return;
        
        if (dados.dia >= 360) {
            console.log("🏁 [SystemTurn] Jogo finalizado! Parando processamento.");
            setDiasPendentes(0);
            setEstaProcessando(false);
            processandoRef.current = false;
            setMostrarLoading(false);
            return;
        }

        const resultado = forcarAtualizacaoCartas();
        if (resultado.nomes.length === 0) {
            carregarCartasSelecionadas();
        }

        console.log(`🚀 [Processamento] INICIANDO ${diasPendentes} dias`);
        processandoRef.current = true;
        setEstaProcessando(true);

        const processarProximoDia = () => {
            if (dadosRef.current.dia >= 360) {
                console.log("🏁 [SystemTurn] Jogo finalizado! Parando processamento.");
                setDiasPendentes(0);
                setEstaProcessando(false);
                processandoRef.current = false;
                setMostrarLoading(false);
                return;
            }

            if (diasRestantesRef.current <= 0) {
                console.log(`✅ [Processamento] FINALIZADO!`);
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
                console.log("🏁 [SystemTurn] Próximo dia ultrapassa 360! Finalizando.");
                setDiasPendentes(0);
                setEstaProcessando(false);
                processandoRef.current = false;
                setMostrarLoading(false);
                return;
            }

            if (proximoDia === 360) {
                setTimeout(() => {
                    try {
                        const resultadoDia = calcularFaturamentoDoDia(proximoDia, dadosAtuais);
                        const { faturamentoDiario, detalhesEdificios, totalAumFatu, totalRedCusto } = resultadoDia;
                        
                        calcularPatrimonioSetores(dadosAtuais);
                        const impostoSobreFatuDia = calcularImpostoSobreFaturamentoDiario(dadosAtuais);
                        
                        faturamentoMensalRef.current += faturamentoDiario;
                        impostoFaturamentoMensalRef.current += impostoSobreFatuDia;
                        const impostoTotalDia = impostoSobreFatuDia;
                        
                        atualizarDados("dia", proximoDia);
                        dadosRef.current = { ...dadosAtuais, dia: proximoDia };
                        
                        const novoSaldo = saldoAtual + faturamentoDiario - impostoTotalDia;
                        atualizarEco("saldo", novoSaldo);
                        saldoRef.current = novoSaldo;
                        
                        const powerUpsAumFatu = economiaSetores.powerUps?.aumentoFaturamentoDiario || [];
                        const powerUpsRedCusto = economiaSetores.powerUps?.reducaoCustoDiario || [];
                        const novoAumFatu = [...powerUpsAumFatu, totalAumFatu];
                        const novoRedCusto = [...powerUpsRedCusto, totalRedCusto];
                        
                        if (novoAumFatu.length > 360) {
                            novoAumFatu.splice(0, novoAumFatu.length - 360);
                        }
                        if (novoRedCusto.length > 360) {
                            novoRedCusto.splice(0, novoRedCusto.length - 360);
                        }
                        
                        atualizarEco("powerUps", {
                            ...economiaSetores.powerUps,
                            aumentoFaturamentoDiario: novoAumFatu,
                            reducaoCustoDiario: novoRedCusto,
                            aumentoFaturamentoAtual: totalAumFatu,
                            reducaoCustoAtual: totalRedCusto,
                        });
                        
                        console.log("───────────────────────────────────────────────────────────────");
                        console.log(`📅 DIA ${proximoDia} - 🏁 ÚLTIMO DIA!`);
                        console.log(`   📊 Faturamento Bruto: R$ ${faturamentoDiario.toFixed(2)}`);
                        console.log(`   📊 Imposto: R$ ${impostoSobreFatuDia.toFixed(2)}`);
                        console.log(`   📊 Saldo Final: R$ ${novoSaldo.toFixed(2)}`);
                        console.log("───────────────────────────────────────────────────────────────");
                        
                        console.log("🏁 [SystemTurn] Jogo finalizado no dia 360!");
                        
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

            // Processamento normal do dia
            const resultadoDia = calcularFaturamentoDoDia(proximoDia, dadosAtuais);
            const { faturamentoDiario, detalhesEdificios, totalAumFatu, totalRedCusto } = resultadoDia;

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

            const impostoMensalParcial = impostoFaturamentoMensalRef.current;
            
            atualizarEco("imposto", {
                ...economiaSetores.imposto,
                impostoDiário: impostoTotalDia,
                impostoMensal: impostoMensalParcial,
                impostoFixoMensal: impostoFixoMensalRef.current,
                impostoFaturamentoMensal: impostoFaturamentoMensalRef.current,
                impostoSobreFaturamentoDiário: impostoSobreFatuDia,
            });

            const powerUpsAumFatu = economiaSetores.powerUps?.aumentoFaturamentoDiario || [];
            const powerUpsRedCusto = economiaSetores.powerUps?.reducaoCustoDiario || [];
            
            const novoAumFatu = [...powerUpsAumFatu, totalAumFatu];
            const novoRedCusto = [...powerUpsRedCusto, totalRedCusto];
            
            if (novoAumFatu.length > 360) {
                novoAumFatu.splice(0, novoAumFatu.length - 360);
            }
            if (novoRedCusto.length > 360) {
                novoRedCusto.splice(0, novoRedCusto.length - 360);
            }
            
            atualizarEco("powerUps", {
                ...economiaSetores.powerUps,
                aumentoFaturamentoDiario: novoAumFatu,
                reducaoCustoDiario: novoRedCusto,
                aumentoFaturamentoAtual: totalAumFatu,
                reducaoCustoAtual: totalRedCusto,
            });

            diasRestantesRef.current--;
            setDiasPendentes(diasRestantesRef.current);

            console.log("───────────────────────────────────────────────────────────────");
            console.log(`📅 DIA ${proximoDia} - RESUMO DO FATURAMENTO:`);
            console.log(`   📊 Faturamento Bruto: R$ ${faturamentoDiario.toFixed(2)}`);
            console.log(`   📊 Imposto S/Faturamento: R$ ${impostoSobreFatuDia.toFixed(2)}`);
            console.log(`   📊 Lucro Líquido do Dia: R$ ${(faturamentoDiario - impostoTotalDia).toFixed(2)}`);
            console.log(`   📊 Despesas do Dia: R$ ${impostoTotalDia.toFixed(2)}`);
            console.log(`   📊 Saldo Atualizado: R$ ${novoSaldo.toFixed(2)}`);
            
            console.log(`   ⚡ Power-ups do dia:`);
            console.log(`      🔼 Aumento Faturamento: +${totalAumFatu.toFixed(1)}%`);
            console.log(`      🔽 Redução de Custo: -${totalRedCusto.toFixed(1)}%`);
            console.log(`   📊 Power-ups em array (últimos 10 dias):`);
            console.log(`      🔼 AumFatu: [${novoAumFatu.slice(-10).map(v => v.toFixed(1)).join(', ')}]`);
            console.log(`      🔽 RedCusto: [${novoRedCusto.slice(-10).map(v => v.toFixed(1)).join(', ')}]`);
            
            if (detalhesEdificios && detalhesEdificios.length > 0) {
                console.log(`   🏗️ Detalhes por edifício:`);
                detalhesEdificios.forEach(d => {
                    console.log(`      📌 ${d.nome}: ${d.quantidade} unidade(s) → Faturamento: R$ ${d.faturamento.toFixed(2)} | AumFatu: +${d.aumFatu}% | RedCusto: -${d.redCusto}%`);
                });
            }
            console.log(`   📊 Progresso: ${30 - diasRestantesRef.current}/30 dias`);
            console.log("───────────────────────────────────────────────────────────────");

            if (diasRestantesRef.current > 0) {
                setTimeout(processarProximoDia, 500);
            } else {
                setTimeout(() => {
                    console.log(`✅ [Processamento] FINALIZADO!`);
                    finalizarProcessamentoMensal();
                    setEstaProcessando(false);
                    processandoRef.current = false;
                    setDiasPendentes(0);
                }, 500);
            }
        };

        setTimeout(processarProximoDia, 500);

    }, [diasPendentes, jogoIniciado, dados.dia, getTempoCountdown, draftInicialAberto, draftAberto]);

    // 🔥 FUNÇÃO PARA FINALIZAR O PROCESSAMENTO MENSAL
    const finalizarProcessamentoMensal = () => {
        setMostrarLoading(false);

        console.log("═══════════════════════════════════════════════════════════");
        console.log("📊 FINALIZANDO PROCESSAMENTO MENSAL");
        
        const impostoTotalMensal = impostoFixoMensalRef.current + impostoFaturamentoMensalRef.current;
        impostoMensalRef.current = impostoTotalMensal;

        const saldoFinal = saldoRef.current - impostoFixoMensalRef.current;
        atualizarEco("saldo", saldoFinal);
        saldoRef.current = saldoFinal;

        console.log(`💰 ABATENDO IMPOSTO FIXO: R$ ${impostoFixoMensalRef.current.toFixed(2)}`);
        console.log(`💰 SALDO FINAL: R$ ${saldoFinal.toFixed(2)}`);
        console.log(`📊 FATURAMENTO MENSAL TOTAL: R$ ${faturamentoMensalRef.current.toFixed(2)}`);
        console.log(`📊 IMPOSTO MENSAL TOTAL: R$ ${impostoTotalMensal.toFixed(2)}`);
        console.log(`📊 LUCRO MENSAL LÍQUIDO: R$ ${(faturamentoMensalRef.current - impostoTotalMensal).toFixed(2)}`);
        
        console.log(`⚡ POWER-UPS DO MÊS:`);
        const powerUpsAumFatu = economiaSetores.powerUps?.aumentoFaturamentoDiario || [];
        const powerUpsRedCusto = economiaSetores.powerUps?.reducaoCustoDiario || [];
        console.log(`   🔼 Média AumFatu: ${(powerUpsAumFatu.reduce((a, b) => a + b, 0) / (powerUpsAumFatu.length || 1)).toFixed(1)}%`);
        console.log(`   🔽 Média RedCusto: ${(powerUpsRedCusto.reduce((a, b) => a + b, 0) / (powerUpsRedCusto.length || 1)).toFixed(1)}%`);

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

        console.log("═══════════════════════════════════════════════════════════");
    };

    const TooltipPadrao = ({ id }) => (
        <Tooltip
            id={id}
            style={tooltipStyle}
            border="1px solid #350973"
        />
    );

    // 🔥 FUNÇÃO PARA VERIFICAR SE UM EDIFÍCIO ESTÁ SELECIONADO
    const isEdificioSelecionado = (ed) => {
        if (!ed || !ed.nome) return false;
        const info = cartasSelecionadasMapRef.current.get(ed.nome);
        if (info) {
            if (info.quantidade !== ed.quantidade) {
                info.quantidade = ed.quantidade;
            }
            return true;
        }
        return cartasSelecionadasRef.current.includes(ed.nome);
    };

    // 🔥 CALCULA IMPOSTO FIXO MENSAL
    const calcularImpostoFixoMensal = (dadosAtuais) => {
        let totalImpostoFixo = 0;
        const mapaEdificios = criarMapaEdificios(dadosAtuais);

        todasLojas.forEach((loja) => {
            const dadosLoja = dadosAtuais[loja] || {};
            const quantidade = dadosLoja.quantidade || 0;
            const impostoFixo = dadosLoja.impostoFixo || 0;
            totalImpostoFixo += quantidade * impostoFixo;
        });

        setoresArr.forEach((setor) => {
            const edificios = dadosAtuais[setor]?.edificios || [];
            edificios.forEach((ed) => {
                const quantidade = ed.quantidade || 0;
                const impostoFixo = ed.finanças?.impostoFixo || 0;
                const selecionado = isEdificioSelecionado(ed);
                if (quantidade > 0 && selecionado) {
                    const qtdMin2 = ed?.powerUp?.nível2?.quantidadeMínima ?? Infinity;
                    const qtdMin3 = ed?.powerUp?.nível3?.quantidadeMínima ?? Infinity;
                    const nivelPU = quantidade >= qtdMin3 ? "powerUpNv3" 
                        : quantidade >= qtdMin2 ? "powerUpNv2" 
                        : "powerUpNv1";

                    let redCusto = 0;
                    if (Array.isArray(ed?.RecebeMelhoraEficiencia)) {
                        ed.RecebeMelhoraEficiencia.forEach((rel) => {
                            const outroEd = mapaEdificios.get(rel.nome);
                            if (outroEd && outroEd.quantidade > 0) {
                                const nivel = nivelPU === "powerUpNv1" ? "nível1"
                                    : nivelPU === "powerUpNv2" ? "nível2"
                                    : "nível3";
                                redCusto += rel?.redCusto?.[nivel] || 0;
                            }
                        });
                    }

                    const impostoFixoFinal = impostoFixo * (1 - redCusto / 100);
                    totalImpostoFixo += quantidade * impostoFixoFinal;
                }
            });
        });

        return totalImpostoFixo;
    };

    // 🔥 CALCULA IMPOSTO SOBRE FATURAMENTO DIÁRIO
    const calcularImpostoSobreFaturamentoDiario = (dadosAtuais) => {
        let totalImpostoFaturamento = 0;
        const mapaEdificios = criarMapaEdificios(dadosAtuais);

        todasLojas.forEach((loja) => {
            const dadosLoja = dadosAtuais[loja] || {};
            const faturamento = dadosLoja.faturamentoTotal || 0;
            const aliquota = dadosLoja.impostoSobreFaturamento || 0;
            totalImpostoFaturamento += faturamento * aliquota;
        });

        setoresArr.forEach((setor) => {
            const edificios = dadosAtuais[setor]?.edificios || [];
            edificios.forEach((ed) => {
                const quantidade = ed.quantidade || 0;
                const faturamento = ed.faturamentoTotal || 0;
                const aliquota = ed.finanças?.impostoSobreFatu || 0;
                const selecionado = isEdificioSelecionado(ed);
                if (quantidade > 0 && selecionado) {
                    const qtdMin2 = ed?.powerUp?.nível2?.quantidadeMínima ?? Infinity;
                    const qtdMin3 = ed?.powerUp?.nível3?.quantidadeMínima ?? Infinity;
                    const nivelPU = quantidade >= qtdMin3 ? "powerUpNv3" 
                        : quantidade >= qtdMin2 ? "powerUpNv2" 
                        : "powerUpNv1";

                    let redCusto = 0;
                    if (Array.isArray(ed?.RecebeMelhoraEficiencia)) {
                        ed.RecebeMelhoraEficiencia.forEach((rel) => {
                            const outroEd = mapaEdificios.get(rel.nome);
                            if (outroEd && outroEd.quantidade > 0) {
                                const nivel = nivelPU === "powerUpNv1" ? "nível1"
                                    : nivelPU === "powerUpNv2" ? "nível2"
                                    : "nível3";
                                redCusto += rel?.redCusto?.[nivel] || 0;
                            }
                        });
                    }

                    const aliquotaFinal = aliquota * (1 - redCusto / 100);
                    totalImpostoFaturamento += faturamento * aliquotaFinal;
                }
            });
        });

        return totalImpostoFaturamento;
    };

    // 🔥 FUNÇÃO: CALCULA O FATURAMENTO DO DIA
    const calcularFaturamentoDoDia = (diaAtual, dadosAtuais) => {
        let faturamentoTotal = 0;
        let faturamentoLojas = 0;
        let faturamentoEdificios = 0;
        const mapaEdificios = criarMapaEdificios(dadosAtuais);
        
        let totalAumFatu = 0;
        let totalRedCusto = 0;
        const detalhesEdificios = [];

        const novasLojas = todasLojas.map((loja) => {
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

            return {
                ...dadosLoja,
                faturamentoUnitário: valorVariável,
                faturamentoTotal: faturamentoLoja,
                arrayFatu: novoArrayFatu,
                somaArrayFatu: somaMensalFatu,
            };
        });

        const ehPrimeiroDiaDoMes = diaAtual % 30 === 1;

        setoresArr.forEach((setor) => {
            const edificiosOriginais = dadosAtuais[setor]?.edificios || [];
            let faturamentoTotalSetor = 0;

            const edificiosAtualizados = edificiosOriginais.map((ed) => {
                const quantidade = ed.quantidade || 0;
                const selecionado = isEdificioSelecionado(ed);
                const deveProcessar = quantidade > 0 && selecionado;

                if (!deveProcessar) return ed;

                const faturamentoUnitario = ed?.finanças?.faturamentoUnitário || 0;

                const qtdMin2 = ed?.powerUp?.nível2?.quantidadeMínima ?? Infinity;
                const qtdMin3 = ed?.powerUp?.nível3?.quantidadeMínima ?? Infinity;
                const nivelPU = quantidade >= qtdMin3 ? "powerUpNv3" 
                    : quantidade >= qtdMin2 ? "powerUpNv2" 
                    : "powerUpNv1";

                let aumFatu = 0;
                let redCusto = 0;

                if (Array.isArray(ed?.RecebeMelhoraEficiencia)) {
                    ed.RecebeMelhoraEficiencia.forEach((rel) => {
                        const outroEd = mapaEdificios.get(rel.nome);
                        if (outroEd && outroEd.quantidade > 0) {
                            const nivel = nivelPU === "powerUpNv1" ? "nível1"
                                : nivelPU === "powerUpNv2" ? "nível2"
                                : "nível3";
                            aumFatu += rel?.aumFatu?.[nivel] || 0;
                            redCusto += rel?.redCusto?.[nivel] || 0;
                        }
                    });
                }

                totalAumFatu += aumFatu;
                totalRedCusto += redCusto;

                const valorFatuFinal = faturamentoUnitario * (1 + aumFatu / 100);
                const economiaSetor = economiaSetores[setor]?.economiaSetor?.estadoAtual || "estável";
                const fatorEconomico = FATOR_ECONOMIA[economiaSetor] || 1;
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

                return {
                    ...ed,
                    arrayFatu: novoArrayFatu,
                    somaArrayFatu: somaMensalFatu,
                    faturamentoTotal: faturamentoDiario,
                };
            });

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
        });

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

        todasLojas.forEach((loja, index) => {
            atualizarDados(loja, novasLojas[index]);
        });

        return {
            faturamentoDiario: faturamentoTotal,
            detalhesEdificios,
            totalAumFatu,
            totalRedCusto
        };
    };

    return (
        <div className="flex">
            <LoadingScreen 
                visible={mostrarLoading} 
                onComplete={() => setMostrarLoading(false)} 
            />
            
            {/* ── DRAFT INICIAL (4 CARTAS C + 1 CARTA B) ── */}
            {draftInicialAberto && (
                <DraftSystemInicial 
                    onClose={() => {}}
                    onComplete={handleDraftInicialComplete}
                    quantidadeOpcoes={3}
                    titulo="📋 Draft Inicial"
                    instrucao="📌 Escolha 4 cartas Classe C e 1 carta Classe B para começar sua jornada!"
                />
            )}

            {/* ── DRAFT CONTÍNUO (1 CARTA POR RANK) ── */}
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
            
            {/* 🔥 TIMER COM ESTÉTICA VERMELHA E TEMPO VARIÁVEL */}
            <div
                data-tooltip-id="saldo-tip"
                data-tooltip-content={
                    diasPendentes > 0 || estaProcessando
                        ? `Processando ${30 - (diasPendentes || 0)}/30 dias...`
                        : countdown > 10 
                            ? `Próxima simulação em ${countdown} segundos`
                            : `⚠️ ÚLTIMOS ${countdown} SEGUNDOS!`
                }
                className="h-[50px] min-w-[120px] rounded-[10px] flex items-center justify-center px-4 font-bold text-white transition-all duration-300"
                style={{
                    backgroundColor: countdown <= 10 && countdown > 0 ? '#cc0000' : '#F27405',
                    boxShadow: countdown <= 10 && countdown > 0 ? '0 0 40px rgba(255,0,0,0.6)' : '0 0 20px rgba(242,116,5,0.3)',
                    animation: countdown <= 10 && countdown > 0 ? 'pulse-timer 0.8s infinite' : 'none',
                    border: countdown <= 10 && countdown > 0 ? '2px solid #ff3333' : 'none',
                    transform: countdown <= 10 && countdown > 0 ? 'scale(1.02)' : 'scale(1)',
                }}
            >
                {diasPendentes > 0 || estaProcessando
                    ? `${30 - (diasPendentes || 0)}/30`
                    : countdown <= 10 && countdown > 0
                        ? `⚠️ ${String(countdown).padStart(2, "0")}s`
                        : `${String(countdown).padStart(2, "0")}s`}
            </div>
            
            <TooltipPadrao id="saldo-tip" />
            
            <style>{`
                @keyframes pulse-timer {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.05); opacity: 0.85; }
                }
            `}</style>
        </div>
    );
}