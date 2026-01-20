// useSalesContracts.js
import { useState } from "react";

export function useSalesContracts() {
  const [availableContracts, setAvailableContracts] = useState([]);
  const [activeContract, setActiveContract] = useState(null);

  function acceptContract(contract, removeProduct) {
    removeProduct(contract.productId, contract.quantidade);

    setActiveContract({
      ...contract,
      status: "em_andamento",
    });

    setAvailableContracts([]);
  }

  function processDay(onPayment) {
    if (!activeContract) return;

    if (activeContract.diasRestantes > 1) {
      setActiveContract(c => ({
        ...c,
        diasRestantes: c.diasRestantes - 1,
      }));
      return;
    }

    // pagamento
    onPayment(activeContract.valorTotal);

    setActiveContract({
      ...activeContract,
      status: "executado",
    });
  }

  return {
    availableContracts,
    setAvailableContracts,
    activeContract,
    acceptContract,
    processDay,
  };
}




const [salesContracts, setSalesContracts] = useState([]);
const sellingBuildingsConfig = {
  acougue: {
    id: "acougue",
    nome: "Açougue",
    categoriaEstoque: "perecíveis",
    produtosVendaveis: [
      "carneBovina",
      "frango",
      "carneSuina",
      "linguica",
    ],
    estoqueNativoPorUnidade: 1000, // kg
    multiplicadorDemanda: 5,
    ofertasPorNivel: {
      1: 4,
      2: 8,
      3: 12,
    },
    prazosPossiveis: [20, 30, 40, 50],
  },
};

function getNativeStorageCapacity(buildingId, quantidadePredios, nivel) {
  const config = sellingBuildingsConfig[buildingId];
  if (!config) return 0;

  const base = config.estoqueNativoPorUnidade * quantidadePredios;

  if (nivel === 1) return base;
  if (nivel === 2) return base * 1.1;
  if (nivel === 3) return base * 1.25;

  return base;
}

function generateSalesContracts({
  buildingId,
  quantidadePredios,
  nivel,
  economiaSetores,
}) {
  const config = sellingBuildingsConfig[buildingId];
  if (!config) return [];

  const ofertas = [];
  const quantidadeOfertas = config.ofertasPorNivel[nivel] || 4;

  for (let i = 0; i < quantidadeOfertas; i++) {
    const produtoId =
      config.produtosVendaveis[
        Math.floor(Math.random() * config.produtosVendaveis.length)
      ];

    const prazo =
      config.prazosPossiveis[
        Math.floor(Math.random() * config.prazosPossiveis.length)
      ];

    const quantidadeBase = 500;
    const quantidade =
      quantidadeBase * quantidadePredios;

    const precoUnitario = marketPrices[produtoId];
    const valorTotal = quantidade * precoUnitario;

    ofertas.push({
      id: crypto.randomUUID(),
      buildingId,
      produtoId,
      quantidade,
      precoUnitario,
      valorTotal,
      diasRestantes: prazo,
      status: "disponivel",
    });
  }

  return ofertas;
}

function acceptSalesContract(contractId) {
  setSalesContracts(prev => {
    const contract = prev.find(c => c.id === contractId);
    if (!contract || contract.status !== "disponivel") return prev;

    // estoque suficiente?
    if (!canAddProduct(contract.produtoId, -contract.quantidade)) {
      return prev;
    }

    // remove produto IMEDIATAMENTE
    removeProduct(contract.produtoId, contract.quantidade);

    return prev.map(c =>
      c.id === contractId
        ? { ...c, status: "emAndamento" }
        : c
    );
  });
}

function processarSalesContracts() {
  setSalesContracts(prev =>
    prev.map(c => {
      if (c.status !== "emAndamento") return c;

      if (c.diasRestantes > 1) {
        return { ...c, diasRestantes: c.diasRestantes - 1 };
      }

      // finaliza contrato
      atualizarEco("saldo", economiaSetores.saldo + c.valorTotal);

      return {
        ...c,
        diasRestantes: 0,
        status: "executado",
      };
    })
  );
}

useEffect(() => {
  processarTransacoesMercado();
  processarSalesContracts();
}, [dados.dia]);

const hasActiveContract = salesContracts.some(
  c => c.buildingId === "acougue" && c.status === "emAndamento"
);

if (hasActiveContract) return false;


// salesContractsConfig.js
export const CONTRACT_PERIODS = [20, 30, 40, 50];

export function generateButcherContracts({
  butcherCount,
  level,
  products,
  marketPrices,
}) {
  const contractsPerLevel = {
    1: 4,
    2: 8,
    3: 12,
  };

  const maxContracts = contractsPerLevel[level] || 4;

  return Array.from({ length: maxContracts }).map(() => {
    const product =
      products[Math.floor(Math.random() * products.length)];

    const period =
      CONTRACT_PERIODS[Math.floor(Math.random() * CONTRACT_PERIODS.length)];

    const baseQtyMap = {
      20: 500,
      30: 1000,
      40: 2500,
      50: 5000,
    };

    const quantity = baseQtyMap[period] * butcherCount;
    const price = marketPrices[product.id] || 0;

    return {
      id: crypto.randomUUID(),
      productId: product.id,
      produtoNome: product.nome,
      quantidade: quantity,
      diasTotais: period,
      diasRestantes: period,
      valorTotal: quantity * price,
      status: "disponivel", // disponivel | em_andamento | executado
    };
  });
}

salesContracts.processDay(valorRecebido => {
  setMoney(m => m + valorRecebido);
});


// ButcherShopPanel.jsx
import { useGame } from "../contexts/GameContext";
import { useSalesContracts } from "../systems/useSalesContracts";
import { generateButcherContracts } from "../systems/salesContractsConfig";
import { marketPrices } from "../components/MarketPrices";

export default function ButcherShopPanel({
  butcherCount,
  level,
  products,
}) {
  const {
    stock,
    getAvailableCapacity,
    removeProduct,
  } = useGame();

  const {
    availableContracts,
    setAvailableContracts,
    activeContract,
    acceptContract,
  } = useSalesContracts();

  function generateContracts() {
    const contracts = generateButcherContracts({
      butcherCount,
      level,
      products,
      marketPrices,
    });

    setAvailableContracts(contracts);
  }

  function canAccept(contract) {
    const estoque = stock[contract.productId] || 0;
    return estoque >= contract.quantidade;
  }

  return (
    <div className="panel">
      <h2>🥩 Açougue</h2>

      <p>
        Açougues: {butcherCount} | Nível: {level}
      </p>

      <p>
        Capacidade Perecíveis Disponível:{" "}
        {getAvailableCapacity("perecíveis")}
      </p>

      {activeContract ? (
        <div className="card active">
          <h3>Contrato em andamento</h3>
          <p>{activeContract.produtoNome}</p>
          <p>{activeContract.quantidade} kg</p>
          <p>Dias restantes: {activeContract.diasRestantes}</p>
          <p>Valor: ${activeContract.valorTotal}</p>
        </div>
      ) : (
        <>
          <button onClick={generateContracts}>
            Gerar Ofertas
          </button>

          <div className="contracts">
            {availableContracts.map(c => (
              <div
                key={c.id}
                className={`card ${
                  canAccept(c) ? "ok" : "blocked"
                }`}
              >
                <h4>{c.produtoNome}</h4>
                <p>{c.quantidade} kg</p>
                <p>Pagamento em {c.diasTotais} dias</p>
                <p>${c.valorTotal}</p>

                <button
                  disabled={!canAccept(c)}
                  onClick={() =>
                    acceptContract(c, removeProduct)
                  }
                >
                  Aceitar
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
