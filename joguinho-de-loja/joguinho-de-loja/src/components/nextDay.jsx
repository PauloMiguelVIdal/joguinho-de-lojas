import React, { useContext,useEffect } from 'react';
import { CentraldeDadosContext } from '../centralDeDadosContext';
import PróximoImg from "../imagens/proximo.png";
<<<<<<< HEAD
import despesasImg from "../imagens/despesas.png";
=======

>>>>>>> 4eecf25e3e3b0d0eca1f16931d01c2d9df1ce00a


export default function NextDay() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext);

<<<<<<< HEAD
    useEffect(() => {
        // Verifica se é necessário atualizar as despesas e o estado modal
        if (dados.dia % 30 === 0){
            atualizarDados({...dados.despesas,despesasPagas:false})
        }
          if (dados.dia % 30 === 0 && !dados.despesas.despesasPagas) {
            const novasDespesas = { ...dados.despesas, despesasPagas: false };
            const novoEstado = { ...dados, modal: { ...dados.modal, estadoModal: true } };
            atualizarDados('despesas', novasDespesas);
            atualizarDados('modal', { ...dados.modal, estadoModal: true }); 
            // Chame o modelo de pagar dívidas aqui
          }
        }, [dados.dia, dados.despesas.despesasPagas]);
=======

>>>>>>> 4eecf25e3e3b0d0eca1f16931d01c2d9df1ce00a



    const ProximoDia = () => {
        console.log(dados.despesas);
<<<<<<< HEAD
=======
        atualizarDados('despesas', { ...dados.despesas, despesasPagas: false });
>>>>>>> 4eecf25e3e3b0d0eca1f16931d01c2d9df1ce00a
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

  

<<<<<<< HEAD
    const PagarDespesas = () => {
        if (dados.despesas.despesasPagas) {
            return alert("Despesas desse mês já foram pagas.");
        } else {

            const novoSaldo = dados.saldo - dados.despesas.despesasLojasP - dados.despesas.despesasLojasM - dados.despesas.despesasLojasG;
            // atualizarDados('saldo', novoSaldo);
            atualizarDados('despesas', { ...dados.despesas, despesasPagas: true });
            console.log(dados.saldo)
             alert("Despesas pagas.");
        }
    };
    
=======
>>>>>>> 4eecf25e3e3b0d0eca1f16931d01c2d9df1ce00a
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
<<<<<<< HEAD
            <div className="flex justify-center mt-[20px]">
                <button className="w-[100px] h-[100px] bg-laranja rounded-[20px] flex items-center justify-center mr-[10px]" onClick={ProximoDia}>
                    <img className="w-[72px] h-[72px]" src={PróximoImg} />
                </button>
                <button className="w-[100px] h-[100px] bg-laranja rounded-[20px] flex items-center justify-center ml-[10px]"
                    onClick={PagarDespesas}><img className="w-[72px] h-[72px]" src={despesasImg} /></button>
            </div>
        </div>
=======
                <button className="w-[100px] h-[100px] bg-laranja rounded-[20px] flex items-center justify-center mr-[10px]" onClick={ProximoDia}>
                    <img className="w-[72px] h-[72px]" src={PróximoImg} />
                </button>
             
            </div>
       
>>>>>>> 4eecf25e3e3b0d0eca1f16931d01c2d9df1ce00a
    )
}
