// pipelineExecutor.js — v4 (valida saldo + armazenamento)
import { EDIFICIOS_FINAIS_ESTATICOS } from "../stores/dadosEstáticos";
import { FORMULAS_EDIFICIOS } from "./productionFormulasConfig";
import { SALES_EDIFICIOS } from "./salesFormulasConfig";
import { productsCatalog, marketPrices } from "./TablePrice";
import { calcularStorageGlobal } from "./GameContext";

const MARKET_DELAY_DIAS = 10;
const SETORES = ["agricultura", "industria", "comercio", "tecnologia", "imobiliario", "energia"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function estoqueComTransito(stock, marketTransactions, produtoId) {
    const atual = stock[produtoId] || 0;
    const emTransito = (marketTransactions || [])
        .filter(t => t.tipo === "buy" && t.produtoId === produtoId)
        .reduce((s, t) => s + (t.quantidade || 0), 0);
    return atual + emTransito;
}

function quantidadeEmTransito(marketTransactions, produtoId) {
    return (marketTransactions || [])
        .filter(t => t.tipo === "buy" && t.produtoId === produtoId)
        .reduce((s, t) => s + (t.quantidade || 0), 0);
}

function getEdificioQtd(dados, buildingName) {
    if (!dados || typeof dados !== "object") return 0;
    if (!buildingName) return 0;

    for (const s of SETORES) {
        const dinamicos = dados[s]?.edificios || [];
        const estaticos = EDIFICIOS_FINAIS_ESTATICOS[s]?.edificios || [];
        const index = estaticos.findIndex(e => e.nome === buildingName);
        if (index === -1) continue;
        return dinamicos[index]?.quantidade ?? 0;
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

function getEstadoSetor(economiaSetores, setor) {
    return economiaSetores?.[setor]?.economiaSetor?.estadoAtual || "estável";
}

function fatorPorEstado(estado) {
    const e = (estado || "estável").toLowerCase();
    if (e === "recessão" || e === "recessao") return 0.4;
    if (e === "declinio" || e === "declínio") return 0.8;
    if (e === "progressiva") return 1.1;
    if (e === "aquecida") return 1.25;
    return 1.0;
}

function eEstadoPositivo(estado) {
    const e = (estado || "").toLowerCase();
    return e === "aquecida" || e === "progressiva";
}

function eEstadoNegativo(estado) {
    const e = (estado || "").toLowerCase();
    return e === "recessão" || e === "recessao" || e === "declinio" || e === "declínio";
}

function fatorEconomia(estadoOuSetores, setor) {
    if (typeof estadoOuSetores === "string") return fatorPorEstado(estadoOuSetores);
    if (setor) return fatorPorEstado(getEstadoSetor(estadoOuSetores, setor));
    return 1.0;
}

function getQtdPrometida(productionQueue, produtoId) {
    return productionQueue.reduce((t, p) => t + (p.output?.[produtoId] || 0), 0);
}

function estoqueEfetivo(stock, productionQueue, produtoId) {
    return (stock[produtoId] || 0) + getQtdPrometida(productionQueue, produtoId);
}

function auditarInsumos(stock, formula, quantidade) {
    const faltando = [];
    for (const [pid, qtdF] of Object.entries(formula.input || {})) {
        const necessario = qtdF * quantidade;
        const disponivel = stock[pid] || 0;
        if (disponivel < necessario) {
            faltando.push({ pid, necessario, disponivel, faltando: necessario - disponivel });
        }
    }
    return faltando;
}

function valorContrato(salesFormula, quantidade, ecoGlobal) {
    const precoBase = marketPrices[salesFormula.produto] || 0;
    return Math.round(precoBase * (1 + (salesFormula.margemBase || 0) / 100) * fatorEconomia(ecoGlobal) * quantidade);
}

// ─── Helpers de armazenamento ────────────────────────────────────────────────

function getCapacidadeArmazenamentoPorCategoria(dados) {
    if (!dados || typeof dados !== "object") return {};
    const resultado = {};

    for (const setor of SETORES) {
        const estaticos = EDIFICIOS_FINAIS_ESTATICOS[setor]?.edificios || [];
        const dinamicos = dados[setor]?.edificios || [];
        dinamicos.forEach((edDin, index) => {
            if ((edDin.quantidade ?? 0) < 1) return;
            const edEst = estaticos[index];
            if (!edEst) return;
            if (!resultado[setor]) resultado[setor] = { edificios: [] };
            resultado[setor].edificios.push({ ...edEst, quantidade: edDin.quantidade });
        });
    }
    return calcularStorageGlobal(resultado);
}

function getSlotsOcupadosPorCategoria(stock, marketTransactions) {
    const ocupados = {};

    const acumular = (produtoId, quantidade) => {
        const prod = productsCatalog[produtoId];
        if (!prod?.categoriaFisica) return;
        const cat = prod.categoriaFisica;
        const slots = quantidade * (prod.slotSize || 1);
        ocupados[cat] = (ocupados[cat] || 0) + slots;
    };

    Object.entries(stock || {}).forEach(([pid, qtd]) => {
        if (qtd > 0) acumular(pid, qtd);
    });

    (marketTransactions || []).forEach(t => {
        if (t.tipo === "buy" && t.quantidade > 0) acumular(t.produtoId, t.quantidade);
    });

    return ocupados;
}

/**
 * Quantos slots ainda cabem de um produto.
 * Retorna Infinity se o produto não tiver categoria física.
 */
function getSlotsLivresParaProduto(produtoId, stock, marketTransactions, dados, simulacaoComprometida = {}) {
    const prod = productsCatalog[produtoId];
    if (!prod?.categoriaFisica) return Infinity;

    const cat = prod.categoriaFisica;
    const slotSize = prod.slotSize || 1;

    const capPorCat = getCapacidadeArmazenamentoPorCategoria(dados);
    const ocupadosPorCat = getSlotsOcupadosPorCategoria(stock, marketTransactions);

    const capTotal = capPorCat[cat]?.total || 0;
    const jaOcupado = ocupadosPorCat[cat] || 0;
    const extraComprometido = simulacaoComprometida[cat] || 0;

    const livres = Math.max(0, capTotal - jaOcupado - extraComprometido);
    return Math.floor(livres / slotSize);
}

// ─── STEP: PRODUÇÃO ───────────────────────────────────────────────────────────

function executarProducao(step, stock, productionQueue, dados, saldo, pipelineId, idx, gameState) {
    const acoes = [];

    if (!dados || typeof dados !== "object") {
        console.warn("[executarProducao] `dados` (edificiosFinais) ausente — abortando step", step);
        return acoes;
    }

    const { formulaId, buildingName, quantidade = 1, condicaoThreshold = 0, prioridadeInsumo = "so_armazem" } = step;

    const qtdEd = getEdificioQtd(dados, buildingName);
    if (qtdEd === 0) return acoes;

    const cfg = getFormulaConfig(formulaId);
    if (!cfg) {
        if (formulaId) console.warn(`[Executor] Fórmula não encontrada: ${formulaId}`);
        return acoes;
    }

    const { formula } = cfg;

    if (condicaoThreshold > 0) {
        const outputPrincipal = Object.keys(formula.output || {})[0];
        if (outputPrincipal) {
            const efetivo = estoqueEfetivo(stock, productionQueue, outputPrincipal);
            if (efetivo >= condicaoThreshold) return acoes;
        }
    }

    const nivelEdificio = 1;
    const maxJobsPorEdificio = cfg.edificio?.maxAcoesSimultaneasPorNivel?.[nivelEdificio] || 1;
    const maxJobsSimultaneos = maxJobsPorEdificio * qtdEd;
    const jobsAtivos = productionQueue.filter(p => p.formulaId === formulaId).length;

    if (jobsAtivos > 0) return acoes;

    const capTotal = (formula.capacidadePorEdificio || 1) * qtdEd;
    const qtdAlvo = quantidade > 1 ? quantidade : 1;

    const ausentes = auditarInsumos(stock, formula, qtdAlvo);

    if (ausentes.length === 0) {
        console.log("[executarProducao] PUSH →", {
            buildingName, formulaId, qtdAlvo, qtdEd, capTotal, quantidadeStep: quantidade,
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

    if (prioridadeInsumo === "so_armazem") {
        console.log(`[Executor] Aguardando insumos para ${formula.nome}:`, ausentes.map(a => a.pid));
        return acoes;
    }

    const mktTrans = gameState?.marketTransactions || [];
    const dadosLocal = gameState?.dados ?? gameState?.edificiosFinais ?? dados;

    let saldoRestante = saldo;
    const comprasComprometidasPorCat = {};

    for (const aus of ausentes) {
        const emTransito = quantidadeEmTransito(mktTrans, aus.pid);
        const faltaReal = Math.max(0, aus.faltando - emTransito);
        if (faltaReal <= 0) continue;

        const emProducao = productionQueue.some(p =>
            p.formulaId && getFormulaConfig(p.formulaId)?.formula?.input?.[aus.pid]
        );
        if (emProducao) {
            console.log(`[Executor] Insumo ${aus.pid} será usado por produção ativa — compra adiada.`);
            continue;
        }

        const preco = marketPrices[aus.pid] || 0;
        const qtdMaxComSaldo = preco > 0 ? Math.floor(saldoRestante / preco) : faltaReal;
        let qtdComprar = Math.min(faltaReal, qtdMaxComSaldo);

        const prodCat = productsCatalog[aus.pid];
        if (prodCat?.categoriaFisica) {
            const cat = prodCat.categoriaFisica;
            const slotSize = prodCat.slotSize || 1;
            const capPorCat = getCapacidadeArmazenamentoPorCategoria(dadosLocal);
            const ocupadosPorCat = getSlotsOcupadosPorCategoria(stock, mktTrans);
            const capTotalCat = capPorCat[cat]?.total || 0;
            const jaOcupado = (ocupadosPorCat[cat] || 0) + (comprasComprometidasPorCat[cat] || 0);
            const livres = Math.max(0, capTotalCat - jaOcupado);
            const qtdMaxPorEspaco = Math.floor(livres / slotSize);
            if (qtdMaxPorEspaco < qtdComprar) {
                console.warn(`[Executor] Armazém cheio p/ ${cat}: comprando ${qtdMaxPorEspaco} em vez de ${qtdComprar}`);
            }
            qtdComprar = Math.min(qtdComprar, qtdMaxPorEspaco);
            comprasComprometidasPorCat[cat] = (comprasComprometidasPorCat[cat] || 0) + qtdComprar * slotSize;
        }

        if (qtdComprar <= 0) {
            console.warn(`[Executor] Compra bloqueada (saldo ou espaço) para ${aus.pid}`);
            continue;
        }

        const valor = Math.round(preco * qtdComprar);
        saldoRestante -= valor;
        mktTrans.push({ tipo: "buy", produtoId: aus.pid, quantidade: qtdComprar });

        acoes.push({
            tipo: "COMPRAR_MERCADO",
            produtoId: aus.pid,
            quantidade: qtdComprar,
            valorTotal: valor,
            delayDias: MARKET_DELAY_DIAS,
            pipelineId,
            stepIndex: idx,
        });
    }

    return acoes;
}

// ─── STEP: VENDA FINAL (contrato) ─────────────────────────────────────────────

function executarVenda(step, stock, dados, contratosEdificios, getOuGerarContratos, ecoParam, diaAtual, pipelineId, idx, mktTrans, sellQueue) {
    const acoes = [];

    if (!dados || typeof dados !== "object") {
        console.warn("[executarVenda] `dados` (edificiosFinais) ausente — abortando step", step);
        return acoes;
    }

    const economiaSetores = typeof ecoParam === "object" && ecoParam !== null ? ecoParam : null;
    const {
        formulaId, buildingName,
        quantidade = 1, condicaoThreshold = 0,
        estrategiaVenda = "maior_margem",
        prioridadeInsumo = "so_armazem",
        atenderTodosContratos = false,
        filtrarProduto = null,
    } = step;

    console.group(`[executarVenda] ${buildingName} | dia ${diaAtual}`);
    console.log("step completo:", JSON.stringify(step, null, 2));
    console.log("atenderTodosContratos:", atenderTodosContratos, "| filtrarProduto:", filtrarProduto, "| estrategiaVenda:", estrategiaVenda);
    console.log("sellQueue atual:", (sellQueue || []).length, "vendas ativas");

    const qtdEd = getEdificioQtd(dados, buildingName);
    console.log("qtdEd:", qtdEd, "| buildingName:", buildingName);
    if (qtdEd === 0) { console.warn("❌ Edifício não encontrado ou qtd=0"); console.groupEnd(); return acoes; }

    const salesEd = getSalesEdConfig(buildingName);
    console.log("salesEd encontrado:", !!salesEd, salesEd?.nomeEdificio);
    if (!salesEd) { console.warn("❌ salesEd não encontrado"); console.groupEnd(); return acoes; }

    const nivelEd = 1;
    const maxSlots = (salesEd.maxAcoesSimultaneasPorNivel?.[nivelEd] || 1) * qtdEd;
    const idsEmAndamento = new Set((sellQueue || []).map(v => v.id).filter(Boolean));
    const slotsUsados = (sellQueue || []).filter(v =>
        salesEd.formulas?.some(f => f.id === v.formulaId)
    ).length;
    const slotsDisponiveis = maxSlots - slotsUsados;

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

    console.log(`contratos gerados: ${contratos.length}`, contratos.map(c => ({
        id: c.id, produto: c.productId, qtd: c.quantidade, margem: c.margemAplicada, valor: c.valorTotal
    })));

    if (contratos.length === 0) { console.warn("❌ Nenhum contrato gerado"); console.groupEnd(); return acoes; }

    contratos = contratos.filter(c => !idsEmAndamento.has(c.id));
    console.log(`contratos após filtro em andamento: ${contratos.length}`);

    if (contratos.length === 0) { console.warn("❌ Todos contratos já em andamento"); console.groupEnd(); return acoes; }

    if (filtrarProduto) {
        contratos = contratos.filter(c => c.productId === filtrarProduto);
        console.log(`contratos após filtrarProduto (${filtrarProduto}): ${contratos.length}`);
    } else if (estrategiaVenda === "produto_fixo" && formulaId) {
        const sf = getSalesFormulaConfig(buildingName, formulaId);
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

    console.log(`maxAtender: ${maxAtender} | estoque snapshot:`,
        contratos.slice(0, 3).map(c => ({ pid: c.productId, estoque: stockLocal[c.productId] || 0, precisa: c.quantidade }))
    );

    for (const contrato of contratos) {
        if (atendidos >= maxAtender) break;

        const produtoId = contrato.productId;
        const estoqueAtual = stockLocal[produtoId] || 0;
        const qtdContrato = contrato.quantidade;

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

    console.log(`resultado: ${atendidos} contrato(s) atendido(s) | ${acoes.length} ação(ões) gerada(s)`);
    console.groupEnd();
    return acoes;
}

// ─── STEP: MERCADO COMPRA ─────────────────────────────────────────────────────

function calcularQtdNecessariaCompra(produtoId, qtdAlvo, stockAtual = {}) {
    const emEstoque = stockAtual[produtoId] || 0;
    return Math.max(0, qtdAlvo - emEstoque);
}

function executarMercadoCompra(step, stock, saldo, pipelineId, idx, marketTransactions, produtosEmVenda, dados, comprasComprometidasPorCat) {
    const acoes = [];
    const { produtoId, quantidade = 1, condicaoThreshold = 0, precoTeto = Infinity } = step;
    if (!produtoId) return acoes;

    if (produtosEmVenda && produtosEmVenda.has(produtoId)) {
        console.log(`[Executor] Ignorando compra de ${produtoId} — produto já em processo de venda`);
        return acoes;
    }

    const emTransito = quantidadeEmTransito(marketTransactions, produtoId);
    const estoqueAtualEfetivo = (stock[produtoId] || 0) + emTransito;

    if (condicaoThreshold > 0 && estoqueAtualEfetivo >= condicaoThreshold) return acoes;

    const alvo = condicaoThreshold > 0 ? condicaoThreshold : quantidade;
    const faltaReal = Math.max(0, alvo - estoqueAtualEfetivo);

    let qtdNecessaria = Math.min(quantidade, faltaReal);
    if (qtdNecessaria <= 0) return acoes;

    const preco = marketPrices[produtoId] || 0;
    if (preco > precoTeto) {
        console.log(`[Executor] Preço de ${produtoId} (${preco}) acima do teto (${precoTeto})`);
        return acoes;
    }

    // ── Regra 1: saldo ──
    const qtdMaxComSaldo = preco > 0 ? Math.floor(saldo / preco) : qtdNecessaria;
    qtdNecessaria = Math.min(qtdNecessaria, qtdMaxComSaldo);

    // ── Regra 2: armazenamento ──
    const prodCat = productsCatalog[produtoId];
    if (prodCat?.categoriaFisica) {
        const cat = prodCat.categoriaFisica;
        const slotSize = prodCat.slotSize || 1;
        const capPorCat = getCapacidadeArmazenamentoPorCategoria(dados);
        const ocupadosPorCat = getSlotsOcupadosPorCategoria(stock, marketTransactions);
        const capTotal = capPorCat[cat]?.total || 0;
        const jaOcupado = (ocupadosPorCat[cat] || 0) + (comprasComprometidasPorCat[cat] || 0);
        const livres = Math.max(0, capTotal - jaOcupado);
        const qtdMaxPorEspaco = Math.floor(livres / slotSize);
        if (qtdMaxPorEspaco < qtdNecessaria) {
            console.warn(`[Executor] Armazém cheio p/ ${cat}: comprando ${qtdMaxPorEspaco} em vez de ${qtdNecessaria}`);
        }
        qtdNecessaria = Math.min(qtdNecessaria, qtdMaxPorEspaco);
        comprasComprometidasPorCat[cat] = (comprasComprometidasPorCat[cat] || 0) + qtdNecessaria * slotSize;
    }

    if (qtdNecessaria <= 0) {
        console.warn(`[Executor] Compra bloqueada (saldo ou espaço) para ${produtoId}`);
        return acoes;
    }

    const valorTotal = Math.round(preco * qtdNecessaria);
    console.log(`[Executor] COMPRAR MERCADO ${qtdNecessaria}x ${produtoId} = R$${valorTotal} | estoque atual: ${stock[produtoId] || 0} | em trânsito: ${emTransito} | alvo: ${alvo}`);
    acoes.push({
        tipo: "COMPRAR_MERCADO",
        produtoId,
        quantidade: qtdNecessaria,
        valorTotal,
        delayDias: MARKET_DELAY_DIAS,
        pipelineId,
        stepIndex: idx,
    });
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

// ─── EXECUTOR PRINCIPAL ───────────────────────────────────────────────────────

export function executarPipeline(pipeline, gameState) {
    if (!pipeline.ativo || !pipeline.steps?.length) return [];

    const {
        stock = {},
        productionQueue = [],
        economiaGlobal = "estável",
        economiaSetores = null,
        saldo: saldoInicial = 0,
        contratosEdificios = {},
        getOuGerarContratos = null,
        diaAtual = 0,
        marketTransactions = [],
        sellQueue = [],
    } = gameState || {};

    const dados = gameState?.dados ?? gameState?.edificiosFinais ?? {};

    if (!dados || Object.keys(dados).length === 0) {
        console.warn(`[executarPipeline] "${pipeline.nome}" sem edificiosFinais — pulando`);
        return [];
    }

    console.group(`[executarPipeline] "${pipeline.nome}" | ${pipeline.steps.length} steps | dia ${diaAtual}`);
    console.log("gameState snapshot:", {
        saldo: saldoInicial,
        diaAtual,
        stockKeys: Object.keys(stock || {}).filter(k => (stock[k] || 0) > 0),
        productionQueueLen: (productionQueue || []).length,
        sellQueueLen: (sellQueue || []).length,
        mktTransLen: (marketTransactions || []).length,
        temGetOuGerarContratos: typeof getOuGerarContratos === "function",
    });
    console.log("steps do pipeline:", pipeline.steps.map((s, i) => ({
        i, tipo: s.tipo, buildingName: s.buildingName, formulaId: s.formulaId,
        atenderTodosContratos: s.atenderTodosContratos,
        filtrarProduto: s.filtrarProduto,
        estrategiaVenda: s.estrategiaVenda,
        quantidade: s.quantidade, condicaoThreshold: s.condicaoThreshold,
    })));

    const ecoObj = economiaSetores || null;
    // ✅ cópia mutável — compras simuladas afetam espaço e saldo dos próximos steps
    const mktTrans = [...(marketTransactions || [])];
    const produtosEmVenda = new Set((sellQueue || []).map(v => v.produtoId || v.produto).filter(Boolean));
    const acoes = [];
    const stockSimulado = { ...stock };

    let saldoRestante = saldoInicial;
    const comprasComprometidasPorCat = {};

    for (let i = 0; i < pipeline.steps.length; i++) {
        const step = pipeline.steps[i];
        let stepAcoes = [];

        console.log(`[step ${i}] tipo=${step.tipo} | building=${step.buildingName} | formulaId=${step.formulaId}`);

        switch (step.tipo) {
            case "producao":
                stepAcoes = executarProducao(
                    step, stockSimulado, productionQueue, dados,
                    saldoRestante, pipeline.id, i,
                    { marketTransactions: mktTrans, dados }
                );
                break;
            case "venda":
                stepAcoes = executarVenda(
                    step, stockSimulado, dados, contratosEdificios,
                    getOuGerarContratos, ecoObj || economiaGlobal,
                    diaAtual, pipeline.id, i, mktTrans, sellQueue
                );
                break;
            case "mercado_compra":
                stepAcoes = executarMercadoCompra(
                    step, stockSimulado, saldoRestante, pipeline.id, i,
                    mktTrans, produtosEmVenda, dados, comprasComprometidasPorCat
                );
                break;
            case "mercado_venda":
                stepAcoes = executarMercadoVenda(step, stockSimulado, ecoObj || economiaGlobal, pipeline.id, i);
                break;
        }

        if (stepAcoes.length > 0) {
            console.log(`  → ${stepAcoes.length} ação(ões):`, stepAcoes.map(a => a.tipo));
        } else {
            console.log(`  → nenhuma ação gerada`);
        }

        stepAcoes.forEach(acao => {
            if (acao.tipo === "COMPRAR_MERCADO") {
                saldoRestante -= acao.valorTotal;
                mktTrans.push({ tipo: "buy", produtoId: acao.produtoId, quantidade: acao.quantidade });
            }
            if (acao.tipo === "VENDER_MERCADO") {
                stockSimulado[acao.produtoId] = Math.max(0, (stockSimulado[acao.produtoId] || 0) - acao.quantidade);
            }
            if (acao.tipo === "INICIAR_VENDA_CONTRATO") {
                const pid = acao.contrato?.productId;
                if (pid) {
                    stockSimulado[pid] = Math.max(0, (stockSimulado[pid] || 0) - (acao.contrato?.quantidade || 0));
                    console.log(`  [sim] estoque de ${pid} reduzido para ${stockSimulado[pid]} após INICIAR_VENDA_CONTRATO`);
                }
            }
        });

        acoes.push(...stepAcoes);
    }

    console.log(`[executarPipeline] total de ações: ${acoes.length}`, acoes.map(a => a.tipo));
    console.groupEnd();
    return acoes;
}

export function executarTodosPipelines(pipelines, gameState) {
    const safeState = {
        ...gameState,
        dados: gameState?.dados ?? gameState?.edificiosFinais ?? {},
    };

    let saldoRestante = safeState.saldo || 0;
    const mktTransAcumulado = [...(safeState.marketTransactions || [])];
    const todasAcoes = [];

    for (const pipeline of pipelines) {
        const acoes = executarPipeline(pipeline, {
            ...safeState,
            saldo: saldoRestante,
            marketTransactions: mktTransAcumulado,
        });

        acoes.forEach(a => {
            if (a.tipo === "COMPRAR_MERCADO") {
                saldoRestante -= a.valorTotal;
                mktTransAcumulado.push({ tipo: "buy", produtoId: a.produtoId, quantidade: a.quantidade });
            }
        });

        todasAcoes.push(...acoes);
    }

    return todasAcoes;
}

// ─── ANÁLISE DE ARBITRAGEM ───────────────────────────────────────────────────

export function analisarArbitragem(economiaSetores) {
    const SETORES = ["agricultura", "industria", "comercio", "tecnologia", "imobiliario", "energia"];
    const oportunidades = [];

    const setoresBaixos = new Set(SETORES.filter(s => {
        const e = (economiaSetores?.[s]?.economiaSetor?.estadoAtual || "estável").toLowerCase();
        return e === "recessão" || e === "recessao" || e === "declinio" || e === "declínio";
    }));

    const setoresAltos = new Set(SETORES.filter(s => {
        const e = (economiaSetores?.[s]?.economiaSetor?.estadoAtual || "estável").toLowerCase();
        return e === "aquecida" || e === "progressiva";
    }));

    if (setoresBaixos.size === 0) return oportunidades;

    SALES_EDIFICIOS.forEach(ev => {
        (ev.formulas || []).forEach(fv => {
            const produtoFinal = fv.produto;
            const prod = productsCatalog[produtoFinal];
            if (!prod) return;

            FORMULAS_EDIFICIOS.forEach(ef => {
                const fMatch = ef.formulas?.find(f =>
                    Object.keys(f.output || {}).includes(produtoFinal)
                );
                if (!fMatch) return;

                const insumosBaratos = Object.keys(fMatch.input || {}).filter(pid => {
                    const prodInsumo = productsCatalog[pid];
                    if (!prodInsumo?.setor) return false;
                    return setoresBaixos.has(prodInsumo.setor);
                });

                const edificioNoSetorBaixo = setoresBaixos.has(ef.setor);
                if (insumosBaratos.length === 0 && !edificioNoSetorBaixo) return;

                const setorVendaProd = prod.setor || ev.setor || "comercio";
                const setorVendaEco  = ev.setor || setorVendaProd;
                const ecoVenda = economiaSetores?.[setorVendaEco]?.economiaSetor?.estadoAtual || "estável";

                const precoVenda    = marketPrices[produtoFinal] || 0;
                const custoInsumos  = Object.entries(fMatch.input || {}).reduce((s, [pid, q]) =>
                    s + (marketPrices[pid] || 0) * q, 0
                );
                const qtdOutput     = Object.values(fMatch.output || {})[0] || 1;
                const margemUnit    = precoVenda - (custoInsumos / qtdOutput);

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
                    ecoVenda,
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

    return oportunidades.sort((a, b) => b.margem - a.margem).slice(0, 12);
}

// ─── ANÁLISE DE PRODUTOS SEM VAZÃO ───────────────────────────────────────────

export function identificarProdutosSemVazao(pipelines, stock, productionQueue) {
    const produtosComDestino = new Set();
    pipelines.forEach(p => {
        (p.steps || []).forEach(step => {
            if (step.tipo === "mercado_venda" && step.produtoId) produtosComDestino.add(step.produtoId);
            if (step.tipo === "venda" && step.formulaId) {
                const sf = SALES_EDIFICIOS.flatMap(e => e.formulas || []).find(f => f.id === step.formulaId);
                if (sf) produtosComDestino.add(sf.produto);
            }
            if (step.tipo === "producao" && step.formulaId) {
                const cfg = getFormulaConfig(step.formulaId);
                if (cfg) Object.keys(cfg.formula.input || {}).forEach(pid => produtosComDestino.add(pid));
            }
        });
    });

    const produtosEmProducao = new Set();
    productionQueue.forEach(p => Object.keys(p.output || {}).forEach(pid => produtosEmProducao.add(pid)));

    const semVazao = [];
    Object.entries(stock).forEach(([pid, qtd]) => {
        if (qtd <= 10) return;
        if (produtosComDestino.has(pid)) return;
        const prod = productsCatalog[pid];
        if (!prod) return;

        const destinosPossiveis = SALES_EDIFICIOS
            .filter(e => e.formulas?.some(f => f.produto === pid))
            .map(e => e.nomeEdificio);

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