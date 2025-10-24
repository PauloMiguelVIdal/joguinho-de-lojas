import React, { useContext, useEffect, useState } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { motion } from "framer-motion";
import { use } from "react";

export default function NewStage() {
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);

  const [modal, setModal] = useState(false);

  //   const fecharModal = () => {
  //     buttonCloseAudio();
  //     atualizarDados("modal", { ...dados.modal, estadoModal: false });
  //   };

  const fecharModal = () => {
    setModal(false);
  };

  useEffect(() => {
    if (dados.dia === 271) {
      setModal(true);
    }
  }, [dados.dia]);

  if (modal) {
    return (
      <div className="flex justify-center items-center z-10 bg-black opacity-[98%] w-[100vw] h-[100vh] absolute select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-[55vw] h-[55vh] bg-[#350973] rounded-[20px] z-20 relative"
        >
          <h1 className="text-center  text-white p-[10px] text-[30px] fonteBold">
            Parabéns, você chegou a um novo estágio do jogo
          </h1>
          <div className="w-[80%] h-[10px] bg-gradient-to-l from-laranja to-roxo flex rounded-[5px] relative m-auto"></div>
          <div>
            <p className=" text-[#9E6CE5] text-[20px] mt-4 ml-[20px] mr-[20px]">
              Faça com que a sua empresa alcance locais mais altos na hierárquia empresárial através de expansão da sua empresa através de licenças empresáriais.
            </p>
            <p className=" text-[#9E6CE5] text-[20px] mt-4 ml-[20px] mr-[20px]">
              agora você terá disponibilidade de até 6 setores, nos quais cada
              um tem uma ecônomia de setor própria. Além de mais de 150
              edifícios diferentes para investir, tudo isso você terá acesso através das licenças de setor, por isso é necessário investir nelas!!!
            </p>
            <p className=" text-[#9E6CE5] text-[20px] mt-4 ml-[20px] mr-[20px]">
              Apartir desse momento os seus edifícios de imóvel e terrenos não
              geram mais receita, ou seja , apartir de agora eles são
              componentes para a construção dos seus edifícios.
            </p>
            <p className=" text-[#9E6CE5] text-[20px] mt-4 ml-[20px] mr-[20px]">
              Você terá acesso a oportunidade de gerenciamento ativo em
              determinados edifícios, dessa forma poder tomar as rédeas do seu
              negócio.
            </p>
          </div>
          <button
            className="absolute right-[10px] bottom-[10px] text-white bg-laranja p-[10px] rounded-[40px] z-30 fonteBold hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]"
            onClick={fecharModal}
          >
            <h3>entendido</h3>
          </button>
        </motion.div>
      </div>
    );
  }
}
