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
  const { dados } = useContext(CentraldeDadosContext);
  const { economiaSetores, atualizarEcoProf } = useContext(DadosEconomyGlobalContext);
  const [audioPay] = useSound(audioCoin);

  const proximoDiaChegar = (n) => (n % 360 === 0 ? 0 : 360 - (n % 360));
  const proximoDia = proximoDiaChegar(dados.dia);

  const tooltipStyle = {
    backgroundColor: "#1a053d",
    color: "#fff",
    borderRadius: "10px",
    border: "1px solid #FF8A00",
    padding: "10px",
    fontSize: "12px",
    zIndex: 200
  };

  useEffect(() => {
    if (!economiaSetores.despesasImpostoAnual) return;
    atualizarEcoProf(["despesasImpostoAnual"], {
      ...economiaSetores.despesasImpostoAnual,
      proximoPagamento: proximoDia,
    });
  }, [dados.dia]);

  useEffect(() => {
    if (dados.dia < 270) return;
    let patrimonioGlobal = 0;
    setoresArr.forEach((setor) => {
      const setorData = economiaSetores[setor]?.economiaSetor;
      if (!setorData) return;
      const patrimonioSetor = calcularPatrimonioSetor(setor, dados);
      atualizarEcoProf([setor, "economiaSetor"], { ...setorData, patrimonio: patrimonioSetor });
      patrimonioGlobal += patrimonioSetor;
    });
    atualizarEcoProf(["patrimonioGlobal"], patrimonioGlobal);
  }, [...setoresArr.map(setor => dados[setor]?.edificios)]);

  useEffect(() => {
    if (dados.dia < 270 || dados.dia % 30 !== 0) return;
    let impostoTotalMes = 0;
    setoresArr.forEach((setor) => {
      const setorData = economiaSetores[setor]?.economiaSetor;
      if (!setorData) return;
      const patrimonioSetor = calcularPatrimonioSetor(setor, dados);
      const valorImpostoMes = (patrimonioSetor * setorData.percImpostoAnualAtual) / 12 / 100;
      const novoValorAcumulado = (setorData.valorImpostoAnualAtual || 0) + valorImpostoMes;
      atualizarEcoProf([setor, "economiaSetor"], {
        ...setorData,
        valorImpostoAnualAtual: novoValorAcumulado,
      });
      impostoTotalMes += valorImpostoMes;
    });
    const impostoGlobalAtual = economiaSetores.valorImpostoAnual || 0;
    atualizarEcoProf(["valorImpostoAnual"], impostoGlobalAtual + impostoTotalMes);

    if (dados.dia % 360 === 0) {
      atualizarEcoProf(["despesasImpostoAnual"], {
        ...economiaSetores.despesasImpostoAnual,
        diaPagarImpostoAnual: true,
        impostoAnualPago: false,
        proximoPagamento: 0,
      });
    }
  }, [dados.dia]);

  // 🔹 Modificação: Só permite pagar se for dia de pagamento (dia % 360 === 0)
  const pagarImpostoAnual = () => {
    const isPayDay = dados.dia % 360 === 0;
    if (!isPayDay) return; // Bloqueio extra via função

    const valor = economiaSetores.valorImpostoAnual || 0;
    if (economiaSetores.saldo < valor) return;

    atualizarEcoProf(["saldo"], economiaSetores.saldo - valor);
    audioPay();
    atualizarEcoProf(["despesasImpostoAnual"], {
      ...economiaSetores.despesasImpostoAnual,
      diaPagarImpostoAnual: false,
      impostoAnualPago: true,
      proximoPagamento: 360,
    });
    atualizarEcoProf(["valorImpostoAnual"], 0);
  };

  if (dados.dia < 270) return null;

  const isPending = dados.dia % 360 === 0 && !economiaSetores.despesasImpostoAnual?.impostoAnualPago;
  const isNear = proximoDia <= 30 && !isPending;

  return (
    <div className={`flex items-center justify-between w-full h-[54px] rounded-[12px] p-1 transition-all duration-500 ${
      isPending ? "bg-red-600/20 border border-red-500 animate-pulse" : "bg-[#350973]/40 border border-white/10"
    }`}>
      
      <div 
        className="flex flex-col items-center justify-center flex-1"
        data-tooltip-id="tax-info"
        data-tooltip-content={isPending ? "IMPOSTO VENCIDO!" : `Próximo imposto em ${proximoDia} dias`}
      >
        <h2 className={`text-[20px] fonteBold leading-none ${isNear ? "text-laranja" : "text-white"}`}>
          {proximoDia}
        </h2>
      </div>

      <button
        onClick={pagarImpostoAnual}
        disabled={!isPending} // 🔹 Desativa o botão se não for dia de pagar
        data-tooltip-id="tax-action"
        data-tooltip-content={isPending ? "CLIQUE PARA PAGAR AGORA" : `Aguarde o fechamento do ano (${proximoDia} dias)`}
        className={`relative h-full aspect-square rounded-[10px] flex items-center justify-center transition-all ${
          isPending 
            ? "bg-gradient-to-br from-red-500 to-red-700 shadow-[0_0_20px_rgba(239,68,68,0.4)] scale-105 cursor-pointer" 
            : "bg-gray-500/50 grayscale opacity-50 cursor-not-allowed" 
        }`}
      >
        <img src={patrimônio} className="w-6 h-6 object-contain" alt="tax" />
        
        <div className="absolute -top-1 -right-1">
          <span className="relative flex size-3">
            { (isPending || isNear) && (
              <>
                <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${isPending ? "bg-red-500" : "bg-laranja"}`}></span>
                <span className={`relative inline-flex size-3 rounded-full ${isPending ? "bg-red-500" : "bg-laranja"}`}></span>
              </>
            )}
          </span>
        </div>
      </button>

      <Tooltip id="tax-info" style={tooltipStyle} />
      <Tooltip id="tax-action" style={tooltipStyle} />
    </div>
  );
}