import React, { useState, useContext, useEffect } from 'react';
import { CentraldeDadosContext } from '../centralDeDadosContext';

const Events = () => {
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  const [sorteioAtivo, setSorteioAtivo] = useState(false);











  useEffect(() => {
    // Verifica se é necessário atualizar as despesas e o estado modal
    if (dados.dia % 30 === 0 && !dados.despesas.despesasPagas) {
      const novasDespesas = { ...dados.despesas, despesasPagas: false };
      const novoEstado = { ...dados, modal: { ...dados.modal, estadoModal: true } };
      atualizarDados('despesas', novasDespesas);
      atualizarDados('modal', { ...dados.modal, estadoModal: true }); 
      // Chame o modelo de pagar dívidas aqui
    }
  }, [dados.dia, dados.despesas.despesasPagas]);


  useEffect(() => {
    if (dados.iniciarSorteio) {
        const evento = centralResultado();
        atualizarDados('eventoAtual', evento);
        atualizarDados('iniciarSorteio', false); // Resetar iniciarSorteio após o sorteio
         console.log("Estado do modal após atualização:", dados.modal.estadoModal);
        // Após atualizar o evento atual, verifique o estado do modal
        atualizarDados('modal', { ...dados.modal, estadoModal: true }); 
        
        // Aqui você pode acessar o estado atualizado do modal
        console.log(dados.modal.estadoModal);
    }
}, [dados.iniciarSorteio, atualizarDados]);


  const centralResultado = () => {
    
    
    
    
    
    
    
    
    const selecionarItem = (lista) => lista[Math.floor(Math.random() * lista.length)];
    const todasLojas = ["lojas pequenas", "lojas médias", "lojas grandes"];
    const situacao = ["aumento", "queda"];
    const porcentagem = [1, 3, 5, 7, 10, 15, 20, 30];
    const periodo = [3, 7, 15, 30];
    //
    const modalEvents = ["modalDespesas","modalFaturamento","modalImpostos","modalFuncionários"]
    //
    
    if(modalEvents == "modalDespesas"){

    }else if(modalEvents == "modalFaturamento"){

    }else if(modalEvents == "modalImpostos"){

    }else if(modalEvents == "modalFuncionários"){
    
    }















    const modalFuncionários = {
     custo :dados.funcionários.custo,
     custoMínimo :dados.funcionários.custoMínimo,
     custoMáximo :dados.funcionários.custoMáximo,
    }

    const eventosCustoFunc = ["custoMínimoFunc","custoMáximoFunc"]
    

    const novoEvento = {};
    const novoCustoFunc = {};
    novoCustoFunc.title = selecionarItem(todasLojas);
    novoCustoFunc.custo = selecionarItem(todasLojas);
    novoCustoFunc.custoMínimo = selecionarItem(todasLojas);
    novoCustoFunc.custoMáximo = selecionarItem(todasLojas);



  
    novoEvento.title = `As ${selecionarItem(todasLojas)} terão ${selecionarItem(situacao)} de faturamento de ${selecionarItem(porcentagem)}% durante o período de ${selecionarItem(periodo)} dias`;
    novoEvento.LojaSelecionada = selecionarItem(todasLojas);
    novoEvento.situacaoSelecionada = selecionarItem(situacao);
    novoEvento.porcentagemSelecionada = selecionarItem(porcentagem);
    novoEvento.periodoSelecionado = selecionarItem(periodo);
  
    return novoEvento;
  };
  
  return (
    <div>

    {/* <div className='bg-black flex justify-center items-center z-20'>
      <button onClick={() =>{
        atualizarDados('iniciarSorteio', true)
        console.log(dados.modal.estadoModal)
        
      }
    } className='bg-white'>Sortear</button>
      <p className='text-white'>Este será o tipo de evento selecionado: {dados.eventoAtual.title}</p>
    </div> */}
    </div>
  );
};

export default Events;