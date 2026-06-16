import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import LoanCarousel from "./LoanCarousel";

// ── Helpers ───────────────────────────────────────────────
const fmt = (num) => {
  if (num >= 1e12) return (num / 1e12).toFixed(1).replace(".0", "") + "T";
  if (num >= 1e9)  return (num / 1e9).toFixed(1).replace(".0", "") + "B";
  if (num >= 1e6)  return (num / 1e6).toFixed(1).replace(".0", "") + "M";
  if (num >= 1e3)  return (num / 1e3).toFixed(1).replace(".0", "") + "K";
  return String(num);
};

// ═══════════════════════════════════════════════════════════
// CARTÕES DE CRÉDITO — variantes de design
// ═══════════════════════════════════════════════════════════

const GeometricChaosCard = ({ cartao, selected, onClick, nomeEmpresa }) => (
  <motion.div
    whileHover={{ scale: 1.04, y: -4 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    style={{
      width: 280, height: 160, borderRadius: 20,
      background: `linear-gradient(45deg, ${cartao.cor1} 0%, ${cartao.cor2} 25%, ${cartao.cor3} 50%, ${cartao.cor4} 75%, ${cartao.cor1} 100%)`,
      position: "relative", overflow: "hidden", cursor: "pointer",
      boxShadow: selected ? `0 0 0 3px #fff, 0 8px 32px ${cartao.cor2}88` : `0 8px 24px ${cartao.cor1}66`,
    }}
  >
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", top: 12, left: 12, width: 24, height: 24, transform: "rotate(45deg)", backgroundColor: cartao.cor4, opacity: .2 }} />
      <div style={{ position: "absolute", bottom: 12, right: 12, width: 24, height: 48, transform: "rotate(-12deg)", backgroundColor: cartao.cor2, opacity: .3 }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%) rotate(45deg)", width: 48, height: 48, border: `4px solid ${cartao.cor4}`, opacity: .2 }} />
    </div>
    <CardBody cartao={cartao} nomeEmpresa={nomeEmpresa} />
  </motion.div>
);

const TriangularFusionCard = ({ cartao, selected, onClick, nomeEmpresa }) => (
  <motion.div
    whileHover={{ scale: 1.04, y: -4 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    style={{
      width: 280, height: 160, borderRadius: 20,
      background: `conic-gradient(from 0deg, ${cartao.cor1}, ${cartao.cor2}, ${cartao.cor3}, ${cartao.cor4}, ${cartao.cor1})`,
      position: "relative", overflow: "hidden", cursor: "pointer",
      boxShadow: selected ? `0 0 0 3px #fff, 0 8px 32px ${cartao.cor2}88` : `0 8px 24px ${cartao.cor1}66`,
    }}
  >
    <div style={{ position: "absolute", top: 12, left: 12, width: 0, height: 0, borderLeft: "15px solid transparent", borderRight: "15px solid transparent", borderBottom: `25px solid ${cartao.cor4}`, opacity: .3 }} />
    <div style={{ position: "absolute", bottom: 12, right: 12, width: 0, height: 0, borderLeft: "18px solid transparent", borderRight: "18px solid transparent", borderTop: `30px solid ${cartao.cor1}`, opacity: .4 }} />
    <CardBody cartao={cartao} nomeEmpresa={nomeEmpresa} />
  </motion.div>
);

const CardClassico = ({ cartao, selected, onClick, nomeEmpresa }) => (
  <motion.div
    whileHover={{ scale: 1.04, y: -4 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    style={{
      width: 280, height: 160, borderRadius: 20,
      background: `linear-gradient(135deg, ${cartao.cor1} 0%, ${cartao.cor2} 50%, ${cartao.cor3} 100%)`,
      position: "relative", overflow: "hidden", cursor: "pointer",
      boxShadow: selected ? `0 0 0 3px #fff, 0 8px 32px ${cartao.cor2}88` : `0 8px 24px ${cartao.cor1}66`,
    }}
  >
    <div style={{ position: "absolute", top: -24, right: -24, width: 80, height: 80, transform: "rotate(45deg)", backgroundColor: cartao.cor4, opacity: .1 }} />
    <div style={{ position: "absolute", top: 40, left: -24, width: 56, height: 56, borderRadius: "50%", backgroundColor: cartao.cor3, opacity: .15 }} />
    <CardBody cartao={cartao} nomeEmpresa={nomeEmpresa} />
  </motion.div>
);

const CardModerno = ({ cartao, selected, onClick, nomeEmpresa }) => (
  <motion.div
    whileHover={{ scale: 1.04, y: -4 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    style={{
      width: 280, height: 160, borderRadius: 16,
      background: `radial-gradient(circle at top right, ${cartao.cor3} 0%, ${cartao.cor2} 50%, ${cartao.cor1} 100%)`,
      position: "relative", overflow: "hidden", cursor: "pointer",
      boxShadow: selected ? `0 0 0 3px #fff, 0 8px 32px ${cartao.cor2}88` : `0 8px 24px ${cartao.cor1}66`,
    }}
  >
    {[...Array(4)].map((_, i) => (
      <div key={i} style={{
        position: "absolute",
        border: `2px solid ${cartao.cor4}`,
        width: 22, height: 22,
        clipPath: "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
        left: `${15 + i * 14}%`, top: `${8 + (i % 2) * 18}%`,
        transform: `rotate(${i * 30}deg)`, opacity: .18,
      }} />
    ))}
    <CardBody cartao={cartao} nomeEmpresa={nomeEmpresa} />
  </motion.div>
);

const WavePatternsCard = ({ cartao, selected, onClick, nomeEmpresa }) => (
  <motion.div
    whileHover={{ scale: 1.04, y: -4 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    style={{
      width: 280, height: 160, borderRadius: 18,
      background: `linear-gradient(135deg, ${cartao.cor1} 0%, ${cartao.cor2} 33%, ${cartao.cor3} 66%, ${cartao.cor4} 100%)`,
      position: "relative", overflow: "hidden", cursor: "pointer",
      boxShadow: selected ? `0 0 0 3px #fff, 0 8px 32px ${cartao.cor2}88` : `0 8px 24px ${cartao.cor1}66`,
    }}
  >
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .18 }} viewBox="0 0 280 160">
      <path d="M0,80 Q70,50 140,80 T280,80 L280,160 L0,160 Z" fill={cartao.cor4} opacity=".35" />
      <path d="M0,100 Q70,70 140,100 T280,100 L280,160 L0,160 Z" fill={cartao.cor3} opacity=".25" />
    </svg>
    <CardBody cartao={cartao} nomeEmpresa={nomeEmpresa} />
  </motion.div>
);

// ── Corpo interno compartilhado ────────────────────────────
const CardBody = ({ cartao, nomeEmpresa }) => (
  <div style={{ padding: "14px 16px", position: "relative", zIndex: 10, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
    {/* Banco */}
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <span style={{
        backgroundColor: "rgba(255,255,255,.9)", color: cartao.cor1,
        fontSize: 9, fontWeight: 800, padding: "3px 9px", borderRadius: 20,
        letterSpacing: ".06em",
      }}>
        {cartao.banco}
      </span>
    </div>

    {/* Chip */}
    <div style={{
      width: 38, height: 26, borderRadius: 6,
      background: "linear-gradient(135deg, #f5c518, #e8a000)",
      position: "relative", boxShadow: "0 2px 8px rgba(0,0,0,.4)",
    }}>
      <div style={{ position: "absolute", inset: 6, backgroundColor: "rgba(0,0,0,.25)", borderRadius: 3 }} />
    </div>

    {/* Número */}
    <div style={{ fontSize: 14, fontFamily: "monospace", letterSpacing: "3px", color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,.4)" }}>
      {cartao.numeroCard}
    </div>

    {/* Rodapé */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
      <div>
        <div style={{ fontSize: 7, opacity: .7, letterSpacing: ".1em", textTransform: "uppercase", color: "#fff", marginBottom: 2 }}>Empresa</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{nomeEmpresa}</div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 7, opacity: .7, letterSpacing: ".1em", textTransform: "uppercase", color: "#fff", marginBottom: 2 }}>Válido</div>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>{cartao.validade}</div>
      </div>
    </div>
  </div>
);

// ── Slot vazio ─────────────────────────────────────────────
const SlotVazio = ({ onClick }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    onClick={onClick}
    style={{
      width: 280, height: 160, borderRadius: 20, cursor: "pointer",
      background: "rgba(255,255,255,.04)",
      border: "2px dashed rgba(255,255,255,.15)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 8,
    }}
  >
    <div style={{
      width: 40, height: 40, borderRadius: "50%",
      background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.15)",
      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
    }}>+</div>
    <span style={{ fontSize: 11, color: "rgba(255,255,255,.4)", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>
      Adicionar cartão
    </span>
    <span style={{ fontSize: 9, color: "rgba(255,255,255,.2)", letterSpacing: ".05em" }}>
      Clique para acessar bancos
    </span>
  </motion.div>
);

// ── Slot bloqueado ─────────────────────────────────────────
const SlotBloqueado = ({ index }) => {
  const porteNecessario = index === 1 ? "Companhia Local" : "Corporação Multissetorial";
  return (
    <div style={{
      width: 280, height: 160, borderRadius: 20,
      background: "rgba(0,0,0,.25)",
      border: "1px solid rgba(255,255,255,.06)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 8,
    }}>
      <div style={{ fontSize: 28, filter: "grayscale(1)", opacity: .4 }}>🔒</div>
      <span style={{ fontSize: 10, color: "rgba(255,255,255,.25)", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>
        Slot bloqueado
      </span>
      <span style={{ fontSize: 9, color: "rgba(255,255,255,.15)", textAlign: "center", maxWidth: 180, lineHeight: 1.5 }}>
        Adquira <strong style={{ color: "rgba(255,255,255,.3)" }}>{porteNecessario}</strong> para desbloquear
      </span>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════
const SidebarCards = () => {
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);

  const contratos = economiaSetores?.contratosBancos || [];
  const [selectedCard, setSelectedCard] = useState(null);

  const setVision = (v) => atualizarDados("vision", { ...dados.vision, visionAtual: v });

  const getSlotsLiberados = () => {
    const porte = economiaSetores.porteEmpresa || [];
    if (porte[6]?.status) return 3;
    if (porte[3]?.status) return 2;
    return 1;
  };
  const slotsLiberados = getSlotsLiberados();

  const abrirBanco = (cartaoId) => {
    const idx = contratos.findIndex((c) => c?.cartaoId === cartaoId);
    if (idx !== -1) { atualizarEco("idContrato", idx); setVision("bankInterface"); }
  };

  const contratoParaCartao = (c) => ({
    id: c.cartaoId, banco: c.bancoNome, design: c.design,
    cor1: c.cor1, cor2: c.cor2, cor3: c.cor3, cor4: c.cor4,
    numeroCard: c.cartaoNome,
    validade: c.dataFim ? `até ${c.dataFim}` : "—",
  });

  const renderCartao = (cartao) => {
    const props = {
      cartao, selected: selectedCard === cartao.id,
      onClick: () => { setSelectedCard(cartao.id); abrirBanco(cartao.id); },
      nomeEmpresa: dados.inicioGame.nomeEmpresa,
    };
    switch (cartao.design) {
      case "geometric-chaos":    return <GeometricChaosCard   {...props} />;
      case "triangular-fusion":  return <TriangularFusionCard  {...props} />;
      case "moderno":            return <CardModerno           {...props} />;
      case "wave-patterns":      return <WavePatternsCard      {...props} />;
      default:                   return <CardClassico          {...props} />;
    }
  };

  const nomeEmpresa = dados.inicioGame.nomeEmpresa || "Empresa";

  return (
    <div style={{
      height: "95vh", width: "100%", borderRadius: 16,
      background: "linear-gradient(170deg, #1a0d40 0%, #2d1470 40%, #1a0d40 100%)",
      display: "flex", flexDirection: "column",
      overflow: "hidden", position: "relative",
    }}>

      {/* Glow de fundo decorativo */}
      <div style={{
        position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)",
        width: 300, height: 300,
        background: "radial-gradient(circle, rgba(147,76,255,.18) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* ── HEADER ─────────────────────────────────────── */}
      <div style={{
        padding: "16px 18px 12px",
        borderBottom: "1px solid rgba(255,255,255,.07)",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h2 style={{
              color: "#fff", fontSize: 14, fontWeight: 800,
              fontFamily: "'Rajdhani',sans-serif", letterSpacing: ".06em",
              textTransform: "uppercase", margin: 0,
            }}>
              Carteira Financeira
            </h2>
            <p style={{ color: "rgba(255,255,255,.35)", fontSize: 10, margin: "2px 0 0", letterSpacing: ".04em" }}>
              {nomeEmpresa}
            </p>
          </div>
          {/* Slots indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{
                width: 8, height: 8, borderRadius: "50%",
                background: i < slotsLiberados
                  ? "linear-gradient(135deg,#7B2FFF,#934CFF)"
                  : "rgba(255,255,255,.1)",
                boxShadow: i < slotsLiberados ? "0 0 8px #934CFF88" : "none",
                transition: "all .3s",
              }} />
            ))}
            <span style={{ fontSize: 9, color: "rgba(255,255,255,.35)", marginLeft: 4, letterSpacing: ".08em" }}>
              {slotsLiberados}/3 slots
            </span>
          </div>
        </div>
      </div>

      {/* ── ÁREA DE SCROLL ─────────────────────────────── */}
      <div style={{
        flex: 1, overflowY: "auto", overflowX: "hidden",
        padding: "14px 14px 0",
        display: "flex", flexDirection: "column", gap: 12,
      }}
        className="scrollbar-custom"
      >

        {/* SLOTS DE CARTÃO */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
          <div style={{
            fontSize: 8, fontWeight: 700, letterSpacing: ".18em",
            textTransform: "uppercase", color: "rgba(255,255,255,.28)",
            paddingLeft: 2,
          }}>
            Cartões ativos
          </div>

          {[0, 1, 2].map((i) => {
            const contrato = contratos[i];
            if (i < slotsLiberados) {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  {contrato
                    ? renderCartao(contratoParaCartao(contrato))
                    : <SlotVazio onClick={() => setVision("bank")} />
                  }
                </motion.div>
              );
            }
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <SlotBloqueado index={i} />
              </motion.div>
            );
          })}
        </div>

        {/* DIVISOR */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10, padding: "4px 0",
        }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }} />
          <span style={{ fontSize: 8, color: "rgba(255,255,255,.2)", letterSpacing: ".14em", textTransform: "uppercase" }}>
            Empréstimos
          </span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }} />
        </div>

        {/* LOAN CAROUSEL */}
        <div style={{ marginBottom: 14 }}>
          <LoanCarousel />
        </div>

      </div>
    </div>
  );
};

export default SidebarCards;