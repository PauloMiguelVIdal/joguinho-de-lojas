import { MarkerType } from 'reactflow';

// ── Cores por setor ──────────────────────────────────────
export const SETOR_CONFIG = {
  agricultura: { cor: '#0C9123', corBg: '#00381622', corBorda: '#4CAF5066', label: 'Agricultura' },
  tecnologia:  { cor: '#FF6F00', corBg: '#A64B0022', corBorda: '#FF8C4266', label: 'Tecnologia'  },
  industria:   { cor: '#808080', corBg: '#1A1A1A22', corBorda: '#B3B3B366', label: 'Indústria'   },
  comercio:    { cor: '#E60000', corBg: '#66000022', corBorda: '#FF4D4D66', label: 'Comércio'     },
  imobiliario: { cor: '#3333CC', corBg: '#00006622', corBorda: '#6666FF66', label: 'Imobiliário'  },
  energia:     { cor: '#E6B800', corBg: '#66520022', corBorda: '#FFD96666', label: 'Energia'      },
};

const SETORES = Object.keys(SETOR_CONFIG);

// Descobre em qual setor um edifício está
function encontrarSetor(dados, nomeEdificio) {
  for (const s of SETORES) {
    if (dados[s]?.edificios?.some(e => e.nome === nomeEdificio)) return s;
  }
  return null;
}

// Layout: colunas por setor, edifícios empilhados verticalmente
const COL_WIDTH   = 260;
const COL_GAP     = 80;
const NODE_HEIGHT = 90;
const NODE_GAP    = 14;
const HEADER_H    = 60;

export function transformarDadosParaFluxo(dados, filtroSetores = null) {
  const nodes = [];
  const edges = [];
  const edgesSet = new Set(); // evita duplicatas

  const setoresVisiveis = filtroSetores
    ? SETORES.filter(s => filtroSetores.includes(s))
    : SETORES;

  // ── 1. Nós de zona (grupo) + nós de edifício ──────────
  setoresVisiveis.forEach((setorChave, colIdx) => {
    const setor = dados[setorChave];
    if (!setor?.edificios) return;

    const cfg = SETOR_CONFIG[setorChave];
    const xZona = colIdx * (COL_WIDTH + COL_GAP);
    const alturaZona = HEADER_H + setor.edificios.length * (NODE_HEIGHT + NODE_GAP) + 20;

    // Nó de grupo (zona)
    nodes.push({
      id: `zona-${setorChave}`,
      type: 'group',
      data: { label: cfg.label },
      position: { x: xZona, y: 0 },
      style: {
        width: COL_WIDTH,
        height: alturaZona,
        background: cfg.corBg,
        border: `2px solid ${cfg.corBorda}`,
        borderRadius: 16,
        zIndex: -1,
      },
      selectable: false,
      draggable: false,
    });

    // Label do setor dentro do grupo
    nodes.push({
      id: `label-${setorChave}`,
      type: 'default',
      parentNode: `zona-${setorChave}`,
      extent: 'parent',
      data: { label: cfg.label.toUpperCase() },
      position: { x: 10, y: 10 },
      style: {
        width: COL_WIDTH - 20,
        height: 36,
        background: cfg.cor,
        border: 'none',
        borderRadius: 8,
        color: '#fff',
        fontWeight: 800,
        fontSize: 11,
        letterSpacing: '.1em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      },
      selectable: false,
      draggable: false,
    });

    // Nós de edifício
    setor.edificios.forEach((ed, edIdx) => {
      const temAtivo = ed.quantidade > 0;
      const yPos = HEADER_H + edIdx * (NODE_HEIGHT + NODE_GAP);

      nodes.push({
        id: ed.nome,
        parentNode: `zona-${setorChave}`,
        extent: 'parent',
        data: {
          label: ed.nome,
          quantidade: ed.quantidade,
          custo: ed.custoConstrucao,
          setor: setorChave,
          fatu: ed.finanças?.faturamentoUnitário,
          roi: ed.finanças?.rent,
          temAtivo,
        },
        position: { x: 10, y: yPos },
        type: 'edificioNode',
        style: {
          width: COL_WIDTH - 20,
          opacity: temAtivo ? 1 : 0.5,
        },
      });
    });
  });

  // ── 2. Edges de ForneceMelhoraEficiencia ─────────────
  SETORES.forEach(setorChave => {
    const setor = dados[setorChave];
    if (!setor?.edificios) return;

    setor.edificios.forEach(ed => {
      ed.ForneceMelhoraEficiencia?.forEach(melhoria => {
        const targetSetor = encontrarSetor(dados, melhoria.nome);
        if (!targetSetor) return;

        // Só mostra edge se filtro inclui ambos os setores
        if (filtroSetores && (!filtroSetores.includes(setorChave) || !filtroSetores.includes(targetSetor))) return;

        const edgeId = `fornece-${ed.nome}→${melhoria.nome}`;
        if (edgesSet.has(edgeId)) return;
        edgesSet.add(edgeId);

        const temRedCusto = melhoria.redCusto?.nível1 > 0;
        const temAumFatu  = melhoria.aumFatu?.nível1  > 0;
        const cor = temAumFatu ? '#7aff9a' : '#7ac8ff';
        const labelParts = [];
        if (temRedCusto) labelParts.push(`-${melhoria.redCusto.nível1}% custo`);
        if (temAumFatu)  labelParts.push(`+${melhoria.aumFatu.nível1}% fat`);

        edges.push({
          id: edgeId,
          source: ed.nome,
          target: melhoria.nome,
          animated: ed.quantidade > 0,
          label: labelParts.join(' · '),
          labelStyle: { fill: cor, fontWeight: 700, fontSize: 9 },
          labelBgStyle: { fill: 'rgba(0,0,0,.6)', borderRadius: 4 },
          style: { stroke: cor, strokeWidth: ed.quantidade > 0 ? 2 : 1, strokeDasharray: ed.quantidade > 0 ? '0' : '4 3' },
          markerEnd: { type: MarkerType.ArrowClosed, color: cor },
          data: { tipo: 'fornece' },
        });
      });

      // ── 3. Edges de RecebeMelhoraEficiencia ───────────
      ed.RecebeMelhoraEficiencia?.forEach(melhoria => {
        const sourceSetor = encontrarSetor(dados, melhoria.nome);
        if (!sourceSetor) return;
        if (filtroSetores && (!filtroSetores.includes(setorChave) || !filtroSetores.includes(sourceSetor))) return;

        const edgeId = `recebe-${melhoria.nome}→${ed.nome}`;
        if (edgesSet.has(edgeId)) return;
        edgesSet.add(edgeId);

        const temRedCusto = melhoria.redCusto?.nível1 > 0;
        const temAumFatu  = melhoria.aumFatu?.nível1  > 0;
        const cor = temAumFatu ? '#C87AFF' : '#FFD700';
        const labelParts = [];
        if (temRedCusto) labelParts.push(`-${melhoria.redCusto.nível1}% custo`);
        if (temAumFatu)  labelParts.push(`+${melhoria.aumFatu.nível1}% fat`);

        edges.push({
          id: edgeId,
          source: melhoria.nome,
          target: ed.nome,
          animated: false,
          label: labelParts.join(' · '),
          labelStyle: { fill: cor, fontWeight: 700, fontSize: 9 },
          labelBgStyle: { fill: 'rgba(0,0,0,.6)', borderRadius: 4 },
          style: { stroke: cor, strokeWidth: 1, strokeDasharray: '4 3' },
          markerEnd: { type: MarkerType.ArrowClosed, color: cor },
          data: { tipo: 'recebe' },
        });
      });
    });
  });

  return { nodes, edges };
}