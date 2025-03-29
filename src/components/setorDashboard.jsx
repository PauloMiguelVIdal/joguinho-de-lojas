import React from "react";
import { Line } from 'react-chartjs-2';

const SetorDashboard = ({ setor, dados, bgDashboard }) => {
  // Verifica se o setor tem licença comprada
  const setorDados = dados[setor.id];
  const licenciaComprada = setorDados?.licençaGlobal.comprado;

  return (
    <div className={`h-full flex-1 rounded-[30px] flex items-center justify-center transition-all duration-300 bg-[${bgDashboard}]`}>
      {licenciaComprada === false ? (
        <div className="text-white text-3xl">Licença para {setor.nome} não comprada</div>
      ) : (
        <>
          {setor.id === "grafico" && (
            <Line data={setor.dados} options={setor.config} className="w-full h-full" />
          )}
          {setor.id !== "grafico" && <h1 className="text-white text-3xl">Dashboard {setor.nome}</h1>}
        </>
      )}
    </div>
  );
};

export default function Dashboard({ dados, ativos, setores, bgDashboard }) {
  return (
    <div className="w-full h-full">
      {setores.map((setor) => (
        <SetorDashboard
          key={setor.id}
          setor={setor}
          dados={dados}
          bgDashboard={bgDashboard}
        />
      ))}
    </div>
  );
}