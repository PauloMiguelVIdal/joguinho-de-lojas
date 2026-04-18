import React, { useContext, useMemo, useState } from "react";
import {
  Activity, Clock, Package, Database,
  Zap, AlertTriangle, ChevronDown,
  ListChecks, BadgeDollarSign,
} from "lucide-react";
import { useGame } from "./GameContext";
import { productsCatalog } from "./ProductCatalog";
import { getMarketPrice } from "./TablePrice";
import { FORMULAS_EDIFICIOS } from "./productionFormulasConfig";
import { SALES_EDIFICIOS } from "./salesFormulasConfig";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
// import { CentraldeDadosContext } from "../centralDeDadosContext";
import { BestBuy } from "./BestBuy";

// ─────────────────────────────────────────────────────────────
//  UTILITÁRIOS
// ─────────────────────────────────────────────────────────────
const fmt = (v) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency", currency: "BRL", maximumFractionDigits: 0,
  }).format(v);

const fmtK = (v) => {
  if (!v || isNaN(v)) return "0";
  if (v >= 1e9) return (v / 1e9).toFixed(1) + "B";
  if (v >= 1e6) return (v / 1e6).toFixed(1) + "M";
  if (v >= 1e3) return (v / 1e3).toFixed(0) + "K";
  return String(Math.round(v));
};

const CAT_ICONS = {
  "agrícolas secos": "🌾", "biomassa / orgânicos": "🌱",
  "produtos manufaturados": "📦", animais: "🐄", perecíveis: "🥩",
  "componentes eletrônicos": "🔌", "bens de alto valor": "💎",
  "componentes industriais": "⚙️", químicos: "🧪", minério: "🪨",
  fluidos: "💧", veículos: "🚗", aeronaves: "✈️",
  energia: "⚡", "produtos digitais": "💾", "materiais sensíveis": "⚠️",
};

// ─────────────────────────────────────────────────────────────
//  BARRA DE PROGRESSO
// ─────────────────────────────────────────────────────────────
function Bar({ value, max, color = "#7aff9a" }) {
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

// ─────────────────────────────────────────────────────────────
//  SEÇÃO COLAPSÁVEL
// ─────────────────────────────────────────────────────────────
function Section({ dot, title, badge, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{
      background: "rgba(0,0,0,.22)",
      border: "1px solid rgba(255,255,255,.06)",
      borderRadius: 12, overflow: "hidden", flexShrink: 0,
    }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: 7,
          padding: "8px 11px", border: "none", cursor: "pointer",
          background: "rgba(0,0,0,.15)", fontFamily: "inherit",
          borderBottom: open ? "1px solid rgba(255,255,255,.05)" : "none",
        }}
      >
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
        <ChevronDown
          size={11}
          color="rgba(255,255,255,.2)"
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s", flexShrink: 0 }}
        />
      </button>
      {open && <div style={{ padding: "9px 11px" }}>{children}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  PAINEL: TRANSAÇÕES DO MERCADO
// ─────────────────────────────────────────────────────────────
function TransacoesPanel({ transactions }) {
  const empty = !transactions?.length;
  return (
    <Section dot="#C87AFF" title="Transações" badge={empty ? null : transactions.length}>
      {empty ? (
        <p style={{ fontSize: 10, color: "rgba(255,255,255,.2)", textAlign: "center", fontStyle: "italic", padding: "4px 0" }}>
          Nenhuma transação ativa
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {transactions.map((t) => {
            const p = productsCatalog[t.id] || productsCatalog[t.produtoId];
            const isBuy = t.tipo === "buy";
            return (
              <div key={t.id} style={{
                display: "flex", alignItems: "center", gap: 7,
                background: isBuy ? "rgba(37,99,235,.09)" : "rgba(5,150,105,.09)",
                border: `1px solid ${isBuy ? "rgba(37,99,235,.2)" : "rgba(5,150,105,.2)"}`,
                borderRadius: 8, padding: "6px 8px",
              }}>
                <span style={{ fontSize: 15, flexShrink: 0 }}>{p?.icon || "📦"}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: 10, fontWeight: 800, color: "#fff",
                    textTransform: "uppercase", whiteSpace: "nowrap",
                    overflow: "hidden", textOverflow: "ellipsis", letterSpacing: ".03em",
                  }}>
                    {isBuy ? "↓" : "↑"} {p?.nome}
                  </p>
                  <p style={{ fontSize: 9, color: "rgba(255,255,255,.35)", fontWeight: 600 }}>
                    {t.quantidade} {p?.unidade}
                  </p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontSize: 11, fontWeight: 900, color: isBuy ? "#60a5fa" : "#34d399" }}>
                    {fmtK(t.valorTotal)}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 2, justifyContent: "flex-end" }}>
                    <Clock size={8} color="#f97316" />
                    <span style={{ fontSize: 9, fontWeight: 800, color: "#f97316" }}>{t.diasRestantes}d</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────
//  PAINEL: ARMAZENAMENTO
// ─────────────────────────────────────────────────────────────
function ArmazenamentoPanel({ getCategoryStorageUI, potentialCapacityByCategory, usedVariableStorage, variableStorageTotal }) {
  const categorias = useMemo(
    () => [...new Set(Object.values(productsCatalog).map((p) => p.categoriaFisica))],
    []
  );

  const cats = categorias
    .map((cat) => {
      const ui = getCategoryStorageUI(cat);
      const pot = potentialCapacityByCategory?.[cat];
      if (!pot) return null;
      const usado = ui.usadoSlots ?? 0;
      const total = (pot.dedicada ?? 0) + (pot.variavel ?? 0);
      if (total === 0 && usado === 0) return null;
      return { cat, usado, total, pct: total > 0 ? (usado / total) * 100 : 0 };
    })
    .filter(Boolean)
    .sort((a, b) => b.pct - a.pct);

  return (
    <Section dot="#FFD966" title="Armazenamento">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 9, color: "rgba(255,255,255,.3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em" }}>
          Geral
        </span>
        <span style={{ fontSize: 10, fontWeight: 800, color: "#FFD966" }}>
          {usedVariableStorage}/{variableStorageTotal} slots
        </span>
      </div>
      <Bar value={usedVariableStorage} max={variableStorageTotal} color="#FFD966" />

      {cats.length > 0 && (
        <div style={{ marginTop: 9, display: "flex", flexDirection: "column", gap: 6 }}>
          {cats.slice(0, 7).map(({ cat, usado, total, pct }) => (
            <div key={cat}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                <span style={{ fontSize: 9, color: "rgba(255,255,255,.4)", display: "flex", alignItems: "center", gap: 3 }}>
                  {CAT_ICONS[cat] || "📦"} <span style={{ textTransform: "capitalize" }}>{cat}</span>
                </span>
                <span style={{ fontSize: 9, fontWeight: 700, color: pct >= 90 ? "#ff4d4d" : pct >= 70 ? "#FFD700" : "rgba(255,255,255,.45)" }}>
                  {usado.toFixed(0)}/{total}
                </span>
              </div>
              <Bar value={usado} max={total} />
            </div>
          ))}
          {cats.length > 7 && (
            <p style={{ fontSize: 9, color: "rgba(255,255,255,.18)", textAlign: "center", fontStyle: "italic" }}>
              +{cats.length - 7} categorias
            </p>
          )}
        </div>
      )}
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────
//  PAINEL: INVENTÁRIO
// ─────────────────────────────────────────────────────────────
function InventarioPanel({ stock, economiaSetores }) {
  const [expanded, setExpanded] = useState(false);

  const items = useMemo(() =>
    Object.entries(stock)
      .map(([id, qty]) => ({
        id, qty,
        product: productsCatalog[id],
        valor: qty * getMarketPrice(id, economiaSetores),
      }))
      .filter((i) => i.product && i.qty > 0)
      .sort((a, b) => b.valor - a.valor),
    [stock, economiaSetores]
  );

  const totalValor = items.reduce((s, i) => s + i.valor, 0);
  const shown = expanded ? items : items.slice(0, 5);

  return (
    <Section dot="#34d399" title="Inventário" badge={items.length || null}>
      {!items.length ? (
        <p style={{ fontSize: 10, color: "rgba(255,255,255,.2)", textAlign: "center", fontStyle: "italic", padding: "4px 0" }}>
          Estoque vazio
        </p>
      ) : (
        <>
          <div style={{
            display: "flex", justifyContent: "space-between", marginBottom: 7,
            padding: "4px 7px",
            background: "rgba(52,211,153,.07)", border: "1px solid rgba(52,211,153,.15)",
            borderRadius: 7,
          }}>
            <span style={{ fontSize: 9, color: "rgba(255,255,255,.35)", fontWeight: 700, textTransform: "uppercase" }}>Total</span>
            <span style={{ fontSize: 12, fontWeight: 900, color: "#34d399" }}>{fmt(totalValor)}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {shown.map(({ id, qty, product, valor }) => (
              <div key={id} style={{
                display: "flex", alignItems: "center", gap: 7,
                background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.05)",
                borderRadius: 7, padding: "5px 7px",
              }}>
                <span style={{ fontSize: 14, flexShrink: 0 }}>{product.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 10, fontWeight: 800, color: "#fff", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {product.nome}
                  </p>
                  <p style={{ fontSize: 9, color: "rgba(255,255,255,.28)", fontWeight: 600 }}>
                    {qty} {product.unidade}
                  </p>
                </div>
                <span style={{ fontSize: 10, fontWeight: 800, color: "#34d399", flexShrink: 0 }}>
                  {fmtK(valor)}
                </span>
              </div>
            ))}
          </div>
          {items.length > 5 && (
            <button
              onClick={() => setExpanded((v) => !v)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 3,
                width: "100%", marginTop: 6, padding: "4px 0",
                background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)",
                borderRadius: 7, cursor: "pointer", fontSize: 9, fontWeight: 800,
                color: "rgba(255,255,255,.35)", letterSpacing: ".1em", textTransform: "uppercase",
              }}
            >
              {expanded ? "▲ Ver menos" : `▼ +${items.length - 5} itens`}
            </button>
          )}
        </>
      )}
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────
//  PAINEL: FILA DE PRODUÇÃO  (usa getSortedProductionQueue)
// ─────────────────────────────────────────────────────────────
function ProducaoPanel() {
  const { getSortedProductionQueue } = useGame();
  const productionQueue = getSortedProductionQueue?.() || [];

  // todas as fórmulas indexadas por id
  const formulasById = useMemo(() => {
    const map = {};
    FORMULAS_EDIFICIOS.forEach((ed) => {
      ed.formulas.forEach((f) => { map[f.id] = f; });
    });
    return map;
  }, []);

  const urgColor = (dias) =>
    dias <= 2 ? "#ff4d4d" : dias <= 5 ? "#FFD700" : "#60a5fa";

  return (
    <Section dot="#60a5fa" title="Produção Ativa" badge={productionQueue.length || null} defaultOpen={false}>
      {!productionQueue.length ? (
        <p style={{ fontSize: 10, color: "rgba(255,255,255,.2)", textAlign: "center", fontStyle: "italic", padding: "4px 0" }}>
          Fila de produção vazia
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {productionQueue.map((prod) => {
            const formula = formulasById[prod.formulaId];
            if (!formula) return null;

            // saídas do processo
            const outputs = formula.output ? Object.entries(formula.output) : [];
            const diasRestantes = prod.diasRestantes ?? prod.tempoRestante ?? "?";
            const cor = urgColor(diasRestantes);

            return (
              <div key={prod.id} style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "rgba(96,165,250,.07)",
                border: "1px solid rgba(96,165,250,.15)",
                borderRadius: 9, padding: "7px 9px",
              }}>
                {/* ícone do primeiro output */}
                <div style={{
                  width: 30, height: 30, borderRadius: 7, flexShrink: 0,
                  background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.09)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15,
                }}>
                  {outputs[0]
                    ? (productsCatalog[outputs[0][0]]?.icon || "⚙️")
                    : "⚙️"}
                </div>

                {/* info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: 10, fontWeight: 800, color: "#fff",
                    textTransform: "uppercase", letterSpacing: ".03em",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>
                    {formula.nome || formula.id}
                  </p>
                  <p style={{ fontSize: 9, color: "rgba(255,255,255,.3)", fontWeight: 600 }}>
                    {outputs.map(([id, qtd]) => {
                      const nome = productsCatalog[id]?.nome || id;
                      return `${qtd}× ${nome}`;
                    }).join(", ")}
                  </p>
                </div>

                {/* tempo */}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 3, justifyContent: "flex-end" }}>
                    <Clock size={9} color={cor} />
                    <span style={{ fontSize: 11, fontWeight: 900, color: cor }}>
                      {diasRestantes}d
                    </span>
                  </div>
                  {prod.quantidade && (
                    <p style={{ fontSize: 8, color: "rgba(255,255,255,.25)", fontWeight: 600 }}>
                      ×{prod.quantidade}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────
//  PAINEL: CONTRATOS COMERCIAIS  (usa sellQueue)
// ─────────────────────────────────────────────────────────────
function ContratosPanel() {
  const { sellQueue } = useGame();

  // todas as fórmulas de venda indexadas por id
  const salesById = useMemo(() => {
    const map = {};
    SALES_EDIFICIOS.forEach((ed) => {
      ed.formulas.forEach((f) => { map[f.id] = f; });
    });
    return map;
  }, []);

  // ordena por urgência (menor diasRestantes primeiro)
  const sorted = useMemo(() =>
    [...(sellQueue || [])].sort((a, b) => a.diasRestantes - b.diasRestantes),
    [sellQueue]
  );

  const urgStyle = (dias) => {
    if (dias <= 3) return { bg: "rgba(239,68,68,.10)", border: "rgba(239,68,68,.3)", color: "#ff4d4d" };
    if (dias <= 10) return { bg: "rgba(234,179,8,.09)", border: "rgba(234,179,8,.28)", color: "#FFD700" };
    return { bg: "rgba(52,211,153,.07)", border: "rgba(52,211,153,.18)", color: "#34d399" };
  };

  return (
    <Section dot="#f97316" title="Contratos" badge={sorted.length || null} defaultOpen={false}>
      {!sorted.length ? (
        <p style={{ fontSize: 10, color: "rgba(255,255,255,.2)", textAlign: "center", fontStyle: "italic", padding: "4px 0" }}>
          Sem contratos em andamento
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {sorted.map((sale) => {
            const formula = salesById[sale.formulaId];
            const u = urgStyle(sale.diasRestantes);

            // produto sendo vendido
            const produtoId = sale.produtoId || formula?.input?.[0]?.id;
            const produto = produtoId ? productsCatalog[produtoId] : null;
            const valorFmt = sale.valorTotal != null ? fmtK(sale.valorTotal) : null;

            return (
              <div key={sale.id} style={{
                display: "flex", alignItems: "center", gap: 8,
                background: u.bg, border: `1px solid ${u.border}`,
                borderRadius: 9, padding: "7px 9px",
              }}>
                {/* ícone */}
                <div style={{
                  width: 28, height: 28, borderRadius: 6, flexShrink: 0,
                  background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.09)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
                }}>
                  {produto?.icon || "📜"}
                </div>

                {/* info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: 10, fontWeight: 800, color: "#fff",
                    textTransform: "uppercase", letterSpacing: ".03em",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>
                    {formula?.nome || produto?.nome || `Contrato`}
                  </p>
                  <p style={{ fontSize: 9, color: "rgba(255,255,255,.3)", fontWeight: 600 }}>
                    {sale.quantidade != null ? `${sale.quantidade} ${produto?.unidade || "un."}` : ""}
                    {valorFmt ? ` · ${valorFmt}` : ""}
                  </p>
                </div>

                {/* urgência */}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 3, justifyContent: "flex-end" }}>
                    <Clock size={9} color={u.color} />
                    <span style={{ fontSize: 11, fontWeight: 900, color: u.color }}>
                      {sale.diasRestantes}d
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────
//  PAINEL: ALERTAS
// ─────────────────────────────────────────────────────────────
function AlertasPanel({ predictionReport }) {
  const alertas = (predictionReport || []).filter((i) => i.excessoQtd > 0);
  if (!alertas.length) return null;
  return (
    <Section dot="#ff4d4d" title="Alertas" badge={alertas.length}>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {alertas.map((item) => (
          <div key={item.produtoId} style={{
            display: "flex", alignItems: "center", gap: 7,
            background: "rgba(239,68,68,.09)", border: "1px solid rgba(239,68,68,.2)",
            borderRadius: 7, padding: "5px 7px",
          }}>
            <AlertTriangle size={12} color="#ff4d4d" style={{ flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 10, fontWeight: 800, color: "#fff", textTransform: "uppercase" }}>
                {item.nome}
              </p>
              <p style={{ fontSize: 9, color: "#ff4d4d", fontWeight: 700 }}>
                Perda de {item.excessoQtd} unid.
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────
//  EXPORT PRINCIPAL
// ─────────────────────────────────────────────────────────────
export function SideInformations() {
  const {
    stock,
    getCategoryStorageUI,
    usedVariableStorage,
    variableStorageTotal,
    potentialCapacityByCategory,
    getStockPredictionReport,
    marketTransactions,
  } = useGame();
  const { economiaSetores } = useContext(DadosEconomyGlobalContext);
  // const { dados } = useContext(CentraldeDadosContext);

  const predictionReport = useMemo(() => getStockPredictionReport(), [stock]);

  return (
    <div style={{
      width: "100%", height: "95%",
      background: "rgba(5,0,15,.65)",
      backdropFilter: "blur(16px)",
      display: "flex", flexDirection: "column",
      gap: 7, padding: "10px 9px",
      overflowY: "auto", overflowX: "hidden",
      scrollbarWidth: "thin",
      scrollbarColor: "rgba(255,255,255,.07) transparent",
      borderRadius: 16,
    }}>

      {/* alertas primeiro se existirem */}
      <AlertasPanel predictionReport={predictionReport} />

      {/* transações de mercado */}
      <TransacoesPanel transactions={marketTransactions} />

      {/* armazenamento */}
      {/* <ArmazenamentoPanel
        getCategoryStorageUI={getCategoryStorageUI}
        potentialCapacityByCategory={potentialCapacityByCategory}
        usedVariableStorage={usedVariableStorage}
        variableStorageTotal={variableStorageTotal}
      /> */}

      {/* inventário */}
      <InventarioPanel stock={stock} economiaSetores={economiaSetores} />

      {/* fila de produção — usa getSortedProductionQueue */}
      <ProducaoPanel />

      {/* contratos comerciais — usa sellQueue */}
      <ContratosPanel />
{/* <BestBuy/> */}

    </div>
  );
}