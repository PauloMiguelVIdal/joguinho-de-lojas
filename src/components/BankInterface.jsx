import React, { useState, useEffect } from 'react';
import { CreditCard, DollarSign, TrendingUp, Gift, PiggyBank, BarChart3, Calculator, Clock, Star, Shield } from 'lucide-react';

const BankInterface = () => {
  const [selectedInstallments, setSelectedInstallments] = useState(6);
  const [selectedLoanPercentage, setSelectedLoanPercentage] = useState(100);
  const [currentTab, setCurrentTab] = useState('overview');

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

  const loanData = {
    preApproved: 45000,
    interestRate: 2.99,
    maxInstallments: 60
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Credit Card */}
            <div className="lg:col-span-2">
              <div
                className="w-full h-[220px] rounded-3xl p-6 text-white relative overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, #003816 0%, #1A5E2A 50%, #0C9123 100%)`
                }}
              >
                {/* Formas geométricas animadas */}
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
                    <div className="text-sm font-medium">{cardData.holder.toUpperCase()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs opacity-75 mb-1">VÁLIDO ATÉ</div>
                    <div className="text-sm font-medium">{cardData.expiry}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: '#4CAF50' }}>
                    <Shield className="text-white" size={20} />
                  </div>
                  <h3 className="font-semibold text-gray-700">Limite Disponível</h3>
                </div>
                <p className="text-2xl font-bold" style={{ color: '#0C9123' }}>
                  R$ {cardData.available.toLocaleString('pt-BR')}
                </p>
                <p className="text-sm text-gray-500">
                  de R$ {cardData.limit.toLocaleString('pt-BR')}
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: '#1A5E2A' }}>
                    <Clock className="text-white" size={20} />
                  </div>
                  <h3 className="font-semibold text-gray-700">Próximo Vencimento</h3>
                </div>
                <p className="text-lg font-bold text-gray-800">{cardData.dueDate}</p>
                <p className="text-sm text-gray-500">
                  Mín: R$ {cardData.minimumPayment.toLocaleString('pt-BR')}
                </p>
              </div>
            </div>

            {/* Usage Progress */}
            <div className="lg:col-span-3 bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-700 mb-4">Utilização do Limite</h3>
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
          </div>
        )}

        {/* Loan Tab */}
        {currentTab === 'loan' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#1A5E2A' }}>
                  <DollarSign className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Empréstimo Pré-aprovado</h3>
                  <p className="text-gray-600 text-sm">Taxa especial para você</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: '#4CAF50' }}>
                  <p className="text-3xl font-bold text-white">
                    R$ {loanData.preApproved.toLocaleString('pt-BR')}
                  </p>
                  <p className="text-sm text-white opacity-90">Valor disponível</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-lg font-bold text-gray-800">{loanData.interestRate}%</p>
                    <p className="text-sm text-gray-600">Taxa ao mês</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-lg font-bold text-gray-800">{loanData.maxInstallments}x</p>
                    <p className="text-sm text-gray-600">Até</p>
                  </div>
                </div>

                <button className="w-full text-white py-3 rounded-lg font-semibold transition-colors" style={{ backgroundColor: '#0C9123' }}>
                  Solicitar Empréstimo
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#003816' }}>
                  <Calculator className="text-white" size={24} />
                </div>
                <h3 className="font-bold text-gray-800">Simulador de Parcelas</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Percentual do Empréstimo
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {loanPercentages.map(option => (
                      <button
                        key={option.percentage}
                        onClick={() => setSelectedLoanPercentage(option.percentage)}
                        className={`p-3 rounded-lg border-2 transition-colors font-semibold ${selectedLoanPercentage === option.percentage
                            ? 'text-white border-transparent'
                            : 'text-gray-700 border-gray-300 hover:border-gray-400'
                          }`}
                        style={selectedLoanPercentage === option.percentage ? { backgroundColor: '#0C9123' } : {}}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Valor: R$ {getLoanAmount().toLocaleString('pt-BR')}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número de Parcelas
                  </label>
                  <select
                    value={selectedInstallments}
                    onChange={(e) => setSelectedInstallments(Number(e.target.value))}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:border-transparent"
                  >
                    {[3, 6, 12, 18, 24, 36, 48, 60].map(option => (
                      <option key={option} value={option}>{option}x</option>
                    ))}
                  </select>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: '#f8f9fa', borderLeft: '4px solid #0C9123' }}>
                  <p className="text-sm text-gray-600">Valor da parcela</p>
                  <p className="text-2xl font-bold" style={{ color: '#0C9123' }}>
                    R$ {calculateInstallment(getLoanAmount(), selectedInstallments).toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Total: R$ {(calculateInstallment(getLoanAmount(), selectedInstallments) * selectedInstallments).toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Investments Tab */}
        {currentTab === 'investments' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#4CAF50' }}>
                    <TrendingUp className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Meus Investimentos</h3>
                    <p className="text-gray-600 text-sm">Portfólio atualizado</p>
                  </div>
                </div>
                <button className="text-white px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#0C9123' }}>
                  Investir Mais
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#f1f8e9' }}>
                  <p className="text-sm text-gray-600">Total Investido</p>
                  <p className="text-2xl font-bold text-gray-800">
                    R$ {investmentData.totalInvested.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#e8f5e8' }}>
                  <p className="text-sm text-gray-600">Valor Atual</p>
                  <p className="text-2xl font-bold" style={{ color: '#0C9123' }}>
                    R$ {investmentData.currentValue.toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Rentabilidade Mensal</p>
                  <p className="text-xl font-bold" style={{ color: '#0C9123' }}>+{investmentData.monthlyReturn}%</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Rentabilidade Anual</p>
                  <p className="text-xl font-bold" style={{ color: '#0C9123' }}>+{investmentData.yearlyReturn}%</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: '#4CAF50' }}>
                    <Star className="text-white" size={20} />
                  </div>
                  <h4 className="font-semibold text-gray-700">Investimento Atual</h4>
                </div>
                <p className="font-bold" style={{ color: '#0C9123' }}>{investmentData.bestPerforming}</p>
                <p className="text-sm text-gray-600">+2.1% este mês</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: '#1A5E2A' }}>
                    <BarChart3 className="text-white" size={20} />
                  </div>
                  <h4 className="font-semibold text-gray-700">Histórico</h4>
                </div>
                <p className="font-bold text-gray-700">{investmentData.worstPerforming}</p>
                <p className="text-sm text-gray-600">Rentabilidade consistente</p>
              </div>
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

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600">Transações</p>
                    <p className="font-bold text-gray-800">47</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600">Média</p>
                    <p className="font-bold text-gray-800">R$ 156</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg" style={{ backgroundColor: '#e8f5e8' }}>
                  <p className="text-sm font-semibold text-gray-700">Dica:</p>
                  <p className="text-sm text-gray-600">Use mais o cartão para aumentar seu cashback mensal!</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BankInterface;