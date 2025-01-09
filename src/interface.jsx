import React, { useContext, useState } from "react";
import { CentraldeDadosContext } from "./centralDeDadosContext";

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
        <div className="w-[100vw] h-[100vh] bg-[#6A00FF] flex justify-center items-center">
            <Notificação />
            <Events />
            <div className="w-[90vw] h-[90vh] rounded-[20px] bg-gradient-to-b from-roxo to-roxoForte grid grid-rows-4 grid-cols-5">
                <MoreOptions/>
                <Buttons />
                <Buy />
                <Dashboard />
                <Informations />
                <div className="flex justify-start items-end ">
                    <ActiveEvents />
                </div>
            </div>
        </div>
    )

}

export default Interface