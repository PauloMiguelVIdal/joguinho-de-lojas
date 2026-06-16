import React from "react";
import { motion } from "framer-motion";
import { CircleHelp } from 'lucide-react';

export default function MisteryCard({ quantidade = 0 }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative w-[220px] h-[320px] rounded-[25px] overflow-hidden border border-white/10 shadow-2xl flex flex-col items-center justify-between p-6 group"
      style={{
        background: `linear-gradient(135deg, #1a0b35 0%, #290064 50%, #6A00FF 100%)`,
      }}
    >
      {/* Efeito de brilho interno (Glow) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent pointer-events-none" />
      
      {/* Icone Central com animação */}
      <div className="flex-1 flex items-center justify-center relative">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="bg-white/5 p-6 rounded-full backdrop-blur-md border border-white/20 shadow-[0_0_30px_rgba(106,0,255,0.4)]"
        >
          <CircleHelp color="#FFFFFF" size={56} strokeWidth={1.5} />
        </motion.div>
      </div>

      {/* Badge de Quantidade - Estilo Painel de Controle */}
      <div className="w-full bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl py-3 px-2 flex flex-col items-center shadow-inner">
        <span className="text-[10px] text-white/40 uppercase font-bold tracking-[0.2em] mb-1">Conteúdo Extra</span>
        <h2 className="text-white text-xl font-black tracking-tight">
          + {quantidade} <span className="text-[14px] font-medium opacity-80">EDIFÍCIOS</span>
        </h2>
      </div>

      {/* Reflexo de vidro na borda superior */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </motion.div>
  );
}