import React, { useContext } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { CardUpgrade } from "./CardUpgrade";

export const LocalizadorUpgrade = (edificioProcurado, fatu, redCusto) => {
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

    return (
        <CardUpgrade index={indice} setor={setorEncontrado} fatu={fatu} redCusto={redCusto} />
    );
};