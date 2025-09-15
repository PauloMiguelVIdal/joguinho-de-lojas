import React, { useContext, useEffect } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import circularEconomia from "../imagens/circular-economy.png";
import agricultura from '../components/setores/agricultura.png';
import tecnologia from '../components/setores/tecnologia.png';
import industria from '../components/setores/industria.png';
import comercio from '../components/setores/comercio.png';
import imobiliario from '../components/setores/Imobiliário.png';
import energia from '../components/setores/torre-eletrica.png';
import Converter from "./Converter";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";


export default function EconomyGlobal() {
  const { dados, atualizarDados} = useContext(CentraldeDadosContext);
  const { economiaSetores, setEconomiaSetores, atualizarDadosEconomy, atualizarEco} = useContext(DadosEconomyGlobalContext);

  const estadosEconômicos = ["recessão", "declinio", "estável", "progressiva", "aquecida"];
  const economiaAtual = economiaSetores.economiaGlobal;
  const setores = ["agricultura", "tecnologia", "industria", "comercio", "imobiliario", "energia"];

  const imagensSetores = {
    agricultura,
    tecnologia,
    industria,
    comercio,
    imobiliario,
    energia
  };

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
  let somaEconomias = 0;
  // Converte o estado da economia em um valor numérico
  const valorEconomico = (estado) =>
    ({ recessão: -2, declinio: -1, estável: 0, progressiva: 1, aquecida: 2 }[estado] ?? 0);



  

  // Altera a economia global a cada 90 dias
  useEffect(() => {
    // if (dados.dia % 90 === 0 && dados.dia >269) {



    //   // const novaEconomia = resultadoEconomia(somaEconomias);
    
    //   // atualizarDados('modalEconomiaGlobal', {
    //   //   ...dados.modalEconomiaGlobal,
    //   //   estadoModal: true
    //   // });


    //   // atualizarDados("economiaGlobal", novaEconomia);
    //   // console.log("useEffect chamado5! Economia:", novaEconomia);
    // }

    if (dados.dia % 90 === 0 && dados.dia <= 269) {
      const novaEconomia = selecionarItem(estadosEconômicos);
      atualizarDados('modalEconomiaGlobal', {
        ...dados.modalEconomiaGlobal,
        estadoModal: true
      });
      atualizarEco("economiaGlobal", novaEconomia);
      console.log("useEffect chamado5! Economia:", novaEconomia);
    }
  }, [dados.dia]);

  // Sorteia e atualiza a economia dos setores + soma
  useEffect(() => {
    if (dados.dia % 90 === 0
       && dados.dia >= 270
      ) {

      setores.forEach((setor) => {
        const novaEconomia = selecionarItem(estadosEconômicos);

        // Atualiza a economia do setor
        atualizarDadosEconomy([setor, "economiaSetor", "estadoAtual"], novaEconomia);
        console.log("Economia setor sorteada:", setor, novaEconomia);

        // Soma os valores
        somaEconomias += valorEconomico(novaEconomia);

        const decidirEconomiaSetor = () => {
          if (somaEconomias < -5) return "recessão";
          if (somaEconomias < -2) return "declinio";
          if (somaEconomias <  2) return "estável"
          if (somaEconomias <  5) return "progressiva";
          return "aquecida";
        }        






        // console.log("essa é a soma" ,somaEconomias)

        const novaEconomiaGlobal = decidirEconomiaSetor();
        // console.log(novaEconomiaGlobal, "Teste")
        atualizarDados('modalEconomiaGlobal', {
          ...dados.modalEconomiaGlobal,
          estadoModal: true
        });
        
        //  console.log("essa é a economia global", novaEconomiaGlobal)
        atualizarEco("economiaGlobal", novaEconomiaGlobal);
        // console.log("useEffect chamado5! Economia global:", novaEconomiaGlobal);


      });

      // console.log("Soma total das economias dos setores:", somaEconomias);
    }
  }, [dados.dia]);

  // Calcula dias restantes até a próxima mudança de economia
  useEffect(() => {
    const calcularProximoDia = (n) => {
      return (n % 90 === 0 ? 0 : 90 - (n % 90));
    };
    const proximoDia = calcularProximoDia(dados.dia);
    atualizarDados("proximaEconomia", proximoDia);
    // console.log("useEffect chamado6! Dias até próxima economia:", proximoDia);
  }, [dados.dia]);

  return (
    <div className="flex max-h-[50px] w-[100%] bg-white rounded-[10px]">
      <Converter />
      <div className={`${corClasse} min-h-[50px] max-h-[70px] min-w-[50px] max-w-[70px] aspect-square rounded-[10px] flex w-[50px] items-center justify-center`}>
        <img className="w-[60%] max-w-[58px] aspect-square" src={circularEconomia} alt="Economia" />
      </div>
      <div className="flex justify-center items-center w-full">
        <h2 className="text-[#350973] text-[20px] fonteBold">{dados.proximaEconomia}</h2>
      </div>
    </div>
  );
}
