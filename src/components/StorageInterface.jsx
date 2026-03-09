import { useMemo, useContext } from "react";
import { useGame } from "../components/GameContext";
import { productsCatalog } from "../components/ProductCatalog";
import { getMarketPrice } from "../components/TablePrice";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { Database, TrendingUp, Package, Building2, AlertTriangle } from "lucide-react";

export default function StorageInterface() {
  const {
    stock,
    getCategoryStorageUI,
    usedVariableStorage,
    variableStorageTotal,
    storageBuildings,
    potentialCapacityByCategory,
    getStockPredictionReport
  } = useGame();
  const { economiaSetores } = useContext(DadosEconomyGlobalContext);

  const categorias = useMemo(() => {
    return [...new Set(Object.values(productsCatalog).map(p => p.categoriaFisica))];
  }, []);

const edifícioStorage = ['Armazém','Silo','Campo De Estocagem','Armazém De Materiais Brutos','Pátio De Mineração','Servidor Em Nuvem','Data Center','Container Modular','Pátio De Veículos','Armazém Industrial','Câmara Fria','Centro De Distribuição','Armazém Logístico',' Pátio De Veículos','Hangar','Armazém Especializado de Materiais Sensíveis']


  const stockedProducts = useMemo(() => {
    return Object.entries(stock)
      .map(([id, qty]) => ({
        id,
        qty,
        product: productsCatalog[id],
      }))
      .filter(p => p.product && p.qty > 0);
  }, [stock]);

  const totalStockValue = useMemo(() => {
    return stockedProducts.reduce((total, { id, qty }) => {
      const price = getMarketPrice(id, economiaSetores);
      return total + qty * price;
    }, 0);
  }, [stockedProducts, economiaSetores]);

  const predictionReport = useMemo(() => getStockPredictionReport(), [stock, getStockPredictionReport]);

  const formatNumber = v => new Intl.NumberFormat("pt-BR").format(v);
  const formatMoney = v => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

  return (
    <div
      style={{ backgroundColor: "#6411D9" }}
      className="h-full p-5 overflow-y-auto scrollbar-custom rounded-[20px] text-white animate-in fade-in duration-500"
    >
      <h2 className="text-xl font-black text-center mb-5 uppercase tracking-tighter">
        Centro de Logística
      </h2>

      {/* REDUZIDO DE space-y-6 PARA space-y-3 */}
      <div className="space-y-3">

        {/* =========================
            CAPACIDADE POR CATEGORIA
        ========================= */}
        <section className="bg-black/20 backdrop-blur-md border border-white/10 rounded-[1.2rem] p-4">
          <div className="flex items-center gap-2 text-white/60 mb-3">
            <Database size={14} />
            <h3 className="font-bold uppercase tracking-widest text-[10px]">Capacidade</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            {categorias.map(cat => {
              const ui = getCategoryStorageUI(cat);
              const potential = potentialCapacityByCategory[cat];
              if (!potential) return null;

              const usadoSlots = ui.usadoSlots ?? 0;
              const capMaxSlots = (potential.dedicada ?? 0) + (potential.variavel ?? 0);
              const percent = capMaxSlots > 0 ? Math.min((usadoSlots / capMaxSlots) * 100, 100) : 0;

              return (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-[9px] font-bold uppercase text-white/70 px-1">
                    <span>{cat}</span>
                    <span>{usadoSlots.toFixed(1)} / {capMaxSlots}</span>
                  </div>
                  <div className="h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                    <div
                      className={`h-full transition-all duration-500 ${percent > 90 ? "bg-red-500" : percent > 70 ? "bg-yellow-500" : "bg-emerald-500"}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 pt-2 border-t border-white/5 text-[9px] font-bold uppercase text-white/40 flex justify-between italic">
            <span>Armazém Variável Geral</span>
            <span className="text-white/70">{usedVariableStorage} / {variableStorageTotal} SLOTS</span>
          </div>
        </section>

        {/* =========================
            📈 PREVISÃO DE PRODUÇÃO (Gaps reduzidos)
        ========================= */}
        <section className="space-y-2">
          {predictionReport.map(item => (
            <div key={item.produtoId} className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-black uppercase text-xs">{item.nome}</span>
                </div>
                <span className="bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded text-[9px] font-black">
                  +{item.totalQtd}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[9px] font-bold uppercase text-white/40">
                <div className="bg-black/20 p-1.5 rounded-lg">
                  <p className="text-white/30">Slots</p>
                  <p className="text-white text-[10px]">{item.totalSlots}</p>
                </div>
                <div className="bg-black/20 p-1.5 rounded-lg text-right">
                  <p className="text-white/30">Estimado</p>
                  <p className="text-emerald-400 text-[10px]">{formatMoney(item.valorEstimado)}</p>
                </div>
              </div>

              {item.excessoQtd > 0 && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 p-1.5 rounded-lg text-red-400 text-[9px] font-bold uppercase">
                  <AlertTriangle size={12} />
                  <span>Perda de {item.excessoQtd} unid.</span>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* =========================
            INVENTÁRIO ATUAL (Scroll Compacto)
        ========================= */}
        <section className="bg-black/20 backdrop-blur-md border border-white/10 rounded-[1.2rem] p-4 flex flex-col">
          <div className="flex items-center gap-2 text-white/60 mb-3 flex-none">
            <Package size={14} />
            <h3 className="font-bold uppercase tracking-widest text-[10px]">Inventário</h3>
          </div>

          <div className="h-[300px] overflow-y-auto scrollbar-custom pr-2 space-y-1.5">
            {stockedProducts.length === 0 ? (
              <p className="text-[9px] text-white/30 uppercase text-center py-2 italic">Vazio</p>
            ) : (
              stockedProducts.map(({ id, qty, product }) => (
                <div key={id} className="bg-white/5 border border-white/5 rounded-lg p-2 flex justify-between items-center hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 bg-black/20 rounded-md flex items-center justify-center border border-white/10 text-lg">
                      {product.icon}
                    </span>
                    <div>
                      <p className="font-black uppercase text-[10px] leading-none mb-0.5">{product.nome}</p>
                      <p className="text-[8px] font-bold text-white/20 uppercase italic">
                        {product.categoriaFisica}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-xs leading-none">
                      {formatNumber(qty)} <span className="text-[8px] text-white/30 font-normal">{product.unidade}</span>
                    </p>
                    <p className="text-[9px] font-bold text-emerald-400/60">
                      {formatMoney(qty * getMarketPrice(id, economiaSetores))}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center flex-none">
            <span className="font-bold uppercase text-[9px] text-white/40 tracking-widest">Total Ativo</span>
            <span className="font-black text-lg text-emerald-400 tracking-tighter">
              {formatMoney(totalStockValue)}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}