import ProductionCard from "../components/ProductionCard";
import { FARM_COW_FORMULAS } from "./productionFormulasConfig";
import { useGame } from "../components/GameContext";

export default function FazendaVacasPanel() {
  const { stock } = useGame();

  // Definir produtos relevantes para esta fazenda
  const produtosEstoque = [
    { key: 'vaca', nome: 'Vacas', emoji: '🐄' },
    { key: 'racaoDeVacas', nome: 'Ração', emoji: '🌾' },
    { key: 'couro', nome: 'Couro (kg)', emoji: '🦌' },
    { key: 'carneBovina', nome: 'Carne (kg)', emoji: '🥩' }
  ];

  return (
    <div 
      className="min-h-screen p-6"
      style={{ background: 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🐄 Fazenda de Vacas
          </h1>
          <p className="text-white/80">Gerencie sua produção pecuária</p>
        </div>

        {/* Estoque Resumido */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {produtosEstoque.map(produto => (
            <div 
              key={produto.key}
              className="bg-white/20 rounded-lg p-4 text-center text-white hover:bg-white/30 transition-colors"
            >
              <div className="text-2xl mb-1">{produto.emoji}</div>
              <div className="text-xs opacity-80 mb-1">{produto.nome}</div>
              <div className="text-2xl font-bold">
                {stock[produto.key] || 0}
              </div>
            </div>
          ))}
        </div>

        {/* Cards de Produção */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FARM_COW_FORMULAS.map(formula => (
            <ProductionCard
              key={formula.id}
              formula={formula}
            />
          ))}
        </div>
      </div>
    </div>
  );
}