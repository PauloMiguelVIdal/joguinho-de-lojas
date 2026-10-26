// MercadoGlobal/SimuladorRentabilidade.jsx
import React, { useState, useMemo } from 'react';
import { productsCatalog } from '../TablePrice';
import {
  ECONOMY_STATES, simulatePrice, currentPrice,
  calcularLucroRevenda, compararComprarVsProduzir,
} from './economyHelpers';

export function SimuladorRentabilidade({ ctx, produtoId }) {
  const { economiaSetores, getCategoryStorageUI, stock } = ctx;
  const [modo, setModo] = useState('revenda');
  const [qtd, setQtd] = useState(100);
  const [cenarioVenda, setCenarioVenda] = useState('aquecida');

  const produto = produtoId ? productsCatalog[produtoId] : null;

  const cenarios = useMemo(() => {
    if (!produto) return [];
    return ECONOMY_STATES.map(estado => ({
      estado,
      preco: simulatePrice(produtoId, estado, estado),
      atual: economiaSetores?.economiaGlobal === estado,
    }));
  }, [produtoId, economiaSetores]);

  const precoAtual = produto ? currentPrice(produtoId, economiaSetores) : 0;
  const precoVendaFuturo = produto ? simulatePrice(produtoId, cenarioVenda, cenarioVenda) : 0;
  const simulacao = produto
    ? calcularLucroRevenda({ qtd, precoCompra: precoAtual, precoVendaSimulado: precoVendaFuturo })
    : null;

  const comparacao = produto
    ? compararComprarVsProduzir(produtoId, qtd, economiaSetores)
    : null;

  const categoria = produto?.categoriaFisica;
  const storageUI = categoria ? getCategoryStorageUI(categoria) : null;
  const cabe = storageUI && produto?.slotSize > 0
    ? (storageUI.capMaxSlots - storageUI.usadoSlots) / produto.slotSize >= qtd
    : false;

  if (!produto) {
    return (
      <div style={{
        background: 'rgba(255,255,255,.03)', border: '1px dashed rgba(255,255,255,.1)',
        borderRadius: 14, padding: 24, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        color: 'rgba(255,255,255,.3)', fontSize: 12, textAlign: 'center',
      }}>
        Selecione um produto nas Oportunidades para simular.
      </div>
    );
  }

  return (
    <div style={{
      background: 'rgba(106,0,255,.06)', border: '1px solid rgba(106,0,255,.25)',
      borderRadius: 14, padding: 14, display: 'flex', flexDirection: 'column',
      gap: 10, overflow: 'auto', minHeight: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 22 }}>{produto.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {produto.nome}
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,.4)' }}>
            {produto.setor} · {produto.unidade}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 4 }}>
        {[
          { id: 'revenda', label: '💰 Revenda' },
          { id: 'comprar_vs_produzir', label: '🏭 Comprar vs Produzir' },
        ].map(m => (
          <button key={m.id} onClick={() => setModo(m.id)} style={{
            flex: 1, padding: '6px 10px', borderRadius: 8,
            background: modo === m.id ? 'rgba(200,122,255,.25)' : 'rgba(255,255,255,.06)',
            color: modo === m.id ? '#C87AFF' : 'rgba(255,255,255,.55)',
            border: '1px solid rgba(200,122,255,.25)',
            fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
          }}>{m.label}</button>
        ))}
      </div>

      {modo === 'revenda' && simulacao && (
        <SimulacaoRevenda
          produto={produto}
          precoAtual={precoAtual}
          qtd={qtd} setQtd={setQtd}
          cenarioVenda={cenarioVenda} setCenarioVenda={setCenarioVenda}
          cenarios={cenarios}
          precoVendaFuturo={precoVendaFuturo}
          simulacao={simulacao}
          cabe={cabe}
          stock={stock}
        />
      )}

      {modo === 'comprar_vs_produzir' && comparacao && (
        <ComparacaoProducao comparacao={comparacao} qtd={qtd} setQtd={setQtd} />
      )}
    </div>
  );
}

function SimulacaoRevenda({ produto, precoAtual, qtd, setQtd, cenarioVenda, setCenarioVenda,
  cenarios, precoVendaFuturo, simulacao, cabe, stock }) {
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <Campo label="Quantidade">
          <input type="number" value={qtd}
            onChange={e => setQtd(Math.max(1, +e.target.value || 1))}
            style={inputStyle} />
        </Campo>
        <Campo label="Preço compra">
          <div style={inputStyle}>R$ {precoAtual.toLocaleString('pt-BR')}</div>
        </Campo>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <Campo label="Cenário futuro">
          <select value={cenarioVenda} onChange={e => setCenarioVenda(e.target.value)} style={inputStyle}>
            {ECONOMY_STATES.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </Campo>
        <Campo label="Preço venda simulado">
          <div style={inputStyle}>R$ {precoVendaFuturo.toLocaleString('pt-BR')}</div>
        </Campo>
      </div>

      <div>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,.35)', marginBottom: 4, textTransform: 'uppercase' }}>
          Preço em cada cenário
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {cenarios.map(c => (
            <div key={c.estado} style={{
              flex: 1, padding: '4px 6px', borderRadius: 6,
              background: c.atual ? 'rgba(200,122,255,.2)' : 'rgba(255,255,255,.05)',
              border: `1px solid ${c.atual ? 'rgba(200,122,255,.5)' : 'rgba(255,255,255,.1)'}`,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 8, color: 'rgba(255,255,255,.4)' }}>{c.estado.slice(0, 3)}</div>
              <div style={{ fontSize: 10, fontWeight: 800 }}>{Math.round(c.preco / 1000)}K</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        background: simulacao.lucro >= 0 ? 'rgba(122,255,154,.1)' : 'rgba(255,107,107,.1)',
        border: `1px solid ${simulacao.lucro >= 0 ? 'rgba(122,255,154,.4)' : 'rgba(255,107,107,.4)'}`,
        borderRadius: 10, padding: 12,
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          <Info label="Custo" value={`R$ ${simulacao.custo.toLocaleString('pt-BR')}`} cor="#ff9090" />
          <Info label="Receita" value={`R$ ${simulacao.receita.toLocaleString('pt-BR')}`} cor="#7ac8ff" />
          <Info
            label="Lucro"
            value={`R$ ${simulacao.lucro.toLocaleString('pt-BR')}`}
            cor={simulacao.lucro >= 0 ? '#7aff9a' : '#ff6b6b'}
          />
        </div>
        <div style={{ fontSize: 10, textAlign: 'center', marginTop: 6, color: 'rgba(255,255,255,.5)' }}>
          Margem: <strong style={{ color: simulacao.lucro >= 0 ? '#7aff9a' : '#ff6b6b' }}>
            {simulacao.margem.toFixed(1)}%
          </strong>
        </div>
      </div>

      {!cabe && (
        <div style={{
          background: 'rgba(255,107,107,.1)', border: '1px solid rgba(255,107,107,.3)',
          borderRadius: 8, padding: '6px 10px', fontSize: 10, color: '#ff9090',
        }}>
          ⚠ Estoque insuficiente para {qtd} {produto.unidade}
        </div>
      )}
      {stock[produto.id] && (
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,.4)', textAlign: 'center' }}>
          Já tem {stock[produto.id]} em estoque
        </div>
      )}
    </>
  );
}

function ComparacaoProducao({ comparacao, qtd, setQtd }) {
  const { comprar, produzir } = comparacao;
  return (
    <>
      <Campo label="Quantidade">
        <input type="number" value={qtd}
          onChange={e => setQtd(Math.max(1, +e.target.value || 1))}
          style={inputStyle} />
      </Campo>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <div style={{
          background: 'rgba(122,200,255,.08)', border: '1px solid rgba(122,200,255,.3)',
          borderRadius: 10, padding: 10,
        }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#7ac8ff', marginBottom: 6 }}>
            🛒 COMPRAR
          </div>
          <Info label="Custo total" value={`R$ ${comprar.custo.toLocaleString('pt-BR')}`} cor="#7ac8ff" />
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,.4)', marginTop: 4 }}>
            Imediato
          </div>
        </div>

        <div style={{
          background: 'rgba(200,122,255,.08)', border: '1px solid rgba(200,122,255,.3)',
          borderRadius: 10, padding: 10,
        }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#C87AFF', marginBottom: 6 }}>
            🏭 PRODUZIR
          </div>
          {produzir ? (
            <>
              <Info label="Custo insumos" value={`R$ ${produzir.custo.toLocaleString('pt-BR')}`} cor="#C87AFF" />
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,.4)', marginTop: 4 }}>
                {produzir.runsNecessarios}× "{produzir.edificio}" · ~{produzir.tempoDias} dias
              </div>
            </>
          ) : (
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,.3)' }}>
              Sem fórmula de produção
            </div>
          )}
        </div>
      </div>

      {produzir && (
        <div style={{
          background: comprar.custo < produzir.custo
            ? 'rgba(122,200,255,.12)' : 'rgba(200,122,255,.12)',
          border: '1px solid rgba(255,255,255,.1)',
          borderRadius: 10, padding: '8px 10px', fontSize: 11, textAlign: 'center',
        }}>
          {comprar.custo < produzir.custo ? (
            <>💡 <strong>Comprar</strong> é {(produzir.custo - comprar.custo).toLocaleString('pt-BR')} R$ mais barato</>
          ) : (
            <>💡 <strong>Produzir</strong> é {(comprar.custo - produzir.custo).toLocaleString('pt-BR')} R$ mais barato</>
          )}
        </div>
      )}
    </>
  );
}

const inputStyle = {
  width: '100%', padding: '6px 10px', borderRadius: 6,
  background: 'rgba(0,0,0,.3)', border: '1px solid rgba(255,255,255,.15)',
  color: '#fff', fontSize: 12, fontWeight: 600, outline: 'none',
};

function Campo({ label, children }) {
  return (
    <div>
      <div style={{ fontSize: 9, color: 'rgba(255,255,255,.4)', marginBottom: 3, textTransform: 'uppercase' }}>
        {label}
      </div>
      {children}
    </div>
  );
}

function Info({ label, value, cor }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 8, color: 'rgba(255,255,255,.4)' }}>{label}</div>
      <div style={{ fontSize: 12, fontWeight: 800, color: cor }}>{value}</div>
    </div>
  );
}