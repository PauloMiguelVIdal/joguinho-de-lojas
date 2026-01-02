import React, { useState, useEffect, useContext, useRef } from "react";
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Gift,
  Calendar,
  Wallet,
  X, AlertTriangle
} from "lucide-react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";

const BankInterface = () => {
  const [selectedInstallments, setSelectedInstallments] = useState(3);
  const [currentTab, setCurrentTab] = useState("overview");
  const [loanAmount, setLoanAmount] = useState(0);
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  const { economiaSetores, atualizarEco, atualizarEcoCallback } = useContext(
    DadosEconomyGlobalContext
  );
  const constratoSelecionado = economiaSetores.idContrato;
  const idContratoAtivo = economiaSetores.idContrato || 0;
  const contrato1 = economiaSetores.contratosBancos[idContratoAtivo];
  const diaAtualJogo = dados.dia || 1000;
  const activeLoans = economiaSetores.activeLoans || {};
  const activeLoan = activeLoans[idContratoAtivo] || null;
  const limiteEmprestimoAtual = contrato1.limiteEmprestimo;
  const availableLoans = economiaSetores.availableLoans || {};
  const availableLoan =
    availableLoans[idContratoAtivo] ?? limiteEmprestimoAtual;
    const patrimonio = economiaSetores.patrimonio;
  const [investmentType, setInvestmentType] = useState("pos");
  const [investmentAmount, setInvestmentAmount] = useState(0);
  const [investmentDays, setInvestmentDays] = useState(90);
  const activeInvestments = economiaSetores.activeInvestments || [];

  const saldoBancario = economiaSetores.saldo;
    const [showModal,setShowModal] = useState(false)
  const setVision = (newVision) => {
    atualizarDados("vision", {
      ...dados.vision,
      visionAtual: newVision,
    });
  };

  if (!contrato1) {
    return (
      <div className="h-full flex items-center justify-center">
        <button onClick={() => setVision("bank")}>Ir para Bancos</button>
      </div>
    );
  }

  if (!activeLoan) {
  } //atualizar o limite

  const config = {
    cashback: {
      nenhum: { valor: 0 },
      todos: { valor: 2 },
      especifico: { valor: 5 },
    },
    juros: { baixo: 2, medio: 3, alto: 4 },
    emprestimos: { baixo: { mult: 1 }, medio: { mult: 2 }, alto: { mult: 3 } },
    investimentos: {
      pos: { baixa: 1, media: 3, alta: 5 },
      pre: {
        baixa: [
          { prazo: 90, valor: 0.5 },
          { prazo: 180, valor: 0.7 },
          { prazo: 360, valor: 1.0 },
        ],
        media: [
          { prazo: 90, valor: 0.7 },
          { prazo: 180, valor: 1.0 },
          { prazo: 360, valor: 1.5 },
        ],
        alta: [
          { prazo: 90, valor: 1.5 },
          { prazo: 180, valor: 2.0 },
          { prazo: 360, valor: 2.5 },
        ],
      },
    },
  };

  const cashbackData = {
    currentMonth: 145.67,
    accumulated: 1234.89,
    daysUntilWithdrawal: 12,
    tipo: contrato1.cashback?.tipo || "nenhum",
    percentual:
      config.cashback[contrato1.cashback?.tipo || "nenhum"]?.valor || 0,
    setor: contrato1.cashback?.setor || "-",
  };


  
  // useEffect(() => {
  //   if (!activeLoan) {
  //     lastProcessedPaymentRef.current = 0;
  //     return;
  //   }

  //   const diasDecorridos = diaAtualJogo - activeLoan.diaInicio;
  //   const parcelasPagas = Math.floor(diasDecorridos / 30);

  //   // evita reprocessar parcelas antigas
  //   if (parcelasPagas <= lastProcessedPaymentRef.current || parcelasPagas > activeLoan.parcelas) {
  //     return;
  //   }

  //   const parcelasADescontar = parcelasPagas - lastProcessedPaymentRef.current;
  //   const valorTotalDescontar = parcelasADescontar * activeLoan.valorParcela;

  //   const saldoAtual = economiaSetores.saldo ?? 0;

  //   console.group("=== PROCESSANDO PAGAMENTO AUTOMÁTICO ===");
  //   console.log("Dia atual:", diaAtualJogo);
  //   console.log("Parcelas já pagas:", lastProcessedPaymentRef.current);
  //   console.log("Parcelas novas:", parcelasADescontar);
  //   console.log("Saldo antes:", saldoAtual);
  //   console.log("Valor a descontar:", valorTotalDescontar);

  //   // Se o jogador tiver saldo suficiente
  //   if (saldoAtual >= valorTotalDescontar) {
  //     const novoSaldo = saldoAtual - valorTotalDescontar;

  //     // Atualiza primeiro o marcador interno
  //     lastProcessedPaymentRef.current = parcelasPagas;

  //     // Atualiza saldo global com segurança
  //     atualizarEco('saldo', novoSaldo);

  //     console.log("Saldo atualizado para:", novoSaldo);

  //     const valorPago = parcelasPagas * activeLoan.valorParcela;
  //     const novoSaldoDevedor = Math.max(0, activeLoan.totalComJuros - valorPago);

  //     // Atualiza o estado do empréstimo
  //     if (parcelasPagas >= activeLoan.parcelas) {
  //       console.log("✅ Empréstimo totalmente quitado!");
  //       setActiveLoan(null);
  //       setAvailableLoan(prev => prev + activeLoan.valorOriginal);
  //       lastProcessedPaymentRef.current = 0;
  //     } else {
  //       setActiveLoan(prev => ({
  //         ...prev,
  //         parcelaAtual: parcelasPagas + 1,
  //         saldoDevedor: novoSaldoDevedor,
  //         proximoVencimento: activeLoan.diaInicio + (30 * (parcelasPagas + 1))
  //       }));
  //     }
  //   } else {
  //     console.warn("⚠️ SALDO INSUFICIENTE PARA PAGAR PARCELA!");
  //     console.warn("Saldo:", saldoAtual, " | Necessário:", valorTotalDescontar);
  //   }

  //   console.groupEnd();
  // }, [dados.dia, activeLoan, diaAtualJogo]);
  // if(diaAtualJogo===vencimento){
  //   economiaSetores.despesasEmprestimo
  // }





  const [lastProcessedPayment, setLastProcessedPayment] = useState(0);

  const lastProcessedPaymentRef = useRef(0);


 const vencimento =
    activeLoan?.proximoVencimento ??
    (activeLoan?.diaInicio
      ? activeLoan.diaInicio + 30 * (activeLoan.parcelaAtual ?? 1)
      : null);

  useEffect(() => {
    if (!activeLoans) return;

    Object.values(activeLoans).forEach((loan) => {
  if(diaAtualJogo !==loan.proximoVencimento){
    
  }
      if (diaAtualJogo === loan.proximoVencimento) {
        atualizarEco("despesasEmprestimo", {
          ...economiaSetores.despesas,
          diaPagarDespesas: true,
          despesasPagas: false,
          proximoPagamento: "30",
        });
      }
    });
  }, [diaAtualJogo]);

  // Atualização automática do limite de empréstimo a cada 120 dias
  useEffect(() => {
    if (!contrato1) return;

    // Busca o último dia de atualização do limite ou usa o dia de início do contrato
    const ultimaAtualizacaoLimite = economiaSetores.ultimaAtualizacaoLimite || {};
    const ultimaAtualizacao = ultimaAtualizacaoLimite[idContratoAtivo] || contrato1.dataInicio || 0;

    // Verifica se passou 120 dias desde a última atualização
    const diasDesdeUltimaAtualizacao = diaAtualJogo - ultimaAtualizacao;
    
    if (diasDesdeUltimaAtualizacao >= 120) {
      const patrimonioAtual = economiaSetores.patrimonio || 0;
      const { novoLimite } = calcularProximoLimite(patrimonioAtual);
      
      // Aplica o multiplicador do config
      const multiplicadorConfig = config.emprestimos[contrato1.emprestimo]?.mult || 1;
      const limiteAtualizado = novoLimite * multiplicadorConfig;

      // Atualiza o limite do contrato
      const contratosAtualizados = Array.isArray(economiaSetores.contratosBancos) 
        ? [...economiaSetores.contratosBancos] 
        : [];
      
      if (contratosAtualizados[idContratoAtivo]) {
        contratosAtualizados[idContratoAtivo] = {
          ...contratosAtualizados[idContratoAtivo],
          limiteEmprestimo: limiteAtualizado
        };

        atualizarEco('contratosBancos', contratosAtualizados);

        // Atualiza o limite disponível (se não houver empréstimo ativo, o limite disponível é o limite total)
        if (!activeLoan) {
          atualizarEco('availableLoans', {
            ...availableLoans,
            [idContratoAtivo]: limiteAtualizado
          });
        }

        // Registra o dia da atualização
        atualizarEco('ultimaAtualizacaoLimite', {
          ...ultimaAtualizacaoLimite,
          [idContratoAtivo]: diaAtualJogo
        });
      }
    }
  }, [diaAtualJogo, patrimonio, idContratoAtivo]);


  const ModalEncerrarContrato = ({ isOpen, onClose, onConfirm, contrato, activeLoan, diaAtual }) => {
  if (!isOpen || !contrato) return null;

  const validade = contrato.dataFim ?? 0;
  const passouValidade = diaAtual > validade;
  const possuiEmprestimo = !!activeLoan;

  const podeEncerrar = passouValidade && !possuiEmprestimo;




  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Encerrar Contrato</h3>
                <p className="text-sm opacity-90">{contrato.bancoNome}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6 space-y-4">
          {/* Informações do contrato */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Cartão:</span>
              <span className="font-semibold text-gray-800">{contrato.cartaoNome}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Validade:</span>
              <span className={`font-semibold ${passouValidade ? 'text-red-600' : 'text-green-600'}`}>
                {passouValidade ? `Vencido (dia ${validade})` : `Dia ${validade}`}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Empréstimo ativo:</span>
              <span className={`font-semibold ${possuiEmprestimo ? 'text-orange-600' : 'text-green-600'}`}>
                {possuiEmprestimo ? 'Sim' : 'Não'}
              </span>
            </div>
          </div>

          {/* Validações */}
          {!podeEncerrar && (
            <div className="space-y-3">
              {!passouValidade && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex gap-3">
                  <AlertTriangle className="text-yellow-600 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm font-semibold text-yellow-800">Contrato ainda não venceu</p>
                    <p className="text-xs text-yellow-700 mt-1">
                      Aguarde até o dia {validade} para encerrar o contrato.
                    </p>
                  </div>
                </div>
              )}

              {possuiEmprestimo && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-3">
                  <AlertTriangle className="text-red-600 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm font-semibold text-red-800">Empréstimo ativo</p>
                    <p className="text-xs text-red-700 mt-1">
                      Quite o empréstimo antes de encerrar o contrato.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {podeEncerrar && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800 font-semibold mb-2">
                ⚠️ Atenção: Esta ação não pode ser desfeita!
              </p>
              <p className="text-xs text-red-700">
                Ao encerrar este contrato, você perderá:
              </p>
              <ul className="text-xs text-red-700 mt-2 space-y-1 ml-4 list-disc">
                <li>Acesso aos serviços bancários</li>
                <li>Limite de empréstimo disponível</li>
                <li>Investimentos ativos neste banco</li>
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-semibold transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={!podeEncerrar}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              podeEncerrar
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {podeEncerrar ? 'Encerrar Contrato' : 'Não Disponível'}
          </button>
        </div>
      </div>
    </div>
  );
};

const BotaoEncerrarContrato = ({ contrato, activeLoan, diaAtualJogo }) => {
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);
  const { atualizarDados, dados } = useContext(CentraldeDadosContext);
  const [showModal, setShowModal] = useState(false);

  const idContratoAtivo = economiaSetores.idContrato || 0;


  };



  const calcularProximoLimite = (patrimonioAtual) => {
    if (patrimonioAtual >= 10000000)
      return { novoLimite: 500000, patrimonioNecessario: 10000000 };
    if (patrimonioAtual >= 5000000)
      return { novoLimite: 250000, patrimonioNecessario: 10000000 };
    if (patrimonioAtual >= 1000000)
      return { novoLimite: 100000, patrimonioNecessario: 5000000 };
    if (patrimonioAtual >= 500000)
      return { novoLimite: 50000, patrimonioNecessario: 1000000 };
    if (patrimonioAtual >= 100000)
      return { novoLimite: 25000, patrimonioNecessario: 500000 };
    return { novoLimite: 10000, patrimonioNecessario: 100000 };
  };

  const proximoAumentoLimite = calcularProximoLimite(patrimonio);


    const handleEncerrarContrato = () => {
    // CORREÇÃO: Manter como ARRAY
    const contratosAtuais = Array.isArray(economiaSetores.contratosBancos) 
      ? [...economiaSetores.contratosBancos] 
      : [];

    // Remove o contrato do índice específico (transforma em null)
    contratosAtuais[idContratoAtivo] = null;

    // Atualiza contratos
    atualizarEco('contratosBancos', contratosAtuais);

    // Remove empréstimos deste contrato
    if (economiaSetores.activeLoans) {
      const novosLoans = { ...economiaSetores.activeLoans };
      delete novosLoans[idContratoAtivo];
      atualizarEco('activeLoans', novosLoans);
    }

    // Remove limites disponíveis deste contrato
    if (economiaSetores.availableLoans) {
      const novosLimites = { ...economiaSetores.availableLoans };
      delete novosLimites[idContratoAtivo];
      atualizarEco('availableLoans', novosLimites);
    }

    // Seleciona outro contrato ativo (primeiro disponível)
    const novoAtivo = contratosAtuais.findIndex(c => c !== null);
    atualizarEco('idContrato', novoAtivo !== -1 ? novoAtivo : 0);

    setShowModal(false);
    setVision('dashboard');
  };

  // Paga a parcela atual quando o jogador aperta o botão (somente se estiver vencida)
  const handlePayInstallment = () => {
    if (!activeLoan) return;

    const saldoAtual = economiaSetores.saldo ?? 0;
    const valorParcela = activeLoan.valorParcela ?? 0;
    const vencimento =
      activeLoan.proximoVencimento ??
      activeLoan.diaInicio + 30 * activeLoan.parcelaAtual;

    if (diaAtualJogo < vencimento || saldoAtual < valorParcela) return;

    const novoSaldo = saldoAtual - valorParcela;
    atualizarEco("saldo", novoSaldo);

    const parcelaAntes = activeLoan.parcelaAtual || 1;
    const novoSaldoDevedor = Math.max(
      0,
      (activeLoan.saldoDevedor ?? activeLoan.totalComJuros) - valorParcela
    );

    if (parcelaAntes >= activeLoan.parcelas) {
      // Quita empréstimo
      const novosLoans = { ...activeLoans };
      delete novosLoans[idContratoAtivo];

      atualizarEco("activeLoans", novosLoans);

      atualizarEco("availableLoans", {
        ...availableLoans,
        [idContratoAtivo]: availableLoan + activeLoan.valorOriginal,
      });
    } else {
      // Atualiza somente esse empréstimo
      atualizarEco("activeLoans", {
        ...activeLoans,
        [idContratoAtivo]: {
          ...activeLoan,
          parcelaAtual: parcelaAntes + 1,
          saldoDevedor: novoSaldoDevedor,
          proximoVencimento: vencimento + 30,
        },
      });
    }
  };

  useEffect(() => {
    if (activeInvestments.length === 0) return;
    const investimentosAtualizados = activeInvestments.map((inv) => {
      const diasDecorridos = diaAtualJogo - inv.diaInicio;
      const periodosCompletos = Math.floor(diasDecorridos / 30);
      if (periodosCompletos > (inv.periodosProcessados || 0)) {
        return { ...inv, periodosProcessados: periodosCompletos };
      }
      return inv;
    });

    const investimentosVencidos = investimentosAtualizados.filter(
      (inv) => inv.type === "pre" && diaAtualJogo >= inv.diaVencimento
    );

    // if (investimentosVencidos.length > 0) {
    //   setActiveInvestments(investimentosAtualizados.filter(inv => !investimentosVencidos.includes(inv)));
    // } else {
    //   setActiveInvestments(investimentosAtualizados);
    // }
  }, [dados.dia]);

  const calcularMultiplicadorJuros = (nivelJuros, parcelas) => {
    const multiplicadores = {
      baixo: { 3: 1.5, 6: 1.2, 12: 1.0 },
      medio: { 3: 1.7, 6: 1.5, 12: 1.2 },
      alto: { 3: 2.0, 6: 1.7, 12: 1.5 },
    };
    return multiplicadores[nivelJuros]?.[parcelas] || 1.0;
  };

  const calcularJurosTotal = (valor, nivelEmprestimo, nivelJuros, parcelas) => {
    const taxaBase = config.juros[nivelEmprestimo] / 100;
    const multiplicador = calcularMultiplicadorJuros(nivelJuros, parcelas);
    const taxaMensal = taxaBase * multiplicador;
    const montante = valor * Math.pow(1 + taxaMensal, parcelas);
    const jurosTotal = montante - valor;
    return { jurosTotal, taxaMensal, montante };
  };

  const dadosSimulacao = calcularJurosTotal(
    loanAmount,
    contrato1.emprestimo,
    contrato1.juros,
    selectedInstallments
  );
  const valorParcelaSimulacao =
    loanAmount > 0 ? dadosSimulacao.montante / selectedInstallments : 0;

  const handleRequestLoan = () => {
    if (activeLoan || loanAmount <= 0 || loanAmount > availableLoan) return;

    const { montante, jurosTotal, taxaMensal } = calcularJurosTotal(
      loanAmount,
      contrato1.emprestimo,
      contrato1.juros,
      selectedInstallments
    );

    const novoEmprestimo = {
      idBanco: idContratoAtivo,
      valorOriginal: loanAmount,
      totalComJuros: montante,
      jurosTotal,
      parcelas: selectedInstallments,
      valorParcela: montante / selectedInstallments,
      parcelaAtual: 1,
      saldoDevedor: montante,
      taxaMensal,
      diaInicio: diaAtualJogo,
      proximoVencimento: diaAtualJogo + 30,
      dataFinal: diaAtualJogo + 30 * selectedInstallments,
    };

    atualizarEco("saldo", saldoBancario + loanAmount);

    // Adiciona o empréstimo ao banco específico
    atualizarEco("activeLoans", {
      ...activeLoans,
      [idContratoAtivo]: novoEmprestimo,
    });

    // Atualiza o limite disponível apenas para esse banco
    atualizarEco("availableLoans", {
      ...availableLoans,
      [idContratoAtivo]: availableLoan - loanAmount,
    });

    setLoanAmount(0);
  };

  const handlePayEarly = () => {
    if (!activeLoan) return;

    atualizarEco("saldo", saldoBancario - activeLoan.saldoDevedor);

    const novosLoans = { ...activeLoans };
    delete novosLoans[idContratoAtivo];

    atualizarEco("activeLoans", novosLoans);
    atualizarEco("availableLoans", {
      ...availableLoans,
      [idContratoAtivo]: availableLoan + activeLoan.valorOriginal,
    });
  };

  const opcoesParcelamento = [3, 6, 12].map((parcelas) => {
    const { jurosTotal, taxaMensal } = calcularJurosTotal(
      loanAmount || 1000,
      contrato1.emprestimo,
      contrato1.juros,
      parcelas
    );
    return {
      parcelas,
      taxaMensal: (taxaMensal * 100).toFixed(2),
      jurosTotal: jurosTotal.toFixed(2),
    };
  });

  const getPosTaxaMensal = () => {
    const nivelInvestimento = contrato1.investimento;
    return (config.investimentos.pos[nivelInvestimento] || 1) / 100;
  };

  const getPreFixedReturn = (amount, days) => {
    const nivelInvestimento = contrato1.investimento;
    const tabelaTaxas = config.investimentos.pre[nivelInvestimento];
    if (!tabelaTaxas) return amount * 0.015;
    const opcao = tabelaTaxas.find((t) => t.prazo === days);
    const taxaMensal = opcao ? opcao.valor / 100 : 0.015;
    const meses = days / 30;
    const taxaTotal = taxaMensal * meses;
    return amount * taxaTotal;
  };

  const calcularDadosInvestimentos = () => {
    let totalInvestidoPos = 0,
      totalInvestidoPre = 0,
      valorAtualPos = 0,
      valorAtualPre = 0;
    activeInvestments.forEach((inv) => {
      const diasDecorridos = diaAtualJogo - inv.diaInicio;
      const mesesCompletos = Math.floor(diasDecorridos / 30);
      if (inv.type === "pos") {
        totalInvestidoPos += inv.amount;
        const juros = inv.amount * getPosTaxaMensal() * mesesCompletos;
        valorAtualPos += inv.amount + juros;
      } else {
        totalInvestidoPre += inv.amount;
        const isMatured = diaAtualJogo >= inv.diaVencimento;
        if (isMatured) {
          const juros = getPreFixedReturn(inv.amount, inv.days);
          valorAtualPre += inv.amount + juros;
        } else {
          valorAtualPre += inv.amount;
        }
      }
    });
    return {
      totalInvestidoPos,
      totalInvestidoPre,
      valorAtualPos,
      valorAtualPre,
      totalInvestido: totalInvestidoPos + totalInvestidoPre,
      valorTotal: valorAtualPos + valorAtualPre,
      rendimentoPos: valorAtualPos - totalInvestidoPos,
      rendimentoPre: valorAtualPre - totalInvestidoPre,
      rendimentoTotal:
        valorAtualPos + valorAtualPre - (totalInvestidoPos + totalInvestidoPre),
    };
  };

  const investmentData = calcularDadosInvestimentos();

  const obterTaxaInvestimento = (contrato, tipo = "pos") => {
    if (!contrato) return tipo === "pos" ? 1 : [];
    return tipo === "pos"
      ? config.investimentos.pos[contrato.investimento] || 1
      : config.investimentos.pre[contrato.investimento] || [];
  };

  const handleInvest = () => {
    if (investmentAmount <= 0 || investmentAmount > saldoBancario) return;

    const newInvestment = {
      id: Date.now(),
      type: investmentType,
      amount: investmentAmount,
      days: investmentType === "pre" ? investmentDays : null,
      diaInicio: diaAtualJogo,
      diaVencimento:
        investmentType === "pre" ? diaAtualJogo + investmentDays : null,
      periodosProcessados: 0,
    };

    atualizarEco("saldo", saldoBancario - investmentAmount);
    atualizarEco("activeInvestments", [...activeInvestments, newInvestment]);
    setInvestmentAmount(0);
  };

  const handleWithdraw = (investmentId) => {
    const investment = activeInvestments.find((inv) => inv.id === investmentId);
    if (!investment) return;
    let valorResgate = 0;
    const diasDecorridos = diaAtualJogo - investment.diaInicio;
    const mesesCompletos = Math.floor(diasDecorridos / 30);

    if (investment.type === "pos") {
      const taxaMensal = getPosTaxaMensal();
      const jurosGanhos = investment.amount * taxaMensal * mesesCompletos;
      valorResgate = investment.amount + jurosGanhos;
    } else {
      const isMatured = diaAtualJogo >= investment.diaVencimento;
      if (isMatured) {
        const jurosGanhos = getPreFixedReturn(
          investment.amount,
          investment.days
        );
        valorResgate = investment.amount + jurosGanhos;
      } else {
        valorResgate = investment.amount * 0.9;
      }
    }

    // Adicionar valor resgatado ao saldo bancário
    atualizarEco("saldo", saldoBancario + valorResgate);
    atualizarEco(
      "activeInvestments",
      activeInvestments.filter((inv) => inv.id !== investmentId)
    );
  };

  const handleAddFunds = (investmentId) => {
    const investment = activeInvestments.find((inv) => inv.id === investmentId);
    if (!investment || investment.type !== "pos") return;

    const additionalAmount = parseFloat(
      prompt("Quanto deseja adicionar?", "0")
    );
    if (
      isNaN(additionalAmount) ||
      additionalAmount <= 0 ||
      additionalAmount > saldoBancario
    )
      return;

    atualizarEco("saldo", saldoBancario - additionalAmount);
    atualizarEco(
      "activeInvestments",
      activeInvestments.map((inv) =>
        inv.id === investmentId
          ? { ...inv, amount: inv.amount + additionalAmount }
          : inv
      )
    );
  };

  const contratoParaCartao = (contrato, dados) => ({
    id: contrato.cartaoId,
    banco: contrato.bancoNome,
    design: contrato.design,
    cor1: contrato.cor1,
    cor2: contrato.cor2,
    cor3: contrato.cor3,
    cor4: contrato.cor4,
    numeroCard: contrato.numeroCard,
    cartaoNome: contrato.cartaoNome,
    validade: contrato.dataFim ? `até ${contrato.dataFim}` : "-",
    empresa: dados?.inicioGame?.nomeEmpresa ?? "Minha Empresa",
  });

  const cardData = {
    number: contrato1.numeroCard,
    holder: dados.inicioGame.nomeEmpresa,
    expiry: contrato1.dataFim,
    limit: 50000,
    available: 12350,
    used: 17050,
    faturaAtual: 2450.75,
  };


  const TriangularFusionCard = ({ cartao }) => (
    <div
      className="w-[350px] h-[200px] rounded-3xl text-white relative overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 cursor-pointer hover:animate-rainbow-shift"
      style={{
        background: `conic-gradient(from 0deg, ${cartao.cor1}, ${cartao.cor2}, ${cartao.cor3}, ${cartao.cor4}, ${cartao.cor1})`,
      }}
      // onClick={() => setSelectedCard(cartao.id)}
    >
      {/* Triângulos geométricos animados apenas no hover */}
      <div className="absolute inset-0">
        <div
          className="absolute top-4 left-4 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[35px] border-transparent hover:animate-geometric-pulse"
          style={{ borderBottomColor: cartao.cor4, opacity: 0.3 }}
        ></div>
        <div
          className="absolute bottom-4 right-4 w-0 h-0 border-l-[25px] border-r-[25px] border-t-[43px] border-transparent rotate-180 hover:animate-geometric-pulse"
          style={{ borderTopColor: cartao.cor1, opacity: 0.4 }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rotate-45 border-4 hover:animate-geometric-pulse"
          style={{ borderColor: cartao.cor4, opacity: 0.2 }}
        ></div>
      </div>

      <div className="p-6 relative z-10">
        <div
          className="absolute top-4 right-4 px-3 py-2 rounded-full text-xs font-black"
          style={{
            backgroundColor: "rgba(255,255,255,0.9)",
            color: cartao.cor1,
          }}
        >
          {cartao.banco}
        </div>

        <div className="w-12 h-8 bg-gradient-to-br from-white to-gray-200 rounded-lg mt-4 mb-6 relative shadow-lg hover:animate-geometric-pulse">
          <div className="absolute inset-1 bg-gradient-to-br from-yellow-400 to-orange-500 rounded opacity-80"></div>
          <div className="absolute inset-2 bg-gray-800 rounded"></div>
        </div>

        <div className="text-xl font-mono tracking-widest mb-6 text-shadow-lg">
          {cartao.numeroCard}
        </div>

        <div className="flex justify-between items-end">
          <div>
            <div className="text-xs opacity-90 mb-1">EMPRESA</div>
            <div className="text-sm font-bold">
              {dados.inicioGame.nomeEmpresa}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs opacity-75 mb-1">VÁLIDO</div>
            <div className="text-sm font-medium">{cartao.validade}</div>
          </div>
        </div>
      </div>
      {/* 
      {selectedCard === cartao.id && (
        <div className="absolute inset-0 border-4 border-white rounded-3xl animate-pulse"></div>
      )} */}

      <style>{`
      @keyframes rainbow-shift {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
      }
      .animate-rainbow-shift {
        animation: rainbow-shift 2s infinite;
      }

      @keyframes geometric-pulse {
        0%, 100% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.1) rotate(5deg); }
      }
      .animate-geometric-pulse {
        animation: geometric-pulse 1.5s ease-in-out infinite;
      }
    `}</style>
    </div>
  );

  const CardClassico = ({ cartao }) => (
    <div
      className="w-[350px] h-[200px] rounded-3xl p-6 text-white relative overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer hover:animate-rainbow-shift"
      style={{
        background: `linear-gradient(135deg, ${cartao.cor1} 0%, ${cartao.cor2} 50%, ${cartao.cor3} 100%)`,
      }}
    >
      {/* Formas geométricas animadas apenas no hover */}
      <div className="absolute inset-0">
        <div
          className="absolute -top-10 -right-10 w-32 h-32 rotate-45 hover:animate-geometric-pulse"
          style={{ backgroundColor: cartao.cor4, opacity: 0.1 }}
        ></div>
        <div
          className="absolute top-16 -left-8 w-20 h-20 rounded-full hover:animate-geometric-pulse"
          style={{ backgroundColor: cartao.cor3, opacity: 0.15 }}
        ></div>
      </div>

      {/* Logo do banco */}
      <div
        className="absolute top-4 right-4 px-3 py-1 rounded-lg text-xs font-bold"
        style={{
          backgroundColor: cartao.cor4,
          color: cartao.cor1,
          opacity: 0.9,
        }}
      >
        {cartao.banco}
      </div>

      {/* Chip */}
      <div className="w-12 h-8 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg mt-4 mb-6 relative shadow-lg">
        <div className="absolute inset-2 bg-black bg-opacity-20 rounded"></div>
      </div>

      {/* Número do cartão */}
      <div className="text-xl font-mono tracking-widest mb-6">
        {cartao.numeroCard}
      </div>

      {/* Info */}
      <div className="flex justify-between items-end">
        <div>
          <div className="text-xs opacity-75 mb-1">EMPRESA</div>
          <div className="text-sm font-medium">
            {dados.inicioGame.nomeEmpresa}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs opacity-75 mb-1">VÁLIDO</div>
          <div className="text-sm font-medium">{cartao.validade}</div>
        </div>
      </div>

      <style>{`
      @keyframes rainbow-shift {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
      }
      .animate-rainbow-shift { animation: rainbow-shift 2s infinite; }

      @keyframes geometric-pulse {
        0%, 100% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.1) rotate(5deg); }
      }
      .hover\\:animate-geometric-pulse:hover { animation: geometric-pulse 1.5s ease-in-out infinite; }
    `}</style>
    </div>
  );

  const CardModerno = ({ cartao }) => (
    <div
      className="w-[350px] h-[200px] rounded-xl text-white relative overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer hover:animate-rainbow-shift"
      style={{
        background: `radial-gradient(circle at top right, ${cartao.cor3} 0%, ${cartao.cor2} 50%, ${cartao.cor1} 100%)`,
      }}
    >
      {/* Hexágonos animados apenas no hover */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute border opacity-20 hover:animate-geometric-pulse"
            style={{
              borderColor: cartao.cor4,
              width: "30px",
              height: "30px",
              clipPath:
                "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
              left: `${20 + i * 15}%`,
              top: `${10 + (i % 2) * 20}%`,
              transform: `rotate(${i * 30}deg)`,
            }}
          ></div>
        ))}
      </div>

      <div className="p-6 relative z-10">
        {/* Logo com efeito glass */}
        <div
          className="absolute top-4 right-4 px-3 py-2 rounded-lg text-xs font-bold backdrop-blur-sm"
          style={{
            backgroundColor: `${cartao.cor4}20`,
            border: `1px solid ${cartao.cor4}40`,
            color: cartao.cor4,
          }}
        >
          {cartao.banco}
        </div>

        {/* Chip com borda */}
        <div
          className="w-12 h-9 rounded-lg mt-4 mb-6 relative border-2"
          style={{
            backgroundColor: cartao.cor3,
            borderColor: cartao.cor4,
          }}
        >
          <div
            className="absolute inset-2 rounded"
            style={{ backgroundColor: cartao.cor4, opacity: 0.8 }}
          ></div>
        </div>

        {/* Número estilizado */}
        <div
          className="text-xl font-semibold tracking-wide mb-6"
          style={{ textShadow: `2px 2px 4px ${cartao.cor1}` }}
        >
          {cartao.numeroCard}
        </div>

        {/* Footer com divisor */}
        <div
          className="border-t pt-3"
          style={{ borderColor: cartao.cor4, opacity: 0.3 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs opacity-70">EMPRESA</div>
              <div className="text-sm font-medium">
                {dados.inicioGame.nomeEmpresa}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs opacity-75 mb-1">VÁLIDO</div>
              <div className="text-sm font-medium">{cartao.validade}</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
      @keyframes rainbow-shift {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
      }
      .animate-rainbow-shift { animation: rainbow-shift 2s infinite; }

      @keyframes geometric-pulse {
        0%, 100% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.05) rotate(3deg); }
      }
      .hover\\:animate-geometric-pulse:hover { animation: geometric-pulse 1.5s ease-in-out infinite; }
    `}</style>
    </div>
  );

  const WavePatternsCard = ({ cartao }) => (
    <div
      className="w-[350px] h-[200px] rounded-3xl text-white relative overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 cursor-pointer hover:animate-rainbow-shift"
      style={{
        background: `linear-gradient(135deg, ${cartao.cor1} 0%, ${cartao.cor2} 33%, ${cartao.cor3} 66%, ${cartao.cor4} 100%)`,
      }}
      // onClick={() => setSelectedCard(cartao.id)}
    >
      {/* Pattern de ondas geométricas animadas apenas no hover */}
      <div className="absolute inset-0 hover:animate-geometric-pulse">
        <svg className="w-full h-full opacity-20" viewBox="0 0 350 200">
          <path
            d="M0,100 Q87.5,60 175,100 T350,100 L350,200 L0,200 Z"
            fill={cartao.cor4}
            opacity="0.3"
          />
          <path
            d="M0,120 Q87.5,80 175,120 T350,120 L350,200 L0,200 Z"
            fill={cartao.cor3}
            opacity="0.2"
          />
          <path
            d="M0,140 Q87.5,100 175,140 T350,140 L350,200 L0,200 Z"
            fill={cartao.cor2}
            opacity="0.1"
          />
        </svg>

        <div
          className="absolute top-6 right-6 w-20 h-20 rounded-full border-4 opacity-30 hover:animate-geometric-pulse"
          style={{ borderColor: cartao.cor4 }}
        ></div>
        <div
          className="absolute bottom-8 left-8 w-12 h-12 opacity-25 hover:animate-geometric-pulse"
          style={{
            backgroundColor: cartao.cor4,
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          }}
        ></div>
      </div>

      <div className="p-6 relative z-10">
        <div
          className="absolute top-4 right-4 px-3 py-2 rounded-full text-xs font-black"
          style={{
            backgroundColor: "rgba(255,255,255,0.9)",
            color: cartao.cor1,
          }}
        >
          {cartao.banco}
        </div>

        <div className="w-12 h-8 bg-gradient-to-br from-white to-gray-200 rounded-lg mt-4 mb-6 relative shadow-lg hover:animate-geometric-pulse">
          <div className="absolute inset-1 bg-gradient-to-br from-yellow-400 to-orange-500 rounded opacity-80"></div>
          <div className="absolute inset-2 bg-gray-800 rounded"></div>
        </div>

        <div className="text-xl font-mono tracking-widest mb-6 text-shadow-lg">
          {cartao.numeroCard}
        </div>

        <div className="flex justify-between items-end">
          <div>
            <div className="text-xs opacity-90 mb-1">EMPRESA</div>
            <div className="text-sm font-bold">
              {dados.inicioGame.nomeEmpresa}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs opacity-75 mb-1">VÁLIDO</div>
            <div className="text-sm font-medium">{cartao.validade}</div>
          </div>
        </div>
      </div>
      {/* 
      {selectedCard === cartao.id && (
        <div className="absolute inset-0 border-4 border-white rounded-3xl animate-pulse"></div>
      )} */}

      <style>{`
      @keyframes rainbow-shift {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
      }
      .animate-rainbow-shift {
        animation: rainbow-shift 2s infinite;
      }

      @keyframes geometric-pulse {
        0%, 100% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.1) rotate(5deg); }
      }
      .animate-geometric-pulse {
        animation: geometric-pulse 1.5s ease-in-out infinite;
      }
    `}</style>
    </div>
  );

  const GeometricChaosCard = ({ cartao }) => (
    <div
      className="w-[350px] h-[200px] rounded-3xl text-white relative overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 cursor-pointer"
      style={{
        background: `linear-gradient(45deg, ${cartao.cor1} 0%, ${cartao.cor2} 25%, ${cartao.cor3} 50%, ${cartao.cor4} 75%, ${cartao.cor1} 100%)`,
      }}
    >
      <div className="p-6 relative z-10">
        <div
          className="absolute top-4 right-4 px-3 py-2 rounded-full text-xs font-black"
          style={{
            backgroundColor: "rgba(255,255,255,0.9)",
            color: cartao.cor1,
          }}
        >
          {cartao.cartaoNome}
        </div>
        <div className="w-12 h-8 bg-gradient-to-br from-white to-gray-200 rounded-lg mt-4 mb-6 relative shadow-lg">
          <div className="absolute inset-1 bg-gradient-to-br from-yellow-400 to-orange-500 rounded opacity-80"></div>
          <div className="absolute inset-2 bg-gray-800 rounded"></div>
        </div>
        <div className="text-xl font-mono tracking-widest mb-6">
          {cartao.numeroCard}
        </div>
        <div className="flex justify-between items-end">
          <div>
            <div className="text-xs opacity-90 mb-1">EMPRESA</div>
            <div className="text-sm font-bold">{cartao.empresa}</div>
          </div>
          <div className="text-right">
            <div className="text-xs opacity-75 mb-1">VÁLIDO</div>
            <div className="text-sm font-medium">{cartao.validade}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCartao = (cartao) => {
    switch (cartao.design) {
      case "geometric-chaos":
        return <GeometricChaosCard cartao={cartao} />;
      case "triangular-fusion":
        return <TriangularFusionCard cartao={cartao} />;
      case "wave-patterns":
        return <WavePatternsCard cartao={cartao} />;
      case "card-Moderno":
        return <CardModerno cartao={cartao} />;
      case "card-classico":
        return <CardClassico cartao={cartao} />;
      default:
        return <CardClassico cartao={cartao} />;
    }
  };

  const TabButton = ({ id, label, icon: Icon, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        active
          ? "text-white shadow-lg"
          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
      }`}
      style={active ? { backgroundColor: contrato1.cor1 } : {}}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${contrato1.cor4} 0%, ${contrato1.cor1} 50%, ${contrato1.cor4} 100%)`,
      }}
      className="h-full w-full rounded-[20px] p-6"
    >
      <div className="w-full">
        <header className="mb-8">
          <h1
            style={{ color: contrato1.cor1 }}
            className="text-3xl font-bold text-white mb-2"
          >
            {contrato1.bancoNome}
          </h1>
        </header>

        <div className="flex flex-wrap gap-3 mb-8">
          <TabButton
            id="overview"
            label="Visão Geral"
            icon={Wallet}
            active={currentTab === "overview"}
            onClick={setCurrentTab}
          />
          {/* <TabButton id="card" label="Cartão" icon={CreditCard} active={currentTab === 'card'} onClick={setCurrentTab} /> */}
          <TabButton
            id="loan"
            label="Empréstimo"
            icon={DollarSign}
            active={currentTab === "loan"}
            onClick={setCurrentTab}
          />
          <TabButton
            id="investments"
            label="Investimentos"
            icon={TrendingUp}
            active={currentTab === "investments"}
            onClick={setCurrentTab}
          />
        </div>

        {currentTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-start space-y-4">
              <div className="flex flex-col items-center justify-center ">
                {contrato1 &&
                  renderCartao(contratoParaCartao(contrato1, dados))}
                {/* <div style={{
                  background: `linear-gradient(135deg, ${contrato1.cor3}, ${contrato1.cor2}, ${contrato1.cor4})`
                }} className="bg-white rounded-xl p-4 shadow-lg w-full mt-6 ">
                  <div className="flex justify-between mt-2 p-2 bg-white/20 rounded-md mb-2 text-sm">
                    <span className="text-white">Limite Atual: R${cardData.limit.toLocaleString('pt-BR')}</span>
                    <span className="text-white"> Limite Disponível: R$ {cardData.available.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 ">
                    <div className="h-4 rounded-full transition-all duration-1000"
                      style={{ width: `${(cardData.used / cardData.limit) * 100}%`, background: `linear-gradient(to right, ${contrato1.cor3}, ${contrato1.cor4})` }}></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-white">Usado: R$ {cardData.used.toLocaleString('pt-BR')}</span>
                    <span className="text-white">{((cardData.used / cardData.limit) * 100).toFixed(1)}%</span>
                  </div>
                </div> */}
              </div>
              <div
                className="p-4 rounded-lg shadow-lg w-full"
                style={{
                  backgroundColor: "#f8f9fa",
                  borderLeft: `4px solid ${contrato1.cor3}`,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: contrato1.cor2 }}
                  >
                    <DollarSign className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">
                      Empréstimo Ativo
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {activeLoan
                        ? `Parcela ${activeLoan.parcelaAtual}/${activeLoan.parcelas}`
                        : "Nenhum empréstimo"}
                    </p>
                  </div>
                </div>
                {activeLoan ? (
                  <>
                    <p
                      className="text-2xl font-bold"
                      style={{ color: contrato1.cor3 }}
                    >
                      R${" "}
                      {activeLoan.valorParcela.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Saldo devedor: R${" "}
                      {activeLoan.saldoDevedor.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Próximo vencimento:</span>
                        <span className="font-semibold">
                          Dia {activeLoan.proximoVencimento}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-2xl font-bold text-gray-400">R$ 0,00</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Sem empréstimos ativos
                    </p>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Limite disponível:</span>
                        <span className="font-semibold">
                          R${" "}
                          {availableLoan.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
              {/* Botão de encerrar contrato */}
              {contrato1 && (
 <>
      <button
        onClick={() => setShowModal(true)}
        className="w-full py-3 mt-2 rounded-lg text-white font-semibold shadow-md transition-all duration-300 hover:scale-[1.02]"
        style={{
          backgroundColor: contrato1.cor3,
          opacity: (diaAtualJogo > (contrato1.dataFim ?? 99999) && !activeLoan) ? 1 : 0.6,
          cursor: (diaAtualJogo > (contrato1.dataFim ?? 99999) && !activeLoan) ? 'pointer' : 'not-allowed'
        }}
      >
        Encerrar Contrato
      </button>

      <ModalEncerrarContrato
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleEncerrarContrato}
        contrato={contrato1}
        activeLoan={activeLoan}
        diaAtual={diaAtualJogo}
      />
    </>


              )}

              {/* <div className="bg-white/40 rounded-xl w-full p-6 shadow-lg">
                <div className="space-y-3">
                  <div style={{ backgroundColor: contrato1.cor4, borderColor: contrato1.cor4 }} className="flex justify-between items-center p-3 rounded-lg border border-red-200">
                    <span className="text-gray-600">Fatura Atual:</span>
                    <span className="font-bold text-lg text-white">
                      R$ {cardData.faturaAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <button style={{ backgroundColor: contrato1.cor2 }} className="flex justify-center hover:scale-105 transition-all duration-500 items-center w-full items-center p-3 rounded-lg ">
                    <h2 className="text-white text-center">Pagar Fatura</h2>
                  </button>
                </div>
              </div> */}
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: contrato1.cor2 }}
                  >
                    <TrendingUp className="text-white" size={20} />
                  </div>
                  <h3 className="font-bold text-gray-800">Pós-fixado</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">Valor Investido</p>
                <p className="text-xl font-bold text-gray-800">
                  R${" "}
                  {investmentData.totalInvestidoPos.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <p className="text-sm text-gray-600 mt-3">Valor Atual</p>
                <p
                  className="text-lg font-bold"
                  style={{ color: contrato1.cor3 }}
                >
                  R${" "}
                  {investmentData.valorAtualPos.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Rendimento:</span>
                    <span
                      className={`font-semibold ${
                        investmentData.rendimentoPos >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {investmentData.rendimentoPos >= 0 ? "+" : ""}
                      R${" "}
                      {Math.abs(investmentData.rendimentoPos).toLocaleString(
                        "pt-BR",
                        { minimumFractionDigits: 2 }
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>Taxa mensal:</span>
                    <span className="font-semibold">
                      {(getPosTaxaMensal() * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>Investimentos ativos:</span>
                    <span className="font-semibold">
                      {
                        activeInvestments.filter((inv) => inv.type === "pos")
                          .length
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: contrato1.cor2 }}
                  >
                    <Calendar className="text-white" size={20} />
                  </div>
                  <h3 className="font-bold text-gray-800">Pré-fixado</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">Valor Investido</p>
                <p className="text-xl font-bold text-gray-800">
                  R${" "}
                  {investmentData.totalInvestidoPre.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <p className="text-sm text-gray-600 mt-3">Valor Estimado</p>
                <p
                  className="text-lg font-bold"
                  style={{ color: contrato1.cor3 }}
                >
                  R${" "}
                  {investmentData.valorAtualPre.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Rendimento previsto:</span>
                    <span
                      className={`font-semibold ${
                        investmentData.rendimentoPre >= 0
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      {investmentData.rendimentoPre >= 0 ? "+" : ""}
                      R${" "}
                      {Math.abs(investmentData.rendimentoPre).toLocaleString(
                        "pt-BR",
                        { minimumFractionDigits: 2 }
                      )}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1 mt-2">
                    Taxas disponíveis:
                  </p>
                  {contrato1 &&
                    obterTaxaInvestimento(contrato1, "pre").map((taxa, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between text-xs text-gray-600"
                      >
                        <span>{taxa.prazo} dias:</span>
                        <span className="font-semibold">{taxa.valor}%</span>
                      </div>
                    ))}
                  <div className="flex justify-between text-xs text-gray-600 mt-2 pt-2 border-t">
                    <span>Investimentos ativos:</span>
                    <span className="font-semibold">
                      {
                        activeInvestments.filter((inv) => inv.type === "pre")
                          .length
                      }
                    </span>
                  </div>
                </div>
              </div>
              {/* <div className="bg-white rounded-xl w-full p-6 shadow-lg">
                <div className="text-center p-2 bg-gray-50 rounded-lg mb-3">
                  <h3 style={{ color: contrato1.cor3 }} className="font-bold">Cashback Acumulado</h3>
                  <p className="text-2xl font-bold text-gray-800">
                    R$ {cashbackData.accumulated.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <button className="w-full text-white py-2 rounded-lg font-semibold hover:scale-105 transition-all duration-500"
                  style={{ backgroundColor: contrato1.cor3 }} disabled={cashbackData.accumulated === 0}>
                  Resgatar Cashback
                </button>
              </div> */}
            </div>
          </div>
        )}

        {currentTab === "loan" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-xl p-6 max-h-[65vh] overflow-y-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: contrato1.cor2 }}
                >
                  <DollarSign className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">
                    Empréstimo Pré-aprovado
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Taxa especial para você
                  </p>
                </div>
              </div>

              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: contrato1.cor4 }}
              >
                <p className="text-3xl font-bold text-white">
                  R${" "}
                  {availableLoan.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <p className="text-sm text-white opacity-90">
                  Valor disponível
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor do Empréstimo
                </label>
                <input
                  type="number"
                  min="0"
                  max={availableLoan}
                  value={loanAmount}
                  onChange={(e) =>
                    setLoanAmount(
                      Math.min(Number(e.target.value), availableLoan)
                    )
                  }
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
                  placeholder={`Máx: R$ ${availableLoan.toLocaleString(
                    "pt-BR"
                  )}`}
                  disabled={!!activeLoan}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Parcelas
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[3, 6, 12].map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedInstallments(option)}
                      className={`p-3 rounded-lg border-2 transition-colors font-semibold ${
                        selectedInstallments === option
                          ? "text-white border-transparent"
                          : "text-gray-700 border-gray-300 hover:border-gray-400"
                      }`}
                      style={
                        selectedInstallments === option
                          ? { backgroundColor: contrato1.cor3 }
                          : {}
                      }
                      disabled={!!activeLoan}
                    >
                      {option}x
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleRequestLoan}
                className={`w-full text-white py-3 rounded-lg font-semibold transition-colors ${
                  activeLoan || loanAmount <= 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                style={{ backgroundColor: contrato1.cor2 }}
                disabled={activeLoan || loanAmount <= 0}
              >
                {activeLoan
                  ? "Já existe empréstimo ativo"
                  : "Solicitar Empréstimo"}
              </button>

              <button
                onClick={handlePayInstallment}
                className={`w-full text-white py-3 rounded-lg font-semibold transition-colors ${
                  !activeLoan ||
                  diaAtualJogo < (activeLoan?.proximoVencimento ?? 0) ||
                  (economiaSetores.saldo ?? 0) <
                    (activeLoan?.valorParcela ?? Infinity)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                style={{ backgroundColor: contrato1.cor2 }}
                disabled={
                  !activeLoan ||
                  diaAtualJogo < (activeLoan?.proximoVencimento ?? 0) ||
                  (economiaSetores.saldo ?? 0) <
                    (activeLoan?.valorParcela ?? Infinity)
                }
              >
                Pagar parcela (R${" "}
                {activeLoan
                  ? Number(activeLoan.valorParcela).toFixed(2)
                  : "0,00"}
                )
              </button>
              {/* <div style={{ backgroundColor: contrato1.cor4, borderColor: contrato1.cor4 }} className="p-4 mt-2 rounded-lg border ">
                  <h4 className="font-semibold text-white mb-2">Próximo Aumento de Limite</h4>
                  <p className="text-sm text-white mb-1">
                    Quando seu patrimônio atingir <span className="font-bold">R$ {proximoAumentoLimite.patrimonioNecessario.toLocaleString('pt-BR')}</span>
                  </p>
                  <p className="text-sm text-white">
                    Seu novo limite será: <span className="font-bold">R$ {proximoAumentoLimite.novoLimite.toLocaleString('pt-BR')}</span>
                  </p>
                  <div className="mt-3 bg-white rounded p-2">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Patrimônio Atual: R$ {patrimonio.toLocaleString('pt-BR')}</span>
                      <span>{((patrimonio / proximoAumentoLimite.patrimonioNecessario) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full bg-blue-600 transition-all"
                        style={{ width: `${Math.min((patrimonio / proximoAumentoLimite.patrimonioNecessario) * 100, 100)}%`, backgroundColor: contrato1.cor4, }}>
                      </div>
                    </div>
                  </div>
                </div> */}
            </div>

            <div className="space-y-4">
              {!activeLoan && (
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="font-bold text-gray-800 mb-4">
                    Simulação do Empréstimo
                  </h3>
                  <div
                    className="p-4 rounded-lg mb-4"
                    style={{
                      backgroundColor: "#f8f9fa",
                      borderLeft: `4px solid ${contrato1.cor3}`,
                    }}
                  >
                    <p className="text-sm text-gray-600">Valor da parcela</p>
                    <p
                      className="text-2xl font-bold"
                      style={{ color: contrato1.cor3 }}
                    >
                      R${" "}
                      {valorParcelaSimulacao.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Total a pagar: R${" "}
                      {dadosSimulacao.montante.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Juros total: R${" "}
                      {dadosSimulacao.jurosTotal.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Taxa mensal:{" "}
                      {(dadosSimulacao.taxaMensal * 100).toFixed(2)}%
                    </p>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <h4 className="font-semibold text-gray-700">
                        Taxas por Parcelamento
                      </h4>
                    </div>
                    <div className="divide-y">
                      {opcoesParcelamento.map((opcao) => (
                        <div
                          key={opcao.parcelas}
                          className="p-3 flex justify-between items-center hover:bg-gray-50"
                        >
                          <div>
                            <p className="font-medium text-gray-800">
                              {opcao.parcelas}x
                            </p>
                            <p className="text-xs text-gray-600">
                              {opcao.taxaMensal}% a.m.
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Juros:</p>
                            <p
                              className="font-semibold"
                              style={{ color: contrato1.cor3 }}
                            >
                              R${" "}
                              {parseFloat(opcao.jurosTotal).toLocaleString(
                                "pt-BR",
                                { minimumFractionDigits: 2 }
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeLoan && (
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar size={20} style={{ color: contrato1.cor3 }} />
                    <h3 className="font-bold text-gray-800">
                      Empréstimo Ativo
                    </h3>
                  </div>

                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600">Saldo devedor atual</p>
                    <p className="text-3xl font-bold text-gray-800 my-2">
                      R${" "}
                      {activeLoan.saldoDevedor.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-sm text-gray-600">
                      Parcela {activeLoan.parcelaAtual} de {activeLoan.parcelas}
                    </p>
                  </div>

                  <div className="bg-gray-100 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-600">Próxima parcela</p>
                    <p
                      className="text-2xl font-bold"
                      style={{ color: contrato1.cor3 }}
                    >
                      R${" "}
                      {activeLoan.valorParcela.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <div className="mt-2 pt-2 border-t border-gray-300">
                      <p className="text-xs text-gray-600">Vencimento</p>
                      <p className="text-sm font-semibold text-gray-700">
                        Dia {activeLoan.proximoVencimento}
                      </p>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden mb-4">
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <h4 className="font-semibold text-gray-700">
                        Cronograma de Pagamentos
                      </h4>
                    </div>
                    <div className="divide-y max-h-48 overflow-y-auto">
                      {Array.from({ length: activeLoan.parcelas }, (_, i) => {
                        const numeroParcela = i + 1;
                        const diaVencimento =
                          activeLoan.diaInicio + 30 * numeroParcela;
                        const isPaga = numeroParcela < activeLoan.parcelaAtual;
                        const isProxima =
                          numeroParcela === activeLoan.parcelaAtual;

                        return (
                          <div
                            key={i}
                            className={`p-3 flex justify-between items-center ${
                              isProxima
                                ? "bg-yellow-50"
                                : isPaga
                                ? "bg-green-50"
                                : ""
                            }`}
                          >
                            <div>
                              <p
                                className={`font-medium ${
                                  isPaga
                                    ? "text-green-600"
                                    : isProxima
                                    ? "text-yellow-600"
                                    : "text-gray-800"
                                }`}
                              >
                                {numeroParcela}ª parcela{" "}
                                {isPaga ? "✓" : isProxima ? "→" : ""}
                              </p>
                              <p className="text-xs text-gray-600">
                                Dia {diaVencimento}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-800">
                                R${" "}
                                {activeLoan.valorParcela.toLocaleString(
                                  "pt-BR",
                                  { minimumFractionDigits: 2 }
                                )}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-blue-600 text-xs">Valor Original</p>
                        <p className="font-semibold text-blue-800">
                          R${" "}
                          {activeLoan.valorOriginal.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-blue-600 text-xs">Juros Total</p>
                        <p className="font-semibold text-blue-800">
                          R${" "}
                          {activeLoan.jurosTotal.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-blue-600 text-xs">Início</p>
                        <p className="font-semibold text-blue-800">
                          Dia {activeLoan.diaInicio}
                        </p>
                      </div>
                      <div>
                        <p className="text-blue-600 text-xs">Fim</p>
                        <p className="font-semibold text-blue-800">
                          Dia {activeLoan.dataFinal}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handlePayEarly}
                    className="w-full text-white py-3 rounded-lg font-semibold transition-colors"
                    style={{ backgroundColor: contrato1.cor2 }}
                  >
                    Pagar Antecipado (Liquidar Dívida)
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {currentTab === "investments" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-xl p-6 max-h-[65vh] overflow-y-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: contrato1.cor2 }}
                >
                  <TrendingUp className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Novo Investimento</h3>
                  <p className="text-gray-600 text-sm">
                    Escolha a melhor opção
                  </p>
                </div>
              </div>

              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: contrato1.cor3 }}
              >
                <p className="text-3xl font-bold text-white">
                  R${" "}
                  {saldoBancario.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <p className="text-sm text-white opacity-90">
                  Saldo disponível para investir
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Investimento
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setInvestmentType("pos")}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      investmentType === "pos"
                        ? "text-white border-transparent"
                        : "text-gray-700 border-gray-300 hover:border-gray-400"
                    }`}
                    style={
                      investmentType === "pos"
                        ? { backgroundColor: contrato1.cor3 }
                        : {}
                    }
                  >
                    <div className="font-semibold">Pós-fixado</div>
                    <div className="text-xs mt-1 opacity-90">
                      Liquidez diária
                    </div>
                  </button>
                  <button
                    onClick={() => setInvestmentType("pre")}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      investmentType === "pre"
                        ? "text-white border-transparent"
                        : "text-gray-700 border-gray-300 hover:border-gray-400"
                    }`}
                    style={
                      investmentType === "pre"
                        ? { backgroundColor: contrato1.cor3 }
                        : {}
                    }
                  >
                    <div className="font-semibold">Pré-fixado</div>
                    <div className="text-xs mt-1 opacity-90">Maior retorno</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor do Investimento
                </label>
                <input
                  type="number"
                  min="0"
                  max={saldoBancario}
                  value={investmentAmount}
                  onChange={(e) =>
                    setInvestmentAmount(
                      Math.min(Number(e.target.value), saldoBancario)
                    )
                  }
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                  placeholder={`Máx: R$ ${saldoBancario.toLocaleString(
                    "pt-BR"
                  )}`}
                />
              </div>

              {investmentType === "pre" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prazo de Resgate
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[90, 180, 360].map((days) => {
                      const taxa = (
                        (getPreFixedReturn(1000, days) / 1000) *
                        100
                      ).toFixed(2);
                      return (
                        <button
                          key={days}
                          onClick={() => setInvestmentDays(days)}
                          className={`p-3 rounded-lg border-2 transition-colors ${
                            investmentDays === days
                              ? "text-white border-transparent"
                              : "text-gray-700 border-gray-300 hover:border-gray-400"
                          }`}
                          style={
                            investmentDays === days
                              ? { backgroundColor: contrato1.cor3 }
                              : {}
                          }
                        >
                          <div className="font-semibold">{days} dias</div>
                          <div className="text-xs mt-1">+{taxa}%</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: "#f8f9fa",
                  borderLeft: `4px solid ${contrato1.cor3}`,
                }}
              >
                <p className="text-sm text-gray-600 mb-2">
                  {investmentType === "pos"
                    ? `Rendimento Mensal: ${(getPosTaxaMensal() * 100).toFixed(
                        2
                      )}%`
                    : `Rendimento Total: ${(
                        (getPreFixedReturn(1000, investmentDays) / 1000) *
                        100
                      ).toFixed(2)}%`}
                </p>
                <p
                  className="text-lg font-bold"
                  style={{ color: contrato1.cor3 }}
                >
                  Retorno estimado: R${" "}
                  {investmentType === "pos"
                    ? (investmentAmount * getPosTaxaMensal()).toLocaleString(
                        "pt-BR",
                        { minimumFractionDigits: 2 }
                      )
                    : getPreFixedReturn(
                        investmentAmount,
                        investmentDays
                      ).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
                {investmentType === "pos" && (
                  <p className="text-xs text-gray-500 mt-1">
                    Pode adicionar ou retirar a qualquer momento
                  </p>
                )}
                {investmentType === "pre" && (
                  <p className="text-xs text-gray-500 mt-1">
                    Resgate antecipado: perda de 10% + sem rendimentos
                  </p>
                )}
              </div>

              <button
                onClick={handleInvest}
                className={`w-full text-white py-3 rounded-lg font-semibold transition-colors ${
                  investmentAmount <= 0 || investmentAmount > saldoBancario
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                style={{ backgroundColor: contrato1.cor3 }}
                disabled={
                  investmentAmount <= 0 || investmentAmount > saldoBancario
                }
              >
                Investir Agora
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
              <h3 className="font-bold text-gray-800 mb-4">
                Meus Investimentos
              </h3>
              {activeInvestments.map((inv) => {
                const diasDecorridos = diaAtualJogo - inv.diaInicio;
                const mesesCompletos = Math.floor(diasDecorridos / 30);
                const isMatured =
                  inv.type === "pre" && diaAtualJogo >= inv.diaVencimento;
                const taxaMensalPos = getPosTaxaMensal();

                let jurosGanhos, valorTotalResgate, percentualRendimento;

                if (inv.type === "pos") {
                  jurosGanhos = inv.amount * taxaMensalPos * mesesCompletos;
                  valorTotalResgate = inv.amount + jurosGanhos;
                  percentualRendimento = (jurosGanhos / inv.amount) * 100;
                } else {
                  if (isMatured) {
                    jurosGanhos = getPreFixedReturn(inv.amount, inv.days);
                    valorTotalResgate = inv.amount + jurosGanhos;
                    percentualRendimento = (jurosGanhos / inv.amount) * 100;
                  } else {
                    jurosGanhos = 0;
                    valorTotalResgate = inv.amount * 0.9;
                    percentualRendimento = -10;
                  }
                }

                const diasRestantes =
                  inv.type === "pre" && !isMatured
                    ? inv.diaVencimento - diaAtualJogo
                    : 0;

                return (
                  <div
                    key={inv.id}
                    className="p-4 border-2 border-gray-200 rounded-lg transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-semibold text-gray-800">
                          {inv.type === "pos" ? "Pós-fixado" : "Pré-fixado"}
                        </span>
                        {inv.type === "pre" && (
                          <span
                            className="ml-2 text-xs px-2 py-1 rounded"
                            style={{
                              backgroundColor: isMatured
                                ? "#4CAF50"
                                : "#FFA726",
                              color: "white",
                            }}
                          >
                            {isMatured ? "Vencido" : `${inv.days} dias`}
                          </span>
                        )}
                      </div>
                    </div>

                    <p
                      className="text-2xl font-bold"
                      style={{ color: contrato1.cor3 }}
                    >
                      R${" "}
                      {inv.amount.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-xs text-gray-500">Valor investido</p>

                    <div className="mt-3 p-3 bg-gray-50 rounded-lg space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Rendimento:</span>
                        <span
                          className={`font-semibold ${
                            percentualRendimento >= 0
                              ? "text-blue-600"
                              : "text-red-600"
                          }`}
                        >
                          {percentualRendimento >= 0 ? "+" : ""}
                          {percentualRendimento.toFixed(2)}%
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Juros ganhos:</span>
                        <span
                          className={`font-semibold ${
                            jurosGanhos >= 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {jurosGanhos >= 0 ? "+" : ""} R${" "}
                          {Math.abs(jurosGanhos).toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                        <span className="text-gray-600 font-medium">
                          Valor a receber:
                        </span>
                        <span
                          className="font-bold text-lg"
                          style={{
                            color:
                              inv.type === "pre" && !isMatured
                                ? "#d32f2f"
                                : "#0C9123",
                          }}
                        >
                          R${" "}
                          {valorTotalResgate.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </div>

                      {inv.type === "pos" && (
                        <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                          <span className="text-gray-600">
                            Meses decorridos:
                          </span>
                          <span className="font-semibold text-gray-800">
                            {mesesCompletos} meses
                          </span>
                        </div>
                      )}

                      {inv.type === "pre" && !isMatured && (
                        <>
                          <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                            <span className="text-gray-600">Faltam:</span>
                            <span className="font-semibold text-orange-600">
                              {diasRestantes} dias (Dia {inv.diaVencimento})
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Início:</span>
                            <span className="font-medium text-gray-700">
                              Dia {inv.diaInicio}
                            </span>
                          </div>
                          <div className="text-xs text-red-600 mt-2 p-2 bg-red-50 rounded">
                            ⚠️ Resgate antecipado: perde 10% do valor investido
                            + sem rendimentos
                          </div>
                        </>
                      )}

                      {inv.type === "pre" && isMatured && (
                        <div className="text-center pt-2 border-t border-gray-200">
                          <span className="text-xs text-green-600 font-medium">
                            ✓ Investimento vencido (Dia {inv.diaVencimento}) -
                            Resgate disponível
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 mt-3">
                      {inv.type === "pos" && (
                        <button
                          onClick={() => handleAddFunds(inv.id)}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium transition-colors text-sm"
                        >
                          + Adicionar
                        </button>
                      )}
                      <button
                        onClick={() => handleWithdraw(inv.id)}
                        className="flex-1 text-white py-2 rounded-lg font-medium transition-colors text-sm"
                        style={{
                          backgroundColor:
                            inv.type === "pre" && !isMatured
                              ? "#d32f2f"
                              : "#0C9123",
                        }}
                      >
                        {inv.type === "pre" && !isMatured
                          ? "Resgatar (-10%)"
                          : "Resgatar"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {currentTab === "card" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-xl p-6 max-h-[65vh] overflow-y-auto">
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-white/20 to-white/40 rounded-xl p-6 shadow-lg ">
                <div className="flex flex-col items-center justify-center ">
                  {contrato1 &&
                    renderCartao(contratoParaCartao(contrato1, dados))}
                  <div
                    style={{
                      background: `linear-gradient(135deg, ${contrato1.cor3}, ${contrato1.cor2}, ${contrato1.cor4})`,
                    }}
                    className="bg-white rounded-xl p-4 shadow-lg w-full mt-6 "
                  >
                    <div className="flex justify-between mt-2 p-2 bg-white/20 rounded-md mb-2 text-sm">
                      <span className="text-white">
                        Limite Atual: R${cardData.limit.toLocaleString("pt-BR")}
                      </span>
                      <span className="text-white">
                        {" "}
                        Limite Disponível: R${" "}
                        {cardData.available.toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 ">
                      <div
                        className="h-4 rounded-full transition-all duration-1000"
                        style={{
                          width: `${(cardData.used / cardData.limit) * 100}%`,
                          background: `linear-gradient(to right, ${contrato1.cor3}, ${contrato1.cor4})`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="text-white">
                        Usado: R$ {cardData.used.toLocaleString("pt-BR")}
                      </span>
                      <span className="text-white">
                        {((cardData.used / cardData.limit) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: contrato1.cor4,
                    borderColor: contrato1.cor4,
                  }}
                  className="p-4 mt-2 rounded-lg border "
                >
                  <h4 className="font-semibold text-white mb-2">
                    Próximo Aumento de Limite
                  </h4>
                  <p className="text-sm text-white mb-1">
                    Quando seu patrimônio atingir{" "}
                    <span className="font-bold">
                      R${" "}
                      {proximoAumentoLimite.patrimonioNecessario.toLocaleString(
                        "pt-BR"
                      )}
                    </span>
                  </p>
                  <p className="text-sm text-white">
                    Seu novo limite será:{" "}
                    <span className="font-bold">
                      R${" "}
                      {proximoAumentoLimite.novoLimite.toLocaleString("pt-BR")}
                    </span>
                  </p>
                  <div className="mt-3 bg-white rounded p-2">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>
                        Patrimônio Atual: R${" "}
                        {patrimonio.toLocaleString("pt-BR")}
                      </span>
                      <span>
                        {(
                          (patrimonio /
                            proximoAumentoLimite.patrimonioNecessario) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-blue-600 transition-all"
                        style={{
                          width: `${Math.min(
                            (patrimonio /
                              proximoAumentoLimite.patrimonioNecessario) *
                              100,
                            100
                          )}%`,
                          backgroundColor: contrato1.cor4,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/40 rounded-xl p-6 w-full shadow-lg">
                <div className="space-y-3">
                  <div
                    style={{
                      backgroundColor: contrato1.cor4,
                      borderColor: contrato1.cor4,
                    }}
                    className="flex justify-between items-center p-3 rounded-lg border border-red-200"
                  >
                    <span className="text-gray-600">Fatura Atual:</span>
                    <span className="font-bold text-lg text-white">
                      R${" "}
                      {cardData.faturaAtual.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <button
                    style={{ backgroundColor: contrato1.cor2 }}
                    className="flex justify-center hover:scale-105 transition-all duration-500 items-center w-full items-center p-3 rounded-lg "
                  >
                    <h2 className="text-white text-center">Pagar Fatura</h2>
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white/40 rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: contrato1.cor2 }}
                  >
                    <Gift className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">
                      Cashback Acumulado
                    </h3>
                    <p className="text-gray-600 text-sm">Seus benefícios</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div
                    className="text-center p-4 rounded-lg"
                    style={{
                      background: `linear-gradient(135deg, ${contrato1.cor4}, ${contrato1.cor3})`,
                    }}
                  >
                    <p className="text-sm text-white opacity-90">Este Mês</p>
                    <p className="text-3xl font-bold text-white">
                      R${" "}
                      {cashbackData.currentMonth.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>

                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Acumulado</p>
                    <p className="text-2xl font-bold text-gray-800">
                      R${" "}
                      {cashbackData.accumulated.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-3">
                      Configuração do Cashback
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tipo:</span>
                        <span className="font-semibold text-gray-800 capitalize">
                          {cashbackData.tipo === "nenhum"
                            ? "Sem cashback"
                            : cashbackData.tipo === "todos"
                            ? "Todas compras"
                            : `Setor: ${cashbackData.setor}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Percentual:</span>
                        <span
                          className="font-semibold"
                          style={{ color: "#0C9123" }}
                        >
                          {cashbackData.percentual}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    className="w-full text-white py-3 rounded-lg font-semibold transition-colors"
                    style={{ backgroundColor: contrato1.cor3 }}
                    disabled={cashbackData.accumulated === 0}
                  >
                    Resgatar Cashback
                  </button>
                </div>
              </div>

              <div className="bg-white/40 rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-800 mb-4">
                  Próximo Resgate
                </h3>
                <div
                  className="p-4 rounded-lg mb-4"
                  style={{
                    backgroundColor: "#f1f8e9",
                    borderLeft: `4px solid ${contrato1.cor4}`,
                  }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700">
                      Disponível em:
                    </span>
                    <span
                      className="text-2xl font-bold"
                      style={{ color: contrato1.cor3 }}
                    >
                      {cashbackData.daysUntilWithdrawal} dias
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Todo mês você pode resgatar seu cashback acumulado
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BankInterface;
