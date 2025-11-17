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
    console.log("oiiiii")
  };

  return (
    <div>
      <button
        onClick={activeModal}
        className="w-[40px] bg-white h-[40px] flex items-center justify-center rounded-xl"
      >
        <Info className="color-blue" />
      </button>
    </div>
  );
}
