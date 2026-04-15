import React from "react";
import { Tooltip } from "react-tooltip";
import { useCentralStore } from "../stores/useCentralStore";

// ─── Fora do componente — sem recriação por render ────────────────────────────
const tooltipStyle = {
  backgroundColor: "#FFFFFF",
  color: "#350973",
  borderRadius: "6px",
  padding: "6px 10px",
  fontWeight: "600",
  fontSize: "14px",
};

const TooltipPadrao = ({ id }) => (
  <Tooltip id={id} style={tooltipStyle} border="1px solid #350973" />
);

export default function Day() {
  // ✅ seletor reativo — re-renderiza sempre que dia muda
  const dia = useCentralStore((s) => s.dia);

  return (
    <div className="flex items-center justify-center min-h-[50px] w-[100%] bg-white rounded-[10px]">
      <div
        data-tooltip-id="saldo-tip"
        data-tooltip-content="Esse é o dia atual do jogo"
        className="flex justify-between items-center w-full h-full pl-[10px] pr-[15px] rounded-[12px] bg-white"
      >
        <h1 className="fonteBold text-[#350973] text-[20px] mr-[20px]">Dia</h1>
        <h1 className="fonteBold text-[#350973] text-[20px]">{dia}</h1>
      </div>
      <TooltipPadrao id="saldo-tip" />
    </div>
  );
}