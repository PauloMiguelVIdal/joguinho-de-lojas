import React, { useContext, useState, useCallback, useMemo } from "react";
import terrenoImg from "../../public/outrasImagens/terreno.png";
import LojaPImg from "../../public/outrasImagens/lojaP.png";
import LojaMImg from "../../public/outrasImagens/lojaM.png";
import LojaGImg from "../../public/outrasImagens/lojaG.png";
import DolarImg from "../../public/outrasImagens/simbolo-do-dolar.png";
import porcem from "../../public/outrasImagens/simbolo-de-porcentagem.png";
import mais from "../../public/outrasImagens/botao-de-simbolo-de-mais.png";
import menos from "../../public/outrasImagens/simbolo-de-menos.png";
import { Statistic } from "./statistic";
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import SidebarCard from "./SidebarCards";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { styled } from "@mui/material/styles";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import useSound from "use-sound";
import constructorAudio from "../../public/sounds/constructAudio.mp3";
import alertAudio from "../../public/sounds/alertAudio.mp3";
import payTerrain from "../../public/sounds/payTerrainAudio.mp3";
import qtdAudio from "../../public/sounds/qtdAudio.mp3";
import { useHotkeys } from "react-hotkeys-hook";
import martelo from "../../public/outrasImagens/martelo.png";
import LoanCarousel from "./LoanCarousel";
import SidebarStorage from './SidebarStorage';
import { SideInformations } from "./SideInformations";
import { EDIFICIOS_BASE_ESTATICOS } from "../stores/dadosEstáticos";
import { useCentralStore, EDIFICIOS_BASE_DINAMICOS, EDIFICIOS_FINAIS_DINAMICOS_INICIAL,LICENCAS_DINAMICAS_GLOBAIS } from "../stores/useCentralStore";

// ─── Dados estáticos dos imóveis base — nunca mudam ──────────────────────────
// quantidadeNecTerreno e preçoConstrução ficam aqui, não no slice dinâmico.
const T_PRECO  = EDIFICIOS_BASE_DINAMICOS.terrenos.preçoConstrução; // 40000
const P_PRECO  = EDIFICIOS_BASE_DINAMICOS.lojasP.preçoConstrução;   // 50000
const M_PRECO  = EDIFICIOS_BASE_DINAMICOS.lojasM.preçoConstrução;   // 100000
const G_PRECO  = EDIFICIOS_BASE_DINAMICOS.lojasG.preçoConstrução;   // 240000
const P_NEC_T  = EDIFICIOS_BASE_ESTATICOS.lojasP.quantidadeNecTerreno; // 1
const M_NEC_T  = EDIFICIOS_BASE_ESTATICOS.lojasM.quantidadeNecTerreno; // 2
const G_NEC_T  = EDIFICIOS_BASE_ESTATICOS.lojasG.quantidadeNecTerreno; // 3

console.log(T_PRECO)
console.log(P_PRECO)
console.log(M_PRECO)
console.log(G_PRECO)

// ─── GradientBox — fora do componente para não gerar nova classe por render ───
const GradientBox = styled(Box)({
  background: "linear-gradient(to left, #F27405, #F27405)",
  borderRadius: 5,
  padding: 8,
});

const tooltipStyle = {
  backgroundColor: "#FFFFFF",
  color: "#350973",
  borderRadius: "6px",
  padding: "6px 10px",
  fontWeight: "600",
  fontSize: "14px",
};

const TooltipPadrao = ({ id }) => (
  <Tooltip id={id} style={tooltipStyle} border="1px solid #350973" />
);

const formatarNumero = (num) => {
  if (!num || isNaN(num)) return "0";
  if (num >= 1e12) return (num / 1e12).toFixed(1).replace(".0", "") + "T";
  if (num >= 1e9)  return (num / 1e9).toFixed(1).replace(".0", "") + "B";
  if (num >= 1e6)  return (num / 1e6).toFixed(1).replace(".0", "") + "M";
  if (num >= 1e3)  return (num / 1e3).toFixed(1).replace(".0", "") + "K";
  return num.toString();
};

export function getBotaoCompraStyle({ podeComprar }) {
  return {
    backgroundColor: podeComprar ? "#F27405" : "#ebac75ff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "0.2s",
    opacity: podeComprar ? 1 : 0.7,
  };
}

export default function Buy() {
  const [isNKeyDown, setIsNKeyDown] = useState(false);

  // ── Zustand — seletores granulares (só o dinâmico) ────────────────────────
  const vision     = useCentralStore((s) => s.vision?.visionAtual ?? "dashboard");
  const dia        = useCentralStore((s) => s.dia);
  const setorAtivo = useCentralStore((s) => s.setorAtivo);
  const algumModalAberto = useCentralStore((s) => s.algumModalAberto);
  const atualizarDados   = useCentralStore((s) => s.atualizarDados);
  const atualizarLote    = useCentralStore((s) => s.atualizarLote);

  // Quantidades dinâmicas — único dado que muda em runtime
  const qtdTerrenos = useCentralStore((s) => s.edificiosBase.terrenos.quantidade);
  const qtdLojasP   = useCentralStore((s) => s.edificiosBase.lojasP.quantidade);
  const qtdLojasM   = useCentralStore((s) => s.edificiosBase.lojasM.quantidade);
  const qtdLojasG   = useCentralStore((s) => s.edificiosBase.lojasG.quantidade);

  // Faturamentos (para exibição no rodapé dos cards)
  const fatuTerrenos = useCentralStore((s) => s.edificiosBase.terrenos.faturamentoTotal ?? 0);
  const fatuLojasP   = useCentralStore((s) => s.edificiosBase.lojasP.faturamentoTotal ?? 0);
  const fatuLojasM   = useCentralStore((s) => s.edificiosBase.lojasM.faturamentoTotal ?? 0);
  const fatuLojasG   = useCentralStore((s) => s.edificiosBase.lojasG.faturamentoTotal ?? 0);

  // ── Economy Context ───────────────────────────────────────────────────────
  const { economiaSetores, setEconomiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);
  const saldo = economiaSetores.saldo;

  const activeLoan = economiaSetores.activeLoan || null;

  const [buttonConstructAudio] = useSound(constructorAudio);
  const [buttonAlertAudio]     = useSound(alertAudio);
  const [buttonPayTerrain]     = useSound(payTerrain);
  const [buttonQtdAudio]       = useSound(qtdAudio);

  const { resultadoTerrenos, resultadoLojasP, resultadoLojasM, resultadoLojasG } = Statistic();

  const [quantidadeTerrenos, setQuantidadeTerrenos] = useState(1);
  const [quantidadeLojasP,   setQuantidadeLojasP]   = useState(1);
  const [quantidadeLojasM,   setQuantidadeLojasM]   = useState(1);
  const [quantidadeLojasG,   setQuantidadeLojasG]   = useState(1);

  // ── Handlers de quantidade ────────────────────────────────────────────────
  const AumentarQuantidadeTerrenos = useCallback(() => { buttonQtdAudio(); setQuantidadeTerrenos(q => q + 1); }, [buttonQtdAudio]);
  const DiminuirQuantidadeTerrenos  = useCallback(() => { buttonQtdAudio(); setQuantidadeTerrenos(q => Math.max(1, q - 1)); }, [buttonQtdAudio]);
  const AumentarQuantidadeLojasP    = useCallback(() => { buttonQtdAudio(); setQuantidadeLojasP(q => q + 1); }, [buttonQtdAudio]);
  const DiminuirQuantidadeLojasP    = useCallback(() => { buttonQtdAudio(); setQuantidadeLojasP(q => Math.max(1, q - 1)); }, [buttonQtdAudio]);
  const AumentarQuantidadeLojasM    = useCallback(() => { buttonQtdAudio(); setQuantidadeLojasM(q => q + 1); }, [buttonQtdAudio]);
  const DiminuirQuantidadeLojasM    = useCallback(() => { buttonQtdAudio(); setQuantidadeLojasM(q => Math.max(1, q - 1)); }, [buttonQtdAudio]);
  const AumentarQuantidadeLojasG    = useCallback(() => { buttonQtdAudio(); setQuantidadeLojasG(q => q + 1); }, [buttonQtdAudio]);
  const DiminuirQuantidadeLojasG    = useCallback(() => { buttonQtdAudio(); setQuantidadeLojasG(q => Math.max(1, q - 1)); }, [buttonQtdAudio]);

  // ── Flags de compra — usam constantes estáticas, não o slice dinâmico ────
  const podeComprarTerreno = useMemo(
    () => saldo >= T_PRECO * quantidadeTerrenos,
    [saldo, quantidadeTerrenos]
  );

  const podeComprarLojaP = useMemo(
    () => qtdTerrenos >= P_NEC_T * quantidadeLojasP && saldo >= P_PRECO * quantidadeLojasP,
    [qtdTerrenos, quantidadeLojasP, saldo]
  );

  const podeComprarLojaM = useMemo(
    () => qtdTerrenos >= M_NEC_T * quantidadeLojasM && saldo >= M_PRECO * quantidadeLojasM,
    [qtdTerrenos, quantidadeLojasM, saldo]
  );

  const podeComprarLojaG = useMemo(
    () => qtdTerrenos >= G_NEC_T * quantidadeLojasG && saldo >= G_PRECO * quantidadeLojasG,
    [qtdTerrenos, quantidadeLojasG, saldo]
  );

  // ── Funções de compra ─────────────────────────────────────────────────────
  const ComprarTerreno = useCallback(() => {
    const custo = T_PRECO * quantidadeTerrenos;
    if (saldo < custo) {
      buttonAlertAudio();
      atualizarDados("modalAlert", { estadoModal: true, head: "Saldo insuficiente", content: "Junte mais saldo." });
      return;
    }
    buttonPayTerrain();
    atualizarLote([
      [["edificiosBase", "terrenos", "quantidade"], qtdTerrenos + quantidadeTerrenos],
    ]);
    atualizarEco("saldo", saldo - custo);
  }, [qtdTerrenos, quantidadeTerrenos, saldo]);

  const ComprarLojaP = useCallback(() => {
    const custo      = P_PRECO * quantidadeLojasP;
    const terrenosNec = P_NEC_T * quantidadeLojasP;
    if (qtdTerrenos < terrenosNec) {
      buttonAlertAudio();
      atualizarDados("modalAlert", { estadoModal: true, head: "Terrenos insuficientes", content: "Compre mais terrenos." });
      return;
    }
    if (saldo < custo) {
      buttonAlertAudio();
      atualizarDados("modalAlert", { estadoModal: true, head: "Saldo insuficiente", content: "Junte mais saldo." });
      return;
    }
    buttonConstructAudio();
    atualizarLote([
      [["edificiosBase", "lojasP",   "quantidade"], qtdLojasP   + quantidadeLojasP],
      [["edificiosBase", "terrenos", "quantidade"], qtdTerrenos - terrenosNec],
    ]);
    atualizarEco("saldo", saldo - custo);
  }, [qtdTerrenos, qtdLojasP, quantidadeLojasP, saldo]);

  const ComprarLojaM = useCallback(() => {
    const custo      = M_PRECO * quantidadeLojasM;
    const terrenosNec = M_NEC_T * quantidadeLojasM;
    if (qtdTerrenos < terrenosNec) {
      buttonAlertAudio();
      atualizarDados("modalAlert", { estadoModal: true, head: "Terrenos insuficientes", content: "Compre mais terrenos." });
      return;
    }
    if (saldo < custo) {
      buttonAlertAudio();
      atualizarDados("modalAlert", { estadoModal: true, head: "Saldo insuficiente", content: "Junte mais saldo." });
      return;
    }
    buttonConstructAudio();
    atualizarLote([
      [["edificiosBase", "lojasM",   "quantidade"], qtdLojasM   + quantidadeLojasM],
      [["edificiosBase", "terrenos", "quantidade"], qtdTerrenos - terrenosNec],
    ]);
    atualizarEco("saldo", saldo - custo);
  }, [qtdTerrenos, qtdLojasM, quantidadeLojasM, saldo]);

  const ComprarLojaG = useCallback(() => {
    const custo      = G_PRECO * quantidadeLojasG;
    const terrenosNec = G_NEC_T * quantidadeLojasG;
    if (qtdTerrenos < terrenosNec) {
      buttonAlertAudio();
      atualizarDados("modalAlert", { estadoModal: true, head: "Terrenos insuficientes", content: "Compre mais terrenos." });
      return;
    }
    if (saldo < custo) {
      buttonAlertAudio();
      atualizarDados("modalAlert", { estadoModal: true, head: "Saldo insuficiente", content: "Junte mais saldo." });
      return;
    }
    buttonConstructAudio();
    atualizarLote([
      [["edificiosBase", "lojasG",   "quantidade"], qtdLojasG   + quantidadeLojasG],
      [["edificiosBase", "terrenos", "quantidade"], qtdTerrenos - terrenosNec],
    ]);
    atualizarEco("saldo", saldo - custo);
  }, [qtdTerrenos, qtdLojasG, quantidadeLojasG, saldo]);

  // ── Hotkeys ───────────────────────────────────────────────────────────────
  const hotkeyGuard = dia <= 1 || algumModalAberto?.();

  useHotkeys("q", () => { if (hotkeyGuard || isNKeyDown) return; setIsNKeyDown(true); ComprarTerreno(); }, { keydown: true,  keyup: false, enableOnTags: ["INPUT","TEXTAREA","SELECT"] });
  useHotkeys("q", () => { setIsNKeyDown(false); },                                                         { keydown: false, keyup: true,  enableOnTags: ["INPUT","TEXTAREA","SELECT"] });
  useHotkeys("w", () => { if (hotkeyGuard || isNKeyDown) return; setIsNKeyDown(true); ComprarLojaP(); },   { keydown: true,  keyup: false, enableOnTags: ["INPUT","TEXTAREA","SELECT"] });
  useHotkeys("w", () => { setIsNKeyDown(false); },                                                         { keydown: false, keyup: true,  enableOnTags: ["INPUT","TEXTAREA","SELECT"] });
  useHotkeys("e", () => { if (hotkeyGuard || isNKeyDown) return; setIsNKeyDown(true); ComprarLojaM(); },   { keydown: true,  keyup: false, enableOnTags: ["INPUT","TEXTAREA","SELECT"] });
  useHotkeys("e", () => { setIsNKeyDown(false); },                                                         { keydown: false, keyup: true,  enableOnTags: ["INPUT","TEXTAREA","SELECT"] });
  useHotkeys("r", () => { if (hotkeyGuard || isNKeyDown) return; setIsNKeyDown(true); ComprarLojaG(); },   { keydown: true,  keyup: false, enableOnTags: ["INPUT","TEXTAREA","SELECT"] });
  useHotkeys("r", () => { setIsNKeyDown(false); },                                                         { keydown: false, keyup: true,  enableOnTags: ["INPUT","TEXTAREA","SELECT"] });

  // ── Roteamento pós dia 269 ────────────────────────────────────────────────
  if (dia > 269) {
    if (setorAtivo === "carteira") return <SidebarCard />;
    if (["mercado","estoque","gerenciamento","ecossistema"].includes(setorAtivo)) return <SideInformations />;

    return (
      <div className="flex justify-between h-full pt-10 pb-10 flex-col w-full">
        <div className="flex justify-around flex-col w-full">

          {/* ── TERRENOS ── */}
          <Paper elevation={6} sx={{ display:"flex",flexDirection:"column",p:2,bgcolor:"#290064",borderRadius:"20px",mb:2,maxWidth:400,maxHeight:350,position:"relative",width:{xs:"90vw",sm:"60vw",md:"30vw",lg:"20vw"} }}>
            <Box sx={{ flexGrow:1,display:"flex",flexDirection:"row" }}>
              <Box sx={{ flexGrow:1,mr:2,display:"flex",flexDirection:"column",justifyContent:"space-between" }}>
                <Box className="flex justify-between">
                  <GradientBox className="w-[70%]">
                    <Typography variant="subtitle1" color="white" fontWeight="bold" className="pl-[5px]">Terreno</Typography>
                  </GradientBox>
                  <Box className="w-[25%] bg-[#6411D9]" data-tooltip-id="tooltip-terreno-posse" data-tooltip-html="Quantidade total que você já possui desse imóvel" sx={{ bgcolor:"#6411D9",borderRadius:"10px",border:"2px solid #F27405",display:"flex",justifyContent:"center",alignItems:"center" }}>
                    <Typography variant="subtitle1" color="white" fontWeight="bold" className="text-center">{qtdTerrenos}</Typography>
                  </Box>
                </Box>
                <Box className="flex justify-between" sx={{ mt:0.5 }}>
                  <Box className="w-[50%]" data-tooltip-id="tooltip-terreno-preco" data-tooltip-html="Custo para comprar um terreno" mt={0.5} sx={{ bgcolor:"#6411D9",borderRadius:"2px",display:"flex",justifyContent:"space-between",alignItems:"center",px:1,py:0.25 }}>
                    <img className="w-4" src={DolarImg} alt="" />
                    <Typography variant="subtitle1" color="white" fontWeight="bold">{formatarNumero(T_PRECO)}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={0.5}>
                    <Box data-tooltip-id="tooltip-terreno-diminuir" data-tooltip-html="Diminuir quantidade">
                      <IconButton onClick={DiminuirQuantidadeTerrenos} sx={{ bgcolor:"#6411D9",width:{xs:24,sm:28},height:{xs:24,sm:28},borderRadius:{xs:"4px",sm:"5px"},"&:hover":{bgcolor:"#834EDB"} }}>
                        <img src={menos} width={12} height={12} />
                      </IconButton>
                    </Box>
                    <Box data-tooltip-id="tooltip-terreno-quantidade" data-tooltip-html="Quantidade selecionada" sx={{ mx:1,bgcolor:"#350973",width:{xs:24,sm:28},height:{xs:24,sm:28},borderRadius:{xs:"4px",sm:"5px"},display:"flex",justifyContent:"center",alignItems:"center" }}>
                      <Typography color="white" fontWeight="bold" fontSize={{xs:12,sm:14}}>{quantidadeTerrenos}</Typography>
                    </Box>
                    <Box data-tooltip-id="tooltip-terreno-aumentar" data-tooltip-html="Aumentar quantidade">
                      <IconButton onClick={AumentarQuantidadeTerrenos} sx={{ bgcolor:"#6411D9",width:{xs:24,sm:28},height:{xs:24,sm:28},borderRadius:{xs:"4px",sm:"5px"},"&:hover":{bgcolor:"#834EDB"} }}>
                        <img src={mais} width={12} height={12} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display:"flex",flexDirection:"column",justifyContent:"space-around" }}>
                <Box data-tooltip-id="tooltip-terreno-comprar" data-tooltip-html="Comprar terreno (Q)">
                  <Box style={getBotaoCompraStyle({ podeComprar: podeComprarTerreno })} sx={{ flexGrow:1,aspectRatio:"1",borderRadius:"10px",display:"flex",justifyContent:"center",alignItems:"center" }}>
                    <IconButton onClick={ComprarTerreno} sx={{ width:{xs:60,sm:80},height:{xs:60,sm:80},borderRadius:"10px","&:hover":{transform:"scale(1.05)"},"&:active":{transform:"scale(0.95)"} }}>
                      <img src={terrenoImg} alt="terreno" style={{ width:"60%",height:"60%" }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
            <TooltipPadrao id="tooltip-terreno-preco" /><TooltipPadrao id="tooltip-terreno-comprar" />
            <TooltipPadrao id="tooltip-terreno-diminuir" /><TooltipPadrao id="tooltip-terreno-quantidade" />
            <TooltipPadrao id="tooltip-terreno-aumentar" /><TooltipPadrao id="tooltip-terreno-posse" />
          </Paper>

          {/* ── LOJAS PEQUENAS ── */}
          <Paper elevation={6} sx={{ display:"flex",flexDirection:"column",p:2,bgcolor:"#290064",borderRadius:"20px",mb:2,maxWidth:400,position:"relative",width:{xs:"90vw",sm:"60vw",md:"30vw",lg:"20vw"} }}>
            <Box sx={{ flexGrow:1,display:"flex",flexDirection:"row" }}>
              <Box sx={{ flexGrow:1,mr:2,display:"flex",flexDirection:"column",justifyContent:"space-between" }}>
                <Box className="flex justify-between">
                  <GradientBox className="w-[70%]">
                    <Typography variant="subtitle1" color="white" fontWeight="bold" className="pl-[5px]">Imóvel Pequeno</Typography>
                  </GradientBox>
                  <Box className="w-[25%] bg-[#6411D9]" data-tooltip-id="tooltip-lojap-posse" data-tooltip-html="Quantidade total que você já possui" sx={{ bgcolor:"#6411D9",borderRadius:"10px",border:"2px solid #F27405",display:"flex",justifyContent:"center",alignItems:"center" }}>
                    <Typography variant="subtitle1" color="white" fontWeight="bold" className="text-center">{qtdLojasP}</Typography>
                  </Box>
                </Box>
                <Box className="flex justify-between" sx={{ mt:0.5 }}>
                  <Box className="w-[50%]" data-tooltip-id="tooltip-lojap-preco" data-tooltip-html={`Custo de construção. Requer ${P_NEC_T} terreno(s)`} mt={0.5} sx={{ bgcolor:"#6411D9",borderRadius:"2px",display:"flex",justifyContent:"space-between",alignItems:"center",px:1,py:0.25 }}>
                    <img className="w-4" src={martelo} alt="" />
                    <Typography variant="subtitle1" color="white" fontWeight="bold">{formatarNumero(P_PRECO * quantidadeLojasP)}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={0.5}>
                    <IconButton onClick={DiminuirQuantidadeLojasP} sx={{ bgcolor:"#6411D9",width:{xs:24,sm:28},height:{xs:24,sm:28},borderRadius:{xs:"4px",sm:"5px"},"&:hover":{bgcolor:"#834EDB"} }}>
                      <img src={menos} width={12} height={12} />
                    </IconButton>
                    <Box sx={{ mx:1,bgcolor:"#350973",width:{xs:24,sm:28},height:{xs:24,sm:28},borderRadius:{xs:"4px",sm:"5px"},display:"flex",justifyContent:"center",alignItems:"center" }}>
                      <Typography color="white" fontWeight="bold" fontSize={{xs:12,sm:14}}>{quantidadeLojasP}</Typography>
                    </Box>
                    <IconButton onClick={AumentarQuantidadeLojasP} sx={{ bgcolor:"#6411D9",width:{xs:24,sm:28},height:{xs:24,sm:28},borderRadius:{xs:"4px",sm:"5px"},"&:hover":{bgcolor:"#834EDB"} }}>
                      <img src={mais} width={12} height={12} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display:"flex",flexDirection:"column",justifyContent:"space-around" }}>
                <Box data-tooltip-id="tooltip-lojap-comprar" data-tooltip-html={`<div><p>Comprar imóvel pequeno (W)</p><p>Precisa de ${P_NEC_T} terreno(s).</p></div>`}>
                  <Box style={getBotaoCompraStyle({ podeComprar: podeComprarLojaP })} sx={{ flexGrow:1,aspectRatio:"1",borderRadius:"10px",display:"flex",justifyContent:"center",alignItems:"center" }}>
                    <IconButton onClick={ComprarLojaP} sx={{ width:{xs:60,sm:80},height:{xs:60,sm:80},borderRadius:"10px","&:hover":{transform:"scale(1.05)"},"&:active":{transform:"scale(0.95)"} }}>
                      <img src={LojaPImg} alt="loja pequena" style={{ width:"60%",height:"60%" }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
            <TooltipPadrao id="tooltip-lojap-preco" /><TooltipPadrao id="tooltip-lojap-comprar" /><TooltipPadrao id="tooltip-lojap-posse" />
          </Paper>

          {/* ── LOJAS MÉDIAS ── */}
          <Paper elevation={6} sx={{ display:"flex",flexDirection:"column",p:2,bgcolor:"#290064",borderRadius:"20px",mb:2,maxWidth:400,position:"relative",width:{xs:"90vw",sm:"60vw",md:"30vw",lg:"20vw"} }}>
            <Box sx={{ flexGrow:1,display:"flex",flexDirection:"row" }}>
              <Box sx={{ flexGrow:1,mr:2,display:"flex",flexDirection:"column",justifyContent:"space-between" }}>
                <Box className="flex justify-between">
                  <GradientBox className="w-[70%]">
                    <Typography variant="subtitle1" color="white" fontWeight="bold" className="pl-[5px]">Imóvel Médio</Typography>
                  </GradientBox>
                  <Box className="w-[25%] bg-[#6411D9]" data-tooltip-id="tooltip-lojam-posse" data-tooltip-html="Quantidade total que você já possui" sx={{ bgcolor:"#6411D9",borderRadius:"10px",border:"2px solid #F27405",display:"flex",justifyContent:"center",alignItems:"center" }}>
                    <Typography variant="subtitle1" color="white" fontWeight="bold" className="text-center">{qtdLojasM}</Typography>
                  </Box>
                </Box>
                <Box className="flex justify-between" sx={{ mt:0.5 }}>
                  <Box className="w-[50%]" data-tooltip-id="tooltip-lojam-preco" data-tooltip-html={`Custo de construção. Requer ${M_NEC_T} terrenos`} mt={0.5} sx={{ bgcolor:"#6411D9",borderRadius:"2px",display:"flex",justifyContent:"space-between",alignItems:"center",px:1,py:0.25 }}>
                    <img className="w-4" src={martelo} alt="" />
                    <Typography variant="subtitle1" color="white" fontWeight="bold">{formatarNumero(M_PRECO * quantidadeLojasM)}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={0.5}>
                    <IconButton onClick={DiminuirQuantidadeLojasM} sx={{ bgcolor:"#6411D9",width:{xs:24,sm:28},height:{xs:24,sm:28},borderRadius:{xs:"4px",sm:"5px"},"&:hover":{bgcolor:"#834EDB"} }}>
                      <img src={menos} width={12} height={12} />
                    </IconButton>
                    <Box sx={{ mx:1,bgcolor:"#350973",width:{xs:24,sm:28},height:{xs:24,sm:28},borderRadius:{xs:"4px",sm:"5px"},display:"flex",justifyContent:"center",alignItems:"center" }}>
                      <Typography color="white" fontWeight="bold" fontSize={{xs:12,sm:14}}>{quantidadeLojasM}</Typography>
                    </Box>
                    <IconButton onClick={AumentarQuantidadeLojasM} sx={{ bgcolor:"#6411D9",width:{xs:24,sm:28},height:{xs:24,sm:28},borderRadius:{xs:"4px",sm:"5px"},"&:hover":{bgcolor:"#834EDB"} }}>
                      <img src={mais} width={12} height={12} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display:"flex",flexDirection:"column",justifyContent:"space-around" }}>
                <Box data-tooltip-id="tooltip-lojam-comprar" data-tooltip-html={`<div><p>Comprar imóvel médio (E)</p><p>Precisa de ${M_NEC_T} terrenos.</p></div>`}>
                  <Box style={getBotaoCompraStyle({ podeComprar: podeComprarLojaM })} sx={{ flexGrow:1,aspectRatio:"1",borderRadius:"10px",display:"flex",justifyContent:"center",alignItems:"center" }}>
                    <IconButton onClick={ComprarLojaM} sx={{ width:{xs:60,sm:80},height:{xs:60,sm:80},borderRadius:"10px","&:hover":{transform:"scale(1.05)"},"&:active":{transform:"scale(0.95)"} }}>
                      <img src={LojaMImg} alt="loja média" style={{ width:"60%",height:"60%" }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
            <TooltipPadrao id="tooltip-lojam-preco" /><TooltipPadrao id="tooltip-lojam-comprar" /><TooltipPadrao id="tooltip-lojam-posse" />
          </Paper>

          {/* ── LOJAS GRANDES ── */}
          <Paper elevation={6} sx={{ display:"flex",flexDirection:"column",p:2,bgcolor:"#290064",borderRadius:"20px",mb:2,maxWidth:400,position:"relative",width:{xs:"90vw",sm:"60vw",md:"30vw",lg:"20vw"} }}>
            <Box sx={{ flexGrow:1,display:"flex",flexDirection:"row" }}>
              <Box sx={{ flexGrow:1,mr:2,display:"flex",flexDirection:"column",justifyContent:"space-between" }}>
                <Box className="flex justify-between">
                  <GradientBox className="w-[70%]">
                    <Typography variant="subtitle1" color="white" fontWeight="bold" className="pl-[5px]">Imóvel Grande</Typography>
                  </GradientBox>
                  <Box className="w-[25%] bg-[#6411D9]" data-tooltip-id="tooltip-lojag-posse" data-tooltip-html="Quantidade total que você já possui" sx={{ bgcolor:"#6411D9",borderRadius:"10px",border:"2px solid #F27405",display:"flex",justifyContent:"center",alignItems:"center" }}>
                    <Typography variant="subtitle1" color="white" fontWeight="bold" className="text-center">{qtdLojasG}</Typography>
                  </Box>
                </Box>
                <Box className="flex justify-between" sx={{ mt:0.5 }}>
                  <Box className="w-[50%]" data-tooltip-id="tooltip-lojag-preco" data-tooltip-html={`Custo de construção. Requer ${G_NEC_T} terrenos`} mt={0.5} sx={{ bgcolor:"#6411D9",borderRadius:"2px",display:"flex",justifyContent:"space-between",alignItems:"center",px:1,py:0.25 }}>
                    <img className="w-4" src={martelo} alt="" />
                    <Typography variant="subtitle1" color="white" fontWeight="bold">{formatarNumero(G_PRECO * quantidadeLojasG)}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={0.5}>
                    <IconButton onClick={DiminuirQuantidadeLojasG} sx={{ bgcolor:"#6411D9",width:{xs:24,sm:28},height:{xs:24,sm:28},borderRadius:{xs:"4px",sm:"5px"},"&:hover":{bgcolor:"#834EDB"} }}>
                      <img src={menos} width={12} height={12} />
                    </IconButton>
                    <Box sx={{ mx:1,bgcolor:"#350973",width:{xs:24,sm:28},height:{xs:24,sm:28},borderRadius:{xs:"4px",sm:"5px"},display:"flex",justifyContent:"center",alignItems:"center" }}>
                      <Typography color="white" fontWeight="bold" fontSize={{xs:12,sm:14}}>{quantidadeLojasG}</Typography>
                    </Box>
                    <IconButton onClick={AumentarQuantidadeLojasG} sx={{ bgcolor:"#6411D9",width:{xs:24,sm:28},height:{xs:24,sm:28},borderRadius:{xs:"4px",sm:"5px"},"&:hover":{bgcolor:"#834EDB"} }}>
                      <img src={mais} width={12} height={12} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display:"flex",flexDirection:"column",justifyContent:"space-around" }}>
                <Box data-tooltip-id="tooltip-lojag-comprar" data-tooltip-html={`<div><p>Comprar imóvel grande (R)</p><p>Precisa de ${G_NEC_T} terrenos.</p></div>`}>
                  <Box style={getBotaoCompraStyle({ podeComprar: podeComprarLojaG })} sx={{ flexGrow:1,aspectRatio:"1",borderRadius:"10px",display:"flex",justifyContent:"center",alignItems:"center" }}>
                    <IconButton onClick={ComprarLojaG} sx={{ width:{xs:60,sm:80},height:{xs:60,sm:80},borderRadius:"10px","&:hover":{transform:"scale(1.05)"},"&:active":{transform:"scale(0.95)"} }}>
                      <img src={LojaGImg} alt="loja grande" style={{ width:"60%",height:"60%" }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
            <TooltipPadrao id="tooltip-lojag-preco" /><TooltipPadrao id="tooltip-lojag-comprar" /><TooltipPadrao id="tooltip-lojag-posse" />
          </Paper>
        </div>
        <LoanCarousel />
      </div>
    );
  }

  // ── Render pré-dia 270 ────────────────────────────────────────────────────
  return (
    <div className="flex justify-around flex-col w-full">

      {/* ── TERRENOS pré-270 ── */}
      <Paper elevation={6} sx={{ display:"flex",flexDirection:"column",p:2,bgcolor:"#290064",borderRadius:"20px",mb:2,minHeight:"20vh",maxWidth:400,position:"relative",width:{xs:"90vw",sm:"60vw",md:"30vw",lg:"20vw"} }}>
        <Box sx={{ flexGrow:1,display:"flex",flexDirection:"row" }}>
          <Box sx={{ flexGrow:1,mr:2,display:"flex",flexDirection:"column",justifyContent:"space-between" }}>
            <GradientBox>
              <Typography variant="subtitle1" color="white" fontWeight="bold">Terreno</Typography>
            </GradientBox>
            <Box sx={{ mt:0.5,ml:2.5 }} data-tooltip-id="tooltip-terreno-preco" data-tooltip-html="Preço unitário para comprar um terreno">
              <Box sx={{ bgcolor:"#6411D9",borderRadius:"2px",display:"flex",justifyContent:"space-between",alignItems:"center",px:1,py:0.25 }}>
                <Typography variant="subtitle1" color="white" fontWeight="bold">Valor</Typography>
                <Typography variant="subtitle1" color="white" fontWeight="bold">{formatarNumero(T_PRECO)}</Typography>
              </Box>
            </Box>
            <Box sx={{ mt:0.5,ml:2.5 }} data-tooltip-id="tooltip-terreno-total" data-tooltip-html="Custo total considerando a quantidade escolhida">
              <Box sx={{ bgcolor:"#350973",borderRadius:"5px",height:{xs:24,sm:28},display:"flex",justifyContent:"space-between",alignItems:"center",px:1 }}>
                <Typography variant="body2" color="white" fontWeight="bold" fontSize={{xs:12,sm:14}}>Valor total</Typography>
                <Typography variant="body2" color="white" fontWeight="bold" fontSize={{xs:12,sm:14}}>{formatarNumero(T_PRECO * quantidadeTerrenos)}</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display:"flex",flexDirection:"column",justifyContent:"space-around" }}>
            <Box data-tooltip-id="tooltip-terreno-comprar" data-tooltip-html="Comprar terreno (Q)">
              <Box style={getBotaoCompraStyle({ podeComprar: podeComprarTerreno })} sx={{ flexGrow:1,aspectRatio:"1",borderRadius:"10px",display:"flex",justifyContent:"center",alignItems:"center" }}>
                <IconButton onClick={ComprarTerreno} sx={{ width:{xs:60,sm:80},height:{xs:60,sm:80},borderRadius:"10px","&:hover":{transform:"scale(1.05)"},"&:active":{transform:"scale(0.95)"} }}>
                  <img src={terrenoImg} alt="terreno" style={{ width:"60%",height:"60%" }} />
                </IconButton>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mt={0.5}>
              <Box data-tooltip-id="tooltip-terreno-diminuir" data-tooltip-html="Diminuir quantidade">
                <IconButton onClick={DiminuirQuantidadeTerrenos} sx={{ bgcolor:"#6411D9",width:{xs:24,sm:28},height:{xs:24,sm:28},borderRadius:{xs:"4px",sm:"5px"},"&:hover":{bgcolor:"#834EDB"} }}>
                  <img src={menos} width={12} height={12} />
                </IconButton>
              </Box>
              <Box data-tooltip-id="tooltip-terreno-quantidade" data-tooltip-html="Quantidade selecionada" sx={{ mx:1,bgcolor:"#350973",width:{xs:24,sm:28},height:{xs:24,sm:28},borderRadius:{xs:"4px",sm:"5px"},display:"flex",justifyContent:"center",alignItems:"center" }}>
                <Typography color="white" fontWeight="bold" fontSize={{xs:12,sm:14}}>{quantidadeTerrenos}</Typography>
              </Box>
              <Box data-tooltip-id="tooltip-terreno-aumentar" data-tooltip-html="Aumentar quantidade">
                <IconButton onClick={AumentarQuantidadeTerrenos} sx={{ bgcolor:"#6411D9",width:{xs:24,sm:28},height:{xs:24,sm:28},borderRadius:{xs:"4px",sm:"5px"},"&:hover":{bgcolor:"#834EDB"} }}>
                  <img src={mais} width={12} height={12} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
        <GradientBox sx={{ borderRadius:"20px",display:"flex",justifyContent:"space-between",alignItems:"center",px:2,mt:1,minHeight:40 }}>
          <Box data-tooltip-id="tooltip-terreno-faturamento" data-tooltip-html="Valor faturado no dia anterior" display="flex" alignItems="center">
            <img src={DolarImg} width={16} height={16} />
            <Typography variant="body1" color="white" fontWeight="bold" ml={1}>{(fatuTerrenos || 0).toLocaleString("pt-BR")}</Typography>
          </Box>
          <Box data-tooltip-id="tooltip-terreno-rentabilidade" data-tooltip-html="Rentabilidade atual" display="flex" alignItems="center">
            <Typography variant="body1" color="white" fontWeight="bold" mr={1}>{(resultadoTerrenos || 0).toFixed(2)}</Typography>
            <img src={porcem} width={14} height={14} />
          </Box>
        </GradientBox>
        <Box data-tooltip-id="tooltip-terreno-posse" data-tooltip-html="Quantidade que você possui" sx={{ bgcolor:"#6411D9",width:{xs:40,sm:48},height:{xs:40,sm:48},borderRadius:"10px",border:"2px solid #F27405",position:"absolute",left:{xs:-20,sm:-24},top:"50%",transform:"translateY(-50%)",display:"flex",justifyContent:"center",alignItems:"center" }}>
          <Typography color="white" fontWeight="bold" fontSize={{xs:12,sm:16}}>{qtdTerrenos}</Typography>
        </Box>
        <TooltipPadrao id="tooltip-terreno-preco" /><TooltipPadrao id="tooltip-terreno-total" /><TooltipPadrao id="tooltip-terreno-comprar" />
        <TooltipPadrao id="tooltip-terreno-diminuir" /><TooltipPadrao id="tooltip-terreno-quantidade" /><TooltipPadrao id="tooltip-terreno-aumentar" />
        <TooltipPadrao id="tooltip-terreno-faturamento" /><TooltipPadrao id="tooltip-terreno-rentabilidade" /><TooltipPadrao id="tooltip-terreno-posse" />
      </Paper>

      {/* ── LOJAS PEQUENAS pré-270 ── */}
      <Paper elevation={6} sx={{ display:"flex",flexDirection:"column",p:2,bgcolor:"#290064",borderRadius:"20px",mb:2,minHeight:"20vh",maxWidth:400,position:"relative",width:{xs:"90vw",sm:"60vw",md:"30vw",lg:"20vw"} }}>
        <Box sx={{ flexGrow:1,display:"flex",flexDirection:"row" }}>
          <Box sx={{ flexGrow:1,mr:2,display:"flex",flexDirection:"column",justifyContent:"space-between" }}>
            <GradientBox><Typography variant="subtitle1" color="white" fontWeight="bold">Imóvel Pequeno</Typography></GradientBox>
            <Box sx={{ mt:0.5,ml:2.5 }} data-tooltip-id="tooltip-lojap-preco" data-tooltip-html={`Construção. Requer ${P_NEC_T} terreno`}>
              <Box sx={{ bgcolor:"#6411D9",borderRadius:"2px",display:"flex",justifyContent:"space-between",alignItems:"center",px:1,py:0.25 }}>
                <Typography variant="subtitle1" color="white" fontWeight="bold">Construção</Typography>
                <Typography variant="subtitle1" color="white" fontWeight="bold">{formatarNumero(P_PRECO)}</Typography>
              </Box>
            </Box>
            <Box sx={{ mt:0.5,ml:2.5 }} data-tooltip-id="tooltip-lojap-total" data-tooltip-html="Custo total considerando a quantidade">
              <Box sx={{ bgcolor:"#350973",borderRadius:"5px",height:{xs:24,sm:28},display:"flex",justifyContent:"space-between",alignItems:"center",px:1 }}>
                <Typography variant="body2" color="white" fontWeight="bold" fontSize={{xs:12,sm:14}}>Valor total</Typography>
                <Typography variant="body2" color="white" fontWeight="bold" fontSize={{xs:12,sm:14}}>{formatarNumero(P_PRECO * quantidadeLojasP)}</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display:"flex",flexDirection:"column",justifyContent:"space-around" }}>
            <Box data-tooltip-id="tooltip-lojap-comprar" data-tooltip-html={`Comprar imóvel pequeno (W). Requer ${P_NEC_T} terreno.`}>
              <Box style={getBotaoCompraStyle({ podeComprar: podeComprarLojaP })} sx={{ flexGrow:1,aspectRatio:"1",borderRadius:"10px",display:"flex",justifyContent:"center",alignItems:"center" }}>
                <IconButton onClick={ComprarLojaP} sx={{ width:{xs:60,sm:80},height:{xs:60,sm:80},borderRadius:"10px","&:hover":{transform:"scale(1.05)"},"&:active":{transform:"scale(0.95)"} }}>
                  <img src={LojaPImg} alt="loja pequena" style={{ width:"60%",height:"60%" }} />
                </IconButton>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mt={0.5}>
              <IconButton onClick={DiminuirQuantidadeLojasP} sx={{ bgcolor:"#6411D9",width:{xs:24,sm:28},height:{xs:24,sm:28},borderRadius:{xs:"4px",sm:"5px"},"&:hover":{bgcolor:"#834EDB"} }}><img src={menos} width={12} height={12} /></IconButton>
              <Box sx={{ mx:1,bgcolor:"#350973",width:{xs:24,sm:28},height:{xs:24,sm:28},borderRadius:{xs:"4px",sm:"5px"},display:"flex",justifyContent:"center",alignItems:"center" }}><Typography color="white" fontWeight="bold" fontSize={{xs:12,sm:14}}>{quantidadeLojasP}</Typography></Box>
              <IconButton onClick={AumentarQuantidadeLojasP} sx={{ bgcolor:"#6411D9",width:{xs:24,sm:28},height:{xs:24,sm:28},borderRadius:{xs:"4px",sm:"5px"},"&:hover":{bgcolor:"#834EDB"} }}><img src={mais} width={12} height={12} /></IconButton>
            </Box>
          </Box>
        </Box>
        <GradientBox sx={{ borderRadius:"20px",display:"flex",justifyContent:"space-between",alignItems:"center",px:2,mt:1,minHeight:40 }}>
          <Box display="flex" alignItems="center"><img src={DolarImg} width={16} height={16} /><Typography variant="body1" color="white" fontWeight="bold" ml={1}>{(fatuLojasP || 0).toLocaleString("pt-BR")}</Typography></Box>
          <Box display="flex" alignItems="center"><Typography variant="body1" color="white" fontWeight="bold" mr={1}>{(resultadoLojasP || 0).toFixed(2)}</Typography><img src={porcem} width={14} height={14} /></Box>
        </GradientBox>
        <Box sx={{ bgcolor:"#6411D9",width:{xs:40,sm:48},height:{xs:40,sm:48},borderRadius:"10px",border:"2px solid #F27405",position:"absolute",left:{xs:-20,sm:-24},top:"50%",transform:"translateY(-50%)",display:"flex",justifyContent:"center",alignItems:"center" }}>
          <Typography color="white" fontWeight="bold" fontSize={{xs:12,sm:16}}>{qtdLojasP}</Typography>
        </Box>
        <TooltipPadrao id="tooltip-lojap-preco" /><TooltipPadrao id="tooltip-lojap-total" /><TooltipPadrao id="tooltip-lojap-comprar" />
      </Paper>

      {/* ── LOJAS MÉDIAS pré-270 ── */}
      <Paper elevation={6} sx={{ display:"flex",flexDirection:"column",p:2,bgcolor:"#290064",borderRadius:"20px",mb:2,minHeight:"20vh",maxWidth:400,position:"relative",width:{xs:"90vw",sm:"60vw",md:"30vw",lg:"20vw"} }}>
        <Box sx={{ flexGrow:1,display:"flex",flexDirection:"row" }}>
          <Box sx={{ flexGrow:1,mr:2,display:"flex",flexDirection:"column",justifyContent:"space-between" }}>
            <GradientBox><Typography variant="subtitle1" color="white" fontWeight="bold">Imóvel Médio</Typography></GradientBox>
            <Box sx={{ mt:0.5,ml:2.5 }} data-tooltip-id="tooltip-lojam-preco" data-tooltip-html={`Construção. Requer ${M_NEC_T} terrenos`}>
              <Box sx={{ bgcolor:"#6411D9",borderRadius:"2px",display:"flex",justifyContent:"space-between",alignItems:"center",px:1,py:0.25 }}>
                <Typography variant="subtitle1" color="white" fontWeight="bold">Construção</Typography>
                <Typography variant="subtitle1" color="white" fontWeight="bold">{formatarNumero(M_PRECO)}</Typography>
              </Box>
            </Box>
            <Box sx={{ mt:0.5,ml:2.5 }} data-tooltip-id="tooltip-lojam-total" data-tooltip-html="Custo total">
              <Box sx={{ bgcolor:"#350973",borderRadius:"5px",height:{xs:24,sm:28},display:"flex",justifyContent:"space-between",alignItems:"center",px:1 }}>
                <Typography variant="body2" color="white" fontWeight="bold" fontSize={{xs:12,sm:14}}>Valor total</Typography>
                <Typography variant="body2" color="white" fontWeight="bold" fontSize={{xs:12,sm:14}}>{formatarNumero(M_PRECO * quantidadeLojasM)}</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display:"flex",flexDirection:"column",justifyContent:"space-around" }}>
            <Box data-tooltip-id="tooltip-lojam-comprar" data-tooltip-html={`Comprar imóvel médio (E). Requer ${M_NEC_T} terrenos.`}>
              <Box style={getBotaoCompraStyle({ podeComprar: podeComprarLojaM })} sx={{ flexGrow:1,aspectRatio:"1",borderRadius:"10px",display:"flex",justifyContent:"center",alignItems:"center" }}>
                <IconButton onClick={ComprarLojaM} sx={{ width:{xs:60,sm:80},height:{xs:60,sm:80},borderRadius:"10px","&:hover":{transform:"scale(1.05)"},"&:active":{transform:"scale(0.95)"} }}>
                  <img src={LojaMImg} alt="loja média" style={{ width:"60%",height:"60%" }} />
                </IconButton>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mt={0.5}>
              <IconButton onClick={DiminuirQuantidadeLojasM} sx={{ bgcolor:"#6411D9",width:{xs:24,sm:28},height:{xs:24,sm:28},borderRadius:{xs:"4px",sm:"5px"},"&:hover":{bgcolor:"#834EDB"} }}><img src={menos} width={12} height={12} /></IconButton>
              <Box sx={{ mx:1,bgcolor:"#350973",width:{xs:24,sm:28},height:{xs:24,sm:28},borderRadius:{xs:"4px",sm:"5px"},display:"flex",justifyContent:"center",alignItems:"center" }}><Typography color="white" fontWeight="bold" fontSize={{xs:12,sm:14}}>{quantidadeLojasM}</Typography></Box>
              <IconButton onClick={AumentarQuantidadeLojasM} sx={{ bgcolor:"#6411D9",width:{xs:24,sm:28},height:{xs:24,sm:28},borderRadius:{xs:"4px",sm:"5px"},"&:hover":{bgcolor:"#834EDB"} }}><img src={mais} width={12} height={12} /></IconButton>
            </Box>
          </Box>
        </Box>
        <GradientBox sx={{ borderRadius:"20px",display:"flex",justifyContent:"space-between",alignItems:"center",px:2,mt:1,minHeight:40 }}>
          <Box display="flex" alignItems="center"><img src={DolarImg} width={16} height={16} /><Typography variant="body1" color="white" fontWeight="bold" ml={1}>{(fatuLojasM || 0).toLocaleString("pt-BR")}</Typography></Box>
          <Box display="flex" alignItems="center"><Typography variant="body1" color="white" fontWeight="bold" mr={1}>{(resultadoLojasM || 0).toFixed(2)}</Typography><img src={porcem} width={14} height={14} /></Box>
        </GradientBox>
        <Box sx={{ bgcolor:"#6411D9",width:{xs:40,sm:48},height:{xs:40,sm:48},borderRadius:"10px",border:"2px solid #F27405",position:"absolute",left:{xs:-20,sm:-24},top:"50%",transform:"translateY(-50%)",display:"flex",justifyContent:"center",alignItems:"center" }}>
          <Typography color="white" fontWeight="bold" fontSize={{xs:12,sm:16}}>{qtdLojasM}</Typography>
        </Box>
        <TooltipPadrao id="tooltip-lojam-preco" /><TooltipPadrao id="tooltip-lojam-total" /><TooltipPadrao id="tooltip-lojam-comprar" />
      </Paper>

      {/* ── LOJAS GRANDES pré-270 ── */}
      <Paper elevation={6} sx={{ display:"flex",flexDirection:"column",p:2,bgcolor:"#290064",borderRadius:"20px",mb:2,minHeight:"20vh",maxWidth:400,position:"relative",width:{xs:"90vw",sm:"60vw",md:"30vw",lg:"20vw"} }}>
        <Box sx={{ flexGrow:1,display:"flex",flexDirection:"row" }}>
          <Box sx={{ flexGrow:1,mr:2,display:"flex",flexDirection:"column",justifyContent:"space-between" }}>
            <GradientBox><Typography variant="subtitle1" color="white" fontWeight="bold">Imóvel Grande</Typography></GradientBox>
            <Box sx={{ mt:0.5,ml:2.5 }} data-tooltip-id="tooltip-lojag-preco" data-tooltip-html={`Construção. Requer ${G_NEC_T} terrenos`}>
              <Box sx={{ bgcolor:"#6411D9",borderRadius:"2px",display:"flex",justifyContent:"space-between",alignItems:"center",px:1,py:0.25 }}>
                <Typography variant="subtitle1" color="white" fontWeight="bold">Construção</Typography>
                <Typography variant="subtitle1" color="white" fontWeight="bold">{formatarNumero(G_PRECO)}</Typography>
              </Box>
            </Box>
            <Box sx={{ mt:0.5,ml:2.5 }} data-tooltip-id="tooltip-lojag-total" data-tooltip-html="Custo total">
              <Box sx={{ bgcolor:"#350973",borderRadius:"5px",height:{xs:24,sm:28},display:"flex",justifyContent:"space-between",alignItems:"center",px:1 }}>
                <Typography variant="body2" color="white" fontWeight="bold" fontSize={{xs:12,sm:14}}>Valor total</Typography>
                <Typography variant="body2" color="white" fontWeight="bold" fontSize={{xs:12,sm:14}}>{formatarNumero(G_PRECO * quantidadeLojasG)}</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display:"flex",flexDirection:"column",justifyContent:"space-around" }}>
            <Box data-tooltip-id="tooltip-lojag-comprar" data-tooltip-html={`Comprar imóvel grande (R). Requer ${G_NEC_T} terrenos.`}>
              <Box style={getBotaoCompraStyle({ podeComprar: podeComprarLojaG })} sx={{ flexGrow:1,aspectRatio:"1",borderRadius:"10px",display:"flex",justifyContent:"center",alignItems:"center" }}>
                <IconButton onClick={ComprarLojaG} sx={{ width:{xs:60,sm:80},height:{xs:60,sm:80},borderRadius:"10px","&:hover":{transform:"scale(1.05)"},"&:active":{transform:"scale(0.95)"} }}>
                  <img src={LojaGImg} alt="loja grande" style={{ width:"60%",height:"60%" }} />
                </IconButton>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mt={0.5}>
              <IconButton onClick={DiminuirQuantidadeLojasG} sx={{ bgcolor:"#6411D9",width:{xs:24,sm:28},height:{xs:24,sm:28},borderRadius:{xs:"4px",sm:"5px"},"&:hover":{bgcolor:"#834EDB"} }}><img src={menos} width={12} height={12} /></IconButton>
              <Box sx={{ mx:1,bgcolor:"#350973",width:{xs:24,sm:28},height:{xs:24,sm:28},borderRadius:{xs:"4px",sm:"5px"},display:"flex",justifyContent:"center",alignItems:"center" }}><Typography color="white" fontWeight="bold" fontSize={{xs:12,sm:14}}>{quantidadeLojasG}</Typography></Box>
              <IconButton onClick={AumentarQuantidadeLojasG} sx={{ bgcolor:"#6411D9",width:{xs:24,sm:28},height:{xs:24,sm:28},borderRadius:{xs:"4px",sm:"5px"},"&:hover":{bgcolor:"#834EDB"} }}><img src={mais} width={12} height={12} /></IconButton>
            </Box>
          </Box>
        </Box>
        <GradientBox sx={{ borderRadius:"20px",display:"flex",justifyContent:"space-between",alignItems:"center",px:2,mt:1,minHeight:40 }}>
          <Box display="flex" alignItems="center"><img src={DolarImg} width={16} height={16} /><Typography variant="body1" color="white" fontWeight="bold" ml={1}>{(fatuLojasG || 0).toLocaleString("pt-BR")}</Typography></Box>
          <Box display="flex" alignItems="center"><Typography variant="body1" color="white" fontWeight="bold" mr={1}>{(resultadoLojasG || 0).toFixed(2)}</Typography><img src={porcem} width={14} height={14} /></Box>
        </GradientBox>
        <Box sx={{ bgcolor:"#6411D9",width:{xs:40,sm:48},height:{xs:40,sm:48},borderRadius:"10px",border:"2px solid #F27405",position:"absolute",left:{xs:-20,sm:-24},top:"50%",transform:"translateY(-50%)",display:"flex",justifyContent:"center",alignItems:"center" }}>
          <Typography color="white" fontWeight="bold" fontSize={{xs:12,sm:16}}>{qtdLojasG}</Typography>
        </Box>
        <TooltipPadrao id="tooltip-lojag-preco" /><TooltipPadrao id="tooltip-lojag-total" /><TooltipPadrao id="tooltip-lojag-comprar" />
      </Paper>
    </div>
  );
}