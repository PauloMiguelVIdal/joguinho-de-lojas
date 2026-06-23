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
import imobiliario from "../../public/outrasImagens/setores/imobiliário.png";
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

const getRaridade = (sistemColor) => {
    if (sistemColor === 20) return "eterno";
    if (sistemColor >= 18) return "lendario";
    if (sistemColor >= 15) return "epico";
    if (sistemColor >= 12) return "raro";
    if (sistemColor >= 8) return "incomum";
    return "comum";
};

// ─── SUBCOMPONENTES AUXILIARES (inalterados) ───────────────────────────────

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

// ─── CANVAS DE PARTÍCULAS (ETERNO) ────────────────────────────────────────

const EternoParticlesCanvas = () => {
    const canvasRef = useRef(null);
    const rafRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const W = 220, H = 320;
        canvas.width = W; canvas.height = H;

        const pts = Array.from({ length: 70 }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            size: Math.random() * 2 + 0.4,
            phase: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.015 + 0.005,
            vy: -(Math.random() * 0.3 + 0.05),
        }));

        let t = 0;
        const loop = () => {
            t++;
            ctx.clearRect(0, 0, W, H);
            pts.forEach(p => {
                p.y += p.vy;
                if (p.y < -2) { p.y = H + 2; p.x = Math.random() * W; }
                const op = 0.15 + 0.85 * (Math.sin(t * p.speed + p.phase) * 0.5 + 0.5);
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = Math.random() > 0.85
                    ? `rgba(192,132,252,${op})`
                    : `rgba(255,255,255,${op})`;
                ctx.fill();
            });
            rafRef.current = requestAnimationFrame(loop);
        };
        loop();

        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", borderRadius: "inherit", pointerEvents: "none", zIndex: 1 }}
        />
    );
};

// ─── LINHAS DE ENERGIA SVG (ETERNO) ──────────────────────────────────────

const ENERGY_PATHS = [
    { d: "M0 200 C150 50 350 350 500 150", color: "rgba(139,92,246,0.6)", dur: 7, delay: 0 },
    { d: "M0 300 C120 100 380 400 500 250", color: "rgba(168,85,247,0.5)", dur: 8.5, delay: 1.5 },
    { d: "M0 100 C180 50 320 450 500 350", color: "rgba(124,58,237,0.4)", dur: 10, delay: 3 },
    { d: "M0 350 C100 150 400 250 500 400", color: "rgba(192,132,252,0.3)", dur: 6.5, delay: 4.5 },
];

const EternoEnergyLines = () => (
    <motion.svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 2, opacity: 0.7 }}
        viewBox="0 0 500 500"
        preserveAspectRatio="none"
    >
        {ENERGY_PATHS.map((line, i) => (
            <motion.path
                key={i}
                d={line.d}
                stroke={line.color}
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.8, 0.8, 0] }}
                transition={{
                    duration: line.dur,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.25, 0.75, 1],
                    delay: line.delay,
                }}
            />
        ))}
    </motion.svg>
);

// ─── GLOWS VIAJANTES (ETERNO) ──────────────────────────────────────────────

const EternoTravelGlows = () => (
    <>
        <motion.div
            style={{
                position: "absolute",
                width: 30, height: 30,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(139,92,246,0.6) 0%, transparent 70%)",
                filter: "blur(12px)",
                offsetPath: "path('M0 200 C150 50 350 350 500 150')",
                zIndex: 3,
                pointerEvents: "none",
            }}
            animate={{ offsetDistance: ["0%", "100%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
            style={{
                position: "absolute",
                width: 20, height: 20,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(192,132,252,0.4) 0%, transparent 70%)",
                filter: "blur(10px)",
                offsetPath: "path('M0 300 C120 100 380 400 500 250')",
                zIndex: 3,
                pointerEvents: "none",
            }}
            animate={{ offsetDistance: ["100%", "0%"] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />
    </>
);

// ─── NEBULOSAS PULSANTES (ETERNO) ──────────────────────────────────────────

const EternoNebula = () => (
    <>
        <motion.div
            style={{
                position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
                background: `
                    radial-gradient(circle at 20% 30%, rgba(0, 0, 0, 0.5) 0%, transparent 60%),
                    radial-gradient(circle at 80% 70%, rgba(38, 7, 92, 0.4) 0%, transparent 50%),
                    radial-gradient(circle at 50% 50%, rgba(168,85,247,0.25) 0%, transparent 70%)
                `,
                filter: "blur(60px)",
            }}
            animate={{ scale: [1, 1.12, 1], rotate: [0, 4, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            style={{
                position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
                background: `
                    radial-gradient(circle at 70% 20%, rgba(69, 38, 100, 0.3) 0%, transparent 50%),
                    radial-gradient(circle at 30% 80%, rgba(65, 65, 65, 0.2) 0%, transparent 40%)
                `,
                filter: "blur(80px)",
            }}
            animate={{ scale: [1.05, 1, 1.05], rotate: [0, -3, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
    </>
);

// ─── AURA + ANÉIS (ETERNO) ────────────────────────────────────────────────

const EternoAura = () => (
    <>
        <motion.div
            style={{
                position: "absolute", inset: -12, borderRadius: "22px", zIndex: 0, pointerEvents: "none",
                boxShadow: `
                    0 0 60px rgba(139,92,246,0.3),
                    0 0 120px rgba(139,92,246,0.15),
                    0 0 180px rgba(139,92,246,0.08),
                    inset 0 0 60px rgba(139,92,246,0.1)
                `,
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            style={{
                position: "absolute", inset: -15, borderRadius: "24px", zIndex: 0, pointerEvents: "none",
                border: "1px solid rgba(139,92,246,0.2)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
            style={{
                position: "absolute", inset: -25, borderRadius: "30px", zIndex: 0, pointerEvents: "none",
                border: "1px solid rgba(192,132,252,0.1)",
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
    </>
);

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
                gradient.addColorStop(0, `rgba(139, 92, 246, ${star.opacity})`);
                gradient.addColorStop(0.5, `rgba(124, 58, 237, ${star.opacity * 0.5})`);
                gradient.addColorStop(1, 'rgba(124, 58, 237, 0)');

                ctx.fillStyle = gradient;
                ctx.shadowColor = 'rgba(139, 92, 246, 0.3)';
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

// V4 - IGNIÇÃO (versão roxa)
const V4Ignicao = () => (
    <>
        {/* Camada de névoa - posicionada no canto inferior direito */}
        <motion.div
            style={{
                position: 'absolute',
                zIndex: 1,
                pointerEvents: 'none',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                background: `
                    radial-gradient(ellipse 260% 60% at 85% 85%, rgba(139,92,246,0.2) 0%, transparent 50%),
                    radial-gradient(ellipse 60% 260% at 85% 85%, rgba(124,58,237,0.12) 0%, transparent 50%)
                `,
            }}
            animate={{ rotate: [0, 3, 0], scale: [1, 1.03, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Burst - explosão no canto inferior direito */}
        <motion.div
            style={{
                position: 'absolute',
                zIndex: 1,
                pointerEvents: 'none',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                background: `
                    radial-gradient(circle at 85% 85%, rgba(255,255,255,1) 0%, rgba(139,92,246,0.85) 5%, rgba(124,58,237,0.6) 14%, rgba(76,29,149,0.35) 26%, rgba(40,15,80,0.2) 42%, rgba(20,7,40,0.1) 60%, transparent 75%)
                `,
            }}
            animate={{ opacity: [0.85, 1, 0.85], scale: [1, 1.04, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Corona - anel rotativo no canto inferior direito */}
        <motion.div
            style={{
                position: 'absolute',
                zIndex: 1,
                pointerEvents: 'none',
                width: '100%',
                height: '100%',
                top: 120,
                left: 120,
                background: `
                    radial-gradient(circle at 50% 45%, transparent 18%, rgba(139,92,246,0.25) 24%, rgba(124,58,237,0.12) 34%, transparent 46%)
                `,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />


        <motion.div
            style={{
                position: 'absolute',
                zIndex: 1,
                pointerEvents: 'none',
                width: '100%',
                height: '100%',
                bottom: 0,
                right: 0,
                background: `
                    radial-gradient(ellipse 260% 60% at 12% 11%, rgba(76, 0, 255, 0.2) 0%, transparent 50%),
                    radial-gradient(ellipse 260% 60% at 25% 85%, rgba(124,58,237,0.12) 0%, transparent 50%)
                `,
            }}
            animate={{ rotate: [0, 3, 0], scale: [1, 1.03, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Burst - explosão no canto inferior direito */}
        <motion.div
            style={{
                position: 'absolute',
                zIndex: 1,
                pointerEvents: 'none',
                width: '100%',
                height: '100%',
                bottom: 140,
                right: 25,
                background: `
                    radial-gradient(circle at 50% 50%, rgba(54, 54, 54, 0.62) 0%, rgb(35, 11, 73) 5%, rgba(53, 5, 136, 0.6) 14%, rgba(55, 6, 129, 0.35) 26%, rgba(24, 9, 49, 0.2) 42%, rgba(17, 1, 43, 0.1) 60%, transparent 75%)
                `,
            }}
            animate={{ opacity: [0.85, 1, 0.85], scale: [1, 1.04, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Corona - anel rotativo no canto inferior direito */}
        <motion.div
            style={{
                position: 'absolute',
                zIndex: 1,
                pointerEvents: 'none',
                width: '100%',
                height: '100%',
                bottom: 140,
                right: 25,
                background: `
                    radial-gradient(circle at 50% 49%, transparent 18%, rgba(139,92,246,0.25) 24%, rgba(124,58,237,0.12) 34%, transparent 46%)
                `,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        <StarsCanvas />
    </>
);


// ─── COMPONENTE PRINCIPAL ────────────────────────────────────────────────

const CardUpgradeBase = ({ index, setor, fatu, redCusto }) => {
    const { economiaSetores, setEconomiaSetores, atualizarEco, verificarLimites } = useContext(DadosEconomyGlobalContext);
    const { dados, atualizarDados, atualizarDadosProf2 } = useContext(CentraldeDadosContext);
    const setorAtivo = setor;
    const [buttonPurchaseEdifAudio] = useSound(purchaseEdifAudio);
    const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];
    const economiaSetor = economiaSetores[setorAtivo];

    const sistemColor = fatu + redCusto;
    const productions = [
        "Plantação De Grãos", "Fazenda De Vacas", "Plantação De Eucalipto", "Granja De Aves", "Criação De Ovinos",
        "Serraria", "Fábrica De Smartphones", "Fábrica De Computadores", "Fábrica De Consoles De Jogos",
        "Fábrica De Dispositivos Vestíveis", "Fábrica De Rações", "Fábrica De Embalagens", "Fábrica De Fertilizantes",
        "Fábrica Têxtil", "Fábrica De Calçados", "Fábrica De Roupas", "Fábrica De Celulose", "Fábrica De Papel",
        "Fábrica De Livros", "Fábrica De Medicamentos", "Laboratório Farmacêutico", "Fábrica De Plásticos",
        "Fábrica De Químicos Especializados", "Alto-Forno", "Usina Siderúrgica", "Fundição De Alumínio",
        "Fábrica De Ligas Metálicas", "Indústria De Componentes Mecânicos", "Fábrica De Chapas Metálicas",
        "Fábrica De Estruturas Metálicas", "Fábrica De Peças Automotivas", "Montadora De Veículos Elétricos",
        "Fábrica De Automóveis", "Refinaria", "Biofábrica", "Fábrica De Chips", "Fábrica De Placas Eletrônicas",
        "Fábrica De Semicondutores", "Fábrica De Robôs", "Fábrica De Motores", "Fábrica De Foguetes",
        "Fábrica De Aeronaves", "Estaleiro", "Fábrica De Turbinas Eólicas", "Fábrica De Painéis Solares", "Fábrica De Baterias",
    ];
    const sellFinal = [
        "Livraria", "Mercado", "Açougue", "Petshop", "Farmácia", "Loja De Calçados", "Loja De Vestuário",
        "Loja De Gadgets E Wearables", "Loja De Games", "Loja De Celulares", "Loja De Informática",
        "Loja De Eletrônicos", "Concessionária De Veículos",
    ];
    const edificiosDeArmazenamento = [
        "Armazém", "Silo", "Depósito De Resíduos Orgânicos", "Data Center", "Servidor Em Nuvem", "Armazém Logístico",
        "Centro De Distribuição", "Fábrica De Tanque De Armazenamento Biocombustível", "Centro De Coleta De Biomassa",
        "Campo De Estocagem", "Armazém De Materiais Brutos", "Câmara Fria", "Container Modular", "Pátio De Veículos",
        "Armazém Industrial", "Armazém De Materiais Sensíveis", "Hangar", "Pátio De Mineração",
    ];

    const nomeAtual = dados[setorAtivo].edificios[index].nome;
    const categoriaEdificio = (() => {
        if (edificiosDeArmazenamento.includes(nomeAtual)) return "estoque";
        if (productions.includes(nomeAtual)) return "producao";
        if (sellFinal.includes(nomeAtual)) return "venda";
        return "passiva";
    })();

    const isEstoque = categoriaEdificio === "estoque";
    const isProducao = categoriaEdificio === "producao";
    const isVenda = categoriaEdificio === "venda";
    const isPassiva = categoriaEdificio === "passiva";

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
    const quantidadeMinimaPowerUpNv2 = dados[setorAtivo].edificios[index].powerUp.nível2.quantidadeMínima;
    const quantidadeMinimaPowerUpNv3 = dados[setorAtivo].edificios[index].powerUp.nível3.quantidadeMínima;
    const corPadrão = { backgroundColor: setorInfo.cor2 };

    const corPowerUp = (pu) => {
        switch (pu) { case "powerUpNv1": return "#8F5ADA"; case "powerUpNv2": return "#6411D9"; case "powerUpNv3": return "#350973"; default: return corPadrão; }
    };

    const quantidadeTerrenosNec = dados[setorAtivo].edificios[index].lojasNecessarias.terrenos;
    const quantidadeLojasPNec = dados[setorAtivo].edificios[index].lojasNecessarias.lojasP;
    const quantidadeLojasMNec = dados[setorAtivo].edificios[index].lojasNecessarias.lojasM;
    const quantidadeLojasGNec = dados[setorAtivo].edificios[index].lojasNecessarias.lojasG;
    const CustoTotalSomadoLojas =
        quantidadeTerrenosNec * dados.terrenos.preçoConstrução +
        quantidadeLojasPNec * (dados.lojasP.preçoConstrução + dados.lojasP.quantidadeNecTerreno * dados.terrenos.preçoConstrução) +
        quantidadeLojasMNec * (dados.lojasM.preçoConstrução + dados.lojasM.quantidadeNecTerreno * dados.terrenos.preçoConstrução) +
        quantidadeLojasGNec * (dados.lojasG.preçoConstrução + dados.lojasG.quantidadeNecTerreno * dados.terrenos.preçoConstrução);

    const podeComprarCard = (edif, setorAtivo) => {
        const loc = (nome) => { for (const s of setoresArr) { const idx = dados[s]?.edificios?.findIndex((e) => e.nome === nome); if (idx !== -1) return dados[s].edificios[idx]; } return null; };
        if (!edif) return { ok: false, motivo: "Edifício não encontrado" };
        const carteira = economiaSetores?.carteira?.carteiraAtual ?? [];
        const resultado = verificarLimites(edif, setorAtivo, carteira);
        if (resultado !== true) return { ok: false, motivo: resultado };
        const custo = Number(edif.custoConstrucao ?? 0);
        if (economiaSetores.saldo < custo) return { ok: false, motivo: "Saldo insuficiente" };
        const { terrenos = 0, lojasP = 0, lojasM = 0, lojasG = 0 } = edif.lojasNecessarias || {};
        if ((dados.terrenos?.quantidade ?? 0) < terrenos || (dados.lojasP?.quantidade ?? 0) < lojasP || (dados.lojasM?.quantidade ?? 0) < lojasM || (dados.lojasG?.quantidade ?? 0) < lojasG) return { ok: false, motivo: "Você não tem lojas ou terrenos suficientes" };
        if (edif.construçõesNecessárias?.length) for (const nome of edif.construçõesNecessárias) { const ref = loc(nome); if (!ref) return { ok: false, motivo: `Construção "${nome}" não encontrada` }; if (ref.quantidade <= 0) return { ok: false, motivo: `Precisa de 1 unidade de "${nome}"` }; }
        if (edif.recursoDeConstrução?.length) for (const nome of edif.recursoDeConstrução) { const ref = loc(nome); if (!ref) return { ok: false, motivo: `Recurso "${nome}" não encontrado` }; if (ref.quantidade <= 0) return { ok: false, motivo: `Precisa de 1 unidade de "${nome}"` }; }
        return { ok: true };
    };

    const edif = dados?.[setorAtivo]?.edificios?.[index];

    const comprarCard = () => {
        const loc = (nome) => { for (const s of setoresArr) { const idx = dados[s]?.edificios?.findIndex((e) => e.nome === nome); if (idx !== -1) return { setor: s, index: idx, edificio: dados[s].edificios[idx] }; } return null; };
        const edif = dados?.[setorAtivo]?.edificios?.[index];
        if (!edif) { atualizarDados("modalAlert", { ...dados.modalAlert, estadoModal: true, head: "Erro", content: "Edifício não encontrado." }); return; }
        const carteira = economiaSetores?.carteira?.carteiraAtual ?? [];
        if (verificarLimites(edif, setorAtivo, carteira) !== true) return;
        const custo = Number(edif.custoConstrucao ?? 0);
        if (economiaSetores.saldo < custo) { atualizarDados("modalAlert", { ...dados.modalAlert, estadoModal: true, head: "Erro na construção", content: "Você não tem dinheiro suficiente." }); return; }
        const { terrenos: qT = 0, lojasP: qP = 0, lojasM: qM = 0, lojasG: qG = 0 } = edif.lojasNecessarias || {};
        const qTa = Number(dados?.terrenos?.quantidade ?? 0), qPa = Number(dados?.lojasP?.quantidade ?? 0), qMa = Number(dados?.lojasM?.quantidade ?? 0), qGa = Number(dados?.lojasG?.quantidade ?? 0);
        if (qT > qTa || qP > qPa || qM > qMa || qG > qGa) { atualizarDados("modalAlert", { ...dados.modalAlert, estadoModal: true, head: "Falta edifícios base", content: "Não tem lojas/terrenos suficientes." }); return; }
        if (edif.construçõesNecessárias?.length) for (const nome of edif.construçõesNecessárias) { const res = loc(nome); if (!res) { atualizarDados("modalAlert", { ...dados.modalAlert, estadoModal: true, head: `Falta ${nome}`, content: `"${nome}" não encontrado.` }); return; } if (res.edificio.quantidade <= 0) { atualizarDados("modalAlert", { ...dados.modalAlert, estadoModal: true, head: `Falta ${nome}`, content: `Precisa de 1 unidade de "${nome}".` }); return; } }
        if (edif.recursoDeConstrução?.length) for (const nome of edif.recursoDeConstrução) { const res = loc(nome); if (!res) { atualizarDados("modalAlert", { ...dados.modalAlert, estadoModal: true, head: `Erro`, content: `"${nome}" não encontrado.` }); return; } if (res.edificio.quantidade <= 0) { atualizarDados("modalAlert", { ...dados.modalAlert, estadoModal: true, head: `Precisa de ${nome}`, content: `Precisa de 1 unidade de "${nome}".` }); return; } }
        buttonPurchaseEdifAudio();
        atualizarEco("saldo", economiaSetores.saldo - custo);
        atualizarDadosProf2([setorAtivo, "edificios", index, "quantidade"], (edif.quantidade || 0) + 1);
        atualizarDadosProf2(["terrenos", "quantidade"], qTa - qT); atualizarDadosProf2(["lojasP", "quantidade"], qPa - qP); atualizarDadosProf2(["lojasM", "quantidade"], qMa - qM); atualizarDadosProf2(["lojasG", "quantidade"], qGa - qG);
        const custosEdBase = qT * dados.terrenos.preçoConstrução + qP * (dados.lojasP.preçoConstrução + dados.lojasP.quantidadeNecTerreno * dados.terrenos.preçoConstrução) + qM * (dados.lojasM.preçoConstrução + dados.lojasM.quantidadeNecTerreno * dados.terrenos.preçoConstrução) + qG * (dados.lojasG.preçoConstrução + dados.lojasG.quantidadeNecTerreno * dados.terrenos.preçoConstrução);
        if (edif.recursoDeConstrução?.length) for (const nome of edif.recursoDeConstrução) { const r = loc(nome) || {}; if (r.edificio) atualizarDadosProf2([r.setor, "edificios", r.index, "quantidade"], (r.edificio.quantidade || 0) - 1); }
        const setorIndex = setoresArr.indexOf(setorAtivo);
        const novaCarteira = [...carteira];
        if (!novaCarteira[setorIndex]) novaCarteira[setorIndex] = [];
        novaCarteira[setorIndex] = [...novaCarteira[setorIndex], { ...edif, quantidade: 1 }];
        atualizarEco("carteira", { ...economiaSetores.carteira, carteiraAtual: novaCarteira });
        atualizarEco("patrimonio", economiaSetores.patrimonio + custosEdBase + custo);
        atualizarEco("patrimônio", { ...economiaSetores[setorAtivo].economiaSetor, patrimonio: economiaSetores[setorAtivo].economiaSetor.patrimonio + custosEdBase + custo });
        const carteiraNorm = setoresArr.map((_, i) => Array.isArray(novaCarteira[i]) ? novaCarteira[i] : []);
        let totalEd = 0; const nomesSet = new Set();
        carteiraNorm.forEach((arr) => arr.forEach((item) => { if (!item) return; nomesSet.add(item.nome); totalEd += Number(item.quantidade ?? 1); }));
        atualizarEco("centralEdificios", { ...economiaSetores.centralEdificios, quantidadeSetoresAtual: carteiraNorm.reduce((a, arr) => a + (arr.length > 0 ? 1 : 0), 0), QuantidadeEdifíciosAtual: totalEd, QuantidadeDiversosEdificiosAtual: nomesSet.size });
    };

    const quantidadeAtivoAtual = dados[setorAtivo].edificios[index].quantidade;
    const powerUpSelecionado = sistemColor >= 10 ? "powerUpNv4" : sistemColor >= 8 ? "powerUpNv3" : 5 >= quantidadeMinimaPowerUpNv2 ? "powerUpNv2" : "powerUpNv1";
    const corPowerUpAtual = corPowerUp(powerUpSelecionado);

    const [acumuladorPowerUpRedCustoRecebe, setAcumuladorPowerUpRedCustoRecebe] = useState(0);
    const [acumuladorPowerUpAumFatuRecebe, setAcumuladorPowerUpAumFatuRecebe] = useState(0);

    useEffect(() => {
        let r = 0, a = 0;
        dados[setorAtivo].edificios[index].RecebeMelhoraEficiencia.forEach((ed) => {
            let se = null, idx = -1;
            const qtd = (nome) => { for (const s of setoresArr) { se = s; idx = dados[s].edificios.findIndex((e) => e.nome === nome); if (idx !== -1) return dados[s].edificios[idx].quantidade; } return 0; };
            const qtdM = qtd(ed.nome), q = qtd(dados[setorAtivo].edificios[index].nome);
            const pu = q >= quantidadeMinimaPowerUpNv3 ? "powerUpNv3" : q >= quantidadeMinimaPowerUpNv2 ? "powerUpNv2" : "powerUpNv1";
            if (qtdM > 0) { r += pu === "powerUpNv1" ? ed.redCusto.nível1 : pu === "powerUpNv2" ? ed.redCusto.nível2 : ed.redCusto.nível3; a += pu === "powerUpNv1" ? ed.aumFatu.nível1 : pu === "powerUpNv2" ? ed.aumFatu.nível2 : ed.aumFatu.nível3; }
        });
        setAcumuladorPowerUpRedCustoRecebe(r); setAcumuladorPowerUpAumFatuRecebe(a);
    }, [dados, setorAtivo, index, setoresArr, quantidadeMinimaPowerUpNv2, quantidadeMinimaPowerUpNv3]);

    const valorFatu = dados[setorAtivo].edificios[index].finanças.faturamentoUnitário;
    const valorImpostoFixo = dados[setorAtivo].edificios[index].finanças.impostoFixo;
    const impostoSobreFatu = dados[setorAtivo].edificios[index].finanças.impostoSobreFatu;

    const fatorEconomico = { "recessão": 0.4, "declinio": 0.8, "estável": 1, "progressiva": 1.1, "aquecida": 1.25 }[economiaSetor];

    const impostoSobreFatuFinal = impostoSobreFatu - impostoSobreFatu * (acumuladorPowerUpRedCustoRecebe / 100);
    const valorFatuFinal = valorFatu + valorFatu * (acumuladorPowerUpAumFatuRecebe / 100);
    const valorImpostoFixoFinal = valorImpostoFixo - valorImpostoFixo * (acumuladorPowerUpRedCustoRecebe / 100);

    const arrayConstResources = dados[setorAtivo].edificios[index].recursoDeConstrução;
    const arrayConstNece = dados[setorAtivo].edificios[index].construçõesNecessárias;

    const booleanPreReq = useCallback((nomeEd) => {
        for (const setor of setoresArr) {
            const idx = dados[setor].edificios.findIndex((ed) => ed.nome === nomeEd);
            if (idx !== -1) return dados[setor].edificios[idx].quantidade > 0;
        }
        return false;
    }, [dados, setoresArr]);

    const formatarNumero = (num) => {
        if (num >= 1e12) return (num / 1e12).toFixed(1).replace(".0", "") + "T";
        if (num >= 1e9) return (num / 1e9).toFixed(1).replace(".0", "") + "B";
        if (num >= 1e6) return (num / 1e6).toFixed(1).replace(".0", "") + "M";
        if (num >= 1e3) return (num / 1e3).toFixed(1).replace(".0", "") + "K";
        return num.toString();
    };

    function calcularCustoRecurso(nomeRecurso, nivel = 1) {
        for (const setor of setoresArr) {
            const edEncontrado = dados[setor]?.edificios?.find((e) => e.nome === nomeRecurso);
            if (edEncontrado) {
                const c = edEncontrado.custoConstrucao || 0;
                const tNec = edEncontrado.lojasNecessarias.terrenos || 0, pNec = edEncontrado.lojasNecessarias.lojasP || 0, mNec = edEncontrado.lojasNecessarias.lojasM || 0, gNec = edEncontrado.lojasNecessarias.lojasG || 0;
                let total = c + tNec * dados.terrenos.preçoConstrução + pNec * (dados.lojasP.preçoConstrução + dados.lojasP.quantidadeNecTerreno * dados.terrenos.preçoConstrução) + mNec * (dados.lojasM.preçoConstrução + dados.lojasM.quantidadeNecTerreno * dados.terrenos.preçoConstrução) + gNec * (dados.lojasG.preçoConstrução + dados.lojasG.quantidadeNecTerreno * dados.terrenos.preçoConstrução);
                if (Array.isArray(edEncontrado.recursoDeConstrução) && edEncontrado.recursoDeConstrução.length > 0) edEncontrado.recursoDeConstrução.forEach((sub) => { total += calcularCustoRecurso(sub, nivel + 1); });
                return total;
            }
        }
        return 0;
    }

    const custoRecursos = useMemo(() => {
        let total = 0;
        arrayConstResources?.forEach((nome) => { total += calcularCustoRecurso(nome); });
        return total;
    }, [
        arrayConstResources,
        dados.terrenos.preçoConstrução,
        dados.lojasP.preçoConstrução,
        dados.lojasM.preçoConstrução,
        dados.lojasG.preçoConstrução,
    ]);

    const fatuMensal = valorFatuFinal * 30 * fatorEconomico;
    const valorImpostoSobreFatu = fatuMensal * impostoSobreFatuFinal;
    const custoConstrução = dados[setorAtivo].edificios[index].custoConstrucao;
    const totalCusto = CustoTotalSomadoLojas + custoRecursos + custoConstrução;

    const raridade = getRaridade(sistemColor);

    const RARIDADE_CONFIG = {
        comum: { label: "Comum", stars: 1, cor: "transparent", corText: "#a8ffb0", corBg: setorInfo.cor1, corBorder: "#3a8c4244" },
        incomum: { label: "Incomum", stars: 2, cor: "#424242", corText: "#88ccff", corBg: setorInfo.cor1, corBorder: "#4488ff44" },
        raro: { label: "Raro", stars: 3, cor: "#6e6e6e", corText: "#cc88ff", corBg: setorInfo.cor1, corBorder: "#9944ff44" },
        epico: { label: "Épico", stars: 4, cor: "#ffffff", corText: "#ffcc88", corBg: setorInfo.cor1, corBorder: "#ff993344" },
        lendario: { label: "Lendário", stars: 5, cor: "#ffd700", corText: "#fff8d0", corBg: "#ffd700", corBorder: "#ffd70066" },
        eterno: { label: "∞ ETERNO", stars: 6, cor: "#7c3aed", corText: "#c4b5fd", corBg: "#2d0a4e", corBorder: "#7c3aed88" },
    };

    const rConfig = RARIDADE_CONFIG[raridade];
    const isEterno = raridade === "eterno";

    const gradientLevel = () => {
        if (powerUpSelecionado === "powerUpNv4") return "#FFFFFF";
        if (powerUpSelecionado === "powerUpNv3") return "#FFD700";
        if (powerUpSelecionado === "powerUpNv2") return "#6411D9";
        return setorInfo.cor2;
    };

    const getGradient = () => {
        if (isEterno) return `radial-gradient(circle at 30% 30%, #4a1a7a 0%, #2d0a4e 30%, #1a0a2e 60%, #0d0520 100%)`;
        if (isProducao) {
            return raridade === "lendario"
                ? `radial-gradient(circle at 2% 2%, #ffeeb6 0%, #ffffff 40%, #fffadc 70%, #f7e9bd 80%, #ffffff 85%, #f8f5ea 92%, #bbb49d 98%, #ffffff 100%)`
                : `radial-gradient(circle at 2% 50%, ${setorInfo.cor1}99 0%, ${setorInfo.cor4}FF 40%, ${gradientLevel()}CC 70%, ${setorInfo.cor4}FF 80%, ${setorInfo.cor2}B3 85%, ${setorInfo.cor1}99 92%, ${setorInfo.cor2}B3 98%, ${setorInfo.cor4}FF 100%)`;
        }
        if (isVenda) {
            return raridade === "lendario"
                ? `radial-gradient(circle at 100% 0%, ${setorInfo.cor1}11 0%, ${gradientLevel()}CC 12%, ${setorInfo.cor4}CC 28%, ${setorInfo.cor3}FF 48%, #FFD700 55%, ${setorInfo.cor3}FF 62%, ${gradientLevel()}99 80%, ${setorInfo.cor1}11 100%)`
                : `radial-gradient(circle at 100% 0%, ${setorInfo.cor1}11 0%, ${gradientLevel()}CC 12%, ${setorInfo.cor4}CC 28%, ${setorInfo.cor3}FF 48%, ${setorInfo.cor3}FF 62%, ${gradientLevel()}99 80%, ${setorInfo.cor1}11 100%)`;
        }
        if (isEstoque) {
            return raridade === "lendario"
                ? `linear-gradient(190deg, ${gradientLevel()}15 0%, ${setorInfo.cor4}EE 28%, ${setorInfo.cor3}CC 50%, #D4AF37 65%, ${setorInfo.cor4}EE 70%, ${setorInfo.cor1}77 100%)`
                : `linear-gradient(190deg, ${gradientLevel()}15 0%, ${setorInfo.cor4}EE 28%, ${setorInfo.cor3}CC 50%, ${setorInfo.cor4}EE 70%, ${setorInfo.cor1}77 100%)`;
        }
        if (isPassiva) {
            return raridade === "lendario"
                ? `linear-gradient(135deg, ${gradientLevel()}FF 0%, #FFD70077 15%, ${setorInfo.cor3}BB 35%, ${setorInfo.cor4}FF 52%, ${setorInfo.cor4} 60%, #D4AF3799 70%, ${setorInfo.cor1}FF 100%)`
                : `linear-gradient(135deg, ${gradientLevel()}FF 0%, ${setorInfo.cor2}77 15%, ${setorInfo.cor3}BB 35%, ${setorInfo.cor4}FF 52%, ${setorInfo.cor3}99 70%, ${setorInfo.cor1}FF 100%)`;
        }
    };

    const getBordaDinamica = () => {
        if (isEterno) return { border: `2px solid rgba(124,58,237,0.6)`, boxShadow: `0 0 30px rgba(124,58,237,0.3), 0 0 60px rgba(124,58,237,0.15), inset 0 0 30px rgba(124,58,237,0.1)`, borderRadius: "25px 10px 25px 10px" };
        if (isProducao) return { border: `2px solid ${setorInfo.cor1}55`, boxShadow: `0 0 0 1px ${setorInfo.cor3}88`, borderRadius: "25px 10px 25px 10px" };
        if (isEstoque) return { border: `2px solid ${setorInfo.cor2}`, boxShadow: `0 0 0 3px ${setorInfo.cor3}88`, borderRadius: "20px 20px 20px 20px" };
        if (isVenda) return { borderRadius: "20px 20px 20px 20px", border: `1.5px solid ${setorInfo.cor3}` };
        if (isPassiva) return { border: `1px solid ${setorInfo.cor3}55`, boxShadow: `0 0 0 1px ${setorInfo.cor1}88`, borderRadius: "20px 20px 20px 20px" };
        return { borderRadius: "20px 20px 20px 20px" };
    };

    const getGradientByLevel = () => {
        if (isEterno) return `linear-gradient(135deg, #1a0a2e 0%, #2d0a4e 25%, #4a1a7a 50%, #2d0a4e 75%, #1a0a2e 100%)`;
        if (powerUpSelecionado === "powerUpNv4") return `linear-gradient(135deg, #ff0000 0%, #ff8800 16%, #ffff00 33%, #00ff00 50%, #0088ff 66%, #8800ff 83%, #ff0000 100%)`;
        if (powerUpSelecionado === "powerUpNv3") return `linear-gradient(135deg, #7a5500 0%, #b8870b 20%, #F27405 40%, #FFD700 60%, #F27405 80%, #7a5500 100%)`;
        if (powerUpSelecionado === "powerUpNv2") return `linear-gradient(135deg, #350973 0%, #6411D9 25%, #8F5ADA 50%, #6411D9 75%, #350973 100%)`;
        return `transparent`;
    };

    const getBordaRaridade = () => {
        if (isEterno) return { border: `2px solid rgba(124,58,237,0.4)`, boxShadow: `0 8px 40px rgba(124,58,237,0.15), 0 0 80px rgba(124,58,237,0.08), inset 0 0 30px rgba(124,58,237,0.05)`, borderRadius: "14px" };
        const sombras = {
            comum: `0 8px 24px #00000088`,
            incomum: `0 8px 32px #0044ff44, 0 0 40px #0022aa22`,
            raro: `0 8px 32px #6600cc44, 0 0 60px #44008844`,
            epico: `0 8px 32px #ff660044, 0 0 60px #cc440022`,
            lendario: `0 8px 40px #ffd70066, 0 0 80px #ffaa0033, inset 0 0 30px #ffd70011`,
        };
        return {
            border: `${raridade === "lendario" ? "2px" : raridade === "epico" ? "1.0px" : raridade === "raro" ? "0.6px" : raridade === "incomum" ? "0.3px" : "0px"} solid ${rConfig.cor}`,
            boxShadow: sombras[raridade] || `0 8px 24px #00000088`,
            borderRadius: "14px",
        };
    };

    // ─── FUNDOS TEMÁTICOS (não-Eterno, inalterados) ───────────────────────

    const getFundoTematico = () => {
        if (isEterno) return null; // tratado por componentes dedicados acima
        if (isProducao) {
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl" style={{ opacity: 0.15 }}>
                    <svg className="absolute w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor={setorInfo.cor4} stopOpacity="0" />
                                <stop offset="30%" stopColor={setorInfo.cor4} stopOpacity="0.6" />
                                <stop offset="70%" stopColor={setorInfo.cor4} stopOpacity="0.6" />
                                <stop offset="100%" stopColor={setorInfo.cor4} stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <path d="M0,200 Q50,100 100,200 T200,200 T300,200 T400,200 L400,400 L0,400 Z" fill="url(#waveGrad)">
                            <animate attributeName="d" dur="8s" repeatCount="indefinite" values="M0,200 Q50,100 100,200 T200,200 T300,200 T400,200 L400,400 L0,400 Z;M0,200 Q50,300 100,200 T200,200 T300,200 T400,200 L400,400 L0,400 Z;M0,200 Q50,100 100,200 T200,200 T300,200 T400,200 L400,400 L0,400 Z" />
                        </path>
                        <path d="M0,250 Q50,150 100,250 T200,250 T300,250 T400,250 L400,400 L0,400 Z" fill="url(#waveGrad)" opacity="0.7">
                            <animate attributeName="d" dur="10s" repeatCount="indefinite" values="M0,250 Q50,150 100,250 T200,250 T300,250 T400,250 L400,400 L0,400 Z;M0,250 Q50,350 100,250 T200,250 T300,250 T400,250 L400,400 L0,400 Z;M0,250 Q50,150 100,250 T200,250 T300,250 T400,250 L400,400 L0,400 Z" />
                        </path>
                    </svg>
                </div>
            );
        }
        if (isVenda) {
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl" style={{ opacity: 0.12 }}>
                    <svg className="absolute w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="diagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor={setorInfo.cor4} stopOpacity="0" />
                                <stop offset="20%" stopColor={setorInfo.cor4} stopOpacity="0.8" />
                                <stop offset="80%" stopColor={setorInfo.cor4} stopOpacity="0.8" />
                                <stop offset="100%" stopColor={setorInfo.cor4} stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <line x1="0" y1="0" x2="400" y2="400" stroke="url(#diagGrad)" strokeWidth="2">
                            <animate attributeName="y1" dur="4s" repeatCount="indefinite" values="0;400;0" />
                            <animate attributeName="x2" dur="4s" repeatCount="indefinite" values="400;0;400" />
                        </line>
                        <line x1="0" y1="100" x2="300" y2="400" stroke="url(#diagGrad)" strokeWidth="1.5" opacity="0.6">
                            <animate attributeName="y1" dur="5s" repeatCount="indefinite" values="100;300;100" />
                        </line>
                        <line x1="100" y1="0" x2="400" y2="300" stroke="url(#diagGrad)" strokeWidth="1.5" opacity="0.6">
                            <animate attributeName="x1" dur="5.5s" repeatCount="indefinite" values="100;300;100" />
                        </line>
                    </svg>
                </div>
            );
        }
        if (isEstoque) {
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl" style={{ opacity: 0.10 }}>
                    <svg className="absolute w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
                        <defs>
                            <polygon id="hex" points="20,0 40,11.5 40,34.5 20,46 0,34.5 0,11.5" fill={setorInfo.cor4} opacity="0.5" />
                            <pattern id="hexPattern" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
                                <use href="#hex" x="0" y="0"><animate attributeName="opacity" dur="3s" repeatCount="indefinite" values="0.3;0.7;0.3" /></use>
                                <use href="#hex" x="40" y="26"><animate attributeName="opacity" dur="3.5s" repeatCount="indefinite" values="0.5;0.2;0.5" /></use>
                            </pattern>
                        </defs>
                        <rect x="0" y="0" width="400" height="400" fill="url(#hexPattern)" />
                    </svg>
                </div>
            );
        }
        if (isPassiva) {
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl" style={{ opacity: 0.10 }}>
                    <svg className="absolute w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
                        <defs>
                            <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                                <rect width="40" height="40" fill="none" stroke={setorInfo.cor4} strokeWidth="0.5" opacity="0.4">
                                    <animate attributeName="opacity" dur="4s" repeatCount="indefinite" values="0.2;0.6;0.2" />
                                </rect>
                            </pattern>
                            <pattern id="gridPattern2" width="20" height="20" patternUnits="userSpaceOnUse">
                                <circle cx="10" cy="10" r="1" fill={setorInfo.cor4} opacity="0.3">
                                    <animate attributeName="r" dur="3s" repeatCount="indefinite" values="0.5;2;0.5" />
                                </circle>
                            </pattern>
                        </defs>
                        <rect x="0" y="0" width="400" height="400" fill="url(#gridPattern)" />
                        <rect x="0" y="0" width="400" height="400" fill="url(#gridPattern2)" />
                    </svg>
                </div>
            );
        }
        return null;
    };

    // ─── AURA POWER-UP (não-Eterno, inalterada) ───────────────────────────

    const getAuraPowerUp = () => {
        if (isEterno) return null; // <EternoAura /> é montado separado
        if (powerUpSelecionado === "powerUpNv1") return (
            <div className="absolute inset-[-4px] pointer-events-none rounded-xl" style={{ boxShadow: `inset 0 0 15px ${setorInfo.cor4}22` }} />
        );
        if (powerUpSelecionado === "powerUpNv2") return (
            <div className="absolute inset-[-6px] pointer-events-none rounded-xl" style={{ boxShadow: `0 0 20px #6411D966, 0 0 40px #6411D933, inset 0 0 30px #6411D922`, animation: "pulseAuraNv2 2.5s ease-in-out infinite" }} />
        );
        if (powerUpSelecionado === "powerUpNv3") return (
            <div className="absolute inset-[-8px] pointer-events-none rounded-xl" style={{ boxShadow: `0 0 30px #FFD70066, 0 0 60px #FFD70044, 0 0 90px #FFD70022, inset 0 0 40px #FFD70033`, animation: "pulseAuraNv3 2s ease-in-out infinite" }} />
        );
        if (powerUpSelecionado === "powerUpNv4") return (
            <>
                <div className="absolute inset-[-12px] pointer-events-none rounded-xl" style={{ boxShadow: `0 0 40px #ff000066, 0 0 80px #ff880044, 0 0 120px #00ff0044, 0 0 160px #0088ff44, inset 0 0 60px #ff00ff33`, animation: "pulseRainbow 3s linear infinite" }} />
                <div className="absolute inset-[-20px] pointer-events-none overflow-hidden rounded-xl">
                    {[...Array(15)].map((_, i) => (
                        <div key={i} className="absolute rounded-full" style={{ width: 2 + Math.random() * 3, height: 2 + Math.random() * 3, background: `hsl(${Math.random() * 360}, 100%, 70%)`, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animation: `particleFloat ${3 + Math.random() * 4}s ease-in-out infinite`, animationDelay: `${Math.random() * 3}s` }} />
                    ))}
                </div>
            </>
        );
        return null;
    };

    // ─── MOUSE TRACKING ───────────────────────────────────────────────────

    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 400, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 400, damping: 30 });
    const mouseX = useMotionValue(50);
    const mouseY = useMotionValue(50);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
        mouseX.set((e.clientX - rect.left) / rect.width * 100);
        mouseY.set((e.clientY - rect.top) / rect.height * 100);
    };

    const handleMouseLeave = () => {
        x.set(0); y.set(0);
        mouseX.set(50); mouseY.set(50);
    };

    const cardBgColor = raridade === "lendario" ? "#ffd900" : isEterno ? "#1a0a2e" : "transparent";



    return (
        <motion.div
            ref={cardRef}
            style={{ perspective: isEterno ? "1200px" : "1000px", transformStyle: "preserve-3d", position: "relative", width: "220px", height: "320px" }}
            className="flex items-center justify-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                style={{
                    position: "relative", width: "100%", height: "100%",
                    background: getGradientByLevel(),
                    ...getBordaDinamica(),
                    ...getBordaRaridade(),
                    overflow: "hidden",
                    transformStyle: "preserve-3d",
                    rotateX, rotateY,
                    boxShadow: isEterno
                        ? `0 20px 60px rgba(0,0,0,0.7), 0 0 80px rgba(139,92,246,0.15), 0 0 120px rgba(139,92,246,0.08)`
                        : `0 20px 60px rgba(0,0,0,0.4)`,
                    transition: "box-shadow 0.3s ease",
                }}
                className="rounded-[20px] flex flex-col justify-center items-center shadow-lg perspective rounded-br-2xl"
                whileHover={{
                    boxShadow: isEterno
                        ? `0 30px 80px rgba(0,0,0,0.8), 0 0 120px rgba(139,92,246,0.2), 0 0 180px rgba(139,92,246,0.1)`
                        : "0 30px 80px rgba(0,0,0,0.6)",
                    scale: 1.02,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                {/* ── Camada de fundo sólida ── */}
                <div style={{ position: "absolute", inset: 0, background: cardBgColor, opacity: isEterno ? 0.98 : (raridade === "lendario" ? 0.15 : 0), borderRadius: "12px", pointerEvents: "none", zIndex: 0 }} />

                {/* ── Glow do mouse ── */}
                <motion.div
                    className="absolute inset-0 pointer-events-none rounded-xl"
                    style={{
                        background: useTransform(
                            [mouseX, mouseY],
                            ([mx, my]) => `radial-gradient(circle at ${mx}% ${my}%, ${isEterno ? "rgba(139,92,246,0.12)" : "rgba(255,255,255,0.15)"} 0%, transparent 60%)`
                        ),
                        zIndex: 4,
                    }}
                />

                {/* ── Efeitos exclusivos ETERNO ── */}
                {isEterno && (
                    <>
                        <EternoNebula />
                        <EternoParticlesCanvas />
                        <EternoEnergyLines />
                        <EternoTravelGlows />
                        <V4Ignicao />
                        {/* <EternoAura /> */}
                        {/* <div class="v4-haze"></div>
                        <div class="v4-burst"></div>
                        <div class="v4-corona"></div> */}
                    </>
                )}

                {/* ── Fundo temático (não-Eterno) ── */}
                {!isEterno && <div style={{ zIndex: 0 }}>{getFundoTematico()}</div>}

                {/* ── Aura de Power-Up (não-Eterno) ── */}
                {!isEterno && <div style={{ zIndex: 1 }}>{getAuraPowerUp()}</div>}

                {/* ── CONTEÚDO PRINCIPAL ── */}
                <div className="relative w-full h-full rounded-2xl rounded-br-2xl" style={{ transformStyle: "preserve-3d", zIndex: 5 }}>

                    {/* Badge de categoria (canto inferior direito) */}
                    <div className="absolute bottom-0 right-0 w-[50px] h-[50px] z-20 flex items-center justify-center rounded-tl-2xl rounded-br-2xl">
                        <div className="absolute inset-0 rounded-tl-2xl rounded-br-2xl" style={{
                            background: isEterno
                                ? `linear-gradient(135deg, rgba(139,92,246,0.6), rgba(139,92,246,0.2), ${setorInfo.cor4}22)`
                                : raridade === "lendario"
                                    ? `linear-gradient(135deg, #ffd700, #ffd70066, ${setorInfo.cor4})`
                                    : setorInfo.cor3,
                            boxShadow: isEterno ? "-2px -2px 30px rgba(139,92,246,0.1)" : "-2px -2px 10px rgba(0,0,0,0.3)",
                        }} />
                        <div className="w-[50px] h-[50px] flex items-center justify-center rounded-tl-2xl rounded-br-2xl" style={{ backgroundColor: isEterno ? "rgba(139,92,246,0.15)" : "rgba(0,0,0,0.2)", backdropFilter: "blur(4px)" }}>
                            {isEterno
                                ? <span style={{ fontSize: 22, color: "rgba(139,92,246,0.7)" }}>∞</span>
                                : <img src={passive} className="w-[24px] opacity-90" alt="" />
                            }
                        </div>
                    </div>

                    {/* Overlay de gradiente frontal */}
                    <div className="absolute w-full h-full flex items-center justify-center rounded-xl" style={{ background: getGradient(), mixBlendMode: isEterno ? "overlay" : "color-dodge", opacity: isEterno ? 0.05 : 1 }} />

                    {/* Conteúdo legível */}
                    <div className="absolute w-full h-full flex items-center justify-center rounded-xl z-10">
                        <div className="w-[90%] h-[90%] flex flex-col items-center justify-between self-center">

                            <div className="flex-1 flex flex-col items-center justify-center gap-[10px] w-full">

                                {/* Badge de raridade */}
                                <div style={{
                                    position: "absolute", top: 8, right: 8, zIndex: 15,
                                    fontSize: isEterno ? 9 : 7, fontWeight: 900,
                                    textTransform: "uppercase", letterSpacing: isEterno ? ".15em" : ".1em",
                                    padding: isEterno ? "4px 14px" : "2px 6px", borderRadius: 4,
                                    background: isEterno
                                        ? `linear-gradient(135deg, rgba(139,92,246,0.4), rgba(124,58,237,0.2))`
                                        : `${setorInfo.cor1}cc`,
                                    color: isEterno ? "#c4b5fd" : setorInfo.cor4,
                                    border: isEterno ? `1px solid rgba(139,92,246,0.4)` : `1px solid ${setorInfo.cor4}66`,
                                    backdropFilter: isEterno ? "blur(10px)" : "none",
                                    boxShadow: isEterno ? `0 0 30px rgba(139,92,246,0.15)` : "none",
                                }}>
                                    {isEterno ? "∞ ETERNO" : (
                                        raridade === "comum" ? "Comum" :
                                            raridade === "incomum" ? "Incomum" :
                                                raridade === "raro" ? "Raro" :
                                                    raridade === "epico" ? "Épico" : "Lendário"
                                    )}
                                </div>

                                {/* Box da imagem */}
                                <div style={{
                                    width: isEterno ? 120 : 100, height: isEterno ? 120 : 100, borderRadius: 12,
                                    background: isEterno
                                        ? `radial-gradient(circle at 30% 30%, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.05) 50%, transparent 100%)`
                                        : `radial-gradient(circle at 8% 8%, ${RARIDADE_CONFIG[raridade].corBg} 0%, ${setorInfo.cor1} 50%, ${setorInfo.cor2} 80%, ${RARIDADE_CONFIG[raridade].corBg} 100%)`,
                                    border: isEterno ? `2px solid rgba(139,92,246,0.3)` : `1px solid ${setorInfo.cor3}66`,
                                    boxShadow: isEterno
                                        ? `0 0 30px rgba(139,92,246,0.3), inset 0 0 20px rgba(99,102,241,0.15)`
                                        : `0 4px 20px ${setorInfo.cor4}33, inset 0 0 20px ${setorInfo.cor1}88`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    position: "relative", overflow: "hidden", flexShrink: 0,
                                    animation: isEterno ? "iconGlowEterno 3s ease-in-out infinite alternate" : undefined,
                                }}>
                                    <div style={{
                                        width: isEterno ? 120 : 100, height: isEterno ? 120 : 100, borderRadius: 12,
                                        background: isEterno ? "transparent" : `${RARIDADE_CONFIG[raridade].corBg}50`,
                                        border: isEterno ? "none" : `1px solid ${setorInfo.cor3}66`,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        position: "relative", overflow: "hidden", flexShrink: 0,
                                    }}>
                                        <img
                                            src={getImageUrl(nomeAtual)}
                                            alt={nomeAtual}
                                            style={{
                                                width: "70%", height: "70%", objectFit: "contain",
                                                filter: isEterno
                                                    ? `drop-shadow(0 0 14px rgba(139,92,246,0.6)) brightness(1.1)`
                                                    : `drop-shadow(0 0 8px ${setorInfo.cor4}88)`,
                                            }}
                                        />
                                        <div style={{
                                            position: "absolute", bottom: 5, left: 0, right: 0,
                                            display: "flex", justifyContent: "center", gap: isEterno ? 3 : 2,
                                            fontSize: isEterno ? 14 : 8,
                                            color: isEterno ? "rgba(139,92,246,0.7)" : setorInfo.cor4,
                                            textShadow: isEterno ? `0 0 20px rgba(139,92,246,0.4)` : (raridade === "lendario" ? `0 0 6px ${setorInfo.cor4}` : "none"),
                                        }}>
                                            {isEterno ? "∞" : "★".repeat(
                                                raridade === "comum" ? 1 : raridade === "incomum" ? 2 : raridade === "raro" ? 3 : raridade === "epico" ? 4 : 5
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Divisor */}
                                <div style={{
                                    width: "85%", height: 1,
                                    background: isEterno
                                        ? `linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)`
                                        : `linear-gradient(90deg, transparent, ${setorInfo.cor4}, transparent)`,
                                    boxShadow: isEterno
                                        ? `0 0 12px rgba(139,92,246,0.2)`
                                        : (raridade === "lendario" || raridade === "epico" ? `0 0 6px ${setorInfo.cor4}88` : "none"),
                                }} />

                                {/* Nome */}
                                <h1 className="fonteBold text-center" style={{
                                    fontSize: isEterno ? 13 : 12, lineHeight: 1.3, maxWidth: "85%",
                                    color: isEterno ? "#ffffff" : (raridade === "lendario" ? "#ffec81" : "#ffffff"),
                                    textTransform: "uppercase", letterSpacing: ".04em",
                                    textShadow: isEterno
                                        ? `0 0 20px rgba(139,92,246,0.4), 0 0 40px rgba(139,92,246,0.2)`
                                        : (raridade === "lendario" ? `0 0 10px ${setorInfo.cor4}88, 0 1px 4px #00000088` : `0 1px 6px #00000088`),
                                }}>
                                    {nomeAtual}
                                </h1>

                                {/* Stats */}
                                {/* <h1 className="fonteLight text-center" style={{
                                    color: isEterno ? "#ffffff" : (raridade === "lendario" ? "#ffffff" : "#ffffff"),
                                    fontSize: isEterno ? 11 : 10, lineHeight: 1.3, maxWidth: "85%",
                                    textTransform: "uppercase", letterSpacing: ".04em",
                                    textShadow: isEterno ? `0 0 15px rgba(139,92,246,0.3)` : (raridade === "lendario" ? `0 0 10px ${setorInfo.cor4}88, 0 1px 4px #00000088` : `0 1px 6px #00000088`),
                                }}>
                                    Redução de Custo: - {redCusto} %
                                </h1>
                                <h1 className="fonteLight text-center" style={{
                                    color: isEterno ? "#ffffff" : (raridade === "lendario" ? "#ffffff" : "#ffffff"),
                                    fontSize: isEterno ? 11 : 10, lineHeight: 1.3, maxWidth: "85%",
                                    textTransform: "uppercase", letterSpacing: ".04em",
                                    textShadow: isEterno ? `0 0 15px rgba(139,92,246,0.3)` : (raridade === "lendario" ? `0 0 10px ${setorInfo.cor4}88, 0 1px 4px #00000088` : `0 1px 6px #00000088`),
                                }}>
                                    Faturamento: + {fatu} %
                                </h1> */}
                            </div>

                            {/* Custo total */}
                            <div style={{
                                padding: isEterno ? "4px 16px" : "0 8px", borderRadius: 6, flexShrink: 0,
                                background: isEterno
                                    ? `linear-gradient(135deg, rgba(139,92,246,0.2), rgba(139,92,246,0.05))`
                                    : setorInfo.cor1,
                                color: isEterno ? "#ffffff" : setorInfo.cor4,
                                border: isEterno ? `1px solid rgba(139,92,246,0.2)` : `1px solid ${setorInfo.cor3}66`,
                                display: "flex", alignItems: "center",
                                fontSize: isEterno ? 12 : 10, fontWeight: 700,
                                boxShadow: isEterno ? `0 0 20px rgba(139,92,246,0.1)` : "none",
                                backdropFilter: isEterno ? "blur(10px)" : "none",
                            }}>
                                {formatarNumero(totalCusto)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Keyframes de animação CSS ── */}
                <style>{`
                    @keyframes pulseAuraNv2 {
                        0%, 100% { opacity: 0.6; }
                        50% { opacity: 1; }
                    }
                    @keyframes pulseAuraNv3 {
                        0%, 100% { opacity: 0.5; transform: scale(1); }
                        50% { opacity: 1; transform: scale(1.02); }
                    }
                    @keyframes pulseRainbow {
                        0%   { box-shadow: 0 0 40px #ff000066, 0 0 80px #ff880044, 0 0 120px #00ff0044, 0 0 160px #0088ff44, inset 0 0 60px #ff00ff33; }
                        25%  { box-shadow: 0 0 40px #ff880066, 0 0 80px #ffff0044, 0 0 120px #00ff8844, 0 0 160px #4400ff44, inset 0 0 60px #ff660033; }
                        50%  { box-shadow: 0 0 40px #00ff0066, 0 0 80px #00ff8844, 0 0 120px #0088ff44, 0 0 160px #8800ff44, inset 0 0 60px #00ffcc33; }
                        75%  { box-shadow: 0 0 40px #0088ff66, 0 0 80px #4400ff44, 0 0 120px #8800ff44, 0 0 160px #ff00ff44, inset 0 0 60px #6600ff33; }
                        100% { box-shadow: 0 0 40px #ff000066, 0 0 80px #ff880044, 0 0 120px #00ff0044, 0 0 160px #0088ff44, inset 0 0 60px #ff00ff33; }
                    }
                    @keyframes particleFloat {
                        0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
                        50%      { transform: translateY(-20px) scale(1.5); opacity: 1; }
                    }
                    @keyframes iconGlowEterno {
                        from { box-shadow: 0 0 20px rgba(139,92,246,0.3), inset 0 0 10px rgba(99,102,241,0.1); }
                        to   { box-shadow: 0 0 50px rgba(139,92,246,0.6), inset 0 0 30px rgba(99,102,241,0.3); }
                    }
                        .v2{background:#02000a;border:1.5px solid rgba(80,200,255,0.4)}
.v2-core{position:absolute;inset:0;background:radial-gradient(circle at 50% 48%,rgba(255,255,255,1) 0%,rgba(150,230,255,0.9) 4%,rgba(40,140,255,0.6) 14%,rgba(10,40,180,0.35) 28%,rgba(5,10,80,0.2) 50%,transparent 70%);z-index:1;animation:coreFlicker 2s ease-in-out infinite alternate}
.v2-jet{position:absolute;left:50%;z-index:2;transform:translateX(-50%);background:linear-gradient(to bottom,rgba(100,200,255,0.0),rgba(100,200,255,0.5),rgba(255,255,255,0.8),rgba(100,200,255,0.5),rgba(100,200,255,0.0));width:8px;border-radius:4px;filter:blur(3px);animation:jetPulse 1.8s ease-in-out infinite alternate}
.v2-jet.top{top:0;height:45%}
.v2-jet.bot{bottom:0;height:45%}
.v2-halo{position:absolute;inset:0;z-index:1;background:radial-gradient(ellipse 300% 40% at 50% 48%,rgba(40,140,255,0.18) 0%,transparent 60%),radial-gradient(ellipse 40% 300% at 50% 48%,rgba(40,140,255,0.08) 0%,transparent 60%);animation:haloSpin 12s linear infinite}
.v2-ring{position:absolute;inset:0;z-index:2;display:flex;align-items:center;justify-content:center}
.v2-ring::before,.v2-ring::after{content:'';position:absolute;border-radius:50%;animation:shockwave2 4s ease-out infinite}
.v2-ring::before{width:50px;height:50px;border:1.5px solid rgba(100,200,255,0.8);animation-delay:0s}
.v2-ring::after{width:50px;height:50px;border:1px solid rgba(180,220,255,0.4);animation-delay:2s}
@keyframes coreFlicker{from{opacity:.85}to{opacity:1}}
@keyframes jetPulse{from{opacity:.6;transform:translateX(-50%) scaleX(1)}to{opacity:1;transform:translateX(-50%) scaleX(1.5)}}
@keyframes haloSpin{to{transform:rotate(360deg)}}
@keyframes shockwave2{0%{transform:scale(.3);opacity:1}100%{transform:scale(5);opacity:0}}

                `}</style>
            </motion.div>
        </motion.div>
    );
};

export const CardUpgrade = React.memo(CardUpgradeBase);

