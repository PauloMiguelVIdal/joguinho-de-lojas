import { useGame } from "../components/GameContext";
import ProductionQueueCard from "./ProductionQueueCard";
import { FARM_COW_FORMULAS } from "./productionFormulasConfig";

export default function ProductionQueuePanel() {
  const { productionQueue } = useGame();

  if (!productionQueue || productionQueue.length === 0) {
    return (
      <div style={{ opacity: 1, fontSize: 13 }}>
        Nenhuma produção em andamento
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {productionQueue.map(prod => {
        const formula = FARM_COW_FORMULAS.find(
          f => f.id === prod.formulaId
        );

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
