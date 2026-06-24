import React, { useEffect, useState } from "react";
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

// ─── COMPONENTE PRINCIPAL ───────────────────────────────────────────
export const LoadingScreen = ({ visible, onComplete }) => {
    const [mensagemAtual, setMensagemAtual] = useState(0);
    const [progresso, setProgresso] = useState(0);

    useEffect(() => {
        if (!visible) return;

        // Reseta o progresso e mensagem
        setProgresso(0);
        setMensagemAtual(0);

        // 🔥 BARRA DE PROGRESSO: +10% a cada 1 segundo
        const progressInterval = setInterval(() => {
            setProgresso(prev => {
                const novo = prev + 10;
                if (novo >= 100) {
                    clearInterval(progressInterval);
                    clearInterval(mensagemInterval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return novo;
            });
        }, 1000);

        // 🔥 MENSAGENS: alterna a cada 3 segundos
        const mensagemInterval = setInterval(() => {
            setMensagemAtual(prev => (prev + 1) % MENSAGENS.length);
        }, 3000);

        return () => {
            clearInterval(progressInterval);
            clearInterval(mensagemInterval);
        };
    }, [visible, onComplete]);

    if (!visible) return null;

    return (
<div className="fixed bottom-0 inset-x-0 z-[9999] flex items-center justify-center" style={{ height: 'calc(100vh - 80px)', }}>            {/* FUNDO COM DEGRADE ROXO */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a3b] via-[#350973] to-[#6411D9]" />

            {/* MAPA - CENTRO DAS ATENÇÕES */}
            <div className="absolute inset-0 pointer-events-none">
                <MapWorld />
            </div>

            {/* OVERLAY SUTIL PARA DESTACAR O TEXTO */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* CONTAINER PRINCIPAL: 80vw x 80vh */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center justify-end w-[80vw] h-[80vh] px-8 pb-12"
            >
                {/* CONTEÚDO NA PARTE INFERIOR */}
                <div className="w-full flex flex-col items-center justify-end max-w-2xl">
                    {/* Ícone */}
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                            rotate: [0, 2, -2, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="text-5xl mb-3"
                    >
                        🏢
                    </motion.div>

                    {/* Título */}
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white text-2xl font-bold tracking-wider"
                        style={{ fontFamily: "'Rajdhani', sans-serif" }}
                    >
                        Processando...
                    </motion.h1>

                    {/* 🔥 MENSAGEM ALTERNADA (SEM EFEITO DE DIGITAÇÃO) */}
                    <div className="h-10 flex items-center justify-center my-3">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={mensagemAtual}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5 }}
                                className="text-[#C79FFF] text-base font-medium text-center"
                                style={{ fontFamily: "'Rajdhani', sans-serif" }}
                            >
                                {MENSAGENS[mensagemAtual]}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* 🔥 BARRA DE PROGRESSO: +10% a cada 1 segundo */}
                    <div className="w-full max-w-sm">
                        <div className="flex justify-between text-xs text-white/40 mb-1">
                            <span>Iniciando</span>
                            <span className="font-mono">{progresso}%</span>
                            <span>Finalizando</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                style={{
                                    background: "linear-gradient(90deg, #6411D9, #934CFF, #FFD700)",
                                }}
                                animate={{ width: `${progresso}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </div>

                    {/* Rodapé */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-4 text-white/20 text-[10px] text-center"
                    >
                        <span className="inline-block animate-pulse">●</span>
                        <span className="mx-2">|</span>
                        <span>Economia global em movimento</span>
                        <span className="mx-2">|</span>
                        <span className="inline-block animate-pulse">●</span>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};