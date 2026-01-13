import { createContext, useContext, useMemo, useState } from "react";
import { productsCatalog } from "../components/ProductCatalog";

const GameContext = createContext();

export function GameProvider({ children }) {
    /* =========================
       ESTOQUE
    ========================= */
    const [stock, setStock] = useState({
        trigo: 1200,
        soja: 300,
        combustivel: 400,
        biomassa: 200,
        aviao: 1,
    });

    /* =========================
       ARMAZENAMENTOS
    ========================= */
const storageBuildings = [
  {
    id: "silo",
    nome: "Silo",
    tipo: "dedicado",
    categoria: "grãos",
    capacidade: 5000,
  },
  {
    id: "silo",
    nome: "Silo",
    tipo: "dedicado",
    categoria: "grãos",
    capacidade: 5000,
  },
  {
    id: "hangar",
    nome: "Hangar",
    tipo: "dedicado",
    categoria: "aeronaves",
    capacidade: 5_000_000,
  },
  {
    id: "armazemVariavel",
    nome: "Armazém Variável",
    tipo: "variavel",
    capacidade: 1000,
    categoriasPermitidas: ["grãos", "fluidos", "biomassa"],
  },
];


    /* =========================
       CAPACIDADE DEDICADA
    ========================= */
    const dedicatedCapacityByCategory = useMemo(() => {
        const result = {};
        storageBuildings
            .filter(b => b.tipo === "dedicado")
            .forEach(b => {
                result[b.categoria] =
                    (result[b.categoria] || 0) + b.capacidade;
            });
        return result;
    }, []);

    /* =========================
       ARMAZÉM VARIÁVEL
    ========================= */
    const variableStorages = storageBuildings.filter(
        b => b.tipo === "variavel"
    );

    const variableStorageTotal = useMemo(
        () => variableStorages.reduce((s, b) => s + b.capacidade, 0),
        []
    );

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
        const result = {};

        Object.entries(stock).forEach(([id, qty]) => {
            const product = productsCatalog[id];
            if (!product) return;

            const used = qty * product.slotSize;
            const categoria = product.categoriaFisica;

            result[categoria] = (result[categoria] || 0) + used;
        });

        return result;
    }, [stock]);

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

        const variableRemaining = Math.max(
            variableStorageTotal - usedVariableStorage,
            0
        );

        const aceitaVariavel = variableStorages.some(v =>
            v.categoriasPermitidas.includes(categoria)
        );

        return aceitaVariavel
            ? dedicatedRemaining + variableRemaining
            : dedicatedRemaining;
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
        const capEspecifica =
            dedicatedCapacityByCategory[categoria] || 0;

        const excessoAtual = Math.max(usado - capEspecifica, 0);

        const variavelDisponivel = Math.max(
            variableStorageTotal - usedVariableStorage,
            0
        );

        const aceitaVariavel = variableStorages.some(v =>
            v.categoriasPermitidas.includes(categoria)
        );

        const capMax = aceitaVariavel
            ? capEspecifica + excessoAtual + variavelDisponivel
            : capEspecifica;

        return { usado, capEspecifica, capMax };
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
            }}


        >
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    return useContext(GameContext);
}
