import React from 'react'
import { useContext } from 'react'
import { CentraldeDadosContext } from '../centralDeDadosContext'
export default function Employees() {

    let novoCustoFuncionário
    const custoFuncionário = () => {
        novoCustoFuncionário = Math.floor(Math.random() * (dadosCustoMáximoFuncionário - dadosCustoMínimoFuncionário + 1)) + dadosCustoMínimoFuncionário
        AtualizarDadosCustoFuncionário(novoCustoFuncionário)
    }
  return (
    <div>
         <button onClick={mudançasDePreços}>mudançasDePreços</button>
<button onClick={custoFuncionário}>Alteração custo funcionário</button>
<button onClick={gerarFaturamentoLojasP}>Alteração Faturamento lojas p</button>
    </div>
  )
}
