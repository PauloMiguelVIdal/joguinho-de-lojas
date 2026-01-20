import { useMemo, useContext } from "react";
import { useGame } from "../components/GameContext";
import { productsCatalog } from "../components/ProductCatalog";
import { getMarketPrice } from "../components/TablePrice";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";

/* =====================================================
   STORAGE INTERFACE (UI ONLY)
===================================================== */

export default function StorageInterface() {
  const {
    stock,
    getCategoryStorageUI,
    usedVariableStorage,
    variableStorageTotal,
    storageBuildings,
    potentialCapacityByCategory,
    getStockPredictionReport
  } = useGame();
  const { economiaSetores } = useContext(DadosEconomyGlobalContext);
  /* =========================
     CATEGORIAS EXISTENTES
  ========================= */
  const categorias = useMemo(() => {
    return [
      ...new Set(
        Object.values(productsCatalog).map(
          p => p.categoriaFisica
        )
      ),
    ];
  }, []);


  /* =========================
  PRODUTOS EM ESTOQUE
  ========================= */
  const stockedProducts = useMemo(() => {
    return Object.entries(stock)
      .map(([id, qty]) => ({
        id,
        qty,
        product: productsCatalog[id],
      }))
      .filter(p => p.product && p.qty > 0);
  }, [stock]);

  const totalStockValue = useMemo(() => {
    return stockedProducts.reduce((total, { id, qty }) => {
      if (!productsCatalog[id]) return total;
      const price = getMarketPrice(id, economiaSetores);
      return total + qty * price;
    }, 0);
  }, [stockedProducts, economiaSetores]);

  const groupedStorages = useMemo(() => {
    const map = {};

    storageBuildings.forEach(b => {
      const key = b.id;

      if (!map[key]) {
        map[key] = {
          nome: b.nome,
          tipo: b.tipo,
          quantidade: 0,
          capacidadeTotal: 0,
        };
      }

      map[key].quantidade += 1;
      map[key].capacidadeTotal += b.capacidade;
    });

    return Object.values(map);
  }, [storageBuildings]);

  /* =========================
     FORMATADORES
  ========================= */
  const formatNumber = v =>
    new Intl.NumberFormat("pt-BR").format(v);

  const formatMoney = v =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(v);


const predictionReport = useMemo(
  () => getStockPredictionReport(),
  [stock]
);


  return (
    <div className="bg-zinc-900 text-white p-6 rounded-xl space-y-6">

      {/* =========================
          CAPACIDADE DE ARMAZENAMENTO
      ========================= */}
      <section>
        <h2 className="text-xl font-bold mb-4">
          Capacidade de Armazenamento
        </h2>

        {categorias.map(cat => {
          const ui = getCategoryStorageUI(cat);
          const potential = potentialCapacityByCategory[cat];

          // se a categoria não pode existir em nenhum storage, não mostra
          if (!potential) return null;

          const usadoSlots = ui.usadoSlots ?? 0;
          const capDedicadaSlots = ui.capDedicadaSlots ?? 0;

          const capMaxSlots =
            (potential.dedicada ?? 0) +
            (potential.variavel ?? 0);



          const percent =
            capMaxSlots > 0
              ? Math.min((usadoSlots / capMaxSlots) * 100, 100)
              : 0;


          return (
            <div key={cat} className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="capitalize">{cat}</span>
                <span>
                  {usadoSlots.toFixed(1)} slots / {capDedicadaSlots}
                  {capMaxSlots > capDedicadaSlots && (
                    <span className="text-zinc-400">
                      {" "} (máx {capMaxSlots} slots)
                    </span>
                  )}
                </span>


              </div>

              <div className="w-full h-3 bg-zinc-700 rounded">
                <div
                  className={`h-3 rounded ${percent > 90
                    ? "bg-red-500"
                    : percent > 70
                      ? "bg-yellow-400"
                      : "bg-green-500"
                    }`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}

        {/* =========================
            ARMAZÉM VARIÁVEL
        ========================= */}
        <div className="mt-4 pt-3 border-t border-zinc-700 text-sm flex justify-between">
          <span>Armazém Variável</span>
          <span>
            {usedVariableStorage} / {variableStorageTotal}
          </span>
        </div>
      </section>

      {/* =========================
          PRODUTOS EM ESTOQUE
      ========================= */}
      <section>
        <h2 className="text-xl font-bold mb-4">
          Produtos em Estoque
        </h2>

        {stockedProducts.length === 0 && (
          <p className="text-sm text-zinc-400">
            Nenhum produto armazenado
          </p>
        )}

        {stockedProducts.map(({ id, qty, product }) => (
          <div
            key={id}
            className="flex justify-between py-2 border-b border-zinc-700 last:border-0"
          >
            <span>
              {product.icon} {product.nome}
            </span>
            <div className="text-right">
              <div className="font-semibold">
                {formatNumber(qty)}
              </div>
              <div className="text-sm text-zinc-400">
                {formatMoney(
                  qty * getMarketPrice(id, economiaSetores)
                )}
              </div>
            </div>

          </div>
        ))}
      </section>
{/* =========================
    📈 PREVISÃO DE ESTOQUE
========================= */}
<section>
  <h2 className="text-xl font-bold mb-4">
    📈 Previsão de Produção
  </h2>

  {predictionReport.length === 0 && (
    <p className="text-sm text-zinc-400">
      Nenhuma produção futura registrada
    </p>
  )}

  {predictionReport.map(item => (
    <div
      key={item.produtoId}
      className="border border-zinc-700 rounded-lg p-4 mb-3"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">
          {item.icon} {item.nome}
        </span>

        <span className="text-sm text-zinc-400">
          +{item.totalQtd}
        </span>
      </div>

      <div className="text-sm space-y-1">
        {item.producoes
          .sort((a, b) => a.dias - b.dias)
          .map((p, i) => (
            <div key={i} className="flex justify-between">
              <span>Em {p.dias} dia(s)</span>
              <span>+{p.quantidade}</span>
            </div>
          ))}
      </div>

      <div className="mt-2 text-sm text-zinc-400">
        Slots necessários: {item.totalSlots}
      </div>

      <div className="mt-1 text-sm">
        Valor estimado:{" "}
        <span className="text-green-400">
          {formatMoney(item.valorEstimado)}
        </span>
      </div>

      {item.excessoQtd > 0 && (
        <div className="mt-2 text-sm text-red-400">
          ⚠ Excesso previsto: {item.excessoQtd} unidades <br />
          Perda estimada: {formatMoney(item.valorPerdaEstimado)}
        </div>
      )}
    </div>
  ))}
</section>

      {/* =========================
          ESTRUTURAS DE ARMAZENAMENTO
      ========================= */}
      <section>
        <h2 className="text-xl font-bold mb-4">
          Estruturas de Armazenamento
        </h2>

        {groupedStorages.map(b => (
          <div
            key={b.nome}
            className="flex justify-between text-sm py-1"
          >
            <span>
              {b.nome}{" "}
              <span className="text-zinc-400">
                (x{b.quantidade})
              </span>
            </span>
            <span>
              {formatNumber(b.capacidadeTotal)}
            </span>
          </div>
        ))}
      </section>


      {/* =========================
          VALOR TOTAL EM ESTOQUE
      ========================= */}
      {typeof totalStockValue === "number" && (
        <section className="pt-4 border-t border-zinc-700 flex justify-between font-bold">
          <span>Valor total em estoque</span>
          <span className="text-green-400">
            {formatMoney(totalStockValue)}
          </span>
        </section>
      )}
    </div>
  );
}
