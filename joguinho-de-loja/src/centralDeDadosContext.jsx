import React, { useState, createContext } from 'react';

const CentraldeDadosContext = createContext();

const CentraldeDadosProvider = ({ children }) => {
  const [dadosSaldo, setDadosSaldo] = useState(120000);
  const [dadosDia, setDadosDia] = useState(1);


  //estadoModal
  const [estadoModal, setEstadoModal] = useState(false)




  //terrenos
  const [dadosTerrenos, setDadosTerrenos] = useState(0);
  const [dadosPreçosTerrenos, setDadosPreçoTerrenos] = useState(70000);

  //lojas P
  const [dadosLojasP, setDadosLojasP] = useState(0);
  const [dadosPreçosConstruçãoLojaP, setDadosPreçoConstruçãoLojasP] = useState(50000);

  const [dadosFaturamentoUnitárioLojasP, setDadosFaturamentoUnitárioLojasP] = useState(0);
  const [dadosFaturamentoMínimoLojasP, setDadosFaturamentoMínimoLojasP] = useState(800);
  const [dadosFaturamentoMáximoLojasP, setDadosFaturamentoMáximoLojasP] = useState(1400);
  const [dadosFaturamentoTotalLojasP, setDadosFaturamentoTotalLojasP] = useState(0);

  const [dadosDespesasLojasP, setDadosDespesasLojasP] = useState(0);

  //lojas M
  const [dadosLojasM, setDadosLojasM] = useState(0);
  const [dadosPreçosConstruçãoLojaM, setDadosPreçoConstruçãoLojasM] = useState(100000);

  const [dadosFaturamentoUnitárioLojasM, setDadosFaturamentoUnitárioLojasM] = useState(0);
  const [dadosFaturamentoTotalLojasM, setDadosFaturamentoTotalLojasM] = useState(0);
  const [dadosFaturamentoMínimoLojasM, setDadosFaturamentoMínimoLojasM] = useState(2000);
  const [dadosFaturamentoMáximoLojasM, setDadosFaturamentoMáximoLojasM] = useState(4500);

  const [dadosDespesasLojasM, setDadosDespesasLojasM] = useState(0);

  //lojas G
  const [dadosLojasG, setDadosLojasG] = useState(0);
  const [dadosPreçosConstruçãoLojaG, setDadosPreçoConstruçãoLojasG] = useState(240000);

  const [dadosFaturamentoUnitárioLojasG, setDadosFaturamentoUnitárioLojasG] = useState(0);
  const [dadosFaturamentoTotalLojasG, setDadosFaturamentoTotalLojasG] = useState(0);

  const [dadosFaturamentoMínimoLojasG, setDadosFaturamentoMínimoLojasG] = useState(5000);
  const [dadosFaturamentoMáximoLojasG, setDadosFaturamentoMáximoLojasG] = useState(12000);

  const [dadosDespesasLojasG, setDadosDespesasLojasG] = useState(0);


  //despesas

  const [dadosDiaPagarDespesas, setDiaDePagarDespesas] = useState(false);
  const [dadosDespesasPagas, setDespesasPagas] = useState(false);


  //funcionários
  const [dadosCustoFuncionário, setDadosCustoFuncionário] = useState("")
  const [dadosCustoMínimoFuncionário, setDadosCustoMínimoFuncionário] = useState(8)
  const [dadosCustoMáximoFuncionário, setDadosCustoMáximoFuncionário] = useState(12)

//impostos fixos

const [impostoFixoLojasP,setImpostoFixoLojasP] = useState(500)
const [impostoFixoLojasM,setImpostoFixoLojasM] = useState(700)
const [impostoFixoLojasG,setImpostoFixoLojasG] = useState(1000)

//imposto sobre faturamento

const [impostoSobreFaturamentoLojasP,setImpostoSobreFaturamentoLojasP] = useState(0.03)
const [impostoSobreFaturamentoLojasM,setImpostoSobreFaturamentoLojasM] = useState(0.04)
const [impostoSobreFaturamentoLojasG,setImpostoSobreFaturamentoLojasG] = useState(0.05)






  //saldo

  const AtualizarDadosSaldo = novoSaldo => {
    setDadosSaldo(novoSaldo)
  }
  const AtualizarDadosDia = novoDia => {
    setDadosDia(novoDia)
  }


  //modal
  const AtualizarEstadoModal = () => setEstadoModal(!estadoModal)
  


  //terrenos

  const AtualizarDadosPreçosTerrenos = novoPreçoTerreno => {
    setDadosPreçoTerrenos(novoPreçoTerreno)
  }

  const AtualizarDadosTerrenos = novoTerreno => {
    setDadosTerrenos(novoTerreno)
  }


  //lojas p

  const AtualizarDadosLojasP = novaLojaP => {
    setDadosLojasP(novaLojaP)
  }
  const AtualizarDadosDespesasLojasP = novaDespesaLojaP => {
    setDadosDespesasLojasP(novaDespesaLojaP)
  }

  const AtualizarDadosPreçoConstruçãoLojasP = novoPreçoConstruçãoLojasP => {
    setDadosPreçoConstruçãoLojasP(novoPreçoConstruçãoLojasP)
  }



  const AtualizarDadosFaturamentoUnitárioLojasP = novoFaturamentoUnitárioLojaP => {
    setDadosFaturamentoUnitárioLojasP(novoFaturamentoUnitárioLojaP)
  }

  const AtualizarDadosFaturamentoTotalLojasP = novoFaturamentoTotalLojaP => {
    setDadosFaturamentoTotalLojasP(novoFaturamentoTotalLojaP)
  }

  const AtualizarDadosFaturamentoMínimoLojasP = novoFaturamentoMínimoLojasP => {
    setDadosFaturamentoMínimoLojasP(novoFaturamentoMínimoLojasP)
  }

  const AtualizarDadosFaturamentoMáximoLojasP = novoFaturamentoMáximoLojasP => {
    setDadosFaturamentoMáximoLojasP(novoFaturamentoMáximoLojasP)
  }



  //lojas M

  const AtualizarDadosLojasM = novaLojaM => {
    setDadosLojasM(novaLojaM)
  }

  const AtualizarDadosPreçoConstruçãoLojasM = novoPreçoConstruçãoLojasM => {
    setDadosPreçoConstruçãoLojasM(novoPreçoConstruçãoLojasM)
  }

  const AtualizarDadosDespesasLojasM = novaDespesaLojaM => {
    setDadosDespesasLojasM(novaDespesaLojaM)
  }

  const AtualizarDadosFaturamentoUnitárioLojasM = novoFaturamentoUnitárioLojaM => {
    setDadosFaturamentoUnitárioLojasM(novoFaturamentoUnitárioLojaM)
  }
  const AtualizarDadosFaturamentoTotalLojasM = novoFaturamentoTotalLojaM => {
    setDadosFaturamentoTotalLojasM(novoFaturamentoTotalLojaM)
  }

  const AtualizarDadosFaturamentoMínimoLojasM = novoFaturamentoMínimoLojasM => {
    setDadosFaturamentoMínimoLojasM(novoFaturamentoMínimoLojasM)
  }
  const AtualizarDadosFaturamentoMáximoLojasM = novoFaturamentoMáximoLojasM => {
    setDadosFaturamentoMáximoLojasP(novoFaturamentoMáximoLojasM)
  }




  //lojas G


  const AtualizarDadosPreçoConstruçãoLojasG = novoPreçoConstruçãoLojasG => {
    setDadosPreçoConstruçãoLojasG(novoPreçoConstruçãoLojasG)
  }


  const AtualizarDadosDespesasLojasG = novaDespesaLojaG => {
    setDadosDespesasLojasG(novaDespesaLojaG)
  }

  const AtualizarDadosFaturamentoUnitárioLojasG = novoFaturamentoUnitárioLojaG => {
    setDadosFaturamentoUnitárioLojasG(novoFaturamentoUnitárioLojaG)
  }
  const AtualizarDadosFaturamentoTotalLojasG = novoFaturamentoTotalLojaG => {
    setDadosFaturamentoTotalLojasG(novoFaturamentoTotalLojaG)
  }

  const AtualizarDadosFaturamentoMínimoLojasG = novoFaturamentoMínimoLojasG => {
    setDadosFaturamentoMínimoLojasG(novoFaturamentoMínimoLojasG)
  }
  const AtualizarDadosFaturamentoMáximoLojasG = novoFaturamentoMáximoLojasG => {
    setDadosFaturamentoMáximoLojasG(novoFaturamentoMáximoLojasG)
  }

  const AtualizarDadosLojasG = novaLojaG => {
    setDadosLojasG(novaLojaG)
  }




  //despesas

  const AtualizarDadosDiaPagarDespesas = novoDiaPagamentoDespesas => {
    setDiaDePagarDespesas(novoDiaPagamentoDespesas)
  }
  const AtualizarDespesasPagas = novoPagamentoDespesas => {
    setDespesasPagas(novoPagamentoDespesas)
  }



  //funcionários
  const AtualizarDadosCustoMínimoFuncionário = novoCustoMínimoFuncionário => {
    setDadosCustoMínimoFuncionário(novoCustoMínimoFuncionário)
  }
  const AtualizarDadosCustoMáximoFuncionário = novoCustoMáximoFuncionário => {
    setDadosCustoMáximoFuncionário(novoCustoMáximoFuncionário)
  }

  const AtualizarDadosCustoFuncionário = novoCustoFuncionário => {
    setDadosCustoFuncionário(novoCustoFuncionário)
  }

//impostos fixos

const AtualizarImpostoFixoLojasP = (novoImpostofixoLojasP)=>{setImpostoFixoLojasP(novoImpostofixoLojasP)}
const AtualizarImpostoFixoLojasM = (novoImpostofixoLojasM)=>{setImpostoFixoLojasM(novoImpostofixoLojasM)}
const AtualizarImpostoFixoLojasG = (novoImpostofixoLojasG)=>{setImpostoFixoLojasG(novoImpostofixoLojasG)}

//impostos sobre faturamento

const AtualizarImpostoSobreFaturamentoLojasP = (novoImpostoSobreFaturamentoLojasP)=>{setImpostoSobreFaturamentoLojasP(novoImpostoSobreFaturamentoLojasP)}
const AtualizarImpostoSobreFaturamentoLojasM = (novoImpostoSobreFaturamentoLojasM)=>{setImpostoSobreFaturamentoLojasM(novoImpostoSobreFaturamentoLojasM)}
const AtualizarImpostoSobreFaturamentoLojasG = (novoImpostoSobreFaturamentoLojasG)=>{setImpostoSobreFaturamentoLojasG(novoImpostoSobreFaturamentoLojasG)}



  return (
    <CentraldeDadosContext.Provider value={{
      dadosSaldo, AtualizarDadosSaldo,
      dadosDia, AtualizarDadosDia,

      //modal
      estadoModal, AtualizarEstadoModal,

      //terrenos
      dadosTerrenos, AtualizarDadosTerrenos,
      dadosPreçosTerrenos, AtualizarDadosPreçosTerrenos,


      //lojas p
      dadosLojasP, AtualizarDadosLojasP,
      dadosDespesasLojasP, AtualizarDadosDespesasLojasP,
      dadosPreçosConstruçãoLojaP, AtualizarDadosPreçoConstruçãoLojasP,
      dadosFaturamentoMínimoLojasP, AtualizarDadosFaturamentoMínimoLojasP,
      dadosFaturamentoMáximoLojasP, AtualizarDadosFaturamentoMáximoLojasP,
      dadosFaturamentoUnitárioLojasP, AtualizarDadosFaturamentoUnitárioLojasP,
      dadosFaturamentoTotalLojasP, AtualizarDadosFaturamentoTotalLojasP,

      //lojas m
      dadosDespesasLojasM, AtualizarDadosDespesasLojasM,
      dadosLojasM, AtualizarDadosLojasM,
      dadosPreçosConstruçãoLojaM, AtualizarDadosPreçoConstruçãoLojasM,
      dadosFaturamentoTotalLojasM, AtualizarDadosFaturamentoTotalLojasM,
      dadosFaturamentoUnitárioLojasM, AtualizarDadosFaturamentoUnitárioLojasM,
      dadosFaturamentoMínimoLojasM, AtualizarDadosFaturamentoMínimoLojasM,
      dadosFaturamentoMáximoLojasM, AtualizarDadosFaturamentoMáximoLojasM,


      //lojas g
      dadosDespesasLojasG, AtualizarDadosDespesasLojasG,
      dadosLojasG, AtualizarDadosLojasG,
      dadosPreçosConstruçãoLojaG, AtualizarDadosPreçoConstruçãoLojasG,
      dadosFaturamentoUnitárioLojasG, AtualizarDadosFaturamentoUnitárioLojasG,
      dadosFaturamentoTotalLojasG, AtualizarDadosFaturamentoTotalLojasG,
      dadosFaturamentoMínimoLojasG, AtualizarDadosFaturamentoMínimoLojasG,
      dadosFaturamentoMáximoLojasG, AtualizarDadosFaturamentoMáximoLojasG,


      //despesas
      dadosDiaPagarDespesas, AtualizarDadosDiaPagarDespesas,
      dadosDespesasPagas, AtualizarDespesasPagas,

      //funcionários
      dadosCustoMáximoFuncionário, AtualizarDadosCustoMáximoFuncionário,
      dadosCustoMínimoFuncionário, AtualizarDadosCustoMínimoFuncionário,
      dadosCustoFuncionário, AtualizarDadosCustoFuncionário,

      //impostos
      impostoFixoLojasP, AtualizarImpostoFixoLojasP,
      impostoFixoLojasM, AtualizarImpostoFixoLojasM,
      impostoFixoLojasG, AtualizarImpostoFixoLojasG,

      impostoSobreFaturamentoLojasP, AtualizarImpostoSobreFaturamentoLojasP,
      impostoSobreFaturamentoLojasM, AtualizarImpostoSobreFaturamentoLojasM,
      impostoSobreFaturamentoLojasG, AtualizarImpostoSobreFaturamentoLojasG,
    }}>
      {children}
    </CentraldeDadosContext.Provider>
  );
};

export { CentraldeDadosContext, CentraldeDadosProvider };