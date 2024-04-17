import React, { useContext } from 'react';
import { CentraldeDadosContext } from '../centralDeDadosContext';
import PróximoImg from "../imagens/proximo.png";
import despesasImg from "../imagens/despesas.png";
import Notificação from '../notificação';

export default function NextDay() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext);

    const ProximoDia = () => {
        if (dados.dia % 30 === 0) {
            atualizarDados({...dados, despesas: { ...dados.despesas, despesasPagas: false }});
            if (!dados.despesas.despesasPagas) {
                return AtualizarEstadoModal(true);
            }
        }
    
        const novoDia = dados.dia + 1;
        const saldoAtualizado =
            dados.saldo +
            dados.terrenos.quantidade * dados.terrenos.faturamentoUnitário +
            dados.lojasP.quantidade * dados.lojasP.faturamentoUnitário +
            dados.lojasM.quantidade * dados.lojasM.faturamentoUnitário +
            dados.lojasG.quantidade * dados.lojasG.faturamentoUnitário -
            dados.terrenos.quantidade * 100 -
            dados.lojasP.quantidade * 250 -
            dados.lojasM.quantidade * 400 -
            dados.lojasG.quantidade * 750;
    
        atualizarDados(['dia'], novoDia);
        atualizarDados(['saldo'], saldoAtualizado);

        gerarFaturamentoTerrenos();
        gerarFaturamentoLojasP();
        gerarFaturamentoLojasM();
        gerarFaturamentoLojasG();
    };
    
    const PagarDespesas = () => {
        if (dados.despesas.despesasPagas) {
            return alert("Despesas desse mês já foram pagas.");
        } else {
            const novoSaldo = dados.saldo - dados.despesas.despesasLojasP - dados.despesas.despesasLojasM - dados.despesas.despesasLojasG;
            atualizarDados({...dados, saldo: novoSaldo, despesas: {...dados.despesas, despesasPagas: true}});
            alert("Despesas pagas.");
        }
    };
    const gerarFaturamentoTerrenos = () => {
        const novoFatuUnitárioTerreno = Math.floor(Math.random() * (dados.terrenos.faturamentoMáximo - dados.terrenos.faturamentoMínimo + 1)) + dados.terrenos.faturamentoMínimo;
        atualizarDados({...dados, terrenos: {...dados.terrenos, faturamentoUnitário: novoFatuUnitárioTerreno}});
    };
    
    const gerarFaturamentoLojasP = () => {
        const novoFatuUnitárioLojaP = Math.floor(Math.random() * (dados.lojasP.faturamentoMáximo - dados.lojasP.faturamentoMínimo + 1)) + dados.lojasP.faturamentoMínimo;
        atualizarDados({...dados, lojasP: {...dados.lojasP, faturamentoUnitário: novoFatuUnitárioLojaP}});
    };
    
    const gerarFaturamentoLojasM = () => {
        const novoFatuUnitárioLojaM = Math.floor(Math.random() * (dados.lojasM.faturamentoMáximo - dados.lojasM.faturamentoMínimo + 1)) + dados.lojasM.faturamentoMínimo;
        atualizarDados({...dados, lojasM: {...dados.lojasM, faturamentoUnitário: novoFatuUnitárioLojaM}});
    };
    
    const gerarFaturamentoLojasG = () => {
        const novoFatuUnitárioLojaG = Math.floor(Math.random() * (dados.lojasG.faturamentoMáximo - dados.lojasG.faturamentoMínimo + 1)) + dados.lojasG.faturamentoMínimo;
        atualizarDados({...dados, lojasG: {...dados.lojasG, faturamentoUnitário: novoFatuUnitárioLojaG}});
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
