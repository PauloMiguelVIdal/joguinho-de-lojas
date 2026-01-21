
export const FORMULAS_EDIFICIOS = [
  {
    edificioId: "fazendaVacas",
    nomeEdificio: "Fazenda De Vacas",
    setor: "agricultura",

    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "reproducao_vacas",
        nome: "Reprodução",
        capacidadePorEdificio: 50,
        duracao: 30,

        input: {
          vaca: 1,
          racaoDeVacas: 2,
        },

        output: {
          vaca: 2,
        },
      },

      {
        id: "abate_vacas",
        nome: "Abate",
        capacidadePorEdificio: 100,
        duracao: 20,

        input: {
          vaca: 1,
        },

        output: {
          couro: 5,
          carneBovina: 300,
        },
      },
    ],
  },


  {
    edificioId: "granjaAves",
    nomeEdificio: "Granja De Aves",
    setor: "agricultura",

    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "reproducao_aves",
        nome: "Reprodução",
        capacidadePorEdificio: 100,
        duracao: 20,

        input: {
          galinha: 20,
          racaoDeAves: 5,
        },

        output: {
          galinha: 60,
        },
      },

      {
        id: "abate_aves",
        nome: "Abate",
        capacidadePorEdificio: 100,
        duracao: 20,

        input: {
          galinha: 1,
        },
        output: {
          frango: 30,
        },
      },
    ],
  },

];


