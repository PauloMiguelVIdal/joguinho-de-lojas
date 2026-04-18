import React, { useContext } from "react";
// import { CentraldeDadosContext } from "../centralDeDadosContext";
import Card from "./cards";
import { useCentralStore, EDIFICIOS_BASE_DINAMICOS, EDIFICIOS_FINAIS_DINAMICOS_INICIAL,LICENCAS_DINAMICAS_GLOBAIS } from "../stores/useCentralStore";
import {
  EDIFICIOS_FINAIS_ESTATICOS,
  LICENCAS_ESTATICAS,
  EDIFICIOS_BASE_ESTATICOS,
  LICENCAS_ESTATICAS_GLOBAIS,
} from "../stores/dadosEstáticos";


const ListaDeOfertas = () => {
    // const { dados } = useContext(CentraldeDadosContext);
    const ofertas = useCentralStore((s) => s.ofertas);

    return (
      <div className="flex flex-wrap place-content-around bg-roxo gap-[2px] h-full rounded-[10px]">
        {ofertas?.map((oferta, index) => (
          <Card key={index} {...oferta} index={index} />
        ))}
      </div>
    );
};

export default ListaDeOfertas;
