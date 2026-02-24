import { useState, useMemo } from "react";
import { Plus, Minus, AlertCircle } from "lucide-react";
import { useGame } from "../components/GameContext";
import { useBuildingFromFormula } from "./useBuildingFromFormula";
import { productsCatalog } from "../components/TablePrice";
import { useSalesBuildingData } from "./salesContractsConfig";

export default function SellCard({ formula, edificio }) {
  const { stock, startProduction, productionQueue } = useGame();
  const [quantidade, setQuantidade] = useState(1);

  const {
    quantidadeAtiva,
    nivel,
    maxAcoesSimultaneas
  } = useSalesBuildingData(formula);

  const produtoInfo = productsCatalog[formula.produto];

  const producoesAtivas = useMemo(() => {
    if (!productionQueue) return 0;
    return productionQueue.filter(p =>
      p.formulaId === formula.id && p.status === "ativa"
    ).length;
  }, [productionQueue, formula.id]);

  // capacidade total baseada no prédio
  const capacidadeTotal =
    (edificio.capacidadePorEdificio || 0) *
    (edificio.multiplicadorNivel?.[nivel] || 1) *
    quantidadeAtiva;

  const estoqueProduto = stock[formula.produto] || 0;

  const maximo = Math.floor(
    Math.min(estoqueProduto, capacidadeTotal)
  );

  const podeIniciar =
    producoesAtivas < maxAcoesSimultaneas &&
    quantidade > 0 &&
    quantidade <= maximo;

  function iniciar() {
    if (!podeIniciar) return;

    startProduction({
      formula,
      quantidade,
      buildingCount: quantidadeAtiva
    });

    setQuantidade(1);
  }

  const ajustarQuantidade = (op) => {
    if (op === "aumentar" && quantidade < maximo) setQuantidade(q => q + 1);
    if (op === "diminuir" && quantidade > 1) setQuantidade(q => q - 1);
    if (op === "max") setQuantidade(maximo || 1);
  };

  const motivoBloqueio = (() => {
    if (producoesAtivas >= maxAcoesSimultaneas) return "Fila cheia";
    if (estoqueProduto === 0) return "Sem estoque";
    if (maximo === 0) return "Capacidade insuficiente";
    return null;
  })();

  return (
    <div className="p-5 flex flex-col h-[360px] bg-white/5 border border-white/10 rounded-[1.5rem] backdrop-blur-md">

      {/* Header */}
      <div className="mb-4">
        <h3 className="text-white font-black text-base uppercase tracking-tight">
          {produtoInfo?.nome}
        </h3>

        <div className="flex gap-4 mt-1 text-[11px] text-white/80">
          <span>Estoque: {estoqueProduto}</span>
          <span>Margem: {formula.margemBase}%</span>
        </div>
      </div>

      {/* Produto */}
      <div className="flex flex-col items-center justify-center mb-4 bg-black/20 rounded-xl p-4 border border-white/5">
        <span className="text-3xl">{produtoInfo?.icon}</span>
        <span className="text-[10px] text-white/50 uppercase font-bold mt-1">
          {produtoInfo?.nome}
        </span>
      </div>

      {/* Quantidade */}
      <div className="flex items-center justify-between bg-black/30 rounded-2xl p-2 mb-4 border border-white/5">
        <button
          onClick={() => ajustarQuantidade("diminuir")}
          className="p-2 text-white/50 hover:text-white"
        >
          <Minus size={18} />
        </button>

        <div className="flex flex-col items-center">
          <input
            type="number"
            value={quantidade}
            onChange={e =>
              setQuantidade(Math.max(1, Math.min(maximo, Number(e.target.value))))
            }
            className="bg-transparent text-white font-black text-2xl text-center w-20 focus:outline-none"
          />

          <button
            onClick={() => ajustarQuantidade("max")}
            className="text-[9px] text-white/30 hover:text-yellow-400 font-bold uppercase"
          >
            Máximo: {maximo}
          </button>
        </div>

        <button
          onClick={() => ajustarQuantidade("aumentar")}
          className="p-2 text-white/50 hover:text-white"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Botão */}
      <button
        onClick={iniciar}
        disabled={!podeIniciar}
        className={`
          w-full py-3 rounded-2xl font-bold text-xs uppercase tracking-[0.15em]
          flex items-center justify-center gap-2
          ${podeIniciar
            ? "bg-white text-black hover:bg-white/90"
            : "bg-white/5 text-white/20 cursor-not-allowed border border-white/5"}
        `}
      >
        {motivoBloqueio || "Vender"}
      </button>

      <p className="text-[8px] text-center text-white/20 mt-3 uppercase tracking-widest">
        Fila: {producoesAtivas}/{maxAcoesSimultaneas}
      </p>
    </div>
  );
}