import React, { useContext, lazy, Suspense, useState, useMemo, useEffect } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";

import agricultura from "../../public/outrasImagens/setores/agricultura.png";
import tecnologia from "../../public/outrasImagens/setores/tecnologia.png";
import comercio from "../../public/outrasImagens/setores/comercio.png";
import industria from "../../public/outrasImagens/setores/industria.png";
import imobiliario from "../../public/outrasImagens/setores/imobiliario.png";
import energia from "../../public/outrasImagens/setores/torre-eletrica.png";
import grafico from "../../public/outrasImagens/setores/grafico.png";
import gerenciamento from "../../public/outrasImagens/setores/gerenciamento.png";
import circularEconomia from "../../public/outrasImagens/circular-economy.png";
import { CardDraftMini } from "./CardDraftMini";

export default function DashboardMiniDraft() {
    const { dados, atualizarDadosProf2, atualizarDados } = useContext(CentraldeDadosContext);
    const { economiaSetores, setEconomiaSetores } = useContext(DadosEconomyGlobalContext);
    const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

    const setoresCores = {
        agricultura: { cor1: "#003816", cor3: "#0C9123", cor4: "#4CAF50" },
        tecnologia: { cor1: "#A64B00", cor3: "#FF6F00", cor4: "#FF8C42" },
        industria: { cor1: "#1A1A1A", cor3: "#808080", cor4: "#B3B3B3" },
        comercio: { cor1: "#660000", cor3: "#E60000", cor4: "#FF4D4D" },
        imobiliario: { cor1: "#000066", cor3: "#3333CC", cor4: "#6666FF" },
        energia: { cor1: "#665200", cor3: "#E6B800", cor4: "#FFD966" },
    };
    const setoresNomes = {
        agricultura: "Agricultura",
        tecnologia: "Tecnologia",
        industria: "Indústria",
        comercio: "Comércio",
        imobiliario: "Imobiliário",
        energia: "Energia",
        todos: "Todos"
    };

    const dadosCarteiraEdificios = economiaSetores.centralEdificios;

    // ─── 🔥 FILTRA AS CARTAS SELECIONADAS (APENAS COM QUANTIDADE > 0) ───
    const cartasSelecionadasFiltradas = useMemo(() => {
        const cartas = dados.cartasSelecionadas || [];
        const cartasValidas = [];
        const cartasInvalidas = [];

        cartas.forEach(item => {
            const edificio = dados[item.setor]?.edificios?.[item.index];
            if (edificio && edificio.quantidade > 0) {
                cartasValidas.push(item);
            } else {
                cartasInvalidas.push(item);
            }
        });

        if (cartasInvalidas.length > 0) {
            console.log(`🗑️ [DashboardMiniDraft] Removendo ${cartasInvalidas.length} carta(s) inválida(s) da seleção:`);
            cartasInvalidas.forEach(item => {
                console.log(`   - ${item.setor}-${item.index} (edifício não encontrado ou quantidade 0)`);
            });
            
            const novasSelecoes = cartasValidas;
            atualizarDados("cartasSelecionadas", novasSelecoes);
        }

        return cartasValidas;
    }, [dados.cartasSelecionadas, dados]);

    // 🔥 Função para calcular o limite baseado no dia
    const getLimiteSelecao = useMemo(() => {
        const dia = dados.dia || 0;
        if (dia > 300) return 20;
        if (dia > 270) return 16;
        if (dia > 180) return 12;
        if (dia > 90) return 8;
        return 5;
    }, [dados.dia]);

    // 🔥 Verifica se está usando o máximo de slots
    const estaUsandoMaximo = cartasSelecionadasFiltradas.length >= getLimiteSelecao;
    const slotsVaziosDisponiveis = getLimiteSelecao - cartasSelecionadasFiltradas.length;

    // 🔥 Função para verificar se um slot está bloqueado (não disponível ainda)
    const isSlotBloqueado = (index) => {
        return index >= getLimiteSelecao;
    };

    // 🔥 Mapeia todos os edifícios com setor
    let todosEdificios = [];
    setoresArr.forEach(setor => {
        if (dados[setor]?.edificios) {
            dados[setor].edificios.forEach((ed, idx) => {
                if (ed.quantidade > 0) {
                    todosEdificios.push({
                        ed,
                        idx,
                        setor,
                    });
                }
            });
        }
    });

    // 🔥 Cria um mapa para acesso rápido aos edifícios selecionados
    const mapaSelecionados = useMemo(() => {
        const mapa = new Map();
        cartasSelecionadasFiltradas.forEach(item => {
            const chave = `${item.setor}-${item.index}`;
            mapa.set(chave, item);
        });
        return mapa;
    }, [cartasSelecionadasFiltradas]);

    // 🔥 Prepara os slots (combina selecionados + slots vazios)
    const slots = useMemo(() => {
        const totalSlots = getLimiteSelecao;
        const slotsArray = [];

        cartasSelecionadasFiltradas.forEach((item, index) => {
            slotsArray.push({
                type: 'selecionado',
                item: item,
                index: index,
                setor: item.setor,
                idx: item.index,
            });
        });

        for (let i = cartasSelecionadasFiltradas.length; i < totalSlots; i++) {
            slotsArray.push({
                type: 'vazio',
                index: i,
                bloqueado: isSlotBloqueado(i),
            });
        }

        return slotsArray;
    }, [cartasSelecionadasFiltradas, getLimiteSelecao]);

    // 🔥 Função para obter as cores do setor
    const getCoresSetor = (setor) => {
        return setoresCores[setor] || setoresCores.agricultura;
    };

    return (
        <div className="h-full w-full bg-[#1a0a3b] rounded-[0px] border border-white/10 shadow-2xl overflow-hidden flex flex-col">
            {/* ─── HEADER ────────────────────────────────────────────── */}
            <div style={{background: 'linear-gradient(to bottom, #6411D9, #350973)',}} className="p-4 border-b bg- border-white/10 flex-shrink-0">
                <div  className="flex items-center justify-between">
                    <h2 className="text-white font-bold text-lg flex items-center gap-2">
                        <span>📋</span> Cards Selecionados
                    </h2>
                    <div className="flex items-center gap-3">
                        {/* ─── ALERTA DE SLOTS VAZIOS ─────────────────── */}
                        {!estaUsandoMaximo && cartasSelecionadasFiltradas.length > 0 && (
                            <div 
                                className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 animate-pulse"
                            >
                                <span className="text-yellow-400 text-sm">⚠️</span>
                                <span className="text-yellow-400 text-[10px] font-bold">
                                    {slotsVaziosDisponiveis} slot{slotsVaziosDisponiveis !== 1 ? 's' : ''} vazio{slotsVaziosDisponiveis !== 1 ? 's' : ''}
                                </span>
                            </div>
                        )}
                        
                        {cartasSelecionadasFiltradas.length === 0 && (
                            <div 
                                className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-blue-500/20 border border-blue-500/30"
                            >
                                <span className="text-blue-400 text-sm">ℹ️</span>
                                <span className="text-blue-400 text-[7px] font-bold">
                                    Nenhum selecionado
                                </span>
                            </div>
                        )}

                        {estaUsandoMaximo && (
                            <div 
                                className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/20 border border-green-500/30"
                            >
                                <span className="text-green-400 text-sm">✅</span>
                                <span className="text-green-400 text-[10px] font-bold">
                                    Máximo
                                </span>
                            </div>
                        )}

                        <span className="text-white/40 text-xs font-medium">
                            {cartasSelecionadasFiltradas.length}/{getLimiteSelecao}
                        </span>
                    </div>
                </div>
            </div>

            {/* ─── GRID DE CARDS ────────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto p-4 scrollbar-custom">
                <div className="w-full gap-3 grid grid-cols-[repeat(4,minmax(77px,1fr))] auto-rows-auto">
                    {slots.length > 0 ? (
                        slots.map((slot, index) => {
                            if (slot.type === 'selecionado') {
                                return (
                                    <div key={`selecionado-${slot.setor}-${slot.idx}`} className="flex justify-center">
                                        <CardDraftMini index={slot.idx} setor={slot.setor} />
                                    </div>
                                );
                            } else {
                                const cores = getCoresSetor('agricultura');
                                const isBloqueado = slot.bloqueado;
                                
                                return (
                                    <div key={`vazio-${index}`} className="flex justify-center">
                                        <div 
                                            className="w-[77px] h-[112px] rounded-[7px] flex flex-col items-center justify-center border-2 border-dashed transition-all duration-300 hover:scale-[1.02]"
                                            style={{
                                                borderColor: isBloqueado ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.15)',
                                                background: isBloqueado 
                                                    ? 'rgba(255,255,255,0.02)' 
                                                    : 'rgba(255,255,255,0.05)',
                                                opacity: isBloqueado ? 0.3 : 0.6,
                                                cursor: isBloqueado ? 'not-allowed' : 'default',
                                            }}
                                        >
                                            {isBloqueado ? (
                                                <>
                                                    <span style={{ fontSize: 24, opacity: 0.3 }}>🔒</span>
                                                    <span style={{ 
                                                        fontSize: 8, 
                                                        color: 'rgba(255,255,255,0.2)',
                                                        marginTop: 4,
                                                        fontWeight: 700,
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.05em',
                                                    }}>
                                                        Bloqueado
                                                    </span>
                                                    <span style={{ 
                                                        fontSize: 7, 
                                                        color: 'rgba(255,255,255,0.1)',
                                                        fontWeight: 600,
                                                    }}>
                                                        Nível {Math.floor(index / 5) + 1}
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <span style={{ fontSize: 28, opacity: 0.2 }}>+</span>
                                                    <span style={{ 
                                                        fontSize: 7, 
                                                        color: 'rgba(255,255,255,0.2)',
                                                        marginTop: 2,
                                                        fontWeight: 600,
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.05em',
                                                    }}>
                                                        Slot vazio
                                                    </span>
                                                    <span style={{ 
                                                        fontSize: 6, 
                                                        color: 'rgba(255,255,255,0.1)',
                                                    }}>
                                                        #{index + 1}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                );
                            }
                        })
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-10 text-white/30">
                            <span style={{ fontSize: 40, opacity: 0.3 }}>🏗️</span>
                            <p className="text-sm font-medium mt-2">Nenhum edifício selecionado</p>
                            <p className="text-xs opacity-50">Selecione edifícios para vê-los aqui</p>
                        </div>
                    )}
                </div>

                
            </div>

            {/* ─── FOOTER ────────────────────────────────────────────── */}
            {/* <div className="p-3 border-t border-white/5 flex-shrink-0 bg-white/5">
                <div className="flex items-center gap-4 text-[10px] text-white/30">
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded border border-dashed border-white/20 bg-white/5"></div>
                        <span>Slot vazio</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded border border-dashed border-white/10 bg-white/5 opacity-30"></div>
                        <span>Bloqueado</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-gradient-to-br from-purple-500 to-purple-700"></div>
                        <span>Selecionado</span>
                    </div>
                </div>
            </div> */}

            <style>{`
                .scrollbar-custom::-webkit-scrollbar {
                    width: 4px;
                }
                .scrollbar-custom::-webkit-scrollbar-track {
                    background: rgba(255,255,255,0.05);
                    border-radius: 10px;
                }
                .scrollbar-custom::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.2);
                    border-radius: 10px;
                }
                .scrollbar-custom::-webkit-scrollbar-thumb:hover {
                    background: rgba(255,255,255,0.3);
                }
            `}</style>
        </div>
    );
}