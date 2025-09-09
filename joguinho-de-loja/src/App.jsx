import React from "react";
import {CentraldeDadosProvider } from "./centralDeDadosContext";
import Interface from "./interface";
<<<<<<< HEAD
import Notificação from "./notificação";

=======
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
>>>>>>> 4eecf25e3e3b0d0eca1f16931d01c2d9df1ce00a

function App() {
  return (
    <CentraldeDadosProvider>
<<<<<<< HEAD
    <div>
      <Interface/>
    </div>
=======
      <DadosEconomyGlobalProvider>

    <div className="h-[100vh] w-[100vw]">
      <Interface/>
    </div>
      </DadosEconomyGlobalProvider>
>>>>>>> 4eecf25e3e3b0d0eca1f16931d01c2d9df1ce00a
    </CentraldeDadosProvider>
  );
}

export default App;
