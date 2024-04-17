import React, { useState, createContext } from 'react';

const CentraldeDadosContext = createContext();

const CentraldeDadosProvider = ({ children }) => {
  // deve ser criado uma criação de dado global e uma função genérica que seja suficiente para atualizar todos esses dados
//   const [dadosSaldo, setDadosSaldo] = useState(120000);
//   const [dadosDia, setDadosDia] = useState(1);

 




//   //estadoModal
//   const [estadoModal, setEstadoModal] = useState(false)




//   //terrenos
//   const [dadosTerrenos, setDadosTerrenos] = useState(3);
//   const [dadosPreçosTerrenos, setDadosPreçoTerrenos] = useState(70000);

//   const [dadosFaturamentoUnitárioTerrenos, setDadosFaturamentoUnitárioTerrenos] = useState(0);
//   const [dadosFaturamentoMínimoTerrenos, setDadosFaturamentoMínimoTerrenos] = useState(100);
//   const [dadosFaturamentoMáximoTerrenos, setDadosFaturamentoMáximoTerrenos] = useState(300);
//   const [dadosFaturamentoTotalTerrenos, setDadosFaturamentoTotalTerrenos] = useState(0);

//   const [dadosDespesasTerrenos, setDadosDespesasTerrenos] = useState(0);

//   //lojas P
//   const [dadosLojasP, setDadosLojasP] = useState(5);
//   const [dadosPreçosConstruçãoLojaP, setDadosPreçoConstruçãoLojasP] = useState(50000);

//   const [dadosFaturamentoUnitárioLojasP, setDadosFaturamentoUnitárioLojasP] = useState(0);
//   const [dadosFaturamentoMínimoLojasP, setDadosFaturamentoMínimoLojasP] = useState(800);
//   const [dadosFaturamentoMáximoLojasP, setDadosFaturamentoMáximoLojasP] = useState(1400);
//   const [dadosFaturamentoTotalLojasP, setDadosFaturamentoTotalLojasP] = useState(0);

//   const [dadosDespesasLojasP, setDadosDespesasLojasP] = useState(0);

//   //lojas M
//   const [dadosLojasM, setDadosLojasM] = useState(5);
//   const [dadosPreçosConstruçãoLojaM, setDadosPreçoConstruçãoLojasM] = useState(100000);

//   const [dadosFaturamentoUnitárioLojasM, setDadosFaturamentoUnitárioLojasM] = useState(0);
//   const [dadosFaturamentoTotalLojasM, setDadosFaturamentoTotalLojasM] = useState(0);
//   const [dadosFaturamentoMínimoLojasM, setDadosFaturamentoMínimoLojasM] = useState(2000);
//   const [dadosFaturamentoMáximoLojasM, setDadosFaturamentoMáximoLojasM] = useState(4500);

//   const [dadosDespesasLojasM, setDadosDespesasLojasM] = useState(0);

//   //lojas G
//   const [dadosLojasG, setDadosLojasG] = useState(5);
//   const [dadosPreçosConstruçãoLojaG, setDadosPreçoConstruçãoLojasG] = useState(240000);

//   const [dadosFaturamentoUnitárioLojasG, setDadosFaturamentoUnitárioLojasG] = useState(0);
//   const [dadosFaturamentoTotalLojasG, setDadosFaturamentoTotalLojasG] = useState(0);

//   const [dadosFaturamentoMínimoLojasG, setDadosFaturamentoMínimoLojasG] = useState(5000);
//   const [dadosFaturamentoMáximoLojasG, setDadosFaturamentoMáximoLojasG] = useState(12000);

//   const [dadosDespesasLojasG, setDadosDespesasLojasG] = useState(0);


//   //despesas

//   const [dadosDiaPagarDespesas, setDiaDePagarDespesas] = useState(false);
//   const [dadosDespesasPagas, setDespesasPagas] = useState(false);


//   //funcionários
//   const [dadosCustoFuncionário, setDadosCustoFuncionário] = useState("")
//   const [dadosCustoMínimoFuncionário, setDadosCustoMínimoFuncionário] = useState(8)
//   const [dadosCustoMáximoFuncionário, setDadosCustoMáximoFuncionário] = useState(12)
// //criar a base de dados para que se tenha as informações
// const[dadosFuncionárioTerrenos,setDadosFuncionárioTerrenos] = useState(3)
// //impostos fixos

// const [impostoFixoLojasP,setImpostoFixoLojasP] = useState(500)
// const [impostoFixoLojasM,setImpostoFixoLojasM] = useState(700)
// const [impostoFixoLojasG,setImpostoFixoLojasG] = useState(1000)

// //imposto sobre faturamento

// const [impostoSobreFaturamentoLojasP,setImpostoSobreFaturamentoLojasP] = useState(0.03)
// const [impostoSobreFaturamentoLojasM,setImpostoSobreFaturamentoLojasM] = useState(0.04)
// const [impostoSobreFaturamentoLojasG,setImpostoSobreFaturamentoLojasG] = useState(0.05)



const [dados, setDados] = useState({
  saldo: 120000,
  dia: 2,
  estadoModal: false,
  terrenos: {
    quantidade: 3,
    preço: 70000,
    faturamentoUnitário: 0,
    faturamentoMínimo: 100,
    faturamentoMáximo: 300,
    faturamentoTotal: 0,
    despesas: 0,
    funcionários: 3
  },
  lojasP: {
    quantidade: 5,
    preçoConstrução: 50000,
    faturamentoUnitário: 0,
    faturamentoMínimo: 800,
    faturamentoMáximo: 1400,
    faturamentoTotal: 0,
    despesas: 0
  },
  lojasM: {
    quantidade: 5,
    preçoConstrução: 100000,
    faturamentoUnitário: 0,
    faturamentoTotal: 0,
    faturamentoMínimo: 2000,
    faturamentoMáximo: 4500,
    despesas: 0
  },
  lojasG: {
    quantidade: 5,
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