import { useState } from "react";
import { Factory, ShoppingBag } from "lucide-react";
import HubManagement from "./HubManagement";
import HubSell from "./HubSell";
import ProductionQueuePanel from "./ProductionQueuePanel";
import SalesQueuePanel from "./SalesQueuePanel";

export default function GerenciamentoHub() {
  const [aba, setAba] = useState("producao");

  const tabs = [
    { id: "producao", label: "Produção", icon: <Factory size={15} /> },
    { id: "vendas",   label: "Vendas",   icon: <ShoppingBag size={15} /> },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-around gap-3">

      {/* FILA + TABS NA MESMA LINHA, MESMA ALTURA */}
      <div className="flex items-stretch gap-3">
        
        <div className="flex-1 min-w-0">
          {aba === "producao" && <ProductionQueuePanel />}
          {aba === "vendas"   && <SalesQueuePanel />}
        </div>

        <div className="flex flex-row gap-1.5 bg-white/5 border border-white/10 rounded-2xl p-1.5 self-stretch items-center">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setAba(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 px-3 h-full rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-200
                ${aba === tab.id
                  ? "bg-white text-[#350973] shadow-md"
                  : "text-white/50 hover:text-white hover:bg-white/10"
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {aba === "producao" && <HubManagement />}
      {aba === "vendas"   && <HubSell />}

    </div>
  );
}