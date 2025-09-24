import React, { useContext } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import terrenoImg from "../../public/outrasImagens/terreno.png"
import LojaPImg from "../../public/outrasImagens/lojaP.png"
import LojaMImg from "../../public/outrasImagens/lojaM.png"
import LojaGImg from "../../public/outrasImagens/lojaG.png"
import { motion } from "framer-motion";
export default function ActiveEvents() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext)



    let foto



    switch (dados.eventoAtual.lojaSelecionada) {
        case "terrenos":
            foto = terrenoImg
            break

        case "lojas pequenas":
            foto = LojaPImg
            break
        case "lojas médias":
            foto = LojaMImg
            break
        case "lojas grandes":
            foto = LojaGImg

            break
        default: "deu ruim"
    }


    if (dados.eventoAtual.eventoAtivo === false) {
        return (
            <div className="flex row items-center place-content-around bg-[#6E0BF9] rounded-[20px] fonteBold w-full text-white">Nenhum evento ativo</div>
        )
    } else {


        return (
            <div className="flex w-full">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center bg-[#6411D9] rounded-[20px] w-full p-[5px]  gap-[10px]"
                >


                    <div className="w-[95%] bg-[#331B8C] rounded-[5px] fonteBold text-[20px] flex place-content-between">
                        <h1 className="text-white m-[5px]   ml-[10px]">{dados.eventoAtual.lojaSelecionada}</h1>
                    </div>
                    <div className="bg-[#290064] rounded-[20px] aspect-square h-[80%] flex flex-col items-center justify-center relative">
                        <div className="flex flex-col h-full  justify-between items-start p-[5px]">
                            <div className="flex fonteLight place-content-around items-center w-[90%] mt-[10px]">
                                <h2 className=" text-[15px] text-white fonteLight ml-[10px]"> {dados.eventoAtual.title}</h2>
                            </div>
                            <div className="bg-[#350973] flex place-content-around self-center items-center text-white text-[12px] rounded-[16px] w-[95%] p-[10px] mb-[5px]  fonteBold">
                                Data de encerramento : {dados.eventoAtual.diaFinal}
                            </div>
                        </div>
                        <img className="h-[45px] aspect-square opacity-50 flex justify-center absolute" src={foto} alt="teste" />
                    </div>

                </motion.div>
            </div>


        )

    }

}

