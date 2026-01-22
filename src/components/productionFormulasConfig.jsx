import { X } from "lucide-react";

export const FORMULAS_EDIFICIOS = [
  {
    edificioId: "plantaçãoGrãos",
    nomeEdificio: "Plantação De Grãos",
    setor: "agricultura",

    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "plantação_milho",
        nome: "Plantação De Milho",
        capacidadePorEdificio: 1000,
        duracao: 40,

        input: {
          milho: 1000,
          fertilizantePlantação: 10,
        },

        output: {
          milho: 10000,
        },
      },
      {
        id: "plantação_trigo",
        nome: "Plantação De Trigo",
        capacidadePorEdificio: 1000,
        duracao: 40,

        input: {
          trigo: 1000,
          fertilizantePlantação: 10,
        },

        output: {
          trigo: 10000,
        },
      },
      {
        id: "plantação_soja",
        nome: "Plantação De Soja",
        capacidadePorEdificio: 1000,
        duracao: 40,

        input: {
          soja: 1000,
          fertilizantePlantação: 10,
        },
        output: {
          soja: 10000,
        },
      },
      {
        id: "plantação_algodão",
        nome: "Plantação De Algodão",
        capacidadePorEdificio: 1000,
        duracao: 40,

        input: {
          algodão: 1000,
          fertilizantePlantação: 10,
        },

        output: {
          algodão: 10000,
        },
      },
    ],
  },




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
             esterco:20
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
          esterco:2
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
          frango: 5,
        },
      },
    ],
  },

  
  {
    edificioId: "criaçãoOvinos",
    nomeEdificio: "Criação De Ovinos",
    setor: "agricultura",

    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "reproducao_ovinos",
        nome: "Reprodução",
        capacidadePorEdificio: 100,
        duracao: 40,

        input: {
          ovelha: 4,
          racaoDeOvinos: 10,
        },

        output: {
          ovelha: 8,
          esterco:5
        },
      },

      {
        id: "abate_ovinos",
        nome: "Abate",
        capacidadePorEdificio: 100,
        duracao: 20,

        input: {
          ovelha: 1,
        },
        output: {
          carneOvino: 20,
        },
      },
      {
        id: "lã_ovinos",
        nome: "Lã",
        capacidadePorEdificio: 100,
        duracao: 10,
        input: {
          ovelha: 1,
        },
        output: {
          ovelha: 1,
          lã: 1,
        },
      },
    ],
  },




  //industria

  {
    edificioId: "FábricaRações",
    nomeEdificio: "Fábrica De Rações",
    setor: "industria",

    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "ração_ovinos",
        nome: "Produção Ração",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          milho: 25,
          trigo: 25,
        },

        output: {
          racaoDeOvinos: 100,
        },
      },
      {
        id: "ração_porco",
        nome: "Produção Ração",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          milho: 35,
          trigo: 15,
        },
        output: {
          racaoDePorco: 100,
        },
      },
      {
        id: "ração_vacas",
        nome: "Produção Ração",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          milho: 22,
          trigo: 28,
        },

        output: {
          racaoDeVacas: 100,
        },
      },
      {
        id: "ração_aves",
        nome: "Produção Ração",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          milho: 30,
          trigo: 20,
        },

        output: {
          racaoDeAves: 100,
        },
      },
    ],
  },

  {
    edificioId: "fábricaFertilizante",
    nomeEdificio: "Fábrica De Fertilizantes",
    setor: "industria",

    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "fertilizante_plantação",
        nome: "Produção Fertilizante De Plantação",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          esterco: 25,
        },

        output: {
          fertilizantePlantação: 2,
        },
      },
      {
        id: "fertilizante_florestal",
        nome: "Produção Fertilizante De Florestal",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          esterco: 30,
        },

        output: {
          fertilizanteFlorestal: 2,
        },
      },

    ],
  },






];


