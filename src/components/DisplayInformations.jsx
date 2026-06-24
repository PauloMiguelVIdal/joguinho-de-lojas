import React, { useContext, useMemo } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";

const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

const FATOR_ECONOMIA = {
  recessão: 0.4,
  declinio: 0.8,
  estável: 1,
  progressiva: 1.1,
  aquecida: 1.25
};

const formatarNumero = (num) => {
  if (num === undefined || num === null || isNaN(num)) return "R$ 0";
  const abs = Math.abs(num);
  const sinal = num < 0 ? "-" : "";
  if (abs >= 1e12) return `${sinal}R$ ${(abs / 1e12).toFixed(1)}T`;
  if (abs >= 1e9) return `${sinal}R$ ${(abs / 1e9).toFixed(1)}B`;
  if (abs >= 1e6) return `${sinal}R$ ${(abs / 1e6).toFixed(1)}M`;
  if (abs >= 1e3) return `${sinal}R$ ${(abs / 1e3).toFixed(0)}K`;
  return `${sinal}R$ ${Math.round(abs)}`;
};

// 🔥 Função para criar mapa de edifícios
const criarMapaEdificios = (dados) => {
  const mapa = new Map();
  setoresArr.forEach(setor => {
    if (dados[setor]?.edificios) {
      dados[setor].edificios.forEach(ed => {
        mapa.set(ed.nome, ed);
      });
    }
  });
  return mapa;
};

// 🔥 Função para calcular custo de recursos recursivamente
const criarCalculadoraCustoRecurso = (mapaEdificios, dados) => {
  const cache = new Map();

  const calcularCustoRecurso = (nomeRecurso) => {
    if (cache.has(nomeRecurso)) return cache.get(nomeRecurso);

    const edEncontrado = mapaEdificios.get(nomeRecurso);
    if (!edEncontrado) return 0;

    const c = edEncontrado.custoConstrucao || 0;
    const tNec = edEncontrado.lojasNecessarias?.terrenos || 0;
    const pNec = edEncontrado.lojasNecessarias?.lojasP || 0;
    const mNec = edEncontrado.lojasNecessarias?.lojasM || 0;
    const gNec = edEncontrado.lojasNecessarias?.lojasG || 0;

    let total = c
      + tNec * (dados.terrenos?.preçoConstrução || 0)
      + pNec * ((dados.lojasP?.preçoConstrução || 0) + (dados.lojasP?.quantidadeNecTerreno || 0) * (dados.terrenos?.preçoConstrução || 0))
      + mNec * ((dados.lojasM?.preçoConstrução || 0) + (dados.lojasM?.quantidadeNecTerreno || 0) * (dados.terrenos?.preçoConstrução || 0))
      + gNec * ((dados.lojasG?.preçoConstrução || 0) + (dados.lojasG?.quantidadeNecTerreno || 0) * (dados.terrenos?.preçoConstrução || 0));

    if (Array.isArray(edEncontrado.recursoDeConstrução) && edEncontrado.recursoDeConstrução.length > 0) {
      edEncontrado.recursoDeConstrução.forEach((sub) => {
        total += calcularCustoRecurso(sub);
      });
    }

    cache.set(nomeRecurso, total);
    return total;
  };

  return calcularCustoRecurso;
};

// 🔥 Função de cálculo de ROI (idêntica à original)
const calcROI = (ed, dados, economiaSetor, mapaEdificios, calcularCustoRecurso) => {
  if (!ed || !dados) return 0;

  try {
    const fatorEconomico = FATOR_ECONOMIA[economiaSetor] || 1;

    const quantidadeAtual = ed.quantidade || 0;
    const qtdMin2 = ed?.powerUp?.nível2?.quantidadeMínima ?? Infinity;
    const qtdMin3 = ed?.powerUp?.nível3?.quantidadeMínima ?? Infinity;

    const nivelPU = quantidadeAtual >= qtdMin3 ? "powerUpNv3"
      : quantidadeAtual >= qtdMin2 ? "powerUpNv2"
        : "powerUpNv1";

    let redCusto = 0;
    let aumFatu = 0;

    if (Array.isArray(ed?.RecebeMelhoraEficiencia)) {
      ed.RecebeMelhoraEficiencia.forEach((rel) => {
        const outroEd = mapaEdificios.get(rel.nome);
        if (outroEd && outroEd.quantidade > 0) {
          const nivel = nivelPU === "powerUpNv1" ? "nível1"
            : nivelPU === "powerUpNv2" ? "nível2"
              : "nível3";

          redCusto += rel?.redCusto?.[nivel] || 0;
          aumFatu += rel?.aumFatu?.[nivel] || 0;
        }
      });
    }

    const valorFatu = ed?.finanças?.faturamentoUnitário || 0;
    const impostoFixo = ed?.finanças?.impostoFixo || 0;
    const impostoFatu = ed?.finanças?.impostoSobreFatu || 0;

    const valorFatuFinal = valorFatu * (1 + aumFatu / 100);
    const impostoFixoFinal = impostoFixo * (1 - redCusto / 100);
    const impostoFatuFinal = impostoFatu * (1 - redCusto / 100);

    const fatuMensal = valorFatuFinal * 30 * fatorEconomico;
    const impostoSobreFatuValor = fatuMensal * impostoFatuFinal;
    const lucro = fatuMensal - impostoSobreFatuValor - impostoFixoFinal;

    const custoBase =
      (ed?.lojasNecessarias?.terrenos || 0) * (dados?.terrenos?.preçoConstrução || 0) +
      (ed?.lojasNecessarias?.lojasP || 0) * ((dados?.lojasP?.preçoConstrução || 0) + (dados?.lojasP?.quantidadeNecTerreno || 0) * (dados?.terrenos?.preçoConstrução || 0)) +
      (ed?.lojasNecessarias?.lojasM || 0) * ((dados?.lojasM?.preçoConstrução || 0) + (dados?.lojasM?.quantidadeNecTerreno || 0) * (dados?.terrenos?.preçoConstrução || 0)) +
      (ed?.lojasNecessarias?.lojasG || 0) * ((dados?.lojasG?.preçoConstrução || 0) + (dados?.lojasG?.quantidadeNecTerreno || 0) * (dados?.terrenos?.preçoConstrução || 0));

    let custoRecursos = 0;
    if (Array.isArray(ed?.recursoDeConstrução)) {
      ed.recursoDeConstrução.forEach((nome) => {
        custoRecursos += calcularCustoRecurso(nome);
      });
    }

    const custoTotal = custoBase + custoRecursos + (ed?.custoConstrucao || 0);

    return custoTotal > 0 ? (lucro / custoTotal) * 100 : 0;

  } catch (err) {
    console.error("Erro no calcROI:", err);
    return 0;
  }
};

export default function DisplayInformations() {
  const { dados } = useContext(CentraldeDadosContext);
  const { economiaSetores } = useContext(DadosEconomyGlobalContext);

  const cartasSelecionadas = dados.cartasSelecionadas || [];

  // 🔥 Cria o mapa de edifícios e a calculadora de custo
  const mapaEdificios = useMemo(() => criarMapaEdificios(dados), [dados]);
  const calcularCustoRecurso = useMemo(
    () => criarCalculadoraCustoRecurso(mapaEdificios, dados),
    [mapaEdificios, dados]
  );

  // 🔥 Calcula as simulações baseado nas cartas selecionadas
  const simulacao = useMemo(() => {
    if (cartasSelecionadas.length === 0) {
      return {
        faturamento: 0,
        despesas: 0,
        lucroLiquido: 0,
        roi: 0,
        totalEdificios: 0,
        totalQuantidade: 0,
        totalRedCusto: 0,
        totalAumFatu: 0,
        detalhes: []
      };
    }

    let faturamentoTotal = 0;
    let despesasTotal = 0;
    let custoTotalConstrucao = 0;
    let totalRedCusto = 0;
    let totalAumFatu = 0;
    const detalhes = [];

    cartasSelecionadas.forEach(({ setor, index, nome }) => {
      const edificio = dados[setor]?.edificios?.[index];
      if (!edificio) return;

      const quantidade = edificio.quantidade || 0;
      
      // 🔥 Usa a função calcROI para obter o ROI correto
      const estadoEconomia = economiaSetores[setor]?.economiaSetor?.estadoAtual || "estável";
      const roi = calcROI(edificio, dados, estadoEconomia, mapaEdificios, calcularCustoRecurso);

      // 🔥 Calcula os power-ups do edifício
      const qtdMin2 = edificio.powerUp?.nível2?.quantidadeMínima ?? Infinity;
      const qtdMin3 = edificio.powerUp?.nível3?.quantidadeMínima ?? Infinity;
      const nivelPU = quantidade >= qtdMin3 ? "powerUpNv3" 
        : quantidade >= qtdMin2 ? "powerUpNv2" 
        : "powerUpNv1";

      let redCusto = 0;
      let aumFatu = 0;

      if (Array.isArray(edificio.RecebeMelhoraEficiencia)) {
        edificio.RecebeMelhoraEficiencia.forEach((rel) => {
          const outroEd = mapaEdificios.get(rel.nome);
          if (outroEd && outroEd.quantidade > 0) {
            const nivel = nivelPU === "powerUpNv1" ? "nível1"
              : nivelPU === "powerUpNv2" ? "nível2"
              : "nível3";

            redCusto += rel?.redCusto?.[nivel] || 0;
            aumFatu += rel?.aumFatu?.[nivel] || 0;
          }
        });
      }

      totalRedCusto += redCusto;
      totalAumFatu += aumFatu;

      // 🔥 Cálculo do faturamento e despesas
      const faturamentoUnitario = edificio.finanças?.faturamentoUnitário || 0;
      const impostoFixo = edificio.finanças?.impostoFixo || 0;
      const impostoSobreFatu = edificio.finanças?.impostoSobreFatu || 0;
      const fatorEconomico = FATOR_ECONOMIA[estadoEconomia] || 1;

      const valorFatuFinal = faturamentoUnitario * (1 + aumFatu / 100);
      const impostoFixoFinal = impostoFixo * (1 - redCusto / 100);
      const impostoFatuFinal = impostoSobreFatu * (1 - redCusto / 100);

      const fatuMensal = valorFatuFinal * 30 * fatorEconomico * quantidade;
      const impostoFatuMensal = fatuMensal * impostoFatuFinal;
      const impostoFixoMensal = impostoFixoFinal * quantidade;
      const despesasMensais = impostoFatuMensal + impostoFixoMensal;
      const lucroMensal = fatuMensal - despesasMensais;

      // 🔥 Custo total de construção (inclui recursos e lojas necessárias)
      const custoBase =
        (edificio?.lojasNecessarias?.terrenos || 0) * (dados?.terrenos?.preçoConstrução || 0) +
        (edificio?.lojasNecessarias?.lojasP || 0) * ((dados?.lojasP?.preçoConstrução || 0) + (dados?.lojasP?.quantidadeNecTerreno || 0) * (dados?.terrenos?.preçoConstrução || 0)) +
        (edificio?.lojasNecessarias?.lojasM || 0) * ((dados?.lojasM?.preçoConstrução || 0) + (dados?.lojasM?.quantidadeNecTerreno || 0) * (dados?.terrenos?.preçoConstrução || 0)) +
        (edificio?.lojasNecessarias?.lojasG || 0) * ((dados?.lojasG?.preçoConstrução || 0) + (dados?.lojasG?.quantidadeNecTerreno || 0) * (dados?.terrenos?.preçoConstrução || 0));

      let custoRecursos = 0;
      if (Array.isArray(edificio?.recursoDeConstrução)) {
        edificio.recursoDeConstrução.forEach((nome) => {
          custoRecursos += calcularCustoRecurso(nome);
        });
      }

      const custoConstrucao = (custoBase + custoRecursos + (edificio?.custoConstrucao || 0)) * quantidade;

      faturamentoTotal += fatuMensal;
      despesasTotal += despesasMensais;
      custoTotalConstrucao += custoConstrucao;

      detalhes.push({
        nome: edificio.nomeEditável || edificio.nome,
        setor,
        quantidade,
        faturamento: fatuMensal,
        despesas: despesasMensais,
        lucro: lucroMensal,
        roi: roi,
        redCusto: redCusto,
        aumFatu: aumFatu,
        estadoEconomia,
        fatorEconomico,
        custoConstrucao
      });
    });

    const lucroLiquido = faturamentoTotal - despesasTotal;
    const roiTotal = custoTotalConstrucao > 0 ? (lucroLiquido / custoTotalConstrucao) * 100 : 0;
    const totalQuantidade = detalhes.reduce((acc, d) => acc + d.quantidade, 0);

    return {
      faturamento: faturamentoTotal,
      despesas: despesasTotal,
      lucroLiquido: lucroLiquido,
      roi: roiTotal,
      totalEdificios: cartasSelecionadas.length,
      totalQuantidade,
      totalRedCusto,
      totalAumFatu,
      detalhes
    };
  }, [cartasSelecionadas, dados, economiaSetores, mapaEdificios, calcularCustoRecurso]);

  const getCorROI = (roi) => {
    if (roi >= 20) return "#7aff9a";
    if (roi >= 10) return "#FFD700";
    if (roi >= 0) return "#FFA500";
    return "#ff4d4d";
  };

  const getCorLucro = (lucro) => {
    if (lucro > 0) return "#7aff9a";
    if (lucro === 0) return "#FFD700";
    return "#ff4d4d";
  };

  return (
    <div style={{
      padding: "16px 20px",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      overflow: "hidden",
    }}>
      {/* Título */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        paddingBottom: "8px",
        flexShrink: 0,
      }}>
        <h2 style={{
          color: "#fff",
          fontSize: "16px",
          fontWeight: 700,
          fontFamily: "'Rajdhani',sans-serif",
          letterSpacing: "0.05em",
        }}>
          📊 Simulação das Selecionadas
        </h2>
        <span style={{
          color: "rgba(255,255,255,0.4)",
          fontSize: "11px",
          fontWeight: 600,
        }}>
          {simulacao.totalEdificios} edifício{simulacao.totalEdificios !== 1 ? "s" : ""} · {simulacao.totalQuantidade} unidade{simulacao.totalQuantidade !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Cards de métricas principais */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "10px",
        flexShrink: 0,
      }}>
        {[
          { label: "Faturamento", value: formatarNumero(simulacao.faturamento), cor: "#34d399", icon: "📈" },
          { label: "Despesas", value: formatarNumero(simulacao.despesas), cor: "#f87171", icon: "📉" },
          { label: "Lucro Líquido", value: formatarNumero(simulacao.lucroLiquido), cor: getCorLucro(simulacao.lucroLiquido), icon: "💰" },
          { label: "ROI", value: `${simulacao.roi.toFixed(1)}%`, cor: getCorROI(simulacao.roi), icon: "🎯" },
        ].map(({ label, value, cor, icon }) => (
          <div key={label} style={{
            background: "rgba(0,0,0,0.3)",
            borderRadius: "10px",
            padding: "10px 12px",
            border: `1px solid ${cor}33`,
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}>
              <span style={{ fontSize: "14px" }}>{icon}</span>
              <span style={{
                fontSize: "9px",
                color: "rgba(255,255,255,0.5)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}>
                {label}
              </span>
            </div>
            <span style={{
              fontSize: "18px",
              fontWeight: 800,
              color: cor,
              fontFamily: "'Rajdhani',sans-serif",
              lineHeight: 1.2,
            }}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Resumo de Power-ups */}
      <div style={{
        display: "flex",
        gap: "16px",
        flexShrink: 0,
        background: "rgba(0,0,0,0.2)",
        borderRadius: "8px",
        padding: "8px 14px",
        border: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "14px" }}>⚡</span>
          <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)" }}>Power-ups:</span>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <span style={{
            fontSize: "10px",
            color: "#f87171",
            fontWeight: 600,
          }}>
            🔽 Redução Custo: {simulacao.totalRedCusto.toFixed(1)}%
          </span>
          <span style={{
            fontSize: "10px",
            color: "#34d399",
            fontWeight: 600,
          }}>
            🔼 Aumento Faturamento: {simulacao.totalAumFatu.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Detalhes por edifício */}
      {/* <div style={{
        flex: 1,
        overflowY: "auto",
        background: "rgba(0,0,0,0.2)",
        borderRadius: "10px",
        padding: "10px",
        minHeight: 0,
      }}>
        {simulacao.detalhes.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "6px",
          }}>
            {simulacao.detalhes.map((d, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: "8px",
                padding: "8px 10px",
                border: "1px solid rgba(255,255,255,0.05)",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                  <span style={{
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: 700,
                    fontFamily: "'Rajdhani',sans-serif",
                  }}>
                    {d.nome}
                  </span>
                  <span style={{
                    color: "rgba(255,255,255,0.3)",
                    fontSize: "9px",
                    fontWeight: 600,
                  }}>
                    x{d.quantidade}
                  </span>
                </div>
                <div style={{
                  display: "flex",
                  gap: "8px",
                  fontSize: "9px",
                  color: "rgba(255,255,255,0.5)",
                }}>
                  <span style={{ color: "#34d399" }}>+{formatarNumero(d.faturamento)}</span>
                  <span style={{ color: "#f87171" }}>-{formatarNumero(d.despesas)}</span>
                  <span style={{ color: getCorLucro(d.lucro) }}>
                    {d.lucro >= 0 ? "+" : ""}{formatarNumero(d.lucro)}
                  </span>
                  <span style={{ color: getCorROI(d.roi) }}>
                    {d.roi.toFixed(1)}%
                  </span>
                </div>
                <div style={{
                  display: "flex",
                  gap: "8px",
                  fontSize: "7px",
                  color: "rgba(255,255,255,0.2)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}>
                  <span>{d.setor}</span>
                  <span>·</span>
                  <span>{d.estadoEconomia} ({d.fatorEconomico}x)</span>
                  {(d.redCusto > 0 || d.aumFatu > 0) && (
                    <>
                      <span>·</span>
                      <span style={{ color: "#f87171" }}>-{d.redCusto.toFixed(0)}%</span>
                      <span style={{ color: "#34d399" }}>+{d.aumFatu.toFixed(0)}%</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "rgba(255,255,255,0.3)",
            gap: "8px",
          }}>
            <span style={{ fontSize: "32px" }}>📭</span>
            <span style={{ fontSize: "12px", fontWeight: 600 }}>
              Selecione edifícios para ver a simulação
            </span>
          </div>
        )}
      </div> */}

      {/* Rodapé com resumo */}
      {/* {simulacao.detalhes.length > 0 && (
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "8px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          fontSize: "9px",
          color: "rgba(255,255,255,0.3)",
          flexShrink: 0,
          flexWrap: "wrap",
          gap: "4px",
        }}>
          <span>Faturamento: {formatarNumero(simulacao.faturamento)}</span>
          <span>Despesas: {formatarNumero(simulacao.despesas)}</span>
          <span style={{ color: getCorLucro(simulacao.lucroLiquido) }}>
            Lucro: {formatarNumero(simulacao.lucroLiquido)}
          </span>
          <span style={{ color: getCorROI(simulacao.roi) }}>
            ROI: {simulacao.roi.toFixed(1)}%
          </span>
        </div>
      )} */}
    </div>
  );
}