import React, { useContext, useState } from "react";
import { CentraldeDadosContext } from "./centralDeDadosContext";
import PayTexes from "./components/PayTexes";
import ButtonChange from "./components/ButtonChange";
import Buy from "./components/buy";
import Notificação from "./notificação";
import Events from "./components/events";
import Employees from "./components/employees";
import Texes from "./components/Texes";
import Informations from "./components/Informations";
import Sorteio from "./components/Sorteio";
import ActiveEvents from "./components/ActiveEvents";
import Buttons from "./components/Buttons";
import Dashboard from "./components/Dashboard";
import MoreOptions from "./components/MoreOptions";
import Offers from "./components/Offers";
import EconomyGlobal from "./components/EconomyGlobal";
import InputName from "./components/inputName";
import Day from "./components/day";
import { Achievements } from "./components/Achievements"


function Interface() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext)



    return (
        <div className="w-[100vw] bg-[#7317F3] h-[100vh]  flex justify-around items-center">
            <Achievements />
            <InputName />
            <Offers />
            <Events />
            <Employees />
            <Notificação />
            <div className="w-[20vw] h-[100vh] flex items-center justify-around">
                <Buy />
            </div>
            <div className="w-[75vw] h-[95vh] shadow-2xl rounded-[40px] bg-gradient-to-b from-[#6411D9] to-[#350973] grid grid-rows-10 grid-cols-10 gap-[20px] p-[20px]">

                {/* <div className="grid col-start-1 col-end-3 row-start-8 row-end-10">
                    <MoreOptions />
                </div> */}
                {/* <div className="grid col-start-4 col-end-9 row-start-1 row-end-10">
                    <ButtonChange />
                </div> */}
                <div className="grid col-start-1 col-end-9 row-start-2 row-end-11 h-full w-full ">
                    <Dashboard className="h-full" />
                </div>
                <div className="grid col-start-1 col-end-11 row-1 ">
                    <div className="flex justify-center items-center gap-[10px]">
                        <Informations />
                    </div>
                </div>
                <div className="grid col-start-9 col-end-11 row-start-2 row-end-3 ml-[10px]">
                    <div className="flex w-full items-center justify-center gap-[10px]">
                    <Day />
                    <EconomyGlobal />
                    </div>
                </div>
                <div className="grid col-start-9 col-end-11 row-start-3 row-end-4 ml-[10px]">
                    <Buttons />
                </div>
                {/* <div className="grid col-start-9 col-end-11 row-start-4 row-end-6">
                </div> */}
                <div className="grid col-start-9 col-end-11 row-start-5 row-end-7">
                    <Texes />
                </div>
                <div className="grid col-start-9 col-end-11 row-start-7 row-end-11">
                    <ActiveEvents />
                </div>
            </div>
        </div>
    )

}

export default Interface