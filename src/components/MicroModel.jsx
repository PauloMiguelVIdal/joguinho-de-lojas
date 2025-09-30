// import React, { useState } from 'react';
// import { Clock, DollarSign, TrendingUp, Wheat, Droplets, Package, Warehouse, Truck, Building2 } from 'lucide-react';

// const GrainFarmInterface = () => {
//   const [activePlanting, setActivePlanting] = useState(null);
//   const [playerMoney, setPlayerMoney] = useState(300000);
//   const [currentDay, setCurrentDay] = useState(124);
//   const [nextSeasonDay, setNextSeasonDay] = useState(304);
//   const [activeTab, setActiveTab] = useState('oferta-inicial');
//   const [showTransferModal, setShowTransferModal] = useState(false);
//   const [transferAmount, setTransferAmount] = useState(50);
//   const [transferDestination, setTransferDestination] = useState('');
//   const [currentStock, setCurrentStock] = useState(50); // 50 sacas de soja no estoque

//   // Cores do tema
//   const colors = {
//     primary: '#003816',
//     secondary: '#1A5E2A',
//     accent: '#0C9123',
//     success: '#4CAF50',
//     white: '#FFFFFF',
//     lightGray: '#F8F9FA',
//     mediumGray: '#6C757D',
//     darkGray: '#343A40'
//   };

//   const grains = [
//     {
//       id: 1,
//       name: "Milho",
//       cost: 25000,
//       sacas: 100,
//       valorPorSaca: 450,
//       duration: 120,
//       deadline: 139,
//       icon: "🌽"
//     },
//     {
//       id: 2,
//       name: "Soja", 
//       cost: 35000,
//       sacas: 50,
//       valorPorSaca: 1300,
//       duration: 100,
//       deadline: 134,
//       icon: "🫘"
//     },
//     {
//       id: 3,
//       name: "Trigo",
//       cost: 20000,
//       sacas: 80,
//       valorPorSaca: 500,
//       duration: 90,
//       deadline: 142,
//       icon: "🌾"
//     },
//     {
//       id: 4,
//       name: "Cevada",
//       cost: 18000,
//       sacas: 70,
//       valorPorSaca: 500,
//       duration: 85,
//       deadline: 140,
//       icon: "🌱"
//     }
//   ];

//   // Dados do mercado - ofertas diferentes
//   const marketOffers = [
//     { name: "milho", sacas: 100, pricePerSack: 600, totalPrice: 60000 },
//     { name: "soja", sacas: 50, pricePerSack: 600, totalPrice: 30000 },
//     { name: "cevada", sacas: 50, pricePerSack: 800, totalPrice: 40000 },
//     { name: "milho", sacas: 50, pricePerSack: 600, totalPrice: 30000 },
//     { name: "soja", sacas: 50, pricePerSack: 640, totalPrice: 32000 },
//     { name: "cevada", sacas: 50, pricePerSack: 1000, totalPrice: 50000 },
//     { name: "soja", sacas: 50, pricePerSack: 400, totalPrice: 20000 },
//     { name: "soja", sacas: 50, pricePerSack: 600, totalPrice: 30000 }
//   ];

//   // Capacidades dos destinos
//   const destinations = {
//     'cooperativa': { name: 'Cooperativa Agrícola', capacity: 500, current: 120, icon: Building2 },
//     'comercio': { name: 'Comércio de Plantações', capacity: 300, current: 80, icon: Truck }
//   };

//   const maxSlots = 50; // Máximo de slots no estoque
//   const currentSlots = Math.ceil(currentStock / 50); // Slots ocupados

//   const availableGrains = grains.filter(grain => currentDay <= grain.deadline);
  
//   const canChooseGrain = (grain) => {
//     return !activePlanting && currentDay <= grain.deadline && playerMoney >= grain.cost;
//   };

//   const isGrainExpired = (grain) => {
//     return currentDay > grain.deadline;
//   };

//   const getDaysUntilGrainDeadline = (grain) => {
//     const daysLeft = grain.deadline - currentDay;
//     return Math.max(0, daysLeft);
//   };

//   const calculateProfit = (grain) => {
//     const totalValue = grain.sacas * grain.valorPorSaca;
//     return totalValue - grain.cost;
//   };

//   const handleConfirmPlanting = (grain) => {
//     if (!canChooseGrain(grain)) return;
    
//     setPlayerMoney(prev => prev - grain.cost);
//     setActivePlanting({
//       ...grain,
//       startDay: currentDay,
//       endDay: currentDay + grain.duration
//     });
//   };

//   const formatCurrency = (value) => {
//     return new Intl.NumberFormat('pt-BR', {
//       style: 'currency',
//       currency: 'BRL',
//       minimumFractionDigits: 0
//     }).format(value);
//   };

//   const formatPrice = (value) => {
//     return new Intl.NumberFormat('pt-BR', {
//       style: 'currency',
//       currency: 'BRL',
//       minimumFractionDigits: 0
//     }).format(value);
//   };

//   const handleTransfer = () => {
//     if (transferDestination && transferAmount >= 50) {
//       setCurrentStock(prev => prev - transferAmount);
//       setShowTransferModal(false);
//       setTransferAmount(50);
//       setTransferDestination('');
//     }
//   };

//   const getAvailableAmounts = () => {
//     const amounts = [];
//     for (let i = 50; i <= currentStock; i += 50) {
//       amounts.push(i);
//     }
//     return amounts;
//   };

//   const getDaysUntilNextSeason = () => {
//     const daysLeft = nextSeasonDay - currentDay;
//     return Math.max(0, daysLeft);
//   };

//   const TabButton = ({ id, label, active, onClick, icon: Icon, stockInfo }) => (
//     <button
//       onClick={() => onClick(id)}
//       className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-semibold ${
//         active 
//           ? 'text-white shadow-lg' 
//           : 'text-gray-700 hover:bg-gray-200'
//       }`}
//       style={active ? { backgroundColor: colors.accent } : { backgroundColor: colors.white }}
//     >
//       <Icon size={16} />
//       <span>{label}</span>
//       {stockInfo && (
//         <div className="flex items-center gap-2 ml-2">
//           <div className="w-16 h-2 bg-gray-300 rounded-full overflow-hidden">
//             <div 
//               className="h-full transition-all duration-300 rounded-full"
//               style={{ 
//                 width: `${(currentSlots / maxSlots) * 100}%`,
//                 backgroundColor: currentSlots >= maxSlots ? '#DC3545' : colors.accent
//               }}
//             />
//           </div>
//           <span className="text-xs">{currentSlots}/{maxSlots}</span>
//         </div>
//       )}
//     </button>
//   );

//   return (
//     <div 
//       className="w-full h-full rounded-[20px] p-6"
//       style={{
//         background: `linear-gradient(135deg, ${colors.success}, ${colors.accent}, ${colors.primary})`
//       }}
//     >
//       {/* Header */}
//       <div className="mb-6">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="p-2 rounded-lg" style={{ backgroundColor: colors.white }}>
//             <Wheat className="w-6 h-6" style={{ color: colors.accent }} />
//           </div>
//           <h1 className="text-2xl font-bold text-white">Plantação de grãos</h1>
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="flex gap-2 mb-6">
//         <TabButton 
//           id="oferta-inicial" 
//           label="oferta inicial" 
//           icon={Warehouse}
//           active={activeTab === 'oferta-inicial'} 
//           onClick={setActiveTab} 
//         />
//         <TabButton 
//           id="mercado" 
//           label="mercado" 
//           icon={TrendingUp}
//           active={activeTab === 'mercado'} 
//           onClick={setActiveTab} 
//         />
//         <TabButton 
//           id="estoque" 
//           label="estoque" 
//           icon={Package}
//           active={activeTab === 'estoque'} 
//           onClick={setActiveTab}
//           stockInfo={true}
//         />
//       </div>

//       {/* Status Messages */}
//       {activeTab === 'oferta-inicial' && (
//         <div className="mb-4">
//           {activePlanting ? (
//             <div 
//               className="border rounded-lg p-3"
//               style={{
//                 backgroundColor: `${colors.success}20`,
//                 borderColor: colors.success
//               }}
//             >
//               <h3 className="font-semibold mb-1 flex items-center gap-2 text-sm" style={{ color: colors.primary }}>
//                 <Droplets className="w-4 h-4" style={{ color: colors.accent }} />
//                 Cultivo em Andamento
//               </h3>
//               <div 
//                 className="text-xs rounded p-2"
//                 style={{
//                   color: colors.secondary,
//                   backgroundColor: colors.white
//                 }}
//               >
//                 {activePlanting.icon} {activePlanting.name} - Colheita: Dia {activePlanting.endDay}
//               </div>
//             </div>
//           ) : availableGrains.length === 0 ? (
//             <div 
//               className="border rounded-lg p-3 text-center"
//               style={{
//                 backgroundColor: '#FFF3CD',
//                 borderColor: '#FFEAA7'
//               }}
//             >
//               <h3 className="font-semibold text-sm mb-1" style={{ color: '#856404' }}>Temporada de Plantio Encerrada</h3>
//               <p className="text-xs" style={{ color: '#6C5800' }}>
//                 Nova temporada em {getDaysUntilNextSeason()} dias (Dia {nextSeasonDay})
//               </p>
//             </div>
//           ) : (
//             <div 
//               className="border rounded-lg p-3 text-center"
//               style={{
//                 backgroundColor: `${colors.success}20`,
//                 borderColor: colors.success
//               }}
//             >
//               <h3 className="font-semibold text-sm mb-1" style={{ color: colors.primary }}>
//                 🌱 Temporada de Plantio Ativa
//               </h3>
           
//             </div>
//           )}
//         </div>
//       )}

//       {/* Content based on active tab */}
//       {activeTab === 'oferta-inicial' && (
//         <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
//           {grains.map((grain) => {
//             const isExpired = isGrainExpired(grain);
//             const canChoose = canChooseGrain(grain);
//             const daysLeft = getDaysUntilGrainDeadline(grain);
            
//             return (
//               <div
//                 key={grain.id}
//                 className={`rounded-lg shadow-md p-4 transition-all duration-300 ${
//                   canChoose
//                     ? 'hover:shadow-lg hover:transform hover:scale-102'
//                     : 'opacity-60'
//                 }`}
//                 style={{
//                   backgroundColor: isExpired ? colors.lightGray : colors.white
//                 }}
//               >
//                 <div className="flex gap-4 mb-4">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2 mb-3">
//                       <span className="text-2xl">{grain.icon}</span>
//                       <h3 className="text-base font-bold" style={{ color: colors.primary }}>{grain.name}</h3>
//                     </div>

//                     <div className="space-y-2">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-1">
//                           <DollarSign className="w-3 h-3" style={{ color: '#DC3545' }} />
//                           <span className="text-xs" style={{ color: colors.mediumGray }}>Sementes:</span>
//                         </div>
//                         <span className="text-xs font-bold" style={{ color: '#DC3545' }}>{formatCurrency(grain.cost)}</span>
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-1">
//                           <Package className="w-3 h-3" style={{ color: colors.success }} />
//                           <span className="text-xs" style={{ color: colors.mediumGray }}>Sacas:</span>
//                         </div>
//                         <span className="text-xs font-bold" style={{ color: colors.success }}>
//                           {grain.sacas} X sacas (R$ {grain.valorPorSaca}/saca)
//                         </span>
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-1">
//                           <Clock className="w-3 h-3" style={{ color: colors.accent }} />
//                           <span className="text-xs" style={{ color: colors.mediumGray }}>Crescimento:</span>
//                         </div>
//                         <span className="text-xs font-semibold" style={{ color: colors.accent }}>{grain.duration} dias</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex-1">
//                     <div className="mb-3">
//                       <div className="text-xs" style={{ color: isExpired ? '#DC3545' : '#FF8C00' }}>
//                         {isExpired ? '🚫 Expirou' : `⏰ ${daysLeft} dia(s) restante(s)`}
//                       </div>
//                       <div className="text-xs" style={{ color: colors.mediumGray }}>
//                         Plantio até: Dia {grain.deadline}
//                       </div>
//                     </div>

//                     <div 
//                       className="mb-2 rounded p-2"
//                       style={{
//                         background: `linear-gradient(135deg, ${colors.success}20, ${colors.accent}20)`
//                       }}
//                     >
//                       <div className="text-center">
//                         <span className="text-xs" style={{ color: colors.mediumGray }}>Lucro: </span>
//                         <span className="text-xs font-bold" style={{ color: colors.secondary }}>
//                           {formatCurrency(calculateProfit(grain))}
//                         </span>
//                       </div>
//                     </div>

//                     <div 
//                       className="mb-2 rounded p-2"
//                       style={{ backgroundColor: '#FFF9C4' }}
//                     >
//                       <div className="text-center">
//                         <span className="text-xs" style={{ color: colors.mediumGray }}>Ciclo: </span>
//                         <span className="text-xs font-bold" style={{ color: '#F57C00' }}>
//                           {grain.duration} dias
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   className="w-full px-4 py-3 rounded text-sm font-bold transition-all duration-300"
//                   style={{
//                     backgroundColor: canChoose ? colors.accent : colors.mediumGray,
//                     color: colors.white,
//                     cursor: canChoose ? 'pointer' : 'not-allowed',
//                     boxShadow: canChoose ? `0 4px 8px ${colors.accent}40` : 'none'
//                   }}
//                   onClick={() => handleConfirmPlanting(grain)}
//                   disabled={!canChoose}
//                   onMouseEnter={(e) => {
//                     if (canChoose) {
//                       e.target.style.backgroundColor = colors.secondary;
//                       e.target.style.transform = 'scale(1.02)';
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (canChoose) {
//                       e.target.style.backgroundColor = colors.accent;
//                       e.target.style.transform = 'scale(1)';
//                     }
//                   }}
//                 >
//                   {isExpired 
//                     ? 'Expirou'
//                     : activePlanting 
//                     ? 'Plantando'
//                     : playerMoney < grain.cost
//                     ? 'Sem Saldo'
//                     : 'Plantar'
//                   }
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Mercado Tab */}
//       {activeTab === 'mercado' && (
//         <div>
//           <div className="flex justify-end mb-4">
//             <div 
//               className="px-3 py-1 rounded-full text-xs font-bold text-white"
//               style={{ backgroundColor: colors.primary }}
//             >
//               10 dias restantes
//             </div>
//           </div>
          
//           <div className="grid grid-cols-4 gap-4 max-w-6xl mx-auto">
//             {marketOffers.map((offer, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all"
//               >
//                 <h3 className="font-bold text-gray-800 mb-2 capitalize">{offer.name}</h3>
//                 <p className="text-sm text-gray-600 mb-1">{offer.sacas} X sacas</p>
//                 <p className="text-xs text-gray-500 mb-3">R$ {offer.pricePerSack}/saca</p>
//                 <div 
//                   className="py-2 px-4 rounded font-bold text-white text-sm"
//                   style={{ backgroundColor: colors.accent }}
//                 >
//                   {formatPrice(offer.totalPrice)}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Estoque Tab */}
//       {activeTab === 'estoque' && (
//         <div className="space-y-6">
//           {/* Estoque atual */}
//           <div className="flex items-center justify-center">
//             <div className="text-center text-white">
//               <div className="mb-4">
//                 <div 
//                   className="w-20 h-20 mx-auto rounded-lg flex items-center justify-center"
//                   style={{ backgroundColor: colors.primary }}
//                 >
//                   <Package className="w-10 h-10" />
//                 </div>
//               </div>
//               <div className="flex items-center gap-2 text-lg mb-4">
//                 <span>{currentStock} x</span>
//                 <div 
//                   className="p-2 rounded"
//                   style={{ backgroundColor: colors.primary }}
//                 >
//                   <Wheat className="w-6 h-6" />
//                 </div>
//                 <span>soja</span>
//               </div>
//             </div>
//           </div>

//           {/* Botão Transferir */}
//           <div className="flex justify-center">
//             <button
//               onClick={() => setShowTransferModal(true)}
//               disabled={currentStock < 50}
//               className={`px-6 py-3 rounded-lg font-bold text-white transition-all ${
//                 currentStock >= 50 
//                   ? 'hover:transform hover:scale-105 shadow-lg' 
//                   : 'opacity-50 cursor-not-allowed'
//               }`}
//               style={{ backgroundColor: currentStock >= 50 ? colors.accent : colors.mediumGray }}
//             >
//               Transferir Produto
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Modal de Transferência */}
//       {showTransferModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Transferir Produto</h3>
            
//             {/* Seleção de quantidade */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Quantidade (mínimo 50 sacas)
//               </label>
//               <select
//                 value={transferAmount}
//                 onChange={(e) => setTransferAmount(Number(e.target.value))}
//                 className="w-full p-3 border rounded-lg focus:ring-2 focus:border-transparent"
//                 style={{ focusRingColor: colors.accent }}
//               >
//                 {getAvailableAmounts().map(amount => (
//                   <option key={amount} value={amount}>{amount} sacas</option>
//                 ))}
//               </select>
//             </div>

//             {/* Seleção de destino */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Destino
//               </label>
//               <div className="space-y-2">
//                 {Object.entries(destinations).map(([key, dest]) => {
//                   const Icon = dest.icon;
//                   const availableSpace = dest.capacity - dest.current;
//                   const canTransfer = availableSpace >= transferAmount;
                  
//                   return (
//                     <button
//                       key={key}
//                       onClick={() => setTransferDestination(key)}
//                       disabled={!canTransfer}
//                       className={`w-full p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
//                         transferDestination === key
//                           ? 'border-transparent text-white'
//                           : canTransfer
//                           ? 'border-gray-300 hover:border-gray-400 text-gray-700'
//                           : 'border-gray-200 text-gray-400 cursor-not-allowed opacity-50'
//                       }`}
//                       style={transferDestination === key ? { backgroundColor: colors.accent } : {}}
//                     >
//                       <div className="flex items-center gap-2">
//                         <Icon size={20} />
//                         <span className="font-medium">{dest.name}</span>
//                       </div>
//                       <div className="text-xs">
//                         <div>{dest.current}/{dest.capacity}</div>
//                         <div className="text-xs opacity-75">
//                           {canTransfer ? `Espaço: ${availableSpace}` : 'Sem espaço'}
//                         </div>
//                       </div>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Botões de ação */}
//             <div className="flex gap-3">
//               <button
//                 onClick={() => {
//                   setShowTransferModal(false);
//                   setTransferAmount(50);
//                   setTransferDestination('');
//                 }}
//                 className="flex-1 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-bold transition-colors"
//               >
//                 Cancelar
//               </button>
//               <button
//                 onClick={handleTransfer}
//                 disabled={!transferDestination}
//                 className={`flex-1 py-3 rounded-xl font-bold transition-all ${
//                   transferDestination
//                     ? 'text-white hover:transform hover:scale-105'
//                     : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 }`}
//                 style={transferDestination ? { backgroundColor: colors.accent } : {}}
//               >
//                 Confirmar
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GrainFarmInterface;






















































// import React, { useState } from 'react';
// import { Clock, DollarSign, TrendingUp, Building2, Truck, Package, Warehouse, MapPin, Users, AlertTriangle } from 'lucide-react';

// const GrainFarmInterface = () => {
//   const [activeProject, setActiveProject] = useState(null);
//   const [companyBalance, setCompanyBalance] = useState(15000000);
//   const [currentDay, setCurrentDay] = useState(45);
//   const [activeTab, setActiveTab] = useState('licitacoes');
//   const [showBidModal, setShowBidModal] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [bidAmount, setBidAmount] = useState(0);
//   const [currentEquipment, setCurrentEquipment] = useState(12);
//   const [currentWorkers, setCurrentWorkers] = useState(85);

//   // Cores do tema
//   const colors = {
//     primary: '#1e3a8a',
//     secondary: '#3b82f6',
//     accent: '#0ea5e9',
//     success: '#10b981',
//     warning: '#f59e0b',
//     danger: '#ef4444',
//     white: '#ffffff',
//     lightGray: '#f8f9fa',
//     mediumGray: '#6c757d',
//     darkGray: '#374151'
//   };

//   // Dados das licitações disponíveis
//   const availableProjects = [
//     {
//       id: 1,
//       name: "Hospital Regional Norte",
//       type: "Saúde",
//       location: "São Paulo - SP",
//       budget: 45000000,
//       duration: 180,
//       deadline: 65,
//       requirements: {
//         equipment: 15,
//         workers: 120,
//         expertise: "Hospitalar"
//       },
//       icon: "🏥",
//       description: "Construção de hospital com 200 leitos, UTI e centro cirúrgico",
//       profit: 8500000
//     },
//     {
//       id: 2,
//       name: "Ponte Rodoviária BR-101",
//       type: "Infraestrutura",
//       location: "Santos - SP",
//       budget: 32000000,
//       duration: 120,
//       deadline: 58,
//       requirements: {
//         equipment: 10,
//         workers: 80,
//         expertise: "Pontes"
//       },
//       icon: "🌉",
//       description: "Ponte de 800m sobre rio com pistas duplas",
//       profit: 6200000
//     },
//     {
//       id: 3,
//       name: "Porto de Contêineres",
//       type: "Portuário",
//       location: "Guarujá - SP",
//       budget: 78000000,
//       duration: 240,
//       deadline: 72,
//       requirements: {
//         equipment: 20,
//         workers: 150,
//         expertise: "Portuário"
//       },
//       icon: "⚓",
//       description: "Terminal portuário para 500 mil TEUs/ano",
//       profit: 14500000
//     },
//     {
//       id: 4,
//       name: "Escola Técnica Estadual",
//       type: "Educação",
//       location: "Campinas - SP",
//       budget: 18000000,
//       duration: 90,
//       deadline: 55,
//       requirements: {
//         equipment: 8,
//         workers: 60,
//         expertise: "Educacional"
//       },
//       icon: "🏫",
//       description: "Complexo educacional para 1200 alunos",
//       profit: 3200000
//     },
//     {
//       id: 5,
//       name: "Estádio Municipal",
//       type: "Esportivo",
//       location: "Ribeirão Preto - SP",
//       budget: 25000000,
//       duration: 150,
//       deadline: 68,
//       requirements: {
//         equipment: 12,
//         workers: 90,
//         expertise: "Esportivo"
//       },
//       icon: "🏟️",
//       description: "Estádio para 35 mil pessoas com cobertura",
//       profit: 4800000
//     },
//     {
//       id: 6,
//       name: "Metrô Linha Verde",
//       type: "Transporte",
//       location: "São Paulo - SP",
//       budget: 120000000,
//       duration: 360,
//       deadline: 75,
//       requirements: {
//         equipment: 25,
//         workers: 200,
//         expertise: "Metrô"
//       },
//       icon: "🚇",
//       description: "15km de linha subterrânea com 12 estações",
//       profit: 22000000
//     }
//   ];

//   // Equipamentos disponíveis no mercado
//   const equipmentMarket = [
//     { name: "Escavadeira CAT 320", price: 850000, type: "Terraplanagem" },
//     { name: "Betoneira Schwing", price: 450000, type: "Concreto" },
//     { name: "Guindaste Liebherr", price: 1200000, type: "Içamento" },
//     { name: "Retroescavadeira JCB", price: 320000, type: "Escavação" },
//     { name: "Rolo Compactador Bomag", price: 280000, type: "Pavimentação" },
//     { name: "Perfuratriz Atlas Copco", price: 680000, type: "Fundação" }
//   ];

//   const maxEquipmentSlots = 30;
//   const maxWorkerSlots = 250;

//   const canBidOnProject = (project) => {
//     return !activeProject && 
//            currentDay <= project.deadline && 
//            companyBalance >= (project.budget * 0.3) && // 30% do orçamento como garantia
//            currentEquipment >= project.requirements.equipment &&
//            currentWorkers >= project.requirements.workers;
//   };

//   const isProjectExpired = (project) => {
//     return currentDay > project.deadline;
//   };

//   const getDaysUntilDeadline = (project) => {
//     return Math.max(0, project.deadline - currentDay);
//   };

//   const formatCurrency = (value) => {
//     return new Intl.NumberFormat('pt-BR', {
//       style: 'currency',
//       currency: 'BRL',
//       minimumFractionDigits: 0
//     }).format(value);
//   };

//   const handleSubmitBid = () => {
//     if (selectedProject && bidAmount > 0) {
//       const guarantee = selectedProject.budget * 0.3;
//       setCompanyBalance(prev => prev - guarantee);
//       setActiveProject({
//         ...selectedProject,
//         bidAmount,
//         startDay: currentDay,
//         endDay: currentDay + selectedProject.duration,
//         guarantee
//       });
//       setShowBidModal(false);
//       setBidAmount(0);
//       setSelectedProject(null);
//     }
//   };

//   const getProjectTypeColor = (type) => {
//     const typeColors = {
//       'Saúde': '#ef4444',
//       'Infraestrutura': '#3b82f6',
//       'Portuário': '#0ea5e9',
//       'Educação': '#10b981',
//       'Esportivo': '#f59e0b',
//       'Transporte': '#8b5cf6'
//     };
//     return typeColors[type] || colors.mediumGray;
//   };

//   const TabButton = ({ id, label, active, onClick, icon: Icon, info }) => (
//     <button
//       onClick={() => onClick(id)}
//       className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-semibold ${
//         active 
//           ? 'text-white shadow-lg' 
//           : 'text-gray-700 hover:bg-gray-200'
//       }`}
//       style={active ? { backgroundColor: colors.accent } : { backgroundColor: colors.white }}
//     >
//       <Icon size={16} />
//       <span>{label}</span>
//       {info && (
//         <div className="flex items-center gap-2 ml-2">
//           <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
//             {info}
//           </span>
//         </div>
//       )}
//     </button>
//   );

//   return (
//     <div 
//       className="w-full h-full rounded-[20px] p-6"
//       style={{
//         background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`
//       }}
//     >
//       {/* Header */}
//       <div className="mb-6">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="p-2 rounded-lg" style={{ backgroundColor: colors.white }}>
//             <Building2 className="w-6 h-6" style={{ color: colors.accent }} />
//           </div>
//           <h1 className="text-2xl font-bold text-white">MegaConstrutora S.A.</h1>
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="flex gap-2 mb-6">
//         <TabButton 
//           id="licitacoes" 
//           label="Licitações" 
//           icon={Building2}
//           active={activeTab === 'licitacoes'} 
//           onClick={setActiveTab} 
//         />
//         <TabButton 
//           id="equipamentos" 
//           label="Equipamentos" 
//           icon={Truck}
//           active={activeTab === 'equipamentos'} 
//           onClick={setActiveTab}
//           info={`${currentEquipment}/${maxEquipmentSlots}`}
//         />
//         <TabButton 
//           id="recursos" 
//           label="Recursos" 
//           icon={Users}
//           active={activeTab === 'recursos'} 
//           onClick={setActiveTab}
//           info={`${currentWorkers}/${maxWorkerSlots}`}
//         />
//       </div>

//       {/* Status Messages */}
//       {activeTab === 'licitacoes' && (
//         <div className="mb-4">
//           {activeProject ? (
//             <div 
//               className="border rounded-lg p-3"
//               style={{
//                 backgroundColor: `${colors.success}20`,
//                 borderColor: colors.success
//               }}
//             >
//               <h3 className="font-semibold mb-1 flex items-center gap-2 text-sm text-white">
//                 <Building2 className="w-4 h-4" style={{ color: colors.success }} />
//                 Obra em Andamento
//               </h3>
//               <div 
//                 className="text-xs rounded p-2"
//                 style={{
//                   color: colors.primary,
//                   backgroundColor: colors.white
//                 }}
//               >
//                 {activeProject.icon} {activeProject.name} - Conclusão: Dia {activeProject.endDay}
//               </div>
//             </div>
//           ) : (
//             <div 
//               className="border rounded-lg p-3 text-center"
//               style={{
//                 backgroundColor: `${colors.warning}20`,
//                 borderColor: colors.warning
//               }}
//             >
//               <h3 className="font-semibold text-sm mb-1 text-white">
//                 🏗️ Aguardando Nova Licitação
//               </h3>
//               <p className="text-xs text-white opacity-80">
//                 Selecione um projeto para participar da concorrência
//               </p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Content based on active tab */}
//       {activeTab === 'licitacoes' && (
//         <div className="grid grid-cols-2 gap-4 max-w-6xl mx-auto">
//           {availableProjects.map((project) => {
//             const isExpired = isProjectExpired(project);
//             const canBid = canBidOnProject(project);
//             const daysLeft = getDaysUntilDeadline(project);
            
//             return (
//               <div
//                 key={project.id}
//                 className={`rounded-lg shadow-md p-4 transition-all duration-300 ${
//                   canBid
//                     ? 'hover:shadow-lg hover:transform hover:scale-102'
//                     : 'opacity-60'
//                 }`}
//                 style={{
//                   backgroundColor: isExpired ? colors.lightGray : colors.white
//                 }}
//               >
//                 <div className="flex gap-4 mb-4">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2 mb-3">
//                       <span className="text-2xl">{project.icon}</span>
//                       <div>
//                         <h3 className="text-sm font-bold" style={{ color: colors.primary }}>
//                           {project.name}
//                         </h3>
//                         <div 
//                           className="text-xs px-2 py-1 rounded text-white"
//                           style={{ backgroundColor: getProjectTypeColor(project.type) }}
//                         >
//                           {project.type}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="w-3 h-3" style={{ color: colors.mediumGray }} />
//                           <span className="text-xs" style={{ color: colors.mediumGray }}>Local:</span>
//                         </div>
//                         <span className="text-xs font-semibold">{project.location}</span>
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-1">
//                           <DollarSign className="w-3 h-3" style={{ color: colors.success }} />
//                           <span className="text-xs" style={{ color: colors.mediumGray }}>Orçamento:</span>
//                         </div>
//                         <span className="text-xs font-bold" style={{ color: colors.success }}>
//                           {formatCurrency(project.budget)}
//                         </span>
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-1">
//                           <Clock className="w-3 h-3" style={{ color: colors.accent }} />
//                           <span className="text-xs" style={{ color: colors.mediumGray }}>Prazo:</span>
//                         </div>
//                         <span className="text-xs font-semibold" style={{ color: colors.accent }}>
//                           {project.duration} dias
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex-1">
//                     <div className="mb-3">
//                       <div className="text-xs" style={{ color: isExpired ? colors.danger : colors.warning }}>
//                         {isExpired ? '🚫 Expirou' : `⏰ ${daysLeft} dia(s) para licitação`}
//                       </div>
//                       <div className="text-xs" style={{ color: colors.mediumGray }}>
//                         Licitação até: Dia {project.deadline}
//                       </div>
//                     </div>

//                     <div className="space-y-2 mb-3">
//                       <div className="text-xs" style={{ color: colors.mediumGray }}>
//                         Requisitos:
//                       </div>
//                       <div className="space-y-1">
//                         <div className="flex justify-between text-xs">
//                           <span>Equipamentos:</span>
//                           <span className={currentEquipment >= project.requirements.equipment ? 'text-green-600' : 'text-red-600'}>
//                             {project.requirements.equipment}
//                           </span>
//                         </div>
//                         <div className="flex justify-between text-xs">
//                           <span>Operários:</span>
//                           <span className={currentWorkers >= project.requirements.workers ? 'text-green-600' : 'text-red-600'}>
//                             {project.requirements.workers}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     <div 
//                       className="mb-2 rounded p-2"
//                       style={{
//                         background: `linear-gradient(135deg, ${colors.success}20, ${colors.accent}20)`
//                       }}
//                     >
//                       <div className="text-center">
//                         <span className="text-xs" style={{ color: colors.mediumGray }}>Lucro Est.: </span>
//                         <span className="text-xs font-bold" style={{ color: colors.success }}>
//                           {formatCurrency(project.profit)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="text-xs mb-3 p-2 bg-gray-50 rounded" style={{ color: colors.mediumGray }}>
//                   {project.description}
//                 </div>

//                 <button
//                   className="w-full px-4 py-3 rounded text-sm font-bold transition-all duration-300"
//                   style={{
//                     backgroundColor: canBid ? colors.accent : colors.mediumGray,
//                     color: colors.white,
//                     cursor: canBid ? 'pointer' : 'not-allowed',
//                     boxShadow: canBid ? `0 4px 8px ${colors.accent}40` : 'none'
//                   }}
//                   onClick={() => {
//                     if (canBid) {
//                       setSelectedProject(project);
//                       setBidAmount(project.budget * 0.9);
//                       setShowBidModal(true);
//                     }
//                   }}
//                   disabled={!canBid}
//                   onMouseEnter={(e) => {
//                     if (canBid) {
//                       e.target.style.backgroundColor = colors.secondary;
//                       e.target.style.transform = 'scale(1.02)';
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (canBid) {
//                       e.target.style.backgroundColor = colors.accent;
//                       e.target.style.transform = 'scale(1)';
//                     }
//                   }}
//                 >
//                   {isExpired 
//                     ? 'Licitação Encerrada'
//                     : activeProject 
//                     ? 'Obra em Andamento'
//                     : !canBid
//                     ? 'Requisitos Insuficientes'
//                     : 'Participar da Licitação'
//                   }
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Equipamentos Tab */}
//       {activeTab === 'equipamentos' && (
//         <div>
//           <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
//             {equipmentMarket.map((equipment, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all"
//               >
//                 <div className="text-center mb-3">
//                   <div className="text-2xl mb-2">🚜</div>
//                   <h3 className="font-bold text-gray-800 text-sm">{equipment.name}</h3>
//                   <p className="text-xs text-gray-500 mb-2">{equipment.type}</p>
//                 </div>
//                 <div 
//                   className="py-2 px-3 rounded font-bold text-white text-sm text-center mb-3"
//                   style={{ backgroundColor: colors.primary }}
//                 >
//                   {formatCurrency(equipment.price)}
//                 </div>
//                 <button
//                   className="w-full py-2 px-3 rounded text-sm font-bold text-white transition-all"
//                   style={{ 
//                     backgroundColor: companyBalance >= equipment.price ? colors.success : colors.mediumGray,
//                     cursor: companyBalance >= equipment.price ? 'pointer' : 'not-allowed'
//                   }}
//                   disabled={companyBalance < equipment.price || currentEquipment >= maxEquipmentSlots}
//                 >
//                   {currentEquipment >= maxEquipmentSlots ? 'Sem Espaço' : 'Comprar'}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Recursos Tab */}
//       {activeTab === 'recursos' && (
//         <div className="space-y-6">
//           <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
//             {/* Equipamentos */}
//             <div className="text-center text-white">
//               <div className="mb-4">
//                 <div 
//                   className="w-20 h-20 mx-auto rounded-lg flex items-center justify-center"
//                   style={{ backgroundColor: colors.primary }}
//                 >
//                   <Truck className="w-10 h-10" />
//                 </div>
//               </div>
//               <h3 className="text-lg font-bold mb-2">Equipamentos</h3>
//               <div className="flex items-center justify-center gap-4 mb-4">
//                 <span className="text-2xl font-bold">{currentEquipment}</span>
//                 <span>/</span>
//                 <span className="text-xl">{maxEquipmentSlots}</span>
//               </div>
//               <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
//                 <div 
//                   className="h-3 rounded-full transition-all duration-300"
//                   style={{ 
//                     width: `${(currentEquipment / maxEquipmentSlots) * 100}%`,
//                     backgroundColor: colors.success
//                   }}
//                 />
//               </div>
//             </div>

//             {/* Funcionários */}
//             <div className="text-center text-white">
//               <div className="mb-4">
//                 <div 
//                   className="w-20 h-20 mx-auto rounded-lg flex items-center justify-center"
//                   style={{ backgroundColor: colors.primary }}
//                 >
//                   <Users className="w-10 h-10" />
//                 </div>
//               </div>
//               <h3 className="text-lg font-bold mb-2">Operários</h3>
//               <div className="flex items-center justify-center gap-4 mb-4">
//                 <span className="text-2xl font-bold">{currentWorkers}</span>
//                 <span>/</span>
//                 <span className="text-xl">{maxWorkerSlots}</span>
//               </div>
//               <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
//                 <div 
//                   className="h-3 rounded-full transition-all duration-300"
//                   style={{ 
//                     width: `${(currentWorkers / maxWorkerSlots) * 100}%`,
//                     backgroundColor: colors.warning
//                   }}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Informações da empresa */}
//           <div 
//             className="max-w-2xl mx-auto p-4 rounded-lg"
//             style={{ backgroundColor: colors.white, opacity: 0.95 }}
//           >
//             <div className="grid grid-cols-2 gap-4 text-center">
//               <div>
//                 <h4 className="font-bold text-gray-800 mb-2">Saldo Atual</h4>
//                 <p className="text-lg font-bold" style={{ color: colors.success }}>
//                   {formatCurrency(companyBalance)}
//                 </p>
//               </div>
//               <div>
//                 <h4 className="font-bold text-gray-800 mb-2">Dia Atual</h4>
//                 <p className="text-lg font-bold" style={{ color: colors.primary }}>
//                   Dia {currentDay}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modal de Licitação */}
//       {showBidModal && selectedProject && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">
//               Participar da Licitação
//             </h3>
            
//             <div className="mb-4 p-4 bg-gray-50 rounded-lg">
//               <h4 className="font-bold text-gray-800 mb-2">
//                 {selectedProject.icon} {selectedProject.name}
//               </h4>
//               <p className="text-sm text-gray-600 mb-2">{selectedProject.description}</p>
//               <div className="text-sm">
//                 <strong>Orçamento:</strong> {formatCurrency(selectedProject.budget)}
//               </div>
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Sua Proposta (máx: {formatCurrency(selectedProject.budget)})
//               </label>
//               <input
//                 type="number"
//                 value={bidAmount}
//                 onChange={(e) => setBidAmount(Number(e.target.value))}
//                 max={selectedProject.budget}
//                 min={selectedProject.budget * 0.7}
//                 className="w-full p-3 border rounded-lg focus:ring-2 focus:border-transparent"
//                 style={{ focusRingColor: colors.accent }}
//               />
//               <p className="text-xs text-gray-500 mt-1">
//                 Mínimo: {formatCurrency(selectedProject.budget * 0.7)} (70% do orçamento)
//               </p>
//             </div>

//             <div className="mb-6 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
//               <div className="flex items-center gap-2 mb-2">
//                 <AlertTriangle className="w-4 h-4 text-yellow-600" />
//                 <span className="text-sm font-medium text-yellow-800">Garantia Exigida</span>
//               </div>
//               <p className="text-sm text-yellow-700">
//                 Será descontado {formatCurrency(selectedProject.budget * 0.3)} como garantia da licitação.
//               </p>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 onClick={() => {
//                   setShowBidModal(false);
//                   setSelectedProject(null);
//                   setBidAmount(0);
//                 }}
//                 className="flex-1 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-bold transition-colors"
//               >
//                 Cancelar
//               </button>
//               <button
//                 onClick={handleSubmitBid}
//                 disabled={bidAmount === 0 || bidAmount > selectedProject.budget}
//                 className={`flex-1 py-3 rounded-xl font-bold transition-all ${
//                   bidAmount > 0 && bidAmount <= selectedProject.budget
//                     ? 'text-white hover:transform hover:scale-105'
//                     : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 }`}
//                 style={bidAmount > 0 && bidAmount <= selectedProject.budget ? { backgroundColor: colors.accent } : {}}
//               >
//                 Enviar Proposta
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GrainFarmInterface;









































// import React, { useState } from 'react';
// import { Clock, DollarSign, TrendingUp, Home, Car, Package, MapPin, Users, Star, Eye, Phone } from 'lucide-react';

// const GrainFarmInterface = () => {
//   const [activeNegotiation, setActiveNegotiation] = useState(null);
//   const [companyBalance, setCompanyBalance] = useState(2500000);
//   const [currentMonth, setCurrentMonth] = useState(3);
//   const [activeTab, setActiveTab] = useState('imoveis');
//   const [showNegotiationModal, setShowNegotiationModal] = useState(false);
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [offerAmount, setOfferAmount] = useState(0);
//   const [currentInventory, setCurrentInventory] = useState(12);
//   const [totalSalesThisMonth, setTotalSalesThisMonth] = useState(3);
//   const [clientSatisfaction, setClientSatisfaction] = useState(4.8);

//   // Cores do tema
//   const colors = {
//     primary: '#059669',
//     secondary: '#10b981',
//     accent: '#34d399',
//     luxury: '#7c3aed',
//     warning: '#f59e0b',
//     danger: '#ef4444',
//     white: '#ffffff',
//     lightGray: '#f8f9fa',
//     mediumGray: '#6c757d',
//     darkGray: '#374151'
//   };

//   // Imóveis disponíveis no portfólio
//   const availableProperties = [
//     {
//       id: 1,
//       title: "Terreno Residencial - Alphaville",
//       type: "Terreno",
//       category: "terreno",
//       location: "Alphaville, Barueri - SP",
//       price: 450000,
//       area: 300,
//       features: ["300m²", "Documentação OK", "Pronto para construir"],
//       description: "Terreno plano em condomínio fechado de alto padrão",
//       commission: 22500, // 5%
//       daysOnMarket: 15,
//       viewings: 8,
//       interested: 3,
//       icon: "🏞️",
//       images: 12,
//       virtual_tour: false
//     },
//     {
//       id: 2,
//       title: "Casa 2 Quartos - Vila Madalena",
//       type: "Casa",
//       category: "pequeno",
//       location: "Vila Madalena, São Paulo - SP",
//       price: 680000,
//       area: 85,
//       features: ["2 quartos", "1 banheiro", "Garagem", "Quintal"],
//       description: "Casa charmosa em bairro boêmio, ideal para jovem casal",
//       commission: 40800, // 6%
//       daysOnMarket: 22,
//       viewings: 12,
//       interested: 5,
//       icon: "🏠",
//       images: 18,
//       virtual_tour: true
//     },
//     {
//       id: 3,
//       title: "Apartamento 3 Quartos - Moema",
//       type: "Apartamento",
//       category: "medio",
//       location: "Moema, São Paulo - SP",
//       price: 950000,
//       area: 120,
//       features: ["3 quartos", "2 banheiros", "Sacada", "1 vaga", "Lazer completo"],
//       description: "Apartamento moderno em prédio com academia e piscina",
//       commission: 66500, // 7%
//       daysOnMarket: 8,
//       viewings: 15,
//       interested: 7,
//       icon: "🏢",
//       images: 25,
//       virtual_tour: true
//     },
//     {
//       id: 4,
//       title: "Cobertura Duplex - Jardins",
//       type: "Cobertura",
//       category: "grande",
//       location: "Jardins, São Paulo - SP",
//       price: 2800000,
//       area: 250,
//       features: ["4 suítes", "3 vagas", "Terraço", "Churrasqueira", "Vista panorâmica"],
//       description: "Cobertura de luxo no coração dos Jardins",
//       commission: 224000, // 8%
//       daysOnMarket: 35,
//       viewings: 6,
//       interested: 2,
//       icon: "🏰",
//       images: 40,
//       virtual_tour: true
//     },
//     {
//       id: 5,
//       title: "Casa de Condomínio - Granja Viana",
//       type: "Casa Condomínio",
//       category: "grande",
//       location: "Granja Viana, Cotia - SP",
//       price: 1850000,
//       area: 320,
//       features: ["4 quartos", "4 banheiros", "Piscina", "4 vagas", "Área gourmet"],
//       description: "Casa espaçosa em condomínio fechado com segurança 24h",
//       commission: 129500, // 7%
//       daysOnMarket: 18,
//       viewings: 9,
//       interested: 4,
//       icon: "🏡",
//       images: 35,
//       virtual_tour: true
//     },
//     {
//       id: 6,
//       title: "Studio - Vila Olímpia",
//       type: "Studio",
//       category: "pequeno",
//       location: "Vila Olímpia, São Paulo - SP",
//       price: 420000,
//       area: 35,
//       features: ["35m²", "1 banheiro", "Mobiliado", "Academia", "Rooftop"],
//       description: "Studio moderno ideal para executivos",
//       commission: 25200, // 6%
//       daysOnMarket: 5,
//       viewings: 20,
//       interested: 8,
//       icon: "🏨",
//       images: 15,
//       virtual_tour: true
//     }
//   ];

//   // Serviços adicionais oferecidos pela imobiliária
//   const additionalServices = [
//     { name: "Avaliação Imobiliária", price: 800, icon: "📊" },
//     { name: "Tour Virtual 360°", price: 1200, icon: "🎥" },
//     { name: "Home Staging", price: 3500, icon: "🎨" },
//     { name: "Documentação Legal", price: 2000, icon: "📋" },
//     { name: "Financiamento Imobiliário", price: 1500, icon: "🏦" },
//     { name: "Seguro Residencial", price: 900, icon: "🛡️" }
//   ];

//   // Clientes interessados (leads)
//   const clientLeads = [
//     { name: "Maria Silva", interest: "Apartamento 2-3 quartos", budget: "800k-1M", contact: "Há 2 dias" },
//     { name: "João Santos", interest: "Casa com quintal", budget: "600k-800k", contact: "Há 5 dias" },
//     { name: "Ana Costa", interest: "Investimento - Studio", budget: "300k-500k", contact: "Hoje" },
//     { name: "Roberto Lima", interest: "Cobertura de luxo", budget: "2M+", contact: "Há 1 semana" }
//   ];

//   const maxInventorySlots = 20;

//   const canNegotiateProperty = (property) => {
//     return !activeNegotiation && property.interested > 0;
//   };

//   const getPriorityLevel = (property) => {
//     if (property.daysOnMarket > 30) return 'Alta';
//     if (property.daysOnMarket > 15) return 'Média';
//     return 'Baixa';
//   };

//   const getPriorityColor = (priority) => {
//     switch(priority) {
//       case 'Alta': return colors.danger;
//       case 'Média': return colors.warning;
//       case 'Baixa': return colors.secondary;
//       default: return colors.mediumGray;
//     }
//   };

//   const getCategoryColor = (category) => {
//     const categoryColors = {
//       'terreno': '#8b5cf6',
//       'pequeno': '#10b981',
//       'medio': '#3b82f6',
//       'grande': '#7c3aed'
//     };
//     return categoryColors[category] || colors.mediumGray;
//   };

//   const formatCurrency = (value) => {
//     return new Intl.NumberFormat('pt-BR', {
//       style: 'currency',
//       currency: 'BRL',
//       minimumFractionDigits: 0
//     }).format(value);
//   };

//   const handleStartNegotiation = () => {
//     if (selectedProperty && offerAmount > 0) {
//       setActiveNegotiation({
//         ...selectedProperty,
//         offerAmount,
//         startMonth: currentMonth,
//         status: 'Em Negociação'
//       });
//       setShowNegotiationModal(false);
//       setOfferAmount(0);
//       setSelectedProperty(null);
//     }
//   };

//   const getMarketTemperature = () => {
//     const averageDays = availableProperties.reduce((sum, prop) => sum + prop.daysOnMarket, 0) / availableProperties.length;
//     if (averageDays < 15) return { status: 'Aquecido', color: colors.danger, icon: '🔥' };
//     if (averageDays < 25) return { status: 'Normal', color: colors.warning, icon: '🌤️' };
//     return { status: 'Frio', color: colors.secondary, icon: '❄️' };
//   };

//   const TabButton = ({ id, label, active, onClick, icon: Icon, info }) => (
//     <button
//       onClick={() => onClick(id)}
//       className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-semibold ${
//         active 
//           ? 'text-white shadow-lg' 
//           : 'text-gray-700 hover:bg-gray-200'
//       }`}
//       style={active ? { backgroundColor: colors.primary } : { backgroundColor: colors.white }}
//     >
//       <Icon size={16} />
//       <span>{label}</span>
//       {info && (
//         <div className="flex items-center gap-2 ml-2">
//           <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
//             {info}
//           </span>
//         </div>
//       )}
//     </button>
//   );

//   const marketTemp = getMarketTemperature();

//   return (
//     <div 
//       className="w-full h-full rounded-[20px] p-6"
//       style={{
//         background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`
//       }}
//     >
//       {/* Header */}
//       <div className="mb-6">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="p-2 rounded-lg" style={{ backgroundColor: colors.white }}>
//             <Home className="w-6 h-6" style={{ color: colors.primary }} />
//           </div>
//           <h1 className="text-2xl font-bold text-white">PrimeImoveis Residencial</h1>
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="flex gap-2 mb-6">
//         <TabButton 
//           id="imoveis" 
//           label="Portfólio" 
//           icon={Home}
//           active={activeTab === 'imoveis'} 
//           onClick={setActiveTab} 
//           info={`${currentInventory}/${maxInventorySlots}`}
//         />
//         <TabButton 
//           id="servicos" 
//           label="Serviços" 
//           icon={Package}
//           active={activeTab === 'servicos'} 
//           onClick={setActiveTab}
//         />
//         <TabButton 
//           id="leads" 
//           label="Clientes" 
//           icon={Users}
//           active={activeTab === 'leads'} 
//           onClick={setActiveTab}
//           info={clientLeads.length}
//         />
//       </div>

//       {/* Status Dashboard */}
//       <div className="grid grid-cols-4 gap-4 mb-6">
//         <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center text-white">
//           <div className="text-2xl font-bold">{formatCurrency(companyBalance)}</div>
//           <div className="text-xs opacity-80">Saldo Atual</div>
//         </div>
//         <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center text-white">
//           <div className="text-2xl font-bold">{totalSalesThisMonth}</div>
//           <div className="text-xs opacity-80">Vendas Mês</div>
//         </div>
//         <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center text-white flex items-center justify-center gap-2">
//           <div>
//             <div className="text-lg font-bold flex items-center gap-1">
//               {marketTemp.icon} {marketTemp.status}
//             </div>
//             <div className="text-xs opacity-80">Mercado</div>
//           </div>
//         </div>
//         <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center text-white">
//           <div className="text-2xl font-bold flex items-center justify-center gap-1">
//             <Star className="w-5 h-5 text-yellow-300" />
//             {clientSatisfaction}
//           </div>
//           <div className="text-xs opacity-80">Satisfação</div>
//         </div>
//       </div>

//       {/* Status Messages */}
//       {activeTab === 'imoveis' && (
//         <div className="mb-4">
//           {activeNegotiation ? (
//             <div 
//               className="border rounded-lg p-3"
//               style={{
//                 backgroundColor: `${colors.warning}20`,
//                 borderColor: colors.warning
//               }}
//             >
//               <h3 className="font-semibold mb-1 flex items-center gap-2 text-sm text-white">
//                 <Phone className="w-4 h-4" style={{ color: colors.warning }} />
//                 Negociação em Andamento
//               </h3>
//               <div 
//                 className="text-xs rounded p-2"
//                 style={{
//                   color: colors.primary,
//                   backgroundColor: colors.white
//                 }}
//               >
//                 {activeNegotiation.icon} {activeNegotiation.title} - Proposta: {formatCurrency(activeNegotiation.offerAmount)}
//               </div>
//             </div>
//           ) : (
//             <div 
//               className="border rounded-lg p-3 text-center"
//               style={{
//                 backgroundColor: `${colors.secondary}20`,
//                 borderColor: colors.secondary
//               }}
//             >
//               <h3 className="font-semibold text-sm mb-1 text-white">
//                 🏠 {availableProperties.length} Imóveis Disponíveis
//               </h3>
//               <p className="text-xs text-white opacity-80">
//                 {availableProperties.filter(p => p.interested > 0).length} imóveis com interessados
//               </p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Content based on active tab */}
//       {activeTab === 'imoveis' && (
//         <div className="grid grid-cols-2 gap-4 max-w-6xl mx-auto">
//           {availableProperties.map((property) => {
//             const canNegotiate = canNegotiateProperty(property);
//             const priority = getPriorityLevel(property);
            
//             return (
//               <div
//                 key={property.id}
//                 className={`rounded-lg shadow-md p-4 transition-all duration-300 ${
//                   canNegotiate
//                     ? 'hover:shadow-lg hover:transform hover:scale-102'
//                     : 'opacity-60'
//                 }`}
//                 style={{ backgroundColor: colors.white }}
//               >
//                 <div className="flex gap-4 mb-4">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2 mb-3">
//                       <span className="text-2xl">{property.icon}</span>
//                       <div className="flex-1">
//                         <h3 className="text-sm font-bold" style={{ color: colors.primary }}>
//                           {property.title}
//                         </h3>
//                         <div className="flex gap-2 mt-1">
//                           <div 
//                             className="text-xs px-2 py-1 rounded text-white"
//                             style={{ backgroundColor: getCategoryColor(property.category) }}
//                           >
//                             {property.type}
//                           </div>
//                           <div 
//                             className="text-xs px-2 py-1 rounded text-white"
//                             style={{ backgroundColor: getPriorityColor(priority) }}
//                           >
//                             {priority}
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="w-3 h-3" style={{ color: colors.mediumGray }} />
//                           <span className="text-xs" style={{ color: colors.mediumGray }}>Local:</span>
//                         </div>
//                         <span className="text-xs font-semibold">{property.location}</span>
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-1">
//                           <DollarSign className="w-3 h-3" style={{ color: colors.primary }} />
//                           <span className="text-xs" style={{ color: colors.mediumGray }}>Preço:</span>
//                         </div>
//                         <span className="text-xs font-bold" style={{ color: colors.primary }}>
//                           {formatCurrency(property.price)}
//                         </span>
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-1">
//                           <Package className="w-3 h-3" style={{ color: colors.secondary }} />
//                           <span className="text-xs" style={{ color: colors.mediumGray }}>Área:</span>
//                         </div>
//                         <span className="text-xs font-semibold" style={{ color: colors.secondary }}>
//                           {property.area}m²
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex-1">
//                     <div className="mb-3 space-y-2">
//                       <div className="flex items-center justify-between text-xs">
//                         <span style={{ color: colors.mediumGray }}>No mercado:</span>
//                         <span className="font-semibold">{property.daysOnMarket} dias</span>
//                       </div>
                      
//                       <div className="flex items-center justify-between text-xs">
//                         <div className="flex items-center gap-1">
//                           <Eye className="w-3 h-3" style={{ color: colors.accent }} />
//                           <span style={{ color: colors.mediumGray }}>Visitas:</span>
//                         </div>
//                         <span className="font-semibold">{property.viewings}</span>
//                       </div>

//                       <div className="flex items-center justify-between text-xs">
//                         <div className="flex items-center gap-1">
//                           <Users className="w-3 h-3" style={{ color: colors.warning }} />
//                           <span style={{ color: colors.mediumGray }}>Interessados:</span>
//                         </div>
//                         <span className="font-bold" style={{ color: colors.warning }}>
//                           {property.interested}
//                         </span>
//                       </div>
//                     </div>

//                     <div 
//                       className="mb-2 rounded p-2"
//                       style={{
//                         background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`
//                       }}
//                     >
//                       <div className="text-center">
//                         <span className="text-xs" style={{ color: colors.mediumGray }}>Comissão: </span>
//                         <span className="text-xs font-bold" style={{ color: colors.primary }}>
//                           {formatCurrency(property.commission)}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="flex gap-1 mb-2">
//                       {property.virtual_tour && (
//                         <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
//                           360°
//                         </div>
//                       )}
//                       <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
//                         {property.images} fotos
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="text-xs mb-3 p-2 bg-gray-50 rounded" style={{ color: colors.mediumGray }}>
//                   {property.description}
//                 </div>

//                 <div className="mb-3">
//                   <div className="flex flex-wrap gap-1">
//                     {property.features.map((feature, idx) => (
//                       <span 
//                         key={idx}
//                         className="text-xs px-2 py-1 rounded-full"
//                         style={{ backgroundColor: `${colors.secondary}20`, color: colors.primary }}
//                       >
//                         {feature}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 <button
//                   className="w-full px-4 py-3 rounded text-sm font-bold transition-all duration-300"
//                   style={{
//                     backgroundColor: canNegotiate ? colors.primary : colors.mediumGray,
//                     color: colors.white,
//                     cursor: canNegotiate ? 'pointer' : 'not-allowed',
//                     boxShadow: canNegotiate ? `0 4px 8px ${colors.primary}40` : 'none'
//                   }}
//                   onClick={() => {
//                     if (canNegotiate) {
//                       setSelectedProperty(property);
//                       setOfferAmount(property.price * 0.95);
//                       setShowNegotiationModal(true);
//                     }
//                   }}
//                   disabled={!canNegotiate}
//                   onMouseEnter={(e) => {
//                     if (canNegotiate) {
//                       e.target.style.backgroundColor = colors.secondary;
//                       e.target.style.transform = 'scale(1.02)';
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (canNegotiate) {
//                       e.target.style.backgroundColor = colors.primary;
//                       e.target.style.transform = 'scale(1)';
//                     }
//                   }}
//                 >
//                   {activeNegotiation 
//                     ? 'Negociação em Andamento'
//                     : property.interested === 0
//                     ? 'Sem Interessados'
//                     : 'Iniciar Negociação'
//                   }
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Serviços Tab */}
//       {activeTab === 'servicos' && (
//         <div>
//           <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
//             {additionalServices.map((service, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all text-center"
//               >
//                 <div className="text-3xl mb-3">{service.icon}</div>
//                 <h3 className="font-bold text-gray-800 text-sm mb-2">{service.name}</h3>
//                 <div 
//                   className="py-2 px-3 rounded font-bold text-white text-sm mb-3"
//                   style={{ backgroundColor: colors.primary }}
//                 >
//                   {formatCurrency(service.price)}
//                 </div>
//                 <button
//                   className="w-full py-2 px-3 rounded text-sm font-bold text-white transition-all"
//                   style={{ backgroundColor: colors.secondary }}
//                 >
//                   Contratar
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Clientes Tab */}
//       {activeTab === 'leads' && (
//         <div className="space-y-4 max-w-4xl mx-auto">
//           {clientLeads.map((client, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all"
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div 
//                     className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
//                     style={{ backgroundColor: colors.primary }}
//                   >
//                     {client.name.charAt(0)}
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-gray-800">{client.name}</h3>
//                     <p className="text-sm text-gray-600">{client.interest}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="font-bold" style={{ color: colors.primary }}>
//                     {client.budget}
//                   </div>
//                   <div className="text-xs text-gray-500">
//                     Contato: {client.contact}
//                   </div>
//                 </div>
//                 <button
//                   className="py-2 px-4 rounded text-sm font-bold text-white transition-all"
//                   style={{ backgroundColor: colors.secondary }}
//                 >
//                   Contatar
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Modal de Negociação */}
//       {showNegotiationModal && selectedProperty && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">
//               Iniciar Negociação
//             </h3>
            
//             <div className="mb-4 p-4 bg-gray-50 rounded-lg">
//               <h4 className="font-bold text-gray-800 mb-2">
//                 {selectedProperty.icon} {selectedProperty.title}
//               </h4>
//               <p className="text-sm text-gray-600 mb-2">{selectedProperty.description}</p>
//               <div className="flex justify-between text-sm">
//                 <span><strong>Preço:</strong> {formatCurrency(selectedProperty.price)}</span>
//                 <span><strong>Interessados:</strong> {selectedProperty.interested}</span>
//               </div>
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Proposta do Cliente (Sugestão: {formatCurrency(selectedProperty.price * 0.95)})
//               </label>
//               <input
//                 type="number"
//                 value={offerAmount}
//                 onChange={(e) => setOfferAmount(Number(e.target.value))}
//                 max={selectedProperty.price}
//                 min={selectedProperty.price * 0.8}
//                 className="w-full p-3 border rounded-lg focus:ring-2 focus:border-transparent"
//                 style={{ focusRingColor: colors.primary }}
//               />
//               <p className="text-xs text-gray-500 mt-1">
//                 Mínimo: {formatCurrency(selectedProperty.price * 0.8)} (80% do preço)
//               </p>
//             </div>

//             <div className="mb-6 p-3 bg-green-50 rounded-lg border border-green-200">
//               <div className="text-sm font-medium text-green-800 mb-2">
//                 Comissão Estimada: {formatCurrency(selectedProperty.commission)}
//               </div>
//               <p className="text-sm text-green-700">
//                 {((selectedProperty.commission / selectedProperty.price) * 100).toFixed(1)}% do valor do imóvel
//               </p>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 onClick={() => {
//                   setShowNegotiationModal(false);
//                   setSelectedProperty(null);
//                   setOfferAmount(0);
//                 }}
//                 className="flex-1 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-bold transition-colors"
//               >
//                 Cancelar
//               </button>
//               <button
//                 onClick={handleStartNegotiation}
//                 disabled={offerAmount === 0 || offerAmount > selectedProperty.price}
//                 className={`flex-1 py-3 rounded-xl font-bold transition-all ${
//                   offerAmount > 0 && offerAmount <= selectedProperty.price
//                     ? 'text-white hover:transform hover:scale-105'
//                     : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 }`}
//                 style={offerAmount > 0 && offerAmount <= selectedProperty.price ? { backgroundColor: colors.primary } : {}}
//               >
//                 Iniciar Negociação
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GrainFarmInterface;























// import React, { useState } from 'react';
// import { Clock, DollarSign, TrendingUp, Package, Heart, Warehouse, Truck, Calendar, Users } from 'lucide-react';

// const GrainFarmInterface = () => {
//   const [farmBalance, setFarmBalance] = useState(800000);
//   const [currentDay, setCurrentDay] = useState(85);
//   const [activeTab, setActiveTab] = useState('ofertas');
//   const [showPurchaseModal, setShowPurchaseModal] = useState(false);
//   const [selectedOffer, setSelectedOffer] = useState(null);
//   const [currentAdultCattle, setCurrentAdultCattle] = useState(15); // bois adultos
//   const [currentCalves, setCurrentCalves] = useState(8); // bezerros crescendo
//   const [calvesQueue, setCalvesQueue] = useState([
//     { quantity: 5, matureDay: currentDay + 120 },
//     { quantity: 3, matureDay: currentDay + 150 }
//   ]); // fila de bezerros amadurecendo

//   // Cores do tema
//   const colors = {
//     primary: '#8B4513',
//     secondary: '#D2691E',
//     accent: '#CD853F',
//     success: '#228B22',
//     white: '#FFFFFF',
//     lightGray: '#F8F9FA',
//     mediumGray: '#6C757D',
//     darkGray: '#343A40',
//     calf: '#FFE4B5',
//     adult: '#8B4513'
//   };

//   const maxCattleCapacity = 50;
//   const totalCattle = currentAdultCattle + currentCalves;

//   // Ofertas de compra (renovadas a cada 30 dias)
//   const purchaseOffers = [
//     {
//       id: 1,
//       type: 'adult',
//       quantity: 10,
//       price: 150000,
//       pricePerHead: 15000,
//       description: 'Bois adultos prontos para venda',
//       icon: '🐂'
//     },
//     {
//       id: 2,
//       type: 'adult',
//       quantity: 20,
//       price: 280000,
//       pricePerHead: 14000,
//       description: 'Lote grande com desconto',
//       icon: '🐂'
//     },
//     {
//       id: 3,
//       type: 'adult',
//       quantity: 5,
//       price: 80000,
//       pricePerHead: 16000,
//       description: 'Lote pequeno premium',
//       icon: '🐂'
//     },
//     {
//       id: 4,
//       type: 'adult',
//       quantity: 15,
//       price: 210000,
//       pricePerHead: 14000,
//       description: 'Gado selecionado para engorda',
//       icon: '🐂'
//     },
//     {
//       id: 5,
//       type: 'calf',
//       quantity: 5,
//       price: 40000,
//       pricePerHead: 8000,
//       description: 'Bezerros para crescimento (180 dias)',
//       maturityDays: 180,
//       icon: '🐄'
//     },
//     {
//       id: 6,
//       type: 'calf',
//       quantity: 10,
//       price: 70000,
//       pricePerHead: 7000,
//       description: 'Lote de bezerros com desconto (180 dias)',
//       maturityDays: 180,
//       icon: '🐄'
//     }
//   ];

//   // Ofertas de venda no mercado (renovadas a cada período)
//   const marketOffers = [
//     {
//       id: 1,
//       type: 'spot',
//       quantity: 20,
//       pricePerHead: 12000,
//       totalPrice: 240000,
//       description: 'Venda imediata - Frigorífico Regional',
//       deadline: 'Até 7 dias',
//       icon: '📦'
//     },
//     {
//       id: 2,
//       type: 'spot',
//       quantity: 35,
//       pricePerHead: 11500,
//       totalPrice: 402500,
//       description: 'Lote grande - Exportação',
//       deadline: 'Até 15 dias',
//       icon: '🚢'
//     },
//     {
//       id: 3,
//       type: 'contract',
//       quantity: 50,
//       pricePerHead: 13000,
//       totalPrice: 650000,
//       description: 'Contrato futuro - Entrega em 90 dias',
//       deadline: '90 dias',
//       icon: '📋'
//     },
//     {
//       id: 4,
//       type: 'spot',
//       quantity: 15,
//       pricePerHead: 12500,
//       totalPrice: 187500,
//       description: 'Açougues locais - Bom preço',
//       deadline: 'Até 10 dias',
//       icon: '🥩'
//     },
//     {
//       id: 5,
//       type: 'contract',
//       quantity: 25,
//       pricePerHead: 12800,
//       totalPrice: 320000,
//       description: 'Contrato semestral - Entrega em 180 dias',
//       deadline: '180 dias',
//       icon: '📋'
//     }
//   ];

//   const canPurchaseOffer = (offer) => {
//     return farmBalance >= offer.price && 
//            (totalCattle + offer.quantity) <= maxCattleCapacity;
//   };

//   const canSellOffer = (offer) => {
//     return currentAdultCattle >= offer.quantity;
//   };

//   const handlePurchase = (offer) => {
//     if (!canPurchaseOffer(offer)) return;
    
//     setFarmBalance(prev => prev - offer.price);
    
//     if (offer.type === 'adult') {
//       setCurrentAdultCattle(prev => prev + offer.quantity);
//     } else if (offer.type === 'calf') {
//       setCurrentCalves(prev => prev + offer.quantity);
//       setCalvesQueue(prev => [...prev, {
//         quantity: offer.quantity,
//         matureDay: currentDay + offer.maturityDays
//       }]);
//     }
//   };

//   const getDaysUntilNextMaturity = () => {
//     if (calvesQueue.length === 0) return null;
//     const nextMaturity = Math.min(...calvesQueue.map(calf => calf.matureDay));
//     return Math.max(0, nextMaturity - currentDay);
//   };

//   const formatCurrency = (value) => {
//     return new Intl.NumberFormat('pt-BR', {
//       style: 'currency',
//       currency: 'BRL',
//       minimumFractionDigits: 0
//     }).format(value);
//   };

//   const getOfferTypeColor = (type) => {
//     if (type === 'adult') return colors.adult;
//     if (type === 'calf') return colors.calf;
//     if (type === 'spot') return colors.success;
//     if (type === 'contract') return colors.secondary;
//     return colors.mediumGray;
//   };

//   const TabButton = ({ id, label, active, onClick, icon: Icon, info }) => (
//     <button
//       onClick={() => onClick(id)}
//       className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-semibold ${
//         active 
//           ? 'text-white shadow-lg' 
//           : 'text-gray-700 hover:bg-gray-200'
//       }`}
//       style={active ? { backgroundColor: colors.accent } : { backgroundColor: colors.white }}
//     >
//       <Icon size={16} />
//       <span>{label}</span>
//       {info && (
//         <div className="flex items-center gap-2 ml-2">
//           <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
//             {info}
//           </span>
//         </div>
//       )}
//     </button>
//   );

//   return (
//     <div 
//       className="w-full h-full rounded-[20px] p-6"
//       style={{
//         background: `linear-gradient(135deg, ${colors.success}, ${colors.accent}, ${colors.primary})`
//       }}
//     >
//       {/* Header */}
//       <div className="mb-6">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="p-2 rounded-lg" style={{ backgroundColor: colors.white }}>
//             <Heart className="w-6 h-6" style={{ color: colors.accent }} />
//           </div>
//           <h1 className="text-2xl font-bold text-white">Fazenda Boi Gordo</h1>
//         </div>
//       </div>

//       {/* Status Dashboard */}
//       <div className="grid grid-cols-4 gap-4 mb-6">
//         <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center text-white">
//           <div className="text-2xl font-bold">{formatCurrency(farmBalance)}</div>
//           <div className="text-xs opacity-80">Saldo Atual</div>
//         </div>
//         <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center text-white">
//           <div className="text-2xl font-bold">{currentAdultCattle}</div>
//           <div className="text-xs opacity-80">Bois Adultos</div>
//         </div>
//         <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center text-white">
//           <div className="text-2xl font-bold">{currentCalves}</div>
//           <div className="text-xs opacity-80">Bezerros</div>
//         </div>
//         <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center text-white">
//           <div className="text-2xl font-bold">{totalCattle}/{maxCattleCapacity}</div>
//           <div className="text-xs opacity-80">Capacidade</div>
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="flex gap-2 mb-6">
//         <TabButton 
//           id="ofertas" 
//           label="Comprar Gado" 
//           icon={Users}
//           active={activeTab === 'ofertas'} 
//           onClick={setActiveTab} 
//         />
//         <TabButton 
//           id="mercado" 
//           label="Vender Gado" 
//           icon={TrendingUp}
//           active={activeTab === 'mercado'} 
//           onClick={setActiveTab} 
//         />
//         <TabButton 
//           id="rebanho" 
//           label="Meu Rebanho" 
//           icon={Heart}
//           active={activeTab === 'rebanho'} 
//           onClick={setActiveTab}
//           info={`${totalCattle} cabeças`}
//         />
//       </div>

//       {/* Status Messages */}
//       <div className="mb-4">
//         {activeTab === 'ofertas' && (
//           <div 
//             className="border rounded-lg p-3 text-center"
//             style={{
//               backgroundColor: `${colors.accent}20`,
//               borderColor: colors.accent
//             }}
//           >
//             <h3 className="font-semibold text-sm mb-1" style={{ color: colors.primary }}>
//               🐂 Ofertas do Período - Renovação em 15 dias
//             </h3>
//             <p className="text-xs" style={{ color: colors.secondary }}>
//               4 ofertas de gado adulto • 2 ofertas de bezerros
//             </p>
//           </div>
//         )}

//         {activeTab === 'mercado' && (
//           <div 
//             className="border rounded-lg p-3 text-center"
//             style={{
//               backgroundColor: `${colors.success}20`,
//               borderColor: colors.success
//             }}
//           >
//             <h3 className="font-semibold text-sm mb-1" style={{ color: colors.primary }}>
//               💰 Mercado de Venda Ativo
//             </h3>
//             <p className="text-xs" style={{ color: colors.secondary }}>
//               {currentAdultCattle} bois disponíveis para venda
//             </p>
//           </div>
//         )}

//         {activeTab === 'rebanho' && getDaysUntilNextMaturity() !== null && (
//           <div 
//             className="border rounded-lg p-3"
//             style={{
//               backgroundColor: `${colors.secondary}20`,
//               borderColor: colors.secondary
//             }}
//           >
//             <h3 className="font-semibold mb-1 flex items-center gap-2 text-sm" style={{ color: colors.primary }}>
//               <Clock className="w-4 h-4" style={{ color: colors.secondary }} />
//               Próximos Bezerros Adultos
//             </h3>
//             <div 
//               className="text-xs rounded p-2"
//               style={{
//                 color: colors.secondary,
//                 backgroundColor: colors.white
//               }}
//             >
//               Em {getDaysUntilNextMaturity()} dias você terá mais bois adultos prontos para venda
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Content based on active tab */}
//       {activeTab === 'ofertas' && (
//         <div className="grid grid-cols-2 gap-4 max-w-6xl mx-auto">
//           {purchaseOffers.map((offer) => {
//             const canPurchase = canPurchaseOffer(offer);
//             const capacityIssue = (totalCattle + offer.quantity) > maxCattleCapacity;
//             const balanceIssue = farmBalance < offer.price;
            
//             return (
//               <div
//                 key={offer.id}
//                 className={`rounded-lg shadow-md p-4 transition-all duration-300 ${
//                   canPurchase
//                     ? 'hover:shadow-lg hover:transform hover:scale-102'
//                     : 'opacity-60'
//                 }`}
//                 style={{ backgroundColor: colors.white }}
//               >
//                 <div className="flex gap-4 mb-4">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2 mb-3">
//                       <span className="text-2xl">{offer.icon}</span>
//                       <div className="flex-1">
//                         <h3 className="text-base font-bold" style={{ color: colors.primary }}>
//                           {offer.quantity} {offer.type === 'adult' ? 'Bois Adultos' : 'Bezerros'}
//                         </h3>
//                         <div 
//                           className="text-xs px-2 py-1 rounded text-white"
//                           style={{ backgroundColor: getOfferTypeColor(offer.type) }}
//                         >
//                           {offer.type === 'adult' ? 'Entrega Imediata' : '180 dias p/ adulto'}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-1">
//                           <DollarSign className="w-3 h-3" style={{ color: colors.primary }} />
//                           <span className="text-xs" style={{ color: colors.mediumGray }}>Total:</span>
//                         </div>
//                         <span className="text-xs font-bold" style={{ color: colors.primary }}>
//                           {formatCurrency(offer.price)}
//                         </span>
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-1">
//                           <Package className="w-3 h-3" style={{ color: colors.success }} />
//                           <span className="text-xs" style={{ color: colors.mediumGray }}>Por cabeça:</span>
//                         </div>
//                         <span className="text-xs font-bold" style={{ color: colors.success }}>
//                           {formatCurrency(offer.pricePerHead)}
//                         </span>
//                       </div>

//                       {offer.type === 'calf' && (
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-1">
//                             <Clock className="w-3 h-3" style={{ color: colors.accent }} />
//                             <span className="text-xs" style={{ color: colors.mediumGray }}>Maturação:</span>
//                           </div>
//                           <span className="text-xs font-semibold" style={{ color: colors.accent }}>
//                             {offer.maturityDays} dias
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="text-xs mb-3 p-2 bg-gray-50 rounded" style={{ color: colors.mediumGray }}>
//                   {offer.description}
//                 </div>

//                 {!canPurchase && (
//                   <div className="text-xs mb-3 p-2 bg-red-50 rounded border border-red-200">
//                     {capacityIssue && (
//                       <div className="text-red-600">
//                         ⚠️ Capacidade insuficiente ({totalCattle + offer.quantity}/{maxCattleCapacity})
//                       </div>
//                     )}
//                     {balanceIssue && (
//                       <div className="text-red-600">
//                         💰 Saldo insuficiente
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 <button
//                   className="w-full px-4 py-3 rounded text-sm font-bold transition-all duration-300"
//                   style={{
//                     backgroundColor: canPurchase ? colors.accent : colors.mediumGray,
//                     color: colors.white,
//                     cursor: canPurchase ? 'pointer' : 'not-allowed',
//                     boxShadow: canPurchase ? `0 4px 8px ${colors.accent}40` : 'none'
//                   }}
//                   onClick={() => handlePurchase(offer)}
//                   disabled={!canPurchase}
//                   onMouseEnter={(e) => {
//                     if (canPurchase) {
//                       e.target.style.backgroundColor = colors.secondary;
//                       e.target.style.transform = 'scale(1.02)';
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (canPurchase) {
//                       e.target.style.backgroundColor = colors.accent;
//                       e.target.style.transform = 'scale(1)';
//                     }
//                   }}
//                 >
//                   {canPurchase 
//                     ? 'Comprar Lote'
//                     : capacityIssue 
//                     ? 'Sem Capacidade'
//                     : 'Sem Saldo'
//                   }
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Mercado Tab */}
//       {activeTab === 'mercado' && (
//         <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto">
//           {marketOffers.map((offer) => {
//             const canSell = canSellOffer(offer);
            
//             return (
//               <div
//                 key={offer.id}
//                 className={`rounded-lg shadow-md p-4 transition-all duration-300 ${
//                   canSell
//                     ? 'hover:shadow-lg hover:transform hover:scale-102'
//                     : 'opacity-60'
//                 }`}
//                 style={{ backgroundColor: colors.white }}
//               >
//                 <div className="text-center mb-3">
//                   <div className="text-3xl mb-2">{offer.icon}</div>
//                   <h3 className="font-bold text-gray-800 text-sm mb-1">
//                     {offer.quantity} Bois
//                   </h3>
//                   <div 
//                     className="text-xs px-2 py-1 rounded text-white mb-2"
//                     style={{ backgroundColor: getOfferTypeColor(offer.type) }}
//                   >
//                     {offer.type === 'spot' ? 'Venda Imediata' : 'Contrato Futuro'}
//                   </div>
//                 </div>

//                 <div className="space-y-2 mb-3">
//                   <div className="flex justify-between text-xs">
//                     <span style={{ color: colors.mediumGray }}>Por cabeça:</span>
//                     <span className="font-bold">{formatCurrency(offer.pricePerHead)}</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span style={{ color: colors.mediumGray }}>Total:</span>
//                     <span className="font-bold" style={{ color: colors.success }}>
//                       {formatCurrency(offer.totalPrice)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-xs">
//                     <span style={{ color: colors.mediumGray }}>Prazo:</span>
//                     <span className="font-semibold">{offer.deadline}</span>
//                   </div>
//                 </div>

//                 <div className="text-xs mb-3 p-2 bg-gray-50 rounded" style={{ color: colors.mediumGray }}>
//                   {offer.description}
//                 </div>

//                 <button
//                   className="w-full py-3 px-3 rounded text-sm font-bold transition-all"
//                   style={{ 
//                     backgroundColor: canSell ? colors.success : colors.mediumGray,
//                     color: colors.white,
//                     cursor: canSell ? 'pointer' : 'not-allowed'
//                   }}
//                   disabled={!canSell}
//                 >
//                   {canSell ? 'Vender' : `Precisa ${offer.quantity} bois`}
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Rebanho Tab */}
//       {activeTab === 'rebanho' && (
//         <div className="space-y-6">
//           {/* Status do rebanho */}
//           <div className="grid grid-cols-2 gap-6">
//             {/* Gado Adulto */}
//             <div className="text-center text-white">
//               <div className="mb-4">
//                 <div 
//                   className="w-20 h-20 mx-auto rounded-lg flex items-center justify-center"
//                   style={{ backgroundColor: colors.primary }}
//                 >
//                   <span className="text-3xl">🐂</span>
//                 </div>
//               </div>
//               <div className="text-2xl font-bold mb-2">{currentAdultCattle}</div>
//               <div className="text-sm opacity-80 mb-4">Bois Adultos</div>
              
//               <div className="w-full bg-white bg-opacity-20 rounded-full h-3 mb-2">
//                 <div 
//                   className="h-3 rounded-full transition-all duration-300"
//                   style={{ 
//                     width: `${(currentAdultCattle / maxCattleCapacity) * 100}%`,
//                     backgroundColor: colors.success
//                   }}
//                 />
//               </div>
//               <div className="text-xs opacity-80">Prontos para venda</div>
//             </div>

//             {/* Bezerros */}
//             <div className="text-center text-white">
//               <div className="mb-4">
//                 <div 
//                   className="w-20 h-20 mx-auto rounded-lg flex items-center justify-center"
//                   style={{ backgroundColor: colors.primary }}
//                 >
//                   <span className="text-3xl">🐄</span>
//                 </div>
//               </div>
//               <div className="text-2xl font-bold mb-2">{currentCalves}</div>
//               <div className="text-sm opacity-80 mb-4">Bezerros</div>
              
//               <div className="w-full bg-white bg-opacity-20 rounded-full h-3 mb-2">
//                 <div 
//                   className="h-3 rounded-full transition-all duration-300"
//                   style={{ 
//                     width: `${(currentCalves / maxCattleCapacity) * 100}%`,
//                     backgroundColor: colors.secondary
//                   }}
//                 />
//               </div>
//               <div className="text-xs opacity-80">Crescendo</div>
//             </div>
//           </div>

//           {/* Fila de maturação */}
//           {calvesQueue.length > 0 && (
//             <div 
//               className="max-w-2xl mx-auto p-4 rounded-lg"
//               style={{ backgroundColor: colors.white, opacity: 0.95 }}
//             >
//               <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
//                 <Calendar className="w-4 h-4" />
//                 Cronograma de Maturação
//               </h4>
//               <div className="space-y-2">
//                 {calvesQueue.map((batch, index) => {
//                   const daysLeft = Math.max(0, batch.matureDay - currentDay);
//                   return (
//                     <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
//                       <span className="text-sm">
//                         {batch.quantity} bezerros
//                       </span>
//                       <span className="text-sm font-semibold" style={{ color: colors.primary }}>
//                         {daysLeft === 0 ? 'Prontos!' : `${daysLeft} dias`}
//                       </span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* Capacidade total */}
//           <div 
//             className="max-w-2xl mx-auto p-4 rounded-lg"
//             style={{ backgroundColor: colors.white, opacity: 0.95 }}
//           >
//             <div className="text-center">
//               <h4 className="font-bold text-gray-800 mb-2">Capacidade da Fazenda</h4>
//               <div className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>
//                 {totalCattle} / {maxCattleCapacity}
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-4">
//                 <div 
//                   className="h-4 rounded-full transition-all duration-300"
//                   style={{ 
//                     width: `${(totalCattle / maxCattleCapacity) * 100}%`,
//                     backgroundColor: totalCattle >= maxCattleCapacity ? '#DC3545' : colors.success
//                   }}
//                 />
//               </div>
//               <div className="text-xs text-gray-600 mt-2">
//                 Espaço disponível: {maxCattleCapacity - totalCattle} cabeças
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GrainFarmInterface;



import React, { useState } from 'react';
import { Clock, DollarSign, TrendingUp, Package, Thermometer, ShoppingCart, Truck, Users, AlertTriangle } from 'lucide-react';

const GrainFarmInterface = () => {
  const [shopBalance, setShopBalance] = useState(120000);
  const [currentDay, setCurrentDay] = useState(85);
  const [activeTab, setActiveTab] = useState('compras');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [currentStock, setCurrentStock] = useState({
    beef: 45,      // kg de carne bovina
    pork: 20,      // kg de carne suína  
    chicken: 30,   // kg de frango
    sausage: 15    // kg de linguiça/embutidos
  });

  const colors = {
    primary: '#8B0000',
    secondary: '#DC143C',
    accent: '#FF6347',
    success: '#228B22',
    white: '#FFFFFF',
    lightGray: '#F8F9FA',
    mediumGray: '#6C757D',
    darkGray: '#343A40',
    beef: '#8B4513',
    pork: '#FFB6C1',
    chicken: '#F5DEB3',
    sausage: '#CD853F'
  };

  const maxStorageCapacity = 200; // kg total
  const currentTotalStock = Object.values(currentStock).reduce((sum, qty) => sum + qty, 0);

  // Fornecedores de carne (renovados periodicamente)
  const suppliers = [
    {
      id: 1,
      name: 'Frigorífico Regional',
      type: 'beef',
      quantity: 50,
      price: 1200,
      pricePerKg: 24,
      quality: 'Premium',
      freshness: 7, // dias até vencer
      description: 'Carne bovina de primeira qualidade',
      icon: '🥩'
    },
    {
      id: 2,
      name: 'Fazenda São José',
      type: 'beef',
      quantity: 30,
      price: 600,
      pricePerKg: 20,
      quality: 'Padrão',
      freshness: 5,
      description: 'Carne bovina tradicional',
      icon: '🥩'
    },
    {
      id: 3,
      name: 'Suínos Premium',
      type: 'pork',
      quantity: 25,
      price: 500,
      pricePerKg: 20,
      quality: 'Premium',
      freshness: 4,
      description: 'Carne suína especial',
      icon: '🥓'
    },
    {
      id: 4,
      name: 'Granja Feliz',
      type: 'chicken',
      quantity: 40,
      price: 320,
      pricePerKg: 8,
      quality: 'Orgânico',
      freshness: 3,
      description: 'Frango orgânico criado livre',
      icon: '🍗'
    },
    {
      id: 5,
      name: 'Embutidos Artesanais',
      type: 'sausage',
      quantity: 20,
      price: 400,
      pricePerKg: 20,
      quality: 'Artesanal',
      freshness: 10,
      description: 'Linguiças e embutidos artesanais',
      icon: '🌭'
    },
    {
      id: 6,
      name: 'Atacado Carne & Cia',
      type: 'beef',
      quantity: 80,
      price: 1440,
      pricePerKg: 18,
      quality: 'Comercial',
      freshness: 4,
      description: 'Lote grande com desconto',
      icon: '🥩'
    }
  ];

  // Ofertas de venda para clientes
  const customerOffers = [
    {
      id: 1,
      customer: 'Restaurante Italiano',
      products: [
        { type: 'beef', quantity: 15, pricePerKg: 35, total: 525 }
      ],
      deadline: 'Até 3 dias',
      repeat: 'Semanal',
      description: 'Cliente fixo - restaurante tradicional'
    },
    {
      id: 2,
      customer: 'Churrascaria Pampa',
      products: [
        { type: 'beef', quantity: 25, pricePerKg: 32, total: 800 },
        { type: 'sausage', quantity: 10, pricePerKg: 28, total: 280 }
      ],
      deadline: 'Até 5 dias',
      repeat: 'Quinzenal',
      description: 'Grande cliente corporativo'
    },
    {
      id: 3,
      customer: 'Mercado do Bairro',
      products: [
        { type: 'chicken', quantity: 20, pricePerKg: 14, total: 280 },
        { type: 'pork', quantity: 10, pricePerKg: 28, total: 280 }
      ],
      deadline: 'Até 2 dias',
      repeat: 'Diário',
      description: 'Fornecimento para varejo local'
    },
    {
      id: 4,
      customer: 'Festa de Casamento',
      products: [
        { type: 'beef', quantity: 40, pricePerKg: 38, total: 1520 },
        { type: 'chicken', quantity: 30, pricePerKg: 16, total: 480 },
        { type: 'sausage', quantity: 15, pricePerKg: 30, total: 450 }
      ],
      deadline: 'Até 10 dias',
      repeat: 'Único',
      description: 'Evento especial - margem alta'
    }
  ];

  const canPurchase = (supplier) => {
    return shopBalance >= supplier.price && 
           (currentTotalStock + supplier.quantity) <= maxStorageCapacity;
  };

  const canFulfillOrder = (offer) => {
    return offer.products.every(product => 
      currentStock[product.type] >= product.quantity
    );
  };

  const getProductColor = (type) => {
    const productColors = {
      'beef': colors.beef,
      'pork': colors.pork,
      'chicken': colors.chicken,
      'sausage': colors.sausage
    };
    return productColors[type] || colors.mediumGray;
  };

  const getProductIcon = (type) => {
    const icons = {
      'beef': '🥩',
      'pork': '🥓',
      'chicken': '🍗',
      'sausage': '🌭'
    };
    return icons[type] || '📦';
  };

  const getQualityColor = (quality) => {
    const qualityColors = {
      'Premium': colors.success,
      'Orgânico': colors.success,
      'Artesanal': colors.accent,
      'Padrão': colors.secondary,
      'Comercial': colors.mediumGray
    };
    return qualityColors[quality] || colors.mediumGray;
  };

  const handlePurchase = (supplier) => {
    if (!canPurchase(supplier)) return;
    
    setShopBalance(prev => prev - supplier.price);
    setCurrentStock(prev => ({
      ...prev,
      [supplier.type]: prev[supplier.type] + supplier.quantity
    }));
  };

  const calculateOrderTotal = (offer) => {
    return offer.products.reduce((sum, product) => sum + product.total, 0);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(value);
  };

  const TabButton = ({ id, label, active, onClick, icon: Icon, info }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-semibold ${
        active 
          ? 'text-white shadow-lg' 
          : 'text-gray-700 hover:bg-gray-200'
      }`}
      style={active ? { backgroundColor: colors.primary } : { backgroundColor: colors.white }}
    >
      <Icon size={16} />
      <span>{label}</span>
      {info && (
        <div className="flex items-center gap-2 ml-2">
          <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
            {info}
          </span>
        </div>
      )}
    </button>
  );

  return (
    <div 
      className="w-full h-full rounded-[20px] p-6"
      style={{
        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`
      }}
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg" style={{ backgroundColor: colors.white }}>
            <ShoppingCart className="w-6 h-6" style={{ color: colors.primary }} />
          </div>
          <h1 className="text-2xl font-bold text-white">Açougue Bom Corte</h1>
        </div>
      </div>

      {/* Status Dashboard */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center text-white">
          <div className="text-2xl font-bold">{formatCurrency(shopBalance)}</div>
          <div className="text-xs opacity-80">Saldo Atual</div>
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center text-white">
          <div className="text-2xl font-bold">{currentTotalStock}kg</div>
          <div className="text-xs opacity-80">Estoque Total</div>
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center text-white">
          <div className="text-2xl font-bold">{maxStorageCapacity - currentTotalStock}kg</div>
          <div className="text-xs opacity-80">Espaço Livre</div>
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center text-white">
          <div className="text-2xl font-bold flex items-center justify-center gap-1">
            <Thermometer className="w-5 h-5" />
            -2°C
          </div>
          <div className="text-xs opacity-80">Câmara Fria</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-6">
        <TabButton 
          id="compras" 
          label="Fornecedores" 
          icon={Truck}
          active={activeTab === 'compras'} 
          onClick={setActiveTab} 
        />
        <TabButton 
          id="vendas" 
          label="Pedidos" 
          icon={Users}
          active={activeTab === 'vendas'} 
          onClick={setActiveTab} 
        />
        <TabButton 
          id="estoque" 
          label="Estoque" 
          icon={Package}
          active={activeTab === 'estoque'} 
          onClick={setActiveTab}
          info={`${currentTotalStock}/${maxStorageCapacity}kg`}
        />
      </div>

      {/* Status Messages */}
      <div className="mb-4">
        {activeTab === 'compras' && (
          <div 
            className="border rounded-lg p-3 text-center"
            style={{
              backgroundColor: `${colors.accent}20`,
              borderColor: colors.accent
            }}
          >
            <h3 className="font-semibold text-sm mb-1 text-white">
              🚚 Fornecedores Disponíveis - Entregas Diárias
            </h3>
            <p className="text-xs text-white opacity-80">
              Carne fresca entregue na madrugada • Preços atualizados diariamente
            </p>
          </div>
        )}

        {activeTab === 'vendas' && (
          <div 
            className="border rounded-lg p-3 text-center"
            style={{
              backgroundColor: `${colors.success}20`,
              borderColor: colors.success
            }}
          >
            <h3 className="font-semibold text-sm mb-1 text-white">
              👥 Pedidos Ativos - Clientes Esperando
            </h3>
            <p className="text-xs text-white opacity-80">
              {customerOffers.filter(offer => canFulfillOrder(offer)).length} pedidos podem ser atendidos
            </p>
          </div>
        )}

        {activeTab === 'estoque' && (
          <div 
            className="border rounded-lg p-3 text-center"
            style={{
              backgroundColor: `${colors.secondary}20`,
              borderColor: colors.secondary
            }}
          >
            <h3 className="font-semibold text-sm mb-1 text-white">
              📦 Câmara Fria Operando
            </h3>
            <p className="text-xs text-white opacity-80">
              Temperatura controlada • Produtos conservados adequadamente
            </p>
          </div>
        )}
      </div>

      {/* Content based on active tab */}
      {activeTab === 'compras' && (
        <div className="grid grid-cols-2 gap-4 max-w-6xl mx-auto">
          {suppliers.map((supplier) => {
            const canPurchaseThis = canPurchase(supplier);
            const capacityIssue = (currentTotalStock + supplier.quantity) > maxStorageCapacity;
            const balanceIssue = shopBalance < supplier.price;
            
            return (
              <div
                key={supplier.id}
                className={`rounded-lg shadow-md p-4 transition-all duration-300 ${
                  canPurchaseThis
                    ? 'hover:shadow-lg hover:transform hover:scale-102'
                    : 'opacity-60'
                }`}
                style={{ backgroundColor: colors.white }}
              >
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{supplier.icon}</span>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold" style={{ color: colors.primary }}>
                          {supplier.name}
                        </h3>
                        <div className="flex gap-2 mt-1">
                          <div 
                            className="text-xs px-2 py-1 rounded text-white"
                            style={{ backgroundColor: getProductColor(supplier.type) }}
                          >
                            {supplier.quantity}kg
                          </div>
                          <div 
                            className="text-xs px-2 py-1 rounded text-white"
                            style={{ backgroundColor: getQualityColor(supplier.quality) }}
                          >
                            {supplier.quality}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" style={{ color: colors.primary }} />
                          <span className="text-xs" style={{ color: colors.mediumGray }}>Total:</span>
                        </div>
                        <span className="text-xs font-bold" style={{ color: colors.primary }}>
                          {formatCurrency(supplier.price)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Package className="w-3 h-3" style={{ color: colors.success }} />
                          <span className="text-xs" style={{ color: colors.mediumGray }}>Por kg:</span>
                        </div>
                        <span className="text-xs font-bold" style={{ color: colors.success }}>
                          {formatCurrency(supplier.pricePerKg)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" style={{ color: colors.accent }} />
                          <span className="text-xs" style={{ color: colors.mediumGray }}>Validade:</span>
                        </div>
                        <span className="text-xs font-semibold" style={{ color: colors.accent }}>
                          {supplier.freshness} dias
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-xs mb-3 p-2 bg-gray-50 rounded" style={{ color: colors.mediumGray }}>
                  {supplier.description}
                </div>

                {!canPurchaseThis && (
                  <div className="text-xs mb-3 p-2 bg-red-50 rounded border border-red-200">
                    {capacityIssue && (
                      <div className="text-red-600 mb-1">
                        ⚠️ Capacidade insuficiente ({currentTotalStock + supplier.quantity}/{maxStorageCapacity}kg)
                      </div>
                    )}
                    {balanceIssue && (
                      <div className="text-red-600">
                        💰 Saldo insuficiente
                      </div>
                    )}
                  </div>
                )}

                <button
                  className="w-full px-4 py-3 rounded text-sm font-bold transition-all duration-300"
                  style={{
                    backgroundColor: canPurchaseThis ? colors.primary : colors.mediumGray,
                    color: colors.white,
                    cursor: canPurchaseThis ? 'pointer' : 'not-allowed',
                    boxShadow: canPurchaseThis ? `0 4px 8px ${colors.primary}40` : 'none'
                  }}
                  onClick={() => handlePurchase(supplier)}
                  disabled={!canPurchaseThis}
                  onMouseEnter={(e) => {
                    if (canPurchaseThis) {
                      e.target.style.backgroundColor = colors.secondary;
                      e.target.style.transform = 'scale(1.02)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (canPurchaseThis) {
                      e.target.style.backgroundColor = colors.primary;
                      e.target.style.transform = 'scale(1)';
                    }
                  }}
                >
                  {canPurchaseThis 
                    ? 'Comprar'
                    : capacityIssue 
                    ? 'Sem Espaço'
                    : 'Sem Saldo'
                  }
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Vendas Tab */}
      {activeTab === 'vendas' && (
        <div className="grid grid-cols-2 gap-4 max-w-6xl mx-auto">
          {customerOffers.map((offer) => {
            const canFulfill = canFulfillOrder(offer);
            const orderTotal = calculateOrderTotal(offer);
            
            return (
              <div
                key={offer.id}
                className={`rounded-lg shadow-md p-4 transition-all duration-300 ${
                  canFulfill
                    ? 'hover:shadow-lg hover:transform hover:scale-102'
                    : 'opacity-60'
                }`}
                style={{ backgroundColor: colors.white }}
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold" style={{ color: colors.primary }}>
                      {offer.customer}
                    </h3>
                    <div className="flex gap-2">
                      <div 
                        className="text-xs px-2 py-1 rounded text-white"
                        style={{ backgroundColor: colors.secondary }}
                      >
                        {offer.repeat}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-xs mb-3" style={{ color: colors.mediumGray }}>
                    {offer.description}
                  </div>

                  <div className="space-y-2 mb-3">
                    {offer.products.map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{getProductIcon(product.type)}</span>
                          <span className="text-xs">{product.quantity}kg</span>
                          <span className="text-xs" style={{ color: colors.mediumGray }}>
                            @ {formatCurrency(product.pricePerKg)}/kg
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold">
                            {formatCurrency(product.total)}
                          </span>
                          {currentStock[product.type] >= product.quantity ? (
                            <span className="text-xs text-green-600">✓</span>
                          ) : (
                            <span className="text-xs text-red-600">✗</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-2 mb-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold">Total do Pedido:</span>
                      <span className="text-sm font-bold" style={{ color: colors.success }}>
                        {formatCurrency(orderTotal)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs" style={{ color: colors.mediumGray }}>
                      <span>Prazo:</span>
                      <span>{offer.deadline}</span>
                    </div>
                  </div>

                  {!canFulfill && (
                    <div className="text-xs mb-3 p-2 bg-yellow-50 rounded border border-yellow-200">
                      <div className="text-yellow-600 mb-1">
                        ⚠️ Estoque insuficiente:
                      </div>
                      {offer.products.map((product, index) => {
                        if (currentStock[product.type] < product.quantity) {
                          const needed = product.quantity - currentStock[product.type];
                          return (
                            <div key={index} className="text-yellow-600 text-xs">
                              • Faltam {needed}kg de {getProductIcon(product.type)}
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  )}
                </div>

                <button
                  className="w-full px-4 py-3 rounded text-sm font-bold transition-all duration-300"
                  style={{
                    backgroundColor: canFulfill ? colors.success : colors.mediumGray,
                    color: colors.white,
                    cursor: canFulfill ? 'pointer' : 'not-allowed',
                    boxShadow: canFulfill ? `0 4px 8px ${colors.success}40` : 'none'
                  }}
                  disabled={!canFulfill}
                >
                  {canFulfill 
                    ? 'Atender Pedido'
                    : 'Estoque Insuficiente'
                  }
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Estoque Tab */}
      {activeTab === 'estoque' && (
        <div className="space-y-6">
          {/* Produtos em estoque */}
          <div className="grid grid-cols-2 gap-6">
            {Object.entries(currentStock).map(([type, quantity]) => (
              <div key={type} className="text-center text-white">
                <div className="mb-4">
                  <div 
                    className="w-20 h-20 mx-auto rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <span className="text-3xl">{getProductIcon(type)}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold mb-2">{quantity}kg</div>
                <div className="text-sm opacity-80 mb-4 capitalize">
                  {type === 'beef' ? 'Carne Bovina' :
                   type === 'pork' ? 'Carne Suína' :
                   type === 'chicken' ? 'Frango' :
                   'Embutidos'}
                </div>
                
                <div className="w-full bg-white bg-opacity-20 rounded-full h-3 mb-2">
                  <div 
                    className="h-3 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${(quantity / 50) * 100}%`,
                      backgroundColor: getProductColor(type)
                    }}
                  />
                </div>
                <div className="text-xs opacity-80">Estoque atual</div>
              </div>
            ))}
          </div>

          {/* Capacidade da câmara fria */}
          <div 
            className="max-w-2xl mx-auto p-4 rounded-lg"
            style={{ backgroundColor: colors.white, opacity: 0.95 }}
          >
            <div className="text-center">
              <h4 className="font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
                <Thermometer className="w-5 h-5" />
                Câmara Fria (-2°C)
              </h4>
              <div className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>
                {currentTotalStock} / {maxStorageCapacity} kg
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="h-4 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${(currentTotalStock / maxStorageCapacity) * 100}%`,
                    backgroundColor: currentTotalStock >= maxStorageCapacity * 0.9 ? '#DC3545' : colors.success
                  }}
                />
              </div>
              <div className="text-xs text-gray-600 mt-2">
                Espaço livre: {maxStorageCapacity - currentTotalStock}kg
              </div>
              {currentTotalStock >= maxStorageCapacity * 0.9 && (
                <div className="text-xs text-red-600 mt-2 flex items-center justify-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Capacidade quase esgotada!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrainFarmInterface;


