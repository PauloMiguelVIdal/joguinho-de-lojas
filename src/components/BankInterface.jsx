import React, { useState, useEffect } from 'react';
import { CreditCard, DollarSign, TrendingUp, Gift, PiggyBank, BarChart3, Calculator, Clock, Star, Shield } from 'lucide-react';

const BankInterface = () => {
  const [selectedInstallments, setSelectedInstallments] = useState(6);
  const [selectedLoanPercentage, setSelectedLoanPercentage] = useState(100);
  const [currentTab, setCurrentTab] = useState('overview');
  const [loanAmount, setLoanAmount] = useState(0); // Valor do empréstimo solicitado
  const [remainingDebt, setRemainingDebt] = useState(0); // Saldo devedor
  const [currentInstallment, setCurrentInstallment] = useState(1);
  
    const loanData = {
    preApproved: 45000,
    interestRate: 2.99,
    maxInstallments: 60
  };

  const [availableLoan, setAvailableLoan] = useState(loanData.preApproved);


  // Dados mockados
  const cardData = {
    number: '**** **** **** 1234',
    holder: 'João Silva Santos',
    expiry: '12/27',
    cvv: '***',
    limit: 15000,
    available: 12350,
    used: 2650,
    dueDate: '15/10/2025',
    minimumPayment: 265
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


  const handlePayEarly = () => {
    if (remainingDebt <= 0) return;
    // Pagamento total antecipado
    setRemainingDebt(0);
    setLoanAmount(0);
    setSelectedLoanPercentage(0);
    setSelectedInstallments(3);
    setCurrentInstallment(0);
  };


  const handleRequestLoan = () => {
    if (remainingDebt > 0 || loanAmount <= 0) return; // bloqueia se já houver empréstimo ou valor inválido

    const jurosPercent = selectedInstallments === 3 ? 0.02 : selectedInstallments === 6 ? 0.03 : 0.04;
    const totalDebt = loanAmount * (1 + jurosPercent);


    setRemainingDebt(totalDebt);
    setCurrentInstallment(1); // começa na parcela 1
    setAvailableLoan(prev => prev - loanAmount);
    setLoanAmount(0); // reseta o input
  };

  const calculateInstallment = (amount, installments) => {
    const monthlyRate = loanData.interestRate / 100;
    const payment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -installments));
    return payment;
  };

  const getLoanAmount = () => {
    return (loanData.preApproved * selectedLoanPercentage) / 100;
  };

  const TabButton = ({ id, label, icon: Icon, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${active ? 'text-white shadow-lg' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
      style={active ? { backgroundColor: '#003816' } : {}}
    >
      <Icon size={18} />
      {label}
    </button>
  );


// Estados para investimentos
const [investmentType, setInvestmentType] = useState('pos'); // 'pos' ou 'pre'
const [investmentAmount, setInvestmentAmount] = useState(0);
const [investmentDays, setInvestmentDays] = useState(90);
const [activeInvestments, setActiveInvestments] = useState([]);
const [totalBalance, setTotalBalance] = useState(50000); // Saldo disponível

// Função para calcular retorno pré-fixado
const getPreFixedReturn = (amount, days) => {
  const rates = { 90: 0.015, 180: 0.035, 360: 0.08 }; // 1.5%, 3.5%, 8%
  return amount * rates[days];
};

// Função para investir
const handleInvest = () => {
  if (investmentAmount <= 0 || investmentAmount > totalBalance) return;

  const newInvestment = {
    id: Date.now(),
    type: investmentType,
    amount: investmentAmount,
    days: investmentType === 'pre' ? investmentDays : null,
    startDate: Date.now(),
    maturityDate: investmentType === 'pre' ? Date.now() + (investmentDays * 24 * 60 * 60 * 1000) : null
  };

  setActiveInvestments([...activeInvestments, newInvestment]);
  setTotalBalance(totalBalance - investmentAmount);
  setInvestmentAmount(0);
};

// Função para resgatar investimento
const handleWithdraw = (investmentId) => {
  const investment = activeInvestments.find(inv => inv.id === investmentId);
  if (!investment) return;

  let returnAmount = investment.amount;

  if (investment.type === 'pos') {
    // Pós-fixado: retorna com rendimento proporcional
    const monthsPassed = Math.floor((Date.now() - investment.startDate) / (1000 * 60 * 60 * 24 * 30));
    returnAmount = investment.amount * (1 + (0.005 * monthsPassed));
  } else {
    // Pré-fixado
    const isMatured = Date.now() >= investment.maturityDate;
    
    if (isMatured) {
      // Se venceu, recebe valor + rendimento
      returnAmount = investment.amount + getPreFixedReturn(investment.amount, investment.days);
    } else {
      // Se retirar antes, perde 10%
      returnAmount = investment.amount * 0.9;
    }
  }

  setTotalBalance(totalBalance + returnAmount);
  setActiveInvestments(activeInvestments.filter(inv => inv.id !== investmentId));
};

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

  return (
    <div style={{
      background: `linear-gradient(135deg, #0C9123  0%, #1a5e2ac5 50%, #0C9123 100%)`
    }} className="h-full w-full rounded-[20px]  p-6">
      <div className="w-full">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">AGRO BANK</h1>
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
            {/* Esquerda: Cartão + Limite */}
            <div className="flex flex-col items-start space-y-4">
              {/* Cartão */}
              <div
                className="w-[350px] h-[200px] rounded-3xl p-6 text-white relative overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, #003816 0%, #1A5E2A 50%, #0C9123 100%)`
                }}
              >
                {/* Formas geométricas */}
                <div className="absolute inset-0">
                  <div
                    className="absolute -top-10 -right-10 w-32 h-32 rotate-45 transition-all duration-1000 hover:animate-pulse"
                    style={{ backgroundColor: '#4CAF50', opacity: 0.1 }}
                  ></div>
                  <div
                    className="absolute top-16 -left-8 w-20 h-20 rounded-full transition-all duration-1000 hover:animate-pulse"
                    style={{ backgroundColor: '#0C9123', opacity: 0.15 }}
                  ></div>
                </div>

                {/* Logo do banco */}
                <div
                  className="absolute top-4 right-4 px-3 py-1 rounded-lg text-xs font-bold"
                  style={{
                    backgroundColor: '#4CAF50',
                    color: '#003816',
                    opacity: 0.9
                  }}
                >
                  AGRO BANK
                </div>

                {/* Chip */}
                <div className="w-12 h-8 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg mt-4 mb-6 relative shadow-lg">
                  <div className="absolute inset-2 bg-black bg-opacity-20 rounded"></div>
                </div>

                {/* Número do cartão */}
                <div className="text-xl font-mono tracking-widest mb-6">
                  {cardData.number}
                </div>

                {/* Info */}
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-xs opacity-75 mb-1">PORTADOR</div>
                    <div className="text-sm font-medium">
                      {cardData.holder.toUpperCase()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs opacity-75 mb-1">VÁLIDO ATÉ</div>
                    <div className="text-sm font-medium">{cardData.expiry}</div>
                  </div>
                </div>
              </div>

              {/* Limite Total */}
              <div className="bg-white rounded-xl p-4 shadow-lg w-[350px]">
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="h-4 rounded-full transition-all duration-1000"
                      style={{
                        width: `${(cardData.used / cardData.limit) * 100}%`,
                        background: `linear-gradient(to right, #0C9123, #4CAF50)`
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-gray-600">
                      Usado: R$ {cardData.used.toLocaleString('pt-BR')}
                    </span>
                    <span className="text-gray-600">
                      {((cardData.used / cardData.limit) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Limite Disponível */}
              <div className="bg-white rounded-xl p-4 shadow-lg w-[350px]">
                <div className="flex items-center gap-3 ">
                  <h3 className="font-semibold text-gray-700">Limite Disponível</h3>
                </div>
                <p className="text-2xl font-bold" style={{ color: '#0C9123' }}>
                  R$ {cardData.available.toLocaleString('pt-BR')}
                </p>
                <p className="text-sm text-gray-500">
                  de R$ {cardData.limit.toLocaleString('pt-BR')}
                </p>
              </div>
            </div>

            {/* Meio: Empréstimos + Investimentos */}
            <div className="space-y-4">
              {/* Empréstimo */}
              <div
                className="p-4 rounded-lg shadow-lg"
                style={{ backgroundColor: '#f8f9fa', borderLeft: '4px solid #0C9123' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#1A5E2A' }}>
                    <DollarSign className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Empréstimo</h3>
                    <p className="text-gray-600 text-sm">Valor da parcela</p>
                  </div>
                </div>
                <p className="text-2xl font-bold" style={{ color: '#0C9123' }}>
                  R${' '}
                  {calculateInstallment(getLoanAmount(), selectedInstallments).toLocaleString(
                    'pt-BR',
                    { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                  )}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Total: R${' '}
                  {(
                    calculateInstallment(getLoanAmount(), selectedInstallments) *
                    selectedInstallments
                  ).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </p>
              </div>

              {/* Investimentos */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#4CAF50' }}>
                    <TrendingUp className="text-white" size={20} />
                  </div>
                  <h3 className="font-bold text-gray-800">Investimentos</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">Total Investido</p>
                <p className="text-xl font-bold text-gray-800">
                  R$ {investmentData.totalInvested.toLocaleString('pt-BR')}
                </p>
                <p className="text-sm text-gray-600 mt-3">Rentabilidade Anual</p>
                <p className="text-lg font-bold" style={{ color: '#0C9123' }}>
                  +{investmentData.yearlyReturn}%
                </p>
              </div>
            </div>

            {/* Direita: Cashback */}
            <div className="bg-white h-48 rounded-xl p-6 shadow-lg ">
              <div className="text-center p-2 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-green-800">Cashback Acumulado</h3>
                <p className="text-2xl font-bold text-gray-800">
                  R${' '}
                  {cashbackData.accumulated.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </p>
              </div>

              <button
                className="w-full text-white py-2 rounded-lg font-semibold transition-colors mt-3"
                style={{ backgroundColor: '#0C9123' }}
              >
                Resgatar Cashback
              </button>
            </div>
          </div>
        )}


        {currentTab === 'loan' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Coluna esquerda: Empréstimo + input + solicitar */}
            <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#1A5E2A' }}>
                  <DollarSign className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Empréstimo Pré-aprovado</h3>
                  <p className="text-gray-600 text-sm">Taxa especial para você</p>
                </div>
              </div>

              <div className="p-4 rounded-lg" style={{ backgroundColor: '#4CAF50' }}>
                <p className="text-3xl font-bold text-white">
                  R$ {(loanData.preApproved - loanAmount).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-white opacity-90">Valor disponível</p>
              </div>

              {/* Input de valor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Valor do Empréstimo</label>
                <input
                  type="number"
                  min="0"
                  max={availableLoan} // usa valor disponível atualizado
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Math.min(Number(e.target.value), availableLoan))}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder={`Máx: R$ ${availableLoan.toLocaleString('pt-BR')}`}
                />
              </div>

              {/* Parcelas fixas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Número de Parcelas</label>
                <div className="grid grid-cols-3 gap-2">
                  {[3, 6, 12].map(option => (
                    <button
                      key={option}
                      onClick={() => setSelectedInstallments(option)}
                      className={`p-3 rounded-lg border-2 transition-colors font-semibold ${selectedInstallments === option
                        ? "text-white border-transparent"
                        : "text-gray-700 border-gray-300 hover:border-gray-400"
                        }`}
                      style={selectedInstallments === option ? { backgroundColor: "#0C9123" } : {}}
                    >
                      {option}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Botão solicitar */}
              <button
                onClick={handleRequestLoan}
                className={`w-full text-white py-3 rounded-lg font-semibold transition-colors ${remainingDebt > 0 || loanAmount <= 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                style={{ backgroundColor: "#0C9123" }}
                disabled={remainingDebt > 0 || loanAmount <= 0} // desabilita se houver dívida ou valor 0
              >
                Solicitar Empréstimo
              </button>
            </div>

            {/* Coluna direita: simulador + resultado + saldo devedor */}
            <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
              {/* Resultado da parcela */}
              <div className="p-4 rounded-lg" style={{ backgroundColor: "#f8f9fa", borderLeft: "4px solid #0C9123" }}>
                <p className="text-sm text-gray-600">Valor da parcela</p>
                <p className="text-2xl font-bold" style={{ color: "#0C9123" }}>
                  R$ {calculateInstallment(loanAmount, selectedInstallments).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Total: R$ {(calculateInstallment(loanAmount, selectedInstallments) * selectedInstallments).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Juros por parcela: R$ {(loanAmount * (selectedInstallments === 3 ? 0.02 : selectedInstallments === 6 ? 0.03 : 0.04)).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>

              {/* Saldo devedor */}
              {remainingDebt > 0 && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Saldo devedor atual</p>
                  <p className="text-xl font-bold text-gray-800">
                    R$ {remainingDebt.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Parcela {currentInstallment} de {selectedInstallments}
                  </p>
                  <button
                    onClick={handlePayEarly}
                    className="mt-2 w-full text-white py-2 rounded-lg font-semibold transition-colors"
                    style={{ backgroundColor: "#1A5E2A" }}
                  >
                    Pagar Antecipado
                  </button>
                </div>
              )}

            </div>

          </div>
        )}



        {/* Investments Tab */}
     {currentTab === 'investments' && (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 scrollbar-custom border border-white/20 rounded-xl p-6 max-h-[65vh]  overflow-y-auto">
    {/* Coluna esquerda: Fazer investimento */}
    <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 rounded-lg" style={{ backgroundColor: '#1A5E2A' }}>
          <TrendingUp className="text-white" size={24} />
        </div>
        <div>
          <h3 className="font-bold text-gray-800">Novo Investimento</h3>
          <p className="text-gray-600 text-sm">Escolha a melhor opção</p>
        </div>
      </div>

      {/* Saldo disponível */}
      <div className="p-4 rounded-lg" style={{ backgroundColor: '#4CAF50' }}>
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
            className={`p-4 rounded-lg border-2 transition-all ${
              investmentType === 'pos'
                ? 'text-white border-transparent'
                : 'text-gray-700 border-gray-300 hover:border-gray-400'
            }`}
            style={investmentType === 'pos' ? { backgroundColor: '#0C9123' } : {}}
          >
            <div className="font-semibold">Pós-fixado</div>
            <div className="text-xs mt-1 opacity-90">Liquidez diária</div>
          </button>
          <button
            onClick={() => setInvestmentType('pre')}
            className={`p-4 rounded-lg border-2 transition-all ${
              investmentType === 'pre'
                ? 'text-white border-transparent'
                : 'text-gray-700 border-gray-300 hover:border-gray-400'
            }`}
            style={investmentType === 'pre' ? { backgroundColor: '#0C9123' } : {}}
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
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          placeholder={`Máx: R$ ${totalBalance.toLocaleString('pt-BR')}`}
        />
      </div>

      {/* Prazo (apenas para pré-fixado) */}
      {investmentType === 'pre' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Prazo de Resgate</label>
          <div className="grid grid-cols-3 gap-2">
            {[90, 180, 360].map(days => (
              <button
                key={days}
                onClick={() => setInvestmentDays(days)}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  investmentDays === days
                    ? 'text-white border-transparent'
                    : 'text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
                style={investmentDays === days ? { backgroundColor: '#0C9123' } : {}}
              >
                <div className="font-semibold">{days} dias</div>
                <div className="text-xs mt-1">
                  {days === 90 && '+1.5%'}
                  {days === 180 && '+3.5%'}
                  {days === 360 && '+8%'}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Info do investimento */}
      <div className="p-4 rounded-lg" style={{ backgroundColor: '#f8f9fa', borderLeft: '4px solid #0C9123' }}>
        <p className="text-sm text-gray-600 mb-2">
          {investmentType === 'pos' ? 'Rendimento Mensal: 0.5%' : `Rendimento Total: ${investmentDays === 90 ? '1.5%' : investmentDays === 180 ? '3.5%' : '8%'}`}
        </p>
        <p className="text-lg font-bold" style={{ color: '#0C9123' }}>
          Retorno estimado: R${' '}
          {investmentType === 'pos'
            ? (investmentAmount * 0.005).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
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
        className={`w-full text-white py-3 rounded-lg font-semibold transition-colors ${
          investmentAmount <= 0 || investmentAmount > totalBalance ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        style={{ backgroundColor: '#0C9123' }}
        disabled={investmentAmount <= 0 || investmentAmount > totalBalance}
      >
        Investir Agora
      </button>
    </div>

    {/* Coluna direita: Investimentos ativos */}
    <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
      <h3 className="font-bold text-gray-800 mb-4">Meus Investimentos</h3>
      
      {activeInvestments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <PiggyBank size={48} className="mx-auto mb-3 opacity-50" />
          <p>Você ainda não possui investimentos ativos</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {activeInvestments.map(inv => {
            const isMatured = inv.type === 'pre' && Date.now() >= inv.maturityDate;
            const monthsPassed = Math.floor((Date.now() - inv.startDate) / (1000 * 60 * 60 * 24 * 30));
            const currentValue = inv.type === 'pos' 
              ? inv.amount * (1 + (0.005 * monthsPassed))
              : isMatured 
                ? inv.amount + getPreFixedReturn(inv.amount, inv.days)
                : inv.amount;

            return (
              <div key={inv.id} className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-300 transition-colors">
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
                
                <p className="text-2xl font-bold" style={{ color: '#0C9123' }}>
                  R$ {inv.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                
                <p className="text-sm text-gray-600 mt-1">
                  Valor atual: R$ {currentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                
                {inv.type === 'pos' && (
                  <p className="text-xs text-gray-500 mt-1">
                    Rendimento: +{(((currentValue - inv.amount) / inv.amount) * 100).toFixed(2)}%
                  </p>
                )}
                
                {inv.type === 'pre' && !isMatured && (
                  <p className="text-xs text-gray-500 mt-1">
                    Vencimento: {new Date(inv.maturityDate).toLocaleDateString('pt-BR')}
                  </p>
                )}

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
      )}

      {/* Resumo total */}
      {activeInvestments.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Total Investido:</span>
            <span className="font-bold text-gray-800">
              R$ {activeInvestments.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Valor Atual:</span>
            <span className="font-bold" style={{ color: '#0C9123' }}>
              R$ {activeInvestments.reduce((sum, inv) => {
                const monthsPassed = Math.floor((Date.now() - inv.startDate) / (1000 * 60 * 60 * 24 * 30));
                const isMatured = inv.type === 'pre' && Date.now() >= inv.maturityDate;
                return sum + (inv.type === 'pos' 
                  ? inv.amount * (1 + (0.005 * monthsPassed))
                  : isMatured 
                    ? inv.amount + getPreFixedReturn(inv.amount, inv.days)
                    : inv.amount);
              }, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      )}
    </div>
  </div>
)}

        {/* Cashback Tab */}
        {currentTab === 'cashback' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#1A5E2A' }}>
                  <Gift className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Cashback Acumulado</h3>
                  <p className="text-gray-600 text-sm">Seus benefícios</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-center p-4 rounded-lg" style={{ background: 'linear-gradient(135deg, #4CAF50, #0C9123)' }}>
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

                <button className="w-full text-white py-3 rounded-lg font-semibold transition-colors" style={{ backgroundColor: '#0C9123' }}>
                  Resgatar Cashback
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-gray-800 mb-4">Próximo Resgate</h3>

              <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: '#f1f8e9', borderLeft: '4px solid #0C9123' }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700">Disponível em:</span>
                  <span className="text-2xl font-bold" style={{ color: '#0C9123' }}>{cashbackData.daysUntilWithdrawal} dias</span>
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