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
    saldo: 12000000000,
    dia: 19,
    chanceNovoEvento: 0,
    economiaGlobal: "recessão",
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
      preçoConstrução: 70000,
      faturamentoUnitário: 200,
      faturamentoUnitárioPadrão: 200,
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
      quantidade: 3,
      quantidadeNecTerreno: 1,
      preçoConstrução: 50000,
      faturamentoUnitário: 1100,
      faturamentoUnitárioPadrão: 1100,
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
      quantidade: 5,
      quantidadeNecTerreno: 2,
      preçoConstrução: 100000,
      faturamentoUnitário: 2700,
      faturamentoUnitárioPadrão: 3300,
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
      quantidade: 8,
      quantidadeNecTerreno: 3,
      preçoConstrução: 240000,
      faturamentoUnitário: 8000,
      faturamentoUnitárioPadrão: 6500,
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
      economiaGlobal: {
        estadoAtual: "estável"
      },
      licençaGlobal: {
        comprado: true,
        valor: 20000
      },
      licençasSetor: [
        {
          nome: "Licença Global De Agricultura",
          desc: "você tem acesso a agricultura",
          valor: 2000,
          edifíciosLiberados: ["Plantação De Grãos", "Plantação De Vegetais", "Fazenda Administrativa", "Pomares"],
          status: false
        }
        ,
        {
          nome: "Licença De Comércios Agrícolas",
          desc: "A licença de Licença De Comércios Agrícolas.",
          valor: 3000,
          edifíciosLiberados: ["Cooperativa Agrícola", "Centro De Comércio De Plantações"],
          status: false
        }
        ,
        {
          nome: "Licença De Fazendas De Animais",
          desc: "A licença de animais permite a criação de gado, aves e suínos, auxiliando fazendas e indústrias alimentícias no jogo.",
          valor: 2500,
          edifíciosLiberados: ["Fazenda De Vacas", "Granja De Aves", "Criação De Ovinos"],
          status: false
        }
        ,
        {
          nome: "Licença De Armazenamentos Agrícolas",
          desc: "A licença de animais permite a criação de gado, aves e suínos, auxiliando fazendas e indústrias alimentícias no jogo.",
          valor: 3200,
          edifíciosLiberados: ["Armazém", "Silo", "Depósito De Resíduos Orgânicos"],
          status: false
        }
        ,
        {
          nome: "Licença De Áreas Especiais",
          desc: "A licença de animais permite a criação de gado, aves e suínos, auxiliando fazendas e indústrias alimentícias no jogo.",
          valor: 6200,
          edifíciosLiberados: ["Madeireira", "Área Florestal", "Terreno De Mineração"],
          status: false
        }
        ,
        {
          nome: "Licença De Outras Plantações",
          desc: "A licença de animais permite a criação de gado, aves e suínos, auxiliando fazendas e indústrias alimentícias no jogo.",
          valor: 5300,
          edifíciosLiberados: [
            "Plantação De Eucalipto",
            "Plantação De Plantas Medicinais"
          ],
          status: false
        }
      ],






      edificios: [
        {
          nome: "Plantação De Grãos",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença Global De Agricultura",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 1,
            lojasM: 2,
            lojasG: 1,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },

          }
        },


        {
          nome: "Plantação De Vegetais",
          desc: "Cultive vegetais para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença Global De Agricultura",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 1,
            lojasM: 2,
            lojasG: 1,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
          melhoraEficiencia: [
            "Supermercado",
            "Feira",
            "Restaurante",
            "Redes de Fast-Food",
            "Petshop",
          ],
          recursoDeConstrução: []
          ,
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },


        {
          nome: "Pomares",
          desc: "Cultive frutas para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença Global De Agricultura",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 1,
            lojasM: 2,
            lojasG: 1,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
          melhoraEficiencia: [
            "Supermercado",
            "Feira",
            "Restaurante",
            "Redes de Fast-Food",
            "Fábrica de Bebidas",
            "Usina de Biomassa",
            "Refinaria de Biocombustíveis",
          ],
          recursoDeConstrução: []
          ,
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },


        {
          nome: "Fazenda Administrativa",
          desc: "Administre as suas fazendas e faça melhores negócios!",
          licençaLiberado: {
            licença: "Licença Global De Agricultura",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 1,
            lojasM: 2,
            lojasG: 1,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
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
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },


        {
          nome: "Cooperativa Agrícola",
          desc: "Cultive vegetais para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Comércios Agrícolas",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 6,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 1,
            lojasM: 2,
            lojasG: 1,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
          melhoraEficiencia: [
            "Supermercado",
            "Feira",
            "Restaurante",
            "Redes de Fast-Food",
            "Petshop",
          ],
          recursoDeConstrução: []
          ,
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },


        {
          nome: "Centro De Comércio De Plantações",
          desc: "Cultive vegetais para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Comércios Agrícolas",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 1,
            lojasM: 2,
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
            "Plantação de Eucalipto",
            "Plantação De Plantas Medicinais",
            "Supermercado",
            "Feira",
            "Fábrica de Rações",
            "Restaurante",
            "Usina de Biomassa",
          ],
          recursoDeConstrução: []
          ,
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },





        {
          nome: "Armazém",
          desc: "Armazene para obter melhores ofertas!",
          licençaLiberado: {
            licença: "Licença De Armazenamentos Agrícolas",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 3,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 1,
            lojasM: 2,
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
            "Plantação de Eucalipto",
            "Plantação De Plantas Medicinais",
            "Supermercado",
            "Feira",
            "Fábrica de Rações",
            "Restaurante",
            "Usina de Biomassa",
          ],
          recursoDeConstrução: []
          ,
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },


        {
          nome: "Silo",
          desc: "Armazene para obter melhores ofertas!",
          licençaLiberado: {
            licença: "Licença De Armazenamentos Agrícolas",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 1,
            lojasM: 2,
            lojasG: 1,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
          melhoraEficiencia: [
            "Cooperativa Agrícola",
            "Fábrica De Rações",
            "Usina De Biomassa",
            "Refinaria De Biocombustíveis",
          ],
          recursoDeConstrução: []
          ,
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },


        {
          nome: "Depósito De Resíduos Orgânicos",
          desc: "Armazene para obter melhores ofertas!",
          licençaLiberado: {
            licença: "Licença De Armazenamentos Agrícolas",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 1,
            lojasM: 2,
            lojasG: 1,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
          melhoraEficiencia: [
            "Usina de Biomassa",
            "Refinaria de Biocombustíveis",
            "Fábrica de Fertilizantes",
          ],
          recursoDeConstrução: []
          ,
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },


        {
          nome: "Fazenda De Vacas",
          desc: "Armazene para obter melhores ofertas!",
          licençaLiberado: {
            licença: "Licença De Fazendas De Animais",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 1,
            lojasM: 2,
            lojasG: 1,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
          melhoraEficiencia: [
            "Supermercado",
            "Açougue",
            "Feira",
            "Restaurante",
            "Redes de Fast-Food",
            "Padaria",
            "Fábrica De Pães",
            "Usina de Biomassa",
            "Fábrica de Fertilizantes",
          ],
          recursoDeConstrução: []
          ,
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },


        {
          nome: "Granja De Aves",
          desc: "Armazene para obter melhores ofertas!",
          licençaLiberado: {
            licença: "Licença De Fazendas De Animais",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 1,
            lojasM: 2,
            lojasG: 1,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
          melhoraEficiencia: [
            "Supermercado",
            "Açougue",
            "Feira",
            "Restaurante",
            "Redes De Fast-Food",
            "Fábrica De Rações",
            "Petshop",
            "Usina de Biomassa",
          ],
          recursoDeConstrução: []
          ,
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },


        {
          nome: "Criação De Ovinos",
          desc: "Armazene para obter melhores ofertas!",
          licençaLiberado: {
            licença: "Licença De Fazendas De Animais",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 1,
            lojasM: 2,
            lojasG: 1,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
          melhoraEficiencia: [
            "Supermercado",
            "Açougue",
            "Feira",
            "Restaurante",
            "Redes de Fast-Food",
            "Fábrica de Rações",
            "Petshop",
            "Usina de Biomassa",
          ],
          recursoDeConstrução: []
          ,
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },


        {
          nome: "Madeireira",
          desc: "Armazene para obter melhores ofertas!",
          licençaLiberado: {
            licença: "Licença De Áreas Especiais",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 1,
            lojasM: 2,
            lojasG: 1,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
          melhoraEficiencia: [
            "Fábrica de Móveis",
            "Fábrica de Celulose",
            "Fábrica de Estruturas Metálicas",
            "Fábrica de Embalagens",
          ],
          recursoDeConstrução: []
          ,
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },


        {
          nome: "Área Florestal",
          desc: "Armazene para obter melhores ofertas!",
          licençaLiberado: {
            licença: "Licença De Áreas Especiais",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 1,
            lojasM: 2,
            lojasG: 1,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
          melhoraEficiencia: [
            "Madeireira",
            "Plantação De Eucalipto",
            "Plantação De Plantas Medicinais",
          ],
          recursoDeConstrução: []
          ,
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },


        {
          nome: "Terreno De Mineração",
          desc: "Armazene para obter melhores ofertas!",
          licençaLiberado: {
            licença: "Licença De Áreas Especiais",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 1,
            lojasM: 2,
            lojasG: 1,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
          melhoraEficiencia: [
            "Mineradora",
            "Mineradora De Pedras Preciosas",
            "Mineradora de Minérios Radioativos",
            "Alto-Forno",
          ],
          recursoDeConstrução: []
          ,
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },


        {
          nome: "Plantação De Eucalipto",
          desc: "Armazene para obter melhores ofertas!",
          licençaLiberado: {
            licença: "Licença De Outras Plantações",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 1,
            lojasM: 2,
            lojasG: 1,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
          melhoraEficiencia: [
            "Fábrica de Celulose",
            "Madeireira",
            "Fábrica de Papel",
            "Granja De Aves",
            "Criação De Ovinos",
            "Plantação de Eucalipto",
            "Plantação De Plantas Medicinais",
            "Supermercado",
            "Feira",
            "Fábrica de Rações",
            "Restaurante",
            "Usina de Biomassa",
          ],
          recursoDeConstrução: []
          ,
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },


        {
          nome: "Plantação De Plantas Medicinais",
          desc: "Armazene para obter melhores ofertas!",
          licençaLiberado: {
            licença: "Licença De Outras Plantações",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 0,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 1,
            lojasM: 2,
            lojasG: 1,
          },
          construçõesNecessárias: [],
          licençasNecessárias: [],
          melhoraEficiencia: [
            "Fábrica De Produtos Químicos Especializados",
            "Farmácias",
          ],
          recursoDeConstrução: []
          ,
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
            nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
            nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
          }
        },
      ],
    }
    ,




    tecnologia: {
      economiaGlobal: {
        estadoAtual: "estável"
      },
      licençaGlobal: {
        comprado: true,
        valor: 20000
      },
      licençasSetor: [{
        nome: "Licença Global De Tecnologia",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Servidor Em Nuvem", "Data Centers", "Startups", "Empresa De Desenvolvimento De Software"],
        status: true
      },
      {
        nome: "Licença De Tecnologia Experimental",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Centro de Pesquisa Química", "Centro De Pesquisa Em Fusão Nuclear"],
        status: true
      },
      {
        nome: "Licença De Engenharia Avançada",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Centro De Pesquisa Em Eletrônicos", "Centro De Pesquisa Aeroespacial"],
        status: true
      },
      {
        nome: "Licença De Pesquisa Em Robótica e IA",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Centro De Pesquisa Em Robótica", "Centro De Pesquisa Em Inteligência Artificial"],
        status: true
      }
      ],



      edificios: [
        {
          nome: "Servidor Em Nuvem",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença Global De Tecnologia",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
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
          recursoDeConstrução: [],
          dependências: [],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Data Centers",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença Global De Tecnologia",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
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
          recursoDeConstrução: [],
          dependências: [],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Startups",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença Global De Tecnologia",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
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
          recursoDeConstrução: [],
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        }
        ,
        {
          nome: "Empresa De Desenvolvimento De Software",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença Global De Tecnologia",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
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
          recursoDeConstrução: [],
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        }
        ,
        {
          nome: "Centro de Pesquisa Química",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Tecnologia Experimental",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
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
          recursoDeConstrução: [],
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        }
        ,
        {
          nome: "Centro De Pesquisa Em Fusão Nuclear",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Tecnologia Experimental",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
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
          recursoDeConstrução: [],
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        }
        ,
        {
          nome: "Centro De Pesquisa Em Eletrônicos",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Engenharia Avançada",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
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
          recursoDeConstrução: [],
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        }
        ,
        {
          nome: "Centro De Pesquisa Aeroespacial",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Engenharia Avançada",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
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
          recursoDeConstrução: []
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        }
        ,
        {
          nome: "Centro De Pesquisa Em Robótica",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Pesquisa Em Robótica e IA",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
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
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        }
        ,
        {
          nome: "Centro De Pesquisa Em Inteligência Artificial",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Pesquisa Em Robótica e IA",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "Fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        }

      ],



    },
    industria: {
      economiaGlobal: {
        estadoAtual: "estável"
      },
      licençaGlobal: {
        comprado: true,
        valor: 20000
      },
      licençasSetor: [{
        nome: "Licença Global De Indústria",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Fábrica De Móveis", "Fábrica De Rações", "Fábrica De Embalagem"],
        status: true
      },
      {
        nome: "Licença De Fábricas Simples",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Fábrica De Fertilizante", "Fábrica De Bebidas", "Fábrica De Pães"],
        status: true
      }
        ,
      {
        nome: "Licença De Fábricas Energéticas",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Fábrica De Turbinas Eólicas", "Fábrica De Painéis Solares", "Fábrica De Baterias"],
        status: true
      }
        ,
      {
        nome: "Licença De Papel E Celulose",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Fábrica De Celulose", "Fábrica De Papel", "Fábrica De Lívros"],
        status: true
      }
        ,
      {
        nome: "Licença De Base Metalúrgica",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Alto-Forno", "Usina Siderúrgica", "Fundição de Alumínio", "Fábrica De Ligas Metálicas"],
        status: true
      }
        ,
      {
        nome: "Licença De Metalúrgia Avançada",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Indústria De Componentes Mecânicos", "Fábrica De Chapas Metálicas", "Fábrica De Estruturas Metálicas"],
        status: true
      }
        ,
      {
        nome: "Licença Automotiva",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Fábrica De Peças Automotivas", "Montadora De Veículos Elétricos", "Fábricas De Automóveis"],
        status: true
      }
        ,
        {
          nome: "Licença de Refinaria",
          desc: "Você tem acesso a tecnologias",
          valor: 7000,
          edifíciosLiberados: ["Refinaria de Biocombustíveis", "Refinaria", "Biofábrica"],
          status: true
        },
        {
          nome: "Licença De Engenharia Mecânica Avançada",
          desc: "você tem acesso a tecnologias",
          valor: 7000,
          edifíciosLiberados: ["Fábrica De Motores", "Fábrica De Foguetes", "Fábrica De Aeronaves", "Fábrica De Návios"],
          status: true
        }
        ,
        {
          nome: "Licença De Eletrônica Avançada",
          desc: "você tem acesso a tecnologias",
          valor: 7000,
          edifíciosLiberados: ["Fábricas De Eletrônicos", "Fábricas De Semicondutores", "Fábricas De Robôs", "Empresa De Automação Industrial"],
          status: true
        }

      ],
      edificios: [
        {
          nome: "Fábrica De Móveis",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença Global De Indústria",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Rações",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença Global De Indústria",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Embalagem",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença Global De Indústria",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Fertilizante",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Fábricas Simples",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Bebidas",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Fábricas Simples",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Pães",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Fábricas Simples",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Turbinas Eólicas",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Fábricas Energéticas",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Painéis Solares",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Fábricas Energéticas",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Baterias",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Fábricas Energéticas",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Celulose",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Papel E Celulose",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },

        {
          nome: "Fábrica De Papel",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Papel E Celulose",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Lívros",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Papel E Celulose",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Alto-Forno",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Base Metalúrgica",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },

        {
          nome: "Usina Siderúrgica",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Base Metalúrgica",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fundição de Alumínio",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Base Metalúrgica",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Ligas Metálicas",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Base Metalúrgica",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Indústria De Componentes Mecânicos",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Metalúrgia Avançada",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Chapas Metálicas",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Metalúrgia Avançada",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Estruturas Metálicas",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Metalúrgia Avançada",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Peças Automotivas",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença Automotiva",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Montadora De Veículos Elétricos",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença Automotiva",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábricas De Automóveis",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença Automotiva",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        
        {
          nome: "Refinaria de Biocombustíveis",
          desc: "Cultive grãos para alimentar, vender ou trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença de Refinaria",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },
          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação de Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação de Vegetais"],
          melhoraEficiencia: ["Fábrica de Ração", "Biofábrica", "Mercados", "Feiras"],
          recursoDeConstrução: ["Plantação de Vegetais", "Silo"],
          dependências: [
            { construção: "Fazenda Administrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Refinaria",
          desc: "Cultive grãos para alimentar, vender ou trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença de Refinaria",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },
          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação de Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação de Vegetais"],
          melhoraEficiencia: ["Fábrica de Ração", "Biofábrica", "Mercados", "Feiras"],
          recursoDeConstrução: ["Plantação de Vegetais", "Silo"],
          dependências: [
            { construção: "Fazenda Administrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Biofábrica",
          desc: "Cultive grãos para alimentar, vender ou trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença de Refinaria",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },
          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação de Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação de Vegetais"],
          melhoraEficiencia: ["Fábrica de Ração", "Biofábrica", "Mercados", "Feiras"],
          recursoDeConstrução: ["Plantação de Vegetais", "Silo"],
          dependências: [
            { construção: "Fazenda Administrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Motores",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Engenharia Mecânica Avançada",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Foguetes",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Engenharia Mecânica Avançada",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Aeronaves",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Engenharia Mecânica Avançada",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábrica De Návios",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Engenharia Mecânica Avançada",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábricas De Eletrônicos",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Eletrônica Avançada",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Fábricas De Semicondutores",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Eletrônica Avançada",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },{
          nome: "Fábricas De Robôs",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Eletrônica Avançada",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },{
          nome: "Empresa De Automação Industrial",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Eletrônica Avançada",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
      ],
    },
    comercio: {
      economiaGlobal: {
        estadoAtual: "estável"
      },
      licençaGlobal: {
        comprado: true,
        valor: 20000
      },
      licençasSetor: [{
        nome: "Licença Global De Comércio",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Feiras Livres", "Loja De Móveis", "Restaurantes", "Livraria"],
        status: true
      },
      {
        nome: "Licença De Comércio Local",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Mercado", "Adega", "Padaria", "Açougue"],
        status: true
      },
      {
        nome: "Licença De Varejo",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Loja De Conveniência", "Posto De Gasolina"],
        status: true
      },
      {
        nome: "Licença De Comércio Urbano",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Redes De Fast-food", "Loja De Eletrônicos", "Joalheria", "Concessionária De Veículos"],
        status: true
      }
      ,
      {
        nome: "Licença De Serviços E Saúde",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Petshop", "Farmácias", "Cafeteria"],
        status: true
      }
      ,
      {
        nome: "Licença De Varejo Especializado",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Loja De Departamentos", "Loja De Calçados", "Loja De Vestuário"],
        status: true
      }
      ,
      {
        nome: "Licença De Shoppings",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Shoppings Popular", "Shoppings Centers"],
        status: true
      }
      ,
      {
        nome: "Licença De Logística E Transporte",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Centros de distribuição", "Armazéns Logísticos", "Transporte Petrolífero"],
        status: true
      }
      ]
      
      ,
      edificios: [
        {
          nome: "Feiras Livres",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença Global De Comércio",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Loja De Móveis",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença Global De Comércio",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Restaurantes",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença Global De Comércio",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Livraria",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença Global De Comércio",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Mercado",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Comércio Local",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Adega",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Comércio Local",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Padaria",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Comércio Local",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Açougue",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Comércio Local",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Loja De Conveniência",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Varejo",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Posto De Gasolina",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Varejo",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Redes De Fast-food",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Comércio Urbano",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Loja De Eletrônicos",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Comércio Urbano",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Joalheria",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Comércio Urbano",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Concessionária De Veículos",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Comércio Urbano",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Petshop",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Serviços E Saúde",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Farmácias",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Serviços E Saúde",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Cafeteria",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Serviços E Saúde",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Loja De Departamentos",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Varejo Especializado",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Loja De Calçados",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Varejo Especializado",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Loja De Vestuário",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Varejo Especializado",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Shoppings Popular",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Shoppings",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Shoppings Centers",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Shoppings",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Centros de distribuição",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Logística E Transporte",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Armazéns Logísticos",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Logística E Transporte",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Transporte Petrolífero",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Logística E Transporte",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
      ],
    },
    imobiliario: {
      economiaGlobal: {
        estadoAtual: "estável"
      },
      licençaGlobal: {
        comprado: true,
        valor: 20000
      },
      licençasSetor: [{
        nome: "Licença Global Imobiliária",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Construtora", "Cartório E Licenças", "Terraplanagem E Pavimentação"],
        status: true
      },
      {
        nome: "Licença De Grandes Infraestruturas",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Construtora De Grandes Infraestruturas", "Aeroportos", "Porto"],
        status: true
      },
      {
        nome: "Licença De Mineração",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Mineradora", "Mineradora De Minérios Radioativos", "Mineradora De Pedras Preciosas"],
        status: true
      },
      {
        nome: "Licença Comercial E Residencial",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Mega Mercados", "Prédio de alto padrão"],
        status: true
      }
      ,
      {
        nome: "Licença De Construções Energéticas",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Centro De Coleta De Biomassa", "Tanque De Armazenamento De Biocombustíveis", "Plataforma De Petróleo"],
        status: true
      }

      ],
      edificios: [
        {
          nome: "Construtora",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença Global Imobiliária",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Cartório E Licenças",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença Global Imobiliária",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Terraplanagem E Pavimentação",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença Global Imobiliária",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Construtora De Grandes Infraestruturas",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Grandes Infraestruturas",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Aeroportos",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Grandes Infraestruturas",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Porto",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Grandes Infraestruturas",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Mineradora",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Mineração",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Mineradora De Minérios Radioativos",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Mineração",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Mineradora De Pedras Preciosas",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Mineração",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Mega Mercados",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença Comercial E Residencial",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Prédio de alto padrão",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença Comercial E Residencial",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Centro De Coleta De Biomassa",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Construções Energéticas",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Tanque De Armazenamento De Biocombustíveis",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Construções Energéticas",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Plataforma De Petróleo",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Construções Energéticas",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },

      ],
    },
    energia: {
      economiaGlobal: {
        estadoAtual: "estável"
      },
      licençaGlobal: {
        comprado: true,
        valor: 20000
      },
      licençasSetor: [{
        nome: "Licença Global De Energia",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Subestação De Energia", "Rede De Distribuição Elétrica", "Usinas Solares"],
        status: true
      }
      ,
      {
        nome: "Licença De Melhoria Energética",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Centro De Pesquisa Em Eficiência Energética", "Centro De Reciclagem De Baterias", "Estação De Carregamento De Veículos Elétricos"],
        status: true
      }
      ,
      {
        nome: "Licença De Energia Sustentável",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Usina Termelétrica Movida A Biocombustíveis", "Usina De Biomassa"],
        status: true
      }
      ,
      {
        nome: "Licença De Usinas",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Usina Hidrelétrica", "Parque Eólico", "Usina Termelétrica"],
        status: true
      }
      ,
      {
        nome: "Licença De Usinas Nucleares",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Reator Nuclear Convencional", "Usina De Fusão Nuclear"],
        status: true
      }

      ],
      edificios: [
        {
          nome: "Subestação De Energia",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença Global De Energia",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Rede De Distribuição Elétrica",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença Global De Energia",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Usinas Solares",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença Global De Energia",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        }, 
       
        {
          nome: "Centro De Pesquisa Em Eficiência Energética",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Melhoria Energética",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        }, 
        {
          nome: "Centro De Reciclagem De Baterias",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Melhoria Energética",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        }, 
        {
          nome: "Estação De Carregamento De Veículos Elétricos",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Melhoria Energética",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
       
        {
          nome: "Usina Termelétrica Movida A Biocombustíveis",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Energia Sustentável",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },  
        {
          nome: "Usina De Biomassa",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Energia Sustentável",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },  
        {
          nome: "Usina Hidrelétrica",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Usinas",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },
        {
          nome: "Parque Eólico",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Usinas",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },  
        {
          nome: "Usina Termelétrica",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Usinas",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },  
        {
          nome: "Reator Nuclear Convencional",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Usinas Nucleares",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        },  
        {
          nome: "Usina De Fusão Nuclear",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Usinas Nucleares",
            liberado: false,
          },
          custoConstrucao: 200000,
          quantidade: 20,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 20,
            lojasP: 21,
            lojasM: 32,
            lojasG: 321,
          },
          construçõesNecessárias: ["Plantação De Vegetais", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Vegetais"],
          melhoraEficiencia: [
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Vegetais", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        }      
      ],
    },
    grafico: {
      economiaGlobal: {
        estadoAtual: "estável"
      },
      licençaGlobal: {
        comprado: true,
        valor: 20000
      },
      licençasSetor: {
        agropecuária: true,
        grãos: false,
        biofábrica: true,
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
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],

          receitas: [
            { construção: "depósitoDeResíduosOrgânicos", quantidade: 0 }
          ],

          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],

          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 10, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 50, impacto: 15 },
          }
        }
      }
    },
    carteira: {
      economiaGlobal: {
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
            "fabrica De Ração",
            "biofábrica",
            "mercados",
            "feiras",
          ],

          receitas: [
            { construção: "depósitoDeResíduosOrgânicos", quantidade: 0 }
          ],

          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 0 }
          ],

          powerUp: {
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




  return (
    <CentraldeDadosContext.Provider value={{ dados, atualizarDados, atualizarDadosProf }}>
      {children}
    </CentraldeDadosContext.Provider>
  );
};



export { CentraldeDadosContext, CentraldeDadosProvider };