import React, { useContext } from "react";

import { CentraldeDadosContext } from "../centralDeDadosContext";


export default function Day() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext)


    return (
        <div className="flex justify-between items-center h-full rounded-[12px] w-full">
            <div className="flex justify-between items-center w-full h-[80%] pl-[10px] pr-[15px] rounded-[12px] bg-[#350973] ">
                <h1 className="fonteBold text-white text-[20px]">Dia:</h1>
                <h1 className="fonteBold text-white text-[20px]">{dados.dia}</h1>
            </div>
        </div>
    )
}