import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import chefe from "../../public/outrasImagens/chefe.png";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";

export default function ModalPerson() {
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  const { economiaSetores } = useContext(DadosEconomyGlobalContext);

  // 🎭 Narrativas organizadas por dia
  const narrativas = {
    1: {
      texto: "Depois de muito tempo economizando, finalmente juntei 100 mil reais. É hora de começar minha jornada como empreendedor. Acho que investir em um pequeno imóvel pode ser um bom começo. Um aluguel aqui, outro ali… e quem sabe isso não vira algo grande?",
      tipo: "pensamento"
    },
    2: {
      texto: "Pronto! Meu primeiro imóvel. Dá uma sensação boa ver algo que era só um plano ganhando forma. Agora é esperar o dinheiro cair e começar a planejar o próximo passo.",
      tipo: "fala"
    },
        4: {
      texto: "Pronto! Meu primeiro imóvel. Dá uma sensação boa ver algo que era só um plano ganhando forma. Agora é esperar o dinheiro cair e começar a planejar o próximo passo.",
      tipo: "fala"
    },
    26: {
      texto: "Tenho que ficar atento pois a cada trinta dias eu tenho que pagar as despesas",
      tipo: "pensamento"
    },
    30: {
      texto: "Primeiro mês encerrado! O dinheiro caiu direitinho, mas os impostos… ai. Já percebi que não dá pra relaxar muito — preciso sempre planejar o próximo investimento.",
      tipo: "pensamento"
    },
    45: {
      texto: "Tenho que me planejar da melhor maneira possível para continuar crescendo",
      tipo: "pensamento"
    },
    86: {
      texto: "Logo menos terá alterações na economia global. Preciso ficar atento para aproveitar as oportunidades e evitar riscos desnecessários.",
      tipo: "fala"
    },
   90: {
      texto: "tenho que ficar atento como a economia global está se comportando, para eu poder tomar as melhores decisões para o meu negócio.",
      tipo: "pensamento"
    },
   117: {
      texto: "Interessante… quanto mais invisto, mais percebo que o mercado muda o tempo todo. O que é seguro hoje pode não ser amanhã. Talvez eu devesse começar a pensar em algo além de imóveis…",
      tipo: "pensamento"
    },
    210: {
      texto: "Tenho feito bons negócios, mas sinto que falta algo. Comprar e vender imóveis é seguro, mas não é empolgante como antes. Quero criar, produzir… sentir que estou construindo algo maior.",
      tipo: "pensamento"
    },
    270: {
      texto: "270 dias se passaram desde o meu primeiro investimento. Construí meu patrimônio, aprendi sobre risco e retorno, e agora… sinto que estou pronto. Quero expandir. Chegou a hora de diversificar, de abrir novos horizontes. Que venham os novos setores!",
      tipo: "fala"
    },
    primeiroTerreno:{
      texto: "Seria uma otíma hora para eu comprar um terreno novo!",
      tipo: "fala"
    },
    segundaLojaP:{
      texto: "Seria uma otíma hora para eu comprar mais um imóvel pequeno!",
      tipo: "fala"
    },
        primeiroEvento:{
      texto: "Tenho que ficar atento aos eventos que podem impactar meu negócio, principalmente os que eu já possuo!",
      tipo: "fala"
    },
  };

  // 🔹 Ativar modal automaticamente em dias específicos
  useEffect(() => {
    if (narrativas.hasOwnProperty(dados.dia)) {
      const narrativaAtual = narrativas[dados.dia];
      atualizarDados("modalPerson", {
        estadoModal: true,
        texto: narrativaAtual.texto,
        tipo: narrativaAtual.tipo
      });
    }
  }, [dados.dia]);

  // 🔹 Pegar dados do modal do Context
  const modalData = dados.modalPerson || {
    estadoModal: false,
    texto: "",
    tipo: "pensamento"
  };

  useEffect(() => {
        if(economiaSetores.saldo >= dados.terrenos.preçoConstrução && dados.dia < 54 &&  dados.lojasP.quantidade > 0){

      const narrativaAtual = narrativas["primeiroTerreno"];
      atualizarDados("modalPerson", {
        estadoModal: true,
        texto: narrativaAtual.texto,
        tipo: narrativaAtual.tipo
      });
    }

        if(economiaSetores.saldo >= dados.lojasP.preçoConstrução && dados.dia < 150 && dados.dia > 120 && dados.lojasP.quantidade === 1 && dados.terrenos.quantidade === 1){

      const narrativaAtual = narrativas["segundaLojaP"];
      atualizarDados("modalPerson", {
        estadoModal: true,
        texto: narrativaAtual.texto,
        tipo: narrativaAtual.tipo
      });
    }

 if(dados.dia == dados.eventoAtual.diaInicial && dados.dia < 10 ){

      const narrativaAtual = narrativas["primeiroEvento"];
      atualizarDados("modalPerson", {
        estadoModal: true,
        texto: narrativaAtual.texto,
        tipo: narrativaAtual.tipo
      });
    }

  }, [dados.dia]);



  const fecharModal = () => {
    atualizarDados("modalPerson", {
      ...modalData,
      estadoModal: false
    });
  };

  // 🔹 Se o modal não estiver ativo, não renderiza nada
  if (!modalData.estadoModal) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        {/* Personagem no canto inferior esquerdo */}
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute bottom-0 left-0 z-10"
        >
          {/* Avatar do Personagem */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-full bg-gradient-to-br from-[#F27405] to-[#E56100] relative mb-2 border-4 border-white/20"
          >
            <img className="w-[200px] h-[200px]" src={chefe} alt="Personagem" />
          </motion.div>
        </motion.div>

        {/* Balão de narrativa */}
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
          className="relative max-w-[700px] mx-auto"
        >
          {/* Conector do balão (ponteiro para o personagem) */}
          <svg
            className="absolute -bottom-[60px] left-[80px] w-[100px] h-[80px] z-0"
            viewBox="0 0 100 80"
          >
            <path
              d="M 10 0 Q 30 40, 80 80"
              fill="none"
              stroke="#1a0a3b"
              strokeWidth="3"
            />
            <circle cx="80" cy="75" r="8" fill="#1a0a3b" />
            {modalData.tipo === "pensamento" && (
              <>
                <circle cx="60" cy="55" r="6" fill="#1a0a3b" opacity="0.7" />
                <circle cx="40" cy="35" r="4" fill="#1a0a3b" opacity="0.5" />
              </>
            )}
          </svg>

          {/* Balão principal */}
          <div className="relative bg-[#1a0a3b] rounded-[30px] p-8 shadow-2xl border-4 border-[#6A00FF]/30">
            {/* Borda gradiente decorativa */}
            <div className="absolute inset-0 rounded-[30px] bg-gradient-to-r from-[#6A00FF] via-[#F27405] to-[#6A00FF] opacity-20 blur-sm"></div>

            {/* Botão fechar */}
            <button
              onClick={fecharModal}
              className="absolute -top-4 -right-4 w-12 h-12 bg-[#F27405] hover:bg-[#E56100] rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Indicador de tipo (pensamento ou fala) */}
            <div className="absolute -top-3 left-8 px-4 py-1 bg-[#6A00FF] rounded-full text-white text-sm font-bold">
              {modalData.tipo === "pensamento" ? "💭 Pensamento" : "💬 Reflexão"}
            </div>

            {/* Texto da narrativa */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="relative z-10 mt-6"
            >
              <p className="text-white text-lg leading-relaxed font-medium">
                {modalData.texto}
              </p>
            </motion.div>

            {/* Linha decorativa */}
            <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-[#F27405] to-transparent mt-6 mb-4"></div>

            {/* Botão de ação */}
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fecharModal}
              className="w-full bg-gradient-to-r from-[#6A00FF] to-[#F27405] text-white py-3 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
            >
              Continuar
              <ChevronRight className="w-5 h-5" />
            </motion.button> */}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}