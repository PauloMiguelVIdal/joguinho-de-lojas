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

  if (!modalData.estadoModal) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 backdrop-blur-md select-none">
        
        {/* Personagem no canto inferior esquerdo */}
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute bottom-0 left-10 z-[130]"
        >
          {/* Brilho atrás do avatar */}
          <div className="absolute inset-0 bg-laranja/20 blur-[100px] rounded-full" />
          
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <img 
              className="w-[320px] h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
              src={chefe} 
              alt="Personagem" 
            />
          </motion.div>
        </motion.div>

        {/* Balão de narrativa */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative max-w-[650px] ml-[250px] z-[140]"
        >
          {/* Balão principal estilo Premium */}
          <div className="relative bg-gradient-to-br from-[#350973] to-[#1a053d] rounded-[32px] p-10 shadow-[0_30px_90px_rgba(0,0,0,0.7)] border border-laranja/30">
            
            {/* Efeito de Vidro/Brilho interno */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-laranja/50 to-transparent" />

            {/* Indicador de tipo (pensamento ou fala) */}
            <div className="absolute -top-4 left-10 px-6 py-1.5 bg-gradient-to-r from-laranja to-[#E56100] rounded-full text-white text-xs font-black uppercase tracking-widest shadow-lg">
              {modalData.tipo === "pensamento" ? "💭 Pensamento Interno" : "💬 Reflexão Direta"}
            </div>

            {/* Texto da narrativa */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative z-10"
            >
              <p className="text-white/90 text-xl leading-relaxed font-light italic italic">
                "{modalData.texto}"
              </p>
            </motion.div>

            {/* Divisor Visual */}
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-laranja/20 to-transparent my-6"></div>

            {/* Rodapé do Modal com Botão */}
            <div className="flex justify-between items-center">
               <span className="text-white/20 text-[10px] uppercase tracking-[0.2em]">Dia {dados.dia} / Relatório Pessoal</span>
               
               <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={fecharModal}
                className="bg-laranja/10 hover:bg-laranja/20 border border-laranja/40 text-laranja px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 transition-all"
              >
                Prosseguir
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Botão fechar (X) discreto */}
            <button
              onClick={fecharModal}
              className="absolute top-6 right-6 text-white/20 hover:text-laranja transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Triângulo do Balão (Ponteiro) */}
          <div 
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#350973] rotate-45 border-l border-b border-laranja/30"
            style={{ zIndex: -1 }}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}