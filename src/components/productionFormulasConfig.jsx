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
          esterco: 20
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
          esterco: 2
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
          esterco: 5
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

  {
    edificioId: "plantaçãoEucalipto",
    nomeEdificio: "Plantação De Eucalipto",
    setor: "agricultura",

    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "reproducao_eucalipto",
        nome: "Reprodução",
        capacidadePorEdificio: 100,
        duracao: 40,

        eucalipto: {
          eucalipto: 4,
          fertilizanteFlorestal: 10,
        },

        output: {
          eucalipto: 20,
        },
      },
      {
        id: "derrubar_eucalipto",
        nome: "Explorar Eucalipto",
        capacidadePorEdificio: 100,
        duracao: 20,

        input: {
          eucalipto: 1,
        },
        output: {
          torasEucalipto: 20,
        },
      },
    ],
  },
  {
    edificioId: "madeireira",
    nomeEdificio: "Madeireira",
    setor: "agricultura",

    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "descascar_eucalipto",
        nome: "Reprodução",
        capacidadePorEdificio: 100,
        duracao: 40,

        input: {
          toraEucalipto: 4,
        },

        output: {
          cavacoDeMadeira: 20,
          serragem: 10
        },
      },
      {
        id: "descascar_tronco",
        nome: "Explorar Eucalipto",
        capacidadePorEdificio: 100,
        duracao: 20,

        input: {
          toraArvore: 4,
        },
        output: {
          toraArvore: 28,
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
  {
    edificioId: "fábricaCelulose",
    nomeEdificio: "Fábrica De Celulose",
    setor: "industria",

    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "celulose_eucalipto",
        nome: "Produção Celulose Por Eucalipto",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          cavacoEucalipto: 40,
          sodaCáustica: 10,
          ácidoSulfúrico: 5,
        },

        output: {
          fardoCelulose: 40,
          biomassaLíquida: 10,
        },
      },
      {
        id: "celulose_Nativa",
        nome: "Produção Celulose Por Madeira Nativa",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          cavacoMadeiraNativa: 60,
          sodaCáustica: 20,
          ácidoSulfúrico: 15,
        },

        output: {
          fardoCelulose: 15,
          biomassaLíquida: 30,
        },
      },

    ],
  },
  {
    edificioId: "fábricaPapel",
    nomeEdificio: "Fábrica De Papel",
    setor: "industria",

    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "papel_kraft",
        nome: "Produção De Papel Kraft",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          fardoCelulose: 20,
        },

        output: {
          bobinaKraft: 30,
        },
      },
      {
        id: "papel_branco",
        nome: "Produção De Papel Branco",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          fardoCelulose: 20,
          cloro: 10
        },

        output: {
          bobinaBranco: 25,
        },
      },

    ],
  },
  {
    edificioId: "fábricaLivros",
    nomeEdificio: "Fábrica De Livros",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "livro_comum",
        nome: "Produção De Livro Comum",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          bobinaBranco: 25,
          tintaIndustrial: 5,
        },

        output: {
          livroComum: 20,
        },
      },
      {
        id: "livro_premium",
        nome: "Produção De Livro Premium",
        capacidadePorEdificio: 100,
        duracao: 30,


        input: {
          bobinaBranco: 15,
          tintaIndustrial: 5,
          couro: 5,
        },

        output: {
          livroPremium: 10,
        },
      },
    ],
  },
  {
    edificioId: "fábricaTêxtil",
    nomeEdificio: "Fábrica Têxtil",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "fiação_algodão",
        nome: "Produção De Fiação De Algodão",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          algodão: 50,
          sodaCáustica: 10,
        },

        output: {
          fioAlgodão: 40,
        },
      },
      {
        id: "fiação_Lã",
        nome: "Produção De Fiação De Lã",
        capacidadePorEdificio: 100,
        duracao: 30,


        input: {
          lã: 40,
          sodaCáustica: 15,
        },

        output: {
          fioLã: 30,
        },
      },
      {
        id: "fiação_Lã",
        nome: "Produção De Fiação De Lã",
        capacidadePorEdificio: 100,
        duracao: 30,


        input: {
          lã: 40,
          sodaCáustica: 15,
        },

        output: {
          fioLã: 30,
        },
      },
      {
        id: "tecido_tecnico",
        nome: "Produção De Tecido Técnico (Dry-Fit)",
        capacidadePorEdificio: 100,
        duracao: 30,


        input: {
          tecidoTecnico: 40,
          sodaCáustica: 15,
        },

        output: {
          fioLã: 30,
        },
      },
      {
        id: "fio_industrial",
        nome: "Produção De Fio Industrial",
        capacidadePorEdificio: 100,
        duracao: 30,


        input: {
          polímero: 30,
          aditivoDeNylon: 10,
        },

        output: {
          fioIndustrial: 40,
        },
      },
      {
        id: "tratamento_couro",
        nome: "Produção De Couro Premium",
        capacidadePorEdificio: 100,
        duracao: 30,


        input: {
          couro: 20,
          tintaIndustrial: 15,
          saisDeCromo: 10,
        },

        output: {
          couroPremium: 30,
        },
      },
    ],
  },
  {
    edificioId: "fábricaDeCalçados",
    nomeEdificio: "Fábrica De Calçados",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "tenis_corrida",
        nome: "Produção De Tênis De Corrida",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          tecidoTecnico: 10,
          polímero: 20,
          caixaPequenaPapelão: 10,
        },

        output: {
          tenisCorrida: 15,
        },
      },
      {
        id: "sapato_casual",
        nome: "Produção De Tênis Casual",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          fioAlgodão: 10,
          polímero: 15,
          caixaPequenaPapelão: 10,
        },

        output: {
          tenisCorrida: 15,
        },
      },
      {
        id: "sapato_luxo",
        nome: "Produção De Sapato De Luxo",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          couroPremium: 15,
          polímero: 10,
          caixaPequenaPapelão: 10,
        },

        output: {
          sapatoLuxo: 10,
        },
      },
    ],
  },
  {
    edificioId: "fábricaDeRoupas",
    nomeEdificio: "Fábrica De Roupas",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "confecção_casual",
        nome: "Produção De Confecção Casual",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          fioAlgodão: 20,
          tintaIndustrial: 5,
          sacolaPapelão: 10
        },
        output: {
          camiseteAlgodão: 20,
        },
      },
      {
        id: "casaco_de_grife",
        nome: "Produção De Casaco De Grife",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          fioLã: 20,
          tintaIndustrial: 10,
          sacolaPapelão: 10,
        },

        output: {
          casacoLã: 10,
        },
      },
      {
        id: "roupas_dryfit",
        nome: "Produção De Roupas DryFit",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          tecidoTecnico: 20,
          tintaIndustrial: 10,
          sacolaPapelão: 10,
        },
        output: {
          roupasDryFit: 20,
        },
      },
    ],
  },
  {
    edificioId: "fábricaDeEmbalagens",
    nomeEdificio: "Fábrica De Embalagens",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "caixa_papelão",
        nome: "Produção De Sacolas De Varejo",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          bobinaKraft: 40,
          colaIndustrial: 10,
        },

        output: {
          caixaPapelão: 50,
        },
      },
      {
        id: "sacola_papelão",
        nome: "Produção De Sacolas De Varejo",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          bobinaBranco: 20,
          tintaIndustrial: 10,
        },

        output: {
          sacolaPapelão: 100,
        },
      },
      {
        id: "sacola_papelão",
        nome: "Produção De Sacolas De Varejo",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          bobinaBranco: 30,
          tintaIndustrial: 15,
          polímero: 10,
        },

        output: {
          caixaPequenaPapelão: 40,
        },
      },
      {
        id: "sacas_ industriais",
        nome: "Produção De Sacas Industriais",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          polímero: 30,
          fioIndustrial: 10,
        },

        output: {
          caixaPequenaPapelão: 40,
        },
      },
    ],
  },
  {
    edificioId: "FábricaQuímicosEspecializados",
    nomeEdificio: "Fábrica De Químicos Especializados",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "síntese_acidos",
        nome: "Síntese De Ácidos",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          enxofreBruto: 30,
        },

        output: {
          ácidoSulfúrico: 40,
        },
      },
      {
        id: "eletrólise_sal",
        nome: "Eletrólise De Sal",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          sal: 30,
        },
        output: {
          sodaCáustica: 25,
          cloro: 10,
        },
      },
      {
        id: "aditivos_Nylon.",
        nome: "Produção De Aditivos De Nylon",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          ácidoSulfúrico: 15,
          benzeno: 20,
        },
        output: {
          aditivoDeNylon: 30,
        },
      },
      {
        id: "linha_pigmentação",
        nome: "Produção De Linha De Pigmentação",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          benzeno: 15,
          pigmento: 15,
        },

        output: {
          tintaIndustrial: 40,
        },
      },
      {
        id: "linha_adesivos",
        nome: "Produção De Linha de Adesivos",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          benzeno: 15,
          polímero: 10,
        },
        output: {
          colaIndustrial: 25,
        },
      },
    ],
  },
  {
    edificioId: "refinaria",
    nomeEdificio: "Refinaria",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "destilação_leve",
        nome: "Destilação Leve",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          petróleoBruto: 100,
        },

        output: {
          nafta: 40,
          benzeno: 20,
        },
      },
      {
        id: "destilação_média",
        nome: "Destilação Média",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          petróleoBruto: 100,
        },
        output: {
          diesel: 50,
          solvente: 10,
        },
      },
      {
        id: "cracker_gás.",
        nome: "Produção De Aditivos De Nylon",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          nafta: 60,
        },
        output: {
          polímero: 50,
        },
      },
      {
        id: "tratamento_enxofre",
        nome: "Tratamento De Enxofre",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          petróleoBruto: 50,
        },

        output: {
          enxofreBruto: 15,
        },
      },
    ],
  },
  {
    edificioId: "fábrica_plásticos",
    nomeEdificio: "Fábrica De Plásticos",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },
    formulas: [
      {
        id: "plásticos_engenharia",
        nome: "Plásticos De Engenharia",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          polímero: 25,
          aditivoDeNylon: 15,
        },
        output: {
          polímeroReforçado: 35,
        },
      },
    ],
  },
  {
    edificioId: "laboratório_farmacêutico",
    nomeEdificio: "Laboratório Farmacêutico",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "extração_alcaloides",
        nome: "Extração De Alcaloides",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          ervaAnalgésica: 50,
          solvente: 15,
        },

        output: {
          extratoAlívio: 25,
        },
      },
      {
        id: "destilação_terpenos",
        nome: "Destilação De Terpenos",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          plantaAntissépticas: 50,
          solvente: 15,
        },

        output: {
          oleoAntimicrobiano: 25,
        },
      },
      {
        id: "síntese_p.a.",
        nome: "Síntese De P.A.",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          benzeno: 20,
          ácidoSulfúrico: 10,
        },
        output: {
          pASintético: 15,
        },
      },
      {
        id: "processamento_amido",
        nome: "Processamento De Amido",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          milho: 40,
        },
        output: {
          excipienteFarmacêutico: 30,
        },
      },
    ],
  },
  {
    edificioId: "fábrica_de_medicamentos",
    nomeEdificio: "Fábrica De Medicamentos",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "remédios_genéricos",
        nome: "Produção De Remédios Genéricos",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          pASintético: 15,
          excipienteFarmacêutico: 20,
        },

        output: {
          comprimidosGenéricos: 30,
        },
      },
      {
        id: "suplementos_vitamínicos",
        nome: "Suplementos Vitamínicos",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          extratoAlívio: 20,
          excipienteFarmacêutico: 10,
        },

        output: {
          frascoVitamina: 20,
        },
      },
      {
        id: "produçãoPomadasMedicinais",
        nome: "Produção De Pomadas Medicinais",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          oleoAntimicrobiano: 10,
          solvente: 5,
        },
        output: {
          bisnagaTratamento: 15,
        },
      },
      {
        id: "teste_laboratorial",
        nome: "Produção De Teste Laboratorial",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          enzima: 10,
          cloro: 10,
        },
        output: {
          testeLaboratorial: 20,
        },
      },
    ],
  },
  {
    edificioId: "bio_fábrica",
    nomeEdificio: "Biofábrica",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "culturaFermentação",
        nome: "Produção De Cultura De Fermentação",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          milho: 40,
        },

        output: {
          enzimaIndustrial: 25,
        },
      },
      {
        id: "suplementos_vitamínicos",
        nome: "Suplementos Vitamínicos",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          extratoAlívio: 20,
          excipienteFarmacêutico: 10,
        },

        output: {
          frascoVitamina: 20,
        },
      },
      {
        id: "produçãoPomadasMedicinais",
        nome: "Produção De Pomadas Medicinais",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          oleoAntimicrobiano: 10,
          solvente: 5,
        },
        output: {
          bisnagaTratamento: 15,
        },
      },
      {
        id: "teste_laboratorial",
        nome: "Produção De Teste Laboratorial",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          enzima: 10,
          cloro: 10,
        },
        output: {
          testeLaboratorial: 20,
        },
      },
    ],
  },
  {
    edificioId: "altoForno",
    nomeEdificio: "Alto-Forno",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "fusãoFerro",
        nome: "Fusão De Ferro",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          minérioFerro: 60,
          calcário: 20,
        },

        output: {
          ferroGusa: 50,
        },
      },
      {
        id: "refinoAçoBásico",
        nome: "Refino De Aço Básico",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          ferroGusa: 40,
          ácidoSulfúrico: 10,
        },

        output: {
          lingoteAço: 45,
        },
      },


    ],
  },
  {
    edificioId: "usinaSiderúrgica",
    nomeEdificio: "Usina Siderúrgica",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "reciclagemAço",
        nome: "Reciclagem De Aço",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          resíduosMetálicos: 50,
          ácidoSulfúrico: 5,
        },

        output: {
          lingoteAço: 40,
        },
      },
      {
        id: "açoAltaPureza",
        nome: "Produção De Aço De Alta Pureza",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          lingoteAço: 40,
          cloro: 10,
        },

        output: {
          açoRefinado: 35,
        },
      },
    ],
  },
  {
    edificioId: "fundiçãoAlumínio",
    nomeEdificio: "Fundição De Alumínio",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "reciclagemAço",
        nome: "Reciclagem De Aço",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          bauxita: 60,

        },

        output: {
          lingoteAlumínio: 40,
        },
      },
      {
        id: "reciclagemAlumínio",
        nome: "Reciclagem De Alumínio",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          sucata: 40,
        },
        output: {
          lingoteAlumínio: 30,
        },
      },
    ],
  },
  {
    edificioId: "fábricaLigasMetálicas",
    nomeEdificio: "Fábrica De Ligas Metálicas",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "bronzeIndustrial",
        nome: "Produção De Bronze Industrial",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          minérioDeCobre: 20,
          minérioDeEstanho: 10,

        },

        output: {
          ligaDeBronze: 25,
        },
      },
      {
        id: "latãoElétrico",
        nome: "Produção De Latão Elétrico",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          minérioDeCobre: 20,
          minérioDeZinco: 10,
        },
        output: {
          ligaDeLatão: 25,
        },
      },
      {
        id: "açoInoxidável",
        nome: "Produção De Aço Inoxidável",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          açoRefinado: 20,
          minérioDeCromo: 10,
        },
        output: {
          açoInox: 25,
        },
      },
      {
        id: "ligaGalhoÍndio",
        nome: "Produção De Liga Galho/Índio",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          minérioDeGalho: 10,
          minérioDeIndio: 5,
        },
        output: {
          compostoSemicondutor: 12,
        },
      },
      {
        id: "superligasTérmicas",
        nome: "Produção De Superligas Térmicas",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          minérioDeCobalto: 15,
          minérioDeNiquel: 10,
          açoRefinado: 5,
        },
        output: {
          superligaTérmica: 20,
        },
      },
      {
        id: "contatosPrata",
        nome: "Produção De Contatos De Prata",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          minérioDePrata: 20,
          minérioDeCobre: 10,
        },
        output: {
          contatoDePrata: 25,
        },
      },
      {
        id: "titânioRefinado",
        nome: "Produção De Titânio Refinado",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          minérioDeTitânio: 30,
          cloro: 10,
        },
        output: {
          lingoteTitânio: 25,
        },
      },
      {
        id: "soldaEletrônica",
        nome: "Produção De Solda Eletrônica",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          minérioDeEstanho: 20,
          minérioDePrata: 10,
        },
        output: {
          ligaDeSolda: 25,
        },
      },
      {
        id: "açoManganês",
        nome: "Produção De Aço Manganês",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          minérioDeManganês: 10,
          lingoteAço: 30,
        },
        output: {
          ligaDeSolda: 25,
        },
      },
      {
        id: "soldaEletrônica",
        nome: "Produção De Solda Eletrônica",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          minérioDeEstanho: 20,
          minérioDePrata: 10,
        },
        output: {
          ligaDeSolda: 25,
        },
      },
      {
        id: "açoManganês",
        nome: "Produção De Aço Manganês",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          lingoteAço: 30,
          minérioDeManganês: 10,
        },
        output: {
          açoBalistico: 35,
        },
      },
      {
        id: "ÍmãsNeodímio",
        nome: "Produção De Ímãs De Neodímio",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          ferroGusa: 10,
          neodímio: 15,
        },
        output: {
          blocoMagnético: 15,
        },
      },
    ],
  },
    {
    edificioId: "fábricaMotores",
    nomeEdificio: "Fábrica De Motores",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "motorStandard",
        nome: "Produção De Motor Standard",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          lingoteAço: 20,
          lingoteAlumínio: 10,
          engrenagem: 5,
        },
        output: {
          motorCombustão: 5,
        },
      },
      {
        id: "produzirMotorElétrico",
        nome: "Produção De Motor Elétrico",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          fioCobre: 20,
          lingoteAlumínio: 10,
          blocoMagnético: 10,
        },
        output: {
          motorElétrico: 5,
        },
      },
      {
        id: "turbofãComercial",
        nome: "Produção De Turbofã Comercial",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          açoRefinado: 30,
          palhetaPrecisão: 10,
          rolamento: 5,
        },
        output: {
          motorElétrico: 5,
        },
      },
      {
        id: "produzirMotorJato",
        nome: "Produção De Motor De Jato",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          superligaTérmica: 20,
          lingoteTitânio: 10,
          açoBalistico: 10,
        },
        output: {
          motorJato: 1,
        },
      },
      {
        id: "propulsorCriogênico",
        nome: "Produção De Propulsor Criogênico",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          superligaTérmica: 15,
          lingoteTitânio: 30,
          polímero: 10,
        },
        output: {
          motorFoguete: 1,
        },
      },
      {
        id: "produzirMotorNaval",
        nome: "Produção De Motor Naval",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          lingoteAço: 50,
          engrenagem: 20,
          ligaDeBronze: 15,
        },
        output: {
          motorNaval: 2,
        },
      },
      {
        id: "motorDrones",
        nome: "Produção De Motor De Drone",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          açoRefinado: 5,
          lingoteAlumínio: 5,
          blocoMagnético: 5,
        },
        output: {
          motorDrone: 10,
        },
      },
      {
        id: "atuadorHidráulico",
        nome: "Produção De Atuador Hidráulico",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          óleoIndustrial: 10,
          açoBalistico: 15,
          engrenagem: 5,
        },
        output: {
          pistãoHidráulico: 10,
        },
      },
      {
        id: "motorPulso",
        nome: "motorPulso",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          superligaTérmica: 20,
          açoRefinado: 10,
          lingoteTitânio: 5,
        },
        output: {
          motorMíssil: 3,
        },
      },
    ],
  },
];


