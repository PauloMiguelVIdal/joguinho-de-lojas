import React, { useContext, useEffect, useState } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { motion, AnimatePresence } from "framer-motion";

export default function NewStage() {
  const { dados } = useContext(CentraldeDadosContext);
  const [modal, setModal] = useState(false);

  const fecharModal = () => {
    setModal(false);
  };

  useEffect(() => {
    // Abre o modal quando chegar no dia 270
    if (dados.dia === 270) {
      setModal(true);
    }
  }, [dados.dia]);

  // Estilos baseados no seu modelo de referência
  const containerStyle = "fixed inset-0 flex justify-center items-center z-[100] bg-black/90 backdrop-blur-sm select-none";
  const modalStyle = "w-[60vw] max-w-[800px] bg-[#350973]/40 border border-white/10 p-10 rounded-[24px] relative overflow-hidden backdrop-blur-md";
  const buttonStyle = "mt-8 px-10 py-3 bg-gradient-to-br from-laranja to-[#E56100] text-white text-xl font-bold rounded-full hover:scale-105 active:scale-95 transition-all mx-auto block";

  return (
    <AnimatePresence>
      {modal && (
        <div className={containerStyle}>
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={modalStyle}
          >
            {/* Header */}
            <h1 className="text-center text-white text-3xl font-bold mb-2">
              Novo Estágio Alcançado!
            </h1>
            <div className="w-1/2 h-[2px] bg-laranja/50 mx-auto mb-6" />

            {/* Content */}
            <div className="space-y-4 text-center">
              <p className="text-white/90 text-lg font-medium leading-relaxed">
                Parabéns, administrador! Sua empresa agora alcançou um novo patamar na hierarquia empresarial.
              </p>
              
              <div className="grid grid-cols-1 gap-4 text-white/70 text-base font-light text-left bg-white/5 p-6 rounded-xl border border-white/5">
                <p>
                  🚀 <span className="text-laranja font-bold">Expansão:</span> Agora você tem disponibilidade de até <span className="text-white">6 setores</span> com economias próprias e mais de <span className="text-white">150 edifícios</span>.
                </p>
                <p>
                  🏗️ <span className="text-laranja font-bold">Logística:</span> Imóveis e terrenos não geram mais receita direta; eles agora são <span className="text-white">componentes essenciais</span> para suas construções.
                </p>
                <p>
                  🎮 <span className="text-laranja font-bold">Gestão Ativa:</span> Tome as rédeas do seu negócio através do gerenciamento direto em edifícios selecionados.
                </p>
              </div>

              <p className="text-laranja/80 text-sm italic">
                É necessário investir em licenças de setor para liberar o acesso!
              </p>
            </div>

            {/* Footer Button */}
            <button className={buttonStyle} onClick={fecharModal}>
              Entendido
            </button>

            {/* Efeito visual de fundo (opcional, um brilho sutil) */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-laranja/10 rounded-full blur-3xl pointer-events-none" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}