// import React, { useState } from 'react';

// const BankDetailsInterface = () => {
//   const [activeTab, setActiveTab] = useState('cartoes');
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [selectedLoan, setSelectedLoan] = useState(null);
//   const [selectedInvestment, setSelectedInvestment] = useState(null);

//   const banco = {
//     nome: "Agro Bank",
//     icone: "🌱",
//     descricao: "Especialista no setor agrícola",
//     cor: "from-green-600 to-green-800",
//     cashbackSetor: "Fazendas"
//   };

//   const cartoes = [
//     {
//       id: 1,
//       nome: "Agro Classic",
//       tipo: "Clássico",
//       anuidade: 0,
//       limite: "Até R$ 5.000",
//       cashback: "2% em fazendas",
//       beneficios: ["Sem anuidade", "Cashback em fazendas", "App exclusivo"],
//       cor: "from-green-500 to-green-600"
//     },
//     {
//       id: 2,
//       nome: "Agro Premium",
//       tipo: "Premium",
//       anuidade: 120,
//       limite: "Até R$ 15.000",
//       cashback: "3% em fazendas + 1% em geral",
//       beneficios: ["Cashback duplo", "Acesso a lounges", "Seguro viagem", "Concierge 24h"],
//       cor: "from-green-600 to-green-700"
//     }
//   ];

//   const emprestimos = [
//     {
//       id: 1,
//       nome: "Crédito Rural",
//       valor: "R$ 15.000 - R$ 50.000",
//       juros: "6% ao ano",
//       parcelas: "12 a 60x",
//       requisitos: ["CPF limpo", "Renda comprovada", "Propriedade rural"],
//       cor: "from-blue-500 to-blue-600"
//     },
//     {
//       id: 2,
//       nome: "Expansão Agrícola",
//       valor: "R$ 50.000 - R$ 200.000",
//       juros: "7.5% ao ano",
//       parcelas: "24 a 120x",
//       requisitos: ["Experiência no setor", "Garantias", "Projeto detalhado"],
//       cor: "from-blue-600 to-blue-700"
//     },
//     {
//       id: 3,
//       nome: "Mega Financiamento",
//       valor: "R$ 200.000 - R$ 1.000.000",
//       juros: "8% ao ano",
//       parcelas: "60 a 240x",
//       requisitos: ["Análise rigorosa", "Múltiplas garantias", "Histórico comprovado"],
//       cor: "from-blue-700 to-blue-800"
//     }
//   ];

//   const investimentos = [
//     {
//       id: 1,
//       nome: "Poupança Verde",
//       rentabilidade: "100% do CDI",
//       risco: "Baixo",
//       minimo: "R$ 1.000",
//       liquidez: "Diária",
//       descricao: "Investimento seguro com foco sustentável",
//       cor: "from-green-400 to-green-500"
//     },
//     {
//       id: 2,
//       nome: "CDB Agro",
//       rentabilidade: "110% do CDI",
//       risco: "Baixo",
//       minimo: "R$ 5.000",
//       liquidez: "90 dias",
//       descricao: "CDB com rendimento superior focado no agronegócio",
//       cor: "from-green-500 to-green-600"
//     },
//     {
//       id: 3,
//       nome: "Fundo Commodities",
//       rentabilidade: "12-18% ao ano",
//       risco: "Médio",
//       minimo: "R$ 20.000",
//       liquidez: "30 dias",
//       descricao: "Invista no mercado de commodities agrícolas",
//       cor: "from-yellow-500 to-orange-500"
//     },
//     {
//       id: 4,
//       nome: "Ações Agro",
//       rentabilidade: "Variável",
//       risco: "Alto",
//       minimo: "R$ 10.000",
//       liquidez: "Diária",
//       descricao: "Portfólio diversificado de ações do setor",
//       cor: "from-red-500 to-red-600"
//     }
//   ];

//   const tabs = [
//     { id: 'cartoes', nome: 'Cartões de Crédito', icone: '💳' },
//     { id: 'emprestimos', nome: 'Empréstimos', icone: '💰' },
//     { id: 'investimentos', nome: 'Investimentos', icone: '📈' },
//     { id: 'beneficios', nome: 'Benefícios', icone: '🎁' }
//   ];

//   return (
//     <div className="h-full w-full bg-slate-900 text-white flex flex-col">
//       <div className={`bg-gradient-to-r ${banco.cor} p-6 shadow-xl flex-shrink-0`}>
//         <div className="max-w-6xl mx-auto">
//           <div className="flex items-center gap-6 mb-4">
//             <div className="text-6xl">{banco.icone}</div>
//             <div>
//               <h1 className="text-4xl font-bold">{banco.nome}</h1>
//               <p className="text-xl text-green-100">{banco.descricao}</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
//             <div className="bg-white/20 rounded-lg p-4 text-center">
//               <div className="text-2xl font-bold">6%</div>
//               <div className="text-sm">Juros a partir de</div>
//             </div>
//             <div className="bg-white/20 rounded-lg p-4 text-center">
//               <div className="text-2xl font-bold">2</div>
//               <div className="text-sm">Opções de cartão</div>
//             </div>
//             <div className="bg-white/20 rounded-lg p-4 text-center">
//               <div className="text-2xl font-bold">3%</div>
//               <div className="text-sm">Cashback máximo</div>
//             </div>
//             <div className="bg-white/20 rounded-lg p-4 text-center">
//               <div className="text-2xl font-bold">4</div>
//               <div className="text-sm">Opções investimento</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-slate-800 shadow-lg flex-shrink-0">
//         <div className="max-w-6xl mx-auto">
//           <div className="flex overflow-x-auto">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center gap-3 px-6 py-4 whitespace-nowrap transition-all duration-300 ${
//                   activeTab === tab.id
//                     ? 'bg-green-600 text-white border-b-2 border-green-400'
//                     : 'text-slate-300 hover:text-white hover:bg-slate-700'
//                 }`}
//               >
//                 <span className="text-xl">{tab.icone}</span>
//                 <span className="font-medium">{tab.nome}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="flex-1 w-full overflow-hidden">
//         <div className="max-w-6xl mx-auto p-6 h-[40%]">
//           {activeTab === 'cartoes' && (
//             <div className="h-full flex flex-col">
//               <h2 className="text-3xl font-bold mb-6 flex-shrink-0">Cartões de Crédito Disponíveis</h2>
//               <div className="flex-1 overflow-y-auto scrollbar-custom">
//                 <div className="grid md:grid-cols-2 gap-6 pb-6">
//                   {cartoes.map((cartao) => (
//                     <div
//                       key={cartao.id}
//                       className={`bg-gradient-to-br ${cartao.cor} rounded-2xl p-6 shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer ${
//                         selectedCard === cartao.id ? 'ring-4 ring-white' : ''
//                       }`}
//                       onClick={() => setSelectedCard(cartao.id)}
//                     >
//                       <div className="flex justify-between items-start mb-4">
//                         <div>
//                           <h3 className="text-2xl font-bold">{cartao.nome}</h3>
//                           <p className="text-green-100">{cartao.tipo}</p>
//                         </div>
//                         <div className="text-right">
//                           <div className="text-lg font-bold">
//                             {cartao.anuidade === 0 ? 'Gratuito' : `R$ ${cartao.anuidade}/ano`}
//                           </div>
//                           <div className="text-sm text-green-200">Anuidade</div>
//                         </div>
//                       </div>

//                       <div className="space-y-3 mb-4">
//                         <div className="flex justify-between">
//                           <span>Limite:</span>
//                           <span className="font-bold">{cartao.limite}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span>Cashback:</span>
//                           <span className="font-bold text-yellow-300">{cartao.cashback}</span>
//                         </div>
//                       </div>

//                       <div>
//                         <h4 className="font-bold mb-2">Benefícios:</h4>
//                         <ul className="space-y-1">
//                           {cartao.beneficios.map((beneficio, index) => (
//                             <li key={index} className="flex items-center gap-2 text-sm">
//                               <span className="text-green-300">✓</span>
//                               <span>{beneficio}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'emprestimos' && (
//             <div className="h-full flex flex-col">
//               <h2 className="text-3xl font-bold mb-6 flex-shrink-0">Opções de Empréstimo</h2>
//               <div className="flex-1 overflow-y-auto scrollbar-custom">
//                 <div className="space-y-6 pb-6">
//                   {emprestimos.map((emprestimo) => (
//                     <div
//                       key={emprestimo.id}
//                       className={`bg-gradient-to-r ${emprestimo.cor} rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer ${
//                         selectedLoan === emprestimo.id ? 'ring-4 ring-blue-300' : ''
//                       }`}
//                       onClick={() => setSelectedLoan(emprestimo.id)}
//                     >
//                       <div className="grid md:grid-cols-3 gap-6">
//                         <div>
//                           <h3 className="text-2xl font-bold mb-2">{emprestimo.nome}</h3>
//                           <div className="space-y-1">
//                             <div><span className="font-medium">Valor:</span> {emprestimo.valor}</div>
//                             <div><span className="font-medium">Juros:</span> <span className="text-yellow-300 font-bold">{emprestimo.juros}</span></div>
//                             <div><span className="font-medium">Parcelas:</span> {emprestimo.parcelas}</div>
//                           </div>
//                         </div>

//                         <div className="md:col-span-2">
//                           <h4 className="font-bold mb-2">Requisitos:</h4>
//                           <ul className="space-y-1">
//                             {emprestimo.requisitos.map((req, index) => (
//                               <li key={index} className="flex items-center gap-2">
//                                 <span className="text-blue-300">•</span>
//                                 <span>{req}</span>
//                               </li>
//                             ))}
//                           </ul>

//                           <button className="mt-4 bg-white/20 hover:bg-white/30 px-6 py-2 rounded-lg font-bold transition-colors">
//                             Solicitar Empréstimo
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}

//                   {/* Conteúdo adicional para forçar scroll */}
//                   <div className="space-y-8">
//                     <div className="bg-slate-800 rounded-xl p-6">
//                       <h3 className="text-2xl font-bold mb-4">Documentos Necessários</h3>
//                       <div className="grid md:grid-cols-2 gap-4">
//                         <div>
//                           <h4 className="font-bold mb-2">Pessoa Física:</h4>
//                           <ul className="space-y-1 text-slate-300">
//                             <li>• CPF e RG</li>
//                             <li>• Comprovante de residência</li>
//                             <li>• Comprovante de renda</li>
//                             <li>• Extrato bancário</li>
//                           </ul>
//                         </div>
//                         <div>
//                           <h4 className="font-bold mb-2">Pessoa Jurídica:</h4>
//                           <ul className="space-y-1 text-slate-300">
//                             <li>• CNPJ e Contrato Social</li>
//                             <li>• Balanço Patrimonial</li>
//                             <li>• DRE dos últimos 2 anos</li>
//                             <li>• Certidões negativas</li>
//                           </ul>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="bg-slate-800 rounded-xl p-6">
//                       <h3 className="text-2xl font-bold mb-4">Simulação de Empréstimo</h3>
//                       <div className="grid md:grid-cols-3 gap-6">
//                         <div>
//                           <label className="block text-sm font-medium mb-2">Valor Desejado</label>
//                           <input 
//                             type="text" 
//                             placeholder="R$ 0,00" 
//                             className="w-full bg-slate-700 rounded-lg px-4 py-2 text-white"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium mb-2">Prazo (meses)</label>
//                           <select className="w-full bg-slate-700 rounded-lg px-4 py-2 text-white">
//                             <option>12 meses</option>
//                             <option>24 meses</option>
//                             <option>36 meses</option>
//                             <option>48 meses</option>
//                             <option>60 meses</option>
//                           </select>
//                         </div>
//                         <div className="flex items-end">
//                           <button className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg font-bold transition-colors">
//                             Simular
//                           </button>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="bg-slate-800 rounded-xl p-6">
//                       <h3 className="text-2xl font-bold mb-4">Perguntas Frequentes</h3>
//                       <div className="space-y-4">
//                         <div>
//                           <h4 className="font-bold mb-2">Qual o prazo para aprovação?</h4>
//                           <p className="text-slate-300">O prazo médio de análise é de 2 a 5 dias úteis, dependendo da modalidade e valor solicitado.</p>
//                         </div>
//                         <div>
//                           <h4 className="font-bold mb-2">Posso quitar antecipadamente?</h4>
//                           <p className="text-slate-300">Sim, oferecemos desconto para quitação antecipada sem cobrança de multas.</p>
//                         </div>
//                         <div>
//                           <h4 className="font-bold mb-2">Qual a taxa de aprovação?</h4>
//                           <p className="text-slate-300">Nossa taxa de aprovação é de 85% para clientes que atendem aos requisitos básicos.</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'investimentos' && (
//             <div className="h-full flex flex-col">
//               <h2 className="text-3xl font-bold mb-6 flex-shrink-0">Opções de Investimento</h2>
//               <div className="flex-1 overflow-y-auto scrollbar-custom">
//                 <div className="grid md:grid-cols-2 gap-6 pb-6">
//                   {investimentos.map((investimento) => (
//                     <div
//                       key={investimento.id}
//                       className={`bg-gradient-to-br ${investimento.cor} rounded-xl p-6 shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer ${
//                         selectedInvestment === investimento.id ? 'ring-4 ring-yellow-300' : ''
//                       }`}
//                       onClick={() => setSelectedInvestment(investimento.id)}
//                     >
//                       <h3 className="text-2xl font-bold mb-2">{investimento.nome}</h3>
//                       <p className="text-white/80 mb-4">{investimento.descricao}</p>

//                       <div className="space-y-2">
//                         <div className="flex justify-between">
//                           <span>Rentabilidade:</span>
//                           <span className="font-bold text-yellow-300">{investimento.rentabilidade}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span>Risco:</span>
//                           <span className={`font-bold ${
//                             investimento.risco === 'Baixo' ? 'text-green-300' :
//                             investimento.risco === 'Médio' ? 'text-yellow-300' : 'text-red-300'
//                           }`}>{investimento.risco}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span>Mínimo:</span>
//                           <span className="font-bold">{investimento.minimo}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span>Liquidez:</span>
//                           <span className="font-bold">{investimento.liquidez}</span>
//                         </div>
//                       </div>

//                       <button className="w-full mt-4 bg-white/20 hover:bg-white/30 py-2 rounded-lg font-bold transition-colors">
//                         Investir Agora
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'beneficios' && (
//             <div className="h-full flex flex-col">
//               <h2 className="text-3xl font-bold mb-6 flex-shrink-0">Benefícios Exclusivos</h2>
//               <div className="flex-1 overflow-y-auto scrollbar-custom">
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
//                   <div className="bg-slate-800 rounded-xl p-6">
//                     <div className="text-4xl mb-4">🌱</div>
//                     <h3 className="text-xl font-bold mb-2">Cashback Fazendas</h3>
//                     <p className="text-slate-300">Ganhe até 3% de volta em todas as compras relacionadas ao setor agrícola.</p>
//                   </div>

//                   <div className="bg-slate-800 rounded-xl p-6">
//                     <div className="text-4xl mb-4">📱</div>
//                     <h3 className="text-xl font-bold mb-2">App Exclusivo</h3>
//                     <p className="text-slate-300">Gerencie suas finanças com nosso aplicativo especializado no agronegócio.</p>
//                   </div>

//                   <div className="bg-slate-800 rounded-xl p-6">
//                     <div className="text-4xl mb-4">🤝</div>
//                     <h3 className="text-xl font-bold mb-2">Consultoria Especializada</h3>
//                     <p className="text-slate-300">Acesso gratuito a consultores especializados em finanças rurais.</p>
//                   </div>

//                   <div className="bg-slate-800 rounded-xl p-6">
//                     <div className="text-4xl mb-4">🛡️</div>
//                     <h3 className="text-xl font-bold mb-2">Seguro Rural</h3>
//                     <p className="text-slate-300">Proteção completa para suas atividades agrícolas com condições especiais.</p>
//                   </div>

//                   <div className="bg-slate-800 rounded-xl p-6">
//                     <div className="text-4xl mb-4">📊</div>
//                     <h3 className="text-xl font-bold mb-2">Relatórios Detalhados</h3>
//                     <p className="text-slate-300">Análises financeiras personalizadas para otimizar sua produção.</p>
//                   </div>

//                   <div className="bg-slate-800 rounded-xl p-6">
//                     <div className="text-4xl mb-4">⭐</div>
//                     <h3 className="text-xl font-bold mb-2">Programa VIP</h3>
//                     <p className="text-slate-300">Benefícios exclusivos e atendimento prioritário para clientes premium.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         .scrollbar-custom::-webkit-scrollbar {
//           width: 8px;
//         }

//         .scrollbar-custom::-webkit-scrollbar-track {
//           background: rgba(30, 41, 59, 0.5);
//           border-radius: 4px;
//         }

//         .scrollbar-custom::-webkit-scrollbar-thumb {
//           background: rgba(34, 197, 94, 0.6);
//           border-radius: 4px;
//         }

//         .scrollbar-custom::-webkit-scrollbar-thumb:hover {
//           background: rgba(34, 197, 94, 0.8);
//         }

//         .scrollbar-custom {
//           scrollbar-width: thin;
//           scrollbar-color: rgba(34, 197, 94, 0.6) rgba(30, 41, 59, 0.5);
//         }

//         @media (max-width: 768px) {
//           .text-6xl {
//             font-size: 3rem;
//           }

//           .text-4xl {
//             font-size: 2rem;
//           }

//           .text-3xl {
//             font-size: 1.8rem;
//           }

//           .grid-cols-4 {
//             grid-template-columns: repeat(2, minmax(0, 1fr));
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default BankDetailsInterface;



import React, { useState, useRef, useContext } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { ModalBank } from "../components/ModalBank.jsx"
import maps from "../../public/outrasImagens/maps.png"
import { motion, useAnimation } from "framer-motion";
import { ListaContratos } from "./ListContratos.jsx";

const BankSelection = () => {
  const { dados, atualizarDadosProf2, atualizarDados } = useContext(CentraldeDadosContext);
  const [selectedBank, setSelectedBank] = useState(null);



  const [banksModal, setBanksModal] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null);

  const setVision = (newVision) => {
    atualizarDados("vision", {
      ...dados.vision, visionAtual: newVision
    });
  }
  function Tooltip({ text, children }) {
    const [show, setShow] = useState(false);
    const ref = useRef();

    const tooltip = show && ref.current && createPortal(
      <div
        style={{
          position: "absolute",
          top: ref.current.getBoundingClientRect().top - 40, // sobe o tooltip
          left:
            ref.current.getBoundingClientRect().left +
            ref.current.offsetWidth / 2,
          transform: "translateX(-50%)",
          backgroundColor: "#FFFFFF",
          color: "#350973",
          padding: "6px 10px",
          borderRadius: "6px",
          ontWeight: "600",
          whiteSpace: "pre-line", // respeita \n como quebra de linha
          zIndex: 2147483647,
          pointerEvents: "none",
          maxWidth: "400px",
        }}
      >
        {text}
      </div>,
      document.body
    );

    return (
      <>
        <div
          ref={ref}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          className="relative flex items-center justify-center"
        >
          {children}
        </div>
        {tooltip}
      </>
    );
  }

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

  // const bancos = [
  //   // 1. Agro Bank
  //   {
  //       id: 1,
  //     nome: "Agro Bank",
  //     cor: "linear-gradient(90deg, #003816, #4CAF50)",
  //     icone: "🌱",
  //     descricao: "Especialista no setor agrícola, libera crédito extra para fazendas.",
  //     nucartoes: 3,
  //     cartoes: [
  //       {
  //         id: 1,
  //         nome: "Agro Classic",
  //         design: "card-classico",
  //         cor1: "#003816",
  //         cor2: "#1A5E2A",
  //         cor3: "#0C9123",
  //         cor4: "#4CAF50",
  //         tipo: "Básico",
  //         numeroCard: "2341 **** **** 8943",
  //         validade: "120",
  //         rentabilidadeInvestimento: "12%",
  //         valorMaxEmprestimo: "R$ 50.000",
  //         taxaJurosEmprestimo: "6%",
  //         cashback: "6%",
  //         credito: "0,3",
  //         limiteEmprestimo: "120000",
  //         limiteInvestimento: "100000"
  //       },
  //       {
  //         id: 2,
  //         nome: "Agro Top",
  //         design: "geometric-chaos",
  //         cor1: "#004d1a",
  //         cor2: "#1a7030",
  //         cor3: "#0c9123",
  //         cor4: "#66bb66",
  //         tipo: "Premium",
  //         numeroCard: "5678 **** **** 1234",
  //         validade: "130",
  //         rentabilidadeInvestimento: "15%",
  //         valorMaxEmprestimo: "R$ 80.000",
  //         taxaJurosEmprestimo: "5%",
  //         cashback: "8%",
  //         credito: "0,5",
  //         limiteEmprestimo: "150000",
  //         limiteInvestimento: "120000"
  //       },
  //       {
  //         id: 3,
  //         nome: "Agro Ultra",
  //         design: "wave-patterns",
  //         cor1: "#005622",
  //         cor2: "#2a8a4a",
  //         cor3: "#14a231",
  //         cor4: "#81c784",
  //         tipo: "Básico",
  //         numeroCard: "9876 **** **** 5432",
  //         validade: "140",
  //         rentabilidadeInvestimento: "14%",
  //         valorMaxEmprestimo: "R$ 70.000",
  //         taxaJurosEmprestimo: "6%",
  //         cashback: "5%",
  //         credito: "0,4",
  //         limiteEmprestimo: "130000",
  //         limiteInvestimento: "110000"
  //       }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     nome: "Mega Credit",
  //     cor: "linear-gradient(90deg, #003366, #99ccff)",
  //     icone: "🏛️",
  //     descricao: "Oferece muito crédito, mas cobra juros altíssimos.",
  //     nucartoes: 3,
  //     cartoes: [
  //       {
  //         id: 1,
  //         nome: "Mega Basic",
  //         design: "card-classico",
  //         cor1: "#003366",
  //         cor2: "#336699",
  //         cor3: "#6699cc",
  //         cor4: "#99ccff",
  //         tipo: "Básico",
  //         numeroCard: "1111 **** **** 2222",
  //         validade: "120",
  //         rentabilidadeInvestimento: "8%",
  //         valorMaxEmprestimo: "R$ 60.000",
  //         taxaJurosEmprestimo: "12%",
  //         cashback: "0%",
  //         credito: "0,5",
  //         limiteEmprestimo: "60000",
  //         limiteInvestimento: "40000"
  //       },
  //       {
  //         id: 2,
  //         nome: "Mega Gold",
  //         design: "geometric-chaos",
  //         cor1: "#001a66",
  //         cor2: "#0044cc",
  //         cor3: "#0066ff",
  //         cor4: "#3399ff",
  //         tipo: "Premium",
  //         numeroCard: "3333 **** **** 4444",
  //         validade: "130",
  //         rentabilidadeInvestimento: "10%",
  //         valorMaxEmprestimo: "R$ 120.000",
  //         taxaJurosEmprestimo: "11%",
  //         cashback: "2%",
  //         credito: "0,6",
  //         limiteEmprestimo: "120000",
  //         limiteInvestimento: "90000"
  //       },
  //       {
  //         id: 3,
  //         nome: "Mega Platinum",
  //         design: "wave-patterns",
  //         cor1: "#002244",
  //         cor2: "#0055aa",
  //         cor3: "#3388cc",
  //         cor4: "#66bbff",
  //         tipo: "Premium",
  //         numeroCard: "5555 **** **** 6666",
  //         validade: "140",
  //         rentabilidadeInvestimento: "12%",
  //         valorMaxEmprestimo: "R$ 150.000",
  //         taxaJurosEmprestimo: "10%",
  //         cashback: "3%",
  //         credito: "0,7",
  //         limiteEmprestimo: "150000",
  //         limiteInvestimento: "120000"
  //       }
  //     ]
  //   },
  //   {
  //     id: 3,
  //     nome: "Tech Bank",
  //     cor: "linear-gradient(90deg, #ff9900, #ffe0b3)",
  //     icone: "💻",
  //     descricao: "Banco digital focado em tecnologia e inovação.",
  //     nucartoes: 3,
  //     cartoes: [
  //       {
  //         id: 1,
  //         nome: "Tech Standard",
  //         design: "wave-patterns",
  //         cor1: "#ff9900",
  //         cor2: "#ffb84d",
  //         cor3: "#ffcc66",
  //         cor4: "#ffe0b3",
  //         tipo: "Básico",
  //         numeroCard: "5555 **** **** 6666",
  //         validade: "125",
  //         rentabilidadeInvestimento: "12%",
  //         valorMaxEmprestimo: "R$ 25.000",
  //         taxaJurosEmprestimo: "8%",
  //         cashback: "4%",
  //         credito: "0,35",
  //         limiteEmprestimo: "25000",
  //         limiteInvestimento: "35000"
  //       },
  //       {
  //         id: 2,
  //         nome: "Tech Premium",
  //         design: "card-moderno",
  //         cor1: "#cc6600",
  //         cor2: "#ff8000",
  //         cor3: "#ff9933",
  //         cor4: "#ffc266",
  //         tipo: "Premium",
  //         numeroCard: "7777 **** **** 8888",
  //         validade: "135",
  //         rentabilidadeInvestimento: "15%",
  //         valorMaxEmprestimo: "R$ 50.000",
  //         taxaJurosEmprestimo: "7%",
  //         cashback: "6%",
  //         credito: "0,5",
  //         limiteEmprestimo: "50000",
  //         limiteInvestimento: "45000"
  //       },
  //       {
  //         id: 3,
  //         nome: "Tech Ultra",
  //         design: "geometric-chaos",
  //         cor1: "#ff6600",
  //         cor2: "#ff9933",
  //         cor3: "#ffb366",
  //         cor4: "#ffe0b3",
  //         tipo: "Básico",
  //         numeroCard: "9999 **** **** 0000",
  //         validade: "140",
  //         rentabilidadeInvestimento: "14%",
  //         valorMaxEmprestimo: "R$ 60.000",
  //         taxaJurosEmprestimo: "6%",
  //         cashback: "5%",
  //         credito: "0,4",
  //         limiteEmprestimo: "60000",
  //         limiteInvestimento: "50000"
  //       }
  //     ]
  //   },
  //   {
  //     id: 4,
  //     nome: "Steel Bank",
  //     cor: "linear-gradient(90deg, #333333, #cccccc)",
  //     icone: "⚙️",
  //     descricao: "Especializado em financiar o setor industrial.",
  //     nucartoes: 3,
  //     cartoes: [
  //       {
  //         id: 1,
  //         nome: "Steel Classic",
  //         design: "card-classico",
  //         cor1: "#333333",
  //         cor2: "#666666",
  //         cor3: "#999999",
  //         cor4: "#cccccc",
  //         tipo: "Básico",
  //         numeroCard: "1212 **** **** 3434",
  //         validade: "140",
  //         rentabilidadeInvestimento: "10%",
  //         valorMaxEmprestimo: "R$ 45.000",
  //         taxaJurosEmprestimo: "7%",
  //         cashback: "5%",
  //         credito: "0,4",
  //         limiteEmprestimo: "45000",
  //         limiteInvestimento: "55000"
  //       },
  //       {
  //         id: 2,
  //         nome: "Steel Premium",
  //         design: "wave-patterns",
  //         cor1: "#2a2a2a",
  //         cor2: "#555555",
  //         cor3: "#888888",
  //         cor4: "#bbbbbb",
  //         tipo: "Premium",
  //         numeroCard: "5656 **** **** 7878",
  //         validade: "150",
  //         rentabilidadeInvestimento: "12%",
  //         valorMaxEmprestimo: "R$ 70.000",
  //         taxaJurosEmprestimo: "6%",
  //         cashback: "6%",
  //         credito: "0,5",
  //         limiteEmprestimo: "70000",
  //         limiteInvestimento: "60000"
  //       },
  //       {
  //         id: 3,
  //         nome: "Steel Ultra",
  //         design: "geometric-chaos",
  //         cor1: "#1a1a1a",
  //         cor2: "#444444",
  //         cor3: "#777777",
  //         cor4: "#aaaaaa",
  //         tipo: "Básico",
  //         numeroCard: "9898 **** **** 1212",
  //         validade: "160",
  //         rentabilidadeInvestimento: "14%",
  //         valorMaxEmprestimo: "R$ 90.000",
  //         taxaJurosEmprestimo: "5%",
  //         cashback: "7%",
  //         credito: "0,55",
  //         limiteEmprestimo: "90000",
  //         limiteInvestimento: "80000"
  //       }
  //     ]
  //   },
  //   {
  //     id: 5,
  //     nome: "Energy Plus",
  //     cor: "linear-gradient(90deg, #FFD700, #FFFF99)",
  //     icone: "⚡",
  //     descricao: "Banco sustentável com foco em energia renovável.",
  //     nucartoes: 3,
  //     cartoes: [
  //       {
  //         id: 1,
  //         nome: "Energy Basic",
  //         design: "wave-patterns",
  //         cor1: "#FFD700",
  //         cor2: "#FFEB3B",
  //         cor3: "#FFF59D",
  //         cor4: "#FFFF99",
  //         tipo: "Básico",
  //         numeroCard: "1010 **** **** 2020",
  //         validade: "120",
  //         rentabilidadeInvestimento: "12%",
  //         valorMaxEmprestimo: "R$ 30.000",
  //         taxaJurosEmprestimo: "5%",
  //         cashback: "4%",
  //         credito: "0,25",
  //         limiteEmprestimo: "30000",
  //         limiteInvestimento: "45000"
  //       },
  //       {
  //         id: 2,
  //         nome: "Energy Premium",
  //         design: "card-moderno",
  //         cor1: "#FFC107",
  //         cor2: "#FFD54F",
  //         cor3: "#FFECB3",
  //         cor4: "#FFFF99",
  //         tipo: "Premium",
  //         numeroCard: "3030 **** **** 4040",
  //         validade: "135",
  //         rentabilidadeInvestimento: "14%",
  //         valorMaxEmprestimo: "R$ 50.000",
  //         taxaJurosEmprestimo: "4%",
  //         cashback: "6%",
  //         credito: "0,35",
  //         limiteEmprestimo: "50000",
  //         limiteInvestimento: "55000"
  //       },
  //       {
  //         id: 3,
  //         nome: "Energy Ultra",
  //         design: "geometric-chaos",
  //         cor1: "#FFD600",
  //         cor2: "#FFEA00",
  //         cor3: "#FFF176",
  //         cor4: "#FFFF99",
  //         tipo: "Básico",
  //         numeroCard: "5050 **** **** 6060",
  //         validade: "140",
  //         rentabilidadeInvestimento: "16%",
  //         valorMaxEmprestimo: "R$ 60.000",
  //         taxaJurosEmprestimo: "5%",
  //         cashback: "5%",
  //         credito: "0,4",
  //         limiteEmprestimo: "60000",
  //         limiteInvestimento: "60000"
  //       }
  //     ]
  //   },

  //   // 7 a 15: Bônus bancos
  //    {
  //     id: 6,
  //     nome: "Prime Capital",
  //     cor: "linear-gradient(90deg, #800080, #D8BFD8)",
  //     icone: "💎",
  //     descricao: "Banco premium com serviços exclusivos para grandes investidores.",
  //     nucartoes: 3,
  //     cartoes: [
  //       {
  //         id: 1,
  //         nome: "Prime Basic",
  //         design: "card-classico",
  //         cor1: "#800080",
  //         cor2: "#993399",
  //         cor3: "#B266B2",
  //         cor4: "#D8BFD8",
  //         tipo: "Básico",
  //         numeroCard: "1111 **** **** 2222",
  //         validade: "120",
  //         rentabilidadeInvestimento: "10%",
  //         valorMaxEmprestimo: "R$ 100.000",
  //         taxaJurosEmprestimo: "15%",
  //         cashback: "3%",
  //         credito: "0,8",
  //         limiteEmprestimo: "100000",
  //         limiteInvestimento: "80000"
  //       },
  //       {
  //         id: 2,
  //         nome: "Prime Gold",
  //         design: "wave-patterns",
  //         cor1: "#660066",
  //         cor2: "#993399",
  //         cor3: "#B266B2",
  //         cor4: "#D8BFD8",
  //         tipo: "Premium",
  //         numeroCard: "3333 **** **** 4444",
  //         validade: "130",
  //         rentabilidadeInvestimento: "12%",
  //         valorMaxEmprestimo: "R$ 150.000",
  //         taxaJurosEmprestimo: "14%",
  //         cashback: "5%",
  //         credito: "0,85",
  //         limiteEmprestimo: "150000",
  //         limiteInvestimento: "100000"
  //       },
  //       {
  //         id: 3,
  //         nome: "Prime Ultra",
  //         design: "geometric-chaos",
  //         cor1: "#4B004B",
  //         cor2: "#800080",
  //         cor3: "#993399",
  //         cor4: "#D8BFD8",
  //         tipo: "Premium",
  //         numeroCard: "5555 **** **** 6666",
  //         validade: "140",
  //         rentabilidadeInvestimento: "15%",
  //         valorMaxEmprestimo: "R$ 200.000",
  //         taxaJurosEmprestimo: "13%",
  //         cashback: "6%",
  //         credito: "0,9",
  //         limiteEmprestimo: "200000",
  //         limiteInvestimento: "150000"
  //       }
  //     ]
  //   },
  //   {
  //     id: 7,
  //     nome: "Imob Bank",
  //     cor: "linear-gradient(90deg, #0000CC, #9999FF)",
  //     icone: "🏠",
  //     descricao: "Especialista em financiamento imobiliário e terrenos.",
  //     nucartoes: 3,
  //     cartoes: [
  //       {
  //         id: 1,
  //         nome: "Imob Classic",
  //         design: "card-classico",
  //         cor1: "#0000CC",
  //         cor2: "#3333FF",
  //         cor3: "#6666FF",
  //         cor4: "#9999FF",
  //         tipo: "Básico",
  //         numeroCard: "1212 **** **** 3434",
  //         validade: "120",
  //         rentabilidadeInvestimento: "8%",
  //         valorMaxEmprestimo: "R$ 50.000",
  //         taxaJurosEmprestimo: "6%",
  //         cashback: "2%",
  //         credito: "0,3",
  //         limiteEmprestimo: "50000",
  //         limiteInvestimento: "40000"
  //       },
  //       {
  //         id: 2,
  //         nome: "Imob Premium",
  //         design: "wave-patterns",
  //         cor1: "#000099",
  //         cor2: "#3333CC",
  //         cor3: "#6666FF",
  //         cor4: "#9999FF",
  //         tipo: "Premium",
  //         numeroCard: "5656 **** **** 7878",
  //         validade: "135",
  //         rentabilidadeInvestimento: "10%",
  //         valorMaxEmprestimo: "R$ 80.000",
  //         taxaJurosEmprestimo: "5%",
  //         cashback: "4%",
  //         credito: "0,4",
  //         limiteEmprestimo: "80000",
  //         limiteInvestimento: "70000"
  //       },
  //       {
  //         id: 3,
  //         nome: "Imob Ultra",
  //         design: "geometric-chaos",
  //         cor1: "#000066",
  //         cor2: "#333399",
  //         cor3: "#6666CC",
  //         cor4: "#9999FF",
  //         tipo: "Premium",
  //         numeroCard: "9898 **** **** 1212",
  //         validade: "140",
  //         rentabilidadeInvestimento: "12%",
  //         valorMaxEmprestimo: "R$ 120.000",
  //         taxaJurosEmprestimo: "4%",
  //         cashback: "5%",
  //         credito: "0,5",
  //         limiteEmprestimo: "120000",
  //         limiteInvestimento: "100000"
  //       }
  //     ]
  //   },
  //   {
  //     id: 8,
  //     nome: "Green Energy",
  //     cor: "linear-gradient(90deg, #00CC00, #99FF99)",
  //     icone: "🌿",
  //     descricao: "Foco em investimentos sustentáveis e energia verde.",
  //     nucartoes: 3,
  //     cartoes: [
  //       {
  //         id: 1,
  //         nome: "Green Basic",
  //         design: "wave-patterns",
  //         cor1: "#00CC00",
  //         cor2: "#33CC33",
  //         cor3: "#66CC66",
  //         cor4: "#99FF99",
  //         tipo: "Básico",
  //         numeroCard: "1010 **** **** 2020",
  //         validade: "120",
  //         rentabilidadeInvestimento: "10%",
  //         valorMaxEmprestimo: "R$ 40.000",
  //         taxaJurosEmprestimo: "5%",
  //         cashback: "4%",
  //         credito: "0,25",
  //         limiteEmprestimo: "40000",
  //         limiteInvestimento: "50000"
  //       },
  //       {
  //         id: 2,
  //         nome: "Green Premium",
  //         design: "card-moderno",
  //         cor1: "#009900",
  //         cor2: "#33CC33",
  //         cor3: "#66CC66",
  //         cor4: "#99FF99",
  //         tipo: "Premium",
  //         numeroCard: "3030 **** **** 4040",
  //         validade: "130",
  //         rentabilidadeInvestimento: "12%",
  //         valorMaxEmprestimo: "R$ 70.000",
  //         taxaJurosEmprestimo: "4%",
  //         cashback: "6%",
  //         credito: "0,35",
  //         limiteEmprestimo: "70000",
  //         limiteInvestimento: "65000"
  //       },
  //       {
  //         id: 3,
  //         nome: "Green Ultra",
  //         design: "geometric-chaos",
  //         cor1: "#006600",
  //         cor2: "#33AA33",
  //         cor3: "#66CC66",
  //         cor4: "#99FF99",
  //         tipo: "Premium",
  //         numeroCard: "5050 **** **** 6060",
  //         validade: "140",
  //         rentabilidadeInvestimento: "15%",
  //         valorMaxEmprestimo: "R$ 100.000",
  //         taxaJurosEmprestimo: "3%",
  //         cashback: "7%",
  //         credito: "0,45",
  //         limiteEmprestimo: "100000",
  //         limiteInvestimento: "90000"
  //       }
  //     ]
  //   },
  //   {
  //     id: 9,
  //     nome: "Solar Bank",
  //     cor: "linear-gradient(90deg, #FFCC00, #FFF9E6)",
  //     icone: "☀️",
  //     descricao: "Banco sustentável com foco em energia solar e limpa.",
  //     nucartoes: 3,
  //     cartoes: [
  //       {
  //         id: 1,
  //         nome: "Solar Bright",
  //         design: "wave-patterns",
  //         cor1: "#FFCC00",
  //         cor2: "#FFE066",
  //         cor3: "#FFF2B3",
  //         cor4: "#FFF9E6",
  //         tipo: "Básico",
  //         numeroCard: "2020 **** **** 3131",
  //         validade: "120",
  //         rentabilidadeInvestimento: "12%",
  //         valorMaxEmprestimo: "R$ 35.000",
  //         taxaJurosEmprestimo: "5%",
  //         cashback: "4%",
  //         credito: "0,3",
  //         limiteEmprestimo: "35000",
  //         limiteInvestimento: "40000"
  //       },
  //       {
  //         id: 2,
  //         nome: "Solar Premium",
  //         design: "card-moderno",
  //         cor1: "#FFB300",
  //         cor2: "#FFD633",
  //         cor3: "#FFE066",
  //         cor4: "#FFF9E6",
  //         tipo: "Premium",
  //         numeroCard: "4141 **** **** 5252",
  //         validade: "135",
  //         rentabilidadeInvestimento: "14%",
  //         valorMaxEmprestimo: "R$ 60.000",
  //         taxaJurosEmprestimo: "4%",
  //         cashback: "6%",
  //         credito: "0,35",
  //         limiteEmprestimo: "60000",
  //         limiteInvestimento: "55000"
  //       },
  //       {
  //         id: 3,
  //         nome: "Solar Ultra",
  //         design: "geometric-chaos",
  //         cor1: "#FF9900",
  //         cor2: "#FFCC33",
  //         cor3: "#FFE066",
  //         cor4: "#FFF9E6",
  //         tipo: "Premium",
  //         numeroCard: "6363 **** **** 7474",
  //         validade: "140",
  //         rentabilidadeInvestimento: "16%",
  //         valorMaxEmprestimo: "R$ 80.000",
  //         taxaJurosEmprestimo: "3%",
  //         cashback: "7%",
  //         credito: "0,4",
  //         limiteEmprestimo: "80000",
  //         limiteInvestimento: "70000"
  //       }
  //     ]
  //   },
  //   {
  //     id: 10,
  //     nome: "Future Tech",
  //     cor: "linear-gradient(90deg, #FF6600, #FFD699)",
  //     icone: "🤖",
  //     descricao: "Banco digital futurista focado em inovações tecnológicas.",
  //     nucartoes: 3,
  //     cartoes: [
  //       {
  //         id: 1,
  //         nome: "Future Basic",
  //         design: "card-classico",
  //         cor1: "#FF6600",
  //         cor2: "#FF8533",
  //         cor3: "#FF9966",
  //         cor4: "#FFD699",
  //         tipo: "Básico",
  //         numeroCard: "1717 **** **** 2828",
  //         validade: "120",
  //         rentabilidadeInvestimento: "10%",
  //         valorMaxEmprestimo: "R$ 45.000",
  //         taxaJurosEmprestimo: "6%",
  //         cashback: "3%",
  //         credito: "0,35",
  //         limiteEmprestimo: "45000",
  //         limiteInvestimento: "50000"
  //       },
  //       {
  //         id: 2,
  //         nome: "Future Premium",
  //         design: "wave-patterns",
  //         cor1: "#FF5500",
  //         cor2: "#FF7733",
  //         cor3: "#FF9966",
  //         cor4: "#FFD699",
  //         tipo: "Premium",
  //         numeroCard: "3939 **** **** 4949",
  //         validade: "135",
  //         rentabilidadeInvestimento: "12%",
  //         valorMaxEmprestimo: "R$ 70.000",
  //         taxaJurosEmprestimo: "5%",
  //         cashback: "5%",
  //         credito: "0,45",
  //         limiteEmprestimo: "70000",
  //         limiteInvestimento: "65000"
  //       },
  //       {
  //         id: 3,
  //         nome: "Future Ultra",
  //         design: "geometric-chaos",
  //         cor1: "#FF4400",
  //         cor2: "#FF7733",
  //         cor3: "#FF9966",
  //         cor4: "#FFD699",
  //         tipo: "Premium",
  //         numeroCard: "5959 **** **** 6060",
  //         validade: "140",
  //         rentabilidadeInvestimento: "14%",
  //         valorMaxEmprestimo: "R$ 100.000",
  //         taxaJurosEmprestimo: "4%",
  //         cashback: "6%",
  //         credito: "0,5",
  //         limiteEmprestimo: "100000",
  //         limiteInvestimento: "90000"
  //       }
  //     ]
  //   },
  //     {
  //     id: 11,
  //     nome: "Ocean Bank",
  //     cor: "linear-gradient(90deg, #0066CC, #99CCFF)",
  //     icone: "🌊",
  //     descricao: "Banco com foco em sustentabilidade marítima e investimentos em oceanos.",
  //     nucartoes: 3,
  //     cartoes: [
  //       {
  //         id: 1,
  //         nome: "Ocean Basic",
  //         design: "card-classico",
  //         cor1: "#0066CC",
  //         cor2: "#3399CC",
  //         cor3: "#66CCCC",
  //         cor4: "#99CCFF",
  //         tipo: "Básico",
  //         numeroCard: "1010 **** **** 2020",
  //         validade: "120",
  //         rentabilidadeInvestimento: "9%",
  //         valorMaxEmprestimo: "R$ 40.000",
  //         taxaJurosEmprestimo: "5%",
  //         cashback: "3%",
  //         credito: "0,3",
  //         limiteEmprestimo: "40000",
  //         limiteInvestimento: "50000"
  //       },
  //       {
  //         id: 2,
  //         nome: "Ocean Premium",
  //         design: "wave-patterns",
  //         cor1: "#0055AA",
  //         cor2: "#3399CC",
  //         cor3: "#66CCCC",
  //         cor4: "#99CCFF",
  //         tipo: "Premium",
  //         numeroCard: "3030 **** **** 4040",
  //         validade: "130",
  //         rentabilidadeInvestimento: "11%",
  //         valorMaxEmprestimo: "R$ 70.000",
  //         taxaJurosEmprestimo: "4%",
  //         cashback: "5%",
  //         credito: "0,4",
  //         limiteEmprestimo: "70000",
  //         limiteInvestimento: "65000"
  //       },
  //       {
  //         id: 3,
  //         nome: "Ocean Ultra",
  //         design: "geometric-chaos",
  //         cor1: "#004488",
  //         cor2: "#3399CC",
  //         cor3: "#66CCCC",
  //         cor4: "#99CCFF",
  //         tipo: "Premium",
  //         numeroCard: "5050 **** **** 6060",
  //         validade: "140",
  //         rentabilidadeInvestimento: "13%",
  //         valorMaxEmprestimo: "R$ 100.000",
  //         taxaJurosEmprestimo: "3%",
  //         cashback: "6%",
  //         credito: "0,5",
  //         limiteEmprestimo: "100000",
  //         limiteInvestimento: "90000"
  //       }
  //     ]
  //   },
  //   {
  //     id: 12,
  //     nome: "Solar Bank",
  //     cor: "linear-gradient(90deg, #FFCC00, #FFF9E6)",
  //     icone: "☀️",
  //     descricao: "Banco sustentável com foco em energia solar e limpa.",
  //     nucartoes: 3,
  //     cartoes: [
  //       {
  //         id: 1,
  //         nome: "Solar Bright",
  //         design: "wave-patterns",
  //         cor1: "#FFCC00",
  //         cor2: "#FFE066",
  //         cor3: "#FFF2B3",
  //         cor4: "#FFF9E6",
  //         tipo: "Básico",
  //         numeroCard: "2020 **** **** 3131",
  //         validade: "120",
  //         rentabilidadeInvestimento: "12%",
  //         valorMaxEmprestimo: "R$ 35.000",
  //         taxaJurosEmprestimo: "5%",
  //         cashback: "4%",
  //         credito: "0,3",
  //         limiteEmprestimo: "35000",
  //         limiteInvestimento: "40000"
  //       },
  //       {
  //         id: 2,
  //         nome: "Solar Premium",
  //         design: "card-moderno",
  //         cor1: "#FFB300",
  //         cor2: "#FFD633",
  //         cor3: "#FFE066",
  //         cor4: "#FFF9E6",
  //         tipo: "Premium",
  //         numeroCard: "4141 **** **** 5252",
  //         validade: "135",
  //         rentabilidadeInvestimento: "14%",
  //         valorMaxEmprestimo: "R$ 60.000",
  //         taxaJurosEmprestimo: "4%",
  //         cashback: "6%",
  //         credito: "0,35",
  //         limiteEmprestimo: "60000",
  //         limiteInvestimento: "55000"
  //       },
  //       {
  //         id: 3,
  //         nome: "Solar Ultra",
  //         design: "geometric-chaos",
  //         cor1: "#FF9900",
  //         cor2: "#FFCC33",
  //         cor3: "#FFE066",
  //         cor4: "#FFF9E6",
  //         tipo: "Premium",
  //         numeroCard: "6363 **** **** 7474",
  //         validade: "140",
  //         rentabilidadeInvestimento: "16%",
  //         valorMaxEmprestimo: "R$ 80.000",
  //         taxaJurosEmprestimo: "3%",
  //         cashback: "7%",
  //         credito: "0,4",
  //         limiteEmprestimo: "80000",
  //         limiteInvestimento: "70000"
  //       }
  //     ]
  //   },
  //   {
  //     id: 13,
  //     nome: "Crypto Bank",
  //     cor: "linear-gradient(90deg, #FF00FF, #FF99FF)",
  //     icone: "🪙",
  //     descricao: "Focado em criptoativos e investimentos digitais.",
  //     nucartoes: 3,
  //     cartoes: [
  //       {
  //         id: 1,
  //         nome: "Crypto Basic",
  //         design: "card-classico",
  //         cor1: "#FF00FF",
  //         cor2: "#CC00CC",
  //         cor3: "#FF66FF",
  //         cor4: "#FF99FF",
  //         tipo: "Básico",
  //         numeroCard: "1111 **** **** 2222",
  //         validade: "120",
  //         rentabilidadeInvestimento: "15%",
  //         valorMaxEmprestimo: "R$ 30.000",
  //         taxaJurosEmprestimo: "6%",
  //         cashback: "5%",
  //         credito: "0,3",
  //         limiteEmprestimo: "30000",
  //         limiteInvestimento: "40000"
  //       },
  //       {
  //         id: 2,
  //         nome: "Crypto Premium",
  //         design: "wave-patterns",
  //         cor1: "#CC00CC",
  //         cor2: "#FF33FF",
  //         cor3: "#FF66FF",
  //         cor4: "#FF99FF",
  //         tipo: "Premium",
  //         numeroCard: "3333 **** **** 4444",
  //         validade: "135",
  //         rentabilidadeInvestimento: "18%",
  //         valorMaxEmprestimo: "R$ 60.000",
  //         taxaJurosEmprestimo: "5%",
  //         cashback: "7%",
  //         credito: "0,35",
  //         limiteEmprestimo: "60000",
  //         limiteInvestimento: "55000"
  //       },
  //       {
  //         id: 3,
  //         nome: "Crypto Ultra",
  //         design: "geometric-chaos",
  //         cor1: "#990099",
  //         cor2: "#CC00CC",
  //         cor3: "#FF66FF",
  //         cor4: "#FF99FF",
  //         tipo: "Premium",
  //         numeroCard: "5555 **** **** 6666",
  //         validade: "140",
  //         rentabilidadeInvestimento: "20%",
  //         valorMaxEmprestimo: "R$ 100.000",
  //         taxaJurosEmprestimo: "4%",
  //         cashback: "9%",
  //         credito: "0,4",
  //         limiteEmprestimo: "100000",
  //         limiteInvestimento: "90000"
  //       }
  //     ]
  //   },
  //   {
  //     id: 14,
  //     nome: "Agro Bank Plus",
  //     cor: "linear-gradient(90deg, #003816, #4CAF50)",
  //     icone: "🌱",
  //     descricao: "Versão avançada do Agro Bank, com mais crédito e benefícios.",
  //     nucartoes: 3,
  //     cartoes: [
  //       {
  //         id: 1,
  //         nome: "Agro Plus Basic",
  //         design: "card-classico",
  //         cor1: "#003816",
  //         cor2: "#1A5E2A",
  //         cor3: "#0C9123",
  //         cor4: "#4CAF50",
  //         tipo: "Básico",
  //         numeroCard: "7777 **** **** 8888",
  //         validade: "120",
  //         rentabilidadeInvestimento: "12%",
  //         valorMaxEmprestimo: "R$ 50.000",
  //         taxaJurosEmprestimo: "6%",
  //         cashback: "6%",
  //         credito: "0,3",
  //         limiteEmprestimo: "120000",
  //         limiteInvestimento: "100000"
  //       },
  //       {
  //         id: 2,
  //         nome: "Agro Plus Premium",
  //         design: "wave-patterns",
  //         cor1: "#002C10",
  //         cor2: "#1A5E2A",
  //         cor3: "#0C9123",
  //         cor4: "#4CAF50",
  //         tipo: "Premium",
  //         numeroCard: "9999 **** **** 0000",
  //         validade: "135",
  //         rentabilidadeInvestimento: "14%",
  //         valorMaxEmprestimo: "R$ 75.000",
  //         taxaJurosEmprestimo: "5%",
  //         cashback: "7%",
  //         credito: "0,35",
  //         limiteEmprestimo: "150000",
  //         limiteInvestimento: "120000"
  //       },
  //       {
  //         id: 3,
  //         nome: "Agro Plus Ultra",
  //         design: "geometric-chaos",
  //         cor1: "#001A0C",
  //         cor2: "#1A5E2A",
  //         cor3: "#0C9123",
  //         cor4: "#4CAF50",
  //         tipo: "Premium",
  //         numeroCard: "1212 **** **** 3434",
  //         validade: "140",
  //         rentabilidadeInvestimento: "16%",
  //         valorMaxEmprestimo: "R$ 100.000",
  //         taxaJurosEmprestimo: "4%",
  //         cashback: "8%",
  //         credito: "0,4",
  //         limiteEmprestimo: "200000",
  //         limiteInvestimento: "150000"
  //       }
  //     ]
  //   },
  //   {
  //     id: 15,
  //     nome: "Tech Future",
  //     cor: "linear-gradient(90deg, #FF6F00, #FF8C42)",
  //     icone: "💻",
  //     descricao: "Banco digital focado em tecnologia e inovação futura.",
  //     nucartoes: 3,
  //     cartoes: [
  //       {
  //         id: 1,
  //         nome: "Tech Basic",
  //         design: "card-moderno",
  //         cor1: "#FF6F00",
  //         cor2: "#FF7F33",
  //         cor3: "#FF914D",
  //         cor4: "#FF8C42",
  //         tipo: "Básico",
  //         numeroCard: "1313 **** **** 2424",
  //         validade: "120",
  //         rentabilidadeInvestimento: "12%",
  //         valorMaxEmprestimo: "R$ 30.000",
  //         taxaJurosEmprestimo: "6%",
  //         cashback: "4%",
  //         credito: "0,35",
  //         limiteEmprestimo: "30000",
  //         limiteInvestimento: "40000"
  //       },
  //       {
  //         id: 2,
  //         nome: "Tech Premium",
  //         design: "wave-patterns",
  //         cor1: "#FF5A00",
  //         cor2: "#FF7F33",
  //         cor3: "#FF914D",
  //         cor4: "#FF8C42",
  //         tipo: "Premium",
  //         numeroCard: "3535 **** **** 4646",
  //         validade: "135",
  //         rentabilidadeInvestimento: "14%",
  //         valorMaxEmprestimo: "R$ 60.000",
  //         taxaJurosEmprestimo: "5%",
  //         cashback: "6%",
  //         credito: "0,4",
  //         limiteEmprestimo: "60000",
  //         limiteInvestimento: "55000"
  //       },
  //       {
  //         id: 3,
  //         nome: "Tech Ultra",
  //         design: "geometric-chaos",
  //         cor1: "#FF4400",
  //         cor2: "#FF7F33",
  //         cor3: "#FF914D",
  //         cor4: "#FF8C42",
  //         tipo: "Premium",
  //         numeroCard: "5757 **** **** 6868",
  //         validade: "140",
  //         rentabilidadeInvestimento: "16%",
  //         valorMaxEmprestimo: "R$ 90.000",
  //         taxaJurosEmprestimo: "4%",
  //         cashback: "7%",
  //         credito: "0,45",
  //         limiteEmprestimo: "90000",
  //         limiteInvestimento: "80000"
  //       }
  //     ]
  //   }
  // ];

  const bancos = [
    {
      id: 1,
      nome: "Agro Bank",
      cor: "linear-gradient(90deg, #003816, #4CAF50)",
      icone: "🌱",
      descricao: "Especialista no setor agrícola, libera crédito extra para fazendas.",
      cartoes: [
        {
          id: 111,
          nome: "Agro Classic",
          design: "card-classico",
          cor1: "#003816",
          cor2: "#1A5E2A",
          cor3: "#0C9123",
          cor4: "#4CAF50",
          numeroCard: "5757 **** **** 6868",
          cashback: "especifico",
          setorCashback: "agricultura",
          juros: "alto",
          emprestimo: "medio",
          investimento: "media"
        },
        {
          id: 112,
          nome: "Agro Top",
          design: 'triangular-fusion',
          cor1: "#004d1a",
          cor2: "#1a7030",
          cor3: "#0c9123",
          cor4: "#66bb66",
          numeroCard: "4341 **** **** 6128",
          cashback: "todos",
          juros: "medio",
          emprestimo: "alto",
          investimento: "alta"
        },
        {
          id: 113,
          nome: "Agro Ultra",
          design: 'geometric-chaos',
          cor1: "#005622",
          cor2: "#2a8a4a",
          cor3: "#14a231",
          cor4: "#81c784",
          numeroCard: "1421 **** **** 1211",
          cashback: "nenhum",
          juros: "baixo",
          emprestimo: "baixo",
          investimento: "baixa"
        }
      ]
    },
    {
      id: 2,
      nome: "Mega Credit",
      cor: "linear-gradient(90deg, #003366, #99ccff)",
      icone: "🏛️",
      descricao: "Oferece muito crédito, mas cobra juros altíssimos.",
      cartoes: [
        {
          id: 211,
          nome: "Basic Mega",
          design: "triangular-fusion",
          cor1: "#003366",
          cor2: "#336699",
          cor3: "#6699cc",
          cor4: "#99ccff",
          numeroCard: "2431 **** **** 6112",
          cashback: "nenhum",
          juros: "alto",
          emprestimo: "alto",
          investimento: "baixa"
        },
        {
          id: 212,
          nome: "Mega Gold",
          design: "geometric-chaos",
          cor1: "#001a66",
          cor2: "#0044cc",
          cor3: "#0066ff",
          cor4: "#3399ff",

          cashback: "especifico",
          setorCashback: "crédito",
          juros: "alto",
          emprestimo: "alto",
          investimento: "media"
        },
        {
          id: 213,
          nome: "Mega Platinum",
          design: 'wave-patterns',
          cor1: "#002244",
          cor2: "#0055aa",
          cor3: "#3388cc",
          cor4: "#66bbff",
          numeroCard: "5464 **** **** 3452",
          cashback: "todos",
          juros: "alto",
          emprestimo: "alto",
          investimento: "alta"
        }
      ]
    },
    {
      id: 3,
      nome: "Tech Bank",
      cor: "linear-gradient(90deg, #ff9900, #ffe0b3)",
      icone: "💻",
      descricao: "Banco digital focado em tecnologia e inovação.",
      cartoes: [
        {
          id: 311,
          nome: "Tech Standard",
          design: "card-Moderno",
          cor1: "#ff9900",
          cor2: "#ffb84d",
          cor3: "#ffcc66",
          cor4: "#ffe0b3",
          numeroCard: "5321 **** **** 4338",
          cashback: "especifico",
          setorCashback: "tecnologia",
          juros: "medio",
          emprestimo: "baixo",
          investimento: "alta"
        },
        {
          id: 312,
          nome: "Tech Premium",
          design: 'wave-patterns',
          cor1: "#cc6600",
          cor2: "#ff8000",
          cor3: "#ff9933",
          cor4: "#ffc266",

          cashback: "todos",
          juros: "baixo",
          emprestimo: "medio",
          investimento: "alta"
        },
        {
          id: 313,
          nome: "Tech Ultra",
          design: "geometric-chaos",
          cor1: "#ff6600",
          cor2: "#ff9933",
          cor3: "#ffb366",
          cor4: "#ffe0b3",
          numeroCard: "5223 **** **** 6241",
          cashback: "especifico",
          setorCashback: "startups",
          juros: "baixo",
          emprestimo: "baixo",
          investimento: "alta"
        }
      ]



    }
  ];

  function processarBanco(banco, config) {
    if (!banco || !banco.cartoes) return banco;

    const range = (chave, tabela) => {
      const valores = banco.cartoes.map(c => tabela[c[chave]]);
      return [Math.min(...valores), Math.max(...valores)];
    };

    return {
      ...banco,
      cashbackValor: range("cashback", Object.fromEntries(
        Object.entries(config.cashback).map(([k, v]) => [k, v.valor])
      )),
      jurosValor: range("juros", config.juros),
      emprestimoMult: range("emprestimo", Object.fromEntries(
        Object.entries(config.emprestimos).map(([k, v]) => [k, v.mult])
      )),
      investimentoPos: range("investimento", config.investimentos.pos),
      investimentoPre: [
        Math.min(...banco.cartoes.map(c => {
          const arr = config.investimentos.pre[c.investimento];
          if (!arr) {
            console.warn("Investimento não encontrado:", c.investimento, "no banco:", banco.nome);
            return Infinity; // evita quebrar o Math.min
          }
          return arr[0]?.valor ?? Infinity;
        })),
        Math.max(...banco.cartoes.map(c => {
          const arr = config.investimentos.pre[c.investimento];
          if (!arr) {
            console.warn("Investimento não encontrado:", c.investimento, "no banco:", banco.nome);
            return -Infinity; // evita quebrar o Math.max
          }
          return arr[2]?.valor ?? -Infinity;
        }))
      ]
    };
  }

  const bancoSelecionadoRaw = bancos.find(b => b.id === selectedBank);
  const bancoSelecionado = bancoSelecionadoRaw ? processarBanco(bancoSelecionadoRaw, config) : null;

  const tooltipStyle = {
    backgroundColor: "#FFFFFF",
    color: "#350973",
    border: "1px solid #350973",
    borderRadius: "6px",
    padding: "6px 10px",
    fontWeight: "600",
    fontSize: "14px",
  };

  function calcularRangeBanco(banco, config) {
    const range = (chave, tabela) => {
      const valores = banco.cartoes.map(c => tabela[c[chave]]);
      return [Math.min(...valores), Math.max(...valores)];
    };

    return {
      cashback: range("cashback", Object.fromEntries(
        Object.entries(config.cashback).map(([k, v]) => [k, v.valor])
      )),
      juros: range("juros", config.juros),
      emprestimos: range("emprestimo", Object.fromEntries(
        Object.entries(config.emprestimos).map(([k, v]) => [k, v.mult])
      )),
      investimentosPos: range("investimento", config.investimentos.pos),
      // Pré-fixado: aqui dá pra mostrar o range do menor até o maior conjunto
      investimentosPre: [
        config.investimentos.pre[banco.cartoes[0].investimento][0].valor,
        config.investimentos.pre[
          banco.cartoes[banco.cartoes.length - 1].investimento
        ][2].valor
      ]
    };
  }

  // const cartoes = [
  //   {
  //     id: 1,
  //     nome: "Agro Classic",
  //     design: "card-classico",
  //     cor1: "#003816",
  //     cor2: "#1A5E2A",
  //     cor3: "#0C9123",
  //     cor4: "#4CAF50",
  //     banco: "AGRO BANK",
  //     tipo: "Básico",
  //     rentabilidadeInvestimento: "8-12%",
  //     valorMaxEmprestimo: "R$ 50.000",
  //     taxaJurosEmprestimo: "6%",
  //     taxaJurosRotativo: "12%",
  //     anuidade: 0,
  //     cashback: "6%",
  //     credito: "0,3",
  //     limiteEmprestimo: "120.000",
  //     limiteInvestimento: "100000"
  //   },
  //   {
  //     id: 2,
  //     nome: "Agro Premium",
  //     design: "card-moderono",
  //     cor1: "#0F3460",
  //     cor2: "#16213E",
  //     cor3: "#533483",
  //     cor4: "#E94560",
  //     banco: "AGRO BANK",
  //     tipo: "Premium",
  //     rentabilidadeInvestimento: "12-18%",
  //     valorMaxEmprestimo: "R$ 200.000",
  //     taxaJurosEmprestimo: "7.5%",
  //     taxaJurosRotativo: "15%",
  //     anuidade: 240,
  //     cashback: "6%",
  //     credito: "0,3",
  //     limiteEmprestimo: "120.000",
  //     limiteInvestimento: "100000"
  //   },
  //   {
  //     id: 3,
  //     nome: "Agro Elite",
  //     design: "wave-patterns",
  //     cor1: "#000428",
  //     cor2: "#004e92",
  //     cor3: "#009ffd",
  //     cor4: "#00d2ff",
  //     banco: "AGRO BANK",
  //     tipo: "Elite",
  //     rentabilidadeInvestimento: "15-25%",
  //     valorMaxEmprestimo: "R$ 500.000",
  //     taxaJurosEmprestimo: "8%",
  //     taxaJurosRotativo: "18%",
  //     anuidade: 600,
  //     cashback: "6%",
  //     credito: "0,3",
  //     limiteEmprestimo: "120.000",
  //     limiteInvestimento: "100000"
  //   }
  // ];

  if (banksModal === true) {
    // Banco selecionado
    const bancoSelecionado = bancos.find(b => b.id === selectedBank);

    return (

      <div className="h-full  bg-gradient-to-br from-[#6A00FF] via-[#350973] via-[#C79FFF] to-[#7317F3] text-white w-full flex flex-col justify-between rounded-[20px]">
        {/* Header */}
        <div className="h-[50px] w-full flex gap-[10px] pt-6 pl-6 items-center">
          <div>
            <Tooltip style={tooltipStyle} id={`tooltip-faturado`} />
            <button
              onClick={() => setBanksModal(false)}
              data-tooltip-id="tooltip-faturado"
              data-tooltip-html="Fechar ofertas"
              className="h-full bg-gradient-to-br from-[#6A00FF] via-[#9D00CC] to-[#E60000] w-[50px] aspect-square rounded-[10px] flex items-center justify-center hover:scale-[1.10] duration-300 ease-in-out delay-[0.1s] cursor-pointer"
            >
              <img className="w-[70%]" src={maps} />
            </button>
          </div>
          <div className="w-[calc(100%-50px)]">
            <h1 className="text-4xl font-bold text-center">Ofertas Disponíveis</h1>
          </div>

        </div>

        {/* Container de cartões */}
        <div className="flex-1 overflow-y-auto px-6 max-h-[73vh] scrollbar-custom">
          <div className="w-full grid pt-[10px] gap-6 pb-6">
            
              <ModalBank
              
                banco={bancoSelecionado} // passa o banco selecionado
              
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
              />
       
          </div>
        </div>

        {/* Modal de confirmação */}
        {/* {selectedCard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold text-white mb-4">Confirmar Seleção</h3>
              <p className="text-slate-300 mb-6">
                Você selecionou o cartão{" "}
                {bancoSelecionado?.cartoes.find(c => c.id === selectedCard)?.nome}.
                Deseja prosseguir para ver os produtos disponíveis?
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedCard(null)}
                  className="flex-1 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-xl font-bold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    // alert(
                    //   `Prosseguindo com ${bancoSelecionado?.cartoes.find(c => c.id === selectedCard)?.nome}`
                    // );
                    setVision("bankInterface")
                    setSelectedCard(selectedCard);

                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-bold transition-all"
                >
                  Prosseguir
                </button>
              </div>
            </div>
          </div>
        )} */}
      </div>
    );
  }




  return (
    <div className="h-full bg-gradient-to-br from-[#6A00FF] via-[#350973] via-[#C79FFF] to-[#7317F3] text-white flex flex-col justify-between rounded-[20px]">
      {/* Título fixo */}
      <ListaContratos />

      {/* Container com scroll interno */}
      <h2 className="text-xl font-bold ml-6 mt-4 mb-4">Bancos Disponíveis</h2>
      <div className="flex-1 overflow-y-auto px-6 max-h-[60vh] scrollbar-custom">
        <div className="max-w-6xl mx-auto grid pt-[10px] gap-6 md:grid-cols-2 lg:grid-cols-3  pb-6">

          {bancos.map((bancoRaw) => {
            const banco = processarBanco(bancoRaw, config);

            return (
              <div
                key={banco.id}
                style={{ background: banco.cor }}
                className="rounded-2xl p-6 border border-slate-700 hover:border-slate-500 transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => { setBanksModal(true); setSelectedBank(banco.id); }}
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{banco.icone}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{banco.nome}</h2>
                    <p className="text-slate-200 text-sm">{banco.descricao}</p>
                  </div>
                </div>

                {/* Infos rápidas */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-300">Cashback</p>
                    <p className="text-lg font-bold text-green-300">
                      {banco.cashbackValor[0]}% - {banco.cashbackValor[1]}% {banco.cartoes.some(c => c.cashback === "especifico") && `(específico)`}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-300">Juros</p>
                    <p className="text-lg font-bold text-red-300">
                      {banco.jurosValor[0]}% - {banco.jurosValor[1]}% a.m
                    </p>
                  </div>
                </div>

                {/* Crédito */}
                <div>
                  <p className="text-xs text-slate-300">Limite de Crédito</p>
                  <p className="text-lg font-bold text-blue-300">
                    x{banco.emprestimoMult[0]} - x{banco.emprestimoMult[1]} patrimônio
                  </p>
                </div>

                {/* Investimentos */}
                <div className="mt-4">
                  <p className="text-xs text-slate-300 mb-1">Investimento Pós-fixado</p>
                  <p className="text-sm">
                    Rentabilidade: {banco.investimentoPos[0]}% - {banco.investimentoPos[1]}% a.m
                  </p>

                  <p className="text-xs text-slate-300 mt-2 mb-1">Investimento Pré-fixado</p>
                  <p className="text-sm">
                    {banco.investimentoPre[0]}% - {banco.investimentoPre[1]}% a.m
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

};

export default BankSelection;
