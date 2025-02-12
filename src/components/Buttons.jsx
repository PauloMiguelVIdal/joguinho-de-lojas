import React, { useContext } from "react";
import NextDay from "./nextDay";
import PayTexes from "./PayTexes";
import { CentraldeDadosContext } from "../centralDeDadosContext";


export default function Buttons() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext)


    return (
            <div className="flex items-center w-[200px] rounded-[20px] gap-[10px]">
                <NextDay />
                <PayTexes />
            </div>
    )
}
