import React from 'react'
import { CentraldeDadosContext } from '../centralDeDadosContext'
import { useContext } from 'react'

const {
  dadosSaldo, AtualizarDadosSaldo,
  dadosDia, AtualizarDadosDia,

  //modal
  estadoModal, AtualizarEstadoModal,

  //terrenos
  dadosTerrenos, AtualizarDadosTerrenos,
  dadosDespesasTerrenos, AtualizarDadosDespesasTerrenos,
  dadosPreçosTerrenos, AtualizarDadosPreçosTerrenos,
  dadosFaturamentoMínimoTerrenos, AtualizarDadosFaturamentoMínimoTerrenos,
  dadosFaturamentoMáximoTerrenos, AtualizarDadosFaturamentoMáximoTerrenos,
  dadosFaturamentoUnitárioTerrenos, AtualizarDadosFaturamentoUnitárioTerrenos,
  dadosFaturamentoTotalTerrenos, AtualizarDadosFaturamentoTotalTerrenos,

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
} = useContext(CentraldeDadosContext)

export default function modalInformations() {

const information = {
"funcionários":"totalfuncionários",
"custo funcionário mínimo": "custoMínimoFuncionário",
"custo funcionário máximo": "custoMáximoFuncionário",
"imposto":"% de imposto",
"imposto fixo":"porcentagem imposto fixo",
"Faturamento mínimo":"Faturamenot Minimo",
"faturamento máximo":"Faturamenot máximo"
}
const informationsTerrenos = {
"funcionários":"totalfuncionários",
"custo funcionário mínimo": "custoMínimoFuncionário",
"custo funcionário máximo": "custoMáximoFuncionário",
"imposto":"% de imposto",
"imposto fixo":"porcentagem imposto fixo",
"Faturamento mínimo":"Faturamenot Minimo",
"faturamento máximo":"Faturamenot máximo"
}






//separa as consts doos componentes

  return (
    <div>modalInformations</div>
  )
}
