import React, { useContext } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";

export default function Dashboard() {
    const { dados, AtualizarDados } = useContext(CentraldeDadosContext)

    return (
        <div className="bg-[#6E0BF9] rounded-[20px]">
            nada
        </div>
    )
}