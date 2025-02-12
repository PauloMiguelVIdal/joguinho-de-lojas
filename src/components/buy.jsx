import React from 'react'
import { useContext } from 'react'
import { CentraldeDadosContext } from '../centralDeDadosContext'
import terrenoImg from "../imagens/terreno.png"
import LojaPImg from "../imagens/lojaP.png"
import LojaMImg from "../imagens/lojaM.png"
import LojaGImg from "../imagens/lojaG.png"
import ConstuirImg from "../imagens/construir.png"
import DolarImg from "../imagens/simbolo-do-dolar.png"
import porcem from "../imagens/simbolo-de-porcentagem.png"
import {Statistic} from './statistic'



export default function Buy() {

    const {
        dados, atualizarDados
    } = useContext(CentraldeDadosContext)

    const { resultadoTerrenos , resultadoLojasP, resultadoLojasM, resultadoLojasG } = Statistic();





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
        if (dados.saldo < dados.terrenos.preçoConstrução) {
            alert("Você não tem dinheiro suficiente");
        } else {
            atualizarDados('terrenos', {
                ...dados.terrenos,
                quantidade: dados.terrenos.quantidade + 1
            });
            atualizarDados('saldo', dados.saldo - dados.terrenos.preçoConstrução);
        }
    };


    return (
      
            <div className="flex flex-col ">

                <div className=" flex flex-col w-full h-full">
                    <div className="flex justify-around flex-col h-full w-full max-h-[35%] ">

                        <div className="flex w-full h-1/4 place-content-around items-center flex-col bg-[#E06900] rounded-[20px]  mb-[20px] " >
                            <div className='flex h-2/3 place-content-around items-center w-[90%] h-[70%]'>
                                <button className="bg-laranja h-[70%] aspect-square w-max-[70px] h-max-[70px] rounded-[20px] flex justify-center items-center relative " onClick={ComprarTerreno}>
                                    <img src={terrenoImg} alt="despesas" className="w-max-[50px] w-[70%] aspect-square h-max-[50px] " />
                                </button>
                                <div className='flex w-[70%] flex-col place-content-around '>
                                    <div>
                                        <h1 className='fonteLight text-white text-start'>Terrenos</h1>
                                    </div>
                                  
                                    <div className="bg-[#350973] w-[90%] h-[30px] rounded-[20px] flex items-center justify-between ">
                                        <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                            <img src={ConstuirImg} className="w-[18px] h-[18px]" />
                                        </div>
                                        <h1 className="mr-[10px] fonteBold text-laranja">R$ {(dados.terrenos.preçoConstrução).toLocaleString('pt-BR')}</h1>
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






                        <div className="flex w-full h-1/4 place-content-around items-center flex-col bg-[#E06900] rounded-[20px]  mb-[20px] " >
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

                </div>
            </div>
       
    )
}
