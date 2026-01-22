import { productsCatalog } from "./TablePrice";
import { Play, PauseCircle, ArrowRight } from "lucide-react"; // Importando Lucide

export default function BuildingCard({ edificio, onSelect, isProducing, setor }) {
  const produtosEntrada = new Set();
  const produtosSaida = new Set();

  edificio.formulas.forEach((f) => {
    Object.keys(f.input || {}).forEach((id) => produtosEntrada.add(id));
    Object.keys(f.output || {}).forEach((id) => produtosSaida.add(id));
  });

  const getImageUrl = (nomeArquivo) => `/imagens/${nomeArquivo}.png`;

  const setores = [
    {
      id: "agricultura",
      cor1: "#003816",
      cor3: "#0C9123",
      cor4: "#4CAF50",
    },
    {
      id: "tecnologia",
      cor1: "#A64B00",
      cor3: "#FF6F00",
      cor4: "#FF8C42",
    },
    {
      id: "industria",
      cor1: "#1A1A1A",
      cor3: "#808080",
      cor4: "#B3B3B3",
    },
    {
      id: "comercio",
      cor1: "#660000",
      cor3: "#E60000",
      cor4: "#FF4D4D",
    },
    {
      id: "imobiliario",
      cor1: "#000066",
      cor3: "#3333CC",
      cor4: "#6666FF",
    },
    {
      id: "energia",
      cor1: "#665200",
      cor3: "#E6B800",
      cor4: "#FFD966",
    },
    {
      id: "grafico",
      cor1: "#6A00FF",
      cor3: "#6A00FF",
      cor4: "#6A00FF",
    },
  ];

  const setorInfo = setores.find((s) => s.id === setor) || setores[2]; // fallback para industria se não achar

  return (
    <div
      onClick={() => onSelect(edificio.edificioId)}
      style={{
        background: `linear-gradient(135deg, ${setorInfo.cor1} 0%, ${setorInfo.cor4} 100%)`,
      }}
      className="group relative p-3 rounded-2xl cursor-pointer hover:scale-[1.02] transition-all duration-300 shadow-lg border border-white/10 flex items-center gap-4 overflow-hidden"
    >
      {/* Container da Imagem: 100x100 */}
      <div
        style={{
          background: `linear-gradient(135deg, ${setorInfo.cor3} 0%, ${setorInfo.cor1} 100%)`,
        }}
        className="w-[100px] h-[100px] rounded-xl flex items-center justify-center shadow-inner shrink-0"
      >
        {/* Imagem: 70px */}
        <img
          className="w-[70px] h-[70px] object-contain drop-shadow-md"
          src={getImageUrl(edificio.nomeEdificio)}
          alt={edificio.nomeEdificio}
        />
      </div>

      {/* Informações */}
      <div className="flex-1 flex flex-col justify-center">
        <h3 className="text-white font-bold text-lg leading-tight mb-1 drop-shadow-sm">
          {edificio.nomeEdificio}
        </h3>

        {/* Fluxo de Produção */}
        <div className="flex items-center gap-2 bg-black/20 self-start px-2 py-1 rounded-lg backdrop-blur-sm">
          <div className="flex gap-1">
            {[...produtosEntrada].map((id) => (
              <span key={id} className="text-base" title={productsCatalog[id]?.nome}>
                {productsCatalog[id]?.icon}
              </span>
            ))}
          </div>
          
          <ArrowRight size={14} className="text-white/50" />
          
          <div className="flex gap-1">
            {[...produtosSaida].map((id) => (
              <span key={id} className="text-base" title={productsCatalog[id]?.nome}>
                {productsCatalog[id]?.icon}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Status com Lucide */}
      <div className="flex flex-col items-center gap-1 pr-2">
        {isProducing ? (
          <>
            <div className="bg-green-500/20 p-2 rounded-full animate-pulse">
              <Play size={20} className="text-green-400 fill-green-400" />
            </div>
            <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">Ativo</span>
          </>
        ) : (
          <>
            <div className="bg-white/10 p-2 rounded-full">
              <PauseCircle size={20} className="text-white/60" />
            </div>
            <span className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Ocioso</span>
          </>
        )}
      </div>

      {/* Efeito de brilho no hover */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}