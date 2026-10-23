import React, { useEffect, useState, useCallback, useContext, useRef } from "react";
import PróximoImg from "../../public/outrasImagens/proximo.png";
import Sorteio from "./Sorteio";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import useSound from "use-sound";
import nextDayAudio from "../../public/sounds/nextDayAudio.mp3";
import newStageAudio from "../../public/sounds/newStageAudio.mp3";
import { useHotkeys } from "react-hotkeys-hook";

import { useCentralStore } from "../stores/useCentralStore";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";

import { usePipeline } from "./PipelineContext";
import { useGame } from "../components/GameContext";
import { salvarNoStorage } from "./usePersistencia";

// ─── UI ─────────────────────────────────────────────
const tooltipStyle = {
  backgroundColor: "#FFFFFF",
  color: "#350973",
  borderRadius: "6px",
  padding: "6px 10px",
  fontWeight: "600",
  fontSize: "14px",
};

const TooltipPadrao = ({ id }) => (
  <Tooltip id={id} style={tooltipStyle} border="1px solid #350973" />
);

const TODAS_LOJAS = ["terrenos", "lojasP", "lojasM", "lojasG"];

// ───────────────────────────────────────────────────

export function NextDay() {
  // ── Zustand ──
  const dia = useCentralStore((s) => s.dia);
  const atualizarDados = useCentralStore((s) => s.atualizarDados);
  const atualizarLote = useCentralStore((s) => s.atualizarLote);
  const algumModalAberto = useCentralStore((s) => s.algumModalAberto);

  // ── Context ──
  const {
    economiaSetores,
    atualizarEco,
    atualizarEcoCallback,
  } = useContext(DadosEconomyGlobalContext);

  // ── Game ──
  const {
    processarTransacoesMercado,
    processProductions,
    processSellQueue,
    checkProductionOverflow,
  } = useGame();

  const { executarPipelinesHoje, getPipelinesParaSalvar } = usePipeline();

  // ── Audio ──
  const [buttonNextDayAudio] = useSound(nextDayAudio);
  const [buttonNewStageAudio] = useSound(newStageAudio);

  const [isNKeyDown, setIsNKeyDown] = useState(false);
  const [executouAudio270, setExecutouAudio270] = useState(false);

  // ref para capturar saldo final pós-créditos antes de salvar
  const salvarPendenteRef = useRef(false);

  // ─── AUDIO 270 ─────────────────────────────────────
  useEffect(() => {
    if (dia === 270 && !executouAudio270) {
      buttonNewStageAudio();
      setExecutouAudio270(true);
    }
  }, [dia, executouAudio270]);

  // ─── PERSISTIR ECONOMIA APÓS CRÉDITO ───────────────
  // Sempre que o saldo mudar, persiste no storage.
  // Isso resolve o problema de salvar o saldo ANTES do setState commitar.
  useEffect(() => {
    if (!salvarPendenteRef.current) return;
    salvarPendenteRef.current = false;
    salvarNoStorage(
      undefined,
      undefined,
      economiaSetores,
      getPipelinesParaSalvar()
    );
  }, [economiaSetores.saldo]);

  // ─── FATURAMENTO PRÉ-270 ───────────────────────────
  // Só roda até o dia 269 (inclusive). A partir do dia 270
  // quem calcula e credita o faturamento é o PayTexes.
  const calcularFaturamentoBase = useCallback(() => {
    const state = useCentralStore.getState();

    // pós-270: faturamento base é 0 (lojas zeradas no dia 269)
    if (state.dia >= 270) return 0;

    let faturamentoDiario = 0;
    const updates = [];

    TODAS_LOJAS.forEach((loja) => {
      const lojaData = state.edificiosBase[loja];
      if (!lojaData) return;

      const valorUnitario = lojaData.faturamentoUnitárioPadrão || 0;
      const valorVariavel =
        Math.round(valorUnitario * (1 + (Math.random() * 0.6 - 0.3)) * 100) / 100;
      const faturamentoTotal =
        Math.round(valorVariavel * lojaData.quantidade * 100) / 100;

      faturamentoDiario += faturamentoTotal;

      updates.push([
        ["edificiosBase", loja],
        {
          ...lojaData,
          faturamentoUnitário: valorVariavel,
          faturamentoTotal,
        },
      ]);
    });

    // Acumular faturamento mensal (reset no dia 1 de cada bloco de 30)
    const ehPrimeiroDiaDoMes = state.dia % 30 === 1;
    const novoMensal = ehPrimeiroDiaDoMes
      ? faturamentoDiario
      : (state.faturamento.faturamentoMensal || 0) + faturamentoDiario;

    updates.push([
      ["faturamento"],
      {
        ...state.faturamento,
        faturamentoDiário: faturamentoDiario,
        faturamentoMensal: novoMensal,
        arrayFatuDiário: [
          ...(state.faturamento.arrayFatuDiário || []),
          faturamentoDiario,
        ].slice(-360),
      },
    ]);

    atualizarLote(updates);

    return faturamentoDiario;
  }, [atualizarLote]);

  // ─── NEXT DAY ──────────────────────────────────────
  const ProximoDia = useCallback(() => {
    const state = useCentralStore.getState();

    console.log("▶️ Tentando avançar dia:", state.dia);

    if (state.modalExcesso.confirmarAvanco) {
      atualizarDados("modalExcesso", {
        ...state.modalExcesso,
        confirmarAvanco: false,
      });
    }

    // ── BLOQUEIOS ────────────────────────────────────
    if (economiaSetores.saldo < 0) {
      console.log("⛔ Bloqueado: saldo negativo");
      atualizarEco("fimGame", true);
      return;
    }

    if (state.dia % 30 === 0 && !state.despesas.despesasPagas) {
      console.log("⛔ Bloqueado: despesas mensais não pagas");
      return;
    }

    if (!economiaSetores.despesasEmprestimo?.despesasPagas) {
      console.log("⛔ Bloqueado: empréstimo pendente");
      return;
    }

    if (algumModalAberto()) {
      console.log("⛔ Bloqueado: modal aberto");
      return;
    }

    // ── OVERFLOW (descomente quando quiser ativar) ────
    // const overflows = checkProductionOverflow();
    // if (overflows.length > 0) { ... }

    // ── EXECUÇÃO ─────────────────────────────────────
    console.log("✅ Avançando dia");

    buttonNextDayAudio();

    const novoDia = state.dia + 1;
    atualizarDados("dia", novoDia);

    // ── FATURAMENTO BASE (só pré-270) ────────────────
    // Pré-270: calcula e credita no saldo via atualizarEcoCallback.
    // Pós-270: PayTexes faz isso. Não chama nada aqui.
    const faturamentoBase = calcularFaturamentoBase();

    if (novoDia < 270 && faturamentoBase > 0) {
      console.log("💰 Faturamento base do dia:", faturamentoBase);
      atualizarEcoCallback("saldo", (s) => (s ?? 0) + faturamentoBase);
    }

    // ── PROCESSAMENTO ────────────────────────────────
    processarTransacoesMercado();
    processProductions();
    executarPipelinesHoje();

    // ⚠️ processSellQueue SEMPRE recebe 0 aqui.
    // - Pré-270: faturamento base já foi creditado acima.
    // - Pós-270: PayTexes credita o faturamento final.
    // O processSellQueue só deve LIQUIDAR as vendas concluídas.
    processSellQueue(0);

    // ── SALVAR ───────────────────────────────────────
    // Marca que precisamos salvar no próximo effect (quando saldo commitar).
    salvarPendenteRef.current = true;

    // Persistência síncrona com o saldo calculado manualmente (fallback
    // para o caso do effect não rodar antes do próximo clique).
    const saldoAtual = useCentralStore.getState().saldo ?? economiaSetores.saldo;
    const economiaParaSalvar = {
      ...economiaSetores,
      saldo: saldoAtual, // será sobrescrito pelo effect quando commitar
    };

    salvarNoStorage(
      undefined,
      undefined,
      economiaParaSalvar,
      getPipelinesParaSalvar()
    );
  }, [
    atualizarDados,
    economiaSetores,
    atualizarEco,
    atualizarEcoCallback,
    checkProductionOverflow,
    buttonNextDayAudio,
    calcularFaturamentoBase,
    processarTransacoesMercado,
    processProductions,
    executarPipelinesHoje,
    processSellQueue,
    getPipelinesParaSalvar,
    algumModalAberto,
  ]);

  // ─── HOTKEY ───────────────────────────────────────
  useHotkeys(
    "d",
    () => {
      const state = useCentralStore.getState();

      if (
        state.dia <= 1 ||
        algumModalAberto() ||
        state.dia % 30 === 0 ||
        isNKeyDown
      ) {
        console.log("⛔ Hotkey bloqueado");
        return;
      }

      setIsNKeyDown(true);
      ProximoDia();
    },
    { keydown: true }
  );

  useHotkeys("d", () => setIsNKeyDown(false), { keyup: true });

  // ─── UI ───────────────────────────────────────────
  const bloqueadoPorDespesas =
    dia % 30 === 0 &&
    !useCentralStore.getState().despesas.despesasPagas;

  return (
    <div className="flex">
      <button
        data-tooltip-id="saldo-tip"
        data-tooltip-content={
          bloqueadoPorDespesas
            ? "Pague as despesas mensais antes de avançar"
            : "Avança para o próximo dia (D)"
        }
        className={`h-[50px] aspect-square rounded-[10px] flex items-center justify-center transition-transform ${
          bloqueadoPorDespesas
            ? "bg-[#ebac75ff] cursor-not-allowed"
            : "bg-laranja hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]"
        }`}
        onClick={ProximoDia}
        disabled={bloqueadoPorDespesas}
      >
        <img className="w-[60%]" src={PróximoImg} alt="Próximo" />
      </button>

      <Sorteio />

      <TooltipPadrao id="saldo-tip" />
    </div>
  );
}