import React, { useContext } from "react";
import { Tooltip } from "react-tooltip";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { useDeviceDetection } from "./useDeviceDetection";

export default function Day() {
  const { dados } = useContext(CentraldeDadosContext);
  const { isMobile, isLandscape, isDesktop } = useDeviceDetection();

  const tooltipStyle = {
    backgroundColor: "#FFFFFF",
    color: "#350973",
    borderRadius: "6px",
    padding: "6px 10px",
    fontWeight: "600",
    fontSize: "14px",
  };

  // Configurações responsivas
  const flexDirection = isDesktop ? "column" : (isLandscape ? "row" : "column");
  const minWidth = isDesktop ? '100px' : (isLandscape ? '70px' : '80px');
  const padding = isDesktop ? '4px 12px' : (isLandscape ? '4px 10px' : '4px 12px');
  const fontSizeLabel = isDesktop ? '12px' : (isLandscape ? '10px' : '10px');
  const fontSizeValue = isDesktop ? '20px' : (isLandscape ? '16px' : '16px');
  const fontSizeMax = isDesktop ? '12px' : (isLandscape ? '10px' : '10px');
  const gap = isDesktop ? '0px' : (isLandscape ? '4px' : '0px');

  return (
    <div 
      data-tooltip-id="day-tip"
      data-tooltip-content="Dia atual do jogo"
      style={{
        display: "flex",
        flexDirection: flexDirection,
        alignItems: "center",
        justifyContent: "center",
        gap: gap,
        background: "rgba(255,255,255,0.08)",
        borderRadius: "8px",
        border: "1px solid rgba(255,255,255,0.1)",
        minWidth: minWidth,
        backdropFilter: "blur(4px)",
        padding: padding,
        height: isDesktop ? "80%" : (isLandscape ? "75%" : "75%"),
      }}
    >
      <span style={{
        fontFamily: "'Rajdhani',sans-serif",
        fontSize: fontSizeLabel,
        fontWeight: 700,
        letterSpacing: ".1em",
        color: "rgba(255,255,255,0.4)",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}>
        Dia
      </span>
      <span style={{
        fontFamily: "'Rajdhani',sans-serif",
        fontSize: fontSizeValue,
        fontWeight: 800,
        color: "#FFFFFF",
        lineHeight: 1.2,
        whiteSpace: "nowrap",
      }}>
        {dados.dia} <span style={{ fontSize: fontSizeMax, color: "rgba(255,255,255,0.3)", fontWeight: 600 }}>/ 360</span>
      </span>

      <Tooltip
        id="day-tip"
        style={tooltipStyle}
        border="1px solid #350973"
      />
    </div>
  );
}