export const CONTRACT_PERIODS = [20, 30, 40, 50];

import { useContext, useMemo } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { productsCatalog } from "./TablePrice";

export function useButcherBuildingData(index = 7) {
  const { dados } = useContext(CentraldeDadosContext);

  const setorAtivo = "comercio";
  const edificio = dados?.[setorAtivo]?.edificios?.[index];

  return useMemo(() => {
    if (!edificio) return null;

    const quantidadeAtivoAtual = edificio.quantidade;

    const qtdNv2 = edificio.powerUp.nível2.quantidadeMínima;
    const qtdNv3 = edificio.powerUp.nível3.quantidadeMínima;

    // 👉 ESTE é o nível REAL do açougue
    const nivelEdificio =
      quantidadeAtivoAtual >= qtdNv3
        ? 3
        : quantidadeAtivoAtual >= qtdNv2
        ? 2
        : 1;

    return {
      quantidadeAtivoAtual,
      nivelEdificio,
    };
  }, [edificio]);
}


export function generateButcherContracts({
  butcherCount = 0,
  level = 1,
  marketPrices = {},
}) {
  if (butcherCount <= 0) return [];

  const products = [
    productsCatalog.carneBovina,
    productsCatalog.frango,
    productsCatalog.carneSuina,
    productsCatalog.linguica,
  ];

  const contratosPorNivel = {
    1: 4,
    2: 8,
    3: 12,
  };

  const baseQtdPorPeriodo = {
    20: 500,
    30: 1000,
    40: 2500,
    50: 5000,
  };

  const maxContratos = contratosPorNivel[level] ?? 4;

  return Array.from({ length: maxContratos }).map(() => {
    const produto =
      products[Math.floor(Math.random() * products.length)];

    const periodo = [20, 30, 40, 50][
      Math.floor(Math.random() * 4)
    ];

    const base = baseQtdPorPeriodo[periodo] ?? 0;
    const quantidade = base * butcherCount;

    const preco = Number(marketPrices[produto.id]) || 0;

    return {
      id: crypto.randomUUID(),
      productId: produto.id,
      produtoNome: produto.nome,
      quantidade,
      diasTotais: periodo,
      valorTotal: quantidade * preco,
      status: "disponivel",
    };
  });
}

