import React, { useState, createContext,useContext } from 'react';

const AgriculturaContext = createContext();

export const AgriculturaProvider = ({ children }) => {

    const [dadosAgricultura, setDadosAgricultura] = useState({
    agricultura: {
        economiaSetor: {
            estadoAtual: "estável"
        },
        licençaGlobal: {
            comprado: true,
            valor: 20000
        },
        licençasSetor: [
            {
                nome: "Licença Global De Agricultura",
                desc: "Autoriza operações agrícolas básicas incluindo cultivo de grãos, hortaliças e frutas, formando a base da cadeia produtiva de alimentos.",
                valor: 2000,
                edifíciosLiberados: ["Plantação De Grãos", "Plantação De Vegetais", "Fazenda Administrativa", "Pomares"],
                status: false
            },
            {
                nome: "Licença De Comércios Agrícolas",
                desc: "Permite a criação de centros de distribuição e cooperativas para otimizar a comercialização de produtos agrícolas entre regiões.",
                valor: 3000,
                edifíciosLiberados: ["Cooperativa Agrícola", "Centro De Comércio De Plantações"],
                status: false
            },
            {
                nome: "Licença De Fazendas De Animais",
                desc: "Habilita a criação profissional de animais como gado, aves e ovinos, essencial para abastecer frigoríficos e laticínios.",
                valor: 2500,
                edifíciosLiberados: ["Fazenda De Vacas", "Granja De Aves", "Criação De Ovinos"],
                status: false
            },
            {
                nome: "Licença De Armazenamentos Agrícolas",
                desc: "Concede permissão para construção de unidades de armazenamento especializadas para grãos e insumos agrícolas.",
                valor: 3200,
                edifíciosLiberados: ["Armazém", "Silo", "Depósito De Resíduos Orgânicos"],
                status: false
            },
            {
                nome: "Licença De Áreas Especiais",
                desc: "Autoriza a exploração sustentável de recursos naturais como madeira e minérios em áreas designadas.",
                valor: 6200,
                edifíciosLiberados: ["Madeireira", "Área Florestal", "Terreno De Mineração"],
                status: false
            },
            {
                nome: "Licença De Outras Plantações",
                desc: "Permite o cultivo de espécies vegetais especiais com alto valor agregado para indústrias específicas.",
                valor: 5300,
                edifíciosLiberados: ["Plantação De Eucalipto", "Plantação De Plantas Medicinais"],
                status: false
            }
        ],






        edificios: [
            {
                nome: "Plantação De Grãos",
                desc: "Base da produção agrícola. Dá suporte às fazendas e à alimentação.",
                licençaLiberado: {
                    licença: "Licença Global De Agricultura",
                    liberado: true,
                },
                custoConstrucao: 40000,
                quantidade: 0,
                finanças: {
                    faturamentoUnitário: 1000,
                    impostoFixo: 500,
                    impostoSobreFatu: 0.10000,
                    rent: 32
                },

                lojasNecessarias: {
                    terrenos: 2,
                    lojasP: 0,
                    lojasM: 0,
                    lojasG: 0,
                },
                construçõesNecessárias: ["Fazenda Administrativa", "Armazém"],
                licençasNecessárias: ["Silo", "Plantação De Vegetais"],
                ForneceMelhoraEficiencia: [
                    {
                        "nome": "Fábrica De Pães",
                        "redCusto": {
                            "nível1": 3,
                            "nível2": 4,
                            "nível3": 12
                        },
                        "aumFatu": {
                            "nível1": 0,
                            "nível2": 0,
                            "nível3": 0
                        }
                    },
                    {
                        "nome": "Restaurante",
                        "redCusto": {
                            "nível1": 1,
                            "nível2": 1,
                            "nível3": 3
                        },
                        "aumFatu": {
                            "nível1": 0,
                            "nível2": 0,
                            "nível3": 0
                        }
                    },
                    {
                        "nome": "Cafeteria",
                        "redCusto": {
                            "nível1": 3,
                            "nível2": 4,
                            "nível3": 10
                        },
                        "aumFatu": {
                            "nível1": 0,
                            "nível2": 0,
                            "nível3": 0
                        }
                    },
                    {
                        "nome": "Petshop",
                        "redCusto": {
                            "nível1": 8,
                            "nível2": 12,
                            "nível3": 25
                        },
                        "aumFatu": {
                            "nível1": 0,
                            "nível2": 0,
                            "nível3": 0
                        }
                    },
                    {
                        "nome": "Fábrica De Rações",
                        "redCusto": {
                            "nível1": 2,
                            "nível2": 3,
                            "nível3": 7
                        },
                        "aumFatu": {
                            "nível1": 0,
                            "nível2": 0,
                            "nível3": 0
                        }
                    },
                    {
                        "nome": "Refinaria De Biocombustíveis",
                        "redCusto": {
                            "nível1": 1,
                            "nível2": 1,
                            "nível3": 1
                        },
                        "aumFatu": {
                            "nível1": 0,
                            "nível2": 0,
                            "nível3": 0
                        }
                    },
                    {
                        "nome": "Centro De Coleta De Biomassa",
                        "redCusto": {
                            "nível1": 2,
                            "nível2": 3,
                            "nível3": 3
                        },
                        "aumFatu": {
                            "nível1": 0,
                            "nível2": 0,
                            "nível3": 0
                        }
                    },
                    {
                        "nome": "Feira",
                        "redCusto": {
                            "nível1": 1,
                            "nível2": 2,
                            "nível3": 4
                        },
                        "aumFatu": {
                            "nível1": 0,
                            "nível2": 0,
                            "nível3": 0
                        }
                    },
                    {
                        "nome": "Depósito De Resíduos Orgânicos",
                        "redCusto": {
                            "nível1": 2,
                            "nível2": 3,
                            "nível3": 4
                        },
                        "aumFatu": {
                            "nível1": 0,
                            "nível2": 0,
                            "nível3": 0
                        }
                    },
                    {
                        "nome": "Fábrica Textil",
                        "redCusto": {
                            "nível1": 1,
                            "nível2": 2,
                            "nível3": 3
                        },
                        "aumFatu": {
                            "nível1": 0,
                            "nível2": 0,
                            "nível3": 0
                        }
                    },
                    {
                        "nome": "Fábrica De Bebidas",
                        "redCusto": {
                            "nível1": 5,
                            "nível2": 7,
                            "nível3": 19
                        },
                        "aumFatu": {
                            "nível1": 0,
                            "nível2": 0,
                            "nível3": 0
                        }
                    },
                    {
                        "nome": "Biofábrica",
                        "redCusto": {
                            "nível1": 0,
                            "nível2": 0,
                            "nível3": 1
                        },
                        "aumFatu": {
                            "nível1": 0,
                            "nível2": 0,
                            "nível3": 0
                        }
                    },
                    {
                        "nome": "Mercado",
                        "redCusto": {
                            "nível1": 1,
                            "nível2": 1,
                            "nível3": 3
                        },
                        "aumFatu": {
                            "nível1": 0,
                            "nível2": 0,
                            "nível3": 0
                        }
                    }
                ],
                RecebeMelhoraEficiencia: [
                    {
                        "nome": "Fábrica De Fertilizantes",
                        "redCusto": {
                            "nível1": 1,
                            "nível2": 3,
                            "nível3": 6
                        },
                        "aumFatu": {
                            "nível1": 0,
                            "nível2": 0,
                            "nível3": 0
                        }
                    },
                    {
                        "nome": "Fazenda Administrativa",
                        "redCusto": {
                            "nível1": 0,
                            "nível2": 0,
                            "nível3": 0
                        },
                        "aumFatu": {
                            "nível1": 2,
                            "nível2": 5,
                            "nível3": 9
                        }
                    },
                    {
                        "nome": "Cooperativas Agrícolas",
                        "redCusto": {
                            "nível1": 0,
                            "nível2": 0,
                            "nível3": 0
                        },
                        "aumFatu": {
                            "nível1": 3,
                            "nível2": 7,
                            "nível3": 15
                        }
                    },
                    {
                        "nome": "Silo",
                        "redCusto": {
                            "nível1": 1,
                            "nível2": 1,
                            "nível3": 2
                        },
                        "aumFatu": {
                            "nível1": 0,
                            "nível2": 0,
                            "nível3": 0
                        }
                    },
                    {
                        "nome": "Armazém",
                        "redCusto": {
                            "nível1": 1,
                            "nível2": 2,
                            "nível3": 3
                        },
                        "aumFatu": {
                            "nível1": 0,
                            "nível2": 0,
                            "nível3": 0
                        }
                    },
                    {
                        "nome": "Centro De Comércio De Plantações",
                        "redCusto": {
                            "nível1": 0,
                            "nível2": 0,
                            "nível3": 0
                        },
                        "aumFatu": {
                            "nível1": 5,
                            "nível2": 15,
                            "nível3": 40
                        }
                    },
                    {
                        "nome": "Depósito De Resíduos Orgânicos",
                        "redCusto": {
                            "nível1": 1,
                            "nível2": 2,
                            "nível3": 4
                        },
                        "aumFatu": {
                            "nível1": 0,
                            "nível2": 0,
                            "nível3": 0
                        }
                    },
                    {
                        "nome": "Instituto De Tecnologia Alimentar",
                        "redCusto": {
                            "nível1": 0,
                            "nível2": 0,
                            "nível3": 0
                        },
                        "aumFatu": {
                            "nível1": 5,
                            "nível2": 17,
                            "nível3": 29
                        }
                    },
                    {
                        "nome": "Centro De Pesquisa Agrícola",
                        "redCusto": {
                            "nível1": 0,
                            "nível2": 0,
                            "nível3": 0
                        },
                        "aumFatu": {
                            "nível1": 2,
                            "nível2": 8,
                            "nível3": 12
                        }
                    },
                    {
                        "nome": "Instituto De Biotecnologia",
                        "redCusto": {
                            "nível1": 0,
                            "nível2": 0,
                            "nível3": 0
                        },
                        "aumFatu": {
                            "nível1": 3,
                            "nível2": 13,
                            "nível3": 25
                        }
                    },
                    {
                        "nome": "Terraplanagem e Pavimentação",
                        "redCusto": {
                            "nível1": 0,
                            "nível2": 0,
                            "nível3": 1
                        },
                        "aumFatu": {
                            "nível1": 0,
                            "nível2": 0,
                            "nível3": 0
                        }
                    },
                    {
                        "nome": "Armazém Logístico",
                        "redCusto": {
                            "nível1": 1,
                            "nível2": 2,
                            "nível3": 4
                        },
                        "aumFatu": {
                            "nível1": 0,
                            "nível2": 0,
                            "nível3": 0
                        }
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
                    nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
                    nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
                    nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },

                }
            },


            {
                nome: "Plantação De Vegetais",
                desc: "Elemento essencial do setor agrícola. Representa variedade e frescor.",
                licençaLiberado: {
                    licença: "Licença Global De Agricultura",
                    liberado: false,
                },
                custoConstrucao: 60000,
                quantidade: 0,
                finanças: {
                    faturamentoUnitário: 800,
                    impostoFixo: 1800,
                    impostoSobreFatu: 0.10000,
                    rent: 32
                },

                lojasNecessarias: {
                    terrenos: 1,
                    lojasP: 0,
                    lojasM: 0,
                    lojasG: 0,
                },
                construçõesNecessárias: ["Fazenda Administrativa", "Silo"],
                licençasNecessárias: [],
                melhoraEficiencia: [
                    "Mercado",
                    "Feira",
                    "Restaurante",
                    "Redes de Fast-Food",
                    "Petshop",
                ],

                ForneceMelhoraEficiencia: [
                    {
                        "nome": "Fábrica De Pães",
                        "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Restaurante",
                        "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Redes De Fast-Food",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 5 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Fábrica De Rações",
                        "redCusto": { "nível1": 2, "nível2": 3, "nível3": 6 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Cafeteria",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 2 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Centro De Coleta De Biomassa",
                        "redCusto": { "nível1": 2, "nível2": 3, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Feira",
                        "redCusto": { "nível1": 2, "nível2": 3, "nível3": 6 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Mercado",
                        "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Fábrica Textil",
                        "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Biofábrica",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Depósito De Resíduos Orgânicos",
                        "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    }
                ],
                RecebeMelhoraEficiencia: [
                    {
                        "nome": "Fábrica De Fertilizantes",
                        "redCusto": { "nível1": 1, "nível2": 3, "nível3": 6 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Fazenda Administrativa",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 2, "nível2": 5, "nível3": 9 }
                    },
                    {
                        "nome": "Cooperativas Agrícolas",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 3, "nível2": 7, "nível3": 15 }
                    },
                    {
                        "nome": "Silo",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Armazém",
                        "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Centro De Comércio De Plantações",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 5, "nível2": 18, "nível3": 40 }
                    },
                    {
                        "nome": "Depósito De Resíduos Orgânicos",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Instituto De Tecnologia Alimentar",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 4, "nível2": 14, "nível3": 29 }
                    },
                    {
                        "nome": "Centro De Pesquisa Agrícola",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 2, "nível2": 8, "nível3": 12 }
                    },
                    {
                        "nome": "Instituto De Biotecnologia",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 4, "nível2": 13, "nível3": 25 }
                    },
                    {
                        "nome": "Terraplanagem e Pavimentação",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Armazém Logístico",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    }
                ],

                recursoDeConstrução: []
                ,
                powerUp: {
                    redCustoAtual: 0,
                    aumFatuAtual: 0,
                    nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
                    nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
                    nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
                }
            },


            {
                nome: "Pomares",
                desc: "Diversifica a produção rural. Dá suporte à indústria e ao comércio local.",
                licençaLiberado: {
                    licença: "Licença Global De Agricultura",
                    liberado: false,
                },
                custoConstrucao: 40000,
                quantidade: 0,
                finanças: {
                    faturamentoUnitário: 1220,
                    impostoFixo: 3150,
                    impostoSobreFatu: 0.10000,
                    rent: 32
                },
                lojasNecessarias: {
                    terrenos: 2,
                    lojasP: 0,
                    lojasM: 0,
                    lojasG: 0,
                },
                construçõesNecessárias: ["Silo"],
                licençasNecessárias: [],
                melhoraEficiencia: [
                    "Mercado",
                    "Feira",
                    "Restaurante",
                    "Redes de Fast-Food",
                    "Fábrica de Bebidas",
                    "Usina de Biomassa",
                    "Refinaria de Biocombustíveis",
                ],

                ForneceMelhoraEficiencia: [
                    {
                        "nome": "Mercado",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Feira",
                        "redCusto": { "nível1": 2, "nível2": 3, "nível3": 6 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Restaurante",
                        "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Depósito De Resíduos Orgânicos",
                        "redCusto": { "nível1": 2, "nível2": 3, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Fábrica De Bebidas",
                        "redCusto": { "nível1": 3, "nível2": 4, "nível3": 5 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Centro De Coleta De Biomassa",
                        "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Refinaria De Biocombustíveis",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Fábrica De Rações",
                        "redCusto": { "nível1": 2, "nível2": 3, "nível3": 6 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Biofábrica",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    }
                ],
                RecebeMelhoraEficiencia: [
                    {
                        "nome": "Fábrica De Fertilizantes",
                        "redCusto": { "nível1": 1, "nível2": 3, "nível3": 6 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Fazenda Administrativa",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 2, "nível2": 5, "nível3": 9 }
                    },
                    {
                        "nome": "Cooperativas Agrícolas",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 3, "nível2": 7, "nível3": 15 }
                    },
                    {
                        "nome": "Silo",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Armazém",
                        "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Centro De Comércio De Plantações",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 5, "nível2": 12, "nível3": 40 }
                    },
                    {
                        "nome": "Depósito De Resíduos Orgânicos",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Instituto De Tecnologia Alimentar",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 2, "nível2": 14, "nível3": 16 }
                    },
                    {
                        "nome": "Centro De Pesquisa Agrícola",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 4, "nível2": 14, "nível3": 25 }
                    },
                    {
                        "nome": "Instituto De Biotecnologia",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 4, "nível2": 13, "nível3": 25 }
                    },
                    {
                        "nome": "Terraplanagem e Pavimentação",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Armazém Logístico",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    }
                ],

                RecebeMelhoraEficiencia: [
                    {
                        nome: "Fábrica de Fertilizantes",
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
                        nome: "Fazenda Administrativa",
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
                        nome: "Cooperativas agrícolas",
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
                        nome: "Silo",
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
                        nome: "Armazém",
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
                powerUp: {
                    redCustoAtual: 0,
                    aumFatuAtual: 0,
                    nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
                    nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
                    nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
                }
            },


            {
                nome: "Fazenda Administrativa",
                desc: "Organiza e valoriza o setor rural. Aumenta a eficiência das plantações.",
                licençaLiberado: {
                    licença: "Licença Global De Agricultura",
                    liberado: true,
                },
                custoConstrucao: 70000,
                quantidade: 0,
                finanças: {
                    faturamentoUnitário: 200,
                    impostoFixo: 25000,
                    impostoSobreFatu: 0.02000,
                    rent: 32
                },

                lojasNecessarias: {
                    terrenos: 1,
                    lojasP: 1,
                    lojasM: 0,
                    lojasG: 0,
                },
                construçõesNecessárias: [],
                licençasNecessárias: [],

                ForneceMelhoraEficiencia: [
                    {
                        "nome": "Plantação De Grãos",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 2, "nível2": 5, "nível3": 9 }
                    },
                    {
                        "nome": "Plantação De Vegetais",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 2, "nível2": 5, "nível3": 9 }
                    },
                    {
                        "nome": "Pomares",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 2, "nível2": 5, "nível3": 9 }
                    },
                    {
                        "nome": "Fazenda De Vacas",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 7 }
                    },
                    {
                        "nome": "Granja De Aves",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 7 }
                    },
                    {
                        "nome": "Criação De Ovinos",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 7 }
                    },
                    {
                        "nome": "Plantação De Eucalipto",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 10, "nível2": 15, "nível3": 30 }
                    },
                    {
                        "nome": "Plantação De Plantas Medicinais",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 3, "nível2": 7, "nível3": 15 }
                    },
                    {
                        "nome": "Cooperativas Agrícolas",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 50 }
                    },
                    {
                        "nome": "Centro De Comércio De Plantações",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 50 }
                    },
                    {
                        "nome": "Depósito De Resíduos Orgânicos",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 5, "nível2": 10, "nível3": 16 }
                    },
                    {
                        "nome": "Madeireira",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 10, "nível2": 13, "nível3": 17 }
                    },
                    {
                        "nome": "Área Florestal",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 7, "nível2": 15, "nível3": 30 }
                    },
                    {
                        "nome": "Terreno De Mineração",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 10, "nível2": 20, "nível3": 30 }
                    }
                ],
                RecebeMelhoraEficiencia: [
                    {
                        "nome": "Construtora De Pequenas Obras",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                ],
                recursoDeConstrução: [],
                melhoraEficiencia: [
                    "Plantação De Grãos",
                    "Plantação De Vegetais",
                    "Pomares",
                    "Fazenda De Vacas",
                    "Granja De Aves",
                    "Criação De Ovinos",
                ]
                ,
                powerUp: {
                    redCustoAtual: 0,
                    aumFatuAtual: 0,
                    nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
                    nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
                    nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
                }
            },


            {
                nome: "Cooperativa Agrícola",
                desc: "Conecta pequenos produtores. Melhora o valor das construções agrícolas.",
                licençaLiberado: {
                    licença: "Licença De Comércios Agrícolas",
                    liberado: false,
                },
                custoConstrucao: 1150000,
                quantidade: 0,
                finanças: {
                    faturamentoUnitário: 75000,
                    impostoFixo: 1300000,
                    impostoSobreFatu: 0.10000,
                    rent: 25
                },

                lojasNecessarias: {
                    terrenos: 5,
                    lojasP: 1,
                    lojasM: 1,
                    lojasG: 1,
                },
                construçõesNecessárias: ["Plantação De Grãos", "Plantação De Vegetais", "Pomares"],
                licençasNecessárias: [],
                melhoraEficiencia: [
                    "Mercado",
                    "Feira",
                    "Restaurante",
                    "Redes de Fast-Food",
                    "Petshop",
                ],

                ForneceMelhoraEficiencia: [
                    {
                        "nome": "Plantação De Grãos",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 3, "nível2": 7, "nível3": 15 }
                    },
                    {
                        "nome": "Plantação De Vegetais",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 3, "nível2": 7, "nível3": 15 }
                    },
                    {
                        "nome": "Pomares",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 3, "nível2": 7, "nível3": 15 }
                    },
                    {
                        "nome": "Fazenda De Vacas",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 12, "nível2": 14, "nível3": 28 }
                    },
                    {
                        "nome": "Granja De Aves",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 12, "nível2": 14, "nível3": 28 }
                    },
                    {
                        "nome": "Criação De Ovinos",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 12, "nível2": 14, "nível3": 28 }
                    },
                    {
                        "nome": "Plantações De Eucalipto",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 3, "nível2": 7, "nível3": 15 }
                    },
                    {
                        "nome": "Plantação De Plantas Medicinais",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 3, "nível2": 8, "nível3": 18 }
                    },
                    {
                        "nome": "Supermercado",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 8, "nível2": 10, "nível3": 12 }
                    },
                    {
                        "nome": "Mega Mercado",
                        "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Madeireira",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 20, "nível2": 27, "nível3": 33 }
                    }
                ],
                RecebeMelhoraEficiencia: [
                    {
                        "nome": "Centro De Distribuição",
                        "redCusto": { "nível1": 8, "nível2": 11, "nível3": 23 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Fazenda Administrativa",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 50 }
                    },
                    {
                        "nome": "Construtora De Grandes Infraestruturas",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Armazém",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Silo",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    }
                ],

                recursoDeConstrução: ["Armazém", "Silo", "Fazenda Administrativa", "Centro De Comércio De Plantações"],

                powerUp: {
                    redCustoAtual: 0,
                    aumFatuAtual: 0,
                    nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
                    nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
                    nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
                }
            },


            {
                nome: "Centro De Comércio De Plantações",
                desc: "Representa o escoamento da produção. Aumenta o valor do setor agrícola.",
                licençaLiberado: {
                    licença: "Licença De Comércios Agrícolas",
                    liberado: false,
                },
                custoConstrucao: 900000,
                quantidade: 0,
                finanças: {
                    faturamentoUnitário: 25000,
                    impostoFixo: 170000,
                    impostoSobreFatu: 0.10000,
                    rent: 28
                },

                lojasNecessarias: {
                    terrenos: 5,
                    lojasP: 3,
                    lojasM: 1,
                    lojasG: 1,
                },
                construçõesNecessárias: [],
                licençasNecessárias: [],
                melhoraEficiencia: [
                    "Plantação De Grãos",
                    "Pomares",
                    "Fazenda De Vacas",
                    "Granja De Aves",
                    "Criação De Ovinos",
                    "Plantação De Eucalipto",
                    "Plantação De Plantas Medicinais",
                    "Mercado",
                    "Feira",
                    "Fábrica de Ração",
                    "Restaurante",
                    "Usina de Biomassa",
                ],

                ForneceMelhoraEficiencia: [
                    {
                        "nome": "Plantação De Grãos",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 5, "nível2": 15, "nível3": 40 }
                    },
                    {
                        "nome": "Plantação De Vegetais",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 5, "nível2": 18, "nível3": 40 }
                    },
                    {
                        "nome": "Pomares",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 5, "nível2": 12, "nível3": 40 }
                    },
                    {
                        "nome": "Restaurante",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 12, "nível2": 15, "nível3": 20 }
                    },
                    {
                        "nome": "Plantações De Eucalipto",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 15, "nível2": 21, "nível3": 35 }
                    },
                    {
                        "nome": "Plantação De Plantas Medicinais",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 15, "nível2": 17, "nível3": 35 }
                    },
                    {
                        "nome": "Supermercado",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 10, "nível2": 12, "nível3": 14 }
                    },
                    {
                        "nome": "Mega Mercado",
                        "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    }
                ],
                RecebeMelhoraEficiencia: [
                    {
                        "nome": "Fábrica De Embalagens",
                        "redCusto": { "nível1": 3, "nível2": 5, "nível3": 10 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Centro De Distribuição",
                        "redCusto": { "nível1": 5, "nível2": 6, "nível3": 13 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Fazenda Administrativa",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 50 }
                    },
                    {
                        "nome": "Construtora",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Armazém",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Silo",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Plantações De Eucalipto",
                        "redCusto": { "nível1": 30, "nível2": 45, "nível3": 90 },
                        "aumFatu": { "nível1": 90, "nível2": 120, "nível3": 150 }
                    },
                    {
                        "nome": "Plantação De Plantas Medicinais",
                        "redCusto": { "nível1": 10, "nível2": 15, "nível3": 30 },
                        "aumFatu": { "nível1": 30, "nível2": 40, "nível3": 50 }
                    }
                ],

                recursoDeConstrução: ["Armazém", "Silo", "Fazenda Administrativa", "Plantação De Grãos"]
                ,
                powerUp: {
                    redCustoAtual: 0,
                    aumFatuAtual: 0,
                    nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
                    nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
                    nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
                }
            },





            {
                nome: "Armazém",
                desc: "Espaço de armazenamento geral. Dá suporte a múltiplos setores produtivos.",
                licençaLiberado: {
                    licença: "Licença De Armazenamentos Agrícolas",
                    liberado: false,
                },
                custoConstrucao: 0,
                quantidade: 0,
                finanças: {
                    faturamentoUnitário: 300,
                    impostoFixo: 14000,
                    impostoSobreFatu: 0.05000,
                    rent: 1
                },

                lojasNecessarias: {
                    terrenos: 0,
                    lojasP: 1,
                    lojasM: 0,
                    lojasG: 0,
                },
                construçõesNecessárias: [],
                licençasNecessárias: [],
                melhoraEficiencia: [
                    "Plantação De Grãos",
                    "Pomares",
                    "Fazenda De Vacas",
                    "Granja De Aves",
                    "Criação De Ovinos",
                    "Plantação De Eucalipto",
                    "Plantação De Plantas Medicinais",
                    "Mercado",
                    "Feira",
                    "Fábrica de Ração",
                    "Restaurante",
                    "Usina de Biomassa",
                ],

                ForneceMelhoraEficiencia: [
                    {
                        "nome": "Plantação De Plantas Medicinais",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Centro De Comércio De Plantações",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Cooperativas Agrícolas",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
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
                        "nome": "Pomares",
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
                        "nome": "Armazém Logístico",
                        "redCusto": { "nível1": 20, "nível2": 30, "nível3": 39 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    }
                ],

                recursoDeConstrução: []
                ,
                powerUp: {
                    redCustoAtual: 0,
                    aumFatuAtual: 0,
                    nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
                    nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
                    nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
                }
            },


            {
                nome: "Silo",
                desc: "Armazena grãos. Aumenta a eficiência e o valor das plantações ao redor.",
                licençaLiberado: {
                    licença: "Licença De Armazenamentos Agrícolas",
                    liberado: false,
                },
                custoConstrucao: 40000,
                quantidade: 0,
                finanças: {
                    faturamentoUnitário: 390,
                    impostoFixo: 12000,
                    impostoSobreFatu: 0.05000,
                    rent: 1
                },

                lojasNecessarias: {
                    terrenos: 1,
                    lojasP: 1,
                    lojasM: 0,
                    lojasG: 0,
                },
                construçõesNecessárias: [],
                licençasNecessárias: [],
                melhoraEficiencia: [
                    "Cooperativa Agrícola",
                    "Fábrica De Ração",
                    "Usina De Biomassa",
                    "Refinaria De Biocombustíveis",
                ],

                ForneceMelhoraEficiencia: [
                    {
                        "nome": "Centro De Comércio De Plantações",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Cooperativas Agrícolas",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Plantação De Grãos",
                        "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Plantação De Vegetais",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Pomares",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Plantação De Plantas Medicinais",
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
                        "nome": "Armazém Logístico",
                        "redCusto": { "nível1": 20, "nível2": 30, "nível3": 39 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    }
                ],

                recursoDeConstrução: []
                ,
                powerUp: {
                    redCustoAtual: 0,
                    aumFatuAtual: 0,
                    nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
                    nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
                    nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
                }
            },


            {
                nome: "Depósito De Resíduos Orgânicos",
                desc: "Processa sobras naturais. Melhora a rentabilidade de fazendas e plantações.",
                licençaLiberado: {
                    licença: "Licença De Armazenamentos Agrícolas",
                    liberado: false,
                },
                custoConstrucao: 40000,
                quantidade: 0,
                finanças: {
                    faturamentoUnitário: 180,
                    impostoFixo: 2000,
                    impostoSobreFatu: 0.05000,
                    rent: 1
                },

                lojasNecessarias: {
                    terrenos: 2,
                    lojasP: 0,
                    lojasM: 0,
                    lojasG: 0,
                },
                construçõesNecessárias: ["Silo"],
                licençasNecessárias: [],
                melhoraEficiencia: [
                    "Usina de Biomassa",
                    "Refinaria de Biocombustíveis",
                    "Fábrica de Fertilizantes",
                ],

                ForneceMelhoraEficiencia: [
                    {
                        "nome": "Fábrica De Fertilizantes",
                        "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
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
                        "nome": "Plantações De Eucalipto",
                        "redCusto": { "nível1": 2, "nível2": 3, "nível3": 6 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Plantação De Plantas Medicinais",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Usina Termelétrica Movida a Biocombustíveis",
                        "redCusto": { "nível1": 2, "nível2": 4, "nível3": 5 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Centro De Coleta De Biomassa",
                        "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Biofábrica",
                        "redCusto": { "nível1": 1, "nível2": 1, "nível3": 0 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    }
                ],
                RecebeMelhoraEficiencia: [
                    {
                        "nome": "Plantação De Grãos",
                        "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Plantação De Vegetais",
                        "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Pomares",
                        "redCusto": { "nível1": 2, "nível2": 3, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Fazenda De Vacas",
                        "redCusto": { "nível1": 5, "nível2": 7, "nível3": 9 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Granja De Aves",
                        "redCusto": { "nível1": 3, "nível2": 4, "nível3": 5 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Criação De Ovinos",
                        "redCusto": { "nível1": 3, "nível2": 4, "nível3": 5 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Plantações De Eucalipto",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Plantação De Plantas Medicinais",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 2 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Fazenda Administrativa",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 5, "nível2": 10, "nível3": 16 }
                    },
                    {
                        "nome": "Centro De Pesquisa Química",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 25, "nível2": 35, "nível3": 80 }
                    },
                    {
                        "nome": "Centro De Pesquisa Agrícola",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 20, "nível2": 25, "nível3": 54 }
                    },
                    {
                        "nome": "Construtora De Pequenas Obras",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Armazém Logístico",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    }
                ],

                recursoDeConstrução: []
                ,
                powerUp: {
                    redCustoAtual: 0,
                    aumFatuAtual: 0,
                    nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
                    nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
                    nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
                }
            },


            {
                nome: "Fazenda De Vacas",
                desc: "Produção animal de grande porte. Suporte para indústrias e comércios.",
                licençaLiberado: {
                    licença: "Licença De Fazendas De Animais",
                    liberado: false,
                },
                custoConstrucao: 100000,
                quantidade: 0,
                finanças: {
                    faturamentoUnitário: 5000,
                    impostoFixo: 37000,
                    impostoSobreFatu: 0.10000,
                    rent: 32
                },

                lojasNecessarias: {
                    terrenos: 3,
                    lojasP: 0,
                    lojasM: 1,
                    lojasG: 0,
                },
                construçõesNecessárias: ["Armazém"],
                licençasNecessárias: [],
                melhoraEficiencia: [
                    "Mercado",
                    "Açougue",
                    "Feira",
                    "Restaurante",
                    "Redes de Fast-Food",
                    "Padaria",
                    "Fábrica De Pães",
                    "Usina de Biomassa",
                    "Fábrica de Fertilizantes",
                ],

                ForneceMelhoraEficiencia: [
                    {
                        "nome": "Mercado",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Açougue",
                        "redCusto": { "nível1": 4, "nível2": 5, "nível3": 11 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Feira",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Depósito De Resíduos Orgânicos",
                        "redCusto": { "nível1": 5, "nível2": 7, "nível3": 9 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Fábrica De Pães",
                        "redCusto": { "nível1": 2, "nível2": 3, "nível3": 5 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Centro De Coleta De Biomassa",
                        "redCusto": { "nível1": 4, "nível2": 6, "nível3": 8 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Fábrica De Fertilizantes",
                        "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Fábrica De Calçados",
                        "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Fábrica De Roupas",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Cafeteria",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Biofábrica",
                        "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    }
                ],
                RecebeMelhoraEficiencia: [
                    {
                        "nome": "Fazenda Administrativa",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 7 }
                    },
                    {
                        "nome": "Fábrica De Rações",
                        "redCusto": { "nível1": 12, "nível2": 18, "nível3": 22 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Cooperativas Agrícolas",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 12, "nível2": 14, "nível3": 28 }
                    },
                    {
                        "nome": "Fábrica De Fertilizantes",
                        "redCusto": { "nível1": 8, "nível2": 11, "nível3": 16 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Centro De Pesquisa Agrícola",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 7, "nível2": 12, "nível3": 25 }
                    },
                    {
                        "nome": "Instituto De Biotecnologia",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 8, "nível2": 15, "nível3": 30 }
                    },
                    {
                        "nome": "Instituto De Tecnologia Alimentar",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 20, "nível2": 25, "nível3": 60 }
                    },
                    {
                        "nome": "Construtora De Pequenas Obras",
                        "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    }
                ],

                recursoDeConstrução: []
                ,
                powerUp: {
                    redCustoAtual: 0,
                    aumFatuAtual: 0,
                    nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
                    nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
                    nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
                }
            },


            {
                nome: "Granja De Aves",
                desc: "Produção rápida e leve. Base para setores alimentares e de exportação.",
                licençaLiberado: {
                    licença: "Licença De Fazendas De Animais",
                    liberado: false,
                },
                custoConstrucao: 70000,
                quantidade: 0,
                finanças: {
                    faturamentoUnitário: 2800,
                    impostoFixo: 30000,
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
                licençasNecessárias: [],
                melhoraEficiencia: [
                    "Mercado",
                    "Açougue",
                    "Feira",
                    "Restaurante",
                    "Redes De Fast-Food",
                    "Fábrica De Ração",
                    "Petshop",
                    "Usina de Biomassa",
                ],

                ForneceMelhoraEficiencia: [
                    {
                        "nome": "Mercado",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Açougue",
                        "redCusto": { "nível1": 4, "nível2": 5, "nível3": 11 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Feira",
                        "redCusto": { "nível1": 2, "nível2": 2, "nível3": 4 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Depósito De Resíduos Orgânicos",
                        "redCusto": { "nível1": 3, "nível2": 4, "nível3": 5 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Fábrica Textil",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Centro De Coleta De Biomassa",
                        "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Fábrica De Pães",
                        "redCusto": { "nível1": 2, "nível2": 3, "nível3": 5 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Biofábrica",
                        "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Cafeteria",
                        "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    }
                ],
                RecebeMelhoraEficiencia: [
                    {
                        "nome": "Fazenda Administrativa",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 7 }
                    },
                    {
                        "nome": "Fábrica De Rações",
                        "redCusto": { "nível1": 12, "nível2": 18, "nível3": 22 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Cooperativas Agrícolas",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 12, "nível2": 14, "nível3": 28 }
                    },
                    {
                        "nome": "Fábrica De Fertilizantes",
                        "redCusto": { "nível1": 8, "nível2": 12, "nível3": 17 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Centro De Pesquisa Agrícola",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 7, "nível2": 12, "nível3": 25 }
                    },
                    {
                        "nome": "Instituto De Biotecnologia",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 20, "nível2": 25, "nível3": 60 }
                    },
                    {
                        "nome": "Instituto De Tecnologia Alimentar",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 8, "nível2": 15, "nível3": 30 }
                    },
                    {
                        "nome": "Construtora De Pequenas Obras",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    }
                ],
                RecebeMelhoraEficiencia: [
                    {
                        nome: "Fazenda Administrativa",
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
                        nome: "Fábrica de Ração",
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
                powerUp: {
                    redCustoAtual: 0,
                    aumFatuAtual: 0,
                    nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
                    nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
                    nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
                }
            },


            {
                nome: "Criação De Ovinos",
                desc: "Fonte de carne e lã. Conecta o campo à indústria têxtil e alimentícia.",
                licençaLiberado: {
                    licença: "Licença De Fazendas De Animais",
                    liberado: false,
                },
                custoConstrucao: 30000,
                quantidade: 0,
                finanças: {
                    faturamentoUnitário: 1750,
                    impostoFixo: 4000,
                    impostoSobreFatu: 0.10000,
                    rent: 34
                },

                lojasNecessarias: {
                    terrenos: 2,
                    lojasP: 1,
                    lojasM: 0,
                    lojasG: 0,
                },
                construçõesNecessárias: ["Armazém"],
                licençasNecessárias: [],
                melhoraEficiencia: [
                    "Mercado",
                    "Açougue",
                    "Feira",
                    "Restaurante",
                    "Redes de Fast-Food",
                    "Fábrica de Ração",
                    "Petshop",
                    "Usina de Biomassa",
                ],

                ForneceMelhoraEficiencia: [
                    {
                        "nome": "Depósito De Resíduos Orgânicos",
                        "redCusto": { "nível1": 3, "nível2": 4, "nível3": 5 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Centro De Coleta De Biomassa",
                        "redCusto": { "nível1": 2, "nível2": 3, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Fábrica Textil",
                        "redCusto": { "nível1": 2, "nível2": 2, "nível3": 5 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Fábrica De Calçados",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Fábrica De Roupas",
                        "redCusto": { "nível1": 2, "nível2": 3, "nível3": 6 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Biofábrica",
                        "redCusto": { "nível1": 0, "nível2": 1, "nível3": 0 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Açougue",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    }
                ],
                RecebeMelhoraEficiencia: [
                    {
                        "nome": "Fazenda Administrativa",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 3, "nível2": 4, "nível3": 7 }
                    },
                    {
                        "nome": "Fábrica De Rações",
                        "redCusto": { "nível1": 12, "nível2": 18, "nível3": 22 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Cooperativas Agrícolas",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 12, "nível2": 14, "nível3": 28 }
                    },
                    {
                        "nome": "Fábrica De Fertilizantes",
                        "redCusto": { "nível1": 8, "nível2": 12, "nível3": 17 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Centro De Pesquisa Agrícola",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 8, "nível2": 15, "nível3": 30 }
                    },
                    {
                        "nome": "Instituto De Biotecnologia",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 20, "nível2": 25, "nível3": 60 }
                    },
                    {
                        "nome": "Instituto De Tecnologia Alimentar",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 7, "nível2": 12, "nível3": 25 }
                    },
                    {
                        "nome": "Construtora De Pequenas Obras",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    }
                ],

                recursoDeConstrução: []
                ,
                powerUp: {
                    redCustoAtual: 0,
                    aumFatuAtual: 0,
                    nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
                    nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
                    nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
                }
            },


            {
                nome: "Madeireira",
                desc: "Transforma madeira em insumo. Essencial para fábricas e construção.",
                licençaLiberado: {
                    licença: "Licença De Áreas Especiais",
                    liberado: false,
                },
                custoConstrucao: 100000,
                quantidade: 0,
                finanças: {
                    faturamentoUnitário: 4200,
                    impostoFixo: 55000,
                    impostoSobreFatu: 0.10000,
                    rent: 32
                },

                lojasNecessarias: {
                    terrenos: 3,
                    lojasP: 0,
                    lojasM: 1,
                    lojasG: 0,
                },
                construçõesNecessárias: [],
                licençasNecessárias: [],
                melhoraEficiencia: [
                    "Fábrica de Móveis",
                    "Fábrica de Celulose",
                    "Fábrica de Estruturas Metálicas",
                    "Fábrica de Embalagens",
                ],

                ForneceMelhoraEficiencia: [
                    {
                        "nome": "Fábrica De Móveis",
                        "redCusto": { "nível1": 7, "nível2": 9, "nível3": 18 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Fábrica De Celulose",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    }
                ],
                RecebeMelhoraEficiencia: [
                    {
                        "nome": "Área Florestal",
                        "redCusto": { "nível1": 7, "nível2": 9, "nível3": 18 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Fazenda Administrativa",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 10, "nível2": 13, "nível3": 17 }
                    },
                    {
                        "nome": "Cooperativas Agrícolas",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 20, "nível2": 27, "nível3": 33 }
                    },
                    {
                        "nome": "Plantações De Eucalipto",
                        "redCusto": { "nível1": 3, "nível2": 5, "nível3": 10 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Construtora De Pequenas Obras",
                        "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    }
                ],

                recursoDeConstrução: []
                ,
                powerUp: {
                    redCustoAtual: 0,
                    aumFatuAtual: 0,
                    nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
                    nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
                    nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
                }
            },


            {
                nome: "Área Florestal",
                desc: "Fonte sustentável de madeira. Suporte contínuo para a produção.",
                licençaLiberado: {
                    licença: "Licença De Áreas Especiais",
                    liberado: false,
                },
                custoConstrucao: 40000,
                quantidade: 0,
                finanças: {
                    faturamentoUnitário: 2200,
                    impostoFixo: 11000,
                    impostoSobreFatu: 0.10000,
                    rent: 28
                },

                lojasNecessarias: {
                    terrenos: 4,
                    lojasP: 0,
                    lojasM: 0,
                    lojasG: 0,
                },
                construçõesNecessárias: [],
                licençasNecessárias: [],
                melhoraEficiencia: [
                    "Madeireira",
                    "Plantação De Eucalipto",
                    "Plantação De Plantas Medicinais",
                ],

                ForneceMelhoraEficiencia: [
                    {
                        "nome": "Fábrica De Celulose",
                        "redCusto": { "nível1": 2, "nível2": 3, "nível3": 4 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Madeireira",
                        "redCusto": { "nível1": 7, "nível2": 9, "nível3": 18 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    }
                ],
                RecebeMelhoraEficiencia: [
                    {
                        "nome": "Terraplanagem E Pavimentação",
                        "redCusto": { "nível1": 3, "nível2": 5, "nível3": 12 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Fazenda Administrativa",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 7, "nível2": 15, "nível3": 30 }
                    },
                    {
                        "nome": "Fábrica De Fertilizante",
                        "redCusto": { "nível1": 1, "nível2": 3, "nível3": 5 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Centro De Pesquisa Agrícola",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 28, "nível2": 35, "nível3": 80 }
                    },
                    {
                        "nome": "Instituto De Biotecnologia",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 15, "nível2": 20, "nível3": 40 }
                    }
                ],

                recursoDeConstrução: []
                ,
                powerUp: {
                    redCustoAtual: 0,
                    aumFatuAtual: 0,
                    nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
                    nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
                    nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
                }
            },


            {
                nome: "Terreno De Mineração",
                desc: "Origem de minérios. Base essencial para fábricas e tecnologias.",
                licençaLiberado: {
                    licença: "Licença De Áreas Especiais",
                    liberado: false,
                },
                custoConstrucao: 400000,
                quantidade: 0,
                finanças: {
                    faturamentoUnitário: 12000,
                    impostoFixo: 140000,
                    impostoSobreFatu: 0.10000,
                    rent: 23
                },

                lojasNecessarias: {
                    terrenos: 10,
                    lojasP: 0,
                    lojasM: 0,
                    lojasG: 0,
                },
                construçõesNecessárias: [],
                licençasNecessárias: [],
                melhoraEficiencia: [
                    "Mineradora",
                    "Mineradora De Pedras Preciosas",
                    "Mineradora Radioativa",
                    "Alto-Forno",
                ],

                ForneceMelhoraEficiencia: [
                    {
                        "nome": "Mineradora",
                        "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Mineradora De Pedras Preciosas",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 2 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Mineradora De Minérios Radioativos",
                        "redCusto": { "nível1": 1, "nível2": 1, "nível3": 0 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Alto-Forno",
                        "redCusto": { "nível1": 2, "nível2": 2, "nível3": 4 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    }
                ],
                RecebeMelhoraEficiencia: [
                    {
                        "nome": "Fazenda Administrativa",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 10, "nível2": 20, "nível3": 30 }
                    },
                    {
                        "nome": "Consultoria Em Engenharia Civil",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 40, "nível2": 50, "nível3": 120 }
                    },
                    {
                        "nome": "Terraplanagem E Pavimentação",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    }
                ],

                recursoDeConstrução: []
                ,
                powerUp: {
                    redCustoAtual: 0,
                    aumFatuAtual: 0,
                    nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
                    nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
                    nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
                }
            },


            {
                nome: "Plantação De Eucalipto",
                desc: "Produção rápida de madeira. Dá suporte a serrarias e papelarias.",
                licençaLiberado: {
                    licença: "Licença De Outras Plantações",
                    liberado: false,
                },
                custoConstrucao: 20000,
                quantidade: 0,
                finanças: {
                    faturamentoUnitário: 1300,
                    impostoFixo: 4000,
                    impostoSobreFatu: 0.10000,
                    rent: 29
                },

                lojasNecessarias: {
                    terrenos: 3,
                    lojasP: 0,
                    lojasM: 0,
                    lojasG: 0,
                },
                construçõesNecessárias: [],
                licençasNecessárias: [],
                melhoraEficiencia: [
                    "Fábrica de Celulose",
                    "Madeireira",
                    "Fábrica de Papel",
                    "Granja De Aves",
                    "Criação De Ovinos",
                    "Plantação De Eucalipto",
                    "Plantação De Plantas Medicinais",
                    "Mercado",
                    "Feira",
                    "Fábrica de Ração",
                    "Restaurante",
                    "Usina de Biomassa",
                ],

                ForneceMelhoraEficiencia: [
                    {
                        "nome": "Depósito De Resíduos Orgânicos",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Fábrica De Celulose",
                        "redCusto": { "nível1": 3, "nível2": 4, "nível3": 8 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Madeireira",
                        "redCusto": { "nível1": 3, "nível2": 5, "nível3": 10 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Fábrica Textil",
                        "redCusto": { "nível1": 2, "nível2": 2, "nível3": 4 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Biofábrica",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    }
                ],
                RecebeMelhoraEficiencia: [
                    {
                        "nome": "Fazenda Administrativa",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 10, "nível2": 15, "nível3": 30 }
                    },
                    {
                        "nome": "Fábrica De Fertilizantes",
                        "redCusto": { "nível1": 1, "nível2": 4, "nível3": 10 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Centro De Pesquisa Agrícola",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 12, "nível2": 15, "nível3": 25 }
                    },
                    {
                        "nome": "Instituto De Biotecnologia",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 10, "nível2": 12, "nível3": 45 }
                    },
                    {
                        "nome": "Terraplanagem E Pavimentação",
                        "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Armazém Logístico",
                        "redCusto": { "nível1": 2, "nível2": 2, "nível3": 2 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Cooperativas Agrícolas",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 3, "nível2": 7, "nível3": 15 }
                    },
                    {
                        "nome": "Centro De Comércio De Plantações",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 15, "nível2": 21, "nível3": 35 }
                    },
                    {
                        "nome": "Depósito De Resíduos Orgânicos",
                        "redCusto": { "nível1": 2, "nível2": 3, "nível3": 6 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    }
                ],

                recursoDeConstrução: []
                ,
                powerUp: {
                    redCustoAtual: 0,
                    aumFatuAtual: 0,
                    nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
                    nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
                    nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
                }
            },


            {
                nome: "Plantação De Plantas Medicinais",
                desc: "Fornece insumos raros. Suporte direto para a indústria farmacêutica.",
                licençaLiberado: {
                    licença: "Licença De Outras Plantações",
                    liberado: false,
                },
                custoConstrucao: 100000,
                quantidade: 0,
                finanças: {
                    faturamentoUnitário: 3400,
                    impostoFixo: 16000,
                    impostoSobreFatu: 0.10000,
                    rent: 27
                },

                lojasNecessarias: {
                    terrenos: 5,
                    lojasP: 0,
                    lojasM: 0,
                    lojasG: 0,
                },
                construçõesNecessárias: [],
                licençasNecessárias: [],
                melhoraEficiencia: [
                    "Fábrica De Produtos Químicos Especializados",
                    "Farmácia",
                ],

                ForneceMelhoraEficiencia: [
                    {
                        "nome": "Fábrica De Químicos Especializados",
                        "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Laboratório Farmacêutico",
                        "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Fábrica De Medicamentos",
                        "redCusto": { "nível1": 2, "nível2": 3, "nível3": 5 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Fábrica De Fertilizantes",
                        "redCusto": { "nível1": 1, "nível2": 1, "nível3": 1 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Biofábrica",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 1 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Depósito De Resíduos Orgânicos",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 2 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    }
                ],
                RecebeMelhoraEficiencia: [
                    {
                        "nome": "Fábrica De Fertilizantes",
                        "redCusto": { "nível1": 1, "nível2": 3, "nível3": 6 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Fazenda Administrativa",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 3, "nível2": 7, "nível3": 15 }
                    },
                    {
                        "nome": "Cooperativas Agrícolas",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 3, "nível2": 8, "nível3": 18 }
                    },
                    {
                        "nome": "Silo",
                        "redCusto": { "nível1": 1, "nível2": 1, "nível3": 2 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Armazém",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Centro De Comércio De Plantações",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 15, "nível2": 17, "nível3": 35 }
                    },
                    {
                        "nome": "Depósito De Resíduos Orgânicos",
                        "redCusto": { "nível1": 1, "nível2": 2, "nível3": 4 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Centro De Pesquisa Agrícola",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 8, "nível2": 13, "nível3": 32 }
                    },
                    {
                        "nome": "Instituto De Biotecnologia",
                        "redCusto": { "nível1": 0, "nível2": 0, "nível3": 0 },
                        "aumFatu": { "nível1": 21, "nível2": 25, "nível3": 50 }
                    },
                    {
                        "nome": "Terraplanagem E Pavimentação",
                        "redCusto": { "nível1": 0, "nível2": 1, "nível3": 2 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    },
                    {
                        "nome": "Armazém Logístico",
                        "redCusto": { "nível1": 1, "nível2": 1, "nível3": 3 },
                        "aumFatu": { "nível1": 0, "nível2": 0, "nível3": 0 }
                    }
                ],

                recursoDeConstrução: []
                ,
                powerUp: {
                    redCustoAtual: 0,
                    aumFatuAtual: 0,
                    nível1: { status: true, quantidadeMínima: 1, redCusto: 2, aumFatu: 3 },
                    nível2: { status: true, quantidadeMínima: 3, redCusto: 4, aumFatu: 2 },
                    nível3: { status: true, quantidadeMínima: 7, redCusto: 3, aumFatu: 1 },
                }
            },
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
    <AgriculturaContext.Provider value={{ dadosAgricultura,setDadosAgricultura, atualizarDados, atualizarDadosProf, atualizarDadosProf2, atualizarDadosProf3, atualizarDadosVariados }}>
      {children}
    </AgriculturaContext.Provider>
  );
};



export const useAgricultura = () => useContext(AgriculturaContext);