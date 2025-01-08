import React, { useContext, useEffect } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";

export default function Sorteio() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext);


    const fecharModal = () => { 
        console.log(dados.eventoAtual)  
        atualizarDados('modal', { ...dados.modal, estadoModal: false }); 
    };
    let head = "hummm";
    let content = `${dados.eventoAtual.title }`;
    

    function modal() {
        return (

            <div className='flex justify-center items-center z-10 bg-black opacity-[90%] w-[100vw] h-[100vh]'>
                <div className='w-[50vw] h-[50vh] bg-roxo rounded-[20px] z-20 relative'>
                    <h1 className='text-center text-white p-[10px] fonteBold'>{head}</h1>
                    <div className='w-[80%] h-[10px] bg-white flex rounded-[5px] relative m-auto'></div>
                    <div>
                        <h2 className='text-start text-white opacity-[70%] pl-[20px] pt-[20px] fonteLight'>{content}</h2>
                    </div>
                    <button className='absolute right-[10px] bottom-[10px] text-white bg-laranja p-[10px] rounded-[40px] z-30 fonteBold' onClick={fecharModal}>
                        <h3>entendido</h3>
                    </button>
                </div>
            </div>
        );
    }



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
            <button onClick={() => {
                atualizarDados('iniciarSorteio', true);
                console.log(dados.modal.estadoModal);
            }} className="bg-white">Sortear</button>
            <button onClick={sortearNovoEvento}>Sortear Novo Evento</button>
        </div>
    );
};



