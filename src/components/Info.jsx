import { Info } from "lucide-react";
import React from "react";
import { useContext } from "react";
import useSound from "use-sound";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import openAudio from "../../public/sounds/openAudio.mp3"

export function InfoPage() {
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);

  const [buttonOpenAudio] = useSound(openAudio);

  const activeModal = () => {
    atualizarDados("modalAjuda", {
      ...dados.modalAjuda,
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
