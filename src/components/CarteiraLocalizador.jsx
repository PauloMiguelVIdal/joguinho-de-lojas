import React, { useContext, useMemo, useEffect } from "react";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { Localizador } from "./localizador";
import { useCentralStore } from "../stores/useCentralStore";
import { EDIFICIOS_FINAIS_ESTATICOS } from "../stores/dadosEstáticos";

export const CarteiraLocalizador = ({ abrirModalSell, setorFiltro }) => {
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);

  const edificiosDinamicos = useCentralStore((s) => s.edificiosFinais);

  const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];
  
  const setoresParaRenderizar = (setorFiltro && setorFiltro !== "todos")
    ? setoresArr.filter(s => s === setorFiltro)
    : setoresArr;

  // 🔥 snapshot agora usa o DINÂMICO
  const snapshot = JSON.stringify(
    setoresArr.map(s =>
      (edificiosDinamicos?.[s]?.edificios || []).map((ed, i) => ({ i, q: ed.quantidade }))
    )
  );

  const { carteiraArr, edificiosFiltrados } = useMemo(() => {
    const carteiraTemp = [];
    const filtrados = [];

    setoresArr.forEach((setor) => {
      const ativos = [];

      const listaEstatica = EDIFICIOS_FINAIS_ESTATICOS?.[setor]?.edificios || [];
      const listaDinamica = edificiosDinamicos?.[setor]?.edificios || [];

      listaEstatica.forEach((edEst, idx) => {
        const qtd = listaDinamica[idx]?.quantidade || 0;

        if (qtd > 0) {
          ativos.push({
            ...edEst,
            quantidade: qtd
          });

          if (setoresParaRenderizar.includes(setor)) {
            filtrados.push({ idx, setor });
          }
        }
      });

      carteiraTemp.push(ativos);
    });

    return { carteiraArr: carteiraTemp, edificiosFiltrados: filtrados };
  }, [snapshot, setorFiltro, edificiosDinamicos]);

  // 🔄 sincroniza carteira global
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
            EDIFICIOS_FINAIS_ESTATICOS[setor].edificios[idx].nome,
            abrirModalSell,
            idx,
            setor
          )}
        </React.Fragment>
      ))}
    </>
  );
};