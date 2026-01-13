import React, {useContext } from "react";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
/* =====================================================
   📦 CATÁLOGO DE PRODUTOS (fonte única da verdade)
===================================================== */

export const productsCatalog = {
  // 🌱 AGRICULTURA
  milho: {
    id: "milho",
    nome: "Milho",
    icon: "🌽",
    unidade: "sacas",
    setor: "agricultura",
  },
  soja: {
    id: "soja",
    nome: "Soja",
    icon: "🫘",
    unidade: "sacas",
    setor: "agricultura",
  },
  trigo: {
    id: "trigo",
    nome: "Trigo",
    icon: "🌾",
    unidade: "sacas",
    setor: "agricultura",
  },
  cevada: {
    id: "cevada",
    nome: "Cevada",
    icon: "🌱",
    unidade: "sacas",
    setor: "agricultura",
  },

  // 🥩 COMÉRCIO
  carneBovina: {
    id: "carneBovina",
    nome: "Carne Bovina",
    icon: "🥩",
    unidade: "kg",
    setor: "comercio",
  },
  frango: {
    id: "frango",
    nome: "Frango",
    icon: "🍗",
    unidade: "kg",
    setor: "comercio",
  },
  carneSuina: {
    id: "carneSuina",
    nome: "Carne Suína",
    icon: "🥓",
    unidade: "kg",
    setor: "comercio",
  },
  linguica: {
    id: "linguica",
    nome: "Linguiça",
    icon: "🌭",
    unidade: "kg",
    setor: "comercio",
  },

  // 🏭 INDÚSTRIA
  veiculoPopular: {
    id: "veiculoPopular",
    nome: "Veículo Popular",
    icon: "🚗",
    unidade: "unidades",
    setor: "industria",
  },
  sedan: {
    id: "sedan",
    nome: "Sedan",
    icon: "🚙",
    unidade: "unidades",
    setor: "industria",
  },
  suv: {
    id: "suv",
    nome: "SUV",
    icon: "🚐",
    unidade: "unidades",
    setor: "industria",
  },
  van: {
    id: "van",
    nome: "Van",
    icon: "🚚",
    unidade: "unidades",
    setor: "industria",
  },

  // ⛏️ MINÉRIOS
  cobre: {
    id: "cobre",
    nome: "Cobre",
    icon: "🟠",
    unidade: "toneladas",
    setor: "industria",
  },
  ferro: {
    id: "ferro",
    nome: "Ferro",
    icon: "⚫",
    unidade: "toneladas",
    setor: "industria",
  },
  bauxita: {
    id: "bauxita",
    nome: "Bauxita",
    icon: "🟤",
    unidade: "toneladas",
    setor: "industria",
  },

  // 📱 TECNOLOGIA
  smartphoneBasico: {
    id: "smartphoneBasico",
    nome: "Smartphone Básico",
    icon: "📱",
    unidade: "unidades",
    setor: "tecnologia",
  },
  smartphonePremium: {
    id: "smartphonePremium",
    nome: "Smartphone Premium",
    icon: "📳",
    unidade: "unidades",
    setor: "tecnologia",
  },
  smartphoneGamer: {
    id: "smartphoneGamer",
    nome: "Smartphone Gamer",
    icon: "🎮",
    unidade: "unidades",
    setor: "tecnologia",
  },
  smartphoneDobravél: {
    id: "smartphoneDobravél",
    nome: "Smartphone Dobrável",
    icon: "📴",
    unidade: "unidades",
    setor: "tecnologia",
  },

  // ⚡ ENERGIA
  painelSolarResidencial: {
    id: "painelSolarResidencial",
    nome: "Painel Solar Residencial",
    icon: "🏠",
    unidade: "unidades",
    setor: "energia",
  },
  painelSolarComercial: {
    id: "painelSolarComercial",
    nome: "Painel Solar Comercial",
    icon: "🏢",
    unidade: "unidades",
    setor: "energia",
  },
  painelSolarIndustrial: {
    id: "painelSolarIndustrial",
    nome: "Painel Solar Industrial",
    icon: "🏭",
    unidade: "unidades",
    setor: "energia",
  },
  painelSolarPremium: {
    id: "painelSolarPremium",
    nome: "Painel Solar Premium",
    icon: "⚡",
    unidade: "unidades",
    setor: "energia",
  },
};


/* =====================================================
   💰 PREÇOS BASE DO MERCADO (SEM ESTOQUE)
===================================================== */

export const marketPrices = {
  milho: 105,
  soja: 135,
  trigo: 80,
  cevada: 100,

  carneBovina: 30,
  frango: 12,
  carneSuina: 18,
  linguica: 25,

  veiculoPopular: 15000,
  sedan: 25000,
  suv: 48000,
  van: 38000,

  cobre: 22000,
  ferro: 17500,
  bauxita: 15400,

  smartphoneBasico: 1500,
  smartphonePremium: 10000,
  smartphoneGamer: 16000,
  smartphoneDobravél: 40000,

  painelSolarResidencial: 2250,
  painelSolarComercial: 5250,
  painelSolarIndustrial: 12000,
  painelSolarPremium: 14000,
};



/* =====================================================
   ⚖️ FUNÇÃO PURA DE MULTIPLICADOR ECONÔMICO
===================================================== */

function getEconomyMultiplier(estado) {
  switch (estado) {
    case "recessão":
      return 0.4;
    case "declínio":
      return 0.8;
    case "estável":
      return 1;
    case "progressiva":
      return 1.2;
    case "aquecida":
      return 1.4;
    default:
      return 1;
  }
}

/* =====================================================
   🧮 FUNÇÃO PURA DE PREÇO DE MERCADO
===================================================== */

export function getMarketPrice(produtoId, economiaSetores) {
  const basePrice = marketPrices[produtoId];
  if (!basePrice) return 0;

  const produto = productsCatalog[produtoId];
  if (!produto) return 0;

  const setor = produto.setor;

  const economiaGlobalEstado =
    economiaSetores.economiaGlobal ?? "estável";

  const economiaSetorEstado =
    economiaSetores[setor]?.economiaSetor?.estadoAtual ?? "estável";

  const globalMultiplier = getEconomyMultiplier(economiaGlobalEstado);
  const sectorMultiplier = getEconomyMultiplier(economiaSetorEstado);

  return Math.round(basePrice * globalMultiplier * sectorMultiplier);
}
/* =====================================================
   🏪 COMPONENTE DE VENDA DE PRODUTO
===================================================== */

function VendaProduto({ nome, icon, preco, unidade }) {
  return (
    <div className="flex justify-between items-center p-3 border rounded">
      <div className="flex items-center gap-2">
        <span>{icon}</span>
        <strong>{nome}</strong>
      </div>
      <span>
        R$ {preco} / {unidade}
      </span>
    </div>
  );
}

/* =====================================================
   🧾 MERCADO GLOBAL (interface única)
===================================================== */

export function MercadoGlobal() {
  const { economiaSetores } = useContext(DadosEconomyGlobalContext);

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">🌍 Mercado Global</h2>

      {Object.keys(productsCatalog).map((id) => {
        const produto = productsCatalog[id];
        const preco = getMarketPrice(id, economiaSetores);

        return (
          <VendaProduto
            key={id}
            nome={produto.nome}
            icon={produto.icon}
            preco={preco}
            unidade={produto.unidade}
          />
        );
      })}
    </div>
  );
}


/* =====================================================
   🚀 USO FINAL
===================================================== */

// Envolver o app:
// <DadosEconomyProvider>
//    <MercadoGlobal />
// </DadosEconomyProvider>