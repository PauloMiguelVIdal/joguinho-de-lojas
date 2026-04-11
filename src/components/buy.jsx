import React, { useContext, useState, useCallback, useMemo } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
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

// ─── PERFORMANCE: GradientBox fora do componente ─────────────────────────────
// Este é o fix mais impactante do arquivo. styled() dentro de um componente
// gera uma nova classe CSS a cada render, forçando o MUI a remontar todos
// os elementos que usam GradientBox — causando flicker e lentidão visível.
// Movendo para o nível do módulo, a classe é criada uma única vez.
const GradientBox = styled(Box)({
  background: "linear-gradient(to left, #F27405, #F27405)",
  borderRadius: 5,
  padding: 8,
});

// ─── PERFORMANCE: tooltipStyle e TooltipPadrao fora do componente ─────────────
// Objeto literal e componente recriados a cada render — custo desnecessário.
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

// ─── PERFORMANCE: formatarNumero fora do componente ──────────────────────────
// Função pura sem dependências — não precisa viver dentro do componente.
const formatarNumero = (num) => {
  if (num >= 1e12) return (num / 1e12).toFixed(1).replace(".0", "") + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(1).replace(".0", "") + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(1).replace(".0", "") + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1).replace(".0", "") + "K";
  return num.toString();
};

// ─── PERFORMANCE: getBotaoCompraStyle fora do componente ─────────────────────
// Já era exportada, mas estava sendo recalculada inline em cada render.
// Mantida aqui junto com o restante das constantes do módulo.
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
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  const [isNKeyDown, setIsNKeyDown] = useState(false);
  const vision = dados.vision.visionAtual;
  const setorAtual = dados.setorAtual;

  const { economiaSetores, setEconomiaSetores, atualizarEco } = useContext(
    DadosEconomyGlobalContext
  );

  const activeLoan = economiaSetores.activeLoan || null;

  const [buttonConstructAudio] = useSound(constructorAudio);
  const [buttonAlertAudio] = useSound(alertAudio);
  const [buttonPayTerrain] = useSound(payTerrain);
  const [buttonQtdAudio] = useSound(qtdAudio);

  const {
    resultadoTerrenos,
    resultadoLojasP,
    resultadoLojasM,
    resultadoLojasG,
  } = Statistic();

  const [quantidadeTerrenos, setQuantidadeTerrenos] = useState(1);
  const [quantidadeLojasP, setQuantidadeLojasP] = useState(1);
  const [quantidadeLojasM, setQuantidadeLojasM] = useState(1);
  const [quantidadeLojasG, setQuantidadeLojasG] = useState(1);

  // ─── PERFORMANCE: handlers de quantidade memoizados ──────────────────────────
  // Antes eram funções anônimas recriadas a cada render, forçando re-render
  // de todos os IconButtons que as recebiam como prop onClick.
  const AumentarQuantidadeTerrenos = useCallback(() => { buttonQtdAudio(); setQuantidadeTerrenos(q => q + 1); }, [buttonQtdAudio]);
  const DiminuirQuantidadeTerrenos  = useCallback(() => { buttonQtdAudio(); setQuantidadeTerrenos(q => Math.max(1, q - 1)); }, [buttonQtdAudio]);
  const AumentarQuantidadeLojasP    = useCallback(() => { buttonQtdAudio(); setQuantidadeLojasP(q => q + 1); }, [buttonQtdAudio]);
  const DiminuirQuantidadeLojasP    = useCallback(() => { buttonQtdAudio(); setQuantidadeLojasP(q => Math.max(1, q - 1)); }, [buttonQtdAudio]);
  const AumentarQuantidadeLojasM    = useCallback(() => { buttonQtdAudio(); setQuantidadeLojasM(q => q + 1); }, [buttonQtdAudio]);
  const DiminuirQuantidadeLojasM    = useCallback(() => { buttonQtdAudio(); setQuantidadeLojasM(q => Math.max(1, q - 1)); }, [buttonQtdAudio]);
  const AumentarQuantidadeLojasG    = useCallback(() => { buttonQtdAudio(); setQuantidadeLojasG(q => q + 1); }, [buttonQtdAudio]);
  const DiminuirQuantidadeLojasG    = useCallback(() => { buttonQtdAudio(); setQuantidadeLojasG(q => Math.max(1, q - 1)); }, [buttonQtdAudio]);

  // ─── PERFORMANCE: flags de compra memoizadas ─────────────────────────────────
  // Antes eram expressões recalculadas inline no JSX a cada render.
  const podeComprarTerreno = useMemo(() =>
    dados.terrenos.quantidade >= dados.terrenos.quantidadeNecTerreno * quantidadeTerrenos &&
    economiaSetores.saldo >= dados.terrenos.preçoConstrução * quantidadeTerrenos,
    [dados.terrenos.quantidade, dados.terrenos.quantidadeNecTerreno, dados.terrenos.preçoConstrução, economiaSetores.saldo, quantidadeTerrenos]
  );

  const podeComprarLojaP = useMemo(() =>
    dados.terrenos.quantidade >= dados.lojasP.quantidadeNecTerreno * quantidadeLojasP &&
    economiaSetores.saldo >= dados.lojasP.preçoConstrução * quantidadeLojasP,
    [dados.terrenos.quantidade, dados.lojasP.quantidadeNecTerreno, dados.lojasP.preçoConstrução, economiaSetores.saldo, quantidadeLojasP]
  );

  const podeComprarLojaM = useMemo(() =>
    dados.terrenos.quantidade >= dados.lojasM.quantidadeNecTerreno * quantidadeLojasM &&
    economiaSetores.saldo >= dados.lojasM.preçoConstrução * quantidadeLojasM,
    [dados.terrenos.quantidade, dados.lojasM.quantidadeNecTerreno, dados.lojasM.preçoConstrução, economiaSetores.saldo, quantidadeLojasM]
  );

  const podeComprarLojaG = useMemo(() =>
    dados.terrenos.quantidade >= dados.lojasG.quantidadeNecTerreno * quantidadeLojasG &&
    economiaSetores.saldo >= dados.lojasG.preçoConstrução * quantidadeLojasG,
    [dados.terrenos.quantidade, dados.lojasG.quantidadeNecTerreno, dados.lojasG.preçoConstrução, economiaSetores.saldo, quantidadeLojasG]
  );

  // ─── PERFORMANCE: funções de compra memoizadas com useCallback ───────────────
  // Antes eram funções locais recriadas a cada render, forçando re-render
  // dos botões de compra mesmo quando nada relevante havia mudado.
  const ComprarTerreno = useCallback(() => {
    if (economiaSetores.saldo < dados.terrenos.preçoConstrução * quantidadeTerrenos) {
      buttonAlertAudio();
      atualizarDados("modalAlert", {
        ...dados.modalAlert,
        estadoModal: true,
        head: "Você não tem Saldo suficiente",
        content: "Junte maior quantidade de saldo para realizar essa ação.",
      });
      return;
    }
    if (dados.dia === 1 && dados.terrenos.quantidade === 0) {
      atualizarDados("modalCompraTerrenos", { ...dados.modalInicio, estadoModal: true });
    }
    buttonPayTerrain();
    atualizarDados("terrenos", {
      ...dados.terrenos,
      quantidade: dados.terrenos.quantidade + quantidadeTerrenos,
    });
    atualizarEco("saldo", economiaSetores.saldo - dados.terrenos.preçoConstrução * quantidadeTerrenos);
  }, [dados, economiaSetores.saldo, quantidadeTerrenos, atualizarDados, atualizarEco, buttonAlertAudio, buttonPayTerrain]);

  const ComprarLojaP = useCallback(() => {
    if (dados.terrenos.quantidade < dados.lojasP.quantidadeNecTerreno * quantidadeLojasP) {
      buttonAlertAudio();
      atualizarDados("modalAlert", { ...dados.modalAlert, estadoModal: true, head: "Você não tem Terrenos suficiente", content: "Compre Terreno, suficiente para construir o que deseja." });
      return;
    }
    if (economiaSetores.saldo < dados.lojasP.preçoConstrução * quantidadeLojasP) {
      buttonAlertAudio();
      atualizarDados("modalAlert", { ...dados.modalAlert, estadoModal: true, head: "Você não tem Saldo suficiente", content: "Junte maior quantidade de saldo para realizar essa ação." });
      return;
    }
    if (dados.dia === 1) {
      atualizarDados("modalContinuarDias", { ...dados.modalInicio, estadoModal: true });
    }
    buttonConstructAudio();
    atualizarDados("lojasP", { ...dados.lojasP, quantidade: dados.lojasP.quantidade + quantidadeLojasP });
    atualizarDados("terrenos", { ...dados.terrenos, quantidade: dados.terrenos.quantidade - dados.lojasP.quantidadeNecTerreno * quantidadeLojasP });
    atualizarEco("saldo", economiaSetores.saldo - dados.lojasP.preçoConstrução * quantidadeLojasP);
  }, [dados, economiaSetores.saldo, quantidadeLojasP, atualizarDados, atualizarEco, buttonAlertAudio, buttonConstructAudio]);

  const ComprarLojaM = useCallback(() => {
    if (dados.terrenos.quantidade < dados.lojasM.quantidadeNecTerreno * quantidadeLojasM) {
      buttonAlertAudio();
      atualizarDados("modalAlert", { ...dados.modalAlert, estadoModal: true, head: "Você não tem Terrenos suficiente", content: "Compre Terreno, suficiente para construir o que deseja." });
      return;
    }
    if (economiaSetores.saldo < dados.lojasM.preçoConstrução * quantidadeLojasM) {
      buttonAlertAudio();
      atualizarDados("modalAlert", { ...dados.modalAlert, estadoModal: true, head: "Você não tem Saldo suficiente", content: "Junte maior quantidade de saldo para realizar essa ação." });
      return;
    }
    buttonConstructAudio();
    atualizarDados("lojasM", { ...dados.lojasM, quantidade: dados.lojasM.quantidade + quantidadeLojasM });
    atualizarDados("terrenos", { ...dados.terrenos, quantidade: dados.terrenos.quantidade - dados.lojasM.quantidadeNecTerreno * quantidadeLojasM });
    atualizarEco("saldo", economiaSetores.saldo - dados.lojasM.preçoConstrução * quantidadeLojasM);
  }, [dados, economiaSetores.saldo, quantidadeLojasM, atualizarDados, atualizarEco, buttonAlertAudio, buttonConstructAudio]);

  const ComprarLojaG = useCallback(() => {
    if (dados.terrenos.quantidade < dados.lojasG.quantidadeNecTerreno * quantidadeLojasG) {
      buttonAlertAudio();
      atualizarDados("modalAlert", { ...dados.modalAlert, estadoModal: true, head: "Você não tem Terrenos suficiente", content: "Compre Terreno, suficiente para construir o que deseja." });
      return;
    }
    if (economiaSetores.saldo < dados.lojasG.preçoConstrução * quantidadeLojasG) {
      buttonAlertAudio();
      atualizarDados("modalAlert", { ...dados.modalAlert, estadoModal: true, head: "Você não tem Saldo suficiente", content: "Junte maior quantidade de saldo para realizar essa ação." });
      return;
    }
    buttonConstructAudio();
    atualizarDados("lojasG", { ...dados.lojasG, quantidade: dados.lojasG.quantidade + quantidadeLojasG });
    atualizarDados("terrenos", { ...dados.terrenos, quantidade: dados.terrenos.quantidade - dados.lojasG.quantidadeNecTerreno * quantidadeLojasG });
    atualizarEco("saldo", economiaSetores.saldo - dados.lojasG.preçoConstrução * quantidadeLojasG);
  }, [dados, economiaSetores.saldo, quantidadeLojasG, atualizarDados, atualizarEco, buttonAlertAudio, buttonConstructAudio]);

  // ─── Hotkeys ─────────────────────────────────────────────────────────────────
  const hotkeyGuard = dados.dia <= 1 || dados.modal.estadoModal || dados.modalAlert.estadoModal || dados.modalDespesas.estadoModal || dados.modalEconomiaGlobal.estadoModal;

  useHotkeys("q", () => { if (hotkeyGuard || isNKeyDown) return; setIsNKeyDown(true); ComprarTerreno(); }, { keydown: true, keyup: false, enableOnTags: ["INPUT", "TEXTAREA", "SELECT"] });
  useHotkeys("q", () => { setIsNKeyDown(false); }, { keydown: false, keyup: true, enableOnTags: ["INPUT", "TEXTAREA", "SELECT"] });

  useHotkeys("w", () => { if (hotkeyGuard || isNKeyDown) return; setIsNKeyDown(true); ComprarLojaP(); }, { keydown: true, keyup: false, enableOnTags: ["INPUT", "TEXTAREA", "SELECT"] });
  useHotkeys("w", () => { setIsNKeyDown(false); }, { keydown: false, keyup: true, enableOnTags: ["INPUT", "TEXTAREA", "SELECT"] });

  useHotkeys("e", () => { if (hotkeyGuard || isNKeyDown) return; setIsNKeyDown(true); ComprarLojaM(); }, { keydown: true, keyup: false, enableOnTags: ["INPUT", "TEXTAREA", "SELECT"] });
  useHotkeys("e", () => { setIsNKeyDown(false); }, { keydown: false, keyup: true, enableOnTags: ["INPUT", "TEXTAREA", "SELECT"] });

  useHotkeys("r", () => { if (hotkeyGuard || isNKeyDown) return; setIsNKeyDown(true); ComprarLojaG(); }, { keydown: true, keyup: false, enableOnTags: ["INPUT", "TEXTAREA", "SELECT"] });
  useHotkeys("r", () => { setIsNKeyDown(false); }, { keydown: false, keyup: true, enableOnTags: ["INPUT", "TEXTAREA", "SELECT"] });

  // ─── Roteamento pós dia 269 ───────────────────────────────────────────────────
  if (dados.dia > 269) {
    if (dados.setorAtivo === 'carteira') return <SidebarCard />;
    if (dados.setorAtivo === 'mercado' || dados.setorAtivo === 'estoque' || dados.setorAtivo === 'gerenciamento' || dados.setorAtivo === 'ecossistema') return <SideInformations />;
    if (setorAtual === "mercado") return <SidebarStorage />;

    return (
      <div className="flex justify-between h-full pt-10 pb-10 flex-col w-full">
        <div className="flex justify-around flex-col w-full">

          {/* ===================== TERRENOS ===================== */}
          <Paper elevation={6} sx={{ display: "flex", flexDirection: "column", p: 2, bgcolor: "#290064", borderRadius: "20px", mb: 2, maxWidth: 400, maxHeight: 350, position: "relative", width: { xs: "90vw", sm: "60vw", md: "30vw", lg: "20vw" } }}>
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
              <Box sx={{ flexGrow: 1, mr: 2, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Box className="flex justify-between">
                  <GradientBox className="w-[70%]">
                    <Typography variant="subtitle1" color="white" fontWeight="bold" className="pl-[5px]">Terreno</Typography>
                  </GradientBox>
                  <Box className="w-[25%] bg-[#6411D9]" data-tooltip-id="tooltip-terreno-posse" data-tooltip-html="Quantidade total que você já possui desse imóvel" sx={{ bgcolor: "#6411D9", borderRadius: "10px", border: "2px solid #F27405", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography variant="subtitle1" color="white" fontWeight="bold" className="text-center">{dados.terrenos.quantidade}</Typography>
                  </Box>
                </Box>
                <Box className="flex justify-between" sx={{ mt: 0.5 }}>
                  <Box className="w-[50%]" data-tooltip-id="tooltip-terreno-preco" data-tooltip-html="Custo total para comprar um terreno" mt={0.5} sx={{ bgcolor: "#6411D9", borderRadius: "2px", display: "flex", justifyContent: "space-between", alignItems: "center", px: 1, py: 0.25 }}>
                    <img className="w-4" src={DolarImg} alt="" />
                    <Typography variant="subtitle1" color="white" fontWeight="bold">{formatarNumero(dados.terrenos.preçoConstrução)}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={0.5}>
                    <Box data-tooltip-id="tooltip-terreno-diminuir" data-tooltip-html="Diminuir quantidade">
                      <IconButton onClick={DiminuirQuantidadeTerrenos} sx={{ bgcolor: "#6411D9", width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: "4px", sm: "5px" }, "&:hover": { bgcolor: "#834EDB" } }}>
                        <img src={menos} width={12} height={12} />
                      </IconButton>
                    </Box>
                    <Box data-tooltip-id="tooltip-terreno-quantidade" data-tooltip-html="Quantidade selecionada" sx={{ mx: 1, bgcolor: "#350973", width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: "4px", sm: "5px" }, display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <Typography color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 14 }}>{quantidadeTerrenos}</Typography>
                    </Box>
                    <Box data-tooltip-id="tooltip-terreno-aumentar" data-tooltip-html="Aumentar quantidade">
                      <IconButton onClick={AumentarQuantidadeTerrenos} sx={{ bgcolor: "#6411D9", width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: "4px", sm: "5px" }, "&:hover": { bgcolor: "#834EDB" } }}>
                        <img src={mais} width={12} height={12} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                <Box data-tooltip-id="tooltip-terreno-comprar" data-tooltip-html={`<div><p>Comprar terreno (Q)</p><p style="margin-top:4px;">Dependendo do imóvel que você for construir, você <br/> vai precisar de um número mínimo de terrenos.</p><p style="margin-top:4px;"><b>Imóvel pequeno</b> - 1 terreno.<br/><b>Imóvel médio</b> - 2 terrenos.<br/><b>Imóvel grande</b> - 3 terrenos.</p></div>`}>
                  <Box style={getBotaoCompraStyle({ podeComprar: podeComprarTerreno })} sx={{ flexGrow: 1, aspectRatio: "1", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <IconButton onClick={ComprarTerreno} sx={{ width: { xs: 60, sm: 80 }, height: { xs: 60, sm: 80 }, borderRadius: "10px", "&:hover": { transform: "scale(1.05)" }, "&:active": { transform: "scale(0.95)" } }}>
                      <img src={terrenoImg} alt="terreno" style={{ width: "60%", height: "60%" }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
            <TooltipPadrao id="tooltip-terreno-tipo" />
            <TooltipPadrao id="tooltip-terreno-preco" />
            <TooltipPadrao id="tooltip-terreno-total" />
            <TooltipPadrao id="tooltip-terreno-comprar" />
            <TooltipPadrao id="tooltip-terreno-diminuir" />
            <TooltipPadrao id="tooltip-terreno-quantidade" />
            <TooltipPadrao id="tooltip-terreno-aumentar" />
            <TooltipPadrao id="tooltip-terreno-posse" />
          </Paper>

          {/* ===================== LOJAS PEQUENAS ===================== */}
          <Paper elevation={6} sx={{ display: "flex", flexDirection: "column", p: 2, bgcolor: "#290064", borderRadius: "20px", mb: 2, maxWidth: 400, position: "relative", width: { xs: "90vw", sm: "60vw", md: "30vw", lg: "20vw" } }}>
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
              <Box sx={{ flexGrow: 1, mr: 2, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Box className="flex justify-between">
                  <GradientBox className="w-[70%]">
                    <Typography variant="subtitle1" color="white" fontWeight="bold" className="pl-[5px]">Imóvel Pequeno</Typography>
                  </GradientBox>
                  <Box className="w-[25%] bg-[#6411D9]" data-tooltip-id="tooltip-lojap-posse" data-tooltip-html="Quantidade total que você já possui desse imóvel" sx={{ bgcolor: "#6411D9", borderRadius: "10px", border: "2px solid #F27405", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography variant="subtitle1" color="white" fontWeight="bold" className="text-center">{dados.lojasP.quantidade}</Typography>
                  </Box>
                </Box>
                <Box className="flex justify-between" sx={{ mt: 0.5 }}>
                  <Box className="w-[50%]" data-tooltip-id="tooltip-lojap-preco" data-tooltip-html="Custo total para construir um imóvel pequeno no terreno" mt={0.5} sx={{ bgcolor: "#6411D9", borderRadius: "2px", display: "flex", justifyContent: "space-between", alignItems: "center", px: 1, py: 0.25 }}>
                    <img className="w-4" src={martelo} alt="" />
                    <Typography variant="subtitle1" color="white" fontWeight="bold">{formatarNumero(dados.lojasP.preçoConstrução * quantidadeLojasP)}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={0.5}>
                    <Box data-tooltip-id="tooltip-lojap-diminuir" data-tooltip-html="Diminuir quantidade">
                      <IconButton onClick={DiminuirQuantidadeLojasP} sx={{ bgcolor: "#6411D9", width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: "4px", sm: "5px" }, "&:hover": { bgcolor: "#834EDB" } }}>
                        <img src={menos} width={12} height={12} />
                      </IconButton>
                    </Box>
                    <Box data-tooltip-id="tooltip-lojap-quantidade" data-tooltip-html="Quantidade selecionada" sx={{ mx: 1, bgcolor: "#350973", width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: "4px", sm: "5px" }, display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <Typography color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 14 }}>{quantidadeLojasP}</Typography>
                    </Box>
                    <Box data-tooltip-id="tooltip-lojap-aumentar" data-tooltip-html="Aumentar quantidade">
                      <IconButton onClick={AumentarQuantidadeLojasP} sx={{ bgcolor: "#6411D9", width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: "4px", sm: "5px" }, "&:hover": { bgcolor: "#834EDB" } }}>
                        <img src={mais} width={12} height={12} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                <Box data-tooltip-id="tooltip-lojap-comprar" data-tooltip-html={`<div><p>Comprar imóvel pequeno (W)</p><p style="margin-top:4px;">Precisa de 1 terreno.</p></div>`}>
                  <Box style={getBotaoCompraStyle({ podeComprar: podeComprarLojaP })} sx={{ flexGrow: 1, aspectRatio: "1", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <IconButton onClick={ComprarLojaP} sx={{ width: { xs: 60, sm: 80 }, height: { xs: 60, sm: 80 }, borderRadius: "10px", "&:hover": { transform: "scale(1.05)" }, "&:active": { transform: "scale(0.95)" } }}>
                      <img src={LojaPImg} alt="loja pequena" style={{ width: "60%", height: "60%" }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
            <TooltipPadrao id="tooltip-lojap-tipo" />
            <TooltipPadrao id="tooltip-lojap-preco" />
            <TooltipPadrao id="tooltip-lojap-total" />
            <TooltipPadrao id="tooltip-lojap-comprar" />
            <TooltipPadrao id="tooltip-lojap-diminuir" />
            <TooltipPadrao id="tooltip-lojap-quantidade" />
            <TooltipPadrao id="tooltip-lojap-aumentar" />
            <TooltipPadrao id="tooltip-lojap-posse" />
          </Paper>

          {/* ===================== LOJAS MÉDIAS ===================== */}
          <Paper elevation={6} sx={{ display: "flex", flexDirection: "column", p: 2, bgcolor: "#290064", borderRadius: "20px", mb: 2, maxWidth: 400, position: "relative", width: { xs: "90vw", sm: "60vw", md: "30vw", lg: "20vw" } }}>
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
              <Box sx={{ flexGrow: 1, mr: 2, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Box className="flex justify-between">
                  <GradientBox className="w-[70%]">
                    <Typography variant="subtitle1" color="white" fontWeight="bold" className="pl-[5px]">Imóvel Médio</Typography>
                  </GradientBox>
                  <Box className="w-[25%] bg-[#6411D9]" data-tooltip-id="tooltip-lojam-posse" data-tooltip-html="Quantidade total que você já possui desse imóvel" sx={{ bgcolor: "#6411D9", borderRadius: "10px", border: "2px solid #F27405", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography variant="subtitle1" color="white" fontWeight="bold" className="text-center">{dados.lojasM.quantidade}</Typography>
                  </Box>
                </Box>
                <Box className="flex justify-between" sx={{ mt: 0.5 }} data-tooltip-id="tooltip-lojam-preco" data-tooltip-html="Custo total para construção de imóvel médio">
                  <Box className="w-[50%]" mt={0.5} sx={{ bgcolor: "#6411D9", borderRadius: "2px", display: "flex", justifyContent: "space-between", alignItems: "center", px: 1, py: 0.25 }}>
                    <img className="w-4" src={martelo} alt="" />
                    <Typography variant="subtitle1" color="white" fontWeight="bold">{formatarNumero(dados.lojasM.preçoConstrução * quantidadeLojasM)}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={0.5}>
                    <Box data-tooltip-id="tooltip-lojam-diminuir" data-tooltip-html="Diminuir quantidade">
                      <IconButton onClick={DiminuirQuantidadeLojasM} sx={{ bgcolor: "#6411D9", width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: "4px", sm: "5px" }, "&:hover": { bgcolor: "#834EDB" } }}>
                        <img src={menos} width={12} height={12} />
                      </IconButton>
                    </Box>
                    <Box data-tooltip-id="tooltip-lojam-quantidade" data-tooltip-html="Quantidade selecionada" sx={{ mx: 1, bgcolor: "#350973", width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: "4px", sm: "5px" }, display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <Typography color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 14 }}>{quantidadeLojasM}</Typography>
                    </Box>
                    <Box data-tooltip-id="tooltip-lojam-aumentar" data-tooltip-html="Aumentar quantidade">
                      <IconButton onClick={AumentarQuantidadeLojasM} sx={{ bgcolor: "#6411D9", width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: "4px", sm: "5px" }, "&:hover": { bgcolor: "#834EDB" } }}>
                        <img src={mais} width={12} height={12} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                <Box data-tooltip-id="tooltip-lojam-comprar" data-tooltip-html={`<div><p>Comprar imóvel médio (E)</p><p style="margin-top:4px;">Precisa de 2 terrenos para construir.</p></div>`}>
                  <Box style={getBotaoCompraStyle({ podeComprar: podeComprarLojaM })} sx={{ flexGrow: 1, aspectRatio: "1", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <IconButton onClick={ComprarLojaM} sx={{ width: { xs: 60, sm: 80 }, height: { xs: 60, sm: 80 }, borderRadius: "10px", "&:hover": { transform: "scale(1.05)" }, "&:active": { transform: "scale(0.95)" } }}>
                      <img src={LojaMImg} alt="loja média" style={{ width: "60%", height: "60%" }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
            <TooltipPadrao id="tooltip-lojam-tipo" />
            <TooltipPadrao id="tooltip-lojam-preco" />
            <TooltipPadrao id="tooltip-lojam-total" />
            <TooltipPadrao id="tooltip-lojam-comprar" />
            <TooltipPadrao id="tooltip-lojam-diminuir" />
            <TooltipPadrao id="tooltip-lojam-quantidade" />
            <TooltipPadrao id="tooltip-lojam-aumentar" />
            <TooltipPadrao id="tooltip-lojam-posse" />
          </Paper>

          {/* ===================== LOJAS GRANDES ===================== */}
          <Paper elevation={6} sx={{ display: "flex", flexDirection: "column", p: 2, bgcolor: "#290064", borderRadius: "20px", mb: 2, maxWidth: 400, position: "relative", width: { xs: "90vw", sm: "60vw", md: "30vw", lg: "20vw" } }}>
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
              <Box sx={{ flexGrow: 1, mr: 2, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Box className="flex justify-between">
                  <GradientBox className="w-[70%]">
                    <Typography variant="subtitle1" color="white" fontWeight="bold" className="pl-[5px]">Imóvel Grande</Typography>
                  </GradientBox>
                  <Box className="w-[25%] bg-[#6411D9]" data-tooltip-id="tooltip-lojag-posse" data-tooltip-html="Quantidade total que você já possui desse imóvel" sx={{ bgcolor: "#6411D9", borderRadius: "10px", border: "2px solid #F27405", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography variant="subtitle1" color="white" fontWeight="bold" className="text-center">{dados.lojasG.quantidade}</Typography>
                  </Box>
                </Box>
                <Box className="flex justify-between" sx={{ mt: 0.5 }} data-tooltip-id="tooltip-lojag-preco" data-tooltip-html="Custo total para construção de imóvel grande">
                  <Box className="w-[50%]" mt={0.5} sx={{ bgcolor: "#6411D9", borderRadius: "2px", display: "flex", justifyContent: "space-between", alignItems: "center", px: 1, py: 0.25 }}>
                    <img className="w-4" src={martelo} alt="" />
                    <Typography variant="subtitle1" color="white" fontWeight="bold">{formatarNumero(dados.lojasG.preçoConstrução * quantidadeLojasG)}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={0.5}>
                    <Box data-tooltip-id="tooltip-lojag-diminuir" data-tooltip-html="Diminuir quantidade">
                      <IconButton onClick={DiminuirQuantidadeLojasG} sx={{ bgcolor: "#6411D9", width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: "4px", sm: "5px" }, "&:hover": { bgcolor: "#834EDB" } }}>
                        <img src={menos} width={12} height={12} />
                      </IconButton>
                    </Box>
                    <Box data-tooltip-id="tooltip-lojag-quantidade" data-tooltip-html="Quantidade selecionada" sx={{ mx: 1, bgcolor: "#6411D9", width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: "4px", sm: "5px" }, display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <Typography color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 14 }}>{quantidadeLojasG}</Typography>
                    </Box>
                    <Box data-tooltip-id="tooltip-lojag-aumentar" data-tooltip-html="Aumentar quantidade">
                      <IconButton onClick={AumentarQuantidadeLojasG} sx={{ bgcolor: "#6411D9", width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: "4px", sm: "5px" }, "&:hover": { bgcolor: "#834EDB" } }}>
                        <img src={mais} width={12} height={12} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                <Box data-tooltip-id="tooltip-lojag-comprar" data-tooltip-html={`<div><p>Comprar imóvel grande (R)</p><p style="margin-top:4px;">Precisa de 3 terrenos para construir.</p></div>`}>
                  <Box style={getBotaoCompraStyle({ podeComprar: podeComprarLojaG })} sx={{ flexGrow: 1, aspectRatio: "1", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <IconButton onClick={ComprarLojaG} sx={{ width: { xs: 60, sm: 80 }, height: { xs: 60, sm: 80 }, borderRadius: "10px", "&:hover": { transform: "scale(1.05)" }, "&:active": { transform: "scale(0.95)" } }}>
                      <img src={LojaGImg} alt="loja grande" style={{ width: "60%", height: "60%" }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
            <TooltipPadrao id="tooltip-lojag-tipo" />
            <TooltipPadrao id="tooltip-lojag-preco" />
            <TooltipPadrao id="tooltip-lojag-total" />
            <TooltipPadrao id="tooltip-lojag-comprar" />
            <TooltipPadrao id="tooltip-lojag-diminuir" />
            <TooltipPadrao id="tooltip-lojag-quantidade" />
            <TooltipPadrao id="tooltip-lojag-aumentar" />
            <TooltipPadrao id="tooltip-lojag-posse" />
          </Paper>
        </div>
        <LoanCarousel />
      </div>
    );
  }

  // ─── Render pré-dia 270 ───────────────────────────────────────────────────────
  return (
    <div className="flex justify-around flex-col w-full">

      {/* ===================== TERRENOS ===================== */}
      <Paper elevation={6} sx={{ display: "flex", flexDirection: "column", p: 2, bgcolor: "#290064", borderRadius: "20px", mb: 2, minHeight: "20vh", maxWidth: 400, position: "relative", width: { xs: "90vw", sm: "60vw", md: "30vw", lg: "20vw" } }}>
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
          <Box sx={{ flexGrow: 1, mr: 2, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <GradientBox>
              <Typography variant="subtitle1" color="white" fontWeight="bold">Terreno</Typography>
            </GradientBox>
            <Box sx={{ mt: 0.5, ml: 2.5 }} data-tooltip-id="tooltip-terreno-preco" data-tooltip-html="Preço unitário para comprar um terreno">
              <Box sx={{ bgcolor: "#6411D9", borderRadius: "2px", display: "flex", justifyContent: "space-between", alignItems: "center", px: 1, py: 0.25 }}>
                <Typography variant="subtitle1" color="white" fontWeight="bold">Valor</Typography>
                <Typography variant="subtitle1" color="white" fontWeight="bold">{formatarNumero(dados.terrenos.preçoConstrução)}</Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 0.5, ml: 2.5 }} data-tooltip-id="tooltip-terreno-total" data-tooltip-html="Custo total considerando a quantidade escolhida">
              <Box sx={{ bgcolor: "#350973", borderRadius: "5px", height: { xs: 24, sm: 28 }, display: "flex", justifyContent: "space-between", alignItems: "center", px: 1 }}>
                <Typography variant="body2" color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 14 }}>Valor total</Typography>
                <Typography variant="body2" color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 14 }}>{formatarNumero(dados.terrenos.preçoConstrução * quantidadeTerrenos)}</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
            <Box data-tooltip-id="tooltip-terreno-comprar" data-tooltip-html={`<div class="z-[100]"><p>Comprar terreno (Q)</p><p style="margin-top:4px;">Dependendo do imóvel que você for</br> construir, você vai precisar de </br> um número mínimo de terrenos:</p><p style="margin-top:4px;"><b>Imóvel pequeno</b> - 1 terreno<br/><b>Imóvel médio</b> - 2 terrenos<br/><b>Imóvel grande</b> - 3 terrenos</p></div>`}>
              <Box style={getBotaoCompraStyle({ podeComprar: podeComprarTerreno })} sx={{ flexGrow: 1, aspectRatio: "1", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <IconButton onClick={ComprarTerreno} sx={{ width: { xs: 60, sm: 80 }, height: { xs: 60, sm: 80 }, borderRadius: "10px", "&:hover": { transform: "scale(1.05)" }, "&:active": { transform: "scale(0.95)" } }}>
                  <img src={terrenoImg} alt="terreno" style={{ width: "60%", height: "60%" }} />
                </IconButton>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mt={0.5}>
              <Box data-tooltip-id="tooltip-terreno-diminuir" data-tooltip-html="Diminuir quantidade">
                <IconButton onClick={DiminuirQuantidadeTerrenos} sx={{ bgcolor: "#6411D9", width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: "4px", sm: "5px" }, "&:hover": { bgcolor: "#834EDB" } }}>
                  <img src={menos} width={12} height={12} />
                </IconButton>
              </Box>
              <Box data-tooltip-id="tooltip-terreno-quantidade" data-tooltip-html="Quantidade selecionada" sx={{ mx: 1, bgcolor: "#350973", width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: "4px", sm: "5px" }, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 14 }}>{quantidadeTerrenos}</Typography>
              </Box>
              <Box data-tooltip-id="tooltip-terreno-aumentar" data-tooltip-html="Aumentar quantidade">
                <IconButton onClick={AumentarQuantidadeTerrenos} sx={{ bgcolor: "#6411D9", width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: "4px", sm: "5px" }, "&:hover": { bgcolor: "#834EDB" } }}>
                  <img src={mais} width={12} height={12} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
        <GradientBox sx={{ borderRadius: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, mt: 1, minHeight: 40 }}>
          <Box data-tooltip-id="tooltip-terreno-faturamento" data-tooltip-html="Valor faturado no dia anterior" display="flex" alignItems="center">
            <img src={DolarImg} width={16} height={16} />
            <Typography variant="body1" color="white" fontWeight="bold" ml={1}>{dados.terrenos.faturamentoTotal.toLocaleString("pt-BR")}</Typography>
          </Box>
          <Box data-tooltip-id="tooltip-terreno-rentabilidade" data-tooltip-html="Rentabilidade atual dos terrenos" display="flex" alignItems="center">
            <Typography variant="body1" color="white" fontWeight="bold" mr={1}>{resultadoTerrenos.toFixed(2)}</Typography>
            <img src={porcem} width={14} height={14} />
          </Box>
        </GradientBox>
        <Box data-tooltip-id="tooltip-terreno-posse" data-tooltip-html="Quantidade total que você já possui desse imóvel" sx={{ bgcolor: "#6411D9", width: { xs: 40, sm: 48 }, height: { xs: 40, sm: 48 }, borderRadius: "10px", border: "2px solid #F27405", position: "absolute", left: { xs: -20, sm: -24 }, top: "50%", transform: "translateY(-50%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Typography color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 16 }}>{dados.terrenos.quantidade}</Typography>
        </Box>
        <TooltipPadrao id="tooltip-terreno-tipo" /><TooltipPadrao id="tooltip-terreno-preco" /><TooltipPadrao id="tooltip-terreno-total" />
        <TooltipPadrao id="tooltip-terreno-comprar" /><TooltipPadrao id="tooltip-terreno-diminuir" /><TooltipPadrao id="tooltip-terreno-quantidade" />
        <TooltipPadrao id="tooltip-terreno-aumentar" /><TooltipPadrao id="tooltip-terreno-faturamento" /><TooltipPadrao id="tooltip-terreno-rentabilidade" />
        <TooltipPadrao id="tooltip-terreno-posse" />
      </Paper>

      {/* ===================== LOJAS PEQUENAS ===================== */}
      <Paper elevation={6} sx={{ display: "flex", flexDirection: "column", p: 2, bgcolor: "#290064", borderRadius: "20px", mb: 2, minHeight: "20vh", maxWidth: 400, position: "relative", width: { xs: "90vw", sm: "60vw", md: "30vw", lg: "20vw" } }}>
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
          <Box sx={{ flexGrow: 1, mr: 2, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <GradientBox><Typography variant="subtitle1" color="white" fontWeight="bold">Imóvel Pequeno</Typography></GradientBox>
            <Box sx={{ mt: 0.5, ml: 2.5 }} data-tooltip-id="tooltip-lojap-preco" data-tooltip-html="Preço unitário para construir um imóvel pequeno no terreno">
              <Box sx={{ bgcolor: "#6411D9", borderRadius: "2px", display: "flex", justifyContent: "space-between", alignItems: "center", px: 1, py: 0.25 }}>
                <Typography variant="subtitle1" color="white" fontWeight="bold">Construção</Typography>
                <Typography variant="subtitle1" color="white" fontWeight="bold">{formatarNumero(dados.lojasP.preçoConstrução)}</Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 0.5, ml: 2.5 }} data-tooltip-id="tooltip-lojap-total" data-tooltip-html="Custo total considerando a quantidade escolhida">
              <Box sx={{ bgcolor: "#350973", borderRadius: "5px", height: { xs: 24, sm: 28 }, display: "flex", justifyContent: "space-between", alignItems: "center", px: 1 }}>
                <Typography variant="body2" color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 14 }}>Valor total</Typography>
                <Typography variant="body2" color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 14 }}>{formatarNumero(dados.lojasP.preçoConstrução * quantidadeLojasP)}</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
            <Box data-tooltip-id="tooltip-lojap-comprar" data-tooltip-html="<div><p>Comprar imóvel pequeno (W)</p><p style='margin-top:4px;'>Precisa de um terreno para poder construir em cima dele</p></div>">
              <Box style={getBotaoCompraStyle({ podeComprar: podeComprarLojaP })} sx={{ flexGrow: 1, aspectRatio: "1", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <IconButton onClick={ComprarLojaP} sx={{ width: { xs: 60, sm: 80 }, height: { xs: 60, sm: 80 }, borderRadius: "10px", "&:hover": { transform: "scale(1.05)" }, "&:active": { transform: "scale(0.95)" } }}>
                  <img src={LojaPImg} alt="loja pequena" style={{ width: "60%", height: "60%" }} />
                </IconButton>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mt={0.5}>
              <Box data-tooltip-id="tooltip-lojap-diminuir" data-tooltip-html="Diminuir quantidade">
                <IconButton onClick={DiminuirQuantidadeLojasP} sx={{ bgcolor: "#6411D9", width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: "4px", sm: "5px" }, "&:hover": { bgcolor: "#834EDB" } }}>
                  <img src={menos} width={12} height={12} />
                </IconButton>
              </Box>
              <Box data-tooltip-id="tooltip-lojap-quantidade" data-tooltip-html="Quantidade selecionada" sx={{ mx: 1, bgcolor: "#350973", width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: "4px", sm: "5px" }, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 14 }}>{quantidadeLojasP}</Typography>
              </Box>
              <Box data-tooltip-id="tooltip-lojap-aumentar" data-tooltip-html="Aumentar quantidade">
                <IconButton onClick={AumentarQuantidadeLojasP} sx={{ bgcolor: "#6411D9", width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: "4px", sm: "5px" }, "&:hover": { bgcolor: "#834EDB" } }}>
                  <img src={mais} width={12} height={12} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
        <GradientBox sx={{ borderRadius: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, mt: 1, minHeight: 40 }}>
          <Box data-tooltip-id="tooltip-lojap-faturamento" data-tooltip-html="Valor faturado no dia anterior" display="flex" alignItems="center">
            <img src={DolarImg} width={16} height={16} />
            <Typography variant="body1" color="white" fontWeight="bold" ml={1}>{dados.lojasP.faturamentoTotal.toLocaleString("pt-BR")}</Typography>
          </Box>
          <Box data-tooltip-id="tooltip-lojap-rentabilidade" data-tooltip-html="Rentabilidade atual do imóvel pequeno" display="flex" alignItems="center">
            <Typography variant="body1" color="white" fontWeight="bold" mr={1}>{resultadoLojasP.toFixed(2)}</Typography>
            <img src={porcem} width={14} height={14} />
          </Box>
        </GradientBox>
        <Box data-tooltip-id="tooltip-lojap-posse" data-tooltip-html="Quantidade total que você já possui desse imóvel" sx={{ bgcolor: "#6411D9", width: { xs: 40, sm: 48 }, height: { xs: 40, sm: 48 }, borderRadius: "10px", border: "2px solid #F27405", position: "absolute", left: { xs: -20, sm: -24 }, top: "50%", transform: "translateY(-50%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Typography color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 16 }}>{dados.lojasP.quantidade}</Typography>
        </Box>
        <TooltipPadrao id="tooltip-lojap-tipo" /><TooltipPadrao id="tooltip-lojap-preco" /><TooltipPadrao id="tooltip-lojap-total" />
        <TooltipPadrao id="tooltip-lojap-comprar" /><TooltipPadrao id="tooltip-lojap-diminuir" /><TooltipPadrao id="tooltip-lojap-quantidade" />
        <TooltipPadrao id="tooltip-lojap-aumentar" /><TooltipPadrao id="tooltip-lojap-faturamento" /><TooltipPadrao id="tooltip-lojap-rentabilidade" />
        <TooltipPadrao id="tooltip-lojap-posse" />
      </Paper>

      {/* ===================== LOJAS MÉDIAS ===================== */}
      <Paper elevation={6} sx={{ display: "flex", flexDirection: "column", p: 2, bgcolor: "#290064", borderRadius: "20px", mb: 2, minHeight: "20vh", maxWidth: 400, position: "relative", width: { xs: "90vw", sm: "60vw", md: "30vw", lg: "20vw" } }}>
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
          <Box sx={{ flexGrow: 1, mr: 2, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <GradientBox><Typography variant="subtitle1" color="white" fontWeight="bold">Imóvel Médio</Typography></GradientBox>
            <Box sx={{ mt: 0.5, ml: 2.5 }} data-tooltip-id="tooltip-lojam-preco" data-tooltip-html="Preço unitário para construir um imóvel médio no terreno">
              <Box sx={{ bgcolor: "#6411D9", borderRadius: "2px", display: "flex", justifyContent: "space-between", alignItems: "center", px: 1, py: 0.25 }}>
                <Typography variant="subtitle1" color="white" fontWeight="bold">Construção</Typography>
                <Typography variant="subtitle1" color="white" fontWeight="bold">{formatarNumero(dados.lojasM.preçoConstrução)}</Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 0.5, ml: 2.5 }} data-tooltip-id="tooltip-lojam-total" data-tooltip-html="Custo total considerando a quantidade escolhida">
              <Box sx={{ bgcolor: "#350973", borderRadius: "5px", height: { xs: 24, sm: 28 }, display: "flex", justifyContent: "space-between", alignItems: "center", px: 1 }}>
                <Typography variant="body2" color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 14 }}>Valor total</Typography>
                <Typography variant="body2" color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 14 }}>{formatarNumero(dados.lojasM.preçoConstrução * quantidadeLojasM)}</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
            <Box data-tooltip-id="tooltip-lojam-comprar" data-tooltip-html="<div><p>Comprar imóvel médio (E)</p><p style='margin-top:4px;'>Precisa de dois terrenos ou mais para construir</p></div>">
              <Box style={getBotaoCompraStyle({ podeComprar: podeComprarLojaM })} sx={{ flexGrow: 1, aspectRatio: "1", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <IconButton onClick={ComprarLojaM} sx={{ width: { xs: 60, sm: 80 }, height: { xs: 60, sm: 80 }, borderRadius: "10px", "&:hover": { transform: "scale(1.05)" }, "&:active": { transform: "scale(0.95)" } }}>
                  <img src={LojaMImg} alt="loja média" style={{ width: "60%", height: "60%" }} />
                </IconButton>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mt={0.5}>
              <Box data-tooltip-id="tooltip-lojam-diminuir" data-tooltip-html="Diminuir quantidade">
                <IconButton onClick={DiminuirQuantidadeLojasM} sx={{ bgcolor: "#6411D9", width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: "4px", sm: "5px" }, "&:hover": { bgcolor: "#834EDB" } }}>
                  <img src={menos} width={12} height={12} />
                </IconButton>
              </Box>
              <Box data-tooltip-id="tooltip-lojam-quantidade" data-tooltip-html="Quantidade selecionada" sx={{ mx: 1, bgcolor: "#350973", width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: "4px", sm: "5px" }, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 14 }}>{quantidadeLojasM}</Typography>
              </Box>
              <Box data-tooltip-id="tooltip-lojam-aumentar" data-tooltip-html="Aumentar quantidade">
                <IconButton onClick={AumentarQuantidadeLojasM} sx={{ bgcolor: "#6411D9", width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: "4px", sm: "5px" }, "&:hover": { bgcolor: "#834EDB" } }}>
                  <img src={mais} width={12} height={12} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
        <GradientBox sx={{ borderRadius: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, mt: 1, minHeight: 40 }}>
          <Box data-tooltip-id="tooltip-lojam-faturamento" data-tooltip-html="Valor faturado no dia anterior" display="flex" alignItems="center">
            <img src={DolarImg} width={16} height={16} />
            <Typography variant="body1" color="white" fontWeight="bold" ml={1}>{dados.lojasM.faturamentoTotal.toLocaleString("pt-BR")}</Typography>
          </Box>
          <Box data-tooltip-id="tooltip-lojam-rentabilidade" data-tooltip-html="Rentabilidade atual do imóvel médio" display="flex" alignItems="center">
            <Typography variant="body1" color="white" fontWeight="bold" mr={1}>{resultadoLojasM.toFixed(2)}</Typography>
            <img src={porcem} width={14} height={14} />
          </Box>
        </GradientBox>
        <Box data-tooltip-id="tooltip-lojam-posse" data-tooltip-html="Quantidade total que você já possui desse imóvel" sx={{ bgcolor: "#6411D9", width: { xs: 40, sm: 48 }, height: { xs: 40, sm: 48 }, borderRadius: "10px", border: "2px solid #F27405", position: "absolute", left: { xs: -20, sm: -24 }, top: "50%", transform: "translateY(-50%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Typography color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 16 }}>{dados.lojasM.quantidade}</Typography>
        </Box>
        <TooltipPadrao id="tooltip-lojam-tipo" /><TooltipPadrao id="tooltip-lojam-preco" /><TooltipPadrao id="tooltip-lojam-total" />
        <TooltipPadrao id="tooltip-lojam-comprar" /><TooltipPadrao id="tooltip-lojam-diminuir" /><TooltipPadrao id="tooltip-lojam-quantidade" />
        <TooltipPadrao id="tooltip-lojam-aumentar" /><TooltipPadrao id="tooltip-lojam-faturamento" /><TooltipPadrao id="tooltip-lojam-rentabilidade" />
        <TooltipPadrao id="tooltip-lojam-posse" />
      </Paper>

      {/* ===================== LOJAS GRANDES ===================== */}
      <Paper elevation={6} sx={{ display: "flex", flexDirection: "column", p: 2, bgcolor: "#290064", borderRadius: "20px", mb: 2, minHeight: "20vh", maxWidth: 400, position: "relative", width: { xs: "90vw", sm: "60vw", md: "30vw", lg: "20vw" } }}>
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
          <Box sx={{ flexGrow: 1, mr: 2, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <GradientBox><Typography variant="subtitle1" color="white" fontWeight="bold">Imóvel Grande</Typography></GradientBox>
            <Box sx={{ mt: 0.5, ml: 2.5 }} data-tooltip-id="tooltip-lojag-preco" data-tooltip-html="Preço unitário para construir um imóvel grande no terreno">
              <Box sx={{ bgcolor: "#6411D9", borderRadius: "2px", display: "flex", justifyContent: "space-between", alignItems: "center", px: 1, py: 0.25 }}>
                <Typography variant="subtitle1" color="white" fontWeight="bold">Construção</Typography>
                <Typography variant="subtitle1" color="white" fontWeight="bold">{formatarNumero(dados.lojasG.preçoConstrução)}</Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 0.5, ml: 2.5 }} data-tooltip-id="tooltip-lojag-total" data-tooltip-html="Custo total considerando a quantidade escolhida">
              <Box sx={{ bgcolor: "#350973", borderRadius: "5px", height: { xs: 24, sm: 28 }, display: "flex", justifyContent: "space-between", alignItems: "center", px: 1 }}>
                <Typography variant="body2" color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 14 }}>Valor total</Typography>
                <Typography variant="body2" color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 14 }}>{formatarNumero(dados.lojasG.preçoConstrução * quantidadeLojasG)}</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
            <Box data-tooltip-id="tooltip-lojag-comprar" data-tooltip-html="<div><p>Comprar imóvel grande (R)</p><p style='margin-top:4px;'>Precisa de três terrenos ou mais para construir</p></div>">
              <Box style={getBotaoCompraStyle({ podeComprar: podeComprarLojaG })} sx={{ flexGrow: 1, aspectRatio: "1", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <IconButton onClick={ComprarLojaG} sx={{ width: { xs: 60, sm: 80 }, height: { xs: 60, sm: 80 }, borderRadius: "10px", "&:hover": { transform: "scale(1.05)" }, "&:active": { transform: "scale(0.95)" } }}>
                  <img src={LojaGImg} alt="loja grande" style={{ width: "60%", height: "60%" }} />
                </IconButton>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mt={0.5}>
              <Box data-tooltip-id="tooltip-lojag-diminuir" data-tooltip-html="Diminuir quantidade">
                <IconButton onClick={DiminuirQuantidadeLojasG} sx={{ bgcolor: "#6411D9", width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: "4px", sm: "5px" }, "&:hover": { bgcolor: "#834EDB" } }}>
                  <img src={menos} width={12} height={12} />
                </IconButton>
              </Box>
              <Box data-tooltip-id="tooltip-lojag-quantidade" data-tooltip-html="Quantidade selecionada" sx={{ mx: 1, bgcolor: "#350973", width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: "4px", sm: "5px" }, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 14 }}>{quantidadeLojasG}</Typography>
              </Box>
              <Box data-tooltip-id="tooltip-lojag-aumentar" data-tooltip-html="Aumentar quantidade">
                <IconButton onClick={AumentarQuantidadeLojasG} sx={{ bgcolor: "#6411D9", width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: "4px", sm: "5px" }, "&:hover": { bgcolor: "#834EDB" } }}>
                  <img src={mais} width={12} height={12} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
        <GradientBox sx={{ borderRadius: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, mt: 1, minHeight: 40 }}>
          <Box data-tooltip-id="tooltip-lojag-faturamento" data-tooltip-html="Valor faturado no dia anterior" display="flex" alignItems="center">
            <img src={DolarImg} width={16} height={16} />
            <Typography variant="body1" color="white" fontWeight="bold" ml={1}>{dados.lojasG.faturamentoTotal.toLocaleString("pt-BR")}</Typography>
          </Box>
          <Box data-tooltip-id="tooltip-lojag-rentabilidade" data-tooltip-html="Rentabilidade atual do imóvel grande" display="flex" alignItems="center">
            <Typography variant="body1" color="white" fontWeight="bold" mr={1}>{resultadoLojasG.toFixed(2)}</Typography>
            <img src={porcem} width={14} height={14} />
          </Box>
        </GradientBox>
        <Box data-tooltip-id="tooltip-lojag-posse" data-tooltip-html="Quantidade total que você já possui desse imóvel" sx={{ bgcolor: "#6411D9", width: { xs: 40, sm: 48 }, height: { xs: 40, sm: 48 }, borderRadius: "10px", border: "2px solid #F27405", position: "absolute", left: { xs: -20, sm: -24 }, top: "50%", transform: "translateY(-50%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Typography color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 16 }}>{dados.lojasG.quantidade}</Typography>
        </Box>
        <TooltipPadrao id="tooltip-lojag-tipo" /><TooltipPadrao id="tooltip-lojag-preco" /><TooltipPadrao id="tooltip-lojag-total" />
        <TooltipPadrao id="tooltip-lojag-comprar" /><TooltipPadrao id="tooltip-lojag-diminuir" /><TooltipPadrao id="tooltip-lojag-quantidade" />
        <TooltipPadrao id="tooltip-lojag-aumentar" /><TooltipPadrao id="tooltip-lojag-faturamento" /><TooltipPadrao id="tooltip-lojag-rentabilidade" />
        <TooltipPadrao id="tooltip-lojag-posse" />
      </Paper>
    </div>
  );
}