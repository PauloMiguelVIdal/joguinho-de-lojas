import { productsCatalog } from "./TablePrice";
import { CircleDollarSign, PauseCircle, ShoppingBag } from "lucide-react";

export default function BuildingSellCard({ edificio, onSelect, isSelling, setor,diasParaRenovar  }) {
  // Nas vendas, só nos interessa o "output" (o que está sendo vendido)
  const produtosVenda = new Set();
  edificio.formulas.forEach((f) => {
    if (f.produto) produtosVenda.add(f.produto);
  });

  const getImageUrl = (nomeArquivo) => `/imagens/${nomeArquivo}.png`;

  const setores = [
    { id: "agricultura", cor1: "#003816", cor4: "#4CAF50" },
    { id: "tecnologia", cor1: "#A64B00", cor4: "#FF8C42" },
    { id: "industria", cor1: "#1A1A1A", cor4: "#B3B3B3" },
    { id: "comercio", cor1: "#660000", cor4: "#FF4D4D" },
    { id: "imobiliario", cor1: "#000066", cor4: "#6666FF" },
    { id: "energia", cor1: "#665200", cor4: "#FFD966" },
  ];

  const setorInfo = setores.find((s) => s.id === setor) || setores[3];

  return (
    <div
      onClick={() => onSelect(edificio.edificioId)}
      style={{
        background: `linear-gradient(135deg, ${setorInfo.cor1} 0%, ${setorInfo.cor4} 100%)`,
      }}
      className="group relative p-3 rounded-2xl cursor-pointer hover:scale-[1.02] transition-all duration-300 shadow-lg border border-white/10 flex items-center gap-4 overflow-hidden"
    >
      <div className="w-[80px] h-[80px] bg-black/20 rounded-xl flex items-center justify-center shrink-0">
        <img
          className="w-[60px] h-[60px] object-contain drop-shadow-md"
          src={getImageUrl(edificio.nomeEdificio)}
          alt={edificio.nomeEdificio}
        />
      </div>

      <div className="flex-1">
        <h3 className="text-white font-bold text-lg leading-tight mb-1">
          {edificio.nomeEdificio}
        </h3>

        <div className="flex flex-wrap gap-1">
          {[...produtosVenda].map((id) => (
            <span key={id} className="bg-white/10 px-2 py-0.5 rounded text-xs text-white flex items-center gap-1">
              {productsCatalog[id]?.icon} {productsCatalog[id]?.nome}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 px-2">
        {diasParaRenovar !== null && (
          <span className="text-[9px] text-white/50 font-bold">
            🔄 {diasParaRenovar}d
          </span>
        )}
        {isSelling ? (
          <div className="bg-yellow-500/20 p-2 rounded-full animate-bounce">
            <CircleDollarSign size={24} className="text-yellow-400" />
          </div>
        ) : (
          <div className="bg-white/10 p-2 rounded-full">
            <ShoppingBag size={24} className="text-white/40" />
          </div>
        )}
      </div>
    </div>
  );
}