import React, { useState, useContext, useEffect } from 'react';
import { CentraldeDadosContext } from '../centralDeDadosContext';

const Events = () => {
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  const [sorteioAtivo, setSorteioAtivo] = useState(false);

  useEffect(() => {
    if (dados.iniciarSorteio) {
      const evento = centralResultado();
      console.log(dados.iniciarSorteio)
      atualizarDados('eventoAtual', evento);
      atualizarDados('eventoAtual', evento);
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
  
    const novoEvento = {};
  
    novoEvento.title = `As ${selecionarItem(todasLojas)} terão ${selecionarItem(situacao)} de faturamento de ${selecionarItem(porcentagem)}% durante o período de ${selecionarItem(periodo)} dias`;
    novoEvento.LojaSelecionada = selecionarItem(todasLojas);
    novoEvento.situacaoSelecionada = selecionarItem(situacao);
    novoEvento.porcentagemSelecionada = selecionarItem(porcentagem);
    novoEvento.periodoSelecionado = selecionarItem(periodo);
  
    // Atualizar apenas as chaves do evento atual
    atualizarDados('eventoAtual', {
      ...dados.eventoAtual,
      ...novoEvento
    });
  
    return novoEvento;
  };
  
  return (
    <div className='bg-black flex justify-center items-center z-20'>
      <button onClick={() => atualizarDados('iniciarSorteio', true)} className='bg-white'>Sortear</button>
      <p>Este será o tipo de evento selecionado: {dados.eventoAtual.evento}</p>
    </div>
  );
};

export default Events;

