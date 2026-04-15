import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import chefe from "../../public/outrasImagens/chefe.png";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { useCentralStore, EDIFICIOS_BASE_DINAMICOS, EDIFICIOS_FINAIS_DINAMICOS_INICIAL,LICENCAS_DINAMICAS_GLOBAIS } from "../stores/useCentralStore";
import {
  EDIFICIOS_FINAIS_ESTATICOS,
  LICENCAS_ESTATICAS,
  EDIFICIOS_BASE_ESTATICOS,
  LICENCAS_ESTATICAS_GLOBAIS,
} from "../stores/dadosEstáticos";


export default function ModalPerson() {
  // ── Zustand ──
  // const dados = useCentralStore((s) => s);
  const atualizarDados = useCentralStore((s) => s.atualizarDados);
  const dia = useCentralStore((s) => s.dia);
   const modalPerson = useCentralStore((s) => s.modalPerson);
   const eventoAtual = useCentralStore((s) => s.eventoAtual);

  // ── Context (mantido) ──
  const { economiaSetores } = useContext(DadosEconomyGlobalContext);

  // 🎭 Narrativas
  const narrativas = {
    1: {
      texto: "Depois de muito tempo economizando...",
      tipo: "pensamento"
    },
    2: {
      texto: "Pronto! Meu primeiro imóvel...",
      tipo: "fala"
    },
    4: {
      texto: "Pronto! Meu primeiro imóvel...",
      tipo: "fala"
    },
    26: {
      texto: "Tenho que ficar atento pois a cada trinta dias eu tenho que pagar as despesas",
      tipo: "pensamento"
    },
    30: {
      texto: "Primeiro mês encerrado...",
      tipo: "pensamento"
    },
    45: {
      texto: "Tenho que me planejar da melhor maneira possível...",
      tipo: "pensamento"
    },
    86: {
      texto: "Logo menos terá alterações na economia global...",
      tipo: "fala"
    },
    90: {
      texto: "tenho que ficar atento como a economia global está se comportando...",
      tipo: "pensamento"
    },
    117: {
      texto: "Interessante… quanto mais invisto...",
      tipo: "pensamento"
    },
    210: {
      texto: "Tenho feito bons negócios...",
      tipo: "pensamento"
    },
    270: {
      texto: "270 dias se passaram...",
      tipo: "fala"
    },
    primeiroTerreno: {
      texto: "Seria uma ótima hora para eu comprar um terreno novo!",
      tipo: "fala"
    },
    segundaLojaP: {
      texto: "Seria uma ótima hora para eu comprar mais um imóvel pequeno!",
      tipo: "fala"
    },
    primeiroEvento: {
      texto: "Tenho que ficar atento aos eventos...",
      tipo: "fala"
    },
  };

  // ─── NARRATIVAS POR DIA ───
  useEffect(() => {
    if (narrativas.hasOwnProperty(dia)) {
      const narrativaAtual = narrativas[dia];

      atualizarDados("modalPerson", {
        estadoModal: true,
        texto: narrativaAtual.texto,
        tipo: narrativaAtual.tipo
      });
    }
  }, [dia]);

  // ─── CONDIÇÕES DINÂMICAS ───
  useEffect(() => {
    const terrenos = EDIFICIOS_BASE_DINAMICOS.terrenos;
    const lojasP = EDIFICIOS_BASE_DINAMICOS.lojasP;

    if (
      economiaSetores.saldo >= terrenos.preçoConstrução &&
      dia < 54 &&
      lojasP.quantidade > 0
    ) {
      const narrativaAtual = narrativas["primeiroTerreno"];
      atualizarDados("modalPerson", {
        estadoModal: true,
        texto: narrativaAtual.texto,
        tipo: narrativaAtual.tipo
      });
    }

    if (
      economiaSetores.saldo >= lojasP.preçoConstrução &&
      dia < 150 &&
      dia > 120 &&
      lojasP.quantidade === 1 &&
      terrenos.quantidade === 1
    ) {
      const narrativaAtual = narrativas["segundaLojaP"];
      atualizarDados("modalPerson", {
        estadoModal: true,
        texto: narrativaAtual.texto,
        tipo: narrativaAtual.tipo
      });
    }

    if (
      dia === eventoAtual.diaInicial &&
      dia < 10
    ) {
      const narrativaAtual = narrativas["primeiroEvento"];
      atualizarDados("modalPerson", {
        estadoModal: true,
        texto: narrativaAtual.texto,
        tipo: narrativaAtual.tipo
      });
    }
  }, [dia]);

  // ─── MODAL DATA ───
  const modalData = modalPerson || {
    estadoModal: false,
    texto: "",
    tipo: "pensamento"
  };

  const fecharModal = () => {
    atualizarDados("modalPerson", {
      ...modalData,
      estadoModal: false
    });
  };

  if (!modalData.estadoModal) return null;

  // ─── UI ───
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 backdrop-blur-md select-none">
        
        {/* Personagem */}
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="absolute bottom-0 left-10 z-[130]"
        >
          <div className="absolute inset-0 bg-laranja/20 blur-[100px] rounded-full" />
          
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <img 
              className="w-[320px]" 
              src={chefe} 
              alt="Personagem" 
            />
          </motion.div>
        </motion.div>

        {/* Balão */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-[650px] ml-[250px] z-[140]"
        >
          <div className="relative bg-gradient-to-br from-[#350973] to-[#1a053d] rounded-[32px] p-10 border border-laranja/30">
            
            <div className="absolute -top-4 left-10 px-6 py-1.5 bg-laranja rounded-full text-white text-xs font-black">
              {modalData.tipo === "pensamento" ? "💭 Pensamento" : "💬 Fala"}
            </div>

            <p className="text-white text-xl italic">
              "{modalData.texto}"
            </p>

            <div className="flex justify-between mt-6">
              <span className="text-white/30 text-xs">
                Dia {dia}
              </span>

              <button
                onClick={fecharModal}
                className="bg-laranja px-4 py-2 rounded-full text-white flex items-center gap-2"
              >
                Prosseguir <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={fecharModal}
              className="absolute top-4 right-4 text-white/30"
            >
              <X />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}