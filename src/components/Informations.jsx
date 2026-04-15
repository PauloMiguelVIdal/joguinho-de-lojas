import React, { useContext } from "react";
import { useCentralStore } from "../stores/useCentralStore";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

// ── Fora do componente — sem recriação por render ─────────────────────────────
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

const formatarNumero = (num) => {
  if (num >= 1e12) return (num / 1e12).toFixed(2).replace(/\.00$/, "") + "T";
  if (num >= 1e9)  return (num / 1e9) .toFixed(2).replace(/\.00$/, "") + "B";
  if (num >= 1e6)  return (num / 1e6) .toFixed(2).replace(/\.00$/, "") + "M";
  if (num >= 1e3)  return (num / 1e3) .toFixed(1).replace(/\.0$/,  "") + "K";
  return num.toString();
};

export default function Informations() {
  // ── Zustand — só o campo necessário ──────────────────────
  const nomeEmpresa = useCentralStore((s) => s.inicioGame.nomeEmpresa);

  // ── Economy Context (inalterado) ──────────────────────────
  const { economiaSetores } = useContext(DadosEconomyGlobalContext);

  return (
    <div className="h-full w-full flex flex-col align-center text-center place-content-around rounded-[20px] min-h-[50px]">
      <div className="flex w-full items-center justify-between pr-[10px]">
        <div className="flex-1">
          <h1 className="fonteBold text-white text-[30px]">
            {nomeEmpresa}
          </h1>
        </div>
        <div
          data-tooltip-id="saldo-tip"
          data-tooltip-content="Esse é o seu saldo"
          className="ml-[20px] rounded-[5px] bg-gradient-to-l to-white via-white from-white w-[150px] flex items-center h-[50px] place-content-between pl-[10px] pr-[15px]"
        >
          <h1 className="fonteBold text-[#350973] text-[20px]">R$</h1>
          <h1 className="fonteBold text-[#350973] text-[20px]">
            {formatarNumero(economiaSetores.saldo.toFixed(2))}
          </h1>
        </div>
      </div>
      <TooltipPadrao id="saldo-tip" />
    </div>
  );
}