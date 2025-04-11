import React, { useContext } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import PredioImg from "../imagens/predio-comercial.png"

export default function Informations() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext)

    const formatarNumero = (num) => {
        if (num >= 1e12) return (num / 1e12).toFixed(1).replace('.0', '') + 'T'; // Trilhões
        if (num >= 1e9) return (num / 1e9).toFixed(1).replace('.0', '') + 'B';   // Bilhões
        if (num >= 1e6) return (num / 1e6).toFixed(1).replace('.0', '') + 'M';   // Milhões
        if (num >= 1e3) return (num / 1e3).toFixed(1).replace('.0', '') + 'K';   // Milhares
        return num.toString();
    };


    return (
        <div className="flex flex-col align-center text-center place-content-around  rounded-[20px] h-full w-full">

            <div className="flex items-center place-content-between">

                <h1 className="fonteBold text-white text-[30px]">{dados.inicioGame.nomeEmpresa}</h1>
        
                <div className="ml-[20px] rounded-[5px] bg-gradient-to-l to-[#F27405] from-[#350973] w-[90%] flex items-center h-[40px] place-content-between pl-[10px] pr-[15px]">
                    <h1 className="fonteBold text-white text-[20px]">R$</h1>
                    <h1 className="fonteBold text-white text-[20px]"> {formatarNumero((dados.saldo).toLocaleString('pt-BR'))}</h1>
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