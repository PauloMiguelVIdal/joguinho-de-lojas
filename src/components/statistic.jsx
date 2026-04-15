import { useMemo } from "react";
import { useCentralStore } from "../stores/useCentralStore";

export const Statistic = () => {
  // ── Seletores granulares ─────────────────────────
  const terrenos = useCentralStore((s) => s.edificiosBase.terrenos);
  const lojasP   = useCentralStore((s) => s.edificiosBase.lojasP);
  const lojasM   = useCentralStore((s) => s.edificiosBase.lojasM);
  const lojasG   = useCentralStore((s) => s.edificiosBase.lojasG);

  // ── Cálculo memoizado ────────────────────────────
  return useMemo(() => {
    // ───────── TERRENOS ─────────
    const custosTerrenos =
      terrenos.preçoConstrução * 2;

    const lucrosTerrenos =
      terrenos.faturamentoUnitárioPadrão * 30;

    const impostosTerrenos =
      lucrosTerrenos * terrenos.impostoSobreFaturamento +
      terrenos.impostoFixo;

    const resultadoTerrenos =
      ((lucrosTerrenos - impostosTerrenos) / custosTerrenos) * 100;

    // ───────── LOJAS P ─────────
    const custosLojasP =
      lojasP.preçoConstrução + terrenos.preçoConstrução;

    const lucrosLojasP =
      lojasP.faturamentoUnitárioPadrão * 30;

    const impostosLojasP =
      lucrosLojasP * lojasP.impostoSobreFaturamento +
      lojasP.impostoFixo;

    const resultadoLojasP =
      ((lucrosLojasP - impostosLojasP) / custosLojasP) * 100;

    // ───────── LOJAS M ─────────
    const custosLojasM =
      lojasM.preçoConstrução + 2 * terrenos.preçoConstrução;

    const lucrosLojasM =
      lojasM.faturamentoUnitárioPadrão * 30;

    const impostosLojasM =
      lucrosLojasM * lojasM.impostoSobreFaturamento +
      lojasM.impostoFixo;

    const resultadoLojasM =
      ((lucrosLojasM - impostosLojasM) / custosLojasM) * 100;

    // ───────── LOJAS G ─────────
    const custosLojasG =
      lojasG.preçoConstrução + 3 * terrenos.preçoConstrução;

    const lucrosLojasG =
      lojasG.faturamentoUnitárioPadrão * 30;

    const impostosLojasG =
      lucrosLojasG * lojasG.impostoSobreFaturamento +
      lojasG.impostoFixo;

    const resultadoLojasG =
      ((lucrosLojasG - impostosLojasG) / custosLojasG) * 100;

    return {
      resultadoTerrenos,
      resultadoLojasP,
      resultadoLojasM,
      resultadoLojasG,
    };
  }, [terrenos, lojasP, lojasM, lojasG]);
};