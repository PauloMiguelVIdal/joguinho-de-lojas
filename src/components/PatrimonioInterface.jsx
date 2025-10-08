import React, { useState, useEffect, useContext, useRef } from 'react';
import agricultura from "./setores/agricultura.png";
import tecnologia from "./setores/tecnologia.png";
import comercio from "./setores/comercio.png";
import industria from "./setores/industria.png";
import imobiliario from "./setores/Imobiliário.png";
import energia from "./setores/torre-eletrica.png";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
const PatrimonioInterface = () => {
  const { dados } = useContext(CentraldeDadosContext);
  const { economiaSetores, atualizarEco, atualizarEcoCallback } = useContext(DadosEconomyGlobalContext);

const patrimonio = economiaSetores.patrimonio

  const investmentData = [
    { id: 1, value: "2 345 012,00", bgColor: "bg-gradient-to-r from-green-500 to-green-600", icon: agricultura },
    { id: 2, value: "2 345 012,00", bgColor: "bg-gradient-to-r from-orange-500 to-orange-600", icon: tecnologia },
    { id: 3, value: "2 345 012,00", bgColor: "bg-gradient-to-r from-gray-500 to-gray-600", icon: industria },
    { id: 4, value: "2 345 012,00", bgColor: "bg-gradient-to-r from-red-500 to-red-600", icon: comercio },
    { id: 5, value: "2 345 012,00", bgColor: "bg-gradient-to-r from-blue-500 to-blue-600", icon: imobiliario },
    { id: 6, value: "2 345 012,00", bgColor: "bg-gradient-to-r from-yellow-500 to-yellow-600", icon: energia },
  ];

  return (
    <div className="h-[600px] flex items-center justify-center w-[250px]">
      <div className="w-[250px] bg-gradient-to-b from-purple-500 to-purple-600 rounded-3xl p-4 shadow-2xl border-2 border-purple-400">
        
        {/* Cabeçalho */}
        <div className="bg-white bg-opacity-95 rounded-2xl p-5 text-center mb-5 shadow-lg w-full">
          <h2 className="text-gray-600 text-base font-medium mb-2">Patrimônio total</h2>
          <div className="text-gray-800 text-2xl font-bold">R$ {(patrimonio).toLocaleString('pt-BR')},00</div>
        </div>

        {/* Lista de investimentos */}
        <div className="w-full space-y-3">
          {investmentData.map((item) => (
            <div
              key={item.id}
              className="flex overflow-hidden rounded-xl shadow-lg hover:-translate-y-1 transition-transform duration-200 cursor-pointer h-12"
            >
              {/* Ícone */}
              <div className={`h-full aspect-square ${item.bgColor} flex items-center justify-center text-white`}>
                <img src={item.icon} alt="" className="h-[60%] w-[60%] object-contain" />
              </div>

              {/* Valor */}
              <div className="flex-1 bg-white bg-opacity-95 h-full flex items-center px-4 text-gray-800 text-lg font-bold">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé */}
      </div>
    </div>
  );
};

export default PatrimonioInterface;
