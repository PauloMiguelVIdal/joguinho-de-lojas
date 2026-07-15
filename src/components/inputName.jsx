import React, { useState, useContext, useEffect } from 'react';
import { Localizador } from "./localizador";
import { CentraldeDadosContext } from '../centralDeDadosContext';
import pdfTutorial from '../../public/PDF/Tutorial.pdf'

// ─── HOOK DE DETECÇÃO DE DISPOSITIVO ──────────────────────────────────────────
function useDeviceDetection() {
    const [isMobile, setIsMobile] = useState(false);
    const [isLandscape, setIsLandscape] = useState(false);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

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

// ─── Cartas decorativas de fundo ─────────────────────────────────────────────
const edificiosDecorativos = [
    { nome: "Plantação De Grãos",       pos: { left: "2%",  top: "8%",  rotate: "-15deg", delay: "0s",    duration: "18s", opacity: .5  }, nivel: 1 },
    { nome: "Fábrica De Chips",          pos: { left: "10%", top: "55%", rotate: "8deg",   delay: "2s",    duration: "22s", opacity: .4  }, nivel: 3 },
    { nome: "Alto-Forno",                pos: { left: "5%",  top: "75%", rotate: "-6deg",  delay: "5s",    duration: "19s", opacity: .45 }, nivel: 2 },
    { nome: "Mercado",                   pos: { left: "18%", top: "18%", rotate: "12deg",  delay: "1s",    duration: "24s", opacity: .35 }, nivel: 1 },
    { nome: "Construtora",               pos: { left: "22%", top: "72%", rotate: "-10deg", delay: "7s",    duration: "20s", opacity: .45 }, nivel: 2 },
    { nome: "Usina Solar",               pos: { left: "75%", top: "12%", rotate: "18deg",  delay: "3s",    duration: "21s", opacity: .4  }, nivel: 1 },
    { nome: "Fazenda De Vacas",          pos: { left: "80%", top: "60%", rotate: "-12deg", delay: "6s",    duration: "17s", opacity: .5  }, nivel: 3 },
    { nome: "Fábrica De Smartphones",    pos: { left: "87%", top: "28%", rotate: "5deg",   delay: "9s",    duration: "23s", opacity: .35 }, nivel: 2 },
    { nome: "Usina Siderúrgica",         pos: { left: "68%", top: "75%", rotate: "-8deg",  delay: "4s",    duration: "20s", opacity: .45 }, nivel: 3 },
    { nome: "Aeroporto",                 pos: { left: "55%", top: "6%",  rotate: "14deg",  delay: "8s",    duration: "25s", opacity: .35 }, nivel: 1 },
    { nome: "Parque Eólico",             pos: { left: "38%", top: "80%", rotate: "-18deg", delay: "11s",   duration: "19s", opacity: .4  }, nivel: 2 },
    { nome: "Fábrica De Robôs",          pos: { left: "91%", top: "78%", rotate: "7deg",   delay: "13s",   duration: "22s", opacity: .35 }, nivel: 3 },
    { nome: "Refinaria",                 pos: { left: "30%", top: "5%",  rotate: "-9deg",  delay: "3.5s",  duration: "20s", opacity: .4  }, nivel: 3 },
    { nome: "Fábrica De Foguetes",       pos: { left: "45%", top: "82%", rotate: "11deg",  delay: "6.5s",  duration: "23s", opacity: .35 }, nivel: 2 },
    { nome: "Shopping Center",           pos: { left: "60%", top: "45%", rotate: "-14deg", delay: "1.5s",  duration: "21s", opacity: .3  }, nivel: 1 },
    { nome: "Mineradora",                pos: { left: "14%", top: "35%", rotate: "6deg",   delay: "9.5s",  duration: "18s", opacity: .4  }, nivel: 2 },
    { nome: "Plataforma De Petróleo",    pos: { left: "50%", top: "60%", rotate: "-5deg",  delay: "4.5s",  duration: "24s", opacity: .3  }, nivel: 3 },
    { nome: "Data Center",               pos: { left: "72%", top: "35%", rotate: "16deg",  delay: "12s",   duration: "20s", opacity: .35 }, nivel: 1 },
    { nome: "Usina Hidrelétrica",        pos: { left: "3%",  top: "42%", rotate: "-20deg", delay: "7.5s",  duration: "22s", opacity: .4  }, nivel: 2 },
    { nome: "Fábrica De Automóveis",     pos: { left: "83%", top: "10%", rotate: "9deg",   delay: "2.5s",  duration: "19s", opacity: .35 }, nivel: 3 },
    { nome: "Porto",                     pos: { left: "25%", top: "48%", rotate: "-7deg",  delay: "10s",   duration: "26s", opacity: .3  }, nivel: 1 },
    { nome: "Laboratório Farmacêutico",  pos: { left: "58%", top: "22%", rotate: "13deg",  delay: "5.5s",  duration: "21s", opacity: .35 }, nivel: 2 },
    { nome: "Fábrica De Baterias",       pos: { left: "42%", top: "15%", rotate: "-11deg", delay: "14s",   duration: "18s", opacity: .4  }, nivel: 1 },
    { nome: "Estaleiro",                 pos: { left: "95%", top: "50%", rotate: "4deg",   delay: "8.5s",  duration: "23s", opacity: .3  }, nivel: 3 },
];

// ─── Overlays por nível ──────────────────────────────────────────────────────
const NIVEL_OVERLAY = {
    1: "transparent",
    2: "rgba(100,17,217,0.35)",
    3: "rgba(184,135,11,0.45)",
};
const NIVEL_BORDER = {
    1: "none",
    2: "2px solid rgba(143,90,218,0.6)",
    3: "2px solid rgba(240,193,64,0.7)",
};
const NIVEL_GLOW = {
    1: "none",
    2: "0 0 14px rgba(100,17,217,0.5)",
    3: "0 0 18px rgba(240,193,64,0.55)",
};

// ─── Componente ───────────────────────────────────────────────────────────────
const InputName = () => {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext);
    const { isMobile, isLandscape, isDesktop } = useDeviceDetection();
    
    const inicioGame = dados.inicioGame;
    const modalInicio = dados.modalInicio;

    // ── Estado local ──────────────────────────────────────────
    const [novoNome, setNovoNome] = useState("");

    // Não exibe nada se o modal de início não estiver aberto
    if (inicioGame.estadoModal !== true) return null;

    const handleChangeNome = (e) => setNovoNome(e.target.value.toUpperCase());

    const atualizarContexto = () => {
        if (!novoNome.trim()) {
            alert("Campo não preenchido");
            return;
        }
        atualizarDados("inicioGame", { 
            ...inicioGame, 
            nomeEmpresa: novoNome, 
            estadoModal: false,
            jogoIniciado: true
        });
        atualizarDados("modalInicio", { ...modalInicio, estadoModal: true });
        atualizarDados("jogoIniciado", true);
    };

    // ─── Função para abrir PDF em nova aba ────────────────────
    const abrirPDF = () => {
        // URL do PDF - ajuste conforme necessário
        const pdfUrl = pdfTutorial;
        window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    };

    // ─── CONFIGURAÇÕES RESPONSIVAS ──────────────────────────────
    const modalWidth = isDesktop ? 'min(520px, 80vw)' : '80vw';
    const modalMaxWidth = isDesktop ? '520px' : '400px';
    const modalHeight = isDesktop ? 'auto' : '80vh';
    const modalMaxHeight = isDesktop ? 'auto' : '80vh';
    
    const modalPadding = isDesktop 
        ? '44px 40px 40px' 
        : isLandscape 
            ? '16px 20px 16px' 
            : '24px 16px 20px';
    
    const tituloSize = isDesktop ? 32 : (isLandscape ? 20 : 24);
    const subtituloSize = isDesktop ? 12 : (isLandscape ? 9 : 10);
    const badgeFontSize = isDesktop ? 10 : (isLandscape ? 7 : 8);
    const badgePadding = isDesktop ? '4px 10px' : (isLandscape ? '2px 5px' : '2px 7px');
    const inputHeight = isDesktop ? 52 : (isLandscape ? 36 : 42);
    const inputFontSize = isDesktop ? 17 : (isLandscape ? 13 : 15);
    const botaoSize = isDesktop ? 52 : (isLandscape ? 36 : 42);
    const svgSize = isDesktop ? 22 : (isLandscape ? 14 : 18);
    const textFooterSize = isDesktop ? 12 : (isLandscape ? 9 : 10);
    
    const marginBottomTitulo = isDesktop ? 6 : (isLandscape ? 2 : 4);
    const marginBottomSubtitulo = isDesktop ? 28 : (isLandscape ? 12 : 16);
    const marginBottomBadges = isDesktop ? 28 : (isLandscape ? 12 : 16);
    const marginBottomDivisor = isDesktop ? 24 : (isLandscape ? 12 : 16);
    const marginBottomLabel = isDesktop ? 10 : (isLandscape ? 4 : 6);
    const marginBottomInput = isDesktop ? 20 : (isLandscape ? 10 : 14);
    const marginBottomPDF = isDesktop ? 16 : (isLandscape ? 8 : 10);
    const gapInput = isDesktop ? 10 : (isLandscape ? 6 : 8);
    const gapBadges = isDesktop ? 8 : (isLandscape ? 4 : 6);
    
    const borderRadius = isDesktop ? 20 : (isLandscape ? 12 : 16);
    const inputRadius = isDesktop ? 12 : (isLandscape ? 8 : 10);
    
    const mostrarCartas = isDesktop;

    return (
        <div style={{
            position: "fixed", inset: 0, zIndex: 40,
            background: "#050510",
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            overflow: "hidden",
            backgroundImage: `
                linear-gradient(rgba(100,17,217,0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(100,17,217,0.08) 1px, transparent 1px)`,
            backgroundSize: isDesktop ? "48px 48px" : "24px 24px",
        }}>
            {/* Glow central */}
            <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                width: isDesktop ? 600 : 250,
                height: isDesktop ? 400 : 200,
                pointerEvents: "none",
                background: "radial-gradient(ellipse, rgba(100,17,217,0.25) 0%, transparent 70%)",
            }} />

            {/* Keyframes de flutuação - apenas desktop */}
            {isDesktop && (
                <style>{`
                    @keyframes cardFloatReal {
                        0%   { opacity: 0;           transform: rotate(var(--r)) translateY(30px)  scale(0.52); }
                        10%  { opacity: var(--op);   transform: rotate(var(--r)) translateY(0px)   scale(0.52); }
                        90%  { opacity: var(--op);   transform: rotate(var(--r)) translateY(0px)   scale(0.52); }
                        100% { opacity: 0;           transform: rotate(var(--r)) translateY(-30px) scale(0.52); }
                    }
                `}</style>
            )}

            {/* Cartas decorativas flutuando - apenas desktop */}
            {mostrarCartas && edificiosDecorativos.map((ed, i) => (
                <div
                    key={i}
                    style={{
                        position: "absolute",
                        left: ed.pos.left,
                        top: ed.pos.top,
                        pointerEvents: "none",
                        transformOrigin: "top left",
                        "--r": ed.pos.rotate,
                        "--op": ed.pos.opacity,
                        animation: `cardFloatReal ${ed.pos.duration} ease-in-out ${ed.pos.delay} infinite`,
                        borderRadius: 20,
                        overflow: "visible",
                        scale: isDesktop ? 1 : 0.6,
                    }}
                >
                    <div style={{
                        position: "absolute", inset: 0,
                        borderRadius: 20,
                        background: NIVEL_OVERLAY[ed.nivel],
                        border: NIVEL_BORDER[ed.nivel],
                        boxShadow: NIVEL_GLOW[ed.nivel],
                        zIndex: 5,
                        pointerEvents: "none",
                    }} />
                    {Localizador(ed.nome)}
                </div>
            ))}

            {/* Modal central */}
            <div style={{
                position: "relative", 
                zIndex: 10,
                width: modalWidth,
                maxWidth: modalMaxWidth,
                height: modalHeight,
                maxHeight: modalMaxHeight,
                background: "linear-gradient(160deg,#0d0a1f 0%,#120829 50%,#0a0718 100%)",
                border: "1px solid rgba(100,17,217,0.5)",
                borderRadius: borderRadius,
                padding: modalPadding,
                boxShadow: "0 0 0 1px rgba(143,90,218,0.15), 0 30px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(143,90,218,0.2)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                overflow: isMobile ? 'auto' : 'visible',
            }}>
                {/* Linha decorativa no topo */}
                <div style={{
                    position: "absolute", 
                    top: 0, 
                    left: "50%", 
                    transform: "translateX(-50%)",
                    width: isDesktop ? 120 : (isLandscape ? 60 : 80),
                    height: 2,
                    background: "linear-gradient(90deg,transparent,#8F5ADA,transparent)",
                    borderRadius: 2,
                }} />

                {/* Título - "Bem-vindo ao" */}
                <p style={{ 
                    fontFamily: "serif", 
                    fontSize: isDesktop ? 11 : (isLandscape ? 8 : 9), 
                    fontWeight: 700, 
                    color: "#8F5ADA", 
                    letterSpacing: ".35em", 
                    textTransform: "uppercase", 
                    textAlign: "center", 
                    marginBottom: isDesktop ? 10 : (isLandscape ? 4 : 6),
                }}>
                    — Bem-vindo ao —
                </p>

                {/* Título - Business.Game */}
                <h1 style={{ 
                    fontFamily: "serif", 
                    fontSize: tituloSize, 
                    fontWeight: 900, 
                    color: "#fff", 
                    textAlign: "center", 
                    marginBottom: marginBottomTitulo,
                }}>
                    Business<span style={{ color: "#F27405" }}>.</span>Game
                </h1>

                {/* Subtítulo */}
                <p style={{ 
                    fontSize: subtituloSize, 
                    color: "rgba(255,255,255,.35)", 
                    textAlign: "center", 
                    letterSpacing: ".12em", 
                    textTransform: "uppercase", 
                    marginBottom: marginBottomSubtitulo,
                }}>
                    {isDesktop ? 'Construa seu império corporativo' : 'Construa seu império'}
                </p>

                {/* Badges de setores */}
                <div style={{ 
                    display: "flex", 
                    gap: gapBadges, 
                    justifyContent: "center", 
                    marginBottom: marginBottomBadges, 
                    flexWrap: "wrap" 
                }}>
                    {[
                        ["Agricultura", "#4CAF50"],
                        ["Tecnologia",  "#FF8C42"],
                        ["Indústria",   "#B3B3B3"],
                        ["Comércio",    "#FF4D4D"],
                        ["Imóveis",     "#6666FF"],
                        ["Energia",     "#FFD966"],
                    ].map(([s, c]) => (
                        <span key={s} style={{ 
                            fontSize: badgeFontSize, 
                            fontWeight: 700, 
                            letterSpacing: ".1em", 
                            textTransform: "uppercase", 
                            padding: badgePadding, 
                            borderRadius: 20, 
                            border: `1px solid ${c}`, 
                            color: c, 
                            opacity: .6,
                            whiteSpace: 'nowrap',
                        }}>
                            {isMobile && isLandscape ? s.substring(0, 3) : s}
                        </span>
                    ))}
                </div>

                {/* Divisor */}
                {(isDesktop || !isLandscape) && (
                    <div style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: isDesktop ? 12 : 8, 
                        marginBottom: marginBottomDivisor 
                    }}>
                        <div style={{ flex: 1, height: 1, background: "rgba(143,90,218,0.2)" }} />
                        <span style={{ 
                            fontSize: isDesktop ? 10 : (isLandscape ? 7 : 8), 
                            color: "rgba(255,255,255,.3)", 
                            letterSpacing: ".2em", 
                            textTransform: "uppercase" 
                        }}>
                            {isMobile ? 'Seu legado' : 'Escolha seu legado'}
                        </span>
                        <div style={{ flex: 1, height: 1, background: "rgba(143,90,218,0.2)" }} />
                    </div>
                )}

                {/* Label - Nome da empresa */}
                <p style={{ 
                    fontSize: isDesktop ? 11 : (isLandscape ? 8 : 9), 
                    fontWeight: 600, 
                    color: "rgba(255,255,255,.4)", 
                    letterSpacing: ".15em", 
                    textTransform: "uppercase", 
                    marginBottom: marginBottomLabel,
                }}>
                    Nome da empresa
                </p>

                {/* Input + botão */}
                <div style={{ 
                    display: "flex", 
                    gap: gapInput, 
                    marginBottom: marginBottomInput,
                    flexShrink: 0,
                }}>
                    <input
                        type="text"
                        placeholder={isDesktop ? "Ex: Grupo Nexus S.A." : "Ex: Grupo Nexus"}
                        value={novoNome}
                        onChange={handleChangeNome}
                        onKeyDown={e => e.key === "Enter" && atualizarContexto()}
                        style={{
                            flex: 1, 
                            height: inputHeight, 
                            borderRadius: inputRadius, 
                            padding: isDesktop ? "0 18px" : (isLandscape ? "0 10px" : "0 14px"),
                            background: "rgba(100,17,217,0.12)",
                            border: "1px solid rgba(100,17,217,0.35)",
                            fontFamily: "inherit", 
                            fontSize: inputFontSize, 
                            fontWeight: 600, 
                            color: "#fff",
                            outline: "none",
                            minWidth: 0,
                        }}
                    />
                    <button
                        onClick={atualizarContexto}
                        style={{
                            width: botaoSize, 
                            height: botaoSize, 
                            flexShrink: 0, 
                            borderRadius: inputRadius, 
                            border: "none",
                            background: "linear-gradient(135deg,#6411D9,#F27405)",
                            cursor: "pointer", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center",
                            boxShadow: "0 4px 20px rgba(100,17,217,0.4)",
                            transition: "transform 0.2s, box-shadow 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            if (isDesktop) {
                                e.currentTarget.style.transform = "scale(1.05)";
                                e.currentTarget.style.boxShadow = "0 6px 30px rgba(100,17,217,0.6)";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (isDesktop) {
                                e.currentTarget.style.transform = "scale(1)";
                                e.currentTarget.style.boxShadow = "0 4px 20px rgba(100,17,217,0.4)";
                            }
                        }}
                    >
                        <svg viewBox="0 0 24 24" width={svgSize} height={svgSize} fill="none">
                            <polygon points="6,4 20,12 6,20" fill="white" />
                        </svg>
                    </button>
                </div>

                {/* Divisor para o PDF Tutorial */}
                <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: isDesktop ? 12 : 8, 
                    marginBottom: marginBottomPDF 
                }}>
                    <div style={{ flex: 1, height: 1, background: "rgba(143,90,218,0.15)" }} />
                    <span style={{ 
                        fontSize: isDesktop ? 9 : (isLandscape ? 6 : 7), 
                        color: "rgba(255,255,255,.2)", 
                        letterSpacing: ".2em", 
                        textTransform: "uppercase" 
                    }}>
                        Aprenda a Jogar
                    </span>
                    <div style={{ flex: 1, height: 1, background: "rgba(143,90,218,0.15)" }} />
                </div>

                {/* Botão PDF Tutorial estilizado */}
                <button
                    onClick={abrirPDF}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: isDesktop ? 12 : 8,
                        width: "100%",
                        height: isDesktop ? 48 : (isLandscape ? 32 : 38),
                        borderRadius: inputRadius,
                        border: "1px solid rgba(143,90,218,0.3)",
                        background: "rgba(100,17,217,0.08)",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        padding: isDesktop ? "0 20px" : "0 14px",
                        marginBottom: isDesktop ? 16 : (isLandscape ? 8 : 10),
                    }}
                    onMouseEnter={(e) => {
                        if (isDesktop) {
                            e.currentTarget.style.background = "rgba(100,17,217,0.2)";
                            e.currentTarget.style.borderColor = "rgba(143,90,218,0.6)";
                            e.currentTarget.style.transform = "scale(1.02)";
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (isDesktop) {
                            e.currentTarget.style.background = "rgba(100,17,217,0.08)";
                            e.currentTarget.style.borderColor = "rgba(143,90,218,0.3)";
                            e.currentTarget.style.transform = "scale(1)";
                        }
                    }}
                >
                    <span style={{ 
                        fontSize: isDesktop ? 16 : (isLandscape ? 11 : 13),
                    }}>
                        📜
                    </span>
                    <span style={{ 
                        fontSize: isDesktop ? 13 : (isLandscape ? 9 : 11),
                        fontWeight: 600,
                        color: "rgba(255,255,255,.7)",
                        letterSpacing: ".05em",
                    }}>
                        {isMobile ? 'Tutorial' : 'Tutorial em PDF'}
                    </span>
                    <span style={{ 
                        fontSize: isDesktop ? 9 : (isLandscape ? 7 : 8),
                        color: "rgba(143,90,218,0.5)",
                        marginLeft: "auto",
                    }}>
                        📖
                    </span>
                </button>

                {/* Texto de rodapé */}
                <p style={{ 
                    fontSize: textFooterSize, 
                    color: "rgba(255,255,255,.25)", 
                    textAlign: "center", 
                    lineHeight: 1.5,
                    flexShrink: 0,
                }}>
                    {isDesktop 
                        ? 'O nome da sua empresa é o seu legado — ele pode se tornar uma grande corporação.'
                        : isLandscape 
                            ? 'Seu legado — construa uma grande corporação.'
                            : 'O nome da sua empresa é o seu legado — ele pode se tornar uma grande corporação.'
                    }
                </p>
            </div>
        </div>
    );
};

export default InputName;