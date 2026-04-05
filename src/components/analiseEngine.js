// ===============================
// 🔥 ANALISE ENGINE DO JOGO
// ===============================

// Cache global (evita recalcular infinitamente)
const cacheCusto = {};
const cacheROI = {};

// -------------------------------
// 🔎 Buscar edifício em todos setores
// -------------------------------
export function buscarEdificio(nome, dados, setoresArr) {
  for (const setor of setoresArr) {
    const ed = dados[setor]?.edificios?.find((e) => e.nome === nome);
    if (ed) return ed;
  }
  return null;
}

// -------------------------------
// 💰 Custo total REAL (recursivo + lojas base)
// -------------------------------
export function calcularCustoTotal(edificio, dados, setoresArr) {
  if (!edificio) return 0;

  if (cacheCusto[edificio.nome]) {
    return cacheCusto[edificio.nome];
  }

  let total = Number(edificio.custoConstrucao || 0);

  const lojas = edificio.lojasNecessarias || {};

  total += (lojas.terrenos || 0) * dados.terrenos.preçoConstrução;

  total += (lojas.lojasP || 0) *
    (dados.lojasP.preçoConstrução +
      dados.lojasP.quantidadeNecTerreno * dados.terrenos.preçoConstrução);

  total += (lojas.lojasM || 0) *
    (dados.lojasM.preçoConstrução +
      dados.lojasM.quantidadeNecTerreno * dados.terrenos.preçoConstrução);

  total += (lojas.lojasG || 0) *
    (dados.lojasG.preçoConstrução +
      dados.lojasG.quantidadeNecTerreno * dados.terrenos.preçoConstrução);

  // 🔁 recursos encadeados
  if (Array.isArray(edificio.recursoDeConstrução)) {
    edificio.recursoDeConstrução.forEach((r) => {
      const sub = buscarEdificio(r, dados, setoresArr);
      if (sub) {
        total += calcularCustoTotal(sub, dados, setoresArr);
      }
    });
  }

  cacheCusto[edificio.nome] = total;
  return total;
}

// -------------------------------
// 📊 ROI
// -------------------------------
export function calcularROI(edificio, dados, economiaSetores, valorEconomiaSetor, setoresArr) {
  if (!edificio) return 0;

  if (cacheROI[edificio.nome]) {
    return cacheROI[edificio.nome];
  }

  const faturamento = (edificio.faturamentoBase || 0) * valorEconomiaSetor;
  const custos = edificio.custoManutencao || 0;

  const lucro = faturamento - custos;

  const custoTotal = calcularCustoTotal(edificio, dados, setoresArr);

  const roi = custoTotal > 0 ? lucro / custoTotal : 0;

  cacheROI[edificio.nome] = roi;

  return roi;
}

// -------------------------------
// ✅ Pode comprar (versão pura)
// -------------------------------
export function podeComprar(edif, dados, economiaSetores, setoresArr) {
  if (!edif) return { ok: false, motivo: "Edifício inválido" };

  if (economiaSetores.saldo < edif.custoConstrucao) {
    return { ok: false, motivo: "Sem saldo" };
  }

  const lojas = edif.lojasNecessarias || {};

  if (
    (dados.terrenos.quantidade || 0) < (lojas.terrenos || 0) ||
    (dados.lojasP.quantidade || 0) < (lojas.lojasP || 0) ||
    (dados.lojasM.quantidade || 0) < (lojas.lojasM || 0) ||
    (dados.lojasG.quantidade || 0) < (lojas.lojasG || 0)
  ) {
    return { ok: false, motivo: "Falta base" };
  }

  // pré requisitos
  if (edif.construçõesNecessárias?.length) {
    for (const nome of edif.construçõesNecessárias) {
      const ref = buscarEdificio(nome, dados, setoresArr);
      if (!ref || ref.quantidade <= 0) {
        return { ok: false, motivo: `Falta ${nome}` };
      }
    }
  }

  // recursos
  if (edif.recursoDeConstrução?.length) {
    for (const nome of edif.recursoDeConstrução) {
      const ref = buscarEdificio(nome, dados, setoresArr);
      if (!ref || ref.quantidade <= 0) {
        return { ok: false, motivo: `Falta recurso ${nome}` };
      }
    }
  }

  return { ok: true };
}

// -------------------------------
// 🧠 Score inteligente
// -------------------------------
function calcularScore(edificio, contexto) {
  const { dados, economiaSetores, valorEconomiaSetor, setoresArr } = contexto;

  const pode = podeComprar(edificio, dados, economiaSetores, setoresArr);

  if (!pode.ok) {
    return {
      nome: edificio.nome,
      score: -999999,
      motivo: pode.motivo,
    };
  }

  const roi = calcularROI(edificio, dados, economiaSetores, valorEconomiaSetor, setoresArr);
  const custo = calcularCustoTotal(edificio, dados, setoresArr);

  // 🔥 heurística equilibrada
  const score = (roi * 1000) / Math.log10(custo + 10);

  return {
    nome: edificio.nome,
    score,
    roi,
    custo,
  };
}

// -------------------------------
// 🚀 ANALISADOR PRINCIPAL
// -------------------------------
export function analisarJogo({ dados, economiaSetores, valorEconomiaSetor }) {
  const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

  // limpa cache a cada análise
  Object.keys(cacheCusto).forEach((k) => delete cacheCusto[k]);
  Object.keys(cacheROI).forEach((k) => delete cacheROI[k]);

  const todos = setoresArr.flatMap((s) => dados[s].edificios);

  // -----------------------
  // 📊 TOP ROI
  // -----------------------
  const melhoresROI = todos
    .map((e) => ({
      nome: e.nome,
      roi: calcularROI(e, dados, economiaSetores, valorEconomiaSetor, setoresArr),
    }))
    .sort((a, b) => b.roi - a.roi)
    .slice(0, 5);

  // -----------------------
  // 💡 MELHORES COMPRAS
  // -----------------------
  const melhoresCompras = todos
    .map((e) =>
      calcularScore(e, {
        dados,
        economiaSetores,
        valorEconomiaSetor,
        setoresArr,
      })
    )
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return {
    melhoresROI,
    melhoresCompras,
  };
}