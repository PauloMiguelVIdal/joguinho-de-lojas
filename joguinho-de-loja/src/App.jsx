import React from "react";
import {CentraldeDadosProvider } from "./centralDeDadosContext";
import Interface from "./interface";
import Notificação from "./notificação";


function App() {
  return (
    <CentraldeDadosProvider>
    <div>
      <Interface/>
    </div>
    </CentraldeDadosProvider>
  );
}

export default App;
