import React, { useContext, useEffect, useMemo } from "react";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import patrimônio from "../../public/imagens/patrimônio.png";
import useSound from "use-sound";
import audioCoin from "../../public/sounds/cash-register-kaching-376867.mp3";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useCentralStore } from "../stores/useCentralStore";
import { EDIFICIOS_FINAIS_ESTATICOS } from "../stores/dadosEstáticos";

const SETORES_ARR = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

// ─── Nomes canônicos dos edifícios base (terreno/lojas) ──────────────────
// ⚠️ AJUSTE estes nomes para os nomes EXATOS usados em EDIFICIOS_FINAIS_ESTATICOS
const NOMES_BASE = {
  terrenos: ["Terreno", "Terrenos", "terreno", "terrenos"],
  lojasP: ["Loja Pequena", "Loja Pequena ", "lojaPequena", "lojasP", "Loja P"],
  lojasM: ["Loja Média", "Loja Media", "lojaMedia", "lojasM", "Loja M"],
  lojasG: ["Loja Grande", "lojaGrande", "lojasG", "Loja G"],
};

// ─── Fallback (só usado se NADA for encontrado em nenhuma fonte) ─────────
// ✅ CORREÇÃO: fallback agora é o ÚLTIMO recurso, não o primeiro
const PRECO_FALLBACK = {
  terrenos: 40000,
  lojasP: 90000,
  lojasM: 180000,
  lojasG: 360000,
};

// ─── Busca preço de um edifício base em múltiplas fontes ──────────────────
/**
 * Ordem de precedência:
 * 1. edificiosBase do Zustand (preço real, pode mudar com o tempo)
 * 2. EDIFICIOS_FINAIS_ESTATICOS (fonte estática)
 * 3. PRECO_FALLBACK (último recurso)
 */
function buscarPrecoBase(chave, edificiosBase) {
  const campos = [
    "preçoConstrução",
    "precoConstrucao",
    "preçoConstrucao",
    "precoConstrução",
    "preco",
    "preço",
    "custo",
    "custoConstrucao",
    "custoConstrução",
    "valor",
  ];

  const extrairDe = (obj) => {
    if (!obj || typeof obj !== "object") return undefined;
    for (const campo of campos) {
      const v = obj[campo];
      if (Number.isFinite(v) && v > 0) return v;
    }
    return undefined;
  };

  // 1) edificiosBase do Zustand — tenta todas as variações de nome
  if (edificiosBase && typeof edificiosBase === "object") {
    for (const nome of NOMES_BASE[chave] || []) {
      const v = extrairDe(edificiosBase[nome]);
      if (v !== undefined) return v;
    }
    // varredura fuzzy (case/acento-insensitive) como último recurso do Zustand
    const alvo = (NOMES_BASE[chave] || []).map((n) => n.toLowerCase());
    for (const key of Object.keys(edificiosBase)) {
      const k = key.toLowerCase();
      if (alvo.some((a) => k.includes(a.split(" ")[0]))) {
        const v = extrairDe(edificiosBase[key]);
        if (v !== undefined) return v;
      }
    }
  }

  // 2) EDIFICIOS_FINAIS_ESTATICOS — varre todos os setores
  for (const setor of SETORES_ARR) {
    const edificios = EDIFICIOS_FINAIS_ESTATICOS?.[setor]?.edificios || [];
    for (const nome of NOMES_BASE[chave] || []) {
      const ed = edificios.find((e) => e?.nome === nome);
      if (ed) {
        const v = extrairDe(ed);
        if (v !== undefined) return v;
      }
    }
  }
  // varredura fuzzy nos estáticos
  const alvo = (NOMES_BASE[chave] || []).map((n) => n.toLowerCase());
  for (const setor of SETORES_ARR) {
    const edificios = EDIFICIOS_FINAIS_ESTATICOS?.[setor]?.edificios || [];
    for (const ed of edificios) {
      if (!ed?.nome) continue;
      const n = ed.nome.toLowerCase();
      if (alvo.some((a) => n === a || n.includes(a.split(" ")[0]))) {
        const v = extrairDe(ed);
        if (v !== undefined) return v;
      }
    }
  }

  // 3) fallback final
  return undefined;
}

// ─── Custo unitário de um edifício (com sub-recursos) ─────────────────────
function calcularCustoRecurso(nomeRecurso, precos, visited = new Set()) {
  if (visited.has(nomeRecurso)) return 0;
  visited.add(nomeRecurso);

  for (const s of SETORES_ARR) {
    const edEst = EDIFICIOS_FINAIS_ESTATICOS[s]?.edificios?.find(
      (e) => e.nome === nomeRecurso
    );
    if (!edEst) continue;

    let custo =
      edEst.custoConstrucao ??
      edEst.custo ??
      edEst.precoConstrucao ??
      edEst.valorConstrucao ??
      0;
    if (!Number.isFinite(custo)) custo = 0;

    const lN = edEst.lojasNecessarias || {};

    // ✅ CORREÇÃO: avisa se um preço necessário está zerado (mascara bug)
    if ((lN.terrenos || 0) > 0 && !(precos?.terrenos > 0)) {
      console.warn(
        `[calcularCustoRecurso] preço de TERRENO = 0 para "${nomeRecurso}" — usando fallback`
      );
    }
    if ((lN.lojasP || 0) > 0 && !(precos?.lojasP > 0)) {
      console.warn(
        `[calcularCustoRecurso] preço de LOJA P = 0 para "${nomeRecurso}" — usando fallback`
      );
    }
    if ((lN.lojasM || 0) > 0 && !(precos?.lojasM > 0)) {
      console.warn(
        `[calcularCustoRecurso] preço de LOJA M = 0 para "${nomeRecurso}" — usando fallback`
      );
    }
    if ((lN.lojasG || 0) > 0 && !(precos?.lojasG > 0)) {
      console.warn(
        `[calcularCustoRecurso] preço de LOJA G = 0 para "${nomeRecurso}" — usando fallback`
      );
    }

    custo += (lN.terrenos || 0) * (precos?.terrenos ?? 0);
    custo += (lN.lojasP || 0) * (precos?.lojasP ?? 0);
    custo += (lN.lojasM || 0) * (precos?.lojasM ?? 0);
    custo += (lN.lojasG || 0) * (precos?.lojasG ?? 0);

    if (!Number.isFinite(custo)) {
      console.error(`[TaxesYear] custo inválido para "${nomeRecurso}":`, custo);
      return 0;
    }

    (edEst.recursoDeConstrução || []).forEach((sub) => {
      const subCusto = calcularCustoRecurso(sub, precos, visited);
      if (Number.isFinite(subCusto)) custo += subCusto;
    });

    return custo;
  }

  // ✅ CORREÇÃO: avisa em vez de retornar 0 silenciosamente
  console.warn(
    `[calcularCustoRecurso] recurso "${nomeRecurso}" NÃO encontrado em EDIFICIOS_FINAIS_ESTATICOS`
  );
  return 0;
}

/**
 * Fonte primária: carteira.carteiraAtual (onde o jogo constrói de fato).
 * Fonte secundária: edificiosFinais do Zustand (compatibilidade).
 * Soma TODAS as quantidades do mesmo nome, mesmo se houver entradas duplicadas.
 */
function calcularPatrimonioSetor(setor, carteiraAtual, edificiosFinaisZustand, precos) {
  const setorIndex = SETORES_ARR.indexOf(setor);
  const edificiosDoSetor =
    setorIndex >= 0 && Array.isArray(carteiraAtual?.[setorIndex])
      ? carteiraAtual[setorIndex]
      : [];

  let total = 0;

  if (edificiosDoSetor.length > 0) {
    // ✅ agrupa por nome somando quantidade (lida com duplicatas)
    const porNome = new Map();
    edificiosDoSetor.forEach((ed) => {
      if (!ed?.nome) return;
      const atual = porNome.get(ed.nome) || { nome: ed.nome, quantidade: 0 };
      atual.quantidade += Number(ed.quantidade ?? 0);
      porNome.set(ed.nome, atual);
    });

    porNome.forEach(({ nome, quantidade }) => {
      if (quantidade <= 0) return;
      const custoUnit = calcularCustoRecurso(nome, precos);
      if (Number.isFinite(custoUnit)) total += custoUnit * quantidade;
    });

    if (total > 0) return total;
  }

  // Fallback: edificiosFinais
  const edificiosEst = EDIFICIOS_FINAIS_ESTATICOS[setor]?.edificios || [];
  const rawDin = edificiosFinaisZustand?.[setor];
  const edificiosDin = Array.isArray(rawDin) ? rawDin : rawDin?.edificios || [];

  edificiosEst.forEach((ed, idx) => {
    const qtd = edificiosDin[idx]?.quantidade ?? 0;
    if (qtd > 0) {
      const custoUnit = calcularCustoRecurso(ed.nome, precos);
      if (Number.isFinite(custoUnit)) total += custoUnit * qtd;
    }
  });

  return Number.isFinite(total) ? total : 0;
}

const tooltipStyle = {
  backgroundColor: "#1a053d",
  color: "#fff",
  borderRadius: "10px",
  border: "1px solid #FF8A00",
  padding: "10px",
  fontSize: "12px",
  zIndex: 200,
};

export function TaxesYear() {
  const dia = useCentralStore((s) => s.dia);
  const edificiosFinais = useCentralStore((s) => s.edificiosFinais);
  const edificiosBase = useCentralStore((s) => s.edificiosBase);

  const {
    economiaSetores,
    atualizarEcoProf,
    atualizarEcoSafely,
    atualizarEcoCallback,
  } = useContext(DadosEconomyGlobalContext);

  const [audioPay] = useSound(audioCoin);

  const proximoDia = (n) => (n % 360 === 0 ? 0 : 360 - (n % 360));

  // ✅ CORREÇÃO PRINCIPAL: buscar preços de várias fontes, com fallback só no fim
  const precos = useMemo(() => {
    const fonte = (chave) => {
      const v = buscarPrecoBase(chave, edificiosBase);
      if (Number.isFinite(v) && v > 0) return v;
      return PRECO_FALLBACK[chave];
    };
    return {
      terrenos: fonte("terrenos"),
      lojasP: fonte("lojasP"),
      lojasM: fonte("lojasM"),
      lojasG: fonte("lojasG"),
    };
  }, [edificiosBase]);

  // ✅ CORREÇÃO: log de diagnóstico para identificar de onde veio cada preço
  useEffect(() => {
    const origem = {};
    for (const chave of ["terrenos", "lojasP", "lojasM", "lojasG"]) {
      const v = buscarPrecoBase(chave, edificiosBase);
      origem[chave] =
        Number.isFinite(v) && v > 0
          ? `real(${v})`
          : `FALLBACK(${PRECO_FALLBACK[chave]})`;
    }
    console.log("[TaxesYear] fontes de preço:", origem);
    console.log("[TaxesYear] precos efetivos:", precos);
    console.log("[TaxesYear] edificiosBase keys:", edificiosBase ? Object.keys(edificiosBase) : null);
  }, [edificiosBase, precos]);

  const carteiraAtual = economiaSetores?.carteira?.carteiraAtual ?? [];

  // ✅ assinatura da carteira (agrupa por nome)
  const assinaturaCarteira = useMemo(() => {
    return JSON.stringify(
      carteiraAtual.map((arr) => {
        if (!Array.isArray(arr)) return [];
        const mapa = new Map();
        arr.forEach((e) => {
          if (!e?.nome) return;
          mapa.set(e.nome, (mapa.get(e.nome) || 0) + Number(e.quantidade ?? 0));
        });
        return [...mapa.entries()].sort();
      })
    );
  }, [carteiraAtual]);

  const assinaturaEdificios = useMemo(() => {
    const partes = [];
    for (const s of SETORES_ARR) {
      const raw = edificiosFinais?.[s];
      const arr = Array.isArray(raw) ? raw : raw?.edificios || [];
      partes.push(`${s}:${arr.map((e) => e.quantidade || 0).join(",")}`);
    }
    return partes.join("|");
  }, [edificiosFinais]);

  // ─── EFEITO 1: recalcular patrimônio (sempre) ───────────────────────────
  useEffect(() => {
    let patrimonioGlobal = 0;
    let setoresGravados = 0;

    SETORES_ARR.forEach((setor) => {
      const setorData = economiaSetores?.[setor]?.economiaSetor;
      if (!setorData) return;

      const patrimonioSetor = calcularPatrimonioSetor(
        setor,
        carteiraAtual,
        edificiosFinais,
        precos
      );

      if (!Number.isFinite(patrimonioSetor)) {
        console.error(
          `[TaxesYear] ${setor} retornou NaN/Infinity — pulando. carteira[${SETORES_ARR.indexOf(setor)}]:`,
          carteiraAtual?.[SETORES_ARR.indexOf(setor)]
        );
        return;
      }

      atualizarEcoSafely(setor, { patrimonio: patrimonioSetor });

      patrimonioGlobal += patrimonioSetor;
      setoresGravados++;
    });

    if (!Number.isFinite(patrimonioGlobal)) patrimonioGlobal = 0;

    atualizarEcoProf(["patrimonioGlobal"], patrimonioGlobal);
    atualizarEcoProf(["patrimonio"], patrimonioGlobal); // alias legado

    if (setoresGravados > 0) {
      console.log(
        `[TaxesYear] patrimônio recalculado — global: ${patrimonioGlobal} | setores: ${setoresGravados}`
      );
    }
  }, [assinaturaCarteira, assinaturaEdificios, dia, precos]);

  // ─── EFEITO 2: acúmulo mensal (a partir do dia 270) ─────────────────────
  useEffect(() => {
    if (dia < 270) return;
    if (dia % 30 !== 0) return;

    let impostoTotalMes = 0;

    SETORES_ARR.forEach((setor) => {
      const setorData = economiaSetores?.[setor]?.economiaSetor;
      if (!setorData) return;

      let patrimonioSetor = setorData.patrimonio;
      if (!Number.isFinite(patrimonioSetor) || patrimonioSetor <= 0) {
        patrimonioSetor = calcularPatrimonioSetor(
          setor,
          carteiraAtual,
          edificiosFinais,
          precos
        );
      }
      if (!Number.isFinite(patrimonioSetor) || patrimonioSetor <= 0) return;

      const perc = setorData.percImpostoAnualAtual;
      if (!Number.isFinite(perc) || perc <= 0) {
        console.warn(
          `[TaxesYear] percImpostoAnualAtual inválido em "${setor}":`,
          perc
        );
        return;
      }

      const valorImpostoMes = (patrimonioSetor * perc) / 12 / 100;
      const acumuladoAnterior =
        typeof setorData.valorImpostoAnualAtual === "number"
          ? setorData.valorImpostoAnualAtual
          : 0;
      const novoValorAcumulado = acumuladoAnterior + valorImpostoMes;

      atualizarEcoSafely(setor, {
        patrimonio: patrimonioSetor,
        valorImpostoAnualAtual: novoValorAcumulado,
        ultimoImpostoMensal: valorImpostoMes,
      });

      impostoTotalMes += valorImpostoMes;
    });

    if (impostoTotalMes > 0) {
      if (typeof atualizarEcoCallback === "function") {
        atualizarEcoCallback(
          "valorImpostoAnual",
          (atual) => (atual ?? 0) + impostoTotalMes
        );
      } else {
        atualizarEcoProf(
          ["valorImpostoAnual"],
          (economiaSetores?.valorImpostoAnual || 0) + impostoTotalMes
        );
      }
      console.log(
        `[TaxesYear] dia ${dia} — imposto do mês: ${impostoTotalMes.toFixed(2)}`
      );
    }

    if (dia % 360 === 0) {
      atualizarEcoProf(["despesasImpostoAnual"], {
        ...economiaSetores.despesasImpostoAnual,
        diaPagarImpostoAnual: true,
        impostoAnualPago: false,
        proximoPagamento: 0,
      });
    }
  }, [dia]);

  // ─── Pagamento ──────────────────────────────────────────────────────────
  const pagarImpostoAnual = () => {
    if (dia % 360 !== 0) return;

    const valor = economiaSetores?.valorImpostoAnual || 0;
    if (valor <= 0) return;
    if ((economiaSetores?.saldo || 0) < valor) {
      console.warn("[TaxesYear] Saldo insuficiente para pagar imposto anual");
      return;
    }

    atualizarEcoProf(["saldo"], economiaSetores.saldo - valor);
    audioPay();

    SETORES_ARR.forEach((setor) => {
      const setorData = economiaSetores?.[setor]?.economiaSetor;
      if (!setorData) return;
      atualizarEcoSafely(setor, {
        valorImpostoAnualAtual: 0,
        ultimoImpostoMensal: 0,
        arrValorImpostoAnualPorMes: [],
        RelatórioMensalImpostoAnual: {},
      });
    });

    atualizarEcoProf(["valorImpostoAnual"], 0);
    atualizarEcoProf(["despesasImpostoAnual"], {
      ...economiaSetores.despesasImpostoAnual,
      diaPagarImpostoAnual: false,
      impostoAnualPago: true,
      proximoPagamento: 360,
    });
  };

  const isPending =
    dia % 360 === 0 && !economiaSetores?.despesasImpostoAnual?.impostoAnualPago;
  const isNear = proximoDia(dia) <= 30 && !isPending;

  if (dia < 270) return null;

  return (
    <div
      className={`flex items-center justify-between w-full h-[54px] rounded-[12px] p-1 transition-all duration-500 ${
        isPending
          ? "bg-red-600/20 border border-red-500 animate-pulse"
          : "bg-[#350973]/40 border border-white/10"
      }`}
    >
      <div
        className="flex flex-col items-center justify-center flex-1"
        data-tooltip-id="tax-info"
        data-tooltip-content={
          isPending
            ? `IMPOSTO VENCIDO! R$ ${(economiaSetores?.valorImpostoAnual || 0).toLocaleString(
                "pt-BR",
                { maximumFractionDigits: 0 }
              )}`
            : `Próximo imposto em ${proximoDia(dia)} dias — acumulado: R$ ${(
                economiaSetores?.valorImpostoAnual || 0
              ).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`
        }
      >
        <h2
          className={`text-[20px] fonteBold leading-none ${
            isNear ? "text-laranja" : "text-white"
          }`}
        >
          {proximoDia(dia)}
        </h2>
      </div>

      <button
        onClick={pagarImpostoAnual}
        disabled={!isPending}
        data-tooltip-id="tax-action"
        data-tooltip-content={
          isPending
            ? `CLIQUE PARA PAGAR R$ ${(economiaSetores?.valorImpostoAnual || 0).toLocaleString(
                "pt-BR",
                { maximumFractionDigits: 0 }
              )}`
            : `Aguarde o fechamento do ano (${proximoDia(dia)} dias)`
        }
        className={`relative h-full aspect-square rounded-[10px] flex items-center justify-center transition-all ${
          isPending
            ? "bg-gradient-to-br from-red-500 to-red-700 shadow-[0_0_20px_rgba(239,68,68,0.4)] scale-105 cursor-pointer"
            : "bg-gray-500/50 grayscale opacity-50 cursor-not-allowed"
        }`}
      >
        <img src={patrimônio} className="w-6 h-6 object-contain" alt="tax" />
        <div className="absolute -top-1 -right-1">
          <span className="relative flex size-3">
            {(isPending || isNear) && (
              <>
                <span
                  className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                    isPending ? "bg-red-500" : "bg-laranja"
                  }`}
                />
                <span
                  className={`relative inline-flex size-3 rounded-full ${
                    isPending ? "bg-red-500" : "bg-laranja"
                  }`}
                />
              </>
            )}
          </span>
        </div>
      </button>

      <Tooltip id="tax-info" style={tooltipStyle} />
      <Tooltip id="tax-action" style={tooltipStyle} />
    </div>
  );
}