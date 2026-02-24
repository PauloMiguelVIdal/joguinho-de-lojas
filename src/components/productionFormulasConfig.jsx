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
          bobinaBranco: 1,
          tintaIndustrial: 1,
        },

        output: {
          livroComum: 120,
        },
      },
      {
        id: "livro_premium",
        nome: "Produção De Livro Premium",
        capacidadePorEdificio: 100,
        duracao: 30,


        input: {
          bobinaBranco: 1,
          tintaIndustrial: 1,
          couro: 1,
        },

        output: {
          livroPremium: 35,
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
          algodão: 40,
          sodaCáustica: 1,
        },

        output: {
          fioAlgodão: 16,
        },
      },
      {
        id: "fiação_Lã",
        nome: "Produção De Fiação De Lã",
        capacidadePorEdificio: 100,
        duracao: 30,


        input: {
          lã: 10,
          sodaCáustica: 1,
        },

        output: {
          fioLã: 5,
        },
      },
      {
        id: "tecido_tecnico",
        nome: "Produção De Tecido Técnico (Dry-Fit)",
        capacidadePorEdificio: 100,
        duracao: 30,


        input: {
          polímero: 5,
          aditivoDeNylon: 3,
        },

        output: {
          tecidoTecnico: 11,
        },
      },
      {
        id: "tratamento_couro",
        nome: "Produção De Couro Premium",
        capacidadePorEdificio: 100,
        duracao: 30,


        input: {
          couro: 10,
          tintaIndustrial: 2,
          saisDeCromo: 2,
        },

        output: {
          couroPremium: 25,
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
          tecidoTecnico: 2,
          polímero: 4,
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
          tenisCorrida: 45,
        },
      },
      {
        id: "sapato_luxo",
        nome: "Produção De Sapato De Luxo",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          couroPremium: 5,
          polímero: 2,
          caixaPequenaPapelão: 10,
        },

        output: {
          sapatoLuxo: 32,
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
          fioAlgodão: 3,
          tintaIndustrial: 1,
          sacolaPapelão: 5
        },
        output: {
          camisetaAlgodão: 190,
        },
      },
      {
        id: "casaco_de_grife",
        nome: "Produção De Casaco De Grife",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          fioLã: 4,
          tintaIndustrial: 1,
          sacolaPapelão: 10,
        },

        output: {
          casacoLã: 75,
        },
      },
      {
        id: "roupas_dryfit",
        nome: "Produção De Roupas DryFit",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          tecidoTecnico: 3,
          tintaIndustrial: 1,
          sacolaPapelão: 10,
        },
        output: {
          roupasDryFit: 85,
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
          bobinaKraft: 1,
          colaIndustrial: 2,
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
          bobinaBranco: 2,
          tintaIndustrial: 1,
        },

        output: {
          sacolaPapelão: 90,
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
          polímero: 3,
          fioIndustrial: 2,
        },

        output: {
          sacaIndustrial: 85,
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
          enxofreBruto: 10,
        },

        output: {
          ácidoSulfúrico: 7,
        },
      },
      {
        id: "eletrólise_sal",
        nome: "Eletrólise De Sal",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          sal: 10,
        },
        output: {
          sodaCáustica: 5,
          cloro: 4,
        },
      },
      {
        id: "aditivos_Nylon",
        nome: "Produção De Aditivos De Nylon",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          ácidoSulfúrico: 2,
          benzeno: 5,
        },
        output: {
          aditivoDeNylon: 8,
        },
      },
      {
        id: "linha_pigmentação",
        nome: "Produção De Linha De Pigmentação",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          benzeno: 5,
          pigmento: 5,
        },

        output: {
          tintaIndustrial: 6,
        },
      },
      {
        id: "linha_adesivos",
        nome: "Produção De Linha de Adesivos",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          benzeno: 5,
          polímero: 2,
        },
        output: {
          colaIndustrial: 13,
        },
      },
      {
        id: "silício_puro",
        nome: "Refino De Silício De Alta Pureza",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          silícioMetalúgico: 10,
          cloro: 5,
        },
        output: {
          silícioPuro: 1,
        },
      },
      {
        id: "carbono_ativado",
        nome: "Produção De Carbono Ativado",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          carvãoRefinado: 20,
          ácidoSulfúrico: 2,
        },
        output: {
          nanotuboCarbono: 1,
        },
      },
      {
        id: "purificação_arsênio",
        nome: "Purificação De Arsênio",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          arsênioBruto: 8,
          cloro: 2,
        },
        output: {
          arsênioPuro: 1,
        },
      },
      {
        id: "purificaçãoLítio",
        nome: "Purificação De Lítio",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          minérioDeLítio: 5,
          ácidoSulfúrico: 2,
        },
        output: {
          lítioPuro: 2,
        },
      },
      {
        id: "sintetizaçãoGrafite",
        nome: "Sintetização De Grafite",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          carvãoRefinado: 30,
        },
        output: {
          grafiteIndustrial: 4,
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
          nafta: 30,
          benzeno: 15,
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
          diesel: 35,
          solvente: 10,
        },
      },
      {
        id: "cracker_gás",
        nome: "Produção De Aditivos De Nylon",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          nafta: 20,
        },
        output: {
          polímero: 45,
        },
      },
      {
        id: "tratamento_enxofre",
        nome: "Tratamento De Enxofre",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          petróleoBruto: 20,
        },

        output: {
          enxofreBruto: 20,
        },
      },
      {
        id: "destilaçãoÓleos",
        nome: "Destilação De Óleos",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          petróleoBruto: 10,
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
          polímero: 20,
          aditivoDeNylon: 10,
        },
        output: {
          polímeroReforçado: 10,
        },
      },
      {
        id: "resinaEpóxi",
        nome: "Resina Epóxi",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          nafta: 10,
          benzeno: 10,
        },
        output: {
          resinaIndustrial: 30,
        },
      },
      {
        id: "moldagemABS",
        nome: "Moldagem De ABS",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          polímero: 20,
          aditivoDeNylon: 15,
        },
        output: {
          termoplásticoRígido: 23,
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
          resinaEmbalagem: 47,
        },
      },
      {
        id: "extrusãoPVC",
        nome: "Extrusão De PVC",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          polímero: 30,
          cloro: 10,
        },
        output: {
          plásticoIsolante: 24,
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
          ervaAnalgésica: 20,
          solvente: 2,
        },

        output: {
          extratoAlívio: 2,
        },
      },
      {
        id: "destilação_terpenos",
        nome: "Destilação De Terpenos",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          plantaAntissépticas: 20,
          solvente: 2,
        },

        output: {
          óleoAntimicrobiano: 3,
        },
      },
      {
        id: "síntese_p.a.",
        nome: "Síntese De P.A.",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          benzeno: 5,
          ácidoSulfúrico: 2,
        },
        output: {
          pASintético: 2,
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
          excipienteFarmacêutico: 1,
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
          comprimidosGenéricos: 5000,
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
          frascoVitamina: 1750,
        },
      },
      {
        id: "produçãoPomadasMedicinais",
        nome: "Produção De Pomadas Medicinais",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          óleoAntimicrobiano: 10,
          solvente: 5,
        },
        output: {
          bisnagaTratamento: 600,
        },
      },
      {
        id: "teste_laboratorial",
        nome: "Produção De Teste Laboratorial",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          enzima: 1,
          cloro: 10,
        },
        output: {
          testeLaboratorial: 2,
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
          enzimaIndustrial: 1,
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
          carvãoRefinado: 20,
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
          ferroGusa: 70,
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
          lingoteAço: 42,
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
          resíduosMetálicos: 40,
        },

        output: {
          lingoteAço: 8,
        },
      },
      {
        id: "açoAltaPureza",
        nome: "Produção De Aço De Alta Pureza",
        input: { lingoteAço: 40, cloro: 10 },
        output: { açoRefinado: 11 }, // Preço 18000
      },
      {
        id: "refinoCobre",
        nome: "Refino De Cobre",
        input: { minérioDeCobre: 40, ácidoSulfúrico: 10 },
        output: { lingoteDeCobre: 23, arsênioBruto: 5 },
      },
      {
        id: "fundiçãoChumbo",
        nome: "Fundição De Chumbo",
        input: { minérioDeChumbo: 40, carvãoRefinado: 10 },
        output: { lingoteChumbo: 15 }, // Preço 5000
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
        id: "criandoLingoteA",
        nome: "Produção de Alumínio (Bauxita)",
        input: { bauxita: 60 },
        output: { lingoteAlumínio: 10 }, // Preço 3500
      },
      {
        id: "bronzeIndustrial",
        nome: "Produção De Bronze Industrial",
        input: { lingoteDeCobre: 20, minérioDeEstanho: 10 },
        output: { ligaDeBronze: 18 }, // Preço 8500
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
        input: { lingoteDeCobre: 20, minérioDeZinco: 10 },
        output: { ligaDeLatão: 18 }, // Preço 8500
      },
      {
        id: "superligasTérmicas",
        nome: "Produção De Superligas Térmicas",
        input: { minérioDeCobalto: 15, minérioDeNiquel: 10, açoRefinado: 5 },
        output: { superligaTérmica: 9 }, // Preço 45000
      },
      {
        id: "contatosPrata",
        nome: "Produção De Contatos De Prata",
        input: { minérioDePrata: 20, lingoteDeCobre: 10 },
        output: { contatoDePrata: 31 }, // Preço 12000 (Ajuste no Market)
      },
      {
        id: "titânioRefinado",
        nome: "Produção De Titânio Refinado",
        input: { minérioDeTitânio: 30, cloro: 10 },
        output: { lingoteTitânio: 32 }, // Preço 25000 (Ajuste no Market)
      },
      {
        id: "soldaEletrônica",
        nome: "Produção De Solda Eletrônica",
        input: { minérioDeEstanho: 20, minérioDePrata: 10 },
        output: { ligaDeSolda: 28 }, // Preço 8500
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
        nome: "Produção De Bloco Magnético",
        input: { ferroGusa: 10, minérioNeodímio: 15 },
        output: { blocoMagnético: 20 },
      },
      {
        id: "prodLigaDeOuro",
        nome: "Produção De Liga De Ouro",
        input: { minérioDeOuro: 10, minérioDeNiquel: 5, minérioDeCobalto: 5 },
        output: { ligaDeOuro: 3 }, // Valor unitário alto
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
        nome: "Produção De Micro Motores",
        input: { rolamento: 2, fioCobre: 10, aço: 2 },
        output: { microMotor: 12 },
      },
      {
        id: "motorStandard",
        nome: "Produção De Motor A Combustão",
        input: { lingoteAço: 20, lingoteAlumínio: 10, engrenagem: 5 },
        output: { motorCombustão: 4 },
      },
      {
        id: "produzirMotorElétrico",
        nome: "Produção De Motor Elétrico",
        input: { fioCobre: 20, lingoteAlumínio: 10, blocoMagnético: 10 },
        output: { motorElétrico: 11 },
      },
      {
        id: "produzirMotorAvião",
        nome: "Produção De Motor De Avião",
        input: { superligaTérmica: 20, lingoteTitânio: 10, açoBalistico: 10 },
        output: { motorAvião: 1 },
      },
      {
        id: "propulsorCriogênico",
        nome: "Produção De Motor De Foguete",
        input: { superligaTérmica: 15, lingoteTitânio: 30, polímeroReforçado: 10 },
        output: { motorFoguete: 1 }, // Valor unitário ~25M
      },
      {
        id: "prodMotorNavio",
        nome: "Produção De Motor Naval",
        input: { lingoteAço: 50, engrenagem: 30, ligaDeBronze: 15 },
        output: { motorNaval: 1 },
      },

      {
        id: "motorPulso",
        nome: "Produção de Motor de Míssil",
        input: { superligaTérmica: 20, açoRefinado: 10, lingoteTitânio: 5 },
        output: { motorMíssil: 1 },
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
        nome: "Produção de Wafer de Silício",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          silícioPuro: 40,
          nitrogênio: 10
        },
        output: {
          waferSilício: 17
        },
        // Custo: 1.4M Silício + 4k Nitrogênio
      },
      {
        id: "prodWaferPotência",
        nome: "Produção de Wafer De Potência",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          silícioPuro: 20,
          carbonoEletrônico: 10,
        },
        output: {
          waferPotência: 11,
        },
        // Custo: 700k Silício + 150k Carbono E.
      },
      {
        id: "arsenetoGálio",
        nome: "Produção de Wafer RF (Arseneto de Gálio)",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          compostoSemicondutor: 10,
          arsênioPuro: 10
        },
        output: {
          waferRF: 12
        },
        // Custo: 650k Composto + 280k Arsênio P.
      },
      {
        id: "célulaFotovoltaica",
        nome: "Produção de Célula Fotovoltaica",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          silícioPuro: 20,
          contatoDePrata: 5,
        },
        output: {
          celulaSolar: 13,
        },
        // Custo: 700k Silício + 60k Prata | Venda: 65k/un
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
        input: { waferSilício: 10, ligaDeSolda: 5 },
        output: { controladorLógico: 11 },
        // Custo: 942k | Venda: 1.045M | Lucro: +103k
      },
      {
        id: "cpuAltaPerformance",
        nome: "CPU Alta Performance",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: { waferSilício: 15, ligaDeSolda: 5 },
        output: { processadorAltaPerformance: 10 },
        // Custo: 1.39M | Venda: 1.5M | Lucro: +110k
      },
      {
        id: "unidadeNeuralIA",
        nome: "Unidade Neural (IA)",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: { waferSilício: 15, nanotuboCarbono: 5 },
        output: { chipIA: 21 },
        // Custo: 1.75M | Venda: 1.785M | Lucro: +35k (Item de Tier Alto)
      },
      {
        id: "prodControladorCarga",
        nome: "Produção De Controlador De Carga",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: { waferPotência: 10, ligaDeLatão: 5 },
        output: { ControladorCarga: 36 },
        // Custo: 892k | Venda: 900k | Lucro: +8k (Base para energia)
      },
      {
        id: "prodChipRF",
        nome: "Produção De Chip RF E Sinal",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: { waferRF: 10, componenteConexão: 10 },
        output: { módulo5G: 9 },
        // Custo: 975k | Venda: 990k | Lucro: +15k
      },
      {
        id: "sensoresBio",
        nome: "Produção De Sensores Bio-Químicos",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: { waferSilício: 10, contatoDePrata: 5 },
        output: { bioChip: 1 },
        // Custo: 960k | Venda: 1.8M | Lucro: +840k (Item Raro)
      },
      {
        id: "prodUnidadesNavegação",
        nome: "Produção De Unidades De Navegação",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: { waferRF: 10, ligaDeOuro: 5, minérioDePrata: 5 },
        output: { sistemaGuia: 7 },
        // Custo: 2.17M | Venda: 2.45M | Lucro: +280k
      },
      {
        id: "chipGeoMineradores",
        nome: "Produção De Chips Geo-Mineradores",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: { waferSilício: 15, açoRefinado: 10 },
        output: { processadorSísmico: 1 },
        // Custo: 1.53M | Venda: 2.5M | Lucro: +970k
      },
      {
        id: "prodMicroControladores", // Corrigido ID duplicado
        nome: "Produção De Micro-Controladores",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: { waferSilício: 5, lingoteAlumínio: 5 },
        output: { microControlador: 40 },
        // Custo: 467k | Venda: 480k | Lucro: +13k
      },
      {
        id: "núcleosNucleares",
        nome: "Produção De Núcleos Nucleares",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: { waferPotência: 20, minérioDeChumbo: 10 },
        output: { processadorBlindado: 12 },
        // Custo: 1.71M | Venda: 1.8M | Lucro: +90k
      },
      {
        id: "prodMemoriaFlash",
        nome: "Produção De Memoria Flash",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: { waferSilício: 15, minérioDeEstanho: 5 },
        output: { chipMemória: 115 },
        // Custo: 1.36M | Venda: 1.38M | Lucro: +20k
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
          unidadeComando: 15
        },
        // Venda Unitária: 350.000
      },
      {
        id: "placaMãeAltaDensidade",
        nome: "Placa-Mãe De Alta Densidade",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          processadorAltaPerformance: 5,
          carbonoEletrônico: 10
        },
        output: {
          placaMãe: 15
        },
        // Venda Unitária: 350.000
      },
      {
        id: "ProdPlacaGestãoEnergia",
        nome: "Placa De Gestão De Energia",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          processadorAltaPerformance: 5,
          ControladorCarga: 10,
          resinaIndustrial: 5 // Substituído os metais por resina para dar corpo à placa
        },
        output: {
          placaGestãoEnergia: 12
        },
        // Custo: 750k (Proc) + 250k (Ctrl) + 35k (Resina) = ~1.03M
        // Venda: 95k por unidade
      },
      {
        id: "prodPlacaTelecomSatélite",
        nome: "Placa De Telecom E Satélite",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          módulo5G: 10,
          ligaDeOuro: 5,
          ligaDeSolda: 5
        },
        output: {
          placaFrequência: 25
        },
        // Ouro custa 250k. Precisa de 25 unidades para cobrir o custo de 2.3M.
      },
      {
        id: "prodComputadorVoo",
        nome: "Produção de Computador de Voo",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          sistemaGuia: 5,
          processadorBlindado: 5
        },
        output: {
          computadorVoo: 3
        },
        // Venda Unitária: 1.200.000
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
          ligaDeSolda: 5
        },
        output: {
          placaIndustrial: 50
        },
        // Venda Unitária: 150.000
      },
      {
        id: "prodMicroControladores",
        nome: "Micro-Controladores",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          controladorLógico: 5,
          ControladorCarga: 2
        },
        output: {
          microControlador: 55
        },
        // Venda Unitária: 12.000 | Volume alto necessário pelo custo do Controlador Lógico.
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
        input: { chipWearables: 10, polímeroReforçado: 10, vidroTécnico: 5 },
        output: { painélDeControle: 50 }, // Venda unitária: 45k
      },
      {
        id: "sistemaVisãoDigital",
        nome: "Sistemas De Visão Digital",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: { bioChip: 1, ligaDeOuro: 1, lentePrecisão: 5 },
        output: { câmeraPrecisão: 15 },
        // Ajuste: 10 Biochips custariam 18M! Reduzi o input para 1 para manter o lucro.
      },
      {
        id: "sistemaSondaTerreno",
        nome: "Sistemas de Sonda de Terreno",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: { processadorSísmico: 1, polímeroReforçado: 5, lingoteChumbo: 5 },
        output: { sondaTerreno: 4 },
        // Venda unitária: 750k | Valor Total: 3M | Custo: ~2.6M
      },
      {
        id: "dispositivosDiagnóstico",
        nome: "Dispositivos De Diagnóstico",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: { bioChip: 1, polímeroReforçado: 10, contatoDePrata: 5 },
        output: { scannerMédico: 3 },
        // Venda unitária: 750k | Valor Total: 2.25M | Custo: ~2.1M
      },
      {
        id: "kitPeriféricos",
        nome: "Kits De Periféricos",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: { chipWearables: 5, polímeroReforçado: 10, fioCobre: 10 },
        output: { consoleJogos: 200 },
        // Ajustado para criar o item "consoleJogos" que vale 4.5k
      },
    ]
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
        input: { lingoteAço: 20 },
        output: { açoRefinado: 5 },
        // Aço Refinado vale 18k | Input: 70k -> Output: 90k
      },
      {
        id: "extrusãoAlumínio",
        nome: "Extrusão De Alumínio",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: { lingoteAlumínio: 20 },
        output: { vigaH: 7 },
        // Ajustado para produzir VigaH (12k)
      },
      {
        id: "painélAeroespacial",
        nome: "Painél Aeroespacial",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: { superligaTérmica: 15, lingoteTitânio: 5 },
        output: { chapaAltaTensão: 16 },
        // Venda unitária: 55k | Custo: 800k -> Output: 880k
      },
      {
        id: "blindagemBalística",
        nome: "Blindagem Balística",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: { açoBalistico: 10, lingoteChumbo: 5 },
        output: { açoInox: 50 },
        // Ajustado para Aço Inox (22k) ou use o Aço Balístico como input principal
      },
    ]
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
        input: { lingoteAço: 15, óleoBase: 5 },
        output: { engrenagem: 8 },
        // Engrenagem vale 8.5k
      },
      {
        id: "válvulasControle",
        nome: "Válvulas de Controle",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: { lingoteAço: 5, ligaDeLatão: 5 },
        output: { pistãoHidráulico: 55 },
        // Pistão Hidráulico vale 1.5k
      },
      {
        id: "sistemaRotação",
        nome: "Sistema de Rotação",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: { lingoteAço: 10, óleoBase: 5 },
        output: { rolamento: 6 },
        // Rolamento vale 8.5k
      },
      {
        id: "engrenagensTorque",
        nome: "Engrenagens De Torque",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: { lingoteAço: 15, minérioDeManganês: 5 },
        output: { redutorCarga: 10 },
        // Redutor de carga (Ajustado para o valor de engrenagens de precisão)
      },
    ]
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
        input: { açoRefinado: 10 },
        output: { vigaH: 18 },
      },
      {
        id: "kitHidráulico",
        nome: "Kit Hidráulico",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: { lingoteAço: 10, polímeroReforçado: 5 },
        output: { braçoHidráulico: 1 },
        // Braço Hidráulico vale 650k! Custo: 160k -> Lucro massivo.
      },
      {
        id: "estruturaAeroNaval",
        nome: "Estrutura Aero/Naval",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: { chapaAltaTensão: 20, resinaIndustrial: 5 },
        output: { célulaFuselagem: 1 },
        // Célula Fuselagem vale 1.2M | Custo: 1.1M | Lucro: 100k
      },
      {
        id: "suportePainéis",
        nome: "Suportes de Painéis",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: { lingoteAlumínio: 10, polímeroReforçado: 5 },
        output: { treliçaLeve: 20 },
      },
    ]
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
          cockpit: 12,
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
          amortecedor: 10,
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
          braçoHidráulico: 1,
        },
      },
      {
        id: "prodSeçãoCasco",
        nome: "Produção Seção Casco",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          placaReforçada: 3,
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
        id: "prodCarroEsportivo",
        nome: "Carro Esportivo",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          chassiLuxo: 1,
          motorCombustão: 10,
          sistemaTransmissão: 5,
        },

        output: {
          carroEsportivo: 2,
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
          Escavadeira: 4,
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
          caminhãoElétrico: 4,
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
          unidadeCélula: 150
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
          bateriaTracionamento: 10,
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
        },

        output: {
          unidadeAutomação: 5
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
          bateriaPortátil: 10
        },

        output: {
          droneLogístico: 6
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
          placaMãe: 10,
          tela: 10,
          bateriaPortátil: 10,
        },

        output: {
          smartphoneBasico: 250
        },
      },
      {
        id: "prodSmartphonePremium",
        nome: "Produção Smartphone Premium",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          microControlador: 5,
          câmeraPrecisão: 5,
          tela: 5
        },

        output: {
          smartphonePremium: 100
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
          placaMãe: 1,      // Custo: 350k
          tela: 10,         // Custo: 20k (10x 2k)
          chapaAlumínio: 5  // Custo: 22.5k (Carcaça)
        },

        output: {
          computador: 100
        },
      },
      {
        id: "RacksServidor",
        nome: "Produção De Racks De Servidor",
        capacidadePorEdificio: 100,
        duracao: 30,
        input: {
          microControlador: 10,   // Custo: 120k
          placaIndustrial: 2,     // Custo: 300k
          açoRefinado: 5          // Custo: 90k
        },
        output: {
          unidadeServidor: 2
        },
        // Custo Total: ~510k | Venda Total (2 un): 700k
        // Lucro: +190k. Agora faz sentido!
      }
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
        id: "prodConsoles",
        nome: "Produção De Computador",
        capacidadePorEdificio: 100,
        duracao: 30,

        input: {
          placaMãe: 1,      // Custo: 350k
          placaFrequência: 1, // Custo: 110k
          polímero: 10      // Carcaça
        },

        output: {
          consoleJogos: 120
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
          controle: 1000
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
          smartwatch: 70
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
          célulaFuselagem: 20,
          motorAvião: 5,
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
          placaFrequência: 100,
          tela: 100,
          ligaDeOuro: 100,
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
          sondaTerreno: 2,
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
          painelSolar: 80
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
    edificioId: "açougue",
    nomeEdificio: "Açougue",
    setor: "comércio",
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },

    formulas: [
      {
        id: "sellCarneBovina",
        nome: "Produção De Enegia Por Nuclear",
        capacidadePorEdificio: 100,
        duracao: 30,
        margem: 20,
        baseQtdPorPeriodo: {
          20: 500,
          30: 1000,
          40: 2500,
          50: 5000,
        },

      },
    ],
  },
  {
    edificioId: "açougue",
    nomeEdificio: "Açougue",
    setor: "comércio",
    categoriasPermitidas: ["pereciveis"],
    capacidadePorEdificio: 1000, // kg
    maxContratosDisponiveisPorNível:4,
    maxAcoesSimultaneasPorNivel: {
      1: 1,
      2: 2,
      3: 3,
    },
    periodoNovosContratos: 30,
    variacaoMargem: {
      min: -5,
      max: 10
    },
    rangeQuantidadeContrato: {
      minCapacidadeMultiplicador: 0.5,
      maxCapacidadeMultiplicador: 5
    },

    rangeDuracaoContrato: {
      min: 20,
      max: 50
    },
    multiplicadorNivel: {
      1: 1,
      2: 1.5,
      3: 2
    },
    formulas: [
      {
        id: "sellCarneBovina",
        produto: "carneBovina",
        margemBase: 20,
      },
      {
        id: "sellFrango",
        produto: "frango",
        margemBase: 20,
      },
      {
        id: "sellCarneSuina",
        produto: "carneSuina",
        margemBase: 20,
      },
      {
        id: "sellCarneOvino",
        produto: "carneOvino",
        margemBase: 20,
      },
    ],
  }
];