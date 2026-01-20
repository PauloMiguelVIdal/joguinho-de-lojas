import { createContext, useContext, useMemo, useEffect, useState } from "react";
import { productsCatalog, getMarketPrice }from "../components/TablePrice";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";


const GameContext = createContext();

export function GameProvider({ children }) {


    const { economiaSetores, setEconomiaSetores, atualizarEco } = useContext(
        DadosEconomyGlobalContext
    );


    /* =========================
       SISTEMA DE CONTRATOS
    ========================= */

    const [pendingSettlements, setPendingSettlements] = useState([]);

    const [productionQueue, setProductionQueue] = useState([]);


    const [salesContracts, setSalesContracts] = useState({
        butcher: {
            active: null,
            available: [],
        },
    });

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
        silo: {
            nome: "Silo",
            tipo: "dedicado",
            capacidadePorEdificio: 3000,
            categoriasPermitidas: "agrícolas secos",
        },

        camaraFria: {
            nome: "Câmara Fria",
            tipo: "dedicado",
            capacidadePorEdificio: 2000,
            categoriasPermitidas: "perecíveis",
        },

        campoDeEstocagem: {
            nome: "Campo De Estocagem",
            tipo: "variavel",
            capacidadePorEdificio: 1500,
            categoriasPermitidas: [
                "animais",
                "biomassa / orgânicos",
                "madeira", "celulose",
            ],
        },

        depositoDeResiduosOrganicos: {
            nome: "Depósito De Resíduos Orgânicos",
            tipo: "dedicado",
            capacidadePorEdificio: 1800,
            categoriasPermitidas: "biomassa / orgânicos",
        },

        // 🌲 RECURSOS NATURAIS / EXTRAÇÃO
        patioDeMineracao: {
            nome: "Pátio De Mineração",
            tipo: "dedicado",
            capacidadePorEdificio: 2200,
            categoriasPermitidas: "minério",
        },

        armazemMateriaisBrutos: {
            nome: "Armazém De Materiais Brutos",
            tipo: "dedicado",
            capacidadePorEdificio: 2400,
            categoriasPermitidas: "biomassa / orgânicos",
        },

        // 🛢️ FLUIDOS / ENERGIA
        tanqueFluidos: {
            nome: "Tanque De Armazenamento De Fluidos",
            tipo: "variavel",
            capacidadePorEdificio: 4000,
            categoriasPermitidas: ["fluidos", "químicos", "energia"],
        },

        centroColetaBiomassa: {
            nome: "Centro De Coleta De Biomassa",
            tipo: "dedicado",
            capacidadePorEdificio: 2000,
            categoriasPermitidas: "biomassa / orgânicos",
        },

        // ⚙️ INDÚSTRIA / MANUFATURA
        armazemIndustrial: {
            nome: "Armazém Industrial",
            tipo: "variavel",
            capacidadePorEdificio: 3000,
            categoriasPermitidas: [
                "componentes industriais",
                "componentes eletrônicos",
            ],
        },

        containerModular: {
            nome: "Container Modular",
            tipo: "variavel",
            capacidadePorEdificio: 1000,
            categoriasPermitidas: [
                "agrícolas secos",
                "componentes industriais",
                "produtos manufaturados",
                "fluidos",
            ],
        },

        // 🚚 LOGÍSTICA / COMÉRCIO
        centroDistribuicao: {
            nome: "Centro De Distribuição",
            tipo: "dedicado",
            capacidadePorEdificio: 3500,
            categoriasPermitidas: "produtos manufaturados",
        },

        armazemLogistico: {
            nome: "Armazém Logístico",
            tipo: "variavel",
            capacidadePorEdificio: 2500,
            categoriasPermitidas: [
                "produtos manufaturados",
                "bens de alto valor",
            ],
        },

        // 🚗 VEÍCULOS
        patioVeiculos: {
            nome: " Pátio De Veículos",
            tipo: "dedicado",
            capacidadePorEdificio: 3000,
            categoriasPermitidas: "veículos",
        },

        hangar: {
            nome: "Hangar",
            tipo: "dedicado",
            capacidadePorEdificio: 5000,
            categoriasPermitidas: "aeronaves",
        },

        // 💾 TECNOLOGIA / DADOS
        dataCenter: {
            nome: "Data Center",
            tipo: "dedicado",
            capacidadePorEdificio: 5000,
            categoriasPermitidas: "produtos digitais",
        },

        servidorNuvem: {
            nome: "Servidor em Nuvem",
            tipo: "dedicado",
            capacidadePorEdificio: 8000,
            categoriasPermitidas: "produtos digitais",
        },

        // ☢️ ALTA TECNOLOGIA / RISCO
        armazemMateriaisSensiveis: {
            nome: "Armazém Especializado de Materiais Sensíveis",
            tipo: "dedicado",
            capacidadePorEdificio: 1200,
            categoriasPermitidas: "materiais sensíveis",
        },
    };



    const storageQuantities = {
        silo: 5,
        hangar: 2,
        camaraFria: 5,
        campoDeEstocagem: 400,
        armazemLogistico: 5,
        armazemMateriaisSensiveis: 2,
        centroColetaBiomassa: 100,
        containerModular: 1,
        depositoDeResiduosOrganicos: 1,
        patioDeMineracao: 1,
        armazemMateriaisBrutos: 1,
        tanqueFluidos: 1,
        armazemIndustrial: 1,
        centroDistribuicao: 1,
        patioVeiculos: 1,
        dataCenter: 1,
        servidorNuvem: 1
    };


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
                capacidadeTotal:
                    quantidade * profile.capacidadePorEdificio,
            };
        });
    }, []);


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



    function startProduction({ formula, quantidade }) {
        // verificar estoque
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



    function checkProductionOverflow() {
        const overflows = [];

        productionQueue.forEach(prod => {
            if (prod.diasRestantes > 1) return;

            Object.entries(prod.output).forEach(([produtoId, qtd]) => {
                const product = productsCatalog[produtoId];
                if (!product) return;

                const categoria = product.categoriaFisica;
                const requiredSlots = qtd * product.slotSize;
                const usedNow =
                    usedSpaceByCategory[categoria] || 0;

const capacityTotal =
  (dedicatedCapacityByCategory[categoria] || 0) +
  (variableCapacityByCategory[categoria] || 0);



                const freeSlots = Math.max(capacityTotal - usedNow, 0);


                if (requiredSlots > freeSlots) {
                    const excessoSlots = requiredSlots - freeSlots;
                    const excessoQtd = Math.ceil(excessoSlots / product.slotSize);

                    const preco = getMarketPrice(produtoId,economiaSetores) || 0;
                    const valorVenda = excessoQtd * preco * 0.5;

                    overflows.push({
                        produtoId,
                        categoria,
                        quantidadeProduzida: qtd,
                        quantidadeArmazenavel: Math.floor(
                            freeSlots / product.slotSize
                        ),
                        quantidadeExcedente: excessoQtd,
                        valorVenda,
                    });
                }

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
            }}


        >
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    return useContext(GameContext);
}
