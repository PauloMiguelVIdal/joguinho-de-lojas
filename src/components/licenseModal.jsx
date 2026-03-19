import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { Localizador } from "./localizador";
import DolarImg from "../../public/outrasImagens/simbolo-do-dolar.png";
import agricultura from "../../public/outrasImagens/setores/agricultura.png";
import tecnologia from "../../public/outrasImagens/setores/tecnologia.png";
import comercio from "../../public/outrasImagens/setores/comercio.png";
import industria from "../../public/outrasImagens/setores/industria.png";
import imobiliario from "../../public/outrasImagens/setores/imobiliario.png";
import energia from "../../public/outrasImagens/setores/torre-eletrica.png";
import upInterpriseAudio from "../../public/sounds/upInterpriseAudio.mp3";
import useSound from "use-sound";

const SETORES = [
  { id: "agricultura", cor1: "#003816", cor2: "#1A5E2A", cor3: "#0C9123", cor4: "#4CAF50" },
  { id: "tecnologia",  cor1: "#A64B00", cor2: "#D45A00", cor3: "#FF6F00", cor4: "#FF8C42" },
  { id: "industria",   cor1: "#1A1A1A", cor2: "#4D4D4D", cor3: "#808080", cor4: "#B3B3B3" },
  { id: "comercio",    cor1: "#660000", cor2: "#A31919", cor3: "#E60000", cor4: "#FF4D4D" },
  { id: "imobiliario", cor1: "#000066", cor2: "#1A1A8C", cor3: "#3333CC", cor4: "#6666FF" },
  { id: "energia",     cor1: "#665200", cor2: "#A37F19", cor3: "#E6B800", cor4: "#FFD966" },
];

export const LicenseModal = ({ setor, nomeLicença, index }) => {
  const { dados, atualizarDados, atualizarDadosProf } = useContext(CentraldeDadosContext);
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);
  const [buttonUpInterpriseAudio] = useSound(upInterpriseAudio);
  const [unlockAnim, setUnlockAnim] = useState(false);

  const setorInfo = SETORES.find((s) => s.id === setor);
  const licenca = dados[setor].licençasSetor[index];
  const jaComprado = licenca.status === true;
  const podeComprar = economiaSetores.saldo >= licenca.valor;
  const qtdCards = licenca.edifíciosLiberados?.length || 0;

  const formatarNumero = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(1).replace(".0", "") + "T";
    if (num >= 1e9)  return (num / 1e9).toFixed(1).replace(".0", "") + "B";
    if (num >= 1e6)  return (num / 1e6).toFixed(1).replace(".0", "") + "M";
    if (num >= 1e3)  return (num / 1e3).toFixed(1).replace(".0", "") + "K";
    return String(num);
  };

  const getImageUrl = (nome) => `/imagens/${nome}.png`;

  const comprarLicença = () => {
    if (jaComprado || !podeComprar) return;
    buttonUpInterpriseAudio();
    setUnlockAnim(true);
    setTimeout(() => setUnlockAnim(false), 1200);

    atualizarDadosProf(["licençasSetor", index, "status"], true);

    licenca.edifíciosLiberados.forEach((nomeEd) => {
      const indice = dados[setor].edificios.findIndex((ed) => ed.nome === nomeEd);
      if (indice === -1) return;
      atualizarDadosProf(["edificios", indice, "licençaLiberado"], {
        ...dados[setor].edificios[indice].licençaLiberado,
        liberado: true,
      });
    });

    atualizarEco("saldo", economiaSetores.saldo - licenca.valor);
  };

  // ── Layout por quantidade de cards ────────────────────────
  // 1 card: grande centralizado
  // 2 cards: dois médios lado a lado
  // 3 cards: três em linha
  // 4+ cards: grid 2x2

  const renderCards = () => {
    const eds = licenca.edifíciosLiberados || [];

    if (eds.length === 0) return null;

    if (eds.length === 1) {
      return (
        <div className="flex justify-center items-center h-full">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 120 }}
            style={{ transform: "scale(1.05)" }}
          >
            {Localizador(eds[0])}
          </motion.div>
        </div>
      );
    }

    if (eds.length === 2) {
      return (
        <div className="flex justify-center items-center gap-4 h-full">
          {eds.map((nome, i) => (
            <motion.div
              key={nome}
              initial={{ scale: 0.8, opacity: 0, x: i === 0 ? -20 : 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08, type: "spring", stiffness: 120 }}
            >
              {Localizador(nome)}
            </motion.div>
          ))}
        </div>
      );
    }

    if (eds.length === 3) {
      return (
        <div className="flex justify-center items-center gap-3 h-full">
          {eds.map((nome, i) => (
            <motion.div
              key={nome}
              initial={{ scale: 0.75, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.07, type: "spring", stiffness: 120 }}
              style={{ transform: "scale(0.92)" }}
            >
              {Localizador(nome)}
            </motion.div>
          ))}
        </div>
      );
    }

    // 4+ cards: scroll horizontal com escala menor
    return (
      <div
        className="flex items-center gap-3 h-full overflow-x-auto pb-1 scrollbar-custom"
        style={{ scrollbarWidth: "thin" }}
      >
        {eds.map((nome, i) => (
          <motion.div
            key={nome}
            initial={{ scale: 0.7, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.06 + i * 0.06, type: "spring", stiffness: 110 }}
            style={{ transform: "scale(0.82)", flexShrink: 0 }}
          >
            {Localizador(nome)}
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full pb-[24px]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{
          background: jaComprado
            ? `linear-gradient(135deg, ${setorInfo.cor1}CC 0%, ${setorInfo.cor2}99 50%, ${setorInfo.cor1}CC 100%)`
            : `linear-gradient(135deg, ${setorInfo.cor1} 0%, ${setorInfo.cor2} 40%, ${setorInfo.cor3}55 100%)`,
          border: jaComprado
            ? `1.5px solid ${setorInfo.cor3}66`
            : `1.5px solid ${setorInfo.cor4}44`,
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: jaComprado
            ? `0 4px 24px ${setorInfo.cor1}88`
            : `0 8px 32px ${setorInfo.cor1}99`,
          position: "relative",
        }}
      >
        {/* Brilho decorativo de fundo */}
        <div style={{
          position: "absolute", top: 0, right: 0,
          width: 300, height: 300,
          background: `radial-gradient(circle, ${setorInfo.cor4}18 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />

        {/* ── HEADER ─────────────────────────────── */}
        <div
          style={{
            background: `linear-gradient(90deg, ${setorInfo.cor1} 0%, ${setorInfo.cor2} 100%)`,
            borderBottom: `1px solid ${setorInfo.cor3}44`,
            padding: "12px 16px",
            display: "flex", alignItems: "center", gap: 14,
          }}
        >
          {/* Ícone da licença */}
          <div style={{
            width: 52, height: 52, borderRadius: 14, flexShrink: 0,
            background: `linear-gradient(135deg, ${setorInfo.cor3} 0%, ${setorInfo.cor1} 100%)`,
            border: `2px solid ${setorInfo.cor4}55`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 0 16px ${setorInfo.cor4}44`,
          }}>
            <img
              src={getImageUrl(nomeLicença)}
              alt=""
              style={{ width: "65%", height: "65%", objectFit: "contain" }}
            />
          </div>

          {/* Nome + badge de qtd de cards */}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h2 style={{
                color: "#fff", fontSize: 18, fontWeight: 800,
                fontFamily: "'Rajdhani', sans-serif", letterSpacing: ".04em",
                textTransform: "uppercase",
              }}>
                {nomeLicença}
              </h2>
              {/* Badge: quantos edifícios libera */}
              <span style={{
                background: jaComprado ? `${setorInfo.cor3}` : `${setorInfo.cor4}`,
                color: "#fff", fontSize: 10, fontWeight: 700,
                padding: "2px 9px", borderRadius: 20,
                letterSpacing: ".08em", textTransform: "uppercase",
                boxShadow: `0 2px 8px ${setorInfo.cor4}55`,
              }}>
                {jaComprado ? "✓ Desbloqueado" : `${qtdCards} edifício${qtdCards !== 1 ? "s" : ""}`}
              </span>
            </div>
            <p style={{
              color: `${setorInfo.cor4}CC`, fontSize: 11,
              fontFamily: "'Rajdhani', sans-serif", letterSpacing: ".06em",
              marginTop: 2,
            }}>
              {jaComprado ? "Todos os edifícios desta licença estão ativos" : "Compre para desbloquear os edifícios abaixo"}
            </p>
          </div>

          {/* Valor + botão comprar lado direito do header */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "rgba(0,0,0,.25)", borderRadius: 8, padding: "4px 10px",
            }}>
              <img src={DolarImg} style={{ height: 14 }} alt="" />
              <span style={{
                fontFamily: "'Rajdhani', sans-serif", fontSize: 15, fontWeight: 700,
                color: jaComprado ? `${setorInfo.cor4}` : (podeComprar ? "#fff" : "#ff9090"),
              }}>
                {jaComprado ? "Pago" : formatarNumero(licenca.valor)}
              </span>
            </div>
            <button
              onClick={comprarLicença}
              disabled={jaComprado || !podeComprar}
              style={{
                padding: "7px 20px", borderRadius: 10, border: "none",
                fontFamily: "'Rajdhani', sans-serif", fontSize: 13, fontWeight: 700,
                letterSpacing: ".06em", textTransform: "uppercase", cursor: jaComprado || !podeComprar ? "not-allowed" : "pointer",
                background: jaComprado
                  ? `${setorInfo.cor3}88`
                  : podeComprar
                  ? `linear-gradient(135deg, ${setorInfo.cor3}, ${setorInfo.cor4})`
                  : "rgba(255,255,255,.1)",
                color: jaComprado ? `${setorInfo.cor4}` : podeComprar ? "#fff" : "rgba(255,255,255,.3)",
                boxShadow: jaComprado || !podeComprar ? "none" : `0 4px 16px ${setorInfo.cor4}55`,
                transition: "all .2s",
                opacity: !podeComprar && !jaComprado ? 0.5 : 1,
              }}
            >
              {jaComprado ? "✓ Comprado" : podeComprar ? "Comprar licença" : "Saldo insuficiente"}
            </button>
          </div>
        </div>

        {/* ── CORPO: cartas + descrição ─────────────────────── */}
        <div style={{ display: "flex", minHeight: 0 }}>

          {/* ÁREA DAS CARTAS ─ ocupa ~75% */}
          <div
            style={{
              flex: "0 0 75%",
              padding: "18px 16px 18px 16px",
              position: "relative",
              minHeight: qtdCards <= 2 ? 360 : qtdCards <= 3 ? 340 : 360,
            }}
          >
            {/* Linha de "desbloqueio" decorativa */}
            {!jaComprado && (
              <div style={{
                position: "absolute", inset: 0, zIndex: 2,
                background: `linear-gradient(180deg, transparent 0%, ${setorInfo.cor1}22 100%)`,
                borderRadius: "0 0 0 20px",
                pointerEvents: "none",
              }} />
            )}

            {/* Overlay de cadeado se não comprado */}
            {!jaComprado && (
              <div style={{
                position: "absolute", top: 10, left: 12,
                background: "rgba(0,0,0,.55)", backdropFilter: "blur(2px)",
                borderRadius: 8, padding: "3px 10px",
                display: "flex", alignItems: "center", gap: 5,
                zIndex: 10,
              }}>
                <span style={{ fontSize: 12 }}>🔒</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,.6)", letterSpacing: ".1em", textTransform: "uppercase" }}>
                  Bloqueado
                </span>
              </div>
            )}
            {jaComprado && (
              <div style={{
                position: "absolute", top: 10, left: 12,
                background: `${setorInfo.cor3}CC`,
                borderRadius: 8, padding: "3px 10px",
                display: "flex", alignItems: "center", gap: 5,
                zIndex: 10,
              }}>
                <span style={{ fontSize: 12 }}>🔓</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", letterSpacing: ".1em", textTransform: "uppercase" }}>
                  Desbloqueado
                </span>
              </div>
            )}

            {/* Cards com filtro se bloqueado */}
            <div style={{
              height: "100%", paddingTop: 36,
              filter: jaComprado ? "none" : "brightness(0.65) saturate(0.7)",
              transition: "filter .4s ease",
            }}>
              {renderCards()}
            </div>

            {/* Animação de desbloqueio */}
            <AnimatePresence>
              {unlockAnim && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.4 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    position: "absolute", inset: 0, zIndex: 20,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: `radial-gradient(circle, ${setorInfo.cor4}66 0%, transparent 70%)`,
                    pointerEvents: "none",
                    borderRadius: "0 0 0 20px",
                  }}
                >
                  <span style={{ fontSize: 64 }}>🔓</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ÁREA DA DESCRIÇÃO ─ ocupa ~25% */}
          <div style={{
            flex: "0 0 25%",
            background: `linear-gradient(180deg, ${setorInfo.cor1}CC 0%, ${setorInfo.cor1} 100%)`,
            borderLeft: `1px solid ${setorInfo.cor3}33`,
            padding: "16px 14px",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            gap: 12,
          }}>

            {/* Título seção */}
            <div>
              <div style={{
                fontSize: 9, fontWeight: 700, letterSpacing: ".18em",
                textTransform: "uppercase", color: `${setorInfo.cor4}99`,
                marginBottom: 8,
              }}>
                Sobre esta licença
              </div>

              {/* Descrição */}
              <p style={{
                fontSize: 12, color: "rgba(255,255,255,.75)",
                lineHeight: 1.65, fontFamily: "'Rajdhani', sans-serif",
              }}>
                {licenca.desc}
              </p>
            </div>

            {/* Lista de edifícios liberados */}
            <div>
              <div style={{
                fontSize: 9, fontWeight: 700, letterSpacing: ".18em",
                textTransform: "uppercase", color: `${setorInfo.cor4}99`,
                marginBottom: 8,
              }}>
                Edifícios desbloqueados
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {(licenca.edifíciosLiberados || []).map((nome) => (
                  <div key={nome} style={{
                    display: "flex", alignItems: "center", gap: 7,
                    background: jaComprado ? `${setorInfo.cor3}33` : "rgba(255,255,255,.06)",
                    borderRadius: 7, padding: "5px 8px",
                    border: `1px solid ${jaComprado ? setorInfo.cor3 + "55" : "rgba(255,255,255,.08)"}`,
                  }}>
                    <img
                      src={getImageUrl(nome)}
                      alt=""
                      style={{ width: 20, height: 20, objectFit: "contain", opacity: jaComprado ? 1 : 0.5 }}
                    />
                    <span style={{
                      fontSize: 10, fontWeight: 600,
                      color: jaComprado ? "#fff" : "rgba(255,255,255,.45)",
                      fontFamily: "'Rajdhani', sans-serif",
                      letterSpacing: ".03em",
                      textDecoration: "none",
                    }}>
                      {nome}
                    </span>
                    {jaComprado && (
                      <span style={{ marginLeft: "auto", fontSize: 10, color: setorInfo.cor4 }}>✓</span>
                    )}
                    {!jaComprado && (
                      <span style={{ marginLeft: "auto", fontSize: 9, color: "rgba(255,255,255,.25)" }}>🔒</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Rodapé: valor repetido + botão secundário */}
            <div style={{
              background: "rgba(0,0,0,.3)", borderRadius: 10,
              padding: "10px 12px",
              border: `1px solid ${setorInfo.cor3}33`,
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,.4)", letterSpacing: ".1em", textTransform: "uppercase" }}>
                  Valor
                </span>
                <span style={{
                  fontFamily: "'Rajdhani', sans-serif", fontSize: 18, fontWeight: 800,
                  color: jaComprado ? setorInfo.cor4 : (podeComprar ? "#fff" : "#ff9090"),
                }}>
                  {jaComprado ? "—" : formatarNumero(licenca.valor)}
                </span>
              </div>
              <button
                onClick={comprarLicença}
                disabled={jaComprado || !podeComprar}
                style={{
                  width: "100%", padding: "8px 0", borderRadius: 8, border: "none",
                  fontFamily: "'Rajdhani', sans-serif", fontSize: 13, fontWeight: 700,
                  letterSpacing: ".06em", textTransform: "uppercase",
                  cursor: jaComprado || !podeComprar ? "not-allowed" : "pointer",
                  background: jaComprado
                    ? "rgba(255,255,255,.1)"
                    : podeComprar
                    ? `linear-gradient(135deg, ${setorInfo.cor3}, ${setorInfo.cor4})`
                    : "rgba(255,255,255,.06)",
                  color: jaComprado ? "rgba(255,255,255,.4)" : podeComprar ? "#fff" : "rgba(255,255,255,.25)",
                  boxShadow: jaComprado || !podeComprar ? "none" : `0 4px 16px ${setorInfo.cor4}44`,
                  transition: "all .2s",
                }}
              >
                {jaComprado ? "✓ Já adquirida" : podeComprar ? "🔓 Desbloquear" : "Saldo insuficiente"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function getBotaoCompraLicenStyle({ status, podeComprar }) {
  if (status) return { backgroundColor: "#fff", color: "#6411D9", border: "2px solid #6411D9", borderRadius: "8px", fontWeight: 600, cursor: "default", opacity: 1 };
  return { backgroundColor: "#6411D9", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, cursor: podeComprar ? "pointer" : "not-allowed", opacity: podeComprar ? 1 : 0.4 };
}