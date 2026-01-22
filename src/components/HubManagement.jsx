import { useState, useMemo } from "react";
import { FORMULAS_EDIFICIOS } from "./productionFormulasConfig";
import BuildingCard from "./BuildingCard";
import ManagerPanelInterface from "./ManagerPanelInterface";
import { 
  Factory, 
  LayoutDashboard, 
  Globe, 
  Wheat, 
  ShoppingCart, 
  Cpu, 
  Hammer, 
  Zap, 
  Home 
} from "lucide-react";

export default function HubManagement() {
  const [edificioSelecionado, setEdificioSelecionado] = useState(null);
  const [selectedSector, setSelectedSector] = useState("all");

  const brand = {
    cor1: "#350973", // Roxo Profundo
    cor2: "#6411D9", // Violeta Médio
    cor3: "#6A00FF", // Roxo Elétrico (Base do seu app)
  };

  const sectors = [
    { id: "all", name: "Todos", icon: <Globe size={18} /> },
    { id: "agricultura", name: "Agricultura", icon: <Wheat size={18} /> },
    { id: "comercio", name: "Comércio", icon: <ShoppingCart size={18} /> },
    { id: "industria", name: "Indústria", icon: <Hammer size={18} /> },
    { id: "tecnologia", name: "Tecnologia", icon: <Cpu size={18} /> },
    { id: "imobiliario", name: "Imobiliário", icon: <Home size={18} /> },
    { id: "energia", name: "Energia", icon: <Zap size={18} /> },
  ];

  const filteredBuildings = useMemo(() => {
    if (selectedSector === "all") return FORMULAS_EDIFICIOS;
    return FORMULAS_EDIFICIOS.filter((e) => e.setor === selectedSector);
  }, [selectedSector]);

  if (edificioSelecionado) {
    return (
      <ManagerPanelInterface 
        edificioId={edificioSelecionado} 
        onBack={() => setEdificioSelecionado(null)} 
      />
    );
  }

  return (
    // Fundo alinhado com o roxo vibrante da sua interface
    <div className="min-h-screen bg-[#6A00FF] p-4 md:p-8">
      
      {/* Container Principal: Glassmorphism Claro e Sóbrio */}
      <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col h-[85vh]">
        
        {/* HEADER: Limpo e Profissional */}
        <div className="px-8 py-6 border-b border-white/10 bg-white/5 shrink-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl border border-white/30 text-white shadow-sm">
                <Factory size={32} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Hub de Produção
                </h1>
                <p className="text-white/70 text-sm font-medium flex items-center gap-2">
                  <LayoutDashboard size={14} /> {filteredBuildings.length} Edifícios Ativos
                </p>
              </div>
            </div>

            {/* SELETOR DE SETORES (FILTRO) */}
            <div className="flex flex-wrap gap-2 p-1 bg-black/5 rounded-2xl border border-white/10">
              {sectors.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSector(s.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200
                    ${selectedSector === s.id 
                      ? "bg-white text-[#350973] shadow-md scale-105" 
                      : "text-white/60 hover:text-white hover:bg-white/10"}
                  `}
                >
                  {s.icon}
                  <span className="hidden sm:inline">{s.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ÁREA DE CONTEÚDO */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {filteredBuildings.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {filteredBuildings.map((edificio) => (
                <BuildingCard
                  key={edificio.edificioId}
                  edificio={edificio}
                  onSelect={setEdificioSelecionado}
                  setor={edificio.setor}
                  isProducing={false}
                />
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-white/40 space-y-4">
              <Factory size={80} className="opacity-20" />
              <p className="text-lg font-medium">Nenhum edifício neste setor.</p>
              <button 
                onClick={() => setSelectedSector("all")}
                className="text-white hover:underline font-bold text-sm tracking-widest uppercase"
              >
                Resetar Filtros
              </button>
            </div>
          )}
        </div>

        {/* FOOTER: Minimalista */}
        <div className="px-8 py-4 bg-black/5 border-t border-white/10 flex justify-between items-center shrink-0">
          <div className="flex gap-6">
            <div className="flex flex-col border-l border-white/30 pl-3">
              <span className="text-[10px] text-white/50 uppercase font-black tracking-widest">Setor Selecionado</span>
              <span className="text-sm text-white font-bold capitalize">{selectedSector}</span>
            </div>
          </div>
          
          <div className="text-right">
            <span className="text-[10px] text-white/50 uppercase font-black tracking-widest block mb-1">Status Global</span>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white">
              <span className="w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_#4ade80]"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Operacional</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}