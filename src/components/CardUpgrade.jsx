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
import plantação from "../../public/imagens/Plantação De Grãos.png";
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
// import estoque from "../../public/outrasImagens/estoque.png";
// import component from "../../public/outrasImagens/component.png";
// import { FORMULAS_EDIFICIOS } from "./productionFormulasConfig";
// import { productsCatalog } from "./TablePrice";
// import { storageProfiles } from "./GameContext";
// Função pura — fora do componente para não ser recriada a cada render
// import { SALES_EDIFICIOS } from "./salesFormulasConfig";

const getImageUrl = (nome) => `/imagens/${nome}.png`;

// ═══════════════════════════════════════════════════════════
// HELPERS — definidos FORA do CardUpgrade para não serem
// recriados a cada render (fix de performance crítico)
// ═══════════════════════════════════════════════════════════

// ── RARIDADE baseada em custoConstrucao ─────────────────
const getRaridade = (custo) => {
    if (custo >= 50_000_000) return "lendario";
    if (custo >= 10_000_000) return "epico";
    if (custo >= 1_000_000) return "raro";
    if (custo >= 500_000) return "incomum";
    return "comum";
};




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

// ── Botões de Ação (Finanças + PowerUp) ──────────────────────────────────
const _ActionButtons = ({ setorInfo, corPowerUpAtual, onClickFinancas, onClickPowerUp }) => (
    <div className="flex gap-[3px]">
        {/* Finanças */}
        <div
            style={{ width: 22, height: 22, borderRadius: 6, backgroundColor: setorInfo.cor1, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
            data-tooltip-id="tooltip-faturado"
            data-tooltip-html="Informações financeiras do edifício"
            onClick={onClickFinancas}
            className="hover:scale-[1.10] ease-in-out"
        >
            <img src={DolarImg} style={{ height: "60%" }} alt="" />
        </div>
        {/* Power-up */}
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

// ── Linha de Imóveis Base (60%) + Custo Construção (40%) ─────────────────
const _ImoveisECustoRow = ({ dados, setorAtivo, index, cor1, setorInfo, custoConstrucao, formatarNumero, onClickLojas }) => (
    <div className="flex gap-[3px]" style={{ minHeight: 30 }}>
        {/* Imóveis Base — 60% */}
        <div
            style={{ width: "70%", background: "rgba(0,0,0,.32)", borderRadius: 6, padding: "4px 7px", display: "flex", flexDirection: "column", gap: 2, cursor: "pointer" }}
            onClick={onClickLojas}
            data-tooltip-id="tooltip-faturado"
            data-tooltip-html="Imóveis base necessários para construir"
        >
            <span style={{ fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "rgba(255,255,255,.3)" }}>Imóveis base</span>
            <_ImoveisBaseIcons dados={dados} setorAtivo={setorAtivo} index={index} cor1={cor1} onClickLojas={onClickLojas} />
        </div>
        {/* Custo de Construção — 40% */}
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
const _ImoveisSMartelo = ({ dados, setorAtivo, index, cor1, onClickLojas }) => (
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
            <_ImoveisBaseIcons dados={dados} setorAtivo={setorAtivo} index={index} cor1={cor1} onClickLojas={onClickLojas} />
        </div>
    </div>
);

// ── Linha de Constr. Nec. (60%) + Recursos (40%) ──────────────────────────
// Retorna null se ambas as listas estiverem vazias (oculta a linha inteira)
const _ConstrERecursosRow = ({ arrayConstNece, arrayConstResources, cor1, setorInfo, onClickConstr, booleanPreReq }) => {
    const temConstr = (arrayConstNece || []).length > 0;
    const temRecursos = (arrayConstResources || []).length > 0;
    if (!temConstr && !temRecursos) return null;
    return (
        <div className="flex gap-[3px]" style={{ minHeight: 30 }}>
            {/* Construções Nec. — 60% */}
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
            {/* Recursos de Construção — 40% */}
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

// React.memo evita re-render quando o prop `index` não muda.
const CardUpgradeBase = ({ index, setor,fatu,redCusto }) => {
    const { economiaSetores, setEconomiaSetores, atualizarEco, verificarLimites } = useContext(DadosEconomyGlobalContext);
    const { dados, atualizarDados, atualizarDadosProf2, atualizarDadosProf3, atualizarDadosProf } = useContext(CentraldeDadosContext);
    const setorAtivo = setor;




    const economiaSetor = economiaSetores[setorAtivo];
    const [buttonPurchaseEdifAudio] = useSound(purchaseEdifAudio);

    const productions = [
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
    ];

    const sellFinal = [
        "Livraria", "Mercado", "Açougue", "Petshop", "Farmácia", "Loja De Calçados", "Loja De Vestuário",
        "Loja De Gadgets E Wearables", "Loja De Games", "Loja De Celulares", "Loja De Informática",
        "Loja De Eletrônicos", "Concessionária De Veículos",
    ];

    const edificiosCompassive = [];

    const edificiosDeArmazenamento = [
        "Armazém", "Silo", "Depósito De Resíduos Orgânicos", "Data Center", "Servidor Em Nuvem", "Armazém Logístico",
        "Centro De Distribuição", "Fábrica De Tanque De Armazenamento Biocombustível", "Centro De Coleta De Biomassa",
        "Campo De Estocagem", "Armazém De Materiais Brutos", "Câmara Fria", "Container Modular", "Pátio De Veículos",
        "Armazém Industrial", "Armazém De Materiais Sensíveis", "Hangar", "Pátio De Mineração",
    ];

    // ── CATEGORIA ─────────────────────────────────────────────
    const nomeAtual = dados[setorAtivo].edificios[index].nome;
    const categoriaEdificio = (() => {
        if (edificiosDeArmazenamento.includes(nomeAtual)) return "estoque";
        if (productions.includes(nomeAtual)) return "producao";
        if (sellFinal.includes(nomeAtual)) return "venda";
        return "passiva";
    })();





    const isEstoque = categoriaEdificio === "estoque";
    const isProducao = categoriaEdificio === "producao";
    const isVenda = categoriaEdificio === "venda";
    const isPassiva = categoriaEdificio === "passiva";
    // ──────────────────────────────────────────────────────────

    const setores = [
        { id: "agricultura", corClasse: "bg-[#4CAF50]", img: agricultura, descLicença: "Com a Licença Global de Agricultura, você terá acesso a cultivos exclusivos, otimização de produções e melhorias que aumentarão sua rentabilidade. Liberte o potencial do setor agrícola agora mesmo!", cor1: "#003816", cor2: "#1A5E2A", cor3: "#0C9123", cor4: "#4CAF50" },
        { id: "tecnologia", corClasse: "bg-[#FF8C42]", img: tecnologia, descLicença: "Com a Licença Global de Tecnologia, você desbloqueia inovações que podem transformar sua infraestrutura, otimizar processos e maximizar os lucros. Invista no futuro agora!", cor1: "#A64B00", cor2: "#D45A00", cor3: "#FF6F00", cor4: "#FF8C42" },
        { id: "industria", corClasse: "bg-[#B3B3B3]", img: industria, descLicença: "Com a Licença Global de Indústria, você acessa fábricas avançadas e processos de produção que aceleram sua evolução e aumentam a eficiência. Não fique para trás!", cor1: "#1A1A1A", cor2: "#4D4D4D", cor3: "#808080", cor4: "#B3B3B3" },
        { id: "comercio", corClasse: "bg-[#FF4D4D]", img: comercio, descLicença: "Com a Licença Global de Comércio, você tem acesso a novos mercados, estratégias de vendas e expansão que podem levar seus negócios a um novo nível. Não perca essa oportunidade!", cor1: "#660000", cor2: "#A31919", cor3: "#E60000", cor4: "#FF4D4D" },
        { id: "imobiliario", corClasse: "bg-[#6666FF]", img: imobiliario, descLicença: "Com a Licença Global Imobiliária, você pode investir em novos terrenos, expandir suas construções e maximizar os retornos do mercado imobiliário. Abra as portas para grandes lucros!", cor1: "#000066", cor2: "#1A1A8C", cor3: "#3333CC", cor4: "#6666FF" },
        { id: "energia", corClasse: "bg-[#FFD966]", img: energia, descLicença: "Com a Licença Global de Energia, você ativa fontes de energia sustentáveis e de alta performance, garantindo uma operação eficiente e lucrativa. Potencialize seu setor energético agora!", cor1: "#665200", cor2: "#A37F19", cor3: "#E6B800", cor4: "#FFD966" },
        { id: "grafico", corClasse: "bg-[#6A00FF]", img: grafico, cor1: "#6A00FF", cor2: "#6A00FF", cor3: "#6A00FF", cor4: "#6A00FF" },
    ];

    const [rent, setRent] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [visibleId, setVisibleId] = useState("lojasNec");
    const [modalPowerup, setModalPowerUp] = useState(false);
    const [verificadorDeLojasNecessárias, setVerificador] = useState(true);
    const [verificadorDeConstruçõesNecessárias, setVerificadorConstr] = useState(true);
    const [caixaTexto, setCaixaTexto] = useState(false);

    const contabilidadeDeFalta = (edificio) => {
        const qtdAtual = dados[edificio].quantidade;
        const qtdNecessaria = dados[setorAtivo].edificios[index].lojasNecessarias[edificio];
        const qtdFalta = qtdAtual >= qtdNecessaria ? 0 : qtdNecessaria - qtdAtual;
        const custoTotalConst =
            edificio === "terrenos" ? dados[edificio].preçoConstrução
                : edificio === "lojasP" ? dados[edificio].preçoConstrução + dados.terrenos.preçoConstrução
                    : edificio === "lojasM" ? dados[edificio].preçoConstrução + 2 * dados.terrenos.preçoConstrução
                        : edificio === "lojasG" ? dados[edificio].preçoConstrução + 3 * dados.terrenos.preçoConstrução
                            : "lascou";
        return qtdFalta * custoTotalConst;
    };

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

    const tooltipStyle = { backgroundColor: "#FFFFFF", color: "#350973", borderRadius: "6px", padding: "6px 10px", fontWeight: "600", fontSize: "14px", zIndex: 10 };

    const mapaEdificioParaSetor = {
        "Plantação De Grãos": "agricultura", "Plantação De Vegetais": "agricultura", "Fazenda Administrativa": "agricultura", Pomares: "agricultura", "Cooperativa Agrícola": "agricultura", "Centro De Comércio De Plantações": "agricultura", "Fazenda De Vacas": "agricultura", "Granja De Aves": "agricultura", "Criação De Ovinos": "agricultura", Armazém: "agricultura", Silo: "agricultura", "Depósito De Resíduos Orgânicos": "agricultura", Serraria: "agricultura", "Área Florestal": "agricultura", "Terreno De Mineração": "agricultura", "Plantação De Eucalipto": "agricultura", "Plantação De Plantas Medicinais": "agricultura",
        "Fábrica De Móveis": "industria", "Fábrica De Ração": "industria", "Fábrica De Embalagem": "industria", "Fábrica De Fertilizante": "industria", "Fábrica De Bebidas": "industria", "Fábrica De Pães": "industria", "Fábrica Textil": "industria", "Fábrica De Calçados": "industria", "Fábrica De Roupas": "industria", "Fábrica De Celulose": "industria", "Fábrica De Papel": "industria", "Fábrica De Livros": "industria", "Fábrica De Medicamentos": "industria", "Laboratório Farmacêutico": "industria", "Fábrica De Plasticos": "industria", "Fábrica De Químicos Especializados": "industria", "Alto-Forno": "industria", "Usina Siderúrgica": "industria", "Fundição de Alumínio": "industria", "Fábrica De Ligas Metálicas": "industria", "Indústria De Componentes Mecânicos": "industria", "Fábrica De Chapas Metálicas": "industria", "Fábrica De Estruturas Metálicas": "industria", "Fábrica De Peças Automotivas": "industria", "Montadora De Veículos Elétricos": "industria", "Fábricas De Automóveis": "industria", "Refinaria de Biocombustíveis": "industria", Refinaria: "industria", Biofábrica: "industria", "Fábrica De Chips": "industria", "Fábrica De Placas Eletrônicas": "industria", "Fábrica De Semicondutores": "industria", "Fábrica De Eletrônicos": "industria", "Fábrica De Robôs": "industria", "Empresa De Automação Industrial": "industria", "Fábrica De Motores": "industria", "Fábrica De Foguetes": "industria", "Fábrica De Aeronaves": "industria", Estaleiro: "industria",
        Startup: "tecnologia", "Servidor Em Nuvem": "tecnologia", "Data Center": "tecnologia", "Empresa De Desenvolvimento De Software": "tecnologia", "Empresa De Telecomunicações": "tecnologia", "Plataforma De Redes Sociais": "tecnologia", "Marketplace Online": "tecnologia", "Plataforma De Streaming": "tecnologia", "Fábrica De Smartphones": "tecnologia", "Fábrica De Computadores": "tecnologia", "Fábrica De Consoles de Jogos": "tecnologia", "Fábrica De Dispositivos Vestiveis": "tecnologia", "Instituto De Tecnologia Alimentar ": "tecnologia", "Centro De Pesquisa Agrícola": "tecnologia", "Instituto de Biotecnologia": "tecnologia", "Laboratório De Nanotecnologia": "tecnologia", "Centro De Pesquisa Em Eletrônicos": "tecnologia", "Laboratório De Design De Produtos": "tecnologia", "Centro de Pesquisa Química": "tecnologia", "Centro De Pesquisa Em Fusão Nuclear": "tecnologia", "Laboratório De Novos Combustíveis": "tecnologia", "Centro De Pesquisa Aeroespacial": "tecnologia", "Centro de Engenharia Avançada ": "tecnologia", "Centro de Pesquisa em Materiais Avançados": "tecnologia", "Centro De Pesquisa Em Robótica": "tecnologia", "Centro De Pesquisa Em IA": "tecnologia",
        Feira: "comercio", "Loja De Móveis": "comercio", Restaurante: "comercio", Livraria: "comercio", Mercado: "comercio", Adega: "comercio", Padaria: "comercio", Açougue: "comercio", "Loja De Conveniência": "comercio", "Posto De Combustíveis": "comercio", "Redes De Fast-food": "comercio", Petshop: "comercio", Farmácia: "comercio", Cafeteria: "comercio", "Loja De Departamentos": "comercio", "Loja De Calçados": "comercio", "Loja De Vestuário": "comercio", "Loja de Gadgets e Wearables": "comercio", "Loja De Games": "comercio", "Loja De Celulares": "comercio", "Loja De Informática": "comercio", "Loja De Eletrônicos": "comercio", Joalheria: "comercio", "Concessionária De Veículos": "comercio", "Shopping Popular": "comercio", "Shopping Center": "comercio", "Centro De Transporte e Entrega": "comercio", "Centro De Distribuição": "comercio", "Armazém Logístico": "comercio", "Transporte Petrolífero": "comercio",
        "Cartório E Licenças": "imobiliario", "Terraplanagem E Pavimentação": "imobiliario", "Construtora De Pequenas Obras": "imobiliario", "Escritório De Design De Interiores": "imobiliario", "Escritório De Arquitetura ": "imobiliario", "Consultoria Em Engenharia Civil": "imobiliario", Construtora: "imobiliario", "Imobiliária Residencial": "imobiliario", "Imobiliária Comercial ": "imobiliario", "Construtora De Infraestruturas": "imobiliario", Aeroporto: "imobiliario", Porto: "imobiliario", Mineradora: "imobiliario", "Mineradora Radioativa": "imobiliario", "Mineradora De Pedras Preciosas": "imobiliario", "Mega Mercado": "imobiliario", "Prédio De Alto Padrão": "imobiliario", "Centro De Coleta De Biomassa": "imobiliario", "Tanque De Armazenamento Biocombustível": "imobiliario", "Plataforma De Petróleo": "imobiliario",
        "Subestação De Energia": "energia", "Rede De Distribuição Elétrica": "energia", "Usina Solar": "energia", "Fábrica De Turbinas Eólicas": "energia", "Fábrica De Painéis Solares": "energia", "Fábrica De Baterias": "energia", "Empresa De Comercio Energético": "energia", "Empresa De Consultoria Energética": "energia", "Estação De Carregamento": "energia", "Centro de Pesquisa Em Energias Renováveis": "energia", "Centro De Pesquisa Energética": "energia", "Centro De Reciclagem De Baterias": "energia", "Usina Termelétrica A Biocombustíveis": "energia", "Usina De Biomassa": "energia", "Usina Hidrelétrica": "energia", "Parque Eólico": "energia", "Usina Termolétrica": "energia", "Reator Nuclear Convencional": "energia", "Usina De Fusão Nuclear": "energia",
    };

    const valorEconomiaSetor = { recessão: 0.4, declinio: 0.8, estável: 1, progressiva: 1.1, aquecida: 1.25 }[economiaSetor];


    useEffect(() => {
        const todosSuficientes =
            dados.terrenos.quantidade >= dados[setorAtivo].edificios[index].lojasNecessarias.terrenos &&
            dados.lojasP.quantidade >= dados[setorAtivo].edificios[index].lojasNecessarias.lojasP &&
            dados.lojasM.quantidade >= dados[setorAtivo].edificios[index].lojasNecessarias.lojasM &&
            dados.lojasG.quantidade >= dados[setorAtivo].edificios[index].lojasNecessarias.lojasG;
        setVerificador(todosSuficientes);
    }, [dados, setorAtivo]);

    useEffect(() => {
        const edificio = "lojasP";
        const qtdAtual = dados[edificio]?.quantidade;
        const qtdNecessaria = dados[setorAtivo]?.edificios?.[index]?.lojasNecessarias?.[edificio];
        const edificioSuf = "lojasPSuficientes";
        if (qtdAtual >= qtdNecessaria) {
            const novoEdificio = { ...dados[setorAtivo].edificios[index], lojasNecessarias: { ...dados[setorAtivo].edificios[index].lojasNecessarias, [edificioSuf]: true } };
            const novaLista = [...dados[setorAtivo].edificios];
            novaLista[index] = novoEdificio;
            atualizarDados({ ...dados, [setorAtivo]: { ...dados[setorAtivo], edificios: novaLista } });
        }
    }, [dados.dia]);

    const edificioObj = { nome: dados[setorAtivo].edificios[index].nome, recursoDeConstrução: dados[setorAtivo].edificios[index].recursoDeConstrução, construNece: dados[setorAtivo].edificios[index].construçõesNecessárias };
    const arrayConstResources = edificioObj.recursoDeConstrução;
    const arrayConstNece = edificioObj.construNece;

    const formatarNumero = (num) => {
        if (num >= 1e12) return (num / 1e12).toFixed(1).replace(".0", "") + "T";
        if (num >= 1e9) return (num / 1e9).toFixed(1).replace(".0", "") + "B";
        if (num >= 1e6) return (num / 1e6).toFixed(1).replace(".0", "") + "M";
        if (num >= 1e3) return (num / 1e3).toFixed(1).replace(".0", "") + "K";
        return num.toString();
    };

    const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

    const booleanPreReq = useCallback((nomeEd) => {
        for (const setor of setoresArr) {
            const idx = dados[setor].edificios.findIndex((ed) => ed.nome === nomeEd);
            if (idx !== -1) return dados[setor].edificios[idx].quantidade > 0;
        }
        return false;
    }, [dados, setoresArr]);

    let timer;
    const openModalPowerUps = () => setModalPowerUp(true);
    const fecharModalPowerUp = () => setModalPowerUp(false);
    const handleMouseEnter = () => { timer = setTimeout(() => setIsModalOpen(true), 0); };
    const handleMouseLeave = () => clearTimeout(timer);
    const handleMouseLeaveFinal = () => { timer = setTimeout(() => setIsModalOpen(false), 1200); };

    function calcularCustoRecurso(nomeRecurso, nivel = 1) {
        for (const setor of setoresArr) {
            const edEncontrado = dados[setor]?.edificios?.find((e) => e.nome === nomeRecurso);
            if (edEncontrado) {
                const c = edEncontrado.custoConstrucao || 0;
                const tNec = edEncontrado.lojasNecessarias.terrenos || 0, pNec = edEncontrado.lojasNecessarias.lojasP || 0, mNec = edEncontrado.lojasNecessarias.lojasM || 0, gNec = edEncontrado.lojasNecessarias.lojasG || 0;
                let total = c + tNec * dados.terrenos.preçoConstrução + pNec * (dados.lojasP.preçoConstrução + dados.lojasP.quantidadeNecTerreno * dados.terrenos.preçoConstrução) + mNec * (dados.lojasM.preçoConstrução + dados.lojasM.quantidadeNecTerreno * dados.terrenos.preçoConstrução) + gNec * (dados.lojasG.preçoConstrução + dados.lojasG.quantidadeNecTerreno * dados.terrenos.preçoConstrução);
                if (Array.isArray(edEncontrado.recursoDeConstrução) && edEncontrado.recursoDeConstrução.length > 0) edEncontrado.recursoDeConstrução.forEach((sub) => { total += calcularCustoRecurso(sub, nivel + 1); });
                return total;
            }
        }
        return 0;
    }

    const [flipped, setFlipped] = useState(false);
    const handleFlip = () => setFlipped(!flipped);
    const handleShow = (id) => setVisibleId(id);

    const setorInfo = setores.find((s) => s.id === setorAtivo);
    const quantidadeMinimaPowerUpNv2 = dados[setorAtivo].edificios[index].powerUp.nível2.quantidadeMínima;
    const quantidadeMinimaPowerUpNv3 = dados[setorAtivo].edificios[index].powerUp.nível3.quantidadeMínima;
    const corPadrão = { backgroundColor: setorInfo.cor2 };

    const corPowerUp = (pu) => {
        switch (pu) { case "powerUpNv1": return "#8F5ADA"; case "powerUpNv2": return "#6411D9"; case "powerUpNv3": return "#350973"; default: return corPadrão; }
    };



    const quantidadeTerrenosNec = dados[setorAtivo].edificios[index].lojasNecessarias.terrenos;
    const quantidadeLojasPNec = dados[setorAtivo].edificios[index].lojasNecessarias.lojasP;
    const quantidadeLojasMNec = dados[setorAtivo].edificios[index].lojasNecessarias.lojasM;
    const quantidadeLojasGNec = dados[setorAtivo].edificios[index].lojasNecessarias.lojasG;
    const CustoTotalSomadoLojas =
        quantidadeTerrenosNec * dados.terrenos.preçoConstrução +
        quantidadeLojasPNec * (dados.lojasP.preçoConstrução + dados.lojasP.quantidadeNecTerreno * dados.terrenos.preçoConstrução) +
        quantidadeLojasMNec * (dados.lojasM.preçoConstrução + dados.lojasM.quantidadeNecTerreno * dados.terrenos.preçoConstrução) +
        quantidadeLojasGNec * (dados.lojasG.preçoConstrução + dados.lojasG.quantidadeNecTerreno * dados.terrenos.preçoConstrução);

    const podeComprarCard = (edif, setorAtivo) => {
        const loc = (nome) => { for (const s of setoresArr) { const idx = dados[s]?.edificios?.findIndex((e) => e.nome === nome); if (idx !== -1) return dados[s].edificios[idx]; } return null; };
        if (!edif) return { ok: false, motivo: "Edifício não encontrado" };
        const carteira = economiaSetores?.carteira?.carteiraAtual ?? [];
        const resultado = verificarLimites(edif, setorAtivo, carteira);
        if (resultado !== true) return { ok: false, motivo: resultado };
        const custo = Number(edif.custoConstrucao ?? 0);
        if (economiaSetores.saldo < custo) return { ok: false, motivo: "Saldo insuficiente" };
        const { terrenos = 0, lojasP = 0, lojasM = 0, lojasG = 0 } = edif.lojasNecessarias || {};
        if ((dados.terrenos?.quantidade ?? 0) < terrenos || (dados.lojasP?.quantidade ?? 0) < lojasP || (dados.lojasM?.quantidade ?? 0) < lojasM || (dados.lojasG?.quantidade ?? 0) < lojasG) return { ok: false, motivo: "Você não tem lojas ou terrenos suficientes" };
        if (edif.construçõesNecessárias?.length) for (const nome of edif.construçõesNecessárias) { const ref = loc(nome); if (!ref) return { ok: false, motivo: `Construção "${nome}" não encontrada` }; if (ref.quantidade <= 0) return { ok: false, motivo: `Precisa de 1 unidade de "${nome}"` }; }
        if (edif.recursoDeConstrução?.length) for (const nome of edif.recursoDeConstrução) { const ref = loc(nome); if (!ref) return { ok: false, motivo: `Recurso "${nome}" não encontrado` }; if (ref.quantidade <= 0) return { ok: false, motivo: `Precisa de 1 unidade de "${nome}"` }; }
        return { ok: true };
    };

    const edif = dados?.[setorAtivo]?.edificios?.[index];
    const { ok: podeComprar, motivo } = podeComprarCard(edif, setorAtivo);

    const comprarCard = () => {
        const loc = (nome) => { for (const s of setoresArr) { const idx = dados[s]?.edificios?.findIndex((e) => e.nome === nome); if (idx !== -1) return { setor: s, index: idx, edificio: dados[s].edificios[idx] }; } return null; };
        const edif = dados?.[setorAtivo]?.edificios?.[index];
        if (!edif) { atualizarDados("modalAlert", { ...dados.modalAlert, estadoModal: true, head: "Erro", content: "Edifício não encontrado." }); return; }
        const carteira = economiaSetores?.carteira?.carteiraAtual ?? [];
        if (verificarLimites(edif, setorAtivo, carteira) !== true) return;
        const custo = Number(edif.custoConstrucao ?? 0);
        if (economiaSetores.saldo < custo) { atualizarDados("modalAlert", { ...dados.modalAlert, estadoModal: true, head: "Erro na construção", content: "Você não tem dinheiro suficiente." }); return; }
        const { terrenos: qT = 0, lojasP: qP = 0, lojasM: qM = 0, lojasG: qG = 0 } = edif.lojasNecessarias || {};
        const qTa = Number(dados?.terrenos?.quantidade ?? 0), qPa = Number(dados?.lojasP?.quantidade ?? 0), qMa = Number(dados?.lojasM?.quantidade ?? 0), qGa = Number(dados?.lojasG?.quantidade ?? 0);
        if (qT > qTa || qP > qPa || qM > qMa || qG > qGa) { atualizarDados("modalAlert", { ...dados.modalAlert, estadoModal: true, head: "Falta edifícios base", content: "Não tem lojas/terrenos suficientes." }); return; }
        if (edif.construçõesNecessárias?.length) for (const nome of edif.construçõesNecessárias) { const res = loc(nome); if (!res) { atualizarDados("modalAlert", { ...dados.modalAlert, estadoModal: true, head: `Falta ${nome}`, content: `"${nome}" não encontrado.` }); return; } if (res.edificio.quantidade <= 0) { atualizarDados("modalAlert", { ...dados.modalAlert, estadoModal: true, head: `Falta ${nome}`, content: `Precisa de 1 unidade de "${nome}".` }); return; } }
        if (edif.recursoDeConstrução?.length) for (const nome of edif.recursoDeConstrução) { const res = loc(nome); if (!res) { atualizarDados("modalAlert", { ...dados.modalAlert, estadoModal: true, head: `Erro`, content: `"${nome}" não encontrado.` }); return; } if (res.edificio.quantidade <= 0) { atualizarDados("modalAlert", { ...dados.modalAlert, estadoModal: true, head: `Precisa de ${nome}`, content: `Precisa de 1 unidade de "${nome}".` }); return; } }
        buttonPurchaseEdifAudio();
        atualizarEco("saldo", economiaSetores.saldo - custo);
        atualizarDadosProf2([setorAtivo, "edificios", index, "quantidade"], (edif.quantidade || 0) + 1);
        atualizarDadosProf2(["terrenos", "quantidade"], qTa - qT); atualizarDadosProf2(["lojasP", "quantidade"], qPa - qP); atualizarDadosProf2(["lojasM", "quantidade"], qMa - qM); atualizarDadosProf2(["lojasG", "quantidade"], qGa - qG);
        const custosEdBase = qT * dados.terrenos.preçoConstrução + qP * (dados.lojasP.preçoConstrução + dados.lojasP.quantidadeNecTerreno * dados.terrenos.preçoConstrução) + qM * (dados.lojasM.preçoConstrução + dados.lojasM.quantidadeNecTerreno * dados.terrenos.preçoConstrução) + qG * (dados.lojasG.preçoConstrução + dados.lojasG.quantidadeNecTerreno * dados.terrenos.preçoConstrução);
        if (edif.recursoDeConstrução?.length) for (const nome of edif.recursoDeConstrução) { const r = loc(nome) || {}; if (r.edificio) atualizarDadosProf2([r.setor, "edificios", r.index, "quantidade"], (r.edificio.quantidade || 0) - 1); }
        const setorIndex = setoresArr.indexOf(setorAtivo);
        const novaCarteira = [...carteira];
        if (!novaCarteira[setorIndex]) novaCarteira[setorIndex] = [];
        novaCarteira[setorIndex] = [...novaCarteira[setorIndex], { ...edif, quantidade: 1 }];
        atualizarEco("carteira", { ...economiaSetores.carteira, carteiraAtual: novaCarteira });
        atualizarEco("patrimonio", economiaSetores.patrimonio + custosEdBase + custo);
        atualizarEco("patrimônio", { ...economiaSetores[setorAtivo].economiaSetor, patrimonio: economiaSetores[setorAtivo].economiaSetor.patrimonio + custosEdBase + custo });
        const carteiraNorm = setoresArr.map((_, i) => Array.isArray(novaCarteira[i]) ? novaCarteira[i] : []);
        let totalEd = 0; const nomesSet = new Set();
        carteiraNorm.forEach((arr) => arr.forEach((item) => { if (!item) return; nomesSet.add(item.nome); totalEd += Number(item.quantidade ?? 1); }));
        atualizarEco("centralEdificios", { ...economiaSetores.centralEdificios, quantidadeSetoresAtual: carteiraNorm.reduce((a, arr) => a + (arr.length > 0 ? 1 : 0), 0), QuantidadeEdifíciosAtual: totalEd, QuantidadeDiversosEdificiosAtual: nomesSet.size });
    };


const sistemColor = fatu + redCusto



    const quantidadeAtivoAtual = dados[setorAtivo].edificios[index].quantidade;
    // const powerUpSelecionado = quantidadeAtivoAtual >= quantidadeMinimaPowerUpNv3 ? "powerUpNv3" : quantidadeAtivoAtual >= quantidadeMinimaPowerUpNv2 ? "powerUpNv2" : "powerUpNv1";
    const powerUpSelecionado = sistemColor >= 15 ? "powerUpNv3" : 8 >= quantidadeMinimaPowerUpNv2 ? "powerUpNv2" : "powerUpNv1";
    const corPowerUpAtual = corPowerUp(powerUpSelecionado);
    const corLinha = quantidadeAtivoAtual > 0 ? corPowerUpAtual : corPadrão;
    const lineStyle = { background: corLinha };
    const bgColuna1 = corLinha === "#8F5ADA" ? corPowerUp("powerUpNv1") : powerUpSelecionado === "powerUpNv2" ? corPowerUp("powerUpNv2") : powerUpSelecionado === "powerUpNv3" ? corPowerUp("powerUpNv3") : corPadrão;
    const bgColuna2 = powerUpSelecionado === "powerUpNv1" ? corPadrão : powerUpSelecionado === "powerUpNv2" ? corPowerUp("powerUpNv2") : corPowerUp("powerUpNv3");
    const bgColuna3 = powerUpSelecionado === "powerUpNv1" ? corPadrão : powerUpSelecionado === "powerUpNv2" ? corPadrão : corPowerUp("powerUpNv3");
    const columnStyleNv1 = { backgroundColor: bgColuna1 }, columnStyleNv2 = { backgroundColor: bgColuna2 }, columnStyleNv3 = { backgroundColor: bgColuna3 };

    const [acumuladorPowerUpRedCustoFornece, setAcumuladorPowerUpRedCustoFornece] = useState(0);
    const [acumuladorPowerUpAumFatuFornece, setAcumuladorPowerUpAumFatuFornece] = useState(0);
    const [acumuladorPowerUpRedCustoRecebe, setAcumuladorPowerUpRedCustoRecebe] = useState(0);
    const [acumuladorPowerUpAumFatuRecebe, setAcumuladorPowerUpAumFatuRecebe] = useState(0);

    useEffect(() => {
        let r = 0, a = 0;
        dados[setorAtivo].edificios[index].ForneceMelhoraEficiencia.forEach((ed) => {
            let se = null, idx = -1;
            const qtd = (nome) => { for (const s of setoresArr) { se = s; idx = dados[s].edificios.findIndex((e) => e.nome === nome); if (idx !== -1) return dados[s].edificios[idx].quantidade; } return 0; };
            const qtdM = qtd(ed.nome), q = qtd(dados[setorAtivo].edificios[index].nome);
            const pu = q >= quantidadeMinimaPowerUpNv3 ? "powerUpNv3" : q >= quantidadeMinimaPowerUpNv2 ? "powerUpNv2" : "powerUpNv1";
            if (qtdM > 0) { r += pu === "powerUpNv1" ? ed.redCusto.nível1 : pu === "powerUpNv2" ? ed.redCusto.nível2 : ed.redCusto.nível3; a += pu === "powerUpNv1" ? ed.aumFatu.nível1 : pu === "powerUpNv2" ? ed.aumFatu.nível2 : ed.aumFatu.nível3; }
        });
        setAcumuladorPowerUpRedCustoFornece(r); setAcumuladorPowerUpAumFatuFornece(a);
    }, [dados, setorAtivo, index, setoresArr, quantidadeMinimaPowerUpNv2, quantidadeMinimaPowerUpNv3]);

    useEffect(() => {
        let r = 0, a = 0;
        dados[setorAtivo].edificios[index].RecebeMelhoraEficiencia.forEach((ed) => {
            let se = null, idx = -1;
            const qtd = (nome) => { for (const s of setoresArr) { se = s; idx = dados[s].edificios.findIndex((e) => e.nome === nome); if (idx !== -1) return dados[s].edificios[idx].quantidade; } return 0; };
            const qtdM = qtd(ed.nome), q = qtd(dados[setorAtivo].edificios[index].nome);
            const pu = q >= quantidadeMinimaPowerUpNv3 ? "powerUpNv3" : q >= quantidadeMinimaPowerUpNv2 ? "powerUpNv2" : "powerUpNv1";
            if (qtdM > 0) { r += pu === "powerUpNv1" ? ed.redCusto.nível1 : pu === "powerUpNv2" ? ed.redCusto.nível2 : ed.redCusto.nível3; a += pu === "powerUpNv1" ? ed.aumFatu.nível1 : pu === "powerUpNv2" ? ed.aumFatu.nível2 : ed.aumFatu.nível3; }
        });
        setAcumuladorPowerUpRedCustoRecebe(r); setAcumuladorPowerUpAumFatuRecebe(a);
    }, [dados, setorAtivo, index, setoresArr, quantidadeMinimaPowerUpNv2, quantidadeMinimaPowerUpNv3]);

    const valorFatu = dados[setorAtivo].edificios[index].finanças.faturamentoUnitário;
    const valorImpostoFixo = dados[setorAtivo].edificios[index].finanças.impostoFixo;
    const impostoSobreFatu = dados[setorAtivo].edificios[index].finanças.impostoSobreFatu;

    const fatorEconomico = { "recessão": 0.4, "declinio": 0.8, "estável": 1, "progressiva": 1.1, "aquecida": 1.25 }[economiaSetor];

    const impostoSobreFatuFinal = impostoSobreFatu - impostoSobreFatu * (acumuladorPowerUpRedCustoRecebe / 100);
    const valorFatuFinal = valorFatu + valorFatu * (acumuladorPowerUpAumFatuRecebe / 100);
    const valorImpostoFixoFinal = valorImpostoFixo - valorImpostoFixo * (acumuladorPowerUpRedCustoRecebe / 100);

    const custoRecursos = useMemo(() => {
        let total = 0;
        arrayConstResources?.forEach((nome) => { total += calcularCustoRecurso(nome); });
        return total;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        arrayConstResources,
        dados.terrenos.preçoConstrução,
        dados.lojasP.preçoConstrução,
        dados.lojasM.preçoConstrução,
        dados.lojasG.preçoConstrução,
    ]);

    const fatuMensal = valorFatuFinal * 30 * fatorEconomico;
    const valorImpostoSobreFatu = fatuMensal * impostoSobreFatuFinal;
    const valorFinalMês = fatuMensal - valorImpostoSobreFatu - valorImpostoFixoFinal;
    const custoConstrução = dados[setorAtivo].edificios[index].custoConstrucao;
    const totalCusto = CustoTotalSomadoLojas + custoRecursos + custoConstrução

    const raridade = getRaridade(totalCusto);

    const RARIDADE_CONFIG = {
        comum: { label: "Comum", stars: 1, cor: "#3a8c42", corText: "#a8ffb0", corBg: "#0c2210", corBorder: "#3a8c4244" },
        incomum: { label: "Incomum", stars: 2, cor: "#4488ff", corText: "#88ccff", corBg: "#001030", corBorder: "#4488ff44" },
        raro: { label: "Raro", stars: 3, cor: "#9944ff", corText: "#cc88ff", corBg: "#180030", corBorder: "#9944ff44" },
        epico: { label: "Épico", stars: 4, cor: "#ff9933", corText: "#ffcc88", corBg: "#2a0c00", corBorder: "#ff993344" },
        lendario: { label: "Lendário", stars: 5, cor: "#ffd700", corText: "#fff8d0", corBg: "#1a1000", corBorder: "#ffd70066" },
    };

    const rConfig = RARIDADE_CONFIG[raridade];

    const getGradientByRaridade = () => {
        const g = {
            comum: `linear-gradient(160deg, #1b3a1e 0%, #2d6e33 40%, #1b3a1e 100%)`,
            incomum: `linear-gradient(160deg, #001a4d 0%, #0042b0 35%, #001a4d 70%, #003399 100%)`,
            raro: `linear-gradient(160deg, #2a0050 0%, #6600cc 30%, #4400aa 60%, #2a0050 100%)`,
            epico: `linear-gradient(160deg, #4d2000 0%, #cc5500 30%, #ff6600 55%, #cc4400 75%, #4d2000 100%)`,
            lendario: `linear-gradient(160deg, #3d2800 0%, #8b6000 20%, #d4a017 40%, #ffd700 55%, #d4a017 70%, #8b6000 85%, #3d2800 100%)`,
        };
        return g[raridade];
    };

    const getBordaRaridade = () => {
        const sombras = {
            comum: `0 8px 24px #00000088`,
            incomum: `0 8px 32px #0044ff44, 0 0 40px #0022aa22`,
            raro: `0 8px 32px #6600cc44, 0 0 60px #44008844`,
            epico: `0 8px 32px #ff660044, 0 0 60px #cc440022`,
            lendario: `0 8px 40px #ffd70066, 0 0 80px #ffaa0033, inset 0 0 30px #ffd70011`,
        };
        return {
            border: `${raridade === "lendario" ? "2px" : "1.5px"} solid ${rConfig.cor}`,
            boxShadow: sombras[raridade],
            borderRadius: "14px",
        };
    };

    const gradientLevel = () => {
        if (powerUpSelecionado === "powerUpNv3") return "#FFD700";
        if (powerUpSelecionado === "powerUpNv2") return "#6411D9";
        return setorInfo.cor2; // nível 1 — cor padrão do setor
    };

    // Lógica para determinar as cores do gradiente baseadas no nível
    const getGradient = () => {
        if (isProducao) {
            // Exemplo de Radial para Produção
            if (isProducao) {
                return `radial-gradient(circle at 2% 50%, ${setorInfo.cor1}99 0%, ${setorInfo.cor4}FF 40%, ${gradientLevel()}CC 70%, ${setorInfo.cor4}FF 80%, ${setorInfo.cor2}B3 85%, ${setorInfo.cor1}99 92%, ${setorInfo.cor2}B3 98%, ${setorInfo.cor4}FF 100%)`;
            }
        }
        if (isVenda) {
            // Exemplo de gradiente diferenciado para Venda
            return `radial-gradient(circle at 100% 0%, ${setorInfo.cor1}11 0%, ${gradientLevel()}CC 12%, ${setorInfo.cor4}CC 28%, ${setorInfo.cor3}FF 48%, ${setorInfo.cor3}FF 62%, ${gradientLevel()}99 80%, ${setorInfo.cor1}11 100%)`;
        }





        if (isEstoque) {
            // Exemplo de gradiente diferenciado para Venda
            return `linear-gradient(190deg, ${gradientLevel()}15 0%, ${setorInfo.cor4}EE 28%, ${setorInfo.cor3}CC 50%, ${setorInfo.cor4}EE 70%, ${setorInfo.cor1}77 100%)`;
        }






        if (isPassiva) {
            // Exemplo de gradiente diferenciado para Venda
            return `linear-gradient(135deg, ${gradientLevel()}FF 0%, ${setorInfo.cor2}77 15%, ${setorInfo.cor3}BB 35%, ${setorInfo.cor4}FF 52%, ${setorInfo.cor3}99 70%, ${setorInfo.cor1}FF 100%)`;
            // return `radial-gradient(circle at center, ${setorInfo.cor3} 0%, rgba(255,255,255,0) 70%)`;
        }
        // Gradiente padrão para os outros
    };

    const getBordaDinamica = (isProducao, isVenda, isEstoque, isPassiva) => {
        // Produção: Bordas TL e BR bem arredondadas (Estilo Nível 2 da foto)
        if (isProducao) {
            return {
                border: `2px solid ${setorInfo.cor1}55`,
                boxShadow: `0 0 0 1px ${setorInfo.cor3}88`,
                borderRadius: "25px 10px 25px 10px"
            };
        }

        // Estoque: Bordas TL e BR mais quadradas/sutis (Estilo Nível 1 da foto)
        if (isEstoque) {
            return {
                border: `2px solid ${setorInfo.cor2}`,
                boxShadow: `0 0 0 3px ${setorInfo.cor3}88`,
                borderRadius: "20px 20px 20px 20px"
            };
        }

        // Venda: Um estilo intermediário
        if (isVenda) {
            return {
                borderRadius: "20px 20px 20px 20px",
                border: `1.5px solid ${setorInfo.cor3}`
            };
        }

        // Renda Passiva: Estilo "Onda/Orgânico" (Igual à última linha da sua imagem)
        if (isPassiva) {
            return {
                border: `1px solid ${setorInfo.cor3}55`,
                boxShadow: `0 0 0 1px ${setorInfo.cor1}88`,
                borderRadius: "20px 20px 20px 20px"
            };
        }

        // Padrão caso nenhum seja true
        return { borderRadius: "20px 20px 20px 20px" };
    };

    const getGradientByLevel = () => {
        if (powerUpSelecionado === "powerUpNv3") {
            return `linear-gradient(135deg, #7a5500 0%, #b8870b 20%, #F27405 40%, #FFD700 60%, #F27405 80%, #7a5500 100%)`;
        }
        if (powerUpSelecionado === "powerUpNv2") {
            return `linear-gradient(135deg, #350973 0%, #6411D9 25%, #8F5ADA 50%, #6411D9 75%, #350973 100%)`;
        }
        return `transparent`;
    };

    return (
        <motion.div
            style={{
                background: getGradientByLevel(),

                ...getBordaDinamica(isProducao, isVenda, isEstoque, isPassiva),
            }}
            className="w-[220px] h-[320px] bg-white rounded-[20px] flex flex-col justify-center items-center shadow-lg perspective rounded-br-2xl"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}

        >
            <motion.div
                className="relative w-full h-full rounded-2xl rounded-br-2xl"
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                op
                style={{ transformStyle: "preserve-3d", }}

            >
                {/* badges de categoria */}
                <div className="absolute bottom-0 right-0 w-[50px] h-[50px] z-20 flex items-center justify-center rounded-tl-2xl rounded-br-2xl">
                    {/* O fundo do ícone que "recorta" a carta */}
                    <div
                        className="absolute inset-0 rounded-tl-2xl rounded-br-2xl"
                        style={{
                            backgroundColor: setorInfo.cor3, // Cor base do nível/setor
                            filter: 'brightness(0.8)',
                            boxShadow: '-2px -2px 10px rgba(0,0,0,0.3)',


                        }}
                    />
                    {/* Ícones condicionais */}
                    <div
                        className="w-[50px] h-[50px] flex items-center justify-center rounded-tl-2xl rounded-br-2xl"
                        style={{
                            backgroundColor: 'rgba(0,0,0,0.2)', // Um fundo escurecido sutil para o ícone
                            backdropFilter: 'blur(4px)',

                        }}
                    >
                        {isProducao && <img src={passive} className="w-[24px] opacity-90  " alt="" />}
                        {isVenda && <img src={passive} className="w-[24px] opacity-90" alt="" />}
                        {isEstoque && <img src={passive} className="w-[24px] opacity-90" alt="" />}
                        {isPassiva && <img src={passive} className="w-[24px] opacity-90" alt="" />}
                    </div>
                </div>
                {/* ════ FRENTE DO CARD ════ */}
                <div
                    className="absolute w-full h-full flex items-center justify-center rounded-xl"
                    style={{
                        background: getGradient(),
                        mixBlendMode: "color-dodge",
                    }}
                >
                    <div className="w-[90%] h-[90%] flex flex-col items-center justify-between self-center">

                        {/* Imagem + nome */}
                        <div className="flex-1 flex flex-col items-center justify-center gap-[10px] w-full">

                            {/* Badge de raridade — topo direito */}
                            <div
                                style={{
                                    position: "absolute", top: 8, right: 8, zIndex: 15,
                                    fontSize: 7, fontWeight: 800,
                                    textTransform: "uppercase", letterSpacing: ".1em",
                                    padding: "2px 6px", borderRadius: 4,
                                    background: `${setorInfo.cor1}cc`,
                                    color: setorInfo.cor4,
                                    border: `1px solid ${setorInfo.cor4}66`,
                                }}
                            >
                                {raridade === "comum" && "Comum"}
                                {raridade === "incomum" && "Incomum"}
                                {raridade === "raro" && "Raro"}
                                {raridade === "epico" && "Épico"}
                                {raridade === "lendario" && "Lendário"}
                            </div>

                            {/* Cantos ornamentais — só lendário */}
                            {raridade === "lendario" && ["tl", "tr", "bl", "br"].map((pos) => (
                                <div
                                    key={pos}
                                    style={{
                                        position: "absolute",
                                        ...(pos.includes("t") ? { top: 6 } : { bottom: 6 }),
                                        ...(pos.includes("l") ? { left: 6 } : { right: 6 }),
                                        color: setorInfo.cor4,
                                        fontSize: 10, opacity: 0.8,
                                        textShadow: `0 0 6px ${setorInfo.cor4}`,
                                        zIndex: 5, pointerEvents: "none",
                                    }}
                                >✦</div>
                            ))}

                            {/* Box da imagem */}
                            <div
                                style={{
                                    width: 100, height: 100,
                                    borderRadius: 12,
                                    background: `linear-gradient(135deg, ${setorInfo.cor1} 0%, ${setorInfo.cor2} 100%)`,
                                    border: `1px solid ${setorInfo.cor3}66`,
                                    boxShadow: `0 4px 20px ${setorInfo.cor4}33, inset 0 0 20px ${setorInfo.cor1}88`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    position: "relative", overflow: "hidden",
                                    flexShrink: 0,
                                }}
                            >
                                <img
                                    src={getImageUrl(nomeAtual)}
                                    alt={nomeAtual}
                                    style={{
                                        width: "70%", height: "70%", objectFit: "contain",
                                        filter: `drop-shadow(0 0 8px ${setorInfo.cor4}88)`,
                                    }}
                                />

                                {/* Estrelas dentro da box */}
                                <div
                                    style={{
                                        position: "absolute", bottom: 5,
                                        left: 0, right: 0,
                                        display: "flex", justifyContent: "center", gap: 2,
                                        fontSize: 8,
                                        color: setorInfo.cor4,
                                        textShadow: raridade === "lendario" ? `0 0 6px ${setorInfo.cor4}` : "none",
                                    }}
                                >
                                    {"★".repeat(
                                        raridade === "comum" ? 1 :
                                            raridade === "incomum" ? 2 :
                                                raridade === "raro" ? 3 :
                                                    raridade === "epico" ? 4 : 5
                                    )}
                                </div>
                            </div>

                            {/* Divisor luminoso */}
                            <div style={{
                                width: "85%", height: 1,
                                background: `linear-gradient(90deg, transparent, ${setorInfo.cor4}, transparent)`,
                                boxShadow: raridade === "lendario" || raridade === "epico"
                                    ? `0 0 6px ${setorInfo.cor4}88`
                                    : "none",
                            }} />

                            {/* Nome */}
                            <h1
                                className="fonteBold text-center text-white"
                                style={{
                                    fontSize: 12, lineHeight: 1.3, maxWidth: "85%",
                                    textTransform: "uppercase", letterSpacing: ".04em",
                                    textShadow: raridade === "lendario"
                                        ? `0 0 10px ${setorInfo.cor4}88, 0 1px 4px #00000088`
                                        : `0 1px 6px #00000088`,
                                }}
                            >
                                {nomeAtual}
                            </h1>
                            <h1
                                className="fonteLight text-center text-white"
                                style={{
                                    fontSize: 10, lineHeight: 1.3, maxWidth: "85%",
                                    textTransform: "uppercase", letterSpacing: ".04em",
                                    textShadow: raridade === "lendario"
                                        ? `0 0 10px ${setorInfo.cor4}88, 0 1px 4px #00000088`
                                        : `0 1px 6px #00000088`,
                                }}
                            >
                               Redução de Custo: - {redCusto} %
                            </h1>
                            <h1
                                className="fonteLight text-center text-white"
                                style={{
                                    fontSize: 10, lineHeight: 1.3, maxWidth: "85%",
                                    textTransform: "uppercase", letterSpacing: ".04em",
                                    textShadow: raridade === "lendario"
                                        ? `0 0 10px ${setorInfo.cor4}88, 0 1px 4px #00000088`
                                        : `0 1px 6px #00000088`,
                                }}
                            >
                                Faturamento: + {fatu} %
                            </h1>
                        </div>

                        <div style={{
                            padding: "0 8px", borderRadius: 6, flexShrink: 0,
                            background: setorInfo.cor1,
                            color: setorInfo.cor4,
                            border: `1px solid ${setorInfo.cor3}66`,
                            display: "flex", alignItems: "center",
                            fontSize: 10, fontWeight: 700,
                        }}>
                            {formatarNumero(totalCusto)}
                        </div>



                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export const CardUpgrade = React.memo(CardUpgradeBase);