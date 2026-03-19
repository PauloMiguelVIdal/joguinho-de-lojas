import React, { useContext, useMemo, useState, useCallback, memo } from 'react';
import ReactFlow, {
  Background, Controls, MiniMap, ReactFlowProvider,
  Handle, Position, MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { CentraldeDadosContext } from '../centralDeDadosContext';
import { DadosEconomyGlobalContext } from '../dadosEconomyGlobal';
import { FORMULAS_EDIFICIOS } from './productionFormulasConfig';
import { productsCatalog } from './TablePrice';

// ═══════════════════════════════════════════════════════════
// CONSTANTES
// ═══════════════════════════════════════════════════════════
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
  if (!n && n !== 0) return '—';
  if (n >= 1e6) return (n/1e6).toFixed(1)+'M';
  if (n >= 1e3) return (n/1e3).toFixed(0)+'K';
  return String(n);
};

// Constrói o mapa: produtoId → lista de edificios que o produzem / consomem
function buildProductMap() {
  const produz = {};   // produtoId → [{ edificio, formula }]
  const consome = {};  // produtoId → [{ edificio, formula }]

  FORMULAS_EDIFICIOS.forEach(edConf => {
    edConf.formulas.forEach(formula => {
      // outputs → edifício produz este produto
      Object.keys(formula.output || {}).forEach(prodId => {
        if (!produz[prodId]) produz[prodId] = [];
        produz[prodId].push({ edificioNome: edConf.nomeEdificio, setor: edConf.setor, formula });
      });
      // inputs → edifício consome este produto
      Object.keys(formula.input || {}).forEach(prodId => {
        if (!consome[prodId]) consome[prodId] = [];
        consome[prodId].push({ edificioNome: edConf.nomeEdificio, setor: edConf.setor, formula });
      });
    });
  });

  return { produz, consome };
}

// ═══════════════════════════════════════════════════════════
// NÓS CUSTOMIZADOS
// ═══════════════════════════════════════════════════════════

// Nó de PRODUTO (com ícone emoji)
const ProdutoNode = memo(({ data, selected }) => {
  const { produtoId, temEstoque, qtdEstoque } = data;
  const prod = productsCatalog[produtoId];
  if (!prod) return null;

  return (
    <div style={{
      background: temEstoque ? 'rgba(100,17,217,.25)' : 'rgba(10,6,24,.9)',
      border: `1.5px solid ${selected ? '#fff' : temEstoque ? '#934CFF' : 'rgba(255,255,255,.12)'}`,
      borderRadius: 12,
      padding: '8px 12px',
      cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: 8,
      boxShadow: selected ? '0 0 0 2px #fff, 0 4px 20px #934CFF88' : temEstoque ? '0 2px 12px #6411D944' : 'none',
      transition: 'all .2s',
      minWidth: 130,
    }}>
      <Handle type="target" position={Position.Left}  style={{ background: '#934CFF', width: 7, height: 7, border: '2px solid #000', left: -5 }} />
      <Handle type="source" position={Position.Right} style={{ background: '#934CFF', width: 7, height: 7, border: '2px solid #000', right: -5 }} />

      {/* Ícone grande */}
      <span style={{ fontSize: 22, lineHeight: 1, flexShrink: 0 }}>{prod.icon}</span>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 10, fontWeight: 700,
          color: temEstoque ? '#fff' : 'rgba(255,255,255,.55)',
          fontFamily: "'Rajdhani',sans-serif",
          lineHeight: 1.2, marginBottom: 2,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {prod.nome}
        </div>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <span style={{
            fontSize: 8, color: 'rgba(255,255,255,.3)',
            textTransform: 'uppercase', letterSpacing: '.06em',
          }}>
            {prod.categoriaFisica}
          </span>
          {temEstoque && qtdEstoque > 0 && (
            <span style={{
              fontSize: 8, fontWeight: 800, background: '#6411D9',
              color: '#fff', borderRadius: 4, padding: '0 5px',
              fontFamily: "'Rajdhani',sans-serif",
            }}>
              {fmt(qtdEstoque)} {prod.unidade}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

// Nó de EDIFÍCIO (na cadeia de produção)
const EdificioChainNode = memo(({ data, selected }) => {
  const { nomeEdificio, setor, temAtivo, quantidade, formula } = data;
  const cfg = SETOR_CONFIG[setor] || SETOR_CONFIG.agricultura;

  return (
    <div style={{
      background: temAtivo ? `linear-gradient(135deg,${cfg.cor}44,${cfg.corBg}cc)` : 'rgba(10,6,24,.85)',
      border: `1.5px solid ${selected ? '#fff' : temAtivo ? cfg.cor : 'rgba(255,255,255,.1)'}`,
      borderRadius: 12,
      padding: '8px 12px',
      cursor: 'pointer',
      minWidth: 160,
      boxShadow: selected ? `0 0 0 2px #fff,0 4px 24px ${cfg.cor}88` : temAtivo ? `0 2px 12px ${cfg.cor}44` : 'none',
      transition: 'all .2s',
      opacity: temAtivo ? 1 : 0.55,
    }}>
      <Handle type="target" position={Position.Left}  style={{ background: cfg.cor, width: 7, height: 7, border: '2px solid #000', left: -5 }} />
      <Handle type="source" position={Position.Right} style={{ background: cfg.cor, width: 7, height: 7, border: '2px solid #000', right: -5 }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, marginBottom: 5 }}>
        <span style={{
          fontSize: 9, fontWeight: 800, color: cfg.cor,
          textTransform: 'uppercase', letterSpacing: '.08em',
        }}>
          {cfg.label}
        </span>
        <span style={{
          fontSize: 9, fontWeight: 800, padding: '1px 6px', borderRadius: 4,
          background: temAtivo ? cfg.cor : 'rgba(255,255,255,.08)',
          color: '#fff', fontFamily: "'Rajdhani',sans-serif",
        }}>
          ×{quantidade || 0}
        </span>
      </div>

      <div style={{
        fontSize: 10, fontWeight: 700,
        color: temAtivo ? '#fff' : 'rgba(255,255,255,.45)',
        fontFamily: "'Rajdhani',sans-serif",
        lineHeight: 1.2, marginBottom: formula ? 5 : 0,
      }}>
        {nomeEdificio}
      </div>

      {/* Mini receita da fórmula */}
      {formula && (
        <div style={{
          background: 'rgba(0,0,0,.3)', borderRadius: 6, padding: '4px 6px',
          display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap',
        }}>
          {Object.keys(formula.input || {}).slice(0, 3).map(id => {
            const p = productsCatalog[id];
            return p ? (
              <span key={id} style={{ fontSize: 12 }} title={p.nome}>{p.icon}</span>
            ) : null;
          })}
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,.3)', fontWeight: 700 }}>→</span>
          {Object.keys(formula.output || {}).slice(0, 3).map(id => {
            const p = productsCatalog[id];
            return p ? (
              <span key={id} style={{ fontSize: 12 }} title={p.nome}>{p.icon}</span>
            ) : null;
          })}
          {formula.duracao && (
            <span style={{ fontSize: 8, color: 'rgba(255,255,255,.25)', marginLeft: 2 }}>{formula.duracao}d</span>
          )}
        </div>
      )}
    </div>
  );
});

// ═══════════════════════════════════════════════════════════
// MODOS DE VISUALIZAÇÃO
// ═══════════════════════════════════════════════════════════

// MODO 1: Cadeia de produtos (produto → produto → produto)
function buildProductChain(dados, filtroSetor, highlightProd) {
  const nodes = [], edges = [];
  const edgesSet = new Set();
  const { produz, consome } = buildProductMap();

  // Todos os produtos que aparecem em pelo menos uma fórmula
  const produtosVisiveis = new Set([
    ...Object.keys(produz),
    ...Object.keys(consome),
  ]);

  // Filtra por setor se necessário
  const edConfs = filtroSetor
    ? FORMULAS_EDIFICIOS.filter(e => e.setor === filtroSetor)
    : FORMULAS_EDIFICIOS;

  const produtosNoFiltro = new Set();
  edConfs.forEach(ed => {
    ed.formulas.forEach(f => {
      Object.keys(f.input || {}).forEach(id => produtosNoFiltro.add(id));
      Object.keys(f.output || {}).forEach(id => produtosNoFiltro.add(id));
    });
  });

  // Layout: agrupa produtos por nível de processamento
  // Nível 0: matérias-primas (só produzidos, nunca como input de nada)
  // Nível N: produto que consome outputs de nível N-1
  const nivelProduto = {};
  const calcularNivel = (prodId, visitados = new Set()) => {
    if (nivelProduto[prodId] !== undefined) return nivelProduto[prodId];
    if (visitados.has(prodId)) return 0;
    visitados.add(prodId);

    const inputs = consome[prodId]; // edificios que produzem este produto... nao
    // Olha quem PRODUZ este produto e quais inputs eles precisam
    const produtores = produz[prodId] || [];
    let maxNivel = 0;
    produtores.forEach(({ formula }) => {
      Object.keys(formula.input || {}).forEach(inputId => {
        const n = calcularNivel(inputId, new Set(visitados));
        maxNivel = Math.max(maxNivel, n + 1);
      });
    });
    nivelProduto[prodId] = maxNivel;
    return maxNivel;
  };

  const produtosArr = [...produtosNoFiltro].filter(id => productsCatalog[id]);
  produtosArr.forEach(id => calcularNivel(id));

  // Agrupa por nível
  const porNivel = {};
  produtosArr.forEach(id => {
    const n = nivelProduto[id] || 0;
    if (!porNivel[n]) porNivel[n] = [];
    porNivel[n].push(id);
  });

  const X_STEP = 250, Y_STEP = 80;
  const niveis = Object.keys(porNivel).sort((a, b) => Number(a) - Number(b));

  // Estoque atual do jogador
  const estoqueAtual = {};
  SETORES.forEach(s => {
    dados[s]?.edificios?.forEach(ed => {
      // pega storageState se existir
    });
  });

  // Nós de produto
  niveis.forEach(nivel => {
    const lista = porNivel[nivel];
    lista.forEach((prodId, i) => {
      const prod = productsCatalog[prodId];
      const isHL = highlightProd === prodId;
      nodes.push({
        id: `prod-${prodId}`,
        type: 'produtoNode',
        position: {
          x: Number(nivel) * X_STEP,
          y: i * Y_STEP - (lista.length * Y_STEP) / 2,
        },
        data: {
          produtoId: prodId,
          temEstoque: false,
          qtdEstoque: 0,
          isHighlight: isHL,
        },
        style: {
          opacity: highlightProd && !isHL ? 0.25 : 1,
        },
      });
    });
  });

  // Edges: produto_A → produto_B quando um edifício usa A para produzir B
  edConfs.forEach(edConf => {
    edConf.formulas.forEach(formula => {
      const inputs  = Object.keys(formula.input  || {});
      const outputs = Object.keys(formula.output || {});

      inputs.forEach(inputId => {
        if (!produtosNoFiltro.has(inputId)) return;
        outputs.forEach(outputId => {
          if (!produtosNoFiltro.has(outputId)) return;
          const edgeId = `${inputId}→${outputId}@${edConf.nomeEdificio}`;
          if (edgesSet.has(edgeId)) return;
          edgesSet.add(edgeId);

          const isHL = highlightProd === inputId || highlightProd === outputId;
          const inputProd  = productsCatalog[inputId];
          const outputProd = productsCatalog[outputId];
          const cfg = SETOR_CONFIG[edConf.setor] || SETOR_CONFIG.agricultura;

          edges.push({
            id: edgeId,
            source: `prod-${inputId}`,
            target: `prod-${outputId}`,
            label: edConf.nomeEdificio,
            labelStyle: { fill: cfg.cor, fontWeight: 700, fontSize: 8 },
            labelBgStyle: { fill: 'rgba(0,0,0,.75)', borderRadius: 3 },
            style: {
              stroke: cfg.cor,
              strokeWidth: isHL ? 2.5 : 1.2,
              opacity: highlightProd && !isHL ? 0.06 : 0.8,
            },
            markerEnd: { type: MarkerType.ArrowClosed, color: cfg.cor },
          });
        });
      });
    });
  });

  return { nodes, edges };
}

// MODO 2: Cadeia de edifícios (edifício → produto → edifício)
function buildBuildingProductChain(dados, filtroSetor, highlightNode) {
  const nodes = [], edges = [];
  const edgesSet = new Set();
  const { produz, consome } = buildProductMap();

  const edConfs = filtroSetor
    ? FORMULAS_EDIFICIOS.filter(e => e.setor === filtroSetor)
    : FORMULAS_EDIFICIOS;

  const produtosNecessarios = new Set();
  edConfs.forEach(ed => {
    ed.formulas.forEach(f => {
      Object.keys(f.input  || {}).forEach(id => produtosNecessarios.add(id));
      Object.keys(f.output || {}).forEach(id => produtosNecessarios.add(id));
    });
  });

  // Layout em colunas por setor
  const setoresPresentesOrdem = filtroSetor
    ? [filtroSetor]
    : SETORES.filter(s => edConfs.some(e => e.setor === s));

  const X_SETOR = 600, Y_ED = 200, X_PROD_OFFSET = 180;

  // Nós de edifício
  const posEdificio = {};
  setoresPresentesOrdem.forEach((s, si) => {
    const edsSetor = edConfs.filter(e => e.setor === s);
    edsSetor.forEach((edConf, ei) => {
      const x = si * X_SETOR;
      const y = ei * Y_ED;
      posEdificio[edConf.nomeEdificio] = { x, y };

      // Pega dados reais do contexto
      const edDado = dados[s]?.edificios?.find(e => e.nome === edConf.nomeEdificio);
      const temAtivo = (edDado?.quantidade || 0) > 0;

      const isHL = highlightNode === `ed-${edConf.nomeEdificio}`;
      nodes.push({
        id: `ed-${edConf.nomeEdificio}`,
        type: 'edificioChainNode',
        position: { x, y },
        data: {
          nomeEdificio: edConf.nomeEdificio,
          setor: s,
          temAtivo,
          quantidade: edDado?.quantidade || 0,
          formula: edConf.formulas[0],
        },
        style: {
          opacity: highlightNode && !isHL ? 0.2 : 1,
        },
      });
    });
  });

  // Nós de produto intermediário + edges
  const produtosAdicionados = new Set();

  edConfs.forEach(edConf => {
    edConf.formulas.forEach((formula, fi) => {
      const pos = posEdificio[edConf.nomeEdificio];
      if (!pos) return;

      // Para cada OUTPUT do edifício
      Object.keys(formula.output || {}).forEach((prodId, pi) => {
        if (!productsCatalog[prodId]) return;

        const nodeProdId = `prod-${prodId}`;

        // Cria nó do produto se ainda não existe
        if (!produtosAdicionados.has(nodeProdId)) {
          produtosAdicionados.add(nodeProdId);

          // Posiciona produto entre quem produz e quem consome
          const consumidorEds = (consome[prodId] || []).filter(c =>
            edConfs.some(e => e.nomeEdificio === c.edificioNome)
          );

          const produtorPos = pos;
          const consumidorPos = consumidorEds[0]
            ? posEdificio[consumidorEds[0].edificioNome] || pos
            : pos;

          const xProd = (produtorPos.x + (consumidorPos.x || produtorPos.x + 250)) / 2;
          const yProd = produtorPos.y + 50 + pi * 70;

          const isHL = highlightNode === nodeProdId;
          nodes.push({
            id: nodeProdId,
            type: 'produtoNode',
            position: { x: xProd, y: yProd },
            data: { produtoId: prodId, temEstoque: false, qtdEstoque: 0 },
            style: { opacity: highlightNode && !isHL ? 0.15 : 1 },
          });
        }

        // Edge: edifício → produto
        const e1 = `ed-${edConf.nomeEdificio}→${nodeProdId}`;
        if (!edgesSet.has(e1)) {
          edgesSet.add(e1);
          const cfg = SETOR_CONFIG[edConf.setor];
          const isHL = highlightNode === `ed-${edConf.nomeEdificio}` || highlightNode === nodeProdId;
          edges.push({
            id: e1,
            source: `ed-${edConf.nomeEdificio}`,
            target: nodeProdId,
            style: { stroke: cfg.cor, strokeWidth: isHL ? 2.5 : 1.2, opacity: highlightNode && !isHL ? 0.05 : 0.85 },
            markerEnd: { type: MarkerType.ArrowClosed, color: cfg.cor },
            label: `×${formula.output[prodId]}`,
            labelStyle: { fill: cfg.cor, fontWeight: 700, fontSize: 8 },
            labelBgStyle: { fill: 'rgba(0,0,0,.75)', borderRadius: 3 },
          });
        }

        // Edge: produto → edifícios que consomem
        (consome[prodId] || []).forEach(c => {
          if (!edConfs.some(e => e.nomeEdificio === c.edificioNome)) return;
          const e2 = `${nodeProdId}→ed-${c.edificioNome}`;
          if (edgesSet.has(e2)) return;
          edgesSet.add(e2);

          const cfgC = SETOR_CONFIG[c.setor] || SETOR_CONFIG.agricultura;
          const isHL = highlightNode === nodeProdId || highlightNode === `ed-${c.edificioNome}`;
          edges.push({
            id: e2,
            source: nodeProdId,
            target: `ed-${c.edificioNome}`,
            style: { stroke: cfgC.cor, strokeWidth: isHL ? 2.5 : 1.2, strokeDasharray: '5 3', opacity: highlightNode && !isHL ? 0.05 : 0.75 },
            markerEnd: { type: MarkerType.ArrowClosed, color: cfgC.cor },
            label: `${Object.keys(c.formula.input).find(k => k === prodId) ? `×${c.formula.input[prodId]}` : ''}`,
            labelStyle: { fill: cfgC.cor, fontWeight: 700, fontSize: 8 },
            labelBgStyle: { fill: 'rgba(0,0,0,.75)', borderRadius: 3 },
          });
        });
      });
    });
  });

  return { nodes, edges };
}

// ═══════════════════════════════════════════════════════════
// PAINEL DE DETALHE DO PRODUTO
// ═══════════════════════════════════════════════════════════
const PainelProduto = ({ produtoId, dados, onFechar }) => {
  if (!produtoId) return null;
  const prod = productsCatalog[produtoId];
  if (!prod) return null;

  const { produz, consome } = useMemo(buildProductMap, []);

  const produtores = produz[produtoId] || [];
  const consumidores = consome[produtoId] || [];

  return (
    <div style={{
      position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
      zIndex: 20, width: 420, maxHeight: '38vh', overflowY: 'auto',
      background: 'linear-gradient(160deg,#0d0820,#1a0d40)',
      border: '1.5px solid rgba(147,76,255,.4)', borderRadius: 14,
      padding: '14px 16px', boxShadow: '0 8px 32px rgba(0,0,0,.85)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 32 }}>{prod.icon}</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', fontFamily: "'Rajdhani',sans-serif" }}>{prod.nome}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,.35)', textTransform: 'uppercase', letterSpacing: '.12em' }}>
              {prod.categoriaFisica} · {prod.setor}
            </div>
          </div>
        </div>
        <button onClick={onFechar} style={{ background: 'rgba(255,255,255,.08)', border: 'none', borderRadius: 6, color: '#fff', cursor: 'pointer', padding: '4px 8px', fontSize: 12 }}>✕</button>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        {/* Produzido por */}
        {produtores.length > 0 && (
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: 'rgba(255,255,255,.3)', marginBottom: 6 }}>
              Produzido em ({produtores.length})
            </div>
            {produtores.map(({ edificioNome, setor, formula }) => {
              const cfg = SETOR_CONFIG[setor] || SETOR_CONFIG.agricultura;
              return (
                <div key={edificioNome + formula.id} style={{
                  background: `${cfg.cor}18`, border: `1px solid ${cfg.cor}33`,
                  borderRadius: 8, padding: '6px 8px', marginBottom: 5,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: "'Rajdhani',sans-serif" }}>{edificioNome}</span>
                    <span style={{ fontSize: 8, color: cfg.cor, fontWeight: 700 }}>{cfg.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
                    {Object.keys(formula.input || {}).slice(0, 4).map(id => {
                      const p = productsCatalog[id];
                      return p ? <span key={id} title={p.nome}>{p.icon}</span> : null;
                    })}
                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,.4)', fontWeight: 700 }}>→</span>
                    {Object.keys(formula.output || {}).slice(0, 4).map(id => {
                      const p = productsCatalog[id];
                      return p ? (
                        <span key={id} title={`${p.nome} ×${formula.output[id]}`}
                          style={{ background: id === produtoId ? 'rgba(147,76,255,.3)' : 'transparent', borderRadius: 3, padding: '0 2px' }}>
                          {p.icon}
                        </span>
                      ) : null;
                    })}
                    {formula.duracao && <span style={{ fontSize: 8, color: 'rgba(255,255,255,.25)', marginLeft: 4 }}>{formula.duracao}d</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Consumido em */}
        {consumidores.length > 0 && (
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: 'rgba(255,255,255,.3)', marginBottom: 6 }}>
              Usado em ({consumidores.length})
            </div>
            {consumidores.map(({ edificioNome, setor, formula }) => {
              const cfg = SETOR_CONFIG[setor] || SETOR_CONFIG.agricultura;
              return (
                <div key={edificioNome + formula.id} style={{
                  background: `${cfg.cor}18`, border: `1px solid ${cfg.cor}33`,
                  borderRadius: 8, padding: '6px 8px', marginBottom: 5,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: "'Rajdhani',sans-serif" }}>{edificioNome}</span>
                    <span style={{ fontSize: 8, color: cfg.cor, fontWeight: 700 }}>{cfg.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
                    {Object.keys(formula.input || {}).slice(0, 4).map(id => {
                      const p = productsCatalog[id];
                      return p ? (
                        <span key={id} title={`${p.nome} ×${formula.input[id]}`}
                          style={{ background: id === produtoId ? 'rgba(230,0,0,.3)' : 'transparent', borderRadius: 3, padding: '0 2px' }}>
                          {p.icon}
                        </span>
                      ) : null;
                    })}
                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,.4)', fontWeight: 700 }}>→</span>
                    {Object.keys(formula.output || {}).slice(0, 4).map(id => {
                      const p = productsCatalog[id];
                      return p ? <span key={id} title={p.nome}>{p.icon}</span> : null;
                    })}
                    {formula.duracao && <span style={{ fontSize: 8, color: 'rgba(255,255,255,.25)', marginLeft: 4 }}>{formula.duracao}d</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════
const nodeTypes = {
  produtoNode: ProdutoNode,
  edificioChainNode: EdificioChainNode,
};

function ProductionChainInner() {
  const { dados } = useContext(CentraldeDadosContext);
  const { economiaSetores } = useContext(DadosEconomyGlobalContext);

  const [modo, setModo] = useState('produtos'); // 'produtos' | 'edificios'
  const [filtroSetor, setFiltroSetor] = useState(null);
  const [highlightNode, setHighlightNode] = useState(null);
  const [nodeSelecionado, setNodeSelecionado] = useState(null);
  const [buscaTexto, setBuscaTexto] = useState('');

  // Nós e edges calculados
  const { nodes: nodesBase, edges } = useMemo(() => {
    if (modo === 'produtos') return buildProductChain(dados, filtroSetor, highlightNode);
    return buildBuildingProductChain(dados, filtroSetor, highlightNode);
  }, [dados, modo, filtroSetor, highlightNode]);

  // Filtro por busca de texto
  const nodes = useMemo(() => {
    if (!buscaTexto.trim()) return nodesBase;
    const texto = buscaTexto.toLowerCase();
    return nodesBase.map(n => {
      const label = n.data?.produtoId
        ? (productsCatalog[n.data.produtoId]?.nome || '').toLowerCase()
        : (n.data?.nomeEdificio || '').toLowerCase();
      const match = label.includes(texto);
      return { ...n, style: { ...n.style, opacity: match ? 1 : 0.08 } };
    });
  }, [nodesBase, buscaTexto]);

  const onNodeClick = useCallback((_, n) => {
    setNodeSelecionado(n);
    setHighlightNode(n.id);
  }, []);
  const onPaneClick = useCallback(() => {
    setNodeSelecionado(null);
    setHighlightNode(null);
  }, []);

  const btnBase = {
    border: 'none', borderRadius: 7, padding: '5px 12px', cursor: 'pointer',
    fontFamily: "'Rajdhani',sans-serif", fontSize: 10, fontWeight: 700,
    letterSpacing: '.06em', transition: 'all .15s',
  };

  // Produto selecionado para o painel de detalhe
  const produtoSelecionadoId = nodeSelecionado?.data?.produtoId || null;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#07041a', borderRadius: 12, overflow: 'hidden' }}>

      {/* ── TOOLBAR ────────────────────────────── */}
      <div style={{
        position: 'absolute', top: 12, left: 12, zIndex: 10,
        display: 'flex', flexDirection: 'column', gap: 7, maxWidth: 320,
      }}>

        {/* Modo */}
        <div style={{ background: 'rgba(0,0,0,.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 10, padding: '8px 10px' }}>
          <div style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: 'rgba(255,255,255,.28)', marginBottom: 6 }}>Visualização</div>
          <div style={{ display: 'flex', gap: 5 }}>
            <button onClick={() => setModo('produtos')} style={{ ...btnBase, background: modo === 'produtos' ? 'linear-gradient(135deg,#4C14A9,#6411D9)' : 'rgba(255,255,255,.06)', color: modo === 'produtos' ? '#fff' : 'rgba(255,255,255,.4)' }}>
              🧪 Cadeia de produtos
            </button>
            <button onClick={() => setModo('edificios')} style={{ ...btnBase, background: modo === 'edificios' ? 'linear-gradient(135deg,#4C14A9,#6411D9)' : 'rgba(255,255,255,.06)', color: modo === 'edificios' ? '#fff' : 'rgba(255,255,255,.4)' }}>
              🏗️ Edifício→Produto
            </button>
          </div>
        </div>

        {/* Filtro de setor */}
        <div style={{ background: 'rgba(0,0,0,.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 10, padding: '8px 10px' }}>
          <div style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: 'rgba(255,255,255,.28)', marginBottom: 6 }}>Setor</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            <button onClick={() => setFiltroSetor(null)} style={{ ...btnBase, background: !filtroSetor ? 'rgba(255,255,255,.2)' : 'rgba(255,255,255,.06)', color: !filtroSetor ? '#fff' : 'rgba(255,255,255,.35)' }}>
              Todos
            </button>
            {SETORES.map(s => {
              const cfg = SETOR_CONFIG[s];
              return (
                <button key={s} onClick={() => setFiltroSetor(s === filtroSetor ? null : s)} style={{ ...btnBase, background: filtroSetor === s ? cfg.cor : 'rgba(255,255,255,.06)', color: filtroSetor === s ? '#fff' : 'rgba(255,255,255,.35)' }}>
                  {cfg.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Busca */}
        <div style={{ background: 'rgba(0,0,0,.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 10, padding: '8px 10px' }}>
          <input
            type="text"
            value={buscaTexto}
            onChange={e => setBuscaTexto(e.target.value)}
            placeholder="Buscar produto ou edifício..."
            style={{
              width: '100%', background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.1)',
              borderRadius: 7, padding: '5px 10px', color: '#fff', fontSize: 11,
              fontFamily: "'Rajdhani',sans-serif", outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Legenda */}
        <div style={{ background: 'rgba(0,0,0,.75)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 10, padding: '7px 10px' }}>
          <div style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: 'rgba(255,255,255,.28)', marginBottom: 5 }}>Legenda</div>
          {[
            { cor: '#0C9123', l: 'Agricultura' },
            { cor: '#FF6F00', l: 'Tecnologia' },
            { cor: '#808080', l: 'Indústria' },
            { cor: '#E60000', l: 'Comércio' },
            { cor: '#3333CC', l: 'Imobiliário' },
            { cor: '#E6B800', l: 'Energia' },
          ].map(({ cor, l }) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: cor, flexShrink: 0 }} />
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,.45)', fontFamily: "'Rajdhani',sans-serif" }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── REACT FLOW ─────────────────────────── */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        fitView
        fitViewOptions={{ padding: 0.1 }}
        nodesConnectable={false}
        elementsSelectable={true}
        minZoom={0.05}
        maxZoom={2.5}
        style={{ background: 'transparent' }}
      >
        <Background variant="dots" gap={24} size={1} color="rgba(255,255,255,.04)" />
        <Controls style={{ background: 'rgba(0,0,0,.7)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 8 }} />
        <MiniMap
          nodeStrokeWidth={2} zoomable pannable
          style={{ background: 'rgba(0,0,0,.7)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 8 }}
          nodeColor={n => {
            if (n.type === 'produtoNode') return '#6411D9';
            const cfg = SETOR_CONFIG[n.data?.setor];
            return n.data?.temAtivo ? (cfg?.cor || '#6411D9') : 'rgba(255,255,255,.07)';
          }}
        />
      </ReactFlow>

      {/* ── PAINEL DETALHE PRODUTO ─────────────── */}
      {produtoSelecionadoId && (
        <PainelProduto
          produtoId={produtoSelecionadoId}
          dados={dados}
          onFechar={() => { setNodeSelecionado(null); setHighlightNode(null); }}
        />
      )}
    </div>
  );
}

export default function ProductionChainTree() {
  return (
    <ReactFlowProvider>
      <ProductionChainInner />
    </ReactFlowProvider>
  );
}