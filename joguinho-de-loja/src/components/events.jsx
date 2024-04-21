import React, { useState, useContext } from 'react';
import { CentraldeDadosContext } from '../centralDeDadosContext';

const Events = () => {
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);

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

  const gerarEvento = () => {
    const evento = centralResultado();
    atualizarDados({...dados, eventoAtual: evento});
    console.log(evento);
    return evento;
  }

  const iniciarSorteio = () => {
    const novoEvento = gerarEvento();
    setEventoAtual(novoEvento);
  }

  return (
    <div className='bg-black flex justify-center items-center z-20'>
      <button onClick={iniciarSorteio} className='bg-white'>sortear</button>
      <p>Este será o tipo de evento selecionado: {eventoAtual.evento}</p>
    </div>
  );
}

export default Events;
