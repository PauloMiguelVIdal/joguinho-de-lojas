import React, { useContext } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { CardMinimal } from "./CardMinimal";
import { CardDraftMini } from "./CardDraftMini";

export const LocalizadorDraftMini = (edificioProcurado, abrirModalSell) => {
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
<CardDraftMini index={indice} setor={setorEncontrado}/>
  );
};