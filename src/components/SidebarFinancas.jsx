import React, { useContext, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";

import { CentraldeDadosContext } from "../centralDeDadosContext";

import { motion } from "framer-motion";
import agricultura from "../../public/outrasImagens/setores/agricultura.png";
import tecnologia from "../../public/outrasImagens/setores/tecnologia.png";
import comercio from "../../public/outrasImagens/setores/comercio.png";
import industria from "../../public/outrasImagens/setores/industria.png";
import imobiliario from "../../public/outrasImagens/setores/imobiliário.png";
import energia from "../../public/outrasImagens/setores/torre-eletrica.png";
import useSound from "use-sound";
import openAudio from "../../public/sounds/openAudio.mp3";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { BusinessLicence } from "./BusinessLicence";
import closeAudio from "../../public/sounds/closeAudio.mp3";
import fechar from "../../public/outrasImagens/fechar.png";

const setores = [
    {
        id: "carteira",
        corClasse: "bg-[#934CFF]",
        cor1: "#350973 ",
        cor2: "#4C14A9 ",
        cor3: "#6A00FF ",
        cor4: "#934CFF ",
    },
];

const SETORES = ["agricultura", "tecnologia", "industria", "comercio", "imobiliario", "energia"];
const IMAGENS = { agricultura, tecnologia, industria, comercio, imobiliario, energia };

const ECO_CONFIG = {
    "recessão": { bg: "#FF0000", label: "Recessão", dot: "#ff6666" },
    "declinio": { bg: "#FF6B00", label: "Declínio", dot: "#ffaa55" },
    "estável": { bg: "#EEAD2D", label: "Estável", dot: "#ffe08a" },
    "progressiva": { bg: "#7BC142", label: "Progressiva", dot: "#b8e06a" },
    "aquecida": { bg: "#00843D", label: "Aquecida", dot: "#4dd890" },
};

const CAT_ICONS = {
    "agrícolas secos": "🌾", "biomassa / orgânicos": "🌱",
    "produtos manufaturados": "📦", animais: "🐄",
    perecíveis: "🥩", "componentes eletrônicos": "🔌",
    "bens de alto valor": "💎", "componentes industriais": "⚙️",
    químicos: "🧪", minério: "🪨",
    fluidos: "💧", veículos: "🚗",
    aeronaves: "✈️", energia: "⚡",
    "produtos digitais": "💾", "materiais sensíveis": "⚠️",
};

const fmtBRL = (n) => {
    n = Number(n) || 0;
    const abs = Math.abs(n), s = n < 0 ? "-" : "";
    if (abs >= 1e9) return `${s}R$${(abs / 1e9).toFixed(1).replace(".0", "")}B`;
    if (abs >= 1e6) return `${s}R$${(abs / 1e6).toFixed(1).replace(".0", "")}M`;
    if (abs >= 1e3) return `${s}R$${(abs / 1e3).toFixed(0)}K`;
    return `${s}R$${Math.round(abs)}`;
};

// ─── Seção colapsável (estilo compacto) ─────────────────────────────────────



// ─── Barra de progresso ───────────────────────────────────────────────────────

function Bar({ value, max, color = "#FFD966" }) {
    const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
    const c = pct >= 90 ? "#ff4d4d" : pct >= 70 ? "#FFD700" : color;
    return (
        <div style={{
            width: "100%", height: 3,
            background: "rgba(255,255,255,.07)", borderRadius: 99, overflow: "hidden",
        }}>
            <div style={{
                width: `${pct}%`, height: "100%", background: c,
                borderRadius: 99, boxShadow: `0 0 4px ${c}88`, transition: "width .4s",
            }} />
        </div>
    );
}

// ─── 1. Economia dos setores (versão compacta) ──────────────────────────────────

// ─── 1. Economia dos setores (com comportamento igual ao exemplo) ──────────────

// ─── 1. Economia dos setores (bem aproveitado) ──────────────────────────────────

function SecaoEconomia({ economiaSetores }) {
    const { dados } = useContext(CentraldeDadosContext);
    const dia = dados.dia;

    // if (dia < 270) return null;

    return (
        <div className="flex flex-col h-full w-[320px]">
            {/* Grid ocupando 100% da altura */}
            <div className="grid grid-cols-6 h-[50px] w-full gap-6">
                {SETORES.map(setor => {
                    const estado = economiaSetores[setor]?.economiaSetor?.estadoAtual || "estável";
                    const eco = ECO_CONFIG[estado] || { bg: "#555", label: estado, dot: "#aaa" };

                    return (
                        <div
                            key={setor}
                            data-tooltip-id={`sb-eco-${setor}`}
                            className=" rounded-lg flex items-center justify-center h-[50px] w-[50px]"
                            style={{
                                background: `linear-gradient(135deg, rgba(53,9,115,0.8) 0%, rgba(53,9,115,0.4) 100%)`,
                                border: `2px solid ${eco.bg}`,
                                boxShadow: `0 0 10px ${eco.bg}33, inset 0 0 20px ${eco.bg}11`,
                              
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
                                }}
                            />
                            
                            {/* Indicador de estado */}
                            {/* <div 
                                className=" bottom-0.5 right-0.5 w-1.5 h-1.5 rounded-full"
                                style={{ 
                                    background: eco.bg,
                                    boxShadow: `0 0 6px ${eco.bg}`,
                                }}
                            /> */}
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
// ─── 2. Financeiro mensal (versão compacta) ─────────────────────────────────────

function SecaoFinancas({ economiaSetores }) {
    const { dados } = useContext(CentraldeDadosContext);

    const faturamento = dados.faturamento;
    const fat = faturamento?.faturamentoMensal || 0;
    const imp = economiaSetores.imposto?.impostoMensal || 0;
    const lucro = fat - imp;

    const rows = [
        { label: "Faturamento", value: fmtBRL(fat), color: "#34d399", sign: "+" },
        { label: "Despesas", value: fmtBRL(imp), color: "#f87171", sign: "−" },
        { label: "Lucro líquido", value: fmtBRL(lucro), color: lucro >= 0 ? "#a78bfa" : "#fb923c", sign: "=" },
    ];

    return (
        <Section dot="#34d399" title="Finanças">
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {rows.map(({ label, value, color, sign }) => (
                    <div key={label} style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        background: "rgba(255,255,255,.05)",
                        border: `1px solid ${color}22`,
                        borderRadius: 6, padding: "4px 8px",
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                            <span style={{ fontSize: 8, fontWeight: 900, color, width: 20, textAlign: "center", opacity: .8 }}>
                                {sign}
                            </span>
                            <span style={{
                                fontSize: 8, color: "rgba(255,255,255,.5)",
                                fontWeight: 900, textTransform: "uppercase", letterSpacing: ".04em",
                            }}>
                                {label}
                            </span>
                        </div>
                        <span style={{ fontSize: 10, fontWeight: 900, color, letterSpacing: "-.01em" }}>
                            {value}
                        </span>
                    </div>
                ))}
            </div>
        </Section>
    );
}

// ─── 3. Evento ativo (versão compacta) ──────────────────────────────────────────

function SecaoEvento() {
    const { dados } = useContext(CentraldeDadosContext);
    const dia = dados.dia;
    const eventoAtual = dados.eventoAtual;
    const ev = eventoAtual;

    if (!ev?.eventoAtivo) {
        return (
            <Section dot="#6b7280" title="Evento" defaultOpen={false}>
                <div style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "2px 0",
                }}>
                    <span style={{ fontSize: 14, opacity: .3 }}>📭</span>
                    <span style={{ fontSize: 9, color: "rgba(255,255,255,.25)", fontWeight: 700 }}>
                        Nenhum
                    </span>
                </div>
            </Section>
        );
    }

    const setor = ev.departamento || ev.setorSelecionado || ev.lojaSelecionada || "—";
    const diasRestantes = Math.max(0, (ev.diaFinal || 0) - dia);
    const titulo = ev.title || "";
    const isBom = /crescimento|aquecid|imposto|progress/i.test(titulo);
    const cor = isBom ? "#34d399" : "#f87171";

    return (
        <Section dot={cor} title="Evento">
            <div style={{
                background: `${cor}0f`,
                border: `1px solid ${cor}33`,
                borderRadius: 7, padding: "7px 9px",
                display: "flex", flexDirection: "column", gap: 4,
            }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <div style={{
                            width: 5, height: 5, borderRadius: "50%",
                            background: cor, boxShadow: `0 0 5px ${cor}`,
                        }} />
                        <span style={{
                            fontSize: 8, fontWeight: 900, color: cor,
                            textTransform: "uppercase", letterSpacing: ".08em",
                        }}>
                            {setor}
                        </span>
                    </div>
                    <span style={{ fontSize: 8, color: "rgba(255,255,255,.38)", fontWeight: 700 }}>
                        {diasRestantes}d
                    </span>
                </div>

                <p style={{
                    fontSize: 9, color: "rgba(255,255,255,.8)",
                    fontWeight: 600, lineHeight: 1.4, margin: 0,
                }}>
                    {titulo}
                </p>

                {ev.diaFinal > 0 && (
                    <div style={{ height: 2, background: "rgba(255,255,255,.08)", borderRadius: 2 }}>
                        <div style={{
                            height: "100%", borderRadius: 2, background: cor,
                            width: `${Math.min(100, Math.max(0, (diasRestantes / 30) * 100))}%`,
                            transition: "width .5s",
                        }} />
                    </div>
                )}
            </div>
        </Section>
    );
}

// ─── Alerta de Expansão ──────────────────────────────────────────────────────

const AlertaExpansao = ({ onOpen }) => {
    const { economiaSetores } = useContext(DadosEconomyGlobalContext);

    const edMax = economiaSetores.centralEdificios?.quantidadeEdificiosMax || 1;
    const edAtual = economiaSetores.centralEdificios?.quantidadeEdificiosAtual || 0;

    const edRestantes = edMax - edAtual;
    const mostrarAviso = edRestantes <= 2;

    if (!mostrarAviso) return null;

    const critico = edRestantes <= 0;
    const corAlerta = critico ? "#ff4d4d" : "#F27405";

    return (
        <Section dot={corAlerta} title="Expansão" pulse={true}>
            <div
                onClick={() => onOpen()}
                className="cursor-pointer hover:brightness-125 transition-all"
                style={{
                    background: `${corAlerta}15`,
                    border: `1px solid ${corAlerta}44`,
                    borderRadius: 8, padding: "7px 9px",
                    display: "flex", flexDirection: "column", gap: 5,
                    backdropFilter: "blur(4px)"
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ fontSize: 8, fontWeight: 900, color: corAlerta, textTransform: "uppercase", letterSpacing: ".08em" }}>
                        {critico ? "Limite Atingido" : "Capacidade Próxima"}
                    </span>
                </div>

                <p style={{ fontSize: 9, color: "rgba(255,255,255,.9)", fontWeight: 600, lineHeight: 1.3, margin: 0 }}>
                    {critico
                        ? "Adquira uma licença agora."
                        : "Espaço para novos edifícios."}
                </p>

                <div style={{ height: 3, background: "rgba(255,255,255,.1)", borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{
                        height: "100%", background: corAlerta,
                        width: `${Math.min(100, (edAtual / edMax) * 100)}%`,
                        transition: "width .5s ease-out",
                    }} />
                </div>

                <span style={{ fontSize: 7, color: "rgba(255,255,255,.5)", fontWeight: 700, alignSelf: "flex-end", textTransform: "uppercase" }}>
                    Expandir →
                </span>
            </div>
        </Section>
    );
};

// ─── COMPONENTE PRINCIPAL ─── LAYOUT EM ROW ─────────────────────────────────
export default function SidebarFinancas({ onOpen }) {
    const { dados } = useContext(CentraldeDadosContext);
    const { economiaSetores } = useContext(DadosEconomyGlobalContext);
    const dia = dados.dia;

    return (
        <div className="h-full w-full flex items-center">
            <SecaoEconomia economiaSetores={economiaSetores} />
        </div>
    );
}