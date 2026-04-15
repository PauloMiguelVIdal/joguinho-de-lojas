import React, { useState, useCallback, useMemo, useContext, useEffect } from "react";
import ReactFlow, {
    Background, Controls, MiniMap, ReactFlowProvider,
    Handle, Position, addEdge, useNodesState, useEdgesState, MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

import { usePipeline } from "./PipelineContext";
import {
    useGame, storageProfiles, calcularCustoArmazenamentoMensal, CUSTO_POR_SLOT,
    calcularStorageGlobal, calcularSlotsNecessariosCadeia, calcularCustoStorageCadeia,
    calcularStorageAgregadoCadeias
} from "./GameContext";
// import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { FORMULAS_EDIFICIOS } from "./productionFormulasConfig";
import { SALES_EDIFICIOS } from "./salesFormulasConfig";
import { productsCatalog, marketPrices, getMarketPrice } from "./TablePrice";
import { analisarArbitragem } from "./pipelineExecutor";
import { motion, AnimatePresence } from "framer-motion";
// ─── Tokens ───────────────────────────────────────────────────────────────────
const edificiosDeArmazenamento = [
    "Armazém", "Silo", "Depósito De Resíduos Orgânicos", "Data Center", "Servidor Em Nuvem", "Armazém Logístico",
    "Centro De Distribuição", "Fábrica De Tanque De Armazenamento Biocombustível", "Centro De Coleta De Biomassa",
    "Campo De Estocagem", "Armazém De Materiais Brutos", "Câmara Fria", "Container Modular", "Pátio De Veículos",
    "Armazém Industrial", "Armazém De Materiais Sensíveis", "Hangar", "Pátio De Mineração",
];


const C = {
    bg: "#07041a", bg2: "#0f0b2a", bg3: "#160e38",
    card: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.1)", border2: "rgba(255,255,255,0.22)",
    text: "#e8e4ff", muted: "rgba(232,228,255,0.45)",
    purple: "#7c3aed", purple2: "#a78bfa",
    green: "#10b981", amber: "#f59e0b", red: "#ef4444", blue: "#3b82f6", teal: "#14b8a6",
};

const SETOR_COR = {
    agricultura: "#0C9123", industria: "#808080", comercio: "#E60000",
    tecnologia: "#FF6F00", imobiliario: "#3333CC", energia: "#E6B800",
};

const TIPO_NÓ = {
    producao: { label: "Produção", cor: C.purple2, bg: "rgba(124,58,237,0.15)", icone: "🏭" },
    venda: { label: "Venda final", cor: C.red, bg: "rgba(239,68,68,0.12)", icone: "🏪" },
    mercado_compra: { label: "Comprar", cor: C.green, bg: "rgba(16,185,129,0.11)", icone: "🌐" },
    mercado_venda: { label: "Vender", cor: C.teal, bg: "rgba(20,184,166,0.11)", icone: "🌐" },
};

const SETORES = ["agricultura", "industria", "comercio", "tecnologia", "imobiliario", "energia"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n) => {
    if (n == null) return "—";
    const a = Math.abs(n);
    if (a >= 1e6) return `R$${(n / 1e6).toFixed(1)}M`;
    if (a >= 1e3) return `R$${(n / 1e3).toFixed(0)}K`;
    return `R$${Math.round(n)}`;
};

function getEdsTipo(edificiosBase, edificiosFinais, tipo) {
    const r = [];
    SETORES.forEach(s => {
        const estaticos = EDIFICIOS_FINAIS_ESTATICOS[s]?.edificios || [];
        const dinamicos = edificiosFinais[s]?.edificios || [];

        dinamicos.forEach((edDin, index) => {
            if ((edDin.quantidade ?? 0) < 1) return;
            const edEst = estaticos[index];
            if (!edEst) return;

            const eP = FORMULAS_EDIFICIOS.some(e => e.nomeEdificio === edEst.nome);
            const eV = SALES_EDIFICIOS.some(e => e.nomeEdificio === edEst.nome);
            if (tipo === "producao" ? eP : tipo === "venda" ? eV : false)
                r.push({ ...edEst, quantidade: edDin.quantidade, setor: s });
        });
    });
    return r;
}

function getFormulaById(id) {
    for (const ed of FORMULAS_EDIFICIOS) {
        const f = ed.formulas?.find(f => f.id === id);
        if (f) return { formula: f, edificio: ed };
    }
    return null;
}

// Mapeia estado de economia para cor — usa os mesmos valores do Economys.jsx
function getEconomiaCor(estado) {
    const e = (estado || "estável").toLowerCase();
    if (e === "recessão" || e === "recessao") return C.red;
    if (e === "declinio" || e === "declínio") return "#FF8000";
    if (e === "progressiva") return "#9ACD32";
    if (e === "aquecida") return C.green;
    return C.amber; // estável
}

let _stepCounter = 0;
function gerarStepId() { return `step_${Date.now()}_${++_stepCounter}`; }

function stepParaContexto(tipo, buildingName, extras = {}) {
    return {
        id: gerarStepId(),
        tipo, buildingName: buildingName || "",
        formulaId: extras.formulaId || "",
        quantidade: extras.quantidade || 1,
        condicaoThreshold: extras.condicaoThreshold || 0,
        prioridadeInsumo: extras.prioridadeInsumo || "so_armazem",
        estrategiaVenda: extras.estrategiaVenda || "maior_margem",
        produtoId: extras.produtoId || "",
        precoTeto: extras.precoTeto || 99999999999,
        _posicao: extras.posicao || null,
        // ── NOVOS campos para automação de contratos ──
        atenderTodosContratos: extras.atenderTodosContratos || false,
        filtrarProduto: extras.filtrarProduto || null,
    };
}

// ─── Gera label visual para um step ─────────────────────────────────────────
function labelStep(step) {
    if (!step) return { nome: "?", icon: "❓" };
    if (step.tipo === "mercado_compra") return { nome: "Mercado Global", icon: "🌐🛒" };
    if (step.tipo === "mercado_venda") return { nome: "Mercado Global", icon: "🌐💸" };
    if (step.tipo === "producao") return { nome: step.buildingName || "Produção", icon: "🏭" };
    if (step.tipo === "venda") return { nome: step.buildingName || "Venda", icon: "🏪" };
    return { nome: step.buildingName || "?", icon: "📦" };
}

// Extrai ícones dos produtos vinculados a um step
function iconesProdutosStep(step) {
    if (!step) return [];
    const icons = [];
    if (step.tipo === "producao" && step.formulaId) {
        const cfg = getFormulaById(step.formulaId);
        if (cfg) {
            Object.keys(cfg.formula.output || {}).forEach(pid => {
                const p = productsCatalog[pid];
                if (p?.icon) icons.push(p.icon);
            });
        }
    }
    if ((step.tipo === "mercado_venda" || step.tipo === "mercado_compra") && step.produtoId) {
        const p = productsCatalog[step.produtoId];
        if (p?.icon) icons.push(p.icon);
    }
    if (step.tipo === "venda" && step.formulaId) {
        const sf = SALES_EDIFICIOS.flatMap(e => e.formulas || []).find(f => f.id === step.formulaId);
        if (sf) {
            const p = productsCatalog[sf.produto];
            if (p?.icon) icons.push(p.icon);
        }
    }
    return icons.slice(0, 3);
}

// ─── Constantes de armazenamento ────────────────────────────────────────────

const EDIFICIOS_ARMAZENAMENTO = [
    "Armazém", "Silo", "Depósito De Resíduos Orgânicos", "Data Center", "Servidor Em Nuvem",
    "Armazém Logístico", "Centro De Distribuição", "Campo De Estocagem", "Câmara Fria",
    "Container Modular", "Pátio De Veículos", "Armazém Industrial",
    "Armazém De Materiais Sensíveis", "Hangar", "Pátio De Mineração",
    "Armazém De Materiais Brutos", "Centro De Coleta De Biomassa", "Tanque De Armazenamento De Fluidos",
];

const ICONS_CAT_ARMAZENAMENTO = {
    "agrícolas secos": "🌾", "biomassa / orgânicos": "🌱",
    "produtos manufaturados": "📦", "animais": "🐄",
    "perecíveis": "🥩", "componentes eletrônicos": "🔌",
    "bens de alto valor": "💎", "componentes industriais": "⚙️",
    "químicos": "🧪", "minério": "🪨",
    "fluidos": "💧", "veículos": "🚗",
    "aeronaves": "✈️", "energia": "⚡",
    "produtos digitais": "💾", "materiais sensíveis": "⚠️",
};

// Calcula slots necessários para os produtos de uma cadeia
function calcularSlotsNecessarios(steps) {
    const slotsNecessarios = {}; // categoria → { slots, produtos: [{pid, qtd, slotSize, cat}] }

    steps.forEach(step => {
        if (step.tipo !== "producao" || !step.formulaId) return;
        const cfg = getFormulaById(step.formulaId);
        if (!cfg) return;
        const { formula } = cfg;
        const mult = step.quantidade || 1;

        // Inputs + outputs precisam de armazenamento
        [...Object.entries(formula.input || {}), ...Object.entries(formula.output || {})].forEach(([pid, qtd]) => {
            const prod = productsCatalog[pid];
            if (!prod?.categoriaFisica) return;
            const cat = prod.categoriaFisica;
            const slotSize = prod.slotSize || 1;
            const totalSlots = qtd * mult * slotSize;

            if (!slotsNecessarios[cat]) slotsNecessarios[cat] = { slots: 0, produtos: [] };
            slotsNecessarios[cat].slots += totalSlots;
            slotsNecessarios[cat].produtos.push({ pid, qtd: qtd * mult, slotSize, nome: prod.nome, icon: prod.icon });
        });
    });
    return slotsNecessarios;
}

// Calcula custo de imposto e faturamento esperado dos edifícios da cadeia
function calcularCustosEdificios(steps, edificiosFinais) {
    let impostoFixoTotal = 0;
    let faturamentoEsperado = 0;
    const SETORES_JOGO = ["agricultura", "industria", "comercio", "tecnologia", "imobiliario", "energia"];

    steps.forEach(step => {
        if (!step.buildingName || step.buildingName === "Mercado Global") return;

        for (const s of SETORES_JOGO) {
            const estaticos = EDIFICIOS_FINAIS_ESTATICOS[s]?.edificios || [];
            const dinamicos = edificiosFinais[s]?.edificios || [];
            const index = estaticos.findIndex(e => e.nome === step.buildingName);
            if (index === -1) continue;

            const quantidade = dinamicos[index]?.quantidade ?? 0;
            if (!quantidade) continue;

            const edEst = estaticos[index];
            const custoFixo = edEst.finanças?.impostoFixo || 0;
            const fatUnit = edEst.finanças?.faturamentoUnitário || 0;
            const fat30 = fatUnit * quantidade * 30;

            faturamentoEsperado += fat30;
            impostoFixoTotal += (edEst.finanças?.impostoSobreFatu || 0) * fat30;
            impostoFixoTotal += custoFixo * quantidade;
            break;
        }
    });

    return {
        impostoFixoTotal: Math.round(impostoFixoTotal),
        faturamentoEsperado: Math.round(faturamentoEsperado),
        custoArmazenamentoNecessario: 0,
    };
}
// ─── Calculadora de cadeia produtiva ─────────────────────────────────────────
// Calcula insumos totais, tempo, custo e receita de uma cadeia de steps

function calcularCadeia(steps, stock = {}, economiaSetores = {}, dados = null) {
    let diasTotal = 0;
    let custoInsumos = 0;
    let receitaTotal = 0;
    let custoArmazenamento = 0;  // ← NOVO
    const insumosNecessarios = {};
    const produtosProduzidos = {};

    steps.forEach(step => {
        if (step.tipo === "producao" && step.formulaId) {
            const cfg = getFormulaById(step.formulaId);
            if (!cfg) return;
            const { formula } = cfg;
            const mult = step.quantidade || 1;

            diasTotal = Math.max(diasTotal, formula.duracao || 0);

            Object.entries(formula.input || {}).forEach(([pid, qtdF]) => {
                const total = qtdF * mult;
                if (!insumosNecessarios[pid]) insumosNecessarios[pid] = 0;
                insumosNecessarios[pid] += total;

                const preco = getMarketPrice(pid, economiaSetores);
                custoInsumos += preco * total;

                // Custo de armazenar os insumos consumidos
                const prod = productsCatalog[pid];
                if (prod?.categoriaFisica) {
                    const slots = total * (prod.slotSize || 1);
                    custoArmazenamento += calcularCustoArmazenamentoMensal(prod.categoriaFisica, slots);
                }
            });

            Object.entries(formula.output || {}).forEach(([pid, qtdF]) => {
                if (!produtosProduzidos[pid]) produtosProduzidos[pid] = 0;
                produtosProduzidos[pid] += qtdF * mult;

                // Custo de armazenar o que é produzido (até ser vendido)
                const prod = productsCatalog[pid];
                if (prod?.categoriaFisica) {
                    const slots = (qtdF * mult) * (prod.slotSize || 1);
                    custoArmazenamento += calcularCustoArmazenamentoMensal(prod.categoriaFisica, slots);
                }
            });
        }

        if (step.tipo === "mercado_compra") {
            diasTotal += 10;
            // Custo de armazenar o produto comprado enquanto aguarda uso
            if (step.produtoId) {
                const prod = productsCatalog[step.produtoId];
                if (prod?.categoriaFisica) {
                    const slots = (step.quantidade || 1) * (prod.slotSize || 1);
                    custoArmazenamento += calcularCustoArmazenamentoMensal(prod.categoriaFisica, slots);
                }
            }
        }

        if (step.tipo === "mercado_venda") {
            diasTotal += 10;
            const preco = getMarketPrice(step.produtoId, economiaSetores);
            receitaTotal += preco * (step.quantidade || 1);
        }

        if (step.tipo === "venda") {
            const sf = SALES_EDIFICIOS.find(e => e.nomeEdificio === step.buildingName)
                ?.formulas?.find(f => f.id === step.formulaId);
            if (sf) {
                const preco = getMarketPrice(sf.produto, economiaSetores) * (1 + (sf.margemBase || 0) / 100);
                receitaTotal += preco * (step.quantidade || 1);
            }
        }
    });

    const insumosDetalhados = Object.entries(insumosNecessarios).map(([pid, qtd]) => {
        const estoqueAtual = stock[pid] || 0;
        const prod = productsCatalog[pid];
        return {
            pid, qtd, nome: prod?.nome || pid, icon: prod?.icon || "📦",
            estoqueAtual, faltando: Math.max(0, qtd - estoqueAtual),
            ok: estoqueAtual >= qtd,
        };
    });

    // Custo baseado na proporção real dos edifícios que esta cadeia usa
    if (dados) {
        const slotsNecMap = calcularSlotsNecessariosCadeia(steps, productsCatalog, FORMULAS_EDIFICIOS);
        const { custoMensalCadeia } = calcularCustoStorageCadeia(slotsNecMap, dados);
        custoArmazenamento = custoMensalCadeia;
    }

    const custoTotal = Math.round(custoInsumos + custoArmazenamento);

    return {
        diasTotal,
        custoInsumos: Math.round(custoInsumos),
        custoArmazenamento: Math.round(custoArmazenamento),   // ← NOVO
        custoTotal,                                           // ← insumos + armazenamento
        receitaTotal: Math.round(receitaTotal),
        lucro: Math.round(receitaTotal - custoTotal),
        insumosDetalhados,
        produtosProduzidos,
    };
}

function calcularMetricasAvancadas(calc, custos, steps, dados) {
    // Investimento total estimado (custo de construção dos edifícios de armazenamento
    // necessários para a cadeia — proxy: capital imobilizado para suportar 1 ciclo)
    // Calculamos como: custo de armazenamento mensal * 12 = "valor de giro anual"
    // mais a soma do custo de insumos para 1 ciclo completo
    const investimentoEstimado =
        calc.custoInsumos                        // insumos de 1 ciclo
        + custos.custoArmazenamentoNecessario * 3  // 3 meses de armazenamento como capital de giro
        + custos.impostoFixoTotal;               // 1 mês de imposto como entrada

    // Lucro líquido real = receita − insumos − armazenamento − impostos fixos mensais
    const lucroLiquidoReal = Math.round(
        calc.receitaTotal
        - calc.custoInsumos
        - calc.custoArmazenamento
        - custos.impostoFixoTotal
    );

    // Breakeven: quantos ciclos para cobrir o investimento estimado
    const lucroPorCiclo = lucroLiquidoReal;
    const breakevenCiclos = lucroPorCiclo > 0
        ? Math.ceil(investimentoEstimado / lucroPorCiclo)
        : Infinity;

    // Duração total de um ciclo em dias (para calcular breakeven em dias)
    const breakevenDias = lucroPorCiclo > 0 && calc.diasTotal > 0
        ? breakevenCiclos * calc.diasTotal
        : Infinity;

    // ROE real por ciclo: lucro líquido / investimento estimado * 100
    const roeReal = investimentoEstimado > 0
        ? ((lucroLiquidoReal / investimentoEstimado) * 100).toFixed(1)
        : "0.0";

    // ROE anualizado: considera quantos ciclos cabem em 365 dias
    const ciclosAno = calc.diasTotal > 0 ? Math.floor(365 / calc.diasTotal) : 0;
    const lucroAnual = lucroLiquidoReal * ciclosAno;
    const roeAnual = investimentoEstimado > 0
        ? ((lucroAnual / investimentoEstimado) * 100).toFixed(1)
        : "0.0";

    // Margem líquida real = lucro líquido real / receita * 100
    const margemLiquidaReal = calc.receitaTotal > 0
        ? ((lucroLiquidoReal / calc.receitaTotal) * 100).toFixed(1)
        : "0.0";

    // Detalhamento de custos por categoria de armazenamento (para exibir no breakdown)
    const custoPorCategoria = {};
    steps.forEach(step => {
        if (step.tipo !== "producao" || !step.formulaId) return;
        const cfg = getFormulaById(step.formulaId);
        if (!cfg) return;
        const { formula } = cfg;
        const mult = step.quantidade || 1;

        [...Object.entries(formula.input || {}), ...Object.entries(formula.output || {})].forEach(([pid, qtd]) => {
            const prod = productsCatalog[pid];
            if (!prod?.categoriaFisica) return;
            const slots = qtd * mult * (prod.slotSize || 1);
            const custo = calcularCustoArmazenamentoMensal(prod.categoriaFisica, slots);
            const cat = prod.categoriaFisica;

            if (!custoPorCategoria[cat]) {
                custoPorCategoria[cat] = { custo: 0, slots: 0, produtos: [] };
            }
            custoPorCategoria[cat].custo += custo;
            custoPorCategoria[cat].slots += slots;
            custoPorCategoria[cat].produtos.push({ pid, nome: prod.nome, icon: prod.icon, qtd: qtd * mult, slots, custo });
        });
    });

    return {
        lucroLiquidoReal,
        breakevenCiclos: breakevenCiclos === Infinity ? null : breakevenCiclos,
        breakevenDias: breakevenDias === Infinity ? null : breakevenDias,
        roeReal,
        roeAnual,
        ciclosAno,
        margemLiquidaReal,
        investimentoEstimado: Math.round(investimentoEstimado),
        custoPorCategoria,
    };
}

// ─── Micro-componentes UI ─────────────────────────────────────────────────────

const inputStyle = {
    width: "100%", background: "rgba(255,255,255,.07)",
    border: "1px solid rgba(255,255,255,.2)", borderRadius: 6,
    color: C.text, padding: "6px 10px", fontSize: 12, outline: "none", fontFamily: "inherit",
};

function BotaoVoltar({ onClick }) {
    return <button onClick={onClick} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 6, marginBottom: 20, fontFamily: "inherit", padding: 0 }}>‹ Voltar</button>;
}
function Titulo({ children }) {
    return <h2 style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 8px" }}>{children}</h2>;
}
function Subtitulo({ children }) {
    return <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 10 }}>{children}</div>;
}
function BotaoPrimario({ onClick, children, disabled, cor }) {
    return <button onClick={onClick} disabled={disabled} style={{ background: disabled ? "rgba(255,255,255,.08)" : (cor || C.purple), border: "none", borderRadius: 10, color: disabled ? C.muted : "#fff", padding: "10px 24px", fontSize: 13, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer", fontFamily: "inherit" }}>{children}</button>;
}

// Chip de produto (ícone + nome + quantidade)
function ProdChip({ pid, qtd, tipo }) {
    const prod = productsCatalog[pid];
    const bgMap = {
        input: "rgba(59,130,246,.18)", output: "rgba(16,185,129,.18)",
        compra: "rgba(59,130,246,.18)", venda: "rgba(20,184,166,.18)",
    };
    const corMap = {
        input: "#93c5fd", output: "#6ee7b7", compra: "#93c5fd", venda: "#5eead4",
    };
    return (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: bgMap[tipo] || bgMap.input, borderRadius: 8, padding: "3px 7px 3px 5px", fontSize: 10, color: corMap[tipo] || corMap.input, fontWeight: 700, margin: "2px 2px 0 0" }}>
            <span style={{ fontSize: 14 }}>{prod?.icon || "📦"}</span>
            <span>{prod?.nome || pid}</span>
            {qtd != null && <span style={{ opacity: 0.7 }}>×{qtd}</span>}
        </div>
    );
}

// ─── NÓ CUSTOMIZADO React Flow — com inputs/outputs visuais ──────────────────

const PipelineNóRF = React.memo(({ data, selected }) => {
    const cfg = TIPO_NÓ[data.tipo] || TIPO_NÓ.producao;
    const isMercado = data.tipo === "mercado_compra" || data.tipo === "mercado_venda";

    // Resolve fórmula para mostrar inputs/outputs
    const formulaCfg = data.formulaId ? getFormulaById(data.formulaId) : null;
    const formula = formulaCfg?.formula;

    // Para mercado, mostra produto único
    const prodMercado = data.produtoId ? productsCatalog[data.produtoId] : null;

    return (
        <div style={{ background: cfg.bg, border: `1.5px solid ${selected ? "#fff" : cfg.cor}`, borderRadius: 14, minWidth: 190, maxWidth: 230, fontFamily: "inherit", boxShadow: selected ? `0 0 0 2px ${cfg.cor}` : "0 3px 14px rgba(0,0,0,.6)", transition: "all .15s" }}>
            <Handle type="target" position={Position.Left} style={{ background: cfg.cor, width: 12, height: 12, border: "2px solid #060014", left: -6 }} />
            <Handle type="source" position={Position.Right} style={{ background: cfg.cor, width: 12, height: 12, border: "2px solid #060014", right: -6 }} />

            {/* Header */}
            <div style={{ padding: "10px 12px 8px", borderBottom: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 22, lineHeight: 1, flexShrink: 0 }}>{cfg.icone}</span>
                <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: cfg.cor, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 2 }}>{cfg.label}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {data.buildingName || "Mercado Global"}
                    </div>
                    {data.formulaNome && !isMercado && (
                        <div style={{ fontSize: 10, color: C.muted, marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {data.formulaNome}
                        </div>
                    )}
                </div>
            </div>

            {/* Body — Inputs */}
            {formula && Object.keys(formula.input || {}).length > 0 && (
                <div style={{ padding: "7px 12px 4px" }}>
                    <div style={{ fontSize: 8, fontWeight: 700, color: "#93c5fd", textTransform: "uppercase", marginBottom: 4 }}>📥 Consome</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                        {Object.entries(formula.input).map(([pid, qtd]) => (
                            <ProdChip key={pid} pid={pid} qtd={qtd * (data.quantidade || 1)} tipo="input" />
                        ))}
                    </div>
                </div>
            )}

            {/* Body — Outputs */}
            {formula && Object.keys(formula.output || {}).length > 0 && (
                <div style={{ padding: formula && Object.keys(formula.input || {}).length > 0 ? "4px 12px 8px" : "7px 12px 8px" }}>
                    <div style={{ fontSize: 8, fontWeight: 700, color: "#6ee7b7", textTransform: "uppercase", marginBottom: 4 }}>📤 Produz</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                        {Object.entries(formula.output).map(([pid, qtd]) => (
                            <ProdChip key={pid} pid={pid} qtd={qtd * (data.quantidade || 1)} tipo="output" />
                        ))}
                    </div>
                </div>
            )}

            {/* Mercado: produto único */}
            {isMercado && data.produtoId && prodMercado && (
                <div style={{ padding: "7px 12px 8px" }}>
                    <div style={{ fontSize: 8, fontWeight: 700, color: data.tipo === "mercado_compra" ? "#93c5fd" : "#5eead4", textTransform: "uppercase", marginBottom: 4 }}>
                        {data.tipo === "mercado_compra" ? "📥 Comprando" : "📤 Vendendo"}
                    </div>
                    <ProdChip pid={data.produtoId} qtd={data.quantidade || 1} tipo={data.tipo === "mercado_compra" ? "compra" : "venda"} />
                    <div style={{ fontSize: 9, color: C.muted, marginTop: 4 }}>⏳ Delay: 10 dias</div>
                </div>
            )}

            {/* Venda final: produto do contrato */}
            {data.tipo === "venda" && data.formulaId && (
                <div style={{ padding: "7px 12px 8px" }}>
                    <div style={{ fontSize: 8, fontWeight: 700, color: "#fca5a5", textTransform: "uppercase", marginBottom: 4 }}>📋 Contrato</div>
                    {(() => {
                        const sf = SALES_EDIFICIOS.find(e => e.nomeEdificio === data.buildingName)?.formulas?.find(f => f.id === data.formulaId);
                        if (!sf) return null;
                        const prod = productsCatalog[sf.produto];
                        return <ProdChip pid={sf.produto} qtd={data.quantidade} tipo="venda" />;
                    })()}
                </div>
            )}

            {/* Rodapé: quantidade + gargalos de armazenamento */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", padding: "5px 12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {data.quantidade > 0 && (
                        <span style={{ fontSize: 9, color: C.muted }}>×{data.quantidade} por ciclo</span>
                    )}
                    {/* Badge de alerta se há gargalo */}
                    {data.gargalosNó && Object.values(data.gargalosNó).some(g => !g.ok) && (
                        <span style={{ fontSize: 9, fontWeight: 800, color: "#fbbf24", display: "flex", alignItems: "center", gap: 3 }}>
                            ⚠️ gargalo
                        </span>
                    )}
                </div>

                {/* Mini-barras de armazenamento por categoria */}
                {data.gargalosNó && Object.keys(data.gargalosNó).length > 0 && (
                    <div style={{ marginTop: 5, display: "flex", flexDirection: "column", gap: 3 }}>
                        {Object.entries(data.gargalosNó).map(([cat, g]) => {
                            const pct = g.capDisp > 0 ? Math.min(100, (g.capDisp / Math.max(g.slotsNec, 1)) * 100) : 0;
                            const cor = g.ok ? "#10b981" : pct > 50 ? "#f59e0b" : "#ef4444";
                            return (
                                <div key={cat} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                    <span style={{ fontSize: 11, flexShrink: 0 }}>{g.icon}</span>
                                    {/* Barra */}
                                    <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,.08)", borderRadius: 99, overflow: "hidden" }}>
                                        <div style={{ height: "100%", width: `${pct}%`, background: cor, borderRadius: 99, boxShadow: `0 0 4px ${cor}88` }} />
                                    </div>
                                    {/* Valores cap/necessário */}
                                    <span style={{ fontSize: 8, fontWeight: 700, color: cor, flexShrink: 0, minWidth: 58, textAlign: "right" }}>
                                        {g.capDisp}/{g.slotsNec}
                                        {!g.ok && " ⚠️"}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
});

const nodeTypes = { pipeNó: PipelineNóRF };

function stepParaNó(step, index, capArm, stock) {
    const formulaCfg = step.formulaId ? getFormulaById(step.formulaId) : null;
    const formula = formulaCfg?.formula;

    // Calcular gargalos de armazenamento para este nó
    const gargalosNó = {};
    if (formula) {
        [...Object.entries(formula.input || {}), ...Object.entries(formula.output || {})].forEach(([pid, qtd]) => {
            const prod = productsCatalog[pid];
            if (!prod?.categoriaFisica) return;
            const cat = prod.categoriaFisica;
            const slotsNec = (qtd * (step.quantidade || 1)) * (prod.slotSize || 1);
            const capDisp = capArm?.[cat]?.total || 0;
            if (!gargalosNó[cat] || gargalosNó[cat].slotsNec < slotsNec) {
                gargalosNó[cat] = { slotsNec, capDisp, ok: capDisp >= slotsNec, icon: ICONS_CAT_ARMAZENAMENTO[cat] || "📦" };
            }
        });
    }

    // Stock atual dos produtos produzidos (para mostrar no footer do nó)
    const stockNó = {};
    if (formula) {
        Object.keys(formula.output || {}).forEach(pid => {
            stockNó[pid] = stock?.[pid] || 0;
        });
    }

    return {
        id: step.id,
        type: "pipeNó",
        position: step._posicao || { x: 60 + index * 260, y: 80 + (index % 2) * 160 },
        data: {
            tipo: step.tipo,
            buildingName: step.buildingName || "Mercado Global",
            formulaId: step.formulaId || "",
            formulaNome: formulaCfg?.formula?.nome || step.formulaId || "",
            quantidade: step.quantidade || 1,
            produtoId: step.produtoId || "",
            condicaoThreshold: step.condicaoThreshold || 0,
            gargalosNó,
            stockNó,
        },
    };
}

// ─── Painel Calculadora (lateral da lista e revisão) ─────────────────────────

function PainelCalculadora({ steps, stock }) {
    const { economiaSetores } = useContext(DadosEconomyGlobalContext);
    const edificiosFinais = useCentralStore(s => s.edificiosFinais);
    const custoStorageCadeia = useMemo(() => {
        if (!edificiosFinais) return { custoMensalCadeia: 0, detalhePorCategoria: {}, gargalos: [] };
        const slotsNecMap = calcularSlotsNecessariosCadeia(steps, productsCatalog, FORMULAS_EDIFICIOS);
        return calcularCustoStorageCadeia(slotsNecMap, edificiosFinais);
    }, [steps, edificiosFinais]);

    const calc = useMemo(
        () => calcularCadeia(steps, stock, economiaSetores, edificiosFinais),
        [steps, stock, economiaSetores, edificiosFinais]
    );

    const custos = useMemo(
        () => calcularCustosEdificios(steps, edificiosFinais),
        [steps, edificiosFinais]
    );

    const metricas = useMemo(() => {
        const custoArmReal = custoStorageCadeia.custoMensalCadeia;

        // Impostos dos armazéns: soma impostoFixo de cada edifício que contribui para a cadeia
        let impostoArmazens = 0;

        if (dados) {
            const SETORES_JOGO = ["agricultura", "industria", "comercio", "tecnologia", "imobiliario", "energia"];

            const nomesUnicos = new Set();

            Object.values(custoStorageCadeia.detalhePorCategoria).forEach(det => {
                (det.edificios || []).forEach(edInfo => {
                    if (edificiosDeArmazenamento.includes(edInfo.nome)) {
                        nomesUnicos.add(edInfo.nome);
                    }
                });
            });

            nomesUnicos.forEach(nome => {
                SETORES_JOGO.forEach(s => {
                    const estaticos = EDIFICIOS_FINAIS_ESTATICOS[s]?.edificios || [];
                    const dinamicos = edificiosFinais[s]?.edificios || [];
                    const index = estaticos.findIndex(e => e.nome === nome);
                    if (index === -1) return;
                    const quantidade = dinamicos[index]?.quantidade ?? 0;
                    if (!quantidade) return;
                    impostoArmazens += (estaticos[index].finanças?.impostoFixo || 0) * quantidade;
                });
            });
        }

        const impostoTotal = custos.impostoFixoTotal + Math.round(impostoArmazens);
        const investimentoEstimado = calc.custoInsumos + custoArmReal * 3 + custos.impostoFixoTotal;

        const lucroLiquidoReal = Math.round(
            calc.receitaTotal - calc.custoInsumos - custoArmReal - impostoTotal + custos.faturamentoEsperado
        );

        const breakevenCiclos = lucroLiquidoReal > 0
            ? Math.ceil(investimentoEstimado / lucroLiquidoReal) : null;
        const breakevenDias = lucroLiquidoReal > 0 && calc.diasTotal > 0
            ? (breakevenCiclos || 0) * calc.diasTotal : null;
        const ciclosAno = calc.diasTotal > 0 ? Math.floor(365 / calc.diasTotal) : 0;
        const roeReal = investimentoEstimado > 0
            ? ((lucroLiquidoReal / investimentoEstimado) * 100).toFixed(1) : "0.0";
        const roeAnual = investimentoEstimado > 0
            ? ((lucroLiquidoReal * ciclosAno / investimentoEstimado) * 100).toFixed(1) : "0.0";
        const margemLiquidaReal = calc.receitaTotal > 0
            ? ((lucroLiquidoReal / calc.receitaTotal) * 100).toFixed(1) : "0.0";

        return {
            lucroLiquidoReal, breakevenCiclos, breakevenDias,
            roeReal, roeAnual, ciclosAno, margemLiquidaReal,
            investimentoEstimado: Math.round(investimentoEstimado),
            impostoArmazens: Math.round(impostoArmazens),
            impostoTotal,
            custoPorCategoria: {}, // não mais usado diretamente
        };
    }, [calc, custos, custoStorageCadeia, steps, dados]);

    const slotsNec = useMemo(() => calcularSlotsNecessariosCadeia(steps, productsCatalog, FORMULAS_EDIFICIOS), [steps]);
    const capArm = useMemo(() => {
        const resultado = {};
        const SETORES_JOGO = ["agricultura", "industria", "comercio", "tecnologia", "imobiliario", "energia"];

        SETORES_JOGO.forEach(setor => {
            const estaticos = EDIFICIOS_FINAIS_ESTATICOS[setor]?.edificios || [];
            const dinamicos = edificiosFinais[setor]?.edificios || [];

            dinamicos.forEach((edDin, index) => {
                if ((edDin.quantidade ?? 0) < 1) return;
                const edEst = estaticos[index];
                if (!edEst) return;

                // passa o objeto combinado (nome do estático + quantidade do dinâmico)
                // para calcularStorageGlobal processar corretamente
                const edCombinado = { ...edEst, quantidade: edDin.quantidade };
                // insere no formato que calcularStorageGlobal espera
                if (!resultado[setor]) resultado[setor] = { edificios: [] };
                resultado[setor].edificios.push(edCombinado);
            });
        });

        return calcularStorageGlobal(resultado);
    }, [edificiosFinais]);

    const analiseArm = useMemo(() => {
        return Object.entries(slotsNec).map(([cat, { slots, produtos }]) => {
            const capDisp = capArm[cat]?.total || 0;
            const edificios = capArm[cat]?.edificios || [];
            const ok = capDisp >= slots;
            const falta = Math.max(0, slots - capDisp);
            const custoCat = metricas.custoPorCategoria[cat]?.custo || 0;
            return { cat, slots, capDisp, ok, falta, edificios, produtos, custoCat, icon: ICONS_CAT_ARMAZENAMENTO[cat] || "📦" };
        }).sort((a, b) => (a.ok ? 1 : -1) - (b.ok ? 1 : -1));
    }, [slotsNec, capArm, metricas.custoPorCategoria]);

    const temGargalo = analiseArm.some(a => !a.ok);
    const viavelBasico = calc.lucro > 0;
    const viavelReal = metricas.lucroLiquidoReal > 0;

    // Custo de armazenamento por categoria — agora via GameContext


    // Cores por viabilidade
    const corLucroReal = metricas.lucroLiquidoReal > 0 ? C.green
        : metricas.lucroLiquidoReal === 0 ? C.amber
            : C.red;

    const corROE = parseFloat(metricas.roeAnual) >= 30 ? C.green
        : parseFloat(metricas.roeAnual) >= 10 ? C.amber
            : C.red;

    return (
        <div style={{ background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px" }}>

            {/* ── Cabeçalho ── */}
            <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 12 }}>
                📊 Análise da cadeia
            </div>

            {/* ── BLOCO 1: Métricas financeiras principais ── */}
            <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>
                    💰 Resultado financeiro
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>

                    {/* Receita */}
                    <MetricCard icon="📈" label="Receita estimada" value={fmt(calc.receitaTotal)} color={C.text} />

                    {/* Custo insumos */}
                    <MetricCard icon="🛒" label="Custo insumos" value={fmt(calc.custoInsumos)} color={C.amber} />

                    {/* Custo armazenamento */}
                    <MetricCard icon="🏗️" label="Custo armazenamento" value={fmt(calc.custoArmazenamento)} color="#fb923c"
                        tooltip="Custo mensal de armazenar inputs e outputs deste ciclo" />

                    {/* Impostos fixos */}
                    {(custos.impostoFixoTotal > 0 || metricas.impostoArmazens > 0) && (
                        <div style={{ gridColumn: "1 / -1", background: "rgba(251,146,60,.06)", border: "1px solid rgba(251,146,60,.15)", borderRadius: 8, padding: "8px 10px" }}>
                            <div style={{ fontSize: 8, color: C.muted, marginBottom: 6 }}>🏛️ Impostos/mês (estimativa)</div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <div style={{ fontSize: 9, color: C.muted, lineHeight: 1.8 }}>
                                    {custos.impostoFixoTotal > 0 && <div>Produção/venda: <b style={{ color: "#fb923c" }}>{fmt(custos.impostoFixoTotal)}</b></div>}
                                    {metricas.impostoArmazens > 0 && <div>Armazéns: <b style={{ color: "#fb923c" }}>{fmt(metricas.impostoArmazens)}</b></div>}
                                    {custos.faturamentoEsperado > 0 && <div style={{ color: C.muted }}>Fatu. edifícios: <b style={{ color: C.text }}>{fmt(custos.faturamentoEsperado)}</b>/mês</div>}
                                </div>
                                <div style={{ fontSize: 14, fontWeight: 700, color: "#fb923c" }}>{fmt(metricas.impostoTotal)}</div>
                            </div>
                        </div>
                    )}

                    {/* Lucro líquido REAL — destaque */}
                    <div style={{ gridColumn: "1 / -1", background: viavelReal ? "rgba(16,185,129,.1)" : "rgba(239,68,68,.1)", border: `1px solid ${viavelReal ? "rgba(16,185,129,.3)" : "rgba(239,68,68,.3)"}`, borderRadius: 10, padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <div style={{ fontSize: 9, color: C.muted, marginBottom: 3 }}>✅ Lucro líquido real</div>
                            <div style={{ fontSize: 9, color: C.muted, lineHeight: 1.5 }}>
                                Receita − insumos − arm. − impostos prod./venda − impostos arm. + Fatu. edifícios
                            </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 18, fontWeight: 700, color: corLucroReal }}>
                                {fmt(metricas.lucroLiquidoReal)}
                            </div>
                            <div style={{ fontSize: 9, color: C.muted }}>por ciclo</div>
                        </div>
                    </div>

                    {/* Margem líquida real */}
                    <MetricCard icon="📊" label="Margem líquida real" value={`${metricas.margemLiquidaReal}%`} color={parseFloat(metricas.margemLiquidaReal) >= 20 ? C.green : parseFloat(metricas.margemLiquidaReal) >= 5 ? C.amber : C.red} />

                    {/* Tempo ciclo */}
                    <MetricCard icon="⏱️" label="Tempo por ciclo" value={`${calc.diasTotal}d`} color={C.blue} />
                </div>
            </div>

            {/* ── BLOCO 2: ROE e Breakeven ── */}
            <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>
                    📈 Retorno sobre investimento
                </div>

                {/* Investimento estimado */}
                <div style={{ background: "rgba(255,255,255,.04)", borderRadius: 8, padding: "8px 10px", marginBottom: 6 }}>
                    <div style={{ fontSize: 8, color: C.muted, marginBottom: 4 }}>
                        🏦 Capital estimado necessário
                        <span style={{ marginLeft: 6, opacity: .6 }}>(insumos 1 ciclo + 3 meses armazém + 1 mês imposto)</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{fmt(metricas.investimentoEstimado)}</div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                    {/* ROE por ciclo */}
                    <div style={{ background: "rgba(255,255,255,.04)", borderRadius: 8, padding: "8px 10px" }}>
                        <div style={{ fontSize: 8, color: C.muted, marginBottom: 3 }}>ROE / ciclo</div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: corROE }}>{metricas.roeReal}%</div>
                    </div>

                    {/* ROE anualizado */}
                    <div style={{ background: "rgba(255,255,255,.04)", borderRadius: 8, padding: "8px 10px" }}>
                        <div style={{ fontSize: 8, color: C.muted, marginBottom: 3 }}>
                            ROE anual <span style={{ opacity: .6 }}>({metricas.ciclosAno} ciclos)</span>
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: corROE }}>{metricas.roeAnual}%</div>
                    </div>

                    {/* Breakeven ciclos */}
                    <div style={{ background: metricas.breakevenCiclos !== null && metricas.breakevenCiclos <= 10 ? "rgba(16,185,129,.08)" : "rgba(255,255,255,.04)", borderRadius: 8, padding: "8px 10px" }}>
                        <div style={{ fontSize: 8, color: C.muted, marginBottom: 3 }}>Breakeven (ciclos)</div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: metricas.breakevenCiclos !== null ? (metricas.breakevenCiclos <= 5 ? C.green : metricas.breakevenCiclos <= 15 ? C.amber : C.red) : C.red }}>
                            {metricas.breakevenCiclos !== null ? `${metricas.breakevenCiclos}×` : "∞"}
                        </div>
                    </div>

                    {/* Breakeven dias */}
                    <div style={{ background: "rgba(255,255,255,.04)", borderRadius: 8, padding: "8px 10px" }}>
                        <div style={{ fontSize: 8, color: C.muted, marginBottom: 3 }}>Breakeven (dias)</div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: metricas.breakevenDias !== null ? (metricas.breakevenDias <= 60 ? C.green : metricas.breakevenDias <= 180 ? C.amber : C.red) : C.red }}>
                            {metricas.breakevenDias !== null ? `${metricas.breakevenDias}d` : "∞"}
                        </div>
                    </div>
                </div>

                {/* Barra de viabilidade */}
                {metricas.breakevenCiclos !== null && (
                    <div style={{ marginTop: 8, background: "rgba(255,255,255,.04)", borderRadius: 8, padding: "8px 10px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8, color: C.muted, marginBottom: 5 }}>
                            <span>Progresso ao breakeven por ciclo</span>
                            <span>{metricas.breakevenCiclos} ciclos necessários</span>
                        </div>
                        {/* Mini gráfico de ciclos até breakeven */}
                        <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                            {Array.from({ length: Math.min(metricas.breakevenCiclos, 20) }).map((_, i) => {
                                const pct = ((i + 1) / metricas.breakevenCiclos) * 100;
                                const cor = pct <= 33 ? C.red : pct <= 66 ? C.amber : C.green;
                                return (
                                    <div key={i} style={{ width: 10, height: 10, borderRadius: 3, background: cor, opacity: 0.6 + (i / metricas.breakevenCiclos) * 0.4 }} />
                                );
                            })}
                            {metricas.breakevenCiclos > 20 && (
                                <span style={{ fontSize: 8, color: C.muted, alignSelf: "center" }}>+{metricas.breakevenCiclos - 20} ciclos</span>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* ── BLOCO 3: Breakdown de custos de armazenamento ── */}
            {Object.entries(custoStorageCadeia.detalhePorCategoria)
                .sort((a, b) => b[1].custoProportional - a[1].custoProportional)
                .map(([cat, detalhe]) => {
                    const custoPorSlot = CUSTO_POR_SLOT[cat] || 15;
                    // Produtos vêm do slotsNec, não do detalhe
                    const produtosCat = slotsNec[cat]?.produtos || [];
                    return (
                        <div key={cat} style={{ background: "rgba(255,255,255,.04)", borderRadius: 8, padding: "8px 10px", marginBottom: 5 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    <span style={{ fontSize: 14 }}>{ICONS_CAT_ARMAZENAMENTO[cat] || "📦"}</span>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: C.text }}>{cat}</span>
                                    <span style={{ fontSize: 8, color: C.muted }}>({detalhe.proporcao}% da cap.)</span>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: "#fb923c" }}>{fmt(detalhe.custoProportional)}/mês</span>
                                    <span style={{ fontSize: 9, color: C.muted, display: "block" }}>
                                        R${custoPorSlot}/slot · {detalhe.slotsNec} slots / {detalhe.capDisp} disp.
                                    </span>
                                </div>
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                                {produtosCat.map((p, i) => (
                                    <span key={i} style={{ fontSize: 8, padding: "1px 5px", borderRadius: 5, background: "rgba(255,255,255,.06)", color: C.muted }}>
                                        {p.icon} {p.nome} ×{p.qtd}
                                    </span>
                                ))}
                            </div>
                            {/* Edifícios que contribuem */}
                            {detalhe.edificios.length > 0 && (
                                <div style={{ marginTop: 5, display: "flex", flexWrap: "wrap", gap: 3 }}>
                                    {detalhe.edificios.map((ed, i) => (
                                        <span key={i} style={{ fontSize: 8, padding: "1px 6px", borderRadius: 5, background: "rgba(124,58,237,.12)", color: C.purple2, border: "1px solid rgba(124,58,237,.2)" }}>
                                            🏛️ {ed.nome} ×{ed.qtd}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}

            {/* ── BLOCO 4: Gargalos de capacidade ── */}
            {custoStorageCadeia.gargalos.length > 0 && (
                <div style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>
                            📦 Capacidade de armazenamento
                        </div>
                        {temGargalo && (
                            <span style={{ fontSize: 8, fontWeight: 800, padding: "2px 7px", borderRadius: 6, background: "rgba(239,68,68,.2)", color: C.red }}>
                                ⚠️ Gargalo detectado
                            </span>
                        )}
                    </div>
                    {custoStorageCadeia.gargalos.map(a => {
                        const pct = a.capDisp > 0 ? Math.min(100, (a.capDisp / Math.max(a.slots, 1)) * 100) : 0;
                        const corBarra = a.ok ? C.green : pct > 50 ? C.amber : C.red;
                        return (
                            <div key={a.cat} style={{ marginBottom: 8, background: a.ok ? "rgba(16,185,129,.05)" : "rgba(239,68,68,.07)", border: `1px solid ${a.ok ? "rgba(16,185,129,.2)" : "rgba(239,68,68,.2)"}`, borderRadius: 9, padding: "8px 10px" }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                        <span style={{ fontSize: 16 }}>{a.icon}</span>
                                        <span style={{ fontSize: 10, fontWeight: 700, color: C.text }}>{a.cat}</span>
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                        <span style={{ fontSize: 9, fontWeight: 700, color: a.ok ? C.green : C.red }}>
                                            {a.capDisp} / {a.slots} slots
                                        </span>
                                        {a.custoCat > 0 && (
                                            <span style={{ fontSize: 8, color: "#fb923c", display: "block" }}>
                                                {fmt(a.custoCat)}/mês
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div style={{ height: 5, background: "rgba(255,255,255,.08)", borderRadius: 99, overflow: "hidden", marginBottom: 4 }}>
                                    <div style={{ height: "100%", width: `${pct}%`, background: corBarra, borderRadius: 99, transition: "width .4s" }} />
                                </div>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginBottom: a.edificios.length > 0 ? 4 : 0 }}>
                                    {a.produtos.map((p, i) => (
                                        <span key={i} style={{ fontSize: 8, fontWeight: 700, padding: "1px 5px", borderRadius: 5, background: "rgba(255,255,255,.06)", color: C.muted }}>
                                            {p.icon} {p.nome} ×{p.qtd}
                                        </span>
                                    ))}
                                </div>
                                {a.edificios.length > 0 && (
                                    <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: 4, marginTop: 2 }}>
                                        <div style={{ fontSize: 8, color: C.muted, marginBottom: 3 }}>📦 Estrutura disponível:</div>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                                            {a.edificios.map((ed, i) => (
                                                <span key={i} style={{ fontSize: 8, fontWeight: 700, padding: "1px 6px", borderRadius: 5, background: "rgba(124,58,237,.15)", color: C.purple2, border: "1px solid rgba(124,58,237,.25)" }}>
                                                    🏛️ {ed.nome} ×{ed.qtd}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {!a.ok && (
                                    <div style={{ marginTop: 5, fontSize: 9, color: C.red, fontWeight: 700 }}>
                                        ⚠️ Faltam {a.falta} slots — construa mais armazéns para "{a.cat}"
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ── BLOCO 5: Insumos necessários ── */}
            {calc.insumosDetalhados.length > 0 && (
                <div>
                    <div style={{ fontSize: 9, fontWeight: 700, color: C.muted, textTransform: "uppercase", marginBottom: 6 }}>
                        📦 Insumos necessários
                    </div>
                    {calc.insumosDetalhados.map(ins => (
                        <div key={ins.pid} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4, background: "rgba(255,255,255,.03)", borderRadius: 7, padding: "5px 8px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <span style={{ fontSize: 15 }}>{ins.icon}</span>
                                <span style={{ fontSize: 10, color: C.text }}>{ins.nome}</span>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <div style={{ fontSize: 10, fontWeight: 700, color: ins.ok ? C.green : C.red }}>{ins.qtd} un.</div>
                                {!ins.ok && <div style={{ fontSize: 8, color: C.red }}>faltam {ins.faltando}</div>}
                                {ins.ok && <div style={{ fontSize: 8, color: C.green }}>✓ em estoque</div>}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}


function MetricCard({ icon, label, value, color, tooltip }) {
    return (
        <div style={{ background: "rgba(255,255,255,.04)", borderRadius: 8, padding: "7px 9px" }} title={tooltip || ""}>
            <div style={{ fontSize: 8, color: C.muted, marginBottom: 2 }}>{icon} {label}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: color || C.text }}>{value}</div>
        </div>
    );
}

// ─── PAINEL DE CONFIGURAÇÃO DO NÓ ────────────────────────────────────────────

function PainelConfigNó({ stepData, pipelineId, todosSteps, onAtualizar }) {
    // const { dados } = useContext(CentraldeDadosContext);
    const { economiaSetores } = useContext(DadosEconomyGlobalContext);
    const { contratosEdificios, getOuGerarContratos, stock: stockLocal } = useGame();



    if (!stepData) return (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 16px", textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>👆</div>
            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7 }}>Clique em um edifício para configurá-lo</div>
        </div>
    );

    const cfg = TIPO_NÓ[stepData.tipo] || TIPO_NÓ.producao;
    const isMercado = stepData.tipo === "mercado_compra" || stepData.tipo === "mercado_venda";

    // Contextos necessários para contratos

    // Fórmulas de produção disponíveis
    const formulasProd = useMemo(() => {
        if (stepData.tipo !== "producao") return [];
        return FORMULAS_EDIFICIOS.find(e => e.nomeEdificio === stepData.buildingName)?.formulas || [];
    }, [stepData.buildingName, stepData.tipo]);

    // Fórmulas de venda disponíveis
    const formulasVenda = useMemo(() => {
        if (stepData.tipo !== "venda") return [];
        return SALES_EDIFICIOS.find(e => e.nomeEdificio === stepData.buildingName)?.formulas || [];
    }, [stepData.buildingName, stepData.tipo]);

    // Filtro de produtos para mercado — baseado nos outros steps do pipeline
    const produtosFiltrados = useMemo(() => {
        if (!isMercado) return [];
        const todosIds = Object.keys(marketPrices);

        if (stepData.tipo === "mercado_compra") {
            const inputIds = new Set();

            todosSteps.forEach(s => {
                // Edifícios de PRODUÇÃO: coleta seus inputs (insumos necessários)
                if (s.tipo === "producao" && s.buildingName) {
                    const ef = FORMULAS_EDIFICIOS.find(e => e.nomeEdificio === s.buildingName);
                    ef?.formulas?.forEach(f => Object.keys(f.input || {}).forEach(id => inputIds.add(id)));
                }
                // Edifícios de VENDA FINAL: coleta os produtos que eles vendem
                // pois o mercado_compra pode estar fornecendo esses produtos diretamente
                if (s.tipo === "venda" && s.buildingName) {
                    const ev = SALES_EDIFICIOS.find(e => e.nomeEdificio === s.buildingName);
                    ev?.formulas?.forEach(f => {
                        if (f.produto) inputIds.add(f.produto);
                    });
                }
            });

            // Se nenhum contexto encontrado, mostra todos os produtos disponíveis no mercado
            const ids = inputIds.size > 0 ? [...inputIds] : todosIds;
            return ids.filter(id => marketPrices[id])
                .map(id => ({ id, ...productsCatalog[id], preco: marketPrices[id] }))
                .filter(p => p.nome);
        }

        if (stepData.tipo === "mercado_venda") {
            const outputIds = new Set();

            todosSteps.forEach(s => {
                // Outputs de edifícios de PRODUÇÃO
                if (s.tipo === "producao" && s.formulaId) {
                    const cfg = getFormulaById(s.formulaId);
                    if (cfg) Object.keys(cfg.formula.output || {}).forEach(id => outputIds.add(id));
                }
                // Sem formulaId mas com buildingName: pega todos os outputs possíveis
                if (s.tipo === "producao" && s.buildingName && !s.formulaId) {
                    const ef = FORMULAS_EDIFICIOS.find(e => e.nomeEdificio === s.buildingName);
                    ef?.formulas?.forEach(f => Object.keys(f.output || {}).forEach(id => outputIds.add(id)));
                }
            });

            const ids = outputIds.size > 0 ? [...outputIds] : todosIds;
            return ids.filter(id => marketPrices[id])
                .map(id => ({ id, ...productsCatalog[id], preco: marketPrices[id] }))
                .filter(p => p.nome);
        }

        return [];
    }, [isMercado, stepData.tipo, todosSteps]);

    const formulaSel = useMemo(() => {
        if (!stepData.formulaId) return null;
        return getFormulaById(stepData.formulaId)?.formula || null;
    }, [stepData.formulaId]);

    function upd(campo, valor) {
        onAtualizar(stepData.id, { [campo]: valor });
    }

    // Mede a altura do header para posicionar o corpo abaixo dele
    const painelHeaderRef = React.useRef(null);
    const [painelHeaderH, setPainelHeaderH] = React.useState(56);
    React.useLayoutEffect(() => {
        if (painelHeaderRef.current) setPainelHeaderH(painelHeaderRef.current.offsetHeight);
    });

    return (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            {/* Header fixo no topo */}
            <div ref={painelHeaderRef} style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 2, padding: "12px 16px 10px", borderBottom: `1px solid ${C.border}`, background: `${cfg.bg}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 20 }}>{cfg.icone}</span>
                    <div>
                        <div style={{ fontSize: 9, fontWeight: 700, color: cfg.cor, textTransform: "uppercase", letterSpacing: ".1em" }}>{cfg.label}</div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{stepData.buildingName || "Mercado Global"}</div>
                    </div>
                </div>
            </div>

            {/* Corpo scrollável — começa exatamente abaixo do header */}
            <div style={{ position: "absolute", top: painelHeaderH, left: 0, right: 0, bottom: 0, overflowY: "auto", overflowX: "hidden", padding: "12px 16px", scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,.08) transparent" }}>

                {/* Seleção de fórmula de PRODUÇÃO */}
                {formulasProd.length > 0 && (
                    <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", marginBottom: 8 }}>
                            🧪 Qual fórmula de produção?
                        </div>
                        {formulasProd.map(f => {
                            const sel = stepData.formulaId === f.id;
                            const ins = Object.entries(f.input || {});
                            const outs = Object.entries(f.output || {});

                            // ── Cálculo financeiro por 1 run ──
                            const custoRun = ins.reduce((soma, [pid, q]) =>
                                soma + (getMarketPrice(pid, economiaSetores) * q), 0);
                            const receitaRun = outs.reduce((soma, [pid, q]) =>
                                soma + (getMarketPrice(pid, economiaSetores) * q), 0);
                            const lucroRun = receitaRun - custoRun;
                            const margem = custoRun > 0 ? ((lucroRun / custoRun) * 100).toFixed(0) : 0;
                            const corLucro = lucroRun > 0 ? "#10b981" : lucroRun === 0 ? "#f59e0b" : "#ef4444";

                            return (
                                <div key={f.id} onClick={() => upd("formulaId", f.id)}
                                    style={{
                                        background: sel ? "rgba(124,58,237,.2)" : "rgba(255,255,255,.04)",
                                        border: `1px solid ${sel ? C.purple : C.border}`,
                                        borderRadius: 10, padding: "10px 12px", marginBottom: 6,
                                        cursor: "pointer", transition: "all .15s"
                                    }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: sel ? C.purple2 : C.text, marginBottom: 6 }}>
                                        {f.nome}
                                    </div>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginBottom: 4 }}>
                                        {ins.map(([pid, q]) => <ProdChip key={pid} pid={pid} qtd={q} tipo="input" />)}
                                    </div>
                                    <div style={{ fontSize: 8, color: C.muted, margin: "4px 0" }}>→ Produz:</div>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginBottom: 8 }}>
                                        {outs.map(([pid, q]) => <ProdChip key={pid} pid={pid} qtd={q} tipo="output" />)}
                                    </div>

                                    {/* ── Mini painel financeiro ── */}
                                    <div style={{
                                        borderTop: "1px solid rgba(255,255,255,.08)",
                                        paddingTop: 7, marginTop: 2,
                                        display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                                        gap: 4
                                    }}>
                                        <div style={{ background: "rgba(239,68,68,.1)", borderRadius: 6, padding: "4px 6px", textAlign: "center" }}>
                                            <div style={{ fontSize: 7, color: "rgba(252,165,165,.7)", marginBottom: 1 }}>💸 Custo/run</div>
                                            <div style={{ fontSize: 11, fontWeight: 700, color: "#fca5a5" }}>
                                                {custoRun >= 1e6 ? `R$${(custoRun / 1e6).toFixed(1)}M`
                                                    : custoRun >= 1e3 ? `R$${Math.round(custoRun / 1e3)}k`
                                                        : `R$${Math.round(custoRun)}`}
                                            </div>
                                        </div>
                                        <div style={{ background: "rgba(16,185,129,.1)", borderRadius: 6, padding: "4px 6px", textAlign: "center" }}>
                                            <div style={{ fontSize: 7, color: "rgba(110,231,183,.7)", marginBottom: 1 }}>📈 Receita/run</div>
                                            <div style={{ fontSize: 11, fontWeight: 700, color: "#6ee7b7" }}>
                                                {receitaRun >= 1e6 ? `R$${(receitaRun / 1e6).toFixed(1)}M`
                                                    : receitaRun >= 1e3 ? `R$${Math.round(receitaRun / 1e3)}k`
                                                        : `R$${Math.round(receitaRun)}`}
                                            </div>
                                        </div>
                                        <div style={{ background: lucroRun > 0 ? "rgba(16,185,129,.1)" : "rgba(239,68,68,.1)", borderRadius: 6, padding: "4px 6px", textAlign: "center" }}>
                                            <div style={{ fontSize: 7, color: "rgba(255,255,255,.4)", marginBottom: 1 }}>
                                                {lucroRun > 0 ? "✅" : "❌"} Lucro
                                            </div>
                                            <div style={{ fontSize: 11, fontWeight: 700, color: corLucro }}>
                                                {lucroRun >= 1e6 ? `R$${(lucroRun / 1e6).toFixed(1)}M`
                                                    : lucroRun >= 1e3 ? `R$${Math.round(lucroRun / 1e3)}k`
                                                        : `R$${Math.round(lucroRun)}`}
                                                <span style={{ fontSize: 8, fontWeight: 400, marginLeft: 3, opacity: .8 }}>({margem}%)</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", gap: 10, fontSize: 9, color: C.muted, marginTop: 7 }}>
                                        <span>⏱️ {f.duracao} dias</span>
                                        <span>📦 Cap: {f.capacidadePorEdificio}/edifício</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Seleção de fórmula de VENDA — mostra contratos reais disponíveis */}
                {formulasVenda.length > 0 && (() => {
                    const dia = useCentralStore((s) => s.dia);
                    const salesEd = SALES_EDIFICIOS.find(e => e.nomeEdificio === stepData.buildingName);
                    const contratos = salesEd && getOuGerarContratos
                        ? getOuGerarContratos(salesEd, dia || 0)
                        : [];

                    return (
                        <div style={{ marginBottom: 14 }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", marginBottom: 8 }}>
                                📋 Contratos disponíveis
                            </div>

                            {/* Contratos reais do ManagerSellPanel */}
                            {contratos.length > 0 ? (
                                contratos.map(c => {
                                    // Encontra a fórmula de venda correspondente ao produto do contrato
                                    const sf = formulasVenda.find(f => f.produto === c.productId);
                                    if (!sf) return null;
                                    const sel = stepData.formulaId === sf.id;
                                    const prod = productsCatalog[c.productId];
                                    const estAtual = stockLocal?.[c.productId] || 0;
                                    const temEst = estAtual >= c.quantidade;
                                    return (
                                        <div key={c.id} onClick={() => {
                                            upd("formulaId", sf.id);
                                            upd("produtoId", c.productId);
                                            upd("quantidade", c.quantidade);
                                        }}
                                            style={{ background: sel ? "rgba(239,68,68,.18)" : "rgba(255,255,255,.04)", border: `1px solid ${sel ? C.red : C.border}`, borderRadius: 10, padding: "10px 12px", marginBottom: 6, cursor: "pointer" }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, alignItems: "center" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                                                    <span style={{ fontSize: 20 }}>{prod?.icon || "📦"}</span>
                                                    <div>
                                                        <div style={{ fontSize: 11, fontWeight: 700, color: sel ? "#fca5a5" : C.text }}>{prod?.nome || c.productId}</div>
                                                        <div style={{ fontSize: 9, color: C.green }}>+{c.margemAplicada}% margem</div>
                                                    </div>
                                                </div>
                                                {sel && <span style={{ color: C.red, fontSize: 14 }}>✓</span>}
                                            </div>
                                            <div style={{ display: "flex", gap: 10, fontSize: 9, color: C.muted }}>
                                                <span>📦 {c.quantidade} un.</span>
                                                <span style={{ color: C.amber }}>💰 R${Math.round(c.valorTotal).toLocaleString()}</span>
                                                <span>⏱️ {c.prazoDias}d</span>
                                            </div>
                                            <div style={{ marginTop: 5 }}>
                                                {temEst
                                                    ? <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 8, background: "rgba(16,185,129,.2)", color: C.green }}>✓ Estoque ok</span>
                                                    : <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 8, background: "rgba(239,68,68,.15)", color: C.red }}>✗ Faltam {c.quantidade - estAtual}</span>
                                                }
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                /* Fallback: mostra fórmulas com margem se não há contratos gerados */
                                formulasVenda.map(f => {
                                    const sel = stepData.formulaId === f.id;
                                    const prod = productsCatalog[f.produto];
                                    return (
                                        <div key={f.id} onClick={() => upd("formulaId", f.id)}
                                            style={{ background: sel ? "rgba(239,68,68,.18)" : "rgba(255,255,255,.04)", border: `1px solid ${sel ? C.red : C.border}`, borderRadius: 10, padding: "10px 12px", marginBottom: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
                                            <span style={{ fontSize: 22 }}>{prod?.icon || "📦"}</span>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: 12, fontWeight: 700, color: sel ? "#fca5a5" : C.text }}>{f.nome || prod?.nome}</div>
                                                <div style={{ fontSize: 10, color: C.green, fontWeight: 700 }}>+{f.margemBase}% margem</div>
                                            </div>
                                            {sel && <span style={{ color: C.red }}>✓</span>}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    );
                })()}

                {/* Produto do mercado — filtrado por contexto */}
                {isMercado && (
                    <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", marginBottom: 6 }}>
                            {stepData.tipo === "mercado_compra" ? "📥 Qual insumo comprar?" : "📤 Qual produto vender?"}
                        </div>
                        {produtosFiltrados.length === 0 ? (
                            <p style={{ fontSize: 11, color: C.muted }}>Adicione edifícios de produção ao pipeline para filtrar automaticamente.</p>
                        ) : (
                            <select style={inputStyle} value={stepData.produtoId || ""} onChange={e => upd("produtoId", e.target.value)}>
                                <option className="bg-black/90" value="">Selecione o produto...</option>
                                {produtosFiltrados.map(p => (
                                    <option className="bg-black" key={p.id} value={p.id}>{p.icon} {p.nome} — R${p.preco}/u</option>
                                ))}
                            </select>
                        )}
                        {stepData.produtoId && (
                            <div style={{ fontSize: 10, color: C.muted, marginTop: 6 }}>
                                Estoque atual: <b style={{ color: C.amber }}>
                                    {stockLocal[stepData.produtoId] || 0}  {/* ← era useGame().stock */}
                                </b>
                            </div>
                        )}
                        {stepData.tipo === "mercado_compra" && (
                            <div style={{ marginTop: 10 }}>
                                <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", marginBottom: 5 }}>
                                    🏷️ Não comprar se preço &gt; R$
                                </div>
                                <input type="number" min={0} style={inputStyle} value={stepData.precoTeto || 99999} onChange={e => upd("precoTeto", parseInt(e.target.value) || 99999)} />
                            </div>
                        )}
                    </div>
                )}

                {/* Quantidade por ciclo com botão MAX e limitador */}
                {(() => {
                    // Busca a quantidade de edifícios construídos pelo nome do step
                    // dados[setor].edificios é um array, então precisa de .find()
                    const SETORES_JOGO = ["agricultura", "industria", "comercio", "tecnologia", "imobiliario", "energia"];
                    let qtdEdificios = 1;
                    if (stepData.buildingName) {
                        for (const s of SETORES_JOGO) {
                            const estaticos = EDIFICIOS_FINAIS_ESTATICOS[s]?.edificios || [];
                            const dinamicos = edificiosFinais[s]?.edificios || [];
                            const index = estaticos.findIndex(e => e.nome === stepData.buildingName);
                            if (index === -1) continue;
                            const quantidade = dinamicos[index]?.quantidade ?? 0;
                            if (quantidade > 0) { qtdEdificios = quantidade; break; }
                        }
                    }

                    const capMax = formulaSel?.capacidadePorEdificio
                        ? formulaSel.capacidadePorEdificio * qtdEdificios
                        : null;

                    return (
                        <div style={{ marginBottom: 12, background: "rgba(255,255,255,.04)", borderRadius: 8, padding: "10px 12px" }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", marginBottom: 6 }}>
                                🔄 Quantidade por ciclo de produção
                            </div>
                            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                                <input
                                    type="number" min={1} max={capMax || undefined}
                                    style={{ ...inputStyle, flex: 1 }}
                                    value={stepData.quantidade || 1}
                                    onChange={e => {
                                        let val = Math.max(1, parseInt(e.target.value) || 1);
                                        if (capMax && val > capMax) val = capMax;
                                        upd("quantidade", val);
                                    }}
                                />
                                {capMax && (
                                    <button
                                        onClick={() => upd("quantidade", capMax)}
                                        style={{ background: "rgba(245,158,11,.2)", border: "1px solid rgba(245,158,11,.4)", borderRadius: 6, color: C.amber, padding: "5px 10px", fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", flexShrink: 0, whiteSpace: "nowrap" }}
                                    >
                                        MAX {capMax}
                                    </button>
                                )}
                            </div>
                            {capMax && (
                                <div style={{ fontSize: 9, color: C.muted, marginTop: 4 }}>
                                    💡 {qtdEdificios} edifício(s) × {formulaSel.capacidadePorEdificio} cap./edifício = {capMax} máx.
                                </div>
                            )}
                        </div>
                    );
                })()}

                {/* Estratégia de venda — só para nós de venda final */}
                {/* Estratégia de venda — só para nós de venda final */}
                {stepData.tipo === "venda" && (
                    <div style={{ marginBottom: 12, background: "rgba(255,255,255,.04)", borderRadius: 8, padding: "10px 12px" }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", marginBottom: 8 }}>
                            📋 Qual contrato aceitar?
                        </div>
                        {[
                            { v: "maior_margem", l: "📈 Maior margem %", d: "Aceita o contrato com melhor % de lucro no momento" },
                            { v: "maior_valor", l: "💰 Maior valor R$", d: "Aceita o contrato com maior valor total em dinheiro" },
                            { v: "produto_fixo", l: "🎯 Produto fixo", d: "Vende sempre o produto selecionado acima, ignora outros" },
                        ].map(op => (
                            <div key={op.v} onClick={() => upd("estrategiaVenda", op.v)}
                                style={{
                                    padding: "7px 9px", borderRadius: 7, cursor: "pointer", marginBottom: 4,
                                    background: (stepData.estrategiaVenda || "maior_margem") === op.v ? "rgba(239,68,68,.2)" : "transparent",
                                    border: `1px solid ${(stepData.estrategiaVenda || "maior_margem") === op.v ? C.red : "transparent"}`,
                                    transition: "all .15s"
                                }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: (stepData.estrategiaVenda || "maior_margem") === op.v ? "#fca5a5" : C.text }}>{op.l}</div>
                                <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>{op.d}</div>
                            </div>
                        ))}

                        {/* Atender todos os contratos disponíveis */}
                        <div style={{ marginTop: 8, borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: 8 }}>
                            <div style={{ fontSize: 9, fontWeight: 700, color: C.muted, textTransform: "uppercase", marginBottom: 6 }}>
                                🔁 Modo de repetição
                            </div>
                            {[
                                { v: false, l: "📋 Um contrato por vez", d: "Atende 1 contrato e aguarda o próximo dia" },
                                { v: true, l: "⚡ Atender todos disponíveis", d: "Loop contínuo — preenche todos os slots do edifício" },
                            ].map(op => (
                                <div key={String(op.v)} onClick={() => upd("atenderTodosContratos", op.v)}
                                    style={{
                                        padding: "7px 9px", borderRadius: 7, cursor: "pointer", marginBottom: 4,
                                        background: (stepData.atenderTodosContratos === op.v) ? "rgba(16,185,129,.15)" : "transparent",
                                        border: `1px solid ${(stepData.atenderTodosContratos === op.v) ? C.green : "transparent"}`,
                                        transition: "all .15s"
                                    }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: (stepData.atenderTodosContratos === op.v) ? C.green : C.text }}>{op.l}</div>
                                    <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>{op.d}</div>
                                </div>
                            ))}
                        </div>

                        {/* Filtro de produto fixo */}
                        {stepData.filtrarProduto && (
                            <div style={{ marginTop: 6, fontSize: 9, color: C.amber, background: "rgba(245,158,11,.1)", borderRadius: 6, padding: "5px 8px" }}>
                                🎯 Filtrando apenas: <b>{productsCatalog[stepData.filtrarProduto]?.nome || stepData.filtrarProduto}</b>
                                <span
                                    onClick={() => upd("filtrarProduto", null)}
                                    style={{ marginLeft: 8, cursor: "pointer", color: C.red, fontWeight: 700 }}
                                >✕ remover filtro</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Estratégia quando falta estoque — só para venda final */}
                {stepData.tipo === "venda" && (
                    <div style={{ marginBottom: 12, background: "rgba(255,255,255,.04)", borderRadius: 8, padding: "10px 12px" }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", marginBottom: 6 }}>
                            ⚡ Se faltar produto no estoque:
                        </div>
                        {[
                            { v: "so_armazem", l: "⏸️ Aguardar", d: "Espera até ter o produto disponível no armazém" },
                            { v: "comprar_se_faltar", l: "🛒 Comprar no mercado", d: "Compra o produto faltante no mercado global (custo extra)" },
                            { v: "mercado_primeiro", l: "🚀 Mercado sempre", d: "Sempre compra do mercado, sem esperar produção" },
                        ].map(op => (
                            <div key={op.v} onClick={() => upd("prioridadeInsumo", op.v)}
                                style={{
                                    padding: "7px 9px", borderRadius: 7, cursor: "pointer", marginBottom: 4,
                                    background: stepData.prioridadeInsumo === op.v ? "rgba(124,58,237,.2)" : "transparent",
                                    border: `1px solid ${stepData.prioridadeInsumo === op.v ? C.purple : "transparent"}`,
                                    transition: "all .15s"
                                }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: stepData.prioridadeInsumo === op.v ? C.purple2 : C.text }}>{op.l}</div>
                                <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>{op.d}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Threshold */}
                <div style={{ marginBottom: 12, background: "rgba(255,255,255,.04)", borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", marginBottom: 4 }}>
                        {stepData.tipo === "mercado_compra" ? "🛒 Comprar automaticamente quando estoque do produto cair abaixo de:" :
                            stepData.tipo === "mercado_venda" ? "💸 Vender apenas o que ultrapassar no estoque:" :
                                stepData.tipo === "venda" ? "🛡️ Guardar no mínimo esta reserva antes de vender:" :
                                    "⚙️ Iniciar nova produção quando tiver menos que X do produto final:"}
                    </div>
                    <input type="number" min={0} style={inputStyle} value={stepData.condicaoThreshold || 0} onChange={e => upd("condicaoThreshold", Math.max(0, parseInt(e.target.value) || 0))} />
                    <div style={{ fontSize: 9, color: C.muted, marginTop: 4 }}>
                        {stepData.condicaoThreshold > 0
                            ? `A automação só age quando o estoque cruzar ${stepData.condicaoThreshold} unidades`
                            : "Definido como 0 = age sempre que possível"}
                    </div>
                </div>

                {/* Prioridade de insumo — só para produção */}
                {stepData.tipo === "producao" && (
                    <div style={{ marginBottom: 12, background: "rgba(255,255,255,.04)", borderRadius: 8, padding: "10px 12px" }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", marginBottom: 6 }}>
                            ⚡ O que fazer se faltar insumo?
                        </div>
                        {[
                            { v: "so_armazem", l: "⏸️ Pausar", d: "Espera até ter os insumos no armazém" },
                            { v: "comprar_se_faltar", l: "🛒 Comprar no mercado", d: "Compra automaticamente o que falta (custo extra)" },
                            { v: "mercado_primeiro", l: "🚀 Mercado sempre", d: "Usa o mercado global como fornecedor prioritário" },
                        ].map(op => (
                            <div key={op.v} onClick={() => upd("prioridadeInsumo", op.v)}
                                style={{ padding: "7px 9px", borderRadius: 7, cursor: "pointer", marginBottom: 4, background: stepData.prioridadeInsumo === op.v ? "rgba(124,58,237,.2)" : "transparent", border: `1px solid ${stepData.prioridadeInsumo === op.v ? C.purple : "transparent"}`, transition: "all .15s" }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: stepData.prioridadeInsumo === op.v ? C.purple2 : C.text }}>{op.l}</div>
                                <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>{op.d}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Preview de insumos da fórmula selecionada */}
                {formulaSel && stepData.tipo === "producao" && (
                    <div style={{ background: "rgba(255,255,255,.04)", borderRadius: 8, padding: "10px 12px" }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", marginBottom: 8 }}>
                            📋 Insumos para {stepData.quantidade || 1} ciclo(s)
                        </div>
                        {Object.entries(formulaSel.input || {}).map(([pid, qtd]) => {
                            const total = qtd * (stepData.quantidade || 1);
                            const est = stockLocal[pid] || 0;
                            return (
                                <div key={pid} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11 }}>
                                        <span>{productsCatalog[pid]?.icon || "📦"}</span>
                                        <span style={{ color: C.muted }}>{productsCatalog[pid]?.nome || pid}</span>
                                    </div>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: est >= total ? C.green : C.red }}>
                                        {est} / {total}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}


// ─── Footer do canvas — resumo de armazenamento de toda a cadeia ────────────

function FooterCanvas({ steps }) {
    const edificiosFinais = useCentralStore(s => s.edificiosFinais);

    const slotsNec = useMemo(() => calcularSlotsNecessarios(steps), [steps]);
    const capArm = useMemo(() => {
        const resultado = {};
        const SETORES_JOGO = ["agricultura", "industria", "comercio", "tecnologia", "imobiliario", "energia"];

        SETORES_JOGO.forEach(setor => {
            const estaticos = EDIFICIOS_FINAIS_ESTATICOS[setor]?.edificios || [];
            const dinamicos = edificiosFinais[setor]?.edificios || [];

            dinamicos.forEach((edDin, index) => {
                if ((edDin.quantidade ?? 0) < 1) return;
                const edEst = estaticos[index];
                if (!edEst) return;

                // passa o objeto combinado (nome do estático + quantidade do dinâmico)
                // para calcularStorageGlobal processar corretamente
                const edCombinado = { ...edEst, quantidade: edDin.quantidade };
                // insere no formato que calcularStorageGlobal espera
                if (!resultado[setor]) resultado[setor] = { edificios: [] };
                resultado[setor].edificios.push(edCombinado);
            });
        });

        return calcularStorageGlobal(resultado);
    }, [edificiosFinais]);


    const categorias = useMemo(() => {
        return Object.entries(slotsNec).map(([cat, { slots }]) => {
            const capDisp = capArm[cat]?.total || 0;
            const ok = capDisp >= slots;
            const pct = capDisp > 0 ? Math.min(100, (capDisp / Math.max(slots, 1)) * 100) : 0;
            const cor = ok ? "#10b981" : pct > 50 ? "#f59e0b" : "#ef4444";
            return { cat, slots, capDisp, ok, pct, cor, icon: ICONS_CAT_ARMAZENAMENTO[cat] || "📦" };
        }).sort((a, b) => (a.ok ? 1 : -1) - (b.ok ? 1 : -1));
    }, [slotsNec, capArm]);

    if (categorias.length === 0) return null;

    const temGargalo = categorias.some(c => !c.ok);

    return (
        <div style={{
            position: "absolute", bottom: 60, left: "50%", transform: "translateX(-50%)",
            zIndex: 15, background: "rgba(7,4,26,.92)", backdropFilter: "blur(8px)",
            border: `1px solid ${temGargalo ? "rgba(239,68,68,.4)" : "rgba(16,185,129,.3)"}`,
            borderRadius: 12, padding: "8px 14px",
            display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap",
            maxWidth: "80%", boxShadow: temGargalo ? "0 0 20px rgba(239,68,68,.15)" : "0 4px 20px rgba(0,0,0,.5)",
        }}>
            {/* Label */}
            <span style={{ fontSize: 9, fontWeight: 700, color: temGargalo ? "#fbbf24" : "#10b981", textTransform: "uppercase", letterSpacing: ".1em", marginRight: 4, flexShrink: 0 }}>
                {temGargalo ? "⚠️ Gargalos" : "✅ Armazenamento"}
            </span>
            <div style={{ width: 1, height: 16, background: "rgba(255,255,255,.1)", flexShrink: 0 }} />

            {/* Uma pill por categoria */}
            {categorias.map(c => (
                <div key={c.cat} style={{
                    display: "flex", alignItems: "center", gap: 4,
                    background: c.ok ? "rgba(16,185,129,.1)" : "rgba(239,68,68,.1)",
                    border: `1px solid ${c.ok ? "rgba(16,185,129,.25)" : "rgba(239,68,68,.35)"}`,
                    borderRadius: 8, padding: "3px 8px",
                    cursor: "default",
                }}>
                    <span style={{ fontSize: 13 }}>{c.icon}</span>
                    {/* Mini barra */}
                    <div style={{ width: 32, height: 4, background: "rgba(255,255,255,.08)", borderRadius: 99, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${c.pct}%`, background: c.cor, borderRadius: 99 }} />
                    </div>
                    {/* Valores */}
                    <span style={{ fontSize: 9, fontWeight: 700, color: c.cor, whiteSpace: "nowrap" }}>
                        {c.capDisp}/{c.slots}
                        {!c.ok && " ⚠️"}
                    </span>
                </div>
            ))}
        </div>
    );
}

// ─── EDITOR CANVAS ────────────────────────────────────────────────────────────

function EditorCanvas({ pipelineId, onSalvar }) {
    const { pipelines, adicionarStep, removerStep, atualizarStep, salvarEdges } = usePipeline();
    const { stock } = useGame();
    const pipeline = pipelines.find(p => p.id === pipelineId);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState(pipeline?.edges || []);
    const [nóSel, setNóSel] = useState(null);
    const [addAberto, setAddAberto] = useState(false);

    // Calcula capacidade de armazenamento para passar aos nós
    const capArm = useMemo(() => {
        const resultado = {};
        const SETORES_JOGO = ["agricultura", "industria", "comercio", "tecnologia", "imobiliario", "energia"];

        SETORES_JOGO.forEach(setor => {
            const estaticos = EDIFICIOS_FINAIS_ESTATICOS[setor]?.edificios || [];
            const dinamicos = edificiosFinais[setor]?.edificios || [];

            dinamicos.forEach((edDin, index) => {
                if ((edDin.quantidade ?? 0) < 1) return;
                const edEst = estaticos[index];
                if (!edEst) return;
                if (!resultado[setor]) resultado[setor] = { edificios: [] };
                resultado[setor].edificios.push({ ...edEst, quantidade: edDin.quantidade });
            });
        });

        return calcularStorageGlobal(resultado);
    }, [edificiosFinais]);

    // Reconstrói nodes a partir dos steps do contexto — inclui dados de gargalo
    useEffect(() => {
        if (!pipeline) return;
        setNodes(pipeline.steps.map((step, i) => stepParaNó(step, i, capArm, stock)));
    }, [pipeline?.steps?.length, pipelineId, capArm, stock]);

    // Restaura edges ao abrir o editor
    useEffect(() => {
        if (pipeline?.edges?.length > 0) setEdges(pipeline.edges);
    }, [pipelineId]);

    const onConnect = useCallback((p) => {
        const newEdge = { ...p, animated: true, style: { stroke: C.purple, strokeWidth: 2, strokeDasharray: "6 4" }, markerEnd: { type: MarkerType.ArrowClosed, color: C.purple } };
        setEdges(es => addEdge(newEdge, es));
    }, []);

    const onNodeClick = useCallback((_, n) => setNóSel(n.id), []);
    const onPaneClick = useCallback(() => setNóSel(null), []);
    const onNodeDragStop = useCallback((_, n) => {
        if (pipelineId) atualizarStep(pipelineId, n.id, { _posicao: n.position });
    }, [pipelineId, atualizarStep]);

    function removerNóSel() {
        if (!nóSel) return;
        setNodes(ns => ns.filter(n => n.id !== nóSel));
        setEdges(es => es.filter(e => e.source !== nóSel && e.target !== nóSel));
        if (pipelineId) removerStep(pipelineId, nóSel);
        setNóSel(null);
    }

    function addNóManual(tipo, buildingName) {
        if (pipelineId) adicionarStep(pipelineId, tipo, buildingName);
        setAddAberto(false);
    }

    function handleSalvar() {
        if (pipelineId) salvarEdges(pipelineId, edges);
        console.log("[Pipeline] Salvo — edges:", edges.length, "steps:", pipeline?.steps?.length);
        onSalvar();
    }

    const stepSelecionado = pipeline?.steps?.find(s => s.id === nóSel) || null;
    const edificiosFinais = useCentralStore(s => s.edificiosFinais);

    const edsP = useMemo(
        () => getEdsTipo(EDIFICIOS_FINAIS_ESTATICOS, edificiosFinais, "producao"),
        [edificiosFinais]
    );
    const edsV = useMemo(
        () => getEdsTipo(EDIFICIOS_FINAIS_ESTATICOS, edificiosFinais, "venda"),
        [edificiosFinais]
    );

    if (!pipeline) return <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: C.bg, color: C.muted }}>Pipeline não encontrado.</div>;

    return (
        <div style={{ display: "flex", height: "100%", width: "100%", minHeight: 0, overflow: "hidden" }}>
            <div style={{ flex: 1, position: "relative" }}>
                {/* Toolbar */}
                <div style={{ position: "absolute", top: 12, left: 12, right: 12, zIndex: 10, display: "flex", gap: 8, alignItems: "center" }}>
                    <button onClick={() => setAddAberto(p => !p)}
                        style={{ background: C.purple, border: "none", borderRadius: 8, color: "#fff", padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
                        ➕ Adicionar edifício / ação
                    </button>
                    {nóSel && (
                        <button onClick={removerNóSel}
                            style={{ background: "rgba(239,68,68,.2)", border: "1px solid rgba(239,68,68,.4)", borderRadius: 8, color: C.red, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                            🗑️ Remover
                        </button>
                    )}
                    <span style={{ fontSize: 10, color: C.muted, background: "rgba(0,0,0,.4)", padding: "4px 10px", borderRadius: 6 }}>
                        {pipeline.steps?.length || 0} ações configuradas
                    </span>
                    <button onClick={handleSalvar}
                        style={{ marginLeft: "auto", background: C.green, border: "none", borderRadius: 8, color: "#fff", padding: "7px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                        💾 Salvar
                    </button>
                </div>

                {/* Painel de adição */}
                {addAberto && (
                    <div style={{ position: "absolute", top: 52, left: 12, zIndex: 20, background: C.bg2, border: `1px solid ${C.border2}`, borderRadius: 12, padding: "14px 16px", width: 260, maxHeight: "60vh", overflowY: "auto" }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", marginBottom: 10 }}>Escolha o edifício ou ação</div>

                        <div style={{ marginBottom: 12 }}>
                            <div style={{ fontSize: 9, fontWeight: 700, color: C.green, textTransform: "uppercase", marginBottom: 6 }}>🌐 Mercado Global</div>
                            {[
                                { tipo: "mercado_compra", l: "📥 Comprar insumos", d: "Importa produtos com delay de 10 dias" },
                                { tipo: "mercado_venda", l: "📤 Vender excedente", d: "Exporta produtos com delay de 10 dias" },
                            ].map(m => (
                                <div key={m.tipo} onClick={() => addNóManual(m.tipo, "Mercado Global")}
                                    style={{ padding: "8px 10px", borderRadius: 8, cursor: "pointer", marginBottom: 4, background: "rgba(16,185,129,.08)", border: "1px dashed rgba(16,185,129,.35)", transition: "all .15s" }}
                                    onMouseEnter={e => e.currentTarget.style.background = "rgba(16,185,129,.16)"}
                                    onMouseLeave={e => e.currentTarget.style.background = "rgba(16,185,129,.08)"}
                                >
                                    <div style={{ fontSize: 11, fontWeight: 700, color: C.text }}>{m.l}</div>
                                    <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>{m.d}</div>
                                </div>
                            ))}
                        </div>

                        {edsP.length > 0 && (
                            <div style={{ marginBottom: 12 }}>
                                <div style={{ fontSize: 9, fontWeight: 700, color: C.purple2, textTransform: "uppercase", marginBottom: 6 }}>🏭 Edifícios de produção</div>
                                {edsP.map(ed => (
                                    <div key={ed.nome} onClick={() => addNóManual("producao", ed.nome)}
                                        style={{ padding: "7px 10px", borderRadius: 8, cursor: "pointer", marginBottom: 3, background: C.card, border: `1px solid ${C.border}`, transition: "all .15s" }}
                                        onMouseEnter={e => e.currentTarget.style.borderColor = C.purple}
                                        onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
                                    >
                                        <div style={{ fontSize: 11, fontWeight: 700, color: C.text }}>🏭 {ed.nome}</div>
                                        <div style={{ fontSize: 9, color: C.muted }}>×{ed.quantidade} construídos · {ed.setor}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {edsV.length > 0 && (
                            <div>
                                <div style={{ fontSize: 9, fontWeight: 700, color: "#fca5a5", textTransform: "uppercase", marginBottom: 6 }}>🏪 Edifícios de venda final</div>
                                {edsV.map(ed => (
                                    <div key={ed.nome} onClick={() => addNóManual("venda", ed.nome)}
                                        style={{ padding: "7px 10px", borderRadius: 8, cursor: "pointer", marginBottom: 3, background: C.card, border: `1px solid ${C.border}`, transition: "all .15s" }}
                                        onMouseEnter={e => e.currentTarget.style.borderColor = C.red}
                                        onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
                                    >
                                        <div style={{ fontSize: 11, fontWeight: 700, color: C.text }}>🏪 {ed.nome}</div>
                                        <div style={{ fontSize: 9, color: C.muted }}>×{ed.quantidade} · {ed.setor}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <ReactFlow
                    nodes={nodes} edges={edges}
                    onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
                    onConnect={onConnect} onNodeClick={onNodeClick}
                    onPaneClick={onPaneClick} onNodeDragStop={onNodeDragStop}
                    nodeTypes={nodeTypes} fitView fitViewOptions={{ padding: 0.12 }}
                    minZoom={0.08} maxZoom={2.5} style={{ background: C.bg }}
                >
                    <Background variant="dots" gap={28} size={1} color="rgba(255,255,255,.04)" />
                    <Controls style={{ background: C.bg2, border: `1px solid ${C.border}`, borderRadius: 8 }} />
                    <MiniMap nodeColor={n => TIPO_NÓ[n.data?.tipo]?.cor || C.purple} style={{ background: C.bg2, border: `1px solid ${C.border}`, borderRadius: 8 }} zoomable pannable />
                </ReactFlow>

                {/* Footer: resumo de armazenamento da cadeia inteira */}
                <FooterCanvas steps={pipeline?.steps || []} />
            </div>

            {/* Painel lateral de configuração — posição absoluta para scroll correto */}
            <div style={{ width: 280, flexShrink: 0, background: C.bg2, borderLeft: `1px solid ${C.border}`, position: "relative" }}>
                <PainelConfigNó
                    stepData={stepSelecionado}
                    pipelineId={pipelineId}
                    todosSteps={pipeline?.steps || []}
                    onAtualizar={(stepId, campos) => {
                        if (pipelineId) atualizarStep(pipelineId, stepId, campos);
                        setNodes(ns => ns.map(n => n.id === stepId ? { ...n, data: { ...n.data, ...campos } } : n));
                    }}
                />
            </div>
        </div>
    );
}

// ─── ETAPA 0 — Objetivo ───────────────────────────────────────────────────────

const OBJETIVOS = [
    { id: "contrato_venda", titulo: "Atender contratos de venda", sub: "💰 Mais lucrativo", desc: "Monte uma cadeia para abastecer seus edifícios de venda e assinar contratos.", icone: "🤝", cor: C.green, requerId: "venda" },
    { id: "venda_producao", titulo: "Vender produtos produzidos", sub: "🎯 Controle total", desc: "Defina o que produzir e como escoar — contratos ou mercado global.", icone: "🏭", cor: C.purple2, requerId: "producao" },
    { id: "arbitragem", titulo: "Aproveitar variação de mercado", sub: "📈 Estratégico", desc: "Compre barato num setor em recessão e venda caro num setor aquecido.", icone: "📈", cor: C.amber, requerId: null },
    { id: "ociosos", titulo: "Ativar edifícios ociosos", sub: "⚡ Aproveitar estrutura", desc: "Edifícios construídos sem produção ativa. Monte cadeias para eles.", icone: "⚡", cor: C.teal, requerId: "producao" },
    { id: "escoar_estoque", titulo: "Escoar estoque acumulado", sub: "📦 Liberar armazém", desc: "Há produtos parados. Crie rotas de venda para liquidá-los.", icone: "📦", cor: C.blue, requerId: null },
];

function EtapaObjetivo({ onProximo }) {
    const edificiosFinais = useCentralStore(s => s.edificiosFinais);
    const { stock } = useGame();

    const temVenda = getEdsTipo(EDIFICIOS_FINAIS_ESTATICOS, edificiosFinais, "venda").length > 0;
    const temProducao = getEdsTipo(EDIFICIOS_FINAIS_ESTATICOS, edificiosFinais, "producao").length > 0;
    const temEstoque = Object.values(stock).some(v => v > 10);
    const hab = (obj) => {
        if (obj.requerId === "venda") return temVenda;
        if (obj.requerId === "producao") return temProducao;
        if (obj.id === "escoar_estoque") return temEstoque;
        return true;
    };
    return (
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "32px 24px", paddingBottom: 40 }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.purple2, textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 8 }}>Nova cadeia produtiva</div>
                <Titulo>Qual é o seu objetivo?</Titulo>
                <p style={{ fontSize: 13, color: C.muted, marginTop: 6 }}>A cadeia será montada com base no que você quer alcançar.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {OBJETIVOS.map(obj => {
                    const ativo = hab(obj);
                    return (
                        <div key={obj.id} onClick={() => ativo && onProximo(obj.id)}
                            style={{ background: ativo ? C.card : "rgba(255,255,255,.02)", border: `1px solid ${ativo ? obj.cor + "44" : C.border}`, borderRadius: 14, padding: "15px 20px", cursor: ativo ? "pointer" : "not-allowed", opacity: ativo ? 1 : 0.42, display: "flex", alignItems: "center", gap: 16 }}
                            onMouseEnter={e => ativo && (e.currentTarget.style.background = `${obj.cor}18`)}
                            onMouseLeave={e => ativo && (e.currentTarget.style.background = C.card)}
                        >
                            <span style={{ fontSize: 26 }}>{obj.icone}</span>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                                    <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{obj.titulo}</span>
                                    <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 8, background: `${obj.cor}22`, color: obj.cor }}>{obj.sub}</span>
                                    {!ativo && <span style={{ fontSize: 9, color: C.red }}>⚠ Requer edifícios</span>}
                                </div>
                                <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>{obj.desc}</p>
                            </div>
                            {ativo && <span style={{ fontSize: 18, color: C.muted }}>›</span>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ─── ETAPA 1a — Contratos de venda ───────────────────────────────────────────

function EtapaContratoVenda({ onProximo, onVoltar }) {
    // const { dados } = useContext(CentraldeDadosContext);
    const { contratosEdificios, getOuGerarContratos, stock, startSale } = useGame();
    const [edSel, setEdSel] = useState(null);
    const [contratoSel, setContratoSel] = useState(null);
    const [criarCadeia, setCriarCadeia] = useState(null);
    const [produtoAlvo, setProdutoAlvo] = useState(null); // "fixo" | "qualquer"
    const [modoAtendimento, setModoAtendimento] = useState(null); // "um" | "todos"
    const dia = useCentralStore((s) => s.dia);
    const edsVenda = useMemo(
        () => getEdsTipo(EDIFICIOS_FINAIS_ESTATICOS, edificiosFinais, "venda"),
        [edificiosFinais]
    ); const contratos = useMemo(() => {
        if (!edSel) return [];
        const conf = SALES_EDIFICIOS.find(e => e.nomeEdificio === edSel.nome);
        if (!conf) return [];
        return getOuGerarContratos(conf, dia, edSel.quantidade || 1, 1);
    }, [edSel, dia, contratosEdificios]);

    const temPreReq = useMemo(() => contratoSel && (stock[contratoSel.productId] || 0) >= contratoSel.quantidade, [contratoSel, stock]);

    return (
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "28px 24px" }}>
            <BotaoVoltar onClick={onVoltar} />
            <Titulo>Selecione o edifício e o contrato</Titulo>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(185px,1fr))", gap: 10, marginBottom: 24 }}>
                {edsVenda.map(ed => {
                    const sel = edSel?.nome === ed.nome;
                    const cor = SETOR_COR[ed.setor] || C.purple;
                    return (
                        <div key={ed.nome} onClick={() => { setEdSel(ed); setContratoSel(null); setCriarCadeia(null); }}
                            style={{ background: sel ? `${cor}22` : C.card, border: `1.5px solid ${sel ? cor : C.border}`, borderRadius: 12, padding: "12px 14px", cursor: "pointer" }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 3 }}>🏪 {ed.nome}</div>
                            <span style={{ fontSize: 9, color: cor, fontWeight: 700, textTransform: "uppercase" }}>{ed.setor}</span>
                            <span style={{ fontSize: 9, color: C.green, marginLeft: 8 }}>×{ed.quantidade}</span>
                        </div>
                    );
                })}
            </div>

            {edSel && contratos.length > 0 && (
                <>
                    <Subtitulo>📋 Contratos disponíveis — {edSel.nome}</Subtitulo>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 10, marginBottom: 20 }}>
                        {contratos.map(c => {
                            const prod = productsCatalog[c.productId];
                            const estAtual = stock[c.productId] || 0;
                            const temEst = estAtual >= c.quantidade;
                            const sel = contratoSel?.id === c.id;
                            return (
                                <div key={c.id} onClick={() => {
                                    setContratoSel(c); setCriarCadeia(null); setProdutoAlvo(null);       // ← novo
                                    setModoAtendimento(null);
                                }}
                                    style={{ background: sel ? "rgba(16,185,129,.14)" : C.card, border: `1.5px solid ${sel ? C.green : C.border}`, borderRadius: 12, padding: "12px 14px", cursor: "pointer" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                        <div>
                                            <div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{prod?.nome}</div>
                                            <div style={{ fontSize: 10, color: C.green }}>+{c.margemAplicada}% margem</div>
                                        </div>
                                        <span style={{ fontSize: 26 }}>{prod?.icon}</span>
                                    </div>
                                    <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.8 }}>
                                        <div>📦 Qtd: <b style={{ color: temEst ? C.green : C.red }}>{c.quantidade}</b> <span style={{ fontSize: 9 }}>(est: {estAtual})</span></div>
                                        <div>💰 Valor: <b style={{ color: C.amber }}>{fmt(c.valorTotal)}</b></div>
                                        <div>⏱️ Prazo: <b>{c.prazoDias}d</b></div>
                                    </div>
                                    <div style={{ marginTop: 6 }}>
                                        {temEst
                                            ? <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 8, background: "rgba(16,185,129,.2)", color: C.green }}>✓ Estoque suficiente</span>
                                            : <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 8, background: "rgba(239,68,68,.15)", color: C.red }}>✗ Faltam {c.quantidade - estAtual}</span>
                                        }
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {contratoSel && (
                <>
                    {temPreReq && (
                        <div style={{ background: "rgba(16,185,129,.08)", border: "1px solid rgba(16,185,129,.3)", borderRadius: 12, padding: "14px 16px", marginBottom: 16 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: C.green, marginBottom: 6 }}>✅ Você já tem o estoque necessário!</div>
                            <div style={{ fontSize: 11, color: C.muted, marginBottom: 10 }}>
                                Produto: <b style={{ color: C.text }}>{productsCatalog[contratoSel.productId]?.nome}</b>
                                {" · "}Qtd: <b style={{ color: C.text }}>{contratoSel.quantidade}</b>
                                {" · "}Valor: <b style={{ color: C.green }}>{fmt(contratoSel.valorTotal)}</b>
                            </div>
                            <button onClick={() => {
                                // Garante que o contrato tem todos os campos necessários para startSale
                                const contratoCompleto = {
                                    ...contratoSel,
                                    // formulaId é necessário pelo GameContext para processar a venda
                                    formulaId: contratoSel.formulaId || (() => {
                                        const conf = SALES_EDIFICIOS.find(e => e.nomeEdificio === edSel?.nome);
                                        return conf?.formulas?.find(f => f.produto === contratoSel.productId)?.id || "";
                                    })(),
                                };
                                startSale(contratoCompleto);
                                alert(`✅ Contrato assinado! Receberá ${fmt(contratoSel.valorTotal)} em ${contratoSel.prazoDias} dias.`);
                            }}
                                style={{ background: C.green, border: "none", borderRadius: 8, color: "#fff", padding: "8px 20px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                                ⚡ Atender imediatamente
                            </button>
                        </div>
                    )}
                    <div style={{ marginBottom: 20 }}>
                        <Subtitulo>Quer criar a cadeia produtiva para este contrato?</Subtitulo>
                        <div style={{ display: "flex", gap: 10 }}>
                            {[{ v: true, l: "🏭 Sim — montar cadeia", cor: C.green }, { v: false, l: "🌐 Não — comprar do mercado", cor: C.blue }].map(op => (
                                <div key={String(op.v)} onClick={() => setCriarCadeia(op.v)}
                                    style={{ flex: 1, background: criarCadeia === op.v ? `${op.cor}18` : C.card, border: `1.5px solid ${criarCadeia === op.v ? op.cor : C.border}`, borderRadius: 12, padding: "12px 16px", cursor: "pointer" }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{op.l}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {criarCadeia !== null && (
                        <>
                            {/* === NOVO: Configuração de automação === */}
                            <div style={{
                                background: "rgba(139,92,246,.08)",
                                border: "1px solid rgba(139,92,246,.25)",
                                borderRadius: 12,
                                padding: "14px 16px",
                                marginBottom: 16
                            }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: C.purple2, marginBottom: 10 }}>
                                    ⚙️ Modo de automação do pipeline
                                </div>

                                {/* Produto fixo vs qualquer produto */}
                                <div style={{ marginBottom: 12 }}>
                                    <div style={{ fontSize: 11, color: C.muted, marginBottom: 6 }}>
                                        Produto alvo da cadeia:
                                    </div>
                                    <div style={{ display: "flex", gap: 8 }}>
                                        {[
                                            { v: "fixo", l: `🎯 Apenas ${productsCatalog[contratoSel.productId]?.nome}` },
                                            { v: "qualquer", l: "🔄 Qualquer produto disponível" },
                                        ].map(op => (
                                            <div
                                                key={op.v}
                                                onClick={() => setProdutoAlvo(op.v)}
                                                style={{
                                                    flex: 1,
                                                    background: produtoAlvo === op.v ? "rgba(139,92,246,.15)" : C.card,
                                                    border: `1.5px solid ${produtoAlvo === op.v ? C.purple2 : C.border}`,
                                                    borderRadius: 10, padding: "10px 12px", cursor: "pointer",
                                                    fontSize: 11, fontWeight: 700, color: C.text,
                                                }}
                                            >
                                                {op.l}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Modo: um contrato vs todos possíveis */}
                                <div>
                                    <div style={{ fontSize: 11, color: C.muted, marginBottom: 6 }}>
                                        Quantidade de contratos a atender:
                                    </div>
                                    <div style={{ display: "flex", gap: 8 }}>
                                        {[
                                            { v: "um", l: "📋 Este contrato apenas" },
                                            { v: "todos", l: "⚡ Todos os contratos possíveis" },
                                        ].map(op => (
                                            <div
                                                key={op.v}
                                                onClick={() => setModoAtendimento(op.v)}
                                                style={{
                                                    flex: 1,
                                                    background: modoAtendimento === op.v ? "rgba(16,185,129,.12)" : C.card,
                                                    border: `1.5px solid ${modoAtendimento === op.v ? C.green : C.border}`,
                                                    borderRadius: 10, padding: "10px 12px", cursor: "pointer",
                                                    fontSize: 11, fontWeight: 700, color: C.text,
                                                }}
                                            >
                                                {op.l}
                                            </div>
                                        ))}
                                    </div>
                                    {modoAtendimento === "todos" && (
                                        <div style={{
                                            fontSize: 10, color: C.amber, marginTop: 8,
                                            background: "rgba(245,158,11,.1)", borderRadius: 8, padding: "6px 10px"
                                        }}>
                                            ⚠️ O pipeline irá repetir automaticamente para cada contrato disponível
                                            no edifício {edSel?.nome}, respeitando o estoque e a capacidade de produção.
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* === FIM novo bloco === */}

                            {produtoAlvo && modoAtendimento && (
                                <BotaoPrimario onClick={() => onProximo({
                                    objetivo: "contrato_venda",
                                    edificioVenda: edSel,
                                    contrato: contratoSel,
                                    criarCadeia,
                                    // novos campos que chegam ao gerarStepsDoConfig:
                                    produtoAlvo,          // "fixo" | "qualquer"
                                    modoAtendimento,      // "um" | "todos"
                                    produtoAlvoId: produtoAlvo === "fixo" ? contratoSel.productId : null,
                                })}>
                                    Continuar →
                                </BotaoPrimario>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
}

// ─── ETAPA 1c — Produção/Ociosos/Estoque ─────────────────────────────────────


// ─── ETAPA 1b — Arbitragem de mercado ───────────────────────────────────────

function EtapaArbitragem({ onProximo, onVoltar }) {
    const edificiosFinais = useCentralStore(s => s.edificiosFinais);
    const { economiaSetores } = useContext(DadosEconomyGlobalContext);

    const comEdificio = analise.filter(op => {
        const ed = getEdsTipo(dados, "producao").find(e => e.nome === op.edificioCompra);
        return ed && ed.quantidade > 0;
    });
    const semEdificio = analise.filter(op => {
        const ed = getEdsTipo(dados, "producao").find(e => e.nome === op.edificioCompra);
        return !ed || !ed.quantidade;
    });

    // const { dados } = useContext(CentraldeDadosContext);
    const [opSel, setOpSel] = useState(null);

    // Usa analisarArbitragem do executor — lógica corrigida:
    // busca produtos que podem ser VENDIDOS em setores aquecidos,
    // produzidos a partir de insumos de setores em recessão
    const analise = useMemo(() => {
        return analisarArbitragem(economiaSetores);
    }, [economiaSetores]);

    function getEcoSetor(setor) {
        return economiaSetores?.[setor]?.economiaSetor?.estadoAtual || "estável";
    }

    return (
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "28px 24px", paddingBottom: 40 }}>
            <BotaoVoltar onClick={onVoltar} />
            <Titulo>📈 Oportunidades de arbitragem</Titulo>
            <p style={{ fontSize: 12, color: C.muted, marginBottom: 20 }}>Setores em recessão têm insumos baratos. Setores aquecidos pagam mais pela produção final.</p>

            {analise.length === 0 ? (
                <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24 }}>
                    <p style={{ fontSize: 13, color: C.muted, marginBottom: 16, textAlign: "center" }}>Nenhuma oportunidade detectada agora — as economias estão estáveis.</p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        {SETORES.map(s => {
                            const eco = getEcoSetor(s);
                            const cor = getEconomiaCor(eco);
                            return (
                                <div key={s} style={{ textAlign: "center" }}>
                                    <div style={{ fontSize: 9, color: C.muted, textTransform: "uppercase", marginBottom: 3 }}>{s}</div>
                                    <span style={{
                                        fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 10,
                                        background: `${cor}22`, color: cor, border: `1px solid ${cor}44`
                                    }}>{eco}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (() => {
                // Separar oportunidades: tenho o edifício vs. não tenho
                const comEdificio = analise.filter(op => {
                    const ed = getEdsTipo(dados, "producao").find(e => e.nome === op.edificioCompra);
                    return ed && ed.quantidade > 0;
                });
                const semEdificio = analise.filter(op => {
                    const ed = getEdsTipo(dados, "producao").find(e => e.nome === op.edificioCompra);
                    return !ed || !ed.quantidade;
                });

                const renderCard = (op, disponivel) => {
                    const sel = opSel?.id === op.id;
                    const ef = FORMULAS_EDIFICIOS.find(e => e.nomeEdificio === op.edificioCompra);
                    const f = ef?.formulas?.find(fm => Object.keys(fm.output || {}).includes(op.prodId));
                    // Custo estimado por ciclo
                    const custoEstimado = f
                        ? Object.entries(f.input || {}).reduce((s, [pid, q]) => s + getMarketPrice(pid, economiaSetores) * q, 0)
                        : 0;
                    const qtdOutput = f ? (Object.values(f.output || {})[0] || 1) : 1;
                    const recEstimada = getMarketPrice(op.prodId, economiaSetores) * qtdOutput;

                    const lucroEst = recEstimada - custoEstimado;

                    return (
                        <div key={op.id}
                            onClick={() => disponivel && setOpSel(op)}
                            style={{
                                background: sel ? "rgba(245,158,11,.12)" : disponivel ? C.card : "rgba(255,255,255,.02)",
                                border: `1.5px solid ${sel ? C.amber : disponivel ? C.border : "rgba(255,255,255,.06)"}`,
                                borderRadius: 14, padding: "13px 18px",
                                cursor: disponivel ? "pointer" : "default",
                                opacity: disponivel ? 1 : 0.55,
                                display: "flex", alignItems: "flex-start", gap: 14,
                            }}
                        >
                            <span style={{ fontSize: 26, flexShrink: 0 }}>{op.prodIcon}</span>
                            <div style={{ flex: 1 }}>
                                {/* Linha 1: produto + margem */}
                                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 5, flexWrap: "wrap" }}>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{op.prodNome}</span>
                                    <span style={{ fontSize: 9, color: C.amber, fontWeight: 700, background: "rgba(245,158,11,.15)", padding: "2px 7px", borderRadius: 6 }}>
                                        ≈ +{fmt(op.estimativaGanho)}/un
                                    </span>
                                    {!disponivel && (
                                        <span style={{ fontSize: 9, color: C.red, background: "rgba(239,68,68,.15)", padding: "2px 7px", borderRadius: 6 }}>
                                            🏗️ Construir: {op.edificioCompra}
                                        </span>
                                    )}
                                </div>

                                {/* Linha 2: fluxo produção → venda */}
                                <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", fontSize: 11, marginBottom: 6 }}>
                                    <span style={{ color: C.muted }}>🏭 {op.edificioCompra}</span>
                                    <span style={{ color: "rgba(255,255,255,.2)" }}>em</span>
                                    <b style={{ color: SETOR_COR[op.setorCompra] || C.text }}>{op.setorCompra}</b>
                                    <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 8, background: "rgba(239,68,68,.2)", color: C.red }}>{op.ecoCompra}</span>
                                    <span style={{ color: C.muted }}>→</span>
                                    <span style={{ color: C.muted }}>🏪 {op.edificioVenda}</span>
                                    <b style={{ color: SETOR_COR[op.setorVenda] || C.text }}>{op.setorVenda}</b>
                                    <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 8, background: "rgba(16,185,129,.2)", color: C.green }}>{op.ecoVenda}</span>
                                </div>

                                {/* Linha 3: custo / receita / lucro estimados */}
                                {f && (
                                    <div style={{ display: "flex", gap: 12, fontSize: 10 }}>
                                        <span>💰 Custo: <b style={{ color: C.amber }}>{fmt(custoEstimado)}</b>/ciclo</span>
                                        <span>📈 Receita: <b style={{ color: C.green }}>{fmt(recEstimada)}</b>/ciclo</span>
                                        <span>✅ Lucro: <b style={{ color: lucroEst > 0 ? C.green : C.red }}>{fmt(lucroEst)}</b>/ciclo</span>
                                        {f.duracao && <span>⏱️ <b>{f.duracao}d</b>/ciclo</span>}
                                    </div>
                                )}
                            </div>
                            {sel && disponivel && <span style={{ color: C.amber, fontSize: 18, flexShrink: 0 }}>✓</span>}
                        </div>
                    );
                };

                return (
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
                        {/* Oportunidades com edifícios disponíveis */}
                        {comEdificio.length > 0 && (
                            <>
                                <div style={{ fontSize: 9, fontWeight: 700, color: C.green, textTransform: "uppercase", letterSpacing: ".1em", margin: "4px 0" }}>
                                    ✅ Edifícios que você tem
                                </div>
                                {comEdificio.map(op => renderCard(op, true))}
                            </>
                        )}

                        {/* Oportunidades sem edifício — só mostra info, não permite selecionar */}
                        {semEdificio.length > 0 && (
                            <>
                                <div style={{ fontSize: 9, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: ".1em", margin: "8px 0 4px" }}>
                                    🏗️ Requer construção de edifício
                                </div>
                                {semEdificio.slice(0, 4).map(op => renderCard(op, false))}
                            </>
                        )}
                    </div>
                );
            })()}

            {opSel && (
                <BotaoPrimario onClick={() => onProximo({ objetivo: "arbitragem", oportunidade: opSel })}>
                    Montar cadeia para esta oportunidade →
                </BotaoPrimario>
            )}
        </div>
    );
}

function EtapaProducaoVenda({ objetivo, onProximo, onVoltar }) {
    const edificiosFinais = useCentralStore(s => s.edificiosFinais);
    const { stock } = useGame();
    const { economiaSetores } = useContext(DadosEconomyGlobalContext);
    const edsProducao = useMemo(
        () => getEdsTipo(EDIFICIOS_FINAIS_ESTATICOS, edificiosFinais, "producao"),
        [edificiosFinais]
    );
    const produtosEstoque = useMemo(() => Object.entries(stock).filter(([, q]) => q > 5).map(([id, q]) => ({ id, q, ...productsCatalog[id] })).filter(p => p.nome).sort((a, b) => b.q - a.q), [stock]);
    const [edSel, setEdSel] = useState(null);
    const [formulaSel, setFormulaSel] = useState(null);
    const [prodSel, setProdSel] = useState(null);
    const formulasEd = useMemo(() => { if (!edSel) return []; return FORMULAS_EDIFICIOS.find(e => e.nomeEdificio === edSel.nome)?.formulas || []; }, [edSel]);

    return (
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "28px 24px" }}>
            <BotaoVoltar onClick={onVoltar} />
            <Titulo>{objetivo === "escoar_estoque" ? "📦 Produtos para escoar" : "🏭 Selecione edifício e fórmula"}</Titulo>

            {objetivo === "escoar_estoque" ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(155px,1fr))", gap: 10, marginBottom: 20 }}>
                    {produtosEstoque.map(p => (
                        <div key={p.id} onClick={() => setProdSel(p)} style={{ background: prodSel?.id === p.id ? "rgba(59,130,246,.14)" : C.card, border: `1.5px solid ${prodSel?.id === p.id ? C.blue : C.border}`, borderRadius: 12, padding: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ fontSize: 24 }}>{p.icon}</span>
                            <div><div style={{ fontSize: 11, fontWeight: 700, color: C.text }}>{p.nome}</div><div style={{ fontSize: 12, fontWeight: 700, color: C.amber }}>{p.q} un.</div></div>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 10, marginBottom: 20 }}>
                        {edsProducao.map(ed => {
                            const conf = FORMULAS_EDIFICIOS.find(e => e.nomeEdificio === ed.nome);
                            const sel = edSel?.nome === ed.nome;
                            const cor = SETOR_COR[ed.setor] || C.purple;
                            return (
                                <div key={ed.nome} onClick={() => { setEdSel(ed); setFormulaSel(null); }}
                                    style={{ background: sel ? `${cor}20` : C.card, border: `1.5px solid ${sel ? cor : C.border}`, borderRadius: 12, padding: "12px 14px", cursor: "pointer" }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: C.text, marginBottom: 4 }}>🏭 {ed.nome}</div>
                                    <div style={{ display: "flex", gap: 6 }}>
                                        <span style={{ fontSize: 9, color: C.green }}>×{ed.quantidade}</span>
                                        <span style={{ fontSize: 9, color: cor, textTransform: "uppercase" }}>{ed.setor}</span>
                                        {conf?.formulas?.[0]?.capacidadePorEdificio && <span style={{ fontSize: 9, color: C.amber }}>cap:{conf.formulas[0].capacidadePorEdificio * ed.quantidade}</span>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {edSel && formulasEd.map(f => {
                        const sel = formulaSel?.id === f.id;
                        const ins = Object.entries(f.input || {});
                        const outs = Object.entries(f.output || {});
                        const custo = ins.reduce((s, [pid, q]) => s + getMarketPrice(pid, economiaSetores) * q, 0);
                        const recv = outs.reduce((s, [pid, q]) => s + getMarketPrice(pid, economiaSetores) * q, 0);
                        return (
                            <div key={f.id} onClick={() => setFormulaSel(f)}
                                style={{ background: sel ? "rgba(124,58,237,.16)" : C.card, border: `1.5px solid ${sel ? C.purple : C.border}`, borderRadius: 12, padding: "12px 16px", marginBottom: 10, cursor: "pointer" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>🧪 {f.nome}</span>
                                    <span style={{ fontSize: 10, color: C.amber }}>cap: {f.capacidadePorEdificio * (edSel.quantidade || 1)}/ciclo</span>
                                </div>
                                <div style={{ fontSize: 9, color: C.muted, marginBottom: 4 }}>📥 Consome:</div>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginBottom: 8 }}>
                                    {ins.map(([pid, q]) => <ProdChip key={pid} pid={pid} qtd={q} tipo="input" />)}
                                </div>
                                <div style={{ fontSize: 9, color: C.muted, marginBottom: 4 }}>📤 Produz:</div>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginBottom: 8 }}>
                                    {outs.map(([pid, q]) => <ProdChip key={pid} pid={pid} qtd={q} tipo="output" />)}
                                </div>
                                <div style={{ display: "flex", gap: 14, fontSize: 10 }}>
                                    <span>💰 Custo: <b style={{ color: C.red }}>{fmt(custo)}</b></span>
                                    <span>📈 Receita: <b style={{ color: C.green }}>{fmt(recv)}</b></span>
                                    <span>⏱️ <b>{f.duracao}d</b></span>
                                </div>
                            </div>
                        );
                    })}
                </>
            )}

            {(prodSel || (edSel && formulaSel)) && (
                <BotaoPrimario onClick={() => onProximo({ objetivo, edificioProducao: edSel, formula: formulaSel, produtoEstoque: prodSel })}>
                    Continuar →
                </BotaoPrimario>
            )}
        </div>
    );
}

// ─── Revisão ─────────────────────────────────────────────────────────────────

function EtapaRevisao({ pipelineId, onAtivo, onVoltar }) {
    const { pipelines, togglePipeline, atualizarPipeline } = usePipeline();
    const { stock } = useGame();
    // const { dados } = useContext(CentraldeDadosContext);
    const edificiosFinais = useCentralStore(s => s.edificiosFinais);
    const pipeline = pipelines.find(p => p.id === pipelineId);
    const [nome, setNome] = useState(pipeline?.nome || "Novo Pipeline");
    const { economiaSetores } = useContext(DadosEconomyGlobalContext);
    if (!pipeline) return null;
    const calc = calcularCadeia(pipeline.steps || [], stock, economiaSetores);
    const viavel = calc.lucro > 0;

    // Mínimo de insumos para iniciar (cálculo direto — sem hooks aninhados)
    const minimoInsumos = calcularMinimoParaIniciar(pipeline.steps || []);
    const podeIniciar = Object.entries(minimoInsumos).every(([pid, qtd]) => (stock[pid] || 0) >= qtd);

    return (
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "28px 24px", paddingBottom: 40 }}>
            <BotaoVoltar onClick={onVoltar} />
            <Titulo>📋 Revisar e ativar</Titulo>
            <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 5 }}>Nome da cadeia</label>
                <input value={nome} onChange={e => { setNome(e.target.value); atualizarPipeline(pipelineId, { nome: e.target.value }); }} style={{ ...inputStyle, fontSize: 15, fontWeight: 700, padding: "8px 12px" }} />
            </div>

            <PainelCalculadora steps={pipeline.steps || []} stock={stock} />

            {/* Mínimo para iniciar */}
            {Object.keys(minimoInsumos).length > 0 && (
                <div style={{ background: podeIniciar ? "rgba(16,185,129,.07)" : "rgba(239,68,68,.07)", border: `1px solid ${podeIniciar ? "rgba(16,185,129,.3)" : "rgba(239,68,68,.3)"}`, borderRadius: 12, padding: "12px 16px", marginTop: 16, marginBottom: 16 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: podeIniciar ? C.green : C.red, marginBottom: 8 }}>
                        {podeIniciar ? "✅ Insumos suficientes para 1 ciclo" : "⚠️ Insumos insuficientes para o primeiro ciclo"}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                        {Object.entries(minimoInsumos).map(([pid, qtd]) => {
                            const est = stock[pid] || 0;
                            const ok = est >= qtd;
                            const prod = productsCatalog[pid];
                            return (
                                <div key={pid} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,.04)", borderRadius: 7, padding: "5px 8px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                        <span style={{ fontSize: 14 }}>{prod?.icon || "📦"}</span>
                                        <span style={{ fontSize: 11, color: C.muted }}>{prod?.nome || pid}</span>
                                    </div>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: ok ? C.green : C.red }}>
                                        {est}/{qtd}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                    {!podeIniciar && (
                        <div style={{ fontSize: 10, color: C.muted, marginTop: 8 }}>
                            💡 A automação comprará os insumos faltantes se configurada para usar o mercado global.
                        </div>
                    )}
                </div>
            )}

            <div style={{ marginTop: 16 }}>
                <BotaoPrimario onClick={() => { togglePipeline(pipelineId); onAtivo(); }} cor={pipeline.ativo ? C.amber : C.green}>
                    {pipeline.ativo ? "⏸ Pausar automação" : "▶ Ativar automação"}
                </BotaoPrimario>
            </div>
        </div>
    );
}

// ─── Gerador de steps a partir da configuração do wizard ─────────────────────

function gerarStepsDoConfig(cfg, economiaSetores = {}) {

    const steps = [];
    if (cfg.objetivo === "contrato_venda") {
        if (cfg.objetivo === "contrato_venda") {
            const pid = cfg.produtoAlvoId || cfg.contrato?.productId;

            const formulasDoEdificio = SALES_EDIFICIOS
                .find(e => e.nomeEdificio === cfg.edificioVenda?.nome)?.formulas || [];

            const formulasAlvo = cfg.produtoAlvo === "fixo"
                ? formulasDoEdificio.filter(f => f.produto === pid)
                : formulasDoEdificio;

            formulasAlvo.forEach(sf => {
                const prodId = sf.produto;
                const qtdContrato = cfg.contrato?.quantidade || 1;

                // Threshold de compra: quantos ciclos manter em estoque
                // "todos" → mantém 2 contratos-vale; "um" → apenas 1 contrato
                const thresholdCompra = cfg.modoAtendimento === "todos"
                    ? qtdContrato * 2
                    : qtdContrato;

                if (cfg.criarCadeia) {
                    // Procura edifício de produção que gera o produto
                    FORMULAS_EDIFICIOS.forEach(ef => {
                        const fMatch = ef.formulas?.find(f =>
                            Object.keys(f.output || {}).includes(prodId)
                        );
                        if (!fMatch) return;

                        // Insumos da fórmula precisam de steps de compra
                        Object.entries(fMatch.input || {}).forEach(([insumoId, qtdInsumo]) => {
                            const thresholdInsumo = cfg.modoAtendimento === "todos"
                                ? qtdInsumo * 3   // 3 ciclos de buffer
                                : qtdInsumo * 2;  // 2 ciclos de buffer

                            steps.push(stepParaContexto("mercado_compra", "Mercado Global", {
                                produtoId: insumoId,
                                quantidade: thresholdInsumo,
                                condicaoThreshold: thresholdInsumo,
                                precoTeto: (marketPrices[insumoId] || 0) * 3 || 99999,
                            }));
                        });

                        steps.push(stepParaContexto("producao", ef.nomeEdificio, {
                            formulaId: fMatch.id,
                            quantidade: fMatch.capacidadePorEdificio || 1,
                            // Produz até ter estoque suficiente para N contratos
                            condicaoThreshold: cfg.modoAtendimento === "todos"
                                ? qtdContrato * 3
                                : qtdContrato,
                            prioridadeInsumo: "comprar_se_faltar",
                        }));
                    });
                } else {
                    // Sem cadeia de produção → compra direto do mercado
                    steps.push(stepParaContexto("mercado_compra", "Mercado Global", {
                        produtoId: prodId,
                        quantidade: qtdContrato,          // compra exatamente 1 contrato de cada vez
                        condicaoThreshold: qtdContrato,   // só compra se tiver menos que 1 contrato em estoque
                        precoTeto: (marketPrices[prodId] || 0) * 2 || 99999,
                    }));
                }

                // Step de venda com todos os flags necessários
                steps.push(stepParaContexto("venda", cfg.edificioVenda?.nome, {
                    formulaId: sf.id,
                    produtoId: prodId,
                    quantidade: cfg.modoAtendimento === "todos" ? 9999 : qtdContrato,
                    condicaoThreshold: 0,
                    // USA filtrarProduto em vez de estrategiaVenda="produto_fixo"
                    // porque produto_fixo depende de getSalesFormulaConfig que pode falhar
                    estrategiaVenda: cfg.produtoAlvo === "fixo" ? "maior_margem" : "maior_margem",
                    atenderTodosContratos: cfg.modoAtendimento === "todos",
                    filtrarProduto: cfg.produtoAlvo === "fixo" ? prodId : null,
                }));
            });
        }
    }
    if (cfg.objetivo === "venda_producao" || cfg.objetivo === "ociosos") {
        if (cfg.formula && cfg.edificioProducao) {
            steps.push(stepParaContexto("producao", cfg.edificioProducao.nome, { formulaId: cfg.formula.id, quantidade: 1, condicaoThreshold: 50, prioridadeInsumo: "so_armazem" }));
            const outPrincipal = Object.keys(cfg.formula.output || {})[0];
            if (outPrincipal) steps.push(stepParaContexto("mercado_venda", "Mercado Global", { produtoId: outPrincipal, quantidade: Object.values(cfg.formula.output)[0] || 1, condicaoThreshold: 0 }));
        }
    }

    if (cfg.objetivo === "arbitragem" && cfg.oportunidade) {
        const op = cfg.oportunidade;
        const ef = FORMULAS_EDIFICIOS.find(e => e.nomeEdificio === op.edificioCompra);
        // Encontra a fórmula que produz especificamente o produto da oportunidade
        const f = ef?.formulas?.find(fm => Object.keys(fm.output || {}).includes(op.prodId)) || ef?.formulas?.[0];

        if (f) {
            // Para cada insumo necessário, cria um step de compra no mercado
            // se o jogador configurou prioridadeInsumo como mercado
            Object.entries(f.input || {}).forEach(([pid, qtd]) => {
                steps.push(stepParaContexto("mercado_compra", "Mercado Global", {
                    produtoId: pid,
                    quantidade: qtd * 5, // 5 ciclos de estoque inicial
                    condicaoThreshold: qtd * 2, // repõe quando cair abaixo de 2 ciclos
                    precoTeto: getMarketPrice(pid, economiaSetores) * 2, // teto 2x o preço atual
                }));
            });

            // Step de produção — usa a fórmula que gera o produto da oportunidade
            steps.push(stepParaContexto("producao", op.edificioCompra, {
                formulaId: f.id,
                quantidade: f.capacidadePorEdificio || 1,
                condicaoThreshold: Object.values(f.output || {})[0] * 3 || 10, // produz até ter 3 ciclos
                prioridadeInsumo: "comprar_se_faltar", // compra automaticamente se faltar
            }));
        } else {
            // Sem edifício de venda → escoar no mercado global
            const qtdOutput = f ? Object.values(f.output || {})[0] || 1 : 1;
            steps.push(stepParaContexto("mercado_venda", "Mercado Global", {
                produtoId: op.prodId,
                quantidade: qtdOutput * 5,
                condicaoThreshold: qtdOutput,
            }));
        }

        // Verifica se tem edifício de venda compatível com o produto
        const edVenda = SALES_EDIFICIOS.find(e =>
            e.setor === op.setorVenda && e.formulas?.some(fv => fv.produto === op.prodId)
        );
        const fVenda = edVenda?.formulas?.find(fv => fv.produto === op.prodId);

        if (edVenda && fVenda) {
            // Tem edifício de venda no setor aquecido → usa contrato
            steps.push(stepParaContexto("venda", edVenda.nomeEdificio, {
                formulaId: fVenda.id,
                produtoId: op.prodId,
                quantidade: f?.capacidadePorEdificio || 1,
                condicaoThreshold: 0,
            }));
        } else {
            // Insumos da fórmula precisam de steps de compra
            Object.entries(fMatch.input || {}).forEach(([insumoId, qtdInsumo]) => {
                // Buffer: para "todos" mantém 2 ciclos, para "um" mantém 1 ciclo exato
                const ciclosBuffer = cfg.modoAtendimento === "todos" ? 2 : 1;
                const qtdBuffer = qtdInsumo * ciclosBuffer;

                steps.push(stepParaContexto("mercado_compra", "Mercado Global", {
                    produtoId: insumoId,
                    quantidade: qtdBuffer,        // compra no máximo 1 ciclo de buffer por vez
                    condicaoThreshold: qtdBuffer, // repõe quando cair abaixo do buffer
                    precoTeto: (marketPrices[insumoId] || 0) * 3 || 99999,
                }));
            });
        }
    }

    if (cfg.objetivo === "escoar_estoque" && cfg.produtoEstoque) {
        steps.push(stepParaContexto("mercado_venda", "Mercado Global", { produtoId: cfg.produtoEstoque.id, quantidade: Math.min(cfg.produtoEstoque.q, 50), condicaoThreshold: 5 }));
    }

    console.log("[Pipeline] gerarStepsDoConfig →", cfg.objetivo, "steps:", steps.length, steps);
    return steps;

}

// ─── Calcula insumos mínimos para iniciar a cadeia ───────────────────────────
// Dado um array de steps, retorna os insumos necessários para pelo menos 1 ciclo

function calcularMinimoParaIniciar(steps) {
    const necessarios = {}; // produtoId -> qtd mínima
    steps.forEach(step => {
        if (step.tipo !== "producao" || !step.formulaId) return;
        const cfg = getFormulaById(step.formulaId);
        if (!cfg) return;
        Object.entries(cfg.formula.input || {}).forEach(([pid, qtd]) => {
            necessarios[pid] = (necessarios[pid] || 0) + qtd;
        });
    });
    return necessarios;
}

// ─── Gera cadeia recomendada completa baseada nos edifícios do jogador ────────

function gerarCadeiaRecomendada(edsProducao, edsVenda) {
    if (edsProducao.length === 0 || edsVenda.length === 0) return null;
    // Encontra pares produção → venda com maior sinergia
    let melhorCadeia = null;
    let melhorScore = 0;

    edsVenda.forEach(edV => {
        const salesEd = SALES_EDIFICIOS.find(e => e.nomeEdificio === edV.nome);
        if (!salesEd) return;

        salesEd.formulas?.forEach(sf => {
            // Procura qual edifício de produção gera o produto desse contrato
            FORMULAS_EDIFICIOS.forEach(ef => {
                const fMatch = ef.formulas?.find(f => Object.keys(f.output || {}).includes(sf.produto));
                if (!fMatch) return;

                const edP = edsProducao.find(e => e.nome === ef.nomeEdificio);
                if (!edP) return; // Jogador não tem esse edifício

                const score = (edP.quantidade || 0) * (marketPrices[sf.produto] || 0);
                if (score > melhorScore) {
                    melhorScore = score;
                    melhorCadeia = {
                        nome: `${sf.nome || sf.produto} via ${edV.nome}`,
                        edProducao: edP, formula: fMatch,
                        edVenda: edV, formulaVenda: sf,
                    };
                }
            });
        });
    });

    return melhorCadeia;
}

// ─── COMPONENTE RAIZ ──────────────────────────────────────────────────────────


export default function CadeiaProdutiva() {
    const { criarPipelineComSteps, pipelines, removerPipeline, togglePipeline, produtosSemVazao } = usePipeline();
    const { stock } = useGame();
    // const { dados } = useContext(CentraldeDadosContext);
    const edificiosFinais = useCentralStore(s => s.edificiosFinais);
    const { economiaSetores } = useContext(DadosEconomyGlobalContext);
    const [etapa, setEtapa] = useState("lista");
    const [objetivo, setObjetivo] = useState(null);
    const [pipelineId, setPipelineId] = useState(null);
    const [modalRemover, setModalRemover] = useState(false);
    const [pipelineParaRemover, setPipelineParaRemover] = useState(null);
    function iniciarNovo() { setEtapa("objetivo"); setObjetivo(null); setPipelineId(null); }
    const edsP = useMemo(() => getEdsTipo(EDIFICIOS_FINAIS_ESTATICOS, edificiosFinais, "producao"), [edificiosFinais]);
    const edsV = useMemo(() => getEdsTipo(EDIFICIOS_FINAIS_ESTATICOS, edificiosFinais, "venda"), [edificiosFinais]);



    function onConfigurarProximo(cfg) {
        const steps = gerarStepsDoConfig(cfg, economiaSetores)
        const nome = cfg.objetivo === "contrato_venda"
            ? `${productsCatalog[cfg.contrato?.productId]?.nome || "Contrato"} via ${cfg.edificioVenda?.nome}`
            : `Pipeline ${new Date().toLocaleDateString("pt-BR")}`;
        const id = criarPipelineComSteps(steps, nome);
        console.log("[Pipeline] criado:", id, "steps:", steps.length);
        setPipelineId(id);
        setEtapa("editor");
    }

    const wrap = (ch) => (
        <div
            className="rounded-[10px]"
            style={{
                width: "100%",
                height: "100%",
                background: C.bg,
                color: C.text,
                fontFamily: "'Rajdhani','Segoe UI',sans-serif",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                position: "relative"
            }}
        >
            {ch}

            {/* ✅ MODAL AQUI */}
            <AnimatePresence>
                {modalRemover && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => {
                            setModalRemover(false);
                            setPipelineParaRemover(null);
                        }}
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0,0,0,.65)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 9999,
                            backdropFilter: "blur(4px)"
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                background: C.bg2,
                                border: `1px solid ${C.border}`,
                                borderRadius: 16,
                                padding: "22px 26px",
                                width: 340,
                                textAlign: "center",
                                boxShadow: "0 20px 60px rgba(0,0,0,.5)"
                            }}
                        >
                            {/* Ícone */}
                            <div style={{ fontSize: 32, marginBottom: 8 }}>🗑️</div>

                            {/* Título */}
                            <div style={{
                                fontSize: 17,
                                fontWeight: 700,
                                color: C.text,
                                marginBottom: 6
                            }}>
                                Remover cadeia
                            </div>

                            {/* Linha */}
                            <div style={{
                                width: 70,
                                height: 2,
                                background: "rgba(239,68,68,.6)",
                                margin: "0 auto 14px auto"
                            }} />

                            {/* Texto */}
                            <div style={{
                                fontSize: 12,
                                color: C.muted,
                                marginBottom: 18,
                                lineHeight: 1.4
                            }}>
                                Tem certeza que deseja remover{" "}
                                <span style={{ color: C.text, fontWeight: 700 }}>
                                    {pipelineParaRemover?.nome || "esta cadeia"}
                                </span>?
                            </div>

                            {/* Botões */}
                            <div style={{ display: "flex", gap: 10 }}>
                                <button
                                    onClick={() => {
                                        setModalRemover(false);
                                        setPipelineParaRemover(null);
                                    }}
                                    style={{
                                        flex: 1,
                                        background: "rgba(255,255,255,.06)",
                                        border: "1px solid rgba(255,255,255,.08)",
                                        borderRadius: 10,
                                        color: C.muted,
                                        padding: "9px 0",
                                        fontSize: 11,
                                        fontWeight: 700,
                                        cursor: "pointer",
                                        transition: ".2s"
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.12)"}
                                    onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.06)"}
                                >
                                    Cancelar
                                </button>

                                <button
                                    onClick={() => {
                                        if (pipelineParaRemover) {
                                            removerPipeline(pipelineParaRemover.id);
                                        }
                                        setModalRemover(false);
                                        setPipelineParaRemover(null);
                                    }}
                                    style={{
                                        flex: 1,
                                        background: "rgba(239,68,68,.18)",
                                        border: "1px solid rgba(239,68,68,.35)",
                                        borderRadius: 10,
                                        color: C.red,
                                        padding: "9px 0",
                                        fontSize: 11,
                                        fontWeight: 700,
                                        cursor: "pointer",
                                        transition: ".2s"
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,.3)"}
                                    onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,.18)"}
                                >
                                    Remover
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    if (etapa === "lista") return wrap(

        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
            <div className="scrollbar-custom w-full " style={{ position: "absolute", inset: 0, overflowY: "auto", padding: "28px 24px", margin: "0 auto", width: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                    <div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: C.purple2, textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 4 }}>Automação</div>
                        <h2 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: 0 }}>🔗 Cadeias Produtivas</h2>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => {
                            const rec = gerarCadeiaRecomendada(edsP, edsV);
                            if (!rec) { alert("Construa edifícios de produção e venda para receber recomendações."); return; }
                            const steps = gerarStepsDoConfig({ objetivo: "contrato_venda", edificioVenda: rec.edVenda, contrato: { productId: rec.formulaVenda.produto, quantidade: rec.formula.capacidadePorEdificio || 1, valorTotal: (marketPrices[rec.formulaVenda.produto] || 0) * (rec.formula.capacidadePorEdificio || 1), prazoDias: 30, margemAplicada: rec.formulaVenda.margemBase || 0 }, criarCadeia: true }, economiaSetores);
                            const id = criarPipelineComSteps(steps, rec.nome);
                            setPipelineId(id);
                            setEtapa("editor");
                        }} style={{ background: "rgba(245,158,11,.2)", border: "1px solid rgba(245,158,11,.4)", borderRadius: 10, color: C.amber, padding: "10px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                            ✨ Recomendar cadeia
                        </button>
                        <BotaoPrimario onClick={iniciarNovo}>➕ Nova cadeia</BotaoPrimario>
                    </div>
                </div>
                {(() => {
                    const storageAgregado = calcularStorageAgregadoCadeias(
                        pipelines.filter(p => p.ativo),
                        EDIFICIOS_FINAIS_ESTATICOS,
                        productsCatalog,
                        FORMULAS_EDIFICIOS
                    );

                    const storageGlobal = useMemo(() => {
                        const resultado = {};
                        SETORES.forEach(setor => {
                            const estaticos = EDIFICIOS_FINAIS_ESTATICOS[setor]?.edificios || [];
                            const dinamicos = edificiosFinais[setor]?.edificios || [];
                            dinamicos.forEach((edDin, index) => {
                                if ((edDin.quantidade ?? 0) < 1) return;
                                const edEst = estaticos[index];
                                if (!edEst) return;
                                if (!resultado[setor]) resultado[setor] = { edificios: [] };
                                resultado[setor].edificios.push({ ...edEst, quantidade: edDin.quantidade });
                            });
                        });
                        return calcularStorageGlobal(resultado);
                    }, [edificiosFinais]);

                    // ✅ AQUI
                    const agregado = storageAgregado.agregado || {};

                    const todasCats = new Set([
                        ...Object.keys(storageGlobal || {}),
                        ...Object.keys(agregado || {}),
                    ]);

                    const catsComDados = [...todasCats].map(cat => {
                        const capDisp = storageGlobal?.[cat]?.total || 0;
                        const slotsUsados = agregado?.[cat]?.slotsTotal || 0;

                        const pct = capDisp > 0
                            ? Math.min(100, (slotsUsados / capDisp) * 100)
                            : (slotsUsados > 0 ? 100 : 0);

                        const ok = capDisp >= slotsUsados;
                        const cor = ok ? (pct > 70 ? C.amber : C.green) : C.red;

                        return { cat, capDisp, slotsUsados, pct, ok, cor };
                    });
                    if (catsComDados.length === 0) return null;

                    const temProblema = catsComDados.some(c => !c.ok);
                    const cadeiaAtivas = pipelines.filter(p => p.ativo).length;

                    return (
                        <div style={{ marginBottom: 20, background: C.bg3, border: `1px solid ${temProblema ? "rgba(239,68,68,.3)" : C.border}`, borderRadius: 14, padding: "14px 16px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                                <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: ".08em" }}>
                                    📦 Armazenamento global — {cadeiaAtivas} cadeia(s) ativa(s)
                                </div>
                                {temProblema && (
                                    <span style={{ fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: 6, background: "rgba(239,68,68,.2)", color: C.red }}>
                                        ⚠️ Capacidade insuficiente
                                    </span>
                                )}
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 7 }}>
                                {catsComDados.map(({ cat, capDisp, slotsUsados, pct, ok, cor }) => (
                                    <div key={cat} style={{ background: "rgba(255,255,255,.03)", borderRadius: 9, padding: "8px 10px", border: `1px solid ${ok ? "rgba(255,255,255,.06)" : "rgba(239,68,68,.2)"}` }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                                            <span style={{ fontSize: 11, color: C.text }}>
                                                {ICONS_CAT_ARMAZENAMENTO[cat] || "📦"} {cat}
                                            </span>
                                            <span style={{ fontSize: 9, fontWeight: 700, color: cor }}>
                                                {pct.toFixed(0)}%
                                            </span>
                                        </div>
                                        {/* Barra: preenchimento = uso das cadeias ativas / capacidade total */}
                                        <div style={{ height: 5, background: "rgba(255,255,255,.08)", borderRadius: 99, overflow: "hidden", marginBottom: 5 }}>
                                            <div style={{ height: "100%", width: `${Math.min(100, pct)}%`, background: cor, borderRadius: 99, transition: "width .4s" }} />
                                        </div>
                                        <div style={{ fontSize: 8, color: C.muted }}>
                                            <span style={{ color: slotsUsados > 0 ? cor : C.muted }}>{slotsUsados.toLocaleString()} usados</span>
                                            {" / "}
                                            <span>{capDisp.toLocaleString()} disp.</span>
                                        </div>
                                        {!ok && (
                                            <div style={{ fontSize: 8, color: C.red, fontWeight: 700, marginTop: 3 }}>
                                                ⚠️ Faltam {(slotsUsados - capDisp).toLocaleString()} slots
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })()}
                {/* Alerta de produtos sem vazão */}
                {produtosSemVazao && produtosSemVazao.length > 0 && (
                    <div style={{ background: "rgba(245,158,11,.08)", border: "1px solid rgba(245,158,11,.3)", borderRadius: 12, padding: "12px 16px", marginBottom: 20 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: C.amber, marginBottom: 8 }}>
                            📦 {produtosSemVazao.length} produto(s) no estoque sem destino configurado
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {produtosSemVazao.slice(0, 8).map(p => (
                                <div key={p.pid} style={{ background: "rgba(255,255,255,.06)", borderRadius: 8, padding: "5px 10px", display: "flex", alignItems: "center", gap: 6 }}>
                                    <span style={{ fontSize: 16 }}>{p.icon}</span>
                                    <div>
                                        <div style={{ fontSize: 11, fontWeight: 700, color: C.text }}>{p.nome}</div>
                                        <div style={{ fontSize: 9, color: C.amber }}>{p.qtd} un. · {fmt(p.valorMercado)}</div>
                                    </div>
                                    {p.destinosPossiveis.length > 0 && (
                                        <div style={{ fontSize: 9, color: C.muted, marginLeft: 4 }}>
                                            vender em: {p.destinosPossiveis.slice(0, 2).join(", ")}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        {produtosSemVazao.length > 8 && (
                            <div style={{ fontSize: 10, color: C.muted, marginTop: 6 }}>+{produtosSemVazao.length - 8} outros</div>
                        )}
                    </div>
                )}

                {pipelines.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "48px 0", color: C.muted }}>
                        <div style={{ fontSize: 48, marginBottom: 12 }}>🔗</div>
                        <div style={{ fontSize: 14, marginBottom: 6 }}>Nenhuma cadeia criada.</div>
                        <div style={{ fontSize: 12 }}>Clique em "Nova cadeia" para automatizar sua produção.</div>
                    </div>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>

                        {pipelines.map(p => {
                            const calc = calcularCadeia(p.steps || [], stock, economiaSetores, edificiosFinais);
                            const viavel = calc.lucro > 0;
                            const steps = p.steps || [];
                            const primeiro = steps[0];
                            const ultimo = steps[steps.length - 1];
                            const labelPrimeiro = labelStep(primeiro);
                            const labelUltimo = labelStep(ultimo);
                            const todosIcones = [...new Set(steps.flatMap(s => iconesProdutosStep(s)))].slice(0, 5);

                            // Edifícios únicos envolvidos
                            const edificiosNaCadeia = [...new Set(
                                steps.filter(s => s.buildingName && s.buildingName !== "Mercado Global").map(s => s.buildingName)
                            )];

                            return (
                                <div key={p.id} style={{ background: C.card, border: `1.5px solid ${p.ativo ? C.green + "55" : C.border}`, borderRadius: 14, padding: "14px 16px" }}>
                                    {/* Header: nome + status */}
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.ativo ? C.green : C.muted, flexShrink: 0 }} />
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontSize: 12, fontWeight: 700, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                {p.nome || "Pipeline"}
                                            </div>
                                            {/* Fluxo: primeiro → último */}
                                            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                                                <span style={{ fontSize: 12 }}>{labelPrimeiro.icon}</span>
                                                <span style={{ fontSize: 9, color: C.muted, maxWidth: 90, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{labelPrimeiro.nome}</span>
                                                {ultimo && primeiro?.id !== ultimo?.id && (
                                                    <>
                                                        <span style={{ fontSize: 9, color: "rgba(255,255,255,.2)" }}>→</span>
                                                        <span style={{ fontSize: 12 }}>{labelUltimo.icon}</span>
                                                        <span style={{ fontSize: 9, color: C.muted, maxWidth: 90, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{labelUltimo.nome}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <span style={{ fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 8, background: p.ativo ? "rgba(16,185,129,.2)" : "rgba(255,255,255,.07)", color: p.ativo ? C.green : C.muted, flexShrink: 0 }}>
                                            {p.ativo ? "● Ativa" : "○ Pausada"}
                                        </span>
                                    </div>

                                    {/* Ícones dos produtos */}
                                    {todosIcones.length > 0 && (
                                        <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
                                            {todosIcones.map((ic, i) => <span key={i} style={{ fontSize: 18 }}>{ic}</span>)}
                                        </div>
                                    )}

                                    {/* Métricas financeiras */}
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4, marginBottom: 8 }}>
                                        <div style={{ background: "rgba(255,255,255,.04)", borderRadius: 6, padding: "5px 7px" }}>
                                            <div style={{ fontSize: 7, color: C.muted, marginBottom: 1 }}>📈 Receita</div>
                                            <div style={{ fontSize: 11, fontWeight: 700, color: C.text }}>{fmt(calc.receitaTotal)}</div>
                                        </div>
                                        <div style={{ background: "rgba(255,255,255,.04)", borderRadius: 6, padding: "5px 7px" }}>
                                            <div style={{ fontSize: 7, color: C.muted, marginBottom: 1 }}>🛒 Insumos</div>
                                            <div style={{ fontSize: 11, fontWeight: 700, color: C.amber }}>{fmt(calc.custoInsumos)}</div>
                                        </div>
                                        <div style={{ background: viavel ? "rgba(16,185,129,.1)" : "rgba(239,68,68,.08)", borderRadius: 6, padding: "5px 7px" }}>
                                            <div style={{ fontSize: 7, color: C.muted, marginBottom: 1 }}>✅ Lucro</div>
                                            <div style={{ fontSize: 11, fontWeight: 700, color: viavel ? C.green : C.red }}>{fmt(calc.lucro)}</div>
                                        </div>
                                    </div>

                                    {/* Info secundária */}
                                    <div style={{ display: "flex", gap: 8, fontSize: 9, color: C.muted, marginBottom: 10, flexWrap: "wrap" }}>
                                        <span>⏱️ {calc.diasTotal}d/ciclo</span>
                                        <span>📦 {steps.length} ações</span>
                                        {calc.custoArmazenamento > 0 && <span>🏗️ arm. {fmt(calc.custoArmazenamento)}/mês</span>}
                                        {edificiosNaCadeia.length > 0 && (
                                            <span style={{ color: C.purple2 }}>🏭 {edificiosNaCadeia.slice(0, 2).join(", ")}{edificiosNaCadeia.length > 2 ? ` +${edificiosNaCadeia.length - 2}` : ""}</span>
                                        )}
                                    </div>

                                    {/* Botões */}
                                    <div style={{ display: "flex", gap: 6 }}>
                                        <button onClick={() => togglePipeline(p.id)}
                                            style={{ flex: 1, background: p.ativo ? "rgba(245,158,11,.18)" : "rgba(16,185,129,.18)", border: "none", borderRadius: 7, color: p.ativo ? C.amber : C.green, padding: "6px 0", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                                            {p.ativo ? "⏸ Pausar" : "▶ Ativar"}
                                        </button>
                                        <button onClick={() => { setPipelineId(p.id); setEtapa("editor"); }}
                                            style={{ flex: 1, background: "rgba(124,58,237,.18)", border: "none", borderRadius: 7, color: C.purple2, padding: "6px 0", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                                            ✏️ Editar
                                        </button>
                                        <button
                                            onClick={() => {
                                                setPipelineParaRemover(p);
                                                setModalRemover(true);
                                            }}
                                            style={{
                                                background: "rgba(239,68,68,.15)",
                                                border: "none",
                                                borderRadius: 7,
                                                color: C.red,
                                                padding: "6px 10px",
                                                fontSize: 11,
                                                fontWeight: 700,
                                                cursor: "pointer",
                                                fontFamily: "inherit"
                                            }}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

            </div>
        </div>
    );

    if (etapa === "objetivo") return wrap(
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, overflowY: "auto" }}>
                <EtapaObjetivo onProximo={id => { setObjetivo(id); setEtapa("configurar"); }} />
            </div>
        </div>
    );

    if (etapa === "configurar") {
        const mapa = {
            contrato_venda: <EtapaContratoVenda onProximo={onConfigurarProximo} onVoltar={() => setEtapa("objetivo")} />,
            arbitragem: <EtapaArbitragem onProximo={onConfigurarProximo} onVoltar={() => setEtapa("objetivo")} />,
            venda_producao: <EtapaProducaoVenda objetivo={objetivo} onProximo={onConfigurarProximo} onVoltar={() => setEtapa("objetivo")} />,
            ociosos: <EtapaProducaoVenda objetivo={objetivo} onProximo={onConfigurarProximo} onVoltar={() => setEtapa("objetivo")} />,
            escoar_estoque: <EtapaProducaoVenda objetivo={objetivo} onProximo={onConfigurarProximo} onVoltar={() => setEtapa("objetivo")} />,
        };
        return wrap(
            <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", inset: 0, overflowY: "auto" }}>
                    {mapa[objetivo] || <div style={{ padding: 24, color: C.muted }}>Objetivo não implementado: {objetivo}</div>}
                </div>
            </div>
        );
    }

    if (etapa === "editor") return wrap(
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0 }}>
            <ReactFlowProvider>
                <EditorCanvas pipelineId={pipelineId} onSalvar={() => setEtapa("revisao")} />
            </ReactFlowProvider>
        </div>
    );

    if (etapa === "revisao") return wrap(
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, overflowY: "auto" }}>
                <EtapaRevisao pipelineId={pipelineId} onAtivo={() => setEtapa("lista")} onVoltar={() => setEtapa("editor")} />
            </div>
        </div>
    );

    return null;
}