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
          sementeMilho: 10,
          fertilizantePlantação: 1,
        },

        output: {
          milho: 20,
          sementeMilho: 8,
        },
      },
      {
        id: "plantação_trigo",
        nome: "Plantação De Trigo",
        capacidadePorEdificio: 1000,
        duracao: 40,

        input: {
          sementeTrigo: 10,
          fertilizantePlantação: 1,
        },

        output: {
          trigo: 20,
          sementeTrigo: 8,
        },
      },
      {
        id: "plantação_soja",
        nome: "Plantação De Soja",
        capacidadePorEdificio: 1000,
        duracao: 40,

        input: {
          sementeSoja: 10,
          fertilizantePlantação: 1,
        },
        output: {
          soja: 20,
          sojsementeSojaa: 8,
        },
      },
      {
        id: "plantação_algodão",
        nome: "Plantação De Algodão",
        capacidadePorEdificio: 1000,
        duracao: 40,

        input: {
          sementeAlgodão: 10,
          fertilizantePlantação: 1,
        },

        output: {
          algodão: 20,
          sementeAlgodão: 8,
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
          vaca: 2,
          racaoDeVacas: 5,
        },

        output: {
          vaca: 3,
          esterco: 10
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
          couro: 6,
          carneBovina: 10,
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
          galinha: 10,
          racaoDeAves: 5,

        },

        output: {
          galinha: 30,
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
          frango: 8,
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
          ovelha: 2,
          racaoDeOvinos: 5,
        },

        output: {
          ovelha: 3,
          esterco: 10
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
          carneOvino: 15,
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
          lã: 5,
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

        input: {
          arvoreEucalipto: 4,
          fertilizanteFlorestal: 10,
        },

        output: {
          arvoreEucalipto: 20,
        },
      },
      {
        id: "derrubar_eucalipto",
        nome: "Explorar Eucalipto",
        capacidadePorEdificio: 100,
        duracao: 20,

        input: {
          arvoreNativa: 1,
        },
        output: {
          arvoreNativa: 20,
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
        id: "cortar_eucalipto",
        nome: "cortar",
        capacidadePorEdificio: 100,
        duracao: 40,

        input: {
          toraNativa: 4,
        },

        output: {
          cavacoMadeiraNativa: 20,
          serragem: 10
        },
      },
      {
        id: "cortar_nativo",
        nome: "cortar nativo",
        capacidadePorEdificio: 100,
        duracao: 20,

        input: {
          arvoreEucalipto: 1,

        },
        output: {
          toraEucalipto: 5,
          serragem: 10,
        },
      },
      {
        id: "descascar_eucalipto",
        nome: "Reprodução",
        capacidadePorEdificio: 100,
        duracao: 40,

        input: {
          arvoreNativa: 1,
        },

        output: {
          toraNativa: 4,
          serragem: 10,
        },
      },
      {
        id: "descascar_nativo",
        nome: "Explorar Eucalipto",
        capacidadePorEdificio: 100,
        duracao: 20,

        input: {
          toraEucalipto: 4,

        },
        output: {
          cavacoEucalipto: 20,
          serragem: 10
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
          esterco: 20,
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
          esterco: 20,
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
          sodaCáustica: 5,
          ácidoSulfúrico: 2,
        },

        output: {
          fardoCelulose: 25,
          biomassaLíquida: 5,
        },
      },
      {
        id: "celulose_Nativa",
        nome: "Produção Celulose Por Madeira Nativa",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          cavacoMadeiraNativa: 60,
          sodaCáustica: 10,
          ácidoSulfúrico: 5,
        },

        output: {
          fardoCelulose: 15,
          biomassaLíquida: 25,
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
          bobinaKraft: 60,
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
          bobinaBranco: 45,
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
          camisetaAlgodão: 20,
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
        id: "caixa_papelão",
        nome: "Produção De Caixa Pequena De Varejo",
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
        id: "sacas_industriais",
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
        id: "aditivos_Nylon",
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
      {
        id: "silício_puro",
        nome: "Produção De Linha de Adesivos",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          silícioMetalúgico: 20,
          cloro: 10,
        },
        output: {
          silícioPuro: 15,
        },
      },
      {
        id: "carbono_ativado",
        nome: "Produção De Carbono Ativado",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          carvãoRefinado: 20,
          ácidoSulfúrico: 10,
        },
        output: {
          carbonoEletrônico: 15,
        },
      },
      {
        id: "purificação_arsênio",
        nome: "Purificação De Arsênio",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          arsênioBruto: 20,
          cloro: 10,
        },
        output: {
          arsênioPuro: 15,
        },
      },
      {
        id: "purificaçãoLítio",
        nome: "Purificação De Lítio",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          minérioDeLítio: 30,
          ácidoSulfúrico: 10,
        },
        output: {
          lítioPuro: 20,
        },
      },
      {
        id: "sintetizaçãoGrafite",
        nome: "Sintetização De Grafite",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          carvãoRefinado: 40,
        },
        output: {
          grafiteIndustrial: 15,
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
        id: "cracker_gás",
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
      {
        id: "destilaçãoÓleos",
        nome: "Destilação De Óleos",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          petróleoBruto: 40,
        },

        output: {
          óleoBase: 20,
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
      {
        id: "resinaEpóxi",
        nome: "Resina Epóxi",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          nafta: 15,
          benzeno: 5,
        },
        output: {
          resinaIndustrial: 20,
        },
      },
      {
        id: "moldagemABS",
        nome: "Moldagem De ABS",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          polímero: 30,
          aditivoDeNylon: 10,
        },
        output: {
          termoplásticoRígido: 20,
        },
      },
      {
        id: "soproPET",
        nome: "Sopro De PET",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          polímero: 30,
          solvente: 10,
        },
        output: {
          resinaEmbalagem: 20,
        },
      },
      {
        id: "extrusãoPVC",
        nome: "Extrusão De PVC",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          polímero: 30,
          cloro: 15,
        },
        output: {
          plásticoIsolante: 40,
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
        id: "prodCoque",
        nome: "Fusão De Ferro",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          carvão: 40,
        },

        output: {
          carvãoRefinado: 30,
        },
      },
      {
        id: "fusãoFerro",
        nome: "Fusão De Ferro",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          minérioFerro: 60,
          carvãoRefinado: 25,
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
      {
        id: "ProdSilícioMetalúgico",
        nome: "Produção De Silício Metalúgico",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          minérioDeQuartzo: 40,
          carvãoRefinado: 20,
        },

        output: {
          silícioMetalúgico: 25,
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
      {
        id: "refinoCobre",
        nome: "Refino De Cobre",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          minérioDeCobre: 40,
          ácidoSulfúrico: 10,
        },

        output: {
          lingoteDeCobre: 30,
          arsênioBruto: 10,
        },
      },
      {
        id: "fundiçãoChumbo",
        nome: "Fundição De Chumbo",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          minérioDeChumbo: 40,
          carvãoRefinado: 10,
        },

        output: {
          lingoteChumbo: 30,
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
          lingoteDeCobre: 20,
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
          lingoteDeCobre: 20,
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
          lingoteDeCobre: 10,
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
          carvãoRefinado: 5
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
          minérioNeodímio: 15,
        },
        output: {
          blocoMagnético: 15,
        },
      },
      {
        id: "prodLigaDeOuro",
        nome: "Produção De Liga De Ouro",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          minérioDeOuro: 10,
          minérioDeNiquel: 5,
          minérioDeCobalto: 5,
        },
        output: {
          ligaDeOuro: 15,
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
        id: "prodMicroMotor",
        nome: "Produção De Micro Motor",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          rolamento: 2,
          fioCobre: 10,
          aço: 2,
        },
        output: {
          microMotor: 5,
        },
      },
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
        id: "produzirMotorAvião",
        nome: "Produção De Motor De Avião",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          superligaTérmica: 20,
          lingoteTitânio: 10,
          açoBalistico: 10,
        },
        output: {
          motorAvião: 1,
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
          polímeroReforçado: 10,
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
  {
    edificioId: "fábricaSemicondutores",
    nomeEdificio: "Fábrica De Semicondutores",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "prodWaferSilício",
        nome: "Wafer De Silício",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          silícioPuro: 40,
          nitrogênio: 10,

        },

        output: {
          waferSilício: 20,
        },
      },
      {
        id: "prodWaferPotência",
        nome: "Wafer De Potência",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          silícioPuro: 20,
          carbonoEletrônico: 10,

        },

        output: {
          waferPotência: 15,
        },
      },
      {
        id: "arsenetoGálio",
        nome: "Arseneto de Gálio",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          compostoSemicondutor: 10,
          arsênioPuro: 10,
        },
        output: {
          waferRF: 12,
        },
      },
      {
        id: "célulaFotovoltaica",
        nome: "Célula Fotovoltaica",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          silícioPuro: 20,
          contatoDePrata: 5,
        },
        output: {
          celulaSolar: 30,
        },
      },
    ],
  },
  {
    edificioId: "fábricaChips",
    nomeEdificio: "Fábrica De Chips",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "chipAutomação",
        nome: "Chip De Automação",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          waferSilício: 10,
          ligaDeSolda: 5,
        },
        output: {
          controladorLógico: 20,
        },
      },
      {
        id: "cpuAltaPerformance",
        nome: "CPU Alta Performance",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          waferSilício: 15,
          ligaDeSolda: 5,
        },
        output: {
          processadorAltaPerformance: 5,
        },
      },
      {
        id: "UnidadeNeural",
        nome: "Unidades Neurais",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          waferSilício: 15,
          nanotubo: 5,
        },
        output: {
          chipIA: 3,
        },
      },
      {
        id: "UnidadeNeural",
        nome: "Unidades Neurais",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          waferSilício: 15,
          nanotuboCarbono: 5,
        },
        output: {
          chipIA: 3,
        },
      },
      {
        id: "prodControladorCarga",
        nome: "Produção De Controlador De Carga",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          waferPotência: 10,
          ligaDeLatão: 5,
        },
        output: {
          ControladorCarga: 15,
        },
      },
      {
        id: "prodChipRF",
        nome: "Produção De Chip RF E Sinal",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          waferRF: 10,
          componenteConexão: 10,
        },
        output: {
          módulo5G: 10,
        },
      },
      {
        id: "sensoresBio",
        nome: "Produção De Sensores Bio-Químicos",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          waferSilício: 10,
          contatoDePrata: 5,
        },
        output: {
          bioChip: 15,
        },
      },
      {
        id: "ProdUnidadesNavegação",
        nome: "Produção De Unidades De Navegação",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          waferRF: 10,
          ligaDeOuro: 5,
          minérioDePrata: 5,
        },
        output: {
          sistemaGuia: 15,
        },
      },
      {
        id: "chipGeoMineradores",
        nome: "Produção De Chips Geo-Mineradores",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          waferSilício: 15,
          açoRefinado: 10,
        },
        output: {
          processadorSísmico: 10,
        },
      },
      {
        id: "ProdUnidadesNavegação",
        nome: "Produção De Micro-Controladores",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          waferSilício: 5,
          lingoteAlumínio: 5,
        },
        output: {
          processadorSísmico: 10,
        },
      },
      {
        id: "núcleosNucleares",
        nome: "Produção De Núcleos Nucleares",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          waferPotência: 20,
          minérioDeChumbo: 10,
        },
        output: {
          processadorBlindado: 2,
        },
      },
      {
        id: "ProdMemoriaFlash",
        nome: "Produção De Memoria Flash",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          waferSilício: 15,
          minérioDeEstanho: 5,
        },
        output: {
          chipMemória: 2,
        },
      },
    ],
  },
  {
    edificioId: "fábricaPlacasEletrônicas",
    nomeEdificio: "Fábrica De Placas Eletrônicas",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "placaControleIndustrial",
        nome: "Placa De Controle Industrial",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          controladorLógico: 10,
          fioCobre: 10,
          resinaIndustrial: 5
        },

        output: {
          unidadeComando: 15,
        },
      },
      {
        id: "placaMãeAltaDensidade",
        nome: "Placa-Mãe De Alta Densidade",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          processadorAltaPerformance: 5,
          carbonoEletrônico: 10,

        },

        output: {
          placaMãe: 15,
        },
      },
      {
        id: "ProdPlacaGestãoEnergia",
        nome: "Placa De Gestão De Energia",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          processadorAltaPerformance: 5,
          ControladorCarga: 10,
          ligaDeLatão: 5,
          fioCobre: 10,


        },

        output: {
          placaGestãoEnergia: 12,
        },
      },
      {
        id: "prodPlacaTelecomSatélite",
        nome: "Placa De Telecom E Satélite",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          módulo5G: 10,
          ligaDeOuro: 5,
          ligaDeSolda: 5,
        },

        output: {
          placaFrequência: 8,
        },
      },
      {
        id: "prodPlacaTelecomSatélite",
        nome: "Placa De Telecom E Satélite",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          sistemaGuia: 5,
          processadorBlindado: 5,
        },

        output: {
          computadorVoo: 3,
        },
      },
      {
        id: "prodPlacaIndustrial",
        nome: "Produção De Placa Industrial",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          controladorLógico: 10,
          fioCobre: 5,
          resinaIndustrial: 5,
          ligaDeSolda: 5,
        },

        output: {
          placaIndustrial: 3,
        },
      },
      {
        id: "prodMicroControladores",
        nome: "Micro-Controladores",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          controladorLógico: 5,
          ControladorCarga: 2,
        },

        output: {
          microControlador: 15,
        },
      },
    ],
  },
  {
    edificioId: "fábricaEletrônicos",
    nomeEdificio: "Fábrica De Eletrônicos",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "módulosInterface",
        nome: "Módulos de Interface",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          chipWearables: 10,
          polímeroReforçado: 10,
          vidroTécnico: 5,

        },

        output: {
          painélDeControle: 20,
        },
      },
      {
        id: "sistemaVisãoDigital",
        nome: "Sistemas De Visão Digital",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          bioChip: 10,
          ligaDeOuro: 5,
          lentePrecisão: 5,

        },

        output: {
          câmeraPrecisão: 10,
        },
      },
      {
        id: "sistemaVisãoDigital",
        nome: "Sistemas De Visão Digital",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          processadorSísmico: 10,
          polímeroReforçado: 5,
          lingoteChumbo: 5,
        },

        output: {
          SondaTerreno: 15,
        },
      },
      {
        id: "dispositivosDiagnóstico",
        nome: "Dispositivos De Diagnóstico",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          bioChip: 10,
          polímeroReforçado: 10,
          contatoDePrata: 5,
        },

        output: {
          scannerMédico: 12,
        },
      },
      {
        id: "kitPeriféricos",
        nome: "Kits De Periféricos",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          chipWearables: 10,
          polímeroReforçado: 20,
          fioCobre: 10,
        },

        output: {
          periférico: 30,
        },
      },
    ],
  },
  {
    edificioId: "fábricaChapasMetálicas",
    nomeEdificio: "Fábrica De Chapas Metálicas",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "laminaçãoAço",
        nome: "Laminação de Aço",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          lingoteAço: 20,
        },

        output: {
          chapaAço: 15,
        },
      },
      {
        id: "extrusãoAlumínio",
        nome: "Extrusão De Alumínio",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          lingoteAlumínio: 20,
        },

        output: {
          chapaAlumínio: 15,
        },
      },
      {
        id: "painélAeroespacial",
        nome: "Painél Aeroespacial",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          superligaTérmica: 15,
          lingoteTitânio: 5,
        },

        output: {
          chapaAltaTensão: 10,
        },
      },
      {
        id: "blindagemBalística",
        nome: "Blindagem Balística",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          açoBalistico: 20,
          lingoteChumbo: 5,
        },

        output: {
          placaReforçada: 8,
        },
      },
    ],
  },
  {
    edificioId: "indústriaComponentesMecânicos",
    nomeEdificio: "Indústria De Componentes Mecânicos",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "usinagemTransmissão",
        nome: "Usinagem de Transmissão",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          lingoteAço: 15,
          óleoBase: 5,
        },

        output: {
          sistemaTransmissão: 10,
        },
      },
      {
        id: "válvulasControle",
        nome: "Válvulas de Controle",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          lingoteAço: 5,
          ligaDeLatão: 5,
        },

        output: {
          válvulaHidráulica: 8,
        },
      },
      {
        id: "válvulasControle",
        nome: "Válvulas de Controle",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          lingoteAço: 10,
          óleoBase: 5,
        },

        output: {
          conjuntoRotação: 20,
        },
      },
      {
        id: "engrenagensTorque",
        nome: "Engrenagens De Torque",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          lingoteAço: 15,
          minérioDeManganês: 5,
        },

        output: {
          redutorCarga: 12,
        },
      },
    ],
  },
  {
    edificioId: "fábricaEstruturasMetálicas",
    nomeEdificio: "Fábrica De Estruturas Metálicas",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "vigasEstruturais",
        nome: "Vigas Estruturais",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          chapaAço: 20,
        },

        output: {
          vigaH: 10,
        },
      },
      {
        id: "kitHidráulico",
        nome: "Kit Hidráulico",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          lingoteAço: 10,
          polímeroReforçado: 5,
        },

        output: {
          válvulaHidráulica: 8,
        },
      },
      {
        id: "estruturaAeroNaval",
        nome: "Estrutura Aero/Naval",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          chapaAltaTensão: 20,
          resinaIndustrial: 5,
        },

        output: {
          célulaFuselagem: 5,
        },
      },
      {
        id: "suportePainéis",
        nome: "Suportes de Painéis",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          chapaAlumínio: 10,
          polímeroReforçado: 5,
        },

        output: {
          treliçaLeve: 15,
        },
      },
    ],
  },
  {
    edificioId: "fábricaPeçasAutomotivas",
    nomeEdificio: "Fábrica De Peças Automotivas",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "kitCarroceria",
        nome: "Kit de Carroceria",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          chapaAço: 15,
          termoplásticoRígido: 5,
        },

        output: {
          chassiStandard: 10,
        },
      },
      {
        id: "kitHidráulico",
        nome: "Kit Hidráulico",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          lingoteAço: 10,
          polímeroReforçado: 5,
        },

        output: {
          válvulaHidráulica: 8,
        },
      },
      {
        id: "kitAltaPerformance",
        nome: "Kit De Alta Performance",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          chapaAlumínio: 15,
          polímeroReforçado: 5,
        },

        output: {
          chassiLuxo: 5,
        },
      },
      {
        id: "móduloCabine",
        nome: "Módulo De Cabine",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          painélDeControle: 5,
          plásticoIsolante: 5,
        },

        output: {
          cockpit: 15,
        },
      },
      {
        id: "conjuntoSuspensão",
        nome: "Conjunto de Suspensão",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          chapaAço: 10,
          pistãoHidráulico: 5,
        },

        output: {
          amortecedor: 12,
        },
      },
      {
        id: "mecanismoArticulação",
        nome: "Mecanismo de Articulação",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          válvulaHidráulica: 5,
          pistãoHidráulico: 10,
        },

        output: {
          braçoHidráulico: 5,
        },
      },
      {
        id: "prodSeçãoCasco",
        nome: "Produção Seção Casco",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          placaReforçada: 30,
          ligaDeBronze: 10,
        },

        output: {
          SeçãoCasco: 1,
        },
      },
    ],
  },
  {
    edificioId: "fábricaAutomóveis",
    nomeEdificio: "Fábrica De Automóveis",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "veículoPopular",
        nome: "Veículo Popular",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          chassiStandard: 1,
          motorCombustão: 1,
          sistemaTransmissão: 1
        },

        output: {
          carroPopular: 2
        },
      },
      {
        id: "carroEsportivo",
        nome: "Carro Esportivo",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          chassiLuxo: 1,
          motorCombustão: 10,
          sistemaTransmissão: 5,
        },

        output: {
          carroEsportivo: 1,
        },
      },
      {
        id: "máquinaPesada",
        nome: "Máquina Pesada",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          placaReforçada: 2,
          braçoHidráulico: 1,
          motorNaval: 1,
        },

        output: {
          Escavadeira: 1,
        },
      },

    ],
  },
  {
    edificioId: "montadoraVeículosElétricos",
    nomeEdificio: "Montadora De Veículos Elétricos",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "veículoPopularElétrico",
        nome: "veículo Popular Elétrico",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          chassiStandard: 1,
          motorElétrico: 1,
          bateriaTracionamento: 1
        },

        output: {
          carroElétrico: 2
        },
      },
      {
        id: "carroEsportivoElétrico",
        nome: "Carro Esportivo Elétrico",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          chassiLuxo: 1,
          motorElétrico: 2,
          bateriaTracionamento: 1,
        },

        output: {
          hiperCarroElétrico: 1,
        },
      },
      {
        id: "prodCaminhãoElétrico",
        nome: "Caminhão Elétrico",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          chassiStandard: 2,
          motorElétrico: 2,
          bateriaTracionamento: 2,
        },

        output: {
          caminhãoElétrico: 1,
        },
      },

    ],
  },
  {
    edificioId: "fábricaDeBaterias",
    nomeEdificio: "Fábrica De Baterias",
    setor: "energia",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "célulaLítio",
        nome: "Célula De Lítio",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          lítioPuro: 10,
          grafiteIndustrial: 5,
          minérioDeCobalto: 5
        },

        output: {
          unidadeCélula: 20
        },
      },
      {
        id: "bateriaEV",
        nome: "Pack De Bateria EV",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          unidadeCélula: 50,
          ControladorCarga: 2,
          chapaAlumínio: 10,
        },

        output: {
          bateriaTracionamento: 1,
        },
      },
      {
        id: "packEstacionário",
        nome: "Pack Estacionário",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          unidadeCélula: 20,
          ControladorCarga: 1,
          chapaAço: 5,
        },
        output: {
          armazenamentoFixo: 2,
        },
      },
      {
        id: "bateriaSmall",
        nome: "Bateria Small",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          unidadeCélula: 5,
          plásticoIsolante: 5,
        },
        output: {
          bateriaPortátil: 15,
        },
      },

    ],
  },
  {
    edificioId: "FábricaRobôs",
    nomeEdificio: "Fábrica De Robôs",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "braçoRobóticoIndustrial",
        nome: "Braço Robótico Industrial",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          placaIndustrial: 2,
          motorElétrico: 5,
          pistãoHidráulico: 5,
          açoBalistico: 10
        },

        output: {
          unidadeAutomação: 2
        },
      },
      {
        id: "androideServiço",
        nome: "Androide De Serviço",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          placaIndustrial: 2,
          motorElétrico: 5,
          pistãoHidráulico: 5,
          açoBalistico: 10
        },

        output: {
          robôServiço: 1
        },
      },
      {
        id: "prodDroneLogístico",
        nome: "Drone Logístico",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          placaFrequência: 1,
          microMotor: 4,
          chapaAlumínio: 5,
          bateriaPortátil: 10
        },

        output: {
          droneLogístico: 3
        },
      },
      {
        id: "sondaExploratória",
        nome: "Sonda Exploratória",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          placaFrequência: 1,
          microMotor: 4,
          chapaAlumínio: 5,
          bateriaPortátil: 10
        },

        output: {
          robôMineração: 1
        },
      },
    ],
  },
  {
    edificioId: "fábricaSmartphones",
    nomeEdificio: "Fábrica De Smartphones",
    setor: "tecnologia",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "smartphoneStandard",
        nome: "Smartphone Standard",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          placaMãe: 1,
          tela: 1,
          bateriaPortátil: 1,
          polímero: 5
        },

        output: {
          smartphoneBasico: 10
        },
      },
      {
        id: "prodSmartphonePremium",
        nome: "Produção Smartphone Premium",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          placaMãe: 1,
          tela: 1,
          câmeraPrecisão: 1,
          ligaDeOuro: 2
        },

        output: {
          smartphonePremium: 5
        },
      },
    ],
  },
  {
    edificioId: "fábricaComputadores",
    nomeEdificio: "Fábrica De Computadores",
    setor: "tecnologia",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "prodComputador",
        nome: "Produção De Computador",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          placaMãe: 1,
          tela: 1,
          placaFrequência: 2,
          lingoteAlumínio: 10,
        },

        output: {
          computador: 5
        },
      },
      {
        id: "RacksServidor",
        nome: "Produção De Racks De Servidor",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          placaMãe: 4,
          tela: 1,
          placaFrequência: 10,
          açoRefinado: 5,
        },

        output: {
          unidadeServidor: 2
        },
      },
    ],
  },
  {
    edificioId: "fábricaConsoles",
    nomeEdificio: "Fábrica De Consoles De Jogos",
    setor: "tecnologia",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "prodComputador",
        nome: "Produção De Computador",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          placaMãe: 1,
          chipMemória: 2,
          polímero: 5,
          placaFrequência: 2,
        },

        output: {
          consoleJogos: 8
        },
      },
      {
        id: "prodControle",
        nome: "Produção De Controle",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          microControlador: 5,
          polímero: 10,
          fioCobre: 5,
        },

        output: {
          controle: 2
        },
      },
    ],
  },
  {
    edificioId: "fábricaDispositivosVestíveis",
    nomeEdificio: "Fábrica De Dispositivos Vestíveis",
    setor: "tecnologia",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "relogiosInteligentes",
        nome: "Produção De Relógios Inteligentes",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          microControlador: 1,
          bateriaPortátil: 1,
          tela: 1,
          polímero: 2,
        },

        output: {
          smartwatch: 12
        },
      },
      {
        id: "prodFonesOuvídos",
        nome: "Produção De Fones De Ouvídos",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          microControlador: 5,
          bateriaPortátil: 1,
          microMotor: 2
        },

        output: {
          foneOuvido: 20
        },
      },
    ],
  },
  {
    edificioId: "fábricaAeronaves",
    nomeEdificio: "Fábrica De Aeronaves",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "produçãoJatoComercial",
        nome: "Produção De Jato Comercial",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          célulaFuselagem: 4,
          motorAvião: 2,
          placaMãe: 1,
        },

        output: {
          jatoComercial: 1
        },
      },
      {
        id: "prodAviãoCargueiro",
        nome: "Produção De Avião Cargueiro",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          célulaFuselagem: 6,
          motorAvião: 2,
          chassiStandard: 5,
        },

        output: {
          aviãoCargueiro: 1
        },
      },
      {
        id: "prodCaçaDefesa",
        nome: "Produção De Caça De Defesa",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          célulaFuselagem: 2,
          motorAvião: 1,
          açoBalistico: 5,
        },

        output: {
          caçaDefesa: 1
        },
      },
    ],
  },
  {
    edificioId: "fábricaFoguetes",
    nomeEdificio: "Fábrica De Foguetes",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "produçãoSatéliteComunicação",
        nome: "Produção Satélite de Comunicação",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          placaFrequência: 5,
          tela: 5,
          ligaDeOuro: 10,
        },

        output: {
          satéliteOrbital: 1
        },
      },
      {
        id: "prodSondaEspacial",
        nome: "Produção De Sonda Espacial",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          açoBalistico: 5,
          pistãoHidráulico: 10,
          câmeraPrecisão: 2,
        },

        output: {
          sondaEspacial: 1
        },
      },
      {
        id: "prodCaçaDefesa",
        nome: "Produção De Caça De Defesa",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          chapaAltaTensão: 10,
          motorFoguete: 2,
          ControladorCarga: 10,
        },

        output: {
          fogueteLançamento: 1
        },
      },
    ],
  },
  {
    edificioId: "estaleiro",
    nomeEdificio: "Estaleiro",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "prodNavioConteineres",
        nome: "Produção DE Navio De Conteineres",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          SeçãoCasco: 20,
          motorNaval: 2,
          vigaH: 10,
        },

        output: {
          navioConteineres: 1
        },
      },
      {
        id: "prodNavioTanque",
        nome: "Produção De Navio Tanque",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          SeçãoCasco: 30,
          motorNaval: 1,
          pistãoHidráulico: 10,
        },

        output: {
          navioPetroleiro: 1
        },
      },
      {
        id: "prodNavioPesquisa",
        nome: "Produção De Navio De Pesquisa",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          SeçãoCasco: 10,
          SondaTerreno: 2,
          tela: 5,
        },

        output: {
          navioPesquisa: 1
        },
      },
    ],
  },
  {
    edificioId: "fábricaTurbinasEólicas",
    nomeEdificio: "Fábrica De Turbinas Eólicas",
    setor: "energia",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "geradorEólico",
        nome: "Produção De Gerador Eólico",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          açoRefinado: 10,
          rolamento: 5,
          fioCobre: 5
        },

        output: {
          turbinaEólica: 1
        },
      },
    ],
  },
  {
    edificioId: "fábricaPainéisSolares",
    nomeEdificio: "Fábrica De Painéis Solares",
    setor: "energia",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "célulaFotovoltaica",
        nome: "Produção De Célula Fotovoltaica",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          vidroTécnico: 10,
          silícioPuro: 5,
          ligaDeLatão: 2
        },

        output: {
          painelSolar: 10
        },
      },
    ],
  },
  {
    edificioId: "centroReciclagemBaterias",
    nomeEdificio: "Centro De Reciclagem De Baterias",
    setor: "energia",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "reciclagemBaterias",
        nome: "Reciclagem De Baterias",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          bateriaUsada: 10,
          ácidoSulfúrico: 5,
        },

        output: {
          lítioPuro: 5,
          minérioDeCobalto: 3
        },
      },
    ],
  },
  {
    edificioId: "usinaSolar",
    nomeEdificio: "Usina Solar",
    setor: "energia",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "prodSolar",
        nome: "Produção De Enegia Solar",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {

        },

        output: {
          energiaLimpa: 1
        },
      },
    ],
  },
  {
    edificioId: "parqueEólico",
    nomeEdificio: "Parque Eólico",
    setor: "energia",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "prodEólico",
        nome: "Produção De Enegia Eólica",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {

        },

        output: {
          energiaLimpa: 1
        },
      },
    ],
  },
  {
    edificioId: "usinaBiomassa",
    nomeEdificio: "Usina De Biomassa",
    setor: "energia",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "prodBiomassa",
        nome: "Produção De Enegia Por Biomassa",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {

        },

        output: {
          energiaLimpa: 1
        },
      },
    ],
  },
  {
    edificioId: "usinaTermelétricaBiocombustíveis",
    nomeEdificio: "Usina Termelétrica A Biocombustíveis",
    setor: "energia",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "prodBiocombustíveis",
        nome: "Produção De Enegia Por Biocombustíveis",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {

        },

        output: {
          energiaLimpa: 1
        },
      },
    ],
  },
  {
    edificioId: "usinaTermelétricaBiocombustíveis",
    nomeEdificio: "Usina Termelétrica A Biocombustíveis",
    setor: "energia",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "prodBiocombustíveis",
        nome: "Produção De Enegia Por Biocombustíveis",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {

        },

        output: {
          energiaLimpa: 1
        },
      },
    ],
  },
  {
    edificioId: "usinaHidrelétrica",
    nomeEdificio: "Usina Hidrelétrica",
    setor: "energia",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "prodHidrelétrica",
        nome: "Produção De Enegia Por Hidrelétrica",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {

        },

        output: {
          energiaLimpa: 1
        },
      },
    ],
  },
  {
    edificioId: "usinaTermelétrica",
    nomeEdificio: "Usina Termelétrica",
    setor: "energia",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "prodTermelétrica",
        nome: "Produção De Enegia Por Termelétrica",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {

        },

        output: {
          energiaComum: 1
        },
      },
    ],
  },
  {
    edificioId: "usinaTermelétrica",
    nomeEdificio: "Usina Termelétrica",
    setor: "energia",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "prodTermelétrica",
        nome: "Produção De Enegia Por Termelétrica",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {

        },

        output: {
          energiaLimpa: 1
        },
      },
    ],
  },
  {
    edificioId: "reatorNuclear",
    nomeEdificio: "Reator Nuclear Convencional",
    setor: "energia",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "prodNuclear",
        nome: "Produção De Enegia Por Nuclear",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {

        },

        output: {
          energiaNuclear: 1
        },
      },
    ],
  },
  {
    edificioId: "usinaFusãoNuclear",
    nomeEdificio: "Usina De Fusão Nuclear",
    setor: "energia",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "prodNuclear",
        nome: "Produção De Enegia Por Nuclear",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {

        },

        output: {
          energiaNuclear: 1
        },
      },
    ],
  },

];


