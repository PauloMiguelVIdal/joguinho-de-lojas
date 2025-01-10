import React, { useState, createContext } from 'react';

const CentraldeDadosContext = createContext();

const CentraldeDadosProvider = ({ children }) => {

const [dados, setDados] = useState({
  saldo: 120000,
  dia: 1,
  chanceNovoEvento:0,
  modal:{
    estadoModal: false,
    head:"",
    content:""
  },
  eventoAtual:{
    eventoAtivo:false,
    title:"",
    LojaSelecionada: "",
    situacaoSelecionada: "",
    porcentagemSelecionada: "",
    periodoSelecionado: "",
    diaInicial:"",
    diaFinal:"",
    departamento:"",
    julgamento:"",
  },
  terrenos: {
    quantidade: 1,
    preço: 70000,
    faturamentoUnitário: 0,
    faturamentoMínimo: 100,
    faturamentoMáximo: 300,
    faturamentoTotal:0,
    despesas: 0,
    funcionários: 3,
    custoFuncionário: "",
    custoFuncionárioMínimo: 8,
    custoFuncionárioMáximo: 12
  },
  lojasP: {
    quantidade: 1,
    preçoConstrução: 50000,
    faturamentoUnitário: 0, 
    faturamentoMínimo: 800,
    faturamentoMáximo: 1400,
    faturamentoTotal: 0,
    despesas: 0,
    impostoFixo: 500,
    impostoSobreFaturamento: 0.03,
    funcionários: 10,
    custoFuncionário: "",
    custoFuncionárioMínimo: 8,
    custoFuncionárioMáximo: 12
  },
  lojasM: {
    quantidade: 1,
    preçoConstrução: 100000,
    faturamentoUnitário: 0,
    faturamentoTotal: 0,
    faturamentoMínimo: 2000,
    faturamentoMáximo: 4500,
    despesas: 0,
    impostoFixo: 700,
    impostoSobreFaturamento: 0.04,
    funcionários: 50,
    custoFuncionário: "",
    custoFuncionárioMínimo: 8,
    custoFuncionárioMáximo: 12
  },
  lojasG: {
    quantidade: 1,
    preçoConstrução: 240000,
    faturamentoUnitário: 0,
    faturamentoTotal: 0,
    faturamentoMínimo: 5000,
    faturamentoMáximo: 12000,
    despesas: 0,
    impostoFixo: 1000,
    impostoSobreFaturamento: 0.05,
    funcionários: 100,
    custoFuncionário: "",
    custoFuncionárioMínimo: 8,
    custoFuncionárioMáximo: 12
  },
  despesas: {
    diaPagarDespesas: false,
    despesasPagas: false
  },
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