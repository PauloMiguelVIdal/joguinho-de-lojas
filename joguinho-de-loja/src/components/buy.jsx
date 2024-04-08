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
        dadosSaldo, AtualizarDadosSaldo,
        dadosDia, AtualizarDadosDia,

        //modal
        estadoModal, AtualizarEstadoModal,

        //seção terrenos
        dadosTerrenos, AtualizarDadosTerrenos,
        dadosPreçosTerrenos, AtualizarDadosPreçosTerrenos,


        // seçãolojas p
        dadosLojasP, AtualizarDadosLojasP,
        dadosPreçosConstruçãoLojaP, AtualizarDadosPreçoConstruçãoLojasP,
        dadosFaturamentoMínimoLojasP, AtualizarDadosFaturamentoMínimoLojasP,
        dadosFaturamentoMáximoLojasP, AtualizarDadosFaturamentoMáximoLojasP,
        dadosFaturamentoUnitárioLojasP, AtualizarDadosFaturamentoUnitárioLojasP,
        dadosFaturamentoTotalLojasP, AtualizarDadosFaturamentoTotalLojasP,





        //seção lojas m
        dadosLojasM, AtualizarDadosLojasM, AtualizarDadosDespesasLojasM, dadosDespesasLojasM,
        dadosPreçosConstruçãoLojaM, AtualizarDadosPreçoConstruçãoLojasM,
        dadosFaturamentoUnitárioLojasM, AtualizarDadosFaturamentoUnitárioLojasM,
        dadosFaturamentoTotalLojasM, AtualizarDadosFaturamentoTotalLojasM,
        dadosFaturamentoMínimoLojasM, AtualizarDadosFaturamentoMínimoLojasM,
        dadosFaturamentoMáximoLojasM, AtualizarDadosFaturamentoMáximoLojasM,




        //seção lojas g
        dadosLojasG, AtualizarDadosLojasG, AtualizarDadosDespesasLojasG, dadosDespesasLojasG,
        dadosPreçosConstruçãoLojaG, AtualizarDadosPreçoConstruçãoLojasG,
        dadosFaturamentoMínimoLojasG, AtualizarDadosFaturamentoMínimoLojasG,
        dadosFaturamentoMáximoLojasG, AtualizarDadosFaturamentoMáximoLojasG,
        dadosFaturamentoUnitárioLojasG, AtualizarDadosFaturamentoUnitárioLojasG,
        dadosFaturamentoTotalLojasG, AtualizarDadosFaturamentoTotalLojasG,





        //seção funcionários
        dadosCustoFuncionário, AtualizarDadosCustoFuncionário,
        dadosCustoMáximoFuncionário, AtualizarDadosCustoMáximoFuncionário,
        dadosCustoMínimoFuncionário, AtualizarDadosCustoMínimoFuncionário,



    } = useContext(CentraldeDadosContext)







    // lojas P

    const ComprarLojaP = () => {
        if (dadosTerrenos < 1) {
            return alert("você não tem terreno suficiente")
        }
        if (dadosSaldo < dadosPreçosConstruçãoLojaP) {
            alert("você não tem dinheiro suficiente para construir")
        } else {
            AtualizarDadosLojasP(dadosLojasP + 1)
            AtualizarDadosTerrenos(dadosTerrenos - 1)
            AtualizarDadosSaldo(dadosSaldo - dadosPreçosConstruçãoLojaP)
        }
    }




    // lojas M
    const ComprarLojaM = () => {
        if (dadosTerrenos < 2) {
            return alert("você não tem terrenos suficiente")
        }
        if (dadosSaldo < dadosPreçosConstruçãoLojaM) {
            alert("você não tem dinheiro suficiente para construir")
        } else {
            AtualizarDadosLojasM(dadosLojasM + 1)
            AtualizarDadosTerrenos(dadosTerrenos - 2)
            AtualizarDadosSaldo(dadosSaldo - dadosPreçosConstruçãoLojaM)
        }
    }



    // lojas G


    const ComprarLojaG = () => {
        if (dadosTerrenos < 3) {
            return alert("você não tem terrenos suficiente")
        }
        if (dadosSaldo < dadosPreçosConstruçãoLojaG) {
            alert("você não tem dinheiro suficiente para construir")
        } else {
            AtualizarDadosLojasG(dadosLojasG + 1)
            AtualizarDadosTerrenos(dadosTerrenos - 3)
            AtualizarDadosSaldo(dadosSaldo - dadosPreçosConstruçãoLojaG)
        }
    }


    //terreno
    const ComprarTerreno = () => {
        if (dadosSaldo < dadosPreçosTerrenos) {
            alert("você não tem dinheiro suficiente")
        } else {
            AtualizarDadosTerrenos(dadosTerrenos + 1)
            AtualizarDadosSaldo(dadosSaldo - dadosPreçosTerrenos)
        }
    }



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
                                {dadosTerrenos}
                            </h1>
                        </div>
                    </button>
                    <div>
                        <div className="bg-laranja w-[120px] h-[30px] rounded-[20px] flex items-center justify-between ml-[15px] mb-[10px]">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={DolarImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">adc fatu</h1>
                        </div>
                        <div className="bg-laranja w-[120px] h-[30px] rounded-[20px] flex items-center justify-between ml-[15px]">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={ConstuirImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">{dadosPreçosTerrenos}</h1>
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
                                {dadosLojasP}
                            </h1>
                        </div>
                    </button>
                    <div>
                        <div className="bg-laranja w-[120px] h-[30px] rounded-[20px] flex items-center justify-between ml-[15px] mb-[10px]">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={DolarImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">{dadosFaturamentoTotalLojasP}</h1>
                        </div>
                        <div className="bg-laranja w-[120px] h-[30px] rounded-[20px] flex items-center justify-between ml-[15px]">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={ConstuirImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">{dadosPreçosConstruçãoLojaP}</h1>
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
                                {dadosLojasM}
                            </h1>
                        </div>
                    </button>
                    <div>
                        <div className="bg-laranja w-[120px] h-[30px] rounded-[20px] flex items-center justify-between ml-[15px] mb-[10px]">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={DolarImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">{dadosFaturamentoTotalLojasM}</h1>
                        </div>
                        <div className="bg-laranja w-[120px] h-[30px] rounded-[20px] flex items-center justify-between ml-[15px]">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={ConstuirImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">{dadosPreçosConstruçãoLojaM}</h1>
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
                                {dadosLojasG}
                            </h1>
                        </div>
                    </button>
                    <div>
                        <div className="bg-laranja w-[120px] h-[30px] rounded-[20px] flex items-center justify-between ml-[15px] mb-[10px]">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={DolarImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">{dadosFaturamentoTotalLojasG}</h1>
                        </div>
                        <div className="bg-laranja w-[120px] h-[30px] rounded-[20px] flex items-center justify-between ml-[15px]">
                            <div className="bg-roxo w-[25px] h-[25px] rounded-full flex items-center justify-center ml-[4px]" >
                                <img src={ConstuirImg} className="w-[18px] h-[18px]" />
                            </div>
                            <h1 className="mr-[10px] fonteBold">{dadosPreçosConstruçãoLojaG}</h1>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
  )
}
