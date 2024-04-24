import React, { useContext, useEffect } from 'react';
import { CentraldeDadosContext } from './centralDeDadosContext';

export default function Notificação() {

  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  // console.log(dados.estadoModal);

  const fecharModal = () => { 
    atualizarDados('modal', { ...dados.modal, estadoModal: false });   
  };

  
  
  // if (dados.eventoAtual) {
  //   if (dados.eventoAtual.situacaoSelecionada == "aumento") {
  //       head = "Boas notícias";
  //   } else if (dados.eventoAtual.situacaoSelecionada == "queda") {
  //       head = "Péssimas notícias";
  //   } else {
  //       head = "Valor padrão";
  //   }
  const events = ['pagarDespesas', 'faturamento', 'impostosFixos', 'impostosVariáveis'];

  let head = '';
  let content = '';
  
  if (events.includes('pagarDespesas')) {
    head = "Dia de pagamentos das despesas";
    content = "Pague as dívidas para poder avançar";
  }
  
  if (events.includes('faturamento')) {
    head = "queda ou aumento";
    content = dados.eventoAtual.title;
  }
  
  console.log(head); // Saída: "Dia de pagamentos das despesas"
  console.log(content); // Saída: "Pague as dívidas para poder avançar"










  if (dados.modal.estadoModal && dados.despesas.despesasPagas == false) {
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

