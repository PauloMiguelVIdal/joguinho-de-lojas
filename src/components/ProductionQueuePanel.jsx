import { useGame } from "../components/GameContext";
import ProductionQueueCard from "./ProductionQueueCard";
import { FORMULAS_EDIFICIOS } from "./productionFormulasConfig";
import { ListChecks } from "lucide-react";

export default function ProductionQueuePanel() {
  const { getSortedProductionQueue } = useGame();
  const productionQueue = getSortedProductionQueue();
  const allFormulas = FORMULAS_EDIFICIOS.flatMap(edificio => edificio.formulas);

  if (!productionQueue || productionQueue.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[1.5rem] p-4 text-center">
        <span className="text-white/30 font-bold uppercase tracking-widest text-[9px]">Fila Vazia</span>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-4 shadow-2xl">
      <div className="flex items-center gap-2 mb-4 ml-1">
        <ListChecks size={14} className="text-white/50" />
        <h2 className="text-white font-black uppercase tracking-[0.2em] text-[10px]">
          Fila de Processamento
        </h2>
      </div>

      {/* Container horizontal com scrollbar se transbordar */}
      <div className="flex flex-row flex-wrap gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {productionQueue.map(prod => {
          const formula = allFormulas.find(f => f.id === prod.formulaId);
          if (!formula) return null;

          return (
            <ProductionQueueCard
              key={prod.id}
              production={prod}
              formula={formula}
            />
          );
        })}
      </div>
    </div>
  );
}