import React, { useContext, useState } from "react";
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
import { CardSpecials } from "./components/cardsSpecials.jsx"
import { TaxesYear } from "./components/TaxesYear.jsx";

function Interface() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext)



    return (
        <div className="w-[100vw] bg-[#7317F3] h-[100vh]  flex justify-around items-center">
            <Achievements />
            <CardSpecials />
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
                        <TaxesYear />
                        <EconomyGlobal />
                        <RaffledBuildings />
                    </div>
                </div>
                <div className="grid col-start-9 col-end-11 row-start-1 row-end-3 ml-[10px]">

                </div>
                <div className="grid col-start-9 col-end-11 row-start-1 row-end-3 ml-[10px]">
                    <Buttons />
                </div>
                <div className="grid col-start-9 col-end-11 row-start-3 row-end-5 ">
                    <Economys />
                </div>
                <div className="grid col-start-9 col-end-11 row-start-5 row-end-7">
                    <Taxes />
                </div>
                <div className="grid col-start-9 col-end-11 row-start-7 row-end-11">
                    <ActiveEvents />
                </div>
            </div>
        </div>
    )

}

export default Interface