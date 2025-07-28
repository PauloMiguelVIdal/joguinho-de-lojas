
import { useContext, useEffect } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import despesasImg from "../imagens/despesas.png";

export default function PayTexes() {
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);

  const todasLojas = ["terrenos", "lojasP", "lojasM", "lojasG"];

  // Cálculo de impostos diário e mensal
  useEffect(() => {
    if (dados.dia < 250) { // Evita cálculos no dia 0
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
    } else if (dados.dia === 250) {
      todasLojas.forEach((loja) => {

        const dadosLoja = dados[loja];
        atualizarDados(loja, {
          ...dadosLoja,
          faturamentoUnitário: 0,
          faturamentoUnitárioPadrão: 0,
          impostoFixo: 0,
          impostoSobreFaturamento: 0
        });
      });
    }
    else return;

  }, [dados.dia]);

  const mapaEdificioParaSetor = {
    // Agricultura
    "Plantação De Grãos": "agricultura",
    "Plantação De Vegetais": "agricultura",
    "Fazenda Administrativa": "agricultura",
    "Pomares": "agricultura",
    "Cooperativa Agrícola": "agricultura",
    "Centro De Comércio De Plantações": "agricultura",
    "Fazenda De Vacas": "agricultura",
    "Granja De Aves": "agricultura",
    "Criação De Ovinos": "agricultura",
    "Armazém": "agricultura",
    "Silo": "agricultura",
    "Depósito De Resíduos Orgânicos": "agricultura",
    "Madeireira": "agricultura",
    "Área Florestal": "agricultura",
    "Terreno De Mineração": "agricultura",
    "Plantação De Eucalipto": "agricultura",
    "Plantação De Plantas Medicinais": "agricultura",

    // Indústria
    "Fábrica De Móveis": "industria",
    "Fábrica De Ração": "industria",
    "Fábrica De Embalagem": "industria",
    "Fábrica De Fertilizante": "industria",
    "Fábrica De Bebidas": "industria",
    "Fábrica De Pães": "industria",
    "Fábrica De Turbinas Eólicas": "industria",
    "Fábrica De Painéis Solares": "industria",
    "Fábrica De Baterias": "industria",
    "Fábrica De Celulose": "industria",
    "Fábrica De Papel": "industria",
    "Fábrica De Livros": "industria",
    "Alto-Forno": "industria",
    "Usina Siderúrgica": "industria",
    "Fundição de Alumínio": "industria",
    "Fábrica De Ligas Metálicas": "industria",
    "Indústria De Componentes Mecânicos": "industria",
    "Fábrica De Chapas Metálicas": "industria",
    "Fábrica De Estruturas Metálicas": "industria",
    "Fábrica De Peças Automotivas": "industria",
    "Montadora De Veículos Elétricos": "industria",
    "Fábricas De Automóveis": "industria",
    "Refinaria de Biocombustíveis": "industria",
    "Refinaria": "industria",
    "Biofábrica": "industria",
    "Fábrica De Motores": "industria",
    "Fábrica De Foguetes": "industria",
    "Fábrica De Aeronaves": "industria",
    "Fábrica De Návios": "industria",
    "Fábrica De Eletrônicos": "industria",
    "Fábrica De Semicondutores": "industria",
    "Fábrica De Robôs": "industria",
    "Empresa De Automação Industrial": "industria",

    // Pesquisa
    "Servidor Em Nuvem": "tecnologia",
    "Data Center": "tecnologia",
    "Startup": "tecnologia",
    "Empresa De Desenvolvimento De Software": "tecnologia",
    "Centro de Pesquisa Química": "tecnologia",
    "Centro De Pesquisa Em Fusão Nuclear": "tecnologia",
    "Centro De Pesquisa Em Eletrônicos": "tecnologia",
    "Centro De Pesquisa Aeroespacial": "tecnologia",
    "Centro De Pesquisa Em Robótica": "tecnologia",
    "Centro De Pesquisa Em IA": "tecnologia",

    // Comércio
    "Feira Livre": "comercio",
    "Loja De Móveis": "comercio",
    "Restaurante": "comercio",
    "Livraria": "comercio",
    "Mercado": "comercio",
    "Adega": "comercio",
    "Padaria": "comercio",
    "Açougue": "comercio",
    "Loja De Conveniência": "comercio",
    "Posto De Gasolina": "comercio",
    "Redes De Fast-food": "comercio",
    "Loja De Eletrônicos": "comercio",
    "Joalheria": "comercio",
    "Concessionária De Veículos": "comercio",
    "Petshop": "comercio",
    "Farmácia": "comercio",
    "Cafeteria": "comercio",
    "Loja De Departamentos": "comercio",
    "Loja De Calçados": "comercio",
    "Loja De Vestuário": "comercio",
    "Shopping Popular": "comercio",
    "Shopping Center": "comercio",
    "Centro De Distribuição": "comercio",
    "Armazém Logístico": "comercio",
    "Transporte Petrolífero": "comercio",

    // Infraestrutura
    "Construtora": "imobiliario",
    "Cartório E Licenças": "imobiliario",
    "Terraplanagem E Pavimentação": "imobiliario",
    "Construtora De Infraestruturas": "imobiliario",
    "Aeroporto": "imobiliario",
    "Porto": "imobiliario",
    "Mineradora": "imobiliario",
    "Mineradora Radioativa": "imobiliario",
    "Mineradora De Pedras Preciosas": "imobiliario",
    "Mega Mercado": "imobiliario",
    "Prédio De Alto Padrão": "imobiliario",
    "Centro De Coleta De Biomassa": "imobiliario",
    "Tanque De Armazenamento Biocombustível": "imobiliario",
    "Plataforma De Petróleo": "imobiliario",

    // Energia
    "Subestação De Energia": "energia",
    "Rede De Distribuição Elétrica": "energia",
    "Usina Solar": "energia",
    "Centro De Pesquisa Energética": "energia",
    "Centro De Baterias Recicláveis": "energia",
    "Estação De Carregamento": "energia",
    "Usina Termelétrica A Biocombustíveis": "energia",
    "Usina De Biomassa": "energia",
    "Usina Hidrelétrica": "energia",
    "Parque Eólico": "energia",
    "Usina Termolétrica": "energia",
    "Reator Nuclear Convencional": "energia",
    "Usina De Fusão Nuclear": "energia"
  };

  const descobrirSetor = (nomeEdificio) => {
    return mapaEdificioParaSetor[nomeEdificio] || null;
  }



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



  // useEffect(() => {
  //   const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

  //   let faturamentoTotalDiario = 0;
  //   let impostoFixoTotal = 0;
  //   let impostoFaturamentoMensal = 0;
  //   let impostoDiarioTotal = 0;

  //   const novaCarteira = [];

  //   setoresArr.forEach((setor) => {
  //     const edificiosNoSetor = dados[setor]?.edificios || [];

  //     // Filtra os edifícios ativos e armazena na carteira
  //     const edificiosAtivos = edificiosNoSetor.filter((ed) => ed.quantidade > 0);
  //     novaCarteira.push(...edificiosAtivos); // agora será um array plano com todos os edifícios ativos
  //   });

  //   novaCarteira.forEach((ed) => {
  //     const quantidade = ed.quantidade || 0;
  //     const faturamentoUnitario = ed?.finanças?.faturamentoUnitário || 0;
  //     const impostoFixo = ed?.finanças?.impostoFixo || 0;
  //     const impostoSobreFatu = ed?.finanças?.impostoSobreFatu || 0;


  //     // Novo: descobrir o setor e o fator da economia
  //     const setorEdificio = descobrirSetor(ed.nome);
  //     const economiaSetor = dados[setorEdificio]?.economia || "estável";
  //     const fatorEconomico = {
  //       recessão: 0.6,
  //       declinio: 0.85,
  //       estável: 1,
  //       progressiva: 1.1,
  //       aquecida: 1.25,
  //     }[economiaSetor];

  //     console.log("Setor:", setorEdificio, "Economia:", dados[setorEdificio]?.economia);


  //     // Novo: aplica o fator econômico no faturamento
  //     const faturamentoDiario = faturamentoUnitario * quantidade * fatorEconomico;
  //     faturamentoTotalDiario += faturamentoDiario;

  //     console.log("essa é a economia do setor", economiaSetor)

  //     // Imposto sobre o faturamento
  //     const impostoFatuDiario = faturamentoDiario * impostoSobreFatu;
  //     impostoDiarioTotal += impostoFatuDiario;

  //     // Histórico dos últimos 30 dias
  //     const arrayFatu = ed.arrayFatu || [];
  //     const novoArrayFatu = [...arrayFatu, faturamentoDiario].slice(-30);
  //     const somaMensalFatu = novoArrayFatu.reduce((acc, val) => acc + val, 0);


  //     const impostoMensalSobreFaturamento = somaMensalFatu * impostoSobreFatu;

  //     impostoFaturamentoMensal += impostoMensalSobreFaturamento;

  //     // Imposto fixo (mensal)
  //     let impostoFixoAtual = 0;
  //     if (dados.dia % 30 === 0) {
  //       impostoFixoAtual = impostoFixo * quantidade;
  //       impostoFixoTotal += impostoFixoAtual;
  //     }

  //     console.log("Edifício:", ed.nome, "Setor encontrado:", setorEdificio);


  //     // Atualiza os dados do edifício
  //     atualizarDados(ed.nome, {
  //       ...ed,
  //       arrayFatu: novoArrayFatu,
  //       somaArrayFatu: somaMensalFatu,
  //       faturamentoTotal: faturamentoDiario,
  //       valorImpostoSobreFaturamento: impostoFatuDiario,
  //       valorImpostoFixoTotal: impostoFixoAtual,
  //     });
  //   });


  //   const impostoMensalTotal = impostoFixoTotal + impostoFaturamentoMensal;

  //   atualizarDados("imposto", {
  //     impostoDiário: impostoDiarioTotal,
  //     impostoMensal: impostoMensalTotal,
  //     impostoFixoMensal: impostoFixoTotal,
  //     impostoFaturamentoMensal: impostoFaturamentoMensal,
  //     impostoSobreFaturamentoDiário: impostoDiarioTotal,
  //   });

  //   console.log("Carteira Agora", novaCarteira);

  //   atualizarDados("saldo", dados.saldo + faturamentoTotalDiario);
  // }, [dados.dia]);

  useEffect(() => {
    const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];
  
    let faturamentoTotalDiario = 0;
    let impostoFixoTotal = 0;
    let impostoFaturamentoMensal = 0;
    let impostoDiarioTotal = 0;
  
    setoresArr.forEach((setor) => {
      const edificiosOriginais = dados[setor]?.edificios || [];
  
      const edificiosAtualizados = edificiosOriginais.map((ed) => {
        if (ed.quantidade <= 0) return ed;
  
        const quantidade = ed.quantidade || 0;
        const faturamentoUnitario = ed?.finanças?.faturamentoUnitário || 0;
        const impostoFixo = ed?.finanças?.impostoFixo || 0;
        const impostoSobreFatu = ed?.finanças?.impostoSobreFatu || 0;
  
        const economiaSetor = dados[setor]?.economiaSetor?.estadoAtual || "estável";
        const fatorEconomico = {
          "recessão": 0.6,
          "declinio": 0.85,
          "estável": 1,
          "progressiva": 1.1,
          "aquecida": 1.25,
        }[economiaSetor];
  
        const faturamentoDiario = faturamentoUnitario * quantidade * fatorEconomico;
        faturamentoTotalDiario += faturamentoDiario;
  
        const impostoFatuDiario = faturamentoDiario * impostoSobreFatu;
        impostoDiarioTotal += impostoFatuDiario;
  
        const arrayFatu = ed.arrayFatu || [];
        const novoArrayFatu = [...arrayFatu, faturamentoDiario].slice(-30);
        const somaMensalFatu = novoArrayFatu.reduce((acc, val) => acc + val, 0);
        const impostoMensalSobreFaturamento = somaMensalFatu * impostoSobreFatu;
        impostoFaturamentoMensal += impostoMensalSobreFaturamento;
  
        const impostoFixoAtual = (dados.dia % 30 === 0) ? impostoFixo * quantidade : ed.valorImpostoFixoTotal || 0;
        if (dados.dia % 30 === 0) impostoFixoTotal += impostoFixoAtual;
  
        return {
          ...ed,
          arrayFatu: novoArrayFatu,
          somaArrayFatu: somaMensalFatu,
          faturamentoTotal: faturamentoDiario,
          valorImpostoSobreFaturamento: impostoFatuDiario,
          valorImpostoFixoTotal: impostoFixoAtual
        };
      });
  
      atualizarDados(setor, {
        ...dados[setor],
        edificios: edificiosAtualizados,
      });
    });
  
    const impostoMensalTotal = impostoFixoTotal + impostoFaturamentoMensal;
  
    atualizarDados("imposto", {
      impostoDiário: impostoDiarioTotal,
      impostoMensal: impostoMensalTotal,
      impostoFixoMensal: impostoFixoTotal,
      impostoFaturamentoMensal: impostoFaturamentoMensal,
      impostoSobreFaturamentoDiário: impostoFaturamentoMensal,
    });
  
    atualizarDados("saldo", dados.saldo + faturamentoTotalDiario);
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
