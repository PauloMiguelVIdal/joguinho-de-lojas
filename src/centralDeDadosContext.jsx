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
    preçoConstrução: 70000,
    faturamentoUnitário: 200,
    faturamentoUnitárioPadrão:200,
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
    faturamentoUnitário: 1100, 
    faturamentoUnitárioPadrão:1100,
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
    faturamentoUnitário: 3300,
    faturamentoUnitárioPadrão:3300,
    faturamentoTotal: 0,
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
    faturamentoUnitário: 8000,
    faturamentoUnitárioPadrão:10000,
    faturamentoTotal: 0,
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