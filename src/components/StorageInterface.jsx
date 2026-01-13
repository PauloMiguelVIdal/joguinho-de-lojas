import { useMemo,useContext } from "react";
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
          const { usado, capEspecifica, capMax } =
            getCategoryStorageUI(cat);

          if (usado === 0 && capEspecifica === 0) return null;

          const percent =
            capMax > 0
              ? Math.min((usado / capMax) * 100, 100)
              : 0;

          return (
            <div key={cat} className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="capitalize">{cat}</span>
                <span>
                  {formatNumber(usado)} /{" "}
                  {formatNumber(capEspecifica)}
                  {capMax > capEspecifica &&
                    ` (${formatNumber(capMax)})`}
                </span>
              </div>

              <div className="w-full h-3 bg-zinc-700 rounded">
                <div
                  className={`h-3 rounded ${
                    percent > 90
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
            {formatNumber(usedVariableStorage)} /{" "}
            {formatNumber(variableStorageTotal)}
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
