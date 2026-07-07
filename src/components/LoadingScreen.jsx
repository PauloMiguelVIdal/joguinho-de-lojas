import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MapWorld from "./MapWorld.jsx";

// ─── MENSAGENS DE LOADING ──────────────────────────────────────────
const MENSAGENS = [
    "📊 Realizando contas da empresa...",
    "💰 Calculando faturamento dos setores...",
    "📈 Atualizando indicadores financeiros...",
    "🧾 Processando pagamento de impostos...",
    "🏗️ Verificando construção de edifícios...",
    "📦 Gerenciando inventário de cartas...",
    "⚡ Aplicando power-ups e melhorias...",
    "🌍 Sincronizando economia global...",
    "📋 Atualizando relatórios gerenciais...",
    "🎯 Processando eventos e sorteios...",
    "💼 Calculando ROI dos investimentos...",
    "📊 Gerando gráficos e análises...",
];

// ─── DICAS ESTRATÉGICAS ──────────────────────────────────────────
const DICAS_LOADING = [
    "💡 Foque em um único setor para completar os objetivos mais rápido!",
    "📈 Priorize cartas com alto Faturamento Mensal para maximizar seus lucros.",
    "⚡ Power-ups acumulam e podem turbinar seus outros edifícios.",
    "🏆 Cartas de Rank S são raras e valiosas - priorize-as quando aparecerem!",
    "🔄 Diversificar com cartas que dão power-ups gera sinergias poderosas.",
    "🎯 Complete os objetivos na aba da direita para ganhar recompensas exclusivas!",
    "📊 Acompanhe seus indicadores financeiros para tomar melhores decisões.",
    "🏗️ Construa edifícios estratégicos para aumentar sua produção.",
];

// ─── COMPONENTE PRINCIPAL ───────────────────────────────────────────
export const LoadingScreen = ({ visible, onComplete, duracaoSegundos = 5 }) => {
    const [mensagemAtual, setMensagemAtual] = useState(0);
    const [dicaAtual, setDicaAtual] = useState(0);
    const [estaCarregando, setEstaCarregando] = useState(true);
    
    // Refs para controle
    const mensagemIntervalRef = useRef(null);
    const dicaIntervalRef = useRef(null);
    const timerRef = useRef(null);
    const isMountedRef = useRef(true);

    // ─── INICIA O LOADING QUANDO visible SE TORNA TRUE ──────────
    useEffect(() => {
        isMountedRef.current = true;

        if (!visible) {
            // Limpa tudo quando invisible
            if (mensagemIntervalRef.current) {
                clearInterval(mensagemIntervalRef.current);
                mensagemIntervalRef.current = null;
            }
            if (dicaIntervalRef.current) {
                clearInterval(dicaIntervalRef.current);
                dicaIntervalRef.current = null;
            }
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
            setEstaCarregando(true);
            return;
        }

        // Reset ao abrir
        setMensagemAtual(0);
        setDicaAtual(0);
        setEstaCarregando(true);

        // ─── MENSAGENS: alterna a cada 2 segundos ──────────────────
        if (mensagemIntervalRef.current) {
            clearInterval(mensagemIntervalRef.current);
        }
        mensagemIntervalRef.current = setInterval(() => {
            if (isMountedRef.current) {
                setMensagemAtual(prev => (prev + 1) % MENSAGENS.length);
            }
        }, 2000);

        // ─── DICAS: alterna a cada 3 segundos ──────────────────────
        if (dicaIntervalRef.current) {
            clearInterval(dicaIntervalRef.current);
        }
        dicaIntervalRef.current = setInterval(() => {
            if (isMountedRef.current) {
                setDicaAtual(prev => (prev + 1) % DICAS_LOADING.length);
            }
        }, 3000);

        // ─── FINALIZA APÓS O TEMPO DEFINIDO ──────────────────────
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            if (isMountedRef.current) {
                setEstaCarregando(false);
                // Limpa os intervals antes de chamar onComplete
                if (mensagemIntervalRef.current) {
                    clearInterval(mensagemIntervalRef.current);
                    mensagemIntervalRef.current = null;
                }
                if (dicaIntervalRef.current) {
                    clearInterval(dicaIntervalRef.current);
                    dicaIntervalRef.current = null;
                }
                if (onComplete) onComplete();
            }
        }, duracaoSegundos * 1000);

        return () => {
            isMountedRef.current = false;
            if (mensagemIntervalRef.current) {
                clearInterval(mensagemIntervalRef.current);
                mensagemIntervalRef.current = null;
            }
            if (dicaIntervalRef.current) {
                clearInterval(dicaIntervalRef.current);
                dicaIntervalRef.current = null;
            }
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [visible, onComplete, duracaoSegundos]);

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 inset-x-0 z-[9999] flex items-center justify-center" style={{ height: 'calc(100vh - 120px)' }}>
            {/* FUNDO COM DEGRADE ROXO */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a3b] via-[#350973] to-[#6411D9]" />

            {/* MAPA - CENTRO DAS ATENÇÕES */}
            <div className="absolute inset-0 pointer-events-none">
                <MapWorld />
            </div>

            {/* OVERLAY SUTIL PARA DESTACAR O TEXTO */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* CONTAINER PRINCIPAL */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center justify-end w-[80vw] h-[80vh] px-8 pb-12"
            >
                {/* CONTEÚDO NA PARTE INFERIOR */}
                <div className="w-full flex flex-col items-center justify-end max-w-2xl gap-3">
                    {/* Ícone animado */}
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                            rotate: [0, 2, -2, 0],
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="text-5xl mb-1"
                    >
                        🏢
                    </motion.div>

                    {/* Título */}
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white text-2xl font-bold tracking-wider"
                        style={{ fontFamily: "'Rajdhani', sans-serif" }}
                    >
                        {estaCarregando ? "Processando..." : "✅ Concluído!"}
                    </motion.h1>

                    {/* 🔥 MENSAGEM ALTERNADA */}
                    {/* <div className="h-10 flex items-center justify-center my-1 overflow-hidden w-full">
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                key={`msg-${mensagemAtual}`}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.3 }}
                                className="text-[#C79FFF] text-base font-medium text-center w-full"
                                style={{ fontFamily: "'Rajdhani', sans-serif" }}
                            >
                                {MENSAGENS[mensagemAtual]}
                            </motion.div>
                        </AnimatePresence>
                    </div> */}

                    {/* ─── DICAS ROTATIVAS ────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="w-full max-w-md bg-[#6A00FF]/10 border border-[#6A00FF]/20 rounded-xl px-4 py-2.5 flex items-center gap-3"
                    >
                        <span className="text-[#8B00FF] text-base flex-shrink-0">💡</span>
                        <div className="flex-1 min-w-0">
                            <AnimatePresence mode="popLayout">
                                <motion.span
                                    key={`dica-${dicaAtual}`}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-white/80 text-sm font-medium block truncate"
                                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                                >
                                       Foque em um único setor para completar os objetivos mais rápido!

                                </motion.span>
                            </AnimatePresence>
                        </div>
                        {/* <div className="flex gap-1.5 flex-shrink-0">
                            {DICAS_LOADING.map((_, index) => (
                                <div
                                    key={index}
                                    className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                                    style={{
                                        background: index === dicaAtual ? "#6A00FF" : "rgba(255,255,255,0.15)",
                                        transform: index === dicaAtual ? "scale(1.2)" : "scale(1)",
                                    }}
                                />
                            ))}
                        </div> */}
                    </motion.div>

                    {/* ─── INDICADORES DE PROGRESSO ───────────────────── */}
                    <div className="flex items-center gap-2 mt-2 text-white/20 text-[9px]">
                        <span className="inline-block animate-pulse">●</span>
                        <span>Economia global em movimento</span>
                        <span className="inline-block animate-pulse">●</span>
                    </div>

                    {/* ─── MENSAGEM DE FINALIZAÇÃO ───────────────────── */}
                    {/* {!estaCarregando && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="mt-1 text-green-400 text-sm font-bold"
                            style={{ fontFamily: "'Rajdhani', sans-serif" }}
                        >
                            ✅ Pronto! Redirecionando...
                        </motion.div>
                    )} */}
                </div>
            </motion.div>
        </div>
    );
};