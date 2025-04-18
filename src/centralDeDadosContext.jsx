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
          edifíciosLiberados: ["Plantação De Grãos","Plantação De Vegetais","Fazenda Administrativa", "Pomares"],
          status: true
        },
        {
          nome: "Licença De Fazendas De Animais",
          desc: "A licença de animais permite a criação de gado, aves e suínos, auxiliando fazendas e indústrias alimentícias no jogo.",
          valor: 5000,
          edifíciosLiberados: ["Fazenda De Vacas", "Granja De Aves", "Criação De Ovinos", "Pomares"],
          status: true
        },
        {
          nome: "Licença De Comércios Agrícolas",
          desc: "A licença de Licença De Comércios Agrícolas.",
          valor: 5000,
          edifíciosLiberados: ["Cooperativa Agrícola", "Centro De Comércio De Plantações", "Pomares"],
          status: true
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
            licença: "Licença De Comércios Agrícolas",
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
        valor: 30000
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
        edifíciosLiberados: ["Centro de Pesquisa Química", "Centro de Pesquisa em fusão nuclear"],
        status: true
      },
      {
        nome: "Licença De Engenharia Avançada",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Centro Ee Pesquisa Em Eletrônicos", "Centro De Pesquisa Aeroespacial"],
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
          liberado: false,
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
          liberado: false,
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
          liberado: false,
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
          nome: "Empresa de Desenvolvimento de Software",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          liberado: false,
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
          liberado: false,
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
          nome: "Centro de Pesquisa em Fusão Nuclear",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          liberado: false,
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
          nome: "Centro de Pesquisa em Eletrônicos",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          liberado: false,
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
          nome: "Centro de Pesquisa Aeroespacial",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          liberado: false,
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
          nome: "Centro de Pesquisa em Robótica",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          liberado: false,
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
          nome: "Centro de Pesquisa em Inteligência Artificial",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          liberado: false,
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
        nome: "Licença Global De Tecnologia",
        desc: "você tem acesso a tecnologias",
        valor: 7000,
        edifíciosLiberados: ["Plantação De Gãos", "Plantação De Vegetais", "Fazenda Administrativa", "Pomares"],
        status: true
      }],
      edificios: [
        {
          nome: "Terraplanagem e Pavimentação",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          liberado: false,
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
        }],
    },
    comercio: {
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
      edificios: [
        {
          nome: "Terraplanagem e Pavimentação",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          liberado: true,
          custoConstrucao: 200000,
          quantidade: 520,
          financas: {
            fatuMensal: 20000,
            impostoFixo: 1000,
            rent: 32
          },

          lojasNecessarias: {
            terrenos: 5,
            lojasP: 5,
            lojasM: 5,
            lojasG: 5,
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
            nível2: { status: true, quantidadeMínima: 200, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        }],
    },
    imobiliario: {
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
        biofábrica: true,
        biofábrica: true,
        biofábrica: true,
        biofábrica: true,
        biofábrica: true,
        biofábrica: true,
      },
      edificios: [
        {
          nome: "Terraplanagem e Pavimentação",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          liberado: true,
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
        }],
    },
    energia: {
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
      edificios: [
        {
          nome: "Terraplanagem e Pavimentação",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          liberado: true,
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
        }],
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

  return (
    <CentraldeDadosContext.Provider value={{ dados, atualizarDados }}>
      {children}
    </CentraldeDadosContext.Provider>
  );
};



export { CentraldeDadosContext, CentraldeDadosProvider };