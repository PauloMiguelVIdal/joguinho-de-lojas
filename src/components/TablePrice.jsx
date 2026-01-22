import React, { useContext } from "react";
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
    categoriaFisica: "agrícolas secos",
    slotSize: 0.5,
  },
  soja: {
    id: "soja",
    nome: "Soja",
    icon: "🫘",
    unidade: "sacas",
    setor: "agricultura",
    categoriaFisica: "agrícolas secos",
    slotSize: 0.5,
  },
  trigo: {
    id: "trigo",
    nome: "Trigo",
    icon: "🌾",
    unidade: "sacas",
    setor: "agricultura",
    categoriaFisica: "agrícolas secos",
    slotSize: 0.5,
  },
  algodão: {
    id: "algodão",
    nome: "Cevada",
    icon: "🌱",
    unidade: "sacas",
    setor: "agricultura",
    categoriaFisica: "agrícolas secos",
    slotSize: 0.5,
  },



  vaca: {
    id: "vaca",
    nome: "Vaca",
    icon: "🐮",
    unidade: "unidades",
    setor: "agricultura",
    categoriaFisica: "animais",
    slotSize: 3,
  },

  galinha: {
    id: "galinha",
    nome: "Galinha",
    icon: "🐔",
    unidade: "unidades",
    setor: "agricultura",
    categoriaFisica: "animais",
    slotSize: 0.2,
  },

  ovelha: {
    id: "ovelha",
    nome: "Ovelha",
    icon: "🐑",
    unidade: "unidades",
    setor: "agricultura",
    categoriaFisica: "animais",
    slotSize: 1,
  },

  porco: {
    id: "porco",
    nome: "Porco",
    icon: "🐷",
    unidade: "unidades",
    setor: "agricultura",
    categoriaFisica: "animais",
    slotSize: 1.5,
  },

  couro: {
    id: "couro",
    nome: "Couro",
    icon: "🌱",
    unidade: "kg",
    setor: "agricultura",
    categoriaFisica: "produtos manufaturados",
    slotSize: 20,
  },

  lã: {
    id: "lã",
    nome: "Lã",
    icon: "🧶",
    unidade: "kg",
    setor: "agricultura",
    categoriaFisica: "produtos manufaturados",
    slotSize: 5,
  },


  esterco: {
    id: "esterco",
    nome: "Esterco",
    icon: "💩",
    unidade: "sacas",
    setor: "agricultura",
    categoriaFisica: "biomassa / orgânicos",
    slotSize: 0.1,
  },


  racaoDeVacas: {
    id: "racaoDeVacas",
    nome: "Ração De Vacas",
    icon: "🌱",
    unidade: "sacas",
    setor: "agricultura",
    categoriaFisica: "biomassa / orgânicos",
    slotSize: 0.1,
  },

  racaoDeAves: {
    id: "racaoDeAves",
    nome: "Ração De Aves",
    icon: "🌱",
    unidade: "sacas",
    setor: "agricultura",
    categoriaFisica: "biomassa / orgânicos",
    slotSize: 0.1,
  },

  racaoDeOvinos: {
    id: "racaoDeOvinos",
    nome: "Ração De Ovinos",
    icon: "🌱",
    unidade: "sacas",
    setor: "agricultura",
    categoriaFisica: "biomassa / orgânicos",
    slotSize: 0.1,
  },

  racaoDePorco: {
    id: "racaoDePorco",
    nome: "Ração De Porco",
    icon: "🌱",
    unidade: "sacas",
    setor: "agricultura",
    categoriaFisica: "biomassa / orgânicos",
    slotSize: 0.1,
  },

  fertilizantePlantação: {
    id: "fertilizantePlantação",
    nome: "Fertilizante De Plantações",
    icon: "🌱",
    unidade: "saco",
    setor: "agricultura",
    categoriaFisica: "biomassa / orgânicos",
    slotSize: 1,
  },

  fertilizanteFlorestal: {
    id: "fertilizanteFlorestal",
    nome: "Fertilizante De Florestal",
    icon: "🌱",
    unidade: "saco",
    setor: "agricultura",
    categoriaFisica: "biomassa / orgânicos",
    slotSize: 1,
  },





  // 🥩 COMÉRCIO
  carneBovina: {
    id: "carneBovina",
    nome: "Carne Bovina",
    icon: "🥩",
    unidade: "kg",
    setor: "comercio",
    categoriaFisica: "perecíveis",
    slotSize: 0.1,
  },
  frango: {
    id: "frango",
    nome: "Frango",
    icon: "🍗",
    unidade: "kg",
    setor: "comercio",
    categoriaFisica: "perecíveis",
    slotSize: 0.4,
  },
  carneSuina: {
    id: "carneSuina",
    nome: "Carne Suína",
    icon: "🥓",
    unidade: "kg",
    setor: "comercio",
    categoriaFisica: "perecíveis",
    slotSize: 0.45,
  },
  carneOvino: {
    id: "carneOvino",
    nome: "Carne De Ovino",
    icon: "🍖",
    unidade: "kg",
    setor: "comercio",
    categoriaFisica: "perecíveis",
    slotSize: 0.3,
  },


  // 🏭 INDÚSTRIA
  veiculoPopular: {
    id: "veiculoPopular",
    nome: "Veículo Popular",
    icon: "🚗",
    unidade: "unidades",
    setor: "industria",
    categoriaFisica: "veículos",
    slotSize: 6,
  },
  sedan: {
    id: "sedan",
    nome: "Sedan",
    icon: "🚙",
    unidade: "unidades",
    setor: "industria",
    categoriaFisica: "veículos",
    slotSize: 6,
  },
  suv: {
    id: "suv",
    nome: "SUV",
    icon: "🚐",
    unidade: "unidades",
    setor: "industria",
    categoriaFisica: "veículos",
    slotSize: 6,
  },
  van: {
    id: "van",
    nome: "Van",
    icon: "🚚",
    unidade: "unidades",
    setor: "industria",
    categoriaFisica: "veículos",
    slotSize: 8,
  },


  // ⛏️ MINÉRIOS
  ferro: {
    id: "ferro",
    nome: "Ferro",
    icon: "⚫",
    unidade: "toneladas",
    setor: "industria",
    categoriaFisica: "minério",
    slotSize: 6,
  },

  // 📱 TECNOLOGIA
  smartphoneBasico: {
    id: "smartphoneBasico",
    nome: "Smartphone Básico",
    icon: "📱",
    unidade: "unidades",
    setor: "tecnologia",
    categoriaFisica: "bens de alto valor",
    slotSize: 2,
  },


  // ⚡ ENERGIA
  painelSolarIndustrial: {
    id: "painelSolarIndustrial",
    nome: "Painel Solar Industrial",
    icon: "🏭",
    unidade: "unidades",
    setor: "energia",
    categoriaFisica: "componentes industriais",
    slotSize: 200,
  },

  minerioUranio: {
    id: "minerioUranio",
    nome: "minerioUranio",
    icon: "🏭",
    unidade: "unidades",
    setor: "energia",
    categoriaFisica: "materiais sensíveis",
    slotSize: 200,
  },

  combustivelCarro: {
    id: "combustivelCarro",
    nome: "combustivelCarro",
    icon: "🏭",
    unidade: "L",
    setor: "comercio",
    categoriaFisica: "fluidos",
    slotSize: 3,
  },

  processadorSimples: {
    id: "portaCarro",
    nome: "portaCarro",
    icon: "🏭",
    unidade: "unidades",
    setor: "industria",
    categoriaFisica: "componentes eletrônicos",
    slotSize: 3,
  },

  portaCarro: {
    id: "portaCarro",
    nome: "portaCarro",
    icon: "🏭",
    unidade: "kg",
    setor: "industria",
    categoriaFisica: "componentes industriais",
    slotSize: 10,
  },

  softwareSimples: {
    id: "softwareSimples",
    nome: "softwareSimples",
    icon: "🏭",
    unidade: "gb",
    setor: "tecnologia",
    categoriaFisica: "produtos digitais",
    slotSize: 100,
  },
  relogioLuxo: {
    id: "relogioLuxo",
    nome: "relogioLuxo",
    icon: "🏭",
    unidade: "gb",
    setor: "comercio",
    categoriaFisica: "bens de alto valor",
    slotSize: 5,
  },

};


/* =====================================================
   💰 PREÇOS BASE DO MERCADO (SEM ESTOQUE)
===================================================== */

export const marketPrices = {
  milho: 105,
  soja: 135,
  trigo: 80,
  algodão: 100,

  couro: 1000,
lã:20,


fertilizantePlantação:500,


  galinha: 100,
  vaca: 4000,
  ovelha:200,


  racaoDeVacas: 1000,
  racaoDeAves: 200,
  racaoDeOvinos: 500,
  racaoDePorco: 400,




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

  minerioUranio: 70000,
  combustivelCarro: 1000,
  processadorSimples: 1000,
  portaCarro: 1000,
  softwareSimples: 1000,
  relogioLuxo: 1000,
};



/* =====================================================
   ⚖️ FUNÇÃO PURA DE MULTIPLICADOR ECONÔMICO
===================================================== */

function getEconomyMultiplier(estado) {
  switch (estado) {
    case "recessão":
      return 0.8;
    case "declínio":
      return 0.9;
    case "estável":
      return 1;
    case "progressiva":
      return 1.1;
    case "aquecida":
      return 1.2;
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