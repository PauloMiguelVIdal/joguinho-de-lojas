<<<<<<< HEAD
import React, { useContext,useEffect } from 'react';
import { CentraldeDadosContext } from '../centralDeDadosContext';
import PróximoImg from "../imagens/proximo.png";



export default function NextDay() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext);





    const ProximoDia = () => {
        console.log(dados.despesas);
        atualizarDados('despesas', { ...dados.despesas, despesasPagas: false });
        if (dados.dia % 30 === 0 && !dados.despesas.despesasPagas) {
            alert("Você não pode avançar para o próximo dia sem pagar as despesas.");
            return; // Impede o avanço do dia se as despesas não forem pagas
        }
        

//chance de evento em 0 porcento

        const chanceNovoEvento = 0

        const sortearNovoEvento = () => {
            const probabilidade = Math.random() * 100
            if (probabilidade <= chanceNovoEvento) {
                console.log("sorteio ocorreu")
                atualizarDados('iniciarSorteio', true);
                // sortearEvento()
            }
        }
        


        const novoDia = dados.dia + 1;
        const saldoAtualizado =
            dados.saldo +
            dados.terrenos.quantidade * dados.terrenos.faturamentoUnitário +
            dados.lojasP.quantidade * dados.lojasP.faturamentoUnitário +
            dados.lojasM.quantidade * dados.lojasM.faturamentoUnitário +
            dados.lojasG.quantidade * dados.lojasG.faturamentoUnitário;
        

        atualizarDados('dia', novoDia);
        atualizarDados('saldo', saldoAtualizado);
        sortearNovoEvento();
        atualizarDados('eventoAtual', { ...dados.eventoAtual, eventoAtivo: true });
        
        gerarFaturamentoTerrenos();
        gerarFaturamentoLojasP();
        gerarFaturamentoLojasM();
        gerarFaturamentoLojasG();
        console.log("Dados atualizados:", dados)
        console.log(dados.saldo)
        console.log(dados.eventoAtual)
        console.log(dados.modal.estadoModal)
        if(dados.iniciarSorteio){
            console.log(dados.eventoAtual)  
              }
        
        
    };

  

    const gerarFaturamentoTerrenos = () => {
        const novoFatuUnitárioTerreno = Math.floor(Math.random() * (dados.terrenos.faturamentoMáximo - dados.terrenos.faturamentoMínimo + 1)) + dados.terrenos.faturamentoMínimo;
        const faturamentoTotalTerrenos = (novoFatuUnitárioTerreno * dados.terrenos.quantidade).toFixed(2);
        atualizarDados('terrenos', { 
            ...dados.terrenos, 
            faturamentoUnitário: novoFatuUnitárioTerreno.toFixed(2),
            faturamentoTotal: faturamentoTotalTerrenos
        });
    };
    
    const gerarFaturamentoLojasP = () => {
        const novoFatuUnitárioLojaP = Math.floor(Math.random() * (dados.lojasP.faturamentoMáximo - dados.lojasP.faturamentoMínimo + 1)) + parseInt(dados.lojasP.faturamentoMínimo);
        const faturamentoTotalLojaP = (novoFatuUnitárioLojaP * dados.lojasP.quantidade).toFixed(2);
        atualizarDados('lojasP', { 
            ...dados.lojasP, 
            faturamentoUnitário: novoFatuUnitárioLojaP.toFixed(2),
            faturamentoTotal: faturamentoTotalLojaP
        });
    };
    
    const gerarFaturamentoLojasM = () => {
        const novoFatuUnitárioLojaM = Math.floor(Math.random() * (dados.lojasM.faturamentoMáximo - dados.lojasM.faturamentoMínimo + 1)) + parseInt(dados.lojasM.faturamentoMínimo);
        const faturamentoTotalLojaM = (novoFatuUnitárioLojaM * dados.lojasM.quantidade).toFixed(2);
        atualizarDados('lojasM', { 
            ...dados.lojasM, 
            faturamentoUnitário: novoFatuUnitárioLojaM.toFixed(2),
            faturamentoTotal: faturamentoTotalLojaM
        });
    };
    
    const gerarFaturamentoLojasG = () => {
        const novoFatuUnitárioLojaG = Math.floor(Math.random() * (dados.lojasG.faturamentoMáximo - dados.lojasG.faturamentoMínimo + 1)) + parseInt(dados.lojasG.faturamentoMínimo);
        const faturamentoTotalLojaG = (novoFatuUnitárioLojaG * dados.lojasG.quantidade).toFixed(2);
        atualizarDados('lojasG', { 
            ...dados.lojasG, 
            faturamentoUnitário: novoFatuUnitárioLojaG.toFixed(2),
            faturamentoTotal: faturamentoTotalLojaG
        });
    };
    
    return (

        <div className="grid col-start-1 col-end-3 row-2">
                <button className="w-[100px] h-[100px] bg-laranja rounded-[20px] flex items-center justify-center mr-[10px]" onClick={ProximoDia}>
                    <img className="w-[72px] h-[72px]" src={PróximoImg} />
                </button>
             
            </div>
       
    )
=======
import React, { useContext, useEffect } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import PróximoImg from "../imagens/proximo.png";
import Sorteio from "./Sorteio";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";

export function NextDay() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext);
        const { economiaSetores, setEconomiaSetores,atualizarEco } = useContext(DadosEconomyGlobalContext);
    
    const todasLojas = ["terrenos", "lojasP", "lojasM", "lojasG"];

    // Função para avançar para o próximo dia
    const ProximoDia = () => {
        if (economiaSetores.saldo < 0) {
            atualizarEco("fimGame", true);
            return;
        }
        if (dados.dia % 360 === 0 && !economiaSetores.despesasImpostoAnual.impostoAnualPago) {
            return;
        }
        if (dados.dia % 30 === 0 && !dados.despesas.despesasPagas) {
            return;
        }
        
        // alert("saçdfjasçkldfj")
        const novoDia = dados.dia + 1;
        atualizarDados("dia", novoDia);
        // console.log(dados.dia);
        calcularFaturamento();
    };

const calcularFaturamento = () => {
    let faturamentoDiario = 0;

    const novasLojas = todasLojas.map((loja) => {
        const valorUnitário = dados[loja].faturamentoUnitárioPadrão;
        const valorVariável = parseFloat(
            (valorUnitário * (1 + (Math.random() * 0.6 - 0.3))).toFixed(2)
        );
        const lojas = ["terrenos", "lojasP", "lojasM", "lojasG"]
        const faturamentoTotal = parseFloat((valorVariável * dados[loja].quantidade).toFixed(2));

        faturamentoDiario += faturamentoTotal;
        if (dados.dia === 240) {
            let patrimonio = 0;

            lojas.forEach(loja => {
              const quantidadeLojas = dados[loja].quantidade;
              const precoConstrucao = dados[loja].preçoConstrução;
        
              const quantidadeTerrenosNec = dados[loja].quantidadeNecTerreno;
              const custoTerreno = dados.terrenos.preçoConstrução;
        
              const custoTotalLoja = quantidadeLojas * precoConstrucao + quantidadeTerrenosNec * custoTerreno;
              patrimonio += custoTotalLoja;
            //   atualizarDados(loja, { ...dados[loja], quantidade: 0 });
              
            });
        
            // const patrimonioTotal = patrimonio + economiaSetores.saldo;
            faturamentoDiario += patrimonio * 0.1;
            // atualizarEco("saldo", economiaSetores.saldo + patrimonio);
            //  // uma única atualização
            //  console.log(patrimonio)
          }




        return {
            ...dados[loja],
            faturamentoUnitário: valorVariável,
            faturamentoTotal,
        };

        console.log()
    });

    // Verifica se é o início de um novo mês e reseta o faturamento mensal
    const novoFaturamentoMensal = dados.dia % 30 === 0 ? faturamentoDiario : dados.faturamento.faturamentoMensal + faturamentoDiario;

    atualizarEco("saldo", economiaSetores.saldo + faturamentoDiario);

    atualizarDados("faturamento", {
        ...dados.faturamento,
        faturamentoDiário: faturamentoDiario,
        faturamentoMensal: novoFaturamentoMensal,
        arrayFatuDiário: [...dados.faturamento.arrayFatuDiário, faturamentoDiario],
    });

    todasLojas.forEach((loja, index) => {
        atualizarDados(loja, novasLojas[index]);
    });
};


    // Função para capturar a tecla espaço
    const handleKeyDown = (event) => {
        if (event.key === " ") {
            event.preventDefault(); // Impede o comportamento padrão da tecla espaço (scroll)
            ProximoDia(); // Chama a função do próximo dia
        }
    };

    // Hook para adicionar e remover o event listener
    useEffect(() => {
        const handleKeyDownWrapper = (event) => handleKeyDown(event);
        //alterar pois está quebrando
        window.addEventListener("keydown", handleKeyDownWrapper);

        return () => {
            window.removeEventListener("keydown", handleKeyDownWrapper);
        };
    }, [dados.dia]); // Adiciona uma dependência em `dados.dia` para garantir que o evento seja escutado em todas as renderizações

    return (
        <div className="flex">
            <button
                className="w-full min-h-[50px] aspect-square bg-laranja rounded-[20px] flex items-center justify-center hover:bg-[#E56100] active:scale-95 hover:scale-[1.05] "
                onClick={ProximoDia}
            >
                <img className="w-[60%] aspect-square" src={PróximoImg} alt="Próximo" />
            </button>
            <Sorteio />
        </div>
    );
>>>>>>> 4eecf25e3e3b0d0eca1f16931d01c2d9df1ce00a
}
