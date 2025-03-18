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
            <div className="w-[30vw] h-[100vh] flex items-center justify-around">
                <Buy />
            </div>
            <div className="w-[65vw] h-[95vh] shadow-2xl rounded-[40px] bg-gradient-to-b from-[#6411D9] to-[#350973] grid grid-rows-10 grid-cols-10 gap-[20px] p-[20px]">

                {/* <div className="grid col-start-1 col-end-3 row-start-8 row-end-10">
                    <MoreOptions />
                </div> */}
                {/* <div className="grid col-start-4 col-end-9 row-start-1 row-end-10">
                    <ButtonChange />
                </div> */}
                <div className="grid col-start-1 col-end-10 row-start-3 row-end-8">
                    <Dashboard className="h-full" />
                </div>
                <div className="grid col-start-1 col-end-10 row-start-1 row-end-3 ">
                    <div className="flex justify-center items-center gap-[10px]">
                        <Informations />
                        <Buttons />
                    </div>
                </div>
                <div className="grid col-start-5 col-end-10 row-start-8 row-end-10">
                    <ActiveEvents />
                </div>
                <div className="grid col-start-1 col-end-5 row-start-8 row-end-10">
                    <Texes />
                </div>
            </div>
        </div>
    )

}

export default Interface