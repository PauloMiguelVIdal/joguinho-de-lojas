import { useState, useMemo } from "react";
import { Plus, Minus, AlertCircle, ArrowRight } from "lucide-react";
import { useGame } from "../components/GameContext";
import { useBuildingFromFormula } from "./useBuildingFromFormula";
import { productsCatalog } from "../components/TablePrice"; // Importado para os ícones

export default function ProductionCard({ formula }) {
  const { stock, startProduction, productionQueue } = useGame();
  const [quantidade, setQuantidade] = useState(1);

  const {
    quantidadeAtiva,
    nivel,
    maxAcoesSimultaneas,
    edificio
  } = useBuildingFromFormula(formula);

  const producoesAtivas = useMemo(() => {
    if (!productionQueue || !edificio) return 0;
    return productionQueue.filter(p =>
      p.formulaId === formula.id && p.status === "ativa"
    ).length;
  }, [productionQueue, formula.id, edificio]);

  const calcularMaximo = () => {
    if (!quantidadeAtiva) return 0;
    const limiteEstoque = Math.min(
      ...Object.entries(formula.input).map(
        ([produto, qtd]) => Math.floor((stock[produto] || 0) / qtd)
      )
    );
    const limiteEstrutural = (formula.capacidadePorEdificio || 0) * quantidadeAtiva;
    return Math.max(0, Math.min(limiteEstoque, limiteEstrutural));
  };

  const maximo = calcularMaximo();
  const podeIniciar = producoesAtivas < maxAcoesSimultaneas && maximo >= quantidade;

  function iniciar() {
    if (!podeIniciar) return;
    startProduction({ formula, quantidade, buildingCount: quantidadeAtiva });
    setQuantidade(1);
  }

  const ajustarQuantidade = (op) => {
    if (op === "aumentar" && quantidade < maximo) setQuantidade(q => q + 1);
    if (op === "diminuir" && quantidade > 1) setQuantidade(q => q - 1);
    if (op === "max") setQuantidade(maximo);
  };

  const motivoBloqueio = (() => {
    if (producoesAtivas >= maxAcoesSimultaneas) return "Fila Cheia";
    if (maximo === 0) return "Recursos Insuficientes";
    return null;
  })();

  return (
    <div className="p-5 flex flex-col h-full bg-white/5 border border-white/10 rounded-[1.5rem] backdrop-blur-md">
      
      {/* HEADER: NOME E ESTRUTURA */}
      <div className="mb-4">
        <h3 className="text-white font-black text-base uppercase tracking-tight">
          {formula.nome}
        </h3>
        <div className="flex gap-4 mt-1">
          <div className="flex flex-col">
            <span className="text-[8px] text-white/40 uppercase font-bold tracking-widest">Estrutura</span>
            <span className="text-[11px] text-white/90 font-medium">Qtd: {quantidadeAtiva} • Nív: {nivel}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] text-white/40 uppercase font-bold tracking-widest">Fila</span>
            <span className="text-[11px] text-white/90 font-medium">{producoesAtivas} / {maxAcoesSimultaneas}</span>
          </div>
        </div>
      </div>

      {/* SEÇÃO DE INSUMOS (CONSUMO) */}
      <div className="mb-4 bg-black/20 rounded-xl p-3 border border-white/5">
        <span className="text-[8px] text-white/30 uppercase font-black tracking-[0.2em] block mb-2">
          Consumo Total para {quantidade}x
        </span>
        <div className="grid grid-cols-1 gap-2">
          {Object.entries(formula.input).map(([id, qtdUnitária]) => {
            const produto = productsCatalog[id];
            const totalNecessario = qtdUnitária * quantidade;
            const temEstoque = (stock[id] || 0) >= totalNecessario;

            return (
              <div key={id} className="flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{produto?.icon}</span>
                  <span className="text-white/70 font-bold uppercase">{produto?.nome}</span>
                </div>
                <div className={`font-black ${temEstoque ? 'text-white' : 'text-red-500'}`}>
                  {totalNecessario} <span className="text-white/30 font-medium">{produto?.unidade}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SELETOR DE QUANTIDADE */}
      <div className="flex items-center justify-between bg-black/30 rounded-2xl p-2 mb-4 border border-white/5">
        <button 
          onClick={() => ajustarQuantidade("diminuir")}
          className="p-2 text-white/50 hover:text-white transition-colors"
        >
          <Minus size={18} />
        </button>

        <div className="flex flex-col items-center">
          <input
            type="number"
            value={quantidade}
            onChange={e => setQuantidade(Math.max(1, Math.min(maximo, Number(e.target.value))))}
            className="bg-transparent text-white font-black text-2xl text-center w-20 focus:outline-none"
          />
          <button 
            onClick={() => ajustarQuantidade("max")}
            className="text-[9px] text-white/30 hover:text-yellow-400 font-bold uppercase tracking-widest transition-colors"
          >
            Máximo: {maximo}
          </button>
        </div>

        <button 
          onClick={() => ajustarQuantidade("aumentar")}
          className="p-2 text-white/50 hover:text-white transition-colors"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* BOTÃO DE AÇÃO */}
      <button
        onClick={iniciar}
        disabled={!podeIniciar}
        className={`
          w-full py-3 rounded-2xl font-bold text-xs uppercase tracking-[0.15em] transition-all duration-300
          flex items-center justify-center gap-2
          ${podeIniciar 
            ? "bg-white text-black hover:bg-white/90 shadow-lg" 
            : "bg-white/5 text-white/20 cursor-not-allowed border border-white/5"}
        `}
      >
        {motivoBloqueio ? (
          <><AlertCircle size={14} /> {motivoBloqueio}</>
        ) : (
          "Iniciar Produção"
        )}
      </button>

      <p className="text-[8px] text-center text-white/20 mt-3 font-medium uppercase tracking-widest">
        Capacidade: {maxAcoesSimultaneas} ações simultâneas
      </p>
    </div>
  );
}