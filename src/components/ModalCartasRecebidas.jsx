// ModalCartasRecebidas.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LocalizadorUpgrade } from "./LocalizadorUpgrade";

// ─── DETECTAR MOBILE ──────────────────────────────────────────────
function useDeviceDetection() {
    const [isMobile, setIsMobile] = useState(false);
    const [isLandscape, setIsLandscape] = useState(false);

    useEffect(() => {
        const checkDevice = () => {
            const mobile = window.innerHeight < 600;
            const landscape = window.innerWidth > window.innerHeight && mobile;
            setIsMobile(mobile);
            setIsLandscape(landscape);
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);
        window.addEventListener('orientationchange', () => {
            setTimeout(checkDevice, 300);
        });

        return () => {
            window.removeEventListener('resize', checkDevice);
            window.removeEventListener('orientationchange', checkDevice);
        };
    }, []);

    return { isMobile, isLandscape, isDesktop: !isMobile };
}

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
  const { isMobile, isLandscape, isDesktop } = useDeviceDetection();

  if (!isOpen) return null;

  // Determina cores baseado na quantidade de cartas (efeito visual)
  const getCorDestaque = () => {
    if (cartas.length >= 5) return "#FFD700"; // Dourado para muitas cartas
    if (cartas.length >= 3) return "#8B00FF"; // Roxo para médias
    return "#6A00FF"; // Roxo padrão
  };

  const corDestaque = getCorDestaque();

  // ─── CONFIGURAÇÕES RESPONSIVAS ──────────────────────────────
  const paddingModal = isMobile ? '16px' : '32px';
  const gapModal = isMobile ? '16px' : '28px';
  const maxWidthCards = isMobile ? '100%' : '900px';
  const cardGap = isMobile ? '8px' : '16px';
  const flexWrapCards = isMobile ? 'nowrap' : 'wrap';
  const overflowCards = isMobile ? 'auto' : 'visible';
  const justifyContentCards = isMobile ? 'center' : 'center';
  const paddingCards = isMobile ? '8px 0 4px 0' : '0 20px';
  const maxHeightCards = isMobile ? '55vh' : 'none';
  const fontSizeTitulo = isMobile ? '22px' : '28px';
  const fontSizeSubtitulo = isMobile ? '12px' : '14px';
  const paddingBotao = isMobile ? '10px 32px' : '14px 48px';
  const fontSizeBotao = isMobile ? '12px' : '14px';
  const gapConteudo = isMobile ? '12px' : '24px';
  const marginBottomBotao = isMobile ? '8px' : '0px';
  const tamanhoEmoji = isMobile ? '28px' : '36px';

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
        gap: gapModal,
        padding: paddingModal,
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
          width: isMobile ? "80%" : "60%",
          height: isMobile ? "80%" : "60%",
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
          maxWidth: maxWidthCards,
          maxHeight: '90vh',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: gapConteudo,
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        {/* HEADER */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          flexShrink: 0,
        }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              textAlign: "center",
              marginBottom: isMobile ? 4 : 8,
              padding: isMobile ? '0 8px' : 0,
              flexShrink: 0,
            }}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: isMobile ? 8 : 12,
              marginBottom: 4,
              flexWrap: 'wrap',
            }}>
              <span style={{ fontSize: tamanhoEmoji }}>🎉</span>
              <h1 style={{
                color: "#fff",
                fontSize: fontSizeTitulo,
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
              fontSize: fontSizeSubtitulo,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              marginTop: 4,
            }}>
              {cartas.length} carta(s) adicionada(s) ao seu inventário
            </p>
          </motion.div>

          {/* ─── CARTAS COM SCROLL ─── */}
          <div
            style={{
              display: "flex",
              gap: cardGap,
              flexDirection: 'row',
              flexWrap: flexWrapCards,
              justifyContent: justifyContentCards,
              alignItems: 'center',
              width: "100%",
              padding: paddingCards,
              overflowX: overflowCards,
              overflowY: 'hidden',
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: isMobile ? 'x mandatory' : 'none',
              maxHeight: maxHeightCards,
              flexShrink: 0,
              flexGrow: 0,
              scrollBehavior: 'auto',
              minHeight: isMobile ? 'auto' : 'auto',
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
                  flex: isMobile ? '0 0 auto' : '0 1 auto',
                  scrollSnapAlign: isMobile ? 'start' : 'none',
                }}
              >
                {LocalizadorUpgrade(carta, 0, 0)}
              </motion.div>
            ))}
          </div>

          {/* ─── INDICADOR DE SCROLL (mobile) ──── */}
          {isMobile && cartas.length > 1 && (
            <div style={{
              display: 'flex',
              gap: '6px',
              padding: '4px 0',
              justifyContent: 'center',
              alignItems: 'center',
              flexShrink: 0,
            }}>
              <span style={{
                fontSize: '10px',
                color: `${corDestaque}55`,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
              }}>
                ← Deslize para ver mais →
              </span>
            </div>
          )}
        </div>

        {/* ─── BOTÃO ENTENDIDO - SEMPRE VISÍVEL ── */}
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
            marginTop: isMobile ? 4 : 16,
            marginBottom: marginBottomBotao,
            padding: paddingBotao,
            borderRadius: 30,
            border: `2px solid ${corDestaque}44`,
            background: `linear-gradient(135deg, ${corDestaque} 0%, ${corDestaque}cc 100%)`,
            color: "#fff",
            fontSize: fontSizeBotao,
            fontWeight: 700,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
            transition: "all 0.3s ease",
            boxShadow: `0 4px 20px ${corDestaque}33`,
            flexShrink: 0,
            zIndex: 10,
            position: 'relative',
          }}
        >
          Entendido ✓
        </motion.button>
      </motion.div>
    </div>
  );
};