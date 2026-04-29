import React, { useEffect, useMemo, useCallback, useContext, useState, useRef } from "react";
import { useCentralStore, EDIFICIOS_BASE_DINAMICOS, EDIFICIOS_FINAIS_DINAMICOS_INICIAL,LICENCAS_DINAMICAS_GLOBAIS } from "../stores/useCentralStore";
import {
  EDIFICIOS_FINAIS_ESTATICOS,
  LICENCAS_ESTATICAS,
  EDIFICIOS_BASE_ESTATICOS,
  LICENCAS_ESTATICAS_GLOBAIS,
} from "../stores/dadosEstáticos";

import porcem from "../../public/outrasImagens/simbolo-de-porcentagem.png";
import passive from "../../public/outrasImagens/rendaPassiva.png";
import sell from "../../public/outrasImagens/sellContracts.png";
import terrenoImg from "../../public/outrasImagens/terreno.png";
import constNece from "../../public/outrasImagens/construção necessária.png";
import PróximoImg from "../../public/outrasImagens/proximo.png";
import ConstuirImg from "../../public/outrasImagens/martelo.png";
import licença from "../../public/outrasImagens/licença.png";
import agricultura from "../../public/outrasImagens/setores/agricultura.png";
import tecnologia from "../../public/outrasImagens/setores/tecnologia.png";
import comercio from "../../public/outrasImagens/setores/comercio.png";
import industria from "../../public/outrasImagens/setores/industria.png";
import imobiliario from "../../public/outrasImagens/setores/imobiliario.png";
import energia from "../../public/outrasImagens/setores/torre-eletrica.png";
import grafico from "../../public/outrasImagens/setores/grafico.png";
import DolarImg from "../../public/outrasImagens/simbolo-do-dolar.png";
import { motion } from "framer-motion";
import LojaPImg from "../../public/outrasImagens/lojaP.png";
import LojaMImg from "../../public/outrasImagens/lojaM.png";
import LojaGImg from "../../public/outrasImagens/lojaG.png";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import LicenseNec from "./licenseNec";
import fechar from "../../public/outrasImagens/fechar.png";
import imgLucro from "../../public/outrasImagens/imgLucroLiquido.png";
import imgFatuMensal from "../../public/outrasImagens/imgFaturamentoMensal.png";
import imgPercFatu from "../../public/outrasImagens/imgPercFaturamento.png";
import imgSomaImposto from "../../public/outrasImagens/imgSomaImpostos.png";
import imgImpostoFixo from "../../public/outrasImagens/imgImpostoFixo.png";
import imgFaturamentoDiario from "../../public/outrasImagens/imgFaturamentoDiario.png";
import imgImpostoSFatu from "../../public/outrasImagens/imgImpostoSfatu.png";
import sanção from "../../public/outrasImagens/sanção.png";
import { createPortal } from "react-dom";
import useSound from "use-sound";
import purchaseEdifAudio from "../../public/sounds/purchaseEdifAudio.mp3";
import estoque from "../../public/outrasImagens/estoque.png";
import component from "../../public/outrasImagens/component.png";
import { FORMULAS_EDIFICIOS } from "./productionFormulasConfig";
import { productsCatalog } from "./TablePrice";
import { storageProfiles } from "./GameContext";
import { SALES_EDIFICIOS } from "./salesFormulasConfig";

const getImageUrl = (nome) => `/imagens/${nome}.png`;

// ═══════════════════════════════════════════════════════════
// HELPERS — fora do componente (sem recriação a cada render)
// ═══════════════════════════════════════════════════════════
const iconsCatArmazenamento = [
  { categoria: "agrícolas secos", icon: "🌾" },
  { categoria: "biomassa / orgânicos", icon: "🌱" },
  { categoria: "produtos manufaturados", icon: "📦" },
  { categoria: "animais", icon: "🐄" },
  { categoria: "perecíveis", icon: "🥩" },
  { categoria: "componentes eletrônicos", icon: "🔌" },
  { categoria: "bens de alto valor", icon: "💎" },
  { categoria: "componentes industriais", icon: "⚙️" },
  { categoria: "químicos", icon: "🧪" },
  { categoria: "minério", icon: "🪨" },
  { categoria: "fluidos", icon: "💧" },
  { categoria: "veículos", icon: "🚗" },
  { categoria: "aeronaves", icon: "✈️" },
  { categoria: "energia", icon: "⚡" },
  { categoria: "produtos digitais", icon: "💾" },
  { categoria: "materiais sensíveis", icon: "⚠️" },
];

const storageIconMap = Object.fromEntries(
  iconsCatArmazenamento.map((item) => [item.categoria, item.icon])
);

const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

// ── Sub-componentes auxiliares ────────────────────────────────────────────────

const _ImoveisBaseIcons = ({ edificioBase, edificioEstatico, cor1, onClickLojas }) => (
  <div className="flex gap-[3px] flex-wrap">
    {[
      { img: terrenoImg, key: "terrenos", qtd: edificioBase.terrenos.quantidade },
      { img: LojaPImg,   key: "lojasP",   qtd: edificioBase.lojasP.quantidade },
      { img: LojaMImg,   key: "lojasM",   qtd: edificioBase.lojasM.quantidade },
      { img: LojaGImg,   key: "lojasG",   qtd: edificioBase.lojasG.quantidade },
    ].map(({ img, key, qtd }) => {
      const nec = edificioEstatico.lojasNecessarias[key];
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

const _ConstNecIcons = ({ arrayConstNece, arrayConstResources, cor1, onClickConstr, booleanPreReq }) => {
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

const _ImoveisECustoRow = ({ edificioBase, edificioEstatico, cor1, setorInfo, formatarNumero, onClickLojas }) => (
  <div className="flex gap-[3px]" style={{ minHeight: 30 }}>
    <div
      style={{ width: "70%", background: "rgba(0,0,0,.32)", borderRadius: 6, padding: "4px 7px", display: "flex", flexDirection: "column", gap: 2, cursor: "pointer" }}
      onClick={onClickLojas}
      data-tooltip-id="tooltip-faturado"
      data-tooltip-html="Imóveis base necessários para construir"
    >
      <span style={{ fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "rgba(255,255,255,.3)" }}>Imóveis base</span>
      <_ImoveisBaseIcons edificioBase={edificioBase} edificioEstatico={edificioEstatico} cor1={cor1} onClickLojas={onClickLojas} />
    </div>
    <div
      style={{ width: "30%", background: setorInfo.cor3, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}
      data-tooltip-id="tooltip-faturado"
      data-tooltip-html="Custo de construção do edifício"
    >
      <img src={ConstuirImg} style={{ height: 13, aspectRatio: "1" }} alt="" />
      <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 12, fontWeight: 700, color: "#fff" }}>
        {formatarNumero(edificioEstatico.custoConstrucao)}
      </span>
    </div>
  </div>
);

const _ImoveisSMartelo = ({ edificioBase, edificioEstatico, cor1, onClickLojas }) => (
  <div
    style={{ width: "100%", height: "100%", borderRadius: 6, display: "flex", flexDirection: "column", justifyContent: "center", cursor: "pointer" }}
    onClick={onClickLojas}
    data-tooltip-id="tooltip-faturado"
    data-tooltip-html="Imóveis base necessários para construir"
  >
    <span style={{ fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "rgba(255,255,255,.3)", marginBottom: 2 }}>
      Imóveis base
    </span>
    <div className="flex items-center">
      <_ImoveisBaseIcons edificioBase={edificioBase} edificioEstatico={edificioEstatico} cor1={cor1} onClickLojas={onClickLojas} />
    </div>
  </div>
);

const _ConstrERecursosRow = ({ arrayConstNece, arrayConstResources, cor1, setorInfo, onClickConstr, booleanPreReq }) => {
  const temConstr   = (arrayConstNece     || []).length > 0;
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
          ? <_ConstNecIcons arrayConstNece={arrayConstNece} arrayConstResources={[]} cor1={cor1} onClickConstr={onClickConstr} booleanPreReq={booleanPreReq} />
          : <span style={{ fontSize: 8, color: "rgba(255,255,255,.2)" }}>—</span>}
      </div>
      <div
        style={{ width: "40%", background: "rgba(0,0,0,.32)", borderRadius: 6, padding: "4px 7px", display: "flex", flexDirection: "column", gap: 2, cursor: "pointer" }}
        onClick={onClickConstr}
        data-tooltip-id="tooltip-faturado"
        data-tooltip-html="Recursos de construção consumidos"
      >
        <span style={{ fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "rgba(255,255,255,.3)" }}>Recursos</span>
        {temRecursos
          ? <_ConstNecIcons arrayConstNece={[]} arrayConstResources={arrayConstResources} cor1={cor1} onClickConstr={onClickConstr} booleanPreReq={booleanPreReq} />
          : <span style={{ fontSize: 8, color: "rgba(255,255,255,.2)" }}>—</span>}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
//  CARD MODAL — componente principal
// ═══════════════════════════════════════════════════════════
const CardModalBase = ({ index }) => {
  // ── DadosEconomyGlobalContext (inalterado) ────────────────
  const { economiaSetores, atualizarEco, verificarLimites } = useContext(DadosEconomyGlobalContext);

  // ── Zustand — seletores granulares ───────────────────────
  const setorAtivo       = useCentralStore((s) => s.setorAtivo);
  const edificioBase     = useCentralStore((s) => s.edificiosBase);          // terrenos/lojasP/M/G dinâmico
  const edificiosDin     = useCentralStore((s) => s.edificiosFinais[setorAtivo]); // array dinâmico do setor
  const atualizarDados   = useCentralStore((s) => s.atualizarDados);
  const atualizarLote    = useCentralStore((s) => s.atualizarLote);

  // ── Dados estáticos — zero reatividade ───────────────────
  const edificioEstatico = EDIFICIOS_FINAIS_ESTATICOS[setorAtivo]?.edificios[index];
 const edificioDinamico = edificiosDin?.edificios?.[index];// { liberado, quantidade, powerUp }


  // ── Economia do setor (Context permanece) ────────────────
  const economiaSetor = economiaSetores[setorAtivo]?.economiaSetor?.estadoAtual ?? "estável";

  const [buttonPurchaseEdifAudio] = useSound(purchaseEdifAudio);

  // ── Listas de categorias ──────────────────────────────────
  const productions = [
    "Plantação De Grãos","Fazenda De Vacas","Plantação De Eucalipto","Granja De Aves","Criação De Ovinos",
    "Serraria","Fábrica De Smartphones","Fábrica De Computadores","Fábrica De Consoles De Jogos",
    "Fábrica De Dispositivos Vestíveis","Fábrica De Rações","Fábrica De Embalagens","Fábrica De Fertilizantes",
    "Fábrica Têxtil","Fábrica De Calçados","Fábrica De Roupas","Fábrica De Celulose","Fábrica De Papel",
    "Fábrica De Livros","Fábrica De Medicamentos","Laboratório Farmacêutico","Fábrica De Plásticos",
    "Fábrica De Químicos Especializados","Alto-Forno","Usina Siderúrgica","Fundição De Alumínio",
    "Fábrica De Ligas Metálicas","Indústria De Componentes Mecânicos","Fábrica De Chapas Metálicas",
    "Fábrica De Estruturas Metálicas","Fábrica De Peças Automotivas","Montadora De Veículos Elétricos",
    "Fábrica De Automóveis","Refinaria","Biofábrica","Fábrica De Chips","Fábrica De Placas Eletrônicas",
    "Fábrica De Semicondutores","Fábrica De Robôs","Fábrica De Motores","Fábrica De Foguetes",
    "Fábrica De Aeronaves","Estaleiro","Fábrica De Turbinas Eólicas","Fábrica De Painéis Solares","Fábrica De Baterias",
  ];
  const sellFinal = [
    "Livraria","Mercado","Açougue","Petshop","Farmácia","Loja De Calçados","Loja De Vestuário",
    "Loja De Gadgets E Wearables","Loja De Games","Loja De Celulares","Loja De Informática",
    "Loja De Eletrônicos","Concessionária De Veículos",
  ];
  const edificiosDeArmazenamento = [
    "Armazém","Silo","Depósito De Resíduos Orgânicos","Data Center","Servidor Em Nuvem","Armazém Logístico",
    "Centro De Distribuição","Fábrica De Tanque De Armazenamento Biocombustível","Centro De Coleta De Biomassa",
    "Campo De Estocagem","Armazém De Materiais Brutos","Câmara Fria","Container Modular","Pátio De Veículos",
    "Armazém Industrial","Armazém De Materiais Sensíveis","Hangar","Pátio De Mineração",
  ];

  // ── Nome e categoria ──────────────────────────────────────
  const nomeAtual = edificioEstatico?.nome ?? "";
  const categoriaEdificio = (() => {
    if (edificiosDeArmazenamento.includes(nomeAtual)) return "estoque";
    if (productions.includes(nomeAtual))              return "producao";
    if (sellFinal.includes(nomeAtual))                return "venda";
    return "passiva";
  })();
  const isEstoque  = categoriaEdificio === "estoque";
  const isProducao = categoriaEdificio === "producao";
  const isVenda    = categoriaEdificio === "venda";
  const isPassiva  = categoriaEdificio === "passiva";

  // ── Mapa de setores (visual) ──────────────────────────────
  const setores = [
    { id: "agricultura", img: agricultura, cor1: "#003816", cor2: "#1A5E2A", cor3: "#0C9123", cor4: "#4CAF50" },
    { id: "tecnologia",  img: tecnologia,  cor1: "#A64B00", cor2: "#D45A00", cor3: "#FF6F00", cor4: "#FF8C42" },
    { id: "industria",   img: industria,   cor1: "#1A1A1A", cor2: "#4D4D4D", cor3: "#808080", cor4: "#B3B3B3" },
    { id: "comercio",    img: comercio,    cor1: "#660000", cor2: "#A31919", cor3: "#E60000", cor4: "#FF4D4D" },
    { id: "imobiliario", img: imobiliario, cor1: "#000066", cor2: "#1A1A8C", cor3: "#3333CC", cor4: "#6666FF" },
    { id: "energia",     img: energia,     cor1: "#665200", cor2: "#A37F19", cor3: "#E6B800", cor4: "#FFD966" },
    { id: "grafico",     img: grafico,     cor1: "#6A00FF", cor2: "#6A00FF", cor3: "#6A00FF", cor4: "#6A00FF" },
  ];

  // ── Estado local ──────────────────────────────────────────
  const [isModalOpen,   setIsModalOpen]   = useState(true);
  const [visibleId,     setVisibleId]     = useState("lojasNec");
  const [modalPowerup,  setModalPowerUp]  = useState(false);
  const [verificadorDeLojasNecessárias,   setVerificador]      = useState(true);
  const [verificadorDeConstruçõesNecessárias, setVerificadorConstr] = useState(true);
  const [flipped,       setFlipped]       = useState(false);
  const [acumuladorPowerUpRedCustoFornece, setAcumuladorPowerUpRedCustoFornece] = useState(0);
  const [acumuladorPowerUpAumFatuFornece,  setAcumuladorPowerUpAumFatuFornece]  = useState(0);
  const [acumuladorPowerUpRedCustoRecebe,  setAcumuladorPowerUpRedCustoRecebe]  = useState(0);
  const [acumuladorPowerUpAumFatuRecebe,   setAcumuladorPowerUpAumFatuRecebe]   = useState(0);

  // ── Derivações estáticas ──────────────────────────────────
  const setorInfo                   = setores.find((s) => s.id === setorAtivo);
  const quantidadeMinimaPowerUpNv2  = edificioEstatico?.powerUp?.nível2?.quantidadeMínima ?? 20;
  const quantidadeMinimaPowerUpNv3  = edificioEstatico?.powerUp?.nível3?.quantidadeMínima ?? 100;
  const arrayConstResources         = edificioEstatico?.recursoDeConstrução   ?? [];
  const arrayConstNece              = edificioEstatico?.construçõesNecessárias ?? [];
  const corPadrão                   = { backgroundColor: setorInfo.cor2 };

  // ── Derivações dinâmicas ──────────────────────────────────
  const quantidadeAtivoAtual = edificioDinamico?.quantidade ?? 0;
  const liberado = edificioDinamico?.licençaLiberado?.liberado ?? false;
// console.log(liberado)
  // ── PowerUp ───────────────────────────────────────────────
  const corPowerUp = (pu) => {
    switch (pu) {
      case "powerUpNv1": return "#8F5ADA";
      case "powerUpNv2": return "#6411D9";
      case "powerUpNv3": return "#350973";
      default:           return corPadrão;
    }
  };
  const powerUpSelecionado = quantidadeAtivoAtual >= quantidadeMinimaPowerUpNv3 ? "powerUpNv3"
                           : quantidadeAtivoAtual >= quantidadeMinimaPowerUpNv2 ? "powerUpNv2"
                           : "powerUpNv1";
  const corPowerUpAtual = corPowerUp(powerUpSelecionado);
  const corLinha        = quantidadeAtivoAtual > 0 ? corPowerUpAtual : corPadrão;
  const bgColuna1       = corLinha === "#8F5ADA" ? corPowerUp("powerUpNv1") : powerUpSelecionado === "powerUpNv2" ? corPowerUp("powerUpNv2") : powerUpSelecionado === "powerUpNv3" ? corPowerUp("powerUpNv3") : corPadrão;
  const bgColuna2       = powerUpSelecionado === "powerUpNv1" ? corPadrão : powerUpSelecionado === "powerUpNv2" ? corPowerUp("powerUpNv2") : corPowerUp("powerUpNv3");
  const bgColuna3       = powerUpSelecionado === "powerUpNv1" ? corPadrão : powerUpSelecionado === "powerUpNv2" ? corPadrão : corPowerUp("powerUpNv3");

  // ── Financeiro (tudo via estáticos) ───────────────────────
  const valorFatu      = edificioEstatico?.finanças?.faturamentoUnitário ?? 0;
  const valorImpostoFixo = edificioEstatico?.finanças?.impostoFixo       ?? 0;
  const impostoSobreFatu = edificioEstatico?.finanças?.impostoSobreFatu  ?? 0;
  const custoConstrução  = edificioEstatico?.custoConstrucao             ?? 0;
  const fatorEconomico   = { recessão: 0.4, declinio: 0.8, estável: 1, progressiva: 1.1, aquecida: 1.25 }[economiaSetor] ?? 1;

  const impostoSobreFatuFinal = impostoSobreFatu  - impostoSobreFatu  * (acumuladorPowerUpRedCustoRecebe / 100);
  const valorFatuFinal        = valorFatu          + valorFatu         * (acumuladorPowerUpAumFatuRecebe  / 100);
  const valorImpostoFixoFinal = valorImpostoFixo   - valorImpostoFixo  * (acumuladorPowerUpRedCustoRecebe / 100);

  // ── Custo total de imóveis base ───────────────────────────
  const tNec = edificioEstatico?.lojasNecessarias?.terrenos ?? 0;
  const pNec = edificioEstatico?.lojasNecessarias?.lojasP   ?? 0;
  const mNec = edificioEstatico?.lojasNecessarias?.lojasM   ?? 0;
  const gNec = edificioEstatico?.lojasNecessarias?.lojasG   ?? 0;

  const tPC = EDIFICIOS_BASE_ESTATICOS.terrenos.preçoConstrução;
  const pPC = EDIFICIOS_BASE_ESTATICOS.lojasP.preçoConstrução;
  const mPC = EDIFICIOS_BASE_ESTATICOS.lojasM.preçoConstrução;
  const gPC = EDIFICIOS_BASE_ESTATICOS.lojasG.preçoConstrução;
  const tQNT = EDIFICIOS_BASE_ESTATICOS.lojasP.quantidadeNecTerreno;
  const mQNT = EDIFICIOS_BASE_ESTATICOS.lojasM.quantidadeNecTerreno;
  const gQNT = EDIFICIOS_BASE_ESTATICOS.lojasG.quantidadeNecTerreno;

  const CustoTotalSomadoLojas =
    tNec * tPC +
    pNec * (pPC + tQNT * tPC) +
    mNec * (mPC + mQNT * tPC) +
    gNec * (gPC + gQNT * tPC);

  // ── calcularCustoRecurso (usa estáticos) ──────────────────
  function calcularCustoRecurso(nomeRecurso) {
    for (const setor of setoresArr) {
      const edEst = EDIFICIOS_FINAIS_ESTATICOS[setor]?.edificios?.find((e) => e.nome === nomeRecurso);
      if (edEst) {
        const c    = edEst.custoConstrucao || 0;
        const tN2  = edEst.lojasNecessarias?.terrenos ?? 0;
        const pN2  = edEst.lojasNecessarias?.lojasP   ?? 0;
        const mN2  = edEst.lojasNecessarias?.lojasM   ?? 0;
        const gN2  = edEst.lojasNecessarias?.lojasG   ?? 0;
        let total  = c + tN2 * tPC + pN2 * (pPC + tQNT * tPC) + mN2 * (mPC + mQNT * tPC) + gN2 * (gPC + gQNT * tPC);
        if (Array.isArray(edEst.recursoDeConstrução) && edEst.recursoDeConstrução.length > 0) {
          edEst.recursoDeConstrução.forEach((sub) => { total += calcularCustoRecurso(sub); });
        }
        return total;
      }
    }
    return 0;
  }

  const custoRecursos = useMemo(() => {
    let total = 0;
    arrayConstResources?.forEach((nome) => { total += calcularCustoRecurso(nome); });
    return total;
    // deps: apenas estáticos — nunca mudam em runtime
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrayConstResources]);

  const fatuMensal           = valorFatuFinal * 30 * fatorEconomico;
  const valorImpostoSobreFatu = fatuMensal * impostoSobreFatuFinal;
  const valorFinalMês        = fatuMensal - valorImpostoSobreFatu - valorImpostoFixoFinal;
  const rentabilidade        = CustoTotalSomadoLojas + custoRecursos + custoConstrução > 0
    ? (valorFinalMês / (CustoTotalSomadoLojas + custoRecursos + custoConstrução)) * 100
    : 0;
  const paybackDias = rentabilidade > 0 ? Math.ceil((100 / rentabilidade) * 30) : null;

  // ── Produtos (FORMULAS_EDIFICIOS é estático) ──────────────
  const edificioData    = FORMULAS_EDIFICIOS.find((e) => e.nomeEdificio === nomeAtual);
  const todosOutputsIds = edificioData
    ? [...new Set(edificioData.formulas.flatMap((f) => Object.keys(f.output)))]
    : [];

  // ── booleanPreReq — lê snapshot via getState(), zero assinatura ──
  const booleanPreReq = useCallback((nomeEd) => {
    const { edificiosFinais } = useCentralStore.getState();
    for (const setor of setoresArr) {
      const idx = EDIFICIOS_FINAIS_ESTATICOS[setor]?.edificios?.findIndex((e) => e.nome === nomeEd) ?? -1;
      if (idx !== -1) return (edificiosFinais[setor]?.[idx]?.quantidade ?? 0) > 0;
    }
    return false;
  }, []); // deps vazias — usa getState() em vez de assinatura reativa

  // ── contabilidadeDeFalta ──────────────────────────────────
  const contabilidadeDeFalta = (key) => {
    const qtdAtual    = edificioBase[key]?.quantidade ?? 0;
    const qtdNec      = edificioEstatico?.lojasNecessarias?.[key] ?? 0;
    const qtdFalta    = qtdAtual >= qtdNec ? 0 : qtdNec - qtdAtual;
    const custoUnit   = key === "terrenos" ? tPC
                      : key === "lojasP"   ? pPC + tQNT * tPC
                      : key === "lojasM"   ? mPC + mQNT * tPC
                      :                     gPC + gQNT * tPC;
    return qtdFalta * custoUnit;
  };

  // ── useEffect: verificação de imóveis ────────────────────
  useEffect(() => {
    const ok =
      edificioBase.terrenos.quantidade >= tNec &&
      edificioBase.lojasP.quantidade   >= pNec &&
      edificioBase.lojasM.quantidade   >= mNec &&
      edificioBase.lojasG.quantidade   >= gNec;
    setVerificador(ok);
  }, [edificioBase.terrenos.quantidade, edificioBase.lojasP.quantidade, edificioBase.lojasM.quantidade, edificioBase.lojasG.quantidade, tNec, pNec, mNec, gNec]);

  // ── useEffect: verificação de construções necessárias ────
  useEffect(() => {
    const verificar = (lista) =>
      (lista || []).some((nome) => {
        const { edificiosFinais } = useCentralStore.getState();
        for (const s of setoresArr) {
          const idx = EDIFICIOS_FINAIS_ESTATICOS[s]?.edificios?.findIndex((e) => e.nome === nome) ?? -1;
          if (idx !== -1) return (edificiosFinais[s]?.[idx]?.quantidade ?? 0) <= 0;
        }
        return true;
      });
    setVerificadorConstr(verificar(arrayConstResources) || verificar(arrayConstNece));
  }, [arrayConstResources, arrayConstNece, quantidadeAtivoAtual]);

  // ── useEffect: acumulador powerUp Fornece ─────────────────
  useEffect(() => {
    let r = 0, a = 0;
    const { edificiosFinais } = useCentralStore.getState();
    edificioEstatico?.ForneceMelhoraEficiencia?.forEach((ed) => {
      for (const s of setoresArr) {
        const idx = EDIFICIOS_FINAIS_ESTATICOS[s]?.edificios?.findIndex((e) => e.nome === ed.nome) ?? -1;
        if (idx !== -1) {
          const qtdM = edificiosFinais[s]?.[idx]?.quantidade ?? 0;
          const pu   = powerUpSelecionado;
          if (qtdM > 0) {
            r += pu === "powerUpNv1" ? ed.redCusto.nível1 : pu === "powerUpNv2" ? ed.redCusto.nível2 : ed.redCusto.nível3;
            a += pu === "powerUpNv1" ? ed.aumFatu.nível1  : pu === "powerUpNv2" ? ed.aumFatu.nível2  : ed.aumFatu.nível3;
          }
          break;
        }
      }
    });
    setAcumuladorPowerUpRedCustoFornece(r);
    setAcumuladorPowerUpAumFatuFornece(a);
  }, [quantidadeAtivoAtual, powerUpSelecionado]);

  // ── useEffect: acumulador powerUp Recebe ─────────────────
  useEffect(() => {
    let r = 0, a = 0;
    const { edificiosFinais } = useCentralStore.getState();
    edificioEstatico?.RecebeMelhoraEficiencia?.forEach((ed) => {
      for (const s of setoresArr) {
        const idx = EDIFICIOS_FINAIS_ESTATICOS[s]?.edificios?.findIndex((e) => e.nome === ed.nome) ?? -1;
        if (idx !== -1) {
          const qtdM = edificiosFinais[s]?.[idx]?.quantidade ?? 0;
          const pu   = powerUpSelecionado;
          if (qtdM > 0) {
            r += pu === "powerUpNv1" ? ed.redCusto.nível1 : pu === "powerUpNv2" ? ed.redCusto.nível2 : ed.redCusto.nível3;
            a += pu === "powerUpNv1" ? ed.aumFatu.nível1  : pu === "powerUpNv2" ? ed.aumFatu.nível2  : ed.aumFatu.nível3;
          }
          break;
        }
      }
    });
    setAcumuladorPowerUpRedCustoRecebe(r);
    setAcumuladorPowerUpAumFatuRecebe(a);
  }, [quantidadeAtivoAtual, powerUpSelecionado]);

  // ── Handlers ─────────────────────────────────────────────
  let timer;
  const handleFlip      = () => setFlipped((f) => !f);
  const handleShow      = (id) => setVisibleId(id);
  const openModalPowerUps  = () => setModalPowerUp(true);
  const fecharModalPowerUp = () => setModalPowerUp(false);
  const handleMouseEnter   = () => { timer = setTimeout(() => setIsModalOpen(true), 0); };

  const onClickLojas   = () => { handleShow("lojasNec");   handleFlip(); };
  const onClickConstr  = () => { handleShow("constNece");  handleFlip(); };
  const onClickFinancas = () => { handleShow("finançasEd"); handleFlip(); };
  const onClickPowerUp  = () => { handleMouseEnter(); handleShow("powerUp"); handleFlip(); };

  // ── Tooltip customizado ───────────────────────────────────
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

  // ── podeComprarCard ───────────────────────────────────────
  const podeComprarCard = () => {
    if (!edificioEstatico) return { ok: false, motivo: "Edifício não encontrado" };
    const carteira  = economiaSetores?.carteira?.carteiraAtual ?? [];
    const resultado = verificarLimites(edificioEstatico, setorAtivo, carteira);
    if (resultado !== true) return { ok: false, motivo: resultado };
    const custo = Number(edificioEstatico.custoConstrucao ?? 0);
    if (economiaSetores.saldo < custo) return { ok: false, motivo: "Saldo insuficiente" };
    if (
      edificioBase.terrenos.quantidade < tNec ||
      edificioBase.lojasP.quantidade   < pNec ||
      edificioBase.lojasM.quantidade   < mNec ||
      edificioBase.lojasG.quantidade   < gNec
    ) return { ok: false, motivo: "Você não tem lojas ou terrenos suficientes" };
    if (edificioEstatico.construçõesNecessárias?.length) {
      for (const nome of edificioEstatico.construçõesNecessárias) {
        if (!booleanPreReq(nome)) return { ok: false, motivo: `Precisa de 1 unidade de "${nome}"` };
      }
    }
    if (edificioEstatico.recursoDeConstrução?.length) {
      for (const nome of edificioEstatico.recursoDeConstrução) {
        if (!booleanPreReq(nome)) return { ok: false, motivo: `Precisa de 1 unidade de "${nome}"` };
      }
    }
    return { ok: true };
  };
  const { ok: podeComprar, motivo } = podeComprarCard();

  // ── comprarCard — um único atualizarLote ──────────────────
  const comprarCard = () => {
    if (!edificioEstatico) {
      atualizarDados("modalAlert", { estadoModal: true, head: "Erro", content: "Edifício não encontrado." });
      return;
    }
    const carteira = economiaSetores?.carteira?.carteiraAtual ?? [];
    if (verificarLimites('edificiosFinais', setorAtivo, carteira) !== true) return;

    const custo = Number(edificioEstatico.custoConstrucao ?? 0);
    if (economiaSetores.saldo < custo) {
      atualizarDados("modalAlert", { estadoModal: true, head: "Erro na construção", content: "Você não tem dinheiro suficiente." });
      return;
    }

    const qTa = edificioBase.terrenos.quantidade;
    const qPa = edificioBase.lojasP.quantidade;
    const qMa = edificioBase.lojasM.quantidade;
    const qGa = edificioBase.lojasG.quantidade;

    if (tNec > qTa || pNec > qPa || mNec > qMa || gNec > qGa) {
      atualizarDados("modalAlert", { estadoModal: true, head: "Falta edifícios base", content: "Não tem lojas/terrenos suficientes." });
      return;
    }

    // Validar construções/recursos necessários
    if (edificioEstatico.construçõesNecessárias?.length) {
      for (const nome of edificioEstatico.construçõesNecessárias) {
        if (!booleanPreReq(nome)) {
          atualizarDados("modalAlert", { estadoModal: true, head: `Falta ${nome}`, content: `Precisa de 1 unidade de "${nome}".` });
          return;
        }
      }
    }
    if (edificioEstatico.recursoDeConstrução?.length) {
      for (const nome of edificioEstatico.recursoDeConstrução) {
        if (!booleanPreReq(nome)) {
          atualizarDados("modalAlert", { estadoModal: true, head: `Precisa de ${nome}`, content: `Precisa de 1 unidade de "${nome}".` });
          return;
        }
      }
    }

    buttonPurchaseEdifAudio();

    // Montar lote de atualizações — 1 único set()
    const lote = [
      [["edificiosFinais", setorAtivo,'edificios' ,index, "quantidade"], quantidadeAtivoAtual + 1],
      [["edificiosBase", "terrenos", "quantidade"], qTa - tNec],
      [["edificiosBase", "lojasP",   "quantidade"], qPa - pNec],
      [["edificiosBase", "lojasM",   "quantidade"], qMa - mNec],
      [["edificiosBase", "lojasG",   "quantidade"], qGa - gNec],
    ];

    // Consumir recursos de construção (decrementar quantidade)
    if (edificioEstatico.recursoDeConstrução?.length) {
      const { edificiosFinais } = useCentralStore.getState();
      for (const nome of edificioEstatico.recursoDeConstrução) {
        for (const s of setoresArr) {
          const idx = EDIFICIOS_FINAIS_ESTATICOS[s]?.edificios?.findIndex((e) => e.nome === nome) ?? -1;
          if (idx !== -1) {
            const qtdAtual = edificiosFinais[s]?.[idx]?.quantidade ?? 0;
            lote.push([["edificiosFinais", s, idx, "quantidade"], Math.max(0, qtdAtual - 1)]);
            break;
          }
        }
      }
    }

    atualizarLote(lote);

    // Atualizar contexto econômico (permanece no Context)
    const custosEdBase =
      tNec * tPC + pNec * (pPC + tQNT * tPC) + mNec * (mPC + mQNT * tPC) + gNec * (gPC + gQNT * tPC);

    const novaCarteira = [...carteira];
    const setorIndex   = setoresArr.indexOf(setorAtivo);
    if (!novaCarteira[setorIndex]) novaCarteira[setorIndex] = [];
    novaCarteira[setorIndex] = [...novaCarteira[setorIndex], { ...edificioEstatico, quantidade: 1 }];

    atualizarEco("saldo",    economiaSetores.saldo - custo);
    atualizarEco("carteira", { ...economiaSetores.carteira, carteiraAtual: novaCarteira });
    atualizarEco("patrimonio", economiaSetores.patrimonio + custosEdBase + custo);

    const carteiraNorm = setoresArr.map((_, i) => Array.isArray(novaCarteira[i]) ? novaCarteira[i] : []);
    let totalEd = 0;
    const nomesSet = new Set();
    carteiraNorm.forEach((arr) => arr.forEach((item) => { if (!item) return; nomesSet.add(item.nome); totalEd += Number(item.quantidade ?? 1); }));
    atualizarEco("centralEdificios", {
      ...economiaSetores.centralEdificios,
      quantidadeSetoresAtual:        carteiraNorm.reduce((a, arr) => a + (arr.length > 0 ? 1 : 0), 0),
      QuantidadeEdifíciosAtual:      totalEd,
      QuantidadeDiversosEdificiosAtual: nomesSet.size,
    });
  };

  // ── Formatação ────────────────────────────────────────────
  const formatarNumero = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(1).replace(".0", "") + "T";
    if (num >= 1e9)  return (num / 1e9) .toFixed(1).replace(".0", "") + "B";
    if (num >= 1e6)  return (num / 1e6) .toFixed(1).replace(".0", "") + "M";
    if (num >= 1e3)  return (num / 1e3) .toFixed(1).replace(".0", "") + "K";
    return num?.toString() ?? "0";
  };

  // ── Gradientes e bordas ───────────────────────────────────
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
    if (isEstoque)  return { border: `2px solid ${setorInfo.cor2}`,   boxShadow: `0 0 0 3px ${setorInfo.cor3}88`, borderRadius: "20px 20px 20px 20px" };
    if (isVenda)    return { borderRadius: "20px 20px 20px 20px", border: `1.5px solid ${setorInfo.cor3}` };
    if (isPassiva)  return { border: `1px solid ${setorInfo.cor3}55`, boxShadow: `0 0 0 1px ${setorInfo.cor1}88`, borderRadius: "20px 20px 20px 20px" };
    return { borderRadius: "20px 20px 20px 20px" };
  };
  const getGradientByLevel = () => {
    if (powerUpSelecionado === "powerUpNv3") return `linear-gradient(135deg, #7a5500 0%, #b8870b 20%, #F27405 40%, #FFD700 60%, #F27405 80%, #7a5500 100%)`;
    if (powerUpSelecionado === "powerUpNv2") return `linear-gradient(135deg, #350973 0%, #6411D9 25%, #8F5ADA 50%, #6411D9 75%, #350973 100%)`;
    return `transparent`;
  };

  // ── Dados licença (usando estáticos) ──────────────────────
  const nomeLicencaBlocking = edificioEstatico?.licençaLiberado?.licença ?? "";
  const licencaObj = LICENCAS_ESTATICAS[setorAtivo]?.find((l) => l.edifíciosLiberados?.includes(nomeAtual));
  const valorLicenca = licencaObj?.valor ?? 0;
  const custoLojas   = tNec * tPC + pNec * (pPC + tQNT * tPC) + mNec * (mPC + mQNT * tPC) + gNec * (gPC + gQNT * tPC);
  const custoTotal   = valorLicenca + custoLojas + custoConstrução;
  const temSaldo     = economiaSetores.saldo >= custoTotal;

  // ── Investimento no footer ────────────────────────────────
  const tFalta = Math.max(0, tNec - edificioBase.terrenos.quantidade);
  const pFalta = Math.max(0, pNec - edificioBase.lojasP.quantidade);
  const mFalta = Math.max(0, mNec - edificioBase.lojasM.quantidade);
  const gFalta = Math.max(0, gNec - edificioBase.lojasG.quantidade);
  const custoImovelsFaltando =
    tFalta * tPC +
    pFalta * (pPC + tQNT * tPC) +
    mFalta * (mPC + mQNT * tPC) +
    gFalta * (gPC + gQNT * tPC);
  const custoTotalInvestimento = custoImovelsFaltando + custoRecursos + custoConstrução;
  const podePagar = economiaSetores.saldo >= custoTotalInvestimento;

  // ════════════════════════════════════════════════════════════════
  //  MODAL POWER-UPS
  // ════════════════════════════════════════════════════════════════
  if (modalPowerup) {
    return (
      <div className="fixed inset-0 flex justify-center items-center z-[150] bg-black/90 backdrop-blur-sm">
        <motion.div
          style={{ backgroundColor: setorInfo.cor1, borderColor: setorInfo.cor4 }}
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-[90vw] h-[85vh] rounded-[24px] border-2 flex flex-col justify-between items-center relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          <button
            className="absolute top-4 right-4 w-[45px] h-[45px] flex justify-center items-center rounded-xl hover:scale-110 active:scale-95 transition-all z-10 shadow-lg"
            style={{ backgroundColor: setorInfo.cor4 }} onClick={fecharModalPowerUp}
          >
            <img src={fechar} alt="Fechar" className="w-[50%]" />
          </button>
          <div style={{ backgroundColor: setorInfo.cor2, borderColor: setorInfo.cor4 }} className="flex w-full h-[15%] border-b-2 text-[45px] fonteBold text-white justify-center items-center italic tracking-tighter shadow-xl">
            {nomeAtual}
          </div>
          <div className="flex-1 w-full p-6 overflow-hidden">
            <div className="flex justify-around h-full w-full gap-4">
              {["Fornece", "Recebe"].map((label, li) => {
                const lista  = li === 0 ? edificioEstatico?.ForneceMelhoraEficiencia : edificioEstatico?.RecebeMelhoraEficiencia;
                const acRed  = li === 0 ? acumuladorPowerUpRedCustoFornece : acumuladorPowerUpRedCustoRecebe;
                const acAum  = li === 0 ? acumuladorPowerUpAumFatuFornece  : acumuladorPowerUpAumFatuRecebe;
                return (
                  <div key={label} className="w-[49%] h-full flex flex-col items-center">
                    <div style={{ backgroundColor: setorInfo.cor2, borderColor: setorInfo.cor4 }} className="w-full h-[10%] border-l-4 fonteBold text-white flex items-center pl-6 rounded-r-xl text-[30px] mb-4 uppercase tracking-widest shadow-md">
                      {label}
                    </div>
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
                        {(lista || []).map((edM, i) => {
                          const { edificiosFinais } = useCentralStore.getState();
                          let qtdM = 0;
                          for (const s of setoresArr) {
                            const idx = EDIFICIOS_FINAIS_ESTATICOS[s]?.edificios?.findIndex((e) => e.nome === edM.nome) ?? -1;
                            if (idx !== -1) { qtdM = edificiosFinais[s]?.[idx]?.quantidade ?? 0; break; }
                          }
                          const pu  = quantidadeAtivoAtual >= quantidadeMinimaPowerUpNv3 ? "powerUpNv3" : quantidadeAtivoAtual >= quantidadeMinimaPowerUpNv2 ? "powerUpNv2" : "powerUpNv1";
                          const cL  = qtdM > 0 ? corPowerUp(pu) : corPadrão;
                          const b1  = cL === "#8F5ADA" ? corPowerUp("powerUpNv1") : pu === "powerUpNv2" ? corPowerUp("powerUpNv2") : pu === "powerUpNv3" ? corPowerUp("powerUpNv3") : corPadrão;
                          const b2  = pu === "powerUpNv1" ? corPadrão : pu === "powerUpNv2" ? corPowerUp("powerUpNv2") : corPowerUp("powerUpNv3");
                          const b3  = pu === "powerUpNv1" ? corPadrão : pu === "powerUpNv2" ? corPadrão : corPowerUp("powerUpNv3");
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
                                <td style={{ backgroundColor: b1 }} className="text-center text-white text-[11px] border-r border-black/20 font-black italic">N1<br/>{edM.redCusto.nível1}%</td>
                                <td style={{ backgroundColor: b2 }} className="text-center text-white text-[11px] border-r border-black/20 font-black italic">N2<br/>{edM.redCusto.nível2}%</td>
                                <td style={{ backgroundColor: b3 }} className="text-center text-white text-[11px] font-black italic">N3<br/>{edM.redCusto.nível3}%</td>
                                <td className="w-2 bg-transparent"></td>
                                <td style={{ backgroundColor: b1 }} className="text-center text-white text-[11px] border-r border-black/20 font-black italic">N1<br/>{edM.aumFatu.nível1}%</td>
                                <td style={{ backgroundColor: b2 }} className="text-center text-white text-[11px] border-r border-black/20 font-black italic">N2<br/>{edM.aumFatu.nível2}%</td>
                                <td style={{ backgroundColor: b3 }} className="text-center text-white text-[11px] rounded-r-xl font-black italic">N3<br/>{edM.aumFatu.nível3}%</td>
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

  // ════════════════════════════════════════════════════════════════
  //  CARD PRINCIPAL
  // ════════════════════════════════════════════════════════════════
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
        {/* Badge de categoria */}
        <div className="absolute bottom-0 right-0 w-[50px] h-[50px] z-20 flex items-center justify-center rounded-tl-2xl rounded-br-2xl">
          <div className="absolute inset-0 rounded-tl-2xl rounded-br-2xl" style={{ backgroundColor: setorInfo.cor3, filter: "brightness(0.8)", boxShadow: "-2px -2px 10px rgba(0,0,0,0.3)" }} />
          <div className="w-[50px] h-[50px] flex items-center justify-center rounded-tl-2xl rounded-br-2xl" style={{ backgroundColor: "rgba(0,0,0,0.2)", backdropFilter: "blur(4px)" }}>
            {isProducao && <img src={component} className="w-[24px] opacity-90" alt="" />}
            {isVenda    && <img src={sell}      className="w-[24px] opacity-90" alt="" />}
            {isEstoque  && <img src={estoque}   className="w-[24px] opacity-90" alt="" />}
            {isPassiva  && <img src={passive}   className="w-[24px] opacity-90" alt="" />}
          </div>
        </div>

        {/* ── Overlay: licença bloqueada ── */}
        {liberado === false && (
          <motion.div
            style={{ background: "transparent" }}
            className="w-[220px] h-[320px] rounded-[20px] flex flex-col justify-center items-center shadow-lg perspective z-[2] cursor-pointer absolute"
            initial={{ scale: 1 }} transition={{ type: "spring", stiffness: 100, damping: 10 }}
            onClick={() => {
              const scrollIdx = LICENCAS_ESTATICAS[setorAtivo]?.findIndex((l) => l.edifíciosLiberados?.includes(nomeAtual)) ?? 0;
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
        )}

        {/* ── Overlay: sanção de monopólio ── */}
        {((rentabilidade > 200 && quantidadeAtivoAtual === 1) || (rentabilidade >= 150 && rentabilidade < 200 && quantidadeAtivoAtual >= 3) || (rentabilidade >= 120 && rentabilidade < 150 && quantidadeAtivoAtual >= 5) || (rentabilidade >= 70 && rentabilidade < 120 && quantidadeAtivoAtual >= 10)) && (
          <motion.div style={{ background: "transparent" }} className="w-[220px] h-[320px] rounded-[20px] flex flex-col justify-center items-center shadow-lg perspective z-[2] cursor-pointer absolute" initial={{ scale: 1 }} transition={{ type: "spring", stiffness: 100, damping: 10 }}>
            <div className="absolute inset-0 rounded-[20px] z-0" style={{ background: `linear-gradient(135deg,${setorInfo.cor1} 0%,${setorInfo.cor2} 70%,${setorInfo.cor4} 100%)`, opacity: 0.9 }} />
            <motion.div className="relative flex justify-start items-center mt-[25px] flex-col w-full h-full z-[2]" animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.5, ease: "easeInOut" }} style={{ transformStyle: "preserve-3d" }}>
              <div style={{ backgroundColor: setorInfo.cor1 }} className="h-[40%] flex justify-center items-center aspect-square rounded-[20px] relative z-[2]">
                <div style={{ backgroundColor: setorInfo.cor3 }} className="flex items-center justify-center h-[95%] aspect-square rounded-[20px] absolute z-[2]">
                  <div style={{ backgroundColor: setorInfo.cor1 }} className="flex items-center justify-center h-[95%] aspect-square rounded-[20px] absolute z-[2]">
                    <div style={{ backgroundColor: setorInfo.cor2 }} className="flex items-center justify-center h-[95%] aspect-square rounded-[30px] absolute z-[2]">
                      <div style={{ background: `linear-gradient(135deg,${setorInfo.cor1} 0%,${setorInfo.cor4} 100%)` }} className="flex items-center justify-center h-[95%] aspect-square rounded-[60px] absolute z-[2] relative">
                        <img className="h-[70%] aspect-square absolute" src={sanção} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="text-white mt-[12px] text-[15px] text-center fonteBold">SANÇÃO DE MONOPÓLIO</h2>
              <h2 className="text-white m-[12px] text-[12px] fonteBold">Por conta da alta rentabilidade, momentaneamente você não pode comprar mais desse edifício.</h2>
            </motion.div>
          </motion.div>
        )}

        {/* ════════════════════════════════════════
            FRENTE DO CARD
        ════════════════════════════════════════ */}
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

            {/* ══ CORPO POR CATEGORIA ══ */}

            {/* PASSIVA */}
            {isPassiva && (
              <div className="w-full flex flex-col justify-around gap-[4px]" style={{ flex: 1, padding: "4px 0" }}>
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
                {(() => {
                  const semRequisitos = !arrayConstNece?.length && !arrayConstResources?.length;
                  return (
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
                  );
                })()}
                <_ImoveisECustoRow edificioBase={edificioBase} edificioEstatico={edificioEstatico} cor1={setorInfo.cor1} setorInfo={setorInfo} formatarNumero={formatarNumero} onClickLojas={onClickLojas} />
                <_ConstrERecursosRow arrayConstNece={arrayConstNece} arrayConstResources={arrayConstResources} cor1={setorInfo.cor1} setorInfo={setorInfo} onClickConstr={onClickConstr} booleanPreReq={booleanPreReq} />
              </div>
            )}

            {/* PRODUÇÃO */}
            {isProducao && (
              <div className="w-full flex flex-col justify-around gap-[4px]" style={{ flex: 1, padding: "4px 0" }}>
                <div className="flex gap-[3px]" style={{ minHeight: 34 }}>
                  <div style={{ width: "70%", background: "rgba(0,0,0,.32)", borderRadius: 7, padding: "4px 7px" }}>
                    <div style={{ fontSize: 7, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "rgba(255,255,255,.38)", marginBottom: 3 }}>Produtos gerados</div>
                    <div className="flex flex-row items-center gap-2">
                      {todosOutputsIds.slice(0, 2).map((id) => {
                        const produto = productsCatalog[id];
                        return (
                          <div key={id} className="flex items-center gap-1 bg-white/5 p-1 rounded" title={produto?.nome}>
                            <span className="text-base">{produto?.icon}</span>
                          </div>
                        );
                      })}
                      {todosOutputsIds.length > 3 && <span className="text-[14px] text-white/40 font-bold ml-1">+ {todosOutputsIds.length - 3}</span>}
                    </div>
                  </div>
                  <div style={{ width: "30%", background: `linear-gradient(135deg,${setorInfo.cor3} 0%,${setorInfo.cor1} 100%)`, borderRadius: 7, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", gap: 2 }} data-tooltip-id="tooltip-faturado" data-tooltip-html="Ver todos os produtos que este edifício pode produzir" onClick={() => { handleShow("produtosList"); handleFlip(); }} className="hover:scale-[1.05] ease-in-out">
                    <span style={{ fontSize: 16, fontWeight: 700, color: "#fff", lineHeight: 1 }}>+</span>
                    <span style={{ fontSize: 6.5, fontWeight: 700, color: "rgba(255,255,255,.7)", textAlign: "center", textTransform: "uppercase", letterSpacing: ".04em" }}>Produtos</span>
                  </div>
                </div>
                {(() => {
                  const semRequisitosEmbaixo = !arrayConstNece?.length && !arrayConstResources?.length;
                  const buildingKey = Object.keys(storageProfiles).find((key) => storageProfiles[key].nome === nomeAtual) || nomeAtual;
                  const perfil      = storageProfiles[buildingKey];
                  const categorias  = perfil ? (Array.isArray(perfil.categoriasPermitidas) ? perfil.categoriasPermitidas : [perfil.categoriasPermitidas]) : [];
                  return (
                    <div className="flex gap-[4px] w-full" style={{ minHeight: semRequisitosEmbaixo ? "68px" : "52px", transition: "all 0.3s ease" }}>
                      <div style={{ flex: "0 0 65%", background: "rgba(0,0,0,.32)", borderRadius: 7, padding: semRequisitosEmbaixo ? "8px 10px" : "5px 8px", display: "flex", flexDirection: "column", gap: semRequisitosEmbaixo ? 5 : 3, justifyContent: "center" }}>
                        <div style={{ fontSize: 7, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "rgba(255,255,255,.38)" }}>Expande arm. de</div>
                        <div className="flex gap-[4px] flex-wrap items-center">
                          {categorias.length > 0  ? categorias.map((cat, idx) => (
                            <div key={idx} title={cat} style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 4, width: semRequisitosEmbaixo ? 28 : 17, height: semRequisitosEmbaixo ? 28 : 17, fontSize: semRequisitosEmbaixo ? 14 : 10, transition: "all 0.2s ease" }}>{storageIconMap[cat] || "📦"}</div>
                          )) : <span style={{ fontSize: 7, color: "rgba(255,255,255,.2)" }}>—</span>
                          
                          
                          
                          
                          
                          
                          
                          }
                        </div>
                      </div>
                      <div style={{ flex: "0 0 35%", background: "rgba(0,0,0,.32)", borderRadius: 7, padding: "5px 4px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }} data-tooltip-id="tooltip-faturado" data-tooltip-html="Slots de armazenamento adicionados">
                        <div style={{ fontSize: 7, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "rgba(255,255,255,.38)" }}>Capacidade</div>
                        <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: semRequisitosEmbaixo ? 18 : 16, fontWeight: 700, color: "#7aff9a", lineHeight: 1, margin: "1px 0", transition: "all 0.2s ease" }}>
                          +{(() => {
                            const capDin = edificioDinamico?.capacidadeArmazenamento ?? edificioDinamico?.slotArmazenamento;
                            if (capDin !== undefined && capDin !== null) return capDin;
                            return perfil?.capacidadePorEdificio ?? "—";
                          })()}
                        </div>
                        <div style={{ fontSize: semRequisitosEmbaixo ? 7 : 6, color: "rgba(255,255,255,.3)", textTransform: "uppercase" }}>slots</div>
                      </div>
                    </div>
                  );
                })()}
                <_ImoveisECustoRow edificioBase={edificioBase} edificioEstatico={edificioEstatico} cor1={setorInfo.cor1} setorInfo={setorInfo} formatarNumero={formatarNumero} onClickLojas={onClickLojas} />
                <_ConstrERecursosRow arrayConstNece={arrayConstNece} arrayConstResources={arrayConstResources} cor1={setorInfo.cor1} setorInfo={setorInfo} onClickConstr={onClickConstr} booleanPreReq={booleanPreReq} />
              </div>
            )}

            {/* VENDA */}
            {isVenda && (
              <div className="w-full flex flex-col justify-around gap-[4px]" style={{ flex: 1, padding: "4px 0" }}>
                {(() => {
                  const buildingKey = Object.keys(storageProfiles).find((key) => storageProfiles[key].nome === nomeAtual) || nomeAtual;
                  const perfil      = storageProfiles[buildingKey];
                  const categorias  = perfil ? (Array.isArray(perfil.categoriasPermitidas) ? perfil.categoriasPermitidas : [perfil.categoriasPermitidas]) : [];
                  return (
                    <>
                      <div className="flex gap-[3px]" style={{ minHeight: 34 }}>
                        <div style={{ width: "70%", background: "rgba(0,0,0,.32)", borderRadius: 7, padding: "4px 7px" }}>
                          <div style={{ fontSize: 7, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "rgba(255,255,255,.38)", marginBottom: 3 }}>Aceita vender</div>
                          <div className="flex flex-row items-center gap-1">
                            {(() => {
                              const dadosVenda = SALES_EDIFICIOS.find((ed) => ed.nomeEdificio === nomeAtual);
                              const produtosIds = dadosVenda?.formulas?.map((f) => f.produto) || [];
                              return (
                                <>
                                  {produtosIds.slice(0, 4).map((id) => (<div key={id} className="flex items-center justify-center bg-white/5 w-6 h-6 rounded border border-white/10"><span className="text-sm">{productsCatalog[id]?.icon || "📦"}</span></div>))}
                                  {produtosIds.length > 4 && <span className="text-[10px] text-white/40 font-bold ml-1">+ {produtosIds.length - 4}</span>}
                                </>
                              );
                            })()}
                          </div>
                        </div>
                        <div style={{ width: "30%", background: `linear-gradient(135deg,${setorInfo.cor3} 0%,${setorInfo.cor1} 100%)`, borderRadius: 7, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", gap: 1 }} onClick={() => { handleShow("vendasList"); handleFlip(); }} className="hover:scale-[1.05] transition-transform">
                          <span className="text-[14px] font-bold text-white">+</span>
                          <span className="text-[6px] font-bold text-white/70 uppercase">Produtos</span>
                        </div>
                      </div>
                      <div className="flex gap-[4px]" style={{ minHeight: 40 }}>
                        <div style={{ width: "60%", background: "rgba(0,0,0,.32)", borderRadius: 7, padding: "5px 8px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                          <div style={{ fontSize: 7, fontWeight: 700, textTransform: "uppercase", color: "rgba(255,255,255,.38)", marginBottom: 2 }}>Expande arm. de</div>
                          <div className="flex gap-[3px] flex-wrap items-center">
                            {categorias.map((cat, idx) => (<div key={idx} style={{ background: "rgba(255,255,255,.05)", borderRadius: 4, width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, border: "1px solid rgba(255,255,255,.1)" }}>{storageIconMap[cat] || "📦"}</div>))}
                          </div>
                        </div>
                        <div style={{ width: "20%", borderRadius: 7, backgroundColor: setorInfo.cor1, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} onClick={onClickFinancas}><img src={DolarImg} className="h-[14px]" /></div>
                        <div style={{ width: "20%", borderRadius: 7, background: `linear-gradient(135deg,${setorInfo.cor4} 0%,${corPowerUpAtual} 50%,${setorInfo.cor1} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} onClick={onClickPowerUp}><img src={PróximoImg} className="h-[14px] rotate-[270deg]" /></div>
                      </div>
                      <div className="flex gap-[4px]" style={{ minHeight: 42 }}>
                        <div style={{ width: "40%", background: "rgba(0,0,0,.32)", borderRadius: 7, padding: "4px 8px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                          <span style={{ fontSize: 7, fontWeight: 700, textTransform: "uppercase", color: "rgba(255,255,255,.38)" }}>Renda / dia</span>
                          <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 16, fontWeight: 700, color: "#C87AFF", lineHeight: 1 }}>+{formatarNumero(valorFatuFinal)}</span>
                        </div>
                        <div style={{ width: "30%", background: "rgba(0,0,0,.32)", borderRadius: 7, padding: "4px 6px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                          <span style={{ fontSize: 7, fontWeight: 700, textTransform: "uppercase", color: "rgba(255,255,255,.38)" }}>Capacidade</span>
                          <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 14, fontWeight: 700, color: "#7aff9a", lineHeight: 1 }}>+{(() => { const c = edificioDinamico?.capacidadeArmazenamento ?? edificioDinamico?.slotArmazenamento; return c ?? perfil?.capacidadePorEdificio ?? "0"; })()}</span>
                        </div>
                        <div style={{ width: "30%", background: "rgba(0,0,0,.32)", borderRadius: 7, padding: "4px 6px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} data-tooltip-id="tooltip-faturado" data-tooltip-html="Custo de construção do edifício">
                          <div className="flex items-center gap-1">
                            <img src={ConstuirImg} style={{ height: 10, opacity: 0.6 }} alt="" />
                            <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 13, fontWeight: 700, color: "#fff", lineHeight: 1 }}>{formatarNumero(custoConstrução)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-[4px]" style={{ minHeight: 38 }}>
                        <div style={{ width: "50%", background: "rgba(0,0,0,.32)", borderRadius: 7, padding: "4px 7px", display: "flex", flexDirection: "column", gap: 2, cursor: "pointer" }} onClick={onClickConstr}>
                          <_ImoveisSMartelo edificioBase={edificioBase} edificioEstatico={edificioEstatico} cor1={setorInfo.cor1} onClickLojas={onClickLojas} />
                        </div>
                        <div style={{ width: "50%", background: "rgba(0,0,0,.32)", borderRadius: 7, padding: "4px 7px", display: "flex", flexDirection: "column", gap: 2, cursor: "pointer" }} onClick={onClickConstr}>
                          <span style={{ fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", color: "rgba(255,255,255,.3)" }}>Recursos</span>
                          <_ConstNecIcons arrayConstNece={arrayConstNece} arrayConstResources={arrayConstResources} cor1={setorInfo.cor1} onClickConstr={onClickConstr} booleanPreReq={booleanPreReq} />
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            {/* ESTOQUE */}
            {isEstoque && (
              <div className="w-full flex flex-col justify-around gap-[4px]" style={{ flex: 1, padding: "4px 0" }}>
                <div className="flex gap-[4px]" style={{ minHeight: 60 }}>
                  <div style={{ flex: 1.5, background: "rgba(0,0,0,.32)", borderRadius: 7, padding: "7px 10px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <span style={{ fontSize: 7.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "rgba(255,255,255,.38)" }}>Custo fixo / mês</span>
                    <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 24, fontWeight: 700, color: "#7ac8ff", lineHeight: 1 }}>- {formatarNumero(valorImpostoFixoFinal || 0)}</span>
                    <span style={{ fontSize: 7, color: "rgba(255,255,255,.3)", marginTop: 2 }}>manutenção mensal</span>
                  </div>
                  <div style={{ flex: 1, background: "rgba(0,0,0,.32)", borderRadius: 7, padding: "7px 10px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }} data-tooltip-id="tooltip-faturado" data-tooltip-html="Slots de armazenamento adicionados">
                    <div style={{ fontSize: 7, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "rgba(255,255,255,.38)" }}>Capacidade</div>
                    <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 18, fontWeight: 700, color: "#7aff9a", lineHeight: 1, margin: "2px 0" }}>
                      +{(() => {
                        const capDin = edificioDinamico?.capacidadeArmazenamento ?? edificioDinamico?.slotArmazenamento;
                        if (capDin !== undefined && capDin !== null) return capDin;
                        const bk = Object.keys(storageProfiles).find((key) => storageProfiles[key].nome === nomeAtual);
                        return storageProfiles[bk]?.capacidadePorEdificio ?? "—";
                      })()}
                    </div>
                    <div style={{ fontSize: 6.5, color: "rgba(255,255,255,.3)", textTransform: "uppercase" }}>slots</div>
                  </div>
                </div>
                <div className="flex gap-[4px] items-stretch">
                  <div style={{ flex: 1, background: "rgba(0,0,0,.32)", borderRadius: 7, padding: "8px 10px", display: "flex", flexDirection: "column", gap: 5, justifyContent: "center" }}>
                    <div style={{ fontSize: 7, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "rgba(255,255,255,.38)" }}>Expande arm. de</div>
                    <div className="flex gap-[6px] flex-wrap items-center justify-center">
                      {(() => {
                        const bk     = Object.keys(storageProfiles).find((key) => storageProfiles[key].nome === nomeAtual) || nomeAtual;
                        const perfil = storageProfiles[bk];
                        if (!perfil) return <span style={{ fontSize: 7, color: "rgba(255,255,255,.2)" }}>Nenhum perfil</span>;
                        const cats   = Array.isArray(perfil.categoriasPermitidas) ? perfil.categoriasPermitidas : [perfil.categoriasPermitidas];
                        return cats.map((cat, idx) => (<div key={idx} title={cat} style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 5, width: 26, height: 26, fontSize: 14 }}>{storageIconMap[cat] || "📦"}</div>));
                      })()}
                    </div>
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <div style={{ width: 34, height: 32, borderRadius: 7, backgroundColor: setorInfo.cor1, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} onClick={onClickFinancas} className="hover:brightness-110 active:scale-95 transition-all"><img src={DolarImg} style={{ height: "55%" }} alt="" /></div>
                    <div style={{ width: 34, height: 32, borderRadius: 7, background: `linear-gradient(135deg,${setorInfo.cor4} 0%,${corPowerUpAtual} 50%,${setorInfo.cor1} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} onClick={onClickPowerUp} className="hover:brightness-110 active:scale-95 transition-all"><img src={PróximoImg} style={{ height: "60%", transform: "rotate(270deg)" }} alt="" /></div>
                  </div>
                </div>
                <_ImoveisECustoRow edificioBase={edificioBase} edificioEstatico={edificioEstatico} cor1={setorInfo.cor1} setorInfo={setorInfo} formatarNumero={formatarNumero} onClickLojas={onClickLojas} />
                <_ConstrERecursosRow arrayConstNece={arrayConstNece} arrayConstResources={arrayConstResources} cor1={setorInfo.cor1} setorInfo={setorInfo} onClickConstr={onClickConstr} booleanPreReq={booleanPreReq} />
              </div>
            )}

            {/* ── FOOTER ── */}
            <div className="w-full">
              <div className="flex gap-[4px] items-stretch" style={{ height: 26 }}>
                <div style={{ height: 26, minWidth: 32, borderRadius: 7, background: quantidadeAtivoAtual > 0 ? "rgba(100,17,217,.2)" : "rgba(0,0,0,.28)", border: quantidadeAtivoAtual > 0 ? `1px solid ${corPowerUpAtual}` : "1px solid rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 6px", flexShrink: 0 }} data-tooltip-id="tooltip-faturado" data-tooltip-html="Quantidade atual deste edifício na sua carteira">
                  <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 14, fontWeight: 700, color: "#fff" }}>{quantidadeAtivoAtual}</span>
                </div>
                <button onClick={comprarCard} style={{ flex: 1, height: 26, borderRadius: 8, border: "none", fontFamily: "'Nunito',sans-serif", fontSize: 11, fontWeight: 700, cursor: podeComprar ? "pointer" : "not-allowed", color: "#fff", letterSpacing: ".04em", backgroundColor: podeComprar ? "#6411D9" : "#B0A7C0" }} className="fonteBold" title={!podeComprar ? motivo : ""}>
                  Comprar
                </button>
                {liberado !== false && (
                  <div style={{ height: 26, borderRadius: 7, padding: "0 7px", flexShrink: 0, background: podePagar ? `${setorInfo.cor3}22` : "rgba(255,96,96,.1)", border: `1px solid ${podePagar ? setorInfo.cor3 + "55" : "rgba(255,96,96,.25)"}`, display: "flex", alignItems: "center", gap: 4, boxShadow: podePagar ? `0 0 8px 1px ${setorInfo.cor4}44` : "none" }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: podePagar ? setorInfo.cor4 : "#ff6060", flexShrink: 0, boxShadow: `0 0 4px ${podePagar ? setorInfo.cor4 : "#ff6060"}` }} />
                    <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 11, fontWeight: 800, color: podePagar ? setorInfo.cor4 : "#ff9090", whiteSpace: "nowrap" }}>{formatarNumero(custoTotalInvestimento)}</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* ════════════════════════════════════════
            VERSO DO CARD
        ════════════════════════════════════════ */}
        <div
          className={`absolute w-full h-full flex items-center justify-center rounded-[20px] text-white transform cursor-pointer rotate-y-180 ${flipped ? "pointer-events-auto z-50" : "pointer-events-none"}`}
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden", background: `linear-gradient(135deg,${setorInfo.cor2} 0%,${setorInfo.cor3} 35%,${setorInfo.cor1} 100%)` }}
        >
          {visibleId === "constNece" && isModalOpen && (
            <div onClick={() => handleFlip()} className="w-[90%] h-[90%] flex flex-col self-center gap-3">
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
                              {!booleanPreReq(nome) && (<span className="absolute -top-1 -right-1 flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span></span>)}
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
                              {!booleanPreReq(nome) && (<span className="absolute -top-1 -right-1 flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span></span>)}
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
            <div onClick={() => handleFlip()} className="w-[90%] h-[92%] flex flex-col self-center gap-3 p-1 overflow-hidden">
              <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full h-[60px] min-h-[60px] rounded-[10px] flex justify-between overflow-hidden drop-shadow-sm shrink-0">
                <div style={{ background: `linear-gradient(135deg,${setorInfo.cor3} 0%,${setorInfo.cor1} 100%)` }} className="h-full aspect-square flex items-center justify-center"><img className="h-[60%]" src={terrenoImg} alt="ícone" /></div>
                <div className="flex p-3 justify-center items-center"><h1 className="text-white fonteBold text-[12px] uppercase tracking-wider text-right">Imóveis Necessários</h1></div>
              </div>
              <div className="w-full flex-1 flex flex-col gap-2 overflow-y-auto overflow-x-hidden pr-1 scrollbar-custom">
                {[
                  { img: terrenoImg, key: "terrenos", qtdAtual: edificioBase.terrenos.quantidade },
                  { img: LojaPImg,   key: "lojasP",   qtdAtual: edificioBase.lojasP.quantidade },
                  { img: LojaMImg,   key: "lojasM",   qtdAtual: edificioBase.lojasM.quantidade },
                  { img: LojaGImg,   key: "lojasG",   qtdAtual: edificioBase.lojasG.quantidade },
                ].map(({ img, key, qtdAtual }) => {
                  const necessarios   = edificioEstatico?.lojasNecessarias?.[key] ?? 0;
                  const valorFalta    = contabilidadeDeFalta(key);
                  const temSuficiente = qtdAtual >= necessarios;
                  return (
                    <div key={key} className="w-full h-[65px] flex items-center gap-3 bg-black/20 p-2 rounded-xl border border-white/5 shrink-0">
                      <div style={{ backgroundColor: setorInfo.cor1 }} className="h-11 w-11 rounded-lg flex items-center justify-center shrink-0 shadow-inner"><img className="h-[65%] object-contain" src={img} alt="" /></div>
                      <div className="flex-1 flex flex-row items-center justify-center gap-2">
                        <span className={`text-[18px] font-bold tracking-tight ${temSuficiente ? "text-green-400" : "text-white"}`}>{qtdAtual}</span>
                        <span className="text-white/20 text-[12px] font-light">/</span>
                        <span className="text-white/40 text-[14px] font-semibold">{necessarios}</span>
                      </div>
                      <div style={{ backgroundColor: setorInfo.cor2 }} className="h-full min-w-[52px] px-2 flex flex-col justify-center items-center rounded-lg border border-white/5 shadow-sm">
                        <span className="text-white/30 text-[7px] uppercase font-bold mb-0.5 tracking-tighter">Custo Falta</span>
                        <h2 className={`text-[10px] font-bold ${temSuficiente ? "text-green-400/80" : "text-white"}`}>{valorFalta > 0 ? formatarNumero(valorFalta) : "OK"}</h2>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {visibleId === "licenca" && isModalOpen && (
            <div onClick={() => handleFlip()} className="w-[90%] h-[90%] flex items-center flex-col justify-between self-center">
              <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full h-[15%] rounded-[10px] flex justify-between">
                <div style={{ background: `linear-gradient(135deg,${setorInfo.cor3} 0%,${setorInfo.cor1} 100%)` }} className="h-[100%] aspect-square rounded-[10px] flex items-center justify-center"><img className="h-[70%]" src={licença} alt="" /></div>
                <div className="flex p-[10px] justify-center items-center"><h1 className="text-white fonteBold text-[12px]">Licenças Necessárias</h1></div>
              </div>
              <div className="h-[75%] w-full"></div>
              <LicenseNec />
            </div>
          )}

          {visibleId === "powerUp" && isModalOpen && (
            <div onClick={() => handleFlip()} className="w-[90%] h-[90%] flex items-center flex-col justify-around self-center">
              <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full h-[20%] rounded-[10px] flex justify-between">
                <div style={{ background: `linear-gradient(135deg,${setorInfo.cor4} 0%,${corPowerUpAtual} 30%,#350973 70%,${setorInfo.cor1} 100%)` }} className="h-[100%] aspect-square rounded-[10px] flex items-center justify-center"><img className="h-[70%] rotate-[270deg]" src={PróximoImg} alt="" /></div>
                <div className="flex p-[10px] justify-center items-center"><h1 className="text-white fonteBold text-[12px]">Power Ups</h1></div>
              </div>
              <div className="h-[20%] w-full flex justify-between flex-col items-center">
                <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full flex items-center justify-center rounded-[10px] p-[5px] h-full">
                  <div className="w-[100%] rounded-[20px] flex justify-around items-center h-full">
                    {[{ bg: "#8F5ADA", nv: "nível1" }, { bg: "#6411D9", nv: "nível2" }, { bg: "#350973", nv: "nível3" }].map(({ bg, nv }) => (
                      <div key={nv} data-tooltip-id="tooltip-faturado" data-tooltip-html={`Qtd mínima para Power Up ${nv}`} style={{ backgroundColor: setorInfo.cor2 }} className="flex justify-around items-center w-[30%] h-full rounded-[10px] p-[2px]">
                        <div style={{ backgroundColor: bg }} className="w-[80%] aspect-square rounded-[7px] flex items-center justify-center hover:scale-[1.20] duration-300 ease-in-out cursor-pointer"><img className="h-[70%] aspect-square rotate-[270deg]" src={PróximoImg} /></div>
                        <div className="flex justify-center items-center w-full"><h2 className="text-white text-[10px] fonteBold">{edificioEstatico?.powerUp?.[nv]?.quantidadeMínima}</h2></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ backgroundColor: setorInfo.cor2 }} className="h-[50%] w-full rounded-[10px] flex flex-col items-center justify-around">
                <p className="text-white text-[10px] h-[65%] p-[5px]">{edificioEstatico?.desc}.</p>
                <button data-tooltip-id="tooltip-faturado" data-tooltip-html="Exibe tabela com todos os power-ups deste edifício." onClick={openModalPowerUps} className="w-[85%] h-[25%] z-50 text-white text-[10px] bg-[#6411D9] rounded-[10px] hover:scale-[1.10] duration-300 ease-in-out">Todos power ups</button>
              </div>
            </div>
          )}

          {visibleId === "finançasEd" && isModalOpen && (
            <div onClick={() => handleFlip()} className="w-[90%] h-[90%] flex items-center flex-col justify-between self-center relative z-[20] overflow-visible" style={{ pointerEvents: "auto" }}>
              <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full h-[20%] rounded-[10px] flex justify-between">
                <div className="h-[100%] aspect-square rounded-[10px] flex items-center justify-center" style={{ background: `linear-gradient(135deg,${setorInfo.cor3} 0%,${setorInfo.cor1} 100%)` }}><img className="h-[70%]" src={DolarImg} alt="" /></div>
                <div className="flex p-[10px] justify-center items-center"><h1 className="text-white fonteBold text-[12px]">Finanças do edifício</h1></div>
              </div>
              {[
                [{ img: imgFatuMensal,      text: "Faturamento mensal estimado\ncaso você detenha o edifício por um mês.", val: formatarNumero(valorFatu * 30) },
                 { img: imgImpostoFixo,     text: "Imposto fixo mensal\nValor fixo cobrado ao fim do mês.", val: formatarNumero(valorImpostoFixo) }],
                [{ img: imgFaturamentoDiario, text: "Faturamento diário médio na economia estável.", val: formatarNumero(valorFatu) },
                 { img: imgImpostoSFatu,    text: "Imposto sobre faturamento mensal.", val: formatarNumero(valorFatu * 30 * impostoSobreFatu) }],
                [{ img: porcem,             text: "Rendimento atual do edifício\nVaria conforme a economia do setor.", val: `${rentabilidade.toFixed(0)}%` },
                 { img: imgPercFatu,        text: "Porcentagem do imposto sobre faturamento.", val: `${(impostoSobreFatu * 100).toFixed(0)}%` }],
                [{ img: imgLucro,           text: "Lucro líquido mensal\nFaturamento menos todos os impostos.", val: formatarNumero(valorFatu * 30 - (valorFatu * 30 * impostoSobreFatu + valorImpostoFixo)) },
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

          {visibleId === "produtosList" && isModalOpen && (
            <div onClick={() => handleFlip()} className="w-[90%] h-[90%] flex items-center flex-col justify-start self-center gap-[10px]">
              <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full h-[60px] min-h-[60px] rounded-[10px] flex justify-between overflow-hidden">
                <div style={{ background: `linear-gradient(135deg,${setorInfo.cor3} 0%,${setorInfo.cor1} 100%)` }} className="h-[100%] aspect-square flex items-center justify-center"><img src={component} className="h-[60%]" alt="" /></div>
                <div className="flex p-[10px] justify-center items-center"><h1 className="text-white fonteBold text-[12px]">Todos os produtos</h1></div>
              </div>
              <div className="w-full flex-1 overflow-y-auto pr-1 flex flex-col gap-2 scrollbar-custom">
                {todosOutputsIds.map((id) => {
                  const produto = productsCatalog[id];
                  return (
                    <div key={id} className="flex items-center justify-between bg-white/5 p-2 rounded-lg border border-white/10">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{produto?.icon}</span>
                        <span className="text-[11px] text-white/90 uppercase font-medium tracking-wider">{produto?.nome}</span>
                      </div>
                      <span className="text-[8px] text-white/30 italic">Output</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {visibleId === "vendasList" && isModalOpen && (
            <div onClick={() => handleFlip()} className="w-[90%] h-[90%] flex items-center flex-col justify-start self-center gap-[6px]">
              <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full h-[20%] rounded-[10px] flex justify-between">
                <div style={{ background: `linear-gradient(135deg,${setorInfo.cor3} 0%,${setorInfo.cor1} 100%)` }} className="h-[100%] aspect-square rounded-[10px] flex items-center justify-center"><img src={sell} className="h-[60%]" alt="" /></div>
                <div className="flex p-[10px] justify-center items-center"><h1 className="text-white fonteBold text-[12px]">Produtos à venda</h1></div>
              </div>
              <div style={{ backgroundColor: setorInfo.cor2 }} className="w-full flex-1 rounded-[10px] p-[8px] flex flex-wrap gap-[5px] content-start overflow-y-auto">
                {(() => {
                  const dadosVenda = SALES_EDIFICIOS.find((ed) => ed.nomeEdificio === nomeAtual);
                  const produtosIds = dadosVenda?.formulas?.map((f) => f.produto) || [nomeAtual];
                  return produtosIds.map((id) => {
                    const produto = productsCatalog[id];
                    return (
                      <span key={id} style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 6, padding: "3px 7px", fontSize: 9, fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>
                        <span className="text-[12px]">{produto?.icon || "📦"}</span>
                        {produto?.nome || id}
                      </span>
                    );
                  });
                })()}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export const CardModal = React.memo(CardModalBase);