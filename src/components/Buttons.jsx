import React, { useContext } from "react";
import NextDay from "./nextDay";
import PayTexes from "./PayTexes";
import { CentraldeDadosContext } from "../centralDeDadosContext";


export default function Buttons() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext)


    return (
            <div className="flex flex-col items-center  rounded-[20px]">
                <NextDay />
                <PayTexes />
            </div>
    )
}
