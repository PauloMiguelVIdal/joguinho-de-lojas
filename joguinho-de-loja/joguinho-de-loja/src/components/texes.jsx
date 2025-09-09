import React from 'react'
<<<<<<< HEAD
import { useContext } from 'react'
import { CentraldeDadosContext } from '../centralDeDadosContext'
export default function texes() {

const [
    impostoFixoLojasP, AtualizarImpostoFixoLojasP,
    impostoFixoLojasM, AtualizarImpostoFixoLojasM,
    impostoFixoLojasG, AtualizarImpostoFixoLojasG,

    impostoSobreFaturamentoLojasP, AtualizarImpostoSobreFaturamentoLojasP,
    impostoSobreFaturamentoLojasM, AtualizarImpostoSobreFaturamentoLojasM,
    impostoSobreFaturamentoLojasG, AtualizarImpostoSobreFaturamentoLojasG,
] = useContext(CentraldeDadosContext)

  return (
    <div>
        <h1>impos</h1>
=======
import { useContext, useEffect } from 'react'
import { CentraldeDadosContext } from '../centralDeDadosContext'



export default function Texes() {

  const { dados, atualizarDados } = useContext(CentraldeDadosContext)




  return (
    <div>
          definir taxas
>>>>>>> 4eecf25e3e3b0d0eca1f16931d01c2d9df1ce00a
    </div>
  )
}
