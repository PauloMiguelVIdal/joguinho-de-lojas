import React, { useState, createContext } from 'react';

const CentraldeDadosContext = createContext();

const CentraldeDadosProvider = ({ children }) => {

  const [dados, setDados] = useState({
    ofertas: {},
    inicioGame: {
      estadoModal: true,
      nomeEmpresa: ""
    },
    setorAtivo: "agricultura",
    fimGame: false,
    nomeEmpresa: "",
    saldo: 900000,
    dia: 240,
    chanceNovoEvento: 0,
    economiaGlobal: "estável",
    botãoOfertas: "btnNormal",
    proximaEconomia: "",
    proximaOferta: "",
    despesas: {
      diaPagarDespesas: false,
      despesasPagas: false,
      proximoPagamento: ""
    },
    modal: {
      estadoModal: false,
      head: "",
      content: ""
    },
    modalAchievements: {
      estadoModal: false,
      lojaConquistada: "",
      conquista: 0
    },

    modalDespesas: {
      estadoModal: false,
      head: "",
      content: ""
    },
    modalEconomiaGlobal: {
      estadoModal: false,
      head: "",
      content: ""
    },
    modalOfertas: {
      estadoModal: false,
    },

    eventoAtual: {
      eventoAtivo: false,
      title: "",
      lojaSelecionada: "",
      situacaoSelecionada: "",
      porcentagemSelecionada: "",
      periodoSelecionado: "",
      diaInicial: "",
      diaFinal: "",
      departamento: "",
      julgamento: "",
    },
    terrenos: {
      achievements: {
        5: false,
        10: false,
        20: false,
        50: false,
        100: false,
        200: false,
        500: false,
        1000: false
      },
      arrayFatu: [],
      somaArrayFatu: "",
      quantidade: 0,
      quantidadeNecTerreno: 0,
      preçoConstrução: 40000,
      faturamentoUnitário: 130,
      faturamentoUnitárioPadrão: 130,
      faturamentoTotal: 0,
      faturamentoMensal: 0,
      impostoFixo: 1500,
      valorImpostoFixoTotal: 0,
      impostoSobreFaturamento: 0.02000,
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
        1000: false
      },
      arrayFatu: [],
      somaArrayFatu: 0,
      quantidade: 0,
      quantidadeNecTerreno: 1,
      preçoConstrução: 50000,
      faturamentoUnitário: 850,
      faturamentoUnitárioPadrão: 850,
      faturamentoTotal: 0,
      faturamentoMensal: 0,
      despesas: 0,
      impostoFixo: 6000,
      valorImpostoFixoTotal: 0,
      impostoSobreFaturamento: 0.05000,
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
        1000: false
      },
      arrayFatu: [],
      somaArrayFatu: "",
      quantidade: 0,
      quantidadeNecTerreno: 2,
      preçoConstrução: 100000,
      faturamentoUnitário: 2000,
      faturamentoUnitárioPadrão: 2000,
      faturamentoTotal: 0,
      faturamentoMensal: 0,
      despesas: 0,
      impostoFixo: 10000,
      valorImpostoFixoTotal: 0,
      impostoSobreFaturamento: 0.07000,
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
        1000: false
      },
      arrayFatu: [],
      somaArrayFatu: "",
      quantidade: 0,
      quantidadeNecTerreno: 3,
      preçoConstrução: 240000,
      faturamentoUnitário: 5000,
      faturamentoUnitárioPadrão: 5000,
      faturamentoTotal: 0,
      faturamentoMensal: 0,
      despesas: 0,
      impostoFixo: 15000,
      valorImpostoFixoTotal: 0,
      impostoSobreFaturamento: 0.10000,
      valorImpostoSobreFaturamento: 0,
    },

    faturamento: {
      faturamentoDiário: 0,
      faturamentoMensal: 0,
      arrayFatuDiário: [],
    },
    relatóriosFaturamento: {

    },
    imposto: {
      impostoFixoMensal: "",
      impostoDiário: "",
      impostoMensal: 0,
      impostoSobreFaturamentoDiário: ""
    },
    imposto2: {
      impostoFixoMensal: [],
      impostoDiário: [],
      impostoMensal: [],
      impostoSobreFaturamentoDiário: []
    },

    valoresDespesas: {
      terrenos: 0,
      lojasP: 0,
      lojasM: 0,
      lojasG: 0,
      impostos: 0,
      funcionários: 0,
      despesasTotais: 0
    },

    licencas: {
      agricultura: ["Licença Agricultura Global", "Licença De Comércios Agrícolas", "Licença De Armazenamento Agrícola", "Licença De Fazendas De Animais", "Licença De Áreas Especiais", "Licença De Outras Plantações"],
      tecnologia: [],
      industria: [],
      comercio: [],
      imobiliario: [],
      energia: [],
    },

    agricultura: {
      economiaSetor: {
        estadoAtual: "estável"
      },
      licençaGlobal: {
        comprado: true,
        valor: 20000
      },
      licençasSetor: [
        {
          nome: "Licença Global De Agricultura",
          desc: "Autoriza operações agrícolas básicas incluindo cultivo de grãos, hortaliças e frutas, formando a base da cadeia produtiva de alimentos.",
          valor: 2000,
          edifíciosLiberados: ["Plantação De Grãos", "Plantação De Vegetais", "Fazenda Administrativa", "Pomares"],
          status: false
        },
        {
          nome: "Licença De Comércios Agrícolas",
          desc: "Permite a criação de centros de distribuição e cooperativas para otimizar a comercialização de produtos agrícolas entre regiões.",
          valor: 3000,
          edifíciosLiberados: ["Cooperativa Agrícola", "Centro De Comércio De Plantações"],
          status: false
        },
        {
          nome: "Licença De Fazendas De Animais",
          desc: "Habilita a criação profissional de animais como gado, aves e ovinos, essencial para abastecer frigoríficos e laticínios.",
          valor: 2500,
          edifíciosLiberados: ["Fazenda De Vacas", "Granja De Aves", "Criação De Ovinos"],
          status: false
        },
        {
          nome: "Licença De Armazenamentos Agrícolas",
          desc: "Concede permissão para construção de unidades de armazenamento especializadas para grãos e insumos agrícolas.",
          valor: 3200,
          edifíciosLiberados: ["Armazém", "Silo", "Depósito De Resíduos Orgânicos"],
          status: false
        },
        {
          nome: "Licença De Áreas Especiais",
          desc: "Autoriza a exploração sustentável de recursos naturais como madeira e minérios em áreas designadas.",
          valor: 6200,
          edifíciosLiberados: ["Madeireira", "Área Florestal", "Terreno De Mineração"],
          status: false
        },
        {
          nome: "Licença De Outras Plantações",
          desc: "Permite o cultivo de espécies vegetais especiais com alto valor agregado para indústrias específicas.",
          valor: 5300,
          edifíciosLiberados: ["Plantação De Eucalipto", "Plantação De Plantas Medicinais"],
          status: false
        }
      ],






      edificios: [
        {
          nome: "Plantação De Grãos",
          desc: "Base da produção agrícola. Dá suporte às fazendas e à alimentação.",
          licençaLiberado: {
            licença: "Licença Global De Agricultura",
            liberado: false,
          },
          custoConstrucao: 40000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 800,
            impostoFixo: 4000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 2,
            lojasP: 0,
            lojasM: 0,
            lojasG: 0,
          },
          construçõesNecessárias: ["Fazenda Administrativa","Armazém"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          ForneceMelhoraEficiencia: [
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Fábrica De Embalagem",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Padaria",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Fábrica de Rações",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Refinaria de Biocombustíveis",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Usina de Biomassa",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Restaurante",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Redes de Fast-Food",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Petshop",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Fábrica de Fertilizantes",
              redCusto: {
                nível1: 10,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 100,
                nível3: 4
              }
            },
            {
              nome: "Fazenda Administrativa",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Silo",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Cooperativas agrícolas",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Armazém",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },

          }
        },


        {
          nome: "Plantação De Vegetais",
          desc: "Elemento essencial do setor agrícola. Representa variedade e frescor.",
          licençaLiberado: {
            licença: "Licença Global De Agricultura",
            liberado: true,
          },
          custoConstrucao: 60000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 500,
            impostoFixo: 1800,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 1,
            lojasP: 0,
            lojasM: 0,
            lojasG: 0,
          },
          construçõesNecessárias: ["Fazenda Administrativa","Silo"],
          licençasNecessárias: [],
          melhoraEficiencia: [
            "Mercado",
            "Feira",
            "Restaurante",
            "Redes de Fast-Food",
            "Petshop",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Restaurante",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Redes de Fast-Food",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Petshop",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Fábrica de Fertilizantes",
              redCusto: {
                nível1: 10,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 100,
                nível3: 4
              }
            },
            {
              nome: "Fazenda Administrativa",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Silo",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Cooperativas agrícolas",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Armazém",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          recursoDeConstrução: []
          ,
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },


        {
          nome: "Pomares",
          desc: "Diversifica a produção rural. Dá suporte à indústria e ao comércio local.",
          licençaLiberado: {
            licença: "Licença Global De Agricultura",
            liberado: true,
          },
          custoConstrucao: 40000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 900,
            impostoFixo: 3150,
            impostoSobreFatu: 0.10000,
            rent: 32
          },
          lojasNecessarias: {
            terrenos: 2,
            lojasP: 0,
            lojasM: 0,
            lojasG: 0,
          },
          construçõesNecessárias: ["Silo"],
          licençasNecessárias: [],
          melhoraEficiencia: [
            "Mercado",
            "Feira",
            "Restaurante",
            "Redes de Fast-Food",
            "Fábrica de Bebidas",
            "Usina de Biomassa",
            "Refinaria de Biocombustíveis",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Fábrica de Bebidas",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Refinaria de Biocombustíveis",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Usina de Biomassa",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Restaurante",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Redes de Fast-Food",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          RecebeMelhoraEficiencia: [
            {
              nome: "Fábrica de Fertilizantes",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Fazenda Administrativa",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Cooperativas agrícolas",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Silo",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Armazém",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },


        {
          nome: "Fazenda Administrativa",
          desc: "Organiza e valoriza o setor rural. Aumenta a eficiência das plantações.",
          licençaLiberado: {
            licença: "Licença Global De Agricultura",
            liberado: false,
          },
          custoConstrucao: 30000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 0,
            impostoFixo: 12500,
            impostoSobreFatu: 0.02000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 1,
            lojasP: 1,
            lojasM: 0,
            lojasG: 0,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Grãos",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Pomares",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Fazenda De Vacas",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Granja De Aves",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Criação De Ovinos",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          RecebeMelhoraEficiencia: [
            
          ],

          recursoDeConstrução: [],
          melhoraEficiencia: [
            "Plantação De Grãos",
            "Plantação De Vegetais",
            "Pomares",
            "Fazenda De Vacas",
            "Granja De Aves",
            "Criação De Ovinos",
          ]
          ,
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },


        {
          nome: "Cooperativa Agrícola",
          desc: "Conecta pequenos produtores. Melhora o valor das construções agrícolas.",
          licençaLiberado: {
            licença: "Licença De Comércios Agrícolas",
            liberado: false,
          },
          custoConstrucao: 1150000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 75000,
            impostoFixo: 1000000,
            impostoSobreFatu: 0.10000,
            rent: 25
          },

          lojasNecessarias: {
            terrenos: 5,
            lojasP: 1,
            lojasM: 1,
            lojasG: 1,
          },
          construçõesNecessárias: ["Plantação De Grãos","Plantação De Vegetais","Pomares"],
          licençasNecessárias: [],
          melhoraEficiencia: [
            "Mercado",
            "Feira",
            "Restaurante",
            "Redes de Fast-Food",
            "Petshop",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Grãos",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Pomares",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Fazenda De Vacas",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Granja De Aves",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Criação De Ovinos",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Plantação De Eucalipto",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Plantação De Plantas Medicinais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome:  "Feira",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome:  "Fábrica de Ração",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome:  "Usina de Biomassa",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
          ],

          recursoDeConstrução: ["Armazém","Silo","Fazenda Administrativa","Centro De Comércio De Plantações"],
          
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },


        {
          nome: "Centro De Comércio De Plantações",
          desc: "Representa o escoamento da produção. Aumenta o valor do setor agrícola.",
          licençaLiberado: {
            licença: "Licença De Comércios Agrícolas",
            liberado: false,
          },
          custoConstrucao: 900000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 25000,
            impostoFixo: 100000,
            impostoSobreFatu: 0.10000,
            rent: 28
          },

          lojasNecessarias: {
            terrenos: 5,
            lojasP: 3,
            lojasM: 1,
            lojasG: 1,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
          melhoraEficiencia: [
            "Plantação De Grãos",
            "Pomares",
            "Fazenda De Vacas",
            "Granja De Aves",
            "Criação De Ovinos",
            "Plantação De Eucalipto",
            "Plantação De Plantas Medicinais",
            "Mercado",
            "Feira",
            "Fábrica de Ração",
            "Restaurante",
            "Usina de Biomassa",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Grãos",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Pomares",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Fazenda De Vacas",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Granja De Aves",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Criação De Ovinos",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Plantação De Eucalipto",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Plantação De Plantas Medicinais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome:  "Feira",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome:  "Fábrica de Ração",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome:  "Usina de Biomassa",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome:  "Fábrica de Embalagens",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: ["Armazém","Silo","Fazenda Administrativa","Plantação De Grãos"]
          ,
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },





        {
          nome: "Armazém",
          desc: "Espaço de armazenamento geral. Dá suporte a múltiplos setores produtivos.",
          licençaLiberado: {
            licença: "Licença De Armazenamentos Agrícolas",
            liberado: false,
          },
          custoConstrucao: 0,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 300,
            impostoFixo: 14000,
            impostoSobreFatu: 0.05000,
            rent: 1
          },

          lojasNecessarias: {
            terrenos: 0,
            lojasP: 1,
            lojasM: 0,
            lojasG: 0,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
          melhoraEficiencia: [
            "Plantação De Grãos",
            "Pomares",
            "Fazenda De Vacas",
            "Granja De Aves",
            "Criação De Ovinos",
            "Plantação De Eucalipto",
            "Plantação De Plantas Medicinais",
            "Mercado",
            "Feira",
            "Fábrica de Ração",
            "Restaurante",
            "Usina de Biomassa",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Feira",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Usina de Biomassa",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Fábrica de Ração",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Centro De Comércio De Plantações",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Cooperativa Agrícola",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
          ],

          recursoDeConstrução: []
          ,
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },


        {
          nome: "Silo",
          desc: "Armazena grãos. Aumenta a eficiência e o valor das plantações ao redor.",
          licençaLiberado: {
            licença: "Licença De Armazenamentos Agrícolas",
            liberado: false,
          },
          custoConstrucao: 40000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 390,
            impostoFixo: 12000,
            impostoSobreFatu: 0.05000,
            rent: 1
          },

          lojasNecessarias: {
            terrenos: 1,
            lojasP: 1,
            lojasM: 0,
            lojasG: 0,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
          melhoraEficiencia: [
            "Cooperativa Agrícola",
            "Fábrica De Ração",
            "Usina De Biomassa",
            "Refinaria De Biocombustíveis",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Cooperativa Agrícola",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Fábrica De Ração",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Usina De Biomassa",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Refinaria De Biocombustíveis",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
          ],

          recursoDeConstrução: []
          ,
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },


        {
          nome: "Depósito De Resíduos Orgânicos",
          desc: "Processa sobras naturais. Melhora a rentabilidade de fazendas e plantações.",
          licençaLiberado: {
            licença: "Licença De Armazenamentos Agrícolas",
            liberado: false,
          },
          custoConstrucao: 40000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 180,
            impostoFixo: 2000,
            impostoSobreFatu: 0.05000,
            rent: 1
          },

          lojasNecessarias: {
            terrenos: 2,
            lojasP: 0,
            lojasM: 0,
            lojasG: 0,
          },
          construçõesNecessárias: ["Silo"],
          licençasNecessárias: [],
          melhoraEficiencia: [
            "Usina de Biomassa",
            "Refinaria de Biocombustíveis",
            "Fábrica de Fertilizantes",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Usina de Biomassa",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Refinaria de Biocombustíveis",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Fábrica de Fertilizantes",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },


        {
          nome: "Fazenda De Vacas",
          desc: "Produção animal de grande porte. Suporte para indústrias e comércios.",
          licençaLiberado: {
            licença: "Licença De Fazendas De Animais",
            liberado: false,
          },
          custoConstrucao: 100000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 3200,
            impostoFixo: 56000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 0,
            lojasP: 1,
            lojasM: 0,
            lojasG: 0,
          },
          construçõesNecessárias: ["Armazém"],
          licençasNecessárias: [],
          melhoraEficiencia: [
            "Mercado",
            "Açougue",
            "Feira",
            "Restaurante",
            "Redes de Fast-Food",
            "Padaria",
            "Fábrica De Pães",
            "Usina de Biomassa",
            "Fábrica de Fertilizantes",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Açougue",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Restaurante",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Redes de Fast-Food",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Padaria",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Fábrica De Pães",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Usina de Biomassa",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Fábrica de Fertilizantes",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Fazenda Administrativa",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Fábrica de Ração",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },


        {
          nome: "Granja De Aves",
          desc: "Produção rápida e leve. Base para setores alimentares e de exportação.",
          licençaLiberado: {
            licença: "Licença De Fazendas De Animais",
            liberado: false,
          },
          custoConstrucao: 70000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2800,
            impostoFixo: 40000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 1,
            lojasP: 1,
            lojasM: 0,
            lojasG: 0,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
          melhoraEficiencia: [
            "Mercado",
            "Açougue",
            "Feira",
            "Restaurante",
            "Redes De Fast-Food",
            "Fábrica De Ração",
            "Petshop",
            "Usina de Biomassa",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Açougue",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Restaurante",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Redes De Fast-Food",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Fábrica De Ração",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Petshop",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Usina de Biomassa",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Fazenda Administrativa",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Fábrica de Ração",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },


        {
          nome: "Criação De Ovinos",
          desc: "Fonte de carne e lã. Conecta o campo à indústria têxtil e alimentícia.",
          licençaLiberado: {
            licença: "Licença De Fazendas De Animais",
            liberado: false,
          },
          custoConstrucao: 30000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 1400,
            impostoFixo: 7600,
            impostoSobreFatu: 0.10000,
            rent: 34
          },

          lojasNecessarias: {
            terrenos: 2,
            lojasP: 1,
            lojasM: 0,
            lojasG: 0,
          },
          construçõesNecessárias: ["Armazém"],
          licençasNecessárias: [],
          melhoraEficiencia: [
            "Mercado",
            "Açougue",
            "Feira",
            "Restaurante",
            "Redes de Fast-Food",
            "Fábrica de Ração",
            "Petshop",
            "Usina de Biomassa",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome:  "Açougue",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Restaurante",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Redes de Fast-Food",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Fábrica de Ração",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Petshop",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Usina de Biomassa",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Fazenda Administrativa",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Fábrica de Ração",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },


        {
          nome: "Madeireira",
          desc: "Transforma madeira em insumo. Essencial para fábricas e construção.",
          licençaLiberado: {
            licença: "Licença De Áreas Especiais",
            liberado: false,
          },
          custoConstrucao: 100000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 4200,
            impostoFixo: 17000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 3,
            lojasP: 0,
            lojasM: 1,
            lojasG: 0,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
          melhoraEficiencia: [
            "Fábrica de Móveis",
            "Fábrica de Celulose",
            "Fábrica de Estruturas Metálicas",
            "Fábrica de Embalagens",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },


        {
          nome: "Área Florestal",
          desc: "Fonte sustentável de madeira. Suporte contínuo para a produção.",
          licençaLiberado: {
            licença: "Licença De Áreas Especiais",
            liberado: false,
          },
          custoConstrucao: 40000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2200,
            impostoFixo: 24000,
            impostoSobreFatu: 0.10000,
            rent: 28
          },

          lojasNecessarias: {
            terrenos: 0,
            lojasP: 4,
            lojasM: 0,
            lojasG: 0,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
          melhoraEficiencia: [
            "Madeireira",
            "Plantação De Eucalipto",
            "Plantação De Plantas Medicinais",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },


        {
          nome: "Terreno De Mineração",
          desc: "Origem de minérios. Base essencial para fábricas e tecnologias.",
          licençaLiberado: {
            licença: "Licença De Áreas Especiais",
            liberado: false,
          },
          custoConstrucao: 400000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 12000,
            impostoFixo: 12000,
            impostoSobreFatu: 0.10000,
            rent: 23
          },

          lojasNecessarias: {
            terrenos: 10,
            lojasP: 0,
            lojasM: 0,
            lojasG: 0,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
          melhoraEficiencia: [
            "Mineradora",
            "Mineradora De Pedras Preciosas",
            "Mineradora Radioativa",
            "Alto-Forno",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },


        {
          nome: "Plantação De Eucalipto",
          desc: "Produção rápida de madeira. Dá suporte a serrarias e papelarias.",
          licençaLiberado: {
            licença: "Licença De Outras Plantações",
            liberado: false,
          },
          custoConstrucao: 20000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 900,
            impostoFixo: 4000,
            impostoSobreFatu: 0.10000,
            rent: 29
          },

          lojasNecessarias: {
            terrenos: 3,
            lojasP: 0,
            lojasM: 0,
            lojasG: 0,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
          melhoraEficiencia: [
            "Fábrica de Celulose",
            "Madeireira",
            "Fábrica de Papel",
            "Granja De Aves",
            "Criação De Ovinos",
            "Plantação De Eucalipto",
            "Plantação De Plantas Medicinais",
            "Mercado",
            "Feira",
            "Fábrica de Ração",
            "Restaurante",
            "Usina de Biomassa",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },


        {
          nome: "Plantação De Plantas Medicinais",
          desc: "Fornece insumos raros. Suporte direto para a indústria farmacêutica.",
          licençaLiberado: {
            licença: "Licença De Outras Plantações",
            liberado: false,
          },
          custoConstrucao: 100000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 3400,
            impostoFixo: 30000,
            impostoSobreFatu: 0.10000,
            rent: 27
          },

          lojasNecessarias: {
            terrenos: 5,
            lojasP: 0,
            lojasM: 0,
            lojasG: 0,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
          melhoraEficiencia: [
            "Fábrica De Produtos Químicos Especializados",
            "Farmácia",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },
      ],
    }
    ,




    tecnologia: {
      economiaSetor: {
        estadoAtual: "estável"
      },
      licençaGlobal: {
        comprado: true,
        valor: 20000
      },
      licençasSetor: [{
        nome: "Licença Global De Tecnologia",
        desc: "Permite a operação de empresas de tecnologia básica, incluindo infraestrutura digital e desenvolvimento de software, essencial para a economia digital.",
        valor: 7000,
        edifíciosLiberados: ["Servidor Em Nuvem", "Data Center", "Startup", "Empresa De Desenvolvimento De Software"],
        status: false
      },
      {
        nome: "Licença De Tecnologia Experimental",
        desc: "Autoriza pesquisas de ponta em química avançada e energia nuclear, habilitando descobertas científicas revolucionárias.",
        valor: 7000,
        edifíciosLiberados: ["Centro de Pesquisa Química", "Centro De Pesquisa Em Fusão Nuclear"],
        status: false
      },
      {
        nome: "Licença De Engenharia Avançada",
        desc: "Habilita centros de pesquisa em eletrônica de última geração e tecnologia aeroespacial, impulsionando inovações em mobilidade e comunicação.",
        valor: 7000,
        edifíciosLiberados: ["Centro De Pesquisa Em Eletrônicos", "Centro De Pesquisa Aeroespacial"],
        status: false
      },
      {
        nome: "Licença De Pesquisa Em Robótica e IA",
        desc: "Permite o desenvolvimento de inteligência artificial e sistemas robóticos autônomos, representando o estado da arte em automação e machine learning.",
        valor: 7000,
        edifíciosLiberados: ["Centro De Pesquisa Em Robótica", "Centro De Pesquisa Em IA"],
        status: false
      }
      ],



      edificios: [
        {
          nome: "Servidor Em Nuvem",
          desc: "Infraestrutura digital para armazenamento e serviços online.",
          licençaLiberado: {
            licença: "Licença Global De Tecnologia",
            liberado: false,
          },
          custoConstrucao: 470000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 10000,
            impostoFixo: 30000,
            impostoSobreFatu: 0.050000,
            rent: 5
          },
          lojasNecessarias: {
            terrenos: 2,
            lojasP: 1,
            lojasM: 0,
            lojasG: 1,
          },
          construçõesNecessárias: ["Data Center"],
          licençasNecessárias: [],
          melhoraEficiencia: [],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: [],
          dependências: [],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Data Center",
          desc: "Centro de processamento e armazenamento de dados.",
          licençaLiberado: {
            licença: "Licença Global De Tecnologia",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 13500,
            impostoFixo: 10500,
            impostoSobreFatu: 0.050000,
            rent: 5
          },

          lojasNecessarias: {
            terrenos: 0,
            lojasP: 1,
            lojasM: 0,
            lojasG: 0,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
          melhoraEficiencia: [],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: ["Servidor Em Nuvem"],
          dependências: [],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Startup",
          desc: "Negócio inovador focado em soluções tecnológicas.",
          licençaLiberado: {
            licença: "Licença Global De Tecnologia",
            liberado: false,
          },
          custoConstrucao: 150000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 3750,
            impostoFixo: 11250,
            impostoSobreFatu: 0.10000,
            rent: 19
          },

          lojasNecessarias: {
            terrenos: 2,
            lojasP: 3,
            lojasM: 0,
            lojasG: 0,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
          melhoraEficiencia: [],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: [],
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        }
        ,
        {
          nome: "Empresa De Desenvolvimento De Software",
          desc: "Criação de sistemas e aplicativos sob demanda.",
          licençaLiberado: {
            licença: "Licença Global De Tecnologia",
            liberado: false,
          },
          custoConstrucao: 410000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 15750,
            impostoFixo: 47250,
            impostoSobreFatu: 0.10000,
            rent: 22
          },

          lojasNecessarias: {
            terrenos: 2,
            lojasP: 5,
            lojasM: 0,
            lojasG: 1,
          },
          construçõesNecessárias: ["Startup"],
          licençasNecessárias: [],
          melhoraEficiencia: [],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: ["Startup","Servidor Em Nuvem"],
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        }
        ,
        {
          nome: "Centro de Pesquisa Química",
          desc: "Pesquisas avançadas em compostos químicos.",
          licençaLiberado: {
            licença: "Licença De Tecnologia Experimental",
            liberado: false,
          },
          custoConstrucao: 320000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 5000,
            impostoFixo: 15000,
            impostoSobreFatu: 0.10000,
            rent: 5
          },

          lojasNecessarias: {
            terrenos: 3,
            lojasP: 2,
            lojasM: 1,
            lojasG: 0,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
          melhoraEficiencia: [],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: [],
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        }
        ,
        {
          nome: "Centro De Pesquisa Em Fusão Nuclear",
          desc: "Pesquisa para geração de energia por fusão nuclear.",
          licençaLiberado: {
            licença: "Licença De Tecnologia Experimental",
            liberado: false,
          },
          custoConstrucao: 1200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 20000,
            impostoFixo: 60000,
            impostoSobreFatu: 0.050000,
            rent: 6
          },

          lojasNecessarias: {
            terrenos: 5,
            lojasP: 2,
            lojasM: 3,
            lojasG: 3,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
          melhoraEficiencia: [],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: ["Centro de Pesquisa Química"],
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        }
        ,
        {
          nome: "Centro De Pesquisa Em Eletrônicos",
          desc: "Desenvolvimento de circuitos e dispositivos eletrônicos.",
          licençaLiberado: {
            licença: "Licença De Engenharia Avançada",
            liberado: false,
          },
          custoConstrucao: 480000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 9375,
            impostoFixo: 28125,
            impostoSobreFatu: 0.050000,
            rent: 6
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
          melhoraEficiencia: [],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: [],
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        }
        ,
        {
          nome: "Centro De Pesquisa Aeroespacial",
          desc: "Tecnologias voltadas ao setor aeroespacial.",
          licençaLiberado: {
            licença: "Licença De Engenharia Avançada",
            liberado: false,
          },
          custoConstrucao: 2000000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 16200,
            impostoFixo: 48600,
            impostoSobreFatu: 0.050000,
            rent: 4
          },

          lojasNecessarias: {
            terrenos: 4,
            lojasP: 0,
            lojasM: 0,
            lojasG: 3,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
          melhoraEficiencia: [],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: ["Centro De Pesquisa Em Eletrônicos"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        }
        ,
        {
          nome: "Centro De Pesquisa Em Robótica",
          desc: "Inovações em robótica e automação industrial.",
          licençaLiberado: {
            licença: "Licença De Pesquisa Em Robótica e IA",
            liberado: false,
          },
          custoConstrucao: 140000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 15625,
            impostoFixo: 46875,
            impostoSobreFatu: 0.050000,
            rent: 5
          },

          lojasNecessarias: {
            terrenos: 0,
            lojasP: 0,
            lojasM: 0,
            lojasG: 1,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
          melhoraEficiencia: [],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: ["Centro De Pesquisa Em Eletrônicos","Startup"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        }
        ,
        {
          nome: "Centro De Pesquisa Em IA",
          desc: "Desenvolvimento de inteligência artificial aplicada.",
          licençaLiberado: {
            licença: "Licença De Pesquisa Em Robótica e IA",
            liberado: false,
          },
          custoConstrucao: 360000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 16000,
            impostoFixo: 48000,
            impostoSobreFatu: 0.10000,
            rent: 5
          },

          lojasNecessarias: {
            terrenos: 2,
            lojasP: 0,
            lojasM: 0,
            lojasG: 2,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: ["Startup","Data Center"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        }

      ],



    },
    industria: {
      economiaSetor: {
        estadoAtual: "estável"
      },
      licençaGlobal: {
        comprado: true,
        valor: 20000
      },
      licençasSetor: [{
        nome: "Licença Global De Indústria",
        desc: "Permite a operação de indústrias básicas de transformação, essencial para o início da cadeia produtiva industrial.",
        valor: 7000,
        edifíciosLiberados: ["Fábrica De Móveis", "Fábrica De Ração", "Fábrica De Embalagem"],
        status: false
      },
      {
        nome: "Licença De Fábricas Simples",
        desc: "Autoriza a produção de insumos agrícolas e alimentos processados, conectando o campo à indústria.",
        valor: 7000,
        edifíciosLiberados: ["Fábrica De Fertilizante", "Fábrica De Bebidas", "Fábrica De Pães"],
        status: false
      },
      {
        nome: "Licença De Fábricas Energéticas",
        desc: "Habilita a fabricação de componentes para geração de energia renovável e armazenamento.",
        valor: 7000,
        edifíciosLiberados: ["Fábrica De Turbinas Eólicas", "Fábrica De Painéis Solares", "Fábrica De Baterias"],
        status: false
      },
      {
        nome: "Licença De Papel E Celulose",
        desc: "Permite a produção de papel e derivados, essencial para indústrias gráficas e de embalagens.",
        valor: 7000,
        edifíciosLiberados: ["Fábrica De Celulose", "Fábrica De Papel", "Fábrica De Livros"],
        status: false
      },
      {
        nome: "Licença De Base Metalúrgica",
        desc: "Autoriza processos metalúrgicos primários, transformando minérios em metais brutos para indústrias.",
        valor: 7000,
        edifíciosLiberados: ["Alto-Forno", "Usina Siderúrgica", "Fundição de Alumínio", "Fábrica De Ligas Metálicas"],
        status: false
      },
      {
        nome: "Licença De Metalúrgia Avançada",
        desc: "Habilita a fabricação de componentes metálicos complexos para setores estratégicos.",
        valor: 7000,
        edifíciosLiberados: ["Indústria De Componentes Mecânicos", "Fábrica De Chapas Metálicas", "Fábrica De Estruturas Metálicas"],
        status: false
      },
      {
        nome: "Licença Automotiva",
        desc: "Permite a produção de veículos e componentes automotivos, incluindo tecnologias elétricas.",
        valor: 7000,
        edifíciosLiberados: ["Fábrica De Peças Automotivas", "Montadora De Veículos Elétricos", "Fábricas De Automóveis"],
        status: false
      },
      {
        nome: "Licença de Refinaria",
        desc: "Autoriza o processamento de combustíveis fósseis e biocombustíveis, essencial para o setor energético.",
        valor: 7000,
        edifíciosLiberados: ["Refinaria de Biocombustíveis", "Refinaria", "Biofábrica"],
        status: false
      },
      {
        nome: "Licença De Engenharia Mecânica Avançada",
        desc: "Habilita a produção de motores e veículos aeroespaciais/navais de alta complexidade tecnológica.",
        valor: 7000,
        edifíciosLiberados: ["Fábrica De Motores", "Fábrica De Foguetes", "Fábrica De Aeronaves", "Fábrica De Návios"],
        status: false
      },
      {
        nome: "Licença De Eletrônica Avançada",
        desc: "Permite a fabricação de componentes eletrônicos complexos, robótica e sistemas de automação industrial.",
        valor: 7000,
        edifíciosLiberados: ["Fábrica De Eletrônicos", "Fábrica De Semicondutores", "Fábrica De Robôs", "Empresa De Automação Industrial"],
        status: false
      }

      ],
      edificios: [
        {
          nome: "Fábrica De Móveis",
          desc: "Produz móveis com recursos agrícolas e industriais.",
          licençaLiberado: {
            licença: "Licença Global De Indústria",
            liberado: false,
          },
          custoConstrucao: 70000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 1850,
            impostoFixo: 39000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 0,
            lojasP: 0,
            lojasM: 1,
            lojasG: 0,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: false, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Ração",
          desc: "Processa vegetais e cereais para fabricar ração.",
          licençaLiberado: {
            licença: "Licença Global De Indústria",
            liberado: false,
          },
          custoConstrucao: 90000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 1200,
            impostoFixo: 25000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 0,
            lojasP: 1,
            lojasM: 0,
            lojasG: 0,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Embalagem",
          desc: "Produz embalagens para diversos produtos.",
          licençaLiberado: {
            licença: "Licença Global De Indústria",
            liberado: false,
          },
          custoConstrucao: 130000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 1800,
            impostoFixo: 35000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 0,
            lojasP: 1,
            lojasM: 0,
            lojasG: 0,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Fertilizante",
          desc: "Transforma matéria orgânica em fertilizantes.",
          licençaLiberado: {
            licença: "Licença De Fábricas Simples",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Bebidas",
          desc: "Usa vegetais para produzir bebidas diversas.",
          licençaLiberado: {
            licença: "Licença De Fábricas Simples",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Pães",
          desc: "Fabrica pães a partir de cereais e vegetais.",
          licençaLiberado: {
            licença: "Licença De Fábricas Simples",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        
        {
          nome: "Fábrica De Turbinas Eólicas",
          desc: "Monta turbinas para gerar energia eólica.",
          licençaLiberado: {
            licença: "Licença De Fábricas Energéticas",
            liberado: false,
          },
          custoConstrucao: 140000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 4600,
            impostoFixo: 90.000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 0,
            lojasP: 0,
            lojasM: 0,
            lojasG: 1,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Painéis Solares",
          desc: "Produz painéis para captação solar.",
          licençaLiberado: {
            licença: "Licença De Fábricas Energéticas",
            liberado: false,
          },
          custoConstrucao: 90000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 3700,
            impostoFixo: 75.600,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 0,
            lojasP: 0,
            lojasM: 0,
            lojasG: 1,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Baterias",
          desc: "Fabrica baterias para armazenar energia.",
          licençaLiberado: {
            licença: "Licença De Fábricas Energéticas",
            liberado: false,
          },
          custoConstrucao: 250000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 6600,
            impostoFixo: 110.000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 0,
            lojasP: 1,
            lojasM: 0,
            lojasG: 1,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Celulose",
          desc: "Transforma celulose em papel e derivados.",
          licençaLiberado: {
            licença: "Licença De Papel E Celulose",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 6200,
            impostoFixo: 116000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 1,
            lojasP: 0,
            lojasM: 0,
            lojasG: 1,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },

        {
          nome: "Fábrica De Papel",
          desc: "Produz papel a partir de matéria-prima vegetal.",
          licençaLiberado: {
            licença: "Licença De Papel E Celulose",
            liberado: false,
          },
          custoConstrucao: 190000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 4800,
            impostoFixo: 92000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 1,
            lojasP: 1,
            lojasM: 1,
            lojasG: 0,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Livros",
          desc: "Fabrica livros utilizando papel e outros materiais.",
          licençaLiberado: {
            licença: "Licença De Papel E Celulose",
            liberado: false,
          },
          custoConstrucao: 270000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 4200,
            impostoFixo: 81250,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 0,
            lojasP: 0,
            lojasM: 1,
            lojasG: 0,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Alto-Forno",
          desc: "Processa minérios para produzir metais brutos.",
          licençaLiberado: {
            licença: "Licença De Base Metalúrgica",
            liberado: false,
          },
          custoConstrucao: 170000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 33000,
            impostoFixo: 300000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 10,
            lojasP: 3,
            lojasM: 2,
            lojasG: 5,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },

        {
          nome: "Usina Siderúrgica",
          desc: "Transforma minérios em aço e outros metais.",
          licençaLiberado: {
            licença: "Licença De Base Metalúrgica",
            liberado: false,
          },
          custoConstrucao: 1440000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 50000,
            impostoFixo: 134552,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 2,
            lojasP: 0,
            lojasM: 0,
            lojasG: 1,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: ["Alto-Forno"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fundição de Alumínio",
          desc: "Produz alumínio a partir de bauxita e outros minerais.",
          licençaLiberado: {
            licença: "Licença De Base Metalúrgica",
            liberado: false,
          },
          custoConstrucao: 560000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 510000,
            impostoFixo: 990000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 2,
            lojasP: 0,
            lojasM: 0,
            lojasG: 1,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Ligas Metálicas",
          desc: "Fabrica ligas metálicas para diversas aplicações.",
          licençaLiberado: {
            licença: "Licença De Base Metalúrgica",
            liberado: false,
          },
          custoConstrucao: 750000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 600000,
            impostoFixo: 11700000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 3,
            lojasP: 1,
            lojasM: 1,
            lojasG: 1,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Indústria De Componentes Mecânicos",
          desc: "Produz componentes mecânicos para indústrias.",
          licençaLiberado: {
            licença: "Licença De Metalúrgia Avançada",
            liberado: false,
          },
          custoConstrucao: 720000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 247000,
            impostoFixo: 4600000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 5,
            lojasP: 0,
            lojasM: 2,
            lojasG: 2,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Chapas Metálicas",
          desc: "Fabrica chapas metálicas para construção e indústria.",
          licençaLiberado: {
            licença: "Licença De Metalúrgia Avançada",
            liberado: false,
          },
          custoConstrucao: 110000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 305000,
            impostoFixo: 6050000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 0,
            lojasP: 1,
            lojasM: 0,
            lojasG: 0,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Estruturas Metálicas",
          desc: "Produz estruturas metálicas para edificações.",
          licençaLiberado: {
            licença: "Licença De Metalúrgia Avançada",
            liberado: false,
          },
          custoConstrucao: 120000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 340000,
            impostoFixo: 6.500000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 0,
            lojasP: 0,
            lojasM: 1,
            lojasG: 0,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Peças Automotivas",
          desc: "Fabrica peças para veículos automotivos.",
          licençaLiberado: {
            licença: "Licença Automotiva",
            liberado: false,
          },
          custoConstrucao: 460000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 0,
            lojasP: 0,
            lojasM: 1,
            lojasG: 1,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: [],
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Montadora De Veículos Elétricos",
          desc: "Monta veículos elétricos e seus componentes.",
          licençaLiberado: {
            licença: "Licença Automotiva",
            liberado: false,
          },
          custoConstrucao: 3590000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 1075000,
            impostoFixo: 19000000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 5,
            lojasP: 3,
            lojasM: 3,
            lojasG: 5,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábricas De Automóveis",
          desc: "Produz automóveis e veículos convencionais.",
          licençaLiberado: {
            licença: "Licença Automotiva",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },

        {
          nome: "Refinaria de Biocombustíveis",
          desc: "Transforma biomassa em biocombustíveis.",
          licençaLiberado: {
            licença: "Licença de Refinaria",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },
          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: ["Fábrica de Ração", "Biofábrica", "Mercado", "Feira Livre"],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: [],
          dependências: [
            { construção: "Fazenda Administrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Refinaria",
          desc: "Processa petróleo em combustíveis e derivados.",
          licençaLiberado: {
            licença: "Licença de Refinaria",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },
          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            { nome: "Fábrica de Ração", redCusto: 1, redFatu: 2 },
            { nome: "Biofábrica", redCusto: 4, redFatu: 1 },
            { nome: "Mercado", redCusto: 2, redFatu: 4 },
            { nome: "Feira Livre", redCusto: 2, redFatu: 3 },
          ],


          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: [],
          dependências: [
            { construção: "Fazenda Administrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Biofábrica",
          desc: "Produz bioprodutos e materiais orgânicos.",
          licençaLiberado: {
            licença: "Licença de Refinaria",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },
          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: ["Fábrica de Ração", "Biofábrica", "Mercado", "Feira Livre"],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: [],
          dependências: [
            { construção: "Fazenda Administrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Motores",
          desc: "Fabrica motores para veículos e máquinas.",
          licençaLiberado: {
            licença: "Licença De Engenharia Mecânica Avançada",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Foguetes",
          desc: "Fabrica foguetes e sistemas de propulsão avançados.",
          licençaLiberado: {
            licença: "Licença De Engenharia Mecânica Avançada",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Aeronaves",
          desc: "Produz aeronaves e componentes aeroespaciais.",
          licençaLiberado: {
            licença: "Licença De Engenharia Mecânica Avançada",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Návios",
          desc: "Constrói navios e embarcações de grande porte.",
          licençaLiberado: {
            licença: "Licença De Engenharia Mecânica Avançada",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Eletrônicos",
          desc: "Fabrica dispositivos eletrônicos e componentes.",
          licençaLiberado: {
            licença: "Licença De Eletrônica Avançada",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Semicondutores",
          desc: "Produz semicondutores e chips para tecnologia.",
          licençaLiberado: {
            licença: "Licença De Eletrônica Avançada",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        }, {
          nome: "Fábrica De Robôs",
          desc: "Monta robôs e sistemas de automação.",
          licençaLiberado: {
            licença: "Licença De Eletrônica Avançada",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        }
        , {
          nome: "Empresa De Automação Industrial",
          desc: "Desenvolve sistemas industriais automatizados.",
          licençaLiberado: {
            licença: "Licença De Eletrônica Avançada",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
      ],
    },
    comercio: {
      economiaSetor: {
        estadoAtual: "recessão"
      },
      licençaGlobal: {
        comprado: true,
        valor: 20000
      },
      licençasSetor: [{
        nome: "Licença Global De Comércio",
        desc: "Permite a abertura de estabelecimentos comerciais básicos, formando a rede inicial de comércio e serviços essenciais.",
        valor: 7000,
        edifíciosLiberados: ["Feira Livre", "Loja De Móveis", "Restaurante", "Livraria"],
        status: false
      },
      {
        nome: "Licença De Comércio Local",
        desc: "Autoriza operações de comércio varejista de alimentos e produtos básicos para suprir necessidades diárias da população.",
        valor: 7000,
        edifíciosLiberados: ["Mercado", "Adega", "Padaria", "Açougue"],
        status: false
      },
      {
        nome: "Licença De Varejo",
        desc: "Habilita estabelecimentos de conveniência e postos de combustível, importantes para o abastecimento local e mobilidade urbana.",
        valor: 7000,
        edifíciosLiberados: ["Loja De Conveniência", "Posto De Gasolina"],
        status: false
      },
      {
        nome: "Licença De Comércio Urbano",
        desc: "Permite a operação de lojas especializadas e serviços urbanos de médio porte, elevando o nível comercial da cidade.",
        valor: 7000,
        edifíciosLiberados: ["Redes De Fast-food", "Loja De Eletrônicos", "Joalheria", "Concessionária De Veículos"],
        status: false
      },
      {
        nome: "Licença De Serviços E Saúde",
        desc: "Autoriza a prestação de serviços especializados em saúde animal, humana e alimentação, melhorando a qualidade de vida urbana.",
        valor: 7000,
        edifíciosLiberados: ["Petshop", "Farmácia", "Cafeteria"],
        status: false
      },
      {
        nome: "Licença De Varejo Especializado",
        desc: "Habilita lojas departamentais e especializadas em moda, ampliando as opções de consumo e vestuário para a população.",
        valor: 7000,
        edifíciosLiberados: ["Loja De Departamentos", "Loja De Calçados", "Loja De Vestuário"],
        status: false
      },
      {
        nome: "Licença De Shoppings",
        desc: "Permite a construção de centros comerciais de grande porte, impulsionando a economia e o comércio em escala regional.",
        valor: 7000,
        edifíciosLiberados: ["Shopping Popular", "Shopping Center"],
        status: false
      },
      {
        nome: "Licença De Logística E Transporte",
        desc: "Autoriza a operação de centros de distribuição e transporte de mercadorias, essencial para a cadeia de suprimentos da cidade.",
        valor: 7000,
        edifíciosLiberados: ["Centro De Distribuição", "Armazém Logístico", "Transporte Petrolífero"],
        status: false
      }
      ]

      ,
      edificios: [
        {
          nome: "Feira Livre",
          desc: "Vende produtos agrícolas e artesanais em um mercado aberto.",
          licençaLiberado: {
            licença: "Licença Global De Comércio",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Loja De Móveis",
          desc: "Comercializa móveis e artigos para decoração.",
          licençaLiberado: {
            licença: "Licença Global De Comércio",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Restaurante",
          desc: "Serve refeições e pratos preparados com alimentos frescos.",
          licençaLiberado: {
            licença: "Licença Global De Comércio",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Livraria",
          desc: "Vende livros, revistas e materiais de leitura.",
          licençaLiberado: {
            licença: "Licença Global De Comércio",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Mercado",
          desc: "Oferece alimentos, bebidas e produtos básicos para consumo.",
          licençaLiberado: {
            licença: "Licença De Comércio Local",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Adega",
          desc: "Comercializa vinhos, cervejas e outras bebidas alcóolicas.",
          licençaLiberado: {
            licença: "Licença De Comércio Local",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Padaria",
          desc: "Produz e vende pães, bolos e doces frescos.",
          licençaLiberado: {
            licença: "Licença De Comércio Local",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Açougue",
          desc: "Vende carnes, aves e produtos derivados de açougue.",
          licençaLiberado: {
            licença: "Licença De Comércio Local",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Loja De Conveniência",
          desc: "Oferece produtos de conveniência e itens essenciais.",
          licençaLiberado: {
            licença: "Licença De Varejo",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Posto De Gasolina",
          desc: "Vende combustíveis e serviços para veículos automotivos.",
          licençaLiberado: {
            licença: "Licença De Varejo",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Redes De Fast-food",
          desc: "Serve lanches rápidos e refeições pré-preparadas.",
          licençaLiberado: {
            licença: "Licença De Comércio Urbano",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Loja De Eletrônicos",
          desc: "Comercializa eletrônicos, gadgets e aparelhos tecnológicos.",
          licençaLiberado: {
            licença: "Licença De Comércio Urbano",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Joalheria",
          desc: "Vende joias, relógios e acessórios de luxo.",
          licençaLiberado: {
            licença: "Licença De Comércio Urbano",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Concessionária De Veículos",
          desc: "Revende veículos novos e usados de diversas marcas.",
          licençaLiberado: {
            licença: "Licença De Comércio Urbano",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Petshop",
          desc: "Oferece produtos e serviços para animais de estimação.",
          licençaLiberado: {
            licença: "Licença De Serviços E Saúde",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Farmácia",
          desc: "Vende medicamentos e produtos de saúde e bem-estar.",
          licençaLiberado: {
            licença: "Licença De Serviços E Saúde",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Cafeteria",
          desc: "Serve cafés, chás e lanches leves em ambiente aconchegante.",
          licençaLiberado: {
            licença: "Licença De Serviços E Saúde",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Loja De Departamentos",
          desc: "Lojas diversificadas em um único espaço comercial.",
          licençaLiberado: {
            licença: "Licença De Varejo Especializado",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Loja De Calçados",
          desc: "Especializada em calçados e acessórios para pés.",
          licençaLiberado: {
            licença: "Licença De Varejo Especializado",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Loja De Vestuário",
          desc: "Vende roupas, acessórios e artigos de moda.",
          licençaLiberado: {
            licença: "Licença De Varejo Especializado",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Shopping Popular",
          desc: "Conjunto de lojas e serviços em um espaço popular.",
          licençaLiberado: {
            licença: "Licença De Shoppings",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Shopping Center",
          desc: "Complexo comercial com diversas lojas e entretenimento.",
          licençaLiberado: {
            licença: "Licença De Shoppings",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Centro De Distribuição",
          desc: "Distribui produtos e mercadorias para redes varejistas.",
          licençaLiberado: {
            licença: "Licença De Logística E Transporte",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Armazém Logístico",
          desc: "Armazena e gerencia estoques para logística eficiente.",
          licençaLiberado: {
            licença: "Licença De Logística E Transporte",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Transporte Petrolífero",
          desc: "Transporta petróleo e derivados para refinarias e distribuidoras.",
          licençaLiberado: {
            licença: "Licença De Logística E Transporte",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
      ],
    },
    imobiliario: {
      economiaSetor: {
        estadoAtual: "recessão"
      },
      licençaGlobal: {
        comprado: true,
        valor: 20000
      },
      licençasSetor: [{
        nome: "Licença Global Imobiliária",
        desc: "Permite operações básicas de construção civil, terraplanagem e regularização de propriedades, essencial para o desenvolvimento urbano inicial.",
        valor: 7000,
        edifíciosLiberados: ["Construtora", "Cartório E Licenças", "Terraplanagem E Pavimentação"],
        status: false
      },
      {
        nome: "Licença De Grandes Infraestruturas",
        desc: "Autoriza a construção de obras de infraestrutura estratégica como aeroportos e portos, fundamentais para o transporte regional e nacional.",
        valor: 7000,
        edifíciosLiberados: ["Construtora De Infraestruturas", "Aeroporto", "Porto"],
        status: false
      },
      {
        nome: "Licença De Mineração",
        desc: "Habilita a exploração de recursos minerais convencionais, radioativos e pedras preciosas, impulsionando a indústria extrativista.",
        valor: 7000,
        edifíciosLiberados: ["Mineradora", "Mineradora Radioativa", "Mineradora De Pedras Preciosas"],
        status: false
      },
      {
        nome: "Licença Comercial E Residencial",
        desc: "Permite a construção de grandes empreendimentos mistos que combinam espaços comerciais e residenciais de alto padrão.",
        valor: 7000,
        edifíciosLiberados: ["Mega Mercado", "Prédio De Alto Padrão"],
        status: false
      },
      {
        nome: "Licença De Construções Energéticas",
        desc: "Autoriza a implantação de infraestruturas especializadas em produção e armazenamento de combustíveis e bioenergia.",
        valor: 7000,
        edifíciosLiberados: ["Centro De Coleta De Biomassa", "Tanque De Armazenamento Biocombustível", "Plataforma De Petróleo"],
        status: false
      }

      ],
      edificios: [
        {
          nome: "Construtora",
          desc: "Constrói edifícios residenciais e comerciais.",
          licençaLiberado: {
            licença: "Licença Global Imobiliária",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Cartório E Licenças",
          desc: "Registra propriedades e emite licenças comerciais.",
          licençaLiberado: {
            licença: "Licença Global Imobiliária",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Terraplanagem E Pavimentação",
          desc: "Prepara terrenos e constrói vias de transporte.",
          licençaLiberado: {
            licença: "Licença Global Imobiliária",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Construtora De Infraestruturas",
          desc: "Desenvolve grandes obras de infraestrutura urbana.",
          licençaLiberado: {
            licença: "Licença De Grandes Infraestruturas",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4

              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Aeroporto",
          desc: "Opera voos comerciais e transporte aéreo.",
          licençaLiberado: {
            licença: "Licença De Grandes Infraestruturas",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Porto",
          desc: "Gerencia comércio marítimo e transporte naval.",
          licençaLiberado: {
            licença: "Licença De Grandes Infraestruturas",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Mineradora",
          desc: "Extrai minérios e recursos naturais do solo.",
          licençaLiberado: {
            licença: "Licença De Mineração",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Mineradora Radioativa",
          desc: "Mineradora especializada em materiais radioativos.",
          licençaLiberado: {
            licença: "Licença De Mineração",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Mineradora De Pedras Preciosas",
          desc: "Explora jazidas de pedras preciosas e gemas.",
          licençaLiberado: {
            licença: "Licença De Mineração",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Mega Mercado",
          desc: "Grande complexo de varejo e autosserviço.",
          licençaLiberado: {
            licença: "Licença Comercial E Residencial",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Prédio De Alto Padrão",
          desc: "Edifício residencial de luxo e alto padrão.",
          licençaLiberado: {
            licença: "Licença Comercial E Residencial",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Centro De Coleta De Biomassa",
          desc: "Coleta matéria orgânica para produção energética.",
          licençaLiberado: {
            licença: "Licença De Construções Energéticas",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Tanque De Armazenamento Biocombustível",
          desc: "Armazena biocombustíveis para distribuição.",
          licençaLiberado: {
            licença: "Licença De Construções Energéticas",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Plataforma De Petróleo",
          desc: "Extrai petróleo em plataformas oceânicas.",
          licençaLiberado: {
            licença: "Licença De Construções Energéticas",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },

      ],
    },
    energia: {
      economiaSetor: {
        estadoAtual: "aquecida"
      },
      licençaGlobal: {
        comprado: true,
        valor: 20000
      },
      licençasSetor: [{
        nome: "Licença Global De Energia",
        desc: "Permite a construção de infraestrutura básica de distribuição e geração de energia, incluindo redes elétricas e usinas solares fotovoltaicas.",
        valor: 7000,
        edifíciosLiberados: ["Subestação De Energia", "Rede De Distribuição Elétrica", "Usina Solar"],
        status: false
      },
      {
        nome: "Licença De Melhoria Energética",
        desc: "Autoriza centros de pesquisa e desenvolvimento de tecnologias para armazenamento e eficiência energética, incluindo estações de carregamento veicular.",
        valor: 7000,
        edifíciosLiberados: ["Centro De Pesquisa Energética", "Centro De Baterias Recicláveis", "Estação De Carregamento"],
        status: false
      },
      {
        nome: "Licença De Energia Sustentável",
        desc: "Habilita a construção de usinas que utilizam biomassa e biocombustíveis, oferecendo soluções energéticas renováveis e de baixo impacto ambiental.",
        valor: 7000,
        edifíciosLiberados: ["Usina Termelétrica A Biocombustíveis", "Usina De Biomassa"],
        status: false
      },
      {
        nome: "Licença De Usinas",
        desc: "Permite a instalação de grandes complexos geradores de energia convencionais, incluindo hidrelétricas, termelétricas e parques eólicos.",
        valor: 7000,
        edifíciosLiberados: ["Usina Hidrelétrica", "Parque Eólico", "Usina Termolétrica"],
        status: false
      },
      {
        nome: "Licença De Usinas Nucleares",
        desc: "Concede autorização para construção e operação de usinas nucleares de fissão e fusão, representando o ápice da tecnologia energética no jogo.",
        valor: 7000,
        edifíciosLiberados: ["Reator Nuclear Convencional", "Usina De Fusão Nuclear"],
        status: false
      }
      ],
      edificios: [
        {
          nome: "Subestação De Energia",
          desc: "Distribui energia entre usinas e cidades.",
          licençaLiberado: {
            licença: "Licença Global De Energia",
            liberado: false,
          },
          custoConstrucao: 40000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 350,
            impostoFixo: 300000,
            impostoSobreFatu: 0.050000,
            rent: 3
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 2,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Rede De Distribuição Elétrica",
          desc: "Transporta eletricidade para todas as estruturas.",
          licençaLiberado: {
            licença: "Licença Global De Energia",
            liberado: false,
          },
          custoConstrucao: 240000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 500,
            impostoFixo: 500000,
            impostoSobreFatu: 0.050000,
            rent: 3
          },

          lojasNecessarias: {
            terrenos: 40,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Usina Solar",
          desc: "Gera energia limpa através da luz solar.",
          licençaLiberado: {
            licença: "Licença Global De Energia",
            liberado: false,
          },
          custoConstrucao: 280000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 3000,
            impostoFixo: 500000,
            impostoSobreFatu: 0.080000,
            rent: 17
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },

        {
          nome: "Centro De Pesquisa Energética",
          desc: "Desenvolve novas tecnologias energéticas.",
          licençaLiberado: {
            licença: "Licença De Melhoria Energética",
            liberado: false,
          },
          custoConstrucao: 300000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 1000,
            impostoFixo: 1000000,
            impostoSobreFatu: 0.050000,
            rent: 3
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Centro De Baterias Recicláveis",
          desc: "Recicla baterias para produção sustentável.",
          licençaLiberado: {
            licença: "Licença De Melhoria Energética",
            liberado: false,
          },
          custoConstrucao: 150000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 800,
            impostoFixo: 5000000,
            impostoSobreFatu: 0.050000,
            rent: 1
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Estação De Carregamento",
          desc: "Fornece carregamento para veículos elétricos.",
          licençaLiberado: {
            licença: "Licença De Melhoria Energética",
            liberado: false,
          },
          custoConstrucao: 120000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 1,
            lojasP: 1,
            lojasM: 0,
            lojasG: 0,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },

        {
          nome: "Usina Termelétrica A Biocombustíveis",
          desc: "Produz energia a partir de biocombustíveis.",
          licençaLiberado: {
            licença: "Licença De Energia Sustentável",
            liberado: false,
          },
          custoConstrucao: 160000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 12000,
            impostoFixo: 2000000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Usina De Biomassa",
          desc: "Transforma resíduos orgânicos em energia.",
          licençaLiberado: {
            licença: "Licença De Energia Sustentável",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Usina Hidrelétrica",
          desc: "Gera eletricidade a partir de rios e represas.",
          licençaLiberado: {
            licença: "Licença De Usinas",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Parque Eólico",
          desc: "Produz energia eólica através de turbinas.",
          licençaLiberado: {
            licença: "Licença De Usinas",
            liberado: false,
          },
          custoConstrucao: 140000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 4200,
            impostoFixo: 750000,
            impostoSobreFatu: 0.080000,
            rent: 16
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Usina Termolétrica",
          desc: "Gera energia a partir da queima de combustíveis.",
          licençaLiberado: {
            licença: "Licença De Usinas",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Reator Nuclear Convencional",
          desc: "Produz energia nuclear de forma convencional.",
          licençaLiberado: {
            licença: "Licença De Usinas Nucleares",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Usina De Fusão Nuclear",
          desc: "Gera energia limpa através de fusão nuclear.",
          licençaLiberado: {
            licença: "Licença De Usinas Nucleares",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          finanças: {
            faturamentoUnitário: 2000,
            impostoFixo: 1000,
            impostoSobreFatu: 0.10000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: [],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          ForneceMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],
          RecebeMelhoraEficiencia: [
            {
              nome: "Plantação De Vegetais",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Biofábrica",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Mercado",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
            {
              nome: "Feira Livre",
              redCusto: {
                nível1: 1,
                nível2: 2,
                nível3: 4,
              },
              aumFatu: {
                nível1: 1,
                nível2: 2,
                nível3: 4
              }
            },
          ],

          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        }
      ],
    },
    grafico: {
      economiaSetor: {
        estadoAtual: "aquecida"
      },
      licençaGlobal: {
        comprado: true,
        valor: 20000
      },
      licençasSetor: {

      },
      produtos: {
        plantaçãoDeGrãos: {
          quantidade: 60,
          lojasNecessárias: {
            terrenos: 20,
            lojasP: 1,
            lojasM: 0,
            lojasG: 0,
          },

          construçõesNecessárias: [],

          licençasNecessárias: [{ construção: "fazendaAdministrativa" }],

          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          receitas: [
            { construção: "depósitoDeResíduosOrgânicos", quantidade: 0 }
          ],

          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],

          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 10, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 50, impacto: 15 },
          }
        }
      }
    },
    carteira: {
      economiaSetor: {
        estadoAtual: "estável"
      },
      licençaGlobal: {
        comprado: true,
        valor: 20000
      },
      licençasSetor: {

      },
      produtos: {
        plantaçãoDeGrãos: {
          quantidade: 60,
          lojasNecessárias: {
            terrenos: 20,
            lojasP: 1,
            lojasM: 0,
            lojasG: 0,
          },

          construçõesNecessárias: [],

          licençasNecessárias: [{ construção: "fazendaAdministrativa" }],

          melhoraEficiencia: [
            "Fábrica De Ração",
            "Biofábrica",
            "Mercado",
            "Feira Livre",
          ],

          receitas: [
            { construção: "depósitoDeResíduosOrgânicos", quantidade: 0 }
          ],

          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],

          powerUp: {
            redCustoAtual: 0,
            aumFatuAtual: 0,
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 10, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 50, impacto: 15 },
          }
        }
      }
    },

  });

  const atualizarDados = (chave, novoValor) => {
    setDados(prevState => ({
      ...prevState,
      [chave]: novoValor
    }));
  };

  const atualizarDadosProf = (caminho, novoValor) => {
    setDados(prevState => {
      const novosDados = JSON.parse(JSON.stringify(prevState)); // cópia profunda
      let ref = novosDados[dados.setorAtivo];

      for (let i = 0; i < caminho.length - 1; i++) {
        ref = ref[caminho[i]];
      }

      ref[caminho[caminho.length - 1]] = novoValor;

      return {
        ...prevState,
        [dados.setorAtivo]: novosDados[dados.setorAtivo]
      };
    });
  };

  const atualizarDadosProf2 = (caminho, novoValor) => {
    setDados(prevState => {
      const novosDados = JSON.parse(JSON.stringify(prevState)); // cópia profunda
      let ref = novosDados;
  
      for (let i = 0; i < caminho.length - 1; i++) {
        if (!ref[caminho[i]]) {
          console.error(`Caminho inválido em atualizarDadosProf2: ${caminho[i]} está undefined no passo ${i}`);
          return prevState; // Não faz nada e evita quebrar o app
        }
        ref = ref[caminho[i]];
      }
  
      ref[caminho[caminho.length - 1]] = novoValor;
  
      return novosDados;
    });
  }
  
  const atualizarDadosProf3 = (caminho, novoValor) => {
    setDados(prevState => {
      const novosDados = JSON.parse(JSON.stringify(prevState)); // cópia profunda
      let ref = novosDados;

      for (let i = 0; i < caminho.length - 1; i++) {
        console.log(`Ref antes do passo ${i}:`, ref);
        console.log(`Acessando chave:`, caminho[i]);

        if (ref === undefined || ref === null) {
          console.warn(`❌ ERRO: ref é undefined na etapa ${i}, chave: ${caminho[i]}`);
          console.warn(`CAMINHO COMPLETO:`, caminho);
          return prevState; // não altera nada
        }

        ref = ref[caminho[i]];
      }

      const ultimaChave = caminho[caminho.length - 1];
      console.log(`🔧 Atualizando chave final '${ultimaChave}' com valor:`, novoValor);
      ref[ultimaChave] = novoValor;

      return novosDados;
    });
  };



  return (
    <CentraldeDadosContext.Provider value={{ dados, atualizarDados, atualizarDadosProf, atualizarDadosProf2, atualizarDadosProf3 }}>
      {children}
    </CentraldeDadosContext.Provider>
  );
};



export { CentraldeDadosContext, CentraldeDadosProvider };


