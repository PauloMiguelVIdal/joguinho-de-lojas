import React, { useState, useContext, useEffect } from 'react';
import { CentraldeDadosContext } from '../centralDeDadosContext';
import { use } from 'react';

function Events(){
  
  
  
  
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  const [sorteioAtivo, setSorteioAtivo] = useState(false);

  useEffect(()=>{
    if(dados.eventoAtual.eventoAtivo===true){
        atualizarDados("chanceNovoEvento",0)
        console.log("testando useEffect")
        console.log(dados.chanceNovoEvento)
    }
},[dados.eventoAtual])

useEffect(()=>{
  if(dados.dia===2){
      atualizarDados("chanceNovoEvento",20)
       }
},[dados.dia])


useEffect(()=>{
  if(dados.dia===30){

  atualizarDados("relatóriosFaturamento", { ...dados.relatóriosFaturamento,[dados.dia]:
    {
      "terrenos":dados.terrenos.faturamentoMensal,
      "lojasP":dados.lojasP.faturamentoMensal,
      "lojasM":dados.lojasM.faturamentoMensal,
      "lojasG":dados.lojasG.faturamentoMensal}
  })

    dados.faturamento.faturamentoMensal = 0;
    atualizarDados("faturamento", dados.faturamento);   
       }
},[dados.dia])





//se o evento atual for mudaddo ele verifica se está verdadeiro e ai modificado a chance
  
  useEffect(()=>{
    if(dados.dia === dados.eventoAtual.diaFinal){
      atualizarDados("eventoAtual",{...dados.eventoAtual,eventoAtivo:false})
      atualizarDados("chanceNovoEvento",20)
    }
    console.log("use effect chamado")
    console.log(dados.eventoAtual.eventoAtivo)
  }
  ,[dados.dia])
  //atualiza a chance de acontecer um evento quando não se tem nenhum evento ativo

  useEffect(()=>{


    const conversorTodasLojas = () => {
      switch (`${dados.eventoAtual.lojaSelecionada}`) {
          case "terrenos":
              return "terrenos";
          case "lojas pequenas":
              return "lojasP";
          case "lojas médias":
              return "lojasM";
          case "lojas grandes":
              return "lojasG";
          default:
              return "nada";
      }
  }

  console.log(conversorTodasLojas())
  const conversorDepartmentEvents = () => {
      switch (`${dados.eventoAtual.departamento}`) {
          case "custos de construção":
              return "preçoConstrução";

          case "faturamento":
              return "faturamentoUnitárioPadrão";

          case "imposto fixo":
              return "impostoFixo";

          // case "despesas de funcionários":
          //     return "custoFuncionário";

          default:
              return "nada";
      }
  }

console.log(conversorDepartmentEvents())

  const conversorSituacao = () => {
      switch (`${dados.eventoAtual.situacaoSelecionada}`) {
          case "crescimento":
              return "+";
          default:
              return "-";
      }
  }

console.log(conversorSituacao())

const valorInicial = () => dados[conversorTodasLojas()][conversorDepartmentEvents()]
// console.log(valorInicial())

// const calcular = (valor, porcentagem, operador) => {
//   switch (operador) {
//       case "+":
//           return valor * (1 + porcentagem);
//       case "-":
//           return valor * (1 - porcentagem);
//       default:
//           throw new Error("Operador inválido");
//   }
// };


// const calcularEvento = () => {
//   const valor = valorInicial();
//   const porcentagem = parseInt(dados.eventoAtual.porcentagemSelecionada) / 100;
//   const operador = conversorSituacao();

//   return Math.round(calcular(valor, porcentagem, operador) * 100) / 100;
// };



// const novoValor = calcularEvento(); // Calcula o valor
// console.log(novoValor)



    if(dados.eventoAtual.eventoAtivo===true){
      atualizarDados("lojasP",{...dados.lojasP,preçoContrução:2000})
      console.log("testeeeeeeeeeeeeeeee")
    }

  },[dados.eventoAtual.eventoAtivo])







  function nãoRodarLoop(){

  


const eventosCustoFunc = ["custoMínimoFunc", "custoMáximoFunc"];
const eventosCustoF = ["custo mínimo", "custo máximo"];




}
// const calcularNovoFaturamento = (valorInicial, situacao, porcentagem) => {
//   // Converte a porcentagem para decimal
//   const porcentagemDecimal = porcentagem / 100;
  
//   // Calcula o valor final com base na situação (aumento ou queda)
//   const novoValor = situacao === "aumento" ? valorInicial * (1 + porcentagemDecimal) : valorInicial * (1 - porcentagemDecimal);
  
//   // Retorna o novo valor formatado
//   return `${novoValor.toFixed(2)}`;
// };


// const centralResultado = () => {

      
//       // console.log("chegou aqui")

//       // Função para atualizar os dados do banco de dados
//       const atualizarDadosBD = () => {
//           // Lógica para atualizar os dados de acordo com o tipo de loja
//           switch (novoEvento.LojaSelecionada) {
//             case "terrenos":
//               const novoFaturamentoMinimoTerrenos = calcularNovoFaturamento(dados.terrenos.faturamentoMínimo, novoEvento.situacaoSelecionada, novoEvento.porcentagemSelecionada);
//               const novoFaturamentoMaximoTerrenos = calcularNovoFaturamento(dados.terrenos.faturamentoMáximo, novoEvento.situacaoSelecionada, novoEvento.porcentagemSelecionada);
//               atualizarDados('terrenos', {
//                   ...dados.terrenos,
//                   faturamentoMínimo: novoFaturamentoMinimoTerrenos,
//                   faturamentoMáximo: novoFaturamentoMaximoTerrenos
//               });
//               console.log("Novo faturamento mínimo dos terrenos:", novoFaturamentoMinimoTerrenos);
//               console.log("Novo faturamento máximo dos terrenos:", novoFaturamentoMaximoTerrenos);
//               break;
//               case "lojas pequenas":
//                   const novoFaturamentoMinimoP = calcularNovoFaturamento(dados.lojasP.faturamentoMínimo, novoEvento.situacaoSelecionada, novoEvento.porcentagemSelecionada);
//                   const novoFaturamentoMaximoP = calcularNovoFaturamento(dados.lojasP.faturamentoMáximo, novoEvento.situacaoSelecionada, novoEvento.porcentagemSelecionada);
//                   atualizarDados('lojasP', {
//                       ...dados.lojasP,
//                       faturamentoMínimo: novoFaturamentoMinimoP,
//                       faturamentoMáximo: novoFaturamentoMaximoP
//                   });
//                   console.log("Novo faturamento mínimo das lojas pequenas:", novoFaturamentoMinimoP);
//                   console.log("Novo faturamento máximo das lojas pequenas:", novoFaturamentoMaximoP);
//                   break;
//               case "lojas médias":
//                   const novoFaturamentoMinimoM = calcularNovoFaturamento(dados.lojasM.faturamentoMínimo, novoEvento.situacaoSelecionada, novoEvento.porcentagemSelecionada);
//                   const novoFaturamentoMaximoM = calcularNovoFaturamento(dados.lojasM.faturamentoMáximo, novoEvento.situacaoSelecionada, novoEvento.porcentagemSelecionada);
//                   atualizarDados('lojasM', {
//                       ...dados.lojasM,
//                       faturamentoMínimo: novoFaturamentoMinimoM,
//                       faturamentoMáximo: novoFaturamentoMaximoM
//                   });
//                   console.log("Novo faturamento mínimo das lojas médias:", novoFaturamentoMinimoM);
//                   console.log("Novo faturamento máximo das lojas médias:", novoFaturamentoMaximoM);
//                   break;
//               case "lojas grandes":
//                   const novoFaturamentoMinimoG = calcularNovoFaturamento(dados.lojasG.faturamentoMínimo, novoEvento.situacaoSelecionada, novoEvento.porcentagemSelecionada);
//                   const novoFaturamentoMaximoG = calcularNovoFaturamento(dados.lojasG.faturamentoMáximo, novoEvento.situacaoSelecionada, novoEvento.porcentagemSelecionada);
//                   atualizarDados('lojasG', {
//                       ...dados.lojasG,
//                       faturamentoMínimo: novoFaturamentoMinimoG,
//                       faturamentoMáximo: novoFaturamentoMaximoG
//                   });
//                   console.log("Novo faturamento mínimo das lojas grandes:", novoFaturamentoMinimoG);
//                   console.log("Novo faturamento máximo das lojas grandes:", novoFaturamentoMaximoG);
//                   break;
//               default:
//                   break;
//           }
//       };

//       // Chama a função para atualizar os dados do banco de dados
//       atualizarDadosBD();
//       console.log("Dados atualizados:", novoEvento);
//       console.log("aqui")
//       return novoEvento;
//   }
;

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
