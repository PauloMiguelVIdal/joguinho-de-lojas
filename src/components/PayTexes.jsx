import React from "react";
import { useContext, useEffect } from 'react'
import { CentraldeDadosContext } from '../centralDeDadosContext'
import despesasImg from "../imagens/despesas.png";

export default function PayTexes() {

  const { dados, atualizarDados } = useContext(CentraldeDadosContext)
  const todasLojas = [
    "terrenos",
    "lojasP"
    , "lojasM",
    "lojasG"
  ];

  let impostoTotalDiário = 0;
  let impostoTotalFixoLojas = 0;
  let impostoValorImpostoSobreFaturamentoAtualizadoDiário = 0;
  let fatuTotal = 0
  useEffect(() => {
    todasLojas.forEach(edifícioSelecionado => {

      const impostoSobreFaturamentoLojas = dados[edifícioSelecionado].impostoSobreFaturamento
      const valoresFaturamento = dados[edifícioSelecionado].faturamentoMensal
      const valoresFaturamentoDiário = dados[edifícioSelecionado].faturamentoTotal
                   console.log(valoresFaturamentoDiário)

      const valorImpostoSobreFaturamentoAtualizado = valoresFaturamento * impostoSobreFaturamentoLojas
      const valorImpostoSobreFaturamentoAtualizadoDiário = valoresFaturamentoDiário * impostoSobreFaturamentoLojas
      
                   console.log(valorImpostoSobreFaturamentoAtualizadoDiário)

      const impostoFixosLojas = dados[edifícioSelecionado].quantidade * dados[edifícioSelecionado].impostoFixo
      const somaImposto = impostoFixosLojas + valorImpostoSobreFaturamentoAtualizadoDiário

      impostoTotalFixoLojas += parseFloat(impostoFixosLojas)
      impostoValorImpostoSobreFaturamentoAtualizadoDiário += parseFloat(valorImpostoSobreFaturamentoAtualizadoDiário)
      
                   console.log(impostoValorImpostoSobreFaturamentoAtualizadoDiário)
      console.log(impostoTotalFixoLojas)
      fatuTotal += parseFloat(valorImpostoSobreFaturamentoAtualizado)


      impostoTotalDiário += parseFloat(somaImposto)
      console.log(somaImposto)
      console.log(impostoTotalDiário)


      const impostoMensalAtualizado = impostoTotalFixoLojas + fatuTotal

      atualizarDados("imposto", {
        ...dados.imposto,
        impostoDiário: impostoTotalDiário,
        impostoMensal: impostoMensalAtualizado,
        impostoFixoMensal: impostoTotalFixoLojas,
        impostoFaturamentoMensal: fatuTotal,
        impostoSobreFaturamentoDiário: impostoValorImpostoSobreFaturamentoAtualizadoDiário
      })


      atualizarDados(`${edifícioSelecionado}`, {
        ...dados[edifícioSelecionado],
        valorImpostoSobreFaturamento: valorImpostoSobreFaturamentoAtualizado, valorImpostoFixoTotal: impostoFixosLojas
      })
    })
  }, [dados.dia])








  // console.log(dados[edifícioSelecionado].faturamentoMensal)
  // console.log(impostoSobreFaturamentoLojas)


  //impostos fixos


  //   let impostoFixoTotalDiário = 0

  //   useEffect(()=>{
  //     todasLojas.forEach(edifícioSelecionado => {
  //       const impostoFixoTotal =  dados[edifícioSelecionado].impostoFixo * dados[edifícioSelecionado].quantidade
  //       impostoFixoTotalDiário += parseFloat(impostoFixoTotal)
  //       const impostoDiário1 = impostoFixoTotalDiário + (dados[edifícioSelecionado].valorImpostoSobreFaturamentoAtualizado)
  //       atualizarDados(`${edifícioSelecionado}`,{...dados[edifícioSelecionado],
  //       valorImpostoFixoTotal:impostoFixoTotal})

  //         console.log(impostoFixoTotal)

  //         atualizarDados({...dados.imposto, impostoFixoMensal: impostoFixoTotalDiário
  //     , impostoDiário : impostoDiário1})
  //   })
  // },[dados.dia)











  //gera o objeto com o imposto novo no caso diário po conta do lojasp valorImposto sobre faturamento alterar de forma diária
  useEffect(() => {
    atualizarDados("relatóriosImpostos", {
      ...dados.relatóriosImpostos, [dados.dia]:
      {

        //abaixo é para gerar de forma separada 


        "terrenos": dados.terrenos.valorImpostoSobreFaturamento,
        "lojasP": dados.lojasP.valorImpostoSobreFaturamento,
        "lojasM": dados.lojasM.valorImpostoSobreFaturamento,
        "lojasG": dados.lojasG.valorImpostoSobreFaturamento,
        "valorTotalImpostoFaturamento":
          dados.terrenos.valorImpostoSobreFaturamento +
          dados.lojasP.valorImpostoSobreFaturamento +
          dados.lojasM.valorImpostoSobreFaturamento +
          dados.lojasG.valorImpostoSobreFaturamento,

        "valorTotalImpostoFixo":
          dados.terrenos.valorImpostoFixoTotal +
          dados.lojasP.valorImpostoFixoTotal +
          dados.lojasM.valorImpostoFixoTotal +
          dados.lojasG.valorImpostoFixoTotal,
      }
    })
  }, [dados.terrenos.valorImpostoSobreFaturamento||dados.lojasP.valorImpostoSobreFaturamento||dados.lojasM.valorImpostoSobreFaturamento||dados.lojasG.valorImpostoSobreFaturamento])


  // --- seria uma boa forma de armazenar os dados diários em um array e depois somente pegar esse dados
  //  e somar para definir o total diário, ou selecionar um indice e percorrer todos esse arrays que resultando
  // no total sobre todo esse periodo ou criar um gráfico a partir disso

  //seria interresante talvez para o faturamento para gerar os gráficos

  // useEffect(()=>{
  //   atualizarDados("relatóriosImpostos", { ...dados.relatóriosImpostos,[dados.dia]:
  //     [
  //       // "total": dados.terrenos.valorImpostoSobreFaturamento + dados.lojasP.valorImpostoSobreFaturamento + dados.lojasM.valorImpostoSobreFaturamentodados + dados.lojasG.valorImpostoSobreFaturamento,
  //       dados.terrenos.valorImpostoSobreFaturamento,
  //       dados.lojasP.valorImpostoSobreFaturamento,
  //       dados.lojasM.valorImpostoSobreFaturamento,
  //       dados.lojasG.valorImpostoSobreFaturamento]
  // })
  // },[dados.lojasP.valorImpostoSobreFaturamento])

  // useEffect(() => {
  //   if (dados.dia % 30 === 0) {
  //     const valorimpostoMensalAtual = dados.imposto.impostoMensal
      
  //    })
  //   }
  // }, [dados.dia])


  useEffect(() => {
    // Verifica se é necessário atualizar as despesas e o estado modal
    if (dados.dia % 30 === 0) {
      atualizarDados({ ...dados.despesas, despesasPagas: false })


    }
    if (dados.dia % 30 === 0 && !dados.despesas.despesasPagas) {
      const novasDespesas = { ...dados.despesas, despesasPagas: false };
      const novoEstado = { ...dados, modal: { ...dados.modal, estadoModal: true } };
      atualizarDados('despesas', novasDespesas);
      atualizarDados('modal', { ...dados.modal, estadoModal: true });
      // Chame o modelo de pagar dívidas aqui
    }
  }, [dados.dia, dados.despesas.despesasPagas]);


  const PagarDespesas = () => {
    if (dados.despesas.despesasPagas) {
      return alert("Despesas desse mês já foram pagas.");
    } else {

      const novoSaldo = dados.saldo - dados.imposto.impostoMensal;
      atualizarDados('saldo', novoSaldo);
      atualizarDados('despesas', { ...dados.despesas, despesasPagas: true });
      console.log(dados.saldo)




      alert("Despesas pagas.");
    }
  };

  return (
    <div className="flex">
      <button className="w-[50%] w-max-[70px] w-full aspect-square bg-laranja rounded-[20px] flex items-center justify-center "
        onClick={PagarDespesas}><img className="w-[60%] w-max-[58px] aspect-square" src={despesasImg} /></button>
    </div>
  )
}
