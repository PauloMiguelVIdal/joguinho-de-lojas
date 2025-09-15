import React, { useRef } from "react";
import { CentraldeDadosProvider } from "./centralDeDadosContext";
import Interface from "./interface";
import { DadosEconomyGlobalProvider } from "./dadosEconomyGlobal";
import Notificação from "./notificação";

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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      document.exitFullscreen();
    }
  };

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
            className="absolute top-2 right-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 z-50"
          >
            {document.fullscreenElement ? "Sair da Tela Cheia" : "Tela Cheia"}
          </button>

          {/* Seu jogo */}
          <Interface />
        </div>
      </DadosEconomyGlobalProvider>
    </CentraldeDadosProvider>
  );
}

export default App;
