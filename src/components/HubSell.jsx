import { useState, useMemo, useContext } from "react";
import { SALES_EDIFICIOS } from "./salesFormulasConfig";
import BuildingSellCard from "./BuildSellCard";
import ManagerSellPanel from "./ManagerSellPanel";
import { useGame } from "./GameContext";
// import { CentraldeDadosContext } from "../centralDeDadosContext";
import { useCentralStore, EDIFICIOS_BASE_DINAMICOS, EDIFICIOS_FINAIS_DINAMICOS_INICIAL,LICENCAS_DINAMICAS_GLOBAIS } from "../stores/useCentralStore";
import {
  EDIFICIOS_FINAIS_ESTATICOS,
  LICENCAS_ESTATICAS,
  EDIFICIOS_BASE_ESTATICOS,
  LICENCAS_ESTATICAS_GLOBAIS,
} from "../stores/dadosEstáticos";


import {
  ShoppingBag,
  LayoutDashboard,
  Globe,
  Wheat,
  ShoppingCart,
  Cpu,
  Hammer,
  Zap,
  Home
} from "lucide-react";

export default function HubSell() {
  const [edificioSelecionado, setEdificioSelecionado] = useState(null);
  const [selectedSector, setSelectedSector] = useState("all");
  const { contratosEdificios } = useGame();
  // const { dados } = useContext(CentraldeDadosContext);
  const dia = useCentralStore((s) => s.dia);
  const sectors = [
    { id: "all", name: "Todos", icon: <Globe size={18} /> },
    { id: "agricultura", name: "Agricultura", icon: <Wheat size={18} /> },
    { id: "comercio", name: "Comércio", icon: <ShoppingCart size={18} /> },
    { id: "industria", name: "Indústria", icon: <Hammer size={18} /> },
    { id: "tecnologia", name: "Tecnologia", icon: <Cpu size={18} /> },
    { id: "imobiliario", name: "Imobiliário", icon: <Home size={18} /> },
    { id: "energia", name: "Energia", icon: <Zap size={18} /> },
  ];

 

const nomespossuidos = useMemo(() => {
  const setores = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];
  const nomes = new Set();

  setores.forEach(setor => {
    const dinamicos = edificiosFinais[setor]?.edificios || [];
    const estaticos = EDIFICIOS_FINAIS_ESTATICOS[setor]?.edificios || [];

    dinamicos.forEach((edDin, index) => {
      if ((edDin.quantidade ?? 0) <= 0) return;
      const edEst = estaticos[index];
      if (edEst?.nome) nomes.add(edEst.nome);
    });
  });

  return nomes;
}, [edificiosFinais]);

// substitui os dois useMemos antigos (buildingsArray + filteredBuildings)
const filteredBuildings = useMemo(() => {
  const possuidos = SALES_EDIFICIOS.filter(e =>
    nomespossuidos.has(e.nomeEdificio)
  );
  if (selectedSector === "all") return possuidos;
  return possuidos.filter(e => e.setor === selectedSector);
}, [selectedSector, nomespossuidos]);

  if (edificioSelecionado) {
    return (
      <ManagerSellPanel
        edificioId={edificioSelecionado}
        onBack={() => setEdificioSelecionado(null)}
      />
    );
  }

  return (
    <div className="h-[70vh] bg-[#6A00FF] rounded-[1rem]">
      <div className="w-full justify-between bg-white/10 backdrop-blur-xl border border-white/20 rounded-[1rem] shadow-2xl overflow-hidden flex flex-col h-full">

        {/* HEADER — espelhado do HubManagement */}
        <div className="px-8 py-6 border-b border-white/10 bg-white/5 shrink-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-[10px] md:text-xl font-bold text-white">
                  Hub de Vendas
                </h1>
                <p className="text-white/70 text-sm font-medium flex items-center gap-2">
                  <LayoutDashboard size={14} /> {filteredBuildings.length} Edifícios Ativos
                </p>
              </div>
            </div>

            {/* FILTRO — idêntico ao HubManagement */}
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

        {/* CONTEÚDO — grid 2 colunas igual ao HubManagement */}
        <div className="h-full overflow-y-auto p-6 scrollbar-custom">
          {filteredBuildings.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {filteredBuildings.map((edificio) => {
                const entrada = contratosEdificios[edificio.edificioId];
                const diasParaRenovar = entrada
                  ? Math.max(0, entrada.validadeAte - dia)
                  : null;

                return (
                  <BuildingSellCard
                    key={edificio.edificioId}
                    edificio={edificio}
                    onSelect={() => setEdificioSelecionado(edificio.edificioId)}
                    setor={edificio.setor}
                    isSelling={false}
                    diasParaRenovar={diasParaRenovar}
                  />
                );
              })}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-white/40 space-y-4">
              <ShoppingBag size={80} className="opacity-20" />
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

      </div>
    </div>
  );
}