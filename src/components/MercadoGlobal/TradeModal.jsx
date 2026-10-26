// MercadoGlobal/TradeModal.jsx
import React, { useState } from 'react';
import { productsCatalog } from '../TablePrice';
import { useGame } from '../GameContext';

export function TradeModal({ produtoId, lado, ctx, onClose }) {
  const produto = productsCatalog[produtoId];
  const { economiaSetores, stock, precos, getCategoryStorageUI } = ctx;
  const { registrarCompraMercado, registrarVendaMercado } = useGame();

  const preco = precos[produtoId] ?? 0;
  const [qtd, setQtd] = useState(1);

  const storageUI = getCategoryStorageUI(produto.categoriaFisica);
  const slotsLivres = Math.max(storageUI.capMaxSlots - storageUI.usadoSlots, 0);
  const maxComprarPorEspaco = produto.slotSize > 0
    ? Math.floor(slotsLivres / produto.slotSize) : 0;
  const maxComprarPorSaldo = Math.floor(economiaSetores.saldo / Math.max(preco, 1));
  const maxVender = stock[produtoId] || 0;

  const max = lado === 'buy'
    ? Math.min(maxComprarPorEspaco, maxComprarPorSaldo)
    : maxVender;
  const valorTotal = qtd * preco;

  function confirmar() {
    const ok = lado === 'buy'
      ? registrarCompraMercado(produtoId, qtd, valorTotal)
      : registrarVendaMercado(produtoId, qtd, valorTotal);
    if (ok) onClose();
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,.85)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#1a0e2e', border: '1px solid rgba(200,122,255,.4)',
        borderRadius: 16, padding: 20, width: 380, maxWidth: '92vw',
        color: '#fff', fontFamily: "'Rajdhani',sans-serif",
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ fontSize: 26 }}>{produto.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 800 }}>{produto.nome}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,.4)' }}>
              {lado === 'buy' ? 'Comprar do mercado' : 'Vender ao mercado'}
            </div>
          </div>
        </div>

        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', marginBottom: 4 }}>
          Preço unitário: <strong style={{ color: '#C87AFF' }}>R$ {preco.toLocaleString('pt-BR')}</strong>
        </div>

        <div style={{ fontSize: 10, color: 'rgba(255,255,255,.4)', marginBottom: 12 }}>
          {lado === 'buy' ? (
            <>Cabe no estoque: <b style={{ color: '#7aff9a' }}>{maxComprarPorEspaco}</b> · Saldo permite: <b style={{ color: '#7ac8ff' }}>{maxComprarPorSaldo}</b> · Entrega em <b style={{ color: '#FFD700' }}>10 dias</b></>
          ) : (
            <>Disponível: <b style={{ color: '#7aff9a' }}>{maxVender}</b> · Crédito imediato</>
          )}
        </div>

        {lado === 'buy' && (
          <div style={{
            background: 'rgba(255,215,0,.08)', border: '1px solid rgba(255,215,0,.25)',
            borderRadius: 8, padding: '6px 10px', fontSize: 10, color: '#FFD700',
            marginBottom: 12,
          }}>
            💰 Saldo será debitado agora · 📦 Entrega em 10 dias
          </div>
        )}

        <input
          type="number" min={1} max={max || 1} value={qtd}
          onChange={e => setQtd(Math.max(1, Math.min(max || 1, +e.target.value || 1)))}
          style={{
            width: '100%', padding: '10px 14px', borderRadius: 8,
            background: 'rgba(0,0,0,.35)', border: '1px solid rgba(255,255,255,.15)',
            color: '#fff', fontSize: 16, fontWeight: 800, marginBottom: 12, outline: 'none',
            fontFamily: 'inherit',
          }}
        />

        <div style={{
          background: 'rgba(0,0,0,.3)', borderRadius: 8, padding: 12,
          marginBottom: 14, textAlign: 'center',
        }}>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,.4)' }}>VALOR TOTAL</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: lado === 'buy' ? '#7ac8ff' : '#7aff9a' }}>
            R$ {valorTotal.toLocaleString('pt-BR')}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: 10, borderRadius: 8,
            background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)',
            color: 'rgba(255,255,255,.6)', fontSize: 12, fontWeight: 700, cursor: 'pointer',
            fontFamily: 'inherit',
          }}>Cancelar</button>
          <button onClick={confirmar} disabled={qtd > max || qtd < 1 || max === 0} style={{
            flex: 2, padding: 10, borderRadius: 8,
            background: lado === 'buy' ? 'rgba(122,200,255,.3)' : 'rgba(122,255,154,.3)',
            border: `1px solid ${lado === 'buy' ? '#7ac8ff' : '#7aff9a'}`,
            color: lado === 'buy' ? '#7ac8ff' : '#7aff9a',
            fontSize: 12, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
            opacity: (qtd > max || qtd < 1 || max === 0) ? 0.4 : 1,
          }}>Confirmar {lado === 'buy' ? 'compra' : 'venda'}</button>
        </div>
      </div>
    </div>
  );
}