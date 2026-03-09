import { useContext, useMemo } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { SALES_EDIFICIOS } from "./salesFormulasConfig";
import { productsCatalog } from "./TablePrice";
export function useSalesBuildingData(nomeDoEdificio) {
  const { dados } = useContext(CentraldeDadosContext);

  // 1. Busca o edifício nos dados globais do jogo
  const edificioEncontrado = useMemo(() => {
    if (!dados) return null;
    for (const setor in dados) {
      if (dados[setor]?.edificios) {
        const found = dados[setor].edificios.find(e => e.nome === nomeDoEdificio);
        if (found) return found;
      }
    }
    return null;
  }, [dados, nomeDoEdificio]);

const marketPrices = Object.fromEntries(
  Object.entries(productsCatalog).map(([id, p]) => [id, p.precoBase])
);

  // 2. Busca as configurações de venda específicas para este edifício
  const configVenda = useMemo(() => {
    return SALES_EDIFICIOS.find(s => s.nomeEdificio === nomeDoEdificio);
  }, [nomeDoEdificio]);

  return useMemo(() => {
    // Só libera se o prédio existir no mapa E tiver configuração de venda
    if (!edificioEncontrado || !configVenda) {
      return { quantidadeAtiva: 0, nivelEdificio: 1, maxAcoesSimultaneas: 0, liberado: false };
    }

    const qtd = edificioEncontrado.quantidade || 0;
    const pwr = edificioEncontrado.powerUp;

    // Lógica de Nível baseada na sua estrutura (nível2, nível3)
    const nivel = qtd >= (pwr?.nível3?.quantidadeMínima || 100) ? 3 
                : qtd >= (pwr?.nível2?.quantidadeMínima || 20) ? 2 
                : 1;

    return {
      quantidadeAtiva: qtd,
      nivelEdificio: nivel,
      maxAcoesSimultaneas: (configVenda.maxAcoesSimultaneasPorNivel[nivel] || 1),
      liberado: qtd > 0, // Regra: Ter pelo menos 1 construído
      diaAtual: dados.dia || 0,
      configVenda
    };
  }, [edificioEncontrado, configVenda, dados.dia]);
}

export function generateSalesContracts({
  edificioConfig,
  buildingCount = 0,
  level = 1,
  marketPrices,
  diaAtual = 0
}) {
  // Validação: precisa estar no SALES_EDIFICIOS e ter construção
  if (!edificioConfig || buildingCount <= 0) return [];

  const formulas = edificioConfig.formulas;
  const maxContratos = edificioConfig.maxContratosDisponiveisPorNível * (edificioConfig.multiplicadorNivel[level] || 1);

  return Array.from({ length: maxContratos }).map(() => {
    const formula = formulas[Math.floor(Math.random() * formulas.length)];
    const produtoId = formula.produto;

    // Duração do contrato (ex: 20 a 50 dias)
    const duracao = Math.floor(Math.random() * (edificioConfig.rangeDuracaoContrato.max - edificioConfig.rangeDuracaoContrato.min)) + edificioConfig.rangeDuracaoContrato.min;

    // Cálculo da Data de Expiração (Data Atual + Período de Novos Contratos)
    const dataExpiracao = diaAtual + edificioConfig.periodoNovosContratos;

    const capacidadeBase = edificioConfig.capacidadePorEdificio * buildingCount;
    const quantidade = capacidadeBase * (Math.random() * (edificioConfig.rangeQuantidadeContrato.maxCapacidadeMultiplicador - edificioConfig.rangeQuantidadeContrato.minCapacidadeMultiplicador) + edificioConfig.rangeQuantidadeContrato.minCapacidadeMultiplicador);

    const precoBase = Number(marketPrices[produtoId]) || 10; // Fallback caso não venha preço
    const margemAleatoria = formula.margemBase + (Math.random() * (edificioConfig.variacaoMargem.max - edificioConfig.variacaoMargem.min) + edificioConfig.variacaoMargem.min);
    
    const valorUnitario = precoBase * (1 + margemAleatoria / 100);

    return {
      id: crypto.randomUUID(),
      formulaId: formula.id,
      productId: produtoId,
      quantidade: Math.round(quantidade),
      prazoDias: duracao,
      validadeContrato: dataExpiracao, // Quando essa oferta some da lista
      valorTotal: Math.round(valorUnitario * quantidade),
      margemAplicada: Math.round(margemAleatoria),
      status: "disponivel",
    };
  });
}