// SidebarFinancas.jsx - Com indicadores quadrados responsivos
import React, { useContext, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { motion } from "framer-motion";
import agricultura from "../../public/outrasImagens/setores/agricultura.png";
import tecnologia from "../../public/outrasImagens/setores/tecnologia.png";
import comercio from "../../public/outrasImagens/setores/comercio.png";
import industria from "../../public/outrasImagens/setores/industria.png";
import imobiliario from "../../public/outrasImagens/setores/imobiliario.png";
import energia from "../../public/outrasImagens/setores/torre-eletrica.png";
import useSound from "use-sound";
import openAudio from "../../public/sounds/openAudio.mp3";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { BusinessLicence } from "./BusinessLicence";
import closeAudio from "../../public/sounds/closeAudio.mp3";
import fechar from "../../public/outrasImagens/fechar.png";
import { useDeviceDetection } from "./useDeviceDetection";

const SETORES = ["agricultura", "tecnologia", "industria", "comercio", "imobiliario", "energia"];
const IMAGENS = { agricultura, tecnologia, industria, comercio, imobiliario, energia };

const NOMES_SETORES = {
    agricultura: "Agricultura",
    tecnologia: "Tecnologia",
    industria: "Indústria",
    comercio: "Comércio",
    imobiliario: "Imobiliário",
    energia: "Energia"
};

// Cores base para cada setor (para o background com 20% de opacidade)
const CORES_SETORES = {
    agricultura: "#4CAF50",
    tecnologia: "#FF6F00",
    industria: "#808080",
    comercio: "#E60000",
    imobiliario: "#6666FF",
    energia: "#FFD966"
};

const ECO_CONFIG = {
    "recessão": { bg: "#FF0000", label: "Recessão", dot: "#ff6666" },
    "declinio": { bg: "#FF6B00", label: "Declínio", dot: "#ffaa55" },
    "estável": { bg: "#EEAD2D", label: "Estável", dot: "#ffe08a" },
    "progressiva": { bg: "#7BC142", label: "Progressiva", dot: "#b8e06a" },
    "aquecida": { bg: "#00843D", label: "Aquecida", dot: "#4dd890" },
};

function SecaoEconomia({ economiaSetores }) {
    const { dados } = useContext(CentraldeDadosContext);
    const { isMobile, isLandscape, isDesktop } = useDeviceDetection();
    const dia = dados.dia;

    // ─── CONFIGURAÇÕES RESPONSIVAS ──────────────────────────────
    const showTitle = isDesktop;
    const showNome = isDesktop || !isLandscape;
    const iconSize = isDesktop ? '50%' : (isLandscape ? '55%' : '50%');
    const fontSizeNome = isDesktop ? '7px' : (isLandscape ? '0px' : '7px'); // 0px em paisagem = escondido
    const paddingItem = isDesktop ? '3px' : (isLandscape ? '2px' : '2px');
    const fontSizeTitulo = isDesktop ? '10px' : (isLandscape ? '9px' : '10px');

    return (
        <div className="flex flex-col h-full w-full overflow-hidden">
            {/* ─── TÍTULO "Setores" - só no desktop ─────────────── */}
            {showTitle && (
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "2px 0 4px 0",
                    flexShrink: 0,
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    marginBottom: "4px",
                }}>
                    <span style={{
                        fontFamily: "'Rajdhani',sans-serif",
                        fontSize: fontSizeTitulo,
                        fontWeight: 700,
                        letterSpacing: ".15em",
                        color: "rgba(255,255,255,0.5)",
                        textTransform: "uppercase",
                    }}>
                        Setores
                    </span>
                </div>
            )}

            {/* ─── GRID DE SETORES ────────────────────────────────── */}
            <div className="grid grid-cols-6 h-full w-full gap-1" style={{ 
                flex: 1, 
                minHeight: 0,
                paddingTop: isMobile ? '2px' : '0px',
            }}>
                {SETORES.map(setor => {
                    const estado = economiaSetores[setor]?.economiaSetor?.estadoAtual || "estável";
                    const eco = ECO_CONFIG[estado] || { bg: "#555", label: estado, dot: "#aaa" };
                    const corBase = CORES_SETORES[setor] || "#350973";

                    return (
                        <div
                            key={setor}
                            data-tooltip-id={`sb-eco-${setor}`}
                            className="rounded-lg flex flex-col items-center justify-center relative overflow-hidden transition-all duration-200"
                            style={{
                                background: `linear-gradient(135deg, ${corBase}33 0%, ${corBase}11 100%)`,
                                border: `2px solid ${eco.bg}`,
                                boxShadow: `0 0 8px ${eco.bg}22, inset 0 0 15px ${eco.bg}11`,
                                height: '100%',
                                width: '100%',
                                padding: paddingItem,
                                aspectRatio: '1 / 1', // Mantém quadrado
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.boxShadow = `0 0 16px ${eco.bg}55, inset 0 0 25px ${eco.bg}22`;
                                e.currentTarget.style.transform = "scale(1.02)";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.boxShadow = `0 0 8px ${eco.bg}22, inset 0 0 15px ${eco.bg}11`;
                                e.currentTarget.style.transform = "scale(1)";
                            }}
                        >
                            {/* ─── ÍCONE DO SETOR ───────────────────── */}
                            <img
                                src={IMAGENS[setor]}
                                alt={setor}
                                className="object-contain"
                                style={{
                                    filter: `drop-shadow(0 0 6px ${eco.bg}55)`,
                                    maxWidth: iconSize,
                                    maxHeight: iconSize,
                                    width: 'auto',
                                    height: 'auto',
                                    flexShrink: 0,
                                }}
                            />
                            
                            {/* ─── NOME DO SETOR ────────────────────── */}
                            {/* Em paisagem mobile, o nome fica com 0px (escondido) */}
                            {showNome && (
                                <span style={{
                                    fontFamily: "'Rajdhani',sans-serif",
                                    fontSize: fontSizeNome,
                                    fontWeight: 700,
                                    letterSpacing: ".05em",
                                    color: "rgba(255,255,255,0.7)",
                                    textTransform: "uppercase",
                                    marginTop: "3px",
                                    textAlign: "center",
                                    lineHeight: 1.1,
                                    maxWidth: "90%",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}>
                                    {NOMES_SETORES[setor]}
                                </span>
                            )}

                            {/* ─── INDICADOR DE STATUS (pontinho) ──── */}
                            {/* Mobile paisagem: mostra um pontinho colorido */}
                            {isMobile && isLandscape && (
                                <div style={{
                                    width: "8px",
                                    height: "8px",
                                    borderRadius: "50%",
                                    background: eco.dot,
                                    boxShadow: `0 0 12px ${eco.bg}99`,
                                    marginTop: "2px",
                                    flexShrink: 0,
                                    border: `2px solid ${eco.bg}66`,
                                }} />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* ─── TOOLTIPS ────────────────────────────────────────── */}
            {SETORES.map(setor => {
                const estado = economiaSetores[setor]?.economiaSetor?.estadoAtual || "estável";
                const eco = ECO_CONFIG[estado] || { bg: "#555", label: estado, dot: "#aaa" };
                return (
                    <Tooltip 
                        key={`tooltip-${setor}`}
                        id={`sb-eco-${setor}`}
                        style={{ background: "#fff", color: "#350973", borderRadius: 6, fontWeight: 700, fontSize: 10 }}
                        border="1px solid #350973"
                        html={`
                            <b>${NOMES_SETORES[setor]}</b> — ${estado}<br/>
                            <span style="font-size:10px;opacity:.65">
                                Rec 40% · Dec 80% · Est 100% · Prog 110% · Aq 125%
                            </span>
                        `}
                    />
                );
            })}
        </div>
    );
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────
export default function SidebarFinancas({ onOpen }) {
    const { dados } = useContext(CentraldeDadosContext);
    const { economiaSetores } = useContext(DadosEconomyGlobalContext);
    const { isMobile, isLandscape, isDesktop } = useDeviceDetection();
    const dia = dados.dia;

    // ─── CONFIGURAÇÕES RESPONSIVAS ──────────────────────────────
    const altura = isDesktop ? '90%' : (isLandscape ? '85%' : '85%');
    const padding = isDesktop ? '2px 8px' : (isLandscape ? '2px 4px' : '2px 4px');
    const maxWidth = isDesktop ? '400px' : (isLandscape ? '280px' : '300px');
    const borderRadius = isDesktop ? '12px' : (isLandscape ? '8px' : '8px');

    return (
        <div style={{
            height: altura,
            padding: padding,
            width: '100%',
            maxWidth: maxWidth,
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: borderRadius,
            border: '1px solid rgba(255,255,255,0.1)',
        }}>
            <SecaoEconomia economiaSetores={economiaSetores} />
        </div>
    );
}