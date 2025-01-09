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

    return (
        <div className="flex row justify-center items-center bg-[#6E0BF9] rounded-[20px]">
            <div>
                <img className="w-[50px] h-[50px] " src={foto} alt="teste" />
            </div>
            <div className="">
                <div>
                    {dados.eventoAtual.title}
                </div>
                <div className="bg-white place-content-around place-self-center rounded-[16px] w-[350px] h-[50px]">
                    dia final : {dados.eventoAtual.diaFinal}
                </div>
            </div>



        </div>
    )

}