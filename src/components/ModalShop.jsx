// ModalShop.jsx
import React, { useState, useCallback, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import fechar from "../../public/outrasImagens/fechar.png";
import logo from '../../public/outrasImagens/logo Joguinho.png';
import useSound from "use-sound";
import closeAudio from "../../public/sounds/closeAudio.mp3";
import { LocalizadorUpgrade } from "./LocalizadorUpgrade";
import { useSlotVerification } from "./SlotManager";

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
    "Fábrica De Consoles De Jogos", "Fábrica De Dispositivos Vestiveis",
    "Centro De Pesquisa Em Fusão Nuclear", "Centro De Pesquisa Aeroespacial",
    "Centro De Engenharia Avançada", "Centro De Pesquisa Em Materiais",
    "Centro De Pesquisa Em IA", "Mineradora De Pedras Preciosas", "Mega Mercado",
    "Prédio De Alto Padrão", "Tanque De Armazenamento Biocombustível",
    "Fábrica De Plásticos", "Fábrica De Químicos Especializados", "Alto-Forno",
    "Usina Siderúrgica", "Fundição De Alumínio", "Fábrica De Ligas Metálicas",
    "Fábrica De Peças Automotivas", "Refinaria De Biocombustíveis", "Biofábrica",
    "Fábrica De Eletrônicos", "Empresa De Automação Industrial", "Estaleiro"
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
const PacoteVisual = ({ tema, tipo, onClick }) => {
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

            {/* Sombra de base premium */}
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
                {/* Textura premium */}
                <div style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 20,
                    backgroundImage: `
            repeating-linear-gradient(0deg, ${tema.cor4}06 0px, ${tema.cor4}06 1px, transparent 1px, transparent 6px),
            repeating-linear-gradient(90deg, ${tema.cor4}04 0px, ${tema.cor4}04 1px, transparent 1px, transparent 6px)
          `,
                }} />

                {/* Brilho metálico dinâmico */}
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

                {/* Borda interna com brilho */}
                <div style={{
                    position: "absolute",
                    inset: 3,
                    borderRadius: 18,
                    border: `1px solid ${tema.cor4}22`,
                    pointerEvents: "none",
                }} />

                {/* Topo com efeito de ouro/platina */}
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

                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    {/* Brilho do topo */}
                    <div style={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(135deg, transparent 20%, ${tema.cor4}33 50%, transparent 80%)`,
                    }} />

                    {/* Detalhe da borda superior */}
                    <div style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: `linear-gradient(90deg, transparent 0%, ${tema.cor4}66 50%, transparent 100%)`,
                    }} />

                    {/* Traço decorativo do topo */}
                    <div style={{
                        position: "absolute",
                        bottom: 0,
                        left: 20,
                        right: 20,
                        height: 2,
                        background: `repeating-linear-gradient(90deg, ${tema.cor4} 0px, ${tema.cor4} 8px, transparent 8px, transparent 16px)`,
                        opacity: 0.4,
                    }} />

                    {/* Selo/emblema */}
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

                {/* Logo Premium com efeito 3D */}
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

                    {/* Brilho no logo */}
                    <div style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        background: `radial-gradient(circle at 30% 20%, ${tema.cor4}44, transparent 70%)`,
                        pointerEvents: "none",
                    }} />
                </div>

                {/* Estrelas decorativas refinadas */}
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

                {/* Nome do Pacote */}
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

                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    {nomePacote}
                </motion.div>

                {/* Barra decorativa inferior */}
                <div style={{
                    position: "absolute",
                    bottom: 60,
                    left: 40,
                    right: 40,
                    height: 1,
                    background: `linear-gradient(90deg, transparent 0%, ${tema.cor4}33 50%, transparent 100%)`,
                }} />
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
    const [buttonCloseAudio] = useSound(closeAudio);
const verificarAcao = useSlotVerification();
const { permitido, excedente } = verificarAcao();

    const [cartasSorteadas, setCartasSorteadas] = useState([]);
    const [showResultado, setShowResultado] = useState(false);
    const [erro, setErro] = useState("");
    const [packAberto, setPackAberto] = useState(null);
    const [particles, setParticles] = useState([]);

    const spawnParticles = useCallback((tema) => {
        const colors = [tema.cor4, tema.cor3, "#ffffff", `${tema.cor4}aa`, `${tema.cor3}88`];
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
    }, []);

    const comprarEAbirPacote = useCallback((tipo) => {
        const config = PACK_CONFIG[tipo];
        if (!config) return;

        const preco = PACK_PRICES[tipo] || 0;
        const saldoAtual = economiaSetores.saldo || 0;

        if (saldoAtual < preco) {
            setErro(`Saldo insuficiente! Você precisa de R$ ${preco.toLocaleString()}`);
            setTimeout(() => setErro(""), 3000);
            return;
        }

        setPackAberto(tipo);
        setShowResultado(false);

        // Debita o valor
        const novoSaldo = saldoAtual - preco;
        atualizarEco("saldo", novoSaldo);

        const cartasSorteadasRank = sortearCartasDoPacote(tipo);
        if (cartasSorteadasRank.length === 0) {
            setErro("Nenhuma carta sorteada. Tente novamente.");
            setTimeout(() => setErro(""), 3000);
            return;
        }

        const upgrades = gerarUpgrades(cartasSorteadasRank, dados);
        if (upgrades.length === 0) {
            setErro("Nenhum upgrade válido encontrado.");
            setTimeout(() => setErro(""), 3000);
            return;
        }

        upgrades.forEach((upgrade) => {
            const { setor, index, nome } = upgrade;
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

        // Spawn partículas
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

    // ── RENDER DO RESULTADO ──────────────────────────────────────
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
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <AnimatePresence>
                        {particles.map((p, i) => <Particle key={i} {...p} />)}
                    </AnimatePresence>
                </div>

                <h2 className="text-white text-2xl font-bold mb-[30px]"
                    style={{ textShadow: `0 0 40px ${tema.cor4}66` }}
                >
                    🎉 Pacote {config?.nome || ''}
                </h2>

                <div className="flex flex-wrap gap-3 justify-center max-w-3xl">
                    {cartasSorteadas.map((carta, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -8, scale: 1.05 }}
                        >
                            {LocalizadorUpgrade(carta.nome, carta.redImposto || 0, carta.fatu || 0)}
                        </motion.div>
                    ))}
                </div>

                <button
                    onClick={handleFechar}
                    className="mt-6 px-8 py-2 rounded-full text-white font-bold text-sm transition-all hover:scale-105"
                    style={{
                        background: `linear-gradient(135deg, ${tema.cor4}, ${tema.cor3})`,
                        boxShadow: `0 4px 20px ${tema.cor4}44`,
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

    return (
        <div className="grid grid-cols-4 gap-6 w-full h-full">
            {tipos.map(tipo => {
                const config = PACK_CONFIG[tipo];
                const preco = PACK_PRICES[tipo];
                const saldoAtual = economiaSetores.saldo || 0;
                const podeComprar = saldoAtual >= preco;
                const corRoxo = "#2D1B4E";

                const tema = {
                    cor1: config.cor1,
                    cor2: config.cor2,
                    cor3: config.cor3,
                    cor4: config.cor4,
                };

                return (
                    <motion.div
                        key={tipo}
                        whileHover={{ scale: 1.02, y: -4 }}
                        className="relative rounded-xl overflow-hidden h-[90%]"
                        style={{
                            background: `linear-gradient(145deg, ${config.cor2} 0%, ${config.cor1} 100%)`,
                            border: `2px solid ${config.cor4}66`,
                            boxShadow: `0 8px 32px ${config.cor4}33`,
                            display: "flex",
                            flexDirection: "column",
                            minHeight: "400px",
                        }}
                    >
                        {/* Conteúdo com justify-between para ocupar toda altura */}
                        <div className="flex-1 p-5 flex flex-col justify-between items-center">
                            {/* TOPO: Pacote Visual */}
                            <div className="w-full flex justify-center">
                                <PacoteVisual
                                    tema={tema}
                                    tipo={tipo}
                                    onClick={() => comprarEAbirPacote(tipo)}
                                />
                            </div>

                            {/* MEIO: Informações */}
                            <div className="w-full flex flex-col items-center gap-2 mt-3">
                                {/* Quantidade de cartas */}
                                <span className="text-white/60 text-sm font-medium">
                                    {config.quantidade} cartas
                                </span>

                                {/* Linha divisória */}
                                <div className="w-3/4 h-px bg-white/10"></div>

                                {/* Probabilidades - EM ROXO ESCURO */}
                                <div className="w-full text-sm space-y-1 px-2">
                                    {Object.entries(config.probabilidades).map(([rank, prob]) => (
                                        <div key={rank} className="flex justify-between items-center">
                                            <span className="font-bold text-sm" style={{ color: corRoxo }}>Rank {rank}</span>
                                            <span className="font-bold text-sm" style={{ color: corRoxo }}>{prob}%</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Linha divisória */}
                                <div className="w-3/4 h-px bg-white/10"></div>

                                {/* Preço */}
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-white/50 text-sm"></span>
                                    <span className={`text-base font-bold ${podeComprar ? 'text-green-400' : 'text-red-400'}`}>
                                        R$ {preco.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            {/* BOTÃO: Comprar na parte inferior - DOBRO DA ALTURA E FONTE MAIOR */}
                            <div className="w-full mt-3">
                                <button
                                    className={`w-full py-3 rounded-lg text-sm font-bold transition-all ${podeComprar
                                        ? 'hover:scale-105 active:scale-95'
                                        : 'opacity-50 cursor-not-allowed'
                                    }`}
                                    style={{
                                        background: podeComprar
                                            ? `linear-gradient(135deg, ${config.cor4}, ${config.cor3})`
                                            : '#333',
                                        color: '#fff',
                                        minHeight: "44px",
                                        fontSize: "15px",
                                        letterSpacing: "0.05em",
                                    }}
                                    onClick={() => comprarEAbirPacote(tipo)}
                                    disabled={!podeComprar}
                                >
                                     Comprar
                                </button>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

// ── RENDER PRINCIPAL ──────────────────────────────────────────
return (
    <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center">
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-[92vw] max-w-[1300px] h-[88vh] rounded-2xl overflow-hidden"
            style={{
                background: "linear-gradient(145deg, #1a0a3b 0%, #0d0520 100%)",
                border: "1px solid rgba(255,255,255,0.05)",
                boxShadow: "0 20px 80px rgba(0,0,0,0.8)",
            }}
        >
            {/* Botão Fechar */}
            <button
                className="absolute top-4 right-4 z-30 w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 active:scale-95 transition-all"
                style={{ background: "rgba(255,255,255,0.1)" }}
                onClick={handleFechar}
            >
                <img src={fechar} alt="Fechar" className="w-6 h-6" />
            </button>

            {/* Título */}
            <div className="flex items-center justify-center h-[70px] border-b border-white/5">
                <h1 className="text-white text-3xl font-bold tracking-wider">
                    🏪 Loja de Pacotes
                </h1>
            </div>

            {/* Saldo do Jogador */}
            <div className="absolute top-4 left-4 z-10 px-5 py-2 rounded-full bg-black/40 border border-white/10">
                <span className="text-white/60 text-sm">💰 Saldo: </span>
                <span className="text-green-400 font-bold text-base">
                    R$ {(economiaSetores.saldo || 0).toLocaleString()}
                </span>
            </div>

            {/* Conteúdo */}
            <div className="h-[calc(100%-70px)] p-6 overflow-y-auto">
                {!showResultado ? (
                    <>
                        {/* Mensagem de erro */}
                        {erro && (
                            <div className="mb-4 p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-sm text-center">
                                {erro}
                            </div>
                        )}

                        {/* Grid de pacotes */}
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