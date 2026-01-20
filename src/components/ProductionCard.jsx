import { useState, useMemo } from "react";
import { Plus, Minus } from "lucide-react";
import { useGame } from "../components/GameContext";
import { useBuildingFromFormula } from "./useBuildingFromFormula";

export default function ProductionCard({ formula }) {
  const {
    stock,
    startProduction,
    productionQueue
  } = useGame();

  const [quantidade, setQuantidade] = useState(1);

  const {
    quantidadeAtiva,
    nivel,
    maxAcoesSimultaneas,
    edificio
  } = useBuildingFromFormula(formula);

  /* ============================
     PRODUÇÕES ATIVAS DO EDIFÍCIO
  ============================ */
  const producoesAtivas = useMemo(() => {
    if (!productionQueue || !edificio) return 0;

    return productionQueue.filter(p =>
      p.formulaId === formula.id &&
      p.status === "ativa"
    ).length;
  }, [productionQueue, formula.id, edificio]);

  /* ============================
     CÁLCULO DE LIMITE
  ============================ */
  const calcularMaximo = () => {
    if (!quantidadeAtiva) return 0;

    const limiteEstoque = Math.min(
      ...Object.entries(formula.input).map(
        ([produto, qtd]) =>
          Math.floor((stock[produto] || 0) / qtd)
      )
    );

    const limiteEstrutural =
      (formula.capacidadePorEdificio || 0) *
      quantidadeAtiva;

    return Math.max(
      0,
      Math.min(limiteEstoque, limiteEstrutural)
    );
  };

  const maximo = calcularMaximo();

const podeIniciar =
  producoesAtivas < maxAcoesSimultaneas &&
  maximo >= quantidade;


  /* ============================
     AÇÕES
  ============================ */
function iniciar() {
  if (!podeIniciar) return;

  startProduction({
    formula, // ✅ AGORA EXISTE
    quantidade,
    buildingCount: quantidadeAtiva,
  });

  setQuantidade(1);
}


  const ajustarQuantidade = (op) => {
    if (op === "aumentar" && quantidade < maximo) {
      setQuantidade(q => q + 1);
    }
    if (op === "diminuir" && quantidade > 1) {
      setQuantidade(q => q - 1);
    }
    if (op === "max") {
      setQuantidade(maximo);
    }
  };

  /* ============================
     UI HELPERS
  ============================ */
  const getIcone = () => {
    if (formula.id.includes("reproducao")) return "🐄";
    if (formula.id.includes("abate")) return "🥩";
    return "⚙️";
  };

  const getCor = () => {
    if (formula.id.includes("reproducao")) return "#CD853F";
    if (formula.id.includes("abate")) return "#DC2626";
    return "#3B82F6";
  };

  const formatarNome = (p) =>
  ({
    vaca: "Vaca",
    racaoDeVacas: "Ração",
    couro: "Couro",
    carneBovina: "Carne Bovina",
  }[p] || p);

  const emoji = {
    vaca: "🐄",
    racaoDeVacas: "🌾",
    couro: "🦌",
    carneBovina: "🥩",
  };

  const motivoBloqueio = (() => {
    if (producoesAtivas >= maxAcoesSimultaneas) return "Limite de ações simultâneas atingido";
    if (maximo === 0) return "Recursos insuficientes";
    return null;
  })();


  /* ============================
     RENDER
  ============================ */
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-center mb-4">
        {getIcone()} {formula.nome}
      </h3>

      <div className="text-xs text-gray-500 text-center">
        Estrutura ativa:{" "}
        <strong>
          {quantidadeAtiva} Edifício(s) · Nível {nivel}
        </strong>
      </div>

      <p className="text-xs text-center text-gray-500 mb-3">
        Produções ativas: {producoesAtivas} / {maxAcoesSimultaneas}
      </p>


      {/* Quantidade */}
      <div className="flex justify-center items-center gap-3 mb-4">
        <button onClick={() => ajustarQuantidade("diminuir")}>
          <Minus />
        </button>

        <input
          type="number"
          value={quantidade}
          min={1}
          max={maximo}
          onChange={e =>
            setQuantidade(
              Math.max(1, Math.min(maximo, Number(e.target.value)))
            )
          }
          className={`w-24 text-4xl font-bold text-center border-2 rounded-lg focus:outline-none
  ${quantidade === maximo
              ? "border-yellow-500 text-yellow-600"
              : "border-gray-300 text-gray-800 focus:border-blue-500"}
`}

        />


        <button onClick={() => ajustarQuantidade("aumentar")}>
          <Plus />
        </button>
      </div>

      <button
        onClick={iniciar}
        disabled={!podeIniciar}
        className="w-full py-3 rounded-lg font-bold text-white transition-colors"
        style={{
          backgroundColor: podeIniciar ? getCor() : '#6C757D',
          cursor: podeIniciar ? 'pointer' : 'not-allowed'
        }}
      >
        {motivoBloqueio
          ? `❌ ${motivoBloqueio}`
          : `${getIcone()} Iniciar Produção`}
      </button>
          <div className="text-xs text-gray-400 mt-1">
            Limite estrutural: {maxAcoesSimultaneas} ação(ões) simultânea(s)
          </div>

    </div>
  );
}
