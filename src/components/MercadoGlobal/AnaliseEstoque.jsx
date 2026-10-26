// MercadoGlobal/AnaliseEstoque.jsx
import React, { useMemo } from 'react';
import { productsCatalog } from '../TablePrice';
import { getConsumers, getProducers } from './economyHelpers';

export function AnaliseEstoque({ ctx }) {
  const { economiaSetores, stock, getCategoryStorageUI, precos } = ctx;

  const analise = useMemo(() => {
    const porCategoria = {};

    Object.entries(stock).forEach(([id, qtd]) => {
      if (!qtd) return;
      const p = productsCatalog[id];
      if (!p) return;

      const preco = precos[id] ?? 0;
      const valor = qtd * preco;
      const cat = p.categoriaFisica;

      if (!porCategoria[cat]) porCategoria[cat] = { produtos: [], valor: 0, slots: 0 };
      porCategoria[cat].produtos.push({
        id, nome: p.nome, icon: p.icon, qtd, preco, valor,
        consumidores: getConsumers(id).length,
        produtores: getProducers(id).length,
      });
      porCategoria[cat].valor += valor;
      porCategoria[cat].slots += qtd * p.slotSize;
    });

    return porCategoria;
  }, [stock, precos]);

  const totalValor = Object.values(analise).reduce((s, c) => s + c.valor, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto', height: '100%' }}>
      <div style={{
        background: 'rgba(106,0,255,.1)', border: '1px solid rgba(106,0,255,.3)',
        borderRadius: 12, padding: 14,
      }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.4)', textTransform: 'uppercase' }}>
          Valor total em estoque
        </div>
        <div style={{ fontSize: 26, fontWeight: 900, color: '#C87AFF' }}>
          R$ {totalValor.toLocaleString('pt-BR')}
        </div>
      </div>

      {Object.entries(analise).map(([cat, info]) => {
        const storageUI = getCategoryStorageUI(cat);
        const ocupacao = storageUI.capMaxSlots > 0
          ? (storageUI.usadoSlots / storageUI.capMaxSlots) * 100
          : 0;

        return (
          <div key={cat} style={{
            background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.08)',
            borderRadius: 12, padding: 14,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 800 }}>{cat}</div>
              <div style={{ fontSize: 11, color: '#C87AFF', fontWeight: 800 }}>
                R$ {info.valor.toLocaleString('pt-BR')}
              </div>
            </div>

            <div style={{ height: 6, background: 'rgba(0,0,0,.4)', borderRadius: 3, overflow: 'hidden', marginBottom: 10 }}>
              <div style={{
                height: '100%',
                width: `${Math.min(ocupacao, 100)}%`,
                background: ocupacao > 90 ? '#ff6b6b' : ocupacao > 70 ? '#FFD700' : '#7aff9a',
                transition: 'width .4s',
              }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {info.produtos.slice(0, 5).map(p => (
                <div key={p.id} style={{
                  display: 'grid', gridTemplateColumns: '1fr auto auto',
                  gap: 8, alignItems: 'center', padding: '4px 6px',
                  background: 'rgba(0,0,0,.2)', borderRadius: 6, fontSize: 11,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
                    <span>{p.icon}</span>
                    <span style={{ fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.nome}</span>
                  </div>
                  <div style={{ color: 'rgba(255,255,255,.5)' }}>×{p.qtd}</div>
                  <div style={{ color: '#7aff9a', fontWeight: 800 }}>
                    R$ {p.valor.toLocaleString('pt-BR')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}