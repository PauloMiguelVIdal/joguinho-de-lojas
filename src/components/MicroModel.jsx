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




// import React, { useState } from 'react';
// import { Clock, DollarSign, TrendingUp, Package, Thermometer, ShoppingCart, Truck, Users, AlertTriangle } from 'lucide-react';

// const GrainFarmInterface = () => {
//   const [shopBalance, setShopBalance] = useState(120000);
//   const [currentDay, setCurrentDay] = useState(85);
//   const [activeTab, setActiveTab] = useState('compras');
//   const [showPurchaseModal, setShowPurchaseModal] = useState(false);
//   const [selectedSupplier, setSelectedSupplier] = useState(null);
//   const [currentStock, setCurrentStock] = useState({
//     beef: 45,      // kg de carne bovina
//     pork: 20,      // kg de carne suína  
//     chicken: 30,   // kg de frango
//     sausage: 15    // kg de linguiça/embutidos
//   });

//   const colors = {
//     primary: '#8B0000',
//     secondary: '#DC143C',
//     accent: '#FF6347',
//     success: '#228B22',
//     white: '#FFFFFF',
//     lightGray: '#F8F9FA',
//     mediumGray: '#6C757D',
//     darkGray: '#343A40',
//     beef: '#8B4513',
//     pork: '#FFB6C1',
//     chicken: '#F5DEB3',
//     sausage: '#CD853F'
//   };

//   const maxStorageCapacity = 200; // kg total
//   const currentTotalStock = Object.values(currentStock).reduce((sum, qty) => sum + qty, 0);
//   // Fornecedores de carne (renovados periodicamente)
//   const suppliers = [
//     {
//       id: 1,
//       name: 'Frigorífico Regional',
//       type: 'beef',
//       quantity: 50,
//       price: 1200,
//       pricePerKg: 24,
//       quality: 'Premium',
//       freshness: 7, // dias até vencer
//       description: 'Carne bovina de primeira qualidade',
//       icon: '🥩'
//     },
//     {
//       id: 2,
//       name: 'Fazenda São José',
//       type: 'beef',
//       quantity: 30,
//       price: 600,
//       pricePerKg: 20,
//       quality: 'Padrão',
//       freshness: 5,
//       description: 'Carne bovina tradicional',
//       icon: '🥩'
//     },
//     {
//       id: 3,
//       name: 'Suínos Premium',
//       type: 'pork',
//       quantity: 25,
//       price: 500,
//       pricePerKg: 20,
//       quality: 'Premium',
//       freshness: 4,
//       description: 'Carne suína especial',
//       icon: '🥓'
//     },
//     {
//       id: 4,
//       name: 'Granja Feliz',
//       type: 'chicken',
//       quantity: 40,
//       price: 320,
//       pricePerKg: 8,
//       quality: 'Orgânico',
//       freshness: 3,
//       description: 'Frango orgânico criado livre',
//       icon: '🍗'
//     },
//     {
//       id: 5,
//       name: 'Embutidos Artesanais',
//       type: 'sausage',
//       quantity: 20,
//       price: 400,
//       pricePerKg: 20,
//       quality: 'Artesanal',
//       freshness: 10,
//       description: 'Linguiças e embutidos artesanais',
//       icon: '🌭'
//     },
//     {
//       id: 6,
//       name: 'Atacado Carne & Cia',
//       type: 'beef',
//       quantity: 80,
//       price: 1440,
//       pricePerKg: 18,
//       quality: 'Comercial',
//       freshness: 4,
//       description: 'Lote grande com desconto',
//       icon: '🥩'
//     }
//   ];

//   // Ofertas de venda para clientes
//   const customerOffers = [
//     {
//       id: 1,
//       customer: 'Restaurante Italiano',
//       products: [
//         { type: 'beef', quantity: 15, pricePerKg: 35, total: 525 }
//       ],
//       deadline: 'Até 3 dias',
//       repeat: 'Semanal',
//       description: 'Cliente fixo - restaurante tradicional'
//     },
//     {
//       id: 2,
//       customer: 'Churrascaria Pampa',
//       products: [
//         { type: 'beef', quantity: 25, pricePerKg: 32, total: 800 },
//         { type: 'sausage', quantity: 10, pricePerKg: 28, total: 280 }
//       ],
//       deadline: 'Até 5 dias',
//       repeat: 'Quinzenal',
//       description: 'Grande cliente corporativo'
//     },
//     {
//       id: 3,
//       customer: 'Mercado do Bairro',
//       products: [
//         { type: 'chicken', quantity: 20, pricePerKg: 14, total: 280 },
//         { type: 'pork', quantity: 10, pricePerKg: 28, total: 280 }
//       ],
//       deadline: 'Até 2 dias',
//       repeat: 'Diário',
//       description: 'Fornecimento para varejo local'
//     },
//     {
//       id: 4,
//       customer: 'Festa de Casamento',
//       products: [
//         { type: 'beef', quantity: 40, pricePerKg: 38, total: 1520 },
//         { type: 'chicken', quantity: 30, pricePerKg: 16, total: 480 },
//         { type: 'sausage', quantity: 15, pricePerKg: 30, total: 450 }
//       ],
//       deadline: 'Até 10 dias',
//       repeat: 'Único',
//       description: 'Evento especial - margem alta'
//     }
//   ];

//   const canPurchase = (supplier) => {
//     return shopBalance >= supplier.price && 
//            (currentTotalStock + supplier.quantity) <= maxStorageCapacity;
//   };

//   const canFulfillOrder = (offer) => {
//     return offer.products.every(product => 
//       currentStock[product.type] >= product.quantity
//     );
//   };

//   const getProductColor = (type) => {
//     const productColors = {
//       'beef': colors.beef,
//       'pork': colors.pork,
//       'chicken': colors.chicken,
//       'sausage': colors.sausage
//     };
//     return productColors[type] || colors.mediumGray;
//   };

//   const getProductIcon = (type) => {
//     const icons = {
//       'beef': '🥩',
//       'pork': '🥓',
//       'chicken': '🍗',
//       'sausage': '🌭'
//     };
//     return icons[type] || '📦';
//   };

//   const getQualityColor = (quality) => {
//     const qualityColors = {
//       'Premium': colors.success,
//       'Orgânico': colors.success,
//       'Artesanal': colors.accent,
//       'Padrão': colors.secondary,
//       'Comercial': colors.mediumGray
//     };
//     return qualityColors[quality] || colors.mediumGray;
//   };

//   const handlePurchase = (supplier) => {
//     if (!canPurchase(supplier)) return;

//     setShopBalance(prev => prev - supplier.price);
//     setCurrentStock(prev => ({
//       ...prev,
//       [supplier.type]: prev[supplier.type] + supplier.quantity
//     }));
//   };

//   const calculateOrderTotal = (offer) => {
//     return offer.products.reduce((sum, product) => sum + product.total, 0);
//   };

//   const formatCurrency = (value) => {
//     return new Intl.NumberFormat('pt-BR', {
//       style: 'currency',
//       currency: 'BRL',
//       minimumFractionDigits: 0
//     }).format(value);
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
//             <ShoppingCart className="w-6 h-6" style={{ color: colors.primary }} />
//           </div>
//           <h1 className="text-2xl font-bold text-white">Açougue Bom Corte</h1>
//         </div>
//       </div>

//       {/* Status Dashboard */}
//       <div className="grid grid-cols-4 gap-4 mb-6">
//         <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center text-white">
//           <div className="text-2xl font-bold">{formatCurrency(shopBalance)}</div>
//           <div className="text-xs opacity-80">Saldo Atual</div>
//         </div>
//         <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center text-white">
//           <div className="text-2xl font-bold">{currentTotalStock}kg</div>
//           <div className="text-xs opacity-80">Estoque Total</div>
//         </div>
//         <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center text-white">
//           <div className="text-2xl font-bold">{maxStorageCapacity - currentTotalStock}kg</div>
//           <div className="text-xs opacity-80">Espaço Livre</div>
//         </div>
//         <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center text-white">
//           <div className="text-2xl font-bold flex items-center justify-center gap-1">
//             <Thermometer className="w-5 h-5" />
//             -2°C
//           </div>
//           <div className="text-xs opacity-80">Câmara Fria</div>
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="flex gap-2 mb-6">
//         <TabButton 
//           id="compras" 
//           label="Fornecedores" 
//           icon={Truck}
//           active={activeTab === 'compras'} 
//           onClick={setActiveTab} 
//         />
//         <TabButton 
//           id="vendas" 
//           label="Pedidos" 
//           icon={Users}
//           active={activeTab === 'vendas'} 
//           onClick={setActiveTab} 
//         />
//         <TabButton 
//           id="estoque" 
//           label="Estoque" 
//           icon={Package}
//           active={activeTab === 'estoque'} 
//           onClick={setActiveTab}
//           info={`${currentTotalStock}/${maxStorageCapacity}kg`}
//         />
//       </div>

//       {/* Status Messages */}
//       <div className="mb-4">
//         {activeTab === 'compras' && (
//           <div 
//             className="border rounded-lg p-3 text-center"
//             style={{
//               backgroundColor: `${colors.accent}20`,
//               borderColor: colors.accent
//             }}
//           >
//             <h3 className="font-semibold text-sm mb-1 text-white">
//               🚚 Fornecedores Disponíveis - Entregas Diárias
//             </h3>
//             <p className="text-xs text-white opacity-80">
//               Carne fresca entregue na madrugada • Preços atualizados diariamente
//             </p>
//           </div>
//         )}

//         {activeTab === 'vendas' && (
//           <div 
//             className="border rounded-lg p-3 text-center"
//             style={{
//               backgroundColor: `${colors.success}20`,
//               borderColor: colors.success
//             }}
//           >
//             <h3 className="font-semibold text-sm mb-1 text-white">
//               👥 Pedidos Ativos - Clientes Esperando
//             </h3>
//             <p className="text-xs text-white opacity-80">
//               {customerOffers.filter(offer => canFulfillOrder(offer)).length} pedidos podem ser atendidos
//             </p>
//           </div>
//         )}

//         {activeTab === 'estoque' && (
//           <div 
//             className="border rounded-lg p-3 text-center"
//             style={{
//               backgroundColor: `${colors.secondary}20`,
//               borderColor: colors.secondary
//             }}
//           >
//             <h3 className="font-semibold text-sm mb-1 text-white">
//               📦 Câmara Fria Operando
//             </h3>
//             <p className="text-xs text-white opacity-80">
//               Temperatura controlada • Produtos conservados adequadamente
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Content based on active tab */}
//       {activeTab === 'compras' && (
//         <div className="grid grid-cols-2 gap-4 max-w-6xl mx-auto">
//           {suppliers.map((supplier) => {
//             const canPurchaseThis = canPurchase(supplier);
//             const capacityIssue = (currentTotalStock + supplier.quantity) > maxStorageCapacity;
//             const balanceIssue = shopBalance < supplier.price;

//             return (
//               <div
//                 key={supplier.id}
//                 className={`rounded-lg shadow-md p-4 transition-all duration-300 ${
//                   canPurchaseThis
//                     ? 'hover:shadow-lg hover:transform hover:scale-102'
//                     : 'opacity-60'
//                 }`}
//                 style={{ backgroundColor: colors.white }}
//               >
//                 <div className="flex gap-4 mb-4">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2 mb-3">
//                       <span className="text-2xl">{supplier.icon}</span>
//                       <div className="flex-1">
//                         <h3 className="text-sm font-bold" style={{ color: colors.primary }}>
//                           {supplier.name}
//                         </h3>
//                         <div className="flex gap-2 mt-1">
//                           <div 
//                             className="text-xs px-2 py-1 rounded text-white"
//                             style={{ backgroundColor: getProductColor(supplier.type) }}
//                           >
//                             {supplier.quantity}kg
//                           </div>
//                           <div 
//                             className="text-xs px-2 py-1 rounded text-white"
//                             style={{ backgroundColor: getQualityColor(supplier.quality) }}
//                           >
//                             {supplier.quality}
//                           </div>
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
//                           {formatCurrency(supplier.price)}
//                         </span>
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-1">
//                           <Package className="w-3 h-3" style={{ color: colors.success }} />
//                           <span className="text-xs" style={{ color: colors.mediumGray }}>Por kg:</span>
//                         </div>
//                         <span className="text-xs font-bold" style={{ color: colors.success }}>
//                           {formatCurrency(supplier.pricePerKg)}
//                         </span>
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-1">
//                           <Clock className="w-3 h-3" style={{ color: colors.accent }} />
//                           <span className="text-xs" style={{ color: colors.mediumGray }}>Validade:</span>
//                         </div>
//                         <span className="text-xs font-semibold" style={{ color: colors.accent }}>
//                           {supplier.freshness} dias
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="text-xs mb-3 p-2 bg-gray-50 rounded" style={{ color: colors.mediumGray }}>
//                   {supplier.description}
//                 </div>

//                 {!canPurchaseThis && (
//                   <div className="text-xs mb-3 p-2 bg-red-50 rounded border border-red-200">
//                     {capacityIssue && (
//                       <div className="text-red-600 mb-1">
//                         ⚠️ Capacidade insuficiente ({currentTotalStock + supplier.quantity}/{maxStorageCapacity}kg)
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
//                     backgroundColor: canPurchaseThis ? colors.primary : colors.mediumGray,
//                     color: colors.white,
//                     cursor: canPurchaseThis ? 'pointer' : 'not-allowed',
//                     boxShadow: canPurchaseThis ? `0 4px 8px ${colors.primary}40` : 'none'
//                   }}
//                   onClick={() => handlePurchase(supplier)}
//                   disabled={!canPurchaseThis}
//                   onMouseEnter={(e) => {
//                     if (canPurchaseThis) {
//                       e.target.style.backgroundColor = colors.secondary;
//                       e.target.style.transform = 'scale(1.02)';
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (canPurchaseThis) {
//                       e.target.style.backgroundColor = colors.primary;
//                       e.target.style.transform = 'scale(1)';
//                     }
//                   }}
//                 >
//                   {canPurchaseThis 
//                     ? 'Comprar'
//                     : capacityIssue 
//                     ? 'Sem Espaço'
//                     : 'Sem Saldo'
//                   }
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Vendas Tab */}
//       {activeTab === 'vendas' && (
//         <div className="grid grid-cols-2 gap-4 max-w-6xl mx-auto">
//           {customerOffers.map((offer) => {
//             const canFulfill = canFulfillOrder(offer);
//             const orderTotal = calculateOrderTotal(offer);

//             return (
//               <div
//                 key={offer.id}
//                 className={`rounded-lg shadow-md p-4 transition-all duration-300 ${
//                   canFulfill
//                     ? 'hover:shadow-lg hover:transform hover:scale-102'
//                     : 'opacity-60'
//                 }`}
//                 style={{ backgroundColor: colors.white }}
//               >
//                 <div className="mb-4">
//                   <div className="flex items-center justify-between mb-2">
//                     <h3 className="text-sm font-bold" style={{ color: colors.primary }}>
//                       {offer.customer}
//                     </h3>
//                     <div className="flex gap-2">
//                       <div 
//                         className="text-xs px-2 py-1 rounded text-white"
//                         style={{ backgroundColor: colors.secondary }}
//                       >
//                         {offer.repeat}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="text-xs mb-3" style={{ color: colors.mediumGray }}>
//                     {offer.description}
//                   </div>

//                   <div className="space-y-2 mb-3">
//                     {offer.products.map((product, index) => (
//                       <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
//                         <div className="flex items-center gap-2">
//                           <span className="text-sm">{getProductIcon(product.type)}</span>
//                           <span className="text-xs">{product.quantity}kg</span>
//                           <span className="text-xs" style={{ color: colors.mediumGray }}>
//                             @ {formatCurrency(product.pricePerKg)}/kg
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <span className="text-xs font-bold">
//                             {formatCurrency(product.total)}
//                           </span>
//                           {currentStock[product.type] >= product.quantity ? (
//                             <span className="text-xs text-green-600">✓</span>
//                           ) : (
//                             <span className="text-xs text-red-600">✗</span>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="border-t pt-2 mb-3">
//                     <div className="flex justify-between items-center">
//                       <span className="text-sm font-semibold">Total do Pedido:</span>
//                       <span className="text-sm font-bold" style={{ color: colors.success }}>
//                         {formatCurrency(orderTotal)}
//                       </span>
//                     </div>
//                     <div className="flex justify-between items-center text-xs" style={{ color: colors.mediumGray }}>
//                       <span>Prazo:</span>
//                       <span>{offer.deadline}</span>
//                     </div>
//                   </div>

//                   {!canFulfill && (
//                     <div className="text-xs mb-3 p-2 bg-yellow-50 rounded border border-yellow-200">
//                       <div className="text-yellow-600 mb-1">
//                         ⚠️ Estoque insuficiente:
//                       </div>
//                       {offer.products.map((product, index) => {
//                         if (currentStock[product.type] < product.quantity) {
//                           const needed = product.quantity - currentStock[product.type];
//                           return (
//                             <div key={index} className="text-yellow-600 text-xs">
//                               • Faltam {needed}kg de {getProductIcon(product.type)}
//                             </div>
//                           );
//                         }
//                         return null;
//                       })}
//                     </div>
//                   )}
//                 </div>

//                 <button
//                   className="w-full px-4 py-3 rounded text-sm font-bold transition-all duration-300"
//                   style={{
//                     backgroundColor: canFulfill ? colors.success : colors.mediumGray,
//                     color: colors.white,
//                     cursor: canFulfill ? 'pointer' : 'not-allowed',
//                     boxShadow: canFulfill ? `0 4px 8px ${colors.success}40` : 'none'
//                   }}
//                   disabled={!canFulfill}
//                 >
//                   {canFulfill 
//                     ? 'Atender Pedido'
//                     : 'Estoque Insuficiente'
//                   }
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Estoque Tab */}
//       {activeTab === 'estoque' && (
//         <div className="space-y-6">
//           {/* Produtos em estoque */}
//           <div className="grid grid-cols-2 gap-6">
//             {Object.entries(currentStock).map(([type, quantity]) => (
//               <div key={type} className="text-center text-white">
//                 <div className="mb-4">
//                   <div 
//                     className="w-20 h-20 mx-auto rounded-lg flex items-center justify-center"
//                     style={{ backgroundColor: colors.primary }}
//                   >
//                     <span className="text-3xl">{getProductIcon(type)}</span>
//                   </div>
//                 </div>
//                 <div className="text-2xl font-bold mb-2">{quantity}kg</div>
//                 <div className="text-sm opacity-80 mb-4 capitalize">
//                   {type === 'beef' ? 'Carne Bovina' :
//                    type === 'pork' ? 'Carne Suína' :
//                    type === 'chicken' ? 'Frango' :
//                    'Embutidos'}
//                 </div>

//                 <div className="w-full bg-white bg-opacity-20 rounded-full h-3 mb-2">
//                   <div 
//                     className="h-3 rounded-full transition-all duration-300"
//                     style={{ 
//                       width: `${(quantity / 50) * 100}%`,
//                       backgroundColor: getProductColor(type)
//                     }}
//                   />
//                 </div>
//                 <div className="text-xs opacity-80">Estoque atual</div>
//               </div>
//             ))}
//           </div>

//           {/* Capacidade da câmara fria */}
//           <div 
//             className="max-w-2xl mx-auto p-4 rounded-lg"
//             style={{ backgroundColor: colors.white, opacity: 0.95 }}
//           >
//             <div className="text-center">
//               <h4 className="font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
//                 <Thermometer className="w-5 h-5" />
//                 Câmara Fria (-2°C)
//               </h4>
//               <div className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>
//                 {currentTotalStock} / {maxStorageCapacity} kg
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-4">
//                 <div 
//                   className="h-4 rounded-full transition-all duration-300"
//                   style={{ 
//                     width: `${(currentTotalStock / maxStorageCapacity) * 100}%`,
//                     backgroundColor: currentTotalStock >= maxStorageCapacity * 0.9 ? '#DC3545' : colors.success
//                   }}
//                 />
//               </div>
//               <div className="text-xs text-gray-600 mt-2">
//                 Espaço livre: {maxStorageCapacity - currentTotalStock}kg
//               </div>
//               {currentTotalStock >= maxStorageCapacity * 0.9 && (
//                 <div className="text-xs text-red-600 mt-2 flex items-center justify-center gap-1">
//                   <AlertTriangle className="w-3 h-3" />
//                   Capacidade quase esgotada!
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GrainFarmInterface;


import React, { useState, useContext, createContext } from 'react';

import { Clock, DollarSign, Package, Warehouse, Users, Building2,Sun, TrendingUp, Zap,Car, Truck, Smartphone, Cpu,HardHat } from 'lucide-react';
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";

// ==================== CONFIGURAÇÃO DE SETORES ====================
const SETORES_CONFIG = {
  agricultura: {
    id: "agricultura",
    nome: "Agricultura",
    cores: { primary: '#003816', secondary: '#1A5E2A', accent: '#0C9123', light: '#4CAF50' },
    icon: '🌾'
  },
  comercio: {
    id: "comercio",
    nome: "Comércio",
    cores: { primary: '#660000', secondary: '#A31919', accent: '#E60000', light: '#FF4D4D' },
    icon: '🏪'
  },
  tecnologia: {
    id: "tecnologia",
    nome: "Tecnologia",
    cores: { primary: '#A64B00', secondary: '#D45A00', accent: '#FF6F00', light: '#FF8C42' },
    icon: '💻'
  },
  industria: {
    id: "industria",
    nome: "Indústria",
    cores: { primary: '#1A1A1A', secondary: '#4D4D4D', accent: '#808080', light: '#B3B3B3' },
    icon: '🏭'
  },
  imobiliario: {
    id: "imobiliario",
    nome: "Imobiliário",
    cores: { primary: '#000066', secondary: '#1A1A8C', accent: '#3333CC', light: '#6666FF' },
    icon: '🏢'
  },
  energia: {
    id: "energia",
    nome: "Energia",
    cores: { primary: '#665200', secondary: '#A37F19', accent: '#E6B800', light: '#FFD966' },
    icon: '⚡'
  }
};

class CicloDeOfertas {
  constructor({ baseData, quantidadeSorteio, duracaoDias }) {
    this.baseData = baseData;
    this.quantidadeSorteio = quantidadeSorteio;
    this.duracaoDias = duracaoDias;
    this.estado = this._novoCiclo(1);
  }

  _novoCiclo(diaAtual) {
    const itens = this._sortearItens();
    return {
      itensAtuais: itens,
      inicioCiclo: diaAtual,
      fimCiclo: diaAtual + this.duracaoDias,
      usados: []
    };
  }

  _sortearItens() {
    const copia = [...this.baseData];
    const sorteados = [];
    for (let i = 0; i < this.quantidadeSorteio && copia.length > 0; i++) {
      const idx = Math.floor(Math.random() * copia.length);
      sorteados.push(copia.splice(idx, 1)[0]);
    }
    return sorteados;
  }

  atualizarDia(diaAtual) {
    if (diaAtual >= this.estado.fimCiclo) {
      this.estado = this._novoCiclo(diaAtual);
    }
  }

  usarItem(id) {
    this.estado.usados.push(id);
    this.estado.itensAtuais = this.estado.itensAtuais.filter(item => item.id !== id);
  }

  getItensDisponiveis() {
    return this.estado.itensAtuais;
  }

  getFimCiclo() {
    return this.estado.fimCiclo;
  }
}
// ==================== MODELO BASE DE NEGÓCIO ====================
class BusinessModel {
  constructor(config) {
    this.id = config.id;
    this.nome = config.nome;
    this.setor = config.setor;
    this.cores = SETORES_CONFIG[config.setor].cores;
    this.saldo = config.saldoInicial || 0;
    this.estoque = config.estoqueInicial || {};
    this.capacidadeEstoque = config.capacidadeEstoque || 1000;
    this.diaAtual = config.diaAtual || 1;
  }


  getSaldoTotal() {
    return this.saldo;
  }

  getEstoqueTotal() {
    return Object.values(this.estoque).reduce((sum, qty) => sum + qty, 0);
  }

  getEspacoLivre() {
    return this.capacidadeEstoque - this.getEstoqueTotal();
  }

  podeComprar(custo, quantidade = 0) {
    return this.saldo >= custo && (this.getEstoqueTotal() + quantidade) <= this.capacidadeEstoque;
  }

  adicionarEstoque(produto, quantidade) {
    if (!this.estoque[produto]) this.estoque[produto] = 0;
    this.estoque[produto] += quantidade;
  }

  removerEstoque(produto, quantidade) {
    if (this.estoque[produto] >= quantidade) {
      this.estoque[produto] -= quantidade;
      return true;
    }
    return false;
  }

  adicionarSaldo(valor) {
    this.saldo += valor;
  }

  removerSaldo(valor) {
    if (this.saldo >= valor) {
      this.saldo -= valor;
      return true;
    }
    return false;
  }
}

// ==================== HOOK CUSTOMIZADO ====================
import { useEffect, useCallback } from "react";

const useNegocio = (config) => {
  const [negocio] = useState(() => new BusinessModel(config));
  const [saldo, setSaldo] = useState(negocio.saldo);
  const [estoque, setEstoque] = useState({ ...negocio.estoque });

  const sync = useCallback(() => {
    setSaldo(negocio.saldo);
    setEstoque({ ...negocio.estoque });
  }, [negocio]);

  const adicionarSaldo = useCallback((valor) => {
    negocio.adicionarSaldo(valor);
    sync();
  }, [negocio, sync]);

  const removerSaldo = useCallback((valor) => {
    const ok = negocio.removerSaldo(valor);
    sync();
    return ok;
  }, [negocio, sync]);

  const adicionarEstoque = useCallback((item, qtd) => {
    negocio.adicionarEstoque(item, qtd);
    sync();
  }, [negocio, sync]);

  const removerEstoque = useCallback((item, qtd) => {
    const ok = negocio.removerEstoque(item, qtd);
    sync();
    return ok;
  }, [negocio, sync]);

  const setDiaAtual = useCallback((dia) => {
    negocio.diaAtual = dia;
  }, [negocio]);

  useEffect(() => {
    sync();
  }, [sync]);

  return { negocio, saldo, estoque, adicionarSaldo, removerSaldo, adicionarEstoque, removerEstoque, setDiaAtual, sync };
};

// ==================== COMPONENTE BASE ====================
const BaseBusinessInterface = ({ negocio, tabs, renderTabContent, headerExtra,footerExtra }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const cores = negocio.cores;
  const { dados } = useContext(CentraldeDadosContext);
  const { economiaSetores } = useContext(DadosEconomyGlobalContext);

  const TabButton = ({ id, label, icon: Icon, info }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-semibold ${activeTab === id
        ? 'text-white shadow-lg'
        : 'text-gray-700 hover:bg-gray-200'}`}
      style={activeTab === id ? { backgroundColor: cores.accent } : { backgroundColor: '#FFFFFF' }}
    >
      <Icon size={16} />
      <span>{label}</span>
      {info && <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">{info}</span>}
    </button>
  );

  const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', {
    style: 'currency', currency: 'BRL', minimumFractionDigits: 0
  }).format(value);

  return (
    <div
      className="w-full h-[70vh] rounded-[20px] p-6 overflow-auto"
      style={{ background: `linear-gradient(135deg, ${cores.primary}, ${cores.secondary}, ${cores.accent})` }}
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-white">
            <Building2 className="w-6 h-6" style={{ color: cores.accent }} />
          </div>
          <h1 className="text-2xl font-bold text-white">{negocio.nome}</h1>
        </div>

        {headerExtra && <div className="mt-4">{headerExtra}</div>}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map(tab => <TabButton key={tab.id} {...tab} />)}
      </div>

      <div className=''>{renderTabContent(activeTab, cores, formatCurrency)}</div>
      {footerExtra && (
        <div className="text-center text-white mt-4 text-sm opacity-90 bg-black/20 py-2 rounded-lg">
          {footerExtra(activeTab)}
        </div>
      )}
    </div>
  );
};

// ==================== PLANTAÇÃO ====================
const PlantacaoNegocio = () => {
  const { dados } = useContext(CentraldeDadosContext);
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);

  const { negocio, saldo, estoque: currentStock, adicionarSaldo, removerSaldo, adicionarEstoque, removerEstoque, setDiaAtual } =
    useNegocio({
      id: 'plantacao-1',
      nome: 'Plantação de Grãos',
      setor: 'agricultura',
      saldoInicial: 300000,
      estoqueInicial: { soja: 0, milho: 0, cevada: 0, trigo: 0 },
      capacidadeEstoque: 500,
      diaAtual: dados.dia
    });

  const getProductIcon = (type) => {
    const icons = {
      beef: '🥩',
      pork: '🥓',
      chicken: '🍗',
      sausage: '🌭',
      milho: '🌽',
      soja: '🫘',
      trigo: '🌾',
      cevada: '🌱'
    };
    return icons[type] || '📦';
  };

const graos = [
  // Originais
  { id: 1, nome: "Milho", custo: 7000, sacas: 100, valorPorSaca: 100, duracao: 80, icon: "🌽" },
  { id: 2, nome: "Soja", custo: 5000, sacas: 50, valorPorSaca: 135, duracao: 120, icon: "🫘" },
  { id: 3, nome: "Trigo", custo: 3000, sacas: 50, valorPorSaca: 80, duracao: 180, icon: "🌾" },
  { id: 4, nome: "Cevada", custo: 3500, sacas: 50, valorPorSaca: 100, duracao: 90, icon: "🌱" },
  { id: 5, nome: "Milho", custo: 10500, sacas: 150, valorPorSaca: 100, duracao: 85, icon: "🌽" },
  { id: 6, nome: "Milho", custo: 14700, sacas: 200, valorPorSaca: 100, duracao: 90, icon: "🌽" },
  { id: 7, nome: "Soja", custo: 7200, sacas: 75, valorPorSaca: 135, duracao: 130, icon: "🫘" },
  { id: 8, nome: "Soja", custo: 9600, sacas: 100, valorPorSaca: 135, duracao: 140, icon: "🫘" },
  { id: 9, nome: "Trigo", custo: 4200, sacas: 75, valorPorSaca: 80, duracao: 190, icon: "🌾" },
  { id: 10, nome: "Trigo", custo: 5600, sacas: 100, valorPorSaca: 80, duracao: 200, icon: "🌾" },
  { id: 11, nome: "Cevada", custo: 4950, sacas: 75, valorPorSaca: 100, duracao: 95, icon: "🌱" },
  { id: 12, nome: "Cevada", custo: 6650, sacas: 100, valorPorSaca: 100, duracao: 100, icon: "🌱" },
  { id: 13, nome: "Milho", custo: 18900, sacas: 250, valorPorSaca: 100, duracao: 95, icon: "🌽" },
  { id: 14, nome: "Soja", custo: 11800, sacas: 125, valorPorSaca: 135, duracao: 150, icon: "🫘" },
  { id: 15, nome: "Trigo", custo: 6900, sacas: 125, valorPorSaca: 80, duracao: 210, icon: "🌾" },
  { id: 16, nome: "Cevada", custo: 9100, sacas: 125, valorPorSaca: 100, duracao: 105, icon: "🌱" },
];

const marketOffers = [
  // === MILHO 🌽 ===
  // custo base: 7.000 → lucro 50–70% → faixa: 10.500–11.900
  { id: 1,  name: "milho", sacas: 50,  pricePerSack: 105, totalPrice: 5250 },  // +50%
  { id: 2,  name: "milho", sacas: 100, pricePerSack: 112, totalPrice: 11200 }, // +60%
  { id: 3,  name: "milho", sacas: 150, pricePerSack: 118, totalPrice: 17700 }, // +68%
  { id: 4,  name: "milho", sacas: 200, pricePerSack: 119, totalPrice: 23800 }, // +70%

  // === SOJA 🫘 ===
  // custo base: 5.000 → lucro 50–70% → faixa: 7.500–8.500
  { id: 5,  name: "soja", sacas: 50,  pricePerSack: 150, totalPrice: 7500 },   // +50%
  { id: 6,  name: "soja", sacas: 100, pricePerSack: 160, totalPrice: 16000 },  // +60%
  { id: 7,  name: "soja", sacas: 150, pricePerSack: 166, totalPrice: 24900 },  // +66%
  { id: 8,  name: "soja", sacas: 200, pricePerSack: 172, totalPrice: 34400 },  // +70%

  // === TRIGO 🌾 ===
  // custo base: 3.000 → lucro 50–70% → faixa: 4.500–5.100
  { id: 9,  name: "trigo", sacas: 50,  pricePerSack: 90, totalPrice: 4500 },   // +50%
  { id: 10, name: "trigo", sacas: 100, pricePerSack: 96, totalPrice: 9600 },   // +60%
  { id: 11, name: "trigo", sacas: 150, pricePerSack: 102, totalPrice: 15300 }, // +70%
  { id: 12, name: "trigo", sacas: 200, pricePerSack: 101, totalPrice: 20200 }, // +68%

  // === CEVADA 🌱 ===
  // custo base: 3.500 → lucro 50–70% → faixa: 5.250–5.950
  { id: 13, name: "cevada", sacas: 50,  pricePerSack: 105, totalPrice: 5250 }, // +50%
  { id: 14, name: "cevada", sacas: 100, pricePerSack: 112, totalPrice: 11200 },// +60%
  { id: 15, name: "cevada", sacas: 150, pricePerSack: 118, totalPrice: 17700 },// +68%
  { id: 16, name: "cevada", sacas: 200, pricePerSack: 119, totalPrice: 23800 },// +70%
];

  // --- Ciclos automáticos ---
  const [cicloGraos] = useState(() =>
    new CicloDeOfertas({
      baseData: graos,
      quantidadeSorteio: 4,
      duracaoDias: 30,
      chaveStorage: "ciclo_graos"
    })
  );

  const [cicloMercado] = useState(() =>
    new CicloDeOfertas({
      baseData: marketOffers,
      quantidadeSorteio: 8,
      duracaoDias: 90,
      chaveStorage: "ciclo_mercado"
    })
  );

  useEffect(() => {
    cicloGraos.atualizarDia(dados.dia);
    cicloMercado.atualizarDia(dados.dia);
  }, [dados.dia]);

  const graosAtuais = cicloGraos.getItensDisponiveis();
  const ofertasAtuais = cicloMercado.getItensDisponiveis();

  const [activePlanting, setActivePlanting] = useState(null);
  const plantacaoProntaParaColher = activePlanting && dados.dia >= activePlanting.diaFim;

  const handlePlantar = (grao) => {
    if (removerSaldo(grao.custo) > economiaSetores.saldo) return;
    atualizarEco("saldo", economiaSetores.saldo - grao.custo);
    if (removerSaldo(grao.custo)) {
      setActivePlanting({
        ...grao,
        diaInicio: dados.dia,
        diaFim: dados.dia + grao.duracao
      });
    }
  };

  const handleColheita = () => {
    if (activePlanting) {
      const key = activePlanting.nome.toLowerCase();
      adicionarEstoque(key, activePlanting.sacas);
      setActivePlanting(null);
      setDiaAtual(dados.dia);
    }
  };

  // 🔹 Guardar IDs das ofertas já vendidas
  const [vendasRealizadas, setVendasRealizadas] = useState([]);

  const handleVender = (offer) => {
    const estoqueAtual = currentStock[offer.name] || 0;
    if (offer.sacas > estoqueAtual) return alert("Você não tem sacas suficientes!");

    removerEstoque(offer.name, offer.sacas);
    adicionarSaldo(offer.totalPrice);
    atualizarEco("saldo", economiaSetores.saldo + offer.totalPrice);

    // marca esta oferta como vendida
    setVendasRealizadas((prev) => [...prev, offer.id]);
  };

  const renderTabContent = (tab, cores, formatCurrency) => {
    if (tab === 'produzir') {
      return (
        <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
          {graosAtuais.map((grao) => {
            const podeEscolher = !activePlanting && saldo >= grao.custo;
            return (
              <div key={grao.id} className="rounded-lg shadow-md p-4 bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{grao.icon}</span>
                  <h3 className="text-base font-bold" style={{ color: cores.primary }}>
                    {grao.nome}
                  </h3>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm"><span>Custo:</span><span>{formatCurrency(grao.custo)}</span></div>
                  <div className="flex justify-between text-sm"><span>Sacas:</span><span>{grao.sacas}</span></div>
                  <div className="flex justify-between text-sm"><span>Custos/Sacas:</span><span>{formatCurrency((grao.custo)/grao.sacas)}</span></div>
                  <div className="flex justify-between text-sm"><span>Duração:</span><span>{grao.duracao} dias</span></div>
                </div>
                <button
                  onClick={() => handlePlantar(grao)}
                  disabled={!podeEscolher}
                  className="w-full py-3 rounded font-bold text-white"
                  style={{ backgroundColor: podeEscolher ? cores.accent : '#6C757D' }}
                >
                  {activePlanting ? 'Plantando...' : 'Plantar'}
                </button>
              </div>
            );
          })}
        </div>
      );
    }

    if (tab === 'mercado') {
      // 🔹 Filtra apenas ofertas ainda não vendidas
      const ofertasDisponiveis = ofertasAtuais.filter((offer) => !vendasRealizadas.includes(offer.id));

      return (
        <div className="grid grid-cols-4 gap-4 w-full mx-auto text-center">
          {ofertasDisponiveis.map((offer) => (
            <div key={offer.id} className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="font-bold text-gray-800 mb-2 capitalize">{getProductIcon(offer.name)}</h3>
              <h3 className="font-bold text-gray-800 mb-2 capitalize">{offer.name}</h3>
              <p className="text-sm mb-1">{offer.sacas} sacas</p>
              <p className="text-xs text-gray-500 mb-3">R$ {offer.pricePerSack}/saca</p>
              <button
                onClick={() => handleVender(offer)}
                className="py-2 px-4 rounded font-bold text-white text-sm bg-green-600 hover:bg-green-700"
              >
                Vender
              </button>
            </div>
          ))}

          {ofertasDisponiveis.length === 0 && (
            <p className="col-span-4 text-gray-500 text-sm mt-4">Todos os compradores já foram atendidos.</p>
          )}
        </div>
      );
    }

    if (tab === 'estoque') {
      return (
        <div className="grid grid-cols-2 gap-6">
          {Object.entries(currentStock).map(([type, qtd]) => (
            <div key={type} className="text-center text-white bg-white/20 rounded-xl">
              <h3 className="text-4xl mt-3 mb-3">{getProductIcon(type)}</h3>
              <h3 className="text-3xl font-bold mb-2">{type}</h3>
              <div className="text-sm mb-3 opacity-80">{qtd} X sacas</div>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  const tabs = [
    { id: 'produzir', label: 'Produzir', icon: Warehouse, info: null },
    { id: 'mercado', label: 'Mercado', icon: TrendingUp, info: null },
    { id: 'estoque', label: 'Estoque', icon: Package, info: `${Object.values(currentStock).reduce((a, b) => a + b, 0)} Sacas` },
  ];

  return (
    <BaseBusinessInterface
      negocio={negocio}
      tabs={tabs}
      renderTabContent={renderTabContent}
      headerExtra={
        activePlanting && (
          <div className="bg-white bg-opacity-20 rounded-lg p-3 text-white text-sm">
            {plantacaoProntaParaColher ? (
              <div className="flex items-center justify-between">
                <span>🌾 {activePlanting.nome} pronto para colheita!</span>
                <button
                  onClick={handleColheita}
                  className="px-4 py-2 rounded font-bold bg-green-500 text-white"
                >
                  Colher ({activePlanting.sacas})
                </button>
              </div>
            ) : (
              <div>
                🌱 Cultivando {activePlanting.nome} — Colheita no dia {activePlanting.diaFim}
              </div>
            )}
          </div>
        )
      }
      footerExtra={(tab) => {
        if (tab === 'produzir') return `Próximo ciclo de produção em ${cicloGraos.getFimCiclo() - dados.dia} dias`;
        if (tab === 'mercado') return `Próximo ciclo de mercado em ${cicloMercado.getFimCiclo() - dados.dia} dias`;
        return null;
      }}
    />
  );
};

// ==================== EXEMPLO: AÇOUGUE ====================
const AcougueNegocio = () => {
  const { dados } = useContext(CentraldeDadosContext);
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);

  const {
    negocio,
    saldo,
    estoque: currentStock,
    adicionarSaldo,
    removerSaldo,
    adicionarEstoque,
    removerEstoque,
    setDiaAtual
  } = useNegocio({
    id: "acougue-1",
    nome: "Açougue Bom Corte",
    setor: "comercio",
    saldoInicial: 120000,
    estoqueInicial: { beef: 45, pork: 20, chicken: 30, sausage: 15 },
    capacidadeEstoque: 200,
    diaAtual: dados.dia
  });

const fornecedores = [
  { id: 1, nome: "Frigorífico Regional", tipo: "beef", quantidade: 80, preco: 2000, precoKg: 25, qualidade: "Premium", icon: "🥩" },
  { id: 2, nome: "Granja Feliz", tipo: "chicken", quantidade: 100, preco: 800, precoKg: 8, qualidade: "Orgânico", icon: "🍗" },
  { id: 3, nome: "Fazenda Suína Boa Terra", tipo: "pork", quantidade: 60, preco: 1080, precoKg: 18, qualidade: "Tradicional", icon: "🥓" },
  { id: 4, nome: "Fábrica de Embutidos SaborSul", tipo: "sausage", quantidade: 40, preco: 1000, precoKg: 25, qualidade: "Artesanal", icon: "🌭" }
];
  // Ofertas de venda originais + ofertas especiais
  const ofertasVenda = [
    { id: 1, nome: "beef", precoKg: 30, quantidade: 20, icon: "🥩", duracao: 120 },
    { id: 2, nome: "chicken", precoKg: 12, quantidade: 15, icon: "🍗", duracao: 120 },
    { id: 3, nome: "pork", precoKg: 18, quantidade: 10, icon: "🥓", duracao: 30 },
    { id: 4, nome: "sausage", precoKg: 22, quantidade: 8, icon: "🌭", duracao: 10 },
    { id: 5, nome: "beef", precoKg: 45, quantidade: 15, icon: "🥩", duracao: 60 },
    { id: 6, nome: "chicken", precoKg: 15, quantidade: 30, icon: "🍗", duracao: 50 },
    { id: 7, nome: "pork", precoKg: 32, quantidade: 25, icon: "🥓", duracao: 90 },
    { id: 8, nome: "sausage", precoKg: 48, quantidade: 15, icon: "🌭", duracao: 100 },
    { id: 9, nome: "beef", precoKg: 50, quantidade: 20, icon: "🥩", duracao: 120 },
    { id: 10, nome: "chicken", precoKg: 18, quantidade: 40, icon: "🍗", duracao: 110 }
  ];

  const tabs = [
    { id: "compras", label: "Fornecedores", icon: Warehouse, info: null },
    { id: "vendas", label: "Mercado", icon: Users, info: null },
    { id: "estoque", label: "Estoque", icon: Package, info: `${Object.values(currentStock).reduce((a, b) => a + b, 0)}kg` }
  ];

 const [vendasRealizadas, setVendasRealizadas] = useState([]);
 
 const [activeSell, setActiveSell] = useState(null);
  const pedidoProntoParaReceber = activeSell && dados.dia >= activeSell.diaFim;


  const [cicloFornecedores] = useState(() =>
    new CicloDeOfertas({
      baseData: fornecedores,
      quantidadeSorteio: 4,
      duracaoDias: 30,
      chaveStorage: "ciclo_Fornecedores"
    })
  );

  const [cicloVendas] = useState(() =>
    new CicloDeOfertas({
      baseData: ofertasVenda,
      quantidadeSorteio: 8,
      duracaoDias: 90,
      chaveStorage: "ciclo_Ofertas"
    })
  );

  useEffect(() => {
    cicloFornecedores.atualizarDia(dados.dia);
    cicloVendas.atualizarDia(dados.dia);
  }, [dados.dia]);

    const fornecedoresAtuais = cicloFornecedores.getItensDisponiveis();
  const ofertasVendaAtuais = cicloVendas.getItensDisponiveis();

  // --- COMPRA ---
  const handleCompra = (fornecedor) => {
    const { preco, tipo, quantidade } = fornecedor;

    if (saldo < preco) return alert("💰 Saldo insuficiente!");
    if (Object.values(currentStock).reduce((a, b) => a + b, 0) + quantidade > negocio.capacidadeEstoque)
      return alert("📦 Sem espaço no estoque!");

    removerSaldo(preco);
    atualizarEco("saldo", economiaSetores.saldo - preco);
    adicionarEstoque(tipo, quantidade);
  };

  // --- VENDA (apenas 1 por cliente) ---
  const handleVenda = (oferta) => {
    if (activeSell) return alert("⚠️ Você já tem uma venda em andamento!");

    setVendasRealizadas((prev) => [...prev, oferta.id]); 
    const estoqueAtual = currentStock[oferta.nome] || 0;
    if (oferta.quantidade > estoqueAtual) {
      alert("⚠️ Estoque insuficiente!");
      return;
    }
    if (removerEstoque(oferta.nome, oferta.quantidade)) {
      setActiveSell({
        ...oferta,
        diaInicio: dados.dia,
        diaFim: dados.dia + oferta.duracao
      });
    }
  };

  // --- RECEBIMENTO (após prazo) ---
  const handleReceber = () => {
    if (!activeSell) return;

    const totalVenda = activeSell.precoKg * activeSell.quantidade;
    adicionarSaldo(totalVenda);
    atualizarEco("saldo", economiaSetores.saldo + totalVenda);
    setActiveSell(null);
    setDiaAtual(dados.dia);
  };

  // --- RENDERIZAÇÃO ---
  const renderTabContent = (tab, cores, formatCurrency) => {
    if (tab === "compras") {
      return (
        <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
          {fornecedoresAtuais.map((f) => {
            const podeComprar = saldo >= f.preco;
            return (
              <div key={f.id} className="rounded-lg shadow-md p-4 bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{f.icon}</span>
                  <h3 className="text-sm font-bold" style={{ color: cores.primary }}>{f.nome}</h3>
                </div>
                <div className="text-sm space-y-1 mb-3">
                  <div className="flex justify-between"><span>Qtd:</span><span>{f.quantidade}kg</span></div>
                  <div className="flex justify-between"><span>Preço/kg:</span><span>{formatCurrency(f.precoKg)}</span></div>
                  <div className="flex justify-between"><span>Total:</span><span>{formatCurrency(f.preco)}</span></div>
                </div>
                <button
                  onClick={() => handleCompra(f)}
                  disabled={!podeComprar}
                  className="w-full py-3 rounded font-bold text-white"
                  style={{ backgroundColor: podeComprar ? cores.primary : "#6C757D" }}
                >
                  Comprar
                </button>
              </div>
            );
          })}
        </div>
      );
    }

    if (tab === "vendas") {

            const ofertasDisponiveis = ofertasVendaAtuais.filter((offer) => !vendasRealizadas.includes(offer.id));

      return (
        <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
          {ofertasDisponiveis.map((oferta) => {
            const estoqueAtual = currentStock[oferta.nome] || 0;
            const podeVender = !activeSell && estoqueAtual >= oferta.quantidade;
            const total = oferta.precoKg * oferta.quantidade;

            return (
              <div key={oferta.id} className="rounded-lg shadow-md p-4 bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{oferta.icon}</span>
                  <h3 className="text-sm font-bold" style={{ color: cores.primary }}>
                    Venda de {oferta.nome.toUpperCase()}
                  </h3>
                </div>
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between"><span>Qtd:</span><span>{oferta.quantidade}kg</span></div>
                  <div className="flex justify-between"><span>Preço/kg:</span><span>{formatCurrency(oferta.precoKg)}</span></div>
                  <div className="flex justify-between"><span>Total:</span><span className="text-green-600">{formatCurrency(total)}</span></div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Tempo para receber:</span><span>{oferta.duracao} dias</span>
                  </div>
                </div>
                <button
                  onClick={() => handleVenda(oferta)}
                  disabled={!podeVender}
                  className="w-full py-3 rounded font-bold text-white"
                  style={{ backgroundColor: podeVender ? cores.accent : "#6C757D" }}
                >
                  {activeSell ? "Vendendo..." : "Vender"}
                </button>
              </div>
            );
          })}
              {ofertasDisponiveis.length === 0 && (
            <p className="col-span-4 text-gray-500 text-sm mt-4">Todos os compradores já foram atendidos.</p>
          )}
        </div>
      );
    }

    if (tab === "estoque") {
      const produtos = {
        beef: { nome: "Carne Bovina", icon: "🥩" },
        pork: { nome: "Carne Suína", icon: "🥓" },
        chicken: { nome: "Frango", icon: "🍗" },
        sausage: { nome: "Embutidos", icon: "🌭" }
      };

      return (
        <div className="grid grid-cols-2 gap-6">
          {Object.entries(currentStock).map(([tipo, quantidade]) => (
            <div key={tipo} className="text-center text-white bg-white/20 rounded-xl">
              <div className="text-4xl mt-3 mb-3">{produtos[tipo]?.icon || "📦"}</div>
              <div className="text-3xl font-bold mb-2">{quantidade}kg</div>
              <div className="text-sm mb-3 opacity-80">{produtos[tipo]?.nome || tipo}</div>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <BaseBusinessInterface
      negocio={negocio}
      tabs={tabs}
      renderTabContent={renderTabContent}
      headerExtra={activeSell && (
        <div className="bg-white bg-opacity-20 rounded-lg p-3 text-white text-sm">
          {pedidoProntoParaReceber ? (
            <div className="flex items-center justify-between">
              <span>💵 Venda de {activeSell.nome} concluída!</span>
              <button
                onClick={handleReceber}
                className="px-4 py-2 rounded font-bold bg-green-500 text-white"
              >
                Receber R$ {activeSell.precoKg * activeSell.quantidade},00
              </button>
            </div>
          ) : (
            <div>
              💼 Vendendo {activeSell.nome} — Recebimento no dia {activeSell.diaFim}
            </div>
          )}
        </div>
      )}
    />
  );
};

const PainelSolarNegocio = () => {
  const { dados } = useContext(CentraldeDadosContext);
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);

  const { negocio, saldo, estoque: currentStock, adicionarSaldo, removerSaldo, adicionarEstoque, removerEstoque, setDiaAtual } =
    useNegocio({
      id: 'paineis-solares-1',
      nome: 'Fábrica de Painéis Solares',
      setor: 'energia',
      saldoInicial: 500000,
      estoqueInicial: { 
        residencial: 0, 
        comercial: 0, 
        industrial: 0,
        premium: 0 
      },
      capacidadeEstoque: 200,
      diaAtual: dados.dia
    });

  const getProductIcon = (type) => {
    const icons = {
      residencial: '🏠',
      comercial: '🏢',
      industrial: '🏭',
      premium: '⚡'
    };
    return icons[type] || '☀️';
  };

  // Dados de produção de painéis
  const paineis = [
    // Residencial
    { id: 1, nome: "Residencial", tipo: "residencial", custo: 15000, unidades: 10, valorPorUnidade: 2000, duracao: 45, icon: "🏠" },
    { id: 2, nome: "Residencial", tipo: "residencial", custo: 28000, unidades: 20, valorPorUnidade: 2000, duracao: 50, icon: "🏠" },
    { id: 3, nome: "Residencial", tipo: "residencial", custo: 39000, unidades: 30, valorPorUnidade: 2000, duracao: 55, icon: "🏠" },
    
    // Comercial
    { id: 4, nome: "Comercial", tipo: "comercial", custo: 35000, unidades: 10, valorPorUnidade: 4500, duracao: 60, icon: "🏢" },
    { id: 5, nome: "Comercial", tipo: "comercial", custo: 66000, unidades: 20, valorPorUnidade: 4500, duracao: 65, icon: "🏢" },
    { id: 6, nome: "Comercial", tipo: "comercial", custo: 94500, unidades: 30, valorPorUnidade: 4500, duracao: 70, icon: "🏢" },
    
    // Industrial
    { id: 7, nome: "Industrial", tipo: "industrial", custo: 80000, unidades: 10, valorPorUnidade: 10000, duracao: 90, icon: "🏭" },
    { id: 8, nome: "Industrial", tipo: "industrial", custo: 150000, unidades: 20, valorPorUnidade: 10000, duracao: 95, icon: "🏭" },
    { id: 9, nome: "Industrial", tipo: "industrial", custo: 210000, unidades: 30, valorPorUnidade: 10000, duracao: 100, icon: "🏭" },
    
    // Premium
    { id: 10, nome: "Premium", tipo: "premium", custo: 50000, unidades: 5, valorPorUnidade: 12000, duracao: 75, icon: "⚡" },
    { id: 11, nome: "Premium", tipo: "premium", custo: 90000, unidades: 10, valorPorUnidade: 12000, duracao: 80, icon: "⚡" },
    { id: 12, nome: "Premium", tipo: "premium", custo: 126000, unidades: 15, valorPorUnidade: 12000, duracao: 85, icon: "⚡" },
  ];

  // Ofertas de mercado com margens de 50-70%
  const marketOffers = [
    // RESIDENCIAL 🏠
    // custo base: 15.000 → lucro 50–70% → faixa: 22.500–25.500
    { id: 1, name: "residencial", unidades: 5, pricePerUnit: 2250, totalPrice: 11250 },   // +50%
    { id: 2, name: "residencial", unidades: 10, pricePerUnit: 2400, totalPrice: 24000 },  // +60%
    { id: 3, name: "residencial", unidades: 15, pricePerUnit: 2550, totalPrice: 38250 },  // +70%
    { id: 4, name: "residencial", unidades: 20, pricePerUnit: 2500, totalPrice: 50000 },  // +66%

    // COMERCIAL 🏢
    // custo base: 35.000 → lucro 50–70% → faixa: 52.500–59.500
    { id: 5, name: "comercial", unidades: 5, pricePerUnit: 5250, totalPrice: 26250 },     // +50%
    { id: 6, name: "comercial", unidades: 10, pricePerUnit: 5600, totalPrice: 56000 },    // +60%
    { id: 7, name: "comercial", unidades: 15, pricePerUnit: 5950, totalPrice: 89250 },    // +70%
    { id: 8, name: "comercial", unidades: 20, pricePerUnit: 5850, totalPrice: 117000 },   // +66%

    // INDUSTRIAL 🏭
    // custo base: 80.000 → lucro 50–70% → faixa: 120.000–136.000
    { id: 9, name: "industrial", unidades: 3, pricePerUnit: 12000, totalPrice: 36000 },   // +50%
    { id: 10, name: "industrial", unidades: 5, pricePerUnit: 12800, totalPrice: 64000 },  // +60%
    { id: 11, name: "industrial", unidades: 8, pricePerUnit: 13600, totalPrice: 108800 }, // +70%
    { id: 12, name: "industrial", unidades: 10, pricePerUnit: 13400, totalPrice: 134000 },// +68%

    // PREMIUM ⚡
    // custo base: 50.000 → lucro 50–70% → faixa: 75.000–85.000
    { id: 13, name: "premium", unidades: 3, pricePerUnit: 15000, totalPrice: 45000 },     // +50%
    { id: 14, name: "premium", unidades: 5, pricePerUnit: 16000, totalPrice: 80000 },     // +60%
    { id: 15, name: "premium", unidades: 8, pricePerUnit: 17000, totalPrice: 136000 },    // +70%
    { id: 16, name: "premium", unidades: 10, pricePerUnit: 16800, totalPrice: 168000 },   // +68%
  ];

  // Ciclos automáticos
  const [cicloPaineis] = useState(() =>
    new CicloDeOfertas({
      baseData: paineis,
      quantidadeSorteio: 4,
      duracaoDias: 30,
      chaveStorage: "ciclo_paineis"
    })
  );

  const [cicloMercado] = useState(() =>
    new CicloDeOfertas({
      baseData: marketOffers,
      quantidadeSorteio: 8,
      duracaoDias: 90,
      chaveStorage: "ciclo_mercado_paineis"
    })
  );

  useEffect(() => {
    cicloPaineis.atualizarDia(dados.dia);
    cicloMercado.atualizarDia(dados.dia);
  }, [dados.dia]);

  const paineisAtuais = cicloPaineis.getItensDisponiveis();
  const ofertasAtuais = cicloMercado.getItensDisponiveis();



  const [activeProduction, setActiveProduction] = useState(null);
  const producaoPronta = activeProduction && dados.dia >= activeProduction.diaFim;

  const handleProduzir = (painel) => {
    if (saldo < painel.custo) return;
    if (removerSaldo(painel.custo)) {
      atualizarEco("saldo", economiaSetores.saldo - painel.custo);
      setActiveProduction({
        ...painel,
        diaInicio: dados.dia,
        diaFim: dados.dia + painel.duracao
      });
    }
  };

  const handleColetar = () => {
    if (activeProduction) {
      adicionarEstoque(activeProduction.tipo, activeProduction.unidades);
      setActiveProduction(null);
      setDiaAtual(dados.dia);
    }
  };

  const [vendasRealizadas, setVendasRealizadas] = useState([]);

  const handleVender = (offer) => {
    const estoqueAtual = currentStock[offer.name] || 0;
    if (offer.unidades > estoqueAtual) {
      return alert("Você não tem unidades suficientes!");
    }

    removerEstoque(offer.name, offer.unidades);
    adicionarSaldo(offer.totalPrice);
    atualizarEco("saldo", economiaSetores.saldo + offer.totalPrice);
    setVendasRealizadas((prev) => [...prev, offer.id]);
  };

  const renderTabContent = (tab, cores, formatCurrency) => {
    if (tab === 'produzir') {
      return (
        <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
          {paineisAtuais.map((painel) => {
            const podeEscolher = !activeProduction && saldo >= painel.custo;
            return (
              <div key={painel.id} className="rounded-lg shadow-md p-4 bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{painel.icon}</span>
                  <h3 className="text-base font-bold" style={{ color: cores.primary }}>
                    {painel.nome}
                  </h3>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Custo:</span>
                    <span>{formatCurrency(painel.custo)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Unidades:</span>
                    <span>{painel.unidades}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Custo/Unidade:</span>
                    <span>{formatCurrency(painel.custo / painel.unidades)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Duração:</span>
                    <span>{painel.duracao} dias</span>
                  </div>
                </div>
                <button
                  onClick={() => handleProduzir(painel)}
                  disabled={!podeEscolher}
                  className="w-full py-3 rounded font-bold text-white"
                  style={{ backgroundColor: podeEscolher ? cores.accent : '#6C757D' }}
                >
                  {activeProduction ? 'Produzindo...' : 'Produzir'}
                </button>
              </div>
            );
          })}
        </div>
      );
    }

    if (tab === 'mercado') {
      const ofertasDisponiveis = ofertasAtuais.filter((offer) => !vendasRealizadas.includes(offer.id));

      return (
        <div className="grid grid-cols-4 gap-4 w-full mx-auto text-center">
          {ofertasDisponiveis.map((offer) => (
            <div key={offer.id} className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="font-bold text-gray-800 mb-2 capitalize text-3xl">
                {getProductIcon(offer.name)}
              </h3>
              <h3 className="font-bold text-gray-800 mb-2 capitalize">{offer.name}</h3>
              <p className="text-sm mb-1">{offer.unidades} unidades</p>
              <p className="text-xs text-gray-500 mb-3">
                R$ {offer.pricePerUnit.toLocaleString()}/un
              </p>
              <button
                onClick={() => handleVender(offer)}
                className="py-2 px-4 rounded font-bold text-white text-sm bg-green-600 hover:bg-green-700"
              >
                Vender
              </button>
            </div>
          ))}

          {ofertasDisponiveis.length === 0 && (
            <p className="col-span-4 text-gray-500 text-sm mt-4">
              Todos os compradores já foram atendidos.
            </p>
          )}
        </div>
      );
    }

    if (tab === 'estoque') {
      return (
        <div className="grid grid-cols-2 gap-6">
          {Object.entries(currentStock).map(([type, qtd]) => (
            <div key={type} className="text-center text-white bg-white/20 rounded-xl p-6">
              <h3 className="text-4xl mt-3 mb-3">{getProductIcon(type)}</h3>
              <h3 className="text-2xl font-bold mb-2 capitalize">{type}</h3>
              <div className="text-lg mb-3 opacity-80">{qtd} unidades</div>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  const tabs = [
    { id: 'produzir', label: 'Produzir', icon: Sun, info: null },
    { id: 'mercado', label: 'Mercado', icon: TrendingUp, info: null },
    { id: 'estoque', label: 'Estoque', icon: Package, info: `${Object.values(currentStock).reduce((a, b) => a + b, 0)} Unidades` },
  ];

  return (
    <BaseBusinessInterface
      negocio={negocio}
      tabs={tabs}
      renderTabContent={renderTabContent}
      headerExtra={
        activeProduction && (
          <div className="bg-white bg-opacity-20 rounded-lg p-3 text-white text-sm">
            {producaoPronta ? (
              <div className="flex items-center justify-between">
                <span>☀️ {activeProduction.nome} pronto para coleta!</span>
                <button
                  onClick={handleColetar}
                  className="px-4 py-2 rounded font-bold bg-green-500 text-white"
                >
                  Coletar ({activeProduction.unidades} un)
                </button>
              </div>
            ) : (
              <div>
                ⚡ Produzindo {activeProduction.nome} — Finaliza no dia {activeProduction.diaFim}
              </div>
            )}
          </div>
        )
      }
      footerExtra={(tab) => {
        if (tab === 'produzir') return `Próximo ciclo de produção em ${cicloPaineis.getFimCiclo() - dados.dia} dias`;
        if (tab === 'mercado') return `Próximo ciclo de mercado em ${cicloMercado.getFimCiclo() - dados.dia} dias`;
        return null;
      }}
    />
  );
};




const FabricaVeiculosNegocio = () => {
  const { dados } = useContext(CentraldeDadosContext);
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);

  const { negocio, saldo, estoque: currentStock, adicionarSaldo, removerSaldo, adicionarEstoque, removerEstoque, setDiaAtual } =
    useNegocio({
      id: 'fabrica-veiculos-1',
      nome: 'Fábrica de Veículos',
      setor: 'industria',
      saldoInicial: 800000,
      estoqueInicial: { 
        popular: 0, 
        sedan: 0, 
        suv: 0,
        luxo: 0,
        caminhonete: 0,
        van: 0
      },
      capacidadeEstoque: 100,
      diaAtual: dados.dia
    });

  const getProductIcon = (type) => {
    const icons = {
      popular: '🚗',
      sedan: '🚙',
      suv: '🚐',
      luxo: '🏎️',
      caminhonete: '🛻',
      van: '🚚'
    };
    return icons[type] || '🚗';
  };

  // Dados de produção de veículos
  const veiculos = [
    // Popular
    { id: 1, nome: "Popular", tipo: "popular", custo: 45000, unidades: 5, valorPorUnidade: 12000, duracao: 60, icon: "🚗" },
    { id: 2, nome: "Popular", tipo: "popular", custo: 84000, unidades: 10, valorPorUnidade: 12000, duracao: 65, icon: "🚗" },
    { id: 3, nome: "Popular", tipo: "popular", custo: 117000, unidades: 15, valorPorUnidade: 12000, duracao: 70, icon: "🚗" },
    
    // Sedan
    { id: 4, nome: "Sedan", tipo: "sedan", custo: 80000, unidades: 5, valorPorUnidade: 20000, duracao: 75, icon: "🚙" },
    { id: 5, nome: "Sedan", tipo: "sedan", custo: 150000, unidades: 10, valorPorUnidade: 20000, duracao: 80, icon: "🚙" },
    { id: 6, nome: "Sedan", tipo: "sedan", custo: 210000, unidades: 15, valorPorUnidade: 20000, duracao: 85, icon: "🚙" },
    
    // SUV
    { id: 7, nome: "SUV", tipo: "suv", custo: 120000, unidades: 4, valorPorUnidade: 35000, duracao: 90, icon: "🚐" },
    { id: 8, nome: "SUV", tipo: "suv", custo: 224000, unidades: 8, valorPorUnidade: 35000, duracao: 95, icon: "🚐" },
    { id: 9, nome: "SUV", tipo: "suv", custo: 308000, unidades: 12, valorPorUnidade: 35000, duracao: 100, icon: "🚐" },
    
    // Luxo
    { id: 10, nome: "Luxo", tipo: "luxo", custo: 200000, unidades: 3, valorPorUnidade: 80000, duracao: 110, icon: "🏎️" },
    { id: 11, nome: "Luxo", tipo: "luxo", custo: 360000, unidades: 6, valorPorUnidade: 80000, duracao: 115, icon: "🏎️" },
    { id: 12, nome: "Luxo", tipo: "luxo", custo: 480000, unidades: 9, valorPorUnidade: 80000, duracao: 120, icon: "🏎️" },

    // Caminhonete
    { id: 13, nome: "Caminhonete", tipo: "caminhonete", custo: 100000, unidades: 4, valorPorUnidade: 30000, duracao: 85, icon: "🛻" },
    { id: 14, nome: "Caminhonete", tipo: "caminhonete", custo: 180000, unidades: 8, valorPorUnidade: 30000, duracao: 90, icon: "🛻" },
    { id: 15, nome: "Caminhonete", tipo: "caminhonete", custo: 252000, unidades: 12, valorPorUnidade: 30000, duracao: 95, icon: "🛻" },

    // Van
    { id: 16, nome: "Van", tipo: "van", custo: 90000, unidades: 4, valorPorUnidade: 27000, duracao: 80, icon: "🚚" },
    { id: 17, nome: "Van", tipo: "van", custo: 162000, unidades: 8, valorPorUnidade: 27000, duracao: 85, icon: "🚚" },
    { id: 18, nome: "Van", tipo: "van", custo: 226800, unidades: 12, valorPorUnidade: 27000, duracao: 90, icon: "🚚" },
  ];

  // Ofertas de mercado com margens de 50-70%
  const marketOffers = [
    // POPULAR 🚗
    // custo base: 45.000 → lucro 50–70% → faixa: 67.500–76.500
    { id: 1, name: "popular", unidades: 3, pricePerUnit: 15000, totalPrice: 45000 },   // +50%
    { id: 2, name: "popular", unidades: 5, pricePerUnit: 16000, totalPrice: 80000 },   // +60%
    { id: 3, name: "popular", unidades: 8, pricePerUnit: 17000, totalPrice: 136000 },  // +70%
    { id: 4, name: "popular", unidades: 10, pricePerUnit: 16800, totalPrice: 168000 }, // +68%

    // SEDAN 🚙
    // custo base: 80.000 → lucro 50–70% → faixa: 120.000–136.000
    { id: 5, name: "sedan", unidades: 2, pricePerUnit: 24000, totalPrice: 48000 },     // +50%
    { id: 6, name: "sedan", unidades: 4, pricePerUnit: 25600, totalPrice: 102400 },    // +60%
    { id: 7, name: "sedan", unidades: 6, pricePerUnit: 27200, totalPrice: 163200 },    // +70%
    { id: 8, name: "sedan", unidades: 8, pricePerUnit: 26800, totalPrice: 214400 },    // +68%

    // SUV 🚐
    // custo base: 120.000 → lucro 50–70% → faixa: 180.000–204.000
    { id: 9, name: "suv", unidades: 2, pricePerUnit: 45000, totalPrice: 90000 },       // +50%
    { id: 10, name: "suv", unidades: 3, pricePerUnit: 48000, totalPrice: 144000 },     // +60%
    { id: 11, name: "suv", unidades: 5, pricePerUnit: 51000, totalPrice: 255000 },     // +70%
    { id: 12, name: "suv", unidades: 6, pricePerUnit: 50400, totalPrice: 302400 },     // +68%

    // LUXO 🏎️
    // custo base: 200.000 → lucro 50–70% → faixa: 300.000–340.000
    { id: 13, name: "luxo", unidades: 1, pricePerUnit: 100000, totalPrice: 100000 },   // +50%
    { id: 14, name: "luxo", unidades: 2, pricePerUnit: 106000, totalPrice: 212000 },   // +60%
    { id: 15, name: "luxo", unidades: 3, pricePerUnit: 113000, totalPrice: 339000 },   // +70%
    { id: 16, name: "luxo", unidades: 4, pricePerUnit: 112000, totalPrice: 448000 },   // +68%

    // CAMINHONETE 🛻
    // custo base: 100.000 → lucro 50–70% → faixa: 150.000–170.000
    { id: 17, name: "caminhonete", unidades: 2, pricePerUnit: 37500, totalPrice: 75000 },    // +50%
    { id: 18, name: "caminhonete", unidades: 4, pricePerUnit: 40000, totalPrice: 160000 },   // +60%
    { id: 19, name: "caminhonete", unidades: 6, pricePerUnit: 42500, totalPrice: 255000 },   // +70%
    { id: 20, name: "caminhonete", unidades: 8, pricePerUnit: 42000, totalPrice: 336000 },   // +68%

    // VAN 🚚
    // custo base: 90.000 → lucro 50–70% → faixa: 135.000–153.000
    { id: 21, name: "van", unidades: 2, pricePerUnit: 33750, totalPrice: 67500 },      // +50%
    { id: 22, name: "van", unidades: 4, pricePerUnit: 36000, totalPrice: 144000 },     // +60%
    { id: 23, name: "van", unidades: 6, pricePerUnit: 38250, totalPrice: 229500 },     // +70%
    { id: 24, name: "van", unidades: 8, pricePerUnit: 37800, totalPrice: 302400 },     // +68%
  ];

  // Ciclos automáticos
  const [cicloVeiculos] = useState(() =>
    new CicloDeOfertas({
      baseData: veiculos,
      quantidadeSorteio: 6,
      duracaoDias: 45,
      chaveStorage: "ciclo_veiculos"
    })
  );

  const [cicloMercado] = useState(() =>
    new CicloDeOfertas({
      baseData: marketOffers,
      quantidadeSorteio: 12,
      duracaoDias: 90,
      chaveStorage: "ciclo_mercado_veiculos"
    })
  );

  useEffect(() => {
    cicloVeiculos.atualizarDia(dados.dia);
    cicloMercado.atualizarDia(dados.dia);
  }, [dados.dia]);

  const veiculosAtuais = cicloVeiculos.getItensDisponiveis();
  const ofertasAtuais = cicloMercado.getItensDisponiveis();

  const [activeProduction, setActiveProduction] = useState(null);
  const producaoPronta = activeProduction && dados.dia >= activeProduction.diaFim;

  const handleProduzir = (veiculo) => {
    if (saldo < veiculo.custo) return;
    if (removerSaldo(veiculo.custo)) {
      atualizarEco("saldo", economiaSetores.saldo - veiculo.custo);
      setActiveProduction({
        ...veiculo,
        diaInicio: dados.dia,
        diaFim: dados.dia + veiculo.duracao
      });
    }
  };

  const handleColetar = () => {
    if (activeProduction) {
      adicionarEstoque(activeProduction.tipo, activeProduction.unidades);
      setActiveProduction(null);
      setDiaAtual(dados.dia);
    }
  };

  const [vendasRealizadas, setVendasRealizadas] = useState([]);

  const handleVender = (offer) => {
    const estoqueAtual = currentStock[offer.name] || 0;
    if (offer.unidades > estoqueAtual) {
      return alert("Você não tem veículos suficientes!");
    }

    removerEstoque(offer.name, offer.unidades);
    adicionarSaldo(offer.totalPrice);
    atualizarEco("saldo", economiaSetores.saldo + offer.totalPrice);
    setVendasRealizadas((prev) => [...prev, offer.id]);
  };

  const renderTabContent = (tab, cores, formatCurrency) => {
    if (tab === 'produzir') {
      return (
        <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto">
          {veiculosAtuais.map((veiculo) => {
            const podeEscolher = !activeProduction && saldo >= veiculo.custo;
            return (
              <div key={veiculo.id} className="rounded-lg shadow-md p-4 bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{veiculo.icon}</span>
                  <h3 className="text-base font-bold" style={{ color: cores.primary }}>
                    {veiculo.nome}
                  </h3>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Custo:</span>
                    <span>{formatCurrency(veiculo.custo)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Unidades:</span>
                    <span>{veiculo.unidades}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Custo/Unidade:</span>
                    <span>{formatCurrency(veiculo.custo / veiculo.unidades)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Duração:</span>
                    <span>{veiculo.duracao} dias</span>
                  </div>
                </div>
                <button
                  onClick={() => handleProduzir(veiculo)}
                  disabled={!podeEscolher}
                  className="w-full py-3 rounded font-bold text-white"
                  style={{ backgroundColor: podeEscolher ? cores.accent : '#6C757D' }}
                >
                  {activeProduction ? 'Produzindo...' : 'Produzir'}
                </button>
              </div>
            );
          })}
        </div>
      );
    }

    if (tab === 'mercado') {
      const ofertasDisponiveis = ofertasAtuais.filter((offer) => !vendasRealizadas.includes(offer.id));

      return (
        <div className="grid grid-cols-4 gap-4 w-full mx-auto text-center">
          {ofertasDisponiveis.map((offer) => (
            <div key={offer.id} className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="font-bold text-gray-800 mb-2 capitalize text-3xl">
                {getProductIcon(offer.name)}
              </h3>
              <h3 className="font-bold text-gray-800 mb-2 capitalize">{offer.name}</h3>
              <p className="text-sm mb-1">{offer.unidades} unidades</p>
              <p className="text-xs text-gray-500 mb-3">
                R$ {offer.pricePerUnit.toLocaleString()}/un
              </p>
              <button
                onClick={() => handleVender(offer)}
                className="py-2 px-4 rounded font-bold text-white text-sm bg-green-600 hover:bg-green-700"
              >
                Vender
              </button>
            </div>
          ))}

          {ofertasDisponiveis.length === 0 && (
            <p className="col-span-4 text-gray-500 text-sm mt-4">
              Todos os compradores já foram atendidos.
            </p>
          )}
        </div>
      );
    }

    if (tab === 'estoque') {
      return (
        <div className="grid grid-cols-3 gap-6">
          {Object.entries(currentStock).map(([type, qtd]) => (
            <div key={type} className="text-center text-white bg-white/20 rounded-xl p-6">
              <h3 className="text-4xl mt-3 mb-3">{getProductIcon(type)}</h3>
              <h3 className="text-xl font-bold mb-2 capitalize">{type}</h3>
              <div className="text-lg mb-3 opacity-80">{qtd} unidades</div>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  const tabs = [
    { id: 'produzir', label: 'Produzir', icon: Car, info: null },
    { id: 'mercado', label: 'Mercado', icon: TrendingUp, info: null },
    { id: 'estoque', label: 'Estoque', icon: Package, info: `${Object.values(currentStock).reduce((a, b) => a + b, 0)} Unidades` },
  ];

  return (
    <BaseBusinessInterface
      negocio={negocio}
      tabs={tabs}
      renderTabContent={renderTabContent}
      headerExtra={
        activeProduction && (
          <div className="bg-white bg-opacity-20 rounded-lg p-3 text-white text-sm">
            {producaoPronta ? (
              <div className="flex items-center justify-between">
                <span>🚗 {activeProduction.nome} pronto para coleta!</span>
                <button
                  onClick={handleColetar}
                  className="px-4 py-2 rounded font-bold bg-green-500 text-white"
                >
                  Coletar ({activeProduction.unidades} un)
                </button>
              </div>
            ) : (
              <div>
                🏭 Produzindo {activeProduction.nome} — Finaliza no dia {activeProduction.diaFim}
              </div>
            )}
          </div>
        )
      }
      footerExtra={(tab) => {
        if (tab === 'produzir') return `Próximo ciclo de produção em ${cicloVeiculos.getFimCiclo() - dados.dia} dias`;
        if (tab === 'mercado') return `Próximo ciclo de mercado em ${cicloMercado.getFimCiclo() - dados.dia} dias`;
        return null;
      }}
    />
  );
};
const FabricaSmartphonesNegocio = () => {
  const { dados } = useContext(CentraldeDadosContext);
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);

  const { negocio, saldo, estoque: currentStock, adicionarSaldo, removerSaldo, adicionarEstoque, removerEstoque, setDiaAtual } =
    useNegocio({
      id: 'fabrica-smartphones-1',
      nome: 'Fábrica de Smartphones',
      setor: 'tecnologia',
      saldoInicial: 600000,
      estoqueInicial: { 
        basico: 0, 
        intermediario: 0, 
        premium: 0,
        flagship: 0,
        gamer: 0,
        dobravel: 0
      },
      capacidadeEstoque: 150,
      diaAtual: dados.dia
    });

  const getProductIcon = (type) => {
    const icons = {
      basico: '📱',
      intermediario: '📲',
      premium: '📳',
      flagship: '🔥',
      gamer: '🎮',
      dobravel: '📴'
    };
    return icons[type] || '📱';
  };

  // Dados de produção de smartphones
  const smartphones = [
    // Básico
    { id: 1, nome: "Básico", tipo: "basico", custo: 20000, unidades: 20, valorPorUnidade: 1200, duracao: 40, icon: "📱" },
    { id: 2, nome: "Básico", tipo: "basico", custo: 36000, unidades: 40, valorPorUnidade: 1200, duracao: 45, icon: "📱" },
    { id: 3, nome: "Básico", tipo: "basico", custo: 50400, unidades: 60, valorPorUnidade: 1200, duracao: 50, icon: "📱" },
    
    // Intermediário
    { id: 4, nome: "Intermediário", tipo: "intermediario", custo: 50000, unidades: 20, valorPorUnidade: 3000, duracao: 55, icon: "📲" },
    { id: 5, nome: "Intermediário", tipo: "intermediario", custo: 90000, unidades: 40, valorPorUnidade: 3000, duracao: 60, icon: "📲" },
    { id: 6, nome: "Intermediário", tipo: "intermediario", custo: 126000, unidades: 60, valorPorUnidade: 3000, duracao: 65, icon: "📲" },
    
    // Premium
    { id: 7, nome: "Premium", tipo: "premium", custo: 100000, unidades: 15, valorPorUnidade: 8000, duracao: 70, icon: "📳" },
    { id: 8, nome: "Premium", tipo: "premium", custo: 180000, unidades: 30, valorPorUnidade: 8000, duracao: 75, icon: "📳" },
    { id: 9, nome: "Premium", tipo: "premium", custo: 252000, unidades: 45, valorPorUnidade: 8000, duracao: 80, icon: "📳" },
    
    // Flagship
    { id: 10, nome: "Flagship", tipo: "flagship", custo: 150000, unidades: 10, valorPorUnidade: 18000, duracao: 85, icon: "🔥" },
    { id: 11, nome: "Flagship", tipo: "flagship", custo: 270000, unidades: 20, valorPorUnidade: 18000, duracao: 90, icon: "🔥" },
    { id: 12, nome: "Flagship", tipo: "flagship", custo: 378000, unidades: 30, valorPorUnidade: 18000, duracao: 95, icon: "🔥" },

    // Gamer
    { id: 13, nome: "Gamer", tipo: "gamer", custo: 120000, unidades: 12, valorPorUnidade: 12000, duracao: 75, icon: "🎮" },
    { id: 14, nome: "Gamer", tipo: "gamer", custo: 216000, unidades: 24, valorPorUnidade: 12000, duracao: 80, icon: "🎮" },
    { id: 15, nome: "Gamer", tipo: "gamer", custo: 302400, unidades: 36, valorPorUnidade: 12000, duracao: 85, icon: "🎮" },

    // Dobrável
    { id: 16, nome: "Dobrável", tipo: "dobravel", custo: 200000, unidades: 8, valorPorUnidade: 30000, duracao: 100, icon: "📴" },
    { id: 17, nome: "Dobrável", tipo: "dobravel", custo: 360000, unidades: 16, valorPorUnidade: 30000, duracao: 105, icon: "📴" },
    { id: 18, nome: "Dobrável", tipo: "dobravel", custo: 504000, unidades: 24, valorPorUnidade: 30000, duracao: 110, icon: "📴" },
  ];

  // Ofertas de mercado com margens de 50-70%
  const marketOffers = [
    // BÁSICO 📱
    // custo base: 20.000 → lucro 50–70% → faixa: 30.000–34.000
    { id: 1, name: "basico", unidades: 10, pricePerUnit: 1500, totalPrice: 15000 },    // +50%
    { id: 2, name: "basico", unidades: 20, pricePerUnit: 1600, totalPrice: 32000 },    // +60%
    { id: 3, name: "basico", unidades: 30, pricePerUnit: 1700, totalPrice: 51000 },    // +70%
    { id: 4, name: "basico", unidades: 40, pricePerUnit: 1680, totalPrice: 67200 },    // +68%

    // INTERMEDIÁRIO 📲
    // custo base: 50.000 → lucro 50–70% → faixa: 75.000–85.000
    { id: 5, name: "intermediario", unidades: 10, pricePerUnit: 3750, totalPrice: 37500 },   // +50%
    { id: 6, name: "intermediario", unidades: 15, pricePerUnit: 4000, totalPrice: 60000 },   // +60%
    { id: 7, name: "intermediario", unidades: 20, pricePerUnit: 4250, totalPrice: 85000 },   // +70%
    { id: 8, name: "intermediario", unidades: 25, pricePerUnit: 4200, totalPrice: 105000 },  // +68%

    // PREMIUM 📳
    // custo base: 100.000 → lucro 50–70% → faixa: 150.000–170.000
    { id: 9, name: "premium", unidades: 8, pricePerUnit: 10000, totalPrice: 80000 },         // +50%
    { id: 10, name: "premium", unidades: 12, pricePerUnit: 10666, totalPrice: 127992 },      // +60%
    { id: 11, name: "premium", unidades: 15, pricePerUnit: 11333, totalPrice: 169995 },      // +70%
    { id: 12, name: "premium", unidades: 20, pricePerUnit: 11200, totalPrice: 224000 },      // +68%

    // FLAGSHIP 🔥
    // custo base: 150.000 → lucro 50–70% → faixa: 225.000–255.000
    { id: 13, name: "flagship", unidades: 5, pricePerUnit: 22500, totalPrice: 112500 },      // +50%
    { id: 14, name: "flagship", unidades: 8, pricePerUnit: 24000, totalPrice: 192000 },      // +60%
    { id: 15, name: "flagship", unidades: 10, pricePerUnit: 25500, totalPrice: 255000 },     // +70%
    { id: 16, name: "flagship", unidades: 12, pricePerUnit: 25200, totalPrice: 302400 },     // +68%

    // GAMER 🎮
    // custo base: 120.000 → lucro 50–70% → faixa: 180.000–204.000
    { id: 17, name: "gamer", unidades: 6, pricePerUnit: 15000, totalPrice: 90000 },          // +50%
    { id: 18, name: "gamer", unidades: 10, pricePerUnit: 16000, totalPrice: 160000 },        // +60%
    { id: 19, name: "gamer", unidades: 12, pricePerUnit: 17000, totalPrice: 204000 },        // +70%
    { id: 20, name: "gamer", unidades: 15, pricePerUnit: 16800, totalPrice: 252000 },        // +68%

    // DOBRÁVEL 📴
    // custo base: 200.000 → lucro 50–70% → faixa: 300.000–340.000
    { id: 21, name: "dobravel", unidades: 4, pricePerUnit: 37500, totalPrice: 150000 },      // +50%
    { id: 22, name: "dobravel", unidades: 6, pricePerUnit: 40000, totalPrice: 240000 },      // +60%
    { id: 23, name: "dobravel", unidades: 8, pricePerUnit: 42500, totalPrice: 340000 },      // +70%
    { id: 24, name: "dobravel", unidades: 10, pricePerUnit: 42000, totalPrice: 420000 },     // +68%
  ];

  // Ciclos automáticos
  const [cicloSmartphones] = useState(() =>
    new CicloDeOfertas({
      baseData: smartphones,
      quantidadeSorteio: 6,
      duracaoDias: 40,
      chaveStorage: "ciclo_smartphones"
    })
  );

  const [cicloMercado] = useState(() =>
    new CicloDeOfertas({
      baseData: marketOffers,
      quantidadeSorteio: 12,
      duracaoDias: 90,
      chaveStorage: "ciclo_mercado_smartphones"
    })
  );

  useEffect(() => {
    cicloSmartphones.atualizarDia(dados.dia);
    cicloMercado.atualizarDia(dados.dia);
  }, [dados.dia]);

  const smartphonesAtuais = cicloSmartphones.getItensDisponiveis();
  const ofertasAtuais = cicloMercado.getItensDisponiveis();

  const [activeProduction, setActiveProduction] = useState(null);
  const producaoPronta = activeProduction && dados.dia >= activeProduction.diaFim;

  const handleProduzir = (smartphone) => {
    if (saldo < smartphone.custo) return;
    if (removerSaldo(smartphone.custo)) {
      atualizarEco("saldo", economiaSetores.saldo - smartphone.custo);
      setActiveProduction({
        ...smartphone,
        diaInicio: dados.dia,
        diaFim: dados.dia + smartphone.duracao
      });
    }
  };

  const handleColetar = () => {
    if (activeProduction) {
      adicionarEstoque(activeProduction.tipo, activeProduction.unidades);
      setActiveProduction(null);
      setDiaAtual(dados.dia);
    }
  };

  const [vendasRealizadas, setVendasRealizadas] = useState([]);

  const handleVender = (offer) => {
    const estoqueAtual = currentStock[offer.name] || 0;
    if (offer.unidades > estoqueAtual) {
      return alert("Você não tem smartphones suficientes!");
    }

    removerEstoque(offer.name, offer.unidades);
    adicionarSaldo(offer.totalPrice);
    atualizarEco("saldo", economiaSetores.saldo + offer.totalPrice);
    setVendasRealizadas((prev) => [...prev, offer.id]);
  };

  const renderTabContent = (tab, cores, formatCurrency) => {
    if (tab === 'produzir') {
      return (
        <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto">
          {smartphonesAtuais.map((smartphone) => {
            const podeEscolher = !activeProduction && saldo >= smartphone.custo;
            return (
              <div key={smartphone.id} className="rounded-lg shadow-md p-4 bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{smartphone.icon}</span>
                  <h3 className="text-base font-bold" style={{ color: cores.primary }}>
                    {smartphone.nome}
                  </h3>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Custo:</span>
                    <span>{formatCurrency(smartphone.custo)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Unidades:</span>
                    <span>{smartphone.unidades}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Custo/Unidade:</span>
                    <span>{formatCurrency(smartphone.custo / smartphone.unidades)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Duração:</span>
                    <span>{smartphone.duracao} dias</span>
                  </div>
                </div>
                <button
                  onClick={() => handleProduzir(smartphone)}
                  disabled={!podeEscolher}
                  className="w-full py-3 rounded font-bold text-white"
                  style={{ backgroundColor: podeEscolher ? cores.accent : '#6C757D' }}
                >
                  {activeProduction ? 'Produzindo...' : 'Produzir'}
                </button>
              </div>
            );
          })}
        </div>
      );
    }

    if (tab === 'mercado') {
      const ofertasDisponiveis = ofertasAtuais.filter((offer) => !vendasRealizadas.includes(offer.id));

      return (
        <div className="grid grid-cols-4 gap-4 w-full mx-auto text-center">
          {ofertasDisponiveis.map((offer) => (
            <div key={offer.id} className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="font-bold text-gray-800 mb-2 capitalize text-3xl">
                {getProductIcon(offer.name)}
              </h3>
              <h3 className="font-bold text-gray-800 mb-2 capitalize">{offer.name}</h3>
              <p className="text-sm mb-1">{offer.unidades} unidades</p>
              <p className="text-xs text-gray-500 mb-3">
                R$ {offer.pricePerUnit.toLocaleString()}/un
              </p>
              <button
                onClick={() => handleVender(offer)}
                className="py-2 px-4 rounded font-bold text-white text-sm bg-green-600 hover:bg-green-700"
              >
                Vender
              </button>
            </div>
          ))}

          {ofertasDisponiveis.length === 0 && (
            <p className="col-span-4 text-gray-500 text-sm mt-4">
              Todos os compradores já foram atendidos.
            </p>
          )}
        </div>
      );
    }

    if (tab === 'estoque') {
      return (
        <div className="grid grid-cols-3 gap-6">
          {Object.entries(currentStock).map(([type, qtd]) => (
            <div key={type} className="text-center text-white bg-white/20 rounded-xl p-6">
              <h3 className="text-4xl mt-3 mb-3">{getProductIcon(type)}</h3>
              <h3 className="text-xl font-bold mb-2 capitalize">{type}</h3>
              <div className="text-lg mb-3 opacity-80">{qtd} unidades</div>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  const tabs = [
    { id: 'produzir', label: 'Produzir', icon: Smartphone, info: null },
    { id: 'mercado', label: 'Mercado', icon: TrendingUp, info: null },
    { id: 'estoque', label: 'Estoque', icon: Package, info: `${Object.values(currentStock).reduce((a, b) => a + b, 0)} Unidades` },
  ];

  return (
    <BaseBusinessInterface
      negocio={negocio}
      tabs={tabs}
      renderTabContent={renderTabContent}
      headerExtra={
        activeProduction && (
          <div className="bg-white bg-opacity-20 rounded-lg p-3 text-white text-sm">
            {producaoPronta ? (
              <div className="flex items-center justify-between">
                <span>📱 {activeProduction.nome} pronto para coleta!</span>
                <button
                  onClick={handleColetar}
                  className="px-4 py-2 rounded font-bold bg-green-500 text-white"
                >
                  Coletar ({activeProduction.unidades} un)
                </button>
              </div>
            ) : (
              <div>
                🏭 Produzindo {activeProduction.nome} — Finaliza no dia {activeProduction.diaFim}
              </div>
            )}
          </div>
        )
      }
      footerExtra={(tab) => {
        if (tab === 'produzir') return `Próximo ciclo de produção em ${cicloSmartphones.getFimCiclo() - dados.dia} dias`;
        if (tab === 'mercado') return `Próximo ciclo de mercado em ${cicloMercado.getFimCiclo() - dados.dia} dias`;
        return null;
      }}
    />
  );
};
const ConstrutoraInfraestruturaNegocio = () => {
  const { dados } = useContext(CentraldeDadosContext);
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);

  const { negocio, saldo, estoque: currentStock, adicionarSaldo, removerSaldo, adicionarEstoque, removerEstoque, setDiaAtual } =
    useNegocio({
      id: 'construtora-1',
      nome: 'Construtora de Infraestruturas',
      setor: 'imobiliario',
      saldoInicial: 1500000,
      estoqueInicial: { 
        ponte: 0, 
        estrada: 0, 
        tunel: 0,
        viaduto: 0,
        ferroviaria: 0,
        porto: 0
      },
      capacidadeEstoque: 50,
      diaAtual: dados.dia
    });

  const getProductIcon = (type) => {
    const icons = {
      ponte: '🌉',
      estrada: '🛣️',
      tunel: '🚇',
      viaduto: '🏗️',
      ferroviaria: '🚄',
      porto: '⚓'
    };
    return icons[type] || '🏗️';
  };

  // Dados de construção de infraestruturas
  const infraestruturas = [
    // Ponte
    { id: 1, nome: "Ponte Pequena", tipo: "ponte", custo: 500000, unidades: 1, valorPorUnidade: 500000, duracao: 180, icon: "🌉" },
    { id: 2, nome: "Ponte Média", tipo: "ponte", custo: 900000, unidades: 1, valorPorUnidade: 900000, duracao: 240, icon: "🌉" },
    { id: 3, nome: "Ponte Grande", tipo: "ponte", custo: 1500000, unidades: 1, valorPorUnidade: 1500000, duracao: 300, icon: "🌉" },
    
    // Estrada
    { id: 4, nome: "Estrada 10km", tipo: "estrada", custo: 300000, unidades: 1, valorPorUnidade: 300000, duracao: 120, icon: "🛣️" },
    { id: 5, nome: "Estrada 25km", tipo: "estrada", custo: 700000, unidades: 1, valorPorUnidade: 700000, duracao: 180, icon: "🛣️" },
    { id: 6, nome: "Estrada 50km", tipo: "estrada", custo: 1300000, unidades: 1, valorPorUnidade: 1300000, duracao: 240, icon: "🛣️" },
    
    // Túnel
    { id: 7, nome: "Túnel 2km", tipo: "tunel", custo: 800000, unidades: 1, valorPorUnidade: 800000, duracao: 210, icon: "🚇" },
    { id: 8, nome: "Túnel 5km", tipo: "tunel", custo: 1800000, unidades: 1, valorPorUnidade: 1800000, duracao: 270, icon: "🚇" },
    { id: 9, nome: "Túnel 10km", tipo: "tunel", custo: 3200000, unidades: 1, valorPorUnidade: 3200000, duracao: 330, icon: "🚇" },
    
    // Viaduto
    { id: 10, nome: "Viaduto Simples", tipo: "viaduto", custo: 400000, unidades: 1, valorPorUnidade: 400000, duracao: 150, icon: "🏗️" },
    { id: 11, nome: "Viaduto Duplo", tipo: "viaduto", custo: 750000, unidades: 1, valorPorUnidade: 750000, duracao: 200, icon: "🏗️" },
    { id: 12, nome: "Viaduto Complexo", tipo: "viaduto", custo: 1200000, unidades: 1, valorPorUnidade: 1200000, duracao: 250, icon: "🏗️" },

    // Ferroviária
    { id: 13, nome: "Ferrovia 15km", tipo: "ferroviaria", custo: 600000, unidades: 1, valorPorUnidade: 600000, duracao: 190, icon: "🚄" },
    { id: 14, nome: "Ferrovia 30km", tipo: "ferroviaria", custo: 1100000, unidades: 1, valorPorUnidade: 1100000, duracao: 250, icon: "🚄" },
    { id: 15, nome: "Ferrovia 60km", tipo: "ferroviaria", custo: 2000000, unidades: 1, valorPorUnidade: 2000000, duracao: 310, icon: "🚄" },

    // Porto
    { id: 16, nome: "Porto Pequeno", tipo: "porto", custo: 1000000, unidades: 1, valorPorUnidade: 1000000, duracao: 280, icon: "⚓" },
    { id: 17, nome: "Porto Médio", tipo: "porto", custo: 2200000, unidades: 1, valorPorUnidade: 2200000, duracao: 340, icon: "⚓" },
    { id: 18, nome: "Porto Grande", tipo: "porto", custo: 4000000, unidades: 1, valorPorUnidade: 4000000, duracao: 400, icon: "⚓" },
  ];

  // Ofertas de mercado com margens de 50-70%
  const marketOffers = [
    // PONTE 🌉
    // custo base: 500.000 → lucro 50–70% → faixa: 750.000–850.000
    { id: 1, name: "ponte", unidades: 1, pricePerUnit: 750000, totalPrice: 750000 },     // +50%
    { id: 2, name: "ponte", unidades: 1, pricePerUnit: 800000, totalPrice: 800000 },     // +60%
    { id: 3, name: "ponte", unidades: 1, pricePerUnit: 850000, totalPrice: 850000 },     // +70%
    { id: 4, name: "ponte", unidades: 2, pricePerUnit: 840000, totalPrice: 1680000 },    // +68%

    // ESTRADA 🛣️
    // custo base: 300.000 → lucro 50–70% → faixa: 450.000–510.000
    { id: 5, name: "estrada", unidades: 1, pricePerUnit: 450000, totalPrice: 450000 },   // +50%
    { id: 6, name: "estrada", unidades: 1, pricePerUnit: 480000, totalPrice: 480000 },   // +60%
    { id: 7, name: "estrada", unidades: 1, pricePerUnit: 510000, totalPrice: 510000 },   // +70%
    { id: 8, name: "estrada", unidades: 2, pricePerUnit: 504000, totalPrice: 1008000 },  // +68%

    // TÚNEL 🚇
    // custo base: 800.000 → lucro 50–70% → faixa: 1.200.000–1.360.000
    { id: 9, name: "tunel", unidades: 1, pricePerUnit: 1200000, totalPrice: 1200000 },   // +50%
    { id: 10, name: "tunel", unidades: 1, pricePerUnit: 1280000, totalPrice: 1280000 },  // +60%
    { id: 11, name: "tunel", unidades: 1, pricePerUnit: 1360000, totalPrice: 1360000 },  // +70%
    { id: 12, name: "tunel", unidades: 2, pricePerUnit: 1344000, totalPrice: 2688000 },  // +68%

    // VIADUTO 🏗️
    // custo base: 400.000 → lucro 50–70% → faixa: 600.000–680.000
    { id: 13, name: "viaduto", unidades: 1, pricePerUnit: 600000, totalPrice: 600000 },  // +50%
    { id: 14, name: "viaduto", unidades: 1, pricePerUnit: 640000, totalPrice: 640000 },  // +60%
    { id: 15, name: "viaduto", unidades: 1, pricePerUnit: 680000, totalPrice: 680000 },  // +70%
    { id: 16, name: "viaduto", unidades: 2, pricePerUnit: 672000, totalPrice: 1344000 }, // +68%

    // FERROVIÁRIA 🚄
    // custo base: 600.000 → lucro 50–70% → faixa: 900.000–1.020.000
    { id: 17, name: "ferroviaria", unidades: 1, pricePerUnit: 900000, totalPrice: 900000 },    // +50%
    { id: 18, name: "ferroviaria", unidades: 1, pricePerUnit: 960000, totalPrice: 960000 },    // +60%
    { id: 19, name: "ferroviaria", unidades: 1, pricePerUnit: 1020000, totalPrice: 1020000 },  // +70%
    { id: 20, name: "ferroviaria", unidades: 2, pricePerUnit: 1008000, totalPrice: 2016000 },  // +68%

    // PORTO ⚓
    // custo base: 1.000.000 → lucro 50–70% → faixa: 1.500.000–1.700.000
    { id: 21, name: "porto", unidades: 1, pricePerUnit: 1500000, totalPrice: 1500000 },  // +50%
    { id: 22, name: "porto", unidades: 1, pricePerUnit: 1600000, totalPrice: 1600000 },  // +60%
    { id: 23, name: "porto", unidades: 1, pricePerUnit: 1700000, totalPrice: 1700000 },  // +70%
    { id: 24, name: "porto", unidades: 2, pricePerUnit: 1680000, totalPrice: 3360000 },  // +68%
  ];

  // Ciclos automáticos
  const [cicloInfraestruturas] = useState(() =>
    new CicloDeOfertas({
      baseData: infraestruturas,
      quantidadeSorteio: 6,
      duracaoDias: 60,
      chaveStorage: "ciclo_infraestruturas"
    })
  );

  const [cicloMercado] = useState(() =>
    new CicloDeOfertas({
      baseData: marketOffers,
      quantidadeSorteio: 12,
      duracaoDias: 120,
      chaveStorage: "ciclo_mercado_infraestruturas"
    })
  );

  useEffect(() => {
    cicloInfraestruturas.atualizarDia(dados.dia);
    cicloMercado.atualizarDia(dados.dia);
  }, [dados.dia]);

  const infraestruturasAtuais = cicloInfraestruturas.getItensDisponiveis();
  const ofertasAtuais = cicloMercado.getItensDisponiveis();

  const [activeProduction, setActiveProduction] = useState(null);
  const producaoPronta = activeProduction && dados.dia >= activeProduction.diaFim;

  const handleConstruir = (infraestrutura) => {
    if (saldo < infraestrutura.custo) return;
    if (removerSaldo(infraestrutura.custo)) {
      atualizarEco("saldo", economiaSetores.saldo - infraestrutura.custo);
      setActiveProduction({
        ...infraestrutura,
        diaInicio: dados.dia,
        diaFim: dados.dia + infraestrutura.duracao
      });
    }
  };

  const handleColetar = () => {
    if (activeProduction) {
      adicionarEstoque(activeProduction.tipo, activeProduction.unidades);
      setActiveProduction(null);
      setDiaAtual(dados.dia);
    }
  };

  const [vendasRealizadas, setVendasRealizadas] = useState([]);

  const handleVender = (offer) => {
    const estoqueAtual = currentStock[offer.name] || 0;
    if (offer.unidades > estoqueAtual) {
      return alert("Você não tem infraestruturas suficientes!");
    }

    removerEstoque(offer.name, offer.unidades);
    adicionarSaldo(offer.totalPrice);
    atualizarEco("saldo", economiaSetores.saldo + offer.totalPrice);
    setVendasRealizadas((prev) => [...prev, offer.id]);
  };

  const renderTabContent = (tab, cores, formatCurrency) => {
    if (tab === 'construir') {
      return (
        <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto">
          {infraestruturasAtuais.map((infraestrutura) => {
            const podeEscolher = !activeProduction && saldo >= infraestrutura.custo;
            return (
              <div key={infraestrutura.id} className="rounded-lg shadow-md p-4 bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{infraestrutura.icon}</span>
                  <h3 className="text-base font-bold" style={{ color: cores.primary }}>
                    {infraestrutura.nome}
                  </h3>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Custo:</span>
                    <span>{formatCurrency(infraestrutura.custo)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tipo:</span>
                    <span className="capitalize">{infraestrutura.tipo}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Duração:</span>
                    <span>{infraestrutura.duracao} dias</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Status:</span>
                    <span className="text-xs">Obra complexa</span>
                  </div>
                </div>
                <button
                  onClick={() => handleConstruir(infraestrutura)}
                  disabled={!podeEscolher}
                  className="w-full py-3 rounded font-bold text-white"
                  style={{ backgroundColor: podeEscolher ? cores.accent : '#6C757D' }}
                >
                  {activeProduction ? 'Construindo...' : 'Construir'}
                </button>
              </div>
            );
          })}
        </div>
      );
    }

    if (tab === 'mercado') {
      const ofertasDisponiveis = ofertasAtuais.filter((offer) => !vendasRealizadas.includes(offer.id));

      return (
        <div className="grid grid-cols-4 gap-4 w-full mx-auto text-center">
          {ofertasDisponiveis.map((offer) => (
            <div key={offer.id} className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="font-bold text-gray-800 mb-2 capitalize text-3xl">
                {getProductIcon(offer.name)}
              </h3>
              <h3 className="font-bold text-gray-800 mb-2 capitalize">{offer.name}</h3>
              <p className="text-sm mb-1">{offer.unidades} obra(s)</p>
              <p className="text-xs text-gray-500 mb-3">
                {formatCurrency(offer.pricePerUnit)}/un
              </p>
              <button
                onClick={() => handleVender(offer)}
                className="py-2 px-4 rounded font-bold text-white text-sm bg-green-600 hover:bg-green-700"
              >
                Vender
              </button>
            </div>
          ))}

          {ofertasDisponiveis.length === 0 && (
            <p className="col-span-4 text-gray-500 text-sm mt-4">
              Todos os contratos já foram atendidos.
            </p>
          )}
        </div>
      );
    }

    if (tab === 'estoque') {
      return (
        <div className="grid grid-cols-3 gap-6">
          {Object.entries(currentStock).map(([type, qtd]) => (
            <div key={type} className="text-center text-white bg-white/20 rounded-xl p-6">
              <h3 className="text-4xl mt-3 mb-3">{getProductIcon(type)}</h3>
              <h3 className="text-xl font-bold mb-2 capitalize">{type}</h3>
              <div className="text-lg mb-3 opacity-80">{qtd} obra(s)</div>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  const tabs = [
    { id: 'construir', label: 'Construir', icon: Building2, info: null },
    { id: 'mercado', label: 'Mercado', icon: TrendingUp, info: null },
    { id: 'estoque', label: 'Estoque', icon: Package, info: `${Object.values(currentStock).reduce((a, b) => a + b, 0)} Obras` },
  ];

  return (
    <BaseBusinessInterface
      negocio={negocio}
      tabs={tabs}
      renderTabContent={renderTabContent}
      headerExtra={
        activeProduction && (
          <div className="bg-white bg-opacity-20 rounded-lg p-3 text-white text-sm">
            {producaoPronta ? (
              <div className="flex items-center justify-between">
                <span>🏗️ {activeProduction.nome} concluída!</span>
                <button
                  onClick={handleColetar}
                  className="px-4 py-2 rounded font-bold bg-green-500 text-white"
                >
                  Finalizar Obra
                </button>
              </div>
            ) : (
              <div>
                ⚙️ Construindo {activeProduction.nome} — Conclusão no dia {activeProduction.diaFim}
              </div>
            )}
          </div>
        )
      }
      footerExtra={(tab) => {
        if (tab === 'construir') return `Próximo ciclo de projetos em ${cicloInfraestruturas.getFimCiclo() - dados.dia} dias`;
        if (tab === 'mercado') return `Próximo ciclo de licitações em ${cicloMercado.getFimCiclo() - dados.dia} dias`;
        return null;
      }}
    />
  );
};
// ==================== APP PRINCIPAL ====================




const App = () => {
  const [negocioAtivo, setNegocioAtivo] = useState('plantacao');
  // const dados = useContext(CentraldeDadosContext);
  return (
    <div className="w-full flex flex-col justify-between items-center h-[80vh] rounded-xl m-auto p-4">
      <div className=" mx-auto flex ">
        <div className="flex gap-2 ">
          {/* {dados.edificios[0].quantidade>0 && */}
          <button
            onClick={() => setNegocioAtivo('plantacao')}
            className={`px-4 py-2 rounded font-bold ${negocioAtivo === 'plantacao'
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700'
              }`}
          >
            🌾 Plantação
          </button>
          {/* } */}
          <button
            onClick={() => setNegocioAtivo('acougue')}
            className={`px-4 py-2 rounded font-bold ${negocioAtivo === 'acougue'
              ? 'bg-red-700 text-white'
              : 'bg-white text-gray-700'
              }`}
          >
            🥩 Açougue
          </button>
          <button
            onClick={() => setNegocioAtivo('painel')}
            className={`px-4 py-2 rounded font-bold ${negocioAtivo === 'painel'
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700'
              }`}
          >
            ☀️ Painel 
          </button>
          <button
            onClick={() => setNegocioAtivo('automóveis')}
            className={`px-4 py-2 rounded font-bold ${negocioAtivo === 'automóveis'
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700'
              }`}
          >
            🚗 automóveis
          </button>
          <button
            onClick={() => setNegocioAtivo('smartphone')}
            className={`px-4 py-2 rounded font-bold ${negocioAtivo === 'smartphone'
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700'
              }`}
          >
            📱 smartphone
          </button>
          <button
            onClick={() => setNegocioAtivo('construtora')}
            className={`px-4 py-2 rounded font-bold ${negocioAtivo === 'construtora'
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700'
              }`}
          >
            🏗️ construtora
          </button>
        </div>
      </div>

      <div className="w-full mx-auto h-[calc(80vh-100px)]">
        {negocioAtivo === 'plantacao' && <PlantacaoNegocio />}
        {negocioAtivo === 'acougue' && <AcougueNegocio />}
        {negocioAtivo === 'painel' && <PainelSolarNegocio />}
        {negocioAtivo === 'automóveis' && <FabricaVeiculosNegocio />}
        {negocioAtivo === 'smartphone' && <FabricaSmartphonesNegocio />}
        {negocioAtivo === 'construtora' && <ConstrutoraInfraestruturaNegocio />}
      </div>
    </div>
  );
};

export default App;