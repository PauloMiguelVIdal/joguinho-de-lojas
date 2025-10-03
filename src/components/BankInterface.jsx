import React, { useState, useEffect, useContext } from 'react';
import { CreditCard, DollarSign, TrendingUp, Gift, PiggyBank, BarChart3, Calculator, Clock, Star, Shield, Calendar } from 'lucide-react';
import { CentraldeDadosContext } from "../centralDeDadosContext";

import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
const BankInterface = () => {


  const [selectedInstallments, setSelectedInstallments] = useState(3);
  const [selectedLoanPercentage, setSelectedLoanPercentage] = useState(100);
  const [currentTab, setCurrentTab] = useState('overview');
  const [loanAmount, setLoanAmount] = useState(0); // Valor do empréstimo solicitado
  const [remainingDebt, setRemainingDebt] = useState(0); // Saldo devedor
  const [currentInstallment, setCurrentInstallment] = useState(0);
  const { dados, atualizarDados, atualizarDadosProf } = useContext(CentraldeDadosContext);
  const { economiaSetores, setEconomiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);

  const [selectedCard, setSelectedCard] = useState(null);

  //    const limite = parseInt(cartao.limiteEmprestimo);
  //         const usado = parseInt(cartao.limiteUsado);
  const limite = parseInt(40000);
  const usado = parseInt(6000);
  const percentualUsado = Math.round((usado / limite) * 100);
  const patrimonio = 10000;
  const contrato1 = economiaSetores.contratosBancos[0]
  const diaAtualJogo = dados.dia || 1000;
  const [activeLoan, setActiveLoan] = useState(null)
  const limiteEmprestimoAtual = contrato1.limiteEmprestimo
  const config = {
    cashback: {
      nenhum: { valor: 0 },
      todos: { valor: 2 },
      especifico: { valor: 5 }
    },
    juros: {
      baixo: 2,       // % a.m
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
        baixa: 1, // % a.m
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

  // Configurações


  // Dados do contrato (simulando o contrato1)


  // Estados

useEffect(() => {
  if (activeInvestments.length === 0) return;

  const investimentosAtualizados = activeInvestments.map(inv => {
    // Calcular quantos períodos de 30 dias passaram desde o início
    const diasDecorridos = diaAtualJogo - inv.diaInicio;
    const periodosCompletos = Math.floor(diasDecorridos / 30);

    // Atualizar último período processado
    if (periodosCompletos > (inv.periodosProcessados || 0)) {
      return { ...inv, periodosProcessados: periodosCompletos };
    }
    return inv;
  });

  // Verificar investimentos vencidos (pré-fixados)
  const investimentosVencidos = investimentosAtualizados.filter(
    inv => inv.type === 'pre' && diaAtualJogo >= inv.diaVencimento
  );

  if (investimentosVencidos.length > 0) {
    investimentosVencidos.forEach(inv => {
      const jurosGanhos = getPreFixedReturn(inv.amount, inv.days);
      const valorTotal = inv.amount + jurosGanhos;
      
      // Adicionar ao saldo da economia
      const novoSaldo = economiaSetores.saldo + valorTotal;
      atualizarEco('saldo', novoSaldo);
    });

    // Remover investimentos vencidos
    const investimentosAtivos = investimentosAtualizados.filter(
      inv => !investimentosVencidos.includes(inv)
    );
    setActiveInvestments(investimentosAtivos);
  } else {
    setActiveInvestments(investimentosAtualizados);
  }
}, [dados.dia]);



  // Função para calcular multiplicador de juros baseado no nível e parcelas
  const calcularMultiplicadorJuros = (nivelJuros, parcelas) => {
    const multiplicadores = {
      baixo: { 3: 1.5, 6: 1.2, 12: 1.0 },
      medio: { 3: 1.7, 6: 1.5, 12: 1.2 },
      alto: { 3: 2.0, 6: 1.7, 12: 1.5 }
    };
    return multiplicadores[nivelJuros]?.[parcelas] || 1.0;
  };



  // Função para calcular juros total do empréstimo
  const calcularJurosTotal = (valor, nivelEmprestimo, nivelJuros, parcelas) => {
    // Taxa base do tipo de empréstimo (média)
    const taxaBase = config.juros[nivelEmprestimo] / 100; // ex: 3% = 0.03

    // Multiplicador baseado no nível de juros do contrato e parcelas
    const multiplicador = calcularMultiplicadorJuros(nivelJuros, parcelas);

    // Taxa final mensal
    const taxaMensal = taxaBase * multiplicador;

    // Juros compostos
    const montante = valor * Math.pow(1 + taxaMensal, parcelas);
    const jurosTotal = montante - valor;

    return { jurosTotal, taxaMensal, montante };
  };

  // Calcular valores do empréstimo atual
  const dadosEmprestimo = calcularJurosTotal(
    loanAmount,
    contrato1.emprestimo,
    contrato1.juros,
    selectedInstallments
  );


  const dadosSimulacao = calcularJurosTotal(
    loanAmount,
    contrato1.emprestimo,
    contrato1.juros,
    selectedInstallments
  );
  const valorParcelaSimulacao = loanAmount > 0 ? dadosSimulacao.montante / selectedInstallments : 0;
  // Função para solicitar empréstimo
  const handleRequestLoan = () => {
    if (activeLoan || loanAmount <= 0 || loanAmount > availableLoan) return;

    const { montante, jurosTotal, taxaMensal } = calcularJurosTotal(
      loanAmount,
      contrato1.emprestimo,
      contrato1.juros,
      selectedInstallments
    );

    const valorParcela = montante / selectedInstallments;

    // Criar estrutura do empréstimo ativo
    const novoEmprestimo = {
      valorOriginal: loanAmount,
      totalComJuros: montante,
      jurosTotal: jurosTotal,
      parcelas: selectedInstallments,
      valorParcela: valorParcela,
      parcelaAtual: 1,
      saldoDevedor: montante,
      taxaMensal: taxaMensal,
      diaInicio: diaAtualJogo,
      proximoVencimento: diaAtualJogo + 30,
      dataFinal: diaAtualJogo + (30 * selectedInstallments)
    };

    setActiveLoan(novoEmprestimo);
    setRemainingDebt(montante);
    setCurrentInstallment(1);
    setAvailableLoan(prev => prev - loanAmount);
    setLoanAmount(0);
  };
  // Função para pagar antecipadamente
  const handlePayEarly = () => {
    if (!activeLoan) return;
    setAvailableLoan(prev => prev + activeLoan.valorOriginal);
    setActiveLoan(null);
    setRemainingDebt(0);
    setCurrentInstallment(0);
    // Não devolve o limite usado
  };

  const formatarDiaJogo = (dia) => {
    // Considerando que dia 0 = 01/01/2024
    const dataBase = new Date(2024, 0, 1);
    const dataCalculada = new Date(dataBase.getTime() + (dia * 24 * 60 * 60 * 1000));
    return dataCalculada.toLocaleDateString('pt-BR');
  };
  // Calcular juros para cada opção de parcelamento
  const opcoesParcelamento = [3, 6, 12].map(parcelas => {
    const { jurosTotal, taxaMensal } = calcularJurosTotal(
      loanAmount || 1000, // Valor de exemplo se não houver valor
      contrato1.emprestimo,
      contrato1.juros,
      parcelas
    );
    return {
      parcelas,
      taxaMensal: (taxaMensal * 100).toFixed(2),
      jurosTotal: jurosTotal.toFixed(2)
    };
  });


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
          {cartao.cartaoNome}
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
          {cartao.cartaoNome}
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
        {cartao.cartaoNome}
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
          {cartao.cartaoNome}
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
          {cartao.cartaoNome}
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









  const loanData = {
    preApproved: 45000,
    interestRate: 2.99,
    maxInstallments: 60
  };

  const [availableLoan, setAvailableLoan] = useState(limiteEmprestimoAtual);


  // Dados mockados
  const cardData = {
    number: contrato1.numeroCard,
    holder: dados.inicioGame.nomeEmpresa,
    expiry: contrato1.dataFim,
    limit: 18000,
    available: 12350,
    used: 17050,
  };



  const investmentData = {
    totalInvested: 25000,
    currentValue: 26834.50,
    monthlyReturn: 1.12,
    yearlyReturn: 14.2,
    bestPerforming: 'Tesouro Direto',
    worstPerforming: 'Tesouro Direto'
  };

  const cashbackData = {
    currentMonth: 145.67,
    accumulated: 1234.89,
    daysUntilWithdrawal: 12
  };

  const loanPercentages = [
    { percentage: 100, label: '100%' },
    { percentage: 70, label: '70%' },
    { percentage: 50, label: '50%' },
    { percentage: 30, label: '30%' }
  ];





  const calculateInstallment = (amount, installments) => {
    const monthlyRate = [(config.juros[contrato1.emprestimo])] / 100;
    const payment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -installments));
    return payment;
  };

  const getLoanAmount = () => {
    return (loanData.preApproved * selectedLoanPercentage) / 100;
  };

  console.log([config[contrato1.emprestimo.mult]]);
  console.log(config.juros[contrato1.emprestimo]);

  const TabButton = ({ id, label, icon: Icon, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${active ? 'text-white shadow-lg' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
      style={active ? { backgroundColor: `${contrato1.cor1}` } : {}}
    >
      <Icon size={18} />
      {label}
    </button>
  );
  const calcularJuros = (nivel, parcelas, baseJuros) => {
    switch (nivel) {
      case "baixo":
        switch (parcelas) {
          case 3: return baseJuros * 1;
          case 6: return baseJuros * 1.2;
          case 12: return baseJuros * 1.5;
          default: return baseJuros;
        }
      case "medio":
        switch (parcelas) {
          case 3: return baseJuros * 1.2;
          case 6: return baseJuros * 1.5;
          case 12: return baseJuros * 1.7;
          default: return baseJuros;
        }
      case "alto":
        switch (parcelas) {
          case 3: return baseJuros * 1.5;
          case 6: return baseJuros * 1.7;
          case 12: return baseJuros * 2;
          default: return baseJuros;
        }
      default:
        return baseJuros;
    }
  };
  // Estados para investimentos
  const [investmentType, setInvestmentType] = useState('pos'); // 'pos' ou 'pre'
  const [investmentAmount, setInvestmentAmount] = useState(0);
  const [investmentDays, setInvestmentDays] = useState(90);
  const [activeInvestments, setActiveInvestments] = useState([]);
  const [totalBalance, setTotalBalance] = useState(50000); // Saldo disponível

  // Função para calcular retorno pré-fixado
  // Função para calcular retorno pós-fixado mensal baseado no contrato
const getPosTaxaMensal = () => {
  const nivelInvestimento = contrato1.investimento; // 'baixa', 'media', 'alta'
  return (config.investimentos.pos[nivelInvestimento] || 1) / 100;
};

// Função para calcular retorno pré-fixado baseado no contrato
const getPreFixedReturn = (amount, days) => {
  const nivelInvestimento = contrato1.investimento; // 'baixa', 'media', 'alta'
  const tabelaTaxas = config.investimentos.pre[nivelInvestimento];
  
  if (!tabelaTaxas) return amount * 0.015; // fallback
  
  const opcao = tabelaTaxas.find(t => t.prazo === days);
  const taxaMensal = opcao ? opcao.valor / 100 : 0.015; // taxa mensal em decimal
  
  const meses = days / 30; // converte dias em meses
  const taxaTotal = taxaMensal * meses; // multiplica a taxa mensal pelos meses
  
  return amount * taxaTotal;
};

// Função para resgatar investimento (atualizada)


  const calcularLimiteEmprestimo = (contrato, patrimonio) => {
    if (!contrato) return 0;
    const multiplicador = config.emprestimos[contrato.emprestimo]?.mult || 1;
    console.log((config.emprestimos[contrato.emprestimo].mult * patrimonio));
    return patrimonio * multiplicador;
  };

  const obterTaxaJuros = (contrato) => {
    if (!contrato) return 2;
    return config.juros[contrato.juros] || 2;
  };

  const calcularCashback = (valor, contrato) => {
    if (!contrato || !contrato.cashback) return 0;
    const percentual = config.cashback[contrato.cashback.tipo]?.valor || 0;
    return (valor * percentual) / 100;
  };

  const obterTaxaInvestimento = (contrato, tipo = 'pos') => {
    if (!contrato) return 1;
    if (tipo === 'pos') {
      return config.investimentos.pos[contrato.investimento] || 1;
    }
    return config.investimentos.pre[contrato.investimento] || [];
  };

  // Função para investir
const handleInvest = () => {
  if (investmentAmount <= 0 || investmentAmount > totalBalance) return;

  const newInvestment = {
    id: Date.now(),
    type: investmentType,
    amount: investmentAmount,
    days: investmentType === 'pre' ? investmentDays : null,
    diaInicio: diaAtualJogo,
    diaVencimento: investmentType === 'pre' ? diaAtualJogo + investmentDays : null,
    periodosProcessados: 0
  };

  setActiveInvestments([...activeInvestments, newInvestment]);
  setTotalBalance(totalBalance - investmentAmount);
  setInvestmentAmount(0);
};

  // Função para resgatar investimento
const handleWithdraw = (investmentId) => {
  const investment = activeInvestments.find(inv => inv.id === investmentId);
  if (!investment) return;

  let valorResgate = 0;
  const diasDecorridos = diaAtualJogo - investment.diaInicio;
  const mesesCompletos = Math.floor(diasDecorridos / 30);

  if (investment.type === 'pos') {
    // Pós-fixado: calcula rendimento pelos meses completos
    const taxaMensal = getPosTaxaMensal();
    const jurosGanhos = investment.amount * taxaMensal * mesesCompletos;
    valorResgate = investment.amount + jurosGanhos;
  } else {
    // Pré-fixado
    const isMatured = diaAtualJogo >= investment.diaVencimento;

    if (isMatured) {
      // Vencido: recebe valor + rendimento total
      const jurosGanhos = getPreFixedReturn(investment.amount, investment.days);
      valorResgate = investment.amount + jurosGanhos;
    } else {
      // Antecipado: perde 10% e não recebe rendimentos
      valorResgate = investment.amount * 0.9;
    }
  }

  // Adiciona ao saldo da economia
  const novoSaldo = economiaSetores.saldo + valorResgate;
  atualizarEco('saldo', novoSaldo);

  // Remove o investimento
  setActiveInvestments(activeInvestments.filter(inv => inv.id !== investmentId));
  setTotalBalance(totalBalance + valorResgate);
};

  console.log((loanAmount * calcularJuros([(config.juros[contrato1.juros])], selectedInstallments, [(config.juros[contrato1.emprestimo])])))
  console.log(loanAmount)
  console.log(calcularJuros([(config.juros[contrato1.juros])], selectedInstallments, [(config.juros[contrato1.emprestimo])]))
  console.log([(config.juros[contrato1.juros])])
  console.log(selectedInstallments)
  console.log([(config.juros[contrato1.emprestimo])])

  // Função para adicionar fundos (só pós-fixado)
  const handleAddFunds = (investmentId) => {
    const investment = activeInvestments.find(inv => inv.id === investmentId);
    if (!investment || investment.type !== 'pos') return;

    const additionalAmount = parseFloat(prompt('Quanto deseja adicionar?', '0'));
    if (isNaN(additionalAmount) || additionalAmount <= 0 || additionalAmount > totalBalance) return;

    setActiveInvestments(activeInvestments.map(inv =>
      inv.id === investmentId ? { ...inv, amount: inv.amount + additionalAmount } : inv
    ));
    setTotalBalance(totalBalance - additionalAmount);
  };
  const contratoParaCartao = (contrato, dados) => ({
    id: contrato.cartaoId,
    banco: contrato.bancoNome,
    design: contrato.design,
    cor1: contrato.cor1,
    cor2: contrato.cor2,
    cor3: contrato.cor3,
    cor4: contrato.cor4,
    numeroCard: contrato.numeroCard, // ou gere um número fictício se quiser
    cartaoNome: contrato.cartaoNome,
    validade: contrato.dataFim ? `até ${contrato.dataFim}` : "-",
    empresa: dados?.inicioGame?.nomeEmpresa ?? "Minha Empresa",
  });

  return (
    <div style={{
      background: `linear-gradient(135deg, ${contrato1.cor4} 0%, ${contrato1.cor1} 50%, ${contrato1.cor4} 100%)`
    }} className="h-full w-full rounded-[20px]  p-6">
      <div className="w-full">
        <header className="mb-8">
          <h1 style={{ color: `${contrato1.cor1}` }} className="text-3xl font-bold text-white mb-2">{contrato1.bancoNome}</h1>
        </header>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          <TabButton id="overview" label="Visão Geral" icon={CreditCard} active={currentTab === 'overview'} onClick={setCurrentTab} />
          <TabButton id="loan" label="Empréstimo" icon={DollarSign} active={currentTab === 'loan'} onClick={setCurrentTab} />
          <TabButton id="investments" label="Investimentos" icon={TrendingUp} active={currentTab === 'investments'} onClick={setCurrentTab} />
          <TabButton id="cashback" label="Cashback" icon={Gift} active={currentTab === 'cashback'} onClick={setCurrentTab} />
        </div>

        {/* Overview Tab */}
        {currentTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-start space-y-4">
              {contrato1 && renderCartao(contratoParaCartao(contrato1, dados))}

              <div className="bg-white rounded-xl p-4 shadow-lg w-[350px]">
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="h-4 rounded-full transition-all duration-1000"
                      style={{
                        width: `${(cardData.used / cardData.limit) * 100}%`,
                        background: `linear-gradient(to right, ${contrato1.cor3}, ${contrato1.cor4})`
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-gray-600">Usado: R$ {cardData.used.toLocaleString('pt-BR')}</span>
                    <span className="text-gray-600">{((cardData.used / cardData.limit) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-lg w-[350px]">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-gray-700">Limite Disponível</h3>
                </div>
                <p className="text-2xl font-bold" style={{ color: `${contrato1.cor3}` }}>
                  R$ {cardData.available.toLocaleString('pt-BR')}
                </p>
                <p className="text-sm text-gray-500">de R$ {cardData.limit.toLocaleString('pt-BR')}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg shadow-lg" style={{ backgroundColor: '#f8f9fa', borderLeft: `4px solid ${contrato1.cor3}` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: `${contrato1.cor2}` }}>
                    <DollarSign className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Empréstimo</h3>
                    <p className="text-gray-600 text-sm">Valor da parcela</p>
                  </div>
                </div>
                <p className="text-2xl font-bold" style={{ color: `${contrato1.cor3}` }}>
                  R$ {activeLoan?.valorParcela?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Total:  R$ {(activeLoan?.saldoDevedor ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Taxa de juros:</span>
                    <span className="font-semibold">{(dadosSimulacao.taxaMensal * 100).toFixed(2)}% a.m.</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>Limite disponível:</span>
                    R$ {availableLoan.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: `${contrato1.cor2}` }}>
                    <TrendingUp className="text-white" size={20} />
                  </div>
                  <h3 className="font-bold text-gray-800">Investimentos</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">Total Investido</p>
                <p className="text-xl font-bold text-gray-800">R$ {investmentData.totalInvested.toLocaleString('pt-BR')}</p>
                <p className="text-sm text-gray-600 mt-3">Rentabilidade (Pós-fixado)</p>
                <p className="text-lg font-bold" style={{ color: `${contrato1.cor3}` }}>
                  {obterTaxaInvestimento(contrato1, 'pos')}% a.m.
                </p>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-600 mb-1">Taxas Pré-fixadas:</p>
                  {contrato1 && obterTaxaInvestimento(contrato1, 'pre').map((taxa, idx) => (
                    <div key={idx} className="flex justify-between text-xs text-gray-600">
                      <span>{taxa.prazo} dias:</span>
                      <span className="font-semibold">{taxa.valor}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-center p-2 bg-gray-50 rounded-lg mb-3">
                <h3 style={{ color: `${contrato1.cor3}` }} className="font-bold text-green-800">Cashback Acumulado</h3>
                <p className="text-2xl font-bold text-gray-800">
                  R$ {cashbackData.accumulated.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tipo:</span>
                  <span className="font-semibold text-gray-800 capitalize">
                    {cashbackData.tipo === 'nenhum' ? 'Sem cashback' : cashbackData.tipo === 'todos' ? 'Todas compras' : `Setor: ${cashbackData.setor}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Percentual:</span>
                  <span className="font-semibold" style={{ color: '#0C9123' }}>{cashbackData.percentual}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Este mês:</span>
                  <span className="font-semibold text-gray-800">
                    R$ {cashbackData.currentMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <button
                className="w-full text-white py-2 rounded-lg font-semibold hover:scale-105 transition-all duration-500"
                style={{ backgroundColor: `${contrato1.cor3}` }}
                disabled={cashbackData.accumulated === 0}
              >
                Resgatar Cashback
              </button>
            </div>
          </div>
        )}

        {currentTab === 'loan' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-xl p-6 max-h-[65vh] overflow-y-auto">
            {/* Coluna Esquerda: Solicitação */}
            <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: contrato1.cor2 }}>
                  <DollarSign className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Empréstimo Pré-aprovado</h3>
                  <p className="text-gray-600 text-sm">Taxa especial para você</p>
                </div>
              </div>

              <div className="p-4 rounded-lg" style={{ backgroundColor: contrato1.cor4 }}>
                <p className="text-3xl font-bold text-white">
                  R$ {availableLoan.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-white opacity-90">Valor disponível</p>
              </div>

              {/* Input de valor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor do Empréstimo
                </label>
                <input
                  type="number"
                  min="0"
                  max={availableLoan}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Math.min(Number(e.target.value), availableLoan))}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ focusRingColor: contrato1.cor3 }}
                  placeholder={`Máx: R$ ${availableLoan.toLocaleString('pt-BR')}`}
                  disabled={!!activeLoan}
                />
              </div>

              {/* Parcelas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Parcelas
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[3, 6, 12].map(option => (
                    <button
                      key={option}
                      onClick={() => setSelectedInstallments(option)}
                      className={`p-3 rounded-lg border-2 transition-colors font-semibold ${selectedInstallments === option
                        ? "text-white border-transparent"
                        : "text-gray-700 border-gray-300 hover:border-gray-400"
                        }`}
                      style={selectedInstallments === option ? { backgroundColor: contrato1.cor3 } : {}}
                      disabled={!!activeLoan}
                    >
                      {option}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Botão solicitar */}
              <button
                onClick={handleRequestLoan}
                className={`w-full text-white py-3 rounded-lg font-semibold transition-colors ${activeLoan || loanAmount <= 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                style={{ backgroundColor: contrato1.cor2 }}
                disabled={activeLoan || loanAmount <= 0}
              >
                {activeLoan ? 'Já existe empréstimo ativo' : 'Solicitar Empréstimo'}
              </button>
            </div>

            {/* Coluna Direita: Simulação e Status */}
            <div className="space-y-4">
              {/* Resultado da simulação - só mostra se NÃO há empréstimo ativo */}
              {!activeLoan && (
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="font-bold text-gray-800 mb-4">Simulação do Empréstimo</h3>

                  <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: "#f8f9fa", borderLeft: `4px solid ${contrato1.cor3}` }}>
                    <p className="text-sm text-gray-600">Valor da parcela</p>
                    <p className="text-2xl font-bold" style={{ color: contrato1.cor3 }}>
                      R$ {valorParcelaSimulacao.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Total a pagar: R$ {dadosSimulacao.montante.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Juros total: R$ {dadosSimulacao.jurosTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Taxa mensal: {(dadosSimulacao.taxaMensal * 100).toFixed(2)}%
                    </p>
                  </div>

                  {/* Tabela de taxas por parcelamento */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <h4 className="font-semibold text-gray-700">Taxas por Parcelamento</h4>
                    </div>
                    <div className="divide-y">
                      {opcoesParcelamento.map(opcao => (
                        <div key={opcao.parcelas} className="p-3 flex justify-between items-center hover:bg-gray-50">
                          <div>
                            <p className="font-medium text-gray-800">{opcao.parcelas}x</p>
                            <p className="text-xs text-gray-600">{opcao.taxaMensal}% a.m.</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Juros:</p>
                            <p className="font-semibold" style={{ color: contrato1.cor3 }}>
                              R$ {parseFloat(opcao.jurosTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Saldo devedor - só mostra se HÁ empréstimo ativo */}
              {activeLoan && (
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar size={20} style={{ color: contrato1.cor3 }} />
                    <h3 className="font-bold text-gray-800">Empréstimo Ativo</h3>
                  </div>

                  {/* Saldo Devedor */}
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600">Saldo devedor atual</p>
                    <p className="text-3xl font-bold text-gray-800 my-2">
                      R$ {activeLoan.saldoDevedor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm text-gray-600">
                      Parcela {activeLoan.parcelaAtual} de {activeLoan.parcelas}
                    </p>
                  </div>

                  {/* Próxima Parcela */}
                  <div className="bg-gray-100 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-600">Próxima parcela</p>
                    <p className="text-2xl font-bold" style={{ color: contrato1.cor3 }}>
                      R$ {activeLoan.valorParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <div className="mt-2 pt-2 border-t border-gray-300">
                      <p className="text-xs text-gray-600">Vencimento</p>
                      <p className="text-sm font-semibold text-gray-700">
                        Dia {activeLoan.proximoVencimento} ({formatarDiaJogo(activeLoan.proximoVencimento)})
                      </p>
                    </div>
                  </div>

                  {/* Cronograma de Pagamentos */}
                  <div className="border rounded-lg overflow-hidden mb-4">
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <h4 className="font-semibold text-gray-700">Cronograma de Pagamentos</h4>
                    </div>
                    <div className="divide-y max-h-48 overflow-y-auto">
                      {Array.from({ length: activeLoan.parcelas }, (_, i) => {
                        const numeroParcela = i + 1;
                        const diaVencimento = activeLoan.diaInicio + (30 * numeroParcela);
                        const isPaga = numeroParcela < activeLoan.parcelaAtual;
                        const isProxima = numeroParcela === activeLoan.parcelaAtual;

                        return (
                          <div
                            key={i}
                            className={`p-3 flex justify-between items-center ${isProxima ? 'bg-yellow-50' : isPaga ? 'bg-green-50' : ''
                              }`}
                          >
                            <div>
                              <p className={`font-medium ${isPaga ? 'text-green-600' : isProxima ? 'text-yellow-600' : 'text-gray-800'}`}>
                                {numeroParcela}ª parcela {isPaga ? '✓' : isProxima ? '→' : ''}
                              </p>
                              <p className="text-xs text-gray-600">
                                Dia {diaVencimento} ({formatarDiaJogo(diaVencimento)})
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-800">
                                R$ {(activeLoan?.valorParcela ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Informações do Empréstimo */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-blue-600 text-xs">Valor Original</p>
                        <p className="font-semibold text-blue-800">
                          R$ {activeLoan.valorOriginal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div>
                        <p className="text-blue-600 text-xs">Juros Total</p>
                        <p className="font-semibold text-blue-800">
                          R$ {activeLoan.jurosTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div>
                        <p className="text-blue-600 text-xs">Início</p>
                        <p className="font-semibold text-blue-800">Dia {activeLoan.diaInicio}</p>
                      </div>
                      <div>
                        <p className="text-blue-600 text-xs">Fim</p>
                        <p className="font-semibold text-blue-800">Dia {activeLoan.dataFinal}</p>
                      </div>
                    </div>
                  </div>

                  {/* Botão Pagar Antecipado */}
                  <button
                    onClick={handlePayEarly}
                    className="w-full text-white py-3 rounded-lg font-semibold transition-colors"
                    style={{ backgroundColor: contrato1.cor2 }}
                  >
                    Pagar Antecipado (Liquidar Dívida)
                  </button>
                </div>
              )}
            </div>
          </div>






        )}



        {/* Investments Tab */}
       {/* Investments Tab */}
{currentTab === 'investments' && (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 scrollbar-custom rounded-xl p-6 max-h-[65vh] overflow-y-auto">
    {/* Coluna esquerda: Fazer investimento */}
    <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 rounded-lg" style={{ backgroundColor: `${contrato1.cor2}` }}>
          <TrendingUp className="text-white" size={24} />
        </div>
        <div>
          <h3 className="font-bold text-gray-800">Novo Investimento</h3>
          <p className="text-gray-600 text-sm">Escolha a melhor opção</p>
        </div>
      </div>

      {/* Saldo disponível */}
      <div className="p-4 rounded-lg" style={{ backgroundColor: `${contrato1.cor3}` }}>
        <p className="text-3xl font-bold text-white">
          R$ {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p className="text-sm text-white opacity-90">Saldo disponível para investir</p>
      </div>

      {/* Tipo de investimento */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Investimento</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setInvestmentType('pos')}
            className={`p-4 rounded-lg border-2 transition-all ${investmentType === 'pos'
              ? 'text-white border-transparent'
              : 'text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            style={investmentType === 'pos' ? { backgroundColor: `${contrato1.cor3}` } : {}}
          >
            <div className="font-semibold">Pós-fixado</div>
            <div className="text-xs mt-1 opacity-90">Liquidez diária</div>
          </button>
          <button
            onClick={() => setInvestmentType('pre')}
            className={`p-4 rounded-lg border-2 transition-all ${investmentType === 'pre'
              ? 'text-white border-transparent'
              : 'text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            style={investmentType === 'pre' ? { backgroundColor: `${contrato1.cor3}` } : {}}
          >
            <div className="font-semibold">Pré-fixado</div>
            <div className="text-xs mt-1 opacity-90">Maior retorno</div>
          </button>
        </div>
      </div>

      {/* Valor do investimento */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Valor do Investimento</label>
        <input
          type="number"
          min="0"
          max={totalBalance}
          value={investmentAmount}
          onChange={(e) => setInvestmentAmount(Math.min(Number(e.target.value), totalBalance))}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          placeholder={`Máx: R$ ${totalBalance.toLocaleString('pt-BR')}`}
        />
      </div>

      {/* Prazo (apenas para pré-fixado) */}
      {investmentType === 'pre' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Prazo de Resgate</label>
          <div className="grid grid-cols-3 gap-2">
            {[90, 180, 360].map(days => {
              const taxa = ((getPreFixedReturn(1000, days) / 1000) * 100).toFixed(2);
              return (
                <button
                  key={days}
                  onClick={() => setInvestmentDays(days)}
                  className={`p-3 rounded-lg border-2 transition-colors ${investmentDays === days
                    ? 'text-white border-transparent'
                    : 'text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                  style={investmentDays === days ? { backgroundColor: `${contrato1.cor3}` } : {}}
                >
                  <div className="font-semibold">{days} dias</div>
                  <div className="text-xs mt-1">+{taxa}%</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Info do investimento */}
      <div className="p-4 rounded-lg" style={{ backgroundColor: '#f8f9fa', borderLeft: `4px solid ${contrato1.cor3}` }}>
        <p className="text-sm text-gray-600 mb-2">
          {investmentType === 'pos' 
            ? `Rendimento Mensal: ${(getPosTaxaMensal() * 100).toFixed(2)}%` 
            : `Rendimento Total: ${((getPreFixedReturn(1000, investmentDays) / 1000) * 100).toFixed(2)}%`
          }
        </p>
        <p className="text-lg font-bold" style={{ color: `${contrato1.cor3}` }}>
          Retorno estimado: R${' '}
          {investmentType === 'pos'
            ? (investmentAmount * getPosTaxaMensal()).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            : getPreFixedReturn(investmentAmount, investmentDays).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          }
        </p>
        {investmentType === 'pos' && (
          <p className="text-xs text-gray-500 mt-1">Pode adicionar ou retirar a qualquer momento</p>
        )}
        {investmentType === 'pre' && (
          <p className="text-xs text-gray-500 mt-1">Resgate antecipado: perda de 10% + sem rendimentos</p>
        )}
      </div>

      {/* Botão investir */}
      <button
        onClick={handleInvest}
        className={`w-full text-white py-3 rounded-lg font-semibold transition-colors ${investmentAmount <= 0 || investmentAmount > totalBalance ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        style={{ backgroundColor: `${contrato1.cor3}` }}
        disabled={investmentAmount <= 0 || investmentAmount > totalBalance}
      >
        Investir Agora
      </button>
    </div>

    {/* Coluna direita: Investimentos ativos */}
    {/* Coluna direita: Investimentos ativos */}
<div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
  <h3 className="font-bold text-gray-800 mb-4">Meus Investimentos</h3>

{activeInvestments.map(inv => {
  const diasDecorridos = diaAtualJogo - inv.diaInicio;
  const mesesCompletos = Math.floor(diasDecorridos / 30);
  const isMatured = inv.type === 'pre' && diaAtualJogo >= inv.diaVencimento;
  const taxaMensalPos = getPosTaxaMensal();
  
  // Calcular valor atual e juros ganhos
  let jurosGanhos, valorTotalResgate, percentualRendimento;
  
  if (inv.type === 'pos') {
    jurosGanhos = inv.amount * taxaMensalPos * mesesCompletos;
    valorTotalResgate = inv.amount + jurosGanhos;
    percentualRendimento = (jurosGanhos / inv.amount) * 100;
  } else {
    if (isMatured) {
      jurosGanhos = getPreFixedReturn(inv.amount, inv.days);
      valorTotalResgate = inv.amount + jurosGanhos;
      percentualRendimento = (jurosGanhos / inv.amount) * 100;
    } else {
      jurosGanhos = 0;
      valorTotalResgate = inv.amount * 0.9;
      percentualRendimento = -10;
    }
  }
  
  // Calcular dias restantes para vencimento
  const diasRestantes = inv.type === 'pre' && !isMatured 
    ? inv.diaVencimento - diaAtualJogo
    : 0;

  return (
    <div key={inv.id} className="p-4 border-2 border-gray-200 rounded-lg transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className="font-semibold text-gray-800">
            {inv.type === 'pos' ? 'Pós-fixado' : 'Pré-fixado'}
          </span>
          {inv.type === 'pre' && (
            <span className="ml-2 text-xs px-2 py-1 rounded" style={{ backgroundColor: isMatured ? '#4CAF50' : '#FFA726', color: 'white' }}>
              {isMatured ? 'Vencido' : `${inv.days} dias`}
            </span>
          )}
        </div>
      </div>

      {/* Valor Principal */}
      <p className="text-2xl font-bold" style={{ color: `${contrato1.cor3}` }}>
        R$ {inv.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
      <p className="text-xs text-gray-500">Valor investido</p>

      {/* Informações detalhadas */}
      <div className="mt-3 p-3 bg-gray-50 rounded-lg space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Rendimento:</span>
          <span className={`font-semibold ${percentualRendimento >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
            {percentualRendimento >= 0 ? '+' : ''}{percentualRendimento.toFixed(2)}%
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Juros ganhos:</span>
          <span className={`font-semibold ${jurosGanhos >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {jurosGanhos >= 0 ? '+' : ''} R$ {Math.abs(jurosGanhos).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        
        <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
          <span className="text-gray-600 font-medium">Valor a receber:</span>
          <span className="font-bold text-lg" style={{ color: inv.type === 'pre' && !isMatured ? '#d32f2f' : '#0C9123' }}>
            R$ {valorTotalResgate.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        {inv.type === 'pos' && (
          <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
            <span className="text-gray-600">Meses decorridos:</span>
            <span className="font-semibold text-gray-800">{mesesCompletos} meses</span>
          </div>
        )}

        {inv.type === 'pre' && !isMatured && (
          <>
            <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
              <span className="text-gray-600">Faltam:</span>
              <span className="font-semibold text-orange-600">
                {diasRestantes} dias (Dia {inv.diaVencimento})
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Início:</span>
              <span className="font-medium text-gray-700">Dia {inv.diaInicio}</span>
            </div>
            <div className="text-xs text-red-600 mt-2 p-2 bg-red-50 rounded">
              ⚠️ Resgate antecipado: perde 10% do valor investido + sem rendimentos
            </div>
          </>
        )}

        {inv.type === 'pre' && isMatured && (
          <div className="text-center pt-2 border-t border-gray-200">
            <span className="text-xs text-green-600 font-medium">
              ✓ Investimento vencido (Dia {inv.diaVencimento}) - Resgate disponível
            </span>
          </div>
        )}
      </div>

      {/* Botões de ação */}
      <div className="flex gap-2 mt-3">
        {inv.type === 'pos' && (
          <button
            onClick={() => handleAddFunds(inv.id)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium transition-colors text-sm"
          >
            + Adicionar
          </button>
        )}
        <button
          onClick={() => handleWithdraw(inv.id)}
          className="flex-1 text-white py-2 rounded-lg font-medium transition-colors text-sm"
          style={{ backgroundColor: inv.type === 'pre' && !isMatured ? '#d32f2f' : '#0C9123' }}
        >
          {inv.type === 'pre' && !isMatured ? 'Resgatar (-10%)' : 'Resgatar'}
        </button>
      </div>
    </div>
  );
})}
</div>
  </div>
)}

        {/* Cashback Tab */}
        {currentTab === 'cashback' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg" style={{ backgroundColor: `${contrato1.cor2}` }}>
                  <Gift className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Cashback Acumulado</h3>
                  <p className="text-gray-600 text-sm">Seus benefícios</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-center p-4 rounded-lg" style={{ background: `linear-gradient(135deg, ${contrato1.cor4}, ${contrato1.cor3})` }}>
                  <p className="text-sm text-white opacity-90">Este Mês</p>
                  <p className="text-3xl font-bold text-white">
                    R$ {cashbackData.currentMonth.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </p>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Acumulado</p>
                  <p className="text-2xl font-bold text-gray-800">
                    R$ {cashbackData.accumulated.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </p>
                </div>

                <button className="w-full text-white py-3 rounded-lg font-semibold transition-colors" style={{ backgroundColor: `${contrato1.cor3}` }}>
                  Resgatar Cashback
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-gray-800 mb-4">Próximo Resgate</h3>

              <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: '#f1f8e9', borderLeft: `4px solid ${contrato1.cor4}` }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700">Disponível em:</span>
                  <span className="text-2xl font-bold" style={{ color: `${contrato1.cor3}` }}>{cashbackData.daysUntilWithdrawal} dias</span>
                </div>
                <p className="text-sm text-gray-600">Todo mês você pode resgatar seu cashback acumulado</p>
              </div>


            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BankInterface;