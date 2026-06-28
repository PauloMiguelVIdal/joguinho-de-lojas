// ============================================================
//  MapWorld.jsx - Versão Adaptada (com suporte a compostos)
//  Raio: 6
// ============================================================

import React, { useState, useMemo, useContext, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, OrbitControls, Html } from '@react-three/drei'
import { defineHex, Grid, spiral } from 'honeycomb-grid'
import * as THREE from 'three'
import { CentraldeDadosContext } from '../centralDeDadosContext'
import { DadosEconomyGlobalContext } from '../dadosEconomyGlobal'
import { BuildingModel } from './BuildingModel'
import { resolverModeloSede, MODELOS, EDIFICIO_PARA_MODELO } from './buildingModels'
import { useFrame } from '@react-three/fiber'

const HEX_SIZE = 0.6

const hexToWorld = (hex, size) => ({
  x: size * 1.73 * (hex.q + hex.r / 2),
  z: size * 1.5 * hex.r,
})

// ─────────────────────────────────────────────────────────────
//  FUNÇÕES DE VERIFICAÇÃO
// ─────────────────────────────────────────────────────────────
function edificioEhComposto(nomeEdificio) {
  const modeloId = EDIFICIO_PARA_MODELO[nomeEdificio]
  if (!modeloId) return false
  return MODELOS[modeloId]?.tipo === 'composto'
}

function edificioEhCluster(nomeEdificio) {
  const modeloId = EDIFICIO_PARA_MODELO[nomeEdificio]
  if (!modeloId) return false
  return MODELOS[modeloId]?.tamanho === 7
}

// ─────────────────────────────────────────────────────────────
//  Configurações e Constantes
// ─────────────────────────────────────────────────────────────
const SETOR_CONFIG = {
  agricultura:  { label: 'Agricultura', cor1: '#003816', cor3: '#0C9123', cor4: '#4CAF50' },
  tecnologia:   { label: 'Tecnologia',  cor1: '#A64B00', cor3: '#FF6F00', cor4: '#FF8C42' },
  industria:    { label: 'Indústria',   cor1: '#1A1A1A', cor3: '#808080', cor4: '#B3B3B3' },
  comercio:     { label: 'Comércio',    cor1: '#660000', cor3: '#E60000', cor4: '#FF4D4D' },
  imobiliario:  { label: 'Imobiliário', cor1: '#000066', cor3: '#3333CC', cor4: '#6666FF' },
  energia:      { label: 'Energia',     cor1: '#665200', cor3: '#E6B800', cor4: '#FFD966' },
}

const SETORES = ['agricultura', 'tecnologia', 'comercio', 'industria', 'imobiliario', 'energia']

const HEX_DIRECTIONS = [[1,0],[1,-1],[0,-1],[-1,0],[-1,1],[0,1]]
const vizinhosDeHex = (q, r) => HEX_DIRECTIONS.map(([dq, dr]) => `${q + dq},${r + dr}`)

// ─────────────────────────────────────────────────────────────
//  CAMADA 1: CÉU E ATMOSFERA
// ─────────────────────────────────────────────────────────────
const SkyDome = ({ dayProgress }) => {
  const uniforms = useMemo(() => ({
    topColor:    { value: new THREE.Color('#4c2da0') },
    middleColor: { value: new THREE.Color('#dbb2ff') },
    bottomColor: { value: new THREE.Color('#a8e1ff') },
    uProgress:   { value: 0 },
  }), [])

  useEffect(() => { uniforms.uProgress.value = dayProgress }, [dayProgress, uniforms])

  return (
    <mesh scale={[8, 6, 8]} position={[0, 0.01, 0]}>
      <sphereGeometry args={[1, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <shaderMaterial
        side={THREE.BackSide}
        transparent
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform vec3 topColor;
          uniform vec3 middleColor;
          uniform vec3 bottomColor;
          uniform float uProgress;

          void main() {
            float h = vUv.y;
            vec3 gradient = mix(bottomColor, middleColor, smoothstep(0.0, 0.5, h));
            gradient = mix(gradient, topColor, smoothstep(0.3, 1.0, h));
            
            float sunset = uProgress * 0.6;
            vec3 sunsetColor = vec3(1.0, 0.4, 0.1);
            gradient = mix(gradient, sunsetColor, sunset * (1.0 - h));
            
            float alpha = smoothstep(0.0, 0.1, h) * 0.95;
            gl_FragColor = vec4(gradient, alpha);
          }
        `}
      />
    </mesh>
  )
}

// ─────────────────────────────────────────────────────────────
//  CAMADA 2: MAR / OCEANO
// ─────────────────────────────────────────────────────────────
const Ocean = () => {
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColorBase:   { value: new THREE.Color('#0066cc') },
    uColorDeep:   { value: new THREE.Color('#001a33') },
  }), [])

  useFrame((state) => { uniforms.uTime.value = state.clock.elapsedTime })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
      <circleGeometry args={[8, 64]} />
      <shaderMaterial
        transparent
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;
          uniform vec3 uColorBase;
          uniform vec3 uColorDeep;

          void main() {
            vec2 st = vUv * 30.0;
            float wave1 = sin(st.x + uTime * 0.5) * cos(st.y + uTime * 0.3) * 0.5 + 0.5;
            float wave2 = sin(st.y - uTime * 0.4) * cos(st.x - uTime * 0.2) * 0.5 + 0.5;
            float waveStrength = mix(wave1, wave2, 0.5);
            
            vec3 finalColor = mix(uColorDeep, uColorBase, waveStrength);
            float alpha = mix(0.15, 0.5, waveStrength);
            
            float dist = distance(vUv, vec2(0.5, 0.5)) * 2.0;
            alpha = mix(alpha, 1.0, smoothstep(0.95, 1.0, dist));
            
            gl_FragColor = vec4(finalColor, alpha);
          }
        `}
      />
    </mesh>
  )
}

// ─────────────────────────────────────────────────────────────
//  CAMADA 3: TERRA E EDIFÍCIOS
// ─────────────────────────────────────────────────────────────
const HexBase = ({ corTopo = '#5a9e44' }) => {
  const shape = useMemo(() => {
    const s = new THREE.Shape()
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i + Math.PI / 6
      const v = HEX_SIZE * 1.015
      i === 0 ? s.moveTo(v * Math.cos(angle), v * Math.sin(angle))
              : s.lineTo(v * Math.cos(angle), v * Math.sin(angle))
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
        <meshStandardMaterial color={corTopo} roughness={0.8} metalness={0} />
      </mesh>
    </group>
  )
}

// ─────────────────────────────────────────────────────────────
//  HexTileClusterSatelite - PARA EDIFÍCIOS CLUSTER
// ─────────────────────────────────────────────────────────────
const HexTileClusterSatelite = ({ hex, corTopo, modeloId, corFallback }) => {
  const { x, z } = hexToWorld(hex, HEX_SIZE)
  return (
    <group position={[x, 0, z]}>
      <HexBase corTopo={corTopo} />
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
//  HexTile
// ─────────────────────────────────────────────────────────────
const HexTile = ({ hex, building, onClick, selected, moveMode = false }) => {
  const [hovered, setHover] = useState(false)
  const { x, z } = hexToWorld(hex, HEX_SIZE)
  const cfg = building ? SETOR_CONFIG[building.setor] : null
  const yPos = hovered ? 0.08 : 0

  return (
    <group
      position={[x, yPos, z]}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true) }}
      onPointerOut={() => setHover(false)}
      onClick={(e) => {
        e.stopPropagation()
        if (building || moveMode) onClick(hex)
      }}
    >
      {/* PASSA hovered e selected, remove o ring externo */}
      <HexBase
        corTopo={building ? cfg?.cor3 : undefined}
        hovered={hovered}
        selected={selected}
      />

      {building && (
        <BuildingModel
          nomeEdificio={building.nome}
          corFallback={cfg?.cor4 || '#888888'}
          posicaoBase={[0, 0.22, 0]}
        />
      )}

      {/* Ring de seleção quando há edifício (corTopo presente, o interno não renderiza) */}
      {(selected || hovered) && building && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.21, 0]}>
          <ringGeometry args={[HEX_SIZE * 0.9, HEX_SIZE * 1.0, 6]} />
          <meshBasicMaterial
            color={selected ? '#F27405' : '#ffffff'}
            transparent
            opacity={selected ? 1 : 0.4}
          />
        </mesh>
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
//  CAMADA 4: SEDE E LUZES
// ─────────────────────────────────────────────────────────────
const Sede = ({ nomeEmpresa, porte }) => {
  const config = resolverModeloSede(porte)
  
  return (
    <group position={[0, 0, 0]}>
      <HexBase corTopo="#4a7230" />
      <BuildingModel
        nomeEdificio={null}
        corFallback="#888888"
        posicaoBase={[0, 0.22, 0]}
        _overrideConfig={config}
      />
      <Html position={[0, 3.0, 0]} center distanceFactor={8}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(76,20,169,0.95), rgba(30,8,80,0.95))',
          border: '1.5px solid rgba(199,159,255,0.6)',
          borderRadius: 10, padding: '4px 12px',
          fontFamily: "'Rajdhani',sans-serif",
          fontWeight: 800, fontSize: 12, color: '#fff',
          textTransform: 'uppercase',
          boxShadow: '0 0 18px rgba(100,17,217,0.55)',
        }}>
          {nomeEmpresa || 'Sua Empresa'}
        </div>
      </Html>
    </group>
  )
}

const Lights = () => (
  <>
    <directionalLight position={[15, 20, 10]} intensity={1.5} color="#ffffff" castShadow />
    <ambientLight intensity={0.4} color="#ffffff" />
    <pointLight position={[-10, 5, 10]} intensity={0.8} color="#dbb2ff" />
    <hemisphereLight args={['#ffee00', '#ff5500', 0.5]} />
  </>
)

// ─────────────────────────────────────────────────────────────
//  COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────
export default function MapWorld() {
  const { dados } = useContext(CentraldeDadosContext)
  const { economiaSetores } = useContext(DadosEconomyGlobalContext)
  
  const nomeEmpresa = dados.inicioGame?.nomeEmpresa || 'Empresa'
  const porte = economiaSetores?.centralEdificios?.classificacaoPorteEmpresa || 'Micro Empresa'

  const [selectedKey, setSelectedKey] = useState(null)
  const [dayProgress, setDayProgress] = useState(0)
  const [moveMode, setMoveMode] = useState(false)

  // ── Edifícios ativos ────────────────────────────────────────
  const edificiosAtivos = useMemo(() => {
    const lista = []
    SETORES.forEach(setor => {
      dados[setor]?.edificios?.forEach((ed, idx) => {
        if (ed.quantidade > 0) {
          lista.push({
            id: `${setor}-${idx}`,
            nome: ed.nome,
            setor,
            quantidade: ed.quantidade,
            ehCluster: edificioEhCluster(ed.nome),
            ehComposto: edificioEhComposto(ed.nome),
          })
        }
      })
    })
    return lista
  }, [dados])

  // ── Hex Grid ── RAIO 6 ──
  const hexGrid = useMemo(() => {
    const Tile = defineHex({ dimensions: HEX_SIZE, orientation: 'pointy' })
    return Array.from(new Grid(Tile, spiral({ center: [0, 0], radius: 6 })))
  }, [])

  // ── Posicionamento automático ──────────────────────────────
  const [posicoes, setPosicoes] = useState({})

  useEffect(() => {
    const gridKeys = new Set(hexGrid.map(h => `${h.q},${h.r}`))
    const posOcupadas = new Set(['0,0'])
    const novasPosicoes = {}

    // Primeiro, preservar edifícios já posicionados
    const idsAtivos = new Set(edificiosAtivos.map(e => e.id))
    Object.entries(posicoes).forEach(([key, id]) => {
      if (idsAtivos.has(id)) {
        novasPosicoes[key] = id
        posOcupadas.add(key)
        const ed = edificiosAtivos.find(e => e.id === id)
        if (ed?.ehCluster) {
          const [q, r] = key.split(',').map(Number)
          vizinhosDeHex(q, r).forEach(vk => posOcupadas.add(vk))
        }
      }
    })

    const keys = hexGrid.map(h => `${h.q},${h.r}`)
      .sort((a, b) => {
        const [aq, ar] = a.split(',').map(Number)
        const [bq, br] = b.split(',').map(Number)
        return (aq*aq + ar*ar) - (bq*bq + br*br)
      })

    const proximoLivre = () => keys.find(k => !posOcupadas.has(k) && gridKeys.has(k)) || null

    const idsJaAlocados = new Set(Object.values(novasPosicoes))
    const clusters = edificiosAtivos.filter(ed => ed.ehCluster && !idsJaAlocados.has(ed.id))
    const simples = edificiosAtivos.filter(ed => !ed.ehCluster && !idsJaAlocados.has(ed.id))

    // Posicionar clusters primeiro
    clusters.forEach(ed => {
      const central = proximoLivre(k => {
        const [cq, cr] = k.split(',').map(Number)
        return vizinhosDeHex(cq, cr).every(vk => !posOcupadas.has(vk) && gridKeys.has(vk))
      })
      if (central) {
        const [cq, cr] = central.split(',').map(Number)
        novasPosicoes[central] = ed.id
        posOcupadas.add(central)
        vizinhosDeHex(cq, cr).forEach(vk => posOcupadas.add(vk))
      }
    })

    // Depois os simples
    simples.forEach(ed => {
      const pos = proximoLivre()
      if (pos) {
        novasPosicoes[pos] = ed.id
        posOcupadas.add(pos)
      }
    })

    setPosicoes(novasPosicoes)
  }, [edificiosAtivos, hexGrid])

  // ── Satélites dos clusters ──────────────────────────────────
  const satelites = useMemo(() => {
    const mapa = {}
    Object.entries(posicoes).forEach(([key, id]) => {
      const ed = edificiosAtivos.find(e => e.id === id)
      if (!ed?.ehCluster) return

      const cfg = SETOR_CONFIG[ed.setor]
      const cor = cfg?.cor3 || '#5a9e44'
      const corFall = cfg?.cor4 || '#888888'
      const modeloId = EDIFICIO_PARA_MODELO[ed.nome]
      const modeloDef = modeloId ? MODELOS[modeloId] : null
      const defSats = modeloDef?.satelites || []

      const [q, r] = key.split(',').map(Number)
      vizinhosDeHex(q, r).forEach((vk, i) => {
        if (!posicoes[vk]) {
          mapa[vk] = {
            corTopo: cor,
            corFallback: corFall,
            modeloId: defSats[i]?.modeloId ?? null,
          }
        }
      })
    })
    return mapa
  }, [posicoes, edificiosAtivos])

  // ── Handle Click ────────────────────────────────────────────
  const handleHexClick = (hex) => {
    const key = `${hex.q},${hex.r}`
    if (moveMode) {
      // Lógica de movimento (se necessário)
      setMoveMode(false)
      return
    }
    if (posicoes[key]) {
      setSelectedKey(selectedKey === key ? null : key)
    }
  }

  // ── Render ──────────────────────────────────────────────────
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', borderRadius: 20, overflow: 'hidden' }}>
      <Canvas shadows camera={{ position: [18, 18, 18], fov: 26 }}>
        {/* CAMADA 1: CÉU */}
        <SkyDome dayProgress={dayProgress} />
        
        {/* CAMADA 2: MAR */}
        <Ocean />
        
        {/* CAMADA 4: LUZES */}
        <Lights />

        {/* CAMADA 3: TERRA E EDIFÍCIOS */}
        <group>
          <Sede nomeEmpresa={nomeEmpresa} porte={porte} />

          {/* Satélites de clusters */}
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

          {/* Tiles normais */}
          {hexGrid.map(hex => {
            const key = `${hex.q},${hex.r}`
            if (key === '0,0') return null
            if (satelites[key]) return null
            
            const edId = posicoes[key]
            const building = edId ? edificiosAtivos.find(e => e.id === edId) || null : null

            return (
              <HexTile
                key={key}
                hex={hex}
                building={building}
                onClick={handleHexClick}
                selected={key === selectedKey}
                moveMode={moveMode}
              />
            )
          })}
        </group>

        <ContactShadows position={[0, 0.02, 0]} opacity={0.4} scale={30} blur={2.2} color="#1a3a10" />
        
        {/* ORBIT CONTROLS - APENAS ROTAÇÃO */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          rotateSpeed={0.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.8}
          target={[0, 0, 0]}
          enableDamping={true}
          dampingFactor={0.08}
          autoRotate={true}
          autoRotateSpeed={1.2}
        />
      </Canvas>
    </div>
  )
}