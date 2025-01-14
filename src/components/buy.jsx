import React from 'react'
import { useContext } from 'react'
import { CentraldeDadosContext } from '../centralDeDadosContext'
import terrenoImg from "../imagens/terreno.png"
import LojaPImg from "../imagens/lojaP.png"
import LojaMImg from "../imagens/lojaM.png"
import LojaGImg from "../imagens/lojaG.png"
import ConstuirImg from "../imagens/construir.png"
import DolarImg from "../imagens/simbolo-do-dolar.png"



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
    <div className="grid row-1 cols-1">
    <div className="flex flex-col ">

        <div className=" flex flex-col w-full h-full">
            <div className="flex justify-around flex-col h-full w-full  ">
                <div className="flex w-full h-1/4 place-content-around items-center  bg-[#6411D9] rounded-[20px]  mb-[20px] " >
                    <button className="bg-laranja w-[70px] h-[70px] rounded-[20px] flex justify-center items-center relative " onClick={ComprarTerreno}>

                        <img src={terrenoImg} alt="despesas" className="w-[50px] h-[50px] " />
                        <div className="bg-marinho w-[36px] h-[36px] rounded-full left-[-18px] top-[50px] flex justify-center items-center border-white border-[1px] absolute">
                            <h1 className="text-laranja fonteBold">
                                {dados.terrenos.quantidade}
                            </h1>
                        </div>
                    </button>
                    <div className='flex  w-[70%] flex-col'>
                        <div className="bg-laranja w-full h-[30px] rounded-[20px] flex items-center justify-between  mb-[10px]">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={DolarImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">R$ {dados.terrenos.faturamentoTotal}</h1>
                        </div>
                        <div className="bg-laranja w-full h-[30px] rounded-[20px] flex items-center justify-between ">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={ConstuirImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">R$ {dados.terrenos.preçoConstrução}</h1>
                        </div>
                    </div>
                </div>
                <div className="flex w-full h-1/4 place-content-around items-center bg-[#6411D9] rounded-[20px] mb-[20px] ">
                    <button
                        className="bg-laranja w-[70px] h-[70px] rounded-[20px] flex justify-center items-center relative "
                        onClick={ComprarLojaP}>
                        <img src={LojaPImg} alt="lojaP" className="w-[50px] h-[50px] " />
                        <div className="bg-marinho w-[36px] h-[36px] rounded-full left-[-18px] top-[50px] flex justify-center items-center border-white border-[1px] absolute">
                            <h1 className="text-laranja fonteBold">
                                {dados.lojasP.quantidade}
                            </h1>
                        </div>
                    </button>
                    <div className='flex  w-[70%] flex-col' >
                        <div className="bg-laranja w-full h-[30px] rounded-[20px] flex items-center justify-between  mb-[10px]">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={DolarImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">R$ {dados.lojasP.faturamentoTotal}</h1>
                        </div>
                        <div className="bg-laranja w-full h-[30px] rounded-[20px] flex items-center justify-between ">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={ConstuirImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">R$ {dados.lojasP.preçoConstrução}</h1>
                        </div>
                    </div>
                </div>

                <div className="flex w-full h-1/4 place-content-around items-center bg-[#6411D9] rounded-[20px] mb-[20px]">
                    <button
                        className="bg-laranja w-[70px] h-[70px] rounded-[20px] flex justify-center items-center relative "
                        onClick={ComprarLojaM}>
                        <img src={LojaMImg} alt="lojaM" className="w-[50px] h-[50px] " />
                        <div className="bg-marinho w-[36px] h-[36px] rounded-full left-[-18px] top-[50px] flex justify-center items-center border-white border-[1px] absolute">
                            <h1 className="text-laranja fonteBold">
                                {dados.lojasM.quantidade}
                            </h1>
                        </div>
                    </button>
                    <div className='flex  w-[70%] flex-col'>
                        <div className="bg-laranja w-full h-[30px] rounded-[20px] flex items-center justify-between  mb-[10px]">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={DolarImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">R$ {dados.lojasM.faturamentoTotal}</h1>
                        </div>
                        <div className="bg-laranja w-full h-[30px] rounded-[20px] flex items-center justify-between ">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={ConstuirImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">R$ {dados.lojasM.preçoConstrução}</h1>
                        </div>
                    </div>
                </div>


                <div className="flex w-full h-1/4 place-content-around items-center bg-[#6411D9] rounded-[20px]">
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
                    <div className='flex  w-[70%] flex-col'>
                        <div className="bg-laranja w-full h-[30px] rounded-[20px] flex items-center justify-between  mb-[10px]">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={DolarImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">R$ {dados.lojasG.faturamentoTotal}</h1>
                        </div>
                        <div className="bg-laranja w-full h-[30px] rounded-[20px] flex items-center justify-between ">
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
