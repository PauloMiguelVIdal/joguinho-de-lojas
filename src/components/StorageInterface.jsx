/**
 * StorageInterface — área central da aba Estoque
 *
 * O que FICA AQUI (centro):
 *   - Previsão de produção (detalhada, com slots e valor estimado)
 *   - Inventário detalhado (com busca, scroll, valor total)
 *
 * O que FOI para o SideInformations (sidebar):
 *   - Capacidade por categoria (resumo com barras)
 *   - Alertas de overflow
 *   - Inventário resumido (top 5 por valor)
 */

import { useMemo, useContext, useState } from "react";
import { useGame } from "../components/GameContext";
import { productsCatalog } from "../components/ProductCatalog";
import { getMarketPrice } from "../components/TablePrice";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { AlertTriangle, Package, TrendingUp, Search, X } from "lucide-react";

export default function StorageInterface() {
  const {
    stock,
    getStockPredictionReport,
  } = useGame();
  const { economiaSetores } = useContext(DadosEconomyGlobalContext);

  const [search, setSearch] = useState("");

  // ── Previsão de produção ────────────────────────────────────
  const predictionReport = useMemo(
    () => getStockPredictionReport(),
    [stock, getStockPredictionReport]
  );

  // ── Inventário com busca ────────────────────────────────────
  const stockedProducts = useMemo(() => {
    return Object.entries(stock)
      .map(([id, qty]) => ({
        id, qty,
        product: productsCatalog[id],
        valor: qty * getMarketPrice(id, economiaSetores),
      }))
      .filter((p) => {
        if (!p.product || p.qty <= 0) return false;
        if (!search) return true;
        return p.product.nome.toLowerCase().includes(search.toLowerCase());
      })
      .sort((a, b) => b.valor - a.valor);
  }, [stock, economiaSetores, search]);

  const totalStockValue = useMemo(
    () => stockedProducts.reduce((sum, { valor }) => sum + valor, 0),
    [stockedProducts]
  );

  const formatNumber = (v) => new Intl.NumberFormat("pt-BR").format(v);
  const formatMoney = (v) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
  const fmtK = (v) => {
    if (v >= 1e9) return (v / 1e9).toFixed(1) + "B";
    if (v >= 1e6) return (v / 1e6).toFixed(1) + "M";
    if (v >= 1e3) return (v / 1e3).toFixed(0) + "K";
    return String(Math.round(v));
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg,#0d001f 0%,#060010 100%)",
        borderRadius: 20,
        overflow: "hidden",
        color: "#fff",
      }}
    >
      {/* ══ CABEÇALHO ══ */}
      <div style={{
        flexShrink: 0,
        padding: "14px 18px 12px",
        borderBottom: "1px solid rgba(255,255,255,.06)",
        background: "rgba(0,0,0,.3)",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <Package size={16} color="#FFD966" />
        <h2 style={{
          fontSize: 13, fontWeight: 900, textTransform: "uppercase",
          letterSpacing: ".14em", color: "#fff",
        }}>
          Centro de Logística
        </h2>
        <span style={{
          marginLeft: "auto", fontSize: 10, fontWeight: 700,
          color: "rgba(255,255,255,.3)", letterSpacing: ".08em", textTransform: "uppercase",
        }}>
          {stockedProducts.length} produto{stockedProducts.length !== 1 ? "s" : ""} em estoque
        </span>
      </div>

      {/* ══ CONTEÚDO SCROLLÁVEL ══ */}
      <div style={{
        flex: 1, minHeight: 0,
        overflowY: "auto", overflowX: "hidden",
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(255,255,255,.07) transparent",
        padding: "14px 16px",
        display: "flex", flexDirection: "column", gap: 16,
      }}>

        {/* ─────────────────────────────────────────────────────
            SEÇÃO 1: PREVISÃO DE PRODUÇÃO
        ───────────────────────────────────────────────────── */}
        {predictionReport.length > 0 && (
          <section>
            <div style={{
              display: "flex", alignItems: "center", gap: 7, marginBottom: 10,
            }}>
              <TrendingUp size={13} color="#60a5fa" />
              <h3 style={{
                fontSize: 10, fontWeight: 800, textTransform: "uppercase",
                letterSpacing: ".12em", color: "rgba(255,255,255,.55)",
              }}>
                Previsão de Produção
              </h3>
              <span style={{
                fontSize: 8, fontWeight: 700, padding: "1px 7px", borderRadius: 99,
                background: "rgba(96,165,250,.15)", color: "#60a5fa",
                border: "1px solid rgba(96,165,250,.25)",
              }}>
                {predictionReport.length} item{predictionReport.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {predictionReport.map((item) => (
                <div key={item.produtoId} style={{
                  background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: 12, padding: "12px 14px",
                  display: "flex", flexDirection: "column", gap: 8,
                }}>
                  {/* topo: ícone + nome + badge qtd */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 22 }}>{item.icon}</span>
                      <span style={{
                        fontSize: 11, fontWeight: 800, textTransform: "uppercase",
                        letterSpacing: ".04em",
                      }}>
                        {item.nome}
                      </span>
                    </div>
                    <span style={{
                      fontSize: 9, fontWeight: 900, padding: "3px 10px", borderRadius: 99,
                      background: "rgba(96,165,250,.15)", color: "#60a5fa",
                      border: "1px solid rgba(96,165,250,.22)",
                    }}>
                      +{item.totalQtd} previstos
                    </span>
                  </div>

                  {/* grid de métricas */}
                  <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr",
                    gap: 8,
                  }}>
                    <div style={{
                      background: "rgba(0,0,0,.25)", borderRadius: 8, padding: "8px 10px",
                    }}>
                      <p style={{ fontSize: 8, fontWeight: 700, textTransform: "uppercase", color: "rgba(255,255,255,.3)", marginBottom: 3 }}>
                        Slots necessários
                      </p>
                      <p style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>
                        {item.totalSlots}
                      </p>
                    </div>
                    <div style={{
                      background: "rgba(0,0,0,.25)", borderRadius: 8, padding: "8px 10px",
                      textAlign: "right",
                    }}>
                      <p style={{ fontSize: 8, fontWeight: 700, textTransform: "uppercase", color: "rgba(255,255,255,.3)", marginBottom: 3 }}>
                        Valor estimado
                      </p>
                      <p style={{ fontSize: 15, fontWeight: 800, color: "#34d399" }}>
                        {formatMoney(item.valorEstimado)}
                      </p>
                    </div>
                  </div>

                  {/* alerta de excesso */}
                  {item.excessoQtd > 0 && (
                    <div style={{
                      display: "flex", alignItems: "center", gap: 8,
                      background: "rgba(239,68,68,.10)",
                      border: "1px solid rgba(239,68,68,.22)",
                      borderRadius: 8, padding: "6px 10px",
                    }}>
                      <AlertTriangle size={13} color="#ff4d4d" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: 9, fontWeight: 800, color: "#ff4d4d", textTransform: "uppercase", letterSpacing: ".04em" }}>
                        Perda de {item.excessoQtd} unid. — capacidade insuficiente
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─────────────────────────────────────────────────────
            SEÇÃO 2: INVENTÁRIO DETALHADO
        ───────────────────────────────────────────────────── */}
        <section style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
          {/* cabeçalho com busca */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10, marginBottom: 10,
            flexShrink: 0,
          }}>
            <Package size={13} color="#34d399" />
            <h3 style={{
              fontSize: 10, fontWeight: 800, textTransform: "uppercase",
              letterSpacing: ".12em", color: "rgba(255,255,255,.55)",
              flex: 1,
            }}>
              Inventário
            </h3>

            {/* busca inline */}
            <div style={{
              display: "flex", alignItems: "center", gap: 7,
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.09)",
              borderRadius: 8, padding: "5px 10px",
              width: 180,
            }}>
              <Search size={10} color="rgba(255,255,255,.3)" />
              <input
                type="text"
                placeholder="Filtrar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  background: "transparent", border: "none", outline: "none",
                  color: "#fff", fontSize: 10, fontWeight: 600,
                  width: "100%", fontFamily: "inherit",
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}
                >
                  <X size={9} color="rgba(255,255,255,.35)" />
                </button>
              )}
            </div>
          </div>

          {/* total */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "8px 12px", marginBottom: 8,
            background: "rgba(52,211,153,.07)",
            border: "1px solid rgba(52,211,153,.18)",
            borderRadius: 10, flexShrink: 0,
          }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,.4)", textTransform: "uppercase", letterSpacing: ".08em" }}>
              Valor total ativo
            </span>
            <span style={{ fontSize: 16, fontWeight: 900, color: "#34d399", letterSpacing: "-.01em" }}>
              {formatMoney(totalStockValue)}
            </span>
          </div>

          {/* lista de produtos */}
          {stockedProducts.length === 0 ? (
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", flex: 1, gap: 8, opacity: 0.3,
            }}>
              <span style={{ fontSize: 28 }}>📦</span>
              <p style={{ fontSize: 11, color: "#fff", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em" }}>
                {search ? "Nenhum produto encontrado" : "Estoque vazio"}
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {stockedProducts.map(({ id, qty, product, valor }) => (
                <div key={id} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(255,255,255,.06)",
                  borderRadius: 10, padding: "8px 12px",
                  transition: "background .12s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.07)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.04)"; }}
                >
                  {/* ícone */}
                  <div style={{
                    width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                    background: "rgba(0,0,0,.3)",
                    border: "1px solid rgba(255,255,255,.09)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18,
                  }}>
                    {product.icon}
                  </div>

                  {/* info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: 11, fontWeight: 800, color: "#fff",
                      textTransform: "uppercase", letterSpacing: ".04em",
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      marginBottom: 2,
                    }}>
                      {product.nome}
                    </p>
                    <p style={{ fontSize: 9, color: "rgba(255,255,255,.28)", fontWeight: 600 }}>
                      {product.categoriaFisica}
                      {product.unidade ? ` · ${product.unidade}` : ""}
                    </p>
                  </div>

                  {/* quantidade */}
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 900, color: "#fff", lineHeight: 1 }}>
                      {formatNumber(qty)}
                      <span style={{ fontSize: 9, color: "rgba(255,255,255,.3)", fontWeight: 500, marginLeft: 3 }}>
                        {product.unidade}
                      </span>
                    </p>
                    <p style={{ fontSize: 10, fontWeight: 700, color: "#34d399", marginTop: 2 }}>
                      {formatMoney(valor)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}