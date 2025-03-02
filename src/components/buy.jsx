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


    return (

        <div className="flex justify-around flex-col">
            {/* Container de Terrenos */}
            <div className="flex flex-col h-[22vh] w-[30vw] p-4 bg-[#290064] shadow-lg rounded-[20px] mb-4 relative w-max-[400px]">
                <div className="flex flex-col h-full">
                    <div className="flex h-[85%] items-center">
                        {/* Container principal com place-content-between */}
                        <div className="flex justify-around w-full mb-4 h-full">
                            {/* Botão de compra de terreno */}
                            <div className="flex flex-col h-full justify-around">
                                <div className="bg-laranja h-[60%] aspect-square rounded-[10px] flex justify-center items-center">
                                    <button className="flex justify-center items-center w-full h-full hover:bg-[#E56100] hover:rounded-[10px] active:scale-95 hover:scale-[1.05]" onClick={ComprarTerreno}>
                                        <img src={terrenoImg} alt="despesas" className="w-[50px] h-[50px]" />
                                    </button>
                                </div>
                                {/* Botões de aumentar/diminuir quantidade */}
                                <div className="flex items-center mt-2">
                                    <button className="bg-[#6411D9] w-8 h-8 rounded-[5px] flex justify-center items-center hover:bg-[#834EDB] active:scale-95" onClick={DiminuirQuantidadeTerrenos}>
                                        <img src={menos} className="w-4 h-4" />
                                    </button>

                                    <div className="bg-[#350973] w-8 h-8 rounded-[5px] flex justify-center items-center mx-2">
                                        <h1 className="text-white text-xl font-bold">{quantidadeTerrenos}</h1>
                                    </div>
                                    <button className="bg-[#6411D9] w-8 h-8 rounded-[5px] flex justify-center items-center hover:bg-[#834EDB] active:scale-95" onClick={AumentarQuantidadeTerrenos}>
                                        <img src={mais} className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Informações do terreno */}
                            <div className="flex flex-col w-[80%] mr-8 ml-4 justify-between h-full">
                                {/* Título "Terrenos" */}
                                <div className="bg-gradient-to-l from-[#6411D9] to-[#F27405] h-[30%] rounded-[5px] ">
                                    <h1 className="text-white text-xl font-bold ml-[10px]">Terrenos</h1>
                                </div>

                                {/* Informações de preço */}
                                <div className="  rounded-[5px]  h-[22%] ">
                                    <div className="bg-[#6411D9] w-full rounded-[2px] flex items-center justify-between  p-1">

                                        <h1 className="text-white font-bold ml-[10px]">Preço construção</h1>

                                        <h1 className="text-white font-bold mr-[10px]">{(dados.terrenos.preçoConstrução).toLocaleString('pt-BR')}</h1>
                                    </div>
                                </div>

                                {/* Rodapé com faturamento */}
                                <div className="bg-[#350973] rounded-[20px] flex items-center justify-between h-[30%] h-8 mt-2">
                                  
                                        <h1 className="text-white font-bold ml-[10px]">Valor total</h1>
                                        <h1 className="text-white font-bold mr-[10px]">{(dados.terrenos.preçoConstrução * quantidadeTerrenos).toLocaleString('pt-BR')}</h1>
                                 
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Rodapé do container */}
                    <div className="bg-gradient-to-l from-[#6411D9] to-[#F27405] rounded-[20px] flex items-center justify-between h-full ">
                        <div className="flex items-center">
                            <img src={DolarImg} className="w-6 h-6" />
                            <h1 className="text-white fonteBold text-[20px] ml-2">{(dados.terrenos.faturamentoTotal).toLocaleString('pt-BR')}</h1>
                        </div>
                        <div className="flex items-center">
                            <h1 className="text-white font-bold mr-2 text-[20px]">{(resultadoTerrenos).toFixed(1)}</h1>
                            <img src={porcem} alt="porcentagem" className="w-5 h-5 mr-[5px]" />
                        </div>
                    </div>
                </div>
                {/* Quadrado roxo centralizado na borda direita */}
                <div className="bg-roxo w-12 h-12 rounded-[10px] border-[2px] border-laranja text-[20px] flex justify-center items-center absolute -right-6 top-1/2 transform -translate-y-1/2">
                    <h1 className="text-white font-bold">{dados.terrenos.quantidade}</h1>
                </div>
            </div>



            <div className="flex flex-col h-[22vh] w-[30vw] p-4 bg-[#290064] shadow-lg rounded-[20px] mb-4 relative w-max-[400px]">
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
                                <div className="bg-gradient-to-l from-[#6411D9] to-[#F27405] h-[30%] rounded-[5px] ">
                                    <h1 className="text-white text-xl font-bold ml-[10px]">Lojas Pequenas</h1>
                                </div>

                                {/* Informações de preço */}
                                <div className="  rounded-[5px]  h-[22%] ">
                                    <div className="bg-[#6411D9] w-full rounded-[2px] flex items-center justify-between  p-1">

                                        <h1 className="text-white font-bold ml-[10px]">Preço construção</h1>

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

            <div className="flex flex-col h-[22vh] w-[30vw] p-4 bg-[#290064] shadow-lg rounded-[20px] mb-4 relative w-max-[400px]">
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
                                <div className="bg-gradient-to-l from-[#6411D9] to-[#F27405] h-[30%] rounded-[5px] ">
                                    <h1 className="text-white text-xl font-bold ml-[10px]">Lojas Médias</h1>
                                </div>

                                {/* Informações de preço */}
                                <div className="  rounded-[5px]  h-[22%] ">
                                    <div className="bg-[#6411D9] w-full rounded-[2px] flex items-center justify-between  p-1">

                                        <h1 className="text-white font-bold ml-[10px]">Preço construção</h1>

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
                <div className="bg-roxo w-12 h-12 rounded-[10px] text-[20px] flex justify-center items-center absolute -right-6 top-1/2 transform -translate-y-1/2">
                    <h1 className="text-white font-bold">{dados.lojasM.quantidade}</h1>
                </div>
            </div>

            <div className="flex flex-col h-[22vh] w-[30vw] p-4 bg-[#290064] shadow-lg rounded-[20px] mb-4 relative w-max-[400px]">
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
                                <div className="bg-gradient-to-l from-[#6411D9] to-[#F27405] h-[30%] rounded-[5px] ">
                                    <h1 className="text-white text-xl font-bold ml-[10px]">Lojas Grandes</h1>
                                </div>

                                {/* Informações de preço */}
                                <div className="  rounded-[5px]  h-[22%] ">
                                    <div className="bg-[#6411D9] w-full rounded-[2px] flex items-center justify-between  p-1">

                                        <h1 className="text-white font-bold ml-[10px]">Preço construção</h1>

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
                <div className="bg-roxo w-12 h-12 rounded-[10px] text-[20px] flex justify-center items-center absolute -right-6 top-1/2 transform -translate-y-1/2 ">
                    <h1 className="text-white font-bold">{dados.lojasG.quantidade}</h1>
                </div>
            </div>



        </div>
        //     <div className="flex justify-around flex-col">
        //     {/* Container de Terrenos */}
        //     <div className="flex flex-col h-[22vh] w-[30vw] p-4 bg-[#290064] rounded-[20px] mb-4 relative">
        //         <div className="flex flex-col h-full">
        //             <div className="flex h-[85%] items-center">
        //                 {/* Container principal com place-content-between */}
        //                 <div className="flex justify-between w-full mb-4">
        //                     {/* Botão de compra de terreno */}
        //                     <div className="flex flex-col">
        //                         <div className="bg-laranja h-[80%] aspect-square rounded-[20px] flex justify-center items-center">
        //                             <button className="flex justify-center items-center w-full h-full" onClick={ComprarTerreno}>
        //                                 <img src={terrenoImg} alt="despesas" className="w-[50px] h-[50px]" />
        //                             </button>
        //                         </div>
        //                         {/* Botões de aumentar/diminuir quantidade */}
        //                         <div className="flex items-center mt-2">
        //                             <button className="bg-[#6411D9] w-8 h-8 rounded-[5px] flex justify-center items-center" onClick={AumentarQuantidadeTerrenos}>
        //                                 <img src={mais} className="w-4 h-4" />
        //                             </button>
        //                             <div className="bg-[#350973] w-8 h-8 rounded-[5px] flex justify-center items-center mx-2">
        //                                 <h1 className="text-white text-xl font-bold">{quantidadeTerrenos}</h1>
        //                             </div>
        //                             <button className="bg-[#6411D9] w-8 h-8 rounded-[5px] flex justify-center items-center" onClick={DiminuirQuantidadeTerrenos}>
        //                                 <img src={menos} className="w-4 h-4" />
        //                             </button>
        //                         </div>
        //                     </div>

        //                     {/* Informações do terreno */}
        //                     <div className="flex flex-col w-[60%] mr-8 ml-4 justify-between h-full">
        //                         {/* Título "Terrenos" */}
        //                         <div className="bg-gradient-to-l from-[#6411D9] to-[#F27405] rounded-[5px] p-2">
        //                             <h1 className="text-white text-xl font-bold">Terrenos</h1>
        //                         </div>

        //                         {/* Informações de preço */}
        //                         <div className="bg-gradient-to-l to-[#350973] from-[#6411D9] rounded-[5px] p-2 mt-2">
        //                             <div className="flex items-center">
        //                                 <div className="bg-roxo w-4 h-4 rounded-[5px] flex items-center justify-center">
        //                                     <img src={ConstuirImg} className="h-3" />
        //                                 </div>
        //                                 <div className="bg-[#350973] w-full h-4 rounded-[2px] flex items-center justify-between ml-2">
        //                                     <h1 className="text-[#6A00FF] font-bold">Inicial</h1>
        //                                     <h1 className="text-[#6A00FF] font-bold">{(dados.terrenos.preçoConstrução).toLocaleString('pt-BR')}</h1>
        //                                 </div>
        //                             </div>
        //                             <div className="bg-[#6411D9] w-full rounded-[2px] flex items-center justify-between mt-2 p-1">
        //                                 <h1 className="text-white font-bold">Atual</h1>
        //                                 <h1 className="text-white font-bold">{(dados.terrenos.preçoConstrução).toLocaleString('pt-BR')}</h1>
        //                             </div>
        //                         </div>

        //                         {/* Rodapé com faturamento */}
        //                         <div className="bg-[#350973] rounded-[20px] flex items-center justify-between p-2 mt-2">
        //                             <div className="flex items-center">
        //                                 <img src={DolarImg} className="w-4 h-4" />
        //                                 <h1 className="text-roxo font-bold ml-2">{(dados.terrenos.preçoConstrução).toLocaleString('pt-BR')}</h1>
        //                             </div>
        //                             <div className="flex items-center ml-4">
        //                                 <h1 className="text-roxo font-bold mr-2">{(resultadoTerrenos).toFixed(1)}</h1>
        //                                 <img src={porcem} alt="porcentagem" className="w-4 h-4" />
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>

        //             {/* Rodapé do container */}
        //             <div className="bg-gradient-to-l from-[#6411D9] to-[#F27405] rounded-[20px] flex items-center justify-between p-2">
        //                 <div className="flex items-center">
        //                     <img src={DolarImg} className="w-6 h-6" />
        //                     <h1 className="text-white fonteBold text-[20px] ml-2">{(dados.terrenos.faturamentoTotal).toLocaleString('pt-BR')}</h1>
        //                 </div>
        //                 <div className="flex items-center">
        //                     <h1 className="text-white font-bold mr-2 text-[20px]">{(resultadoTerrenos).toFixed(1)}</h1>
        //                     <img src={porcem} alt="porcentagem" className="w-5 h-5 mr-[5px]" />
        //                 </div>
        //             </div>
        //         </div>
        //         {/* Quadrado roxo centralizado na borda direita */}
        //         <div className="bg-roxo w-12 h-12 rounded-[10px] text-[20px] flex justify-center items-center absolute -right-6 top-1/2 transform -translate-y-1/2">
        //             <h1 className="text-white font-bold">{dados.terrenos.quantidade}</h1>
        //         </div>
        //     </div>

        //     {/* Container de Lojas Pequenas */}
        //     <div className="flex flex-col h-[22vh] w-[30vw] p-4 bg-[#290064] rounded-[20px] mb-4 relative">
        //         <div className="flex flex-col h-full">
        //             <div className="flex h-[85%] items-center">
        //                 <div className="flex justify-between w-full mb-4">
        //                     {/* Botão de compra de loja pequena */}
        //                     <div className="flex flex-col">
        //                         <div className="bg-laranja h-[80%] aspect-square rounded-[20px] flex justify-center items-center">
        //                             <button className="flex justify-center items-center w-full h-full" onClick={ComprarLojaP}>
        //                                 <img src={LojaPImg} alt="loja pequena" className="w-[50px] h-[50px]" />
        //                             </button>
        //                         </div>
        //                         {/* Botões de aumentar/diminuir quantidade */}
        //                         <div className="flex items-center mt-2">
        //                             <button className="bg-[#6411D9] w-8 h-8 rounded-[5px] flex justify-center items-center" onClick={AumentarQuantidadeLojasP}>
        //                                 <img src={mais} className="w-4 h-4" />
        //                             </button>
        //                             <div className="bg-[#350973] w-8 h-8 rounded-[5px] flex justify-center items-center mx-2">
        //                                 <h1 className="text-white text-xl font-bold">{quantidadeLojasP}</h1>
        //                             </div>
        //                             <button className="bg-[#6411D9] w-8 h-8 rounded-[5px] flex justify-center items-center" onClick={DiminuirQuantidadeLojasP}>
        //                                 <img src={menos} className="w-4 h-4" />
        //                             </button>
        //                         </div>
        //                     </div>

        //                     {/* Informações da loja pequena */}
        //                     <div className="flex flex-col w-[60%] mr-8 ml-4 justify-between h-full">
        //                         {/* Título "Lojas Pequenas" */}
        //                         <div className="bg-gradient-to-l from-[#6411D9] to-[#F27405] rounded-[5px] p-2">
        //                             <h1 className="text-white text-xl font-bold">Lojas Pequenas</h1>
        //                         </div>

        //                         {/* Informações de preço */}
        //                         <div className="bg-gradient-to-l to-[#350973] from-[#6411D9] rounded-[5px] p-2 mt-2">
        //                             <div className="flex items-center">
        //                                 <div className="bg-roxo w-4 h-4 rounded-[5px] flex items-center justify-center">
        //                                     <img src={ConstuirImg} className="h-3" />
        //                                 </div>
        //                                 <div className="bg-[#350973] w-full h-4 rounded-[2px] flex items-center justify-between ml-2">
        //                                     <h1 className="text-[#6A00FF] font-bold">Inicial</h1>
        //                                     <h1 className="text-[#6A00FF] font-bold">{(dados.lojasP.preçoConstrução).toLocaleString('pt-BR')}</h1>
        //                                 </div>
        //                             </div>
        //                             <div className="bg-[#6411D9] w-full rounded-[2px] flex items-center justify-between mt-2 p-1">
        //                                 <h1 className="text-white font-bold">Atual</h1>
        //                                 <h1 className="text-white font-bold">{(dados.lojasP.preçoConstrução).toLocaleString('pt-BR')}</h1>
        //                             </div>
        //                         </div>

        //                         {/* Rodapé com faturamento */}
        //                         <div className="bg-[#350973] rounded-[20px] flex items-center justify-between p-2 mt-2">
        //                             <div className="flex items-center">
        //                                 <img src={DolarImg} className="w-4 h-4" />
        //                                 <h1 className="text-roxo font-bold ml-2">{(dados.lojasP.preçoConstrução).toLocaleString('pt-BR')}</h1>
        //                             </div>
        //                             <div className="flex items-center ml-4">
        //                                 <h1 className="text-roxo font-bold mr-2">{(resultadoLojasP).toFixed(1)}</h1>
        //                                 <img src={porcem} alt="porcentagem" className="w-4 h-4" />
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>

        //             {/* Rodapé do container */}
        //             <div className="bg-gradient-to-l from-[#6411D9] to-[#F27405] rounded-[20px] flex items-center justify-between p-2">
        //                 <div className="flex items-center">
        //                     <img src={DolarImg} className="w-6 h-6" />
        //                     <h1 className="text-white fonteBold text-[20px] ml-2">{(dados.lojasP.faturamentoTotal).toLocaleString('pt-BR')}</h1>
        //                 </div>
        //                 <div className="flex items-center">
        //                     <h1 className="text-white font-bold mr-2 text-[20px]">{(resultadoLojasP).toFixed(1)}</h1>
        //                     <img src={porcem} alt="porcentagem" className="w-5 h-5 mr-[5px]" />
        //                 </div>
        //             </div>
        //         </div>
        //         {/* Quadrado roxo centralizado na borda direita */}
        //         <div className="bg-roxo w-12 h-12 rounded-[10px] text-[20px] flex justify-center items-center absolute -right-6 top-1/2 transform -translate-y-1/2">
        //             <h1 className="text-white font-bold">{dados.lojasP.quantidade}</h1>
        //         </div>
        //     </div>

        //     {/* Container de Lojas Médias */}
        //     <div className="flex flex-col h-[22vh] w-[30vw] p-4 bg-[#290064] rounded-[20px] mb-4 relative">
        //         <div className="flex flex-col h-full">
        //             <div className="flex h-[85%] items-center">
        //                 <div className="flex justify-between w-full mb-4">
        //                     {/* Botão de compra de loja média */}
        //                     <div className="flex flex-col">
        //                         <div className="bg-laranja h-[80%] aspect-square rounded-[20px] flex justify-center items-center">
        //                             <button className="flex justify-center items-center w-full h-full" onClick={ComprarLojaM}>
        //                                 <img src={LojaMImg} alt="loja média" className="w-[50px] h-[50px]" />
        //                             </button>
        //                         </div>
        //                         {/* Botões de aumentar/diminuir quantidade */}
        //                         <div className="flex items-center mt-2">
        //                             <button className="bg-[#6411D9] w-8 h-8 rounded-[5px] flex justify-center items-center" onClick={AumentarQuantidadeLojasM}>
        //                                 <img src={mais} className="w-4 h-4" />
        //                             </button>
        //                             <div className="bg-[#350973] w-8 h-8 rounded-[5px] flex justify-center items-center mx-2">
        //                                 <h1 className="text-white text-xl font-bold">{quantidadeLojasM}</h1>
        //                             </div>
        //                             <button className="bg-[#6411D9] w-8 h-8 rounded-[5px] flex justify-center items-center" onClick={DiminuirQuantidadeLojasM}>
        //                                 <img src={menos} className="w-4 h-4" />
        //                             </button>
        //                         </div>
        //                     </div>

        //                     {/* Informações da loja média */}
        //                     <div className="flex flex-col w-[60%] mr-8 ml-4 justify-between h-full">
        //                         {/* Título "Lojas Médias" */}
        //                         <div className="bg-gradient-to-l from-[#6411D9] to-[#F27405] rounded-[5px] p-2">
        //                             <h1 className="text-white text-xl font-bold">Lojas Médias</h1>
        //                         </div>

        //                         {/* Informações de preço */}
        //                         <div className="bg-gradient-to-l to-[#350973] from-[#6411D9] rounded-[5px] p-2 mt-2">
        //                             <div className="flex items-center">
        //                                 <div className="bg-roxo w-4 h-4 rounded-[5px] flex items-center justify-center">
        //                                     <img src={ConstuirImg} className="h-3" />
        //                                 </div>
        //                                 <div className="bg-[#350973] w-full h-4 rounded-[2px] flex items-center justify-between ml-2">
        //                                     <h1 className="text-[#6A00FF] font-bold">Inicial</h1>
        //                                     <h1 className="text-[#6A00FF] font-bold">{(dados.lojasM.preçoConstrução).toLocaleString('pt-BR')}</h1>
        //                                 </div>
        //                             </div>
        //                             <div className="bg-[#6411D9] w-full rounded-[2px] flex items-center justify-between mt-2 p-1">
        //                                 <h1 className="text-white font-bold">Atual</h1>
        //                                 <h1 className="text-white font-bold">{(dados.lojasM.preçoConstrução).toLocaleString('pt-BR')}</h1>
        //                             </div>
        //                         </div>

        //                         {/* Rodapé com faturamento */}
        //                         <div className="bg-[#350973] rounded-[20px] flex items-center justify-between p-2 mt-2">
        //                             <div className="flex items-center">
        //                                 <img src={DolarImg} className="w-4 h-4" />
        //                                 <h1 className="text-roxo font-bold ml-2">{(dados.lojasM.preçoConstrução).toLocaleString('pt-BR')}</h1>
        //                             </div>
        //                             <div className="flex items-center ml-4">
        //                                 <h1 className="text-roxo font-bold mr-2">{(resultadoLojasM).toFixed(1)}</h1>
        //                                 <img src={porcem} alt="porcentagem" className="w-4 h-4" />
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>

        //             {/* Rodapé do container */}
        //             <div className="bg-gradient-to-l from-[#6411D9] to-[#F27405] rounded-[20px] flex items-center justify-between p-2">
        //                 <div className="flex items-center">
        //                     <img src={DolarImg} className="w-6 h-6" />
        //                     <h1 className="text-white fonteBold text-[20px] ml-2">{(dados.lojasM.faturamentoTotal).toLocaleString('pt-BR')}</h1>
        //                 </div>
        //                 <div className="flex items-center">
        //                     <h1 className="text-white font-bold mr-2 text-[20px]">{(resultadoLojasM).toFixed(1)}</h1>
        //                     <img src={porcem} alt="porcentagem" className="w-5 h-5 mr-[5px]" />
        //                 </div>
        //             </div>
        //         </div>
        //         {/* Quadrado roxo centralizado na borda direita */}
        //         <div className="bg-roxo w-12 h-12 rounded-[10px] text-[20px] flex justify-center items-center absolute -right-6 top-1/2 transform -translate-y-1/2">
        //             <h1 className="text-white font-bold">{dados.lojasM.quantidade}</h1>
        //         </div>
        //     </div>

        //     {/* Container de Lojas Grandes */}
        //     <div className="flex flex-col h-[22vh] w-[30vw] p-4 bg-[#290064] rounded-[20px] mb-4 relative">
        //         <div className="flex flex-col h-full">
        //             <div className="flex h-[85%] items-center">
        //                 <div className="flex justify-between w-full mb-4">
        //                     {/* Botão de compra de loja grande */}
        //                     <div className="flex flex-col">
        //                         <div className="bg-laranja h-[80%] aspect-square rounded-[20px] flex justify-center items-center">
        //                             <button className="flex justify-center items-center w-full h-full" onClick={ComprarLojaG}>
        //                                 <img src={LojaGImg} alt="loja grande" className="w-[50px] h-[50px]" />
        //                             </button>
        //                         </div>
        //                         {/* Botões de aumentar/diminuir quantidade */}
        //                         <div className="flex items-center mt-2">
        //                             <button className="bg-[#6411D9] w-8 h-8 rounded-[5px] flex justify-center items-center" onClick={AumentarQuantidadeLojasG}>
        //                                 <img src={mais} className="w-4 h-4" />
        //                             </button>
        //                             <div className="bg-[#350973] w-8 h-8 rounded-[5px] flex justify-center items-center mx-2">
        //                                 <h1 className="text-white text-xl font-bold">{quantidadeLojasG}</h1>
        //                             </div>
        //                             <button className="bg-[#6411D9] w-8 h-8 rounded-[5px] flex justify-center items-center" onClick={DiminuirQuantidadeLojasG}>
        //                                 <img src={menos} className="w-4 h-4" />
        //                             </button>
        //                         </div>
        //                     </div>

        //                     {/* Informações da loja grande */}
        //                     <div className="flex flex-col w-[60%] mr-8 ml-4 justify-between h-full">
        //                         {/* Título "Lojas Grandes" */}
        //                         <div className="bg-gradient-to-l from-[#6411D9] to-[#F27405] rounded-[5px] p-2">
        //                             <h1 className="text-white text-xl font-bold">Lojas Grandes</h1>
        //                         </div>

        //                         {/* Informações de preço */}
        //                         <div className="bg-gradient-to-l to-[#350973] from-[#6411D9] rounded-[5px] p-2 mt-2">
        //                             <div className="flex items-center">
        //                                 <div className="bg-roxo w-4 h-4 rounded-[5px] flex items-center justify-center">
        //                                     <img src={ConstuirImg} className="h-3" />
        //                                 </div>
        //                                 <div className="bg-[#350973] w-full h-4 rounded-[2px] flex items-center justify-between ml-2">
        //                                     <h1 className="text-[#6A00FF] font-bold">Inicial</h1>
        //                                     <h1 className="text-[#6A00FF] font-bold">{(dados.lojasG.preçoConstrução).toLocaleString('pt-BR')}</h1>
        //                                 </div>
        //                             </div>
        //                             <div className="bg-[#6411D9] w-full rounded-[2px] flex items-center justify-between mt-2 p-1">
        //                                 <h1 className="text-white font-bold">Atual</h1>
        //                                 <h1 className="text-white font-bold">{(dados.lojasG.preçoConstrução).toLocaleString('pt-BR')}</h1>
        //                             </div>
        //                         </div>

        //                         {/* Rodapé com faturamento */}
        //                         <div className="bg-[#350973] rounded-[20px] flex items-center justify-between p-2 mt-2">
        //                             <div className="flex items-center">
        //                                 <img src={DolarImg} className="w-4 h-4" />
        //                                 <h1 className="text-roxo font-bold ml-2">{(dados.lojasG.preçoConstrução).toLocaleString('pt-BR')}</h1>
        //                             </div>
        //                             <div className="flex items-center ml-4">
        //                                 <h1 className="text-roxo font-bold mr-2">{(resultadoLojasG).toFixed(1)}</h1>
        //                                 <img src={porcem} alt="porcentagem" className="w-4 h-4" />
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>

        //             {/* Rodapé do container */}
        //             <div className="bg-gradient-to-l from-[#6411D9] to-[#F27405] rounded-[20px] flex items-center justify-between p-2">
        //                 <div className="flex items-center">
        //                     <img src={DolarImg} className="w-6 h-6" />
        //                     <h1 className="text-white fonteBold text-[20px] ml-2">{(dados.lojasG.faturamentoTotal).toLocaleString('pt-BR')}</h1>
        //                 </div>
        //                 <div className="flex items-center">
        //                     <h1 className="text-white font-bold mr-2 text-[20px]">{(resultadoLojasG).toFixed(1)}</h1>
        //                     <img src={porcem} alt="porcentagem" className="w-5 h-5 mr-[5px]" />
        //                 </div>
        //             </div>
        //         </div>
        //         {/* Quadrado roxo centralizado na borda direita */}
        //         <div className="bg-roxo w-12 h-12 rounded-[10px] text-[20px] flex justify-center items-center absolute -right-6 top-1/2 transform -translate-y-1/2">
        //             <h1 className="text-white font-bold">{dados.lojasG.quantidade}</h1>
        //         </div>
        //     </div>
        // </div>



    )
}