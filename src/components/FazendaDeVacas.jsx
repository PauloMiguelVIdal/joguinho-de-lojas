import ProductionCard from "../components/ProductionCard";
import { FORMULAS_EDIFICIOS } from "./productionFormulasConfig";
import { useGame } from "../components/GameContext";

export default function FazendaVacasPanel() {
  const { stock } = useGame();

  const fazendaConfig = FORMULAS_EDIFICIOS.find(
    e => e.edificioId === "fazendaVacas"
  );

  const produtosEstoque = [
    { key: "vaca", nome: "Vacas", emoji: "🐄" },
    { key: "racaoDeVacas", nome: "Ração", emoji: "🌾" },
    { key: "couro", nome: "Couro", emoji: "🦌" },
    { key: "carneBovina", nome: "Carne", emoji: "🥩" },
  ];

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center mb-6">
        🐄 Fazenda de Vacas
      </h1>

      {/* Estoque */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {produtosEstoque.map(p => (
          <div key={p.key} className="bg-gray-100 p-3 rounded text-center">
            <div className="text-2xl">{p.emoji}</div>
            <div className="text-xs">{p.nome}</div>
            <div className="font-bold">{stock[p.key] || 0}</div>
          </div>
        ))}
      </div>

      {/* Produções */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fazendaConfig.formulas.map(formula => (
          <ProductionCard key={formula.id} formula={formula} />
        ))}
      </div>
    </div>
  );
}
