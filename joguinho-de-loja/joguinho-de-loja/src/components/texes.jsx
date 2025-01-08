import React from 'react'
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
    </div>
  )
}
