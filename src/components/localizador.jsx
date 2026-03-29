import React, { useContext } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { CardLocalization } from "./cardLocalization";

export const Localizador = (edificioProcurado, abrirModalSell, idx, setor) => {
  const { dados } = useContext(CentraldeDadosContext);

  const setores = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

  let setorEncontrado = null;
  let indice = -1;

  for (const s of setores) {
    indice = dados[s].edificios.findIndex(ed => ed.nome === edificioProcurado);
    if (indice !== -1) {
      setorEncontrado = s;
      break;
    }
  }

  if (indice === -1 || !setorEncontrado) return null;

  return (
    <CardLocalization
      key={`${setorEncontrado}-${indice}`}
      index={indice}
      setor={setorEncontrado}
      abrirModalSell={abrirModalSell || (() => {})}
    />
  );
};