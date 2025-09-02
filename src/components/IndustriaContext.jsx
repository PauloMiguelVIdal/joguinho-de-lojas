import React, { useState, createContext,useContext } from 'react';

const IndustriaContext = createContext();

export const IndustriaProvider = ({ children }) => {

const [dadosIndustria, setDadosIndustria] = useState({


industria : {
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
      nome: "Licença De Fábricas textil",
      desc: "Habilita a produção de têxteis e vestuário, conectando a agricultura à indústria têxtil.",
      valor: 7000,
      edifíciosLiberados: ["Fábrica Textil", "Fábrica De Calçados", "Fábrica De Roupas"],
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
      nome: "Licença De Produtos Químicos",
      desc: "Autoriza a produção de produtos químicos básicos e intermediários, essenciais para diversas indústrias.",
      valor: 7000,
      edifíciosLiberados: ["Laboratório Farmacêutico", "Fábrica de Medicamentos", "Fábrica de Plásticos", "Fábrica de Químicos Especializados"],
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
      edifíciosLiberados: ["Fábrica De Peças Automotivas", "Montadora De Veículos Elétricos", "Fábrica De Automóveis"],
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
      edifíciosLiberados: ["Fábrica De Motores", "Fábrica De Foguetes", "Fábrica De Aeronaves", "Estaleiro"],
      status: false
    },
    {
      nome: "Licença Microeletrônica",
      desc: "Permite a fabricação de componentes eletrônicos complexos, robótica e sistemas de automação industrial.",
      valor: 7000,
      edifíciosLiberados: ["Fábrica De Chips", "Fábrica De Placas Eletrônicas", "Fábrica De Semicondutores"],
      status: false
    },
    {
      nome: "Licença De Eletrônica Avançada",
      desc: "Permite a fabricação de componentes eletrônicos complexos, robótica e sistemas de automação industrial.",
      valor: 7000,
      edifíciosLiberados: ["Fábrica De Eletrônicos", "Fábrica De Robôs", "Empresa De Automação Industrial"],
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
          faturamentoUnitário: 4500,
          impostoFixo: 97000,
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
            "nome": "Loja De Móveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 7, "nível2": 12, "nível3": 24 }
          },
          {
            "nome": "Prédio De Alto Padrão",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 10, "nível3": 20 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábrica De Chapas Metálicas",
            "redCusto": { "nível1": 2, "nível2": 4, "nível3": 8 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Madeireira",
            "redCusto": { "nível1": 7, "nível2": 9, "nível3": 18 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 6, "nível3": 8 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Design De Produtos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 26, "nível2": 34, "nível3": 42 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ]
    ,

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
          faturamentoUnitário: 2000,
          impostoFixo: 33000,
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
            "nome": "Granja De Aves",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 18, "nível3": 22 }
          },
          {
            "nome": "Fazenda De Vacas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 18, "nível3": 22 }
          },
          {
            "nome": "Criação De Ovinos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 18, "nível3": 22 }
          },
          {
            "nome": "Petshop",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 12, "nível3": 25 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábrica De Embalagens",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 7 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 12, "nível3": 18 }
          },
          {
            "nome": "Plantação De Grãos",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 7 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plantação De Vegetais",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Pomares",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Instituto De Tecnologia Alimentar",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 22, "nível2": 28, "nível3": 32 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 50 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
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
          faturamentoUnitário: 4000,
          impostoFixo: 98000,
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
            "nome": "Fábrica De Rações",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 7 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Bebidas",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Medicamentos",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Produtos Químicos Especializados",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Comércio De Plantações",
            "redCusto": { "nível1": 3, "nível2": 5, "nível3": 10 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Fertilizante",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Pães",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Livros",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábrica De Plásticos",
            "redCusto": { "nível1": 5, "nível2": 8, "nível3": 14 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Papel",
            "redCusto": { "nível1": 4, "nível2": 6, "nível3": 12 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 12, "nível3": 14 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 20, "nível2": 28, "nível3": 36 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
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
        custoConstrucao: 1320000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 200000,
          impostoFixo: 5120000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 3,
          lojasP: 2,
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
            "nome": "Plantação De Grãos",
            "redCusto": { "nível1": 1, "nível2": 3, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plantação De Vegetais",
            "redCusto": { "nível1": 1, "nível2": 3, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Pomares",
            "redCusto": { "nível1": 1, "nível2": 3, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fazenda De Vacas",
            "redCusto": { "nível1": 8, "nível2": 11, "nível3": 16 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Granja De Aves",
            "redCusto": { "nível1": 8, "nível2": 12, "nível3": 17 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Criação De Ovinos",
            "redCusto": { "nível1": 8, "nível2": 12, "nível3": 17 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Área Florestal",
            "redCusto": { "nível1": 1, "nível2": 3, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plantações De Eucalipto",
            "redCusto": { "nível1": 1, "nível2": 4, "nível3": 10 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plantações De Plantas Medicinais",
            "redCusto": { "nível1": 1, "nível2": 3, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Biofábrica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Depósito De Resíduos Orgânicos",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Coleta De Biomassa",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Embalagens",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 8, "nível3": 12 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fazenda De Vacas",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plantações De Plantas Medicinais",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Biofábrica",
            "redCusto": { "nível1": 3, "nível2": 5, "nível3": 12 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Agrícola",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 16, "nível3": 19 }
          },
          {
            "nome": "Instituto De Biotecnologia",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 16, "nível3": 19 }
          }
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
        custoConstrucao: 140000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 2500,
          impostoFixo: 48750,
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
            "nome": "Mercado",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mega Mercado",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Adega",
            "redCusto": { "nível1": 7, "nível2": 10, "nível3": 22 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Loja De Conveniência",
            "redCusto": { "nível1": 7, "nível2": 10, "nível3": 22 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Restaurante",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Redes De Fast-Food",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 8 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Plantação De Grãos",
            "redCusto": { "nível1": 5, "nível2": 7, "nível3": 19 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Pomares",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 12, "nível3": 16 }
          },
          {
            "nome": "Fábrica De Embalagens",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Instituto De Tecnologia Alimentar",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 22, "nível2": 28, "nível3": 34 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
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
        custoConstrucao: 40000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 23000,
          impostoFixo: 605000,
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
            "nome": "Padaria",
            "redCusto": { "nível1": 7, "nível2": 10, "nível3": 22 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Cafeteria",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 8 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Redes De Fast-Food",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Plantação De Grãos",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 12 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plantação De Vegetais",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fazenda De Vacas",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Granja De Aves",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Embalagens",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Instituto De Tecnologia Alimentar",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 50 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
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
        nome: "Fábrica Textil",
        desc: "Fabrica tecidos a partir de vegetais e fibras naturais.",
        licençaLiberado: {
          licença: "Licença De Fábricas Simples",
          liberado: false,
        },
        custoConstrucao: 40000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 4000,
          impostoFixo: 70000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 0,
          lojasP: 0,
          lojasM: 2,
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
            "nome": "Fábrica De Calçados",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 13 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Roupas",
            "redCusto": { "nível1": 4, "nível2": 5, "nível3": 13 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábrica De Produtos Químicos Especializados",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 7 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 14, "nível2": 18, "nível3": 24 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plantação De Grãos",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plantação De Vegetais",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Granja De Aves",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Criação De Ovinos",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plantações De Eucalipto",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 16, "nível2": 22, "nível3": 26 }
          }
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
        nome: "Fábrica De Calçados",
        desc: "Fabrica calçados a partir de vegetais e couro.",
        licençaLiberado: {
          licença: "Licença De Fábricas Simples",
          liberado: false,
        },
        custoConstrucao: 80000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 3000,
          impostoFixo: 40000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 0,
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
            "nome": "Loja De Departamento",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 6, "nível3": 12 }
          },
          {
            "nome": "Loja De Calçados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 12, "nível3": 25 }
          },
          {
            "nome": "Shopping Popular",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 1, "nível3": 2 }
          },
          {
            "nome": "Shopping Center",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 1 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábrica Têxtil",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 13 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Produtos Químicos Especializados",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fazenda De Vacas",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 1, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Criação De Ovinos",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 1, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Design De Produtos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 16, "nível3": 24 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 16, "nível2": 24, "nível3": 26 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
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
        nome: "Fábrica De Roupas",
        desc: "Fabrica pães a partir de cereais e vegetais.",
        licençaLiberado: {
          licença: "Licença De Fábricas Simples",
          liberado: false,
        },
        custoConstrucao: 120000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 4500,
          impostoFixo: 84000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 0,
          lojasP: 2,
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
            "nome": "Loja De Vestuário",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 12, "nível3": 25 }
          },
          {
            "nome": "Loja De Departamento",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 7, "nível3": 14 }
          },
          {
            "nome": "Shopping Popular",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 2 }
          },
          {
            "nome": "Shopping Center",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 1 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábrica Têxtil",
            "redCusto": { "nível1": 4, "nível2": 5, "nível3": 13 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Produtos Químicos Especializados",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fazenda De Vacas",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Criação De Ovinos",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 20, "nível3": 26 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Design De Produtos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 12, "nível3": 14 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 8, "nível3": 10 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
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
          faturamentoUnitário: 15000,
          impostoFixo: 345000,
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
            "nome": "Fábrica De Papel",
            "redCusto": { "nível1": 5, "nível2": 6, "nível3": 11 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Madeireira",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Área Florestal",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica Movida a Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Biomassa",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 18, "nível2": 22, "nível3": 28 }
          },
          {
            "nome": "Plantações De Eucalipto",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 8 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 18, "nível3": 22 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
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
          faturamentoUnitário: 13000,
          impostoFixo: 291000,
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
            "nome": "Fábrica De Livros",
            "redCusto": { "nível1": 7, "nível2": 9, "nível3": 21 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Embalagens",
            "redCusto": { "nível1": 4, "nível2": 6, "nível3": 12 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábrica De Celulose",
            "redCusto": { "nível1": 5, "nível2": 6, "nível3": 11 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica Movida a Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Biomassa",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 25, "nível3": 30 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 20, "nível2": 15, "nível3": 20 }
          }
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
          faturamentoUnitário: 13000,
          impostoFixo: 285000,
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
            "nome": "Livraria",
            "redCusto": { "nível1": 7, "nível2": 10, "nível3": 19 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábrica De Papel",
            "redCusto": { "nível1": 7, "nível2": 9, "nível3": 21 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Embalagem",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 50 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
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
        nome: "Fábrica de Medicamentos",
        desc: "Produz medicamentos a partir de matérias-primas.",
        licençaLiberado: {
          licença: "Licença De Base Metalúrgica",
          liberado: false,
        },
        custoConstrucao: 170000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 40000,
          impostoFixo: 910000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 4,
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
            "nome": "Farmácias",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 8, "nível3": 19 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábrica De Produtos Químicos Especializados",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório Farmacêutico",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 2,"nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 15, "nível3": 15 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 20, "nível2": 25, "nível3": 35 }
          },
          {
            "nome": "Plantações De Plantas Medicinais",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Transporte Petrolífero",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível极速1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Embalagens",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Biofábrica",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
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
        nome: "Laboratório Farmacêutico",
        desc: "Desenvolve medicamentos e produtos farmacêuticos.",
        licençaLiberado: {
          licença: "Licença De Base Metalúrgica",
          liberado: false,
        },
        custoConstrucao: 570000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 35000,
          impostoFixo: 650000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 2,
          lojasP: 3,
          lojasM: 0,
          lojasG: 3,
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
        nome: "Fábrica de Plásticos",
        desc: "Fabrica de plásticos a partir de matérias-primas.",
        licençaLiberado: {
          licença: "Licença De Base Metalúrgica",
          liberado: false,
        },
        custoConstrucao: 170000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 200000,
          impostoFixo: 5150000,
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
            "nome": "Fábrica De Embalagens",
            "redCusto": { "nível1": 5, "nível2": 8, "nível3": 14 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Produtos Químicos Especializados",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Refinaria",
            "redCusto": { "nível1": 3, "nível2": 3, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 1, "nível3": 0 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 1, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica Movida a Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 1, "nível3": 0 }
          },
          {
            "nome": "Usina De Biomassa",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 1, "nível3": 0 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 15, "nível3": 20 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 17, "nível2": 21, "nível3": 25 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Transporte Petrolífero",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 5 }
          },
          {
            "nome": "Biofábrica",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
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
        nome: "Fábrica de Químicos Especializados",
        desc: "Fabrica produtos químicos especializados para diversas indústrias.",
        licençaLiberado: {
          licença: "Licença De Base Metalúrgica",
          liberado: false,
        },
        custoConstrucao: 1260000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 350000,
          impostoFixo: 8920000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 2,
          lojasP: 2,
          lojasM: 3,
          lojasG: 4,
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
            "nome": "Fábricas De Eletrônicos",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Baterias",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica Têxtil",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 7 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Calçados",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Roupas",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Medicamentos",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório Farmacêutico",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria De Biocombustíveis",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Motores",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Foguetes",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Aeronaves",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Eletrônicos",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Estaleiro",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Semicondutores",
            "redCusto": { "nível1": 6, "nível2": 6, "nível3": 12 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Refinaria",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Plásticos",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica Movida a Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Biomassa",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 15, "nível3": 20 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 17, "nível2": 21, "nível3": 25 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Transporte Petrolífero",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plantações De Plantas Medicinais",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 5 }
          },
          {
            "nome": "Fábrica De Embalagens",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Biofábrica",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
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
          impostoFixo: 680000,
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
            "nome": "Usina Siderúrgica",
            "redCusto": { "nível1": 3, "nível2": 5, "nível3": 8 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fundição De Alumínio",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Ligas Metálicas",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Chapas Metálicas",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Mineradora",
            "redCusto": { "nível1": 4, "nível2": 5, "nível3": 8 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Terreno De Mineração",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica Movida a Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Biomassa",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 5 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 12, "nível3": 12 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 16, "nível3": 15 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 9, "nível2": 18, "nível3": 18 }
          }
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
          impostoFixo: 840000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 5,
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
            "nome": "Fundição De Alumínio",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Ligas Metálicas",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Indústria De Componentes Mecânicos",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Chapas Metálicas",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 8 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Estruturas Metálicas",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Aeroportos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Portos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Estaleiro",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Alto-Forno",
            "redCusto": { "nível1": 3, "nível2": 5, "nível3": 8 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica Movida a Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Biomassa",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 8, "nível3": 10 }
          },
          {
            "nome": "Mineradora",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 14, "nível2": 18, "nível3": 24 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 11, "nível3": 12 }
          }
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
          faturamentoUnitário: 37000,
          impostoFixo: 500000,
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
            "nome": "Fábrica De Ligas Metálicas",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Montadora De Veículos Elétricos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Estruturas Metálicas",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Peças Automotivas",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Indústria De Componentes Mecânicos",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Chapas Metálicas",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Mineradora",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica Movida a Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Biomassa",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Alto-Forno",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 16, "nível3": 20 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 9, "nível2": 10, "nível3": 11 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 7, "nível2": 11, "nível3": 15 }
          },
          {
            "nome": "Usina Siderúrgica",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
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
        nome: "Fábrica De Ligas Metálicas",
        desc: "Fabrica ligas metálicas para diversas aplicações.",
        licençaLiberado: {
          licença: "Licença De Base Metalúrgica",
          liberado: false,
        },
        custoConstrucao: 750000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 50000,
          impostoFixo: 750000,
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
            "nome": "Fábrica De Estruturas Metálicas",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Peças Automotivas",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Montadora De Veículos Elétricos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Aeronaves",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Foguetes",
            "redCusto": { "nível1": 1, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Estaleiro",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Indústria De Componentes Mecânicos",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Motores",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fundição De Alumínio",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica Movida a Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Biomassa",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Alto-Forno",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Siderúrgica",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 9, "nível3": 10 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 12, "nível3": 16 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 16, "nível3": 20 }
          },
          {
            "nome": "Mineradora",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
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
        nome: "Indústria De Componentes Mecânicos",
        desc: "Produz componentes mecânicos para indústrias.",
        licençaLiberado: {
          licença: "Licença De Metalúrgia Avançada",
          liberado: false,
        },
        custoConstrucao: 720000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 15000,
          impostoFixo: 120000,
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
            "nome": "Estaleiro",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Peças Automotivas",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Montadora De Veículos Elétricos",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Aeronaves",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Foguetes",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Robôs",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Turbinas Eólicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Motores",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Painéis Solares",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Automóveis",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábrica De Ligas Metálicas",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica Movida a Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "a极": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Biomassa",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Usina Siderúrgica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fundição De Alumínio",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Chapas Metálicas",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 5 }
          },
          {
            "nome": "Centro De Pesquisa Aeroespacial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível3": 12, "nível3": 16 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 10, "nível3": 12 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 9, "nível2": 11, "nível3": 13 }
          }
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
          faturamentoUnitário: 42000,
          impostoFixo: 880000,
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
            "nome": "Fábrica De Estruturas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 6 }
          },
          {
            "nome": "Estaleiro",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 1, "nível3": 0 }
          },
          {
            "nome": "Centros De Distribuição",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 11, "nível3": 14 }
          },
          {
            "nome": "Aeroportos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Portos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Móveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 4, "nível3": 8 }
          },
          {
            "nome": "Fábrica De Aeronaves",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 1, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Turbinas Eólicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 6 }
          },
          {
            "nome": "Indústria De Componentes Mecânicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 3 }
          },
          {
            "nome": "Fábrica De Peças Automotivas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 4 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Usina Siderúrgica",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 8 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica Movida a Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Biomassa",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 10, "nível2": 15, "nível3": 21 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fundição De Alumínio",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Alto-Forno",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 5, "nível2": 6, "nível3": 8 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 7, "nível2": 9, "nível3": 10 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 8, "nível2": 10, "nível3": 11 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],

        recursoDeConstrução: ["Indústria De Componentes Mecânicos"]
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
          faturamentoUnitário: 23500,
          impostoFixo: 370000,
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
            "nome": "Fábrica De Turbinas Eólicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 5 }
          },
          {
            "nome": "Estaleiro",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 1 }
          },
          {
            "nome": "Fábrica De Aeronaves",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 1, "nível3": 0 }
          },
          {
            "nome": "Aeroportos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Portos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mega Mercados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 0, "nível3": 2 }
          },
          {
            "nome": "Mineradora",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 1 }
          },
          {
            "nome": "Mineradora De Minérios Radioativos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora De Pedras Preciosas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 1 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábrica De Chapas Metálicas",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica Movida a Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Biomassa",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 10, "nível2": 15, "nível3": 21 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Ligas Metálicas",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fundição De Alumínio",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Siderúrgica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 5, "nível2": 6, "nível3": 8 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 7, "nível2": 9, "nível3": 10 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 8, "nível2": 10, "nível3": 11 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],

        recursoDeConstrução: ["Fábrica De Chapas Metálicas"]
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
          faturamentoUnitário: 150000,
          impostoFixo: 3600000,
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
            "nome": "Montadora De Veículos Elétricos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 3, "nível3": 2 }
          },
          {
            "nome": "Concessionárias De Veículos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 8 }
          },
          {
            "nome": "Fábricas De Automóveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Indústria De Componentes Mecânicos",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica Movida a Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Biomassa",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fundição De Alumínio",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Ligas Metálicas",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Chapas Metálicas",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 5, "nível2": 7, "nível3": 9 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 8, "nível2": 8, "nível3": 9 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 7, "nível2": 10, "nível3": 12 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Robótica",
            "redCusto": { "nível1": 5, "nível2": 8, "nível3": 10 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],

        recursoDeConstrução: ["Indústria De Componentes Mecânicos"],
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
        custoConstrucao: 3490000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 500000,
          impostoFixo: 10300000,
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
            "nome": "Concessionárias De Veículos",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábrica De Peças Automotivas",
            "redCusto": { "nível1": 1, "nível2": 3, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Motores",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Baterias",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 3 }
          },
          {
            "nome": "Fundição De Alumínio",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Ligas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Indústria De Componentes Mecânicos",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 12, "nível3": 30 }
          },
          {
            "nome": "Centro De Pesquisa Em Inteligência Artificial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 10, "nível3": 20 }
          },
          {
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 3, "nível3": 7 }
          },
          {
            "nome": "Estações De Carregamento De Veículos Elétricos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Design De Produtos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 8, "nível3": 10 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 8, "nível3": 15 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 10, "nível3": 20 }
          },
          {
            "nome": "Centro De Pesquisa Em Robótica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 12, "nível3": 25 }
          }
        ],

        recursoDeConstrução: ["Fábrica De Peças Automotivas", "Fábrica De Baterias"]
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
        nome: "Fábrica De Automóveis",
        desc: "Produz automóveis e veículos convencionais.",
        licençaLiberado: {
          licença: "Licença Automotiva",
          liberado: false,
        },
        custoConstrucao: 3450000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 350000,
          impostoFixo: 7300000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 5,
          lojasP: 1,
          lojasM: 1,
          lojasG: 3,
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
            "nome": "Concessionárias De Automóveis",
            "redCusto": { "nível1": 4, "nível2": 5, "nível3": 13 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Shopping Center",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábrica De Peças Automotivas",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Motores",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 10, "nível3": 22 }
          },
          {
            "nome": "Laboratório De Design De Produtos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 6 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Indústria De Componentes Mecânicos",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 18, "nível3": 40 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "red极": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 15, "nível3": 38 }
          },
          {
            "nome": "Centro De Pesquisa Em Robótica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 7, "nível3": 12 }
          }
        ],

        recursoDeConstrução: ["Fábrica De Peças Automotivas"]
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
        custoConstrucao: 750000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 400000,
          impostoFixo: 9550000,
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
        melhoraEficiencia: ["Fábrica de Ração", "Biofábrica", "Mercado", "Feira Livre"],

        ForneceMelhoraEficiencia: [
          {
            "nome": "Posto De Combustível",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 7 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica Movida a Biocombustíveis",
            "redCusto": { "nível1": 3, "nível2": 6, "nível3": 12 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Transporte Petrolífero",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Novos Combustíveis",
            "redCusto": { "nível极": 4, "nível2": 5, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Aeroportos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Portos",
            "redCusto": { "nível1": 1, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Motores",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Foguetes",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Aeronaves",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Estaleiro",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Plantação De Grãos",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Pomares",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 5, "nível3": 10 }
          },
          {
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Consultoria Em Engenharia Civil",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 15, "nível3": 35 }
          },
          {
            "nome": "Plataforma De Petróleo",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Coleta De Biomassa",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 3 }
          },
          {
            "nome": "Tanque De Armazenamento Biocombustível",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 15, "nível3": 35 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 7, "nível2": 28, "nível3": 47 }
          },
          {
            "nome": "Fábrica De Produtos Químicos Especializados",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Biofábrica",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],

        recursoDeConstrução: ["Fábrica de Químicos Especializados"],
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
        custoConstrucao: 1100000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 700000,
          impostoFixo: 15900000,
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
          { nome: "Fábrica de Ração", redCusto: 1, redFatu: 2 },
          { nome: "Biofábrica", redCusto: 4, redFatu: 1 },
          { nome: "Mercado", redCusto: 2, redFatu: 4 },
          { nome: "Feira Livre", redCusto: 2, redFatu: 3 },
        ],


        ForneceMelhoraEficiencia: [
          {
            "nome": "Posto De Combustível",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 6, "nível3": 16 }
          },
          {
            "nome": "Fábrica De Produtos Químicos Especializados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 1, "nível3": 3 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 14, "nível3": 20 }
          },
          {
            "nome": "Transporte Petrolífero",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 5 }
          },
          {
            "nome": "Laboratório De Novos Combustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 8, "nível3": 20 }
          },
          {
            "nome": "Aeroportos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 1 }
          },
          {
            "nome": "Portos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 1 }
          },
          {
            "nome": "Fábrica De Motores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 1, "nível3": 1 }
          },
          {
            "nome": "Fábrica De Foguetes",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 1 }
          },
          {
            "nome": "Fábrica De Aeronaves",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 1 }
          },
          {
            "nome": "Estaleiro",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 1 }
          },
          {
            "nome": "Fábrica De Plásticos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 3, "nível3": 3 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica Movida a Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Biomassa",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plataforma De Petróleo",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Energética",
            "redCusto": { "nível1": 4, "nível2": 14, "nível3": 28 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 6, "nível2": 16, "nível3": 32 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Produtos Químicos Especializados",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 2, "nível2": 5, "nível3": 10 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Transporte Petrolífero",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Consultoria Em Engenharia Civil",
            "redCusto": { "nível1": 8, "nível2": 30, "nível3": 60 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],

        recursoDeConstrução: ["Refinaria de Biocombustíveis", "Fábrica de Químicos Especializados"],
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
        custoConstrucao: 1460000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 200000,
          impostoFixo: 4750000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },
        lojasNecessarias: {
          terrenos: 5,
          lojasP: 2,
          lojasM: 2,
          lojasG: 5,
        },
        construçõesNecessárias: [],
        licençasNecessárias: ["Silo", "Plantação De Vegetais"],
        melhoraEficiencia: ["Fábrica de Ração", "Biofábrica", "Mercado", "Feira Livre"],

        ForneceMelhoraEficiencia: [
          {
            "nome": "Fábrica De Fertilizante",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 12 }
          },
          {
            "nome": "Fábrica De Medicamentos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 5 }
          },
          {
            "nome": "Laboratório Farmacêutico",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 5 }
          },
          {
            "nome": "Fábrica De Plásticos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 5 }
          },
          {
            "nome": "Fábrica De Químicos Especializados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 4 }
          },
          {
            "nome": "Refinaria De Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 1 }
          },
          {
            "nome": "Usina De Biomassa",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Usina Termelétrica Movida a Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 5 }
          },
          {
            "nome": "Tanque De Armazenamento De Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 16, "nível3": 21 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Instituto De Biotecnologia",
            "redCusto": { "nível1": 3, "nível2": 12, "nível3": 28 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Agrícola",
            "redCusto": { "nível1": 2, "nível2": 7, "nível3": 14 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Instituto De Tecnologia Alimentar",
            "redCusto": { "nível1": 2, "nível2": 7, "nível3": 14 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Novos Combustíveis",
            "redCusto": { "nível1": 2, "nível2": 7, "nível3": 14 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 5, "nível2": 12, "nível3": 20 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plantação De Grãos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Fertilizante",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plantação De Vegetais",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Pomares",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plantações De Plantas Medicinais",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Eucalipto",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fazenda De Vacas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Granja De Aves",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Criação De Ovinos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Depósito De Resíduos Orgânicos",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Coleta De Biomassa",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Consultoria Em Engenharia Civil",
            "redCusto": { "nível1": 6, "nível2": 20, "nível3": 40 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
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
        nome: "Fábrica De Chips",
        desc: "Produz bioprodutos e materiais orgânicos.",
        licençaLiberado: {
          licença: "Licença Microeletrônica",
          liberado: false,
        },
        custoConstrucao: 1460000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 200000,
          impostoFixo: 4750000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },
        lojasNecessarias: {
          terrenos: 5,
          lojasP: 2,
          lojasM: 2,
          lojasG: 5,
        },
        construçõesNecessárias: [],
        licençasNecessárias: ["Silo", "Plantação De Vegetais"],
        melhoraEficiencia: ["Fábrica de Ração", "Biofábrica", "Mercado", "Feira Livre"],

        ForneceMelhoraEficiencia: [
          {
            "nome": "Fábrica De Smartphones",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 4 }
          },
          {
            "nome": "Fábrica De Computadores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 3 }
          },
          {
            "nome": "Fábrica De Consoles De Jogos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Fábrica De Dispositivos Vestiveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 5 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 6, "nível3": 6 }
          },
          {
            "nome": "Fábrica De Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 2, "nível3": 4 }
          },
          {
            "nome": "Fábrica De Chips",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 1 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábricas De Robôs",
            "redCusto": { "nível1": 2, "nível2": 1, "nível3": 7 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Eletrônicos",
            "redCusto": { "nível1": 3, "nível2": 2, "nível3": 8 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica Movida a Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Biomassa",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em IA",
            "redCusto": { "nível1": 2, "nível2": 4, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 6, "nível2": 6, "nível3": 9 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Robótica",
            "redCusto": { "nível1": 7, "nível2": 10, "nível3": 12 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 6, "nível2": 8, "nível3": 9 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 8, "nível2": 10, "nível3": 11 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
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
        nome: "Fábrica De Placas Eletrônicas",
        desc: "Produz bioprodutos e materiais orgânicos.",
        licençaLiberado: {
          licença: "Licença Microeletrônica",
          liberado: false,
        },
        custoConstrucao: 1460000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 200000,
          impostoFixo: 4750000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },
        lojasNecessarias: {
          terrenos: 5,
          lojasP: 2,
          lojasM: 2,
          lojasG: 5,
        },
        construçõesNecessárias: [],
        licençasNecessárias: ["Silo", "Plantação De Vegetais"],
        melhoraEficiencia: ["Fábrica de Ração", "Biofábrica", "Mercado", "Feira Livre"],

        ForneceMelhoraEficiencia: [
          {
            "nome": "Fábrica De Smartphones",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Fábrica De Computadores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Fábrica De Consoles De Jogos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 5 }
          },
          {
            "nome": "Fábrica De Dispositivos Vestiveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 5 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 8, "nível3": 8 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábricas De Robôs",
            "redCusto": { "nível1": 2, "nível2": 1, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Eletrônicos",
            "redCusto": { "nível1": 3, "nível2": 2, "nível3": 9 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica Movida a Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Biomassa",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em IA",
            "redCusto": { "nível1": 2, "nível2": 4, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 6, "nível2": 6, "nível3": 9 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Robótica",
            "redCusto": { "nível1": 7, "nível2": 10, "nível3": 12 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 6, "nível2": 8, "nível3": 9 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 8, "nível2": 10, "nível3": 11 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
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
        nome: "Fábrica De Semicondutores",
        desc: "Produz semicondutores e chips para tecnologia.",
        licençaLiberado: {
          licença: "Licença Microeletrônica",
          liberado: false,
        },
        custoConstrucao: 11500000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 1000000,
          impostoFixo: 21500000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 40,
          lojasP: 30,
          lojasM: 10,
          lojasG: 40,
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
            "nome": "Fábricas De Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 2, "nível3": 4 }
          },
          {
            "nome": "Fábricas De Robôs",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 1, "nível3": 0 }
          },
          {
            "nome": "Centros De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 5 }
          },
          {
            "nome": "Data Centers",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 2, "nível3": 5 }
          },
          {
            "nome": "Loja De Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 3 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 5 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica Movida a Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Biomassa",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Produtos Químicos Especializados",
            "redCusto": { "nível1": 6, "nível2": 6, "nível3": 12 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 6, "nível2": 8, "nível3": 10 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 9, "nível2": 12, "nível3": 15 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Robótica",
            "redCusto": { "nível1": 7, "nível2": 9, "nível3": 10 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],

        recursoDeConstrução: ["Fábrica De Eletrônicos"]
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
        custoConstrucao: 1340000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 500000,
          impostoFixo: 13080000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 10,
          lojasP: 2,
          lojasM: 0,
          lojasG: 3,
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
            "nome": "Fábricas De Robôs",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 1, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 1, "nível3": 4 }
          },
          {
            "nome": "Fábrica De Painéis Solares",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 5, "nível3": 8 }
          },
          {
            "nome": "Data Centers",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 4 }
          },
          {
            "nome": "Servidores De Nuvem",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 8 }
          },
          {
            "nome": "Loja De Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 3 }
          },
          {
            "nome": "Centros De Pesquisa Em Robótica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 6, "nível3": 6 }
          },
          {
            "nome": "Startups",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 3 }
          },
          {
            "nome": "Fábrica De Baterias",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Centros De Pesquisa Em IA",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 7, "nível2": 9, "nível3": 9 }
          },
          {
            "nome": "Fábrica De Foguetes",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 1, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Chips",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 2, "nível3": 8 }
          },
          {
            "nome": "Fábrica De Placas Eletrônicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 2, "nível3": 9 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábricas De Semicondutores",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Produtos Químicos Especializados",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica Movida a Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Biomassa",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 8, "nível2": 10, "nível3": 12 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 10, "nível2": 11, "nível3": 12 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Design De Produtos",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Robótica",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em IA",
            "redCusto": { "nível1": 3, "nível2": 5, "nível3": 7 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Chips",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Placas Eletrônicas",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
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
        nome: "Fábrica De Robôs",
        desc: "Monta robôs e sistemas de automação.",
        licençaLiberado: {
          licença: "Licença De Eletrônica Avançada",
          liberado: false,
        },
        custoConstrucao: 10300000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 2000000,
          impostoFixo: 44500000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 20,
          lojasP: 10,
          lojasM: 20,
          lojasG: 40,
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
            "nome": "Empresa de Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 4, "nível3": 7 }
          },
          {
            "nome": "Centros de Pesquisa em Robótica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 12, "nível3": 13 }
          },
          {
            "nome": "Fábrica De Chips",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 1, "nível3": 7 }
          },
          {
            "nome": "Fábrica De Placas Eletrônicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 1, "nível3": 5 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábricas de Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas de Semicondutores",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica Movida a Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina de Biomassa",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina de Fusão Nuclear",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa de Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Centro de Pesquisa em Robótica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 29, "nível3": 55 }
          },
          {
            "nome": "Centro de Pesquisa em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 4, "nível3": 36 }
          },
          {
            "nome": "Construtora de Grandes Infraestruturas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Design De Produtos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 4, "nível3": 6 }
          },
          {
            "nome": "Centro de Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 4, "nível3": 7 }
          },
          {
            "nome": "Centro de Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 6, "nível3": 6 }
          },
          {
            "nome": "Centro de Pesquisa em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 6, "nível3": 6 }
          },
          {
            "nome": "Centro de Pesquisa em IA",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 6, "nível3": 6 }
          },
          {
            "nome": "Indústria de Componentes Mecânicos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Chips",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Placas Eletrônicas",
            "redCusto": { "nível1": 1, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
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
        custoConstrucao: 2530000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 1000000,
          impostoFixo: 28000000,
          impostoSobreFatu: 0.05000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 3,
          lojasP: 1,
          lojasM: 1,
          lojasG: 3,
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
            "nome": "Fábricas de Robôs",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 4, "nível3": 7 }
          },
          {
            "nome": "Fábricas de Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 1, "nível3": 4 }
          },
          {
            "nome": "Mega Mercados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centros de Pesquisa em IA",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica de Turbinas Eólicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica de Painéis Solares",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica de Baterias",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica de Móveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 6, "nível3": 8 }
          },
          {
            "nome": "Fábrica de Rações",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 12, "nível3": 18 }
          },
          {
            "nome": "Fábrica de Embalagens",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 12, "nível3": 14 }
          },
          {
            "nome": "Fábrica de Fertilizante",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 8, "nível3": 12 }
          },
          {
            "nome": "Fábrica de Bebidas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 12, "nível3": 16 }
          },
          {
            "nome": "Fábrica Têxtil",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 14, "nível2": 18, "nível3": 24 }
          },
          {
            "nome": "Fábrica de Roupas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 20, "nível3": 26 }
          },
          {
            "nome": "Fábrica de Celulose",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 18, "nível2": 22, "nível3": 28 }
          },
          {
            "nome": "Fábrica de Papel",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 25, "nível3": 30 }
          },
          {
            "nome": "Fábrica de Livros",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 50 }
          },
          {
            "nome": "Fábrica de Medicamentos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 15, "nível3": 15 }
          },
          {
            "nome": "Laboratório Farmacêutico",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 18, "nível3": 22 }
          },
          {
            "nome": "Fábrica de Plásticos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 15, "nível3": 20 }
          },
          {
            "nome": "Fábrica de Produtos Químicos Especializados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 15, "nível3": 20 }
          },
          {
            "nome": "Alto-Forno",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 5 }
          },
          {
            "nome": "Usina Siderúrgica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Fundição de Alumínio",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Fábrica de Ligas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Indústria de Componentes Mecânicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Fábrica de Chapas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 15, "nível3": 21 }
          },
          {
            "nome": "Fábrica de Peças Automotivas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Fábrica de Estruturas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 15, "nível3": 21 }
          },
          {
            "nome": "Montadora de Veículos Elétricos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 3 }
          },
          {
            "nome": "Fábricas de Automóveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Refinaria de Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 3 }
          },
          {
            "nome": "Fábricas de Semicondutores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 5 }
          },
          {
            "nome": "Fábrica de Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Fábricas de Robôs",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Fábrica de Motores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 3 }
          },
          {
            "nome": "Fábrica de Foguetes",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Fábrica de Aeronaves",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 4 }
          },
          {
            "nome": "Estaleiro",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 5, "nível3": 7 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica Movida a Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina de Biomassa",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina de Fusão Nuclear",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro de Pesquisa em IA",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 5 }
          },
          {
            "nome": "Centro de Pesquisa em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 7 }
          },
          {
            "nome": "Centro de Pesquisa em Robótica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 7, "nível3": 13 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro de Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 0, "nível3": 5 }
          },
          {
            "nome": "Centro de Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 0, "nível3": 5 }
          },
          {
            "nome": "Centro de Pesquisa em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 0, "nível3": 5 }
          },
          {
            "nome": "Indústria de Componentes Mecânicos",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
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
        nome: "Fábrica De Motores",
        desc: "Fabrica motores para veículos e máquinas.",
        licençaLiberado: {
          licença: "Licença De Engenharia Mecânica Avançada",
          liberado: false,
        },
        custoConstrucao: 3270000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 2000000,
          impostoFixo: 49000000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 1,
          lojasP: 3,
          lojasM: 5,
          lojasG: 7,
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
            "nome": "Fábrica De Foguetes",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 1 }
          },
          {
            "nome": "Fábrica De Aeronaves",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 1, "nível3": 1 }
          },
          {
            "nome": "Montadora De Veículos Elétricos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 1, "nível3": 1 }
          },
          {
            "nome": "Fábricas De Automóveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 3 }
          },
          {
            "nome": "Centro De Pesquisa Aeroespacial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 6, "nível3": 6 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábrica De Ligas Metálicas",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Indústria De Componentes Mecânicos",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Produtos Químicos Especializados",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 2, "nível2": 7, "nível3": 15 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Energética",
            "redCusto": { "nível1": 2, "nível2": 5, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 3, "nível2": 5, "nível3": 11 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Novos Combustíveis",
            "redCusto": { "nível1": 2, "nível2": 7, "nível3": 14 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria De Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Aeroespacial",
            "redCusto": { "nível1": 2, "nível2": 7, "nível3": 20 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 3, "nível2": 14, "nível3": 28 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 2, "nível2": 14, "nível3": 28 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],

        recursoDeConstrução: ["Usina Siderúrgica", "Fábrica De Peças Automotivas", "Fábrica De Eletrônicos"]
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
        custoConstrucao: 67200000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 5000000,
          impostoFixo: 102000000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 10,
          lojasP: 20,
          lojasM: 10,
          lojasG: 30,
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
            "nome": "Centro De Pesquisa Aeroespacial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 6, "nível3": 6 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábrica De Ligas Metálicas",
            "redCusto": { "nível1": 1, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica Movida a Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Biomassa",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Indústria De Componentes Mecânicos",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Motores",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Aeroespacial",
            "redCusto": { "nível1": 3, "nível2": 12, "nível3": 24 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 2, "nível2": 5, "nível3": 10 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 1, "nível2": 7, "nível3": 14 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Produtos Químicos Especializados",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Design De Produtos",
            "redCusto": { "nível1": 1, "nível2": 3, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Novos Combustíveis",
            "redCusto": { "nível1": 1, "nível2": 5, "nível3": 10 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0}
          },
          {
            "nome": "Refinaria",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria De Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 2, "nível2": 10, "nível3": 23 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 3, "nível2": 12, "nível3": 26 },
            "aumFatu": { "nível1": 0,"nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Robótica",
            "redCusto": { "nível1": 2, "nível2": 4, "nível3": 8 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],

        recursoDeConstrução: ["Fábrica De Motores", "Fábrica De Ligas Metálicas"]
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
        custoConstrucao: 11600000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 2000000,
          impostoFixo: 41000000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 20,
          lojasP: 30,
          lojasM: 20,
          lojasG: 30,
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
            "nome": "Aeroportos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 1, "nível3": 0 }
          },
          {
            "nome": "Centro de Pesquisa Aeroespacial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 6, "nível3": 7 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábrica de Motores",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica de Estruturas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica de Chapas Metálicas",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica Movida a Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina de Biomassa",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina de Fusão Nuclear",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro de Pesquisa em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 10 }
          },
          {
            "nome": "Centro de Pesquisa Aeroespacial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 12, "nível3": 32 }
          },
          {
            "nome": "Fábrica de Produtos Químicos Especializados",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa de Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 4 }
          },
          {
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 4 }
          },
          {
            "nome": "Construtora de Grandes Infraestruturas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Design De Produtos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 4, "nível3": 8 }
          },
          {
            "nome": "Centro de Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 3, "nível3": 5 }
          },
          {
            "nome": "Laboratório De Novos Combustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 5 }
          },
          {
            "nome": "Refinaria",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria de Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro de Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 15, "nível3": 27 }
          },
          {
            "nome": "Centro de Pesquisa em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 12, "nível3": 20 }
          },
          {
            "nome": "Centro de Pesquisa em Robótica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 8, "nível3": 15 }
          },
          {
            "nome": "Fábrica de Ligas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Indústria de Componentes Mecânicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],

        recursoDeConstrução: ["Fábrica De Motores", "Fábrica De Estruturas Metálicas"],

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
        nome: "Estaleiro",
        desc: "Constrói navios e embarcações de grande porte.",
        licençaLiberado: {
          licença: "Licença De Engenharia Mecânica Avançada",
          liberado: false,
        },
        custoConstrucao: 1100000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 2000000,
          impostoFixo: 52550000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 10,
          lojasP: 10,
          lojasM: 10,
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
            "nome": "Porto",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 0, "nível3": 4 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Usina Siderúrgica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Indústria de Componentes Mecânicos",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica de Produtos Químicos Especializados",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica de Ligas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica de Estruturas Metálicas",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica de Chapas Metálicas",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica Movida a Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina de Biomassa",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina de Fusão Nuclear",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora de Grandes Infraestruturas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro de Pesquisa em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 10, "nível3": 22 }
          },
          {
            "nome": "Empresa de Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 5, "nível3": 7 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Design De Produtos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 7, "nível3": 12 }
          },
          {
            "nome": "Laboratório De Novos Combustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 8, "nível3": 10 }
          },
          {
            "nome": "Refinaria",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria de Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro de Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 18, "nível3": 42 }
          },
          {
            "nome": "Centro de Pesquisa em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 17, "nível3": 37 }
          }
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

  })
  
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
  
    const atualizarDadosVariados = (chave, novoValor) => {
      setDados(prevState => ({
        ...prevState,
        [chave]: novoValor
      }));
    };
  
  
  
    return (
      <IndustriaContext.Provider value={{ dadosIndustria,setDadosIndustria , atualizarDados, atualizarDadosProf, atualizarDadosProf2, atualizarDadosProf3, atualizarDadosVariados }}>
        {children}
      </IndustriaContext.Provider>
    );
  };
  
  export const useIndustria = () => useContext(IndustriaContext);
  