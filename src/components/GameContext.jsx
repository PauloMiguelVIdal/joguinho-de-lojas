import { createContext, useContext, useMemo, useEffect, useState, useRef } from "react";
import { productsCatalog, getMarketPrice } from "../components/TablePrice";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { FORMULAS_EDIFICIOS } from "./productionFormulasConfig";
import { generateSalesContracts } from "./salesContractsConfig";
import { marketPrices } from "./TablePrice";
import { CentraldeDadosContext } from "../centralDeDadosContext";

const GameContext = createContext();

export function GameProvider({ children }) {
    const liquidadoRefPersist = useRef(0);

    // Dentro do GameProvider, adicione:
    const { dados } = useContext(CentraldeDadosContext);
    const { economiaSetores, setEconomiaSetores, atualizarEco } = useContext(
        DadosEconomyGlobalContext
    );


    /* =========================
       SISTEMA DE CONTRATOS
    ========================= */

    const [pendingSettlements, setPendingSettlements] = useState([]);

    const [productionQueue, setProductionQueue] = useState([]);
    const [sellQueue, setSellQueue] = useState([]);

    const [salesContracts, setSalesContracts] = useState({});
    const [contratosEdificios, setContratosEdificios] = useState({});

    function getOuGerarContratos(edificioConfig, diaAtual, buildingCount = 1, level = 1) {
        const id = edificioConfig.edificioId;
        const existente = contratosEdificios[id];

        if (existente && diaAtual < existente.validadeAte) {
            return existente.contratos;
        }

        // marketPrices já é o objeto correto importado do TablePrice
        const novosContratos = generateSalesContracts({
            edificioConfig,
            buildingCount,
            level,
            marketPrices, // ← objeto com preços reais (carneOvino: 180, etc.)
            diaAtual,
        });

        const novaValidade = diaAtual + edificioConfig.periodoNovosContratos;

        setContratosEdificios(prev => ({
            ...prev,
            [id]: { contratos: novosContratos, validadeAte: novaValidade }
        }));

        return novosContratos;
    }

    function acceptSalesContract(type, contract, removeProduct) {
        setSalesContracts(prev => {
            const current = prev[type];

            if (current.active) return prev;

            removeProduct(contract.productId, contract.quantidade);

            return {
                ...prev,
                [type]: {
                    active: {
                        ...contract,
                        diasRestantes: contract.diasTotais,
                        status: "em_andamento",
                    },
                    available: [],
                },
            };
        });
    }

    function setAvailableSalesContracts(type, contracts) {
        setSalesContracts(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                available: contracts,
            },
        }));
    }

    function processarContratosVenda() {
        setSalesContracts(prev => {
            const next = structuredClone(prev);
            const settlements = [];

            Object.entries(next).forEach(([type, data]) => {
                const contract = data.active;
                if (!contract) return;

                if (contract.diasRestantes > 1) {
                    contract.diasRestantes -= 1;
                } else {
                    settlements.push(contract.valorTotal);
                    data.active = null;
                }
            });

            if (settlements.length > 0) {
                setPendingSettlements(prev => [...prev, ...settlements]);
            }

            return next;
        });
    }

    useEffect(() => {
        if (pendingSettlements.length === 0) return;

        const total = pendingSettlements.reduce((s, v) => s + v, 0);

        atualizarEco("saldo", economiaSetores.saldo + total);

        setPendingSettlements([]);
    }, [pendingSettlements]);



    /* =========================
       ESTOQUE
    ========================= */
    const [stock, setStock] = useState({
        // trigo: 1200,
        // soja: 300,
        // combustivel: 400,
        // biomassa: 200,
        // aviao: 1,
    });

    const [marketTransactions, setMarketTransactions] = useState([]);

    const storageProfiles = {
        // 🌱 AGRÍCOLA / BIOLÓGICO
        plantaçãoDeGrãos: {
            nome: "Plantação De Grãos",
            tipo: "dedicado",
            capacidadePorEdificio: 100,
            categoriasPermitidas: "agrícolas secos",
        },
        fazendaAdministrativa: {
            nome: "Fazenda Administrativa",
            tipo: "dedicado",
            capacidadePorEdificio: 50,
            categoriasPermitidas: "agrícolas secos",
        },

        //////////////////////
        armazém: {
            nome: "Armazém",
            tipo: "variavel",
            capacidadePorEdificio: 3000,
            categoriasPermitidas: ["biomassa / orgânicos", "produtos manufaturados", "agrícolas secos"],
        },
        // plantaçãoDeVegetais: {
        //     nome: "Plantação De Vegetais",
        //     tipo: "dedicado",
        //     capacidadePorEdificio: 3000,
        //     categoriasPermitidas: "agrícolas secos",
        // },
        silo: {
            nome: "Silo",
            tipo: "dedicado",
            capacidadePorEdificio: 3000,
            categoriasPermitidas: "agrícolas secos",
        },
        plantaçãoDeEucalipto: {
            nome: "Plantação De Eucalipto",
            tipo: "dedicado",
            capacidadePorEdificio: 400,
            categoriasPermitidas: "biomassa / orgânicos",
        },

        fazendaVacas: {
            nome: "Fazenda De Vacas",
            tipo: "variavel",
            capacidadePorEdificio: 400,
            categoriasPermitidas: ["animais", "produtos manufaturados", "biomassa / orgânicos", "perecíveis"],
        },
        granjaDeAves: {
            nome: "Granja De Aves",
            tipo: "variavel",
            capacidadePorEdificio: 50,
            categoriasPermitidas: ["animais", "biomassa / orgânicos", "perecíveis"],
        },
        criaçãoDeOvinos: {
            nome: "Criação De Ovinos",
            tipo: "variavel",
            capacidadePorEdificio: 100,
            categoriasPermitidas: ["animais", "produtos manufaturados", "biomassa / orgânicos", "perecíveis"],
        },
        madeireira: {
            nome: "Madeireira",
            tipo: "dedicado",
            capacidadePorEdificio: 550,
            categoriasPermitidas: "biomassa / orgânicos",
        },
        fábricaSmartphones: {
            nome: "Fábrica De Smartphones",
            tipo: "variavel",
            capacidadePorEdificio: 1200,
            categoriasPermitidas: ["componentes eletrônicos", "bens de alto valor"],
        },
        fábricaComputadores: {
            nome: "Fábrica De Computadores",
            tipo: "variavel",
            capacidadePorEdificio: 800,
            categoriasPermitidas: ["componentes eletrônicos", "componentes industriais", "bens de alto valor"],
        },
        fábricaConsoles: {
            nome: "Fábrica De Consoles De Jogos",
            tipo: "variavel",
            capacidadePorEdificio: 800,
            categoriasPermitidas: ["componentes eletrônicos", "químicos", "bens de alto valor", "componentes industriais"],
        },
        fábricaDispositivosVestíveis: {
            nome: "Fábrica De Dispositivos Vestíveis",
            tipo: "variavel",
            capacidadePorEdificio: 500,
            categoriasPermitidas: ["componentes eletrônicos", "químicos", "bens de alto valor", "componentes industriais"],
        },
        fábricaDeBaterias: {
            nome: "Fábrica De Baterias",
            tipo: "variavel",
            capacidadePorEdificio: 1500,
            categoriasPermitidas: ["minério", "componentes industriais", "componentes eletrônicos", "químicos"],
        },
        fábricaDeRações: {
            nome: "Fábrica De Rações",
            tipo: "variavel",
            capacidadePorEdificio: 150,
            categoriasPermitidas: ["agrícolas secos", "biomassa / orgânicos"],
        },
        fábricaDeEmbalagens: {
            nome: "Fábrica De Embalagens",
            tipo: "variavel",
            capacidadePorEdificio: 50,
            categoriasPermitidas: ["produtos manufaturados", "químicos"],
        },
        fábricaDeFertilizantes: {
            nome: "Fábrica De Fertilizantes",
            tipo: "dedicado",
            capacidadePorEdificio: 1450,
            categoriasPermitidas: "biomassa / orgânicos",
        },
        fábricaTêxtil: {
            nome: "Fábrica Têxtil",
            tipo: "variavel",
            capacidadePorEdificio: 1500,
            categoriasPermitidas: ["agrícolas secos", "químicos", "produtos manufaturados"],
        },
        fábricaDeCalçados: {
            nome: "Fábrica De Calçados",
            tipo: "variavel",
            capacidadePorEdificio: 1200,
            categoriasPermitidas: ["químicos", "produtos manufaturados"],
        },
        fábricaDeRoupas: {
            nome: "Fábrica De Roupas",
            tipo: "variavel",
            capacidadePorEdificio: 1500,
            categoriasPermitidas: ["produtos manufaturados"],
        },
        fábricaDeCelulose: {
            nome: "Fábrica De Celulose",
            tipo: "variavel",
            capacidadePorEdificio: 1750,
            categoriasPermitidas: ["fluidos", "biomassa / orgânicos"],
        },
        fábricaDePapel: {
            nome: "Fábrica De Papel",
            tipo: "variavel",
            capacidadePorEdificio: 1200,
            categoriasPermitidas: ["biomassa / orgânicos", "produtos manufaturados", "químicos"],
        },
        fábricaDeLivros: {
            nome: "Fábrica De Livros",
            tipo: "variavel",
            capacidadePorEdificio: 1850,
            categoriasPermitidas: ["biomassa / orgânicos", "produtos manufaturados"],
        },
        fábrica_de_medicamentos: {
            nome: "Fábrica De Medicamentos",
            tipo: "dedicado",
            capacidadePorEdificio: 1500,
            categoriasPermitidas: "químicos",
        },



        // estou aqui


        fábrica_plásticos: {
            nome: "Fábrica De Plásticos",
            tipo: "dedicado",
            capacidadePorEdificio: 1350,
            categoriasPermitidas: "químicos",
        },
        laboratório_farmacêutico: {
            nome: "Laboratório Farmacêutico",
            tipo: "variavel",
            capacidadePorEdificio: 150,
            categoriasPermitidas: ["agrícolas secos", "químicos"],
        },
        FábricaQuímicosEspecializados: {
            nome: "Fábrica De Químicos Especializados",
            tipo: "variavel",
            capacidadePorEdificio: 650,
            categoriasPermitidas: ["químicos", "produtos manufaturados", "componentes industriais", "minério"],
        },
        altoForno: {
            nome: "Alto-Forno",
            tipo: "variavel",
            capacidadePorEdificio: 1500,
            categoriasPermitidas: ["minério", "componentes industriais", "químicos"],
        },
        usinaSiderúrgica: {
            nome: "Usina Siderúrgica",
            tipo: "variavel",
            capacidadePorEdificio: 1400,
            categoriasPermitidas: ["componentes industriais", "químicos", "minério"],
        },
        fundiçãoAlumínio: {
            nome: "Fundição De Alumínio",
            tipo: "variavel",
            capacidadePorEdificio: 1300,
            categoriasPermitidas: ["minério", "componentes industriais"],
        },
        fábricaLigasMetálicas: {
            nome: "Fábrica De Ligas Metálicas",
            tipo: "variavel",
            capacidadePorEdificio: 1450,
            categoriasPermitidas: ["minério", "componentes industriais", "químicos"],
        },
        fábricaChapasMetálicas: {
            nome: "Fábrica De Chapas Metálicas",
            tipo: "variavel",
            capacidadePorEdificio: 1200,
            categoriasPermitidas: ["componentes industriais", "minério"],
        },
        indústriaComponentesMecânicos: {
            nome: "Indústria De Componentes Mecânicos",
            tipo: "variavel",
            capacidadePorEdificio: 1200,
            categoriasPermitidas: ["componentes industriais", "químicos", "minério"],
        },
        fábricaEstruturasMetálicas: {
            nome: "Fábrica De Estruturas Metálicas",
            tipo: "variavel",
            capacidadePorEdificio: 550,
            categoriasPermitidas: ["componentes industriais", "químicos"],
        },
        fábricaPeçasAutomotivas: {
            nome: "Fábrica De Peças Automotivas",
            tipo: "variavel",
            capacidadePorEdificio: 550,
            categoriasPermitidas: ["componentes industriais", "químicos", "componentes eletrônicos"],
        },
        montadoraVeículosElétricos: {
            nome: "Montadora De Veículos Elétricos",
            tipo: "variavel",
            capacidadePorEdificio: 200,
            categoriasPermitidas: ["componentes industriais", "veículos"],
        },
        fábricaAutomóveis: {
            nome: "Fábrica De Automóveis",
            tipo: "variavel",
            capacidadePorEdificio: 350,
            categoriasPermitidas: ["componentes industriais", "veículos"],
        },
        //    refinariaDeBiocombustíveis: {
        //         nome: "Refinaria De Biocombustíveis",
        //         tipo: "variavel",
        //         capacidadePorEdificio: 50,
        //         categoriasPermitidas: ["animais", "produtos manufaturados"],
        //     },
        refinaria: {
            nome: "Refinaria",
            tipo: "dedicado",
            capacidadePorEdificio: 1500,
            categoriasPermitidas: "químicos",
        },
        biofábrica: {
            nome: "Biofábrica",
            tipo: "variavel",
            capacidadePorEdificio: 100,
            categoriasPermitidas: ["agrícolas secos", "químicos"],
        },
        fábricaSemicondutores: {
            nome: "Fábrica De Semicondutores",
            tipo: "variavel",
            capacidadePorEdificio: 1200,
            categoriasPermitidas: ["componentes industriais", "químicos", "minério"],
        },
        fábricaChips: {
            nome: "Fábrica De Chips",
            tipo: "variavel",
            capacidadePorEdificio: 1500,
            categoriasPermitidas: ["componentes industriais", "componentes eletrônicos", "minério"],
        },
        fábricaPlacasEletrônicas: {
            nome: "Fábrica De Placas Eletrônicas",
            tipo: "variavel",
            capacidadePorEdificio: 1300,
            categoriasPermitidas: ["componentes eletrônicos", "componentes industriais", "químicos"],
        },
        fábricaEletrônicos: {
            nome: "Fábrica De Eletrônicos",
            tipo: "variavel",
            capacidadePorEdificio: 50,
            categoriasPermitidas: ["componentes eletrônicos", "químicos", "componentes industriais", "minério", "bens de alto valor"],
        },
        FábricaRobôs: {
            nome: "Fábrica De Robôs",
            tipo: "variavel",
            capacidadePorEdificio: 400,
            categoriasPermitidas: ["componentes industriais", "componentes eletrônicos"],
        },
        fábricaMotores: {
            nome: "Fábrica De Motores",
            tipo: "variavel",
            capacidadePorEdificio: 1750,
            categoriasPermitidas: ["componentes industriais", "químicos"],
        },
        fábricaAeronaves: {
            nome: "Fábrica De Aeronaves",
            tipo: "variavel",
            capacidadePorEdificio: 600,
            categoriasPermitidas: ["componentes industriais", "componentes eletrônicos", "aeronaves"],
        },
        fábricaFoguetes: {
            nome: "Fábrica De Foguetes",
            tipo: "variavel",
            capacidadePorEdificio: 1000,
            categoriasPermitidas: ["componentes eletrônicos", "componentes industriais", "aeronaves"],
        },
        estaleiro: {
            nome: "Estaleiro",
            tipo: "variavel",
            capacidadePorEdificio: 800,
            categoriasPermitidas: ["animais", "produtos manufaturados"],
        },
        açougue: {
            nome: "Açougue",
            tipo: "dedicado",
            capacidadePorEdificio: 50,     // ~500 kg de carne
            categoriasPermitidas: "perecíveis",
        },
        petshop: {
            nome: "Petshop",
            tipo: "dedicado",
            capacidadePorEdificio: 50,     // ~500 sacas de ração
            categoriasPermitidas: "biomassa / orgânicos",
        },
        livraria: {
            nome: "Livraria",
            tipo: "dedicado",
            capacidadePorEdificio: 250,    // ~50 livros
            categoriasPermitidas: "produtos manufaturados",
        },
        mercado: {
            nome: "Mercado",
            tipo: "dedicado",
            capacidadePorEdificio: 50,
            categoriasPermitidas: "biomassa / orgânicos",
        },
        postoDeCombustíveis: {
            nome: "Posto De Combustíveis",
            tipo: "dedicado",
            capacidadePorEdificio: 250,    // ~50 litros de diesel
            categoriasPermitidas: "químicos",
        },
        lojaDeCalçados: {
            nome: "Loja De Calçados",
            tipo: "dedicado",
            capacidadePorEdificio: 250,    // ~50 pares
            categoriasPermitidas: "produtos manufaturados",
        },
        lojaDeVestuário: {
            nome: "Loja De Vestuário",
            tipo: "dedicado",
            capacidadePorEdificio: 250,    // ~50 peças
            categoriasPermitidas: "produtos manufaturados",
        },
        farmácia: {
            nome: "Farmácia",
            tipo: "dedicado",
            capacidadePorEdificio: 50,     // ~100 unidades de medicamento
            categoriasPermitidas: "químicos",
        },
        lojaDeGames: {
            nome: "Loja De Games",
            tipo: "dedicado",
            capacidadePorEdificio: 100,    // ~50 consoles
            categoriasPermitidas: "bens de alto valor",
        },
        lojaDeCelulares: {
            nome: "Loja De Celulares",
            tipo: "dedicado",
            capacidadePorEdificio: 100,    // ~50 phones
            categoriasPermitidas: "bens de alto valor",
        },
        lojaDeGadgetsEWearables: {
            nome: "Loja De Gadgets E Wearables",
            tipo: "dedicado",
            capacidadePorEdificio: 100,
            categoriasPermitidas: "bens de alto valor",
        },
        lojaDeInformática: {
            nome: "Loja De Informática",
            tipo: "dedicado",
            capacidadePorEdificio: 100,
            categoriasPermitidas: "bens de alto valor",
        },
        lojaDeEletrônicos: {
            nome: "Loja De Eletrônicos",
            tipo: "dedicado",
            capacidadePorEdificio: 100,
            categoriasPermitidas: "bens de alto valor",
        },
        concessionáriaDeVeículos: {
            nome: "Concessionária De Veículos",
            tipo: "dedicado",
            capacidadePorEdificio: 300,    // exatamente 50 carros
            categoriasPermitidas: "veículos",
        },
        fábricaTurbinasEólicas: {
            nome: "Fábrica De Turbinas Eólicas",
            tipo: "dedicado",
            capacidadePorEdificio: 400,
            categoriasPermitidas: "componentes industriais",
        },
        fábricaPainéisSolares: {
            nome: "Fábrica De Painéis Solares",
            tipo: "variavel",
            capacidadePorEdificio: 400,
            categoriasPermitidas: ["químicos", "componentes industriais"],
        },
        centroReciclagemBaterias: {
            nome: "Centro De Reciclagem De Baterias",
            tipo: "variavel",
            capacidadePorEdificio: 600,
            categoriasPermitidas: ["componentes industriais", "químicos", "minério"],
        },
        usinaSolar: {
            nome: "Usina Solar",
            tipo: "variavel",
            capacidadePorEdificio: 50,
            categoriasPermitidas: "energia",
        },
        parqueEólico: {
            nome: "Parque Eólico",
            tipo: "variavel",
            capacidadePorEdificio: 50,
            categoriasPermitidas: "energia",
        },
        usinaBiomassa: {
            nome: "Usina De Biomassa",
            tipo: "variavel",
            capacidadePorEdificio: 50,
            categoriasPermitidas: "energia",
        },
        usinaTermelétricaBiocombustíveis: {
            nome: "Usina Termelétrica A Biocombustíveis",
            tipo: "variavel",
            capacidadePorEdificio: 50,
            categoriasPermitidas: "energia",
        },
        usinaHidrelétrica: {
            nome: "Usina Hidrelétrica",
            tipo: "variavel",
            capacidadePorEdificio: 50,
            categoriasPermitidas: "energia",
        },
        usinaTermelétrica: {
            nome: "Usina Termelétrica",
            tipo: "variavel",
            capacidadePorEdificio: 50,
            categoriasPermitidas: "energia",
        },
        reatorNuclear: {
            nome: "Reator Nuclear Convencional",
            tipo: "variavel",
            capacidadePorEdificio: 50,
            categoriasPermitidas: "energia",
        },


        //
        //
        //
        camaraFria: {
            nome: "Câmara Fria",
            tipo: "dedicado",
            capacidadePorEdificio: 2500,    // 5000 un de carne (slotSize pequeno, volume alto)
            categoriasPermitidas: "perecíveis",
        },
        campoDeEstocagem: {
            nome: "Campo De Estocagem",
            tipo: "variavel",
            capacidadePorEdificio: 1500,    // 500 animais (vaca = slotSize 3)
            categoriasPermitidas: ["animais", "biomassa / orgânicos"],
        },
        depositoDeResiduosOrganicos: {
            nome: "Depósito De Resíduos Orgânicos",
            tipo: "dedicado",
            capacidadePorEdificio: 2500,    // 500 toras/cavacos
            categoriasPermitidas: "biomassa / orgânicos",
        },
        patioDeMineracao: {
            nome: "Pátio De Mineração",
            tipo: "dedicado",
            capacidadePorEdificio: 3000,    // 500 toneladas de minério
            categoriasPermitidas: "minério",
        },
        armazemMateriaisBrutos: {
            nome: "Armazém De Materiais Brutos",
            tipo: "variavel",
            capacidadePorEdificio: 2000,
            categoriasPermitidas: ["biomassa / orgânicos","componentes industriais"]
        },
        tanqueFluidos: {
            nome: "Tanque De Armazenamento De Fluidos",
            tipo: "variavel",
            capacidadePorEdificio: 2500,    // 500 litros de petróleo/nafta
            categoriasPermitidas: ["fluidos", "químicos", "energia"],
        },
        centroColetaBiomassa: {
            nome: "Centro De Coleta De Biomassa",
            tipo: "dedicado",
            capacidadePorEdificio: 2500,
            categoriasPermitidas: "biomassa / orgânicos",
        },
        armazemIndustrial: {
            nome: "Armazém Industrial",
            tipo: "variavel",
            capacidadePorEdificio: 3000,    // 500 lingotes/motores
            categoriasPermitidas: ["componentes industriais", "componentes eletrônicos"],
        },
        containerModular: {
            nome: "Container Modular",
            tipo: "variavel",
            capacidadePorEdificio: 2500,
            categoriasPermitidas: ["agrícolas secos", "componentes industriais", "produtos manufaturados", "fluidos"],
        },
        centroDistribuicao: {
            nome: "Centro De Distribuição",
            tipo: "dedicado",
            capacidadePorEdificio: 2500,    // 500 caixas/bobinas/calçados
            categoriasPermitidas: "produtos manufaturados",
        },
        armazemLogistico: {
            nome: "Armazém Logístico",
            tipo: "variavel",
            capacidadePorEdificio: 2500,
            categoriasPermitidas: ["produtos manufaturados", "bens de alto valor"],
        },
        patioVeiculos: {
            nome: "Pátio De Veículos",
            tipo: "dedicado",
            capacidadePorEdificio: 3000,    // 500 carros (slotSize 6)
            categoriasPermitidas: "veículos",
        },
        hangar: {
            nome: "Hangar",
            tipo: "dedicado",
            capacidadePorEdificio: 3000,    // 500 aeronaves/navios
            categoriasPermitidas: "aeronaves",
        },
        dataCenter: {
            nome: "Data Center",
            tipo: "dedicado",
            capacidadePorEdificio: 5000,    // fixo — produto digital não tem slotSize físico
            categoriasPermitidas: "produtos digitais",
        },
        servidorNuvem: {
            nome: "Servidor em Nuvem",
            tipo: "dedicado",
            capacidadePorEdificio: 10000,   // tier acima do dataCenter
            categoriasPermitidas: "produtos digitais",
        },
        armazemMateriaisSensiveis: {
            nome: "Armazém Especializado de Materiais Sensíveis",
            tipo: "dedicado",
            capacidadePorEdificio: 5000,    // fixo — material de risco, capacidade controlada
            categoriasPermitidas: "materiais sensíveis",
        },
    };



    // const storageQuantities = {
    //     plantaçãoDeGrãos: 0,
    //     fazendaAdministrativa: 0,
    //     armazém: 0,
    //     plantaçãoDeEucalipto: 0,
    //     fazendaVacas: 0,
    //     granjaDeAves: 0,
    //     criaçãoDeOvinos: 0,
    //     madeireira: 0,
    //     fábricaDeSmartphones: 0,
    //     fábricaDeComputadores: 0,
    //     fábricaDeConsolesDeJogos: 0,
    //     fábricaDeDispositivosVestíveis: 0,
    //     fábricaDeRações: 0,
    //     FábricaDeEmbalagens: 0,
    //     fábricaDeFertilizantes: 0,
    //     fábricaTêxtil: 0,
    //     fábricaDeCalçados: 0,
    //     fábricaDeRoupas: 0,
    //     fábricaDeCelulose: 0,
    //     fábricaDePapel: 0,
    //     fábricaDeLivros: 0,
    //     fábricaDeMedicamentos: 0,
    //     laboratórioFarmacêutico: 0,
    //     fábricaDePlásticos: 0,
    //     fábricaDeQuímicosEspecializados: 0,
    //     altoForno: 0,
    //     usinaSiderúrgica: 0,
    //     fundiçãoDeAlumínio: 0,
    //     fábricaDeLigasMetálicas: 0,
    //     indústriaDeComponentesMecânicos: 0,
    //     fábricaDeChapasMetálicas: 0,
    //     fábricaDeEstruturasMetálicas: 0,
    //     fábricaDePeçasAutomotivas: 0,
    //     montadoraDeVeículosElétricos: 0,
    //     fábricaDeAutomóveis: 0,
    //     refinaria: 0,
    //     biofábrica: 0,
    //     fábricaDeChips: 0,
    //     fábricaDePlacasEletrônicas: 0,
    //     fábricaDeSemicondutores: 0,
    //     fábricaDeEletrônicos: 0,
    //     fábricaDeRobôs: 0,
    //     fábricaDeMotores: 0,
    //     fábricaDeFoguetes: 0,
    //     fábricaDeAeronaves: 0,
    //     estaleiro: 0,
    //     livraria: 0,
    //     mercado: 0,
    //     açougue: 0,
    //     postoDeCombustíveis: 0,
    //     petshop: 0,
    //     farmácia: 0,
    //     lojaDeCalçados: 0,
    //     lojaDeVestuário: 0,
    //     lojaDeGadgetsEWearables: 0,
    //     lojaDeGames: 0,
    //     lojaDeCelulares: 0,
    //     lojaDeInformática: 0,
    //     lojaDeEletrônicos: 0,
    //     concessionáriaDeVeículos: 0,
    //     silo: 5,
    //     hangar: 2,
    //     camaraFria: 5,
    //     campoDeEstocagem: 400,
    //     armazemLogistico: 5,
    //     armazemMateriaisSensiveis: 2,
    //     centroColetaBiomassa: 100,
    //     containerModular: 1,
    //     depositoDeResiduosOrganicos: 1,
    //     patioDeMineracao: 1,
    //     armazemMateriaisBrutos: 1,
    //     tanqueFluidos: 1,
    //     armazemIndustrial: 1,
    //     centroDistribuicao: 1,
    //     patioVeiculos: 1,
    //     dataCenter: 1,
    //     servidorNuvem: 1
    // };


    const storageQuantities = useMemo(() => {
        if (!dados) return {};

        const result = {};
        const setores = ["agricultura", "industria", "comercio", "tecnologia", "imobiliario", "energia"];

        setores.forEach(setor => {
            const edificios = dados?.[setor]?.edificios || [];
            edificios.forEach(edificio => {
                // Normaliza o nome para bater com a chave do storageProfiles
                // Ex: "Câmara Fria" → "camaraFria"
                const chave = Object.keys(storageProfiles).find(k =>
                    storageProfiles[k].nome === edificio.nome
                );
                if (chave) {
                    result[chave] = edificio.quantidade || 0;
                }
            });
        });

        return result;
    }, [dados]);



    /* =========================
       ARMAZENAMENTOS
    ========================= */
    const storageBuildings = useMemo(() => {
        return Object.entries(storageProfiles).map(([id, profile]) => {
            const quantidade = storageQuantities[id] || 0;
            return {
                id,
                ...profile,
                quantidade,
                capacidadeTotal: quantidade * profile.capacidadePorEdificio,
            };
        });
    }, [storageQuantities]);


    function processarTransacoesMercado() {
        setMarketTransactions(prev =>
            prev.flatMap(t => {
                if (t.diasRestantes > 1) {
                    return [{ ...t, diasRestantes: t.diasRestantes - 1 }];
                }

                // liquidação
                if (t.tipo === "buy") {
                    setStock(s => ({
                        ...s,
                        [t.produtoId]: (s[t.produtoId] || 0) + t.quantidade,
                    }));
                }

                if (t.tipo === "sell") {
                    atualizarEco("saldo", economiaSetores.saldo + t.valorTotal);
                }

                return [];
            })
        );
    }

    const potentialCapacityByCategory = useMemo(() => {
        const map = {};

        storageBuildings.forEach(b => {
            const categorias = Array.isArray(b.categoriasPermitidas)
                ? b.categoriasPermitidas
                : [b.categoriasPermitidas];

            categorias.forEach(cat => {
                if (!map[cat]) {
                    map[cat] = {
                        dedicada: 0,
                        variavel: 0,
                    };
                }

                if (b.tipo === "dedicado") {
                    map[cat].dedicada += b.capacidadeTotal;
                }

                if (b.tipo === "variavel") {
                    map[cat].variavel += b.capacidadeTotal;
                }
            });
        });

        return map;
    }, [storageBuildings]);


    /* =========================
       CAPACIDADE DEDICADA
    ========================= */
    const dedicatedCapacityByCategory = useMemo(() => {
        const result = {};
        storageBuildings
            .filter(b => b.tipo === "dedicado")
            .forEach(b => {
                result[b.categoriasPermitidas] =
                    (result[b.categoriasPermitidas] || 0) + b.capacidadeTotal;
            });

        return result;
    }, [storageBuildings]);


    /* =========================
       ARMAZÉM VARIÁVEL
    ========================= */
    const variableStorages = storageBuildings.filter(
        b => b.tipo === "variavel" && b.quantidade > 0
    );

    const variableStorageTotal = useMemo(
        () =>
            variableStorages.reduce(
                (s, b) => s + b.capacidadeTotal,
                0
            ),
        [variableStorages]
    );

    const variableCapacityByCategory = useMemo(() => {
        const map = {};

        variableStorages.forEach(b => {
            const categorias = Array.isArray(b.categoriasPermitidas)
                ? b.categoriasPermitidas
                : [b.categoriasPermitidas];

            categorias.forEach(cat => {
                map[cat] = (map[cat] || 0) + b.capacidadeTotal;
            });
        });

        return map;
    }, [variableStorages]);


    function getProductStockValue(productId) {
        const qty = stock[productId] || 0;
        const product = productsCatalog[productId];
        if (!product) return 0;

        const price = product.precoBase || 0; // depois pode ser marketPrice
        return qty * price;
    }


    /* =========================
       USO POR CATEGORIA
    ========================= */
    const usedSpaceByCategory = useMemo(() => {
        return Object.entries(stock).reduce((acc, [id, qty]) => {
            const product = productsCatalog[id];
            if (!product) return acc;

            const categoria = product.categoriaFisica;
            const slotSize = Number(product.slotSize);

            if (!categoria || !slotSize || qty <= 0) return acc;

            const slotsUsados = qty * slotSize;

            acc[categoria] = (acc[categoria] || 0) + slotsUsados;

            return acc;
        }, {});
    }, [stock]);


    // useEffect(() => {
    //   console.table(usedSpaceByCategory);
    // }, [usedSpaceByCategory]);


    /* =========================
       USO DO ARMAZÉM VARIÁVEL
    ========================= */
    const usedVariableStorage = useMemo(() => {
        let used = 0;

        Object.entries(usedSpaceByCategory).forEach(
            ([categoria, totalUsed]) => {
                const dedicatedCap =
                    dedicatedCapacityByCategory[categoria] || 0;

                const excesso = Math.max(totalUsed - dedicatedCap, 0);

                const aceita = variableStorages.some(v =>
                    v.categoriasPermitidas.includes(categoria)
                );

                if (aceita) used += excesso;
            }
        );

        return used;
    }, [usedSpaceByCategory, dedicatedCapacityByCategory]);

    /* =========================
       CAPACIDADE DISPONÍVEL
    ========================= */
    function getAvailableCapacity(categoria) {
        const usedTotal = usedSpaceByCategory[categoria] || 0;
        const dedicatedCap = dedicatedCapacityByCategory[categoria] || 0;

        const dedicatedRemaining = Math.max(
            dedicatedCap - usedTotal,
            0
        );

        const variableCap = variableCapacityByCategory[categoria] || 0;
        const variableUsed = usedVariableByCategory[categoria] || 0;

        const variableRemaining = Math.max(
            variableCap - variableUsed,
            0
        );

        return dedicatedRemaining + variableRemaining;
    }


    /* =========================
       REGRAS
    ========================= */
    function canAddProduct(productId, amount = 1) {
        const product = productsCatalog[productId];
        if (!product) return false;

        const categoria = product.categoriaFisica;

        // categoria não existe no sistema
        if (!categoria) return false;

        const required = amount * product.slotSize;
        const available = getAvailableCapacity(categoria);

        return available >= required;
    }

    function getMaxAddable(productId) {
        const product = productsCatalog[productId];
        if (!product) return 0;

        const availableSpace = getAvailableCapacity(
            product.categoriaFisica
        );

        return Math.floor(availableSpace / product.slotSize);
    }

    function getMaxRemovable(productId) {
        return stock[productId] || 0;
    }


    function addProduct(productId, amount = 1) {
        if (!canAddProduct(productId, amount)) return false;

        setStock(prev => ({
            ...prev,
            [productId]: (prev[productId] || 0) + amount,
        }));

        return true;
    }

    function getCategoryStorageUI(categoria) {
        const usado = usedSpaceByCategory[categoria] || 0;

        const dedicatedCap =
            dedicatedCapacityByCategory[categoria] || 0;

        const aceitaVariavel = variableStorages.some(v =>
            v.categoriasPermitidas.includes(categoria)
        );

        const variavelDisponivel = aceitaVariavel
            ? Math.max(variableStorageTotal - usedVariableStorage, 0)
            : 0;

        const capMax = dedicatedCap + variavelDisponivel;

        return {
            usadoSlots: usado,
            capDedicadaSlots: dedicatedCap,
            capMaxSlots: capMax,
            aceitaVariavel,
        };
    }




    const totalStockValue = useMemo(() => {
        let total = 0;

        Object.entries(stock).forEach(([id, qty]) => {
            const product = productsCatalog[id];
            if (!product) return;

            const price = product.precoBase || 0; // ou preço de mercado
            total += qty * price;
        });

        return total;
    }, [stock]);

    function removeProduct(productId, amount = 1) {
        setStock(prev => {
            const current = prev[productId] || 0;
            if (current < amount) return prev;

            return {
                ...prev,
                [productId]: current - amount,
            };
        });
    }

    /* =========================
       Produção 
    ========================= */
    // No GameContext.jsx
    function processSellQueue(faturamentoDiario = 0) {
        liquidadoRefPersist.current = 0; // reseta antes

        setSellQueue(prevSales => {
            let total = 0;
            const next = prevSales.reduce((acc, venda) => {
                if (venda.diasRestantes > 1) {
                    acc.push({ ...venda, diasRestantes: venda.diasRestantes - 1 });
                } else {
                    total += Number(venda.valorTotal) || 0;
                }
                return acc;
            }, []);

            // useRef persiste mesmo com double-invoke do Strict Mode
            liquidadoRefPersist.current = total;
            return next;
        });

        // Usa setTimeout(0) para garantir que o setSellQueue já commitou
        setTimeout(() => {
            const totalAdicionar = faturamentoDiario + liquidadoRefPersist.current;
            console.log("💰 Liquidando:", faturamentoDiario, "+", liquidadoRefPersist.current, "=", totalAdicionar);
            if (totalAdicionar > 0) {
                setEconomiaSetores(prev => ({
                    ...prev,
                    saldo: prev.saldo + totalAdicionar
                }));
            }
        }, 0);
    }
    function iniciarVendaComercial(formula, quantidade) {
        const produto = productsCatalog[formula.produto];

        // Cálculo do valor: (Preço Base * (1 + Margem/100)) * Qtd
        const precoComMargem = produto.precoBase * (1 + (formula.margemBase / 100));
        const valorFinal = precoComMargem * quantidade;

        const novaVenda = {
            id: crypto.randomUUID(),
            formulaId: formula.id,
            produtoId: formula.produto,
            quantidade: quantidade,
            valorTotal: valorFinal, // <--- GARANTE QUE NÃO É 0
            diasRestantes: formula.duracao,
            duracaoInicial: formula.duracao,
            tipo: "venda"
        };

        setSellQueue(prev => [...prev, novaVenda]);

        // Remove do estoque na hora para evitar venda duplicada
        removeProduct(formula.produto, quantidade);
    }


    function startProduction({ formula, quantidade, buildingCount }) {
        const active = getActiveProductionsByFormula(formula.id);
        const maxAllowed = getMaxProductionByBuilding({
            formulaId: formula.id,
            buildingCount,
        });

        if (active + quantidade > maxAllowed) {
            return false;
        }

        for (const [produto, qtd] of Object.entries(formula.input)) {
            if ((stock[produto] || 0) < qtd * quantidade) {
                return false;
            }
        }

        // consumir insumos
        Object.entries(formula.input).forEach(([produto, qtd]) => {
            removeProduct(produto, qtd * quantidade);
        });

        // registrar produção
        setProductionQueue(prev => [
            ...prev,
            {
                id: crypto.randomUUID(),
                formulaId: formula.id,
                nome: formula.nome,
                diasRestantes: formula.duracao,
                quantidade,
                status: "ativa",
                output: Object.fromEntries(
                    Object.entries(formula.output).map(([p, q]) => [
                        p,
                        q * quantidade,
                    ])
                ),
            },
        ]);

        return true;
    }

    // Substitua sua função processProductions por esta no useGame
    function processarFilaUnificada() {
        setProductionQueue(prev => {
            const nextQueue = [];

            prev.forEach(item => {
                if (item.diasRestantes > 1) {
                    // Ainda em tempo de espera: apenas reduz o dia
                    nextQueue.push({ ...item, diasRestantes: item.diasRestantes - 1 });
                } else {
                    // O dia chegou a 0: Liquidação
                    if (item.tipo === "venda") {
                        // LIQUIDAÇÃO DE VENDA: Adiciona ao saldo
                        const valorAReceber = Number(item.valorTotal) || 0;

                        // Usando a função de atualização de saldo do seu sistema
                        setEconomiaSetores(prevEco => ({
                            ...prevEco,
                            saldo: prevEco.saldo + valorAReceber
                        }));

                        console.log(`Contrato de venda finalizado: +$${valorAReceber}`);
                    } else {
                        // LIQUIDAÇÃO DE PRODUÇÃO: Adiciona itens ao estoque
                        if (item.output) {
                            Object.entries(item.output).forEach(([prodId, qtd]) => {
                                addProduct(prodId, qtd);
                            });
                        }
                    }
                    // Nota: Ao não dar "push" no nextQueue, o item é removido da fila
                }
            });

            return nextQueue;
        });
    }


    // GameContext.jsx

    function startSale(contrato) {
        if (!contrato) return;

        // Impede duplicata pelo mesmo id
        setSellQueue(prev => {
            const jaExiste = prev.some(v => v.id === contrato.id);
            if (jaExiste) return prev;

            const novaVenda = {
                id: contrato.id,
                formulaId: contrato.formulaId,
                produto: contrato.productId,
                quantidade: contrato.quantidade,
                valorTotal: contrato.valorTotal,
                diasRestantes: contrato.prazoDias,
                duracaoInicial: contrato.prazoDias,
                tipo: "venda"
            };

            removeProduct(contrato.productId, contrato.quantidade);
            return [...prev, novaVenda];
        });

        console.log(`✅ Contrato fechado! Aguardando ${contrato.prazoDias} dias para receber $${contrato.valorTotal}`);
    }

    const processarVendas = () => {
        setSellQueue(prev => {
            const remaining = [];
            prev.forEach(venda => {
                if (venda.diasRestantes > 1) {
                    remaining.push({ ...venda, diasRestantes: venda.diasRestantes - 1 });
                } else {
                    // Aqui o valorTotal DEVE existir no objeto
                    const valorParaAdicionar = Number(venda.valorTotal) || 0;

                    // Atualiza o saldo global
                    setEconomiaSetores(prevEco => ({
                        ...prevEco,
                        saldo: prevEco.saldo + valorParaAdicionar
                    }));

                    console.log(`Venda finalizada: +$${valorParaAdicionar}`);
                }
            });
            return remaining;
        });
    };



    function processProductions() {
        setProductionQueue(prev => {
            const next = [];

            prev.forEach(prod => {
                if (prod.diasRestantes > 1) {
                    next.push({ ...prod, diasRestantes: prod.diasRestantes - 1 });
                } else {
                    Object.entries(prod.output).forEach(([produto, qtd]) => {
                        addProduct(produto, qtd);
                    });
                }
            });

            return next;
        });

        return true;
    }

    function processSell() {
        setProductionQueue(prev => {
            const next = [];

            prev.forEach(prod => {
                if (prod.diasRestantes > 1) {
                    // Ainda em andamento
                    next.push({ ...prod, diasRestantes: prod.diasRestantes - 1 });
                } else {
                    // Finalizando hoje
                    if (prod.tipo === "venda") {
                        // USE UMA FUNÇÃO AQUI para não pegar saldo desatualizado
                        setEconomiaSetores(prevEco => ({
                            ...prevEco,
                            saldo: prevEco.saldo + (prod.valorTotal || 0)
                        }));
                        console.log("Venda concluída, saldo atualizado!");
                    } else {
                        // Produção normal
                        Object.entries(prod.output || {}).forEach(([produto, qtd]) => {
                            addProduct(produto, qtd);
                        });
                    }
                }
            });

            return next;
        });
    }




    function checkProductionOverflow() {
        const overflows = [];

        productionQueue.forEach(prod => {
            // 1. Se for uma venda ou não tiver dias para terminar, pula
            if (prod.tipo === "venda" || prod.diasRestantes > 1) return;

            // 2. Garante que prod.output existe antes de usar Object.entries
            if (!prod.output) return;

            Object.entries(prod.output).forEach(([produtoId, qtd]) => {
                const product = productsCatalog[produtoId];
                if (!product) return;

                // ... resto do seu código de lógica de slots ...
                const categoria = product.categoriaFisica;
                // ...
            });
        });

        return overflows;
    }

    const usedVariableByCategory = useMemo(() => {
        const map = {};

        Object.entries(usedSpaceByCategory).forEach(([categoria, totalUsed]) => {
            const dedicatedCap =
                dedicatedCapacityByCategory[categoria] || 0;

            const excesso = Math.max(totalUsed - dedicatedCap, 0);

            if (variableCapacityByCategory[categoria]) {
                map[categoria] = excesso;
            }
        });

        return map;
    }, [
        usedSpaceByCategory,
        dedicatedCapacityByCategory,
        variableCapacityByCategory
    ]);



    function resolveProductionOverflowBySelling(overflows) {
        let totalRecebido = 0;

        overflows.forEach(item => {
            totalRecebido += item.valorVenda;

            // adiciona apenas o que cabe
            if (item.quantidadeArmazenavel > 0) {
                addProduct(item.produtoId, item.quantidadeArmazenavel);
            }
        });

        atualizarEco("saldo", economiaSetores.saldo + totalRecebido);
    }

    function getSortedProductionQueue() {
        return [...productionQueue].sort(
            (a, b) => a.diasRestantes - b.diasRestantes
        );
    }

    function getProductionOutputsPrediction() {
        const prediction = {};

        productionQueue.forEach(prod => {
            Object.entries(prod.output).forEach(([produtoId, qtd]) => {
                prediction[produtoId] =
                    (prediction[produtoId] || 0) + qtd;
            });
        });

        return prediction;
    }

    function getPredictedFinalStock() {
        const prediction = { ...stock };
        const productionPrediction = getProductionOutputsPrediction();

        Object.entries(productionPrediction).forEach(([produtoId, qtd]) => {
            prediction[produtoId] =
                (prediction[produtoId] || 0) + qtd;
        });

        return prediction;
    }

    function getPredictedUsedSpaceByCategory() {
        const predictedStock = getPredictedFinalStock();
        const result = {};

        Object.entries(predictedStock).forEach(([id, qty]) => {
            const product = productsCatalog[id];
            if (!product) return;

            const categoria = product.categoriaFisica;
            const slots = qty * product.slotSize;

            result[categoria] = (result[categoria] || 0) + slots;
        });

        return result;
    }

    function getStockPredictionReport() {
        const report = {};

        productionQueue.forEach(prod => {
            Object.entries(prod.output).forEach(([produtoId, qtd]) => {
                const product = productsCatalog[produtoId];
                if (!product) return;

                const categoria = product.categoriaFisica;
                const slotSize = product.slotSize;
                const slots = qtd * slotSize;

                if (!report[produtoId]) {
                    report[produtoId] = {
                        produtoId,
                        nome: product.nome,
                        icon: product.icon,
                        categoria,
                        totalQtd: 0,
                        totalSlots: 0,
                        producoes: [],
                    };
                }

                report[produtoId].totalQtd += qtd;
                report[produtoId].totalSlots += slots;

                report[produtoId].producoes.push({
                    dias: prod.diasRestantes,
                    quantidade: qtd,
                    slots,
                });
            });
        });

        // cálculo de risco de estouro
        Object.values(report).forEach(item => {
            const usadoAgora =
                usedSpaceByCategory[item.categoria] || 0;

            const capacidadeTotal =
                (dedicatedCapacityByCategory[item.categoria] || 0) +
                (variableCapacityByCategory[item.categoria] || 0);

            const livre = Math.max(capacidadeTotal - usadoAgora, 0);

            item.slotsDisponiveis = livre;
            item.excessoSlots = Math.max(
                item.totalSlots - livre,
                0
            );

            item.excessoQtd = item.excessoSlots > 0
                ? Math.ceil(item.excessoSlots / productsCatalog[item.produtoId].slotSize)
                : 0;

            const preco = getMarketPrice(
                item.produtoId,
                economiaSetores
            );

            item.valorEstimado =
                item.totalQtd * preco;

            item.valorPerdaEstimado =
                item.excessoQtd * preco * 0.5;
        });

        return Object.values(report);
    }


    function canStartProductionSafely(formula, quantidade) {
        const simulatedOutput = {};

        Object.entries(formula.output).forEach(([p, q]) => {
            simulatedOutput[p] = q * quantidade;
        });

        const predicted = getPredictedFinalStock();

        for (const [produtoId, qtd] of Object.entries(simulatedOutput)) {
            const product = productsCatalog[produtoId];
            if (!product) continue;

            const categoria = product.categoriaFisica;
            const slotNeed = qtd * product.slotSize;

            const used =
                (getPredictedUsedSpaceByCategory()[categoria] || 0);

            const cap =
                (dedicatedCapacityByCategory[categoria] || 0) +
                (variableCapacityByCategory[categoria] || 0);

            if (used + slotNeed > cap) {
                return {
                    ok: false,
                    categoria,
                    excessoSlots: used + slotNeed - cap,
                };
            }
        }

        return { ok: true };
    }

    function getActiveProductionsByFormula(formulaId) {
        return productionQueue.reduce((total, prod) => {
            if (prod.formulaId === formulaId) {
                total += prod.quantidade;
            }
            return total;
        }, 0);
    }

    function getMaxProductionByBuilding({ formulaId, buildingCount }) {
        const formulaConfig = FORMULAS_EDIFICIOS
            .flatMap(e => e.formulas)
            .find(f => f.id === formulaId);

        if (!formulaConfig) return 0;

        return formulaConfig.capacidadePorEdificio * buildingCount;
    }

    // Coloque logo após a declaração do sellQueue
    useEffect(() => {
        console.log("sellQueue mudou:", sellQueue);
    }, [sellQueue]);



    return (
        <GameContext.Provider
            value={{
                stock,
                storageBuildings,
                totalStockValue,
                getProductStockValue,
                addProduct,
                removeProduct,
                canAddProduct,
                getMaxAddable,
                getMaxRemovable,
                getCategoryStorageUI,
                usedVariableStorage,
                variableStorageTotal,
                marketTransactions,
                setMarketTransactions,
                processarTransacoesMercado,
                salesContracts,
                acceptSalesContract,
                setAvailableSalesContracts,
                processarContratosVenda,
                processProductions,
                productionQueue,
                startProduction,
                potentialCapacityByCategory,
                checkProductionOverflow,
                resolveProductionOverflowBySelling,
                getStockPredictionReport,
                getSortedProductionQueue,
                startSale,
                processSell,
                processarFilaUnificada,
                processSellQueue,
                iniciarVendaComercial,
                processarVendas,
                getOuGerarContratos, contratosEdificios, sellQueue
            }}


        >
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    return useContext(GameContext);
}
