import React, { useContext, useEffect } from "react";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import patrimônio from "../../public/imagens/patrimônio.png";
import useSound from "use-sound";
import audioCoin from "../../public/sounds/cash-register-kaching-376867.mp3";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useCentralStore } from "../stores/useCentralStore";
import { EDIFICIOS_FINAIS_ESTATICOS, EDIFICIOS_BASE_ESTATICOS } from "../stores/dadosEstáticos";

const SETORES_ARR = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

const tPC = EDIFICIOS_BASE_ESTATICOS.terrenos.preçoConstrução;
const pPC = EDIFICIOS_BASE_ESTATICOS.lojasP.preçoConstrução;
const mPC = EDIFICIOS_BASE_ESTATICOS.lojasM.preçoConstrução;
const gPC = EDIFICIOS_BASE_ESTATICOS.lojasG.preçoConstrução;
const pQNT = EDIFICIOS_BASE_ESTATICOS.lojasP.quantidadeNecTerreno;
const mQNT = EDIFICIOS_BASE_ESTATICOS.lojasM.quantidadeNecTerreno;
const gQNT = EDIFICIOS_BASE_ESTATICOS.lojasG.quantidadeNecTerreno;

// ── Cálculo de patrimônio usa dados estáticos (custo) + dinâmicos (quantidade) ──
function calcularPatrimonioSetor(setor, edificiosFinais) {
  function calcularCustoRecurso(nomeRecurso, visited = new Set()) {
    if (visited.has(nomeRecurso)) return 0;
    visited.add(nomeRecurso);
    for (const s of SETORES_ARR) {
      const edEst = EDIFICIOS_FINAIS_ESTATICOS[s]?.edificios?.find((e) => e.nome === nomeRecurso);
      if (!edEst) continue;
      let custo = edEst.custoConstrucao || 0;
      const lN = edEst.lojasNecessarias || {};
      custo += (lN.terrenos || 0) * tPC;
      custo += (lN.lojasP   || 0) * (pPC + pQNT * tPC);
      custo += (lN.lojasM   || 0) * (mPC + mQNT * tPC);
      custo += (lN.lojasG   || 0) * (gPC + gQNT * tPC);
      (edEst.recursoDeConstrução || []).forEach((sub) => { custo += calcularCustoRecurso(sub, visited); });
      return custo;
    }
    return 0;
  }

  const edificiosEst = EDIFICIOS_FINAIS_ESTATICOS[setor]?.edificios || [];
  const edificiosDin = edificiosFinais[setor] || [];
  let total = 0;
  edificiosEst.forEach((ed, idx) => {
    const qtd = edificiosDin[idx]?.quantidade ?? 0;
    if (qtd > 0) total += calcularCustoRecurso(ed.nome) * qtd;
  });
  return total;
}

const tooltipStyle = {
  backgroundColor: "#1a053d", color: "#fff",
  borderRadius: "10px", border: "1px solid #FF8A00",
  padding: "10px", fontSize: "12px", zIndex: 200,
};

export function TaxesYear() {
  // ── Zustand ───────────────────────────────────────────────
  const dia           = useCentralStore((s) => s.dia);
  const edificiosFinais = useCentralStore((s) => s.edificiosFinais);

  // ── Economy Context (inalterado) ──────────────────────────
  const { economiaSetores, atualizarEcoProf } = useContext(DadosEconomyGlobalContext);

  const [audioPay] = useSound(audioCoin);

  const proximoDiaChegar = (n) => (n % 360 === 0 ? 0 : 360 - (n % 360));
  const proximoDia = proximoDiaChegar(dia);

  // ── Atualiza próximo pagamento ────────────────────────────
  useEffect(() => {
    if (!economiaSetores.despesasImpostoAnual) return;
    atualizarEcoProf(["despesasImpostoAnual"], {
      ...economiaSetores.despesasImpostoAnual,
      proximoPagamento: proximoDia,
    });
  }, [dia]);

  // ── Atualiza patrimônio por setor ─────────────────────────
  useEffect(() => {
    if (dia < 270) return;
    let patrimonioGlobal = 0;
    SETORES_ARR.forEach((setor) => {
      const setorData = economiaSetores[setor]?.economiaSetor;
      if (!setorData) return;
      const patrimonioSetor = calcularPatrimonioSetor(setor, edificiosFinais);
      atualizarEcoProf([setor, "economiaSetor"], { ...setorData, patrimonio: patrimonioSetor });
      patrimonioGlobal += patrimonioSetor;
    });
    atualizarEcoProf(["patrimonioGlobal"], patrimonioGlobal);
  }, [edificiosFinais]);

  // ── Acumula imposto mensal ────────────────────────────────
  useEffect(() => {
    if (dia < 270 || dia % 30 !== 0) return;
    let impostoTotalMes = 0;
    SETORES_ARR.forEach((setor) => {
      const setorData = economiaSetores[setor]?.economiaSetor;
      if (!setorData) return;
      const patrimonioSetor = calcularPatrimonioSetor(setor, edificiosFinais);
      const valorImpostoMes = (patrimonioSetor * setorData.percImpostoAnualAtual) / 12 / 100;
      const novoValorAcumulado = (setorData.valorImpostoAnualAtual || 0) + valorImpostoMes;
      atualizarEcoProf([setor, "economiaSetor"], { ...setorData, valorImpostoAnualAtual: novoValorAcumulado });
      impostoTotalMes += valorImpostoMes;
    });
    const impostoGlobalAtual = economiaSetores.valorImpostoAnual || 0;
    atualizarEcoProf(["valorImpostoAnual"], impostoGlobalAtual + impostoTotalMes);

    if (dia % 360 === 0) {
      atualizarEcoProf(["despesasImpostoAnual"], {
        ...economiaSetores.despesasImpostoAnual,
        diaPagarImpostoAnual: true,
        impostoAnualPago: false,
        proximoPagamento: 0,
      });
    }
  }, [dia]);

  const pagarImpostoAnual = () => {
    if (dia % 360 !== 0) return;
    const valor = economiaSetores.valorImpostoAnual || 0;
    if (economiaSetores.saldo < valor) return;
    atualizarEcoProf(["saldo"], economiaSetores.saldo - valor);
    audioPay();
    atualizarEcoProf(["despesasImpostoAnual"], {
      ...economiaSetores.despesasImpostoAnual,
      diaPagarImpostoAnual: false,
      impostoAnualPago: true,
      proximoPagamento: 360,
    });
    atualizarEcoProf(["valorImpostoAnual"], 0);
  };

  if (dia < 270) return null;

  const isPending = dia % 360 === 0 && !economiaSetores.despesasImpostoAnual?.impostoAnualPago;
  const isNear    = proximoDia <= 30 && !isPending;

  return (
    <div className={`flex items-center justify-between w-full h-[54px] rounded-[12px] p-1 transition-all duration-500 ${
      isPending ? "bg-red-600/20 border border-red-500 animate-pulse" : "bg-[#350973]/40 border border-white/10"
    }`}>
      <div
        className="flex flex-col items-center justify-center flex-1"
        data-tooltip-id="tax-info"
        data-tooltip-content={isPending ? "IMPOSTO VENCIDO!" : `Próximo imposto em ${proximoDia} dias`}
      >
        <h2 className={`text-[20px] fonteBold leading-none ${isNear ? "text-laranja" : "text-white"}`}>
          {proximoDia}
        </h2>
      </div>
      <button
        onClick={pagarImpostoAnual}
        disabled={!isPending}
        data-tooltip-id="tax-action"
        data-tooltip-content={isPending ? "CLIQUE PARA PAGAR AGORA" : `Aguarde o fechamento do ano (${proximoDia} dias)`}
        className={`relative h-full aspect-square rounded-[10px] flex items-center justify-center transition-all ${
          isPending
            ? "bg-gradient-to-br from-red-500 to-red-700 shadow-[0_0_20px_rgba(239,68,68,0.4)] scale-105 cursor-pointer"
            : "bg-gray-500/50 grayscale opacity-50 cursor-not-allowed"
        }`}
      >
        <img src={patrimônio} className="w-6 h-6 object-contain" alt="tax" />
        <div className="absolute -top-1 -right-1">
          <span className="relative flex size-3">
            {(isPending || isNear) && (
              <>
                <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${isPending ? "bg-red-500" : "bg-laranja"}`} />
                <span className={`relative inline-flex size-3 rounded-full ${isPending ? "bg-red-500" : "bg-laranja"}`} />
              </>
            )}
          </span>
        </div>
      </button>
      <Tooltip id="tax-info"   style={tooltipStyle} />
      <Tooltip id="tax-action" style={tooltipStyle} />
    </div>
  );
}