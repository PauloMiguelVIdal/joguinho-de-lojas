import React, { useContext } from "react";
import { NextDay } from "./nextDay";
import PayTexes from "./PayTexes";
import Business from "./business";
import ToggleButton from "./ToggleButton";
import ButtonFinanace from "./ButtonFinance";
import {InfoPage} from "./Info";
import { CentraldeDadosContext } from "../centralDeDadosContext";

export default function Buttons() {
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
const dia = dados.dia

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
