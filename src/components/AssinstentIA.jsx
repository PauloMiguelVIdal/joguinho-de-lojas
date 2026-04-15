import React, { useContext, useMemo, useState } from 'react';
import { DadosEconomyGlobalContext }  from '../dadosEconomyGlobal';
import { useCentralStore }            from '../stores/useCentralStore';
import { EDIFICIOS_FINAIS_ESTATICOS } from '../stores/dadosEstáticos';
import { FORMULAS_EDIFICIOS }         from './productionFormulasConfig';
import { SALES_EDIFICIOS }            from './salesFormulasConfig';
import { productsCatalog, marketPrices } from './TablePrice';
import { storageProfiles }            from './GameContext';

// ════════════════════════════════════════════════════════════
// CONFIG
// ════════════════════════════════════════════════════════════
const SETOR_CONFIG = {
  agricultura: { cor: '#0C9123', corBg: '#003816', label: 'Agricultura', icon: '🌾' },
  tecnologia:  { cor: '#FF6F00', corBg: '#A64B00', label: 'Tecnologia',  icon: '⚙️' },
  industria:   { cor: '#808080', corBg: '#1A1A1A', label: 'Indústria',   icon: '🏭' },
  comercio:    { cor: '#E60000', corBg: '#660000', label: 'Comércio',    icon: '🏪' },
  imobiliario: { cor: '#3333CC', corBg: '#000066', label: 'Imobiliário', icon: '🏗️' },
  energia:     { cor: '#E6B800', corBg: '#665200', label: 'Energia',     icon: '⚡' },
};
const SETORES = Object.keys(SETOR_CONFIG);

const VIEWS = [
  { id: 'saude',         label: 'Saúde',        icon: '❤️',  desc: 'Visão geral do império'      },
  { id: 'gargalos',      label: 'Gargalos',      icon: '🔴',  desc: 'Onde a produção quebra'      },
  { id: 'economico',     label: 'Econômico',     icon: '💰',  desc: 'Receita real com impostos'   },
  { id: 'estoque',       label: 'Estoque',       icon: '📦',  desc: 'Pressão de armazenamento'    },
  { id: 'eficiencia',    label: 'Eficiência',    icon: '⚡',  desc: 'Melhores e piores ativos'    },
  { id: 'oportunidades', label: 'Oportunidades', icon: '🚀',  desc: 'Onde crescer mais rápido'    },
];

// ════════════════════════════════════════════════════════════
// FORMATAÇÃO
// ════════════════════════════════════════════════════════════
const fmt  = (n, dec = 1) => {
  if (n === undefined || n === null || isNaN(n)) return '—';
  const abs = Math.abs(n);
  if (abs >= 1e9) return (n / 1e9).toFixed(dec) + 'B';
  if (abs >= 1e6) return (n / 1e6).toFixed(dec) + 'M';
  if (abs >= 1e3) return (n / 1e3).toFixed(dec) + 'K';
  return n.toFixed(0);
};
const fmtR = n => (n < 0 ? '-' : '') + 'R$ ' + fmt(Math.abs(n ?? 0));
const fmtD = d => !isFinite(d) || d <= 0 ? '—' : d < 1 ? `${(d * 24).toFixed(0)}h` : d > 999 ? '>999d' : `${d.toFixed(1)}d`;

// ════════════════════════════════════════════════════════════
// HELPERS — usam estáticos + dinâmicos separados
// ════════════════════════════════════════════════════════════

/** Retorna a quantidade dinâmica de um edifício pelo nome */
function getEdQtd(edificiosFinais, nome) {
  for (const s of SETORES) {
    const idx = EDIFICIOS_FINAIS_ESTATICOS[s]?.edificios?.findIndex(e => e.nome === nome) ?? -1;
    if (idx !== -1) return edificiosFinais[s]?.[idx]?.quantidade ?? 0;
  }
  return 0;
}

/** Retorna se o edifício está com licença liberada */
function getEdLiberado(edificiosFinais, nome) {
  for (const s of SETORES) {
    const idx = EDIFICIOS_FINAIS_ESTATICOS[s]?.edificios?.findIndex(e => e.nome === nome) ?? -1;
    if (idx !== -1) return edificiosFinais[s]?.[idx]?.liberado !== false;
  }
  return true;
}

function getEconomyMult(estado) {
  return { recessão: 0.8, declínio: 0.9, estável: 1.0, progressiva: 1.1, aquecida: 1.2 }[estado] ?? 1.0;
}

// ════════════════════════════════════════════════════════════
// CÁLCULO FINANCEIRO REAL
// Usa dados estáticos (finanças) + dinâmicos (quantidade)
// ════════════════════════════════════════════════════════════
function calcFin(edEst, quantidade, econGlobal, econSetor) {
  const qtd = quantidade || 0;
  if (!qtd) return { fat: 0, impFixo: 0, impFatu: 0, impostos: 0, lucro: 0, margem: 0 };
  const fin     = edEst.finanças || {};
  const gM      = getEconomyMult(econGlobal);
  const sM      = getEconomyMult(econSetor);
  const fat     = (fin.faturamentoUnitário || 0) * gM * sM * qtd;
  const impFixo = fin.impostoFixo || 0;
  const impFatu = fat * (fin.impostoSobreFatu || 0);
  const impostos = impFixo + impFatu;
  const lucro    = fat - impostos;
  const margem   = fat > 0 ? (lucro / fat) * 100 : 0;
  return { fat, impFixo, impFatu, impostos, lucro, margem };
}

// ════════════════════════════════════════════════════════════
// GRAFO ESTÁTICO — buildado uma única vez
// ════════════════════════════════════════════════════════════
function buildGraph() {
  const prodMap = {}, edMap = {}, armMap = {};
  const ep = id => { if (!prodMap[id]) prodMap[id] = { produtores: [], consumidores: [], vendedores: [] }; };
  const ee = (nome, setor, extra = {}) => { if (!edMap[nome]) edMap[nome] = { inputs: [], outputs: [], setor, ...extra }; };

  FORMULAS_EDIFICIOS.forEach(conf => {
    ee(conf.nomeEdificio, conf.setor, { isProducao: true });
    conf.formulas.forEach(f => {
      Object.keys(f.input  || {}).forEach(id => { ep(id); if (!edMap[conf.nomeEdificio].inputs.includes(id))  edMap[conf.nomeEdificio].inputs.push(id);  if (!prodMap[id].consumidores.includes(conf.nomeEdificio)) prodMap[id].consumidores.push(conf.nomeEdificio); });
      Object.keys(f.output || {}).forEach(id => { ep(id); if (!edMap[conf.nomeEdificio].outputs.includes(id)) edMap[conf.nomeEdificio].outputs.push(id); if (!prodMap[id].produtores.includes(conf.nomeEdificio))  prodMap[id].produtores.push(conf.nomeEdificio); });
    });
  });
  SALES_EDIFICIOS.forEach(conf => {
    ee(conf.nomeEdificio, conf.setor, { isVenda: true });
    conf.formulas?.forEach(f => {
      ep(f.produto);
      if (!edMap[conf.nomeEdificio].inputs.includes(f.produto)) edMap[conf.nomeEdificio].inputs.push(f.produto);
      if (!prodMap[f.produto].vendedores.includes(conf.nomeEdificio)) prodMap[f.produto].vendedores.push(conf.nomeEdificio);
    });
  });
  Object.values(storageProfiles).forEach(prof => {
    ee(prof.nome, 'imobiliario', { isArmazem: true, capacidade: prof.capacidadePorEdificio });
    const cats = Array.isArray(prof.categoriasPermitidas) ? prof.categoriasPermitidas : [prof.categoriasPermitidas];
    cats.forEach(cat => { if (!armMap[cat]) armMap[cat] = []; armMap[cat].push(prof); });
  });
  return { prodMap, edMap, armMap };
}

// ════════════════════════════════════════════════════════════
// FLUXO DE PRODUTO
// ════════════════════════════════════════════════════════════
function calcFluxo(edificiosFinais, pid, prodMap) {
  const pm = prodMap[pid]; if (!pm) return null;
  let prod = 0, venda = 0;
  pm.produtores.forEach(n => {
    const qtd = getEdQtd(edificiosFinais, n); if (!qtd) return;
    const conf = FORMULAS_EDIFICIOS.find(e => e.nomeEdificio === n); if (!conf) return;
    conf.formulas.forEach(f => { const o = f.output?.[pid] || 0; if (o) prod += (o / (f.duracao || 1)) * qtd; });
  });
  pm.vendedores.forEach(n => { const q = getEdQtd(edificiosFinais, n); if (q) venda += q * 1.5; });
  const liquido   = prod - venda;
  const cobertura = venda > 0 ? prod / venda : prod > 0 ? Infinity : 0;
  const status    = prod === 0 && venda === 0 ? 'inativo'
    : prod === 0   ? 'sem_producao'
    : venda === 0  ? 'sem_venda'
    : liquido > 1  ? 'acumulo'
    : liquido < -1 ? 'sangramento'
    : 'equilibrio';
  return { prod, venda, liquido, cobertura, status };
}

// ════════════════════════════════════════════════════════════
// EFICIÊNCIA CONTÍNUA
// ════════════════════════════════════════════════════════════
function calcEfic(edNome, fluxosProdutos) {
  const conf = FORMULAS_EDIFICIOS.find(c => c.nomeEdificio === edNome);
  if (!conf) return 100;
  const outputs = [...new Set(conf.formulas.flatMap(f => Object.keys(f.output || {})))];
  if (!outputs.length) return 100;
  let soma = 0, peso = 0;
  outputs.forEach(pid => {
    const f = fluxosProdutos[pid]; const pt = f?.prod || 0; if (!pt) return;
    const util = f.venda > 0 ? Math.min(f.venda / pt, 1) : 0;
    const ef   = f.status === 'sem_venda'    ? util * 0.2
               : f.status === 'acumulo'      ? Math.max(0.3, util)
               : f.status === 'sangramento'  ? 0.5 + util * 0.5
               : f.status === 'equilibrio'   ? 1.0 : util;
    soma += ef * pt; peso += pt;
  });
  return peso > 0 ? Math.round(Math.max(0, Math.min(100, (soma / peso) * 100))) : 100;
}

// ════════════════════════════════════════════════════════════
// MOTOR PRINCIPAL — recebe edificiosFinais em vez de dados
// ════════════════════════════════════════════════════════════
function analisar(edificiosFinais, graph, econGlobal, econPorSetor) {
  const { prodMap, edMap, armMap } = graph;

  // Fluxos de produtos
  const fluxosProdutos = {};
  Object.keys(prodMap).forEach(pid => {
    const f = calcFluxo(edificiosFinais, pid, prodMap);
    if (f && f.status !== 'inativo') fluxosProdutos[pid] = f;
  });

  // Edifícios ativos (quantidade > 0) — merge estático + dinâmico
  const edificiosAtivos = [];
  SETORES.forEach(s => {
    const edEstArr = EDIFICIOS_FINAIS_ESTATICOS[s]?.edificios || [];
    const edDinArr = edificiosFinais[s] || [];
    edEstArr.forEach((edEst, idx) => {
      const qtd = edDinArr[idx]?.quantidade ?? 0;
      if (!qtd) return;
      const fin = calcFin(edEst, qtd, econGlobal, econPorSetor?.[s] || 'estável');
      const ef  = calcEfic(edEst.nome, fluxosProdutos);
      edificiosAtivos.push({ ...edEst, quantidade: qtd, setor: s, ...fin, eficiencia: ef, lucroUnit: fin.lucro / qtd });
    });
  });

  // Edifícios disponíveis (não construídos + com licença)
  const edificiosDisponiveis = [];
  SETORES.forEach(s => {
    const edEstArr = EDIFICIOS_FINAIS_ESTATICOS[s]?.edificios || [];
    const edDinArr = edificiosFinais[s] || [];
    edEstArr.forEach((edEst, idx) => {
      const qtd      = edDinArr[idx]?.quantidade ?? 0;
      const liberado = edDinArr[idx]?.liberado !== false;
      if (qtd > 0 || !liberado) return;
      edificiosDisponiveis.push({ ...edEst, quantidade: 0, setor: s });
    });
  });

  const gargalos = Object.entries(fluxosProdutos)
    .filter(([, f]) => f.status === 'sangramento' || f.status === 'sem_producao')
    .map(([pid, f]) => ({ pid, prod: productsCatalog[pid], fluxo: f, sev: f.status === 'sangramento' ? Math.abs(f.liquido) / Math.max(f.venda, 0.1) : 1 }))
    .sort((a, b) => b.sev - a.sev);

  // Pressão de estoque
  const pressaoEstoque = {};
  Object.keys(armMap).forEach(cat => {
    const arms = armMap[cat];
    const capExterno = arms.reduce((s, a) => s + getEdQtd(edificiosFinais, a.nome) * a.capacidadePorEdificio, 0);
    const prodsDaCat = Object.keys(prodMap).filter(id => productsCatalog[id]?.categoriaFisica === cat);
    let entradaDia = 0, saidaDia = 0;
    prodsDaCat.forEach(pid => { const f = fluxosProdutos[pid]; if (!f) return; entradaDia += f.prod; saidaDia += f.venda; });
    if (!entradaDia && !capExterno) return;
    const taxa      = entradaDia - saidaDia;
    const diasLotar = taxa > 0 && capExterno > 0 ? capExterno / taxa : Infinity;
    const diasZerar = taxa < 0 && capExterno > 0 ? capExterno / Math.abs(taxa) : Infinity;
    const status    = capExterno === 0 && entradaDia > 0 ? 'baixo'
      : diasLotar < 5  ? 'critico'
      : diasLotar < 15 ? 'atencao'
      : 'ok';
    pressaoEstoque[cat] = { capExterno, entradaDia, saidaDia, taxa, diasLotar, diasZerar, prods: prodsDaCat, status, arms };
  });

  const fat      = edificiosAtivos.reduce((s, e) => s + e.fat,      0);
  const impostos = edificiosAtivos.reduce((s, e) => s + e.impostos, 0);
  const lucro    = edificiosAtivos.reduce((s, e) => s + e.lucro,    0);
  const margem   = fat > 0 ? (lucro / fat) * 100 : 0;

  const cadeias          = detectarCadeias(edificiosFinais, graph, fluxosProdutos);
  const cadeiasSaudaveis = cadeias.filter(c => c.completo && !c.prodsSemDestino.length).length;

  return { edificiosAtivos, edificiosDisponiveis, fluxosProdutos, gargalos, pressaoEstoque, fat, impostos, lucro, margem, cadeias, cadeiasSaudaveis, totalCadeias: cadeias.length };
}

// ════════════════════════════════════════════════════════════
// DETECÇÃO DE CADEIAS
// ════════════════════════════════════════════════════════════
function detectarCadeias(edificiosFinais, graph, fluxosProdutos) {
  const { prodMap, edMap } = graph;
  const ativos = new Set();
  SETORES.forEach(s => {
    const edEstArr = EDIFICIOS_FINAIS_ESTATICOS[s]?.edificios || [];
    const edDinArr = edificiosFinais[s] || [];
    edEstArr.forEach((ed, idx) => { if ((edDinArr[idx]?.quantidade ?? 0) > 0) ativos.add(ed.nome); });
  });
  if (!ativos.size) return [];

  const visitados = new Set(), cadeias = [];
  const bfs = inicio => {
    const nos = new Set([inicio]), prods = new Set(), fila = [inicio];
    while (fila.length) {
      const cur = fila.shift(), conf = edMap[cur]; if (!conf) continue;
      [...(conf.inputs || []), ...(conf.outputs || [])].forEach(pid => {
        prods.add(pid);
        const pm = prodMap[pid]; if (!pm) return;
        [...pm.produtores, ...pm.consumidores, ...pm.vendedores].forEach(v => { if (ativos.has(v) && !nos.has(v)) { nos.add(v); fila.push(v); } });
      });
    }
    return { nos: [...nos], prods: [...prods] };
  };

  ativos.forEach(nome => {
    if (visitados.has(nome)) return;
    const { nos, prods } = bfs(nome);
    nos.forEach(n => visitados.add(n));
    if (nos.length < 2) return;
    const producao = nos.filter(n => edMap[n]?.isProducao);
    const venda    = nos.filter(n => edMap[n]?.isVenda);
    const pPV      = prods.filter(id => productsCatalog[id]).sort((a, b) => (marketPrices[b] || 0) - (marketPrices[a] || 0));
    const icones   = pPV.slice(0, 4).map(id => productsCatalog[id]?.icon || '').join('');
    const top2     = pPV.slice(0, 2).map(id => productsCatalog[id]?.nome?.split(' ')[0] || '').filter(Boolean);
    const titulo   = top2.length > 1 ? `${top2[0]} → ${top2[1]}` : top2[0] || `Cadeia #${cadeias.length + 1}`;
    const prodsSemDestino = [];
    nos.forEach(en => { (edMap[en]?.outputs || []).forEach(pid => { const pm = prodMap[pid]; if (!pm) return; if (![...pm.consumidores, ...pm.vendedores].some(n => ativos.has(n))) prodsSemDestino.push(pid); }); });
    cadeias.push({ id: `eco_${cadeias.length}`, titulo, icones, nos, producao, venda, produtos: pPV, prodsSemDestino: [...new Set(prodsSemDestino)], tamanho: nos.length, completo: producao.length > 0 && venda.length > 0 });
  });
  return cadeias.sort((a, b) => b.nos.length - a.nos.length);
}

// ════════════════════════════════════════════════════════════
// UI BASE
// ════════════════════════════════════════════════════════════
const S = {
  card:     (glow) => ({ background: 'rgba(255,255,255,.04)', border: `1px solid ${glow ? glow + '50' : 'rgba(255,255,255,.1)'}`, borderRadius: 12, padding: '14px 16px', boxShadow: glow ? `0 0 22px ${glow}20` : 'none', marginBottom: 10 }),
  secTitle: { fontSize: 13, fontWeight: 800, color: '#fff', fontFamily: "'Rajdhani',sans-serif", letterSpacing: '.04em', marginBottom: 4 },
  secSub:   { fontSize: 10, color: 'rgba(255,255,255,.35)', marginBottom: 10 },
  label:    { fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,.45)', fontFamily: "'Rajdhani',sans-serif" },
  val:      (cor) => ({ fontSize: 13, fontWeight: 800, color: cor || '#fff', fontFamily: "'Rajdhani',sans-serif" }),
  tag:      (cor) => ({ fontSize: 9, fontWeight: 800, padding: '2px 8px', borderRadius: 5, background: `${cor}20`, color: cor, border: `1px solid ${cor}40`, display: 'inline-block', marginRight: 4, marginBottom: 4 }),
};
const Card      = ({ children, glow, style = {} }) => <div style={{ ...S.card(glow), ...style }}>{children}</div>;
const Divider   = () => <div style={{ height: 1, background: 'rgba(255,255,255,.06)', margin: '8px 0' }} />;
const StatBox   = ({ label, value, cor, icon }) => (
  <div style={{ textAlign: 'center', padding: '10px 6px' }}>
    <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(255,255,255,.35)', marginBottom: 5 }}>{label}</div>
    <div style={{ fontSize: 22, fontWeight: 900, color: cor || '#fff', fontFamily: "'Rajdhani',sans-serif", lineHeight: 1 }}>{icon && <span style={{ marginRight: 5 }}>{icon}</span>}{value}</div>
  </div>
);
const Insight   = ({ emoji, texto, cor = '#FFD700' }) => (
  <div style={{ background: `${cor}0e`, border: `1px solid ${cor}35`, borderRadius: 9, padding: '10px 13px', display: 'flex', gap: 9, alignItems: 'flex-start', marginBottom: 7 }}>
    <span style={{ fontSize: 16, flexShrink: 0 }}>{emoji}</span>
    <span style={{ fontSize: 11, color: 'rgba(255,255,255,.75)', lineHeight: 1.55, fontFamily: "'Rajdhani',sans-serif" }}>{texto}</span>
  </div>
);
const Bar       = ({ label, value, max, cor, right, sub, icon }) => {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div style={{ marginBottom: 9 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', fontFamily: "'Rajdhani',sans-serif", fontWeight: 700 }}>{icon && <span style={{ marginRight: 4 }}>{icon}</span>}{label}{sub && <span style={{ marginLeft: 6, fontSize: 9, color: 'rgba(255,255,255,.3)' }}>{sub}</span>}</span>
        <span style={{ fontSize: 11, fontWeight: 800, color: cor || '#fff', fontFamily: "'Rajdhani',sans-serif" }}>{right}</span>
      </div>
      <div style={{ height: 7, background: 'rgba(255,255,255,.07)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: cor || '#7aff9a', borderRadius: 4, transition: 'width .5s' }} />
      </div>
    </div>
  );
};
const ViewScroll = ({ children }) => (
  <div className="aia-inner" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '14px 14px 24px' }}>
    {children}
  </div>
);

// ════════════════════════════════════════════════════════════
// VISÃO 1 — SAÚDE
// ════════════════════════════════════════════════════════════
function VisaoSaude({ analise, edificiosFinais }) {
  const { edificiosAtivos, gargalos, lucro, fat, margem, cadeias, cadeiasSaudaveis, totalCadeias, fluxosProdutos } = analise;

  const score = useMemo(() => {
    let s = 100;
    s -= Math.min(gargalos.length * 8, 30);
    const sang = Object.values(fluxosProdutos).filter(f => f.status === 'sangramento').length;
    s -= Math.min(sang * 5, 25);
    if (margem < 0)   s -= 25;
    else if (margem < 10) s -= 12;
    return Math.max(0, Math.round(s));
  }, [gargalos, fluxosProdutos, margem]);

  const scoreCor   = score >= 75 ? '#7aff9a' : score >= 50 ? '#FFD700' : '#ff6b6b';
  const scoreLabel = score >= 75 ? 'Saudável' : score >= 50 ? 'Atenção' : 'Crítico';

  const stCounts = useMemo(() => {
    const c = { equilibrio: 0, acumulo: 0, sangramento: 0, sem_venda: 0, sem_producao: 0 };
    Object.values(fluxosProdutos).forEach(f => { if (c[f.status] !== undefined) c[f.status]++; });
    return c;
  }, [fluxosProdutos]);

  const porSetor = useMemo(() => SETORES.map(s => {
    const edEstArr = EDIFICIOS_FINAIS_ESTATICOS[s]?.edificios || [];
    const edDinArr = edificiosFinais[s] || [];
    let count = 0, fat = 0;
    edEstArr.forEach((ed, idx) => {
      const qtd = edDinArr[idx]?.quantidade ?? 0;
      if (!qtd) return;
      count++;
      fat += (ed.finanças?.faturamentoUnitário || 0) * qtd;
    });
    return { setor: s, count, fat };
  }).filter(s => s.count > 0), [edificiosFinais]);
  const maxFat = Math.max(...porSetor.map(s => s.fat), 1);

  const insights = [];
  if (gargalos.length)          insights.push({ emoji: '🔴', texto: `${gargalos.length} gargalo(s) crítico(s). Principal: ${gargalos[0].prod?.nome || gargalos[0].pid}.`, cor: '#ff6b6b' });
  if (margem < 10 && fat > 0)   insights.push({ emoji: '💸', texto: `Margem líquida baixa (${margem.toFixed(1)}%). Verifique os impostos fixos na aba Econômico.`, cor: '#FFD700' });
  if (!insights.length && edificiosAtivos.length > 0) insights.push({ emoji: '✅', texto: 'Nenhum problema crítico detectado. Bom trabalho!', cor: '#7aff9a' });
  if (!edificiosAtivos.length)  insights.push({ emoji: '🏗️', texto: 'Nenhum edifício construído ainda.', cor: '#7ac8ff' });

  return (
    <ViewScroll>
      <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 1fr', gap: 9, marginBottom: 12 }}>
        <Card glow={scoreCor} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '14px 8px' }}>
          <div style={{ fontSize: 38, fontWeight: 900, color: scoreCor, fontFamily: "'Rajdhani',sans-serif", lineHeight: 1 }}>{score}</div>
          <div style={{ fontSize: 10, fontWeight: 800, color: scoreCor, textTransform: 'uppercase', letterSpacing: '.1em', marginTop: 3 }}>{scoreLabel}</div>
        </Card>
        <Card style={{ textAlign: 'center' }}><StatBox label="Lucro líquido/mês" value={fmtR(lucro)} cor={lucro >= 0 ? '#7aff9a' : '#ff6b6b'} /></Card>
        <Card style={{ textAlign: 'center' }}><StatBox label="Margem global" value={`${margem.toFixed(1)}%`} cor={margem >= 25 ? '#7aff9a' : margem >= 10 ? '#FFD700' : '#ff6b6b'} /></Card>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 9, marginBottom: 12 }}>
        <Card style={{ textAlign: 'center' }}><StatBox label="Gargalos"     value={gargalos.length}          cor={gargalos.length > 0 ? '#ff6b6b' : '#7aff9a'} /></Card>
        <Card style={{ textAlign: 'center' }}><StatBox label="Cadeias OK"   value={`${cadeiasSaudaveis}/${totalCadeias}`} cor="#C87AFF" /></Card>
        <Card style={{ textAlign: 'center' }}><StatBox label="Edif. ativos" value={edificiosAtivos.length}  cor="#7ac8ff" /></Card>
      </div>
      <Card>
        <div style={S.secTitle}>Status dos Fluxos</div>
        <div style={S.secSub}>Quantos produtos em cada estado</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
          {[
            { key: 'equilibrio',   l: 'Equilib.',  cor: '#7aff9a', ic: '✅' },
            { key: 'acumulo',      l: 'Acúmulo',   cor: '#7ac8ff', ic: '🔵' },
            { key: 'sangramento',  l: 'Sangr.',    cor: '#ff6b6b', ic: '🔴' },
            { key: 'sem_venda',    l: 'S/Venda',   cor: '#C87AFF', ic: '📦' },
            { key: 'sem_producao', l: 'S/Prod.',   cor: '#FFD700', ic: '⚠️' },
          ].map(({ key, l, cor, ic }) => (
            <div key={key} style={{ background: `${cor}0e`, border: `1px solid ${cor}35`, borderRadius: 9, padding: '8px 4px', textAlign: 'center' }}>
              <div style={{ fontSize: 15 }}>{ic}</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: cor, fontFamily: "'Rajdhani',sans-serif" }}>{stCounts[key]}</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,.35)', marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </Card>
      {porSetor.length > 0 && (
        <Card>
          <div style={S.secTitle}>Atividade por Setor</div>
          <div style={S.secSub}>Faturamento bruto estimado</div>
          {porSetor.map(s => { const cfg = SETOR_CONFIG[s.setor]; return <Bar key={s.setor} label={cfg.label} icon={cfg.icon} value={s.fat} max={maxFat} cor={cfg.cor} right={fmtR(s.fat)} sub={`${s.count} ativo${s.count > 1 ? 's' : ''}`} />; })}
        </Card>
      )}
      <Card><div style={S.secTitle}>Insights Automáticos</div>{insights.map((ins, i) => <Insight key={i} {...ins} />)}</Card>
    </ViewScroll>
  );
}

// ════════════════════════════════════════════════════════════
// VISÃO 2 — GARGALOS
// ════════════════════════════════════════════════════════════
function VisaoGargalos({ analise, graph }) {
  const { gargalos, fluxosProdutos, cadeias } = analise;
  const { prodMap, edMap } = graph;
  const sangramento      = Object.entries(fluxosProdutos).filter(([, f]) => f.status === 'sangramento').map(([pid, f]) => ({ pid, prod: productsCatalog[pid], fluxo: f })).sort((a, b) => Math.abs(b.fluxo.liquido) - Math.abs(a.fluxo.liquido));
  const semVenda         = Object.entries(fluxosProdutos).filter(([, f]) => f.status === 'sem_venda').map(([pid, f]) => ({ pid, prod: productsCatalog[pid], fluxo: f }));
  const cadeiasSemVenda  = cadeias.filter(c => !c.completo && c.producao.length > 0);

  return (
    <ViewScroll>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 9, marginBottom: 12 }}>
        <Card glow={sangramento.length > 0 ? '#ff6b6b' : undefined} style={{ textAlign: 'center' }}><StatBox label="Sangramentos"       value={sangramento.length}     cor={sangramento.length > 0 ? '#ff6b6b' : '#7aff9a'} icon="🔴" /></Card>
        <Card glow={semVenda.length > 0 ? '#C87AFF' : undefined}    style={{ textAlign: 'center' }}><StatBox label="Sem venda"          value={semVenda.length}        cor={semVenda.length > 0 ? '#C87AFF' : '#7aff9a'}   icon="📦" /></Card>
        <Card glow={cadeiasSemVenda.length > 0 ? '#FFD700' : undefined} style={{ textAlign: 'center' }}><StatBox label="Cadeias incompletas" value={cadeiasSemVenda.length} cor={cadeiasSemVenda.length > 0 ? '#FFD700' : '#7aff9a'} /></Card>
      </div>
      {!sangramento.length && !semVenda.length && !cadeiasSemVenda.length && <Insight emoji="✅" texto="Nenhum gargalo crítico detectado. Seus fluxos estão saudáveis!" cor="#7aff9a" />}
      {cadeiasSemVenda.length > 0 && (
        <Card glow="#FFD700">
          <div style={S.secTitle}>⛓️ Cadeias Incompletas</div>
          <div style={S.secSub}>Produção existe mas falta canal de venda</div>
          {cadeiasSemVenda.map(c => (
            <div key={c.id} style={{ background: 'rgba(255,215,0,.05)', border: '1px solid rgba(255,215,0,.2)', borderRadius: 10, padding: '10px 12px', marginBottom: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', fontFamily: "'Rajdhani',sans-serif", marginBottom: 4 }}>{c.icones} {c.titulo}</div>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4, marginBottom: 6 }}>
                {c.producao.slice(0, 4).map((edNome, i) => { const s = edMap[edNome]?.setor; const cfg = SETOR_CONFIG[s] || SETOR_CONFIG.industria; return (<React.Fragment key={edNome}>{i > 0 && <span style={{ color: 'rgba(255,255,255,.3)', fontSize: 14 }}>→</span>}<div style={{ background: `${cfg.cor}20`, border: `1px solid ${cfg.cor}50`, borderRadius: 6, padding: '3px 8px', fontSize: 10, color: cfg.cor, fontWeight: 700, fontFamily: "'Rajdhani',sans-serif" }}>{cfg.icon} {edNome}</div></React.Fragment>); })}
                {c.producao.length > 0 && (<><span style={{ color: 'rgba(255,255,255,.3)', fontSize: 14 }}>→</span><div style={{ background: 'rgba(255,107,107,.15)', border: '1px solid rgba(255,107,107,.4)', borderRadius: 6, padding: '3px 8px', fontSize: 10, color: '#ff6b6b', fontWeight: 800, fontFamily: "'Rajdhani',sans-serif" }}>❌ Sem venda</div></>)}
              </div>
              <Insight emoji="💡" texto="Construa um ponto de venda para monetizar esta cadeia." cor="#FFD700" />
            </div>
          ))}
        </Card>
      )}
      {sangramento.length > 0 && (
        <Card glow="#ff6b6b">
          <div style={S.secTitle}>🔴 Sangramentos</div>
          <div style={S.secSub}>Venda consome mais do que a produção entrega</div>
          {sangramento.map(({ pid, prod, fluxo }) => {
            const maxBar     = Math.max(fluxo.prod, fluxo.venda, 0.1);
            const produtores = (prodMap[pid]?.produtores || []).filter(n => edMap[n]);
            return (
              <div key={pid} style={{ background: 'rgba(255,107,107,.06)', border: '1px solid rgba(255,107,107,.25)', borderRadius: 10, padding: '11px 13px', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
                  <span style={{ fontSize: 22 }}>{prod?.icon || '❓'}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: "'Rajdhani',sans-serif" }}>{prod?.nome || pid}</div>
                    <div style={{ fontSize: 11, color: '#ff6b6b', fontWeight: 700 }}>Déficit: {fmt(Math.abs(fluxo.liquido))}/dia · Cobertura: {(fluxo.cobertura * 100).toFixed(0)}%</div>
                  </div>
                </div>
                <Bar label="Produção" value={fluxo.prod}  max={maxBar} cor="#7ac8ff" right={`+${fmt(fluxo.prod)}/d`}  />
                <Bar label="Venda"    value={fluxo.venda} max={maxBar} cor="#ff6b6b" right={`-${fmt(fluxo.venda)}/d`} />
                {produtores.length > 0 && <Insight emoji="💡" texto={`Construa mais "${produtores[0]}" para aumentar a oferta de ${prod?.nome || pid}.`} cor="#FFD700" />}
              </div>
            );
          })}
        </Card>
      )}
      {semVenda.length > 0 && (
        <Card glow="#C87AFF">
          <div style={S.secTitle}>📦 Produtos Sem Venda</div>
          <div style={S.secSub}>Produção ativa sem canal de venda</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {semVenda.map(({ pid, prod, fluxo }) => {
              const vendedores = prodMap[pid]?.vendedores || [];
              return (
                <div key={pid} style={{ background: 'rgba(200,122,255,.08)', border: '1px solid rgba(200,122,255,.25)', borderRadius: 9, padding: '9px 11px', flex: '1 1 130px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}><span style={{ fontSize: 18 }}>{prod?.icon || '❓'}</span><div style={{ fontSize: 11, fontWeight: 700, color: '#fff', fontFamily: "'Rajdhani',sans-serif" }}>{prod?.nome || pid}</div></div>
                  <div style={{ fontSize: 11, color: '#7ac8ff', fontWeight: 700 }}>+{fmt(fluxo.prod)}/d produzido</div>
                  {vendedores.length > 0 && <div style={{ fontSize: 10, color: 'rgba(255,255,255,.4)', marginTop: 3 }}>Via: {vendedores[0]}</div>}
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </ViewScroll>
  );
}

// ════════════════════════════════════════════════════════════
// VISÃO 3 — ECONÔMICO
// ════════════════════════════════════════════════════════════
function VisaoEconomico({ analise }) {
  const { edificiosAtivos, fat, impostos, lucro, margem } = analise;
  const [aberto, setAberto] = useState(null);
  const impFixoTotal = edificiosAtivos.reduce((s, e) => s + (e.impFixo || 0), 0);
  const impFatuTotal = edificiosAtivos.reduce((s, e) => s + (e.impFatu || 0), 0);
  const porSetor = useMemo(() => {
    const m = {};
    edificiosAtivos.forEach(ed => {
      if (!m[ed.setor]) m[ed.setor] = { fat: 0, impostos: 0, lucro: 0 };
      m[ed.setor].fat += ed.fat; m[ed.setor].impostos += ed.impostos; m[ed.setor].lucro += ed.lucro;
    });
    return Object.entries(m).map(([s, d]) => ({ setor: s, ...d })).sort((a, b) => b.lucro - a.lucro);
  }, [edificiosAtivos]);
  const rankingEds = [...edificiosAtivos].sort((a, b) => b.lucro - a.lucro);
  const maxL = Math.max(...rankingEds.map(e => Math.abs(e.lucro)), 1);

  return (
    <ViewScroll>
      <Card glow={lucro < 0 ? '#ff6b6b' : '#7aff9a'}>
        <div style={S.secTitle}>💰 Resultado Mensal Real</div>
        <div style={S.secSub}>Faturamento × economia − impostos fixos − imposto s/faturamento</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
          {[{ l: 'Faturamento bruto', v: fmtR(fat), c: '#7ac8ff' }, { l: 'Total impostos', v: `−${fmtR(impostos)}`, c: '#ff6b6b' }, { l: 'Lucro líquido', v: fmtR(lucro), c: lucro >= 0 ? '#7aff9a' : '#ff6b6b' }].map(({ l, v, c }) => (
            <div key={l} style={{ textAlign: 'center' }}><div style={{ fontSize: 10, color: 'rgba(255,255,255,.35)', marginBottom: 3 }}>{l}</div><div style={{ fontSize: 16, fontWeight: 900, color: c, fontFamily: "'Rajdhani',sans-serif" }}>{v}</div></div>
          ))}
        </div>
        <div style={{ background: 'rgba(255,107,107,.07)', borderRadius: 9, padding: '9px 11px', marginBottom: 9 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,.4)', marginBottom: 7 }}>COMPOSIÇÃO DOS IMPOSTOS</div>
          <Bar label="Imposto fixo (a cada 30d)"  value={impFixoTotal} max={Math.max(impostos, 0.1)} cor="#ff9090" right={fmtR(impFixoTotal)} />
          <Bar label="Imposto s/ faturamento (%)" value={impFatuTotal} max={Math.max(impostos, 0.1)} cor="#ff6b6b" right={fmtR(impFatuTotal)} />
        </div>
        <div style={{ textAlign: 'center' }}><span style={S.tag(margem >= 25 ? '#7aff9a' : margem >= 10 ? '#FFD700' : '#ff6b6b')}>Margem líquida: {margem.toFixed(1)}%</span></div>
      </Card>
      {porSetor.length > 0 && (
        <Card>
          <div style={S.secTitle}>📊 Por Setor (lucro líquido)</div>
          {porSetor.map(s => { const cfg = SETOR_CONFIG[s.setor]; const maxAbs = Math.max(...porSetor.map(x => Math.abs(x.lucro)), 1); const cor = s.lucro >= 0 ? cfg.cor : '#ff6b6b'; return (<div key={s.setor} style={{ marginBottom: 8 }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}><span style={{ fontSize: 11, color: 'rgba(255,255,255,.55)', fontFamily: "'Rajdhani',sans-serif", fontWeight: 700 }}>{cfg.icon} {cfg.label}</span><span style={{ fontSize: 11, fontWeight: 800, color: cor, fontFamily: "'Rajdhani',sans-serif" }}>{fmtR(s.lucro)} <span style={{ fontSize: 9, color: 'rgba(255,255,255,.3)' }}>({s.fat > 0 ? ((s.lucro / s.fat) * 100).toFixed(0) : 0}%)</span></span></div><div style={{ height: 7, background: 'rgba(255,255,255,.07)', borderRadius: 4, overflow: 'hidden' }}><div style={{ height: '100%', width: `${(Math.abs(s.lucro) / maxAbs) * 100}%`, background: cor, borderRadius: 4 }} /></div></div>); })}
        </Card>
      )}
      <Card>
        <div style={S.secTitle}>🏆 Ranking por Lucro Líquido</div>
        <div style={S.secSub}>Clique para expandir detalhes de impostos</div>
        {rankingEds.slice(0, 20).map((ed, i) => {
          const cfg = SETOR_CONFIG[ed.setor] || SETOR_CONFIG.industria; const corL = ed.lucro >= 0 ? '#7aff9a' : '#ff6b6b'; const isOpen = aberto === ed.nome;
          return (
            <div key={ed.nome}>
              <div onClick={() => setAberto(isOpen ? null : ed.nome)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,.05)', cursor: 'pointer' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,.2)', width: 22, textAlign: 'center' }}>#{i + 1}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}><span style={{ fontSize: 9, color: cfg.cor }}>{cfg.icon}</span><span style={{ fontSize: 12, fontWeight: 700, color: '#fff', fontFamily: "'Rajdhani',sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ed.nome}</span><span style={{ fontSize: 10, color: 'rgba(255,255,255,.35)' }}>×{ed.quantidade}</span></div>
                  <div style={{ height: 5, background: 'rgba(255,255,255,.06)', borderRadius: 3, overflow: 'hidden' }}><div style={{ height: '100%', width: `${(Math.abs(ed.lucro) / maxL) * 100}%`, background: corL, borderRadius: 3 }} /></div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}><div style={{ fontSize: 12, fontWeight: 800, color: corL, fontFamily: "'Rajdhani',sans-serif" }}>{fmtR(ed.lucro)}</div><div style={{ fontSize: 9, color: 'rgba(255,255,255,.3)' }}>/mês</div></div>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,.25)' }}>{isOpen ? '▲' : '▼'}</span>
              </div>
              {isOpen && (<div style={{ background: 'rgba(0,0,0,.3)', borderRadius: 8, padding: '9px 11px', margin: '3px 0 6px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>{[{ l: 'Fat. bruto', v: fmtR(ed.fat), c: '#7ac8ff' }, { l: 'Imp. fixo', v: fmtR(ed.impFixo), c: '#ff9090' }, { l: 'Imp. fatu.', v: fmtR(ed.impFatu), c: '#ff6b6b' }, { l: 'Impostos', v: fmtR(ed.impostos), c: '#ff6b6b' }, { l: 'Lucro/un.', v: fmtR(ed.lucroUnit), c: ed.lucroUnit >= 0 ? '#7aff9a' : '#ff6b6b' }, { l: 'Margem', v: `${(ed.margem || 0).toFixed(1)}%`, c: ed.margem >= 20 ? '#7aff9a' : '#FFD700' }].map(({ l, v, c }) => (<div key={l} style={{ textAlign: 'center' }}><div style={{ fontSize: 9, color: 'rgba(255,255,255,.35)' }}>{l}</div><div style={{ fontSize: 12, fontWeight: 800, color: c, fontFamily: "'Rajdhani',sans-serif" }}>{v}</div></div>))}</div>)}
            </div>
          );
        })}
      </Card>
    </ViewScroll>
  );
}

// ════════════════════════════════════════════════════════════
// VISÃO 4 — ESTOQUE
// ════════════════════════════════════════════════════════════
function VisaoEstoque({ analise, edificiosFinais, graph }) {
  const { pressaoEstoque } = analise;
  const { armMap }         = graph;
  const stCfg = {
    critico: { cor: '#ff6b6b', label: '🔴 Crítico — lotará em breve',  bg: 'rgba(255,107,107,.07)' },
    atencao: { cor: '#FFD700', label: '🟡 Atenção — pressão alta',      bg: 'rgba(255,215,0,.06)'   },
    baixo:   { cor: '#7ac8ff', label: '🔵 Capacidade baixa',            bg: 'rgba(122,200,255,.05)' },
    ok:      { cor: '#7aff9a', label: '✅ Adequado',                    bg: 'rgba(122,255,154,.04)' },
  };
  const cats = useMemo(() => {
    const ordem = { critico: 0, atencao: 1, baixo: 2, ok: 3 };
    return Object.entries(pressaoEstoque).filter(([, i]) => i.entradaDia > 0).map(([cat, info]) => ({ cat, ...info })).sort((a, b) => ordem[a.status] - ordem[b.status]);
  }, [pressaoEstoque]);
  const totais = { critico: cats.filter(c => c.status === 'critico').length, atencao: cats.filter(c => c.status === 'atencao').length, baixo: cats.filter(c => c.status === 'baixo').length, ok: cats.filter(c => c.status === 'ok').length };

  return (
    <ViewScroll>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 12 }}>
        {[{ v: totais.critico, l: 'Crítico', c: '#ff6b6b' }, { v: totais.atencao, l: 'Atenção', c: '#FFD700' }, { v: totais.baixo, l: 'Cap. baixa', c: '#7ac8ff' }, { v: totais.ok, l: 'OK', c: '#7aff9a' }].map(({ v, l, c }) => (
          <Card key={l} glow={v > 0 && c !== '#7aff9a' ? c : undefined} style={{ textAlign: 'center' }}><StatBox label={l} value={v} cor={c} /></Card>
        ))}
      </div>
      {!cats.length && <Insight emoji="📦" texto="Nenhuma categoria com produção ativa detectada." cor="#FFD700" />}
      {cats.map(({ cat, capExterno, entradaDia, saidaDia, taxa, diasLotar, diasZerar, status, arms, prods }) => {
        const cfg    = stCfg[status] || stCfg.ok;
        const prodEx = (prods || []).slice(0, 3).map(pid => productsCatalog[pid]).filter(Boolean);
        const acumulando = taxa > 0;
        const prevTexto  = capExterno === 0 && entradaDia > 0 ? '📦 Apenas armazém nativo — considere armazém externo para escalar' : acumulando && isFinite(diasLotar) ? `⏱ Armazém externo lotará em ~${fmtD(diasLotar)}` : !acumulando && saidaDia > entradaDia && isFinite(diasZerar) && capExterno > 0 ? `⏱ Estoque externo zerado em ~${fmtD(diasZerar)}` : acumulando ? '↑ Acumulando' : '✅ Fluxo equilibrado';
        const prevCor    = status === 'critico' ? '#ff6b6b' : status === 'atencao' ? '#FFD700' : status === 'baixo' ? '#7ac8ff' : '#7aff9a';
        const recomendados = arms.filter(a => { const qtd = getEdQtd(edificiosFinais, a.nome); return qtd === 0 || (qtd * a.capacidadePorEdificio < entradaDia * 30); }).slice(0, 3);
        return (
          <Card key={cat} style={{ background: cfg.bg, borderColor: `${cfg.cor}35` }} glow={status !== 'ok' ? cfg.cor : undefined}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 9 }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{prodEx[0]?.icon || '📦'}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3, flexWrap: 'wrap' }}><span style={{ fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: "'Rajdhani',sans-serif" }}>{cat}</span><span style={S.tag(cfg.cor)}>{cfg.label}</span></div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,.4)' }}>{prodEx.map(p => `${p.icon} ${p.nome?.split(' ')[0]}`).join(' · ')}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}><div style={{ fontSize: 10, color: 'rgba(255,255,255,.35)' }}>cap. externa</div><div style={{ fontSize: 15, fontWeight: 800, color: cfg.cor, fontFamily: "'Rajdhani',sans-serif" }}>{capExterno > 0 ? fmt(capExterno) : '—'}</div></div>
            </div>
            <div style={{ background: `${prevCor}12`, border: `1px solid ${prevCor}35`, borderRadius: 8, padding: '6px 10px', marginBottom: 9, fontSize: 11, color: prevCor, fontFamily: "'Rajdhani',sans-serif", fontWeight: 700 }}>{prevTexto}</div>
            {(() => { const maxB = Math.max(entradaDia, saidaDia, 0.1); return (<><Bar label="Entrada/dia" value={entradaDia} max={maxB} cor="#7ac8ff" right={`+${fmt(entradaDia)}/d`} /><Bar label="Saída/dia" value={saidaDia} max={maxB} cor="#F27405" right={`-${fmt(saidaDia)}/d`} /><div style={{ fontSize: 11, color: taxa > 0 ? '#7ac8ff' : taxa < 0 ? '#F27405' : '#7aff9a', fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, marginBottom: 7 }}>Taxa líquida: {taxa >= 0 ? '+' : ''}{fmt(taxa)}/d</div></>); })()}
            {arms.length > 0 && (<div><div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,.4)', marginBottom: 5 }}>ARMAZÉNS PARA ESTA CATEGORIA</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: recomendados.length ? 8 : 0 }}>{arms.slice(0, 4).map(a => { const qtd = getEdQtd(edificiosFinais, a.nome); return (<div key={a.nome} style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 5, background: qtd > 0 ? 'rgba(100,17,217,.25)' : 'rgba(255,255,255,.05)', color: qtd > 0 ? '#C87AFF' : 'rgba(255,255,255,.35)', border: `1px solid ${qtd > 0 ? '#6411D960' : 'rgba(255,255,255,.1)'}` }}>{qtd > 0 ? `✓ ×${qtd}` : '○'} {a.nome} · {fmt(a.capacidadePorEdificio)}/ed</div>); })}</div></div>)}
            {recomendados.length > 0 && (<div style={{ background: 'rgba(100,17,217,.12)', border: '1px solid rgba(100,17,217,.3)', borderRadius: 8, padding: '8px 10px' }}><div style={{ fontSize: 10, fontWeight: 700, color: '#C87AFF', marginBottom: 5 }}>🏗️ RECOMENDADOS PARA AMPLIAR CAPACIDADE</div>{recomendados.map(a => { const qtd = getEdQtd(edificiosFinais, a.nome); return (<div key={a.nome} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}><div><span style={{ fontSize: 11, fontWeight: 700, color: '#fff', fontFamily: "'Rajdhani',sans-serif" }}>{a.nome}</span>{qtd > 0 && <span style={{ fontSize: 9, color: '#7aff9a', marginLeft: 6 }}>já tem ×{qtd}</span>}</div><span style={{ fontSize: 11, fontWeight: 800, color: '#C87AFF', fontFamily: "'Rajdhani',sans-serif" }}>{fmt(a.capacidadePorEdificio)}/ed</span></div>); })}</div>)}
          </Card>
        );
      })}
    </ViewScroll>
  );
}

// ════════════════════════════════════════════════════════════
// VISÃO 5 — EFICIÊNCIA
// ════════════════════════════════════════════════════════════
function VisaoEficiencia({ analise }) {
  const { edificiosAtivos } = analise;
  const [filtroSetor, setFiltroSetor] = useState(null);
  const ranking       = useMemo(() => [...edificiosAtivos].sort((a, b) => b.eficiencia - a.eficiencia), [edificiosAtivos]);
  const filtrados     = filtroSetor ? ranking.filter(e => e.setor === filtroSetor) : ranking;
  const setoresAtivos = [...new Set(edificiosAtivos.map(e => e.setor))];
  const efMedia       = edificiosAtivos.length ? Math.round(edificiosAtivos.reduce((s, e) => s + e.eficiencia, 0) / edificiosAtivos.length) : 0;
  const efCor         = v => v >= 80 ? '#7aff9a' : v >= 50 ? '#FFD700' : '#ff6b6b';

  return (
    <ViewScroll>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 9, marginBottom: 12 }}>
        <Card style={{ textAlign: 'center' }}><StatBox label="Edif. ativos" value={edificiosAtivos.length} cor="#7aff9a" icon="🏭" /></Card>
        <Card glow={efMedia < 50 ? '#ff6b6b' : undefined} style={{ textAlign: 'center' }}><StatBox label="Efic. média" value={`${efMedia}%`} cor={efCor(efMedia)} /></Card>
        <Card style={{ textAlign: 'center' }}><StatBox label="Críticos <50%" value={filtrados.filter(e => e.eficiencia < 50).length} cor="#ff6b6b" icon="⚠️" /></Card>
      </div>
      {ranking[0] && <Insight emoji="🏆" texto={`Melhor: "${ranking[0].nome}" — ${ranking[0].eficiencia}% eficiência · ${fmtR(ranking[0].lucroUnit)}/un/mês.`} cor="#7aff9a" />}
      {ranking[ranking.length - 1]?.eficiencia < 50 && <Insight emoji="⚠️" texto={`Pior: "${ranking[ranking.length - 1].nome}" — ${ranking[ranking.length - 1].eficiencia}%. Verifique o fluxo de saída.`} cor="#ff6b6b" />}
      {setoresAtivos.length > 1 && (<div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', margin: '8px 0 12px' }}><button onClick={() => setFiltroSetor(null)} style={{ fontSize: 10, fontWeight: 700, padding: '4px 11px', borderRadius: 6, border: 'none', cursor: 'pointer', background: !filtroSetor ? 'rgba(255,255,255,.22)' : 'rgba(255,255,255,.06)', color: !filtroSetor ? '#fff' : 'rgba(255,255,255,.45)', transition: 'all .15s' }}>Todos</button>{setoresAtivos.map(s => { const cfg = SETOR_CONFIG[s]; return <button key={s} onClick={() => setFiltroSetor(filtroSetor === s ? null : s)} style={{ fontSize: 10, fontWeight: 700, padding: '4px 11px', borderRadius: 6, border: 'none', cursor: 'pointer', background: filtroSetor === s ? `${cfg.cor}35` : 'rgba(255,255,255,.06)', color: filtroSetor === s ? cfg.cor : 'rgba(255,255,255,.45)', transition: 'all .15s' }}>{cfg.icon} {cfg.label}</button>; })}</div>)}
      <Card>
        <div style={S.secTitle}>⚡ Ranking de Eficiência</div>
        <div style={S.secSub}>Proporção da produção com saída real (0–100%)</div>
        {!filtrados.length
          ? <div style={{ fontSize: 12, color: 'rgba(255,255,255,.25)', textAlign: 'center', padding: '14px 0' }}>Nenhum edifício ativo.</div>
          : filtrados.map((ed, i) => {
            const cfg = SETOR_CONFIG[ed.setor] || SETOR_CONFIG.industria; const corE = efCor(ed.eficiencia); const corL = ed.lucro >= 0 ? '#7aff9a' : '#ff6b6b';
            return (
              <div key={ed.nome} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,.2)', width: 22, textAlign: 'center' }}>#{i + 1}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}><span style={{ fontSize: 9, color: cfg.cor }}>{cfg.icon}</span><span style={{ fontSize: 12, fontWeight: 700, color: '#fff', fontFamily: "'Rajdhani',sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ed.nome}</span><span style={{ fontSize: 10, color: 'rgba(255,255,255,.35)' }}>×{ed.quantidade}</span></div>
                  <div style={{ height: 6, background: 'rgba(255,255,255,.06)', borderRadius: 3, overflow: 'hidden' }}><div style={{ height: '100%', width: `${ed.eficiencia}%`, background: corE, borderRadius: 3, transition: 'width .5s' }} /></div>
                </div>
                <div style={{ display: 'flex', gap: 10, flexShrink: 0, alignItems: 'center' }}>
                  <div style={{ textAlign: 'center' }}><div style={{ fontSize: 15, fontWeight: 900, color: corE, fontFamily: "'Rajdhani',sans-serif" }}>{ed.eficiencia}%</div><div style={{ fontSize: 8, color: 'rgba(255,255,255,.3)' }}>efic.</div></div>
                  <div style={{ textAlign: 'right' }}><div style={{ fontSize: 12, fontWeight: 800, color: corL, fontFamily: "'Rajdhani',sans-serif" }}>{fmtR(ed.lucroUnit)}</div><div style={{ fontSize: 9, color: 'rgba(255,255,255,.3)' }}>lucro/un</div></div>
                </div>
              </div>
            );
          })
        }
      </Card>
    </ViewScroll>
  );
}

// ════════════════════════════════════════════════════════════
// VISÃO 6 — OPORTUNIDADES
// ════════════════════════════════════════════════════════════
function VisaoOportunidades({ analise, edificiosFinais, graph, econGlobal, econPorSetor }) {
  const { fluxosProdutos, cadeias, edificiosDisponiveis } = analise;
  const { prodMap, edMap } = graph;
  const cadeiasSemVenda = cadeias.filter(c => !c.completo && c.producao.length > 0);

  const subexplorados = useMemo(() => Object.entries(fluxosProdutos)
    .filter(([, f]) => f.status === 'sem_venda' || (f.status === 'acumulo' && f.liquido > 5))
    .map(([pid, f]) => {
      const pm    = prodMap[pid];
      const trans = (pm?.consumidores || []).filter(n => edMap[n]?.isProducao).map(n => {
        const conf = FORMULAS_EDIFICIOS.find(c => c.nomeEdificio === n);
        const outs = conf?.formulas?.flatMap(f2 => Object.keys(f2.output || {})) || [];
        return { edificio: n, setor: edMap[n]?.setor, maxOut: Math.max(...outs.map(id => marketPrices[id] || 0), 0) };
      }).sort((a, b) => b.maxOut - a.maxOut);
      return { pid, prod: productsCatalog[pid], fluxo: f, trans };
    }).filter(s => s.trans.length > 0 || (prodMap[s.pid]?.vendedores || []).length > 0),
    [fluxosProdutos, prodMap, edMap]
  );

  const oportunidades = useMemo(() => {
    const prodAtivos = new Set();
    SETORES.forEach(s => {
      const edEstArr = EDIFICIOS_FINAIS_ESTATICOS[s]?.edificios || [];
      const edDinArr = edificiosFinais[s] || [];
      edEstArr.forEach((ed, idx) => { if ((edDinArr[idx]?.quantidade ?? 0) > 0) (edMap[ed.nome]?.outputs || []).forEach(id => prodAtivos.add(id)); });
    });
    const lista = [], jaRec = new Set();
    edificiosDisponiveis.forEach(ed => {
      if (jaRec.has(ed.nome)) return;
      let score = 0, motivos = [];
      const confP = FORMULAS_EDIFICIOS.find(c => c.nomeEdificio === ed.nome);
      if (confP) {
        confP.formulas.forEach(f => {
          Object.keys(f.input  || {}).forEach(id => { if (prodAtivos.has(id)) { score += 20; const p = productsCatalog[id]; if (p) motivos.push({ icon: p.icon, nome: p.nome, tipo: 'input' }); } });
          Object.keys(f.output || {}).forEach(id => { const pm = prodMap[id]; if (!pm) return; if ([...pm.consumidores, ...pm.vendedores].some(n => getEdQtd(edificiosFinais, n) > 0)) { score += 15; const p = productsCatalog[id]; if (p) motivos.push({ icon: p.icon, nome: p.nome, tipo: 'output' }); } score += Math.min((marketPrices[id] || 0) / 1000, 10); });
        });
      }
      const confV = SALES_EDIFICIOS.find(c => c.nomeEdificio === ed.nome);
      if (confV) confV.formulas?.forEach(f => { if (!prodAtivos.has(f.produto)) return; score += 25; const p = productsCatalog[f.produto]; if (p) motivos.push({ icon: p.icon, nome: p.nome, tipo: 'urgente' }); });
      if (!score) return;
      jaRec.add(ed.nome);
      const custo    = ed.custoConstrucao || 0;
      const fin      = calcFin(ed, 1, econGlobal, econPorSetor?.[ed.setor] || 'estável');
      const roi      = custo > 0 && fin.lucro > 0 ? (fin.lucro / custo) * 100 : 0;
      const payback  = fin.lucro > 0 ? custo / fin.lucro : Infinity;
      lista.push({ nome: ed.nome, setor: ed.setor, score, custo, lucroMes: fin.lucro, roi, payback, motivos: motivos.slice(0, 3), isVenda: !!confV });
    });
    return lista.sort((a, b) => b.score - a.score).slice(0, 10);
  }, [edificiosFinais, prodMap, edMap, edificiosDisponiveis, econGlobal, econPorSetor]);

  const maxScore = Math.max(...oportunidades.map(o => o.score), 1);
  const pbCor    = m => !isFinite(m) ? 'rgba(255,255,255,.4)' : m <= 6 ? '#7aff9a' : m <= 18 ? '#FFD700' : '#ff9090';
  const roiCor   = r => r >= 10 ? '#7aff9a' : r >= 4 ? '#FFD700' : 'rgba(255,255,255,.4)';

  return (
    <ViewScroll>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 9, marginBottom: 12 }}>
        <Card glow={cadeiasSemVenda.length > 0 ? '#FFD700' : undefined} style={{ textAlign: 'center' }}><StatBox label="Sem venda"    value={cadeiasSemVenda.length} cor={cadeiasSemVenda.length > 0 ? '#FFD700' : '#7aff9a'} icon="🏪" /></Card>
        <Card glow={subexplorados.length > 0 ? '#C87AFF' : undefined}   style={{ textAlign: 'center' }}><StatBox label="Subexplorados" value={subexplorados.length}   cor={subexplorados.length > 0 ? '#C87AFF' : '#7aff9a'} icon="💎" /></Card>
        <Card style={{ textAlign: 'center' }}><StatBox label="Expansões" value={oportunidades.length} cor="#7ac8ff" icon="🚀" /></Card>
      </div>
      {cadeiasSemVenda.length > 0 && (
        <Card glow="#FFD700">
          <div style={S.secTitle}>⛓️ Cadeias Incompletas</div>
          <div style={S.secSub}>Fluxo visual — ❌ onde a cadeia para</div>
          {cadeiasSemVenda.map(c => (
            <div key={c.id} style={{ background: 'rgba(255,215,0,.05)', border: '1px solid rgba(255,215,0,.18)', borderRadius: 10, padding: '10px 12px', marginBottom: 9 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', fontFamily: "'Rajdhani',sans-serif", marginBottom: 5 }}>{c.icones} {c.titulo}</div>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4, marginBottom: 6 }}>
                {c.producao.slice(0, 4).map((edNome, i) => { const s = edMap[edNome]?.setor; const cfg = SETOR_CONFIG[s] || SETOR_CONFIG.industria; return (<React.Fragment key={edNome}>{i > 0 && <span style={{ color: 'rgba(255,255,255,.35)', fontSize: 14 }}>→</span>}<div style={{ background: `${cfg.cor}20`, border: `1px solid ${cfg.cor}50`, borderRadius: 6, padding: '3px 8px', fontSize: 10, color: cfg.cor, fontWeight: 700 }}>{cfg.icon} {edNome}</div></React.Fragment>); })}
                <span style={{ color: 'rgba(255,255,255,.35)', fontSize: 14 }}>→</span>
                <div style={{ background: 'rgba(255,107,107,.18)', border: '1px solid rgba(255,107,107,.45)', borderRadius: 6, padding: '3px 8px', fontSize: 10, color: '#ff6b6b', fontWeight: 800 }}>❌ Sem venda</div>
              </div>
            </div>
          ))}
        </Card>
      )}
      {subexplorados.length > 0 && (
        <Card glow="#C87AFF">
          <div style={S.secTitle}>💎 Produtos Subexplorados</div>
          <div style={S.secSub}>Você já produz — pode transformar ou vender mais</div>
          {subexplorados.slice(0, 5).map(({ pid, prod, fluxo, trans }) => (
            <div key={pid} style={{ background: 'rgba(200,122,255,.07)', border: '1px solid rgba(200,122,255,.18)', borderRadius: 10, padding: '10px 12px', marginBottom: 9 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: trans.length ? 7 : 0 }}><span style={{ fontSize: 20 }}>{prod?.icon}</span><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: '#fff', fontFamily: "'Rajdhani',sans-serif" }}>{prod?.nome}</div><div style={{ fontSize: 11, color: '#7ac8ff', fontWeight: 700 }}>+{fmt(fluxo.liquido)}/d excedente</div></div></div>
              {trans.slice(0, 2).map(t => (<div key={t.edificio} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,.2)', borderRadius: 7, padding: '6px 9px', marginBottom: 4 }}><span style={{ fontSize: 11, color: SETOR_CONFIG[t.setor]?.cor || '#fff', fontWeight: 700 }}>{SETOR_CONFIG[t.setor]?.icon} {t.edificio}</span><span style={S.tag('#7aff9a')}>até {fmtR(t.maxOut)}</span></div>))}
            </div>
          ))}
        </Card>
      )}
      {oportunidades.length > 0 && (
        <Card>
          <div style={S.secTitle}>🚀 Melhores Expansões</div>
          <div style={S.secSub}>Sinergia com ativos atuais · ROI e payback por unidade</div>
          {oportunidades.map(rec => {
            const cfg = SETOR_CONFIG[rec.setor] || SETOR_CONFIG.industria; const pb = isFinite(rec.payback) ? rec.payback : null;
            return (
              <div key={rec.nome} style={{ background: `${cfg.cor}08`, border: `1px solid ${cfg.cor}25`, borderRadius: 10, padding: '11px 13px', marginBottom: 9 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div style={{ flex: 1 }}><div style={{ fontSize: 10, fontWeight: 800, color: cfg.cor, textTransform: 'uppercase', marginBottom: 3 }}>{rec.isVenda ? '🏪' : cfg.icon} {cfg.label}</div><div style={{ fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: "'Rajdhani',sans-serif" }}>{rec.nome}</div></div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}><div style={{ fontSize: 9, color: 'rgba(255,255,255,.35)' }}>sinergia</div><div style={{ fontSize: 14, fontWeight: 800, color: cfg.cor, fontFamily: "'Rajdhani',sans-serif" }}>{rec.score.toFixed(0)}</div></div>
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,.07)', borderRadius: 2, overflow: 'hidden', marginBottom: 9 }}><div style={{ height: '100%', width: `${(rec.score / maxScore) * 100}%`, background: cfg.cor, borderRadius: 2 }} /></div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 8, background: 'rgba(0,0,0,.22)', borderRadius: 8, padding: '7px 9px' }}>{[{ l: 'Custo', v: fmtR(rec.custo), c: 'rgba(255,255,255,.65)' }, { l: 'ROI/mês', v: rec.roi > 0 ? `${rec.roi.toFixed(1)}%` : '—', c: roiCor(rec.roi) }, { l: '⏱ Payback', v: pb ? `${pb.toFixed(1)}m` : '—', c: pbCor(rec.payback) }].map(({ l, v, c }) => (<div key={l} style={{ textAlign: 'center' }}><div style={{ fontSize: 9, color: 'rgba(255,255,255,.35)', marginBottom: 2 }}>{l}</div><div style={{ fontSize: 12, fontWeight: 800, color: c, fontFamily: "'Rajdhani',sans-serif" }}>{v}</div></div>))}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>{rec.motivos.map((m, i) => <span key={i} style={S.tag(m.tipo === 'input' ? '#7ac8ff' : m.tipo === 'urgente' ? '#ff6b6b' : '#7aff9a')}>{m.icon} {m.nome}</span>)}</div>
              </div>
            );
          })}
        </Card>
      )}
      {!oportunidades.length && !subexplorados.length && !cadeiasSemVenda.length && <Insight emoji="🏆" texto="Seu império está bem estruturado! Continue monitorando e expandindo." cor="#7aff9a" />}
    </ViewScroll>
  );
}

// ════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ════════════════════════════════════════════════════════════
export default function AssistenteIA() {
  // ── Zustand — seletor granular ────────────────────────────
  const edificiosFinais = useCentralStore((s) => s.edificiosFinais);

  // ── Economy Context (inalterado) ──────────────────────────
  const { economiaSetores } = useContext(DadosEconomyGlobalContext);

  const [viewAtiva, setViewAtiva] = useState('saude');

  const econGlobal   = economiaSetores?.estadoGlobal || 'estável';
  const econPorSetor = useMemo(() => {
    const m = {};
    SETORES.forEach(s => { m[s] = economiaSetores?.[s]?.estado || 'estável'; });
    return m;
  }, [economiaSetores]);

  // graph é estático — buildado uma única vez
  const graph   = useMemo(buildGraph, []);

  // analise depende só de edificiosFinais (dinâmico) e economia
  const analise = useMemo(
    () => analisar(edificiosFinais, graph, econGlobal, econPorSetor),
    [edificiosFinais, graph, econGlobal, econPorSetor]
  );

  const viewAtual = VIEWS.find(v => v.id === viewAtiva);

  const badges = useMemo(() => ({
    saude:         analise.gargalos.length,
    gargalos:      analise.gargalos.length + Object.values(analise.fluxosProdutos).filter(f => f.status === 'sangramento').length,
    economico:     analise.margem < 0 ? 1 : 0,
    estoque:       Object.values(analise.pressaoEstoque).filter(e => e.status === 'critico').length,
    eficiencia:    analise.edificiosAtivos.filter(e => e.eficiencia < 50).length,
    oportunidades: analise.cadeias.filter(c => !c.completo).length,
  }), [analise]);

  return (
    <div style={{ width: '100%', height: '100%', background: '#07041a', borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: "'Rajdhani','Segoe UI',sans-serif", color: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700;800&display=swap');
        .aia-inner::-webkit-scrollbar{width:4px}
        .aia-inner::-webkit-scrollbar-track{background:rgba(255,255,255,.03)}
        .aia-inner::-webkit-scrollbar-thumb{background:rgba(100,17,217,.55);border-radius:4px}
        .aia-inner::-webkit-scrollbar-thumb:hover{background:rgba(100,17,217,.85)}
        .aia-tabs::-webkit-scrollbar{height:3px}
        .aia-tabs::-webkit-scrollbar-thumb{background:rgba(100,17,217,.4);border-radius:2px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .aia-view{animation:fadeUp .2s ease}
      `}</style>

      {/* Header fixo */}
      <div style={{ background: 'linear-gradient(135deg,rgba(76,20,169,.48),rgba(100,17,217,.3))', borderBottom: '1px solid rgba(100,17,217,.38)', padding: '11px 13px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 22 }}>🤖</span>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '.03em' }}>Assistente IA</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,.38)', textTransform: 'uppercase', letterSpacing: '.12em' }}>{viewAtual?.desc}</div>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,.35)' }}>Economia global</div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#C87AFF' }}>{econGlobal}</div>
          </div>
        </div>
        {/* Tabs */}
        <div className="aia-tabs" style={{ display: 'flex', gap: 2, overflowX: 'auto' }}>
          {VIEWS.map(v => {
            const isAtiva = viewAtiva === v.id; const badge = badges[v.id] || 0;
            return (
              <button key={v.id} onClick={() => setViewAtiva(v.id)} style={{ flexShrink: 0, border: 'none', borderRadius: '7px 7px 0 0', padding: '6px 10px 8px', cursor: 'pointer', fontFamily: "'Rajdhani',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.04em', transition: 'all .15s', background: isAtiva ? 'rgba(255,255,255,.1)' : 'transparent', color: isAtiva ? '#fff' : 'rgba(255,255,255,.4)', borderBottom: isAtiva ? '2px solid #8B5CF6' : '2px solid transparent', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span>{v.icon}</span><span>{v.label}</span>
                {badge > 0 && <span style={{ background: '#ff6b6b', color: '#fff', borderRadius: 8, padding: '0 5px', fontSize: 9, fontWeight: 800 }}>{badge}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Conteúdo — cada view tem scroll próprio */}
      <div className="aia-view" key={viewAtiva} style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        {viewAtiva === 'saude'         && <VisaoSaude         analise={analise} edificiosFinais={edificiosFinais} />}
        {viewAtiva === 'gargalos'      && <VisaoGargalos      analise={analise} graph={graph} />}
        {viewAtiva === 'economico'     && <VisaoEconomico     analise={analise} />}
        {viewAtiva === 'estoque'       && <VisaoEstoque       analise={analise} edificiosFinais={edificiosFinais} graph={graph} />}
        {viewAtiva === 'eficiencia'    && <VisaoEficiencia    analise={analise} />}
        {viewAtiva === 'oportunidades' && <VisaoOportunidades analise={analise} edificiosFinais={edificiosFinais} graph={graph} econGlobal={econGlobal} econPorSetor={econPorSetor} />}
      </div>
    </div>
  );
}

