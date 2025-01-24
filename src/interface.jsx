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
function Interface() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext)

    return (
        <div className="w-[100vw] bg-gradient-to-b from-[#6411D9] to-[#350973] h-[100vh]  flex justify-center items-center">
            <Events />
            <Employees/>
            <Notificação />
            <div className="w-[95vw] h-[90vh] rounded-[40px] bg-gradient-to-b from-[#6E0BF9] to-[#F27405] grid grid-rows-9 grid-cols-8 gap-[20px] p-[20px]">
                <div className="grid col-start-1 col-end-3 row-start-7 row-end-10">
                    <MoreOptions />
                </div>
                <div className="grid col-3  row-start-2 row-end-4">
                    <Buttons />
                </div>
                <div className="grid col-start-4 col-end-9 row-start-1 row-end-10">
                    <ButtonChange />
                </div>
                <div className="grid col-start-1 col-end-3 row-start-1 row-end-7">
                    <Buy />
                </div>
                <div className="grid col-start-3 col-end-7 row-start-4 row-end-9">
                    <Dashboard />
                </div>
                <div className="grid col-start-4 col-end-10 row-start-2 row-end-4">
                    <Informations />
                </div>
                <div className="grid col-start-3 col-end-10 row-start-9 row-end-10">
                    <ActiveEvents />
                </div>
                <div className="grid col-start-7 col-end-10 row-start-4 row-end-9">
                <Texes/>
                </div>
            </div>
        </div>
    )

}

export default Interface