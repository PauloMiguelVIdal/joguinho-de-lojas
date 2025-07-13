import React, { useContext } from 'react';
import { CentraldeDadosContext } from '../centralDeDadosContext';
import circularEconomia from '../imagens/circular-economy.png';
import agricultura from '../components/setores/agricultura.png';
import tecnologia from '../components/setores/tecnologia.png';
import industria from '../components/setores/industria.png';
import comercio from '../components/setores/comercio.png';
import imobiliario from '../components/setores/Imobiliário.png';
import energia from '../components/setores/torre-eletrica.png';
function Economys() {
  const { dados } = useContext(CentraldeDadosContext);

  const setores = ["agricultura", "tecnologia", "industria", "comercio", "imobiliario", "energia"];

  const imagensSetores = {
    agricultura,
    tecnologia,
    industria,
    comercio,
    imobiliario,
    energia
  };

  
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-4 p-4">
      {setores.map((setor, index) => {
        const economiaAtual = dados[setor]?.economiaSetor?.estadoAtual;

        const corClasse = {
          "recessão": "bg-[#FF0000]",
          "declinio": "bg-[#FF8000]",
          "estável": "bg-[#EEAD2D]",
          "progressiva": "bg-[#9ACD32]",
          "aquecida": "bg-[#006400]",
        }[economiaAtual] || "bg-black";

        return (
          <div
            key={index}
            className={`${corClasse} min-h-[50px] max-h-[70px] min-w-[50px] max-w-[70px] aspect-square rounded-[10px] flex items-center justify-center`}
          >
            <img className="w-[60%] max-w-[58px] aspect-square" src={imagensSetores[setor]} alt={setor} />
          </div>
        );
      })}
    </div>
  );
}

export default Economys;
