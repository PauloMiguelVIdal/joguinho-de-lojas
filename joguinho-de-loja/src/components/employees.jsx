<<<<<<< HEAD
import React from 'react'
=======
import React, { useEffect, useState } from 'react'
>>>>>>> 4eecf25e3e3b0d0eca1f16931d01c2d9df1ce00a
import { useContext } from 'react'
import { CentraldeDadosContext } from '../centralDeDadosContext'
export default function Employees() {

<<<<<<< HEAD
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
=======
  const { dados, atualizarDados } = useContext(CentraldeDadosContext)

  const todasLojas = [
    "terrenos",
    "lojasP"
    , "lojasM",
    "lojasG"
  ];

  let funcionáriosTotalDiário = 0;
  useEffect(() => {
    todasLojas.forEach(edifícioSelecionado => {

      const valorUnitárioPadrão = dados[edifícioSelecionado].custoFuncionárioUnitárioPadrão
      // console.log(valorUnitárioPadrão)



      const funcionárioTotalGenérico = (valorUnitárioPadrão * dados[edifícioSelecionado].funcionários * dados[edifícioSelecionado].quantidade)

      // console.log(funcionárioTotalGenérico)


      // funcionáriosTotalDiário += parseFloat(funcionárioTotalGenérico)


      const novoValorTotalFuncionário = funcionáriosTotalDiário

      atualizarDados(`${edifícioSelecionado}`, {
        ...dados[edifícioSelecionado], valorfuncionárioTotal: funcionárioTotalGenérico
      })
      atualizarDados("valoresDespesas", {
        ...dados.valoresDespesas, funcionários: novoValorTotalFuncionário
      })

    })
    // console.log("useEffect chamado7!");

  },[dados.dia])









  return (
    <div>
      {/* <button onClick={mudançasDePreços}>mudançasDePreços</button>
      <button onClick={custoFuncionário}>Alteração custo funcionário</button>
      <button onClick={gerarFaturamentoLojasP}>Alteração Faturamento lojas p</button> */}
>>>>>>> 4eecf25e3e3b0d0eca1f16931d01c2d9df1ce00a
    </div>
  )
}
