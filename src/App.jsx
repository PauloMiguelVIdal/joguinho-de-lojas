import React from "react";
import {CentraldeDadosProvider } from "./centralDeDadosContext";
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

    <div className="h-[100vh] w-[100vw]">
      <Interface/>
    </div>
      </DadosEconomyGlobalProvider>
    </CentraldeDadosProvider>
  );
}

export default App;
