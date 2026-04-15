import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCentralStore } from "../stores/useCentralStore";
import DolarImg from "../../public/outrasImagens/simbolo-do-dolar.png";
import limitar from "../../public/outrasImagens/limite.png";
import soma from "../../public/outrasImagens/Soma.png";
import setoresImg from "../../public/outrasImagens/setores.png";
import diversidade from "../../public/outrasImagens/diversidade.png";
import upInterpriseAudio from "../../public/sounds/upInterpriseAudio.mp3";
import useSound from "use-sound";

// Paleta roxa fixa para licenças empresariais
const COR = {
  bg: "#0d0820",
  c1: "#1a0d40",
  c2: "#2d1470",
  c3: "#4C14A9",
  c4: "#7B2FFF",
  c5: "#934CFF",
  gold: "#FFD700",
  goldD: "#b8870b",
  text: "#e8d8ff",
  muted: "rgba(200,170,255,.45)",
};

// Ícone de cadeado animado
function LockIcon({ locked }) {
  return (
    <motion.div
      animate={{ scale: locked ? [1, 1.08, 1] : 1 }}
      transition={{ repeat: locked ? Infinity : 0, duration: 2.5 }}
      style={{
        width: 36, height: 36, borderRadius: "50%",
        background: locked
          ? "rgba(255,255,255,.08)"
          : `linear-gradient(135deg, ${COR.c3}, ${COR.c5})`,
        border: `2px solid ${locked ? "rgba(255,255,255,.15)" : COR.c5}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 16, flexShrink: 0,
        boxShadow: locked ? "none" : `0 0 16px ${COR.c5}66`,
      }}
    >
      {locked ? "🔒" : "✓"}
    </motion.div>
  );
}

// Bolinha de slot de carteira
function SlotBall({ filled, isNew }) {
  return (
    <motion.div
      initial={isNew ? { scale: 0, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      style={{
        width: 22, height: 22, borderRadius: "50%",
        background: filled
          ? `linear-gradient(135deg, ${COR.c4}, ${COR.c5})`
          : "rgba(255,255,255,.1)",
        border: `2px solid ${filled ? COR.c5 : "rgba(255,255,255,.2)"}`,
        boxShadow: filled ? `0 0 10px ${COR.c5}88` : "none",
        flexShrink: 0,
      }}
    />
  );
}

// Métrica individual
// Substitua o componente Metrica por este:

function Metrica({ icon, label, value, highlight, desc }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column",
      flex: 1,
      background: "rgba(0,0,0,.25)",
      border: `1px solid rgba(255,255,255,.1)`,
      borderRadius: 12, padding: "10px 10px",
      gap: 6,
    }}>
      {/* Topo: ícone + valor */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <img src={icon} style={{ height: 18, width: 18, objectFit: "contain", opacity: .7 }} alt="" />
        <span style={{
          fontFamily: "'Rajdhani',sans-serif", fontSize: 26, fontWeight: 800,
          color: highlight ? COR.gold : "#fff", lineHeight: 1,
        }}>
          {value}
        </span>
      </div>

      {/* Label */}
      <span style={{
        fontSize: 8, color: COR.muted, textTransform: "uppercase",
        letterSpacing: ".12em", fontWeight: 700,
      }}>
        {label}
      </span>

      {/* Divisor */}
      <div style={{ height: 1, background: "rgba(255,255,255,.07)", margin: "2px 0" }} />

      {/* Descrição */}
      <p style={{
        fontSize: 10, color: "rgba(255,255,255,.45)",
        lineHeight: 1.6, margin: 0,
        fontFamily: "'Rajdhani',sans-serif",
      }}>
        {desc}
      </p>
    </div>
  );
}

export const BusinessLicence = ({ setor, nomeLicenca, index }) => {
  // const { dados } = useContext(CentraldeDadosContext);
  const { economiaSetores, setEconomiaSetores } = useContext(DadosEconomyGlobalContext);
  const [buttonUpInterpriseAudio] = useSound(upInterpriseAudio);
  const [unlocking, setUnlocking] = useState(false);

  const nivelEmpresa = economiaSetores.porteEmpresa[index];
  const anteriorComprado = index === 0 || economiaSetores.porteEmpresa[index - 1]?.status === true;
  const jaComprado = nivelEmpresa.status === true;
  const podeComprar = anteriorComprado && !jaComprado && economiaSetores.saldo >= nivelEmpresa.custoUpgrade;
  const bloqueadoPorOrdem = !anteriorComprado && !jaComprado;

  // Quantos slots de carteira este nível adiciona
  // index 0 = base (já tem 1), index N = +1 cada
  // Mapeamos: índice 0 → 1 slot base, índice 2 (Companhia Local) → +1, índice 4 (Corp Multisetorial) → +1 (máx 3)
  const SLOT_BONUS = { 0: 0, 1: 0, 2: 1, 3: 0, 4: 1 };
  const slotBonus = SLOT_BONUS[index] ?? 0;

  // Calcula slots totais desbloqueados até agora
  const slotsAtivos = 1 + economiaSetores.porteEmpresa.slice(0, index + 1).reduce((acc, n, i) => {
    return acc + (n.status ? (SLOT_BONUS[i] ?? 0) : 0);
  }, 0);

  const MAX_SLOTS = 3;

  const formatarNumero = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(1).replace(".0", "") + "T";
    if (num >= 1e9) return (num / 1e9).toFixed(1).replace(".0", "") + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(1).replace(".0", "") + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1).replace(".0", "") + "K";
    return String(num);
  };

  const comprarLicenca = () => {
    if (!podeComprar) return;

    buttonUpInterpriseAudio();
    setUnlocking(true);
    setTimeout(() => setUnlocking(false), 1400);

    const prev = economiaSetores;

    const novoArray = prev.porteEmpresa.map((n, i) =>
      i === index ? { ...n, status: true } : n
    );

    const nivel = novoArray[index];

    setEconomiaSetores({
      ...prev,
      saldo: prev.saldo - nivel.custoUpgrade,
      centralEdificios: {
        ...prev.centralEdificios,
        classificacaoPorteEmpresa: nivel.nome,
        quantidadeUnicoMax: nivel.edificiosUnicosMax,
        quantidadeSetoresMax: nivel.qtdMaxSetores,
        quantidadeDiversosEdificiosMax: nivel.qtdMaxDiversificar,
        quantidadeEdificiosMax: nivel.totalMaxEdificios,
      },
      porteEmpresa: novoArray,
    });
  };

  // Gradiente de fundo do card por estado
  const cardBg = jaComprado
    ? `linear-gradient(135deg, ${COR.c1}EE 0%, ${COR.c2}88 100%)`
    : bloqueadoPorOrdem
      ? `linear-gradient(135deg, #0a0a14 0%, #12101e 100%)`
      : `linear-gradient(135deg, ${COR.c1} 0%, ${COR.c2}CC 50%, ${COR.c3}22 100%)`;

  const cardBorder = jaComprado
    ? `1.5px solid ${COR.c5}66`
    : bloqueadoPorOrdem
      ? `1.5px solid rgba(255,255,255,.06)`
      : `1.5px solid ${COR.c4}55`;

  return (
    <div className="w-full pb-[20px]">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          background: cardBg,
          border: cardBorder,
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: jaComprado
            ? `0 4px 24px ${COR.c3}44`
            : bloqueadoPorOrdem
              ? "none"
              : `0 8px 32px ${COR.c3}66`,
          position: "relative",
          filter: bloqueadoPorOrdem ? "brightness(0.55)" : "none",
          transition: "filter .3s",
        }}
      >
        {/* Glow decorativo */}
        {!bloqueadoPorOrdem && (
          <div style={{
            position: "absolute", top: -60, right: -60,
            width: 220, height: 220,
            background: `radial-gradient(circle, ${COR.c5}22 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />
        )}

        {/* ── HEADER ─────────────────────────────────────── */}
        <div style={{
          background: jaComprado
            ? `linear-gradient(90deg, ${COR.c2} 0%, ${COR.c3}88 100%)`
            : bloqueadoPorOrdem
              ? "rgba(255,255,255,.04)"
              : `linear-gradient(90deg, ${COR.c2} 0%, ${COR.c3} 100%)`,
          borderBottom: `1px solid ${COR.c4}33`,
          padding: "12px 18px",
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <LockIcon locked={!jaComprado} />

          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <h2 style={{
                color: jaComprado ? COR.c5 : "#fff",
                fontSize: 18, fontWeight: 800,
                fontFamily: "'Rajdhani', sans-serif",
                letterSpacing: ".04em", textTransform: "uppercase",
              }}>
                {nivelEmpresa.nome}
              </h2>

              {/* Badge estado */}
              <span style={{
                fontSize: 9, fontWeight: 700, padding: "2px 10px",
                borderRadius: 20, letterSpacing: ".1em", textTransform: "uppercase",
                background: jaComprado
                  ? `${COR.c5}33`
                  : bloqueadoPorOrdem
                    ? "rgba(255,255,255,.06)"
                    : `${COR.c4}33`,
                color: jaComprado ? COR.c5 : bloqueadoPorOrdem ? "rgba(255,255,255,.3)" : COR.c5,
                border: `1px solid ${jaComprado ? COR.c5 + "55" : bloqueadoPorOrdem ? "rgba(255,255,255,.1)" : COR.c4 + "44"}`,
              }}>
                {jaComprado ? "✓ Ativo" : bloqueadoPorOrdem ? "🔒 Bloqueado" : "Disponível"}
              </span>

              {/* Badge de slot de carteira (só para quem dá bônus) */}
              {slotBonus > 0 && (
                <span style={{
                  fontSize: 9, fontWeight: 700, padding: "2px 10px",
                  borderRadius: 20, letterSpacing: ".1em", textTransform: "uppercase",
                  background: jaComprado ? `${COR.gold}22` : `${COR.gold}18`,
                  color: COR.gold, border: `1px solid ${COR.gold}44`,
                }}>
                  🃏 +{slotBonus} slot de cartão
                </span>
              )}
            </div>

            {bloqueadoPorOrdem && (
              <p style={{ fontSize: 10, color: "rgba(255,255,255,.3)", marginTop: 2, fontFamily: "'Rajdhani',sans-serif", letterSpacing: ".05em" }}>
                Compre a licença anterior para desbloquear
              </p>
            )}
          </div>

          {/* Valor + botão */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "rgba(0,0,0,.3)", borderRadius: 8, padding: "4px 12px",
            }}>
              <img src={DolarImg} style={{ height: 14 }} alt="" />
              <span style={{
                fontFamily: "'Rajdhani',sans-serif", fontSize: 16, fontWeight: 800,
                color: jaComprado ? COR.muted : podeComprar ? "#fff" : "#ff9090",
              }}>
                {jaComprado ? "Pago" : formatarNumero(nivelEmpresa.custoUpgrade)}
              </span>
            </div>
            <button
              onClick={comprarLicenca}
              disabled={!podeComprar}
              style={{
                padding: "7px 22px", borderRadius: 10, border: "none",
                fontFamily: "'Rajdhani',sans-serif", fontSize: 13, fontWeight: 700,
                letterSpacing: ".06em", textTransform: "uppercase",
                cursor: podeComprar ? "pointer" : "not-allowed",
                background: jaComprado
                  ? "rgba(255,255,255,.06)"
                  : podeComprar
                    ? `linear-gradient(135deg, ${COR.c3}, ${COR.c5})`
                    : "rgba(255,255,255,.06)",
                color: jaComprado ? "rgba(255,255,255,.3)" : podeComprar ? "#fff" : "rgba(255,255,255,.2)",
                boxShadow: podeComprar ? `0 4px 16px ${COR.c5}55` : "none",
                transition: "all .2s",
              }}
            >
              {jaComprado ? "✓ Adquirida" : bloqueadoPorOrdem ? "🔒 Bloqueada" : podeComprar ? "🚀 Evoluir" : "Saldo insuficiente"}
            </button>
          </div>
        </div>

        {/* ── CORPO ──────────────────────────────────────── */}
        <div style={{ display: "flex", minHeight: 0 }}>

          {/* MÉTRICAS ─ 75% */}
          <div style={{ flex: "0 0 75%", padding: "16px 18px", position: "relative" }}>

            {/* Slots de carteira */}
            <div style={{
              background: "rgba(0,0,0,.25)",
              border: `1px solid ${COR.c4}33`,
              borderRadius: 12, padding: "10px 14px",
              marginBottom: 14,
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
                <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".14em", color: COR.muted }}>
                  Slots de carteira ativos
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {Array.from({ length: MAX_SLOTS }).map((_, i) => (
                    <SlotBall
                      key={i}
                      filled={i < (jaComprado ? slotsAtivos : slotsAtivos - slotBonus)}
                      isNew={jaComprado && slotBonus > 0 && i === slotsAtivos - slotBonus}
                    />
                  ))}
                  <span style={{ fontSize: 11, color: COR.muted, marginLeft: 6 }}>
                    {jaComprado ? slotsAtivos : slotsAtivos - slotBonus}/{MAX_SLOTS} slots
                  </span>
                </div>
              </div>

              {slotBonus > 0 && (
                <div style={{
                  background: jaComprado ? `${COR.gold}22` : `${COR.gold}11`,
                  border: `1px solid ${COR.gold}44`, borderRadius: 10,
                  padding: "6px 12px", textAlign: "center", flexShrink: 0,
                }}>
                  <div style={{ fontSize: 18 }}>🃏</div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: COR.gold, letterSpacing: ".08em", textTransform: "uppercase" }}>
                    +{slotBonus} slot
                  </div>
                </div>
              )}

              {/* Explicação do sistema de slots */}
              <div style={{
                background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 8, padding: "6px 10px", maxWidth: 200, flexShrink: 0,
              }}>
                <p style={{ fontSize: 9, color: "rgba(255,255,255,.4)", lineHeight: 1.5, margin: 0 }}>
                  Cada slot permite acessar um painel de gestão diferente na carteira. Máx: 3 slots.
                </p>
              </div>
            </div>

            {/* Grid de métricas */}
            {/* Grid de métricas */}
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              <Metrica
                icon={limitar}
                label="Máx por tipo"
                value={nivelEmpresa.edificiosUnicosMax}
                highlight={false}
                desc={`Você pode ter no máximo ${nivelEmpresa.edificiosUnicosMax} unidade${nivelEmpresa.edificiosUnicosMax !== 1 ? "s" : ""} do mesmo edifício. Acima disso, a compra será bloqueada.`}
              />
              <Metrica
                icon={setoresImg}
                label="Setores"
                value={nivelEmpresa.qtdMaxSetores}
                highlight={false}
                desc={`Você pode operar em até ${nivelEmpresa.qtdMaxSetores} setor${nivelEmpresa.qtdMaxSetores !== 1 ? "es" : ""} simultaneamente. Diversifique com sabedoria.`}
              />
              <Metrica
                icon={diversidade}
                label="Tipos únicos"
                value={nivelEmpresa.qtdMaxDiversificar}
                highlight={false}
                desc={`Limite de ${nivelEmpresa.qtdMaxDiversificar} tipo${nivelEmpresa.qtdMaxDiversificar !== 1 ? "s" : ""} diferentes de edifícios na sua carteira. Quanto maior, mais estratégias disponíveis.`}
              />
              <Metrica
                icon={soma}
                label="Total edif."
                value={nivelEmpresa.totalMaxEdificios}
                highlight={true}
                desc={`Capacidade total de ${nivelEmpresa.totalMaxEdificios} edifício${nivelEmpresa.totalMaxEdificios !== 1 ? "s" : ""} no seu portfólio. Este é o limite absoluto da sua empresa neste nível.`}
              />
            </div>

            {/* Sequência obrigatória */}
            {bloqueadoPorOrdem && (
              <div style={{
                position: "absolute", inset: 0, borderRadius: "0 0 0 20px",
                background: "rgba(0,0,0,.45)", backdropFilter: "blur(3px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexDirection: "column", gap: 8, zIndex: 5,
              }}>
                <span style={{ fontSize: 36 }}>🔒</span>
                <span style={{
                  fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.5)",
                  letterSpacing: ".1em", textTransform: "uppercase",
                  fontFamily: "'Rajdhani',sans-serif",
                }}>
                  Compre a licença anterior primeiro
                </span>
              </div>
            )}

            {/* Animação de unlock */}
            <AnimatePresence>
              {unlocking && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    position: "absolute", inset: 0, zIndex: 20,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: `radial-gradient(circle, ${COR.c5}55 0%, transparent 70%)`,
                    pointerEvents: "none", borderRadius: "0 0 0 20px",
                  }}
                >
                  <span style={{ fontSize: 56 }}>🚀</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* DESCRIÇÃO ─ 25% */}
          <div style={{
            flex: "0 0 25%",
            background: `linear-gradient(180deg, ${COR.c1}EE 0%, ${COR.c2}88 100%)`,
            borderLeft: `1px solid ${COR.c4}22`,
            padding: "14px 12px",
            display: "flex", flexDirection: "column", gap: 12,
          }}>
            <div>
              <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: COR.muted, marginBottom: 6 }}>
                Sobre este nível
              </div>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,.7)", lineHeight: 1.65, fontFamily: "'Rajdhani',sans-serif" }}>
                {nivelEmpresa.descricao}
              </p>
            </div>

            {/* Linha de progresso de licenças */}
            <div>
              <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: COR.muted, marginBottom: 6 }}>
                Sequência de evolução
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {economiaSetores.porteEmpresa.map((n, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 6,
                    opacity: i > index ? 0.3 : 1,
                  }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                      background: n.status
                        ? `linear-gradient(135deg, ${COR.c4}, ${COR.c5})`
                        : i === index
                          ? `${COR.c4}55`
                          : "rgba(255,255,255,.1)",
                      boxShadow: n.status ? `0 0 8px ${COR.c5}66` : "none",
                    }} />
                    <span style={{
                      fontSize: 9, color: n.status ? COR.c5 : i === index ? "rgba(255,255,255,.7)" : "rgba(255,255,255,.3)",
                      fontFamily: "'Rajdhani',sans-serif", fontWeight: i === index ? 700 : 400,
                    }}>
                      {n.nome}
                    </span>
                    {n.status && <span style={{ fontSize: 8, color: COR.c5, marginLeft: "auto" }}>✓</span>}
                    {i === index && !n.status && <span style={{ fontSize: 8, color: "rgba(255,255,255,.4)", marginLeft: "auto" }}>←</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Valor + botão rodapé */}
            <div style={{
              background: "rgba(0,0,0,.3)", borderRadius: 10, padding: "10px 10px",
              border: `1px solid ${COR.c4}22`, marginTop: "auto",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 9, color: COR.muted, letterSpacing: ".1em", textTransform: "uppercase" }}>Custo</span>
                <span style={{
                  fontFamily: "'Rajdhani',sans-serif", fontSize: 17, fontWeight: 800,
                  color: jaComprado ? COR.muted : podeComprar ? "#fff" : "#ff9090",
                }}>
                  {jaComprado ? "—" : formatarNumero(nivelEmpresa.custoUpgrade)}
                </span>
              </div>
              <button
                onClick={comprarLicenca}
                disabled={!podeComprar}
                style={{
                  width: "100%", padding: "8px 0", borderRadius: 8, border: "none",
                  fontFamily: "'Rajdhani',sans-serif", fontSize: 12, fontWeight: 700,
                  letterSpacing: ".06em", textTransform: "uppercase",
                  cursor: podeComprar ? "pointer" : "not-allowed",
                  background: jaComprado
                    ? "rgba(255,255,255,.06)"
                    : podeComprar
                      ? `linear-gradient(135deg, ${COR.c3}, ${COR.c5})`
                      : "rgba(255,255,255,.06)",
                  color: jaComprado ? "rgba(255,255,255,.3)" : podeComprar ? "#fff" : "rgba(255,255,255,.2)",
                  boxShadow: podeComprar ? `0 4px 14px ${COR.c5}44` : "none",
                  transition: "all .2s",
                }}
              >
                {jaComprado ? "✓ Já adquirida" : bloqueadoPorOrdem ? "🔒 Bloqueada" : podeComprar ? "🚀 Evoluir empresa" : "Saldo insuficiente"}
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