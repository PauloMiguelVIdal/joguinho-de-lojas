import React, { useContext, useState } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";

export const ModalBank = ({ banco }) => {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext);
    const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);

    const [selectedCard, setSelectedCard] = useState(null);
    const [relationshipDays, setRelationshipDays] = useState(90);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const setVision = (newVision) => {
        atualizarDados("vision", {
            ...dados.vision, visionAtual: newVision
        });
    };

    const config = {
        cashback: {
            nenhum: { valor: 0 },
            todos: { valor: 2 },
            especifico: { valor: 5 }
        },
        juros: {
            baixo: 2,
            medio: 3,
            alto: 4
        },
        emprestimos: {
            baixo: { mult: 1 },
            medio: { mult: 2 },
            alto: { mult: 3 }
        },
        investimentos: {
            pos: {
                baixa: 1,
                media: 3,
                alta: 5
            },
            pre: {
                baixa: [
                    { prazo: 90, valor: 0.5 },
                    { prazo: 180, valor: 0.7 },
                    { prazo: 360, valor: 1.0 }
                ],
                media: [
                    { prazo: 90, valor: 0.7 },
                    { prazo: 180, valor: 1.0 },
                    { prazo: 360, valor: 1.5 }
                ],
                alta: [
                    { prazo: 90, valor: 1.5 },
                    { prazo: 180, valor: 2.0 },
                    { prazo: 360, valor: 2.5 }
                ]
            }
        }
    };

const patrimonio = economiaSetores.patrimonio || 0;

  const calcularLimiteEmprestimo = (contrato) => {
    if (!contrato) return 0;
    const multiplicador = config.emprestimos[contrato.emprestimo]?.mult || 1;
    console.log((config.emprestimos[contrato.emprestimo].mult * patrimonio));
    return patrimonio * multiplicador;
  };

//   const limiteEmprestimo = config.emprestimos[cartao.emprestimo].mult * patrimonio;

    const salvarContrato = (novoContrato) => {
        let contratosAtuais = economiaSetores.contratosBancos;

        if (contratosAtuais && contratosAtuais.contratosBancos) {
            contratosAtuais = contratosAtuais.contratosBancos;
        }

        if (!Array.isArray(contratosAtuais)) {
            contratosAtuais = [];
        }

        const novosContratos = [...contratosAtuais, novoContrato];
        atualizarEco("contratosBancos", novosContratos);
    };

    const handleConfirmarSelecao = () => {
        const cartaoSelecionado = banco.cartoes.find(c => c.id === selectedCard);

        const contrato = {
            bancoId: banco.id,
            bancoNome: banco.nome,
            bancoCor: banco.cor,
            design: cartaoSelecionado.design,
            cor1: cartaoSelecionado.cor1,
            cor2: cartaoSelecionado.cor2,
            cor3: cartaoSelecionado.cor3,
            cor4: cartaoSelecionado.cor4,
            cartaoId: cartaoSelecionado.id,
            cartaoNome: cartaoSelecionado.nome,
            numeroCard: cartaoSelecionado.numeroCard,
            relacionamento: relationshipDays,
            juros: cartaoSelecionado.juros,
            emprestimo: cartaoSelecionado.emprestimo,
            investimento: cartaoSelecionado.investimento,
            limiteEmprestimo: config.emprestimos[cartaoSelecionado.emprestimo].mult * patrimonio,
            cashback: {
                tipo: cartaoSelecionado.cashback,
                setor: cartaoSelecionado.setorCashback || null
            },
            dataInicio: dados.dia,
            dataFim: dados.dia + relationshipDays
        };

        console.log("Contrato criado:", contrato);
        console.log("Design selecionado:", cartaoSelecionado.design);

        salvarContrato(contrato);
        setVision("bankInterface");
    };

    // Componentes visuais dos cartões (mantidos do seu código original)
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
                    {cartao.numeroCard}
                </div>

                <div className="flex justify-between items-end">
                    <div>
                        <div className="text-xs opacity-90 mb-1">EMPRESA</div>
                        <div className="text-sm font-bold">{dados.inicioGame.nomeEmpresa}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs opacity-75 mb-1">VÁLIDO</div>
                        <div className="text-sm font-medium">{cartao.validade}</div>
                    </div>
                </div>
            </div>

            {selectedCard === cartao.id && (
                <div className="absolute inset-0 border-4 border-white rounded-3xl animate-pulse"></div>
            )}

            <style >{`
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
                    {cartao.numeroCard}
                </div>

                <div className="flex justify-between items-end">
                    <div>
                        <div className="text-xs opacity-90 mb-1">EMPRESA</div>
                        <div className="text-sm font-bold">{dados.inicioGame.nomeEmpresa}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs opacity-75 mb-1">VÁLIDO</div>
                        <div className="text-sm font-medium">{cartao.validade}</div>
                    </div>
                </div>
            </div>

            {selectedCard === cartao.id && (
                <div className="absolute inset-0 border-4 border-white rounded-3xl animate-pulse"></div>
            )}

            <style >{`
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
                {cartao.numeroCard}
            </div>

            {/* Info */}
            <div className="flex justify-between items-end">
                <div>
                    <div className="text-xs opacity-75 mb-1">EMPRESA</div>
                    <div className="text-sm font-medium">{dados.inicioGame.nomeEmpresa}</div>
                </div>
                <div className="text-right">
                    <div className="text-xs opacity-75 mb-1">VÁLIDO</div>
                    <div className="text-sm font-medium">{cartao.validade}</div>
                </div>
            </div>

            <style >{`
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
                    {cartao.numeroCard}
                </div>

                {/* Footer com divisor */}
                <div className="border-t pt-3" style={{ borderColor: cartao.cor4, opacity: 0.3 }}>
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-xs opacity-70">EMPRESA</div>
                            <div className="text-sm font-medium">{dados.inicioGame.nomeEmpresa}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs opacity-75 mb-1">VÁLIDO</div>
                            <div className="text-sm font-medium">{cartao.validade}</div>
                        </div>
                    </div>
                </div>
            </div>

            <style >{`
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
                    {cartao.numeroCard}
                </div>

                <div className="flex justify-between items-end">
                    <div>
                        <div className="text-xs opacity-90 mb-1">EMPRESA</div>
                        <div className="text-sm font-bold">{dados.inicioGame.nomeEmpresa}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs opacity-75 mb-1">VÁLIDO</div>
                        <div className="text-sm font-medium">{cartao.validade}</div>
                    </div>
                </div>
            </div>

            {selectedCard === cartao.id && (
                <div className="absolute inset-0 border-4 border-white rounded-3xl animate-pulse"></div>
            )}

            <style >{`
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
            // case 'card-Moderno':
            //     return <CardModerno cartao={cartao} />;
            case 'card-classico':
                return <CardClassico cartao={cartao} />;
            default:
                return <CardClassico cartao={cartao} />;
        }
    };

    // SEMPRE mostra todos os cartões do banco
    return (
        <div className="w-full space-y-6">


            {/* GRID com todos os cartões */}
            <div className="grid gap-6">
                {banco.cartoes.map((cartao) => (
                    <div
                        key={cartao.id}
                        className="bg-white/5 p-6 rounded-xl cursor-pointer hover:bg-white/10 transition-all border border-white/10 hover:border-white/30"
                        style={{
                            background: `linear-gradient(135deg, ${cartao.cor1} 0%, ${cartao.cor2} 50%, ${cartao.cor3} 100%)`
                        }}
                        onClick={() => {
                            setSelectedCard(cartao.id);
                            setShowConfirmModal(true);
                        }}
                    >
                        <div className="flex gap-6">
                            {/* Preview do cartão */}
                            <div className="flex-shrink-0 space-y-4">
                                {renderCard(cartao)}

                                <div className="space-y-3 w-[350px]">


                                    <div className="rounded-lg p-4 bg-white/10 backdrop-blur-sm border border-white/20">
                                        <p className="text-sm text-gray-300 mb-3">
                                            Selecione o tempo de contrato com o banco:
                                        </p>

                                        {/* container dos botões em linha */}
                                        <div className="flex gap-3">
                                            {[90, 180, 360].map(days => (
                                                <div key={days} className="flex-1">
                                                    <button
                                                        onClick={() => setRelationshipDays(days)}
                                                        className={`w-full p-3 rounded-lg border-2 transition-colors ${relationshipDays === days
                                                            ? 'text-white border-transparent'
                                                            : 'text-white border-gray-300 hover:border-gray-400'
                                                            }`}
                                                        style={relationshipDays === days ? { backgroundColor: '#0C9123' } : {}}
                                                    >
                                                        <div className="font-semibold">{days} dias</div>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        {/* relacionamento escolhido */}
                                        <div className="mt-4 p-3 rounded-md bg-white/5 border border-white/10">
                                            <p className="text-sm text-white">
                                                {relationshipDays === 90 && 'Relacionamento: 50%'}
                                                {relationshipDays === 180 && 'Relacionamento: 70%'}
                                                {relationshipDays === 360 && 'Relacionamento: 100%'}
                                            </p>
                                        </div>

                                        {/* explicação */}
                                        <p className="text-xs text-gray-300 mt-3">
                                            Quanto maior o relacionamento com o banco, maior será o aumento do limite de crédito e outros benefícios.
                                        </p>
                                    </div>





                                </div>
                            </div>

                            {/* Informações */}
                            <div className="flex-1 w-full">
                                <div className="rounded-2xl p-6 h-full w-full bg-white/10 backdrop-blur-sm border border-white/20">

                                    <div className="mb-6">
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            {banco.nome} - {cartao.nome}
                                        </h3>
                                        <p className="text-sm text-gray-300">{banco.descricao}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="space-y-4">
                                            <div className="rounded-lg p-4 border border-white/20">
                                                <div className="text-xs text-gray-300 mb-1">Juros do Crédito</div>
                                                <div className="text-base font-semibold text-white">{config.juros[cartao.juros]}% a.m</div>
                                            </div>

                                            <div className="rounded-lg p-4 border border-white/20">
                                                <div className="text-xs text-gray-300 mb-1">Limite Empréstimo</div>
                                                <div className="text-base font-semibold text-white">{config.emprestimos[cartao.emprestimo].mult}x patrimônio</div>
                                            </div>

                                            <div className="rounded-lg p-4 border border-white/20">
                                                <div className="text-xs text-gray-300 mb-1">Emprestimo aprovado</div>

                                                <div className="flex items-center gap-2">
                                                    <div className="text-base font-semibold text-white">
                                                       R$ {(config.emprestimos[cartao.emprestimo].mult * patrimonio).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="rounded-lg p-4 border border-white/20">
                                                <div className="text-xs text-gray-300 mb-1">Investimento Pós-Fixado</div>
                                                <div className="text-base font-semibold text-white">{config.investimentos.pos[cartao.investimento]}% a.m</div>
                                            </div>

                                            <div className="rounded-lg p-4 border border-white/20">
                                                <div className="text-xs text-gray-300 mb-2">Investimento Pré-Fixado</div>
                                                <div className="space-y-1">
                                                    {config.investimentos.pre[cartao.investimento].map((item, idx) => (
                                                        <div key={idx} className="flex justify-between text-xs">
                                                            <span className="text-gray-300">{item.prazo} dias:</span>
                                                            <span className="text-white font-semibold">{item.valor}% a.m</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                             <div className="rounded-lg p-4 border border-white/20">
                                                <div className="text-xs text-gray-300 mb-1">Cashback</div>

                                                <div className="flex items-center gap-2">
                                                    <div className="text-base font-semibold text-white">
                                                        {config.cashback[cartao.cashback].valor}%
                                                        {cartao.cashback === 'especifico' && ` ${cartao.setorCashback}`}
                                                        {cartao.cashback === 'todos' && ' todos setores'}
                                                        {cartao.cashback === 'nenhum' && ' sem cashback'}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <button
                                        style={{
                                            background: `linear-gradient(45deg, ${cartao.cor3} 0%, ${cartao.cor2} 25%, ${cartao.cor1} 50%, ${cartao.cor2} 75%, ${cartao.cor3} 100%)`
                                        }}
                                        className="w-full py-3 rounded-lg font-bold text-white transition-all duration-300 hover:scale-105"
                                        onClick={() => setSelectedCard(cartao.id)}
                                    >
                                        Selecionar {banco.nome} {cartao.nome}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de confirmação */}
            {showConfirmModal && selectedCard && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4">
                        <h3 className="text-2xl font-bold text-white mb-4">Confirmar Seleção</h3>
                        <p className="text-slate-300 mb-4">
                            Cartão: <strong>{banco.cartoes.find(c => c.id === selectedCard)?.nome}</strong>
                            <br />

                        </p>

                        {/* Seleção de prazo */}
                        <div className="mb-6">
                            <p className="text-sm text-gray-300 mb-3">Tempo de contrato:</p>
                            <div className="flex gap-3">

                                <h3>você tem certeza que deseja selecionar o contrato de <strong>{relationshipDays} dias?</strong></h3>
                            </div>
                            <p className="text-xs text-gray-300 mt-3">
                                Lembre-se, quanto maior o relacionamento com o banco, maior será o aumento do limite de crédito e outros benefícios.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => {
                                    setShowConfirmModal(false);
                                    setSelectedCard(null);
                                }}
                                className="flex-1 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-xl font-bold transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    handleConfirmarSelecao();
                                    setSelectedCard(selectedCard);
                                    setShowConfirmModal(true);
                                }}
                                className="flex-1 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-bold transition-all"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};