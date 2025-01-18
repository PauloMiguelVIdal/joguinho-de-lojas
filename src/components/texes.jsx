import React from 'react'
import { useContext, useEffect} from 'react'
import { CentraldeDadosContext } from '../centralDeDadosContext'
import despesasImg from "../imagens/despesas.png";

export default function Texes() {

const {dados, atualizarDados} = useContext(CentraldeDadosContext)


// useEffect(() => {
//   // Verifica se é necessário atualizar as despesas e o estado modal
//   if (dados.dia % 30 === 0){
//       atualizarDados({...dados.despesas,despesasPagas:false})
//   }
//     if (dados.dia % 30 === 0 && !dados.despesas.despesasPagas) {
//       const novoEstado = { ...dados, modal: { ...dados.modal, estadoModal: true } };
//       atualizarDados('despesas', novasDespesas);
//       atualizarDados('modal', { ...dados.modal, estadoModal: true }); 
//       // Chame o modelo de pagar dívidas aqui
//     }
//   }, [dados.dia, dados.despesas.despesasPagas]);







const PagarDespesas = () => {


  
  if (dados.despesas.despesasPagas) {
      return alert("Despesas desse mês já foram pagas.");
  } else {

      const novoSaldo = dados.saldo - dados.despesas.despesasLojasP - dados.despesas.despesasLojasM - dados.despesas.despesasLojasG;
      // atualizarDados('saldo', novoSaldo);
      atualizarDados('despesas', { ...dados.despesas, despesasPagas: true });
      

      
      console.log(dados.saldo)
       alert("Despesas pagas.");


  }
};

  return (
    <div className='bg-[#6E0BF9] rounded-[40px]'>

          {/* <button className="w-[100px] h-[100px] bg-laranja rounded-[20px] flex items-center justify-center ml-[10px]"
                    onClick={PagarDespesas}><img className="w-[72px] h-[72px]" src={despesasImg} /></button> */}
    </div>
  )
}
