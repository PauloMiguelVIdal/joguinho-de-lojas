import React, { useState, useContext, useEffect } from 'react';
import { CentraldeDadosContext } from '../centralDeDadosContext';

const Events = () => {
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  const [sorteioAtivo, setSorteioAtivo] = useState(false);

  useEffect(() => {
    if (dados.iniciarSorteio) {
      const evento = centralResultado();
      atualizarDados('eventoAtual', evento);
      console.log(dados.iniciarSorteio)
      atualizarDados('iniciarSorteio', false); // Resetar o iniciarSorteio após o sorteio
      console.log(dados.iniciarSorteio)
      console.log("Evento sorteado:", evento);
      console.log(dados.eventoAtual);
    }
  }, [dados.iniciarSorteio, atualizarDados]);

  const centralResultado = () => {
    const selecionarItem = (lista) => lista[Math.floor(Math.random() * lista.length)];
    const todasLojas = ["lojas pequenas", "lojas médias", "lojas grandes"];
    const situacao = ["aumento", "queda"];
    const porcentagem = [1, 3, 5, 7, 10, 15, 20, 30];
    const periodo = [3, 7, 15, 30];

    return `As ${selecionarItem(todasLojas)} terão ${selecionarItem(situacao)} de faturamento de ${selecionarItem(porcentagem)}% durante o período de ${selecionarItem(periodo)} dias`
    // {
      // evento: 
      // `As ${selecionarItem(todasLojas)} terão ${selecionarItem(situacao)} de faturamento de ${selecionarItem(porcentagem)}% durante o período de ${selecionarItem(periodo)} dias`
      // ,
      // LojaSelecionada: selecionarItem(todasLojas),
      // situacaoSelecionada: selecionarItem(situacao),
      // porcentagemSelecionada: selecionarItem(porcentagem),
      // periodoSelecionado: selecionarItem(periodo)
    // };
  };

  return (
    <div className='bg-black flex justify-center items-center z-20'>
      <button onClick={() => atualizarDados('iniciarSorteio', true)} className='bg-white'>Sortear</button>
      <p>Este será o tipo de evento selecionado: {dados.eventoAtual.evento}</p>
    </div>
  );
};

export default Events;

