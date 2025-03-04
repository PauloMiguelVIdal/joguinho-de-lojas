import React, { useEffect, useContext, useState } from "react";
import acordo from "../imagens/negocios-internacionais.png"
import { CentraldeDadosContext } from "../centralDeDadosContext";

export default function Business() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext)


    const abrirModal = () => {
        if (dados.dia < 30) {
            return 
            // alert("ofertas disponíveis apartir do dia 30")
        
        
        }
        else {

            atualizarDados('modalOfertas', { ...dados.modalOfertas, estadoModal: true });
        }
    }

    const abrirModalNotificado = () => {
        if (dados.dia < 30) {
            return 
            // alert("ofertas disponíveis apartir do dia 30")
        }
        else {

            atualizarDados('modalOfertas', { ...dados.modalOfertas, estadoModal: true });
            atualizarDados("botãoOfertas", "btnNormal");
        }
    }




    useEffect(() => {

        const proximoDiaChegar = (n) => {

            return ((n % 30 === 0 ? n : n + (30 - (n % 30))) - dados.dia);
        }
        const proximoDia = proximoDiaChegar(dados.dia);
        atualizarDados("proximaOferta", proximoDia
        )
        console.log("useEffect chamado3!");
    }, [dados.dia])

    useEffect(() => {
        atualizarDados("botãoOfertas", "btnNoti")
        if (dados.dia < 30) {
        console.log("useEffect chamado4!");

            atualizarDados("botãoOfertas", "btnNormal")
        }
    }, [dados.modalDespesas.estadoModal])

    if (dados.dia < 30){
        return (
            <div className="flex bg-[#290064] w-full rounded-[10px] relative">
                <div className="flex justify-center items-center w-full rounded-[10px]">
                    <h2 className={`text-white text-[20px] fonteBold`}>{dados.proximaOferta}</h2>
                </div>
                <button className="w-[50%] max-w-[70px] h-full min-h-[50px] aspect-square bg-[#F4CCB6] rounded-[10px] flex items-center justify-center " onClick={abrirModalNotificado}>
                    <img className="max-w-[58px] h-[70%] aspect-square" src={acordo} />
                </button>
            </div>
        )
    }else
    if (dados.botãoOfertas === "btnNoti") {
        return (
            <div className="flex bg-[#290064] w-full rounded-[10px] relative">
                <div className="flex justify-center items-center w-full rounded-[10px]">
                    <h2 className={`text-white text-[20px] fonteBold`}>{dados.proximaOferta}</h2>
                </div>
                <button className="w-[50%] max-w-[70px] h-full min-h-[50px] aspect-square bg-laranja rounded-[10px] flex items-center justify-center hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]" onClick={abrirModalNotificado}>
                    <img className="max-w-[58px] h-[70%] aspect-square" src={acordo} />
                </button>
                <div className="absolute bottom-[-2px] right-[-2px]">
                    <span className="relative flex size-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex size-3 rounded-full bg-white"></span>
                    </span>
                </div>
            </div>
        )
    } else {
        return (


            <div className="flex bg-[#290064] w-full rounded-[10px] relative">
                <div className="flex justify-center items-center w-full rounded-[10px]">
                    <h2 className={`text-white text-[20px] fonteBold`}>{dados.proximaOferta}</h2>
                </div>
                <button className="w-[50%] max-w-[70px] h-full min-h-[50px] aspect-square bg-laranja rounded-[10px] flex items-center justify-center hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]" onClick={abrirModal}>
                    <img className="max-w-[58px] h-[70%] aspect-square" src={acordo} />
                </button>
            </div>
        )
    }

}