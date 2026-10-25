// ============================================================
//  MapWorld.jsx
//  (com Mercado e Ecossistema móveis + hover suave)
// ============================================================

import React, { useState, useMemo, useContext, useEffect, useRef, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, OrbitControls, Html } from '@react-three/drei'
import { defineHex, Grid, spiral } from 'honeycomb-grid'
import * as THREE from 'three'
import { DadosEconomyGlobalContext } from '../dadosEconomyGlobal'
import { BuildingModel } from './BuildingModel'
import { resolverModeloSede, MODELOS, EDIFICIO_PARA_MODELO } from './buildingModels'
import { useCentralStore, EDIFICIOS_BASE_DINAMICOS, EDIFICIOS_FINAIS_DINAMICOS_INICIAL, LICENCAS_DINAMICAS_GLOBAIS } from "../stores/useCentralStore";
import {
  EDIFICIOS_FINAIS_ESTATICOS,
  LICENCAS_ESTATICAS,
  EDIFICIOS_BASE_ESTATICOS,
  LICENCAS_ESTATICAS_GLOBAIS,
} from "../stores/dadosEstáticos";

// ─── Config de fórmulas (traduz nome+setor → edificioId) ───
import { FORMULAS_EDIFICIOS } from './productionFormulasConfig';


const HEX_SIZE = 0.6

const hexToWorld = (hex, size) => ({
  x: size * 1.73 * (hex.q + hex.r / 2),
  z: size * 1.5 * hex.r,
})

const HEX_DIRECTIONS = [
  [1, 0], [1, -1], [0, -1],
  [-1, 0], [-1, 1], [0, 1],
]

function vizinhosDeHex(q, r) {
  return HEX_DIRECTIONS.map(([dq, dr]) => `${q + dq},${r + dr}`)
}

function edificioEhCluster(nomeEdificio) {
  const modeloId = EDIFICIO_PARA_MODELO[nomeEdificio]
  if (!modeloId) return false
  return MODELOS[modeloId]?.tamanho === 7
}

// ─── Sets que determinam se o edifício tem gerenciamento ───
const PRODUCTIONS_SET = new Set([
  "Plantação De Grãos","Fazenda De Vacas","Plantação De Eucalipto","Granja De Aves","Criação De Ovinos",
  "Serraria","Fábrica De Smartphones","Fábrica De Computadores","Fábrica De Consoles De Jogos",
  "Fábrica De Dispositivos Vestíveis","Fábrica De Rações","Fábrica De Embalagens","Fábrica De Fertilizantes",
  "Fábrica Têxtil","Fábrica De Calçados","Fábrica De Roupas","Fábrica De Celulose","Fábrica De Papel",
  "Fábrica De Livros","Fábrica De Medicamentos","Laboratório Farmacêutico","Fábrica De Plásticos",
  "Fábrica De Químicos Especializados","Alto-Forno","Usina Siderúrgica","Fundição De Alumínio",
  "Fábrica De Ligas Metálicas","Indústria De Componentes Mecânicos","Fábrica De Chapas Metálicas",
  "Fábrica De Estruturas Metálicas","Fábrica De Peças Automotivas","Montadora De Veículos Elétricos",
  "Fábrica De Automóveis","Refinaria","Biofábrica","Fábrica De Chips","Fábrica De Placas Eletrônicas",
  "Fábrica De Semicondutores","Fábrica De Robôs","Fábrica De Motores","Fábrica De Foguetes",
  "Fábrica De Aeronaves","Estaleiro","Fábrica De Turbinas Eólicas","Fábrica De Painéis Solares","Fábrica De Baterias",
]);

const SELL_FINAL_SET = new Set([
  "Livraria","Mercado","Açougue","Petshop","Farmácia","Loja De Calçados","Loja De Vestuário",
  "Loja De Gadgets E Wearables","Loja De Games","Loja De Celulares","Loja De Informática",
  "Loja De Eletrônicos","Concessionária De Veículos",
]);

function edificioTemGerenciamento(nome) {
  return PRODUCTIONS_SET.has(nome) || SELL_FINAL_SET.has(nome);
}

function buscarEdificioIdPorNomeESetor(nome, setor) {
  const found = FORMULAS_EDIFICIOS.find(
    (f) => f.nomeEdificio === nome && f.setor === setor
  );
  return found?.edificioId ?? null;
}

const SETOR_CONFIG = {
  agricultura:  { label: 'Agricultura', cor1: '#003816', cor3: '#0C9123', cor4: '#4CAF50' },
  tecnologia:   { label: 'Tecnologia',  cor1: '#A64B00', cor3: '#FF6F00', cor4: '#FF8C42' },
  industria:    { label: 'Indústria',   cor1: '#1A1A1A', cor3: '#808080', cor4: '#B3B3B3' },
  comercio:     { label: 'Comércio',    cor1: '#660000', cor3: '#E60000', cor4: '#FF4D4D' },
  imobiliario:  { label: 'Imobiliário', cor1: '#000066', cor3: '#3333CC', cor4: '#6666FF' },
  energia:      { label: 'Energia',     cor1: '#665200', cor3: '#E6B800', cor4: '#FFD966' },
}

const MERCADO_CONFIG = {
  label: 'Mercado Global',
  cor1: '#6A00FF',
  cor3: '#934CFF',
  cor4: '#C79FFF',
}

const ECOSSISTEMA_CONFIG = {
  label: 'Ecossistema',
  cor1: '#0C9123',
  cor3: '#4CAF50',
  cor4: '#81C784',
}

const SEDE_CONFIG = {
  label: 'Sede',
  cor1: '#350973',
  cor3: '#6A00FF',
  cor4: '#C79FFF',
}

const getImageUrl = (nome) => `/imagens/${nome}.png`

// ─── Hook de elevação suave ─────────────────────────────────
function useElevacaoSuave({ selected, hovered, baseY = 0 }) {
  const ref = useRef()
  const targetY = useRef(baseY)

  useEffect(() => {
    if (selected) targetY.current = baseY + 0.14
    else if (hovered) targetY.current = baseY + 0.06
    else targetY.current = baseY
  }, [selected, hovered, baseY])

  useFrame(() => {
    if (!ref.current) return
    const atual = ref.current.position.y
    const alvo = targetY.current
    const diff = alvo - atual
    if (Math.abs(diff) > 0.0005) {
      ref.current.position.y = atual + diff * 0.18
    } else {
      ref.current.position.y = alvo
    }
  })

  return ref
}

// ─── AnimatedHex (scale-in bounce para novos tiles) ─────────
const AnimatedHex = React.memo(({ expandindo, ehNovo, children }) => {
  const ref = useRef()
  const startTimeRef = useRef(null)
  const DURACAO = 500

  useFrame(({ clock }) => {
    if (!ref.current) return
    if (!expandindo || !ehNovo) {
      if (ref.current.scale.x !== 1) ref.current.scale.setScalar(1)
      return
    }
    if (startTimeRef.current == null) startTimeRef.current = clock.elapsedTime
    const elapsed = (clock.elapsedTime - startTimeRef.current) * 1000
    const t = Math.min(1, elapsed / DURACAO)
    const c1 = 1.70158
    const c3 = c1 + 1
    const eased = 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
    ref.current.scale.setScalar(eased)
  })

  useEffect(() => {
    if (!expandindo) startTimeRef.current = null
  }, [expandindo])

  return <group ref={ref}>{children}</group>
})

// ─────────────────────────────────────────────────────────────
//  SedeTag / MercadoTag / EcossistemaTag
// ─────────────────────────────────────────────────────────────
const SedeTag = ({ nomeEmpresa, porte, tagsVisiveis, selected }) => {
  if (!tagsVisiveis) return null
  return (
    <Html position={[0, 1.5, 0]} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <div style={{
          background: selected
            ? 'linear-gradient(135deg, #F27405 0%, #8B3D00 100%)'
            : 'linear-gradient(135deg, rgba(76,20,169,0.95) 0%, rgba(30,8,80,0.95) 100%)',
          border: selected ? '1.5px solid #ffb060' : '1.5px solid rgba(199,159,255,0.6)',
          boxShadow: selected
            ? '0 0 18px rgba(242,116,5,0.6), 0 2px 8px rgba(0,0,0,0.6)'
            : '0 0 18px rgba(100,17,217,0.55), 0 2px 8px rgba(0,0,0,0.6)',
          borderRadius: '10px', padding: '5px 12px',
          fontFamily: "'Rajdhani','Segoe UI',sans-serif",
          fontWeight: 800, fontSize: '13px', letterSpacing: '0.08em',
          color: '#fff', whiteSpace: 'nowrap',
          textShadow: '0 1px 4px rgba(0,0,0,0.6)', textTransform: 'uppercase',
        }}>
          {nomeEmpresa || 'Sua Empresa'}
        </div>
        <div style={{
          background: 'linear-gradient(135deg, rgba(242,116,5,0.92) 0%, rgba(130,55,0,0.92) 100%)',
          border: '1px solid rgba(255,176,96,0.5)',
          boxShadow: '0 0 10px rgba(242,116,5,0.35)',
          borderRadius: '6px', padding: '2px 10px',
          fontFamily: "'Rajdhani','Segoe UI',sans-serif",
          fontWeight: 700, fontSize: '10px', letterSpacing: '0.1em',
          color: '#fff', whiteSpace: 'nowrap', textTransform: 'uppercase',
        }}>
          ★ {porte}
        </div>
      </div>
      <div style={{
        width: 2, height: 14, margin: '2px auto 0',
        background: 'linear-gradient(to bottom, rgba(199,159,255,0.8), transparent)',
        borderRadius: 1,
      }} />
    </Html>
  )
}

const MercadoTag = ({ tagsVisiveis, selected }) => {
  if (!tagsVisiveis) return null
  return (
    <Html position={[0, 1.4, 0]} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <div style={{
          background: selected
            ? 'linear-gradient(135deg, #F27405 0%, #8B3D00 100%)'
            : 'linear-gradient(135deg, rgba(106,0,255,0.95) 0%, rgba(52,9,115,0.95) 100%)',
          border: selected ? '1.5px solid #ffb060' : '1.5px solid rgba(199,159,255,0.7)',
          boxShadow: selected
            ? '0 0 18px rgba(242,116,5,0.6), 0 2px 8px rgba(0,0,0,0.6)'
            : '0 0 18px rgba(106,0,255,0.55), 0 2px 8px rgba(0,0,0,0.6)',
          borderRadius: '10px', padding: '5px 12px',
          fontFamily: "'Rajdhani','Segoe UI',sans-serif",
          fontWeight: 800, fontSize: '12px', letterSpacing: '0.09em',
          color: '#fff', whiteSpace: 'nowrap',
          textShadow: '0 1px 4px rgba(0,0,0,0.6)', textTransform: 'uppercase',
        }}>
          🏛 Mercado Global
        </div>
      </div>
      <div style={{
        width: 2, height: 14, margin: '2px auto 0',
        background: 'linear-gradient(to bottom, rgba(199,159,255,0.8), transparent)',
        borderRadius: 1,
      }} />
    </Html>
  )
}

const EcossistemaTag = ({ tagsVisiveis, selected }) => {
  if (!tagsVisiveis) return null
  return (
    <Html position={[0, 1.4, 0]} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <div style={{
          background: selected
            ? 'linear-gradient(135deg, #F27405 0%, #8B3D00 100%)'
            : 'linear-gradient(135deg, rgba(12,145,35,0.95) 0%, rgba(0,56,22,0.95) 100%)',
          border: selected ? '1.5px solid #ffb060' : '1.5px solid rgba(129,199,132,0.7)',
          boxShadow: selected
            ? '0 0 18px rgba(242,116,5,0.6), 0 2px 8px rgba(0,0,0,0.6)'
            : '0 0 18px rgba(12,145,35,0.55), 0 2px 8px rgba(0,0,0,0.6)',
          borderRadius: '10px', padding: '5px 12px',
          fontFamily: "'Rajdhani','Segoe UI',sans-serif",
          fontWeight: 800, fontSize: '12px', letterSpacing: '0.09em',
          color: '#fff', whiteSpace: 'nowrap',
          textShadow: '0 1px 4px rgba(0,0,0,0.6)', textTransform: 'uppercase',
        }}>
          🌿 Ecossistema
        </div>
      </div>
      <div style={{
        width: 2, height: 14, margin: '2px auto 0',
        background: 'linear-gradient(to bottom, rgba(129,199,132,0.8), transparent)',
        borderRadius: 1,
      }} />
    </Html>
  )
}

// ─────────────────────────────────────────────────────────────
//  HexBaseSede
// ─────────────────────────────────────────────────────────────
const HexBaseSede = ({ hovered, selected }) => {
  const shape = useMemo(() => {
    const s = new THREE.Shape()
    const vs = HEX_SIZE * 1.015
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i + Math.PI / 6
      i === 0
        ? s.moveTo(vs * Math.cos(angle), vs * Math.sin(angle))
        : s.lineTo(vs * Math.cos(angle), vs * Math.sin(angle))
    }
    s.closePath()
    return s
  }, [])

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <extrudeGeometry args={[shape, { depth: 0.2, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.015, bevelSegments: 2 }]} />
        <meshStandardMaterial color="#4a7230" roughness={0.9} metalness={0} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.2, 0]} receiveShadow>
        <shapeGeometry args={[shape]} />
        <meshStandardMaterial
          color={selected ? '#b4e06e' : hovered ? '#78c052' : '#5a9e44'}
          roughness={0.8}
          metalness={0}
        />
      </mesh>
      {(selected || hovered) && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.21, 0]}>
          <ringGeometry args={[HEX_SIZE * 0.9, HEX_SIZE * 1.0, 6]} />
          <meshBasicMaterial
            color={selected ? '#F27405' : '#d4f08a'}
            transparent
            opacity={selected ? 1 : 0.5}
          />
        </mesh>
      )}
    </group>
  )
}

// ─────────────────────────────────────────────────────────────
//  TileSede
// ─────────────────────────────────────────────────────────────
const TileSede = ({ nomeEmpresa, porte, tagsVisiveis, selected, onSelect, onDoubleSelect }) => {
  const config = useMemo(() => resolverModeloSede(porte), [porte])
  const [hovered, setHover] = useState(false)
  const groupRef = useElevacaoSuave({ selected, hovered, baseY: 0 })

  return (
    <group
      ref={groupRef}
      position={[0, 0, 0]}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true) }}
      onPointerOut={() => setHover(false)}
      onClick={(e) => { e.stopPropagation(); onSelect() }}
      onDoubleClick={(e) => { e.stopPropagation(); onDoubleSelect() }}
    >
      <HexBaseSede hovered={hovered} selected={selected} />
      <BuildingModel
        nomeEdificio={null}
        corFallback="#888888"
        posicaoBase={[0, 0.22, 0]}
        _overrideConfig={config}
      />
      <SedeTag
        nomeEmpresa={nomeEmpresa}
        porte={porte}
        tagsVisiveis={tagsVisiveis}
        selected={selected}
      />
    </group>
  )
}

// ─────────────────────────────────────────────────────────────
//  HexBase
// ─────────────────────────────────────────────────────────────
const HexBase = ({ hovered, selected, corTopo }) => {
  const shape = useMemo(() => {
    const s = new THREE.Shape()
    const vs = HEX_SIZE * 1.015
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i + Math.PI / 6
      i === 0
        ? s.moveTo(vs * Math.cos(angle), vs * Math.sin(angle))
        : s.lineTo(vs * Math.cos(angle), vs * Math.sin(angle))
    }
    s.closePath()
    return s
  }, [])

  const defaultTop = corTopo || (selected ? '#b4e06e' : hovered ? '#78c052' : '#5a9e44')

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <extrudeGeometry args={[shape, { depth: 0.2, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.015, bevelSegments: 2 }]} />
        <meshStandardMaterial color="#4a7230" roughness={0.9} metalness={0} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.2, 0]} receiveShadow>
        <shapeGeometry args={[shape]} />
        <meshStandardMaterial color={defaultTop} roughness={0.8} metalness={0} />
      </mesh>
      {(selected || hovered) && !corTopo && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.21, 0]}>
          <ringGeometry args={[HEX_SIZE * 0.87, HEX_SIZE * 0.99, 6]} />
          <meshBasicMaterial color={selected ? '#F27405' : '#d4f08a'} transparent opacity={selected ? 0.95 : 0.5} />
        </mesh>
      )}
    </group>
  )
}

// ─────────────────────────────────────────────────────────────
//  BuildingTag
// ─────────────────────────────────────────────────────────────
const BuildingTag = ({ nome, quantidade, setor, selected, tagsVisiveis }) => {
  if (!tagsVisiveis) return null
  const cfg = SETOR_CONFIG[setor] || { cor1: '#111', cor3: '#555', cor4: '#888', label: '?' }
  const bgGradient = selected
    ? 'linear-gradient(135deg, #F27405 0%, #8B3D00 100%)'
    : `linear-gradient(135deg, ${cfg.cor3} 0%, ${cfg.cor1} 100%)`
  const borderColor = selected ? '#ffb060' : cfg.cor4 + 'cc'
  const shadowColor = selected ? 'rgba(242,116,5,0.5)' : cfg.cor4 + '44'

  return (
    <Html position={[0, 1.05, 0]} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
      <div style={{
        background: bgGradient,
        border: `1.5px solid ${borderColor}`,
        boxShadow: `0 2px 12px ${shadowColor}, 0 0 0 1px rgba(0,0,0,0.2)`,
        borderRadius: '9px', padding: '4px 8px 4px 4px',
        display: 'flex', alignItems: 'center', gap: '6px',
        whiteSpace: 'nowrap', backdropFilter: 'blur(6px)', minWidth: 0,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: '6px',
          background: selected ? 'rgba(255,255,255,0.2)' : `linear-gradient(135deg, ${cfg.cor4} 0%, ${cfg.cor3} 100%)`,
          border: `1px solid ${selected ? 'rgba(255,255,255,0.4)' : cfg.cor4 + '88'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, overflow: 'hidden',
        }}>
          <img
            src={getImageUrl(nome)} alt={nome}
            style={{ width: '70%', height: '70%', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
            onError={(e) => { e.target.style.display = 'none' }}
          />
        </div>
        <span style={{
          fontFamily: "'Rajdhani','Segoe UI',sans-serif", fontWeight: 700, fontSize: '11px',
          letterSpacing: '0.04em', color: '#fff', maxWidth: '90px',
          overflow: 'hidden', textOverflow: 'ellipsis', textShadow: '0 1px 3px rgba(0,0,0,0.5)',
        }}>
          {nome.length > 16 ? nome.slice(0, 14) + '…' : nome}
        </span>
        <span style={{
          background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: '5px', padding: '1px 5px', fontSize: '10px',
          fontFamily: "'Rajdhani',sans-serif", fontWeight: 800, color: '#fff',
          flexShrink: 0, textShadow: '0 1px 2px rgba(0,0,0,0.4)',
        }}>
          ×{quantidade}
        </span>
      </div>
      <div style={{
        width: 1, height: 10, margin: '0 auto',
        background: `linear-gradient(to bottom, ${cfg.cor4}cc, transparent)`,
      }} />
    </Html>
  )
}

// ─────────────────────────────────────────────────────────────
//  HexTileClusterSatelite
// ─────────────────────────────────────────────────────────────
const HexTileClusterSatelite = ({ hex, corTopo, modeloId, corFallback }) => {
  const { x, z } = hexToWorld(hex, HEX_SIZE)
  return (
    <group position={[x, 0, z]}>
      <HexBase corTopo={corTopo} hovered={false} selected={false} />
      {modeloId != null && (
        <BuildingModel
          nomeEdificio={null}
          corFallback={corFallback || '#888888'}
          posicaoBase={[0, 0.22, 0]}
          _overrideModeloId={modeloId}
        />
      )}
    </group>
  )
}

// ─────────────────────────────────────────────────────────────
//  HexTile — edifícios padrão
// ─────────────────────────────────────────────────────────────
const HexTile = ({ hex, building, onSelect, onDoubleSelect, moveMode, selected, tagsVisiveis }) => {
  const [hovered, setHover] = useState(false)
  const { x, z } = hexToWorld(hex, HEX_SIZE)
  const cfg = building ? SETOR_CONFIG[building.setor] : null
  const groupRef = useElevacaoSuave({ selected, hovered, baseY: 0 })

  return (
    <group
      ref={groupRef}
      position={[x, 0, z]}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true) }}
      onPointerOut={() => setHover(false)}
      onClick={(e) => {
        e.stopPropagation()
        if (building || moveMode) onSelect(hex)
      }}
      onDoubleClick={(e) => {
        e.stopPropagation()
        if (building && onDoubleSelect) onDoubleSelect(building)
      }}
    >
      <HexBase hovered={hovered} selected={selected} />
      {(selected || hovered) && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.21, 0]}>
          <ringGeometry args={[HEX_SIZE * 0.9, HEX_SIZE * 1.0, 6]} />
          <meshBasicMaterial
            color={selected ? '#F27405' : '#ffffff'}
            transparent
            opacity={selected ? 1 : 0.4}
          />
        </mesh>
      )}
      {building && (
        <>
          <BuildingModel
            nomeEdificio={building.nome}
            corFallback={cfg?.cor4 || '#888888'}
            posicaoBase={[0, 0.22, 0]}
          />
          <BuildingTag
            nome={building.nome}
            quantidade={building.quantidade}
            setor={building.setor}
            selected={selected}
            tagsVisiveis={tagsVisiveis}
          />
        </>
      )}
      {moveMode && !building && hovered && (
        <mesh position={[0, 0.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[HEX_SIZE * 0.45, HEX_SIZE * 0.58, 6]} />
          <meshBasicMaterial color="#F27405" transparent opacity={0.75} />
        </mesh>
      )}
      {moveMode && building && hovered && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.22, 0]}>
          <ringGeometry args={[HEX_SIZE * 0.5, HEX_SIZE * 0.65, 6]} />
          <meshBasicMaterial color="#ff2222" transparent opacity={0.75} />
        </mesh>
      )}
    </group>
  )
}

// ─────────────────────────────────────────────────────────────
//  HexTileMercado — com MOVE
// ─────────────────────────────────────────────────────────────
const HexTileMercado = ({ hex, selected, onSelect, onDoubleSelect, moveMode, tagsVisiveis }) => {
  const [hovered, setHover] = useState(false)
  const { x, z } = hexToWorld(hex, HEX_SIZE)
  const groupRef = useElevacaoSuave({ selected, hovered, baseY: 0 })

  return (
    <group
      ref={groupRef}
      position={[x, 0, z]}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true) }}
      onPointerOut={() => setHover(false)}
      onClick={(e) => { e.stopPropagation(); onSelect(hex) }}
      onDoubleClick={(e) => { e.stopPropagation(); onDoubleSelect() }}
    >
      <HexBase hovered={hovered} selected={selected} />
      {(selected || hovered) && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.21, 0]}>
          <ringGeometry args={[HEX_SIZE * 0.9, HEX_SIZE * 1.0, 6]} />
          <meshBasicMaterial
            color={selected ? '#F27405' : '#ffffff'}
            transparent
            opacity={selected ? 1 : 0.4}
          />
        </mesh>
      )}
      <BuildingModel
        nomeEdificio={null}
        corFallback={MERCADO_CONFIG.cor4}
        posicaoBase={[0, 0.22, 0]}
        _overrideModeloId={18}
      />
      <MercadoTag tagsVisiveis={tagsVisiveis} selected={selected} />

      {/* feedback ao mover */}
      {moveMode && hovered && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.22, 0]}>
          <ringGeometry args={[HEX_SIZE * 0.5, HEX_SIZE * 0.65, 6]} />
          <meshBasicMaterial color="#ff2222" transparent opacity={0.75} />
        </mesh>
      )}
    </group>
  )
}

// ─────────────────────────────────────────────────────────────
//  HexTileEcossistema — com MOVE
// ─────────────────────────────────────────────────────────────
const HexTileEcossistema = ({ hex, selected, onSelect, onDoubleSelect, moveMode, tagsVisiveis }) => {
  const [hovered, setHover] = useState(false)
  const { x, z } = hexToWorld(hex, HEX_SIZE)
  const groupRef = useElevacaoSuave({ selected, hovered, baseY: 0 })

  return (
    <group
      ref={groupRef}
      position={[x, 0, z]}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true) }}
      onPointerOut={() => setHover(false)}
      onClick={(e) => { e.stopPropagation(); onSelect(hex) }}
      onDoubleClick={(e) => { e.stopPropagation(); onDoubleSelect() }}
    >
      <HexBase hovered={hovered} selected={selected} />
      {(selected || hovered) && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.21, 0]}>
          <ringGeometry args={[HEX_SIZE * 0.9, HEX_SIZE * 1.0, 6]} />
          <meshBasicMaterial
            color={selected ? '#F27405' : '#ffffff'}
            transparent
            opacity={selected ? 1 : 0.4}
          />
        </mesh>
      )}
      <BuildingModel
        nomeEdificio={null}
        corFallback={ECOSSISTEMA_CONFIG.cor4}
        posicaoBase={[0, 0.22, 0]}
        _overrideModeloId={463}
      />
      <EcossistemaTag tagsVisiveis={tagsVisiveis} selected={selected} />

      {/* feedback ao mover */}
      {moveMode && hovered && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.22, 0]}>
          <ringGeometry args={[HEX_SIZE * 0.5, HEX_SIZE * 0.65, 6]} />
          <meshBasicMaterial color="#ff2222" transparent opacity={0.75} />
        </mesh>
      )}
    </group>
  )
}

// ─────────────────────────────────────────────────────────────
//  InfiniteBase
// ─────────────────────────────────────────────────────────────
const InfiniteBase = () => {
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColorBase:   { value: new THREE.Color('#00a6ff') },
    uColorDeep:   { value: new THREE.Color('#002244') },
  }), [])

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
      <circleGeometry args={[10, 64]} />
      <shaderMaterial
        transparent
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          varying vec3 vWorldPosition;
          void main() {
            vUv = uv;
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          varying vec3 vWorldPosition;
          uniform float uTime;
          uniform vec3 uColorBase;
          uniform vec3 uColorDeep;

          void main() {
            vec2 st = vUv * 30.0;
            float wave1 = sin(st.x + uTime * 0.5) * cos(st.y + uTime * 0.3) * 0.5 + 0.5;
            float wave2 = sin(st.y - uTime * 0.4) * cos(st.x - uTime * 0.2) * 0.5 + 0.5;
            float waveStrength = mix(wave1, wave2, 0.5);
            vec3 finalColor = mix(uColorDeep, uColorBase, waveStrength);
            float alpha = mix(0.1, 0.5, waveStrength);
            float dist = distance(vUv, vec2(0.5, 0.5)) * 2.0;
            float borderOpacity = smoothstep(0.95, 1.0, dist);
            alpha = mix(alpha, 1.0, borderOpacity);
            gl_FragColor = vec4(finalColor, alpha);
          }
        `}
      />
    </mesh>
  )
}

// ─────────────────────────────────────────────────────────────
//  WorldBackground
// ─────────────────────────────────────────────────────────────
const WorldBackground = ({ dayProgress }) => {
  const uniforms = useMemo(() => ({
    topColor:    { value: new THREE.Color('#4c2da0') },
    middleColor: { value: new THREE.Color('#dbb2ff') },
    bottomColor: { value: new THREE.Color('#a8e1ff') },
    uProgress:   { value: 0 },
  }), [])

  useEffect(() => {
    uniforms.uProgress.value = dayProgress
  }, [dayProgress, uniforms])

 return (
  <mesh scale={[10.1, 7, 10.1]} position={[0, 0.01, 0]}>
    <sphereGeometry args={[1, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
    <shaderMaterial
      side={THREE.BackSide}
      transparent
      uniforms={uniforms}
      vertexShader={`
        varying vec3 vWorldPosition;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `}
      fragmentShader={`
        varying vec2 vUv;
        uniform vec3 uColorSun;
        uniform vec3 uColorGlow;
        uniform vec3 uColorSky;
        uniform vec3 uColorNight;

        float ellipsoidGlow(vec2 uv, vec2 center, float radiusX, float radiusY, float soft) {
          vec2 offset = (uv - center);
          float dist = (offset.x * offset.x) / (radiusX * radiusX) + (offset.y * offset.y) / (radiusY * radiusY);
          return smoothstep(1.0 + soft, 1.0 - soft, dist);
        }

        void main() {
          float h = vUv.y;
          vec3 baseGradient;
          if(h < 0.15) {
              baseGradient = mix(uColorSun, uColorGlow, h / 0.15);
          } else if(h < 0.5) {
              baseGradient = mix(uColorGlow, uColorSky, (h - 0.15) / 0.35);
          } else {
              baseGradient = mix(uColorSky, uColorNight, (h - 0.5) / 0.5);
          }
          float t = vUv.x;
          float glowAmount = ellipsoidGlow(vec2(t, h), vec2(0.5, 0.01), 0.35, 0.1, 0.4); 
          vec3 centralGlowColor = vec3(1.0, 0.95, 0.7);
          vec3 finalColor = mix(baseGradient, centralGlowColor, glowAmount);
          float alpha = smoothstep(0.0, 0.1, h) * 0.95;
          gl_FragColor = vec4(finalColor, alpha);
        }
      `}
    />
  </mesh>
)
}

// ─────────────────────────────────────────────────────────────
//  AtmosphereDome
// ─────────────────────────────────────────────────────────────
const AtmosphereDome = ({ dayProgress }) => {
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColorSun:   { value: new THREE.Color('#ffcc00') },
    uColorGlow:  { value: new THREE.Color('#ff2200') },
    uColorSky:   { value: new THREE.Color('#7b4fc9') },
    uColorNight: { value: new THREE.Color('#1a083a') },
  }), [])

  return (
    <mesh scale={[10.1, 7, 10.1]} position={[0, 0.01, 0]}>
      <sphereGeometry args={[1, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <shaderMaterial
        side={THREE.BackSide}
        transparent
        uniforms={uniforms}
        vertexShader={`
          varying vec3 vWorldPosition;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec3 vWorldPosition;
          varying vec2 vUv;
          uniform vec3 uColorSun;
          uniform vec3 uColorGlow;
          uniform vec3 uColorSky;
          uniform vec3 uColorNight;

          float noise(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
          }

          void main() {
            float h = vUv.y;
            vec3 gradient;
            if(h < 0.15) {
                gradient = mix(uColorSun, uColorGlow, h / 0.15);
            } else if(h < 0.5) {
                gradient = mix(uColorGlow, uColorSky, (h - 0.15) / 0.35);
            } else {
                gradient = mix(uColorSky, uColorNight, (h - 0.5) / 0.5);
            }
            float clouds = sin(vUv.y * 50.0) * 0.05;
            gradient += clouds * (1.0 - h); 
            float alpha = smoothstep(0.0, 0.1, h) * 0.95;
            gl_FragColor = vec4(gradient, alpha);
          }
        `}
      />
    </mesh>
  )
}

// ─────────────────────────────────────────────────────────────
//  BaseRing
// ─────────────────────────────────────────────────────────────
const BaseRing = ({ dayProgress }) => {
  const matRef = useRef()

  const mat = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color('#F27405'),
    transparent: true,
    opacity: 0,
    depthWrite: false,
    side: THREE.DoubleSide,
  }), [])

  useEffect(() => {
    mat.opacity = dayProgress * 0.75
    mat.color.set(dayProgress > 0.5 ? '#ff2200' : '#ff6600')
    mat.needsUpdate = true
  }, [dayProgress, mat])

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
      <ringGeometry args={[8.2, 11.0, 128]} />
      <primitive object={mat} />
    </mesh>
  )
}

// ─────────────────────────────────────────────────────────────
//  DynamicLights
// ─────────────────────────────────────────────────────────────
const DynamicLights = ({ dayProgress }) => {
  const dirRef   = useRef()
  const ambRef   = useRef()
  const pointRef = useRef()
  const hemiRef  = useRef()

  const c = useMemo(() => ({
    dirDay:    new THREE.Color('#e2d8ff'),
    dirSun:    new THREE.Color('#ff3300'),
    ambDay:    new THREE.Color('#d8eeff'),
    ambSun:    new THREE.Color('#ff1100'),
    pointDay:  new THREE.Color('#f5a04a'),
    pointSun:  new THREE.Color('#ff0000'),
    hemiSky:   new THREE.Color('#87CEEB'),
    hemiSkySun:new THREE.Color('#ff4400'),
  }), [])

  useEffect(() => {
    const p = dayProgress

    if (dirRef.current) {
      dirRef.current.color.lerpColors(c.dirDay, c.dirSun, p)
      dirRef.current.intensity = 3.2 + p * 2.5
    }
    if (ambRef.current) {
      ambRef.current.color.lerpColors(c.ambDay, c.ambSun, p)
      ambRef.current.intensity = 0.8 - p * 0.5
    }
    if (pointRef.current) {
      pointRef.current.color.lerpColors(c.pointDay, c.pointSun, p)
      pointRef.current.intensity = 0.8 + p * 6.0
    }
    if (hemiRef.current) {
      hemiRef.current.color.lerpColors(c.hemiSky, c.hemiSkySun, p)
      hemiRef.current.intensity = 0.7 + p * 0.6
    }
  }, [dayProgress, c])

  return (
    <>
      <directionalLight
        position={[10, 10, 5]} 
        intensity={4.5 * (1 - dayProgress)} 
        color="#ffffff"
        castShadow
      />
      <ambientLight intensity={0.4 + (dayProgress * 0.2)} color="#ffffff" />
      <pointLight position={[-10, 5, 10]} intensity={2} color="#dbb2ff" />
      <hemisphereLight args={['#ffee00', '#ff5500', 0.8]} />
    </>
  )
}

// ─────────────────────────────────────────────────────────────
//  Toggle de Tags
// ─────────────────────────────────────────────────────────────
const TagsToggle = ({ ativo, onClick }) => (
  <button onClick={onClick} title={ativo ? 'Ocultar etiquetas' : 'Mostrar etiquetas'} style={{
    position: 'absolute', bottom: 120, left: '65% ', transform: 'translateX(-50%)', zIndex:10,
    display: 'flex', alignItems: 'center', gap: 7, padding: '6px 13px',
    borderRadius: 10,
    border: ativo ? '1px solid rgba(199,159,255,0.5)' : '1px solid rgba(255,255,255,0.15)',
    background: ativo ? 'linear-gradient(135deg, rgba(76,20,169,0.9), rgba(100,17,217,0.85))' : 'rgba(10,6,24,0.75)',
    boxShadow: ativo ? '0 0 14px rgba(100,17,217,0.45)' : 'none',
    cursor: 'pointer', transition: 'all 0.2s ease',
    fontFamily: "'Rajdhani','Segoe UI',sans-serif", fontSize: 11, fontWeight: 700,
    letterSpacing: '.07em', color: ativo ? '#fff' : 'rgba(255,255,255,0.45)',
  }}>
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
    {ativo ? 'Tags On' : 'Tags Off'}
  </button>
)

// ─────────────────────────────────────────────────────────────
//  MapStats
// ─────────────────────────────────────────────────────────────
const MapStats = ({ totalTiles, ocupados }) => (
  <div style={{
    position: 'absolute', top: 12, right: 12,
    background: 'rgba(10,6,24,0.75)', border: '1px solid rgba(100,17,217,0.28)',
    borderRadius: 10, padding: '6px 13px', fontFamily: "'Rajdhani',sans-serif",
    color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 600, letterSpacing: '.07em',
    display: 'flex', gap: 9, alignItems: 'center', zIndex: 10, pointerEvents: 'none',
  }}>
    <span style={{ color: '#C79FFF' }}>MAPA</span>
    <span style={{ width: 1, height: 11, background: 'rgba(255,255,255,0.15)' }} />
    <span><b style={{ color: '#fff' }}>{ocupados}</b> edifícios</span>
    <span style={{ width: 1, height: 11, background: 'rgba(255,255,255,0.15)' }} />
    <span><b style={{ color: '#fff' }}>{totalTiles - ocupados}</b> livres</span>
  </div>
)

// ─────────────────────────────────────────────────────────────
//  MoveBanner
// ─────────────────────────────────────────────────────────────
const MoveBanner = ({ onCancel }) => (
  <div style={{
    position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
    background: 'linear-gradient(135deg,rgba(242,116,5,0.94),rgba(175,78,0,0.94))',
    border: '1px solid #F27405', boxShadow: '0 0 16px rgba(242,116,5,0.38)',
    borderRadius: 10, padding: '7px 15px',
    display: 'flex', alignItems: 'center', gap: 11,
    fontFamily: "'Rajdhani',sans-serif", color: '#fff',
    fontSize: 12, fontWeight: 700, letterSpacing: '.07em', zIndex: 20,
  }}>
    <span>✦ Selecione o destino</span>
    <button onClick={onCancel} style={{
      background: 'rgba(0,0,0,0.28)', border: '1px solid rgba(255,255,255,0.28)',
      borderRadius: 6, padding: '3px 9px', cursor: 'pointer',
      color: '#fff', fontFamily: "'Rajdhani',sans-serif", fontSize: 11, fontWeight: 700,
    }}>Cancelar</button>
  </div>
)

// ─────────────────────────────────────────────────────────────
//  InfoPanel (edifícios padrão)
// ─────────────────────────────────────────────────────────────
const InfoPanel = ({ building, onMove, onClose, onOpenManager }) => {
  const cfg = SETOR_CONFIG[building.setor] || { cor1: '#111', cor3: '#555', cor4: '#888', label: '?' }
  const podeGerenciar = edificioTemGerenciamento(building.nome)

  return (
    <div style={{
      position: 'absolute', bottom: 110, left: '50%', transform: 'translateX(-50%)',
      background: 'linear-gradient(135deg,rgba(12,8,28,0.97),rgba(26,14,58,0.97))',
      border: `1px solid ${cfg.cor4}55`,
      boxShadow: `0 4px 28px rgba(0,0,0,0.65), 0 0 14px ${cfg.cor3}22`,
      borderRadius: 14, padding: '11px 17px',
      display: 'flex', alignItems: 'center', gap: 13, zIndex: 20,
      fontFamily: "'Rajdhani','Segoe UI',sans-serif", minWidth: 290,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 10, flexShrink: 0,
        background: `linear-gradient(135deg, ${cfg.cor3} 0%, ${cfg.cor1} 100%)`,
        border: `1px solid ${cfg.cor4}66`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      }}>
        <img
          src={getImageUrl(building.nome)} alt={building.nome}
          style={{ width: '70%', height: '70%', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
          onError={(e) => { e.target.style.display = 'none' }}
        />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: '#fff', fontWeight: 800, fontSize: 13, letterSpacing: '.05em' }}>
          {building.nome}
        </div>
        <div style={{ color: cfg.cor4, fontSize: 11, fontWeight: 600, marginTop: 2, opacity: .8 }}>
          {cfg.label} · {building.quantidade} unidade{building.quantidade !== 1 ? 's' : ''}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 7 }}>
        {podeGerenciar && (
          <button onClick={onOpenManager} style={{
            background: 'linear-gradient(135deg,#0C9123,#4CAF50)', border: 'none',
            borderRadius: 8, padding: '7px 13px', cursor: 'pointer', color: '#fff',
            fontFamily: "'Rajdhani',sans-serif", fontSize: 12, fontWeight: 700,
            letterSpacing: '.06em', boxShadow: '0 0 9px rgba(76,175,80,0.35)',
          }}>⚙ Gerenciar</button>
        )}

        <button onClick={onMove} style={{
          background: 'linear-gradient(135deg,#4C14A9,#6411D9)', border: 'none',
          borderRadius: 8, padding: '7px 13px', cursor: 'pointer', color: '#fff',
          fontFamily: "'Rajdhani',sans-serif", fontSize: 12, fontWeight: 700,
          letterSpacing: '.06em', boxShadow: '0 0 9px rgba(100,17,217,0.35)',
        }}>✦ Mover</button>
        <button onClick={onClose} style={{
          background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 8, padding: '7px 11px', cursor: 'pointer',
          color: 'rgba(255,255,255,0.55)', fontFamily: "'Rajdhani',sans-serif", fontSize: 12, fontWeight: 700,
        }}>✕</button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
//  MercadoInfoPanel — agora COM botão Mover
// ─────────────────────────────────────────────────────────────
const MercadoInfoPanel = ({ onClose, onOpenMarket, onMove }) => (
  <div style={{
    position: 'absolute', bottom: 110, left: '50%', transform: 'translateX(-50%)',
    background: 'linear-gradient(135deg,rgba(12,8,28,0.97),rgba(52,9,115,0.97))',
    border: `1px solid ${MERCADO_CONFIG.cor4}80`,
    boxShadow: `0 4px 28px rgba(0,0,0,0.7), 0 0 22px ${MERCADO_CONFIG.cor3}55`,
    borderRadius: 14, padding: '11px 17px',
    display: 'flex', alignItems: 'center', gap: 13, zIndex: 20,
    fontFamily: "'Rajdhani','Segoe UI',sans-serif", minWidth: 380,
  }}>
    <div style={{
      width: 44, height: 44, borderRadius: 10, flexShrink: 0,
      background: `linear-gradient(135deg, ${MERCADO_CONFIG.cor3} 0%, ${MERCADO_CONFIG.cor1} 100%)`,
      border: `1px solid ${MERCADO_CONFIG.cor4}88`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 22,
    }}>
      🏛
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ color: '#fff', fontWeight: 800, fontSize: 14, letterSpacing: '.06em' }}>
        Mercado Global
      </div>
      <div style={{ color: MERCADO_CONFIG.cor4, fontSize: 11, fontWeight: 600, marginTop: 2, opacity: .85 }}>
        Comércio entre empresas · Ofertas ativas
      </div>
    </div>
    <div style={{ display: 'flex', gap: 7 }}>
      <button onClick={onOpenMarket} style={{
        background: `linear-gradient(135deg, ${MERCADO_CONFIG.cor1}, ${MERCADO_CONFIG.cor3})`,
        border: 'none',
        borderRadius: 8, padding: '7px 14px', cursor: 'pointer', color: '#fff',
        fontFamily: "'Rajdhani',sans-serif", fontSize: 12, fontWeight: 800,
        letterSpacing: '.06em', boxShadow: `0 0 12px ${MERCADO_CONFIG.cor3}66`,
      }}>🛒 Abrir</button>

      <button onClick={onMove} style={{
        background: 'linear-gradient(135deg,#4C14A9,#6411D9)', border: 'none',
        borderRadius: 8, padding: '7px 13px', cursor: 'pointer', color: '#fff',
        fontFamily: "'Rajdhani',sans-serif", fontSize: 12, fontWeight: 700,
        letterSpacing: '.06em', boxShadow: '0 0 9px rgba(100,17,217,0.35)',
      }}>✦ Mover</button>

      <button onClick={onClose} style={{
        background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 8, padding: '7px 11px', cursor: 'pointer',
        color: 'rgba(255,255,255,0.55)', fontFamily: "'Rajdhani',sans-serif", fontSize: 12, fontWeight: 700,
      }}>✕</button>
    </div>
  </div>
)

// ─────────────────────────────────────────────────────────────
//  EcossistemaInfoPanel — agora COM botão Mover
// ─────────────────────────────────────────────────────────────
const EcossistemaInfoPanel = ({ onClose, onOpenEcosystem, onMove }) => (
  <div style={{
    position: 'absolute', bottom: 110, left: '50%', transform: 'translateX(-50%)',
    background: 'linear-gradient(135deg,rgba(12,8,28,0.97),rgba(0,40,16,0.97))',
    border: `1px solid ${ECOSSISTEMA_CONFIG.cor4}80`,
    boxShadow: `0 4px 28px rgba(0,0,0,0.7), 0 0 22px ${ECOSSISTEMA_CONFIG.cor3}55`,
    borderRadius: 14, padding: '11px 17px',
    display: 'flex', alignItems: 'center', gap: 13, zIndex: 20,
    fontFamily: "'Rajdhani','Segoe UI',sans-serif", minWidth: 380,
  }}>
    <div style={{
      width: 44, height: 44, borderRadius: 10, flexShrink: 0,
      background: `linear-gradient(135deg, ${ECOSSISTEMA_CONFIG.cor3} 0%, ${ECOSSISTEMA_CONFIG.cor1} 100%)`,
      border: `1px solid ${ECOSSISTEMA_CONFIG.cor4}88`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 22,
    }}>
      🌿
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ color: '#fff', fontWeight: 800, fontSize: 14, letterSpacing: '.06em' }}>
        Ecossistema
      </div>
      <div style={{ color: ECOSSISTEMA_CONFIG.cor4, fontSize: 11, fontWeight: 600, marginTop: 2, opacity: .85 }}>
        Cadeia produtiva · Fluxo de recursos
      </div>
    </div>
    <div style={{ display: 'flex', gap: 7 }}>
      <button onClick={onOpenEcosystem} style={{
        background: `linear-gradient(135deg, ${ECOSSISTEMA_CONFIG.cor1}, ${ECOSSISTEMA_CONFIG.cor3})`,
        border: 'none',
        borderRadius: 8, padding: '7px 14px', cursor: 'pointer', color: '#fff',
        fontFamily: "'Rajdhani',sans-serif", fontSize: 12, fontWeight: 800,
        letterSpacing: '.06em', boxShadow: `0 0 12px ${ECOSSISTEMA_CONFIG.cor3}66`,
      }}>🌿 Abrir</button>

      <button onClick={onMove} style={{
        background: 'linear-gradient(135deg,#4C14A9,#6411D9)', border: 'none',
        borderRadius: 8, padding: '7px 13px', cursor: 'pointer', color: '#fff',
        fontFamily: "'Rajdhani',sans-serif", fontSize: 12, fontWeight: 700,
        letterSpacing: '.06em', boxShadow: '0 0 9px rgba(100,17,217,0.35)',
      }}>✦ Mover</button>

      <button onClick={onClose} style={{
        background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 8, padding: '7px 11px', cursor: 'pointer',
        color: 'rgba(255,255,255,0.55)', fontFamily: "'Rajdhani',sans-serif", fontSize: 12, fontWeight: 700,
      }}>✕</button>
    </div>
  </div>
)

// ─────────────────────────────────────────────────────────────
//  SedeInfoPanel
// ─────────────────────────────────────────────────────────────
const SedeInfoPanel = ({ nomeEmpresa, porte, onClose, onOpenCarteira }) => (
  <div style={{
    position: 'absolute', bottom: 110, left: '50%', transform: 'translateX(-50%)',
    background: 'linear-gradient(135deg,rgba(12,8,28,0.97),rgba(52,9,115,0.97))',
    border: `1px solid ${SEDE_CONFIG.cor4}80`,
    boxShadow: `0 4px 28px rgba(0,0,0,0.7), 0 0 22px ${SEDE_CONFIG.cor3}55`,
    borderRadius: 14, padding: '11px 17px',
    display: 'flex', alignItems: 'center', gap: 13, zIndex: 20,
    fontFamily: "'Rajdhani','Segoe UI',sans-serif", minWidth: 340,
  }}>
    <div style={{
      width: 44, height: 44, borderRadius: 10, flexShrink: 0,
      background: `linear-gradient(135deg, ${SEDE_CONFIG.cor3} 0%, ${SEDE_CONFIG.cor1} 100%)`,
      border: `1px solid ${SEDE_CONFIG.cor4}88`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 22,
    }}>
      🏢
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ color: '#fff', fontWeight: 800, fontSize: 14, letterSpacing: '.06em' }}>
        {nomeEmpresa || 'Sua Empresa'}
      </div>
      <div style={{ color: SEDE_CONFIG.cor4, fontSize: 11, fontWeight: 600, marginTop: 2, opacity: .85 }}>
        ★ {porte} · Sede Central
      </div>
    </div>
    <div style={{ display: 'flex', gap: 7 }}>
      <button onClick={onOpenCarteira} style={{
        background: `linear-gradient(135deg, ${SEDE_CONFIG.cor1}, ${SEDE_CONFIG.cor3})`,
        border: 'none',
        borderRadius: 8, padding: '7px 14px', cursor: 'pointer', color: '#fff',
        fontFamily: "'Rajdhani',sans-serif", fontSize: 12, fontWeight: 800,
        letterSpacing: '.06em', boxShadow: `0 0 12px ${SEDE_CONFIG.cor3}66`,
      }}>💼 Abrir Carteira</button>
      <button onClick={onClose} style={{
        background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 8, padding: '7px 11px', cursor: 'pointer',
        color: 'rgba(255,255,255,0.55)', fontFamily: "'Rajdhani',sans-serif", fontSize: 12, fontWeight: 700,
      }}>✕</button>
    </div>
  </div>
)

// ─────────────────────────────────────────────────────────────
//  MAIN
// ─────────────────────────────────────────────────────────────
export default function MapWorld() {
  const { economiaSetores } = useContext(DadosEconomyGlobalContext)
  const edificiosDinamicos = useCentralStore((s) => s.edificiosFinais);

  const SETORES = ['agricultura', 'tecnologia', 'comercio', 'industria', 'imobiliario', 'energia']

  const nomeEmpresa = useCentralStore((s) => s.inicioGame.nomeEmpresa);
  const porte       = economiaSetores?.centralEdificios?.classificacaoPorteEmpresa || 'Micro Empresa'

  // ── Ações globais do store ──────────────────────────────────
  const setEdificioGerenciamento = useCentralStore((s) => s.setEdificioGerenciamento);
  const atualizarDados = useCentralStore((s) => s.atualizarDados);

  // ── Estado do ciclo de dia ──────────────────────────────────
  const [dayProgress, setDayProgress]       = useState(0)

  // ── Edifícios ativos ────────────────────────────────────────
  const snapshotKey = SETORES.map(s =>
    (edificiosDinamicos?.[s]?.edificios || [])
      .map((e, i) => `${i}:${e.quantidade}`)
      .join(',')
  ).join('|');

  const edificiosAtivos = useMemo(() => {
    const lista = [];

    SETORES.forEach(setor => {
      const listaDinamica = edificiosDinamicos?.[setor]?.edificios || [];
      const listaEstatica = EDIFICIOS_FINAIS_ESTATICOS?.[setor]?.edificios || [];

      listaDinamica.forEach((edDin, idx) => {
        const qtd = edDin.quantidade || 0;

        if (qtd > 0) {
          const edEst = listaEstatica[idx];
          if (!edEst) return;

          lista.push({
            id: `${setor}-${idx}`,
            nome: edEst.nome,
            setor,
            quantidade: qtd,
            ehCluster: edificioEhCluster(edEst.nome),
          });
        }
      });
    });

    return lista;
  }, [snapshotKey]);

  const hexGrid = useMemo(() => {
    const Tile = defineHex({ dimensions: HEX_SIZE, orientation: 'pointy' })
    return Array.from(new Grid(Tile, spiral({ center: [0, 0], radius: 9 })))
  }, [])

  // ── Posições fixas: agora ESTADO (para poder mover Mercado/Ecossistema) ──
  const [mercadoKey, setMercadoKey] = useState('1,-1')
  const [ecossistemaKey, setEcossistemaKey] = useState('-1,0')

  const [posicoes, setPosicoes]   = useState({})
  const [selectedKey, setSelectedKey] = useState(null)
  const [moveMode, setMoveMode]   = useState(false)
  // Qual entidade está sendo movida?
  //   { type: 'edificio' } | { type: 'mercado' } | { type: 'ecossistema' }
  const [movingEntity, setMovingEntity] = useState(null)

  const [tagsVisiveis, setTagsVisiveis] = useState(true)
  const [mercadoSelected, setMercadoSelected] = useState(false)
  const [ecossistemaSelected, setEcossistemaSelected] = useState(false)
  const [sedeSelected, setSedeSelected] = useState(false)

  // ── Expandindo (animação scale-in) ─────────────────────────
  const chavesAntigasRef = useRef(null)
  const [expandindo, setExpandindo] = useState(false)
  const [chavesAntigas, setChavesAntigas] = useState(null)

  // ── Auto-posicionamento ────────────────────────────────────
  useEffect(() => {
    setPosicoes(prev => {
      const idsAtivos = new Set(edificiosAtivos.map(e => e.id))
      const novo = {}

      Object.entries(prev).forEach(([key, id]) => {
        if (idsAtivos.has(id)) novo[key] = id
      })

      const posOcupadas = new Set(Object.keys(novo))
      posOcupadas.add('0,0')             // sede
      posOcupadas.add(mercadoKey)        // mercado (estado)
      posOcupadas.add(ecossistemaKey)    // ecossistema (estado)

      Object.entries(novo).forEach(([key, id]) => {
        const ed = edificiosAtivos.find(e => e.id === id)
        if (ed?.ehCluster) {
          const [q, r] = key.split(',').map(Number)
          vizinhosDeHex(q, r).forEach(vk => posOcupadas.add(vk))
        }
      })

      const gridKeys = new Set(hexGrid.map(h => `${h.q},${h.r}`))
      const todasKeys = hexGrid
        .map(h => `${h.q},${h.r}`)
        .sort((a, b) => {
          const [aq, ar] = a.split(',').map(Number)
          const [bq, br] = b.split(',').map(Number)
          return (aq * aq + ar * ar) - (bq * bq + br * br)
        })

      function proximoLivre(predicado = () => true) {
        return todasKeys.find(k => !posOcupadas.has(k) && predicado(k)) ?? null
      }

      const idsJaAlocados = new Set(Object.values(novo))
      const clusters = edificiosAtivos.filter(ed => ed.ehCluster  && !idsJaAlocados.has(ed.id))
      const simples  = edificiosAtivos.filter(ed => !ed.ehCluster && !idsJaAlocados.has(ed.id))

      ;[...clusters, ...simples].forEach(ed => {
        if (ed.ehCluster) {
          const central = proximoLivre(k => {
            const [cq, cr] = k.split(',').map(Number)
            return vizinhosDeHex(cq, cr).every(vk => !posOcupadas.has(vk) && gridKeys.has(vk))
          })
          if (central) {
            const [cq, cr] = central.split(',').map(Number)
            novo[central] = ed.id
            posOcupadas.add(central)
            vizinhosDeHex(cq, cr).forEach(vk => posOcupadas.add(vk))
          }
        } else {
          const pos = proximoLivre()
          if (pos) {
            novo[pos] = ed.id
            posOcupadas.add(pos)
          }
        }
      })

      const chavesNovasSet = new Set(Object.keys(novo))
      if (chavesAntigasRef.current) {
        let adicionou = false
        chavesNovasSet.forEach(k => {
          if (!chavesAntigasRef.current.has(k)) adicionou = true
        })
        if (adicionou) {
          setChavesAntigas(new Set(chavesAntigasRef.current))
          setExpandindo(true)
          setTimeout(() => {
            setExpandindo(false)
            setChavesAntigas(null)
          }, 800)
        }
      }
      chavesAntigasRef.current = chavesNovasSet

      return novo
    })
  }, [edificiosAtivos, hexGrid, mercadoKey, ecossistemaKey])

  // ── Satélites dos clusters ─────────────────────────────────
  const satelites = useMemo(() => {
    const mapa = {}
    Object.entries(posicoes).forEach(([key, id]) => {
      const ed = edificiosAtivos.find(e => e.id === id)
      if (!ed?.ehCluster) return

      const cfg      = SETOR_CONFIG[ed.setor]
      const cor      = cfg?.cor3 || '#5a9e44'
      const corFall  = cfg?.cor4 || '#888888'
      const modeloId = EDIFICIO_PARA_MODELO[ed.nome]
      const modeloDef = modeloId ? MODELOS[modeloId] : null
      const defSats  = modeloDef?.satelites || []

      const [q, r] = key.split(',').map(Number)
      vizinhosDeHex(q, r).forEach((vk, i) => {
        if (!posicoes[vk] && vk !== mercadoKey && vk !== ecossistemaKey) {
          mapa[vk] = {
            corTopo: cor,
            corFallback: corFall,
            modeloId: defSats[i]?.modeloId ?? null,
          }
        }
      })
    })
    return mapa
  }, [posicoes, edificiosAtivos, mercadoKey, ecossistemaKey])

  // ── Seleção e movimento ────────────────────────────────────
  const selectedBuilding = selectedKey
    ? edificiosAtivos.find(e => e.id === posicoes[selectedKey]) || null
    : null

  const handleSelect = (hex) => {
    const key = `${hex.q},${hex.r}`

    // Se estamos em modo mover, este clique escolhe o destino
    if (moveMode) {
      // Bloqueia destinos inválidos
      if (key === '0,0') return
      if (posicoes[key]) return
      if (satelites[key]) return
      if (key === mercadoKey || key === ecossistemaKey) return

      // Executa o movimento conforme o tipo
      if (movingEntity?.type === 'mercado') {
        setMercadoKey(key)
      } else if (movingEntity?.type === 'ecossistema') {
        setEcossistemaKey(key)
      } else if (movingEntity?.type === 'edificio' && selectedKey) {
        // valida cluster
        const edSendo = edificiosAtivos.find(e => e.id === posicoes[selectedKey])
        if (edSendo?.ehCluster) {
          const gridKeys = new Set(hexGrid.map(h => `${h.q},${h.r}`))
          const ocupadasSemEle = new Set()
          ocupadasSemEle.add('0,0')
          ocupadasSemEle.add(mercadoKey)
          ocupadasSemEle.add(ecossistemaKey)

          Object.entries(posicoes).forEach(([k, id]) => {
            if (k === selectedKey) return
            ocupadasSemEle.add(k)
            const ed = edificiosAtivos.find(e => e.id === id)
            if (ed?.ehCluster) {
              const [q, r] = k.split(',').map(Number)
              vizinhosDeHex(q, r).forEach(vk => ocupadasSemEle.add(vk))
            }
          })

          const [dq, dr] = key.split(',').map(Number)
          const destinoValido = vizinhosDeHex(dq, dr).every(
            vk => !ocupadasSemEle.has(vk) && gridKeys.has(vk)
          )
          if (!destinoValido) return
        }

        setPosicoes(prev => {
          const copy = { ...prev }
          copy[key] = copy[selectedKey]
          delete copy[selectedKey]
          return copy
        })
      }

      setMoveMode(false)
      setMovingEntity(null)
      setSelectedKey(null)
      setMercadoSelected(false)
      setEcossistemaSelected(false)
      return
    }

    // Se clicou no mercado
    if (key === mercadoKey) {
      setMercadoSelected(true)
      setEcossistemaSelected(false)
      setSedeSelected(false)
      setSelectedKey(null)
      return
    }

    // Se clicou no ecossistema
    if (key === ecossistemaKey) {
      setEcossistemaSelected(true)
      setMercadoSelected(false)
      setSedeSelected(false)
      setSelectedKey(null)
      return
    }

    setMercadoSelected(false)
    setEcossistemaSelected(false)
    setSedeSelected(false)

    setSelectedKey(posicoes[key] ? (key === selectedKey ? null : key) : null)
  }

  // ── Abrir gerenciamento ────────────────────────────────────
  const abrirGerenciamento = (building) => {
    if (!building) return;
    if (!edificioTemGerenciamento(building.nome)) return;

    const edificioId = buscarEdificioIdPorNomeESetor(building.nome, building.setor);

    if (!edificioId) {
      console.warn(
        `[MapWorld] Edifício "${building.nome}" (${building.setor}) não possui fórmula de gerenciamento.`
      );
      return;
    }

    setEdificioGerenciamento(edificioId);
    atualizarDados("vision", { visionAtual: "dashboard" });
  };

  // ── Iniciar movimento ──────────────────────────────────────
  const iniciarMoveEdificio = () => {
    if (!selectedKey) return;
    setMovingEntity({ type: 'edificio' });
    setMoveMode(true);
  };

  const iniciarMoveMercado = () => {
    setMovingEntity({ type: 'mercado' });
    setMercadoSelected(false);
    setEcossistemaSelected(false);
    setSelectedKey(null);
    setMoveMode(true);
  };

  const iniciarMoveEcossistema = () => {
    setMovingEntity({ type: 'ecossistema' });
    setMercadoSelected(false);
    setEcossistemaSelected(false);
    setSelectedKey(null);
    setMoveMode(true);
  };

  const cancelarMove = () => {
    setMoveMode(false);
    setMovingEntity(null);
  };

  // ── Aberturas (não relacionadas a move) ────────────────────
  const abrirMercadoGlobal = () => {
    useCentralStore.getState().setEdificioGerenciamento(null);
    useCentralStore.getState().setAbaSolicitada("mercado");
    atualizarDados("vision", { visionAtual: "dashboard" });
    setMercadoSelected(false);
    setEcossistemaSelected(false);
    setSedeSelected(false);
    setSelectedKey(null);
    setMoveMode(false);
    setMovingEntity(null);
  };

  const abrirEcossistema = () => {
    useCentralStore.getState().setEdificioGerenciamento(null);
    useCentralStore.getState().setAbaSolicitada("ecossistema");
    atualizarDados("vision", { visionAtual: "dashboard" });
    setEcossistemaSelected(false);
    setMercadoSelected(false);
    setSedeSelected(false);
    setSelectedKey(null);
    setMoveMode(false);
    setMovingEntity(null);
  };

  const abrirCarteira = () => {
    useCentralStore.getState().setEdificioGerenciamento(null);
    useCentralStore.getState().setAbaSolicitada("carteira");
    atualizarDados("vision", { visionAtual: "dashboard" });
    setSedeSelected(false);
    setMercadoSelected(false);
    setEcossistemaSelected(false);
    setSelectedKey(null);
    setMoveMode(false);
    setMovingEntity(null);
  };

  const handleDoubleSelect = (building) => {
    abrirGerenciamento(building);
    setSelectedKey(null);
    setMoveMode(false);
    setMovingEntity(null);
  };

  const ocupados = Object.keys(posicoes).length + 3

  // ── Render ─────────────────────────────────────────────────
  return (
    <div className='top-[90px]' style={{ width: '100%', height: '100%', position: 'relative', borderRadius: '20px', overflow: 'hidden' }}>
      <TagsToggle ativo={tagsVisiveis} onClick={() => setTagsVisiveis(v => !v)} />
      <MapStats totalTiles={hexGrid.length} ocupados={ocupados} />

      {moveMode && <MoveBanner onCancel={cancelarMove} />}

      {selectedKey && !moveMode && selectedBuilding && (
        <InfoPanel
          building={selectedBuilding}
          onMove={iniciarMoveEdificio}
          onOpenManager={() => {
            abrirGerenciamento(selectedBuilding);
            setSelectedKey(null);
            setMoveMode(false);
            setMovingEntity(null);
          }}
          onClose={() => { setSelectedKey(null); setMoveMode(false) }}
        />
      )}

      {mercadoSelected && !moveMode && (
        <MercadoInfoPanel
          onOpenMarket={abrirMercadoGlobal}
          onMove={iniciarMoveMercado}
          onClose={() => setMercadoSelected(false)}
        />
      )}

      {ecossistemaSelected && !moveMode && (
        <EcossistemaInfoPanel
          onOpenEcosystem={abrirEcossistema}
          onMove={iniciarMoveEcossistema}
          onClose={() => setEcossistemaSelected(false)}
        />
      )}

      {sedeSelected && !moveMode && (
        <SedeInfoPanel
          nomeEmpresa={nomeEmpresa}
          porte={porte}
          onOpenCarteira={abrirCarteira}
          onClose={() => setSedeSelected(false)}
        />
      )}

      <Canvas
        frameloop={moveMode || expandindo ? "always" : "demand"}
        shadows
        camera={{ position: [18, 18, 18], fov: 20 }}
      >
        <WorldBackground dayProgress={dayProgress} />
        <AtmosphereDome dayProgress={dayProgress} />
        <BaseRing dayProgress={dayProgress} />
        <DynamicLights dayProgress={dayProgress} />

        <group>
          <InfiniteBase />

          <TileSede
            nomeEmpresa={nomeEmpresa}
            porte={porte}
            tagsVisiveis={tagsVisiveis}
            selected={sedeSelected}
            onSelect={() => {
              if (moveMode) return;
              setSedeSelected(true);
              setMercadoSelected(false);
              setEcossistemaSelected(false);
              setSelectedKey(null);
            }}
            onDoubleSelect={abrirCarteira}
          />

          {Object.entries(satelites).map(([key, { corTopo, modeloId, corFallback }]) => {
            const hex = hexGrid.find(h => `${h.q},${h.r}` === key)
            if (!hex) return null
            return (
              <HexTileClusterSatelite
                key={`sat-${key}`}
                hex={hex}
                corTopo={corTopo}
                modeloId={modeloId}
                corFallback={corFallback}
              />
            )
          })}

          {hexGrid.map(hex => {
            const key = `${hex.q},${hex.r}`
            if (key === '0,0') return null

            // ── Mercado (posição dinâmica) ──
            if (key === mercadoKey) {
              return (
                <HexTileMercado
                  key={`mercado-${key}`}
                  hex={hex}
                  selected={mercadoSelected}
                  onSelect={handleSelect}
                  onDoubleSelect={abrirMercadoGlobal}
                  moveMode={moveMode}
                  tagsVisiveis={tagsVisiveis}
                />
              )
            }

            // ── Ecossistema (posição dinâmica) ──
            if (key === ecossistemaKey) {
              return (
                <HexTileEcossistema
                  key={`eco-${key}`}
                  hex={hex}
                  selected={ecossistemaSelected}
                  onSelect={handleSelect}
                  onDoubleSelect={abrirEcossistema}
                  moveMode={moveMode}
                  tagsVisiveis={tagsVisiveis}
                />
              )
            }

            if (satelites[key]) return null

            const edId    = posicoes[key]
            const building = edId ? edificiosAtivos.find(e => e.id === edId) || null : null
            const ehNovo = expandindo && chavesAntigas && !chavesAntigas.has(key)

            return (
              <AnimatedHex key={key} expandindo={expandindo} ehNovo={ehNovo}>
                <HexTile
                  hex={hex}
                  building={building}
                  onSelect={handleSelect}
                  onDoubleSelect={handleDoubleSelect}
                  moveMode={moveMode}
                  selected={key === selectedKey}
                  tagsVisiveis={tagsVisiveis}
                />
              </AnimatedHex>
            )
          })}
        </group>

        <ContactShadows
          position={[0, 0.02, 0]} opacity={0.4} scale={35} blur={2.2} color="#1a3a10"
        />

        <OrbitControls
          enablePan enableZoom enableRotate
          minDistance={5}
          maxDistance={50}
          maxPolarAngle={Math.PI / 2.1} 
          minPolarAngle={Math.PI / 6}
          enableDamping dampingFactor={0.07}
        />
      </Canvas>
    </div>
  )
}