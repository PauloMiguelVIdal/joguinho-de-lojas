import React, { useState, createContext } from 'react';

const CentraldeDadosContext = createContext();

const CentraldeDadosProvider = ({ children }) => {

const [dados, setDados] = useState({
  saldo: 120000,
  dia: 1,
  chanceNovoEvento:20,
  modal:{
    estadoModal: false,
    head:"",
    content:""
  },
  eventoAtual:{
    eventoAtivo:true,
    title:"",
    LojaSelecionada: "",
    situacaoSelecionada: "",
    porcentagemSelecionada: "",
    periodoSelecionado: "",
    diaInicial:"",
    diaFinal:"",
  },
  terrenos: {
    quantidade: 1,
    preço: 70000,
    faturamentoUnitário: 0,
    faturamentoMínimo: 100,
    faturamentoMáximo: 300,
    faturamentoTotal:2130,
    despesas: 0,
    funcionários: 3
  },
  lojasP: {
    quantidade: 1,
    preçoConstrução: 50000,
    faturamentoUnitário: 0,
    faturamentoMínimo: 800,
    faturamentoMáximo: 1400,
    faturamentoTotal: 0,
    despesas: 0
  },
  lojasM: {
    quantidade: 1,
    preçoConstrução: 100000,
    faturamentoUnitário: 0,
    faturamentoTotal: 0,
    faturamentoMínimo: 2000,
    faturamentoMáximo: 4500,
    despesas: 0
  },
  lojasG: {
    quantidade: 1,
    preçoConstrução: 240000,
    faturamentoUnitário: 0,
    faturamentoTotal: 0,
    faturamentoMínimo: 5000,
    faturamentoMáximo: 12000,
    despesas: 0
  },
  despesas: {
    diaPagarDespesas: false,
    despesasPagas: false
  },
  funcionários: {
    custo: "",
    custoMínimo: 8,
    custoMáximo: 12
  },
  impostos: {
    lojasP: {
      fixo: 500,
      sobreFaturamento: 0.03
    },
    lojasM: {
      fixo: 700,
      sobreFaturamento: 0.04
    },
    lojasG: {
      fixo: 1000,
      sobreFaturamento: 0.05
    }
  }
});

  const atualizarDados = (chave, novoValor) => {
    setDados(prevState => ({
      ...prevState,
      [chave]: novoValor
    }));
  };

    return (
    <CentraldeDadosContext.Provider value={{ dados, atualizarDados }}>
      {children}
    </CentraldeDadosContext.Provider>
  );
};

export { CentraldeDadosContext, CentraldeDadosProvider };