import { useState, useContext,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import mapa from "../../public/outrasImagens/maps.png";
import DolarImg from "../../public/outrasImagens/simbolo-do-dolar.png";
import { CentraldeDadosContext } from "../centralDeDadosContext";

export default function ButtonFinance({ corClasse }) {
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  const [toggled, setToggled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const setVision = (newVision) => {
    atualizarDados("vision", {
      ...dados.vision,
      visionAtual: newVision,
    });
  };



  const toggleHandler = () => {
        setVision("financas");
  };

 

  return (
    <div
      className="bg-[#290064] h-[50px] aspect-square rounded-[10px] flex items-center justify-center cursor-pointer"
      onClick={toggleHandler}
    >
      <AnimatePresence mode="wait">
        {toggled ? (
          <motion.img
            key="financas"
            src={DolarImg}
            alt="Finanças"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-[60%] max-w-[58px] aspect-square hover:scale-[1.1]"
            onAnimationStart={() => setIsAnimating(true)}
            onAnimationComplete={() => setIsAnimating(false)}
          />
        ) : (
          <motion.img
            key="mapa"
            src={DolarImg}
            alt="Mapa"
            
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="w-[60%] max-w-[58px] aspect-square hover:scale-[1.1]"
            onAnimationStart={() => setIsAnimating(true)}
            onAnimationComplete={() => setIsAnimating(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
