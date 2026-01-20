import { useGame } from "../components/GameContext";
import ProductionQueueCard from "./ProductionQueueCard";
import { FORMULAS_EDIFICIOS } from "./productionFormulasConfig";

export default function ProductionQueuePanel() {
  const { getSortedProductionQueue } = useGame();

  const productionQueue = getSortedProductionQueue();

  if (!productionQueue || productionQueue.length === 0) {
    return <div style={{ fontSize: 13 }}>Nenhuma produção em andamento</div>;
  }

  // 🔹 achatando todas as fórmulas de todos os edifícios
  const allFormulas = FORMULAS_EDIFICIOS.flatMap(
    edificio => edificio.formulas
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {productionQueue.map(prod => {
        const formula = allFormulas.find(
          f => f.id === prod.formulaId
        );

        if (!formula) {
          console.warn(
            "Fórmula não encontrada para produção:",
            prod.formulaId
          );
          return null;
        }

        return (
          <ProductionQueueCard
            key={prod.id}
            production={prod}
            formula={formula}
          />
        );
      })}
    </div>
  );
}
