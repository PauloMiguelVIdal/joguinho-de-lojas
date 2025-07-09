
  import { useContext, useEffect } from "react";
  import { CentraldeDadosContext } from "../centralDeDadosContext";
  import despesasImg from "../imagens/despesas.png";

  export default function PayTexes() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  
    const todasLojas = ["terrenos", "lojasP", "lojasM", "lojasG"];
  
    // Cálculo de impostos diário e mensal
    useEffect(() => {
      let impostoFixoTotal = 0;
      let impostoFaturamentoMensal = 0;
      let impostoDiarioTotal = 0;
  
      todasLojas.forEach((loja) => {
        const dadosLoja = dados[loja];
  
        const faturamentoDiario = parseFloat(dadosLoja.faturamentoTotal);
        const impostoFixo = dadosLoja.quantidade * dadosLoja.impostoFixo;
        const impostoSobreFaturamento = faturamentoDiario * dadosLoja.impostoSobreFaturamento;
  
        // Adiciona faturamento ao array de faturamento
        const novoArrayFatu = [...dadosLoja.arrayFatu, faturamentoDiario].slice(-30); // Mantém últimos 30 dias
        const somaMensalFatu = novoArrayFatu.reduce((acc, val) => acc + val, 0);
        const impostoMensalSobreFaturamento = somaMensalFatu * dadosLoja.impostoSobreFaturamento;
  
        // Atualiza dados da loja
        atualizarDados(loja, {
          ...dadosLoja,
          arrayFatu: novoArrayFatu,
          somaArrayFatu: somaMensalFatu,
          valorImpostoSobreFaturamento: impostoSobreFaturamento,
          valorImpostoFixoTotal: impostoFixo
        });
  
        impostoFixoTotal += impostoFixo;
        impostoFaturamentoMensal += impostoMensalSobreFaturamento;
        impostoDiarioTotal += impostoFixo + impostoSobreFaturamento;
      });
  
      const impostoMensalTotal = impostoFixoTotal + impostoFaturamentoMensal;
  
      atualizarDados("imposto", {
        impostoDiário: impostoDiarioTotal,
        impostoMensal: impostoMensalTotal,
        impostoFixoMensal: impostoFixoTotal,
        impostoFaturamentoMensal: impostoFaturamentoMensal,
        impostoSobreFaturamentoDiário: impostoDiarioTotal - impostoFixoTotal,
      });
    }, [dados.dia]);
  
    // Atualiza relatório diário de faturamento
    useEffect(() => {
      atualizarDados("relatórioFaturamento", {
        ...dados.relatorioFaturamento,
        [dados.dia]: todasLojas.map((loja) => dados[loja].faturamentoTotal)
      });
    }, [todasLojas.map((loja) => dados[loja].faturamentoTotal).join(",")]);
  
    // Atualiza relatório de impostos
    useEffect(() => {
      atualizarDados("relatóriosImpostos", {
        ...dados.relatóriosImpostos,
        [dados.dia]: {
          terrenos: dados.terrenos.valorImpostoSobreFaturamento,
          lojasP: dados.lojasP.valorImpostoSobreFaturamento,
          lojasM: dados.lojasM.valorImpostoSobreFaturamento,
          lojasG: dados.lojasG.valorImpostoSobreFaturamento,
          valorTotalImpostoFaturamento:
            dados.terrenos.valorImpostoSobreFaturamento +
            dados.lojasP.valorImpostoSobreFaturamento +
            dados.lojasM.valorImpostoSobreFaturamento +
            dados.lojasG.valorImpostoSobreFaturamento,
          valorTotalImpostoFixo:
            dados.terrenos.valorImpostoFixoTotal +
            dados.lojasP.valorImpostoFixoTotal +
            dados.lojasM.valorImpostoFixoTotal +
            dados.lojasG.valorImpostoFixoTotal,
        }
      });
    }, [
      dados.terrenos.valorImpostoSobreFaturamento,
      dados.lojasP.valorImpostoSobreFaturamento,
      dados.lojasM.valorImpostoSobreFaturamento,
      dados.lojasG.valorImpostoSobreFaturamento
    ]);
  
    // Gatilho de pagamento de despesas no dia 30
// Define o início do novo ciclo de despesas
useEffect(() => {
  if (dados.dia % 30 === 0) {
    atualizarDados('despesas', {
      ...dados.despesas,
      diaPagarDespesas: true,
      despesasPagas: false,
      proximoPagamento: "30"
    });
  }
}, [dados.despesas.proximoPagamento]);

// Abre o modal se ainda não pagou
useEffect(() => {
  if (dados.dia % 30 === 0 && !dados.despesas.despesasPagas) {
    atualizarDados('modalDespesas', {
      ...dados.modalDespesas,
      estadoModal: true
    });
  }
}, [dados.dia, dados.despesas.despesasPagas]);

// Função que paga as despesas e desconta do saldo
const PagarDespesas = () => {
  if (!dados.despesas.despesasPagas) {
    const novoSaldo = dados.saldo - dados.imposto.impostoMensal;
    atualizarDados('saldo', novoSaldo);
    atualizarDados('despesas', {
      ...dados.despesas,
      despesasPagas: true
    });
  }
};

// Atualiza o contador para o próximo pagamento
useEffect(() => {
  const proximoDiaChegar = (n) => {
    return ((n % 30 === 0 ? n : n + (30 - (n % 30))) - dados.dia);
  };
  const proximoDia = proximoDiaChegar(dados.dia);
  atualizarDados("despesas", {
    ...dados.despesas,
    proximoPagamento: proximoDia
  });
}, [dados.dia]);

  
 

  if (dados.dia % 30 !== 0) {
    return (
      <div className="flex justify-center items-center bg-[#290064] w-full rounded-[10px]" >
        <div className="flex justify-center items-center w-full">
          <h2 className={` text-white text-[20px] fonteBold`}>
            {dados.despesas.proximoPagamento}
          </h2>
        </div>
        <button className="w-[50%] h-[100%] w-max-[70px] min-h-[50px] h-1/2 w-full aspect-square bg-[#F4CCB6] rounded-[10px] flex items-center justify-center"
          onClick={PagarDespesas}><img className=" h-[70%] w-max-[58px] aspect-square" src={despesasImg} />
        </button>
      </div>
    )
  } else if (dados.dia % 30 === 0 && dados.despesas.despesasPagas === false) {

    return (
      <div className="flex justify-center items-center bg-[#290064] w-full rounded-[10px] relative"> {/* Adicionei o `relative` aqui */}
        <div className="flex justify-center items-center w-full">
          <h2 className="text-white text-[20px] fonteBold">
            {dados.despesas.proximoPagamento}
          </h2>
        </div>
        <button className="w-[50%] h-[100%] w-max-[70px] min-h-[50px] h-1/2 w-full aspect-square bg-laranja rounded-[10px] flex items-center justify-center hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]"
          onClick={PagarDespesas}>
          <img className="h-[70%] w-max-[58px] aspect-square" src={despesasImg} />
        </button>
        <div className="absolute bottom-[-5px] right-[-5px]">
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF0000] opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-[#FF0000]"></span>
          </span>
        </div>
      </div>

    )
  }
  else {
    return (
      <div className="flex justify-center items-center bg-[#290064] w-full rounded-[10px] relative"> {/* Adicionei o `relative` aqui */}
        <div className="flex justify-center items-center w-full">
          <h2 className="text-white text-[20px] fonteBold">
            {dados.despesas.proximoPagamento}
          </h2>
        </div>
        <button className="w-[50%] h-[100%] w-max-[70px] min-h-[50px] h-1/2 w-full aspect-square bg-laranja rounded-[10px] flex items-center justify-center hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]"
          onClick={PagarDespesas}>
          <img className="h-[70%] w-max-[58px] aspect-square" src={despesasImg} />
        </button>
        <div className="absolute bottom-[-5px] right-[-5px]">
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#008000] opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-[#008000]"></span>
          </span>
        </div>
      </div>

    )
  }
}
