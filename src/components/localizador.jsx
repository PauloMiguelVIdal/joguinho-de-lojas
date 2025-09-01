import React, { useContext } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { CardLocalization } from "./cardLocalization";
import { useAgricultura } from "./AgriculturaContext";
import { useImobiliario } from "./ImobiliarioContext";
import { useEnergia } from "./EnergiaContext";
import { useIndustria } from "./IndustriaContext";
import { useComercio } from "./ComercioContext";
import { useTecnologia } from "./TecnologiaContext";

export const Localizador = (edificioProcurado) => {
  // const { dados } = useContext(CentraldeDadosContext);

  const setores = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];


  const { dadosAgricultura, setDadosAgricultura } = useAgricultura();
  const { dadosImobiliario, setDadosImobiliario } = useImobiliario();
  const { dadosEnergia , setDadosEnergia  } = useEnergia ();
  const { dadosIndustria , setDadosIndustria  } = useIndustria ();
  const { dadosComercio, setDadosComercio } = useComercio();
  const { dadosTecnologia , setDadosTecnologia  } = useTecnologia ();





  let setorEncontrado = null;
  let indice = -1;

  for (const setor of setores) {


    const setorSelecionado = (setor) => {
      switch (setor) {
        case "agricultura": return dadosAgricultura;
        case "tecnologia": return dadosTecnologia;
        case "industria": return dadosIndustria;
        case "comercio": return dadosComercio;
        case "imobiliario": return dadosImobiliario;
        case "energia": return dadosEnergia;
        case "carteira": return "dadosCarteira";
      }
    }

const setorAtual =  setorSelecionado(setor)


console.log(dadosAgricultura.agricultura.edificios[0].nome)


indice = dadosAgricultura.agricultura.edificios.findIndex(ed => ed.nome === edificioProcurado);
    if (indice !== -1) {
      setorEncontrado = setor;
      break;
    }
  }

  const verificadorLocalizado = indice === -1 ? "não achou" : "achou";

  return (
<CardLocalization index={indice} setor={setorEncontrado}/>
  );
};