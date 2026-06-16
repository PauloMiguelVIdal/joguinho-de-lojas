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
        //   img: Carteira,
        cor1: "#350973 ",
        cor2: "#4C14A9 ",
        cor3: "#6A00FF ",
        cor4: "#934CFF ",
    },

    // { id: "mapa", corClasse: "bg-[#E60000]", img: maps, cor1: "#6A00FF ", cor2: "#6A00FF ", cor3:  "bg-gradient-to-br from-[#6A00FF] to-[#E60000]", cor4: "#6A00FF ", },
];

// const [buttonOpenAudio] = useSound(openAudio);
// const { economiaSetores, setEconomiaSetores } = useContext(
//   DadosEconomyGlobalContext
// );

// ─── Constantes ───────────────────────────────────────────────────────────────

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

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmtBRL = (n) => {
    n = Number(n) || 0;
    const abs = Math.abs(n), s = n < 0 ? "-" : "";
    if (abs >= 1e9) return `${s}R$${(abs / 1e9).toFixed(1).replace(".0", "")}B`;
    if (abs >= 1e6) return `${s}R$${(abs / 1e6).toFixed(1).replace(".0", "")}M`;
    if (abs >= 1e3) return `${s}R$${(abs / 1e3).toFixed(0)}K`;
    return `${s}R$${Math.round(abs)}`;
};


// ─── Seção colapsável (mesma do SideInformations) ────────────────────────────

function Section({ dot, title, badge, children, defaultOpen = true }) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div style={{
            background: "rgba(0,0,0,.22)",
            border: "1px solid rgba(255,255,255,.07)",
            borderRadius: 12, overflow: "hidden", flexShrink: 0,
        }}>
            <button onClick={() => setOpen(v => !v)} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 7,
                padding: "8px 11px", border: "none", cursor: "pointer",
                background: "rgba(0,0,0,.18)", fontFamily: "inherit",
                borderBottom: open ? "1px solid rgba(255,255,255,.05)" : "none",
            }}>
                <div style={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: dot, boxShadow: `0 0 5px ${dot}`, flexShrink: 0,
                }} />
                <span style={{
                    fontSize: 9, fontWeight: 800, letterSpacing: ".14em",
                    textTransform: "uppercase", color: "rgba(255,255,255,.42)",
                    flex: 1, textAlign: "left",
                }}>
                    {title}
                </span>
                {badge != null && (
                    <span style={{
                        fontSize: 8, fontWeight: 900, padding: "1px 6px", borderRadius: 99,
                        background: "rgba(255,255,255,.08)", color: "rgba(255,255,255,.35)",
                        marginRight: 4,
                    }}>
                        {badge}
                    </span>
                )}
                <ChevronDown size={11} color="rgba(255,255,255,.2)"
                    style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s", flexShrink: 0 }}
                />
            </button>
            {open && <div style={{ padding: "9px 11px" }}>{children}</div>}
        </div>
    );
}

// ─── Barra de progresso ───────────────────────────────────────────────────────

function Bar({ value, max, color = "#FFD966" }) {
    const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
    const c = pct >= 90 ? "#ff4d4d" : pct >= 70 ? "#FFD700" : color;
    return (
        <div style={{
            width: "100%", height: 4,
            background: "rgba(255,255,255,.07)", borderRadius: 99, overflow: "hidden",
        }}>
            <div style={{
                width: `${pct}%`, height: "100%", background: c,
                borderRadius: 99, boxShadow: `0 0 5px ${c}88`, transition: "width .4s",
            }} />
        </div>
    );
}

// ─── 1. Economia dos setores ──────────────────────────────────────────────────

function SecaoEconomia({ economiaSetores }) {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext);

    const faturamento = dados.faturamento;
    const dia = dados.dia;
    const eventoAtual = dados.eventoAtual;





    if (dia < 270) return null;

    return (
        <Section dot="#a78bfa" title="Economia dos setores">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
                {SETORES.map(setor => {
                    const estado = economiaSetores[setor]?.economiaSetor?.estadoAtual || "estável";
                    const eco = ECO_CONFIG[estado] || { bg: "#555", label: estado, dot: "#aaa" };

                    return (
                        <React.Fragment key={setor}>
                            {/* Quadrado com borda colorida + ícone centralizado grande */}
                            <div
                                data-tooltip-id={`sb-eco-${setor}`}
                                style={{
                                    aspectRatio: "1",
                                    background: "rgba(53,9,115,.6)",
                                    border: `2.5px solid ${eco.bg}`,
                                    borderRadius: 10,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    cursor: "default", transition: "transform .15s, box-shadow .15s",
                                    boxShadow: `0 0 8px ${eco.bg}55`,
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = "scale(1.08)";
                                    e.currentTarget.style.boxShadow = `0 0 16px ${eco.bg}99`;
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = "scale(1)";
                                    e.currentTarget.style.boxShadow = `0 0 8px ${eco.bg}55`;
                                }}
                            >
                                <img
                                    src={IMAGENS[setor]}
                                    alt={setor}
                                    style={{ width: "55%", height: "55%", objectFit: "contain" }}
                                />
                            </div>

                            <Tooltip id={`sb-eco-${setor}`}
                                style={{ background: "#fff", color: "#350973", borderRadius: 8, fontWeight: 700, fontSize: 12 }}
                                border="1px solid #350973"
                                html={`
                                    <b>${setor.charAt(0).toUpperCase() + setor.slice(1)}</b> — ${estado}<br/>
                                    <span style="font-size:11px;opacity:.65">
                                      Rec 40% · Dec 80% · Est 100% · Prog 110% · Aq 125%
                                    </span>
                                `}
                            />
                        </React.Fragment>
                    );
                })}
            </div>
        </Section>
    );
}

// ─── 2. Financeiro mensal ─────────────────────────────────────────────────────

function SecaoFinancas({ economiaSetores }) {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext);


    const faturamento = dados.faturamento;
    const dia = dados.dia;
    const eventoAtual = dados.eventoAtual;

    const fat = faturamento?.faturamentoMensal || 0;
    const imp = economiaSetores.imposto?.impostoMensal || 0;
    const lucro = fat - imp;
    const impAnual = economiaSetores.valorImpostoAnual || 0;

    const rows = [
        { label: "Faturamento", value: fmtBRL(fat), color: "#34d399", sign: "+" },
        { label: "Despesas", value: fmtBRL(imp), color: "#f87171", sign: "−" },
        { label: "Lucro líquido", value: fmtBRL(lucro), color: lucro >= 0 ? "#a78bfa" : "#fb923c", sign: "=" },
        ...(dia > 270 ? [{ label: "Imposto anual", value: fmtBRL(impAnual), color: "#fbbf24", sign: "★" }] : []),
    ];

    return (
        <Section dot="#34d399" title="Financeiro mensal">
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {rows.map(({ label, value, color, sign }) => (
                    <div key={label} style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        background: "rgba(255,255,255,.05)",
                        border: `1px solid ${color}22`,
                        borderRadius: 8, padding: "6px 10px",
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ fontSize: 10, fontWeight: 900, color, width: 12, textAlign: "center", opacity: .8 }}>
                                {sign}
                            </span>
                            <span style={{
                                fontSize: 10, color: "rgba(255,255,255,.5)",
                                fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em",
                            }}>
                                {label}
                            </span>
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 900, color, letterSpacing: "-.01em" }}>
                            {value}
                        </span>
                    </div>
                ))}
            </div>
        </Section>
    );
}

// ─── 3. Armazenamento (idêntico ao SideInformations, sem props externos) ──────
// ─── 4. Evento ativo ──────────────────────────────────────────────────────────

function SecaoEvento() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext);


    const faturamento = dados.faturamento;
    const dia = dados.dia;
    const eventoAtual = dados.eventoAtual;
    const ev = eventoAtual;

    if (!ev?.eventoAtivo) {
        return (
            <Section dot="#6b7280" title="Evento ativo" defaultOpen={false}>
                <div style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "4px 0",
                }}>
                    <span style={{ fontSize: 16, opacity: .3 }}>📭</span>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,.25)", fontWeight: 700 }}>
                        Nenhum evento ativo
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
        <Section dot={cor} title="Evento ativo">
            <div style={{
                background: `${cor}0f`,
                border: `1px solid ${cor}33`,
                borderRadius: 9, padding: "9px 11px",
                display: "flex", flexDirection: "column", gap: 6,
            }}>
                {/* header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{
                            width: 6, height: 6, borderRadius: "50%",
                            background: cor, boxShadow: `0 0 6px ${cor}`,
                        }} />
                        <span style={{
                            fontSize: 9, fontWeight: 900, color: cor,
                            textTransform: "uppercase", letterSpacing: ".1em",
                        }}>
                            {setor}
                        </span>
                    </div>
                    <span style={{ fontSize: 9, color: "rgba(255,255,255,.38)", fontWeight: 700 }}>
                        {diasRestantes}d restantes
                    </span>
                </div>

                {/* título */}
                <p style={{
                    fontSize: 11, color: "rgba(255,255,255,.8)",
                    fontWeight: 600, lineHeight: 1.45, margin: 0,
                }}>
                    {titulo}
                </p>

                {/* barra de tempo */}
                {ev.diaFinal > 0 && (
                    <div style={{ height: 3, background: "rgba(255,255,255,.08)", borderRadius: 2 }}>
                        <div style={{
                            height: "100%", borderRadius: 2, background: cor,
                            width: `${Math.min(100, Math.max(0, (diasRestantes / 30) * 100))}%`,
                            transition: "width .5s",
                        }} />
                    </div>
                )}

                {/* encerramento */}
                <span style={{
                    fontSize: 9, color: "rgba(255,255,255,.3)", fontWeight: 700,
                    alignSelf: "flex-end",
                }}>
                    Encerra: dia {ev.diaFinal}
                </span>
            </div>
        </Section>
    );
}

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
        <Section dot={corAlerta} title="Gestão de Expansão" pulse={true}>
            <div
                onClick={() => onOpen()}

                className="cursor-pointer hover:brightness-125 transition-all"
                style={{
                    background: `${corAlerta}15`,
                    border: `1px solid ${corAlerta}44`,
                    borderRadius: 12, padding: "10px 12px",
                    display: "flex", flexDirection: "column", gap: 8,
                    backdropFilter: "blur(4px)"
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 10, fontWeight: 900, color: corAlerta, textTransform: "uppercase", letterSpacing: ".1em" }}>
                        {critico ? "Limite Atingido" : "Capacidade Próxima"}
                    </span>
                </div>

                <p style={{ fontSize: 11, color: "rgba(255,255,255,.9)", fontWeight: 600, lineHeight: 1.3, margin: 0 }}>
                    {critico
                        ? "Sua empresa parou de crescer! Adquira uma licença agora."
                        : "Você está ficando sem espaço para novos edifícios."}
                </p>

                <div style={{ height: 4, background: "rgba(255,255,255,.1)", borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{
                        height: "100%", background: corAlerta,
                        width: `${Math.min(100, (edAtual / edMax) * 100)}%`,
                        transition: "width .5s ease-out",
                    }} />
                </div>

                <span style={{ fontSize: 9, color: "rgba(255,255,255,.5)", fontWeight: 700, alignSelf: "flex-end", textTransform: "uppercase" }}>
                    Expandir Empresa →
                </span>
            </div>
        </Section>
    );
};



// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────

export default function SidebarFinancas({ onOpen }) {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext);

    const faturamento = dados.faturamento
    const dia = dados.dia
    const eventoAtual = dados.eventoAtual
    const { economiaSetores } = useContext(DadosEconomyGlobalContext);
    const [ativo, setAtivo] = useState("carteira");
    const setorCarteira = setores.find((setor) => setor.id === "carteira");
    const dadosCarteiraEdificios = economiaSetores.centralEdificios;
    const edMax = dadosCarteiraEdificios.quantidadeEdificiosMax || 1;
    const edAtual = dadosCarteiraEdificios.quantidadeEdificiosAtual || 0;
    const [buttonCloseAudio] = useSound(closeAudio);
    return (
        <div className="scrollbar-custom" style={{
            display: "flex", flexDirection: "column", height: "100%", gap: 7, padding: "2px 2px 8px",
            overflowX: "hidden", scrollbarWidth: "thin"
        }}>
            <SecaoEconomia economiaSetores={economiaSetores} />
            <SecaoFinancas economiaSetores={economiaSetores} />

            <SecaoEvento />
            <AlertaExpansao onOpen={onOpen} />
        </div>
    );
}