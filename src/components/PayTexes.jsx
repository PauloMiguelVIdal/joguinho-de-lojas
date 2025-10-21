import { useContext, useEffect, useState } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import despesasImg from "../../public/outrasImagens/despesas.png";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import useSound from "use-sound";
import audioCoin from "../../public/sounds/cash-register-kaching-376867.mp3";

import { useHotkeys } from "react-hotkeys-hook";

export default function PayTexes() {
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  const { economiaSetores, setEconomiaSetores, atualizarEcoSafely,atualizarEco } = useContext(
    DadosEconomyGlobalContext
  );

  const todasLojas = ["terrenos", "lojasP", "lojasM", "lojasG"];
  const [isNKeyDown, setIsNKeyDown] = useState(false);

  const [audioPay] = useSound(audioCoin);

  const realizarPag = () => {
    if (dados.despesas.despesasPagas) return;
    PagarDespesas();
    audioPay();
  };

  useHotkeys(
    "s",
    () => {
      if (
        !dados.despesas.diaPagarDespesas ||
        dados.dia % 30 !== 0 ||
        dados.despesasPagas ||
        dados.modal.estadoModal ||
        dados.modalAlert.estadoModal ||
        dados.modalDespesas.estadoModal ||
        dados.modalEconomiaGlobal.estadoModal ||
        isNKeyDown // 2. Se já estiver pressionada, ignora o auto-repeat
      )
        return;
      setIsNKeyDown(true);
      realizarPag();
    },
    {
      keydown: true,
      keyup: false,
      enableOnTags: ["INPUT", "TEXTAREA", "SELECT"],
    }
  );
  useHotkeys(
    "s",
    () => {
      setIsNKeyDown(false);
    },
    {
      keydown: false,
      keyup: true,
      enableOnTags: ["INPUT", "TEXTAREA", "SELECT"],
    }
  );

  // Cálculo de impostos diário e mensal
  useEffect(() => {
    if (dados.dia < 270) {
      let impostoFixoTotal = 0;
      let impostoFaturamentoMensal = 0;
      let impostoDiarioTotal = 0;

      // console.log("=== CÁLCULO DE IMPOSTOS - DIA", dados.dia, "===");

      const dadosAtualizados = {}; // Armazena os dados atualizados de cada loja

      todasLojas.forEach((loja) => {
        const dadosLoja = dados[loja];
        if (!dadosLoja) {
          console.warn(`⚠️ Dados não encontrados para a loja: ${loja}`);
          return;
        }

        const faturamentoDiario = parseFloat(dadosLoja.faturamentoTotal || 0);
        const impostoFixo =
          (dadosLoja.quantidade || 0) * (dadosLoja.impostoFixo || 0);
        const impostoSobreFaturamento =
          faturamentoDiario * (dadosLoja.impostoSobreFaturamento || 0);

        const novoArrayFatu = [
          ...(dadosLoja.arrayFatu || []),
          faturamentoDiario,
        ].slice(-360);
        const somaMensalFatu = novoArrayFatu.reduce((acc, val) => acc + val, 0);
        const impostoMensalSobreFaturamento =
          somaMensalFatu * (dadosLoja.impostoSobreFaturamento || 0);

        // console.log(`--- ${loja.toUpperCase()} ---`);
        // console.log("Faturamento diário:", faturamentoDiario);
        // console.log("Imposto fixo (quant * valor):", impostoFixo);
        // console.log("Imposto sobre faturamento diário:", impostoSobreFaturamento);
        // console.log("Array Fatu atualizado:", novoArrayFatu);
        // console.log("Soma mensal faturamento:", somaMensalFatu);
        // console.log("Imposto mensal sobre faturamento:", impostoMensalSobreFaturamento);

        dadosAtualizados[loja] = {
          ...dadosLoja,
          arrayFatu: novoArrayFatu,
          somaArrayFatu: somaMensalFatu,
          valorImpostoSobreFaturamento: impostoSobreFaturamento,
          valorImpostoFixoTotal: impostoFixo,
        };

        impostoFixoTotal += impostoFixo;
        impostoFaturamentoMensal += impostoMensalSobreFaturamento;
        impostoDiarioTotal += impostoFixo + impostoSobreFaturamento;

        console.log(dadosAtualizados[loja], `⚠️ Dados da loja: ${loja}`);
      });

      // Atualiza todos os dados das lojas DEPOIS do loop
      Object.entries(dadosAtualizados).forEach(
        ([loja, dadosAtualizadosLoja]) => {
          atualizarDados(loja, dadosAtualizadosLoja);
        }
      );

      const impostoMensalTotal = impostoFixoTotal + impostoFaturamentoMensal;

      console.log("=== RESUMO DOS IMPOSTOS ===");
      console.log("Imposto Fixo Total:", impostoFixoTotal);
      console.log("Imposto Faturamento Mensal:", impostoFaturamentoMensal);
      console.log("Imposto Diário Total:", impostoDiarioTotal);
      console.log("Imposto Mensal Total:", impostoMensalTotal);

      atualizarEco("imposto", {
        impostoFixoMensal: impostoFixoTotal,
        impostoDiário: impostoDiarioTotal,
        impostoMensal: impostoMensalTotal,
        impostoFaturamentoMensal: impostoFaturamentoMensal,
        impostoSobreFaturamentoDiário: impostoDiarioTotal - impostoFixoTotal,
      });

      console.log("=== RESUMO DOS IMPOSTOS ===");
      console.log("Imposto Fixo Total:", impostoFixoTotal);
      console.log("Imposto Faturamento Mensal:", impostoFaturamentoMensal);
      console.log("Imposto Diário Total:", impostoDiarioTotal);
      console.log("Imposto Mensal Total:", impostoMensalTotal);
    } else if (dados.dia === 269) {
      // console.log("=== DIA 250: ZERANDO IMPOSTOS ===");
      todasLojas.forEach((loja) => {
        const dadosLoja = dados[loja];
        // console.log(`Zerando dados da loja: ${loja}`);
        atualizarDados(loja, {
          ...dadosLoja,
          faturamentoUnitário: 0,
          faturamentoUnitárioPadrão: 0,
          impostoFixo: 0,
          impostoSobreFaturamento: 0,
        });
      });
    }
  }, [dados.dia]);

  const mapaEdificioParaSetor = {
    // Agricultura
    "Plantação De Grãos": "agricultura",
    "Plantação De Vegetais": "agricultura",
    "Fazenda Administrativa": "agricultura",
    Pomares: "agricultura",
    "Cooperativa Agrícola": "agricultura",
    "Centro De Comércio De Plantações": "agricultura",
    "Fazenda De Vacas": "agricultura",
    "Granja De Aves": "agricultura",
    "Criação De Ovinos": "agricultura",
    Armazém: "agricultura",
    Silo: "agricultura",
    "Depósito De Resíduos Orgânicos": "agricultura",
    Madeireira: "agricultura",
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
    Refinaria: "industria",
    Biofábrica: "industria",
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
    Startup: "tecnologia",
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
    Restaurante: "comercio",
    Livraria: "comercio",
    Mercado: "comercio",
    Adega: "comercio",
    Padaria: "comercio",
    Açougue: "comercio",
    "Loja De Conveniência": "comercio",
    "Posto De Gasolina": "comercio",
    "Redes De Fast-food": "comercio",
    "Loja De Eletrônicos": "comercio",
    Joalheria: "comercio",
    "Concessionária De Veículos": "comercio",
    Petshop: "comercio",
    Farmácia: "comercio",
    Cafeteria: "comercio",
    "Loja De Departamentos": "comercio",
    "Loja De Calçados": "comercio",
    "Loja De Vestuário": "comercio",
    "Shopping Popular": "comercio",
    "Shopping Center": "comercio",
    "Centro De Distribuição": "comercio",
    "Armazém Logístico": "comercio",
    "Transporte Petrolífero": "comercio",

    // Infraestrutura
    Construtora: "imobiliario",
    "Cartório E Licenças": "imobiliario",
    "Terraplanagem E Pavimentação": "imobiliario",
    "Construtora De Infraestruturas": "imobiliario",
    Aeroporto: "imobiliario",
    Porto: "imobiliario",
    Mineradora: "imobiliario",
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
    "Usina De Fusão Nuclear": "energia",
  };

  const descobrirSetor = (nomeEdificio) => {
    return mapaEdificioParaSetor[nomeEdificio] || null;
  };

  // Atualiza relatório diário de faturamento
  // useEffect(() => {
  //   atualizarDados("relatórioFaturamento", {
  //     ...dados.relatorioFaturamento,
  //     [dados.dia]: todasLojas.map((loja) => dados[loja].faturamentoTotal)
  //   });
  // }, [todasLojas.map((loja) => dados[loja].faturamentoTotal).join(",")]);

  // // Atualiza relatório de impostos
  // useEffect(() => {
  //   atualizarDados("relatóriosImpostos", {
  //     ...dados.relatóriosImpostos,
  //     [dados.dia]: {
  //       terrenos: dados.terrenos.valorImpostoSobreFaturamento,
  //       lojasP: dados.lojasP.valorImpostoSobreFaturamento,
  //       lojasM: dados.lojasM.valorImpostoSobreFaturamento,
  //       lojasG: dados.lojasG.valorImpostoSobreFaturamento,
  //       valorTotalImpostoFaturamento:
  //         dados.terrenos.valorImpostoSobreFaturamento +
  //         dados.lojasP.valorImpostoSobreFaturamento +
  //         dados.lojasM.valorImpostoSobreFaturamento +
  //         dados.lojasG.valorImpostoSobreFaturamento,
  //       valorTotalImpostoFixo:
  //         dados.terrenos.valorImpostoFixoTotal +
  //         dados.lojasP.valorImpostoFixoTotal +
  //         dados.lojasM.valorImpostoFixoTotal +
  //         dados.lojasG.valorImpostoFixoTotal,
  //     }
  //   });
  // }, [
  //   dados.terrenos.valorImpostoSobreFaturamento,
  //   dados.lojasP.valorImpostoSobreFaturamento,
  //   dados.lojasM.valorImpostoSobreFaturamento,
  //   dados.lojasG.valorImpostoSobreFaturamento
  // ]);

  // Gatilho de pagamento de despesas no dia 30
  // Define o início do novo ciclo de despesas

  const diaPag = dados.dia % 30 == 0 ? true : false;

  useEffect(() => {
    if (dados.dia % 30 === 0) {
      atualizarDados("despesas", {
        ...dados.despesas,
        diaPagarDespesas: true,
        despesasPagas: false,
        proximoPagamento: "30",
      });
    }
  }, [dados.despesas.proximoPagamento]);

  // Abre o modal se ainda não pagou
  useEffect(() => {
    if (dados.dia % 30 === 0 && !dados.despesas.despesasPagas) {
      atualizarDados("modalDespesas", {
        ...dados.modalDespesas,
        estadoModal: true,
      });
    }
  }, [dados.dia, dados.despesas.despesasPagas]);

  // Função que paga as despesas e desconta do saldo
  const PagarDespesas = () => {
    if (dados.despesas.despesasPagas) return;
    else if (!dados.despesas.despesasPagas) {
      const novoSaldo =
        economiaSetores.saldo - economiaSetores.imposto.impostoMensal;
      atualizarEco("saldo", novoSaldo);
      atualizarDados("despesas", {
        ...dados.despesas,
        despesasPagas: true,
      });
    }

    if (dados.dia === 270) {
      atualizarEco("imposto", {
        impostoMensal: 0,
      });
    }
  };

  // Atualiza o contador para o próximo pagamento
  useEffect(() => {
    const proximoDiaChegar = (n) => {
      return (n % 30 === 0 ? n : n + (30 - (n % 30))) - dados.dia;
    };
    const proximoDia = proximoDiaChegar(dados.dia);
    atualizarDados("despesas", {
      ...dados.despesas,
      proximoPagamento: proximoDia,
    });
  }, [dados.dia]);

  useEffect(() => {
    if (dados.dia >= 270) {
      const setoresArr = [
        "agricultura",
        "tecnologia",
        "comercio",
        "industria",
        "imobiliario",
        "energia",
      ];

      let faturamentoTotalDiario = 0;
      let faturamentoTotalMensal = 0; // ✅ NOVO: Para calcular faturamento mensal total
      let impostoDiarioTotal = 0;
      let impostoFaturamentoMensal = 0;
      let impostoFixoTotal = 0;

      const ehPrimeiroDiaDoMes = dados.dia % 30 === 1;
      const ehDiaDeCobranca = dados.dia % 30 === 0 && dados.dia > 0;

      setoresArr.forEach((setor) => {
        const edificiosOriginais = dados[setor]?.edificios || [];

        let faturamentoTotalSetor = 0;

        const edificiosAtualizados = edificiosOriginais.map((ed) => {
          if (ed.quantidade <= 0) return ed;

          const quantidade = ed.quantidade || 0;
          const faturamentoUnitario = ed?.finanças?.faturamentoUnitário || 0;
          const impostoFixo = ed?.finanças?.impostoFixo || 0;
          const impostoSobreFatu = ed?.finanças?.impostoSobreFatu || 0;
          const quantidadeMinimaPowerUpNv3 =
            ed.powerUp?.nível3?.quantidadeMínima;
          const quantidadeMinimaPowerUpNv2 =
            ed.powerUp?.nível2?.quantidadeMínima;

          // 🔹 Cálculo de power-ups
          let acumuladorRedCusto = 0;
          let acumuladorAumFatu = 0;
          ed.RecebeMelhoraEficiencia?.forEach((edMelhorado) => {
            let qtdMelhorado = 0;
            for (const setorAlvo of setoresArr) {
              const index = dados[setorAlvo].edificios.findIndex(
                (e) => e.nome === edMelhorado.nome
              );
              if (index !== -1) {
                qtdMelhorado =
                  dados[setorAlvo].edificios[index].quantidade || 0;
                break;
              }
            }
            if (qtdMelhorado > 0) {
              const powerUpSelecionado =
                quantidade >= quantidadeMinimaPowerUpNv3
                  ? "nível3"
                  : quantidade >= quantidadeMinimaPowerUpNv2
                  ? "nível2"
                  : "nível1";

              acumuladorRedCusto +=
                edMelhorado.redCusto[powerUpSelecionado] || 0;
              acumuladorAumFatu += edMelhorado.aumFatu[powerUpSelecionado] || 0;
            }
          });

          const economiaSetor =
            economiaSetores[setor]?.economiaSetor?.estadoAtual || "estável";
          const fatorEconomico = {
            recessão: 0.4,
            declinio: 0.8,
            estável: 1,
            progressiva: 1.1,
            aquecida: 1.25,
          }[economiaSetor];

          const valorFatuFinal =
            faturamentoUnitario * (1 + acumuladorAumFatu / 100);
          const faturamentoDiario =
            valorFatuFinal * quantidade * fatorEconomico;

            faturamentoTotalSetor += faturamentoDiario;
          faturamentoTotalDiario += faturamentoDiario;

          // 🔹 Imposto sobre faturamento diário
          const impostoFatuFinal =
            impostoSobreFatu * (1 - acumuladorRedCusto / 100);
          const impostoFatuDiario = faturamentoDiario * impostoFatuFinal;
          impostoDiarioTotal += impostoFatuDiario;

          // ✅ CORREÇÃO: Histórico de faturamento com reset no primeiro dia
          const arrayFatu = ed.arrayFatu || [];
          let novoArrayFatu;
          if (ehPrimeiroDiaDoMes) {
            novoArrayFatu = [faturamentoDiario];
          } else {
            novoArrayFatu = [...arrayFatu, faturamentoDiario].slice(-360);
          }

          const somaMensalFatu = novoArrayFatu.reduce(
            (acc, val) => acc + val,
            0
          );

          // ✅ NOVO: Somar ao faturamento total mensal
          faturamentoTotalMensal += somaMensalFatu;

          // 🔹 Imposto sobre faturamento mensal
          const impostoMensalSobreFaturamento =
            somaMensalFatu * impostoFatuFinal;
          impostoFaturamentoMensal += impostoMensalSobreFaturamento;

          // 🔹 Cálculo do imposto fixo
          const impostoFixoComDesconto =
            impostoFixo * (1 - acumuladorRedCusto / 100);
          const impostoFixoEdificio = impostoFixoComDesconto * quantidade;
          impostoFixoTotal += impostoFixoEdificio;

          return {
            ...ed,
            arrayFatu: novoArrayFatu,
            somaArrayFatu: somaMensalFatu,
            faturamentoTotal: faturamentoDiario,
            valorImpostoSobreFaturamento: impostoMensalSobreFaturamento,
            valorImpostoFixoTotal: impostoFixoEdificio,
            impostoMensal: impostoMensalSobreFaturamento + impostoFixoEdificio,
          };
        });

const economiaAtual = economiaSetores[setor]?.economiaSetor || {};

  const arrayFatuSetor =
    economiaSetores[setor]?.economiaSetor?.ArrayFatu || [];
  const novoArrayFatuSetor = ehPrimeiroDiaDoMes
    ? [faturamentoTotalSetor]
    : [...arrayFatuSetor, faturamentoTotalSetor].slice(-360);

  // atualizarEco(setor, {
  //   ...economiaSetores[setor],
  //   economiaSetor: {
  //     ...economiaSetores[setor].economiaSetor,
  //     ArrayFatu: novoArrayFatuSetor,
  //   },
  // });

atualizarEcoSafely(setor, { ArrayFatu: novoArrayFatuSetor });

  // Atualiza os edifícios do setor
  atualizarDados(setor, {
    ...dados[setor],
    edificios: edificiosAtualizados,
  });

        atualizarDados(setor, {
          ...dados[setor],
          edificios: edificiosAtualizados,
        });
      });

      const impostoMensalTotal = impostoFixoTotal + impostoFaturamentoMensal;

      // ✅ REMOVIDO: Cobrança automática no dia de cobrança (outro sistema já faz isso)
      const novoSaldo = economiaSetores.saldo + faturamentoTotalDiario;

      // ✅ NOVO: Atualizar faturamento mensal total
      atualizarDados("faturamento", {
        ...dados.faturamento,
        faturamentoMensal: faturamentoTotalMensal,
        faturamentoDiario: faturamentoTotalDiario,
        arrayFatuDiário: [
          ...dados.faturamento.arrayFatuDiário,
          faturamentoTotalDiario,
        ],
      });

      // atualizarDados("faturamento", {

      //   arrayFatuDiário: [
      //     ...dados.faturamento.arrayFatuDiário,
      //     faturamentoDiario,
      //   ],
      // });

      atualizarEco("imposto", {
        impostoDiário: impostoDiarioTotal,
        impostoMensal: impostoMensalTotal,
        impostoFixoMensal: impostoFixoTotal,
        impostoFaturamentoMensal,
        impostoSobreFaturamentoDiário: impostoDiarioTotal,
        arrayImpostoDiário: [
          ...(economiaSetores.imposto.arrayImpostoDiário || []),
          impostoDiarioTotal,
        ],
      });

      atualizarEco("saldo", novoSaldo);
    }
  }, [dados.dia]);

  const tooltipText = `
<div>
  <p>Clique aqui para pagar as despesas mensais.</p>
  <p style="margin-top:4px;">Detalhes dos impostos:</p>
  <p><p/>
  <p style="margin-left:10px;">Imposto Fixo Mensal: R$ ${
    economiaSetores.valorImpostoAnual?.toFixed(2) || 0
  }</p>
  <p style="margin-left:10px;">Imposto Fixo Mensal: R$ ${
    economiaSetores.imposto.impostoFixoMensal?.toFixed(2) || 0
  }</p>
  <p style="margin-left:10px;">Imposto sobre Faturamento: R$ ${
    economiaSetores.imposto.impostoFaturamentoMensal?.toFixed(2) || 0
  }</p>
  <p style="margin-left:10px;">Total Mensal: R$ ${
    economiaSetores.imposto.impostoMensal?.toFixed(2) || 0
  }</p>
</div>
`;

  const tooltipStyle = {
    backgroundColor: "#FFFFFF",
    color: "#350973",
    border: "1px solid #350973",
    borderRadius: "6px",
    padding: "6px 10px",
    fontWeight: "600",
    fontSize: "14px",
  };

  return (
    <div className="flex justify-center items-center bg-[#290064] w-full rounded-[10px] relative">
      <div className="flex justify-center items-center w-full">
        <h2 className="text-white text-[20px] fonteBold">
          {dados.despesas.proximoPagamento}
        </h2>
      </div>
      <button
        data-tooltip-id="tooltip-despesas"
        data-tooltip-html={tooltipText}
        className="w-[50%] min-h-[50px] aspect-square bg-[#F4CCB6] rounded-[10px] flex items-center justify-center"
        style={{ backgroundColor: diaPag ? "#F27405" : "#ebac75ff" }}
        onClick={realizarPag}
      >
        <img className="h-[70%] min-w-[20px] aspect-square" src={despesasImg} />
      </button>

      {/* Badge vermelho ou verde */}
      {dados.dia % 30 === 0 && (
        <div className="absolute bottom-[-5px] right-[-5px] bg-[#]">
          <span className="relative flex size-3">
            <span
              className={`absolute inline-flex h-full w-full animate-ping rounded-full ${
                dados.despesas.despesasPagas
                  ? "bg-[#008000] opacity-75"
                  : "bg-[#FF0000] opacity-75"
              }`}
            ></span>
            <span
              className={`relative inline-flex size-3 rounded-full ${
                dados.despesas.despesasPagas ? "bg-[#008000]" : "bg-[#FF0000]"
              }`}
            ></span>
          </span>
        </div>
      )}

      {/* Tooltip global */}
      <Tooltip style={tooltipStyle} id="tooltip-despesas" />
    </div>
  );
}
