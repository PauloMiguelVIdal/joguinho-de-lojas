import React, { useContext, useEffect } from 'react';
import { CentraldeDadosContext } from './centralDeDadosContext';

export default function Notificação() {

  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  // console.log(dados.estadoModal);

  const fecharModal = () => { 
    atualizarDados('modal', { ...dados.modal, estadoModal: false });   
  };

  useEffect(()=>console.log("chamou evento")),[dados.eventoAtual]

//   if (novoEventoSelecionado === "modalDespesas") {
//     // Lógica para o evento modal de despesas
// } else if (novoEventoSelecionado === "modalFaturamento") {
//   novoEvento.periodoSelecionado = selecionarItem(periodo);
//   novoEvento.LojaSelecionada = selecionarItem(todasLojas);
//   novoEvento.situacaoSelecionada = selecionarItem(situacao);
//   novoEvento.porcentagemSelecionada = selecionarItem(porcentagem);
//   const novaDataFinal = parseInt(novaDataInicial) + novoEvento.periodoSelecionado;      // Lógica para o evento modal de faturamento
//     novoEvento.diaInicial = novaDataInicial;
//     novoEvento.diaFinal = novaDataFinal
//     novoEvento.title = `As ${novoEvento.LojaSelecionada} terão ${novoEvento.situacaoSelecionada} de faturamento de ${novoEvento.porcentagemSelecionada}% durante o período de ${novoEvento.periodoSelecionado} dias`;
//     console.log(novoEvento.periodoSelecionado)
   


//   const events = ['pagarDespesas', 'faturamento', 'impostosFixos', 'impostosVariáveis'];




  let head = "Novidade";
  let content = `${dados.eventoAtual.title }`;
  
  
  
  if (dados.dia % 30 === 0 && dados.modal.estadoModal && dados.despesas.despesasPagas == false){
    return       <div className='flex justify-center items-center z-10 bg-black opacity-[90%] w-[100vw] h-[100vh]'>
      <div className='w-[50vw] h-[50vh] bg-roxo rounded-[20px] z-20 relative'>
        <h1 className='text-center text-white p-[10px] fonteBold'>Dívidas a pagar</h1>
        <div className='w-[80%] h-[10px] bg-white flex rounded-[5px] relative m-auto'></div>
        <div>
          <h2 className='text-start text-white opacity-[70%] pl-[20px] pt-[20px] fonteLight'>pague as suas dívidas para poder continuar</h2>
        </div>
        <button className='absolute right-[10px] bottom-[10px] text-white bg-laranja p-[10px] rounded-[40px] z-30 fonteBold' onClick={fecharModal}>
          <h3>entendido</h3>
        </button>
      </div>
    </div>









}
if (dados.modal.estadoModal)  {
  return (
    
    <div className='flex justify-center items-center z-10 bg-black opacity-[90%] w-[100vw] h-[100vh]'>
      <div className='w-[50vw] h-[50vh] bg-roxo rounded-[20px] z-20 relative'>
        <h1 className='text-center text-white p-[10px] fonteBold'>{head}</h1>
        <div className='w-[80%] h-[10px] bg-white flex rounded-[5px] relative m-auto'></div>
        <div>
          <h2 className='text-start text-white opacity-[70%] pl-[20px] pt-[20px] fonteLight'>{content}</h2>
        </div>
        <button className='absolute right-[10px] bottom-[10px] text-white bg-laranja p-[10px] rounded-[40px] z-30 fonteBold' onClick={fecharModal}>
          <h3>entendido</h3>
        </button>
      </div>
    </div>
  );
} else {
    return null;
  }
}

