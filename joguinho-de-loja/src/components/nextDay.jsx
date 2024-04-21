import React, { useContext } from 'react';
import { CentraldeDadosContext } from '../centralDeDadosContext';
import PróximoImg from "../imagens/proximo.png";
import despesasImg from "../imagens/despesas.png";


export default function NextDay() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext);

    const ProximoDia = () => {
        if (dados.dia % 30 === 0) {
            const novasDespesas = { ...dados.despesas, despesasPagas: false };
            atualizarDados('despesas', novasDespesas); 
            if (!dados.despesas.despesasPagas) {
                const novoEstado = { ...dados, estadoModal: true };
                atualizarDados('estadoModal', true);
                return;
            }
        }
        



        const chanceNovoEvento = 50

        const sortearNovoEvento = () => {
            const probabilidade = Math.random() * 100
            if (probabilidade <= chanceNovoEvento) {
                console.log("sorteio ocorreu")
                console.log(dados.iniciarSorteio)
                atualizarDados('estadoModal', true);
                atualizarDados('iniciarSorteio', true);
                console.log(dados.iniciarSorteio)
            }
        }
        


        const novoDia = dados.dia + 1;
        const saldoAtualizado =
            dados.saldo +
            dados.terrenos.quantidade * dados.terrenos.faturamentoUnitário +
            dados.lojasP.quantidade * dados.lojasP.faturamentoUnitário +
            dados.lojasM.quantidade * dados.lojasM.faturamentoUnitário +
            dados.lojasG.quantidade * dados.lojasG.faturamentoUnitário;
        

        atualizarDados('dia', novoDia);
        atualizarDados('saldo', saldoAtualizado);
        // atualizarDados('eventoAtual', "evento");
        
        sortearNovoEvento();
        gerarFaturamentoTerrenos();
        gerarFaturamentoLojasP();
        gerarFaturamentoLojasM();
        gerarFaturamentoLojasG();
        console.log(dados.saldo)
        console.log(dados.eventoAtual)
        if(dados.iniciarSorteio){
            console.log(dados.eventoAtual)  
              }
        
        
    };

    const PagarDespesas = () => {
        if (dados.despesas.despesasPagas) {
            return alert("Despesas desse mês já foram pagas.");
        } else {

            const novoSaldo = dados.saldo - dados.despesas.despesasLojasP - dados.despesas.despesasLojasM - dados.despesas.despesasLojasG;
            // atualizarDados('saldo', novoSaldo);
            atualizarDados('despesas', { ...dados.despesas, despesasPagas: true });
            console.log(dados.saldo)
             alert("Despesas pagas.");
        }
    };
    
    const gerarFaturamentoTerrenos = () => {
        const novoFatuUnitárioTerreno = Math.floor(Math.random() * (dados.terrenos.faturamentoMáximo - dados.terrenos.faturamentoMínimo + 1)) + dados.terrenos.faturamentoMínimo;
        atualizarDados('terrenos', { 
            ...dados.terrenos, 
            faturamentoUnitário: novoFatuUnitárioTerreno,
            faturamentoTotal: novoFatuUnitárioTerreno * dados.terrenos.quantidade
        });
    };
    
    const gerarFaturamentoLojasP = () => {
        const novoFatuUnitárioLojaP = Math.floor(Math.random() * (dados.lojasP.faturamentoMáximo - dados.lojasP.faturamentoMínimo + 1)) + dados.lojasP.faturamentoMínimo;
        atualizarDados('lojasP', { 
            ...dados.lojasP, 
            faturamentoUnitário: novoFatuUnitárioLojaP,
            faturamentoTotal: novoFatuUnitárioLojaP * dados.lojasP.quantidade
        });
    };
    
    const gerarFaturamentoLojasM = () => {
        const novoFatuUnitárioLojaM = Math.floor(Math.random() * (dados.lojasM.faturamentoMáximo - dados.lojasM.faturamentoMínimo + 1)) + dados.lojasM.faturamentoMínimo;
        atualizarDados('lojasM', { 
            ...dados.lojasM, 
            faturamentoUnitário: novoFatuUnitárioLojaM,
            faturamentoTotal: novoFatuUnitárioLojaM * dados.lojasM.quantidade
        });
    };
    
    const gerarFaturamentoLojasG = () => {
        const novoFatuUnitárioLojaG = Math.floor(Math.random() * (dados.lojasG.faturamentoMáximo - dados.lojasG.faturamentoMínimo + 1)) + dados.lojasG.faturamentoMínimo;
        atualizarDados('lojasG', { 
            ...dados.lojasG, 
            faturamentoUnitário: novoFatuUnitárioLojaG,
            faturamentoTotal: novoFatuUnitárioLojaG * dados.lojasG.quantidade
        });
    };

    return (

        <div className="grid col-start-1 col-end-3 row-2">
            <div className="flex justify-center mt-[20px]">

                <button className="w-[100px] h-[100px] bg-laranja rounded-[20px] flex items-center justify-center mr-[10px]" onClick={ProximoDia}>
                    <img className="w-[72px] h-[72px]" src={PróximoImg} />
                </button>
                <button className="w-[100px] h-[100px] bg-laranja rounded-[20px] flex items-center justify-center ml-[10px]"
                    onClick={PagarDespesas}><img className="w-[72px] h-[72px]" src={despesasImg} /></button>
            </div>


        </div>
    )
}
