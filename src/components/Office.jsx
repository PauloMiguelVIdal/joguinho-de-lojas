import React from "react";
import imgChefePé from "../../public/outrasImagens/chefe em pé.png";
import imgchefeIcon from "../../public/outrasImagens/chefe.png";
import imgFuncionarioIcon from "../../public/outrasImagens/funcionário 1.png";
import imgFuncionarioPé from "../../public/outrasImagens/funcionário 1 em pé.png";
import imgMesa from "../../public/outrasImagens/mesa de trabalho.png";
import imgCadeira from "../../public/outrasImagens/cadeira.png";

export const Office = () => {
  return (
    <div className="w-full h-screen bg-purple-700 flex flex-col items-center justify-start p-6 text-white">
      {/* Caixa de diálogo */}
      <div className="bg-purple-200 text-black p-4 rounded-md max-w-2xl w-full flex items-center justify-between gap-4 shadow-lg">
        {/* Ícone funcionário */}
        <img
          src={imgFuncionarioIcon}
          alt="funcionário"
          className="w-12 h-12 rounded-full"
        />

        {/* Texto central */}
        <p className="flex-1 text-center">
          Chefe, ofereceram <b>180.000</b> na sua fábrica de ração. <br />
          Atualmente o preço de mercado é <b>170.000</b>. <br />
          Você deseja aceitar?
        </p>

        {/* Ícone chefe */}
        <img
          src={imgchefeIcon}
          alt="chefe"
          className="w-12 h-12 rounded-full"
        />
      </div>

      {/* Botões aceitar/recusar */}
      <div className="flex gap-10 mt-6">
        <button className="bg-gray-200 text-black px-8 py-2 rounded-md hover:scale-105 transition">
          aceitar
        </button>
        <button className="bg-gray-200 text-black px-8 py-2 rounded-md hover:scale-105 transition">
          recusar
        </button>
      </div>

      {/* Cena isométrica escalável */}
      <div className="relative w-full flex justify-center mt-12">
        <div className="relative w-[500px] h-[350px] scale-100 origin-bottom">
          {/* Mesa */}
          <img
            src={imgMesa}
            alt="mesa"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[226px] h-auto"
          />

          {/* Cadeira */}
          <img
            src={imgCadeira}
            alt="cadeira"
            className="absolute bottom-[-30px] left-[15%] w-[136px] h-auto"
          />

          {/* Chefe */}
          <img
            src={imgChefePé}
            alt="chefe"
            className="absolute bottom-[0px] right-[28%] w-[256px] h-auto"
          />

          {/* Funcionário */}
          <img
            src={imgFuncionarioPé}
            alt="funcionário"
            className="absolute bottom-[40%] right-[1%] w-[256px] h-auto"
          />
        </div>
      </div>
    </div>
  );
};