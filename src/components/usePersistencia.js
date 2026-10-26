const estadoInicialEconomy={
    
    saldo: 100000000000,
    fimGame: false,
    economiaGlobal: "estável",
    valorImpostoAnual: 0,
    patrimonio:0,
    despesasImpostoAnual: {
      diaPagarImpostoAnual: false,
      impostoAnualPago: false,
      proximoPagamento: "",
    },
     idContrato: 0,
    contratosBancos: [],
    despesasEmprestimo: {
      diaPagarDespesas: false,
      despesasPagas: true,
      proximoPagamento: "30",
    },
    centralEdificios: {
      classificacaoPorteEmpresa: "Mega Holding",
      quantidadeUnicoMax: 3,
      quantidadeSetoresMax: 2,
      quantidadeDiversosEdificiosMax: 5,
      quantidadeEdificiosMax: 7,
      quantidadeUnicoAtual: 0,
      quantidadeSetoresAtual: 0,
      quantidadeDiversosEdificiosAtual: 0,
      quantidadeEdificiosAtual: 0,
    },
    porteEmpresa: [
      {
        chave: "empreendimento_individual",
        nome: "Empreendimento Individual",
        qtdMaxSetores: 2,
        edificiosUnicosMax: 3,
        qtdMaxDiversificar: 3,
        totalMaxEdificios: 5,
        custoUpgrade: 0,
        status: true,
        descricao:
          "Uma pequena operação para iniciar seu negócio com recursos limitados.",
        textoLiberacao:
          "Você poderá ter até 3 tipos de edifícios diferentes, 2 unidades por tipo, totalizando 5 edifícios.",
      },
      {
        chave: "sociedade_limitada",
        nome: "Sociedade Limitada",
        qtdMaxSetores: 3,
        edificiosUnicosMax: 5,
        qtdMaxDiversificar: 5,
        totalMaxEdificios: 15,
        custoUpgrade: 200000,
        status: false,
        descricao: "Uma empresa com capacidade maior de investimento e gestão.",
        textoLiberacao:
          "Agora você pode ter até 5 tipos de edifícios diferentes, 5 unidades por tipo, totalizando 15 edifícios.",
      },
      {
        chave: "empresa_regional",
        nome: "Empresa Regional",
        qtdMaxSetores: 3,
        edificiosUnicosMax: 7,
        qtdMaxDiversificar: 7,
        totalMaxEdificios: 25,
        custoUpgrade: 500000,
        status: false,
        descricao:
          "Expansão para atuação em toda a região, com maior diversidade de edificações.",
        textoLiberacao:
          "Você poderá ter até 7 tipos de edifícios, 7 unidades por tipo, totalizando 25 edifícios.",
      },
      {
        chave: "companhia_local",
        nome: "Companhia Local",
        qtdMaxSetores: 4,
        edificiosUnicosMax: 10,
        qtdMaxDiversificar: 9,
        totalMaxEdificios: 40,
        custoUpgrade: 1000000,
        status: false,
        descricao:
          "Um porte sólido para consolidar presença local e maior faturamento.",
        textoLiberacao:
          "Agora pode possuir até 9 tipos de edifícios, 10 unidades por tipo, totalizando 40 edifícios.",
      },
      {
        chave: "empresa_estadual",
        nome: "Empresa Estadual",
        qtdMaxSetores: 5,
        edificiosUnicosMax: 12,
        qtdMaxDiversificar: 12,
        totalMaxEdificios: 60,
        custoUpgrade: 2500000,
        status: false,
        descricao:
          "Capacidade para expandir em todo o estado, com grande diversidade de negócios.",
        textoLiberacao:
          "Você terá até 12 tipos de edifícios, 12 unidades por tipo, totalizando 60 edifícios.",
      },
      {
        chave: "companhia_nacional",
        nome: "Companhia Nacional",
        qtdMaxSetores: 5,
        edificiosUnicosMax: 20,
        qtdMaxDiversificar: 40,
        totalMaxEdificios: 100,
        custoUpgrade: 5000000,
        status: false,
        descricao:
          "Empresa com alcance nacional, gerando grande volume de operações.",
        textoLiberacao:
          "Até 15 tipos de edifícios, 15 unidades por tipo, totalizando 90 edifícios.",
      },
      {
        chave: "corporacao_multissetorial",
        nome: "Corporação Multissetorial",
        qtdMaxSetores: 6,
        edificiosUnicosMax: 40,
        qtdMaxDiversificar: 50,
        totalMaxEdificios: 300,
        custoUpgrade: 10000000,
        status: false,
        descricao:
          "Corporação de grande porte, com atuação em múltiplos setores e alto faturamento.",
        textoLiberacao:
          "Você poderá ter até 18 tipos de edifícios, 20 unidades por tipo, totalizando 130 edifícios.",
      },
      {
        chave: "grupo_empresarial",
        nome: "Grupo Empresarial",
        qtdMaxSetores: 6,
        edificiosUnicosMax: 55,
        qtdMaxDiversificar: 70,
        totalMaxEdificios: 500,
        custoUpgrade: 20000000,
        status: false,
        descricao:
          "Grupo com alcance estratégico nacional e diversificação de negócios.",
        textoLiberacao:
          "Agora você pode possuir até 22 tipos de edifícios, 25 unidades por tipo, totalizando 180 edifícios.",
      },
      {
        chave: "conglomerado_global",
        nome: "Conglomerado Global",
        qtdMaxSetores: 6,
        edificiosUnicosMax: 70,
        qtdMaxDiversificar: 100,
        totalMaxEdificios: 1000,
        custoUpgrade: 40000000,
        status: false,
        descricao:
          "Empresa de alcance internacional, com domínio de múltiplos mercados.",
        textoLiberacao:
          "Você poderá ter até 26 tipos de edifícios, 35 unidades por tipo, totalizando 250 edifícios.",
      },
      {
        chave: "mega_holding",
        nome: "Mega Holding",
        qtdMaxSetores: 6,
        edificiosUnicosMax: 100,
        qtdMaxDiversificar: 160,
        totalMaxEdificios: 1000000,
        custoUpgrade: 80000000,
        status: false,
        descricao:
          "Holding máxima, sem limites de operação, capaz de dominar todo o mercado.",
        textoLiberacao:
          "Não há limites de tipos ou quantidade de edifícios. Você tem liberdade total para expandir sua holding.",
      },
    ],

    modalImpostoAnual: {
      estadoModal: false,
      head: "",
      content: "",
    },
    imposto: {
      impostoFixoMensal: 0,
      impostoDiário: 0,
      impostoMensal: 0,
      impostoSobreFaturamentoDiário: 0,
            arrayimpostoDiário: [],
    },
    agricultura: {
      economiaSetor: {
        patrimonio: 0,
        estadoAtual: "estável",
        percImpostoAnualAtual: 20,
        ArrayFatu: [],
        ArrayFatuHistory: [],
        arrValorImpostoAnualPorMes: [],
        valorImpostoAnualAtual: 0,
        RelatórioMensalImpostoAnual: {},
      },
    },
    tecnologia: {
      economiaSetor: {
        patrimonio: 0,
        estadoAtual: "estável",
        percImpostoAnualAtual: 24,
        ArrayFatu: [],
        ArrayFatuHistory: [],
        arrValorImpostoAnualPorMes: [],
        valorImpostoAnualAtual: 0,
        RelatórioMensalImpostoAnual: {},
      },
    },
    comercio: {
      economiaSetor: {
        patrimonio: 0,
        estadoAtual: "estável",
        percImpostoAnualAtual: 22,
        ArrayFatu: [],
        ArrayFatuHistory: [],
        arrValorImpostoAnualPorMes: [],
        valorImpostoAnualAtual: 0,
        RelatórioMensalImpostoAnual: {},
      },
    },
    industria: {
      economiaSetor: {
        patrimonio: 0,
        estadoAtual: "estável",
        percImpostoAnualAtual: 24,
        ArrayFatu: [],
        ArrayFatuHistory: [],
        arrValorImpostoAnualPorMes: [],
        valorImpostoAnualAtual: 0,
        RelatórioMensalImpostoAnual: {},
      },
    },
    imobiliario: {
      economiaSetor: {
        patrimonio: 0,
        estadoAtual: "estável",
        percImpostoAnualAtual: 22,
        ArrayFatu: [],
        ArrayFatuHistory: [],
        arrValorImpostoAnualPorMes: [],
        valorImpostoAnualAtual: 0,
        RelatórioMensalImpostoAnual: {},
      },
    },
    energia: {
      economiaSetor: {
        patrimonio: 0,
        estadoAtual: "estável",
        percImpostoAnualAtual: 20,
        ArrayFatu: [], 
        ArrayFatuHistory: [], 
        arrValorImpostoAnualPorMes: [],
        valorImpostoAnualAtual: 0,
        RelatórioMensalImpostoAnual: {},
      },
    },
    carteira: {
      carteiraAtual: [],
    },
      patrimonioGlobal: 0,
  }



export const EDIFICIOS_BASE_DINAMICOS = {
    terrenos: {
        achievements: { 5: false, 10: false, 20: false, 50: false, 100: false, 200: false, 500: false, 1000: false },
        arrayFatu: [], somaArrayFatu: "",
        quantidade: 0, preçoConstrução: 40000,
        faturamentoUnitário: 130, faturamentoUnitárioPadrão: 130,
        faturamentoTotal: 0, faturamentoMensal: 0,
        impostoFixo: 1500, valorImpostoFixoTotal: 0,
        impostoSobreFaturamento: 0.02, valorImpostoSobreFaturamento: 0,
        valorImpostoMensal: 0,
    },
    lojasP: {
        achievements: { 5: false, 10: false, 20: false, 50: false, 100: false, 200: false, 500: false, 1000: false },
        arrayFatu: [], somaArrayFatu: 0,
        quantidade: 0, preçoConstrução: 50000,
        faturamentoUnitário: 850, faturamentoUnitárioPadrão: 850,
        faturamentoTotal: 0, faturamentoMensal: 0, despesas: 0,
        impostoFixo: 6000, valorImpostoFixoTotal: 0,
        impostoSobreFaturamento: 0.05, valorImpostoSobreFaturamento: 0,
    },
    lojasM: {
        achievements: { 5: false, 10: false, 20: false, 50: false, 100: false, 200: false, 500: false, 1000: false },
        arrayFatu: [], somaArrayFatu: "",
        quantidade: 0, preçoConstrução: 100000,
        faturamentoUnitário: 2000, faturamentoUnitárioPadrão: 2000,
        faturamentoTotal: 0, faturamentoMensal: 0, despesas: 0,
        impostoFixo: 10000, valorImpostoFixoTotal: 0,
        impostoSobreFaturamento: 0.07, valorImpostoSobreFaturamento: 0,
    },
    lojasG: {
        achievements: { 5: false, 10: false, 20: false, 50: false, 100: false, 200: false, 500: false, 1000: false },
        arrayFatu: [], somaArrayFatu: "",
        quantidade: 0, preçoConstrução: 240000,
        faturamentoUnitário: 5000, faturamentoUnitárioPadrão: 5000,
        faturamentoTotal: 0, faturamentoMensal: 0, despesas: 0,
        impostoFixo: 15000, valorImpostoFixoTotal: 0,
        impostoSobreFaturamento: 0.1, valorImpostoSobreFaturamento: 0,
    },
}

export const LICENCAS_DINAMICAS_GLOBAIS = {
    agricultura: { licençaGlobal: { comprado: true } },
    tecnologia: { licençaGlobal: { comprado: true } },
    industria: { licençaGlobal: { comprado: true } },
    comercio: { licençaGlobal: { comprado: true } },
    imobiliario: { licençaGlobal: { comprado: true } },
    energia: { licençaGlobal: { comprado: true } },
    grafico: { licençaGlobal: { comprado: true } },
    carteira: { licençaGlobal: { comprado: true } },
    gerenciamento: { licençaGlobal: { comprado: true } },
    ecossistema: { licençaGlobal: { comprado: true } },
    mercado: { licençaGlobal: { comprado: true } },
}

export const EDIFICIOS_FINAIS_DINAMICOS_INICIAL = {
    agricultura: {
        edificios: [
            { licençaLiberado: { liberado: false }, quantidade: 0, powerUp: { redCustoAtual: 0, aumFatuAtual: 0 } },
            { licençaLiberado: { liberado: false }, quantidade: 0, powerUp: { redCustoAtual: 0, aumFatuAtual: 0 } },
            { licençaLiberado: { liberado: false }, quantidade: 0, powerUp: { redCustoAtual: 0, aumFatuAtual: 0 } },
            { licençaLiberado: { liberado: false }, quantidade: 0, powerUp: { redCustoAtual: 0, aumFatuAtual: 0 } },
            { licençaLiberado: { liberado: false }, quantidade: 0, powerUp: { redCustoAtual: 0, aumFatuAtual: 0 } },
            { licençaLiberado: { liberado: false }, quantidade: 0, powerUp: { redCustoAtual: 0, aumFatuAtual: 0 } },
            { licençaLiberado: { liberado: false }, quantidade: 0, powerUp: { redCustoAtual: 0, aumFatuAtual: 0 } },
            { licençaLiberado: { liberado: false }, quantidade: 0, powerUp: { redCustoAtual: 0, aumFatuAtual: 0 } },
            { licençaLiberado: { liberado: false }, quantidade: 0, powerUp: { redCustoAtual: 0, aumFatuAtual: 0 } },
            { licençaLiberado: { liberado: false }, quantidade: 0, powerUp: { redCustoAtual: 0, aumFatuAtual: 0 } },
            { licençaLiberado: { liberado: false }, quantidade: 0, powerUp: { redCustoAtual: 0, aumFatuAtual: 0 } },
            { licençaLiberado: { liberado: false }, quantidade: 0, powerUp: { redCustoAtual: 0, aumFatuAtual: 0 } },
            { licençaLiberado: { liberado: false }, quantidade: 0, powerUp: { redCustoAtual: 0, aumFatuAtual: 0 } },
            { licençaLiberado: { liberado: false }, quantidade: 0, powerUp: { redCustoAtual: 0, aumFatuAtual: 0 } },
            { licençaLiberado: { liberado: false }, quantidade: 0, powerUp: { redCustoAtual: 0, aumFatuAtual: 0 } },
            { licençaLiberado: { liberado: false }, quantidade: 0, powerUp: { redCustoAtual: 0, aumFatuAtual: 0 } },
            { licençaLiberado: { liberado: false }, quantidade: 0, powerUp: { redCustoAtual: 0, aumFatuAtual: 0 } },
            { licençaLiberado: { liberado: false }, quantidade: 0, powerUp: { redCustoAtual: 0, aumFatuAtual: 0 } },
            { licençaLiberado: { liberado: false }, quantidade: 0, powerUp: { redCustoAtual: 0, aumFatuAtual: 0 } },
            { licençaLiberado: { liberado: false }, quantidade: 0, powerUp: { redCustoAtual: 0, aumFatuAtual: 0 } },
        ]
    },
    tecnologia: {
        edificios: Array(27).fill(null).map(() => ({ licençaLiberado: { liberado: false }, quantidade: 0, powerUp: { redCustoAtual: 0, aumFatuAtual: 0 } }))
    },
    industria: {
        edificios: Array(42).fill(null).map(() => ({ licençaLiberado: { liberado: false }, quantidade: 0, powerUp: { redCustoAtual: 0, aumFatuAtual: 0 } }))
    },
    comercio: {
        edificios: Array(30).fill(null).map(() => ({ licençaLiberado: { liberado: false }, quantidade: 0, powerUp: { redCustoAtual: 0, aumFatuAtual: 0 } }))
    },
    imobiliario: {
        edificios: Array(21).fill(null).map(() => ({ licençaLiberado: { liberado: false }, quantidade: 0, powerUp: { redCustoAtual: 0, aumFatuAtual: 0 } }))
    },
    energia: {
        edificios: Array(20).fill(null).map(() => ({ licençaLiberado: { liberado: false }, quantidade: 0, powerUp: { redCustoAtual: 0, aumFatuAtual: 0 } }))
    }
}

export const LICENCAS_STATUS_INICIAL = {
    agricultura: Array(7).fill(null).map(() => ({ status: false })),
    tecnologia: Array(9).fill(null).map(() => ({ status: false })),
    industria: Array(13).fill(null).map(() => ({ status: false })),
    comercio: Array(10).fill(null).map(() => ({ status: false })),
    imobiliario: Array(7).fill(null).map(() => ({ status: false })),
    energia: Array(7).fill(null).map(() => ({ status: false })),
    grafico: [],
    carteira: [],
    gerenciamento: [],
    ecossistema: [],
    mercado: [],
};


const estadoInicial = {
    inicioGame: { estadoModal: true, nomeEmpresa: "" },
    nomeEmpresa: "",
    setorAtivo: "agricultura",
    fimGame: false,
    dia: 1,
    animarCicloDia: null,
    chanceNovoEvento: 0,
    economiaGlobal: "estável",
    botãoOfertas: "btnNormal",
    proximaEconomia: "",
    proximaOferta: "",
    ofertas: [],
    itensSorteados: [],

    modal: { estadoModal: false, head: "", content: "" },
    modalEditável: { estadoModal: false, head: "", content: "" },
    modalAlert: { estadoModal: false, head: "", content: "" },
    modalAjuda: { estadoModal: false, head: "", content: "" },
    modalObjetivos: { estadoModal: false, head: "", content: "" },
    modalDespesas: { estadoModal: false, head: "", content: "" },
    modalEconomiaGlobal: { estadoModal: false, head: "", content: "" },
    modalOfertas: { estadoModal: false },
    modalAchievements: { estadoModal: false, lojaConquistada: "", conquista: 0 },
    modalPerson: { estadoModal: false, texto: "", tipo: "pensamento" },

    modalInicio: { estadoModal: false },
    modalCompraTerrenos: { estadoModal: false },
    modalContinuarDias: { estadoModal: false },

    modalExcesso: {
        estadoModal: false, confirmarAvanco: false,
        head: "Armazenamento insuficiente", content: "",
        quantidadeExcesso: 0, ofertaExcesso: 0,
    },
    despesas: {
        diaPagarDespesas: false,
        despesasPagas: true,
        proximoPagamento: "",
    },

    eventoAtual: {
        eventoAtivo: false, title: "", lojaSelecionada: "",
        situacaoSelecionada: "", porcentagemSelecionada: "",
        periodoSelecionado: "", diaInicial: "", diaFinal: "",
        departamento: "", julgamento: "",
    },

    faturamento: { faturamentoDiário: 0, faturamentoMensal: 0, arrayFatuDiário: [] },
    relatóriosFaturamento: {},
    imposto: { impostoFixoMensal: 0, impostoDiário: 0, impostoMensal: 0, impostoSobreFaturamentoDiário: 0 },
    valoresDespesas: { terrenos: 0, lojasP: 0, lojasM: 0, lojasG: 0, impostos: 0, funcionários: 0, despesasTotais: 0 },

    edificiosBase: EDIFICIOS_BASE_DINAMICOS,
    edificiosFinais: EDIFICIOS_FINAIS_DINAMICOS_INICIAL,

    licençasStatus: LICENCAS_STATUS_INICIAL,
    licençasGlobais: {
        agricultura: false,
        tecnologia: false,
        industria: false,
        comercio: false,
        imobiliario: false,
        energia: false,
    },
    economiaSetores: {
        agricultura: { estadoAtual: "estável" },
    },

    vision: { visionAtual: "dashboard" },
}

const KEYS = {
    game:     "econoGame_gameState",
    central:  "central: econoGame_central_old",
    economy:  "econoGame_economy",
    pipelines:"econoGame_pipelines",
};

// ─── Flag de reset em andamento (defesa em 2 níveis: módulo + window) ──
let _resetEmAndamento = false;

export function marcarResetEmAndamento() {
    _resetEmAndamento = true;
    if (typeof window !== "undefined") window.__RESET_FLAG__ = true;
    console.log("[Persistencia] 🛑 Reset marcado — saves serão ignorados");
}

export function resetEmAndamento() {
    if (_resetEmAndamento) return true;
    if (typeof window !== "undefined" && window.__RESET_FLAG__) return true;
    return false;
}

export function desmarcarResetEmAndamento() {
    _resetEmAndamento = false;
    if (typeof window !== "undefined") window.__RESET_FLAG__ = false;
}

// ─── Helpers seguros ──────────────────────────────────────────────────────────

function safeParse(raw, fallback = null) {
    if (raw == null || raw === "undefined" || raw === "null" || raw === "") return fallback;
    try {
        return JSON.parse(raw);
    } catch (e) {
        console.warn("[Persistencia] JSON.parse falhou para:", raw?.slice?.(0, 60), e.message);
        return fallback;
    }
}

function safeStringify(value) {
    if (value === undefined) return null;
    try {
        return JSON.stringify(value);
    } catch (e) {
        console.warn("[Persistencia] JSON.stringify falhou:", e.message);
        return null;
    }
}

function safeGet(key) {
    try {
        return localStorage.getItem(key);
    } catch (e) {
        console.warn("[Persistencia] localStorage.getItem falhou:", key, e.message);
        return null;
    }
}

function safeSet(key, value) {
    const str = safeStringify(value);
    if (str == null) {
        console.warn("[Persistencia] Ignorando save inválido para:", key);
        return false;
    }
    try {
        localStorage.setItem(key, str);
        return true;
    } catch (e) {
        console.warn("[Persistencia] localStorage.setItem falhou:", key, e.message);
        return false;
    }
}

function safeRemove(key) {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.warn("[Persistencia] localStorage.removeItem falhou:", key, e.message);
    }
}

// ─── API pública ──────────────────────────────────────────────────────────────

/**
 * Salva o estado completo do jogo.
 * 🛑 Se reset está em andamento, IGNORA e REMOVE as chaves novamente (defesa extra).
 */
export function salvarNoStorage(gameState, centralState, economyState, pipelinesState) {
  if (resetEmAndamento()) {
    console.log("[Persistencia] 🛑 reset ativo — save ignorado E chaves removidas");
    safeRemove(KEYS.economy);
    safeRemove(KEYS.pipelines);
    safeRemove(KEYS.game);
    return;
  }

  if (gameState && typeof gameState === 'object' && gameState.edificiosFinais) {
    safeSet(KEYS.game, gameState);
  } else if (gameState !== undefined) {
    console.warn("[Persistencia] gameState inválido, não salvo", gameState);
  }
  if (economyState !== undefined) safeSet(KEYS.economy, economyState);
  if (pipelinesState !== undefined) safeSet(KEYS.pipelines, pipelinesState);
}

export function carregarSalvo() {
    const economy   = safeParse(safeGet(KEYS.economy), null);
    const pipelines = safeParse(safeGet(KEYS.pipelines), null);

    const economyFinal = economy ?? estadoInicialEconomy;

    return {
        game: null,
        central: null,
        economy: economyFinal,
        pipelines: pipelines ?? null,
    };
}

export function temSaveExistente() {
    const raw = safeGet(KEYS.game);
    return raw != null && raw !== "undefined" && raw !== "null" && raw !== "";
}

/**
 * Limpa tudo. Roda DUAS vezes (imediato + 200ms) para matar saves atrasados.
 */
export function limparSalvo() {
    Object.values(KEYS).forEach(safeRemove);
    try { localStorage.removeItem('central-dados'); } catch(e) {}
    console.log("[Persistencia] Save limpo (1ª passada).");

    // 🛡️ Segunda limpeza após 200ms
    setTimeout(() => {
        Object.values(KEYS).forEach(safeRemove);
        try { localStorage.removeItem('central-dados'); } catch(e) {}
        console.log("[Persistencia] Save limpo (2ª passada de segurança).");
    }, 200);
}

export function limparPipelines() {
    safeRemove(KEYS.pipelines);
    console.log("[Persistencia] Pipelines limpos.");
}