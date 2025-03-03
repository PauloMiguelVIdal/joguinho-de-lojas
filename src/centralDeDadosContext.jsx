import React, { useState, createContext } from 'react';

const CentraldeDadosContext = createContext();

const CentraldeDadosProvider = ({ children }) => {

  const [dados, setDados] = useState({
    ofertas : {},
    inicioGame:{
       estadoModal: true,
       nomeEmpresa:""
    },

    nomeEmpresa:"",
    saldo: 12000000,
    dia: 1,
    chanceNovoEvento: 0,
    economiaGlobal : "estável", 
    botãoOfertas: "btnNormal",
    proximaEconomia : "",
    proximaOferta : "",
    despesas: {
      diaPagarDespesas: false,
      despesasPagas: false,
      proximoPagamento:""
    },
    modal: {
      estadoModal: false,
      head: "",
      content: ""
    },
    modalAchievements: {
      estadoModal: false,
      lojaConquistada:"",
      conquista:0
    },
    modalDespesas: {
      estadoModal: false,
      head: "",
      content: ""
    },
    modalEconomiaGlobal: {
      estadoModal: false,
      head: "",
      content: ""
    },
    modalOfertas: {
      estadoModal: false,
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
      achievements:{
        5:false,
        10:false,
        20:false,
        50:false,
        100:false,
        200:false,
        500:false,
        1000:false
          },
      arrayFatu:[],
      somaArrayFatu:"",
      quantidade: 70,
      quantidadeNecTerreno:0,
      preçoConstrução: 70000,
      faturamentoUnitário: 200,
      faturamentoUnitárioPadrão: 200,
      faturamentoTotal: 0,
      faturamentoMensal: 0,
      impostoFixo: 200,
      valorImpostoFixoTotal: 0,
      impostoSobreFaturamento: 0.02000,
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
      achievements:{
        5:false,
        10:false,
        20:false,
        50:false,
        100:false,
        200:false,
        500:false,
        1000:false
          },
      arrayFatu:[],
      somaArrayFatu:0,
      quantidade: 50,
      quantidadeNecTerreno:1,
      preçoConstrução: 50000,
      faturamentoUnitário: 1100,
      faturamentoUnitárioPadrão: 1100,
      faturamentoTotal: 0,
      faturamentoMensal: 0,
      despesas: 0,
      impostoFixo: 500,
      valorImpostoFixoTotal: 0,
      impostoSobreFaturamento: 0.03000,
      valorImpostoSobreFaturamento: 0,
      funcionários:10,
      custoFuncionário: "",
      custoFuncionárioUnitárioPadrão: 200,
      valorfuncionárioTotal: 0,
      custoFuncionárioMínimo: 8,
      custoFuncionárioMáximo: 12
    },
    lojasM: {
      achievements:{
        5:false,
        10:false,
        20:false,
        50:false,
        100:false,
        200:false,
        500:false,
        1000:false
          },
      arrayFatu:[],
      somaArrayFatu:"",
      quantidade: 20,
      quantidadeNecTerreno:2,
      preçoConstrução: 100000,
      faturamentoUnitário: 3300,
      faturamentoUnitárioPadrão: 3300,
      faturamentoTotal: 0,
      faturamentoMensal: 0,
      despesas: 0,
      impostoFixo: 700,
      valorImpostoFixoTotal: 0,
      impostoSobreFaturamento: 0.04000,
      valorImpostoSobreFaturamento: 0,
      funcionários:50,
      custoFuncionário: "",
      custoFuncionárioUnitárioPadrão: 200,
      valorfuncionárioTotal: 0,
      custoFuncionárioMínimo: 8,
      custoFuncionárioMáximo: 12
    },
    lojasG: {
      achievements:{
        5:false,
        10:false,
        20:false,
        50:false,
        100:false,
        200:false,
        500:false,
        1000:false
          },
      arrayFatu:[],
      somaArrayFatu:"",
      quantidade:10,
      quantidadeNecTerreno:3,
      preçoConstrução: 240000,
      faturamentoUnitário: 8000,
      faturamentoUnitárioPadrão: 10000,
      faturamentoTotal: 0,
      faturamentoMensal: 0,
      despesas: 0,
      impostoFixo: 1000,
      valorImpostoFixoTotal: 0,
      impostoSobreFaturamento: 0.05000,
      valorImpostoSobreFaturamento: 0,
      funcionários:100,
      custoFuncionário: "",
      custoFuncionárioUnitárioPadrão: 200,
      valorfuncionárioTotal: 0,
      custoFuncionárioMínimo: 8,
      custoFuncionárioMáximo: 12
    },
   
    faturamento: {
      faturamentoDiário: 0,
      faturamentoMensal: 0,
      arrayFatuDiário:[],
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