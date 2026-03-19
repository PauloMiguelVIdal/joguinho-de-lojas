import React, { useContext, useMemo, useEffect } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { Localizador } from "./localizador";

export const CarteiraLocalizador = ({ abrirModalSell, setorFiltro }) => {
  const { dados } = useContext(CentraldeDadosContext);
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);

  const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];
  
  // ✅ "todos" ou undefined/null = sem filtro
  const setoresParaRenderizar = (setorFiltro && setorFiltro !== "todos")
    ? setoresArr.filter(s => s === setorFiltro)
    : setoresArr;

  const snapshot = JSON.stringify(
    setoresArr.map(s =>
      (dados[s]?.edificios || []).map((ed, i) => ({ i, q: ed.quantidade }))
    )
  );

  const { carteiraArr, edificiosFiltrados } = useMemo(() => {
    const carteiraTemp = [];
    const filtrados = [];

    // ✅ carteiraArr sempre percorre TODOS os setores (para sincronizar carteira global corretamente)
    setoresArr.forEach((setor) => {
      const ativos = [];
      (dados[setor]?.edificios || []).forEach((ed, idx) => {
        if (ed.quantidade > 0) {
          ativos.push(ed);
          // ✅ só adiciona ao visual se passar no filtro
          if (setoresParaRenderizar.includes(setor)) {
            filtrados.push({ idx, setor });
          }
        }
      });
      carteiraTemp.push(ativos);
    });

    return { carteiraArr: carteiraTemp, edificiosFiltrados: filtrados };
  }, [snapshot, setorFiltro]);

  // Sincroniza carteira global
  useEffect(() => {
    const carteiraAtual = economiaSetores.carteira?.carteiraAtual || [];
    if (JSON.stringify(carteiraAtual) !== JSON.stringify(carteiraArr)) {
      atualizarEco("carteira", {
        ...economiaSetores.carteira,
        carteiraAtual: carteiraArr,
      });
    }
  }, [carteiraArr]);

  if (edificiosFiltrados.length === 0) {
    return (
      <div style={{
        gridColumn: "1 / -1",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        height: "100%", gap: 8, opacity: 0.4
      }}>
        <span style={{ fontSize: 22 }}>📭</span>
        <span style={{ color: "#fff", fontSize: 13 }}>
          {(setorFiltro && setorFiltro !== "todos")
            ? `Nenhum edifício em ${setorFiltro}`
            : "Nenhum edifício na carteira ainda"}
        </span>
      </div>
    );
  }

  return (
    <>
      {edificiosFiltrados.map(({ idx, setor }) => (
        <React.Fragment key={`${setor}-${idx}`}>
          {Localizador(
            dados[setor].edificios[idx].nome,
            abrirModalSell,
            idx,
            setor
          )}
        </React.Fragment>
      ))}
    </>
  );
};