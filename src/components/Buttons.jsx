import React, { useContext } from "react";
import NextDay from "./nextDay";
import PayTexes from "./PayTexes";
import Business from "./business";
import EconomyGlobal from "./EconomyGlobal";
import { CentraldeDadosContext } from "../centralDeDadosContext";


export default function Buttons() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext)


    return (
        <div className="flex items-center w-[30%] rounded-[20px] h-full gap-[10px]">
            <div className="flex place-content-around items-center flex-col h-full">
                <PayTexes />
                <Business />
            </div>
            <div className="flex items-center h-full">
                <NextDay />
            </div>
        </div>
    )
}
