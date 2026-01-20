import { useContext, useEffect } from "react";
import { useGame } from "../components/GameContext";
import { generateButcherContracts } from "../components/salesContractsConfig";
import { marketPrices } from "../components/TablePrice";
import { CentraldeDadosContext } from "../centralDeDadosContext";

export default function ButcherShopPanel() {
  const { stock, removeProduct, salesContracts, setAvailableSalesContracts, acceptSalesContract } =
    useGame();

  const { dados } = useContext(CentraldeDadosContext);

  const setorAtivo = "comercio";
  const indexAçougue = 7;

  const edificio =
    dados?.[setorAtivo]?.edificios?.[indexAçougue];

  if (!edificio) return null;

  const butcherCount = edificio.quantidade;

  const qtdNv2 = edificio.powerUp.nível2.quantidadeMínima;
  const qtdNv3 = edificio.powerUp.nível3.quantidadeMínima;

  const level =
    butcherCount >= qtdNv3
      ? 3
      : butcherCount >= qtdNv2
      ? 2
      : 1;

  const butcherContracts = salesContracts.butcher;
  const { available, active } = butcherContracts;

  function gerarContratos() {
    if (butcherCount <= 0) {
      setAvailableSalesContracts("butcher", []);
      return;
    }

    const contracts = generateButcherContracts({
      butcherCount,
      level,
      marketPrices,
    });

    setAvailableSalesContracts("butcher", contracts);
  }

  function podeAceitar(contract) {
    return (stock[contract.productId] || 0) >= contract.quantidade;
  }

  function aceitarContrato(contract) {
    acceptSalesContract("butcher", contract, removeProduct);
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-3">🥩 Açougue</h2>

      <p className="text-sm mb-4">
        Açougues: {butcherCount} | Nível: {level}
      </p>

      {active ? (
        <div className="border p-3 rounded bg-yellow-50">
          <p className="font-semibold">
            Vendendo {active.produtoNome}
          </p>
          <p>{active.quantidade} kg</p>
          <p>Dias restantes: {active.diasRestantes}</p>
          <p className="text-green-700 font-bold">
            💰 {active.valorTotal}
          </p>
        </div>
      ) : (
        <>
          <button
            onClick={gerarContratos}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Gerar Ofertas
          </button>

          <div className="grid grid-cols-2 gap-4">
            {available.map(contract => (
              <div
                key={contract.id}
                className={`border p-3 rounded ${
                  podeAceitar(contract)
                    ? "bg-green-50"
                    : "bg-gray-100 opacity-60"
                }`}
              >
                <p className="font-semibold">
                  {contract.produtoNome}
                </p>
                <p>{contract.quantidade} kg</p>
                <p>Recebe em {contract.diasTotais} dias</p>
                <p className="font-bold text-green-700">
                  💰 {contract.valorTotal}
                </p>

                <button
                  disabled={!podeAceitar(contract)}
                  onClick={() => aceitarContrato(contract)}
                  className="mt-2 w-full py-2 rounded text-white bg-green-600 disabled:bg-gray-400"
                >
                  Aceitar contrato
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
