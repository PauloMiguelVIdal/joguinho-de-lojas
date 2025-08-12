import React from "react";
import { useState, useContext } from "react";
import { useEffect } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";


export default function Converter() {
    const { dados, atualizarDados, atualizarDadosProf2 } = useContext(CentraldeDadosContext)
    const { economiaSetores, setEconomiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);


    // console.log(patrimonio)
    const lojas = ["terrenos", "lojasP", "lojasM", "lojasG"]


    useEffect(() => {
        if (dados.dia === 260) {
          let patrimonio = 0;
      
          lojas.forEach(loja => {
            const quantidadeLojas = dados[loja].quantidade;
            const precoConstrucao = dados[loja].preçoConstrução;
      
            const quantidadeTerrenosNec = dados[loja].quantidadeNecTerreno;
            const custoTerreno = dados.terrenos.preçoConstrução;
      
            const custoTotalLoja = quantidadeLojas * precoConstrucao + quantidadeTerrenosNec * custoTerreno;
            patrimonio += custoTotalLoja;
            console.log(patrimonio)
          });
      
          
          // const patrimonioTotal = patrimonio + economiaSetores.saldo;
      
          atualizarEco("saldo", economiaSetores.saldo + patrimonio);
           // uma única atualização
           console.log(patrimonio)
        }
      }, [dados.dia]);
      
}
