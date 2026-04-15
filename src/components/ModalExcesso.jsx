import { motion } from "framer-motion";
import { useContext } from "react";
// import { CentraldeDadosContext } from "../centralDeDadosContext";
import { useGame } from "../components/GameContext";
import { productsCatalog, getMarketPrice } from "./TablePrice";
// import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { useCentralStore, EDIFICIOS_BASE_DINAMICOS, EDIFICIOS_FINAIS_DINAMICOS_INICIAL,LICENCAS_DINAMICAS_GLOBAIS } from "../stores/useCentralStore";
import {
  EDIFICIOS_FINAIS_ESTATICOS,
  LICENCAS_ESTATICAS,
  EDIFICIOS_BASE_ESTATICOS,
  LICENCAS_ESTATICAS_GLOBAIS,
} from "../stores/dadosEstáticos";


export default function ModalExcesso() {
  // const { dados, atualizarDados, setDados } = useContext(CentraldeDadosContext);
  // const { modalExcesso } = dados;
  const { resolveProductionOverflowBySelling, processProductions } = useGame();
  const modalExcesso = useCentralStore((s) => s.modalExcesso);

  if (!modalExcesso.estadoModal) return null;
  const dia = useCentralStore((s) => s.dia);
  const atualizarDados = useCentralStore((s) => s.atualizarDados);

const venderExcesso = () => {
  processProductions(); // 🔥 liquida produção
  resolveProductionOverflowBySelling(modalExcesso.overflows);

  atualizarDados("modalExcesso", {
    ...modalExcesso,
    estadoModal: false,
    confirmarAvanco: true,
  });
};


    const fecharModalExcesso = () => {

    atualizarDados("modalExcesso", { ...modalExcesso, estadoModal: false });

  };



  return (
    <div className="flex justify-center items-center z-50 bg-black/95 w-screen h-screen fixed select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="w-[45vw] min-h-[40vh] bg-[#350973] p-4 rounded-[20px] relative">
          <h1 className="text-center text-white text-[30px] fonteBold">
            {modalExcesso.head}
          </h1>

          <div className="w-[80%] h-[10px] bg-gradient-to-l from-laranja to-roxo rounded-[5px] m-auto my-3" />

          <h2 className="text-white opacity-[70%] text-[22px] fonteLight px-4">
            {modalExcesso.content}
          </h2>

          <div className="text-white px-4 mt-4 space-y-1">
            <p>
              Excesso de produção:{" "}
              <span className="fonteBold">
                {modalExcesso.quantidadeExcesso}
              </span>
            </p>
            <p>
              Oferta:{" "}
              <span className="fonteBold text-laranja">
                ${modalExcesso.ofertaExcesso}
              </span>
            </p>
          </div>
          <button
            className="absolute left-4 bottom-4 text-white bg-laranja px-4 py-2 rounded-[40px] fonteBold"
            onClick={fecharModalExcesso}
          >
            Entendido
          </button>

          <button
            className="absolute right-4 bottom-4 bg-laranja text-white px-6 py-2 rounded-[40px] fonteBold hover:scale-105 active:scale-95"
            onClick={venderExcesso}
          >
            Vender excesso
          </button>
        </div>
      </motion.div>
    </div>
  );
}
