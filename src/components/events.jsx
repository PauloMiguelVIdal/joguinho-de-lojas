import React, { useState, useContext, useEffect } from 'react';
import { CentraldeDadosContext } from '../centralDeDadosContext';

const Events = () => {
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  const [sorteioAtivo, setSorteioAtivo] = useState(false);

  const eventoDefault = {
    eventoAtivo:false,  
    type:"",
      title:"",
      LojaSelecionada: "",
      situacaoSelecionada: "",
      porcentagemSelecionada: "",
      periodoSelecionado: "",
      diaInicial:"",
      diaFinal:"",
  }

//01
  useEffect(() => {
      console.log(dados.dia)
    // Verifica se os dados e o evento atual estão definidos antes de prosseguir
    if (dados && dados.eventoAtual) {
      const eventoTerminado = dados.dia > dados.eventoAtual.diaFinal;
  
      if (eventoTerminado && dados.eventoAtual.eventoAtivo) {
        // Atualiza o estado do evento para desativado
        atualizarDados({ ...dados.eventoAtual, eventoAtivo: false });
        console.log("Evento finalizado e desativado.");
      }
    }
  }, [dados?.dia, dados?.eventoAtual?.diaFinal, dados?.eventoAtual?.eventoAtivo]);
  
  
  //
// o problema a cima foi solucionado graças ao  "?." que uitiliza dos operadores opcionais que servem para uso de segurança e par evitar erros por conta que se certificam que ele ira não ira
//causa erro porem ainda pode se tratar de um erro de undefined















// useEffect(() => {
  //   // Verifica se é necessário atualizar o evento atual e desativá-lo
//   if (dados.dia > dados.eventoAtual.diaFinal && dados.eventoAtual.eventoAtivo === true) {
//     atualizarDados('eventoAtual', {...dados.eventoAtual,eventoAtivo: false});
//     atualizarDados('eventoAtual', eventoDefault);
//   }
// });







const calcularNovoFaturamento = (valorInicial, situacao, porcentagem) => {
  // Converte a porcentagem para decimal
  const porcentagemDecimal = porcentagem / 100;

  // Calcula o valor final com base na situação (aumento ou queda)
  const novoValor = situacao === "aumento" ? valorInicial * (1 + porcentagemDecimal) : valorInicial * (1 - porcentagemDecimal);

  // Retorna o novo valor formatado
  return `${novoValor.toFixed(2)}`;
};

const centralResultado = () => {
  
  
  // Objeto para armazenar os detalhes do evento atual
  const novoEvento = {};
  
  
  // novoPeriodoDeEvento
  // atualizarDados({...dados.eventoAtual,diaInicial:{...dados.dia}})
  
  
  // Função para decidir o valor da situação

  
  if (novoEventoSelecionado === "modalDespesas") {
      // Lógica para o evento modal de despesas
  } else if (novoEventoSelecionado === "modalFaturamento") {
    novoEvento.periodoSelecionado = selecionarItem(periodo);
    novoEvento.LojaSelecionada = selecionarItem(todasLojas);
    novoEvento.situacaoSelecionada = selecionarItem(situacao);
    novoEvento.porcentagemSelecionada = selecionarItem(porcentagem);
    const novaDataFinal = parseInt(novaDataInicial) + novoEvento.periodoSelecionado;      // Lógica para o evento modal de faturamento
      novoEvento.diaInicial = novaDataInicial;
      novoEvento.diaFinal = novaDataFinal
      novoEvento.title = `As ${novoEvento.LojaSelecionada} terão ${novoEvento.situacaoSelecionada} de faturamento de ${novoEvento.porcentagemSelecionada}% durante o período de ${novoEvento.periodoSelecionado} dias`;
      console.log(novoEvento.periodoSelecionado)
     
      
      
      // console.log("chegou aqui")

      // Função para atualizar os dados do banco de dados
      const atualizarDadosBD = () => {
          // Lógica para atualizar os dados de acordo com o tipo de loja
          switch (novoEvento.LojaSelecionada) {
            case "terrenos":
              const novoFaturamentoMinimoTerrenos = calcularNovoFaturamento(dados.terrenos.faturamentoMínimo, novoEvento.situacaoSelecionada, novoEvento.porcentagemSelecionada);
              const novoFaturamentoMaximoTerrenos = calcularNovoFaturamento(dados.terrenos.faturamentoMáximo, novoEvento.situacaoSelecionada, novoEvento.porcentagemSelecionada);
              atualizarDados('terrenos', {
                  ...dados.terrenos,
                  faturamentoMínimo: novoFaturamentoMinimoTerrenos,
                  faturamentoMáximo: novoFaturamentoMaximoTerrenos
              });
              console.log("Novo faturamento mínimo dos terrenos:", novoFaturamentoMinimoTerrenos);
              console.log("Novo faturamento máximo dos terrenos:", novoFaturamentoMaximoTerrenos);
              break;
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
      console.log("Dados atualizados:", novoEvento);
      
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
