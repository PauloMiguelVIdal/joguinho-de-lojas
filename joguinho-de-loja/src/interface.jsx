import React, { useContext, useState } from "react";
import { CentraldeDadosContext } from "./centralDeDadosContext";
import terrenoImg from "./imagens/terreno.png"
import LojaPImg from "./imagens/lojaP.png"
import LojaMImg from "./imagens/lojaM.png"
import LojaGImg from "./imagens/lojaG.png"
import ConstuirImg from "./imagens/construir.png"
import DolarImg from "./imagens/simbolo-do-dolar.png"
import PróximoImg from "./imagens/proximo.png"
import despesasImg from "./imagens/despesas.png"
// import Notificação from "./notificação";
function Interface() {
    const {
        dadosSaldo, AtualizarDadosSaldo,
        dadosDia, AtualizarDadosDia,

        //seção despesas
        dadosDiaDePagarDespesas, AtualizarDadosDiaPagarDespesas,
        dadosDespesasPagas, AtualizarDespesasPagas,
        AtualizarDadosDespesasLojasP, dadosDespesasLojasP,


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

    //seção próximo dia
    const ProximoDia = () => {
        if (dadosDia % 30 === 0) {
            AtualizarDespesasPagas(false)
            if (dadosDespesasPagas === false) {
                return alert("despesas não pagas, pague as despesas para avançar")
                // return notificação()
            }

        }
        AtualizarDadosDia(dadosDia + 1)
        gerarFaturamentoLojasP()
        gerarFaturamentoLojasM()
        gerarFaturamentoLojasG()
        AtualizarDadosFaturamentoTotalLojasP(dadosLojasP * dadosFaturamentoUnitárioLojasP)
        AtualizarDadosFaturamentoTotalLojasM(dadosLojasM * dadosFaturamentoUnitárioLojasM)
        AtualizarDadosFaturamentoTotalLojasG(dadosLojasG * dadosFaturamentoUnitárioLojasG)
        AtualizarDadosDespesasLojasP(dadosLojasP * 250)
        AtualizarDadosDespesasLojasM(dadosLojasM * 400)
        AtualizarDadosDespesasLojasG(dadosLojasG * 750)
        AtualizarDadosSaldo(dadosSaldo + dadosFaturamentoTotalLojasP + dadosFaturamentoTotalLojasM + dadosFaturamentoTotalLojasG)
    }

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


    let novoFatuUnitárioLojaP
    const gerarFaturamentoLojasP = () => {
        novoFatuUnitárioLojaP = Math.floor(Math.random() * (dadosFaturamentoMáximoLojasP - dadosFaturamentoMínimoLojasP + 1)) + dadosFaturamentoMínimoLojasP
        AtualizarDadosFaturamentoUnitárioLojasP(novoFatuUnitárioLojaP)
        // alert(`novo faturamento unitário: ${dadosFaturamentoUnitárioLojasP}`)
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


    let novoFatuUnitárioLojaM
    const gerarFaturamentoLojasM = () => {
        novoFatuUnitárioLojaM = Math.floor(Math.random() * (dadosFaturamentoMáximoLojasM - dadosFaturamentoMínimoLojasM + 1)) + dadosFaturamentoMínimoLojasM
        AtualizarDadosFaturamentoUnitárioLojasM(novoFatuUnitárioLojaM)
        // alert(`novo faturamento unitário: ${dadosFaturamentoUnitárioLojasM}`)
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

    let novoFatuUnitárioLojaG
    const gerarFaturamentoLojasG = () => {
        novoFatuUnitárioLojaG = Math.floor(Math.random() * (dadosFaturamentoMáximoLojasG - dadosFaturamentoMínimoLojasG + 1)) + dadosFaturamentoMínimoLojasG
        AtualizarDadosFaturamentoUnitárioLojasG(novoFatuUnitárioLojaG)
        // alert(`novo faturamento unitário: ${dadosFaturamentoUnitárioLojasG}`)
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



    //funcionário

    let novoCustoFuncionário
    const custoFuncionário = () => {
        novoCustoFuncionário = Math.floor(Math.random() * (dadosCustoMáximoFuncionário - dadosCustoMínimoFuncionário + 1)) + dadosCustoMínimoFuncionário
        AtualizarDadosCustoFuncionário(novoCustoFuncionário)
    }

    const mudançasDePreços = () => {
        AtualizarDadosPreçosTerrenos(20000)
    }
    const PagarDespesas = () => {
        if (dadosDespesasPagas == true) {
            return alert("despesas desse mês já forma pagas")
        }
        else {
            AtualizarDadosSaldo(dadosSaldo - dadosDespesasLojasP - dadosDespesasLojasM - dadosDespesasLojasG)
            AtualizarDespesasPagas(true)
            alert("despesas pagas")

        }
    }

    
function notificação(){
    abrirModal
}


const [modalNotificação, setModalNotificação] = useState(false)

const abrirModal = ()=>{
alert("modal abriu")
setModalNotificação(true)
}

const fecharModal = ()=>{
alert("modal fechou")
setModalNotificação(false)
}









    return (
        <div className="w-[100vw] h-[100vh] bg-gradient-to-b from-roxo to-roxoForte grid grid-rows-2 grid-cols-2">
            {/* <Notificação/> */}
            
            
            <div className="flex flex-col align-center text-center justify-around absolute top-[20px] right-[20px]">
                <div className="flex justify-between pr-[10px] pl-[10px] items-center w-[300px] h-[30px] rounded-[20px] bg-white box2">
                    <h1 className="fonteLight text-roxo text-[20px]">saldo:</h1>
                    <h1 className="fonteBold text-roxo text-[20px]">{dadosSaldo}</h1>
                </div>
                <div className="flex justify-between pr-[10px] pl-[10px] items-center w-[160px] h-[30px] rounded-[20px] bg-white box2 absolute top-[50px] right-[0px]">

                    <h1 className="fonteLight text-roxo text-[20px]">Dia:</h1>
                    <h1 className="fonteBold text-roxo text-[20px]">{dadosDia}</h1>
                </div>
            </div>
            <div className="flex justify-between pr-[10px] pl-[10px] items-center w-[300px] h-[30px] rounded-[20px] bg-white box2 absolute top-[20px] left-[20px]">
                <h1 className="fonteLight text-roxo text-[20px]">Nome mercado</h1>
                {/* <h1 className="fonteBold text-roxo text-[20px]">{dadosSaldo}</h1> */}
            </div>
            {/* <div className="flex justify-evenly items-center w-[250px] h-[30px] rounded-[20px] bg-white box2">
                    <h1 className="fonteLight text-roxo text-[20px]">faturamento Atual diário:</h1>
                    <h1 className="fonteBold text-roxo text-[20px]">{dadosFaturamentoTotalLojasP + dadosFaturamentoTotalLojasM + dadosFaturamentoTotalLojasG}</h1>
                </div> */}
            {/* <div className="flex justify-evenly items-center w-[250px] h-[30px] rounded-[20px] bg-white box2">
                    <h1 className="fonteLight text-roxo text-[20px]">Despesas do mês Atual:</h1>
                    <h1 className="fonteBold text-roxo text-[20px]">{dadosFaturamentoLojasP + dadosFaturamentoLojasM + dadosFaturamentoLojasG}</h1>
                </div> */}

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

                            {/* <button onClick={mudançasDePreços}>mudançasDePreços</button>
<button onClick={custoFuncionário}>Alteração custo funcionário</button>
<button onClick={gerarFaturamentoLojasP}>Alteração Faturamento lojas p</button> */}
                        </div>

                        {/* <h1>Preço terrenos:{dadosPreçosTerrenos}</h1>


                        <h1>Preço construção LojaP:{dadosPreçosConstruçãoLojaP}</h1>


                        <h1>Preço construção LojaM:{dadosPreçosConstruçãoLojaM}</h1>


                        <h1>Preço construção LojaG:{dadosPreçosConstruçãoLojaG}</h1>


                        <h1>Terrenos:{dadosTerrenos}</h1>


                        <h1>lojas P:{dadosLojasP}</h1>


                        <h1>lojas M:{dadosLojasM}</h1>


                        <h1>lojas G:{dadosLojasG}</h1>


                        <h1>custoFuncionário:{dadosCustoFuncionário}</h1>


                        <h1>faturamentoUnitárioLojasP:{dadosFaturamentoUnitárioLojasP}</h1>


                        <h1>faturamentoTotalLojasP:{dadosFaturamentoTotalLojasP}</h1>


                        <h1>faturamentoUnitárioLojasM:{dadosFaturamentoUnitárioLojasM}</h1>


                        <h1>faturamentoTotalLojasM:{dadosFaturamentoTotalLojasM}</h1>


                        <h1>faturamentoUnitárioLojasG:{dadosFaturamentoUnitárioLojasG}</h1>


                        <h1>faturamentoTotalLojasG:{dadosFaturamentoTotalLojasG}</h1> */}

                    </div>
                </div>
            </div>


            <div className="grid col-start-1 col-end-3 row-2">
                <div className="flex justify-center mt-[20px]">

                    <button className="w-[100px] h-[100px] bg-laranja rounded-[20px] flex items-center justify-center mr-[10px]" onClick={ProximoDia}>
                        <img className="w-[72px] h-[72px]" src={PróximoImg}/>
                        </button>
                    <button className="w-[100px] h-[100px] bg-laranja rounded-[20px] flex items-center justify-center ml-[10px]"  
                    onClick={PagarDespesas}><img className="w-[72px] h-[72px]" src={despesasImg}/></button>
                </div>

            </div>
        </div>
    )

}

export default Interface