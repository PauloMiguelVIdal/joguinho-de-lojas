import React, { useContext, useEffect } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";

export default function Sorteio() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext);

    const fecharModal = () => {
        // console.log(dados.eventoAtual);
        atualizarDados("modal", { ...dados.modal, estadoModal: false });
    };

    const todasLojas = [
        "terrenos",
        "lojas pequenas",
        "lojas médias",
        "lojas grandes"
    ];
    const departmentEvents = [
        "faturamento",
        "custos de construção"
        // , "despesas de funcionários"
        , "imposto fixo"
        ,"imposto sobre faturamento"
    ];
    const situacao = ["crescimento", "queda"];
    const porcentagem = [
        1, 3, 5, 7, 10, 15, 20, 30
    ];
    const periodo = [3, 7, 15, 30];
    const judgment = ["ÓTIMO", "PÉSSIMO"];

    const economiaAtual = () => {
        switch (`${dados.economiaGlobal}`) {
            case "recessão": return [0.35, 0.65]
            case "declinio": return [0.45, 0.55]
            case "estável": return [0.50, 0.50]
            case "progressiva": return [0.55, 0.45]
            case "aquecida": return [0.65, 0.35]
            default: return [0.50, 0.50]
        }
    }

    const julgamentoSorteado = () => {
        const probabilidadesJulgamento = economiaAtual()
        // console.log(probabilidadesJulgamento)
        const random = Math.random(); // Gera um número entre 0 e 1
        return random < probabilidadesJulgamento[0] ? judgment[0] : judgment[1];
    };


    const selecionarItem = (lista) => lista[Math.floor(Math.random() * lista.length)];

    const conversorTodasLojas = (selecionarLoja) => {
        switch (selecionarLoja) {
            case "terrenos": return "terrenos";
            case "lojas pequenas": return "lojasP";
            case "lojas médias": return "lojasM";
            case "lojas grandes": return "lojasG";
            default: return "nada";
        }
    };

    const conversorDepartmentEvents = (selecionarDepartamento) => {
        switch (selecionarDepartamento) {
            case "custos de construção": return "preçoConstrução";
            case "faturamento": return "faturamentoUnitárioPadrão";
            case "imposto fixo": return "impostoFixo";
            case "imposto sobre faturamento": return "impostoSobreFaturamento";
            // case "despesas de funcionários": return "custoFuncionárioUnitárioPadrão";
            default: return "nada";
        }
    };

    const conversorSituacao = (resultadoBase) => resultadoBase === "crescimento" ? "+" : "-";

    const calcular = (valor, porcentagem, operador) => {
        return operador === "+"
            ? valor * (1 + porcentagem)
            : valor * (1 - porcentagem);
    };

    const sortearNovoEvento = () => {
        if (Math.random() * 100 > dados.chanceNovoEvento) return; // Se não atingir a chance, sai da função

        const selecionarLoja = selecionarItem(todasLojas);
        const selecionarDepartamento = selecionarItem(departmentEvents);
        const selecionarJulgamento = julgamentoSorteado();
        const selecionarPorcentagem = selecionarItem(porcentagem);
        const selecionarPeriodo = selecionarItem(periodo);
        // console.log(selecionarJulgamento)
        const resultadoBase =
            (selecionarDepartamento === "faturamento" && selecionarJulgamento === "ÓTIMO") ||
                (selecionarDepartamento !== "faturamento" && selecionarJulgamento === "PÉSSIMO")
                ? "crescimento"
                : "queda";

        const lojaChave = conversorTodasLojas(selecionarLoja);
        const departamentoChave = conversorDepartmentEvents(selecionarDepartamento);
        const operador = conversorSituacao(resultadoBase);

        // console.log(lojaChave)
        // console.log(departamentoChave)
        // console.log(operador)
        const valorInicial = dados[lojaChave]?.[departamentoChave] ?? 0;
        // console.log(valorInicial)
        const porcentagemDecimal = selecionarPorcentagem / 100;
        const novoValor = Math.round(calcular(valorInicial, porcentagemDecimal, operador) * 100) / 100;
        // console.log(novoValor)
        atualizarDados("eventoAtual", {
            ...dados.eventoAtual,
            eventoAtivo: true,
            title: `${selecionarLoja} terão ${resultadoBase} de ${selecionarPorcentagem}% em ${selecionarDepartamento} no período de ${selecionarPeriodo} dias`,
            lojaSelecionada: selecionarLoja,
            situacaoSelecionada: resultadoBase,
            porcentagemSelecionada: selecionarPorcentagem,
            periodoSelecionado: selecionarPeriodo,
            diaInicial: dados.dia,
            diaFinal: dados.dia + selecionarPeriodo,
            departamento: selecionarDepartamento,
            julgamento: selecionarJulgamento,
            novoValor
        });

        atualizarDados("modal", { ...dados.modal, estadoModal: true });

        // console.log("Evento sorteado:", dados.eventoAtual);
    };

    useEffect(() => {
        sortearNovoEvento();
        // console.log("Sorteio executado para o dia", dados.dia);
        // console.log("useEffect chamado9!");

    }, [dados.dia]);

    // ✅ UseEffect no nível superior para atualizar os valores das lojas quando evento for ativado
    useEffect(() => {
        if (dados.eventoAtual.eventoAtivo) {
            const lojaChave = conversorTodasLojas(dados.eventoAtual.lojaSelecionada);
            const departamentoChave = conversorDepartmentEvents(dados.eventoAtual.departamento);
            const novoValor = dados.eventoAtual.novoValor;

            atualizarDados(lojaChave, {
                ...dados[lojaChave],
                [departamentoChave]: novoValor
            });

            // console.log("Evento aplicado nas lojas!");
            // console.log("useEffect chamado10!");

        }
    }, [dados.eventoAtual]);

    return <div />;
}
