import React, { useContext, useEffect } from 'react';
import { CentraldeDadosContext } from '../centralDeDadosContext';
import PróximoImg from "../imagens/proximo.png";
import Sorteio from './Sorteio';


export default function NextDay() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext);
    const todasLojas = [
        "terrenos",
        "lojasP"
        , "lojasM",
        "lojasG"
    ];





    const ProximoDia = () => {
        console.log(dados.despesas);
        atualizarDados('despesas', { ...dados.despesas, despesasPagas: false });
        if (dados.dia % 30 === 0 && !dados.despesas.despesasPagas) {
            alert("Você não pode avançar para o próximo dia sem pagar as despesas.");

            return; // Impede o avanço do dia se as despesas não forem pagas
        }
        if (dados.dia % 30 === 0){

            atualizarDados("relatóriosFaturamento",{...dados.relatóriosFaturamento,[dados.dia]:dados.faturamento.faturamentoMensal})
            dados.faturamento.faturamentoMensal = 0;
            atualizarDados("faturamento", dados.faturamento);
            // return alert("foiii")
        }


        const novoDia = dados.dia + 1;





        atualizarDados('dia', novoDia);

        // atualizarDados('eventoAtual', { ...dados.eventoAtual, eventoAtivo: true });





        funçãoFaturamentoGenérico()


        console.log("Dados atualizados:", dados)
        console.log(dados.saldo)
        console.log(dados.eventoAtual)
        console.log(dados.modal.estadoModal)
        if (dados.iniciarSorteio) {
            console.log(dados.eventoAtual)
        }


    };

    let faturamentoTotalDiário = 0;
    let faturamentoTotalMensal = 0;
    const funçãoFaturamentoGenérico = () => {
     
        todasLojas.forEach(edifícioSelecionado => {

            const valorUnitárioPadrão = dados[edifícioSelecionado].faturamentoUnitárioPadrão

            console.log(`valor unitário padrão ${valorUnitárioPadrão}`)
            const valorPadrãoMáximo = valorUnitárioPadrão * (1 + 0.3).toFixed(2)
            const valorPadrãoMínimo = valorUnitárioPadrão * (1 - 0.3).toFixed(2)
            const valorMáximo = parseFloat(valorPadrãoMáximo)
            const valorMínimo = parseFloat(valorPadrãoMínimo)
  

            const novoValorVariável = (Math.floor(Math.random() * (valorMáximo - valorMínimo + 1)) + valorMínimo).toFixed(2);
            const faturamentoTotalGenérico = (novoValorVariável * dados[edifícioSelecionado].quantidade).toFixed(2)
            console.log(`esse é o novo valor variável de ${edifícioSelecionado}`, novoValorVariável)

            faturamentoTotalDiário += parseFloat(faturamentoTotalGenérico)
            console.log(faturamentoTotalGenérico);






const conversorFatuDiário = faturamentoTotalDiário

const faturamentoMensalAtualizado = conversorFatuDiário + (dados.faturamento.faturamentoMensal)





            atualizarDados("saldo", dados.saldo + faturamentoTotalDiário)


            atualizarDados("faturamento", {
                ...dados.faturamento, faturamentoDiário: faturamentoTotalDiário, faturamentoMensal:faturamentoMensalAtualizado
            })






            atualizarDados(`${edifícioSelecionado}`, {
                ...dados[edifícioSelecionado], faturamentoUnitário: novoValorVariável,
                faturamentoTotal: faturamentoTotalGenérico
            })
          

    
        })

    }








    // const gerarFaturamentoTerrenos = () => {
    //     const novoFatuUnitárioTerreno = Math.floor(Math.random() * (dados.terrenos.faturamentoMáximo - dados.terrenos.faturamentoMínimo + 1)) + dados.terrenos.faturamentoMínimo;
    //     const faturamentoTotalTerrenos = (novoFatuUnitárioTerreno * dados.terrenos.quantidade).toFixed(2);
    //     atualizarDados('terrenos', {
    //         ...dados.terrenos,
    //         faturamentoUnitário: novoFatuUnitárioTerreno,
    //         faturamentoTotal: faturamentoTotalTerrenos
    //     });
    // };

    // const gerarFaturamentoLojasP = () => {
    //     const novoFatuUnitárioLojaP = Math.floor(Math.random() * (dados.lojasP.faturamentoMáximo - dados.lojasP.faturamentoMínimo + 1)) + parseInt(dados.lojasP.faturamentoMínimo);
    //     const faturamentoTotalLojaP = (novoFatuUnitárioLojaP * dados.lojasP.quantidade).toFixed(2);
    //     atualizarDados('lojasP', {
    //         ...dados.lojasP,
    //         faturamentoUnitário: novoFatuUnitárioLojaP.toFixed(2),
    //         faturamentoTotal: faturamentoTotalLojaP
    //     });
    // };

    // const gerarFaturamentoLojasM = () => {
    //     const novoFatuUnitárioLojaM = Math.floor(Math.random() * (dados.lojasM.faturamentoMáximo - dados.lojasM.faturamentoMínimo + 1)) + parseInt(dados.lojasM.faturamentoMínimo);
    //     const faturamentoTotalLojaM = (novoFatuUnitárioLojaM * dados.lojasM.quantidade).toFixed(2);
    //     atualizarDados('lojasM', {
    //         ...dados.lojasM,
    //         faturamentoUnitário: novoFatuUnitárioLojaM.toFixed(2),
    //         faturamentoTotal: faturamentoTotalLojaM
    //     });
    // };

    // const gerarFaturamentoLojasG = () => {
    //     const novoFatuUnitárioLojaG = Math.floor(Math.random() * (dados.lojasG.faturamentoMáximo - dados.lojasG.faturamentoMínimo + 1)) + parseInt(dados.lojasG.faturamentoMínimo);
    //     const faturamentoTotalLojaG = (novoFatuUnitárioLojaG * dados.lojasG.quantidade).toFixed(2);
    //     atualizarDados('lojasG', {
    //         ...dados.lojasG,
    //         faturamentoUnitário: novoFatuUnitárioLojaG.toFixed(2),
    //         faturamentoTotal: faturamentoTotalLojaG
    //     });
    // };

    return (

        <div className="grid col-start-1 col-end-3 row-2">
            <button className="w-[100px] h-[100px] bg-laranja rounded-[20px] flex items-center justify-center mr-[10px]" onClick={ProximoDia}>
                <img className="w-[72px] h-[72px]" src={PróximoImg} />
            </button>
            <Sorteio />
        </div>
    )
}




