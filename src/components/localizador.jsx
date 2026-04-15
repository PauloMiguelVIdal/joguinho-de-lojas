import React, { useContext } from "react";
import { CardLocalization } from "./cardLocalization";
import { useCentralStore, EDIFICIOS_BASE_DINAMICOS, EDIFICIOS_FINAIS_DINAMICOS_INICIAL,LICENCAS_DINAMICAS_GLOBAIS } from "../stores/useCentralStore";
import {
  EDIFICIOS_FINAIS_ESTATICOS,
  LICENCAS_ESTATICAS,
  EDIFICIOS_BASE_ESTATICOS,
  LICENCAS_ESTATICAS_GLOBAIS,
} from "../stores/dadosEstáticos";



export const Localizador = (edificioProcurado, abrirModalSell, idx, setor) => {

  const setores = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

  let setorEncontrado = null;
  let indice = -1;

  for (const s of setores) {
    indice = EDIFICIOS_FINAIS_ESTATICOS[s].edificios.findIndex(ed => ed.nome === edificioProcurado);
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