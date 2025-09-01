import React from "react";
import { CentraldeDadosProvider } from "./centralDeDadosContext";
import Interface from "./interface";
import { DadosEconomyGlobalProvider } from "./dadosEconomyGlobal";
import { AgriculturaProvider } from "./components/AgriculturaContext";
import { ComercioProvider} from "./components/ComercioContext";
import { IndustriaProvider } from "./components/IndustriaContext";
import { ImobiliarioProvider } from "./components/ImobiliarioContext";
import { EnergiaProvider } from "./components/EnergiaContext";
import { TecnologiaProvider } from "./components/TecnologiaContext";
import {SetorProvider} from "./components/Redirector"
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
} from 'chart.js';
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
  return (
    <CentraldeDadosProvider>
      <DadosEconomyGlobalProvider>

        {/* Cada setor mantém seu estado separado */}
        <AgriculturaProvider>
          <ComercioProvider>
            <IndustriaProvider>
              <EnergiaProvider>
                <ImobiliarioProvider>
                  <TecnologiaProvider>

                    {/* O Redirector só conecta o setor ativo */}
                    <SetorProvider>
                      <div className="h-[100vh] w-[100vw]">
                        <Interface />
                      </div>
                    </SetorProvider>

                  </TecnologiaProvider>
                </ImobiliarioProvider>
              </EnergiaProvider>
            </IndustriaProvider>
          </ComercioProvider>
        </AgriculturaProvider>
      </DadosEconomyGlobalProvider>
    </CentraldeDadosProvider>
  );
}



export default App;
