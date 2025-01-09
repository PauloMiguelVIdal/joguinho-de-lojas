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
function Interface() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext)

    return (
        <div className="w-[100vw] h-[100vh] bg-[#6A00FF] flex justify-center items-center">
            <Notificação />
<div className="w-[90vw] h-[90vh] rounded-[20px] bg-gradient-to-b from-roxo to-roxoForte grid grid-rows-2 grid-cols-2">



<Buttons/>
            <Buy />
            <div className="flex justify-between pr-[10px] pl-[10px] items-center w-[300px] h-[30px] rounded-[20px] bg-white box2 absolute top-[20px] left-[20px]">
                <h1 className="fonteLight text-roxo text-[20px] ">Mercados Mandakaru</h1>
            </div>
            <Events />
                <div className="flex justify-start items-end ">
<Informations/>
                <ActiveEvents />
                </div>
            </div>
        </div>
    )

}

export default Interface