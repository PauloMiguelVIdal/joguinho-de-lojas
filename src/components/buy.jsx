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



export default function Buy() {

    const {
        dados, atualizarDados
    } = useContext(CentraldeDadosContext)

    const { resultadoTerrenos, resultadoLojasP, resultadoLojasM, resultadoLojasG } = Statistic();

    const [quantidadeTerrenos, setQuantidadeTerrenos] = useState(1)
    const [quantidadeLojasP, setQuantidadeLojasP] = useState(1)
    const [quantidadeLojasM, setQuantidadeLojasM] = useState(1)
    const [quantidadeLojasG, setQuantidadeLojasG] = useState(1)



    const AumentarQuantidadeLojasP = () => setQuantidadeLojasP(quantidadeLojasP + 1)
    const AumentarQuantidadeLojasM = () => setQuantidadeLojasM(quantidadeLojasM + 1)
    const AumentarQuantidadeLojasG = () => setQuantidadeLojasG(quantidadeLojasG + 1)
    const AumentarQuantidadeTerrenos = () => setQuantidadeTerrenos(quantidadeTerrenos + 1)
    const DiminuirQuantidadeLojasP = () => setQuantidadeLojasP(quantidadeLojasP - 1)
    const DiminuirQuantidadeLojasM = () => setQuantidadeLojasM(quantidadeLojasM - 1)
    const DiminuirQuantidadeLojasG = () => setQuantidadeLojasG(quantidadeLojasG - 1)
    const DiminuirQuantidadeTerrenos = () => setQuantidadeTerrenos(quantidadeTerrenos - 1)


    // Comprar Loja P
    const ComprarLojaP = () => {
        if (dados.terrenos.quantidade < dados.lojasp.quantidadeNecTerreno) {
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
        if (dados.terrenos.quantidade < dados.lojasM.quantidadeNecTerreno) {
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
        if (dados.terrenos.quantidade < dados.lojasG.quantidadeNecTerreno) {
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


    return (



        <div className="flex justify-around flex-col h-[60%] ">
            <div className="flex w-full h-[25%] place-content-around items-center flex-col bg-[#E06900] rounded-[20px]  mb-[20px] " >
                <div className='w-[85%] h-[80%]'>
                    <div className='h-[75%] w-full flex'>
                        <div className='h-full aspect-square flex flex-col place-content-around items-center'>
                            <button className="bg-laranja w-[80%] aspect-square  rounded-[20px] flex justify-center items-center " onClick={ComprarTerreno}>
                                <img src={terrenoImg} alt="despesas" className="w-max-[50px] w-[70%] aspect-square h-max-[50px] " />
                            </button>
                        </div>
                        <div className='w-full h-full flex justify-center items-center  '>
                            <div className='flex w-full flex-col place-content-around h-[80%]'>
                                <div className='bg-gradient-to-l from-[#F27405] to-[#6411D9] rounded-[5px] w-[100%] h-1/4'>
                                    <h1 className=' text-white text-[20px] text-start ml-[10px] fonteBold'>Terrenos</h1>
                                </div>

                                <div className='flex flex-col place-content-around bg-gradient-to-l to-[#350973] from-[# 6411D9] h-1/2 rounded-[5px] '>
                                    <div className='flex self-center w-[90%]'>
                                        <div className="bg-roxo w-[25px] h-[25px] rounded-[5px] flex items-center justify-center self-start">
                                            <img src={ConstuirImg} className=" h-[80%]" />
                                        </div>
                                        <div className="bg-[#350973] w-[90%] h-[25px] rounded-[2px] flex items-center self-center justify-around h-1/2">
                                            <h1 className="mr-[10px] fonteBold text-[#6A00FF]">Inicial</h1>
                                            <h1 className="mr-[10px] fonteBold text-[#6A00FF]"> {(dados.terrenos.preçoConstrução).toLocaleString('pt-BR')}</h1>
                                        </div>
                                    </div>

                                    <div className="bg-[#6411D9] w-[90%] rounded-[2px] flex items-center self-center h-1/3">
                                        <div className='flex items-center justify-between self-center w-[100%] m-[5px] h-[80%]'>
                                            <h1 className="mr-[10px] fonteBold text-[15px] text-white">Atual </h1>
                                            <h1 className="mr-[10px] fonteBold text-[15px] text-white">{(dados.terrenos.preçoConstrução).toLocaleString('pt-BR')}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className='flex w-[100%]'>
                        <div className='flex place-content-around items-center self-center w-[80%]'>
                            <button className='w-1/4 aspect-square bg-[#6411D9] flex justify-center items-center rounded-[5px]'><img src={mais} className='w-[60%] aspect-square ' onClick={AumentarQuantidadeTerrenos}></img></button>
                            <div className='w-1/4 aspect-square bg-[#350973] flex justify-center items-center rounded-[5px]'><h1 className=' text-white text-[20px] fonteBold'>{quantidadeTerrenos}</h1></div>
                            <button className='w-1/4 aspect-square bg-[#6411D9] flex justify-center items-center rounded-[5px]'><img src={menos} className='w-[60%] aspect-square ' onClick={DiminuirQuantidadeTerrenos}></img></button>
                        </div>
                        <div className='w-[80%]'>
                            <div className='flex items-center justify-between bg-[#350973] rounded-[20px] self-center w-[100%] m-[5px] h-[100%]'>
                                <div className='flex ml-[10px]'>
                                    <img src={DolarImg} className="w-[18px] h-[18px]" />
                                    <h1 className=" fonteBold text-[15px] text-white">{(dados.terrenos.preçoConstrução).toLocaleString('pt-BR')}</h1>
                                </div >
                                <div className='flex items-center justify-center flex mr-[5px]'>
                                    <h1 className='mr-[10px] text-white fonteBold'>  {(resultadoTerrenos).toFixed(1)} </h1>
                                    <img src={porcem} alt="porcentagem" className='w-[15px] h-[15px] mr-[10px] aspect-square' />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="bg-[#350973] w-[90%] h-1/3 rounded-[20px] flex items-center mb-[10px]">
                    <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                        <img src={DolarImg} className="w-[18px] h-[18px]" />
                    </div>
                    <div className='flex place-content-between w-full'>
                        <div className='flex'>
                            <h1 className="ml-[10px] fonteBold text-right text-laranja">R$ {(dados.terrenos.faturamentoTotal).toLocaleString('pt-BR')}</h1>
                        </div>
                        <div className='flex items-center justify-center '>
                            <h1 className='mr-[10px] text-white fonteBold'>  {(resultadoTerrenos).toFixed(1)} </h1>
                            <img src={porcem} alt="porcentagem" className='w-[15px] h-[15px] mr-[10px] aspect-square' />
                        </div>
                    </div>
                </div>


                <div className="bg-roxo w-[17%] max-w-[40px] aspect-square rounded-[10px] left-[50%] bottom-[50%] flex justify-center items-center relative z-6">
                    <h1 className="text-white fonteBold">
                        {dados.terrenos.quantidade}
                    </h1>
                </div>

            </div>















            <div className="flex w-full h-1/4 place-content-around items-center flex-col bg-[#E06900] rounded-[20px]  mb-[20px] shadow-lg" >
                <div className='flex h-2/3 place-content-around items-center w-[90%] h-[70%]'>
                    <button className="bg-laranja h-[70%] aspect-square w-max-[70px] h-max-[70px] rounded-[20px] flex justify-center items-center relative " onClick={ComprarLojaP}>
                        <img src={LojaPImg} alt="despesas" className="w-max-[50px] w-[70%] aspect-square h-max-[50px] " />
                    </button>
                    <div className='flex w-[70%] flex-col place-content-around '>
                        <div>
                            <h1 className='fonteLight text-white text-start'>Lojas Pequenas</h1>
                        </div>

                        <div className="bg-[#350973] w-[90%] h-[30px] rounded-[20px] flex items-center justify-between ">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={ConstuirImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold text-laranja">R$ {(dados.lojasP.preçoConstrução).toLocaleString('pt-BR')}</h1>
                        </div>
                    </div>
                </div>

                <div className="bg-[#350973] w-[90%] h-1/3 rounded-[20px] flex items-center mb-[10px]">
                    <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                        <img src={DolarImg} className="w-[18px] h-[18px]" />
                    </div>
                    <div className='flex place-content-between w-full'>
                        <div className='flex'>
                            <h1 className="ml-[10px] fonteBold text-right text-laranja">R$ {(dados.lojasP.faturamentoTotal).toLocaleString('pt-BR')}</h1>
                        </div>
                        <div className='flex items-center justify-center'>
                            <h1 className='mr-[10px] text-white fonteBold'>{(resultadoLojasP).toFixed(1)}</h1>
                            <img src={porcem} alt="porcentagem" className='w-[15px] h-[15px] mr-[10px] aspect-square' />
                        </div>
                    </div>
                </div>


                <div className="bg-roxo w-[17%] max-w-[40px] aspect-square rounded-[10px] left-[50%] bottom-[50%] flex justify-center items-center relative z-6">
                    <h1 className="text-white fonteBold">
                        {dados.lojasP.quantidade}
                    </h1>
                </div>

            </div>



            <div className="flex w-full h-1/4 place-content-around items-center flex-col bg-[#E06900] rounded-[20px]  mb-[20px] " >
                <div className='flex h-2/3 place-content-around items-center w-[90%] h-[70%]'>
                    <button className="bg-laranja h-[70%] aspect-square w-max-[70px] h-max-[70px] rounded-[20px] flex justify-center items-center relative " onClick={ComprarLojaM}>
                        <img src={LojaMImg} alt="despesas" className="w-max-[50px] w-[70%] aspect-square h-max-[50px] " />
                    </button>
                    <div className='flex w-[70%] flex-col place-content-around '>
                        <div>
                            <h1 className='fonteLight text-white text-start'>Lojas Médias</h1>
                        </div>

                        <div className="bg-[#350973] w-[90%] h-[30px] rounded-[20px] flex items-center justify-between ">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={ConstuirImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold text-laranja">R$ {(dados.lojasM.preçoConstrução).toLocaleString('pt-BR')}</h1>
                        </div>
                    </div>
                </div>

                <div className="bg-[#350973] w-[90%] h-1/3 rounded-[20px] flex items-center mb-[10px]">
                    <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                        <img src={DolarImg} className="w-[18px] h-[18px]" />
                    </div>
                    <div className='flex place-content-between w-full'>
                        <div className='flex items-center justify-center'>
                            <h1 className="ml-[10px] fonteBold text-right text-laranja">R$ {(dados.lojasM.faturamentoTotal).toLocaleString('pt-BR')}</h1>
                        </div>
                        <div className='flex flex items-center justify-center'>
                            <h1 className='mr-[10px] text-white fonteBold'>{(resultadoLojasM).toFixed(1)}</h1>
                            <img src={porcem} alt="porcentagem" className='w-[15px] h-[15px] mr-[10px] aspect-square' />
                        </div>
                    </div>
                </div>


                <div className="bg-roxo w-[17%] max-w-[40px] aspect-square rounded-[10px] left-[50%] bottom-[50%] flex justify-center items-center relative z-6">
                    <h1 className="text-white fonteBold">
                        {dados.lojasM.quantidade}
                    </h1>
                </div>

            </div>

            <div className="flex w-full h-1/4 place-content-around items-center flex-col bg-[#E06900] rounded-[20px]  mb-[20px] " >
                <div className='flex h-2/3 place-content-around items-center w-[90%] h-[70%]'>
                    <button className="bg-laranja h-[70%] aspect-square w-max-[70px] h-max-[70px] rounded-[20px] flex justify-center items-center relative " onClick={ComprarLojaG}>
                        <img src={LojaGImg} alt="despesas" className="w-max-[50px] w-[70%] aspect-square h-max-[50px] " />
                    </button>
                    <div className='flex w-[70%] flex-col place-content-around '>
                        <div>
                            <h1 className='fonteLight text-white text-start'>Lojas Grandes</h1>
                        </div>

                        <div className="bg-[#350973] w-[90%] h-[30px] rounded-[20px] flex items-center justify-between ">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={ConstuirImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold text-laranja">R$ {(dados.lojasG.preçoConstrução).toLocaleString('pt-BR')}</h1>

                        </div>
                    </div>
                </div>

                <div className="bg-[#350973] w-[90%] h-1/3 rounded-[20px] flex items-center mb-[10px]">
                    <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                        <img src={DolarImg} className="w-[18px] h-[18px]" />
                    </div>
                    <div className='flex place-content-between w-full'>
                        <div className='flex'>
                            <h1 className="ml-[10px] fonteBold text-right text-laranja">R$ {(dados.lojasG.faturamentoTotal).toLocaleString('pt-BR')}</h1>
                        </div>
                        <div className='flex flex items-center justify-center'>
                            <h1 className='mr-[10px] text-white fonteBold'>{(resultadoLojasG).toFixed(1)}</h1>
                            <img src={porcem} alt="porcentagem" className='w-[15px] h-[15px] mr-[10px] aspect-square' />
                        </div>
                    </div>
                </div>


                <div className="bg-roxo w-[17%] max-w-[40px] aspect-square rounded-[10px] left-[50%] bottom-[50%] flex justify-center items-center relative z-6">
                    <h1 className="text-white fonteBold">
                        {dados.lojasG.quantidade}
                    </h1>
                </div>

            </div>

        </div>




    )
}
