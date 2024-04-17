import React, { useState } from 'react';

const Events = (props) => {


  const centralResultado = () => {
    const selecionarLojaNova = () => {
      const todasLojas = ["lojas pequenas", "lojas médias", "lojas grandes"];
      const parametrosLojaSelecionada = Math.floor(Math.random() * todasLojas.length);
      const novaLojaSelecionada = todasLojas[parametrosLojaSelecionada];
      return novaLojaSelecionada;
    }

    const novaLojaSelecionada = selecionarLojaNova();

    const selecionarSituação = () => {
      const situação = ["aumento", "queda"];
      const parametrosSituaçãoSelecionada = Math.floor(Math.random() * situação.length);
      const novaSituaçãoSelecionada = situação[parametrosSituaçãoSelecionada];
      return novaSituaçãoSelecionada;
    }

    const novaSituaçãoSelecionada = selecionarSituação();


    const selecionarPorcentagem = () => {
      const porcentagem = [1, 3, 5, 7, 10, 15, 20, 30];
      const parametrosPorcentagemSelecionada = Math.floor(Math.random() * porcentagem.length);
      const novaPorcentagemSelecionada = porcentagem[parametrosPorcentagemSelecionada];
      return novaPorcentagemSelecionada;
    }

    const novaPorcentagemSelecionada = selecionarPorcentagem();

    const selecionarPeriodo = () => {
      const periodo = [3, 7, 15, 30];
      const parametrosPeriodoSelecionado = Math.floor(Math.random() * periodo.length);
      const novoPeriodoSelecionado = periodo[parametrosPeriodoSelecionado];
      return novoPeriodoSelecionado;
    }

    const novoPeriodoSelecionado = selecionarPeriodo();





    const evento = {
      "evento": `As ${novaLojaSelecionada} terão ${novaSituaçãoSelecionada} de faturamento de ${novaPorcentagemSelecionada}% durante o periodo de ${novoPeriodoSelecionado} dias`,
      "LojaSelecionada": novaLojaSelecionada,
      "situaçãoSelecionada": novaSituaçãoSelecionada,
      "porcentagemSelecionada": novaPorcentagemSelecionada,
      "periodoSelecionado": novoPeriodoSelecionado
    }

    return evento;
  }


  const [eventoAtual,setEventoAtual] = useState("")

  
  const testar = () => {
    const evento = centralResultado();
    console.log(evento);
    return evento
  }

const testandoTudo = () =>{
  const novoEvento = testar()
   setEventoAtual(novoEvento)
   console.log(eventoAtual)
}


  return (
    <div className='bg-black flex justify-center items-center z-20'>
      <button onClick={testandoTudo} className='bg-white'>sortear</button>
      <p>Este será o tipo de evento selecionado: </p>
    </div>
  );

}

export default Events;
