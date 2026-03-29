import React, { useContext, useState } from 'react';
import { CentraldeDadosContext } from '../centralDeDadosContext';
import correto from '../../public/outrasImagens//simbolo-correto (1).png'
import { Localizador } from "./localizador";

// Lista de edifícios para espalhar no fundo
// Substitua o array edificiosDecorativos por este, com mais cartas e níveis
const edificiosDecorativos = [
    { nome: "Plantação De Grãos", pos: { left: "2%", top: "8%", rotate: "-15deg", delay: "0s", duration: "18s", opacity: .5 }, nivel: 1 },
    { nome: "Fábrica De Chips", pos: { left: "10%", top: "55%", rotate: "8deg", delay: "2s", duration: "22s", opacity: .4 }, nivel: 3 },
    { nome: "Alto-Forno", pos: { left: "5%", top: "75%", rotate: "-6deg", delay: "5s", duration: "19s", opacity: .45 }, nivel: 2 },
    { nome: "Mercado", pos: { left: "18%", top: "18%", rotate: "12deg", delay: "1s", duration: "24s", opacity: .35 }, nivel: 1 },
    { nome: "Construtora", pos: { left: "22%", top: "72%", rotate: "-10deg", delay: "7s", duration: "20s", opacity: .45 }, nivel: 2 },
    { nome: "Usina Solar", pos: { left: "75%", top: "12%", rotate: "18deg", delay: "3s", duration: "21s", opacity: .4 }, nivel: 1 },
    { nome: "Fazenda De Vacas", pos: { left: "80%", top: "60%", rotate: "-12deg", delay: "6s", duration: "17s", opacity: .5 }, nivel: 3 },
    { nome: "Fábrica De Smartphones", pos: { left: "87%", top: "28%", rotate: "5deg", delay: "9s", duration: "23s", opacity: .35 }, nivel: 2 },
    { nome: "Usina Siderúrgica", pos: { left: "68%", top: "75%", rotate: "-8deg", delay: "4s", duration: "20s", opacity: .45 }, nivel: 3 },
    { nome: "Aeroporto", pos: { left: "55%", top: "6%", rotate: "14deg", delay: "8s", duration: "25s", opacity: .35 }, nivel: 1 },
    { nome: "Parque Eólico", pos: { left: "38%", top: "80%", rotate: "-18deg", delay: "11s", duration: "19s", opacity: .4 }, nivel: 2 },
    { nome: "Fábrica De Robôs", pos: { left: "91%", top: "78%", rotate: "7deg", delay: "13s", duration: "22s", opacity: .35 }, nivel: 3 },
    // ── novas cartas ──
    { nome: "Refinaria", pos: { left: "30%", top: "5%", rotate: "-9deg", delay: "3.5s", duration: "20s", opacity: .4 }, nivel: 3 },
    { nome: "Fábrica De Foguetes", pos: { left: "45%", top: "82%", rotate: "11deg", delay: "6.5s", duration: "23s", opacity: .35 }, nivel: 2 },
    { nome: "Shopping Center", pos: { left: "60%", top: "45%", rotate: "-14deg", delay: "1.5s", duration: "21s", opacity: .3 }, nivel: 1 },
    { nome: "Mineradora", pos: { left: "14%", top: "35%", rotate: "6deg", delay: "9.5s", duration: "18s", opacity: .4 }, nivel: 2 },
    { nome: "Plataforma De Petróleo", pos: { left: "50%", top: "60%", rotate: "-5deg", delay: "4.5s", duration: "24s", opacity: .3 }, nivel: 3 },
    { nome: "Data Center", pos: { left: "72%", top: "35%", rotate: "16deg", delay: "12s", duration: "20s", opacity: .35 }, nivel: 1 },
    { nome: "Usina Hidrelétrica", pos: { left: "3%", top: "42%", rotate: "-20deg", delay: "7.5s", duration: "22s", opacity: .4 }, nivel: 2 },
    { nome: "Fábrica De Automóveis", pos: { left: "83%", top: "10%", rotate: "9deg", delay: "2.5s", duration: "19s", opacity: .35 }, nivel: 3 },
    { nome: "Porto", pos: { left: "25%", top: "48%", rotate: "-7deg", delay: "10s", duration: "26s", opacity: .3 }, nivel: 1 },
    { nome: "Laboratório Farmacêutico", pos: { left: "58%", top: "22%", rotate: "13deg", delay: "5.5s", duration: "21s", opacity: .35 }, nivel: 2 },
    { nome: "Fábrica De Baterias", pos: { left: "42%", top: "15%", rotate: "-11deg", delay: "14s", duration: "18s", opacity: .4 }, nivel: 1 },
    { nome: "Estaleiro", pos: { left: "95%", top: "50%", rotate: "4deg", delay: "8.5s", duration: "23s", opacity: .3 }, nivel: 3 },
];

const InputName = () => {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext);

    if (dados.inicioGame.estadoModal !== true) return null;
    const [novoNome, setNovoNome] = useState('');


    function handleChangeNome(event) {
        setNovoNome(event.target.value.toUpperCase());
    }




    function atualizarContexto() {
        if (novoNome) {

            atualizarDados("inicioGame", { ...dados.inicioGame, nomeEmpresa: novoNome, estadoModal: false })
            atualizarDados("modalInicio", { ...dados.modalInicio, estadoModal: true })

        }
        else {
            alert("Campo não preenchido")
        }
    }



    if (dados.inicioGame.estadoModal === true) {
        return (
            <div style={{
                position: "fixed", inset: 0, zIndex: 40,
                background: "#050510",
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden",
                backgroundImage: `
      linear-gradient(rgba(100,17,217,0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(100,17,217,0.08) 1px, transparent 1px)`,
                backgroundSize: "48px 48px",
            }}>

                {/* Glow central */}
                <div style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%,-50%)",
                    width: 600, height: 400, pointerEvents: "none",
                    background: "radial-gradient(ellipse, rgba(100,17,217,0.25) 0%, transparent 70%)",
                }} />

                {/* ── CARTAS REAIS FLUTUANDO ── */}
                {/* ── KEYFRAMES ── */}
                <style>{`
  @keyframes cardFloatReal {
    0%   { opacity: 0;           transform: rotate(var(--r)) translateY(30px)  scale(0.52); }
    10%  { opacity: var(--op);   transform: rotate(var(--r)) translateY(0px)   scale(0.52); }
    90%  { opacity: var(--op);   transform: rotate(var(--r)) translateY(0px)   scale(0.52); }
    100% { opacity: 0;           transform: rotate(var(--r)) translateY(-30px) scale(0.52); }
  }
`}</style>

                {edificiosDecorativos.map((ed, i) => {
                    // overlay visual por nível
                    const nivelOverlay = {
                        1: "transparent",
                        2: "rgba(100,17,217,0.35)",   // roxo — nível 2
                        3: "rgba(184,135,11,0.45)",   // dourado — nível 3
                    }[ed.nivel];

                    const nivelBorder = {
                        1: "none",
                        2: "2px solid rgba(143,90,218,0.6)",
                        3: "2px solid rgba(240,193,64,0.7)",
                    }[ed.nivel];

                    const nivelGlow = {
                        1: "none",
                        2: "0 0 14px rgba(100,17,217,0.5)",
                        3: "0 0 18px rgba(240,193,64,0.55)",
                    }[ed.nivel];

                    return (
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
                                // container para o overlay não cortar a carta
                                borderRadius: 20,
                                overflow: "visible",
                            }}
                        >
                            {/* overlay de nível por cima da carta */}
                            <div style={{
                                position: "absolute", inset: 0,
                                borderRadius: 20,
                                background: nivelOverlay,
                                border: nivelBorder,
                                boxShadow: nivelGlow,
                                zIndex: 5,
                                pointerEvents: "none",
                            }} />

                            {Localizador(ed.nome)}
                        </div>
                    );
                })}
                {/* ── MODAL CENTRAL ── */}
                <div style={{
                    position: "relative", zIndex: 10,
                    width: "min(520px, 90%)",
                    background: "linear-gradient(160deg,#0d0a1f 0%,#120829 50%,#0a0718 100%)",
                    border: "1px solid rgba(100,17,217,0.5)",
                    borderRadius: 20,
                    padding: "44px 40px 40px",
                    boxShadow: "0 0 0 1px rgba(143,90,218,0.15), 0 30px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(143,90,218,0.2)",
                }}>
                    <div style={{
                        position: "relative", zIndex: 10,
                        width: "min(520px, 90%)",
                        background: "linear-gradient(160deg,#0d0a1f 0%,#120829 50%,#0a0718 100%)",
                        border: "1px solid rgba(100,17,217,0.5)",
                        borderRadius: 20,
                        padding: "44px 40px 40px",
                        boxShadow: "0 0 0 1px rgba(143,90,218,0.15), 0 30px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(143,90,218,0.2)",
                    }}>

                        {/* Linha topo */}
                        <div style={{
                            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                            width: 120, height: 2,
                            background: "linear-gradient(90deg,transparent,#8F5ADA,transparent)",
                            borderRadius: 2,
                        }} />

                        <p style={{ fontFamily: "serif", fontSize: 11, fontWeight: 700, color: "#8F5ADA", letterSpacing: ".35em", textTransform: "uppercase", textAlign: "center", marginBottom: 10 }}>
                            — Bem-vindo ao —
                        </p>
                        <h1 style={{ fontFamily: "serif", fontSize: 32, fontWeight: 900, color: "#fff", textAlign: "center", marginBottom: 6 }}>
                            Business<span style={{ color: "#F27405" }}>.</span>Game
                        </h1>
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,.35)", textAlign: "center", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 28 }}>
                            Construa seu império corporativo
                        </p>

                        {/* Badges */}
                        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 28, flexWrap: "wrap" }}>
                            {[["Agricultura", "#4CAF50"], ["Tecnologia", "#FF8C42"], ["Indústria", "#B3B3B3"], ["Comércio", "#FF4D4D"], ["Imóveis", "#6666FF"], ["Energia", "#FFD966"]].map(([s, c]) => (
                                <span key={s} style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 20, border: `1px solid ${c}`, color: c, opacity: .6 }}>{s}</span>
                            ))}
                        </div>

                        {/* Divisor */}
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                            <div style={{ flex: 1, height: 1, background: "rgba(143,90,218,0.2)" }} />
                            <span style={{ fontSize: 10, color: "rgba(255,255,255,.3)", letterSpacing: ".2em", textTransform: "uppercase" }}>Escolha seu legado</span>
                            <div style={{ flex: 1, height: 1, background: "rgba(143,90,218,0.2)" }} />
                        </div>

                        <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,.4)", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 10 }}>
                            Nome da empresa
                        </p>
                        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                            <input
                                type="text"
                                placeholder="Ex: Grupo Nexus S.A."
                                value={novoNome}
                                onChange={handleChangeNome}
                                onKeyDown={e => e.key === "Enter" && atualizarContexto()}
                                style={{
                                    flex: 1, height: 52, borderRadius: 12, padding: "0 18px",
                                    background: "rgba(100,17,217,0.12)",
                                    border: "1px solid rgba(100,17,217,0.35)",
                                    fontFamily: "inherit", fontSize: 17, fontWeight: 600, color: "#fff",
                                    outline: "none",
                                }}
                            />
                            <button
                                onClick={atualizarContexto}
                                style={{
                                    width: 52, height: 52, flexShrink: 0, borderRadius: 12, border: "none",
                                    background: "linear-gradient(135deg,#6411D9,#F27405)",
                                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                                    boxShadow: "0 4px 20px rgba(100,17,217,0.4)",
                                }}
                            >
                                <svg viewBox="0 0 24 24" width={22} height={22} fill="none">
                                    <polygon points="6,4 20,12 6,20" fill="white" />
                                </svg>
                            </button>
                        </div>

                        <p style={{ fontSize: 12, color: "rgba(255,255,255,.25)", textAlign: "center", lineHeight: 1.6 }}>
                            O nome da sua empresa é o seu legado —<br />
                            ele pode se tornar uma grande corporação.
                        </p>
                    </div>


                </div>


            </div >
        );
    }
    else {
        return null
    }
}

export default InputName;

