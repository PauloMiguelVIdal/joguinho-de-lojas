import React from "react";
import { motion } from "framer-motion"
import { Localizador } from "./localizador";

const CampaignCard = ({ campanha, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between bg-[#C8A2F0] rounded-2xl p-6 mb-6"
    >
      {/* 🔹 Cartas aglomeradas à esquerda */}
      <div className="flex -space-x-6">
        {Array.from({ length: 5 }).map((_, i) => (
        <Localizador
            key={i}
           />
        ))}
      </div>

      {/* 🔹 Infos da campanha à direita */}
      <div className="flex flex-col items-center justify-center text-center w-[250px]">
        <h2 className="text-2xl font-bold mb-2">{campanha.nome}</h2>
        <p className="text-sm mb-4">{campanha.descricao}</p>
        <button
          onClick={() => onSelect(campanha.nome)}
          className="bg-gray-200 text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-300 active:scale-95"
        >
          Selecionar
        </button>
      </div>
    </motion.div>
  );
};

export default CampaignCard;
