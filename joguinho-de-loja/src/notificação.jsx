import React, { useContext } from 'react';
import { CentraldeDadosContext } from './centralDeDadosContext';

export default function Notificação() {

  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  // console.log(dados.estadoModal);

  const fecharModal = () => { 
    atualizarDados('modal', { ...dados.modal, estadoModal: false });   
  };

  let head = '';
  let content = '';
  
if(dados.eventoAtual.LojaSelecionada !== ""){




if (dados.eventoAtual.situacaoSelecionada === "aumento") {
  head = "Boas notícias";
} else if(dados.eventoAtual.situacaoSelecionada === "queda") {
  head = "Péssimas notícias";
} else {
  head ="rapaz"
  console.log(dados.eventoAtual)
}
  
  console.log("Valor de situacao:", dados.eventoAtual.situacao);
  console.log("Valor de head:", head);
  console.log("Objeto eventoAtual:", dados.eventoAtual);
}else{
  console.log("fudeu")
}
  content = dados.eventoAtual.title;


// Dia de pagamentos das despesas

//pague as dívidas para poder avançar




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
    // console.log("não chamou");
    return null;
  }
}



// if (dados.estadoModal && dados.iniciarSorteio) {
//   return (
    
//     <div className='flex justify-center items-center z-10 bg-black opacity-[90%] w-[100vw] h-[100vh]'>
//       <div className='w-[50vw] h-[50vh] bg-roxo rounded-[20px] z-20 relative'>
//         <h1 className='text-center text-white p-[10px] fonteBold'>Novidade</h1>
//         <div className='w-[80%] h-[10px] bg-white flex rounded-[5px] relative m-auto'></div>
//         <div>
//           <h2 className='text-start text-white opacity-[100%] p-[20px] fonteLight'>{dados.eventoAtual.title}</h2>
//         </div>
//         <button className='absolute right-[10px] bottom-[10px] text-white bg-laranja p-[10px] rounded-[40px] z-30 fonteBold' onClick={fecharModal}>
//           <h3>entendido</h3>
//         </button>
//       </div>
//     </div>
//   );
// } else {
//   // console.log("não chamou");
//   return null;
// }
// }
