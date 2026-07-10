import React, { useRef, useState, useEffect } from "react";
import { CentraldeDadosProvider } from "./centralDeDadosContext";
import Interface from "./interface";
import { DadosEconomyGlobalProvider } from "./dadosEconomyGlobal";
import Notificação from "./notificação";
import telaCheia from "../public/outrasImagens//tela cheia.png";
import reduzirTela from "../public/outrasImagens/reduzir tela.png";

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
import { GraphicsConfigProvider } from './components/GraphicsConfigContext'
import QualityToggle from './components/QualityToggle'
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

  const [isMobile, setIsMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerHeight < 600;
      const landscape = window.innerWidth > window.innerHeight && mobile;
      setIsMobile(mobile);
      setIsLandscape(landscape);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', () => setTimeout(checkDevice, 300));
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  const isDesktop = !isMobile;

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
    <GraphicsConfigProvider>
      <CentraldeDadosProvider>
        <DadosEconomyGlobalProvider>


          <div
            ref={containerRef}
            className="h-[100vh] w-[100vw] relative bg-[#350973]"
          >
            {isDesktop &&
              (<div className="z-[10000]" style={{
                position: 'absolute',
                bottom: '5px',
                right: '5px',

              }}>
                <QualityToggle />
              </div>)
            }
            {/* Botão de Tela Cheia */}
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 z-[10000]"
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
    </GraphicsConfigProvider>

  );
}

export default App