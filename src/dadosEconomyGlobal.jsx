import React, { createContext, useContext, useState, useEffect } from "react";
import { salvarNoStorage, carregarSalvo, resetEmAndamento } from "./components/usePersistencia";
import { produce } from "immer";

const DadosEconomyGlobalContext = createContext();

const SETORES_ARR = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

const estadoInicial = {
  saldo: 1000000,
  fimGame: false,
  economiaGlobal: "estável",
  valorImpostoAnual: 0,
  patrimonio: 0,
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
    classificacaoPorteEmpresa: "Micro Empresa",
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
      descricao: "Uma pequena operação para iniciar seu negócio com recursos limitados.",
      textoLiberacao: "Você poderá ter até 3 tipos de edifícios diferentes, 2 unidades por tipo, totalizando 5 edifícios.",
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
      textoLiberacao: "Agora você pode ter até 5 tipos de edifícios diferentes, 5 unidades por tipo, totalizando 15 edifícios.",
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
      descricao: "Expansão para atuação em toda a região, com maior diversidade de edificações.",
      textoLiberacao: "Você poderá ter até 7 tipos de edifícios, 7 unidades por tipo, totalizando 25 edifícios.",
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
      descricao: "Um porte sólido para consolidar presença local e maior faturamento.",
      textoLiberacao: "Agora pode possuir até 9 tipos de edifícios, 10 unidades por tipo, totalizando 40 edifícios.",
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
      descricao: "Capacidade para expandir em todo o estado, com grande diversidade de negócios.",
      textoLiberacao: "Você terá até 12 tipos de edifícios, 12 unidades por tipo, totalizando 60 edifícios.",
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
      descricao: "Empresa com alcance nacional, gerando grande volume de operações.",
      textoLiberacao: "Até 15 tipos de edifícios, 15 unidades por tipo, totalizando 90 edifícios.",
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
      descricao: "Corporação de grande porte, com atuação em múltiplos setores e alto faturamento.",
      textoLiberacao: "Você poderá ter até 18 tipos de edifícios, 20 unidades por tipo, totalizando 130 edifícios.",
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
      descricao: "Grupo com alcance estratégico nacional e diversificação de negócios.",
      textoLiberacao: "Agora você pode possuir até 22 tipos de edifícios, 25 unidades por tipo, totalizando 180 edifícios.",
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
      descricao: "Empresa de alcance internacional, com domínio de múltiplos mercados.",
      textoLiberacao: "Você poderá ter até 26 tipos de edifícios, 35 unidades por tipo, totalizando 250 edifícios.",
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
      descricao: "Holding máxima, sem limites de operação, capaz de dominar todo o mercado.",
      textoLiberacao: "Não há limites de tipos ou quantidade de edifícios. Você tem liberdade total para expandir sua holding.",
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
      ultimoImpostoMensal: 0,
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
      ultimoImpostoMensal: 0,
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
      ultimoImpostoMensal: 0,
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
      ultimoImpostoMensal: 0,
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
      ultimoImpostoMensal: 0,
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
      ultimoImpostoMensal: 0,
    },
  },
  carteira: {
    carteiraAtual: [],
  },
  patrimonioGlobal: 0,
};

function sanitizarEconomiaSalva(salvo) {
  const base = salvo && typeof salvo === "object" ? salvo : {};
  const sanitizado = { ...estadoInicial, ...base };

  SETORES_ARR.forEach((setor) => {
    const ecoBase = estadoInicial[setor].economiaSetor;
    const setorSalvo = base[setor] ?? {};
    const ecoSalvo = setorSalvo.economiaSetor ?? {};

    sanitizado[setor] = {
      ...estadoInicial[setor],
      ...setorSalvo,
      economiaSetor: {
        ...ecoBase,
        ...ecoSalvo,
        patrimonio: Number.isFinite(ecoSalvo.patrimonio) ? ecoSalvo.patrimonio : 0,
        percImpostoAnualAtual: Number.isFinite(ecoSalvo.percImpostoAnualAtual)
          ? ecoSalvo.percImpostoAnualAtual
          : ecoBase.percImpostoAnualAtual,
        valorImpostoAnualAtual: Number.isFinite(ecoSalvo.valorImpostoAnualAtual)
          ? ecoSalvo.valorImpostoAnualAtual
          : 0,
        ultimoImpostoMensal: Number.isFinite(ecoSalvo.ultimoImpostoMensal)
          ? ecoSalvo.ultimoImpostoMensal
          : 0,
        estadoAtual: ecoSalvo.estadoAtual || "estável",
        ArrayFatu: Array.isArray(ecoSalvo.ArrayFatu) ? ecoSalvo.ArrayFatu : [],
        ArrayFatuHistory: Array.isArray(ecoSalvo.ArrayFatuHistory)
          ? ecoSalvo.ArrayFatuHistory
          : [],
        arrValorImpostoAnualPorMes: Array.isArray(ecoSalvo.arrValorImpostoAnualPorMes)
          ? ecoSalvo.arrValorImpostoAnualPorMes
          : [],
        RelatórioMensalImpostoAnual:
          ecoSalvo.RelatórioMensalImpostoAnual &&
          typeof ecoSalvo.RelatórioMensalImpostoAnual === "object"
            ? ecoSalvo.RelatórioMensalImpostoAnual
            : {},
      },
    };
  });

  sanitizado.patrimonioGlobal = Number.isFinite(base.patrimonioGlobal) ? base.patrimonioGlobal : 0;
  sanitizado.valorImpostoAnual = Number.isFinite(base.valorImpostoAnual) ? base.valorImpostoAnual : 0;
  sanitizado.patrimonio = Number.isFinite(base.patrimonio) ? base.patrimonio : 0;
  sanitizado.saldo = Number.isFinite(base.saldo) ? base.saldo : 1000000;

  if (!sanitizado.carteira || typeof sanitizado.carteira !== "object") {
    sanitizado.carteira = { carteiraAtual: [] };
  } else if (!Array.isArray(sanitizado.carteira.carteiraAtual)) {
    sanitizado.carteira = { ...sanitizado.carteira, carteiraAtual: [] };
  }

  if (sanitizado.centralEdificios) {
    const ce = { ...sanitizado.centralEdificios };
    delete ce.QuantidadeEdifíciosAtual;
    delete ce.QuantidadeDiversosEdificiosAtual;
    sanitizado.centralEdificios = ce;
  }

  return sanitizado;
}

const DadosEconomyGlobalProvider = ({ children }) => {
  const salvo = carregarSalvo();

  const [economiaSetores, setEconomiaSetores] = useState(() =>
    sanitizarEconomiaSalva(salvo?.economy)
  );

  useEffect(() => {
    window.__economiaSetores = economiaSetores;
    window.__setEconomiaSetores = setEconomiaSetores;
  }, [economiaSetores]);

  const atualizarDadosEconomy = (caminho, novoValor) => {
    setEconomiaSetores((prev) =>
      produce(prev, (draft) => {
        let ref = draft;
        for (let i = 0; i < caminho.length - 1; i++) {
          const chave = caminho[i];
          if (!(chave in ref)) {
            console.error(`Caminho inválido em atualizarDadosEconomy: ${chave} no passo ${i}`);
            return;
          }
          ref = ref[chave];
        }
        ref[caminho[caminho.length - 1]] = novoValor;
      })
    );
  };

  const atualizarEco = (chave, novoValor) => {
    setEconomiaSetores((prevState) => ({ ...prevState, [chave]: novoValor }));
  };

  const atualizarEcoCallback = (chave, novoValor) => {
    setEconomiaSetores((prevState) => ({
      ...prevState,
      [chave]: typeof novoValor === "function" ? novoValor(prevState[chave]) : novoValor,
    }));
  };

  const atualizarEcoProf = (caminho, novoValor) => {
    setEconomiaSetores((prev) =>
      produce(prev, (draft) => {
        let ref = draft;
        for (let i = 0; i < caminho.length - 1; i++) {
          if (ref === undefined || ref === null) return;
          ref = ref[caminho[i]];
          if (ref === undefined || ref === null) return;
        }
        const ultimaChave = caminho[caminho.length - 1];
        ref[ultimaChave] = novoValor;
      })
    );
  };

  const atualizarEcoProfSeguro = (caminho, valorOuFunc) => {
    if (!Array.isArray(caminho) || caminho.length === 0) {
      console.warn("❌ Caminho inválido:", caminho);
      return;
    }
    setEconomiaSetores((prev) =>
      produce(prev, (draft) => {
        let ref = draft;
        for (let i = 0; i < caminho.length - 1; i++) {
          const chave = caminho[i];
          if (chave === undefined || chave === null) {
            console.warn("❌ Chave inválida:", caminho);
            return;
          }
          if (!(chave in ref)) ref[chave] = {};
          ref = ref[chave];
        }
        const ultimaChave = caminho[caminho.length - 1];
        ref[ultimaChave] =
          typeof valorOuFunc === "function"
            ? valorOuFunc(ref[ultimaChave])
            : valorOuFunc;
      })
    );
  };

  const atualizarEcoSafely = (chave, patch) => {
    setEconomiaSetores((prev) =>
      produce(prev, (draft) => {
        const prevItem = draft?.[chave] || {};
        const prevEco = prevItem?.economiaSetor || {};
        const patchObj = typeof patch === "function" ? patch(prevEco, prevItem, draft) : patch || {};
        if (!draft[chave]) draft[chave] = {};
        draft[chave].economiaSetor = { ...prevEco, ...patchObj };
      })
    );
  };

  const atualizarVenda = (chave, valor) => {
    setEconomiaSetores((prev) => ({
      ...prev,
      [chave]: typeof valor === "function" ? valor(prev[chave]) : valor,
    }));
  };

  const verificarLimites = (edificio, setor, carteiraParam) => {
    const carteiraRaw = Array.isArray(carteiraParam)
      ? carteiraParam
      : economiaSetores?.carteira?.carteiraAtual ?? [];

    const carteira = SETORES_ARR.map((_, i) => {
      const v = carteiraRaw[i];
      if (Array.isArray(v)) return v;
      if (v === undefined || v === null) return [];
      if (typeof v === "object") return [v];
      return [];
    });

    const ce = economiaSetores?.centralEdificios ?? {};
    const quantidadeUnicoMax = Number(ce.quantidadeUnicoMax ?? 999);
    const quantidadeSetoresMax = Number(ce.quantidadeSetoresMax ?? 999);
    const quantidadeDiversosEdificiosMax = Number(ce.quantidadeDiversosEdificiosMax ?? 999);
    const quantidadeEdificiosMax = Number(ce.quantidadeEdificiosMax ?? 999);

    const setorIndex = SETORES_ARR.indexOf(setor);
    if (setorIndex === -1) return `Setor inválido: ${setor}`;

    const quantidadeTotalPorNome = new Map();
    carteira.forEach((arr) => {
      if (!Array.isArray(arr)) return;
      arr.forEach((item) => {
        if (!item || !item.nome) return;
        const atual = quantidadeTotalPorNome.get(item.nome) || 0;
        quantidadeTotalPorNome.set(item.nome, atual + Number(item.quantidade ?? 0));
      });
    });

    const quantidadeAtualEdif = quantidadeTotalPorNome.get(edificio?.nome) || 0;
    if (quantidadeAtualEdif + 1 > quantidadeUnicoMax) {
      return `Você não pode ter mais que ${quantidadeUnicoMax} unidades do mesmo edifício.`;
    }

    const setoresAtivos = carteira.reduce(
      (acc, arr) => acc + (Array.isArray(arr) && arr.length > 0 ? 1 : 0),
      0
    );
    const setorJaAtivo = Array.isArray(carteira[setorIndex]) && carteira[setorIndex].length > 0;
    const novosSetoresAtivos = setorJaAtivo ? setoresAtivos : setoresAtivos + 1;
    if (novosSetoresAtivos > quantidadeSetoresMax) {
      return `Você não pode ter mais que ${quantidadeSetoresMax} setores ativos.`;
    }

    const jaExisteTipo = quantidadeTotalPorNome.has(edificio?.nome);
    const novosTipos = jaExisteTipo ? quantidadeTotalPorNome.size : quantidadeTotalPorNome.size + 1;
    if (novosTipos > quantidadeDiversosEdificiosMax) {
      return `Você não pode ter mais que ${quantidadeDiversosEdificiosMax} tipos diferentes de edifícios.`;
    }

    let totalEdificiosAtuais = 0;
    quantidadeTotalPorNome.forEach((q) => (totalEdificiosAtuais += q));
    const novosTotalEdificios = totalEdificiosAtuais + 1;
    if (novosTotalEdificios > quantidadeEdificiosMax) {
      return `Você não pode ter mais que ${quantidadeEdificiosMax} edifícios no total.`;
    }

    return true;
  };

  const liberaProximoNivel = (index) => {
    setEconomiaSetores((prev) => {
      const novoArray = prev.porteEmpresa.map((nivel, i) =>
        i === index ? { ...nivel, status: true } : nivel
      );
      const nivelAtual = novoArray[index];

      return {
        ...prev,
        centralEdificios: {
          ...prev.centralEdificios,
          classificacaoPorteEmpresa: nivelAtual.nome ?? prev.centralEdificios.classificacaoPorteEmpresa,
          quantidadeUnicoMax: nivelAtual.edificiosUnicosMax ?? prev.centralEdificios.quantidadeUnicoMax,
          quantidadeSetoresMax: nivelAtual.qtdMaxSetores ?? prev.centralEdificios.quantidadeSetoresMax,
          quantidadeDiversosEdificiosMax: nivelAtual.qtdMaxDiversificar ?? prev.centralEdificios.quantidadeDiversosEdificiosMax,
          quantidadeEdificiosMax: nivelAtual.totalMaxEdificios ?? prev.centralEdificios.quantidadeEdificiosMax,
        },
        porteEmpresa: novoArray,
      };
    });
  };

  // ✅ Debounce — respeita flag
  useEffect(() => {
    const t = setTimeout(() => {
      if (resetEmAndamento()) {
        console.log("[Provider debounce] 🛑 reset ativo, skip save");
        return;
      }
      try {
        salvarNoStorage(undefined, undefined, economiaSetores);
      } catch (e) {
        console.error("[Provider] salvarNoStorage falhou:", e);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [economiaSetores]);

  // ✅ beforeunload — respeita flag (módulo + window)
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (resetEmAndamento()) {
        console.log("[beforeunload] 🛑 reset ativo, NÃO salvando");
        return;
      }
      try {
        salvarNoStorage(undefined, undefined, economiaSetores);
      } catch {}
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [economiaSetores]);

  const salvarContrato = (novoContrato) => {
    setEconomiaSetores((prev) => ({
      ...prev,
      contratosBancos: [...(prev.contratosBancos || []), novoContrato],
    }));
  };

  return (
    <DadosEconomyGlobalContext.Provider
      value={{
        economiaSetores,
        atualizarEco,
        setEconomiaSetores,
        atualizarDadosEconomy,
        atualizarEcoProf,
        atualizarEcoProfSeguro,
        verificarLimites,
        liberaProximoNivel,
        salvarContrato,
        atualizarEcoCallback,
        atualizarEcoSafely,
        atualizarVenda,
      }}
    >
      {children}
    </DadosEconomyGlobalContext.Provider>
  );
};

export { DadosEconomyGlobalProvider, DadosEconomyGlobalContext };