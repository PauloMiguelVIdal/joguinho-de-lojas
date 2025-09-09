<<<<<<< HEAD
import React from 'react'
=======
import React, { useState } from 'react'
>>>>>>> 4eecf25e3e3b0d0eca1f16931d01c2d9df1ce00a
import { useContext } from 'react'
import { CentraldeDadosContext } from '../centralDeDadosContext'
import terrenoImg from "../imagens/terreno.png"
import LojaPImg from "../imagens/lojaP.png"
import LojaMImg from "../imagens/lojaM.png"
import LojaGImg from "../imagens/lojaG.png"
import ConstuirImg from "../imagens/construir.png"
import DolarImg from "../imagens/simbolo-do-dolar.png"
<<<<<<< HEAD



export default function Buy() {

    const {
        dados, atualizarDados
    } = useContext(CentraldeDadosContext)







// Comprar Loja P
const ComprarLojaP = () => {
    if (dados.terrenos.quantidade < 1) {
        return alert("Você não tem terreno suficiente");
    }
    if (dados.saldo < dados.lojasP.preçoConstrução) {
        alert("Você não tem dinheiro suficiente para construir");
    } else {
        atualizarDados('lojasP', { 
            ...dados.lojasP, 
            quantidade: dados.lojasP.quantidade + 1 
        });
        atualizarDados('terrenos', { 
            ...dados.terrenos, 
            quantidade: dados.terrenos.quantidade - 1 
        });
        atualizarDados('saldo', dados.saldo - dados.lojasP.preçoConstrução);
    }
};

// Comprar Loja M
const ComprarLojaM = () => {
    if (dados.terrenos.quantidade < 2) {
        return alert("Você não tem terrenos suficientes");
    }
    if (dados.saldo < dados.lojasM.preçoConstrução) {
        alert("Você não tem dinheiro suficiente para construir");
    } else {
        atualizarDados('lojasM', { 
            ...dados.lojasM, 
            quantidade: dados.lojasM.quantidade + 1 
        });
        atualizarDados('terrenos', { 
            ...dados.terrenos, 
            quantidade: dados.terrenos.quantidade - 2 
        });
        atualizarDados('saldo', dados.saldo - dados.lojasM.preçoConstrução);
    }
};

// Comprar Loja G
const ComprarLojaG = () => {
    if (dados.terrenos.quantidade < 3) {
        return alert("Você não tem terrenos suficientes");
    }
    if (dados.saldo < dados.lojasG.preçoConstrução) {
        alert("Você não tem dinheiro suficiente para construir");
    } else {
        atualizarDados('lojasG', { 
            ...dados.lojasG, 
            quantidade: dados.lojasG.quantidade + 1 
        });
        atualizarDados('terrenos', { 
            ...dados.terrenos, 
            quantidade: dados.terrenos.quantidade - 3 
        });
        atualizarDados('saldo', dados.saldo - dados.lojasG.preçoConstrução);
    }
};

// Comprar Terreno
const ComprarTerreno = () => {
    if (dados.saldo < dados.terrenos.preço) {
        alert("Você não tem dinheiro suficiente");
    } else {
        atualizarDados('terrenos', { 
            ...dados.terrenos, 
            quantidade: dados.terrenos.quantidade + 1 
        });
        atualizarDados('saldo', dados.saldo - dados.terrenos.preço);
    }
};


  return (
    <div className="grid row-1 cols-1 absolute top-[70px] left-[36px]">
    <div className="flex flex-col justify-around items-center">

        <div className=" flex flex-col">
            <div className="flex justify-around flex-col">
                <div className="flex">
                    <button className="bg-laranja w-[70px] h-[70px] rounded-[20px] flex justify-center items-center relative mb-[30px]" onClick={ComprarTerreno}>

                        <img src={terrenoImg} alt="despesas" className="w-[50px] h-[50px] " />
                        <div className="bg-marinho w-[36px] h-[36px] rounded-full left-[-18px] top-[50px] flex justify-center items-center border-white border-[1px] absolute">
                            <h1 className="text-laranja fonteBold">
                                {dados.terrenos.quantidade}
                            </h1>
                        </div>
                    </button>
                    <div>
                        <div className="bg-laranja w-[180px] h-[30px] rounded-[20px] flex items-center justify-between ml-[15px] mb-[10px]">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={DolarImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">R$ {dados.terrenos.faturamentoTotal}</h1>
                        </div>
                        <div className="bg-laranja w-[180px] h-[30px] rounded-[20px] flex items-center justify-between ml-[15px]">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={ConstuirImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">R$ {dados.terrenos.preço}</h1>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <button
                        className="bg-laranja w-[70px] h-[70px] rounded-[20px] flex justify-center items-center relative mb-[30px]"
                        onClick={ComprarLojaP}>
                        <img src={LojaPImg} alt="lojaP" className="w-[50px] h-[50px] " />
                        <div className="bg-marinho w-[36px] h-[36px] rounded-full left-[-18px] top-[50px] flex justify-center items-center border-white border-[1px] absolute">
                            <h1 className="text-laranja fonteBold">
                                {dados.lojasP.quantidade}
                            </h1>
                        </div>
                    </button>
                    <div>
                        <div className="bg-laranja w-[180px] h-[30px] rounded-[20px] flex items-center justify-between ml-[15px] mb-[10px]">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={DolarImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">R$ {dados.lojasP.faturamentoTotal}</h1>
                        </div>
                        <div className="bg-laranja w-[180px] h-[30px] rounded-[20px] flex items-center justify-between ml-[15px]">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={ConstuirImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">R$ {dados.lojasP.preçoConstrução}</h1>
                        </div>
                    </div>
                </div>

                <div className="flex">
                    <button
                        className="bg-laranja w-[70px] h-[70px] rounded-[20px] flex justify-center items-center relative mb-[30px]"
                        onClick={ComprarLojaM}>
                        <img src={LojaMImg} alt="lojaM" className="w-[50px] h-[50px] " />
                        <div className="bg-marinho w-[36px] h-[36px] rounded-full left-[-18px] top-[50px] flex justify-center items-center border-white border-[1px] absolute">
                            <h1 className="text-laranja fonteBold">
                                {dados.lojasM.quantidade}
                            </h1>
                        </div>
                    </button>
                    <div>
                        <div className="bg-laranja w-[180px] h-[30px] rounded-[20px] flex items-center justify-between ml-[15px] mb-[10px]">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={DolarImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">R$ {dados.lojasM.faturamentoTotal}</h1>
                        </div>
                        <div className="bg-laranja w-[180px] h-[30px] rounded-[20px] flex items-center justify-between ml-[15px]">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={ConstuirImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">R$ {dados.lojasM.preçoConstrução}</h1>
                        </div>
                    </div>
                </div>


                <div className="flex">
                    <button
                        className="bg-laranja w-[70px] h-[70px] rounded-[20px] flex justify-center items-center relative"
                        onClick={ComprarLojaG}>
                        <img src={LojaGImg} alt="lojaG" className="w-[50px] h-[50px] " />
                        <div className="bg-marinho w-[36px] h-[36px] rounded-full absolute left-[-18px] top-[50px] flex justify-center items-center border-white border-[1px]">
                            <h1 className="text-laranja fonteBold">
                                {dados.lojasG.quantidade}
                            </h1>
                        </div>
                    </button>
                    <div>
                        <div className="bg-laranja w-[180px] h-[30px] rounded-[20px] flex items-center justify-between ml-[15px] mb-[10px]">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={DolarImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">R$ {dados.lojasG.faturamentoTotal}</h1>
                        </div>
                        <div className="bg-laranja w-[180px] h-[30px] rounded-[20px] flex items-center justify-between ml-[15px]">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={ConstuirImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">R$ {dados.lojasG.preçoConstrução}</h1>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
  )
}
=======
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

              <Box sx={{ mt: 0.5 ,ml: 2.5}}>
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
                  <Typography variant="subtitle1" color="white" fontWeight="bold">
                    Construção
                  </Typography>
                  <Typography variant="subtitle1" color="white" fontWeight="bold">
                    {formatarNumero(dados.terrenos.preçoConstrução)}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  mt: 0.5 ,
                  ml: 2.5,
                  bgcolor: '#350973',
                  borderRadius: '5px',
                  height: 28,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  px: 1,
                }}
              >
               <Typography variant="subtitle1" color="white" fontWeight="bold">
                  Valor total
                </Typography>
                <Typography variant="subtitle1" color="white" fontWeight="bold">
                  {formatarNumero(dados.terrenos.preçoConstrução * quantidadeTerrenos)}
                </Typography>
              </Box>
            </Box>

            {/* 🟨 Bloco A — Controles de Compra (agora à direita) */}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', }}>
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
          {/* <GradientBox
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
          </GradientBox> */}

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
                Lojas Pequenas
                </Typography>
              </GradientBox>

              <Box sx={{ mt: 0.5 }}>
                <Box
                  sx={{
                    mt: 0.5 ,
                    ml: 2.5,
                    bgcolor: '#6411D9',
                    borderRadius: '2px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 1,
                    py: 0.25,
                  }}
                >
                <Typography variant="subtitle1" color="white" fontWeight="bold">
                    Construção
                  </Typography>
                  <Typography variant="subtitle1" color="white" fontWeight="bold">
                    {formatarNumero(dados.lojasP.preçoConstrução)}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  mt: 0.5 ,
                  ml: 2.5,
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
                  {formatarNumero(dados.lojasP.preçoConstrução * quantidadeLojasP)}
                </Typography>
              </Box>
            </Box>

            {/* 🟨 Bloco A — Controles de Compra (agora à direita) */}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', }}>
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
                  onClick={ComprarLojaP}
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
                  <img src={LojaPImg} alt="terreno" width="40" height="40" />
                </IconButton>
              </Box>

              <Box display="flex" alignItems="center" mt={0.5}>
                <IconButton
                  onClick={DiminuirQuantidadeLojasP}
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
                    {quantidadeLojasP}
                  </Typography>
                </Box>
                <IconButton
                  onClick={AumentarQuantidadeLojasP}
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
          {/* <GradientBox
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
                {dados.lojasP.faturamentoTotal.toLocaleString('pt-BR')}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography variant="body1" color="white" fontWeight="bold" mr={1}>
                {formatarNumero(resultadoLojasP)}
              </Typography>
              <img src={porcem} width={14} height={14} />
            </Box>
          </GradientBox> */}

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
              {dados.lojasP.quantidade}
            </Typography>
          </Box>
        </Paper>




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
                Lojas Médias
                </Typography>
              </GradientBox>

              <Box sx={{ mt: 0.5 }}>
                <Box
                  sx={{
                    mt: 0.5 ,
                    ml: 2.5,
                    bgcolor: '#6411D9',
                    borderRadius: '2px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 1,
                    py: 0.25,
                  }}
                >
                <Typography variant="subtitle1" color="white" fontWeight="bold">
                    Construção
                  </Typography>
                  <Typography variant="subtitle1" color="white" fontWeight="bold">
                    {formatarNumero(dados.lojasM.preçoConstrução)}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  mt: 0.5 ,
                  ml: 2.5,
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
                  {formatarNumero(dados.lojasM.preçoConstrução * quantidadeLojasM)}
                </Typography>
              </Box>
            </Box>

            {/* 🟨 Bloco A — Controles de Compra (agora à direita) */}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', }}>
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
                  onClick={ComprarLojaM}
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
                  <img src={LojaMImg} alt="terreno" width="40" height="40" />
                </IconButton>
              </Box>

              <Box display="flex" alignItems="center" mt={0.5}>
                <IconButton
                  onClick={DiminuirQuantidadeLojasM}
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
                    {quantidadeLojasM}
                  </Typography>
                </Box>
                <IconButton
                  onClick={AumentarQuantidadeLojasM}
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
          {/* <GradientBox
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
                {dados.lojasM.faturamentoTotal.toLocaleString('pt-BR')}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography variant="body1" color="white" fontWeight="bold" mr={1}>
                {formatarNumero(resultadoLojasM)}
              </Typography>
              <img src={porcem} width={14} height={14} />
            </Box>
          </GradientBox> */}

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
              {dados.lojasM.quantidade}
            </Typography>
          </Box>
        </Paper>

        
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
                Lojas Grandes
                </Typography>
              </GradientBox>

              <Box sx={{ mt: 0.5 }}>
                <Box
                  sx={{
                    mt: 0.5 ,
                    ml: 2.5,
                    bgcolor: '#6411D9',
                    borderRadius: '2px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 1,
                    py: 0.25,
                  }}
                >
                  <Typography variant="subtitle1" color="white" fontWeight="bold">
                    Construção
                  </Typography>
                  <Typography variant="subtitle1" color="white" fontWeight="bold">
                    {formatarNumero(dados.lojasG.preçoConstrução)}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  mt: 0.5 ,
                  ml: 2.5,
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
                  {formatarNumero(dados.lojasG.preçoConstrução * quantidadeLojasG)}
                </Typography>
              </Box>
            </Box>

            {/* 🟨 Bloco A — Controles de Compra (agora à direita) */}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', }}>
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
                  onClick={ComprarLojaG}
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
                  <img src={LojaGImg} alt="terreno" width="40" height="40" />
                </IconButton>
              </Box>

              <Box display="flex" alignItems="center" mt={0.5}>
                <IconButton
                  onClick={DiminuirQuantidadeLojasG}
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
                    {quantidadeLojasG}
                  </Typography>
                </Box>
                <IconButton
                  onClick={AumentarQuantidadeLojasG}
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
          {/* <GradientBox
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
                {dados.lojasG.faturamentoTotal.toLocaleString('pt-BR')}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography variant="body1" color="white" fontWeight="bold" mr={1}>
                {formatarNumero(resultadoLojasM)}
              </Typography>
              <img src={porcem} width={14} height={14} />
            </Box>
          </GradientBox> */}

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
              {dados.lojasG.quantidade}
            </Typography>
          </Box>
        </Paper>
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
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', }}>
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
                {(resultadoTerrenos).toFixed(2)}
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
                Lojas Pequenas
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
                    {formatarNumero(dados.lojasP.preçoConstrução)}
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
                  {formatarNumero(dados.lojasP.preçoConstrução * quantidadeLojasP)}
                </Typography>
              </Box>
            </Box>

            {/* 🟨 Bloco A — Controles de Compra (agora à direita) */}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', }}>
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
                  onClick={ComprarLojaP}
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
                  <img src={LojaPImg} alt="terreno" width="40" height="40" />
                </IconButton>
              </Box>

              <Box display="flex" alignItems="center" mt={0.5}>
                <IconButton
                  onClick={DiminuirQuantidadeLojasP}
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
                    {quantidadeLojasP}
                  </Typography>
                </Box>
                <IconButton
                  onClick={AumentarQuantidadeLojasP}
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
                {dados.lojasP.faturamentoTotal.toLocaleString('pt-BR')}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography variant="body1" color="white" fontWeight="bold" mr={1}>
                {(resultadoLojasP).toFixed(2)}
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
              {dados.lojasP.quantidade}
            </Typography>
          </Box>
        </Paper>




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
                Lojas Médias
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
                    {formatarNumero(dados.lojasM.preçoConstrução)}
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
                  {formatarNumero(dados.lojasM.preçoConstrução * quantidadeLojasM)}
                </Typography>
              </Box>
            </Box>

            {/* 🟨 Bloco A — Controles de Compra (agora à direita) */}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', }}>
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
                  onClick={ComprarLojaM}
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
                  <img src={LojaMImg} alt="terreno" width="40" height="40" />
                </IconButton>
              </Box>

              <Box display="flex" alignItems="center" mt={0.5}>
                <IconButton
                  onClick={DiminuirQuantidadeLojasM}
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
                    {quantidadeLojasM}
                  </Typography>
                </Box>
                <IconButton
                  onClick={AumentarQuantidadeLojasM}
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
                {dados.lojasM.faturamentoTotal.toLocaleString('pt-BR')}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography variant="body1" color="white" fontWeight="bold" mr={1}>
                {(resultadoLojasM).toFixed(2)}
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
              {dados.lojasM.quantidade}
            </Typography>
          </Box>
        </Paper>

        
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
                Lojas Grandes
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
                    {formatarNumero(dados.lojasG.preçoConstrução)}
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
                  {formatarNumero(dados.lojasG.preçoConstrução * quantidadeLojasG)}
                </Typography>
              </Box>
            </Box>

            {/* 🟨 Bloco A — Controles de Compra (agora à direita) */}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', }}>
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
                  onClick={ComprarLojaG}
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
                  <img src={LojaGImg} alt="terreno" width="40" height="40" />
                </IconButton>
              </Box>

              <Box display="flex" alignItems="center" mt={0.5}>
                <IconButton
                  onClick={DiminuirQuantidadeLojasG}
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
                    {quantidadeLojasG}
                  </Typography>
                </Box>
                <IconButton
                  onClick={AumentarQuantidadeLojasG}
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
                {dados.lojasG.faturamentoTotal.toLocaleString('pt-BR')}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography variant="body1" color="white" fontWeight="bold" mr={1}>
                {(resultadoLojasG).toFixed(2)}
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
              {dados.lojasG.quantidade}
            </Typography>
          </Box>
        </Paper>
      </div>
    )
  }
}
>>>>>>> 4eecf25e3e3b0d0eca1f16931d01c2d9df1ce00a
