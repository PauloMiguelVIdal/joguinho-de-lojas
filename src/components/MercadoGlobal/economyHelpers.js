// MercadoGlobal/economyHelpers.js
import { productsCatalog, marketPrices, getMarketPrice } from '../TablePrice';
import { FORMULAS_EDIFICIOS } from '../productionFormulasConfig';
import { SALES_EDIFICIOS } from '../salesFormulasConfig';
import { EDIFICIOS_FINAIS_ESTATICOS } from '../../stores/dadosEstáticos';

export const SETORES = ['agricultura', 'tecnologia', 'industria', 'comercio', 'imobiliario', 'energia'];
export const ECONOMY_STATES = ['recessão', 'declínio', 'estável', 'progressiva', 'aquecida'];

// ═══════════════════════════════════════════════════════
// ECONOMIA
// ═══════════════════════════════════════════════════════
export function getEconomyMult(estado) {
  return { recessão: 0.8, declínio: 0.9, estável: 1.0, progressiva: 1.1, aquecida: 1.2 }[estado] ?? 1.0;
}

export function simulatePrice(produtoId, econGlobal, econSetor) {
  const base = marketPrices[produtoId];
  if (!base) return 0;
  return Math.round(base * getEconomyMult(econGlobal) * getEconomyMult(econSetor));
}

export function currentPrice(produtoId, economiaSetores) {
  return getMarketPrice(produtoId, economiaSetores);
}

// ═══════════════════════════════════════════════════════
// EDIFÍCIOS ATIVOS (idêntico ao AssistenteIA — fallback carteira)
// ═══════════════════════════════════════════════════════
function getArrDinamico(edificiosFinais, setor) {
  const raw = edificiosFinais?.[setor];
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw?.edificios)) return raw.edificios;
  return [];
}

function getQtdDaCarteira(carteiraAtual, setorIndex, nomeEd) {
  const arr = Array.isArray(carteiraAtual?.[setorIndex]) ? carteiraAtual[setorIndex] : [];
  let soma = 0;
  arr.forEach((e) => {
    if (!e?.nome) return;
    if (e.nome === nomeEd) soma += Number(e.quantidade ?? 0);
  });
  return soma;
}

export function getEdQtd(edificiosFinais, nome, carteiraAtual = null) {
  for (const s of SETORES) {
    const setorIndex = SETORES.indexOf(s);
    const idx = EDIFICIOS_FINAIS_ESTATICOS[s]?.edificios?.findIndex(e => e.nome === nome) ?? -1;
    if (idx === -1) continue;

    const arrDin = getArrDinamico(edificiosFinais, s);
    const qtdZustand = Number(arrDin[idx]?.quantidade ?? 0);
    if (qtdZustand > 0) return qtdZustand;

    if (carteiraAtual) {
      const qtdCarteira = getQtdDaCarteira(carteiraAtual, setorIndex, nome);
      if (qtdCarteira > 0) return qtdCarteira;
    }
    return 0;
  }
  return 0;
}

export function getEdificiosAtivos(edificiosFinais, carteiraAtual = null) {
  const resultado = [];
  SETORES.forEach((setor) => {
    const edEstArr = EDIFICIOS_FINAIS_ESTATICOS[setor]?.edificios || [];
    edEstArr.forEach((edEst) => {
      const qtd = getEdQtd(edificiosFinais, edEst.nome, carteiraAtual);
      if (qtd > 0) resultado.push({ ...edEst, setor, quantidade: qtd });
    });
  });
  return resultado;
}

export function getProdutosVinculados(edificiosFinais, carteiraAtual = null) {
  const ids = new Set();
  const ativos = getEdificiosAtivos(edificiosFinais, carteiraAtual);

  ativos.forEach((ed) => {
    const confP = FORMULAS_EDIFICIOS.find(c => c.nomeEdificio === ed.nome);
    if (confP) {
      confP.formulas.forEach(f => {
        Object.keys(f.input  || {}).forEach(id => ids.add(id));
        Object.keys(f.output || {}).forEach(id => ids.add(id));
      });
    }
    const confV = SALES_EDIFICIOS.find(c => c.nomeEdificio === ed.nome);
    if (confV) {
      confV.formulas?.forEach(f => { if (f.produto) ids.add(f.produto); });
    }
    (ed.produz  || []).forEach(id => ids.add(id));
    (ed.consome || []).forEach(id => ids.add(id));
    (ed.vende   || []).forEach(id => ids.add(id));
  });

  return ids;
}

// ═══════════════════════════════════════════════════════
// CONSUMIDORES / PRODUTORES / VENDEDORES por produto
// ═══════════════════════════════════════════════════════
export function getConsumers(produtoId) {
  const out = [];
  FORMULAS_EDIFICIOS.forEach(conf => {
    conf.formulas.forEach(f => {
      if (f.input?.[produtoId]) {
        out.push({
          edificio: conf.nomeEdificio,
          setor: conf.setor,
          formulaNome: f.nome,
          qtdUsada: f.input[produtoId],
          duracao: f.duracao,
        });
      }
    });
  });
  return out;
}

export function getProducers(produtoId) {
  const out = [];
  FORMULAS_EDIFICIOS.forEach(conf => {
    conf.formulas.forEach(f => {
      if (f.output?.[produtoId]) {
        out.push({
          edificio: conf.nomeEdificio,
          setor: conf.setor,
          qtdProduzida: f.output[produtoId],
          inputs: f.input,
          duracao: f.duracao,
        });
      }
    });
  });
  return out;
}

export function getSellers(produtoId) {
  return (SALES_EDIFICIOS || []).flatMap(conf =>
    (conf.formulas || [])
      .filter(f => f.produto === produtoId)
      .map(f => ({
        edificio: conf.nomeEdificio,
        setor: conf.setor,
        margemBase: f.margemBase,
      }))
  );
}

// ═══════════════════════════════════════════════════════
// SIMULAÇÕES
// ═══════════════════════════════════════════════════════
export function calcularLucroRevenda({ qtd, precoCompra, precoVendaSimulado }) {
  const custo = qtd * precoCompra;
  const receita = qtd * precoVendaSimulado;
  return {
    custo,
    receita,
    lucro: receita - custo,
    margem: custo > 0 ? ((receita - custo) / custo) * 100 : 0,
  };
}

export function compararComprarVsProduzir(produtoId, qtd, economiaSetores) {
  const comprar = {
    custo: qtd * currentPrice(produtoId, economiaSetores),
    tempoDias: 0,
  };

  const producers = getProducers(produtoId);
  let produzir = null;

  if (producers.length) {
    const best = producers.sort(
      (a, b) => (b.qtdProduzida / b.duracao) - (a.qtdProduzida / a.duracao)
    )[0];

    const runsNecessarios = Math.ceil(qtd / best.qtdProduzida);
    const custoInsumos = Object.entries(best.inputs).reduce(
      (soma, [insumoId, qtdInsumo]) =>
        soma + qtdInsumo * runsNecessarios * currentPrice(insumoId, economiaSetores),
      0
    );

    produzir = {
      edificio: best.edificio,
      custo: custoInsumos,
      tempoDias: best.duracao * runsNecessarios,
      insumos: best.inputs,
      qtdPorRun: best.qtdProduzida,
      runsNecessarios,
    };
  }

  return { comprar, produzir };
}