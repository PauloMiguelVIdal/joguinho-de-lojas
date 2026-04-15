// import { useContext } from "react";
// import { useGame } from "../components/GameContext";
// import { generateSalesContracts } from "../components/salesContractsConfig";
// import { marketPrices, productsCatalog } from "../components/TablePrice";
// import { CentraldeDadosContext } from "../centralDeDadosContext";
// import { SALES_EDIFICIOS } from "../components/salesFormulasConfig";

// export default function SalesBuildingPanel({ edificioId }) {
//   const {
//     stock,
//     removeProduct,
//     salesContracts,
//     setAvailableSalesContracts,
//     acceptSalesContract,
//   } = useGame();

//   const { dados } = useContext(CentraldeDadosContext);

//   const config = SALES_EDIFICIOS.find(e => e.edificioId === edificioId);
//   if (!config) return null;

//   const setorAtivo = config.setor;

//   const edificio = dados?.[setorAtivo]?.edificios?.find(
//     e => e.id === edificioId
//   );

//   if (!edificio) return null;

//   const buildingCount = edificio.quantidade;

//   const qtdNv2 = edificio.powerUp.nível2.quantidadeMínima;
//   const qtdNv3 = edificio.powerUp.nível3.quantidadeMínima;

//   const level =
//     buildingCount >= qtdNv3
//       ? 3
//       : buildingCount >= qtdNv2
//       ? 2
//       : 1;

//   const buildingContracts = salesContracts[edificioId] || {
//     available: [],
//     active: null,
//   };

//   const { available, active } = buildingContracts;

//   function gerarContratos() {
//     if (buildingCount <= 0) {
//       setAvailableSalesContracts(edificioId, []);
//       return;
//     }

//     const contracts = generateSalesContracts({
//       edificioConfig: config,
//       buildingCount,
//       level,
//       marketPrices,
//     });

//     setAvailableSalesContracts(edificioId, contracts);
//   }

//   function podeAceitar(contract) {
//     return (stock[contract.productId] || 0) >= contract.quantidade;
//   }

//   function aceitarContrato(contract) {
//     acceptSalesContract(edificioId, contract, removeProduct);
//   }

//   return (
//     <div className="p-4 bg-white rounded-lg shadow">
//       <h2 className="text-xl font-bold mb-3">{config.nomeEdificio}</h2>

//       <p className="text-sm mb-4">
//         Edifícios: {buildingCount} | Nível: {level}
//       </p>

//       {active ? (
//         <div className="border p-3 rounded bg-yellow-50">
//           <p className="font-semibold">
//             Vendendo {productsCatalog[active.productId]?.nome}
//           </p>

//           <p>{active.quantidade}</p>

//           <p>Dias restantes: {active.diasRestantes}</p>

//           <p className="text-green-700 font-bold">
//             💰 {active.valorTotal}
//           </p>
//         </div>
//       ) : (
//         <>
//           <button
//             onClick={gerarContratos}
//             className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
//           >
//             Gerar Ofertas
//           </button>

//           <div className="grid grid-cols-2 gap-4">
//             {available.map(contract => (
//               <div
//                 key={contract.id}
//                 className={`border p-3 rounded ${
//                   podeAceitar(contract)
//                     ? "bg-green-50"
//                     : "bg-gray-100 opacity-60"
//                 }`}
//               >
//                 <p className="font-semibold">
//                   {productsCatalog[contract.productId]?.nome}
//                 </p>

//                 <p>{contract.quantidade}</p>

//                 <p>Recebe em {contract.diasTotais} dias</p>

//                 <p className="font-bold text-green-700">
//                   💰 {contract.valorTotal}
//                 </p>

//                 <button
//                   disabled={!podeAceitar(contract)}
//                   onClick={() => aceitarContrato(contract)}
//                   className="mt-2 w-full py-2 rounded text-white bg-green-600 disabled:bg-gray-400"
//                 >
//                   Aceitar contrato
//                 </button>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }