import { productsCatalog } from "./TablePrice";
import { Clock } from "lucide-react";

export default function SalesQueueCard({ sale }) {
  if (!sale) return null;


const produtoId = sale.productId || sale.produtoId || sale.produto;
  const produtoInfo = productsCatalog[produtoId];
  
  const progresso = sale.duracaoInicial > 0 
    ? ((sale.duracaoInicial - sale.diasRestantes) / sale.duracaoInicial) * 100 
    : 0;

  // Urgência baseada nos dias restantes
  const { bgGradient, barColor, badge } = sale.diasRestantes <= 3
    ? { bgGradient: "from-red-900 to-red-700",   barColor: "bg-red-400",    badge: "🔴 Urgente" }
    : sale.diasRestantes <= 10
    ? { bgGradient: "from-yellow-900 to-yellow-700", barColor: "bg-yellow-400", badge: "🟡 Em breve" }
    : { bgGradient: "from-green-900 to-green-700",  barColor: "bg-green-400",  badge: null };

  return (
    <div className={`bg-gradient-to-br ${bgGradient} rounded-2xl p-3 min-w-[170px] relative overflow-hidden border border-white/10 shadow-xl`}>
      
      {badge && (
        <span className="absolute top-2 right-2 text-[8px] font-black bg-black/30 px-2 py-0.5 rounded-full text-white">
          {badge}
        </span>
      )}

      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-[8px] text-white/50 uppercase font-bold tracking-tighter">Contrato Ativo</p>
          <h4 className="text-white font-black text-[11px] uppercase leading-none">
            {produtoInfo?.nome || "Produto"}
          </h4>
        </div>
        <span className="text-lg">{produtoInfo?.icon}</span>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <p className="text-yellow-400 font-black text-xs">
            ${Number(sale.valorTotal).toLocaleString()}
          </p>
          <div className="flex items-center gap-1 text-white/70 text-[9px] font-bold">
            <Clock size={10} />
            <span>{sale.diasRestantes}d restantes</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[8px] text-white/40 uppercase">Qtd</p>
          <p className="text-white font-bold text-[10px]">{sale.quantidade}</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/30">
        <div 
          className={`h-full ${barColor} transition-all duration-1000`}
          style={{ width: `${progresso}%` }}
        />
      </div>
    </div>
  );
}