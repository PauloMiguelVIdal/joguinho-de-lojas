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


export default function Buy() {

  const {
    dados, atualizarDados
  } = useContext(CentraldeDadosContext)
  const teste = dados.terrenos.faturamentoTotal
  console.log(teste)

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
    if (dados.saldo < (dados.lojasP.quantidadeNecTerreno * quantidadeLojasP)) {
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
      atualizarDados('saldo', dados.saldo - (dados.lojasP.preçoConstrução * quantidadeLojasP));
    }
  };

  // Comprar Loja M
  const ComprarLojaM = () => {
    if (dados.terrenos.quantidade < (dados.lojasM.quantidadeNecTerreno * quantidadeLojasM)) {
      return alert("Você não tem terrenos suficientes");
    }
    if (dados.saldo < (dados.lojasM.quantidadeNecTerreno * quantidadeLojasM)) {
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
      atualizarDados('saldo', dados.saldo - (dados.lojasM.preçoConstrução * quantidadeLojasM));
    }
  };

  // Comprar Loja G
  const ComprarLojaG = () => {
    if (dados.terrenos.quantidade < (dados.lojasG.quantidadeNecTerreno * quantidadeLojasG)) {
      return alert("Você não tem terrenos suficientes");
    }
    if (dados.saldo < (dados.lojasG.preçoConstrução * quantidadeLojasG)) {
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
      atualizarDados('saldo', dados.saldo - (dados.lojasG.preçoConstrução * quantidadeLojasG));
    }
  };

  // Comprar Terreno
  const ComprarTerreno = () => {
    if (dados.saldo < (dados.terrenos.preçoConstrução * quantidadeTerrenos)) {
      alert("Você não tem dinheiro suficiente");
    } else {
      atualizarDados('terrenos', {
        ...dados.terrenos,
        quantidade: dados.terrenos.quantidade + quantidadeTerrenos
      });
      atualizarDados('saldo', dados.saldo - (dados.terrenos.preçoConstrução * quantidadeTerrenos));
    }
  };

  const formatarNumero = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(1).replace('.0', '') + 'T'; // Trilhões
    if (num >= 1e9) return (num / 1e9).toFixed(1).replace('.0', '') + 'B';   // Bilhões
    if (num >= 1e6) return (num / 1e6).toFixed(1).replace('.0', '') + 'M';   // Milhões
    if (num >= 1e3) return (num / 1e3).toFixed(1).replace('.0', '') + 'K';   // Milhares
    return num.toString();
  };
  if (dados.dia > 252) {


    return (

      <div className="flex justify-around flex-col w-full">
        {/* Container de Terrenos */}

        <Paper
          elevation={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            bgcolor: '#290064',
            borderRadius: '20px',
            mb: 2,
            height: '22vh',
            maxWidth: 400,
            position: 'relative',
            width: { xs: '90vw', sm: '60vw', md: '30vw', lg: '20vw' },
          }}
        >

          {/* 🔷 Bloco Principal: Parte Superior */}
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}>

            {/* 🟨 Bloco A — Controles de Compra */}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
              {/* Ícone grande de ação */}
              <Box
                sx={{
                  backgroundColor: '#F27405',
                  height: '60%',
                  aspectRatio: '1',
                  borderRadius: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <IconButton
                  onClick={ComprarTerreno}
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '10px',
                    '&:hover': { backgroundColor: '#E56100', transform: 'scale(1.05)' },
                    '&:active': { transform: 'scale(0.95)' },
                  }}
                >
                  <img src={terrenoImg} alt="terreno" width="50" height="50" />
                </IconButton>
              </Box>

              {/* Controles de quantidade */}
              <Box display="flex" alignItems="center" mt={1}>
                <IconButton
                  onClick={DiminuirQuantidadeTerrenos}
                  sx={{
                    bgcolor: '#6411D9',
                    width: 32,
                    height: 32,
                    borderRadius: '5px',
                    '&:hover': { bgcolor: '#834EDB' },
                  }}
                >
                  <img src={menos} width={16} height={16} />
                </IconButton>
                <Box
                  sx={{
                    mx: 1,
                    bgcolor: '#350973',
                    width: 32,
                    height: 32,
                    borderRadius: '5px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body1" color="white" fontWeight="bold">
                    {quantidadeTerrenos}
                  </Typography>
                </Box>
                <IconButton
                  onClick={AumentarQuantidadeTerrenos}
                  sx={{
                    bgcolor: '#6411D9',
                    width: 32,
                    height: 32,
                    borderRadius: '5px',
                    '&:hover': { bgcolor: '#834EDB' },
                  }}
                >
                  <img src={mais} width={16} height={16} />
                </IconButton>
              </Box>
            </Box>

            {/* 🟩 Bloco B — Informações Principais */}
            <Box
              sx={{
                flexGrow: 1,
                ml: 2,
                mr: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Título */}
              <GradientBox>
                <Typography variant="h6" color="white" fontWeight="bold">
                  Terrenos
                </Typography>
              </GradientBox>

              {/* Preço unitário */}
              <Box sx={{ mt: 1 }}>
                <Box
                  sx={{
                    bgcolor: '#6411D9',
                    borderRadius: '2px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 1,
                    py: 0.5,
                  }}
                >
                  <Typography variant="body2" color="white" fontWeight="bold">
                    Construção
                  </Typography>
                  <Typography variant="body2" color="white" fontWeight="bold">
                    {formatarNumero(dados.terrenos.preçoConstrução)}
                  </Typography>
                </Box>
              </Box>

              {/* Valor total */}
              <Box
                sx={{
                  bgcolor: '#350973',
                  borderRadius: '5px',
                  height: 32,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  px: 1,
                }}
              >
                <Typography variant="body2" color="white" fontWeight="bold">
                  Valor total
                </Typography>
                <Typography variant="body2" color="white" fontWeight="bold">
                  {formatarNumero(dados.terrenos.preçoConstrução * quantidadeTerrenos)}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* 🟥 Bloco C — Faturamento e Percentual */}
          <GradientBox
            sx={{
              borderRadius: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 2,
              mt: 1,
              minHeight: 40,
            }}
          >
            <Box display="flex" alignItems="center">
              <img src={DolarImg} width={16} height={16} />
              <Typography variant="body1" color="white" fontWeight="bold" ml={1}>
                {dados.terrenos.faturamentoTotal.toLocaleString('pt-BR')}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography variant="body1" color="white" fontWeight="bold" mr={1}>
                {formatarNumero(resultadoTerrenos)}
              </Typography>
              <img src={porcem} width={14} height={14} />
            </Box>
          </GradientBox>

          {/* 🔘 Quantidade Disponível (Caixa Flutuante) */}
          <Box
            sx={{
              bgcolor: '#6411D9',
              width: 48,
              height: 48,
              borderRadius: '10px',
              border: '2px solid #F27405',
              position: 'absolute',
              right: -24,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography color="white" fontWeight="bold">
              {dados.terrenos.quantidade}
            </Typography>
          </Box>
        </Paper>












        <div className="flex flex-col h-[22vh] w-[20vw] p-4 bg-[#290064] shadow-lg rounded-[20px] mb-4 relative w-max-[400px]">
          <div className="flex flex-col h-full">
            <div className="flex h-[85%] items-center">
              {/* Container principal com place-content-between */}
              <div className="flex justify-around w-full mb-4 h-full">
                {/* Botão de compra de terreno */}
                <div className="flex flex-col h-full justify-around">
                  <div className="bg-laranja h-[60%] aspect-square rounded-[10px] flex justify-center items-center">
                    <button className="flex justify-center items-center w-full h-full hover:bg-[#E56100]  hover:rounded-[10px] active:scale-95 hover:scale-[1.05]" onClick={ComprarLojaP}>
                      <img src={LojaPImg} alt="despesas" className="w-[50px] h-[50px]" />
                    </button>
                  </div>
                  {/* Botões de aumentar/diminuir quantidade */}
                  <div className="flex items-center mt-2">
                    <button className="bg-[#6411D9] w-8 h-8 rounded-[5px] flex justify-center items-center  hover:bg-[#834EDB] active:scale-95" onClick={DiminuirQuantidadeLojasP}>
                      <img src={menos} className="w-4 h-4" />
                    </button>

                    <div className="bg-[#350973] w-8 h-8 rounded-[5px] flex justify-center items-center mx-2">
                      <h1 className="text-white text-xl font-bold">{quantidadeLojasP}</h1>
                    </div>
                    <button className="bg-[#6411D9] w-8 h-8 rounded-[5px] flex justify-center items-center hover:bg-[#834EDB] active:scale-95" onClick={AumentarQuantidadeLojasP}>
                      <img src={mais} className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Informações do terreno */}
                <div className="flex flex-col w-[80%] mr-8 ml-4 justify-between h-full">
                  {/* Título "Terrenos" */}
                  <div className="bg-gradient-to-l flex items-center justify-start from-[#6411D9] to-[#F27405] h-[30%] rounded-[5px] ">
                    <h1 className="text-white text-xl font-bold ml-[10px]">Lojas Pequenas</h1>
                  </div>

                  {/* Informações de preço */}
                  <div className="  rounded-[5px]  h-[22%] ">
                    <div className="bg-[#6411D9] w-full rounded-[2px] flex items-center justify-between  p-1">

                      <h1 className="text-white font-bold ml-[10px]">Construção</h1>

                      <h1 className="text-white font-bold mr-[10px]">{formatarNumero(dados.lojasP.preçoConstrução)}</h1>
                    </div>
                  </div>

                  {/* Rodapé com faturamento */}
                  <div className="bg-[#350973] rounded-[20px] flex items-center justify-between h-[30%] h-8 mt-2">

                    <h1 className="text-white font-bold ml-[10px]">Valor total</h1>
                    <h1 className="text-white font-bold mr-[10px]">{formatarNumero(dados.lojasP.preçoConstrução * quantidadeLojasP)}</h1>

                  </div>
                </div>
              </div>
            </div>

            {/* Rodapé do container */}
            <div className="bg-gradient-to-l from-[#6411D9] to-[#F27405] rounded-[20px] flex items-center justify-between h-full ">
              <div className="flex items-center">
                <img src={DolarImg} className="w-6 h-6" />
                <h1 className="text-white fonteBold text-[20px] ml-2">{(dados.lojasP.faturamentoTotal).toLocaleString('pt-BR')}</h1>
              </div>
              <div className="flex items-center">
                <h1 className="text-white font-bold mr-2 text-[20px]">{(resultadoLojasP).toFixed(1)}</h1>
                <img src={porcem} alt="porcentagem" className="w-5 h-5 mr-[5px]" />
              </div>
            </div>
          </div>
          {/* Quadrado roxo centralizado na borda direita */}
          <div className="bg-roxo w-12 h-12 rounded-[10px] border-[2px] border-laranja text-[20px] flex justify-center items-center absolute -right-6 top-1/2 transform -translate-y-1/2">
            <h1 className="text-white font-bold">{dados.lojasP.quantidade}</h1>
          </div>
        </div>

        <div className="flex flex-col h-[22vh] w-[20vw] p-4 bg-[#290064] shadow-lg rounded-[20px] mb-4 relative w-max-[400px]">
          <div className="flex flex-col h-full">
            <div className="flex h-[85%] items-center">
              {/* Container principal com place-content-between */}
              <div className="flex justify-around w-full mb-4 h-full">
                {/* Botão de compra de terreno */}
                <div className="flex flex-col h-full justify-around">
                  <div className="bg-laranja h-[60%] aspect-square rounded-[10px] flex justify-center items-center">
                    <button className="flex justify-center items-center w-full h-full hover:bg-[#E56100] hover:rounded-[10px] active:scale-95 hover:scale-[1.05]" onClick={ComprarLojaM}>
                      <img src={LojaMImg} alt="despesas" className="w-[50px] h-[50px]" />
                    </button>
                  </div>
                  {/* Botões de aumentar/diminuir quantidade */}
                  <div className="flex items-center mt-2">
                    <button className="bg-[#6411D9] w-8 h-8 rounded-[5px] flex justify-center items-center hover:bg-[#834EDB] active:scale-95" onClick={DiminuirQuantidadeLojasM}>
                      <img src={menos} className="w-4 h-4" />
                    </button>

                    <div className="bg-[#350973] w-8 h-8 rounded-[5px] flex justify-center items-center mx-2">
                      <h1 className="text-white text-xl font-bold">{quantidadeLojasM}</h1>
                    </div>
                    <button className="bg-[#6411D9] w-8 h-8 rounded-[5px] flex justify-center items-center  hover:bg-[#834EDB] active:scale-95" onClick={AumentarQuantidadeLojasM}>
                      <img src={mais} className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Informações do terreno */}
                <div className="flex flex-col w-[80%] mr-8 ml-4 justify-between h-full">
                  {/* Título "Terrenos" */}
                  <div className="bg-gradient-to-l flex items-center justify-start from-[#6411D9] to-[#F27405] h-[30%] rounded-[5px] ">
                    <h1 className="text-white text-xl font-bold ml-[10px]">Lojas Médias</h1>
                  </div>

                  {/* Informações de preço */}
                  <div className="  rounded-[5px]  h-[22%] ">
                    <div className="bg-[#6411D9] w-full rounded-[2px] flex items-center justify-between  p-1">

                      <h1 className="text-white font-bold ml-[10px]">Construção</h1>

                      <h1 className="text-white font-bold mr-[10px]">{formatarNumero(dados.lojasM.preçoConstrução)}</h1>
                    </div>
                  </div>

                  {/* Rodapé com faturamento */}
                  <div className="bg-[#350973] rounded-[20px] flex items-center justify-between h-[30%] h-8 mt-2">

                    <h1 className="text-white font-bold ml-[10px]">Valor total</h1>
                    <h1 className="text-white font-bold mr-[10px]">{formatarNumero(dados.lojasM.preçoConstrução * quantidadeLojasM)}</h1>

                  </div>
                </div>
              </div>
            </div>

            {/* Rodapé do container */}
            <div className="bg-gradient-to-l from-[#6411D9] to-[#F27405] rounded-[20px] flex items-center justify-between h-full ">
              <div className="flex items-center">
                <img src={DolarImg} className="w-6 h-6" />
                <h1 className="text-white fonteBold text-[20px] ml-2">{(dados.lojasM.faturamentoTotal).toLocaleString('pt-BR')}</h1>
              </div>
              <div className="flex items-center">
                <h1 className="text-white font-bold mr-2 text-[20px]">{(resultadoLojasM).toFixed(1)}</h1>
                <img src={porcem} alt="porcentagem" className="w-5 h-5 mr-[5px]" />
              </div>
            </div>
          </div>
          {/* Quadrado roxo centralizado na borda direita */}
          <div className="bg-roxo w-12 h-12 rounded-[10px] border-[2px] border-laranja text-[20px] flex justify-center items-center absolute -right-6 top-1/2 transform -translate-y-1/2">
            <h1 className="text-white font-bold">{dados.lojasM.quantidade}</h1>
          </div>
        </div>

        <div className="flex flex-col h-[22vh] w-[20vw] p-4 bg-[#290064] shadow-lg rounded-[20px] mb-4 relative w-max-[400px]">
          <div className="flex flex-col h-full">
            <div className="flex h-[85%] items-center">
              {/* Container principal com place-content-between */}
              <div className="flex justify-around w-full mb-4 h-full">
                {/* Botão de compra de terreno */}
                <div className="flex flex-col h-full justify-around">
                  <div className="bg-laranja h-[60%] aspect-square rounded-[10px] flex justify-center items-center">
                    <button className="flex justify-center items-center w-full h-full hover:bg-[#E56100] hover:rounded-[10px] active:scale-95 hover:scale-[1.05]" onClick={ComprarLojaG}>
                      <img src={LojaGImg} alt="despesas" className="w-[50px] h-[50px]" />
                    </button>
                  </div>
                  {/* Botões de aumentar/diminuir quantidade */}
                  <div className="flex items-center mt-2">
                    <button className="bg-[#6411D9] w-8 h-8 rounded-[5px] flex justify-center items-center hover:bg-[#834EDB] active:scale-95" onClick={DiminuirQuantidadeLojasG}>
                      <img src={menos} className="w-4 h-4" />
                    </button>

                    <div className="bg-[#350973] w-8 h-8 rounded-[5px] flex justify-center items-center mx-2">
                      <h1 className="text-white text-xl font-bold">{quantidadeLojasG}</h1>
                    </div>
                    <button className="bg-[#6411D9] w-8 h-8 rounded-[5px] flex justify-center items-center hover:bg-[#834EDB] active:scale-95" onClick={AumentarQuantidadeLojasG}>
                      <img src={mais} className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Informações do terreno */}
                <div className="flex flex-col w-[80%] mr-8 ml-4 justify-between h-full">
                  {/* Título "Terrenos" */}
                  <div className="bg-gradient-to-l flex items-center justify-start from-[#6411D9] to-[#F27405] h-[30%] rounded-[5px] ">
                    <h1 className="text-white text-xl font-bold ml-[10px]">Lojas Grandes</h1>
                  </div>

                  {/* Informações de preço */}
                  <div className="  rounded-[5px]  h-[22%] ">
                    <div className="bg-[#6411D9] w-full rounded-[2px] flex items-center justify-between  p-1">

                      <h1 className="text-white font-bold ml-[10px]">Construção</h1>

                      <h1 className="text-white font-bold mr-[10px]">{formatarNumero(dados.lojasG.preçoConstrução)}</h1>
                    </div>
                  </div>

                  {/* Rodapé com faturamento */}
                  <div className="bg-[#350973] rounded-[20px] flex items-center justify-between h-[30%] h-8 mt-2">

                    <h1 className="text-white font-bold ml-[10px]">Valor total</h1>
                    <h1 className="text-white font-bold mr-[10px]">{formatarNumero(dados.lojasG.preçoConstrução * quantidadeLojasG)}</h1>

                  </div>
                </div>
              </div>
            </div>                    {/* Rodapé do container */}
            <div className="bg-gradient-to-l from-[#6411D9] to-[#F27405] rounded-[20px] flex items-center justify-between h-full ">
              <div className="flex items-center">
                <img src={DolarImg} className="w-6 h-6" />
                <h1 className="text-white fonteBold text-[20px] ml-2">{(dados.lojasG.faturamentoTotal).toLocaleString('pt-BR')}</h1>
              </div>
              <div className="flex items-center">
                <h1 className="text-white font-bold mr-2 text-[20px]">{(resultadoLojasG).toFixed(1)}</h1>
                <img src={porcem} alt="porcentagem" className="w-5 h-5 mr-[5px]" />
              </div>
            </div>
          </div>
          {/* Quadrado roxo centralizado na borda direita */}
          <div className="bg-roxo w-12 h-12 rounded-[10px] border-[2px] border-laranja text-[20px] flex justify-center items-center absolute -right-6 top-1/2 transform -translate-y-1/2">
            <h1 className="text-white font-bold">{dados.lojasG.quantidade}</h1>
          </div>
        </div>
      </div>
    )
  } else {
    return (

      <div className="flex justify-around flex-col w-full">
        {/* Container de Terrenos */}
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
  {/* 🔷 Bloco Principal: Parte Superior */}
  <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}>
    {/* 🟩 Bloco B — Informações Principais (agora à esquerda) */}
    <Box
      sx={{
        flexGrow: 1,
        mr: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <GradientBox>
        <Typography variant="subtitle1" color="white" fontWeight="bold">
          Terrenos
        </Typography>
      </GradientBox>

      <Box sx={{ mt: 0.5 }}>
        <Box
          sx={{
            bgcolor: '#6411D9',
            borderRadius: '2px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 1,
            py: 0.25,
          }}
        >
          <Typography variant="body2" color="white" fontWeight="bold">
            Construção
          </Typography>
          <Typography variant="body2" color="white" fontWeight="bold">
            {formatarNumero(dados.terrenos.preçoConstrução)}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          bgcolor: '#350973',
          borderRadius: '5px',
          height: 28,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 1,
        }}
      >
        <Typography variant="body2" color="white" fontWeight="bold">
          Valor total
        </Typography>
        <Typography variant="body2" color="white" fontWeight="bold">
          {formatarNumero(dados.terrenos.preçoConstrução * quantidadeTerrenos)}
        </Typography>
      </Box>
    </Box>

    {/* 🟨 Bloco A — Controles de Compra (agora à direita) */}
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around',  }}>
      <Box
        sx={{
          backgroundColor: '#F27405',
          flexGrow: 1,
          aspectRatio: '1',
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconButton
          onClick={ComprarTerreno}
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            '&:hover': { backgroundColor: '#E56100', transform: 'scale(1.05)' },
            '&:active': { transform: 'scale(0.95)' },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={terrenoImg} alt="terreno" width="40" height="40" />
        </IconButton>
      </Box>

      <Box display="flex" alignItems="center" mt={0.5}>
        <IconButton
          onClick={DiminuirQuantidadeTerrenos}
          sx={{
            bgcolor: '#6411D9',
            width: 28,
            height: 28,
            borderRadius: '5px',
            '&:hover': { bgcolor: '#834EDB' },
          }}
        >
          <img src={menos} width={14} height={14} />
        </IconButton>
        <Box
          sx={{
            mx: 1,
            bgcolor: '#350973',
            width: 28,
            height: 28,
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" color="white" fontWeight="bold">
            {quantidadeTerrenos}
          </Typography>
        </Box>
        <IconButton
          onClick={AumentarQuantidadeTerrenos}
          sx={{
            bgcolor: '#6411D9',
            width: 28,
            height: 28,
            borderRadius: '5px',
            '&:hover': { bgcolor: '#834EDB' },
          }}
        >
          <img src={mais} width={14} height={14} />
        </IconButton>
      </Box>
    </Box>
  </Box>

  {/* 🟥 Bloco C — Faturamento e Percentual */}
  <GradientBox
    sx={{
      borderRadius: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      px: 2,
      mt: 1,
      minHeight: 40,
    }}
  >
    <Box display="flex" alignItems="center">
      <img src={DolarImg} width={16} height={16} />
      <Typography variant="body1" color="white" fontWeight="bold" ml={1}>
        {dados.terrenos.faturamentoTotal.toLocaleString('pt-BR')}
      </Typography>
    </Box>
    <Box display="flex" alignItems="center">
      <Typography variant="body1" color="white" fontWeight="bold" mr={1}>
        {formatarNumero(resultadoTerrenos)}
      </Typography>
      <img src={porcem} width={14} height={14} />
    </Box>
  </GradientBox>

  {/* 🔘 Quantidade Disponível (Caixa Flutuante à esquerda) */}
  <Box
    sx={{
      bgcolor: '#6411D9',
      width: 48,
      height: 48,
      borderRadius: '10px',
      border: '2px solid #F27405',
      position: 'absolute',
      left: -24, // invertido!
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Typography color="white" fontWeight="bold">
      {dados.terrenos.quantidade}
    </Typography>
  </Box>
</Paper>









        <div className="flex flex-col h-[22vh] w-[20vw] p-4 bg-[#290064] shadow-lg rounded-[20px] mb-4 relative w-max-[400px]">
          <div className="flex flex-col h-full">
            <div className="flex h-[85%] items-center">
              {/* Container principal com place-content-between */}
              <div className="flex justify-around w-full mb-4 h-full">
                {/* Botão de compra de terreno */}
                <div className="flex flex-col h-full justify-around">
                  <div className="bg-laranja h-[60%] aspect-square rounded-[10px] flex justify-center items-center">
                    <button className="flex justify-center items-center w-full h-full hover:bg-[#E56100]  hover:rounded-[10px] active:scale-95 hover:scale-[1.05]" onClick={ComprarLojaP}>
                      <img src={LojaPImg} alt="despesas" className="w-[50px] h-[50px]" />
                    </button>
                  </div>
                  {/* Botões de aumentar/diminuir quantidade */}
                  <div className="flex items-center mt-2">
                    <button className="bg-[#6411D9] w-8 h-8 rounded-[5px] flex justify-center items-center  hover:bg-[#834EDB] active:scale-95" onClick={DiminuirQuantidadeLojasP}>
                      <img src={menos} className="w-4 h-4" />
                    </button>

                    <div className="bg-[#350973] w-8 h-8 rounded-[5px] flex justify-center items-center mx-2">
                      <h1 className="text-white text-xl font-bold">{quantidadeLojasP}</h1>
                    </div>
                    <button className="bg-[#6411D9] w-8 h-8 rounded-[5px] flex justify-center items-center hover:bg-[#834EDB] active:scale-95" onClick={AumentarQuantidadeLojasP}>
                      <img src={mais} className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Informações do terreno */}
                <div className="flex flex-col w-[80%] mr-8 ml-4 justify-between h-full">
                  {/* Título "Terrenos" */}
                  <div className="bg-gradient-to-l flex items-center justify-start from-[#6411D9] to-[#F27405] h-[30%] rounded-[5px] ">
                    <h1 className="text-white text-xl font-bold ml-[10px]">Lojas Pequenas</h1>
                  </div>

                  {/* Informações de preço */}
                  <div className="  rounded-[5px]  h-[22%] ">
                    <div className="bg-[#6411D9] w-full rounded-[2px] flex items-center justify-between  p-1">

                      <h1 className="text-white font-bold ml-[10px]">Construção</h1>

                      <h1 className="text-white font-bold mr-[10px]">{(dados.lojasP.preçoConstrução).toLocaleString('pt-BR')}</h1>
                    </div>
                  </div>

                  {/* Rodapé com faturamento */}
                  <div className="bg-[#350973] rounded-[20px] flex items-center justify-between h-[30%] h-8 mt-2">

                    <h1 className="text-white font-bold ml-[10px]">Valor total</h1>
                    <h1 className="text-white font-bold mr-[10px]">{(dados.lojasP.preçoConstrução * quantidadeLojasP).toLocaleString('pt-BR')}</h1>

                  </div>
                </div>
              </div>
            </div>

            {/* Rodapé do container */}
            <div className="bg-gradient-to-l from-[#6411D9] to-[#F27405] rounded-[20px] flex items-center justify-between h-full ">
              <div className="flex items-center">
                <img src={DolarImg} className="w-6 h-6" />
                <h1 className="text-white fonteBold text-[20px] ml-2">{(dados.lojasP.faturamentoTotal).toLocaleString('pt-BR')}</h1>
              </div>
              <div className="flex items-center">
                <h1 className="text-white font-bold mr-2 text-[20px]">{(resultadoLojasP).toFixed(1)}</h1>
                <img src={porcem} alt="porcentagem" className="w-5 h-5 mr-[5px]" />
              </div>
            </div>
          </div>
          {/* Quadrado roxo centralizado na borda direita */}
          <div className="bg-roxo w-12 h-12 rounded-[10px] border-[2px] border-laranja text-[20px] flex justify-center items-center absolute -right-6 top-1/2 transform -translate-y-1/2">
            <h1 className="text-white font-bold">{dados.lojasP.quantidade}</h1>
          </div>
        </div>

        <div className="flex flex-col h-[22vh] w-[20vw] p-4 bg-[#290064] shadow-lg rounded-[20px] mb-4 relative w-max-[400px]">
          <div className="flex flex-col h-full">
            <div className="flex h-[85%] items-center">
              {/* Container principal com place-content-between */}
              <div className="flex justify-around w-full mb-4 h-full">
                {/* Botão de compra de terreno */}
                <div className="flex flex-col h-full justify-around">
                  <div className="bg-laranja h-[60%] aspect-square rounded-[10px] flex justify-center items-center">
                    <button className="flex justify-center items-center w-full h-full hover:bg-[#E56100] hover:rounded-[10px] active:scale-95 hover:scale-[1.05]" onClick={ComprarLojaM}>
                      <img src={LojaMImg} alt="despesas" className="w-[50px] h-[50px]" />
                    </button>
                  </div>
                  {/* Botões de aumentar/diminuir quantidade */}
                  <div className="flex items-center mt-2">
                    <button className="bg-[#6411D9] w-8 h-8 rounded-[5px] flex justify-center items-center hover:bg-[#834EDB] active:scale-95" onClick={DiminuirQuantidadeLojasM}>
                      <img src={menos} className="w-4 h-4" />
                    </button>

                    <div className="bg-[#350973] w-8 h-8 rounded-[5px] flex justify-center items-center mx-2">
                      <h1 className="text-white text-xl font-bold">{quantidadeLojasM}</h1>
                    </div>
                    <button className="bg-[#6411D9] w-8 h-8 rounded-[5px] flex justify-center items-center  hover:bg-[#834EDB] active:scale-95" onClick={AumentarQuantidadeLojasM}>
                      <img src={mais} className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Informações do terreno */}
                <div className="flex flex-col w-[80%] mr-8 ml-4 justify-between h-full">
                  {/* Título "Terrenos" */}
                  <div className="bg-gradient-to-l flex items-center justify-start from-[#6411D9] to-[#F27405] h-[30%] rounded-[5px] ">
                    <h1 className="text-white text-xl font-bold ml-[10px]">Lojas Médias</h1>
                  </div>

                  {/* Informações de preço */}
                  <div className="  rounded-[5px]  h-[22%] ">
                    <div className="bg-[#6411D9] w-full rounded-[2px] flex items-center justify-between  p-1">

                      <h1 className="text-white font-bold ml-[10px]">Construção</h1>

                      <h1 className="text-white font-bold mr-[10px]">{(dados.lojasM.preçoConstrução).toLocaleString('pt-BR')}</h1>
                    </div>
                  </div>

                  {/* Rodapé com faturamento */}
                  <div className="bg-[#350973] rounded-[20px] flex items-center justify-between h-[30%] h-8 mt-2">

                    <h1 className="text-white font-bold ml-[10px]">Valor total</h1>
                    <h1 className="text-white font-bold mr-[10px]">{(dados.lojasM.preçoConstrução * quantidadeLojasM).toLocaleString('pt-BR')}</h1>

                  </div>
                </div>
              </div>
            </div>

            {/* Rodapé do container */}
            <div className="bg-gradient-to-l from-[#6411D9] to-[#F27405] rounded-[20px] flex items-center justify-between h-full ">
              <div className="flex items-center">
                <img src={DolarImg} className="w-6 h-6" />
                <h1 className="text-white fonteBold text-[20px] ml-2">{(dados.lojasM.faturamentoTotal).toLocaleString('pt-BR')}</h1>
              </div>
              <div className="flex items-center">
                <h1 className="text-white font-bold mr-2 text-[20px]">{(resultadoLojasM).toFixed(1)}</h1>
                <img src={porcem} alt="porcentagem" className="w-5 h-5 mr-[5px]" />
              </div>
            </div>
          </div>
          {/* Quadrado roxo centralizado na borda direita */}
          <div className="bg-roxo w-12 h-12 rounded-[10px] border-[2px] border-laranja text-[20px] flex justify-center items-center absolute -right-6 top-1/2 transform -translate-y-1/2">
            <h1 className="text-white font-bold">{dados.lojasM.quantidade}</h1>
          </div>
        </div>

        <div className="flex flex-col h-[22vh] w-[20vw] p-4 bg-[#290064] shadow-lg rounded-[20px] mb-4 relative w-max-[400px]">
          <div className="flex flex-col h-full">
            <div className="flex h-[85%] items-center">
              {/* Container principal com place-content-between */}
              <div className="flex justify-around w-full mb-4 h-full">
                {/* Botão de compra de terreno */}
                <div className="flex flex-col h-full justify-around">
                  <div className="bg-laranja h-[60%] aspect-square rounded-[10px] flex justify-center items-center">
                    <button className="flex justify-center items-center w-full h-full hover:bg-[#E56100] hover:rounded-[10px] active:scale-95 hover:scale-[1.05]" onClick={ComprarLojaG}>
                      <img src={LojaGImg} alt="despesas" className="w-[50px] h-[50px]" />
                    </button>
                  </div>
                  {/* Botões de aumentar/diminuir quantidade */}
                  <div className="flex items-center mt-2">
                    <button className="bg-[#6411D9] w-8 h-8 rounded-[5px] flex justify-center items-center hover:bg-[#834EDB] active:scale-95" onClick={DiminuirQuantidadeLojasG}>
                      <img src={menos} className="w-4 h-4" />
                    </button>

                    <div className="bg-[#350973] w-8 h-8 rounded-[5px] flex justify-center items-center mx-2">
                      <h1 className="text-white text-xl font-bold">{quantidadeLojasG}</h1>
                    </div>
                    <button className="bg-[#6411D9] w-8 h-8 rounded-[5px] flex justify-center items-center hover:bg-[#834EDB] active:scale-95" onClick={AumentarQuantidadeLojasG}>
                      <img src={mais} className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Informações do terreno */}
                <div className="flex flex-col w-[80%] mr-8 ml-4 justify-between h-full">
                  {/* Título "Terrenos" */}
                  <div className="bg-gradient-to-l flex items-center justify-start from-[#6411D9] to-[#F27405] h-[30%] rounded-[5px] ">
                    <h1 className="text-white text-xl font-bold ml-[10px]">Lojas Grandes</h1>
                  </div>

                  {/* Informações de preço */}
                  <div className="  rounded-[5px]  h-[22%] ">
                    <div className="bg-[#6411D9] w-full rounded-[2px] flex items-center justify-between  p-1">

                      <h1 className="text-white font-bold ml-[10px]">Construção</h1>

                      <h1 className="text-white font-bold mr-[10px]">{(dados.lojasG.preçoConstrução).toLocaleString('pt-BR')}</h1>
                    </div>
                  </div>

                  {/* Rodapé com faturamento */}
                  <div className="bg-[#350973] rounded-[20px] flex items-center justify-between h-[30%] h-8 mt-2">

                    <h1 className="text-white font-bold ml-[10px]">Valor total</h1>
                    <h1 className="text-white font-bold mr-[10px]">{(dados.lojasG.preçoConstrução * quantidadeLojasG).toLocaleString('pt-BR')}</h1>

                  </div>
                </div>
              </div>
            </div>

            {/* Rodapé do container */}
            <div className="bg-gradient-to-l from-[#6411D9] to-[#F27405] rounded-[20px] flex items-center justify-between h-full ">
              <div className="flex items-center">
                <img src={DolarImg} className="w-6 h-6" />
                <h1 className="text-white fonteBold text-[20px] ml-2">{(dados.lojasG.faturamentoTotal).toLocaleString('pt-BR')}</h1>
              </div>
              <div className="flex items-center">
                <h1 className="text-white font-bold mr-2 text-[20px]">{(resultadoLojasG).toFixed(1)}</h1>
                <img src={porcem} alt="porcentagem" className="w-5 h-5 mr-[5px]" />
              </div>
            </div>
          </div>
          {/* Quadrado roxo centralizado na borda direita */}
          <div className="bg-roxo w-12 h-12 rounded-[10px] border-[2px] border-laranja text-[20px] flex justify-center items-center absolute -right-6 top-1/2 transform -translate-y-1/2">
            <h1 className="text-white font-bold">{dados.lojasG.quantidade}</h1>
          </div>
        </div>
      </div>
    )
  }
}