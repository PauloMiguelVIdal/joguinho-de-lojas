import React, { useContext } from "react";
import {NextDay}from "./nextDay";
import PayTexes from "./PayTexes";
import Business from "./business";

import { CentraldeDadosContext } from "../centralDeDadosContext";


export default function Buttons() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext)


    return (
        <div className="flex items-center w-full rounded-[20px] h-full gap-[10px]">
            <div className="flex place-content-around items-center h-full">
                <NextDay />
                <PayTexes />
                <Business />
  
            </div>
        </div>
    )
}
