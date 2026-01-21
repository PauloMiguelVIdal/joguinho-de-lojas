import { productsCatalog } from "./TablePrice";
import { Clock, Package } from "lucide-react";
import { FORMULAS_EDIFICIOS } from "./productionFormulasConfig";
import { useMemo } from "react";

export default function ProductionQueueCard({ production, formula }) {
  if (!production) return null;

  // Encontra o setor do edifício ao qual esta fórmula pertence
  const setorInfo = useMemo(() => {
    const setores = [
      { id: "agricultura", cor1: "#003816", cor3: "#0C9123" },
      { id: "tecnologia", cor1: "#A64B00", cor3: "#FF6F00" },
      { id: "industria", cor1: "#1A1A1A", cor3: "#808080" },
      { id: "comercio", cor1: "#660000", cor3: "#E60000" },
      { id: "imobiliario", cor1: "#000066", cor3: "#3333CC" },
      { id: "energia", cor1: "#665200", cor3: "#E6B800" },
    ];
    
    const edificio = FORMULAS_EDIFICIOS.find(e => 
      e.formulas.some(f => f.id === formula.id)
    );
    
    return setores.find(s => s.id === edificio?.setor) || setores[2];
  }, [formula.id]);

  const urgencyColor = production.diasRestantes <= 2 ? "#ff4d4d" : production.diasRestantes <= 5 ? "#ffb84d" : "#2ecc71";

  return (
    <div 
      style={{ background: `linear-gradient(135deg, ${setorInfo.cor1} 0%, ${setorInfo.cor3} 100%)` }}
      className="rounded-2xl p-4 relative overflow-hidden shadow-lg border border-white/10 transition-transform hover:scale-[1.01]"
    >
      {/* Barra de Urgência */}
      <div 
        className="absolute top-0 left-0 h-1" 
        style={{ width: '100%', backgroundColor: urgencyColor }}
      />

      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="text-white font-black text-[10px] uppercase tracking-wider">
            {formula?.nome || "Produção"}
          </h4>
          <div className="flex items-center gap-1.5 mt-1 text-white">
            <Clock size={12} style={{ color: urgencyColor }} />
            <span className="font-bold text-xs">
              {production.diasRestantes}d restantes
            </span>
          </div>
        </div>
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: urgencyColor }} />
      </div>

      <div className="bg-black/30 rounded-xl p-2 border border-white/5">
        <ul className="space-y-1">
          {Object.entries(production.output || {}).map(([produtoId, qtd]) => {
            const produto = productsCatalog[produtoId];
            return (
              <li key={produtoId} className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{produto?.icon}</span>
                  <span className="text-[9px] font-bold uppercase opacity-80">{produto?.nome}</span>
                </div>
                <span className="font-black text-[10px]">+{qtd}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}