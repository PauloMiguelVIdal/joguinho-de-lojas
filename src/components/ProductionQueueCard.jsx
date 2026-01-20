import { productsCatalog } from "../components/ProductCatalog";

export default function ProductionQueueCard({ production, formula }) {
  if (!production) return null; // 🔒 blindagem

  return (
    <div
      style={{
        border: "1px solid #2f2f2f",
        borderRadius: 8,
        padding: 12,
        background: "#121212",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <strong style={{ fontSize: 14 }}>
        {formula?.nome || "Produção"}
      </strong>

      <span style={{ fontSize: 12, opacity: 0.8 }}>
        ⏳ {production.diasRestantes} dia(s) restante(s)
      </span>

      <div style={{ fontSize: 12 }}>
        <strong>Produção esperada:</strong>
        <ul style={{ marginTop: 4, paddingLeft: 16 }}>
          {Object.entries(production.output || {}).map(
            ([produtoId, qtd]) => {
              const produto = productsCatalog[produtoId];

              return (
                <li key={produtoId}>
                  {produto?.nome || produtoId}: {qtd}
                </li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
}
