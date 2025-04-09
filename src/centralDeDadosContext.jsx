import React, { useState, createContext } from 'react';

const CentraldeDadosContext = createContext();

const CentraldeDadosProvider = ({ children }) => {

  const [dados, setDados] = useState({
    ofertas: {},
    inicioGame: {
      estadoModal: true,
      nomeEmpresa: ""
    },
    setorAtivo: "tecnologia",
    fimGame: false,
    nomeEmpresa: "",
    saldo: 12000000,
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
      quantidade: 10,
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
      licencaGlobal: {
        comprado: true,
        valor: 20000
      },
      licencasSetor: [{
        nome: "Licença Agricultura Global",
        valor: 2000,
        edifíciosLiberados: ["Plantações De Gãos", "Plantações De Legumes", "Fazenda Administrativa", "Pomares"]
      }, {
        nome: "Licença De Fazendas De Animais",
        valor: 5000,
        edifíciosLiberados: ["Fazenda De Vacas", "Granja De Aves", "Criação De Ovinos"],
        status: false
      }],
      edificios: [
        {
          nome: "Plantação De Grãos",
          desc: "Cultive grãos para alimentar, vender  trocar no jogo. Planeje e colha!",
          licençaLiberado: {
            licença: "Licença De Agricultura",
            liberado: false,
          },

          custoConstrucao: 200000,
          quantidade: 1,
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
          construçõesNecessárias: ["Plantação De Legumes", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Legumes"],
          melhoraEficiencia: [
            "fabricaDeRação",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Legumes", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 1 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        }, {
          nome: "Fazenda De Vacas",
          desc: "Tenha fazenda de vacas",
          licençaLiberado: {
            licença: "Licença De Fazendas De Animais",
            liberado: false,
          },

          custoConstrucao: 200000,
          quantidade: 510,
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
          construçõesNecessárias: ["Plantação De Legumes", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Legumes"],
          melhoraEficiencia: [
            "fabricaDeRação",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Legumes", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 1 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        }],
    }
    ,
    tecnologia: {
      economiaGlobal: {
        estadoAtual: "estável"
      },
      licencaGlobal: {
        comprado: true,
        valor: 30000
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
          construçõesNecessárias: ["Plantação De Legumes", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Legumes"],
          melhoraEficiencia: [
            "fabricaDeRação",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Legumes", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 1 }
          ],
          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
          }
        }],
    },
    industria: {
      economiaGlobal: {
        estadoAtual: "estável"
      },
      licencaGlobal: {
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
          construçõesNecessárias: ["Plantação De Legumes", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Legumes"],
          melhoraEficiencia: [
            "fabricaDeRação",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Legumes", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 1 }
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
      licencaGlobal: {
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
          construçõesNecessárias: ["Plantação De Legumes", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Legumes"],
          melhoraEficiencia: [
            "fabricaDeRação",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Legumes", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 1 }
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
      licencaGlobal: {
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
          construçõesNecessárias: ["Plantação De Legumes", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Legumes"],
          melhoraEficiencia: [
            "fabricaDeRação",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Legumes", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 1 }
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
      licencaGlobal: {
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
          construçõesNecessárias: ["Plantação De Legumes", "Silo"],
          licençasNecessárias: ["Silo", "Plantação De Legumes"],
          melhoraEficiencia: [
            "fabricaDeRação",
            "biofábrica",
            "mercados",
            "feiras",
          ],
          recursoDeConstrução: ["Plantação De Legumes", "Silo"]
          ,
          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 1 }
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
      licencaGlobal: {
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
            "fabricaDeRação",
            "biofábrica",
            "mercados",
            "feiras",
          ],

          receitas: [
            { construção: "depósitoDeResíduosOrgânicos", quantidade: 1 }
          ],

          dependências: [
            { construção: "fazendaAdministrativa", quantidade: 1 }
          ],

          powerUp: {
            nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
            nível2: { status: true, quantidadeMínima: 10, impacto: 10 },
            nível3: { status: true, quantidadeMínima: 50, impacto: 15 },
          }
        }
      }
    },
    // indústria: {
    //   licencaGlobal: true,
    //   licençasSetor: {
    //     mineração: true,
    //     metalurgia: false,
    //     energiaAvançada: true,
    //   },
    //   produtos: {
    //     fabricaDeAutomóveisEletricosAutonômos: {
    //       quantidade: 1,
    //       preçoConstrução: 100000000,

    //       lojasNecessárias: {
    //         terrenos: 5000,
    //         lojasP: 1000,
    //         lojasM: 100,
    //         lojasG: 200,
    //       },

    //       construçõesNecessárias: [
    //         { construção: "centroDePesquisaEnergética", quantidade: 1 }
    //       ],

    //       licençasNecessárias: ["licençaDeVeiculosAutônomos"],

    //       melhoraEficiencia: [],

    //       receitas: [
    //         { fabricaDeAutomóveis:10 },
    //         { empresaDeInteligênciaArtificial: 1 },
    //         { fábricaDeBaterias: 1 },
    //       ],

    //       dependências: [],

    //       powerUp: {
    //         nível1: { status: true, quantidadeMínima: 1, impacto: {
    //           usinaSolar:{
    //             custoConstrução:-20,
    //             impostoFixo:-20,
    //             fatu:20 
    //           },
    //           fabricaDeBateria:{
    //             custoConstrução:-10,
    //             impostoFixo:-5,
    //             fatu:10 
    //           }
    //         } 
    //       },
    //         nível2: { status: true, quantidadeMínima: 10, impacto:{
    //           usinaSolar:{
    //             custoConstrução:-30,
    //             impostoFixo:-25,
    //             fatu:20 
    //           },
    //           fabricaDeBateria:{
    //             custoConstrução:-15,
    //             impostoFixo:-10,
    //             fatu:15 
    //           }
    //         }  },
    //         nível3: { status: true, quantidadeMínima: 50, impacto:{
    //           usinaSolar:{
    //             custoConstrução:-40,
    //             impostoFixo:-35,
    //             fatu:30 
    //           },
    //           fabricaDeBateria:{
    //             custoConstrução:-25,
    //             impostoFixo:-20,
    //             fatu:25 
    //           }
    //         }  
    //       },
    //       }
    //     }
    //   }
    // }
    // ,
    // relatóriosImpostos: {

    // }
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