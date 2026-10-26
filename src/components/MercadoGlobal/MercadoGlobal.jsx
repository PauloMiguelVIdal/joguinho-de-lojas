// MercadoGlobal/MercadoGlobal.jsx
import React, { useContext, useMemo, useState, useEffect } from 'react';
import { DadosEconomyGlobalContext } from '../../dadosEconomyGlobal';
import { useGame } from '../GameContext';

import { useCentralStore } from '../../stores/useCentralStore';
import { productsCatalog, getMarketPrice } from '../TablePrice';
import { OportunidadesPanel } from './OportunidadesPanel';
import { ListaNegociacao } from './ListaNegociacao';
import { SimuladorRentabilidade } from './SimuladorRentabilidade';
import { AnaliseEstoque } from './AnaliseEstoque';

const ABAS = [
  { id: 'explorar', label: 'Explorar Oportunidades', icon: '🚀' },
  { id: 'negociar', label: 'Negociar', icon: '⚡' },
  { id: 'analise',  label: 'Análise do Estoque', icon: '📊' },
];

export default function MercadoGlobal() {
  const { economiaSetores } = useContext(DadosEconomyGlobalContext);
  const { stock, getCategoryStorageUI } = useGame();
  const edificiosFinais = useCentralStore(s => s.edificiosFinais);

  const [aba, setAba] = useState('explorar');
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const econGlobal = economiaSetores?.economiaGlobal ?? 'estável';

  // Deep-link — vem do AssistenteIA ou de outro lugar
  const produtoSolicitado = useCentralStore(s => s.produtoSolicitado);
  useEffect(() => {
    if (!produtoSolicitado) return;
    setProdutoSelecionado(produtoSolicitado);
    setAba('explorar');
    useCentralStore.getState().setProdutoSolicitado?.(null);
  }, [produtoSolicitado]);

  // Preços memoizados uma vez por mudança de economia
  const precos = useMemo(() => {
    const m = {};
    Object.keys(productsCatalog).forEach(id => {
      m[id] = getMarketPrice(id, economiaSetores);
    });
    return m;
  }, [economiaSetores]);

  const ctx = useMemo(() => ({
    economiaSetores, stock, getCategoryStorageUI,
    edificiosFinais, econGlobal, precos,
    selecionarProduto: setProdutoSelecionado,
  }), [economiaSetores, stock, edificiosFinais, econGlobal, precos]);

  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#0b0717', color: '#fff',
      fontFamily: "'Rajdhani','Segoe UI',sans-serif",
      display: 'flex', flexDirection: 'column',
      borderRadius: 20, overflow: 'hidden',
    }}>
      {/* HEADER */}
      <header style={{
        padding: '14px 18px',
        background: 'linear-gradient(135deg, #2a1450 0%, #6A00FF 100%)',
        borderBottom: '1px solid rgba(255,255,255,.1)',
        display: 'flex', alignItems: 'center', gap: 12,
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 26 }}>🌍</span>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '.04em' }}>
            Mercado Global
          </div>
          <div style={{ fontSize: 10, opacity: .6, textTransform: 'uppercase', letterSpacing: '.1em' }}>
            Economia global: <strong style={{ color: '#C87AFF' }}>{econGlobal}</strong>
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
          {ABAS.map(a => (
            <button key={a.id} onClick={() => setAba(a.id)} style={{
              background: aba === a.id ? 'rgba(255,255,255,.2)' : 'rgba(255,255,255,.06)',
              color: aba === a.id ? '#fff' : 'rgba(255,255,255,.55)',
              border: '1px solid rgba(255,255,255,.1)',
              borderRadius: 8, padding: '8px 14px',
              fontSize: 12, fontWeight: 700, cursor: 'pointer',
              transition: 'all .15s', fontFamily: 'inherit',
            }}>{a.icon} {a.label}</button>
          ))}
        </div>
      </header>

      {/* CONTEÚDO */}
      <div style={{ flex: 1, minHeight: 0, padding: 16, overflow: 'hidden' }}>
        {aba === 'explorar' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 14,
            height: '100%',
            minHeight: 0,
          }}>
            <OportunidadesPanel ctx={ctx} />
            <SimuladorRentabilidade ctx={ctx} produtoId={produtoSelecionado} />
          </div>
        )}
        {aba === 'negociar' && <ListaNegociacao ctx={ctx} />}
        {aba === 'analise' && <AnaliseEstoque ctx={ctx} />}
      </div>
    </div>
  );
}