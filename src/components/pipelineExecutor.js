// pipelineExecutor.js — v2
//
// MUDANÇAS DESTA VERSÃO:
//  1. Executor PARALELO — cada step age independentemente, sem esperar o anterior
//  2. Compra calcula a quantidade TOTAL necessária para cobrir toda a demanda
//  3. Contratos de venda: busca automaticamente o melhor contrato disponível
//  4. Compra com saldo total — calcula quantos ciclos pode comprar com o saldo
//  5. Strings de economia normalizadas para pegar variações (boom, aquecida, etc.)
//  6. Logs detalhados para debug

import { FORMULAS_EDIFICIOS } from "./productionFormulasConfig";
import { SALES_EDIFICIOS } from "./salesFormulasConfig";
import { productsCatalog, marketPrices } from "./TablePrice";

const MARKET_DELAY_DIAS = 10;
const SETORES = ["agricultura", "industria", "comercio", "tecnologia", "imobiliario", "energia"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Calcula estoque efetivo = atual + em trânsito (compras no mercado pendentes)
function estoqueComTransito(stock, marketTransactions, produtoId) {
    const atual = stock[produtoId] || 0;
    const emTransito = (marketTransactions || [])
        .filter(t => t.tipo === "buy" && t.produtoId === produtoId)
        .reduce((s, t) => s + (t.quantidade || 0), 0);
    return atual + emTransito;
}

// Calcula quanto já foi comprado no mercado E está em trânsito para esse produto
function quantidadeEmTransito(marketTransactions, produtoId) {
    return (marketTransactions || [])
        .filter(t => t.tipo === "buy" && t.produtoId === produtoId)
        .reduce((s, t) => s + (t.quantidade || 0), 0);
}

function getEdificioQtd(dados, buildingName) {
    for (const s of SETORES) {
        const ed = dados[s]?.edificios?.find(e => e.nome === buildingName);
        if (ed) return ed.quantidade || 0;
    }
    return 0;
}

function getFormulaConfig(formulaId) {
    if (!formulaId) return null;
    for (const ed of FORMULAS_EDIFICIOS) {
        const f = ed.formulas?.find(f => f.id === formulaId);
        if (f) return { formula: f, edificio: ed };
    }
    return null;
}

function getSalesEdConfig(buildingName) {
    return SALES_EDIFICIOS.find(e => e.nomeEdificio === buildingName) || null;
}

function getSalesFormulaConfig(buildingName, formulaId) {
    const ed = getSalesEdConfig(buildingName);
    if (!ed) return null;
    if (formulaId) return ed.formulas?.find(f => f.id === formulaId) || null;
    return null;
}

// ─── Leitura correta da economia por setor ───────────────────────────────────
// economiaSetores vem do DadosEconomyGlobalContext:
//   economiaSetores[setor].economiaSetor.estadoAtual
// Valores possíveis: "recessão", "declinio", "estável", "progressiva", "aquecida"

function getEstadoSetor(economiaSetores, setor) {
    return economiaSetores?.[setor]?.economiaSetor?.estadoAtual || "estável";
}

// Fator multiplicador baseado no estado do setor (espelha a lógica do Economys.jsx)
function fatorPorEstado(estado) {
    const e = (estado || "estável").toLowerCase();
    if (e === "recessão" || e === "recessao")  return 0.4;
    if (e === "declinio" || e === "declínio")   return 0.8;
    if (e === "progressiva")                    return 1.1;
    if (e === "aquecida")                       return 1.25;
    return 1.0; // estável
}

function eEstadoPositivo(estado) {
    const e = (estado || "").toLowerCase();
    return e === "aquecida" || e === "progressiva";
}

function eEstadoNegativo(estado) {
    const e = (estado || "").toLowerCase();
    return e === "recessão" || e === "recessao" || e === "declinio" || e === "declínio";
}

// Mantém compatibilidade com chamadas que passam string direta
function fatorEconomia(estadoOuSetores, setor) {
    if (typeof estadoOuSetores === "string") {
        return fatorPorEstado(estadoOuSetores);
    }
    // É o objeto economiaSetores completo
    if (setor) {
        return fatorPorEstado(getEstadoSetor(estadoOuSetores, setor));
    }
    return 1.0;
}

// Quanto já está prometido em produções ativas para um produto
function getQtdPrometida(productionQueue, produtoId) {
    return productionQueue.reduce((t, p) => t + (p.output?.[produtoId] || 0), 0);
}

// Estoque efetivo (atual + prometido)
function estoqueEfetivo(stock, productionQueue, produtoId) {
    return (stock[produtoId] || 0) + getQtdPrometida(productionQueue, produtoId);
}

// Verifica insumos — retorna lista de todos que faltam
function auditarInsumos(stock, formula, quantidade) {
    const faltando = [];
    for (const [pid, qtdF] of Object.entries(formula.input || {})) {
        const necessario = qtdF * quantidade;
        const disponivel = stock[pid] || 0;
        if (disponivel < necessario) {
            faltando.push({ pid, necessario, disponivel, faltando: necessario - disponivel });
        }
    }
    return faltando;  // array vazio = tudo ok
}

// Calcula o valor de venda de um contrato
function valorContrato(salesFormula, quantidade, ecoGlobal) {
    const precoBase = marketPrices[salesFormula.produto] || 0;
    return Math.round(precoBase * (1 + (salesFormula.margemBase || 0) / 100) * fatorEconomia(ecoGlobal) * quantidade);
}

// ─── STEP: PRODUÇÃO ───────────────────────────────────────────────────────────
// Executor paralelo: age se tiver insumos, independente de outros steps.

// ─── STEP: PRODUÇÃO ───────────────────────────────────────────────────────────

function executarProducao(step, stock, productionQueue, dados, saldo, pipelineId, idx, gameState) {
    const acoes = [];
    const { formulaId, buildingName, quantidade = 1, condicaoThreshold = 0, prioridadeInsumo = "so_armazem" } = step;

    const qtdEd = getEdificioQtd(dados, buildingName);
    if (qtdEd === 0) return acoes;

    const cfg = getFormulaConfig(formulaId);
    if (!cfg) {
        if (formulaId) console.warn(`[Executor] Fórmula não encontrada: ${formulaId}`);
        return acoes;
    }

    const { formula } = cfg;

    // Threshold
    if (condicaoThreshold > 0) {
        const outputPrincipal = Object.keys(formula.output || {})[0];
        if (outputPrincipal) {
            const efetivo = estoqueEfetivo(stock, productionQueue, outputPrincipal);
            if (efetivo >= condicaoThreshold) return acoes;
        }
    }

    // Limite de jobs simultâneos — por fórmula, considerando qtd de edifícios
    const nivelEdificio = 1;
    const maxJobsPorEdificio = cfg.edificio?.maxAcoesSimultaneasPorNivel?.[nivelEdificio] || 1;
   const maxJobsSimultaneos = maxJobsPorEdificio * qtdEd;
const jobsAtivos = productionQueue.filter(p => p.formulaId === formulaId).length;

if (jobsAtivos > 0) return acoes;
  

    // Capacidade total = capacidadePorEdificio × qtdEdificios
    // Esse é o valor que vai para startProduction como "quantidade"
  const capTotal = (formula.capacidadePorEdificio || 1) * qtdEd;

    // Se o step tem quantidade configurada (> 1), respeita; senão usa cap total
const qtdAlvo = quantidade > 1 ? quantidade : 1;

    // Audita insumos para qtdAlvo
    const ausentes = auditarInsumos(stock, formula, qtdAlvo);

    if (ausentes.length === 0) {
        console.log("[executarProducao] PUSH →", {
    buildingName,
    formulaId,
    qtdAlvo,
    qtdEd,
    capTotal,
    quantidadeStep: quantidade,
});
        console.log(`[Executor] PRODUZIR ${qtdAlvo}x ${formula.nome} | ${qtdEd} edifícios`);
        acoes.push({
            tipo: "INICIAR_PRODUCAO",
            buildingName,
            formulaId,
         quantidade: qtdAlvo, 
            pipelineId,
            stepIndex: idx,
        });
        return acoes;
    }

    // Falta insumos
    if (prioridadeInsumo === "so_armazem") {
        console.log(`[Executor] Aguardando insumos para ${formula.nome}:`, ausentes.map(a => a.pid));
        return acoes;
    }

    const mktTrans = gameState?.marketTransactions || [];
for (const aus of ausentes) {
    const emTransito = quantidadeEmTransito(mktTrans, aus.pid);
    const faltaReal = Math.max(0, aus.faltando - emTransito);

    // 🔒 NOVA REGRA: só compra se NÃO houver produção ativa que usará esse insumo
    const emProducao = productionQueue.some(p =>
        p.formulaId && getFormulaConfig(p.formulaId)?.formula?.input?.[aus.pid]
    );

    if (emProducao) {
        console.log(`[Executor] Insumo ${aus.pid} será usado por produção ativa — compra adiada.`);
        continue;
    }

    if (faltaReal <= 0) continue;

    const preco = marketPrices[aus.pid] || 0;
    const qtdMaxComSaldo = preco > 0 ? Math.floor(saldo / preco) : faltaReal;
    const qtdComprar = Math.min(faltaReal, qtdMaxComSaldo);
    if (qtdComprar <= 0) {
        console.warn(`[Executor] Saldo insuficiente para ${aus.pid}`);
        continue;
    }

    acoes.push({
        tipo: "COMPRAR_MERCADO",
        produtoId: aus.pid,
        quantidade: qtdComprar,
        valorTotal: Math.round(preco * qtdComprar),
        delayDias: MARKET_DELAY_DIAS,
        pipelineId,
        stepIndex: idx,
    });
}

    return acoes;
}

// ─── STEP: VENDA FINAL (contrato) ─────────────────────────────────────────────
//
// Estratégias de venda (step.estrategiaVenda):
//   "maior_margem"  → escolhe o contrato com maior % de margem disponível (padrão)
//   "maior_valor"   → escolhe o contrato com maior valorTotal
//   "produto_fixo"  → vende sempre o produto configurado em formulaId, independente de margem
//
// Estratégias de insumo quando falta estoque (step.prioridadeInsumo — mesmo campo da produção):
//   "so_armazem"       → aguarda estoque chegar, nunca compra
//   "comprar_se_faltar"→ compra no mercado global o que falta
//   "mercado_primeiro" → sempre compra do mercado antes de tentar o estoque

function executarVenda(step, stock, dados, contratosEdificios, getOuGerarContratos, ecoParam, diaAtual, pipelineId, idx, mktTrans, sellQueue) {
    const economiaSetores = typeof ecoParam === "object" && ecoParam !== null ? ecoParam : null;
    const acoes = [];
    const {
        formulaId, buildingName,
        quantidade = 1, condicaoThreshold = 0,
        estrategiaVenda = "maior_margem",
        prioridadeInsumo = "so_armazem",
        atenderTodosContratos = false,
        filtrarProduto = null,
    } = step;

    // ── DEBUG ──────────────────────────────────────────────────────────────
    console.group(`[executarVenda] ${buildingName} | dia ${diaAtual}`);
    console.log("step completo:", JSON.stringify(step, null, 2));
    console.log("atenderTodosContratos:", atenderTodosContratos, "| filtrarProduto:", filtrarProduto, "| estrategiaVenda:", estrategiaVenda);
    console.log("sellQueue atual:", (sellQueue || []).length, "vendas ativas");
    // ───────────────────────────────────────────────────────────────────────

    const qtdEd = getEdificioQtd(dados, buildingName);
    // ── DEBUG ──
    console.log("qtdEd:", qtdEd, "| buildingName:", buildingName);
    if (qtdEd === 0) { console.warn("❌ Edifício não encontrado ou qtd=0"); console.groupEnd(); return acoes; }

    const salesEd = getSalesEdConfig(buildingName);
    // ── DEBUG ──
    console.log("salesEd encontrado:", !!salesEd, salesEd?.nomeEdificio);
    if (!salesEd) { console.warn("❌ salesEd não encontrado"); console.groupEnd(); return acoes; }

    const nivelEd = 1;
    const maxSlots = (salesEd.maxAcoesSimultaneasPorNivel?.[nivelEd] || 1) * qtdEd;
    const idsEmAndamento = new Set((sellQueue || []).map(v => v.id).filter(Boolean));
    const slotsUsados = (sellQueue || []).filter(v =>
        salesEd.formulas?.some(f => f.id === v.formulaId)
    ).length;
    const slotsDisponiveis = maxSlots - slotsUsados;

    // ── DEBUG ──
    console.log(`slots: max=${maxSlots} | usados=${slotsUsados} | disponíveis=${slotsDisponiveis}`);
    console.log("idsEmAndamento:", [...idsEmAndamento]);

    if (slotsUsados >= maxSlots) { console.warn("❌ Todos os slots ocupados"); console.groupEnd(); return acoes; }

    let contratos = [];
    try {
        contratos = getOuGerarContratos(salesEd, diaAtual, qtdEd, 1) || [];
    } catch (e) {
        console.warn(`[Executor] Erro ao gerar contratos para ${buildingName}:`, e);
        console.groupEnd();
        return acoes;
    }

    // ── DEBUG ──
    console.log(`contratos gerados: ${contratos.length}`, contratos.map(c => ({
        id: c.id, produto: c.productId, qtd: c.quantidade, margem: c.margemAplicada, valor: c.valorTotal
    })));

    if (contratos.length === 0) { console.warn("❌ Nenhum contrato gerado"); console.groupEnd(); return acoes; }

    contratos = contratos.filter(c => !idsEmAndamento.has(c.id));
    // ── DEBUG ──
    console.log(`contratos após filtro em andamento: ${contratos.length}`);

    if (contratos.length === 0) { console.warn("❌ Todos contratos já em andamento"); console.groupEnd(); return acoes; }

// Filtra por produto fixo se configurado
if (filtrarProduto) {
    contratos = contratos.filter(c => c.productId === filtrarProduto);
    console.log(`contratos após filtrarProduto (${filtrarProduto}): ${contratos.length}`);
} else if (estrategiaVenda === "produto_fixo" && formulaId) {
    const sf = getSalesFormulaConfig(buildingName, formulaId);
    // ── DEBUG crítico ──
    console.log(`produto_fixo: formulaId=${formulaId} | sf encontrado:`, sf?.produto);
    if (sf) {
        contratos = contratos.filter(c => c.productId === sf.produto);
        console.log(`contratos após produto_fixo (${sf.produto}): ${contratos.length}`, contratos);
    }
}



    if (contratos.length === 0) { console.warn("❌ Nenhum contrato após filtro de produto"); console.groupEnd(); return acoes; }

    if (estrategiaVenda === "maior_valor") {
        contratos.sort((a, b) => b.valorTotal - a.valorTotal);
    } else {
        contratos.sort((a, b) => (b.margemAplicada || 0) - (a.margemAplicada || 0));
    }

    const maxAtender = atenderTodosContratos ? slotsDisponiveis : 1;
    let atendidos = 0;
    const stockLocal = { ...stock };

    // ── DEBUG ──
    console.log(`maxAtender: ${maxAtender} | estoque snapshot:`, 
        contratos.slice(0, 3).map(c => ({ pid: c.productId, estoque: stockLocal[c.productId] || 0, precisa: c.quantidade }))
    );

    for (const contrato of contratos) {
        if (atendidos >= maxAtender) break;

        const produtoId = contrato.productId;
        const estoqueAtual = stockLocal[produtoId] || 0;
        const qtdContrato = contrato.quantidade;

        // ── DEBUG ──
        console.log(`  tentando contrato: ${produtoId} × ${qtdContrato} | estoque: ${estoqueAtual} | ok: ${estoqueAtual >= qtdContrato}`);

        if (estoqueAtual >= qtdContrato) {
            let fatorSetor = 1.0;
            if (economiaSetores) {
                const estado = getEstadoSetor(economiaSetores, salesEd.setor);
                fatorSetor = fatorPorEstado(estado);
                console.log(`  fatorSetor (${salesEd.setor}): ${fatorSetor}`);
            }

            const contratoCompleto = {
                id:             contrato.id || crypto.randomUUID(),
                formulaId:      contrato.formulaId || (() => {
                    const sf = salesEd.formulas?.find(f => f.produto === produtoId);
                    return sf?.id || "";
                })(),
                productId:      produtoId,
                quantidade:     qtdContrato,
                valorTotal:     Math.round(contrato.valorTotal * fatorSetor),
                prazoDias:      contrato.prazoDias || 30,
                margemAplicada: contrato.margemAplicada || 0,
                status:         "disponivel",
            };

            // ── DEBUG ──
            console.log(`  ✅ PUSH INICIAR_VENDA_CONTRATO:`, contratoCompleto);

            acoes.push({
                tipo: "INICIAR_VENDA_CONTRATO",
                contrato: contratoCompleto,
                buildingName,
                formulaId: contratoCompleto.formulaId,
                pipelineId,
                stepIndex: idx,
            });

            stockLocal[produtoId] = estoqueAtual - qtdContrato;
            atendidos++;
        } else {
            const emTransito = quantidadeEmTransito(mktTrans || [], produtoId);
            const efetivo = estoqueAtual + emTransito;
            console.log(`  ⏳ sem estoque: ${estoqueAtual}/${qtdContrato} | em trânsito: ${emTransito} | efetivo: ${efetivo}`);
            if (!atenderTodosContratos) break;
        }
    }

    // ── DEBUG ──
    console.log(`resultado: ${atendidos} contrato(s) atendido(s) | ${acoes.length} ação(ões) gerada(s)`);
    console.groupEnd();
    return acoes;
}
// ─── STEP: MERCADO COMPRA ─────────────────────────────────────────────────────

// Calcula quanto de um produto precisa ser comprado, descontando estoque atual
function calcularQtdNecessariaCompra(produtoId, qtdAlvo, stockAtual = {}) {
    const emEstoque = stockAtual[produtoId] || 0;
    return Math.max(0, qtdAlvo - emEstoque);
}

function executarMercadoCompra(step, stock, saldo, pipelineId, idx, marketTransactions, produtosEmVenda) {
    const acoes = [];
    const { produtoId, quantidade = 1, condicaoThreshold = 0, precoTeto = Infinity } = step;
    if (!produtoId) return acoes;

    if (produtosEmVenda && produtosEmVenda.has(produtoId)) {
        console.log(`[Executor] Ignorando compra de ${produtoId} — produto já em processo de venda`);
        return acoes;
    }

    const emTransito = quantidadeEmTransito(marketTransactions, produtoId);
    const estoqueAtualEfetivo = (stock[produtoId] || 0) + emTransito;

    // Só compra se o estoque efetivo estiver abaixo do threshold
    if (condicaoThreshold > 0 && estoqueAtualEfetivo >= condicaoThreshold) return acoes;

    // Quanto realmente falta para atingir o threshold
    // Se threshold=0, usa a quantidade configurada como alvo fixo
    const alvo = condicaoThreshold > 0 ? condicaoThreshold : quantidade;
    const faltaReal = Math.max(0, alvo - estoqueAtualEfetivo);

    // Não compra mais do que o necessário nem mais que a quantidade configurada por vez
    const qtdNecessaria = Math.min(quantidade, faltaReal);

    if (qtdNecessaria <= 0) return acoes;

    const preco = marketPrices[produtoId] || 0;
    if (preco > precoTeto) {
        console.log(`[Executor] Preço de ${produtoId} (${preco}) acima do teto (${precoTeto})`);
        return acoes;
    }

    const qtdMaxComSaldo = preco > 0 ? Math.floor(saldo / preco) : qtdNecessaria;
    const qtdComprar = Math.min(qtdNecessaria, qtdMaxComSaldo);

    if (qtdComprar <= 0) {
        console.warn(`[Executor] Saldo insuficiente para comprar ${produtoId}`);
        return acoes;
    }

    const valorTotal = Math.round(preco * qtdComprar);
    console.log(`[Executor] COMPRAR MERCADO ${qtdComprar}x ${produtoId} = R$${valorTotal} | estoque atual: ${stock[produtoId] || 0} | em trânsito: ${emTransito} | alvo: ${alvo}`);
    acoes.push({ tipo: "COMPRAR_MERCADO", produtoId, quantidade: qtdComprar, valorTotal, delayDias: MARKET_DELAY_DIAS, pipelineId, stepIndex: idx });
    return acoes;
}
// ─── STEP: MERCADO VENDA ──────────────────────────────────────────────────────

function executarMercadoVenda(step, stock, ecoParam, pipelineId, idx) {
    const acoes = [];
    const { produtoId, quantidade = 1, condicaoThreshold = 0 } = step;
    if (!produtoId) return acoes;

    const estoqueAtual = stock[produtoId] || 0;
    const excedente = estoqueAtual - condicaoThreshold;
    if (excedente <= 0) return acoes;

    const qtdVender = Math.min(excedente, quantidade);
    const preco = marketPrices[produtoId] || 0;

    // Determina o setor do produto para aplicar fator correto
    const prodCat = productsCatalog[produtoId];
    let fator = 1.0;
    if (typeof ecoParam === "object" && ecoParam !== null && prodCat?.setor) {
        const estado = getEstadoSetor(ecoParam, prodCat.setor);
        fator = fatorPorEstado(estado);
    } else if (typeof ecoParam === "string") {
        fator = fatorEconomia(ecoParam);
    }
    const valorTotal = Math.round(preco * fator * qtdVender);

    console.log(`[Executor] VENDER MERCADO ${qtdVender}x ${produtoId} = R$${valorTotal}`);
    acoes.push({ tipo: "VENDER_MERCADO", produtoId, quantidade: qtdVender, valorTotal, delayDias: MARKET_DELAY_DIAS, pipelineId, stepIndex: idx });
    return acoes;
}

// ─── EXECUTOR PRINCIPAL (paralelo) ───────────────────────────────────────────

/**
 * executarPipeline — PARALELO
 *
 * Cada step age independentemente com base no estado atual do jogo.
 * Não há ordem de precedência — a "Fábrica de Roupas" tenta produzir
 * se tiver Fio de Lã, mesmo que a "Criação de Ovinos" não tenha rodado ainda.
 */
export function executarPipeline(pipeline, gameState) {
    if (!pipeline.ativo || !pipeline.steps?.length) return [];

    const { stock, productionQueue, dados, economiaGlobal, economiaSetores, saldo,
            contratosEdificios, getOuGerarContratos, diaAtual, marketTransactions, sellQueue } = gameState;

    // ── DEBUG ──────────────────────────────────────────────────────────────
    console.group(`[executarPipeline] "${pipeline.nome}" | ${pipeline.steps.length} steps | dia ${diaAtual}`);
    console.log("gameState snapshot:", {
        saldo,
        diaAtual,
        stockKeys: Object.keys(stock || {}).filter(k => (stock[k] || 0) > 0),
        productionQueueLen: (productionQueue || []).length,
        sellQueueLen: (sellQueue || []).length,
        mktTransLen: (marketTransactions || []).length,
        temGetOuGerarContratos: typeof getOuGerarContratos === "function",
    });
    console.log("steps do pipeline:", pipeline.steps.map((s, i) => ({
        i,
        tipo: s.tipo,
        buildingName: s.buildingName,
        formulaId: s.formulaId,
        atenderTodosContratos: s.atenderTodosContratos,
        filtrarProduto: s.filtrarProduto,
        estrategiaVenda: s.estrategiaVenda,
        quantidade: s.quantidade,
        condicaoThreshold: s.condicaoThreshold,
    })));
    // ───────────────────────────────────────────────────────────────────────

    const ecoObj = economiaSetores || null;
    const mktTrans = marketTransactions || [];
    const produtosEmVenda = new Set((sellQueue || []).map(v => v.produtoId || v.produto).filter(Boolean));
    const acoes = [];
    const stockSimulado = { ...stock };

    for (let i = 0; i < pipeline.steps.length; i++) {
        const step = pipeline.steps[i];
        let stepAcoes = [];

        // ── DEBUG ──
        console.log(`[step ${i}] tipo=${step.tipo} | building=${step.buildingName} | formulaId=${step.formulaId}`);

        switch (step.tipo) {
            case "producao":
                stepAcoes = executarProducao(step, stockSimulado, productionQueue, dados, saldo, pipeline.id, i, { marketTransactions: mktTrans });
                break;
            case "venda":
                stepAcoes = executarVenda(step, stockSimulado, dados, contratosEdificios, getOuGerarContratos, ecoObj || economiaGlobal, diaAtual, pipeline.id, i, mktTrans, sellQueue);
                break;
            case "mercado_compra":
                stepAcoes = executarMercadoCompra(step, stockSimulado, saldo, pipeline.id, i, mktTrans, produtosEmVenda);
                break;
            case "mercado_venda":
                stepAcoes = executarMercadoVenda(step, stockSimulado, ecoObj || economiaGlobal, pipeline.id, i);
                break;
        }

        // ── DEBUG ──
        if (stepAcoes.length > 0) {
            console.log(`  → ${stepAcoes.length} ação(ões):`, stepAcoes.map(a => a.tipo));
        } else {
            console.log(`  → nenhuma ação gerada`);
        }

        stepAcoes.forEach(acao => {
            if (acao.tipo === "COMPRAR_MERCADO") {
                mktTrans.push({ tipo: "buy", produtoId: acao.produtoId, quantidade: acao.quantidade });
            }
            if (acao.tipo === "VENDER_MERCADO") {
                stockSimulado[acao.produtoId] = Math.max(0, (stockSimulado[acao.produtoId] || 0) - acao.quantidade);
            }
            if (acao.tipo === "INICIAR_VENDA_CONTRATO") {
                // Simula redução de estoque para evitar double-sell no mesmo dia
                const pid = acao.contrato?.productId;
                if (pid) {
                    stockSimulado[pid] = Math.max(0, (stockSimulado[pid] || 0) - (acao.contrato?.quantidade || 0));
                    console.log(`  [sim] estoque de ${pid} reduzido para ${stockSimulado[pid]} após INICIAR_VENDA_CONTRATO`);
                }
            }
        });

        acoes.push(...stepAcoes);
    }

    // ── DEBUG ──
    console.log(`[executarPipeline] total de ações: ${acoes.length}`, acoes.map(a => a.tipo));
    console.groupEnd();
    return acoes;
}

export function executarTodosPipelines(pipelines, gameState) {
    return pipelines.flatMap(p => executarPipeline(p, gameState));
}

// ─── ANÁLISE DE ARBITRAGEM ───────────────────────────────────────────────────
/**
 * Versão corrigida da análise de arbitragem.
 * 
 * A lógica correta é:
 *   1. Setor A está em recessão → insumos/produtos desse setor estão baratos
 *   2. Setor B está aquecido → vender para esse setor paga mais
 *   3. Oportunidade = comprar insumos do setor A barato, processar, vender no setor B caro
 * 
 * DIFERENTE do código anterior que só olhava se o EDIFÍCIO PRODUTOR estava
 * no setor em recessão — isso raramente é verdade.
 */
export function analisarArbitragem(economiaSetores) {
    const SETORES = ["agricultura", "industria", "comercio", "tecnologia", "imobiliario", "energia"];
    const oportunidades = [];

    // Classifica setores por estado econômico
    const setoresBaixos = new Set(SETORES.filter(s => {
        const e = (economiaSetores?.[s]?.economiaSetor?.estadoAtual || "estável").toLowerCase();
        return e === "recessão" || e === "recessao" || e === "declinio" || e === "declínio";
    }));

    const setoresAltos = new Set(SETORES.filter(s => {
        const e = (economiaSetores?.[s]?.economiaSetor?.estadoAtual || "estável").toLowerCase();
        return e === "aquecida" || e === "progressiva";
    }));

    // Precisamos de pelo menos 1 setor em dificuldade (insumos baratos)
    if (setoresBaixos.size === 0) return oportunidades;

    // CORREÇÃO PRINCIPAL: não filtramos SALES_EDIFICIOS pelo setor alto.
    // Os edifícios de venda (Açougue, Petshop, Livraria) podem estar em qualquer setor.
    // A oportunidade está nos INSUMOS baratos — setor do edifício de venda é irrelevante.
    // Iteramos TODOS os SALES_EDIFICIOS e verificamos se seus produtos
    // vêm de edifícios cujos INSUMOS são de setores em dificuldade.

    SALES_EDIFICIOS.forEach(ev => {
        (ev.formulas || []).forEach(fv => {
            const produtoFinal = fv.produto;
            const prod = productsCatalog[produtoFinal];
            if (!prod) return;

            // Encontra edifícios de PRODUÇÃO que geram esse produto
            FORMULAS_EDIFICIOS.forEach(ef => {
                const fMatch = ef.formulas?.find(f =>
                    Object.keys(f.output || {}).includes(produtoFinal)
                );
                if (!fMatch) return;

                // Verifica insumos de setores baratos
                const insumosBaratos = Object.keys(fMatch.input || {}).filter(pid => {
                    const prodInsumo = productsCatalog[pid];
                    if (!prodInsumo?.setor) return false;
                    return setoresBaixos.has(prodInsumo.setor);
                });

                // Considera também se o próprio edifício produtor está em setor baixo
                const edificioNoSetorBaixo = setoresBaixos.has(ef.setor);

                // Só é oportunidade se há algum custo menor (insumo barato ou produção barata)
                if (insumosBaratos.length === 0 && !edificioNoSetorBaixo) return;

                // Identifica qual setor alto vai se beneficiar da venda
                // (o setor do produto final, se ele for de setor alto, ou setor do edifício de venda)
                const setorVendaProd = prod.setor || ev.setor || "comercio";
                const setorVendaEco  = ev.setor || setorVendaProd;
                const ecoVenda = economiaSetores?.[setorVendaEco]?.economiaSetor?.estadoAtual || "estável";
                const ecoVendaLabel = ecoVenda;

                // Preço e margem
                const precoVenda    = marketPrices[produtoFinal] || 0;
                const custoInsumos  = Object.entries(fMatch.input || {}).reduce((s, [pid, q]) =>
                    s + (marketPrices[pid] || 0) * q, 0
                );
                const qtdOutput     = Object.values(fMatch.output || {})[0] || 1;
                const margemUnit    = precoVenda - (custoInsumos / qtdOutput);

                // Só lista se tem margem positiva
                if (margemUnit <= 0) return;

                const id = `${ef.nomeEdificio}_${ev.nomeEdificio}_${produtoFinal}`;
                if (oportunidades.find(o => o.id === id)) return;

                const setorCompraLabel = insumosBaratos.length > 0
                    ? productsCatalog[insumosBaratos[0]]?.setor || ef.setor
                    : ef.setor;

                oportunidades.push({
                    id,
                    setorCompra: setorCompraLabel,
                    ecoCompra: economiaSetores?.[setorCompraLabel]?.economiaSetor?.estadoAtual
                              || economiaSetores?.[ef.setor]?.economiaSetor?.estadoAtual
                              || "recessão",
                    setorVenda: setorVendaEco,
                    ecoVenda: ecoVendaLabel,
                    prodId: produtoFinal,
                    prodNome: prod.nome,
                    prodIcon: prod.icon,
                    edificioCompra: ef.nomeEdificio,
                    edificioVenda:  ev.nomeEdificio,
                    insumosBaratos,
                    margem: Math.round(margemUnit),
                    estimativaGanho: Math.round(margemUnit * qtdOutput),
                });
            });
        });
    });

    // Ordena por maior margem e limita a 12 resultados mais relevantes
    return oportunidades.sort((a, b) => b.margem - a.margem).slice(0, 12);
}

// ─── ANÁLISE DE PRODUTOS SEM VAZÃO ───────────────────────────────────────────
/**
 * Identifica produtos no estoque que não têm nenhum step de venda/consumo
 * configurado em nenhum pipeline ativo.
 */
export function identificarProdutosSemVazao(pipelines, stock, productionQueue) {
    // Produtos que têm destino configurado em algum pipeline
    const produtosComDestino = new Set();
    pipelines.forEach(p => {
        (p.steps || []).forEach(step => {
            if (step.tipo === "mercado_venda" && step.produtoId) produtosComDestino.add(step.produtoId);
            if (step.tipo === "venda" && step.formulaId) {
                const sf = SALES_EDIFICIOS.flatMap(e => e.formulas || []).find(f => f.id === step.formulaId);
                if (sf) produtosComDestino.add(sf.produto);
            }
            // Produção que consome o produto também conta como destino
            if (step.tipo === "producao" && step.formulaId) {
                const cfg = getFormulaConfig(step.formulaId);
                if (cfg) Object.keys(cfg.formula.input || {}).forEach(pid => produtosComDestino.add(pid));
            }
        });
    });

    // Produtos em produção ativa (prometidos para saída)
    const produtosEmProducao = new Set();
    productionQueue.forEach(p => Object.keys(p.output || {}).forEach(pid => produtosEmProducao.add(pid)));

    const semVazao = [];
    Object.entries(stock).forEach(([pid, qtd]) => {
        if (qtd <= 10) return; // ignora quantidades mínimas
        if (produtosComDestino.has(pid)) return;
        const prod = productsCatalog[pid];
        if (!prod) return;

        // Onde pode ser vendido?
        const destinosPossiveis = SALES_EDIFICIOS
            .filter(e => e.formulas?.some(f => f.produto === pid))
            .map(e => e.nomeEdificio);

        // Onde pode ser consumido?
        const consumidoresPossiveis = FORMULAS_EDIFICIOS
            .filter(e => e.formulas?.some(f => Object.keys(f.input || {}).includes(pid)))
            .map(e => e.nomeEdificio);

        semVazao.push({
            pid, qtd, nome: prod.nome, icon: prod.icon,
            valorMercado: Math.round((marketPrices[pid] || 0) * qtd),
            destinosPossiveis, consumidoresPossiveis,
        });
    });

    return semVazao.sort((a, b) => b.valorMercado - a.valorMercado);
}

// ─── ROI ──────────────────────────────────────────────────────────────────────

export function calcularROIPipeline(pipeline, economiaGlobal = "estável") {
    let custoTotal = 0, receitaTotal = 0, diasCiclo = 0;

    for (const step of (pipeline.steps || [])) {
        if (step.tipo === "producao") {
            const cfg = getFormulaConfig(step.formulaId);
            if (!cfg) continue;
            const { formula } = cfg;
            const qtd = step.quantidade || 1;
            Object.entries(formula.input || {}).forEach(([pid, q]) => { custoTotal += (marketPrices[pid] || 0) * q * qtd; });
            diasCiclo = Math.max(diasCiclo, formula.duracao || 0);
        }
        if (step.tipo === "mercado_compra") {
            custoTotal += (marketPrices[step.produtoId] || 0) * (step.quantidade || 1);
            diasCiclo = Math.max(diasCiclo, MARKET_DELAY_DIAS);
        }
        if (step.tipo === "venda") {
            const sf = getSalesFormulaConfig(step.buildingName, step.formulaId);
            if (sf) receitaTotal += valorContrato(sf, step.quantidade || 1, economiaGlobal);
        }
        if (step.tipo === "mercado_venda") {
            const preco = marketPrices[step.produtoId] || 0;
            receitaTotal += Math.round(preco * fatorEconomia(economiaGlobal) * (step.quantidade || 1));
            diasCiclo = Math.max(diasCiclo, MARKET_DELAY_DIAS);
        }
    }

    return {
        custoTotal: Math.round(custoTotal),
        receitaTotal: Math.round(receitaTotal),
        lucroPorCiclo: Math.round(receitaTotal - custoTotal),
        diasCiclo,
        roiPorcentagem: custoTotal > 0 ? Math.round(((receitaTotal - custoTotal) / custoTotal) * 100) : 0,
    };
}