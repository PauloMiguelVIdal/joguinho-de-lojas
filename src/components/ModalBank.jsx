import React, { useContext, useEffect, useState } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import agricultura from "./setores/agricultura.png"
import tecnologia from "./setores/tecnologia.png"
import comercio from "./setores/comercio.png"
import industria from "./setores/industria.png"
import imobiliario from "./setores/Imobiliário.png"
import energia from "./setores/torre-eletrica.png"
import { CardModal } from "./cardsModal";
import { CardLocalization } from "./cardLocalization";
import circularEconomia from "../../public/outrasImagens/circular-economy.png"
import DolarImg from "../../public/outrasImagens/simbolo-do-dolar.png"
import licença from "../../public/outrasImagens/licença.png"
import { Localizador } from "./localizador";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";


export const ModalBank = ({ cartao, setor, selectedCard, setSelectedCard }) => {
    const { dados, atualizarDados, atualizarDadosProf } = useContext(CentraldeDadosContext);
    const { economiaSetores, setEconomiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);

    const tooltipStyle = {
        backgroundColor: "#FFFFFF",
        color: "#350973",
        border: "1px solid #350973",
        borderRadius: "6px",
        padding: "6px 10px",
        fontWeight: "600",
        fontSize: "14px",
    };

    const setorAtivo = setor

    const formatarNumero = (num) => {
        if (num >= 1e12) return (num / 1e12).toFixed(1).replace('.0', '') + 'T'; // Trilhões
        if (num >= 1e9) return (num / 1e9).toFixed(1).replace('.0', '') + 'B';   // Bilhões
        if (num >= 1e6) return (num / 1e6).toFixed(1).replace('.0', '') + 'M';   // Milhões
        if (num >= 1e3) return (num / 1e3).toFixed(1).replace('.0', '') + 'K';   // Milhares
        return num.toString();
    };


    const setores = [
        { id: "agricultura", cor3: "#0C9123", corClasse: "bg-[#4CAF50]", img: agricultura, descLicença: "Com a Licença Global de Agricultura, você terá acesso a cultivos exclusivos, otimização de produções e melhorias que aumentarão sua rentabilidade. Liberte o potencial do setor agrícola agora mesmo!", cor1: "#003816", cor2: "#1A5E2A", cor3: "#0C9123", cor4: "#4CAF50", },
        { id: "tecnologia", cor3: "#FF6F00 ", corClasse: "bg-[#FF8C42]", img: tecnologia, descLicença: "Com a Licença Global de Tecnologia, você desbloqueia inovações que podem transformar sua infraestrutura, otimizar processos e maximizar os lucros. Invista no futuro agora!", cor1: "#A64B00 ", cor2: "#D45A00 ", cor3: "#FF6F00 ", cor4: "#FF8C42 ", },
        { id: "industria", cor3: "#808080  ", corClasse: "bg-[#B3B3B3]", img: industria, descLicença: "Com a Licença Global de Indústria, você acessa fábricas avançadas e processos de produção que aceleram sua evolução e aumentam a eficiência. Não fique para trás!", cor1: "#1A1A1A ", cor2: "#4D4D4D  ", cor3: "#808080  ", cor4: "#B3B3B3  ", },
        { id: "comercio", cor3: "#E60000  ", corClasse: "bg-[#FF4D4D]", img: comercio, descLicença: "Com a Licença Global de Comércio, você tem acesso a novos mercados, estratégias de vendas e expansão que podem levar seus negócios a um novo nível. Não perca essa oportunidade!", cor1: "#660000  ", cor2: "#A31919  ", cor3: "#E60000  ", cor4: "#FF4D4D  ", },
        { id: "imobiliario", cor3: "#3333CC  ", corClasse: "bg-[#6666FF]", img: imobiliario, descLicença: "Com a Licença Global Imobiliária, você pode investir em novos terrenos, expandir suas construções e maximizar os retornos do mercado imobiliário. Abra as portas para grandes lucros!", cor1: "#000066  ", cor2: "#1A1A8C  ", cor3: "#3333CC  ", cor4: "#6666FF  " },
        { id: "energia", cor3: "#E6B800", corClasse: "bg-[#FFD966]", img: energia, descLicença: "Com a Licença Global de Energia, você ativa fontes de energia sustentáveis e de alta performance, garantindo uma operação eficiente e lucrativa. Potencialize seu setor energético agora!", cor1: "#665200   ", cor2: "#A37F19   ", cor3: "#E6B800", cor4: "#FFD966" },

    ];


    const getImageUrl = (nomeArquivo) => `/imagens/${nomeArquivo}.png`;







    const GeometricChaosCard = ({ cartao }) => (
        <div
            className="w-[350px] h-[200px] rounded-3xl text-white relative overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 cursor-pointer hover:animate-rainbow-shift"
            style={{
                background: `linear-gradient(45deg, ${cartao.cor1} 0%, ${cartao.cor2} 25%, ${cartao.cor3} 50%, ${cartao.cor4} 75%, ${cartao.cor1} 100%)`
            }}
            onClick={() => setSelectedCard(cartao.id)}
        >
            {/* Losangos e retângulos com pulse */}
            <div className="absolute inset-0">
                <div
                    className="absolute top-4 left-4 w-8 h-8 transform rotate-45 hover:animate-geometric-pulse"
                    style={{ backgroundColor: cartao.cor4, opacity: 0.2 }}
                ></div>
                <div
                    className="absolute bottom-4 right-4 w-8 h-16 transform -rotate-12 hover:animate-geometric-pulse"
                    style={{ backgroundColor: cartao.cor2, opacity: 0.3 }}
                ></div>
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rotate-45 border-4 hover:animate-geometric-pulse"
                    style={{ borderColor: cartao.cor4, opacity: 0.2 }}
                ></div>
            </div>

            <div className="p-6 relative z-10">
                <div
                    className="absolute top-4 right-4 px-3 py-2 rounded-full text-xs font-black"
                    style={{
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        color: cartao.cor1
                    }}
                >
                    {cartao.banco}
                </div>

                <div className="w-12 h-8 bg-gradient-to-br from-white to-gray-200 rounded-lg mt-4 mb-6 relative shadow-lg">
                    <div className="absolute inset-1 bg-gradient-to-br from-yellow-400 to-orange-500 rounded opacity-80 hover:animate-geometric-pulse"></div>
                    <div className="absolute inset-2 bg-gray-800 rounded"></div>
                </div>

                <div className="text-xl font-mono tracking-widest mb-6 text-shadow-lg">
                    4532 1234 5678 9000
                </div>

                <div className="flex justify-between items-end">
                    <div>
                        <div className="text-xs opacity-90 mb-1">EMPRESA</div>
                        <div className="text-sm font-bold">VANE CORP</div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs opacity-90 mb-1">TIPO</div>
                        <div className="text-sm font-bold">{cartao.tipo}</div>
                    </div>
                </div>
            </div>

            {selectedCard === cartao.id && (
                <div className="absolute inset-0 border-4 border-white rounded-3xl animate-pulse"></div>
            )}

            <style jsx>{`
      @keyframes rainbow-shift {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
      }
      
      .animate-rainbow-shift {
        animation: rainbow-shift 2s infinite;
      }

      @keyframes geometric-pulse {
        0%, 100% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.1) rotate(5deg); }
      }

      .animate-geometric-pulse {
        animation: geometric-pulse 1.5s ease-in-out infinite;
      }
    `}</style>
        </div>
    );

    const TriangularFusionCard = ({ cartao }) => (
        <div
            className="w-[350px] h-[200px] rounded-3xl text-white relative overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 cursor-pointer hover:animate-rainbow-shift"
            style={{
                background: `conic-gradient(from 0deg, ${cartao.cor1}, ${cartao.cor2}, ${cartao.cor3}, ${cartao.cor4}, ${cartao.cor1})`
            }}
            onClick={() => setSelectedCard(cartao.id)}
        >
            {/* Triângulos geométricos animados apenas no hover */}
            <div className="absolute inset-0">
                <div
                    className="absolute top-4 left-4 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[35px] border-transparent hover:animate-geometric-pulse"
                    style={{ borderBottomColor: cartao.cor4, opacity: 0.3 }}
                ></div>
                <div
                    className="absolute bottom-4 right-4 w-0 h-0 border-l-[25px] border-r-[25px] border-t-[43px] border-transparent rotate-180 hover:animate-geometric-pulse"
                    style={{ borderTopColor: cartao.cor1, opacity: 0.4 }}
                ></div>
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rotate-45 border-4 hover:animate-geometric-pulse"
                    style={{ borderColor: cartao.cor4, opacity: 0.2 }}
                ></div>
            </div>

            <div className="p-6 relative z-10">
                <div
                    className="absolute top-4 right-4 px-3 py-2 rounded-full text-xs font-black"
                    style={{
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        color: cartao.cor1
                    }}
                >
                    {cartao.banco}
                </div>

                <div className="w-12 h-8 bg-gradient-to-br from-white to-gray-200 rounded-lg mt-4 mb-6 relative shadow-lg hover:animate-geometric-pulse">
                    <div className="absolute inset-1 bg-gradient-to-br from-yellow-400 to-orange-500 rounded opacity-80"></div>
                    <div className="absolute inset-2 bg-gray-800 rounded"></div>
                </div>

                <div className="text-xl font-mono tracking-widest mb-6 text-shadow-lg">
                    4532 1234 5678 9000
                </div>

                <div className="flex justify-between items-end">
                    <div>
                        <div className="text-xs opacity-90 mb-1">EMPRESA</div>
                        <div className="text-sm font-bold">VANE CORP</div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs opacity-90 mb-1">VALIDO</div>
                        <div className="text-sm font-bold">1500</div>
                    </div>
                </div>
            </div>

            {selectedCard === cartao.id && (
                <div className="absolute inset-0 border-4 border-white rounded-3xl animate-pulse"></div>
            )}

            <style jsx>{`
      @keyframes rainbow-shift {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
      }
      .animate-rainbow-shift {
        animation: rainbow-shift 2s infinite;
      }

      @keyframes geometric-pulse {
        0%, 100% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.1) rotate(5deg); }
      }
      .animate-geometric-pulse {
        animation: geometric-pulse 1.5s ease-in-out infinite;
      }
    `}</style>
        </div>
    );

    const CardClassico = ({ cartao }) => (
        <div
            className="w-[350px] h-[200px] rounded-3xl p-6 text-white relative overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer hover:animate-rainbow-shift"
            style={{
                background: `linear-gradient(135deg, ${cartao.cor1} 0%, ${cartao.cor2} 50%, ${cartao.cor3} 100%)`
            }}
        >
            {/* Formas geométricas animadas apenas no hover */}
            <div className="absolute inset-0">
                <div
                    className="absolute -top-10 -right-10 w-32 h-32 rotate-45 hover:animate-geometric-pulse"
                    style={{ backgroundColor: cartao.cor4, opacity: 0.1 }}
                ></div>
                <div
                    className="absolute top-16 -left-8 w-20 h-20 rounded-full hover:animate-geometric-pulse"
                    style={{ backgroundColor: cartao.cor3, opacity: 0.15 }}
                ></div>
            </div>

            {/* Logo do banco */}
            <div
                className="absolute top-4 right-4 px-3 py-1 rounded-lg text-xs font-bold"
                style={{
                    backgroundColor: cartao.cor4,
                    color: cartao.cor1,
                    opacity: 0.9
                }}
            >
                {cartao.banco}
            </div>

            {/* Chip */}
            <div className="w-12 h-8 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg mt-4 mb-6 relative shadow-lg">
                <div className="absolute inset-2 bg-black bg-opacity-20 rounded"></div>
            </div>

            {/* Número do cartão */}
            <div className="text-xl font-mono tracking-widest mb-6">
                5432 **** **** 1098
            </div>

            {/* Info */}
            <div className="flex justify-between items-end">
                <div>
                    <div className="text-xs opacity-75 mb-1">PORTADOR</div>
                    <div className="text-sm font-medium">VANE CORP</div>
                </div>
                <div className="text-right">
                    <div className="text-xs opacity-75 mb-1">VÁLIDO</div>
                    <div className="text-sm font-medium">12/28</div>
                </div>
            </div>

            <style jsx>{`
      @keyframes rainbow-shift {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
      }
      .animate-rainbow-shift { animation: rainbow-shift 2s infinite; }

      @keyframes geometric-pulse {
        0%, 100% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.1) rotate(5deg); }
      }
      .hover\\:animate-geometric-pulse:hover { animation: geometric-pulse 1.5s ease-in-out infinite; }
    `}</style>
        </div>
    );

    const CardModerno = ({ cartao }) => (
        <div
            className="w-[350px] h-[200px] rounded-xl text-white relative overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer hover:animate-rainbow-shift"
            style={{
                background: `radial-gradient(circle at top right, ${cartao.cor3} 0%, ${cartao.cor2} 50%, ${cartao.cor1} 100%)`
            }}
        >
            {/* Hexágonos animados apenas no hover */}
            <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute border opacity-20 hover:animate-geometric-pulse"
                        style={{
                            borderColor: cartao.cor4,
                            width: '30px',
                            height: '30px',
                            clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                            left: `${20 + i * 15}%`,
                            top: `${10 + (i % 2) * 20}%`,
                            transform: `rotate(${i * 30}deg)`
                        }}
                    ></div>
                ))}
            </div>

            <div className="p-6 relative z-10">
                {/* Logo com efeito glass */}
                <div
                    className="absolute top-4 right-4 px-3 py-2 rounded-lg text-xs font-bold backdrop-blur-sm"
                    style={{
                        backgroundColor: `${cartao.cor4}20`,
                        border: `1px solid ${cartao.cor4}40`,
                        color: cartao.cor4
                    }}
                >
                    {cartao.banco}
                </div>

                {/* Chip com borda */}
                <div
                    className="w-12 h-9 rounded-lg mt-4 mb-6 relative border-2"
                    style={{
                        backgroundColor: cartao.cor3,
                        borderColor: cartao.cor4
                    }}
                >
                    <div className="absolute inset-2 rounded" style={{ backgroundColor: cartao.cor4, opacity: 0.8 }}></div>
                </div>

                {/* Número estilizado */}
                <div
                    className="text-xl font-semibold tracking-wide mb-6"
                    style={{ textShadow: `2px 2px 4px ${cartao.cor1}` }}
                >
                    5432 **** **** 1098
                </div>

                {/* Footer com divisor */}
                <div className="border-t pt-3" style={{ borderColor: cartao.cor4, opacity: 0.3 }}>
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-xs opacity-70">EMPRESA</div>
                            <div className="text-sm font-medium">VANE CORP</div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs opacity-70">EXP</div>
                            <div className="text-sm font-medium">1500</div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
      @keyframes rainbow-shift {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
      }
      .animate-rainbow-shift { animation: rainbow-shift 2s infinite; }

      @keyframes geometric-pulse {
        0%, 100% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.05) rotate(3deg); }
      }
      .hover\\:animate-geometric-pulse:hover { animation: geometric-pulse 1.5s ease-in-out infinite; }
    `}</style>
        </div>
    );

    const WavePatternsCard = ({ cartao }) => (
        <div
            className="w-[350px] h-[200px] rounded-3xl text-white relative overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 cursor-pointer hover:animate-rainbow-shift"
            style={{
                background: `linear-gradient(135deg, ${cartao.cor1} 0%, ${cartao.cor2} 33%, ${cartao.cor3} 66%, ${cartao.cor4} 100%)`
            }}
            onClick={() => setSelectedCard(cartao.id)}
        >
            {/* Pattern de ondas geométricas animadas apenas no hover */}
            <div className="absolute inset-0 hover:animate-geometric-pulse">
                <svg className="w-full h-full opacity-20" viewBox="0 0 350 200">
                    <path d="M0,100 Q87.5,60 175,100 T350,100 L350,200 L0,200 Z" fill={cartao.cor4} opacity="0.3" />
                    <path d="M0,120 Q87.5,80 175,120 T350,120 L350,200 L0,200 Z" fill={cartao.cor3} opacity="0.2" />
                    <path d="M0,140 Q87.5,100 175,140 T350,140 L350,200 L0,200 Z" fill={cartao.cor2} opacity="0.1" />
                </svg>

                <div
                    className="absolute top-6 right-6 w-20 h-20 rounded-full border-4 opacity-30 hover:animate-geometric-pulse"
                    style={{ borderColor: cartao.cor4 }}
                ></div>
                <div
                    className="absolute bottom-8 left-8 w-12 h-12 opacity-25 hover:animate-geometric-pulse"
                    style={{
                        backgroundColor: cartao.cor4,
                        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                    }}
                ></div>
            </div>

            <div className="p-6 relative z-10">
                <div
                    className="absolute top-4 right-4 px-3 py-2 rounded-full text-xs font-black"
                    style={{
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        color: cartao.cor1
                    }}
                >
                    {cartao.banco}
                </div>

                <div className="w-12 h-8 bg-gradient-to-br from-white to-gray-200 rounded-lg mt-4 mb-6 relative shadow-lg hover:animate-geometric-pulse">
                    <div className="absolute inset-1 bg-gradient-to-br from-yellow-400 to-orange-500 rounded opacity-80"></div>
                    <div className="absolute inset-2 bg-gray-800 rounded"></div>
                </div>

                <div className="text-xl font-mono tracking-widest mb-6 text-shadow-lg">
                    4532 1234 5678 9000
                </div>

                <div className="flex justify-between items-end">
                    <div>
                        <div className="text-xs opacity-90 mb-1">EMPRESA</div>
                        <div className="text-sm font-bold">VANE CORP</div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs opacity-90 mb-1">VALID</div>
                        <div className="text-sm font-bold">1500</div>
                    </div>
                </div>
            </div>

            {selectedCard === cartao.id && (
                <div className="absolute inset-0 border-4 border-white rounded-3xl animate-pulse"></div>
            )}

            <style jsx>{`
      @keyframes rainbow-shift {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
      }
      .animate-rainbow-shift {
        animation: rainbow-shift 2s infinite;
      }

      @keyframes geometric-pulse {
        0%, 100% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.1) rotate(5deg); }
      }
      .animate-geometric-pulse {
        animation: geometric-pulse 1.5s ease-in-out infinite;
      }
    `}</style>
        </div>
    );



    const renderCard = (cartao) => {
        switch (cartao.design) {
            case 'geometric-chaos':
                return <GeometricChaosCard cartao={cartao} />;
            case 'triangular-fusion':
                return <TriangularFusionCard cartao={cartao} />;
            case 'wave-patterns':
                return <WavePatternsCard cartao={cartao} />;
            case 'card-moderno':
                return <CardModerno cartao={cartao} />;
            case 'card-classico':
                return <CardClassico cartao={cartao} />;
            default:
                return <GeometricChaosCard cartao={cartao} />;
        }
    };

    return (
        <div      style={{
                                background: `linear-gradient(135deg, ${cartao.cor4} 0%, #6A00FF 50%, ${cartao.cor3} 100%)`
                            }} className="h-full w-full rounded-[10px] bg-gradient-to-br from-[#6A00FF] via-[#350973] via-[#C79FFF] to-[#7317F3] flex flex-col">
            {/* Container com scroll interno */}
            <div className="flex-1 overflow-hidden">
                <div className="h-full w-full p-6">
                    {/* Scroll só nos cartões */}
                    <div className="flex flex-col space-y-8 h-full w-full overflow-y-auto pr-2">

                        <div
                            key={cartao.id}
                            className="rounded-3xl p-6 w-full"
                            style={{
                                background: `linear-gradient(135deg, ${cartao.cor1} 0%, ${cartao.cor2} 50%, ${cartao.cor3} 100%)`
                            }}
                        >
                            {/* Coluna esquerda */}
                            <div className="flex gap-6 w-full">
                                <div className="flex-shrink-0 space-y-4">
                                    {renderCard(cartao)}

                                    <div className="space-y-3 w-[350px]">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="rounded-lg p-3 text-center bg-white/10 backdrop-blur-sm border border-white/20">
                                                <div className="text-xs text-gray-300 mb-1">Limite Empréstimo</div>
                                                <div className="text-sm font-bold text-white">R$ {cartao.limiteEmprestimo}</div>
                                            </div>

                                            <div className="rounded-lg p-3 text-center bg-white/10 backdrop-blur-sm border border-white/20">
                                                <div className="text-xs text-gray-300 mb-1">Limite Investimento</div>
                                                <div className="text-sm font-bold text-white">R$ {cartao.limiteInvestimento}</div>
                                            </div>
                                        </div>

                                        <div className="rounded-lg p-3 bg-white/10 backdrop-blur-sm border border-white/20">
                                            <div className="text-xs text-gray-300 mb-2">Setores atingidos pelo cashback:</div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg">🌱</span>
                                                <span className="text-sm text-white">Agricultura</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Coluna direita */}
                                <div className="flex-1 w-full">
                                    <div className="rounded-2xl p-6 h-full w-full bg-white/10 backdrop-blur-sm border border-white/20">

                                        <div className="mb-6">
                                            <h3 className="text-2xl font-bold text-white">
                                                {cartao.nome} - {cartao.nome.toUpperCase()}
                                            </h3>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="space-y-4">
                                                <div className="rounded-lg p-4 bg-white/10 backdrop-blur-sm border border-white/20">
                                                    <div className="text-xs text-gray-300 mb-1">Crédito Agricultura</div>
                                                    <div className="text-base font-semibold text-white">{cartao.credito}x patrimônio</div>
                                                </div>

                                                <div className="rounded-lg p-4 bg-white/10 backdrop-blur-sm border border-white/20">
                                                    <div className="text-xs text-gray-300 mb-1">Cashback</div>
                                                    <div className="text-base font-semibold text-green-400">{cartao.cashback}</div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="rounded-lg p-4 bg-white/10 backdrop-blur-sm border border-white/20">
                                                    <div className="text-xs text-gray-300 mb-1">Juros Empréstimo</div>
                                                    <div className="text-base font-semibold text-yellow-400">{cartao.taxaJurosEmprestimo} a.a</div>
                                                </div>

                                                <div className="rounded-lg p-4 bg-white/10 backdrop-blur-sm border border-white/20">
                                                    <div className="text-xs text-gray-300 mb-1">Rentabilidade Investimento</div>
                                                    <div className="text-base font-semibold text-blue-400">{cartao.rentabilidadeInvestimento} a.a</div>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            style={{
                                                background: `linear-gradient(45deg, ${cartao.cor3} 0%, ${cartao.cor2} 25%, ${cartao.cor1} 50%, ${cartao.cor2} 75%, ${cartao.cor3} 100%)`
                                            }}
                                            className={`w-full py-3 rounded-lg font-bold text-white transition-all duration-300 hover:scale-105 
            `}
                                            onClick={() => setSelectedCard(cartao.id)}
                                        >
                                            Selecionar {cartao.banco} {cartao.nome.split(' ')[1]}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </div>

            {/* Modal de seleção */}
            {selectedCard && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4">
                        <h3 className="text-2xl font-bold text-white mb-4">Confirmar Seleção</h3>
                        <p className="text-slate-300 mb-4">Tem certeza que deseja escolher este cartão?</p>
                        <div className="flex justify-end gap-3">
                            <button
                                className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700"
                                onClick={() => setSelectedCard(null)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                                onClick={() => handleConfirmarSelecao(selectedCard)}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );



}