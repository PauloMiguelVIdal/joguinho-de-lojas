// MercadoGlobal/ListaNegociacao.jsx
import React, { useState, useMemo } from 'react';
import { productsCatalog } from '../TablePrice';
import { getProdutosVinculados } from './economyHelpers';
import { TradeModal } from './TradeModal';

const SETORES = ['todos', 'agricultura', 'tecnologia', 'industria', 'comercio', 'energia', 'imobiliario'];
const ORDENS = [
  { id: 'preco_desc', label: 'R$ ↓' },
  { id: 'preco_asc',  label: 'R$ ↑' },
  { id: 'nome',       label: 'A–Z' },
  { id: 'estoque',    label: 'Estoque ↓' },
];

export function ListaNegociacao({ ctx }) {
  const { economiaSetores, stock, precos, edificiosFinais } = ctx;
  const [busca, setBusca] = useState('');
  const [filtroSetor, setFiltroSetor] = useState('todos');
  const [ordem, setOrdem] = useState('nome');
  const [somenteComEstoque, setSomenteComEstoque] = useState(false);
  const [somenteVinculados, setSomenteVinculados] = useState(false);
  const [trade, setTrade] = useState(null);

  const carteiraAtual = economiaSetores?.carteira?.carteiraAtual ?? [];

  const vinculados = useMemo(
    () => getProdutosVinculados(edificiosFinais, carteiraAtual),
    [edificiosFinais, carteiraAtual]
  );

  const produtos = useMemo(() => {
    let lista = Object.entries(productsCatalog)
      .filter(([id, p]) => filtroSetor === 'todos' || p.setor === filtroSetor)
      .filter(([id, p]) => !busca || p.nome.toLowerCase().includes(busca.toLowerCase()))
      .filter(([id, p]) => !somenteVinculados || vinculados.has(id))
      .map(([id, p]) => ({
        id, ...p,
        preco: precos[id] ?? 0,
        estoque: stock[id] || 0,
        vinculado: vinculados.has(id),
      }));

    if (somenteComEstoque) lista = lista.filter(p => p.estoque > 0);

    if (ordem === 'preco_desc') lista.sort((a, b) => b.preco - a.preco);
    else if (ordem === 'preco_asc') lista.sort((a, b) => a.preco - b.preco);
    else if (ordem === 'estoque') lista.sort((a, b) => b.estoque - a.estoque);
    else lista.sort((a, b) => {
      const diff = (a.vinculado ? 0 : 1) - (b.vinculado ? 0 : 1);
      return diff !== 0 ? diff : a.nome.localeCompare(b.nome);
    });

    return lista;
  }, [precos, stock, busca, filtroSetor, ordem, somenteComEstoque, somenteVinculados, vinculados]);

  return (
    <div style={{
      background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.08)',
      borderRadius: 14, padding: 14, display: 'flex', flexDirection: 'column',
      minHeight: 0, height: '100%',
    }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
        <input
          placeholder="🔍 Buscar produto..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          style={{
            flex: 1, minWidth: 200, padding: '8px 12px',
            background: 'rgba(0,0,0,.3)', border: '1px solid rgba(255,255,255,.12)',
            borderRadius: 8, color: '#fff', fontSize: 12, outline: 'none',
            fontFamily: 'inherit',
          }}
        />
        <select value={filtroSetor} onChange={e => setFiltroSetor(e.target.value)} style={selectStyle}>
          {SETORES.map(s => <option key={s} value={s}>{s === 'todos' ? 'Todos setores' : s}</option>)}
        </select>
        <select value={ordem} onChange={e => setOrdem(e.target.value)} style={selectStyle}>
          {ORDENS.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
        </select>
        <button onClick={() => setSomenteComEstoque(s => !s)} style={{
          padding: '8px 12px', borderRadius: 8,
          background: somenteComEstoque ? 'rgba(122,200,255,.25)' : 'rgba(255,255,255,.06)',
          border: '1px solid rgba(122,200,255,.3)',
          color: somenteComEstoque ? '#7ac8ff' : 'rgba(255,255,255,.55)',
          fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
        }}>Com estoque</button>
        <button onClick={() => setSomenteVinculados(s => !s)} style={{
          padding: '8px 12px', borderRadius: 8,
          background: somenteVinculados ? 'rgba(124,58,237,.3)' : 'rgba(255,255,255,.06)',
          border: '1px solid rgba(124,58,237,.4)',
          color: somenteVinculados ? '#c4b5fd' : 'rgba(255,255,255,.55)',
          fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
        }}>⚡ Meus edifícios ({vinculados.size})</button>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 100px 80px 130px',
        gap: 8, padding: '6px 10px', fontSize: 9, fontWeight: 700,
        textTransform: 'uppercase', color: 'rgba(255,255,255,.35)',
        borderBottom: '1px solid rgba(255,255,255,.08)',
      }}>
        <div>Produto</div>
        <div style={{ textAlign: 'right' }}>Preço</div>
        <div style={{ textAlign: 'right' }}>Estoque</div>
        <div style={{ textAlign: 'center' }}>Ação</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {produtos.map(p => (
          <div key={p.id} style={{
            display: 'grid', gridTemplateColumns: '1fr 100px 80px 130px',
            gap: 8, alignItems: 'center',
            padding: '8px 10px', borderBottom: '1px solid rgba(255,255,255,.04)',
            borderLeft: p.vinculado ? '3px solid #7c3aed' : '3px solid transparent',
            background: p.vinculado ? 'rgba(124,58,237,.05)' : 'transparent',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
              <span style={{ fontSize: 18 }}>{p.icon}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {p.nome}
                  </span>
                  {p.vinculado && (
                    <span style={{
                      fontSize: 7, fontWeight: 900, padding: '1px 5px', borderRadius: 4,
                      background: 'rgba(124,58,237,.5)', color: '#c4b5fd',
                      letterSpacing: '.08em',
                    }}>⚡ VINC</span>
                  )}
                </div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,.35)' }}>
                  {p.setor} · {p.unidade}
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: 11, fontWeight: 800, color: '#C87AFF' }}>
              R$ {p.preco.toLocaleString('pt-BR')}
            </div>
            <div style={{
              textAlign: 'right', fontSize: 11,
              color: p.estoque > 0 ? '#7aff9a' : 'rgba(255,255,255,.25)',
            }}>
              {p.estoque}
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              <button onClick={() => setTrade({ produtoId: p.id, lado: 'buy' })} style={btnBuy}>
                Comprar
              </button>
              {p.estoque > 0 && (
                <button onClick={() => setTrade({ produtoId: p.id, lado: 'sell' })} style={btnSell}>
                  Vender
                </button>
              )}
            </div>
          </div>
        ))}
        {produtos.length === 0 && (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,.3)', padding: 20, fontSize: 12 }}>
            Nenhum produto encontrado com os filtros atuais.
          </div>
        )}
      </div>

      {trade && (
        <TradeModal
          produtoId={trade.produtoId}
          lado={trade.lado}
          ctx={ctx}
          onClose={() => setTrade(null)}
        />
      )}
    </div>
  );
}

const selectStyle = {
  padding: '8px 12px', borderRadius: 8,
  background: 'rgba(0,0,0,.3)', border: '1px solid rgba(255,255,255,.12)',
  color: '#fff', fontSize: 11, fontWeight: 600, outline: 'none', fontFamily: 'inherit',
};

const btnBuy = {
  flex: 1, padding: '5px 8px', borderRadius: 6,
  background: 'rgba(122,200,255,.2)', border: '1px solid rgba(122,200,255,.4)',
  color: '#7ac8ff', fontSize: 10, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
};
const btnSell = {
  flex: 1, padding: '5px 8px', borderRadius: 6,
  background: 'rgba(122,255,154,.2)', border: '1px solid rgba(122,255,154,.4)',
  color: '#7aff9a', fontSize: 10, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
};