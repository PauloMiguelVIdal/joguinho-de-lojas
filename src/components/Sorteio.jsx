import React, { useContext, useEffect } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";

export default function Sorteio() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext);


    const fecharModal = () => { 
        console.log(dados.eventoAtual)  
        atualizarDados('modal', { ...dados.modal, estadoModal: false }); 
    };



    // Função sorteio
    const sortearNovoEvento = () => {
        const probabilidade = Math.random() * 100;
        if (probabilidade <= dados.chanceNovoEvento) {
            const todasLojas = [
                // "terrenos", 
                "lojas pequenas"
                // , "lojas médias", "lojas grandes"
            ];
            const situacao = ["crescimento", "queda"];
            const porcentagem = [1, 3, 5, 7, 10, 15, 20, 30];
            const periodo = [3, 7
                , 15, 30
            ];
            const departmentEvents = [
            // "faturamento", 
            "custos de construção"
                // , "despesas de funcionários"
                // , "impostos fixos"
            ];
            const judgment = ["ÓTIMO","PÉSSIMO"]

            console.log("sorteio ocorreu");
            
            
            const selecionarItem = (lista) => lista[Math.floor(Math.random() * lista.length)];
            const selecionarPeriodo = selecionarItem(periodo)
            const selecionarPorcentagem = selecionarItem(porcentagem)
            // const selecionarSituação = selecionarItem(situacao)
            const selecionarLoja = selecionarItem(todasLojas)
            const selecionarJulgamento = selecionarItem(judgment)
            const selecionarDepartamento = selecionarItem(departmentEvents);
            
            const resultadoBase = 
            (selecionarDepartamento==="faturamento"&& selecionarJulgamento==="ÓTIMO") ||
            (selecionarDepartamento!=="faturamento"&& selecionarJulgamento==="PÉSSIMO") ? 
            "crescimento" : "queda";
            
            
            console.log(departmentEvents);
            console.log(judgment);


            function novoEventoSelecionado() {


                atualizarDados("eventoAtual", {
                    ...dados.eventoAtual, eventoAtivo: true,
                    title: `${selecionarLoja} terão ${resultadoBase} de ${selecionarPorcentagem}% em ${selecionarDepartamento} no periodo de ${selecionarPeriodo} dias`,
                    LojaSelecionada: selecionarLoja,
                    situacaoSelecionada: resultadoBase,
                    porcentagemSelecionada: selecionarPorcentagem,
                    periodoSelecionado: selecionarPeriodo,
                    diaInicial: dados.dia,
                    diaFinal: dados.dia + selecionarPeriodo,
                    departamento: selecionarDepartamento,
                    julgamento: selecionarJulgamento,
                } 
            )
            









            
            atualizarDados('modal', { ...dados.modal, estadoModal: true }); 
                console.log("Estado atualizado:", dados.eventoAtual);
            }
            novoEventoSelecionado()
        }
    };

    useEffect(() => {
        sortearNovoEvento()
        console.log("passou aqui")
    }, [dados.dia]);













    return (
        <div>
            {/* <button onClick={() => {
                atualizarDados('iniciarSorteio', true);
                console.log(dados.modal.estadoModal);
            }} className="bg-white">Sortear</button>
            <button onClick={sortearNovoEvento}>Sortear Novo Evento</button> */}
        </div>
    );
};



