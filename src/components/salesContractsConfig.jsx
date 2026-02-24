import { useContext, useMemo } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";

export function useSalesBuildingData(edificioId, index = 0) {
  const { dados } = useContext(CentraldeDadosContext);

  const setorAtivo = "comercio";

  const edificio = dados?.[setorAtivo]?.edificios?.find(
    e => e.id === edificioId
  );

  return useMemo(() => {
    if (!edificio) return null;

    const quantidadeAtivoAtual = edificio.quantidade;

    const qtdNv2 = edificio.powerUp.nível2.quantidadeMínima;
    const qtdNv3 = edificio.powerUp.nível3.quantidadeMínima;

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

export function generateSalesContracts({
  edificioConfig,
  buildingCount = 0,
  level = 1,
  marketPrices = {},
}) {
  if (!edificioConfig || buildingCount <= 0) return [];

  const formulas = edificioConfig.formulas;

  const maxContratos =
    edificioConfig.maxContratosDisponiveisPorNível *
    (edificioConfig.multiplicadorNivel[level] || 1);

  return Array.from({ length: maxContratos }).map(() => {
    const formula =
      formulas[Math.floor(Math.random() * formulas.length)];

    const produtoId = formula.produto;

    const periodo =
      Math.floor(
        Math.random() *
          (edificioConfig.rangeDuracaoContrato.max -
            edificioConfig.rangeDuracaoContrato.min)
      ) + edificioConfig.rangeDuracaoContrato.min;

    const capacidadeBase =
      edificioConfig.capacidadePorEdificio * buildingCount;

    const quantidade =
      capacidadeBase *
      (Math.random() *
        (edificioConfig.rangeQuantidadeContrato
          .maxCapacidadeMultiplicador -
          edificioConfig.rangeQuantidadeContrato
            .minCapacidadeMultiplicador) +
        edificioConfig.rangeQuantidadeContrato
          .minCapacidadeMultiplicador);

    const preco = Number(marketPrices[produtoId]) || 0;

    const margem =
      formula.margemBase +
      (Math.random() *
        (edificioConfig.variacaoMargem.max -
          edificioConfig.variacaoMargem.min) +
        edificioConfig.variacaoMargem.min);

    const valorUnitario = preco * (1 + margem / 100);

    const valorTotal = Math.round(valorUnitario * quantidade);

    return {
      id: crypto.randomUUID(),
      productId: produtoId,
      quantidade: Math.round(quantidade),
      diasTotais: periodo,
      valorTotal,
      status: "disponivel",
    };
  });
}