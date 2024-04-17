import React from 'react'
import { CentraldeDadosContext } from '../centralDeDadosContext'
import { useContext } from 'react'
import PróximoImg from "../imagens/proximo.png"
import despesasImg from "../imagens/despesas.png"
import Notificação from '../notificação'
export default function NextDay() {

    const {
        dadosSaldo, AtualizarDadosSaldo,
        dadosDia, AtualizarDadosDia,

        //estadoModal
        estadoModal, AtualizarEstadoModal,
        //seção despesas


        dadosDespesasPagas, AtualizarDespesasPagas,
        AtualizarDadosDespesasLojasP, dadosDespesasLojasP,
        AtualizarDadosDespesasLojasM, dadosDespesasLojasM,
        AtualizarDadosDespesasLojasG, dadosDespesasLojasG,

        //terrenos
        dadosTerrenos,
        dadosDespesasTerrenos, AtualizarDadosDespesasTerrenos,
        dadosFaturamentoMínimoTerrenos,
        dadosFaturamentoMáximoTerrenos,
        dadosFaturamentoUnitárioTerrenos, AtualizarDadosFaturamentoUnitárioTerrenos,
        dadosFaturamentoTotalTerrenos, AtualizarDadosFaturamentoTotalTerrenos,

        // seçãolojas p
        dadosLojasP,
        dadosFaturamentoMínimoLojasP,
        dadosFaturamentoMáximoLojasP,
        dadosFaturamentoUnitárioLojasP, AtualizarDadosFaturamentoUnitárioLojasP,
        dadosFaturamentoTotalLojasP, AtualizarDadosFaturamentoTotalLojasP,



        //seção lojas m
        dadosLojasM,

        dadosFaturamentoUnitárioLojasM, AtualizarDadosFaturamentoUnitárioLojasM,
        dadosFaturamentoTotalLojasM, AtualizarDadosFaturamentoTotalLojasM,
        dadosFaturamentoMínimoLojasM,
        dadosFaturamentoMáximoLojasM,


        //seção lojas g
        dadosLojasG,
        dadosFaturamentoMínimoLojasG,
        dadosFaturamentoMáximoLojasG,
        dadosFaturamentoUnitárioLojasG, AtualizarDadosFaturamentoUnitárioLojasG,
        dadosFaturamentoTotalLojasG, AtualizarDadosFaturamentoTotalLojasG,




    } = useContext(CentraldeDadosContext)




    const ProximoDia = () => {
        if (dadosDia % 30 === 0) {
            AtualizarDespesasPagas(false)
            if (dadosDespesasPagas === false) {
                // return alert("despesas não pagas, pague as despesas para avançar")
                return AtualizarEstadoModal(true)

            }

        }
        AtualizarDadosDia(dadosDia + 1)
        gerarFaturamentoTerrenos()
        gerarFaturamentoLojasP()
        gerarFaturamentoLojasM()
        gerarFaturamentoLojasG()
        AtualizarDadosFaturamentoTotalTerrenos(dadosTerrenos * dadosFaturamentoUnitárioTerrenos)
        AtualizarDadosFaturamentoTotalLojasP(dadosLojasP * dadosFaturamentoUnitárioLojasP)
        AtualizarDadosFaturamentoTotalLojasM(dadosLojasM * dadosFaturamentoUnitárioLojasM)
        AtualizarDadosFaturamentoTotalLojasG(dadosLojasG * dadosFaturamentoUnitárioLojasG)
        AtualizarDadosDespesasTerrenos(dadosTerrenos * 100)
        AtualizarDadosDespesasLojasP(dadosLojasP * 250)
        AtualizarDadosDespesasLojasM(dadosLojasM * 400)
        AtualizarDadosDespesasLojasG(dadosLojasG * 750)
        AtualizarDadosSaldo(dadosSaldo + dadosFaturamentoTotalTerrenos + dadosFaturamentoTotalLojasP + dadosFaturamentoTotalLojasM + dadosFaturamentoTotalLojasG)

    }

    const PagarDespesas = () => {
        if (dadosDespesasPagas == true) {
            return alert("despesas desse mês já forma pagas")
        }
        else {
            AtualizarDadosSaldo(dadosSaldo - dadosDespesasLojasP - dadosDespesasLojasM - dadosDespesasLojasG)
            AtualizarDespesasPagas(true)
            alert("despesas pagas")

        }
    }


    const gerarFaturamentoTerrenos = () => {
    const novoFatuUnitárioTerreno = Math.floor(Math.random() * (dadosFaturamentoMáximoTerrenos - dadosFaturamentoMínimoTerrenos + 1)) + dadosFaturamentoMínimoTerrenos
        AtualizarDadosFaturamentoUnitárioTerrenos(novoFatuUnitárioTerreno)
        // alert(`novo faturamento unitário: ${dadosFaturamentoUnitárioTerrenos}`)
        // console.log(dadosFaturamentoUnitárioTerrenos)
    }


    const gerarFaturamentoLojasP = () => {
        const novoFatuUnitárioLojaP = Math.floor(Math.random() * (dadosFaturamentoMáximoLojasP - dadosFaturamentoMínimoLojasP + 1)) + dadosFaturamentoMínimoLojasP
        AtualizarDadosFaturamentoUnitárioLojasP(novoFatuUnitárioLojaP)
        // alert(`novo faturamento unitário: ${dadosFaturamentoUnitárioLojasP}`)
    }

    const gerarFaturamentoLojasM = () => {
        const novoFatuUnitárioLojaM = Math.floor(Math.random() * (dadosFaturamentoMáximoLojasM - dadosFaturamentoMínimoLojasM + 1)) + dadosFaturamentoMínimoLojasM
        AtualizarDadosFaturamentoUnitárioLojasM(novoFatuUnitárioLojaM)
        // alert(`novo faturamento unitário: ${dadosFaturamentoUnitárioLojasM}`)
    }


    const gerarFaturamentoLojasG = () => {
        const novoFatuUnitárioLojaG = Math.floor(Math.random() * (dadosFaturamentoMáximoLojasG - dadosFaturamentoMínimoLojasG + 1)) + dadosFaturamentoMínimoLojasG
        AtualizarDadosFaturamentoUnitárioLojasG(novoFatuUnitárioLojaG)
        // alert(`novo faturamento unitário: ${dadosFaturamentoUnitárioLojasG}`)
    }

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
