import React, { useContext } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { Line } from 'react-chartjs-2';
import agricultura from "./setores/agricultura.png"
import tecnologia from "./setores/tecnologia.png"
import comercio from "./setores/comercio.png"
import industria from "./setores/industria.png"
import imobiliario from "./setores/Imobiliário.png"
import energia from "./setores/torre-eletrica.png"
import grafico from "./setores/grafico.png"
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


export default function Dashboard() {
  const { dados, AtualizarDados } = useContext(CentraldeDadosContext)

  const todasLojas = [
    "terrenos",
    "lojasP"
    , "lojasM",
    "lojasG"
  ];

  const conversorTodasLojas = (selecionarLoja) => {
    switch (selecionarLoja) {
      case "terrenos": return "Terrenos";
      case "lojasP": return "Lojas Pequenas";
      case "lojasM": return "Lojas Médias";
      case "lojasG": return "Lojas Grandes";
      default: return "nada";
    }
  };

  const pegarDado = dados.dia;
  console.log(pegarDado);

  const dadosDia = dados.terrenos.arrayFatu.map((_, index) => index + 1);

  const cores = {
    terrenos:
      '#FF7F32 ',
    // '#005F73',
    lojasP:
      // '#F27405',
      '#6411D9',
    lojasM:
      '#F27405',
    // lojasM: '#6411D9',
    lojasG:
      '#3A0E8C ',
    // '#FFD700',
  };

  const datasets = todasLojas.map((edificioSelecionado) => ({









    label: conversorTodasLojas(edificioSelecionado), // Nome do edifício
    data: dados[edificioSelecionado]?.arrayFatu || [], // Pega os valores ou um array vazio para evitar erros
    borderColor: cores[edificioSelecionado]?.replace("0.5", "1") || "#000000", // Cor da linha
    backgroundColor: cores[edificioSelecionado] || "#000000", // Cor de fundo
    tension: 0.4,
    fill: true, // Preenchimento abaixo da linha
    pointRadius: 0, // Remove os pontos pequenos
    pointHoverRadius: 5, // Ajusta ao passar o mouse
    pointBorderWidth: 1, // Espessura da borda dos pontos
  }));

  //  const datasets = Object.entries(dados).map(([chave, valores]) => ({
  //    label: chave,
  //    data: valores,
  //    borderColor: cores[chave].replace("0.5", "1"), // Linha mais visível
  //    backgroundColor: cores[chave], // Preenchimento com opacidade
  //    tension: 0.4,
  //    fill: true, // Preenche a área abaixo da linha
  //    pointRadius: 0, // Diminui o tamanho dos pontos
  //    pointHoverRadius: 5, // Ajusta o tamanho ao passar o mouse
  //    pointBorderWidth: 1, // Espessura da borda dos pontos

  //  }));

  const data = {
    labels: dadosDia,
    datasets: datasets,
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          font: {
            size: 20,
            weight: 'bold',
            family: 'Inter',
          },
        },
        legend: {
          labels: {
            color: 'white', // Cor do texto da legenda
            font: {
              size: 14,

            },
          },
        },
      },
      scales: {
        x: {
          display: true,
          stacked: true,
          grid: {
            display: true, // Remove as linhas da grade no eixo X
          },
          beginAtZero: false,
          ticks: {
            color: 'white', // Cor do texto no eixo X
          },
        },
        y: {
          display: true,
          stacked: true,
          grid: {
            display: true, // Remove as linhas da grade no eixo X
          },
          beginAtZero: true,
          ticks: {
            color: 'white', // Cor do texto no eixo Y
          },
        },
      },
      elements: {
        line: {
          fill: true, // Garante que a área seja preenchida
        },
      },
    },
  };
  if (dados.dia >= 20) {
    return (
<div className="w-full h-full border-white border-[2px] rounded-[40px] flex">
  <div className="w-[80px] ml-[10px] h-[calc(100%-20px)] rounded-[30px] p-[0px] bg-[#350973] flex self-center flex-col items-center justify-between">
    <div className="w-[80px] h-[80%] rounded-[#6E0BF9] pt-[20px] flex flex-col items-center justify-between">
      <button className="w-[60px] h-[60px] rounded-[20px] bg-[#07871A] flex items-center justify-center hover:bg-[#0C9123] hover:rounded-[20px] active:scale-95 hover:scale-[1.05]"><img src={agricultura} alt="" className="h-[60%] aspect-square" /></button>
      <button className="w-[60px] h-[60px] rounded-[20px] bg-[#F27405] flex items-center justify-center hover:bg-[#FF870F] hover:rounded-[20px] active:scale-95 hover:scale-[1.05]"><img src={tecnologia} alt="" className="h-[60%] aspect-square" /></button>
      <button className="w-[60px] h-[60px] rounded-[20px] bg-[#454141] flex items-center justify-center hover:bg-[#554F4F] hover:rounded-[20px] active:scale-95 hover:scale-[1.05]"><img src={industria} alt="" className="h-[60%] aspect-square" /></button>
      <button className="w-[60px] h-[60px] rounded-[20px] bg-[#FF0000] flex items-center justify-center hover:bg-[#FF1E1E] hover:rounded-[20px] active:scale-95 hover:scale-[1.05]"><img src={comercio} alt="" className="h-[60%] aspect-square" /></button>
      <button className="w-[60px] h-[60px] rounded-[20px] bg-[#3B40F5] flex items-center justify-center hover:bg-[#4B53FF] hover:rounded-[20px] active:scale-95 hover:scale-[1.05]"><img src={imobiliario} alt="" className="h-[60%] aspect-square" /></button>
      <button className="w-[60px] h-[60px] rounded-[20px] bg-[#F52BEE] flex items-center justify-center hover:bg-[#FF41FA] hover:rounded-[20px] active:scale-95 hover:scale-[1.05]"><img src={energia} alt="" className="h-[60%] aspect-square" /></button>
      <button className="w-[60px] h-[60px] rounded-[20px] bg-[#6A00FF] flex items-center justify-center hover:bg-[#7814FF] hover:rounded-[20px] active:scale-95 hover:scale-[1.05]"><img src={grafico} alt="" className="h-[60%] aspect-square" /></button>
    </div>
    <div className="h-[20%]">
    </div>
  </div>
  <div className="h-full flex-1 rounded-[#6E0BF9] p-[0px] bg-[] flex">
    <Line data={data} options={{ ...config.options, maintainAspectRatio: false }} className="w-full h-full " />
  </div>
</div>

    );
  } else {

    return (
      <div className="w-full h-full border-white border-[2px] rounded-[10px]">
        <div className="w-full h-full rounded-[#6E0BF9] p-[0px] bg-[] flex">
          <Line data={data} options={{ ...config.options, maintainAspectRatio: false }} className="w-full h-full " />
        </div>
      </div>
    );
  }

}


