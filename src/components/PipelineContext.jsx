
import { createContext, useContext, useState, useCallback, useMemo } from "react";
// import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { useGame } from "./GameContext";
import { executarTodosPipelines, calcularROIPipeline, identificarProdutosSemVazao } from "./pipelineExecutor";
import { FORMULAS_EDIFICIOS } from "./productionFormulasConfig";
import { SALES_EDIFICIOS } from "./salesFormulasConfig";
import { marketPrices } from "./TablePrice";
import { useCentralStore, EDIFICIOS_BASE_DINAMICOS, EDIFICIOS_FINAIS_DINAMICOS_INICIAL, LICENCAS_DINAMICAS_GLOBAIS } from "../stores/useCentralStore";
import {
    EDIFICIOS_FINAIS_ESTATICOS,
    LICENCAS_ESTATICAS,
    EDIFICIOS_BASE_ESTATICOS,
    LICENCAS_ESTATICAS_GLOBAIS,
} from "../stores/dadosEstáticos";
const PipelineContext = createContext();

function gerarId() {
    return `pipe_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function gerarStepId() {
    return `step_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

// ─── Step padrão por tipo ─────────────────────────────────────────────────────

function criarStepPadrao(tipo, buildingName = "") {
    const base = { id: gerarStepId(), tipo, buildingName };

    switch (tipo) {
        case "producao":
            return {
                ...base,
                formulaId: "",
                quantidade: 1,
                condicaoThreshold: 0,
                prioridadeInsumo: "so_armazem",
            };
        case "venda":
            return {
                ...base,
                formulaId: "",
                quantidade: 1,
                condicaoThreshold: 0,
                estrategiaVenda: "maior_margem",
                prioridadeInsumo: "so_armazem",
                produtoId: "",
                // ── NOVOS ──
                atenderTodosContratos: false,
                filtrarProduto: null,
            };
        case "mercado_compra":
            return {
                ...base,
                buildingName: "Mercado Global",
                produtoId: "",
                quantidade: 10,
                condicaoThreshold: 20,
                precoTeto: 99999,
            };
        case "mercado_venda":
            return {
                ...base,
                buildingName: "Mercado Global",
                produtoId: "",
                quantidade: 10,
                condicaoThreshold: 50,
            };
        default:
            return base;
    }
}

// ─── Pipeline padrão vazio ────────────────────────────────────────────────────

function criarPipelinePadrao() {
    return {
        id: gerarId(),
        nome: "Novo Pipeline",
        ativo: false,
        cor: "#7c3aed",
        steps: [],
        edges: [],
        avisos: [],
        criadoEm: Date.now(),
        ultimaExecucao: null,
    };
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function PipelineProvider({ children }) {
    // const { dados } = useContext(CentraldeDadosContext);
  const dia = useCentralStore((s) => s.dia);
const economiaGlobal= useCentralStore((s) => s.economiaGlobal)
    const { economiaSetores, setEconomiaSetores } = useContext(DadosEconomyGlobalContext);
    const {
        stock,
        productionQueue,
        startProduction,
        iniciarVendaComercial,
        setMarketTransactions,
        removeProduct,
        contratosEdificios,
        getOuGerarContratos,
        startSale,
        marketTransactions,
        sellQueue,
    } = useGame();

    const [pipelines, setPipelines] = useState([]);

    // ─── Avisos acumulados da última execução (para UI) ──────────────────────
    const [logExecucao, setLogExecucao] = useState([]);

    // ─── CRUD de Pipelines ───────────────────────────────────────────────────

    const criarPipeline = useCallback(() => {
        const novo = criarPipelinePadrao();
        setPipelines(prev => [...prev, novo]);
        return novo.id;
    }, []);

    // Cria pipeline já com steps iniciais — usado pelo wizard
    // stepsIniciais: array de objetos Step completos (com id, tipo, buildingName, etc.)
    const criarPipelineComSteps = useCallback((stepsIniciais = [], nome = "Novo Pipeline") => {
        const novo = {
            ...criarPipelinePadrao(),
            nome,
            steps: stepsIniciais.map(s => ({
                ...criarStepPadrao(s.tipo, s.buildingName || ""),
                ...s, // sobrescreve com valores do wizard (formulaId, quantidade, etc.)
                id: s.id || gerarStepId(), // garante id único
            })),
        };
        console.log("[Pipeline] criarPipelineComSteps →", novo.nome, "steps:", novo.steps.length, novo.steps);
        setPipelines(prev => [...prev, novo]);
        return novo.id;
    }, []);

    const removerPipeline = useCallback((pipelineId) => {
        setPipelines(prev => prev.filter(p => p.id !== pipelineId));
    }, []);

    const atualizarPipeline = useCallback((pipelineId, campos) => {
        setPipelines(prev =>
            prev.map(p => p.id === pipelineId ? { ...p, ...campos } : p)
        );
    }, []);

    const togglePipeline = useCallback((pipelineId) => {
        setPipelines(prev =>
            prev.map(p => p.id === pipelineId ? { ...p, ativo: !p.ativo } : p)
        );
    }, []);

    // ─── CRUD de Steps ───────────────────────────────────────────────────────

    const adicionarStep = useCallback((pipelineId, tipo, buildingName = "") => {
        const novoStep = criarStepPadrao(tipo, buildingName);
        setPipelines(prev =>
            prev.map(p => p.id === pipelineId
                ? { ...p, steps: [...p.steps, novoStep] }
                : p
            )
        );
        return novoStep.id;
    }, []);

    const removerStep = useCallback((pipelineId, stepId) => {
        setPipelines(prev =>
            prev.map(p => p.id === pipelineId
                ? { ...p, steps: p.steps.filter(s => s.id !== stepId) }
                : p
            )
        );
    }, []);

    const atualizarStep = useCallback((pipelineId, stepId, campos) => {
        setPipelines(prev =>
            prev.map(p => p.id === pipelineId
                ? {
                    ...p,
                    steps: p.steps.map(s => s.id === stepId ? { ...s, ...campos } : s)
                }
                : p
            )
        );
    }, []);

    const reordenarSteps = useCallback((pipelineId, stepsOrdenados) => {
        setPipelines(prev =>
            prev.map(p => p.id === pipelineId ? { ...p, steps: stepsOrdenados } : p)
        );
    }, []);

    // Persiste as edges (conexões visuais) do editor React Flow
    const salvarEdges = useCallback((pipelineId, edges) => {
        setPipelines(prev =>
            prev.map(p => p.id === pipelineId ? { ...p, edges: edges || [] } : p)
        );
    }, []);

    // ─── Aplicar ações retornadas pelo executor ───────────────────────────────
    //
    // O executor é puro — só retorna o QUE fazer.
    // Aqui é onde os side effects acontecem de verdade.

    const aplicarAcoes = useCallback((acoes) => {
        const novoLog = [];
        console.log("[Pipeline] aplicarAcoes — total:", acoes.length, acoes);

        console.group(`[aplicarAcoes] processando ${acoes.length} ação(ões)`);
        acoes.forEach((a, i) => console.log(`  [${i}] ${a.tipo}`,
            a.tipo === "INICIAR_VENDA_CONTRATO" ? { produto: a.contrato?.productId, qtd: a.contrato?.quantidade, valor: a.contrato?.valorTotal, formulaId: a.contrato?.formulaId } :
                a.tipo === "INICIAR_PRODUCAO" ? { building: a.buildingName, formulaId: a.formulaId, qtd: a.quantidade } :
                    a.tipo === "COMPRAR_MERCADO" ? { produto: a.produtoId, qtd: a.quantidade, valor: a.valorTotal } :
                        a
        ))


        for (const acao of acoes) {
            switch (acao.tipo) {

                case "INICIAR_PRODUCAO": {
                    let formula = null;
                    let edificioConfig = null;

                    for (const ed of FORMULAS_EDIFICIOS) {
                        const f = ed.formulas?.find(f => f.id === acao.formulaId);
                        if (f) { formula = f; edificioConfig = ed; break; }
                    }
                    if (!formula) break;

                    // Busca a quantidade real de edifícios construídos
                    const SETORES_JOGO = ["agricultura", "industria", "comercio", "tecnologia", "imobiliario", "energia"];
                    let buildingCount = 1;
                    for (const setor of SETORES_JOGO) {
                        const estaticos = EDIFICIOS_FINAIS_ESTATICOS[setor]?.edificios || [];
                        const dinamicos = state.edificiosFinais[setor]?.edificios || [];

                        const index = estaticos.findIndex(e => e.nome === acao.buildingName);
                        if (index === -1) continue;

                        const quantidade = dinamicos[index]?.quantidade ?? 0;
                        if (quantidade > 0) { buildingCount = quantidade; break; }
                    }

                    const ok = startProduction({
                        formula,
                        quantidade: acao.quantidade,
                        buildingCount,  // ← agora com valor real
                    });
                    console.log("[aplicarAcoes] INICIAR_PRODUCAO →", {
                        buildingName: acao.buildingName,
                        formulaId: acao.formulaId,
                        quantidade: acao.quantidade,
                        buildingCount,
                    });


                    novoLog.push({
                        pipelineId: acao.pipelineId,
                        stepIndex: acao.stepIndex,
                        mensagem: ok
                            ? `Produção iniciada: ${acao.quantidade}x "${formula.nome}"`
                            : `Falha ao iniciar produção "${formula.nome}" — cap. ou insumos insuficientes`,
                        severidade: ok ? "sucesso" : "alerta",
                        timestamp: Date.now(),
                    });
                    break;
                }

                case "INICIAR_VENDA": {
                    const salesEd = SALES_EDIFICIOS.find(e => e.nomeEdificio === acao.buildingName);
                    const salesFormula = salesEd?.formulas?.find(f => f.id === acao.formulaId);
                    if (!salesFormula) break;
                    iniciarVendaComercial(salesFormula, acao.quantidade);
                    novoLog.push({ pipelineId: acao.pipelineId, stepIndex: acao.stepIndex, mensagem: `Venda iniciada: ${acao.quantidade}x "${acao.produto}" por R$${acao.valorTotal}`, severidade: "sucesso", timestamp: Date.now() });
                    break;
                }

                case "INICIAR_VENDA_CONTRATO": {
                    if (!acao.contrato) { console.warn("[aplicarAcoes] INICIAR_VENDA_CONTRATO sem contrato!"); break; }
                    console.log("[aplicarAcoes] chamando startSale com:", {
                        id: acao.contrato.id,
                        productId: acao.contrato.productId,
                        quantidade: acao.contrato.quantidade,
                        valorTotal: acao.contrato.valorTotal,
                        formulaId: acao.contrato.formulaId,
                        estoqueAtual: stock[acao.contrato.productId] ?? "❓ sem acesso ao stock aqui",
                    });
                    // Usa startSale do GameContext — assina o contrato e enfileira o pagamento
                    if (!acao.contrato) break;
                    console.log("[Pipeline] Assinando contrato automático:", acao.contrato);
                    startSale(acao.contrato);
                    novoLog.push({ pipelineId: acao.pipelineId, stepIndex: acao.stepIndex, mensagem: `Contrato assinado: ${acao.contrato.quantidade}x "${acao.contrato.productId}" — R$${acao.contrato.valorTotal}`, severidade: "sucesso", timestamp: Date.now() });
                    break;
                }

                case "COMPRAR_MERCADO": {
                    // Deduz o saldo imediatamente (pagamento antecipado)
                    setEconomiaSetores(prev => ({
                        ...prev,
                        saldo: prev.saldo - acao.valorTotal,
                    }));

                    // Enfileira a transação — produto chega após delayDias
                    setMarketTransactions(prev => [
                        ...prev,
                        {
                            id: gerarId(),
                            tipo: "buy",
                            produtoId: acao.produtoId,
                            quantidade: acao.quantidade,
                            valorTotal: acao.valorTotal,
                            diasRestantes: acao.delayDias,
                            origem: "pipeline",
                            pipelineId: acao.pipelineId,
                        },
                    ]);

                    novoLog.push({
                        pipelineId: acao.pipelineId,
                        stepIndex: acao.stepIndex,
                        mensagem: `Compra no mercado: ${acao.quantidade}x "${acao.produtoId}" por R$${acao.valorTotal}. Chega em ${acao.delayDias} dias.`,
                        severidade: "info",
                        timestamp: Date.now(),
                    });
                    break;
                }

                case "VENDER_MERCADO": {
                    // Remove do estoque imediatamente
                    removeProduct(acao.produtoId, acao.quantidade);

                    // Enfileira recebimento — saldo chega após delayDias
                    setMarketTransactions(prev => [
                        ...prev,
                        {
                            id: gerarId(),
                            tipo: "sell",
                            produtoId: acao.produtoId,
                            quantidade: acao.quantidade,
                            valorTotal: acao.valorTotal,
                            diasRestantes: acao.delayDias,
                            origem: "pipeline",
                            pipelineId: acao.pipelineId,
                        },
                    ]);

                    novoLog.push({
                        pipelineId: acao.pipelineId,
                        stepIndex: acao.stepIndex,
                        mensagem: `Venda no mercado: ${acao.quantidade}x "${acao.produtoId}" por R$${acao.valorTotal}. Recebe em ${acao.delayDias} dias.`,
                        severidade: "info",
                        timestamp: Date.now(),
                    });
                    break;
                }

                case "AVISO": {
                    novoLog.push({
                        pipelineId: acao.pipelineId,
                        stepIndex: acao.stepIndex,
                        mensagem: acao.mensagem,
                        severidade: acao.severidade,
                        timestamp: Date.now(),
                    });
                    break;
                }

                default:
                    break;
            }
        }

        if (novoLog.length > 0) {
            setLogExecucao(prev => [...novoLog, ...prev].slice(0, 200));
        }

        // Atualiza timestamp de última execução nos pipelines que geraram ações
        const pipelinesExecutados = new Set(acoes.map(a => a.pipelineId).filter(Boolean));
        if (pipelinesExecutados.size > 0) {
            setPipelines(prev =>
                prev.map(p =>
                    pipelinesExecutados.has(p.id)
                        ? { ...p, ultimaExecucao: Date.now() }
                        : p
                )
            );
        }
    }, [startProduction, iniciarVendaComercial, setMarketTransactions, removeProduct, setEconomiaSetores]);

    // ─── Ponto de entrada chamado pelo ProximoDia() ───────────────────────────
    //
    // Chame assim no NextDay.jsx, dentro do ProximoDia(), logo após processProductions():
    //
    //   const { executarPipelinesHoje } = usePipeline();
    //   ...
    //   processProductions();
    //   executarPipelinesHoje();   // ← aqui
    //   processSellQueue(faturamento);

    const executarPipelinesHoje = useCallback(() => {
        const pipelinesAtivos = pipelines.filter(p => p.ativo);

        // ── DEBUG ──────────────────────────────────────────────────────────────
        console.group(`[executarPipelinesHoje] dia ${dia} | ativos: ${pipelinesAtivos.length}/${pipelines.length}`);
        console.log("saldo disponível:", economiaSetores?.saldo);
        console.log("stock não-zero:", Object.fromEntries(Object.entries(stock || {}).filter(([, v]) => v > 0)));
        console.log("sellQueue:", (sellQueue || []).map(v => ({ id: v.id, produto: v.produto || v.produtoId, qtd: v.quantidade, diasRestantes: v.diasRestantes })));
        console.log("productionQueue:", (productionQueue || []).map(p => ({ formulaId: p.formulaId, qtd: p.quantidade, diasRestantes: p.diasRestantes })));
        console.log("marketTransactions:", (marketTransactions || []).map(t => ({ tipo: t.tipo, pid: t.produtoId, qtd: t.quantidade, dias: t.diasRestantes })));
        console.log("getOuGerarContratos disponível:", typeof getOuGerarContratos === "function");
        // ───────────────────────────────────────────────────────────────────────

        if (pipelinesAtivos.length === 0) { console.log("nenhum pipeline ativo"); console.groupEnd(); return; }

        const gameState = {
            stock,
            productionQueue,
           
            economiaGlobal: economiaGlobal || "estável",
            economiaSetores: economiaSetores || {},
            saldo: economiaSetores?.saldo || 0,
            contratosEdificios: contratosEdificios || {},
            getOuGerarContratos: getOuGerarContratos || (() => []),
            diaAtual: dia || 0,
            marketTransactions: [...(marketTransactions || [])],
            sellQueue: sellQueue || [],
        };

        // ── DEBUG ──
        console.log("gameState.saldo:", gameState.saldo, "| gameState.diaAtual:", gameState.diaAtual);
        console.log("gameState.getOuGerarContratos é função?", typeof gameState.getOuGerarContratos === "function");

        const acoes = executarTodosPipelines(pipelinesAtivos, gameState);

        // ── DEBUG ──
        console.log(`[executarPipelinesHoje] total ações: ${acoes.length}`);
        console.groupEnd();

        if (acoes.length > 0) aplicarAcoes(acoes);
    }, [pipelines, stock, productionQueue, economiaSetores, contratosEdificios, getOuGerarContratos, marketTransactions, sellQueue, aplicarAcoes]);

    // ─── Dados derivados para a UI ────────────────────────────────────────────

    const pipelinesComROI = useMemo(() => {
        return pipelines.map(p => ({
            ...p,
            roi: calcularROIPipeline(p, economiaSetores?.economiaGlobal || "estável"),
        }));
    }, [pipelines, economiaSetores?.economiaGlobal]);

    // Avisos ativos agrupados por pipeline (para badge no editor)
    const avisosPorPipeline = useMemo(() => {
        const map = {};
        logExecucao.forEach(log => {
            if (!log.pipelineId) return;
            if (!map[log.pipelineId]) map[log.pipelineId] = [];
            map[log.pipelineId].push(log);
        });
        return map;
    }, [logExecucao]);

    // Produtos sem vazão — sem destino em nenhum pipeline ativo
    const produtosSemVazao = useMemo(() => {
        return identificarProdutosSemVazao(pipelines, stock, productionQueue);
    }, [pipelines, stock, productionQueue]);

    // ─── Helpers de consulta para o editor ───────────────────────────────────

    // Retorna todas as fórmulas de produção disponíveis para um edifício
    const getFormulasPorEdificio = useCallback((buildingName) => {
        const ed = FORMULAS_EDIFICIOS.find(e => e.nomeEdificio === buildingName);
        return ed?.formulas || [];
    }, []);

    // Retorna todas as fórmulas de venda disponíveis para um edifício comercial
    const getFormulasVendaPorEdificio = useCallback((buildingName) => {
        const ed = SALES_EDIFICIOS.find(e => e.nomeEdificio === buildingName);
        return ed?.formulas || [];
    }, []);

    // Retorna os produtos disponíveis no mercado global (todos que têm preço)
    const getProdutosMercado = useCallback(() => {
        return Object.entries(marketPrices).map(([id, preco]) => ({ id, preco }));
    }, []);

    // Limpa o log de execução
    const limparLog = useCallback(() => setLogExecucao([]), []);

    // ─── Serialização para persistência ──────────────────────────────────────
    //
    // Use isso ao salvar o estado do jogo (como você já faz com salvarNoStorage):
    //
    //   const { getPipelinesParaSalvar, carregarPipelines } = usePipeline();
    //   salvarNoStorage({ pipelines: getPipelinesParaSalvar(), ...resto });

    const getPipelinesParaSalvar = useCallback(() => pipelines, [pipelines]);

    const carregarPipelines = useCallback((pipelinesSalvos) => {
        if (Array.isArray(pipelinesSalvos)) {
            setPipelines(pipelinesSalvos);
        }
    }, []);

    // ─────────────────────────────────────────────────────────────────────────

    return (
        <PipelineContext.Provider value={{
            // Estado
            pipelines: pipelinesComROI,
            logExecucao,
            avisosPorPipeline,

            // CRUD Pipelines
            criarPipeline,
            criarPipelineComSteps,
            removerPipeline,
            atualizarPipeline,
            togglePipeline,

            // CRUD Steps
            adicionarStep,
            salvarEdges,
            removerStep,
            atualizarStep,
            reordenarSteps,

            // Execução (chamado pelo NextDay)
            executarPipelinesHoje,

            // Helpers para o editor
            getFormulasPorEdificio,
            getFormulasVendaPorEdificio,
            getProdutosMercado,

            // Persistência
            getPipelinesParaSalvar,
            carregarPipelines,

            // Análise
            produtosSemVazao,

            // Log
            limparLog,
        }}>
            {children}
        </PipelineContext.Provider>
    );
}

export function usePipeline() {
    const ctx = useContext(PipelineContext);
    if (!ctx) throw new Error("usePipeline deve ser usado dentro de PipelineProvider");
    return ctx;
}