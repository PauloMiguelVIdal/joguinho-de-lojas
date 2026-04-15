import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCentralStore } from "../stores/useCentralStore"; // Ajuste o caminho conforme seu projeto

const ModalAlert = () => {
  // 1. Pegamos apenas o que precisamos da Store
  // Usamos seletores específicos para evitar re-renderizações desnecessárias
  const modalData = useCentralStore((s) => s.modalAlert);
  const set = useCentralStore((s) => s.setState); // Ou uma função específica de fechar se você tiver

  // 2. Função para fechar o modal usando o padrão Immer (se sua store permitir mutate)
  // Caso não tenha uma função 'fecharModal' na store, você pode usar o atualizarDados que já existe
  const atualizarDados = useCentralStore((s) => s.atualizarDados);

  const fecharModalAlert = () => {
    atualizarDados("modalAlert", { ...modalData, estadoModal: false });
  };

  // 3. Extraímos os dados para o componente
  const { estadoModal, head, content } = modalData;

  if (!estadoModal) return null;

  return (
    <div className="fixed inset-0 flex h-screen w-screen bg-black/70 z-[40]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex flex-col w-[40vw] h-[25vh] rounded-[20px] border-[2px] border-roxo z-[100] p-2 bg-[#350973] m-auto justify-start items-center relative"
      >
        <h1 className="text-center text-white p-[10px] text-[30px] fonteBold">
          {head}
        </h1>

        <div>
          <h2 className="text-start text-white opacity-[70%] pl-[20px] text-[25px] pt-[20px] fonteLight">
            {content}
          </h2>
        </div>

        <button
          className="absolute right-[10px] bottom-[10px] text-white bg-laranja p-[10px] rounded-[40px] z-30 fonteBold hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]"
          onClick={fecharModalAlert}
        >
          <h3>Entendido</h3>
        </button>
      </motion.div>
    </div>
  );
};

export default ModalAlert;