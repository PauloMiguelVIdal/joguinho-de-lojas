import { Sidebar } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

import { CentraldeDadosContext } from "../centralDeDadosContext";

import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import EconomyGlobal from "./EconomyGlobal";
import BankInterface from "./BankInterface";
import LoanCarousel from "./LoanCarousel";
const SidebarCards = ({ banco, cartao, setor }) => {
  const { dados, atualizarDados, atualizarDadosProf } = useContext(
    CentraldeDadosContext
  );
  const { economiaSetores, setEconomiaSetores, atualizarEco } = useContext(
    DadosEconomyGlobalContext
  );

  const contratos = economiaSetores?.contratosBancos || [];

  const getSlotsLiberados = () => {
    const porteEmpresa = economiaSetores.porteEmpresa || [];

    // 7º nível (índice 6) - Corporação Multissetorial
    const corporacaoMulti = porteEmpresa[6]?.status || false;

    // 4º nível (índice 3) - Companhia Local
    const companiaLocal = porteEmpresa[3]?.status || false;

    if (corporacaoMulti) return 3; // 3 slots
    if (companiaLocal) return 2; // 2 slots
    return 1; // 1 slot inicial
  };

  const slotsLiberados = getSlotsLiberados();

  const [selectedCard, setSelectedCard] = useState(null);

  const setVision = (newVision) => {
    atualizarDados("vision", {
      ...dados.vision,
      visionAtual: newVision,
    });
  };

  const testeId = (id) => {
    const indice = economiaSetores.contratosBancos.findIndex(
      (c) => c.cartaoId === id
    );
    atualizarEco("idContrato", indice);
    return indice;
  };

  const abrirInterfaceBanco = (cartaoId) => {
    const indice = contratos.findIndex((c) => c?.cartaoId === cartaoId);
    if (indice !== -1) {
      atualizarEco("idContrato", indice); // Define contrato ativo
      setVision("bankInterface"); // Abre interface
    }
  };

  //    const limite = parseInt(cartao.limiteEmprestimo);
  //         const usado = parseInt(cartao.limiteUsado);
  const limite = parseInt(40000);
  const usado = parseInt(6000);
  const percentualUsado = Math.round((usado / limite) * 100);

  const contrato1 = economiaSetores.contratosBancos[0];
  const contrato2 = economiaSetores.contratosBancos[1];
  const contrato3 = economiaSetores.contratosBancos[2];

  const SlotVazio = ({ index }) => (
    <div
      onClick={() => setVision("bank")}
      className="w-[280px] h-[160px] rounded-3xl bg-gradient-to-br from-gray-700/30 to-gray-800/30 border-2 border-dashed border-gray-500/50 backdrop-blur-sm relative overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 group"
    >
      {/* Conteúdo do slot vazio */}
    </div>
  );

  const SlotBloqueado = ({ index }) => {
    const porteNecessario =
      index === 1 ? "Companhia Local" : "Corporação Multissetorial";

    return (
      <div className="w-[280px] h-[160px] rounded-3xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-2 border-gray-700/50 backdrop-blur-sm relative overflow-hidden">
        {/* Conteúdo do slot bloqueado */}
      </div>
    );
  };

  const GeometricChaosCard = ({ cartao }) => (
    <div
      className="w-[280px] h-[160px] rounded-3xl text-white relative overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 cursor-pointer hover:animate-rainbow-shift"
      style={{
        background: `linear-gradient(45deg, ${cartao.cor1} 0%, ${cartao.cor2} 25%, ${cartao.cor3} 50%, ${cartao.cor4} 75%, ${cartao.cor1} 100%)`,
      }}
      onClick={() => {
        setSelectedCard(cartao.id);
        abrirInterfaceBanco(cartao.id);
        console.log("Cartão selecionado:", cartao.id);
      }}
    >
      {/* Losangos e retângulos com pulse */}
      <div className="absolute inset-0">
        <div
          className="absolute top-3 left-3 w-6 h-6 transform rotate-45 hover:animate-geometric-pulse"
          style={{ backgroundColor: cartao.cor4, opacity: 0.2 }}
        ></div>
        <div
          className="absolute bottom-3 right-3 w-6 h-12 transform -rotate-12 hover:animate-geometric-pulse"
          style={{ backgroundColor: cartao.cor2, opacity: 0.3 }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rotate-45 border-4 hover:animate-geometric-pulse"
          style={{ borderColor: cartao.cor4, opacity: 0.2 }}
        ></div>
      </div>

      <div className="p-4 relative z-10">
        <div
          className="absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-black"
          style={{
            backgroundColor: "rgba(255,255,255,0.9)",
            color: cartao.cor1,
          }}
        >
          {cartao.banco}
        </div>

        <div className="w-10 h-6 bg-gradient-to-br from-white to-gray-200 rounded-lg mt-2 mb-4 relative shadow-lg">
          <div className="absolute inset-1 bg-gradient-to-br from-yellow-400 to-orange-500 rounded opacity-80 hover:animate-geometric-pulse"></div>
          <div className="absolute inset-2 bg-gray-800 rounded"></div>
        </div>

        <div className="text-base font-mono tracking-widest mb-4 text-shadow-lg">
          {cartao.numeroCard}
        </div>

        <div className="flex justify-between items-end text-[11px]">
          <div>
            <div className="opacity-90 mb-1">EMPRESA</div>
            <div className="font-bold">{dados.inicioGame.nomeEmpresa}</div>
          </div>
          <div className="text-right">
            <div className="opacity-75 mb-1">VÁLIDO</div>
            <div className="font-medium">{cartao.validade}</div>
          </div>
        </div>
      </div>

      {selectedCard === cartao.id && (
        <div className="absolute inset-0 border-2 border-white rounded-3xl animate-pulse"></div>
      )}
    </div>
  );

  // As outras variantes seguem o mesmo padrão:
  const TriangularFusionCard = ({ cartao }) => (
    <div
      className="w-[280px] h-[160px] rounded-3xl text-white relative overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 cursor-pointer hover:animate-rainbow-shift"
      style={{
        background: `conic-gradient(from 0deg, ${cartao.cor1}, ${cartao.cor2}, ${cartao.cor3}, ${cartao.cor4}, ${cartao.cor1})`,
      }}
      onClick={() => {
        setSelectedCard(cartao.id);
        abrirInterfaceBanco(cartao.id);
        console.log("Cartão selecionado:", cartao.id);
      }}
    >
      <div className="absolute inset-0">
        <div
          className="absolute top-3 left-3 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[25px] border-transparent hover:animate-geometric-pulse"
          style={{ borderBottomColor: cartao.cor4, opacity: 0.3 }}
        ></div>
        <div
          className="absolute bottom-3 right-3 w-0 h-0 border-l-[18px] border-r-[18px] border-t-[30px] border-transparent rotate-180 hover:animate-geometric-pulse"
          style={{ borderTopColor: cartao.cor1, opacity: 0.4 }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rotate-45 border-4 hover:animate-geometric-pulse"
          style={{ borderColor: cartao.cor4, opacity: 0.2 }}
        ></div>
      </div>

      <div className="p-4 relative z-10">
        <div
          className="absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-black"
          style={{
            backgroundColor: "rgba(255,255,255,0.9)",
            color: cartao.cor1,
          }}
        >
          {cartao.banco}
        </div>

        <div className="w-10 h-6 bg-gradient-to-br from-white to-gray-200 rounded-lg mt-2 mb-4 relative shadow-lg hover:animate-geometric-pulse">
          <div className="absolute inset-1 bg-gradient-to-br from-yellow-400 to-orange-500 rounded opacity-80"></div>
          <div className="absolute inset-2 bg-gray-800 rounded"></div>
        </div>

        <div className="text-base font-mono tracking-widest mb-4 text-shadow-lg">
          {cartao.numeroCard}
        </div>

        <div className="flex justify-between items-end text-[11px]">
          <div>
            <div className="opacity-90 mb-1">EMPRESA</div>
            <div className="font-bold">{dados.inicioGame.nomeEmpresa}</div>
          </div>
          <div className="text-right">
            <div className="opacity-75 mb-1">VÁLIDO</div>
            <div className="font-medium">{cartao.validade}</div>
          </div>
        </div>
      </div>

      {selectedCard === cartao.id && (
        <div className="absolute inset-0 border-2 border-white rounded-3xl animate-pulse"></div>
      )}
    </div>
  );

  // =======================
  // Card Clássico
  // =======================
  const CardClassico = ({ cartao }) => (
    <div
      className="w-[280px] h-[160px] rounded-3xl p-4 text-white relative overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer hover:animate-rainbow-shift"
      style={{
        background: `linear-gradient(135deg, ${cartao.cor1} 0%, ${cartao.cor2} 50%, ${cartao.cor3} 100%)`,
      }}
      onClick={() => {
        setSelectedCard(cartao.id);
        abrirInterfaceBanco(cartao.id);
        console.log("Cartão selecionado:", cartao.id);
      }}
    >
      {/* Formas geométricas */}
      <div className="absolute inset-0">
        <div
          className="absolute -top-6 -right-6 w-20 h-20 rotate-45 hover:animate-geometric-pulse"
          style={{ backgroundColor: cartao.cor4, opacity: 0.1 }}
        ></div>
        <div
          className="absolute top-10 -left-6 w-14 h-14 rounded-full hover:animate-geometric-pulse"
          style={{ backgroundColor: cartao.cor3, opacity: 0.15 }}
        ></div>
      </div>

      {/* Logo do banco */}
      <div
        className="absolute top-3 right-3 px-2 py-1 rounded-lg text-[10px] font-bold"
        style={{
          backgroundColor: cartao.cor4,
          color: cartao.cor1,
          opacity: 0.9,
        }}
      >
        {cartao.banco}
      </div>

      {/* Chip */}
      <div className="w-10 h-6 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg mt-2 mb-4 relative shadow-lg">
        <div className="absolute inset-2 bg-black bg-opacity-20 rounded"></div>
      </div>

      {/* Número do cartão */}
      <div className="text-lg font-mono tracking-widest mb-4">
        {cartao.numeroCard}
      </div>

      {/* Info */}
      <div className="flex justify-between items-end text-xs">
        <div>
          <div className="opacity-75 mb-1">EMPRESA</div>
          <div className="font-medium">{dados.inicioGame.nomeEmpresa}</div>
        </div>
        <div className="text-right">
          <div className="opacity-75 mb-1">VÁLIDO</div>
          <div className="font-medium">{cartao.validade}</div>
        </div>
      </div>

      {selectedCard === cartao.id && (
        <div className="absolute inset-0 border-4 border-white rounded-3xl animate-pulse"></div>
      )}
    </div>
  );

  // =======================
  // Card Moderno
  // =======================
  const CardModerno = ({ cartao }) => (
    <div
      className="w-[280px] h-[160px] rounded-xl text-white relative overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer hover:animate-rainbow-shift"
      style={{
        background: `radial-gradient(circle at top right, ${cartao.cor3} 0%, ${cartao.cor2} 50%, ${cartao.cor1} 100%)`,
      }}
      onClick={() => {
        setSelectedCard(cartao.id);
        abrirInterfaceBanco(cartao.id);
        console.log("Cartão selecionado:", cartao.id);
      }}
    >
      {/* Hexágonos */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute border opacity-20 hover:animate-geometric-pulse"
            style={{
              borderColor: cartao.cor4,
              width: "22px",
              height: "22px",
              clipPath:
                "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
              left: `${15 + i * 12}%`,
              top: `${8 + (i % 2) * 18}%`,
              transform: `rotate(${i * 30}deg)`,
            }}
          ></div>
        ))}
      </div>

      <div className="p-4 relative z-10">
        {/* Logo */}
        <div
          className="absolute top-3 right-3 px-2 py-1 rounded-lg text-[10px] font-bold backdrop-blur-sm"
          style={{
            backgroundColor: `${cartao.cor4}20`,
            border: `1px solid ${cartao.cor4}40`,
            color: cartao.cor4,
          }}
        >
          {cartao.banco}
        </div>

        {/* Chip */}
        <div
          className="w-10 h-7 rounded-lg mt-2 mb-4 relative border-2"
          style={{ backgroundColor: cartao.cor3, borderColor: cartao.cor4 }}
        >
          <div
            className="absolute inset-2 rounded"
            style={{ backgroundColor: cartao.cor4, opacity: 0.8 }}
          ></div>
        </div>

        {/* Número */}
        <div
          className="text-lg font-semibold tracking-wide mb-4"
          style={{ textShadow: `1px 1px 3px ${cartao.cor1}` }}
        >
          {cartao.numeroCard}
        </div>

        {/* Footer */}
        <div
          className="border-t pt-2"
          style={{ borderColor: cartao.cor4, opacity: 0.3 }}
        >
          <div className="flex justify-between items-center text-xs">
            <div>
              <div className="opacity-70">EMPRESA</div>
              <div className="font-medium">{dados.inicioGame.nomeEmpresa}</div>
            </div>
            <div className="text-right">
              <div className="opacity-75 mb-1">VÁLIDO</div>
              <div className="font-medium">{cartao.validade}</div>
            </div>
          </div>
        </div>
      </div>

      {selectedCard === cartao.id && (
        <div className="absolute inset-0 border-4 border-white rounded-xl animate-pulse"></div>
      )}
    </div>
  );

  // =======================
  // Card Wave Patterns
  // =======================
  const WavePatternsCard = ({ cartao }) => (
    <div
      className="w-[280px] h-[160px] rounded-2xl text-white relative overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 cursor-pointer hover:animate-rainbow-shift"
      style={{
        background: `linear-gradient(135deg, ${cartao.cor1} 0%, ${cartao.cor2} 33%, ${cartao.cor3} 66%, ${cartao.cor4} 100%)`,
      }}
      onClick={() => {
        setSelectedCard(cartao.id);
        abrirInterfaceBanco(cartao.id);
        console.log("Cartão selecionado:", cartao.id);
      }}
    >
      {/* Ondas */}
      <div className="absolute inset-0 hover:animate-geometric-pulse">
        <svg className="w-full h-full opacity-20" viewBox="0 0 280 160">
          <path
            d="M0,80 Q70,50 140,80 T280,80 L280,160 L0,160 Z"
            fill={cartao.cor4}
            opacity="0.3"
          />
          <path
            d="M0,100 Q70,70 140,100 T280,100 L280,160 L0,160 Z"
            fill={cartao.cor3}
            opacity="0.2"
          />
          <path
            d="M0,120 Q70,90 140,120 T280,120 L280,160 L0,160 Z"
            fill={cartao.cor2}
            opacity="0.1"
          />
        </svg>

        <div
          className="absolute top-5 right-5 w-16 h-16 rounded-full border-4 opacity-30 hover:animate-geometric-pulse"
          style={{ borderColor: cartao.cor4 }}
        ></div>
        <div
          className="absolute bottom-6 left-6 w-10 h-10 opacity-25 hover:animate-geometric-pulse"
          style={{
            backgroundColor: cartao.cor4,
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          }}
        ></div>
      </div>

      <div className="p-4 relative z-10">
        {/* Banco */}
        <div
          className="absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-black"
          style={{
            backgroundColor: "rgba(255,255,255,0.9)",
            color: cartao.cor1,
          }}
        >
          {cartao.banco}
        </div>

        {/* Chip */}
        <div className="w-10 h-6 bg-gradient-to-br from-white to-gray-200 rounded-lg mt-2 mb-4 relative shadow-lg hover:animate-geometric-pulse">
          <div className="absolute inset-1 bg-gradient-to-br from-yellow-400 to-orange-500 rounded opacity-80"></div>
          <div className="absolute inset-2 bg-gray-800 rounded"></div>
        </div>

        {/* Número */}
        <div className="text-lg font-mono tracking-widest mb-4 text-shadow-lg">
          {cartao.numeroCard}
        </div>

        {/* Info */}
        <div className="flex justify-between items-end text-xs">
          <div>
            <div className="opacity-90 mb-1">EMPRESA</div>
            <div className="font-bold">{dados.inicioGame.nomeEmpresa}</div>
          </div>
          <div className="text-right">
            <div className="opacity-75 mb-1">VÁLIDO</div>
            <div className="font-medium">{cartao.validade}</div>
          </div>
        </div>
      </div>

      {selectedCard === cartao.id && (
        <div className="absolute inset-0 border-4 border-white rounded-2xl animate-pulse"></div>
      )}
    </div>
  );

  const renderCartao = (cartao) => {
    switch (cartao.design) {
      case "geometric-chaos":
        return <GeometricChaosCard cartao={cartao} />;
      case "triangular-fusion":
        return <TriangularFusionCard cartao={cartao} />;
      case "classico":
        return <CardClassico cartao={cartao} />;
      case "moderno":
        return <CardModerno cartao={cartao} />;
      case "wave-patterns":
        return <WavePatternsCard cartao={cartao} />;
      default:
        return <CardClassico cartao={cartao} />; // fallback
    }
  };

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

  // Função que adapta contrato para formato de "cartão"
  const contratoParaCartao = (contrato) => ({
    id: contrato.cartaoId,
    banco: contrato.bancoNome,
    design: contrato.design,
    cor1: contrato.cor1,
    cor2: contrato.cor2,
    cor3: contrato.cor3,
    cor4: contrato.cor4,
    numeroCard: contrato.cartaoNome,
    validade: contrato.dataFim ? `até ${contrato.dataFim}` : "-",
  });

  const slots = [0, 1, 2].map((index) => {
    const contrato = contratos[index];

    if (index < slotsLiberados) {
      return contrato ? (
        <div
          key={index}
          className=" rounded-3xl w-full flex items-center justify-center"
        >
          {renderCartao(contratoParaCartao(contrato))}
        </div>
      ) : (
        <div
          key={index}
          className=" rounded-3xl border w-full flex items-center justify-center"
        >
          <SlotVazio />
        
        </div>
      );
    } else {
      return (
        <div
          key={index}
          className="flex items-center  justify-center rounded-3xl w-full"
        >
          <SlotBloqueado index={index} />
        </div>
      );
    } 
  });
  return (
    <div className="h-[95vh] rounded-xl w-full flex flex-col items-center justify-around gap-4 bg-gradient-to-br from-[#350973] via-[#6411D9] to-[#6411D9]  overflow-y-auto">
    {slots}
        <LoanCarousel/>
    </div>
  );
};

export default SidebarCards;
