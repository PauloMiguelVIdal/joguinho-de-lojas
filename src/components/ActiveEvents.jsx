import React, { useContext } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import terrenoImg from "../imagens/terreno.png"
import LojaPImg from "../imagens/lojaP.png"
import LojaMImg from "../imagens/lojaM.png"
import LojaGImg from "../imagens/lojaG.png"
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
            default :"deu ruim"
    }


    if (dados.eventoAtual.eventoAtivo === false) {
        return (
            <div className="flex row items-center place-content-around bg-[#6E0BF9] rounded-[20px] fonteBold w-full text-white">Nenhum evento ativo</div>
        )
    } else {


        return (
            <div className="flex w-full ">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="flex  items-center justify-center bg-[#6411D9] rounded-[10px] w-full p-[5px] gap-[10px]"
                >


                    <div className="bg-[#290064] rounded-[20px] aspect-square h-[80%] flex items-center justify-center">
                        <img className="h-[45px] aspect-square " src={foto} alt="teste" />
                    </div>

                    <div className="flex flex-col h-[80%]  justify-center items-start">
                        <div className="w-[95%] bg-[#331B8C] rounded-[5px] fonteBold text-[20px] flex place-content-between ">
                            <h1 className="text-white ml-[10px]">{dados.eventoAtual.lojaSelecionada}</h1>

                        </div>

                        <div className="flex fonteLight place-content-around items-center h-1/2 w-[80%] ">
                            <h2 className=" text-[12px] text-white ml-[10px]"> {dados.eventoAtual.title}</h2>
                        </div>
                        <div className="bg-[#350973] flex place-content-around items-center text-white text-[12px] rounded-[16px] w-[95%] p-[10px]  fonteBold">
                            Data de encerramento : {dados.eventoAtual.diaFinal}
                        </div>
                    </div>

                </motion.div>
            </div>
                
                       
                    )

    }

}

