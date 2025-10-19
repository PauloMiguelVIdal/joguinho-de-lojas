import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import mapa from "../../public/outrasImagens/maps.png";
import computador from "../../public/outrasImagens/computer-screen.png";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import useSound from 'use-sound';
import visionAudio from "../../public/sounds/visionAudio.mp3"
export default function ToggleButton({ corClasse }) {
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);

  const [toggled, setToggled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [buttonVisionAudio] = useSound(visionAudio)
  const setVision = (newVision) => {
    atualizarDados("vision", {
      ...dados.vision,
      visionAtual: newVision,
    });
  };

useEffect(()=>{
  if(dados.vision.
    visionAtual==="mapa" && toggled==="dashbord"){
      setToggled("mapa")
     setIsAnimating(true)
    }
    else{
        if(dados.vision.
    visionAtual==="dashbord" && toggled==="mapa"){
      setToggled("dashbord")
     setIsAnimating(true)
    }
    }
  }
),[dados.vision.
      visionAtual]

      const funcMudar = () =>{
toggleHandler(),buttonVisionAudio()
      }

  const toggleHandler = () => {
    if (!isAnimating) {
      const novoEstado = !toggled;
      setToggled(novoEstado);

      // define a visão correspondente
      if (novoEstado) {
        setVision("mapa");
      } else {
        setVision("dashboard");
      }
    }
  };

  return (
    <div
      className="bg-[#290064] h-[50px] aspect-square rounded-[10px] flex items-center justify-center cursor-pointer"
      onClick={funcMudar}
    >
      <AnimatePresence mode="wait">
        {toggled ? (
          <motion.img
            key="img2"
            src={mapa}
            alt="Mapa"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="w-[60%] max-w-[58px] aspect-square"
            onAnimationStart={() => setIsAnimating(true)}
            onAnimationComplete={() => setIsAnimating(false)}
          />
        ) : (
          <motion.img
            key="img1"
            src={computador}
            alt="Computador"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-[60%] max-w-[58px] aspect-square"
            onAnimationStart={() => setIsAnimating(true)}
            onAnimationComplete={() => setIsAnimating(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
