import React, { useContext, useMemo, useState } from "react";
import { ShoppingCart, DollarSign, Zap, Search, X } from "lucide-react";
import { productsCatalog } from "./ProductCatalog";
import { getMarketPrice } from "./TablePrice";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
// import { CentraldeDadosContext } from "../centralDeDadosContext";
import { useGame } from "./GameContext";
import QuantityModal from "./QuantityModal";
import { useCentralStore, EDIFICIOS_BASE_DINAMICOS, EDIFICIOS_FINAIS_DINAMICOS_INICIAL,LICENCAS_DINAMICAS_GLOBAIS } from "../stores/useCentralStore";
import {
  EDIFICIOS_FINAIS_ESTATICOS,
  LICENCAS_ESTATICAS,
  EDIFICIOS_BASE_ESTATICOS,
  LICENCAS_ESTATICAS_GLOBAIS,
} from "../stores/dadosEstáticos";
// ─────────────────────────────────────────────────────────────
//  UTILITÁRIOS
// ─────────────────────────────────────────────────────────────
const fmtBRL = (v) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency", currency: "BRL", maximumFractionDigits: 0,
  }).format(v);

const SECTORS = [
  { id: "all",         label: "Todos",      emoji: "🌐" },
  { id: "agricultura", label: "Agricultura", emoji: "🌾" },
  { id: "comercio",    label: "Comércio",    emoji: "🛒" },
  { id: "industria",   label: "Indústria",   emoji: "🏭" },
  { id: "tecnologia",  label: "Tecnologia",  emoji: "💻" },
  { id: "imobiliario", label: "Imobiliário", emoji: "🏗️" },
  { id: "energia",     label: "Energia",     emoji: "⚡" },
];

// ─────────────────────────────────────────────────────────────
//  IDs VINCULADOS AOS EDIFÍCIOS ATIVOS
// ─────────────────────────────────────────────────────────────
function useLinkedProductIds() {
  const edificiosFinais = useCentralStore(s => s.edificiosFinais);

  return useMemo(() => {
    const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];
    const ids = new Set();

    setoresArr.forEach((setor) => {
      const dinamicos = edificiosFinais[setor]?.edificios || [];
      const estaticos = EDIFICIOS_FINAIS_ESTATICOS[setor]?.edificios || [];

      dinamicos.forEach((edDin, index) => {
        if ((edDin.quantidade ?? 0) <= 0) return; // pula logo, sem acessar estático

        const edEst = estaticos[index];
        if (!edEst) return;

        (edEst.produz || []).forEach((id) => ids.add(id));
        (edEst.consome || []).forEach((id) => ids.add(id));
        (edEst.vende || []).forEach((id) => ids.add(id));

        // lookup por nome no catálogo
        Object.values(productsCatalog).forEach((p) => {
          if (
            p.edificioProdutor === edEst.nome ||
            p.edificioVendedor === edEst.nome ||
            p.nomeEdificio    === edEst.nome
          ) ids.add(p.id);
        });
      });
    });

    return ids;
  }, [edificiosFinais]);
}

// ─────────────────────────────────────────────────────────────
//  PRODUCT ROW
// ─────────────────────────────────────────────────────────────
function ProductRow({ product, mode, onAction, canBuy, isLinked }) {
  const [hovered, setHovered] = useState(false);
  const isSell = mode === "sell";
  const hasStock = product.estoque > 0;
  const disabled = isSell ? !hasStock : !canBuy;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "8px 16px",
        borderBottom: "1px solid rgba(255,255,255,.04)",
        borderLeft: isLinked ? "3px solid #7c3aed" : "3px solid transparent",
        background: isLinked
          ? hovered ? "rgba(124,58,237,.15)" : "rgba(124,58,237,.07)"
          : hovered ? "rgba(255,255,255,.03)" : "transparent",
        transition: "background .12s",
        minHeight: 52,
        flexShrink: 0, // impede que a row encolha
      }}
    >
      {/* ícone */}
      <div style={{
        width: 36, height: 36, borderRadius: 8, flexShrink: 0,
        background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.09)",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
      }}>
        {product.icon}
      </div>

      {/* nome + meta */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
          <span style={{
            fontSize: 11, fontWeight: 800, color: "#fff",
            textTransform: "uppercase", letterSpacing: ".04em",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {product.nome}
          </span>
          {isLinked && (
            <span style={{
              fontSize: 7, fontWeight: 900, padding: "2px 6px", borderRadius: 4,
              background: "rgba(124,58,237,.5)", color: "#c4b5fd",
              letterSpacing: ".08em", textTransform: "uppercase", flexShrink: 0,
              border: "1px solid rgba(124,58,237,.45)",
            }}>
              ⚡ VINC
            </span>
          )}
        </div>
        <span style={{ fontSize: 9, color: "rgba(255,255,255,.28)", fontWeight: 600 }}>
          Estoque: {product.estoque} {product.unidade}
          &nbsp;·&nbsp;{product.slotSize} slot/{product.unidade}
          &nbsp;·&nbsp;
          <span style={{ color: "rgba(255,255,255,.18)", textTransform: "uppercase" }}>
            {product.setor}
          </span>
        </span>
      </div>

      {/* preço */}
      <div style={{ textAlign: "right", flexShrink: 0, minWidth: 88 }}>
        <p style={{ fontSize: 8, color: "rgba(255,255,255,.22)", textTransform: "uppercase", fontWeight: 700, marginBottom: 2 }}>
          Unitário
        </p>
        <p style={{ fontSize: 14, fontWeight: 900, color: "#34d399", letterSpacing: "-.01em" }}>
          {fmtBRL(product.preco)}
        </p>
      </div>

      {/* botão */}
      <button
        disabled={disabled}
        onClick={() => !disabled && onAction(product)}
        style={{
          flexShrink: 0, minWidth: 80, padding: "7px 16px",
          borderRadius: 8, border: "none",
          fontWeight: 800, fontSize: 10, letterSpacing: ".07em",
          textTransform: "uppercase",
          cursor: disabled ? "not-allowed" : "pointer",
          fontFamily: "inherit", transition: "all .15s",
          background: disabled
            ? "rgba(255,255,255,.06)"
            : isSell ? "#059669" : "#2563eb",
          color: disabled ? "rgba(255,255,255,.18)" : "#fff",
          opacity: disabled ? 0.45 : 1,
          boxShadow: disabled ? "none"
            : isSell ? "0 0 12px rgba(5,150,105,.4)"
            : "0 0 12px rgba(37,99,235,.4)",
        }}
      >
        {isSell ? "Vender" : "Comprar"}
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  MAIN
// ─────────────────────────────────────────────────────────────
export default function MarketplaceSystem() {
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);
  // const { dados } = useContext(CentraldeDadosContext);
  const {
    stock, removeProduct, canAddProduct,
    marketTransactions, setMarketTransactions,
    getMaxAddable, getMaxRemovable,
  } = useGame();

  const [mode, setMode] = useState("buy");
  const [sector, setSector] = useState("all");
  const [search, setSearch] = useState("");
  const [showLinkedOnly, setShowLinkedOnly] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalType, setModalType] = useState(null);

  // ref para medir a altura dos headers
  const headerRef = React.useRef(null);

  const linkedIds = useLinkedProductIds();

  const products = useMemo(() => {
    return Object.values(productsCatalog)
      .filter((p) => sector === "all" || p.setor === sector)
      .filter((p) => !search || p.nome.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => !showLinkedOnly || linkedIds.has(p.id))
      .map((p) => ({
        ...p,
        preco: getMarketPrice(p.id, economiaSetores),
        estoque: stock[p.id] || 0,
      }))
      .sort((a, b) => {
        const diff = (linkedIds.has(a.id) ? 0 : 1) - (linkedIds.has(b.id) ? 0 : 1);
        return diff !== 0 ? diff : a.nome.localeCompare(b.nome);
      });
  }, [economiaSetores, stock, sector, search, showLinkedOnly, linkedIds]);

  const linkedCount = useMemo(
    () => Object.values(productsCatalog).filter((p) => linkedIds.has(p.id)).length,
    [linkedIds]
  );

  function podeComprar(p) {
    return (
      economiaSetores.saldo >= getMarketPrice(p.id, economiaSetores) &&
      canAddProduct(p.id, 1)
    );
  }

  function confirmarCompra(produto, quantidade) {
    const preco = getMarketPrice(produto.id, economiaSetores);
    const valorTotal = preco * quantidade;
    if (economiaSetores.saldo < valorTotal) { alert("Saldo insuficiente"); return; }
    atualizarEco("saldo", economiaSetores.saldo - valorTotal);
    setMarketTransactions((prev) => [
      ...prev,
      { id: crypto.randomUUID(), tipo: "buy", produtoId: produto.id, quantidade, valorTotal, diasRestantes: 10 },
    ]);
  }

  function confirmarVenda(produto, quantidade) {
    const preco = getMarketPrice(produto.id, economiaSetores);
    const valorTotal = preco * quantidade;
    removeProduct(produto.id, quantidade);
    setMarketTransactions((prev) => [
      ...prev,
      { id: crypto.randomUUID(), tipo: "sell", produtoId: produto.id, quantidade, valorTotal, diasRestantes: 10 },
    ]);
  }

  const openModal = (p) => { setSelectedProduct(p); setModalType(mode); };

  // ── pill styles ───────────────────────────────────────────
  const modePill = (active, color) => ({
    display: "flex", alignItems: "center", gap: 6,
    padding: "8px 20px", borderRadius: 10, border: "none",
    fontWeight: 800, fontSize: 12, letterSpacing: ".06em",
    textTransform: "uppercase", cursor: "pointer",
    fontFamily: "inherit", transition: "all .18s",
    background: active ? color : "rgba(255,255,255,.06)",
    color: active ? "#fff" : "rgba(255,255,255,.3)",
    boxShadow: active ? `0 0 16px ${color}55` : "none",
  });

  const sectorPill = (active) => ({
    display: "flex", alignItems: "center", gap: 5,
    padding: "7px 14px", borderRadius: 8, border: "none",
    fontWeight: 700, fontSize: 11, letterSpacing: ".05em",
    textTransform: "uppercase", cursor: "pointer",
    fontFamily: "inherit", transition: "all .18s", flexShrink: 0,
    background: active ? "#6411D9" : "rgba(255,255,255,.06)",
    color: active ? "#fff" : "rgba(255,255,255,.35)",
    boxShadow: active ? "0 0 14px rgba(100,17,217,.5)" : "none",
  });

  // ─────────────────────────────────────────────────────────
  //  RENDER
  //
  //  Estrutura:
  //    <wrapper position:relative, height:100%>
  //      <headers position:absolute top:0 left:0 right:0>   ← empilha os 3 headers
  //      <list    position:absolute top:{headerH} bottom:0> ← ocupa o resto, scroll próprio
  //    </wrapper>
  //
  //  Usamos CSS vars para calcular a top da lista automaticamente.
  //  Cada header tem altura conhecida (pode variar):
  //    Header A: ~54px   (padding 12+12 + botões ~30px)
  //    Header B: ~46px   (padding 10+10 + pills ~26px)
  //    Header C: ~38px   (padding 8+8  + input ~22px)
  //  Total estimado: ~138px. Usamos `ref` medido dinamicamente.
  // ─────────────────────────────────────────────────────────
  const [headerHeight, setHeaderHeight] = React.useState(148);

  React.useLayoutEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  });

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%",
      background: "linear-gradient(180deg,#0d001f 0%,#060010 100%)",
      borderRadius: 20,
      overflow: "hidden",
    }}>

      {/* ══ HEADERS (posição absoluta no topo) ══ */}
      <div
        ref={headerRef}
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          zIndex: 10,
          display: "flex", flexDirection: "column",
          background: "linear-gradient(180deg,#0d001f 0%,#060010 100%)",
        }}
      >
        {/* HEADER A — MODO */}
        <div style={{
          padding: "12px 16px",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          borderBottom: "1px solid rgba(255,255,255,.06)",
          background: "rgba(0,0,0,.32)",
        }}>
          <div style={{
            display: "flex", background: "rgba(0,0,0,.45)",
            border: "1px solid rgba(255,255,255,.09)",
            borderRadius: 13, padding: 4, gap: 4,
          }}>
            <button onClick={() => setMode("buy")} style={modePill(mode === "buy", "#2563eb")}>
              <ShoppingCart size={14} /> Comprar
            </button>
            <button onClick={() => setMode("sell")} style={modePill(mode === "sell", "#059669")}>
              <DollarSign size={14} /> Vender
            </button>
          </div>

          {linkedCount > 0 && (
            <>
              <div style={{ width: 1, height: 28, background: "rgba(255,255,255,.08)" }} />
              <button
                onClick={() => setShowLinkedOnly((v) => !v)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "8px 16px", borderRadius: 10, border: "none",
                  fontWeight: 800, fontSize: 11, letterSpacing: ".06em",
                  textTransform: "uppercase", cursor: "pointer",
                  fontFamily: "inherit", transition: "all .18s",
                  background: showLinkedOnly ? "#7c3aed" : "rgba(255,255,255,.06)",
                  color: showLinkedOnly ? "#fff" : "rgba(255,255,255,.35)",
                  boxShadow: showLinkedOnly ? "0 0 14px rgba(124,58,237,.5)" : "none",
                }}
              >
                <Zap size={13} /> Meus edifícios ({linkedCount})
              </button>
            </>
          )}
        </div>

        {/* HEADER B — SETORES */}
        <div style={{
          padding: "10px 16px",
          display: "flex", alignItems: "center", gap: 6,
          borderBottom: "1px solid rgba(255,255,255,.05)",
          background: "rgba(0,0,0,.22)",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}>
          {SECTORS.map((s) => (
            <button key={s.id} onClick={() => setSector(s.id)} style={sectorPill(sector === s.id)}>
              <span style={{ fontSize: 14 }}>{s.emoji}</span>
              {s.label}
            </button>
          ))}
        </div>

        {/* HEADER C — BUSCA + CONTADOR */}
        <div style={{
          padding: "8px 16px",
          display: "flex", alignItems: "center", gap: 12,
          borderBottom: "1px solid rgba(255,255,255,.04)",
          background: "rgba(0,0,0,.15)",
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.09)",
            borderRadius: 8, padding: "6px 12px", flex: 1, maxWidth: 280,
          }}>
            <Search size={12} color="rgba(255,255,255,.3)" />
            <input
              type="text"
              placeholder="Buscar produto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: "transparent", border: "none", outline: "none",
                color: "#fff", fontSize: 11, fontWeight: 600,
                width: "100%", fontFamily: "inherit",
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0, lineHeight: 1, display: "flex" }}
              >
                <X size={10} color="rgba(255,255,255,.35)" />
              </button>
            )}
          </div>

          <span style={{ fontSize: 10, color: "rgba(255,255,255,.22)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em" }}>
            {products.length} produto{products.length !== 1 ? "s" : ""}
            {showLinkedOnly ? " vinculados" : ""}
          </span>

          {linkedCount > 0 && (
            <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 9, color: "#c4b5fd", fontWeight: 700 }}>
              <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: "#7c3aed" }} />
              Vinculados aos seus edifícios
            </span>
          )}
        </div>
      </div>
      {/* fim headers */}

      {/* ══ LISTA — posição absoluta, ocupa o espaço abaixo dos headers ══ */}
      {/*
       * top = altura medida dos headers (atualizada via useLayoutEffect)
       * bottom = 0
       * overflow-y = scroll  →  garante scroll independente do tamanho do conteúdo
       */}
      <div style={{
        position: "absolute",
        top: headerHeight,
        left: 0,
        right: 0,
        bottom: 0,
        overflowY: "scroll",      /* sempre mostra trilho, evita layout shift */
        overflowX: "hidden",
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(255,255,255,.08) transparent",
      }}>
        {products.length === 0 ? (
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", height: "100%", gap: 12, opacity: 0.3,
          }}>
            <span style={{ fontSize: 36 }}>🔍</span>
            <p style={{ fontSize: 13, color: "#fff", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em" }}>
              Nenhum produto encontrado
            </p>
          </div>
        ) : (
          // wrapper sem height fixo — cresce conforme os items
          <div>
            {products.map((p) => (
              <ProductRow
                key={p.id}
                product={p}
                mode={mode}
                canBuy={podeComprar(p)}
                isLinked={linkedIds.has(p.id)}
                onAction={openModal}
              />
            ))}
          </div>
        )}
      </div>

      {/* ══ MODAL ══ */}
      {selectedProduct && (
        <QuantityModal
          isOpen={!!selectedProduct}
          productId={selectedProduct.id}
          title={modalType === "buy" ? `Comprar ${selectedProduct.nome}` : `Vender ${selectedProduct.nome}`}
          price={selectedProduct.preco}
          max={
            modalType === "buy"
              ? Math.min(
                  getMaxAddable(selectedProduct.id),
                  Math.floor(economiaSetores.saldo / getMarketPrice(selectedProduct.id, economiaSetores))
                )
              : getMaxRemovable(selectedProduct.id)
          }
          onClose={() => setSelectedProduct(null)}
          onConfirm={(qty) => {
            if (modalType === "buy") confirmarCompra(selectedProduct, qty);
            else confirmarVenda(selectedProduct, qty);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}