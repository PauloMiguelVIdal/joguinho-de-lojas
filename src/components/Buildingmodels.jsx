// ============================================================
//  buildingModels.js
// ============================================================

export const PACOTES = {
  'kenney-city': {
    label: 'Kenney City Kit',
    basePath: '/models/kenney-city/',
    colormap: '/models/kenney-city/colormap.png',
  },
  'kenney-farm': {
    label: 'Kenney Farm Kit',
    basePath: '/models/kenney-farm/',
    colormap: '/models/kenney-farm/colormap.png',
  },
  'kenney_nature-kit': {
    label: 'kenney nature kit',
    basePath: '/models/kenney_nature-kit/GLTF format/',
    colormap: null,
  },
  'kenney survival kit': {
    label: 'kenney survival kit',
    basePath: '/models/kenney_survival-kit/GLB format/',
    colormap: '/models/kenney_survival-kit/GLB format/Textures/colormap.png',
  },
  'kenney_hexagon-kit': {
    label: 'Kenney hexagon kit',
    basePath: '/models/kenney_hexagon-kit/GLB format/',
    colormap: '/models/kenney_hexagon-kit/GLB format/Textures/colormap.png',
  },
  'kenney_city-kit-commercial_2.1': {
    label: 'kenney_city-kit-commercial_2.1',
    basePath: '/models/kenney_city-kit-commercial_2.1/GLB format/',
    colormap: '/models/kenney_city-kit-commercial_2.1/GLB format/Textures/colormap.png'
  },
  'kenney_city-kit-industrial_1.0': {
    label: 'kenney_city-kit-industrial_1.0',
    basePath: '/models/kenney_city-kit-industrial_1.0/GLB format/',
    colormap: '/models/kenney_city-kit-industrial_1.0/GLB format/Textures/colormap.png'
  },
  'kenney_space-kit': {
    label: 'Kenney Space Kit',
    basePath: '/models/kenney_space-kit/GLTF format/',
    colormap: null,
  },
  'kenney_cube-pets_1.0': {
    label: 'kenney cube pets',
    basePath: '/models/kenney_cube-pets_1.0/GLB format/',
    colormap: '/models/kenney_cube-pets_1.0/GLB format/Textures/colormap.png'
  },
  'kenney_watercraft-pack': {
    label: 'kenney watercraft pack',
    basePath: '/models/kenney_watercraft-pack/GLB format/',
    colormap: '/models/kenney_watercraft-pack/GLB format/Textures/colormap.png'
  },
  'kenney_car-kit': {
    label: 'kenney car kit',
    basePath: '/models/kenney_car-kit/GLB format/',
    colormap: '/models/kenney_car-kit/GLB format/Textures/colormap.png'
  },
  'kenney_pirate-kit': {
    label: 'kenney pirate kit',
    basePath: '/models/kenney_pirate-kit/GLB format/',
    colormap: '/models/kenney_pirate-kit/GLB format/Textures/colormap.png'
  },
  'kenney_fantasy-town-kit_2.0': {
    label: 'kenney fantasy town kit 2.0',
    basePath: '/models/kenney_fantasy-town-kit_2.0/GLB format/',
    colormap: '/models/kenney_fantasy-town-kit_2.0/GLB format/Textures/colormap.png'
  },
  'kenney_city-kit-suburban_20': {
    label: 'kenney city kit suburban 20',
    basePath: '/models/kenney_city-kit-suburban_20/GLB format/',
    colormap: '/models/kenney_city-kit-suburban_20/GLB format/Textures/colormap.png'
  },
  'kenney_furniture-kit': {
    label: 'kenney_furniture-kit',
    basePath: '/models/kenney_furniture-kit/GLTF format/',
    colormap: null
  },
  'kenney_racing-kit': {
    label: 'kenney racing kit',
    basePath: '/models/kenney_racing-kit/GLTF format/',
    colormap: null
  },
  'custom': {
    label: 'Custom',
    basePath: '/models/custom/',
    colormap: null,
  },
}

export const MODELOS = {
  // ── ID 1 — Genérico / fallback ─────────────────────────────
  // IMPORTANTE: aponta para hexagon-kit que sabemos que existe
  1: {
    label: 'Edifício Genérico',
    pacote: 'kenney_hexagon-kit',
    arquivo: 'building-house.glb',
    escala: [1, 1, 1],
    posY: -0.15,
    rotacao: 0,
    corTint: null,
  },

  2: {
    label: 'terrenoVerde',
    pacote: 'kenney_hexagon-kit',
    arquivo: 'grass.glb',
    escala: [1, 1, 1],
    posY: -0.15,
    rotacao: 0,
    corTint: [0.6, 0.9, 0.4],
  },
  3: {
    label: 'cerca',
    pacote: 'kenney_nature-kit',
    arquivo: 'fence_simpleCenter.glb',
    escala: [1, 1, 1],
    posY: -0.15,
    rotacao: 0,
    corTint: null,
  },
  4: {
    label: 'cerca2',
    pacote: 'kenney_nature-kit',
    arquivo: 'fence_simpleCenter.glb',
    escala: [1, 1, 1],
    posY: -0.15,
    rotacao: 0,
    corTint: null,
  },
  5: {
    label: 'armazemBase',
    pacote: 'kenney_city-kit-industrial_1.0',
    arquivo: 'building-j.glb',
    escala: [0.7, 0.7, 0.7],
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  6: {
    label: 'terrenoMineração',
    pacote: 'kenney_hexagon-kit',
    arquivo: 'stone-rocks.glb',
    escala: [1, 1, 1],
    posY: -0.15,
    rotacao: 0,
    corTint: null,
  },
  7: {
    label: 'patioMineração',
    pacote: 'kenney_hexagon-kit',
    arquivo: 'stone.glb',
    escala: [1, 1, 1],
    posY: -0.15,
    rotacao: 0,
    corTint: null,
  },
  9: {
    label: 'depósito',
    pacote: 'kenney_hexagon-kit',
    arquivo: 'sand-rocks.glb',
    escala: [1, 1, 1],
    posY: -0.15,
    rotacao: 0,
    corTint: null,
  },

  // ── IDs 10-19 — Agricultura ───────────────────────────────

  // ANTES: ID 10 era composto plantação
  10: {
    label: 'plantação',
    tipo: 'composto',
    partes: [
      { modeloId: 2, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 180, offset: [0.0, 0.05, -0.2], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 180, offset: [0.0, 0.05, -0.4], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 180, offset: [0.0, 0.05, 0.0], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 180, offset: [0.0, 0.05, 0.2], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 180, offset: [0.0, 0.05, 0.4], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 180, offset: [0.3, 0.05, -0.2], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 180, offset: [0.3, 0.05, 0.0], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 180, offset: [0.3, 0.05, 0.2], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 180, offset: [-0.3, 0.05, -0.2], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 180, offset: [-0.3, 0.05, 0.0], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 180, offset: [-0.3, 0.05, 0.2], escala: 0.5, rotacao: Math.PI / 4 },
    ]
  },
  11: {
    label: 'fazenda administrativa',
    pacote: 'kenney_hexagon-kit',
    arquivo: 'building-house.glb',
    escala: [1, 1, 1],
    posY: -0.15,
    rotacao: 0,
    corTint: null,
  },
  12: {
    label: 'Campo / Plantação',
    pacote: 'kenney-farm',
    arquivo: 'field.glb',
    escala: [0.5, 0.3, 0.5],
    posY: 0,
    rotacao: 0,
    corTint: [0.6, 0.9, 0.4],
  },
  13: {
    label: 'Campo / Plantação 2',
    pacote: 'kenney-farm',
    arquivo: 'field.glb',
    escala: [0.5, 0.3, 0.5],
    posY: 0,
    rotacao: 0,
    corTint: [0.6, 0.9, 0.4],
  },
  // ── ID 14 — celeiro simples (ANTES estava duplicado com eucalipto) ──
  14: {
    label: 'celeiro',
    pacote: 'kenney_hexagon-kit',
    arquivo: 'building-mine.glb',
    escala: [1, 1, 1],
    posY: -0.15,
    rotacao: 0,
    corTint: [0.6, 0.9, 0.4],
  },
  15: {
    label: 'serraria',
    pacote: 'kenney_hexagon-kit',
    arquivo: 'dirt-lumber.glb',
    escala: [1, 1, 1],
    posY: -0.06,
    rotacao: 0,
    corTint: [0.6, 0.9, 0.4],
  },
  // ── ID 16 — eucalipto composto (ERA o segundo ID 14 duplicado) ──
  16: {
    label: 'eucalipto',
    tipo: 'composto',
    partes: [
      { modeloId: 2, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 187, offset: [0.0, 0.05, -0.2], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 187, offset: [0.0, 0.05, -0.4], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 187, offset: [0.0, 0.05, 0.0], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 187, offset: [0.0, 0.05, 0.2], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 187, offset: [0.0, 0.05, 0.4], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 187, offset: [0.3, 0.05, -0.2], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 187, offset: [0.3, 0.05, 0.0], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 187, offset: [0.3, 0.05, 0.2], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 187, offset: [-0.3, 0.05, -0.2], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 187, offset: [-0.3, 0.05, 0.0], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 187, offset: [-0.3, 0.05, 0.2], escala: 0.5, rotacao: Math.PI / 4 },
    ]
  },
  18: {
    label: 'Cooperativa Agrícola',
    pacote: 'kenney_hexagon-kit',
    arquivo: 'building-market.glb',
    escala: [1, 1, 1],
    posY: -0.15,
    rotacao: 0,
    corTint: null,
  },
  19: {
    label: 'Centro De Comércio De Plantações',
    pacote: 'kenney_hexagon-kit',
    arquivo: 'building-village.glb',
    escala: [1, 1, 1],
    posY: -0.15,
    rotacao: 0,
    corTint: null,
  },

  // ── IDs 20-29 — Tecnologia ────────────────────────────────
  20: {
    label: 'Data Center',
    pacote: 'kenney-city',
    arquivo: 'building-server.glb',
    escala: 0.4,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  21: {
    label: 'Antena / Torre Tech',
    pacote: 'kenney-city',
    arquivo: 'building-antenna.glb',
    escala: 0.5,
    posY: 0,
    rotacao: Math.PI / 4,
    corTint: null,
  },
  25: {
    label: 'predio m',
    pacote: 'kenney-city',
    arquivo: 'building-n.glb',
    escala: 0.5,
    posY: 0,
    rotacao: Math.PI / 4,
    corTint: null,
  },

  // ── IDs 30-39 — Indústria ─────────────────────────────────
  30: {
    label: 'Fábrica Pequena média',
    pacote: 'kenney-city',
    arquivo: 'building-factory-small.glb',
    escala: 0.42,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  31: {
    label: 'Fábrica Grande',
    pacote: 'kenney-city',
    arquivo: 'building-factory-large.glb',
    escala: 0.35,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },

  // ── IDs 40-49 — Comércio ──────────────────────────────────
  40: {
    label: 'Loja Pequena',
    pacote: 'kenney-city',
    arquivo: 'building-shop-small.glb',
    escala: 0.44,
    posY: 0,
    rotacao: Math.PI / 2,
    corTint: null,
  },

  // ── IDs 50-59 — Energia ───────────────────────────────────
  50: {
    label: 'Turbina Eólica',
    pacote: 'kenney-city',
    arquivo: 'windmill.glb',
    escala: 0.5,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },

  // ── IDs 60-94 — Industrial / Comercial ───────────────────
  60: {
    label: 'Fábrica pequena',
    pacote: 'kenney_city-kit-industrial_1.0',
    arquivo: 'building-j.glb',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  61: {
    label: 'Fábrica média',
    pacote: 'kenney_city-kit-industrial_1.0',
    arquivo: 'building-n.glb',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  62: {
    label: 'Fábrica média 2',
    pacote: 'kenney_city-kit-industrial_1.0',
    arquivo: 'building-s.glb',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  63: {
    label: 'Fábrica média 3',
    pacote: 'kenney_city-kit-industrial_1.0',
    arquivo: 'building-o.glb',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  64: {
    label: 'container',
    pacote: 'kenney_watercraft-pack',
    arquivo: 'cargo-container-b',
    escala: 0.65,
    posY: 0,
    rotacao: 0,
    corTint: [0.5, 0.5, 0.5],
  },
  65: {
    label: 'patioVeículo',
    pacote: 'kenney_hexagon-kit',
    arquivo: 'stone.glb',
    escala: [1, 1, 1],
    posY: -0.15,
    rotacao: 0,
    corTint: [0.1, 0.1, 0.1],
  },
  66: {
    label: 'carroPopu',
    pacote: 'kenney_car-kit',
    arquivo: 'sedan.glb',
    escala: 0.6,
    posY: 0.0,
    rotacao: 0,
    corTint: null,
  },
  67: {
    label: 'cone',
    pacote: 'kenney_car-kit',
    arquivo: 'cone.glb',
    escala: 0.6,
    posY: 0.0,
    rotacao: 0,
    corTint: null,
  },
  68: {
    label: 'Armazém industrial',
    pacote: 'kenney_city-kit-industrial_1.0',
    arquivo: 'building-s.glb',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  69: {
    label: 'Armazém pequeno chaminé',
    pacote: 'kenney_city-kit-industrial_1.0',
    arquivo: 'building-n.glb',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  70: {
    label: 'Armazém várias chaminés',
    pacote: 'kenney_city-kit-industrial_1.0',
    arquivo: 'building-m.glb',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  71: {
    label: 'Armazém várias chaminés2',
    pacote: 'kenney_city-kit-industrial_1.0',
    arquivo: 'building-a.glb',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  72: {
    label: 'Armazém unica chaminé',
    pacote: 'kenney_city-kit-industrial_1.0',
    arquivo: 'building-b.glb',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  73: {
    label: 'Armazém l',
    pacote: 'kenney_city-kit-industrial_1.0',
    arquivo: 'building-l.glb',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  74: {
    label: 'Armazém f',
    pacote: 'kenney_city-kit-industrial_1.0',
    arquivo: 'building-f.glb',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  75: {
    label: 'Armazém h',
    pacote: 'kenney_city-kit-industrial_1.0',
    arquivo: 'building-h.glb',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  76: {
    label: 'Armazém q',
    pacote: 'kenney_city-kit-industrial_1.0',
    arquivo: 'building-q.glb',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  77: {
    label: 'Armazém e',
    pacote: 'kenney_city-kit-industrial_1.0',
    arquivo: 'building-e.glb',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  78: {
    label: 'Avião',
    pacote: 'kenney_space-kit',
    arquivo: 'craft_speederA.glb',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  79: {
    label: 'basefoguete',
    pacote: 'kenney_space-kit',
    arquivo: 'rocket_baseB.glb',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  80: {
    label: 'fuelfoguete',
    pacote: 'kenney_space-kit',
    arquivo: 'rocket_fuelB.glb',
    escala: 1,
    posY: 1,
    rotacao: 0,
    corTint: null,
  },
  81: {
    label: 'sidefoguete',
    pacote: 'kenney_space-kit',
    arquivo: 'rocket_sidesB.glb',
    escala: 1,
    posY: 2,
    rotacao: 0,
    corTint: null,
  },
  82: {
    label: 'finsfoguete',
    pacote: 'kenney_space-kit',
    arquivo: 'rocket_finsB.glb',
    escala: 1,
    posY: 3,
    rotacao: 0,
    corTint: null,
  },
  83: {
    label: 'topofoguete',
    pacote: 'kenney_space-kit',
    arquivo: 'rocket_topB.glb',
    escala: 1,
    posY: 3.7,
    rotacao: 0,
    corTint: null,
  },
  84: {
    label: 'navio',
    pacote: 'kenney_pirate-kit',
    arquivo: 'ship-small.glb',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  86: {
    label: 'comerc1',
    pacote: 'kenney_city-kit-commercial_2.1',
    arquivo: 'building-c',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  87: {
    label: 'floresta',
    pacote: 'kenney_hexagon-kit',
    arquivo: 'grass-forest.glb',
    escala: [1, 1, 1],
    posY: -0.15,
    rotacao: 0,
    corTint: [0.6, 0.9, 0.4],
  },
  88: {
    label: 'floresta2',
    pacote: 'kenney_hexagon-kit',
    arquivo: 'grass-forest.glb',
    escala: [1, 1, 1],
    posY: -0.15,
    rotacao: 0,
    corTint: [0.6, 0.9, 0.4],
  },
  89: {
    label: 'base tecnologia',
    pacote: 'kenney_hexagon-kit',
    arquivo: 'sand.glb',
    escala: [1, 1, 1],
    posY: -0.15,
    rotacao: 0,
    corTint: [1.0, 0.5, 0.0],
  },
  90: {
    label: 'comerc-c',
    pacote: 'kenney_city-kit-commercial_2.1',
    arquivo: 'building-c',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  91: {
    label: 'comerc-d',
    pacote: 'kenney_city-kit-commercial_2.1',
    arquivo: 'building-d',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  92: {
    label: 'comerc-i',
    pacote: 'kenney_city-kit-commercial_2.1',
    arquivo: 'building-i',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  93: {
    label: 'comerc-j',
    pacote: 'kenney_city-kit-commercial_2.1',
    arquivo: 'building-j',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  94: {
    label: 'baseSede',
    pacote: 'kenney_space-kit',
    arquivo: 'hangar_smallA',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  95: {
    label: 'baseee',
    pacote: 'kenney_hexagon-kit',
    arquivo: 'stone.glb',
    escala: [1, 1, 1],
    posY: -0.15,
    rotacao: 0,
    corTint: [0.6, 0.0, 0.9],
  },
  96: {
    label: 'hangar',
    pacote: 'kenney_fantasy-town-kit_2.0',
    arquivo: 'stall-red.glb',
    escala: [1, 1, 1],
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  97: {
    label: 'base comercio',
    pacote: 'kenney_hexagon-kit',
    arquivo: 'sand.glb',
    escala: [1, 1, 1],
    posY: -0.15,
    rotacao: 0,
    corTint: [1.0, 0.0, 0.0],
  },
  98: {
    label: 'comercio',
    pacote: 'kenney_city-kit-commercial_2.1',
    arquivo: 'building-e.glb',
    escala: [1, 1, 1],
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  99: {
    label: 'comercio base',
    pacote: 'kenney_city-kit-suburban_20',
    arquivo: 'building-type-g.glb',
    escala: [1, 1, 1],
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  100: {
    label: 'camara',
    pacote: 'kenney_furniture-kit',
    arquivo: 'kitchenFridgeLarge.glb',
    escala: [1, 1, 1],
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  101: {
    label: 'camara',
    pacote: 'kenney_city-kit-suburban_20',
    arquivo: 'building-type-e.glb',
    escala: [1, 1, 1],
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  102: {
    label: 'camara',
    pacote: 'kenney_city-kit-suburban_20',
    arquivo: 'building-type-h.glb',
    escala: [1, 1, 1],
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  103: {
    label: 'camara',
    pacote: 'kenney_racing-kit',
    arquivo: 'pitsOfficeRoof.glb',
    escala: [1, 1, 1],
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  104: {
    label: 'barril',
    pacote: 'kenney survival kit',
    arquivo: 'barrel.glb',
    escala: [1, 1, 1],
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  105: {
    label: 'Armazém e',
    pacote: 'kenney_city-kit-industrial_1.0',
    arquivo: 'building-k.glb',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
   106: {
    label: 'caminhão',
    pacote: 'kenney_car-kit',
    arquivo: 'delivery.glb',
    escala: 0.5,
    posY: 0.0,
    rotacao: 0,
    corTint: null,
  },
  
  // ── Primitivos / plantas ──────────────────────────────────
  180: {
    label: 'plantação grama',
    pacote: 'kenney_survival-kit',
    arquivo: 'grass-large.glb',
    escala: 0.9,
    posY: 0,
    rotacao: 0,
    corTint: null,
    tipo: 'simples',
  },
  181: {
    label: 'arvore',
    pacote: 'kenney_nature-kit',
    arquivo: 'tree_oak.glb',
    escala: 0.7,
    posY: 0,
    rotacao: 0,
    corTint: [0.1, 0.9, 0.4],
    tipo: 'simples',
  },
  182: {
    label: 'vaca',
    pacote: 'kenney_cube-pets_1.0',
    arquivo: 'animal-cow.glb',
    escala: 0.7,
    posY: 0,
    rotacao: 0,
    corTint: null,
    tipo: 'simples',
  },
  183: {
    label: 'galinha',
    pacote: 'kenney_cube-pets_1.0',
    arquivo: 'animal-chick.glb',
    escala: 0.7,
    posY: 0,
    rotacao: 0,
    corTint: null,
    tipo: 'simples',
  },
  187: {
    label: 'arvore eucalipto',
    pacote: 'kenney_nature-kit',
    arquivo: 'tree_tall.glb',
    escala: 0.7,
    posY: 0,
    rotacao: 0,
    corTint: [0.1, 0.9, 0.4],
    tipo: 'simples',
  },
  187: {
    label: 'arvore eucalipto',
    pacote: 'kenney_nature-kit',
    arquivo: 'tree_tall.glb',
    escala: 0.7,
    posY: 0,
    rotacao: 0,
    corTint: [0.1, 0.9, 0.4],
    tipo: 'simples',
  },
  400: {
    label: 'silo',
    pacote: 'kenney_space-kit',
    arquivo: 'hangar_roundA.glb',
    escala: [1, 1.5, 1],
    posY: 0,
    rotacao: 0,
    corTint: [0.5, 0.5, 0.5],
    tipo: 'simples',
  },

  // ── Compostos ─────────────────────────────────────────────
  8: {
    label: 'pomar',
    tipo: 'composto',
    partes: [
      { modeloId: 2, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 181, offset: [0.0, 0.05, -0.2], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 181, offset: [0.0, 0.05, -0.4], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 181, offset: [0.0, 0.05, 0.0], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 181, offset: [0.0, 0.05, 0.2], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 181, offset: [0.0, 0.05, 0.4], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 181, offset: [0.3, 0.05, -0.2], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 181, offset: [0.3, 0.05, 0.0], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 181, offset: [0.3, 0.05, 0.2], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 181, offset: [-0.3, 0.05, -0.2], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 181, offset: [-0.3, 0.05, 0.0], escala: 0.5, rotacao: Math.PI / 4 },
      { modeloId: 181, offset: [-0.3, 0.05, 0.2], escala: 0.5, rotacao: Math.PI / 4 },
    ]
  },
  401: {
    label: 'edSilo',
    tipo: 'composto',
    partes: [
      { modeloId: 2, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 400, offset: [-0.31, 0.05, 0.4], escala: 0.2, rotacao: Math.PI / 0.4 },
    ]
  },
  404: {
    label: 'fazenda vacas',
    tipo: 'composto',
    partes: [
      { modeloId: 2, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 182, offset: [-0.0, 0.05, 0.0], escala: 0.2, rotacao: 0 },
      { modeloId: 182, offset: [-0.2, 0.05, 0.2], escala: 0.2, rotacao: Math.PI / 0.3 },
      { modeloId: 182, offset: [-0.1, 0.05, -0.3], escala: 0.2, rotacao: Math.PI / 0.1 },
      { modeloId: 182, offset: [-0.2, 0.05, -0.1], escala: 0.2, rotacao: Math.PI / 0.2 },
      { modeloId: 182, offset: [0.1, 0.05, -0.3], escala: 0.2, rotacao: Math.PI / 0.2 },
      { modeloId: 182, offset: [0.2, 0.05, 0.1], escala: 0.2, rotacao: Math.PI / 0.3 },
      { modeloId: 3, offset: [-0.2, 0.05, 0.0], escala: 0.50, rotacao: Math.PI / 0.4 },
      { modeloId: 3, offset: [0.7, 0.05, 0.0], escala: 0.50, rotacao: Math.PI / 0.4 },
      { modeloId: 3, offset: [-0.1, 0.05, 0.2], escala: 0.50, rotacao: Math.PI / 0.35 },
      { modeloId: 3, offset: [0.35, 0.05, -0.6], escala: 0.50, rotacao: Math.PI / 0.354 },
      { modeloId: 3, offset: [0.13, 0.05, 0.18], escala: 0.50, rotacao: Math.PI / 0.315 },
      { modeloId: 3, offset: [-0.30, 0.05, -0.60], escala: 0.50, rotacao: Math.PI / 0.315 },
    ]
  },
  // ── ID 405 — granja completa (ANTES estava duplicado, versão simplificada sobrescrevia) ──
  405: {
    label: 'granja de aves',
    tipo: 'composto',
    partes: [
      { modeloId: 2, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 183, offset: [-0.0, 0.05, 0.0], escala: 0.2, rotacao: 0 },
      { modeloId: 183, offset: [-0.2, 0.05, 0.2], escala: 0.2, rotacao: Math.PI / 0.3 },
      { modeloId: 183, offset: [-0.1, 0.05, -0.3], escala: 0.2, rotacao: Math.PI / 0.1 },
      { modeloId: 183, offset: [-0.2, 0.05, -0.1], escala: 0.2, rotacao: Math.PI / 0.2 },
      { modeloId: 183, offset: [0.1, 0.05, -0.3], escala: 0.2, rotacao: Math.PI / 0.2 },
      { modeloId: 183, offset: [0.2, 0.05, 0.1], escala: 0.2, rotacao: Math.PI / 0.3 },
      { modeloId: 3, offset: [-0.2, 0.05, 0.0], escala: 0.50, rotacao: Math.PI / 0.4 },
      { modeloId: 3, offset: [0.7, 0.05, 0.0], escala: 0.50, rotacao: Math.PI / 0.4 },
      { modeloId: 3, offset: [-0.1, 0.05, 0.2], escala: 0.50, rotacao: Math.PI / 0.35 },
      { modeloId: 3, offset: [0.35, 0.05, -0.6], escala: 0.50, rotacao: Math.PI / 0.354 },
      { modeloId: 3, offset: [0.13, 0.05, 0.18], escala: 0.50, rotacao: Math.PI / 0.315 },
      { modeloId: 3, offset: [-0.30, 0.05, -0.60], escala: 0.50, rotacao: Math.PI / 0.315 },
    ]
  },
  980: {
    label: 'Celeiro',
    pacote: 'kenney-farm',
    arquivo: 'barn.glb',
    escala: 0.45,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  450: {
    label: 'Fábrica pequena terreno',
    tipo: 'composto',
    partes: [
      { modeloId: 2, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 60, offset: [-0.1, 0.05, -0.15], escala: 0.40, rotacao: Math.PI / 0.4 },
    ]
  },
  451: {
    label: 'Fábrica média terreno',
    tipo: 'composto',
    partes: [
      { modeloId: 2, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 61, offset: [-0.25, 0.05, -0.15], escala: 0.40, rotacao: Math.PI / 0.4 },
    ]
  },
  452: {
    label: 'Fábrica média 2',
    tipo: 'composto',
    partes: [
      { modeloId: 2, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 62, offset: [-0.1, 0.05, -0.15], escala: 0.40, rotacao: Math.PI / 0.4 },
    ]
  },
  453: {
    label: 'Fábrica média 3',
    tipo: 'composto',
    partes: [
      { modeloId: 2, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 63, offset: [-0.26, 0.05, -0.17], escala: 0.40, rotacao: Math.PI / 0.4 },
    ]
  },
  454: {
    label: 'Container modular',
    tipo: 'composto',
    partes: [
      { modeloId: 2, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 64, offset: [0, 0.05, 0], escala: 0.40, rotacao: Math.PI / 0.4 },
    ]
  },
  455: {
    label: 'patio com veículos',
    tipo: 'composto',
    partes: [
      { modeloId: 65, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 66, offset: [0, 0.05, 0.2], escala: 0.40, rotacao: Math.PI / 0.60 },
      { modeloId: 67, offset: [-0.0, 0.05, -0], escala: 0.40, rotacao: Math.PI / 0.6 },
      { modeloId: 67, offset: [-0.2, 0.05, 0.11], escala: 0.40, rotacao: Math.PI / 0.6 },
    ]
  },
  456: {
    label: 'patio com armazém',
    tipo: 'composto',
    partes: [
      { modeloId: 65, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 68, offset: [0, 0.05, 0.0], escala: 0.40, rotacao: 90 },
    ]
  },
  457: {
    label: 'fábrica peq + chaminé',
    tipo: 'composto',
    partes: [
      { modeloId: 65, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 69, offset: [-0.2, 0.05, -0.1], escala: 0.40, rotacao: 26.7 },
    ]
  },
  458: {
    label: 'fábrica várias chaminés + terreno',
    tipo: 'composto',
    partes: [
      { modeloId: 65, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 70, offset: [0, 0.05, 0], escala: 0.40, rotacao: 26.7 },
    ]
  },
  459: {
    label: 'fábrica a + terreno',
    tipo: 'composto',
    partes: [
      { modeloId: 65, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 71, offset: [0, 0.05, 0], escala: 0.40, rotacao: 26.7 },
    ]
  },
  460: {
    label: 'fábrica b + terreno',
    tipo: 'composto',
    partes: [
      { modeloId: 65, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 72, offset: [0, 0.05, 0], escala: 0.40, rotacao: 26.7 },
    ]
  },
  461: {
    label: 'fábrica l + terreno',
    tipo: 'composto',
    partes: [
      { modeloId: 65, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 73, offset: [-0.1, 0.05, -0.1], escala: 0.40, rotacao: 26.7 },
    ]
  },
  462: {
    label: 'fábrica f + terreno',
    tipo: 'composto',
    partes: [
      { modeloId: 65, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 74, offset: [-0.1, 0.05, -0.1], escala: 0.40, rotacao: 26.7 },
    ]
  },
  463: {
    label: 'fábrica h + terreno',
    tipo: 'composto',
    partes: [
      { modeloId: 65, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 75, offset: [-0.13, 0.05, -0.2], escala: 0.40, rotacao: 26.7 },
    ]
  },
  464: {
    label: 'fábrica q + terreno',
    tipo: 'composto',
    partes: [
      { modeloId: 65, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 76, offset: [-0.04, 0.05, -0.05], escala: 0.38, rotacao: 26.7 },
    ]
  },
  465: {
    label: 'fábrica e + terreno',
    tipo: 'composto',
    partes: [
      { modeloId: 65, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 77, offset: [-0.08, 0.05, -0.0], escala: 0.40, rotacao: 26.7 },
    ]
  },
  466: {
    label: 'aeronave + terreno',
    tipo: 'composto',
    partes: [
      { modeloId: 65, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 78, offset: [-0.50, 0.05, 0.7], escala: 0.35, rotacao: 26.7 },
    ]
  },
  467: {
    label: 'foguete completo',
    tipo: 'composto',
    partes: [
      { modeloId: 65, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 79, offset: [-0.65, 0.05, -0.35], escala: 0.3, rotacao: 0.2 },
      { modeloId: 80, offset: [-0.65, 0.05, -0.35], escala: 0.3, rotacao: 0.2 },
      { modeloId: 81, offset: [-0.65, 0.05, -0.35], escala: 0.3, rotacao: 0.2 },
      { modeloId: 82, offset: [-0.65, 0.05, -0.35], escala: 0.3, rotacao: 0.2 },
      { modeloId: 83, offset: [-0.65, 0.05, -0.35], escala: 0.3, rotacao: 0.2 },
    ]
  },
  468: {
    label: 'navio completo',
    tipo: 'composto',
    partes: [
      { modeloId: 65, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 84, offset: [0, 0.05, 0], escala: 0.1, rotacao: 4.6 },
    ]
  },
  469: {
    label: 'comercial 1',
    tipo: 'composto',
    partes: [
      { modeloId: 65, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 86, offset: [0, 0.05, 0], escala: 0.4, rotacao: 1.5 },
    ]
  },
  470: {
    label: 'comercial 2',
    tipo: 'composto',
    partes: [
      { modeloId: 89, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 86, offset: [0, 0.05, 0], escala: 0.4, rotacao: 1.5 },
    ]
  },
  471: {
    label: 'comercial 3',
    tipo: 'composto',
    partes: [
      { modeloId: 89, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 91, offset: [0, 0.05, 0], escala: 0.4, rotacao: 1.5 },
    ]
  },
  472: {
    label: 'comercial 4',
    tipo: 'composto',
    partes: [
      { modeloId: 89, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 92, offset: [0, 0.05, 0], escala: 0.4, rotacao: 1.5 },
    ]
  },
  473: {
    label: 'comercial 5',
    tipo: 'composto',
    partes: [
      { modeloId: 89, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 93, offset: [0, 0.05, 0], escala: 0.4, rotacao: 1.5 },
    ]
  },
  474: {
    label: 'hangar tech',
    tipo: 'composto',
    partes: [
      { modeloId: 89, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 94, offset: [-0.3, 0.05, 0.4], escala: 0.2, rotacao: Math.PI / -0.66 },
    ]
  },
  475: {
    label: 'feira',
    tipo: 'composto',
    partes: [
      { modeloId: 97, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 96, offset: [-0.0, 0.05, 0.0], escala: 0.4, rotacao: Math.PI / -0.66 },
    ]
  },
  476: {
    label: 'feira',
    tipo: 'composto',
    partes: [
      { modeloId: 97, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 98, offset: [-0.0, 0.05, 0.0], escala: 0.4, rotacao: Math.PI / -0.66 },
    ]
  },
  477: {
    label: 'restaurante',
    tipo: 'composto',
    partes: [
      { modeloId: 97, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 99, offset: [-0.0, 0.05, 0.0], escala: 0.4, rotacao: Math.PI / -0.66 },
    ]
  },
  478: {
    label: 'camara fria',
    tipo: 'composto',
    partes: [
      { modeloId: 97, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 100, offset: [-0.0, 0.05, 0.1], escala: 0.4, rotacao:  -1.6 },
      { modeloId: 100, offset: [-0.0, 0.05, -0.12], escala: 0.4, rotacao:  -1.6 },
      { modeloId: 100, offset: [-0.0, 0.05, -0.34], escala: 0.4, rotacao:  -1.6 }
    ]
  },
  479: {
    label: 'camara fria',
    tipo: 'composto',
    partes: [
      { modeloId: 97, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 100, offset: [-0.0, 0.05, 0.1], escala: 0.4, rotacao:  -1.6 },
      { modeloId: 100, offset: [-0.0, 0.05, -0.12], escala: 0.4, rotacao:  -1.6 },
      { modeloId: 100, offset: [-0.0, 0.05, -0.34], escala: 0.4, rotacao:  -1.6 }
    ]
  },
  480: {
    label: 'comercio 2andar',
    tipo: 'composto',
    partes: [
      { modeloId: 97, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 101, offset: [0, 0.05, 0], escala: 0.4, rotacao: Math.PI / -0.66},
    ]
  },
  481: {
    label: 'comercio 2andar',
    tipo: 'composto',
    partes: [
      { modeloId: 97, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 102, offset: [0, 0.05, 0], escala: 0.4, rotacao: Math.PI / -0.66},
    ]
  },
  482: {
    label: 'posto completo',
    tipo: 'composto',
    partes: [
      { modeloId: 97, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 103, offset: [-0.24, 0.05, 0], escala: 0.4, rotacao: Math.PI / -0.4},
      { modeloId: 104, offset: [-0.06, 0.05, 0.4], escala: 0.4, rotacao: Math.PI / -0.4},
      { modeloId: 104, offset: [-0.14, 0.05, 0.2], escala: 0.4, rotacao: Math.PI / -0.4},
      { modeloId: 104, offset: [0.1, 0.05, 0.34], escala: 0.4, rotacao: Math.PI / -0.4},
    ]
  },
  483: {
    label: 'arm logistico',
    tipo: 'composto',
    partes: [
      { modeloId: 97, offset: [0, 0, 0], escala: 1, rotacao: 0 },
      { modeloId: 105, offset: [-0.24, 0.05, 0], escala: 0.4, rotacao: Math.PI / -0.4},
      { modeloId: 106, offset: [-0.06, 0.05, 0.4], escala: 0.4, rotacao: Math.PI / -0.4},
    
    ]
  },
}

// ─────────────────────────────────────────────────────────────
//  SEÇÃO 3 — MAPEAMENTO edifício → modelo
// ─────────────────────────────────────────────────────────────

export const EDIFICIO_PARA_MODELO = {
  // ── Agricultura ───────────────────────────────────────────
  'Plantação De Grãos': 10,
  'Fazenda Administrativa': 11,
  'Armazém': 11,
  'Plantação De Vegetais': 10,
  'Pomares': 8,
  'Silo': 401,
  'Plantação De Eucalipto': 16,   // ← era 14, agora aponta para ID 16 (eucalipto composto)
  'Plantação De Plantas Medicinais': 10,
  'Campo De Estocagem': 2,
  'Fazenda De Vacas': 404,
  'Granja De Aves': 405,
  'Criação De Ovinos': 10,
  'Serraria': 15,
  'Área Florestal': 87,
  'Armazém De Materiais Brutos': 450,
  'Terreno De Mineração': 6,
  'Pátio De Mineração': 7,
  'Depósito De Resíduos Orgânicos': 9,
  'Cooperativa Agrícola': 18,
  'Centro De Comércio De Plantações': 19,

  // ── Indústria ─────────────────────────────────────────────
  "Fábrica De Móveis": 450,
  "Fábrica De Rações": 450,
  "Fábrica De Embalagens": 450,
  "Fábrica De Fertilizantes": 456,
  "Fábrica De Bebidas": 457,
  "Fábrica De Pães": 453,
  "Container Modular": 454,
  "Pátio De Veículos": 455,
  "Armazém Industrial": 456,
  "Fábrica Têxtil": 456,
  "Fábrica De Calçados": 456,
  "Fábrica De Roupas": 452,
  "Fábrica De Celulose": 452,
  "Fábrica De Papel": 452,
  "Fábrica De Livros": 452,
  "Laboratório Farmacêutico": 458,
  "Fábrica De Medicamentos": 458,
  "Fábrica De Plásticos": 459,
  "Fábrica De Químicos Especializados": 459,
  'Alto-Forno': 460,
  'Usina Siderúrgica': 461,
  "Fundição De Alumínio": 462,
  "Fábrica De Ligas Metálicas": 462,
  "Indústria De Componentes Mecânicos": 463,
  "Fábrica De Chapas Metálicas": 463,
  "Fábrica De Estruturas Metálicas": 463,
  "Fábrica De Peças Automotivas": 463,
  "Montadora De Veículos Elétricos": 460,
  "Fábrica De Automóveis": 459,
  "Refinaria De Biocombustíveis": 460,
  "Refinaria": 458,
  "Biofábrica": 458,
  "Fábrica De Chips": 459,
  "Fábrica De Placas Eletrônicas": 464,
  "Fábrica De Semicondutores": 464,
  "Fábrica De Eletrônicos": 460,
  "Fábrica De Robôs": 460,
  "Empresa De Automação Industrial": 465,
  "Fábrica De Motores": 459,
  "Fábrica De Foguetes": 467,
  "Fábrica De Aeronaves": 466,
  "Estaleiro": 468,

  // ── Tecnologia ────────────────────────────────────────────
  "Startup": 470,
  "Servidor Em Nuvem": 471,
  "Data Center": 472,
  "Empresa De Desenvolvimento De Software": 472,
  "Empresa De Jogos Digitais": 472,
  "Empresa De Telecomunicações": 472,
  "Plataforma De Redes Sociais": 472,
  "Marketplace Online": 472,
  "Plataforma De Streaming": 472,
  "Instituto De Tecnologia Alimentar": 473,
  "Centro De Pesquisa Agrícola": 473,
  "Instituto De Biotecnologia": 473,
  "Laboratório De Design De Produtos": 474,
  "Centro De Pesquisa Em Eletrônicos": 474,
  "Laboratório De Nanotecnologia": 474,
  "Fábrica De Smartphones": 464,
  "Fábrica De Computadores": 464,
  "Fábrica De Consoles De Jogos": 464,
  "Fábrica De Dispositivos Vestíveis": 464,
  "Centro De Pesquisa Química": 473,
  "Centro De Pesquisa Em Fusão Nuclear": 473,
  "Laboratório De Novos Combustíveis": 474,
  "Centro De Pesquisa Aeroespacial": 474,
  "Centro De Engenharia Avançada": 473,
  "Centro De Pesquisa Em Materiais": 473,
  "Centro De Pesquisa Em Robótica": 473,
  "Centro De Pesquisa Em IA": 473,



  "Feira": 475,
  "Loja De Móveis": 476,
  "Restaurante": 477,
  "Padaria": 477,
  "Açougue": 477,
  "Câmara Fria": 478,
  "Petshop": 477, 
  "Farmácia": 477, 
  "Cafeteria": 477,
  "Livraria": 477,
   "Mercado": 480, 
   "Adega": 481,
  "Loja De Conveniência": 481,
  "Posto De Combustíveis": 482,
  "Rede De Fast-Food": 475,
  "Loja De Departamentos": 475,
  "Loja De Calçados": 475,
  "Loja De Vestuário": 475,
  "Loja De Gadgets E Wearables": 475,
  "Loja De Games": 475,
  "Loja De Celulares": 475,
  "Loja De Informática": 475,
  "Centro De Transporte E Entrega": 475,
  "Centro De Distribuição": 483,
  "Armazém Logístico": 456,
  "Transporte Petrolífero": 475,
  "Loja De Eletrônicos": 475,
  "Joalheria": 480,
  "Concessionária De Veículos": 475,
  "Shopping Popular": 475,
  "Shopping Center": 475
  }

// ─────────────────────────────────────────────────────────────
//  MODELOS_SEDE — edifício central por porte
// ─────────────────────────────────────────────────────────────

export const MODELOS_SEDE = {
  'Micro Empresa': {
    pacote: 'kenney_city-kit-commercial_2.1',
    arquivo: 'building-c.glb',
    escala: 0.7, posY: 0, rotacao: 1.5, corTint: null,
  },
  'Sociedade Limitada': {
    pacote: 'kenney_city-kit-commercial_2.1',
    arquivo: 'building-d.glb',
    escala: 0.7, posY: 0, rotacao: 1.5, corTint: null,
  },
  'Empresa Regional': {
    pacote: 'kenney_city-kit-commercial_2.1',
    arquivo: 'building-a.glb',
    escala: 0.7, posY: 0, rotacao: 1.5, corTint: null,
  },
  'Companhia Local': {
    pacote: 'kenney_city-kit-commercial_2.1',
    arquivo: 'building-f.glb',
    escala: 0.7, posY: 0, rotacao: 1.5, corTint: null,
  },
  'Empresa Estadual': {
    pacote: 'kenney_city-kit-commercial_2.1',
    arquivo: 'building-i.glb',
    escala: 0.7, posY: 0, rotacao: 1.5, corTint: null,
  },
  'Companhia Nacional': {
    pacote: 'kenney_city-kit-commercial_2.1',
    arquivo: 'building-j.glb',
    escala: 0.7, posY: 0, rotacao: 1.5, corTint: null,
  },
  'Corporação Multissetorial': {
    pacote: 'kenney_city-kit-commercial_2.1',
    arquivo: 'building-l.glb',
    escala: 0.7, posY: 0, rotacao: 1.5, corTint: null,
  },
  'Grupo Empresarial': {
    pacote: 'kenney_city-kit-commercial_2.1',
    arquivo: 'building-m.glb',
    escala: 0.7, posY: 0, rotacao: 1.5, corTint: null,
  },
  'Conglomerado Global': {
    pacote: 'kenney_city-kit-commercial_2.1',
    arquivo: 'building-skyscraper-a.glb',
    escala: 0.7, posY: 0, rotacao: 1.5, corTint: null,
  },
  'Mega Holding': {
    pacote: 'kenney_city-kit-commercial_2.1',
    arquivo: 'building-skyscraper-d.glb',
    escala: 0.7, posY: 0, rotacao: 1.5, corTint: null,
  },
}

export function resolverModeloSede(classificacaoPorte) {
  const edificio = MODELOS_SEDE[classificacaoPorte] ?? MODELOS_SEDE['Micro Empresa']
  const pacoteEdificio = PACOTES[edificio.pacote]

  // Base fixa — modelo 6 (stone-rocks / terreno de mineração)
  const base = MODELOS[95]
  const pacoteBase = PACOTES[base.pacote]
  const sBase = base.escala ?? 1

  // Edifício do topo
  const sEdificio = edificio.escala ?? 0.4

  return {
    tipo: 'composto',
    partes: [
      // ── camada 1: terreno base ──
      {
        glbPath: pacoteBase.basePath + base.arquivo,
        colormap: pacoteBase.colormap,
        escalaVec: Array.isArray(sBase) ? sBase : [sBase, sBase, sBase],
        posY: base.posY ?? -0.15,
        rotacao: base.rotacao ?? 0,
        corTint: base.corTint ?? null,
        offset: [0, 0, 0],
        escalaExtra: 1,
        rotacaoExtra: 0,
      },
      // ── camada 2: edifício do porte ──
      {
        glbPath: pacoteEdificio.basePath + edificio.arquivo,
        colormap: pacoteEdificio.colormap,
        escalaVec: Array.isArray(sEdificio) ? sEdificio : [sEdificio, sEdificio, sEdificio],
        posY: edificio.posY ?? 0,
        rotacao: edificio.rotacao ?? 0,
        corTint: edificio.corTint ?? null,
        offset: [0, 0.05, 0],
        escalaExtra: 1,
        rotacaoExtra: 0,
      },
    ],
  }
}


// ─────────────────────────────────────────────────────────────
//  HELPER — resolve config completa de um edifício pelo nome
// ─────────────────────────────────────────────────────────────

export function resolverModelo(nomeEdificio) {
  const modeloId = EDIFICIO_PARA_MODELO[nomeEdificio] ?? 1
  const modelo = MODELOS[modeloId] ?? MODELOS[1]

  // COMPOSTO
  if (modelo.tipo === 'composto') {
    return {
      tipo: 'composto',
      partes: modelo.partes.map(parte => {
        const sub = MODELOS[parte.modeloId]
        const pacote = PACOTES[sub.pacote]

        return {
          ...sub,
          glbPath: pacote.basePath + sub.arquivo,
          colormap: pacote.colormap,
          escalaVec: Array.isArray(sub.escala)
            ? sub.escala
            : [sub.escala, sub.escala, sub.escala],
          offset: parte.offset || [0, 0, 0],
          escalaExtra: parte.escala ?? 1,
          rotacaoExtra: parte.rotacao ?? 0,
        }
      })
    }
  }

  // SIMPLES
  const pacote = PACOTES[modelo.pacote]

  return {
    tipo: 'simples',
    modeloId,
    ...modelo,
    glbPath: pacote.basePath + modelo.arquivo,
    colormap: pacote.colormap,
    escalaVec: Array.isArray(modelo.escala)
      ? modelo.escala
      : [modelo.escala, modelo.escala, modelo.escala],
  }
}