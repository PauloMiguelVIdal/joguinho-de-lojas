// MercadoGlobal/OportunidadesPanel.jsx
import React, { useMemo } from 'react';
import { productsCatalog } from '../TablePrice';
import {
  currentPrice, getConsumers, getSellers, simulatePrice,
} from './economyHelpers';

export function OportunidadesPanel({ ctx }) {
  const { economiaSetores, stock, getCategoryStorageUI, selecionarProduto } = ctx;

  const oportunidades = useMemo(() => {
    const lista = [];

    Object.entries(productsCatalog).forEach(([id, prod]) => {
      const consumidores = getConsumers(id);
      const vendedores   = getSellers(id);
      if (!consumidores.length && !vendedores.length) return;

      const precoAtual     = currentPrice(id, economiaSetores);
      const precoAquecido  = simulatePrice(id, 'aquecida', 'aquecida');
      const descontoVsAquecido = precoAquecido > 0
        ? ((precoAquecido - precoAtual) / precoAquecido) * 100
        : 0;

      const categoria = prod.categoriaFisica;
      const storageUI = getCategoryStorageUI(categoria);
      const slotsLivres = Math.max(storageUI.capMaxSlots - storageUI.usadoSlots, 0);
      const qtdQueCabe = prod.slotSize > 0 ? Math.floor(slotsLivres / prod.slotSize) : 0;

      const estoqueAtual = stock[id] || 0;

      let score = 0;
      if (estoqueAtual === 0) score += 30;
      if (consumidores.length > 0) score += 20 * Math.min(consumidores.length, 3);
      if (descontoVsAquecido > 15) score += 25;
      if (qtdQueCabe > 0) score += 15;
      if (estoqueAtual > 0 && qtdQueCabe > 0) score -= 20;

      if (score <= 0) return;

      lista.push({
        id, prod,
        precoAtual,
        precoAquecido,
        descontoVsAquecido,
        categoria,
        qtdQueCabe,
        estoqueAtual,
        consumidores,
        vendedores,
        score,
      });
    });

    return lista.sort((a, b) => b.score - a.score).slice(0, 12);
  }, [economiaSetores, stock, getCategoryStorageUI]);

  return (
    <div style={{
      background: 'rgba(106,0,255,.04)',
      border: '1px solid rgba(106,0,255,.2)',
      borderRadius: 14, padding: 14,
      display: 'flex', flexDirection: 'column', minHeight: 0,
      overflow: 'hidden',
    }}>
      <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 4 }}>
        🚀 Oportunidades de Compra
      </div>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,.4)', marginBottom: 12 }}>
        Produtos com consumidores ativos, preço baixo e espaço disponível
      </div>

      <div style={{
        flex: 1, overflowY: 'auto',
        display: 'flex', flexDirection: 'column', gap: 8,
        paddingRight: 4,
      }}>
        {oportunidades.length === 0 && (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,.3)', padding: 20, fontSize: 12 }}>
            Nenhuma oportunidade detectada com os filtros atuais.
          </div>
        )}
        {oportunidades.map(o => (
          <CartaoOportunidade key={o.id} op={o} onClick={() => selecionarProduto(o.id)} />
        ))}
      </div>
    </div>
  );
}

function CartaoOportunidade({ op, onClick }) {
  const { prod, precoAtual, precoAquecido, descontoVsAquecido, qtdQueCabe, estoqueAtual, consumidores } = op;

  return (
    <div
      onClick={onClick}
      style={{
        background: 'linear-gradient(135deg, rgba(106,0,255,.15), rgba(106,0,255,.05))',
        border: '1px solid rgba(106,0,255,.35)',
        borderRadius: 12, padding: 12, cursor: 'pointer',
        transition: 'transform .15s',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateX(3px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <span style={{ fontSize: 24 }}>{prod.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {prod.nome}
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,.4)' }}>
            {consumidores.length} consumidor{consumidores.length !== 1 ? 'es' : ''} ativo{consumidores.length !== 1 ? 's' : ''}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#C87AFF' }}>
            R$ {precoAtual.toLocaleString('pt-BR')}
          </div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,.35)' }}>/ {prod.unidade}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 8 }}>
        <Info label="Estoque" value={estoqueAtual} cor="#7ac8ff" />
        <Info label="Cabe" value={qtdQueCabe} cor={qtdQueCabe > 0 ? '#7aff9a' : '#ff6b6b'} />
        <Info
          label="Vs aquec."
          value={`${descontoVsAquecido > 0 ? '+' : ''}${descontoVsAquecido.toFixed(0)}%`}
          cor={descontoVsAquecido > 15 ? '#7aff9a' : descontoVsAquecido > 0 ? '#FFD700' : '#ff6b6b'}
        />
      </div>

      <div style={{
        background: 'rgba(200,122,255,.1)', border: '1px solid rgba(200,122,255,.25)',
        borderRadius: 8, padding: '4px 8px', fontSize: 10,
        color: '#C87AFF', fontWeight: 700, textAlign: 'center',
      }}>
        Simular compra →
      </div>
    </div>
  );
}

function Info({ label, value, cor }) {
  return (
    <div style={{ background: 'rgba(0,0,0,.3)', borderRadius: 6, padding: '4px 6px', textAlign: 'center' }}>
      <div style={{ fontSize: 8, color: 'rgba(255,255,255,.35)' }}>{label}</div>
      <div style={{ fontSize: 11, fontWeight: 800, color: cor }}>{value}</div>
    </div>
  );
}