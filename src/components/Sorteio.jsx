import React, { useContext, useEffect } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";

export default function Sorteio() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext);

    // useEffect(() => {
    //     if (dados.iniciarSorteio) {
    //         const evento = centralResultado(); // Chama centralResultado sem passar dados como argumento
    //         atualizarDados('eventoAtual', evento)
    //         console.log(evento);
    //         atualizarDados('iniciarSorteio', false); // Resetar iniciarSorteio após o sorteio
    //         console.log("Estado do modal após atualização:", dados.modal.estadoModal);
    //         atualizarDados('modal', { ...dados.modal, estadoModal: true }); 
    //         console.log(dados.modal.estadoModal);
    //     }
    // }, [dados.iniciarSorteio, atualizarDados]);



    // chance de evento em 50%
    const chanceNovoEvento = 70;

    // Função sorteio
    const sortearNovoEvento = () => {
        const probabilidade = Math.random() * 100;
        if (probabilidade <= chanceNovoEvento) {
            const todasLojas = ["lojas pequenas", "lojas médias", "lojas grandes"];
            const situacao = ["aumento", "queda"];
            const porcentagem = [1, 3, 5, 7, 10, 15, 20, 30];
            const periodo = [3, 7, 15, 30];
            const departmentEvents = ["lojas"
                // ,"faturamento","compras","funcionários","impostos"
            ];

            console.log("sorteio ocorreu");
            // atualizarDados('iniciarSorteio', true); // não quero que seja um estado penso em fazer apenas uma função que irá realizar isso
            // const decidirValorSituacao = () => {
            //     return situacao === "aumento" ? "+" : "-";
            // };



            // const valorSituacao = decidirValorSituacao();
            function novoEventoSelecionado(){

                const selecionarItem = (lista) => lista[Math.floor(Math.random() * lista.length)];
                const novoDepartamentoSelecionado  = selecionarItem(departmentEvents);
               
                if(novoDepartamentoSelecionado === "lojas"){
                   const lojaSelecionada = selecionarItem(todasLojas)
                   return (console.log(lojaSelecionada))
                }
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
            <button onClick={() => {
                atualizarDados('iniciarSorteio', true);
                console.log(dados.modal.estadoModal);
            }} className="bg-white">Sortear</button>
            <button onClick={sortearNovoEvento}>Sortear Novo Evento</button>
        </div>
    );
};



