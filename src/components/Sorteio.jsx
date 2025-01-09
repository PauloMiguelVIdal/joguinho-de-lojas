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
            const todasLojas = ["terrenos", "lojas pequenas", "lojas médias", "lojas grandes"];
            const situacao = ["aumento", "queda"];
            const porcentagem = [1, 3, 5, 7, 10, 15, 20, 30];
            const periodo = [3, 7, 15, 30];
            const departmentEvents = [
                , "faturamento", "compras", "construção"
                , "funcionários"
                , "impostos"
            ];

            console.log("sorteio ocorreu");


            const selecionarItem = (lista) => lista[Math.floor(Math.random() * lista.length)];
            const selecionarPeriodo = selecionarItem(periodo)
            const selecionarPorcentagem = selecionarItem(porcentagem)
            const selecionarSituação = selecionarItem(situacao)
            const selecionarLoja = selecionarItem(todasLojas)

            function novoEventoSelecionado() {


                const novoDepartamentoSelecionado = selecionarItem(departmentEvents);

                atualizarDados("eventoAtual", {
                    ...dados.eventoAtual, eventoAtivo: true,
                    title: `${selecionarLoja} terão ${selecionarSituação} de ${selecionarPorcentagem}% no periodo de ${selecionarPeriodo} dias`,
                    LojaSelecionada: selecionarLoja,
                    situacaoSelecionada: selecionarSituação,
                    porcentagemSelecionada: selecionarPorcentagem,
                    periodoSelecionado: selecionarPeriodo,
                    diaInicial: dados.dia,
                    diaFinal: dados.dia + selecionarPeriodo
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



