import React, { useState, useEffect } from "react";
import { useGame } from "../components/GameContext";
import { productsCatalog } from "../components/ProductCatalog";
import { X, Package, Clock, Calculator } from "lucide-react"; // Assumindo que usa lucide-react

export default function QuantityModal({
  isOpen,
  onClose,
  onConfirm,
  max,
  price,
  title,
  productId,
}) {
  const product = productsCatalog[productId];
  const [qty, setQty] = useState(1);
  const { getMaxAddable } = useGame();

  useEffect(() => {
    if (isOpen) setQty(1);
  }, [isOpen]);

  if (!isOpen) return null;

  const total = qty * price;
  const isBuy = title.toLowerCase().includes("comprar");

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] animate-in fade-in duration-300">
      <div className="bg-[#0a0a0a]/90 border border-white/10 rounded-[2rem] p-8 w-[450px] shadow-2xl relative overflow-hidden">
        
        {/* Efeito de Gradiente no fundo do Modal */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[100px]" />
        
        {/* HEADER */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-white font-black uppercase tracking-tighter text-2xl leading-none">
              {title}
            </h3>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">
              Confirmação de Operação
            </p>
          </div>
          <button onClick={onClose} className="text-white/20 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* CARD DO PRODUTO */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-4 mb-6 flex items-center gap-4">
          <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center text-3xl border border-white/10 shadow-inner">
            {product?.icon}
          </div>
          <div>
            <p className="text-white font-bold uppercase text-sm leading-none">{product?.nome}</p>
            <p className="text-[10px] text-white/40 font-bold uppercase mt-1">
              {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} / {product?.unidade}
            </p>
          </div>
        </div>

        {/* CONTROLES DE QUANTIDADE */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQty(q => Math.max(1, q - 1))}
              className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all active:scale-90"
            >
              -
            </button>
            
            <div className="flex-1 relative">
              <input
                type="number"
                min={1}
                max={max}
                value={qty}
                onChange={e => setQty(Math.min(max, Math.max(1, Number(e.target.value))))}
                className="w-full h-12 bg-black/40 border border-white/10 rounded-xl text-center text-white font-black text-lg focus:outline-none focus:border-blue-500/50 transition-colors"
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <span className="text-[9px] font-black text-white/20 uppercase">{product?.unidade}</span>
              </div>
            </div>

            <button
              onClick={() => setQty(q => Math.min(max, q + 1))}
              className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all active:scale-90"
            >
              +
            </button>
            
            <button
              onClick={() => setQty(max)}
              className="h-12 px-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white font-black text-[10px] uppercase tracking-tighter transition-all active:scale-95"
            >
              MAX
            </button>
          </div>

          {/* INFO DE LOGÍSTICA */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3">
              <div className="flex items-center gap-2 text-white/30 mb-1">
                <Package size={12} />
                <span className="text-[9px] font-black uppercase">Espaço Total</span>
              </div>
              <p className="text-white font-bold text-xs">
                {(qty * product.slotSize).toFixed(1)} <span className="text-[9px] text-white/40">SLOTS</span>
              </p>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3">
              <div className="flex items-center gap-2 text-white/30 mb-1">
                <Clock size={12} />
                <span className="text-[9px] font-black uppercase">Entrega</span>
              </div>
              <p className="text-white font-bold text-xs">10 Dias</p>
            </div>
          </div>
        </div>

        {/* TOTAL BOX */}
        <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-4 mb-8">
          <div className="flex justify-between items-center text-[10px] font-bold text-blue-400/60 uppercase tracking-widest mb-1">
            <span>Investimento Total</span>
            <Calculator size={12} />
          </div>
          <div className="text-2xl font-black text-white tracking-tighter">
            {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(total)}
          </div>
        </div>

        {/* AÇÕES */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            className="py-4 bg-transparent border border-white/10 hover:bg-white/5 text-white/60 hover:text-white rounded-2xl font-bold uppercase text-[10px] tracking-widest transition-all"
          >
            Cancelar
          </button>
          <button
            disabled={qty <= 0}
            onClick={() => onConfirm(qty)}
            className={`py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-lg active:scale-95 disabled:opacity-20 ${
              isBuy 
                ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/40" 
                : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40"
            }`}
          >
            Confirmar Ordem
          </button>
        </div>
      </div>
    </div>
  );
}