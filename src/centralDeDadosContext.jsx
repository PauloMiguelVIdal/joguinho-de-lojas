import React, { useState, createContext } from 'react';

const CentraldeDadosContext = createContext();

const CentraldeDadosProvider = ({ children }) => {

  const [dados, setDados] = useState({
    saldo: 120000,
    dia: 1,
    chanceNovoEvento: 0,
    modal: {
      estadoModal: false,
      head: "",
      content: ""
    },
    eventoAtual: {
      eventoAtivo: false,
      title: "",
      lojaSelecionada: "",
      situacaoSelecionada: "",
      porcentagemSelecionada: "",
      periodoSelecionado: "",
      diaInicial: "",
      diaFinal: "",
      departamento: "",
      julgamento: "",
    },
    terrenos: {
      quantidade: 0,
      preçoConstrução: 70000,
      faturamentoUnitário: 200,
      faturamentoUnitárioPadrão: 200,
      faturamentoTotal: 0,
      faturamentoMensal: 0,
      impostoFixo: 200,
      valorImpostoFixoTotal: 0,
      impostoSobreFaturamento: 0.02,
      valorImpostoSobreFaturamento: 0,
      valorImpostoMensal: 0,
      funcionários:3,
      custoFuncionário: "",
      custoFuncionárioUnitárioPadrão: 200,
      valorfuncionárioTotal: 0,
      custoFuncionárioMínimo: 8,
      custoFuncionárioMáximo: 12
    },
    lojasP: {
      quantidade: 0,
      preçoConstrução: 50000,
      faturamentoUnitário: 1100,
      faturamentoUnitárioPadrão: 1100,
      faturamentoTotal: 0,
      faturamentoMensal: 0,
      despesas: 0,
      impostoFixo: 500,
      valorImpostoFixoTotal: 0,
      impostoSobreFaturamento: 0.03,
      valorImpostoSobreFaturamento: 0,
      funcionários:10,
      custoFuncionário: "",
      custoFuncionárioUnitárioPadrão: 200,
      valorfuncionárioTotal: 0,
      custoFuncionárioMínimo: 8,
      custoFuncionárioMáximo: 12
    },
    lojasM: {
      quantidade: 0,
      preçoConstrução: 100000,
      faturamentoUnitário: 3300,
      faturamentoUnitárioPadrão: 3300,
      faturamentoTotal: 0,
      faturamentoMensal: 0,
      despesas: 0,
      impostoFixo: 700,
      valorImpostoFixoTotal: 0,
      impostoSobreFaturamento: 0.04,
      valorImpostoSobreFaturamento: 0,
      funcionários:50,
      custoFuncionário: "",
      custoFuncionárioUnitárioPadrão: 200,
      valorfuncionárioTotal: 0,
      custoFuncionárioMínimo: 8,
      custoFuncionárioMáximo: 12
    },
    lojasG: {
      quantidade: 0,
      preçoConstrução: 240000,
      faturamentoUnitário: 8000,
      faturamentoUnitárioPadrão: 10000,
      faturamentoTotal: 0,
      faturamentoMensal: 0,
      despesas: 0,
      impostoFixo: 1000,
      valorImpostoFixoTotal: 0,
      impostoSobreFaturamento: 0.05,
      valorImpostoSobreFaturamento: 0,
      funcionários:100,
      custoFuncionário: "",
      custoFuncionárioUnitárioPadrão: 200,
      valorfuncionárioTotal: 0,
      custoFuncionárioMínimo: 8,
      custoFuncionárioMáximo: 12
    },
    despesas: {
      diaPagarDespesas: false,
      despesasPagas: false
    },
    faturamento: {
      faturamentoDiário: 0,
      faturamentoMensal: 0
    },
    relatóriosFaturamento: {

    },
    imposto: {
      impostoFixoMensal: "",
      impostoDiário: "",
      impostoMensal: 0,
      impostoSobreFaturamentoDiário: ""
    },
    imposto2: {
      impostoFixoMensal:[],
      impostoDiário: [],
      impostoMensal: [],
      impostoSobreFaturamentoDiário: []
    },

    valoresDespesas: {
      terrenos: 0,
      lojasP: 0,
      lojasM: 0,
      lojasG: 0,
      impostos: 0,
      funcionários: 0,
      despesasTotais: 0
    },

    relatóriosImpostos: {

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