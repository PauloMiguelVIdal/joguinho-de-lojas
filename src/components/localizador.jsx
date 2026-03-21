import React, { useContext } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { CardLocalization } from "./cardLocalization";

export const Localizador = (edificioProcurado, abrirModalSell, idx, setor) => {
  const { dados } = useContext(CentraldeDadosContext);

  const setores = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

  let setorEncontrado = null;
  let indice = -1;

  for (const setor of setores) {
    indice = dados[setor].edificios.findIndex(ed => ed.nome === edificioProcurado);
    if (indice !== -1) {
      setorEncontrado = setor;
      break;
    }
  }

  const verificadorLocalizado = indice === -1 ? "não achou" : "achou";

  return (
<CardLocalization 

      key={`${setor}-${idx}`}
      index={idx}
      setor={setor}
      abrirModalSell={abrirModalSell}
    />

  );
};