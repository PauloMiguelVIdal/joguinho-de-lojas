import React, { createContext, useContext, useState } from "react";

// Criação do contexto
const DadosEconomyGlobalContext = createContext();

// Provedor do contexto
const DadosEconomyGlobalProvider = ({ children }) => {
  const [economiaSetores, setEconomiaSetores] = useState({
    saldo: 10000000000,
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
        patrimonioHistorico: [],
        patrimonioInventarioHistorico: [],
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
        patrimonioHistorico: [],
        patrimonioInventarioHistorico: [],
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
        patrimonioHistorico: [],
        patrimonioInventarioHistorico: [],
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
        patrimonioHistorico: [],
        patrimonioInventarioHistorico: [],
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
        patrimonioHistorico: [],
        patrimonioInventarioHistorico: [],
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
        patrimonioHistorico: [],
        patrimonioInventarioHistorico: [],
        arrValorImpostoAnualPorMes: [],
        valorImpostoAnualAtual: 0,
        RelatórioMensalImpostoAnual: {},
      },
    },
    carteira: {
      carteiraAtual: [],
      // economiaSetor: {
      //     estadoAtual: "estável",
      //     percImpostoAnualAtual: 12,
      //     ArrayFatu: [],
      //     arrValorImpostoAnualPorMes: [],
      //     valorImpostoAnualAtual: 0,
      //     RelatórioMensalImpostoAnual: {}
      //   }
    },
    patrimonioGlobal: 0,
  });

  const atualizarDadosEconomy = (caminho, novoValor) => {
    setEconomiaSetores((prevState) => {
      const novosDados = JSON.parse(JSON.stringify(prevState)); // cópia profunda
      let ref = novosDados;

      for (let i = 0; i < caminho.length - 1; i++) {
        if (!ref[caminho[i]]) {
          console.error(
            `Caminho inválido em atualizarDadosProf2: ${caminho[i]} está undefined no passo ${i}`
          );
          return prevState;
        }
        ref = ref[caminho[i]];
      }

      ref[caminho[caminho.length - 1]] = novoValor;

      return novosDados;
    });
  };

  const atualizarEco = (chave, novoValor) => {
    setEconomiaSetores((prevState) => ({
      ...prevState,
      [chave]: novoValor,
    }));
  };




  const atualizarEcoDraft = (chave, valorOuFuncao) => {
    setEconomiaSetores((prev) => ({
      ...prev,
      [chave]:
        typeof valorOuFuncao === "function"
          ? valorOuFuncao(prev[chave])
          : valorOuFuncao,
    }));
  };

  // const atualizarEcoDraft = (chave, valorOuFuncao) => {
  //   setEconomiaSetores((prev) => {
  //     const novoEstado = {
  //       ...prev,
  //       [chave]:
  //         typeof valorOuFuncao === "function"
  //           ? valorOuFuncao(prev[chave])
  //           : valorOuFuncao,
  //     };
  //     console.log(`🔄 Atualizando ${chave}:`, {
  //       anterior: prev[chave],
  //       novo: novoEstado[chave]
  //     });
  //     return novoEstado;
  //   });
  // };



  const atualizarEcoCallback = (chave, novoValor) => {
    setEconomiaSetores((prevState) => ({
      ...prevState,
      [chave]:
        typeof novoValor === "function"
          ? novoValor(prevState[chave])
          : novoValor,
    }));
  };

  const atualizarEcoProf = (caminho, novoValor) => {
    setEconomiaSetores((prevState) => {
      const novosDados = JSON.parse(JSON.stringify(prevState)); // cópia profunda
      let ref = novosDados;

      for (let i = 0; i < caminho.length - 1; i++) {
        // console.log(`Ref antes do passo ${i}:`, ref);
        // console.log(`Acessando chave:`, caminho[i]);

        if (ref === undefined || ref === null) {
          // console.warn(`❌ ERRO: ref é undefined na etapa ${i}, chave: ${caminho[i]}`);
          // console.warn(`CAMINHO COMPLETO:`, caminho);
          return prevState; // não altera nada
        }

        ref = ref[caminho[i]];
      }

      const ultimaChave = caminho[caminho.length - 1];
      // console.log(`🔧 Atualizando chave final '${ultimaChave}' com valor:`, novoValor);
      ref[ultimaChave] = novoValor;

      return novosDados;
    });
  };

  const atualizarEcoProfSeguro = (caminho, valorOuFunc) => {
    if (!Array.isArray(caminho) || caminho.length === 0) {
      console.warn(
        "❌ Caminho inválido passado para atualizarEcoProfSeguro:",
        caminho
      );
      return;
    }

    atualizarEcoProf((prevState) => {
      const novosDados = JSON.parse(JSON.stringify(prevState));
      let ref = novosDados;

      for (let i = 0; i < caminho.length - 1; i++) {
        const chave = caminho[i];
        if (chave === undefined || chave === null) {
          console.warn(
            "❌ Chave indefinida no caminho em atualizarEcoProfSeguro:",
            caminho,
            "passo",
            i
          );
          return prevState;
        }
        if (!ref[chave]) ref[chave] = {}; // cria objeto se não existir
        ref = ref[chave];
      }

      const ultimaChave = caminho[caminho.length - 1];
      if (ultimaChave === undefined || ultimaChave === null) {
        console.warn(
          "❌ Última chave indefinida em atualizarEcoProfSeguro:",
          caminho
        );
        return prevState;
      }

      if (typeof valorOuFunc === "function") {
        ref[ultimaChave] = valorOuFunc(ref[ultimaChave] || {});
      } else {
        ref[ultimaChave] = valorOuFunc;
      }

      // console.log("🔧 Atualização segura:", caminho, "->", ref[ultimaChave]);
      return novosDados;
    });
  };

  // dentro do provider do contexto
  // dentro do DadosEconomyGlobalProvider
  const verificarLimites = (edificio, setor, carteiraParam) => {
    // console.log("=== verificarLimites START ===");
    // console.log(
    //   "edificio (nome, quantidade):",
    //   edificio?.nome,
    //   edificio?.quantidade
    // );
    // console.log("setor pedido:", setor);

    const setoresArr = [
      "agricultura",
      "tecnologia",
      "comercio",
      "industria",
      "imobiliario",
      "energia",
    ];

    // pega carteira passada ou do estado
    const carteiraRaw = Array.isArray(carteiraParam)
      ? carteiraParam
      : economiaSetores?.carteira?.carteiraAtual ?? [];
    // console.log("carteira raw (entrada):", carteiraRaw);

    // Garantir que carteira tenha uma posição para cada setor (normaliza)
    const carteira = setoresArr.map((_, i) => {
      const v = carteiraRaw[i];
      if (Array.isArray(v)) return v;
      if (v === undefined || v === null) return [];
      if (typeof v === "object") return [v]; // se vier objeto único
      return [];
    });
    // console.log("carteira normalizada:", carteira);

    // leitura tolerante dos limites no centralEdificios
    const ce = economiaSetores?.centralEdificios ?? {};
    const quantidadeUnicoMax = Number(ce.quantidadeUnicoMax ?? 999);
    const quantidadeSetoresMax = Number(ce.quantidadeSetoresMax ?? 999);
    const quantidadeDiversosEdificiosMax = Number(
      ce.quantidadeDiversosEdificiosMax ?? 999
    );
    const quantidadeEdificiosMax = Number(ce.quantidadeEdificiosMax ?? 999);

    // console.log("limites lidos:", {
    //   quantidadeUnicoMax,
    //   quantidadeSetoresMax,
    //   quantidadeDiversosEdificiosMax,
    //   quantidadeEdificiosMax,
    // });

    // índice do setor
    const setorIndex = setoresArr.indexOf(setor);
    if (setorIndex === -1) {
      // console.warn("setor inválido passado para verificador:", setor);
      return `Setor inválido: ${setor}`;
    }

    // 1) Limite unidades do mesmo edifício
    const quantidadeAtualEdif = Number(edificio?.quantidade ?? 0);
    // console.log(
    //   "quantidadeAtualEdif:",
    //   quantidadeAtualEdif,
    //   "-> max:",
    //   quantidadeUnicoMax
    // );
    if (quantidadeAtualEdif + 1 > quantidadeUnicoMax) {
      // console.log("-> falha: ultrapassa limite único");
      return `Você não pode ter mais que ${quantidadeUnicoMax} unidades do mesmo edifício.`;
    }

    // 2) setores ativos
    const setoresAtivos = carteira.reduce(
      (acc, arr) => acc + (Array.isArray(arr) && arr.length > 0 ? 1 : 0),
      0
    );
    const setorJaAtivo =
      Array.isArray(carteira[setorIndex]) && carteira[setorIndex].length > 0;
    const novosSetoresAtivos = setorJaAtivo ? setoresAtivos : setoresAtivos + 1;
    // console.log(
    //   "setoresAtivos:",
    //   setoresAtivos,
    //   "setorJaAtivo:",
    //   setorJaAtivo,
    //   "novosSetoresAtivos:",
    //   novosSetoresAtivos,
    //   "max:",
    //   quantidadeSetoresMax
    // );
    if (novosSetoresAtivos > quantidadeSetoresMax) {
      // console.log("-> falha: ultrapassa limite de setores ativos");
      return `Você não pode ter mais que ${quantidadeSetoresMax} setores ativos.`;
    }

    // 3) diversidade: tipos diferentes de edifícios (contagem por nome único)
    const nomesSet = new Set();
    carteira.forEach((arr) => {
      if (!Array.isArray(arr)) return;
      arr.forEach((item) => {
        if (!item) return;
        if (typeof item === "string") nomesSet.add(item);
        else if (typeof item === "object" && item.nome)
          nomesSet.add(String(item.nome));
      });
    });

    // console.log("nomes únicos atuais na carteira:", Array.from(nomesSet));
    const jaExisteTipo = nomesSet.has(String(edificio?.nome));
    const novosTipos = jaExisteTipo ? nomesSet.size : nomesSet.size + 1;

    // atualiza centralEdificios
    if (economiaSetores?.centralEdificios) {
      economiaSetores.centralEdificios.quantidadeDiversosEdificiosAtual =
        nomesSet.size;
    }

    // console.log(
    //   "jaExisteTipo:",
    //   jaExisteTipo,
    //   "novosTipos:",
    //   novosTipos,
    //   "max:",
    //   quantidadeDiversosEdificiosMax
    // );
    if (novosTipos > quantidadeDiversosEdificiosMax) {
      // console.log("-> falha: ultrapassa limite de diversidade");
      return `Você não pode ter mais que ${quantidadeDiversosEdificiosMax} tipos diferentes de edifícios.`;
    }

    // 4) limite total de edifícios (soma de todas as quantidades)
    const totalEdificiosAtuais = carteira.reduce((sum, arr) => {
      if (!Array.isArray(arr)) return sum;
      return sum + arr.reduce((s, e) => s + Number(e?.quantidade ?? 0), 0);
    }, 0);
    const novosTotalEdificios = totalEdificiosAtuais + 1; // compra adiciona 1 unidade

    // atualiza centralEdificios
    if (economiaSetores?.centralEdificios) {
      economiaSetores.centralEdificios.quantidadeEdificiosAtual =
        totalEdificiosAtuais;
    }

    // console.log(
    //   "totalEdificiosAtuais:",
    //   totalEdificiosAtuais,
    //   "novosTotalEdificios:",
    //   novosTotalEdificios,
    //   "max:",
    //   quantidadeEdificiosMax
    // );
    if (novosTotalEdificios > quantidadeEdificiosMax) {
      // console.log("-> falha: ultrapassa limite total de edifícios");
      return `Você não pode ter mais que ${quantidadeEdificiosMax} edifícios no total.`;
    }

    // console.log("=== verificarLimites OK ===");
    return true;
  };

  // Função para liberar o próximo nível
  const liberaProximoNivel = () => {
    setEconomiaSetores((prev) => {
      const novoArray = prev.porteEmpresa.map((nivel, i) =>
        i === index ? { ...nivel, status: true } : nivel
      );

      const nivelAtual = novoArray[index];

      return {
        ...prev,
        centralEdificios: {
          ...prev.centralEdificios,
          classificacaoPorteEmpresa:
            nivelAtual.nome ?? prev.centralEdificios.classificacaoPorteEmpresa,
          quantidadeUnicoMax:
            prev.centralEdificios.quantidadeUnicoMax +
            (nivelAtual.edificiosUnicosMax ?? 0),
          quantidadeSetoresMax:
            prev.centralEdificios.quantidadeSetoresMax +
            (nivelAtual.qtdMaxSetores ?? 0),
          quantidadeDiversosEdificiosMax:
            prev.centralEdificios.quantidadeDiversosEdificiosMax +
            (nivelAtual.qtdMaxDiversificar ?? 0),
          quantidadeEdificiosMax:
            prev.centralEdificios.quantidadeEdificiosMax +
            (nivelAtual.totalMaxEdificios ?? 0),
        },
        porteEmpresa: novoArray,
      };
    });
  };

  const atualizarEcoSafely = (chave, patch) => {
    setEconomiaSetores((prev) => {
      const prevItem = prev?.[chave] || {};
      const prevEco = prevItem?.economiaSetor || {};

      // determina o patch real
      const patchObj =
        typeof patch === "function" ? patch(prevEco, prevItem, prev) : patch || {};

      // ✅ CORREÇÃO: Merge profundo do economiaSetor
      const novoEconomiaSetor = {
        ...prevEco,
        ...patchObj
      };

      return {
        ...prev,
        [chave]: {
          ...prevItem,
          economiaSetor: novoEconomiaSetor
        },
      };
    });
  };
  const salvarContrato = (novoContrato) => {
    setContratos((prev) => [...prev, novoContrato]);
  };

  return (
    <DadosEconomyGlobalContext.Provider
      value={{
        economiaSetores,
        atualizarEco,
        atualizarEcoDraft,
        setEconomiaSetores,
        atualizarDadosEconomy,
        atualizarEcoProf,
        atualizarEcoProfSeguro,

        verificarLimites,
        liberaProximoNivel,
        salvarContrato,
        atualizarEcoCallback,
        atualizarEcoSafely
      }}
    >
      {children}
    </DadosEconomyGlobalContext.Provider>
  );
};

// Hook para usar o contexto
export { DadosEconomyGlobalProvider, DadosEconomyGlobalContext };
