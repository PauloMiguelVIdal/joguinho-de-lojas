// SellCard.jsx
import { useGame } from "./GameContext";
import { productsCatalog } from "./TablePrice";
import { Clock, Box, TrendingUp } from "lucide-react";
import React, { useState } from "react";

export default function SellCard({ contrato, edificio }) {
  const { stock, startSale, sellQueue } = useGame();
   const [aceito, setAceito] = useState(false); 
  const produtoInfo = productsCatalog[contrato.productId];
  const estoqueAtual = stock[contrato.productId] || 0;
  


  const podeVender = estoqueAtual >= contrato.quantidade;

  return (
    <div className="p-5 flex flex-col h-full justify-between">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-white font-black text-lg uppercase">{produtoInfo?.nome}</h3>
          <span className="text-[10px] text-green-400 font-bold">Margem: +{contrato.margemAplicada}%</span>
        </div>
        <span className="text-3xl">{produtoInfo?.icon}</span>
      </div>

      <div className="my-4 space-y-2 bg-black/20 p-3 rounded-xl border border-white/5">
        <div className="flex justify-between text-[11px]">
          <span className="text-white/50 uppercase">Demanda:</span>
          <span className={`font-bold ${podeVender ? 'text-white' : 'text-red-400'}`}>
            {contrato.quantidade} / {estoqueAtual} un
          </span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-white/50 uppercase">Pagamento:</span>
          <span className="text-yellow-400 font-black">${contrato.valorTotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-white/50 uppercase">Prazo:</span>
          <span className="text-white font-bold flex items-center gap-1">
            <Clock size={10} /> {contrato.prazoDias} dias
          </span>
        </div>
      </div>

<button
  onClick={() => {
    startSale(contrato);
    setAceito(true);
  }}
  disabled={!podeVender || aceito}
  className={`w-full py-3 rounded-2xl font-bold text-xs uppercase transition-all ${
    aceito
      ? "bg-yellow-400/10 text-yellow-400 cursor-not-allowed border border-yellow-400/30"
      : podeVender 
        ? "bg-white text-black hover:bg-green-400 active:scale-95" 
        : "bg-white/5 text-white/20 cursor-not-allowed"
  }`}
>
  {aceito ? "⚖️ Contrato em Vigor" : podeVender ? "Assinar Contrato" : "Estoque Insuficiente"}
</button>
    </div>
  );
}