// components/ModalSetorSelection.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SETORES_ARR = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

const ICONES_SETORES = {
  agricultura: "🌾",
  tecnologia: "💻",
  comercio: "🛒",
  industria: "🏭",
  imobiliario: "🏢",
  energia: "⚡"
};

const NOMES_SETORES = {
  agricultura: "Agricultura",
  tecnologia: "Tecnologia",
  comercio: "Comércio",
  industria: "Indústria",
  imobiliario: "Imobiliário",
  energia: "Energia"
};

const CORES_SETORES = {
  agricultura: "#0C9123",
  tecnologia: "#FF6F00",
  comercio: "#E60000",
  industria: "#808080",
  imobiliario: "#3333CC",
  energia: "#E6B800"
};

// ─── DESCRIÇÃO DOS OBJETIVOS POR SETOR ──────────────────────────
const OBJETIVOS_DESCRICAO = {
  agricultura: "🌾 Objetivos: Colete 4, 7 e 10 edifícios diferentes",
  tecnologia: "💻 Objetivos: Colete 6, 10 e 14 edifícios diferentes",
  comercio: "🛒 Objetivos: Colete 7, 10 e 15 edifícios diferentes",
  industria: "🏭 Objetivos: Colete 8, 12 e 18 edifícios diferentes",
  imobiliario: "🏢 Objetivos: Colete 4, 7 e 10 edifícios diferentes",
  energia: "⚡ Objetivos: Colete 4, 7 e 10 edifícios diferentes"
};

// ─── DICAS ESTRATÉGICAS ──────────────────────────────────────────
const DICAS_ESTRATEGICAS = [
  "🎯 Foque em um único setor para completar os objetivos mais rápido!",
  "📈 Priorize cartas com alto Faturamento Mensal para maximizar seus lucros.",
  "⚡ Power-ups acumulam e podem turbinar seus outros edifícios.",
  "🏆 Cartas de Rank S são raras e valiosas - priorize-as!",
  "🔄 Diversificar com cartas que dão power-ups gera sinergias poderosas."
];

export const ModalSetorSelection = ({ isOpen, onClose, onSelect }) => {
  const [setoresSorteados, setSetoresSorteados] = useState([]);
  const [setorSelecionado, setSetorSelecionado] = useState(null);
  const [animando, setAnimando] = useState(false);
  const [dicaAtual, setDicaAtual] = useState(0);

  // Sorteia 3 setores aleatórios quando o modal abre
  useEffect(() => {
    if (isOpen) {
      setAnimando(true);
      // Embaralha os setores e pega os 3 primeiros
      const shuffled = [...SETORES_ARR].sort(() => Math.random() - 0.5);
      const sorteados = shuffled.slice(0, 3);
      setSetoresSorteados(sorteados);
      setSetorSelecionado(null);
      
      // Animação de entrada - reduzido para 200ms
      setTimeout(() => setAnimando(false), 200);

      // Rotação de dicas - mudança mais rápida (3 segundos)
      const interval = setInterval(() => {
        setDicaAtual(prev => (prev + 1) % DICAS_ESTRATEGICAS.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handleSelect = (setor) => {
    setSetorSelecionado(setor);
    setAnimando(true);
    
    setTimeout(() => {
      setAnimando(false);
      if (onSelect) {
        onSelect(setor);
      }
      if (onClose) {
        onClose();
      }
    }, 400); // Reduzido de 800ms para 400ms
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "rgba(7, 7, 15, 0.92)",
        backdropFilter: "blur(12px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
      }}
    >
      {/* Fundo gradiente */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 30%, #6A00FF11, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Anel decorativo - animação mais rápida */}
      <motion.div
        style={{
          position: "absolute",
          width: "70%",
          height: "70%",
          borderRadius: "50%",
          border: "2px solid #6A00FF22",
          pointerEvents: "none",
        }}
        animate={{
          scale: [1, 1.03, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Conteúdo principal - animação mais rápida */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "800px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Header - delay reduzido */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "4px",
            }}
          >
            <span style={{ fontSize: "36px" }}>🎯</span>
            <h1
              style={{
                color: "#fff",
                fontSize: "28px",
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                textShadow: "0 0 60px #6A00FF44",
                letterSpacing: "0.02em",
              }}
            >
              Escolha seu Setor
            </h1>
          </div>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "14px",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Selecione um dos setores sorteados para definir seus objetivos
          </p>
        </motion.div>

        {/* ─── DICAS ROTATIVAS ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{
            width: "100%",
            maxWidth: "600px",
            background: "rgba(106, 0, 255, 0.1)",
            border: "1px solid rgba(106, 0, 255, 0.2)",
            borderRadius: "10px",
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={{ fontSize: "18px" }}>💡</span>
          <div
            style={{
              flex: 1,
              color: "rgba(255,255,255,0.8)",
              fontSize: "13px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={dicaAtual}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                style={{ display: "block" }}
              >
                {DICAS_ESTRATEGICAS[dicaAtual]}
              </motion.span>
            </AnimatePresence>
          </div>
          <div
            style={{
              display: "flex",
              gap: "4px",
            }}
          >
            {DICAS_ESTRATEGICAS.map((_, index) => (
              <div
                key={index}
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: index === dicaAtual ? "#6A00FF" : "rgba(255,255,255,0.2)",
                  transition: "all 0.2s ease",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Cards dos setores sorteados - animação mais rápida */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {setoresSorteados.map((setor, index) => {
            const cor = CORES_SETORES[setor] || "#6A00FF";
            const isSelected = setorSelecionado === setor;

            return (
              <motion.button
                key={setor}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{
                  opacity: 1,
                  scale: isSelected ? 0.95 : 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.1 + index * 0.08,
                  duration: 0.25,
                  type: "spring",
                  stiffness: 350,
                  damping: 25,
                }}
                whileHover={{
                  scale: isSelected ? 0.95 : 1.03,
                  boxShadow: `0 8px 32px ${cor}33`,
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => !isSelected && handleSelect(setor)}
                disabled={isSelected || animando}
                style={{
                  flex: "1",
                  minWidth: "160px",
                  maxWidth: "220px",
                  padding: "20px 16px",
                  borderRadius: "16px",
                  background: isSelected
                    ? `linear-gradient(135deg, ${cor}, ${cor}dd)`
                    : "rgba(255,255,255,0.06)",
                  border: isSelected
                    ? `2px solid ${cor}`
                    : "2px solid rgba(255,255,255,0.1)",
                  cursor: isSelected || animando ? "default" : "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: isSelected
                    ? `0 4px 24px ${cor}33`
                    : "none",
                }}
              >
                <span style={{ fontSize: "36px" }}>{ICONES_SETORES[setor]}</span>
                <span
                  style={{
                    color: isSelected ? "#fff" : "rgba(255,255,255,0.9)",
                    fontSize: "16px",
                    fontWeight: 700,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {NOMES_SETORES[setor]}
                </span>
                
                {/* ─── DESCRIÇÃO DOS OBJETIVOS ────────────────────── */}
                <div
                  style={{
                    fontSize: "10px",
                    color: isSelected ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.5)",
                    fontFamily: "'Inter', sans-serif",
                    textAlign: "center",
                    lineHeight: 1.3,
                    marginTop: "2px",
                    padding: "0 4px",
                    minHeight: "28px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {OBJETIVOS_DESCRICAO[setor]}
                </div>

                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      background: "rgba(255,255,255,0.2)",
                      padding: "2px 12px",
                      borderRadius: "10px",
                      fontSize: "11px",
                      color: "#fff",
                      fontWeight: 600,
                    }}
                  >
                    ✅ Selecionado
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Footer com dica adicional - delay reduzido */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2px",
            marginTop: "4px",
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: "12px",
              fontFamily: "'Inter', sans-serif",
              textAlign: "center",
            }}
          >
            💡 O setor escolhido definirá os objetivos que você irá perseguir
          </span>
          <span
            style={{
              color: "rgba(255,255,255,0.2)",
              fontSize: "10px",
              fontFamily: "'Inter', sans-serif",
              textAlign: "center",
            }}
          >
            🏆 Complete os objetivos na aba da direita para ganhar recompensas exclusivas!
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};