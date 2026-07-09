import React, { useContext } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import PredioImg from "../../public/outrasImagens/predio-comercial.png";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import logo from '../../public/outrasImagens/logo Joguinho.png';
import { useDeviceDetection } from "./useDeviceDetection";

// Tooltip
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function Informations() {
    const { dados } = useContext(CentraldeDadosContext);
    const { economiaSetores } = useContext(DadosEconomyGlobalContext);
    const { isMobile, isLandscape, isDesktop } = useDeviceDetection();

    const tooltipStyle = {
        backgroundColor: "#FFFFFF",
        color: "#350973",
        borderRadius: "6px",
        padding: "6px 10px",
        fontWeight: "600",
        fontSize: "14px",
    };

    const TooltipPadrao = ({ id }) => (
        <Tooltip
            id={id}
            style={tooltipStyle}
            border="1px solid #350973"
        />
    );
    
    const formatarNumero = (num) => {
        if (num >= 1e12)
            return (num / 1e12).toFixed(2).replace(/\.00$/, "") + "T";
        if (num >= 1e9)
            return (num / 1e9).toFixed(2).replace(/\.00$/, "") + "B";
        if (num >= 1e6)
            return (num / 1e6).toFixed(2).replace(/\.00$/, "") + "M";
        if (num >= 1e3)
            return (num / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
        return num.toString();
    };

    const saldo = economiaSetores.saldo || 0;

    // Configurações responsivas - mantendo estética original
    const gap = isDesktop ? '16px' : (isLandscape ? '6px' : '8px');
    const logoSize = isDesktop ? '45px' : (isLandscape ? '28px' : '32px');
    const fontSizeNome = isDesktop ? '22px' : (isLandscape ? '16px' : '18px');
    const fontSizeSubtitulo = isDesktop ? '10px' : (isLandscape ? '8px' : '8px');
    const fontSizeSaldo = isDesktop ? '20px' : (isLandscape ? '16px' : '16px');
    const fontSizeLabel = isDesktop ? '9px' : (isLandscape ? '8px' : '8px');
    const paddingSaldo = isDesktop ? '4px 16px' : (isLandscape ? '4px 12px' : '4px 14px');
    const minWidthSaldo = isDesktop ? '120px' : (isLandscape ? '80px' : '90px');
    const showNome = isDesktop || !isLandscape;
    const showSeparator = isDesktop || !isLandscape;

    return (
        <div className="flex items-center h-full" style={{
            gap: gap,
        }}>
            {/* Logo + Nome da Empresa */}
            <div 
                data-tooltip-id="empresa-tip"
                data-tooltip-content="Nome da sua empresa"
                className="flex items-center h-[80%]"
                style={{
                    gap: isDesktop ? '12px' : (isLandscape ? '6px' : '8px'),
                }}
            >
                {/* Logo */}

               {isDesktop &&(
                <div style={{
                    width: logoSize,
                    height: logoSize,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid rgba(255,255,255,0.15)",
                    overflow: "hidden",
                    flexShrink: 0,
                }}>
                    <img
                        src={logo}
                        className="rounded-full"
                        alt="Logo"
                        style={{
                            width: "80%",
                            height: "80%",
                            objectFit: "contain",
                            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
                        }}
                    />
                </div>
)}
                {/* Nome e subtítulo - escondido em paisagem mobile */}
                {showNome && (
                    <div className="flex flex-col">
                        <span style={{
                            fontFamily: "'Rajdhani',sans-serif",
                            fontSize: fontSizeNome,
                            fontWeight: 800,
                            color: "#FFFFFF",
                            letterSpacing: ".05em",
                            lineHeight: 1.1,
                        }}>
                            {dados.inicioGame.nomeEmpresa}
                        </span>
                        <span style={{
                            fontFamily: "'Rajdhani',sans-serif",
                            fontSize: fontSizeSubtitulo,
                            fontWeight: 600,
                            color: "rgba(255,255,255,0.35)",
                            letterSpacing: ".08em",
                            textTransform: "uppercase",
                        }}>
                            {isDesktop ? 'Podium Empresarial' : 'Podium'}
                        </span>
                    </div>
                )}
            </div>

            {/* Separador - escondido em paisagem mobile */}
            {showSeparator && (
                <div style={{
                    width: "1px",
                    height: isDesktop ? "35px" : (isLandscape ? "25px" : "28px"),
                    background: "rgba(255,255,255,0.1)",
                }} />
            )}

            {/* Saldo - mantendo escrita "Saldo" */}
            <div 
                data-tooltip-id="saldo-tip"
                data-tooltip-content="Saldo total da sua empresa"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "0px",
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    padding: paddingSaldo,
                    minWidth: minWidthSaldo,
                    backdropFilter: "blur(4px)",
                    height: isDesktop ? "80%" : (isLandscape ? "75%" : "75%"),
                }}
            >
                <span style={{
                    fontFamily: "'Rajdhani',sans-serif",
                    fontSize: fontSizeLabel,
                    fontWeight: 700,
                    letterSpacing: ".08em",
                    color: "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                }}>
                    Saldo
                </span>
                <span style={{
                    fontFamily: "'Rajdhani',sans-serif",
                    fontSize: fontSizeSaldo,
                    fontWeight: 800,
                    color: "#FFFFFF",
                    lineHeight: 1.2,
                    whiteSpace: "nowrap",
                }}>
                    R$ {formatarNumero(saldo.toFixed(2))}
                </span>
            </div>

            {/* Tooltips */}
            <TooltipPadrao id="saldo-tip" />
            <TooltipPadrao id="empresa-tip" />
        </div>
    );
}