import React, { useContext } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import PredioImg from "../../public/outrasImagens/predio-comercial.png";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import logo from '../../public/outrasImagens/logo Joguinho.png';

// Tooltip
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function Informations() {
    const { dados } = useContext(CentraldeDadosContext);
    const { economiaSetores } = useContext(DadosEconomyGlobalContext);

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

    return (
        <div className="flex items-center gap-4 h-full">
            {/* Logo + Nome da Empresa */}
            <div 
                data-tooltip-id="empresa-tip"
                data-tooltip-content="Nome da sua empresa"
                className="flex items-center gap-3 h-[80%]"
            >
                {/* Logo */}
                <div style={{
                    width: "45px",
                    height: "45px",
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

                {/* Nome e subtítulo */}
                <div className="flex flex-col">
                    <span style={{
                        fontFamily: "'Rajdhani',sans-serif",
                        fontSize: "22px",
                        fontWeight: 800,
                        color: "#FFFFFF",
                        letterSpacing: ".05em",
                        lineHeight: 1.1,
                    }}>
                        {dados.inicioGame.nomeEmpresa}
                    </span>
                    <span style={{
                        fontFamily: "'Rajdhani',sans-serif",
                        fontSize: "10px",
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.35)",
                        letterSpacing: ".08em",
                        textTransform: "uppercase",
                    }}>
                        Podium Empresarial
                    </span>
                </div>
            </div>

            {/* Separador */}
            <div style={{
                width: "1px",
                height: "35px",
                background: "rgba(255,255,255,0.1)",
            }} />

            {/* Saldo */}
            <div 
                data-tooltip-id="saldo-tip"
                data-tooltip-content="Saldo total da sua empresa"
                className="justify-around"
                style={{
                    display: "flex",
                    flexDirection: "column",
              
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    padding: "4px 16px",
                    minWidth: "120px",
                    backdropFilter: "blur(4px)",
                    height: "80%",
                }}
            >
                <span style={{
                    fontFamily: "'Rajdhani',sans-serif",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: ".08em",
                    color: "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                }}>
                    Saldo
                </span>
                <span style={{
                    fontFamily: "'Rajdhani',sans-serif",
                    fontSize: "20px",
                    fontWeight: 800,
                    color: "#FFFFFF",
                    lineHeight: 1.2,
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