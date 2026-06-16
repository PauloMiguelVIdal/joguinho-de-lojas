import React, { useContext,useCallback, useMemo, useEffect, useRef, useState } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { Line } from "react-chartjs-2";
import agricultura from "../../public/outrasImagens/setores/agricultura.png";
import tecnologia from "../../public/outrasImagens/setores/tecnologia.png";
import comercio from "../../public/outrasImagens/setores/comercio.png";
import industria from "../../public/outrasImagens/setores/industria.png";
import imobiliario from "../../public/outrasImagens/setores/imobiliário.png";
import energia from "../../public/outrasImagens/setores/torre-eletrica.png";
import grafico from "../../public/outrasImagens/setores/grafico.png";
import gerenciamento from "../../public/outrasImagens/setores/gerenciamento.png";
import circularEconomia from "../../public/outrasImagens/circular-economy.png";
import DolarImg from "../../public/outrasImagens/simbolo-do-dolar.png";
import { CardModal } from "./cardsModal";
import licença from "../../public/outrasImagens/licença.png";
import Carteira from "../../public/imagens/Carteira.png";
import { motion, useAnimation } from "framer-motion";
import fechar from "../../public/outrasImagens/fechar.png";
import { LicenseModal } from "./licenseModal";
import { Localizador } from "./localizador";
import { CarteiraLocalizador } from "./CarteiraLocalizador";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import patrimônio from "../../public/imagens/patrimônio.png";
import impostoAnual from "../../public/imagens/impostoAnual.png";
import { BusinessLicence } from "./BusinessLicence";
import limitar from "../../public/outrasImagens/limite.png";
import soma from "../../public/outrasImagens/Soma.png";
import setoresImg from "../../public/outrasImagens/setores.png";
import diversidade from "../../public/outrasImagens/diversidade.png";
import { SellModal } from "./SellModal";
import Map from "../Map";
import { Tooltip } from "react-tooltip";
import solo from "../../public/outrasImagens/solo.png";
import buildBusiness from "../../public/outrasImagens/business.png";
//imagens cena escritório
// import imgChefePé from "../../public/outrasImagens/chefe em pé.png";
// import imgchefeIcon from "../../public/outrasImagens/chefe.png";
import imgFuncionarioIcon from "../../public/outrasImagens/funcionário 1.png";
// import imgFuncionarioPé from "../../public/outrasImagens/funcionário 1 em pé.png";
import imgMesa from "../../public/outrasImagens/mesa de trabalho.png";
import imgCadeira from "../../public/outrasImagens/cadeira.png";
// import { Office } from "./Office";
import maps from "../../public/outrasImagens/maps.png";
import computador from "../../public/outrasImagens/computer-screen.png";
import CreditCard from "./CreditCard";
import bank from "../../public/outrasImagens/bank.png";
import BankDetailsInterface from "./BankModel";
import BankInterface from "./BankInterface.jsx";
import MicroModel from "./MicroModel.jsx";
import CorporateFinanceInterface from "./FinançasDashboard.jsx";
import useSound from "use-sound";
import changeSectoryAudio from "../../public/sounds/changeSectoryAudio.mp3";
import closeAudio from "../../public/sounds/closeAudio.mp3";
import openAudio from "../../public/sounds/openAudio.mp3";
import walletOpenAudio from "../../public/sounds/walletOpenAudio.mp3";
import { PackOpening } from "./PackOpening.jsx";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Legend,
  LineController,
} from "chart.js";
import MapWorld from "./MapWorld.jsx";
import { CardLocalization } from "./cardLocalization.jsx";
import TechTree from "./Techtree.jsx";
import ecossistema from '../../public/outrasImagens/setores/ecossistema.png'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  LineController,

  Filler,
  Legend
);

export default function Dashboard() {


  const { dados, atualizarDadosProf2, atualizarDados } = useContext(
    CentraldeDadosContext
  );
  const { economiaSetores, setEconomiaSetores } = useContext(
    DadosEconomyGlobalContext
  );
  const [ativo, setAtivo] = useState("grafico");

  // const [graficoView, setGraficoView] = useState('ecossistema'); // 'grafico' | 'techtree' | 'producao' | 'ecossistema'

  // No topo do Dashboard, APÓS os outros useState:
  const snapshotDados = JSON.stringify(
    ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"].map(s =>
      (dados[s]?.edificios || []).map(ed => ({ nome: ed.nome, q: ed.quantidade }))
    )
  );

  // Adicione este useEffect logo abaixo:
  const [carteiraKey, setCarteiraKey] = useState(0);



  useEffect(() => {
    console.log("[Dashboard] snapshot mudou, ativo:", ativo, "carteiraKey antes:", carteiraKey);
    if (ativo === "carteira") {
      setCarteiraKey(prev => prev + 1);
    }
  }, [snapshotDados]);


  // { id: "ecossistema", img: ecossistemaImg, cor3: "#4C14A9", cor4: "#6411D9" }

  // {ativo === "ecossistema" && (
  //   <div className="w-full h-full">
  //     <EcosystemMap />
  //   </div>
  // )}


  const [modalSell, setModalSell] = useState(false);
  // const economiaSetor = dados[ativo].economiaSetor.estadoAtual
  // console.log(economiaSetor)
  const patrimonioTotal = economiaSetores.patrimonio
  const vision = dados.vision.visionAtual;
  const [changeAudio] = useSound(changeSectoryAudio);
  const [buttonCloseAudio] = useSound(closeAudio);
  const [buttonOpenAudio] = useSound(openAudio);
  const [buttonWalletOpenAudio] = useSound(walletOpenAudio);
  // Adicione este estado no início do componente Dashboard (junto com os outros useState):
  const [carteiraOrdem, setCarteiraOrdem] = useState("setor");
  const [carteiraFiltroSetor, setCarteiraFiltroSetor] = useState("todos");
  const setVision = (newVision) => {
    atualizarDados("vision", {
      ...dados.vision,
      visionAtual: newVision,
    });
  };
  const abrirMapa = () => setVision("mapa");
  // const abrirDashboard = () => setVision("dashboard")
  const abrirBanco = () => setVision("bank");

  const [modalSellOpen, setModalSellOpen] = useState(false);
  const [modalProps, setModalProps] = useState({
    setor: "",
    nomeLicença: "",
    index: 0,
  });

  useEffect(() => {
    if (dados.dia >= 270) {
      if (ativo === "carteira") return
      // if(ativo!=="carteira"){
      //   setAtivo("carteira")
      // }
    }

  }, [dados.dia])


  const abrirModalSell = (setor, index) => {
    setModalProps({ setor, index });
    setModalSellOpen(true);
  };

  const controls = useAnimation();

  const gradientes = [
    "linear-gradient(to top, #ff9966, #ff5e62, #2c3e50)", // pôr do sol
    "linear-gradient(to top, #141e30, #243b55, #0f2027)", // noite
    "linear-gradient(to top, #0f2027, #203a43, #2c5364)", // madrugada
    "linear-gradient(to top, #2c5364, #203a43, #fbb034)", // nascer do sol
    "linear-gradient(to top, #fbb034, #ffdd00, #ffeeee)", // meio-dia
  ];

  const animarCicloDia = async () => {
    await controls.start({
      background: gradientes,
      transition: {
        duration: 1,
        ease: "linear",
      },
    });
  };

  // disponibiliza no contexto para o botão usar
  useEffect(() => {
    atualizarDados("animarCicloDia", animarCicloDia);
  }, [dados.dia]);

  const tooltipStyle = {
    backgroundColor: "#FFFFFF",
    color: "#350973",
    border: "1px solid #350973",
    borderRadius: "6px",
    padding: "6px 10px",
    fontWeight: "600",
    fontSize: "14px",
  };

  const ativoConvertido = (ativo) => {
    switch (ativo) {
      case "agricultura":
        return "Agricultura";
      case "tecnologia":
        return "Tecnologia";
      case "industria":
        return "Industria";
      case "comercio":
        return "Comercio";
      case "imobiliario":
        return "imobiliario";
      case "energia":
        return "Energia";
      case "carteira":
        return "Carteira";
      case "gerenciamento":
        return "Gerenciamento";
      case "mapa":
        return "Mapa";
    }
  };

  const formatarNumero = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(1).replace(".0", "") + "T"; // Trilhões
    if (num >= 1e9) return (num / 1e9).toFixed(1).replace(".0", "") + "B"; // Bilhões
    if (num >= 1e6) return (num / 1e6).toFixed(1).replace(".0", "") + "M"; // Milhões
    if (num >= 1e3) return (num / 1e3).toFixed(1).replace(".0", "") + "K"; // Milhares
    return num.toString();
  };

  function Tooltip({ text, children }) {
    const [show, setShow] = useState(false);
    const ref = useRef();

    const tooltip =
      show &&
      ref.current &&
      createPortal(
        <div
          style={{
            position: "absolute",
            top: ref.current.getBoundingClientRect().top - 40, // sobe o tooltip
            left:
              ref.current.getBoundingClientRect().left +
              ref.current.offsetWidth / 2,
            transform: "translateX(-50%)",
            backgroundColor: "#FFFFFF",
            color: "#350973",
            padding: "6px 10px",
            borderRadius: "6px",
            ontWeight: "600",
            whiteSpace: "pre-line", // respeita \n como quebra de linha
            zIndex: 2147483647,
            pointerEvents: "none",
            maxWidth: "400px",
          }}
        >
          {text}
        </div>,
        document.body
      );

    return (
      <>
        <div
          ref={ref}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          className="relative flex items-center justify-center"
        >
          {children}
        </div>
        {tooltip}
      </>
    );
  }

  const setores = [
    {
      id: "agricultura",
      corClasse: "bg-[#4CAF50]",
      img: agricultura,
      descLicença:
        "Com a Licença Global de Agricultura, você terá acesso a cultivos exclusivos, otimização de produções e melhorias que aumentarão sua rentabilidade. Liberte o potencial do setor agrícola agora mesmo!",
      cor1: "#003816",
      cor2: "#4CAF50",
      cor3: "#0C9123",
      cor4: "#4CAF50",
    },
    {
      id: "tecnologia",
      corClasse: "bg-[#FF8C42]",
      img: tecnologia,
      descLicença:
        "Com a Licença Global de Tecnologia, você desbloqueia inovações que podem transformar sua infraestrutura, otimizar processos e maximizar os lucros. Invista no futuro agora!",
      cor1: "#A64B00 ",
      cor2: "#D45A00 ",
      cor3: "#FF6F00 ",
      cor4: "#FF8C42 ",
    },
    {
      id: "industria",
      corClasse: "bg-[#B3B3B3]",
      img: industria,
      descLicença:
        "Com a Licença Global de Indústria, você acessa fábricas avançadas e processos de produção que aceleram sua evolução e aumentam a eficiência. Não fique para trás!",
      cor1: "#1A1A1A ",
      cor2: "#4D4D4D  ",
      cor3: "#808080  ",
      cor4: "#B3B3B3  ",
    },
    {
      id: "comercio",
      corClasse: "bg-[#FF4D4D]",
      img: comercio,
      descLicença:
        "Com a Licença Global de Comércio, você tem acesso a novos mercados, estratégias de vendas e expansão que podem levar seus negócios a um novo nível. Não perca essa oportunidade!",
      cor1: "#660000  ",
      cor2: "#A31919  ",
      cor3: "#E60000  ",
      cor4: "#FF4D4D  ",
    },
    {
      id: "imobiliario",
      corClasse: "bg-[#6666FF]",
      img: imobiliario,
      descLicença:
        "Com a Licença Global Imobiliária, você pode investir em novos terrenos, expandir suas construções e maximizar os retornos do mercado imobiliário. Abra as portas para grandes lucros!",
      cor1: "#000066  ",
      cor2: "#1A1A8C  ",
      cor3: "#3333CC  ",
      cor4: "#6666FF  ",
    },
    {
      id: "energia",
      corClasse: "bg-[#FFD966]",
      img: energia,
      descLicença:
        "Com a Licença Global de Energia, você ativa fontes de energia sustentáveis e de alta performance, garantindo uma operação eficiente e lucrativa. Potencialize seu setor energético agora!",
      cor1: "#665200   ",
      cor2: "#A37F19   ",
      cor3: "#E6B800",
      cor4: "#FFD966",
    },
    {
      id: "carteira",
      corClasse: "bg-[#934CFF]",
      img: Carteira,
      cor1: "#350973 ",
      cor2: "#4C14A9 ",
      cor3: "#6A00FF ",
      cor4: "#934CFF ",
    },
    // {
    //   id: "mercado",
    //   corClasse: "bg-[#6A00FF]",
    //   img: mercado,
    //   cor1: "#6A00FF ",
    //   cor2: "#6A00FF ",
    //   cor3: "#6A00FF ",
    //   cor4: "#6A00FF ",
    // },
    // {
    //   id: "gerenciamento",
    //   corClasse: "bg-[#934CFF]",
    //   img: gerenciamento,
    //   cor1: "#7c7879ff ",
    //   cor2: "#4C14A9 ",
    //   cor3: "#6A00FF ",
    //   cor4: "#934CFF ",
    // },
    {
      id: "grafico",
      corClasse: "bg-gradient-to-br from-[#6A00FF] to-[#E60000]",
      img: grafico,
      cor1: "#6A00FF ",
      cor2: "#6A00FF ",
      cor3: "#6A00FF ",
      cor4: "#6A00FF ",
    },
    // {
    //   id: "ecossistema",
    //   corClasse: "bg-[#6A00FF]",
    //   img: ecossistema,
    //   cor1: "#6A00FF ",
    //   cor2: "#6A00FF ",
    //   cor3: "#6A00FF ",
    //   cor4: "#6A00FF ",
    // },
    // { id: "mapa", corClasse: "bg-[#E60000]", img: maps, cor1: "#6A00FF ", cor2: "#6A00FF ", cor3:  "bg-gradient-to-br from-[#6A00FF] to-[#E60000]", cor4: "#6A00FF ", },
  ];

  const corEconomia = (cor) => {
    switch (cor) {
      case "recessão":
        return "bg-[#FF0000]";
      case "declinio":
        return "bg-[#FF8000]";
      case "estável":
        return "bg-[#EEAD2D]";
      case "progressiva":
        return "bg-[#9ACD32]";
      case "aquecida":
        return "bg-[#006400]";
    }
  };



  const coresEdificiosGradiente = {
    terrenos: {
      start: "#FF7F32",
      middle: "#FF9955",
      end: "#FFB377",
      glow: "rgba(255, 127, 50, 0.3)",
    },
    lojasP: {
      start: "#6411D9",
      middle: "#7B33E8",
      end: "#9355F7",
      glow: "rgba(100, 17, 217, 0.3)",
    },
    lojasM: {
      start: "#F27405",
      middle: "#FF8C1A",
      end: "#FFA64D",
      glow: "rgba(242, 116, 5, 0.3)",
    },
    lojasG: {
      start: "#3A0E8C",
      middle: "#5020B0",
      end: "#6833D4",
      glow: "rgba(58, 14, 140, 0.3)",
    },
  };



  const createGradientEdificios = (ctx, edificio) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    const cores = coresEdificiosGradiente[edificio];
    gradient.addColorStop(0, cores.start);
    gradient.addColorStop(0.5, cores.middle);
    gradient.addColorStop(1, cores.end);
    return gradient;
  };

  const chartRefEdificios = useRef(null);

  useEffect(() => {
    if (ativo === "grafico" && dados.dia <= 270 && chartRefEdificios.current) {
      const ctx = chartRefEdificios.current.getContext("2d");

      const datasetsEdificios = ["terrenos", "lojasP", "lojasM", "lojasG"].map(
        (edificioSelecionado) => {
          const gradient = createGradientEdificios(ctx, edificioSelecionado);
          const cores = coresEdificiosGradiente[edificioSelecionado];

          return {
            label: edificioSelecionado.toUpperCase(),
            data: dados[edificioSelecionado]?.arrayFatu || [],
            borderColor: cores.end,
            backgroundColor: gradient,
            tension: 0.4,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: cores.end,
            pointHoverBorderColor: "#FFFFFF",
            pointHoverBorderWidth: 3,
            borderWidth: 3,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 20,
            shadowColor: cores.glow,
          };
        }
      );

      const configEdificios = {
        type: "line",
        data: {
          labels: dadosDia,
          datasets: datasetsEdificios,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: "index",
            intersect: false,
          },
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                color: "#FFFFFF",
                font: {
                  size: 12,
                  weight: "bold",
                  family: "Inter, system-ui, sans-serif",
                },
                padding: 15,
                usePointStyle: true,
                pointStyle: "circle",
              },
            },
            tooltip: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(10px)",
              titleColor: "#FFFFFF",
              bodyColor: "#C79FFF",
              borderColor: "rgba(255, 255, 255, 0.2)",
              borderWidth: 1,
              padding: 12,
              displayColors: true,
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || "";
                  if (label) {
                    label += ": ";
                  }
                  label +=
                    "R$ " +
                    context.parsed.y.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    });
                  return label;
                },
              },
            },
          },
          scales: {
            x: {
              display: true,
              stacked: true,
              grid: {
                display: true,
                color: "rgba(255, 255, 255, 0.1)",
                lineWidth: 1,
              },
              ticks: {
                color: "#C79FFF",
                font: {
                  size: 11,
                  weight: "500",
                },
              },
              border: {
                display: false,
              },
            },
            y: {
              display: true,
              stacked: true,
              position: "right",
              grid: {
                display: true,
                color: "rgba(255, 255, 255, 0.1)",
                lineWidth: 1,
              },
              ticks: {
                color: "#C79FFF",
                font: {
                  size: 11,
                  weight: "500",
                },
                callback: function (value) {
                  return "R$ " + formatarNumero(value);
                },
              },
              border: {
                display: false,
              },
            },
          },
          elements: {
            line: {
              borderJoinStyle: "round",
            },
          },
        },
      };

      if (window.chartInstanceEdificios) {
        window.chartInstanceEdificios.destroy();
      }
      window.chartInstanceEdificios = new ChartJS(ctx, configEdificios);
    }

    return () => {
      if (window.chartInstanceEdificios) {
        window.chartInstanceEdificios.destroy();
      }
    };
  }, [
    ativo,
    dados.dia,
    dados.terrenos,
    dados.lojasP,
    dados.lojasM,
    dados.lojasG,
  ]);

  const alterarEconomiaSetor = () => {
    atualizarDadosProf2([ativo, "economiaSetor", "estadoAtual"], "recessão");
  };

  // Pegando o setor ativo
  const setorAtivo = setores.find((setor) => setor.id === ativo);
  const setorInfo = setores.find((setor) => setor.id === setorAtivo);
  const setorCarteira = setores.find((setor) => setor.id === "carteira");
  const setorGerenciamento = setores.find(
    (setor) => setor.id === "gerenciamento"
  );



  // Definindo as cores dinâmicas
  const corClasse = setorAtivo ? setorAtivo.corClasse : "bg-[#358Q973]";

  // Pegando os dados do setor ativo
  const setorDados = dados[ativo]; // Dados do setor ativo
  const licençaComprada = setorDados.licençaGlobal.comprado;
  const licenciaValor = setorDados.licençaGlobal.valor;

  // Dados do gráfico
  const licençasNecessárias = ["Silo", "Plantação De Legumes"];
  const arrayLicenseNece = licençasNecessárias;

  const dadosDia = dados.terrenos.arrayFatu.map((_, index) => index + 1);
  const dadosFatu = dados.faturamento.arrayFatuDiário.map(
    (_, index) => index + 1
  );
  const dadosDiaSetores =
    economiaSetores.agricultura.economiaSetor.ArrayFatuHistory.map(
      (_, index) => index + 270
    );

  const chartRefSetores = useRef(null);

  useEffect(() => {
    if (ativo === "grafico" && dados.dia > 270 && chartRefSetores.current) {
      const ctx = chartRefSetores.current.getContext("2d");

      const datasetsSetores = [
        "agricultura",
        "tecnologia",
        "industria",
        "comercio",
        "imobiliario",
        "energia",
      ].map((setorSelecionado) => {
        const gradient = createGradient(ctx, setorSelecionado);
        const cores = coresSetoresGradiente[setorSelecionado];

        return {
          label: setorSelecionado.toUpperCase(),
          data:
            economiaSetores[setorSelecionado]?.economiaSetor
              ?.ArrayFatuHistory || [],
          borderColor: cores.end,
          backgroundColor: gradient,
          tension: 0.4,
          fill: true, // ✅ Mantém true para empilhar
          pointRadius: 0,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: cores.end,
          pointHoverBorderColor: "#FFFFFF",
          pointHoverBorderWidth: 3,
          borderWidth: 3,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 20,
          shadowColor: cores.glow,
        };
      });

      // Configuração do gráfico futurista
      const configSetores = {
        type: "line",
        data: {
          labels: dadosDiaSetores,
          datasets: datasetsSetores,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: "index",
            intersect: false,
          },
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                color: "#FFFFFF",
                font: {
                  size: 12,
                  weight: "bold",
                  family: "Inter, system-ui, sans-serif",
                },
                padding: 15,
                usePointStyle: true,
                pointStyle: "circle",
              },
            },
            tooltip: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(10px)",
              titleColor: "#FFFFFF",
              bodyColor: "#C79FFF",
              borderColor: "rgba(255, 255, 255, 0.2)",
              borderWidth: 1,
              padding: 12,
              displayColors: true,
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || "";
                  if (label) {
                    label += ": ";
                  }
                  label +=
                    "R$ " +
                    context.parsed.y.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    });
                  return label;
                },
              },
            },
          },
          scales: {
            x: {
              display: true,
              stacked: true, // ✅ ATIVAR EMPILHAMENTO NO EIXO X
              grid: {
                display: true,
                color: "rgba(255, 255, 255, 0.1)",
                lineWidth: 1,
              },
              ticks: {
                color: "#C79FFF",
                font: {
                  size: 11,
                  weight: "500",
                },
              },
              border: {
                display: false,
              },
            },
            y: {
              display: true,
              stacked: true, // ✅ ATIVAR EMPILHAMENTO NO EIXO Y
              position: "right",
              grid: {
                display: true,
                color: "rgba(255, 255, 255, 0.1)",
                lineWidth: 1,
              },
              ticks: {
                color: "#C79FFF",
                font: {
                  size: 11,
                  weight: "500",
                },
                callback: function (value) {
                  return "R$ " + formatarNumero(value);
                },
              },
              border: {
                display: false,
              },
            },
          },
          elements: {
            line: {
              borderJoinStyle: "round",
            },
          },
        },
      };

      // Criar o gráfico
      if (window.chartInstanceSetores) {
        window.chartInstanceSetores.destroy();
      }
      window.chartInstanceSetores = new ChartJS(ctx, configSetores);
    }

    return () => {
      if (window.chartInstanceSetores) {
        window.chartInstanceSetores.destroy();
      }
    };
  }, [ativo, dados.dia, economiaSetores]);

  const cores = {
    terrenos: "#FF7F32 ",
    lojasP: "#6411D9",
    lojasM: "#F27405",
    lojasG: "#3A0E8C ",
  };

  const datasets = ["terrenos", "lojasP", "lojasM", "lojasG"].map(
    (edificioSelecionado) => ({
      label: edificioSelecionado,
      data: dados[edificioSelecionado]?.arrayFatu || [],
      borderColor: cores[edificioSelecionado]?.replace("0.5", "1") || "#000000",
      backgroundColor: cores[edificioSelecionado] || "#000000",
      tension: 0.4,
      fill: true,
      pointRadius: 0,
      pointHoverRadius: 5,
      pointBorderWidth: 1,
    })
  );

  const coresSetoresGradiente = {
    agricultura: {
      start: "#4CAF50",
      middle: "#66BB6A",
      end: "#81C784",
      glow: "rgba(76, 175, 80, 0.3)",
    },
    tecnologia: {
      start: "#FF6F00",
      middle: "#FF8C42",
      end: "#FFA726",
      glow: "rgba(255, 140, 66, 0.3)",
    },
    industria: {
      start: "#1A1A1A",
      middle: "#4D4D4D",
      end: "#808080",
      glow: "rgba(77, 77, 77, 0.3)",
    },
    comercio: {
      start: "#A31919",
      middle: "#E60000",
      end: "#FF4D4D",
      glow: "rgba(255, 77, 77, 0.3)",
    },
    imobiliario: {
      start: "#1A1A8C",
      middle: "#3333CC",
      end: "#6666FF",
      glow: "rgba(102, 102, 255, 0.3)",
    },
    energia: {
      start: "#A37F19",
      middle: "#E6B800",
      end: "#FFD966",
      glow: "rgba(255, 217, 102, 0.3)",
    },
  };

  const createGradient = (ctx, setor) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    const cores = coresSetoresGradiente[setor];
    gradient.addColorStop(0, cores.start);
    gradient.addColorStop(0.5, cores.middle);
    gradient.addColorStop(1, cores.end);
    return gradient;
  };

  // const datasetsSetores = ["agricultura", "tecnologia", "industria", "comercio", "imobiliario", "energia"].map(
  //   (setorSelecionado) => ({
  //     label: setorSelecionado,
  //     data: economiaSetores[setorSelecionado]?.economiaSetor.ArrayFatuHistory || [],
  //     borderColor: coresSetores[setorSelecionado]?.replace("0.5", "1") || "#000000",
  //     backgroundColor: coresSetores[setorSelecionado] || "#000000",
  //     tension: 0.4,
  //     fill: true,
  //     pointRadius: 0,
  //     pointHoverRadius: 5,
  //     pointBorderWidth: 1,
  //   })
  // );

  // const dataSetores = {
  //   labels: dadosDiaSetores,
  //   datasets: datasetsSetores,
  // };

  const data = {
    labels: dadosDia,
    datasets: datasets,
  };

  const coresSetores = {
    agricultura: "#4CAF50 ",
    tecnologia: "#D45A00",
    industria: "#4D4D4D",
    comercio: "#A31919 ",
    imobiliario: "#1A1A8C ",
    energia: "#A37F19 ",
  };

  const datasetsFinal = ["terrenos", "lojasP", "lojasM", "lojasG"].map(
    (edificioSelecionado) => ({
      label: edificioSelecionado,
      data: dados[edificioSelecionado]?.arrayFatu || [],
      borderColor: cores[edificioSelecionado]?.replace("0.5", "1") || "#000000",
      backgroundColor: cores[edificioSelecionado] || "#000000",
      tension: 0.4,
      fill: true,
      pointRadius: 0,
      pointHoverRadius: 5,
      pointBorderWidth: 1,
    })
  );

  const dataFinal = {
    labels: dadosDia,
    datasets: datasetsFinal,
  };

  const coresDespesasFatu = {
    despesas: "#FF7F32 ",
    faturamento: "#6411D9",
  };

  const despesasArrays = economiaSetores.imposto.arrayImpostoDiário || [];
  const faturamentoArrays = dados.faturamento.arrayFatuDiário || [];

  const arraysFinanceiros = {
    despesas: despesasArrays,
    faturamento: faturamentoArrays,
  };

  const datasetsDespesasFatu = ["despesas", "faturamento"].map(
    (categoriaFinanceira) => ({
      label: categoriaFinanceira,
      data: arraysFinanceiros[categoriaFinanceira] || [],
      borderColor:
        coresDespesasFatu[categoriaFinanceira]?.replace("0.5", "1") ||
        "#000000",
      backgroundColor: coresDespesasFatu[categoriaFinanceira] || "#000000",
      tension: 0.4,
      fill: true,
      pointRadius: 0,
      pointHoverRadius: 5,
      pointBorderWidth: 1,
    })
  );

  const dataDespesasFatu = {
    labels: dadosFatu,
    datasets: datasetsDespesasFatu,
  };

  const getImageUrl = (nomeArquivo) => `/imagens/${nomeArquivo}.png`;

  const dadosCarteiraEdificios = economiaSetores.centralEdificios;

  const LiberarLicença = () => {
    if (economiaSetores.saldo >= licenciaValor) {
      if (licençaComprada) {
        return alert("Licença já comprada.");
      } else {
        const novoSaldo = economiaSetores.saldo - licenciaValor;
        atualizarDados("saldo", novoSaldo);
        atualizarDadosProf2([ativo, "licençaGlobal", "comprado"], true);
        // Liberar licenças específicas
        arrayLicenseNece.forEach((licenca) => {
          const licençaIndex = dados[ativo].licençasSetor.findIndex(
            (l) => l.nome === licenca
          );
          if (licençaIndex !== -1) {
            atualizarDadosProf2(
              [ativo, "licençasSetor", licençaIndex, "status"],
              true
            );
          }
        });
        // alert("Licença comprada com sucesso!");
      }
    } else {
      alert("Saldo insuficiente para comprar a licença.");
    }
  };

  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          font: { size: 20, weight: "bold", family: "Inter" },
        },
        legend: {
          labels: { color: "white", font: { size: 14 } },
        },
      },
      scales: {
        x: {
          display: true,
          stacked: true,
          grid: { display: true },
          beginAtZero: false,
          ticks: { color: "white" },
        },
        y: {
          display: true,
          stacked: true,
          grid: { display: true },
          beginAtZero: true,
          ticks: { color: "white" },
        },
      },
      elements: {
        line: { fill: true },
      },
    },
  };

  const configDespesasFatu = {
    type: "line",
    data: dataDespesasFatu,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          font: { size: 20, weight: "bold", family: "Inter" },
        },
        legend: {
          labels: { color: "white", font: { size: 14 } },
        },
      },
      scales: {
        x: {
          display: true,
          stacked: true,
          grid: { display: true },
          beginAtZero: false,
          ticks: { color: "white" },
        },
        y: {
          display: true,
          stacked: true,
          grid: { display: true },
          beginAtZero: true,
          ticks: { color: "white" },
        },
      },
      elements: {
        line: { fill: true },
      },
    },
  };

  const configSetores = {
    type: "line",
    data: dataDespesasFatu,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          font: { size: 20, weight: "bold", family: "Inter" },
        },
        legend: {
          labels: { color: "white", font: { size: 14 } },
        },
      },
      scales: {
        x: {
          display: true,
          stacked: true,
          grid: { display: true },
          beginAtZero: false,
          ticks: { color: "white" },
        },
        y: {
          display: true,
          stacked: true,
          grid: { display: true },
          beginAtZero: true,
          ticks: { color: "white" },
        },
      },
      elements: {
        line: { fill: true },
      },
    },
  };


  const [licencaModal, setLicencaModal] = useState({ open: false, scrollToIndex: null });
  const [businessLicenceModal, setBusinessLicenceModal] = useState(false);

  useEffect(() => {
    const sinal = dados.abrirModalLicencas;
    if (!sinal) return;
    if (sinal.setor !== ativo) {
      setAtivo(sinal.setor);
      atualizarDadosProf2(["setorAtivo"], sinal.setor);
    }
    setLicencaModal({ open: true, scrollToIndex: sinal.scrollToIndex });
  }, [dados.abrirModalLicencas?.timestamp]);

  useEffect(() => {
    if (!licencaModal.open) return;
    if (licencaModal.scrollToIndex === null || licencaModal.scrollToIndex === undefined) return;
    const timer = setTimeout(() => {
      const el = document.getElementById(`licenca-item-${licencaModal.scrollToIndex}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
    return () => clearTimeout(timer);
  }, [licencaModal.open, licencaModal.scrollToIndex]);





  if (licencaModal.open === true) {

    return (
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/90">
        <motion.div
          style={{ backgroundColor: setorAtivo.cor4 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-[80vw] h-[80vh] bg-[#F52623] p-[20px] gap-[20px] rounded-[10px] flex flex-col items-center relative"
        >
          <button
            className="bg-laranja absolute top-[-20px] right-[-20px] w-[40px] h-[40px] flex justify-center items-center rounded-[10px] hover:bg-[#E56100] active:scale-95"
            onClick={() => { setLicencaModal({ open: false, scrollToIndex: null }); buttonCloseAudio(); }}
          >
            <img src={fechar} alt="Fechar" className="w-[60%]" />
          </button>

          <div
            style={{ backgroundColor: setorAtivo.cor1 }}
            className="flex shadow-xl justify-center items-center w-[100%] h-[15%] rounded-[20px] self-center"
          >
            <h1 className="text-center text-white text-[40px] fonteBold">
              Licenças - {ativo}
            </h1>
          </div>

          {/* Container com scroll e ref para ancoragem */}
          <div className="overflow-y-auto overflow-x-hidden w-full scrollbar-custom flex-1">
            {dados[ativo].licençasSetor.map((e, index) => (
              <div
                key={index}
                id={`licenca-item-${index}`}
              >
                <LicenseModal
                  setor={ativo}
                  nomeLicença={e.nome}
                  index={index}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  {
    modalSell && (
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/90">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-[80vw] h-[80vh] bg-[#350973] rounded-[20px] relative flex flex-col items-center justify-around"
        >
          <h1 className="text-center text-white p-[10px] text-[50px] fonteBold">
            Fim
          </h1>

          <div className="w-[80%] h-[15px] bg-gradient-to-l from-laranja to-roxo rounded-[7px]"></div>

          <h2 className="text-center text-white opacity-80 text-[35px] fonteLight"></h2>

          <button
            className="absolute right-[20px] bottom-[20px] text-white bg-laranja px-[25px] py-[15px] rounded-[40px] fonteBold hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]"
            onClick={() => {
              setModalSell(false), buttonCloseAudio();
            }}
          >
            entendido
          </button>
        </motion.div>
      </div>
    );
  }

  if (businessLicenceModal === true) {
    return (
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/90 ">
        <motion.div
          style={{ backgroundColor: setorCarteira.cor4 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-[80vw] h-[80vh] bg-[#F52623] p-[20px] gap-[20px] rounded-[10px] flex flex-col items-center relative "
        >
          <button
            className="bg-laranja absolute top-[-20px] right-[-20px] w-[40px] h-[40px] flex justify-center items-center rounded-[10px] hover:bg-[#E56100] active:scale-95"
            onClick={() => {
              setBusinessLicenceModal(false), buttonCloseAudio();
            }}
          >
            <img src={fechar} alt="Fechar" className="w-[60%]" />
          </button>
          <div
            style={{ backgroundColor: setorCarteira.cor1 }}
            className="flex shadow-xl justify-center items-center w-[100%] h-[15%]  rounded-[20px] self-center "
          >
            <h1 className="text-center text-white text-[40px] fonteBold">
              Licenças empresariais
            </h1>
          </div>
          <div className="overflow-y-visible overflow-x-hidden w-full scrollbar-custom ">
            {economiaSetores.porteEmpresa.map((e, index) => (
              <BusinessLicence
                key={index}
                setor={ativo}
                nomeLicença={e.nome}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  if (vision === "dashboard") {
    return (
      <div
        className={`${corClasse} w-full h-full border-[#350973] rounded-[20px] flex justify-between`}
      >
        {/* Sidebar */}

        {dados.dia >= 270 && (
          <div className="w-[80px] ml-[10px] h-[calc(100%-20px)] bg-[#350973] rounded-[12px] p-[0px] flex self-center flex-col ">
            <div
              className={`
        w-[80px] h-full pb-[20px] pt-[20px] flex flex-col justify-between items-center shadow-md transition-opacity duration-500
        ${dados.dia >= 270 ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
            >
              <Tooltip style={tooltipStyle} id={`tooltip-faturado`} />

              {/* Parte de cima -> setores normais */}
              <div className="flex flex-col h-full gap-3">
                {setores
                  .filter(
                    (setor) =>
                      setor.id !== "carteira" &&
                      setor.id !== "gerenciamento" &&
                      setor.id !== "grafico" &&
                      setor.id !== "mercado"
                  )
                  .map((setor) => {
                    // Verificamos se é o setor de gráfico para aplicar o gradiente
                    const isEcossistema = setor.id === "ecossistema";

                    return (
                      <div key={setor.id}>
                        <button
                          onClick={() => {
                            setAtivo(setor.id);
                            changeAudio();
                            atualizarDadosProf2(["setorAtivo"], setor.id);
                          }}
                          data-tooltip-id={`tooltip-faturado`}
                          data-tooltip-html={setor.id}
                          className={`
              w-[60px] h-[60px] rounded-[20px] flex items-center justify-center shadow-md
              active:scale-95 hover:scale-[1.05] transition
          
              ${ativo === setor.id ? "ring-1 ring-white scale-[1.1]" : ""}
            `}
                          // O style só deve aplicar backgroundColor se NÃO for gráfico
                          style={
                            !isEcossistema
                              ? { backgroundColor: setor.cor3 }
                              : {
                                background: "linear-gradient(135deg, #4CAF50 0%, #D45A00 25%, #4D4D4D 45%, #A31919 55%, #1A1A8C 75%, #A37F19 100%)"
                              }
                          }                        >

                          <img
                            src={setor.img}
                            alt={setor.id}
                            className="h-[60%] aspect-square"
                          />
                        </button>
                      </div>
                    );
                  })}
              </div>

              {/* Parte de baixo -> carteira e gráfico */}
              {/* Parte de baixo -> carteira, gerenciamento e gráfico */}
              <div className="flex flex-col gap-3">
                {setores
                  .filter(
                    (setor) =>
                      setor.id === "carteira" ||
                      setor.id === "mercado" ||
                      setor.id === "grafico" ||
                      setor.id === "gerenciamento"
                  )
                  .map((setor) => {
                    const isGrafico = setor.id === "grafico";


                    return (
                      <div key={setor.id}>
                        <button
                          onClick={() => {
                            setAtivo(setor.id);
                            buttonWalletOpenAudio();
                            atualizarDadosProf2(["setorAtivo"], setor.id);
                          }}
                          data-tooltip-id={`tooltip-faturado`}
                          data-tooltip-html={setor.id}
                          className={`
              w-[60px] h-[60px] rounded-[20px] flex items-center justify-center shadow-md
              active:scale-95 hover:scale-[1.05] transition
              ${isGrafico
                              ? "bg-gradient-to-br from-[#6A00FF] to-[#FF0000]"
                              : ""
                            }
              ${ativo === setor.id ? "ring-2 ring-white scale-[1.1]" : "ring-0"}
            `}
                          // FORÇAMOS o style a ser undefined para o gráfico, 
                          // permitindo que o gradiente da classe CSS apareça.
                          style={isGrafico ? {} : { backgroundColor: setor.cor3 }}
                        >
                          <img
                            src={setor.img}
                            alt={setor.id}
                            className="h-[60%] aspect-square"
                          />
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        {/* Dashboard */}
        <div
          className={`h-full rounded-[0px] items-center justify-center transition-all rounded-[40px] duration-300 bg-[${setorAtivo.cor2
            }] ${dados.dia >= 270 ? "w-[calc(100%-100px)]" : "w-[calc(100%)]"}`}
        >
          {/* Renderiza o conteúdo baseado no estado da licença */}
          {licençaComprada ? (
            // Container com licença comprada
            <div className="w-full h-full p-4 flex flex-col" style={{ minHeight: 0, overflow: "hidden" }}>

              {ativo === "grafico" && dados.dia <= 270 && (
                <div className="w-full h-full p-6 flex items-center justify-center">
                  <div
                    className="w-full h-full rounded-2xl p-6 shadow-2xl relative overflow-hidden"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                    }}
                  >
                    {/* Brilho de fundo animado */}
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 50%, rgba(242, 116, 5, 0.2) 0%, transparent 70%)",
                        animation: "pulse 4s ease-in-out infinite",
                      }}
                    />

                    {/* Título */}
                    <h2 className="text-white text-2xl font-bold mb-4 relative z-10 flex items-center gap-3">
                      <div className="w-1 h-8 bg-gradient-to-b from-[#FF7F32] to-[#6411D9] rounded-full" />
                      FATURAMENTO POR TIPO DE EDIFICAÇÃO
                    </h2>

                    {/* Canvas do gráfico */}
                    <div className="relative z-10 h-[calc(100%-60px)]">
                      <canvas ref={chartRefEdificios}></canvas>
                    </div>
                  </div>
                </div>


              )}


              {ativo === "grafico" && (
                <div className="w-full h-full flex flex-col gap-3">
                  {/* <AssistenteIA /> */}

                                 
                  {/* <div style={{
                    display: 'flex', gap: 6, padding: '6px 8px',
                    background: 'rgba(0,0,0,.35)', borderRadius: 14,
                    border: '1px solid rgba(255,255,255,.08)',
                    flexShrink: 0,
                  }}>
                    {[
                      // { key: 'ecossistema', emoji: '🌿', label: 'Ecossistemas' },
                      { key: 'grafico', emoji: '📊', label: dados.dia <= 270 ? 'Faturamento Edificações' : 'Faturamento Setores' },
                      // { key: 'techtree', emoji: '🌐', label: 'Mapa de Sinergias' },
                      // { key: 'producao', emoji: '🔗', label: 'Cadeia Produtiva' },
                    ].map(({ key, emoji, label }) => {
                      const isAtivo = graficoView === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setGraficoView(key)}
                          style={{
                            border: 'none', borderRadius: 10,
                            padding: '7px 16px', cursor: 'pointer',
                            fontFamily: "'Rajdhani', sans-serif",
                            fontSize: 13, fontWeight: 700,
                            letterSpacing: '.04em',
                            transition: 'all .18s',
                            display: 'flex', alignItems: 'center', gap: 6,
                            background: isAtivo
                              ? 'linear-gradient(135deg, #4C14A9, #6411D9)'
                              : 'rgba(255,255,255,.06)',
                            color: isAtivo ? '#fff' : 'rgba(255,255,255,.38)',
                            boxShadow: isAtivo ? '0 2px 14px rgba(100,17,217,.45)' : 'none',
                          }}
                        >
                          <span style={{ fontSize: 15 }}>{emoji}</span>
                          {label}
                        </button>
                      );
                    })}
                  </div> */}

                  <div className="flex-1 w-full" style={{ minHeight: 0 }}>

          
                    {/* {graficoView === 'grafico' && dados.dia <= 270 && (
                      <div className="w-full h-full p-4 flex items-center justify-center">
                        <div
                          className="w-full h-full rounded-2xl p-6 shadow-2xl relative overflow-hidden"
                          style={{
                            background: "rgba(255, 255, 255, 0.05)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                          }}
                        >
                          <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 50% 50%, rgba(242, 116, 5, 0.2) 0%, transparent 70%)", animation: "pulse 4s ease-in-out infinite" }} />
                          <h2 className="text-white text-2xl font-bold mb-4 relative z-10 flex items-center gap-3">
                            <div className="w-1 h-8 bg-gradient-to-b from-[#FF7F32] to-[#6411D9] rounded-full" />
                            FATURAMENTO POR TIPO DE EDIFICAÇÃO
                          </h2>
                          <div className="relative z-10 h-[calc(100%-60px)]">
                            <canvas ref={chartRefEdificios}></canvas>
                          </div>
                        </div>
                      </div>
                    )} */}

                    {/* {graficoView === 'grafico' && dados.dia > 270 && ( */}
                      <div className="w-full h-full p-4 flex items-center justify-center">
                        <div
                          className="w-full h-full rounded-2xl p-6 shadow-2xl relative overflow-hidden"
                          style={{
                            background: "rgba(255, 255, 255, 0.05)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                          }}
                        >
                          <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 50% 50%, rgba(106, 0, 255, 0.2) 0%, transparent 70%)", animation: "pulse 4s ease-in-out infinite" }} />
                          <h2 className="text-white text-2xl font-bold mb-4 relative z-10 flex items-center gap-3">
                            <div className="w-1 h-8 bg-gradient-to-b from-[#6A00FF] to-[#FF00FF] rounded-full" />
                            FATURAMENTO POR SETOR
                          </h2>
                          <div className="relative z-10 h-[calc(100%-60px)]">
                            <canvas ref={chartRefSetores}></canvas>
                          </div>
                        </div>
                      </div>
                    {/* )} */}

                  
                    {/* {graficoView === 'techtree' && (
                      <div className="w-full h-full">
                        <Techtree />
                      </div>
                    )} */}

               
                    {/* {graficoView === 'producao' && (
                      <div className="w-full h-full">
                        <ProductionChainTree />
                      </div>
                    )} */}

            
                    {/* {graficoView === 'ecossistema' && (
                      <div className="w-full h-full">
                        <EcosystemMap />
                      </div>
                    )} */}

                  </div>
                </div>
                // <Map />

                // <Office />
                // <CreditCard />
                // <div className="w-full flex-1 p-4 flex flex-col">
                //   <div className="flex-1 w-full rounded-[20px] flex flex-col">
                //     <motion.div
                //       animate={controls}
                //       initial={{ background: "linear-gradient(to top, #ff9966, #ff5e62, #2c3e50)" }}
                //       className="gradiente w-full flex-1 rounded-[20px] flex justify-center items-center relative overflow-hidden"
                //     >
                //       {/* Terreno */}
                //       <img src={solo} alt="Terreno" className="w-[900px] h-[800px] top-[100px] relative z-[10]" />

                //       {/* Prédio */}
                //       <div className="absolute bottom-[-150px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10]">
                //         <img src={buildBusiness} alt="Prédio" className="w-[500px] h-auto" />
                //       </div>

                //       {/* Camada de luz sobre o prédio e terreno */}
                //       <motion.div
                //         animate={controls}
                //         initial={{ background: gradientes[0] }}
                //         className="absolute inset-0 z-[15] opacity-[30%] pointer-events-none mix-blend-soft-light"
                //       />

                //     </motion.div>
                //   </div>
                // </div>
              )}


              {ativo === "gerenciamento" && (
                <div className="w-full h-full flex flex-col justify-between">

                  {/* <MicroModel /> */}
                  {/* <ProductionQueueCard/>  */}
                  {/* <ProductionQueuePanel />
                   <HubManagement />
                  <SalesQueuePanel/>
                  <HubSell/> */}
                  {/* <ManagerPanelInterface /> */}
                  {/* <ButcherShopPanel /> */}
                  {/* <SalesQueueCard/> */}
                  {/* <ManagerSellPanel /> */}
                  {/* <GerenciamentoHub /> */}
                  {/* <ProductionChainTree/> */}
                  {/* <EcosystemMap /> */}
                </div>
              )}
              {ativo === "mercado" && (
                <div className="w-full h-full">
                  <MarketplaceSystem />
                  {/* <CadeiaProdutiva /> */}
                  {/* <StorageInterface /> */}
                </div>
              )}
              {/* {ativo === "ecossistema" && (
                <div className="w-full h-full">
                  <Techtree/>
                </div>
              )} */}
              {ativo === "carteira" && (() => {
                const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];
                const setoresCores = {
                  agricultura: { cor1: "#003816", cor3: "#0C9123", cor4: "#4CAF50" },
                  tecnologia: { cor1: "#A64B00", cor3: "#FF6F00", cor4: "#FF8C42" },
                  industria: { cor1: "#1A1A1A", cor3: "#808080", cor4: "#B3B3B3" },
                  comercio: { cor1: "#660000", cor3: "#E60000", cor4: "#FF4D4D" },
                  imobiliario: { cor1: "#000066", cor3: "#3333CC", cor4: "#6666FF" },
                  energia: { cor1: "#665200", cor3: "#E6B800", cor4: "#FFD966" },
                };
                const setoresNomes = { agricultura: "Agricultura", tecnologia: "Tecnologia", industria: "Indústria", comercio: "Comércio", imobiliario: "Imobiliário", energia: "Energia", todos: "Todos" };

                const productions = ["Plantação De Grãos", "Fazenda De Vacas", "Plantação De Eucalipto", "Granja De Aves", "Criação De Ovinos", "Serraria", "Fábrica De Smartphones", "Fábrica De Computadores", "Fábrica De Consoles De Jogos", "Fábrica De Dispositivos Vestíveis", "Fábrica De Rações", "Fábrica De Embalagens", "Fábrica De Fertilizantes", "Fábrica Têxtil", "Fábrica De Calçados", "Fábrica De Roupas", "Fábrica De Celulose", "Fábrica De Papel", "Fábrica De Livros", "Fábrica De Medicamentos", "Laboratório Farmacêutico", "Fábrica De Plásticos", "Fábrica De Químicos Especializados", "Alto-Forno", "Usina Siderúrgica", "Fundição De Alumínio", "Fábrica De Ligas Metálicas", "Indústria De Componentes Mecânicos", "Fábrica De Chapas Metálicas", "Fábrica De Estruturas Metálicas", "Fábrica De Peças Automotivas", "Montadora De Veículos Elétricos", "Fábrica De Automóveis", "Refinaria", "Biofábrica", "Fábrica De Chips", "Fábrica De Placas Eletrônicas", "Fábrica De Semicondutores", "Fábrica De Robôs", "Fábrica De Motores", "Fábrica De Foguetes", "Fábrica De Aeronaves", "Estaleiro", "Fábrica De Turbinas Eólicas", "Fábrica De Painéis Solares", "Fábrica De Baterias"];
                const sellFinal = ["Livraria", "Mercado", "Açougue", "Petshop", "Farmácia", "Loja De Calçados", "Loja De Vestuário", "Loja De Gadgets E Wearables", "Loja De Games", "Loja De Celulares", "Loja De Informática", "Loja De Eletrônicos", "Concessionária De Veículos"];
                const edificiosDeArmazenamento = ["Armazém", "Silo", "Depósito De Resíduos Orgânicos", "Data Center", "Servidor Em Nuvem", "Armazém Logístico", "Centro De Distribuição", "Fábrica De Tanque De Armazenamento Biocombustível", "Centro De Coleta De Biomassa", "Campo De Estocagem", "Armazém De Materiais Brutos", "Câmara Fria", "Container Modular", "Pátio De Veículos", "Armazém Industrial", "Armazém De Materiais Sensíveis", "Hangar", "Pátio De Mineração"];

                const getCategoria = (nome) => {
                  if (edificiosDeArmazenamento.includes(nome)) return "ecossistema";
                  if (productions.includes(nome)) return "producao";
                  if (sellFinal.includes(nome)) return "venda";
                  return "passiva";
                };
                const categoriaLabel = { producao: "Produção", venda: "Venda", ecossistema: "ecossistema", passiva: "Passiva" };
                const categoriaColor = { producao: "#6411D9", venda: "#F27405", ecossistema: "#1A8C5A", passiva: "#555" };

                const calcROI = (ed) => {
                  if (!ed || !dados) return 0;

                  try {
                    // ===== ECONOMIA =====
                    const fatorEconomico = {
                      recessão: 0.4,
                      declinio: 0.8,
                      estável: 1,
                      progressiva: 1.1,
                      aquecida: 1.25
                    }[economiaSetores] || 1;

                    // ===== POWER UP (SAFE) =====
                    const quantidadeAtual = ed.quantidade || 0;

                    const qtdMin2 = ed?.powerUp?.nível2?.quantidadeMínima ?? Infinity;
                    const qtdMin3 = ed?.powerUp?.nível3?.quantidadeMínima ?? Infinity;

                    const nivelPU =
                      quantidadeAtual >= qtdMin3 ? "powerUpNv3" :
                        quantidadeAtual >= qtdMin2 ? "powerUpNv2" :
                          "powerUpNv1";

                    let redCusto = 0;
                    let aumFatu = 0;

                    if (Array.isArray(ed?.RecebeMelhoraEficiencia)) {
                      ed.RecebeMelhoraEficiencia.forEach((rel) => {
                        let qtdOutro = 0;

                        for (const s of setoresArr) {
                          const lista = dados[s]?.edificios;
                          if (!Array.isArray(lista)) continue;

                          const found = lista.find(e => e.nome === rel.nome);
                          if (found) {
                            qtdOutro = found.quantidade || 0;
                            break;
                          }
                        }

                        if (qtdOutro > 0) {
                          redCusto +=
                            nivelPU === "powerUpNv1" ? rel?.redCusto?.nível1 || 0 :
                              nivelPU === "powerUpNv2" ? rel?.redCusto?.nível2 || 0 :
                                rel?.redCusto?.nível3 || 0;

                          aumFatu +=
                            nivelPU === "powerUpNv1" ? rel?.aumFatu?.nível1 || 0 :
                              nivelPU === "powerUpNv2" ? rel?.aumFatu?.nível2 || 0 :
                                rel?.aumFatu?.nível3 || 0;
                        }
                      });
                    }

                    // ===== FINANÇAS =====
                    const valorFatu = ed?.finanças?.faturamentoUnitário || 0;
                    const impostoFixo = ed?.finanças?.impostoFixo || 0;
                    const impostoFatu = ed?.finanças?.impostoSobreFatu || 0;

                    const valorFatuFinal = valorFatu * (1 + aumFatu / 100);
                    const impostoFixoFinal = impostoFixo * (1 - redCusto / 100);
                    const impostoFatuFinal = impostoFatu * (1 - redCusto / 100);

                    const fatuMensal = valorFatuFinal * 30 * fatorEconomico;
                    const impostoSobreFatuValor = fatuMensal * impostoFatuFinal;

                    const lucro = fatuMensal - impostoSobreFatuValor - impostoFixoFinal;

                    // ===== CUSTO BASE =====
                    const custoBase =
                      (ed?.lojasNecessarias?.terrenos || 0) * (dados?.terrenos?.preçoConstrução || 0) +
                      (ed?.lojasNecessarias?.lojasP || 0) * ((dados?.lojasP?.preçoConstrução || 0) + (dados?.lojasP?.quantidadeNecTerreno || 0) * (dados?.terrenos?.preçoConstrução || 0)) +
                      (ed?.lojasNecessarias?.lojasM || 0) * ((dados?.lojasM?.preçoConstrução || 0) + (dados?.lojasM?.quantidadeNecTerreno || 0) * (dados?.terrenos?.preçoConstrução || 0)) +
                      (ed?.lojasNecessarias?.lojasG || 0) * ((dados?.lojasG?.preçoConstrução || 0) + (dados?.lojasG?.quantidadeNecTerreno || 0) * (dados?.terrenos?.preçoConstrução || 0));

                    // ⚠️ IMPORTANTE: evitar recursão pesada no render
                    let custoRecursos = 0;
                    if (Array.isArray(ed?.recursoDeConstrução)) {
                      ed.recursoDeConstrução.forEach((nome) => {
                        try {
                          custoRecursos += calcularCustoRecurso(nome);
                        } catch {
                          custoRecursos += 0;
                        }
                      });
                    }

                    const custoTotal = custoBase + custoRecursos + (ed?.custoConstrucao || 0);

                    return custoTotal > 0 ? (lucro / custoTotal) * 100 : 0;

                  } catch (err) {
                    console.error("Erro no calcROI:", err);
                    return 0;
                  }
                };

                let todosEdificios = [];
                setoresArr.forEach(s => {
                  dados[s]?.edificios?.forEach((ed, idx) => {
                    if (ed.quantidade > 0) {
                      todosEdificios.push({ ed, idx, setor: s, roi: calcROI(ed, s), categoria: getCategoria(ed.nome) });
                    }
                  });
                });

                if (carteiraFiltroSetor !== "todos") todosEdificios = todosEdificios.filter(e => e.setor === carteiraFiltroSetor);

                if (carteiraOrdem === "roi_desc") todosEdificios.sort((a, b) => b.roi - a.roi);
                else if (carteiraOrdem === "roi_asc") todosEdificios.sort((a, b) => a.roi - b.roi);
                else if (carteiraOrdem === "categoria") todosEdificios.sort((a, b) => a.categoria.localeCompare(b.categoria));
                else if (carteiraOrdem === "setor") todosEdificios.sort((a, b) => a.setor.localeCompare(b.setor));
                else if (carteiraOrdem === "nome") todosEdificios.sort((a, b) => a.ed.nome.localeCompare(b.ed.nome));

                let receitaMensalTotal = 0, impostosTotais = 0;
                setoresArr.forEach(s => {
                  dados[s]?.edificios?.forEach(ed => {
                    if (ed.quantidade > 0) {
                      const fatu = (ed.finanças?.faturamentoUnitário || 0) * 30 * ed.quantidade;
                      const imp = fatu * (ed.finanças?.impostoSobreFatu || 0) + (ed.finanças?.impostoFixo || 0) * ed.quantidade;
                      receitaMensalTotal += fatu;
                      impostosTotais += imp;
                    }
                  });
                });

                const lucroLiquido = receitaMensalTotal - impostosTotais;
                const setoresAtivosSet = new Set(todosEdificios.map(e => e.setor));
                const edAtual = setoresArr.reduce((total, s) =>
                  total + (dados[s]?.edificios || []).reduce((sum, ed) =>
                    sum + (ed.quantidade > 0 ? ed.quantidade : 0), 0)
                  , 0);

                const tiposUnicos = new Set(
                  setoresArr.flatMap(s =>
                    (dados[s]?.edificios || []).filter(ed => ed.quantidade > 0).map(ed => ed.nome)
                  )
                ).size;

                const setoresComEdificios = setoresArr.filter(s =>
                  (dados[s]?.edificios || []).some(ed => ed.quantidade > 0)
                ).length;

                const edMax = dadosCarteiraEdificios.quantidadeEdificiosMax || 1;
                const percCapacidade = Math.min((edAtual / edMax) * 100, 100);
                const corBarra = percCapacidade >= 90 ? "#ff4d4d" : percCapacidade >= 70 ? "#FFD700" : "#7aff9a";

                const btnBase = {
                  border: "none", borderRadius: 8, padding: "5px 12px", cursor: "pointer",
                  fontFamily: "'Rajdhani',sans-serif", fontSize: 11, fontWeight: 700,
                  letterSpacing: ".06em", transition: "all .15s", whiteSpace: "nowrap",
                };
                const btnAtivo = { ...btnBase, background: "rgba(255,255,255,.18)", color: "#fff" };
                const btnInativo = { ...btnBase, background: "rgba(255,255,255,.06)", color: "rgba(255,255,255,.4)" };

                return (
                  <div key={carteiraKey} className="flex-1 w-full rounded-[20px] flex flex-col gap-[10px]" style={{ minHeight: 0 }}>
                    <Tooltip style={tooltipStyle} id="tooltip-carteira" />

                    {/* ── HEADER ─────────────────────────────────────── */}
                    <div className="h-[50px] w-full flex gap-[10px] items-center">
                      <div style={{ backgroundColor: setorAtivo.cor3 }}
                        className="rounded-[20px] px-4 h-full fonteBold text-white flex items-center justify-center text-[20px] sombra shrink-0">
                        Carteira
                      </div>
                      <div style={{ backgroundColor: setorAtivo.cor3 }}
                        className="rounded-[20px] px-4 h-full fonteBold text-white flex items-center text-[15px] sombra shrink-0">
                        {dadosCarteiraEdificios.classificacaoPorteEmpresa}
                      </div>
                      <div style={{ backgroundColor: setorAtivo.cor3 }}
                        className="rounded-[20px] h-full fonteBold text-white flex items-center sombra shrink-0">
                        <div style={{ backgroundColor: setorAtivo.cor4 }} className="h-full aspect-square rounded-[20px] border-[2px] flex items-center justify-center">
                          <img src={patrimônio} className="h-[60%] aspect-square" />
                        </div>
                        <h1 className="text-white fonteBold text-[17px] mx-[12px]">{formatarNumero(patrimonioTotal)}</h1>
                      </div>

                      {/* Performance inline */}
                      <div style={{ flex: 1, background: "rgba(0,0,0,.3)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, height: "100%", display: "flex", alignItems: "center", gap: 8, padding: "0 14px" }}>
                        {[
                          { label: "Receita/mês", val: "+" + formatarNumero(receitaMensalTotal), color: "#7aff9a" },
                          { label: "Impostos", val: "-" + formatarNumero(impostosTotais), color: "#ff9090" },
                          { label: "Lucro líq.", val: formatarNumero(lucroLiquido), color: lucroLiquido >= 0 ? "#C87AFF" : "#ff9090" },
                        ].map(({ label, val, color }, i) => (
                          <React.Fragment key={i}>
                            {i > 0 && <div style={{ width: 1, height: "55%", background: "rgba(255,255,255,.1)" }} />}
                            <div style={{ display: "flex", flexDirection: "column", gap: 1, flex: 1 }}>
                              <span style={{ fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "rgba(255,255,255,.35)" }}>{label}</span>
                              <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 15, fontWeight: 800, color, lineHeight: 1 }}>{val}</span>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                      <div className="flex gap-[8px] h-full shrink-0">
                        <button onClick={() => { abrirBanco(); buttonOpenAudio(); }}
                          data-tooltip-id="tooltip-carteira" data-tooltip-html="Abrir Bancos"
                          className="h-full bg-laranja aspect-square rounded-[10px] flex items-center justify-center hover:scale-[1.10] duration-300 cursor-pointer">
                          <img className="w-[70%]" src={bank} alt="Bancos" />
                        </button>
                        {/* <button onClick={() => { setBusinessLicenceModal(true); buttonOpenAudio(); }}
                          data-tooltip-id="tooltip-carteira" data-tooltip-html="Licenças empresariais"
                          className="h-full bg-laranja aspect-square rounded-[10px] flex items-center justify-center hover:scale-[1.10] duration-300 cursor-pointer">
                          <img className="w-[70%]" src={licença} />
                        </button> */}
                      </div>
                    </div>

                    {/* ── MÉTRICAS ───────────────────────────────────── */}
                    <div className="w-full flex gap-[10px]" style={{ height: 44 }}>
                      {[
                        { icon: limitar, tip: "Limite por tipo", val: String(dadosCarteiraEdificios.quantidadeUnicoMax) },
                        { icon: setoresImg, tip: "Setores ativos", val: `${setoresComEdificios}/${dadosCarteiraEdificios.quantidadeSetoresMax}` },
                        { icon: diversidade, tip: "Tipos de edifícios", val: `${tiposUnicos}/${dadosCarteiraEdificios.quantidadeDiversosEdificiosMax}` },
                        { icon: soma, tip: "Total de edifícios", val: `${edAtual}/${dadosCarteiraEdificios.quantidadeEdificiosMax}` },
                      ].map(({ icon, tip, val }, i) => (
                        <div key={i} data-tooltip-id="tooltip-carteira" data-tooltip-html={tip}
                          style={{ backgroundColor: setorAtivo.cor3 }}
                          className="flex-1 rounded-[12px] h-full fonteBold text-white flex items-center justify-between sombra px-[4px]">
                          <div style={{ backgroundColor: setorAtivo.cor4 }} className="h-[80%] aspect-square rounded-[10px] flex items-center justify-center">
                            <img src={icon} className="h-[55%] aspect-square" />
                          </div>
                          <span className="text-white fonteBold text-[15px] mr-[8px]">{val}</span>
                        </div>
                      ))}
                    </div>

                    {/* ── BARRA DE FILTROS E ORDENAÇÃO ───────────────── */}
                    <div style={{
                      display: "flex", alignItems: "center", gap: 8,
                      background: "rgba(0,0,0,.25)", border: "1px solid rgba(255,255,255,.07)",
                      borderRadius: 12, padding: "7px 12px", flexShrink: 0, flexWrap: "wrap",
                    }}>
                      <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".14em", color: "rgba(255,255,255,.3)", marginRight: 4 }}>
                        Ordenar
                      </span>
                      {[
                        { key: "setor", label: "Por setor" },
                        { key: "roi_desc", label: "ROI ↓" },
                        { key: "roi_asc", label: "ROI ↑" },
                        { key: "categoria", label: "Categoria" },
                        { key: "nome", label: "A–Z" },
                      ].map(({ key, label }) => (
                        <button key={key}
                          onClick={() => setCarteiraOrdem(key)}
                          style={carteiraOrdem === key ? btnAtivo : btnInativo}>
                          {label}
                        </button>
                      ))}

                      <div style={{ width: 1, height: 20, background: "rgba(255,255,255,.1)", margin: "0 4px" }} />
                      <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".14em", color: "rgba(255,255,255,.3)", marginRight: 4 }}>
                        Setor
                      </span>

                      {["todos", ...setoresArr].map(s => {
                        const sc = s !== "todos" ? setoresCores[s] : null;
                        const isAtivo = carteiraFiltroSetor === s;
                        const temCards = s === "todos" || setoresAtivosSet.has(s);
                        return (
                          <button key={s}
                            onClick={() => setCarteiraFiltroSetor(s)}
                            style={{
                              ...btnBase,
                              background: isAtivo ? (sc ? sc.cor3 : "rgba(255,255,255,.2)") : "rgba(255,255,255,.05)",
                              color: isAtivo ? "#fff" : temCards ? "rgba(255,255,255,.45)" : "rgba(255,255,255,.15)",
                              border: isAtivo && sc ? `1px solid ${sc.cor4}` : "1px solid transparent",
                              opacity: temCards ? 1 : 0.5,
                            }}>
                            {setoresNomes[s]}
                          </button>
                        );
                      })}

                      <span style={{ marginLeft: "auto", fontSize: 10, color: "rgba(255,255,255,.3)", fontFamily: "'Rajdhani',sans-serif" }}>
                        {todosEdificios.length} edifício{todosEdificios.length !== 1 ? "s" : ""}
                      </span>
                    </div>

                    {/* ── GRID DE CARDS ──────────────────────────────── */}
                    <div
                      style={{ background: `linear-gradient(135deg, ${setorAtivo.cor1} 0%, ${setorAtivo.cor4} 100%)` }}
                      className="flex-1 overflow-y-auto mt-0 scrollbar-custom rounded-[10px]"
                    >
                      {todosEdificios.length === 0 ? (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 8, opacity: .4 }}>
                          <span style={{ fontSize: 22 }}>📭</span>
                          <span style={{ color: "#fff", fontSize: 13, fontFamily: "'Rajdhani',sans-serif" }}>
                            {carteiraFiltroSetor !== "todos" ? `Nenhum edifício em ${setoresNomes[carteiraFiltroSetor]}` : "Nenhum edifício na carteira ainda"}
                          </span>
                        </div>
                      ) : (
                        <div className="w-full gap-y-[20px] grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] h-[400px] pt-[20px] pl-[20px]">
                          {todosEdificios.map(({ ed, idx, setor, roi, categoria }) => (
                            <div key={`${setor}-${idx}`} style={{ position: "relative" }}>
                              {/* Badge ROI */}
                              <div style={{
                                position: "absolute", top: -8, right: 10, zIndex: 2,
                                background: roi >= 10 ? "#1a4a1a" : roi >= 0 ? "#2a2a1a" : "#4a1a1a",
                                border: `1px solid ${roi >= 10 ? "#7aff9a" : roi >= 0 ? "#FFD700" : "#ff9090"}`,
                                borderRadius: 6, padding: "1px 8px", display: "flex", alignItems: "center", gap: 4,
                              }}>
                                <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 11, fontWeight: 800, color: roi >= 10 ? "#7aff9a" : roi >= 0 ? "#FFD700" : "#ff9090" }}>
                                  {roi >= 0 ? "+" : ""}{roi.toFixed(1)}%
                                </span>
                              </div>
                              {/* Badge categoria */}
                              {/* <div style={{
                  position: "absolute", top: -8, left: 10, zIndex: 10,
                  background: categoriaColor[categoria] + "33",
                  border: `1px solid ${categoriaColor[categoria]}88`,
                  borderRadius: 6, padding: "1px 8px",
                }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: categoriaColor[categoria], letterSpacing: ".08em", textTransform: "uppercase" }}>
                    {categoriaLabel[categoria]}
                  </span>
                </div> */}
                              <CardLocalization index={idx} setor={setor} abrirModalSell={abrirModalSell} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {modalSellOpen && (
                      <SellModal
                        setor={modalProps.setor}
                        nomeLicença={modalProps.nomeLicença}
                        index={modalProps.index}
                        onClose={() => setModalSellOpen(false)}
                      />
                    )}

                    {/* ── BARRA DE CAPACIDADE ────────────────────────── */}
                    <div style={{
                      background: "rgba(0,0,0,.3)", border: "1px solid rgba(255,255,255,.08)",
                      borderRadius: 10, padding: "8px 14px", flexShrink: 0,
                      display: "flex", alignItems: "center", gap: 12,
                    }}>
                      <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "rgba(255,255,255,.35)", whiteSpace: "nowrap" }}>
                        Capacidade
                      </span>
                      <div style={{ flex: 1, height: 7, background: "rgba(255,255,255,.08)", borderRadius: 4, overflow: "hidden" }}>
                        <div style={{
                          height: "100%", width: `${percCapacidade}%`,
                          background: corBarra, borderRadius: 4,
                          transition: "width .4s ease",
                          boxShadow: `0 0 8px ${corBarra}88`,
                        }} />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.5)", whiteSpace: "nowrap" }}>
                        {edAtual} / {edMax} edifícios
                      </span>
                      {percCapacidade >= 80 && (
                        <button onClick={() => { setBusinessLicenceModal(true); buttonOpenAudio(); }}
                          style={{
                            background: "linear-gradient(135deg,#4C14A9,#6411D9)",
                            border: "none", borderRadius: 7, padding: "4px 12px",
                            fontFamily: "'Rajdhani',sans-serif", fontSize: 11, fontWeight: 700,
                            color: "#fff", cursor: "pointer", whiteSpace: "nowrap", letterSpacing: ".06em",
                          }}>
                          Evoluir empresa →
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()}

              {ativo !== "grafico" &&
                ativo !== "mercado" &&
                ativo !== "ecossistema" &&
                ativo !== "carteira" &&
                ativo !== "gerenciamento" && (
                  <div className="flex-1 w-full rounded-[20px] flex flex-col justify-between h-full">
                    {/* Tooltips */}

                    {/* Barra superior */}
                    <div className="h-[50px] w-full flex justify-between gap-[10px] items-start">
                      {/* Setor ativo */}
                      <div
                        data-tooltip-id="tooltip-terreno-aumentar"
                        data-tooltip-html="Setor atual selecionado"
                        style={{ backgroundColor: setorAtivo.cor3 }}
                        className="w-[30%] rounded-[20px] h-full fonteBold text-white flex items-center justify-center text-[30px] sombra"
                      >
                        {ativoConvertido(ativo)}
                      </div>

                      {/* Imposto anual (valor) */}
                      <div
                        data-tooltip-id="tooltip-terreno-aumentar"
                        data-tooltip-html="Valor total do patrimônio do setor"
                        style={{ backgroundColor: setorAtivo.cor3 }}
                        className="w-[30%] rounded-[20px] h-full fonteBold text-white flex items-center justify-between text-[30px] sombra"
                      >
                        <div
                          style={{ backgroundColor: setorAtivo.cor4 }}
                          className="h-full aspect-square rounded-[20px] border-[2px] flex items-center justify-center"
                        >
                          <img
                            src={patrimônio}
                            className="h-[60%] aspect-square"
                          />
                        </div>
                        <h1 className="text-white fonteBold text-[20px] mr-[20px]">
                          {formatarNumero(
                            economiaSetores[ativo].economiaSetor.patrimonio
                          )}
                        </h1>
                      </div>

                      {/* Imposto anual (percentual) */}
                      <div
                        data-tooltip-id="tooltip-terreno-aumentar"
                        data-tooltip-html="Percentual de imposto anual aplicado ao setor"
                        style={{ backgroundColor: setorAtivo.cor3 }}
                        className="w-[15%] rounded-[20px] h-full fonteBold text-white flex items-center justify-between text-[30px] sombra"
                      >
                        <div
                          style={{ backgroundColor: setorAtivo.cor4 }}
                          className="h-full aspect-square rounded-[20px] border-[2px] flex items-center justify-center"
                        >
                          <img
                            src={impostoAnual}
                            className="h-[60%] aspect-square"
                          />
                        </div>
                        <h1 className="text-white fonteBold text-[20px] mr-[20px]">
                          {(
                            economiaSetores[ativo].economiaSetor
                              .percImpostoAnualAtual / 12
                          ).toFixed(2)}
                          %
                        </h1>
                      </div>

                      {/* Espaço vazio para alinhar */}
                      <div className="flex gap-2 h-full"></div>

                      {/* Ícones de Economia */}
                      <div className="flex gap-2 h-full">
                        {/* Licença */}
                        <button
                          data-tooltip-id="tooltip-terreno-aumentar"
                          data-tooltip-html="Abrir menu de licenças do setor"
                          style={{ backgroundColor: setorAtivo.cor3 }}
                          onClick={() => { setLicencaModal({ open: true, scrollToIndex: null }); buttonOpenAudio(); }}

                          className="h-full aspect-square rounded-[10px] flex items-center justify-center hover:scale-[1.10] duration-300 ease-in-out delay-[0.1s] cursor-pointer"
                        >
                          <img className="w-[70%]" src={licença} />
                        </button>

                        {/* Economia atual */}
                        <div
                          data-tooltip-id="tooltip-terreno-aumentar"
                          data-tooltip-html="Estado atual da economia deste setor"
                          className={`h-full aspect-square rounded-[10px] border-[2px] flex items-center justify-center ${corEconomia(
                            economiaSetores[ativo].economiaSetor.estadoAtual
                          )}`}
                        >
                          <img className="w-[70%]" src={circularEconomia} />
                        </div>
                      </div>
                    </div>

                    {/* Container dos cards com scroll interno */}
                    <div
                      style={{
                        background: `linear-gradient(135deg, ${setorAtivo.cor1} 0%,${setorAtivo.cor4} 100%)`,
                      }}
                      className="flex-1 overflow-y-auto mt-4 scrollbar-custom h-[calc(100%-50px)] rounded-[10px]"
                    >
                      <div className="w-full gap-y-[20px] grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] h-[400px] pt-[20px] pl-[20px]">
                        {dados[ativo].edificios.map((_, index) => (
                          <CardModal key={index} index={index} />
                        ))}
                      </div>
                    </div>
                    <Tooltip style={tooltipStyle} id="tooltip-terreno-aumentar" />
                    <Tooltip
                      style={tooltipStyle}
                      id="tooltip-terreno-aumentar"
                    />
                    <Tooltip
                      style={tooltipStyle}
                      id="tooltip-terreno-aumentar"
                    />
                    <Tooltip style={tooltipStyle} id="tooltip-terreno-aumentar" />
                    <Tooltip style={tooltipStyle} id="tooltip-terreno-aumentar" />
                  </div>
                )}
            </div>
          ) : (
            // Container sem licença comprada
            <div className="w-full h-full flex flex-col items-center justify-center p-4">
              <div
                className="p-4 rounded-[30px] w-[90%] h-[90%] flex flex-col self-center items-center justify-between"
                style={{ backgroundColor: setorAtivo.cor2 }}
              >
                <div
                  className="w-[90%] text-center rounded-[10px]"
                  style={{ backgroundColor: setorAtivo.cor3 }}
                >
                  <h1 className="text-white text-3xl fonteBold text-[40px]">
                    Licença Global de {ativo}{" "}
                  </h1>
                </div>
                <p className="text-white p-[40px]">{setorAtivo.descLicença}</p>
                <div className="flex justify-center gap-[20px] w-full ">
                  <div
                    className="text-white flex items-center justify-around w-[20%] rounded-[10px]"
                    style={{ backgroundColor: setorAtivo.cor1 }}
                  >
                    <img className="w-[20px]" src={DolarImg} />
                    <h1 className="fonteBold">{licenciaValor}</h1>
                  </div>
                  <div className="w-[20%]">
                    <button
                      onClick={LiberarLicença}
                      className="bg-[#350973] text-white fonteBold w-full rounded-[10px] h-[40px]"
                    >
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div >
    );
  }
  if (vision === "mapa") {
    return (
      <div className="w-full h-full border-[#350973] rounded-[20px] flex">

        <MapWorld />
      </div>
    )
  }
  if (vision === "outro") {
    return (
      <div className="w-full h-full border-[#350973] rounded-[20px] flex">
        <div className="w-full flex-1 p-4 flex flex-col">
          <div className="flex-1 w-full rounded-[20px] flex flex-col">
            <motion.div
              animate={controls}
              initial={{
                background:
                  "linear-gradient(to top, #fbb034, #ffdd00, #ffeeee)",
              }}
              className="gradiente w-full flex-1 rounded-[20px] flex justify-center items-center relative overflow-hidden"
            >
              {/* Terreno */}
              <img
                src={solo}
                alt="Terreno"
                className="w-[700px] h-[600px] top-[100px] relative z-[1]"
              />

              {/* Prédio */}
              <div className="absolute bottom-[-100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5]">
                <img
                  src={buildBusiness}
                  alt="Prédio"
                  className="w-[400px] h-auto"
                />
              </div>

              {/* Camada de luz */}
              <motion.div
                animate={controls}
                initial={{ background: gradientes[0] }}
                className="absolute inset-0 z-[15] opacity-[30%] pointer-events-none mix-blend-soft-light"
              />

              {/* Container dos botões no canto inferior direito */}
              <div className="absolute top-4 left-4 z-[5] flex flex-col gap-2">
                {/* Botão do Computador */}
                <button
                  onClick={() => {
                    abrirBanco(), buttonOpenAudio();
                  }}
                  data-tooltip-id="saldo-tip"
                  data-tooltip-content="Abrir Bancos"
                  className="w-[100px] h-[100px] bg-laranja rounded-[15px] flex items-center justify-center hover:bg-[#E56100] active:scale-95 hover:scale-[1.05] transition-transform"
                >
                  <img
                    className="w-[70px] h-[70px]"
                    src={bank}
                    alt="Abrir Bancos"
                  />
                </button>
              </div>
              <div className="absolute top-4 right-4 z-[5] flex flex-col gap-2">
                {/* Botão do Computador */}
                <button
                  onClick={() => {
                    setBusinessLicenceModal(true);
                    buttonOpenAudio();
                  }}
                  data-tooltip-id="saldo-tip"
                  data-tooltip-content="Abrir Licenças Empresariais"
                  className="w-[100px] h-[100px] bg-laranja rounded-[15px] flex items-center justify-center hover:bg-[#E56100] active:scale-95 hover:scale-[1.05] transition-transform"
                >
                  <img
                    className="w-[70px] h-[70px]"
                    src={licença}
                    alt="Abrir dashboard"
                  />
                </button>
              </div>
            </motion.div>
            {/* <div className="absolute bottom-4 left-4 z-[10] flex flex-col gap-2">

                <button
                  onClick={() => setVision("dashboard")}
                  data-tooltip-id="saldo-tip"
                  data-tooltip-content="Abrir dashboard"
                  className="w-[100px] h-[100px] bg-laranja rounded-[15px] flex items-center justify-center hover:bg-[#E56100] active:scale-95 hover:scale-[1.05] transition-transform"
                >
                  <img
                    className="w-[70px] h-[70px]"
                    src={computador}
                    alt="Abrir dashboard"
                  />
                </button>

              </div> */}
            {/* <div className="absolute opacity-[90] bottom-4 right-4 z-[10] flex flex-col gap-2">

                <button
                  onClick={() => setAtivo("grafico")} // Corrigido: setAtivo em vez de setorAtivo
                  data-tooltip-id="saldo-tip"
                  data-tooltip-content="Escritório"
                  className="w-[100px] h-[100px] bg-laranja rounded-[15px] flex items-center justify-center hover:bg-[#E56100] active:scale-95 hover:scale-[1.05] transition-transform"
                >
                  <img
                    className="w-[70px] h-[70px]"
                    src={imgchefeIcon}
                    alt="Abrir gráficos"
                  />
                </button>
              </div> */}

          </div>
        </div>
      </div>
    );
  }
  if (vision === "bank") {
    return (
      <div className="w-full h-full border-[#350973] rounded-[20px] flex">
        {/* <CreditCard /> */}
        <BankDetailsInterface />
      </div>
    );
  }
  if (vision === "bankInterface") {
    return (
      <div className="w-full h-full border-[#350973] rounded-[20px] flex">
        <BankInterface />
      </div>
    );
  }
  if (vision === "licençaEmpre") {
    return (
      <div className="w-full h-full border-[#350973] rounded-[20px] flex">
        <BusinessLicence setor={"carteira"} />
      </div>
    );
  }
  if (vision === "financas") {
    return (
      <div className="w-full h-full border-[#350973] rounded-[20px] flex">
        <CorporateFinanceInterface />
      </div>
    );
  }
}