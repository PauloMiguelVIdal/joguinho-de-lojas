import React, { useContext, useEffect, useMemo } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { Localizador } from "./localizador";

export const CarteiraLocalizador = ({ abrirModalSell }) => {
  const { dados } = useContext(CentraldeDadosContext);
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);

  const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

  // 🔹 Memoiza a carteira com base em "dados"
  const { carteiraArr, nomesFiltrados } = useMemo(() => {
    const carteiraTemp = [];
    const nomesTemp = [];

    setoresArr.forEach((setor) => {
      const edificiosAtivos = (dados[setor]?.edificios || []).filter((ed) => ed.quantidade > 0);
      carteiraTemp.push(edificiosAtivos);
      edificiosAtivos.forEach((ed) => nomesTemp.push(ed.nome));
    });

    return { carteiraArr: carteiraTemp, nomesFiltrados: nomesTemp };
  }, [dados]);

  // 🔹 Só atualiza carteira global se houver diferença
  useEffect(() => {
    const carteiraAtual = economiaSetores.carteira?.carteiraAtual || [];

    // compara tamanhos e conteúdo (bem simples)
    const mudou =
      JSON.stringify(carteiraAtual) !== JSON.stringify(carteiraArr);

    if (mudou) {
      atualizarEco("carteira", {
        ...economiaSetores.carteira,
        carteiraAtual: carteiraArr,
      });
      console.log("Carteira atualizada:", carteiraArr);
    }
  }, [carteiraArr, economiaSetores.carteira, atualizarEco]);

  return (
    
    <div className="w-full gap-y-[20px] grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] h-[400px]">
      {nomesFiltrados.map((nome) => Localizador(nome, abrirModalSell))}
    </div>
  );
};
