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

// ─── FUNÇÃO PARA CRIAR MAPA DE EDIFÍCIOS ──────────────────────
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

// ─── FUNÇÃO PARA CALCULAR CUSTO DE RECURSOS ──────────────────
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

// ─── FUNÇÃO DE CÁLCULO DE ROI ─────────────────────────────────
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

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────
export default function DisplayInformations() {
  const { dados } = useContext(CentraldeDadosContext);
  const { economiaSetores } = useContext(DadosEconomyGlobalContext);

  const cartasSelecionadas = dados.cartasSelecionadas || [];

  const mapaEdificios = useMemo(() => criarMapaEdificios(dados), [dados]);
  const calcularCustoRecurso = useMemo(
    () => criarCalculadoraCustoRecurso(mapaEdificios, dados),
    [mapaEdificios, dados]
  );

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
      
      const estadoEconomia = economiaSetores[setor]?.economiaSetor?.estadoAtual || "estável";
      const roi = calcROI(edificio, dados, estadoEconomia, mapaEdificios, calcularCustoRecurso);

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
    <div className="h-full w-full bg-[#1a0a3b] overflow-hidden flex flex-col">
      {/* ─── HEADER ────────────────────────────────────────────── */}
            <div style={{background: 'linear-gradient(to bottom, #6411D9, #350973)',}} className="p-4 border-b bg- border-white/10 flex-shrink-0">
        <div className="flex items-center justify-between">
                    <h2 className="text-white font-bold text-lg flex items-center gap-2">
            <span>📊</span> Simulação das Selecionadas
          </h2>
        </div>
      </div>

      {/* ─── CARDS DE MÉTRICAS (2 COLUNAS x 2 LINHAS) ────────── */}
      <div className="p-3 grid grid-cols-2 gap-2 flex-shrink-0">
        {[
          { label: "Faturamento", value: formatarNumero(simulacao.faturamento), cor: "#34d399", icon: "📈" },
          { label: "Despesas", value: formatarNumero(simulacao.despesas), cor: "#f87171", icon: "📉" },
          { label: "Lucro Líquido", value: formatarNumero(simulacao.lucroLiquido), cor: getCorLucro(simulacao.lucroLiquido), icon: "💰" },
          { label: "ROI", value: `${simulacao.roi.toFixed(1)}%`, cor: getCorROI(simulacao.roi), icon: "🎯" },
        ].map(({ label, value, cor, icon }) => (
          <div key={label} className="bg-white/5 p-2.5 border border-white/5 transition-all hover:scale-[1.02] hover:border-white/10">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-xs">{icon}</span>
              <span className="text-[8px] text-white/40 font-medium uppercase tracking-wider">
                {label}
              </span>
            </div>
            <span className="text-sm font-bold" style={{ color: cor }}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* ─── POWER-UPS ──────────────────────────────────────────── */}
      <div className="px-3 pb-1.5 flex-shrink-0">
        <div className="bg-white/5 p-2 border border-white/5 flex items-center gap-3 flex-wrap">
          <span className="text-xs">⚡</span>
          <span className="text-[8px] text-white/40 font-medium uppercase tracking-wider">Power-ups:</span>
          <div className="flex gap-3 flex-wrap">
            <span className="text-[8px] text-[#f87171] font-semibold">
              🔽 Redução Custo: {simulacao.totalRedCusto.toFixed(1)}%
            </span>
            <span className="text-[8px] text-[#34d399] font-semibold">
              🔼 Aumento Faturamento: {simulacao.totalAumFatu.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* ─── LISTA DE EDIFÍCIOS ────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-3 pt-1.5 space-y-1.5 scrollbar-custom">
        {simulacao.detalhes.length > 0 ? (
          simulacao.detalhes.map((d, i) => (
            <div key={i} className="bg-white/5 p-2 border border-white/5 transition-all hover:bg-white/10">
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-white text-xs font-bold">{d.nome}</span>
                  <span className="text-white/30 text-[8px] font-medium">x{d.quantidade}</span>
                </div>
                <span className="text-white/20 text-[8px] uppercase font-medium">{d.setor}</span>
              </div>
              
              <div className="flex items-center gap-2 text-[8px] flex-wrap">
                <span className="text-[#34d399] font-medium">+{formatarNumero(d.faturamento)}</span>
                <span className="text-[#f87171] font-medium">-{formatarNumero(d.despesas)}</span>
                <span className="font-medium" style={{ color: getCorLucro(d.lucro) }}>
                  {d.lucro >= 0 ? "+" : ""}{formatarNumero(d.lucro)}
                </span>
                <span className="font-medium" style={{ color: getCorROI(d.roi) }}>
                  {d.roi.toFixed(1)}%
                </span>
                <span className="text-white/20 text-[7px] uppercase">
                  {d.estadoEconomia} ({d.fatorEconomico}x)
                </span>
                {(d.redCusto > 0 || d.aumFatu > 0) && (
                  <>
                    <span className="text-[#f87171] text-[7px]">-{d.redCusto.toFixed(0)}%</span>
                    <span className="text-[#34d399] text-[7px]">+{d.aumFatu.toFixed(0)}%</span>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-white/30 gap-2">
          </div>
        )}
      </div>

      {/* ─── FOOTER ────────────────────────────────────────────── */}
      {simulacao.detalhes.length > 0 && (
        <div className="p-2 border-t border-white/5 flex-shrink-0 bg-white/5">
          <div className="flex items-center justify-between text-[8px] text-white/30 flex-wrap gap-1">
            <span>Faturamento: {formatarNumero(simulacao.faturamento)}</span>
            <span>Despesas: {formatarNumero(simulacao.despesas)}</span>
            <span style={{ color: getCorLucro(simulacao.lucroLiquido) }}>
              Lucro: {formatarNumero(simulacao.lucroLiquido)}
            </span>
            <span style={{ color: getCorROI(simulacao.roi) }}>
              ROI: {simulacao.roi.toFixed(1)}%
            </span>
          </div>
        </div>
      )}

      <style>{`
        .scrollbar-custom::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 10px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.3);
        }
      `}</style>
    </div>
  );
}