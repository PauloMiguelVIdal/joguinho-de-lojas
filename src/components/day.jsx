import React, { useContext } from "react";
import { Tooltip } from "react-tooltip";
import { CentraldeDadosContext } from "../centralDeDadosContext";

export default function Day() {
  const { dados } = useContext(CentraldeDadosContext);

  return (
    <div className="flex items-center justify-center min-h-[50px] w-[100%] bg-white rounded-[10px]">
      <div
        data-tooltip-id="saldo-tip"
        data-tooltip-content="Esse é o dia atual do jogo"
        className="flex justify-between items-center w-full h-full pl-[10px] pr-[15px] rounded-[12px] bg-white"
      >
        <h1 className="fonteBold text-[#350973] text-[20px]">Dia:</h1>
        <h1 className="fonteBold text-[#350973] text-[20px]">{dados.dia}</h1>
      </div>

      {/* Tooltip customizado */}
      <Tooltip
        id="saldo-tip"
        style={{
          backgroundColor: "#FFFFFF",
          color: "#350973",
          border: "1px solid #350973",
          borderRadius: "6px",
          padding: "6px 10px",
          fontWeight: "600",
          fontSize: "14px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)", // sombra suave
        }}
      />
    </div>
  );
}
