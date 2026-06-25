// Sistema de Gerenciamento de Capacidade de Cartas - SlotManager.jsx
import React, { useContext, useEffect, useState, useCallback } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";

// ─── CONSTANTES (MESMAS DO DASHBOARD) ──────────────────────────────
const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

const FATOR_ECONOMIA = {
    recessão: 0.4,
    declinio: 0.8,
    estável: 1,
    progressiva: 1.1,
    aquecida: 1.25
};

// ─── FUNÇÕES AUXILIARES (MESMAS DO DASHBOARD) ──────────────────────
const criarMapaEdificios = (dados) => {
    const mapa = new Map();
    setoresArr.forEach(setor => {
        if (dados[setor]?.edificios) {
            dados[setor].edificios.forEach(ed => {
                mapa.set(ed.nome, ed);
            });
        }
    });
    return mapa;
};

const criarCalculadoraCustoRecurso = (mapaEdificios, dados) => {
    const cache = new Map();

    const calcularCustoRecurso = (nomeRecurso) => {
        if (cache.has(nomeRecurso)) return cache.get(nomeRecurso);

        const edEncontrado = mapaEdificios.get(nomeRecurso);
        if (!edEncontrado) return 0;

        const c = edEncontrado.custoConstrucao || 0;
        const tNec = edEncontrado.lojasNecessarias?.terrenos || 0;
        const pNec = edEncontrado.lojasNecessarias?.lojasP || 0;
        const mNec = edEncontrado.lojasNecessarias?.lojasM || 0;
        const gNec = edEncontrado.lojasNecessarias?.lojasG || 0;

        let total = c
            + tNec * (dados.terrenos?.preçoConstrução || 0)
            + pNec * ((dados.lojasP?.preçoConstrução || 0) + (dados.lojasP?.quantidadeNecTerreno || 0) * (dados.terrenos?.preçoConstrução || 0))
            + mNec * ((dados.lojasM?.preçoConstrução || 0) + (dados.lojasM?.quantidadeNecTerreno || 0) * (dados.terrenos?.preçoConstrução || 0))
            + gNec * ((dados.lojasG?.preçoConstrução || 0) + (dados.lojasG?.quantidadeNecTerreno || 0) * (dados.terrenos?.preçoConstrução || 0));

        if (Array.isArray(edEncontrado.recursoDeConstrução) && edEncontrado.recursoDeConstrução.length > 0) {
            edEncontrado.recursoDeConstrução.forEach((sub) => {
                total += calcularCustoRecurso(sub);
            });
        }

        cache.set(nomeRecurso, total);
        return total;
    };

    return calcularCustoRecurso;
};

// ─── FUNÇÃO DE CÁLCULO DE ROI (IGUAL À DO DASHBOARD) ───────────────
const calcROI = (ed, dados, economiaSetor, mapaEdificios, calcularCustoRecurso) => {
    if (!ed || !dados) return 0;

    try {
        const fatorEconomico = FATOR_ECONOMIA[economiaSetor] || 1;

        const quantidadeAtual = ed.quantidade || 0;
        const qtdMin2 = ed?.powerUp?.nível2?.quantidadeMínima ?? Infinity;
        const qtdMin3 = ed?.powerUp?.nível3?.quantidadeMínima ?? Infinity;

        const nivelPU = quantidadeAtual >= qtdMin3 ? "powerUpNv3"
            : quantidadeAtual >= qtdMin2 ? "powerUpNv2"
                : "powerUpNv1";

        let redCusto = 0;
        let aumFatu = 0;

        if (Array.isArray(ed?.RecebeMelhoraEficiencia)) {
            ed.RecebeMelhoraEficiencia.forEach((rel) => {
                const outroEd = mapaEdificios.get(rel.nome);
                if (outroEd && outroEd.quantidade > 0) {
                    const nivel = nivelPU === "powerUpNv1" ? "nível1"
                        : nivelPU === "powerUpNv2" ? "nível2"
                            : "nível3";

                    redCusto += rel?.redCusto?.[nivel] || 0;
                    aumFatu += rel?.aumFatu?.[nivel] || 0;
                }
            });
        }

        const valorFatu = ed?.finanças?.faturamentoUnitário || 0;
        const impostoFixo = ed?.finanças?.impostoFixo || 0;
        const impostoFatu = ed?.finanças?.impostoSobreFatu || 0;

        const valorFatuFinal = valorFatu * (1 + aumFatu / 100);
        const impostoFixoFinal = impostoFixo * (1 - redCusto / 100);
        const impostoFatuFinal = impostoFatu * (1 - redCusto / 100);

        const fatuMensal = valorFatuFinal * 30 * fatorEconomico;
        const impostoSobreFatuValor = fatuMensal * impostoFatuFinal;
        const lucro = fatuMensal - impostoSobreFatuValor - impostoFixoFinal;

        const custoBase =
            (ed?.lojasNecessarias?.terrenos || 0) * (dados?.terrenos?.preçoConstrução || 0) +
            (ed?.lojasNecessarias?.lojasP || 0) * ((dados?.lojasP?.preçoConstrução || 0) + (dados?.lojasP?.quantidadeNecTerreno || 0) * (dados?.terrenos?.preçoConstrução || 0)) +
            (ed?.lojasNecessarias?.lojasM || 0) * ((dados?.lojasM?.preçoConstrução || 0) + (dados?.lojasM?.quantidadeNecTerreno || 0) * (dados?.terrenos?.preçoConstrução || 0)) +
            (ed?.lojasNecessarias?.lojasG || 0) * ((dados?.lojasG?.preçoConstrução || 0) + (dados?.lojasG?.quantidadeNecTerreno || 0) * (dados?.terrenos?.preçoConstrução || 0));

        let custoRecursos = 0;
        if (Array.isArray(ed?.recursoDeConstrução)) {
            ed.recursoDeConstrução.forEach((nome) => {
                custoRecursos += calcularCustoRecurso(nome);
            });
        }

        const custoTotal = custoBase + custoRecursos + (ed?.custoConstrucao || 0);

        return custoTotal > 0 ? (lucro / custoTotal) * 100 : 0;

    } catch (err) {
        console.error("Erro no calcROI:", err);
        return 0;
    }
};

// ─── CONFIGURAÇÃO DOS LIMITES POR DIA ──────────────────────────────
const LIMITE_CONFIG = {
    fases: [
        { diaMax: 90, limiteBase: 10, slotsExtrasMax: 5 },
        { diaMax: 180, limiteBase: 15, slotsExtrasMax: 5 },
        { diaMax: 270, limiteBase: 20, slotsExtrasMax: 5 },
        { diaMax: Infinity, limiteBase: 25, slotsExtrasMax: 5 }
    ]
};

// ─── FUNÇÃO PARA CALCULAR O LIMITE ATUAL ───────────────────────────
const getLimitesPorDia = (dia) => {
    const fase = LIMITE_CONFIG.fases.find(f => dia <= f.diaMax) || LIMITE_CONFIG.fases[LIMITE_CONFIG.fases.length - 1];
    return {
        limiteBase: fase.limiteBase,
        slotsExtrasMax: fase.slotsExtrasMax,
        limiteTotal: fase.limiteBase + fase.slotsExtrasMax
    };
};

// ═══════════════════════════════════════════════════════════════════
// 1. HOOK useSlotVerification
// ═══════════════════════════════════════════════════════════════════
export const useSlotVerification = () => {
    const { dados } = useContext(CentraldeDadosContext);
    const { economiaSetores } = useContext(DadosEconomyGlobalContext);
    
    const getDadosCapacidade = useCallback(() => {
        const dia = dados.dia || 0;
        const limites = getLimitesPorDia(dia);
        const slotsExtras = dados.slotsExtrasComprados || 0;
        const limiteAtual = limites.limiteBase + slotsExtras;
        
        const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];
        const nomesSet = new Set();
        setoresArr.forEach(setor => {
            dados[setor]?.edificios?.forEach(ed => {
                if (ed.quantidade > 0) nomesSet.add(ed.nome);
            });
        });
        
        const tiposUnicos = nomesSet.size;
        const excedente = Math.max(0, tiposUnicos - limiteAtual);
        
        return {
            tiposUnicos,
            limiteAtual,
            excedente,
            estaAcimaDoLimite: excedente > 0,
            slotsExtras,
            slotsExtrasMax: limites.slotsExtrasMax
        };
    }, [dados]);
    
    return getDadosCapacidade;
};

// ═══════════════════════════════════════════════════════════════════
// 2. FUNÇÃO liquidarExcedentes (CORRIGIDA)
// ═══════════════════════════════════════════════════════════════════
export const liquidarExcedentes = async (dados, atualizarDadosProf2, economiaSetores, atualizarEco) => {
    console.log("🔄 [SlotManager] Iniciando liquidação de excedentes...");
    
    const LIMITE_POR_CARTA = 3;
    let totalLiquidado = 0;
    let totalRecebido = 0;
    const vendidos = [];
    
    // 🔥 FUNÇÃO AUXILIAR PARA CALCULAR CUSTO E VALOR DE VENDA
    const calcularValorVenda = (ed, dados) => {
        const custoBase =
            (ed?.lojasNecessarias?.terrenos || 0) * (dados?.terrenos?.preçoConstrução || 0) +
            (ed?.lojasNecessarias?.lojasP || 0) * ((dados?.lojasP?.preçoConstrução || 0) + (dados?.lojasP?.quantidadeNecTerreno || 0) * (dados?.terrenos?.preçoConstrução || 0)) +
            (ed?.lojasNecessarias?.lojasM || 0) * ((dados?.lojasM?.preçoConstrução || 0) + (dados?.lojasM?.quantidadeNecTerreno || 0) * (dados?.terrenos?.preçoConstrução || 0)) +
            (ed?.lojasNecessarias?.lojasG || 0) * ((dados?.lojasG?.preçoConstrução || 0) + (dados?.lojasG?.quantidadeNecTerreno || 0) * (dados?.terrenos?.preçoConstrução || 0));
        
        let custoRecursos = 0;
        if (Array.isArray(ed?.recursoDeConstrução)) {
            const mapaEd = criarMapaEdificios(dados);
            const calc = criarCalculadoraCustoRecurso(mapaEd, dados);
            ed.recursoDeConstrução.forEach((nome) => {
                custoRecursos += calc(nome);
            });
        }
        
        const custoTotal = custoBase + custoRecursos + (ed?.custoConstrucao || 0);
        return custoTotal * 0.7; // 70% do valor
    };
    
    // ─── PASSO 1: LIQUIDAR CÓPIAS EXCEDENTES (> 3) ───
    console.log(`🔥 [SlotManager] Verificando cópias excedentes (limite: ${LIMITE_POR_CARTA} por carta)...`);
    
    for (const setor of setoresArr) {
        const edificios = dados[setor]?.edificios || [];
        for (let idx = 0; idx < edificios.length; idx++) {
            const ed = edificios[idx];
            if (!ed || ed.quantidade <= LIMITE_POR_CARTA) continue;
            
            const qtdExcesso = ed.quantidade - LIMITE_POR_CARTA;
            const novaQuantidade = LIMITE_POR_CARTA;
            
            // Calcula o valor de venda das cópias excedentes
            const valorPorUnidade = calcularValorVenda(ed, dados);
            const totalVenda = valorPorUnidade * qtdExcesso;
            
            console.log(`   🗑️ ${ed.nome}: ${ed.quantidade} → ${novaQuantidade} (${qtdExcesso} cópias vendidas por R$ ${totalVenda.toFixed(2)})`);
            
            // Atualiza a quantidade
            const path = [setor, "edificios", idx, "quantidade"];
            await atualizarDadosProf2(path, novaQuantidade);
            
            // Atualiza o saldo
            const saldoAtual = economiaSetores.saldo || 0;
            await atualizarEco("saldo", saldoAtual + totalVenda);
            
            totalLiquidado += qtdExcesso;
            totalRecebido += totalVenda;
            vendidos.push({
                nome: ed.nome,
                quantidade: qtdExcesso,
                valor: totalVenda,
                motivo: `Excesso de cópias (>${LIMITE_POR_CARTA})`
            });
        }
    }
    
    // ─── PASSO 2: VERIFICAR EXCEDENTE DE TIPOS ÚNICOS ───
    // 🔥 IMPORTANTE: RECALCULA OS DADOS APÓS A LIQUIDAÇÃO DAS CÓPIAS
    console.log("📊 [SlotManager] Recalculando tipos únicos após liquidação de cópias...");
    
    // Cria o mapa de edifícios e a calculadora de custo (igual ao Dashboard)
    const mapaEdificios = criarMapaEdificios(dados);
    const calcularCustoRecurso = criarCalculadoraCustoRecurso(mapaEdificios, dados);
    const cacheROI = new Map();
    
    const dia = dados.dia || 0;
    const limites = getLimitesPorDia(dia);
    const slotsExtras = dados.slotsExtrasComprados || 0;
    const limiteAtual = limites.limiteBase + slotsExtras;
    
    // Coleta todos os edifícios com quantidade > 0
    let todosEdificios = [];
    setoresArr.forEach(setor => {
        dados[setor]?.edificios?.forEach((ed, idx) => {
            if (ed.quantidade > 0) {
                const economiaSetor = economiaSetores[setor]?.economiaSetor?.estadoAtual || 'estável';
                const chave = `${ed.nome}_${ed.quantidade}`;
                
                let roi;
                if (cacheROI.has(chave)) {
                    roi = cacheROI.get(chave);
                } else {
                    roi = calcROI(ed, dados, economiaSetor, mapaEdificios, calcularCustoRecurso);
                    cacheROI.set(chave, roi);
                }
                
                todosEdificios.push({
                    nome: ed.nome,
                    setor: setor,
                    index: idx,
                    quantidade: ed.quantidade,
                    roi: roi,
                    ed: ed
                });
            }
        });
    });
    
    // Calcula tipos únicos atuais
    const nomesSet = new Set();
    todosEdificios.forEach(ed => nomesSet.add(ed.nome));
    let tiposUnicos = nomesSet.size;
    let excedenteTipos = Math.max(0, tiposUnicos - limiteAtual);
    
    console.log(`📊 [SlotManager] Tipos únicos: ${tiposUnicos}, Limite: ${limiteAtual}, Excedente: ${excedenteTipos}`);
    
    if (excedenteTipos <= 0) {
        // console.log("✅ [SlotManager] Nenhum excedente de tipos encontrado.");
        return {
            sucesso: true,
            liquidados: vendidos.length,
            liquidadosUnidades: totalLiquidado,
            vendidos,
            totalRecebido,
            mensagem: `${totalLiquidado} cópia(s) excedente(s) liquidadas. Total: R$ ${totalRecebido.toFixed(2)}`
        };
    }
    
    // ─── PASSO 3: LIQUIDAR TIPOS EXCEDENTES (PELO ROI) ───
    // Ordena por ROI (menor primeiro)
    todosEdificios.sort((a, b) => a.roi - b.roi);
    
    // console.log(`🔄 [SlotManager] ${excedenteTipos} tipo(s) excedente(s) - Liquidando os com pior ROI:`);
    
    let excedenteTemp = excedenteTipos;
    let liquidadosTipos = 0;
    let liquidadosUnidadesTipos = 0;
    
    for (const ed of todosEdificios) {
        if (excedenteTemp <= 0) break;
        
        // Verifica se este edifício ainda existe (pode ter sido liquidado no passo 1)
        const edAtual = dados[ed.setor]?.edificios?.[ed.index];
        if (!edAtual || edAtual.quantidade <= 0) continue;
        
        // Calcula o valor de venda
        const valorPorUnidade = calcularValorVenda(edAtual, dados);
        const totalVenda = valorPorUnidade * edAtual.quantidade;
        
        // console.log(`   🗑️ ${ed.nome}: ${edAtual.quantidade} unidade(s) (ROI: ${ed.roi.toFixed(2)}%) → R$ ${totalVenda.toFixed(2)}`);
        
        const path = [ed.setor, "edificios", ed.index, "quantidade"];
        await atualizarDadosProf2(path, 0);
        
        const saldoAtual = economiaSetores.saldo || 0;
        await atualizarEco("saldo", saldoAtual + totalVenda);
        
        liquidadosTipos++;
        liquidadosUnidadesTipos += edAtual.quantidade;
        totalRecebido += totalVenda;
        vendidos.push({
            nome: ed.nome,
            quantidade: edAtual.quantidade,
            roi: ed.roi,
            valor: totalVenda,
            motivo: "Excedente de tipos únicos"
        });
        
        excedenteTemp--;
    }
    
    const totalLiquidadoGeral = totalLiquidado + liquidadosUnidadesTipos;
    
    // console.log(`✅ [SlotManager] Liquidação concluída!`);
    // console.log(`   📊 ${vendidos.length} tipo(s) de edifício vendidos`);
    // console.log(`   📦 ${totalLiquidadoGeral} unidade(s) liquidadas`);
    // console.log(`   💰 Total recebido: R$ ${totalRecebido.toFixed(2)}`);
    
    return {
        sucesso: true,
        liquidados: vendidos.length,
        liquidadosUnidades: totalLiquidadoGeral,
        vendidos,
        totalRecebido,
        mensagem: `${vendidos.length} tipo(s) de edifício vendidos (${totalLiquidadoGeral} unidades) | Total: R$ ${totalRecebido.toFixed(2)}`
    };
};

// ═══════════════════════════════════════════════════════════════════
// 3. FUNÇÃO executarLiquidacaoAutomatica
// ═══════════════════════════════════════════════════════════════════
export const executarLiquidacaoAutomatica = async (dados, atualizarDadosProf2, economiaSetores, atualizarEco) => {
    // console.log("🚀 [SlotManager] Executando liquidação automática...");
    
    const resultado = await liquidarExcedentes(dados, atualizarDadosProf2, economiaSetores, atualizarEco);
    
    // if (resultado.sucesso && resultado.liquidados > 0) {
    //     let mensagem = `🗑️ ${resultado.liquidados} tipo(s) de edifício liquidados:\n\n`;
    //     // resultado.vendidos.forEach(v => {
    //     //     mensagem += `- ${v.nome}: ${v.quantidade} unidade(s) → R$ ${v.valor.toLocaleString()} (${v.motivo})\n`;
    //     // });
    //     // mensagem += `\n💰 Total recebido: R$ ${resultado.totalRecebido.toLocaleString()}`;
    //     // alert(mensagem);
        
    //     // console.log("📊 [SlotManager] Resumo da liquidação:", resultado);
    // } else if (resultado.sucesso) {
    //     // console.log("ℹ️ [SlotManager]", resultado.mensagem);
    //     // alert(resultado.mensagem);
    // }
    
    return resultado;
};

// ═══════════════════════════════════════════════════════════════════
// 4. COMPONENTE SlotDisplay
// ═══════════════════════════════════════════════════════════════════
export const SlotDisplay = () => {
    const { dados } = useContext(CentraldeDadosContext);
    const getDados = useSlotVerification();
    const dadosCapacidade = getDados();
    
    return (
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 border border-white/10">
            <span className="text-white/50 text-xs">📦</span>
            <span className={`text-xs font-bold ${dadosCapacidade.estaAcimaDoLimite ? 'text-red-400' : 'text-green-400'}`}>
                {dadosCapacidade.tiposUnicos}
            </span>
            <span className="text-white/30 text-xs">/</span>
            <span className="text-white/50 text-xs">{dadosCapacidade.limiteAtual}</span>
            {dadosCapacidade.estaAcimaDoLimite && (
                <span className="text-red-400/60 text-[8px] ml-1">⚠️ +{dadosCapacidade.excedente}</span>
            )}
        </div>
    );
};

// ═══════════════════════════════════════════════════════════════════
// 5. COMPONENTE SlotManager (completo - opcional)
// ═══════════════════════════════════════════════════════════════════
export const SlotManager = () => {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext);
    const { economiaSetores } = useContext(DadosEconomyGlobalContext);

    const [slotsExtrasComprados, setSlotsExtrasComprados] = useState(0);
    const [limites, setLimites] = useState({ limiteBase: 0, slotsExtrasMax: 0, limiteTotal: 0 });
    const [tiposUnicos, setTiposUnicos] = useState(0);
    const [edAtual, setEdAtual] = useState(0);
    const [estaAcimaDoLimite, setEstaAcimaDoLimite] = useState(false);
    const [excedente, setExcedente] = useState(0);

    useEffect(() => {
        const dia = dados.dia || 0;
        const novosLimites = getLimitesPorDia(dia);
        const slotsComprados = dados.slotsExtrasComprados || 0;
        setSlotsExtrasComprados(slotsComprados);
        setLimites({
            ...novosLimites,
            limiteTotal: novosLimites.limiteBase + novosLimites.slotsExtrasMax
        });
        
        // console.log("🔄 [SlotManager] Limites atualizados:", {
        //     dia,
        //     limites: novosLimites,
        //     slotsExtrasComprados: slotsComprados
        // });
    }, [dados.dia, dados.slotsExtrasComprados]);

    useEffect(() => {
        const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];
        let totalEd = 0;
        const nomesSet = new Set();
        
        setoresArr.forEach(setor => {
            const edificios = dados[setor]?.edificios || [];
            edificios.forEach(ed => {
                if (ed.quantidade > 0) {
                    nomesSet.add(ed.nome);
                    totalEd += ed.quantidade;
                }
            });
        });
        
        setTiposUnicos(nomesSet.size);
        setEdAtual(totalEd);
        
        const limiteAtual = limites.limiteBase + slotsExtrasComprados;
        const excedenteAtual = Math.max(0, tiposUnicos - limiteAtual);
        setExcedente(excedenteAtual);
        setEstaAcimaDoLimite(excedenteAtual > 0);
        
        // console.log("📊 [SlotManager] Estado atualizado:", {
        //     tiposUnicos,
        //     edAtual: totalEd,
        //     limiteAtual,
        //     excedente: excedenteAtual,
        //     estaAcimaDoLimite: excedenteAtual > 0
        // });
    }, [dados, limites.limiteBase, slotsExtrasComprados, tiposUnicos]);

    const comprarSlotExtra = useCallback(() => {
        const precoSlot = 50000 + (slotsExtrasComprados * 25000);
        const saldoAtual = economiaSetores.saldo || 0;
        
        // console.log("💰 [SlotManager] Tentando comprar slot extra:", {
        //     preco: precoSlot,
        //     saldoAtual,
        //     slotsExtrasComprados,
        //     maxSlots: limites.slotsExtrasMax
        // });
        
        if (saldoAtual < precoSlot) {
            alert(`Saldo insuficiente! Você precisa de R$ ${precoSlot.toLocaleString()}`);
            return false;
        }
        
        if (slotsExtrasComprados >= limites.slotsExtrasMax) {
            alert(`Você já atingiu o limite máximo de slots extras (${limites.slotsExtrasMax})!`);
            return false;
        }
        
        const novoSaldo = saldoAtual - precoSlot;
        atualizarDados("saldo", novoSaldo);
        
        const novosSlots = slotsExtrasComprados + 1;
        setSlotsExtrasComprados(novosSlots);
        atualizarDados("slotsExtrasComprados", novosSlots);
        
        // console.log("✅ [SlotManager] Slot extra comprado!", {
        //     novoSaldo,
        //     novosSlots,
        //     novoLimite: limites.limiteBase + novosSlots
        // });
        
        // alert(`✅ Slot extra comprado! Novo limite: ${limites.limiteBase + novosSlots}`);
        return true;
    }, [economiaSetores.saldo, slotsExtrasComprados, limites, atualizarDados]);

    const liquidarExcedentesLocal = useCallback(async () => {
        if (excedente <= 0) {
            alert("Você não tem cartas excedentes!");
            return;
        }
        
        // console.log("🗑️ [SlotManager] Iniciando liquidação local...");
        const resultado = await executarLiquidacaoAutomatica(
            dados, 
            window.atualizarDadosProf2, 
            economiaSetores, 
            window.atualizarEco
        );
        
        if (resultado.sucesso && resultado.liquidados > 0) {
            setExcedente(0);
            setEstaAcimaDoLimite(false);
            // console.log("✅ [SlotManager] Liquidação local concluída com sucesso!");
        }
    }, [dados, excedente, economiaSetores]);

    const renderSlots = () => {
        const limiteAtual = limites.limiteBase + slotsExtrasComprados;
        const totalSlots = limites.limiteTotal;
        const slotsOcupados = Math.min(tiposUnicos, limiteAtual);
        
        const slots = [];
        for (let i = 0; i < totalSlots; i++) {
            slots.push({
                index: i,
                isBase: i < limites.limiteBase,
                isExtra: i >= limites.limiteBase && i < limiteAtual,
                isBloqueado: i >= limiteAtual,
                isOcupado: i < slotsOcupados
            });
        }
        
        return (
            <div className="flex flex-col gap-2 p-4 bg-black/20 rounded-xl border border-white/10">
                <div className="flex items-center justify-between">
                    <span className="text-white/60 text-xs font-bold uppercase tracking-wider">🎴 Capacidade de Cartas</span>
                    <span className={`text-xs font-bold ${estaAcimaDoLimite ? 'text-red-400' : 'text-green-400'}`}>
                        {tiposUnicos} / {limiteAtual}
                    </span>
                </div>
                <div className="flex flex-wrap gap-1">
                    {slots.map((slot, idx) => (
                        <div key={idx} className={`w-6 h-6 rounded-sm transition-all duration-200 ${
                            slot.isBloqueado ? 'bg-white/5 border border-white/5 cursor-not-allowed' :
                            slot.isOcupado ? 'bg-green-500/40 border border-green-400/60 shadow-[0_0_8px_rgba(74,222,128,0.3)]' :
                            'bg-white/10 border border-white/10'
                        } ${slot.isExtra ? 'border-dashed' : ''}`}
                        title={`Slot ${idx + 1}${slot.isExtra ? ' (Extra)' : ''}${slot.isBloqueado ? ' (Bloqueado)' : ''}${slot.isOcupado ? ' (Ocupado)' : ' (Vazio)'}`} />
                    ))}
                </div>
                <div className="flex justify-between text-[8px] text-white/30">
                    <span>Base: {limites.limiteBase}</span>
                    <span>Extra: {slotsExtrasComprados}</span>
                    <span>Total: {limiteAtual}</span>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-3 p-2">
            <div className="flex items-center justify-between">
                <h3 className="text-white/70 text-sm font-bold">📦 Gerenciador de Slots</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${estaAcimaDoLimite ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                    {estaAcimaDoLimite ? '⚠️ Excedente' : '✅ OK'}
                </span>
            </div>
            
            {renderSlots()}
            
            {estaAcimaDoLimite && (
                <div className="flex flex-col gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-xl">
                    <div className="flex items-center gap-2">
                        <span className="text-red-400 text-sm">⚠️</span>
                        <span className="text-red-300 text-xs font-bold">Você está com {excedente} carta(s) excedente(s)!</span>
                    </div>
                    <button onClick={liquidarExcedentesLocal} className="w-full py-1.5 rounded-lg text-xs font-bold bg-red-500/40 hover:bg-red-500/60 text-white transition-all">
                        🗑️ Liquidar {excedente} carta(s) excedente(s)
                    </button>
                </div>
            )}
            
            {!estaAcimaDoLimite && (
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="flex-1">
                        <span className="text-white/60 text-xs font-bold uppercase tracking-wider">➕ Slot Extra</span>
                        <span className="text-white/40 text-[10px] block">{slotsExtrasComprados} / {limites.slotsExtrasMax} comprados</span>
                    </div>
                    <button onClick={comprarSlotExtra} disabled={slotsExtrasComprados >= limites.slotsExtrasMax}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${slotsExtrasComprados < limites.slotsExtrasMax ? 'bg-purple-500/40 hover:bg-purple-500/60 text-white' : 'bg-white/5 text-white/30 cursor-not-allowed'}`}>
                        💰 R$ {(50000 + (slotsExtrasComprados * 25000)).toLocaleString()}
                    </button>
                </div>
            )}
        </div>
    );
};