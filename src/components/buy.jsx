import React, { useState } from 'react'
import { useContext } from 'react'
import { CentraldeDadosContext } from '../centralDeDadosContext'
import terrenoImg from "../imagens/terreno.png"
import LojaPImg from "../imagens/lojaP.png"
import LojaMImg from "../imagens/lojaM.png"
import LojaGImg from "../imagens/lojaG.png"
import ConstuirImg from "../imagens/construir.png"
import DolarImg from "../imagens/simbolo-do-dolar.png"
import porcem from "../imagens/simbolo-de-porcentagem.png"
import mais from "../imagens/botao-de-simbolo-de-mais.png"
import menos from "../imagens/simbolo-de-menos.png"
import { Statistic } from './statistic'
import { Box, Grid, IconButton, Paper, Typography } from '@mui/material'
import { styled } from '@mui/system';
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";

export default function Buy() {

  const {
    dados, atualizarDados
  } = useContext(CentraldeDadosContext)

  const { economiaSetores, setEconomiaSetores,atualizarEco } = useContext(DadosEconomyGlobalContext);

  const teste = dados.terrenos.faturamentoTotal
  // console.log(teste)

  const { resultadoTerrenos, resultadoLojasP, resultadoLojasM, resultadoLojasG } = Statistic();

  const [quantidadeTerrenos, setQuantidadeTerrenos] = useState(1)
  const [quantidadeLojasP, setQuantidadeLojasP] = useState(1)
  const [quantidadeLojasM, setQuantidadeLojasM] = useState(1)
  const [quantidadeLojasG, setQuantidadeLojasG] = useState(1)


  const AumentarQuantidadeTerrenos = () => setQuantidadeTerrenos(quantidadeTerrenos + 1)
  const AumentarQuantidadeLojasP = () => setQuantidadeLojasP(quantidadeLojasP + 1)
  const AumentarQuantidadeLojasM = () => setQuantidadeLojasM(quantidadeLojasM + 1)
  const AumentarQuantidadeLojasG = () => setQuantidadeLojasG(quantidadeLojasG + 1)


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
    background: 'linear-gradient(to left, #6411D9, #F27405)',
    borderRadius: 5,
    padding: 8,
  });


  // Comprar Loja P
  const ComprarLojaP = () => {
    if (dados.terrenos.quantidade < (dados.lojasP.quantidadeNecTerreno * quantidadeLojasP)) {
      return alert("Você não tem terreno suficiente");
    }
    if (economiaSetores.saldo < (dados.lojasP.preçoConstrução * quantidadeLojasP)) {
      alert("Você não tem dinheiro suficiente para construir");
    } else {
      atualizarDados('lojasP', {
        ...dados.lojasP,
        quantidade: dados.lojasP.quantidade + quantidadeLojasP
      });
      atualizarDados('terrenos', {
        ...dados.terrenos,
        quantidade: dados.terrenos.quantidade - (dados.lojasP.quantidadeNecTerreno * quantidadeLojasP)
      });
      atualizarEco('saldo', economiaSetores.saldo - (dados.lojasP.preçoConstrução * quantidadeLojasP));
    }
  };

  // Comprar Loja M
  const ComprarLojaM = () => {
    if (dados.terrenos.quantidade < (dados.lojasM.quantidadeNecTerreno * quantidadeLojasM)) {
      return alert("Você não tem terrenos suficientes");
    }
    if (economiaSetores.saldo < (dados.lojasM.preçoConstrução * quantidadeLojasM)) {
      alert("Você não tem dinheiro suficiente para construir");
    } else {
      atualizarDados('lojasM', {
        ...dados.lojasM,
        quantidade: dados.lojasM.quantidade + quantidadeLojasM
      });
      atualizarDados('terrenos', {
        ...dados.terrenos,
        quantidade: dados.terrenos.quantidade - (dados.lojasM.quantidadeNecTerreno * quantidadeLojasM)
      });
      atualizarEco('saldo', economiaSetores.saldo - (dados.lojasM.preçoConstrução * quantidadeLojasM));
    }
  };

  // Comprar Loja G
  const ComprarLojaG = () => {
    if (dados.terrenos.quantidade < (dados.lojasG.quantidadeNecTerreno * quantidadeLojasG)) {
      return alert("Você não tem terrenos suficientes");
    }
    if (economiaSetores.saldo < (dados.lojasG.preçoConstrução * quantidadeLojasG)) {
      alert("Você não tem dinheiro suficiente para construir");
    } else {
      atualizarDados('lojasG', {
        ...dados.lojasG,
        quantidade: dados.lojasG.quantidade + quantidadeLojasG
      });
      atualizarDados('terrenos', {
        ...dados.terrenos,
        quantidade: dados.terrenos.quantidade - (dados.lojasG.quantidadeNecTerreno * quantidadeLojasG)
      });
      atualizarEco('saldo', economiaSetores.saldo - (dados.lojasG.preçoConstrução * quantidadeLojasG));
    }
  };

  // Comprar Terreno
  const ComprarTerreno = () => {
    if (economiaSetores.saldo < (dados.terrenos.preçoConstrução * quantidadeTerrenos)) {
      alert("Você não tem dinheiro suficiente");
    } else {
      atualizarDados('terrenos', {
        ...dados.terrenos,
        quantidade: dados.terrenos.quantidade + quantidadeTerrenos
      });
      atualizarEco('saldo', economiaSetores.saldo - (dados.terrenos.preçoConstrução * quantidadeTerrenos));
    }
  };

  const formatarNumero = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(1).replace('.0', '') + 'T'; // Trilhões
    if (num >= 1e9) return (num / 1e9).toFixed(1).replace('.0', '') + 'B';   // Bilhões
    if (num >= 1e6) return (num / 1e6).toFixed(1).replace('.0', '') + 'M';   // Milhões
    if (num >= 1e3) return (num / 1e3).toFixed(1).replace('.0', '') + 'K';   // Milhares
    return num.toString();
  };
  if (dados.dia > 269) {


return (
  <div className="flex justify-around flex-col w-full">

    {/* ===================== TERRENOS ===================== */}
    <Paper
      elevation={6}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        bgcolor: '#290064',
        borderRadius: '20px',
        mb: 2,
        minHeight: '20vh',
        maxWidth: 400,
        position: 'relative',
        width: { xs: '90vw', sm: '60vw', md: '30vw', lg: '20vw' },
      }}
    >
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}>
        {/* Info */}
        <Box sx={{ flexGrow: 1, mr: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <GradientBox>
            <Typography variant="subtitle1" color="white" fontWeight="bold">
              Terrenos
            </Typography>
          </GradientBox>
          <Box sx={{ mt: 0.5, ml: 2.5 }}>
            <Box sx={{ bgcolor: '#6411D9', borderRadius: '2px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1, py: 0.25 }}>
              <Typography variant="subtitle1" color="white" fontWeight="bold">Construção</Typography>
              <Typography variant="subtitle1" color="white" fontWeight="bold">{formatarNumero(dados.terrenos.preçoConstrução)}</Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 0.5, ml: 2.5, bgcolor: '#350973', borderRadius: '5px', height: { xs: 24, sm: 28 }, display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1 }}>
            <Typography variant="body2" color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 14 }}>Valor total</Typography>
            <Typography variant="body2" color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 14 }}>{formatarNumero(dados.terrenos.preçoConstrução * quantidadeTerrenos)}</Typography>
          </Box>
        </Box>

        {/* Controles */}
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
          <Box sx={{ backgroundColor: '#F27405', flexGrow: 1, aspectRatio: '1', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton onClick={ComprarTerreno} sx={{ width: { xs: 60, sm: 80 }, height: { xs: 60, sm: 80 }, borderRadius: '10px', '&:hover': { backgroundColor: '#E56100', transform: 'scale(1.05)' }, '&:active': { transform: 'scale(0.95)' } }}>
              <img src={terrenoImg} alt="terreno" style={{ width: '60%', height: '60%' }} />
            </IconButton>
          </Box>
          <Box display="flex" alignItems="center" mt={0.5}>
            <IconButton onClick={DiminuirQuantidadeTerrenos} sx={{ bgcolor: '#6411D9', width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: '4px', sm: '5px' }, '&:hover': { bgcolor: '#834EDB' } }}>
              <img src={menos} width={12} height={12} />
            </IconButton>
            <Box sx={{ mx: 1, bgcolor: '#350973', width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: '4px', sm: '5px' }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 14 }}>{quantidadeTerrenos}</Typography>
            </Box>
            <IconButton onClick={AumentarQuantidadeTerrenos} sx={{ bgcolor: '#6411D9', width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: '4px', sm: '5px' }, '&:hover': { bgcolor: '#834EDB' } }}>
              <img src={mais} width={12} height={12} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Quantidade Disponível */}
      <Box sx={{ bgcolor: '#6411D9', width: { xs: 40, sm: 48 }, height: { xs: 40, sm: 48 }, borderRadius: '10px', border: '2px solid #F27405', position: 'absolute', left: { xs: -20, sm: -24 }, top: '50%', transform: 'translateY(-50%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 16 }}>{dados.terrenos.quantidade}</Typography>
      </Box>
    </Paper>

    {/* ===================== LOJAS PEQUENAS ===================== */}
    <Paper
      elevation={6}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        bgcolor: '#290064',
        borderRadius: '20px',
        mb: 2,
        minHeight: '20vh',
        maxWidth: 400,
        position: 'relative',
        width: { xs: '90vw', sm: '60vw', md: '30vw', lg: '20vw' },
      }}
    >
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}>
        {/* Info */}
        <Box sx={{ flexGrow: 1, mr: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <GradientBox>
            <Typography variant="subtitle1" color="white" fontWeight="bold">Lojas Pequenas</Typography>
          </GradientBox>
          <Box sx={{ mt: 0.5, ml: 2.5 }}>
            <Box sx={{ bgcolor: '#6411D9', borderRadius: '2px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1, py: 0.25 }}>
              <Typography variant="subtitle1" color="white" fontWeight="bold">Construção</Typography>
              <Typography variant="subtitle1" color="white" fontWeight="bold">{formatarNumero(dados.lojasP.preçoConstrução)}</Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 0.5, ml: 2.5, bgcolor: '#350973', borderRadius: '5px', height: { xs: 24, sm: 28 }, display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1 }}>
            <Typography variant="body2" color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 14 }}>Valor total</Typography>
            <Typography variant="body2" color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 14 }}>{formatarNumero(dados.lojasP.preçoConstrução * quantidadeLojasP)}</Typography>
          </Box>
        </Box>

        {/* Controles */}
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
          <Box sx={{ backgroundColor: '#F27405', flexGrow: 1, aspectRatio: '1', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton onClick={ComprarLojaP} sx={{ width: { xs: 60, sm: 80 }, height: { xs: 60, sm: 80 }, borderRadius: '10px', '&:hover': { backgroundColor: '#E56100', transform: 'scale(1.05)' }, '&:active': { transform: 'scale(0.95)' } }}>
              <img src={LojaPImg} alt="loja pequena" style={{ width: '60%', height: '60%' }} />
            </IconButton>
          </Box>
          <Box display="flex" alignItems="center" mt={0.5}>
            <IconButton onClick={DiminuirQuantidadeLojasP} sx={{ bgcolor: '#6411D9', width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: '4px', sm: '5px' }, '&:hover': { bgcolor: '#834EDB' } }}>
              <img src={menos} width={12} height={12} />
            </IconButton>
            <Box sx={{ mx: 1, bgcolor: '#350973', width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: '4px', sm: '5px' }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 14 }}>{quantidadeLojasP}</Typography>
            </Box>
            <IconButton onClick={AumentarQuantidadeLojasP} sx={{ bgcolor: '#6411D9', width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: '4px', sm: '5px' }, '&:hover': { bgcolor: '#834EDB' } }}>
              <img src={mais} width={12} height={12} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box sx={{ bgcolor: '#6411D9', width: { xs: 40, sm: 48 }, height: { xs: 40, sm: 48 }, borderRadius: '10px', border: '2px solid #F27405', position: 'absolute', left: { xs: -20, sm: -24 }, top: '50%', transform: 'translateY(-50%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 16 }}>{dados.lojasP.quantidade}</Typography>
      </Box>
    </Paper>

    {/* ===================== LOJAS MÉDIAS ===================== */}
    <Paper
      elevation={6}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        bgcolor: '#290064',
        borderRadius: '20px',
        mb: 2,
        minHeight: '20vh',
        maxWidth: 400,
        position: 'relative',
        width: { xs: '90vw', sm: '60vw', md: '30vw', lg: '20vw' },
      }}
    >
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}>
        {/* Info */}
        <Box sx={{ flexGrow: 1, mr: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <GradientBox>
            <Typography variant="subtitle1" color="white" fontWeight="bold">Lojas Médias</Typography>
          </GradientBox>
          <Box sx={{ mt: 0.5, ml: 2.5 }}>
            <Box sx={{ bgcolor: '#6411D9', borderRadius: '2px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1, py: 0.25 }}>
              <Typography variant="subtitle1" color="white" fontWeight="bold">Construção</Typography>
              <Typography variant="subtitle1" color="white" fontWeight="bold">{formatarNumero(dados.lojasM.preçoConstrução)}</Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 0.5, ml: 2.5, bgcolor: '#350973', borderRadius: '5px', height: { xs: 24, sm: 28 }, display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1 }}>
            <Typography variant="body2" color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 14 }}>Valor total</Typography>
            <Typography variant="body2" color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 14 }}>{formatarNumero(dados.lojasM.preçoConstrução * quantidadeLojasM)}</Typography>
          </Box>
        </Box>

        {/* Controles */}
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
          <Box sx={{ backgroundColor: '#F27405', flexGrow: 1, aspectRatio: '1', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton onClick={ComprarLojaM} sx={{ width: { xs: 60, sm: 80 }, height: { xs: 60, sm: 80 }, borderRadius: '10px', '&:hover': { backgroundColor: '#E56100', transform: 'scale(1.05)' }, '&:active': { transform: 'scale(0.95)' } }}>
              <img src={LojaMImg} alt="loja média" style={{ width: '60%', height: '60%' }} />
            </IconButton>
          </Box>
          <Box display="flex" alignItems="center" mt={0.5}>
            <IconButton onClick={DiminuirQuantidadeLojasM} sx={{ bgcolor: '#6411D9', width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: '4px', sm: '5px' }, '&:hover': { bgcolor: '#834EDB' } }}>
              <img src={menos} width={12} height={12} />
            </IconButton>
            <Box sx={{ mx: 1, bgcolor: '#350973', width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: '4px', sm: '5px' }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 14 }}>{quantidadeLojasM}</Typography>
            </Box>
            <IconButton onClick={AumentarQuantidadeLojasM} sx={{ bgcolor: '#6411D9', width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: '4px', sm: '5px' }, '&:hover': { bgcolor: '#834EDB' } }}>
              <img src={mais} width={12} height={12} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box sx={{ bgcolor: '#6411D9', width: { xs: 40, sm: 48 }, height: { xs: 40, sm: 48 }, borderRadius: '10px', border: '2px solid #F27405', position: 'absolute', left: { xs: -20, sm: -24 }, top: '50%', transform: 'translateY(-50%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 16 }}>{dados.lojasM.quantidade}</Typography>
      </Box>
    </Paper>

    {/* ===================== LOJAS GRANDES ===================== */}
    <Paper
      elevation={6}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        bgcolor: '#290064',
        borderRadius: '20px',
        mb: 2,
        minHeight: '20vh',
        maxWidth: 400,
        position: 'relative',
        width: { xs: '90vw', sm: '60vw', md: '30vw', lg: '20vw' },
      }}
    >
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}>
        {/* Info */}
        <Box sx={{ flexGrow: 1, mr: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <GradientBox>
            <Typography variant="subtitle1" color="white" fontWeight="bold">Lojas Grandes</Typography>
          </GradientBox>
          <Box sx={{ mt: 0.5, ml: 2.5 }}>
            <Box sx={{ bgcolor: '#6411D9', borderRadius: '2px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1, py: 0.25 }}>
              <Typography variant="subtitle1" color="white" fontWeight="bold">Construção</Typography>
              <Typography variant="subtitle1" color="white" fontWeight="bold">{formatarNumero(dados.lojasG.preçoConstrução)}</Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 0.5, ml: 2.5, bgcolor: '#350973', borderRadius: '5px', height: { xs: 24, sm: 28 }, display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1 }}>
            <Typography variant="body2" color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 14 }}>Valor total</Typography>
            <Typography variant="body2" color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 14 }}>{formatarNumero(dados.lojasG.preçoConstrução * quantidadeLojasG)}</Typography>
          </Box>
        </Box>

        {/* Controles */}
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
          <Box sx={{ backgroundColor: '#F27405', flexGrow: 1, aspectRatio: '1', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton onClick={ComprarLojaG} sx={{ width: { xs: 60, sm: 80 }, height: { xs: 60, sm: 80 }, borderRadius: '10px', '&:hover': { backgroundColor: '#E56100', transform: 'scale(1.05)' }, '&:active': { transform: 'scale(0.95)' } }}>
              <img src={LojaGImg} alt="loja grande" style={{ width: '60%', height: '60%' }} />
            </IconButton>
          </Box>
          <Box display="flex" alignItems="center" mt={0.5}>
            <IconButton onClick={DiminuirQuantidadeLojasG} sx={{ bgcolor: '#6411D9', width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: '4px', sm: '5px' }, '&:hover': { bgcolor: '#834EDB' } }}>
              <img src={menos} width={12} height={12} />
            </IconButton>
            <Box sx={{ mx: 1, bgcolor: '#350973', width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: '4px', sm: '5px' }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 14 }}>{quantidadeLojasG}</Typography>
            </Box>
            <IconButton onClick={AumentarQuantidadeLojasG} sx={{ bgcolor: '#6411D9', width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, borderRadius: { xs: '4px', sm: '5px' }, '&:hover': { bgcolor: '#834EDB' } }}>
              <img src={mais} width={12} height={12} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box sx={{ bgcolor: '#6411D9', width: { xs: 40, sm: 48 }, height: { xs: 40, sm: 48 }, borderRadius: '10px', border: '2px solid #F27405', position: 'absolute', left: { xs: -20, sm: -24 }, top: '50%', transform: 'translateY(-50%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography color="white" fontWeight="bold" fontSize={{ xs: 12, sm: 16 }}>{dados.lojasG.quantidade}</Typography>
      </Box>
    </Paper>

  </div>
)

  } else {
return (
  <div className="flex justify-around flex-col w-full">

    {/* ===================== TERRENOS ===================== */}
    <Paper
      elevation={6}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        bgcolor: '#290064',
        borderRadius: '20px',
        mb: 2,
        minHeight: '20vh',
        maxWidth: 400,
        position: 'relative',
        width: { xs: '90vw', sm: '60vw', md: '30vw', lg: '20vw' },
      }}
    >
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ flexGrow: 1, mr: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <GradientBox>
            <Typography variant="subtitle1" color="white" fontWeight="bold">Terrenos</Typography>
          </GradientBox>
          <Box sx={{ mt: 0.5 }}>
            <Box sx={{ bgcolor: '#6411D9', borderRadius: '2px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1, py: 0.25 }}>
              <Typography variant="body2" color="white" fontWeight="bold">Construção</Typography>
              <Typography variant="body2" color="white" fontWeight="bold">{formatarNumero(dados.terrenos.preçoConstrução)}</Typography>
            </Box>
          </Box>
          <Box sx={{ bgcolor: '#350973', borderRadius: '5px', height: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1 }}>
            <Typography variant="body2" color="white" fontWeight="bold">Valor total</Typography>
            <Typography variant="body2" color="white" fontWeight="bold">{formatarNumero(dados.terrenos.preçoConstrução * quantidadeTerrenos)}</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
          <Box sx={{ backgroundColor: '#F27405', flexGrow: 1, aspectRatio: '1', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton onClick={ComprarTerreno} sx={{ width: '100%', height: '100%', borderRadius: '10px', '&:hover': { backgroundColor: '#E56100', transform: 'scale(1.05)' }, '&:active': { transform: 'scale(0.95)' } }}>
              <img src={terrenoImg} alt="terreno" width="40" height="40" />
            </IconButton>
          </Box>
          <Box display="flex" alignItems="center" mt={0.5}>
            <IconButton onClick={DiminuirQuantidadeTerrenos} sx={{ bgcolor: '#6411D9', width: 28, height: 28, borderRadius: '5px', '&:hover': { bgcolor: '#834EDB' } }}>
              <img src={menos} width={14} height={14} />
            </IconButton>
            <Box sx={{ mx: 1, bgcolor: '#350973', width: 28, height: 28, borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="body2" color="white" fontWeight="bold">{quantidadeTerrenos}</Typography>
            </Box>
            <IconButton onClick={AumentarQuantidadeTerrenos} sx={{ bgcolor: '#6411D9', width: 28, height: 28, borderRadius: '5px', '&:hover': { bgcolor: '#834EDB' } }}>
              <img src={mais} width={14} height={14} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <GradientBox sx={{ borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, mt: 1, minHeight: 40 }}>
        <Box display="flex" alignItems="center">
          <img src={DolarImg} width={16} height={16} />
          <Typography variant="body1" color="white" fontWeight="bold" ml={1}>{dados.terrenos.faturamentoTotal.toLocaleString('pt-BR')}</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography variant="body1" color="white" fontWeight="bold" mr={1}>{resultadoTerrenos.toFixed(2)}</Typography>
          <img src={porcem} width={14} height={14} />
        </Box>
      </GradientBox>

      <Box sx={{ bgcolor: '#6411D9', width: 48, height: 48, borderRadius: '10px', border: '2px solid #F27405', position: 'absolute', left: -24, top: '50%', transform: 'translateY(-50%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography color="white" fontWeight="bold">{dados.terrenos.quantidade}</Typography>
      </Box>
    </Paper>

    {/* ===================== LOJAS PEQUENAS ===================== */}
    <Paper elevation={6} sx={{ display: 'flex', flexDirection: 'column', p: 2, bgcolor: '#290064', borderRadius: '20px', mb: 2, minHeight: '20vh', maxWidth: 400, position: 'relative', width: { xs: '90vw', sm: '60vw', md: '30vw', lg: '20vw' } }}>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ flexGrow: 1, mr: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <GradientBox>
            <Typography variant="subtitle1" color="white" fontWeight="bold">Lojas Pequenas</Typography>
          </GradientBox>
          <Box sx={{ mt: 0.5 }}>
            <Box sx={{ bgcolor: '#6411D9', borderRadius: '2px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1, py: 0.25 }}>
              <Typography variant="body2" color="white" fontWeight="bold">Construção</Typography>
              <Typography variant="body2" color="white" fontWeight="bold">{formatarNumero(dados.lojasP.preçoConstrução)}</Typography>
            </Box>
          </Box>
          <Box sx={{ bgcolor: '#350973', borderRadius: '5px', height: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1 }}>
            <Typography variant="body2" color="white" fontWeight="bold">Valor total</Typography>
            <Typography variant="body2" color="white" fontWeight="bold">{formatarNumero(dados.lojasP.preçoConstrução * quantidadeLojasP)}</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
          <Box sx={{ backgroundColor: '#F27405', flexGrow: 1, aspectRatio: '1', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton onClick={ComprarLojaP} sx={{ width: '100%', height: '100%', borderRadius: '10px', '&:hover': { backgroundColor: '#E56100', transform: 'scale(1.05)' }, '&:active': { transform: 'scale(0.95)' } }}>
              <img src={LojaPImg} alt="loja pequena" width="40" height="40" />
            </IconButton>
          </Box>
          <Box display="flex" alignItems="center" mt={0.5}>
            <IconButton onClick={DiminuirQuantidadeLojasP} sx={{ bgcolor: '#6411D9', width: 28, height: 28, borderRadius: '5px', '&:hover': { bgcolor: '#834EDB' } }}>
              <img src={menos} width={14} height={14} />
            </IconButton>
            <Box sx={{ mx: 1, bgcolor: '#350973', width: 28, height: 28, borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="body2" color="white" fontWeight="bold">{quantidadeLojasP}</Typography>
            </Box>
            <IconButton onClick={AumentarQuantidadeLojasP} sx={{ bgcolor: '#6411D9', width: 28, height: 28, borderRadius: '5px', '&:hover': { bgcolor: '#834EDB' } }}>
              <img src={mais} width={14} height={14} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <GradientBox sx={{ borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, mt: 1, minHeight: 40 }}>
        <Box display="flex" alignItems="center">
          <img src={DolarImg} width={16} height={16} />
          <Typography variant="body1" color="white" fontWeight="bold" ml={1}>{dados.lojasP.faturamentoTotal.toLocaleString('pt-BR')}</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography variant="body1" color="white" fontWeight="bold" mr={1}>{resultadoLojasP.toFixed(2)}</Typography>
          <img src={porcem} width={14} height={14} />
        </Box>
      </GradientBox>

      <Box sx={{ bgcolor: '#6411D9', width: 48, height: 48, borderRadius: '10px', border: '2px solid #F27405', position: 'absolute', left: -24, top: '50%', transform: 'translateY(-50%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography color="white" fontWeight="bold">{dados.lojasP.quantidade}</Typography>
      </Box>
    </Paper>

    {/* ===================== LOJAS MÉDIAS ===================== */}
    <Paper elevation={6} sx={{ display: 'flex', flexDirection: 'column', p: 2, bgcolor: '#290064', borderRadius: '20px', mb: 2, minHeight: '20vh', maxWidth: 400, position: 'relative', width: { xs: '90vw', sm: '60vw', md: '30vw', lg: '20vw' } }}>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ flexGrow: 1, mr: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <GradientBox>
            <Typography variant="subtitle1" color="white" fontWeight="bold">Lojas Médias</Typography>
          </GradientBox>
          <Box sx={{ mt: 0.5 }}>
            <Box sx={{ bgcolor: '#6411D9', borderRadius: '2px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1, py: 0.25 }}>
              <Typography variant="body2" color="white" fontWeight="bold">Construção</Typography>
              <Typography variant="body2" color="white" fontWeight="bold">{formatarNumero(dados.lojasM.preçoConstrução)}</Typography>
            </Box>
          </Box>
          <Box sx={{ bgcolor: '#350973', borderRadius: '5px', height: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1 }}>
            <Typography variant="body2" color="white" fontWeight="bold">Valor total</Typography>
            <Typography variant="body2" color="white" fontWeight="bold">{formatarNumero(dados.lojasM.preçoConstrução * quantidadeLojasM)}</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
          <Box sx={{ backgroundColor: '#F27405', flexGrow: 1, aspectRatio: '1', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton onClick={ComprarLojaM} sx={{ width: '100%', height: '100%', borderRadius: '10px', '&:hover': { backgroundColor: '#E56100', transform: 'scale(1.05)' }, '&:active': { transform: 'scale(0.95)' } }}>
              <img src={LojaMImg} alt="loja média" width="40" height="40" />
            </IconButton>
          </Box>
          <Box display="flex" alignItems="center" mt={0.5}>
            <IconButton onClick={DiminuirQuantidadeLojasM} sx={{ bgcolor: '#6411D9', width: 28, height: 28, borderRadius: '5px', '&:hover': { bgcolor: '#834EDB' } }}>
              <img src={menos} width={14} height={14} />
            </IconButton>
            <Box sx={{ mx: 1, bgcolor: '#350973', width: 28, height: 28, borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="body2" color="white" fontWeight="bold">{quantidadeLojasM}</Typography>
            </Box>
            <IconButton onClick={AumentarQuantidadeLojasM} sx={{ bgcolor: '#6411D9', width: 28, height: 28, borderRadius: '5px', '&:hover': { bgcolor: '#834EDB' } }}>
              <img src={mais} width={14} height={14} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <GradientBox sx={{ borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, mt: 1, minHeight: 40 }}>
        <Box display="flex" alignItems="center">
          <img src={DolarImg} width={16} height={16} />
          <Typography variant="body1" color="white" fontWeight="bold" ml={1}>{dados.lojasM.faturamentoTotal.toLocaleString('pt-BR')}</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography variant="body1" color="white" fontWeight="bold" mr={1}>{resultadoLojasM.toFixed(2)}</Typography>
          <img src={porcem} width={14} height={14} />
        </Box>
      </GradientBox>

      <Box sx={{ bgcolor: '#6411D9', width: 48, height: 48, borderRadius: '10px', border: '2px solid #F27405', position: 'absolute', left: -24, top: '50%', transform: 'translateY(-50%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography color="white" fontWeight="bold">{dados.lojasM.quantidade}</Typography>
      </Box>
    </Paper>

    {/* ===================== LOJAS GRANDES ===================== */}
    <Paper elevation={6} sx={{ display: 'flex', flexDirection: 'column', p: 2, bgcolor: '#290064', borderRadius: '20px', mb: 2, minHeight: '20vh', maxWidth: 400, position: 'relative', width: { xs: '90vw', sm: '60vw', md: '30vw', lg: '20vw' } }}>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ flexGrow: 1, mr: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <GradientBox>
            <Typography variant="subtitle1" color="white" fontWeight="bold">Lojas Grandes</Typography>
          </GradientBox>
          <Box sx={{ mt: 0.5 }}>
            <Box sx={{ bgcolor: '#6411D9', borderRadius: '2px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1, py: 0.25 }}>
              <Typography variant="body2" color="white" fontWeight="bold">Construção</Typography>
              <Typography variant="body2" color="white" fontWeight="bold">{formatarNumero(dados.lojasG.preçoConstrução)}</Typography>
            </Box>
          </Box>
          <Box sx={{ bgcolor: '#350973', borderRadius: '5px', height: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1 }}>
            <Typography variant="body2" color="white" fontWeight="bold">Valor total</Typography>
            <Typography variant="body2" color="white" fontWeight="bold">{formatarNumero(dados.lojasG.preçoConstrução * quantidadeLojasG)}</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
          <Box sx={{ backgroundColor: '#F27405', flexGrow: 1, aspectRatio: '1', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton onClick={ComprarLojaG} sx={{ width: '100%', height: '100%', borderRadius: '10px', '&:hover': { backgroundColor: '#E56100', transform: 'scale(1.05)' }, '&:active': { transform: 'scale(0.95)' } }}>
              <img src={LojaGImg} alt="loja grande" width="40" height="40" />
            </IconButton>
          </Box>
          <Box display="flex" alignItems="center" mt={0.5}>
            <IconButton onClick={DiminuirQuantidadeLojasG} sx={{ bgcolor: '#6411D9', width: 28, height: 28, borderRadius: '5px', '&:hover': { bgcolor: '#834EDB' } }}>
              <img src={menos} width={14} height={14} />
            </IconButton>
            <Box sx={{ mx: 1, bgcolor: '#350973', width: 28, height: 28, borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="body2" color="white" fontWeight="bold">{quantidadeLojasG}</Typography>
            </Box>
            <IconButton onClick={AumentarQuantidadeLojasG} sx={{ bgcolor: '#6411D9', width: 28, height: 28, borderRadius: '5px', '&:hover': { bgcolor: '#834EDB' } }}>
              <img src={mais} width={14} height={14} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <GradientBox sx={{ borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, mt: 1, minHeight: 40 }}>
        <Box display="flex" alignItems="center">
          <img src={DolarImg} width={16} height={16} />
          <Typography variant="body1" color="white" fontWeight="bold" ml={1}>{dados.lojasG.faturamentoTotal.toLocaleString('pt-BR')}</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography variant="body1" color="white" fontWeight="bold" mr={1}>{resultadoLojasG.toFixed(2)}</Typography>
          <img src={porcem} width={14} height={14} />
        </Box>
      </GradientBox>

      <Box sx={{ bgcolor: '#6411D9', width: 48, height: 48, borderRadius: '10px', border: '2px solid #F27405', position: 'absolute', left: -24, top: '50%', transform: 'translateY(-50%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography color="white" fontWeight="bold">{dados.lojasG.quantidade}</Typography>
      </Box>
    </Paper>

  </div>
)

  }
}