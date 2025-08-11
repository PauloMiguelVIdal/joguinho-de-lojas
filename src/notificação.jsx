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


  // useEffect(() => console.log("chamou evento")), [dados.eventoAtual]


  // console.log("useEffect chamado11!");




  let head = `${dados.eventoAtual.julgamento}`;
  let content = `${dados.eventoAtual.title}`;
  
  let headEconomiaGlobal = `${dados.economiaGlobal}`;
  let contentEconomiaGlobal = `${dados.economiaGlobal}`;


useEffect(()=>{

},[dados.fimGame])
if (dados.fimGame===true) {
  return (
    <div className='flex justify-center items-center z-10 bg-black opacity-[98%] w-[100vw] h-[100vh] absolute select-none'>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className='w-[35vw] h-[35vh] bg-[#350973] rounded-[20px] z-20 relative'
      >
        <h1 className='text-center text-white p-[10px] text-[30px] fonteBold'>Fim</h1>
        <div className='w-[80%] h-[10px] bg-gradient-to-l from-laranja to-roxo flex rounded-[5px] relative m-auto'></div>
        <div>
          <h2 className='text-start text-white opacity-[70%] pl-[20px] pt-[20px] text-[25px] fonteLight'>você foi a falencia</h2>
        </div>
        <button className='absolute right-[10px] bottom-[10px] text-white bg-laranja p-[10px] rounded-[40px] z-30 fonteBold hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]' onClick={fecharModal}>
          <h3>entendido</h3>
        </button>
      </motion.div>
    </div>
  );
}
else
  if (dados.dia % 30 === 0 && dados.modalDespesas.estadoModal && !dados.despesas.despesasPagas) {
    return (
      <div className='flex justify-center items-center z-10 bg-black opacity-[98%] w-[100vw] h-[100vh] absolute select-none select-none'>
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
else
  if (dados.modalEconomiaGlobal.estadoModal) 
    {
      let contentEconomiaGlobal = "";
      let headEconomiaGlobal = "";
    
      switch (dados.economiaGlobal) {
        case "aquecida":
          contentEconomiaGlobal =
            "O mercado está aquecido, com alta demanda e grandes chances de crescimento no faturamento, favorecimento fiscal e redução nos custos de construção. Ainda assim, riscos negativos podem surgir.";
          headEconomiaGlobal = "Economia Aquecida";
          break;
        case "progressiva":
          contentEconomiaGlobal =
            "A economia avança de forma constante, com boas perspectivas de aumento de faturamento, incentivos fiscais e queda nos custos de obras. Pequenos riscos ainda estão presentes.";
          headEconomiaGlobal = "Economia em Crescimento";
          break;
        case "estável":
          contentEconomiaGlobal =
            "O cenário está equilibrado, com igual probabilidade de incentivos ou dificuldades, como variação nos impostos, no faturamento e nos custos de construção.";
          headEconomiaGlobal = "Economia Estável";
          break;
        case "declinio":
          contentEconomiaGlobal =
            "A economia mostra sinais de enfraquecimento, com maior risco de perdas financeiras, aumento de impostos e encarecimento de obras, embora ainda existam oportunidades pontuais.";
          headEconomiaGlobal = "Economia em Declínio";
          break;
        case "recessão":
          contentEconomiaGlobal =
            "A recessão traz um cenário adverso, com alta probabilidade de quedas no faturamento, carga tributária elevada e custos de construção maiores. Benefícios são raros, mas possíveis.";
          headEconomiaGlobal = "Economia em Recessão";
          break;
        default:
          contentEconomiaGlobal = "Informações econômicas indisponíveis.";
          headEconomiaGlobal = "Estado econômico desconhecido";
      }
      
      
      

    return (
      <div className="flex justify-center items-center z-10 bg-black opacity-[95%] w-[100vw] h-[100vh] absolute select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <div className='w-[45vw] h-[45vh] bg-[#350973] p-1 rounded-[20px] z-20 relative'>
              <h1 className='text-center text-white p-[10px] text-[30px] fonteBold'>{headEconomiaGlobal}</h1>
              <div className='w-[80%] h-[10px] bg-gradient-to-l from-laranja to-roxo flex rounded-[5px] relative m-auto' ></div>
              <div>
                <h2 className='text-start text-white opacity-[70%] text-[25px] pl-[20px] pt-[20px] fonteLight'>{contentEconomiaGlobal}</h2>
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
      <div className='flex justify-center items-center z-10 bg-black opacity-[98%] w-[100vw] h-[100vh] absolute select-none'>
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

