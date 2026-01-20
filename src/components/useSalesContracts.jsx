import { useState,useContext } from "react";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { use } from "react";
export function useSalesContracts() {
  const [availableContracts, setAvailableContracts] = useState([]);
  const [activeContract, setActiveContract] = useState(null);

const {economiaSetores,atualizarEco} = useContext(DadosEconomyGlobalContext)

  function acceptContract(contract, removeProduct) {
    if (activeContract) return false;

    removeProduct(contract.productId, contract.quantidade);

    setActiveContract({
      ...contract,
      diasRestantes: contract.diasTotais,
      status: "em_andamento",
    });

    setAvailableContracts([]);
    return true;
  }


  function processDay() {
    setActiveContract(prev => {
      if (!prev) return null;

      if (prev.diasRestantes > 1) {
        return { ...prev, diasRestantes: prev.diasRestantes - 1 };
      }

      atualizarEco("saldo",economiaSetores.saldo + prev.valorTotal);
      return null;
    });
  }

  return {
    availableContracts,
    setAvailableContracts,
    activeContract,
    acceptContract,
    processDay,
  };
}
