import React, { useContext } from 'react';
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import agricultura from "../../public/outrasImagens/setores/agricultura.png";
import tecnologia from "../../public/outrasImagens/setores/tecnologia.png";
import comercio from "../../public/outrasImagens/setores/comercio.png";
import industria from "../../public/outrasImagens/setores/industria.png";
import imobiliario from "../../public/outrasImagens/setores/imobiliário.png";
import energia from "../../public/outrasImagens/setores/torre-eletrica.png";
import { CentraldeDadosContext } from "../centralDeDadosContext";

// Tooltip
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

function Economys() {
  const { economiaSetores } = useContext(DadosEconomyGlobalContext);
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
  if (dados.dia < 270) return null;
  if (dados.dia >= 270) {
    return (
      <div className="grid grid-cols-3 grid-rows-2 gap-2 h-full w-full self-center place-items-center">
        {setores.map((setor, index) => {
          const economiaAtual = economiaSetores[setor]?.economiaSetor?.estadoAtual || "desconhecido";

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
              data-tooltip-id={`tooltip-${setor}`}
              data-tooltip-content={`Setor: ${setor.charAt(0).toUpperCase() + setor.slice(1)} | Estado: ${economiaAtual} `}
              data-tooltip-html={`Setor: ${setor.charAt(0).toUpperCase() + setor.slice(1)} | Estado: ${economiaAtual} <br/> <br/>    <div>
      <p>O desempenho do faturamento varia de acordo com a economia do setor:</p>
      <ul style={{ marginLeft: "15px", marginTop: "5px" }}>
        <li><b>Recessão:</b> 40% do faturamento</li>
        <li><b>Declínio:</b> 80% do faturamento</li>
        <li><b>Estável:</b> 100% do faturamento</li>
        <li><b>Progressiva:</b> 110% do faturamento</li>
        <li><b>Aquecida:</b> 125% do faturamento</li>
      </ul>
    </div>`}
              className={`${corClasse} min-h-[60px] max-h-[70px] max-w-[70px] min-w-[60px] aspect-square rounded-[10px] flex items-center justify-center`}
            >
              <div
                className="bg-[#350973] min-h-[30px] max-h-[50px] max-w-[50px] min-w-[30px] aspect-square rounded-[10px] flex items-center justify-center"
              >
                <img className="w-[60%] max-w-[50px] aspect-square" src={imagensSetores[setor]} alt={setor} />
              </div>

              {/* Tooltip para cada setor */}
              <Tooltip
                id={`tooltip-${setor}`}
                style={{
                  backgroundColor: "#FFFFFF",   // fundo branco
                  color: "#350973",            // texto roxo
                  border: "1px solid #350973", // borda fina
                  borderRadius: "6px",         // cantos arredondados
                  padding: "6px 10px",         // espaçamento interno
                  fontWeight: "600",           // fonte destacada
                  fontSize: "14px"
                }}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Economys;
