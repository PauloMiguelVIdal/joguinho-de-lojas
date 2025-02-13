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
        <div className="w-[100vw] bg-[#7317F3] h-[100vh]  flex justify-center items-center">
            <Events />
            <Employees/>
            <Notificação />
            <div className="w-[95vw] h-[90vh] rounded-[40px] bg-gradient-to-b from-[#6411D9] to-[#350973] grid grid-rows-9 grid-cols-8 gap-[20px] p-[20px]">
               <div className="grid col-start-1 col-end-3 row-start-3 row-end-8">
                    <Buy />
                </div>
                {/* <div className="grid col-start-1 col-end-3 row-start-8 row-end-10">
                    <MoreOptions />
                </div> */}
                <div className="grid col-start-6 col-end-8  row-start-1 row-end-3">
                </div>
                {/* <div className="grid col-start-4 col-end-9 row-start-1 row-end-10">
                    <ButtonChange />
                </div> */}
                <div className="grid col-start-3 col-end-10 row-start-4 row-end-8">
                    <Dashboard />
                </div>
                <div className="grid col-start-1 col-end-6 row-start-1 row-end-3 ">
                    <div className="flex justify-center items-center gap-[10px]">
                    <Informations />
                    <Buttons />
                    </div>
                    

                </div>
                <div className="grid col-start-5 col-end-10 row-start-8 row-end-10">
                    <ActiveEvents />
                </div>
                <div className="grid col-start-3 col-end-5 row-start-8 row-end-10">
                <Texes/>
                </div>
            </div>
        </div>
    )

}

export default Interface