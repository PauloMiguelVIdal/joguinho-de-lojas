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







    // lojas P

    const ComprarLojaP = () => {
        if (dados.terrenos.quantidade < 1) {
            return alert("Você não tem terreno suficiente");
        }
        if (dados.saldo < dados.lojasP.preçoConstrução) {
            alert("Você não tem dinheiro suficiente para construir");
        } else {
            atualizarDados({ ...dados, lojasP: { ...dados.lojasP, quantidade: dados.lojasP.quantidade + 1 } });
            atualizarDados({ ...dados, terrenos: { ...dados.terrenos, quantidade: dados.terrenos.quantidade - 1 } });
            atualizarDados(dados.saldo - dados.lojasP.preçoConstrução);
        }
    };

// lojas M
const ComprarLojaM = () => {
    if (dados.terrenos.quantidade < 2) {
        return alert("Você não tem terrenos suficientes");
    }
    if (dados.saldo < dados.lojasM.preçoConstrução) {
        alert("Você não tem dinheiro suficiente para construir");
    } else {
        atualizarDados({ ...dados, lojasM: { ...dados.lojasM, quantidade: dados.lojasM.quantidade + 1 } });
        atualizarDados({ ...dados, terrenos: { ...dados.terrenos, quantidade: dados.terrenos.quantidade - 2 } });
        atualizarDados(dados.saldo - dados.lojasM.preçoConstrução);
    }
};

// lojas G
const ComprarLojaG = () => {
    if (dados.terrenos.quantidade < 3) {
        return alert("Você não tem terrenos suficientes");
    }
    if (dados.saldo < dados.lojasG.preçoConstrução) {
        alert("Você não tem dinheiro suficiente para construir");
    } else {
        atualizarDados({ ...dados, lojasG: { ...dados.lojasG, quantidade: dados.lojasG.quantidade + 1 } });
        atualizarDados({ ...dados, terrenos: { ...dados.terrenos, quantidade: dados.terrenos.quantidade - 3 } });
        atualizarDados(dados.saldo - dados.lojasG.preçoConstrução);
    }
};

// terreno
const ComprarTerreno = () => {
    if (dados.saldo < dados.preçosTerrenos) {
        alert("Você não tem dinheiro suficiente");
    } else {
        atualizarDados({ ...dados, terrenos: { ...dados.terrenos, quantidade: dados.terrenos.quantidade + 1 } });
        atualizarDados(dados.saldo - dados.preçosTerrenos);
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
                        <div className="bg-laranja w-[120px] h-[30px] rounded-[20px] flex items-center justify-between ml-[15px] mb-[10px]">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={DolarImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">{dados.terrenos.faturamentoTotal}</h1>
                        </div>
                        <div className="bg-laranja w-[120px] h-[30px] rounded-[20px] flex items-center justify-between ml-[15px]">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={ConstuirImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">{dados.terrenos.preço}</h1>
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
                        <div className="bg-laranja w-[120px] h-[30px] rounded-[20px] flex items-center justify-between ml-[15px] mb-[10px]">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={DolarImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">{dados.lojasP.faturamentoTotal}</h1>
                        </div>
                        <div className="bg-laranja w-[120px] h-[30px] rounded-[20px] flex items-center justify-between ml-[15px]">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={ConstuirImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">{dados.lojasP.preçoConstrução}</h1>
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
                        <div className="bg-laranja w-[120px] h-[30px] rounded-[20px] flex items-center justify-between ml-[15px] mb-[10px]">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={DolarImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">{dados.lojasM.faturamentoTotal}</h1>
                        </div>
                        <div className="bg-laranja w-[120px] h-[30px] rounded-[20px] flex items-center justify-between ml-[15px]">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={ConstuirImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">{dados.lojasM.preçoConstrução}</h1>
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
                        <div className="bg-laranja w-[120px] h-[30px] rounded-[20px] flex items-center justify-between ml-[15px] mb-[10px]">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={DolarImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">{dados.lojasG.faturamentoTotal}</h1>
                        </div>
                        <div className="bg-laranja w-[120px] h-[30px] rounded-[20px] flex items-center justify-between ml-[15px]">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={ConstuirImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">{dados.lojasG.preçoConstrução}</h1>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
  )
}
