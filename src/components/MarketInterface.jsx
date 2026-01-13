import React, { useContext, useMemo, useState } from "react";
import {
  ShoppingCart,
  DollarSign,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { productsCatalog } from "../components/ProductCatalog";
import { getMarketPrice } from "../components/TablePrice";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { useGame } from "../components/GameContext";
import QuantityModal from "./QuantityModal";


export default function MarketplaceSystem() {
  const { economiaSetores } = useContext(DadosEconomyGlobalContext);
  const { stock, addProduct, removeProduct, canAddProduct } =
    useGame();

  const [mode, setMode] = useState("buy");
  const [selectedSector, setSelectedSector] = useState("all");
  const [openAccordions, setOpenAccordions] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalType, setModalType] = useState(null); // "buy" | "sell"

  const {
    getMaxAddable,
    getMaxRemovable,

  } = useGame();


  const sectors = [
    { id: "all", name: "Todos", icon: "🌐" },
    { id: "agricultura", name: "Agricultura", icon: "🌾" },
    { id: "comercio", name: "Comércio", icon: "🛒" },
    { id: "industria", name: "Indústria", icon: "🏭" },
    { id: "tecnologia", name: "Tecnologia", icon: "💻" },
    { id: "imobiliario", name: "Imobiliário", icon: "🏗️" },
    { id: "energia", name: "Energia", icon: "⚡" },
  ];

  const marketData = useMemo(() => {
    const grouped = {};

    Object.values(productsCatalog).forEach(p => {
      if (!grouped[p.setor]) grouped[p.setor] = [];

      grouped[p.setor].push({
        ...p,
        preco: getMarketPrice(p.id, economiaSetores),
        estoque: stock[p.id] || 0,
      });
    });

    return grouped;
  }, [economiaSetores, stock]);

  const filteredData =
    selectedSector === "all"
      ? marketData
      : { [selectedSector]: marketData[selectedSector] || [] };

  const toggleAccordion = key => {
    setOpenAccordions(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const formatPrice = price =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);


  function StoragePanel() {
    const {
      getCategoryStorageUI,
      usedVariableStorage,
      variableStorageTotal,
    } = useGame();

    const categorias = ["grãos", "fluidos", "aeronaves", "biomassa"];

    return (
      <div className="bg-gray-100 rounded-xl p-4 mb-6">
        <h3 className="font-bold text-lg mb-4">
          Capacidade de Armazenamento
        </h3>

        {categorias.map(cat => {
          const { usado, capEspecifica, capMax } =
            getCategoryStorageUI(cat);

          if (capEspecifica === 0 && usado === 0) return null;

          const percent =
            capMax > 0 ? Math.min((usado / capMax) * 100, 100) : 0;

          return (
            <div key={cat} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="capitalize">{cat}</span>
                <span>
                  {usado} / {capEspecifica}
                  {capMax > capEspecifica && ` (${capMax})`}
                </span>
              </div>

              <div className="w-full h-3 bg-gray-300 rounded">
                <div
                  className={`h-3 rounded ${percent > 90
                      ? "bg-red-500"
                      : percent > 70
                        ? "bg-yellow-400"
                        : "bg-green-500"
                    }`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}

        <div className="mt-4 pt-3 border-t text-sm flex justify-between">
          <span>Armazém Variável</span>
          <span>
            {usedVariableStorage} / {variableStorageTotal}
          </span>
        </div>
      </div>
    );
  }

  function StockList() {
    const { stock } = useGame();

    const items = Object.entries(stock).filter(
      ([, qty]) => qty > 0
    );

    if (!items.length) return null;

    return (
      <div className="bg-gray-100 rounded-xl p-4 mb-6">
        <h3 className="font-bold text-lg mb-4">
          Produtos em Estoque
        </h3>

        {items.map(([id, qty]) => {
          const p = productsCatalog[id];
          if (!p) return null;

          return (
            <div
              key={id}
              className="flex justify-between py-2 border-b last:border-b-0"
            >
              <span>
                {p.icon} {p.nome}
              </span>
              <span className="font-semibold">
                {qty}
              </span>
            </div>
          );
        })}
      </div>
    );
  }



  return (
    <div className="bg-white p-6 rounded-xl shadow flex-1 overflow-y-auto scrollbar-custom rounded-[10px] h-full">
      <h2 className="text-3xl font-bold text-center mb-6">
        Mercado Global
      </h2>

      {/* BUY / SELL */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-200 p-1 rounded-lg flex">
          <button
            onClick={() => setMode("buy")}
            className={`px-6 py-2 rounded-lg flex gap-2 ${mode === "buy" ? "bg-blue-500 text-white" : ""
              }`}
          >
            <ShoppingCart /> Comprar
          </button>
          <button
            onClick={() => setMode("sell")}
            className={`px-6 py-2 rounded-lg flex gap-2 ${mode === "sell" ? "bg-green-500 text-white" : ""
              }`}
          >
            <DollarSign /> Vender
          </button>
        </div>
      </div>

      {/* SETORES */}
      <div className="flex flex-wrap justify-center gap-2 mb-6 ">
        {sectors.map(s => (
          <button
            key={s.id}
            onClick={() => setSelectedSector(s.id)}
            className={`px-4 py-2 rounded-lg ${selectedSector === s.id
                ? "bg-indigo-600 text-white"
                : "bg-gray-100"
              }`}
          >
            {s.icon} {s.name}
          </button>
        ))}
      </div>
      {mode === "buy" ? (
        <StoragePanel />
      ) : (
        <StockList />
      )}
      {/* LISTA */}
      {Object.entries(filteredData).map(([sectorKey, items]) => {
        if (!items.length) return null;

        const sectorInfo = sectors.find(s => s.id === sectorKey);
        const isOpen = openAccordions[sectorKey];

        return (
          <div key={sectorKey} className="mb-6">
            <button
              onClick={() => toggleAccordion(sectorKey)}
              className="w-full px-4 py-3 bg-gray-100 rounded-lg flex justify-between"
            >
              <span className="font-semibold flex gap-2">
                {sectorInfo?.icon} {sectorInfo?.name}
              </span>
              {isOpen ? <ChevronUp /> : <ChevronDown />}
            </button>

            {isOpen && (
              <div className="border rounded-lg mt-2">
                {items.map(p => {
                  const canBuy = canAddProduct(p.id, 1);

                  return (
                    <div
                      key={p.id}
                      className="flex justify-between p-4 border-b"
                    >
                      <div>
                        <p className="font-semibold">
                          {p.icon} {p.nome}
                        </p>
                        <p className="text-sm text-gray-500">
                          Estoque: {p.estoque} {p.unidade}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-bold text-green-600">
                          {formatPrice(p.preco)}
                        </span>

                        {mode === "buy" ? (
                          <button
                            disabled={!canBuy}
                            onClick={() => {
                              setSelectedProduct(p);
                              setModalType("buy");
                            }}
                            className="bg-blue-500 disabled:opacity-40 text-white px-4 py-2 rounded-lg"
                          >
                            Comprar
                          </button>

                        ) : (
                          <button
                            disabled={p.estoque <= 0}
                            onClick={() => {
                              setSelectedProduct(p);
                              setModalType("sell");
                            }}
                            className="bg-green-500 disabled:opacity-40 text-white px-4 py-2 rounded-lg"
                          >
                            Vender
                          </button>

                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
      {selectedProduct && (
  <QuantityModal
    isOpen={!!selectedProduct}
    title={
      modalType === "buy"
        ? `Comprar ${selectedProduct.nome}`
        : `Vender ${selectedProduct.nome}`
    }
    price={selectedProduct.preco}
    max={
      modalType === "buy"
        ? getMaxAddable(selectedProduct.id)
        : getMaxRemovable(selectedProduct.id)
    }
    onClose={() => setSelectedProduct(null)}
    onConfirm={qty => {
      if (modalType === "buy") {
        addProduct(selectedProduct.id, qty);
      } else {
        removeProduct(selectedProduct.id, qty);
      }
      setSelectedProduct(null);
    }}
  />
)}

    </div>
  );
}

