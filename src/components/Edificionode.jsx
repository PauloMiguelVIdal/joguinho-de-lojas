import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
 
const fmt = (n) => {
  if (!n && n !== 0) return '—';
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
  return String(n);
};
 
const SETOR_COR = {
  agricultura: '#0C9123', tecnologia: '#FF6F00', industria: '#808080',
  comercio: '#E60000', imobiliario: '#3333CC', energia: '#E6B800',
};
 
const EdificioNode = ({ data, selected }) => {
  const { label, quantidade, custo, setor, fatu, roi, temAtivo } = data;
  const cor = SETOR_COR[setor] || '#6411D9';
 
  return (
    <div style={{
      background: temAtivo
        ? `linear-gradient(135deg, ${cor}33 0%, rgba(0,0,0,.7) 100%)`
        : 'rgba(0,0,0,.55)',
      border: `1.5px solid ${selected ? '#fff' : temAtivo ? cor : 'rgba(255,255,255,.12)'}`,
      borderRadius: 10,
      padding: '7px 10px',
      cursor: 'pointer',
      boxShadow: selected
        ? `0 0 0 2px #fff, 0 4px 20px ${cor}66`
        : temAtivo
        ? `0 2px 12px ${cor}44`
        : 'none',
      transition: 'all .2s',
      minHeight: 70,
      position: 'relative',
    }}>
      <Handle type="target" position={Position.Left}  style={{ background: cor, width: 8, height: 8, border: `2px solid #000` }} />
      <Handle type="source" position={Position.Right} style={{ background: cor, width: 8, height: 8, border: `2px solid #000` }} />
 
      {/* Header: nome + badge quantidade */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 6, marginBottom: 6 }}>
        <span style={{
          fontSize: 10, fontWeight: 700, color: temAtivo ? '#fff' : 'rgba(255,255,255,.45)',
          lineHeight: 1.3, flex: 1,
          fontFamily: "'Rajdhani', sans-serif", letterSpacing: '.02em',
        }}>
          {label}
        </span>
        {/* Badge de quantidade */}
        <span style={{
          fontSize: 10, fontWeight: 800, flexShrink: 0,
          background: temAtivo ? cor : 'rgba(255,255,255,.1)',
          color: '#fff', borderRadius: 5, padding: '1px 6px',
          fontFamily: "'Rajdhani', sans-serif",
        }}>
          {quantidade > 0 ? `×${quantidade}` : '0'}
        </span>
      </div>
 
      {/* Métricas */}
      <div style={{ display: 'flex', gap: 5 }}>
        <div style={{ flex: 1, background: 'rgba(255,255,255,.06)', borderRadius: 5, padding: '3px 5px' }}>
          <div style={{ fontSize: 7, color: 'rgba(255,255,255,.35)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Custo</div>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,.7)', fontFamily: "'Rajdhani', sans-serif" }}>{fmt(custo)}</div>
        </div>
        <div style={{ flex: 1, background: 'rgba(255,255,255,.06)', borderRadius: 5, padding: '3px 5px' }}>
          <div style={{ fontSize: 7, color: 'rgba(255,255,255,.35)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Fat/dia</div>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#C87AFF', fontFamily: "'Rajdhani', sans-serif" }}>{fmt(fatu)}</div>
        </div>
        {roi !== undefined && (
          <div style={{ flex: 1, background: 'rgba(255,255,255,.06)', borderRadius: 5, padding: '3px 5px' }}>
            <div style={{ fontSize: 7, color: 'rgba(255,255,255,.35)', textTransform: 'uppercase', letterSpacing: '.08em' }}>ROI</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: roi >= 0 ? '#7aff9a' : '#ff9090', fontFamily: "'Rajdhani', sans-serif" }}>
              {roi >= 0 ? '+' : ''}{roi?.toFixed ? roi.toFixed(0) : roi}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
 
export default memo(EdificioNode);