import { useGame } from "../components/GameContext";
import SalesQueueCard from "./SalesQueueCard";
import { SALES_EDIFICIOS } from "./salesFormulasConfig";
import { BadgeDollarSign } from "lucide-react";
import { useMemo } from "react";

export default function SalesQueuePanel() {
  const { sellQueue } = useGame();
  console.log("sellQueue no painel:", sellQueue); // ← adicione isso

  const allSalesFormulas = useMemo(() =>
    SALES_EDIFICIOS.flatMap(edificio => edificio.formulas),
  []);

  // Ordena por diasRestantes (mais urgente primeiro)
  const sellQueueOrdenada = useMemo(() =>
    [...(sellQueue || [])].sort((a, b) => a.diasRestantes - b.diasRestantes),
  [sellQueue]);

  if (!sellQueueOrdenada.length) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[1.5rem] p-4 text-center">
        <span className="text-white/30 font-bold uppercase tracking-widest text-[9px]">
          Sem vendas em progresso
        </span>
      </div>
    );
  }

  return (
    <div className="bg-green-900/10 backdrop-blur-2xl border border-green-500/20 rounded-[10px] p-0 shadow-2xl">
      <div className="flex items-center justify-between mb-4 ml-1">
        <div className="flex items-center gap-2">
          {/* <BadgeDollarSign size={14} className="text-green-500" />
          <h2 className="text-white font-black uppercase tracking-[0.2em] text-[10px]">
            Contratos Comerciais
          </h2> */}
        </div>
        {/* <span className="text-[9px] font-bold text-white/40 bg-white/5 px-3 py-1 rounded-full">
          {sellQueueOrdenada.length} ativo{sellQueueOrdenada.length > 1 ? "s" : ""}
        </span> */}
      </div>

      <div className="flex flex-row flex-wrap gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {sellQueueOrdenada.map(sale => {
          const formulaOriginal = allSalesFormulas.find(f => f.id === sale.formulaId);

          // Urgência visual baseada em diasRestantes
          const urgencia = sale.diasRestantes <= 3 ? "border-red-500/40 bg-red-900/10"
                         : sale.diasRestantes <= 10 ? "border-yellow-500/40 bg-yellow-900/10"
                         : "border-green-500/20 bg-green-900/5";

          return (
            <div key={sale.id} className={`border rounded-xl px-1 ${urgencia}`}>
              <SalesQueueCard
                sale={sale}
                formula={formulaOriginal}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}