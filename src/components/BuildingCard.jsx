import { productsCatalog } from "./TablePrice";
import { Play, PauseCircle, ArrowRight } from "lucide-react";

export default function BuildingCard({ edificio, onSelect, isProducing, setor }) {
  const produtosEntrada = new Set();
  const produtosSaida = new Set();

  edificio.formulas.forEach((f) => {
    Object.keys(f.input || {}).forEach((id) => produtosEntrada.add(id));
    Object.keys(f.output || {}).forEach((id) => produtosSaida.add(id));
  });

  const getImageUrl = (nomeArquivo) => `/imagens/${nomeArquivo}.png`;

  const setores = [
    { id: "agricultura", cor1: "#003816", cor3: "#0C9123", cor4: "#4CAF50" },
    { id: "tecnologia",  cor1: "#A64B00", cor3: "#FF6F00", cor4: "#FF8C42" },
    { id: "industria",   cor1: "#1A1A1A", cor3: "#808080", cor4: "#B3B3B3" },
    { id: "comercio",    cor1: "#660000", cor3: "#E60000", cor4: "#FF4D4D" },
    { id: "imobiliario", cor1: "#000066", cor3: "#3333CC", cor4: "#6666FF" },
    { id: "energia",     cor1: "#665200", cor3: "#E6B800", cor4: "#FFD966" },
    { id: "grafico",     cor1: "#6A00FF", cor3: "#6A00FF", cor4: "#6A00FF" },
  ];

  const setorInfo = setores.find((s) => s.id === setor) || setores[2];

  const entradaArr = [...produtosEntrada];
  const saidaArr   = [...produtosSaida];

  return (
    <div
      onClick={() => onSelect(edificio.edificioId)}
      style={{
        background: `linear-gradient(135deg, ${setorInfo.cor1} 0%, ${setorInfo.cor4} 100%)`,
      }}
      className="group relative p-3 rounded-2xl cursor-pointer hover:scale-[1.02] transition-all duration-300 shadow-lg border border-white/10 overflow-hidden"
    >
      <div className="flex items-center gap-3">

        {/* Imagem */}
        <div
          style={{
            background: `linear-gradient(135deg, ${setorInfo.cor3} 0%, ${setorInfo.cor1} 100%)`,
          }}
          className="w-[72px] h-[72px] rounded-xl flex items-center justify-center shadow-inner shrink-0"
        >
          <img
            className="w-[52px] h-[52px] object-contain drop-shadow-md"
            src={getImageUrl(edificio.nomeEdificio)}
            alt={edificio.nomeEdificio}
          />
        </div>

        {/* Nome + Status */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-sm leading-tight mb-1 truncate drop-shadow-sm">
            {edificio.nomeEdificio}
          </h3>

          {isProducing ? (
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[9px] font-bold text-green-400 uppercase tracking-wider">Ativo</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-wider">Ocioso</span>
            </div>
          )}
        </div>

      </div>

      {/* Fluxo — separado abaixo, ocupa largura total */}
      <div className="mt-2.5 flex items-start gap-2">

        {/* ENTRADA */}
        <div className="flex-1 bg-black/20 rounded-lg p-1.5 backdrop-blur-sm">
          <p className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-1">Entrada</p>
          <div className="flex flex-wrap gap-1">
            {entradaArr.length > 0 ? entradaArr.map((id) => (
              <span
                key={id}
                className="text-sm leading-none"
                title={productsCatalog[id]?.nome}
              >
                {productsCatalog[id]?.icon}
              </span>
            )) : (
              <span className="text-[8px] text-white/20 italic">—</span>
            )}
          </div>
        </div>

        {/* Seta */}
        <div className="flex items-center pt-4 shrink-0">
          <ArrowRight size={12} className="text-white/30" />
        </div>

        {/* SAÍDA */}
        <div className="flex-1 bg-black/20 rounded-lg p-1.5 backdrop-blur-sm">
          <p className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-1">Saída</p>
          <div className="flex flex-wrap gap-1">
            {saidaArr.length > 0 ? saidaArr.map((id) => (
              <span
                key={id}
                className="text-sm leading-none"
                title={productsCatalog[id]?.nome}
              >
                {productsCatalog[id]?.icon}
              </span>
            )) : (
              <span className="text-[8px] text-white/20 italic">—</span>
            )}
          </div>
        </div>

      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" />
    </div>
  );
}