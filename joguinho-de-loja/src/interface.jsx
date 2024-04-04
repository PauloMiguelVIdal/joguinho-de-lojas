import React, { useContext } from "react";
import { CentraldeDadosContext } from "./centralDeDadosContext";
import terrenoImg from "./imagens/terreno.png"
import LojaPImg from "./imagens/lojaP.png"
import LojaMImg from "./imagens/lojaM.png"
import LojaGImg from "./imagens/lojaG.png"
import despesasImg from "./imagens/despesas.png"

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









    return (
        <div className="w-[100vw] h-[100vh] bg-gradient-to-b from-roxo to-roxoForte grid grid-rows-2 grid-cols-2">
            <div className="grid row-1 cols-1 ">
                <div className="flex flex-col justify-around items-center">

                    <div className="flex justify-evenly items-center w-[250px] h-[30px] rounded-[20px] bg-white box2">

                        <h1 className="fonteLight text-roxo text-[20px]">Dia:</h1>
                        <h1 className="fonteBold text-roxo text-[20px]">{dadosDia}</h1>
                    </div>
                    <div className=" flex flex-col">

                        <h1>Preço terrenos:{dadosPreçosTerrenos}</h1>


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


                        <h1>faturamentoTotalLojasG:{dadosFaturamentoTotalLojasG}</h1>

                    </div>
                </div>
            </div>
            <div className="flex flex-col align-center text-center justify-around">
                <div className="flex justify-evenly items-center w-[250px] h-[30px] rounded-[20px] bg-white box2">
                    <h1 className="fonteLight text-roxo text-[20px]">saldo:</h1>
                    <h1 className="fonteBold text-roxo text-[20px]">{dadosSaldo}</h1>
                </div>
                <div className="flex justify-evenly items-center w-[250px] h-[30px] rounded-[20px] bg-white box2">
                    <h1 className="fonteLight text-roxo text-[20px]">faturamento Atual diário:</h1>
                    <h1 className="fonteBold text-roxo text-[20px]">{dadosFaturamentoTotalLojasP + dadosFaturamentoTotalLojasM + dadosFaturamentoTotalLojasG}</h1>
                </div>
                {/* <div className="flex justify-evenly items-center w-[250px] h-[30px] rounded-[20px] bg-white box2">
                    <h1 className="fonteLight text-roxo text-[20px]">Despesas do mês Atual:</h1>
                    <h1 className="fonteBold text-roxo text-[20px]">{dadosFaturamentoLojasP + dadosFaturamentoLojasM + dadosFaturamentoLojasG}</h1>
                </div> */}

            </div>


            <div className="grid col-start-1 col-end-3 row-2">
                <div className="flex justify-center">

                    <button onClick={ProximoDia}>
                        proximo dia</button>
                    <button onClick={PagarDespesas}> pagar despesas</button>
                </div>
                <div className="flex justify-around">

                    <button className="bg-laranja w-[70px] h-[70px] rounded-[20px] flex justify-center items-center" onClick={ComprarTerreno}>

                        <img src={terrenoImg} alt="despesas" className="w-[50px] h-[50px] " />
                    </button>
                        <div className="bg-marinho w-[36px] h-[36px] rounded-full relative mr-[-80px] mt-[50px] flex justify-center items-center">
                            {dadosLojasP}
                        </div>
                    <button 
                    className="bg-laranja w-[70px] h-[70px] rounded-[20px] flex justify-center items-center" 
                    onClick={ComprarLojaP}>
                    <img src={LojaPImg} alt="lojaP" className="w-[50px] h-[50px] " />
                        </button>
                    <button 
                                        className="bg-laranja w-[70px] h-[70px] rounded-[20px] flex justify-center items-center" 
                    onClick={ComprarLojaM}>
                                 <img src={LojaMImg} alt="lojaM" className="w-[50px] h-[50px] " /></button>
                    
                    
                    <button 
                           className="bg-laranja w-[70px] h-[70px] rounded-[20px] flex justify-center items-center" 
                    onClick={ComprarLojaG}>
                    <img src={LojaGImg} alt="lojaG" className="w-[50px] h-[50px] " />
                    </button>
                    <button onClick={mudançasDePreços}>mudançasDePreços</button>
                    <button onClick={custoFuncionário}>Alteração custo funcionário</button>
                    <button onClick={gerarFaturamentoLojasP}>Alteração Faturamento lojas p</button>
                </div>
            </div>
        </div>
    )

}

export default Interface