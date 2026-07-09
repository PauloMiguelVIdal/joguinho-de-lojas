// ModalShop.jsx - Versão com layout mais fluido
import React, { useState, useCallback, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import fechar from "../../public/outrasImagens/fechar.png";
import logo from '../../public/outrasImagens/logo Joguinho.png';
import useSound from "use-sound";
import closeAudio from "../../public/sounds/closeAudio.mp3";
import { LocalizadorUpgrade } from "./LocalizadorUpgrade";
import { useSlotVerification } from "./SlotManager";

// ─── DETECTAR DISPOSITIVO ──────────────────────────────────────────
function useDeviceDetection() {
    const [isMobile, setIsMobile] = useState(false);
    const [isLandscape, setIsLandscape] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const checkDevice = () => {
            const mobile = window.innerWidth < 768;
            const landscape = window.innerWidth > window.innerHeight && mobile;
            setIsMobile(mobile);
            setIsLandscape(landscape);
            setWindowWidth(window.innerWidth);
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

    return { isMobile, isLandscape, isDesktop: !isMobile, windowWidth };
}

// ═══════════════════════════════════════════════════════════════════
// 1. RANKS DOS EDIFÍCIOS
// ═══════════════════════════════════════════════════════════════════
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
    "Fábrica De Consoles De Jogos", "Fábrica De Dispositivos Vestíveis",
    "Centro De Pesquisa Em Fusão Nuclear", "Centro De Pesquisa Aeroespacial",
    "Centro De Engenharia Avançada", "Centro De Pesquisa Em Materiais",
    "Centro De Pesquisa Em IA", "Mineradora De Pedras Preciosas", "Mega Mercado",
    "Prédio De Alto Padrão", "Tanque De Armazenamento Biocombustível", "Fábrica De Químicos Especializados", "Alto-Forno",
    "Usina Siderúrgica", "Fundição De Alumínio", "Fábrica De Ligas Metálicas",
    "Fábrica De Peças Automotivas", "Refinaria De Biocombustíveis", "Biofábrica",
    "Fábrica De Eletrônicos", "Empresa De Automação Industrial", "Estaleiro"
];

const RankB = [
    "Centro De Comércio De Plantações", "Empresa De Comércio Energético",
    "Empresa De Consultoria Energética", "Centro De Pesquisa Em Energias Renováveis",
    "Centro De Pesquisa Energética", "Usina Termelétrica A Biocombustíveis", "Usina Termelétrica", "Joalheria", "Concessionária De Veículos",
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
    "Fábrica De Plásticos", "Indústria De Componentes Mecânicos",
    "Fábrica De Chapas Metálicas", "Fábrica De Estruturas Metálicas",
    "Fábrica De Placas Eletrônicas",
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
    "Fábrica De Embalagens", "Fábrica De Bebidas", "Fábrica De Pães", "Fábrica Têxtil",
    "Fábrica De Calçados", "Fábrica De Roupas", "Fábrica De Celulose",
    "Fábrica De Papel", "Fábrica De Livros"
];

// ═══════════════════════════════════════════════════════════════════
// 2. CONFIGURAÇÃO DOS PACOTES
// ═══════════════════════════════════════════════════════════════════
const PACK_CONFIG = {
    comum: {
        nome: "Comum",
        cor1: "#ffffff",
        cor2: "#3e3a44",
        cor3: "#fde4ce",
        cor4: "#1f014e",
        quantidade: 3,
        probabilidades: { S: 0, A: 0, B: 10, C: 90 }
    },
    raro: {
        nome: "RARO",
        cor1: "#978585",
        cor2: "#553683",
        cor3: "#fde4ce",
        cor4: "#1f014e",
        quantidade: 4,
        probabilidades: { S: 2, A: 8, B: 24, C: 65 },
        isBalanced: true
    },
    epico: {
        nome: "ÉPICO",
        cor1: "#af8968",
        cor2: "#ff7700",
        cor3: "#bd5800",
        cor4: "#442000",
        quantidade: 5,
        probabilidades: { S: 5, A: 15, B: 30, C: 50 }
    },
    lendario: {
        nome: "LENDÁRIO",
        cor1: "#ffecae",
        cor2: "#ffc400",
        cor3: "#bd5800",
        cor4: "#6411D9",
        quantidade: 6,
        probabilidades: { S: 12, A: 45, B: 35, C: 8 }
    }
};

// ═══════════════════════════════════════════════════════════════════
// 3. PREÇOS DOS PACOTES
// ═══════════════════════════════════════════════════════════════════
const PACK_PRICES = {
    comum: 1000000,
    raro: 10000000,
    epico: 20000000,
    lendario: 50000000
};

// ═══════════════════════════════════════════════════════════════════
// 4. FUNÇÕES AUXILIARES
// ═══════════════════════════════════════════════════════════════════
const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

const sortearRank = (probabilidades) => {
    const rand = Math.random() * 100;
    let acumulado = 0;
    for (const [rank, prob] of Object.entries(probabilidades)) {
        acumulado += prob;
        if (rand <= acumulado) return rank;
    }
    return 'C';
};

const sortearCartaDoRank = (rank) => {
    let pool = [];
    switch (rank) {
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

const sortearCartasDoPacote = (tipoPacote) => {
    const config = PACK_CONFIG[tipoPacote];
    if (!config) return [];

    const cartasSorteadas = [];
    const usedCards = new Set();
    const quantidades = config.quantidade || 3;

    for (let i = 0; i < quantidades; i++) {
        let tentativas = 0;
        let carta = null;
        let rank = null;

        while (tentativas < 20) {
            rank = sortearRank(config.probabilidades);
            carta = sortearCartaDoRank(rank);
            if (carta && !usedCards.has(carta)) {
                usedCards.add(carta);
                break;
            }
            tentativas++;
            carta = null;
        }

        if (!carta) {
            for (const r of ['C', 'B', 'A', 'S']) {
                const tentativa = sortearCartaDoRank(r);
                if (tentativa && !usedCards.has(tentativa)) {
                    carta = tentativa;
                    usedCards.add(carta);
                    break;
                }
            }
        }

        if (carta) {
            cartasSorteadas.push({ nome: carta, rank: rank || 'C' });
        }
    }
    return cartasSorteadas;
};

const gerarUpgrades = (cartas, dados) => {
    const upgrades = [];
    const randomBonus = () => Math.floor(Math.random() * 10) + 1;

    cartas.forEach(({ nome, rank }) => {
        for (const setor of setoresArr) {
            const edificio = dados[setor]?.edificios?.find(ed => ed.nome === nome);
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

// ═══════════════════════════════════════════════════════════════════
// 5. COMPONENTE PARTÍCULA
// ═══════════════════════════════════════════════════════════════════
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
        transition={{ duration: 1.4, delay: delay, ease: "easeOut" }}
    />
);

// ═══════════════════════════════════════════════════════════════════
// 6. COMPONENTE PACOTE VISUAL
// ═══════════════════════════════════════════════════════════════════
const PacoteVisual = ({ tema, tipo, onClick, isMobile, isLandscape }) => {
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
    const isDesktop = !isMobile;
    
    // Tamanhos mais proporcionais
    const pacoteWidth = isDesktop ? '160px' : (isLandscape ? '100px' : '90px');
    const pacoteHeight = isDesktop ? '200px' : (isLandscape ? '120px' : '110px');
    const logoSize = isDesktop ? '70px' : (isLandscape ? '38px' : '34px');
    const fontSizeNome = isDesktop ? '12px' : (isLandscape ? '8px' : '7px');
    const topoHeight = isDesktop ? '50px' : (isLandscape ? '24px' : '22px');

    return (
        <motion.div
            style={{
                position: "relative",
                width: pacoteWidth,
                height: pacoteHeight,
                cursor: "pointer",
                perspective: 1200,
                flexShrink: 0,
            }}
            whileHover={{ scale: isDesktop ? 1.05 : 1.02 }}
            onClick={onClick}
        >
            <motion.div
                style={{
                    position: "absolute",
                    inset: isDesktop ? "-20px" : "-8px",
                    borderRadius: "40px",
                    background: `radial-gradient(circle at 50% 40%, ${tema.cor4}44, ${tema.cor4}11 60%, transparent 80%)`,
                    filter: "blur(20px)",
                    opacity: 0.4,
                    pointerEvents: "none",
                }}
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.4, 0.6, 0.4]
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />

            <div style={{
                position: "absolute",
                inset: isDesktop ? "8px" : "3px",
                borderRadius: isDesktop ? 16 : 10,
                background: `radial-gradient(ellipse at 50% 80%, ${tema.cor4}22, transparent 70%)`,
                filter: "blur(10px)",
                pointerEvents: "none",
            }} />

            <div style={{
                position: "absolute",
                inset: 0,
                borderRadius: isDesktop ? 16 : 10,
                background: packGradient,
                border: `2px solid ${tema.cor4}88`,
                boxShadow: `
                    inset 0 2px 0 ${tema.cor4}44,
                    0 10px 40px ${tema.cor4}33,
                    0 0 30px ${tema.cor4}22
                `,
                overflow: "hidden",
            }}>
                <div style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: isDesktop ? 16 : 10,
                    backgroundImage: `
                        repeating-linear-gradient(0deg, ${tema.cor4}06 0px, ${tema.cor4}06 1px, transparent 1px, transparent 5px),
                        repeating-linear-gradient(90deg, ${tema.cor4}04 0px, ${tema.cor4}04 1px, transparent 1px, transparent 5px)
                    `,
                }} />

                <motion.div
                    style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: isDesktop ? 16 : 10,
                        background: metallicSheen,
                    }}
                    animate={{
                        x: [-30, 30, -30],
                        opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                <div style={{
                    position: "absolute",
                    inset: 2,
                    borderRadius: isDesktop ? 14 : 8,
                    border: `1px solid ${tema.cor4}22`,
                    pointerEvents: "none",
                }} />

                {/* Topo */}
                <motion.div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: topoHeight,
                        background: `linear-gradient(
                            160deg, 
                            ${tema.cor2} 0%, 
                            ${tema.cor3} 40%, 
                            ${tema.cor2} 70%, 
                            ${tema.cor3} 100%
                        )`,
                        borderRadius: `${isDesktop ? 16 : 10}px ${isDesktop ? 16 : 10}px 0 0`,
                        borderBottom: `2px solid ${tema.cor4}88`,
                        overflow: "hidden",
                        zIndex: 5,
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
                    }}
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
                        height: 1,
                        background: `linear-gradient(90deg, transparent 0%, ${tema.cor4}66 50%, transparent 100%)`,
                    }} />
                    
                    <div style={{
                        position: "absolute",
                        top: isDesktop ? 8 : 3,
                        right: isDesktop ? 12 : 6,
                        width: isDesktop ? 16 : 10,
                        height: isDesktop ? 16 : 10,
                        borderRadius: "50%",
                        border: `2px solid ${tema.cor4}66`,
                        background: `radial-gradient(circle, ${tema.cor4}33, transparent)`,
                    }} />
                </motion.div>

                {/* Logo */}
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: logoSize,
                    height: logoSize,
                    borderRadius: "50%",
                    background: `radial-gradient(circle at 30% 30%, ${tema.cor2} 0%, ${tema.cor1} 80%, ${tema.cor3} 100%)`,
                    border: `2px solid ${tema.cor4}88`,
                    boxShadow: `
                        inset 0 -8px 20px rgba(0,0,0,0.2),
                        0 8px 30px ${tema.cor4}33
                    `,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2,
                }}>
                    <img
                        src={logo}
                        className="rounded-full"
                        alt="Logo"
                        style={{
                            width: "75%",
                            height: "75%",
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

                {/* Nome */}
                <motion.div
                    style={{
                        position: "absolute",
                        bottom: isDesktop ? 20 : 10,
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        fontSize: fontSizeNome,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        color: tema.cor4,
                        fontFamily: "'Inter', 'Segoe UI', -apple-system, sans-serif",
                        textShadow: `0 0 20px ${tema.cor4}22`,
                        letterSpacing: ".15em",
                        opacity: 0.85,
                    }}
                    animate={{
                        letterSpacing: [".15em", ".25em", ".15em"],
                        opacity: [0.8, 1, 0.8],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    {nomePacote}
                </motion.div>
            </div>
        </motion.div>
    );
};

// ═══════════════════════════════════════════════════════════════════
// 7. COMPONENTE PRINCIPAL - ModalShop
// ═══════════════════════════════════════════════════════════════════
export const ModalShop = ({ onCancelar }) => {
    const { dados, atualizarDados, atualizarDadosProf2 } = useContext(CentraldeDadosContext);
    const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);
    const { isMobile, isLandscape, isDesktop, windowWidth } = useDeviceDetection();
    const [buttonCloseAudio] = useSound(closeAudio);

    const [cartasSorteadas, setCartasSorteadas] = useState([]);
    const [showResultado, setShowResultado] = useState(false);
    const [erro, setErro] = useState("");
    const [packAberto, setPackAberto] = useState(null);
    const [particles, setParticles] = useState([]);

    // ─── CONFIGURAÇÕES RESPONSIVAS ──────────────────────────────
    const modalWidth = isDesktop ? '92vw' : '96vw';
    const modalMaxWidth = isDesktop ? '1200px' : '100%';
    const modalHeight = isDesktop ? '88vh' : '92vh';
    const alturaTopo = isDesktop ? '60px' : '45px';
    const fontSizeTitulo = isDesktop ? '26px' : (isLandscape ? '18px' : '16px');
    const fontSizeSaldo = isDesktop ? '14px' : (isLandscape ? '12px' : '11px');
    const fontSizePreco = isDesktop ? '14px' : (isLandscape ? '12px' : '11px');
    const fontSizeProb = isDesktop ? '11px' : (isLandscape ? '9px' : '8px');
    const paddingCard = isDesktop ? '16px' : (isLandscape ? '8px' : '6px');
    const gapCards = isDesktop ? '16px' : (isLandscape ? '10px' : '12px');
    const alturaBotao = isDesktop ? '38px' : (isLandscape ? '30px' : '28px');
    const fontSizeBotao = isDesktop ? '13px' : (isLandscape ? '10px' : '9px');
    const paddingBotao = isDesktop ? '6px 12px' : (isLandscape ? '3px 6px' : '2px 4px');

    const gridCols = isDesktop ? 4 : (isLandscape ? 2 : 1);

    const spawnParticles = useCallback((tema) => {
        const colors = [tema.cor4, tema.cor3, "#ffffff", `${tema.cor4}aa`, `${tema.cor3}88`];
        const count = isDesktop ? 50 : 25;
        const list = Array.from({ length: count }, (_, i) => {
            const angle = Math.random() * 2 * Math.PI;
            const dist = 60 + Math.random() * 150;
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
        setTimeout(() => setParticles([]), 1600);
    }, [isDesktop]);

    const comprarEAbirPacote = useCallback((tipo) => {
        const config = PACK_CONFIG[tipo];
        if (!config) return;

        const preco = PACK_PRICES[tipo] || 0;
        const saldoAtual = economiaSetores.saldo || 0;

        if (saldoAtual < preco) {
            setErro(`Saldo insuficiente! R$ ${preco.toLocaleString()}`);
            setTimeout(() => setErro(""), 3000);
            return;
        }

        setPackAberto(tipo);
        setShowResultado(false);

        const novoSaldo = saldoAtual - preco;
        atualizarEco("saldo", novoSaldo);

        const cartasSorteadasRank = sortearCartasDoPacote(tipo);
        if (cartasSorteadasRank.length === 0) {
            setErro("Nenhuma carta sorteada.");
            setTimeout(() => setErro(""), 3000);
            return;
        }

        const upgrades = gerarUpgrades(cartasSorteadasRank, dados);
        if (upgrades.length === 0) {
            setErro("Nenhum upgrade válido.");
            setTimeout(() => setErro(""), 3000);
            return;
        }

        upgrades.forEach((upgrade) => {
            const { setor, index } = upgrade;
            if (setor && index !== undefined) {
                const edificio = dados[setor]?.edificios?.[index];
                if (edificio) {
                    const novaQuantidade = (edificio.quantidade || 0) + 1;
                    atualizarDadosProf2([setor, "edificios", index, "quantidade"], novaQuantidade);
                }
            }
        });

        const cardsSorteadosAtuais = dados.CardsSorteados || [];
        const novosCardsSorteados = [...cardsSorteadosAtuais, ...upgrades];
        atualizarDados("CardsSorteados", novosCardsSorteados);

        setCartasSorteadas(upgrades);
        const tema = { cor1: config.cor1, cor2: config.cor2, cor3: config.cor3, cor4: config.cor4 };
        spawnParticles(tema);
        setShowResultado(true);
    }, [dados, atualizarDados, atualizarDadosProf2, economiaSetores.saldo, atualizarEco, spawnParticles]);

    const handleFechar = () => {
        setCartasSorteadas([]);
        setShowResultado(false);
        setErro("");
        setPackAberto(null);
        setParticles([]);
        buttonCloseAudio();
        if (onCancelar) onCancelar();
    };

    // ── RENDER DO RESULTADO ─────────────────────────────────────
    const renderResultado = () => {
        if (!showResultado || cartasSorteadas.length === 0) return null;

        const config = PACK_CONFIG[packAberto];
        const tema = {
            cor1: config?.cor1 || "#fff",
            cor2: config?.cor2 || "#333",
            cor3: config?.cor3 || "#666",
            cor4: config?.cor4 || "#888",
        };

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4"
                style={{
                    background: `radial-gradient(ellipse at 50% 30%, ${tema.cor1} 0%, #07070f 90%)`,
                }}
            >
                <div className="absolute inset-0 pointer-events-none">
                    <AnimatePresence>
                        {particles.map((p, i) => <Particle key={i} {...p} />)}
                    </AnimatePresence>
                </div>

                <h2 className="text-white font-bold mb-3 text-center"
                    style={{
                        fontSize: isDesktop ? '26px' : '18px',
                        textShadow: `0 0 40px ${tema.cor4}66`
                    }}
                >
                    🎉 Pacote {config?.nome || ''}
                </h2>

                <div className="flex flex-wrap gap-2 justify-center max-w-3xl">
                    {cartasSorteadas.map((carta, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -6, scale: 1.03 }}
                        >
                            {LocalizadorUpgrade(carta.nome, carta.redImposto || 0, carta.fatu || 0)}
                        </motion.div>
                    ))}
                </div>

                <button
                    onClick={handleFechar}
                    className="mt-3 rounded-full text-white font-bold transition-all hover:scale-105"
                    style={{
                        background: `linear-gradient(135deg, ${tema.cor4}, ${tema.cor3})`,
                        boxShadow: `0 4px 20px ${tema.cor4}44`,
                        fontSize: isDesktop ? '14px' : '12px',
                        padding: isDesktop ? '10px 32px' : '8px 20px',
                    }}
                >
                    Entendido ✓
                </button>
            </motion.div>
        );
    };

    // ── RENDER DOS PACOTES ──────────────────────────────────────
    const renderPacotes = () => {
        const tipos = ['comum', 'raro', 'epico', 'lendario'];
        const corRoxo = "#2D1B4E";

        return (
            <div 
                className="grid w-full max-h-[700px] h-full"
                style={{
                    gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                    gap: gapCards,
                    alignItems: 'stretch',
                }}
            >
                {tipos.map(tipo => {
                    const config = PACK_CONFIG[tipo];
                    const preco = PACK_PRICES[tipo];
                    const saldoAtual = economiaSetores.saldo || 0;
                    const podeComprar = saldoAtual >= preco;
                    const isBalanced = config.isBalanced || false;

                    const tema = {
                        cor1: config.cor1,
                        cor2: config.cor2,
                        cor3: config.cor3,
                        cor4: config.cor4,
                    };

                    const nomeDisplay = tipo === 'comum' ? 'Comum' : config.nome;

                    return (
                        <motion.div
                            key={tipo}
                            whileHover={isDesktop ? { scale: 1.02, y: -2 } : {}}
                            className="relative rounded-xl flex flex-col"
                            style={{
                                background: `linear-gradient(145deg, ${config.cor2} 0%, ${config.cor1} 100%)`,
                                border: `2px solid ${config.cor4}66`,
                                boxShadow: `0 6px 24px ${config.cor4}33`,
                                padding: paddingCard,
                                height: '100%',
                            }}
                        >


                            {/* PACOTE VISUAL */}
                            <div className="w-full flex justify-center flex-shrink-0 my-1">
                                <PacoteVisual
                                    tema={tema}
                                    tipo={tipo}
                                    onClick={() => comprarEAbirPacote(tipo)}
                                    isMobile={isMobile}
                                    isLandscape={isLandscape}
                                />
                            </div>

                            {/* INFORMAÇÕES */}
                            <div className="w-full flex flex-col items-center gap-0.5 flex-1 justify-between">
                                <span className="text-white/60 font-medium"
                                    style={{ fontSize: isDesktop ? '13px' : (isLandscape ? '9px' : '10px') }}
                                >
                                    {config.quantidade} cartas
                                </span>

                                <div className="w-2/3 h-px bg-white/10"></div>

                                {/* Probabilidades - Grid 2 colunas */}
                                <div className="w-full grid grid-cols-2 gap-x-1 gap-y-0 px-1"
                                    style={{ fontSize: fontSizeProb }}
                                >
                                    {Object.entries(config.probabilidades).map(([rank, prob]) => (
                                        <React.Fragment key={rank}>
                                            <span className="font-bold text-right" style={{ color: corRoxo }}>
                                                Rank {rank}
                                            </span>
                                            <span className="font-bold text-left" style={{ color: corRoxo }}>
                                                {prob}%
                                            </span>
                                        </React.Fragment>
                                    ))}
                                </div>

                                <div className="w-2/3 h-px bg-white/10"></div>

                                {/* Preço */}
                                <span className={`font-bold ${podeComprar ? 'text-green-400' : 'text-red-400'}`}
                                    style={{ fontSize: fontSizePreco }}
                                >
                                    R$ {preco.toLocaleString()}
                                </span>

                                {/* BOTÃO COMPRAR */}
                                <div className="w-full mt-0.5 flex-shrink-0">
                                    <button
                                        className={`w-full rounded-lg font-bold transition-all ${
                                            podeComprar
                                                ? 'hover:scale-105 active:scale-95 hover:shadow-lg'
                                                : 'opacity-50 cursor-not-allowed'
                                        }`}
                                        style={{
                                            background: podeComprar
                                                ? `linear-gradient(135deg, ${config.cor4}, ${config.cor3})`
                                                : '#444444',
                                            color: '#ffffff',
                                            minHeight: alturaBotao,
                                            fontSize: fontSizeBotao,
                                            letterSpacing: "0.05em",
                                            padding: paddingBotao,
                                            border: podeComprar ? `1px solid ${config.cor4}88` : '1px solid #555',
                                            textShadow: podeComprar ? '0 1px 4px rgba(0,0,0,0.3)' : 'none',
                                        }}
                                        onClick={() => comprarEAbirPacote(tipo)}
                                        disabled={!podeComprar}
                                    >
                                        {podeComprar ? '🛒 COMPRAR' : 'SALDO INSUFICIENTE'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        );
    };

    // ── RENDER PRINCIPAL ────────────────────────────────────────
    return (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative rounded-2xl"
                style={{
                    width: modalWidth,
                    maxWidth: modalMaxWidth,
                    height: modalHeight,
                    background: "linear-gradient(145deg, #1a0a3b 0%, #0d0520 100%)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    boxShadow: "0 20px 80px rgba(0,0,0,0.8)",
                }}
            >
                {/* Botão Fechar */}
                <button
                    className="absolute top-2 right-2 z-30 flex items-center justify-center rounded-full hover:scale-110 active:scale-95 transition-all"
                    style={{
                        width: isDesktop ? '40px' : '28px',
                        height: isDesktop ? '40px' : '28px',
                        background: "rgba(255,255,255,0.1)",
                    }}
                    onClick={handleFechar}
                >
                    <img src={fechar} alt="Fechar" className={isDesktop ? "w-5 h-5" : "w-3 h-3"} />
                </button>

                {/* Título */}
                <div className="flex items-center justify-center border-b border-white/5"
                    style={{ height: alturaTopo }}
                >
                    <h1 className="text-white font-bold tracking-wider"
                        style={{ fontSize: fontSizeTitulo }}
                    >
                        🏪 Loja de Pacotes
                    </h1>
                </div>

                {/* Saldo */}
                <div className="absolute top-2 left-2 z-10 px-2 py-1 rounded-full bg-black/40 border border-white/10"
                    style={{
                        fontSize: isDesktop ? '13px' : '9px',
                        padding: isDesktop ? '6px 16px' : '2px 8px',
                    }}
                >
                    <span className="text-white/60">💰 Saldo: </span>
                    <span className="text-green-400 font-bold"
                        style={{ fontSize: fontSizeSaldo }}
                    >
                        R$ {(economiaSetores.saldo || 0).toLocaleString()}
                    </span>
                </div>

                {/* Conteúdo */}
                <div className="overflow-y-auto"
                    style={{
                        height: `calc(100% - ${alturaTopo})`,
                        padding: isDesktop ? '16px' : '6px',
                    }}
                >
                    {!showResultado ? (
                        <>
                            {erro && (
                                <div className="mb-2 p-1.5 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-center"
                                    style={{ fontSize: isDesktop ? '13px' : '10px' }}
                                >
                                    {erro}
                                </div>
                            )}
                            {renderPacotes()}
                        </>
                    ) : (
                        renderResultado()
                    )}
                </div>
            </motion.div>
        </div>
    );
};