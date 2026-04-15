import React, { useContext } from "react";
import { NextDay } from "./nextDay";
import PayTexes from "./PayTexes";
import Business from "./business";
import ToggleButton from "./ToggleButton";
import ButtonFinanace from "./ButtonFinance";
import {InfoPage} from "./Info";
// import { CentraldeDadosContext } from "../centralDeDadosContext";
import { useCentralStore, EDIFICIOS_BASE_DINAMICOS, EDIFICIOS_FINAIS_DINAMICOS_INICIAL,LICENCAS_DINAMICAS_GLOBAIS } from "../stores/useCentralStore";
import {
  EDIFICIOS_FINAIS_ESTATICOS,
  LICENCAS_ESTATICAS,
  EDIFICIOS_BASE_ESTATICOS,
  LICENCAS_ESTATICAS_GLOBAIS,
} from "../stores/dadosEstáticos";



export default function Buttons() {
  // const { dados } = useContext(CentraldeDadosContext);
 const dia = useCentralStore((s) => s.dia);
  return (
    <div className="flex items-center w-full h-full mr-[50px]">
      <div className="flex items-center gap-[10px] w-full">

        <NextDay />

        <PayTexes />

        {dia < 270 && (
          <Business />
        )}

        {dia >= 270 && (
          <>
            <Business />
            <InfoPage />
          </>
        )}

      </div>
    </div>
  );
}
