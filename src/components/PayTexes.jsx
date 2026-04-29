import { useContext, useEffect, useState } from "react";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import despesasImg from "../../public/outrasImagens/despesas.png";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import useSound from "use-sound";
import audioCoin from "../../public/sounds/cash-register-kaching-376867.mp3";
import { useHotkeys } from "react-hotkeys-hook";
import { useCentralStore } from "../stores/useCentralStore";
import { EDIFICIOS_FINAIS_ESTATICOS, EDIFICIOS_BASE_ESTATICOS } from "../stores/dadosEstáticos";

// ── Constantes estáticas — fora do componente ─────────────────────────────────
const SETORES_ARR = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];
const TODAS_LOJAS = ["terrenos", "lojasP", "lojasM", "lojasG"];

const tooltipStyle = {
  backgroundColor: "#FFFFFF", color: "#350973",
  borderRadius: "6px", padding: "6px 10px",
  fontWeight: "600", fontSize: "14px",
};
const TooltipPadrao = ({ id }) => (
  <Tooltip id={id} style={tooltipStyle} border="1px solid #350973" />
);

export default function PayTexes() {
  // ── Zustand — seletores granulares ────────────────────────
  const dia              = useCentralStore((s) => s.dia);
  const despesas         = useCentralStore((s) => s.despesas);
  const faturamento      = useCentralStore((s) => s.faturamento);
  const modal            = useCentralStore((s) => s.modal);
  const modalAlert       = useCentralStore((s) => s.modalAlert);
  const modalDespesas    = useCentralStore((s) => s.modalDespesas);
  const modalEconomiaGlobal = useCentralStore((s) => s.modalEconomiaGlobal);
  const edificiosBase    = useCentralStore((s) => s.edificiosBase);
  const edificiosFinais  = useCentralStore((s) => s.edificiosFinais);
  const atualizarDados   = useCentralStore((s) => s.atualizarDados);
  const atualizarLote    = useCentralStore((s) => s.atualizarLote);
const atualizarDadosProf = useCentralStore((s) => s.atualizarDadosProf);

  // ── Economy Context (inalterado) ──────────────────────────
  const {
    economiaSetores,
    setEconomiaSetores,
    atualizarEcoSafely,
    atualizarEco,
  } = useContext(DadosEconomyGlobalContext);

  const [isNKeyDown, setIsNKeyDown] = useState(false);
  const [audioPay] = useSound(audioCoin);

  const diaPag = dia % 30 === 0;

  const realizarPag = () => {
    if (despesas.despesasPagas) return;
    PagarDespesas();
    audioPay();
  };

  // ── Hotkey S ──────────────────────────────────────────────
  useHotkeys("s", () => {
    if (
      !despesas.diaPagarDespesas ||
      dia % 30 !== 0 ||
      despesas.despesasPagas ||
      modal.estadoModal ||
      modalAlert.estadoModal ||
      modalDespesas.estadoModal ||
      modalEconomiaGlobal.estadoModal ||
      isNKeyDown
    ) return;
    setIsNKeyDown(true);
    realizarPag();
  }, { keydown: true, keyup: false, enableOnTags: ["INPUT", "TEXTAREA", "SELECT"] });

  useHotkeys("s", () => setIsNKeyDown(false), {
    keydown: false, keyup: true, enableOnTags: ["INPUT", "TEXTAREA", "SELECT"],
  });

  // ── Cálculo de impostos diário/mensal pré-270 ─────────────
  useEffect(() => {
    if (dia >= 270) return;

    let impostoFixoTotal           = 0;
    let impostoFaturamentoMensal   = 0;
    let impostoDiarioTotal         = 0;
    const updates                  = [];

    TODAS_LOJAS.forEach((loja) => {
      const lojaBase = edificiosBase[loja];
      if (!lojaBase) return;

      const faturamentoDiario         = parseFloat(lojaBase.faturamentoTotal || 0);
      const impostoFixo               = (lojaBase.quantidade || 0) * (lojaBase.impostoFixo || 0);
      const impostoSobreFaturamento   = faturamentoDiario * (lojaBase.impostoSobreFaturamento || 0);

      const novoArrayFatu = [...(lojaBase.arrayFatu || []), faturamentoDiario].slice(-360);
      const somaMensalFatu = novoArrayFatu.reduce((acc, val) => acc + val, 0);
      const impostoMensalSobreFaturamento = somaMensalFatu * (lojaBase.impostoSobreFaturamento || 0);

      updates.push([
        ["edificiosBase", loja],
        {
          ...lojaBase,
          arrayFatu: novoArrayFatu,
          somaArrayFatu: somaMensalFatu,
          valorImpostoSobreFaturamento: impostoSobreFaturamento,
          valorImpostoFixoTotal: impostoFixo,
        },
      ]);

      impostoFixoTotal           += impostoFixo;
      impostoFaturamentoMensal   += impostoMensalSobreFaturamento;
      impostoDiarioTotal         += impostoFixo + impostoSobreFaturamento;
    });

    atualizarLote(updates);

    const impostoMensalTotal = impostoFixoTotal + impostoFaturamentoMensal;
    atualizarEco("imposto", {
      impostoFixoMensal:              impostoFixoTotal,
      impostoDiário:                  impostoDiarioTotal,
      impostoMensal:                  impostoMensalTotal,
      impostoFaturamentoMensal,
      impostoSobreFaturamentoDiário:  impostoDiarioTotal - impostoFixoTotal,
    });
  }, [dia]);

  // ── Zerando dados das lojas base no dia 269 ───────────────
  useEffect(() => {
    if (dia !== 269) return;
    const updates = TODAS_LOJAS.map((loja) => ([
      ["edificiosBase", loja],
      {
        ...edificiosBase[loja],
        faturamentoUnitário:         0,
        faturamentoUnitárioPadrão:   0,
        impostoFixo:                 0,
        impostoSobreFaturamento:     0,
      },
    ]));
    atualizarLote(updates);
  }, [dia]);

  // ── Gatilho de despesas mensais ───────────────────────────
  useEffect(() => {
    if (dia % 30 === 0) {
      atualizarDados("despesas", {
        ...despesas,
        diaPagarDespesas: true,
        despesasPagas: false,
        proximoPagamento: "30",
      });
    }
  }, [despesas.proximoPagamento]);

  useEffect(() => {
    if (dia % 30 === 0 && !despesas.despesasPagas) {
      atualizarDados("modalDespesas", { ...modalDespesas, estadoModal: true });
    }
  }, [dia, despesas.despesasPagas]);

  // ── Contador de dias para próximo pagamento ───────────────
  useEffect(() => {
    const proximoDia = dia % 30 === 0 ? 0 : 30 - (dia % 30);
    atualizarDados("despesas", { ...despesas, proximoPagamento: proximoDia });
  }, [dia]);

  // ── Faturamento + impostos pós-270 ────────────────────────
  useEffect(() => {
    if (dia < 270) return;

    let faturamentoTotalDiario     = 0;
    let faturamentoTotalMensal     = 0;
    let impostoDiarioTotal         = 0;
    let impostoFaturamentoMensal   = 0;
    let impostoFixoTotal           = 0;

    const ehPrimeiroDiaDoMes = dia % 30 === 1;

SETORES_ARR.forEach((setor) => {
  const edificiosEst = EDIFICIOS_FINAIS_ESTATICOS[setor]?.edificios || [];
  const edificiosDin = edificiosFinais[setor]?.edificios ?? []; // ✅ correto

  let faturamentoTotalSetor = 0;

  const edificiosAtualizados = edificiosDin.map((edDin, idx) => {
    const edEst = edificiosEst[idx];
    if (!edEst || (edDin.quantidade || 0) <= 0) return edDin;

    const quantidade = edDin.quantidade || 0;
    const faturamentoUnit = edEst.finanças?.faturamentoUnitário || 0;
    const impostoFixo = edEst.finanças?.impostoFixo || 0;
    const impostoSobreFatu = edEst.finanças?.impostoSobreFatu || 0;
    const qtdMinNv3 = edEst.powerUp?.nível3?.quantidadeMínima ?? Infinity;
    const qtdMinNv2 = edEst.powerUp?.nível2?.quantidadeMínima ?? Infinity;

    // Power‑ups
    let acumuladorRedCusto = 0;
    let acumuladorAumFatu = 0;
    const { edificiosFinais: ef } = useCentralStore.getState();
    (edEst.RecebeMelhoraEficiencia || []).forEach((rel) => {
      for (const s of SETORES_ARR) {
        const idxRel = EDIFICIOS_FINAIS_ESTATICOS[s]?.edificios?.findIndex((e) => e.nome === rel.nome) ?? -1;
        if (idxRel !== -1) {
          const qtdRel = ef[s]?.[idxRel]?.quantidade ?? 0;
          if (qtdRel > 0) {
            const nivel = quantidade >= qtdMinNv3 ? "nível3" : quantidade >= qtdMinNv2 ? "nível2" : "nível1";
            acumuladorRedCusto += rel.redCusto[nivel] || 0;
            acumuladorAumFatu  += rel.aumFatu[nivel]  || 0;
          }
          break;
        }
      }
    });

    const economiaSetor = economiaSetores[setor]?.economiaSetor?.estadoAtual || "estável";
    const fatorEconomico = { recessão: 0.4, declinio: 0.8, estável: 1, progressiva: 1.1, aquecida: 1.25 }[economiaSetor] || 1;
    const valorFatuFinal = faturamentoUnit * (1 + acumuladorAumFatu / 100);
    const faturamentoDiario = valorFatuFinal * quantidade * fatorEconomico;
    faturamentoTotalSetor += faturamentoDiario;

    const impostoFatuFinal = impostoSobreFatu * (1 - acumuladorRedCusto / 100);
    const impostoFatuDiario = faturamentoDiario * impostoFatuFinal;

    const ehPrimeiroDiaDoMes = dia % 30 === 1;
    const arrayFatu = edDin.arrayFatu || [];
    const novoArrayFatu = ehPrimeiroDiaDoMes
      ? [faturamentoDiario]
      : [...arrayFatu, faturamentoDiario].slice(-360);
    const somaMensalFatu = novoArrayFatu.reduce((acc, v) => acc + v, 0);

    const impostoMensalSobreFatu = somaMensalFatu * impostoFatuFinal;

    const impostoFixoDesc = impostoFixo * (1 - acumuladorRedCusto / 100);
    const impostoFixoEdificio = impostoFixoDesc * quantidade;

    return {
      ...edDin,
      arrayFatu: novoArrayFatu,
      somaArrayFatu: somaMensalFatu,
      faturamentoTotal: faturamentoDiario,
      valorImpostoSobreFaturamento: impostoMensalSobreFatu,
      valorImpostoFixoTotal: impostoFixoEdificio,
      impostoMensal: impostoMensalSobreFatu + impostoFixoEdificio,
    };
  });

  // ❌ remova esta linha se existir:
  // atualizarDados(`edificiosFinais_${setor}`, null);

  // ✅ atualiza apenas a propriedade 'edificios' dentro do objeto do setor
  atualizarDadosProf(["edificiosFinais", setor, "edificios"], edificiosAtualizados);

  // Atualiza arrays de faturamento do setor no context (mantenha como está)
  const arrayFatuSetor = economiaSetores[setor]?.economiaSetor?.ArrayFatu || [];
  const ehPrimeiroDiaDoMes = dia % 30 === 1;
  const novoArrayFatuSetor = ehPrimeiroDiaDoMes
    ? [faturamentoTotalSetor]
    : [...arrayFatuSetor, faturamentoTotalSetor].slice(-360);
  const arrayFatuHistory = economiaSetores[setor]?.economiaSetor?.ArrayFatuHistory || [];
  const novoArrayFatuHistory = [...arrayFatuHistory, faturamentoTotalSetor].slice(-360);
  atualizarEcoSafely(setor, { ArrayFatu: novoArrayFatuSetor, ArrayFatuHistory: novoArrayFatuHistory });
});

    const impostoMensalTotal = impostoFixoTotal + impostoFaturamentoMensal;
    const novoSaldo          = economiaSetores.saldo + faturamentoTotalDiario;

    atualizarDados("faturamento", {
      ...faturamento,
      faturamentoMensal: faturamentoTotalMensal,
      faturamentoDiario: faturamentoTotalDiario,
      arrayFatuDiário:   [...(faturamento.arrayFatuDiário || []), faturamentoTotalDiario],
    });

    atualizarEco("imposto", {
      impostoDiário:                  impostoDiarioTotal,
      impostoMensal:                  impostoMensalTotal,
      impostoFixoMensal:              impostoFixoTotal,
      impostoFaturamentoMensal,
      impostoSobreFaturamentoDiário:  impostoDiarioTotal,
      arrayImpostoDiário:             [...(economiaSetores.imposto?.arrayImpostoDiário || []), impostoDiarioTotal],
    });

    atualizarEco("saldo", novoSaldo);
  }, [dia]);

  // ── Pagar despesas mensais ────────────────────────────────
  const PagarDespesas = () => {
    if (despesas.despesasPagas) return;
    const novoSaldo = economiaSetores.saldo - economiaSetores.imposto.impostoMensal;
    atualizarEco("saldo", novoSaldo);
    atualizarDados("despesas", { ...despesas, despesasPagas: true });
    if (dia === 270) atualizarEco("imposto", { impostoMensal: 0 });
  };

  const tooltipText = `
<div>
  <p>Clique aqui para pagar as despesas mensais. (S)</p>
  <p style="margin-top:4px;">Detalhes dos impostos:</p>
  <p><p/>
  <p style="margin-left:10px;">Imposto Anual Acumulado: R$ ${economiaSetores.valorImpostoAnual?.toFixed(2) || 0}</p>
  <p style="margin-left:10px;">Imposto Fixo Mensal: R$ ${economiaSetores.imposto?.impostoFixoMensal?.toFixed(2) || 0}</p>
  <p style="margin-left:10px;">Imposto sobre Faturamento: R$ ${economiaSetores.imposto?.impostoFaturamentoMensal?.toFixed(2) || 0}</p>
  <p style="margin-left:10px;">Total Mensal: R$ ${economiaSetores.imposto?.impostoMensal?.toFixed(2) || 0}</p>
</div>`;

  return (
    <div className="flex justify-center items-center bg-[#6411D9] w-full rounded-[10px] relative">
      <div className="flex justify-center items-center w-[50px]">
        <h2 className="text-white text-[20px] fonteBold">
          {despesas.proximoPagamento}
        </h2>
      </div>
      <button
        data-tooltip-id="tooltip-despesas"
        data-tooltip-html={tooltipText}
        className="h-[50px] aspect-square rounded-[10px] flex items-center justify-center"
        style={{ backgroundColor: diaPag ? "#F27405" : "#ebac75ff" }}
        onClick={realizarPag}
      >
        <img className="h-[70%] aspect-square" src={despesasImg} alt="despesas" />
      </button>

      {dia % 30 === 0 && (
        <div className="absolute bottom-[-5px] right-[-5px]">
          <span className="relative flex size-3">
            <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${despesas.despesasPagas ? "bg-[#008000]" : "bg-[#FF0000]"}`} />
            <span className={`relative inline-flex size-3 rounded-full ${despesas.despesasPagas ? "bg-[#008000]" : "bg-[#FF0000]"}`} />
          </span>
        </div>
      )}
      <TooltipPadrao id="tooltip-despesas" />
    </div>
  );
}