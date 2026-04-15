const edifíciosBaseEstáticos = {
    terrenos: {

        quantidadeNecTerreno: 0,

    },
    lojasP: {
        quantidadeNecTerreno: 1,
    },
    lojasM: {
        quantidadeNecTerreno: 2,
    },
    lojasG: {
        quantidadeNecTerreno: 3,
    },
}

const edifíciosBaseDinamicos = {
    terrenos: {
        achievements: {
            5: false,
            10: false,
            20: false,
            50: false,
            100: false,
            200: false,
            500: false,
            1000: false,
        },
        arrayFatu: [],
        somaArrayFatu: "",
        quantidade: 0,
        preçoConstrução: 40000,
        faturamentoUnitário: 130,
        faturamentoUnitárioPadrão: 130,
        faturamentoTotal: 0,
        faturamentoMensal: 0,
        impostoFixo: 1500,
        valorImpostoFixoTotal: 0,
        impostoSobreFaturamento: 0.02,
        valorImpostoSobreFaturamento: 0,
        valorImpostoMensal: 0,
    },
    lojasP: {
        achievements: {
            5: false,
            10: false,
            20: false,
            50: false,
            100: false,
            200: false,
            500: false,
            1000: false,
        },
        arrayFatu: [],
        somaArrayFatu: 0,
        quantidade: 0,
        preçoConstrução: 50000,
        faturamentoUnitário: 850,
        faturamentoUnitárioPadrão: 850,
        faturamentoTotal: 0,
        faturamentoMensal: 0,
        despesas: 0,
        impostoFixo: 6000,
        valorImpostoFixoTotal: 0,
        impostoSobreFaturamento: 0.05,
        valorImpostoSobreFaturamento: 0,
    },
    lojasM: {
        achievements: {
            5: false,
            10: false,
            20: false,
            50: false,
            100: false,
            200: false,
            500: false,
            1000: false,
        },
        arrayFatu: [],
        somaArrayFatu: "",
        quantidade: 0,
        preçoConstrução: 100000,
        faturamentoUnitário: 2000,
        faturamentoUnitárioPadrão: 2000,
        faturamentoTotal: 0,
        faturamentoMensal: 0,
        despesas: 0,
        impostoFixo: 10000,
        valorImpostoFixoTotal: 0,
        impostoSobreFaturamento: 0.07,
        valorImpostoSobreFaturamento: 0,
    },
    lojasG: {
        achievements: {
            5: false,
            10: false,
            20: false,
            50: false,
            100: false,
            200: false,
            500: false,
            1000: false,
        },
        arrayFatu: [],
        somaArrayFatu: "",
        quantidade: 0,
        preçoConstrução: 240000,
        faturamentoUnitário: 5000,
        faturamentoUnitárioPadrão: 5000,
        faturamentoTotal: 0,
        faturamentoMensal: 0,
        despesas: 0,
        impostoFixo: 15000,
        valorImpostoFixoTotal: 0,
        impostoSobreFaturamento: 0.1,
        valorImpostoSobreFaturamento: 0,
    },
}

const edifíciosBaseEstáticosPOS = {
    terrenos: {
        arrayFatu: [],
        somaArrayFatu: 0,
        quantidadeNecTerreno: 0,
        faturamentoUnitário: 0,
        faturamentoUnitárioPadrão: 0,
        faturamentoTotal: 0,
        faturamentoMensal: 0,
        impostoFixo: 0,
        valorImpostoFixoTotal: 0,
        impostoSobreFaturamento: 0,
        valorImpostoSobreFaturamento: 0,
        valorImpostoMensal: 0,
    },
    lojasP: {
        arrayFatu: [],
        somaArrayFatu: 0,
        quantidadeNecTerreno: 1,
        faturamentoUnitário: 0,
        faturamentoUnitárioPadrão: 0,
        faturamentoTotal: 0,
        faturamentoMensal: 0,
        despesas: 0,
        impostoFixo: 0,
        valorImpostoFixoTotal: 0,
        impostoSobreFaturamento: 0,
        valorImpostoSobreFaturamento: 0,
    },
    lojasM: {
        arrayFatu: [],
        somaArrayFatu: 0,
        quantidadeNecTerreno: 2,
        faturamentoUnitário: 0,
        faturamentoUnitárioPadrão: 0,
        faturamentoTotal: 0,
        faturamentoMensal: 0,
        despesas: 0,
        impostoFixo: 0,
        valorImpostoFixoTotal: 0,
        impostoSobreFaturamento: 0,
        valorImpostoSobreFaturamento: 0,
    },
    lojasG: {
        arrayFatu: [],
        somaArrayFatu: 0,
        quantidadeNecTerreno: 3,
        faturamentoUnitário: 0,
        faturamentoUnitárioPadrão: 0,
        faturamentoTotal: 0,
        faturamentoMensal: 0,
        despesas: 0,
        impostoFixo: 0,
        valorImpostoFixoTotal: 0,
        impostoSobreFaturamento: 0,
        valorImpostoSobreFaturamento: 0,
    },
}

const edifíciosBaseDinamicosPOS = {
    terrenos: {
        quantidade: 0,
        preçoConstrução: 40000,
    },
    lojasP: {
        quantidade: 0,
        preçoConstrução: 50000,
    },
    lojasM: {
        quantidade: 0,
        preçoConstrução: 100000,
    },
    lojasG: {
        quantidade: 0,
        preçoConstrução: 240000,
    },
}

const edifíciosFinaisDinamicos = 
     [
        {
          licençaLiberado: {
            liberado: false,
          },
          quantidade: 0,
        },
    ]


const edifíciosFinaisEstáticos = {agricultura:{edifícios:[{
          nome: "Plantação De Grãos",
          nomeEditável: "Plantação De Grãos",
          desc: "Base da produção agrícola. Dá suporte às fazendas e à alimentação.",
          licençaLiberado: {
            licença: "Licença Global De Agricultura",
          },
          custoConstrucao: 40000,
          finanças: {
            faturamentoUnitário: 1000,
            impostoFixo: 50000,
            impostoSobreFatu: 0.07,
            rent: 32,
          },
          lojasNecessarias: {
            terrenos: 2,
            lojasP: 0,
            lojasM: 0,
            lojasG: 0,
          },
          construçõesNecessárias: ["Fazenda Administrativa", "Armazém"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          ForneceMelhoraEficiencia: [
            {
              nome: "Fábrica De Pães",
              redCusto: {
                nível1: 3,
                nível2: 4,
                nível3: 12,
              },
              aumFatu: {
                nível1: 0,
                nível2: 0,
                nível3: 0,
              },
            },
            {
              nome: "Restaurante",
              redCusto: {
                nível1: 1,
                nível2: 1,
                nível3: 3,
              },
              aumFatu: {
                nível1: 0,
                nível2: 0,
                nível3: 0,
              },
            },
            {
              nome: "Cafeteria",
              redCusto: {
                nível1: 3,
                nível2: 4,
                nível3: 10,
              },
              aumFatu: {
                nível1: 0,
                nível2: 0,
                nível3: 0,
              },
            },
            {
              nome: "Petshop",
              redCusto: {
                nível1: 8,
                nível2: 12,
                nível3: 25,
              },
              aumFatu: {
                nível1: 0,
                nível2: 0,
                nível3: 0,
              },
            },
            {
              nome: "Fábrica De Rações",
              redCusto: {
                nível1: 2,
                nível2: 3,
                nível3: 7,
              },
              aumFatu: {
                nível1: 0,
                nível2: 0,
                nível3: 0,
              },
            },
            {
              nome: "Refinaria De Biocombustíveis",
              redCusto: {
                nível1: 1,
                nível2: 1,
                nível3: 1,
              },
              aumFatu: {
                nível1: 0,
                nível2: 0,
                nível3: 0,
              },
            },
            {
              nome: "Centro De Coleta De Biomassa",
              redCusto: {
                nível1: 2,
                nível2: 3,
                nível3: 3,
              },
              aumFatu: {
                nível1: 0,
                nível2: 0,
                nível3: 0,
              },
            },
            {
              nome: "Feira",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 0,
                nível2: 0,
                nível3: 0,
              },
            },
            {
              nome: "Depósito De Resíduos Orgânicos",
              redCusto: {
                nível1: 2,
                nível2: 3,
                nível3: 4,
              },
              aumFatu: {
                nível1: 0,
                nível2: 0,
                nível3: 0,
              },
            },
            {
              nome: "Fábrica Têxtil",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 3,
              },
              aumFatu: {
                nível1: 0,
                nível2: 0,
                nível3: 0,
              },
            },
            {
              nome: "Fábrica De Bebidas",
              redCusto: {
                nível1: 5,
                nível2: 7,
                nível3: 19,
              },
              aumFatu: {
                nível1: 0,
                nível2: 0,
                nível3: 0,
              },
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 0,
                nível2: 0,
                nível3: 1,
              },
              aumFatu: {
                nível1: 0,
                nível2: 0,
                nível3: 0,
              },
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 1,
                nível3: 3,
              },
              aumFatu: {
                nível1: 0,
                nível2: 0,
                nível3: 0,
              },
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Fábrica De Fertilizantes",
              redCusto: {
                nível1: 1,
                nível2: 3,
                nível3: 6,
              },
              aumFatu: {
                nível1: 0,
                nível2: 0,
                nível3: 0,
              },
            },
            {
              nome: "Fazenda Administrativa",
              redCusto: {
                nível1: 0,
                nível2: 0,
                nível3: 0,
              },
              aumFatu: {
                nível1: 2,
                nível2: 5,
                nível3: 9,
              },
            },
            {
              nome: "Cooperativa Agrícola",
              redCusto: {
                nível1: 0,
                nível2: 0,
                nível3: 0,
              },
              aumFatu: {
                nível1: 3,
                nível2: 7,
                nível3: 15,
              },
            },
            {
              nome: "Silo",
              redCusto: {
                nível1: 1,
                nível2: 1,
                nível3: 2,
              },
              aumFatu: {
                nível1: 0,
                nível2: 0,
                nível3: 0,
              },
            },
            {
              nome: "Armazém",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 3,
              },
              aumFatu: {
                nível1: 0,
                nível2: 0,
                nível3: 0,
              },
            },
            {
              nome: "Centro De Comércio De Plantações",
              redCusto: {
                nível1: 0,
                nível2: 0,
                nível3: 0,
              },
              aumFatu: {
                nível1: 5,
                nível2: 15,
                nível3: 40,
              },
            },
            {
              nome: "Depósito De Resíduos Orgânicos",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 0,
                nível2: 0,
                nível3: 0,
              },
            },
            {
              nome: "Instituto De Tecnologia Alimentar",
              redCusto: {
                nível1: 0,
                nível2: 0,
                nível3: 0,
              },
              aumFatu: {
                nível1: 5,
                nível2: 17,
                nível3: 29,
              },
            },
            {
              nome: "Centro De Pesquisa Agrícola",
              redCusto: {
                nível1: 0,
                nível2: 0,
                nível3: 0,
              },
              aumFatu: {
                nível1: 2,
                nível2: 8,
                nível3: 12,
              },
            },
            {
              nome: "Instituto De Biotecnologia",
              redCusto: {
                nível1: 0,
                nível2: 0,
                nível3: 0,
              },
              aumFatu: {
                nível1: 3,
                nível2: 13,
                nível3: 25,
              },
            },
            {
              nome: "Terraplanagem E Pavimentação",
              redCusto: {
                nível1: 0,
                nível2: 0,
                nível3: 1,
              },
              aumFatu: {
                nível1: 0,
                nível2: 0,
                nível3: 0,
              },
            },
            {
              nome: "Armazém Logístico",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 0,
                nível2: 0,
                nível3: 0,
              },
            },
          ],

          recursoDeConstrução: [],
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 },
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: {
              status: true,
              quantidadeMínima: 1,
              redCusto: 0,
              aumFatu: 0,
            },
            nível2: {
              status: true,
              quantidadeMínima: 20,
              redCusto: 0,
              aumFatu: 0,
            },
            nível3: {
              status: true,
              quantidadeMínima: 100,
              redCusto: 0,
              aumFatu: 0,
            },
          },
        },]
    }
}