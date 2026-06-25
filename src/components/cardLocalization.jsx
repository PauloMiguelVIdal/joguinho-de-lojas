import React, { useEffect, useMemo, useCallback } from "react";
import { useContext, useState } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import porcem from "../../public/outrasImagens/simbolo-de-porcentagem.png";
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
import passive from "../../public/outrasImagens/rendaPassiva.png";
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
import { useRef } from "react";
import { createPortal } from "react-dom";
import useSound from "use-sound";

import editar from "../../public/outrasImagens/editar.png";

import changeSectoryAudio from "../../public/sounds/changeSectoryAudio.mp3";
import closeAudio from "../../public/sounds/closeAudio.mp3";
import openAudio from "../../public/sounds/openAudio.mp3";
import walletOpenAudio from "../../public/sounds/walletOpenAudio.mp3";

const getImageUrl = (nome) => `/imagens/${nome}.png`;


// const [ativo, setAtivo] = useState("grafico");
// // if setor carteira e quantidade maior que 0 poder clicar else desativar ir até o edifício 
// const goCardPanel = () =>{
//   setAtivo('gerenciamento')
//         <ManagerPanelInterface
//           edificioId={edificioSelecionado}
//           onBack={() => setEdificioSelecionado(null)}
//         />

//                              setAtivo(setor.id);
//                             changeAudio();
//                             atualizarDadosProf2(["setorAtivo"], setor.id);
// }




export const CardLocalization = ({ index, setor, abrirModalSell }) => {
  const { economiaSetores } = useContext(DadosEconomyGlobalContext);
  const { dados, atualizarDados, atualizarDadosProf2 } = useContext(CentraldeDadosContext);

  const setorAtivo = setor;
  if (!dados[setorAtivo] || !dados[setorAtivo].edificios || !dados[setorAtivo].edificios[index]) {
  return null;
}
  const [changeAudio] = useSound(changeSectoryAudio);
  const [buttonCloseAudio] = useSound(closeAudio);
  const [buttonOpenAudio] = useSound(openAudio);
  const [buttonWalletOpenAudio] = useSound(walletOpenAudio);

  const setores = [
    { id: "agricultura", img: agricultura, cor1: "#003816", cor2: "#1A5E2A", cor3: "#0C9123", cor4: "#4CAF50" },
    { id: "tecnologia", img: tecnologia, cor1: "#A64B00", cor2: "#D45A00", cor3: "#FF6F00", cor4: "#FF8C42" },
    { id: "industria", img: industria, cor1: "#1A1A1A", cor2: "#4D4D4D", cor3: "#808080", cor4: "#B3B3B3" },
    { id: "comercio", img: comercio, cor1: "#660000", cor2: "#A31919", cor3: "#E60000", cor4: "#FF4D4D" },
    { id: "imobiliario", img: imobiliario, cor1: "#000066", cor2: "#1A1A8C", cor3: "#3333CC", cor4: "#6666FF" },
    { id: "energia", img: energia, cor1: "#665200", cor2: "#A37F19", cor3: "#E6B800", cor4: "#FFD966" },
    { id: "grafico", img: grafico, cor1: "#6A00FF", cor2: "#6A00FF", cor3: "#6A00FF", cor4: "#6A00FF" },
  ];

  const setorInfo = setores.find((s) => s.id === setorAtivo);
  const nomeAtivo = dados[setorAtivo]?.edificios[index]?.nome;
  const nomeAtual = dados[setorAtivo].edificios[index].nome;
  // ── CATEGORIA ─────────────────────────────────────────────
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
  const edificiosDeArmazenamento = [
    "Armazém", "Silo", "Depósito De Resíduos Orgânicos", "Data Center", "Servidor Em Nuvem", "Armazém Logístico",
    "Centro De Distribuição", "Fábrica De Tanque De Armazenamento Biocombustível", "Centro De Coleta De Biomassa",
    "Campo De Estocagem", "Armazém De Materiais Brutos", "Câmara Fria", "Container Modular", "Pátio De Veículos",
    "Armazém Industrial", "Armazém De Materiais Sensíveis", "Hangar", "Pátio De Mineração",
  ];

  const categoriaEdificio = (() => {
    if (edificiosDeArmazenamento.includes(nomeAtivo)) return "estoque";
    if (productions.includes(nomeAtivo)) return "producao";
    if (sellFinal.includes(nomeAtivo)) return "venda";
    return "passiva";
  })();

  const isEstoque = categoriaEdificio === "estoque";
  const isProducao = categoriaEdificio === "producao";
  const isVenda = categoriaEdificio === "venda";
  const isPassiva = categoriaEdificio === "passiva";

  // ── STATES ────────────────────────────────────────────────
  const [flipped, setFlipped] = useState(false);
  const [visibleId, setVisibleId] = useState("finançasEd");
  const [modalPowerup, setModalPowerUp] = useState(false);
  const [inputNome, setInputNome] = useState("");
  const [acumuladorPowerUpRedCustoRecebe, setAcumuladorPowerUpRedCustoRecebe] = useState(0);
  const [acumuladorPowerUpAumFatuRecebe, setAcumuladorPowerUpAumFatuRecebe] = useState(0);
  const [acumuladorPowerUpRedCustoFornece, setAcumuladorPowerUpRedCustoFornece] = useState(0);
  const [acumuladorPowerUpAumFatuFornece, setAcumuladorPowerUpAumFatuFornece] = useState(0);

  const handleFlip = () => setFlipped(!flipped);
  const handleShow = (id) => setVisibleId(id);

  const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];
// console.log("setor recebido:", setor, "| dados disponíveis:", Object.keys(dados));

  // ── DADOS DO EDIFÍCIO ──────────────────────────────────────
  const arrayConstResources = dados[setorAtivo]?.edificios[index]?.recursoDeConstrução;
  const arrayConstNece = dados[setorAtivo]?.edificios[index]?.construçõesNecessárias;
  const quantidadeAtivo = dados[setorAtivo].edificios[index].quantidade;
  const quantidadeMinimaPowerUpNv2 = dados[setorAtivo].edificios[index].powerUp.nível2.quantidadeMínima;
  const quantidadeMinimaPowerUpNv3 = dados[setorAtivo].edificios[index].powerUp.nível3.quantidadeMínima;
  const corPadrão = { backgroundColor: setorInfo.cor2 };

  const corPowerUp = (pu) => {
    switch (pu) {
      case "powerUpNv1": return "#8F5ADA";
      case "powerUpNv2": return "#6411D9";
      case "powerUpNv3": return "#350973";
      default: return corPadrão;
    }
  };

  const powerUpSelecionado = quantidadeAtivo >= quantidadeMinimaPowerUpNv3
    ? "powerUpNv3"
    : quantidadeAtivo >= quantidadeMinimaPowerUpNv2
    ? "powerUpNv2"
    : "powerUpNv1";

  const corPowerUpAtual = corPowerUp(powerUpSelecionado);

  // ── FINANÇAS ───────────────────────────────────────────────
  const economiaSetor = economiaSetores[setor]?.economiaSetor?.estadoAtual || "estável";
  const fatorEconomico = { recessão: 0.4, declinio: 0.8, estável: 1, progressiva: 1.1, aquecida: 1.25 }[economiaSetor];
  const valorFatu = dados[setorAtivo].edificios[index].finanças.faturamentoUnitário;
  const valorImpostoFixo = dados[setorAtivo].edificios[index].finanças.impostoFixo;
  const impostoSobreFatu = dados[setorAtivo].edificios[index].finanças.impostoSobreFatu;
  const custoConstrução = dados[setorAtivo].edificios[index].custoConstrucao;

  const impostoSobreFatuFinal = impostoSobreFatu - impostoSobreFatu * (acumuladorPowerUpRedCustoRecebe / 100);
  const valorFatuFinal = valorFatu + valorFatu * (acumuladorPowerUpAumFatuRecebe / 100);
  const valorImpostoFixoFinal = valorImpostoFixo - valorImpostoFixo * (acumuladorPowerUpRedCustoRecebe / 100);

  const quantidadeTerrenosNec = dados[setorAtivo].edificios[index].lojasNecessarias.terrenos;
  const quantidadeLojasPNec = dados[setorAtivo].edificios[index].lojasNecessarias.lojasP;
  const quantidadeLojasMNec = dados[setorAtivo].edificios[index].lojasNecessarias.lojasM;
  const quantidadeLojasGNec = dados[setorAtivo].edificios[index].lojasNecessarias.lojasG;

  const CustoTotalSomadoLojas =
    quantidadeTerrenosNec * dados.terrenos.preçoConstrução +
    quantidadeLojasPNec * (dados.lojasP.preçoConstrução + dados.lojasP.quantidadeNecTerreno * dados.terrenos.preçoConstrução) +
    quantidadeLojasMNec * (dados.lojasM.preçoConstrução + dados.lojasM.quantidadeNecTerreno * dados.terrenos.preçoConstrução) +
    quantidadeLojasGNec * (dados.lojasG.preçoConstrução + dados.lojasG.quantidadeNecTerreno * dados.terrenos.preçoConstrução);

  function calcularCustoRecurso(nomeRecurso, nivel = 1) {
    for (const s of setoresArr) {
      const ed = dados[s]?.edificios?.find((e) => e.nome === nomeRecurso);
      if (ed) {
        const c = ed.custoConstrucao || 0;
        const tN = ed.lojasNecessarias.terrenos || 0;
        const pN = ed.lojasNecessarias.lojasP || 0;
        const mN = ed.lojasNecessarias.lojasM || 0;
        const gN = ed.lojasNecessarias.lojasG || 0;
        let total = c
          + tN * dados.terrenos.preçoConstrução
          + pN * (dados.lojasP.preçoConstrução + dados.lojasP.quantidadeNecTerreno * dados.terrenos.preçoConstrução)
          + mN * (dados.lojasM.preçoConstrução + dados.lojasM.quantidadeNecTerreno * dados.terrenos.preçoConstrução)
          + gN * (dados.lojasG.preçoConstrução + dados.lojasG.quantidadeNecTerreno * dados.terrenos.preçoConstrução);
        if (Array.isArray(ed.recursoDeConstrução) && ed.recursoDeConstrução.length > 0) {
          ed.recursoDeConstrução.forEach((sub) => { total += calcularCustoRecurso(sub, nivel + 1); });
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
  }, [arrayConstResources, dados.terrenos.preçoConstrução, dados.lojasP.preçoConstrução, dados.lojasM.preçoConstrução, dados.lojasG.preçoConstrução]);

  const fatuMensal = valorFatuFinal * 30 * fatorEconomico;
  const valorImpostoSobreFatuCalc = fatuMensal * impostoSobreFatuFinal;
  const valorFinalMês = fatuMensal - valorImpostoSobreFatuCalc - valorImpostoFixoFinal;
  const rentabilidade = (valorFinalMês / (CustoTotalSomadoLojas + custoRecursos + custoConstrução)) * 100;
  const paybackDias = rentabilidade > 0 ? Math.ceil((100 / rentabilidade) * 30) : null;

  const formatarNumero = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(1).replace(".0", "") + "T";
    if (num >= 1e9) return (num / 1e9).toFixed(1).replace(".0", "") + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(1).replace(".0", "") + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1).replace(".0", "") + "K";
    return num.toString();
  };

  const booleanPreReq = useCallback((nomeEd) => {
    for (const s of setoresArr) {
      const idx = dados[s].edificios.findIndex((ed) => ed.nome === nomeEd);
      if (idx !== -1) return dados[s].edificios[idx].quantidade > 0;
    }
    return false;
  }, [dados]);

  // ── POWERUP ACUMULADORES ───────────────────────────────────
  useEffect(() => {
    let r = 0, a = 0;
    dados[setorAtivo].edificios[index].ForneceMelhoraEficiencia.forEach((ed) => {
      const qtd = (nome) => {
        for (const s of setoresArr) {
          const idx = dados[s].edificios.findIndex((e) => e.nome === nome);
          if (idx !== -1) return dados[s].edificios[idx].quantidade;
        }
        return 0;
      };
      const qtdM = qtd(ed.nome), q = qtd(nomeAtivo);
      const pu = q >= quantidadeMinimaPowerUpNv3 ? "powerUpNv3" : q >= quantidadeMinimaPowerUpNv2 ? "powerUpNv2" : "powerUpNv1";
      if (qtdM > 0) {
        r += pu === "powerUpNv1" ? ed.redCusto.nível1 : pu === "powerUpNv2" ? ed.redCusto.nível2 : ed.redCusto.nível3;
        a += pu === "powerUpNv1" ? ed.aumFatu.nível1 : pu === "powerUpNv2" ? ed.aumFatu.nível2 : ed.aumFatu.nível3;
      }
    });
    setAcumuladorPowerUpRedCustoFornece(r);
    setAcumuladorPowerUpAumFatuFornece(a);
  }, [dados, setorAtivo, index]);

  useEffect(() => {
    let r = 0, a = 0;
    dados[setorAtivo].edificios[index].RecebeMelhoraEficiencia.forEach((ed) => {
      const qtd = (nome) => {
        for (const s of setoresArr) {
          const idx = dados[s].edificios.findIndex((e) => e.nome === nome);
          if (idx !== -1) return dados[s].edificios[idx].quantidade;
        }
        return 0;
      };
      const qtdM = qtd(ed.nome), q = qtd(nomeAtivo);
      const pu = q >= quantidadeMinimaPowerUpNv3 ? "powerUpNv3" : q >= quantidadeMinimaPowerUpNv2 ? "powerUpNv2" : "powerUpNv1";
      if (qtdM > 0) {
        r += pu === "powerUpNv1" ? ed.redCusto.nível1 : pu === "powerUpNv2" ? ed.redCusto.nível2 : ed.redCusto.nível3;
        a += pu === "powerUpNv1" ? ed.aumFatu.nível1 : pu === "powerUpNv2" ? ed.aumFatu.nível2 : ed.aumFatu.nível3;
      }
    });
    setAcumuladorPowerUpRedCustoRecebe(r);
    setAcumuladorPowerUpAumFatuRecebe(a);
  }, [dados, setorAtivo, index]);

  // ── EDITAR NOME ────────────────────────────────────────────
  function abrirModal({ index, setor }) {
    atualizarDados("modalEditável", { ...dados.modalEditável, estadoModal: true, index, setor });
  }

  function editarNomeEditavel() {
    if (inputNome) {
      const indexModificar = dados.modalEditável.index;
      const setorModificar = dados.modalEditável.setor;
      atualizarDadosProf2([setorModificar, "edificios", indexModificar, "nomeEditável"], inputNome);
      atualizarDados("modalEditável", { ...dados.modalEditável, estadoModal: false });
      setInputNome("");
    } else {
      alert("Campo não preenchido");
    }
  }

  // ── TOOLTIP CUSTOM ─────────────────────────────────────────
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

  // ── GRADIENTES ────────────────────────────────────────────
  const gradientLevel = () => {
    if (powerUpSelecionado === "powerUpNv3") return "#FFD700";
    if (powerUpSelecionado === "powerUpNv2") return "#6411D9";
    return setorInfo.cor2;
  };

  const getGradientByLevel = () => {
    if (powerUpSelecionado === "powerUpNv3")
      return `linear-gradient(135deg, #7a5500 0%, #b8870b 20%, #F27405 40%, #FFD700 60%, #F27405 80%, #7a5500 100%)`;
    if (powerUpSelecionado === "powerUpNv2")
      return `linear-gradient(135deg, #350973 0%, #6411D9 25%, #8F5ADA 50%, #6411D9 75%, #350973 100%)`;
    return `transparent`;
  };

  const getGradient = () => {
    if (isProducao)
      return `radial-gradient(circle at 2% 50%, ${setorInfo.cor1}99 0%, ${setorInfo.cor4}FF 40%, ${gradientLevel()}CC 70%, ${setorInfo.cor4}FF 80%, ${setorInfo.cor2}B3 85%, ${setorInfo.cor1}99 92%, ${setorInfo.cor2}B3 98%, ${setorInfo.cor4}FF 100%)`;
    if (isVenda)
      return `radial-gradient(circle at 100% 0%, ${setorInfo.cor1}11 0%, ${gradientLevel()}CC 12%, ${setorInfo.cor4}CC 28%, ${setorInfo.cor3}FF 48%, ${setorInfo.cor3}FF 62%, ${gradientLevel()}99 80%, ${setorInfo.cor1}11 100%)`;
    if (isEstoque)
      return `linear-gradient(190deg, ${gradientLevel()}15 0%, ${setorInfo.cor4}EE 28%, ${setorInfo.cor3}CC 50%, ${setorInfo.cor4}EE 70%, ${setorInfo.cor1}77 100%)`;
    if (isPassiva)
      return `linear-gradient(135deg, ${gradientLevel()}FF 0%, ${setorInfo.cor2}77 15%, ${setorInfo.cor3}BB 35%, ${setorInfo.cor4}FF 52%, ${setorInfo.cor3}99 70%, ${setorInfo.cor1}FF 100%)`;
    return `linear-gradient(135deg, ${setorInfo.cor1} 0%, ${setorInfo.cor3} 50%, ${setorInfo.cor4} 100%)`;
  };

  const getBordaDinamica = () => {
    if (isProducao) return { border: `2px solid ${setorInfo.cor1}55`, boxShadow: `0 0 0 1px ${setorInfo.cor3}88`, borderRadius: "25px 10px 25px 10px" };
    if (isEstoque) return { border: `2px solid ${setorInfo.cor2}`, boxShadow: `0 0 0 3px ${setorInfo.cor3}88`, borderRadius: "20px" };
    if (isVenda) return { borderRadius: "20px 5px 20px 5px", border: `1.5px solid ${setorInfo.cor3}` };
    if (isPassiva) return { border: `1px solid ${setorInfo.cor3}55`, boxShadow: `0 0 0 1px ${setorInfo.cor1}88`, borderRadius: "20px" };
    return { borderRadius: "20px" };
  };

  // ── DADOS PARA PRODUÇÃO ────────────────────────────────────



  const openModalPowerUps = () => setModalPowerUp(true);
  const fecharModalPowerUp = () => setModalPowerUp(false);

  // ── MODAL POWER-UPS ────────────────────────────────────────
    if (modalPowerup === true) {
      return (
        <div className="fixed inset-0 flex justify-center items-center z-[150] bg-black/90 backdrop-blur-sm">
          <motion.div
            style={{ backgroundColor: setorInfo.cor1, borderColor: setorInfo.cor4 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-[90vw] h-[85vh] rounded-[24px] border-2 flex flex-col justify-between items-center relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            {/* Botão Fechar - Estilo Premium */}
            <button
              className="absolute top-4 right-4 w-[45px] h-[45px] flex justify-center items-center rounded-xl hover:scale-110 active:scale-95 transition-all z-10 shadow-lg"
              style={{ backgroundColor: setorInfo.cor4 }}
              onClick={fecharModalPowerUp}
            >
              <img src={fechar} alt="Fechar" className="w-[50%]" />
            </button>
  
            {/* Header - Nome do Edifício */}
            <div
              style={{ backgroundColor: setorInfo.cor2, borderColor: setorInfo.cor4 }}
              className="flex w-full h-[15%] border-b-2 text-[45px] fonteBold text-white justify-center items-center italic tracking-tighter shadow-xl"
            >
              {nomeAtual}
            </div>
  
            {/* Container Principal das Listas */}
            <div className="flex-1 w-full p-6 overflow-hidden">
              <div className="flex justify-around h-full w-full gap-4">
  
                {["Fornece", "Recebe"].map((label, li) => {
                  const lista = li === 0 ? dados[setorAtivo].edificios[index].ForneceMelhoraEficiencia : dados[setorAtivo].edificios[index].RecebeMelhoraEficiencia;
                  const acRed = li === 0 ? acumuladorPowerUpRedCustoFornece : acumuladorPowerUpRedCustoRecebe;
                  const acAum = li === 0 ? acumuladorPowerUpAumFatuFornece : acumuladorPowerUpAumFatuRecebe;
  
                  return (
                    <div key={label} className="w-[49%] h-full flex flex-col items-center">
                      {/* Subtítulo Fornece/Recebe */}
                      <div
                        style={{ backgroundColor: setorInfo.cor2, borderColor: setorInfo.cor4 }}
                        className="w-full h-[10%] border-l-4 fonteBold text-white flex items-center pl-6 rounded-r-xl text-[30px] mb-4 uppercase tracking-widest shadow-md"
                      >
                        {label}
                      </div>
  
                      {/* Área da Tabela com Scroll */}
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
                            let se = null, idx = -1;
                            const qtd = (nome) => {
                              for (const s of setoresArr) {
                                se = s;
                                idx = dados[s].edificios.findIndex((e) => e.nome === nome);
                                if (idx !== -1) return { q: dados[s].edificios[idx].quantidade, setor: s };
                              } return { q: 0, setor: "" };
                            };
  
                            const infoM = qtd(edM.nome);
                            const infoBase = qtd(nomeAtual);
                            const q = infoBase.q;
  
                            // Lógica de cores e níveis
                            const pu = q >= quantidadeMinimaPowerUpNv3 ? "powerUpNv3" : q >= quantidadeMinimaPowerUpNv2 ? "powerUpNv2" : "powerUpNv1";
                            const cL = infoM.q > 0 ? corPowerUp(pu) : corPadrão;
                            const b1 = cL === "#8F5ADA" ? corPowerUp("powerUpNv1") : pu === "powerUpNv2" ? corPowerUp("powerUpNv2") : pu === "powerUpNv3" ? corPowerUp("powerUpNv3") : corPadrão;
                            const b2 = pu === "powerUpNv1" ? corPadrão : pu === "powerUpNv2" ? corPowerUp("powerUpNv2") : corPowerUp("powerUpNv3");
                            const b3 = pu === "powerUpNv1" ? corPadrão : pu === "powerUpNv2" ? corPadrão : corPowerUp("powerUpNv3");
  
                            return (
                              <tbody key={i}>
                                <tr style={{ backgroundColor: "rgba(255,255,255,0.03)" }} className="group hover:bg-white/10 transition-all">
                                  {/* Nome + Imagem do Edifício */}
                                  <td style={{ borderLeft: `4px solid ${cL}` }} className="py-3 pl-2 rounded-l-xl">
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 flex items-center justify-center bg-black/40 rounded-lg p-1 border border-white/5 shadow-inner">
                                        <img
                                          src={getImageUrl(edM.nome)}
                                          className="max-w-full max-h-full object-contain"
                                          onError={(e) => e.target.src = PróximoImg}
                                        />
                                      </div>
                                      <span className="text-white text-[14px] fonteBold leading-tight">{edM.nome}</span>
                                    </div>
                                  </td>
  
                                  {/* Colunas de Redução */}
                                  <td style={{ backgroundColor: b1 }} className="text-center text-white text-[11px] border-r border-black/20 font-black italic">N1<br />{edM.redCusto.nível1}%</td>
                                  <td style={{ backgroundColor: b2 }} className="text-center text-white text-[11px] border-r border-black/20 font-black italic">N2<br />{edM.redCusto.nível2}%</td>
                                  <td style={{ backgroundColor: b3 }} className="text-center text-white text-[11px] rounded-r-none font-black italic">N3<br />{edM.redCusto.nível3}%</td>
  
                                  <td className="w-2 bg-transparent"></td>
  
                                  {/* Colunas de Aumento */}
                                  <td style={{ backgroundColor: b1 }} className="text-center text-white text-[11px] border-r border-black/20 font-black italic">N1<br />{edM.aumFatu.nível1}%</td>
                                  <td style={{ backgroundColor: b2 }} className="text-center text-white text-[11px] border-r border-black/20 font-black italic">N2<br />{edM.aumFatu.nível2}%</td>
                                  <td style={{ backgroundColor: b3 }} className="text-center text-white text-[11px] rounded-r-xl font-black italic">N3<br />{edM.aumFatu.nível3}%</td>
                                </tr>
                              </tbody>
                            );
                          })}
                        </table>
                      </div>
  
                      {/* Rodapé da Coluna com Totais (Style Unificado para evitar erro Vite) */}
                      <div className="w-full h-[12%] flex justify-between gap-3 mt-4">
                        <div
                          style={{ backgroundColor: setorInfo.cor2, borderBottomColor: setorInfo.cor4 }}
                          className="flex-1 rounded-xl border-b-4 flex flex-col items-center justify-center text-white shadow-lg"
                        >
                          <span className="text-[10px] uppercase font-black opacity-40 tracking-tighter">Redução Total</span>
                          <span className="text-[24px] fonteBold">-{acRed}%</span>
                        </div>
                        <div
                          style={{ backgroundColor: setorInfo.cor2, borderBottomColor: setorInfo.cor4 }}
                          className="flex-1 rounded-xl border-b-4 flex flex-col items-center justify-center text-white shadow-lg"
                        >
                          <span className="text-[10px] uppercase font-black opacity-40 tracking-tighter">Aumento Total</span>
                          <span className="text-[24px] fonteBold">+{acAum}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
  
              </div>
            </div>
  
            {/* Detalhe visual inferior */}
            <div className="w-full h-1" style={{ backgroundColor: setorInfo.cor4 }} />
          </motion.div>
        </div>
      );
    }

  // ── MODAL EDITAR NOME ──────────────────────────────────────
  if (dados.modalEditável.estadoModal) {
    return (
      <div className="flex justify-center items-center z-10 bg-black opacity-[98%] w-[100vw] h-[100vh] fixed inset-0 select-none">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.3, ease: "easeOut" }} className="w-[550px] h-[200px] bg-[#350973] rounded-[20px] z-20 flex-col flex justify-between">
          <button className="bg-laranja relative top-[-20px] right-[-530px] w-[40px] h-[40px] flex justify-center items-center rounded-[10px] hover:bg-[#E56100] active:scale-95" onClick={() => { buttonCloseAudio(); atualizarDados("modalEditável", { ...dados.modalEditável, estadoModal: false }); }}>
            <img src={fechar} alt="" className="w-[60%]" />
          </button>
          <h2 className="text-white text-center text-[25px] fonteBold mt-[20px]">Qual o novo nome do edifício?</h2>
          <div className="w-[80%] h-[10px] bg-gradient-to-l from-laranja to-roxo flex rounded-[5px] relative m-auto"></div>
          <div className="flex justify-center w-full items-center">
            <input type="text" placeholder="Nome edifício" onChange={(e) => setInputNome(e.target.value.toUpperCase())} value={inputNome} className="placeholder:text-white text-white placeholder:opacity-70 z-50 text-[25px] fonteBold w-[100%] pl-[15px] h-[60px] bg-[#290064] bg-opacity-[90%] rounded-[17.50px]" />
            <button onClick={editarNomeEditavel} className="flex justify-center items-center h-[60px] w-[60px] ml-[10px] aspect-square text-[20px] fonteBold bg-laranja rounded-[20px] text-white hover:scale-105 hover:bg-orange-600 z-50">✓</button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  //  CARD PRINCIPAL
  // ═══════════════════════════════════════════════════════════
  return (
    <motion.div
      style={{ background: getGradientByLevel(), ...getBordaDinamica() }}
      className="w-[220px] h-[320px] rounded-[20px] flex flex-col justify-center items-center shadow-lg perspective"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      <motion.div
        className="relative w-full h-full rounded-2xl"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Badge categoria */}
        <div className="absolute bottom-0 right-0 w-[50px] h-[50px] z-20 flex items-center justify-center rounded-tl-2xl rounded-br-2xl" >
          <div className="absolute inset-0 rounded-tl-2xl rounded-br-2xl" style={{ backgroundColor: setorInfo.cor3, filter: "brightness(0.8)", boxShadow: "-2px -2px 10px rgba(0,0,0,0.3)" }} />
          <div className="w-[50px] h-[50px] flex items-center justify-center rounded-tl-2xl rounded-br-2xl" style={{ backgroundColor: "rgba(0,0,0,0.2)", backdropFilter: "blur(4px)" }}>
            {isProducao && <img src={passive} className="w-[24px] opacity-90" alt="" />}
            {isVenda && <img src={passive} className="w-[24px] opacity-90" alt="" />}
            {isEstoque && <img src={passive} className="w-[24px] opacity-90" alt="" />}
            {isPassiva && <img src={passive} className="w-[24px] opacity-90" alt="" />}
          </div>
        </div>

        {/* ════════════════════════════════════════
            FRENTE DO CARD
        ════════════════════════════════════════ */}
        <div
          className="absolute w-full h-full flex items-center justify-center rounded-xl"
          style={{ background: getGradient(), mixBlendMode: "color-dodge", backfaceVisibility: "hidden" }}
        >
          <div className="w-[90%] h-[90%] flex items-center flex-col justify-between self-center">

            {/* HEADER com editar nome */}
            <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full h-[22%] rounded-[10px] flex justify-between drop-shadow-xs">
              <div style={{ background: `linear-gradient(135deg,${setorInfo.cor3} 0%,${setorInfo.cor1} 100%)` }} className="h-[100%] aspect-square rounded-[10px] flex items-center justify-center">
                <img className="h-[70%]" src={getImageUrl(nomeAtivo)} alt="" />
              </div>
              <div className="flex p-[6px] justify-center items-center flex-1">
                <h1 className="text-white fonteBold text-center text-[10px] leading-tight">
                  {dados[setorAtivo].edificios[index].nomeEditável || nomeAtivo}
                </h1>
              </div>
              {/* <button
                onClick={() => abrirModal({ setor, index })}
                style={{ backgroundColor: setorInfo.cor2, flexShrink: 0 }}
                className="h-full aspect-square rounded-[10px] flex items-center justify-center hover:brightness-110"
              >
                <img className="w-[45%]" src={editar} alt="" />
              </button> */}
            </div>

            {/* CORPO */}
            <div className="w-full flex flex-col justify-around gap-[4px]" style={{ flex: 1, padding: "4px 0" }}>

              {/* Linha 2: Renda/dia + ROI */}
              <div style={{ background: "rgba(0,0,0,.32)", borderRadius: 7, padding: "5px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div className="flex flex-col gap-[1px]">
                  <span style={{ fontSize: 7.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "rgba(255,255,255,.38)" }}>Renda / dia</span>
                  <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 20, fontWeight: 700, color: "#C87AFF", lineHeight: 1 }}>
                    + {formatarNumero(valorFatuFinal)}
                  </span>
                </div>
                <div style={{ background: "rgba(0,0,0,.28)", borderRadius: 7, padding: "4px 7px", minWidth: 52, textAlign: "center" }}>
                  <div style={{ fontSize: 7, fontWeight: 700, textTransform: "uppercase", color: "rgba(255,255,255,.38)" }}>Payback</div>
                  <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 13, fontWeight: 700, color: "#C87AFF", lineHeight: 1 }}>
                    {paybackDias ? `${paybackDias}d` : "∞"}
                  </div>
                </div>
              </div>

              {/* Linha 3: Fatu mensal + ROI + botões */}
              <div className="flex gap-[4px]" style={{ minHeight: 42 }}>
                <div style={{ flex: 1, background: "rgba(0,0,0,.28)", borderRadius: 7, padding: "5px 8px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ fontSize: 7, fontWeight: 700, textTransform: "uppercase", color: "rgba(255,255,255,.38)" }}>Fatu. mensal</div>
                  <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1 }}>
                    {formatarNumero(fatuMensal)} 
                  </div>
                </div>
                <div style={{ flex: 0.7, background: "rgba(0,0,0,.28)", borderRadius: 7, padding: "5px 6px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                  <div style={{ fontSize: 7, fontWeight: 700, textTransform: "uppercase", color: "rgba(255,255,255,.38)" }}>ROI</div>
                  <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 15, fontWeight: 700, color: rentabilidade >= 0 ? "#7aff9a" : "#ff9090", lineHeight: 1 }}>
                    {rentabilidade.toFixed(0)}%
                  </div>
                </div>
                {/* Botão PowerUp */}
                <div
                  style={{
                    width: 36, borderRadius: 7, cursor: "pointer",
                    background: powerUpSelecionado === "powerUpNv3"
                      ? "linear-gradient(135deg,#7a5500,#FFD700)"
                      : powerUpSelecionado === "powerUpNv2"
                      ? "linear-gradient(135deg,#350973,#8F5ADA)"
                      : `linear-gradient(135deg,${setorInfo.cor2},${setorInfo.cor3})`,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2
                  }}
                  onClick={() => { handleShow("powerUp"); handleFlip(); }}
                  className="hover:scale-105 transition-transform"
                >
                  <img src={PróximoImg} style={{ height: 12, transform: "rotate(270deg)", opacity: .9 }} alt="" />
                  <span style={{ fontSize: 8, fontWeight: 700, color: "#fff" }}>
                    {powerUpSelecionado === "powerUpNv3" ? "NV3" : powerUpSelecionado === "powerUpNv2" ? "NV2" : "NV1"}
                  </span>
                </div>
                {/* Botão Finanças */}
                <div
                  style={{ width: 36, borderRadius: 7, backgroundColor: setorInfo.cor1, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                  onClick={() => { handleShow("finançasEd"); handleFlip(); }}
                  className="hover:scale-105 transition-transform"
                >
                  <img src={DolarImg} style={{ height: "55%" }} alt="" />
                </div>
              </div>

              {/* Linha 4: Imóveis base + custo construção */}
              <div style={{ background: "rgba(0,0,0,.32)", borderRadius: 7, padding: "5px 8px", display: "flex", flexDirection: "column", gap: 3 }}>
                <span style={{ fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", color: "rgba(255,255,255,.3)" }}>Imóveis base</span>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div className="flex gap-[3px] flex-wrap">
                    {[
                      { img: terrenoImg, key: "terrenos" },
                      { img: LojaPImg, key: "lojasP" },
                      { img: LojaMImg, key: "lojasM" },
                      { img: LojaGImg, key: "lojasG" },
                    ].map(({ img, key }) => {
                      const nec = dados[setorAtivo].edificios[index].lojasNecessarias[key];
                      if (!nec) return null;
                      return (
                        <div key={key} style={{ width: 22, height: 22, borderRadius: 4, background: setorInfo.cor1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <img src={img} style={{ height: "70%", width: "70%", objectFit: "contain" }} alt="" />
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 3, background: setorInfo.cor3, borderRadius: 5, padding: "2px 6px" }}>
                    <img src={ConstuirImg} style={{ height: 11 }} alt="" />
                    <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 11, fontWeight: 700, color: "#fff" }}>
                      {formatarNumero(custoConstrução)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Linha 5: Recursos de construção se existir */}
              {(arrayConstNece?.length > 0 || arrayConstResources?.length > 0) && (
                <div style={{ background: "rgba(0,0,0,.32)", borderRadius: 7, padding: "5px 8px", display: "flex", flexDirection: "column", gap: 3 }}>
                  <span style={{ fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", color: "rgba(255,255,255,.3)" }}>Requisitos</span>
                  <div className="flex gap-[3px]">
                    {[...(arrayConstNece || []), ...(arrayConstResources || [])].slice(0, 5).map((nome) => (
                      <div key={nome} style={{ width: 17, height: 17, borderRadius: 4, background: setorInfo.cor1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img src={getImageUrl(nome)} style={{ height: "70%", width: "70%", objectFit: "contain" }} alt={nome} />
                        {!booleanPreReq(nome) && <span style={{ position: "absolute", bottom: -2, right: -2, width: 5, height: 5, borderRadius: "50%", background: "#fff", display: "block" }} />}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Linha 6: Categorias de armazenamento */}


            </div>

            {/* FOOTER: quantidade + botão vender */}
            <div className="w-full flex flex-col gap-[4px]">
              <div className="flex gap-[5px] items-center" style={{ height: 24 }}>
                <div style={{
                  height: 24, minWidth: 36, borderRadius: 7,
                  background: quantidadeAtivo > 0 ? "rgba(100,17,217,.2)" : "rgba(0,0,0,.28)",
                  border: quantidadeAtivo > 0 ? `1px solid ${corPowerUpAtual}` : "1px solid rgba(255,255,255,.12)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 3, padding: "0 7px", flexShrink: 0
                }}>
                  {quantidadeAtivo > 0 && <span style={{ width: 5, height: 5, borderRadius: "50%", background: corPowerUpAtual, display: "inline-block" }} />}
                  <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 14, fontWeight: 700, color: quantidadeAtivo > 0 ? "#fff" : "#fff" }}>
                    {quantidadeAtivo}
                  </span>
                </div>
                <button
                  onClick={() => { abrirModalSell(setor, index); buttonOpenAudio(); }}
                  style={{
                    flex: 1, height: 24, borderRadius: 8, border: "none",
                    fontFamily: "'Nunito',sans-serif", fontSize: 11, fontWeight: 700,
                    cursor: "pointer", color: "#fff", letterSpacing: ".04em",
                    background: "linear-gradient(135deg,#6411D9,#F27405)"
                  }}
                  className="fonteBold"
                >
                  Vender
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ════════════════════════════════════════
            VERSO DO CARD
        ════════════════════════════════════════ */}
        <div
          className={`absolute w-full h-full flex items-center justify-center rounded-[20px] text-white cursor-pointer ${flipped ? "pointer-events-auto z-50" : "pointer-events-none"}`}
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden", background: `linear-gradient(135deg,${setorInfo.cor2} 0%,${setorInfo.cor3} 35%,${setorInfo.cor1} 100%)` }}
        >

          {/* ── Verso: Power Ups ── */}
          {visibleId === "powerUp" && (
            <div onClick={() => handleFlip()} className="w-[90%] h-[90%] flex items-center flex-col justify-around self-center">
              <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full h-[20%] rounded-[10px] flex justify-between">
                <div style={{ background: `linear-gradient(135deg,${setorInfo.cor4} 0%,${corPowerUpAtual} 30%,#350973 70%,${setorInfo.cor1} 100%)` }} className="h-[100%] aspect-square rounded-[10px] flex items-center justify-center">
                  <img className="h-[70%] rotate-[270deg]" src={PróximoImg} alt="" />
                </div>
                <div className="flex p-[10px] justify-center items-center">
                  <h1 className="text-white fonteBold text-[12px]">Power Ups</h1>
                </div>
              </div>
              <div className="h-[20%] w-full flex justify-between flex-col items-center">
                <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full flex items-center justify-center rounded-[10px] p-[5px] h-full">
                  <div className="w-full rounded-[20px] flex justify-around items-center h-full">
                    {[{ bg: "#8F5ADA", nv: "nível1" }, { bg: "#6411D9", nv: "nível2" }, { bg: "#350973", nv: "nível3" }].map(({ bg, nv }) => (
                      <div key={nv} style={{ backgroundColor: setorInfo.cor2 }} className="flex justify-around items-center w-[30%] h-full rounded-[10px] p-[2px]">
                        <div style={{ backgroundColor: bg }} className="w-[80%] aspect-square rounded-[7px] flex items-center justify-center hover:scale-[1.20] duration-300 cursor-pointer">
                          <img className="h-[70%] aspect-square rotate-[270deg]" src={PróximoImg} />
                        </div>
                        <div className="flex justify-center items-center w-full">
                          <h2 className="text-white text-[10px] fonteBold">{dados[setorAtivo].edificios[index].powerUp[nv].quantidadeMínima}</h2>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ backgroundColor: setorInfo.cor2 }} className="h-[50%] w-full rounded-[10px] flex flex-col items-center justify-around">
                <p className="text-white text-[10px] h-[65%] p-[5px]">{dados[setorAtivo].edificios[index].desc}</p>
                <button onClick={openModalPowerUps} className="w-[85%] h-[25%] z-50 text-white text-[10px] bg-[#6411D9] rounded-[10px] hover:scale-[1.10] duration-300 ease-in-out">
                  Todos power ups
                </button>
              </div>
            </div>
          )}

          {/* ── Verso: Finanças ── */}
          {visibleId === "finançasEd" && (
            <div onClick={() => handleFlip()} className="w-[90%] h-[90%] flex items-center flex-col justify-between self-center relative z-[20] overflow-visible" style={{ pointerEvents: "auto" }}>
              <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full h-[20%] rounded-[10px] flex justify-between">
                <div className="h-full aspect-square rounded-[10px] flex items-center justify-center" style={{ background: `linear-gradient(135deg,${setorInfo.cor3} 0%,${setorInfo.cor1} 100%)` }}>
                  <img className="h-[70%]" src={DolarImg} alt="" />
                </div>
                <div className="flex p-[10px] justify-center items-center">
                  <h1 className="text-white fonteBold text-[12px]">Finanças do edifício</h1>
                </div>
              </div>
              {[
                [
                  { img: imgFatuMensal, text: "Faturamento mensal estimado\ncaso você detenha o edifício por um mês.", val: formatarNumero(valorFatu * 30) },
                  { img: imgImpostoFixo, text: "Imposto fixo mensal.", val: formatarNumero(valorImpostoFixo) }
                ],
                [
                  { img: imgFaturamentoDiario, text: "Faturamento diário médio na economia estável.", val: formatarNumero(valorFatu) },
                  { img: imgImpostoSFatu, text: "Imposto sobre faturamento mensal.", val: formatarNumero(valorFatu * 30 * impostoSobreFatu) }
                ],
                [
                  { img: porcem, text: "Rentabilidade do edifício.", val: `${rentabilidade.toFixed(0)}%` },
                  { img: imgPercFatu, text: "Porcentagem do imposto sobre faturamento.", val: `${(impostoSobreFatu * 100).toFixed(0)}%` }
                ],
                [
                  { img: imgLucro, text: "Lucro líquido mensal.", val: formatarNumero(valorFatu * 30 - (valorFatu * 30 * impostoSobreFatu + valorImpostoFixo)) },
                  { img: imgSomaImposto, text: "Total de impostos mensais.", val: formatarNumero(valorFatu * 30 * impostoSobreFatu + valorImpostoFixo) }
                ],
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

          {/* ── Verso: Imóveis necessários ── */}
          {visibleId === "lojasNec" && (
            <div onClick={() => handleFlip()} className="w-[90%] h-[92%] flex flex-col self-center gap-3 p-1 overflow-hidden">
              <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full h-[60px] min-h-[60px] rounded-[10px] flex justify-between overflow-hidden drop-shadow-sm shrink-0">
                <div style={{ background: `linear-gradient(135deg,${setorInfo.cor3} 0%,${setorInfo.cor1} 100%)` }} className="h-full aspect-square flex items-center justify-center">
                  <img className="h-[60%]" src={terrenoImg} alt="" />
                </div>
                <div className="flex p-3 justify-center items-center">
                  <h1 className="text-white fonteBold text-[12px] uppercase tracking-wider">Imóveis Necessários</h1>
                </div>
              </div>
              <div className="w-full flex-1 flex flex-col gap-2 overflow-y-auto pr-1 scrollbar-custom">
                {[
                  { img: terrenoImg, key: "terrenos", qtdAtual: dados.terrenos.quantidade },
                  { img: LojaPImg, key: "lojasP", qtdAtual: dados.lojasP.quantidade },
                  { img: LojaMImg, key: "lojasM", qtdAtual: dados.lojasM.quantidade },
                  { img: LojaGImg, key: "lojasG", qtdAtual: dados.lojasG.quantidade },
                ].map(({ img, key, qtdAtual }) => {
                  const necessarios = dados[setorAtivo].edificios[index].lojasNecessarias[key];
                  const temSuficiente = qtdAtual >= necessarios;
                  return (
                    <div key={key} className="w-full h-[65px] flex items-center gap-3 bg-black/20 p-2 rounded-xl border border-white/5 shrink-0">
                      <div style={{ backgroundColor: setorInfo.cor1 }} className="h-11 w-11 rounded-lg flex items-center justify-center shrink-0">
                        <img className="h-[65%] object-contain" src={img} alt="" />
                      </div>
                      <div className="flex-1 flex flex-row items-center justify-center gap-2">
                        <span className={`text-[18px] font-bold ${temSuficiente ? "text-green-400" : "text-white"}`}>{qtdAtual}</span>
                        <span className="text-white/20 text-[12px]">/</span>
                        <span className="text-white/40 text-[14px] font-semibold">{necessarios}</span>
                      </div>
                      <div style={{ backgroundColor: setorInfo.cor2 }} className="h-full min-w-[52px] px-2 flex flex-col justify-center items-center rounded-lg">
                        <span className="text-white/30 text-[7px] uppercase font-bold mb-0.5">Necessário</span>
                        <h2 className={`text-[10px] font-bold ${temSuficiente ? "text-green-400/80" : "text-white"}`}>{necessarios}</h2>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Verso: Construções necessárias ── */}
          {visibleId === "constNece" && (
            <div onClick={() => handleFlip()} className="w-[90%] h-[90%] flex flex-col self-center gap-3">
              <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full h-[60px] min-h-[60px] rounded-[10px] flex justify-between overflow-hidden drop-shadow-sm">
                <div style={{ background: `linear-gradient(135deg,${setorInfo.cor3} 0%,${setorInfo.cor1} 100%)` }} className="h-full aspect-square flex items-center justify-center">
                  <img className="h-[60%]" src={constNece} alt="" />
                </div>
                <div className="flex p-3 justify-center items-center">
                  <h1 className="text-white fonteBold text-[12px] uppercase tracking-wider">Requisitos de Obra</h1>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4 scrollbar-custom">
                {arrayConstResources?.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <h2 className="text-white/50 text-[10px] font-bold uppercase px-1">Recursos (Consumidos)</h2>
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
                )}
                {arrayConstNece?.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <h2 className="text-white/50 text-[10px] font-bold uppercase px-1">Edifícios (Posse)</h2>
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
                )}
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </motion.div>
  );
};