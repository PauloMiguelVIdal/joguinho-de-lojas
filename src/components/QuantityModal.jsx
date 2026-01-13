import React from "react";
import { useState, useEffect, useContext } from "react";
import { useGame } from "../components/GameContext";
import { productsCatalog } from "../components/ProductCatalog";



export default function QuantityModal({
  isOpen,
  onClose,
  onConfirm,
  max,
  price,
  title,
  productId,
}) {
  const product = productsCatalog[productId];

  const [qty, setQty] = useState(1);

  const {
    getMaxAddable,
  } = useGame();
  useEffect(() => {
    if (isOpen) setQty(1);
  }, [isOpen]);

  if (!isOpen) return null;

  const total = qty * price;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
        <h3 className="text-xl font-bold mb-4">{title}</h3>

        {/* CONTROLES */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <button
            onClick={() => setQty(q => Math.max(1, q - 1))}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            -1
          </button>

          <input
            type="number"
            min={1}
            max={max}
            value={qty}
            onChange={e =>
              setQty(
                Math.min(
                  max,
                  Math.max(1, Number(e.target.value))
                )
              )
            }
            className="w-20 text-center border rounded"
          />

          <button
            onClick={() => setQty(q => Math.min(max, q + 1))}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            +1
          </button>

          <button
            onClick={() => setQty(max)}
            className="px-3 py-1 bg-indigo-500 text-white rounded"
          >
            MAX
          </button>
        </div>

        {/* INFO */}
        <div className="text-center text-sm text-gray-600 mb-4">
          Máximo permitido: <b>{max}</b>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Máx: {getMaxAddable(productId)} {product.unidade}{" "}
          ({(getMaxAddable(productId) * product.slotSize).toFixed(1)} slots)
        </p>
        <p className="text-xs text-gray-500 mt-2">
          tempo de entrega: 10 dias
        </p>

        <div className="text-center font-bold mb-4">
          Total:{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(total)}
        </div>

        {/* AÇÕES */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancelar
          </button>
          <button
            disabled={qty <= 0}
            onClick={() => onConfirm(qty)}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-40"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
