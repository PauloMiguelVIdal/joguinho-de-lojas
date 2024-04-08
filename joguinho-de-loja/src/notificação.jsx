import React, { useContext } from 'react'
import { CentraldeDadosContext } from './centralDeDadosContext'

export default function Notificação() {

  const { estadoModal, AtualizarEstadoModal } = useContext(CentraldeDadosContext)
  console.log(estadoModal)
  const fecharModal = () => { AtualizarEstadoModal(false) }

  if (estadoModal) {
    return (
      <div className='flex justify-center items-center z-10 bg-black opacity-[90%] w-[100vw] h-[100vh]'>
        <div className='w-[50vw] h-[50vh] bg-roxo rounded-[20px] z-20 relative'>
          <h1 className='text-center text-white p-[10px] fonteBold'>Dia de pagamentos das despesas</h1>
          <div className='w-[80%] h-[10px] bg-white flex rounded-[5px] relative m-auto'></div>
          <div>
            <h2 className='text-start text-white opacity-[70%] pl-[20px] pt-[20px] fonteLight'>pague as dívidas para poder avançar</h2>
          </div>
          <button className='absolute right-[10px] bottom-[10px] text-white bg-laranja p-[10px] rounded-[40px] z-30 fonteBold' onClick={fecharModal}>
            <h3>entendido</h3>
          </button>
        </div>
      </div>
    );
  } else {
    console.log("não chamou")
    return null
  }
}
