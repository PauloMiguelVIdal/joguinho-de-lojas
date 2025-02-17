import React, { useContext, useEffect } from 'react';
import { CentraldeDadosContext } from './centralDeDadosContext';

export default function Notificação() {

  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  // console.log(dados.estadoModal);

  const fecharModal = () => { 
    atualizarDados('modal', { ...dados.modal, estadoModal: false });   
  };

  const fecharModalDespesas = () => { 
    atualizarDados('modalDespesas', { ...dados.modalDespesas, estadoModal: false });   
  };

  const fecharModalEconomiaGlobal = () => { 
    atualizarDados('modalEconomiaGlobal', { ...dados.ModalEconomiaGlobal, estadoModal: false });   
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




  let head = `${dados.eventoAtual.julgamento }`;
  let content = `${dados.eventoAtual.title }`;
  
  if (dados.modalEconomiaGlobal.estadoModal )  {
    return (
      <div className='flex justify-center items-center z-10 bg-black opacity-[98%] w-[100vw] h-[100vh] absolute z-10'>
      <div className='w-[30vw] h-[30vh] bg-[#350973]  rounded-[20px] z-20 relative'>
        <h1 className='text-center text-white p-[10px] text-[30px] fonteBold'>Economia Global</h1>
        <div className='w-[80%] h-[10px] bg-white flex rounded-[5px] relative m-auto'></div>
        <div>
          <h2 className='text-start text-white opacity-[70%] text-[25px] pl-[20px] pt-[20px] fonteLight'>{dados.economiaGlobal}</h2>
        </div>
        <button className='absolute right-[10px] bottom-[10px] text-white bg-laranja p-[10px] rounded-[40px] z-30 fonteBold' onClick={fecharModalEconomiaGlobal}>
          <h3>entendido</h3>
        </button>
      </div>
    </div>
    );
  } 

  
  if (dados.dia % 30 === 0 && dados.modalDespesas.estadoModal && dados.despesas.despesasPagas == false){
    return       <div className='flex justify-center items-center z-10 bg-black opacity-[98%] w-[100vw] h-[100vh] absolute z-10'>
      <div className='w-[30vw] h-[30vh] bg-[#350973] rounded-[20px] z-20 relative'>
        <h1 className='text-center text-white p-[10px] text-[30px] fonteBold'>Dívidas a pagar</h1>
        <div className='w-[80%] h-[10px] bg-white flex rounded-[5px] relative m-auto'></div>
        <div>
          <h2 className='text-start text-white opacity-[70%] pl-[20px] text-[25px] pt-[20px] fonteLight'>Pague suas dívidas para poder continuar</h2>
        </div>
        <button className='absolute right-[10px] bottom-[10px] text-white bg-laranja p-[10px] rounded-[40px] z-30 fonteBold' onClick={fecharModalDespesas}>
          <h3>entendido</h3>
        </button>
      </div>
    </div>
}

if (dados.modal.estadoModal)  {
  return (
    
    <div className='flex justify-center items-center z-10 bg-black opacity-[98%] w-[100vw] h-[100vh] absolute z-10'>
      <div className='w-[35vw] h-[35vh] bg-[#350973] rounded-[20px] z-20 relative'>
        <h1 className='text-center text-white p-[10px] text-[30px] fonteBold'>{head}</h1>
        <div className='w-[80%] h-[10px] bg-gradient-to-l from-laranja to-roxo flex rounded-[5px] relative m-auto'></div>
        <div>
          <h2 className='text-start text-white opacity-[70%] pl-[20px] pt-[20px] text-[25px] fonteLight'>{content}</h2>
        </div>
        <button className='absolute right-[10px] bottom-[10px] text-white bg-laranja p-[10px] rounded-[40px] z-30 fonteBold' onClick={fecharModal}>
          <h3>entendido</h3>
        </button>
      </div>
    </div>
  );
} 

else {
  return null;
}


}

