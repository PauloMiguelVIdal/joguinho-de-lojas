//   function migrarCentralAntigo(central) {
//     // se já está no formato novo → não faz nada
//     if (central.edificiosFinais) return central;

//     // formato antigo detectado
//     if (Array.isArray(central.edificios)) {
//         console.log("[MIGRAÇÃO] Convertendo estrutura antiga → nova");

//         return {
//             ...central,
//             edificiosFinais: {
//                 agricultura: central.edificios,
//                 tecnologia: [],
//                 industria: [],
//                 comercio: [],
//                 imobiliario: [],
//                 energia: []
//             }
//         };
//     }

//     return central;
// }
  
  
  
  const estadoInicialEconomy={
    
    saldo: 1000000000000,
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
    agricultura: {
        licençaGlobal: {
            comprado: true,
        },
    },
    tecnologia: {
        licençaGlobal: {
            comprado: true,
        },
    },
    industria: {
        licençaGlobal: {
            comprado: true,
        },
    },
    comercio: {
        licençaGlobal: {
            comprado: true,
        },
    },
    imobiliario: {
        licençaGlobal: {
            comprado: true,
        },
    },
    energia: {
        licençaGlobal: {
            comprado: true,
        },
    },
    grafico: {
        licençaGlobal: {
            comprado: true,
        },
    },
    carteira: {
        licençaGlobal: {
            comprado: true,
        },
    },
    gerenciamento: {
        licençaGlobal: {
            comprado: true,
        },
    },
    ecossistema: {
        licençaGlobal: {
            comprado: true,
        },
    },
    mercado: {
        licençaGlobal: {
            comprado: true,
        },
    },
}

export const EDIFICIOS_FINAIS_DINAMICOS_INICIAL = {
    agricultura: {
        edificios: [
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
        ]
    },
    tecnologia: {
        edificios: [
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
        ]
    },
    industria: {
        edificios: [
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
        ]
    },
    comercio: {

        edificios: [
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
        ]
    },
    imobiliario: {
        edificios: [
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
        ]
    },
    energia: {
        edificios: [
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
        ]
    }
}

export const LICENCAS_STATUS_INICIAL = {
    agricultura: [
        { status: false }, // Licença Global De Agricultura
        { status: false }, // Licença De Base Agrícola
        { status: false }, // Licença De Outras Plantações
        { status: false }, // Licença De Fazendas De Animais
        { status: false }, // Licença De Madeira
        { status: false }, // Licença De Minérios Base
        { status: false }, // Licença De Comércios Agrícolas
    ],
    tecnologia: [
        { status: false }, // Licença Global De Tecnologia
        { status: false }, // Licença De Empreendimentos Tech
        { status: false }, // Licença De Plataformas Digitais
        { status: false }, // Licença Agro e Biotecnologia
        { status: false }, // Licença Eletrônica e Design
        { status: false }, // Licença De Fábricas Tecnológicas
        { status: false }, // Licença De Tecnologia Experimental
        { status: false }, // Licença De Engenharia Avançada
        { status: false }, // Licença De Pesquisa Em Robótica e IA
    ],
    industria: [
        { status: false }, // Licença Global De Indústria
        { status: false }, // Licença De Fábricas Simples
        { status: false }, // Licença De Armazenamento Indústrial
        { status: false }, // Licença De Fábrica textil
        { status: false }, // Licença De Papel E Celulose
        { status: false }, // Licença De Produtos Químicos
        { status: false }, // Licença De Base Metalúrgica
        { status: false }, // Licença De Metalúrgia Avançada
        { status: false }, // Licença Automotiva
        { status: false }, // Licença De Refinaria
        { status: false }, // Licença Microeletrônica
        { status: false }, // Licença De Eletrônica Avançada
        { status: false }, // Licença De Engenharia Mecânica Avançada
    ],
    comercio: [
        { status: false }, // Licença Global De Comércio
        { status: false }, // Licença De Comércio Local
        { status: false }, // Licença De Serviços E Saúde
        { status: false }, // Licença Global De Comércio (duplicada)
        { status: false }, // Licença De Varejo
        { status: false }, // Licença De Varejo Especializado
        { status: false }, // Licença De Comércio De Tecnologia
        { status: false }, // Licença De Logística E Transporte
        { status: false }, // Licença De Comércio Urbano
        { status: false }, // Licença De Shoppings
    ],
    imobiliario: [
        { status: false }, // Licença Global Imobiliária
        { status: false }, // Licença De Projetos e Design
        { status: false }, // Licença De Construção Imobiliária
        { status: false }, // Licença Comercial E Residencial
        { status: false }, // Licença De Grandes Infraestruturas
        { status: false }, // Licença De Mineração
        { status: false }, // Licença De Construções Energéticas
    ],
    energia: [
        { status: false }, // Licença Global De Energia
        { status: false }, // Licença De Fábricas Energéticas
        { status: false }, // Licença De Comércios Energéticos
        { status: false }, // Licença De Melhoria Energética
        { status: false }, // Licença De Energia Sustentável
        { status: false }, // Licença De Usinas
        { status: false }, // Licença De Usinas Nucleares
    ],
    grafico: [],
    carteira: [],
    gerenciamento: [],
    ecossistema: [],
    mercado: [],
};


const estadoInicial = {
    // ── UI / controle ────────────────────────────────────────────────────────
    inicioGame: { estadoModal: true, nomeEmpresa: "" },
    nomeEmpresa: "",
    setorAtivo: "agricultura",
    fimGame: false,
    dia: 1000,
    animarCicloDia: null,
    chanceNovoEvento: 0,
    economiaGlobal: "estável",
    botãoOfertas: "btnNormal",
    proximaEconomia: "",
    proximaOferta: "",
    ofertas: [],
    itensSorteados: [],

    // ── Modais ────────────────────────────────────────────────────────────────
    // ── Modais ────────────────────────────────────────────────────────────────
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

    // 👉 ADICIONE ESSES 3 (ESSENCIAL)
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

    // ── Evento ────────────────────────────────────────────────────────────────
    eventoAtual: {
        eventoAtivo: false, title: "", lojaSelecionada: "",
        situacaoSelecionada: "", porcentagemSelecionada: "",
        periodoSelecionado: "", diaInicial: "", diaFinal: "",
        departamento: "", julgamento: "",
    },

    // ── Financeiro ────────────────────────────────────────────────────────────
    faturamento: { faturamentoDiário: 0, faturamentoMensal: 0, arrayFatuDiário: [] },
    relatóriosFaturamento: {},
    imposto: { impostoFixoMensal: 0, impostoDiário: 0, impostoMensal: 0, impostoSobreFaturamentoDiário: 0 },
    valoresDespesas: { terrenos: 0, lojasP: 0, lojasM: 0, lojasG: 0, impostos: 0, funcionários: 0, despesasTotais: 0 },

    // ── Edifícios dinâmicos ───────────────────────────────────────────────────
    edificiosBase: EDIFICIOS_BASE_DINAMICOS,
    edificiosFinais:EDIFICIOS_FINAIS_DINAMICOS_INICIAL,

    licençasStatus: LICENCAS_STATUS_INICIAL,
    licençasGlobais: {
        agricultura: false,
        tecnologia: false,
        industria: false,
        comercio: false,
        imobiliario: false,
        energia: false,
    },
    // ── Economia por setor ────────────────────────────────────────────────────
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


// function mergeDeep(target, source) {
//     for (const key in source) {
//         if (
//             source[key] instanceof Object &&
//             key in target
//         ) {
//             Object.assign(source[key], mergeDeep(target[key], source[key]));
//         }
//     }
//     return { ...target, ...source };
// }
// ─── Helpers seguros ──────────────────────────────────────────────────────────

function safeParse(raw, fallback = null) {
    // Proteção contra null, undefined, "undefined", strings inválidas
    if (raw == null || raw === "undefined" || raw === "null" || raw === "") return fallback;
    try {
        return JSON.parse(raw);
    } catch (e) {
        console.warn("[Persistencia] JSON.parse falhou para:", raw?.slice?.(0, 60), e.message);
        return fallback;
    }
}

function safeStringify(value) {
    // Nunca salva undefined — usa null como fallback
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
 * Todos os parâmetros são opcionais — só salva o que for fornecido.
 */
export function salvarNoStorage(gameState, centralState, economyState, pipelinesState) {
  // Evita salvar um gameState corrompido (sem a estrutura esperada)
  if (gameState && typeof gameState === 'object' && gameState.edificiosFinais) {
    safeSet(KEYS.game, gameState);
  } else if (gameState !== undefined) {
    console.warn("[Persistencia] gameState inválido, não salvo", gameState);
  }
//   if (centralState !== undefined) safeSet(KEYS.central, centralState);
  if (economyState !== undefined) safeSet(KEYS.economy, economyState);
  if (pipelinesState !== undefined) safeSet(KEYS.pipelines, pipelinesState);
}

/**
 * Carrega o estado salvo.
 * Retorna null para cada campo que não existir ou estiver corrompido.
 */
export function carregarSalvo() {
    const economy   = safeParse(safeGet(KEYS.economy), null);
    const pipelines = safeParse(safeGet(KEYS.pipelines), null);

    // Se não houver save, usa o estado inicial da economy (opcional)
    const economyFinal = economy ?? estadoInicialEconomy;

    return {
        game: null,        // não usado mais
        central: null,     // não usado (Zustand gerencia via 'central-dados')
        economy: economyFinal,
        pipelines: pipelines ?? null,
    };
}

/**
 * Verifica se existe um save.
 */
export function temSaveExistente() {
    const raw = safeGet(KEYS.game);
    return raw != null && raw !== "undefined" && raw !== "null" && raw !== "";
}

/**
 * Limpa todos os dados salvos.
 * PRESERVADO — usado em interface.jsx linha 11.
 */
export function limparSalvo() {
    Object.values(KEYS).forEach(safeRemove);
    // ✅ Remove também a chave antiga do persist Zustand
    // try { localStorage.removeItem('central-dados') } catch(e) {}
    console.log("[Persistencia] Save limpo.");
}
/**
 * Limpa apenas os pipelines (útil para reset de automações sem perder o jogo).
 */
export function limparPipelines() {
    safeRemove(KEYS.pipelines);
    console.log("[Persistencia] Pipelines limpos.");
}