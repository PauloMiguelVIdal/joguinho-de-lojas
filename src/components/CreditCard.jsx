// import React from 'react';

// const CreditCard = () => {
//   const setores = [
//     { 
//       id: "agricultura", 
//       cor1: "#003816", 
//       cor2: "#1A5E2A", 
//       cor3: "#0C9123", 
//       cor4: "#4CAF50",
//       bancos: ["AGRO BANK", "COOPERTATIVA BANK", "FARM BANK"]
//     },
//     { 
//       id: "tecnologia", 
//       cor1: "#A64B00", 
//       cor2: "#D45A00", 
//       cor3: "#FF6F00", 
//       cor4: "#FF8C42",
//       bancos: ["TECH BANK", "BANK OF ROBOTS", "AERO BANK"]
//     },
//     { 
//       id: "industria", 
//       cor1: "#1A1A1A", 
//       cor2: "#4D4D4D", 
//       cor3: "#808080", 
//       cor4: "#B3B3B3",
//       bancos: ["STEEL BANK", "FACTORY BANK", "INDUSTRIAL BANK"]
//     },
//     { 
//       id: "comercio", 
//       cor1: "#660000", 
//       cor2: "#A31919", 
//       cor3: "#E60000", 
//       cor4: "#FF4D4D",
//       bancos: ["TRADE BANK", "COMMERCE BANK", "BUSINESS BANK"]
//     },
//     { 
//       id: "imobiliario", 
//       cor1: "#000066", 
//       cor2: "#1A1A8C", 
//       cor3: "#3333CC", 
//       cor4: "#6666FF",
//       bancos: ["REAL ESTATE BANK", "PROPERTY BANK", "HOME BANK"]
//     },
//     { 
//       id: "energia", 
//       cor1: "#665200", 
//       cor2: "#A37F19", 
//       cor3: "#E6B800", 
//       cor4: "#FFD966",
//       bancos: ["ENERGY BANK", "POWER BANK", "ECO BANK"]
//     },
//   ];

//   return (
//     <div className="h-[700px] w-full bg-gray-100 overflow-hidden">
//       <div className="h-full flex flex-col p-8">
//         <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 flex-shrink-0">
//           Cartões Empresariais por Setor
//         </h1>
        
//         <div className="flex-1 overflow-y-auto">
//           <div className="max-w-4xl mx-auto space-y-8 pb-8">
//             {setores.map((setor) => (
//               <div key={setor.id} className="flex flex-col items-center space-y-4">
//                 <h2 className="text-2xl font-semibold capitalize text-gray-700">
//                   {setor.id}
//                 </h2>
                
//                 <div className="perspective-1000">
//                   <div 
//                     className="w-96 h-60 rounded-2xl p-8 text-white relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:rotate-x-1 shadow-xl"
//                     style={{
//                       background: `linear-gradient(135deg, ${setor.cor1} 0%, ${setor.cor2} 40%, ${setor.cor3} 80%, ${setor.cor4} 100%)`,
//                       boxShadow: `0 15px 35px ${setor.cor1}66`
//                     }}
//                   >
//                     {/* Padrão decorativo de fundo */}
//                     <div className="absolute -top-1/2 -right-1/5 w-48 h-48 bg-white/10 rounded-full opacity-30">
//                       <div className="absolute top-12 left-12 w-24 h-24 bg-white/10 rounded-full"></div>
//                     </div>

//                     {/* Efeito de brilho animado */}
//                     <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-pulse"></div>
                    
//                     {/* Logo do banco */}
//                     <div 
//                       className="absolute top-6 right-6 text-white px-4 py-2 rounded-lg text-sm font-bold backdrop-blur-sm shadow-lg"
//                       style={{
//                         backgroundColor: `${setor.cor4}E6`
//                       }}
//                     >
//                       {setor.bancos[0]}
//                     </div>
                    
//                     {/* Chip do cartão */}
//                     <div className="w-12 h-9 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg mt-5 mb-6 relative shadow-inner">
//                       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-5 bg-black/10 rounded-sm"></div>
//                     </div>
                    
//                     {/* Número do cartão */}
//                     <div className="text-2xl font-medium tracking-widest my-6 drop-shadow-sm">
//                       4532 1234 5678 9000
//                     </div>
                    
//                     {/* Informações do portador */}
//                     <div className="flex justify-between items-end mt-5">
//                       <div className="flex-1">
//                         <div className="text-xs opacity-80 uppercase tracking-wide mb-1">
//                           Empresa
//                         </div>
//                         <div className="text-base font-medium uppercase tracking-wide">
//                           VANE CORP
//                         </div>
//                       </div>
                      
//                       <div className="text-right">
//                         <div className="text-xs opacity-80 uppercase tracking-wide mb-1">
//                           Válido até
//                         </div>
//                         <div className="text-base font-medium tracking-wide">
//                           1500
//                         </div>
//                       </div>
//                     </div>
                    
//                     {/* Badge empresarial */}
//                     <div 
//                       className="absolute bottom-6 right-6 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
//                       style={{
//                         backgroundColor: `${setor.cor4}E6`
//                       }}
//                     >
//                       EMPRESARIAL
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         /* Customizar scrollbar */
//         .overflow-y-auto::-webkit-scrollbar {
//           width: 6px;
//         }
        
//         .overflow-y-auto::-webkit-scrollbar-track {
//           background: rgba(0, 0, 0, 0.1);
//           border-radius: 3px;
//         }
        
//         .overflow-y-auto::-webkit-scrollbar-thumb {
//           background: rgba(0, 0, 0, 0.3);
//           border-radius: 3px;
//         }
        
//         .overflow-y-auto::-webkit-scrollbar-thumb:hover {
//           background: rgba(0, 0, 0, 0.5);
//         }

//         .perspective-1000 {
//           perspective: 1000px;
//         }
        
//         .rotate-x-1 {
//           transform: translateY(-8px) rotateX(5deg);
//         }

//         @keyframes shine {
//           0% { transform: translateX(-100%); }
//           50% { transform: translateX(100%); }
//           100% { transform: translateX(100%); }
//         }

//         .animate-shine {
//           animation: shine 3s infinite;
//         }

//         @media (max-width: 480px) {
//           .w-96 {
//             width: 320px;
//           }
//           .h-60 {
//             height: 200px;
//           }
//           .p-8 {
//             padding: 25px;
//           }
//           .text-2xl {
//             font-size: 18px;
//             letter-spacing: 2px;
//           }
//           .text-base {
//             font-size: 14px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CreditCard;



const CreditCardVariations = () => {
  const cards = [
    {
      id: 1,
      name: "Minimalista Clean",
      className:
        "bg-white border border-gray-200 text-gray-800 shadow-lg",
      numberClass: "text-xl font-mono tracking-widest text-gray-800",
      chipClass: "from-gray-400 to-gray-600",
    },
    {
      id: 2,
      name: "Premium Dark",
      className:
        "bg-gradient-to-br from-black to-gray-900 text-white shadow-2xl",
      numberClass: "text-2xl font-semibold tracking-widest text-yellow-300",
      chipClass: "from-yellow-400 to-yellow-600",
    },
    {
      id: 3,
      name: "Futurista Neon",
      className:
        "bg-black text-white border-2 border-green-400 shadow-lg animate-pulse",
      numberClass: "text-2xl font-mono tracking-widest text-green-300",
      chipClass: "from-green-400 to-green-600",
    },
    {
      id: 4,
      name: "Nature/Agrícola",
      className:
        "text-white shadow-xl",
      style: {
        background:
          "linear-gradient(135deg, #003816 0%, #1A5E2A 40%, #0C9123 80%, #4CAF50 100%)",
      },
      numberClass: "text-2xl font-semibold tracking-widest",
      chipClass: "from-yellow-300 to-yellow-500",
    },
    {
      id: 5,
      name: "Retro 80s",
      className:
        "bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white shadow-xl",
      numberClass: "text-2xl font-bold tracking-widest text-yellow-200",
      chipClass: "from-pink-400 to-yellow-300",
    },
    {
      id: 6,
      name: "Vidro Fosco",
      className:
        "bg-white/20 backdrop-blur-lg border border-white/40 text-white shadow-lg",
      numberClass: "text-xl font-medium tracking-widest text-white",
      chipClass: "from-gray-200 to-gray-400",
    },
    {
      id: 7,
      name: "Rainbow Gradient",
      className:
        "bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-600 text-white shadow-lg",
      numberClass: "text-2xl font-semibold tracking-widest drop-shadow-lg",
      chipClass: "from-white to-gray-200",
    },
    {
      id: 8,
      name: "Corporativo Clean",
      className:
        "bg-gray-100 text-gray-800 border border-gray-300 shadow-md",
      numberClass: "text-xl font-mono tracking-widest text-gray-700",
      chipClass: "from-gray-300 to-gray-500",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Variações de Cartões Empresariais
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`w-96 h-60 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between ${card.className}`}
            style={card.style || {}}
          >
            {/* Chip */}
            <div
              className={`w-12 h-9 bg-gradient-to-br ${card.chipClass} rounded-lg shadow-inner`}
            ></div>

            {/* Número */}
            <div className={`${card.numberClass} my-4`}>
              4532 1234 5678 9000
            </div>

            {/* Empresa + validade */}
            <div className="flex justify-between text-sm">
              <div>
                <p className="uppercase opacity-80">Empresa</p>
                <p className="font-bold">VANE CORP</p>
              </div>
              <div className="text-right">
                <p className="uppercase opacity-80">Válido até</p>
                <p className="font-bold">1500</p>
              </div>
            </div>

            {/* Badge */}
            <div className="absolute bottom-4 right-4 bg-black/30 text-white text-xs px-3 py-1 rounded-full">
              {card.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreditCardVariations;

// import React from 'react';

// const CreativeCreditCards = () => {
//   const designModels = [
//     {
//       id: "premium-gold",
//       nome: "Premium Gold",
//       cor1: "#B8860B",
//       cor2: "#DAA520", 
//       cor3: "#FFD700",
//       cor4: "#FFF8DC",
//       banco: "GOLD BANK",
//       tema: "Luxo Premium"
//     },
//     {
//       id: "dark-purple",
//       nome: "Dark Purple Elite",
//       cor1: "#2D0B2F",
//       cor2: "#4A1A4D",
//       cor3: "#6B2C6E",
//       cor4: "#9B59B6",
//       banco: "ELITE BANK",
//       tema: "Elegância Sombria"
//     },
//     {
//       id: "light-purple",
//       nome: "Lavender Dreams",
//       cor1: "#9B59B6",
//       cor2: "#BB7EDF",
//       cor3: "#D8A2E3",
//       cor4: "#F4E6F7",
//       banco: "DREAM BANK",
//       tema: "Sofisticação Suave"
//     },
//     {
//       id: "monochrome",
//       nome: "Monochrome Pro",
//       cor1: "#000000",
//       cor2: "#333333",
//       cor3: "#666666",
//       cor4: "#FFFFFF",
//       banco: "PRO BANK",
//       tema: "Minimalismo"
//     },
//     {
//       id: "tech-green",
//       nome: "Tech Matrix",
//       cor1: "#001100",
//       cor2: "#003300",
//       cor3: "#00AA00",
//       cor4: "#00FF00",
//       banco: "MATRIX BANK",
//       tema: "Tecnologia"
//     },
//     {
//       id: "ocean-blue",
//       nome: "Ocean Depths",
//       cor1: "#001122",
//       cor2: "#003366",
//       cor3: "#0066CC",
//       cor4: "#87CEEB",
//       banco: "OCEAN BANK",
//       tema: "Profundezas Marinhas"
//     }
//   ];

//   const CardDesign1 = ({ design }) => (
//     <div 
//       className="w-80 h-52 rounded-3xl p-6 text-white relative overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300"
//       style={{
//         background: `linear-gradient(135deg, ${design.cor1} 0%, ${design.cor2} 50%, ${design.cor3} 100%)`
//       }}
//     >
//       {/* Formas geométricas decorativas */}
//       <div 
//         className="absolute -top-10 -right-10 w-32 h-32 rotate-45"
//         style={{ backgroundColor: design.cor4, opacity: 0.1 }}
//       ></div>
//       <div 
//         className="absolute top-16 -left-8 w-20 h-20 rounded-full"
//         style={{ backgroundColor: design.cor3, opacity: 0.15 }}
//       ></div>
      
//       {/* Logo do banco */}
//       <div 
//         className="absolute top-4 right-4 px-3 py-1 rounded-lg text-xs font-bold"
//         style={{ 
//           backgroundColor: design.cor4,
//           color: design.cor1,
//           opacity: 0.9
//         }}
//       >
//         {design.banco}
//       </div>
      
//       {/* Chip */}
//       <div className="w-12 h-8 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg mt-4 mb-6 relative shadow-lg">
//         <div className="absolute inset-2 bg-black bg-opacity-20 rounded"></div>
//       </div>
      
//       {/* Número do cartão */}
//       <div className="text-xl font-mono tracking-widest mb-6">
//         5432 **** **** 1098
//       </div>
      
//       {/* Info */}
//       <div className="flex justify-between items-end">
//         <div>
//           <div className="text-xs opacity-75 mb-1">PORTADOR</div>
//           <div className="text-sm font-medium">VANE CORP</div>
//         </div>
//         <div className="text-right">
//           <div className="text-xs opacity-75 mb-1">VÁLIDO</div>
//           <div className="text-sm font-medium">12/28</div>
//         </div>
//       </div>
//     </div>
//   );

//   const CardDesign2 = ({ design }) => (
//     <div 
//       className="w-80 h-52 rounded-2xl text-white relative overflow-hidden shadow-2xl transform hover:rotate-1 transition-all duration-300"
//       style={{
//         background: `linear-gradient(45deg, ${design.cor1} 0%, ${design.cor2} 100%)`
//       }}
//     >
//       {/* Pattern geométrico */}
//       <div className="absolute inset-0">
//         <div 
//           className="absolute top-0 left-0 w-full h-2"
//           style={{ backgroundColor: design.cor3 }}
//         ></div>
//         <div 
//           className="absolute bottom-0 right-0 w-2 h-full"
//           style={{ backgroundColor: design.cor3 }}
//         ></div>
//         <div 
//           className="absolute top-8 right-8 w-16 h-16 border-4 rotate-45"
//           style={{ borderColor: design.cor4, opacity: 0.3 }}
//         ></div>
//       </div>
      
//       <div className="p-6 relative z-10">
//         {/* Logo */}
//         <div 
//           className="absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-black tracking-wider"
//           style={{ 
//             backgroundColor: design.cor4,
//             color: design.cor1
//           }}
//         >
//           {design.banco}
//         </div>
        
//         {/* Chip futurista */}
//         <div 
//           className="w-14 h-10 rounded-xl mt-12 mb-6 relative"
//           style={{ backgroundColor: design.cor3 }}
//         >
//           <div className="absolute inset-1 bg-gradient-to-br from-white to-gray-300 rounded-lg"></div>
//           <div className="absolute inset-3 bg-gray-800 rounded"></div>
//         </div>
        
//         {/* Número */}
//         <div className="text-2xl font-light tracking-wider mb-6 font-mono">
//           4532 1234 5678 9000
//         </div>
        
//         {/* Info minimalista */}
//         <div className="flex justify-between text-xs">
//           <span className="opacity-80">VANE CORPORATION</span>
//           <span className="opacity-80">VALIDADE: 1500</span>
//         </div>
//       </div>
//     </div>
//   );

//   const CardDesign3 = ({ design }) => (
//     <div 
//       className="w-80 h-52 rounded-xl text-white relative overflow-hidden shadow-2xl"
//       style={{
//         background: `radial-gradient(circle at top right, ${design.cor3} 0%, ${design.cor2} 50%, ${design.cor1} 100%)`
//       }}
//     >
//       {/* Hexágonos decorativos */}
//       <div className="absolute inset-0">
//         {[...Array(6)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute border opacity-20"
//             style={{
//               borderColor: design.cor4,
//               width: '30px',
//               height: '30px',
//               clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
//               left: `${20 + i * 15}%`,
//               top: `${10 + (i % 2) * 20}%`,
//               transform: `rotate(${i * 30}deg)`
//             }}
//           ></div>
//         ))}
//       </div>
      
//       <div className="p-6 relative z-10">
//         {/* Logo com efeito glass */}
//         <div 
//           className="absolute top-4 right-4 px-3 py-2 rounded-lg text-xs font-bold backdrop-blur-sm"
//           style={{ 
//             backgroundColor: `${design.cor4}20`,
//             border: `1px solid ${design.cor4}40`,
//             color: design.cor4
//           }}
//         >
//           {design.banco}
//         </div>
        
//         {/* Chip com borda */}
//         <div 
//           className="w-12 h-9 rounded-lg mt-4 mb-6 relative border-2"
//           style={{ 
//             backgroundColor: design.cor3,
//             borderColor: design.cor4
//           }}
//         >
//           <div 
//             className="absolute inset-2 rounded"
//             style={{ backgroundColor: design.cor4, opacity: 0.8 }}
//           ></div>
//         </div>
        
//         {/* Número estilizado */}
//         <div 
//           className="text-xl font-semibold tracking-wide mb-6"
//           style={{ textShadow: `2px 2px 4px ${design.cor1}` }}
//         >
//           4532 1234 5678 9000
//         </div>
        
//         {/* Footer com divisor */}
//         <div 
//           className="border-t pt-3"
//           style={{ borderColor: design.cor4, opacity: 0.3 }}
//         >
//           <div className="flex justify-between items-center">
//             <div>
//               <div className="text-xs opacity-70">EMPRESA</div>
//               <div className="text-sm font-medium">VANE CORP</div>
//             </div>
//             <div className="text-right">
//               <div className="text-xs opacity-70">EXP</div>
//               <div className="text-sm font-medium">1500</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col">
//       <div className="p-6 pb-2">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
//           Coleção de Cartões Criativos
//         </h1>
//         <p className="text-center text-gray-600">
//           Designs únicos com formas geométricas e cores premium
//         </p>
//       </div>
      
//       <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-6">
//         <div className="max-w-6xl mx-auto">
//           {designModels.map((design, index) => (
//             <div key={design.id} className="mb-12">
//               <div className="text-center mb-6">
//                 <h2 className="text-2xl font-bold text-gray-800">{design.nome}</h2>
//                 <p className="text-gray-600 italic">{design.tema}</p>
//               </div>
              
//               <div className="flex flex-wrap justify-center gap-8">
//                 <div className="flex flex-col items-center">
//                   <h3 className="text-lg font-semibold text-gray-700 mb-4">Modelo Clássico</h3>
//                   <CardDesign1 design={design} />
//                 </div>
                
//                 <div className="flex flex-col items-center">
//                   <h3 className="text-lg font-semibold text-gray-700 mb-4">Modelo Futurista</h3>
//                   <CardDesign2 design={design} />
//                 </div>
                
//                 <div className="flex flex-col items-center">
//                   <h3 className="text-lg font-semibold text-gray-700 mb-4">Modelo Hexagonal</h3>
//                   <CardDesign3 design={design} />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-10px) rotate(5deg); }
//         }
        
//         .hover\\:scale-105:hover {
//           animation: float 3s ease-in-out infinite;
//         }

//         @media (max-width: 768px) {
//           .flex-wrap {
//             flex-direction: column;
//             align-items: center;
//           }
          
//           .w-80 {
//             width: 300px;
//           }
          
//           .h-52 {
//             height: 180px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CreativeCreditCards;

// import React from 'react';

// const CreativeCreditCards = () => {
//   const designModels = [
//     {
//       id: "rainbow-spectrum",
//       nome: "Rainbow Spectrum",
//       cor1: "#FF0080",
//       cor2: "#FF8000", 
//       cor3: "#80FF00",
//       cor4: "#00FF80",
//       banco: "SPECTRUM BANK",
//       tema: "Arco-Íris Vibrante"
//     },
//     {
//       id: "neon-cyber",
//       nome: "Neon Cyberpunk",
//       cor1: "#0D1B2A",
//       cor2: "#FF006E",
//       cor3: "#00F5FF",
//       cor4: "#FFBE0B",
//       banco: "CYBER BANK",
//       tema: "Cyberpunk Neon"
//     },
//     {
//       id: "holographic",
//       nome: "Holographic Shimmer",
//       cor1: "#8A2BE2",
//       cor2: "#FF1493",
//       cor3: "#00CED1",
//       cor4: "#ADFF2F",
//       banco: "HOLO BANK",
//       tema: "Efeito Holográfico"
//     },
//     {
//       id: "geometric-prism",
//       nome: "Prismatic Geometry",
//       cor1: "#1A1A2E",
//       cor2: "#E94560",
//       cor3: "#F39C12",
//       cor4: "#00D2D3",
//       banco: "PRISM BANK",
//       tema: "Prisma Geométrico"
//     },
//     {
//       id: "sunset-gradient",
//       nome: "Sunset Paradise",
//       cor1: "#667eea",
//       cor2: "#764ba2",
//       cor3: "#f093fb",
//       cor4: "#f5576c",
//       banco: "SUNSET BANK",
//       tema: "Pôr do Sol"
//     },
//     {
//       id: "crystal-facets",
//       nome: "Crystal Facets",
//       cor1: "#0F3460",
//       cor2: "#16213E",
//       cor3: "#533483",
//       cor4: "#E94560",
//       banco: "CRYSTAL BANK",
//       tema: "Facetas de Cristal"
//     },
//     {
//       id: "aurora-borealis",
//       nome: "Aurora Borealis",
//       cor1: "#134E5E",
//       cor2: "#71B280",
//       cor3: "#42E695",
//       cor4: "#3BB2B8",
//       banco: "AURORA BANK",
//       tema: "Aurora Boreal"
//     },
//     {
//       id: "diamond-cut",
//       nome: "Diamond Cut",
//       cor1: "#000428",
//       cor2: "#004e92",
//       cor3: "#009ffd",
//       cor4: "#00d2ff",
//       banco: "DIAMOND BANK",
//       tema: "Corte Diamante"
//     }
//   ];

//   const CardDesign1 = ({ design }) => (
//     <div 
//       className="w-80 h-52 rounded-3xl p-6 text-white relative overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300"
//       style={{
//         background: `linear-gradient(135deg, ${design.cor1} 0%, ${design.cor2} 50%, ${design.cor3} 100%)`
//       }}
//     >
//       {/* Formas geométricas decorativas */}
//       <div 
//         className="absolute -top-10 -right-10 w-32 h-32 rotate-45"
//         style={{ backgroundColor: design.cor4, opacity: 0.1 }}
//       ></div>
//       <div 
//         className="absolute top-16 -left-8 w-20 h-20 rounded-full"
//         style={{ backgroundColor: design.cor3, opacity: 0.15 }}
//       ></div>
      
//       {/* Logo do banco */}
//       <div 
//         className="absolute top-4 right-4 px-3 py-1 rounded-lg text-xs font-bold"
//         style={{ 
//           backgroundColor: design.cor4,
//           color: design.cor1,
//           opacity: 0.9
//         }}
//       >
//         {design.banco}
//       </div>
      
//       {/* Chip */}
//       <div className="w-12 h-8 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg mt-4 mb-6 relative shadow-lg">
//         <div className="absolute inset-2 bg-black bg-opacity-20 rounded"></div>
//       </div>
      
//       {/* Número do cartão */}
//       <div className="text-xl font-mono tracking-widest mb-6">
//         5432 **** **** 1098
//       </div>
      
//       {/* Info */}
//       <div className="flex justify-between items-end">
//         <div>
//           <div className="text-xs opacity-75 mb-1">PORTADOR</div>
//           <div className="text-sm font-medium">VANE CORP</div>
//         </div>
//         <div className="text-right">
//           <div className="text-xs opacity-75 mb-1">VÁLIDO</div>
//           <div className="text-sm font-medium">12/28</div>
//         </div>
//       </div>
//     </div>
//   );

//   const CardDesign2 = ({ design }) => (
//     <div 
//       className="w-80 h-52 rounded-2xl text-white relative overflow-hidden shadow-2xl transform hover:rotate-1 transition-all duration-300"
//       style={{
//         background: `linear-gradient(45deg, ${design.cor1} 0%, ${design.cor2} 100%)`
//       }}
//     >
//       {/* Pattern geométrico */}
//       <div className="absolute inset-0">
//         <div 
//           className="absolute top-0 left-0 w-full h-2"
//           style={{ backgroundColor: design.cor3 }}
//         ></div>
//         <div 
//           className="absolute bottom-0 right-0 w-2 h-full"
//           style={{ backgroundColor: design.cor3 }}
//         ></div>
//         <div 
//           className="absolute top-8 right-8 w-16 h-16 border-4 rotate-45"
//           style={{ borderColor: design.cor4, opacity: 0.3 }}
//         ></div>
//       </div>
      
//       <div className="p-6 relative z-10">
//         {/* Logo */}
//         <div 
//           className="absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-black tracking-wider"
//           style={{ 
//             backgroundColor: design.cor4,
//             color: design.cor1
//           }}
//         >
//           {design.banco}
//         </div>
        
//         {/* Chip futurista */}
//         <div 
//           className="w-14 h-10 rounded-xl mt-12 mb-6 relative"
//           style={{ backgroundColor: design.cor3 }}
//         >
//           <div className="absolute inset-1 bg-gradient-to-br from-white to-gray-300 rounded-lg"></div>
//           <div className="absolute inset-3 bg-gray-800 rounded"></div>
//         </div>
        
//         {/* Número */}
//         <div className="text-2xl font-light tracking-wider mb-6 font-mono">
//           4532 1234 5678 9000
//         </div>
        
//         {/* Info minimalista */}
//         <div className="flex justify-between text-xs">
//           <span className="opacity-80">VANE CORPORATION</span>
//           <span className="opacity-80">VALIDADE: 1500</span>
//         </div>
//       </div>
//     </div>
//   );

//   const CardDesign4 = ({ design }) => (
//     <div 
//       className="w-80 h-52 rounded-3xl text-white relative overflow-hidden shadow-2xl transform hover:scale-110 transition-all duration-500"
//       style={{
//         background: `conic-gradient(from 0deg, ${design.cor1}, ${design.cor2}, ${design.cor3}, ${design.cor4}, ${design.cor1})`
//       }}
//     >
//       {/* Triangulos geométricos */}
//       <div className="absolute inset-0">
//         <div 
//           className="absolute top-4 left-4 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[35px] border-transparent"
//           style={{ borderBottomColor: design.cor4, opacity: 0.3 }}
//         ></div>
//         <div 
//           className="absolute bottom-4 right-4 w-0 h-0 border-l-[25px] border-r-[25px] border-t-[43px] border-transparent rotate-180"
//           style={{ borderTopColor: design.cor1, opacity: 0.4 }}
//         ></div>
//         <div 
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rotate-45 border-4"
//           style={{ borderColor: design.cor4, opacity: 0.2 }}
//         ></div>
//       </div>
      
//       <div className="p-6 relative z-10">
//         <div 
//           className="absolute top-4 right-4 px-3 py-2 rounded-full text-xs font-black"
//           style={{ 
//             backgroundColor: 'rgba(255,255,255,0.9)',
//             color: design.cor1
//           }}
//         >
//           {design.banco}
//         </div>
        
//         <div className="w-12 h-8 bg-gradient-to-br from-white to-gray-200 rounded-lg mt-4 mb-6 relative shadow-lg">
//           <div className="absolute inset-1 bg-gradient-to-br from-yellow-400 to-orange-500 rounded opacity-80"></div>
//           <div className="absolute inset-2 bg-gray-800 rounded"></div>
//         </div>
        
//         <div className="text-xl font-mono tracking-widest mb-6 text-shadow-lg">
//           4532 1234 5678 9000
//         </div>
        
//         <div className="flex justify-between items-end">
//           <div>
//             <div className="text-xs opacity-90 mb-1">EMPRESA</div>
//             <div className="text-sm font-bold">VANE CORP</div>
//           </div>
//           <div className="text-right">
//             <div className="text-xs opacity-90 mb-1">VÁLIDO</div>
//             <div className="text-sm font-bold">1500</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const CardDesign5 = ({ design }) => (
//     <div 
//       className="w-80 h-52 rounded-2xl text-white relative overflow-hidden shadow-2xl transform hover:-rotate-3 hover:scale-105 transition-all duration-700"
//       style={{
//         background: `linear-gradient(45deg, ${design.cor1} 0%, ${design.cor2} 25%, ${design.cor3} 50%, ${design.cor4} 75%, ${design.cor1} 100%)`
//       }}
//     >
//       {/* Losangos e retângulos */}
//       <div className="absolute inset-0">
//         <div 
//           className="absolute top-8 left-8 w-12 h-12 transform rotate-45"
//           style={{ backgroundColor: design.cor4, opacity: 0.2 }}
//         ></div>
//         <div 
//           className="absolute bottom-12 right-12 w-8 h-16 transform -rotate-12"
//           style={{ backgroundColor: design.cor2, opacity: 0.3 }}
//         ></div>
//         <div 
//           className="absolute top-16 right-8 w-6 h-6 transform rotate-12"
//           style={{ backgroundColor: design.cor3, opacity: 0.4 }}
//         ></div>
//         <div 
//           className="absolute bottom-8 left-16 w-10 h-4 transform rotate-45"
//           style={{ backgroundColor: design.cor4, opacity: 0.25 }}
//         ></div>
//       </div>
      
//       <div className="p-6 relative z-10">
//         <div 
//           className="absolute top-4 right-4 px-4 py-2 rounded-xl text-xs font-black transform -rotate-3"
//           style={{ 
//             backgroundColor: design.cor4,
//             color: design.cor1,
//             boxShadow: `0 4px 15px ${design.cor1}50`
//           }}
//         >
//           {design.banco}
//         </div>
        
//         <div 
//           className="w-14 h-9 rounded-lg mt-4 mb-6 relative transform rotate-3"
//           style={{ backgroundColor: design.cor3 }}
//         >
//           <div className="absolute inset-1 bg-gradient-to-tr from-white to-yellow-300 rounded"></div>
//           <div className="absolute inset-3 bg-gray-700 rounded"></div>
//         </div>
        
//         <div 
//           className="text-xl font-bold tracking-wide mb-6 transform -rotate-1"
//           style={{ textShadow: `3px 3px 6px ${design.cor1}` }}
//         >
//           4532 1234 5678 9000
//         </div>
        
//         <div className="flex justify-between items-end">
//           <div className="transform rotate-1">
//             <div className="text-xs opacity-80 mb-1">PORTADOR</div>
//             <div className="text-sm font-semibold">VANE CORP</div>
//           </div>
//           <div className="text-right transform -rotate-1">
//             <div className="text-xs opacity-80 mb-1">EXP</div>
//             <div className="text-sm font-semibold">1500</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const CardDesign6 = ({ design }) => (
//     <div 
//       className="w-80 h-52 rounded-3xl text-white relative overflow-hidden shadow-2xl"
//       style={{
//         background: `linear-gradient(135deg, ${design.cor1} 0%, ${design.cor2} 33%, ${design.cor3} 66%, ${design.cor4} 100%)`
//       }}
//     >
//       {/* Pattern de ondas geométricas */}
//       <div className="absolute inset-0">
//         <svg className="w-full h-full opacity-20" viewBox="0 0 400 200">
//           <path d="M0,100 Q100,50 200,100 T400,100 L400,200 L0,200 Z" fill={design.cor4} opacity="0.3"/>
//           <path d="M0,120 Q100,70 200,120 T400,120 L400,200 L0,200 Z" fill={design.cor3} opacity="0.2"/>
//           <path d="M0,140 Q100,90 200,140 T400,140 L400,200 L0,200 Z" fill={design.cor2} opacity="0.1"/>
//         </svg>
        
//         <div 
//           className="absolute top-6 right-6 w-20 h-20 rounded-full border-4 opacity-30"
//           style={{ borderColor: design.cor4 }}
//         ></div>
//         <div 
//           className="absolute bottom-8 left-8 w-12 h-12 opacity-25"
//           style={{ 
//             backgroundColor: design.cor4,
//             clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
//           }}
//         ></div>
//       </div>
      
//       <div className="p-6 relative z-10">
//         <div 
//           className="absolute top-4 right-4 px-4 py-2 rounded-2xl text-xs font-black backdrop-blur-sm"
//           style={{ 
//             backgroundColor: `${design.cor4}30`,
//             border: `2px solid ${design.cor4}`,
//             color: design.cor4
//           }}
//         >
//           {design.banco}
//         </div>
        
//         <div 
//           className="w-12 h-8 rounded-lg mt-4 mb-6 relative"
//           style={{ 
//             background: `linear-gradient(45deg, ${design.cor3}, ${design.cor4})`
//           }}
//         >
//           <div className="absolute inset-1 bg-white rounded opacity-90"></div>
//           <div className="absolute inset-2 bg-gray-900 rounded"></div>
//         </div>
        
//         <div className="text-xl font-light tracking-widest mb-6 font-mono">
//           4532 1234 5678 9000
//         </div>
        
//         <div 
//           className="flex justify-between items-end pt-2 border-t"
//           style={{ borderColor: design.cor4, borderOpacity: 0.4 }}
//         >
//           <div>
//             <div className="text-xs opacity-75 mb-1">EMPRESA</div>
//             <div className="text-sm font-medium">VANE CORP</div>
//           </div>
//           <div className="text-right">
//             <div className="text-xs opacity-75 mb-1">VALID</div>
//             <div className="text-sm font-medium">1500</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col">
//       <div className="p-6 pb-2">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
//           Coleção Rainbow & Designs Geométricos
//         </h1>
//         <p className="text-center text-gray-600">
//           Cartões vibrantes com padrões geométricos únicos e efeitos especiais
//         </p>
//       </div>
      
//       <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-6">
//         <div className="max-w-6xl mx-auto">
//           {designModels.map((design, index) => (
//             <div key={design.id} className="mb-12">
//               <div className="text-center mb-6">
//                 <h2 className="text-2xl font-bold text-gray-800">{design.nome}</h2>
//                 <p className="text-gray-600 italic">{design.tema}</p>
//               </div>
              
//               <div className="flex flex-wrap justify-center gap-8">
//                 <div className="flex flex-col items-center">
//                   <h3 className="text-lg font-semibold text-gray-700 mb-4">Triangular Fusion</h3>
//                   <CardDesign4 design={design} />
//                 </div>
                
//                 <div className="flex flex-col items-center">
//                   <h3 className="text-lg font-semibold text-gray-700 mb-4">Geometric Chaos</h3>
//                   <CardDesign5 design={design} />
//                 </div>
                
//                 <div className="flex flex-col items-center">
//                   <h3 className="text-lg font-semibold text-gray-700 mb-4">Wave Patterns</h3>
//                   <CardDesign6 design={design} />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes rainbow-shift {
//           0% { filter: hue-rotate(0deg); }
//           25% { filter: hue-rotate(90deg); }
//           50% { filter: hue-rotate(180deg); }
//           75% { filter: hue-rotate(270deg); }
//           100% { filter: hue-rotate(360deg); }
//         }
        
//         .hover\\:scale-110:hover {
//           animation: rainbow-shift 2s infinite;
//         }
        
//         @keyframes geometric-pulse {
//           0%, 100% { transform: scale(1) rotate(0deg); }
//           50% { transform: scale(1.1) rotate(5deg); }
//         }
        
//         .hover\\:-rotate-3:hover {
//           animation: geometric-pulse 1.5s ease-in-out infinite;
//         }

//         @media (max-width: 768px) {
//           .flex-wrap {
//             flex-direction: column;
//             align-items: center;
//           }
          
//           .w-80 {
//             width: 300px;
//           }
          
//           .h-52 {
//             height: 180px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CreativeCreditCards;
//