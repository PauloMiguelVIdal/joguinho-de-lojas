import React, { useContext } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import PredioImg from "../imagens/predio-comercial.png"
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";

export default function Informations() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext)
    const { economiaSetores, setEconomiaSetoxxres, } = useContext(DadosEconomyGlobalContext);

    const formatarNumero = (num) => {
        if (num >= 1e12) return (num / 1e12).toFixed(2).replace(/\.00$/, '') + 'T'; // Trilhões
        if (num >= 1e9) return (num / 1e9).toFixed(2).replace(/\.00$/, '') + 'B';   // Bilhões
        if (num >= 1e6) return (num / 1e6).toFixed(2).replace(/\.00$/, '') + 'M';   // Milhões
        if (num >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';    // Milhares
        return num.toString();
    };


    return (
        <div className=" h-full w-full flex flex-col align-center text-center place-content-around  rounded-[20px] min-h-[50px] ">

            <div className="flex w-full items-center justify-between pr-[10px]">
                <div className="flex-1">
                    <h1 className="fonteBold text-white text-[30px]">{dados.inicioGame.nomeEmpresa}</h1>
                </div>
                <div className="ml-[20px] rounded-[5px] bg-gradient-to-l to-white via-white from-white w-[150px] flex items-center h-[50px] place-content-between pl-[10px] pr-[15px]">
                    <h1 className="fonteBold text-[#350973] text-[20px]">R$</h1>
                    <h1 className="fonteBold text-[#350973] text-[20px]">{formatarNumero((economiaSetores.saldo))}</h1>
                </div>
            </div>


            {/* <div className="flex justify-between items-center h-1/5 rounded-[12px] bg-laranja pl-[10px] pr-[15px] ">
                <div className="flex items-center">
                    <img src={PredioImg} className="w-[20px] h-[20px]" />
                    <h1 className="fonteBold text-white text-[20px] pl-[10px]">R$</h1>
                </div>
                <h1 className="fonteBold text-white text-[20px]">{(dados.saldo).toFixed(2)}</h1>
            </div> */}
        </div>
    )
}