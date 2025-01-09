import React, { useContext } from "react";
import NextDay from "./nextDay";
import PayTexes from "./PayTexes";
import { CentraldeDadosContext } from "../centralDeDadosContext";


export default function Buttons(){
const {dados, atualizarDados} = useContext(CentraldeDadosContext)

    
    return(
        <div>
        <NextDay/>
        <PayTexes/>
        </div>
    )
}
