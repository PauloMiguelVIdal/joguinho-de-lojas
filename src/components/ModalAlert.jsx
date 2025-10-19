import { useContext, React } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { motion } from "framer-motion";

const ModalAlert = ({ isOpen, message }) => {
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  const estadoModal = dados.modalAlert.estadoModal;

  const fecharModalAlert = () =>
    atualizarDados("modalAlert", { ...dados.modalAlert, estadoModal: false });
  if (isOpen === true) {
    () =>
      atualizarDados("modalAlert", { ...dados.modalAlert, estadoModal: true });
  }

    let head = `${dados.modalAlert.head}`;
  let content = `${dados.modalAlert.content}`;

  if (!estadoModal) return null;
  return (
  
    <div className="flex h-screen absolute z-[40] w-screen bg-black/70 absolute">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex flex-col w-[40vw] h-[25vh] rounded-[20px] border-[2px] border-roxo z-[100] p-2 bg-[#350973] m-auto justify-start items-center relative"
      >
       <h1 className='text-center text-white p-[10px] text-[30px] fonteBold'>{head}</h1>
 
          <div>
            <h2 className='text-start text-white opacity-[70%] pl-[20px] text-[25px] pt-[20px] fonteLight'>
              {content}
            </h2>
          </div>
          <button
            className='absolute right-[10px] bottom-[10px] text-white bg-laranja p-[10px] rounded-[40px] z-30 fonteBold hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]'
            onClick={fecharModalAlert}
          >
            <h3>Entendido</h3>
          </button>
        </motion.div>
    </div>
   
  );
};

export default ModalAlert;
