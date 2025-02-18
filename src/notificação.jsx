import React, { useContext, useEffect } from 'react';
import { CentraldeDadosContext } from './centralDeDadosContext';
import { motion } from "framer-motion";

export default function Notificação() {

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


  useEffect(() => console.log("chamou evento")), [dados.eventoAtual]






  let head = `${dados.eventoAtual.julgamento}`;
  let content = `${dados.eventoAtual.title}`;



  if (dados.dia % 30 === 0 && dados.modalDespesas.estadoModal && !dados.despesas.despesasPagas) {
    return (
      <div className='flex justify-center items-center z-10 bg-black opacity-[98%] w-[100vw] h-[100vh] absolute'>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className='w-[30vw] h-[30vh] bg-[#350973] rounded-[20px] z-20 relative'
        >
          <h1 className='text-center text-white p-[10px] text-[30px] fonteBold'>Dívidas a pagar</h1>
          <div className='w-[80%] h-[10px] bg-white flex rounded-[5px] relative m-auto'></div>
          <div>
            <h2 className='text-start text-white opacity-[70%] pl-[20px] text-[25px] pt-[20px] fonteLight'>
              Pague suas dívidas para poder continuar
            </h2>
          </div>
          <button
            className='absolute right-[10px] bottom-[10px] text-white bg-laranja p-[10px] rounded-[40px] z-30 fonteBold hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]'
            onClick={fecharModalDespesas}
          >
            <h3>Entendido</h3>
          </button>
        </motion.div>
      </div>
    );
  }


  if (dados.modalEconomiaGlobal.estadoModal) {
    return (
      <div className="flex justify-center items-center z-10 bg-black opacity-[95%] w-[100vw] h-[100vh] absolute">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
    
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
       

        </motion.div>
      </div>
    );
  }

  if (dados.modal.estadoModal) {
    return (
      <div className='flex justify-center items-center z-10 bg-black opacity-[98%] w-[100vw] h-[100vh] absolute'>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className='w-[35vw] h-[35vh] bg-[#350973] rounded-[20px] z-20 relative'
        >
          <h1 className='text-center text-white p-[10px] text-[30px] fonteBold'>{head}</h1>
          <div className='w-[80%] h-[10px] bg-gradient-to-l from-laranja to-roxo flex rounded-[5px] relative m-auto'></div>
          <div>
            <h2 className='text-start text-white opacity-[70%] pl-[20px] pt-[20px] text-[25px] fonteLight'>{content}</h2>
          </div>
          <button className='absolute right-[10px] bottom-[10px] text-white bg-laranja p-[10px] rounded-[40px] z-30 fonteBold hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]' onClick={fecharModal}>
            <h3>entendido</h3>
          </button>
        </motion.div>
      </div>
    );
  }



  else {
    return null;
  }


}

