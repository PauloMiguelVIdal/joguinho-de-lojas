import React from "react";
import { useState, useContext } from "react";
import { useEffect } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";

export default function Converter() {
    const { dados, atualizarDados,atualizarDadosProf2 } = useContext(CentraldeDadosContext)

    let patrimonio = 0
    console.log(patrimonio)
    const lojas = ["terrenos", "lojasP", "lojasM", "lojasG"]


    useEffect(() => {
    if (dados.dia === 250) {

            lojas.forEach(lojas => {

                const quantidadeLojas = dados[lojas].quantidade
                const preçoConstrução = dados[lojas].preçoConstrução

                const quantidadeTerrenosNec = dados[lojas].quantidadeNecTerreno
                const custoTerreno = dados.terrenos.preçoConstrução

                const custoTotalLoja = quantidadeLojas * preçoConstrução + quantidadeTerrenosNec * custoTerreno

                patrimonio += custoTotalLoja
                console.log("o patrimônio é de: ", patrimonio)
                const patrimonioTotal = patrimonio + dados.saldo
                console.log("o patrimônio total é de: ", patrimonioTotal)

                atualizarDados("saldo", patrimonioTotal)
                atualizarDados("saldo", patrimonioTotal)
               
                console.log(  dados[lojas].quantidade)
                atualizarDadosProf2(["lojasP", "quantidade"],0) // não estpa funcionando
            })
            

        }
    }, [dados.dia])
}
