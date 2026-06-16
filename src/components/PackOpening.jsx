// PackOpening.jsx
import React, { useState, useCallback, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LocalizadorUpgrade } from "./LocalizadorUpgrade";
import logo from '../../public/outrasImagens/logo Joguinho.png'
import { CentraldeDadosContext } from "../centralDeDadosContext";
import useSound from "use-sound";
import closeAudio from "../../public/sounds/closeAudio.mp3";
const getRaridade = (custo) => {
    if (custo >= 5_000_000) return "lendario";
    if (custo >= 500_000) return "epico";
    if (custo >= 100_000) return "raro";
    if (custo >= 20_000) return "incomum";
    return "comum";
};

const SETORES_CONFIG = [
    { id: "agricultura", cor1: "#003816", cor2: "#1A5E2A", cor3: "#0C9123", cor4: "#4CAF50" },
    { id: "tecnologia", cor1: "#A64B00", cor2: "#D45A00", cor3: "#FF6F00", cor4: "#FF8C42" },
    { id: "industria", cor1: "#1A1A1A", cor2: "#4D4D4D", cor3: "#808080", cor4: "#B3B3B3" },
    { id: "comercio", cor1: "#660000", cor2: "#A31919", cor3: "#E60000", cor4: "#FF4D4D" },
    { id: "imobiliario", cor1: "#000066", cor2: "#1A1A8C", cor3: "#3333CC", cor4: "#6666FF" },
    { id: "energia", cor1: "#665200", cor2: "#A37F19", cor3: "#E6B800", cor4: "#FFD966" },
];

const RARIDADE_STARS = { comum: 1, incomum: 2, raro: 3, epico: 4, lendario: 5 };
const RARIDADE_LABEL = { comum: "Comum", incomum: "Incomum", raro: "Raro", epico: "Épico", lendario: "Lendário" };

const getImageUrl = (nome) => `/imagens/${nome}.png`;

// ── Partículas ───────────────────────────────────────────
const Particle = ({ x, y, color, dx, dy, delay }) => (
    <motion.div
        style={{
            position: "absolute", left: x, top: y,
            width: 5, height: 5, borderRadius: "50%",
            background: color, pointerEvents: "none",
        }}
        initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        animate={{ opacity: 0, x: dx, y: dy, scale: 0 }}
        transition={{ duration: 0.9 + Math.random() * 0.4, delay, ease: "easeOut" }}
    />
);

const PACK_THEME = {
    cor1: "#6411D9",
    cor2: "#350973",
    cor3: "#F27405",
    cor4: "#8F5ADA",
};

const setoresArr = [
    "agricultura",
    "tecnologia",
    "comercio",
    "industria",
    "imobiliario",
    "energia",
];
const todasCartas = [
    "Usina Hidrelétrica",
    "Reator Nuclear Convencional",
    "Usina De Fusão Nuclear",
    "Shopping Popular",
    "Shopping Center",
    "Fábrica De Computadores",
    "Construtora De Infraestruturas",
    "Aeroporto",
    "Porto",
    "Mineradora Radioativa",
    "Plataforma De Petróleo",
    "Montadora De Veículos Elétricos",
    "Fábrica De Automóveis",
    "Refinaria",
    "Fábrica De Chips",
    "Fábrica De Semicondutores",
    "Fábrica De Robôs",
    "Fábrica De Motores",
    "Fábrica De Foguetes",
    "Fábrica De Aeronaves",
    "Cooperativa Agrícola",
    "Usina De Biomassa",
    "Transporte Petrolífero",
    "Marketplace Online",
    "Plataforma De Streaming",
    "Fábrica De Smartphones",
    "Fábrica De Consoles De Jogos",
    "Fábrica De Dispositivos Vestiveis",
    "Centro De Pesquisa Em Fusão Nuclear",
    "Centro De Pesquisa Aeroespacial",
    "Centro De Engenharia Avançada",
    "Centro De Pesquisa Em Materiais Avançados",
    "Centro De Pesquisa Em IA",
    "Mineradora De Pedras Preciosas",
    "Mega Mercado",
    "Prédio De Alto Padrão",
    "Tanque De Armazenamento Biocombustível",
    "Fábrica De Plásticos",
    "Fábrica De Químicos Especializados",
    "Alto-Forno",
    "Usina Siderúrgica",
    "Fundição De Alumínio",
    "Fábrica De Ligas Metálicas",
    "Fábrica De Peças Automotivas",
    "Refinaria De Biocombustíveis",
    "Biofábrica",
    "Fábrica De Eletrônicos",
    "Empresa De Automação Industrial",
    "Estaleiro",
    "Centro De Comércio De Plantações",
    "Empresa De Comercio Energético",
    "Empresa De Consultoria Energética",
    "Centro De Pesquisa Em Energias Renováveis",
    "Centro De Pesquisa Energética",
    "Usina Termelétrica A Biocombustíveis",
    "Usina De Biomassa",
    "Usina Termolétrica",
    "Joalheria",
    "Concessionária De Veículos",
    "Centro De Distribuição",
    "Armazém Logístico",
    "Servidor Em Nuvem",
    "Data Center",
    "Empresa De Desenvolvimento De Software",
    "Empresa De Jogos Digitais",
    "Empresa De Telecomunicações",
    "Plataforma De Redes Sociais",
    "Marketplace Online",
    "Instituto De Tecnologia Alimentar",
    "Centro De Pesquisa Agrícola",
    "Instituto De Biotecnologia",
    "Laboratório De Nanotecnologia",
    "Centro De Pesquisa Em Eletrônicos",
    "Laboratório De Design De Produtos",
    "Laboratório De Novos Combustíveis",
    "Centro De Engenharia Avançada",
    "Centro De Pesquisa Em Robótica",
    "Construtora",
    "Imobiliária Residencial",
    "Imobiliária Comercial",
    "Mineradora",
    "Centro De Coleta De Biomassa",
    "Fábrica De Fertilizante",
    "Fábrica De Medicamentos",
    "Laboratório Farmacêutico",
    "Fábrica De Plásticos",
    "Alto-Forno",
    "Indústria De Componentes Mecânicos",
    "Fábrica De Chapas Metálicas",
    "Fábrica De Estruturas Metálicas",
    "Fábrica De Peças Automotivas",
    "Fábrica De Placas Eletrônicas",
    "Fábrica De Eletrônicos",
    "Plantação De Grãos",
    "Plantação De Vegetais",
    "Pomares",
    "Fazenda Administrativa",
    "Fazenda De Vacas",
    "Granja De Aves",
    "Criação De Ovinos",
    "Armazém",
    "Silo",
    "Depósito De Resíduos Orgânicos",
    "Madeireira",
    "Área Florestal",
    "Terreno De Mineração",
    "Plantação De Eucalipto",
    "Plantação De Plantas Medicinais",
    "Subestação De Energia",
    "Rede De Distribuição Elétrica",
    "Usina Solar",
    "Fábrica De Turbinas Eólicas",
    "Fábrica De Painéis Solares",
    "Fábrica De Baterias",
    "Estação De Carregamento",
    "Centro De Reciclagem De Baterias",
    "Parque Eólico",
    "Feira",
    "Loja De Móveis",
    "Restaurante",
    "Livraria",
    "Mercado",
    "Adega",
    "Padaria",
    "Açougue",
    "Loja De Conveniência",
    "Posto De Combustíveis",
    "Redes De Fast-food",
    "Petshop",
    "Farmácia",
    "Cafeteria",
    "Loja De Departamentos",
    "Loja De Calçados",
    "Loja De Vestuário",
    "Loja De Gadgets E Wearables",
    "Loja De Games",
    "Loja De Celulares",
    "Loja De Informática",
    "Loja De Eletrônicos",
    "Centro De Transporte E Entrega",
    "Startup",
    "Centro De Pesquisa Química",
    "Cartório E Licenças",
    "Terraplanagem E Pavimentação",
    "Construtora De Pequenas Obras",
    "Escritório De Design De Interiores",
    "Escritório De Arquitetura",
    "Consultoria Em Engenharia Civil",
    "Fábrica De Móveis",
    "Fábrica De Ração",
    "Fábrica De Embalagem",
    "Fábrica De Bebidas",
    "Fábrica De Pães",
    "Fábrica Textil",
    "Fábrica De Calçados",
    "Fábrica De Roupas",
    "Fábrica De Celulose",
    "Fábrica De Papel",
    "Fábrica De Livros",
];

const getRandomItems = (array, n) => {
    const copy = [...array];
    const result = [];
    for (let i = 0; i < n && copy.length > 0; i++) {
        const idx = Math.floor(Math.random() * copy.length);
        result.push(copy[idx]);
        copy.splice(idx, 1);
    }
    return result;
};

const randomBonus = () => Math.floor(Math.random() * 10) + 1;


// ── Pacote visual ─────────────────────────────────────────
const Pacote = ({ fase, onOpen, tema }) => {
    const packGradient = `linear-gradient(160deg, ${tema.cor1} 0%, ${tema.cor2} 30%, ${tema.cor3} 60%, ${tema.cor2} 80%, ${tema.cor1} 100%)`;

    return (
        <motion.div
            style={{ position: "relative", width: 160, height: 260, cursor: "pointer" }}
            onClick={onOpen}
            animate={
                fase === "shaking"
                    ? { rotate: [0, -4, 4, -4, 4, -3, 3, 0], scale: [1, 1.04, 1.04, 1.04, 1.04, 1.04, 1.04, 1] }
                    : fase === "opening"
                        ? { y: -80, opacity: 0, scale: 0.85 }
                        : { rotate: 0, scale: 1 }
            }
            transition={
                fase === "shaking"
                    ? { duration: 0.6, times: [0, .1, .25, .4, .55, .7, .85, 1] }
                    : { duration: 0.5, ease: "easeInOut" }
            }
            exit={{ y: -100, opacity: 0, scale: 0.8, transition: { duration: 0.4 } }}
            whileHover={fase === "idle" ? { scale: 1.04, y: -4 } : {}}
        >
            <div style={{
                position: "absolute", inset: 0, borderRadius: 16,
                background: packGradient,
                border: `2px solid ${tema.cor4}`,
                boxShadow: `0 20px 60px ${tema.cor4}44`,
                overflow: "hidden",
            }}>
                {/* Textura */}
                <div style={{
                    position: "absolute", inset: 0, borderRadius: 16,
                    backgroundImage: `repeating-linear-gradient(0deg, ${tema.cor4}08 0px, ${tema.cor4}08 1px, transparent 1px, transparent 8px)`,
                }} />

                {/* Shine animado */}
                <motion.div
                    style={{
                        position: "absolute", inset: 0, borderRadius: 16,
                        background: `linear-gradient(135deg, transparent 30%, ${tema.cor4}22 50%, transparent 70%)`,
                    }}
                    animate={{ x: [-30, 30, -30] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Topo destacável */}
                <motion.div
                    style={{
                        position: "absolute", top: 0, left: 0, right: 0, height: 52,
                        background: `linear-gradient(160deg, ${tema.cor2} 0%, ${tema.cor3} 50%, ${tema.cor2} 100%)`,
                        borderRadius: "16px 16px 0 0",
                        borderBottom: `2px dashed ${tema.cor4}66`,
                        transformOrigin: "top center",
                        overflow: "hidden",
                        zIndex: 5,
                    }}
                    animate={fase === "opening"
                        ? { rotateX: -120, y: -20, opacity: 0 }
                        : { rotateX: 0, y: 0, opacity: 1 }
                    }
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                    <div style={{
                        position: "absolute", inset: 0,
                        background: `linear-gradient(135deg, transparent 20%, ${tema.cor4}33 50%, transparent 80%)`,
                    }} />
                    <div style={{
                        position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
                        background: `repeating-linear-gradient(90deg, ${tema.cor4} 0px, ${tema.cor4} 6px, transparent 6px, transparent 12px)`,
                        opacity: 0.5,
                    }} />
                </motion.div>

                {/* Logo */}
                <div style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 80, height: 80, borderRadius: "50%",
                    background: `radial-gradient(circle, ${tema.cor2} 0%, ${tema.cor1} 70%)`,
                    border: `2px solid ${tema.cor4}66`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 36,

                }}>
                    <img src={logo} className="rounded-full" />
                </div>

                <div style={{
                    position: "absolute", top: 60, left: 0, right: 0,
                    textAlign: "center", fontSize: 10,
                    color: tema.cor4, letterSpacing: 3,
                }}>★ ★ ★</div>

                <div style={{
                    position: "absolute", bottom: 18, left: 0, right: 0,
                    textAlign: "center", fontSize: 11, fontWeight: 800,
                    textTransform: "uppercase", letterSpacing: ".15em",
                    color: tema.cor4,
                }}>
                    Business Game
                </div>
            </div>
        </motion.div>
    );
};

// ── Componente principal ──────────────────────────────────
export const PackOpening = ({ tema = PACK_THEME, onClose, onSorteio }) => {

    const { dados, atualizarDados, atualizarDadosProf2 } = useContext(CentraldeDadosContext);
    const [cartasSorteadas, setCartasSorteadas] = useState([]);
    const [fase, setFase] = useState("idle");
    const [particles, setParticles] = useState([]);
    const [modal, setModal] = useState(false);
    const [buttonCloseAudio] = useSound(closeAudio);
    const fecharModal = () => {
        setModal(false);
    };

    // useEffect(() => {
    //   console.log("CardsSorteados mudou:", dados.CardsSorteados);
    // }, [dados.CardsSorteados]);




    const spawnParticles = useCallback(() => {
        const colors = [
            tema.cor4,
            tema.cor3,
            "#ffffff",
            `${tema.cor4}aa`,
        ];

        const list = Array.from({ length: 40 }, (_, i) => {
            const angle = Math.random() * 2 * Math.PI;
            const dist = 60 + Math.random() * 160;

            return {
                id: i,
                x: "50%",
                y: "20%",
                color: colors[Math.floor(Math.random() * colors.length)],
                dx: Math.cos(angle) * dist,
                dy: Math.sin(angle) * dist,
                delay: Math.random() * 0.2,
            };
        });

        setParticles(list);

        setTimeout(() => setParticles([]), 1500);
    }, [tema]);

    const handleOpen = () => {
        if (fase !== "idle") return;

        const cartas = getRandomItems(todasCartas, 5);

        const upgrades = cartas
            .map((nome) => {
                for (const setor of setoresArr) {
                    const edificio = dados[setor]?.edificios?.find(
                        (ed) => ed.nome === nome
                    );

                    if (edificio) {
                        return {
                            nome,
                            fatu: randomBonus(),
                            redImposto: randomBonus(),
                        };
                    }
                }

                return null;
            })
            .filter(Boolean);

        upgrades.forEach((upgrade) => {
            const { nome, fatu, redImposto } = upgrade;

            let setorEncontrado = null;
            let indexEncontrado = -1;

            // Procura o edifício em todos os setores
            for (const setor of setoresArr) {
                const index = dados[setor]?.edificios?.findIndex(
                    (ed) => ed.nome === nome
                );

                if (index !== -1) {
                    setorEncontrado = setor;
                    indexEncontrado = index;
                    break;
                }
            }

            console.log("====================================");
            console.log("Processando upgrade:", nome);
            console.log("Setor encontrado:", setorEncontrado);
            console.log("Index encontrado:", indexEncontrado);

            if (!setorEncontrado || indexEncontrado === -1) {
                console.error("❌ Não foi possível localizar:", nome);
                return;
            }

            const edificio =
                dados[setorEncontrado]?.edificios?.[indexEncontrado];

            console.log("Edifício encontrado:", edificio);

            const valorFatuUnitarioAntigo =
                edificio?.finanças?.faturamentoUnitário ?? 0;

            const valorImpostoFixoAntigo =
                edificio?.finanças?.impostoFixo ?? 0;

            const novoValorFatu =
                valorFatuUnitarioAntigo * (1 + fatu / 100);

            const novoImpostoFixo =
                valorImpostoFixoAntigo * (1 - redImposto / 100);

            console.log("Faturamento antigo:", valorFatuUnitarioAntigo);
            console.log("Faturamento novo:", novoValorFatu);

            console.log("Imposto antigo:", valorImpostoFixoAntigo);
            console.log("Imposto novo:", novoImpostoFixo);

            atualizarDadosProf2(
                [
                    setorEncontrado,
                    "edificios",
                    indexEncontrado,
                    "finanças",
                    "faturamentoUnitário",
                ],
                novoValorFatu
            );

            atualizarDadosProf2(
                [
                    setorEncontrado,
                    "edificios",
                    indexEncontrado,
                    "finanças",
                    "impostoFixo",
                ],
                novoImpostoFixo
            );
        });

        setCartasSorteadas(upgrades);

        console.log("cartas sorteadas", cartas);
        console.log("upgrades", upgrades);

        atualizarDados("CardsSorteados", upgrades);

        setFase("shaking");
        setTimeout(() => setFase("opening"), 700);
        setTimeout(() => spawnParticles(), 1000);
        setTimeout(() => setFase("revealed"), 1300);

        console.log(upgrades)
    };

    useEffect(() => {
        if (dados.dia % 500 === 0) {
            setModal(true);
        }
    }, [dados.dia]);

    if (modal) {
        return (
            <div style={{
                position: "fixed", inset: 0, zIndex: 200,
                background: "radial-gradient(ellipse at 50% 30%, #1a0a2e 0%, #07070f 70%)",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: 24, padding: 32,
            }}>

                {/* Partículas */}
                <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
                    <AnimatePresence>
                        {particles.map(p => <Particle key={p.id} {...p} />)}
                    </AnimatePresence>
                </div>

                {/* Fechar */}


                {/* Pacote */}
                <AnimatePresence>
                    {fase !== "revealed" && (
                        <Pacote
                            key="pacote"
                            fase={fase}
                            onOpen={handleOpen}
                            tema={tema}
                        />
                    )}
                </AnimatePresence>

                {/* Hint */}
                <AnimatePresence>
                    {fase === "idle" && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            style={{
                                fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase",
                                color: `${tema.cor4}88`,
                            }}
                        >
                            Clique no pacote para abrir
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Botão abrir */}
                <AnimatePresence>
                    {fase === "idle" && (
                        <motion.button
                            onClick={handleOpen}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                padding: "12px 36px", borderRadius: 10, border: "none",
                                background: `linear-gradient(135deg, ${tema.cor4} 0%, ${tema.cor3} 100%)`,
                                color: tema.cor1, fontSize: 13, fontWeight: 800,
                                letterSpacing: ".1em", textTransform: "uppercase",
                                cursor: "pointer",
                                boxShadow: `0 4px 20px ${tema.cor4}44`,
                            }}
                        >
                            Abrir Pacote
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Cartas reveladas */}
                <AnimatePresence>
                    {fase === "revealed" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}
                        >
                            <div className="m-auto top-[150px] fixed">
                                <h1 className="text-white fonteBold text-[25px]">Essas cartas estão aprimoradas até o fim do jogo</h1>
                            </div>
                            {cartasSorteadas.map((carta, i) => (
                                <motion.div
                                    key={`${carta.nome}-${i}`}
                                    initial={{ opacity: 0, y: 60, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{
                                        delay: 0.1 + i * 0.18,
                                        duration: 0.5,
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 18,
                                    }}
                                >
                                    {LocalizadorUpgrade(
                                        carta.nome,
                                        carta.redImposto,
                                        carta.fatu
                                    )}
                                </motion.div>
                            ))}
                            {/* <button
                           
                            style={{
                                position: "absolute", top: 20, right: 20, zIndex: 10,
                                background: `${tema.cor2}aa`, border: `1px solid ${tema.cor4}44`,
                                borderRadius: 8, color: tema.cor4, fontSize: 11, fontWeight: 700,
                                padding: "6px 14px", cursor: "pointer",
                                textTransform: "uppercase", letterSpacing: ".08em",
                            }}
                        >
                            Entendido
                        </button> */}
                            <div className="m-auto bottom-[240px] fixed">
                                <h1 className="text-white fonteLight text-[25px]">para reve-los basta clicar no botão ⬆️</h1>
                            </div>
                            <button
                                className="fixed m-auto bottom-[150px] text-white bg-laranja px-[25px] py-[15px] rounded-[40px] fonteBold hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]"
                                onClick={() => {
                                    fecharModal(), buttonCloseAudio(), onClose();
                                }}
                            >
                                entendido
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }
};