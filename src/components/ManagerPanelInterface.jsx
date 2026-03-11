import { useMemo } from "react";
import { useGame } from "./GameContext";
import { productsCatalog } from "./TablePrice";
import { FORMULAS_EDIFICIOS } from "./productionFormulasConfig";
import { useBuildingFromFormula } from "./useBuildingFromFormula";
import ProductionCard from "./ProductionCard";
import { ArrowLeft, Box, Factory, Layers, TrendingUp, Zap } from "lucide-react";

function BuildingHeader({ edificioConfig, setorInfo, stock }) {
  const { quantidadeAtiva, nivel, maxAcoesSimultaneas } = useBuildingFromFormula(
    edificioConfig.formulas[0]
  );

  const nivelLabel = ["", "Básico", "Avançado", "Elite"][nivel] || "Básico";
  const nivelColor = nivel === 3 ? "text-yellow-400" : nivel === 2 ? "text-blue-400" : "text-white/60";
  const getImageUrl = (nome) => `/imagens/${nome}.png`;

  const produtosEstoque = useMemo(() => {
    const ids = new Set();
    edificioConfig.formulas.forEach(f => {
      Object.keys(f.input  || {}).forEach(id => ids.add(id));
      Object.keys(f.output || {}).forEach(id => ids.add(id));
    });
    return Array.from(ids).map(id => productsCatalog[id]).filter(Boolean);
  }, [edificioConfig]);

  return (
    <div className="flex gap-3" style={{ minHeight: "190px" }}>

      {/* ESQUERDA */}
      <div
        style={{ background: `linear-gradient(135deg, ${setorInfo.cor1} 0%, ${setorInfo.cor3} 100%)` }}
        className="w-2/5 shrink-0 rounded-2xl border border-white/10 p-4 flex flex-col gap-3"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-black/30 flex items-center justify-center shrink-0 border border-white/10">
            <img
              src={getImageUrl(edificioConfig.nomeEdificio)}
              alt={edificioConfig.nomeEdificio}
              className="w-9 h-9 object-contain drop-shadow"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1 mb-0.5">
              <Factory size={9} className="text-white/30 shrink-0" />
              <span className="text-[8px] text-white/30 font-black uppercase tracking-widest truncate">
                {edificioConfig.setor}
              </span>
            </div>
            <h1 className="text-sm font-black text-white uppercase tracking-tight leading-tight">
              {edificioConfig.nomeEdificio}
            </h1>
            <p className="text-[8px] text-white/30 mt-0.5">
              {edificioConfig.formulas.length} linha{edificioConfig.formulas.length > 1 ? "s" : ""} de produção
            </p>
          </div>
        </div>

        {/* stats */}
        <div className="flex gap-2 mt-auto">
          <div className="flex-1 bg-black/25 rounded-xl px-2 py-2 flex flex-col items-center">
            <div className="flex items-center gap-1 mb-1">
              <Layers size={9} className="text-white/30" />
              <span className="text-[7px] font-black uppercase tracking-widest text-white/30">Qtd</span>
            </div>
            <span style={{ color: setorInfo.cor4 }} className="text-3xl font-black leading-none">
              {quantidadeAtiva}
            </span>
            <span className="text-[7px] text-white/20 mt-0.5">edifícios</span>
          </div>

          <div className="flex-1 bg-black/25 rounded-xl px-2 py-2 flex flex-col items-center">
            <div className="flex items-center gap-1 mb-1">
              <TrendingUp size={9} className="text-white/30" />
              <span className="text-[7px] font-black uppercase tracking-widest text-white/30">Nível</span>
            </div>
            <span className={`text-3xl font-black leading-none ${nivelColor}`}>{nivel}</span>
            <span className={`text-[7px] mt-0.5 ${nivelColor} opacity-60`}>{nivelLabel}</span>
          </div>

          <div className="flex-1 bg-black/25 rounded-xl px-2 py-2 flex flex-col items-center">
            <div className="flex items-center gap-1 mb-1">
              <Zap size={9} className="text-white/30" />
              <span className="text-[7px] font-black uppercase tracking-widest text-white/30">Cap</span>
            </div>
            <span className="text-3xl font-black leading-none text-emerald-400">{maxAcoesSimultaneas}</span>
            <span className="text-[7px] text-white/20 mt-0.5">ações</span>
          </div>
        </div>
      </div>

      {/* DIREITA — estoque */}
      <div className="flex-1 bg-black/20 border border-white/10 rounded-2xl p-3 flex flex-col gap-2 min-w-0">
        <div className="flex items-center gap-1.5 text-white/30">
          <Box size={11} />
          <span className="text-[8px] font-black uppercase tracking-widest">Estoque do Edifício</span>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-custom max-h-[130px]">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {produtosEstoque.map(produto => (
              <div
                key={produto.id}
                className="bg-white/5 border border-white/5 p-2 rounded-xl flex flex-col items-center text-center"
              >
                <span className="text-xl leading-none mb-1">{produto.icon}</span>
                <span className="text-[8px] text-white/40 font-bold uppercase truncate w-full leading-tight mb-0.5">
                  {produto.nome}
                </span>
                <div className="text-white font-black text-sm leading-none">
                  {stock[produto.id] || 0}
                  <span className="text-[8px] ml-0.5 text-white/30 font-medium">{produto.unidade}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
export default function ManagerPanelInterface({ edificioId, onBack }) {
  const { stock } = useGame();

  const setores = [
    { id: "agricultura", cor1: "#003816", cor3: "#0C9123", cor4: "#4CAF50" },
    { id: "tecnologia",  cor1: "#A64B00", cor3: "#FF6F00", cor4: "#FF8C42" },
    { id: "industria",   cor1: "#1A1A1A", cor3: "#808080", cor4: "#B3B3B3" },
    { id: "comercio",    cor1: "#660000", cor3: "#E60000", cor4: "#FF4D4D" },
    { id: "imobiliario", cor1: "#000066", cor3: "#3333CC", cor4: "#6666FF" },
    { id: "energia",     cor1: "#665200", cor3: "#E6B800", cor4: "#FFD966" },
  ];

  const edificioConfig = useMemo(
    () => FORMULAS_EDIFICIOS.find(e => e.edificioId === edificioId),
    [edificioId]
  );

  const setorInfo = useMemo(
    () => setores.find(s => s.id === edificioConfig?.setor) || setores[2],
    [edificioConfig]
  );

  if (!edificioConfig) return (
    <div className="p-6 text-center text-white">Edifício não encontrado</div>
  );

  return (
    <div
      style={{ backgroundColor: setorInfo.cor1 }}
      className="h-full p-4 animate-in fade-in duration-500 rounded-xl overflow-y-auto scrollbar-custom"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-4">

        {/* VOLTAR */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors w-fit group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          <span className="font-black uppercase tracking-widest text-[9px]">Voltar ao Hub</span>
        </button>

        {/* HEADER */}
        <BuildingHeader
          edificioConfig={edificioConfig}
          setorInfo={setorInfo}
          stock={stock}
        />

        {/* LINHAS DE PRODUÇÃO */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-white/30 ml-1">
            <Factory size={11} />
            <h2 className="font-black uppercase tracking-widest text-[8px]">Linhas de Produção</h2>
          </div>

          {/* scroll customizado só nos cards */}
          <div className="h-[500px] overflow-y-auto pr-2 scrollbar-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {edificioConfig.formulas.map(formula => (
                <div
                  key={formula.id}
                  className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[1.5rem] overflow-hidden"
                >
                  <ProductionCard formula={formula} />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}