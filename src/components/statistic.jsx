import React, {useContext } from 'react';
import { CentraldeDadosContext } from "../centralDeDadosContext";

export const Statistic = () =>{
 const { dados, atualizarDados } = useContext(CentraldeDadosContext);


 

const custosTerrenos = (dados.terrenos.preçoConstrução) + (dados.terrenos.preçoConstrução)   
const lucrosTerrenos = (dados.terrenos.faturamentoUnitárioPadrão * 30 )
const impostosTerrenos = (lucrosTerrenos * dados.terrenos.impostoSobreFaturamento) + (dados.terrenos.impostoFixo) 
const resultadoTerrenos = (((lucrosTerrenos  - impostosTerrenos) /  custosTerrenos) * 100)



const custosLojasP = (dados.lojasP.preçoConstrução) + (dados.terrenos.preçoConstrução)   
const lucrosLojasP = (dados.lojasP.faturamentoUnitárioPadrão * 30 )
const impostosLojasp = (lucrosLojasP * dados.lojasP.impostoSobreFaturamento) + (dados.lojasP.impostoFixo) 
const resultadoLojasP = (((lucrosLojasP  - impostosLojasp) /  custosLojasP) * 100)

const custosLojasM = (dados.lojasM.preçoConstrução) + (2 * dados.terrenos.preçoConstrução)   
const lucrosLojasM = (dados.lojasM.faturamentoUnitárioPadrão * 30 )
const impostosLojasM = (lucrosLojasM * dados.lojasM.impostoSobreFaturamento) + (dados.lojasM.impostoFixo) 
const resultadoLojasM = (((lucrosLojasM  - impostosLojasM) /  custosLojasM) * 100)

const custosLojasG = (dados.lojasG.preçoConstrução) + (3 * dados.terrenos.preçoConstrução)   
const lucrosLojasG = (dados.lojasG.faturamentoUnitárioPadrão * 30 )
const impostosLojasG = (lucrosLojasG * dados.lojasG.impostoSobreFaturamento) + (dados.lojasG.impostoFixo) 
const resultadoLojasG = (((lucrosLojasG  - impostosLojasG) /  custosLojasG) * 100)



return{
    resultadoTerrenos,
    resultadoLojasP,
    resultadoLojasM,
    resultadoLojasG
}
   

   


}

