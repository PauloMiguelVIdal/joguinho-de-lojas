// ============================================================
//  QualityToggle.jsx - Botão para alternar qualidade (ABRE PARA CIMA)
// ============================================================

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGraphicsConfig, QUALITY_MODES, QUALITY_CONFIGS } from './GraphicsConfigContext'

const QualityToggle = () => {
  const { mode, config, changeMode, isPerformance, isBalanced, isQuality } = useGraphicsConfig()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Cores por modo
  const getModeColor = (modeType) => {
    switch (modeType) {
      case QUALITY_MODES.PERFORMANCE: return '#4CAF50'
      case QUALITY_MODES.BALANCED: return '#FFC107'
      case QUALITY_MODES.QUALITY: return '#F27405'
      default: return '#888'
    }
  }

  const getModeIcon = (modeType) => {
    switch (modeType) {
      case QUALITY_MODES.PERFORMANCE: return '⚡'
      case QUALITY_MODES.BALANCED: return '⚖️'
      case QUALITY_MODES.QUALITY: return '🎨'
      default: return '⚙️'
    }
  }

  return (
    <div ref={menuRef} style={{ position: 'relative', zIndex: 100 }}>
      {/* Botão principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 14px',
          borderRadius: '20px',
          border: `2px solid ${getModeColor(mode)}44`,
          background: `linear-gradient(135deg, rgba(10,6,24,0.85), rgba(30,14,58,0.85))`,
          backdropFilter: 'blur(10px)',
          color: '#fff',
          fontFamily: "'Rajdhani','Segoe UI',sans-serif",
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '0.05em',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: `0 0 20px ${getModeColor(mode)}22`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)'
          e.currentTarget.style.boxShadow = `0 0 30px ${getModeColor(mode)}44`
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = `0 0 20px ${getModeColor(mode)}22`
        }}
      >
        <span style={{ fontSize: '16px' }}>{getModeIcon(mode)}</span>
        <span>{config.label}</span>
        <span style={{ 
          fontSize: '10px', 
          opacity: 0.5,
          marginLeft: '4px'
        }}>
          ▲ {/* 🔥 MUDOU: seta para cima indicando que abre para cima */}
        </span>
      </button>

      {/* Dropdown menu - AGORA ABRE PARA CIMA */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }} // 🔥 MUDOU: y: 10 (vem de baixo)
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }} // 🔥 MUDOU: y: 10 (sai para baixo)
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 8px)', // 🔥 MUDOU: bottom em vez de top
              right: 0,
              minWidth: '220px',
              padding: '8px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(10,6,24,0.95), rgba(30,14,58,0.95))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 -20px 60px rgba(0,0,0,0.6)', // 🔥 MUDOU: sombra para cima
            }}
          >
            {Object.values(QUALITY_MODES).map((modeType) => {
              const isActive = mode === modeType
              const color = getModeColor(modeType)
              const icon = getModeIcon(modeType)
              const configs = QUALITY_CONFIGS[modeType]

              return (
                <button
                  key={modeType}
                  onClick={() => {
                    changeMode(modeType)
                    setIsOpen(false)
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    border: 'none',
                    background: isActive ? `${color}22` : 'transparent',
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                    fontFamily: "'Rajdhani','Segoe UI',sans-serif",
                    fontSize: '13px',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${color}22`
                    e.currentTarget.style.color = '#fff'
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                    }
                  }}
                >
                  <span style={{ fontSize: '18px', width: '28px' }}>{icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>{configs.label}</div>
                    <div style={{ 
                      fontSize: '10px', 
                      opacity: 0.5,
                      fontWeight: 400,
                    }}>
                      {configs.description}
                    </div>
                  </div>
                  {isActive && (
                    <span style={{ 
                      color,
                      fontSize: '14px',
                    }}>✓</span>
                  )}
                </button>
              )
            })}

            <div style={{
              marginTop: '6px',
              paddingTop: '6px',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '4px 12px',
            }}>
              <span style={{
                fontSize: '9px',
                color: 'rgba(255,255,255,0.2)',
                fontFamily: 'monospace',
              }}>
                {isPerformance && '⚡ Máxima performance'}
                {isBalanced && '⚖️ Equilíbrio ideal'}
                {isQuality && '🎨 Máxima qualidade'}
              </span>
              <span style={{
                fontSize: '9px',
                color: 'rgba(255,255,255,0.15)',
                fontFamily: 'monospace',
              }}>
                {mode.toUpperCase()}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default QualityToggle