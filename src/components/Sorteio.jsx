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
            const porcentagem =
                [
                    // 1, 3, 5, 7, 
                    10
                    // , 15, 20, 
                    // 30
                ];
            const periodo = [3, 7
                , 15, 30
            ];
            const departmentEvents = [
                // "faturamento", 
                "custos de construção"
                // , "despesas de funcionários"
                // , "impostos fixos"
            ];
            const judgment = ["ÓTIMO", "PÉSSIMO"]

            console.log("sorteio ocorreu");

            let loja

            const selecionarItem = (lista) => lista[Math.floor(Math.random() * lista.length)];
            const selecionarPeriodo = selecionarItem(periodo)
            const selecionarPorcentagem = selecionarItem(porcentagem)
            // const selecionarSituação = selecionarItem(situacao)
            const selecionarLoja = selecionarItem(todasLojas)
            const selecionarJulgamento = selecionarItem(judgment)
            const selecionarDepartamento = selecionarItem(departmentEvents);

            const resultadoBase =
                (selecionarDepartamento === "faturamento" && selecionarJulgamento === "ÓTIMO") ||
                    (selecionarDepartamento !== "faturamento" && selecionarJulgamento === "PÉSSIMO") ?
                    "crescimento" : "queda";

            // const novaPorcentagem = selecionarPorcentagem / 100








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

                const conversorTodasLojas = () => {
                    switch (`${selecionarLoja}`) {
                        case "lojas pequenas":
                            return "lojasP";
                        default:
                            return "nada";
                    }

                }
                const conversorDepartmentEvents = () => {
                    switch (`${selecionarDepartamento}`) {
                        case "custos de construção":
                            return "preçoConstrução";
                        default:
                            return "nada";
                    }
                }


                const conversorSituacao = () => {
                    switch (`${resultadoBase}`) {
                        case "crescimento":
                            return "+";
                        default:
                            return "-";
                    }
                }

                const valorInicial = () => dados[conversorTodasLojas()][conversorDepartmentEvents()]

                valorInicial()

                // const teste = () => `${valorInicial()} ${conversorSituacao()} ${selecionarPorcentagem}`;
                const calcular = (valor, porcentagem, operador) => {
                    switch (operador) {
                        case "+":
                            return valor * (1 + porcentagem);
                        case "-":
                            return valor * (1 - porcentagem);
                        default:
                            throw new Error("Operador inválido");
                    }
                };


                const valorVariavelInicial = 2000



                const calcularEvento = () => {
                    const valor = valorInicial();
                    const porcentagem = parseInt(selecionarPorcentagem) / 100;
                    const operador = conversorSituacao();

                    return Math.round(calcular(valor, porcentagem, operador) * 100) / 100;
                };

                atualizarDados(`${conversorTodasLojas()}`, {
                    ...dados[conversorTodasLojas()], [conversorDepartmentEvents()]: [calcularEvento()]
                })

                console.log(calcularEvento())

                



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



