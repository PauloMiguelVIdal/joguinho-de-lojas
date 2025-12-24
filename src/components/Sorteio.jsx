import React, { useContext, useEffect } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import useSound from "use-sound";
import openAudio from "../../public/sounds/openAudio.mp3";
export default function Sorteio() {
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  const {
    economiaSetores,
    setEconomiaSetores,
    atualizarEco,
    atualizarEcoProf,
  } = useContext(DadosEconomyGlobalContext);
  const [buttonOpenAudio] = useSound(openAudio);

  const fecharModal = () => {
    // console.log(dados.eventoAtual);
    atualizarDados("modal", { ...dados.modal, estadoModal: false });
  };

  const todasLojas = [
    "terrenos",
    "lojas pequenas",
    "lojas médias",
    "lojas grandes",
  ];
  const departmentEvents = [
    "faturamento",
    "custos de construção",
    // , "despesas de funcionários"
    "imposto fixo",
    "imposto sobre faturamento",
  ];
  const departmentEventsFinal = ["custos de construção", "imposto anual"];
  const situacao = ["crescimento", "queda"];
  const porcentagem = [
    1, 3, 5, 7, 10, 15, 20, 30,
    // 50,100,200,
  ];
  const periodo = [3, 7, 15, 30];
  const judgment = ["ÓTIMO", "PÉSSIMO"];
  const setores = [
    "agricultura",
    "industria",
    "energia",
    "tecnologia",
    "comercio",
    "imobiliario",
  ];
  const economiaAtual = () => {
    switch (`${economiaSetores.economiaGlobal}`) {
      case "recessão":
        return [0.35, 0.65];
      case "declinio":
        return [0.45, 0.55];
      case "estável":
        return [0.5, 0.5];
      case "progressiva":
        return [0.55, 0.45];
      case "aquecida":
        return [0.65, 0.35];
      default:
        return [0.5, 0.5];
    }
  };

  const julgamentoSorteado = () => {
    const probabilidadesJulgamento = economiaAtual();
    // console.log(probabilidadesJulgamento)
    const random = Math.random(); // Gera um número entre 0 e 1
    return random < probabilidadesJulgamento[0] ? judgment[0] : judgment[1];
  };

  const selecionarItem = (lista) =>
    lista[Math.floor(Math.random() * lista.length)];

  const conversorTodasLojas = (selecionarLoja) => {
    switch (selecionarLoja) {
      case "terrenos":
        return "terrenos";
      case "lojas pequenas":
        return "lojasP";
      case "lojas médias":
        return "lojasM";
      case "lojas grandes":
        return "lojasG";
      default:
        return "nada";
    }
  };

  const conversorDepartmentEvents = (selecionarDepartamento) => {
    switch (selecionarDepartamento) {
      case "custos de construção":
        return "preçoConstrução";
      case "faturamento":
        return "faturamentoUnitárioPadrão";
      case "imposto fixo":
        return "impostoFixo";
      case "imposto sobre faturamento":
        return "impostoSobreFaturamento";
      // case "despesas de funcionários": return "custoFuncionárioUnitárioPadrão";
      default:
        return "nada";
    }
  };
  const conversorDepartmentEventsFinal = (selecionarDepartamento) => {
    switch (selecionarDepartamento) {
      case "custos de construção":
        return "preçoConstrução";
      case "imposto anual":
        return "impostoAnual";

      // case "despesas de funcionários": return "custoFuncionárioUnitárioPadrão";
      default:
        return "nada";
    }
  };

  const conversorSituacao = (resultadoBase) =>
    resultadoBase === "crescimento" ? "+" : "-";

  const calcular = (valor, porcentagem, operador) => {
    return operador === "+"
      ? valor * (1 + porcentagem)
      : valor * (1 - porcentagem);
  };

  const sortearNovoEvento = () => {
    if (Math.random() * 100 > dados.chanceNovoEvento) return; // Se não atingir a chance, sai da função

    const selecionarLoja = selecionarItem(todasLojas);
    const selecionarDepartamento =
      dados.dia < 269
        ? selecionarItem(departmentEvents)
        : // : "custos de construção";
          // eventosFinais;
          selecionarItem(departmentEventsFinal);
    const selecionarJulgamento = julgamentoSorteado();
    const selecionarPorcentagem = selecionarItem(porcentagem);
    const selecionarPeriodo = selecionarItem(periodo);
    // console.log(selecionarJulgamento)
    const resultadoBase =
      (selecionarDepartamento === "faturamento" &&
        selecionarJulgamento === "ÓTIMO") ||
      (selecionarDepartamento !== "faturamento" &&
        selecionarJulgamento === "PÉSSIMO")
        ? "crescimento"
        : "queda";

    const lojaChave = conversorTodasLojas(selecionarLoja);
    const departamentoChave = conversorDepartmentEventsFinal(
      selecionarDepartamento
    );
    const operador = conversorSituacao(resultadoBase);
    console.log(departamentoChave);
    // const setorSelecionado = selecionarItem(setores);
    // const valorInicialImposto =
    //   economiaSetores[setorSelecionado]?.percImpostoAnualAtual ?? 0;

    // // const novoValorImposto =
    // //   Math.round(
    // //     calcular(valorInicialImposto, porcentagemDecimal, operador) * 100
    // //   ) / 100;

    // console.log(lojaChave)
    // console.log(departamentoChave)
    // console.log(operador)
    const valorInicial = dados[lojaChave]?.[departamentoChave] ?? 0;
    // console.log(valorInicial)
    const porcentagemDecimal = selecionarPorcentagem / 100;
    const novoValor =
      Math.round(calcular(valorInicial, porcentagemDecimal, operador) * 100) /
      100;

    // console.log(novoValor)
    atualizarDados("eventoAtual", {
      ...dados.eventoAtual,
      eventoAtivo: true,
      title: `${selecionarLoja} terão ${resultadoBase} de ${selecionarPorcentagem}% em ${selecionarDepartamento}. Durante o período de ${selecionarPeriodo} dias, não será sorteado novos eventos.`,
      lojaSelecionada: selecionarLoja,
      situacaoSelecionada: resultadoBase,
      porcentagemSelecionada: selecionarPorcentagem,
      periodoSelecionado: selecionarPeriodo,
      diaInicial: dados.dia,
      diaFinal: dados.dia + selecionarPeriodo,
      departamento: selecionarDepartamento,
      julgamento: selecionarJulgamento,
      novoValor,
    });

    // console.log("Evento sorteado:", dados.eventoAtual);

    // const calcularNovoImpostoAnual = () => {
    //   const selecionarEventoFinal = selecionarItem(departmentEventsFinal);
    //   const setorSelecionado = selecionarItem(setores);
    //   const valorInicialImposto =
    //     economiaSetores[setorSelecionado]?.percImpostoAnualAtual ?? 0;

    //   const novoValorImposto =
    //     Math.round(
    //       calcular(valorInicialImposto, porcentagemDecimal, operador) * 100
    //     ) / 100;
    // };
    const setorSelecionado = selecionarItem(setores);
    const selecionarDepartamentoFinal = selecionarItem(departmentEventsFinal);
    const valorInicialImposto =
      economiaSetores[setorSelecionado].economiaSetor.percImpostoAnualAtual ??
      0;
    const novoValorImposto =
      Math.round(
        calcular(valorInicialImposto, porcentagemDecimal, operador) * 100
      ) / 100;

    console.log("setor selecionado:", setorSelecionado);
    console.log("setor acessado", economiaSetores[setorSelecionado]);
    console.log(
      "valor setor acessado",
      economiaSetores[setorSelecionado].economiaSetor.percImpostoAnualAtual
    );
    console.log(
      "valor setor acessado",
      economiaSetores[setorSelecionado].economiaSetor.valorImpostoAnualAtual
    );

    //  atualizarEcoProf(["economiaSetores",setorSelecionado,"economiaSetor","percImpostoAnualAtual"], 122222);



    if (selecionarDepartamentoFinal === "imposto anual") {
      atualizarEcoProf(
        [setorSelecionado, "economiaSetor", "percImpostoAnualAtual"],
        novoValorImposto
      );

      atualizarDados("eventoAtual", {
        ...dados.eventoAtual,
        eventoAtivo: true,
        title: `O setor ${setorSelecionado},kkkkkk terá ${resultadoBase} de ${selecionarPorcentagem}% em ${selecionarDepartamento}. Durante o período de ${selecionarPeriodo} dias, não será sorteado novos eventos.`,
        setorSelecionada: setorSelecionado,
        situacaoSelecionada: resultadoBase,
        porcentagemSelecionada: selecionarPorcentagem,
        periodoSelecionado: selecionarPeriodo,
        diaInicial: dados.dia,
        diaFinal: dados.dia + selecionarPeriodo,
        departamento: setorSelecionado,
        julgamento: selecionarJulgamento,
        novoValor,
      });
      console.log(valorInicialImposto);
      console.log(novoValorImposto);

      buttonOpenAudio();
      atualizarDados("modal", { ...dados.modal, estadoModal: true });
    } else if (selecionarDepartamentoFinal === "custos de construção") {
      atualizarDados("eventoAtual", {
        ...dados.eventoAtual,
        eventoAtivo: true,
        title: `${selecionarLoja} terão ${resultadoBase} de ${selecionarPorcentagem}% em ${selecionarDepartamento}. Durante o período de ${selecionarPeriodo} dias, não será sorteado novos eventos.`,
        lojaSelecionada: selecionarLoja,
        situacaoSelecionada: resultadoBase,
        porcentagemSelecionada: selecionarPorcentagem,
        periodoSelecionado: selecionarPeriodo,
        diaInicial: dados.dia,
        diaFinal: dados.dia + selecionarPeriodo,
        departamento: selecionarDepartamento,
        julgamento: selecionarJulgamento,
        novoValor,
      });
      buttonOpenAudio();
      atualizarDados("modal", { ...dados.modal, estadoModal: true });
    }
  };
  useEffect(() => {
    sortearNovoEvento();
    // console.log("Sorteio executado para o dia", dados.dia);
    // console.log("useEffect chamado9!");
  }, [dados.dia]);

  // ✅ UseEffect no nível superior para atualizar os valores das lojas quando evento for ativado
  useEffect(() => {
    if (dados.eventoAtual.eventoAtivo && dados.dia < 270) {
      const lojaChave = conversorTodasLojas(dados.eventoAtual.lojaSelecionada);
      const departamentoChave = conversorDepartmentEvents(
        dados.eventoAtual.departamento
      );
      const novoValor = dados.eventoAtual.novoValor;

      atualizarDados(lojaChave, {
        ...dados[lojaChave],
        [departamentoChave]: novoValor,
      });

      // console.log("Evento aplicado nas lojas!");
      // console.log("useEffect chamado10!");
    } else if (
      dados.eventoAtual.eventoAtivo &&
      dados.dia >= 270 &&
      departmentEventsFinal === "custos de construção"
    ) {
      const lojaChave = conversorTodasLojas(dados.eventoAtual.lojaSelecionada);
      const departamentoChave = conversorDepartmentEvents(
        dados.eventoAtual.departamento
      );
      const novoValor = dados.eventoAtual.novoValor;

      atualizarDados(lojaChave, {
        ...dados[lojaChave],
        [departamentoChave]: novoValor,
      });

      // console.log("Evento aplicado nas lojas!");
      // console.log("useEffect chamado10!");
    }
    // else if (
    //   dados.eventoAtual.eventoAtivo &&
    //   dados.dia >= 270 &&
    //   departmentEventsFinal === "imposto anual"
    // ) {
    //   const setorSelecionado = selecionarItem(setores);
    //   const valorInicialImposto =
    //     economiaSetores[setorSelecionado]?.percImpostoAnualAtual ?? 0;

    //   const novoValorImposto =
    //     Math.round(
    //       calcular(valorInicialImposto, porcentagemDecimal, operador) * 100
    //     ) / 100;

    //   economiaSetores(setorSelecionado, {
    //     ...economiaSetores[setorSelecionado],
    //     percImpostoAnualAtual: novoValorImposto,
    //   });
    // }
  }, [dados.eventoAtual]);

  return <div />;
}
