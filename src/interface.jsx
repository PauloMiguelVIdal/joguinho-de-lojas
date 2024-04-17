import React, { useContext, useState } from "react";
import { CentraldeDadosContext } from "./centralDeDadosContext";
import terrenoImg from "./imagens/terreno.png"
import LojaPImg from "./imagens/lojaP.png"
import LojaMImg from "./imagens/lojaM.png"
import LojaGImg from "./imagens/lojaG.png"
import ConstuirImg from "./imagens/construir.png"
import DolarImg from "./imagens/simbolo-do-dolar.png"
import NextDay from "./components/nextDay";
import Buy from "./components/buy";
import Notificação from "./notificação";
import Events from "./components/events";


function Interface() {
    const {
        dadosSaldo, AtualizarDadosSaldo,
        dadosDia, AtualizarDadosDia,

        //modal
        estadoModal, AtualizarEstadoModal,

        //seção terrenos
        dadosTerrenos, AtualizarDadosTerrenos,
        dadosPreçosTerrenos, AtualizarDadosPreçosTerrenos,


        // seçãolojas p
        dadosLojasP, AtualizarDadosLojasP,
        dadosPreçosConstruçãoLojaP, AtualizarDadosPreçoConstruçãoLojasP,
        dadosFaturamentoMínimoLojasP, AtualizarDadosFaturamentoMínimoLojasP,
        dadosFaturamentoMáximoLojasP, AtualizarDadosFaturamentoMáximoLojasP,
        dadosFaturamentoUnitárioLojasP, AtualizarDadosFaturamentoUnitárioLojasP,
        dadosFaturamentoTotalLojasP, AtualizarDadosFaturamentoTotalLojasP,





        //seção lojas m
        dadosLojasM, AtualizarDadosLojasM, AtualizarDadosDespesasLojasM, dadosDespesasLojasM,
        dadosPreçosConstruçãoLojaM, AtualizarDadosPreçoConstruçãoLojasM,
        dadosFaturamentoUnitárioLojasM, AtualizarDadosFaturamentoUnitárioLojasM,
        dadosFaturamentoTotalLojasM, AtualizarDadosFaturamentoTotalLojasM,
        dadosFaturamentoMínimoLojasM, AtualizarDadosFaturamentoMínimoLojasM,
        dadosFaturamentoMáximoLojasM, AtualizarDadosFaturamentoMáximoLojasM,




        //seção lojas g
        dadosLojasG, AtualizarDadosLojasG, AtualizarDadosDespesasLojasG, dadosDespesasLojasG,
        dadosPreçosConstruçãoLojaG, AtualizarDadosPreçoConstruçãoLojasG,
        dadosFaturamentoMínimoLojasG, AtualizarDadosFaturamentoMínimoLojasG,
        dadosFaturamentoMáximoLojasG, AtualizarDadosFaturamentoMáximoLojasG,
        dadosFaturamentoUnitárioLojasG, AtualizarDadosFaturamentoUnitárioLojasG,
        dadosFaturamentoTotalLojasG, AtualizarDadosFaturamentoTotalLojasG,





        //seção funcionários
        dadosCustoFuncionário, AtualizarDadosCustoFuncionário,
        dadosCustoMáximoFuncionário, AtualizarDadosCustoMáximoFuncionário,
        dadosCustoMínimoFuncionário, AtualizarDadosCustoMínimoFuncionário,



    } = useContext(CentraldeDadosContext)




    //funcionário



    const mudançasDePreços = () => {
        AtualizarDadosPreçosTerrenos(20000)
    }








    return (
        <div className="w-[100vw] h-[100vh] bg-gradient-to-b from-roxo to-roxoForte grid grid-rows-2 grid-cols-2">
            <Notificação />
            <Events/>
            {/* <button className="bg-white w-[100px] h-[120px]" onClick={()=>AtualizarEstadoModal(true)}>abrir modal</button> */}


            <div className="flex flex-col align-center text-center justify-around absolute top-[20px] right-[20px]">
                <div className="flex justify-between pr-[10px] pl-[10px] items-center w-[300px] h-[30px] rounded-[20px] bg-white box2">
                    <h1 className="fonteLight text-roxo text-[20px]">saldo:</h1>
                    <h1 className="fonteBold text-roxo text-[20px]">{dadosSaldo}</h1>
                </div>
                <div className="flex justify-between pr-[10px] pl-[10px] items-center w-[160px] h-[30px] rounded-[20px] bg-white box2 absolute top-[50px] right-[0px]">

                    <h1 className="fonteLight text-roxo text-[20px]">Dia:</h1>
                    <h1 className="fonteBold text-roxo text-[20px]">{dadosDia}</h1>
                </div>
            </div>
            <div className="flex justify-between pr-[10px] pl-[10px] items-center w-[300px] h-[30px] rounded-[20px] bg-white box2 absolute top-[20px] left-[20px]">
                <h1 className="fonteLight text-roxo text-[20px]">Nome mercado</h1>
                {/* <h1 className="fonteBold text-roxo text-[20px]">{dadosSaldo}</h1> */}
            </div>
            {/* <div className="flex justify-evenly items-center w-[250px] h-[30px] rounded-[20px] bg-white box2">
                    <h1 className="fonteLight text-roxo text-[20px]">faturamento Atual diário:</h1>
                    <h1 className="fonteBold text-roxo text-[20px]">{dadosFaturamentoTotalLojasP + dadosFaturamentoTotalLojasM + dadosFaturamentoTotalLojasG}</h1>
                </div> */}
            {/* <div className="flex justify-evenly items-center w-[250px] h-[30px] rounded-[20px] bg-white box2">
                    <h1 className="fonteLight text-roxo text-[20px]">Despesas do mês Atual:</h1>
                    <h1 className="fonteBold text-roxo text-[20px]">{dadosFaturamentoLojasP + dadosFaturamentoLojasM + dadosFaturamentoLojasG}</h1>
                </div> */}



            {/* <h1>Preço terrenos:{dadosPreçosTerrenos}</h1>


                        <h1>Preço construção LojaP:{dadosPreçosConstruçãoLojaP}</h1>

                        
                        <h1>Preço construção LojaM:{dadosPreçosConstruçãoLojaM}</h1>

                        
                        <h1>Preço construção LojaG:{dadosPreçosConstruçãoLojaG}</h1>
                        

                        <h1>Terrenos:{dadosTerrenos}</h1>

                        
                        <h1>lojas P:{dadosLojasP}</h1>
                        

                        <h1>lojas M:{dadosLojasM}</h1>
                        

                        <h1>lojas G:{dadosLojasG}</h1>
                        

                        <h1>custoFuncionário:{dadosCustoFuncionário}</h1>

                        
                        <h1>faturamentoUnitárioLojasP:{dadosFaturamentoUnitárioLojasP}</h1>
                        
                        
                        <h1>faturamentoTotalLojasP:{dadosFaturamentoTotalLojasP}</h1>


                        <h1>faturamentoUnitárioLojasM:{dadosFaturamentoUnitárioLojasM}</h1>


                        <h1>faturamentoTotalLojasM:{dadosFaturamentoTotalLojasM}</h1>


                        <h1>faturamentoUnitárioLojasG:{dadosFaturamentoUnitárioLojasG}</h1>
                        
                        
                        <h1>faturamentoTotalLojasG:{dadosFaturamentoTotalLojasG}</h1> */}

            <Buy />
            <NextDay />

        </div>
    )

}

export default Interface