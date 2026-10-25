import React, { useContext, useEffect, useRef } from "react";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import circularEconomia from "../../public/outrasImagens/circular-economy.png";
import Converter from "./Converter";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useCentralStore } from "../stores/useCentralStore";

// ── fora do componente ─────────────────────────────────────
const estadosEconômicos = ["recessão", "declinio", "estável", "progressiva", "aquecida"];
const setores           = ["agricultura", "tecnologia", "industria", "comercio", "imobiliario", "energia"];
const selecionarItem    = (lista) => lista[Math.floor(Math.random() * lista.length)];
const valorEconomico    = (estado) => ({ recessão: -2, declinio: -1, estável: 0, progressiva: 1, aquecida: 2 }[estado] ?? 0);

const tooltipStyle = {
  backgroundColor: "#1a053d", color: "#FFFFFF",
  borderRadius: "8px", border: "1px solid #FF8A00",
  padding: "10px", fontWeight: "600", fontSize: "13px", zIndex: 100,
};
const TooltipPadrao = ({ id }) => <Tooltip id={id} style={tooltipStyle} />;

export default function EconomyGlobal() {
  // ── Zustand ───────────────────────────────────────────────
  const dia              = useCentralStore((s) => s.dia);
  const proximaEconomia  = useCentralStore((s) => s.proximaEconomia);
  const modalEconomiaGlobal = useCentralStore((s) => s.modalEconomiaGlobal);
  const atualizarDados   = useCentralStore((s) => s.atualizarDados);

  // ── Economy Context ───────────────────────────────────────
  const { economiaSetores, atualizarDadosEconomy, atualizarEco } = useContext(DadosEconomyGlobalContext);

  const economiaAtual = economiaSetores?.economiaGlobal ?? "estável";

  const corClasse = {
    recessão:    "bg-[#FF0000]",
    declinio:    "bg-[#FF8000]",
    estável:     "bg-[#EEAD2D]",
    progressiva: "bg-[#9ACD32]",
    aquecida:    "bg-[#006400]",
  }[economiaAtual] || "bg-black";

  // ✅ CORREÇÃO: guarda contra dupla execução no mesmo dia (StrictMode/remontagem)
  const ultimoDiaProcessado = useRef(-1);

  // ── Economia global pré-270 ───────────────────────────────
  useEffect(() => {
    if (dia % 90 !== 0 || dia > 269 || dia <= 0) return;
    if (ultimoDiaProcessado.current === dia) return;
    ultimoDiaProcessado.current = dia;

    const novaEconomia = selecionarItem(estadosEconômicos);
    atualizarDados("modalEconomiaGlobal", { ...modalEconomiaGlobal, estadoModal: true });
    atualizarEco("economiaGlobal", novaEconomia);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dia]);

  // ── Economia por setor pós-270 ────────────────────────────
  useEffect(() => {
    if (dia % 90 !== 0 || dia < 270 || dia <= 0) return;
    if (ultimoDiaProcessado.current === dia) return;
    ultimoDiaProcessado.current = dia;

    let somaEconomias = 0;
    const novosEstados = {};

    setores.forEach((setor) => {
      const novaEconomia = selecionarItem(estadosEconômicos);
      novosEstados[setor] = novaEconomia;
      somaEconomias += valorEconomico(novaEconomia);

      // ✅ CORREÇÃO: usa atualizarEcoProfSeguro (cria caminho se faltar)
      //    em vez de atualizarDadosEconomy (abortava silenciosamente)
      atualizarDadosEconomy([setor, "economiaSetor", "estadoAtual"], novaEconomia);
    });

    const decidirEconomiaGlobal = () => {
      if (somaEconomias < -5) return "recessão";
      if (somaEconomias < -2) return "declinio";
      if (somaEconomias < 2)  return "estável";
      if (somaEconomias < 5)  return "progressiva";
      return "aquecida";
    };

    atualizarDados("modalEconomiaGlobal", { ...modalEconomiaGlobal, estadoModal: true });
    atualizarEco("economiaGlobal", decidirEconomiaGlobal());

    console.log(`[EconomyGlobal] dia ${dia} — novos estados por setor:`, novosEstados,
      `| soma: ${somaEconomias} → global: ${decidirEconomiaGlobal()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dia]);

  // ── Contador de dias para próxima mudança ─────────────────
  useEffect(() => {
    const calcularProximoDia = (n) => (n % 90 === 0 ? 0 : 90 - (n % 90));
    atualizarDados("proximaEconomia", calcularProximoDia(dia));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dia]);

  return (
    <div className="flex max-h-[50px] w-full bg-gradient-to-r from-[#350973] to-[#6411D9] border border-white/20 rounded-[10px] overflow-hidden shadow-lg">
      <Converter />
      <div className={`${corClasse} min-w-[50px] aspect-square flex items-center justify-center border-r border-white/10 shadow-[inset_0_0_10px_rgba(0,0,0,0.3)]`}>
        <img
          data-tooltip-id="economia-tip"
          data-tooltip-html={`Economia Global: <b>${economiaAtual?.toUpperCase()}</b> <br/><br/> Variação de eventos conforme o status.`}
          className="w-[28px] h-[28px] brightness-0 invert opacity-90"
          src={circularEconomia}
          alt="Economia"
        />
        <TooltipPadrao id="economia-tip" />
      </div>
      <div
        data-tooltip-id="economiaData-tip"
        data-tooltip-content="Dias restantes para a próxima mudança econômica"
        className="flex justify-center items-center w-full bg-black/10"
      >
        <h2 className="text-white text-[22px] fonteBold drop-shadow-md">
          {proximaEconomia}
        </h2>
        <TooltipPadrao id="economiaData-tip" />
      </div>
    </div>
  );
}