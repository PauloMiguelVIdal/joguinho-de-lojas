import React, { useContext } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";

const Card = ({ loja, quantidade, depreciação, valor, estado, index }) => {
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
    const { economiaSetores, setEconomiaSetores, atualizarEco} = useContext(DadosEconomyGlobalContext);

  const conversorTodasLojas = (selecionarLoja) => {
    switch (selecionarLoja) {
      case "Terrenos": return "terrenos";
      case "Lojas Pequenas": return "lojasP";
      case "Lojas Médias": return "lojasM";
      case "Lojas Grandes": return "lojasG";
      default: return "nada";
    }
  };

  const lojaConvertida = conversorTodasLojas(loja)

  const vender = () => {

    if (dados[lojaConvertida].quantidade < quantidade) {
      return alert("você não tem quantidade suficiente para fazer essa negociação")
    }
    atualizarEco("saldo", economiaSetores.saldo + valor);

    atualizarDados(lojaConvertida, {
      ...dados[lojaConvertida],
      quantidade: dados[lojaConvertida].quantidade - quantidade,
    });


    const novasOfertas = dados.ofertas.map((oferta, i) =>
      i === index ? { ...oferta, estado: false } : oferta
    );

    atualizarDados("ofertas", novasOfertas);
  };

  if (quantidade === 0) {
    return (
      <div className="bg-[#350973]  shadow-lg rounded-[10px] flex justify-center items-center flex-col w-[20%] h-[15vh] gap-[2px] flex-wrap">
        <h2 className="text-lg text-white font-bold text-center">Sem oferta disponível <br/> no momento</h2>
      </div>)
  }

  if (!estado) {
    return (
      <div className="bg-roxo shadow-lg rounded-[10px] flex justify-center items-center flex-col w-[20%] h-[15vh] gap-[2px] flex-wrap">
        <h2 className="text-lg text-white font-bold">{loja}</h2>

        <div className="bg-roxo w-[60%] fonteBold text-[15px] text-white text-center flex place-content-around rounded-[5px]">
          <h2 className="">Quantidade:</h2> <h2>{quantidade}</h2>
        </div>

        <div className="bg-roxo w-[60%] fonteBold text-[15px] text-white text-center flex place-content-around rounded-[5px]">
          <h2>Depreciação:</h2> <h2>{(depreciação * 100).toFixed(1)}%</h2>
        </div>

        <div className="bg-roxo w-[60%] fonteBold text-[15px] text-white text-center flex place-content-around rounded-[5px]">
        <h2>R$</h2> <h2>{typeof valor === 'number' ? valor.toLocaleString('pt-BR') : 'N/A'}</h2>

        </div>

        <div className="bg-white absolute z-20 w-[20%] h-[15vh] shadow-lg rounded-[10px] opacity-[60%] flex justify-center items-center">
          <h2 className="text-roxoForte fonteBold ml-[10px] mt-[10px] p-[2px]">adquirido</h2>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-[#350973] shadow-lg rounded-[10px] flex justify-center items-center flex-col w-[20%] h-[15vh] gap-[2px] flex-wrap">
        <h2 className="text-[15px] text-white font-bold">{loja}</h2>

        <div className="bg-roxo w-[60%] fonteLight text-[10px] text-white text-center flex place-content-around rounded-[5px]">
          <h2>Quantidade:</h2> <h2>{quantidade}</h2>
        </div>

        <div className="bg-roxo w-[60%] fonteLight text-[10px] text-white text-center flex place-content-around rounded-[5px]">
          <h2>Depreciação:</h2> <h2>{(depreciação * 100).toFixed(1)}%</h2>
        </div>

        <div className="bg-roxo w-[60%] fonteLight text-[12px] text-white text-center flex place-content-around rounded-[5px]">
        <h2>R$</h2> <h2>{typeof valor === 'number' ? valor.toLocaleString('pt-BR') : 'N/A'}</h2>

        </div>

        <button className="bg-laranja w-[80%] h-[20%] rounded-[20px] text-[15px] flex items-center justify-center text-white fonteBold hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]" onClick={vender}>
          Vender
        </button>
      </div>
    );
  }
};

export default Card;
