import React, { useContext, useState } from "react";
<<<<<<< HEAD
import { CentraldeDadosContext } from "./centralDeDadosContext";
import NextDay from "./components/nextDay";
import Buy from "./components/buy";
import Notificação from "./notificação";
import Events from "./components/events";

import Employees from "./components/employees";


import Texes from "./components/Texes";

import PayTexes from "./components/PayTexes";



function Interface() {
        const { dados, atualizarDados } = useContext(CentraldeDadosContext)

    return (
        <div className="w-[100vw] h-[100vh] bg-gradient-to-b from-roxo to-roxoForte grid grid-rows-2 grid-cols-2">
            <Notificação />
            {/* <button className="bg-white w-[100px] h-[120px]" onClick={()=>AtualizarEstadoModal(true)}>abrir modal</button> */}


            <div className="flex flex-col align-center text-center justify-around absolute top-[20px] right-[20px]">
                <div className="flex justify-between pr-[10px] pl-[10px] items-center w-[300px] h-[30px] rounded-[20px] bg-white box2">
                    <h1 className="fonteLight text-roxo text-[20px]">saldo:</h1>
                    <h1 className="fonteBold text-roxo text-[20px]">R$ {dados.saldo}</h1>
                </div>
                <div className="flex justify-between pr-[10px] pl-[10px] items-center w-[160px] h-[30px] rounded-[20px] bg-white box2 absolute top-[50px] right-[0px]">

                    <h1 className="fonteLight text-roxo text-[20px]">Dia:</h1>
                    <h1 className="fonteBold text-roxo text-[20px]">{dados.dia}</h1>
                </div>
            </div>
            <div className="flex justify-between pr-[10px] pl-[10px] items-center w-[300px] h-[30px] rounded-[20px] bg-white box2 absolute top-[20px] left-[20px]">
                <h1 className="fonteLight text-roxo text-[20px] ">Mercados Mandakaru</h1>
            </div>
            {/* <div className="flex justify-evenly items-center w-[250px] h-[30px] rounded-[20px] bg-white box2">
                    <h1 className="fonteLight text-roxo text-[20px]">faturamento Atual diário:</h1>
                    <h1 className="fonteBold text-roxo text-[20px]">{dadosFaturamentoTotalLojasP + dadosFaturamentoTotalLojasM + dadosFaturamentoTotalLojasG}</h1>
                </div> */}
            {/* <div className="flex justify-evenly items-center w-[250px] h-[30px] rounded-[20px] bg-white box2">
                    <h1 className="fonteLight text-roxo text-[20px]">Despesas do mês Atual:</h1>
                    <h1 className="fonteBold text-roxo text-[20px]">gerar</h1>
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
            {/* <Texes/> */}

            <Buy />
            <div className="grid col-start-1 col-end-3 row-2">
            <div className="flex justify-center mt-[20px]">
            <NextDay />
           <PayTexes/>
            </div>
            </div>
            <Texes/>
            <Events/>

=======
import { CentraldeDadosContext } from "./centralDeDadosContext.jsx";
import PayTexes from "./components/PayTexes.jsx";
import ButtonChange from "./components/ButtonChange.jsx";
import Buy from "./components/buy.jsx";
import Notificação from "./notificação.jsx";
import Events from "./components/events.jsx";
import Employees from "./components/employees.jsx";
import Taxes from "./components/Taxes.jsx";
import Informations from "./components/Informations.jsx";
import Sorteio from "./components/Sorteio.jsx";
import ActiveEvents from "./components/ActiveEvents.jsx";
import Buttons from "./components/Buttons.jsx";
import Dashboard from "./components/Dashboard.jsx";
import MoreOptions from "./components/MoreOptions.jsx";
import Offers from "./components/Offers.jsx";
import EconomyGlobal from "./components/EconomyGlobal.jsx";
import InputName from "./components/inputName.jsx";
import Day from "./components/day.jsx";
import { Achievements } from "./components/Achievements.jsx"
import Economys from "./components/Economys.jsx";
import RaffledBuildings from "./components/RaffledBuildings.jsx";
import {CardSpecials} from "./components/cardsSpecials.jsx"
import { TaxesYear } from "./components/TaxesYear.jsx";

function Interface() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext)



    return (
        <div className="w-[100vw] bg-[#7317F3] h-[100vh]  flex justify-around items-center">
            <Achievements />
            <CardSpecials/>
            <InputName />
            <Offers />
            <Events />
            <Employees />
            <Notificação />
            <div className="w-[20vw] h-[100vh] flex items-center justify-around">
                <Buy />
            </div>
            <div className="w-[75vw] h-[95vh] shadow-2xl rounded-[20px] bg-gradient-to-b from-[#6411D9] to-[#350973] grid grid-rows-10 grid-cols-10 gap-[20px] p-[20px]">

                {/* <div className="grid col-start-1 col-end-3 row-start-8 row-end-10">
                    <MoreOptions />
                    </div> */}
                {/* <div className="grid col-start-4 col-end-9 row-start-1 row-end-10">
                    <ButtonChange />
                    </div> */}
                <div className="grid col-start-1 col-end-9 row-start-2 row-end-11 h-full w-full ">
                    <Dashboard className="h-full" />
                </div>
                <div className="grid col-start-1 col-end-9 row-1 w-full h-full">    
                <div className="grid gap-[10px] col-start-1 col-end-8 w-full place-items-center">
                        <Informations className="grid col-start-1 col-end-8" />
                    </div>
                    <div className="flex w-full items-center justify-center  col-start-8 col-end-9 gap-[10px]">
                        <Day />
                    <TaxesYear/>
                        <EconomyGlobal />
                  <RaffledBuildings/>     
                    </div>
                </div>
                <div className="grid col-start-9 col-end-11 row-start-1 row-end-3 ml-[10px]">

                </div>
                <div className="grid col-start-9 col-end-11 row-start-1 row-end-2 ml-[10px]">
                    <Buttons />
                </div>
                <div className="grid col-start-9 col-end-11 row-start-3 row-end-5">
                <Economys/>
                </div>
                <div className="grid col-start-9 col-end-11 row-start-5 row-end-7">
                    <Taxes />
                </div>
                <div className="grid col-start-9 col-end-11 row-start-7 row-end-11">
                    <ActiveEvents />
                </div>
            </div>
>>>>>>> 4eecf25e3e3b0d0eca1f16931d01c2d9df1ce00a
        </div>
    )

}

export default Interface