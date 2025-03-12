import React, { useContext, useEffect } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import PróximoImg from "../imagens/proximo.png";
import Sorteio from "./Sorteio";

export function NextDay() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext);

    const todasLojas = ["terrenos", "lojasP", "lojasM", "lojasG"];

    // Função para avançar para o próximo dia
    const ProximoDia = () => {
        if (dados.saldo < 0) {
            atualizarDados("fimGame", true);
            return;
        }

        if (dados.dia % 30 === 0 && !dados.despesas.despesasPagas) {
            return;
        }

        const novoDia = dados.dia + 1;
        atualizarDados("dia", novoDia);
        calcularFaturamento();
    };

    // Função para calcular o faturamento
    const calcularFaturamento = () => {
        let faturamentoDiario = 0;

        const novasLojas = todasLojas.map((loja) => {
            const valorUnitário = dados[loja].faturamentoUnitárioPadrão;
            const valorVariável = parseFloat(
                (valorUnitário * (1 + (Math.random() * 0.6 - 0.3))).toFixed(2)
            );

            const faturamentoTotal = parseFloat((valorVariável * dados[loja].quantidade).toFixed(2));

            faturamentoDiario += faturamentoTotal;

            return {
                ...dados[loja],
                faturamentoUnitário: valorVariável,
                faturamentoTotal,
            };
        });

        const novoFaturamentoMensal = faturamentoDiario + dados.faturamento.faturamentoMensal;
        atualizarDados("saldo", dados.saldo + faturamentoDiario);

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
                className="w-[50%] min-h-[50px] aspect-square bg-laranja rounded-[20px] flex items-center justify-center hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]"
                onClick={ProximoDia}
            >
                <img className="w-[60%] aspect-square" src={PróximoImg} alt="Próximo" />
            </button>
            <Sorteio />
        </div>
    );
}
