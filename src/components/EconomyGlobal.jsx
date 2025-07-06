import React, { useContext, useEffect } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import circularEconomia from "../imagens/circular-economy.png";

export default function EconomyGlobal() {
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  const estadosEconômicos = ["recessão", "declinio", "estável", "progressiva", "aquecida"];
  const economiaAtual = dados.economiaGlobal;

  // Mapeia o estado da economia para uma cor
  const corClasse = {
    "recessão": "bg-[#FF0000]",
    "declinio": "bg-[#FF8000]",
    "estável": "bg-[#EEAD2D]",
    "progressiva": "bg-[#9ACD32]",
    "aquecida": "bg-[#006400]",
  }[economiaAtual] || "bg-black";

  // Seleciona aleatoriamente um item da lista
  const selecionarItem = (lista) => lista[Math.floor(Math.random() * lista.length)];

  // Altera a economia global a cada 90 dias
  useEffect(() => {
    if (dados.dia % 90 === 0) {
      const novaEconomia = selecionarItem(estadosEconômicos); // gerar nova economia no momento certo
      atualizarDados('modalEconomiaGlobal', {
        ...dados.modalEconomiaGlobal,
        estadoModal: true
      });
      atualizarDados("economiaGlobal", novaEconomia);
      console.log("useEffect chamado5! Economia:", novaEconomia);
    }
  }, [dados.dia]);

  // Calcula dias restantes até a próxima mudança de economia
  useEffect(() => {
    const calcularProximoDia = (n) => {
      return (n % 90 === 0 ? 0 : 90 - (n % 90));
    };
    const proximoDia = calcularProximoDia(dados.dia);
    atualizarDados("proximaEconomia", proximoDia);
    console.log("useEffect chamado6! Dias até próxima economia:", proximoDia);
  }, [dados.dia]);

  return (
    <div className="flex max-h-[50px] w-[100%] bg-white rounded-[10px]">
      <div className={`${corClasse} min-h-[50px] max-h-[70px] min-w-[50px] max-w-[70px] aspect-square rounded-[10px] flex w-[50px] items-center justify-center`}>
        <img className="w-[60%] max-w-[58px] aspect-square" src={circularEconomia} alt="Economia" />
      </div>
      <div className="flex justify-center items-center w-full">
        <h2 className="text-[#350973] text-[20px] fonteBold">{dados.proximaEconomia}</h2>
      </div>
    </div>
  );
}


//iniciar alterações