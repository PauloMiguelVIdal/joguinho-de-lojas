import React, { useContext } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import terrenoImg from "../imagens/terreno.png"
import LojaPImg from "../imagens/lojaP.png"
import LojaMImg from "../imagens/lojaM.png"
import LojaGImg from "../imagens/lojaG.png"

export default function ActiveEvents() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext)



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


    if (dados.eventoAtual.eventoAtivo === false) {
        return (
            <div className="flex row items-center place-content-around bg-[#6E0BF9] rounded-[20px] w-full">Nenhum evento ativo</div>
        )
    } else {


        return (
            <div className="flex w-full ">
                <div className="flex flex-col items-center place-content-around bg-[#6411D9] rounded-[5px] w-full">

                    <div className="w-[95%] bg-[#331B8C] flex place-content-between ">
                        <div><h1 className="text-white">LojasP</h1></div>

                        <div className="bg-[#6E0BF9] rounded-[20px] w-[20px] h-[20px] flex items-center justify-center">
                            <img className="h-[20px] m-[20px]" src={foto} alt="teste" />
                        </div>
                    </div>
                    <div className="flex fonteLight place-content-around items-center h-1/2 ">
                        <h2 className="text-[18px] text-white"> {dados.eventoAtual.title}</h2>
                    </div>
                    <div className="bg-[#350973] flex place-content-around items-center text-white rounded-[16px] w-[95%] h-1/2 fonteBold">
                        Data de encerramento : {dados.eventoAtual.diaFinal}
                    </div>
                </div>
                <div className="flex flex-col items-center place-content-around bg-[#6411D9] rounded-[5px] w-full">

                    <div className="w-[95%] bg-[#331B8C] flex place-content-between ">
                        <div><h1 className="text-white">LojasP</h1></div>

                        <div className="bg-[#6E0BF9] rounded-[20px] w-[20px] h-[20px] flex items-center justify-center">
                            <img className="h-[20px] m-[20px]" src={foto} alt="teste" />
                        </div>
                    </div>
                    <div className="flex fonteLight place-content-around items-center h-1/2 ">
                        <h2 className="text-[18px] text-white"> {dados.eventoAtual.title}</h2>
                    </div>
                    <div className="bg-[#350973] flex place-content-around items-center text-white rounded-[16px] w-[95%] h-1/2 fonteBold">
                        Data de encerramento : {dados.eventoAtual.diaFinal}
                    </div>
                </div>
                <div className="flex flex-col items-center place-content-around bg-[#6411D9] rounded-[5px] w-full">

                    <div className="w-[95%] bg-[#331B8C] flex place-content-between ">
                        <div><h1 className="text-white">LojasP</h1></div>

                        <div className="bg-[#6E0BF9] rounded-[20px] w-[20px] h-[20px] flex items-center justify-center">
                            <img className="h-[20px] m-[20px]" src={foto} alt="teste" />
                        </div>
                    </div>
                    <div className="flex fonteLight place-content-around items-center h-1/2 ">
                        <h2 className="text-[18px] text-white"> {dados.eventoAtual.title}</h2>
                    </div>
                    <div className="bg-[#350973] flex place-content-around items-center text-white rounded-[5px] w-[95%] h-1/3 fonteBold">
                        Data de encerramento : {dados.eventoAtual.diaFinal}
                    </div>
                </div>
            </div>
        )

    }

}

