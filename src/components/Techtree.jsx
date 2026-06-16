import React, { useContext, useMemo, useState, useCallback } from 'react';
import ReactFlow, {
  Background, Controls, MiniMap, ReactFlowProvider,
  Handle, Position, MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { CentraldeDadosContext } from '../centralDeDadosContext';
import { DadosEconomyGlobalContext } from '../dadosEconomyGlobal';

// ── Config de setores ─────────────────────────────────────
const HEX_CENTER = { x: 1400, y: 900 }; // centro da tela
const HEX_RADIUS = 900; // distância do centro

const SETOR_CONFIG = {
  agricultura: { cor: '#0C9123', corBg: '#003816', corBorda: '#4CAF5099', label: 'Agricultura', col: 0, row: 0 },
  tecnologia:  { cor: '#FF6F00', corBg: '#A64B00', corBorda: '#FF8C4299', label: 'Tecnologia',  col: 2, row: 0 },
  industria:   { cor: '#808080', corBg: '#1A1A1A', corBorda: '#B3B3B399', label: 'Indústria',   col: 4, row: 0 },
  comercio:    { cor: '#E60000', corBg: '#660000', corBorda: '#FF4D4D99', label: 'Comércio',    col: 1, row: 1 },
  imobiliario: { cor: '#3333CC', corBg: '#000066', corBorda: '#6666FF99', label: 'Imobiliário', col: 3, row: 1 },
  energia:     { cor: '#E6B800', corBg: '#665200', corBorda: '#FFD96699', label: 'Energia',     col: 2, row: 2 },
};
const SETORES = Object.keys(SETOR_CONFIG);


const ORDEM_HEX = [
  'tecnologia',
  'agricultura',
  'energia',
  'industria',
  'comercio',
  'imobiliario',
];

function getHexPosition(index) {
  const angle = (Math.PI / 3) * index - Math.PI / 2; // começa no topo
  return {
    x: HEX_CENTER.x + Math.cos(angle) * HEX_RADIUS,
    y: HEX_CENTER.y + Math.sin(angle) * HEX_RADIUS,
  };
}
// ── Helpers ───────────────────────────────────────────────
const fmt = (n) => {
  if (!n && n !== 0) return '—';
  if (n >= 1e9) return (n/1e9).toFixed(1)+'B';
  if (n >= 1e6) return (n/1e6).toFixed(1)+'M';
  if (n >= 1e3) return (n/1e3).toFixed(0)+'K';
  return String(n);
};

const HEX_W = 500, HEX_H = 400, HEX_GAP_X = 80, HEX_GAP_Y = 60;
function hexPos(col, row) {
  return {
    x: col * (HEX_W + HEX_GAP_X) + (row % 2 === 1 ? (HEX_W + HEX_GAP_X) / 2 : 0),
    y: row * (HEX_H * 0.72 + HEX_GAP_Y),
  };
}

function encontrarSetor(dados, nome) {
  for (const s of SETORES) {
    if (dados[s]?.edificios?.some(e => e.nome === nome)) return s;
  }
  return null;
}

// ── Score de sinergia — 4 eixos independentes ────────────
// recebeRedCusto: edifícios ativos REDUZEM meu custo  → alta prioridade (dinheiro economizado direto)
// recebeAumFatu:  edifícios ativos AUMENTAM meu fatu  → máxima prioridade (receita adicional)
// forneceRedCusto: eu REDUZO custo de edifícios ativos → bônus secundário
// forneceAumFatu:  eu AUMENTO fatu de edifícios ativos → bônus secundário

function calcularScore(dados, ed) {
  // Acumuladores por eixo
  let recebeRedCusto = 0, recebeAumFatu = 0;
  let forneceRedCusto = 0, forneceAumFatu = 0;

  const detalhes = {
    recebeRedCusto: [],  // { de, valor, qtdEd }
    recebeAumFatu:  [],  // { de, valor, qtdEd }
    forneceRedCusto: [], // { para, valor, qtdEd }
    forneceAumFatu:  [], // { para, valor, qtdEd }
  };

  // ── O que o novo edifício RECEBE de quem já existe ────
  ed.RecebeMelhoraEficiencia?.forEach(m => {
    const s = encontrarSetor(dados, m.nome);
    if (!s) return;
    const ref = dados[s]?.edificios?.find(e => e.nome === m.nome);
    if (!ref || ref.quantidade === 0) return;

    const rc = m.redCusto?.nível1 || 0;
    const af = m.aumFatu?.nível1  || 0;
    const qtd = ref.quantidade;

    if (rc > 0) {
      recebeRedCusto += rc * qtd;
      detalhes.recebeRedCusto.push({ de: m.nome, valor: rc, qtdEd: qtd, setor: s });
    }
    if (af > 0) {
      recebeAumFatu += af * qtd;
      detalhes.recebeAumFatu.push({ de: m.nome, valor: af, qtdEd: qtd, setor: s });
    }
  });

  // ── O que o novo edifício FORNECE para quem já existe ──
  ed.ForneceMelhoraEficiencia?.forEach(m => {
    const s = encontrarSetor(dados, m.nome);
    if (!s) return;
    const ref = dados[s]?.edificios?.find(e => e.nome === m.nome);
    if (!ref || ref.quantidade === 0) return;

    const rc = m.redCusto?.nível1 || 0;
    const af = m.aumFatu?.nível1  || 0;
    const qtd = ref.quantidade;

    if (rc > 0) {
      forneceRedCusto += rc * qtd;
      detalhes.forneceRedCusto.push({ para: m.nome, valor: rc, qtdEd: qtd, setor: s });
    }
    if (af > 0) {
      forneceAumFatu += af * qtd;
      detalhes.forneceAumFatu.push({ para: m.nome, valor: af, qtdEd: qtd, setor: s });
    }
  });

  // ── Score ponderado ────────────────────────────────────
  // aumFatu > redCusto (receita > economia)
  // receber > fornecer (benefício direto > indireto)
  const score =
    recebeAumFatu  * 3.5 +   // ★★★★ máxima prioridade
    recebeRedCusto * 2.5 +   // ★★★  alta prioridade
    forneceAumFatu * 1.5 +   // ★★   bônus moderado
    forneceRedCusto * 1.0;   // ★    bônus menor

  return {
    score,
    recebeRedCusto, recebeAumFatu,
    forneceRedCusto, forneceAumFatu,
    detalhes,
    temBeneficioDireto: recebeAumFatu > 0 || recebeRedCusto > 0,
  };
}

function getRecomendacoes(dados, saldo) {
  const lista = [];
  SETORES.forEach(s => {
    dados[s]?.edificios?.forEach((ed, idx) => {
      if (ed.quantidade > 0) return;
      if (!ed.licençaLiberado?.liberado) return;
      const resultado = calcularScore(dados, ed);
      if (resultado.score <= 0) return;
      lista.push({
        ed, idx, setor: s,
        ...resultado,
        podeComprar: saldo >= (ed.custoConstrucao || 0),
      });
    });
  });
  return lista.sort((a, b) => b.score - a.score).slice(0, 10);
}

// ── Nó customizado ────────────────────────────────────────
const HexNode = React.memo(({ data, selected }) => {
  const { label, quantidade, custo, setor, fatu, temAtivo, isLabel } = data;
  const cfg = SETOR_CONFIG[setor] || SETOR_CONFIG.agricultura;

  if (isLabel) return (
    <div style={{ background: cfg.cor, borderRadius: 8, padding: '5px 14px', color: '#fff', fontWeight: 800, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', textAlign: 'center', pointerEvents: 'none' }}>
      {label}
    </div>
  );

  return (
    <div style={{
      width: 148,
      background: temAtivo ? `linear-gradient(135deg,${cfg.cor}44 0%,${cfg.corBg}cc 100%)` : 'rgba(10,6,24,.85)',
      border: `1.5px solid ${selected ? '#fff' : temAtivo ? cfg.cor : 'rgba(255,255,255,.1)'}`,
      borderRadius: 10,
      padding: '7px 9px',
      cursor: 'pointer',
      boxShadow: selected ? `0 0 0 2px #fff,0 4px 24px ${cfg.cor}88` : temAtivo ? `0 2px 12px ${cfg.cor}44` : 'none',
      transition: 'all .2s',
      opacity: temAtivo ? 1 : 0.5,
    }}>
      <Handle type="target" position={Position.Left}  style={{ background: cfg.cor, width: 7, height: 7, border: '2px solid #000', left: -5 }} />
      <Handle type="source" position={Position.Right} style={{ background: cfg.cor, width: 7, height: 7, border: '2px solid #000', right: -5 }} />
      <div style={{ fontSize: 9, fontWeight: 700, color: temAtivo ? '#fff' : 'rgba(255,255,255,.4)', lineHeight: 1.25, marginBottom: 5, fontFamily: "'Rajdhani',sans-serif" }}>
        {label}
      </div>
      <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 9, fontWeight: 800, padding: '1px 5px', borderRadius: 4, background: temAtivo ? cfg.cor : 'rgba(255,255,255,.08)', color: '#fff', fontFamily: "'Rajdhani',sans-serif" }}>×{quantidade}</span>
        <span style={{ fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 4, background: 'rgba(255,255,255,.06)', color: '#C87AFF', fontFamily: "'Rajdhani',sans-serif" }}>{fmt(fatu)}/d</span>
        <span style={{ fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 4, background: 'rgba(255,255,255,.06)', color: 'rgba(255,255,255,.45)', fontFamily: "'Rajdhani',sans-serif" }}>{fmt(custo)}</span>
      </div>
    </div>
  );
});

// ── Cores das 4 conexões ─────────────────────────────────
const CONN_CORES = {
  forneceAumFatu:  '#7aff9a',  // verde  — eu forneço +fat a outro
  forneceRedCusto: '#7ac8ff',  // azul   — eu forneço -custo a outro
  recebeAumFatu:   '#C87AFF',  // roxo   — eu recebo +fat de outro
  recebeRedCusto:  '#FFD700',  // ouro   — eu recebo -custo de outro
};

// HEX_W e HEX_H maiores para espaçar bastante as zonas
const ZONE_W = 520, ZONE_H_BASE = 420;
const ZONE_GAP_X = 420, ZONE_GAP_Y = 380;  // gap grande para a teia aparecer

function hexPosZone(col, row) {
  return {
    x: col * (ZONE_W + ZONE_GAP_X) + (row % 2 === 1 ? (ZONE_W + ZONE_GAP_X) / 2 : 0),
    y: row * (ZONE_H_BASE * 0.85 + ZONE_GAP_Y),
  };
}

// ── Transformer — 4 tipos de edge com toggle independente ─
function transformar(dados, filtroSetores, apenasAtivos, highlightEd, connAtivos) {
  const nodes = [], edges = [];
  const edgesSet = new Set();
  const vis = filtroSetores || SETORES;

  const COLS = 3;
  const NW = 156, NH = 72;
  const PX = 14, PY = 52;
  const GX = 6, GY = 6;

  vis.forEach(sk => {
    const setor = dados[sk];
    if (!setor?.edificios) return;

    const cfg = SETOR_CONFIG[sk];

    // 🔥 NOVO: posição radial
    const index = ORDEM_HEX.indexOf(sk);
    const pos = getHexPosition(index);

    const eds = apenasAtivos
      ? setor.edificios.filter(e => e.quantidade > 0)
      : setor.edificios;

    const rows = Math.max(1, Math.ceil(eds.length / COLS));

    // 🔥 AJUSTADO: tamanho menor pra caber melhor no círculo
    const W = PX * 2 + COLS * NW + (COLS - 1) * GX;
    const H = PY + rows * (NH + GY) + 20;

    nodes.push({
      id: `zona-${sk}`,
      type: 'group',
      data: { label: cfg.label },
      position: pos,
      style: {
        width: W,
        height: H,
        background: `${cfg.corBg}28`,
        border: `2px solid ${cfg.corBorda}`,
        borderRadius: 22,
        zIndex: -1,
      },
      selectable: false,
      draggable: false,
    });

    nodes.push({
      id: `lbl-${sk}`,
      type: 'hexNode',
      parentNode: `zona-${sk}`,
      extent: 'parent',
      data: { label: cfg.label.toUpperCase(), isLabel: true, setor: sk },
      position: { x: PX, y: 10 },
      style: { width: W - PX * 2 },
      selectable: false,
      draggable: false,
    });

    eds.forEach((ed, i) => {
      const c = i % COLS;
      const r = Math.floor(i / COLS);

      nodes.push({
        id: ed.nome,
        parentNode: `zona-${sk}`,
        extent: 'parent',
        type: 'hexNode',
        data: {
          label: ed.nome,
          quantidade: ed.quantidade,
          custo: ed.custoConstrucao,
          setor: sk,
          fatu: ed.finanças?.faturamentoUnitário,
          temAtivo: ed.quantidade > 0,
          isLabel: false,
        },
        position: {
          x: PX + c * (NW + GX),
          y: PY + r * (NH + GY),
        },
        style: { width: NW },
      });
    });
  });

  // 🔥 EDGES (mantive 100% seu sistema original)
  vis.forEach(sk => {
    dados[sk]?.edificios?.forEach(ed => {
      if (apenasAtivos && ed.quantidade === 0) return;

      ed.ForneceMelhoraEficiencia?.forEach(m => {
        const ts = encontrarSetor(dados, m.nome);
        if (!ts || !vis.includes(ts)) return;

        if (apenasAtivos) {
          const ref = dados[ts]?.edificios?.find(e => e.nome === m.nome);
          if (!ref || ref.quantidade === 0) return;
        }

        const af = (m.aumFatu?.nível1 || 0) > 0;
        const rc = (m.redCusto?.nível1 || 0) > 0;

        const isHL = highlightEd === ed.nome || highlightEd === m.nome;
        const ativo = ed.quantidade > 0;

        const sw = isHL ? 2.2 : ativo ? 1.4 : 0.6;
        const opHL = (highlightEd && !isHL) ? 0.04 : 1;

        // FORNECE +FAT
        if (af && connAtivos.forneceAumFatu) {
          const id = `faf-${ed.nome}-${m.nome}`;
          if (!edgesSet.has(id)) {
            edgesSet.add(id);
            const cor = CONN_CORES.forneceAumFatu;

            edges.push({
              id,
              source: ed.nome,
              target: m.nome,
              animated: ativo,
              style: { stroke: cor, strokeWidth: sw, opacity: opHL },
              markerEnd: { type: MarkerType.ArrowClosed, color: cor },
            });
          }
        }

        // FORNECE -CUSTO
        if (rc && connAtivos.forneceRedCusto) {
          const id = `frc-${ed.nome}-${m.nome}`;
          if (!edgesSet.has(id)) {
            edgesSet.add(id);
            const cor = CONN_CORES.forneceRedCusto;

            edges.push({
              id,
              source: ed.nome,
              target: m.nome,
              style: { stroke: cor, strokeWidth: sw * 0.8, opacity: opHL },
              markerEnd: { type: MarkerType.ArrowClosed, color: cor },
            });
          }
        }

        // RECEBE (invertido)
        if (af && connAtivos.recebeAumFatu) {
          const id = `raf-${m.nome}-${ed.nome}`;
          if (!edgesSet.has(id)) {
            edgesSet.add(id);
            const cor = CONN_CORES.recebeAumFatu;

            edges.push({
              id,
              source: m.nome,
              target: ed.nome,
              animated: ativo,
              style: { stroke: cor, strokeWidth: sw, opacity: opHL },
              markerEnd: { type: MarkerType.ArrowClosed, color: cor },
            });
          }
        }

        if (rc && connAtivos.recebeRedCusto) {
          const id = `rrc-${m.nome}-${ed.nome}`;
          if (!edgesSet.has(id)) {
            edgesSet.add(id);
            const cor = CONN_CORES.recebeRedCusto;

            edges.push({
              id,
              source: m.nome,
              target: ed.nome,
              style: { stroke: cor, strokeWidth: sw, opacity: opHL },
              markerEnd: { type: MarkerType.ArrowClosed, color: cor },
            });
          }
        }
      });
    });
  });

  return { nodes, edges };
}

// ── Painel recomendações — 4 eixos visuais ───────────────
const EixoBônus = ({ valor, label, cor, bgCor, max, icone }) => {
  if (valor <= 0) return null;
  return (
    <div style={{ background: bgCor, border: `1px solid ${cor}33`, borderRadius: 7, padding: '5px 7px', flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
        <span style={{ fontSize: 7, fontWeight: 700, color: cor, letterSpacing: '.06em', textTransform: 'uppercase' }}>{icone} {label}</span>
        <span style={{ fontSize: 10, fontWeight: 800, color: cor, fontFamily: "'Rajdhani',sans-serif" }}>+{valor.toFixed(0)}%</span>
      </div>
      <div style={{ height: 3, background: 'rgba(0,0,0,.3)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${Math.min((valor / Math.max(max, 1)) * 100, 100)}%`, background: cor, borderRadius: 2, transition: 'width .4s' }} />
      </div>
    </div>
  );
};

const FonteDetalhe = ({ itens, tipo }) => {
  if (!itens || itens.length === 0) return null;
  const cor   = tipo === 'fatu' ? '#C87AFF' : '#7ac8ff';
  const label = tipo === 'fatu' ? '+fat' : '-custo';
  // agrupa por edificio origem
  const top = itens.slice(0, 2);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {top.map((d, i) => {
        const nomeCurto = (d.de || d.para || '').split(' ').slice(0, 3).join(' ');
        const prefixo  = d.de ? '← ' : '→ ';
        return (
          <span key={i} style={{ fontSize: 7, fontWeight: 700, padding: '1px 5px', borderRadius: 3, background: `${cor}18`, color: cor, border: `1px solid ${cor}30`, fontFamily: "'Rajdhani',sans-serif", whiteSpace: 'nowrap' }}>
            {prefixo}{nomeCurto} ×{d.qtdEd} {label} {d.valor}%
          </span>
        );
      })}
      {itens.length > 2 && (
        <span style={{ fontSize: 7, color: 'rgba(255,255,255,.2)', padding: '1px 4px' }}>+{itens.length - 2} mais</span>
      )}
    </div>
  );
};

const PainelRec = ({ recs, onHover, onFechar }) => {
  const [abaFiltro, setAbaFiltro] = useState('todos'); // 'todos' | 'recebe' | 'fornece'
  const max = recs[0]?.score || 1;
  const maxEixo = Math.max(...recs.map(r => Math.max(r.recebeAumFatu, r.recebeRedCusto, r.forneceAumFatu, r.forneceRedCusto, 1)));

  const recsFiltrados = recs.filter(r => {
    if (abaFiltro === 'recebe')  return r.temBeneficioDireto;
    if (abaFiltro === 'fornece') return r.forneceAumFatu > 0 || r.forneceRedCusto > 0;
    return true;
  });

  return (
    <div className='scrollbar-custom' style={{ position: 'absolute', top: 12, right: 12, zIndex: 20, width: 288, background: 'linear-gradient(160deg,#0d0820,#1a0d40)', border: '1.5px solid rgba(100,17,217,.4)', borderRadius: 14, padding: '14px 16px', boxShadow: '0 8px 32px rgba(0,0,0,.8)', maxHeight: '82vh', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: 'rgba(255,255,255,.3)', marginBottom: 2 }}>IA de sinergia</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', fontFamily: "'Rajdhani',sans-serif" }}>Melhores compras agora</div>
        </div>
        <button onClick={onFechar} style={{ background: 'rgba(255,255,255,.08)', border: 'none', borderRadius: 6, color: '#fff', cursor: 'pointer', padding: '4px 8px', fontSize: 12 }}>✕</button>
      </div>

      {/* Legenda dos 4 eixos */}
      {/* <div style={{ background: 'rgba(0,0,0,.3)', borderRadius: 8, padding: '8px 10px', marginBottom: 10 }}>
        <div style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em', color: 'rgba(255,255,255,.25)', marginBottom: 6 }}>O que cada bônus significa</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[
            { cor: '#C87AFF', icone: '↓', label: 'Recebe +faturamento', desc: 'Edifícios ativos aumentam minha receita', peso: '★★★★' },
            { cor: '#7ac8ff', icone: '↓', label: 'Recebe -custo',       desc: 'Edifícios ativos reduzem meu custo fixo', peso: '★★★' },
            { cor: '#7aff9a', icone: '↑', label: 'Fornece +faturamento', desc: 'Eu aumento a receita de quem já existe',  peso: '★★' },
            { cor: '#FFD700', icone: '↑', label: 'Fornece -custo',       desc: 'Eu reduzo o custo de quem já existe',     peso: '★' },
          ].map(({ cor, icone, label, desc, peso }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 20, height: 20, borderRadius: 5, background: `${cor}22`, border: `1px solid ${cor}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 10, color: cor }}>{icone}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 8, fontWeight: 700, color: cor }}>{label} <span style={{ opacity: .5 }}>{peso}</span></div>
                <div style={{ fontSize: 7, color: 'rgba(255,255,255,.3)', lineHeight: 1.2 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* Filtro rápido */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
        {[
          { key: 'todos',   label: 'Todos' },
          { key: 'recebe',  label: '↓ Recebo bônus' },
          { key: 'fornece', label: '↑ Dou bônus' },
        ].map(f => (
          <button key={f.key} onClick={() => setAbaFiltro(f.key)} style={{ flex: 1, border: 'none', borderRadius: 6, padding: '4px 0', cursor: 'pointer', fontFamily: "'Rajdhani',sans-serif", fontSize: 9, fontWeight: 700, background: abaFiltro === f.key ? 'rgba(255,255,255,.18)' : 'rgba(255,255,255,.05)', color: abaFiltro === f.key ? '#fff' : 'rgba(255,255,255,.35)', transition: 'all .15s' }}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Lista */}
      {recsFiltrados.length === 0 ? (
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.28)', textAlign: 'center', padding: '20px 0' }}>
          Construa edifícios primeiro para ver recomendações.
        </div>
      ) : recsFiltrados.map((rec, i) => {
        const cfg = SETOR_CONFIG[rec.setor];
        const { ed, score, recebeAumFatu, recebeRedCusto, forneceAumFatu, forneceRedCusto, detalhes, podeComprar, temBeneficioDireto } = rec;

        // Badge de urgência: tem bônus direto alto → prioridade máxima
        const urgente = recebeAumFatu >= 10 || recebeRedCusto >= 15;

        return (
          <div key={ed.nome}
            onMouseEnter={() => onHover(ed.nome)}
            onMouseLeave={() => onHover(null)}
            style={{
              background: urgente ? `${cfg.cor}1a` : podeComprar ? `${cfg.cor}0e` : 'rgba(255,255,255,.03)',
              border: `1px solid ${urgente ? cfg.cor + '55' : podeComprar ? cfg.cor + '28' : 'rgba(255,255,255,.07)'}`,
              borderRadius: 10, padding: '10px 11px', marginBottom: 8,
              cursor: 'default', transition: 'all .15s',
              outline: urgente ? `1px solid ${cfg.cor}44` : 'none',
            }}>

            {/* Linha 1: rank + nome + badges */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 7 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 3, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 8, fontWeight: 700, color: cfg.cor, textTransform: 'uppercase', letterSpacing: '.07em' }}>#{i+1} {cfg.label}</span>
                  {urgente && (
                    <span style={{ fontSize: 7, fontWeight: 800, background: `${cfg.cor}33`, color: cfg.cor, border: `1px solid ${cfg.cor}55`, borderRadius: 3, padding: '0 5px' }}>
                      🔥 ALTA SINERGIA
                    </span>
                  )}
                  {podeComprar && (
                    <span style={{ fontSize: 7, fontWeight: 700, background: '#7aff9a18', color: '#7aff9a', border: '1px solid #7aff9a33', borderRadius: 3, padding: '0 5px' }}>
                      ✓ pode comprar
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#fff', fontFamily: "'Rajdhani',sans-serif", lineHeight: 1.2 }}>{ed.nome}</div>
              </div>
              {/* Score + custo */}
              <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 8 }}>
                <div style={{ fontSize: 7, color: 'rgba(255,255,255,.28)' }}>sinergia</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: cfg.cor, fontFamily: "'Rajdhani',sans-serif", lineHeight: 1 }}>{score.toFixed(0)}</div>
              </div>
            </div>

            {/* Barra de score total */}
            <div style={{ height: 3, background: 'rgba(255,255,255,.07)', borderRadius: 2, overflow: 'hidden', marginBottom: 8 }}>
              <div style={{ height: '100%', width: `${(score/max)*100}%`, background: `linear-gradient(90deg,${cfg.cor},${cfg.cor}88)`, borderRadius: 2 }} />
            </div>

            {/* 4 eixos de bônus */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 7 }}>
              <EixoBônus valor={recebeAumFatu}   label="recebo +fat"   cor="#C87AFF" bgCor="rgba(200,122,255,.1)"  max={maxEixo} icone="↓" />
              <EixoBônus valor={recebeRedCusto}  label="recebo -custo" cor="#7ac8ff" bgCor="rgba(122,200,255,.1)"  max={maxEixo} icone="↓" />
              <EixoBônus valor={forneceAumFatu}  label="dou +fat"      cor="#7aff9a" bgCor="rgba(122,255,154,.08)" max={maxEixo} icone="↑" />
              <EixoBônus valor={forneceRedCusto} label="dou -custo"    cor="#FFD700" bgCor="rgba(255,215,0,.08)"   max={maxEixo} icone="↑" />
            </div>

            {/* Detalhe das fontes (só se tem bônus direto) */}
            {temBeneficioDireto && (
              <div style={{ marginBottom: 6 }}>
                {recebeAumFatu > 0 && (
                  <div style={{ marginBottom: 3 }}>
                    <FonteDetalhe itens={detalhes.recebeAumFatu}  tipo="fatu"  />
                  </div>
                )}
                {recebeRedCusto > 0 && (
                  <FonteDetalhe itens={detalhes.recebeRedCusto} tipo="custo" />
                )}
              </div>
            )}

            {/* Custo */}
            <div style={{ fontSize: 9, color: podeComprar ? 'rgba(255,255,255,.35)' : '#ff9090', fontFamily: "'Rajdhani',sans-serif" }}>
              💰 {fmt(ed.custoConstrucao)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ── Painel detalhe do nó ──────────────────────────────────
const PainelDetalhe = ({ node, dados, onFechar }) => {
  if (!node || node.data?.isLabel) return null;
  const { setor, label, quantidade, custo, fatu } = node.data;
  const cfg = SETOR_CONFIG[setor];
  const ed = dados[setor]?.edificios?.find(e => e.nome === label);
  if (!ed) return null;
  const fornece = ed.ForneceMelhoraEficiencia?.filter(m => (m.redCusto?.nível1||0)+(m.aumFatu?.nível1||0) > 0) || [];
  const recebe  = ed.RecebeMelhoraEficiencia?.filter(m  => (m.redCusto?.nível1||0)+(m.aumFatu?.nível1||0) > 0) || [];

  return (
    <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 20, width: 340, background: 'linear-gradient(160deg,#0d0820,#1a0d40)', border: `1.5px solid ${cfg.cor}44`, borderRadius: 14, padding: '12px 14px', boxShadow: '0 8px 32px rgba(0,0,0,.85)', maxHeight: '36vh', overflowY: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', color: cfg.cor, marginBottom: 1 }}>{cfg.label}</div>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', fontFamily: "'Rajdhani',sans-serif" }}>{label}</div>
        </div>
        <button onClick={onFechar} style={{ background: 'rgba(255,255,255,.08)', border: 'none', borderRadius: 6, color: '#fff', cursor: 'pointer', padding: '3px 7px', fontSize: 11 }}>✕</button>
      </div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
        {[{ l:'Qtd', v:`×${quantidade}`, c: quantidade>0?cfg.cor:'rgba(255,255,255,.25)' },{ l:'Custo', v:fmt(custo), c:'#fff' },{ l:'Fat/dia', v:fmt(fatu), c:'#C87AFF' }].map(({ l,v,c }) => (
          <div key={l} style={{ flex:1, background:'rgba(255,255,255,.05)', borderRadius:7, padding:'5px 6px', textAlign:'center' }}>
            <div style={{ fontSize:7, color:'rgba(255,255,255,.3)', textTransform:'uppercase', letterSpacing:'.1em' }}>{l}</div>
            <div style={{ fontSize:13, fontWeight:800, color:c, fontFamily:"'Rajdhani',sans-serif" }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        {fornece.length > 0 && (
          <div style={{ flex: 1 }}>
            <div style={{ fontSize:7, fontWeight:700, textTransform:'uppercase', letterSpacing:'.12em', color:'rgba(255,255,255,.28)', marginBottom:4 }}>Fornece bônus para</div>
            {fornece.slice(0,5).map(m => (
              <div key={m.nome} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', background:'rgba(122,255,154,.05)', border:'1px solid rgba(122,255,154,.1)', borderRadius:5, padding:'2px 6px', marginBottom:3 }}>
                <span style={{ fontSize:8, color:'rgba(255,255,255,.6)', fontFamily:"'Rajdhani',sans-serif" }}>{m.nome}</span>
                <span style={{ fontSize:8, fontWeight:700, color:'#7aff9a', fontFamily:"'Rajdhani',sans-serif" }}>{m.redCusto?.nível1>0?`-${m.redCusto.nível1}%c`:''} {m.aumFatu?.nível1>0?`+${m.aumFatu.nível1}%f`:''}</span>
              </div>
            ))}
          </div>
        )}
        {recebe.length > 0 && (
          <div style={{ flex: 1 }}>
            <div style={{ fontSize:7, fontWeight:700, textTransform:'uppercase', letterSpacing:'.12em', color:'rgba(255,255,255,.28)', marginBottom:4 }}>Recebe bônus de</div>
            {recebe.slice(0,5).map(m => (
              <div key={m.nome} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', background:'rgba(200,122,255,.05)', border:'1px solid rgba(200,122,255,.1)', borderRadius:5, padding:'2px 6px', marginBottom:3 }}>
                <span style={{ fontSize:8, color:'rgba(255,255,255,.6)', fontFamily:"'Rajdhani',sans-serif" }}>{m.nome}</span>
                <span style={{ fontSize:8, fontWeight:700, color:'#C87AFF', fontFamily:"'Rajdhani',sans-serif" }}>{m.redCusto?.nível1>0?`-${m.redCusto.nível1}%c`:''} {m.aumFatu?.nível1>0?`+${m.aumFatu.nível1}%f`:''}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Componente principal ──────────────────────────────────
const nodeTypes = { hexNode: HexNode };

// Definição das 4 conexões para toggles
const CONN_DEFS = [
  { key: 'forneceAumFatu',  cor: CONN_CORES.forneceAumFatu,  icone: '↑', label: 'Fornece +fat',  desc: 'Eu aumento faturamento de outro' },
  { key: 'forneceRedCusto', cor: CONN_CORES.forneceRedCusto, icone: '↑', label: 'Fornece -custo', desc: 'Eu reduzo custo de outro' },
  { key: 'recebeAumFatu',   cor: CONN_CORES.recebeAumFatu,   icone: '↓', label: 'Recebo +fat',    desc: 'Outro aumenta meu faturamento ★★★★' },
  { key: 'recebeRedCusto',  cor: CONN_CORES.recebeRedCusto,  icone: '↓', label: 'Recebo -custo',  desc: 'Outro reduz meu custo ★★★' },
];

function TechTreeInner() {
  const { dados } = useContext(CentraldeDadosContext);
  const { economiaSetores } = useContext(DadosEconomyGlobalContext);

  const [filtroSetores, setFiltroSetores] = useState(null);
  const [apenasAtivos, setApenasAtivos] = useState(false);
  const [nodeSelecionado, setNodeSelecionado] = useState(null);
  const [mostrarRec, setMostrarRec] = useState(true);
  const [highlightEd, setHighlightEd] = useState(null);
  // Toggle individual de cada tipo de conexão — todos ativos por padrão
  const [connAtivos, setConnAtivos] = useState({
    forneceAumFatu: true, forneceRedCusto: true,
    recebeAumFatu:  true, recebeRedCusto:  true,
  });

  const saldo = economiaSetores?.saldo || 0;
  const recs = useMemo(() => getRecomendacoes(dados, saldo), [dados, saldo]);
  const { nodes, edges } = useMemo(
    () => transformar(dados, filtroSetores, apenasAtivos, highlightEd, connAtivos),
    [dados, filtroSetores, apenasAtivos, highlightEd, connAtivos]
  );

  const onNodeClick = useCallback((_, n) => { if (n.type === 'hexNode' && !n.data?.isLabel) setNodeSelecionado(n); }, []);
  const onPaneClick = useCallback(() => { setNodeSelecionado(null); setHighlightEd(null); }, []);

  const toggleSetor = (s) => setFiltroSetores(prev => {
    if (!prev) return SETORES.filter(x => x !== s);
    const novo = prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s];
    return novo.length === 0 || novo.length === SETORES.length ? null : novo;
  });

  const toggleConn = (key) => setConnAtivos(prev => ({ ...prev, [key]: !prev[key] }));

  const btn = (ativo, bg, label, onClick, key) => (
    <button key={key} onClick={onClick} style={{ border:'none', borderRadius:7, padding:'4px 11px', cursor:'pointer', fontFamily:"'Rajdhani',sans-serif", fontSize:10, fontWeight:700, letterSpacing:'.06em', transition:'all .15s', background: ativo ? bg : 'rgba(255,255,255,.06)', color: ativo ? '#fff' : 'rgba(255,255,255,.3)' }}>
      {label}
    </button>
  );

  return (
    <div style={{ width:'100%', height:'100%', position:'relative', background:'#07041a', borderRadius:12, overflow:'hidden' }}>

      {/* Toolbar topo-esquerdo */}
      <div style={{ position:'absolute', top:12, left:12, zIndex:10, display:'flex', flexDirection:'column', gap:7, maxWidth:320 }}>

        {/* Filtro setores */}
        <div style={{ background:'rgba(0,0,0,.82)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,.08)', borderRadius:10, padding:'8px 10px' }}>
          <div style={{ fontSize:8, fontWeight:700, textTransform:'uppercase', letterSpacing:'.14em', color:'rgba(255,255,255,.28)', marginBottom:6 }}>Setores</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
            {SETORES.map(s => { const cfg = SETOR_CONFIG[s]; const a = !filtroSetores||filtroSetores.includes(s); return btn(a, cfg.cor, cfg.label, () => toggleSetor(s), s); })}
          </div>
        </div>

        {/* Toggle só ativos + Recomendações */}
        <div style={{ background:'rgba(0,0,0,.82)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,.08)', borderRadius:10, padding:'8px 10px', display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' }}>
          <label style={{ display:'flex', alignItems:'center', gap:6, cursor:'pointer', userSelect:'none' }} onClick={() => setApenasAtivos(v=>!v)}>
            <div style={{ width:26, height:14, borderRadius:7, position:'relative', background:apenasAtivos?'#6411D9':'rgba(255,255,255,.15)', transition:'background .2s', flexShrink:0 }}>
              <div style={{ position:'absolute', top:1, left:apenasAtivos?13:1, width:12, height:12, borderRadius:'50%', background:'#fff', transition:'left .2s' }} />
            </div>
            <span style={{ fontSize:10, color:'rgba(255,255,255,.5)', fontFamily:"'Rajdhani',sans-serif", fontWeight:700 }}>Só ativos</span>
          </label>
          <div style={{ width:1, height:16, background:'rgba(255,255,255,.1)' }} />
          <button onClick={() => setMostrarRec(v=>!v)} style={{ border:'none', borderRadius:7, padding:'4px 11px', cursor:'pointer', fontFamily:"'Rajdhani',sans-serif", fontSize:10, fontWeight:700, background: mostrarRec?'linear-gradient(135deg,#4C14A9,#6411D9)':'rgba(255,255,255,.06)', color: mostrarRec?'#fff':'rgba(255,255,255,.4)', boxShadow: mostrarRec?'0 2px 12px #6411D944':'none', transition:'all .15s' }}>
            🧠 Recomendações {recs.length > 0 && `(${recs.length})`}
          </button>
        </div>

        {/* Toggles de tipos de conexão */}
        <div style={{ background:'rgba(0,0,0,.82)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,.08)', borderRadius:10, padding:'8px 10px' }}>
          <div style={{ fontSize:8, fontWeight:700, textTransform:'uppercase', letterSpacing:'.14em', color:'rgba(255,255,255,.28)', marginBottom:7 }}>Conexões visíveis</div>
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            {CONN_DEFS.map(({ key, cor, icone, label }) => {
              const ativo = connAtivos[key];
              return (
                <button key={key} onClick={() => toggleConn(key)} style={{
                  display:'flex', alignItems:'center', gap:8, background: ativo ? `${cor}18` : 'rgba(255,255,255,.04)',
                  border: `1px solid ${ativo ? cor + '55' : 'rgba(255,255,255,.08)'}`,
                  borderRadius:8, padding:'6px 10px', cursor:'pointer', transition:'all .15s', textAlign:'left',
                }}>
                  {/* Linha colorida */}
                  <div style={{ width:22, height:3, borderRadius:2, background: ativo ? cor : 'rgba(255,255,255,.15)', flexShrink:0, transition:'background .15s' }} />
                  <span style={{ fontSize:11, fontWeight:700, color: ativo ? cor : 'rgba(255,255,255,.25)', fontFamily:"'Rajdhani',sans-serif", flex:1, transition:'color .15s' }}>
                    {icone} {label}
                  </span>
                  {/* Bolinha de status */}
                  <div style={{ width:8, height:8, borderRadius:'50%', background: ativo ? cor : 'rgba(255,255,255,.12)', flexShrink:0, boxShadow: ativo ? `0 0 6px ${cor}` : 'none', transition:'all .15s' }} />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* React Flow */}
      <ReactFlow
        nodes={nodes} edges={edges} nodeTypes={nodeTypes}
        onNodeClick={onNodeClick} onPaneClick={onPaneClick}
        fitView fitViewOptions={{ padding:0.08 }}
        nodesConnectable={false} elementsSelectable={true}
        minZoom={0.04} maxZoom={2}
        style={{ background:'transparent' }}
      >
        <Background variant="dots" gap={28} size={1} color="rgba(255,255,255,.05)" />
        <Controls style={{ background:'rgba(0,0,0,.7)', border:'1px solid rgba(255,255,255,.1)', borderRadius:8 }} />
        <MiniMap nodeStrokeWidth={2} zoomable pannable
          style={{ background:'rgba(0,0,0,.7)', border:'1px solid rgba(255,255,255,.1)', borderRadius:8 }}
          nodeColor={n => { if (n.type!=='hexNode'||n.data?.isLabel) return 'rgba(255,255,255,.03)'; const c = SETOR_CONFIG[n.data?.setor]; return n.data?.temAtivo?(c?.cor||'#6411D9'):'rgba(255,255,255,.07)'; }}
        />
      </ReactFlow>

      {/* Legenda fixada na base */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, zIndex:10,
        background:'linear-gradient(0deg,rgba(7,4,26,.97) 80%,rgba(7,4,26,0) 100%)',
        padding:'14px 20px 12px',
        display:'flex', alignItems:'flex-end', justifyContent:'center', gap:0,
        pointerEvents:'none',
      }}>
        <div style={{
          display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center',
          background:'rgba(0,0,0,.6)', backdropFilter:'blur(10px)',
          border:'1px solid rgba(255,255,255,.1)', borderRadius:12,
          padding:'10px 18px',
        }}>
          {CONN_DEFS.map(({ key, cor, icone, label, desc }) => {
            const ativo = connAtivos[key];
            return (
              <div key={key} style={{ display:'flex', alignItems:'center', gap:8, opacity: ativo ? 1 : 0.3, transition:'opacity .2s' }}>
                <div style={{ width:26, height:3, borderRadius:2, background: ativo ? cor : 'rgba(255,255,255,.2)', boxShadow: ativo ? `0 0 8px ${cor}88` : 'none', flexShrink:0 }} />
                <div>
                  <div style={{ fontSize:12, fontWeight:800, color: ativo ? cor : 'rgba(255,255,255,.3)', fontFamily:"'Rajdhani',sans-serif", lineHeight:1.1 }}>
                    {icone} {label}
                  </div>
                  <div style={{ fontSize:9, color:'rgba(255,255,255,.4)', lineHeight:1.2 }}>{desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {mostrarRec && <PainelRec recs={recs} onHover={setHighlightEd} onFechar={() => setMostrarRec(false)} />}
      {nodeSelecionado && <PainelDetalhe node={nodeSelecionado} dados={dados} onFechar={() => setNodeSelecionado(null)} />}
    </div>
  );
}

export default function TechTree() {
  return <ReactFlowProvider><TechTreeInner /></ReactFlowProvider>;
}