import React, { useEffect, useMemo, useCallback, useRef, useState } from "react";
import { useContext } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import passive from "../../public/outrasImagens/rendaPassiva.png";

import terrenoImg from "../../public/outrasImagens/terreno.png";
import PróximoImg from "../../public/outrasImagens/proximo.png";
import ConstuirImg from "../../public/outrasImagens/martelo.png";
import agricultura from "../../public/outrasImagens/setores/agricultura.png";
import tecnologia from "../../public/outrasImagens/setores/tecnologia.png";
import comercio from "../../public/outrasImagens/setores/comercio.png";
import industria from "../../public/outrasImagens/setores/industria.png";
import imobiliario from "../../public/outrasImagens/setores/imobiliario.png";
import energia from "../../public/outrasImagens/setores/torre-eletrica.png";
import grafico from "../../public/outrasImagens/setores/grafico.png";

import DolarImg from "../../public/outrasImagens/simbolo-do-dolar.png";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import LojaPImg from "../../public/outrasImagens/lojaP.png";
import LojaMImg from "../../public/outrasImagens/lojaM.png";
import LojaGImg from "../../public/outrasImagens/lojaG.png";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import useSound from "use-sound";
import purchaseEdifAudio from "../../public/sounds/purchaseEdifAudio.mp3";

const getImageUrl = (nome) => `/imagens/${nome}.png`;

// ─── RANK CONFIG ───────────────────────────────────────────────────
const RANK_CONFIG = {
    S: {
        label: "Rank S",
        stars: 5,
        cor: "#FFD700",
        corText: "#FFF8D0",
        corBg: "#4A1A00",
        corBorder: "#FFD70066",
        bgGradiente: "linear-gradient(135deg, #FFD70022 0%, #FF8C0033 50%, #FFD70022 100%)",
        boxShadow: "0 0 40px #FFD70044, 0 0 80px #FFD70022",
    },
    A: {
        label: "Rank A",
        stars: 4,
        cor: "#C084FC",
        corText: "#EDE9FE",
        corBg: "#2D1A4A",
        corBorder: "#C084FC66",
        bgGradiente: "linear-gradient(135deg, #C084FC22 0%, #7C3AED33 50%, #C084FC22 100%)",
        boxShadow: "0 0 40px #C084FC44, 0 0 80px #C084FC22",
    },
    B: {
        label: "Rank B",
        stars: 3,
        cor: "#60A5FA",
        corText: "#DBEAFE",
        corBg: "#1A2A4A",
        corBorder: "#60A5FA66",
        bgGradiente: "linear-gradient(135deg, #60A5FA22 0%, #2563EB33 50%, #60A5FA22 100%)",
        boxShadow: "0 0 40px #60A5FA44, 0 0 80px #60A5FA22",
    },
    C: {
        label: "Rank C",
        stars: 2,
        cor: "#9CA3AF",
        corText: "#F3F4F6",
        corBg: "#1A1A2A",
        corBorder: "#9CA3AF66",
        bgGradiente: "linear-gradient(135deg, #9CA3AF22 0%, #4B556333 50%, #9CA3AF22 100%)",
        boxShadow: "0 0 40px #9CA3AF44, 0 0 80px #9CA3AF22",
    }
};

// ─── FUNÇÃO PARA DETERMINAR O RANK ──────────────────────────────
const getRank = (nome) => {
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
        "Centro De Engenharia Avançada", "Centro De Pesquisa Em Materiais Avançados",
        "Centro De Pesquisa Em IA", "Mineradora De Pedras Preciosas", "Mega Mercado",
        "Prédio De Alto Padrão", "Tanque De Armazenamento Biocombustível",
        "Fábrica De Plásticos", "Fábrica De Químicos Especializados", "Alto-Forno",
        "Usina Siderúrgica", "Fundição De Alumínio", "Fábrica De Ligas Metálicas",
        "Fábrica De Peças Automotivas", "Refinaria De Biocombustíveis", "Biofábrica",
        "Fábrica De Eletrônicos", "Empresa De Automação Industrial", "Estaleiro"
    ];

    const RankB = [
        "Centro De Comércio De Plantações", "Empresa De Comercio Energético",
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
        "Fábrica De Fertilizante", "Fábrica De Medicamentos", "Laboratório Farmacêutico",
        "Fábrica De Plásticos", "Alto-Forno", "Indústria De Componentes Mecânicos",
        "Fábrica De Chapas Metálicas", "Fábrica De Estruturas Metálicas",
        "Fábrica De Peças Automotivas", "Fábrica De Placas Eletrônicas", "Fábrica De Eletrônicos"
    ];

    if (RankS.includes(nome)) return 'S';
    if (RankA.includes(nome)) return 'A';
    if (RankB.includes(nome)) return 'B';
    return 'C';
};

// ─── SUBCOMPONENTES AUXILIARES ───────────────────────────────────

const _ImoveisBaseIcons = ({ dados, setorAtivo, index, cor1, onClickLojas }) => (
    <div className="flex gap-[3px] flex-wrap">
        {[
            { img: terrenoImg, key: "terrenos", qtd: dados.terrenos.quantidade },
            { img: LojaPImg, key: "lojasP", qtd: dados.lojasP.quantidade },
            { img: LojaMImg, key: "lojasM", qtd: dados.lojasM.quantidade },
            { img: LojaGImg, key: "lojasG", qtd: dados.lojasG.quantidade },
        ].map(({ img, key, qtd }) => {
            const nec = dados[setorAtivo].edificios[index].lojasNecessarias[key];
            if (!nec) return null;
            return (
                <div
                    key={key}
                    style={{ width: 25, height: 25, borderRadius: 4, background: cor1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                    onClick={onClickLojas}
                    data-tooltip-id="tooltip-faturado"
                    data-tooltip-html={`Necessário: ${nec} | Atual: ${qtd}`}
                >
                    <img src={img} style={{ height: "70%", width: "70%", objectFit: "contain" }} alt="" />
                    {qtd < nec && <span style={{ position: "absolute", bottom: -2, right: -2, width: 5, height: 5, borderRadius: "50%", background: "#fff", display: "block" }} />}
                </div>
            );
        })}
    </div>
);

const _ConstNecIcons = ({ arrayConstNece, arrayConstResources, cor1, onClickConstr, booleanPreReq }) => {
    const lista = [...(arrayConstNece || []), ...(arrayConstResources || [])].slice(0, 4);
    if (!lista.length) return <span style={{ fontSize: 8, color: "rgba(255,255,255,.25)" }}>—</span>;
    return (
        <div className="flex gap-[3px]">
            {lista.map((nome) => (
                <div
                    key={nome}
                    style={{ width: 17, height: 17, borderRadius: 4, background: cor1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                    onClick={onClickConstr}
                    data-tooltip-id="tooltip-faturado"
                    data-tooltip-html={`Necessário: ${nome}`}
                >
                    <img src={getImageUrl(nome)} style={{ height: "70%", width: "70%", objectFit: "contain" }} alt={nome} />
                    {!booleanPreReq(nome) && <span style={{ position: "absolute", bottom: -2, right: -2, width: 5, height: 5, borderRadius: "50%", background: "#fff", display: "block" }} />}
                </div>
            ))}
        </div>
    );
};

const _ActionButtons = ({ setorInfo, corPowerUpAtual, onClickFinancas, onClickPowerUp }) => (
    <div className="flex gap-[3px]">
        <div
            style={{ width: 22, height: 22, borderRadius: 6, backgroundColor: setorInfo.cor1, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
            data-tooltip-id="tooltip-faturado"
            data-tooltip-html="Informações financeiras do edifício"
            onClick={onClickFinancas}
            className="hover:scale-[1.10] ease-in-out"
        >
            <img src={DolarImg} style={{ height: "60%" }} alt="" />
        </div>
        <div
            style={{ width: 22, height: 22, borderRadius: 6, background: `linear-gradient(135deg,${setorInfo.cor4} 0%,${corPowerUpAtual} 50%,${setorInfo.cor1} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
            data-tooltip-id="tooltip-faturado"
            data-tooltip-html="Power-Ups — bônus especiais que aumentam o desempenho do edifício"
            onClick={onClickPowerUp}
            className="hover:scale-[1.10] ease-in-out"
        >
            <img src={PróximoImg} style={{ height: "65%", transform: "rotate(270deg)" }} alt="" />
        </div>
    </div>
);

const _ImoveisECustoRow = ({ dados, setorAtivo, index, cor1, setorInfo, custoConstrucao, formatarNumero, onClickLojas }) => (
    <div className="flex gap-[3px]" style={{ minHeight: 30 }}>
        <div
            style={{ width: "70%", background: "rgba(0,0,0,.32)", borderRadius: 6, padding: "4px 7px", display: "flex", flexDirection: "column", gap: 2, cursor: "pointer" }}
            onClick={onClickLojas}
            data-tooltip-id="tooltip-faturado"
            data-tooltip-html="Imóveis base necessários para construir"
        >
            <span style={{ fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "rgba(255,255,255,.3)" }}>Imóveis base</span>
            <_ImoveisBaseIcons dados={dados} setorAtivo={setorAtivo} index={index} cor1={cor1} onClickLojas={onClickLojas} />
        </div>
        <div
            style={{ width: "30%", background: setorInfo.cor3, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}
            data-tooltip-id="tooltip-faturado"
            data-tooltip-html="Custo de construção do edifício"
        >
            <img src={ConstuirImg} style={{ height: 13, aspectRatio: "1" }} alt="" />
            <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 12, fontWeight: 700, color: "#fff" }}>
                {formatarNumero(custoConstrucao)}
            </span>
        </div>
    </div>
);

const _ConstrERecursosRow = ({ arrayConstNece, arrayConstResources, cor1, onClickConstr, booleanPreReq }) => {
    const temConstr = (arrayConstNece || []).length > 0;
    const temRecursos = (arrayConstResources || []).length > 0;
    if (!temConstr && !temRecursos) return null;
    return (
        <div className="flex gap-[3px]" style={{ minHeight: 30 }}>
            <div
                style={{ width: "60%", background: "rgba(0,0,0,.32)", borderRadius: 6, padding: "4px 7px", display: "flex", flexDirection: "column", gap: 2, cursor: "pointer" }}
                onClick={onClickConstr}
                data-tooltip-id="tooltip-faturado"
                data-tooltip-html="Construções necessárias para este edifício"
            >
                <span style={{ fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "rgba(255,255,255,.3)" }}>Constr. nec.</span>
                {temConstr
                    ? <_ConstNecIcons arrayConstNece={arrayConstNece} arrayConstResources={[]} cor1={cor1} onClickConstr={onClickConstr} booleanPreReq={booleanPreReq} />
                    : <span style={{ fontSize: 8, color: "rgba(255,255,255,.2)" }}>—</span>
                }
            </div>
            <div
                style={{ width: "40%", background: "rgba(0,0,0,.32)", borderRadius: 6, padding: "4px 7px", display: "flex", flexDirection: "column", gap: 2, cursor: "pointer" }}
                onClick={onClickConstr}
                data-tooltip-id="tooltip-faturado"
                data-tooltip-html="Recursos de construção consumidos"
            >
                <span style={{ fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "rgba(255,255,255,.3)" }}>Recursos</span>
                {temRecursos
                    ? <_ConstNecIcons arrayConstNece={[]} arrayConstResources={arrayConstResources} cor1={cor1} onClickConstr={onClickConstr} booleanPreReq={booleanPreReq} />
                    : <span style={{ fontSize: 8, color: "rgba(255,255,255,.2)" }}>—</span>
                }
            </div>
        </div>
    );
};

// ─── CANVAS DE PARTÍCULAS ────────────────────────────────────────

const StarsCanvas = () => {
    const canvasRef = React.useRef(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width, height;
        let stars = [];
        const starCount = 80;

        const resizeCanvas = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            width = canvas.width;
            height = canvas.height;
        };

        const createStars = () => {
            stars = [];
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 1.5 + 0.5,
                    opacity: Math.random() * 0.5 + 0.3,
                    speed: Math.random() * 0.005 + 0.002
                });
            }
        };

        const drawStars = () => {
            ctx.clearRect(0, 0, width, height);

            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

                const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius);
                gradient.addColorStop(0, `rgba(200, 200, 255, ${star.opacity})`);
                gradient.addColorStop(0.5, `rgba(150, 150, 255, ${star.opacity * 0.5})`);
                gradient.addColorStop(1, 'rgba(100, 100, 255, 0)');

                ctx.fillStyle = gradient;
                ctx.shadowColor = 'rgba(150, 150, 255, 0.3)';
                ctx.shadowBlur = 4;
                ctx.fill();
                ctx.shadowBlur = 0;
            });
        };

        const animateStars = () => {
            stars.forEach(star => {
                star.opacity += (Math.random() - 0.5) * 0.02;
                star.opacity = Math.max(0.2, Math.min(0.8, star.opacity));
            });
            drawStars();
            requestAnimationFrame(animateStars);
        };

        resizeCanvas();
        createStars();
        drawStars();
        animateStars();

        window.addEventListener('resize', () => {
            resizeCanvas();
            createStars();
            drawStars();
        });

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
                borderRadius: 'inherit'
            }}
        />
    );
};

// ─── COMPONENTE PRINCIPAL ────────────────────────────────────────

const CardUpgradeBase = ({ index, setor, fatu, redCusto }) => {
    const { economiaSetores, setEconomiaSetores, atualizarEco, verificarLimites } = useContext(DadosEconomyGlobalContext);
    const { dados, atualizarDados, atualizarDadosProf2 } = useContext(CentraldeDadosContext);
    const setorAtivo = setor;
    const [buttonPurchaseEdifAudio] = useSound(purchaseEdifAudio);
    const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];
    const economiaSetor = economiaSetores[setorAtivo];

    const nomeAtual = dados[setorAtivo].edificios[index].nome;
    const rank = getRank(nomeAtual);
    const rankConfig = RANK_CONFIG[rank];

    // ... (restante do código mantido igual até a parte dos setores)

    const setores = [
        { id: "agricultura", corClasse: "bg-[#4CAF50]", img: agricultura, descLicença: "Com a Licença Global de Agricultura, você terá acesso a cultivos exclusivos, otimização de produções e melhorias que aumentarão sua rentabilidade. Liberte o potencial do setor agrícola agora mesmo!", cor1: "#003816", cor2: "#1A5E2A", cor3: "#0C9123", cor4: "#4CAF50" },
        { id: "tecnologia", corClasse: "bg-[#FF8C42]", img: tecnologia, descLicença: "Com a Licença Global de Tecnologia, você desbloqueia inovações que podem transformar sua infraestrutura, otimizar processos e maximizar os lucros. Invista no futuro agora!", cor1: "#A64B00", cor2: "#D45A00", cor3: "#FF6F00", cor4: "#FF8C42" },
        { id: "industria", corClasse: "bg-[#B3B3B3]", img: industria, descLicença: "Com a Licença Global de Indústria, você acessa fábricas avançadas e processos de produção que aceleram sua evolução e aumentam a eficiência. Não fique para trás!", cor1: "#1A1A1A", cor2: "#4D4D4D", cor3: "#808080", cor4: "#B3B3B3" },
        { id: "comercio", corClasse: "bg-[#FF4D4D]", img: comercio, descLicença: "Com a Licença Global de Comércio, você tem acesso a novos mercados, estratégias de vendas e expansão que podem levar seus negócios a um novo nível. Não perca essa oportunidade!", cor1: "#660000", cor2: "#A31919", cor3: "#E60000", cor4: "#FF4D4D" },
        { id: "imobiliario", corClasse: "bg-[#6666FF]", img: imobiliario, descLicença: "Com a Licença Global Imobiliária, você pode investir em novos terrenos, expandir suas construções e maximizar os retornos do mercado imobiliário. Abra as portas para grandes lucros!", cor1: "#000066", cor2: "#1A1A8C", cor3: "#3333CC", cor4: "#6666FF" },
        { id: "energia", corClasse: "bg-[#FFD966]", img: energia, descLicença: "Com a Licença Global de Energia, você ativa fontes de energia sustentáveis e de alta performance, garantindo uma operação eficiente e lucrativa. Potencialize seu setor energético agora!", cor1: "#665200", cor2: "#A37F19", cor3: "#E6B800", cor4: "#FFD966" },
        { id: "grafico", corClasse: "bg-[#6A00FF]", img: grafico, cor1: "#6A00FF", cor2: "#6A00FF", cor3: "#6A00FF", cor4: "#6A00FF" },
    ];

    const setorInfo = setores.find((s) => s.id === setorAtivo);

    // ─── RANK-BASED STYLES ────────────────────────────────────────

    const getRankGradient = () => {
        const cor = rankConfig.cor;
        return `radial-gradient(circle at 30% 30%, ${cor}22 0%, transparent 70%)`;
    };

    const getRankBorder = () => {
        return {
            border: `2px solid ${rankConfig.corBorder}`,
            boxShadow: rankConfig.boxShadow,
            borderRadius: "20px",
        };
    };

    const getRankBadgeStyle = () => {
        return {
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 15,
            fontSize: 10,
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: ".1em",
            padding: "4px 12px",
            borderRadius: 6,
            background: `${rankConfig.cor}33`,
            color: rankConfig.cor,
            border: `1px solid ${rankConfig.cor}66`,
            backdropFilter: "blur(8px)",
            boxShadow: `0 0 20px ${rankConfig.cor}22`,
        };
    };

    // ─── RENDER ────────────────────────────────────────────────────

    return (
        <motion.div
            style={{ perspective: "1000px", transformStyle: "preserve-3d", position: "relative", width: "220px", height: "320px" }}
            className="flex items-center justify-center"
        >
            <motion.div
                style={{
                    position: "relative", width: "100%", height: "100%",
                    background: `linear-gradient(135deg, ${setorInfo.cor1} 0%, ${setorInfo.cor2} 100%)`,
                    ...getRankBorder(),
                    overflow: "hidden",
                    transformStyle: "preserve-3d",
                    boxShadow: `0 20px 60px rgba(0,0,0,0.4)`,
                }}
                className="rounded-[20px] flex flex-col justify-center items-center shadow-lg"
                whileHover={{
                    boxShadow: `0 30px 80px rgba(0,0,0,0.6), ${rankConfig.boxShadow}`,
                    scale: 1.02,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                {/* ── Fundo com gradiente do rank ── */}
                <div style={{
                    position: "absolute", inset: 0,
                    background: getRankGradient(),
                    pointerEvents: "none",
                    zIndex: 0,
                }} />

                {/* ── Estrelas de fundo ── */}
                <StarsCanvas />

                {/* ── CONTEÚDO ── */}
                <div className="relative w-full h-full rounded-2xl rounded-br-2xl" style={{ transformStyle: "preserve-3d", zIndex: 5 }}>

                    {/* Badge de categoria (canto inferior direito) */}
                    <div className="absolute bottom-0 right-0 w-[50px] h-[50px] z-20 flex items-center justify-center rounded-tl-2xl rounded-br-2xl">
                        <div className="absolute inset-0 rounded-tl-2xl rounded-br-2xl" style={{
                            background: setorInfo.cor3,
                            boxShadow: "-2px -2px 10px rgba(0,0,0,0.3)",
                        }} />
                        <div className="w-[50px] h-[50px] flex items-center justify-center rounded-tl-2xl rounded-br-2xl" style={{ backgroundColor: "rgba(0,0,0,0.2)", backdropFilter: "blur(4px)" }}>
                            <img src={passive} className="w-[24px] opacity-90" alt="" />
                        </div>
                    </div>

                    {/* Overlay de gradiente frontal */}
                    <div className="absolute w-full h-full flex items-center justify-center rounded-xl" style={{ background: getRankGradient(), mixBlendMode: "color-dodge", opacity: 0.15 }} />

                    {/* Conteúdo legível */}
                    <div className="absolute w-full h-full flex items-center justify-center rounded-xl z-10">
                        <div className="w-[90%] h-[90%] flex flex-col items-center justify-between self-center">

                            <div className="flex-1 flex flex-col items-center justify-center gap-[10px] w-full">

                                {/* Badge de Rank */}
                                <div style={getRankBadgeStyle()}>
                                    {rankConfig.label}
                                </div>

                                {/* Box da imagem */}
                                <div style={{
                                    width: 100, height: 100, borderRadius: 12,
                                    background: `radial-gradient(circle at 8% 8%, ${rankConfig.corBg} 0%, ${setorInfo.cor1} 50%, ${setorInfo.cor2} 80%, ${rankConfig.corBg} 100%)`,
                                    border: `1px solid ${rankConfig.corBorder}`,
                                    boxShadow: `0 4px 20px ${rankConfig.cor}33, inset 0 0 20px ${setorInfo.cor1}88`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    position: "relative", overflow: "hidden", flexShrink: 0,
                                }}>
                                    <div style={{
                                        width: 100, height: 100, borderRadius: 12,
                                        background: `${rankConfig.corBg}50`,
                                        border: `1px solid ${setorInfo.cor3}66`,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        position: "relative", overflow: "hidden", flexShrink: 0,
                                    }}>
                                        <img
                                            src={getImageUrl(nomeAtual)}
                                            alt={nomeAtual}
                                            style={{
                                                width: "70%", height: "70%", objectFit: "contain",
                                                filter: `drop-shadow(0 0 8px ${rankConfig.cor}88)`,
                                            }}
                                        />
                                        <div style={{
                                            position: "absolute", bottom: 5, left: 0, right: 0,
                                            display: "flex", justifyContent: "center", gap: 2,
                                            fontSize: 8,
                                            color: rankConfig.cor,
                                            textShadow: `0 0 6px ${rankConfig.cor}`,
                                        }}>
                                            {"★".repeat(rankConfig.stars)}
                                        </div>
                                    </div>
                                </div>

                                {/* Divisor */}
                                <div style={{
                                    width: "85%", height: 1,
                                    background: `linear-gradient(90deg, transparent, ${rankConfig.cor}, transparent)`,
                                    boxShadow: `0 0 6px ${rankConfig.cor}88`,
                                }} />

                                {/* Nome */}
                                <h1 className="fonteBold text-center" style={{
                                    fontSize: 12, lineHeight: 1.3, maxWidth: "85%",
                                    color: rankConfig.corText,
                                    textTransform: "uppercase", letterSpacing: ".04em",
                                    textShadow: `0 0 10px ${rankConfig.cor}88, 0 1px 4px #00000088`,
                                }}>
                                    {nomeAtual}
                                </h1>
                            </div>

                            {/* Informações de upgrade */}
                            {/* <div style={{
                                padding: "4px 12px", borderRadius: 6, flexShrink: 0,
                                background: "rgba(0,0,0,0.4)",
                                border: `1px solid ${rankConfig.cor}44`,
                                display: "flex", alignItems: "center", gap: 12,
                                fontSize: 9, fontWeight: 700,
                                color: "#fff",
                                backdropFilter: "blur(8px)",
                            }}>
                                <span style={{ color: "#34d399" }}>↑ +{fatu}%</span>
                                <span style={{ color: "#f87171" }}>↓ -{redCusto}%</span>
                            </div> */}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export const CardUpgrade = React.memo(CardUpgradeBase);