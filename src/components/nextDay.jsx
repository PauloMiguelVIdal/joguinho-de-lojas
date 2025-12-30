import React, { useContext, useEffect, useState } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import PróximoImg from "../../public/outrasImagens/proximo.png";
import Sorteio from "./Sorteio";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import useSound from "use-sound";
import nextDayAudio from "../../public/sounds/nextDayAudio.mp3";
import newStageAudio from "../../public/sounds/newStageAudio.mp3";
import { useHotkeys } from "react-hotkeys-hook";
import { use } from "react";
export function NextDay() {
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  const { economiaSetores, setEconomiaSetores, atualizarEco } = useContext(
    DadosEconomyGlobalContext
  );

  const tooltipStyle = {
    backgroundColor: "#FFFFFF",
    color: "#350973",
    borderRadius: "6px",
    padding: "6px 10px",
    fontWeight: "600",
    fontSize: "14px",
  };

  const TooltipPadrao = ({ id }) => (
  <Tooltip
    id={id}
    style={tooltipStyle}
    border="1px solid #350973"
  />
);


  const [buttonNextDayAudio] = useSound(nextDayAudio);
  const [buttonNewStageAudio] = useSound(newStageAudio);
  const todasLojas = ["terrenos", "lojasP", "lojasM", "lojasG"];
  const [isNKeyDown, setIsNKeyDown] = useState(false);

  const [executouAudio270, setExecutouAudio270] = useState(false);

  useEffect(() => {
    if (dados.dia === 270 && !executouAudio270) {
      buttonNewStageAudio();
      setExecutouAudio270(true); // marca que já executou
    }
  }, [dados.dia, executouAudio270]);

  useHotkeys(
    "d",
    () => {
      if (
        dados.dia <= 1 ||
        dados.modal.estadoModal ||
        dados.modalAlert.estadoModal ||
        dados.modalDespesas.estadoModal ||
        dados.modalEconomiaGlobal.estadoModal ||
        dados.dia % 30 === 0 ||
        isNKeyDown // 2. Se já estiver pressionada, ignora o auto-repeat
      )
        return;
      setIsNKeyDown(true);
      ProximoDia();
    },
    {
      keydown: true,
      keyup: false,
      enableOnTags: ["INPUT", "TEXTAREA", "SELECT"],
    }
  );
  useHotkeys(
    "d",
    () => {
      setIsNKeyDown(false);
    },
    {
      keydown: false,
      keyup: true,
      enableOnTags: ["INPUT", "TEXTAREA", "SELECT"],
    }
  );
  // Função para avançar para o próximo dia
  const ProximoDia = () => {
    if (economiaSetores.saldo < 0) {
      atualizarEco("fimGame", true);
      return;
    }
    if (
      dados.dia % 360 === 0 &&
      !economiaSetores.despesasImpostoAnual.impostoAnualPago
    ) {
      return;
    }
    if (dados.dia % 30 === 0 && !dados.despesas.despesasPagas) {
      return;
    }
    if (!economiaSetores.despesasEmprestimo.despesasPagas) {
      return;
    }
    if (!economiaSetores.despesasEmprestimo.despesasPagas) {
      return;
    }
    if(economiaSetores.activeLoan?.proximoVencimento !== undefined){
      if(economiaSetores.activeLoan.proximoVencimento===dados.dia){
        return;
      }
    }
    //   useEffect(() => {
    //     if (dados.dia % 30 === 0) {
    //       atualizarDados('despesas', {
    //         ...economiaSetores.despesas,
    //         diaPagarDespesas: true,
    //         despesasPagas: false,
    //         proximoPagamento: "30"
    //       });
    //     }
    //   }, [dados.despesas.proximoPagamento]);
    //  ("saçdfjasçkldfj")

    //    dados.animarCicloDia();
    const novoDia = dados.dia + 1;
    atualizarDados("dia", novoDia);
    // console.log(dados.dia);
    calcularFaturamento();
    buttonNextDayAudio();
  };

  const calcularFaturamento = () => {
    let faturamentoDiario = 0;

    const novasLojas = todasLojas.map((loja) => {
      const valorUnitário = dados[loja].faturamentoUnitárioPadrão;
      const valorVariável = parseFloat(
        (valorUnitário * (1 + (Math.random() * 0.6 - 0.3))).toFixed(2)
      );
      const lojas = ["terrenos", "lojasP", "lojasM", "lojasG"];
      const faturamentoTotal = parseFloat(
        (valorVariável * dados[loja].quantidade).toFixed(2)
      );

      faturamentoDiario += faturamentoTotal;
      if (dados.dia === 270) {
        let patrimonio = 0;

        lojas.forEach((loja) => {
          const quantidadeLojas = dados[loja].quantidade;
          const precoConstrucao = dados[loja].preçoConstrução;

          const quantidadeTerrenosNec = dados[loja].quantidadeNecTerreno;
          const custoTerreno = dados.terrenos.preçoConstrução;

          const custoTotalLoja =
            quantidadeLojas * precoConstrucao +
            quantidadeTerrenosNec * custoTerreno;
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

      console.log();
    });

    // Verifica se é o início de um novo mês e reseta o faturamento mensal
    const novoFaturamentoMensal =
      dados.dia % 30 === 0
        ? faturamentoDiario
        : dados.faturamento.faturamentoMensal + faturamentoDiario;

    atualizarEco("saldo", economiaSetores.saldo + faturamentoDiario);
    if (dados.dia <= 270){

      atualizarDados("faturamento", {
        ...dados.faturamento,
        faturamentoDiário: faturamentoDiario,
        faturamentoMensal: novoFaturamentoMensal,
        arrayFatuDiário: [
          ...dados.faturamento.arrayFatuDiário,
          faturamentoDiario,
        ],
      });
    } ;
      
    todasLojas.forEach((loja, index) => {
      atualizarDados(loja, novasLojas[index]);
    });
  };

  // Função para capturar a tecla espaço
  // const handleKeyDown = (event) => {
  //     if (event.key === " ") {
  //         event.preventDefault(); // Impede o comportamento padrão da tecla espaço (scroll)
  //         ProximoDia(); // Chama a função do próximo dia
  //     }
  // };

  // Hook para adicionar e remover o event listener
  // useEffect(() => {
  //     const handleKeyDownWrapper = (event) => handleKeyDown(event);
  //     //alterar pois está quebrando
  //     window.addEventListener("keydown", handleKeyDownWrapper);

  //     return () => {
  //         window.removeEventListener("keydown", handleKeyDownWrapper);
  //     };
  // }, [dados.dia]); // Adiciona uma dependência em `dados.dia` para garantir que o evento seja escutado em todas as renderizações

  return (
    <div className="flex">
      <button
        data-tooltip-id="saldo-tip"
        data-tooltip-content="Avança para o próximo dia (D)"
        className="w-full min-h-[50px] aspect-square bg-laranja rounded-[20px] flex items-center justify-center hover:bg-[#E56100] active:scale-95 hover:scale-[1.05] "
        onClick={ProximoDia}
      >
        <img className="w-[60%] aspect-square" src={PróximoImg} alt="Próximo" />
      </button>
      <Sorteio />

        <TooltipPadrao style={tooltipStyle} id="saldo-tip" />
    </div>
  );
}

// export function useHotkeyOnce(key, callback) {
//   const [pressed, setPressed] = useState(false);

//   useHotkeys(
//     key,
//     () => {
//       if (pressed) return;
//       setPressed(true);
//       callback();
//     },
//     { keydown: true, keyup: false }
//   );

//   useHotkeys(key, () => setPressed(false), { keydown: false, keyup: true });
// }
