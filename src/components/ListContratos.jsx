import React, { useContext } from "react";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { CentraldeDadosContext } from "../centralDeDadosContext";

export const ListaContratos = () => {
  const { dados } = useContext(CentraldeDadosContext);
  const { economiaSetores } = useContext(DadosEconomyGlobalContext);

  const contratosArray = economiaSetores?.contratosBancos ?? [];

  if (!contratosArray.length) {
    return 
    // <div className="w-full mx-auto  pt-[10px] bg-white/20 rounded-xl pb-6 pl-6 pr-6 max-w-7xl">Não há contratos cadastrados.</div>;
  }

  return (
    <div className="w-full mx-auto  pt-[10px] bg-white/20 rounded-xl pb-6 pl-6 pr-6 max-w-7xl">
      <h2 className="text-xl font-bold mb-4">Contratos Ativos</h2>

      {/* Grid 3 colunas, responsivo */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {contratosArray.map((c, idx) => {
          const bancoNome = c.bancoNome ?? "Banco desconhecido";
          const cartaoNome = c.cartaoNome ?? "-";
          const juros = c.juros ?? "-";
          const cashbackTipo = c.cashback?.tipo ?? "-";
          const emprestimo = c.emprestimo ?? "-";
          const investimento = c.investimento ?? "-";
          const dataFim = c.dataFim ?? dados.dia;
          const diasRestantes = dataFim - dados.dia;

          const gradiente = `linear-gradient(135deg, ${c.cor1 ?? "#000"}, ${c.cor2 ?? "#111"}, ${c.cor3 ?? "#222"}, ${c.cor4 ?? "#333"})`;

          return (
            <div
              key={idx}
              className="rounded-xl shadow-lg overflow-hidden text-white w-full"
              style={{ background: gradiente, backdropFilter: "blur(10px)" }}
            >
              {/* Linha 1: Banco + dias restantes */}
              <div className="p-4 bg-white/20 flex justify-between items-center">
                <h3 className="text-xl font-extrabold">{bancoNome}</h3>
                <span className="text-sm font-semibold opacity-90">
                  {diasRestantes} dias restantes
                </span>
              </div>

              {/* Linha 2: infos */}
              <div className="p-4 bg-white/10 backdrop-blur-md grid grid-cols-2 gap-2 text-sm">
                <p><span className="font-semibold">Cartão:</span> {cartaoNome}</p>
                <p><span className="font-semibold">Juros:</span> {juros}</p>
                <p><span className="font-semibold">Cashback:</span> {cashbackTipo}</p>
                <p><span className="font-semibold">Empréstimo:</span> {emprestimo}</p>
                <p className="col-span-2"><span className="font-semibold">Linha de Crédito:</span> {investimento}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
