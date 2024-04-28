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
        const evento = centralResultado(); // Chama centralResultado sem passar dados como argumento
        atualizarDados('eventoAtual', evento);
        atualizarDados('iniciarSorteio', false); // Resetar iniciarSorteio após o sorteio
         console.log("Estado do modal após atualização:", dados.modal.estadoModal);
        // Após atualizar o evento atual, verifique o estado do modal
        atualizarDados('modal', { ...dados.modal, estadoModal: true }); 
        
        // Aqui você pode acessar o estado atualizado do modal
        console.log(dados.modal.estadoModal);
    }
}, [dados.iniciarSorteio, atualizarDados]);


const calcularNovoFaturamento = (valorInicial, situacao, porcentagem) => {
    // Converte a porcentagem para decimal
    const porcentagemDecimal = porcentagem / 100;

    // Calcula o valor final com base na situação (aumento ou queda)
    const novoValor = situacao === "aumento" ? valorInicial * (1 + porcentagemDecimal) : valorInicial * (1 - porcentagemDecimal);

    // Retorna o novo valor formatado
    return `${novoValor.toFixed(2)}`;
};

const centralResultado = () => {
  // Função para selecionar um item aleatório de uma lista
  const selecionarItem = (lista) => lista[Math.floor(Math.random() * lista.length)];

  // Lista de eventos modais
  const modalEvents = [
    // "modalDespesas", 
    "modalFaturamento"
    // , "modalImpostos", "modalFuncionários"
  ];

  // Seleciona um evento modal aleatório
  const novoEventoSelecionado = selecionarItem(modalEvents);

  // Define as opções para diferentes tipos de eventos
  const todasLojas = ["lojas pequenas", "lojas médias", "lojas grandes"];
  const situacao = ["aumento", "queda"];
  const porcentagem = [1, 3, 5, 7, 10, 15, 20, 30];
  const periodo = [3, 7, 15, 30];
  const eventosCustoFunc = ["custoMínimoFunc", "custoMáximoFunc"];
  const eventosCustoF = ["custo mínimo", "custo máximo"];

  // Objeto para armazenar os detalhes do evento atual
  const novoEvento = {};


// novoPeriodoDeEvento
// atualizarDados({...dados.eventoAtual,diaInicial:{...dados.dia}})


  // Função para decidir o valor da situação
  const decidirValorSituacao = () => {
      return situacao[0] === "aumento" ? "" : "-";
  };

  // Variável para armazenar o valor da situação
  const valorSituacao = decidirValorSituacao();

  if (novoEventoSelecionado === "modalDespesas") {
      // Lógica para o evento modal de despesas
  } else if (novoEventoSelecionado === "modalFaturamento") {
      // Lógica para o evento modal de faturamento
      novoEvento.LojaSelecionada = selecionarItem(todasLojas);
      novoEvento.situacaoSelecionada = selecionarItem(situacao);
      novoEvento.porcentagemSelecionada = selecionarItem(porcentagem);
      novoEvento.periodoSelecionado = selecionarItem(periodo);
      novoEvento.title = `As ${novoEvento.LojaSelecionada} terão ${novoEvento.situacaoSelecionada} de faturamento de ${novoEvento.porcentagemSelecionada}% durante o período de ${novoEvento.periodoSelecionado} dias`;

      // Função para atualizar os dados do banco de dados
      const atualizarDadosBD = () => {
          // Lógica para atualizar os dados de acordo com o tipo de loja
          switch (novoEvento.LojaSelecionada) {
              case "lojas pequenas":
                  const novoFaturamentoMinimoP = calcularNovoFaturamento(dados.lojasP.faturamentoMínimo, novoEvento.situacaoSelecionada, novoEvento.porcentagemSelecionada);
                  const novoFaturamentoMaximoP = calcularNovoFaturamento(dados.lojasP.faturamentoMáximo, novoEvento.situacaoSelecionada, novoEvento.porcentagemSelecionada);
                  atualizarDados('lojasP', {
                      ...dados.lojasP,
                      faturamentoMínimo: novoFaturamentoMinimoP,
                      faturamentoMáximo: novoFaturamentoMaximoP
                  });
                  console.log("Novo faturamento mínimo das lojas pequenas:", novoFaturamentoMinimoP);
                  console.log("Novo faturamento máximo das lojas pequenas:", novoFaturamentoMaximoP);
                  break;
              case "lojas médias":
                  const novoFaturamentoMinimoM = calcularNovoFaturamento(dados.lojasM.faturamentoMínimo, novoEvento.situacaoSelecionada, novoEvento.porcentagemSelecionada);
                  const novoFaturamentoMaximoM = calcularNovoFaturamento(dados.lojasM.faturamentoMáximo, novoEvento.situacaoSelecionada, novoEvento.porcentagemSelecionada);
                  atualizarDados('lojasM', {
                      ...dados.lojasM,
                      faturamentoMínimo: novoFaturamentoMinimoM,
                      faturamentoMáximo: novoFaturamentoMaximoM
                  });
                  console.log("Novo faturamento mínimo das lojas médias:", novoFaturamentoMinimoM);
                  console.log("Novo faturamento máximo das lojas médias:", novoFaturamentoMaximoM);
                  break;
              case "lojas grandes":
                  const novoFaturamentoMinimoG = calcularNovoFaturamento(dados.lojasG.faturamentoMínimo, novoEvento.situacaoSelecionada, novoEvento.porcentagemSelecionada);
                  const novoFaturamentoMaximoG = calcularNovoFaturamento(dados.lojasG.faturamentoMáximo, novoEvento.situacaoSelecionada, novoEvento.porcentagemSelecionada);
                  atualizarDados('lojasG', {
                      ...dados.lojasG,
                      faturamentoMínimo: novoFaturamentoMinimoG,
                      faturamentoMáximo: novoFaturamentoMaximoG
                  });
                  console.log("Novo faturamento mínimo das lojas grandes:", novoFaturamentoMinimoG);
                  console.log("Novo faturamento máximo das lojas grandes:", novoFaturamentoMaximoG);
                  break;
              default:
                  break;
          }
      };

      // Chama a função para atualizar os dados do banco de dados
      atualizarDadosBD();

      return novoEvento;
  }
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
