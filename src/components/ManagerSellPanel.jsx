import { useMemo, useState, useEffect,useContext } from "react";
import { useGame } from "./GameContext";
import { productsCatalog } from "./TablePrice";
import { SALES_EDIFICIOS } from "./salesFormulasConfig";
import SellCard from "./SellCard";
import { ArrowLeft, Box, Factory } from "lucide-react";
import { generateSalesContracts } from "./salesContractsConfig";
import { CentraldeDadosContext } from "../centralDeDadosContext";

export default function ManagerSellPanel({ edificioId, onBack }) {
  const { stock,contratosEdificios, getOuGerarContratos  } = useGame();
const { dados } = useContext(CentraldeDadosContext);

  // 1. AJUSTE VITAL: Localizar o edifício dentro do Array usando .find()
  const edificioConfig = useMemo(() =>
     SALES_EDIFICIOS.find(e => e.edificioId === edificioId),
   [edificioId]);

  const contratos = useMemo(() => {
    if (!edificioConfig) return [];
    return getOuGerarContratos(edificioConfig, dados.dia);
  }, [edificioConfig, dados.dia, contratosEdificios[edificioId]]);


  // Busca ou gera contratos — SEM useEffect, SEM useState local

  const diasParaRenovar = useMemo(() => {
    const entrada = contratosEdificios[edificioId];
    if (!entrada) return 0;
    return Math.max(0, entrada.validadeAte - dados.dia);
  }, [contratosEdificios, edificioId, dados.dia]);

  const setores = [
    { id: "agricultura", cor1: "#003816", cor3: "#0C9123", cor4: "#4CAF50" },
    { id: "tecnologia", cor1: "#A64B00", cor3: "#FF6F00", cor4: "#FF8C42" },
    { id: "industria", cor1: "#1A1A1A", cor3: "#808080", cor4: "#B3B3B3" },
    { id: "comercio", cor1: "#660000", cor3: "#E60000", cor4: "#FF4D4D" },
    { id: "imobiliario", cor1: "#000066", cor3: "#3333CC", cor4: "#6666FF" },
    { id: "energia", cor1: "#665200", cor3: "#E6B800", cor4: "#FFD966" },
  ];

  // 2. Fallback seguro para o setor
  const setorInfo = useMemo(() => {
    if (!edificioConfig) return setores[2];
    // Normaliza o setor para ignorar acentos se necessário (ex: comércio -> comercio)
    const setorNormalizado = edificioConfig.setor.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return setores.find(s => s.id === setorNormalizado) || setores[2];
  }, [edificioConfig]);

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

  // 3. Early return caso não encontre
  if (!edificioConfig) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-[#1a1a1a] rounded-xl text-white p-6">
        <Factory size={48} className="mb-4 opacity-20" />
        <h2 className="text-xl font-bold">Edifício não encontrado</h2>
        <p className="text-white/50 mb-6">O ID "{edificioId}" não existe em salesFormulasConfig.</p>
        <button onClick={onBack} className="bg-white/10 px-6 py-2 rounded-full hover:bg-white/20 transition-colors">
          Voltar ao Hub
        </button>
      </div>
    );
  }

  return (
    <div
      style={{ backgroundColor: setorInfo.cor1 }}
      className="h-full p-4 animate-in fade-in duration-500 transition-colors rounded-xl overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-4 h-full">

        {/* HEADER / VOLTAR */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group w-fit shrink-0"
        >
          <ArrowLeft size={18} />
          <span className="font-bold uppercase tracking-widest text-[10px]">Voltar ao Hub</span>
        </button>

        <div className="flex flex-col md:flex-row gap-4 shrink-0">
          {/* HERO SECTION */}
          <div
            style={{ background: `linear-gradient(135deg, ${setorInfo.cor1} 0%, ${setorInfo.cor3} 100%)` }}
            className="relative overflow-hidden rounded-3xl shadow-xl border border-white/10 flex-1"
          >
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative p-6 flex items-center gap-6">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl">
                <img
                  src={getImageUrl(edificioConfig.nomeEdificio)}
                  alt={edificioConfig.nomeEdificio}
                  className="w-14 h-14 object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-1 text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">
                  <Factory size={12} />
                  {edificioConfig.setor}
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase">
                  {edificioConfig.nomeEdificio}
                </h1>
              </div>
            </div>
          </div>

          {/* ESTOQUE */}
          <div className="flex-[1.5] flex flex-col gap-2">
            <div className="flex items-center gap-2 text-white/60 ml-2">
              <Box size={16} />
              <h2 className="font-bold uppercase tracking-widest text-[10px]">Estoque Disponível</h2>
            </div>
            <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-[1.5rem] p-3 h-full">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {produtosEstoque.map(produto => (
                  <div key={produto.id} className="bg-white/5 border border-white/5 p-2 rounded-xl flex flex-col items-center">
                    <span className="text-xl">{produto.icon}</span>
                    <span className="text-[8px] text-white/40 font-bold uppercase truncate w-full text-center">
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

        {/* CONTRATOS */}
        <div className="flex flex-col gap-3 min-h-0 flex-1">
          <div className="flex items-center gap-2 text-white/60 ml-2 shrink-0">
            <Factory size={16} />
            <h2 className="font-bold uppercase tracking-widest text-[10px]">Ofertas de Mercado</h2>
          </div>
          <div className="overflow-y-auto pr-2 scrollbar-custom pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {contratos.map(contrato => (
                <div key={contrato.id} className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[1.5rem] overflow-hidden">
                  <SellCard
                    contrato={contrato} // Passando o contrato gerado aleatoriamente
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