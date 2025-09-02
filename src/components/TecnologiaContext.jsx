import React, { useState, createContext,useContext } from 'react';

const TecnologiaContext = createContext();

export const TecnologiaProvider = ({ children }) => {

const [dadosTecnologia, setDadosTecnologia] = useState({

tecnologia: {
    economiaSetor: {
      estadoAtual: "estável"
    },
    licençaGlobal: {
      comprado: true,
      valor: 20000
    },
    licençasSetor: [{
      nome: "Licença Global De Tecnologia",
      desc: "Permite a operação de empresas de tecnologia básica, incluindo infraestrutura digital e desenvolvimento de software, essencial para a economia digital.",
      valor: 7000,
      edifíciosLiberados: ["Servidor Em Nuvem", "Data Center", "Startup"],
      status: false
    },
    {
      nome: "Licença De Empreendimentos Tech",
      desc: "Autoriza pesquisas de ponta em química avançada e energia nuclear, habilitando descobertas científicas revolucionárias.",
      valor: 7000,
      edifíciosLiberados: ["Empresa De Desenvolvimento De Software", "Empresa De Jogos Digitais", "Empresa De Telecomunicações"],
      status: false
    },
    {
      nome: "Licença De Plataformas Digitais",
      desc: "Autoriza pesquisas de ponta em química avançada e energia nuclear, habilitando descobertas científicas revolucionárias.",
      valor: 7000,
      edifíciosLiberados: ["Plataforma De Redes Sociais", "Marketplace Online", "Plataforma De Streaming"],
      status: false
    },
    {
      nome: "Licença Agro e Biotecnologia",
      desc: "Autoriza pesquisas de ponta em química avançada e energia nuclear, habilitando descobertas científicas revolucionárias.",
      valor: 7000,
      edifíciosLiberados: ["Instituto de Tecnologia Alimentar", "Centro De Pesquisa Agrícola", "Instituto De Biotecnologia"],
      status: false
    },
    {
      nome: "Licença Eletrônica e Design",
      desc: "Autoriza pesquisas de ponta em química avançada e energia nuclear, habilitando descobertas científicas revolucionárias.",
      valor: 7000,
      edifíciosLiberados: [
        "Laboratório De Design De Produtos"
        , "Centro De Pesquisa Em Eletrônicos"
        , "Laboratório De Nanotecnologia"],
      status: false
    },
    {
      nome: "Licença De Fábricas Tecnológicas",
      desc: "Autoriza pesquisas de ponta em química avançada e energia nuclear, habilitando descobertas científicas revolucionárias.",
      valor: 7000,
      edifíciosLiberados: ["Fábrica De Smartphones", "Fábrica De Computadores", "Fábrica De Consoles De Jogos", "Fábrica De Dispositivos Vestiveis"],
      status: false
    },
    {
      nome: "Licença De Tecnologia Experimental",
      desc: "Autoriza pesquisas de ponta em química avançada e energia nuclear, habilitando descobertas científicas revolucionárias.",
      valor: 7000,
      edifíciosLiberados: ["Centro de Pesquisa Química", "Centro De Pesquisa Em Fusão Nuclear", "Laboratório De Novos Combustíveis"],
      status: false
    },
    {
      nome: "Licença De Engenharia Avançada",
      desc: "Habilita centros de pesquisa em eletrônica de última geração e tecnologia aeroespacial, impulsionando inovações em mobilidade e comunicação.",
      valor: 7000,
      edifíciosLiberados: ["Centro De Pesquisa Aeroespacial", "Centro de Engenharia Avançada", "Centro de Pesquisa em Materiais Avançados"],
      status: false
    },
    {
      nome: "Licença De Pesquisa Em Robótica e IA",
      desc: "Permite o desenvolvimento de inteligência artificial e sistemas robóticos autônomos, representando o estado da arte em automação e machine learning.",
      valor: 7000,
      edifíciosLiberados: ["Centro De Pesquisa Em Robótica", "Centro De Pesquisa Em IA"],
      status: false
    }
    ],



    edificios: [
      {
        nome: "Startup",
        desc: "Negócio inovador focado em soluções tecnológicas.",
        licençaLiberado: {
          licença: "Licença Global De Tecnologia",
          liberado: false,
        },
        custoConstrucao: 150000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 3750,
          impostoFixo: 28000,
          impostoSobreFatu: 0.10000,
          rent: 19
        },

        lojasNecessarias: {
          terrenos: 2,
          lojasP: 3,
          lojasM: 0,
          lojasG: 0,
        },
        construçõesNecessárias: [],
        licençasNecessárias: [],
        melhoraEficiencia: [],

        ForneceMelhoraEficiencia: [
          {
            "nome": "Servidores De Nuvem",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 5 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 3 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 15, "nível3": 16 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Servidores De Nuvem",
            "redCusto": { "nível1": 3, "nível2": 5, "nível3": 10 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Data Centers",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Desenvolvimento De Software",
            "redCusto": { "nível1": 4, "nível2": 5, "nível3": 10 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Inteligência Artificial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 50 }
          },
          {
            "nome": "Fábrica De Eletrônicos",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],

        recursoDeConstrução: [],
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
      ,
      {
        nome: "Servidor Em Nuvem",
        desc: "Infraestrutura digital para armazenamento e serviços online.",
        licençaLiberado: {
          licença: "Licença Global De Tecnologia",
          liberado: false,
        },
        custoConstrucao: 470000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 10000,
          impostoFixo: 190000,
          impostoSobreFatu: 0.050000,
          rent: 5
        },
        lojasNecessarias: {
          terrenos: 2,
          lojasP: 1,
          lojasM: 0,
          lojasG: 1,
        },
        construçõesNecessárias: ["Data Center"],
        licençasNecessárias: [],
        melhoraEficiencia: [],

        ForneceMelhoraEficiencia: [
          {
            "nome": "Data Centers",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Startups",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 10 }
          },
          {
            "nome": "Empresa De Desenvolvimento De Software",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 8 }
          },
          {
            "nome": "Empresa De Jogos Digitais",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Plataforma De Redes Sociais",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 11, "nível3": 15 }
          },
          {
            "nome": "Plataforma De Streaming",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 6, "nível3": 8 }
          },
          {
            "nome": "Marketplace Online",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 6 }
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
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 16, "nível3": 20 }
          },
          {
            "nome": "Marketplace Online",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 10, "nível3": 14 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Startups",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Inteligência Artificial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 14, "nível3": 16 }
          },
          {
            "nome": "Fábrica De Eletrônicos",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 8 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],

        recursoDeConstrução: [],
        dependências: [],
        powerUp: {
          redCustoAtual: 0,
          aumFatuAtual: 0,
          nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
          nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
          nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
        }
      },
      {
        nome: "Data Center",
        desc: "Centro de processamento e armazenamento de dados.",
        licençaLiberado: {
          licença: "Licença Global De Tecnologia",
          liberado: false,
        },
        custoConstrucao: 110000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 13500,
          impostoFixo: 240000,
          impostoSobreFatu: 0.050000,
          rent: 5
        },

        lojasNecessarias: {
          terrenos: 0,
          lojasP: 1,
          lojasM: 0,
          lojasG: 0,
        },
        construçõesNecessárias: [],
        licençasNecessárias: [],
        melhoraEficiencia: [],

        ForneceMelhoraEficiencia: [
          {
            "nome": "Startups",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 5 }
          },
          {
            "nome": "Empresa De Desenvolvimento De Software",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 7 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 8, "nível3": 8 }
          },
          {
            "nome": "Centro De Pesquisa Em Fusão Nuclear",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 15, "nível2": 22, "nível3": 23 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 3 }
          },
          {
            "nome": "Centro De Pesquisa Aeroespacial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 3 }
          },
          {
            "nome": "Centro De Pesquisa Em Robótica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 3 }
          },
          {
            "nome": "Centro De Pesquisa Em Inteligência Artificial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 5 }
          },
          {
            "nome": "Empresa De Jogos Digitais",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Plataforma De Redes Sociais",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 8, "nível3": 10 }
          },
          {
            "nome": "Plataforma De Streaming",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 12, "nível3": 16 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 7, "nível3": 8 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Marketplace Online",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Servidores De Nuvem",
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
            "nome": "Centro De Pesquisa Eletrônica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 16, "nível3": 20 }
          },
          {
            "nome": "Marketplace Online",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 10, "nível3": 14 }
          },
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Inteligência Artificial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 14, "nível3": 16 }
          },
          {
            "nome": "Fábricas De Semicondutores",
            "redCusto": { "nível1": 2, "nível2": 2, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Eletrônicos",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],

        recursoDeConstrução: ["Servidor Em Nuvem"],
        dependências: [],
        powerUp: {
          redCustoAtual: 0,
          aumFatuAtual: 0,
          nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
          nível2: { status: true, quantidadeMínima: 100, impacto: 10 },
          nível3: { status: true, quantidadeMínima: 500, impacto: 15 },
        }
      },

      {
        nome: "Empresa De Desenvolvimento De Software",
        desc: "Criação de sistemas e aplicativos sob demanda.",
        licençaLiberado: {
          licença: "Licença De Empreendimentos Tech",
          liberado: false,
        },
        custoConstrucao: 410000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 15750,
          impostoFixo: 58000,
          impostoSobreFatu: 0.10000,
          rent: 22
        },

        lojasNecessarias: {
          terrenos: 2,
          lojasP: 5,
          lojasM: 0,
          lojasG: 1,
        },
        construçõesNecessárias: ["Startup"],
        licençasNecessárias: [],
        melhoraEficiencia: [],

        ForneceMelhoraEficiencia: [
          {
            "nome": "Startups",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 5, "nível3": 10 }
          },
          {
            "nome": "Centro De Pesquisa Em Inteligência Artificial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 7, "nível3": 7 }
          },
          {
            "nome": "Centro De Pesquisa Em Robótica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 3 }
          },
          {
            "nome": "Centro De Pesquisa Aeroespacial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 3 }
          },
          {
            "nome": "Empresa De Jogos Digitais",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 8, "nível3": 17 }
          },
          {
            "nome": "Fábrica De Computadores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 1, "nível3": 3 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 14, "nível2": 16, "nível3": 16 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 0, "nível3": 0 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Servidores De Nuvem",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 8 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Data Centers",
            "redCusto": { "nível1": 3, "nível2": 5, "nível3": 7 },
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
            "nome": "Centro De Pesquisa Em Inteligência Artificial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 50 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],

        recursoDeConstrução: ["Startup"],
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
        nome: "Empresa De Jogos Digitais",
        desc: "Criação de sistemas e aplicativos sob demanda.",
        licençaLiberado: {
          licença: "Licença De Empreendimentos Tech",
          liberado: false,
        },
        custoConstrucao: 410000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 15750,
          impostoFixo: 58000,
          impostoSobreFatu: 0.10000,
          rent: 22
        },

        lojasNecessarias: {
          terrenos: 2,
          lojasP: 5,
          lojasM: 0,
          lojasG: 1,
        },
        construçõesNecessárias: ["Startup"],
        licençasNecessárias: [],
        melhoraEficiencia: [],

        ForneceMelhoraEficiencia: [
          {
            "nome": "Loja De Games",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 5, "nível3": 9 }
          },
          {
            "nome": "Loja De Informática",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 7 }
          },
          {
            "nome": "Fábrica De Consoles De Jogos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 1, "nível3": 2 }
          }
        ],
        RecebeMelhoraEficiencia: [
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
            "nome": "Empresa De Desenvolvimento De Software",
            "redCusto": { "nível1": 6, "nível2": 8, "nível3": 17 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Servidores De Nuvem",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Data Centers",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Marketplace Online",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 14, "nível2": 18, "nível3": 23 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Inteligência Artificial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 16, "nível2": 22, "nível3": 27 }
          }
        ],

        recursoDeConstrução: ["Startup"],
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
        nome: "Empresa De Telecomunicações",
        desc: "Criação de sistemas e aplicativos sob demanda.",
        licençaLiberado: {
          licença: "Licença De Empreendimentos Tech",
          liberado: false,
        },
        custoConstrucao: 410000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 15750,
          impostoFixo: 58000,
          impostoSobreFatu: 0.10000,
          rent: 22
        },

        lojasNecessarias: {
          terrenos: 2,
          lojasP: 5,
          lojasM: 0,
          lojasG: 1,
        },
        construçõesNecessárias: ["Startup"],
        licençasNecessárias: [],
        melhoraEficiencia: [],

        ForneceMelhoraEficiencia: [],
  RecebeMelhoraEficiencia: [
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
      "nome": "Fábrica De Smartphones",
      "redCusto": { "nível1": 10, "nível2": 19, "nível3": 25 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Centro De Pesquisa Em Eletrônicos",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
      "aumFatu": { "nível1": 12, "nível2": 18, "nível3": 22 }
    },
    {
      "nome": "Construtora",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
      "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
    },
    {
      "nome": "Centro De Pesquisa Em Inteligência Artificial",
      "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
      "aumFatu": { "nível1": 8, "nível2": 12, "nível3": 18 }
    }
  ],

        recursoDeConstrução: ["Startup"],
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
        nome: "Plataforma De Redes Sociais",
        desc: "Criação de sistemas e aplicativos sob demanda.",
        licençaLiberado: {
          licença: "Licença De Plataformas Digitais",
          liberado: false,
        },
        custoConstrucao: 410000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 15750,
          impostoFixo: 58000,
          impostoSobreFatu: 0.10000,
          rent: 22
        },

        lojasNecessarias: {
          terrenos: 2,
          lojasP: 5,
          lojasM: 0,
          lojasG: 1,
        },
        construçõesNecessárias: ["Startup"],
        licençasNecessárias: [],
        melhoraEficiencia: [],

        ForneceMelhoraEficiencia: [
          {
            "nome": "Marketplace Online",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 5, "nível3": 8 }
          }
        ],
        RecebeMelhoraEficiencia: [
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
            "nome": "Servidores De Nuvem",
            "redCusto": { "nível1": 6, "nível2": 11, "nível3": 15 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Data Centers",
            "redCusto": { "nível1": 4, "nível2": 8, "nível3": 10 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Design De Produtos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 15, "nível3": 20 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Inteligência Artificial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 15, "nível3": 20 }
          }
        ],

        recursoDeConstrução: ["Startup"],
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
        nome: "Marketplace Online",
        desc: "Criação de sistemas e aplicativos sob demanda.",
        licençaLiberado: {
          licença: "Licença De Plataformas Digitais",
          liberado: false,
        },
        custoConstrucao: 410000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 15750,
          impostoFixo: 58000,
          impostoSobreFatu: 0.10000,
          rent: 22
        },

        lojasNecessarias: {
          terrenos: 2,
          lojasP: 5,
          lojasM: 0,
          lojasG: 1,
        },
        construçõesNecessárias: ["Startup"],
        licençasNecessárias: [],
        melhoraEficiencia: [],

        ForneceMelhoraEficiencia: [
          {
            "nome": "Loja De Móveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 7, "nível2": 10, "nível3": 14 }
          },
          {
            "nome": "Livraria",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 7, "nível2": 13, "nível3": 18 }
          },
          {
            "nome": "Mercado",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 5, "nível3": 5 }
          },
          {
            "nome": "Redes De Fast-Food",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 10, "nível3": 12 }
          },
          {
            "nome": "Farmácias",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 15, "nível3": 20 }
          },
          {
            "nome": "Loja De Calçados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 8, "nível3": 12 }
          },
          {
            "nome": "Loja De Vestuário",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 14, "nível2": 16, "nível3": 22 }
          },
          {
            "nome": "Loja De Gadgets e Wearables",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 16, "nível3": 22 }
          },
          {
            "nome": "Loja De Games",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 14, "nível2": 18, "nível3": 22 }
          },
          {
            "nome": "Loja De Celulares",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 14, "nível2": 18, "nível3": 22 }
          },
          {
            "nome": "Loja De Informática",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 14, "nível2": 18, "nível3": 22 }
          },
          {
            "nome": "Mega Mercado",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 5, "nível3": 5 }
          }
        ],
        RecebeMelhoraEficiencia: [
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
            "nome": "Plataforma De Redes Sociais",
            "redCusto": { "nível1": 2, "nível2": 5, "nível3": 8 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Design De Produtos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 8, "nível3": 10 }
          },
          {
            "nome": "Servidores De Nuvem",
            "redCusto": { "nível1": 3, "nível2": 5, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Data Centers",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Transporte e Entrega",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Distribuição",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Inteligência Artificial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 14, "nível2": 22, "nível3": 30 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],

        recursoDeConstrução: ["Startup"],
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
        nome: "Plataforma De Streaming",
        desc: "Criação de sistemas e aplicativos sob demanda.",
        licençaLiberado: {
          licença: "Licença De Plataformas Digitais",
          liberado: false,
        },
        custoConstrucao: 410000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 15750,
          impostoFixo: 58000,
          impostoSobreFatu: 0.10000,
          rent: 22
        },

        lojasNecessarias: {
          terrenos: 2,
          lojasP: 5,
          lojasM: 0,
          lojasG: 1,
        },
        construçõesNecessárias: ["Startup"],
        licençasNecessárias: [],
        melhoraEficiencia: [],

        ForneceMelhoraEficiencia: [],
        RecebeMelhoraEficiencia: [
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
            "nome": "Servidores De Nuvem",
            "redCusto": { "nível1": 4, "nível2": 6, "nível3": 8 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Data Centers",
            "redCusto": { "nível1": 6, "nível2": 12, "nível3": 16 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Design De Produtos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 20, "nível3": 28 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Inteligência Artificial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 10, "nível3": 12 }
          }
        ],

        recursoDeConstrução: ["Startup"],
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
        nome: "Instituto de Tecnologia Alimentar",
        desc: "Criação de sistemas e aplicativos sob demanda.",
        licençaLiberado: {
          licença: "Licença Agro e Biotecnologia",
          liberado: false,
        },
        custoConstrucao: 410000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 15750,
          impostoFixo: 58000,
          impostoSobreFatu: 0.10000,
          rent: 22
        },

        lojasNecessarias: {
          terrenos: 2,
          lojasP: 5,
          lojasM: 0,
          lojasG: 1,
        },
        construçõesNecessárias: ["Startup"],
        licençasNecessárias: [],
        melhoraEficiencia: [],

        ForneceMelhoraEficiencia: [
          {
            "nome": "Plantação De Grãos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 17, "nível3": 29 }
          },
          {
            "nome": "Plantação De Vegetais",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 14, "nível3": 29 }
          },
          {
            "nome": "Pomares",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 14, "nível3": 16 }
          },
          {
            "nome": "Fazenda De Vacas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 20, "nível2": 25, "nível3": 60 }
          },
          {
            "nome": "Granja De Aves",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 15, "nível3": 30 }
          },
          {
            "nome": "Criação De Ovinos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 7, "nível2": 12, "nível3": 25 }
          },
          {
            "nome": "Restaurantes",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 14, "nível3": 18 }
          },
          {
            "nome": "Loja De Bebidas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 18, "nível2": 22, "nível3": 28 }
          },
          {
            "nome": "Padaria",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 18, "nível2": 22, "nível3": 28 }
          },
          {
            "nome": "Açougue",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 18, "nível2": 22, "nível3": 28 }
          },
          {
            "nome": "Fábrica De Bebidas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 22, "nível2": 28, "nível3": 34 }
          },
          {
            "nome": "Fábrica De Pães",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 50 }
          },
          {
            "nome": "Fábrica De Rações",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 22, "nível2": 28, "nível3": 32 }
          },
          {
            "nome": "Redes De Fast-Food",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 16, "nível3": 20 }
          },
          {
            "nome": "Centro De Pesquisa Agrícola",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 20, "nível3": 55 }
          },
          {
            "nome": "Instituto De Biotecnologia",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 16, "nível3": 30 }
          },
          {
            "nome": "Biofábrica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 7, "nível3": 14 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Centro De Pesquisa Agrícola",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 18, "nível2": 27, "nível3": 90 }
          },
          {
            "nome": "Instituto De Biotecnologia",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 32, "nível2": 43, "nível3": 60 }
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

        recursoDeConstrução: ["Startup"],
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
        nome: "Centro De Pesquisa Agrícola",
        desc: "Criação de sistemas e aplicativos sob demanda.",
        licençaLiberado: {
          licença: "Licença Agro e Biotecnologia",
          liberado: false,
        },
        custoConstrucao: 410000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 15750,
          impostoFixo: 58000,
          impostoSobreFatu: 0.10000,
          rent: 22
        },

        lojasNecessarias: {
          terrenos: 2,
          lojasP: 5,
          lojasM: 0,
          lojasG: 1,
        },
        construçõesNecessárias: ["Startup"],
        licençasNecessárias: [],
        melhoraEficiencia: [],

        ForneceMelhoraEficiencia: [
          {
            "nome": "Instituto De Tecnologia Alimentar",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 18, "nível2": 27, "nível3": 90 }
          },
          {
            "nome": "Plantação De Grãos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 8, "nível3": 12 }
          },
          {
            "nome": "Plantação De Vegetais",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 8, "nível3": 12 }
          },
          {
            "nome": "Pomares",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 14, "nível3": 25 }
          },
          {
            "nome": "Fazenda De Vacas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 7, "nível2": 12, "nível3": 25 }
          },
          {
            "nome": "Granja De Aves",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 7, "nível2": 12, "nível3": 25 }
          },
          {
            "nome": "Criação De Ovinos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 15, "nível3": 30 }
          },
          {
            "nome": "Área Florestal",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 28, "nível2": 35, "nível3": 80 }
          },
          {
            "nome": "Plantação De Eucalipto",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 15, "nível3": 25 }
          },
          {
            "nome": "Plantações De Plantas Medicinais",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 13, "nível3": 32 }
          },
          {
            "nome": "Depósito De Resíduos Orgânicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 20, "nível2": 25, "nível3": 54 }
          },
          {
            "nome": "Instituto De Biotecnologia",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 24, "nível2": 30, "nível3": 80 }
          },
          {
            "nome": "Biofábrica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 7, "nível3": 14 }
          },
          {
            "nome": "Fábrica De Fertilizante",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 16, "nível3": 19 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Construtora De Pequenas Obras",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Instituto De Biotecnologia",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 22, "nível2": 36, "nível3": 70 }
          },
          {
            "nome": "Instituto De Tecnologia Alimentar",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 20, "nível3": 55 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 14, "nível3": 25 }
          }
        ],

        recursoDeConstrução: ["Startup"],
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
        nome: "Instituto De Biotecnologia",
        desc: "Criação de sistemas e aplicativos sob demanda.",
        licençaLiberado: {
          licença: "Licença Agro e Biotecnologia",
          liberado: false,
        },
        custoConstrucao: 410000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 15750,
          impostoFixo: 58000,
          impostoSobreFatu: 0.10000,
          rent: 22
        },

        lojasNecessarias: {
          terrenos: 2,
          lojasP: 5,
          lojasM: 0,
          lojasG: 1,
        },
        construçõesNecessárias: ["Startup"],
        licençasNecessárias: [],
        melhoraEficiencia: [],

        ForneceMelhoraEficiencia: [
          {
            "nome": "Instituto De Tecnologia Alimentar",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 32, "nível2": 43, "nível3": 60 }
          },
          {
            "nome": "Plantação De Grãos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 13, "nível3": 25 }
          },
          {
            "nome": "Plantação De Vegetais",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 13, "nível3": 25 }
          },
          {
            "nome": "Pomares",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 13, "nível3": 25 }
          },
          {
            "nome": "Granja De Aves",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 20, "nível2": 25, "nível3": 60 }
          },
          {
            "nome": "Fazenda De Vacas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 15, "nível3": 30 }
          },
          {
            "nome": "Criação De Ovinos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 20, "nível2": 25, "nível3": 60 }
          },
          {
            "nome": "Área Florestal",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 15, "nível2": 20, "nível3": 40 }
          },
          {
            "nome": "Plantações De Eucalipto",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 12, "nível3": 45 }
          },
          {
            "nome": "Plantações De Plantas Medicinais",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 21, "nível2": 25, "nível3": 50 }
          },
          {
            "nome": "Centro De Pesquisa Agrícola",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 22, "nível2": 36, "nível3": 70 }
          },
          {
            "nome": "Biofábrica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 12, "nível3": 28 }
          },
          {
            "nome": "Fábrica De Fertilizante",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 16, "nível3": 19 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Agrícola",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 24, "nível2": 30, "nível3": 80 }
          },
          {
            "nome": "Centro De Pesquisa Em Inteligência Artificial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 16, "nível2": 24, "nível3": 40 }
          },
          {
            "nome": "Instituto De Tecnologia Alimentar",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 16, "nível3": 30 }
          }
        ],

        recursoDeConstrução: ["Startup"],
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
        nome: "Laboratório De Design De Produtos",
        desc: "Criação de sistemas e aplicativos sob demanda.",
        licençaLiberado: {
          licença: "Licença Eletrônica e Design",
          liberado: false,
        },
        custoConstrucao: 410000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 15750,
          impostoFixo: 58000,
          impostoSobreFatu: 0.10000,
          rent: 22
        },

        lojasNecessarias: {
          terrenos: 2,
          lojasP: 5,
          lojasM: 0,
          lojasG: 1,
        },
        construçõesNecessárias: ["Startup"],
        licençasNecessárias: [],
        melhoraEficiencia: [],

        ForneceMelhoraEficiencia: [
          {
            "nome": "Plataforma De Redes Sociais",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 15, "nível3": 20 }
          },
          {
            "nome": "Marketplace Online",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 8, "nível3": 10 }
          },
          {
            "nome": "Plataforma De Streaming",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 20, "nível3": 28 }
          },
          {
            "nome": "Fábrica De Smartphones",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 14, "nível3": 14 }
          },
          {
            "nome": "Fábrica De Computadores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 14, "nível3": 14 }
          },
          {
            "nome": "Fábrica De Dispositivos Vestiveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 10, "nível3": 12 }
          },
          {
            "nome": "Loja De Móveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 16, "nível3": 20 }
          },
          {
            "nome": "Fábrica De Móveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 26, "nível2": 34, "nível3": 42 }
          },
          {
            "nome": "Fábrica De Calçados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 16, "nível3": 24 }
          },
          {
            "nome": "Fábrica De Roupas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 12, "nível3": 14 }
          },
          {
            "nome": "Montadora De Veículos Elétricos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 8, "nível3": 10 }
          },
          {
            "nome": "Fábricas De Automóveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Fábrica De Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 3 }
          },
          {
            "nome": "Fábricas De Robôs",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 4, "nível3": 6 }
          },
          {
            "nome": "Fábrica De Foguetes",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 3, "nível3": 6 }
          },
          {
            "nome": "Fábrica De Aeronaves",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 4, "nível3": 8 }
          },
          {
            "nome": "Estaleiro",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 7, "nível3": 12 }
          },
          {
            "nome": "Joalheria",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 15, "nível2": 20, "nível3": 25 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 29, "nível2": 40, "nível3": 90 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 14, "nível2": 18, "nível3": 40 }
          },
          {
            "nome": "Escritório De Design De Interiores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 7, "nível2": 12, "nível3": 20 }
          }
        ],

        recursoDeConstrução: ["Startup"],
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
        nome: "Centro De Pesquisa Em Eletrônicos",
        desc: "Desenvolvimento de circuitos e dispositivos eletrônicos.",
        licençaLiberado: {
          licença: "Licença Eletrônica e Design",
          liberado: false,
        },
        custoConstrucao: 480000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 9375,
          impostoFixo: 160000,
          impostoSobreFatu: 0.050000,
          rent: 6
        },

        lojasNecessarias: {
          terrenos: 3,
          lojasP: 0,
          lojasM: 1,
          lojasG: 2,
        },
        construçõesNecessárias: [],
        licençasNecessárias: [],
        melhoraEficiencia: [],

        ForneceMelhoraEficiencia: [
          {
            "nome": "Fábrica De Turbinas Eólicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 6, "nível3": 7 }
          },
          {
            "nome": "Fábrica De Painéis Solares",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 8 }
          },
          {
            "nome": "Fábrica De Baterias",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 6, "nível3": 8 }
          },
          {
            "nome": "Fábrica De Peças Automotivas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 6 }
          },
          {
            "nome": "Montadora De Veículos Elétricos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 12, "nível3": 30 }
          },
          {
            "nome": "Fábricas De Automóveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 10, "nível3": 22 }
          },
          {
            "nome": "Fábrica De Motores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 5 }
          },
          {
            "nome": "Fábrica De Foguetes",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 7, "nível3": 14 }
          },
          {
            "nome": "Fábrica De Aeronaves",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 10 }
          },
          {
            "nome": "Fábricas De Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 11, "nível3": 12 }
          },
          {
            "nome": "Fábricas De Semicondutores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 9, "nível2": 12, "nível3": 15 }
          },
          {
            "nome": "Fábricas De Robôs",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 4, "nível3": 36 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 7 }
          },
          {
            "nome": "Fábrica De Plásticos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 5 }
          },
          {
            "nome": "Fábrica De Produtos Químicos Especializados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 5 }
          },
          {
            "nome": "Empresa De Telecomunicações",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 18, "nível3": 22 }
          },
          {
            "nome": "Fábrica De Smartphones",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 14, "nível2": 20, "nível3": 28 }
          },
          {
            "nome": "Fábrica De Computadores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 14, "nível2": 20, "nível3": 28 }
          },
          {
            "nome": "Fábrica De Consoles De Jogos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 20, "nível2": 26, "nível3": 32 }
          },
          {
            "nome": "Fábrica De Dispositivos Vestiveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 14, "nível2": 18, "nível3": 22 }
          },
          {
            "nome": "Loja De Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 18, "nível2": 24, "nível3": 28 }
          },
          {
            "nome": "Servidores De Nuvem",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 16, "nível3": 20 }
          },
          {
            "nome": "Data Centers",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 16, "nível3": 20 }
          },
          {
            "nome": "Fábrica De Chips",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 6, "nível3": 9 }
          },
          {
            "nome": "Fábrica De Placas Eletrônicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 6, "nível3": 9 }
          },
          {
            "nome": "Estaleiro",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 10, "nível3": 22 }
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
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 15, "nível2": 25, "nível3": 50 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Data Centers",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Startups",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Chips",
            "redCusto": { "nível1": 4, "nível2": 6, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Placas Eletrônicas",
            "redCusto": { "nível1": 5, "nível2": 8, "nível3": 8 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Semicondutores",
            "redCusto": { "nível1": 3, "nível2": 4, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 35, "nível2": 45, "nível3": 100 }
          }
        ],

        recursoDeConstrução: [],
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
        nome: "Laboratório De Nanotecnologia",
        desc: "Criação de sistemas e aplicativos sob demanda.",
        licençaLiberado: {
          licença: "Licença Eletrônica e Design",
          liberado: false,
        },
        custoConstrucao: 410000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 15750,
          impostoFixo: 58000,
          impostoSobreFatu: 0.10000,
          rent: 22
        },

        lojasNecessarias: {
          terrenos: 2,
          lojasP: 5,
          lojasM: 0,
          lojasG: 1,
        },
        construçõesNecessárias: ["Startup"],
        licençasNecessárias: [],
        melhoraEficiencia: [],

        ForneceMelhoraEficiencia: [
          {
            "nome": "Fábrica De Dispositivos Vestíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 8, "nível3": 10 }
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
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 25, "nível2": 34, "nível3": 80 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 16, "nível2": 20, "nível3": 40 }
          },
          {
            "nome": "Centro De Pesquisa Em Robótica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 9, "nível2": 16, "nível3": 30 }
          }
        ],

        recursoDeConstrução: ["Startup"],
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
        nome: "Fábrica De Smartphones",
        desc: "Criação de sistemas e aplicativos sob demanda.",
        licençaLiberado: {
          licença: "Licença De Fábricas Tecnológicas",
          liberado: false,
        },
        custoConstrucao: 410000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 15750,
          impostoFixo: 58000,
          impostoSobreFatu: 0.10000,
          rent: 22
        },

        lojasNecessarias: {
          terrenos: 2,
          lojasP: 5,
          lojasM: 0,
          lojasG: 1,
        },
        construçõesNecessárias: ["Startup"],
        licençasNecessárias: [],
        melhoraEficiencia: [],

        ForneceMelhoraEficiencia: [
          {
            "nome": "Loja De Celulares",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 7, "nível3": 18 }
          },
          {
            "nome": "Loja De Gadgets e Wearables",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 7 }
          },
          {
            "nome": "Shopping Popular",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 1, "nível3": 2 }
          },
          {
            "nome": "Shopping Center",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 1, "nível3": 0 }
          },
          {
            "nome": "Loja De Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 2, "nível3": 5 }
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
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 6, "nível3": 8 }
          },
          {
            "nome": "Fábrica De Chips",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Placas Eletrônicas",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Distribuição",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Telecomunicações",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 14, "nível2": 20, "nível3": 28 }
          },
          {
            "nome": "Laboratório De Design De Produtos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 14, "nível3": 14 }
          },
          {
            "nome": "Fábrica De Baterias",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],

        recursoDeConstrução: ["Startup"],
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
        nome: "Fábrica De Computadores",
        desc: "Criação de sistemas e aplicativos sob demanda.",
        licençaLiberado: {
          licença: "Licença De Fábricas Tecnológicas",
          liberado: false,
        },
        custoConstrucao: 410000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 15750,
          impostoFixo: 58000,
          impostoSobreFatu: 0.10000,
          rent: 22
        },

        lojasNecessarias: {
          terrenos: 2,
          lojasP: 5,
          lojasM: 0,
          lojasG: 1,
        },
        construçõesNecessárias: ["Startup"],
        licençasNecessárias: [],
        melhoraEficiencia: [],

        ForneceMelhoraEficiencia: [
          {
            "nome": "Loja De Informática",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 7, "nível3": 17 }
          },
          {
            "nome": "Shopping Center",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 1, "nível3": 0 }
          },
          {
            "nome": "Loja De Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 2, "nível3": 5 }
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
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 6, "nível3": 8 }
          },
          {
            "nome": "Empresa De Desenvolvimento De Software",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Chips",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Placas Eletrônicas",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Distribuição",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 14, "nível2": 20, "nível3": 28 }
          },
          {
            "nome": "Laboratório De Design De Produtos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 14, "nível3": 14 }
          },
          {
            "nome": "Fábrica De Baterias",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],

        recursoDeConstrução: ["Startup"],
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
        nome: "Fábrica De Consoles De Jogos",
        desc: "Criação de sistemas e aplicativos sob demanda.",
        licençaLiberado: {
          licença: "Licença De Fábricas Tecnológicas",
          liberado: false,
        },
        custoConstrucao: 410000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 15750,
          impostoFixo: 58000,
          impostoSobreFatu: 0.10000,
          rent: 22
        },

        lojasNecessarias: {
          terrenos: 2,
          lojasP: 5,
          lojasM: 0,
          lojasG: 1,
        },
        construçõesNecessárias: ["Startup"],
        licençasNecessárias: [],
        melhoraEficiencia: [],

        ForneceMelhoraEficiencia: [
          {
            "nome": "Loja De Games",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 6, "nível3": 15 }
          },
          {
            "nome": "Shopping Center",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 1 }
          },
          {
            "nome": "Loja De Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 4 }
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
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 14, "nível3": 18 }
          },
          {
            "nome": "Fábrica De Chips",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Placas Eletrônicas",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Jogos Digitais",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Distribuição",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 20, "nível2": 26, "nível3": 32 }
          },
          {
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],

        recursoDeConstrução: ["Startup"],
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
        nome: "Fábrica De Dispositivos Vestiveis",
        desc: "Criação de sistemas e aplicativos sob demanda.",
        licençaLiberado: {
          licença: "Licença De Fábricas Tecnológicas",
          liberado: false,
        },
        custoConstrucao: 410000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 15750,
          impostoFixo: 58000,
          impostoSobreFatu: 0.10000,
          rent: 22
        },

        lojasNecessarias: {
          terrenos: 2,
          lojasP: 5,
          lojasM: 0,
          lojasG: 1,
        },
        construçõesNecessárias: ["Startup"],
        licençasNecessárias: [],
        melhoraEficiencia: [],

        ForneceMelhoraEficiencia: [
          {
            "nome": "Loja De Gadgets e Wearables",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 7, "nível3": 15 }
          },
          {
            "nome": "Loja De Celulares",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 7 }
          },
          {
            "nome": "Loja De Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 4 }
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
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 4, "nível3": 6 }
          },
          {
            "nome": "Fábrica De Chips",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Placas Eletrônicas",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Laboratório De Nanotecnologia",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 8, "nível3": 10 }
          },
          {
            "nome": "Centro De Distribuição",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 14, "nível2": 18, "nível3": 22 }
          },
          {
            "nome": "Laboratório De Design De Produtos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 10, "nível3": 12 }
          },
          {
            "nome": "Fábrica De Baterias",
            "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],

        recursoDeConstrução: ["Startup"],
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
        nome: "Centro de Pesquisa Química",
        desc: "Pesquisas avançadas em compostos químicos.",
        licençaLiberado: {
          licença: "Licença De Tecnologia Experimental",
          liberado: false,
        },
        custoConstrucao: 320000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 5000,
          impostoFixo: 95000,
          impostoSobreFatu: 0.10000,
          rent: 5
        },

        lojasNecessarias: {
          terrenos: 3,
          lojasP: 2,
          lojasM: 1,
          lojasG: 0,
        },
        construçõesNecessárias: [],
        licençasNecessárias: [],
        melhoraEficiencia: [],

        ForneceMelhoraEficiencia: [
          {
            "nome": "Fábrica De Painéis Solares",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 5, "nível3": 6 }
          },
          {
            "nome": "Fábrica De Baterias",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 12, "nível3": 12 }
          },
          {
            "nome": "Fábrica De Rações",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 44, "nível2": 57, "nível3": 68 }
          },
          {
            "nome": "Fábrica De Embalagens",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 20, "nível2": 28, "nível3": 36 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Depósito De Resíduos Orgânicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 25, "nível2": 35, "nível3": 80 }
          },
          {
            "nome": "Posto De Combustível",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 20, "nível2": 25, "nível3": 30 }
          },
          {
            "nome": "Fábrica De Celulose",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 18, "nível3": 22 }
          },
          {
            "nome": "Fábrica De Papel",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 20, "nível2": 15, "nível3": 20 }
          },
          {
            "nome": "Usina Siderúrgica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 8, "nível3": 10 }
          },
          {
            "nome": "Fundição De Alumínio",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 16, "nível3": 20 }
          },
          {
            "nome": "Fábrica De Ligas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 9, "nível3": 10 }
          },
          {
            "nome": "Indústria De Componentes Mecânicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 5 }
          },
          {
            "nome": "Fábrica De Chapas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 6, "nível3": 8 }
          },
          {
            "nome": "Fábrica De Estruturas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 6, "nível3": 8 }
          },
          {
            "nome": "Fábrica De Peças Automotivas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 7, "nível3": 9 }
          },
          {
            "nome": "Fábricas De Automóveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 6 }
          },
          {
            "nome": "Refinaria De Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 7, "nível2": 28, "nível3": 47 }
          },
          {
            "nome": "Refinaria",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 16, "nível3": 32 }
          },
          {
            "nome": "Fábrica De Motores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 11 }
          },
          {
            "nome": "Fábrica De Foguetes",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 5, "nível3": 10 }
          },
          {
            "nome": "Fábrica De Aeronaves",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 3, "nível3": 5 }
          },
          {
            "nome": "Fábrica De Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 10, "nível3": 12 }
          },
          {
            "nome": "Fábricas De Semicondutores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 8, "nível3": 10 }
          },
          {
            "nome": "Fábricas De Robôs",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 4, "nível3": 7 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 0, "nível3": 5 }
          },
          {
            "nome": "Fábrica De Plásticos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 17, "nível2": 21, "nível3": 25 }
          },
          {
            "nome": "Fábrica De Produtos Químicos Especializados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 17, "nível2": 21, "nível3": 25 }
          },
          {
            "nome": "Fábrica Têxtil",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 16, "nível2": 22, "nível3": 26 }
          },
          {
            "nome": "Fábrica De Calçados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 16, "nível2": 24, "nível3": 26 }
          },
          {
            "nome": "Fábrica De Roupas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 8, "nível3": 10 }
          },
          {
            "nome": "Fábrica De Medicamentos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 20, "nível2": 25, "nível3": 35 }
          },
          {
            "nome": "Laboratório Farmacêutico",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 18, "nível2": 22, "nível3": 28 }
          },
          {
            "nome": "Centro De Pesquisa Agrícola",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 14, "nível3": 25 }
          },
          {
            "nome": "Mineradora De Minérios Radioativos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 10, "nível3": 30 }
          },
          {
            "nome": "Mineradora De Pedras Preciosas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 16, "nível2": 20, "nível3": 30 }
          },
          {
            "nome": "Alto-Forno",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 12, "nível3": 12 }
          },
          {
            "nome": "Biofábrica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 12, "nível3": 20 }
          },
          {
            "nome": "Laboratório De Novos Combustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 12, "nível3": 14 }
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
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Data Centers",
            "redCusto": { "nível1": 6, "nível2": 8, "nível3": 8 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Startups",
            "redCusto": { "nível1": 10, "nível2": 15, "nível3": 16 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 15, "nível2": 25, "nível3": 55 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 35, "nível2": 45, "nível3": 95 }
          }
        ],

        recursoDeConstrução: [],
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
      ,
      {
        nome: "Centro De Pesquisa Em Fusão Nuclear",
        desc: "Pesquisa para geração de energia por fusão nuclear.",
        licençaLiberado: {
          licença: "Licença De Tecnologia Experimental",
          liberado: false,
        },
        custoConstrucao: 1200000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 25000,
          impostoFixo: 100000,
          impostoSobreFatu: 0.050000,
          rent: 6
        },

        lojasNecessarias: {
          terrenos: 5,
          lojasP: 2,
          lojasM: 3,
          lojasG: 3,
        },
        construçõesNecessárias: [],
        licençasNecessárias: [],
        melhoraEficiencia: [],

        ForneceMelhoraEficiencia: [
          {
            "nome": "Reator Nuclear Convencional",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 12, "nível3": 15 }
          },
          {
            "nome": "Usina De Fusão Nuclear",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 14, "nível3": 20 }
          },
          {
            "nome": "Mineradora De Minérios Radioativos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 30, "nível3": 60 }
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
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 25, "nível2": 30, "nível3": 50 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Data Centers",
            "redCusto": { "nível1": 15, "nível2": 22, "nível3": 23 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 25, "nível2": 40, "nível3": 100 }
          }
        ],

        recursoDeConstrução: ["Centro de Pesquisa Química"],
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
        nome: "Laboratório De Novos Combustíveis",
        desc: "Pesquisa para geração de energia por fusão nuclear.",
        licençaLiberado: {
          licença: "Licença De Tecnologia Experimental",
          liberado: false,
        },
        custoConstrucao: 1200000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 25000,
          impostoFixo: 100000,
          impostoSobreFatu: 0.050000,
          rent: 6
        },

        lojasNecessarias: {
          terrenos: 5,
          lojasP: 2,
          lojasM: 3,
          lojasG: 3,
        },
        construçõesNecessárias: [],
        licençasNecessárias: [],
        melhoraEficiencia: [],

        ForneceMelhoraEficiencia: [
          {
            "nome": "Centro De Pesquisa Em Energias Renováveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 12, "nível3": 16 }
          },
          {
            "nome": "Fábrica De Motores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 7, "nível3": 14 }
          },
          {
            "nome": "Fábrica De Foguetes",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 5, "nível3": 10 }
          },
          {
            "nome": "Fábrica De Aeronaves",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 1, "nível2": 2, "nível3": 5 }
          },
          {
            "nome": "Estaleiro",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 8, "nível3": 10 }
          },
          {
            "nome": "Posto De Combustível",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 15, "nível3": 20 }
          },
          {
            "nome": "Aeroportos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 12, "nível3": 18 }
          },
          {
            "nome": "Portos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 15, "nível3": 20 }
          },
          {
            "nome": "Biofábrica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 7, "nível3": 14 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Posto De Combustível",
            "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria De Biocombustíveis",
            "redCusto": { "nível1": 4, "nível2": 5, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Refinaria",
            "redCusto": { "nível1": 5, "nível2": 8, "nível3": 20 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 10, "nível3": 12 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 18, "nível3": 24 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 12, "nível3": 14 }
          }
        ],

        recursoDeConstrução: ["Centro de Pesquisa Química"],
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
        nome: "Centro De Pesquisa Aeroespacial",
        desc: "Tecnologias voltadas ao setor aeroespacial.",
        licençaLiberado: {
          licença: "Licença De Engenharia Avançada",
          liberado: false,
        },
        custoConstrucao: 2000000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 22000,
          impostoFixo: 90000,
          impostoSobreFatu: 0.050000,
          rent: 4
        },

        lojasNecessarias: {
          terrenos: 4,
          lojasP: 0,
          lojasM: 0,
          lojasG: 3,
        },
        construçõesNecessárias: [],
        licençasNecessárias: [],
        melhoraEficiencia: [],

        ForneceMelhoraEficiencia: [
          {
            "nome": "Aeroportos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 16, "nível3": 30 }
          },
          {
            "nome": "Indústria De Componentes Mecânicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 12, "nível3": 16 }
          },
          {
            "nome": "Fábrica De Motores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 7, "nível3": 20 }
          },
          {
            "nome": "Fábrica De Foguetes",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 12, "nível3": 24 }
          },
          {
            "nome": "Fábrica De Aeronaves",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 12, "nível3": 32 }
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
            "nome": "Construtora De Grandes Infraestruturas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Data Centers",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Desenvolvimento De Software",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Motores",
            "redCusto": { "nível1": 4, "nível2": 6, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Foguetes",
            "redCusto": { "nível1": 4, "nível2": 6, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábrica De Aeronaves",
            "redCusto": { "nível1": 4, "nível2": 6, "nível3": 7 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 100 }
          },
          {
            "nome": "Centro De Pesquisa Em Inteligência Artificial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 20, "nível2": 30, "nível3": 50 }
          }
        ],

        recursoDeConstrução: ["Centro De Pesquisa Em Eletrônicos"]
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
        nome: "Centro de Engenharia Avançada",
        desc: "Tecnologias voltadas ao setor aeroespacial.",
        licençaLiberado: {
          licença: "Licença De Engenharia Avançada",
          liberado: false,
        },
        custoConstrucao: 2000000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 22000,
          impostoFixo: 90000,
          impostoSobreFatu: 0.050000,
          rent: 4
        },

        lojasNecessarias: {
          terrenos: 4,
          lojasP: 0,
          lojasM: 0,
          lojasG: 3,
        },
        construçõesNecessárias: [],
        licençasNecessárias: [],
        melhoraEficiencia: [],

        ForneceMelhoraEficiencia: [
          {
            "nome": "Usina Solar",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 6, "nível3": 8 }
          },
          {
            "nome": "Fábrica De Turbinas Eólicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 9, "nível3": 12 }
          },
          {
            "nome": "Fábrica De Painéis Solares",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 6 }
          },
          {
            "nome": "Fábrica De Baterias",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 7, "nível3": 10 }
          },
          {
            "nome": "Usina Termelétrica Movida a Biocombustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 7, "nível3": 8 }
          },
          {
            "nome": "Usina De Biomassa",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 4 }
          },
          {
            "nome": "Usina Hidrelétrica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 6, "nível3": 7 }
          },
          {
            "nome": "Parque Eólico",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 6, "nível3": 7 }
          },
          {
            "nome": "Usina Termelétrica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 8, "nível3": 8 }
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
            "nome": "Alto-Forno",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 16, "nível3": 15 }
          },
          {
            "nome": "Usina Siderúrgica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 14, "nível2": 18, "nível3": 24 }
          },
          {
            "nome": "Fundição De Alumínio",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 9, "nível2": 10, "nível3": 11 }
          },
          {
            "nome": "Fábrica De Ligas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 12, "nível3": 16 }
          },
          {
            "nome": "Indústria De Componentes Mecânicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 10, "nível3": 12 }
          },
          {
            "nome": "Fábrica De Chapas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 7, "nível2": 9, "nível3": 10 }
          },
          {
            "nome": "Fábrica De Estruturas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 7, "nível2": 9, "nível3": 10 }
          },
          {
            "nome": "Fábrica De Peças Automotivas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 8, "nível3": 9 }
          },
          {
            "nome": "Montadora De Veículos Elétricos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 8, "nível3": 15 }
          },
          {
            "nome": "Fábrica De Automóveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 18, "nível3": 40 }
          },
          {
            "nome": "Fábrica De Chips",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 8, "nível3": 9 }
          },
          {
            "nome": "Fábrica De Placas Eletrônicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 8, "nível3": 9 }
          },
          {
            "nome": "Fábricas De Semicondutores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 5 }
          },
          {
            "nome": "Fábrica De Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Fábricas De Robôs",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 6, "nível3": 6 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 0, "nível3": 5 }
          },
          {
            "nome": "Fábrica De Motores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 14, "nível3": 28 }
          },
          {
            "nome": "Fábrica De Foguetes",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 10, "nível3": 23 }
          },
          {
            "nome": "Fábrica De Aeronaves",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 15, "nível3": 27 }
          },
          {
            "nome": "Estaleiro",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 18, "nível3": 42 }
          },
          {
            "nome": "Laboratório De Nanotecnologia",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 25, "nível2": 34, "nível3": 80 }
          },
          {
            "nome": "Centro De Pesquisa Em Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 35, "nível2": 45, "nível3": 100 }
          },
          {
            "nome": "Laboratório De Design De Produtos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 29, "nível2": 40, "nível3": 90 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 24, "nível2": 38, "nível3": 84 }
          },
          {
            "nome": "Centro De Pesquisa Aeroespacial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 100 }
          },
          {
            "nome": "Centro De Pesquisa Em Robótica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 18, "nível2": 25, "nível3": 45 }
          },
          {
            "nome": "Centro De Pesquisa Em Inteligência Artificial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 15, "nível3": 50 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 15, "nível2": 25, "nível3": 55 }
          },
          {
            "nome": "Centro De Pesquisa Em Fusão Nuclear",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 25, "nível2": 40, "nível3": 100 }
          },
          {
            "nome": "Laboratório De Novos Combustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 10, "nível3": 12 }
          },
          {
            "nome": "Plataforma De Petróleo",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 10, "nível3": 12 }
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
            "nome": "Centro De Pesquisa Em Inteligência Artificial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 38, "nível2": 55, "nível3": 110 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Desenvolvimento De Software",
            "redCusto": { "nível1": 10, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Data Centers",
            "redCusto": { "nível1": 6, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Escritório De Arquitetura",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 25, "nível3": 40 }
          }
        ],

        recursoDeConstrução: ["Centro De Pesquisa Em Eletrônicos"]
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
        nome: "Centro de Pesquisa em Materiais Avançados",
        desc: "Tecnologias voltadas ao setor aeroespacial.",
        licençaLiberado: {
          licença: "Licença De Engenharia Avançada",
          liberado: false,
        },
        custoConstrucao: 2000000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 22000,
          impostoFixo: 90000,
          impostoSobreFatu: 0.050000,
          rent: 4
        },

        lojasNecessarias: {
          terrenos: 4,
          lojasP: 0,
          lojasM: 0,
          lojasG: 3,
        },
        construçõesNecessárias: [],
        licençasNecessárias: [],
        melhoraEficiencia: [],

        ForneceMelhoraEficiencia: [
          {
            "nome": "Alto-Forno",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 9, "nível2": 18, "nível3": 18 }
          },
          {
            "nome": "Usina Siderúrgica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 11, "nível3": 12 }
          },
          {
            "nome": "Fundição De Alumínio",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 7, "nível2": 11, "nível3": 15 }
          },
          {
            "nome": "Fábrica De Ligas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 16, "nível3": 20 }
          },
          {
            "nome": "Indústria De Componentes Mecânicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 9, "nível2": 11, "nível3": 13 }
          },
          {
            "nome": "Fábrica De Chapas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 10, "nível3": 11 }
          },
          {
            "nome": "Fábrica De Estruturas Metálicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 10, "nível3": 11 }
          },
          {
            "nome": "Fábrica De Chips",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 10, "nível3": 11 }
          },
          {
            "nome": "Fábrica De Placas Eletrônicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 10, "nível3": 11 }
          },
          {
            "nome": "Fábricas De Semicondutores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 5 }
          },
          {
            "nome": "Fábrica De Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Fábricas De Robôs",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 6, "nível3": 6 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 0, "nível3": 5 }
          },
          {
            "nome": "Fábrica De Peças Automotivas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 7, "nível2": 10, "nível3": 12 }
          },
          {
            "nome": "Montadora De Veículos Elétricos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 10, "nível3": 20 }
          },
          {
            "nome": "Fábrica De Automóveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 15, "nível3": 38 }
          },
          {
            "nome": "Fábrica De Motores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 14, "nível3": 28 }
          },
          {
            "nome": "Fábrica De Foguetes",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 12, "nível3": 26 }
          },
          {
            "nome": "Fábrica De Aeronaves",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 12, "nível3": 20 }
          },
          {
            "nome": "Estaleiro",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 17, "nível3": 37 }
          },
          {
            "nome": "Laboratório De Nanotecnologia",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 16, "nível2": 20, "nível3": 40 }
          },
          {
            "nome": "Laboratório De Design De Produtos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 14, "nível2": 18, "nível3": 40 }
          },
          {
            "nome": "Centro De Pesquisa Química",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 35, "nível2": 45, "nível3": 95 }
          },
          {
            "nome": "Laboratório De Novos Combustíveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 12, "nível2": 18, "nível3": 24 }
          },
          {
            "nome": "Plataforma De Petróleo",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 7, "nível3": 9 }
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
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 24, "nível2": 38, "nível3": 84 }
          },
          {
            "nome": "Centro De Pesquisa Em Inteligência Artificial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 18, "nível2": 20, "nível3": 50 }
          },
          {
            "nome": "Empresa De Desenvolvimento De Software",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 14, "nível2": 16, "nível3": 16 }
          },
          {
            "nome": "Data Centers",
            "redCusto": { "nível1": 6, "nível2": 7, "nível3": 8 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Escritório De Design De Interiores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 6, "nível3": 8 }
          },
          {
            "nome": "Escritório De Arquitetura",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 4, "nível2": 6, "nível3": 8 }
          }
        ],

        recursoDeConstrução: ["Centro De Pesquisa Em Eletrônicos"]
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
      ,
      {
        nome: "Centro De Pesquisa Em Robótica",
        desc: "Inovações em robótica e automação industrial.",
        licençaLiberado: {
          licença: "Licença De Pesquisa Em Robótica e IA",
          liberado: false,
        },
        custoConstrucao: 140000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 15625,
          impostoFixo: 140000,
          impostoSobreFatu: 0.050000,
          rent: 5
        },

        lojasNecessarias: {
          terrenos: 0,
          lojasP: 0,
          lojasM: 0,
          lojasG: 1,
        },
        construçõesNecessárias: [],
        licençasNecessárias: [],
        melhoraEficiencia: [],

        ForneceMelhoraEficiencia: [
          {
            "nome": "Fábrica De Chips",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 7, "nível2": 10, "nível3": 12 }
          },
          {
            "nome": "Fábrica De Placas Eletrônicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 7, "nível2": 10, "nível3": 12 }
          },
          {
            "nome": "Fábricas De Robôs",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 29, "nível3": 55 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 7, "nível3": 13 }
          },
          {
            "nome": "Fábrica De Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 4 }
          },
          {
            "nome": "Fábricas De Semicondutores",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 7, "nível2": 9, "nível3": 10 }
          },
          {
            "nome": "Fábrica De Peças Automotivas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 5, "nível2": 8, "nível3": 10 }
          },
          {
            "nome": "Montadora De Veículos Elétricos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 12, "nível3": 25 }
          },
          {
            "nome": "Fábrica De Automóveis",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 7, "nível3": 12 }
          },
          {
            "nome": "Fábrica De Aeronaves",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 8, "nível3": 15 }
          },
          {
            "nome": "Fábrica De Foguetes",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 4, "nível3": 8 }
          },
          {
            "nome": "Centro De Pesquisa Em Inteligência Artificial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 40, "nível2": 55, "nível3": 100 }
          },
          {
            "nome": "Laboratório De Nanotecnologia",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 9, "nível2": 16, "nível3": 30 }
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
            "nome": "Empresa De Consultoria Energética",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 6, "nível2": 15, "nível3": 25 }
          },
          {
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Data Centers",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Desenvolvimento De Software",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 3 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 18, "nível2": 25, "nível3": 45 }
          },
          {
            "nome": "Centro De Pesquisa Em IA",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 26, "nível2": 30, "nível3": 80 }
          },
          {
            "nome": "Fábrica De Eletrônicos",
            "redCusto": { "nível1": 4, "nível2": 6, "nível3": 6 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Fábricas De Robôs",
            "redCusto": { "nível1": 8, "nível2": 12, "nível3": 13 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],

        recursoDeConstrução: ["Centro De Pesquisa Em Eletrônicos", "Startup"]
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
      ,
      {
        nome: "Centro De Pesquisa Em IA",
        desc: "Desenvolvimento de inteligência artificial aplicada.",
        licençaLiberado: {
          licença: "Licença De Pesquisa Em Robótica e IA",
          liberado: false,
        },
        custoConstrucao: 900000,
        quantidade: 0,
        finanças: {
          faturamentoUnitário: 22000,
          impostoFixo: 120000,
          impostoSobreFatu: 0.05,
          rent: 5
        },

        lojasNecessarias: {
          terrenos: 2,
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
            "nome": "Startups",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 50 }
          },
          {
            "nome": "Centros De Pesquisa Em Robótica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 26, "nível2": 30, "nível3": 80 }
          },
          {
            "nome": "Centro De Pesquisa Aeroespacial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 20, "nível2": 30, "nível3": 50 }
          },
          {
            "nome": "Empresa De Desenvolvimento De Software",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 50 }
          },
          {
            "nome": "Instituto De Biotecnologia",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 16, "nível2": 24, "nível3": 40 }
          },
          {
            "nome": "Fábrica De Chips",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 4, "nível3": 6 }
          },
          {
            "nome": "Fábrica De Placas Eletrônicas",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 4, "nível3": 6 }
          },
          {
            "nome": "Centro De Pesquisa Em Materiais Avançados",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 18, "nível2": 20, "nível3": 50 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 38, "nível2": 55, "nível3": 110 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 3, "nível3": 5 }
          },
          {
            "nome": "Fábricas De Robôs",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 2, "nível2": 6, "nível3": 6 }
          },
          {
            "nome": "Fábrica De Eletrônicos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 3, "nível2": 5, "nível3": 7 }
          },
          {
            "nome": "Empresa De Jogos Digitais",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 16, "nível2": 22, "nível3": 27 }
          },
          {
            "nome": "Empresa De Telecomunicações",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 12, "nível3": 18 }
          },
          {
            "nome": "Plataforma De Redes Sociais",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 15, "nível3": 20 }
          },
          {
            "nome": "Marketplace Online",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 14, "nível2": 22, "nível3": 30 }
          },
          {
            "nome": "Plataforma De Streaming",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 8, "nível2": 10, "nível3": 12 }
          },
          {
            "nome": "Data Centers",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 14, "nível3": 16 }
          },
          {
            "nome": "Servidores De Nuvem",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 14, "nível3": 16 }
          },
          {
            "nome": "Montadora De Veículos Elétricos",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 20, "nível2": 31, "nível3": 40 }
          }
        ],
        RecebeMelhoraEficiencia: [
          {
            "nome": "Data Centers",
            "redCusto": { "nível1": 3, "nível2": 5, "nível3": 5 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Desenvolvimento De Software",
            "redCusto": { "nível1": 4, "nível2": 7, "nível3": 7 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
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
            "nome": "Construtora",
            "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Centro De Engenharia Avançada",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 10, "nível2": 15, "nível3": 50 }
          },
          {
            "nome": "Centro De Pesquisa Em Robótica",
            "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
            "aumFatu": { "nível1": 40, "nível2": 55, "nível3": 100 }
          },
          {
            "nome": "Fábrica De Eletrônicos",
            "redCusto": { "nível1": 7, "nível2": 9, "nível3": 9 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          },
          {
            "nome": "Empresa De Automação Industrial",
            "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
            "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
          }
        ],

        recursoDeConstrução: ["Startup", "Data Center"]
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
      <TecnologiaContext.Provider value={{ dadosTecnologia,setDadosTecnologia, atualizarDados, atualizarDadosProf, atualizarDadosProf2, atualizarDadosProf3, atualizarDadosVariados }}>
        {children}
      </TecnologiaContext.Provider>
    );
  };
  
  
  export const useTecnologia = () => useContext(TecnologiaContext);
