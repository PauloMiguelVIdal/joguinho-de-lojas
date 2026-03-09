import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  ShoppingCart,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Clock,
  Activity,
  Database
} from "lucide-react";
import { productsCatalog } from "../components/ProductCatalog";
import { getMarketPrice } from "../components/TablePrice";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { useGame } from "../components/GameContext";
import QuantityModal from "./QuantityModal";


export default function MarketplaceSystem() {
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  const {
    stock,
    addProduct,
    removeProduct,
    canAddProduct,
    marketTransactions,
    setMarketTransactions,
    getMaxAddable,
    getMaxRemovable,
  } = useGame();





  const [mode, setMode] = useState("buy");
  const [selectedSector, setSelectedSector] = useState("all");
  const [openAccordions, setOpenAccordions] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalType, setModalType] = useState(null); // "buy" | "sell"







  const sectors = [
    { id: "all", name: "Todos", icon: "🌐" },
    { id: "agricultura", name: "Agricultura", icon: "🌾" },
    { id: "comercio", name: "Comércio", icon: "🛒" },
    { id: "industria", name: "Indústria", icon: "🏭" },
    { id: "tecnologia", name: "Tecnologia", icon: "💻" },
    { id: "imobiliario", name: "Imobiliário", icon: "🏗️" },
    { id: "energia", name: "Energia", icon: "⚡" },
  ];

  const saldoBancário = economiaSetores.saldo
  const diaAtual = dados.dia

  function atualizarSaldo(delta) {
    atualizarEco("saldo", economiaSetores.saldo + delta);
  }

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

  function confirmarCompra(produto, quantidade) {
    const preco = getMarketPrice(produto.id, economiaSetores);
    const valorTotal = preco * quantidade;

    if (economiaSetores.saldo < valorTotal) {
      alert("Saldo insuficiente");
      return;
    }

    atualizarSaldo(-valorTotal);

    setMarketTransactions(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        tipo: "buy",
        produtoId: produto.id,
        quantidade,
        valorTotal,
        diasRestantes: 10,
      },
    ]);
  }


  function podeComprar(produto) {
    const preco = getMarketPrice(produto.id, economiaSetores);
    const temSaldo = economiaSetores.saldo >= preco;
    const temEspaco = canAddProduct(produto.id, 1);

    return temSaldo && temEspaco;
  }


  function confirmarVenda(produto, quantidade) {
    const preco = getMarketPrice(produto.id, economiaSetores);
    const valorTotal = preco * quantidade;

    removeProduct(produto.id, quantidade);

    setMarketTransactions(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        tipo: "sell",
        produtoId: produto.id,
        quantidade,
        valorTotal,
        diasRestantes: 10,
      },
    ]);
  }




  // function processarTransacoesMercado() {
  //   setMarketTransactions(prev =>
  //     prev.flatMap(t => {
  //       if (t.diasRestantes > 1) {
  //         return [{ ...t, diasRestantes: t.diasRestantes - 1 }];
  //       }

  //       // Liquidação
  //       if (t.tipo === "buy") {
  //         addProduct(t.produtoId, t.quantidade);
  //       }

  //       if (t.tipo === "sell") {
  //         atualizarSaldo(+t.valorTotal);
  //       }

  //       return []; // remove transação concluída
  //     })
  //   );
  // }



  function MarketTransactionsPanel({ transactions }) {
    return (
      /* 1. Container Principal: h-auto para evitar cortes e mx-auto para centralizar se desejar */
      <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-[1.5rem] p-4 mb-6 min-h-[150px] w-full">

        <div className="flex items-center gap-2 text-white/60 mb-4 ml-1">
          <Activity size={16} />
          <h3 className="font-bold uppercase tracking-widest text-[11px]">
            Transações em Andamento
          </h3>
        </div>

        {transactions.length === 0 && (
          <p className="text-xs text-white/40 text-center py-4 italic">
            Nenhuma transação ativa no momento...
          </p>
        )}

        {/* 2. Container de Scroll: 
         - Usamos max-w-[900px] para limitar o tamanho no desktop.
         - w-full garante que ele ocupe o que for possível em telas menores.
         - overflow-x-auto habilita o scroll.
      */}
        <div className="flex gap-3 pb-2 scrollbar-custom overflow-x-auto w-full max-w-[900px] mx-auto">
          {transactions.map(t => {
            const p = productsCatalog[t.id] || productsCatalog[t.produtoId];
            return (

              <div
                key={t.id}
                className="flex-shrink-0 w-[500px] bg-white/5 border border-white/5 rounded-xl p-3 flex justify-between items-center h-[70px]"
              >
                <div className="flex gap-3 items-center">
                  <span className="flex-shrink-0 text-2xl bg-white/10 w-10 h-10 flex items-center justify-center rounded-lg border border-white/10">
                    {p?.icon || "📦"}
                  </span>
                  <div>
                    <p className="text-white font-bold text-sm uppercase tracking-tight">
                      {t.tipo === "buy" ? "Compra" : "Venda"} — {p?.nome}
                    </p>
                    <p className="text-[10px] font-bold text-white/40 uppercase">
                      {t.quantidade} {p?.unidade}
                    </p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="text-white font-black text-sm whitespace-nowrap">
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(t.valorTotal)}
                  </p>
                  <div className="inline-flex items-center gap-1 text-[9px] font-bold text-orange-400 uppercase">
                    <Clock size={10} /> {t.diasRestantes} dias
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }



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
    const { getCategoryStorageUI, usedVariableStorage, variableStorageTotal } = useGame();
    const categorias = ["grãos", "fluidos", "aeronaves", "perecíveis"];

    // return (
    //   <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-[1.5rem] p-5 mb-6">
    //     <div className="flex items-center gap-2 text-white/60 mb-4">
    //       <Database size={16} />
    //       <h3 className="font-bold uppercase tracking-widest text-[11px]">Capacidade de Armazenamento</h3>
    //     </div>

    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //       {categorias.map(cat => {
    //         const { usadoSlots, capDedicadaSlots, capMaxSlots } = getCategoryStorageUI(cat);
    //         if (capDedicadaSlots === 0 && usadoSlots === 0) return null;
    //         const percent = capMaxSlots > 0 ? Math.min((usadoSlots / capMaxSlots) * 100, 100) : 0;

    //         return (
    //           <div key={cat} className="space-y-1">
    //             <div className="flex justify-between text-[10px] font-bold uppercase text-white/70 px-1">
    //               <span>{cat}</span>
    //               <span>{usadoSlots.toFixed(1)} / {capMaxSlots} Slots</span>
    //             </div>
    //             <div className="h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
    //               <div 
    //                 className={`h-full transition-all duration-500 ${percent > 90 ? "bg-red-500" : percent > 70 ? "bg-yellow-500" : "bg-emerald-500"}`}
    //                 style={{ width: `${percent}%` }}
    //               />
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </div>
    // );
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
    <div
      style={{ backgroundColor: "#6411D9" }} // Um azul bem escuro ou preto
      className="h-full flex flex-col justify-between p-2 overflow-y-auto scrollbar-custom rounded-[20px] text-white animate-in fade-in duration-500"
    >
      {/* <h2 className="text-2xl font-black text-center mb-8 uppercase tracking-tighter">
      Mercado Global
    </h2> */}
      <MarketTransactionsPanel transactions={marketTransactions} />
      {/* BUY / SELL */}
      <div className="flex justify-center mb-8">
        <div className="bg-black/40 p-1.5 rounded-2xl flex border border-white/10 backdrop-blur-md">
          <button
            onClick={() => setMode("buy")}
            className={`px-8 py-2.5 rounded-xl flex gap-2 font-bold uppercase text-xs tracking-widest transition-all ${mode === "buy" ? "bg-blue-600 shadow-lg shadow-blue-900/40 text-white" : "text-white/40 hover:text-white"
              }`}
          >
            <ShoppingCart size={16} /> Comprar
          </button>
          <button
            onClick={() => setMode("sell")}
            className={`px-8 py-2.5 rounded-xl flex gap-2 font-bold uppercase text-xs tracking-widest transition-all ${mode === "sell" ? "bg-emerald-600 shadow-lg shadow-emerald-900/40 text-white" : "text-white/40 hover:text-white"
              }`}
          >
            <DollarSign size={16} /> Vender
          </button>
        </div>
      </div>

      {/* SETORES */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {sectors.map(s => (
          <button
            key={s.id}
            onClick={() => setSelectedSector(s.id)}
            className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${selectedSector === s.id
                ? "bg-white text-black border-white"
                : "bg-transparent text-white/60 border-white/20 hover:border-white/50"
              }`}
          >
            {s.name}
          </button>
        ))}
      </div>
      {mode === "buy" ? (
        <StoragePanel />
      ) : (
        <StockList />
      )}
      {/* LISTA */}
      {/* LISTA DE SETORES (ACCORDIONS) */}
      {/* CONTAINER DE ROLAGEM DOS PRODUTOS */}
      <div className="overflow-y-auto pr-2 scrollbar-custom h-[30%]" style={{
        height: '300px', // Use um valor fixo em pixels para garantir que o scroll funcione
        minHeight: '450px'
      }}>
        {Object.entries(filteredData).map(([sectorKey, items]) => {
          if (!items.length) return null;

          const sectorInfo = sectors.find(s => s.id === sectorKey);
          const isOpen = openAccordions[sectorKey];

          return (
            <div key={sectorKey} className="mb-4 group">
              {/* HEADER DO ACCORDION - Adicionado sticky para não perder o título ao rolar itens longos */}
              <button
                onClick={() => toggleAccordion(sectorKey)}
                className={`w-full px-5 py-4 flex justify-between items-center transition-all duration-300 rounded-[1.2rem] border sticky top-0 z-10 ${isOpen
                    ? "bg-[#1a1a1a] border-white/20 shadow-lg backdrop-blur-md"
                    : "bg-black/20 border-white/5 hover:bg-white/5 hover:border-white/10"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl opacity-80 group-hover:scale-110 transition-transform">
                    {sectorInfo?.icon}
                  </span>
                  <span className="font-bold uppercase tracking-[0.15em] text-[11px] text-white/90">
                    {sectorInfo?.name}
                  </span>
                </div>
                <div className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                  <ChevronDown size={18} className="text-white/40" />
                </div>
              </button>

              {/* CONTEÚDO DO ACCORDION */}
              {isOpen && (
                <div className="mt-2 space-y-2 animate-in slide-in-from-top-2 duration-300">
                  {items.map(p => {
                    const canBuy = podeComprar(p);

                    return (
                      <div
                        key={p.id}
                        className="bg-black/20 backdrop-blur-md border border-white/5 rounded-[1.2rem] p-4 flex justify-between items-center hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 text-2xl shadow-inner">
                            {p.icon}
                          </div>

                          <div>
                            <p className="font-black text-white uppercase text-sm tracking-tight leading-none mb-1">
                              {p.nome}
                            </p>
                            <div className="flex flex-col gap-0.5">
                              <p className="text-[10px] font-bold text-white/40 uppercase">
                                Disponível: <span className="text-white/70">{p.estoque} {p.unidade}</span>
                              </p>
                              <p className="text-[9px] font-medium text-blue-400/60 uppercase tracking-tighter italic">
                                Carga: {p.slotSize} slot{p.slotSize !== 1 ? "s" : ""} / {p.unidade}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-[10px] font-bold text-white/30 uppercase leading-none mb-1">Unitário</p>
                            <span className="font-black text-emerald-400 text-lg tracking-tighter">
                              {formatPrice(p.preco)}
                            </span>
                          </div>

                          {mode === "buy" ? (
                            <button
                              disabled={!canBuy}
                              onClick={() => {
                                setSelectedProduct(p);
                                setModalType("buy");
                              }}
                              className="h-10 px-6 bg-blue-600 hover:bg-blue-500 disabled:opacity-20 disabled:grayscale text-white rounded-xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-95 shadow-lg shadow-blue-900/20"
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
                              className="h-10 px-6 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-20 disabled:grayscale text-white rounded-xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-95 shadow-lg shadow-emerald-900/20"
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
      </div>
      {selectedProduct && (
        <QuantityModal
          isOpen={!!selectedProduct}
          productId={selectedProduct.id}
          title={
            modalType === "buy"
              ? `Comprar ${selectedProduct.nome}`
              : `Vender ${selectedProduct.nome}`
          }
          price={selectedProduct.preco}
          max={
            modalType === "buy"
              ? Math.min(
                getMaxAddable(selectedProduct.id),
                Math.floor(
                  economiaSetores.saldo /
                  getMarketPrice(selectedProduct.id, economiaSetores)
                )
              )
              : getMaxRemovable(selectedProduct.id)
          }
          onClose={() => setSelectedProduct(null)}
          onConfirm={qty => {
            if (modalType === "buy") {
              confirmarCompra(selectedProduct, qty);
            } else {
              confirmarVenda(selectedProduct, qty);
            }
            setSelectedProduct(null);
          }}
        />

      )}

    </div>
  );
}

