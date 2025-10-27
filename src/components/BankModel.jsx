import React, { useState, useRef, useContext } from "react";
import { X, CreditCard } from 'lucide-react';
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { ModalBank } from "../components/ModalBank.jsx";
import maps from "../../public/outrasImagens/maps.png";
import backButton from "../../public/outrasImagens/back-button.png";


const BankSelection = () => {
  const { economiaSetores } = useContext(DadosEconomyGlobalContext);
  const { dados, atualizarDadosProf2, atualizarDados } = useContext(
    CentraldeDadosContext
  );
  const [selectedBank, setSelectedBank] = useState(null);

  const [banksModal, setBanksModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const contratosArray = economiaSetores?.contratosBancos ?? [];
  const valueMaxH = !contratosArray.length ? 80 : 80;

const ListaContratosAtivos = () => {
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);
  
  // CORREÇÃO: Garantir que é array
  const contratosArray = Array.isArray(economiaSetores.contratosBancos) 
    ? economiaSetores.contratosBancos 
    : [];
  
  const idContratoAtivo = economiaSetores.idContrato || 0;

  const trocarContrato = (index) => {
    if (contratosArray[index]) {
      atualizarEco('idContrato', index);
    }
  };

  const contratosValidos = contratosArray.filter(c => c !== null && c !== undefined);
  
  if (contratosValidos.length === 0) return null;

  return (
    <div className="bg-white/10 rounded-xl p-4 mx-6 mb-4">
      <h3 className="text-white font-bold mb-3">
        Contratos ({contratosValidos.length}/3)
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {contratosArray.map((c, i) => {
          if (!c) return (
            <div key={i} className="bg-white/5 border-2 border-dashed border-white/20 rounded-lg p-3 text-center text-white/30 text-sm">
              Slot {i + 1}: Vazio
            </div>
          );

          const isAtivo = i === idContratoAtivo;

          return (
            <button
              key={i}
              onClick={() => trocarContrato(i)}
              className={`relative rounded-lg p-3 cursor-pointer transition-all hover:scale-105 ${
                isAtivo ? 'ring-2 ring-white shadow-xl scale-105' : ''
              }`}
              style={{ background: `linear-gradient(135deg, ${c.cor1}, ${c.cor2})` }}
            >
              {isAtivo && (
                <div className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                  ATIVO
                </div>
              )}

              <div className="text-white">
                <p className="text-xs font-bold truncate mb-1">{c.bancoNome}</p>
                <p className="text-white/80 text-[10px] truncate mb-2">{c.cartaoNome}</p>
                
                <div className="text-[10px] space-y-0.5 border-t border-white/20 pt-2">
                  <div className="flex justify-between">
                    <span className="text-white/60">Limite:</span>
                    <span className="font-semibold">
                      R$ {(c.limiteEmprestimo || 0).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Vence:</span>
                    <span className="font-semibold">Dia {c.dataFim}</span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};


  const setVision = (newVision) => {
    atualizarDados("vision", {
      ...dados.vision,
      visionAtual: newVision,
    });
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

  const config = {
    cashback: {
      nenhum: { valor: 0 },
      todos: { valor: 2 },
      especifico: { valor: 5 },
    },
    juros: {
      baixo: 2, // % a.m
      medio: 3,
      alto: 4,
    },
    emprestimos: {
      baixo: { mult: 1 },
      medio: { mult: 2 },
      alto: { mult: 3 },
    },
    investimentos: {
      pos: {
        baixa: 1, // % a.m
        media: 3,
        alta: 5,
      },
      pre: {
        baixa: [
          { prazo: 90, valor: 0.5 },
          { prazo: 180, valor: 0.7 },
          { prazo: 360, valor: 1.0 },
        ],
        media: [
          { prazo: 90, valor: 0.7 },
          { prazo: 180, valor: 1.0 },
          { prazo: 360, valor: 1.5 },
        ],
        alta: [
          { prazo: 90, valor: 1.5 },
          { prazo: 180, valor: 2.0 },
          { prazo: 360, valor: 2.5 },
        ],
      },
    },
  };

  const bancos = [
    {
      id: 1,
      nome: "Agro Bank",
      cor: "linear-gradient(90deg, #003816, #4CAF50)",
      icone: "🌱",
      descricao:
        "Especialista no setor agrícola",
      cartoes: [
        {
          id: 111,
          nome: "Agro Classic",
          design: "card-classico",
          cor1: "#003816",
          cor2: "#1A5E2A",
          cor3: "#0C9123",
          cor4: "#4CAF50",
          numeroCard: "5757 **** **** 6868",
          cashback: "especifico",
          setorCashback: "agricultura",
          juros: "alto",
          emprestimo: "medio",
          investimento: "media",
        },
        {
          id: 112,
          nome: "Agro Top",
          design: "triangular-fusion",
          cor1: "#004d1a",
          cor2: "#1a7030",
          cor3: "#0c9123",
          cor4: "#66bb66",
          numeroCard: "4341 **** **** 6128",
          cashback: "todos",
          juros: "medio",
          emprestimo: "alto",
          investimento: "alta",
        },
        {
          id: 113,
          nome: "Agro Ultra",
          design: "geometric-chaos",
          cor1: "#005622",
          cor2: "#2a8a4a",
          cor3: "#14a231",
          cor4: "#81c784",
          numeroCard: "1421 **** **** 1211",
          cashback: "nenhum",
          juros: "baixo",
          emprestimo: "baixo",
          investimento: "baixa",
        },
      ],
    },
    {
      id: 2,
      nome: "Mega Credit",
      cor: "linear-gradient(90deg, #003366, #99ccff)",
      icone: "🏛️",
      descricao: "Oferece muito crédito, mas cobra juros altíssimos.",
      cartoes: [
        {
          id: 211,
          nome: "Basic Mega",
          design: "triangular-fusion",
          cor1: "#003366",
          cor2: "#336699",
          cor3: "#6699cc",
          cor4: "#99ccff",
          numeroCard: "2431 **** **** 6112",
          cashback: "nenhum",
          juros: "alto",
          emprestimo: "alto",
          investimento: "baixa",
        },
        {
          id: 212,
          nome: "Mega Gold",
          design: "geometric-chaos",
          cor1: "#001a66",
          cor2: "#0044cc",
          cor3: "#0066ff",
          cor4: "#3399ff",
          numeroCard: "3434 **** **** 2222",
          cashback: "especifico",
          setorCashback: "crédito",
          juros: "alto",
          emprestimo: "alto",
          investimento: "media",
        },
        {
          id: 213,
          nome: "Mega Platinum",
          design: "wave-patterns",
          cor1: "#002244",
          cor2: "#0055aa",
          cor3: "#3388cc",
          cor4: "#66bbff",
          numeroCard: "5464 **** **** 3452",
          cashback: "todos",
          juros: "alto",
          emprestimo: "alto",
          investimento: "alta",
        },
      ],
    },
    {
      id: 3,
      nome: "Tech Bank",
      cor: "linear-gradient(90deg, #ff9900, #ffe0b3)",
      icone: "💻",
      descricao: "Banco digital focado em tecnologia e inovação.",
      cartoes: [
        {
          id: 311,
          nome: "Tech Standard",
          design: "card-Moderno",
          cor1: "#ff9900",
          cor2: "#ffb84d",
          cor3: "#ffcc66",
          cor4: "#ffe0b3",
          numeroCard: "5321 **** **** 4338",
          cashback: "especifico",
          setorCashback: "tecnologia",
          juros: "medio",
          emprestimo: "baixo",
          investimento: "alta",
        },
        {
          id: 312,
          nome: "Tech Premium",
          design: "wave-patterns",
          cor1: "#cc6600",
          cor2: "#ff8000",
          cor3: "#ff9933",
          cor4: "#ffc266",
          numeroCard: "5343 **** **** 3431",
          cashback: "todos",
          juros: "baixo",
          emprestimo: "medio",
          investimento: "alta",
        },
        {
          id: 313,
          nome: "Tech Ultra",
          design: "geometric-chaos",
          cor1: "#ff6600",
          cor2: "#ff9933",
          cor3: "#ffb366",
          cor4: "#ffe0b3",
          numeroCard: "5223 **** **** 6241",
          cashback: "especifico",
          setorCashback: "startups",
          juros: "baixo",
          emprestimo: "baixo",
          investimento: "alta",
        },
      ],
    },
    {
      id: 4,
      nome: "Steel Bank",
      cor: "linear-gradient(90deg, #333333, #cccccc)",
      icone: "⚙️",
      descricao: "Especializado em financiar o setor industrial.",
      cartoes: [
        {
          id: 401,
          nome: "Steel Classic",
          design: "card-classico",
          cor1: "#333333",
          cor2: "#666666",
          cor3: "#999999",
          cor4: "#cccccc",
          numeroCard: "1212 **** **** 3434",
          cashback: "especifico",
          juros: "baixo",
          emprestimo: "baixo",
          investimento: "baixa",
        },
        {
          id: 402,
          nome: "Steel Premium",
          design: "wave-patterns",
          cor1: "#2a2a2a",
          cor2: "#555555",
          cor3: "#888888",
          cor4: "#bbbbbb",
          numeroCard: "5656 **** **** 7878",
          cashback: "especifico",
          juros: "baixo",
          emprestimo: "medio",
          investimento: "media",
        },
        {
          id: 403,
          nome: "Steel Ultra",
          design: "geometric-chaos",
          cor1: "#1a1a1a",
          cor2: "#444444",
          cor3: "#777777",
          cor4: "#aaaaaa",
          numeroCard: "9898 **** **** 1212",
          cashback: "todos",
          juros: "baixo",
          emprestimo: "medio",
          investimento: "media",
        },
      ],
    },

    // 5 Energy Plus
    {
      id: 5,
      nome: "Energy Plus",
      cor: "linear-gradient(90deg, #FFD700, #FFFF99)",
      icone: "⚡",
      descricao: "Banco sustentável com foco em energia renovável.",
      cartoes: [
        {
          id: 501,
          nome: "Energy Basic",
          design: "wave-patterns",
          cor1: "#FFD700",
          cor2: "#FFEB3B",
          cor3: "#FFF59D",
          cor4: "#FFFF99",
          numeroCard: "1010 **** **** 2020",
          cashback: "especifico",
          juros: "baixo",
          emprestimo: "baixo",
          investimento: "media",
        },
        {
          id: 502,
          nome: "Energy Premium",
          design: "card-moderno",
          cor1: "#FFC107",
          cor2: "#FFD54F",
          cor3: "#FFECB3",
          cor4: "#FFFF99",
          numeroCard: "3030 **** **** 4040",
          cashback: "especifico",
          juros: "baixo",
          emprestimo: "medio",
          investimento: "media",
        },
        {
          id: 503,
          nome: "Energy Ultra",
          design: "geometric-chaos",
          cor1: "#FFD600",
          cor2: "#FFEA00",
          cor3: "#FFF176",
          cor4: "#FFFF99",
          numeroCard: "5050 **** **** 6060",
          cashback: "especifico",
          juros: "baixo",
          emprestimo: "medio",
          investimento: "alta",
        },
      ],
    },

    // 6 Prime Capital
    {
      id: 6,
      nome: "Prime Capital",
      cor: "linear-gradient(90deg, #800080, #D8BFD8)",
      icone: "💎",
      descricao:
        "Banco premium com serviços exclusivos para grandes investidores.",
      cartoes: [
        {
          id: 601,
          nome: "Prime Basic",
          design: "card-classico",
          cor1: "#800080",
          cor2: "#993399",
          cor3: "#B266B2",
          cor4: "#D8BFD8",
          numeroCard: "1111 **** **** 2222",
          cashback: "nenhum",
          juros: "alto",
          emprestimo: "alto",
          investimento: "media",
        },
        {
          id: 602,
          nome: "Prime Gold",
          design: "wave-patterns",
          cor1: "#660066",
          cor2: "#993399",
          cor3: "#B266B2",
          cor4: "#D8BFD8",
          numeroCard: "3333 **** **** 4444",
          cashback: "especifico",
          juros: "alto",
          emprestimo: "alto",
          investimento: "media",
        },
        {
          id: 603,
          nome: "Prime Ultra",
          design: "geometric-chaos",
          cor1: "#4B004B",
          cor2: "#800080",
          cor3: "#993399",
          cor4: "#D8BFD8",
          numeroCard: "5555 **** **** 6666",
          cashback: "especifico",
          juros: "alto",
          emprestimo: "alto",
          investimento: "alta",
        },
      ],
    },

    // 7 Imob Bank
    {
      id: 7,
      nome: "Imob Bank",
      cor: "linear-gradient(90deg, #0000CC, #9999FF)",
      icone: "🏠",
      descricao: "Especialista em financiamento imobiliário e terrenos.",
      cartoes: [
        {
          id: 701,
          nome: "Imob Classic",
          design: "card-classico",
          cor1: "#0000CC",
          cor2: "#3333FF",
          cor3: "#6666FF",
          cor4: "#9999FF",
          numeroCard: "1212 **** **** 3434",
          cashback: "nenhum",
          juros: "medio",
          emprestimo: "medio",
          investimento: "baixa",
        },
        {
          id: 702,
          nome: "Imob Premium",
          design: "wave-patterns",
          cor1: "#000099",
          cor2: "#3333CC",
          cor3: "#6666FF",
          cor4: "#9999FF",
          numeroCard: "5656 **** **** 7878",
          cashback: "especifico",
          juros: "baixo",
          emprestimo: "medio",
          investimento: "media",
        },
        {
          id: 703,
          nome: "Imob Ultra",
          design: "geometric-chaos",
          cor1: "#000066",
          cor2: "#333399",
          cor3: "#6666CC",
          cor4: "#9999FF",
          numeroCard: "9898 **** **** 1212",
          cashback: "especifico",
          juros: "baixo",
          emprestimo: "alto",
          investimento: "media",
        },
      ],
    },

    // 8 Green Energy
    {
      id: 8,
      nome: "Green Energy",
      cor: "linear-gradient(90deg, #00CC00, #99FF99)",
      icone: "🌿",
      descricao: "Foco em investimentos sustentáveis e energia verde.",
      cartoes: [
        {
          id: 801,
          nome: "Green Basic",
          design: "wave-patterns",
          cor1: "#00CC00",
          cor2: "#33CC33",
          cor3: "#66CC66",
          cor4: "#99FF99",
          numeroCard: "1010 **** **** 2020",
          cashback: "especifico",
          juros: "baixo",
          emprestimo: "baixo",
          investimento: "baixa",
        },
        {
          id: 802,
          nome: "Green Premium",
          design: "card-moderno",
          cor1: "#009900",
          cor2: "#33CC33",
          cor3: "#66CC66",
          cor4: "#99FF99",
          numeroCard: "3030 **** **** 4040",
          cashback: "especifico",
          juros: "baixo",
          emprestimo: "medio",
          investimento: "media",
        },
        {
          id: 803,
          nome: "Green Ultra",
          design: "geometric-chaos",
          cor1: "#006600",
          cor2: "#33AA33",
          cor3: "#66CC66",
          cor4: "#99FF99",
          numeroCard: "5050 **** **** 6060",
          cashback: "todos",
          juros: "baixo",
          emprestimo: "alto",
          investimento: "alta",
        },
      ],
    },

    // 9 Solar Bank

    // 10 Future Tech
    {
      id: 10,
      nome: "Future Tech",
      cor: "linear-gradient(90deg, #FF6600, #FFD699)",
      icone: "🤖",
      descricao: "Banco digital futurista focado em inovações tecnológicas.",
      cartoes: [
        {
          id: 1001,
          nome: "Future Basic",
          design: "card-classico",
          cor1: "#FF6600",
          cor2: "#FF8533",
          cor3: "#FF9966",
          cor4: "#FFD699",
          numeroCard: "1717 **** **** 2828",
          cashback: "nenhum",
          juros: "medio",
          emprestimo: "baixo",
          investimento: "baixa",
        },
        {
          id: 1002,
          nome: "Future Premium",
          design: "wave-patterns",
          cor1: "#FF5500",
          cor2: "#FF7733",
          cor3: "#FF9966",
          cor4: "#FFD699",
          numeroCard: "3939 **** **** 4949",
          cashback: "especifico",
          juros: "medio",
          emprestimo: "medio",
          investimento: "media",
        },
        {
          id: 1003,
          nome: "Future Ultra",
          design: "geometric-chaos",
          cor1: "#FF4400",
          cor2: "#FF7733",
          cor3: "#FF9966",
          cor4: "#FFD699",
          numeroCard: "5959 **** **** 6060",
          cashback: "especifico",
          juros: "baixo",
          emprestimo: "alto",
          investimento: "media",
        },
      ],
    },

    // 11 Ocean Bank
    {
      id: 11,
      nome: "Ocean Bank",
      cor: "linear-gradient(90deg, #0066CC, #99CCFF)",
      icone: "🌊",
      descricao:
        "Banco com foco em sustentabilidade marítima e investimentos em oceanos.",
      cartoes: [
        {
          id: 1101,
          nome: "Ocean Basic",
          design: "card-classico",
          cor1: "#0066CC",
          cor2: "#3399CC",
          cor3: "#66CCCC",
          cor4: "#99CCFF",
          numeroCard: "1010 **** **** 2020",
          cashback: "nenhum",
          juros: "baixo",
          emprestimo: "baixo",
          investimento: "baixa",
        },
        {
          id: 1102,
          nome: "Ocean Premium",
          design: "wave-patterns",
          cor1: "#0055AA",
          cor2: "#3399CC",
          cor3: "#66CCCC",
          cor4: "#99CCFF",
          numeroCard: "3030 **** **** 4040",
          cashback: "especifico",
          juros: "baixo",
          emprestimo: "medio",
          investimento: "media",
        },
        {
          id: 1103,
          nome: "Ocean Ultra",
          design: "geometric-chaos",
          cor1: "#004488",
          cor2: "#3399CC",
          cor3: "#66CCCC",
          cor4: "#99CCFF",
          numeroCard: "5050 **** **** 6060",
          cashback: "especifico",
          juros: "baixo",
          emprestimo: "alto",
          investimento: "media",
        },
      ],
    },

    // 12 Solar Bank (duplicado no seu input - converti também)
    {
      id: 12,
      nome: "Solar Bank",
      cor: "linear-gradient(90deg, #FFCC00, #FFF9E6)",
      icone: "☀️",
      descricao: "Banco sustentável com foco em energia solar e limpa.",
      cartoes: [
        {
          id: 1201,
          nome: "Solar Bright",
          design: "wave-patterns",
          cor1: "#FFCC00",
          cor2: "#FFE066",
          cor3: "#FFF2B3",
          cor4: "#FFF9E6",
          numeroCard: "2020 **** **** 3131",
          cashback: "especifico",
          juros: "baixo",
          emprestimo: "baixo",
          investimento: "media",
        },
        {
          id: 1202,
          nome: "Solar Premium",
          design: "card-moderno",
          cor1: "#FFB300",
          cor2: "#FFD633",
          cor3: "#FFE066",
          cor4: "#FFF9E6",
          numeroCard: "4141 **** **** 5252",
          cashback: "especifico",
          juros: "baixo",
          emprestimo: "medio",
          investimento: "media",
        },
        {
          id: 1203,
          nome: "Solar Ultra",
          design: "geometric-chaos",
          cor1: "#FF9900",
          cor2: "#FFCC33",
          cor3: "#FFE066",
          cor4: "#FFF9E6",
          numeroCard: "6363 **** **** 7474",
          cashback: "todos",
          juros: "baixo",
          emprestimo: "medio",
          investimento: "alta",
        },
      ],
    },

    // 13 Crypto Bank
    {
      id: 13,
      nome: "Crypto Bank",
      cor: "linear-gradient(90deg, #FF00FF, #FF99FF)",
      icone: "🪙",
      descricao: "Focado em criptoativos e investimentos digitais.",
      cartoes: [
        {
          id: 1301,
          nome: "Crypto Basic",
          design: "card-classico",
          cor1: "#FF00FF",
          cor2: "#CC00CC",
          cor3: "#FF66FF",
          cor4: "#FF99FF",
          numeroCard: "1111 **** **** 2222",
          cashback: "especifico",
          juros: "baixo",
          emprestimo: "baixo",
          investimento: "media",
        },
        {
          id: 1302,
          nome: "Crypto Premium",
          design: "wave-patterns",
          cor1: "#CC00CC",
          cor2: "#FF33FF",
          cor3: "#FF66FF",
          cor4: "#FF99FF",
          numeroCard: "3333 **** **** 4444",
          cashback: "todos",
          juros: "medio",
          emprestimo: "medio",
          investimento: "alta",
        },
        {
          id: 1303,
          nome: "Crypto Ultra",
          design: "geometric-chaos",
          cor1: "#990099",
          cor2: "#CC00CC",
          cor3: "#FF66FF",
          cor4: "#FF99FF",
          numeroCard: "5555 **** **** 6666",
          cashback: "todos",
          juros: "baixo",
          emprestimo: "alto",
          investimento: "alta",
        },
      ],
    },

    // 14 Agro Bank Plus
    {
      id: 14,
      nome: "Agro Bank Plus",
      cor: "linear-gradient(90deg, #003816, #4CAF50)",
      icone: "🌱",
      descricao: "Versão avançada do Agro Bank, com mais crédito e benefícios.",
      cartoes: [
        {
          id: 1401,
          nome: "Agro Plus Basic",
          design: "card-classico",
          cor1: "#003816",
          cor2: "#1A5E2A",
          cor3: "#0C9123",
          cor4: "#4CAF50",
          numeroCard: "7777 **** **** 8888",
          cashback: "especifico",
          juros: "baixo",
          emprestimo: "alto",
          investimento: "media",
        },
        {
          id: 1402,
          nome: "Agro Plus Premium",
          design: "wave-patterns",
          cor1: "#002C10",
          cor2: "#1A5E2A",
          cor3: "#0C9123",
          cor4: "#4CAF50",
          numeroCard: "9999 **** **** 0000",
          cashback: "todos",
          juros: "baixo",
          emprestimo: "alto",
          investimento: "media",
        },
        {
          id: 1403,
          nome: "Agro Plus Ultra",
          design: "geometric-chaos",
          cor1: "#001A0C",
          cor2: "#1A5E2A",
          cor3: "#0C9123",
          cor4: "#4CAF50",
          numeroCard: "1212 **** **** 3434",
          cashback: "todos",
          juros: "baixo",
          emprestimo: "alto",
          investimento: "alta",
        },
      ],
    },

    // 15 Tech Future
    {
      id: 15,
      nome: "Tech Future",
      cor: "linear-gradient(90deg, #FF6F00, #FF8C42)",
      icone: "💻",
      descricao: "Banco digital focado em tecnologia e inovação futura.",
      cartoes: [
        {
          id: 1501,
          nome: "Tech Basic",
          design: "card-moderno",
          cor1: "#FF6F00",
          cor2: "#FF7F33",
          cor3: "#FF914D",
          cor4: "#FF8C42",
          numeroCard: "1313 **** **** 2424",
          cashback: "especifico",
          juros: "baixo",
          emprestimo: "baixo",
          investimento: "media",
        },
        {
          id: 1502,
          nome: "Tech Premium",
          design: "wave-patterns",
          cor1: "#FF5A00",
          cor2: "#FF7F33",
          cor3: "#FF914D",
          cor4: "#FF8C42",
          numeroCard: "3535 **** **** 4646",
          cashback: "especifico",
          juros: "medio",
          emprestimo: "medio",
          investimento: "media",
        },
        {
          id: 1503,
          nome: "Tech Ultra",
          design: "geometric-chaos",
          cor1: "#FF4400",
          cor2: "#FF7F33",
          cor3: "#FF914D",
          cor4: "#FF8C42",
          numeroCard: "5757 **** **** 6868",
          cashback: "todos",
          juros: "baixo",
          emprestimo: "alto",
          investimento: "alta",
        },
      ],
    },
  ];

  function processarBanco(banco, config) {
    if (!banco || !banco.cartoes) return banco;

    const range = (chave, tabela) => {
      const valores = banco.cartoes.map((c) => tabela[c[chave]]);
      return [Math.min(...valores), Math.max(...valores)];
    };

    return {
      ...banco,
      cashbackValor: range(
        "cashback",
        Object.fromEntries(
          Object.entries(config.cashback).map(([k, v]) => [k, v.valor])
        )
      ),
      jurosValor: range("juros", config.juros),
      emprestimoMult: range(
        "emprestimo",
        Object.fromEntries(
          Object.entries(config.emprestimos).map(([k, v]) => [k, v.mult])
        )
      ),
      investimentoPos: range("investimento", config.investimentos.pos),
      investimentoPre: [
        Math.min(
          ...banco.cartoes.map((c) => {
            const arr = config.investimentos.pre[c.investimento];
            if (!arr) {
              console.warn(
                "Investimento não encontrado:",
                c.investimento,
                "no banco:",
                banco.nome
              );
              return Infinity; // evita quebrar o Math.min
            }
            return arr[0]?.valor ?? Infinity;
          })
        ),
        Math.max(
          ...banco.cartoes.map((c) => {
            const arr = config.investimentos.pre[c.investimento];
            if (!arr) {
              console.warn(
                "Investimento não encontrado:",
                c.investimento,
                "no banco:",
                banco.nome
              );
              return -Infinity; // evita quebrar o Math.max
            }
            return arr[2]?.valor ?? -Infinity;
          })
        ),
      ],
    };
  }

  const bancoSelecionadoRaw = bancos.find((b) => b.id === selectedBank);
  const bancoSelecionado = bancoSelecionadoRaw
    ? processarBanco(bancoSelecionadoRaw, config)
    : null;

  const tooltipStyle = {
    backgroundColor: "#FFFFFF",
    color: "#350973",
    border: "1px solid #350973",
    borderRadius: "6px",
    padding: "6px 10px",
    fontWeight: "600",
    fontSize: "14px",
  };

  function calcularRangeBanco(banco, config) {
    const range = (chave, tabela) => {
      const valores = banco.cartoes.map((c) => tabela[c[chave]]);
      return [Math.min(...valores), Math.max(...valores)];
    };

    return {
      cashback: range(
        "cashback",
        Object.fromEntries(
          Object.entries(config.cashback).map(([k, v]) => [k, v.valor])
        )
      ),
      juros: range("juros", config.juros),
      emprestimos: range(
        "emprestimo",
        Object.fromEntries(
          Object.entries(config.emprestimos).map(([k, v]) => [k, v.mult])
        )
      ),
      investimentosPos: range("investimento", config.investimentos.pos),
      // Pré-fixado: aqui dá pra mostrar o range do menor até o maior conjunto
      investimentosPre: [
        config.investimentos.pre[banco.cartoes[0].investimento][0].valor,
        config.investimentos.pre[
          banco.cartoes[banco.cartoes.length - 1].investimento
        ][2].valor,
      ],
    };
  }

  if (banksModal === true) {
    // Banco selecionado
    const bancoSelecionado = bancos.find((b) => b.id === selectedBank);

    return (
      <div className="h-full  bg-gradient-to-br from-[#6A00FF] via-[#350973] via-[#C79FFF] to-[#7317F3] text-white w-full flex flex-col justify-between rounded-[20px]">
        {/* Header */}
        <div className="h-[50px] w-full flex gap-[10px] pt-6 pl-6 items-center justify-center">
          <div>
            <Tooltip style={tooltipStyle} id={`tooltip-faturado`} />
            <button
              onClick={() => setBanksModal(false)}
              data-tooltip-id="tooltip-faturado"
              data-tooltip-html="Voltar"
              className="h-full w-[50px] aspect-square rounded-[10px] flex items-center justify-center hover:scale-[1.10] duration-300 ease-in-out delay-[0.1s] cursor-pointer"
            >
              <img className="w-[70%]" src={backButton} />
            </button>
          </div>
          <div className="w-[calc(100%-50px)]">
            <h2 className="text-3xl font-bold ml-6 mt-4 mb-4">
              Ofertas Disponíveis
            </h2>
          </div>
        </div>
        {/* Container de cartões */}
        <div
          style={{ maxHeight: ` calc(80vh - 50px` }}
        className={`flex-1 overflow-y-auto px-6  scrollbar-custom`}
      >
          <div className="w-full grid pt-[10px] gap-6 pb-6">
            <ModalBank
              banco={bancoSelecionado} // passa o banco selecionado
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
            />
          </div>
        </div>

     
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-[#6A00FF] via-[#350973] via-[#C79FFF] to-[#7317F3] text-white flex flex-col justify-between rounded-[20px]">
      {/* Título fixo */}
      {/* <ListaContratos /> */}

      {/* Container com scroll interno */}
      <div className="h-[50px] w-full flex gap-[10px] pt-6 pl-6 items-center justify-center">
        <div>
          <Tooltip style={tooltipStyle} id={`tooltip-faturado`} />
          <button
            onClick={() => setVision("mapa")}
            data-tooltip-id="tooltip-faturado"
            data-tooltip-html="Voltar"
            className="h-full w-[50px] aspect-square rounded-[10px] flex items-center justify-center hover:scale-[1.10] duration-300 ease-in-out delay-[0.1s] cursor-pointer"
            >
            <img className="w-[70%]" src={backButton} />
          </button>
        </div>
        <div className="w-[calc(100%-50px)] flex items-center justify-between">
          <h2 className="text-3xl font-bold ml-6 mt-4 mb-4">
            Bancos Disponíveis
          </h2>
      <ListaContratosAtivos/>
        </div>
      </div>
      <div
          style={{ maxHeight: ` calc(${valueMaxH}vh - 50px` }}
          className={`flex-1 overflow-y-auto px-6  scrollbar-custom`}
          >
        {/* <div className={`flex-1 overflow-y-auto px-6 max-h-[${60}] scrollbar-custom`}> */}
        <div className="max-w-6xl mx-auto grid pt-[10px] gap-6 md:grid-cols-2 lg:grid-cols-3  pb-6">
          {bancos.map((bancoRaw) => {
            const banco = processarBanco(bancoRaw, config);

            return (
              <div
                key={banco.id}
                style={{ background: banco.cor }}
                className="rounded-2xl p-6 border border-slate-700 hover:border-slate-500 transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => {
                  setBanksModal(true);
                  setSelectedBank(banco.id);
                }}
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{banco.icone}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {banco.nome}
                    </h2>
                    <p className="text-slate-200 text-sm">{banco.descricao}</p>
                  </div>
                </div>

                {/* Infos rápidas */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-300">Cashback</p>
                    <p className="text-lg font-bold text-green-300">
                      {banco.cashbackValor[0]}% - {banco.cashbackValor[1]}%{" "}
                      {banco.cartoes.some((c) => c.cashback === "especifico") &&
                        `(específico)`}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-300">Juros</p>
                    <p className="text-lg font-bold text-red-300">
                      {banco.jurosValor[0]}% - {banco.jurosValor[1]}% a.m
                    </p>
                  </div>
                </div>

                {/* Crédito */}
                <div>
                  <p className="text-xs text-slate-300">Limite de Crédito</p>
                  <p className="text-lg font-bold text-blue-300">
                    x{banco.emprestimoMult[0]} - x{banco.emprestimoMult[1]}{" "}
                    patrimônio
                  </p>
                </div>

                {/* Investimentos */}
                <div className="mt-4">
                  <p className="text-xs text-slate-300 mb-1">
                    Investimento Pós-fixado
                  </p>
                  <p className="text-sm">
                    Rentabilidade: {banco.investimentoPos[0]}% -{" "}
                    {banco.investimentoPos[1]}% a.m
                  </p>

                  <p className="text-xs text-slate-300 mt-2 mb-1">
                    Investimento Pré-fixado
                  </p>
                  <p className="text-sm">
                    {banco.investimentoPre[0]}% - {banco.investimentoPre[1]}%
                    a.m
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BankSelection;
