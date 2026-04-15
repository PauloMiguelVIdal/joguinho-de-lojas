import React, { useEffect, useContext, useCallback } from "react";
import { useCentralStore, EDIFICIOS_BASE_DINAMICOS } from "../stores/useCentralStore";
import { EDIFICIOS_BASE_ESTATICOS } from "../stores/dadosEstáticos";

import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";

import ListaDeOfertas from "./ListCards";
import fechar from "../../public/outrasImagens/fechar.png";
import { motion } from "framer-motion";
import closeAudio from "../../public/sounds/closeAudio.mp3";
import useSound from "use-sound";

export default function Offers() {
  // ── Zustand ─────────────────────────────────────
  const atualizarDados = useCentralStore((s) => s.atualizarDados);
  const dia = useCentralStore((s) => s.dia);
  const modalOfertas = useCentralStore((s) => s.modalOfertas);

  // ── Context (mantido) ───────────────────────────
  const { economiaSetores } = useContext(DadosEconomyGlobalContext);

  const [buttonCloseAudio] = useSound(closeAudio);

  const todasLojas = ["terrenos", "lojasP", "lojasM", "lojasG"];

  // ───────────────── FECHAR ─────────────────
  const fecharModal = useCallback(() => {
    atualizarDados("modalOfertas", {
      ...modalOfertas,
      estadoModal: false,
    });
    buttonCloseAudio();
  }, [modalOfertas]);

  // ───────────────── GERAR OFERTAS ─────────────────
  const ofertasNovas = useCallback(() => {
    return todasLojas.map((edificioSelecionado) =>
      Array.from({ length: 4 }, () => {
        const quantidadeMax =
          EDIFICIOS_BASE_DINAMICOS[edificioSelecionado].quantidade;

        const quantidadeTerreno =
          EDIFICIOS_BASE_ESTATICOS[edificioSelecionado].quantidadeNecTerreno;

        const preçoTerrenoAtual =
          EDIFICIOS_BASE_DINAMICOS.terrenos.preçoConstrução;

        const construçãoAtual =
          EDIFICIOS_BASE_DINAMICOS[edificioSelecionado].preçoConstrução;

        const valorImóvelAtual =
          preçoTerrenoAtual * quantidadeTerreno + construçãoAtual;

        const economiaAtual = economiaSetores.economiaGlobal;

        const cenariosEconomicos = [
          [1, 5],
          [7, 12],
          [15, 25],
          [27, 32],
          [35, 40],
        ];

        const economiaSelecionada = (economia) => {
          switch (economia) {
            case "aquecida": return cenariosEconomicos[0];
            case "progressiva": return cenariosEconomicos[1];
            case "estável": return cenariosEconomicos[2];
            case "declinio": return cenariosEconomicos[3];
            case "recessão": return cenariosEconomicos[4];
            default: return [10, 20];
          }
        };

        const [depreMin, depreMax] = economiaSelecionada(economiaAtual);

        const sorteador = (min, max) =>
          Math.floor(Math.random() * (max - min + 1)) + min;

        const sorteadorDepre = (min, max) =>
          (Math.floor(Math.random() * (max - min + 1)) + min) / 100;

        const conversor = (loja) => {
          switch (loja) {
            case "terrenos": return "Terrenos";
            case "lojasP": return "Lojas Pequenas";
            case "lojasM": return "Lojas Médias";
            case "lojasG": return "Lojas Grandes";
            default: return "N/A";
          }
        };

        const depre = sorteadorDepre(depreMin, depreMax);
        const quantidade = sorteador(0, quantidadeMax);

        const valor =
          (valorImóvelAtual - valorImóvelAtual * depre) * quantidade;

        return {
          loja: conversor(edificioSelecionado),
          quantidade,
          depreciação: depre,
          valor,
          estado: true,
        };
      })
    );
  }, [economiaSetores.economiaGlobal]);

  // ───────────────── ATUALIZAR OFERTAS ─────────────────
  useEffect(() => {
    if (dia % 30 === 0) {
      const novas = ofertasNovas().flat();
      atualizarDados("ofertas", novas);
    }
  }, [dia, ofertasNovas]);

  // ───────────────── UI ─────────────────
  if (!modalOfertas.estadoModal) return null;

  return (
    <div className="flex justify-center items-center z-10 bg-black opacity-[98%] w-[100vw] h-[100vh] absolute">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-[80vw] h-[80vh] z-40 absolute bg-[#F52623] rounded-[10px]"
      >
        <button
          className="bg-laranja absolute top-[-20px] right-[-20px] w-[40px] h-[40px] flex justify-center items-center rounded-[10px] hover:bg-[#E56100] active:scale-95"
          onClick={fecharModal}
        >
          <img src={fechar} alt="" className="w-[60%]" />
        </button>

        <ListaDeOfertas />
      </motion.div>
    </div>
  );
}