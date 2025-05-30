import React, { useContext } from "react";
import {NextDay}from "./nextDay";
import PayTexes from "./PayTexes";
import Business from "./business";

import { CentraldeDadosContext } from "../centralDeDadosContext";


export default function Buttons() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext)


    return (
        <div className="flex items-center w-full rounded-[20px] h-full">
            <div className="flex place-content-around items-center h-full gap-[10px] w-[100%]">
                <NextDay />
                <div className="flex flex-col gap-[10px]">

                <PayTexes />
                <Business />
                </div>
  
            </div>
        </div>
    )
}
