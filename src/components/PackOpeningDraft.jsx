// PackOpeningDraft.jsx
import React, { useState, useCallback, useContext, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LocalizadorUpgrade } from "./LocalizadorUpgrade";
import logo from '../../public/outrasImagens/logo Joguinho.png';
import { CentraldeDadosContext } from "../centralDeDadosContext";
import useSound from "use-sound";
import closeAudio from "../../public/sounds/closeAudio.mp3";
import newStageAudio from "../../public/sounds/newStageAudio.mp3";

// ── RANKS DOS EDIFÍCIOS ───────────────────────────────────────────
const RankS = [
    "Usina Hidrelétrica", "Reator Nuclear Convencional", "Usina De Fusão Nuclear",
    "Shopping Popular", "Shopping Center", "Fábrica De Computadores",
    "Construtora De Infraestruturas", "Aeroporto", "Porto", "Mineradora Radioativa",
    "Plataforma De Petróleo", "Montadora De Veículos Elétricos", "Fábrica De Automóveis",
    "Refinaria", "Fábrica De Chips", "Fábrica De Semicondutores", "Fábrica De Robôs",
    "Fábrica De Motores", "Fábrica De Foguetes", "Fábrica De Aeronaves"
];

const RankA = [
    "Cooperativa Agrícola", "Usina De Biomassa", "Transporte Petrolífero",
    "Marketplace Online", "Plataforma De Streaming", "Fábrica De Smartphones",
    "Fábrica De Consoles De Jogos", "Fábrica De Dispositivos Vestiveis",
    "Centro De Pesquisa Em Fusão Nuclear", "Centro De Pesquisa Aeroespacial",
    "Centro De Pesquisa Em Materiais", "Centro De Pesquisa Em IA",
    "Mineradora De Pedras Preciosas", "Mega Mercado", "Prédio De Alto Padrão",
    "Tanque De Armazenamento Biocombustível", "Fábrica De Plásticos",
    "Fábrica De Químicos Especializados", "Alto-Forno", "Usina Siderúrgica",
    "Fundição De Alumínio", "Fábrica De Ligas Metálicas", "Fábrica De Peças Automotivas",
    "Refinaria De Biocombustíveis", "Biofábrica", "Fábrica De Eletrônicos",
    "Empresa De Automação Industrial", "Estaleiro"
];

const RankB = [
    "Centro De Comércio De Plantações", "Empresa De Comércio Energético",
    "Empresa De Consultoria Energética", "Centro De Pesquisa Em Energias Renováveis",
    "Centro De Pesquisa Energética", "Usina Termelétrica A Biocombustíveis",
    "Usina De Biomassa", "Usina Termolétrica", "Joalheria", "Concessionária De Veículos",
    "Centro De Distribuição", "Armazém Logístico", "Servidor Em Nuvem", "Data Center",
    "Empresa De Desenvolvimento De Software", "Empresa De Jogos Digitais",
    "Empresa De Telecomunicações", "Plataforma De Redes Sociais", "Marketplace Online",
    "Instituto De Tecnologia Alimentar", "Centro De Pesquisa Agrícola",
    "Instituto De Biotecnologia", "Laboratório De Nanotecnologia",
    "Centro De Pesquisa Em Eletrônicos", "Laboratório De Design De Produtos",
    "Laboratório De Novos Combustíveis", "Centro De Engenharia Avançada",
    "Centro De Pesquisa Em Robótica", "Construtora", "Imobiliária Residencial",
    "Imobiliária Comercial", "Mineradora", "Centro De Coleta De Biomassa",
    "Fábrica De Fertilizantes", "Fábrica De Medicamentos", "Laboratório Farmacêutico",
    "Fábrica De Plásticos", "Alto-Forno", "Indústria De Componentes Mecânicos",
    "Fábrica De Chapas Metálicas", "Fábrica De Estruturas Metálicas",
    "Fábrica De Peças Automotivas", "Fábrica De Placas Eletrônicas", "Fábrica De Eletrônicos"
];

const RankC = [
    "Plantação De Grãos", "Plantação De Vegetais", "Pomares", "Fazenda Administrativa",
    "Fazenda De Vacas", "Granja De Aves", "Criação De Ovinos", "Armazém", "Silo",
    "Depósito De Resíduos Orgânicos", "Madeireira", "Área Florestal", "Terreno De Mineração",
    "Plantação De Eucalipto", "Plantação De Plantas Medicinais", "Subestação De Energia",
    "Rede De Distribuição Elétrica", "Usina Solar", "Fábrica De Turbinas Eólicas",
    "Fábrica De Painéis Solares", "Fábrica De Baterias", "Estação De Carregamento",
    "Centro De Reciclagem De Baterias", "Parque Eólico", "Feira", "Loja De Móveis",
    "Restaurante", "Livraria", "Mercado", "Adega", "Padaria", "Açougue",
    "Loja De Conveniência", "Posto De Combustíveis", "Rede De Fast-Food", "Petshop",
    "Farmácia", "Cafeteria", "Loja De Departamentos", "Loja De Calçados",
    "Loja De Vestuário", "Loja De Gadgets E Wearables", "Loja De Games",
    "Loja De Celulares", "Loja De Informática", "Loja De Eletrônicos",
    "Centro De Transporte E Entrega", "Startup", "Centro De Pesquisa Química",
    "Cartório E Licenças", "Terraplanagem E Pavimentação", "Construtora De Pequenas Obras",
    "Escritório De Design De Interiores", "Escritório De Arquitetura",
    "Consultoria Em Engenharia Civil", "Fábrica De Móveis", "Fábrica De Rações",
    "Fábrica De Embalagem", "Fábrica De Bebidas", "Fábrica De Pães", "Fábrica Têxtil",
    "Fábrica De Calçados", "Fábrica De Roupas", "Fábrica De Celulose",
    "Fábrica De Papel", "Fábrica De Livros"
];

// ── CONFIGURAÇÃO DOS PACOTES ──────────────────────────────────────
const PACK_CONFIG = {
    comum: {
        nome: "Comum",
        cor1: "#ffffff",
        cor2: "#3e3a44",
        cor3: "#fde4ce",
        cor4: "#1f014e",
        quantidade: 3,
        probabilidades: {
            S: 0,
            A: 0,
            B: 10,
            C: 90
        }
    },
    raro: {
        nome: "Raro",
        cor1: "#978585",
        cor2: "#553683",
        cor3: "#fde4ce",
        cor4: "#1f014e",
        quantidade: 4,
        probabilidades: {
            S: 2,
            A: 8,
            B: 24,
            C: 65
        }
    },
    epico: {
        nome: "Épico",
        cor1: "#af8968",
        cor2: "#ff7700",
        cor3: "#bd5800",
        cor4: "#442000",
        quantidade: 5,
        probabilidades: {
            S: 5,
            A: 15,
            B: 30,
            C: 50
        }
    },
    lendario: {
        nome: "Lendário",
        cor1: "#ffecae",
        cor2: "#ffc400",
        cor3: "#bd5800",
        cor4: "#6411D9",
        quantidade: 6,
        probabilidades: {
            S: 12,
            A: 45,
            B: 35,
            C: 8
        }
    }
};

// ── FUNÇÕES AUXILIARES ───────────────────────────────────────────
const SETORES_CONFIG = [
    { id: "agricultura", cor1: "#003816", cor2: "#1A5E2A", cor3: "#0C9123", cor4: "#4CAF50" },
    { id: "tecnologia", cor1: "#A64B00", cor2: "#D45A00", cor3: "#FF6F00", cor4: "#FF8C42" },
    { id: "industria", cor1: "#1A1A1A", cor2: "#4D4D4D", cor3: "#808080", cor4: "#B3B3B3" },
    { id: "comercio", cor1: "#660000", cor2: "#A31919", cor3: "#E60000", cor4: "#FF4D4D" },
    { id: "imobiliario", cor1: "#000066", cor2: "#1A1A8C", cor3: "#3333CC", cor4: "#6666FF" },
    { id: "energia", cor1: "#665200", cor2: "#A37F19", cor3: "#E6B800", cor4: "#FFD966" },
];

const setoresArr = [
    "agricultura",
    "tecnologia",
    "comercio",
    "industria",
    "imobiliario",
    "energia",
];

// ── FUNÇÃO PARA SORTEAR RANK BASEADO NAS PROBABILIDADES ──────────
const sortearRank = (probabilidades) => {
    const rand = Math.random() * 100;
    let acumulado = 0;
    
    for (const [rank, prob] of Object.entries(probabilidades)) {
        acumulado += prob;
        if (rand <= acumulado) {
            return rank;
        }
    }
    return 'C';
};

// ── FUNÇÃO PARA SORTEAR CARTA DE UM RANK ESPECÍFICO ─────────────
const sortearCartaDoRank = (rank) => {
    let pool = [];
    switch(rank) {
        case 'S': pool = [...RankS]; break;
        case 'A': pool = [...RankA]; break;
        case 'B': pool = [...RankB]; break;
        case 'C': pool = [...RankC]; break;
        default: pool = [...RankC];
    }
    
    if (pool.length === 0) return null;
    const idx = Math.floor(Math.random() * pool.length);
    return pool[idx];
};

// ── FUNÇÃO PARA SORTEAR CARTAS DE UM PACOTE (CORRIGIDA) ──────────
const sortearCartasDoPacote = (tipoPacote) => {
    const config = PACK_CONFIG[tipoPacote];
    if (!config) return [];

    const cartasSorteadas = [];
    const usedCards = new Set();
    const quantidades = config.quantidade || 3;
    
    // 🔥 CRIA UM POOL DE TODAS AS CARTAS DISPONÍVEIS POR RANK
    const getPoolPorRank = (rank) => {
        switch(rank) {
            case 'S': return [...RankS];
            case 'A': return [...RankA];
            case 'B': return [...RankB];
            case 'C': return [...RankC];
            default: return [...RankC];
        }
    };

    // 🔥 FUNÇÃO PARA SORTEAR UMA CARTA ÚNICA DE UM RANK ESPECÍFICO
    const sortearCartaUnicaDoRank = (rank, used) => {
        const pool = getPoolPorRank(rank);
        const disponiveis = pool.filter(carta => !used.has(carta));
        if (disponiveis.length === 0) return null;
        const idx = Math.floor(Math.random() * disponiveis.length);
        return disponiveis[idx];
    };

    // 🔥 SORTEIA AS CARTAS
    for (let i = 0; i < quantidades; i++) {
        let carta = null;
        let rank = null;
        let tentativas = 0;
        const maxTentativas = 50;

        // Tenta sortear um rank baseado nas probabilidades
        while (tentativas < maxTentativas && !carta) {
            rank = sortearRank(config.probabilidades);
            const tentativa = sortearCartaUnicaDoRank(rank, usedCards);
            if (tentativa) {
                carta = tentativa;
                break;
            }
            tentativas++;
        }

        // Se não conseguiu com o rank sorteado, tenta em ordem de prioridade
        if (!carta) {
            const ranksPrioridade = ['C', 'B', 'A', 'S'];
            for (const r of ranksPrioridade) {
                const tentativa = sortearCartaUnicaDoRank(r, usedCards);
                if (tentativa) {
                    carta = tentativa;
                    rank = r;
                    break;
                }
            }
        }

        // Se ainda não encontrou, significa que todas as cartas foram usadas
        if (!carta) {
            console.warn(`⚠️ Não foi possível sortear a carta ${i + 1} do pacote ${tipoPacote}`);
            // Tenta qualquer carta disponível (pode repetir)
            for (const r of ['C', 'B', 'A', 'S']) {
                const pool = getPoolPorRank(r);
                const disponiveis = pool.filter(c => !usedCards.has(c));
                if (disponiveis.length > 0) {
                    carta = disponiveis[Math.floor(Math.random() * disponiveis.length)];
                    rank = r;
                    break;
                }
            }
        }

        if (carta) {
            usedCards.add(carta);
            cartasSorteadas.push({
                nome: carta,
                rank: rank || 'C'
            });
        }
    }

    // 🔥 GARANTE QUE SEMPRE RETORNE A QUANTIDADE EXATA DE CARTAS
    // Se por algum motivo veio menos cartas, preenche com cartas aleatórias (permite repetição)
    while (cartasSorteadas.length < quantidades) {
        const rank = sortearRank(config.probabilidades);
        const pool = getPoolPorRank(rank);
        if (pool.length > 0) {
            const idx = Math.floor(Math.random() * pool.length);
            cartasSorteadas.push({
                nome: pool[idx],
                rank: rank
            });
        } else {
            // Fallback: usa Rank C
            const poolC = getPoolPorRank('C');
            const idx = Math.floor(Math.random() * poolC.length);
            cartasSorteadas.push({
                nome: poolC[idx],
                rank: 'C'
            });
        }
    }

    return cartasSorteadas;
};

// ── FUNÇÃO PARA DETERMINAR O TIPO DE PACOTE PELO DIA ────────────
const getTipoPacotePorDia = (dia) => {
    if (dia === 0) return 'comum';
    if (dia <= 90) return 'comum';
    if (dia <= 180) return 'raro';
    if (dia <= 270) return 'epico';
    return 'lendario';
};

// ── FUNÇÃO PARA GERAR UPGRADES A PARTIR DAS CARTAS ──────────────
const gerarUpgrades = (cartas, dados) => {
    const upgrades = [];
    const randomBonus = () => Math.floor(Math.random() * 10) + 1;

    cartas.forEach(({ nome, rank }) => {
        for (const setor of setoresArr) {
            const edificio = dados[setor]?.edificios?.find(
                (ed) => ed.nome === nome
            );
            if (edificio) {
                upgrades.push({
                    nome,
                    rank,
                    fatu: randomBonus(),
                    redImposto: randomBonus(),
                    setor: setor,
                    index: dados[setor].edificios.indexOf(edificio)
                });
                break;
            }
        }
    });

    return upgrades;
};

// ── COMPONENTES VISUAIS ───────────────────────────────────────────

// ── Partículas ────────────────────────────────────────────────────
const Particle = ({ x, y, dx, dy, color, delay }) => (
  <motion.div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: color,
      boxShadow: `0 0 20px ${color}, 0 0 60px ${color}44`,
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0], 
      scale: [0, 1.5, 0],
      x: [0, dx],
      y: [0, dy]
    }}
    transition={{ 
      duration: 1.4, 
      delay: delay,
      ease: "easeOut"
    }}
  />
);

// ── Pacote visual ────────────────────────────────────────────────
const Pacote = ({ fase, onOpen, tema, tipo }) => {
  const packGradient = `linear-gradient(
    160deg, 
    ${tema.cor1} 0%, 
    ${tema.cor2} 25%, 
    ${tema.cor3} 50%, 
    ${tema.cor2} 75%, 
    ${tema.cor1} 100%
  )`;

  const metallicSheen = `linear-gradient(
    135deg,
    transparent 0%,
    ${tema.cor4}15 30%,
    ${tema.cor4}30 50%,
    ${tema.cor4}15 70%,
    transparent 100%
  )`;

  const nomePacote = PACK_CONFIG[tipo]?.nome || tipo;

  return (
    <motion.div
      style={{ 
        position: "relative", 
        width: 240, 
        height: 340, 
        cursor: "pointer",
        perspective: 1200,
      }}
      onClick={onOpen}
      animate={
        fase === "idle" 
          ? { 
              scale: [1, 1.015, 1],
              boxShadow: [
                `0 30px 80px ${tema.cor4}33`,
                `0 30px 100px ${tema.cor4}66`,
                `0 30px 80px ${tema.cor4}33`
              ]
            }
          : fase === "shaking" 
            ? { 
                rotate: [0, -5, 5, -5, 5, -4, 4, 0], 
                scale: [1, 1.05, 1.05, 1.05, 1.05, 1.05, 1.05, 1],
                boxShadow: `0 40px 120px ${tema.cor4}88`
              }
            : fase === "opening"
              ? { 
                  y: -100, 
                  opacity: 0, 
                  scale: 0.8,
                  boxShadow: `0 60px 200px ${tema.cor4}aa`
                }
              : { rotate: 0, scale: 1 }
      }
      transition={
        fase === "idle"
          ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          : fase === "shaking"
            ? { duration: 0.7, times: [0, .1, .25, .4, .55, .7, .85, 1] }
            : { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
      }
      exit={{ y: -120, opacity: 0, scale: 0.7, transition: { duration: 0.5 } }}
      whileHover={fase === "idle" ? { scale: 1.05, y: -6 } : {}}
    >
      {/* Aura Luminosa Premium */}
      <motion.div
        style={{
          position: "absolute",
          inset: "-30px",
          borderRadius: "40px",
          background: `radial-gradient(circle at 50% 40%, ${tema.cor4}44, ${tema.cor4}11 60%, transparent 80%)`,
          filter: "blur(30px)",
          opacity: 0.5,
          pointerEvents: "none",
        }}
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{ 
          duration: 3.5, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />

      <div style={{
        position: "absolute",
        inset: "10px",
        borderRadius: 20,
        background: `radial-gradient(ellipse at 50% 80%, ${tema.cor4}22, transparent 70%)`,
        filter: "blur(15px)",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "absolute", 
        inset: 0, 
        borderRadius: 20,
        background: packGradient,
        border: `2px solid ${tema.cor4}88`,
        boxShadow: `
          inset 0 2px 0 ${tema.cor4}44,
          0 20px 60px ${tema.cor4}33,
          0 0 40px ${tema.cor4}22
        `,
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", 
          inset: 0, 
          borderRadius: 20,
          backgroundImage: `
            repeating-linear-gradient(0deg, ${tema.cor4}06 0px, ${tema.cor4}06 1px, transparent 1px, transparent 6px),
            repeating-linear-gradient(90deg, ${tema.cor4}04 0px, ${tema.cor4}04 1px, transparent 1px, transparent 6px)
          `,
        }} />

        <motion.div
          style={{
            position: "absolute", 
            inset: 0, 
            borderRadius: 20,
            background: metallicSheen,
          }}
          animate={{ 
            x: [-50, 50, -50],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />

        <div style={{
          position: "absolute",
          inset: 3,
          borderRadius: 18,
          border: `1px solid ${tema.cor4}22`,
          pointerEvents: "none",
        }} />

        <motion.div
          style={{
            position: "absolute", 
            top: 0, 
            left: 0, 
            right: 0, 
            height: 72,
            background: `linear-gradient(
              160deg, 
              ${tema.cor2} 0%, 
              ${tema.cor3} 40%, 
              ${tema.cor2} 70%, 
              ${tema.cor3} 100%
            )`,
            borderRadius: "20px 20px 0 0",
            borderBottom: `2px solid ${tema.cor4}88`,
            transformOrigin: "top center",
            overflow: "hidden",
            zIndex: 5,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
          animate={fase === "opening" ? {
            rotateX: -130,
            y: -30,
            opacity: 0,
          } : {
            rotateX: 0,
            y: 0,
            opacity: 1,
          }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div style={{
            position: "absolute", 
            inset: 0,
            background: `linear-gradient(135deg, transparent 20%, ${tema.cor4}33 50%, transparent 80%)`,
          }} />
          
          <div style={{
            position: "absolute", 
            top: 0, 
            left: 0, 
            right: 0, 
            height: 2,
            background: `linear-gradient(90deg, transparent 0%, ${tema.cor4}66 50%, transparent 100%)`,
          }} />
          
          <div style={{
            position: "absolute", 
            bottom: 0, 
            left: 20, 
            right: 20, 
            height: 2,
            background: `repeating-linear-gradient(90deg, ${tema.cor4} 0px, ${tema.cor4} 8px, transparent 8px, transparent 16px)`,
            opacity: 0.4,
          }} />
          
          <div style={{
            position: "absolute",
            top: 10,
            right: 16,
            width: 20,
            height: 20,
            borderRadius: "50%",
            border: `2px solid ${tema.cor4}66`,
            background: `radial-gradient(circle, ${tema.cor4}33, transparent)`,
          }} />
        </motion.div>

        <div style={{
          position: "absolute", 
          top: "50%", 
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 110, 
          height: 110, 
          borderRadius: "50%",
          background: `radial-gradient(circle at 30% 30%, ${tema.cor2} 0%, ${tema.cor1} 80%, ${tema.cor3} 100%)`,
          border: `3px solid ${tema.cor4}88`,
          boxShadow: `
            inset 0 -10px 30px rgba(0,0,0,0.2),
            0 10px 40px ${tema.cor4}33
          `,
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          fontSize: 36,
          zIndex: 2,
        }}>
          <img 
            src={logo} 
            className="rounded-full" 
            alt="Logo"
            style={{
              width: "80%",
              height: "80%",
              objectFit: "contain",
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
            }}
          />
          
          <div style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: `radial-gradient(circle at 30% 20%, ${tema.cor4}44, transparent 70%)`,
            pointerEvents: "none",
          }} />
        </div>

        <div style={{
          position: "absolute", 
          top: 86, 
          left: 0, 
          right: 0,
          textAlign: "center", 
          fontSize: 14,
          color: tema.cor4, 
          letterSpacing: 4,
          opacity: 0.6,
          fontWeight: 300,
        }}>✦ ✦ ✦</div>

        <motion.div
          style={{
            position: "absolute", 
            bottom: 28, 
            left: 0, 
            right: 0,
            textAlign: "center",
            fontSize: 16, 
            fontWeight: 700,
            textTransform: "uppercase",
            color: tema.cor4,
            fontFamily: "'Inter', 'Segoe UI', -apple-system, sans-serif",
            textShadow: `0 0 30px ${tema.cor4}22`,
            letterSpacing: ".2em",
            opacity: 0.9,
          }}
          animate={fase === "idle" ? {
            letterSpacing: [".2em", ".3em", ".2em"],
            opacity: [0.8, 1, 0.8],
          } : {}}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {nomePacote}
        </motion.div>

        <div style={{
          position: "absolute",
          bottom: 60,
          left: 40,
          right: 40,
          height: 1,
          background: `linear-gradient(90deg, transparent 0%, ${tema.cor4}33 50%, transparent 100%)`,
        }} />
      </div>

      {["opening"].includes(fase) && (
        <>
          <motion.div
            style={{
              position: "absolute",
              inset: "-50px",
              borderRadius: "50%",
              border: `2px solid ${tema.cor4}55`,
              pointerEvents: "none",
              boxShadow: `0 0 60px ${tema.cor4}33`,
            }}
            animate={{
              scale: [0.5, 3],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
              repeat: 3,
              repeatDelay: 0.15,
            }}
          />
          <motion.div
            style={{
              position: "absolute",
              inset: "-70px",
              borderRadius: "50%",
              border: `1px solid ${tema.cor4}33`,
              pointerEvents: "none",
            }}
            animate={{
              scale: [0.3, 3.5],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              repeat: 2,
              repeatDelay: 0.3,
            }}
          />
        </>
      )}
    </motion.div>
  );
};

// ── Componente Principal ─────────────────────────────────────────
export const PackOpeningDraft = ({ onClose, onSorteio }) => {
  const { dados, atualizarDados, atualizarDadosProf2 } = useContext(CentraldeDadosContext);
  const [cartasSorteadas, setCartasSorteadas] = useState([]);
  const [fase, setFase] = useState("idle");
  const [particles, setParticles] = useState([]);
  const [modal, setModal] = useState(false);
  const [buttonCloseAudio] = useSound(closeAudio);
  const [buttonNewStageAudio] = useSound(newStageAudio);
  const [audioTocado, setAudioTocado] = useState(false);
  
  const [jaSorteouHoje, setJaSorteouHoje] = useState(false);
  const [tipoPacoteAtual, setTipoPacoteAtual] = useState('comum');
  const [pacotesIniciaisAbertos, setPacotesIniciaisAbertos] = useState(false);
  const [quantosPacotesAbertos, setQuantosPacotesAbertos] = useState(0);
  const [aguardandoProximoPacote, setAguardandoProximoPacote] = useState(false);
  const TOTAL_PACOTES_INICIAIS = 1;

  // 🔥 DETERMINA O TIPO DE PACOTE BASEADO NO DIA
  useEffect(() => {
    const tipo = getTipoPacotePorDia(dados.dia);
    setTipoPacoteAtual(tipo);
  }, [dados.dia]);

  // 🔥 PEGA O TEMA DO PACOTE ATUAL
  const temaAtual = useMemo(() => {
    const config = PACK_CONFIG[tipoPacoteAtual];
    return {
      cor1: config.cor1,
      cor2: config.cor2,
      cor3: config.cor3,
      cor4: config.cor4,
    };
  }, [tipoPacoteAtual]);

  // 🔥 FUNÇÃO PARA RESETAR O ESTADO PARA UM NOVO SORTEIO
  const resetarParaNovoSorteio = useCallback(() => {
    setFase("idle");
    setJaSorteouHoje(false);
    setCartasSorteadas([]);
    setParticles([]);
    setAguardandoProximoPacote(false);
    setAudioTocado(false);
  }, []);

  const fecharModal = useCallback(() => {
    setModal(false);
    
    // 🔥 Reseta o estado para o próximo sorteio
    resetarParaNovoSorteio();
    
    // 🔥 Se ainda não abriu todos os pacotes iniciais, abre o próximo
    if (dados.dia === 0 && quantosPacotesAbertos < TOTAL_PACOTES_INICIAIS && !aguardandoProximoPacote) {
      setAguardandoProximoPacote(true);
      setTimeout(() => {
        abrirProximoPacoteInicial();
      }, 300);
    }
  }, [dados.dia, quantosPacotesAbertos, aguardandoProximoPacote, resetarParaNovoSorteio]);

  // 🔥 FUNÇÃO PARA ABRIR O PRÓXIMO PACOTE INICIAL
  const abrirProximoPacoteInicial = useCallback(() => {
    if (quantosPacotesAbertos >= TOTAL_PACOTES_INICIAIS) {
      setPacotesIniciaisAbertos(true);
      setAguardandoProximoPacote(false);
      return;
    }

    console.log(`🎁 [PackOpening] Abrindo pacote inicial #${quantosPacotesAbertos + 1} de ${TOTAL_PACOTES_INICIAIS}`);
    
    // Reseta o estado para o próximo pacote
    resetarParaNovoSorteio();
    setQuantosPacotesAbertos(prev => prev + 1);
    setAguardandoProximoPacote(false);
    
    // Abre o modal e inicia o sorteio
    setModal(true);
  }, [quantosPacotesAbertos, resetarParaNovoSorteio]);

  // 🔥 EFETIVAMENTE ABRE O PACOTE (chamado pelo modal)
  const realizarSorteio = useCallback(() => {
    if (jaSorteouHoje || fase !== "idle") return;

    console.log(`🎁 Dia ${dados.dia}: Iniciando sorteio de pacote ${tipoPacoteAtual}!`);

    // 1. Sorteia cartas baseado no tipo de pacote
    const cartasSorteadasRank = sortearCartasDoPacote(tipoPacoteAtual);
    
    if (cartasSorteadasRank.length === 0) {
      console.warn("⚠️ Nenhuma carta sorteada");
      setModal(false);
      return;
    }

    // 2. Gera upgrades para as cartas
    const upgrades = gerarUpgrades(cartasSorteadasRank, dados);

    if (upgrades.length === 0) {
      console.warn("⚠️ Nenhum upgrade válido encontrado");
      setModal(false);
      return;
    }

    // 3. Aplica os upgrades nos edifícios (aumenta a quantidade em 1)
    upgrades.forEach((upgrade) => {
      const { setor, index, nome } = upgrade;
      
      if (setor && index !== undefined) {
        const edificio = dados[setor]?.edificios?.[index];
        if (edificio) {
          const novaQuantidade = (edificio.quantidade || 0) + 1;
          atualizarDadosProf2(
            [setor, "edificios", index, "quantidade"],
            novaQuantidade
          );
          console.log(`✅ ${nome}: quantidade aumentada para ${novaQuantidade}`);
        }
      }
    });

    // 4. Adiciona ao histórico de cards sorteados
    const cardsSorteadosAtuais = dados.CardsSorteados || [];
    const novosCardsSorteados = [...cardsSorteadosAtuais, ...upgrades];
    setCartasSorteadas(upgrades);
    atualizarDados("CardsSorteados", novosCardsSorteados);

    // 5. Marca que já sorteou neste dia
    setJaSorteouHoje(true);
    atualizarDados("ultimoSorteio500", dados.dia);

    // 6. Inicia a animação do pacote
    setFase("shaking");
    setTimeout(() => setFase("opening"), 800);
    setTimeout(() => spawnParticles(), 1000);
    setTimeout(() => setFase("revealed"), 1500);

    console.log(`✅ Sorteio concluído! ${upgrades.length} upgrades aplicados.`);
  }, [dados, atualizarDados, atualizarDadosProf2, fase, jaSorteouHoje, tipoPacoteAtual]);

  // ── Spawn de Partículas ──────────────────────────────────────
  const spawnParticles = useCallback(() => {
    const colors = [
      temaAtual.cor4,
      temaAtual.cor3,
      "#ffffff",
      `${temaAtual.cor4}aa`,
      `${temaAtual.cor3}88`,
    ];

    const list = Array.from({ length: 60 }, (_, i) => {
      const angle = Math.random() * 2 * Math.PI;
      const dist = 80 + Math.random() * 200;

      return {
        id: i,
        x: "50%",
        y: "20%",
        color: colors[Math.floor(Math.random() * colors.length)],
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
        delay: Math.random() * 0.3,
      };
    });

    setParticles(list);

    setTimeout(() => setParticles([]), 1800);
  }, [temaAtual]);

  // ── handleOpen (clique manual no pacote) ────────────────────
  const handleOpen = () => {
    if (fase !== "idle") return;
    realizarSorteio();
  };

  // 🔥 useEffect PARA TOCAR O ÁUDIO QUANDO O PACOTE ABRIR
  useEffect(() => {
    if (modal && fase === "opening" && !audioTocado) {
      // Toca o áudio newStage quando o pacote está abrindo
      buttonNewStageAudio();
      setAudioTocado(true);
      console.log("🎵 [PackOpening] Áudio newStage tocado!");
    }
  }, [modal, fase, audioTocado, buttonNewStageAudio]);

  // 🔥 NOVO useEffect: ABRE PACOTES INICIAIS NO DIA 0
  useEffect(() => {
    const jogoIniciado = dados.jogoIniciado || false;
    const diaZero = dados.dia === 0;
    const pacotesNaoAbertos = !pacotesIniciaisAbertos && quantosPacotesAbertos < TOTAL_PACOTES_INICIAIS;

    if (jogoIniciado && diaZero && pacotesNaoAbertos && !modal && fase === "idle" && !aguardandoProximoPacote) {
      console.log("🎯 [PackOpening] Jogo iniciado no dia 0! Abrindo pacotes iniciais...");
      
      const timer = setTimeout(() => {
        abrirProximoPacoteInicial();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [dados.jogoIniciado, dados.dia, pacotesIniciaisAbertos, quantosPacotesAbertos, modal, fase, aguardandoProximoPacote, abrirProximoPacoteInicial]);

  // 🔥 useEffect: Detecta quando é dia de sorteio (múltiplos de 30, exceto dia 0 e dia 360)
  useEffect(() => {
    if (dados.dia === 0) return;
    
    // 🔥 NÃO ABRE PACOTE NO DIA 360 (FIM DO JOGO)
    if (dados.dia >= 360) {
      console.log("🏁 [PackOpening] Jogo finalizado! Sem pacotes no dia 360.");
      return;
    }
    
    if (pacotesIniciaisAbertos === false && dados.dia > 0) {
      setPacotesIniciaisAbertos(true);
    }
    
    const isDiaDeSorteio = dados.dia > 0 && dados.dia % 30 === 0;
    const ultimoSorteio = dados.ultimoSorteio500 || 0;
    const jaSorteioNesteDia = ultimoSorteio === dados.dia;

    if (isDiaDeSorteio && !jaSorteioNesteDia && fase === "idle" && !modal && !aguardandoProximoPacote) {
      console.log(`🎯 Dia ${dados.dia}: Sorteio automático de pacote ${tipoPacoteAtual} ativado!`);
      setModal(true);
    }
  }, [dados.dia, dados.ultimoSorteio500, fase, modal, tipoPacoteAtual, pacotesIniciaisAbertos, aguardandoProximoPacote]);

  // ── useEffect: Quando o modal abre, inicia o sorteio ──────
  useEffect(() => {
    if (modal && fase === "idle" && !jaSorteouHoje) {
      const timer = setTimeout(() => {
        console.log(`🎁 Abrindo pacote ${tipoPacoteAtual} automaticamente...`);
        realizarSorteio();
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [modal, fase, jaSorteouHoje, realizarSorteio, tipoPacoteAtual]);

  // ── Render do Modal ──────────────────────────────────────────
  if (modal) {
    return (
      <div style={{
        position: "fixed", 
        inset: 0, 
        zIndex: 200,
        background: `radial-gradient(ellipse at 50% 30%, ${temaAtual.cor1} 0%, #07070f 80%)`,
        display: "flex", 
        flexDirection: "column",
        alignItems: "center", 
        justifyContent: "center",
        gap: 28, 
        padding: 32,
      }}>
        {/* Gradiente de fundo premium */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 20%, ${temaAtual.cor4}11, transparent 70%)`,
          pointerEvents: "none",
        }} />

        {/* Partículas */}
        <div style={{ 
          position: "absolute", 
          inset: 0, 
          pointerEvents: "none", 
          overflow: "hidden" 
        }}>
          <AnimatePresence>
            {particles.map(p => <Particle key={p.id} {...p} />)}
          </AnimatePresence>
        </div>

        {/* Pacote */}
        <AnimatePresence>
          {fase !== "revealed" && (
            <Pacote
              key="pacote"
              fase={fase}
              onOpen={handleOpen}
              tema={temaAtual}
              tipo={tipoPacoteAtual}
            />
          )}
        </AnimatePresence>

        {/* Hint */}
        <AnimatePresence>
          {fase === "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              style={{
                fontSize: 12, 
                letterSpacing: ".2em", 
                textTransform: "uppercase",
                color: `${temaAtual.cor4}66`,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
              }}
            >
              ✦ Clique no pacote para abrir ✦
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botão Abrir Premium */}
        <AnimatePresence>
          {fase === "idle" && (
            <motion.button
              onClick={handleOpen}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              whileHover={{ 
                scale: 1.06, 
                y: -4,
                boxShadow: `0 12px 50px ${temaAtual.cor4}66`
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "14px 44px", 
                borderRadius: 12, 
                border: "none",
                background: `linear-gradient(135deg, ${temaAtual.cor4} 0%, ${temaAtual.cor3} 100%)`,
                color: "#fff", 
                fontSize: 14, 
                fontWeight: 700,
                letterSpacing: ".15em", 
                textTransform: "uppercase",
                cursor: "pointer",
                boxShadow: `0 6px 30px ${temaAtual.cor4}44`,
                position: "relative",
                overflow: "hidden",
                fontFamily: "'Inter', sans-serif",
                transition: "all 0.3s ease",
              }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "-150%",
                  width: "400%",
                  height: "100%",
                  background: `linear-gradient(90deg, transparent 0%, ${temaAtual.cor4}55 50%, transparent 100%)`,
                }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              
              <div style={{
                position: "absolute",
                inset: 0,
                borderRadius: 12,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
                pointerEvents: "none",
              }} />
              
              Abrir Pacote {PACK_CONFIG[tipoPacoteAtual]?.nome}
            </motion.button>
          )}
        </AnimatePresence>

        {/* Cartas reveladas em linha */}
        <AnimatePresence>
          {fase === "revealed" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ 
                display: "flex", 
                flexDirection: "column",
                alignItems: "center",
                gap: 24,
                width: "100%",
                maxWidth: "900px",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  textAlign: "center",
                  marginBottom: 8,
                }}
              >
                <h1 style={{
                  color: "#fff",
                  fontSize: 26,
                  fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                  textShadow: `0 0 60px ${temaAtual.cor4}44`,
                  letterSpacing: "0.02em",
                }}>
                  Pacote {PACK_CONFIG[tipoPacoteAtual]?.nome}
                </h1>
                <p style={{
                  color: `${temaAtual.cor4}88`,
                  fontSize: 14,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  marginTop: 4,
                }}>
                  {cartasSorteadas.length} cartas recebidas
                </p>
              </motion.div>

              <motion.div
                style={{
                  display: "flex",
                  gap: 16,
                  flexWrap: "wrap",
                  justifyContent: "center",
                  width: "100%",
                  padding: "0 20px",
                }}
              >
                {cartasSorteadas.map((carta, i) => (
                  <motion.div
                    key={`${carta.nome}-${i}`}
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
                      delay: 0.15 + i * 0.12,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 300,
                      damping: 18,
                    }}
                    whileHover={{ 
                      y: -8,
                      scale: 1.04,
                      boxShadow: `0 16px 60px ${temaAtual.cor4}55`
                    }}
                    style={{
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {LocalizadorUpgrade(
                      carta.nome,
                      carta.redImposto || 0,
                      carta.fatu || 0
                    )}
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: `0 8px 40px ${temaAtual.cor4}55`
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  fecharModal();
                  buttonCloseAudio();
                  if (onClose) onClose();
                  if (onSorteio) onSorteio();
                }}
                style={{
                  marginTop: 16,
                  padding: "14px 48px",
                  borderRadius: 30,
                  border: `2px solid ${temaAtual.cor4}44`,
                  background: `linear-gradient(135deg, ${temaAtual.cor4} 0%, ${temaAtual.cor3} 100%)`,
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.3s ease",
                  boxShadow: `0 4px 20px ${temaAtual.cor4}33`,
                }}
              >
                {quantosPacotesAbertos < TOTAL_PACOTES_INICIAIS && dados.dia === 0
                  ? `Próximo Pacote (${quantosPacotesAbertos}/${TOTAL_PACOTES_INICIAIS}) ✓`
                  : "Entendido ✓"
                }
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
  return null;
};