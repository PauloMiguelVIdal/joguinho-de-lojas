import React from 'react'
import { useContext, useEffect } from 'react'
import { CentraldeDadosContext } from '../centralDeDadosContext'
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";

import despesasImg from "../imagens/despesas.png";

export default function Taxes() {

  const { dados, atualizarDados } = useContext(CentraldeDadosContext)
  const { economiaSetores, setEconomiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);


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



  const formatarNumero = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(1).replace('.0', '') + 'T'; // Trilhões
    if (num >= 1e9) return (num / 1e9).toFixed(1).replace('.0', '') + 'B';   // Bilhões
    if (num >= 1e6) return (num / 1e6).toFixed(1).replace('.0', '') + 'M';   // Milhões
    if (num >= 1e3) return (num / 1e3).toFixed(1).replace('.0', '') + 'K';   // Milhares
    return num.toString();
  };



  const PagarDespesas = () => {



    if (dados.despesas.despesasPagas) {
      return alert("Despesas desse mês já foram pagas.");
    } else {

      const novoSaldo = economiaSetores.saldo - dados.despesas.despesasLojasP - dados.despesas.despesasLojasM - dados.despesas.despesasLojasG;
      // atualizarDados('saldo', novoSaldo);
      atualizarDados('despesas', { ...dados.despesas, despesasPagas: true });



      // console.log(dados.saldo)
      alert("Despesas pagas.");


    }
  };

  return (
    <div className=' rounded-[40px] flex flex-col items-center gap-[10px]'>
      <div className="rounded-[5px] bg-gradient-to-r from-[#350973] to-[#6411D9] w-[90%] flex items-center place-content-between pl-[10px] pr-[15px]">
        <h1 className='fonteBold text-white'>Faturado </h1>
        <h1 className="fonteBold text-white text-[20px]"> {formatarNumero(dados.faturamento.faturamentoMensal)}</h1>
      </div>

      <div className="rounded-[5px] bg-gradient-to-r from-[#350973] to-[#6411D9] w-[90%] flex items-center place-content-between pl-[10px] pr-[15px]">
        <h1 className='fonteBold text-white'>Despesas </h1>
        <h1 className="fonteBold text-white text-[20px]"> {formatarNumero(economiaSetores.imposto.impostoMensal)}</h1>
      </div>
      <div className="rounded-[5px] bg-gradient-to-r from-[#350973] to-[#6411D9] w-[90%] flex items-center place-content-between pl-[10px] pr-[15px]">
        <h1 className='fonteBold text-white'>Lucro </h1>
        <h1 className="fonteBold text-white text-[20px]"> {formatarNumero((dados.faturamento.faturamentoMensal - dados.imposto.impostoMensal))}</h1>
      </div>
    </div>
  )
}
