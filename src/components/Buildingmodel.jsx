// ============================================================
//  BuildingModel.jsx
//  Tenta carregar o modelo na ordem:
//    1. arquivo.glb
//    2. arquivo.gltf  (fallback automático)
//    3. caixinha colorida (se nenhum existir)
// ============================================================


import React, { useMemo, useState, useEffect, Component } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { resolverModelo } from './buildingModels'


// ─────────────────────────────────────────────────────────────
//  Cache de disponibilidade
//  { [path]: 'unknown' | 'ok' | 'missing' }
// ─────────────────────────────────────────────────────────────
const glbCache = {}

async function checarArquivo(path) {
  if (glbCache[path] && glbCache[path] !== 'unknown') return glbCache[path]
  try {
    const res = await fetch(path, { method: 'HEAD' })
    glbCache[path] = res.ok ? 'ok' : 'missing'
  } catch {
    glbCache[path] = 'missing'
  }
  return glbCache[path]
}

// Hook que resolve qual caminho usar: .glb → .gltf → null
// Retorna: { path: string|null, status: 'loading'|'ready'|'missing' }
function useResolverCaminho(arquivoBase) {
  // arquivoBase = config.glbPath, ex: "/models/kenney-city/building-type-m.glb"
  // Deriva os dois caminhos possíveis
  const caminhos = useMemo(() => {
    const semExt = arquivoBase.replace(/\.(glb|gltf)$/i, '')
    return [semExt + '.glb', semExt + '.gltf']
  }, [arquivoBase])

  const [resultado, setResultado] = useState(() => {
    // Resposta imediata se já está em cache
    for (const p of caminhos) {
      if (glbCache[p] === 'ok')      return { path: p,    status: 'ready'   }
      if (glbCache[p] === 'missing') continue
    }
    // Se todos em cache como missing
    if (caminhos.every(p => glbCache[p] === 'missing')) {
      return { path: null, status: 'missing' }
    }
    return { path: null, status: 'loading' }
  })

  useEffect(() => {
    let cancelled = false

    async function resolver() {
      for (const p of caminhos) {
        const s = await checarArquivo(p)
        if (cancelled) return
        if (s === 'ok') {
          setResultado({ path: p, status: 'ready' })
          return
        }
      }
      if (!cancelled) setResultado({ path: null, status: 'missing' })
    }

    // Só faz fetch se ainda não resolvido
    if (resultado.status === 'loading') resolver()
  }, [caminhos])

  return resultado
}

// ─────────────────────────────────────────────────────────────
//  ErrorBoundary — captura erros de useGLTF/useTexture
// ─────────────────────────────────────────────────────────────
class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error) {
    if (!error?.message?.includes('Could not load')) {
      console.warn('[BuildingModel]', error?.message)
    }
  }
  render() {
    return this.state.hasError
      ? (this.props.fallback ?? null)
      : this.props.children
  }
}

// ─────────────────────────────────────────────────────────────
//  Fallback visual
// ─────────────────────────────────────────────────────────────
export function ModeloFallback({ cor = '#888888' }) {
  return (
    <group>
      <mesh position={[0, 0.09, 0]} castShadow>
        <boxGeometry args={[0.28, 0.18, 0.28]} />
        <meshStandardMaterial color="#d4c4a0" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.24, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[0.22, 0.16, 4]} />
        <meshStandardMaterial color={cor} roughness={0.7} />
      </mesh>
    </group>
  )
}

// ─────────────────────────────────────────────────────────────
//  Loader COM colormap
// ─────────────────────────────────────────────────────────────
function ModeloComColormap({ glbPath, colormap, escalaVec, posY, rotacao, corTint }) {
  const { scene } = useGLTF(glbPath)
  const textura   = useTexture(colormap)

  const clonado = useMemo(() => {
    textura.flipY       = false
    textura.colorSpace  = THREE.SRGBColorSpace
    textura.needsUpdate = true

    const clone = scene.clone(true)
    clone.traverse(node => {
      if (!node.isMesh) return
      const mat       = node.material.clone()
      mat.map         = textura
      mat.roughness   = 0.85
      mat.metalness   = 0.05
      mat.color       = corTint ? new THREE.Color(...corTint) : new THREE.Color(1, 1, 1)
      mat.needsUpdate = true
      node.material   = mat
      node.castShadow = true
      node.receiveShadow = true
    })
    return clone
  }, [scene, textura, corTint])

  return (
    <primitive
      object={clonado}
      position={[0, posY, 0]}
      rotation={[0, rotacao, 0]}
      scale={escalaVec}
    />
  )
}

// ─────────────────────────────────────────────────────────────
//  Loader SEM colormap
// ─────────────────────────────────────────────────────────────
function ModeloSemColormap({ glbPath, escalaVec, posY, rotacao, corTint }) {
  const { scene } = useGLTF(glbPath)

  const clonado = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse(node => {
      if (!node.isMesh) return
      const mat = node.material.clone()
      if (corTint) {
        mat.color       = new THREE.Color(...corTint)
        mat.needsUpdate = true
      }
      node.material      = mat
      node.castShadow    = true
      node.receiveShadow = true
    })
    return clone
  }, [scene, corTint])

  return (
    <primitive
      object={clonado}
      position={[0, posY, 0]}
      rotation={[0, rotacao, 0]}
      scale={escalaVec}
    />
  )
}

// ─────────────────────────────────────────────────────────────
//  Loader interno — aguarda resolução glb/gltf
// ─────────────────────────────────────────────────────────────
function ModeloLoader({ config, corFallback }) {
  const { path, status } = useResolverCaminho(config.glbPath)

  const fallbackEl = <ModeloFallback cor={corFallback} />

  // Ainda verificando qual arquivo existe
  if (status === 'loading') return fallbackEl

  // Nenhum arquivo encontrado
  if (status === 'missing' || !path) return fallbackEl

  // Arquivo encontrado → carrega com proteção dupla
  return (
    <ModelErrorBoundary fallback={fallbackEl}>
      <React.Suspense fallback={fallbackEl}>
        {config.colormap ? (
          <ModeloComColormap
            glbPath={path}
            colormap={config.colormap}
            escalaVec={config.escalaVec}
            posY={config.posY}
            rotacao={config.rotacao}
            corTint={config.corTint}
          />
        ) : (
          <ModeloSemColormap
            glbPath={path}
            escalaVec={config.escalaVec}
            posY={config.posY}
            rotacao={config.rotacao}
            corTint={config.corTint}
          />
        )}
      </React.Suspense>
    </ModelErrorBoundary>
  )
}

// ─────────────────────────────────────────────────────────────
//  COMPONENTE PÚBLICO
//
//  Props:
//    nomeEdificio  → string exata do edificio
//    corFallback   → cor hex para o fallback (cor do setor)
//    posicaoBase   → [x, y, z] posição no grupo pai
// ─────────────────────────────────────────────────────────────
export function BuildingModel({ nomeEdificio, corFallback = '#888888', posicaoBase = [0, 0, 0], _overrideConfig = null    }) {
  const config = _overrideConfig ?? resolverModelo(nomeEdificio)

  // 🔹 SIMPLES
  if (config.tipo === 'simples') {
    return (
      <group position={posicaoBase}>
        <ModeloLoader config={config} corFallback={corFallback} />
      </group>
    )
  }

  // 🔥 COMPOSTO
  if (config.tipo === 'composto') {
    return (
      <group position={posicaoBase}>
        {config.partes.map((parte, i) => (
          <group
            key={i}
            position={parte.offset}
            rotation={[0, parte.rotacaoExtra, 0]}
            scale={parte.escalaVec.map(v => v * parte.escalaExtra)}
          >
            <ModeloLoader config={parte} corFallback={corFallback} />
          </group>
        ))}
      </group>
    )
  }

  return null
}