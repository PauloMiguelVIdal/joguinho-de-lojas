import React, { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import PróximoImg from "../../public/outrasImagens/proximo.png";
import Sorteio from "./Sorteio";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import useSound from "use-sound";
import nextDayAudio from "../../public/sounds/nextDayAudio.mp3";
import newStageAudio from "../../public/sounds/newStageAudio.mp3";
import { useHotkeys } from "react-hotkeys-hook";
import { usePipeline } from "./PipelineContext";
import { productsCatalog } from "./ProductCatalog";
import { useGame } from "../components/GameContext";
import { salvarNoStorage } from "./usePersistencia";

// ─── PERFORMANCE: tooltipStyle estático fora do componente ───────────────────
// Antes era recriado como objeto literal a cada render.
const tooltipStyle = {
  backgroundColor: "#FFFFFF",
  color: "#350973",
  borderRadius: "6px",
  padding: "6px 10px",
  fontWeight: "600",
  fontSize: "14px",
};

// ─── PERFORMANCE: TooltipPadrao fora do componente ───────────────────────────
// Antes era redefinido dentro do componente, causando remontagem a cada render.
const TooltipPadrao = ({ id }) => (
  <Tooltip id={id} style={tooltipStyle} border="1px solid #350973" />
);

// ─── PERFORMANCE: lista de lojas estática fora do componente ─────────────────
const TODAS_LOJAS = ["terrenos", "lojasP", "lojasM", "lojasG"];

export function NextDay() {
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  const { economiaSetores, setEconomiaSetores, atualizarEco, atualizarVenda } = useContext(
    DadosEconomyGlobalContext
  );
  const {
    stock,
    productionQueue,
    sellQueue,
    salesContracts,
    contratosEdificios,
    marketTransactions,
  } = useGame();

  const { getPipelinesParaSalvar } = usePipeline();

  // ─── PERFORMANCE: bug corrigido + memoização correta ─────────────────────────
  // Antes: getPipelinesParaSalvar estava nas deps mas não no objeto.
  // Agora: incluído no objeto e chamado dentro do useMemo para capturar
  // o valor no momento certo sem violar regras de hooks.
  const gameStateParaSalvar = useMemo(() => ({
    stock,
    productionQueue,
    sellQueue,
    contratosEdificios,
    pipelines: getPipelinesParaSalvar(),
  }), [stock, productionQueue, sellQueue, contratosEdificios, getPipelinesParaSalvar]);

  const {
    processarVendas,
    checkProductionOverflow,
    processarTransacoesMercado,
    processProductions,
    processSellQueue,
  } = useGame();

  const [buttonNextDayAudio] = useSound(nextDayAudio);
  const [buttonNewStageAudio] = useSound(newStageAudio);
  const [isNKeyDown, setIsNKeyDown] = useState(false);
  const [executouAudio270, setExecutouAudio270] = useState(false);

  const { executarPipelinesHoje } = usePipeline();

  useEffect(() => {
    if (dados.dia === 270 && !executouAudio270) {
      buttonNewStageAudio();
      setExecutouAudio270(true);
    }
  }, [dados.dia, executouAudio270]);

  // ─── PERFORMANCE: calcularFaturamento memoizado com useCallback ──────────────
  // Antes era recriado em todo render pois era função local sem memoização,
  // e era chamada dentro de ProximoDia que também não era memoizada.
  const calcularFaturamento = useCallback(() => {
    let faturamentoDiario = 0;

    const novasLojas = TODAS_LOJAS.map((loja) => {
      const valorUnitário = dados.dia >= 270 ? 0 : dados[loja].faturamentoUnitárioPadrão;
      const valorVariável = parseFloat(
        (valorUnitário * (1 + (Math.random() * 0.6 - 0.3))).toFixed(2)
      );
      const faturamentoTotal = parseFloat(
        (valorVariável * dados[loja].quantidade).toFixed(2)
      );

      faturamentoDiario += faturamentoTotal;

      if (dados.dia === 270) {
        let patrimonio = 0;
        TODAS_LOJAS.forEach((l) => {
          const quantidadeLojas = dados[l].quantidade;
          const precoConstrucao = dados[l].preçoConstrução;
          const quantidadeTerrenosNec = dados[l].quantidadeNecTerreno;
          const custoTerreno = dados.terrenos.preçoConstrução;
          const custoTotalLoja =
            quantidadeLojas * precoConstrucao +
            quantidadeTerrenosNec * custoTerreno;
          patrimonio += custoTotalLoja;
          atualizarDados("faturamentoUnitário", (dados[l].faturamentoUnitário = 0));
        });
        faturamentoDiario += patrimonio * 0.1;
      }

      return {
        ...dados[loja],
        faturamentoUnitário: valorVariável,
        faturamentoTotal,
      };
    });

    const novoFaturamentoMensal =
      dados.dia % 30 === 0
        ? faturamentoDiario
        : dados.faturamento.faturamentoMensal + faturamentoDiario;

    if (dados.dia <= 270) {
      atualizarDados("faturamento", {
        ...dados.faturamento,
        faturamentoDiário: faturamentoDiario,
        faturamentoMensal: novoFaturamentoMensal,
        arrayFatuDiário: [
          ...dados.faturamento.arrayFatuDiário,
          faturamentoDiario,
        ],
      });
    }

    TODAS_LOJAS.forEach((loja, index) => {
      atualizarDados(loja, novasLojas[index]);
    });

    return faturamentoDiario;
  }, [dados, atualizarDados]);

  // ─── PERFORMANCE: ProximoDia memoizado com useCallback ───────────────────────
  // Antes era função local recriada a cada render, o que forçava o useHotkeys
  // a re-registrar o listener e o botão a re-renderizar desnecessariamente.
  const ProximoDia = useCallback(() => {
    if (dados.modalExcesso.confirmarAvanco) {
      atualizarDados("modalExcesso", {
        ...dados.modalExcesso,
        confirmarAvanco: false,
      });
    }

    if (economiaSetores.saldo < 0) {
      atualizarEco("fimGame", true);
      return;
    }
    if (
      dados.dia % 360 === 0 &&
      !economiaSetores.despesasImpostoAnual.impostoAnualPago
    ) return;
    if (dados.dia % 30 === 0 && !dados.despesas.despesasPagas) return;
    if (!economiaSetores.despesasEmprestimo.despesasPagas) return;

    if (economiaSetores.activeLoans?.[0]?.proximoVencimento !== undefined) {
      if (economiaSetores.activeLoans[0].proximoVencimento <= dados.dia) return;
    }
    if (economiaSetores.activeLoans?.[1]?.proximoVencimento !== undefined) {
      if (economiaSetores.activeLoans[1].proximoVencimento <= dados.dia) return;
    }
    if (economiaSetores.activeLoans?.[2]?.proximoVencimento !== undefined) {
      if (economiaSetores.activeLoans[2].proximoVencimento <= dados.dia) return;
    }
    if (economiaSetores.activeLoan?.proximoVencimento !== undefined) {
      if (economiaSetores.activeLoan.proximoVencimento === dados.dia) return;
    }

    const overflows = checkProductionOverflow();

    if (overflows.length > 0) {
      const ofertaTotal = overflows.reduce((s, o) => s + o.valorVenda, 0);
      atualizarDados("modalExcesso", {
        estadoModal: true,
        head: "Armazenamento insuficiente",
        content:
          "A produção gerou mais itens do que sua capacidade permite. Caso deseje, expanda o seu armazenamento, ou se preferir vender o valor excedente do produto",
        quantidadeExcesso: overflows.reduce((s, o) => s + o.quantidadeExcedente, 0),
        ofertaExcesso: Math.floor(ofertaTotal),
        overflows,
      });
      return;
    }

    buttonNextDayAudio();

    const novoDia = dados.dia + 1;
    atualizarDados("dia", novoDia);

    const faturamento = calcularFaturamento();
    console.log("faturamento calculado:", faturamento);

    processarTransacoesMercado();
    processProductions();
    executarPipelinesHoje();
    processSellQueue(faturamento);

    salvarNoStorage(
      gameStateParaSalvar,
      dados,
      economiaSetores,
      getPipelinesParaSalvar()
    );
  }, [
    dados,
    economiaSetores,
    atualizarDados,
    atualizarEco,
    checkProductionOverflow,
    buttonNextDayAudio,
    calcularFaturamento,
    processarTransacoesMercado,
    processProductions,
    executarPipelinesHoje,
    processSellQueue,
    gameStateParaSalvar,
    getPipelinesParaSalvar,
  ]);

  useHotkeys(
    "d",
    () => {
      if (
        dados.dia <= 1 ||
        dados.modal.estadoModal ||
        dados.modalAlert.estadoModal ||
        dados.modalDespesas.estadoModal ||
        dados.modalEconomiaGlobal.estadoModal ||
        dados.dia % 30 === 0 ||
        dados.dia === 400 ||
        isNKeyDown
      ) return;
      setIsNKeyDown(true);
      ProximoDia();
    },
    { keydown: true, keyup: false, enableOnTags: ["INPUT", "TEXTAREA", "SELECT"] }
  );

  useHotkeys(
    "d",
    () => { setIsNKeyDown(false); },
    { keydown: false, keyup: true, enableOnTags: ["INPUT", "TEXTAREA", "SELECT"] }
  );

  return (
    <div className="flex">
      <button
        data-tooltip-id="saldo-tip"
        data-tooltip-content="Avança para o próximo dia (D)"
        className="h-[50px] aspect-square bg-laranja rounded-[10px] flex items-center justify-center hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]"
        onClick={ProximoDia}
      >
        <img className="w-[60%] aspect-square" src={PróximoImg} alt="Próximo" />
      </button>
      <Sorteio />
      <TooltipPadrao id="saldo-tip" />
    </div>
  );
}