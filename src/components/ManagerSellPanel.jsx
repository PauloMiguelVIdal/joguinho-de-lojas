import { useMemo } from "react";
import { useGame } from "./GameContext";
import { productsCatalog } from "./TablePrice";
import { SALES_EDIFICIOS } from "./salesFormulasConfig";
import SellCard from "./SellCard";
import { ArrowLeft, Box, Factory } from "lucide-react";

export default function ManagerSellPanel({ edificioId, onBack }) {
    const { stock } = useGame();

    const setores = [
        { id: "agricultura", cor1: "#003816", cor3: "#0C9123", cor4: "#4CAF50" },
        { id: "tecnologia", cor1: "#A64B00", cor3: "#FF6F00", cor4: "#FF8C42" },
        { id: "industria", cor1: "#1A1A1A", cor3: "#808080", cor4: "#B3B3B3" },
        { id: "comercio", cor1: "#660000", cor3: "#E60000", cor4: "#FF4D4D" },
        { id: "imobiliario", cor1: "#000066", cor3: "#3333CC", cor4: "#6666FF" },
        { id: "energia", cor1: "#665200", cor3: "#E6B800", cor4: "#FFD966" },
    ];

     const edificioConfig = SALES_EDIFICIOS[edificioId];

    const setorInfo = useMemo(() =>
        setores.find(s => s.id === edificioConfig?.setor) || setores[2]
        , [edificioConfig]);

    const getImageUrl = (nomeArquivo) => `/imagens/${nomeArquivo}.png`;

    const produtosEstoque = useMemo(() => {
        if (!edificioConfig) return [];

        const ids = new Set();

        edificioConfig.formulas.forEach(formula => {
            ids.add(formula.produto);
        });

        return Array.from(ids)
            .map(id => productsCatalog[id])
            .filter(Boolean);
    }, [edificioConfig]);




if (!edificioConfig) {
  return (
    <div className="p-6 text-center text-white">
      Edifício não encontrado: {edificioId}
    </div>
  );
}

    return (
        // Background dinâmico baseado no setor (cor1)
        <div
            style={{ backgroundColor: setorInfo.cor1 }}
            className="h-full p-4 animate-in fade-in duration-500 transition-colors rounded-xl "
        >
            <div className="max-w-6xl mx-auto flex flex-col gap-4">

                {/* HEADER / VOLTAR */}
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group w-fit"
                >
                    <ArrowLeft size={18} />
                    <span className="font-bold uppercase tracking-widest text-[10px]">Voltar ao Hub</span>
                </button>

                {/* HERO SECTION COMPACTO */}
                <div className="w-full flex gap-4">
                    <div
                        style={{ background: `linear-gradient(135deg, ${setorInfo.cor1} 0%, ${setorInfo.cor3} 100%)` }}
                        className="relative overflow-hidden rounded-3xl shadow-xl border border-white/10"
                    >
                        <div className="absolute inset-0 bg-black/10" />

                        <div className="relative p-4 md:p-6 flex items-center flex-col gap-6">
                            {/* Imagem Menor */}
                            <div className="flex justify-between w-full">

                                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-around border border-white/20 aspect-square">
                                    <img
                                        src={getImageUrl(edificioConfig.nomeEdificio)}
                                        alt={edificioConfig.nomeEdificio}
                                        className="w-10 h-10 object-contain drop-shadow-lg"
                                    />
                                </div>
                                <div className="inline-flex items-center text-white/80 text-[10px] font-bold uppercase tracking-tight mb-1">
                                    <Factory size={12} />
                                    {edificioConfig.setor}
                                </div>
                            </div>

                            <div>

                                <h1 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase">
                                    {edificioConfig.nomeEdificio}
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* ESTOQUE OBSERVADO (AGORA NA BASE E LARGURA TOTAL) */}
                    <div className="mt-2 space-y-3">
                        <div className="flex items-center gap-2 text-white/60 ml-2">
                            <Box size={16} />
                            <h2 className="font-bold uppercase tracking-widest text-[10px]">Estoque do Edifício</h2>
                        </div>

                        <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-[1.5rem] p-3">
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                                {produtosEstoque.map(produto => (
                                    <div
                                        key={produto.id}
                                        className="bg-white/5 border border-white/5 p-2 rounded-xl flex flex-col items-center justify-center text-center"
                                    >
                                        <span className="text-xl mb-0.5">{produto.icon}</span>
                                        <span className="text-[8px] text-white/40 font-bold uppercase truncate w-full px-1">
                                            {produto.nome}
                                        </span>
                                        <div className="text-white font-bold text-sm">
                                            {stock[produto.id] || 0}
                                            <span className="text-[9px] ml-0.5 text-white/50">{produto.unidade}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


                {/* LINHAS DE PRODUÇÃO (AGORA EM CIMA E LARGURA TOTAL) */}
                <div className="space-y-3">
                    {/* Título - Fica fixo fora da área de rolagem */}
                    <div className="flex items-center gap-2 text-white/60 ml-2">
                        <Factory size={16} />
                        <h2 className="font-bold uppercase tracking-widest text-[10px]">Contratos Disponíveis</h2>
                    </div>

                    {/* Container com Scroll - Apenas os cards rolam */}
                    <div className="h-[450px] overflow-y-auto pr-2 scrollbar-custom">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {edificioConfig.formulas.map(formula => (
                                <div key={formula.id} className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[1.5rem] overflow-hidden h-full">
                                    <SellCard
                                        formula={formula}
                                        edificio={edificioConfig}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}