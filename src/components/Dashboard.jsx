import React, { useContext } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { Line } from 'react-chartjs-2';
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
        <div className="w-[100px] h-full rounded-[40px] p-[0px] bg-[#350973] flex flex-col items-center place-content-between">
          <div className="w-[80px] h-full rounded-[#6E0BF9] p-[0px] flex flex-col items-center place-content-around">
            <button className="w-[60px] h-[60px] rounded-[20px] bg-[#07871A]">1</button>
            <button className="w-[60px] h-[60px] rounded-[20px] bg-[#F27405]">1</button>
            <button className="w-[60px] h-[60px] rounded-[20px] bg-[#454141]">1</button>
            <button className="w-[60px] h-[60px] rounded-[20px] bg-[#FF0000]">1</button>
            <button className="w-[60px] h-[60px] rounded-[20px] bg-[#3B40F5]">1</button>
            <button className="w-[60px] h-[60px] rounded-[20px] bg-[#F52BEE]">1</button>
          </div>
          <div>
            <button className="w-[60px] h-[60px] rounded-[20px] bg-[#6A00FF]">1</button>
          </div>
        </div>
        <div className=" h-[400px] flex-1 rounded-[#6E0BF9] p-[0px] bg-[] flex">
          <Line data={data} options={{ ...config.options, maintainAspectRatio: false }} className="w-full h-full " />
        </div>
      </div>
    );
  } else {

    return (
      <div className="w-full h-full border-white border-[2px] rounded-[10px]">
        <div className="w-full h-[400px] rounded-[#6E0BF9] p-[0px] bg-[] flex">
          <Line data={data} options={{ ...config.options, maintainAspectRatio: false }} className="w-full h-full " />
        </div>
      </div>
    );
  }

}


