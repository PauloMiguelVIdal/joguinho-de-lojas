import React, { useState, createContext,useContext } from 'react';

const ImobiliarioContext = createContext();

export const ImobiliarioProvider = ({ children }) => {

 const [dadosImobiliario, setDadosImobiliario] = useState({

imobiliario: {
    economiaSetor: {
      estadoAtual: "estável"
    },
    licençaGlobal: {
      comprado: true,
      valor: 20000
    },
    licençasSetor: [
      {
        nome: "Licença Global Imobiliária",
        desc: "Permite operações básicas de construção civil, terraplanagem e regularização de propriedades, essencial para o desenvolvimento urbano inicial.",
        valor: 7000,
        edifíciosLiberados: ["Cartório E Licenças", "Terraplanagem E Pavimentação", "Construtora De Pequenas Obras"],
        status: false
      },
      {
        nome: "Licença De Projetos e Design",
        desc: "Habilita a elaboração de projetos arquitetônicos, design de interiores e consultorias técnicas em engenharia civil, essenciais para obras e empreendimentos.",
        valor: 7000,
        edifíciosLiberados: ["Escritório De Design De Interiores", "Escritório De Arquitetura", "Consultoria Em Engenharia Civil"],
        status: false
      },
      {
        nome: "Licença De Construção Imobiliária",
        desc: "Autoriza a atuação no setor imobiliário, permitindo a construção, administração e comercialização de imóveis residenciais e comerciais.",
        valor: 7000,
        edifíciosLiberados: ["Construtora",
          "Imobiliária Residencial",
          "Imobiliária Comercial"
        ],
        status: false
      },
      {
        nome: "Licença De Grandes Infraestruturas",
        desc: "Autoriza a construção de obras de infraestrutura estratégica como aeroportos e portos, fundamentais para o transporte regional e nacional.",
        valor: 7000,
        edifíciosLiberados: ["Construtora De Infraestruturas", "Aeroporto", "Porto"],
        status: false
      },
      {
        nome: "Licença De Mineração",
        desc: "Habilita a exploração de recursos minerais convencionais, radioativos e pedras preciosas, impulsionando a indústria extrativista.",
        valor: 7000,
        edifíciosLiberados: ["Mineradora", "Mineradora Radioativa", "Mineradora De Pedras Preciosas"],
        status: false
      },
      {
        nome: "Licença Comercial E Residencial",
        desc: "Permite a construção de grandes empreendimentos mistos que combinam espaços comerciais e residenciais de alto padrão.",
        valor: 7000,
        edifíciosLiberados: ["Mega Mercado", "Prédio De Alto Padrão"],
        status: false
      },
      {
        nome: "Licença De Construções Energéticas",
        desc: "Autoriza a implantação de infraestruturas especializadas em produção e armazenamento de combustíveis e bioenergia.",
        valor: 7000,
        edifíciosLiberados: ["Centro De Coleta De Biomassa", "Tanque De Armazenamento Biocombustível", "Plataforma De Petróleo"],
        status: false
      }

    ],
    edificios: [

      {
        nome: "Cartório E Licenças",
        desc: "Registra propriedades e emite licenças comerciais.",
        licençaLiberado: {
          licença: "Licença Global Imobiliária",
          liberado: false,
        },
        custoConstrucao: 10000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 1000,
          impostoFixo: 38000,
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
            "nome": "Construtora",
            "redCusto": { "nível1": 4, "nível2": 6, "nível3": 8 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 3, "nível2": 5, "nível3": 7 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 10, "nível2": 20, "nível3": 28 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Imobiliária Residencial",
            "redCusto": { "nível1": 4, "nível2": 6, "nível3": 12 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Imobiliária Comercial",
            "redCusto": { "nível1": 4, "nível2": 6, "nível3": 12 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Escritório De Design De Interiores",
            "redCusto": { "nível1": 10, "nível2": 14, "nível3": 28 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Escritório De Arquitetura",
            "redCusto": { "nível1": 20, "nível2": 29, "nível3": 38 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Consultoria Em Engenharia Civil",
            "redCusto": { "nível1": 20, "nível2": 29, "nível3": 38 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
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
          nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
          nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
          nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
        }
      },
      {
        nome: "Terraplanagem E Pavimentação",
        desc: "Prepara terrenos e constrói vias de transporte.",
        licençaLiberado: {
          licença: "Licença Global Imobiliária",
          liberado: false,
        },
        custoConstrucao: 120000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 2500,
          impostoFixo: 52000,
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
            "nome": "Construtora",
            "redCusto": { "nível1": 6, "nível2": 14, "nível3": 21 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 7, "nível2": 14, "nível3": 21 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Aeroportos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Portos",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mega Mercados",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Prédio De Alto Padrão",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 7 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plantação De Grãos",
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
            "nome": "Plantação De Eucalipto",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plantações De Plantas Medicinais",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Terreno De Mineração",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Área Florestal",
            "redCusto": { "nível1": 3, "nível2": 5, "nível3": 12 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora De Minérios Radioativos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora De Pedras Preciosas",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Consultoria Em Engenharia Civil",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 50, "nível2": 70, "nível3": 150 }
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
          nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
          nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
          nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
        }
      },
      {
        nome: "Construtora De Pequenas Obras",
        desc: "Constrói edifícios residenciais e comerciais.",
        licençaLiberado: {
          licença: "Licença Global Imobiliária",
          liberado: false,
        },
        custoConstrucao: 750000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 12000,
          impostoFixo: 170000,
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
            "nome": "Fazenda Administrativa",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Granja De Aves",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Criação De Ovinos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Silo",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 10, "nível2": 21, "nível3": 30 }
          },
          {
            "nome": "Depósito De Resíduos Orgânicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 10, "nível2": 20, "nível3": 30 }
          },
          {
            "nome": "Subestação De Energia",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Estação De Carregamento",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Feira",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Loja De Móveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Restaurantes",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Livraria",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Loja De Bebidas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Padaria",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Açougue",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Loja De Conveniência",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Redes De Fast-Food",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Petshop",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Farmácias",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Cafeteria",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Loja De Departamentos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Loja De Calçados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Loja De Vestuário",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Loja De Celulares",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Loja De Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Cartório E Licenças",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Terraplanagem E Pavimentação",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Móveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Rações",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Embalagens",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Bebidas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Pães",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Calçados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Roupas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fazenda De Vacas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Madeireira",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Redes De Distribuição De Energia",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Turbinas Eólicas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Painéis Solares",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Baterias",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Reciclagem De Baterias",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mercado",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Loja De Gadgets E Wearables",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Loja De Games",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Loja De Informática",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Transporte E Entrega",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centros De Distribuição",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Startup",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Escritório De Design De Interiores",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Escritório De Arquitetura",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Consultoria Em Engenharia Civil",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica Têxtil",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Celulose",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Papel",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Livros",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Comércio Energético",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Energias Renováveis",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Eficiência Energética",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Posto De Gasolina",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Joalheria",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazéns Logísticos",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Servidores De Nuvem",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Data Centers",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Instituto De Tecnologia Alimentar",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Agrícola",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Imobiliária Residencial",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Medicamentos",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
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
            "nome": "Escritório De Arquitetura",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 20, "nível2": 30, "nível3": 40 }
          },
          {
            "nome": "Cartório E Licenças",
            "redCusto": { "nível1": 10, "nível2": 20, "nível3": 28 },
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
          nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
          nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
          nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
        }
      },
      {
        nome: "Escritório De Design De Interiores",
        desc: "Constrói edifícios residenciais e comerciais.",
        licençaLiberado: {
          licença: "Licença De Projetos e Design",
          liberado: false,
        },
        custoConstrucao: 750000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 12000,
          impostoFixo: 170000,
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
            "nome": "Loja De Móveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 11, "nível2": 14, "nível3": 16 }
          },
          {
            "nome": "Restaurantes",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 11, "nível3": 12 }
          },
          {
            "nome": "Livraria",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 5, "nível3": 5 }
          },
          {
            "nome": "Loja De Bebidas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 18, "nível3": 22 }
          },
          {
            "nome": "Padaria",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 18, "nível3": 22 }
          },
          {
            "nome": "Açougue",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 18, "nível3": 22 }
          },
          {
            "nome": "Loja De Conveniência",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 50 }
          },
          {
            "nome": "Redes De Fast-Food",
            "redCusto": { "nível1": 10, "nível2": 15, "nível3": 30 },
            "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 50 }
          },
          {
            "nome": "Petshop",
            "redCusto": { "nível1": 10, "nível2": 15, "nível3": 30 },
            "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 50 }
          },
          {
            "nome": "Farmácias",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 18, "nível2": 25, "nível3": 30 }
          },
          {
            "nome": "Cafeteria",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 50 }
          },
          {
            "nome": "Loja De Departamentos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 50 }
          },
          {
            "nome": "Loja De Calçados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 25, "nível2": 32, "nível3": 38 }
          },
          {
            "nome": "Loja De Vestuário",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 16, "nível2": 24, "nível3": 28 }
          },
          {
            "nome": "Loja De Gadgets E Wearables",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 18, "nível2": 24, "nível3": 28 }
          },
          {
            "nome": "Loja De Games",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 16, "nível2": 22, "nível3": 28 }
          },
          {
            "nome": "Loja De Celulares",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 16, "nível2": 22, "nível3": 28 }
          },
          {
            "nome": "Loja De Informática",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 16, "nível2": 22, "nível3": 28 }
          },
          {
            "nome": "Loja De Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 16, "nível3": 22 }
          },
          {
            "nome": "Joalheria",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 15, "nível2": 20, "nível3": 25 }
          },
          {
            "nome": "Concessionária De Veículos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 50 }
          },
          {
            "nome": "Shopping Popular",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 25, "nível3": 50 }
          },
          {
            "nome": "Shopping Center",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 25, "nível3": 50 }
          },
          {
            "nome": "Mega Mercado",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 7, "nível2": 11, "nível3": 15 }
          },
          {
            "nome": "Prédio De Alto Padrão",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 18, "nível3": 22 }
          },
          {
            "nome": "Mercado",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 7, "nível2": 13, "nível3": 19 }
          },
          {
            "nome": "Imobiliária Residencial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 40, "nível3": 90 }
          },
          {
            "nome": "Imobiliária Comercial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 25, "nível3": 40 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Design De Produtos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 14, "nível3": 16 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 16, "nível3": 20 }
          },
          {
            "nome": "Escritório De Arquitetura",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 10, "nível3": 14 }
          },
          {
            "nome": "Cartório E Licenças",
            "redCusto": { "nível1": 10, "nível2": 14, "nível3": 28 },
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
          nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
          nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
          nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
        }
      }, {
        nome: "Escritório De Arquitetura",
        desc: "Constrói edifícios residenciais e comerciais.",
        licençaLiberado: {
          licença: "Licença De Projetos e Design",
          liberado: false,
        },
        custoConstrucao: 750000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 12000,
          impostoFixo: 170000,
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
            "nome": "Shopping Popular",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 40, "nível3": 80 }
          },
          {
            "nome": "Shopping Center",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 40, "nível3": 80 }
          },
          {
            "nome": "Mega Mercado",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 15, "nível2": 20, "nível3": 25 }
          },
          {
            "nome": "Prédio De Alto Padrão",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 18, "nível2": 22, "nível3": 28 }
          },
          {
            "nome": "Aeroportos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 14, "nível3": 22 }
          },
          {
            "nome": "Portos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 18, "nível3": 30 }
          },
          {
            "nome": "Imobiliária Residencial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 25, "nível3": 40 }
          },
          {
            "nome": "Imobiliária Comercial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 40, "nível3": 90 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 12, "nível3": 18 }
          },
          {
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 12, "nível3": 18 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 20, "nível2": 30, "nível3": 40 }
          },
          {
            "nome": "Escritório De Design De Interiores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 10, "nível3": 14 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Consultoria Em Engenharia Civil",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 25, "nível2": 35, "nível3": 80 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 15, "nível2": 20, "nível3": 40 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 15, "nível3": 30 }
          },
          {
            "nome": "Cartório E Licenças",
            "redCusto": { "nível1": 20, "nível2": 29, "nível3": 38 },
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
          nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
          nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
          nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
        }
      }, {
        nome: "Consultoria Em Engenharia Civil",
        desc: "Constrói edifícios residenciais e comerciais.",
        licençaLiberado: {
          licença: "Licença De Projetos e Design",
          liberado: false,
        },
        custoConstrucao: 750000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 12000,
          impostoFixo: 170000,
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
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 4, "nível3": 6 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 7 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 6, "nível3": 7 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 7, "nível3": 9 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 5, "nível3": 5 }
          },
          {
            "nome": "Subestação De Energia",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 20, "nível2": 30, "nível3": 60 }
          },
          {
            "nome": "Redes De Distribuição De Energia",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 20, "nível2": 30, "nível3": 70 }
          },
          {
            "nome": "Estação De Carregamento",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 15, "nível3": 24 }
          },
          {
            "nome": "Terraplanagem E Pavimentação",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 50, "nível2": 70, "nível3": 150 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 18, "nível3": 22 }
          },
          {
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 18, "nível3": 22 }
          },
          {
            "nome": "Aeroportos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 23, "nível3": 60 }
          },
          {
            "nome": "Portos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 32, "nível3": 80 }
          },
          {
            "nome": "Transporte Petrolífero",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 50 }
          },
          {
            "nome": "Mineradora",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 20, "nível2": 65, "nível3": 130 }
          },
          {
            "nome": "Mineradora De Minérios Radioativos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 25, "nível3": 40 }
          },
          {
            "nome": "Mineradora De Pedras Preciosas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 14, "nível2": 45, "nível3": 100 }
          },
          {
            "nome": "Plataforma De Petróleo",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 16, "nível3": 20 }
          },
          {
            "nome": "Tanque De Armazenamento De Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 50, "nível2": 70, "nível3": 150 }
          },
          {
            "nome": "Centro De Coleta De Biomassa",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 50, "nível2": 70, "nível3": 150 }
          },
          {
            "nome": "Refinaria",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 30, "nível3": 60 }
          },
          {
            "nome": "Refinaria De Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 15, "nível3": 35 }
          },
          {
            "nome": "Biofábrica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 20, "nível3": 40 }
          },
          {
            "nome": "Escritório De Arquitetura",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 25, "nível2": 35, "nível3": 80 }
          },
          {
            "nome": "Usina De Biomassa",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 5, "nível3": 5 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 7, "nível3": 10 }
          },
          {
            "nome": "Usina Termelétrica Movida A Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 6, "nível3": 6 }
          },
          {
            "nome": "Terreno De Mineração",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 40, "nível2": 50, "nível3": 120 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 25, "nível2": 35, "nível3": 75 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 25, "nível2": 35, "nível3": 75 }
          },
          {
            "nome": "Cartório E Licenças",
            "redCusto": { "nível1": 20, "nível2": 29, "nível3": 38 },
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
          nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
          nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
          nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
        }
      }, {
        nome: "Construtora",
        desc: "Constrói edifícios residenciais e comerciais.",
        licençaLiberado: {
          licença: "Licença De Construção Imobiliária",
          liberado: false,
        },
        custoConstrucao: 750000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 12000,
          impostoFixo: 170000,
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
            "nome": "Centro De Comércio De Plantações",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Concessionária De Veículos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Desenvolvimento De Software",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Jogos Digitais",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Telecomunicações",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plataforma De Redes Sociais",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Instituto De Biotecnologia",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Nanotecnologia",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Design De Produtos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Novos Combustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Robótica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Imobiliária Comercial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Coleta De Biomassa",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório Farmacêutico",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Indústria De Componentes Mecânicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Chapas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Estruturas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Placas Eletrônicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica Movida A Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Biomassa",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Marketplace Online",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plataforma De Streaming",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Dispositivos Vestiveis",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Inteligência Artificial",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Fertilizante",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Plásticos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Químicos Especializados",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Alto-Forno",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Peças Automotivas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Fusão Nuclear",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Tanque De Armazenamento De Biocombustíveis",
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
            "nome": "Biofábrica",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
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
            "nome": "Terraplanagem E Pavimentação",
            "redCusto": { "nível1": 6, "nível2": 14, "nível3": 21 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Cartório E Licenças",
            "redCusto": { "nível1": 4, "nível2": 6, "nível3": 8 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Escritório De Arquitetura",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 12, "nível3": 18 }
          },
          {
            "nome": "Consultoria Em Engenharia Civil",
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
          nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
          nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
          nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
        }
      },
      {
        nome: "Imobiliária Residencial",
        desc: "Constrói edifícios residenciais e comerciais.",
        licençaLiberado: {
          licença: "Licença De Construção Imobiliária",
          liberado: false,
        },
        custoConstrucao: 750000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 12000,
          impostoFixo: 170000,
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

        ForneceMelhoraEficiencia: [],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Cartório E Licenças",
            "redCusto": { "nível1": 4, "nível2": 6, "nível3": 12 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Escritório De Arquitetura",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 25, "nível3": 40 }
          },
          {
            "nome": "Escritório De Design De Interiores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 40, "nível3": 90 }
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
          nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
          nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
          nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
        }
      },
      {
        nome: "Imobiliária Comercial",
        desc: "Constrói edifícios residenciais e comerciais.",
        licençaLiberado: {
          licença: "Licença De Construção Imobiliária",
          liberado: false,
        },
        custoConstrucao: 750000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 12000,
          impostoFixo: 170000,
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

        ForneceMelhoraEficiencia: [],
  RecebeMelhoraEficiencia: [
    {
      "nome": "Construtora",
      "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Cartório E Licenças",
      "redCusto": { "nível1": 4, "nível2": 6, "nível3": 12 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Escritório De Arquitetura",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
      "aumFatu": { "nível1": 12, "nível2": 40, "nível3": 90 }
    },
    {
      "nome": "Escritório De Design De Interiores",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
      "aumFatu": { "nível1": 8, "nível2": 25, "nível3": 40 }
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
          nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
          nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
          nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
        }
      },
      {
        nome: "Construtora De Infraestruturas",
        desc: "Desenvolve grandes obras de infraestrutura urbana.",
        licençaLiberado: {
          licença: "Licença De Grandes Infraestruturas",
          liberado: false,
        },
        custoConstrucao: 2000000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 111000,
          impostoFixo: 1200000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 30,
          lojasP: 10,
          lojasM: 10,
          lojasG: 20,
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
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Shopping Popular",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Transporte Petrolífero",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Smartphones",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Computadores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Consoles De Jogos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Aeroespacial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora De Pedras Preciosas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mega Mercado",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Prédio De Alto Padrão",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Siderúrgica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Montadora De Veículos Elétricos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Automóveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria De Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Navios",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Aeroportos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora De Minérios Radioativos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plataforma De Petróleo",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Chips",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Semicondutores",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Robôs",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Motores",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Aeronaves",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
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
            "nome": "Shopping Center",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Portos",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Foguetes",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Terraplanagem E Pavimentação",
            "redCusto": { "nível1": 7, "nível2": 14, "nível3": 21 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Cartório E Licenças",
            "redCusto": { "nível1": 3, "nível2": 5, "nível3": 7 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Escritório De Arquitetura",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 12, "nível3": 18 }
          },
          {
            "nome": "Consultoria Em Engenharia Civil",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 18, "nível3": 22 }
          }
        ],

        recursoDeConstrução: ["Construtora", "Terraplanagem E Pavimentação", "Cartório E Licenças"]
        ,
        dependências: [
          { construção: "fazendaAdministrativa", quantidade: 0 }
        ],
        powerUp: {
          redCustoAtual: 0,
          aumFatuAtual: 0,
          nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
          nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
          nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
        }
      },
      {
        nome: "Aeroporto",
        desc: "Opera voos comerciais e transporte aéreo.",
        licençaLiberado: {
          licença: "Licença De Grandes Infraestruturas",
          liberado: false,
        },
        custoConstrucao: 11400000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 700000,
          impostoFixo: 1200000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 100,
          lojasP: 20,
          lojasM: 10,
          lojasG: 100,
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
            "nome": "Centro De Transporte E Entrega",
            "redCusto": { "nível1": 8, "nível2": 12, "nível3": 24 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centros De Distribuição",
            "redCusto": { "nível1": 12, "nível2": 18, "nível3": 24 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Usina Siderúrgica",
            "redCusto": { "nível1": 1, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Chapas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Estruturas Metálicas",
            "redCusto": { "nível1": 1, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Aeronaves",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Terraplanagem E Pavimentação",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Aeroespacial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 16, "nível3": 30 }
          },
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
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica Movida A Biocombustíveis",
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
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Novos Combustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 12, "nível3": 18 }
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
            "nome": "Escritório De Arquitetura",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 14, "nível3": 22 }
          },
          {
            "nome": "Consultoria Em Engenharia Civil",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 23, "nível3": 60 }
          }
        ],

        recursoDeConstrução: ["Construtora De Infraestruturas"]
        ,
        dependências: [
          { construção: "fazendaAdministrativa", quantidade: 0 }
        ],
        powerUp: {
          redCustoAtual: 0,
          aumFatuAtual: 0,
          nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
          nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
          nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
        }
      },
      {
        nome: "Porto",
        desc: "Gerencia comércio marítimo e transporte naval.",
        licençaLiberado: {
          licença: "Licença De Grandes Infraestruturas",
          liberado: false,
        },
        custoConstrucao: 26550000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 1250000,
          impostoFixo: 14000000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 300,
          lojasP: 5,
          lojasM: 0,
          lojasG: 100,
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
            "nome": "Transporte Petrolífero",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Transporte E Entrega",
            "redCusto": { "nível1": 12, "nível2": 18, "nível3": 16 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Terraplanagem E Pavimentação",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 1, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica Movida A Biocombustíveis",
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
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Estaleiro",
            "redCusto": { "nível1": 1, "nível2": 0, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Novos Combustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 15, "nível3": 20 }
          },
          {
            "nome": "Refinaria",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria De Biocombustíveis",
            "redCusto": { "nível1": 1, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Escritório De Arquitetura",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 18, "nível3": 30 }
          },
          {
            "nome": "Consultoria Em Engenharia Civil",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 32, "nível3": 80 }
          },
          {
            "nome": "Usina Siderúrgica",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Chapas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Estruturas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],

        recursoDeConstrução: ["Construtora De Infraestruturas"]
        ,
        dependências: [
          { construção: "fazendaAdministrativa", quantidade: 0 }
        ],
        powerUp: {
          redCustoAtual: 0,
          aumFatuAtual: 0,
          nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
          nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
          nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
        }
      },
      {
        nome: "Mineradora",
        desc: "Extrai minérios e recursos naturais do solo.",
        licençaLiberado: {
          licença: "Licença De Mineração",
          liberado: false,
        },
        custoConstrucao: 520000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 27000,
          impostoFixo: 150000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 10,
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
            "nome": "Alto-Forno",
            "redCusto": { "nível1": 4, "nível2": 5, "nível3": 8 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Siderúrgica",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fundição De Alumínio",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Ligas Metálicas",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Terreno De Mineração",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Terraplanagem E Pavimentação",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
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
            "nome": "Usina Termelétrica Movida A Biocombustíveis",
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
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Consultoria Em Engenharia Civil",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 20, "nível2": 65, "nível3": 130 }
          },
          {
            "nome": "Fábrica De Estruturas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],

        recursoDeConstrução: ["Terraplanagem E Pavimentação", "Terreno De Mineração"]
        ,
        dependências: [
          { construção: "fazendaAdministrativa", quantidade: 0 }
        ],
        powerUp: {
          redCustoAtual: 0,
          aumFatuAtual: 0,
          nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
          nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
          nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
        }
      },
      {
        nome: "Mineradora Radioativa",
        desc: "Mineradora especializada em materiais radioativos.",
        licençaLiberado: {
          licença: "Licença De Mineração",
          liberado: false,
        },
        custoConstrucao: 16250000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 650000,
          impostoFixo: 2500000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 500,
          lojasP: 10,
          lojasM: 10,
          lojasG: 10,
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
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 9, "nível2": 13, "nível3": 27 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Terraplanagem E Pavimentação",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
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
            "nome": "Usina Termelétrica Movida A Biocombustíveis",
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
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 10, "nível3": 30 }
          },
          {
            "nome": "Centro De Pesquisa Em Fusão Nuclear",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 30, "nível3": 60 }
          },
          {
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Terreno De Mineração",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Consultoria Em Engenharia Civil",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 25, "nível3": 40 }
          },
          {
            "nome": "Fábrica De Estruturas Metálicas",
            "redCusto": { "nível1": 1, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],

        recursoDeConstrução: ["Mineradora", "Construtora De Infraestruturas", "Terraplanagem E Pavimentação", "Terreno De Mineração"]
        ,
        dependências: [
          { construção: "fazendaAdministrativa", quantidade: 0 }
        ],
        powerUp: {
          redCustoAtual: 0,
          aumFatuAtual: 0,
          nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
          nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
          nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
        }
      },
      {
        nome: "Mineradora De Pedras Preciosas",
        desc: "Explora jazidas de pedras preciosas e gemas.",
        licençaLiberado: {
          licença: "Licença De Mineração",
          liberado: false,
        },
        custoConstrucao: 2020000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 69000,
          impostoFixo: 90000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 5,
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
            "nome": "Joalheria",
            "redCusto": { "nível1": 7, "nível2": 10, "nível3": 23 },
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
            "nome": "Terraplanagem E Pavimentação",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
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
            "nome": "Usina Termelétrica Movida A Biocombustíveis",
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
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 16, "nível2": 20, "nível3": 30 }
          },
          {
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 1, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Terreno De Mineração",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Consultoria Em Engenharia Civil",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 14, "nível2": 45, "nível3": 100 }
          },
          {
            "nome": "Fábrica De Estruturas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],

        recursoDeConstrução: ["Mineradora", "Terreno De Mineração"]
        ,
        dependências: [
          { construção: "fazendaAdministrativa", quantidade: 0 }
        ],
        powerUp: {
          redCustoAtual: 0,
          aumFatuAtual: 0,
          nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
          nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
          nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
        }
      },
      {
        nome: "Mega Mercado",
        desc: "Grande complexo de varejo e autosserviço.",
        licençaLiberado: {
          licença: "Licença Comercial E Residencial",
          liberado: false,
        },
        custoConstrucao: 1090000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 100000,
          impostoFixo: 1800000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 12,
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
            "nome": "Restaurante",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Construtora De Grandes Estruturas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Terraplanagem E Pavimentação",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
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
            "nome": "Usina Termelétrica Movida A Biocombustíveis",
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
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Marketplace Online",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 5, "nível3": 5 }
          },
          {
            "nome": "Centro De Transporte E Entrega",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Distribuição",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Bebidas",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Cooperativas Agrícolas",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Comércio De Plantações",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Escritório De Design De Interiores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 7, "nível2": 11, "nível3": 15 }
          },
          {
            "nome": "Escritório De Arquitetura",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 15, "nível2": 20, "nível3": 25 }
          },
          {
            "nome": "Fábrica De Estruturas Metálicas",
            "redCusto": { "nível1": 1, "nível2": 0, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 5 }
          }
        ],

        recursoDeConstrução: ["Mercado", "Loja De Departamentos", "Cafeteria", "Livraria"]
        ,
        dependências: [
          { construção: "fazendaAdministrativa", quantidade: 0 }
        ],
        powerUp: {
          redCustoAtual: 0,
          aumFatuAtual: 0,
          nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
          nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
          nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
        }
      },
      {
        nome: "Prédio De Alto Padrão",
        desc: "Edifício residencial de luxo e alto padrão.",
        licençaLiberado: {
          licença: "Licença Comercial E Residencial",
          liberado: false,
        },
        custoConstrucao: 3840000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 52000,
          impostoFixo: 120000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 7,
          lojasP: 0,
          lojasM: 0,
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
      "nome": "Construtora De Grandes Estruturas",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Terraplanagem E Pavimentação",
      "redCusto": { "nível1": 3, "nível2": 4, "nível3": 7 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Fábrica De Móveis",
      "redCusto": { "nível1": 6, "nível2": 10, "nível3": 20 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Construtora De Grandes Infraestruturas",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Centro De Transporte E Entrega",
      "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Escritório De Design De Interiores",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
      "aumFatu": { "nível1": 12, "nível2": 18, "nível3": 22 }
    },
    {
      "nome": "Escritório De Arquitetura",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
      "aumFatu": { "nível1": 18, "nível2": 22, "nível3": 28 }
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
          nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
          nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
          nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
        }
      },
      {
        nome: "Centro De Coleta De Biomassa",
        desc: "Coleta matéria orgânica para produção energética.",
        licençaLiberado: {
          licença: "Licença De Construções Energéticas",
          liberado: false,
        },
        custoConstrucao: 520000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 10000,
          impostoFixo: 240000,
          impostoSobreFatu: 0.05,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 2,
          lojasP: 2,
          lojasM: 3,
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
            "nome": "Biofábrica",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Biomassa",
            "redCusto": { "nível1": 8, "nível2": 16, "nível3": 24 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Fertilizante",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria De Biocombustíveis",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 4, "nível2": 6, "nível3": 10 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plantação De Grãos",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plantação De Vegetais",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Pomares",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Depósito De Resíduos Orgânicos",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fazenda De Vacas",
            "redCusto": { "nível1": 4, "nível2": 6, "nível3": 8 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Criação De Ovinos",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Granja De Aves",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Consultoria Em Engenharia Civil",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 50, "nível2": 70, "nível3": 150 }
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
          nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
          nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
          nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
        }
      },
      {
        nome: "Tanque De Armazenamento Biocombustível",
        desc: "Armazena biocombustíveis para distribuição.",
        licençaLiberado: {
          licença: "Licença De Construções Energéticas",
          liberado: false,
        },
        custoConstrucao: 1700000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 20000,
          impostoFixo: 380000,
          impostoSobreFatu: 0.05000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 2,
          lojasP: 2,
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
            "nome": "Usina Termelétrica Movida A Biocombustíveis",
            "redCusto": { "nível1": 2, "nível2": 4, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria De Biocombustíveis",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plataforma De Petróleo",
            "redCusto": { "nível1": 2, "nível2": 1, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Armazém Logístico",
            "redCusto": { "nível1": 7, "nível2": 12, "nível3": 16 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Consultoria Em Engenharia Civil",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 50, "nível2": 70, "nível3": 150 }
          },
          {
            "nome": "Biofábrica",
            "redCusto": { "nível1": 12, "nível2": 16, "nível3": 21 },
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
          nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
          nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
          nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
        }
      },
      {
        nome: "Plataforma De Petróleo",
        desc: "Extrai petróleo em plataformas oceânicas.",
        licençaLiberado: {
          licença: "Licença De Construções Energéticas",
          liberado: false,
        },
        custoConstrucao: 6000000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 1500000,
          impostoFixo: 37000000,
          impostoSobreFatu: 0.050000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 10,
          lojasP: 10,
          lojasM: 20,
          lojasG: 50,
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
            "nome": "Refinaria",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria De Biocombustíveis",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Transporte Petrolífero",
            "redCusto": { "nível1": 5, "nível2": 7, "nível3": 15 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Comércio Energético",
            "redCusto": { "nível1": 3, "nível2": 12, "nível3": 13 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 7, "nível2": 7, "nível3": 9 }
          },
          {
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Transporte Petrolífero",
            "redCusto": { "nível1": 4, "nível2": 4, "nível3": 12 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Consultoria Em Engenharia Civil",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 16, "nível3": 20 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
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
            "nome": "Usina Termelétrica Movida A Biocombustíveis",
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
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 7, "nível3": 9 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 10, "nível3": 12 }
          },
          {
            "nome": "Tanque De Armazenamento Biocombustível",
            "redCusto": { "nível1": 2, "nível2": 1, "nível3": 3 },
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
          nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
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
      <ImobiliarioContext.Provider value={{ dadosImobiliario, setDadosImobiliario, atualizarDadosProf, atualizarDadosProf2, atualizarDadosProf3, atualizarDadosVariados }}>
        {children}
      </ImobiliarioContext.Provider>
    );
  };
  
  
  export const useImobiliario = () => useContext(ImobiliarioContext);
 