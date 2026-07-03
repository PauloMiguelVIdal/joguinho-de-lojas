import React, { useContext } from 'react';
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import agricultura from "../../public/outrasImagens/setores/agricultura.png";
import tecnologia from "../../public/outrasImagens/setores/tecnologia.png";
import comercio from "../../public/outrasImagens/setores/comercio.png";
import industria from "../../public/outrasImagens/setores/industria.png";
import imobiliario from "../../public/outrasImagens/setores/imobiliario.png";
import energia from "../../public/outrasImagens/setores/torre-eletrica.png";
import { CentraldeDadosContext } from "../centralDeDadosContext";

// Tooltip
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

function Economys() {
  const { economiaSetores } = useContext(DadosEconomyGlobalContext);
  const { dados } = useContext(CentraldeDadosContext);

  const setores = ["agricultura", "tecnologia", "industria", "comercio", "imobiliario", "energia"];

  const tooltipStyle = {
    backgroundColor: "#FFFFFF",
    color: "#350973",
    borderRadius: "6px",
    padding: "6px 10px",
    fontWeight: "600",
    fontSize: "14px",
  };

  const TooltipPadrao = ({ id }) => (
  <Tooltip
    id={id}
    style={tooltipStyle}
    border="1px solid #350973"
  />
);

  const imagensSetores = {
    agricultura,
    tecnologia,
    industria,
    comercio,
    imobiliario,
    energia
  };

}

export default Economys;
