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
import { CardModal } from "./cardsModal";
import licença from "../imagens/licença.png"
import Carteira from "../../public/imagens/Carteira.png"
import { motion } from "framer-motion";
import fechar from "../imagens/fechar.png"
import { LicenseModal } from "./licenseModal";
import { Localizador } from "./localizador";
import { CarteiraLocalizador } from "./CarteiraLocalizador";

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
  const { dados, atualizarDadosProf2, atualizarDados } = useContext(CentraldeDadosContext);
  const [ativo, setAtivo] = useState("grafico");

  // const economiaSetor = dados[ativo].economiaSetor.estadoAtual
  // console.log(economiaSetor)


  const ativoConvertido = (ativo) => {
    switch (ativo) {
      case "agricultura": return "Agricultura";
      case "tecnologia": return "Tecnologia";
      case "industria": return "Industria";
      case "comercio": return "Comercio";
      case "imobiliario": return "Imobiliario";
      case "energia": return "Energia";
      case "carteira": return "Carteira";
    }
  }

  const formatarNumero = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(1).replace('.0', '') + 'T'; // Trilhões
    if (num >= 1e9) return (num / 1e9).toFixed(1).replace('.0', '') + 'B';   // Bilhões
    if (num >= 1e6) return (num / 1e6).toFixed(1).replace('.0', '') + 'M';   // Milhões
    if (num >= 1e3) return (num / 1e3).toFixed(1).replace('.0', '') + 'K';   // Milhares
    return num.toString();
  };


  // const setoresArray = ["Agricultura", "Tecnologia", "industria", "comercio", "imobiliario", "energia"]

  // const licencasAgriculturaArray = [

  //   {
  //     licencaDeComerciosAgricolas: {
  //       status: false,
  //       valor: 120000,
  //       edificiosLiberados: ["Cooperativas agricolas", "Centro de comercio de plantacoes"]
  //     }
  //   },
  //   {
  //     "Licença de comercios agricolas": {
  //       status: false,
  //       valor: 120000,
  //       edificiosLiberados: ["Cooperativas agricolas", "Centro de comercio de plantacoes"]
  //     }
  //   },

  //   {
  //     licencaDeArmazenamentoAgricolas: {
  //       status: false,
  //       valor: 120000,
  //       edificiosLiberados: ["", "", ""]
  //     }
  //   },

  //   {
  //     licencaDeFazendasDeAnimais: {
  //       status: false,
  //       valor: 120000
  //     }
  //   },

  //   {
  //     licençaDeAréasEspeciais: {
  //       status: false,
  //       valor: 120000
  //     }
  //   },

  //   {
  //     licençaDeOutrasPlantações: {
  //       status: false,
  //       valor: 120000
  //     }
  //   },





  // ]

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
    { id: "carteira", cor3: "#4C14A9 ", corClasse: "bg-[#934CFF]", img: Carteira, cor1: "#350973 ", cor2: "#4C14A9 ", cor3: "#6A00FF ", cor4: "#934CFF ", },
    { id: "grafico", cor3: "#FF6F00 ", corClasse: "bg-[#6A00FF]", img: grafico, cor1: "#6A00FF ", cor2: "#6A00FF ", cor3: "#6A00FF ", cor4: "#6A00FF ", },
  ];

  const corEconomia = (cor) => {
    switch (cor) {
      case "recessão": return "bg-[#FF0000]";
      case "declinio": return "bg-[#FF8000]";
      case "estável": return "bg-[#EEAD2D]";
      case "progressiva": return "bg-[#9ACD32]";
      case "aquecida": return "bg-[#006400]";
    }
  }

  const alterarEconomiaSetor = () => { atualizarDadosProf2([ativo, "economiaSetor", "estadoAtual"], "recessão") }





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
  const licençaComprada = setorDados.licençaGlobal.comprado;
  const licenciaValor = setorDados.licençaGlobal.valor;

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
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/90 ">
        <motion.div style={{ backgroundColor: setorAtivo.cor4 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-[80vw] h-[80vh] bg-[#F52623] p-[20px] gap-[20px] rounded-[10px] flex flex-col items-center relative "
        >
          <button
            className="bg-laranja absolute top-[-20px] right-[-20px] w-[40px] h-[40px] flex justify-center items-center rounded-[10px] hover:bg-[#E56100] active:scale-95"
            onClick={() => setLicencaModal(false)}
          >
            <img src={fechar} alt="Fechar" className="w-[60%]" />
          </button>
          <div style={{ backgroundColor: setorAtivo.cor1 }} className="flex shadow-xl justify-center items-center w-[100%] h-[15%]  rounded-[20px] self-center ">
            <h1 className="text-center text-white text-[40px] fonteBold">Licenças - {ativo}</h1>
          </div >
          <div className="overflow-y-visible overflow-x-hidden w-full scrollbar-custom ">
            {dados[ativo].licençasSetor.map((e, index) =>

              <LicenseModal
                key={index}
                setor={ativo}
                nomeLicença={e.nome}
                index={index} />
            )}
          </div>
        </motion.div>
      </div>
    );
  }


  return (

    <div className={`${corClasse} w-full h-full border-[#350973] rounded-[20px] flex`}>
      {/* Sidebar */}


      {dados.dia >= 250 && (
        
      <div className="w-[80px] ml-[10px] h-[calc(100%-20px)] bg-[#350973] rounded-[12px] p-[0px] flex self-center flex-col items-center justify-between">
        <div
          className={`
          w-[80px] h-[80%] pt-[20px] flex flex-col items-center justify-between shadow-md transition-opacity duration-500
          ${dados.dia > 250 ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        >
          {setores.map((setor) => (
            <button
              key={setor.id}
              onClick={() => {
                setAtivo(setor.id)
              }}
              className={`
                w-[60px] h-[60px] rounded-[20px] flex items-center justify-center shadow-md
                hover:bg-[${setor.cor3}] active:scale-95 hover:scale-[1.05]
                ${ativo === setor.id ? "ring-1 ring-white scale-[1.1]" : ""} transition
              `}
              style={{ backgroundColor: setor.cor3 }}
            >
              <img src={setor.img} alt={setor.id} className="h-[60%] aspect-square" />
            </button>
          ))}
        </div>
      </div>
      )}


      {/* Dashboard */}
      <div
  className={`h-full rounded-[0px] items-center justify-center transition-all duration-300 bg-[${setorAtivo.cor2}] ${
    dados.dia >= 250 ? "w-[calc(100%-100px)]" : "w-[calc(100%)]"
  }`}
>
        {/* Renderiza o conteúdo baseado no estado da licença */}
        {licençaComprada ? (
          // Container com licença comprada
          <div className="w-full h-full p-4 flex flex-col">
            {ativo === "grafico" && (
              <Line data={data} options={{ ...config.options, maintainAspectRatio: false }} className="w-full h-full" />
            )}
            {ativo === "carteira" && (
              <div className="flex-1 w-full rounded-[20px] flex flex-col">

                {/* Barra superior */}
                <div className="h-16 w-full flex justify-start gap-[10px] items-center">
                  <div
                    style={{ backgroundColor: setorAtivo.cor3 }}
                    className="w-[30%] rounded-[20px] h-full fonteBold text-white flex items-center justify-center text-[30px]"
                  >
                    {ativoConvertido(ativo)}
                  </div>

                  {/* Ícones de Economia */}
                  <div className="flex gap-2 h-full">

                    <button
                      style={{ backgroundColor: setorAtivo.cor3 }}
                      onClick={() => setLicencaModal(true)}
                      className="h-full aspect-square rounded-[10px] flex items-center justify-center hover:scale-[1.10] duration-300 ease-in-out delay-[0.1s] cursor-pointer"
                    >
                      <img className="w-[70%]" src={licença} />
                    </button>
                  </div>
                </div>

                <div style={{ background: `linear-gradient(135deg, ${setorAtivo.cor1} 0%,${setorAtivo.cor4}  100%)` }} className="flex-1 overflow-y-auto mt-4  scrollbar-custom rounded-[10px]">
                  <div className="w-full gap-y-[20px] grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] h-[400px] pt-[20px] pl-[20px]">
                    <CarteiraLocalizador />
                  </div>
                </div>

              </div>
            )}
            {ativo !== "grafico" && ativo !== "carteira" && (
              <div s className="flex-1 w-full rounded-[20px] flex flex-col justify-between h-full">

                {/* Barra superior */}
                <div className="h-[50px] w-full flex justify-between gap-[10px] items-start">
                  <div
                    style={{ backgroundColor: setorAtivo.cor3 }}
                    className="w-[30%] rounded-[20px] h-full fonteBold text-white flex items-center justify-center text-[30px] sombra"
                  >
                    {ativoConvertido(ativo)}
                  </div>

                  {/* Ícones de Economia */}
                  <div className="flex gap-2 h-full">
                    <button
                      style={{ backgroundColor: setorAtivo.cor3 }}
                      onClick={() => setLicencaModal(true)}
                      className="h-full aspect-square rounded-[10px] flex items-center justify-center hover:scale-[1.10] duration-300 ease-in-out delay-[0.1s] cursor-pointer"
                    >
                      <img className="w-[70%]" src={licença} />
                    </button>
                    {/* <button className="bg-white" onClick={alterarEconomiaSetor}>teste</button> */}
                    <div className={`h-full aspect-square rounded-[10px] border-[2px] flex items-center justify-center ${corEconomia(dados[ativo].economiaSetor.estadoAtual)}`}>
                      <img className="w-[70%]" src={circularEconomia} />
                    </div>
                  </div>
                </div>
                {/* {Localizador("Centro De Comércio De Plantações")} */}
                {/* Container dos cards com scroll interno */}



                <div style={{ background: `linear-gradient(135deg, ${setorAtivo.cor1} 0%,${setorAtivo.cor4}  100%)` }} className="flex-1 overflow-y-auto mt-4 scrollbar-custom h-[calc(100%-50px)] rounded-[10px]">
                  <div className="w-full gap-y-[20px] grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] h-[400px] pt-[20px] pl-[20px]">
                    {dados[ativo].edificios.map((_, index) => (
                      <CardModal
                        key={index} index={index}
                      />
                    ))}
                  </div>
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
