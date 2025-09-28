import React, { useState } from 'react';
import { Clock, DollarSign, TrendingUp, Wheat, Droplets, Package, Warehouse, Truck, Building2 } from 'lucide-react';

const GrainFarmInterface = () => {
  const [activePlanting, setActivePlanting] = useState(null);
  const [playerMoney, setPlayerMoney] = useState(300000);
  const [currentDay, setCurrentDay] = useState(124);
  const [nextSeasonDay, setNextSeasonDay] = useState(304);
  const [activeTab, setActiveTab] = useState('oferta-inicial');
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferAmount, setTransferAmount] = useState(50);
  const [transferDestination, setTransferDestination] = useState('');
  const [currentStock, setCurrentStock] = useState(50); // 50 sacas de soja no estoque

  // Cores do tema
  const colors = {
    primary: '#003816',
    secondary: '#1A5E2A',
    accent: '#0C9123',
    success: '#4CAF50',
    white: '#FFFFFF',
    lightGray: '#F8F9FA',
    mediumGray: '#6C757D',
    darkGray: '#343A40'
  };

  const grains = [
    {
      id: 1,
      name: "Milho",
      cost: 25000,
      sacas: 100,
      valorPorSaca: 450,
      duration: 120,
      deadline: 139,
      icon: "🌽"
    },
    {
      id: 2,
      name: "Soja", 
      cost: 35000,
      sacas: 50,
      valorPorSaca: 1300,
      duration: 100,
      deadline: 134,
      icon: "🫘"
    },
    {
      id: 3,
      name: "Trigo",
      cost: 20000,
      sacas: 80,
      valorPorSaca: 500,
      duration: 90,
      deadline: 142,
      icon: "🌾"
    },
    {
      id: 4,
      name: "Cevada",
      cost: 18000,
      sacas: 70,
      valorPorSaca: 500,
      duration: 85,
      deadline: 140,
      icon: "🌱"
    }
  ];

  // Dados do mercado - ofertas diferentes
  const marketOffers = [
    { name: "milho", sacas: 100, pricePerSack: 600, totalPrice: 60000 },
    { name: "soja", sacas: 50, pricePerSack: 600, totalPrice: 30000 },
    { name: "cevada", sacas: 50, pricePerSack: 800, totalPrice: 40000 },
    { name: "milho", sacas: 50, pricePerSack: 600, totalPrice: 30000 },
    { name: "soja", sacas: 50, pricePerSack: 640, totalPrice: 32000 },
    { name: "cevada", sacas: 50, pricePerSack: 1000, totalPrice: 50000 },
    { name: "soja", sacas: 50, pricePerSack: 400, totalPrice: 20000 },
    { name: "soja", sacas: 50, pricePerSack: 600, totalPrice: 30000 }
  ];

  // Capacidades dos destinos
  const destinations = {
    'cooperativa': { name: 'Cooperativa Agrícola', capacity: 500, current: 120, icon: Building2 },
    'comercio': { name: 'Comércio de Plantações', capacity: 300, current: 80, icon: Truck }
  };

  const maxSlots = 50; // Máximo de slots no estoque
  const currentSlots = Math.ceil(currentStock / 50); // Slots ocupados

  const availableGrains = grains.filter(grain => currentDay <= grain.deadline);
  
  const canChooseGrain = (grain) => {
    return !activePlanting && currentDay <= grain.deadline && playerMoney >= grain.cost;
  };

  const isGrainExpired = (grain) => {
    return currentDay > grain.deadline;
  };

  const getDaysUntilGrainDeadline = (grain) => {
    const daysLeft = grain.deadline - currentDay;
    return Math.max(0, daysLeft);
  };

  const calculateProfit = (grain) => {
    const totalValue = grain.sacas * grain.valorPorSaca;
    return totalValue - grain.cost;
  };

  const handleConfirmPlanting = (grain) => {
    if (!canChooseGrain(grain)) return;
    
    setPlayerMoney(prev => prev - grain.cost);
    setActivePlanting({
      ...grain,
      startDay: currentDay,
      endDay: currentDay + grain.duration
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatPrice = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(value);
  };

  const handleTransfer = () => {
    if (transferDestination && transferAmount >= 50) {
      setCurrentStock(prev => prev - transferAmount);
      setShowTransferModal(false);
      setTransferAmount(50);
      setTransferDestination('');
    }
  };

  const getAvailableAmounts = () => {
    const amounts = [];
    for (let i = 50; i <= currentStock; i += 50) {
      amounts.push(i);
    }
    return amounts;
  };

  const getDaysUntilNextSeason = () => {
    const daysLeft = nextSeasonDay - currentDay;
    return Math.max(0, daysLeft);
  };

  const TabButton = ({ id, label, active, onClick, icon: Icon, stockInfo }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-semibold ${
        active 
          ? 'text-white shadow-lg' 
          : 'text-gray-700 hover:bg-gray-200'
      }`}
      style={active ? { backgroundColor: colors.accent } : { backgroundColor: colors.white }}
    >
      <Icon size={16} />
      <span>{label}</span>
      {stockInfo && (
        <div className="flex items-center gap-2 ml-2">
          <div className="w-16 h-2 bg-gray-300 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-300 rounded-full"
              style={{ 
                width: `${(currentSlots / maxSlots) * 100}%`,
                backgroundColor: currentSlots >= maxSlots ? '#DC3545' : colors.accent
              }}
            />
          </div>
          <span className="text-xs">{currentSlots}/{maxSlots}</span>
        </div>
      )}
    </button>
  );

  return (
    <div 
      className="w-full h-full rounded-[20px] p-6"
      style={{
        background: `linear-gradient(135deg, ${colors.success}, ${colors.accent}, ${colors.primary})`
      }}
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg" style={{ backgroundColor: colors.white }}>
            <Wheat className="w-6 h-6" style={{ color: colors.accent }} />
          </div>
          <h1 className="text-2xl font-bold text-white">Plantação de grãos</h1>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-6">
        <TabButton 
          id="oferta-inicial" 
          label="oferta inicial" 
          icon={Warehouse}
          active={activeTab === 'oferta-inicial'} 
          onClick={setActiveTab} 
        />
        <TabButton 
          id="mercado" 
          label="mercado" 
          icon={TrendingUp}
          active={activeTab === 'mercado'} 
          onClick={setActiveTab} 
        />
        <TabButton 
          id="estoque" 
          label="estoque" 
          icon={Package}
          active={activeTab === 'estoque'} 
          onClick={setActiveTab}
          stockInfo={true}
        />
      </div>

      {/* Status Messages */}
      {activeTab === 'oferta-inicial' && (
        <div className="mb-4">
          {activePlanting ? (
            <div 
              className="border rounded-lg p-3"
              style={{
                backgroundColor: `${colors.success}20`,
                borderColor: colors.success
              }}
            >
              <h3 className="font-semibold mb-1 flex items-center gap-2 text-sm" style={{ color: colors.primary }}>
                <Droplets className="w-4 h-4" style={{ color: colors.accent }} />
                Cultivo em Andamento
              </h3>
              <div 
                className="text-xs rounded p-2"
                style={{
                  color: colors.secondary,
                  backgroundColor: colors.white
                }}
              >
                {activePlanting.icon} {activePlanting.name} - Colheita: Dia {activePlanting.endDay}
              </div>
            </div>
          ) : availableGrains.length === 0 ? (
            <div 
              className="border rounded-lg p-3 text-center"
              style={{
                backgroundColor: '#FFF3CD',
                borderColor: '#FFEAA7'
              }}
            >
              <h3 className="font-semibold text-sm mb-1" style={{ color: '#856404' }}>Temporada de Plantio Encerrada</h3>
              <p className="text-xs" style={{ color: '#6C5800' }}>
                Nova temporada em {getDaysUntilNextSeason()} dias (Dia {nextSeasonDay})
              </p>
            </div>
          ) : (
            <div 
              className="border rounded-lg p-3 text-center"
              style={{
                backgroundColor: `${colors.success}20`,
                borderColor: colors.success
              }}
            >
              <h3 className="font-semibold text-sm mb-1" style={{ color: colors.primary }}>
                🌱 Temporada de Plantio Ativa
              </h3>
           
            </div>
          )}
        </div>
      )}

      {/* Content based on active tab */}
      {activeTab === 'oferta-inicial' && (
        <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
          {grains.map((grain) => {
            const isExpired = isGrainExpired(grain);
            const canChoose = canChooseGrain(grain);
            const daysLeft = getDaysUntilGrainDeadline(grain);
            
            return (
              <div
                key={grain.id}
                className={`rounded-lg shadow-md p-4 transition-all duration-300 ${
                  canChoose
                    ? 'hover:shadow-lg hover:transform hover:scale-102'
                    : 'opacity-60'
                }`}
                style={{
                  backgroundColor: isExpired ? colors.lightGray : colors.white
                }}
              >
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{grain.icon}</span>
                      <h3 className="text-base font-bold" style={{ color: colors.primary }}>{grain.name}</h3>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" style={{ color: '#DC3545' }} />
                          <span className="text-xs" style={{ color: colors.mediumGray }}>Sementes:</span>
                        </div>
                        <span className="text-xs font-bold" style={{ color: '#DC3545' }}>{formatCurrency(grain.cost)}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Package className="w-3 h-3" style={{ color: colors.success }} />
                          <span className="text-xs" style={{ color: colors.mediumGray }}>Sacas:</span>
                        </div>
                        <span className="text-xs font-bold" style={{ color: colors.success }}>
                          {grain.sacas} X sacas (R$ {grain.valorPorSaca}/saca)
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" style={{ color: colors.accent }} />
                          <span className="text-xs" style={{ color: colors.mediumGray }}>Crescimento:</span>
                        </div>
                        <span className="text-xs font-semibold" style={{ color: colors.accent }}>{grain.duration} dias</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="mb-3">
                      <div className="text-xs" style={{ color: isExpired ? '#DC3545' : '#FF8C00' }}>
                        {isExpired ? '🚫 Expirou' : `⏰ ${daysLeft} dia(s) restante(s)`}
                      </div>
                      <div className="text-xs" style={{ color: colors.mediumGray }}>
                        Plantio até: Dia {grain.deadline}
                      </div>
                    </div>

                    <div 
                      className="mb-2 rounded p-2"
                      style={{
                        background: `linear-gradient(135deg, ${colors.success}20, ${colors.accent}20)`
                      }}
                    >
                      <div className="text-center">
                        <span className="text-xs" style={{ color: colors.mediumGray }}>Lucro: </span>
                        <span className="text-xs font-bold" style={{ color: colors.secondary }}>
                          {formatCurrency(calculateProfit(grain))}
                        </span>
                      </div>
                    </div>

                    <div 
                      className="mb-2 rounded p-2"
                      style={{ backgroundColor: '#FFF9C4' }}
                    >
                      <div className="text-center">
                        <span className="text-xs" style={{ color: colors.mediumGray }}>Ciclo: </span>
                        <span className="text-xs font-bold" style={{ color: '#F57C00' }}>
                          {grain.duration} dias
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  className="w-full px-4 py-3 rounded text-sm font-bold transition-all duration-300"
                  style={{
                    backgroundColor: canChoose ? colors.accent : colors.mediumGray,
                    color: colors.white,
                    cursor: canChoose ? 'pointer' : 'not-allowed',
                    boxShadow: canChoose ? `0 4px 8px ${colors.accent}40` : 'none'
                  }}
                  onClick={() => handleConfirmPlanting(grain)}
                  disabled={!canChoose}
                  onMouseEnter={(e) => {
                    if (canChoose) {
                      e.target.style.backgroundColor = colors.secondary;
                      e.target.style.transform = 'scale(1.02)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (canChoose) {
                      e.target.style.backgroundColor = colors.accent;
                      e.target.style.transform = 'scale(1)';
                    }
                  }}
                >
                  {isExpired 
                    ? 'Expirou'
                    : activePlanting 
                    ? 'Plantando'
                    : playerMoney < grain.cost
                    ? 'Sem Saldo'
                    : 'Plantar'
                  }
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Mercado Tab */}
      {activeTab === 'mercado' && (
        <div>
          <div className="flex justify-end mb-4">
            <div 
              className="px-3 py-1 rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: colors.primary }}
            >
              10 dias restantes
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4 max-w-6xl mx-auto">
            {marketOffers.map((offer, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all"
              >
                <h3 className="font-bold text-gray-800 mb-2 capitalize">{offer.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{offer.sacas} X sacas</p>
                <p className="text-xs text-gray-500 mb-3">R$ {offer.pricePerSack}/saca</p>
                <div 
                  className="py-2 px-4 rounded font-bold text-white text-sm"
                  style={{ backgroundColor: colors.accent }}
                >
                  {formatPrice(offer.totalPrice)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Estoque Tab */}
      {activeTab === 'estoque' && (
        <div className="space-y-6">
          {/* Estoque atual */}
          <div className="flex items-center justify-center">
            <div className="text-center text-white">
              <div className="mb-4">
                <div 
                  className="w-20 h-20 mx-auto rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Package className="w-10 h-10" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-lg mb-4">
                <span>{currentStock} x</span>
                <div 
                  className="p-2 rounded"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Wheat className="w-6 h-6" />
                </div>
                <span>soja</span>
              </div>
            </div>
          </div>

          {/* Botão Transferir */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowTransferModal(true)}
              disabled={currentStock < 50}
              className={`px-6 py-3 rounded-lg font-bold text-white transition-all ${
                currentStock >= 50 
                  ? 'hover:transform hover:scale-105 shadow-lg' 
                  : 'opacity-50 cursor-not-allowed'
              }`}
              style={{ backgroundColor: currentStock >= 50 ? colors.accent : colors.mediumGray }}
            >
              Transferir Produto
            </button>
          </div>
        </div>
      )}

      {/* Modal de Transferência */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Transferir Produto</h3>
            
            {/* Seleção de quantidade */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantidade (mínimo 50 sacas)
              </label>
              <select
                value={transferAmount}
                onChange={(e) => setTransferAmount(Number(e.target.value))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:border-transparent"
                style={{ focusRingColor: colors.accent }}
              >
                {getAvailableAmounts().map(amount => (
                  <option key={amount} value={amount}>{amount} sacas</option>
                ))}
              </select>
            </div>

            {/* Seleção de destino */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destino
              </label>
              <div className="space-y-2">
                {Object.entries(destinations).map(([key, dest]) => {
                  const Icon = dest.icon;
                  const availableSpace = dest.capacity - dest.current;
                  const canTransfer = availableSpace >= transferAmount;
                  
                  return (
                    <button
                      key={key}
                      onClick={() => setTransferDestination(key)}
                      disabled={!canTransfer}
                      className={`w-full p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                        transferDestination === key
                          ? 'border-transparent text-white'
                          : canTransfer
                          ? 'border-gray-300 hover:border-gray-400 text-gray-700'
                          : 'border-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                      }`}
                      style={transferDestination === key ? { backgroundColor: colors.accent } : {}}
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={20} />
                        <span className="font-medium">{dest.name}</span>
                      </div>
                      <div className="text-xs">
                        <div>{dest.current}/{dest.capacity}</div>
                        <div className="text-xs opacity-75">
                          {canTransfer ? `Espaço: ${availableSpace}` : 'Sem espaço'}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Botões de ação */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowTransferModal(false);
                  setTransferAmount(50);
                  setTransferDestination('');
                }}
                className="flex-1 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-bold transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleTransfer}
                disabled={!transferDestination}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                  transferDestination
                    ? 'text-white hover:transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                style={transferDestination ? { backgroundColor: colors.accent } : {}}
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

export default GrainFarmInterface;