import React, { useContext, useState, useCallback } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import inventario from '../../public/outrasImagens/addInventory.png';
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

// ─── CONFIGURAÇÃO DOS LIMITES POR DIA ──────────────────────────────
const getLimitesPorDia = (dia) => {
  const LIMITE_CONFIG = {
    fases: [
      { diaMax: 90, limiteBase: 15, slotsExtrasMax: 5 },
      { diaMax: 180, limiteBase: 20, slotsExtrasMax: 5 },
      { diaMax: 270, limiteBase: 25, slotsExtrasMax: 10 },
      { diaMax: Infinity, limiteBase: 30, slotsExtrasMax: 15 }
    ]
  };
  const fase = LIMITE_CONFIG.fases.find(f => dia <= f.diaMax) || LIMITE_CONFIG.fases[LIMITE_CONFIG.fases.length - 1];
  return {
    limiteBase: fase.limiteBase,
    slotsExtrasMax: fase.slotsExtrasMax,
    limiteTotal: fase.limiteBase + fase.slotsExtrasMax
  };
};

export function PlusInventory() {
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  // Obtém o número atual de slots extras comprados
  const slotsExtrasComprados = dados.slotsExtrasComprados || 0;

  // Calcula os limites baseado no dia atual
  const dia = dados.dia || 0;
  const limites = getLimitesPorDia(dia);
  const podeComprar = slotsExtrasComprados < limites.slotsExtrasMax;
  const slotsRestantes = limites.slotsExtrasMax - slotsExtrasComprados;

  // 🔥 CALCULA O PREÇO DO PRÓXIMO SLOT (5x o preço anterior)
  const calcularPrecoSlot = (quantidadeComprada) => {
    if (quantidadeComprada === 0) return 100000;
    let preco = 100000;
    for (let i = 0; i < quantidadeComprada; i++) {
      preco = preco * 2;
    }
    return preco;
  };

  const precoProximoSlot = calcularPrecoSlot(slotsExtrasComprados);
  const saldoAtual = economiaSetores.saldo || 0;
  const podePagar = saldoAtual >= precoProximoSlot;

  // 🔥 FUNÇÃO PARA COMPRAR SLOT
  const comprarSlot = useCallback(async () => {
    if (loading) return;

    if (!podeComprar) {
      setErro(`Limite máximo de slots extras atingido (${limites.slotsExtrasMax})!`);
      setTimeout(() => setErro(""), 3000);
      return;
    }

    if (!podePagar) {
      setErro(`Saldo insuficiente! Você precisa de R$ ${precoProximoSlot.toLocaleString()}`);
      setTimeout(() => setErro(""), 3000);
      return;
    }

    setLoading(true);
    setErro("");

    try {
      const novoSaldo = saldoAtual - precoProximoSlot;
      await atualizarEco("saldo", novoSaldo);

      const novosSlots = slotsExtrasComprados + 1;
      await atualizarDados("slotsExtrasComprados", novosSlots);

      console.log(`✅ [PlusInventory] Slot extra comprado!`);
      console.log(`   💰 Preço: R$ ${precoProximoSlot.toLocaleString()}`);
      console.log(`   📦 Total de slots extras: ${novosSlots}`);
      console.log(`   📊 Novo limite: ${limites.limiteBase + novosSlots}`);

    } catch (error) {
      console.error("❌ [PlusInventory] Erro ao comprar slot:", error);
      setErro("Erro ao processar a compra. Tente novamente.");
      setTimeout(() => setErro(""), 3000);
    } finally {
      setLoading(false);
    }
  }, [
    loading,
    podeComprar,
    podePagar,
    precoProximoSlot,
    saldoAtual,
    slotsExtrasComprados,
    limites,
    atualizarEco,
    atualizarDados
  ]);

  // 🔥 CALCULA O PRÓXIMO PREÇO
  const proximoPreco = calcularPrecoSlot(slotsExtrasComprados + 1);

  const estaNoLimite = !podeComprar;
  const estaSemSaldo = !podePagar && !estaNoLimite;

  return (
    <div className="relative w-full h-full flex items-center gap-3 bg-[#1a0a3b] rounded-xl border border-white/10 p-2">
      <Tooltip
        id="inventory-tip"
        style={{
          backgroundColor: "#FFFFFF",
          color: "#350973",
          borderRadius: "6px",
          padding: "8px 12px",
          fontWeight: "600",
          fontSize: "12px",
          maxWidth: "280px",
          border: "1px solid #350973",
        }}
        html={`
          <div style="font-size:12px;">
            <b>📦 Expandir Inventário</b><br/>
            <span style="font-size:11px;opacity:0.7;">
              Slots: <b>${slotsExtrasComprados}/${limites.slotsExtrasMax}</b><br/>
              ${slotsRestantes > 0 ? `Disponíveis: <b style="color:#4ade80;">${slotsRestantes}</b>` : '<span style="color:#ff4d4d;">⚠️ Limite atingido</span>'}<br/>
              Preço: <b>R$ ${precoProximoSlot.toLocaleString()}</b><br/>
              ${slotsExtrasComprados > 0 ? `Próximo: <b>R$ ${proximoPreco.toLocaleString()}</b>` : ''}
              ${!podePagar && !estaNoLimite ? '<br/><span style="color:#ff4d4d;">⚠️ Saldo insuficiente</span>' : ''}
            </span>
          </div>
        `}
      />

      {/* ─── BOTÃO DE EXPANDIR (ESQUERDA) ─────────────────────────── */}
      <button
        data-tooltip-id="inventory-tip"
        onClick={comprarSlot}
        disabled={estaNoLimite || estaSemSaldo || loading}
        className={`
          flex-shrink-0 w-[70px] h-[70px] flex flex-col items-center justify-center
          transition-all duration-200 hover:scale-[1.05] active:scale-95
          ${(podeComprar && podePagar && !loading)
            ? 'bg-gradient-to-br from-[#6411D9] to-[#350973] hover:shadow-[0_0_30px_rgba(100,17,217,0.4)] cursor-pointer'
            : 'bg-gray-700/50 cursor-not-allowed opacity-60'}
        `}
        style={{
          border: (podeComprar && podePagar && !loading)
            ? '2px solid #8F5ADA'
            : '2px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
        }}
      >
        {loading ? (
          <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin" />
        ) : (
          <>
            <img
              src={inventario}
              alt="Expandir Inventário"
              className="w-[28px] h-[28px] object-contain"
              style={{
                filter: (podeComprar && podePagar)
                  ? 'drop-shadow(0 0 10px rgba(139,92,246,0.6)) brightness(1.1)'
                  : 'grayscale(100%) opacity-40',
              }}
            />
            <span className="text-white font-bold text-[10px] mt-0.5">
              Expandir
            </span>
          </>
        )}

        {/* Badge de quantidade de slots extras */}
        {slotsExtrasComprados > 0 && (
          <div
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold"
            style={{
              background: 'linear-gradient(135deg, #FFD700, #F27405)',
              color: '#1a1a1a',
              boxShadow: '0 0 15px rgba(255,215,0,0.6)',
            }}
          >
            {slotsExtrasComprados}
          </div>
        )}

        {/* Indicador de disponibilidade */}
        {(podeComprar && podePagar && !loading) && (
          <div
            className="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full animate-pulse"
            style={{
              background: '#4ade80',
              boxShadow: '0 0 15px rgba(74,222,128,0.8)',
            }}
          />
        )}
      </button>

      {/* ─── INFORMAÇÕES (DIREITA) ────────────────────────────────── */}
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        {/* Barra de progresso */}
        <div className="relative w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${Math.min((slotsExtrasComprados / limites.slotsExtrasMax) * 100, 100)}%`,
              background: estaNoLimite
                ? 'linear-gradient(90deg, #FFD700, #F27405)'
                : podePagar
                  ? 'linear-gradient(90deg, #4ade80, #22d3ee)'
                  : 'linear-gradient(90deg, #f87171, #ef4444)',
              boxShadow: estaNoLimite
                ? '0 0 10px rgba(255,215,0,0.3)'
                : podePagar
                  ? '0 0 10px rgba(74,222,128,0.3)'
                  : '0 0 10px rgba(248,113,113,0.3)',
            }}
          />
        </div>

        {/* Linha 1: Slots */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-white/40 text-[10px]">📦</span>
            <span className="text-white font-bold text-[11px]">
              {slotsExtrasComprados}/{limites.slotsExtrasMax}
            </span>
            {slotsRestantes > 0 && (
              <span className="text-green-400 text-[8px] font-bold animate-pulse">
                +{slotsRestantes} disp.
              </span>
            )}
            {estaNoLimite && (
              <span className="text-yellow-400 text-[8px] font-bold">
                ⚠️ MÁXIMO
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-white/40 text-[10px]">💰</span>
            <span className={`font-bold text-[11px] ${podePagar ? 'text-green-400' : 'text-red-400'}`}>
              R$ {precoProximoSlot.toLocaleString()}
            </span>
            {!podePagar && !estaNoLimite && (
              <span className="text-red-400 text-[8px] font-bold">⚠️</span>
            )}
          </div>
        </div>

        {/* Linha 2: Detalhes adicionais */}
        <div className="flex items-center justify-between text-[8px] text-white/30">
          <span>
            Limite: {limites.limiteBase + slotsExtrasComprados}
          </span>
          {slotsExtrasComprados > 0 && (
            <span>
              Próximo: R$ {proximoPreco.toLocaleString()}
            </span>
          )}
          {estaNoLimite && (
            <span className="text-yellow-400/50">
              Limite máximo atingido
            </span>
          )}
          {estaSemSaldo && (
            <span className="text-red-400/50">
              Saldo insuficiente
            </span>
          )}
        </div>
      </div>

      {/* Mensagem de erro flutuante */}
      {erro && (
        <div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-sm font-bold z-[9999]"
          style={{
            background: 'rgba(255,77,77,0.9)',
            color: '#fff',
            boxShadow: '0 4px 20px rgba(255,77,77,0.3)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {erro}
        </div>
      )}
    </div>
  );
}