import React, { useContext } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import Card from "./cards";

const ListaDeOfertas = () => {
    const { dados } = useContext(CentraldeDadosContext);
  
    return (
      <div className="flex flex-wrap place-content-around bg-roxo gap-[2px] h-full rounded-[10px]">
        {dados?.ofertas?.map((oferta, index) => (
          <Card key={index} {...oferta} index={index} />
        ))}
      </div>
    );
};

export default ListaDeOfertas;
