import React, { useState } from "react";
import { useContext } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import terrenoImg from "../../public/outrasImagens/terreno.png";
import LojaPImg from "../../public/outrasImagens/lojaP.png";
import LojaMImg from "../../public/outrasImagens/lojaM.png";
import LojaGImg from "../../public/outrasImagens/lojaG.png";
import ConstuirImg from "../../public/outrasImagens/construir.png";
import DolarImg from "../../public/outrasImagens/simbolo-do-dolar.png";
import porcem from "../../public/outrasImagens/simbolo-de-porcentagem.png";
import mais from "../../public/outrasImagens/botao-de-simbolo-de-mais.png";
import menos from "../../public/outrasImagens/simbolo-de-menos.png";
import { Statistic } from "./statistic";
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import SidebarCard from "./SidebarCards";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import useSound from 'use-sound';
import constructorAudio from "../../public/sounds/constructAudio.mp3"
import alertAudio from "../../public/sounds/alertAudio.mp3"
import payTerrain from "../../public/sounds/payTerrainAudio.mp3"
export default function Buy() {
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);

  const vision = dados.vision.visionAtual;
  const { economiaSetores, setEconomiaSetores, atualizarEco } = useContext(
    DadosEconomyGlobalContext
  );

const [buttonConstructAudio] = useSound(constructorAudio)
const [buttonAlertAudio] = useSound(alertAudio)
const [buttonPayTerrain] = useSound(payTerrain)

  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#F27405", // fundo laranja
      color: "#fff", // texto branco
      border: "1px solid #E56100",
      fontSize: "13px",
      fontWeight: 500,
      borderRadius: "6px",
    },
  }));

  const teste = dados.terrenos.faturamentoTotal;
  // console.log(teste)

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

  const AumentarQuantidadeTerrenos = () =>
    setQuantidadeTerrenos(quantidadeTerrenos + 1);
  const AumentarQuantidadeLojasP = () =>
    setQuantidadeLojasP(quantidadeLojasP + 1);
  const AumentarQuantidadeLojasM = () =>
    setQuantidadeLojasM(quantidadeLojasM + 1);
  const AumentarQuantidadeLojasG = () =>
    setQuantidadeLojasG(quantidadeLojasG + 1);

  const DiminuirQuantidadeLojasP = () => {
    if (quantidadeLojasP === 1) {
      return;
    } else {
      setQuantidadeLojasP(quantidadeLojasP - 1);
    }
  };

  const DiminuirQuantidadeLojasM = () => {
    if (quantidadeLojasM === 1) {
      return;
    } else {
      setQuantidadeLojasM(quantidadeLojasM - 1);
    }
  };

  const DiminuirQuantidadeLojasG = () => {
    if (quantidadeLojasG === 1) {
      return;
    } else {
      setQuantidadeLojasG(quantidadeLojasG - 1);
    }
  };

  const DiminuirQuantidadeTerrenos = () => {
    if (quantidadeTerrenos === 1) {
      return;
    } else {
      setQuantidadeTerrenos(quantidadeTerrenos - 1);
    }
  };

  const GradientBox = styled(Box)({
    background: "linear-gradient(to left, #F27405, #F27405)",
    borderRadius: 5,
    padding: 8,
  });

const podeComprarTerreno =
    dados.terrenos.quantidade >=
      dados.terrenos.quantidadeNecTerreno * quantidadeTerrenos &&
    economiaSetores.saldo >= dados.terrenos.preçoConstrução * quantidadeTerrenos;

  const podeComprarLojaP =
    dados.terrenos.quantidade >=
      dados.lojasP.quantidadeNecTerreno * quantidadeLojasP &&
    economiaSetores.saldo >= dados.lojasP.preçoConstrução * quantidadeLojasP;

    const podeComprarLojaM =
    dados.terrenos.quantidade >=
      dados.lojasM.quantidadeNecTerreno * quantidadeLojasM &&
    economiaSetores.saldo >= dados.lojasM.preçoConstrução * quantidadeLojasM;

    const podeComprarLojaG =
    dados.terrenos.quantidade >=
      dados.lojasG.quantidadeNecTerreno * quantidadeLojasG &&
    economiaSetores.saldo >= dados.lojasG.preçoConstrução * quantidadeLojasG;

  // Comprar Loja P
  const ComprarLojaP = () => {
    if (
      dados.terrenos.quantidade <
      dados.lojasP.quantidadeNecTerreno * quantidadeLojasP
    ) {
      alertAudio()
      atualizarDados("modalAlert", {
        ...dados.modalAlert,
        estadoModal: true,
        head: "Você não tem Terrenos suficiente",
        content: "Compre Terreno, suficiente para construir o que deseja.",
      });
      return; // encerra a função aqui

      // return alert("Você não tem terreno suficiente");
    }
    if (
      economiaSetores.saldo <
      dados.lojasP.preçoConstrução * quantidadeLojasP
    ) {
      alertAudio()

      atualizarDados("modalAlert", {
        ...dados.modalAlert,
        estadoModal: true,
        head: "Você não tem Saldo suficiente",
        content: "Junte maior quantidade de saldo para realizar essa ação.",
      });
    } else {
       buttonConstructAudio()
      atualizarDados("lojasP", {
        ...dados.lojasP,
        quantidade: dados.lojasP.quantidade + quantidadeLojasP,
      });
      atualizarDados("terrenos", {
        ...dados.terrenos,
        quantidade:
          dados.terrenos.quantidade -
          dados.lojasP.quantidadeNecTerreno * quantidadeLojasP,
      });
      atualizarEco(
        "saldo",
        economiaSetores.saldo - dados.lojasP.preçoConstrução * quantidadeLojasP
      );
    }
  };

  // Comprar Loja M
  const ComprarLojaM = () => {
    if (
      dados.terrenos.quantidade <
      dados.lojasM.quantidadeNecTerreno * quantidadeLojasM
    ) {
     alertAudio()

      atualizarDados("modalAlert", {
        ...dados.modalAlert,
        estadoModal: true,
        head: "Você não tem Terrenos suficiente",
        content: "Compre Terreno, suficiente para construir o que deseja.",
      });
    }
    if (
      economiaSetores.saldo <
      dados.lojasM.preçoConstrução * quantidadeLojasM
    ) {
      alertAudio()

      atualizarDados("modalAlert", {
        ...dados.modalAlert,
        estadoModal: true,
        head: "Você não tem Saldo suficiente",
        content: "Junte maior quantidade de saldo para realizar essa ação.",
      });
    } else {
        buttonConstructAudio()
      atualizarDados("lojasM", {
        ...dados.lojasM,
        quantidade: dados.lojasM.quantidade + quantidadeLojasM,
      });
      atualizarDados("terrenos", {
        ...dados.terrenos,
        quantidade:
          dados.terrenos.quantidade -
          dados.lojasM.quantidadeNecTerreno * quantidadeLojasM,
      });
      atualizarEco(
        "saldo",
        economiaSetores.saldo - dados.lojasM.preçoConstrução * quantidadeLojasM
      );
    }
  };

  // Comprar Loja G
  const ComprarLojaG = () => {
    if (
      dados.terrenos.quantidade <
      dados.lojasG.quantidadeNecTerreno * quantidadeLojasG
    ) {
      alertAudio()

      atualizarDados("modalAlert", {
        ...dados.modalAlert,
        estadoModal: true,
        head: "Você não tem Terrenos suficiente",
        content: "Compre Terreno, suficiente para construir o que deseja.",
      });
    }
    if (
      economiaSetores.saldo <
      dados.lojasG.preçoConstrução * quantidadeLojasG
    ) {
      alertAudio()

      atualizarDados("modalAlert", {
        ...dados.modalAlert,
        estadoModal: true,
        head: "Você não tem Saldo suficiente",
        content: "Junte maior quantidade de saldo para realizar essa ação.",
      });
    } else {
        buttonConstructAudio()
      atualizarDados("lojasG", {
        ...dados.lojasG,
        quantidade: dados.lojasG.quantidade + quantidadeLojasG,
      });
      atualizarDados("terrenos", {
        ...dados.terrenos,
        quantidade:
          dados.terrenos.quantidade -
          dados.lojasG.quantidadeNecTerreno * quantidadeLojasG,
      });
      atualizarEco(
        "saldo",
        economiaSetores.saldo - dados.lojasG.preçoConstrução * quantidadeLojasG
      );
    }
  };

  // Comprar Terreno
  const ComprarTerreno = () => {
    if (
      economiaSetores.saldo <
      dados.terrenos.preçoConstrução * quantidadeTerrenos
    ) {
alertAudio()
      atualizarDados("modalAlert", {
        ...dados.modalAlert,
        estadoModal: true,
        head: "Você não tem Saldo suficiente",
        content: "Junte maior quantidade de saldo para realizar essa ação.",
      });
    } else {
      buttonPayTerrain()
      atualizarDados("terrenos", {
        ...dados.terrenos,
        quantidade: dados.terrenos.quantidade + quantidadeTerrenos,
      });
      atualizarEco(
        "saldo",
        economiaSetores.saldo -
        dados.terrenos.preçoConstrução * quantidadeTerrenos
      );
    }
  };
  const tooltipStyle = {
    backgroundColor: "#FFFFFF",
    color: "#350973",
    border: "1px solid #350973",
    borderRadius: "6px",
    padding: "6px 10px",
    fontWeight: "600",
    fontSize: "14px",
  };

  const formatarNumero = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(1).replace(".0", "") + "T"; // Trilhões
    if (num >= 1e9) return (num / 1e9).toFixed(1).replace(".0", "") + "B"; // Bilhões
    if (num >= 1e6) return (num / 1e6).toFixed(1).replace(".0", "") + "M"; // Milhões
    if (num >= 1e3) return (num / 1e3).toFixed(1).replace(".0", "") + "K"; // Milhares
    return num.toString();
  };
  if (dados.dia > 269) {
    if (vision !== "dashboard") {
      return <SidebarCard />;
    } else {
      return (
        <div className="flex justify-around flex-col w-full">
          {/* ===================== TERRENOS ===================== */}
          <Paper
            elevation={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 2,
              bgcolor: "#290064",
              borderRadius: "20px",
              mb: 2,
              // minHeight: "20vh",
              maxWidth: 400,
              maxHeight: 350,
              position: "relative",
              width: { xs: "90vw", sm: "60vw", md: "30vw", lg: "20vw" },
            }}
          >
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
              {/* Info */}
              <Box
                sx={{
                  flexGrow: 1,
                  mr: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* Título */}
                <GradientBox>
                  <Box
                    data-tooltip-id="tooltip-terreno-tipo"
                    data-tooltip-html="Tipo de construção básica usada como base para outros imóveis"
                  >
                    <Typography
                      variant="subtitle1"
                      color="white"
                      fontWeight="bold"
                    >
                      Terreno
                    </Typography>
                  </Box>
                </GradientBox>

                {/* Valor unitário */}
                <Box
                  sx={{ mt: 0.5, ml: 2.5 }}
                  data-tooltip-id="tooltip-terreno-preco"
                  data-tooltip-html="Preço unitário para comprar um terreno"
                >
                  <Box
                    sx={{
                      bgcolor: "#6411D9",
                      borderRadius: "2px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 1,
                      py: 0.25,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      color="white"
                      fontWeight="bold"
                    >
                      Valor
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="white"
                      fontWeight="bold"
                    >
                      {formatarNumero(dados.terrenos.preçoConstrução)}
                    </Typography>
                  </Box>
                </Box>

                {/* Valor total */}
                <Box
                  sx={{ mt: 0.5, ml: 2.5 }}
                  data-tooltip-id="tooltip-terreno-total"
                  data-tooltip-html="Custo total considerando a quantidade escolhida"
                >
                  <Box
                    sx={{
                      bgcolor: "#350973",
                      borderRadius: "5px",
                      height: { xs: 24, sm: 28 },
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="white"
                      fontWeight="bold"
                      fontSize={{ xs: 12, sm: 14 }}
                    >
                      Valor total
                    </Typography>
                    <Typography
                      variant="body2"
                      color="white"
                      fontWeight="bold"
                      fontSize={{ xs: 12, sm: 14 }}
                    >
                      {formatarNumero(
                        dados.terrenos.preçoConstrução * quantidadeTerrenos
                      )}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Controles */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                <Box
                  data-tooltip-id="tooltip-lojag-comprar"
                  data-tooltip-html={`<div>
          <p>Comprar terreno</p>
   <p style="margin-top:4px;">Dependendo do imóvel que você for construir, você vai precisar de um número mínimo de terrenos.</p>
              <p style="margin-top:4px;"><b>Imóvel pequeno</b> - 1 terreno.<br/><b>Imóvel médio</b> - 2 terrenos.<br/><b>Imóvel grande</b> - 3 terrenos.</p>
       
        </div>`}
                >
  <Box
                    style={getBotaoCompraStyle({
                      podeComprar: podeComprarTerreno,
                    })}
                    sx={{
                      // backgroundColor: "#F27405",
                      flexGrow: 1,
                      aspectRatio: "1",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      onClick={ComprarTerreno}
                      tipo="lojasP"
                      sx={{
                        width: { xs: 60, sm: 80 },
                        height: { xs: 60, sm: 80 },
                        borderRadius: "10px",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                        "&:active": { transform: "scale(0.95)" },
                      }}
                    >
                      <img
                        src={terrenoImg}
                        alt="terreno"
                        style={{ width: "60%", height: "60%" }}
                      />
                    </IconButton>
                  </Box>
                </Box>

                {/* Diminuir / Quantidade / Aumentar */}
                <Box display="flex" alignItems="center" mt={0.5}>
                  <Box
                    data-tooltip-id="tooltip-terreno-diminuir"
                    data-tooltip-html="Diminuir quantidade"
                  >
                    <IconButton
                      onClick={DiminuirQuantidadeTerrenos}
                      sx={{
                        bgcolor: "#6411D9",
                        width: { xs: 24, sm: 28 },
                        height: { xs: 24, sm: 28 },
                        borderRadius: { xs: "4px", sm: "5px" },
                        "&:hover": { bgcolor: "#834EDB" },
                      }}
                    >
                      <img src={menos} width={12} height={12} />
                    </IconButton>
                  </Box>

                  <Box
                    data-tooltip-id="tooltip-terreno-quantidade"
                    data-tooltip-html="Quantidade selecionada"
                    sx={{
                      mx: 1,
                      bgcolor: "#350973",
                      width: { xs: 24, sm: 28 },
                      height: { xs: 24, sm: 28 },
                      borderRadius: { xs: "4px", sm: "5px" },
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      color="white"
                      fontWeight="bold"
                      fontSize={{ xs: 12, sm: 14 }}
                    >
                      {quantidadeTerrenos}
                    </Typography>
                  </Box>

                  <Box
                    data-tooltip-id="tooltip-terreno-aumentar"
                    data-tooltip-html="Aumentar quantidade"
                  >
                    <IconButton
                      onClick={AumentarQuantidadeTerrenos}
                      sx={{
                        bgcolor: "#6411D9",
                        width: { xs: 24, sm: 28 },
                        height: { xs: 24, sm: 28 },
                        borderRadius: { xs: "4px", sm: "5px" },
                        "&:hover": { bgcolor: "#834EDB" },
                      }}
                    >
                      <img src={mais} width={12} height={12} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Quantidade disponível */}
            <Box
              data-tooltip-id="tooltip-terreno-posse"
              data-tooltip-html="Quantidade total que você já possui desse imóvel"
              sx={{
                bgcolor: "#6411D9",
                width: { xs: 40, sm: 48 },
                height: { xs: 40, sm: 48 },
                borderRadius: "10px",
                border: "2px solid #F27405",
                position: "absolute",
                left: { xs: -20, sm: -24 },
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                color="white"
                fontWeight="bold"
                fontSize={{ xs: 12, sm: 16 }}
              >
                {dados.terrenos.quantidade}
              </Typography>
            </Box>

            {/* Tooltip global */}
            <Tooltip
              style={{
                backgroundColor: "#FFFFFF", // fundo branco
                color: "#350973", // texto roxo
                border: "1px solid #350973", // borda fina
                borderRadius: "6px", // cantos arredondados
                padding: "6px 10px", // espaçamento interno
                fontWeight: "600", // deixa a fonte mais destacada
                fontSize: "14px",
              }}
              id="tooltip-terreno-tipo"
            />
            <Tooltip
              style={{
                backgroundColor: "#FFFFFF", // fundo branco
                color: "#350973", // texto roxo
                border: "1px solid #350973", // borda fina
                borderRadius: "6px", // cantos arredondados
                padding: "6px 10px", // espaçamento interno
                fontWeight: "600", // deixa a fonte mais destacada
                fontSize: "14px",
              }}
              id="tooltip-terreno-preco"
            />
            <Tooltip
              style={{
                backgroundColor: "#FFFFFF", // fundo branco
                color: "#350973", // texto roxo
                border: "1px solid #350973", // borda fina
                borderRadius: "6px", // cantos arredondados
                padding: "6px 10px", // espaçamento interno
                fontWeight: "600", // deixa a fonte mais destacada
                fontSize: "14px",
              }}
              id="tooltip-terreno-total"
            />
            <Tooltip
              style={{
                backgroundColor: "#FFFFFF", // fundo branco
                color: "#350973", // texto roxo
                border: "1px solid #350973", // borda fina
                borderRadius: "6px", // cantos arredondados
                padding: "6px 10px", // espaçamento interno
                fontWeight: "600", // deixa a fonte mais destacada
                fontSize: "14px",
              }}
              id="tooltip-terreno-comprar"
            />
            <Tooltip
              style={{
                backgroundColor: "#FFFFFF", // fundo branco
                color: "#350973", // texto roxo
                border: "1px solid #350973", // borda fina
                borderRadius: "6px", // cantos arredondados
                padding: "6px 10px", // espaçamento interno
                fontWeight: "600", // deixa a fonte mais destacada
                fontSize: "14px",
              }}
              id="tooltip-terreno-diminuir"
            />
            <Tooltip
              style={{
                backgroundColor: "#FFFFFF", // fundo branco
                color: "#350973", // texto roxo
                border: "1px solid #350973", // borda fina
                borderRadius: "6px", // cantos arredondados
                padding: "6px 10px", // espaçamento interno
                fontWeight: "600", // deixa a fonte mais destacada
                fontSize: "14px",
              }}
              id="tooltip-terreno-quantidade"
            />
            <Tooltip
              style={{
                backgroundColor: "#FFFFFF", // fundo branco
                color: "#350973", // texto roxo
                border: "1px solid #350973", // borda fina
                borderRadius: "6px", // cantos arredondados
                padding: "6px 10px", // espaçamento interno
                fontWeight: "600", // deixa a fonte mais destacada
                fontSize: "14px",
              }}
              id="tooltip-terreno-aumentar"
            />
            <Tooltip
              style={{
                backgroundColor: "#FFFFFF", // fundo branco
                color: "#350973", // texto roxo
                border: "1px solid #350973", // borda fina
                borderRadius: "6px", // cantos arredondados
                padding: "6px 10px", // espaçamento interno
                fontWeight: "600", // deixa a fonte mais destacada
                fontSize: "14px",
              }}
              id="tooltip-terreno-posse"
            />
          </Paper>

          {/* ===================== LOJAS PEQUENAS ===================== */}
          <Paper
            elevation={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 2,
              bgcolor: "#290064",
              borderRadius: "20px",
              mb: 2,
              // minHeight: "20vh",
              maxWidth: 400,
              position: "relative",
              width: { xs: "90vw", sm: "60vw", md: "30vw", lg: "20vw" },
            }}
          >
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
              {/* Info */}
              <Box
                sx={{
                  flexGrow: 1,
                  mr: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* Título */}
                <GradientBox>
                  <Box
                    data-tooltip-id="tooltip-lojap-tipo"
                    data-tooltip-html="Tipo de construção básica usada como base para outros imóveis"
                  >
                    <Typography
                      variant="subtitle1"
                      color="white"
                      fontWeight="bold"
                    >
                      Imóvel Pequeno
                    </Typography>
                  </Box>
                </GradientBox>

                {/* Valor unitário */}
                <Box
                  sx={{ mt: 0.5, ml: 2.5 }}
                  data-tooltip-id="tooltip-lojap-preco"
                  data-tooltip-html="Preço unitário para construir um imóvel pequeno no terreno"
                >
                  <Box
                    sx={{
                      bgcolor: "#6411D9",
                      borderRadius: "2px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 1,
                      py: 0.25,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      color="white"
                      fontWeight="bold"
                    >
                      Construção
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="white"
                      fontWeight="bold"
                    >
                      {formatarNumero(dados.lojasP.preçoConstrução)}
                    </Typography>
                  </Box>
                </Box>

                {/* Valor total */}
                <Box
                  sx={{ mt: 0.5, ml: 2.5 }}
                  data-tooltip-id="tooltip-lojap-total"
                  data-tooltip-html="Custo total considerando a quantidade escolhida"
                >
                  <Box
                    sx={{
                      bgcolor: "#350973",
                      borderRadius: "5px",
                      height: { xs: 24, sm: 28 },
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="white"
                      fontWeight="bold"
                      fontSize={{ xs: 12, sm: 14 }}
                    >
                      Valor total
                    </Typography>
                    <Typography
                      variant="body2"
                      color="white"
                      fontWeight="bold"
                      fontSize={{ xs: 12, sm: 14 }}
                    >
                      {formatarNumero(
                        dados.lojasP.preçoConstrução * quantidadeLojasP
                      )}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Controles */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                <Box
                  data-tooltip-id="tooltip-lojap-comprar"
                  data-tooltip-html={`<div>
          <p>Comprar imóvel pequeno</p>
          <p style="margin-top:4px;">Precisa de 1 terreno para poder construir em cima dele.</p>
        </div>`}
                >
                  <Box
                    style={getBotaoCompraStyle({
                      podeComprar: podeComprarLojaP,
                    })}
                    sx={{
                      // backgroundColor: "#F27405",
                      flexGrow: 1,
                      aspectRatio: "1",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      onClick={ComprarLojaP}
                      tipo="lojasP"
                      sx={{
                        width: { xs: 60, sm: 80 },
                        height: { xs: 60, sm: 80 },
                        borderRadius: "10px",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                        "&:active": { transform: "scale(0.95)" },
                      }}
                    >
                      <img
                        src={LojaPImg}
                        alt="loja pequena"
                        style={{ width: "60%", height: "60%" }}
                      />
                    </IconButton>
                  </Box>
                </Box>

                {/* Diminuir / Quantidade / Aumentar */}
                <Box display="flex" alignItems="center" mt={0.5}>
                  <Box
                    data-tooltip-id="tooltip-lojap-diminuir"
                    data-tooltip-html="Diminuir quantidade"
                  >
                    <IconButton
                      onClick={DiminuirQuantidadeLojasP}
                      sx={{
                        bgcolor: "#6411D9",
                        width: { xs: 24, sm: 28 },
                        height: { xs: 24, sm: 28 },
                        borderRadius: { xs: "4px", sm: "5px" },
                        "&:hover": { bgcolor: "#834EDB" },
                      }}
                    >
                      <img src={menos} width={12} height={12} />
                    </IconButton>
                  </Box>

                  <Box
                    data-tooltip-id="tooltip-lojap-quantidade"
                    data-tooltip-html="Quantidade selecionada"
                    sx={{
                      mx: 1,
                      bgcolor: "#350973",
                      width: { xs: 24, sm: 28 },
                      height: { xs: 24, sm: 28 },
                      borderRadius: { xs: "4px", sm: "5px" },
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      color="white"
                      fontWeight="bold"
                      fontSize={{ xs: 12, sm: 14 }}
                    >
                      {quantidadeLojasP}
                    </Typography>
                  </Box>

                  <Box
                    data-tooltip-id="tooltip-lojap-aumentar"
                    data-tooltip-html="Aumentar quantidade"
                  >
                    <IconButton
                      onClick={AumentarQuantidadeLojasP}
                      sx={{
                        bgcolor: "#6411D9",
                        width: { xs: 24, sm: 28 },
                        height: { xs: 24, sm: 28 },
                        borderRadius: { xs: "4px", sm: "5px" },
                        "&:hover": { bgcolor: "#834EDB" },
                      }}
                    >
                      <img src={mais} width={12} height={12} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Quantidade disponível */}
            <Box
              data-tooltip-id="tooltip-lojap-posse"
              data-tooltip-html="Quantidade total que você já possui desse imóvel"
              sx={{
                bgcolor: "#6411D9",
                width: { xs: 40, sm: 48 },
                height: { xs: 40, sm: 48 },
                borderRadius: "10px",
                border: "2px solid #F27405",
                position: "absolute",
                left: { xs: -20, sm: -24 },
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                color="white"
                fontWeight="bold"
                fontSize={{ xs: 12, sm: 16 }}
              >
                {dados.lojasP.quantidade}
              </Typography>
            </Box>

            {/* Tooltips globais */}
            <Tooltip style={tooltipStyle} id="tooltip-lojap-tipo" />
            <Tooltip style={tooltipStyle} id="tooltip-lojap-preco" />
            <Tooltip style={tooltipStyle} id="tooltip-lojap-total" />
            <Tooltip style={tooltipStyle} id="tooltip-lojap-comprar" />
            <Tooltip style={tooltipStyle} id="tooltip-lojap-diminuir" />
            <Tooltip style={tooltipStyle} id="tooltip-lojap-quantidade" />
            <Tooltip style={tooltipStyle} id="tooltip-lojap-aumentar" />
            <Tooltip style={tooltipStyle} id="tooltip-lojap-posse" />
          </Paper>

          {/* ===================== LOJAS MÉDIAS ===================== */}
          <Paper
            elevation={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 2,
              bgcolor: "#290064",
              borderRadius: "20px",
              mb: 2,
              // minHeight: "20vh",
              maxWidth: 400,
              position: "relative",
              width: { xs: "90vw", sm: "60vw", md: "30vw", lg: "20vw" },
            }}
          >
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
              {/* Info */}
              <Box
                sx={{
                  flexGrow: 1,
                  mr: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* Título */}
                <GradientBox>
                  <Box
                    data-tooltip-id="tooltip-lojam-tipo"
                    data-tooltip-html="Construção média, exige imóveis pequenos como base"
                  >
                    <Typography
                      variant="subtitle1"
                      color="white"
                      fontWeight="bold"
                    >
                      Imóvel Médio
                    </Typography>
                  </Box>
                </GradientBox>

                {/* Valor unitário */}
                <Box
                  sx={{ mt: 0.5, ml: 2.5 }}
                  data-tooltip-id="tooltip-lojam-preco"
                  data-tooltip-html="Preço unitário para construir um imóvel médio"
                >
                  <Box
                    sx={{
                      bgcolor: "#6411D9",
                      borderRadius: "2px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 1,
                      py: 0.25,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      color="white"
                      fontWeight="bold"
                    >
                      Construção
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="white"
                      fontWeight="bold"
                    >
                      {formatarNumero(dados.lojasM.preçoConstrução)}
                    </Typography>
                  </Box>
                </Box>

                {/* Valor total */}
                <Box
                  sx={{ mt: 0.5, ml: 2.5 }}
                  data-tooltip-id="tooltip-lojam-total"
                  data-tooltip-html="Custo total considerando a quantidade escolhida"
                >
                  <Box
                    sx={{
                      bgcolor: "#350973",
                      borderRadius: "5px",
                      height: { xs: 24, sm: 28 },
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="white"
                      fontWeight="bold"
                      fontSize={{ xs: 12, sm: 14 }}
                    >
                      Valor total
                    </Typography>
                    <Typography
                      variant="body2"
                      color="white"
                      fontWeight="bold"
                      fontSize={{ xs: 12, sm: 14 }}
                    >
                      {formatarNumero(
                        dados.lojasM.preçoConstrução * quantidadeLojasM
                      )}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Controles */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                <Box
                  data-tooltip-id="tooltip-lojam-comprar"
                  data-tooltip-html={`<div>
          <p>Comprar imóvel médio</p>
          <p style="margin-top:4px;">Precisa de 2 imóveis pequenos para construir.</p>
        </div>`}
                >
                  <Box
                    style={getBotaoCompraStyle({
                      podeComprar: podeComprarLojaM,
                    })}
                    sx={{
                      // backgroundColor: "#F27405",
                      flexGrow: 1,
                      aspectRatio: "1",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      onClick={ComprarLojaM}
                      tipo="lojasP"
                      sx={{
                        width: { xs: 60, sm: 80 },
                        height: { xs: 60, sm: 80 },
                        borderRadius: "10px",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                        "&:active": { transform: "scale(0.95)" },
                      }}
                    >
                      <img
                        src={LojaMImg}
                        alt="loja média"
                        style={{ width: "60%", height: "60%" }}
                      />
                    </IconButton>
                  </Box>
                </Box>

                {/* Diminuir / Quantidade / Aumentar */}
                <Box display="flex" alignItems="center" mt={0.5}>
                  <Box
                    data-tooltip-id="tooltip-lojam-diminuir"
                    data-tooltip-html="Diminuir quantidade"
                  >
                    <IconButton
                      onClick={DiminuirQuantidadeLojasM}
                      sx={{
                        bgcolor: "#6411D9",
                        width: { xs: 24, sm: 28 },
                        height: { xs: 24, sm: 28 },
                        borderRadius: { xs: "4px", sm: "5px" },
                        "&:hover": { bgcolor: "#834EDB" },
                      }}
                    >
                      <img src={menos} width={12} height={12} />
                    </IconButton>
                  </Box>

                  <Box
                    data-tooltip-id="tooltip-lojam-quantidade"
                    data-tooltip-html="Quantidade selecionada"
                    sx={{
                      mx: 1,
                      bgcolor: "#350973",
                      width: { xs: 24, sm: 28 },
                      height: { xs: 24, sm: 28 },
                      borderRadius: { xs: "4px", sm: "5px" },
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      color="white"
                      fontWeight="bold"
                      fontSize={{ xs: 12, sm: 14 }}
                    >
                      {quantidadeLojasM}
                    </Typography>
                  </Box>

                  <Box
                    data-tooltip-id="tooltip-lojam-aumentar"
                    data-tooltip-html="Aumentar quantidade"
                  >
                    <IconButton
                      onClick={AumentarQuantidadeLojasM}
                      sx={{
                        bgcolor: "#6411D9",
                        width: { xs: 24, sm: 28 },
                        height: { xs: 24, sm: 28 },
                        borderRadius: { xs: "4px", sm: "5px" },
                        "&:hover": { bgcolor: "#834EDB" },
                      }}
                    >
                      <img src={mais} width={12} height={12} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Quantidade disponível */}
            <Box
              data-tooltip-id="tooltip-lojam-posse"
              data-tooltip-html="Quantidade total que você já possui desse imóvel"
              sx={{
                bgcolor: "#6411D9",
                width: { xs: 40, sm: 48 },
                height: { xs: 40, sm: 48 },
                borderRadius: "10px",
                border: "2px solid #F27405",
                position: "absolute",
                left: { xs: -20, sm: -24 },
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                color="white"
                fontWeight="bold"
                fontSize={{ xs: 12, sm: 16 }}
              >
                {dados.lojasM.quantidade}
              </Typography>
            </Box>

            {/* Tooltips globais */}
            <Tooltip style={tooltipStyle} id="tooltip-lojam-tipo" />
            <Tooltip style={tooltipStyle} id="tooltip-lojam-preco" />
            <Tooltip style={tooltipStyle} id="tooltip-lojam-total" />
            <Tooltip style={tooltipStyle} id="tooltip-lojam-comprar" />
            <Tooltip style={tooltipStyle} id="tooltip-lojam-diminuir" />
            <Tooltip style={tooltipStyle} id="tooltip-lojam-quantidade" />
            <Tooltip style={tooltipStyle} id="tooltip-lojam-aumentar" />
            <Tooltip style={tooltipStyle} id="tooltip-lojam-posse" />
          </Paper>

          {/* ===================== LOJAS GRANDES ===================== */}
          <Paper
            elevation={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 2,
              bgcolor: "#290064",
              borderRadius: "20px",
              mb: 2,
              // minHeight: "20vh",
              maxWidth: 400,
              position: "relative",
              width: { xs: "90vw", sm: "60vw", md: "30vw", lg: "20vw" },
            }}
          >
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
              {/* Info */}
              <Box
                sx={{
                  flexGrow: 1,
                  mr: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* Título */}
                <GradientBox>
                  <Box
                    data-tooltip-id="tooltip-lojag-tipo"
                    data-tooltip-html="Construção grande, exige imóveis médios como base"
                  >
                    <Typography
                      variant="subtitle1"
                      color="white"
                      fontWeight="bold"
                    >
                      Imóvel Grande
                    </Typography>
                  </Box>
                </GradientBox>

                {/* Valor unitário */}
                <Box
                  sx={{ mt: 0.5, ml: 2.5 }}
                  data-tooltip-id="tooltip-lojag-preco"
                  data-tooltip-html="Preço unitário para construir um imóvel grande"
                >
                  <Box
                    sx={{
                      bgcolor: "#6411D9",
                      borderRadius: "2px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 1,
                      py: 0.25,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      color="white"
                      fontWeight="bold"
                    >
                      Construção
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="white"
                      fontWeight="bold"
                    >
                      {formatarNumero(dados.lojasG.preçoConstrução)}
                    </Typography>
                  </Box>
                </Box>

                {/* Valor total */}
                <Box
                  sx={{ mt: 0.5, ml: 2.5 }}
                  data-tooltip-id="tooltip-lojag-total"
                  data-tooltip-html="Custo total considerando a quantidade escolhida"
                >
                  <Box
                    sx={{
                      bgcolor: "#350973",
                      borderRadius: "5px",
                      height: { xs: 24, sm: 28 },
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="white"
                      fontWeight="bold"
                      fontSize={{ xs: 12, sm: 14 }}
                    >
                      Valor total
                    </Typography>
                    <Typography
                      variant="body2"
                      color="white"
                      fontWeight="bold"
                      fontSize={{ xs: 12, sm: 14 }}
                    >
                      {formatarNumero(
                        dados.lojasG.preçoConstrução * quantidadeLojasG
                      )}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Controles */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                <Box
                  data-tooltip-id="tooltip-lojag-comprar"
                  data-tooltip-html={`<div>
          <p>Comprar imóvel grande</p>
          <p style="margin-top:4px;">Precisa de 3 imóveis médios para construir.</p>
        </div>`}
                >
                   <Box
                    style={getBotaoCompraStyle({
                      podeComprar: podeComprarLojaG,
                    })}
                    sx={{
                      // backgroundColor: "#F27405",
                      flexGrow: 1,
                      aspectRatio: "1",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      onClick={ComprarLojaG}
                      tipo="lojasP"
                      sx={{
                        width: { xs: 60, sm: 80 },
                        height: { xs: 60, sm: 80 },
                        borderRadius: "10px",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                        "&:active": { transform: "scale(0.95)" },
                      }}
                    >
                      <img
                        src={LojaGImg}
                        alt="loja grande"
                        style={{ width: "60%", height: "60%" }}
                      />
                    </IconButton>
                  </Box>
                </Box>

                {/* Diminuir / Quantidade / Aumentar */}
                <Box display="flex" alignItems="center" mt={0.5}>
                  <Box
                    data-tooltip-id="tooltip-lojag-diminuir"
                    data-tooltip-html="Diminuir quantidade"
                  >
                    <IconButton
                      onClick={DiminuirQuantidadeLojasG}
                      sx={{
                        bgcolor: "#6411D9",
                        width: { xs: 24, sm: 28 },
                        height: { xs: 24, sm: 28 },
                        borderRadius: { xs: "4px", sm: "5px" },
                        "&:hover": { bgcolor: "#834EDB" },
                      }}
                    >
                      <img src={menos} width={12} height={12} />
                    </IconButton>
                  </Box>

                  <Box
                    data-tooltip-id="tooltip-lojag-quantidade"
                    data-tooltip-html="Quantidade selecionada"
                    sx={{
                      mx: 1,
                      bgcolor: "#350973",
                      width: { xs: 24, sm: 28 },
                      height: { xs: 24, sm: 28 },
                      borderRadius: { xs: "4px", sm: "5px" },
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      color="white"
                      fontWeight="bold"
                      fontSize={{ xs: 12, sm: 14 }}
                    >
                      {quantidadeLojasG}
                    </Typography>
                  </Box>

                  <Box
                    data-tooltip-id="tooltip-lojag-aumentar"
                    data-tooltip-html="Aumentar quantidade"
                  >
                    <IconButton
                      onClick={AumentarQuantidadeLojasG}
                      sx={{
                        bgcolor: "#6411D9",
                        width: { xs: 24, sm: 28 },
                        height: { xs: 24, sm: 28 },
                        borderRadius: { xs: "4px", sm: "5px" },
                        "&:hover": { bgcolor: "#834EDB" },
                      }}
                    >
                      <img src={mais} width={12} height={12} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Quantidade disponível */}
            <Box
              data-tooltip-id="tooltip-lojag-posse"
              data-tooltip-html="Quantidade total que você já possui desse imóvel"
              sx={{
                bgcolor: "#6411D9",
                width: { xs: 40, sm: 48 },
                height: { xs: 40, sm: 48 },
                borderRadius: "10px",
                border: "2px solid #F27405",
                position: "absolute",
                left: { xs: -20, sm: -24 },
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                color="white"
                fontWeight="bold"
                fontSize={{ xs: 12, sm: 16 }}
              >
                {dados.lojasG.quantidade}
              </Typography>
            </Box>

            {/* Tooltips globais */}
            <Tooltip style={tooltipStyle} id="tooltip-lojag-tipo" />
            <Tooltip style={tooltipStyle} id="tooltip-lojag-preco" />
            <Tooltip style={tooltipStyle} id="tooltip-lojag-total" />
            <Tooltip style={tooltipStyle} id="tooltip-lojag-comprar" />
            <Tooltip style={tooltipStyle} id="tooltip-lojag-diminuir" />
            <Tooltip style={tooltipStyle} id="tooltip-lojag-quantidade" />
            <Tooltip style={tooltipStyle} id="tooltip-lojag-aumentar" />
            <Tooltip style={tooltipStyle} id="tooltip-lojag-posse" />
          </Paper>
        </div>
      );
    }
  } else {
    return (
      <div className="flex justify-around flex-col w-full">
        {/* ===================== TERRENOS ===================== */}
        <Paper
          elevation={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 2,
            bgcolor: "#290064",
            borderRadius: "20px",
            mb: 2,
            minHeight: "20vh",
            maxWidth: 400,
            position: "relative",
            width: { xs: "90vw", sm: "60vw", md: "30vw", lg: "20vw" },
          }}
        >
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
            {/* Info */}
            <Box
              sx={{
                flexGrow: 1,
                mr: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <GradientBox>
                <Box
                  data-tooltip-id="tooltip-terreno-tipo"
                  data-tooltip-html="Tipo de construção básica usada como base para outros imóveis"
                >
                  <Typography
                    variant="subtitle1"
                    color="white"
                    fontWeight="bold"
                  >
                    Terreno
                  </Typography>
                </Box>
              </GradientBox>

              <Box
                sx={{ mt: 0.5, ml: 2.5 }}
                data-tooltip-id="tooltip-terreno-preco"
                data-tooltip-html="Preço unitário para comprar um terreno"
              >
                <Box
                  sx={{
                    bgcolor: "#6411D9",
                    borderRadius: "2px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 1,
                    py: 0.25,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    color="white"
                    fontWeight="bold"
                  >
                    Valor
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="white"
                    fontWeight="bold"
                  >
                    {formatarNumero(dados.terrenos.preçoConstrução)}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{ mt: 0.5, ml: 2.5 }}
                data-tooltip-id="tooltip-terreno-total"
                data-tooltip-html="Custo total considerando a quantidade escolhida"
              >
                <Box
                  sx={{
                    bgcolor: "#350973",
                    borderRadius: "5px",
                    height: { xs: 24, sm: 28 },
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="white"
                    fontWeight="bold"
                    fontSize={{ xs: 12, sm: 14 }}
                  >
                    Valor total
                  </Typography>
                  <Typography
                    variant="body2"
                    color="white"
                    fontWeight="bold"
                    fontSize={{ xs: 12, sm: 14 }}
                  >
                    {formatarNumero(
                      dados.terrenos.preçoConstrução * quantidadeTerrenos
                    )}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Controles */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <Box
                data-tooltip-id="tooltip-terreno-comprar"
                data-tooltip-html={`
        <div>
          <p>Comprar terreno</p>
          <p style="margin-top:4px;">Dependendo do imóvel que você for construir, você vai precisar de um número mínimo de terrenos:</p>
          <p style="margin-top:4px;"><b>Imóvel pequeno</b> - 1 terreno<br/><b>Imóvel médio</b> - 2 terrenos<br/><b>Imóvel grande</b> - 3 terrenos</p>
        </div>
      `}
              >
                <Box
                    style={getBotaoCompraStyle({
                      podeComprar: podeComprarTerreno,
                    })}
                    sx={{
                      // backgroundColor: "#F27405",
                      flexGrow: 1,
                      aspectRatio: "1",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      onClick={ComprarTerreno}
                      tipo="lojasP"
                      sx={{
                        width: { xs: 60, sm: 80 },
                        height: { xs: 60, sm: 80 },
                        borderRadius: "10px",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                        "&:active": { transform: "scale(0.95)" },
                      }}
                    >
                    <img
                      src={terrenoImg}
                      alt="terreno"
                      style={{ width: "60%", height: "60%" }}
                    />
                  </IconButton>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" mt={0.5}>
                <Box
                  data-tooltip-id="tooltip-terreno-diminuir"
                  data-tooltip-html="Diminuir quantidade"
                >
                  <IconButton
                    onClick={DiminuirQuantidadeTerrenos}
                    sx={{
                      bgcolor: "#6411D9",
                      width: { xs: 24, sm: 28 },
                      height: { xs: 24, sm: 28 },
                      borderRadius: { xs: "4px", sm: "5px" },
                      "&:hover": { bgcolor: "#834EDB" },
                    }}
                  >
                    <img src={menos} width={12} height={12} />
                  </IconButton>
                </Box>

                <Box
                  data-tooltip-id="tooltip-terreno-quantidade"
                  data-tooltip-html="Quantidade selecionada"
                  sx={{
                    mx: 1,
                    bgcolor: "#350973",
                    width: { xs: 24, sm: 28 },
                    height: { xs: 24, sm: 28 },
                    borderRadius: { xs: "4px", sm: "5px" },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    color="white"
                    fontWeight="bold"
                    fontSize={{ xs: 12, sm: 14 }}
                  >
                    {quantidadeTerrenos}
                  </Typography>
                </Box>

                <Box
                  data-tooltip-id="tooltip-terreno-aumentar"
                  data-tooltip-html="Aumentar quantidade"
                >
                  <IconButton
                    onClick={AumentarQuantidadeTerrenos}
                    sx={{
                      bgcolor: "#6411D9",
                      width: { xs: 24, sm: 28 },
                      height: { xs: 24, sm: 28 },
                      borderRadius: { xs: "4px", sm: "5px" },
                      "&:hover": { bgcolor: "#834EDB" },
                    }}
                  >
                    <img src={mais} width={12} height={12} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Faturamento / Rentabilidade */}
          <GradientBox
            sx={{
              borderRadius: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 2,
              mt: 1,
              minHeight: 40,
            }}
          >
            <Box
              data-tooltip-id="tooltip-terreno-faturamento"
              data-tooltip-html="Valor faturado no dia anterior"
              display="flex"
              alignItems="center"
            >
              <img src={DolarImg} width={16} height={16} />
              <Typography
                variant="body1"
                color="white"
                fontWeight="bold"
                ml={1}
              >
                {dados.terrenos.faturamentoTotal.toLocaleString("pt-BR")}
              </Typography>
            </Box>
            <Box
              data-tooltip-id="tooltip-terreno-rentabilidade"
              data-tooltip-html="Rentabilidade atual dos terrenos"
              display="flex"
              alignItems="center"
            >
              <Typography
                variant="body1"
                color="white"
                fontWeight="bold"
                mr={1}
              >
                {resultadoTerrenos.toFixed(2)}
              </Typography>
              <img src={porcem} width={14} height={14} />
            </Box>
          </GradientBox>

          {/* Quantidade possuída */}
          <Box
            data-tooltip-id="tooltip-terreno-posse"
            data-tooltip-html="Quantidade total que você já possui desse imóvel"
            sx={{
              bgcolor: "#6411D9",
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
              borderRadius: "10px",
              border: "2px solid #F27405",
              position: "absolute",
              left: { xs: -20, sm: -24 },
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              color="white"
              fontWeight="bold"
              fontSize={{ xs: 12, sm: 16 }}
            >
              {dados.terrenos.quantidade}
            </Typography>
          </Box>

          {/* Tooltips globais */}
          <Tooltip style={tooltipStyle} id="tooltip-terreno-tipo" />
          <Tooltip style={tooltipStyle} id="tooltip-terreno-preco" />
          <Tooltip style={tooltipStyle} id="tooltip-terreno-total" />
          <Tooltip style={tooltipStyle} id="tooltip-terreno-comprar" />
          <Tooltip style={tooltipStyle} id="tooltip-terreno-diminuir" />
          <Tooltip style={tooltipStyle} id="tooltip-terreno-quantidade" />
          <Tooltip style={tooltipStyle} id="tooltip-terreno-aumentar" />
          <Tooltip style={tooltipStyle} id="tooltip-terreno-faturamento" />
          <Tooltip style={tooltipStyle} id="tooltip-terreno-rentabilidade" />
          <Tooltip style={tooltipStyle} id="tooltip-terreno-posse" />
        </Paper>

        {/* ===================== LOJAS PEQUENAS ===================== */}
        <Paper
          elevation={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 2,
            bgcolor: "#290064",
            borderRadius: "20px",
            mb: 2,
            minHeight: "20vh",
            maxWidth: 400,
            position: "relative",
            width: { xs: "90vw", sm: "60vw", md: "30vw", lg: "20vw" },
          }}
        >
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
            <Box
              sx={{
                flexGrow: 1,
                mr: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <GradientBox>
                <Box
                  data-tooltip-id="tooltip-lojap-tipo"
                  data-tooltip-html="Tipo de construção usada como base para outros imóveis"
                >
                  <Typography
                    variant="subtitle1"
                    color="white"
                    fontWeight="bold"
                  >
                    Imóvel Pequeno
                  </Typography>
                </Box>
              </GradientBox>

              <Box
                sx={{ mt: 0.5, ml: 2.5 }}
                data-tooltip-id="tooltip-lojap-preco"
                data-tooltip-html="Preço unitário para construir um imóvel pequeno no terreno"
              >
                <Box
                  sx={{
                    bgcolor: "#6411D9",
                    borderRadius: "2px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 1,
                    py: 0.25,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    color="white"
                    fontWeight="bold"
                  >
                    Construção
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="white"
                    fontWeight="bold"
                  >
                    {formatarNumero(dados.lojasP.preçoConstrução)}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{ mt: 0.5, ml: 2.5 }}
                data-tooltip-id="tooltip-lojap-total"
                data-tooltip-html="Custo total considerando a quantidade escolhida"
              >
                <Box
                  sx={{
                    bgcolor: "#350973",
                    borderRadius: "5px",
                    height: { xs: 24, sm: 28 },
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="white"
                    fontWeight="bold"
                    fontSize={{ xs: 12, sm: 14 }}
                  >
                    Valor total
                  </Typography>
                  <Typography
                    variant="body2"
                    color="white"
                    fontWeight="bold"
                    fontSize={{ xs: 12, sm: 14 }}
                  >
                    {formatarNumero(
                      dados.lojasP.preçoConstrução * quantidadeLojasP
                    )}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <Box
                data-tooltip-id="tooltip-lojap-comprar"
                data-tooltip-html="<div><p>Comprar imóvel pequeno</p><p style='margin-top:4px;'>Precisa de um terreno para poder construir em cima dele</p></div>"
              >
                 <Box
                    style={getBotaoCompraStyle({
                      podeComprar: podeComprarLojaP,
                    })}
                    sx={{
                      // backgroundColor: "#F27405",
                      flexGrow: 1,
                      aspectRatio: "1",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      onClick={ComprarLojaP}
                      tipo="lojasP"
                      sx={{
                        width: { xs: 60, sm: 80 },
                        height: { xs: 60, sm: 80 },
                        borderRadius: "10px",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                        "&:active": { transform: "scale(0.95)" },
                      }}
                    >
                    <img
                      src={LojaPImg}
                      alt="loja pequena"
                      style={{ width: "60%", height: "60%" }}
                    />
                  </IconButton>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" mt={0.5}>
                <Box
                  data-tooltip-id="tooltip-lojap-diminuir"
                  data-tooltip-html="Diminuir quantidade"
                >
                  <IconButton
                    onClick={DiminuirQuantidadeLojasP}
                    sx={{
                      bgcolor: "#6411D9",
                      width: { xs: 24, sm: 28 },
                      height: { xs: 24, sm: 28 },
                      borderRadius: { xs: "4px", sm: "5px" },
                      "&:hover": { bgcolor: "#834EDB" },
                    }}
                  >
                    <img src={menos} width={12} height={12} />
                  </IconButton>
                </Box>

                <Box
                  data-tooltip-id="tooltip-lojap-quantidade"
                  data-tooltip-html="Quantidade selecionada"
                  sx={{
                    mx: 1,
                    bgcolor: "#350973",
                    width: { xs: 24, sm: 28 },
                    height: { xs: 24, sm: 28 },
                    borderRadius: { xs: "4px", sm: "5px" },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    color="white"
                    fontWeight="bold"
                    fontSize={{ xs: 12, sm: 14 }}
                  >
                    {quantidadeLojasP}
                  </Typography>
                </Box>

                <Box
                  data-tooltip-id="tooltip-lojap-aumentar"
                  data-tooltip-html="Aumentar quantidade"
                >
                  <IconButton
                    onClick={AumentarQuantidadeLojasP}
                    sx={{
                      bgcolor: "#6411D9",
                      width: { xs: 24, sm: 28 },
                      height: { xs: 24, sm: 28 },
                      borderRadius: { xs: "4px", sm: "5px" },
                      "&:hover": { bgcolor: "#834EDB" },
                    }}
                  >
                    <img src={mais} width={12} height={12} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Faturamento / Rentabilidade */}
          <GradientBox
            sx={{
              borderRadius: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 2,
              mt: 1,
              minHeight: 40,
            }}
          >
            <Box
              data-tooltip-id="tooltip-lojap-faturamento"
              data-tooltip-html="Valor faturado no dia anterior"
              display="flex"
              alignItems="center"
            >
              <img src={DolarImg} width={16} height={16} />
              <Typography
                variant="body1"
                color="white"
                fontWeight="bold"
                ml={1}
              >
                {dados.lojasP.faturamentoTotal.toLocaleString("pt-BR")}
              </Typography>
            </Box>
            <Box
              data-tooltip-id="tooltip-lojap-rentabilidade"
              data-tooltip-html="Rentabilidade atual do imóvel pequeno"
              display="flex"
              alignItems="center"
            >
              <Typography
                variant="body1"
                color="white"
                fontWeight="bold"
                mr={1}
              >
                {resultadoLojasP.toFixed(2)}
              </Typography>
              <img src={porcem} width={14} height={14} />
            </Box>
          </GradientBox>

          {/* Quantidade possuída */}
          <Box
            data-tooltip-id="tooltip-lojap-posse"
            data-tooltip-html="Quantidade total que você já possui desse imóvel"
            sx={{
              bgcolor: "#6411D9",
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
              borderRadius: "10px",
              border: "2px solid #F27405",
              position: "absolute",
              left: { xs: -20, sm: -24 },
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              color="white"
              fontWeight="bold"
              fontSize={{ xs: 12, sm: 16 }}
            >
              {dados.lojasP.quantidade}
            </Typography>
          </Box>

          {/* Tooltips globais */}
          <Tooltip style={tooltipStyle} id="tooltip-lojap-tipo" />
          <Tooltip style={tooltipStyle} id="tooltip-lojap-preco" />
          <Tooltip style={tooltipStyle} id="tooltip-lojap-total" />
          <Tooltip style={tooltipStyle} id="tooltip-lojap-comprar" />
          <Tooltip style={tooltipStyle} id="tooltip-lojap-diminuir" />
          <Tooltip style={tooltipStyle} id="tooltip-lojap-quantidade" />
          <Tooltip style={tooltipStyle} id="tooltip-lojap-aumentar" />
          <Tooltip style={tooltipStyle} id="tooltip-lojap-faturamento" />
          <Tooltip style={tooltipStyle} id="tooltip-lojap-rentabilidade" />
          <Tooltip style={tooltipStyle} id="tooltip-lojap-posse" />
        </Paper>

        {/* ===================== LOJAS MÉDIAS ===================== */}
        <Paper
          elevation={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 2,
            bgcolor: "#290064",
            borderRadius: "20px",
            mb: 2,
            minHeight: "20vh",
            maxWidth: 400,
            position: "relative",
            width: { xs: "90vw", sm: "60vw", md: "30vw", lg: "20vw" },
          }}
        >
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
            {/* Info */}
            <Box
              sx={{
                flexGrow: 1,
                mr: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <GradientBox>
                <Box
                  data-tooltip-id="tooltip-lojam-tipo"
                  data-tooltip-html="Tipo de construção usada como base para outros imóveis"
                >
                  <Typography
                    variant="subtitle1"
                    color="white"
                    fontWeight="bold"
                  >
                    Imóvel Médio
                  </Typography>
                </Box>
              </GradientBox>

              <Box
                sx={{ mt: 0.5, ml: 2.5 }}
                data-tooltip-id="tooltip-lojam-preco"
                data-tooltip-html="Preço unitário para construir um imóvel médio no terreno"
              >
                <Box
                  sx={{
                    bgcolor: "#6411D9",
                    borderRadius: "2px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 1,
                    py: 0.25,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    color="white"
                    fontWeight="bold"
                  >
                    Construção
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="white"
                    fontWeight="bold"
                  >
                    {formatarNumero(dados.lojasM.preçoConstrução)}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{ mt: 0.5, ml: 2.5 }}
                data-tooltip-id="tooltip-lojam-total"
                data-tooltip-html="Custo total considerando a quantidade escolhida"
              >
                <Box
                  sx={{
                    bgcolor: "#350973",
                    borderRadius: "5px",
                    height: { xs: 24, sm: 28 },
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="white"
                    fontWeight="bold"
                    fontSize={{ xs: 12, sm: 14 }}
                  >
                    Valor total
                  </Typography>
                  <Typography
                    variant="body2"
                    color="white"
                    fontWeight="bold"
                    fontSize={{ xs: 12, sm: 14 }}
                  >
                    {formatarNumero(
                      dados.lojasM.preçoConstrução * quantidadeLojasM
                    )}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Controles */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <Box
                data-tooltip-id="tooltip-lojam-comprar"
                data-tooltip-html="<div><p>Comprar imóvel médio</p><p style='margin-top:4px;'>Precisa de dois terrenos ou mais para construir</p></div>"
              >
                 <Box
                    style={getBotaoCompraStyle({
                      podeComprar: podeComprarLojaM,
                    })}
                    sx={{
                      // backgroundColor: "#F27405",
                      flexGrow: 1,
                      aspectRatio: "1",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      onClick={ComprarLojaM}
                      tipo="lojasP"
                      sx={{
                        width: { xs: 60, sm: 80 },
                        height: { xs: 60, sm: 80 },
                        borderRadius: "10px",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                        "&:active": { transform: "scale(0.95)" },
                      }}
                    >
                    <img
                      src={LojaMImg}
                      alt="loja média"
                      style={{ width: "60%", height: "60%" }}
                    />
                  </IconButton>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" mt={0.5}>
                <Box
                  data-tooltip-id="tooltip-lojam-diminuir"
                  data-tooltip-html="Diminuir quantidade"
                >
                  <IconButton
                    onClick={DiminuirQuantidadeLojasM}
                    sx={{
                      bgcolor: "#6411D9",
                      width: { xs: 24, sm: 28 },
                      height: { xs: 24, sm: 28 },
                      borderRadius: { xs: "4px", sm: "5px" },
                      "&:hover": { bgcolor: "#834EDB" },
                    }}
                  >
                    <img src={menos} width={12} height={12} />
                  </IconButton>
                </Box>

                <Box
                  data-tooltip-id="tooltip-lojam-quantidade"
                  data-tooltip-html="Quantidade selecionada"
                  sx={{
                    mx: 1,
                    bgcolor: "#350973",
                    width: { xs: 24, sm: 28 },
                    height: { xs: 24, sm: 28 },
                    borderRadius: { xs: "4px", sm: "5px" },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    color="white"
                    fontWeight="bold"
                    fontSize={{ xs: 12, sm: 14 }}
                  >
                    {quantidadeLojasM}
                  </Typography>
                </Box>

                <Box
                  data-tooltip-id="tooltip-lojam-aumentar"
                  data-tooltip-html="Aumentar quantidade"
                >
                  <IconButton
                    onClick={AumentarQuantidadeLojasM}
                    sx={{
                      bgcolor: "#6411D9",
                      width: { xs: 24, sm: 28 },
                      height: { xs: 24, sm: 28 },
                      borderRadius: { xs: "4px", sm: "5px" },
                      "&:hover": { bgcolor: "#834EDB" },
                    }}
                  >
                    <img src={mais} width={12} height={12} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Faturamento / Rentabilidade */}
          <GradientBox
            sx={{
              borderRadius: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 2,
              mt: 1,
              minHeight: 40,
            }}
          >
            <Box
              data-tooltip-id="tooltip-lojam-faturamento"
              data-tooltip-html="Valor faturado no dia anterior"
              display="flex"
              alignItems="center"
            >
              <img src={DolarImg} width={16} height={16} />
              <Typography
                variant="body1"
                color="white"
                fontWeight="bold"
                ml={1}
              >
                {dados.lojasM.faturamentoTotal.toLocaleString("pt-BR")}
              </Typography>
            </Box>
            <Box
              data-tooltip-id="tooltip-lojam-rentabilidade"
              data-tooltip-html="Rentabilidade atual do imóvel médio"
              display="flex"
              alignItems="center"
            >
              <Typography
                variant="body1"
                color="white"
                fontWeight="bold"
                mr={1}
              >
                {resultadoLojasM.toFixed(2)}
              </Typography>
              <img src={porcem} width={14} height={14} />
            </Box>
          </GradientBox>

          {/* Quantidade possuída */}
          <Box
            data-tooltip-id="tooltip-lojam-posse"
            data-tooltip-html="Quantidade total que você já possui desse imóvel"
            sx={{
              bgcolor: "#6411D9",
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
              borderRadius: "10px",
              border: "2px solid #F27405",
              position: "absolute",
              left: { xs: -20, sm: -24 },
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              color="white"
              fontWeight="bold"
              fontSize={{ xs: 12, sm: 16 }}
            >
              {dados.lojasM.quantidade}
            </Typography>
          </Box>

          {/* Tooltips globais */}
          <Tooltip style={tooltipStyle} id="tooltip-lojam-tipo" />
          <Tooltip style={tooltipStyle} id="tooltip-lojam-preco" />
          <Tooltip style={tooltipStyle} id="tooltip-lojam-total" />
          <Tooltip style={tooltipStyle} id="tooltip-lojam-comprar" />
          <Tooltip style={tooltipStyle} id="tooltip-lojam-diminuir" />
          <Tooltip style={tooltipStyle} id="tooltip-lojam-quantidade" />
          <Tooltip style={tooltipStyle} id="tooltip-lojam-aumentar" />
          <Tooltip style={tooltipStyle} id="tooltip-lojam-faturamento" />
          <Tooltip style={tooltipStyle} id="tooltip-lojam-rentabilidade" />
          <Tooltip style={tooltipStyle} id="tooltip-lojam-posse" />
        </Paper>

        {/* ===================== LOJAS GRANDES ===================== */}
        <Paper
          elevation={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 2,
            bgcolor: "#290064",
            borderRadius: "20px",
            mb: 2,
            minHeight: "20vh",
            maxWidth: 400,
            position: "relative",
            width: { xs: "90vw", sm: "60vw", md: "30vw", lg: "20vw" },
          }}
        >
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
            <Box
              sx={{
                flexGrow: 1,
                mr: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <GradientBox>
                <Box
                  data-tooltip-id="tooltip-lojag-tipo"
                  data-tooltip-html="Tipo de construção usada como base para outros imóveis"
                >
                  <Typography
                    variant="subtitle1"
                    color="white"
                    fontWeight="bold"
                  >
                    Imóvel Grande
                  </Typography>
                </Box>
              </GradientBox>

              <Box
                sx={{ mt: 0.5, ml: 2.5 }}
                data-tooltip-id="tooltip-lojag-preco"
                data-tooltip-html="Preço unitário para construir um imóvel grande no terreno"
              >
                <Box
                  sx={{
                    bgcolor: "#6411D9",
                    borderRadius: "2px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 1,
                    py: 0.25,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    color="white"
                    fontWeight="bold"
                  >
                    Construção
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="white"
                    fontWeight="bold"
                  >
                    {formatarNumero(dados.lojasG.preçoConstrução)}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{ mt: 0.5, ml: 2.5 }}
                data-tooltip-id="tooltip-lojag-total"
                data-tooltip-html="Custo total considerando a quantidade escolhida"
              >
                <Box
                  sx={{
                    bgcolor: "#350973",
                    borderRadius: "5px",
                    height: { xs: 24, sm: 28 },
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="white"
                    fontWeight="bold"
                    fontSize={{ xs: 12, sm: 14 }}
                  >
                    Valor total
                  </Typography>
                  <Typography
                    variant="body2"
                    color="white"
                    fontWeight="bold"
                    fontSize={{ xs: 12, sm: 14 }}
                  >
                    {formatarNumero(
                      dados.lojasG.preçoConstrução * quantidadeLojasG
                    )}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <Box
                data-tooltip-id="tooltip-lojag-comprar"
                data-tooltip-html="<div><p>Comprar imóvel grande</p><p style='margin-top:4px;'>Precisa de três terrenos ou mais para construir</p></div>"
              >
                 <Box
                    style={getBotaoCompraStyle({
                      podeComprar: podeComprarLojaG,
                    })}
                    sx={{
                      // backgroundColor: "#F27405",
                      flexGrow: 1,
                      aspectRatio: "1",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      onClick={ComprarLojaG}
                      tipo="lojasP"
                      sx={{
                        width: { xs: 60, sm: 80 },
                        height: { xs: 60, sm: 80 },
                        borderRadius: "10px",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                        "&:active": { transform: "scale(0.95)" },
                      }}
                    >
                    <img
                      src={LojaGImg}
                      alt="loja grande"
                      style={{ width: "60%", height: "60%" }}
                    />
                  </IconButton>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" mt={0.5}>
                <Box
                  data-tooltip-id="tooltip-lojag-diminuir"
                  data-tooltip-html="Diminuir quantidade"
                >
                  <IconButton
                    onClick={DiminuirQuantidadeLojasG}
                    sx={{
                      bgcolor: "#6411D9",
                      width: { xs: 24, sm: 28 },
                      height: { xs: 24, sm: 28 },
                      borderRadius: { xs: "4px", sm: "5px" },
                      "&:hover": { bgcolor: "#834EDB" },
                    }}
                  >
                    <img src={menos} width={12} height={12} />
                  </IconButton>
                </Box>

                <Box
                  data-tooltip-id="tooltip-lojag-quantidade"
                  data-tooltip-html="Quantidade selecionada"
                  sx={{
                    mx: 1,
                    bgcolor: "#350973",
                    width: { xs: 24, sm: 28 },
                    height: { xs: 24, sm: 28 },
                    borderRadius: { xs: "4px", sm: "5px" },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    color="white"
                    fontWeight="bold"
                    fontSize={{ xs: 12, sm: 14 }}
                  >
                    {quantidadeLojasG}
                  </Typography>
                </Box>

                <Box
                  data-tooltip-id="tooltip-lojag-aumentar"
                  data-tooltip-html="Aumentar quantidade"
                >
                  <IconButton
                    onClick={AumentarQuantidadeLojasG}
                    sx={{
                      bgcolor: "#6411D9",
                      width: { xs: 24, sm: 28 },
                      height: { xs: 24, sm: 28 },
                      borderRadius: { xs: "4px", sm: "5px" },
                      "&:hover": { bgcolor: "#834EDB" },
                    }}
                  >
                    <img src={mais} width={12} height={12} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Faturamento / Rentabilidade */}
          <GradientBox
            sx={{
              borderRadius: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 2,
              mt: 1,
              minHeight: 40,
            }}
          >
            <Box
              data-tooltip-id="tooltip-lojag-faturamento"
              data-tooltip-html="Valor faturado no dia anterior"
              display="flex"
              alignItems="center"
            >
              <img src={DolarImg} width={16} height={16} />
              <Typography
                variant="body1"
                color="white"
                fontWeight="bold"
                ml={1}
              >
                {dados.lojasG.faturamentoTotal.toLocaleString("pt-BR")}
              </Typography>
            </Box>
            <Box
              data-tooltip-id="tooltip-lojag-rentabilidade"
              data-tooltip-html="Rentabilidade atual do imóvel grande"
              display="flex"
              alignItems="center"
            >
              <Typography
                variant="body1"
                color="white"
                fontWeight="bold"
                mr={1}
              >
                {resultadoLojasG.toFixed(2)}
              </Typography>
              <img src={porcem} width={14} height={14} />
            </Box>
          </GradientBox>
          <Box
            data-tooltip-id="tooltip-lojag-posse"
            data-tooltip-html="Quantidade total que você já possui desse imóvel"
            sx={{
              bgcolor: "#6411D9",
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
              borderRadius: "10px",
              border: "2px solid #F27405",
              position: "absolute",
              left: { xs: -20, sm: -24 },
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              color="white"
              fontWeight="bold"
              fontSize={{ xs: 12, sm: 16 }}
            >
              {dados.lojasG.quantidade}
            </Typography>
          </Box>
          <Tooltip style={tooltipStyle} id="tooltip-lojag-tipo" />
          <Tooltip style={tooltipStyle} id="tooltip-lojag-preco" />
          <Tooltip style={tooltipStyle} id="tooltip-lojag-total" />
          <Tooltip style={tooltipStyle} id="tooltip-lojag-comprar" />
          <Tooltip style={tooltipStyle} id="tooltip-lojag-diminuir" />
          <Tooltip style={tooltipStyle} id="tooltip-lojag-quantidade" />
          <Tooltip style={tooltipStyle} id="tooltip-lojag-aumentar" />
          <Tooltip style={tooltipStyle} id="tooltip-lojag-faturamento" />
          <Tooltip style={tooltipStyle} id="tooltip-lojag-rentabilidade" />
          <Tooltip style={tooltipStyle} id="tooltip-lojag-posse" />
        </Paper>
      </div>
    );
  }
}

export function getBotaoCompraStyle({ podeComprar }) {
  return {
    backgroundColor: podeComprar ? "#F27405" : "#ebac75ff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: podeComprar ? "pointer" : "pointer",
    transition: "0.2s",
    opacity: podeComprar ? 1 : 0.7,
  };
}
