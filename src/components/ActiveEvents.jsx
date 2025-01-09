import React, { useContext } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import terrenoImg from "../imagens/terreno.png"
import LojaPImg from "../imagens/lojaP.png"
import LojaMImg from "../imagens/lojaM.png"
import LojaGImg from "../imagens/lojaG.png"
import ConstuirImg from "../imagens/construir.png"
import DolarImg from "../imagens/simbolo-do-dolar.png"

export default function ActiveEvents() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext)


    const calculoRestam =
        dados.eventoAtual.diaFinal


    let foto



    switch (dados.eventoAtual.LojaSelecionada) {
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
    }


if(dados.eventoAtual.eventoAtivo===false){
    return(
        <div className="flex row items-center place-content-around bg-[#6E0BF9] rounded-[20px] w-full">Nenhum evento ativo</div>
    )
}else{

    
    return (
        <div className="flex row items-center place-content-around bg-[#6E0BF9] rounded-[20px] w-full">
            <div className="bg-[#331B8C] rounded-[20px]">
                <img className="h-[80px] m-[20px]" src={foto} alt="teste" />
            </div>
            <div className="flex flex-col items-center h-full w-[70%] p-[10px]">
                
                <div className="flex fonteLight place-content-around items-center h-1/2 ">
                   <h2 className="text-[18px] text-white"> {dados.eventoAtual.title}</h2>
                </div>
                <div className="bg-white flex place-content-around items-center  rounded-[16px] w-full h-1/2 fonteBold">
                    Data de encerramento : {dados.eventoAtual.diaFinal}
                </div>
            </div>



        </div>
    )
}
    
}