import React, { useContext } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import terrenoImg from "../../public/outrasImagens/terreno.png"
import LojaPImg from "../../public/outrasImagens/lojaP.png"
import LojaMImg from "../../public/outrasImagens/lojaM.png"
import LojaGImg from "../../public/outrasImagens/lojaG.png"

export default function MoreOptions() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext)
    return (
        <div className="bg-[#6E0BF9] rounded-[20px] ">
            {/* chance novo evento : {dados.chanceNovoEvento} */}
            <div className="flex flex-col place-content-around rounded-[20px] h-full w-[15%] bg-[#6A00FF] items-center">
                <img src={terrenoImg} className="w-[18px] h-[18px]" />
                <img src={LojaPImg} className="w-[18px] h-[18px]" />
                <img src={LojaMImg} className="w-[18px] h-[18px]" />
                <img src={LojaGImg} className="w-[18px] h-[18px]" />
            </div>
        </div>
    )
}