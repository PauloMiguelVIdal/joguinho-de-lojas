import React, { useContext } from "react";
import NextDay from "./nextDay";
import PayTexes from "./PayTexes";
import { CentraldeDadosContext } from "../centralDeDadosContext";


export default function Buttons(){
const {dados, atualizarDados} = useContext(CentraldeDadosContext)

    
    return(
        <div className="grid col-start-1 col-end-3 row-2">
        <div className="flex justify-center bg-[#6E0BF9] rounded-[20px]">
            <NextDay />
            <PayTexes />
        </div>
    </div>
    )
}
