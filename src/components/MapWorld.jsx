// ============================================================
//  MapWorld.jsx
// ============================================================

import React, { useState, useMemo, useContext, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, OrbitControls, Html, GradientTexture } from '@react-three/drei'
import { defineHex, Grid, spiral } from 'honeycomb-grid'
import * as THREE from 'three'
import { CentraldeDadosContext } from '../centralDeDadosContext'
import { DadosEconomyGlobalContext } from '../dadosEconomyGlobal'
import { BuildingModel } from './BuildingModel'
import { resolverModeloSede } from './buildingModels'

const HEX_SIZE = 0.6

const hexToWorld = (hex, size) => ({
  x: size * 1.73 * (hex.q + hex.r / 2),
  z: size * 1.5 * hex.r,
})

// ─────────────────────────────────────────────────────────────
//  Paleta de setores — cores do seu Dashboard
// ─────────────────────────────────────────────────────────────
const SETOR_CONFIG = {
  agricultura:  { label: 'Agricultura', cor1: '#003816', cor3: '#0C9123', cor4: '#4CAF50' },
  tecnologia:   { label: 'Tecnologia',  cor1: '#A64B00', cor3: '#FF6F00', cor4: '#FF8C42' },
  industria:    { label: 'Indústria',   cor1: '#1A1A1A', cor3: '#808080', cor4: '#B3B3B3' },
  comercio:     { label: 'Comércio',    cor1: '#660000', cor3: '#E60000', cor4: '#FF4D4D' },
  imobiliario:  { label: 'Imobiliário', cor1: '#000066', cor3: '#3333CC', cor4: '#6666FF' },
  energia:      { label: 'Energia',     cor1: '#665200', cor3: '#E6B800', cor4: '#FFD966' },
}

// ─────────────────────────────────────────────────────────────
//  Ícone do edifício — mesma função usada no resto do jogo
// ─────────────────────────────────────────────────────────────
const getImageUrl = (nome) => `/imagens/${nome}.png`

// ─────────────────────────────────────────────────────────────
//  SedeTag — etiqueta especial acima do prédio central
//  Mostra nome da empresa + classificação do porte
// ─────────────────────────────────────────────────────────────
const SedeTag = ({ nomeEmpresa, porte, tagsVisiveis }) => {
  if (!tagsVisiveis) return null

  return (
    <Html
      position={[0, 1.5, 0]}
      center
      distanceFactor={8}
      style={{ pointerEvents: 'none' }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
      }}>
        {/* Nome da empresa — destaque maior */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(76,20,169,0.95) 0%, rgba(30,8,80,0.95) 100%)',
          border: '1.5px solid rgba(199,159,255,0.6)',
          boxShadow: '0 0 18px rgba(100,17,217,0.55), 0 2px 8px rgba(0,0,0,0.6)',
          borderRadius: '10px',
          padding: '5px 12px',
          fontFamily: "'Rajdhani','Segoe UI',sans-serif",
          fontWeight: 800,
          fontSize: '13px',
          letterSpacing: '0.08em',
          color: '#fff',
          whiteSpace: 'nowrap',
          textShadow: '0 1px 4px rgba(0,0,0,0.6)',
          textTransform: 'uppercase',
        }}>
          {nomeEmpresa || 'Sua Empresa'}
        </div>

        {/* Badge de porte */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(242,116,5,0.92) 0%, rgba(130,55,0,0.92) 100%)',
          border: '1px solid rgba(255,176,96,0.5)',
          boxShadow: '0 0 10px rgba(242,116,5,0.35)',
          borderRadius: '6px',
          padding: '2px 10px',
          fontFamily: "'Rajdhani','Segoe UI',sans-serif",
          fontWeight: 700,
          fontSize: '10px',
          letterSpacing: '0.1em',
          color: '#fff',
          whiteSpace: 'nowrap',
          textTransform: 'uppercase',
        }}>
          ★ {porte}
        </div>
      </div>

      {/* Haste mais longa para a sede */}
      <div style={{
        width: 2,
        height: 14,
        margin: '2px auto 0',
        background: 'linear-gradient(to bottom, rgba(199,159,255,0.8), transparent)',
        borderRadius: 1,
      }} />
    </Html>
  )
}

// ─────────────────────────────────────────────────────────────
//  HexBaseSede — tile central levemente diferenciado
//  (mais elevado e com borda dourada para se destacar)
// ─────────────────────────────────────────────────────────────
const HexBaseSede = () => {
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
      {/* Corpo — levemente mais alto que os normais */}
      {/* Corpo extrudado — igual ao HexBase normal */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <extrudeGeometry args={[shape, {
          depth: 0.2, bevelEnabled: true,
          bevelThickness: 0.02, bevelSize: 0.015, bevelSegments: 2,
        }]} />
        <meshStandardMaterial color="#4a7230" roughness={0.9} metalness={0} />
      </mesh>

      {/* Topo grama */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.2, 0]} receiveShadow>
        <shapeGeometry args={[shape]} />
        <meshStandardMaterial color="#5a9e44" roughness={0.8} metalness={0} />
      </mesh>
    </group>
  )
}

// ─────────────────────────────────────────────────────────────
//  TileSede — tile central fixo em q=0, r=0
//  Usa o mesmo BuildingModel dos outros tiles, com o nome
//  de edifício mapeado por porte em EDIFICIO_SEDE_POR_PORTE
// ─────────────────────────────────────────────────────────────

// Mapeamento porte → nome de edifício cadastrado em EDIFICIO_PARA_MODELO


const TileSede = ({ nomeEmpresa, porte, tagsVisiveis }) => {
  const config = useMemo(() => resolverModeloSede(porte), [porte])

  return (
    <group position={[0, 0, 0]}>
      <HexBaseSede />
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
      />
    </group>
  )
}

// ─────────────────────────────────────────────────────────────
//  HexBase — grama + terra
// ─────────────────────────────────────────────────────────────
const HexBase = ({ isVazio, hovered, selected }) => {
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

  const topColor = selected ? '#b4e06e' : hovered ? '#78c052' : '#5a9e44'

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <extrudeGeometry args={[shape, {
          depth: 0.2, bevelEnabled: true,
          bevelThickness: 0.02, bevelSize: 0.015, bevelSegments: 2,
        }]} />
        <meshStandardMaterial color="#4a7230" roughness={0.9} metalness={0} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.2, 0]} receiveShadow>
        <shapeGeometry args={[shape]} />
        <meshStandardMaterial color={topColor} roughness={0.8} metalness={0} />
      </mesh>
      {(selected || hovered) && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.21, 0]}>
          <ringGeometry args={[HEX_SIZE * 0.87, HEX_SIZE * 0.99, 6]} />
          <meshBasicMaterial
            color={selected ? '#F27405' : '#d4f08a'}
            transparent opacity={selected ? 0.95 : 0.5}
          />
        </mesh>
      )}
    </group>
  )
}

// ─────────────────────────────────────────────────────────────
//  BuildingTag — com ícone real + gradiente por setor
// ─────────────────────────────────────────────────────────────
const BuildingTag = ({ nome, quantidade, setor, selected, tagsVisiveis }) => {
  if (!tagsVisiveis) return null

  const cfg = SETOR_CONFIG[setor] || { cor1: '#111', cor3: '#555', cor4: '#888', label: '?' }

  // Gradiente de fundo: quando selecionado usa laranja, senão usa cor do setor
  const bgGradient = selected
    ? 'linear-gradient(135deg, #F27405 0%, #8B3D00 100%)'
    : `linear-gradient(135deg, ${cfg.cor3} 0%, ${cfg.cor1} 100%)`

  const borderColor = selected ? '#ffb060' : cfg.cor4 + 'cc'
  const shadowColor = selected ? 'rgba(242,116,5,0.5)' : cfg.cor4 + '44'

  return (
    <Html
      position={[0, 1.05, 0]}
      center
      distanceFactor={8}
      style={{ pointerEvents: 'none' }}
    >
      <div style={{
        background: bgGradient,
        border: `1.5px solid ${borderColor}`,
        boxShadow: `0 2px 12px ${shadowColor}, 0 0 0 1px rgba(0,0,0,0.2)`,
        borderRadius: '9px',
        padding: '4px 8px 4px 4px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        whiteSpace: 'nowrap',
        backdropFilter: 'blur(6px)',
        minWidth: 0,
      }}>

        {/* Ícone do edifício com bg gradiente do setor */}
        <div style={{
          width: 28,
          height: 28,
          borderRadius: '6px',
          background: selected
            ? 'rgba(255,255,255,0.2)'
            : `linear-gradient(135deg, ${cfg.cor4} 0%, ${cfg.cor3} 100%)`,
          border: `1px solid ${selected ? 'rgba(255,255,255,0.4)' : cfg.cor4 + '88'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          overflow: 'hidden',
        }}>
          <img
            src={getImageUrl(nome)}
            alt={nome}
            style={{
              width: '70%',
              height: '70%',
              objectFit: 'contain',
              // fallback: se imagem não carregar, não quebra o layout
              filter: 'brightness(0) invert(1)',
            }}
            onError={(e) => {
              // Se a imagem não existir, esconde ela graciosamente
              e.target.style.display = 'none'
            }}
          />
        </div>

        {/* Nome */}
        <span style={{
          fontFamily: "'Rajdhani','Segoe UI',sans-serif",
          fontWeight: 700,
          fontSize: '11px',
          letterSpacing: '0.04em',
          color: '#fff',
          maxWidth: '90px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          textShadow: '0 1px 3px rgba(0,0,0,0.5)',
        }}>
          {nome.length > 16 ? nome.slice(0, 14) + '…' : nome}
        </span>

        {/* Badge quantidade */}
        <span style={{
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: '5px',
          padding: '1px 5px',
          fontSize: '10px',
          fontFamily: "'Rajdhani',sans-serif",
          fontWeight: 800,
          color: '#fff',
          flexShrink: 0,
          textShadow: '0 1px 2px rgba(0,0,0,0.4)',
        }}>
          ×{quantidade}
        </span>
      </div>

      {/* Haste */}
      <div style={{
        width: 1,
        height: 10,
        margin: '0 auto',
        background: `linear-gradient(to bottom, ${cfg.cor4}cc, transparent)`,
      }} />
    </Html>
  )
}

// ─────────────────────────────────────────────────────────────
//  HexTile
// ─────────────────────────────────────────────────────────────
const HexTile = ({ hex, building, onSelect, moveMode, selected, tagsVisiveis }) => {
  const [hovered, setHover] = useState(false)
  const { x, z } = hexToWorld(hex, HEX_SIZE)
  const cfg = building ? SETOR_CONFIG[building.setor] : null

  return (
    <group
      position={[x, 0, z]}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true) }}
      onPointerOut={() => setHover(false)}
      onClick={(e) => {
        e.stopPropagation()
        if (building || moveMode) onSelect(hex)
      }}
    >
      <HexBase isVazio={!building} hovered={hovered} selected={selected} />

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
    </group>
  )
}

// ─────────────────────────────────────────────────────────────
//  Fundo céu
// ─────────────────────────────────────────────────────────────
const WorldBackground = () => (
  <mesh scale={200}>
    <sphereGeometry args={[1, 48, 48]} />
    <meshBasicMaterial side={THREE.BackSide}>
      <GradientTexture
        stops={[0, 0.4, 0.6, 0.8, 1]}
        colors={['#5ba8d8', '#9dd0ee', '#f6cb85', '#72c47e', '#3d7a3a']}
        size={1024}
      />
    </meshBasicMaterial>
  </mesh>
)

// ─────────────────────────────────────────────────────────────
//  Toggle de Tags — botão flutuante
// ─────────────────────────────────────────────────────────────
const TagsToggle = ({ ativo, onClick }) => (
  <button
    onClick={onClick}
    title={ativo ? 'Ocultar etiquetas' : 'Mostrar etiquetas'}
    style={{
      position: 'absolute',
      top: 12,
      left: 12,
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      padding: '6px 13px',
      borderRadius: 10,
      border: ativo
        ? '1px solid rgba(199,159,255,0.5)'
        : '1px solid rgba(255,255,255,0.15)',
      background: ativo
        ? 'linear-gradient(135deg, rgba(76,20,169,0.9), rgba(100,17,217,0.85))'
        : 'rgba(10,6,24,0.75)',
      boxShadow: ativo
        ? '0 0 14px rgba(100,17,217,0.45)'
        : 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontFamily: "'Rajdhani','Segoe UI',sans-serif",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '.07em',
      color: ativo ? '#fff' : 'rgba(255,255,255,0.45)',
    }}
  >
    {/* Ícone de etiqueta */}
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
      <line x1="7" y1="7" x2="7.01" y2="7"/>
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
    background: 'rgba(10,6,24,0.75)',
    border: '1px solid rgba(100,17,217,0.28)',
    borderRadius: 10, padding: '6px 13px',
    fontFamily: "'Rajdhani',sans-serif",
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11, fontWeight: 600, letterSpacing: '.07em',
    display: 'flex', gap: 9, alignItems: 'center',
    zIndex: 10, pointerEvents: 'none',
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
//  InfoPanel
// ─────────────────────────────────────────────────────────────
const InfoPanel = ({ building, onMove, onClose }) => {
  const cfg = SETOR_CONFIG[building.setor] || { cor1: '#111', cor3: '#555', cor4: '#888', label: '?' }

  return (
    <div style={{
      position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)',
      background: 'linear-gradient(135deg,rgba(12,8,28,0.97),rgba(26,14,58,0.97))',
      border: `1px solid ${cfg.cor4}55`,
      boxShadow: `0 4px 28px rgba(0,0,0,0.65), 0 0 14px ${cfg.cor3}22`,
      borderRadius: 14, padding: '11px 17px',
      display: 'flex', alignItems: 'center', gap: 13, zIndex: 20,
      fontFamily: "'Rajdhani','Segoe UI',sans-serif", minWidth: 290,
    }}>
      {/* Ícone com gradiente do setor */}
      <div style={{
        width: 44, height: 44, borderRadius: 10, flexShrink: 0,
        background: `linear-gradient(135deg, ${cfg.cor3} 0%, ${cfg.cor1} 100%)`,
        border: `1px solid ${cfg.cor4}66`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <img
          src={getImageUrl(building.nome)}
          alt={building.nome}
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
//  MAIN
// ─────────────────────────────────────────────────────────────
export default function MapWorld() {
  const { dados }           = useContext(CentraldeDadosContext)
  const { economiaSetores } = useContext(DadosEconomyGlobalContext)

  const SETORES = ['agricultura', 'tecnologia', 'comercio', 'industria', 'imobiliario', 'energia']

  const nomeEmpresa = dados?.inicioGame?.nomeEmpresa || ''
  const porte       = economiaSetores?.centralEdificios?.classificacaoPorteEmpresa || 'Micro Empresa'

  const snapshotKey = SETORES.map(s =>
    (dados[s]?.edificios || []).map(e => `${e.nome}:${e.quantidade}`).join(',')
  ).join('|')

  const edificiosAtivos = useMemo(() => {
    const lista = []
    SETORES.forEach(setor => {
      ;(dados[setor]?.edificios || []).forEach(ed => {
        if (ed.quantidade > 0) lista.push({
          id: `${setor}-${ed.nome}`,
          nome: ed.nome, setor,
          quantidade: ed.quantidade,
        })
      })
    })
    return lista
  }, [snapshotKey])

  const hexGrid = useMemo(() => {
    const Tile = defineHex({ dimensions: HEX_SIZE, orientation: 'pointy' })
    return Array.from(new Grid(Tile, spiral({ center: [0, 0], radius: 8 })))
  }, [])

  const [posicoes,    setPosicoes]    = useState({})
  const [selectedKey, setSelectedKey] = useState(null)
  const [moveMode,    setMoveMode]    = useState(false)
  const [tagsVisiveis, setTagsVisiveis] = useState(true)   // ← toggle tags

  useEffect(() => {
    setPosicoes(prev => {
      const idsAtivos = new Set(edificiosAtivos.map(e => e.id))
      const novo = {}

      Object.entries(prev).forEach(([key, id]) => {
        if (idsAtivos.has(id)) novo[key] = id
      })

      const posOcupadas = new Set(Object.keys(novo))
      // Posição 0,0 é sempre reservada para a sede — nunca spawna edifício aqui
      posOcupadas.add('0,0')
      const posLivres   = hexGrid
        .map(h => `${h.q},${h.r}`)
        .filter(k => !posOcupadas.has(k))
        .sort((a, b) => {
          const [aq, ar] = a.split(',').map(Number)
          const [bq, br] = b.split(',').map(Number)
          return (aq * aq + ar * ar) - (bq * bq + br * br)
        })

      let idx = 0
      edificiosAtivos.forEach(ed => {
        if (!Object.values(novo).includes(ed.id) && idx < posLivres.length) {
          novo[posLivres[idx++]] = ed.id
        }
      })

      return novo
    })
  }, [edificiosAtivos, hexGrid])

  const selectedBuilding = selectedKey
    ? edificiosAtivos.find(e => e.id === posicoes[selectedKey]) || null
    : null

  const handleSelect = (hex) => {
    const key = `${hex.q},${hex.r}`
    if (moveMode) {
      if (!posicoes[key] && selectedKey) {
        setPosicoes(prev => {
          const copy = { ...prev }
          copy[key] = copy[selectedKey]
          delete copy[selectedKey]
          return copy
        })
        setMoveMode(false)
        setSelectedKey(null)
      }
      return
    }
    setSelectedKey(posicoes[key] ? (key === selectedKey ? null : key) : null)
  }

  const ocupados = Object.keys(posicoes).length

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      borderRadius: '20px', overflow: 'hidden', background: '#87CEEB',
    }}>

      {/* Botão toggle tags */}
      <TagsToggle
        ativo={tagsVisiveis}
        onClick={() => setTagsVisiveis(v => !v)}
      />

      <MapStats totalTiles={hexGrid.length} ocupados={ocupados} />

      {moveMode && (
        <MoveBanner onCancel={() => { setMoveMode(false); setSelectedKey(null) }} />
      )}

      {selectedKey && !moveMode && selectedBuilding && (
        <InfoPanel
          building={selectedBuilding}
          onMove={() => setMoveMode(true)}
          onClose={() => { setSelectedKey(null); setMoveMode(false) }}
        />
      )}

      <Canvas shadows camera={{ position: [18, 18, 18], fov: 20 }} gl={{ antialias: true }}>
        <WorldBackground />

        <directionalLight
          position={[15, 22, 12]} intensity={2.4} color="#fff5d8"
          castShadow shadow-mapSize={[2048, 2048]}
          shadow-camera-far={70}
          shadow-camera-left={-22} shadow-camera-right={22}
          shadow-camera-top={22}  shadow-camera-bottom={-22}
        />
        <ambientLight intensity={1.1} color="#d8eeff" />
        <pointLight position={[-18, 3, -18]} intensity={0.8} color="#f5a04a" />
        <hemisphereLight args={['#87CEEB', '#5a9e44', 0.7]} />

        <group>
          {/* ── SEDE — tile central fixo ── */}
          <TileSede
            nomeEmpresa={nomeEmpresa}
            porte={porte}
            tagsVisiveis={tagsVisiveis}
          />

          {/* ── TILES DA CARTEIRA ── */}
          {hexGrid.map(hex => {
            const key      = `${hex.q},${hex.r}`
            const edId     = posicoes[key]
            const building = edId ? edificiosAtivos.find(e => e.id === edId) || null : null
            return (
              <HexTile
                key={key}
                hex={hex}
                building={building}
                onSelect={handleSelect}
                moveMode={moveMode}
                selected={key === selectedKey}
                tagsVisiveis={tagsVisiveis}
              />
            )
          })}
        </group>

        <ContactShadows
          position={[0, 0.02, 0]} opacity={0.4} scale={35} blur={2.2} color="#1a3a10"
        />

        <OrbitControls
          enablePan enableZoom enableRotate
          minDistance={6} maxDistance={50}
          minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 3}
          enableDamping dampingFactor={0.07}
        />
      </Canvas>
    </div>
  )
}