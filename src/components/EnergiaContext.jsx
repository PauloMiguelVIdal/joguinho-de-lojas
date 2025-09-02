 import React, { useState, createContext,useContext } from 'react';
 
 const EnergiaContext = createContext();
 
 export const EnergiaProvider = ({ children }) => {   

    const [dadosEnergia, setDadosEnergia] = useState({
energia: {
    economiaSetor: {
      estadoAtual: "estável"
    },
    licençaGlobal: {
      comprado: true,
      valor: 20000
    },
    licençasSetor: [{
      nome: "Licença Global De Energia",
      desc: "Permite a construção de infraestrutura básica de distribuição e geração de energia, incluindo redes elétricas e usinas solares fotovoltaicas.",
      valor: 7000,
      edifíciosLiberados: ["Subestação De Energia", "Rede De Distribuição Elétrica", "Usina Solar"],
      status: false
    },
    {
      nome: "Licença De Fábricas Energéticas",
      desc: "Habilita a fabricação de componentes para geração de energia renovável e armazenamento.",
      valor: 7000,
      edifíciosLiberados: ["Fábrica De Turbinas Eólicas", "Fábrica De Painéis Solares", "Fábrica De Baterias"],
      status: false
    },
    {
      nome: "Licença De Comércios Energéticos",
      desc: "Autoriza a abertura e operação de estabelecimentos voltados à venda e distribuição de energia e derivados, incluindo comércio de créditos energéticos e tecnologias associadas.",
      valor: 7000,
      edifíciosLiberados: ["Empresa De Comercio Energético", "Empresa De Consultoria Energética", "Estação De Carregamento"],
      status: false
    },
    {
      nome: "Licença De Melhoria Energética",
      desc: "Autoriza centros de pesquisa e desenvolvimento de tecnologias para armazenamento e eficiência energética, incluindo estações de carregamento veicular.",
      valor: 7000,
      edifíciosLiberados: ["Centro De Pesquisa Energética", "Centro De Reciclagem De Baterias", "Centro de Pesquisa Em Energias Renováveis"],
      status: false
    },
    {
      nome: "Licença De Energia Sustentável",
      desc: "Habilita a construção de usinas que utilizam biomassa e biocombustíveis, oferecendo soluções energéticas renováveis e de baixo impacto ambiental.",
      valor: 7000,
      edifíciosLiberados: ["Usina Termelétrica A Biocombustíveis", "Usina De Biomassa"],
      status: false
    },
    {
      nome: "Licença De Usinas",
      desc: "Permite a instalação de grandes complexos geradores de energia convencionais, incluindo hidrelétricas, termelétricas e parques eólicos.",
      valor: 7000,
      edifíciosLiberados: ["Usina Hidrelétrica", "Parque Eólico", "Usina Termolétrica"],
      status: false
    },
    {
      nome: "Licença De Usinas Nucleares",
      desc: "Concede autorização para construção e operação de usinas nucleares de fissão e fusão, representando o ápice da tecnologia energética no jogo.",
      valor: 7000,
      edifíciosLiberados: ["Reator Nuclear Convencional", "Usina De Fusão Nuclear"],
      status: false
    }
    ],
    edificios: [
      {
        nome: "Subestação De Energia",
        desc: "Distribui energia entre usinas e cidades.",
        licençaLiberado: {
          licença: "Licença Global De Energia",
          liberado: false,
        },
        custoConstrucao: 40000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 900,
          impostoFixo: 20000,
          impostoSobreFatu: 0.050000,
          rent: 3
        },

        lojasNecessarias: {
          terrenos: 2,
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
            "nome": "Redes De Distribuição De Energia",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 90 }
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
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica Movida A Biocombustíveis",
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
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Consultoria Em Engenharia Civil",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 20, "nível2": 30, "nível3": 60 }
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
        nome: "Rede De Distribuição Elétrica",
        desc: "Transporta eletricidade para todas as estruturas.",
        licençaLiberado: {
          licença: "Licença Global De Energia",
          liberado: false,
        },
        custoConstrucao: 240000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 500,
          impostoFixo: 5000,
          impostoSobreFatu: 0.050000,
          rent: 3
        },

        lojasNecessarias: {
          terrenos: 2,
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
            "nome": "Empresa De Comércio Energético",
            "redCusto": { "nível1": 2, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 15, "nível3": 30 }
          },
          {
            "nome": "Subestação De Energia",
            "redCusto": { "nível1": 20, "nível2": 29, "nível3": 38 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Comércio Energético",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 20, "nível2": 25, "nível3": 50 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Consultoria Em Engenharia Civil",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 20, "nível2": 30, "nível3": 70 }
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
        nome: "Usina Solar",
        desc: "Gera energia limpa através da luz solar.",
        licençaLiberado: {
          licença: "Licença Global De Energia",
          liberado: false,
        },
        custoConstrucao: 280000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 3000,
          impostoFixo: 60000,
          impostoSobreFatu: 0.080000,
          rent: 17
        },

        lojasNecessarias: {
          terrenos: 2,
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
            "nome": "Alto-Forno",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Siderúrgica",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fundição De Alumínio",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Ligas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plataforma De Petróleo",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora De Minérios Radioativos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora De Pedras Preciosas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Celulose",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Papel",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Plásticos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Químicos Especializados",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Semicondutores",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 21, "nível3": 27 }
          },
          {
            "nome": "Fábricas De Robôs",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 20, "nível3": 30 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Fusão Nuclear",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Aeroespacial",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Robótica",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Inteligência Artificial",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório Farmacêutico",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Servidores De Nuvem",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Data Centers",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
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
            "nome": "Centro De Pesquisa Energética",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Turbinas Eólicas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Painéis Solares",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Baterias",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Foguetes",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Aeronaves",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Estaleiro",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Peças Automotivas",
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
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Indústria De Componentes Mecânicos",
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
          },
          {
            "nome": "Mega Mercado",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Comércio Energético",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Subestação De Energia",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Desenvolvimento De Software",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Smartphones",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Computadores",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Consoles De Jogos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Dispositivos Vestíveis",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Nanotecnologia",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Instituto De Tecnologia Alimentar",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábrica De Painéis Solares",
            "redCusto": { "nível1": 10, "nível2": 20, "nível3": 25 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Centro De Pesquisa Em Energias Renováveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 7, "nível3": 8 }
          },
          {
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 7 }
          },
          {
            "nome": "Empresa De Comércio Energético",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 7 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 6, "nível3": 8 }
          },
          {
            "nome": "Consultoria Em Engenharia Civil",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 4, "nível3": 6 }
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
        nome: "Fábrica De Turbinas Eólicas",
        desc: "Monta turbinas para gerar energia eólica.",
        licençaLiberado: {
          licença: "Licença De Fábricas Energéticas",
          liberado: false,
        },
        custoConstrucao: 140000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 2500,
          impostoFixo: 40000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 0,
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
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 10, "nível2": 20, "nível3": 30 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Energias Renováveis",
            "redCusto": { "nível1": 10, "nível2": 16, "nível3": 25 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábrica De Chapas Metálicas",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Estruturas Metálicas",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Indústria De Componentes Mecânicos",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 5 },
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
            "nome": "Usina Termelétrica Movida A Biocombustíveis",
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
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 4, "nível3": 4 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 6, "nível3": 7 }
          },
          {
            "nome": "Centro De Pesquisa Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 6, "nível3": 8 }
          },
          {
            "nome": "Centro De Pesquisa Em Energias Renováveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 7, "nível2": 8, "nível3": 10 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 9, "nível3": 12 }
          },
          {
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 7, "nível3": 9 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
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
        nome: "Fábrica De Painéis Solares",
        desc: "Produz painéis para captação solar.",
        licençaLiberado: {
          licença: "Licença De Fábricas Energéticas",
          liberado: false,
        },
        custoConstrucao: 90000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 23000,
          impostoFixo: 590000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 0,
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
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 20, "nível3": 25 }
          },
          {
            "nome": "Centro De Pesquisa Em Energias Renováveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 9, "nível2": 12, "nível3": 12 }
          },
          {
            "nome": "Estações De Carregamento De Veículos Elétricos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 9, "nível3": 17 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábricas De Eletrônicos",
            "redCusto": { "nível1": 4, "nível2": 5, "nível3": 8 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Indústria De Componentes Mecânicos",
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
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 5 }
          },
          {
            "nome": "Centro De Pesquisa Eletrônico",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 8 }
          },
          {
            "nome": "Centro De Pesquisa Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 10, "nível3": 12 }
          },
          {
            "nome": "Centro De Pesquisa Em Energias Renováveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 6, "nível3": 7 }
          },
          {
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 5, "nível3": 6 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 5, "nível3": 6 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 6 }
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
          nível1: { status: true, quantidadeMínima: 2, impacto: 5 },
          nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
          nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
        }
      },
      {
        nome: "Fábrica De Baterias",
        desc: "Fabrica baterias para armazenar energia.",
        licençaLiberado: {
          licença: "Licença De Fábricas Energéticas",
          liberado: false,
        },
        custoConstrucao: 250000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 30000,
          impostoFixo: 775000,
          impostoSobreFatu: 0.10000,
          rent: 32
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
            "nome": "Montadora De Veículos Elétricos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 1 }
          },
          {
            "nome": "Estações De Carregamento De Veículos Elétricos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 6, "nível3": 12 }
          },
          {
            "nome": "Fábrica De Smartphones",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 3 }
          },
          {
            "nome": "Fábrica De Computadores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 3 }
          },
          {
            "nome": "Fábrica De Dispositivos Vestíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 1, "nível3": 2 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábrica De Produtos Químicos Especializados",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 6 },
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
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Centro De Pesquisa Eletrônico",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 6, "nível3": 8 }
          },
          {
            "nome": "Centro De Pesquisa Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 7, "nível2": 8, "nível3": 10 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 12, "nível3": 12 }
          },
          {
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 4, "nível3": 6 }
          },
          {
            "nome": "Centro De Reciclagem De Baterias",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Eletrônicos",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 7, "nível3": 10 }
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
        nome: "Empresa De Comercio Energético",
        desc: "Transporta eletricidade para todas as estruturas.",
        licençaLiberado: {
          licença: "Licença De Comércios Energéticos",
          liberado: false,
        },
        custoConstrucao: 240000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 500,
          impostoFixo: 5000,
          impostoSobreFatu: 0.050000,
          rent: 3
        },

        lojasNecessarias: {
          terrenos: 2,
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
            "nome": "Usina Solar",
            "redCusto": { "nível1": 3, "nível2": 5, "nível3": 7 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica Movida A Biocombustíveis",
            "redCusto": { "nível1": 4, "nível2": 5, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Biomassa",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 7 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 3, "nível2": 5, "nível3": 7 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 3, "nível2": 6, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 4, "nível2": 6, "nível3": 9 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 2, "nível2": 4, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Redes De Distribuição De Energia",
            "redCusto": { "nível1": 20, "nível2": 25, "nível3": 50 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
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
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Termelétrica Movida A Biocombustíveis",
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
            "nome": "Redes De Distribuição De Energia",
            "redCusto": { "nível1": 2, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plataforma De Petróleo",
            "redCusto": { "nível1": 3, "nível2": 12, "nível3": 13 },
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
        nome: "Empresa De Consultoria Energética",
        desc: "Transporta eletricidade para todas as estruturas.",
        licençaLiberado: {
          licença: "Licença De Comércios Energéticos",
          liberado: false,
        },
        custoConstrucao: 240000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 500,
          impostoFixo: 5000,
          impostoSobreFatu: 0.050000,
          rent: 3
        },

        lojasNecessarias: {
          terrenos: 2,
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
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 7 }
          },
          {
            "nome": "Usina Termelétrica Movida A Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 7, "nível3": 14 }
          },
          {
            "nome": "Usina De Biomassa",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 7 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 6 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 6 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 6, "nível3": 9 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 5, "nível3": 6 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 5, "nível3": 6 }
          },
          {
            "nome": "Fábrica De Turbinas Eólicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 7, "nível3": 9 }
          },
          {
            "nome": "Fábrica De Painéis Solares",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 5, "nível3": 6 }
          },
          {
            "nome": "Fábrica De Baterias",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 4, "nível3": 6 }
          },
          {
            "nome": "Estações De Carregamento De Veículos Elétricos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 11, "nível3": 10 }
          },
          {
            "nome": "Centro De Pesquisa Em Energias Renováveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 42, "nível2": 58, "nível3": 134 }
          },
          {
            "nome": "Centro De Pesquisa Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 50, "nível2": 70, "nível3": 150 }
          },
          {
            "nome": "Centro De Reciclagem De Baterias",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 15, "nível2": 20, "nível3": 25 }
          },
          {
            "nome": "Fábrica De Smartphones",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 6 }
          },
          {
            "nome": "Fábrica De Computadores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 6, "nível3": 8 }
          },
          {
            "nome": "Fábrica De Consoles De Jogos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 14, "nível3": 18 }
          },
          {
            "nome": "Fábrica De Dispositivos Vestiveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 4, "nível3": 6 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 15, "nível2": 25, "nível3": 50 }
          },
          {
            "nome": "Centro De Pesquisa Em Fusão Nuclear",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 25, "nível2": 30, "nível3": 50 }
          },
          {
            "nome": "Centro De Pesquisa Em Robótica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 15, "nível3": 25 }
          },
          {
            "nome": "Plataforma De Petróleo",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 7, "nível2": 7, "nível3": 9 }
          },
          {
            "nome": "Montadora De Veículos Elétricos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 3, "nível3": 7 }
          },
          {
            "nome": "Refinaria De Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 5, "nível3": 10 }
          },
          {
            "nome": "Refinaria",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 5, "nível3": 10 }
          },
          {
            "nome": "Fábrica De Chips",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 3 }
          },
          {
            "nome": "Fábrica De Placas Eletrônicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 3 }
          },
          {
            "nome": "Fábricas De Robôs",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Fábrica De Motores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 7, "nível3": 15 }
          },
          {
            "nome": "Fábrica De Foguetes",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 5 }
          },
          {
            "nome": "Fábrica De Aeronaves",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 4 }
          },
          {
            "nome": "Subestação De Energia",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 90 }
          },
          {
            "nome": "Redes De Distribuição De Energia",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 15, "nível3": 30 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Construtora De Pequenas Obras",
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
          nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
          nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
          nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
        }
      },
      {
        nome: "Estação De Carregamento",
        desc: "Fornece carregamento para veículos elétricos.",
        licençaLiberado: {
          licença: "Licença De Comércios Energéticos",
          liberado: false,
        },
        custoConstrucao: 120000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 2200,
          impostoFixo: 22000,
          impostoSobreFatu: 0.10000,
          rent: 32
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
            "nome": "Montadora De Veículos Elétricos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Fábrica De Baterias",
            "redCusto": { "nível1": 4, "nível2": 6, "nível3": 12 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 14, "nível3": 16 }
          },
          {
            "nome": "Fábrica De Painéis Solares",
            "redCusto": { "nível1": 6, "nível2": 9, "nível3": 17 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 11, "nível3": 10 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Consultoria Em Engenharia Civil",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 15, "nível3": 24 }
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
        nome: "Centro de Pesquisa Em Energias Renováveis",
        desc: "Transporta eletricidade para todas as estruturas.",
        licençaLiberado: {
          licença: "Licença De Melhoria Energética",
          liberado: false,
        },
        custoConstrucao: 240000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 500,
          impostoFixo: 5000,
          impostoSobreFatu: 0.050000,
          rent: 3
        },

        lojasNecessarias: {
          terrenos: 2,
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
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 7, "nível3": 8 }
          },
          {
            "nome": "Fábrica De Turbinas Eólicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 7, "nível2": 8, "nível3": 10 }
          },
          {
            "nome": "Fábrica De Painéis Solares",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 6, "nível3": 7 }
          },
          {
            "nome": "Usina De Biomassa",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 8 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 6 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 6 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 42, "nível2": 58, "nível3": 134 }
          },
          {
            "nome": "Laboratório De Novos Combustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 12, "nível3": 16 }
          },
          {
            "nome": "Fábrica De Turbinas Eólicas",
            "redCusto": { "nível1": 10, "nível2": 16, "nível3": 25 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Painéis Solares",
            "redCusto": { "nível1": 9, "nível2": 12, "nível3": 12 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
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
          nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
          nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
          nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
        }
      },
      {
        nome: "Centro De Pesquisa Energética",
        desc: "Desenvolve novas tecnologias energéticas.",
        licençaLiberado: {
          licença: "Licença De Melhoria Energética",
          liberado: false,
        },
        custoConstrucao: 300000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 8000,
          impostoFixo: 330000,
          impostoSobreFatu: 0.050000,
          rent: 3
        },

        lojasNecessarias: {
          terrenos: 4,
          lojasP: 2,
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
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Centro De Reciclagem De Baterias",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 15, "nível2": 20, "nível3": 25 }
          },
          {
            "nome": "Usina Termelétrica Movida a Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 5, "nível3": 6 }
          },
          {
            "nome": "Usina De Biomassa",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 8, "nível3": 9 }
          },
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 5, "nível3": 6 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 5 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 7 }
          },
          {
            "nome": "Fábrica De Painéis Solares",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 10, "nível3": 12 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 6, "nível3": 8 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 7 }
          },
          {
            "nome": "Estações De Carregamento De Veículos Elétricos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 14, "nível3": 16 }
          },
          {
            "nome": "Fábrica De Baterias",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 7, "nível2": 8, "nível3": 10 }
          },
          {
            "nome": "Fábrica De Turbinas Eólicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 6, "nível3": 8 }
          },
          {
            "nome": "Fábrica De Painéis Solares",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 10, "nível3": 12 }
          },
          {
            "nome": "Refinaria De Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 15, "nível3": 35 }
          },
          {
            "nome": "Refinaria",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 14, "nível3": 28 }
          },
          {
            "nome": "Fábrica De Motores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 5, "nível3": 6 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 50, "nível2": 70, "nível3": 150 }
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
            "nome": "Construtora De Pequenas Obras",
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
          nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
          nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
          nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
        }
      },
      {
        nome: "Centro De Reciclagem De Baterias",
        desc: "Recicla baterias para produção sustentável.",
        licençaLiberado: {
          licença: "Licença De Melhoria Energética",
          liberado: false,
        },
        custoConstrucao: 150000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 4500,
          impostoFixo: 80000,
          impostoSobreFatu: 0.050000,
          rent: 1
        },

        lojasNecessarias: {
          terrenos: 2,
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
            "nome": "Fábrica De Baterias",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Montadora De Veículos Elétricos",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Baterias",
            "redCusto": { "nível1": 4, "nível2": 6, "nível3": 12 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Centro De Pesquisa Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 15, "nível2": 20, "nível3": 25 }
          },
          {
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 15, "nível2": 20, "nível3": 25 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
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
        nome: "Usina Termelétrica A Biocombustíveis",
        desc: "Produz energia a partir de biocombustíveis.",
        licençaLiberado: {
          licença: "Licença De Energia Sustentável",
          liberado: false,
        },
        custoConstrucao: 480000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 26000,
          impostoFixo: 400000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 10,
          lojasP: 0,
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
            "nome": "Alto-Forno",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Siderúrgica",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fundição De Alumínio",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Ligas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plataforma De Petróleo",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora De Minérios Radioativos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora De Pedras Preciosas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Celulose",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Papel",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Plásticos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Produtos Químicos Especializados",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 20, "nível3": 30 }
          },
          {
            "nome": "Fábricas De Semicondutores",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Robôs",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Fusão Nuclear",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Aeroespacial",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Robótica",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Inteligência Artificial",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório Farmacêutico",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Servidores De Nuvem",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Data Centers",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
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
            "nome": "Centro De Pesquisa Energética",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Turbinas Eólicas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Painéis Solares",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Baterias",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Foguetes",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Aeronaves",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Estaleiro",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Peças Automotivas",
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
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Indústria De Componentes Mecânicos",
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
          },
          {
            "nome": "Mega Mercado",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Comércio Energético",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Subestação De Energia",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Desenvolvimento De Software",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Smartphones",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Computadores",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Consoles De Jogos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Dispositivos Vestíveis",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Nanotecnologia",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Instituto De Tecnologia Alimentar",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Refinaria De Biocombustíveis",
            "redCusto": { "nível1": 3, "nível2": 6, "nível3": 12 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Tanque De Armazenamento Biocombustível",
            "redCusto": { "nível1": 2, "nível2": 4, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 7, "nível3": 14 }
          },
          {
            "nome": "Empresa De Comércio Energético",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 5, "nível3": 6 }
          },
          {
            "nome": "Centro De Pesquisa Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 5, "nível3": 6 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Depósito De Resíduos Orgânicos",
            "redCusto": { "nível1": 2, "nível2": 4, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 7, "nível3": 8 }
          },
          {
            "nome": "Consultoria Em Engenharia Civil",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 6, "nível3": 6 }
          },
          {
            "nome": "Biofábrica",
            "redCusto": { "nível1": 3, "nível2": 5, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ]
    ,

        recursoDeConstrução: ["Usina Termolétrica"]
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
        nome: "Usina De Biomassa",
        desc: "Transforma resíduos orgânicos em energia.",
        licençaLiberado: {
          licença: "Licença De Energia Sustentável",
          liberado: false,
        },
        custoConstrucao: 200000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 27000,
          impostoFixo: 380000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 12,
          lojasP: 0,
          lojasM: 0,
          lojasG: 6,
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
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Siderúrgica",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fundição De Alumínio",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Ligas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plataforma De Petróleo",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora De Minérios Radioativos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora De Pedras Preciosas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Celulose",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Papel",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Plásticos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 20, "nível3": 30 }
          },
          {
            "nome": "Fábrica De Químicos Especializados",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 20, "nível3": 30 }
          },
          {
            "nome": "Fábrica De Semicondutores",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Robôs",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Fusão Nuclear",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Aeroespacial",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Robótica",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Inteligência Artificial",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório Farmacêutico",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Servidores De Nuvem",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Data Centers",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
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
            "nome": "Centro De Pesquisa Energética",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Turbinas Eólicas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Painéis Solares",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Baterias",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Foguetes",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Aeronaves",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Estaleiro",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Peças Automotivas",
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
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Indústria De Componentes Mecânicos",
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
          },
          {
            "nome": "Mega Mercado",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Comércio Energético",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Subestação De Energia",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Desenvolvimento De Software",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Smartphones",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Computadores",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Consoles De Jogos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Dispositivos Vestíveis",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Nanotecnologia",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Instituto De Tecnologia Alimentar",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Centro De Coleta De Biomassa",
            "redCusto": { "nível1": 8, "nível2": 16, "nível3": 24 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Energias Renováveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 8 }
          },
          {
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 7 }
          },
          {
            "nome": "Empresa De Comércio Energético",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 7 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 4 }
          },
          {
            "nome": "Consultoria Em Engenharia Civil",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 5, "nível3": 5 }
          },
          {
            "nome": "Biofábrica",
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
          nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
          nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
          nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
        }
      },
      {
        nome: "Usina Hidrelétrica",
        desc: "Gera eletricidade a partir de rios e represas.",
        licençaLiberado: {
          licença: "Licença De Usinas",
          liberado: false,
        },
        custoConstrucao: 5990000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 120000,
          impostoFixo: 1000000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 50,
          lojasP: 5,
          lojasM: 12,
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
            "nome": "Alto-Forno",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Siderúrgica",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fundição De Alumínio",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Ligas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plataforma De Petróleo",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora De Minérios Radioativos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora De Pedras Preciosas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Celulose",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Papel",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Plásticos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Produtos Químicos Especializados",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Semicondutores",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Robôs",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Fusão Nuclear",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Aeroespacial",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Robótica",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Inteligência Artificial",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório Farmacêutico",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Servidores De Nuvem",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Data Centers",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
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
            "nome": "Centro De Pesquisa Energética",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Turbinas Eólicas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Painéis Solares",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Baterias",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Foguetes",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Aeronaves",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Estaleiro",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Peças Automotivas",
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
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Indústria De Componentes Mecânicos",
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
          },
          {
            "nome": "Mega Mercado",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Comércio Energético",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Subestação De Energia",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Desenvolvimento De Software",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Smartphones",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Computadores",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Consoles De Jogos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Dispositivos Vestíveis",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Nanotecnologia",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Instituto De Tecnologia Alimentar",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Marketplace Online",
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
            "nome": "Plataforma De Streaming",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Montadora De Veículos Elétricos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Automóveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria De Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Centro De Pesquisa Em Energias Renováveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 6 }
          },
          {
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 6 }
          },
          {
            "nome": "Empresa De Comércio Energético",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 7 }
          },
          {
            "nome": "Centro De Pesquisa Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 7 }
          },
          {
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 6, "nível3": 7 }
          },
          {
            "nome": "Consultoria Em Engenharia Civil",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 6, "nível3": 7 }
          }
        ],

        recursoDeConstrução: ["Subestação De Energia", "Rede De Distribuição Elétrica"]
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
        nome: "Parque Eólico",
        desc: "Produz energia eólica através de turbinas.",
        licençaLiberado: {
          licença: "Licença De Usinas",
          liberado: false,
        },
        custoConstrucao: 140000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 5500,
          impostoFixo: 105000,
          impostoSobreFatu: 0.080000,
          rent: 16
        },

        lojasNecessarias: {
          terrenos: 6,
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
      "nome": "Alto-Forno",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Usina Siderúrgica",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Fundição De Alumínio",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Fábrica De Ligas Metálicas",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Refinaria",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Plataforma De Petróleo",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Mineradora",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Mineradora De Minérios Radioativos",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Mineradora De Pedras Preciosas",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Fábrica De Celulose",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Fábrica De Papel",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Fábrica De Plásticos",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Fábrica De Químicos Especializados",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Fábrica De Semicondutores",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Fábricas De Eletrônicos",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Fábricas De Robôs",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Empresa De Automação Industrial",
      "redCusto": { "nível1": 1, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Centro De Pesquisa Em Fusão Nuclear",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Centro De Pesquisa Em Eletrônicos",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Centro De Pesquisa Aeroespacial",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Centro De Pesquisa Em Robótica",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Centro De Pesquisa Em Inteligência Artificial",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Laboratório Farmacêutico",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Servidores De Nuvem",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Data Centers",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
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
      "nome": "Centro De Pesquisa Energética",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Fábrica De Turbinas Eólicas",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Fábrica De Painéis Solares",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Fábrica De Baterias",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Fábrica De Foguetes",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Fábrica De Aeronaves",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Estaleiro",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Fábrica De Peças Automotivas",
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
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Indústria De Componentes Mecânicos",
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
    },
    {
      "nome": "Mega Mercado",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Empresa De Comercio Energético",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Subestação De Energia",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Empresa De Desenvolvimento De Software",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Fábrica De Smartphones",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Fábrica De Computadores",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Fábrica De Consoles De Jogos",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Fábrica De Dispositivos Vestíveis",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Laboratório De Nanotecnologia",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Centro De Engenharia Avançada",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Centro De Pesquisa Em Materiais Avançados",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Centro De Pesquisa Química",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Instituto De Tecnologia Alimentar",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    }
  ],
  RecebeMelhoraEficiencia: [
    {
      "nome": "Centro De Pesquisa Em Energias Renováveis",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
      "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 6 }
    },
    {
      "nome": "Empresa De Consultoria Energética",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
      "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 6 }
    },
    {
      "nome": "Fábrica De Turbinas Eólicas",
      "redCusto": { "nível1": 10, "nível2": 20, "nível3": 30 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Empresa De Comercio Energético",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
      "aumFatu": { "nível1": 3, "nível2": 6, "nível3": 6 }
    },
    {
      "nome": "Centro De Pesquisa Energética",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
      "aumFatu": { "nível1": 4, "nível2": 6, "nível3": 8 }
    },
    {
      "nome": "Construtora De Pequenas Obras",
      "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Centro De Engenharia Avançada",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
      "aumFatu": { "nível1": 4, "nível2": 6, "nível3": 7 }
    },
    {
      "nome": "Consultoria Em Engenharia Civil",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
      "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 7 }
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
        nome: "Usina Termolétrica",
        desc: "Gera energia a partir da queima de combustíveis.",
        licençaLiberado: {
          licença: "Licença De Usinas",
          liberado: false,
        },
        custoConstrucao: 160000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 18000,
          impostoFixo: 310000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 8,
          lojasP: 0,
          lojasM: 2,
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
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Siderúrgica",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fundição De Alumínio",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Ligas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plataforma De Petróleo",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora De Minérios Radioativos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 10, "nível2": 20, "nível3": 30 }
          },
          {
            "nome": "Mineradora De Pedras Preciosas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 10, "nível2": 20, "nível3": 30 }
          },
          {
            "nome": "Fábrica De Celulose",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Papel",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Plásticos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Produtos Químicos Especializados",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Semicondutores",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Robôs",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Fusão Nuclear",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Aeroespacial",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Robótica",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Inteligência Artificial",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório Farmacêutico",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Servidores De Nuvem",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Data Centers",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
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
            "nome": "Centro De Pesquisa Energética",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Turbinas Eólicas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Painéis Solares",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Baterias",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Foguetes",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Aeronaves",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Estaleiro",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Peças Automotivas",
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
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Indústria De Componentes Mecânicos",
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
          },
          {
            "nome": "Mega Mercado",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Comércio Energético",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Subestação De Energia",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Desenvolvimento De Software",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Smartphones",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Computadores",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Consoles De Jogos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Dispositivos Vestíveis",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Nanotecnologia",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Instituto De Tecnologia Alimentar",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Transporte Petrolífero",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Empresa De Comércio Energético",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 6, "nível3": 9 }
          },
          {
            "nome": "Centro De Pesquisa Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 7 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 8, "nível3": 8 }
          },
          {
            "nome": "Consultoria Em Engenharia Civil",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 7, "nível3": 10 }
          },
          {
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 4, "nível2": 6, "nível3": 9 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 6 }
          },
          {
            "nome": "Refinaria",
            "redCusto": { "nível1": 6, "nível2": 14, "nível3": 20 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],

        recursoDeConstrução: ["Subestação De Energia", "Rede De Distribuição Elétrica"]
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
        nome: "Reator Nuclear Convencional",
        desc: "Produz energia nuclear de forma convencional.",
        licençaLiberado: {
          licença: "Licença De Usinas Nucleares",
          liberado: false,
        },
        custoConstrucao: 94900000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 1800000,
          impostoFixo: 14000000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 400,
          lojasP: 50,
          lojasM: 70,
          lojasG: 200,
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
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Siderúrgica",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fundição De Alumínio",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Ligas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plataforma De Petróleo",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora De Minérios Radioativos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora De Pedras Preciosas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Celulose",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Papel",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Plásticos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Produtos Químicos Especializados",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Semicondutores",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Robôs",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Fusão Nuclear",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Aeroespacial",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Robótica",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Inteligência Artificial",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório Farmacêutico",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Servidores De Nuvem",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Data Centers",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
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
            "nome": "Centro De Pesquisa Energética",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Turbinas Eólicas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Painéis Solares",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Baterias",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Foguetes",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Aeronaves",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Estaleiro",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Peças Automotivas",
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
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Indústria De Componentes Mecânicos",
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
          },
          {
            "nome": "Mega Mercado",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Comércio Energético",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Subestação De Energia",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Desenvolvimento De Software",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Smartphones",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Computadores",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Consoles De Jogos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Dispositivos Vestíveis",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Nanotecnologia",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Instituto De Tecnologia Alimentar",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Marketplace Online",
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
            "nome": "Plataforma De Streaming",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Montadora De Veículos Elétricos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Automóveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria De Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Centro De Pesquisa Em Fusão Nuclear",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 12, "nível3": 15 }
          },
          {
            "nome": "Centro De Pesquisa Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 5, "nível3": 6 }
          },
          {
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 5, "nível3": 6 }
          },
          {
            "nome": "Empresa De Comércio Energético",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 4, "nível3": 5 }
          },
          {
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 7, "nível3": 9 }
          },
          {
            "nome": "Consultoria Em Engenharia Civil",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 7, "nível3": 9 }
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
        nome: "Usina De Fusão Nuclear",
        desc: "Gera energia limpa através de fusão nuclear.",
        licençaLiberado: {
          licença: "Licença De Usinas Nucleares",
          liberado: false,
        },
        custoConstrucao: 1654200000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 35000000,
          impostoFixo: 340000000,
          impostoSobreFatu: 0.10000,
          rent: 32
        },

        lojasNecessarias: {
          terrenos: 5000,
          lojasP: 500,
          lojasM: 1000,
          lojasG: 2000,
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
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Usina Siderúrgica",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fundição De Alumínio",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Ligas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plataforma De Petróleo",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora De Minérios Radioativos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Mineradora De Pedras Preciosas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Celulose",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Papel",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Plásticos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Químicos Especializados",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Semicondutores",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Robôs",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Fusão Nuclear",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Aeroespacial",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Robótica",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Inteligência Artificial",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório Farmacêutico",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Servidores De Nuvem",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Data Centers",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
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
            "nome": "Centro De Pesquisa Energética",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Turbinas Eólicas",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Painéis Solares",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Baterias",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Foguetes",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Aeronaves",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Estaleiro",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Peças Automotivas",
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
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Indústria De Componentes Mecânicos",
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
          },
          {
            "nome": "Mega Mercado",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Comercio Energético",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Subestação De Energia",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Desenvolvimento De Software",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Smartphones",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Computadores",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Consoles De Jogos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Dispositivos Vestíveis",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Nanotecnologia",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Instituto De Tecnologia Alimentar",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Marketplace Online",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Jogos Digitais",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Telecomunicações",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plataforma De Redes Sociais",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Plataforma De Streaming",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Montadora De Veículos Elétricos",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Automóveis",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria De Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Centro De Pesquisa Em Fusão Nuclear",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 14, "nível3": 20 }
          },
          {
            "nome": "Centro De Pesquisa Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 5 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 5, "nível3": 6 }
          },
          {
            "nome": "Empresa De Comercio Energético",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 5 }
          },
          {
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 5, "nível3": 5 }
          },
          {
            "nome": "Consultoria Em Engenharia Civil",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 5, "nível3": 5 }
          },
          {
            "nome": "Mineradora De Minérios Radioativos",
            "redCusto": { "nível1": 9, "nível2": 13, "nível3": 27 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],

        recursoDeConstrução: ["Reator Nuclear Convencional", "Subestação De Energia", "Rede De Distribuição Elétrica"]
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
      }
    ],
  }
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
      <EnergiaContext.Provider value={{ dadosEnergia,setDadosEnergia,atualizarDados, atualizarDadosProf, atualizarDadosProf2, atualizarDadosProf3, atualizarDadosVariados }}>
        {children}
      </EnergiaContext.Provider>
    );
  };
  
  export const useEnergia = () => useContext(EnergiaContext);
  
