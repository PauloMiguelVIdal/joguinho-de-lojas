import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { CircleQuestionMark,Plus  } from 'lucide-react';
export default function MisteryCard({quantidade = 0 }) {
  const setores = [
    {
      id: "grafico",
      corClasse: "bg-[#6A00FF]",
      cor1: "#290064 ",
      cor2: "#350973 ",
      cor3: "#6411D9 ",
      cor4: "#8F5ADA ",
    },
  ];

  const setorInfo = setores.find((setor) => setor.id === "grafico");

  return (
    <motion.div
      style={{
        background: `transparent`, // fundo transparente para o container principal
      }}
      className="w-[215px] h-[230px] rounded-[20px] flex flex-col justify-center items-center shadow-lg perspective z-[2] cursor-pointer absolute"
      initial={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      {/* Camada de fundo com opacidade */}
      <div
        className="absolute inset-0 rounded-[20px] z-0"
        style={{
          background: `linear-gradient(135deg, ${setorInfo.cor1} 0%, ${setorInfo.cor2} 70%, ${setorInfo.cor4} 100%)`,
          opacity: 0.9,
        }}
      />

      {/* Container do Card */}
      <motion.div
        className="relative flex justify-center items-center w-full h-full z-[2]"
        //   animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <div
          style={{ backgroundColor: setorInfo.cor1 }}
          className="h-[40%] flex justify-center items-center aspect-square rounded-[20px] relative z-[2]"
        >
          <div
            style={{ backgroundColor: setorInfo.cor3 }}
            className="flex items-center justify-center h-[95%] aspect-square rounded-[20px] absolute z-[2]"
          >
            <div
              style={{ backgroundColor: setorInfo.cor1 }}
              className="flex items-center justify-center h-[95%] aspect-square rounded-[20px] absolute z-[2]"
            >
              <div
                style={{ backgroundColor: setorInfo.cor2 }}
                className="flex items-center justify-center h-[95%] aspect-square rounded-[30px] absolute z-[2]"
              >
                <div
                  style={{
                    background: `linear-gradient(135deg, ${setorInfo.cor1} 0%, ${setorInfo.cor4} 100%)`,
                  }}
                  className="flex items-center justify-center h-[95%] aspect-square rounded-[60px] absolute z-[2] relative"
                >
                  <div className="h-[70%] aspect-square absolute" /><CircleQuestionMark color="#FFFFFF" size={48}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="w-[150px] h-[90px] bg-white/10 relative bottom-[40px] flex justify-center items-center rounded-[20px]"> 
      <h2 className="text-white text-[20px] ">+ {quantidade}  Edifícios</h2>
      </div>
    </motion.div>
  );
}
