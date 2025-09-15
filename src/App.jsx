import React, { useRef, useState, useEffect } from "react";
import { CentraldeDadosProvider } from "./centralDeDadosContext";
import Interface from "./interface";
import { DadosEconomyGlobalProvider } from "./dadosEconomyGlobal";
import Notificação from "./notificação";
import telaCheia from "./imagens/tela cheia.png";
import reduzirTela from "./imagens/reduzir tela.png";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function App() {
  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  // Detecta mudanças no fullscreen e atualiza o estado
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <CentraldeDadosProvider>
      <DadosEconomyGlobalProvider>
        <div
          ref={containerRef}
          className="h-[100vh] w-[100vw] relative bg-gray-900"
        >
          {/* Botão de Tela Cheia */}
          <button
            onClick={toggleFullscreen}
            className="absolute top-2 right-5 z-50"
          >
            <img
              className="w-[30px] h-[30px]"
              src={isFullscreen ? reduzirTela : telaCheia}
              alt={isFullscreen ? "Sair da Tela Cheia" : "Tela Cheia"}
            />
          </button>

          {/* Seu jogo */}
          <Interface />
        </div>
      </DadosEconomyGlobalProvider>
    </CentraldeDadosProvider>
  );
}

export default App;
