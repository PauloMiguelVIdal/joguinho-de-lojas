import React from "react";
import {CentraldeDadosProvider } from "./centralDeDadosContext";
import Interface from "./interface";
import Notificação from "./notificação";


function App() {
  return (
    <CentraldeDadosProvider>
    <div className="h-[100vh] w-[100vw]">
      <Interface/>
    </div>
    </CentraldeDadosProvider>
  );
}

export default App;
