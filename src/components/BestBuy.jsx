import { useMemo } from "react";
import { analisarJogo } from "./analiseEngine";

export const BestBuy = ({ dados, economiaSetores, valorEconomiaSetor }) => {

  const analise = useMemo(() => {
    try {
      if (!dados || !economiaSetores) return null;

      return analisarJogo({
        dados,
        economiaSetores,
        valorEconomiaSetor,
      });
    } catch (err) {
      console.error("Erro na análise:", err);
      return null;
    }
  }, [dados, economiaSetores, valorEconomiaSetor]);

console.log("ANALISE:", analise);


  if (!analise) {
    return <div>Carregando análise...</div>;
  }

  return (
    <div>
      <h2>📊 Melhores ROI</h2>

      {(analise.melhoresROI || []).map((e, i) => (
        <div key={i}>
          {e?.nome || "??"} - {((e?.roi || 0) * 100).toFixed(2)}%
        </div>
      ))}

      <h2>💡 Melhores Compras</h2>

      {(analise.melhoresCompras || []).map((e, i) => (
        <div key={i}>
          {e?.nome || "??"} - score: {(e?.score || 0).toFixed(2)}
        </div>
      ))}
    </div>
  );
};