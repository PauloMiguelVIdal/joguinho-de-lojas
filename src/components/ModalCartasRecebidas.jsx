// ModalCartasRecebidas.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LocalizadorUpgrade } from "./LocalizadorUpgrade";

// ─── COMPONENTE DE EXIBIÇÃO DE CARTAS ──────────────────────
const CartaRevelada = ({ nome, index, total }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 150 + index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3, y: 80, rotate: -10 }}
      animate={isVisible ? { opacity: 1, scale: 1, y: 0, rotate: 0 } : {}}
      transition={{ duration: 0.5, type: "spring", stiffness: 350, damping: 18 }}
      className="relative"
    >
      {LocalizadorUpgrade(nome, 0, 0)}
    </motion.div>
  );
};

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────
export const ModalCartasRecebidas = ({ isOpen, onClose, cartas }) => {
  if (!isOpen) return null;

  // Determina cores baseado na quantidade de cartas (efeito visual)
  const getCorDestaque = () => {
    if (cartas.length >= 5) return "#FFD700"; // Dourado para muitas cartas
    if (cartas.length >= 3) return "#8B00FF"; // Roxo para médias
    return "#6A00FF"; // Roxo padrão
  };

  const corDestaque = getCorDestaque();

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: `radial-gradient(ellipse at 50% 30%, #1a0a3b 0%, #07070f 80%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        padding: 32,
      }}
    >
      {/* Gradiente de fundo premium */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 20%, ${corDestaque}11, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Anel decorativo pulsante */}
      <motion.div
        style={{
          position: "absolute",
          width: "60%",
          height: "60%",
          borderRadius: "50%",
          border: `2px solid ${corDestaque}22`,
          pointerEvents: "none",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Conteúdo Principal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 30 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "900px",
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            marginBottom: 4,
          }}>
            <span style={{ fontSize: 36 }}>🎉</span>
            <h1 style={{
              color: "#fff",
              fontSize: 28,
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              textShadow: `0 0 60px ${corDestaque}44`,
              letterSpacing: "0.02em",
            }}>
              Cartas Recebidas!
            </h1>
          </div>
          <p style={{
            color: `${corDestaque}88`,
            fontSize: 14,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            marginTop: 4,
          }}>
            {cartas.length} carta(s) adicionada(s) ao seu inventário
          </p>
        </motion.div>

        {/* CARTAS - SEM SCROLL */}
        <motion.div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            padding: "0 20px",
          }}
        >
          {cartas.map((carta, index) => (
            <motion.div
              key={`${carta}-${index}`}
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                delay: 0.15 + index * 0.12,
                duration: 0.5,
                type: "spring",
                stiffness: 300,
                damping: 18,
              }}
              whileHover={{
                y: -8,
                boxShadow: `0 16px 60px ${corDestaque}55`,
              }}
              style={{
                cursor: "pointer",
                transition: "all 0.3s ease",
                flexShrink: 0,
              }}
            >
              {LocalizadorUpgrade(carta, 0, 0)}
            </motion.div>
          ))}
        </motion.div>

        {/* BOTÃO */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{
            scale: 1.05,
            boxShadow: `0 8px 40px ${corDestaque}55`,
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          style={{
            marginTop: 16,
            padding: "14px 48px",
            borderRadius: 30,
            border: `2px solid ${corDestaque}44`,
            background: `linear-gradient(135deg, ${corDestaque} 0%, ${corDestaque}cc 100%)`,
            color: "#fff",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
            transition: "all 0.3s ease",
            boxShadow: `0 4px 20px ${corDestaque}33`,
          }}
        >
          Entendido ✓
        </motion.button>
      </motion.div>
    </div>
  );
};