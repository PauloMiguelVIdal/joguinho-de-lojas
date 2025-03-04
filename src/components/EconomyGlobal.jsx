import React , {useContext, useEffect} from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import circularEconomia from "../imagens/circular-economy.png"

export default function EconomyGlobal(){
    const { dados, atualizarDados } = useContext(CentraldeDadosContext);
    const estadosEconômicos = ["recessão","estável","aquecida"]
    const economiaAtual = dados.economiaGlobal
    

    const corClasse = {
      "recessão": "bg-[#FF0000]",
      "estável": "bg-[#EEAD2D]",
      "aquecida": "bg-[#006400]",
    }[economiaAtual] || "bg-black";
    
   
    const selecionarItem = (lista) => lista[Math.floor(Math.random() * lista.length)];

    const novaEconomia = selecionarItem(estadosEconômicos)

useEffect(()=>{
    if(dados.dia % 90 === 0){
        atualizarDados('modalEconomiaGlobal', { ...dados.modalEconomiaGlobal, estadoModal: true });
            atualizarDados("economiaGlobal",novaEconomia)
        console.log("useEffect chamado5!");

    }
},[dados.dia])
    
     useEffect(()=>{
    
        const proximoDiaChegar = (n) =>{
        
            return ((n % 90 === 0 ? n : n + (90 - (n % 90))) - dados.dia);
        }
      const proximoDia = proximoDiaChegar(dados.dia);
     atualizarDados("proximaEconomia",proximoDia
     )
     console.log("useEffect chamado6!");
    
    },[dados.dia])
    return(
        
            // <div className={`${corClasse}`}>
            //     <img className="h-[10%]" src={circularEconomia}></img>
            // </div>
                    <div className="flex max-h-[50px] w-[200px] bg-[#350973] rounded-[10px]">
                        <div className={`${corClasse}  min-h-[50px] max-h-[70px] min-w-[50px] max-w-[70px] aspect-square rounded-[10px] flex w-[50px] items-center justify-center`} >
                            <img className="w-[60%] w-max-[58px]  aspect-square" src={circularEconomia} />
                        </div>
                        <div className="flex justify-center items-center w-full">
                            <h2 className={` text-white text-[20px] fonteBold`}>{dados.proximaEconomia}</h2>
                        </div>
                    </div>
        
        )
}