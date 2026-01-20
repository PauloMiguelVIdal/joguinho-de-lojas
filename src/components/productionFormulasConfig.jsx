
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
        capacidadePorEdificio: 2,
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
        capacidadePorEdificio: 5,
        duracao: 3,

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

];


