import React from 'react'
import { CentraldeDadosContext } from '../centralDeDadosContext'
import { useContext } from 'react'

const {
  dados, atualizarDados
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
