import React, { useEffect, useMemo, useCallback } from "react";
import { useContext, useState } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import porcem from "../../public/outrasImagens/simbolo-de-porcentagem.png";
import passive from "../../public/outrasImagens/rendaPassiva.png";
import terrenoImg from "../../public/outrasImagens/terreno.png";
import constNece from "../../public/outrasImagens/construção necessária.png";
import PróximoImg from "../../public/outrasImagens/proximo.png";
import ConstuirImg from "../../public/outrasImagens/martelo.png";
import licença from "../../public/outrasImagens/licença.png";
import agricultura from "../../public/outrasImagens/setores/agricultura.png";
import tecnologia from "../../public/outrasImagens/setores/tecnologia.png";
import comercio from "../../public/outrasImagens/setores/comercio.png";
import industria from "../../public/outrasImagens/setores/industria.png";
import imobiliario from "../../public/outrasImagens/setores/imobiliário.png";
import energia from "../../public/outrasImagens/setores/torre-eletrica.png";
import grafico from "../../public/outrasImagens/setores/grafico.png";
import DolarImg from "../../public/outrasImagens/simbolo-do-dolar.png";
import { motion } from "framer-motion";
import LojaPImg from "../../public/outrasImagens/lojaP.png";
import LojaMImg from "../../public/outrasImagens/lojaM.png";
import LojaGImg from "../../public/outrasImagens/lojaG.png";
import SelectorImage from "./selectorImage";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import LicenseNec from "./licenseNec";
import fechar from "../../public/outrasImagens/fechar.png";
import { Localizador } from "./localizador";
import { CardLocalization } from "./cardLocalization";
import imgLucro from "../../public/outrasImagens/imgLucroLiquido.png";
import imgFatuMensal from "../../public/outrasImagens/imgFaturamentoMensal.png";
import imgPercFatu from "../../public/outrasImagens/imgPercFaturamento.png";
import imgSomaImposto from "../../public/outrasImagens/imgSomaImpostos.png";
import imgImpostoFixo from "../../public/outrasImagens/imgImpostoFixo.png";
import imgFaturamentoDiario from "../../public/outrasImagens/imgFaturamentoDiario.png";
import imgImpostoSFatu from "../../public/outrasImagens/imgImpostoSfatu.png";
import sanção from "../../public/outrasImagens/sanção.png";
import { useRef } from "react";
import { createPortal } from "react-dom";
import useSound from "use-sound";
import purchaseEdifAudio from "../../public/sounds/purchaseEdifAudio.mp3";

const getImageUrl = (nome) => `/imagens/${nome}.png`;

// ═══════════════════════════════════════════════════════════
// HELPERS — fora do componente
// ═══════════════════════════════════════════════════════════

const _ImoveisBaseIcons = ({ dados, setorAtivo, index, cor1, onClickLojas }) => (
  <div className="flex gap-[3px] flex-wrap">
    {[
      { img: terrenoImg, key: "terrenos", qtd: dados.terrenos.quantidade },
      { img: LojaPImg, key: "lojasP", qtd: dados.lojasP.quantidade },
      { img: LojaMImg, key: "lojasM", qtd: dados.lojasM.quantidade },
      { img: LojaGImg, key: "lojasG", qtd: dados.lojasG.quantidade },
    ].map(({ img, key, qtd }) => {
      const nec = dados[setorAtivo].edificios[index].lojasNecessarias[key];
      if (!nec) return null;
      return (
        <div
          key={key}
          style={{ width: 25, height: 25, borderRadius: 4, background: cor1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          onClick={onClickLojas}
          data-tooltip-id="tooltip-faturado"
          data-tooltip-html={`Necessário: ${nec} | Atual: ${qtd}`}
        >
          <img src={img} style={{ height: "70%", width: "70%", objectFit: "contain" }} alt="" />
          {qtd < nec && <span style={{ position: "absolute", bottom: -2, right: -2, width: 5, height: 5, borderRadius: "50%", background: "#fff", display: "block" }} />}
        </div>
      );
    })}
  </div>
);

const _ConstNecIcons = ({ arrayConstNece, arrayConstResources, cor1, onClickConstr, booleanPreReq, getImageUrl }) => {
  const lista = [...(arrayConstNece || []), ...(arrayConstResources || [])].slice(0, 4);
  if (!lista.length) return <span style={{ fontSize: 8, color: "rgba(255,255,255,.25)" }}>—</span>;
  return (
    <div className="flex gap-[3px]">
      {lista.map((nome) => (
        <div
          key={nome}
          style={{ width: 17, height: 17, borderRadius: 4, background: cor1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          onClick={onClickConstr}
          data-tooltip-id="tooltip-faturado"
          data-tooltip-html={`Necessário: ${nome}`}
        >
          <img src={getImageUrl(nome)} style={{ height: "70%", width: "70%", objectFit: "contain" }} alt={nome} />
          {!booleanPreReq(nome) && <span style={{ position: "absolute", bottom: -2, right: -2, width: 5, height: 5, borderRadius: "50%", background: "#fff", display: "block" }} />}
        </div>
      ))}
    </div>
  );
};

const _ActionButtons = ({ setorInfo, corPowerUpAtual, onClickFinancas, onClickPowerUp }) => (
  <div className="flex gap-[3px]">
    <div
      style={{ width: 22, height: 22, borderRadius: 6, backgroundColor: setorInfo.cor1, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
      data-tooltip-id="tooltip-faturado"
      data-tooltip-html="Informações financeiras do edifício"
      onClick={onClickFinancas}
      className="hover:scale-[1.10] ease-in-out"
    >
      <img src={DolarImg} style={{ height: "60%" }} alt="" />
    </div>
    <div
      style={{ width: 22, height: 22, borderRadius: 6, background: `linear-gradient(135deg,${setorInfo.cor4} 0%,${corPowerUpAtual} 50%,${setorInfo.cor1} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
      data-tooltip-id="tooltip-faturado"
      data-tooltip-html="Power-Ups — bônus especiais que aumentam o desempenho do edifício"
      onClick={onClickPowerUp}
      className="hover:scale-[1.10] ease-in-out"
    >
      <img src={PróximoImg} style={{ height: "65%", transform: "rotate(270deg)" }} alt="" />
    </div>
  </div>
);

const _ImoveisECustoRow = ({ dados, setorAtivo, index, cor1, setorInfo, custoConstrucao, formatarNumero, onClickLojas }) => (
  <div className="flex gap-[3px]" style={{ minHeight: 30 }}>
    <div
      style={{ width: "70%", background: "rgba(0,0,0,.32)", borderRadius: 6, padding: "4px 7px", display: "flex", flexDirection: "column", gap: 2, cursor: "pointer" }}
      onClick={onClickLojas}
      data-tooltip-id="tooltip-faturado"
      data-tooltip-html="Imóveis base necessários para construir"
    >
      <span style={{ fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "rgba(255,255,255,.3)" }}>Imóveis base</span>
      <_ImoveisBaseIcons dados={dados} setorAtivo={setorAtivo} index={index} cor1={cor1} onClickLojas={onClickLojas} />
    </div>
    <div
      style={{ width: "30%", background: setorInfo.cor3, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}
      data-tooltip-id="tooltip-faturado"
      data-tooltip-html="Custo de construção do edifício"
    >
      <img src={ConstuirImg} style={{ height: 13, aspectRatio: "1" }} alt="" />
      <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 12, fontWeight: 700, color: "#fff" }}>
        {formatarNumero(custoConstrucao)}
      </span>
    </div>
  </div>
);

const _ConstrERecursosRow = ({ arrayConstNece, arrayConstResources, cor1, setorInfo, onClickConstr, booleanPreReq }) => {
  const temConstr = (arrayConstNece || []).length > 0;
  const temRecursos = (arrayConstResources || []).length > 0;
  if (!temConstr && !temRecursos) return null;
  return (
    <div className="flex gap-[3px]" style={{ minHeight: 30 }}>
      <div
        style={{ width: "60%", background: "rgba(0,0,0,.32)", borderRadius: 6, padding: "4px 7px", display: "flex", flexDirection: "column", gap: 2, cursor: "pointer" }}
        onClick={onClickConstr}
        data-tooltip-id="tooltip-faturado"
        data-tooltip-html="Construções necessárias para este edifício"
      >
        <span style={{ fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "rgba(255,255,255,.3)" }}>Constr. nec.</span>
        {temConstr
          ? <_ConstNecIcons arrayConstNece={arrayConstNece} arrayConstResources={[]} cor1={cor1} onClickConstr={onClickConstr} booleanPreReq={booleanPreReq} getImageUrl={getImageUrl} />
          : <span style={{ fontSize: 8, color: "rgba(255,255,255,.2)" }}>—</span>
        }
      </div>
      <div
        style={{ width: "40%", background: "rgba(0,0,0,.32)", borderRadius: 6, padding: "4px 7px", display: "flex", flexDirection: "column", gap: 2, cursor: "pointer" }}
        onClick={onClickConstr}
        data-tooltip-id="tooltip-faturado"
        data-tooltip-html="Recursos de construção consumidos"
      >
        <span style={{ fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "rgba(255,255,255,.3)" }}>Recursos</span>
        {temRecursos
          ? <_ConstNecIcons arrayConstNece={[]} arrayConstResources={arrayConstResources} cor1={cor1} onClickConstr={onClickConstr} booleanPreReq={booleanPreReq} getImageUrl={getImageUrl} />
          : <span style={{ fontSize: 8, color: "rgba(255,255,255,.2)" }}>—</span>
        }
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// SETORES CONFIG — fora do componente, objeto estático
// ═══════════════════════════════════════════════════════════
const SETORES_CONFIG = {
  agricultura: { id: "agricultura", corClasse: "bg-[#4CAF50]", img: agricultura, cor1: "#003816", cor2: "#1A5E2A", cor3: "#0C9123", cor4: "#4CAF50" },
  tecnologia:  { id: "tecnologia",  corClasse: "bg-[#FF8C42]", img: tecnologia,  cor1: "#A64B00", cor2: "#D45A00", cor3: "#FF6F00", cor4: "#FF8C42" },
  industria:   { id: "industria",   corClasse: "bg-[#B3B3B3]", img: industria,   cor1: "#1A1A1A", cor2: "#4D4D4D", cor3: "#808080", cor4: "#B3B3B3" },
  comercio:    { id: "comercio",    corClasse: "bg-[#FF4D4D]", img: comercio,    cor1: "#660000", cor2: "#A31919", cor3: "#E60000", cor4: "#FF4D4D" },
  imobiliario: { id: "imobiliario", corClasse: "bg-[#6666FF]", img: imobiliario, cor1: "#000066", cor2: "#1A1A8C", cor3: "#3333CC", cor4: "#6666FF" },
  energia:     { id: "energia",     corClasse: "bg-[#FFD966]", img: energia,     cor1: "#665200", cor2: "#A37F19", cor3: "#E6B800", cor4: "#FFD966" },
  grafico:     { id: "grafico",     corClasse: "",             img: grafico,     cor1: "#6A00FF", cor2: "#6A00FF", cor3: "#6A00FF", cor4: "#6A00FF" },
};

const SETORES_ARR = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

const PRODUCOES = new Set([
  "Plantação De Grãos", "Fazenda De Vacas", "Plantação De Eucalipto", "Granja De Aves", "Criação De Ovinos",
  "Serraria", "Fábrica De Smartphones", "Fábrica De Computadores", "Fábrica De Consoles De Jogos",
  "Fábrica De Dispositivos Vestíveis", "Fábrica De Rações", "Fábrica De Embalagens", "Fábrica De Fertilizantes",
  "Fábrica Têxtil", "Fábrica De Calçados", "Fábrica De Roupas", "Fábrica De Celulose", "Fábrica De Papel",
  "Fábrica De Livros", "Fábrica De Medicamentos", "Laboratório Farmacêutico", "Fábrica De Plásticos",
  "Fábrica De Químicos Especializados", "Alto-Forno", "Usina Siderúrgica", "Fundição De Alumínio",
  "Fábrica De Ligas Metálicas", "Indústria De Componentes Mecânicos", "Fábrica De Chapas Metálicas",
  "Fábrica De Estruturas Metálicas", "Fábrica De Peças Automotivas", "Montadora De Veículos Elétricos",
  "Fábrica De Automóveis", "Refinaria", "Biofábrica", "Fábrica De Chips", "Fábrica De Placas Eletrônicas",
  "Fábrica De Semicondutores", "Fábrica De Robôs", "Fábrica De Motores", "Fábrica De Foguetes",
  "Fábrica De Aeronaves", "Estaleiro", "Fábrica De Turbinas Eólicas", "Fábrica De Painéis Solares", "Fábrica De Baterias",
]);

const VENDAS_FINAIS = new Set([
  "Livraria", "Mercado", "Açougue", "Petshop", "Farmácia", "Loja De Calçados", "Loja De Vestuário",
  "Loja De Gadgets E Wearables", "Loja De Games", "Loja De Celulares", "Loja De Informática",
  "Loja De Eletrônicos", "Concessionária De Veículos",
]);

const ESTOQUES = new Set([
  "Armazém", "Silo", "Depósito De Resíduos Orgânicos", "Data Center", "Servidor Em Nuvem", "Armazém Logístico",
  "Centro De Distribuição", "Fábrica De Tanque De Armazenamento Biocombustível", "Centro De Coleta De Biomassa",
  "Campo De Estocagem", "Armazém De Materiais Brutos", "Câmara Fria", "Container Modular", "Pátio De Veículos",
  "Armazém Industrial", "Armazém De Materiais Sensíveis", "Hangar", "Pátio De Mineração",
]);

const FATOR_ECONOMIA = { recessão: 0.4, declinio: 0.8, estável: 1, progressiva: 1.1, aquecida: 1.25 };

// ═══════════════════════════════════════════════════════════
// CARD MODAL BASE
// ═══════════════════════════════════════════════════════════

// Props novas: edificio (objeto do edifício), edificiosPorNome (mapa lookup)
const CardModalBase = ({ index, edificio, setorAtivo, edificiosPorNome }) => {
  const { economiaSetores, setEconomiaSetores, atualizarEco, verificarLimites } = useContext(DadosEconomyGlobalContext);
  const { dados, atualizarDados, atualizarDadosProf2, atualizarDadosProf3, atualizarDadosProf } = useContext(CentraldeDadosContext);

  // console.count("CardModal render");

  const economiaSetor = economiaSetores[setorAtivo].economiaSetor.estadoAtual;
  const [buttonPurchaseEdifAudio] = useSound(purchaseEdifAudio);

  // ── CATEGORIA via Set (O(1) em vez de array includes) ─────
  const nomeAtual = edificio.nome;
  const categoriaEdificio = ESTOQUES.has(nomeAtual) ? "estoque"
    : PRODUCOES.has(nomeAtual) ? "producao"
    : VENDAS_FINAIS.has(nomeAtual) ? "venda"
    : "passiva";

  const isEstoque  = categoriaEdificio === "estoque";
  const isProducao = categoriaEdificio === "producao";
  const isVenda    = categoriaEdificio === "venda";
  const isPassiva  = categoriaEdificio === "passiva";

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [visibleId, setVisibleId] = useState("lojasNec");
  const [modalPowerup, setModalPowerUp] = useState(false);
  const [verificadorDeLojasNecessárias, setVerificador] = useState(true);
  const [verificadorDeConstruçõesNecessárias, setVerificadorConstr] = useState(true);
  const [flipped, setFlipped] = useState(false);

  const setorInfo = SETORES_CONFIG[setorAtivo];

  // ── Dados derivados do edifício (via prop, sem acesso direto ao context) ──
  const arrayConstResources = edificio.recursoDeConstrução;
  const arrayConstNece      = edificio.construçõesNecessárias;
  const custoConstrução     = edificio.custoConstrucao;
  const valorFatu           = edificio.finanças.faturamentoUnitário;
  const valorImpostoFixo    = edificio.finanças.impostoFixo;
  const impostoSobreFatu    = edificio.finanças.impostoSobreFatu;
  const quantidadeMinimaPowerUpNv2 = edificio.powerUp.nível2.quantidadeMínima;
  const quantidadeMinimaPowerUpNv3 = edificio.powerUp.nível3.quantidadeMínima;
  const quantidadeAtivoAtual       = edificio.quantidade;

  const corPadrão = { backgroundColor: setorInfo.cor2 };

  const corPowerUp = (pu) => {
    switch (pu) { case "powerUpNv1": return "#8F5ADA"; case "powerUpNv2": return "#6411D9"; case "powerUpNv3": return "#350973"; default: return corPadrão; }
  };

  const powerUpSelecionado = quantidadeAtivoAtual >= quantidadeMinimaPowerUpNv3 ? "powerUpNv3"
    : quantidadeAtivoAtual >= quantidadeMinimaPowerUpNv2 ? "powerUpNv2"
    : "powerUpNv1";
  const corPowerUpAtual = corPowerUp(powerUpSelecionado);
  const corLinha   = quantidadeAtivoAtual > 0 ? corPowerUpAtual : corPadrão;
  const bgColuna1  = corLinha === "#8F5ADA" ? corPowerUp("powerUpNv1") : powerUpSelecionado === "powerUpNv2" ? corPowerUp("powerUpNv2") : powerUpSelecionado === "powerUpNv3" ? corPowerUp("powerUpNv3") : corPadrão;
  const bgColuna2  = powerUpSelecionado === "powerUpNv1" ? corPadrão : powerUpSelecionado === "powerUpNv2" ? corPowerUp("powerUpNv2") : corPowerUp("powerUpNv3");
  const bgColuna3  = powerUpSelecionado === "powerUpNv1" ? corPadrão : powerUpSelecionado === "powerUpNv2" ? corPadrão : corPowerUp("powerUpNv3");

  const formatarNumero = useCallback((num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(1).replace(".0", "") + "T";
    if (num >= 1e9)  return (num / 1e9).toFixed(1).replace(".0", "") + "B";
    if (num >= 1e6)  return (num / 1e6).toFixed(1).replace(".0", "") + "M";
    if (num >= 1e3)  return (num / 1e3).toFixed(1).replace(".0", "") + "K";
    return num.toString();
  }, []);

  // ── booleanPreReq: usa o mapa em vez de find/findIndex ────────────────
  const booleanPreReq = useCallback((nomeEd) => {
    const ed = edificiosPorNome?.[nomeEd];
    return ed ? ed.quantidade > 0 : false;
  }, [edificiosPorNome]);

  // ── calcularCustoRecurso: usa o mapa em vez de find por setor ─────────
  const calcularCustoRecurso = useCallback((nomeRecurso) => {
    const edEncontrado = edificiosPorNome?.[nomeRecurso];
    if (!edEncontrado) return 0;
    const c    = edEncontrado.custoConstrucao || 0;
    const tNec = edEncontrado.lojasNecessarias.terrenos || 0;
    const pNec = edEncontrado.lojasNecessarias.lojasP   || 0;
    const mNec = edEncontrado.lojasNecessarias.lojasM   || 0;
    const gNec = edEncontrado.lojasNecessarias.lojasG   || 0;
    let total = c
      + tNec * dados.terrenos.preçoConstrução
      + pNec * (dados.lojasP.preçoConstrução + dados.lojasP.quantidadeNecTerreno * dados.terrenos.preçoConstrução)
      + mNec * (dados.lojasM.preçoConstrução + dados.lojasM.quantidadeNecTerreno * dados.terrenos.preçoConstrução)
      + gNec * (dados.lojasG.preçoConstrução + dados.lojasG.quantidadeNecTerreno * dados.terrenos.preçoConstrução);
    if (Array.isArray(edEncontrado.recursoDeConstrução) && edEncontrado.recursoDeConstrução.length > 0) {
      edEncontrado.recursoDeConstrução.forEach((sub) => { total += calcularCustoRecurso(sub); });
    }
    return total;
  }, [edificiosPorNome, dados.terrenos.preçoConstrução, dados.lojasP.preçoConstrução, dados.lojasM.preçoConstrução, dados.lojasG.preçoConstrução, dados.lojasP.quantidadeNecTerreno, dados.lojasM.quantidadeNecTerreno, dados.lojasG.quantidadeNecTerreno]);

  // ── custoRecursos com memo ─────────────────────────────────────────────
  const custoRecursos = useMemo(() => {
    let total = 0;
    arrayConstResources?.forEach((nome) => { total += calcularCustoRecurso(nome); });
    return total;
  }, [arrayConstResources, calcularCustoRecurso]);

  // ── Verificadores via useEffect simplificados ──────────────────────────
  useEffect(() => {
    const { terrenos = 0, lojasP = 0, lojasM = 0, lojasG = 0 } = edificio.lojasNecessarias;
    setVerificador(
      dados.terrenos.quantidade >= terrenos &&
      dados.lojasP.quantidade   >= lojasP   &&
      dados.lojasM.quantidade   >= lojasM   &&
      dados.lojasG.quantidade   >= lojasG
    );
  }, [dados.terrenos.quantidade, dados.lojasP.quantidade, dados.lojasM.quantidade, dados.lojasG.quantidade, edificio.lojasNecessarias]);

  useEffect(() => {
    const verificarEdificios = (lista) => (lista || []).some((nome) => {
      const ed = edificiosPorNome?.[nome];
      return !ed || ed.quantidade <= 0;
    });
    setVerificadorConstr(verificarEdificios(arrayConstResources) || verificarEdificios(arrayConstNece));
  }, [arrayConstResources, arrayConstNece, edificiosPorNome]);

  // ── Acumuladores PowerUp usando o mapa ────────────────────────────────
  const [acumuladorPowerUpRedCustoFornece, setAcumuladorPowerUpRedCustoFornece] = useState(0);
  const [acumuladorPowerUpAumFatuFornece, setAcumuladorPowerUpAumFatuFornece]   = useState(0);
  const [acumuladorPowerUpRedCustoRecebe, setAcumuladorPowerUpRedCustoRecebe]   = useState(0);
  const [acumuladorPowerUpAumFatuRecebe, setAcumuladorPowerUpAumFatuRecebe]     = useState(0);

  useEffect(() => {
    let r = 0, a = 0;
    const q = edificio.quantidade;
    const pu = q >= quantidadeMinimaPowerUpNv3 ? "powerUpNv3" : q >= quantidadeMinimaPowerUpNv2 ? "powerUpNv2" : "powerUpNv1";
    edificio.ForneceMelhoraEficiencia.forEach((ed) => {
      const edM = edificiosPorNome?.[ed.nome];
      if (edM && edM.quantidade > 0) {
        r += pu === "powerUpNv1" ? ed.redCusto.nível1 : pu === "powerUpNv2" ? ed.redCusto.nível2 : ed.redCusto.nível3;
        a += pu === "powerUpNv1" ? ed.aumFatu.nível1  : pu === "powerUpNv2" ? ed.aumFatu.nível2  : ed.aumFatu.nível3;
      }
    });
    setAcumuladorPowerUpRedCustoFornece(r);
    setAcumuladorPowerUpAumFatuFornece(a);
  }, [edificio, edificiosPorNome, quantidadeMinimaPowerUpNv2, quantidadeMinimaPowerUpNv3]);

  useEffect(() => {
    let r = 0, a = 0;
    const q = edificio.quantidade;
    const pu = q >= quantidadeMinimaPowerUpNv3 ? "powerUpNv3" : q >= quantidadeMinimaPowerUpNv2 ? "powerUpNv2" : "powerUpNv1";
    edificio.RecebeMelhoraEficiencia.forEach((ed) => {
      const edM = edificiosPorNome?.[ed.nome];
      if (edM && edM.quantidade > 0) {
        r += pu === "powerUpNv1" ? ed.redCusto.nível1 : pu === "powerUpNv2" ? ed.redCusto.nível2 : ed.redCusto.nível3;
        a += pu === "powerUpNv1" ? ed.aumFatu.nível1  : pu === "powerUpNv2" ? ed.aumFatu.nível2  : ed.aumFatu.nível3;
      }
    });
    setAcumuladorPowerUpRedCustoRecebe(r);
    setAcumuladorPowerUpAumFatuRecebe(a);
  }, [edificio, edificiosPorNome, quantidadeMinimaPowerUpNv2, quantidadeMinimaPowerUpNv3]);

  // ── Valores financeiros ────────────────────────────────────────────────
  const fatorEconomico          = FATOR_ECONOMIA[economiaSetor] ?? 1;
  const impostoSobreFatuFinal   = impostoSobreFatu - impostoSobreFatu * (acumuladorPowerUpRedCustoRecebe / 100);
  const valorFatuFinal          = valorFatu + valorFatu * (acumuladorPowerUpAumFatuRecebe / 100);
  const valorImpostoFixoFinal   = valorImpostoFixo - valorImpostoFixo * (acumuladorPowerUpRedCustoRecebe / 100);
  const fatuMensal              = valorFatuFinal * 30 * fatorEconomico;
  const valorImpostoSobreFatu   = fatuMensal * impostoSobreFatuFinal;
  const valorFinalMês           = fatuMensal - valorImpostoSobreFatu - valorImpostoFixoFinal;

  const CustoTotalSomadoLojas = useMemo(() => {
    const tNec = edificio.lojasNecessarias?.terrenos || 0;
    const pNec = edificio.lojasNecessarias?.lojasP   || 0;
    const mNec = edificio.lojasNecessarias?.lojasM   || 0;
    const gNec = edificio.lojasNecessarias?.lojasG   || 0;
    return (
      tNec * dados.terrenos.preçoConstrução +
      pNec * (dados.lojasP.preçoConstrução + dados.lojasP.quantidadeNecTerreno * dados.terrenos.preçoConstrução) +
      mNec * (dados.lojasM.preçoConstrução + dados.lojasM.quantidadeNecTerreno * dados.terrenos.preçoConstrução) +
      gNec * (dados.lojasG.preçoConstrução + dados.lojasG.quantidadeNecTerreno * dados.terrenos.preçoConstrução)
    );
  }, [edificio.lojasNecessarias, dados.terrenos.preçoConstrução, dados.lojasP.preçoConstrução, dados.lojasM.preçoConstrução, dados.lojasG.preçoConstrução]);

  const rentabilidade = (valorFinalMês / (CustoTotalSomadoLojas + custoRecursos + custoConstrução)) * 100;
  const paybackDias   = rentabilidade > 0 ? Math.ceil((100 / rentabilidade) * 30) : null;

  // ── contabilidadeDeFalta ────────────────────────────────────────────────
  const contabilidadeDeFalta = useCallback((edificioKey) => {
    const qtdAtual     = dados[edificioKey].quantidade;
    const qtdNecessaria = edificio.lojasNecessarias[edificioKey];
    const qtdFalta     = qtdAtual >= qtdNecessaria ? 0 : qtdNecessaria - qtdAtual;
    const custoTotalConst =
      edificioKey === "terrenos" ? dados.terrenos.preçoConstrução
      : edificioKey === "lojasP" ? dados.lojasP.preçoConstrução + dados.terrenos.preçoConstrução
      : edificioKey === "lojasM" ? dados.lojasM.preçoConstrução + 2 * dados.terrenos.preçoConstrução
      : edificioKey === "lojasG" ? dados.lojasG.preçoConstrução + 3 * dados.terrenos.preçoConstrução
      : 0;
    return qtdFalta * custoTotalConst;
  }, [dados, edificio.lojasNecessarias]);

  // ── podeComprarCard ────────────────────────────────────────────────────
  const podeComprarCard = useCallback(() => {
    const carteira = economiaSetores?.carteira?.carteiraAtual ?? [];
    const resultado = verificarLimites(edificio, setorAtivo, carteira);
    if (resultado !== true) return { ok: false, motivo: resultado };
    const custo = Number(edificio.custoConstrucao ?? 0);
    if (economiaSetores.saldo < custo) return { ok: false, motivo: "Saldo insuficiente" };
    const { terrenos = 0, lojasP = 0, lojasM = 0, lojasG = 0 } = edificio.lojasNecessarias || {};
    if (dados.terrenos.quantidade < terrenos || dados.lojasP.quantidade < lojasP || dados.lojasM.quantidade < lojasM || dados.lojasG.quantidade < lojasG)
      return { ok: false, motivo: "Você não tem lojas ou terrenos suficientes" };
    if (edificio.construçõesNecessárias?.length)
      for (const nome of edificio.construçõesNecessárias) {
        const ref = edificiosPorNome?.[nome];
        if (!ref) return { ok: false, motivo: `Construção "${nome}" não encontrada` };
        if (ref.quantidade <= 0) return { ok: false, motivo: `Precisa de 1 unidade de "${nome}"` };
      }
    if (edificio.recursoDeConstrução?.length)
      for (const nome of edificio.recursoDeConstrução) {
        const ref = edificiosPorNome?.[nome];
        if (!ref) return { ok: false, motivo: `Recurso "${nome}" não encontrado` };
        if (ref.quantidade <= 0) return { ok: false, motivo: `Precisa de 1 unidade de "${nome}"` };
      }
    return { ok: true };
  }, [edificio, setorAtivo, economiaSetores, dados, verificarLimites, edificiosPorNome]);

  const { ok: podeComprar, motivo } = useMemo(() => podeComprarCard(), [podeComprarCard]);

  // ── comprarCard ────────────────────────────────────────────────────────
  const comprarCard = useCallback(() => {
    if (!edificio) return;
    const carteira = economiaSetores?.carteira?.carteiraAtual ?? [];
    if (verificarLimites(edificio, setorAtivo, carteira) !== true) return;
    const custo = Number(edificio.custoConstrucao ?? 0);
    if (economiaSetores.saldo < custo) {
      atualizarDados("modalAlert", { ...dados.modalAlert, estadoModal: true, head: "Erro na construção", content: "Você não tem dinheiro suficiente." });
      return;
    }
    const { terrenos: qT = 0, lojasP: qP = 0, lojasM: qM = 0, lojasG: qG = 0 } = edificio.lojasNecessarias || {};
    const qTa = dados.terrenos.quantidade, qPa = dados.lojasP.quantidade, qMa = dados.lojasM.quantidade, qGa = dados.lojasG.quantidade;
    if (qT > qTa || qP > qPa || qM > qMa || qG > qGa) {
      atualizarDados("modalAlert", { ...dados.modalAlert, estadoModal: true, head: "Falta edifícios base", content: "Não tem lojas/terrenos suficientes." });
      return;
    }
    if (edificio.construçõesNecessárias?.length)
      for (const nome of edificio.construçõesNecessárias) {
        const ref = edificiosPorNome?.[nome];
        if (!ref || ref.quantidade <= 0) {
          atualizarDados("modalAlert", { ...dados.modalAlert, estadoModal: true, head: `Falta ${nome}`, content: `Precisa de 1 unidade de "${nome}".` });
          return;
        }
      }
    if (edificio.recursoDeConstrução?.length)
      for (const nome of edificio.recursoDeConstrução) {
        const ref = edificiosPorNome?.[nome];
        if (!ref || ref.quantidade <= 0) {
          atualizarDados("modalAlert", { ...dados.modalAlert, estadoModal: true, head: `Precisa de ${nome}`, content: `Precisa de 1 unidade de "${nome}".` });
          return;
        }
      }
    buttonPurchaseEdifAudio();
    atualizarEco("saldo", economiaSetores.saldo - custo);
    atualizarDadosProf2([setorAtivo, "edificios", index, "quantidade"], (edificio.quantidade || 0) + 1);
    atualizarDadosProf2(["terrenos", "quantidade"], qTa - qT);
    atualizarDadosProf2(["lojasP",   "quantidade"], qPa - qP);
    atualizarDadosProf2(["lojasM",   "quantidade"], qMa - qM);
    atualizarDadosProf2(["lojasG",   "quantidade"], qGa - qG);
    const custosEdBase = qT * dados.terrenos.preçoConstrução
      + qP * (dados.lojasP.preçoConstrução + dados.lojasP.quantidadeNecTerreno * dados.terrenos.preçoConstrução)
      + qM * (dados.lojasM.preçoConstrução + dados.lojasM.quantidadeNecTerreno * dados.terrenos.preçoConstrução)
      + qG * (dados.lojasG.preçoConstrução + dados.lojasG.quantidadeNecTerreno * dados.terrenos.preçoConstrução);
    if (edificio.recursoDeConstrução?.length)
      for (const nome of edificio.recursoDeConstrução) {
        const ref = edificiosPorNome?.[nome];
        if (ref) atualizarDadosProf2([ref.setor, "edificios", ref.index, "quantidade"], (ref.quantidade || 0) - 1);
      }
    const setorIndex   = SETORES_ARR.indexOf(setorAtivo);
    const novaCarteira = [...carteira];
    if (!novaCarteira[setorIndex]) novaCarteira[setorIndex] = [];
    novaCarteira[setorIndex] = [...novaCarteira[setorIndex], { ...edificio, quantidade: 1 }];
    atualizarEco("carteira",   { ...economiaSetores.carteira, carteiraAtual: novaCarteira });
    atualizarEco("patrimonio", economiaSetores.patrimonio + custosEdBase + custo);
    atualizarEco("patrimônio", { ...economiaSetores[setorAtivo].economiaSetor, patrimonio: economiaSetores[setorAtivo].economiaSetor.patrimonio + custosEdBase + custo });
    const carteiraNorm = SETORES_ARR.map((_, i) => Array.isArray(novaCarteira[i]) ? novaCarteira[i] : []);
    let totalEd = 0; const nomesSet = new Set();
    carteiraNorm.forEach((arr) => arr.forEach((item) => { if (!item) return; nomesSet.add(item.nome); totalEd += Number(item.quantidade ?? 1); }));
    atualizarEco("centralEdificios", { ...economiaSetores.centralEdificios, quantidadeSetoresAtual: carteiraNorm.reduce((a, arr) => a + (arr.length > 0 ? 1 : 0), 0), QuantidadeEdifíciosAtual: totalEd, QuantidadeDiversosEdificiosAtual: nomesSet.size });
  }, [edificio, setorAtivo, index, economiaSetores, dados, verificarLimites, atualizarDados, atualizarEco, atualizarDadosProf2, edificiosPorNome, buttonPurchaseEdifAudio]);

  // ── Handlers ──────────────────────────────────────────────────────────
  let timer;
  const openModalPowerUps  = () => setModalPowerUp(true);
  const fecharModalPowerUp = () => setModalPowerUp(false);
  const handleMouseEnter   = () => { timer = setTimeout(() => setIsModalOpen(true), 0); };
  const handleFlip         = () => setFlipped(f => !f);
  const handleShow         = (id) => setVisibleId(id);
  const onClickLojas   = () => { handleShow("lojasNec");   handleFlip(); };
  const onClickConstr  = () => { handleShow("constNece");  handleFlip(); };
  const onClickFinancas = () => { handleShow("finançasEd"); handleFlip(); };
  const onClickPowerUp  = () => { handleMouseEnter(); handleShow("powerUp"); handleFlip(); };

  // ── TooltipCustom ─────────────────────────────────────────────────────
  function TooltipCustom({ text, children }) {
    const [show, setShow] = useState(false);
    const ref = useRef();
    const tooltip = show && ref.current && createPortal(
      <div style={{ position: "absolute", top: ref.current.getBoundingClientRect().top - 40, left: ref.current.getBoundingClientRect().left + ref.current.offsetWidth / 2, transform: "translateX(-50%)", backgroundColor: "#FFFFFF", color: "#350973", padding: "6px 10px", borderRadius: "6px", fontWeight: "600", whiteSpace: "pre-line", zIndex: 2147483647, pointerEvents: "none", maxWidth: "400px" }}>{text}</div>,
      document.body
    );
    return (
      <>
        <div ref={ref} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} className="relative flex items-center justify-center">{children}</div>
        {tooltip}
      </>
    );
  }

  // ── Gradientes e bordas ───────────────────────────────────────────────
  const gradientLevel = () => {
    if (powerUpSelecionado === "powerUpNv3") return "#FFD700";
    if (powerUpSelecionado === "powerUpNv2") return "#6411D9";
    return setorInfo.cor2;
  };

  const getGradient = () => {
    if (isProducao) return `radial-gradient(circle at 2% 50%, ${setorInfo.cor1}99 0%, ${setorInfo.cor4}FF 40%, ${gradientLevel()}CC 70%, ${setorInfo.cor4}FF 80%, ${setorInfo.cor2}B3 85%, ${setorInfo.cor1}99 92%, ${setorInfo.cor2}B3 98%, ${setorInfo.cor4}FF 100%)`;
    if (isVenda)    return `radial-gradient(circle at 100% 0%, ${setorInfo.cor1}11 0%, ${gradientLevel()}CC 12%, ${setorInfo.cor4}CC 28%, ${setorInfo.cor3}FF 48%, ${setorInfo.cor3}FF 62%, ${gradientLevel()}99 80%, ${setorInfo.cor1}11 100%)`;
    if (isEstoque)  return `linear-gradient(190deg, ${gradientLevel()}15 0%, ${setorInfo.cor4}EE 28%, ${setorInfo.cor3}CC 50%, ${setorInfo.cor4}EE 70%, ${setorInfo.cor1}77 100%)`;
    if (isPassiva)  return `linear-gradient(135deg, ${gradientLevel()}FF 0%, ${setorInfo.cor2}77 15%, ${setorInfo.cor3}BB 35%, ${setorInfo.cor4}FF 52%, ${setorInfo.cor3}99 70%, ${setorInfo.cor1}FF 100%)`;
  };

  const getBordaDinamica = () => {
    if (isProducao) return { border: `2px solid ${setorInfo.cor1}55`, boxShadow: `0 0 0 1px ${setorInfo.cor3}88`, borderRadius: "25px 10px 25px 10px" };
    if (isEstoque)  return { border: `2px solid ${setorInfo.cor2}`, boxShadow: `0 0 0 3px ${setorInfo.cor3}88`, borderRadius: "20px 20px 20px 20px" };
    if (isVenda)    return { borderRadius: "20px 20px 20px 20px", border: `1.5px solid ${setorInfo.cor3}` };
    if (isPassiva)  return { border: `1px solid ${setorInfo.cor3}55`, boxShadow: `0 0 0 1px ${setorInfo.cor1}88`, borderRadius: "20px 20px 20px 20px" };
    return { borderRadius: "20px 20px 20px 20px" };
  };

  const getGradientByLevel = () => {
    if (powerUpSelecionado === "powerUpNv3") return `linear-gradient(135deg, #7a5500 0%, #b8870b 20%, #F27405 40%, #FFD700 60%, #F27405 80%, #7a5500 100%)`;
    if (powerUpSelecionado === "powerUpNv2") return `linear-gradient(135deg, #350973 0%, #6411D9 25%, #8F5ADA 50%, #6411D9 75%, #350973 100%)`;
    return `transparent`;
  };

  // ── Bloco JSX reutilizável: Linhas 2+3+4+5 (igual para todas as categorias) ──
  const renderCorpoLinhas = () => {
    const semRequisitos = (!arrayConstNece || arrayConstNece.length === 0) && (!arrayConstResources || arrayConstResources.length === 0);
    return (
      <>
        {/* Linha 2: Renda/dia + Payback */}
        <div style={{ background: "rgba(0,0,0,.32)", borderRadius: 7, padding: "5px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="flex flex-col gap-[1px]">
            <span style={{ fontSize: 7.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "rgba(255,255,255,.38)" }}>Renda / dia</span>
            <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 22, fontWeight: 700, color: "#C87AFF", lineHeight: 1 }}>+ {formatarNumero(valorFatuFinal)}</span>
            <span style={{ fontSize: 7, color: "rgba(255,255,255,.3)", marginTop: 1 }}>automático · sem ação</span>
          </div>
          <div style={{ background: "rgba(0,0,0,.28)", borderRadius: 7, padding: "4px 7px", minWidth: 44, textAlign: "center" }} data-tooltip-id="tooltip-faturado" data-tooltip-html="Dias para recuperar o investimento. Fórmula: (100/ROI%)×30">
            <div style={{ fontSize: 7, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "rgba(255,255,255,.38)" }}>Payback</div>
            <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 14, fontWeight: 700, color: "#C87AFF", lineHeight: 1 }}>{paybackDias ? `${paybackDias}d` : "∞"}</div>
          </div>
        </div>

        {/* Linha 3: Fatu. Mensal | ROI | Botões */}
        <div className="flex gap-[4px] items-stretch" style={{ minHeight: semRequisitos ? "68px" : "42px", transition: "all 0.3s ease" }}>
          <div style={{ flex: 1, background: "rgba(0,0,0,.28)", borderRadius: 7, padding: semRequisitos ? "8px 10px" : "4px 7px", display: "flex", flexDirection: "column", justifyContent: "center" }} data-tooltip-id="tooltip-faturado" data-tooltip-html="Faturamento mensal estimado na economia atual">
            <div style={{ fontSize: 7, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "rgba(255,255,255,.38)" }}>Fatu. mensal</div>
            <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: semRequisitos ? 18 : 13, fontWeight: 700, color: "#fff", lineHeight: 1 }}>{formatarNumero(fatuMensal)}</div>
          </div>
          <div style={{ flex: 0.8, background: "rgba(0,0,0,.28)", borderRadius: 7, padding: semRequisitos ? "8px 10px" : "4px 7px", display: "flex", flexDirection: "column", justifyContent: "center" }} data-tooltip-id="tooltip-faturado" data-tooltip-html="ROI — Rendimento sobre o investimento">
            <div style={{ fontSize: 7, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "rgba(255,255,255,.38)" }}>ROI</div>
            <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: semRequisitos ? 18 : 13, fontWeight: 700, color: rentabilidade >= 0 ? "#7aff9a" : "#ff9090", lineHeight: 1 }}>{rentabilidade.toFixed(0)}%</div>
          </div>
          <div className={`flex gap-[4px] ${semRequisitos ? "flex-col w-[32px]" : "flex-row items-center"}`}>
            <div style={{ width: semRequisitos ? "100%" : 32, flex: semRequisitos ? 1 : "0 0 32px", height: semRequisitos ? "auto" : 32, borderRadius: 7, backgroundColor: setorInfo.cor1, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} onClick={onClickFinancas} className="hover:scale-110 transition-transform">
              <img src={DolarImg} style={{ height: semRequisitos ? "16px" : "14px" }} alt="" />
            </div>
            <div style={{ width: semRequisitos ? "100%" : 32, flex: semRequisitos ? 1 : "0 0 32px", height: semRequisitos ? "auto" : 32, borderRadius: 7, background: `linear-gradient(135deg,${setorInfo.cor4} 0%,${corPowerUpAtual} 50%,${setorInfo.cor1} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} onClick={onClickPowerUp} className="hover:scale-110 transition-transform">
              <img src={PróximoImg} style={{ height: semRequisitos ? "16px" : "14px", transform: "rotate(270deg)" }} alt="" />
            </div>
          </div>
        </div>

        {/* Linha 4: Imóveis base */}
        <_ImoveisECustoRow
          dados={dados} setorAtivo={setorAtivo} index={index} cor1={setorInfo.cor1}
          setorInfo={setorInfo} custoConstrucao={edificio.custoConstrucao}
          formatarNumero={formatarNumero} onClickLojas={onClickLojas}
        />

        {/* Linha 5: Constr. nec. + Recursos */}
        <_ConstrERecursosRow
          arrayConstNece={arrayConstNece} arrayConstResources={arrayConstResources}
          cor1={setorInfo.cor1} setorInfo={setorInfo}
          onClickConstr={onClickConstr} booleanPreReq={booleanPreReq}
        />
      </>
    );
  };

  // ════════════════════════════════════════
  // MODAL POWER-UPS
  // ════════════════════════════════════════
  if (modalPowerup) {
    return (
      <div className="fixed inset-0 flex justify-center items-center z-[150] bg-black/90 backdrop-blur-sm">
        <motion.div
          style={{ backgroundColor: setorInfo.cor1, borderColor: setorInfo.cor4 }}
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-[90vw] h-[85vh] rounded-[24px] border-2 flex flex-col justify-between items-center relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          <button className="absolute top-4 right-4 w-[45px] h-[45px] flex justify-center items-center rounded-xl hover:scale-110 active:scale-95 transition-all z-10 shadow-lg" style={{ backgroundColor: setorInfo.cor4 }} onClick={fecharModalPowerUp}>
            <img src={fechar} alt="Fechar" className="w-[50%]" />
          </button>
          <div style={{ backgroundColor: setorInfo.cor2, borderColor: setorInfo.cor4 }} className="flex w-full h-[15%] border-b-2 text-[45px] fonteBold text-white justify-center items-center italic tracking-tighter shadow-xl">
            {nomeAtual}
          </div>
          <div className="flex-1 w-full p-6 overflow-hidden">
            <div className="flex justify-around h-full w-full gap-4">
              {["Fornece", "Recebe"].map((label, li) => {
                const lista  = li === 0 ? edificio.ForneceMelhoraEficiencia : edificio.RecebeMelhoraEficiencia;
                const acRed  = li === 0 ? acumuladorPowerUpRedCustoFornece : acumuladorPowerUpRedCustoRecebe;
                const acAum  = li === 0 ? acumuladorPowerUpAumFatuFornece  : acumuladorPowerUpAumFatuRecebe;
                return (
                  <div key={label} className="w-[49%] h-full flex flex-col items-center">
                    <div style={{ backgroundColor: setorInfo.cor2, borderColor: setorInfo.cor4 }} className="w-full h-[10%] border-l-4 fonteBold text-white flex items-center pl-6 rounded-r-xl text-[30px] mb-4 uppercase tracking-widest shadow-md">{label}</div>
                    <div className="w-full h-[75%] overflow-y-auto pr-2 scrollbar-premium">
                      <table className="w-full border-separate border-spacing-y-2">
                        <thead>
                          <tr className="text-[11px] uppercase text-white/40 tracking-[0.2em]">
                            <th className="text-left pl-4 pb-2 font-black">Ativo Sinergia</th>
                            <th colSpan="3" className="pb-2 text-center" style={{ color: setorInfo.cor4 }}>Redução Custo</th>
                            <th className="px-2 pb-2">|</th>
                            <th colSpan="3" className="pb-2 text-center" style={{ color: setorInfo.cor4 }}>Aumento Fatu.</th>
                          </tr>
                        </thead>
                        {lista.map((edM, i) => {
                          const edMRef = edificiosPorNome?.[edM.nome];
                          const q      = edificio.quantidade;
                          const pu     = q >= quantidadeMinimaPowerUpNv3 ? "powerUpNv3" : q >= quantidadeMinimaPowerUpNv2 ? "powerUpNv2" : "powerUpNv1";
                          const cL     = edMRef && edMRef.quantidade > 0 ? corPowerUp(pu) : corPadrão;
                          const b1     = cL === "#8F5ADA" ? corPowerUp("powerUpNv1") : pu === "powerUpNv2" ? corPowerUp("powerUpNv2") : pu === "powerUpNv3" ? corPowerUp("powerUpNv3") : corPadrão;
                          const b2     = pu === "powerUpNv1" ? corPadrão : pu === "powerUpNv2" ? corPowerUp("powerUpNv2") : corPowerUp("powerUpNv3");
                          const b3     = pu === "powerUpNv1" ? corPadrão : pu === "powerUpNv2" ? corPadrão : corPowerUp("powerUpNv3");
                          return (
                            <tbody key={i}>
                              <tr style={{ backgroundColor: "rgba(255,255,255,0.03)" }} className="group hover:bg-white/10 transition-all">
                                <td style={{ borderLeft: `4px solid ${cL}` }} className="py-3 pl-2 rounded-l-xl">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 flex items-center justify-center bg-black/40 rounded-lg p-1 border border-white/5 shadow-inner">
                                      <img src={getImageUrl(edM.nome)} className="max-w-full max-h-full object-contain" onError={(e) => e.target.src = PróximoImg} />
                                    </div>
                                    <span className="text-white text-[14px] fonteBold leading-tight">{edM.nome}</span>
                                  </div>
                                </td>
                                <td style={{ backgroundColor: b1 }} className="text-center text-white text-[11px] border-r border-black/20 font-black italic">N1<br />{edM.redCusto.nível1}%</td>
                                <td style={{ backgroundColor: b2 }} className="text-center text-white text-[11px] border-r border-black/20 font-black italic">N2<br />{edM.redCusto.nível2}%</td>
                                <td style={{ backgroundColor: b3 }} className="text-center text-white text-[11px] rounded-r-none font-black italic">N3<br />{edM.redCusto.nível3}%</td>
                                <td className="w-2 bg-transparent"></td>
                                <td style={{ backgroundColor: b1 }} className="text-center text-white text-[11px] border-r border-black/20 font-black italic">N1<br />{edM.aumFatu.nível1}%</td>
                                <td style={{ backgroundColor: b2 }} className="text-center text-white text-[11px] border-r border-black/20 font-black italic">N2<br />{edM.aumFatu.nível2}%</td>
                                <td style={{ backgroundColor: b3 }} className="text-center text-white text-[11px] rounded-r-xl font-black italic">N3<br />{edM.aumFatu.nível3}%</td>
                              </tr>
                            </tbody>
                          );
                        })}
                      </table>
                    </div>
                    <div className="w-full h-[12%] flex justify-between gap-3 mt-4">
                      <div style={{ backgroundColor: setorInfo.cor2, borderBottomColor: setorInfo.cor4 }} className="flex-1 rounded-xl border-b-4 flex flex-col items-center justify-center text-white shadow-lg">
                        <span className="text-[10px] uppercase font-black opacity-40 tracking-tighter">Redução Total</span>
                        <span className="text-[24px] fonteBold">-{acRed}%</span>
                      </div>
                      <div style={{ backgroundColor: setorInfo.cor2, borderBottomColor: setorInfo.cor4 }} className="flex-1 rounded-xl border-b-4 flex flex-col items-center justify-center text-white shadow-lg">
                        <span className="text-[10px] uppercase font-black opacity-40 tracking-tighter">Aumento Total</span>
                        <span className="text-[24px] fonteBold">+{acAum}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full h-1" style={{ backgroundColor: setorInfo.cor4 }} />
        </motion.div>
      </div>
    );
  }

  // ════════════════════════════════════════
  // CARD PRINCIPAL
  // ════════════════════════════════════════
  return (
    <motion.div
      style={{ background: getGradientByLevel(), ...getBordaDinamica() }}
      className="w-[220px] h-[320px] bg-white rounded-[20px] flex flex-col justify-center items-center shadow-lg perspective rounded-br-2xl"
      initial={{ scale: 1 }} whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      <motion.div
        className="relative w-full h-full rounded-2xl rounded-br-2xl"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Badge categoria */}
        <div className="absolute bottom-0 right-0 w-[50px] h-[50px] z-20 flex items-center justify-center rounded-tl-2xl rounded-br-2xl">
          <div className="absolute inset-0 rounded-tl-2xl rounded-br-2xl" style={{ backgroundColor: setorInfo.cor3, filter: 'brightness(0.8)', boxShadow: '-2px -2px 10px rgba(0,0,0,0.3)' }} />
          <div className="w-[50px] h-[50px] flex items-center justify-center rounded-tl-2xl rounded-br-2xl" style={{ backgroundColor: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(4px)' }}>
            <img src={passive} className="w-[24px] opacity-90" alt="" />
          </div>
        </div>

        {/* Overlay licença */}
        {edificio.licençaLiberado.liberado === false && (() => {
          const nomeLicencaBlocking = edificio.licençaLiberado.licença;
          const licencaObj   = dados[setorAtivo].licençasSetor?.find((l) => l.edifíciosLiberados?.includes(nomeAtual));
          const valorLicenca = licencaObj?.valor || 0;
          const { terrenos: tN = 0, lojasP: pN = 0, lojasM: mN = 0, lojasG: gN = 0 } = edificio.lojasNecessarias || {};
          const custoLojas =
            tN * dados.terrenos.preçoConstrução +
            pN * (dados.lojasP.preçoConstrução + dados.lojasP.quantidadeNecTerreno * dados.terrenos.preçoConstrução) +
            mN * (dados.lojasM.preçoConstrução + dados.lojasM.quantidadeNecTerreno * dados.terrenos.preçoConstrução) +
            gN * (dados.lojasG.preçoConstrução + dados.lojasG.quantidadeNecTerreno * dados.terrenos.preçoConstrução);
          const custoTotal = valorLicenca + custoLojas + (edificio.custoConstrucao || 0);
          const temSaldo   = economiaSetores.saldo >= custoTotal;
          return (
            <motion.div
              style={{ background: "transparent" }}
              className="w-[220px] h-[320px] rounded-[20px] flex flex-col justify-center items-center shadow-lg perspective z-[2] cursor-pointer absolute"
              initial={{ scale: 1 }} transition={{ type: "spring", stiffness: 100, damping: 10 }}
              onClick={() => {
                const scrollIdx = dados[setorAtivo].licençasSetor?.findIndex((l) => l.edifíciosLiberados?.includes(nomeAtual)) ?? 0;
                atualizarDados("abrirModalLicencas", { setor: setorAtivo, scrollToIndex: scrollIdx, timestamp: Date.now() });
              }}
            >
              <div className="absolute inset-0 rounded-[20px] z-0" style={{ background: `linear-gradient(160deg, ${setorInfo.cor1}F5 0%, ${setorInfo.cor2}EE 50%, ${setorInfo.cor1}F5 100%)` }} />
              {temSaldo && (
                <>
                  <style>{`@keyframes pulso-setor-${setorAtivo} { 0%{box-shadow:0 0 8px 2px ${setorInfo.cor4}88,inset 0 0 8px 1px ${setorInfo.cor4}22;border-color:${setorInfo.cor4}} 50%{box-shadow:0 0 22px 6px ${setorInfo.cor4}CC,inset 0 0 16px 4px ${setorInfo.cor4}44;border-color:${setorInfo.cor4}FF} 100%{box-shadow:0 0 8px 2px ${setorInfo.cor4}88,inset 0 0 8px 1px ${setorInfo.cor4}22;border-color:${setorInfo.cor4}} }`}</style>
                  <div className="absolute inset-0 rounded-[20px] z-0" style={{ border: `2px solid ${setorInfo.cor4}`, borderRadius: 20, animation: `pulso-setor-${setorAtivo} 2s ease-in-out infinite` }} />
                </>
              )}
              {!temSaldo && <div className="absolute inset-0 rounded-[20px] z-0" style={{ border: `1px solid ${setorInfo.cor3}55`, borderRadius: 20 }} />}
              <div className="relative flex flex-col w-full h-full z-[2] py-2 px-3">
                <div style={{ background: temSaldo ? `${setorInfo.cor4}22` : "rgba(0,0,0,.45)", borderRadius: 8, padding: "6px 10px", marginBottom: 8, border: `1px solid ${temSaldo ? setorInfo.cor4 + "55" : setorInfo.cor4 + "33"}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <img src={licença} style={{ height: 14, opacity: 0.9 }} alt="" />
                  <span style={{ fontSize: 9, fontWeight: 800, color: temSaldo ? setorInfo.cor4 : `${setorInfo.cor4}BB`, textTransform: "uppercase", letterSpacing: ".1em" }}>
                    {temSaldo ? "✓ Pode desbloquear" : "Toque para ver licença"}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center flex-1 gap-2">
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: `conic-gradient(${setorInfo.cor4} 0%, ${setorInfo.cor3} 40%, ${setorInfo.cor2} 70%, ${setorInfo.cor4} 100%)`, padding: 3, boxShadow: temSaldo ? `0 0 20px 4px #7aff9a44` : `0 0 12px 3px ${setorInfo.cor4}44`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: `radial-gradient(circle at 35% 35%, ${setorInfo.cor3} 0%, ${setorInfo.cor1} 70%)`, display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${setorInfo.cor2}` }}>
                      <img src={getImageUrl(nomeLicencaBlocking)} alt="" style={{ width: "55%", height: "55%", objectFit: "contain", filter: "drop-shadow(0 2px 4px rgba(0,0,0,.6))" }} />
                    </div>
                  </div>
                  <span style={{ fontSize: 8, fontWeight: 700, color: `${setorInfo.cor4}AA`, textTransform: "uppercase", letterSpacing: ".1em", textAlign: "center" }}>Licença necessária</span>
                </div>
                <div style={{ display: "flex", alignItems: "stretch", gap: 4 }}>
                  <div style={{ width: "60%", background: temSaldo ? `${setorInfo.cor3}22` : "rgba(255,96,96,.1)", borderRadius: 7, padding: "5px 8px", border: `1px solid ${temSaldo ? setorInfo.cor3 + "66" : "rgba(255,96,96,.3)"}`, display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: temSaldo ? `0 0 8px 1px ${setorInfo.cor4}44` : "none" }}>
                    <div className="flex items-center gap-[4px]">
                      <img src={DolarImg} style={{ height: 10, opacity: 0.8 }} alt="" />
                      <span style={{ fontSize: 7.5, fontWeight: 700, color: "rgba(255,255,255,.6)", textTransform: "uppercase", letterSpacing: ".05em" }}>Total</span>
                    </div>
                    <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 13, fontWeight: 800, color: temSaldo ? setorInfo.cor4 : "#ff9090" }}>{formatarNumero(custoTotal)}</span>
                  </div>
                  <div style={{ width: "40%" }} />
                </div>
              </div>
            </motion.div>
          );
        })()}

        {/* Overlay sanção */}
        {((rentabilidade > 200 && quantidadeAtivoAtual === 1) || (rentabilidade >= 150 && rentabilidade < 200 && quantidadeAtivoAtual >= 3) || (rentabilidade >= 120 && rentabilidade < 150 && quantidadeAtivoAtual >= 5) || (rentabilidade >= 70 && rentabilidade < 120 && quantidadeAtivoAtual >= 10)) && (
          <motion.div style={{ background: "transparent" }} className="w-[220px] h-[320px] rounded-[20px] flex flex-col justify-center items-center shadow-lg perspective z-[2] cursor-pointer absolute" initial={{ scale: 1 }} transition={{ type: "spring", stiffness: 100, damping: 10 }}>
            <div className="absolute inset-0 rounded-[20px] z-0" style={{ background: `linear-gradient(135deg,${setorInfo.cor1} 0%,${setorInfo.cor2} 70%,${setorInfo.cor4} 100%)`, opacity: 0.9 }} />
            <motion.div className="relative flex justify-start items-center mt-[25px] flex-col w-full h-full z-[2]" animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.5, ease: "easeInOut" }} style={{ transformStyle: "preserve-3d" }}>
              <div style={{ backgroundColor: setorInfo.cor1 }} className="h-[40%] flex justify-center items-center aspect-square rounded-[20px] relative z-[2]">
                <div style={{ backgroundColor: setorInfo.cor3 }} className="flex items-center justify-center h-[95%] aspect-square rounded-[20px] absolute z-[2]"><div style={{ backgroundColor: setorInfo.cor1 }} className="flex items-center justify-center h-[95%] aspect-square rounded-[20px] absolute z-[2]"><div style={{ backgroundColor: setorInfo.cor2 }} className="flex items-center justify-center h-[95%] aspect-square rounded-[30px] absolute z-[2]"><div style={{ background: `linear-gradient(135deg,${setorInfo.cor1} 0%,${setorInfo.cor4} 100%)` }} className="flex items-center justify-center h-[95%] aspect-square rounded-[60px] absolute z-[2] relative"><img className="h-[70%] aspect-square absolute" src={sanção} alt="" /></div></div></div></div>
              </div>
              <h2 className="text-white mt-[12px] text-[15px] text-center fonteBold">SANÇÃO DE MONOPÓLIO</h2>
              <h2 className="text-white m-[12px] text-[12px] fonteBold">Por conta da alta rentabilidade, momentaneamente você não pode comprar mais desse edifício.</h2>
            </motion.div>
          </motion.div>
        )}

        {/* ════ FRENTE DO CARD ════ */}
        <div className="absolute w-full h-full flex items-center justify-center rounded-xl" style={{ background: getGradient(), mixBlendMode: "color-dodge" }}>
          <div className="w-[90%] h-[90%] flex items-center flex-col justify-between self-center">

            {/* HEADER */}
            <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full h-[22%] rounded-[10px] flex justify-between drop-shadow-xs">
              <div style={{ background: `linear-gradient(135deg,${setorInfo.cor3} 0%,${setorInfo.cor1} 100%)` }} className="h-[100%] aspect-square rounded-[10px] flex items-center justify-center">
                <img className="h-[70%]" src={getImageUrl(nomeAtual)} alt="" />
              </div>
              <div data-tooltip-id="tooltip-faturado" data-tooltip-html="Nome do edifício" className="flex p-[10px] justify-center items-center w-full h-full">
                <h1 className="text-white fonteBold text-center text-[12px]">{nomeAtual}</h1>
              </div>
            </div>

            {/* CORPO — uma única função para todas as categorias */}
            <div className="w-full flex flex-col justify-around gap-[4px]" style={{ flex: 1, padding: "4px 0" }}>
              {renderCorpoLinhas()}
            </div>

            {/* FOOTER */}
            <div className="w-full">
              <div className="flex gap-[4px] items-stretch" style={{ height: 26 }}>
                <div
                  style={{ height: 26, minWidth: 32, borderRadius: 7, background: quantidadeAtivoAtual > 0 ? "rgba(100,17,217,.2)" : "rgba(0,0,0,.28)", border: quantidadeAtivoAtual > 0 ? `1px solid ${corPowerUpAtual}` : "1px solid rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 6px", flexShrink: 0 }}
                  data-tooltip-id="tooltip-faturado" data-tooltip-html="Quantidade atual deste edifício na sua carteira"
                >
                  <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 14, fontWeight: 700, color: "#fff" }}>{quantidadeAtivoAtual}</span>
                </div>
                <button
                  onClick={comprarCard}
                  style={{ flex: 1, height: 26, borderRadius: 8, border: "none", fontFamily: "'Nunito',sans-serif", fontSize: 11, fontWeight: 700, cursor: podeComprar ? "pointer" : "not-allowed", color: "#fff", letterSpacing: ".04em", backgroundColor: podeComprar ? "#6411D9" : "#B0A7C0" }}
                  className="fonteBold" title={!podeComprar ? motivo : ""}
                >
                  Comprar
                </button>
                {edificio.licençaLiberado.liberado !== false && (() => {
                  const { terrenos: tN = 0, lojasP: pN = 0, lojasM: mN = 0, lojasG: gN = 0 } = edificio.lojasNecessarias || {};
                  const tFalta = Math.max(0, tN - (dados.terrenos.quantidade || 0));
                  const pFalta = Math.max(0, pN - (dados.lojasP.quantidade || 0));
                  const mFalta = Math.max(0, mN - (dados.lojasM.quantidade || 0));
                  const gFalta = Math.max(0, gN - (dados.lojasG.quantidade || 0));
                  const custoImovelsFaltando =
                    tFalta * dados.terrenos.preçoConstrução +
                    pFalta * (dados.lojasP.preçoConstrução + dados.lojasP.quantidadeNecTerreno * dados.terrenos.preçoConstrução) +
                    mFalta * (dados.lojasM.preçoConstrução + dados.lojasM.quantidadeNecTerreno * dados.terrenos.preçoConstrução) +
                    gFalta * (dados.lojasG.preçoConstrução + dados.lojasG.quantidadeNecTerreno * dados.terrenos.preçoConstrução);
                  const custoTotalInvestimento = custoImovelsFaltando + custoRecursos + custoConstrução;
                  const podePagar = economiaSetores.saldo >= custoTotalInvestimento;
                  return (
                    <div style={{ height: 26, borderRadius: 7, padding: "0 7px", flexShrink: 0, background: podePagar ? `${setorInfo.cor3}22` : "rgba(255,96,96,.1)", border: `1px solid ${podePagar ? setorInfo.cor3 + "55" : "rgba(255,96,96,.25)"}`, display: "flex", alignItems: "center", gap: 4, boxShadow: podePagar ? `0 0 8px 1px ${setorInfo.cor4}44` : "none" }}>
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: podePagar ? setorInfo.cor4 : "#ff6060", flexShrink: 0, boxShadow: `0 0 4px ${podePagar ? setorInfo.cor4 : "#ff6060"}` }} />
                      <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 11, fontWeight: 800, color: podePagar ? setorInfo.cor4 : "#ff9090", whiteSpace: "nowrap" }}>{formatarNumero(custoTotalInvestimento)}</span>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>

        {/* ════ VERSO DO CARD ════ */}
        <div
          className={`absolute w-full h-full flex items-center justify-center rounded-[20px] text-white transform cursor-pointer rotate-y-180 ${flipped ? "pointer-events-auto z-50" : "pointer-events-none"}`}
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden", background: `linear-gradient(135deg,${setorInfo.cor2} 0%,${setorInfo.cor3} 35%,${setorInfo.cor1} 100%)` }}
        >
          {visibleId === "constNece" && isModalOpen && (
            <div onClick={handleFlip} className="w-[90%] h-[90%] flex flex-col self-center gap-3">
              <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full h-[60px] min-h-[60px] rounded-[10px] flex justify-between overflow-hidden drop-shadow-sm">
                <div style={{ background: `linear-gradient(135deg,${setorInfo.cor3} 0%,${setorInfo.cor1} 100%)` }} className="h-full aspect-square flex items-center justify-center"><img className="h-[60%]" src={constNece} alt="ícone" /></div>
                <div className="flex p-3 justify-center items-center"><h1 className="text-white fonteBold text-[12px] uppercase tracking-wider">Requisitos de Obra</h1></div>
              </div>
              <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4 scrollbar-custom">
                {arrayConstResources.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <h2 className="text-white/50 text-[10px] font-bold uppercase px-1">Recursos de Construção (Consumidos)</h2>
                    <div className="flex flex-col gap-1.5">
                      {arrayConstResources.map((nome, idx) => (
                        <div key={`res-${idx}`} className="flex items-center justify-between bg-white/5 p-2 rounded-lg border border-white/5">
                          <div className="flex items-center gap-3">
                            <div style={{ backgroundColor: setorInfo.cor3 }} className="w-8 h-8 rounded-md flex items-center justify-center relative">
                              <img className="h-[70%] w-[70%] object-contain" src={getImageUrl(nome)} alt={nome} />
                              {!booleanPreReq(nome) && <span className="absolute -top-1 -right-1 flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span></span>}
                            </div>
                            <span className="text-[11px] text-white/90 font-medium uppercase">{nome}</span>
                          </div>
                          <span className="text-[9px] text-white/30 italic">Material</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {arrayConstNece.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <h2 className="text-white/50 text-[10px] font-bold uppercase px-1">Edifícios Necessários (Posse)</h2>
                    <div className="flex flex-col gap-1.5">
                      {arrayConstNece.map((nome, idx) => (
                        <div key={`nece-${idx}`} className="flex items-center justify-between bg-white/5 p-2 rounded-lg border border-white/5">
                          <div className="flex items-center gap-3">
                            <div style={{ backgroundColor: setorInfo.cor3 }} className="w-8 h-8 rounded-md flex items-center justify-center relative">
                              <img className="h-[70%] w-[70%] object-contain" src={getImageUrl(nome)} alt={nome} />
                              {!booleanPreReq(nome) && <span className="absolute -top-1 -right-1 flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span></span>}
                            </div>
                            <span className="text-[11px] text-white/90 font-medium uppercase">{nome}</span>
                          </div>
                          <span className="text-[9px] text-white/30 italic">Requisito</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {visibleId === "lojasNec" && isModalOpen && (
            <div onClick={handleFlip} className="w-[90%] h-[92%] flex flex-col self-center gap-3 p-1 overflow-hidden">
              <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full h-[60px] min-h-[60px] rounded-[10px] flex justify-between overflow-hidden drop-shadow-sm shrink-0">
                <div style={{ background: `linear-gradient(135deg,${setorInfo.cor3} 0%,${setorInfo.cor1} 100%)` }} className="h-full aspect-square flex items-center justify-center"><img className="h-[60%]" src={terrenoImg} alt="ícone" /></div>
                <div className="flex p-3 justify-center items-center"><h1 className="text-white fonteBold text-[12px] uppercase tracking-wider text-right">Imóveis Necessários</h1></div>
              </div>
              <div className="w-full flex-1 flex flex-col gap-2 overflow-y-auto overflow-x-hidden pr-1 scrollbar-custom">
                {[
                  { img: terrenoImg, key: "terrenos", qtdAtual: dados.terrenos.quantidade },
                  { img: LojaPImg,   key: "lojasP",   qtdAtual: dados.lojasP.quantidade   },
                  { img: LojaMImg,   key: "lojasM",   qtdAtual: dados.lojasM.quantidade   },
                  { img: LojaGImg,   key: "lojasG",   qtdAtual: dados.lojasG.quantidade   },
                ].map(({ img, key, qtdAtual }) => {
                  const necessarios  = edificio.lojasNecessarias[key];
                  const valorFalta   = contabilidadeDeFalta(key);
                  const temSuficiente = qtdAtual >= necessarios;
                  return (
                    <div key={key} className="w-full h-[65px] flex items-center gap-3 bg-black/20 p-2 rounded-xl border border-white/5 shrink-0">
                      <div style={{ backgroundColor: setorInfo.cor1 }} className="h-11 w-11 rounded-lg flex items-center justify-center shrink-0 shadow-inner"><img className="h-[65%] object-contain" src={img} alt="" /></div>
                      <div className="flex-1 flex flex-row items-center justify-center gap-2">
                        <span className={`text-[18px] font-bold tracking-tight ${temSuficiente ? 'text-green-400' : 'text-white'}`}>{qtdAtual}</span>
                        <span className="text-white/20 text-[12px] font-light">/</span>
                        <span className="text-white/40 text-[14px] font-semibold">{necessarios}</span>
                      </div>
                      <div style={{ backgroundColor: setorInfo.cor2 }} className="h-full min-w-[52px] px-2 flex flex-col justify-center items-center rounded-lg border border-white/5 shadow-sm">
                        <span className="text-white/30 text-[7px] uppercase font-bold mb-0.5 tracking-tighter">Custo Falta</span>
                        <h2 className={`text-[10px] font-bold ${temSuficiente ? 'text-green-400/80' : 'text-white'}`}>{valorFalta > 0 ? formatarNumero(valorFalta) : "OK"}</h2>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {visibleId === "powerUp" && isModalOpen && (
            <div onClick={handleFlip} className="w-[90%] h-[90%] flex items-center flex-col justify-around self-center">
              <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full h-[20%] rounded-[10px] flex justify-between">
                <div style={{ background: `linear-gradient(135deg,${setorInfo.cor4} 0%,${corPowerUpAtual} 30%,#350973 70%,${setorInfo.cor1} 100%)` }} className="h-[100%] aspect-square rounded-[10px] flex items-center justify-center">
                  <img className="h-[70%] rotate-[270deg]" src={PróximoImg} alt="" />
                </div>
                <div className="flex p-[10px] justify-center items-center"><h1 className="text-white fonteBold text-[12px]">Power Ups</h1></div>
              </div>
              <div className="h-[20%] w-full flex justify-between flex-col items-center">
                <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full flex items-center justify-center rounded-[10px] p-[5px] h-full">
                  <div className="w-[100%] rounded-[20px] flex justify-around items-center h-full">
                    {[{ bg: "#8F5ADA", nv: "nível1" }, { bg: "#6411D9", nv: "nível2" }, { bg: "#350973", nv: "nível3" }].map(({ bg, nv }) => (
                      <div key={nv} data-tooltip-id="tooltip-faturado" data-tooltip-html={`Qtd mínima para Power Up ${nv}`} style={{ backgroundColor: setorInfo.cor2 }} className="flex justify-around items-center w-[30%] h-full rounded-[10px] p-[2px]">
                        <div style={{ backgroundColor: bg }} className="w-[80%] aspect-square rounded-[7px] flex items-center justify-center hover:scale-[1.20] duration-300 ease-in-out cursor-pointer"><img className="h-[70%] aspect-square rotate-[270deg]" src={PróximoImg} /></div>
                        <div className="flex justify-center items-center w-full"><h2 className="text-white text-[10px] fonteBold">{edificio.powerUp[nv].quantidadeMínima}</h2></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ backgroundColor: setorInfo.cor2 }} className="h-[50%] w-full rounded-[10px] flex flex-col items-center justify-around">
                <p className="text-white text-[10px] h-[65%] p-[5px]">{edificio.desc}.</p>
                <button data-tooltip-id="tooltip-faturado" data-tooltip-html="Exibe tabela com todos os power-ups deste edifício." onClick={openModalPowerUps} className="w-[85%] h-[25%] z-50 text-white text-[10px] bg-[#6411D9] rounded-[10px] hover:scale-[1.10] duration-300 ease-in-out">Todos power ups</button>
              </div>
            </div>
          )}

          {visibleId === "finançasEd" && isModalOpen && (
            <div onClick={handleFlip} className="w-[90%] h-[90%] flex items-center flex-col justify-between self-center relative z-[20] overflow-visible" style={{ pointerEvents: "auto" }}>
              <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full h-[20%] rounded-[10px] flex justify-between">
                <div className="h-[100%] aspect-square rounded-[10px] flex items-center justify-center" style={{ background: `linear-gradient(135deg,${setorInfo.cor3} 0%,${setorInfo.cor1} 100%)` }}><img className="h-[70%]" src={DolarImg} alt="" /></div>
                <div className="flex p-[10px] justify-center items-center"><h1 className="text-white fonteBold text-[12px]">Finanças do edifício</h1></div>
              </div>
              {[
                [{ img: imgFatuMensal,      text: "Faturamento mensal estimado\ncaso você detenha o edifício por um mês.", val: formatarNumero(valorFatu * 30) },
                 { img: imgImpostoFixo,     text: "Imposto fixo mensal\nValor fixo cobrado ao fim do mês.",              val: formatarNumero(valorImpostoFixo) }],
                [{ img: imgFaturamentoDiario, text: "Faturamento diário médio na economia estável.",                      val: formatarNumero(valorFatu) },
                 { img: imgImpostoSFatu,    text: "Imposto sobre faturamento mensal.",                                    val: formatarNumero(valorFatu * 30 * impostoSobreFatu) }],
                [{ img: porcem,             text: "Rendimento atual do edifício\nVaria conforme a economia do setor.",    val: `${rentabilidade.toFixed(0)}%` },
                 { img: imgPercFatu,        text: "Porcentagem do imposto sobre faturamento.",                            val: `${(impostoSobreFatu * 100).toFixed(0)}%` }],
                [{ img: imgLucro,           text: "Lucro líquido mensal\nFaturamento menos todos os impostos.",           val: formatarNumero(valorFatu * 30 - (valorFatu * 30 * impostoSobreFatu + valorImpostoFixo)) },
                 { img: imgSomaImposto,     text: "Total de impostos mensais\nImposto fixo + imposto sobre faturamento.", val: formatarNumero(valorFatu * 30 * impostoSobreFatu + valorImpostoFixo) }],
              ].map((row, ri) => (
                <div key={ri} className="flex w-full h-[15%] justify-around">
                  {row.map(({ img, text, val }, ci) => (
                    <div key={ci} style={{ backgroundColor: setorInfo.cor2 }} className="flex justify-between rounded-[10px] items-center h-full w-[45%]">
                      <div className="h-full flex items-center justify-center aspect-square rounded-[10px]" style={{ backgroundColor: setorInfo.cor1 }}>
                        <TooltipCustom text={text}><img className="h-[20px]" src={img} alt="" /></TooltipCustom>
                      </div>
                      <h2 className="text-white mr-[8px] text-[15px] fonteBold">{val}</h2>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export const CardModal = React.memo(CardModalBase);