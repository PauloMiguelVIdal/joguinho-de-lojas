// ============================================================
//  buildingModels.js
//  Registro central de modelos 3D para o MapWorld
//
//  ESTRUTURA DE PASTAS RECOMENDADA em /public:
//
//  public/
//  └── models/
//      ├── kenney-city/          ← pacote Kenney City Kit
//      │   ├── colormap.png      ← atlas de textura do pacote
//      │   ├── building_A.glb
//      │   ├── building_B.glb
//      │   └── ...
//      ├── kenney-space/         ← pacote Kenney Space Kit
//      │   ├── colormap.png
//      │   ├── rocket.glb
//      │   └── ...
//      ├── kenney-farm/          ← pacote Kenney Farm
//      │   ├── colormap.png
//      │   ├── barn.glb
//      │   └── ...
//      └── custom/               ← seus modelos próprios
//          ├── colormap.png      ← opcional
//          └── meu_modelo.glb
//
// ============================================================

// ─────────────────────────────────────────────────────────────
//  SEÇÃO 1 — PACOTES
//  Cada pacote tem um basePath e um colormap.
//  O colormap é aplicado automaticamente em todos os meshes
//  do pacote via material override (substitui a textura original).
// ─────────────────────────────────────────────────────────────

export const PACOTES = {
  // ── Kenney City Kit ──────────────────────────────────────
  'kenney-city': {
    label: 'Kenney City Kit',
    basePath: '/models/kenney-city/',
    colormap: '/models/kenney-city/colormap.png',
    // Se colormap = null, usa os materiais originais do GLB

  },

  // ── Kenney Farm Kit ──────────────────────────────────────
  'kenney-farm': {
    label: 'Kenney Farm Kit',
    basePath: '/models/kenney-farm/',
    colormap: '/models/kenney-farm/colormap.png',
  },
  'kenney_nature-kit': {
    label: 'kenney nature kit',
    basePath: '/models/kenney_nature-kit/GLTF format/',
    colormap: null, // não tem e não adianta adicionar
    // colormap: '/models/kenney_nature-kit/GLTF format/colormap.png',
  },
  'kenney_survival-kit': {
    label: 'kenney survival kit',
    basePath: '/models/kenney_survival-kit/GLB format/',
    // colormap: null,
    colormap: '/models/kenney_survival-kit/GLB format/Textures/colormap.png',
  },
  'kenney_hexagon-kit': {
    label: 'Kenney hexagon kit',
    basePath: '/models/kenney_hexagon-kit/GLB format/',
    colormap: '/models/kenney_hexagon-kit/GLB format/Textures/colormap.png',
  },

  // ── Kenney Space Kit ─────────────────────────────────────


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
    basePath: '/kenney_pirate-kit/GLB format/',
    colormap: '/kenney_pirate-kit/GLB format/Textures/colormap.png'
  },

  // ── Modelos próprios (sem atlas) ─────────────────────────
  'custom': {
    label: 'Custom',
    basePath: '/models/custom/',
    colormap: null, // usa material do GLB original
  },
}

// ─────────────────────────────────────────────────────────────
//  SEÇÃO 2 — MODELOS
//  Cada entrada = 1 modelo 3D.
//  Campos:
//    pacote   → chave de PACOTES acima
//    arquivo  → nome do arquivo dentro do basePath do pacote
//               A extensão pode ser .glb ou .gltf — o sistema tenta
//               automaticamente .glb primeiro, depois .gltf.
//               Você pode escrever qualquer das duas, ou omitir a extensão.
//    escala   → número ou [x, y, z]
//    posY     → offset vertical (para ajustar altura sobre o hex)
//    rotacao  → rotação em radianos no eixo Y (opcional, default 0)
//    corTint  → [r,g,b] 0..1 — tinta multiplicativa sobre o colormap (opcional)
//               null = sem tint, usa o colormap puro
// ─────────────────────────────────────────────────────────────

export const MODELOS = {
  // ── ID 1 — Genérico / fallback ────────────────────────────
  1: {
    label: 'Edifício Genérico',
    pacote: 'kenney-city',
    arquivo: 'building-type-m.glb',
    escala: 0.4,
    posY: 0,
    rotacao: Math.PI / 3,
    corTint: null,
  },

  // ── IDs 10-19 — Agricultura ───────────────────────────────
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
    label: 'cerca',
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
    posY: -0,
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

  980: {
    label: 'Celeiro',
    pacote: 'kenney-farm',
    arquivo: 'barn.glb',
    escala: 0.45,
    posY: 0,
    rotacao: 0,
    corTint: null,
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
    corTint: [0.6, 0.9, 0.4], // tint esverdeado
  },
  13: {
    label: 'Campo / Plantação',
    pacote: 'kenney-farm',
    arquivo: 'field.glb',
    escala: [0.5, 0.3, 0.5],
    posY: 0,
    rotacao: 0,
    corTint: [0.6, 0.9, 0.4], // tint esverdeado
  },
  14: {
    label: 'celeiro',
    pacote: 'kenney_hexagon-kit',
    arquivo: 'building-mine.glb',
    escala: [1, 1, 1],
    posY: -0.15,
    rotacao: 0,
    corTint: [0.6, 0.9, 0.4], // tint esverdeado
  },
  15: {
    label: 'serraria',
    pacote: 'kenney_hexagon-kit',
    arquivo: 'dirt-lumber.glb',
    escala: [1, 1, 1],
    posY: -0.06,
    rotacao: 0,
    corTint: [0.6, 0.9, 0.4], // tint esverdeado
  },
  10: {
    label: 'plantação',
    tipo: 'composto',
    partes: [
      {
        modeloId: 2, // cabana
        offset: [0, 0, 0],
        escala: 1,
        rotacao: 0,
      },
      {
        modeloId: 180, // fogueira
        offset: [0.0, 0.05, -0.2],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 180, // fogueira
        offset: [0.0, 0.05, -0.4],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 180, // fogueira
        offset: [0.0, 0.05, 0.0],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 180, // fogueira
        offset: [0.0, 0.05, 0.2],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 180, // fogueira
        offset: [0.0, 0.05, 0.4],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 180, // fogueira
        offset: [0.3, 0.05, -0.2],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 180, // fogueira
        offset: [0.3, 0.05, 0.0],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 180, // fogueira
        offset: [0.3, 0.05, 0.2],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 180, // fogueira
        offset: [-0.3, 0.05, -0.2],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 180, // fogueira
        offset: [-0.3, 0.05, 0.0],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 180, // fogueira
        offset: [-0.3, 0.05, 0.2],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },

    ]
  },
  8: {
    label: 'pomar',
    tipo: 'composto',
    partes: [
      {
        modeloId: 2, // cabana
        offset: [0, 0, 0],
        escala: 1,
        rotacao: 0,
      },
      {
        modeloId: 181, // fogueira
        offset: [0.0, 0.05, -0.2],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 181, // fogueira
        offset: [0.0, 0.05, -0.4],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 181, // fogueira
        offset: [0.0, 0.05, 0.0],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 181, // fogueira
        offset: [0.0, 0.05, 0.2],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 181, // fogueira
        offset: [0.0, 0.05, 0.4],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 181, // fogueira
        offset: [0.3, 0.05, -0.2],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 181, // fogueira
        offset: [0.3, 0.05, 0.0],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 181, // fogueira
        offset: [0.3, 0.05, 0.2],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 181, // fogueira
        offset: [-0.3, 0.05, -0.2],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 181, // fogueira
        offset: [-0.3, 0.05, 0.0],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 181, // fogueira
        offset: [-0.3, 0.05, 0.2],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },

    ]
  },
  14: {
    label: 'eucalipto',
    tipo: 'composto',
    partes: [
      {
        modeloId: 2, // cabana
        offset: [0, 0, 0],
        escala: 1,
        rotacao: 0,
      },
      {
        modeloId: 187, // fogueira
        offset: [0.0, 0.05, -0.2],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 187, // fogueira
        offset: [0.0, 0.05, -0.4],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 187, // fogueira
        offset: [0.0, 0.05, 0.0],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 187, // fogueira
        offset: [0.0, 0.05, 0.2],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 187, // fogueira
        offset: [0.0, 0.05, 0.4],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 187, // fogueira
        offset: [0.3, 0.05, -0.2],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 187, // fogueira
        offset: [0.3, 0.05, 0.0],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 187, // fogueira
        offset: [0.3, 0.05, 0.2],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 187, // fogueira
        offset: [-0.3, 0.05, -0.2],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 187, // fogueira
        offset: [-0.3, 0.05, 0.0],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },
      {
        modeloId: 187, // fogueira
        offset: [-0.3, 0.05, 0.2],
        escala: 0.5,
        rotacao: Math.PI / 4,
      },

    ]
  },
    18: {
    label: 'Cooperativa Agrícola',
    pacote: 'kenney_hexagon-kit',
    arquivo: 'building-market.glb',
    escala: [1, 1, 1],
    posY: -0.15,
    rotacao: 0,
    corTint: null, // tint esverdeado
  },
    19: {
    label: 'Centro De Comércio De Plantações',
    pacote: 'kenney_hexagon-kit',
    arquivo: 'building-village.glb',
    escala: [1, 1, 1],
    posY: -0.15,
    rotacao: 0,
    corTint: null, // tint esverdeado
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
  51: {
    label: 'Painel Solar',
    pacote: 'kenney-1',
    arquivo: 'solar-panel.glb',
    escala: [0.55, 0.3, 0.55],
    posY: 0,
    rotacao: Math.PI / 8,
    corTint: [0.3, 0.5, 1.0], // tint azulado
  },

  // ── IDs 60-69 — Espaço / Foguetes ────────────────────────
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
    label: 'Fábrica média',
    pacote: 'kenney_city-kit-industrial_1.0',
    arquivo: 'building-s.glb',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  63: {
    label: 'Fábrica média',
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
    posY: -0.0,
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
    label: 'Armazém unica chaminé',
    pacote: 'kenney_city-kit-industrial_1.0',
    arquivo: 'building-l.glb',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  74: {
    label: 'Armazém unica chaminé',
    pacote: 'kenney_city-kit-industrial_1.0',
    arquivo: 'building-f.glb',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  75: {
    label: 'Armazém unica chaminé',
    pacote: 'kenney_city-kit-industrial_1.0',
    arquivo: 'building-h.glb',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  76: {
    label: 'Armazém unica chaminé',
    pacote: 'kenney_city-kit-industrial_1.0',
    arquivo: 'building-q.glb',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  77: {
    label: 'Armazém unica chaminé',
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
  85: {
    label: 'navio',
    pacote: 'kenney_pirate-kit',
    arquivo: 'ship-small.glb',
    escala: 1,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },  
  450: {
    label: 'Fábrica pequena terreno',
    tipo: 'composto',
    partes: [
      {
        modeloId: 2, // cabana
        offset: [0, 0, 0],
        escala: 1,
        rotacao: 0,
      },
      {
        modeloId: 60, // fogueira
        offset: [-0.1, 0.05, -0.15],
        escala: 0.40,
        rotacao: Math.PI / 0.4,
      },
    ]
  },
  451: {
    label: 'Fábrica média terreno',
    tipo: 'composto',
    partes: [
      {
        modeloId: 2, // cabana
        offset: [0, 0, 0],
        escala: 1,
        rotacao: 0,
      },
      {
        modeloId: 61, // fogueira
        offset: [-0.25, 0.05, -0.15],
        escala: 0.40,
        rotacao: Math.PI / 0.4,
      },
    ]
  },
  452: {
    label: 'Fábrica média 2',
    tipo: 'composto',
    partes: [
      {
        modeloId: 2, // cabana
        offset: [0, 0, 0],
        escala: 1,
        rotacao: 0,
      },
      {
        modeloId: 62, // fogueira
        offset: [-0.1, 0.05, -0.15],
        escala: 0.40,
        rotacao: Math.PI / 0.4,
      },
    ]
  },
  453: {
    label: 'Fábrica média 3',
    tipo: 'composto',
    partes: [
      {
        modeloId: 2, // cabana
        offset: [0, 0, 0],
        escala: 1,
        rotacao: 0,
      },
      {
        modeloId: 63, // fogueira
        offset: [-0.26, 0.05, -0.17],
        escala: 0.40,
        rotacao: Math.PI / 0.4,
      },
    ]
  },
  454: {
    label: 'Fábrica média 3',
    tipo: 'composto',
    partes: [
      {
        modeloId: 2, // cabana
        offset: [0, 0, 0],
        escala: 1,
        rotacao: 0,
      },
      {
        modeloId: 64, // fogueira
        offset: [-0., 0.05, -0],
        escala: 0.40,
        rotacao: Math.PI / 0.4,
      },
    ]
  },
  455: {
    label: 'patio com veículos',
    tipo: 'composto',
    partes: [
      {
        modeloId: 65, // cabana
        offset: [0, 0, 0],
        escala: 1,
        rotacao: 0,
      },
      {
        modeloId: 66, // fogueira
        offset: [0, 0.05, 0.2],
        escala: 0.40,
        rotacao: Math.PI / 0.60,
      },
     
      {
        modeloId: 67, // fogueira
        offset: [-0.0, 0.05, -0],
        escala: 0.40,
        rotacao: Math.PI / 0.6,
      },
      {
        modeloId: 67, // fogueira
        offset: [-0.2, 0.05, 0.11],
        escala: 0.40,
        rotacao: Math.PI / 0.6,
      },
    ]
  },
  456: {
    label: 'patio com veículos',
    tipo: 'composto',
    partes: [
      {
        modeloId: 65, // cabana
        offset: [0, 0, 0],
        escala: 1,
        rotacao: 0,
      },
      {
        modeloId: 68, // fogueira
        offset: [0, 0.05, 0.0],
        escala: 0.40,
        rotacao: 90,
      },
    ]
  },
  457: {
    label: 'fábrica peq + chaminé',
    tipo: 'composto',
    partes: [
      {
        modeloId: 65, // cabana
        offset: [0, 0, 0],
        escala: 1,
        rotacao: 0,
      },
      {
        modeloId: 69, // fogueira
        offset: [-0.2, 0.05,-0.1],
        escala: 0.40,
        rotacao: 26.7,
      },
    ]
  },
  458: {
    label: 'fábrica varias chaminés + terreno',
    tipo: 'composto',
    partes: [
      {
        modeloId: 65, // cabana
        offset: [0, 0, 0],
        escala: 1,
        rotacao: 0,
      },
      {
        modeloId: 70, // fogueira
        offset: [-0., 0.05,-0],
        escala: 0.40,
        rotacao: 26.7,
      },
    ]
  },
  459: {
    label: 'fábrica varias chaminés + terreno',
    tipo: 'composto',
    partes: [
      {
        modeloId: 65, // cabana
        offset: [0, 0, 0],
        escala: 1,
        rotacao: 0,
      },
      {
        modeloId: 71, // fogueira
        offset: [-0., 0.05,-0],
        escala: 0.40,
        rotacao: 26.7,
      },
    ]
  },
  460: {
    label: 'fábrica varias chaminés + terreno',
    tipo: 'composto',
    partes: [
      {
        modeloId: 65, // cabana
        offset: [0, 0, 0],
        escala: 1,
        rotacao: 0,
      },
      {
        modeloId: 72, // fogueira
        offset: [-0., 0.05,-0],
        escala: 0.40,
        rotacao: 26.7,
      },
    ]
  },
  461: {
    label: 'fábrica varias chaminés + terreno',
    tipo: 'composto',
    partes: [
      {
        modeloId: 65, // cabana
        offset: [0, 0, 0],
        escala: 1,
        rotacao: 0,
      },
      {
        modeloId: 73, // fogueira
        offset: [-0.1, 0.05,-0.1],
        escala: 0.40,
        rotacao: 26.7,
      },
    ]
  },
  462: {
    label: 'fábrica varias chaminés + terreno',
    tipo: 'composto',
    partes: [
      {
        modeloId: 65, // cabana
        offset: [0, 0, 0],
        escala: 1,
        rotacao: 0,
      },
      {
        modeloId: 74, // fogueira
        offset: [-0.1, 0.05,-0.1],
        escala: 0.40,
        rotacao: 26.7,
      },
    ]
  },
  463: {
    label: 'fábrica varias chaminés + terreno',
    tipo: 'composto',
    partes: [
      {
        modeloId: 65, // cabana
        offset: [0, 0, 0],
        escala: 1,
        rotacao: 0,
      },
      {
        modeloId: 75, // fogueira
        offset: [-0.13, 0.05,-0.2],
        escala: 0.40,
        rotacao: 26.7,
      },
    ]
  },
  464: {
    label: 'fábrica varias chaminés + terreno',
    tipo: 'composto',
    partes: [
      {
        modeloId: 65, // cabana
        offset: [0, 0, 0],
        escala: 1,
        rotacao: 0,
      },
      {
        modeloId: 76, // fogueira
        offset: [-0.04, 0.05,-0.05],
        escala: 0.38,
        rotacao: 26.7,
      },
    ]
  },
  465: {
    label: 'fábrica varias chaminés + terreno',
    tipo: 'composto',
    partes: [
      {
        modeloId: 65, // cabana
        offset: [0, 0, 0],
        escala: 1,
        rotacao: 0,
      },
      {
        modeloId: 77, // fogueira
        offset: [-0.08, 0.05,-0.0],
        escala: 0.40,
        rotacao: 26.7,
      },
    ]
  },
  466: {
    label: 'fábrica varias chaminés + terreno',
    tipo: 'composto',
    partes: [
      {
        modeloId: 65, // cabana
        offset: [0, 0, 0],
        escala: 1,
        rotacao: 0,
      },
      {
        modeloId: 78, // fogueira
        offset: [-0.50, 0.05,0.7],
        escala: 0.35,
        rotacao: 26.7,
      },
    ]
  },
467: {
    label: 'foguete completo',
    tipo: 'composto',
    partes: [
     {
        modeloId: 65, // cabana
        offset: [0, 0, 0],
        escala: 1,
        rotacao: 0,
      },
      {
        modeloId: 79, // cabana
       offset: [-0.65, 0.05,-0.35],
        escala: 0.3,
        rotacao: 0.2,
      },
      {
        modeloId: 80, // fogueira
        offset: [-0.65, 0.05,-0.35],
        escala: 0.3,
        rotacao: 0.2,
      },
      {
        modeloId: 81, // fogueira
        offset: [-0.65, 0.05,-0.35],
        escala: 0.3,
        rotacao: 0.2,
      },
      {
        modeloId: 82, // fogueira
         offset: [-0.65, 0.05,-0.35],
        escala: 0.3,
        rotacao: 0.2,
      },
      {
        modeloId: 83, // fogueira
         offset: [-0.65, 0.05,-0.35],
        escala: 0.3,
        rotacao: 0.2,
      },
    ]
  },
468: {
    label: 'navio completo',
    tipo: 'composto',
    partes: [
     {
        modeloId: 65, // cabana
        offset: [0, 0, 0],
        escala: 1,
        rotacao: 0,
      },
      {
        modeloId: 84, // cabana
       offset: [-0.0, 0.05,-0.0],
        escala: 0.3,
        rotacao: 0.2,
      },
    ]
  },

  1000: {
    label: 'Plataforma de Lançamento',
    pacote: 'kenney-space',
    arquivo: 'launch-pad.glb',
    escala: 0.4,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },
  1001: {
    label: 'Plataforma de Lançamento',
    pacote: 'kenney-space',
    arquivo: 'launch-pad.glb',
    escala: 0.4,
    posY: 0,
    rotacao: 0,
    corTint: null,
  },








  1990: {
    tipo: 'composto',
    partes: [
      { modeloId: 10, offset: [0, 0, 0] },   // cabana
      { modeloId: 200, offset: [0.3, 0, 0.2] } // fogueira
    ]
  },
  180: {
    label: 'plantação',
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

  401: {
    label: 'edSilo',
    tipo: 'composto',
    partes: [
      {
        modeloId: 2, // cabana
        offset: [0, 0, 0],
        escala: 1,
        rotacao: 0,
      },
      {
        modeloId: 400, // fogueira
        offset: [-0.31, 0.05, 0.4],
        escala: 0.2,
        rotacao: Math.PI / 0.4,
      },
    ]
  },
  404: {
    label: 'fazenda vacas',
    tipo: 'composto',
    partes: [
      {
        modeloId: 2, // cabana
        offset: [0, 0, 0],
        escala: 1,
        rotacao: 0,
      },
      {
        modeloId: 182, // fogueira
        offset: [-0.0, 0.05, 0.0],
        escala: 0.2,
        rotacao: 0,
      },
      {
        modeloId: 182, // fogueira
        offset: [-0.2, 0.05, 0.2],
        escala: 0.2,
        rotacao: Math.PI / 0.3,
      },
      {
        modeloId: 182, // fogueira
        offset: [-0.2, 0.05, 0.2],
        escala: 0.2,
        rotacao: Math.PI / 0.3,
      },
      {
        modeloId: 182, // fogueira
        offset: [-0.1, 0.05, -0.3],
        escala: 0.2,
        rotacao: Math.PI / 0.1,
      },
      {
        modeloId: 182, // fogueira
        offset: [-0.2, 0.05, -0.1],
        escala: 0.2,
        rotacao: Math.PI / 0.2,
      },
      {
        modeloId: 182, // fogueira
        offset: [0.1, 0.05, -0.3],
        escala: 0.2,
        rotacao: Math.PI / 0.2,
      },
      {
        modeloId: 182, // fogueira
        offset: [0.2, 0.05, 0.1],
        escala: 0.2,
        rotacao: Math.PI / 0.3,
      },
      {
        modeloId: 3, // fogueira
        offset: [-0.2, 0.05, 0.0],
        escala: 0.50,
        rotacao: Math.PI / 0.4,
      },
      {
        modeloId: 3, // fogueira
        offset: [0.7, 0.05, 0.0],
        escala: 0.50,
        rotacao: Math.PI / 0.4,
      },
      {
        modeloId: 3, // fogueira
        offset: [-0.1, 0.05, 0.2],
        escala: 0.50,
        rotacao: Math.PI / 0.35,
      },
      {
        modeloId: 3, // fogueira
        offset: [0.35, 0.05, -0.6],
        escala: 0.50,
        rotacao: Math.PI / 0.354,
      },
      {
        modeloId: 3, // fogueira
        offset: [0.13, 0.05, 0.18],
        escala: 0.50,
        rotacao: Math.PI / 0.315,
      },
      {
        modeloId: 3, // fogueira
        offset: [-0.30, 0.05, -0.60],
        escala: 0.50,
        rotacao: Math.PI / 0.315,
      },



    ]
  },
  405: {
    label: 'granja de aves',
    tipo: 'composto',
        partes: [
      {
        modeloId: 2, // cabana
        offset: [0, 0, 0],
        escala: 1,
        rotacao: 0,
      },
      {
        modeloId: 183, // fogueira
        offset: [-0.0, 0.05, 0.0],
        escala: 0.2,
        rotacao: 0,
      },
      {
        modeloId: 183, // fogueira
        offset: [-0.2, 0.05, 0.2],
        escala: 0.2,
        rotacao: Math.PI / 0.3,
      },
      {
        modeloId: 183, // fogueira
        offset: [-0.2, 0.05, 0.2],
        escala: 0.2,
        rotacao: Math.PI / 0.3,
      },
      {
        modeloId: 183, // fogueira
        offset: [-0.1, 0.05, -0.3],
        escala: 0.2,
        rotacao: Math.PI / 0.1,
      },
      {
        modeloId: 183, // fogueira
        offset: [-0.2, 0.05, -0.1],
        escala: 0.2,
        rotacao: Math.PI / 0.2,
      },
      {
        modeloId: 183, // fogueira
        offset: [0.1, 0.05, -0.3],
        escala: 0.2,
        rotacao: Math.PI / 0.2,
      },
      {
        modeloId: 183, // fogueira
        offset: [0.2, 0.05, 0.1],
        escala: 0.2,
        rotacao: Math.PI / 0.3,
      },
      {
        modeloId: 3, // fogueira
        offset: [-0.2, 0.05, 0.0],
        escala: 0.50,
        rotacao: Math.PI / 0.4,
      },
      {
        modeloId: 3, // fogueira
        offset: [0.7, 0.05, 0.0],
        escala: 0.50,
        rotacao: Math.PI / 0.4,
      },
      {
        modeloId: 3, // fogueira
        offset: [-0.1, 0.05, 0.2],
        escala: 0.50,
        rotacao: Math.PI / 0.35,
      },
      {
        modeloId: 3, // fogueira
        offset: [0.35, 0.05, -0.6],
        escala: 0.50,
        rotacao: Math.PI / 0.354,
      },
      {
        modeloId: 3, // fogueira
        offset: [0.13, 0.05, 0.18],
        escala: 0.50,
        rotacao: Math.PI / 0.315,
      },
      {
        modeloId: 3, // fogueira
        offset: [-0.30, 0.05, -0.60],
        escala: 0.50,
        rotacao: Math.PI / 0.315,
      },
    ]
  },
  405: {
    label: 'granja de aves',
    tipo: 'composto',
        partes: [
      {
        modeloId: 2, // cabana
        offset: [0, 0, 0],
        escala: 1,
        rotacao: 0,
      },
      {
        modeloId: 183, // fogueira
        offset: [-0.0, 0.05, 0.0],
        escala: 0.2,
        rotacao: 0,
      },
    ]
  },

}

// ─────────────────────────────────────────────────────────────
//  SEÇÃO 3 — MAPEAMENTO edifício do jogo → modelo 3D
//
//  Chave = nome EXATO do edifício como está em dados[setor].edificios
//  Valor = ID do modelo em MODELOS acima
//
//  Se um edifício não estiver aqui, usa o modelo 1 (fallback)
// ─────────────────────────────────────────────────────────────

export const EDIFICIO_PARA_MODELO = {
  // ── Agricultura ───────────────────────────────────────────
  'Plantação De Grãos': 10,
  'Fazenda Administrativa': 11,
  'Armazém': 11,
  'Plantação De Vegetais': 10,
  'Pomares': 8,
  'Silo': 401,
  'Plantação De Eucalipto': 14,
  'Plantação De Plantas Medicinais': 10,
  'Campo De Estocagem': 2,
  'Fazenda De Vacas': 404,
  'Granja De Aves': 405,
  'Criação De Ovinos': 10,
  'Serraria': 15,
  'Área Florestal': 10,
  'Armazém De Materiais Brutos': 450,
  'Terreno De Mineração': 6,
  'Pátio De Mineração': 7,
  'Depósito De Resíduos Orgânicos': 9,
  'Cooperativa Agrícola': 18,
  'Centro De Comércio De Plantações': 19,

  // ── Indústria ─────────────────────────────────────────────
  "Fábrica De Móveis":450,
  "Fábrica De Rações":450,
  "Fábrica De Embalagens":450,
  "Fábrica De Fertilizantes":456,
  "Fábrica De Bebidas":457,
  "Fábrica De Pães":453,
  "Container Modular":454,
  "Pátio De Veículos":455,
  "Armazém Industrial":456,
  "Fábrica Têxtil":456,
  "Fábrica De Calçados":456,
  "Fábrica De Roupas":32,
  "Fábrica De Celulose":32,
  "Fábrica De Papel":32,
  "Fábrica De Livros":32,
  "Laboratório Farmacêutico":458,
   "Fábrica De Medicamentos":458,
   "Fábrica De Plásticos":459,
   "Fábrica De Químicos Especializados":459,
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




  // ── Comércio ──────────────────────────────────────────────


  // ── Energia ───────────────────────────────────────────────


  // ── Imobiliário ───────────────────────────────────────────
  
}


export const MODELOS_SEDE = {
 
  // Nível 1 — Micro Empresa / Empreendimento Individual
  // Prédio residencial pequeno, 2~3 andares
  'Micro Empresa': {
    pacote: 'kenney_city-kit-commercial_2.1',
    arquivo: 'building-village.glb',
    escala: 1,
    posY: -0.15,
    rotacao: 0,
    corTint: null, // tint esverdeado
  },

 
  // Nível 2 — Sociedade Limitada
  // Prédio um pouco maior
  'Sociedade Limitada': {
    pacote: 'kenney_hexagon-kit',
    arquivo: 'building-village.glb',
    escala: 1,
    posY: -0.15,
    rotacao: 0,
    corTint: null, // tint esverdeado
  },

 
  // Nível 3 — Empresa Regional
  'Empresa Regional': {
    pacote: 'kenney_hexagon-kit',
    arquivo: 'building-village.glb',
    escala: 1,
    posY: -0.15,
    rotacao: 0,
    corTint: null, // tint esverdeado
  },

  // Nível 4 — Companhia Local
  'Companhia Local': {
    pacote: 'kenney_hexagon-kit',
    arquivo: 'building-village.glb',
    escala: 1,
    posY: -0.15,
    rotacao: 0,
    corTint: null, // tint esverdeado
  },

 
  // Nível 5 — Empresa Estadual
  // Começa a ficar mais alto / corporativo
  'Empresa Estadual': {
    pacote: 'kenney_hexagon-kit',
    arquivo: 'building-village.glb',
    escala: 1,
    posY: -0.15,
    rotacao: 0,
    corTint: null, // tint esverdeado
  },

  // Nível 6 — Companhia Nacional
  'Companhia Nacional': {
    pacote: 'kenney_hexagon-kit',
    arquivo: 'building-village.glb',
    escala: 1,
    posY: -0.15,
    rotacao: 0,
    corTint: null, // tint esverdeado
  },

 
  // Nível 7 — Corporação Multissetorial
  // Arranha-céu começa aqui
  'Corporação Multissetorial': {
    pacote: 'kenney_car-kit',
    arquivo: 'sedan.glb',
    escala: 1,
    posY: -0.15,
    rotacao: 0,
    corTint: null, // tint esverdeado
  },

 
  // Nível 8 — Grupo Empresarial
  'Grupo Empresarial': {
    pacote: 'kenney_hexagon-kit',
    arquivo: 'building-village.glb',
    escala: 1,
    posY: -0.15,
    rotacao: 0,
    corTint: null, // tint esverdeado
  },

 
  // Nível 9 — Conglomerado Global
  'Conglomerado Global': {
    pacote: 'kenney_hexagon-kit',
    arquivo: 'building-village.glb',
    escala: 1,
    posY: -0.15,
    rotacao: 0,
    corTint: null, // tint esverdeado
  },

 
  // Nível 10 — Mega Holding
  // O maior arranha-céu disponível
  'Mega Holding': {
    pacote: 'kenney_hexagon-kit',
    arquivo: 'building-village.glb',
    escala: 1,
    posY: -0.15,
    rotacao: 0,
    corTint: null, // tint esverdeado
  },

}
 

// ─────────────────────────────────────────────────────────────
//  HELPER — resolve config completa de um edifício pelo nome
// ─────────────────────────────────────────────────────────────

export function resolverModelo(nomeEdificio) {
  const modeloId = EDIFICIO_PARA_MODELO[nomeEdificio] ?? 1
  const modelo = MODELOS[modeloId] ?? MODELOS[1]

  // 🔥 NOVO: detectar composto
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

          // overrides da parte
          offset: parte.offset || [0, 0, 0],
          escalaExtra: parte.escala ?? 1,
          rotacaoExtra: parte.rotacao ?? 0,
        }
      })
    }
  }

  // 🧱 padrão simples (igual ao seu)
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


export function resolverModeloSede(classificacaoPorte) {
  // Fallback: se o porte não estiver cadastrado usa o menor
  const modelo = MODELOS_SEDE[classificacaoPorte] ?? MODELOS_SEDE['Micro Empresa']
  const pacote = PACOTES[modelo.pacote]
 
  return {
    ...modelo,
    glbPath:  pacote.basePath + modelo.arquivo,
    colormap: pacote.colormap,
    escalaVec: Array.isArray(modelo.escala)
      ? modelo.escala
      : [modelo.escala, modelo.escala, modelo.escala],
  }
}