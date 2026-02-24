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
import { useGame } from "../components/GameContext";

export default function SidebarStorage() {
  const { getCategoryStorageUI, usedVariableStorage, variableStorageTotal } = useGame();
  const categorias = ["grãos", "fluidos", "aeronaves", "perecíveis"];


  return (
    <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-[1.5rem] p-5 mb-6">
      <div className="flex items-center gap-2 text-white/60 mb-4">
        <Database size={16} />
        <h3 className="font-bold uppercase tracking-widest text-[11px]">Capacidade de Armazenamento</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categorias.map(cat => {
          const { usadoSlots, capDedicadaSlots, capMaxSlots } = getCategoryStorageUI(cat);
          if (capDedicadaSlots === 0 && usadoSlots === 0) return null;
          const percent = capMaxSlots > 0 ? Math.min((usadoSlots / capMaxSlots) * 100, 100) : 0;

          return (
            <div key={cat} className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold uppercase text-white/70 px-1">
                <span>{cat}</span>
                <span>{usadoSlots.toFixed(1)} / {capMaxSlots} Slots</span>
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
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-[1.5rem] p-4 mb-6">
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
      
            <div className="space-y-2">
              {transactions.map(t => {
                const p = productsCatalog[t.id] || productsCatalog[t.produtoId];
                return (
                  <div key={t.id} className="bg-white/5 border border-white/5 rounded-xl p-3 flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                      <span className="text-2xl bg-white/10 w-10 h-10 flex items-center justify-center rounded-lg border border-white/10">
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
      
                    <div className="text-right">
                      <p className="text-white font-black text-sm">
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
    </div>
  );

}