import React, { useContext, useState, useMemo,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCentralStore, EDIFICIOS_FINAIS_DINAMICOS_INICIAL } from "../stores/useCentralStore";
import { EDIFICIOS_BASE_ESTATICOS, EDIFICIOS_FINAIS_ESTATICOS, LICENCAS_ESTATICAS } from "../stores/dadosEstáticos";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { Localizador } from "./localizador";
import DolarImg from "../../public/outrasImagens/simbolo-do-dolar.png";
import licencaImg from "../../public/outrasImagens/licença.png";
import upInterpriseAudio from "../../public/sounds/upInterpriseAudio.mp3";
import useSound from "use-sound";

const SETORES_INFO = [
  { id: "agricultura", cor1: "#003816", cor2: "#1A5E2A", cor3: "#0C9123", cor4: "#4CAF50" },
  { id: "tecnologia", cor1: "#A64B00", cor2: "#D45A00", cor3: "#FF6F00", cor4: "#FF8C42" },
  { id: "industria", cor1: "#1A1A1A", cor2: "#4D4D4D", cor3: "#808080", cor4: "#B3B3B3" },
  { id: "comercio", cor1: "#660000", cor2: "#A31919", cor3: "#E60000", cor4: "#FF4D4D" },
  { id: "imobiliario", cor1: "#000066", cor2: "#1A1A8C", cor3: "#3333CC", cor4: "#6666FF" },
  { id: "energia", cor1: "#665200", cor2: "#A37F19", cor3: "#E6B800", cor4: "#FFD966" },
];


const SETORES_IDS = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

export const LicenseModal = ({ setor, nomeLicença, index }) => {
  // ── Zustand ───────────────────────────────────────────────
  const edificiosFinais = useCentralStore((s) => s.edificiosFinais);
  const licençasStatus = useCentralStore((s) => s.licençasStatus);
  const edificioBase = useCentralStore((s) => s.edificiosBase);
  const atualizarLote = useCentralStore((s) => s.atualizarLote);
  const atualizarEdificio = useCentralStore((s) => s.atualizarEdificio);
  const atualizarLicença = useCentralStore((s) => s.atualizarLicença);
  // ── Economy Context (inalterado) ──────────────────────────
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);
const garantirEstruturaSetor = useCentralStore((s) => s.garantirEstruturaSetor)

  const [buttonUpInterpriseAudio] = useSound(upInterpriseAudio);
  const [unlockAnim, setUnlockAnim] = useState(false);

  const setorInfo = SETORES_INFO.find((s) => s.id === setor);

  // Licença — estático para desc/valor/edifíciosLiberados, dinâmico para status
  const licencaEstatica = LICENCAS_ESTATICAS[setor]?.[index];
  const jaComprado = licençasStatus[setor]?.[index]?.status === true;
  const podeComprar = economiaSetores.saldo >= (licencaEstatica?.valor ?? 0);
  const qtdCards = licencaEstatica?.edifíciosLiberados?.length ?? 0;

  const formatarNumero = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(1).replace(".0", "") + "T";
    if (num >= 1e9) return (num / 1e9).toFixed(1).replace(".0", "") + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(1).replace(".0", "") + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1).replace(".0", "") + "K";
    return String(num);
  };

  const getImageUrl = (nome) => `/imagens/${nome}.png`;

  // ── comprarLicença — grava no Zustand ────────────────────
  const comprarLicença = () => {
    
    if (jaComprado || !podeComprar || !licencaEstatica) return;
    buttonUpInterpriseAudio();
    setUnlockAnim(true);
    setTimeout(() => setUnlockAnim(false), 1200);


    console.log("tamanho dinâmico agricultura:", EDIFICIOS_FINAIS_DINAMICOS_INICIAL["agricultura"]?.edificios?.length);
    console.log("tamanho estático agricultura:", EDIFICIOS_FINAIS_ESTATICOS["agricultura"]?.edificios?.length);
    // 1. Marca a licença como comprada
    atualizarLicença(setor, Number(index), true);

    // 2. Libera cada edifício pelo índice correto
    (licencaEstatica.edifíciosLiberados || []).forEach((nomeEd) => {
      const idx = EDIFICIOS_FINAIS_ESTATICOS[setor]?.edificios?.findIndex(
        (e) => e.nome === nomeEd
      ) ?? -1;
      if (idx === -1) return;

      // ✅ Verifica se o índice existe no array dinâmico antes de gravar
      const existeNoDinamico = !!edificiosFinais[setor]?.edificios?.[idx];
      if (!existeNoDinamico) {
        console.warn(`⚠️ Índice ${idx} (${nomeEd}) não existe no array dinâmico de ${setor}`);
        return;
      }
console.group(`🔑 comprarLicença [${setor}] - ${nomeLicença}`)
console.log('edifíciosLiberados:', licencaEstatica.edifíciosLiberados)
licencaEstatica.edifíciosLiberados.forEach((nomeEd) => {
    const idx = EDIFICIOS_FINAIS_ESTATICOS[setor]?.edificios?.findIndex(e => e.nome === nomeEd) ?? -1
    const existeNoDinamico = !!edificiosFinais[setor]?.edificios?.[idx]
    console.log(`  "${nomeEd}" → idx estático: ${idx} | existe no dinâmico: ${existeNoDinamico}`)
    if (idx !== -1 && !existeNoDinamico) {
        console.warn(`  ⚠️ MISMATCH: índice ${idx} existe no estático mas não no dinâmico`)
        console.log(`  tamanho dinâmico atual:`, edificiosFinais[setor]?.edificios?.length)
        console.log(`  tamanho estático:`, EDIFICIOS_FINAIS_ESTATICOS[setor]?.edificios?.length)
    }
})
console.groupEnd()
      atualizarEdificio(setor, idx, { licençaLiberado: { liberado: true } });
    });
    // 3. Desconta o saldo
    atualizarEco("saldo", economiaSetores.saldo - licencaEstatica.valor);
  };

  useEffect(() => {
    garantirEstruturaSetor(setor)
}, [setor])

  // ── HELPERS de custo (usa estáticos + dinâmico de quantidade) ──
  const tPC = EDIFICIOS_BASE_ESTATICOS.terrenos.preçoConstrução;
  const pPC = EDIFICIOS_BASE_ESTATICOS.lojasP.preçoConstrução;
  const mPC = EDIFICIOS_BASE_ESTATICOS.lojasM.preçoConstrução;
  const gPC = EDIFICIOS_BASE_ESTATICOS.lojasG.preçoConstrução;
  const tQNT = EDIFICIOS_BASE_ESTATICOS.lojasP.quantidadeNecTerreno;
  const mQNT = EDIFICIOS_BASE_ESTATICOS.lojasM.quantidadeNecTerreno;
  const gQNT = EDIFICIOS_BASE_ESTATICOS.lojasG.quantidadeNecTerreno;

  const encontrarEdificioEstatico = (nome) => {
    for (const s of SETORES_IDS) {
      const idx = EDIFICIOS_FINAIS_ESTATICOS[s]?.edificios?.findIndex((e) => e.nome === nome) ?? -1;
      if (idx !== -1) return { ed: EDIFICIOS_FINAIS_ESTATICOS[s].edificios[idx], setor: s, idx };
    }
    return null;
  };

  const getQuantidade = (nome) => {
    for (const s of SETORES_IDS) {
      const idx = EDIFICIOS_FINAIS_ESTATICOS[s]?.edificios?.findIndex((e) => e.nome === nome) ?? -1;
      if (idx !== -1) return edificiosFinais[s]?.edificios?.[idx]?.quantidade ?? 0;
    }
    return 0;
  };

  const custoLojas = (ed) => {
    const tN = ed.lojasNecessarias?.terrenos || 0;
    const pN = ed.lojasNecessarias?.lojasP || 0;
    const mN = ed.lojasNecessarias?.lojasM || 0;
    const gN = ed.lojasNecessarias?.lojasG || 0;
    return (
      tN * tPC +
      pN * (pPC + tQNT * tPC) +
      mN * (mPC + mQNT * tPC) +
      gN * (gPC + gQNT * tPC)
    );
  };

  const custoRecursoRec = (nomeRecurso, visited = new Set()) => {
    if (visited.has(nomeRecurso)) return 0;
    visited.add(nomeRecurso);
    const found = encontrarEdificioEstatico(nomeRecurso);
    if (!found) return 0;
    const { ed } = found;
    let total = (ed.custoConstrucao || 0) + custoLojas(ed);
    (ed.recursoDeConstrução || []).forEach((sub) => { total += custoRecursoRec(sub, visited); });
    return total;
  };

  const encontrarLicencaDoEdificio = (nomeEd, setorEd) => {
    const licencas = LICENCAS_ESTATICAS[setorEd] || [];
    for (let i = 0; i < licencas.length; i++) {
      const lic = licencas[i];
      if (lic.edifíciosLiberados?.includes(nomeEd)) {
        const statusDin = licençasStatus[setorEd]?.[i]?.status ?? false;
        return { licencaNome: lic.nome || `Licença ${i + 1}`, valor: lic.valor || 0, status: statusDin, setorLicenca: setorEd };
      }
    }
    return null;
  };

  // ── ANÁLISE DE CUSTO POR EDIFÍCIO ─────────────────────────
  // Deps: quantidade dos edifícios (dinâmico) + saldo
  const analiseEdificios = useMemo(() => {
    return (licencaEstatica?.edifíciosLiberados || []).map((nomeEd) => {
      const found = encontrarEdificioEstatico(nomeEd);
      if (!found) return { nome: nomeEd, custoTotal: 0, licencasFaltando: [], podePagar: false, jaTemEdificio: false };

      const { ed, setor: setorEd } = found;
      const qtd = getQuantidade(nomeEd);
      if (qtd > 0) return { nome: nomeEd, custoTotal: 0, licencasFaltando: [], podePagar: true, jaTemEdificio: true };

      let custoTotal = ed.custoConstrucao || 0;
      const licencasFaltando = [];

      const adicionarLicenca = (nomeReq, setorReq) => {
        const edReq = encontrarEdificioEstatico(nomeReq);
        if (!edReq) return;
        const liberado =
          edificiosFinais[setorReq]?.edificios?.[edReq.idx]?.licençaLiberado?.liberado ?? true; if (!liberado) {
            const lic = encontrarLicencaDoEdificio(nomeReq, setorReq);
            if (lic && !lic.status) {
              const jaAdicionada = licencasFaltando.find(
                (l) => l.licencaNome === lic.licencaNome && l.setorLicenca === lic.setorLicenca
              );
              if (!jaAdicionada) licencasFaltando.push(lic);
            }
          }
      };

      // Imóveis base — só o que falta
      const tFalta = Math.max(0, (ed.lojasNecessarias?.terrenos || 0) - edificioBase.terrenos.quantidade);
      const pFalta = Math.max(0, (ed.lojasNecessarias?.lojasP || 0) - edificioBase.lojasP.quantidade);
      const mFalta = Math.max(0, (ed.lojasNecessarias?.lojasM || 0) - edificioBase.lojasM.quantidade);
      const gFalta = Math.max(0, (ed.lojasNecessarias?.lojasG || 0) - edificioBase.lojasG.quantidade);
      custoTotal +=
        tFalta * tPC +
        pFalta * (pPC + tQNT * tPC) +
        mFalta * (mPC + mQNT * tPC) +
        gFalta * (gPC + gQNT * tPC);

      // Recursos de construção faltando
      (ed.recursoDeConstrução || []).forEach((nomeRec) => {
        const foundRec = encontrarEdificioEstatico(nomeRec);
        if (!foundRec) return;
        if (getQuantidade(nomeRec) === 0) {
          custoTotal += custoRecursoRec(nomeRec);
          adicionarLicenca(nomeRec, foundRec.setor);
        }
      });

      // Construções necessárias (posse) faltando
      (ed.construçõesNecessárias || []).forEach((nomeNec) => {
        const foundNec = encontrarEdificioEstatico(nomeNec);
        if (!foundNec) return;
        if (getQuantidade(nomeNec) === 0) {
          custoTotal += (foundNec.ed.custoConstrucao || 0) + custoLojas(foundNec.ed);
          adicionarLicenca(nomeNec, foundNec.setor);
        }
      });

      const custoLicencas = licencasFaltando.reduce((acc, l) => acc + l.valor, 0);
      custoTotal += custoLicencas;

      return {
        nome: nomeEd,
        custoTotal,
        licencasFaltando,
        podePagar: economiaSetores.saldo >= custoTotal,
        jaTemEdificio: false,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    edificiosFinais,
    licençasStatus,
    edificioBase.terrenos.quantidade,
    edificioBase.lojasP.quantidade,
    edificioBase.lojasM.quantidade,
    edificioBase.lojasG.quantidade,
    economiaSetores.saldo,
  ]);

  // ── PAINEL DE CUSTO ───────────────────────────────────────
  const PainelCusto = ({ analise }) => {
    if (analise.jaTemEdificio) {
      return (
        <div style={{ marginTop: 6, borderRadius: 10, padding: "5px 8px", background: "rgba(122,255,154,.08)", border: "1px solid rgba(122,255,154,.2)", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
          <span style={{ fontSize: 10 }}>✅</span>
          <span style={{ fontSize: 9, fontWeight: 700, color: "#7aff9a", letterSpacing: ".06em", textTransform: "uppercase" }}>Já possui</span>
        </div>
      );
    }
    return (
      <div style={{ marginTop: 6, borderRadius: 10, overflow: "hidden", border: `1px solid ${analise.podePagar ? setorInfo.cor3 + "55" : "rgba(255,96,96,.3)"}`, background: "rgba(0,0,0,.35)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 8px", background: analise.podePagar ? `${setorInfo.cor3}18` : "rgba(255,96,96,.08)", borderBottom: analise.licencasFaltando.length > 0 ? "1px solid rgba(255,255,255,.06)" : "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <img src={DolarImg} style={{ height: 10, opacity: 0.7 }} alt="" />
            <span style={{ fontSize: 8.5, fontWeight: 700, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".08em" }}>Investimento</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: analise.podePagar ? "#7aff9a" : "#ff6060", boxShadow: `0 0 4px ${analise.podePagar ? "#7aff9a" : "#ff6060"}` }} />
            <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 13, fontWeight: 800, color: analise.podePagar ? "#7aff9a" : "#ff9090" }}>{formatarNumero(analise.custoTotal)}</span>
          </div>
        </div>
        {analise.licencasFaltando.length > 0 && (
          <div style={{ padding: "4px 6px", display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 1 }}>
              <img src={licencaImg} style={{ height: 9, opacity: 0.6 }} alt="" />
              <span style={{ fontSize: 7.5, fontWeight: 700, color: "#FFD966AA", letterSpacing: ".1em", textTransform: "uppercase" }}>Licenças necessárias</span>
            </div>
            {analise.licencasFaltando.map((lic, li) => {
              const setorLicInfo = SETORES_INFO.find((s) => s.id === lic.setorLicenca);
              return (
                <div key={li} style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,217,102,.07)", borderRadius: 6, padding: "3px 6px", border: "1px solid rgba(255,217,102,.15)" }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, flexShrink: 0, background: setorLicInfo?.cor3 || "#FFD966", border: `1px solid ${setorLicInfo?.cor4 || "#FFD966"}55` }} />
                  <span style={{ fontSize: 8, color: "rgba(255,255,255,.6)", fontFamily: "'Rajdhani', sans-serif", flex: 1, lineHeight: 1.2 }}>
                    {lic.licencaNome}<br />
                    <span style={{ fontSize: 7, color: "rgba(255,255,255,.3)", textTransform: "uppercase", letterSpacing: ".05em" }}>{lic.setorLicenca}</span>
                  </span>
                  <span style={{ fontSize: 9, fontWeight: 700, color: "#FFD966", fontFamily: "'Rajdhani', sans-serif", flexShrink: 0 }}>{formatarNumero(lic.valor)}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // ── RENDER CARDS ──────────────────────────────────────────
  const renderCards = () => {
    const eds = licencaEstatica?.edifíciosLiberados || [];
    if (eds.length === 0) return null;

    const CardComPainel = ({ nome, animProps, style = {} }) => {
      const analise = analiseEdificios.find((a) => a.nome === nome);
      return (
        <motion.div {...animProps} style={{ display: "flex", flexDirection: "column", ...style }}>
          {Localizador(nome)}
          {analise && <PainelCusto analise={analise} />}
        </motion.div>
      );
    };

    if (eds.length === 1) return (
      <div className="flex justify-center items-start h-full">
        <CardComPainel nome={eds[0]} animProps={{ initial: { scale: 0.85, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { delay: 0.1, type: "spring", stiffness: 120 } }} style={{ transform: "scale(1.05)", transformOrigin: "top center" }} />
      </div>
    );

    if (eds.length === 2) return (
      <div className="flex justify-center items-start gap-4 h-full">
        {eds.map((nome, i) => (
          <CardComPainel key={nome} nome={nome} animProps={{ initial: { scale: 0.8, opacity: 0, x: i === 0 ? -20 : 20 }, animate: { scale: 1, opacity: 1, x: 0 }, transition: { delay: 0.1 + i * 0.08, type: "spring", stiffness: 120 } }} />
        ))}
      </div>
    );

    if (eds.length === 3) return (
      <div className="flex justify-center items-start gap-3 h-full">
        {eds.map((nome, i) => (
          <CardComPainel key={nome} nome={nome} animProps={{ initial: { scale: 0.75, opacity: 0, y: 20 }, animate: { scale: 1, opacity: 1, y: 0 }, transition: { delay: 0.08 + i * 0.07, type: "spring", stiffness: 120 } }} style={{ transform: "scale(0.92)", transformOrigin: "top center" }} />
        ))}
      </div>
    );

    return (
      <div className="flex items-start gap-4 h-full overflow-x-auto pb-1 scrollbar-custom" style={{ scrollbarWidth: "thin" }}>
        {eds.map((nome, i) => (
          <CardComPainel key={nome} nome={nome} animProps={{ initial: { scale: 0.7, opacity: 0, y: 16 }, animate: { scale: 1, opacity: 1, y: 0 }, transition: { delay: 0.06 + i * 0.06, type: "spring", stiffness: 110 } }} style={{ transform: "scale(0.85)", transformOrigin: "top center", flexShrink: 0 }} />
        ))}
      </div>
    );
  };

  // ── RENDER ────────────────────────────────────────────────
  return (
    <div className="w-full pb-[24px]">
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }}
        style={{
          background: jaComprado
            ? `linear-gradient(135deg, ${setorInfo.cor1}CC 0%, ${setorInfo.cor2}99 50%, ${setorInfo.cor1}CC 100%)`
            : `linear-gradient(135deg, ${setorInfo.cor1} 0%, ${setorInfo.cor2} 40%, ${setorInfo.cor3}55 100%)`,
          border: jaComprado ? `1.5px solid ${setorInfo.cor3}66` : `1.5px solid ${setorInfo.cor4}44`,
          borderRadius: 20, overflow: "hidden",
          boxShadow: jaComprado ? `0 4px 24px ${setorInfo.cor1}88` : `0 8px 32px ${setorInfo.cor1}99`,
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: 0, right: 0, width: 300, height: 300, background: `radial-gradient(circle, ${setorInfo.cor4}18 0%, transparent 70%)`, pointerEvents: "none" }} />

        {/* HEADER */}
        <div style={{ background: `linear-gradient(90deg, ${setorInfo.cor1} 0%, ${setorInfo.cor2} 100%)`, borderBottom: `1px solid ${setorInfo.cor3}44`, padding: "12px 16px", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, flexShrink: 0, background: `linear-gradient(135deg, ${setorInfo.cor3} 0%, ${setorInfo.cor1} 100%)`, border: `2px solid ${setorInfo.cor4}55`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 16px ${setorInfo.cor4}44` }}>
            <img src={getImageUrl(nomeLicença)} alt="" style={{ width: "65%", height: "65%", objectFit: "contain" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 800, fontFamily: "'Rajdhani', sans-serif", letterSpacing: ".04em", textTransform: "uppercase" }}>{nomeLicença}</h2>
              <span style={{ background: jaComprado ? setorInfo.cor3 : setorInfo.cor4, color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 9px", borderRadius: 20, letterSpacing: ".08em", textTransform: "uppercase" }}>
                {jaComprado ? "✓ Desbloqueado" : `${qtdCards} edifício${qtdCards !== 1 ? "s" : ""}`}
              </span>
            </div>
            <p style={{ color: `${setorInfo.cor4}CC`, fontSize: 11, fontFamily: "'Rajdhani', sans-serif", letterSpacing: ".06em", marginTop: 2 }}>
              {jaComprado ? "Todos os edifícios desta licença estão ativos" : "Compre para desbloquear os edifícios abaixo"}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(0,0,0,.25)", borderRadius: 8, padding: "4px 10px" }}>
              <img src={DolarImg} style={{ height: 14 }} alt="" />
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 15, fontWeight: 700, color: jaComprado ? setorInfo.cor4 : podeComprar ? "#fff" : "#ff9090" }}>
                {jaComprado ? "Pago" : formatarNumero(licencaEstatica?.valor ?? 0)}
              </span>
            </div>
            <button onClick={comprarLicença} disabled={jaComprado || !podeComprar}
              style={{ padding: "7px 20px", borderRadius: 10, border: "none", fontFamily: "'Rajdhani', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", cursor: jaComprado || !podeComprar ? "not-allowed" : "pointer", background: jaComprado ? `${setorInfo.cor3}88` : podeComprar ? `linear-gradient(135deg, ${setorInfo.cor3}, ${setorInfo.cor4})` : "rgba(255,255,255,.1)", color: jaComprado ? setorInfo.cor4 : podeComprar ? "#fff" : "rgba(255,255,255,.3)", transition: "all .2s", opacity: !podeComprar && !jaComprado ? 0.5 : 1 }}>
              {jaComprado ? "✓ Comprado" : podeComprar ? "Comprar licença" : "Saldo insuficiente"}
            </button>
          </div>
        </div>

        {/* CORPO */}
        <div style={{ display: "flex", minHeight: 0 }}>
          {/* ÁREA DAS CARTAS */}
          <div style={{ flex: "0 0 75%", padding: "18px 16px", position: "relative", minHeight: qtdCards <= 2 ? 440 : qtdCards <= 3 ? 420 : 440 }}>
            {!jaComprado && <div style={{ position: "absolute", inset: 0, zIndex: 2, background: `linear-gradient(180deg, transparent 0%, ${setorInfo.cor1}22 100%)`, borderRadius: "0 0 0 20px", pointerEvents: "none" }} />}
            {!jaComprado && (
              <div style={{ position: "absolute", top: 10, left: 12, background: "rgba(0,0,0,.55)", backdropFilter: "blur(2px)", borderRadius: 8, padding: "3px 10px", display: "flex", alignItems: "center", gap: 5, zIndex: 10 }}>
                <span style={{ fontSize: 12 }}>🔒</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,.6)", letterSpacing: ".1em", textTransform: "uppercase" }}>Bloqueado</span>
              </div>
            )}
            {jaComprado && (
              <div style={{ position: "absolute", top: 10, left: 12, background: `${setorInfo.cor3}CC`, borderRadius: 8, padding: "3px 10px", display: "flex", alignItems: "center", gap: 5, zIndex: 10 }}>
                <span style={{ fontSize: 12 }}>🔓</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", letterSpacing: ".1em", textTransform: "uppercase" }}>Desbloqueado</span>
              </div>
            )}
            <div style={{ height: "100%", paddingTop: 36, filter: jaComprado ? "none" : "brightness(0.65) saturate(0.7)", transition: "filter .4s ease" }}>
              {renderCards()}
            </div>
            <AnimatePresence>
              {unlockAnim && (
                <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.4 }} transition={{ duration: 0.5 }}
                  style={{ position: "absolute", inset: 0, zIndex: 20, display: "flex", alignItems: "center", justifyContent: "center", background: `radial-gradient(circle, ${setorInfo.cor4}66 0%, transparent 70%)`, pointerEvents: "none", borderRadius: "0 0 0 20px" }}>
                  <span style={{ fontSize: 64 }}>🔓</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ÁREA DA DESCRIÇÃO */}
          <div style={{ flex: "0 0 25%", background: `linear-gradient(180deg, ${setorInfo.cor1}CC 0%, ${setorInfo.cor1} 100%)`, borderLeft: `1px solid ${setorInfo.cor3}33`, padding: "16px 14px", display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}>
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: `${setorInfo.cor4}99`, marginBottom: 8 }}>Sobre esta licença</div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,.75)", lineHeight: 1.65, fontFamily: "'Rajdhani', sans-serif" }}>{licencaEstatica?.desc}</p>
            </div>
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: `${setorInfo.cor4}99`, marginBottom: 8 }}>Edifícios desbloqueados</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {(licencaEstatica?.edifíciosLiberados || []).map((nome) => (
                  <div key={nome} style={{ display: "flex", alignItems: "center", gap: 7, background: jaComprado ? `${setorInfo.cor3}33` : "rgba(255,255,255,.06)", borderRadius: 7, padding: "5px 8px", border: `1px solid ${jaComprado ? setorInfo.cor3 + "55" : "rgba(255,255,255,.08)"}` }}>
                    <img src={getImageUrl(nome)} alt="" style={{ width: 20, height: 20, objectFit: "contain", opacity: jaComprado ? 1 : 0.5 }} />
                    <span style={{ fontSize: 10, fontWeight: 600, color: jaComprado ? "#fff" : "rgba(255,255,255,.45)", fontFamily: "'Rajdhani', sans-serif" }}>{nome}</span>
                    {jaComprado
                      ? <span style={{ marginLeft: "auto", fontSize: 10, color: setorInfo.cor4 }}>✓</span>
                      : <span style={{ marginLeft: "auto", fontSize: 9, color: "rgba(255,255,255,.25)" }}>🔒</span>}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "rgba(0,0,0,.3)", borderRadius: 10, padding: "10px 12px", border: `1px solid ${setorInfo.cor3}33`, marginTop: "auto" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,.4)", letterSpacing: ".1em", textTransform: "uppercase" }}>Valor</span>
                <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 18, fontWeight: 800, color: jaComprado ? setorInfo.cor4 : podeComprar ? "#fff" : "#ff9090" }}>
                  {jaComprado ? "—" : formatarNumero(licencaEstatica?.valor ?? 0)}
                </span>
              </div>
              <button onClick={comprarLicença} disabled={jaComprado || !podeComprar}
                style={{ width: "100%", padding: "8px 0", borderRadius: 8, border: "none", fontFamily: "'Rajdhani', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", cursor: jaComprado || !podeComprar ? "not-allowed" : "pointer", background: jaComprado ? "rgba(255,255,255,.1)" : podeComprar ? `linear-gradient(135deg, ${setorInfo.cor3}, ${setorInfo.cor4})` : "rgba(255,255,255,.06)", color: jaComprado ? "rgba(255,255,255,.4)" : podeComprar ? "#fff" : "rgba(255,255,255,.25)", transition: "all .2s" }}>
                {jaComprado ? "✓ Já adquirida" : podeComprar ? "🔓 Desbloquear" : "Saldo insuficiente"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function getBotaoCompraLicenStyle({ status, podeComprar }) {
  if (status) return { backgroundColor: "#fff", color: "#6411D9", border: "2px solid #6411D9", borderRadius: "8px", fontWeight: 600, cursor: "default", opacity: 1 };
  return { backgroundColor: "#6411D9", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, cursor: podeComprar ? "pointer" : "not-allowed", opacity: podeComprar ? 1 : 0.4 };
}