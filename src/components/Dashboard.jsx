import React, { useContext, useEffect, useState } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { Line } from 'react-chartjs-2';
import agricultura from "./setores/agricultura.png"
import tecnologia from "./setores/tecnologia.png"
import comercio from "./setores/comercio.png"
import industria from "./setores/industria.png"
import imobiliario from "./setores/Imobiliário.png"
import energia from "./setores/torre-eletrica.png"
import grafico from "./setores/grafico.png"
import circularEconomia from "../imagens/circular-economy.png"
import DolarImg from "../imagens/simbolo-do-dolar.png"
import CardModal from "./cardsModal";
import licença from "../imagens/licença.png"
import Carteira from "../../public/imagens/Carteira.png"
import { motion } from "framer-motion";
import fechar from "../imagens/fechar.png"


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
  const { dados, AtualizarDados } = useContext(CentraldeDadosContext);
  const [ativo, setAtivo] = useState("grafico");


  const ativoConvertido = (ativo) => {
    switch (ativo) {
      case "agricultura": return "Agricultura";
      case "tecnologia": return "Tecnologia";
      case "industria": return "Industria";
      case "comercio": return "Comercio";
      case "imobiliario": return "Imobiliario";
      case "energia": return "Energia";
    }
  }

  const formatarNumero = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(1).replace('.0', '') + 'T'; // Trilhões
    if (num >= 1e9) return (num / 1e9).toFixed(1).replace('.0', '') + 'B';   // Bilhões
    if (num >= 1e6) return (num / 1e6).toFixed(1).replace('.0', '') + 'M';   // Milhões
    if (num >= 1e3) return (num / 1e3).toFixed(1).replace('.0', '') + 'K';   // Milhares
    return num.toString();
  };


  const setoresArray = ["Agricultura", "Tecnologia", "industria", "comercio", "imobiliario", "energia"]

  const licencasAgriculturaArray = [

    {
      licencaDeComerciosAgricolas: {
        status: false,
        valor: 120000,
        edificiosLiberados: ["Cooperativas agricolas", "Centro de comercio de plantacoes"]
      }
    },
    {
      "Licença de comercios agricolas": {
        status: false,
        valor: 120000,
        edificiosLiberados: ["Cooperativas agricolas", "Centro de comercio de plantacoes"]
      }
    },

    {
      licencaDeArmazenamentoAgricolas: {
        status: false,
        valor: 120000,
        edificiosLiberados: ["", "", ""]
      }
    },

    {
      licencaDeFazendasDeAnimais: {
        status: false,
        valor: 120000
      }
    },

    {
      licençaDeAréasEspeciais: {
        status: false,
        valor: 120000
      }
    },

    {
      licençaDeOutrasPlantações: {
        status: false,
        valor: 120000
      }
    },





  ]

  // function teste(){


  //   const setorSelecionado = setoresArray[0]
  //   console.log(setorSelecionado)
  //   const adapteLicenca = `licencas${setorSelecionado}Array`
  //   console.log(adapteLicenca)
  //   const licencaSelecionada = adapteLicenca[0]
  //   console.log(licencaSelecionada)
  //   const edificiosLiberados = licencaSelecionada.edificiosLiberados[0]
  //   console.log(edificiosLiberados)

  // }

  // teste()


  const setores = [
    { id: "agricultura", cor3: "#0C9123", corClasse: "bg-[#4CAF50]", img: agricultura, descLicença: "Com a Licença Global de Agricultura, você terá acesso a cultivos exclusivos, otimização de produções e melhorias que aumentarão sua rentabilidade. Liberte o potencial do setor agrícola agora mesmo!", cor1: "#003816", cor2: "#1A5E2A", cor3: "#0C9123", cor4: "#4CAF50", },
    { id: "tecnologia", cor3: "#FF6F00 ", corClasse: "bg-[#FF8C42]", img: tecnologia, descLicença: "Com a Licença Global de Tecnologia, você desbloqueia inovações que podem transformar sua infraestrutura, otimizar processos e maximizar os lucros. Invista no futuro agora!", cor1: "#A64B00 ", cor2: "#D45A00 ", cor3: "#FF6F00 ", cor4: "#FF8C42 ", },
    { id: "industria", cor3: "#808080  ", corClasse: "bg-[#B3B3B3]", img: industria, descLicença: "Com a Licença Global de Indústria, você acessa fábricas avançadas e processos de produção que aceleram sua evolução e aumentam a eficiência. Não fique para trás!", cor1: "#1A1A1A ", cor2: "#4D4D4D  ", cor3: "#808080  ", cor4: "#B3B3B3  ", },
    { id: "comercio", cor3: "#E60000  ", corClasse: "bg-[#FF4D4D]", img: comercio, descLicença: "Com a Licença Global de Comércio, você tem acesso a novos mercados, estratégias de vendas e expansão que podem levar seus negócios a um novo nível. Não perca essa oportunidade!", cor1: "#660000  ", cor2: "#A31919  ", cor3: "#E60000  ", cor4: "#FF4D4D  ", },
    { id: "imobiliario", cor3: "#3333CC  ", corClasse: "bg-[#6666FF]", img: imobiliario, descLicença: "Com a Licença Global Imobiliária, você pode investir em novos terrenos, expandir suas construções e maximizar os retornos do mercado imobiliário. Abra as portas para grandes lucros!", cor1: "#000066  ", cor2: "#1A1A8C  ", cor3: "#3333CC  ", cor4: "#6666FF  " },
    { id: "energia", cor3: "#E6B800", corClasse: "bg-[#FFD966]", img: energia, descLicença: "Com a Licença Global de Energia, você ativa fontes de energia sustentáveis e de alta performance, garantindo uma operação eficiente e lucrativa. Potencialize seu setor energético agora!", cor1: "#665200   ", cor2: "#A37F19   ", cor3: "#E6B800", cor4: "#FFD966" },
    { id: "carteira", cor3: "#FF6F00 ", corClasse: "bg-[#6A00FF]", img: Carteira, cor1: "#6A00FF ", cor2: "#6A00FF ", cor3: "#6A00FF ", cor4: "#6A00FF ", },
    { id: "grafico", cor3: "#FF6F00 ", corClasse: "bg-[#6A00FF]", img: grafico, cor1: "#6A00FF ", cor2: "#6A00FF ", cor3: "#6A00FF ", cor4: "#6A00FF ", },
  ];

  const corEconomia = (cor) => {
    switch (cor) {
      case "recessão": return "bg-[#FFFFFF]";
      case "declinio": return "bg-[#FF8000]";
      case "estável": return "bg-[#EEAD2D]";
      case "progressiva": return "bg-[#9ACD32]";
      case "aquecida": return "bg-[#006400]";
    }
  }






  // Pegando o setor ativo
  const setorAtivo = setores.find((setor) => setor.id === ativo);
  const setorInfo = setores.find(setor => setor.id === setorAtivo);


  if (ativo) {
    const atualizarSetor = (novoSetor) =>
      dados.setorAtivo = novoSetor
    atualizarSetor(ativo)
  }




  // Definindo as cores dinâmicas
  const corClasse = setorAtivo ? setorAtivo.corClasse : "bg-[#350973]";

  // Pegando os dados do setor ativo
  const setorDados = dados[ativo]; // Dados do setor ativo
  const licencaComprada = setorDados.licencaGlobal.comprado;
  const licenciaValor = setorDados.licencaGlobal.valor;

  // Dados do gráfico
  const dadosDia = dados.terrenos.arrayFatu.map((_, index) => index + 1);

  const cores = {
    terrenos: '#FF7F32 ',
    lojasP: '#6411D9',
    lojasM: '#F27405',
    lojasG: '#3A0E8C ',
  };

  const licençasNecessárias = ["Silo", "Plantação De Legumes"]
  const arrayLicenseNece = licençasNecessárias

  const datasets = ["terrenos", "lojasP", "lojasM", "lojasG"].map((edificioSelecionado) => ({
    label: edificioSelecionado,
    data: dados[edificioSelecionado]?.arrayFatu || [],
    borderColor: cores[edificioSelecionado]?.replace("0.5", "1") || "#000000",
    backgroundColor: cores[edificioSelecionado] || "#000000",
    tension: 0.4,
    fill: true,
    pointRadius: 0,
    pointHoverRadius: 5,
    pointBorderWidth: 1,
  }));

  const data = {
    labels: dadosDia,
    datasets: datasets,
  };

  const getImageUrl = (nomeArquivo) => `../../public/imagens/${nomeArquivo}.png`;


  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          font: { size: 20, weight: 'bold', family: 'Inter' },
        },
        legend: {
          labels: { color: 'white', font: { size: 14 } },
        },
      },
      scales: {
        x: {
          display: true,
          stacked: true,
          grid: { display: true },
          beginAtZero: false,
          ticks: { color: 'white' },
        },
        y: {
          display: true,
          stacked: true,
          grid: { display: true },
          beginAtZero: true,
          ticks: { color: 'white' },
        },
      },
      elements: {
        line: { fill: true },
      },
    },
  };

  const [licencaModal, setLicencaModal] = useState(false)
  if (licencaModal === true) {
    return (
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/90">
        <motion.div style={{ backgroundColor: setorAtivo.cor4 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-[80vw] h-[80vh] bg-[#F52623] p-[20px] gap-[20px] rounded-[10px] flex flex-col items-center relative"
        >
          <button
            className="bg-laranja absolute top-[-20px] right-[-20px] w-[40px] h-[40px] flex justify-center items-center rounded-[10px] hover:bg-[#E56100] active:scale-95"
            onClick={() => setLicencaModal(false)}
          >
            <img src={fechar} alt="Fechar" className="w-[60%]" />
          </button>
          <div style={{ backgroundColor: setorAtivo.cor1 }} className="flex shadow-xl justify-center items-center w-[100%] h-[15%] rounded-[20px] self-center">
            <h1 className="text-center text-white text-[40px] fonteBold">Licenças - Agricultura</h1>
          </div>
          <div style={{ backgroundColor: setorAtivo.cor3 }} className="w-[100%] h-[300px] rounded-[20px] self-center justify-between shadow-xl">
            <div style={{ backgroundColor: setorAtivo.cor2 }} className="w-full flex items-center h-[15%] rounded-t-[20px] self-center p-[5px]">
              <div
                style={{ backgroundColor: setorAtivo.cor1 }}
                className=" h-[100%] flex items-center justify-center aspect-square rounded-[20px]"
              >
                <div style={{ backgroundColor: setorAtivo.cor3 }} className="flex items-center justify-center h-[95%] aspect-square rounded-[20px]">

                  <div style={{ backgroundColor: setorAtivo.cor1 }} className="flex items-center justify-center h-[95%] aspect-square rounded-[20px]">

                    <div style={{ backgroundColor: setorAtivo.cor2 }} className="flex items-center justify-center h-[95%] aspect-square  rounded-[30px]">

                      <div style={{ background: `linear-gradient(135deg, ${setorAtivo.cor1} 0%,${setorAtivo.cor4}  100%)` }} className="flex items-center justify-center relative h-[95%] aspect-square rounded-[60px]">
                        <img
                          className="h-[70%] w-[] aspect-square"
                          src={licença}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-white text-[30px] ml-[20px] fonteBold">Licença de fazendas de animais</div>
            </div >
            <div className="w-full h-[85%] flex ">

              <div style={{ background: `linear-gradient(20deg,${setorAtivo.cor1} 0%, ${setorAtivo.cor3} 20%, ${setorAtivo.cor3} 40%, ${setorAtivo.cor4} 60%,${setorAtivo.cor2}  100%)` }} className="flex h-full w-[80%] justify-around rounded-bl-[20px] items-center ">
                <CardModal />
                <CardModal />
                <CardModal />
                <CardModal />
              </div>
              <div
                style={{
                  background: `linear-gradient(180deg, ${setorAtivo.cor2} 0%, ${setorAtivo.cor1} 100%)`
                }}
                className="h-full w-[20%] flex flex-col justify-around items-center rounded-br-[20px]">
                <div style={{ backgroundColor: setorAtivo.cor3 }} className="h-[65%] w-[90%] text-white p-[10px] rounded-[20px]">
                  A licença de animais permite a criação de gado, aves e suínos, auxiliando fazendas e indústrias alimentícias no jogo.                  </div>
                <div style={{ backgroundColor: setorAtivo.cor3 }} className="flex items-center justify-between p-[5px] rounded-[20px] h-[10%] w-[90%] drop-shadow-2xl">
                  <img src={DolarImg} className="h-[100%] " />
                  <h1 className="text-white fonteBold text-[15px] mr-[2px]">{formatarNumero(200000000)}</h1>
                </div>
                <div className="flex items-center justify-center w-[90%] h-[13%] drop-shadow-md">
                  <button style={{ "--cor4": setorAtivo.cor4, "--cor1": setorAtivo.cor1, }} className={`bg-gradient-to-br to-[#6411D9] from-[#6411D9]   rounded-[20px] w-full fonteBold text-white hover:scale-[1.10] hover:to-[--cor1] hover:via-[#6411D9]  hover:from-[--cor4]  duration-300 ease-in-out  cursor-pointer`}> Comprar</button>
                </div>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    );
  }


  return (
    <div className={`${corClasse} w-full h-full border-white border-[2px] rounded-[40px] flex`}>
      {/* Sidebar */}
      <div className="w-[80px] ml-[10px] h-[calc(100%-20px)] bg-[#350973] rounded-[30px] p-[0px] flex self-center flex-col items-center justify-between">
        <div className="w-[80px] h-[80%] pt-[20px] flex flex-col items-center justify-between">
          {setores.map((setor) => (
            <button
              key={setor.id}
              onClick={() => {
                setAtivo(setor.id)



              }}
              className={`
                w-[60px] h-[60px] rounded-[20px] flex items-center justify-center 
                hover:bg-[${setor.cor3}] active:scale-95 hover:scale-[1.05]
                ${ativo === setor.id ? "ring-1 ring-white scale-[1.1]" : ""} transition
              `}
              style={{ backgroundColor: setor.cor3 }}
            >
              <img src={setor.img} alt={setor.id} className="h-[60%] aspect-square" />
            </button>
          ))}
        </div>
        <div className="h-[20%]"></div>
      </div>

      {/* Dashboard */}
      <div className={`h-full rounded-[30px] flex items-center justify-center transition-all duration-300 bg-[${setorAtivo.cor2}] w-[calc(100%-100px)]`}>


        {/* Renderiza o conteúdo baseado no estado da licença */}
        {licencaComprada ? (
          // Container com licença comprada
          <div className="w-full h-full p-4">
            {ativo === "grafico" && (
              <Line data={data} options={{ ...config.options, maintainAspectRatio: false }} className="w-full h-full" />
            )}
            {ativo !== "grafico" && (
              <div className="h-full w-full rounded-[20px]">
                {/* Barra superior */}
                <div className="h-16 w-full flex justify-start gap-[10px] items-center">
                  {/* Bloco de Ativo */}
                  <div
                    style={{ backgroundColor: setorAtivo.cor3 }}
                    className="w-[30%] rounded-[20px] h-full fonteBold text-white flex items-center justify-center text-[30px]"
                  >
                    {ativoConvertido(ativo)}
                  </div>

                  {/* Ícones de Economia */}
                  <div className="flex gap-2 h-full">
                    <div className={`h-full aspect-square rounded-[10px] flex items-center justify-center ${corEconomia(dados[ativo].economiaGlobal.estadoAtual)}`}>
                      <img className="w-[70%]" src={circularEconomia} />
                    </div>
                    <button style={{ backgroundColor: setorAtivo.cor3 }} onClick={() => setLicencaModal(true)} className={`h-full aspect-square rounded-[10px] flex items-center justify-center  hover:scale-[1.10] duration-300 ease-in-out delay-[0.1s] cursor-pointer `}>
                      <img className="w-[70%]" src={licença} />
                    </button>
                  </div>
                </div>


                <div className="h-[calc(100%-4rem)] w-full flex gap-[20px]">
                  <CardModal />
                  <CardModal />
                  <CardModal />
                  <CardModal />
                </div>
              </div>
            )}
          </div>

        ) : (
          // Container sem licença comprada
          <div className="p-4 rounded-[30px] w-[90%] h-[90%] flex flex-col items-center justify-between" style={{ backgroundColor: setorAtivo.cor2 }}>
            <div className="w-[90%] text-center rounded-[10px]" style={{ backgroundColor: setorAtivo.cor3 }}>
              <h1 className="text-white text-3xl fonteBold">Licença Global de {ativo} </h1>
            </div>
            <p className="text-white p-[40px]">{setorAtivo.descLicença}</p>
            <div className="flex justify-center gap-[20px] w-full ">
              <div className="text-white flex items-center justify-around w-[20%] rounded-[10px]" style={{ backgroundColor: setorAtivo.cor1 }}>
                <img className="w-[20px]" src={DolarImg} />
                <h1 className="fonteBold">{licenciaValor}</h1>
              </div>
              <div className="w-[20%]">
                <button className="bg-[#350973] text-white fonteBold w-full rounded-[10px] h-[40px]">Comprar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
