import React, { useState, createContext,useContext } from 'react';

const ComercioContext = createContext();

export const ComercioProvider = ({ children }) => {

const [dadosComercio, setDadosComercio] = useState({


comercio: {
    economiaSetor: {
      estadoAtual: "estável"
    },
    licençaGlobal: {
      comprado: true,
      valor: 20000
    },
    licençasSetor: [{
      nome: "Licença Global De Comércio",
      desc: "Permite a abertura de estabelecimentos comerciais básicos, formando a rede inicial de comércio e serviços essenciais.",
      valor: 7000,
      edifíciosLiberados: ["Feira", "Loja De Móveis", "Restaurante", "Livraria"],
      status: false
    },
    {
      nome: "Licença De Comércio Local",
      desc: "Autoriza operações de comércio varejista de alimentos e produtos básicos para suprir necessidades diárias da população.",
      valor: 7000,
      edifíciosLiberados: ["Mercado", "Adega", "Padaria", "Açougue"],
      status: false
    },
    {
      nome: "Licença De Varejo",
      desc: "Habilita estabelecimentos de conveniência e postos de combustível, importantes para o abastecimento local e mobilidade urbana.",
      valor: 7000,
      edifíciosLiberados: ["Loja De Conveniência", "Posto De Combustíveis"],
      status: false
    },
    {
      nome: "Licença De Comércio De Tecnologia",
      desc: "Permite a abertura de lojas voltadas para a venda de eletrônicos e dispositivos tecnológicos, desbloqueando novos mercados de consumo.",
      valor: 7000,
      edifíciosLiberados: ["Loja de Gadgets e Wearables", "Loja De Games","Loja De Celulares","Loja De Informática"],
      status: false
    },
    {
      nome: "Licença De Comércio Urbano",
      desc: "Permite a operação de lojas especializadas e serviços urbanos de médio porte, elevando o nível comercial da cidade.",
      valor: 7000,
      edifíciosLiberados: ["Redes De Fast-food", "Loja De Eletrônicos", "Joalheria", "Concessionária De Veículos"],
      status: false
    },
    {
      nome: "Licença De Serviços E Saúde",
      desc: "Autoriza a prestação de serviços especializados em saúde animal, humana e alimentação, melhorando a qualidade de vida urbana.",
      valor: 7000,
      edifíciosLiberados: ["Petshop", "Farmácia", "Cafeteria"],
      status: false
    },
    {
      nome: "Licença De Varejo Especializado",
      desc: "Habilita lojas departamentais e especializadas em moda, ampliando as opções de consumo e vestuário para a população.",
      valor: 7000,
      edifíciosLiberados: ["Loja De Departamentos", "Loja De Calçados", "Loja De Vestuário"],
      status: false
    },
    {
      nome: "Licença De Shoppings",
      desc: "Permite a construção de centros comerciais de grande porte, impulsionando a economia e o comércio em escala regional.",
      valor: 7000,
      edifíciosLiberados: ["Shopping Popular", "Shopping Center"],
      status: false
    },
    {
      nome: "Licença De Logística E Transporte",
      desc: "Autoriza a operação de centros de distribuição e transporte de mercadorias, essencial para a cadeia de suprimentos da cidade.",
      valor: 7000,
      edifíciosLiberados: ["Centro De Transporte e Entrega", "Centro De Distribuição", "Armazém Logístico", "Transporte Petrolífero"],
      status: false
    }
    ]

    ,
    edificios: [
      {
        nome: "Feira",
        desc: "Vende produtos agrícolas e artesanais em um mercado aberto.",
        licençaLiberado: {
          licença: "Licença Global De Comércio",
          liberado: false,
        },
        custoConstrucao: 5000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 550, // Mantido
          impostoFixo: 12600, // Novo valor
          impostoSobreFatu: 0.10,
          rent: 5
        },

        lojasNecessarias: {
          terrenos: 1,
          lojasP: 0,
          lojasM: 0,
          lojasG: 0,
        },
        construçõesNecessárias: [],
        licençasNecessárias: ["Silo", "Plantação De Vegetais"],
        melhoraEficiencia: [
          "Fábrica De Ração",
          "Biofábrica",
          "mercado",
          "Feira Livre",
        ],

        ForneceMelhoraEficiencia: [],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Plantação De Grãos",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plantação De Vegetais",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fazenda De Vacas",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Granja De Aves",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Criação De Ovinos",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Pomares",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Transporte E Entrega",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
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
        nome: "Loja De Móveis",
        desc: "Comercializa móveis e artigos para decoração.",
        licençaLiberado: {
          licença: "Licença Global De Comércio",
          liberado: false,
        },
        custoConstrucao: 40000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 1600, // Mantido
          impostoFixo: 34100, // Novo valor calculado
          impostoSobreFatu: 0.10,
          rent: 7
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

        ForneceMelhoraEficiencia: [],
  RecebeMelhoraEficiencia: [
    {
      "nome": "Fábrica De Móveis",
      "redCusto": { "nível1": 7, "nível2": 12, "nível3": 24 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Centro De Transporte E Entrega",
      "redCusto": { "nível1": 3, "nível2": 3, "nível3": 5 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Marketplace Online",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
      "aumFatu": { "nível1": 7, "nível2": 10, "nível3": 14 }
    },
    {
      "nome": "Construtora De Pequenas Obras",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Laboratório De Design De Produtos",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
      "aumFatu": { "nível1": 12, "nível2": 16, "nível3": 20 }
    },
    {
      "nome": "Escritório De Design De Interiores",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
      "aumFatu": { "nível1": 11, "nível2": 14, "nível3": 16 }
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
        nome: "Restaurante",
        desc: "Serve refeições e pratos preparados com alimentos frescos.",
        licençaLiberado: {
          licença: "Licença Global De Comércio",
          liberado: false,
        },
        custoConstrucao: 20000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 1400, // Mantido
          impostoFixo: 26800, // Novo valor calculado
          impostoSobreFatu: 0.10,
          rent: 10
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

        ForneceMelhoraEficiencia: [],
  RecebeMelhoraEficiencia: [
    {
      "nome": "Mega Mercado",
      "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Mercado",
      "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Açougue",
      "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Centro De Transporte E Entrega",
      "redCusto": { "nível1": 2, "nível2": 3, "nível3": 6 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Construtora De Pequenas Obras",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Plantação De Grãos",
      "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Plantação De Vegetais",
      "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Pomares",
      "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Fábrica De Bebidas",
      "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Instituto De Tecnologia Alimentar",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
      "aumFatu": { "nível1": 10, "nível2": 14, "nível3": 18 }
    },
    {
      "nome": "Centro De Comércio De Plantações",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
      "aumFatu": { "nível1": 12, "nível2": 15, "nível3": 20 }
    },
    {
      "nome": "Escritório De Design De Interiores",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
      "aumFatu": { "nível1": 8, "nível2": 11, "nível3": 12 }
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
        nome: "Livraria",
        desc: "Vende livros, revistas e materiais de leitura.",
        licençaLiberado: {
          licença: "Licença Global De Comércio",
          liberado: false,
        },
        custoConstrucao: 0,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 1100,
          impostoFixo: 23000,
          impostoSobreFatu: 0.10,
          rent: 7
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

        ForneceMelhoraEficiencia: [],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábrica De Livros",
            "redCusto": { "nível1": 7, "nível2": 10, "nível3": 19 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Transporte E Entrega",
            "redCusto": { "nível1": 3, "nível2": 5, "nível3": 10 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Marketplace Online",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 7, "nível2": 13, "nível3": 18 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 18, "nível2": 22, "nível3": 27 }
          },
          {
            "nome": "Escritório De Design De Interiores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 5, "nível3": 5 }
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
        nome: "Mercado",
        desc: "Oferece alimentos, bebidas e produtos básicos para consumo.",
        licençaLiberado: {
          licença: "Licença De Comércio Local",
          liberado: false,
        },
        custoConstrucao: 170000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 5800,
          impostoFixo: 90000,
          impostoSobreFatu: 0.10,
          rent: 8
        },

        lojasNecessarias: {
          terrenos: 0,
          lojasP: 1,
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
            "nome": "Restaurante",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábrica De Bebidas",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plantação De Grãos",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plantação De Vegetais",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Pomares",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fazenda De Vacas",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Granja De Aves",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Marketplace Online",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 5, "nível3": 5 }
          },
          {
            "nome": "Centro De Transporte E Entrega",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 10 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Cooperativas Agrícolas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 10, "nível3": 12 }
          },
          {
            "nome": "Centro De Comércio De Plantações",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 12, "nível3": 14 }
          },
          {
            "nome": "Escritório De Design De Interiores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 7, "nível2": 13, "nível3": 19 }
          }
        ],

        recursoDeConstrução: ["Padaria", "Açougue"]
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
        nome: "Adega",
        desc: "Comercializa vinhos, cervejas e outras bebidas alcóolicas.",
        licençaLiberado: {
          licença: "Licença De Comércio Local",
          liberado: false,
        },
        custoConstrucao: 0,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 1150,
          impostoFixo: 22500,
          impostoSobreFatu: 0.10,
          rent: 10
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

        ForneceMelhoraEficiencia: [],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Centro De Transporte E Entrega",
            "redCusto": { "nível1": 3, "nível2": 5, "nível3": 7 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Bebidas",
            "redCusto": { "nível1": 7, "nível2": 10, "nível3": 22 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Instituto De Tecnologia Alimentar",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 18, "nível2": 22, "nível3": 28 }
          },
          {
            "nome": "Escritório De Design De Interiores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 18, "nível3": 22 }
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
        nome: "Padaria",
        desc: "Produz e vende pães, bolos e doces frescos.",
        licençaLiberado: {
          licença: "Licença De Comércio Local",
          liberado: false,
        },
        custoConstrucao: 0,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 1100,
          impostoFixo: 18000,
          impostoSobreFatu: 0.10,
          rent: 12
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

        ForneceMelhoraEficiencia: [],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Centro De Transporte E Entrega",
            "redCusto": { "nível1": 3, "nível2": 5, "nível3": 7 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Pães",
            "redCusto": { "nível1": 7, "nível2": 10, "nível3": 22 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Instituto De Tecnologia Alimentar",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 18, "nível2": 22, "nível3": 28 }
          },
          {
            "nome": "Escritório De Design De Interiores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 18, "nível3": 22 }
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
        nome: "Açougue",
        desc: "Vende carnes, aves e produtos derivados de açougue.",
        licençaLiberado: {
          licença: "Licença De Comércio Local",
          liberado: false,
        },
        custoConstrucao: 0,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 1100,
          impostoFixo: 18000,
          impostoSobreFatu: 0.10,
          rent: 12
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
            "nome": "Restaurante",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Centro De Transporte E Entrega",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fazenda De Vacas",
            "redCusto": { "nível1": 4, "nível2": 5, "nível3": 11 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Criação De Ovinos",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Granja De Aves",
            "redCusto": { "nível1": 2, "nível2": 4, "nível3": 8 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Instituto De Tecnologia Alimentar",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 18, "nível2": 22, "nível3": 28 }
          },
          {
            "nome": "Escritório De Design De Interiores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 18, "nível3": 22 }
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
        nome: "Loja De Conveniência",
        desc: "Oferece produtos de conveniência e itens essenciais.",
        licençaLiberado: {
          licença: "Licença De Varejo",
          liberado: false,
        },
        custoConstrucao: 10000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 1200,
          impostoFixo: 19000,
          impostoSobreFatu: 0.10,
          rent: 12
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

        ForneceMelhoraEficiencia: [],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Centro De Transporte E Entrega",
            "redCusto": { "nível1": 3, "nível2": 5, "nível3": 7 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Bebidas",
            "redCusto": { "nível1": 7, "nível2": 10, "nível3": 22 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Escritório De Design De Interiores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 50 }
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
        nome: "Posto De Combustíveis",
        desc: "Vende combustíveis e serviços para veículos automotivos.",
        licençaLiberado: {
          licença: "Licença De Varejo",
          liberado: false,
        },
        custoConstrucao: 20000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 1600,
          impostoFixo: 21000,
          impostoSobreFatu: 0.10,
          rent: 15
        },

        lojasNecessarias: {
          terrenos: 1,
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
            "nome": "Laboratório De Novos Combustíveis",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Refinaria",
            "redCusto": { "nível1": 4, "nível2": 6, "nível3": 16 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria De Biocombustíveis",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 7 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Transporte Petrolífero",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 20, "nível2": 25, "nível3": 30 }
          },
          {
            "nome": "Laboratório De Novos Combustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 15, "nível3": 20 }
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
        nome: "Redes De Fast-food",
        desc: "Serve lanches rápidos e refeições pré-preparadas.",
        licençaLiberado: {
          licença: "Licença De Comércio Urbano",
          liberado: false,
        },
        custoConstrucao: 40000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 1150,
          impostoFixo: 16000,
          impostoSobreFatu: 0.10,
          rent: 12
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
            "nome": "Shopping Popular",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Transporte E Entrega",
            "redCusto": { "nível1": 4, "nível2": 6, "nível3": 10 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plantação De Vegetais",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Marketplace Online",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 10, "nível3": 12 }
          },
          {
            "nome": "Fábrica De Bebidas",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 8 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Pães",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Instituto De Tecnologia Alimentar",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 16, "nível3": 20 }
          },
          {
            "nome": "Escritório De Design De Interiores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 14, "nível3": 18 }
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
        nome: "Loja De Eletrônicos",
        desc: "Comercializa eletrônicos, gadgets e aparelhos tecnológicos.",
        licençaLiberado: {
          licença: "Licença De Comércio Urbano",
          liberado: false,
        },
        custoConstrucao: 90000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 1600,
          impostoFixo: 22000,
          impostoSobreFatu: 0.10,
          rent: 12
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

        ForneceMelhoraEficiencia: [],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábrica De Eletrônicos",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Semicondutores",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Transporte E Entrega",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 18, "nível2": 24, "nível3": 28 }
          },
          {
            "nome": "Fábrica De Smartphones",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Computadores",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Consoles De Jogos",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Dispositivos Vestíveis",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Escritório De Design De Interiores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 16, "nível3": 22 }
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
        nome: "Joalheria",
        desc: "Vende joias, relógios e acessórios de luxo.",
        licençaLiberado: {
          licença: "Licença De Comércio Urbano",
          liberado: false,
        },
        custoConstrucao: 30000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 2000,
          impostoFixo: 30000,
          impostoSobreFatu: 0.10,
          rent: 15
        },

        lojasNecessarias: {
          terrenos: 1,
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

        ForneceMelhoraEficiencia: [],
  RecebeMelhoraEficiencia: [
    {
      "nome": "Mineradora De Pedras Preciosas",
      "redCusto": { "nível1": 7, "nível2": 10, "nível3": 23 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Centro De Transporte E Entrega",
      "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Construtora De Pequenas Obras",
      "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Laboratório De Design De Produtos",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
      "aumFatu": { "nível1": 15, "nível2": 20, "nível3": 25 }
    },
    {
      "nome": "Escritório De Design De Interiores",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
      "aumFatu": { "nível1": 15, "nível2": 20, "nível3": 25 }
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
        nome: "Concessionária De Veículos",
        desc: "Revende veículos novos e usados de diversas marcas.",
        licençaLiberado: {
          licença: "Licença De Comércio Urbano",
          liberado: false,
        },
        custoConstrucao: 30000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 3200,
          impostoFixo: 57000,
          impostoSobreFatu: 0.10,
          rent: 12
        },

        lojasNecessarias: {
          terrenos: 1,
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

        ForneceMelhoraEficiencia: [],
  RecebeMelhoraEficiencia: [
    {
      "nome": "Fábricas De Automóveis",
      "redCusto": { "nível1": 4, "nível2": 5, "nível3": 13 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Fábrica De Peças Automotivas",
      "redCusto": { "nível1": 3, "nível2": 5, "nível3": 8 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Centro De Transporte E Entrega",
      "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Construtora",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Montadora De Veículos Elétricos",
      "redCusto": { "nível1": 2, "nível2": 3, "nível3": 5 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Escritório De Design De Interiores",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
      "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 50 }
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
        nome: "Petshop",
        desc: "Oferece produtos e serviços para animais de estimação.",
        licençaLiberado: {
          licença: "Licença De Serviços E Saúde",
          liberado: false,
        },
        custoConstrucao: 0,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 1300,
          impostoFixo: 26000,
          impostoSobreFatu: 0.10,
          rent: 10
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

        ForneceMelhoraEficiencia: [],
  RecebeMelhoraEficiencia: [
    {
      "nome": "Centro De Transporte E Entrega",
      "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Fábrica De Rações",
      "redCusto": { "nível1": 8, "nível2": 12, "nível3": 25 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Construtora De Pequenas Obras",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Escritório De Design De Interiores",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
      "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 50 }
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
        nome: "Farmácia",
        desc: "Vende medicamentos e produtos de saúde e bem-estar.",
        licençaLiberado: {
          licença: "Licença De Serviços E Saúde",
          liberado: false,
        },
        custoConstrucao: 90000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 1700,
          impostoFixo: 25000,
          impostoSobreFatu: 0.10,
          rent: 12
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

        ForneceMelhoraEficiencia: [],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábrica De Medicamentos",
            "redCusto": { "nível1": 6, "nível2": 8, "nível3": 19 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório Farmacêutico",
            "redCusto": { "nível1": 3, "nível2": 5, "nível3": 7 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Transporte E Entrega",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Marketplace Online",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 15, "nível3": 20 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Escritório De Design De Interiores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 18, "nível2": 25, "nível3": 30 }
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
        nome: "Cafeteria",
        desc: "Serve cafés, chás e lanches leves em ambiente aconchegante.",
        licençaLiberado: {
          licença: "Licença De Serviços E Saúde",
          liberado: false,
        },
        custoConstrucao: 0,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 1100,
          impostoFixo: 19000,
          impostoSobreFatu: 0.10,
          rent: 12
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
            "nome": "Shopping Popular",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Plantação De Grãos",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 10 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plantação De Vegetais",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fazenda De Vacas",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Granja De Aves",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Pães",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 8 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Transporte E Entrega",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Escritório De Design De Interiores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 50 }
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
        nome: "Loja De Departamentos",
        desc: "Lojas diversificadas em um único espaço comercial.",
        licençaLiberado: {
          licença: "Licença De Varejo Especializado",
          liberado: false,
        },
        custoConstrucao: 70000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 2000,
          impostoFixo: 18000,
          impostoSobreFatu: 0.10,
          rent: 14
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

        ForneceMelhoraEficiencia: [],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Centro De Transporte E Entrega",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Calçados",
            "redCusto": { "nível1": 4, "nível2": 6, "nível3": 12 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Roupas",
            "redCusto": { "nível1": 5, "nível2": 7, "nível3": 14 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Escritório De Design De Interiores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 50 }
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
        nome: "Loja De Calçados",
        desc: "Especializada em calçados e acessórios para pés.",
        licençaLiberado: {
          licença: "Licença De Varejo Especializado",
          liberado: false,
        },
        custoConstrucao: 40000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 1700,
          impostoFixo: 30000,
          impostoSobreFatu: 0.10,
          rent: 12
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

        ForneceMelhoraEficiencia: [],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Centro De Transporte E Entrega",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Calçados",
            "redCusto": { "nível1": 8, "nível2": 12, "nível3": 25 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Marketplace Online",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 8, "nível3": 12 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Escritório De Design De Interiores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 25, "nível2": 32, "nível3": 38 }
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
        nome: "Loja De Vestuário",
        desc: "Vende roupas, acessórios e artigos de moda.",
        licençaLiberado: {
          licença: "Licença De Varejo Especializado",
          liberado: false,
        },
        custoConstrucao: 20000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 1400,
          impostoFixo: 23000,
          impostoSobreFatu: 0.10,
          rent: 13
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

        ForneceMelhoraEficiencia: [],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Centro De Transporte E Entrega",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Roupas",
            "redCusto": { "nível1": 8, "nível2": 12, "nível3": 25 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Marketplace Online",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 14, "nível2": 16, "nível3": 22 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Escritório De Design De Interiores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 16, "nível2": 24, "nível3": 28 }
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
        nome: "Loja de Gadgets e Wearables",
        desc: "Especializada na venda de dispositivos tecnológicos inovadores, como smartwatches, óculos inteligentes e outros gadgets modernos.",
        licençaLiberado: {
          licença: "Licença De Comércio De Tecnologia",
          liberado: false,
        },
        custoConstrucao: 20000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 1400,
          impostoFixo: 23000,
          impostoSobreFatu: 0.10,
          rent: 13
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

        ForneceMelhoraEficiencia: [],
  RecebeMelhoraEficiencia: [
    {
      "nome": "Fábrica De Smartphones",
      "redCusto": { "nível1": 3, "nível2": 4, "nível3": 7 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Fábrica De Dispositivos Vestíveis",
      "redCusto": { "nível1": 5, "nível2": 7, "nível3": 15 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Marketplace Online",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
      "aumFatu": { "nível1": 12, "nível2": 16, "nível3": 22 }
    },
    {
      "nome": "Construtora De Pequenas Obras",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Centro De Transporte E Entrega",
      "redCusto": { "nível1": 2, "nível2": 3, "nível3": 6 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Escritório De Design De Interiores",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
      "aumFatu": { "nível1": 18, "nível2": 24, "nível3": 28 }
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
        nome: "Loja De Games",
        desc: "Focada na venda de consoles, jogos físicos e digitais, além de acessórios voltados para o público gamer.",
        licençaLiberado: {
          licença: "Licença De Comércio De Tecnologia",
          liberado: false,
        },
        custoConstrucao: 20000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 1400,
          impostoFixo: 23000,
          impostoSobreFatu: 0.10,
          rent: 13
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

        ForneceMelhoraEficiencia: [],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Empresa De Jogos Digitais",
            "redCusto": { "nível1": 4, "nível2": 5, "nível3": 9 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Consoles De Jogos",
            "redCusto": { "nível1": 4, "nível2": 6, "nível3": 15 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Marketplace Online",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 14, "nível2": 18, "nível3": 22 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Transporte E Entrega",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Escritório De Design De Interiores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 16, "nível2": 22, "nível3": 28 }
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
        nome: "Loja De Celulares",
        desc: "Comércio especializado em smartphones, tablets e acessórios relacionados à telefonia móvel.",
        licençaLiberado: {
          licença: "Licença De Comércio De Tecnologia",
          liberado: false,
        },
        custoConstrucao: 20000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 1400,
          impostoFixo: 23000,
          impostoSobreFatu: 0.10,
          rent: 13
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

        ForneceMelhoraEficiencia: [],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábrica De Smartphones",
            "redCusto": { "nível1": 5, "nível2": 7, "nível3": 18 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Dispositivos Vestíveis",
            "redCusto": { "nível1": 3, "nível2": 5, "nível3": 7 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Marketplace Online",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 14, "nível2": 18, "nível3": 22 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Transporte E Entrega",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Escritório De Design De Interiores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 16, "nível2": 22, "nível3": 28 }
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
        nome: "Loja De Informática",
         desc: "Oferece computadores, notebooks, peças de hardware e periféricos voltados para o público em geral e profissionais de tecnologia.",
        licençaLiberado: {
          licença: "Licença De Comércio De Tecnologica",
          liberado: false,
        },
        custoConstrucao: 20000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 1400,
          impostoFixo: 23000,
          impostoSobreFatu: 0.10,
          rent: 13
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

        ForneceMelhoraEficiencia: [],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Empresa De Jogos Digitais",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 7 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Computadores",
            "redCusto": { "nível1": 5, "nível2": 7, "nível3": 17 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Marketplace Online",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 14, "nível2": 18, "nível3": 22 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Transporte E Entrega",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Escritório De Design De Interiores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 16, "nível2": 22, "nível3": 28 }
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
        nome: "Shopping Popular",
        desc: "Conjunto de lojas e serviços em um espaço popular.",
        licençaLiberado: {
          licença: "Licença De Shoppings",
          liberado: false,
        },
        custoConstrucao: 2890000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 110000,
          impostoFixo: 590000,
          impostoSobreFatu: 0.10,
          rent: 24
        },

        lojasNecessarias: {
          terrenos: 20,
          lojasP: 8,
          lojasM: 8,
          lojasG: 8,
        },
        construçõesNecessárias: [],
        licençasNecessárias: ["Silo", "Plantação De Vegetais"],
        melhoraEficiencia: [
          "Fábrica De Ração",
          "Biofábrica",
          "Mercado",
          "Feira Livre",
        ],

        ForneceMelhoraEficiencia: [],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Centro De Distribuição",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Roupas",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 2}
          },
          {
            "nome": "Fábrica De Calçados",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Rede De Fast-Food",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Cafeteria",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Escritório De Design De Interiores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 25, "nível3": 50 }
          },
          {
            "nome": "Centro De Transporte E Entrega",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Smartphones",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Escritório De Arquitetura",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 40, "nível3": 80 }
          }
        ],

        recursoDeConstrução: ["Mercado", "Loja De Departamentos", "Redes De Fast-food", "Cafeteria"]
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
        nome: "Shopping Center",
        desc: "Complexo comercial com diversas lojas e entretenimento.",
        licençaLiberado: {
          licença: "Licença De Shoppings",
          liberado: false,
        },
        custoConstrucao: 23730000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 950000,
          impostoFixo: 5010000,
          impostoSobreFatu: 0.10,
          rent: 27
        },

        lojasNecessarias: {
          terrenos: 100,
          lojasP: 25,
          lojasM: 30,
          lojasG: 70,
        },
        construçõesNecessárias: [],
        licençasNecessárias: ["Silo", "Plantação De Vegetais"],
        melhoraEficiencia: [
          "Fábrica De Ração",
          "Biofábrica",
          "Mercado",
          "Feira Livre",
        ],

        ForneceMelhoraEficiencia: [],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Centro De Distribuição",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Roupas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Calçados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Automóveis",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora De Pedras Preciosas",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Transporte E Entrega",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Smartphones",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 1, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Computadores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 1, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Consoles De Jogos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Escritório De Design De Interiores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 25, "nível3": 50 }
          },
          {
            "nome": "Escritório De Arquitetura",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 40, "nível3": 80 }
          }
        ]
    ,

        recursoDeConstrução: ["Shopping Popular", "Mega Mercado", "Joalheria", "Concessionária De Veículos"]
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
        nome: "Centro De Transporte e Entrega",
        desc: "Distribui produtos e mercadorias para redes varejistas.",
        licençaLiberado: {
          licença: "Licença De Logística E Transporte",
          liberado: false,
        },
        custoConstrucao: 220000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 3000,
          impostoFixo: 80000,
          impostoSobreFatu: 0.05,
          rent: 1
        },

        lojasNecessarias: {
          terrenos: 3,
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
            "nome": "Feira",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Restaurantes",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Padaria",
            "redCusto": { "nível1": 3, "nível2": 5, "nível3": 7 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Açougue",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Cafeteria",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Loja De Móveis",
            "redCusto": { "nível1": 3, "nível2": 3, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Livraria",
            "redCusto": { "nível1": 3, "nível2": 5, "nível3": 10 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Adega",
            "redCusto": { "nível1": 3, "nível2": 5, "nível3": 7 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mercado",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 10 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Loja De Conveniência",
            "redCusto": { "nível1": 3, "nível2": 5, "nível3": 7 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Redes De Fast-Food",
            "redCusto": { "nível1": 4, "nível2": 6, "nível3": 10 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Petshop",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Farmácias",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Loja De Departamentos",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Loja De Calçados",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Loja De Vestuário",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Loja De Gadgets E Wearables",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Loja De Games",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Loja De Celulares",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Loja De Informática",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Loja De Eletrônicos",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Joalheria",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Concessionária De Veículos",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Shopping Popular",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Shopping Center",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mega Mercado",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Prédio De Alto Padrão",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Marketplace Online",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Aeroportos",
            "redCusto": { "nível1": 8, "nível2": 12, "nível3": 24 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Portos",
            "redCusto": { "nível1": 12, "nível2": 18, "nível3": 16 },
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
        nome: "Centro De Distribuição",
        desc: "Distribui produtos e mercadorias para redes varejistas.",
        licençaLiberado: {
          licença: "Licença De Logística E Transporte",
          liberado: false,
        },
        custoConstrucao: 100000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 4000,
          impostoFixo: 90000,
          impostoSobreFatu: 0.050,
          rent: 3
        },

        lojasNecessarias: {
          terrenos: 0,
          lojasP: 0,
          lojasM: 0,
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
            "nome": "Cooperativa Agrícola",
            "redCusto": { "nível1": 8, "nível2": 11, "nível3": 23 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Comércio De Plantações",
            "redCusto": { "nível1": 5, "nível2": 6, "nível3": 13 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazéns Logísticos",
            "redCusto": { "nível1": 19, "nível2": 28, "nível3": 37 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Shopping Popular",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Shopping Center",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mega Mercados",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Marketplace Online",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Smartphones",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Computadores",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Consoles De Jogos",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Dispositivos Vestiveis",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Aeroportos",
            "redCusto": { "nível1": 12, "nível2": 18, "nível3": 24 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Chapas Metálicas",
            "redCusto": { "nível1": 8, "nível2": 11, "nível3": 14 },
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
        nome: "Armazém Logístico",
        desc: "Armazena e gerencia estoques para logística eficiente.",
        licençaLiberado: {
          licença: "Licença De Logística E Transporte",
          liberado: false,
        },
        custoConstrucao: 190000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 3000,
          impostoFixo: 50000,
          impostoSobreFatu: 0.050,
          rent: 4
        },

        lojasNecessarias: {
          terrenos: 0,
          lojasP: 1,
          lojasM: 0,
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
            "nome": "Armazém",
            "redCusto": { "nível1": 20, "nível2": 30, "nível3": 39 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Silo",
            "redCusto": { "nível1": 20, "nível2": 30, "nível3": 39 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Depósito De Resíduos Orgânicos",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plantação De Grãos",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plantação De Vegetais",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Pomares",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plantação De Eucalipto",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plantações De Plantas Medicinais",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Coleta De Biomassa",
            "redCusto": { "nível1": 4, "nível2": 6, "nível3": 10 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Tanque De Armazenamento De Biocombustíveis",
            "redCusto": { "nível1": 7, "nível2": 12, "nível3": 16 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Biofábrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria",
            "redCusto": { "nível1": 1, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria De Biocombustíveis",
            "redCusto": { "nível1": 1, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora",
            "redCusto": { "nível1": 1, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora De Minérios Radioativos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora De Pedras Preciosas",
            "redCusto": { "nível1": 1, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Móveis",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Rações",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Embalagens",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Fertilizante",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Bebidas",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Pães",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica Têxtil",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Calçados",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Roupas",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Celulose",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Papel",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Livros",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Medicamentos",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório Farmacêutico",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Plásticos",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Químicos Especializados",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Alto-Forno",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Siderúrgica",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fundição De Alumínio",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Ligas Metálicas",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Indústria De Componentes Mecânicos",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Chapas Metálicas",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Estruturas Metálicas",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Peças Automotivas",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Montadora De Veículos Elétricos",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Automóveis",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Chips",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Placas Eletrônicas",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Semicondutores",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Eletrônicos",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Robôs",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Motores",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Foguetes",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Aeronaves",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Navios",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Distribuição",
            "redCusto": { "nível1": 19, "nível2": 28, "nível3": 37 },
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
        nome: "Transporte Petrolífero",
        desc: "Transporta petróleo e derivados para refinarias e distribuidoras.",
        licençaLiberado: {
          licença: "Licença De Logística E Transporte",
          liberado: false,
        },
        custoConstrucao: 1640000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 300000,
          impostoFixo: 7550000,
          impostoSobreFatu: 0.05,
          rent: 20
        },

        lojasNecessarias: {
          terrenos: 5,
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
            "nome": "Plataforma De Petróleo",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria De Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Posto De Gasolina",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Plásticos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Químicos Especializados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Medicamentos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório Farmacêutico",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Cartório E Licenças",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Consultoria Em Engenharia Civil",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 50 }
          },
          {
            "nome": "Porto",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plataforma De Petróleo",
            "redCusto": { "nível1": 5, "nível2": 7, "nível3": 15 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria De Biocombustíveis",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],

        recursoDeConstrução: ["Armazém Logístico"]
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
      <ComercioContext.Provider value={{ dadosComercio, setDadosComercio ,atualizarDados, atualizarDadosProf, atualizarDadosProf2, atualizarDadosProf3, atualizarDadosVariados }}>
        {children}
      </ComercioContext.Provider>
    );
  };
  
  export const useComercio = () => useContext(ComercioContext);
  
