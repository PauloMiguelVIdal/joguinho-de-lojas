import React, { useContext } from "react";
import { Tooltip } from "react-tooltip";
import { CentraldeDadosContext } from "../centralDeDadosContext";

export default function Day() {
  const { dados } = useContext(CentraldeDadosContext);

  const tooltipStyle = {
    backgroundColor: "#FFFFFF",
    color: "#350973",
    borderRadius: "6px",
    padding: "6px 10px",
    fontWeight: "600",
    fontSize: "14px",
  };

  return (
    <div 
      data-tooltip-id="day-tip"
      data-tooltip-content="Dia atual do jogo"
      className="flex flex-col items-center justify-around min-h-[80%] px-3 py-1"
      style={{
        background: "rgba(255,255,255,0.08)",
        borderRadius: "8px",
        border: "1px solid rgba(255,255,255,0.1)",
        minWidth: "100px",
        backdropFilter: "blur(4px)",
      }}
    >
      <span style={{
        fontFamily: "'Rajdhani',sans-serif",
        fontSize: "12px",
        fontWeight: 700,
        letterSpacing: ".1em",
        color: "rgba(255,255,255,0.4)",
        textTransform: "uppercase",
      }}>
        Dia
      </span>
      <span style={{
        fontFamily: "'Rajdhani',sans-serif",
        fontSize: "20px",
        fontWeight: 800,
        color: "#FFFFFF",
        lineHeight: 1.2,
      }}>
        {dados.dia} <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", fontWeight: 600 }}>/ 360</span>
      </span>

      <Tooltip
        id="day-tip"
        style={tooltipStyle}
        border="1px solid #350973"
      />
    </div>
  );
}