import React, { useContext } from "react";

import { CentraldeDadosContext } from "../centralDeDadosContext";


export default function Day() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext)


    return (
        <div className="flex items-center justify-center min-h-[50px] w-[100%] bg-white rounded-[10px]">
            <div className="flex justify-between items-center w-full h-full pl-[10px] pr-[15px] rounded-[12px] bg-white ">
                <h1 className="fonteBold text-[#350973] text-[20px]">Dia:</h1>
                <h1 className="fonteBold text-[#350973] text-[20px]">{dados.dia}</h1>
            </div>
        </div>
    )
}