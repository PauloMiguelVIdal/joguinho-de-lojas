import React, { useContext, useMemo, useState, useCallback, memo } from 'react';
import ReactFlow, {
  Background, Controls, MiniMap, ReactFlowProvider,
  Handle, Position, MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { CentraldeDadosContext } from '../centralDeDadosContext';
import { DadosEconomyGlobalContext } from '../dadosEconomyGlobal';
import { FORMULAS_EDIFICIOS } from './productionFormulasConfig';
import { SALES_EDIFICIOS } from './salesFormulasConfig';
import { productsCatalog, marketPrices } from './TablePrice';
import { storageProfiles } from './GameContext';

// ════════════════════════════════════════════════════════════
// CONFIG
// ════════════════════════════════════════════════════════════
const SETOR_CONFIG = {
  agricultura: { cor: '#0C9123', corBg: '#003816', label: 'Agricultura' },
  tecnologia:  { cor: '#FF6F00', corBg: '#A64B00', label: 'Tecnologia'  },
  industria:   { cor: '#808080', corBg: '#1A1A1A', label: 'Indústria'   },
  comercio:    { cor: '#E60000', corBg: '#660000', label: 'Comércio'    },
  imobiliario: { cor: '#3333CC', corBg: '#000066', label: 'Imobiliário' },
  energia:     { cor: '#E6B800', corBg: '#665200', label: 'Energia'     },
};
const SETORES = Object.keys(SETOR_CONFIG);

const fmt = (n) => {
  if (n === undefined || n === null) return '—';
  const abs = Math.abs(n);
  if (abs >= 1e9) return (n/1e9).toFixed(1)+'B';
  if (abs >= 1e6) return (n/1e6).toFixed(1)+'M';
  if (abs >= 1e3) return (n/1e3).toFixed(0)+'K';
  return String(Math.round(n));
};

// ════════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════════
function getEdQtd(dados, nome) {
  for (const s of SETORES) { const ed = dados[s]?.edificios?.find(e => e.nome === nome); if (ed) return ed.quantidade || 0; }
  return 0;
}
function getEdCusto(dados, nome) {
  for (const s of SETORES) { const ed = dados[s]?.edificios?.find(e => e.nome === nome); if (ed) return ed.custoConstrucao || 0; }
  return 0;
}
function getEdSetor(dados, nome) {
  for (const s of SETORES) { if (dados[s]?.edificios?.some(e => e.nome === nome)) return s; }
  return null;
}
function getEdLiberado(dados, nome) {
  for (const s of SETORES) { const ed = dados[s]?.edificios?.find(e => e.nome === nome); if (ed) return ed.licençaLiberado?.liberado !== false; }
  return true;
}

// ════════════════════════════════════════════════════════════
// GRAFO ESTÁTICO
// ════════════════════════════════════════════════════════════
let _graphCache = null;
function buildFullGraph() {
  if (_graphCache) return _graphCache;
  const prodMap = {}, edMap = {}, armMap = {};
  const ep = (id) => { if (!prodMap[id]) prodMap[id] = { produtores: [], consumidores: [], vendedores: [] }; };
  const ee = (nome, setor, extra = {}) => { if (!edMap[nome]) edMap[nome] = { inputs: [], outputs: [], setor, ...extra }; };

  FORMULAS_EDIFICIOS.forEach(conf => {
    ee(conf.nomeEdificio, conf.setor, { isProducao: true });
    conf.formulas.forEach(f => {
      Object.keys(f.input||{}).forEach(id => { ep(id); if (!edMap[conf.nomeEdificio].inputs.includes(id)) edMap[conf.nomeEdificio].inputs.push(id); if (!prodMap[id].consumidores.includes(conf.nomeEdificio)) prodMap[id].consumidores.push(conf.nomeEdificio); });
      Object.keys(f.output||{}).forEach(id => { ep(id); if (!edMap[conf.nomeEdificio].outputs.includes(id)) edMap[conf.nomeEdificio].outputs.push(id); if (!prodMap[id].produtores.includes(conf.nomeEdificio)) prodMap[id].produtores.push(conf.nomeEdificio); });
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

  _graphCache = { prodMap, edMap, armMap };
  return _graphCache;
}

// ════════════════════════════════════════════════════════════
// DEPTH ENGINE — BFS a partir das matérias-primas
// ════════════════════════════════════════════════════════════
function calcularDepths(prodMap, edMap, produtosAlvo) {
  const depthProd = {}, depthEd = {};

  // Raízes = produtos que nenhum edifício do jogo produz
  const raizes = [...produtosAlvo].filter(id => {
    const produtores = (prodMap[id]?.produtores || []).filter(n => edMap[n]);
    return produtores.length === 0;
  });
  const starts = raizes.length > 0 ? raizes : [...produtosAlvo].slice(0, 1);

  starts.forEach(p => { depthProd[p] = 0; });
  const fila = starts.map(p => ({ prodId: p, depth: 0 }));
  const visitedProds = new Set(starts);

  while (fila.length > 0) {
    const { prodId, depth } = fila.shift();

    // Edifícios que CONSOMEM este produto → depth + 0.5
    (prodMap[prodId]?.consumidores || []).forEach(edNome => {
      if (!(edNome in depthEd)) depthEd[edNome] = depth + 0.5;

      // Outputs desse edifício → depth + 1
      (edMap[edNome]?.outputs || []).forEach(outId => {
        if (!produtosAlvo.has(outId)) return;
        const nd = depth + 1;
        if (outId in depthProd && depthProd[outId] <= nd) return;
        depthProd[outId] = nd;
        if (!visitedProds.has(outId)) { visitedProds.add(outId); fila.push({ prodId: outId, depth: nd }); }
      });
    });

    // Lojas = fim da cadeia → depth + 1
    (prodMap[prodId]?.vendedores || []).forEach(edNome => {
      if (!(edNome in depthEd)) depthEd[edNome] = depth + 1;
    });
  }

  return { depthProd, depthEd };
}

// ════════════════════════════════════════════════════════════
// FLUXO & PRESSÃO DE ARMAZÉM
// ════════════════════════════════════════════════════════════
function calcFluxo(dados, prodId, prodMap) {
  const pm = prodMap[prodId]; if (!pm) return null;
  let prod = 0, venda = 0;
  pm.produtores.forEach(n => {
    const qtd = getEdQtd(dados, n); if (!qtd) return;
    const conf = FORMULAS_EDIFICIOS.find(e => e.nomeEdificio === n); if (!conf) return;
    conf.formulas.forEach(f => { const out = f.output?.[prodId] || 0; if (out) prod += (out / (f.duracao||1)) * qtd; });
  });
  pm.vendedores.forEach(n => { const q = getEdQtd(dados, n); if (q) venda += q * 1.5; });
  const liquido = prod - venda;
  const status = prod === 0 && venda === 0 ? 'inativo'
    : prod === 0 ? 'sem_producao' : venda === 0 ? 'sem_venda'
    : liquido > 1 ? 'acumulo' : liquido < -1 ? 'sangramento' : 'equilibrio';
  return { prod, venda, liquido, status };
}

function calcPressaoArmazem(dados, prodId, armMap) {
  const prod = productsCatalog[prodId]; if (!prod?.categoriaFisica) return null;
  const arms = armMap[prod.categoriaFisica] || [];
  const capTotal = arms.reduce((s, a) => s + getEdQtd(dados, a.nome) * a.capacidadePorEdificio, 0);
  return { capTotal, temArmazem: arms.some(a => getEdQtd(dados, a.nome) > 0), cat: prod.categoriaFisica, arms };
}

// ════════════════════════════════════════════════════════════
// DETECÇÃO DE CADEIAS
// ════════════════════════════════════════════════════════════
function detectarCadeias(dados, graph) {
  const { prodMap, edMap } = graph;
  const ativos = new Set();
  SETORES.forEach(s => dados[s]?.edificios?.forEach(ed => { if (ed.quantidade > 0) ativos.add(ed.nome); }));
  if (ativos.size === 0) return [];

  const visitados = new Set(), cadeias = [];
  const bfs = (inicio) => {
    const nos = new Set([inicio]), produtos = new Set(), fila = [inicio];
    while (fila.length > 0) {
      const atual = fila.shift(); const conf = edMap[atual]; if (!conf) continue;
      [...(conf.inputs||[]),...(conf.outputs||[])].forEach(pid => {
        produtos.add(pid);
        const pm = prodMap[pid]; if (!pm) return;
        [...pm.produtores,...pm.consumidores,...pm.vendedores].forEach(viz => {
          if (ativos.has(viz) && !nos.has(viz)) { nos.add(viz); fila.push(viz); }
        });
      });
    }
    return { nos: [...nos], produtos: [...produtos] };
  };

  ativos.forEach(nome => {
    if (visitados.has(nome)) return;
    const { nos, produtos } = bfs(nome);
    nos.forEach(n => visitados.add(n));
    if (nos.length < 2) return;

    const producao = nos.filter(n => edMap[n]?.isProducao);
    const venda    = nos.filter(n => edMap[n]?.isVenda);
    const armazem  = nos.filter(n => edMap[n]?.isArmazem);

    const prodsPorValor = produtos.filter(id => productsCatalog[id])
      .sort((a, b) => (marketPrices[b]||0) - (marketPrices[a]||0));
    const icones = prodsPorValor.slice(0,4).map(id => productsCatalog[id]?.icon||'').join('');
    const top2   = prodsPorValor.slice(0,2).map(id => productsCatalog[id]?.nome?.split(' ')[0]||'').filter(Boolean);
    const titulo = top2.length > 1 ? `${top2[0]} → ${top2[1]}` : top2[0] || `Cadeia #${cadeias.length+1}`;

    let fatuEco = 0;
    producao.forEach(n => {
      const s = getEdSetor(dados, n);
      const ed = s && dados[s]?.edificios?.find(e => e.nome === n);
      if (ed) fatuEco += (ed.finanças?.faturamentoUnitário||0) * 30 * (ed.quantidade||0);
    });

    const { depthProd } = calcularDepths(prodMap, edMap, new Set(produtos));
    const maxDepth = Math.max(0, ...Object.values(depthProd));

    const prodsSemDestino = [];
    nos.forEach(edNome => {
      (edMap[edNome]?.outputs||[]).forEach(pid => {
        const pm = prodMap[pid]; if (!pm) return;
        const temDest = [...pm.consumidores,...pm.vendedores].some(n => ativos.has(n));
        if (!temDest) prodsSemDestino.push(pid);
      });
    });

    cadeias.push({
      id: `eco_${cadeias.length}`, titulo, icones, nos, producao, venda, armazenamento: armazem,
      produtos: prodsPorValor, todosProdutos: new Set(produtos),
      prodsSemDestino: [...new Set(prodsSemDestino)],
      fatuEstimado: fatuEco, tamanho: nos.length,
      completo: producao.length > 0 && venda.length > 0, maxDepth,
    });
  });
  return cadeias.sort((a, b) => b.fatuEstimado - a.fatuEstimado);
}

// ════════════════════════════════════════════════════════════
// BUILDER DO GRAFO — depth-based layout
// ════════════════════════════════════════════════════════════
const STEP_X = 280, STEP_Y = 90;

function buildFlowGraph(dados, graph, ghostNodes, highlight, cadeiaFiltro) {
  const { prodMap, edMap, armMap } = graph;
  const nodes = [], edges = [];
  const edgesSet = new Set(), nosSet = new Set();

  // Produtos a mostrar
  let produtosAlvo;
  if (cadeiaFiltro) {
    produtosAlvo = cadeiaFiltro.todosProdutos;
  } else {
    produtosAlvo = new Set();
    SETORES.forEach(s => {
      dados[s]?.edificios?.forEach(ed => {
        if (!ed.quantidade) return;
        const conf = edMap[ed.nome]; if (!conf) return;
        [...conf.inputs,...conf.outputs].forEach(id => { if (productsCatalog[id]) produtosAlvo.add(id); });
      });
    });
    ghostNodes.forEach(g => {
      const conf = edMap[g.nome]; if (!conf) return;
      [...conf.inputs,...conf.outputs].forEach(id => { if (productsCatalog[id]) produtosAlvo.add(id); });
    });
  }

  if (produtosAlvo.size === 0) return { nodes: [], edges: [] };

  const { depthProd, depthEd } = calcularDepths(prodMap, edMap, produtosAlvo);

  // Contadores de linha por coluna
  const rowCounter = {};
  const nextRow = (col) => { rowCounter[col] = (rowCounter[col] || 0) + 1; return rowCounter[col] - 1; };

  const addNode = (id, type, x, y, data, ghost = false) => {
    if (nosSet.has(id)) return;
    nosSet.add(id);
    const hl = highlight === id;
    nodes.push({ id, type, position: { x, y }, data: { ...data, ghost }, style: { opacity: highlight && !hl ? 0.07 : ghost ? 0.42 : 1 } });
  };

  const addEdge = (id, source, target, cor, animated, dashed = false, label = '') => {
    if (edgesSet.has(id)) return; edgesSet.add(id);
    const hl = highlight === source || highlight === target;
    edges.push({
      id, source, target, animated, label,
      labelStyle: { fill: cor, fontWeight: 700, fontSize: 8 },
      labelBgStyle: { fill: 'rgba(0,0,0,.8)', borderRadius: 3, padding: 2 },
      style: { stroke: cor, strokeWidth: hl ? 3 : 1.5, strokeDasharray: dashed ? '6 3' : '0', opacity: highlight && !hl ? 0.04 : 0.88 },
      markerEnd: { type: MarkerType.ArrowClosed, color: cor },
    });
  };

  // ── Edifícios relevantes ────────────────────────────────
  const edsRelevantes = new Set();
  [...produtosAlvo].forEach(pid => {
    const pm = prodMap[pid]; if (!pm) return;
    [...pm.produtores,...pm.consumidores,...pm.vendedores].forEach(n => {
      const qtd = getEdQtd(dados, n);
      const isGhost = ghostNodes.some(g => g.nome === n);
      if (qtd > 0 || isGhost) edsRelevantes.add(n);
    });
  });

  // ── Nós de PRODUTO (coluna central de cada depth) ──────
  [...produtosAlvo].forEach(pid => {
    const d = depthProd[pid] ?? 0;
    const fluxo = calcFluxo(dados, pid, prodMap);
    const pressao = calcPressaoArmazem(dados, pid, armMap);
    const prodTemAtivo = (prodMap[pid]?.produtores||[]).some(n => getEdQtd(dados, n) > 0);
    const urgenciaArmazem = fluxo?.status === 'acumulo' && pressao && !pressao.temArmazem;

    const colKey = `prod-${d}`;
    const row = nextRow(colKey);
    const x = d * STEP_X * 2;   // produtos na coluna central de cada profundidade
    const y = row * STEP_Y;

    const cor = !fluxo || fluxo.status === 'inativo' ? 'rgba(255,255,255,.18)'
      : fluxo.status === 'acumulo' ? '#7ac8ff'
      : fluxo.status === 'sangramento' ? '#ff6b6b'
      : fluxo.status === 'equilibrio' ? '#7aff9a'
      : fluxo.status === 'sem_venda' ? '#C87AFF'
      : '#FFD700';

    addNode(`prod-${pid}`, 'prodNode', x, y, { prodId: pid, fluxo, cor, urgenciaArmazem, prodTemAtivo });
  });

  // ── Edifícios PRODUTORES (coluna esquerda do produto output) ──
  edsRelevantes.forEach(nome => {
    const conf = edMap[nome]; if (!conf?.isProducao) return;
    const qtd = getEdQtd(dados, nome);
    const isGhost = ghostNodes.some(g => g.nome === nome);
    const setor = conf.setor || getEdSetor(dados, nome) || 'industria';

    // Depth = depth do produto de output mais avançado - 1
    const mainOut = (conf.outputs||[]).filter(id => produtosAlvo.has(id))
      .sort((a,b) => (depthProd[b]??0) - (depthProd[a]??0))[0];
    const targetDepth = mainOut !== undefined ? (depthProd[mainOut]??0) : 0;

    const colKey = `edL-${targetDepth}`;
    const row = nextRow(colKey);
    const x = targetDepth * STEP_X * 2 - STEP_X;  // coluna esquerda
    const y = row * STEP_Y;

    addNode(`ed-${nome}`, 'edNode', x, y, { nome, setor, qtd, tipo: 'producao' }, isGhost && qtd === 0);

    // Edges edifício → produto
    (conf.outputs||[]).forEach(pid => {
      if (!produtosAlvo.has(pid) || !nosSet.has(`prod-${pid}`)) return;
      const fluxo = calcFluxo(dados, pid, prodMap);
      const cor = qtd > 0
        ? (fluxo?.status === 'equilibrio' ? '#7aff9a' : fluxo?.status === 'sangramento' ? '#ff6b6b' : '#7aff9a99')
        : 'rgba(255,255,255,.12)';
      const eConf = FORMULAS_EDIFICIOS.find(e => e.nomeEdificio === nome);
      const qtdOut = eConf?.formulas?.[0]?.output?.[pid] || '';
      addEdge(`e-${nome}→${pid}`, `ed-${nome}`, `prod-${pid}`, cor, qtd > 0, false, qtdOut ? `×${qtdOut}` : '');
    });
  });

  // ── Lojas de VENDA (coluna direita) ───────────────────
  edsRelevantes.forEach(nome => {
    const conf = edMap[nome]; if (!conf?.isVenda) return;
    const qtd = getEdQtd(dados, nome);
    const isGhost = ghostNodes.some(g => g.nome === nome);
    const setor = conf.setor || 'comercio';

    const mainIn = (conf.inputs||[]).filter(id => produtosAlvo.has(id))
      .sort((a,b) => (depthProd[b]??0) - (depthProd[a]??0))[0];
    const targetDepth = mainIn !== undefined ? (depthProd[mainIn]??0) : 0;

    const colKey = `edR-${targetDepth}`;
    const row = nextRow(colKey);
    const x = targetDepth * STEP_X * 2 + STEP_X;  // coluna direita
    const y = row * STEP_Y;

    addNode(`loja-${nome}`, 'lojaNode', x, y, { nome, setor, qtd }, isGhost && qtd === 0);

    (conf.inputs||[]).forEach(pid => {
      if (!produtosAlvo.has(pid) || !nosSet.has(`prod-${pid}`)) return;
      const fluxo = calcFluxo(dados, pid, prodMap);
      const cor = qtd > 0
        ? (fluxo?.status === 'equilibrio' ? '#7aff9a' : fluxo?.status === 'sangramento' ? '#ff6b6b' : '#F27405')
        : 'rgba(255,255,255,.12)';
      addEdge(`e-${pid}→loja-${nome}`, `prod-${pid}`, `loja-${nome}`, cor, qtd > 0);
    });
  });

  // ── Armazéns (coluna levemente à direita do produto, em outra linha) ──
  const profsProcessados = new Set();
  [...produtosAlvo].forEach(pid => {
    const prod = productsCatalog[pid]; if (!prod?.categoriaFisica) return;
    const cat = prod.categoriaFisica;
    const arms = armMap[cat] || [];
    arms.forEach(prof => {
      if (profsProcessados.has(prof.nome)) return;
      const qtdArm = getEdQtd(dados, prof.nome);
      const isGhost = ghostNodes.some(g => g.nome === prof.nome);
      if (!qtdArm && !isGhost) return;
      profsProcessados.add(prof.nome);

      // Depth do produto mais processado desta categoria
      const prodsDaCategoria = [...produtosAlvo].filter(id => productsCatalog[id]?.categoriaFisica === cat);
      const maxD = Math.max(0, ...prodsDaCategoria.map(id => depthProd[id]??0));
      const temUrgencia = prodsDaCategoria.some(id => {
        const f = calcFluxo(dados, id, prodMap);
        return f?.status === 'acumulo' && !qtdArm;
      });

      const colKey = `arm-${maxD}`;
      const row = nextRow(colKey);
      const x = maxD * STEP_X * 2 + STEP_X * 0.5;  // ligeiramente à direita do produto
      const y = row * STEP_Y + 40;                   // offset vertical para não colidir

      addNode(`arm-${prof.nome}`, 'armNode', x, y, { nome: prof.nome, qtd: qtdArm, capacidade: prof.capacidadePorEdificio, temUrgencia }, isGhost && !qtdArm);

      // Edges produto → armazém (acúmulo ou urgência)
      prodsDaCategoria.forEach(id => {
        if (!nosSet.has(`prod-${id}`)) return;
        const fluxo = calcFluxo(dados, id, prodMap);
        const cor = temUrgencia ? '#ff6b6b' : fluxo?.status === 'acumulo' ? '#7ac8ff' : 'rgba(147,76,255,.3)';
        addEdge(`e-${id}→arm-${prof.nome}`, `prod-${id}`, `arm-${prof.nome}`, cor,
          fluxo?.status === 'acumulo' && qtdArm > 0, true);
      });
    });
  });

  return { nodes, edges };
}

// ════════════════════════════════════════════════════════════
// NÓS CUSTOMIZADOS
// ════════════════════════════════════════════════════════════
const ProdNode = memo(({ data, selected }) => {
  const { prodId, fluxo, cor, ghost, urgenciaArmazem } = data;
  const prod = productsCatalog[prodId]; if (!prod) return null;
  const c = cor || 'rgba(255,255,255,.18)';
  const pulsando = urgenciaArmazem || fluxo?.status === 'sangramento';
  return (
    <div style={{ background:'rgba(8,4,20,.92)', border:`${urgenciaArmazem?'2px':'1.5px'} solid ${selected?'#fff':urgenciaArmazem?'#ff6b6b':c}`, borderRadius:12, padding:'7px 11px', cursor:'pointer', display:'flex', alignItems:'center', gap:8, minWidth:140, boxShadow:selected?`0 0 0 2px #fff,0 4px 20px ${c}55`:urgenciaArmazem?'0 0 16px #ff6b6b66':fluxo?.status!=='inativo'?`0 2px 10px ${c}30`:'none', transition:'all .2s', animation:pulsando?'prodPulse 2s infinite':'none' }}>
      <Handle type="target" position={Position.Left}  style={{ background:c, width:7, height:7, border:'2px solid #000', left:-5 }} />
      <Handle type="source" position={Position.Right} style={{ background:c, width:7, height:7, border:'2px solid #000', right:-5 }} />
      <span style={{ fontSize:22, lineHeight:1, flexShrink:0 }}>{prod.icon}</span>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:9, fontWeight:700, color:'#fff', lineHeight:1.2, marginBottom:2, fontFamily:"'Rajdhani',sans-serif", overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{prod.nome}</div>
        {fluxo && fluxo.status !== 'inativo' && (
          <div style={{ display:'flex', alignItems:'center', gap:4 }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:c, flexShrink:0 }} />
            <span style={{ fontSize:8, color:c, fontFamily:"'Rajdhani',sans-serif", fontWeight:700 }}>{fluxo.liquido>=0?'+':''}{fmt(fluxo.liquido)}/d</span>
          </div>
        )}
        {urgenciaArmazem && <div style={{ fontSize:7, fontWeight:800, color:'#ff6b6b', letterSpacing:'.08em', marginTop:1 }}>⚠ SEM ARMAZÉM</div>}
      </div>
    </div>
  );
});

const EdNode = memo(({ data, selected }) => {
  const { nome, setor, qtd, ghost } = data;
  const cfg = SETOR_CONFIG[setor] || SETOR_CONFIG.agricultura;
  const ativo = qtd > 0 && !ghost;
  return (
    <div style={{ background:ghost?`${cfg.cor}10`:ativo?`linear-gradient(135deg,${cfg.cor}44,${cfg.corBg}cc)`:'rgba(10,6,24,.85)', border:`${ghost?'2px dashed':'1.5px solid'} ${selected?'#fff':ghost?cfg.cor+'55':ativo?cfg.cor:'rgba(255,255,255,.1)'}`, borderRadius:12, padding:'8px 12px', cursor:'pointer', minWidth:160, boxShadow:selected?`0 0 0 2px #fff,0 4px 24px ${cfg.cor}88`:ativo?`0 2px 12px ${cfg.cor}44`:'none', transition:'all .2s', opacity:ativo?1:ghost?0.5:0.45, position:'relative' }}>
      <Handle type="target" position={Position.Left}  style={{ background:cfg.cor, width:7, height:7, border:'2px solid #000', left:-5 }} />
      <Handle type="source" position={Position.Right} style={{ background:cfg.cor, width:7, height:7, border:'2px solid #000', right:-5 }} />
      {ghost && <div style={{ position:'absolute', top:-8, left:8, background:cfg.cor, borderRadius:4, padding:'1px 6px', fontSize:7, fontWeight:800, color:'#fff' }}>👻 PRÓXIMO</div>}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
        <span style={{ fontSize:8, fontWeight:800, color:cfg.cor, textTransform:'uppercase', letterSpacing:'.08em' }}>{cfg.label}</span>
        <span style={{ fontSize:9, fontWeight:800, padding:'1px 6px', borderRadius:4, background:ativo?cfg.cor:'rgba(255,255,255,.08)', color:'#fff', fontFamily:"'Rajdhani',sans-serif" }}>{ghost?'~1':`×${qtd}`}</span>
      </div>
      <div style={{ fontSize:10, fontWeight:700, color:ativo?'#fff':'rgba(255,255,255,.4)', fontFamily:"'Rajdhani',sans-serif", lineHeight:1.2 }}>{nome}</div>
    </div>
  );
});

const ArmNode = memo(({ data, selected }) => {
  const { nome, qtd, capacidade, ghost, temUrgencia } = data;
  const ativo = qtd > 0 && !ghost;
  const urgente = temUrgencia && !ativo;
  return (
    <div style={{ background:urgente?'rgba(255,107,107,.15)':ghost?'rgba(30,10,80,.3)':ativo?'rgba(20,8,50,.95)':'rgba(10,6,24,.85)', border:`${urgente?'2px':ghost?'2px dashed':'1.5px'} solid ${selected?'#fff':urgente?'#ff6b6b':ativo?'#6411D9':'rgba(255,255,255,.1)'}`, borderRadius:12, padding:'8px 12px', cursor:'pointer', minWidth:160, boxShadow:selected?'0 0 0 2px #fff,0 4px 20px #6411D988':urgente?'0 0 20px #ff6b6b55':ativo?'0 2px 10px #6411D944':'none', transition:'all .2s', animation:urgente?'prodPulse 2s infinite':'none' }}>
      <Handle type="target" position={Position.Left}  style={{ background:urgente?'#ff6b6b':'#6411D9', width:7, height:7, border:'2px solid #000', left:-5 }} />
      <Handle type="source" position={Position.Right} style={{ background:urgente?'#ff6b6b':'#6411D9', width:7, height:7, border:'2px solid #000', right:-5 }} />
      {urgente && <div style={{ fontSize:7, fontWeight:800, color:'#ff6b6b', letterSpacing:'.1em', marginBottom:3 }}>🚨 GARGALO — SEM CAPACIDADE</div>}
      {ghost && !urgente && <div style={{ fontSize:7, fontWeight:800, color:'#9355F7', letterSpacing:'.1em', marginBottom:3 }}>👻 FANTASMA</div>}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
        <span style={{ fontSize:9, color:urgente?'#ff6b6b':'#9355F7', fontWeight:800 }}>📦 Armazém</span>
        <span style={{ fontSize:9, fontWeight:800, padding:'1px 5px', borderRadius:4, background:ativo?'#6411D9':'rgba(255,255,255,.08)', color:'#fff', fontFamily:"'Rajdhani',sans-serif" }}>{ghost?'~1':`×${qtd}`}</span>
      </div>
      <div style={{ fontSize:10, fontWeight:700, color:ativo?'#fff':urgente?'#ff6b6baa':'rgba(255,255,255,.4)', fontFamily:"'Rajdhani',sans-serif", lineHeight:1.2 }}>{nome}</div>
      {ativo && <div style={{ marginTop:4, fontSize:8, color:'rgba(255,255,255,.3)' }}>Cap: {fmt(capacidade*qtd)}</div>}
    </div>
  );
});

const LojaNode = memo(({ data, selected }) => {
  const { nome, setor, qtd, ghost } = data;
  const cfg = SETOR_CONFIG[setor] || SETOR_CONFIG.comercio;
  const ativo = qtd > 0 && !ghost;
  return (
    <div style={{ background:ghost?`${cfg.cor}10`:ativo?`linear-gradient(135deg,${cfg.cor}33,${cfg.corBg}cc)`:'rgba(10,6,24,.85)', border:`${ghost?'2px dashed':'1.5px solid'} ${selected?'#fff':ativo?cfg.cor:'rgba(255,255,255,.1)'}`, borderRadius:12, padding:'8px 12px', cursor:'pointer', minWidth:160, boxShadow:selected?`0 0 0 2px #fff,0 4px 24px ${cfg.cor}88`:ativo?`0 2px 12px ${cfg.cor}44`:'none', transition:'all .2s', opacity:ativo?1:ghost?0.5:0.45 }}>
      <Handle type="target" position={Position.Left}  style={{ background:cfg.cor, width:7, height:7, border:'2px solid #000', left:-5 }} />
      <Handle type="source" position={Position.Right} style={{ background:cfg.cor, width:7, height:7, border:'2px solid #000', right:-5 }} />
      {ghost && <div style={{ fontSize:7, fontWeight:800, color:cfg.cor, letterSpacing:'.1em', marginBottom:3 }}>👻 FANTASMA</div>}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
        <span style={{ fontSize:8, fontWeight:800, color:cfg.cor, textTransform:'uppercase', letterSpacing:'.08em' }}>🏪 Venda</span>
        <span style={{ fontSize:9, fontWeight:800, padding:'1px 5px', borderRadius:4, background:ativo?cfg.cor:'rgba(255,255,255,.08)', color:'#fff', fontFamily:"'Rajdhani',sans-serif" }}>{ghost?'~1':`×${qtd}`}</span>
      </div>
      <div style={{ fontSize:10, fontWeight:700, color:ativo?'#fff':'rgba(255,255,255,.45)', fontFamily:"'Rajdhani',sans-serif", lineHeight:1.2 }}>{nome}</div>
    </div>
  );
});

const nodeTypes = { prodNode: ProdNode, edNode: EdNode, armNode: ArmNode, lojaNode: LojaNode };

// ════════════════════════════════════════════════════════════
// PAINEL CADEIAS
// ════════════════════════════════════════════════════════════
const PainelCadeias = ({ cadeias, ativa, onSelecionar, onFechar }) => (
  <div style={{ position:'absolute', top:12, right:12, zIndex:20, width:280, background:'linear-gradient(160deg,#0d0820,#1a0d40)', border:'1.5px solid rgba(100,17,217,.4)', borderRadius:14, padding:'14px 16px', boxShadow:'0 8px 32px rgba(0,0,0,.8)', maxHeight:'80vh', overflowY:'auto' }}>
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
      <div>
        <div style={{ fontSize:9, fontWeight:700, textTransform:'uppercase', letterSpacing:'.14em', color:'rgba(255,255,255,.3)', marginBottom:2 }}>Detectadas por grafo</div>
        <div style={{ fontSize:14, fontWeight:800, color:'#fff', fontFamily:"'Rajdhani',sans-serif" }}>Suas Cadeias 🏆</div>
      </div>
      <button onClick={onFechar} style={{ background:'rgba(255,255,255,.08)', border:'none', borderRadius:6, color:'#fff', cursor:'pointer', padding:'4px 8px', fontSize:12 }}>✕</button>
    </div>
    {cadeias.length === 0 ? (
      <div style={{ fontSize:11, color:'rgba(255,255,255,.25)', textAlign:'center', padding:'20px 0', lineHeight:1.7 }}>
        Nenhuma cadeia detectada.<br/>Construa 2+ edifícios conectados.
      </div>
    ) : cadeias.map(eco => {
      const isAtiva = ativa?.id === eco.id;
      const temGargalo = !eco.completo || eco.armazenamento.length === 0 || eco.prodsSemDestino.length > 0;
      return (
        <div key={eco.id} onClick={() => onSelecionar(isAtiva ? null : eco)}
          style={{ background:isAtiva?'rgba(100,17,217,.22)':'rgba(255,255,255,.03)', border:`1px solid ${isAtiva?'#6411D9':temGargalo?'#ff6b6b33':'rgba(255,255,255,.07)'}`, borderRadius:11, padding:'11px 12px', marginBottom:8, cursor:'pointer', transition:'all .15s' }}>
          <div style={{ display:'flex', alignItems:'flex-start', gap:8, marginBottom:8 }}>
            <span style={{ fontSize:22, lineHeight:1.1 }}>{eco.icones||'🏭'}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:12, fontWeight:800, color:'#fff', fontFamily:"'Rajdhani',sans-serif", lineHeight:1.2 }}>{eco.titulo}</div>
              <div style={{ fontSize:8, color:'rgba(255,255,255,.35)', marginTop:2 }}>{eco.tamanho} edifícios · profundidade {eco.maxDepth}</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:7, color:'rgba(255,255,255,.25)' }}>fat/mês</div>
              <div style={{ fontSize:13, fontWeight:800, color:'#C87AFF', fontFamily:"'Rajdhani',sans-serif" }}>{fmt(eco.fatuEstimado)}</div>
            </div>
          </div>
          {/* Barra de 3 pilares */}
          <div style={{ display:'flex', gap:3, marginBottom:6 }}>
            {[
              { l:`${eco.producao.length} Prod`, c:'#7aff9a', ok:eco.producao.length>0 },
              { l:`${eco.armazenamento.length} Arm`, c:'#9355F7', ok:eco.armazenamento.length>0 },
              { l:`${eco.venda.length} Venda`, c:'#F27405', ok:eco.venda.length>0 },
            ].map(({l,c,ok}) => (
              <div key={l} style={{ flex:1, background:ok?`${c}22`:'rgba(255,255,255,.05)', border:`1px solid ${ok?c+'44':'rgba(255,255,255,.08)'}`, borderRadius:5, padding:'3px 5px', textAlign:'center' }}>
                <div style={{ fontSize:8, fontWeight:700, color:ok?c:'rgba(255,255,255,.2)', fontFamily:"'Rajdhani',sans-serif" }}>{ok?'✓':'✗'} {l}</div>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
            {eco.completo && eco.armazenamento.length > 0 && <span style={{ fontSize:7, fontWeight:800, background:'#7aff9a1a', color:'#7aff9a', border:'1px solid #7aff9a33', borderRadius:4, padding:'1px 7px' }}>✅ Completa</span>}
            {!eco.completo && eco.producao.length > 0 && <span style={{ fontSize:7, fontWeight:800, background:'#FFD70015', color:'#FFD700', border:'1px solid #FFD70033', borderRadius:4, padding:'1px 7px' }}>⚠️ Sem venda</span>}
            {eco.armazenamento.length === 0 && eco.producao.length > 0 && <span style={{ fontSize:7, fontWeight:800, background:'#ff6b6b18', color:'#ff6b6b', border:'1px solid #ff6b6b33', borderRadius:4, padding:'1px 7px' }}>🚨 Sem armazém</span>}
            {eco.prodsSemDestino.length > 0 && <span style={{ fontSize:7, fontWeight:800, background:'rgba(255,107,107,.12)', color:'#ff9090', border:'1px solid #ff6b6b22', borderRadius:4, padding:'1px 7px' }}>Órfãos: {eco.prodsSemDestino.slice(0,3).map(id=>productsCatalog[id]?.icon||'').join('')}</span>}
          </div>
        </div>
      );
    })}
  </div>
);

// ════════════════════════════════════════════════════════════
// PAINEL PRÓXIMOS PASSOS
// ════════════════════════════════════════════════════════════
const PainelProximosPassos = ({ dados, graph, saldo, onGhost, onFechar }) => {
  const [aba, setAba] = useState('proximo');
  const { prodMap, edMap, armMap } = graph;

  const produzidosAtivos = useMemo(() => {
    const s = new Set();
    SETORES.forEach(set => dados[set]?.edificios?.forEach(ed => {
      if (ed.quantidade > 0) (edMap[ed.nome]?.outputs||[]).forEach(id => s.add(id));
    }));
    return s;
  }, [dados, edMap]);

  const proximosProd = useMemo(() => {
    const lista = [], jaRec = new Set();
    const push = (nome, setor, score, motivos, tipo) => {
      if (jaRec.has(nome)) return;
      jaRec.add(nome);
      lista.push({ nome, setor, custo: getEdCusto(dados, nome), score, motivos: [...new Map(motivos.map(m=>[m.nome,m])).values()].slice(0,3), podeComprar: saldo >= getEdCusto(dados, nome), tipo });
    };
    FORMULAS_EDIFICIOS.forEach(conf => {
      const qtd = getEdQtd(dados, conf.nomeEdificio);
      if (qtd > 0 || !getEdLiberado(dados, conf.nomeEdificio)) return;
      let score = 0, motivos = [];
      conf.formulas.forEach(f => {
        Object.keys(f.input||{}).forEach(id => { if (produzidosAtivos.has(id)) { score += 18; const p = productsCatalog[id]; if (p) motivos.push({ icon:p.icon, nome:p.nome, tipo:'input' }); } });
        Object.keys(f.output||{}).forEach(id => { const pm = prodMap[id]; if (!pm) return; if ([...pm.consumidores,...pm.vendedores].some(n => getEdQtd(dados, n) > 0)) { score += 14; const p = productsCatalog[id]; if (p) motivos.push({ icon:p.icon, nome:p.nome, tipo:'output' }); } });
      });
      if (score > 0) push(conf.nomeEdificio, conf.setor, score, motivos, 'producao');
    });
    SALES_EDIFICIOS.forEach(conf => {
      const qtd = getEdQtd(dados, conf.nomeEdificio);
      if (qtd > 0 || !getEdLiberado(dados, conf.nomeEdificio)) return;
      let score = 0, motivos = [];
      conf.formulas?.forEach(f => {
        if (!produzidosAtivos.has(f.produto)) return;
        const pm = prodMap[f.produto];
        const temV = pm?.vendedores.some(n => getEdQtd(dados, n) > 0);
        const p = productsCatalog[f.produto];
        score += temV ? 8 : 24;
        if (p) motivos.push({ icon:p.icon, nome:p.nome, tipo: temV ? 'output' : 'urgente' });
      });
      if (score > 0) push(conf.nomeEdificio, conf.setor, score, motivos, 'venda');
    });
    return lista.sort((a,b) => b.score - a.score).slice(0,7);
  }, [dados, produzidosAtivos, prodMap, saldo]);

  const armazensCriticos = useMemo(() => {
    const catD = {};
    SETORES.forEach(s => dados[s]?.edificios?.forEach(ed => {
      const conf = edMap[ed.nome]; if (!conf) return;
      conf.outputs.forEach(pid => {
        const p = productsCatalog[pid]; if (!p?.categoriaFisica) return;
        const cat = p.categoriaFisica;
        if (!catD[cat]) catD[cat] = { qtdEdAtivos:0, prodIds:new Set(), capAtual:0, icon:p.icon };
        catD[cat].prodIds.add(pid);
        if (ed.quantidade > 0) catD[cat].qtdEdAtivos += ed.quantidade;
      });
    }));
    Object.values(storageProfiles).forEach(prof => {
      const qtd = getEdQtd(dados, prof.nome); if (!qtd) return;
      const cats = Array.isArray(prof.categoriasPermitidas)?prof.categoriasPermitidas:[prof.categoriasPermitidas];
      cats.forEach(cat => { if (catD[cat]) catD[cat].capAtual += prof.capacidadePorEdificio * qtd; });
    });
    return Object.entries(catD)
      .filter(([,v]) => v.qtdEdAtivos > 0)
      .map(([cat,v]) => {
        const capPorEd = v.qtdEdAtivos > 0 ? v.capAtual/v.qtdEdAtivos : 0;
        const urgente = capPorEd < 500;
        const ops = (armMap[cat]||[]).filter(a => getEdLiberado(dados, a.nome)).map(a => {
          const c = getEdCusto(dados,a.nome)||1, q = getEdQtd(dados,a.nome);
          return { nome:a.nome, custo:c, capacidade:a.capacidadePorEdificio, qtdAt:q, eficiencia:a.capacidadePorEdificio/(c/1000), podeComprar:saldo>=c };
        }).sort((a,b)=>b.eficiencia-a.eficiencia).slice(0,3);
        return { cat, qtdEdAtivos:v.qtdEdAtivos, qtdProds:v.prodIds.size, capAtual:v.capAtual, capPorEd, urgente, arms:ops, icon:v.icon, score:v.qtdEdAtivos*15+(urgente?40:0) };
      })
      .sort((a,b)=>b.score-a.score).slice(0,5);
  }, [dados, armMap, edMap, saldo]);

  const urgentesArmazem = armazensCriticos.filter(a=>a.urgente).length;

  return (
    <div style={{ position:'absolute', top:12, right:12, zIndex:20, width:284, background:'linear-gradient(160deg,#0d0820,#1a0d40)', border:'1.5px solid rgba(100,17,217,.4)', borderRadius:14, padding:'14px 16px', boxShadow:'0 8px 32px rgba(0,0,0,.8)', maxHeight:'82vh', overflowY:'auto' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
        <div>
          <div style={{ fontSize:9, fontWeight:700, textTransform:'uppercase', letterSpacing:'.14em', color:'rgba(255,255,255,.3)', marginBottom:2 }}>Baseado na sua estrutura</div>
          <div style={{ fontSize:14, fontWeight:800, color:'#fff', fontFamily:"'Rajdhani',sans-serif" }}>Próximos Passos 🚀</div>
        </div>
        <button onClick={onFechar} style={{ background:'rgba(255,255,255,.08)', border:'none', borderRadius:6, color:'#fff', cursor:'pointer', padding:'4px 8px', fontSize:12 }}>✕</button>
      </div>
      <div style={{ display:'flex', gap:4, marginBottom:12 }}>
        {[
          { key:'proximo', label:'🏭 Produção / Venda', count:proximosProd.length, urgente:false },
          { key:'armazem', label:'📦 Armazéns', count:urgentesArmazem, urgente:urgentesArmazem>0 },
        ].map(a => (
          <button key={a.key} onClick={() => setAba(a.key)} style={{ flex:1, border:'none', borderRadius:7, padding:'5px 4px', cursor:'pointer', fontFamily:"'Rajdhani',sans-serif", fontSize:9, fontWeight:700, background:aba===a.key?'rgba(255,255,255,.18)':'rgba(255,255,255,.05)', color:aba===a.key?'#fff':'rgba(255,255,255,.35)', transition:'all .15s' }}>
            {a.label} {a.count>0&&<span style={{ fontSize:8, background:a.urgente?'rgba(255,107,107,.35)':'rgba(255,255,255,.12)', color:a.urgente?'#ff9090':'#fff', borderRadius:3, padding:'0 4px', marginLeft:2 }}>{a.count}</span>}
          </button>
        ))}
      </div>

      {aba === 'proximo' && (
        proximosProd.length === 0
          ? <div style={{ fontSize:11, color:'rgba(255,255,255,.25)', textAlign:'center', padding:'16px 0' }}>Nenhum próximo passo identificado.</div>
          : proximosProd.map(rec => {
            const cfg = SETOR_CONFIG[rec.setor]||SETOR_CONFIG.industria;
            const maxScore = proximosProd[0]?.score||1;
            return (
              <div key={rec.nome} style={{ background:`${cfg.cor}12`, border:`1px solid ${rec.podeComprar?cfg.cor+'33':'rgba(255,255,255,.07)'}`, borderRadius:10, padding:'9px 10px', marginBottom:8 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:5 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:2 }}>
                      <span style={{ fontSize:8, fontWeight:800, color:cfg.cor, textTransform:'uppercase' }}>{rec.tipo==='venda'?'🏪':'🏭'} {cfg.label}</span>
                      {rec.podeComprar && <span style={{ fontSize:7, fontWeight:700, background:'#7aff9a18', color:'#7aff9a', border:'1px solid #7aff9a30', borderRadius:3, padding:'0 5px' }}>✓ pode comprar</span>}
                    </div>
                    <div style={{ fontSize:11, fontWeight:700, color:'#fff', fontFamily:"'Rajdhani',sans-serif", lineHeight:1.2 }}>{rec.nome}</div>
                  </div>
                  <div style={{ textAlign:'right', flexShrink:0, marginLeft:8 }}>
                    <div style={{ fontSize:7, color:'rgba(255,255,255,.28)' }}>sinergia</div>
                    <div style={{ fontSize:14, fontWeight:800, color:cfg.cor, fontFamily:"'Rajdhani',sans-serif" }}>{rec.score}</div>
                  </div>
                </div>
                <div style={{ height:3, background:'rgba(255,255,255,.07)', borderRadius:2, overflow:'hidden', marginBottom:6 }}>
                  <div style={{ height:'100%', width:`${(rec.score/maxScore)*100}%`, background:cfg.cor, borderRadius:2 }} />
                </div>
                <div style={{ fontSize:9, color:rec.podeComprar?'rgba(255,255,255,.4)':'#ff9090', marginBottom:5, fontFamily:"'Rajdhani',sans-serif" }}>💰 {fmt(rec.custo)}</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:3, marginBottom:6 }}>
                  {rec.motivos.map((m,i) => (
                    <span key={i} style={{ fontSize:7, fontWeight:700, padding:'1px 5px', borderRadius:3, background:m.tipo==='input'?'rgba(122,200,255,.12)':m.tipo==='urgente'?'rgba(255,107,107,.15)':'rgba(122,255,154,.1)', color:m.tipo==='input'?'#7ac8ff':m.tipo==='urgente'?'#ff9090':'#7aff9a', fontFamily:"'Rajdhani',sans-serif" }}>
                      {m.icon} {m.nome}
                    </span>
                  ))}
                </div>
                <button onClick={() => onGhost({ nome:rec.nome, setor:rec.setor })} style={{ width:'100%', padding:'5px 0', borderRadius:6, border:'none', background:'rgba(100,17,217,.3)', color:'#C87AFF', fontFamily:"'Rajdhani',sans-serif", fontSize:10, fontWeight:700, cursor:'pointer' }}>
                  👻 Simular no mapa
                </button>
              </div>
            );
          })
      )}

      {aba === 'armazem' && (
        armazensCriticos.length === 0
          ? <div style={{ fontSize:11, color:'rgba(255,255,255,.25)', textAlign:'center', padding:'16px 0' }}>Todos os produtos têm armazenamento ✅</div>
          : armazensCriticos.map(rec => (
            <div key={rec.cat} style={{ background:rec.urgente?'rgba(255,107,107,.08)':'rgba(100,17,217,.1)', border:`1px solid ${rec.urgente?'#ff6b6b55':'rgba(100,17,217,.25)'}`, borderRadius:10, padding:'10px 11px', marginBottom:8 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:7 }}>
                <span style={{ fontSize:22 }}>{rec.icon}</span>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                    <span style={{ fontSize:10, fontWeight:700, color:'#fff', fontFamily:"'Rajdhani',sans-serif" }}>{rec.cat}</span>
                    {rec.urgente && <span style={{ fontSize:7, fontWeight:800, background:'#ff6b6b22', color:'#ff6b6b', border:'1px solid #ff6b6b44', borderRadius:3, padding:'1px 5px' }}>🚨 GARGALO</span>}
                  </div>
                  <div style={{ fontSize:8, color:'rgba(255,255,255,.4)' }}>{rec.qtdEdAtivos} ed. ativos · cap {fmt(Math.round(rec.capPorEd))}/ed</div>
                </div>
              </div>
              <div style={{ height:4, background:'rgba(255,255,255,.07)', borderRadius:2, overflow:'hidden', marginBottom:3 }}>
                <div style={{ height:'100%', width:`${Math.min((rec.capPorEd/500)*100,100)}%`, background:rec.urgente?'#ff6b6b':'#7aff9a', borderRadius:2 }} />
              </div>
              <div style={{ fontSize:7, color:'rgba(255,255,255,.18)', marginBottom:8 }}>mínimo recomendado: 500/edifício ativo</div>
              {rec.arms.map((op,oi) => (
                <div key={op.nome} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', background:oi===0?'rgba(100,17,217,.2)':'rgba(0,0,0,.2)', border:`1px solid ${oi===0?'rgba(147,76,255,.35)':'rgba(255,255,255,.06)'}`, borderRadius:7, padding:'6px 8px', marginBottom:4 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', gap:4, marginBottom:2 }}>
                      {oi===0 && <span style={{ fontSize:7, fontWeight:800, background:'#9355F722', color:'#9355F7', borderRadius:3, padding:'0 4px' }}>★ melhor</span>}
                      {op.qtdAt>0 && <span style={{ fontSize:7, fontWeight:800, background:'rgba(122,255,154,.1)', color:'#7aff9a', borderRadius:3, padding:'0 4px' }}>×{op.qtdAt} já tem</span>}
                    </div>
                    <div style={{ fontSize:10, fontWeight:700, color:'#fff', fontFamily:"'Rajdhani',sans-serif" }}>{op.nome}</div>
                    <div style={{ fontSize:8, color:'rgba(255,255,255,.3)' }}>{fmt(op.capacidade)}/ed · {op.eficiencia.toFixed(0)} cap/R$K</div>
                  </div>
                  <div style={{ textAlign:'right', flexShrink:0, marginLeft:8 }}>
                    <div style={{ fontSize:10, fontWeight:800, color:op.podeComprar?'#7aff9a':'#ff9090', fontFamily:"'Rajdhani',sans-serif" }}>{fmt(op.custo)}</div>
                    <button onClick={() => onGhost({ nome:op.nome, setor:'imobiliario' })} style={{ fontSize:8, fontWeight:700, background:'rgba(100,17,217,.3)', border:'none', borderRadius:4, color:'#C87AFF', cursor:'pointer', padding:'2px 6px', marginTop:3, display:'block', width:'100%' }}>👻</button>
                  </div>
                </div>
              ))}
            </div>
          ))
      )}
    </div>
  );
};

// ════════════════════════════════════════════════════════════
// PAINEL EQUILÍBRIO DE PRODUTO
// ════════════════════════════════════════════════════════════
const PainelEquilibrio = ({ prodId, dados, graph, onFechar, onGhost }) => {
  const prod = productsCatalog[prodId]; if (!prod) return null;
  const fluxo = calcFluxo(dados, prodId, graph.prodMap); if (!fluxo) return null;
  const pressao = calcPressaoArmazem(dados, prodId, graph.armMap);
  const statusInfo = {
    acumulo:     { emoji:'🔵', texto:'Acúmulo — produção excede venda', cor:'#7ac8ff' },
    sangramento: { emoji:'🔴', texto:'Sangramento — venda excede produção', cor:'#ff6b6b' },
    equilibrio:  { emoji:'✅', texto:'Fluxo equilibrado', cor:'#7aff9a' },
    sem_producao:{ emoji:'⚠️', texto:'Nenhum edifício produzindo', cor:'#FFD700' },
    sem_venda:   { emoji:'📦', texto:'Sem canal de venda ativo', cor:'#C87AFF' },
    inativo:     { emoji:'⚫', texto:'Fluxo inativo', cor:'rgba(255,255,255,.3)' },
  }[fluxo.status];
  const pm = graph.prodMap[prodId];
  const barMax = Math.max(fluxo.prod, fluxo.venda, 0.1);
  let sugestao = null, ghostAlvo = null;
  if (fluxo.status === 'sangramento') { const p0 = pm?.produtores?.[0]; if (p0) { sugestao=`Construa mais "${p0}" para aumentar oferta.`; ghostAlvo={nome:p0,setor:getEdSetor(dados,p0)||'industria'}; } }
  else if (fluxo.status === 'sem_producao') { const p0 = pm?.produtores?.[0]; if (p0) { sugestao=`"${p0}" pode produzir ${prod.nome}.`; ghostAlvo={nome:p0,setor:graph.edMap[p0]?.setor||'industria'}; } }
  else if (fluxo.status === 'sem_venda') { const v0 = pm?.vendedores?.[0]; if (v0) { sugestao=`"${v0}" pode vender ${prod.nome}.`; ghostAlvo={nome:v0,setor:graph.edMap[v0]?.setor||'comercio'}; } }
  else if (fluxo.status === 'acumulo' && pressao && !pressao.temArmazem) { sugestao=`⚠️ Acúmulo sem destino! Construa armazém para "${prod.categoriaFisica}".`; const a0=pressao.arms[0]; if(a0) ghostAlvo={nome:a0.nome,setor:'imobiliario'}; }
  return (
    <div style={{ position:'absolute', bottom:12, left:'50%', transform:'translateX(-50%)', zIndex:25, width:420, background:'linear-gradient(160deg,#0d0820,#1a0d40)', border:`1.5px solid ${statusInfo.cor}33`, borderRadius:14, padding:'14px 16px', boxShadow:'0 8px 32px rgba(0,0,0,.85)' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontSize:28 }}>{prod.icon}</span>
          <div>
            <div style={{ fontSize:13, fontWeight:800, color:'#fff', fontFamily:"'Rajdhani',sans-serif" }}>{prod.nome}</div>
            <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:2 }}>
              <span style={{ fontSize:12 }}>{statusInfo.emoji}</span>
              <span style={{ fontSize:9, color:statusInfo.cor, fontWeight:700 }}>{statusInfo.texto}</span>
            </div>
          </div>
        </div>
        <button onClick={onFechar} style={{ background:'rgba(255,255,255,.08)', border:'none', borderRadius:6, color:'#fff', cursor:'pointer', padding:'4px 8px', fontSize:12 }}>✕</button>
      </div>
      {[{label:'Produção',val:fluxo.prod,cor:'#7ac8ff',prefix:'+'},{label:'Venda',val:fluxo.venda,cor:'#F27405',prefix:'-'}].map(({label,val,cor,prefix})=>(
        <div key={label} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:5 }}>
          <span style={{ fontSize:9, color:'rgba(255,255,255,.4)', width:55, textAlign:'right', fontFamily:"'Rajdhani',sans-serif", fontWeight:700 }}>{label}</span>
          <div style={{ flex:1, height:10, background:'rgba(255,255,255,.06)', borderRadius:5, overflow:'hidden' }}>
            <div style={{ height:'100%', width:`${(val/barMax)*100}%`, background:cor, borderRadius:5, transition:'width .4s' }} />
          </div>
          <span style={{ fontSize:10, fontWeight:800, color:cor, fontFamily:"'Rajdhani',sans-serif", width:55 }}>{prefix}{fmt(val)}/d</span>
        </div>
      ))}
      {pressao && (
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
          <span style={{ fontSize:9, color:'rgba(255,255,255,.4)', width:55, textAlign:'right', fontFamily:"'Rajdhani',sans-serif", fontWeight:700 }}>Armazém</span>
          <div style={{ flex:1, height:10, background:'rgba(255,255,255,.06)', borderRadius:5, overflow:'hidden' }}>
            <div style={{ height:'100%', width:pressao.temArmazem?'70%':'0%', background:'#9355F7', borderRadius:5 }} />
          </div>
          <span style={{ fontSize:9, fontWeight:800, color:pressao.temArmazem?'#9355F7':'#ff6b6b', fontFamily:"'Rajdhani',sans-serif", width:55 }}>{pressao.temArmazem?fmt(pressao.capTotal):'🚨 Nenhum'}</span>
        </div>
      )}
      <div style={{ display:'flex', justifyContent:'flex-end', alignItems:'center', gap:6, marginBottom:sugestao?8:0 }}>
        <span style={{ fontSize:9, color:'rgba(255,255,255,.3)' }}>Saldo:</span>
        <span style={{ fontSize:14, fontWeight:800, color:statusInfo.cor, fontFamily:"'Rajdhani',sans-serif" }}>{fluxo.liquido>=0?'+':''}{fmt(fluxo.liquido)}/d</span>
      </div>
      {sugestao && (
        <div style={{ background:'rgba(255,215,0,.07)', border:'1px solid rgba(255,215,0,.2)', borderRadius:8, padding:'8px 10px', display:'flex', gap:8, alignItems:'flex-start', marginBottom:ghostAlvo?8:0 }}>
          <span style={{ fontSize:14, flexShrink:0 }}>💡</span>
          <span style={{ fontSize:10, color:'rgba(255,255,255,.7)', lineHeight:1.5, fontFamily:"'Rajdhani',sans-serif" }}>{sugestao}</span>
        </div>
      )}
      {ghostAlvo && (
        <button onClick={()=>onGhost(ghostAlvo)} style={{ width:'100%', padding:'8px 0', borderRadius:8, border:'none', background:'linear-gradient(135deg,#4C14A9,#6411D9)', color:'#fff', fontFamily:"'Rajdhani',sans-serif", fontSize:12, fontWeight:700, cursor:'pointer', marginTop:2 }}>
          👻 Simular "{ghostAlvo.nome}"
        </button>
      )}
    </div>
  );
};

// ════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ════════════════════════════════════════════════════════════
function EcosystemMapInner() {
  const { dados } = useContext(CentraldeDadosContext);
  const { economiaSetores } = useContext(DadosEconomyGlobalContext);
  const graph = useMemo(buildFullGraph, []);
  const saldo = economiaSetores?.saldo || 0;

  const [painelDir, setPainelDir] = useState('cadeias');
  const [cadeiaAtiva, setCadeiaAtiva] = useState(null);
  const [ghostNodes, setGhostNodes] = useState([]);
  const [highlight, setHighlight] = useState(null);
  const [nodeSelecionado, setNodeSelecionado] = useState(null);

  const cadeias = useMemo(() => detectarCadeias(dados, graph), [dados, graph]);

  const { nodes, edges } = useMemo(
    () => buildFlowGraph(dados, graph, ghostNodes, highlight, cadeiaAtiva),
    [dados, graph, ghostNodes, highlight, cadeiaAtiva]
  );

  const addGhost = useCallback((g) => {
    setGhostNodes(prev => prev.some(x => x.nome === g.nome) ? prev : [...prev, g]);
  }, []);

  const onNodeClick = useCallback((_, n) => { setNodeSelecionado(n); setHighlight(n.id); }, []);
  const onPaneClick = useCallback(() => { setNodeSelecionado(null); setHighlight(null); }, []);

  const prodSelecionadoId = nodeSelecionado?.data?.prodId || null;
  const gargalosCount = cadeias.filter(c => !c.completo || c.armazenamento.length === 0 || c.prodsSemDestino.length > 0).length;

  const tabBtn = (key, label, count = 0, urgente = false) => (
    <button key={key} onClick={() => setPainelDir(painelDir === key ? null : key)} style={{ border:'none', borderRadius:7, padding:'4px 10px', cursor:'pointer', fontFamily:"'Rajdhani',sans-serif", fontSize:10, fontWeight:700, letterSpacing:'.06em', transition:'all .15s', background:painelDir===key?'linear-gradient(135deg,#4C14A9,#6411D9)':'rgba(255,255,255,.06)', color:painelDir===key?'#fff':'rgba(255,255,255,.35)', boxShadow:painelDir===key?'0 2px 10px #6411D944':'none' }}>
      {label}{count>0&&<span style={{ marginLeft:4, fontSize:9, background:urgente?'rgba(255,107,107,.35)':'rgba(255,255,255,.15)', color:urgente?'#ff9090':'#fff', borderRadius:3, padding:'0 4px' }}>{count}</span>}
    </button>
  );

  return (
    <div style={{ width:'100%', height:'100%', position:'relative', background:'#07041a', borderRadius:12, overflow:'hidden' }}>
      <style>{`@keyframes prodPulse{0%,100%{filter:brightness(1)}50%{filter:brightness(1.4)}}`}</style>

      {/* Toolbar */}
      <div style={{ position:'absolute', top:12, left:12, zIndex:10, display:'flex', flexDirection:'column', gap:7, maxWidth:320 }}>
        <div style={{ background:'rgba(0,0,0,.82)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,.08)', borderRadius:10, padding:'8px 10px', display:'flex', gap:6, flexWrap:'wrap' }}>
          {tabBtn('cadeias', '🌐 Cadeias', cadeias.length)}
          {tabBtn('passos', '🚀 Próximos Passos', gargalosCount, gargalosCount > 0)}
        </div>
        {ghostNodes.length > 0 && (
          <div style={{ background:'rgba(0,0,0,.82)', backdropFilter:'blur(10px)', border:'1px solid rgba(100,17,217,.3)', borderRadius:10, padding:'8px 10px' }}>
            <div style={{ fontSize:8, fontWeight:700, textTransform:'uppercase', letterSpacing:'.14em', color:'#9355F7', marginBottom:6 }}>👻 Simulação ({ghostNodes.length})</div>
            {ghostNodes.map(g => (
              <div key={g.nome} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:3 }}>
                <span style={{ fontSize:9, color:'rgba(255,255,255,.6)', fontFamily:"'Rajdhani',sans-serif" }}>{g.nome}</span>
                <button onClick={() => setGhostNodes(p=>p.filter(x=>x.nome!==g.nome))} style={{ background:'none', border:'none', color:'rgba(255,255,255,.3)', cursor:'pointer', fontSize:11 }}>✕</button>
              </div>
            ))}
            <button onClick={() => setGhostNodes([])} style={{ width:'100%', marginTop:4, padding:'4px 0', borderRadius:6, border:'none', background:'rgba(255,255,255,.05)', color:'rgba(255,255,255,.35)', fontSize:10, fontFamily:"'Rajdhani',sans-serif", cursor:'pointer', fontWeight:700 }}>
              Limpar simulação
            </button>
          </div>
        )}
        <div style={{ background:'rgba(0,0,0,.75)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,.07)', borderRadius:10, padding:'7px 10px' }}>
          {[
            { cor:'#7ac8ff', l:'🔵 Acúmulo' },
            { cor:'#ff6b6b', l:'🔴 Sangramento' },
            { cor:'#7aff9a', l:'✅ Equilibrado' },
            { cor:'#C87AFF', l:'📦 Sem venda' },
            { cor:'#ff6b6b', l:'🚨 Gargalo armazém', bold:true },
          ].map(({cor,l,bold})=>(
            <div key={l} style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3 }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:cor, flexShrink:0 }} />
              <span style={{ fontSize:8, color:'rgba(255,255,255,.4)', fontFamily:"'Rajdhani',sans-serif", fontWeight:bold?700:400 }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      <ReactFlow
        nodes={nodes} edges={edges} nodeTypes={nodeTypes}
        onNodeClick={onNodeClick} onPaneClick={onPaneClick}
        fitView fitViewOptions={{ padding:0.1 }}
        nodesConnectable={false} elementsSelectable={true}
        minZoom={0.04} maxZoom={2.5}
        style={{ background:'transparent' }}
      >
        <Background variant="dots" gap={28} size={1} color="rgba(255,255,255,.04)" />
        <Controls style={{ background:'rgba(0,0,0,.7)', border:'1px solid rgba(255,255,255,.1)', borderRadius:8 }} />
        <MiniMap nodeStrokeWidth={2} zoomable pannable
          style={{ background:'rgba(0,0,0,.7)', border:'1px solid rgba(255,255,255,.1)', borderRadius:8 }}
          nodeColor={n => {
            if (n.data?.urgenciaArmazem||n.data?.temUrgencia) return '#ff6b6b';
            if (n.data?.fluxo) return {acumulo:'#7ac8ff',sangramento:'#ff6b6b',equilibrio:'#7aff9a',sem_venda:'#C87AFF',sem_producao:'#FFD700'}[n.data.fluxo.status]||'#333';
            return SETOR_CONFIG[n.data?.setor]?.cor||'#6411D9';
          }}
        />
      </ReactFlow>

      {painelDir === 'cadeias' && <PainelCadeias cadeias={cadeias} ativa={cadeiaAtiva} onSelecionar={setCadeiaAtiva} onFechar={() => setPainelDir(null)} />}
      {painelDir === 'passos' && <PainelProximosPassos dados={dados} graph={graph} saldo={saldo} onGhost={addGhost} onFechar={() => setPainelDir(null)} />}
      {prodSelecionadoId && <PainelEquilibrio prodId={prodSelecionadoId} dados={dados} graph={graph} onFechar={() => { setNodeSelecionado(null); setHighlight(null); }} onGhost={addGhost} />}
    </div>
  );
}

export default function EcosystemMap() {
  return <ReactFlowProvider><EcosystemMapInner /></ReactFlowProvider>;
}