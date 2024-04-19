import React, { useState } from 'react';

const Events = () => {

  const centralResultado = () => {
    const selecionarItem = (lista) => lista[Math.floor(Math.random() * lista.length)];
    const todasLojas = ["lojas pequenas", "lojas médias", "lojas grandes"];
    const situação = ["aumento", "queda"];
    const porcentagem = [1, 3, 5, 7, 10, 15, 20, 30];
    const periodo = [3, 7, 15, 30];

    return {
      evento: `As ${selecionarItem(todasLojas)} terão ${selecionarItem(situação)} de faturamento de ${selecionarItem(porcentagem)}% durante o período de ${selecionarItem(periodo)} dias`,
      LojaSelecionada: selecionarItem(todasLojas),
      situaçãoSelecionada: selecionarItem(situação),
      porcentagemSelecionada: selecionarItem(porcentagem),
      periodoSelecionado: selecionarItem(periodo)
    };
  }

  const [eventoAtual, setEventoAtual] = useState("");

  const testar = () => {
    const evento = centralResultado();
    console.log(evento);
    return evento;
  }

  const testandoTudo = () => {
    const novoEvento = testar();
    setEventoAtual(novoEvento);
    console.log(eventoAtual);
  }

  return (
    <div className='bg-black flex justify-center items-center z-20'>
      <button onClick={testandoTudo} className='bg-white'>sortear</button>
      <p>Este será o tipo de evento selecionado: {eventoAtual.evento}</p>
    </div>
  );

}

export default Events;