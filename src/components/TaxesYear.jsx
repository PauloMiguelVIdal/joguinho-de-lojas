import React, { useContext, useEffect } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import patrimônio from "../../public/imagens/patrimônio.png";
import useSound from "use-sound";
import audioCoin from "../../public/sounds/cash-register-kaching-376867.mp3";
// Tooltip
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

// 🔹 Função auxiliar: calcula patrimônio total de um setor
function calcularPatrimonioSetor(setor, dados) {
  function calcularCustoRecurso(nomeRecurso, nivel = 1) {
    for (const setorBusca of setoresArr) {
      const edificioEncontrado = dados[setorBusca]?.edificios?.find(
        (e) => e.nome === nomeRecurso
      );
      if (!edificioEncontrado) continue;

      let custoTotal = edificioEncontrado.custoConstrucao || 0;

      const lojasNec = edificioEncontrado.lojasNecessarias || {};
      custoTotal += (lojasNec.terrenos || 0) * dados.terrenos.preçoConstrução;
      custoTotal +=
        (lojasNec.lojasP || 0) *
        (dados.lojasP.preçoConstrução +
          dados.lojasP.quantidadeNecTerreno * dados.terrenos.preçoConstrução);
      custoTotal +=
        (lojasNec.lojasM || 0) *
        (dados.lojasM.preçoConstrução +
          dados.lojasM.quantidadeNecTerreno * dados.terrenos.preçoConstrução);
      custoTotal +=
        (lojasNec.lojasG || 0) *
        (dados.lojasG.preçoConstrução +
          dados.lojasG.quantidadeNecTerreno * dados.terrenos.preçoConstrução);

      if (Array.isArray(edificioEncontrado.recursoDeConstrução)) {
        edificioEncontrado.recursoDeConstrução.forEach((sub) => {
          custoTotal += calcularCustoRecurso(sub, nivel + 1);
        });
      }

      return custoTotal;
    }

    return 0;
  }



  const setorDados = dados[setor];
  if (!setorDados || !setorDados.edificios) return 0;

  let patrimonioTotal = 0;
  setorDados.edificios.forEach((e) => {
    if (e.quantidade > 0) {
      patrimonioTotal += calcularCustoRecurso(e.nome) * e.quantidade;
    }
  });

  return patrimonioTotal;
}

export function TaxesYear() {

    const TooltipPadrao = ({ id }) => (
  <Tooltip
    id={id}
    style={tooltipStyle}
    border="1px solid #350973"
  />
);

  const { dados } = useContext(CentraldeDadosContext);
  const { economiaSetores, atualizarEcoProf } =
    useContext(DadosEconomyGlobalContext);


   const [audioPay] = useSound(audioCoin);   
  // 🔹 Atualiza contador para o próximo pagamento anual
  const proximoDiaChegar = (n) => {
    return n % 360 === 0 ? 0 : 360 - (n % 360);
  };
  const proximoDia = proximoDiaChegar(dados.dia);
  
  // ✅ Atualiza contador de dias até próximo pagamento
  useEffect(() => {
    if (!economiaSetores.despesasImpostoAnual) return;
    
    atualizarEcoProf(["despesasImpostoAnual"], {
      ...economiaSetores.despesasImpostoAnual,
      proximoPagamento: proximoDia,
    });
  }, [dados.dia]);

  // ✅ Atualiza patrimônio quando edifícios mudam (sem alterar imposto acumulado)
  useEffect(() => {
    if (dados.dia < 270) return;

    let patrimonioGlobal = 0;

    setoresArr.forEach((setor) => {
      const setorData = economiaSetores[setor]?.economiaSetor;
      if (!setorData) return;

      const patrimonioSetor = calcularPatrimonioSetor(setor, dados);

      // Atualiza apenas o patrimônio atual
      atualizarEcoProf([setor, "economiaSetor"], {
        ...setorData,
        patrimonio: patrimonioSetor,
      });

      patrimonioGlobal += patrimonioSetor;
    });

    // Atualiza patrimônio global
    atualizarEcoProf(["patrimonioGlobal"], patrimonioGlobal);

  }, [
    ...setoresArr.map(setor => dados[setor]?.edificios)
  ]);

  // 🔹 Calcula e ACUMULA imposto mensal no fim de cada mês
  useEffect(() => {
    if (dados.dia < 270) return;
    if (dados.dia % 30 !== 0) return;

    let impostoTotalMes = 0;

    setoresArr.forEach((setor) => {
      const setorData = economiaSetores[setor]?.economiaSetor;
      if (!setorData) return;

      const patrimonioSetor = calcularPatrimonioSetor(setor, dados);
      const valorImpostoMes = (patrimonioSetor * setorData.percImpostoAnualAtual) / 12 / 100;

      // ✅ ACUMULA o imposto no setor
      const novoValorAcumulado = (setorData.valorImpostoAnualAtual || 0) + valorImpostoMes;

      atualizarEcoProf([setor, "economiaSetor"], {
        ...setorData,
        valorImpostoAnualAtual: novoValorAcumulado,
        arrValorImpostoAnualPorMes: [
          ...(setorData.arrValorImpostoAnualPorMes || []),
          valorImpostoMes,
        ],
        RelatórioMensalImpostoAnual: {
          ...(setorData.RelatórioMensalImpostoAnual || {}),
          [dados.dia]: {
            patrimonio: patrimonioSetor,
            percImposto: setorData.percImpostoAnualAtual,
            valorImposto: valorImpostoMes,
            valorAcumulado: novoValorAcumulado,
          },
        },
      });

      impostoTotalMes += valorImpostoMes;
    });

    // ✅ ACUMULA no imposto global
    const impostoGlobalAtual = economiaSetores.valorImpostoAnual || 0;
    atualizarEcoProf(["valorImpostoAnual"], impostoGlobalAtual + impostoTotalMes);

    // 🔹 No dia 360 marca imposto como pendente
    if (dados.dia % 360 === 0) {
      const impostoAnualGlobal = (economiaSetores.valorImpostoAnual || 0) + impostoTotalMes;
      
      atualizarEcoProf(["despesasImpostoAnual"], {
        ...economiaSetores.despesasImpostoAnual,
        diaPagarImpostoAnual: true,
        impostoAnualPago: false,
        proximoPagamento: 0,
      });

      atualizarEcoProf(["modalImpostoAnual"], {
        estadoModal: true,
        head: "Imposto Anual",
        content: `Você precisa pagar ${impostoAnualGlobal.toFixed(
          2
        )} de imposto anual.`,
      });
    }
  }, [dados.dia]);

  // 🔹 Função que paga o imposto anual
  const pagarImpostoAnual = () => {
    if (!economiaSetores.despesasImpostoAnual?.diaPagarImpostoAnual) return;

    const valor = economiaSetores.valorImpostoAnual || 0;

    // Verifica se tem saldo suficiente
    if (economiaSetores.saldo < valor) {
      atualizarEcoProf(["modalImpostoAnual"], {
        estadoModal: true,
        head: "Saldo Insuficiente",
        content: `Você precisa de ${valor.toFixed(2)} mas tem apenas ${economiaSetores.saldo.toFixed(2)} disponível.`,
      });
      return;
    }

    // Desconta do saldo
    atualizarEcoProf(["saldo"], economiaSetores.saldo - valor);
audioPay();
    // Reseta acumuladores de cada setor
    setoresArr.forEach((setor) => {
      const setorData = economiaSetores[setor]?.economiaSetor;
      if (!setorData) return;

      atualizarEcoProf([setor, "economiaSetor"], {
        ...setorData,
        arrValorImpostoAnualPorMes: [],
        valorImpostoAnualAtual: 0,
        RelatórioMensalImpostoAnual: {},
      });
    });

    // Atualiza flags
    atualizarEcoProf(["despesasImpostoAnual"], {
      ...economiaSetores.despesasImpostoAnual,
      diaPagarImpostoAnual: false,
      impostoAnualPago: true,
      proximoPagamento: 360,
    });

    atualizarEcoProf(["modalImpostoAnual"], {
      estadoModal: false,
      head: "",
      content: "",
    });

    // ✅ Reseta valor global
    atualizarEcoProf(["valorImpostoAnual"], 0);
  };

  // 🔹 Tooltip customizado
  const tooltipStyle = {
    backgroundColor: "#FFFFFF",
    color: "#350973",
    borderRadius: "6px",
    padding: "6px 10px",
    fontWeight: "600",
    fontSize: "14px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  };

  // 🔹 Renderização
  if (dados.dia < 270) return null;
  
  const renderButton = (tooltipContent) => (
    <>
      <button
        className="w-[50%] min-h-[50px] aspect-square bg-laranja rounded-[10px] flex items-center justify-center hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]"
        onClick={pagarImpostoAnual}
      >
        <img
          className="h-[70%] w-max-[58px] aspect-square"
          src={patrimônio}
          data-tooltip-id="patrimonio-tip"
          data-tooltip-content={tooltipContent}
        />
      </button>

     <TooltipPadrao style={tooltipStyle} id="patrimonio-tip" />
    </>
  );

  if (dados.dia % 360 !== 0) {
    return (
      <div className="flex justify-center items-center bg-[#290064] w-full rounded-[10px]">
        <div className="flex justify-center items-center w-full">
          <h2
            data-tooltip-id="dias-tip"
            data-tooltip-content={`Faltam ${proximoDia} dias. Imposto acumulado: ${(economiaSetores.valorImpostoAnual || 0).toFixed(2)}`}
            className="text-white text-[20px] fonteBold"
          >
            {economiaSetores.despesasImpostoAnual?.proximoPagamento || proximoDia}

                  <TooltipPadrao style={tooltipStyle} id="dias-tip"  />

          </h2>
        </div>
        {renderButton(`Faltam ${proximoDia} dias para você precisar pagar o imposto anual!`)}
      </div>
    );
  } else if (
    dados.dia % 360 === 0 &&
    economiaSetores.despesasImpostoAnual?.impostoAnualPago === false
  ) {
    return (
      <div className="flex justify-center items-center bg-[#290064] w-full rounded-[10px] relative">
        <div className="flex justify-center items-center w-full">
          <h2 
            data-tooltip-id="valor-tip"
            data-tooltip-content={`Imposto a pagar: ${(economiaSetores.valorImpostoAnual || 0).toFixed(2)}`}
            className="text-white text-[20px] fonteBold"
          >
            {economiaSetores.despesasImpostoAnual?.proximoPagamento || 0}
            <TooltipPadrao style={tooltipStyle} id="valor-tip" />
          </h2>
        </div>
        {renderButton("Você precisa pagar o imposto anual, clique aqui para pagar!")}
        <div className="absolute bottom-[-5px] right-[-5px]">
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF0000] opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-[#FF0000]"></span>
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center bg-[#290064] w-full rounded-[10px] relative">
        <div className="flex justify-center items-center w-full">
          <h2 className="text-white text-[20px] fonteBold">
            {economiaSetores.despesasImpostoAnual?.proximoPagamento || 360}
          </h2>
        </div>
        {renderButton("Imposto anual já pago, confira seu patrimônio")}
        <div className="absolute bottom-[-5px] right-[-5px]">
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#008000] opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-[#008000]"></span>
          </span>
        </div>
      </div>
    );
  }
}