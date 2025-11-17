import { useContext, React } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { motion } from "framer-motion";
import fechar from "../../public/outrasImagens/fechar.png";
import closeAudio from "../../public/sounds/closeAudio.mp3"
import useSound from "use-sound";
const ModalInfo = ({ isOpen, message }) => {
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  
const [buttonCloseAudio] = useSound(closeAudio);
  const fecharModalInfo = () => {
    buttonCloseAudio();
          atualizarDados("modalAjuda", {
      ...dados.modalAjuda,
      estadoModal: false,
    });
  };

  if (dados.modalAjuda.estadoModal) {
    return (
      <div className="flex h-screen absolute z-[40] w-screen bg-black/70 absolute">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex flex-col w-[95vw] h-[85vh] rounded-[20px] border-[2px] border-roxo z-[100] p-2 bg-[#350973] m-auto justify-start items-center relative"
        >
          <button
            className="bg-laranja absolute top-[-20px] right-[-20px] w-[40px] h-[40px] flex justify-center items-center rounded-[10px] hover:bg-[#E56100] active:scale-95"
            onClick={fecharModalInfo}
          >
            <img src={fechar} alt="Fechar" className="w-[60%]" />
          </button>
          <h1 className="text-center text-white p-[10px] text-[30px] fonteBold">
            Oiiiiii
          </h1>

          <div>
            <h2 className="text-start text-white opacity-[70%] pl-[20px] text-[25px] pt-[20px] fonteLight">
              Conteudo
            </h2>
          </div>
        </motion.div>
      </div>
    );
  }
};

export default ModalInfo;
