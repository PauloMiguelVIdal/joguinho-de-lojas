import { useContext, useEffect, useState, useRef } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import despesasImg from "../../public/outrasImagens/despesas.png";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import useSound from "use-sound";
import audioCoin from "../../public/sounds/cash-register-kaching-376867.mp3";
import { useHotkeys } from "react-hotkeys-hook";

export default function PayTexesDraft() {
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  const {
    economiaSetores,
    setEconomiaSetores,
    atualizarEcoSafely,
    atualizarEco,
  } = useContext(DadosEconomyGlobalContext);

  const tooltipStyle = {
    backgroundColor: "#FFFFFF",
    color: "#350973",
    border: "1px solid #350973",
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

  const todasLojas = ["terrenos", "lojasP", "lojasM", "lojasG"];
  const [isNKeyDown, setIsNKeyDown] = useState(false);
  const [audioPay] = useSound(audioCoin);
  
  // 🔥 Ref para controlar se o pagamento já foi feito no dia
  const pagamentoFeitoRef = useRef(false);

  // ============================================
  // CÁLCULO DE IMPOSTOS PARA DIA < 270
  // ============================================


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
    "Fábrica De Rações": "industria",
    "Fábrica De Embalagens": "industria",
    "Fábrica De Fertilizantes": "industria",
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
    "Rede De Fast-Food": "comercio",
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
    "Usina Termelétrica": "energia",
    "Reator Nuclear Convencional": "energia",
    "Usina De Fusão Nuclear": "energia",
  };

  const descobrirSetor = (nomeEdificio) => {
    return mapaEdificioParaSetor[nomeEdificio] || null;
  };

  // ============================================
  // 🔥 PAGAMENTO AUTOMÁTICO A CADA 30 DIAS
  // ============================================
  useEffect(() => {
    // Verifica se é dia 30 e se o pagamento ainda não foi feito
    if (dados.dia % 30 === 0 && dados.dia > 0) {
      const impostoMensal = economiaSetores.imposto?.impostoMensal || 0;
      const saldoAtual = economiaSetores.saldo || 0;

      console.log(`📅 [PayTexes] Dia ${dados.dia} - Verificando pagamento...`);
      console.log(`💰 [PayTexes] Saldo: R$ ${saldoAtual.toFixed(2)}`);
      console.log(`📊 [PayTexes] Imposto mensal: R$ ${impostoMensal.toFixed(2)}`);

      // Se não tem imposto a pagar, marca como pago e sai
      if (impostoMensal <= 0) {
        console.log(`✅ [PayTexes] Sem imposto a pagar. Marcando como pago.`);
        atualizarDados("despesas", {
          ...dados.despesas,
          despesasPagas: true,
          diaPagarDespesas: false,
          saldoInsuficiente: false,
          ultimoPagamento: dados.dia,
          valorPago: 0,
        });
        return;
      }

      // Verifica se tem saldo suficiente
      if (saldoAtual >= impostoMensal) {
        // ✅ TEM SALDO - PAGA O IMPOSTO
        const novoSaldo = saldoAtual - impostoMensal;
        
        console.log(`💳 [PayTexes] Pagando R$ ${impostoMensal.toFixed(2)}`);
        console.log(`💰 [PayTexes] Novo saldo: R$ ${novoSaldo.toFixed(2)}`);

        // Atualiza o saldo
        atualizarEco("saldo", novoSaldo);

        // Zera o imposto mensal
        atualizarEco("imposto", {
          ...economiaSetores.imposto,
          impostoMensal: 0,
          impostoFixoMensal: 0,
          impostoFaturamentoMensal: 0,
        });

        // Marca como pago
        atualizarDados("despesas", {
          ...dados.despesas,
          despesasPagas: true,
          diaPagarDespesas: false,
          saldoInsuficiente: false,
          ultimoPagamento: dados.dia,
          valorPago: impostoMensal,
          proximoPagamento: 30,
        });

        // Toca o som de pagamento
        audioPay();

        console.log(`✅ [PayTexes] Pagamento realizado com sucesso!`);

      } else {
        // ❌ SALDO INSUFICIENTE
        console.warn(`⚠️ [PayTexes] Saldo insuficiente!`);
        console.warn(`   Disponível: R$ ${saldoAtual.toFixed(2)}`);
        console.warn(`   Necessário: R$ ${impostoMensal.toFixed(2)}`);

        // Marca como pendente
        atualizarDados("despesas", {
          ...dados.despesas,
          despesasPagas: false,
          diaPagarDespesas: true,
          saldoInsuficiente: true,
          ultimoPagamento: dados.dia,
          valorNecessario: impostoMensal,
          saldoDisponivel: saldoAtual,
          proximoPagamento: 30,
        });
      }
    }
  }, [dados.dia]);

  // ============================================
  // RESET DO ESTADO NO PRÓXIMO MÊS
  // ============================================
  useEffect(() => {
    // Se for dia 1, reseta o estado de pagamento para o novo mês
    if (dados.dia % 30 === 1) {
      // Verifica se já não está pago
      if (!dados.despesas.despesasPagas) {
        console.log(`📅 [PayTexes] Dia ${dados.dia} - Resetando para novo mês`);
        atualizarDados("despesas", {
          ...dados.despesas,
          diaPagarDespesas: false,
          despesasPagas: false,
          saldoInsuficiente: false,
          valorPago: 0,
          valorNecessario: 0,
          proximoPagamento: 30,
        });
      }
    }
  }, [dados.dia]);

  // ============================================
  // ATUALIZA O CONTADOR PARA PRÓXIMO PAGAMENTO
  // ============================================
  useEffect(() => {
    const proximoDiaChegar = (n) => {
      return (n % 30 === 0 ? n : n + (30 - (n % 30))) - dados.dia;
    };
    const proximoDia = proximoDiaChegar(dados.dia);
    atualizarDados("despesas", {
      ...dados.despesas,
      proximoPagamento: proximoDia || 30,
    });
  }, [dados.dia]);

  // ============================================
  // FUNÇÃO MANUAL PARA PAGAR (TEcla S)
  // ============================================
  const PagarDespesas = () => {
    if (dados.despesas.despesasPagas) {
      console.log(`ℹ️ [PayTexes] Despesas já pagas este mês.`);
      return;
    }

    const impostoMensal = economiaSetores.imposto?.impostoMensal || 0;
    const saldoAtual = economiaSetores.saldo || 0;

    if (impostoMensal <= 0) {
      console.log(`✅ [PayTexes] Sem imposto a pagar.`);
      atualizarDados("despesas", {
        ...dados.despesas,
        despesasPagas: true,
        diaPagarDespesas: false,
      });
      return;
    }

    if (saldoAtual >= impostoMensal) {
      const novoSaldo = saldoAtual - impostoMensal;
      atualizarEco("saldo", novoSaldo);
      atualizarEco("imposto", {
        ...economiaSetores.imposto,
        impostoMensal: 0,
        impostoFixoMensal: 0,
        impostoFaturamentoMensal: 0,
      });
      atualizarDados("despesas", {
        ...dados.despesas,
        despesasPagas: true,
        diaPagarDespesas: false,
        saldoInsuficiente: false,
        ultimoPagamento: dados.dia,
        valorPago: impostoMensal,
      });
      audioPay();
      console.log(`✅ [PayTexes] Pagamento manual realizado!`);
    } else {
      console.warn(`⚠️ [PayTexes] Saldo insuficiente para pagamento manual!`);
      atualizarDados("despesas", {
        ...dados.despesas,
        saldoInsuficiente: true,
        valorNecessario: impostoMensal,
        saldoDisponivel: saldoAtual,
      });
    }
  };

  const realizarPag = () => {
    if (dados.despesas.despesasPagas) return;
    PagarDespesas();
  };

  // ============================================
  // HOTKEYS PARA TECLA S
  // ============================================
  useHotkeys(
    "s",
    () => {
      if (
        !dados.despesas.diaPagarDespesas ||
        dados.dia % 30 !== 0 ||
        dados.despesasPagas ||
        dados.modal?.estadoModal ||
        dados.modalAlert?.estadoModal ||
        dados.modalDespesas?.estadoModal ||
        dados.modalEconomiaGlobal?.estadoModal ||
        isNKeyDown
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

  const tooltipText = `
<div>
  <p><strong>Status do Pagamento</strong></p>
  <p>Saldo: R$ ${(economiaSetores.saldo || 0).toFixed(2)}</p>
  <p>Imposto: R$ ${(economiaSetores.imposto?.impostoMensal || 0).toFixed(2)}</p>
  <p style="color: ${dados.despesas.despesasPagas ? '#008000' : dados.despesas.saldoInsuficiente ? '#FF0000' : '#FFA500'}">
    ${dados.despesas.despesasPagas ? '✅ Pago' : dados.despesas.saldoInsuficiente ? '❌ Saldo Insuficiente' : '⏳ Aguardando'}
  </p>
  ${dados.despesas.saldoInsuficiente ? `<p style="color:#FF0000">Faltam R$ ${(dados.despesas.valorNecessario || 0).toFixed(2)}</p>` : ''}
</div>
`;

  const diaPag = dados.dia % 30 === 0 ? true : false;

  return (
    <div className="flex justify-center items-center bg-[#290064] w-[100px] rounded-[10px] relative">
      <div className="flex justify-center items-center w-[100px]">
        <h2 className="text-white text-[20px] fonteBold">
          {dados.despesas.proximoPagamento || 30}
        </h2>
      </div>
      <button
        data-tooltip-id="tooltip-despesas"
        data-tooltip-html={tooltipText}
        className="w-[50%] min-h-[50px] aspect-square bg-[#F4CCB6] rounded-[10px] flex items-center justify-center hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]"
        style={{ 
          backgroundColor: dados.despesas.despesasPagas 
            ? "#008000" 
            : dados.despesas.saldoInsuficiente 
              ? "#FF0000" 
              : diaPag 
                ? "#F27405" 
                : "#ebac75ff" 
        }}
        onClick={realizarPag}
        disabled={dados.despesas.despesasPagas}
      >
        <img className="h-[70%] min-w-[20px] aspect-square" src={despesasImg} />
      </button>

      {/* Badge de status */}
      {dados.dia % 30 === 0 && (
        <div className="absolute bottom-[-5px] right-[-5px]">
          <span className="relative flex size-3">
            <span
              className={`absolute inline-flex h-full w-full animate-ping rounded-full ${
                dados.despesas.despesasPagas
                  ? "bg-[#008000] opacity-75"
                  : dados.despesas.saldoInsuficiente
                  ? "bg-[#FF0000] opacity-75"
                  : "bg-[#FFA500] opacity-75"
              }`}
            ></span>
            <span
              className={`relative inline-flex size-3 rounded-full ${
                dados.despesas.despesasPagas
                  ? "bg-[#008000]"
                  : dados.despesas.saldoInsuficiente
                  ? "bg-[#FF0000]"
                  : "bg-[#FFA500]"
              }`}
            ></span>
          </span>
        </div>
      )}

      <Tooltip style={tooltipStyle} id="tooltip-despesas" />
    </div>
  );
}