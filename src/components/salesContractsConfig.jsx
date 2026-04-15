import { useMemo } from "react";
import { SALES_EDIFICIOS } from "./salesFormulasConfig";
import { productsCatalog } from "./TablePrice";
import { useCentralStore } from "../stores/useCentralStore";
import {
  EDIFICIOS_FINAIS_ESTATICOS,
} from "../stores/dadosEstáticos";

export function useSalesBuildingData(nomeDoEdificio) {
  const dia = useCentralStore((s) => s.dia);
  const edificiosDinamicos = useCentralStore((s) => s.edificiosFinais);

  // 🔎 1. Encontra estático + index + setor
  const edificioRef = useMemo(() => {
    if (!EDIFICIOS_FINAIS_ESTATICOS) return null;

    for (const setor in EDIFICIOS_FINAIS_ESTATICOS) {
      const lista = EDIFICIOS_FINAIS_ESTATICOS[setor]?.edificios || [];

      const index = lista.findIndex(e => e.nome === nomeDoEdificio);

      if (index !== -1) {
        return {
          edificio: lista[index],
          index,
          setor
        };
      }
    }

    return null;
  }, [nomeDoEdificio]);

  // 🔥 2. Acessa o dinâmico corretamente
  const edificioDinamico = useMemo(() => {
    if (!edificioRef || !edificiosDinamicos) return null;

    return edificiosDinamicos?.[edificioRef.setor]
      ?.edificios?.[edificioRef.index] || null;
  }, [edificioRef, edificiosDinamicos]);

  // 🏷️ preços de mercado (mantido igual ao seu padrão)
  const marketPrices = useMemo(() => (
    Object.fromEntries(
      Object.entries(productsCatalog).map(([id, p]) => [id, p.precoBase])
    )
  ), []);

  // ⚙️ config de venda
  const configVenda = useMemo(() => {
    return SALES_EDIFICIOS.find(s => s.nomeEdificio === nomeDoEdificio);
  }, [nomeDoEdificio]);

  // 🚀 retorno final (MESMA ESTRUTURA que você já usa)
  return useMemo(() => {
    if (!edificioRef || !edificioDinamico || !configVenda) {
      return {
        quantidadeAtiva: 0,
        nivelEdificio: 1,
        maxAcoesSimultaneas: 0,
        liberado: false,
        diaAtual: dia || 0,
        configVenda: null,
        marketPrices
      };
    }

    const qtd = edificioDinamico.quantidade || 0;
    const pwr = edificioRef.edificio.powerUp;

    const nivel =
      qtd >= (pwr?.nível3?.quantidadeMínima || 100) ? 3 :
      qtd >= (pwr?.nível2?.quantidadeMínima || 20) ? 2 :
      1;

    return {
      quantidadeAtiva: qtd,
      nivelEdificio: nivel,
      maxAcoesSimultaneas:
        (configVenda.maxAcoesSimultaneasPorNivel[nivel] || 1),
      liberado: qtd > 0,
      diaAtual: dia || 0,
      configVenda,
      marketPrices // 👈 mantido pra compatibilidade com generateSalesContracts
    };
  }, [edificioRef, edificioDinamico, configVenda, dia, marketPrices]);
}

export function generateSalesContracts({
  edificioConfig,
  buildingCount = 0,
  level = 1,
  marketPrices,
  diaAtual = 0
}) {
  if (!edificioConfig || buildingCount <= 0) return [];

  const formulas = edificioConfig.formulas;
  const maxContratos = 
    edificioConfig.maxContratosDisponiveisPorNível *
    (edificioConfig.multiplicadorNivel[level] || 1);

  return Array.from({ length: maxContratos }).map(() => {
    const formula = formulas[Math.floor(Math.random() * formulas.length)];
    const produtoId = formula.produto;

    const duracao =
      Math.floor(Math.random() *
        (edificioConfig.rangeDuracaoContrato.max -
         edificioConfig.rangeDuracaoContrato.min)
      ) + edificioConfig.rangeDuracaoContrato.min;

    const dataExpiracao =
      diaAtual + edificioConfig.periodoNovosContratos;

    const capacidadeBase =
      edificioConfig.capacidadePorEdificio * buildingCount;

    const quantidade =
      capacidadeBase *
      (Math.random() *
        (edificioConfig.rangeQuantidadeContrato.maxCapacidadeMultiplicador -
         edificioConfig.rangeQuantidadeContrato.minCapacidadeMultiplicador
        ) +
        edificioConfig.rangeQuantidadeContrato.minCapacidadeMultiplicador
      );

    const precoBase = Number(marketPrices[produtoId]) || 10;

    const margemAleatoria =
      formula.margemBase +
      (Math.random() *
        (edificioConfig.variacaoMargem.max -
         edificioConfig.variacaoMargem.min) +
        edificioConfig.variacaoMargem.min
      );

    const valorUnitario =
      precoBase * (1 + margemAleatoria / 100);

    return {
      id: crypto.randomUUID(),
      formulaId: formula.id,
      productId: produtoId,
      quantidade: Math.round(quantidade),
      prazoDias: duracao,
      validadeContrato: dataExpiracao,
      valorTotal: Math.round(valorUnitario * quantidade),
      margemAplicada: Math.round(margemAleatoria),
      status: "disponivel",
    };
  });
}