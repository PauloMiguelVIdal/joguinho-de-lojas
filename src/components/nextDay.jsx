import React, { useEffect, useState, useCallback, useContext } from "react";
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
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);

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

  // ─── AUDIO 270 ─────────────────────────────────────
  useEffect(() => {
    if (dia === 270 && !executouAudio270) {
      buttonNewStageAudio();
      setExecutouAudio270(true);
    }
  }, [dia, executouAudio270]); // ← usa o `dia` do seletor reativo, não getState()

  // ─── FATURAMENTO ───────────────────────────────────
  const calcularFaturamento = useCallback(() => {
    const state = useCentralStore.getState();

    let faturamentoDiario = 0;
    const updates = [];

    TODAS_LOJAS.forEach((loja) => {
      const lojaData = state.edificiosBase[loja];

      const valorUnitario =
        state.dia >= 270 ? 0 : lojaData.faturamentoUnitárioPadrão;

      const valorVariavel =
        Math.round((valorUnitario * (1 + (Math.random() * 0.6 - 0.3))) * 100) / 100;

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

    const novoMensal =
      state.dia % 30 === 0
        ? faturamentoDiario
        : state.faturamento.faturamentoMensal + faturamentoDiario;

    if (state.dia <= 270) {
      updates.push([
        ["faturamento"],
        {
          ...state.faturamento,
          faturamentoDiário: faturamentoDiario,
          faturamentoMensal: novoMensal,
          arrayFatuDiário: [
            ...state.faturamento.arrayFatuDiário,
            faturamentoDiario,
          ],
        },
      ]);
    }

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

    // ── OVERFLOW ─────────────────────────────────────
    // const overflows = checkProductionOverflow();

    // if (overflows.length > 0) {
    //   console.log("⛔ Bloqueado: overflow de produção", overflows);

    //   const ofertaTotal = overflows.reduce((s, o) => s + o.valorVenda, 0);

    //   atualizarDados("modalExcesso", {
    //     estadoModal: true,
    //     head: "Armazenamento insuficiente",
    //     content: "A produção excedeu sua capacidade.",
    //     quantidadeExcesso: overflows.reduce(
    //       (s, o) => s + o.quantidadeExcedente,
    //       0
    //     ),
    //     ofertaExcesso: Math.floor(ofertaTotal),
    //     overflows,
    //   });

    //   return;
    // }

    // ── EXECUÇÃO ─────────────────────────────────────
    console.log("✅ Avançando dia");

    buttonNextDayAudio();

    const novoDia = state.dia + 1;
    atualizarDados("dia", novoDia);

    const faturamento = calcularFaturamento();
    console.log("💰 Faturamento do dia:", faturamento);

    processarTransacoesMercado();
    processProductions();
    executarPipelinesHoje();
    processSellQueue(faturamento);

salvarNoStorage(
  undefined,               // gameState → NÃO salva o central
  undefined,               // centralState → NÃO salva
  economiaSetores,         // mantém economia salva pelo método antigo
  getPipelinesParaSalvar() // mantém pipelines salvo pelo método antigo
);
  }, [
    atualizarDados,
    economiaSetores,
    atualizarEco,
    checkProductionOverflow,
    buttonNextDayAudio,
    calcularFaturamento,
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
  return (
    <div className="flex">
      <button
        data-tooltip-id="saldo-tip"
        data-tooltip-content="Avança para o próximo dia (D)"
        className="h-[50px] aspect-square bg-laranja rounded-[10px] flex items-center justify-center hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]"
        onClick={ProximoDia}
      >
        <img className="w-[60%]" src={PróximoImg} alt="Próximo" />
      </button>

      <Sorteio />

      <TooltipPadrao id="saldo-tip" />
    </div>
  );
}