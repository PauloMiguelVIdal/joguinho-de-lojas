// SidebarFinancas.jsx
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

const SETORES = ["agricultura", "tecnologia", "industria", "comercio", "imobiliario", "energia"];
const IMAGENS = { agricultura, tecnologia, industria, comercio, imobiliario, energia };

const ECO_CONFIG = {
    "recessão": { bg: "#FF0000", label: "Recessão", dot: "#ff6666" },
    "declinio": { bg: "#FF6B00", label: "Declínio", dot: "#ffaa55" },
    "estável": { bg: "#EEAD2D", label: "Estável", dot: "#ffe08a" },
    "progressiva": { bg: "#7BC142", label: "Progressiva", dot: "#b8e06a" },
    "aquecida": { bg: "#00843D", label: "Aquecida", dot: "#4dd890" },
};

function SecaoEconomia({ economiaSetores }) {
    const { dados } = useContext(CentraldeDadosContext);
    const dia = dados.dia;

    return (
        <div className="flex flex-col h-full w-full overflow-hidden">
            {/* Grid ocupando 100% da altura sem aspecto ratio forçado */}
            <div className="grid grid-cols-6 h-full w-full gap-0.5">
                {SETORES.map(setor => {
                    const estado = economiaSetores[setor]?.economiaSetor?.estadoAtual || "estável";
                    const eco = ECO_CONFIG[estado] || { bg: "#555", label: estado, dot: "#aaa" };

                    return (
                        <div
                            key={setor}
                            data-tooltip-id={`sb-eco-${setor}`}
                            className="rounded-md flex items-center justify-center relative overflow-hidden"
                            style={{
                                background: `linear-gradient(135deg, rgba(53,9,115,0.8) 0%, rgba(53,9,115,0.4) 100%)`,
                                border: `4px solid ${eco.bg}`,
                                boxShadow: `0 0 10px ${eco.bg}33, inset 0 0 20px ${eco.bg}11`,
                                // Removemos o aspectRatio e flex:1
                                height: '100%',
                                width: '100%',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.boxShadow = `0 0 20px ${eco.bg}66, inset 0 0 30px ${eco.bg}22`;
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.boxShadow = `0 0 10px ${eco.bg}33, inset 0 0 20px ${eco.bg}11`;
                            }}
                        >
                            <img
                                src={IMAGENS[setor]}
                                alt={setor}
                                className="w-[55%] h-[55%] object-contain"
                                style={{
                                    filter: `drop-shadow(0 0 4px ${eco.bg}44)`,
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                }}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Tooltips para cada setor */}
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
                            <b>${setor.charAt(0).toUpperCase() + setor.slice(1)}</b> — ${estado}<br/>
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
    const dia = dados.dia;

    return (
        <div className="h-full w-full flex items-center p-0.5 overflow-hidden">
            <SecaoEconomia economiaSetores={economiaSetores} />
        </div>
    );
}