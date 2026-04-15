import { Info } from "lucide-react";
import React from "react";
import { useContext } from "react";
import useSound from "use-sound";
// import { CentraldeDadosContext } from "../centralDeDadosContext";
import openAudio from "../../public/sounds/openAudio.mp3"
import { useCentralStore, EDIFICIOS_BASE_DINAMICOS, EDIFICIOS_FINAIS_DINAMICOS_INICIAL,LICENCAS_DINAMICAS_GLOBAIS } from "../stores/useCentralStore";
import {
  EDIFICIOS_FINAIS_ESTATICOS,
  LICENCAS_ESTATICAS,
  EDIFICIOS_BASE_ESTATICOS,
  LICENCAS_ESTATICAS_GLOBAIS,
} from "../stores/dadosEstáticos";


export function InfoPage() {
  // const { dados, atualizarDados } = useContext(CentraldeDadosContext);

  const [buttonOpenAudio] = useSound(openAudio);
const modalAjuda = useCentralStore((s) => s.modalAjuda);


  const activeModal = () => {
    atualizarDados("modalAjuda", {
      ...modalAjuda,
      estadoModal: true,
    });
    buttonOpenAudio()
   
  };

  return (
    <div>
      <button
        onClick={activeModal}
        className="bg-white h-[50px] aspect-square rounded-[10px] flex items-center justify-center cursor-pointer"
      >
        <Info className="color-blue" />
      </button>
    </div>
  );
}
