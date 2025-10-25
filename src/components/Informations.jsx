import React, { useContext } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import PredioImg from "../../public/outrasImagens/predio-comercial.png";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";

// Tooltip
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function Informations() {
    const { dados } = useContext(CentraldeDadosContext);
    const { economiaSetores } = useContext(DadosEconomyGlobalContext);

    const formatarNumero = (num) => {
        if (num >= 1e12)
            return (num / 1e12).toFixed(2).replace(/\.00$/, "") + "T"; // Trilhões
        if (num >= 1e9)
            return (num / 1e9).toFixed(2).replace(/\.00$/, "") + "B"; // Bilhões
        if (num >= 1e6)
            return (num / 1e6).toFixed(2).replace(/\.00$/, "") + "M"; // Milhões
        if (num >= 1e3)
            return (num / 1e3).toFixed(1).replace(/\.0$/, "") + "K"; // Milhares
        return num.toString();
    };

    return (
        <div className="h-full w-full flex flex-col align-center text-center place-content-around rounded-[20px] min-h-[50px]">
            <div className="flex w-full items-center justify-between pr-[10px]">
                <div className="flex-1">
                    <h1 className="fonteBold text-white text-[30px]">
                        {dados.inicioGame.nomeEmpresa}
                    </h1>
                </div>
                <div data-tooltip-id="saldo-tip"
                    data-tooltip-content="Esse é o seu saldo" className="ml-[20px] rounded-[5px] bg-gradient-to-l to-white via-white from-white w-[150px] flex items-center h-[50px] place-content-between pl-[10px] pr-[15px] ">
                    <h1 className="fonteBold text-[#350973] text-[20px]">R$</h1>
                    <h1 className="fonteBold text-[#350973] text-[20px]"
                    >
                        {(formatarNumero(economiaSetores.saldo.toFixed(2)))}
                    </h1>
                </div>
            </div>
            {/* Tooltip global (pode ficar fora dos elementos) */}
            <Tooltip
                id="saldo-tip"
                style={{
                    backgroundColor: "#FFFFFF",   // fundo branco
                    color: "#350973",            // texto roxo
                    border: "1px solid #350973", // borda fina
                    borderRadius: "6px",         // cantos arredondados
                    padding: "6px 10px",         // espaçamento interno
                    fontWeight: "600",           // deixa a fonte mais destacada
                    fontSize: "14px"
                }}
            />
        </div>
    );
}
