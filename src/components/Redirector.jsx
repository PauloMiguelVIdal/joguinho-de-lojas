import { createContext, useContext } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";

// hooks de cada setor
import { useAgricultura } from "./AgriculturaContext";
import { useComercio } from "./ComercioContext";
import { useIndustria } from "./IndustriaContext";
import { useEnergia } from "./EnergiaContext";
import { useImobiliario } from "./ImobiliarioContext";
import { useTecnologia } from "./TecnologiaContext";

const SetorContext = createContext();

export const SetorProvider = ({ children }) => {
  const { dados } = useContext(CentraldeDadosContext);
  const setorAtivo = dados?.setorAtivo;

  let dadosSetor = null;

  switch (setorAtivo) {
    case "agricultura":
      dadosSetor = useAgricultura();
      break;
    case "comercio":
      dadosSetor = useComercio();
      break;
    case "industria":
      dadosSetor = useIndustria();
      break;
    case "energia":
      dadosSetor = useEnergia();
      break;
    case "imobiliario":
      dadosSetor = useImobiliario();
      break;
    case "tecnologia":
      dadosSetor = useTecnologia();
      break;
    default:
      dadosSetor = null;
  }

  return (
    <SetorContext.Provider value={{ setorAtivo, dadosSetor }}>
      {children}
    </SetorContext.Provider>
  );
};

export const useSetor = () => useContext(SetorContext);
