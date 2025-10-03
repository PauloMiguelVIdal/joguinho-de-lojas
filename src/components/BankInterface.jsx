import React, { useState, useEffect, useContext } from 'react';
import { CreditCard, DollarSign, TrendingUp, Gift, Calendar } from 'lucide-react';
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";

const BankInterface = () => {
  const [selectedInstallments, setSelectedInstallments] = useState(3);
  const [currentTab, setCurrentTab] = useState('overview');
  const [loanAmount, setLoanAmount] = useState(0);
  const { dados } = useContext(CentraldeDadosContext);
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);
  
  const contrato1 = economiaSetores.contratosBancos[0];
  const diaAtualJogo = dados.dia || 1000;
  const [activeLoan, setActiveLoan] = useState(null);
  const limiteEmprestimoAtual = contrato1.limiteEmprestimo;
  const [availableLoan, setAvailableLoan] = useState(limiteEmprestimoAtual);
  
  const [investmentType, setInvestmentType] = useState('pos');
  const [investmentAmount, setInvestmentAmount] = useState(0);
  const [investmentDays, setInvestmentDays] = useState(90);
  const [activeInvestments, setActiveInvestments] = useState([]);
  
  const saldoBancario = economiaSetores.saldo;

  const config = {
    cashback: { nenhum: { valor: 0 }, todos: { valor: 2 }, especifico: { valor: 5 } },
    juros: { baixo: 2, medio: 3, alto: 4 },
    emprestimos: { baixo: { mult: 1 }, medio: { mult: 2 }, alto: { mult: 3 } },
    investimentos: {
      pos: { baixa: 1, media: 3, alta: 5 },
      pre: {
        baixa: [{ prazo: 90, valor: 0.5 }, { prazo: 180, valor: 0.7 }, { prazo: 360, valor: 1.0 }],
        media: [{ prazo: 90, valor: 0.7 }, { prazo: 180, valor: 1.0 }, { prazo: 360, valor: 1.5 }],
        alta: [{ prazo: 90, valor: 1.5 }, { prazo: 180, valor: 2.0 }, { prazo: 360, valor: 2.5 }]
      }
    }
  };

  const cashbackData = {
    currentMonth: 145.67,
    accumulated: 1234.89,
    daysUntilWithdrawal: 12,
    tipo: contrato1.cashback?.tipo || 'nenhum',
    percentual: config.cashback[contrato1.cashback?.tipo || 'nenhum']?.valor || 0,
    setor: contrato1.cashback?.setor || '-'
  };

  const [lastProcessedPayment, setLastProcessedPayment] = useState(0);

  useEffect(() => {
    if (!activeLoan) return;
    const diasDecorridos = diaAtualJogo - activeLoan.diaInicio;
    const parcelasPagas = Math.floor(diasDecorridos / 30);
    
    // Verifica se há novas parcelas a pagar
    if (parcelasPagas > lastProcessedPayment) {
      const parcelasADescontar = parcelasPagas - lastProcessedPayment;
      const valorTotalDescontar = parcelasADescontar * activeLoan.valorParcela;
      
      // Desconta as parcelas do saldo
      atualizarEco('saldo', saldoBancario - valorTotalDescontar);
      setLastProcessedPayment(parcelasPagas);
      
      const novaParcelaAtual = Math.min(parcelasPagas + 1, activeLoan.parcelas);
      const valorPago = parcelasPagas * activeLoan.valorParcela;
      const novoSaldoDevedor = Math.max(0, activeLoan.totalComJuros - valorPago);
      
      if (novoSaldoDevedor === 0) {
        setActiveLoan(null);
        setAvailableLoan(prev => prev + activeLoan.valorOriginal);
        setLastProcessedPayment(0);
      } else {
        setActiveLoan({
          ...activeLoan,
          parcelaAtual: novaParcelaAtual,
          saldoDevedor: novoSaldoDevedor,
          proximoVencimento: activeLoan.diaInicio + (30 * novaParcelaAtual)
        });
      }
    }
  }, [dados.dia, activeLoan, saldoBancario, lastProcessedPayment]);

  useEffect(() => {
    if (activeInvestments.length === 0) return;
    const investimentosAtualizados = activeInvestments.map(inv => {
      const diasDecorridos = diaAtualJogo - inv.diaInicio;
      const periodosCompletos = Math.floor(diasDecorridos / 30);
      if (periodosCompletos > (inv.periodosProcessados || 0)) {
        return { ...inv, periodosProcessados: periodosCompletos };
      }
      return inv;
    });

    const investimentosVencidos = investimentosAtualizados.filter(
      inv => inv.type === 'pre' && diaAtualJogo >= inv.diaVencimento
    );

    if (investimentosVencidos.length > 0) {
      setActiveInvestments(investimentosAtualizados.filter(inv => !investimentosVencidos.includes(inv)));
    } else {
      setActiveInvestments(investimentosAtualizados);
    }
  }, [dados.dia]);

  const calcularMultiplicadorJuros = (nivelJuros, parcelas) => {
    const multiplicadores = {
      baixo: { 3: 1.5, 6: 1.2, 12: 1.0 },
      medio: { 3: 1.7, 6: 1.5, 12: 1.2 },
      alto: { 3: 2.0, 6: 1.7, 12: 1.5 }
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

  const dadosSimulacao = calcularJurosTotal(loanAmount, contrato1.emprestimo, contrato1.juros, selectedInstallments);
  const valorParcelaSimulacao = loanAmount > 0 ? dadosSimulacao.montante / selectedInstallments : 0;

  const handleRequestLoan = () => {
    if (activeLoan || loanAmount <= 0 || loanAmount > availableLoan) return;
    const { montante, jurosTotal, taxaMensal } = calcularJurosTotal(loanAmount, contrato1.emprestimo, contrato1.juros, selectedInstallments);
    const valorParcela = montante / selectedInstallments;

    const novoEmprestimo = {
      valorOriginal: loanAmount,
      totalComJuros: montante,
      jurosTotal: jurosTotal,
      parcelas: selectedInstallments,
      valorParcela: valorParcela,
      parcelaAtual: 1,
      saldoDevedor: montante,
      taxaMensal: taxaMensal,
      diaInicio: diaAtualJogo,
      proximoVencimento: diaAtualJogo + 30,
      dataFinal: diaAtualJogo + (30 * selectedInstallments)
    };

    // Adicionar valor do empréstimo ao saldo bancário
    atualizarEco('saldo', saldoBancario + loanAmount);

    setActiveLoan(novoEmprestimo);
    setAvailableLoan(prev => prev - loanAmount);
    setLoanAmount(0);
  };

  const handlePayEarly = () => {
    if (!activeLoan) return;
    
    // Descontar o saldo devedor do saldo bancário
    atualizarEco('saldo', saldoBancario - activeLoan.saldoDevedor);
    
    setAvailableLoan(prev => prev + activeLoan.valorOriginal);
    setActiveLoan(null);
  };

  const formatarDiaJogo = (dia) => {
    const dataBase = new Date(2024, 0, 1);
    const dataCalculada = new Date(dataBase.getTime() + (dia * 24 * 60 * 60 * 1000));
    return dataCalculada.toLocaleDateString('pt-BR');
  };

  const opcoesParcelamento = [3, 6, 12].map(parcelas => {
    const { jurosTotal, taxaMensal } = calcularJurosTotal(loanAmount || 1000, contrato1.emprestimo, contrato1.juros, parcelas);
    return { parcelas, taxaMensal: (taxaMensal * 100).toFixed(2), jurosTotal: jurosTotal.toFixed(2) };
  });

  const getPosTaxaMensal = () => {
    const nivelInvestimento = contrato1.investimento;
    return (config.investimentos.pos[nivelInvestimento] || 1) / 100;
  };

  const getPreFixedReturn = (amount, days) => {
    const nivelInvestimento = contrato1.investimento;
    const tabelaTaxas = config.investimentos.pre[nivelInvestimento];
    if (!tabelaTaxas) return amount * 0.015;
    const opcao = tabelaTaxas.find(t => t.prazo === days);
    const taxaMensal = opcao ? opcao.valor / 100 : 0.015;
    const meses = days / 30;
    const taxaTotal = taxaMensal * meses;
    return amount * taxaTotal;
  };

  const calcularDadosInvestimentos = () => {
    let totalInvestidoPos = 0, totalInvestidoPre = 0, valorAtualPos = 0, valorAtualPre = 0;
    activeInvestments.forEach(inv => {
      const diasDecorridos = diaAtualJogo - inv.diaInicio;
      const mesesCompletos = Math.floor(diasDecorridos / 30);
      if (inv.type === 'pos') {
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
      totalInvestidoPos, totalInvestidoPre, valorAtualPos, valorAtualPre,
      totalInvestido: totalInvestidoPos + totalInvestidoPre,
      valorTotal: valorAtualPos + valorAtualPre,
      rendimentoPos: valorAtualPos - totalInvestidoPos,
      rendimentoPre: valorAtualPre - totalInvestidoPre,
      rendimentoTotal: (valorAtualPos + valorAtualPre) - (totalInvestidoPos + totalInvestidoPre)
    };
  };

  const investmentData = calcularDadosInvestimentos();

  const obterTaxaInvestimento = (contrato, tipo = 'pos') => {
    if (!contrato) return tipo === 'pos' ? 1 : [];
    return tipo === 'pos' ? config.investimentos.pos[contrato.investimento] || 1 : config.investimentos.pre[contrato.investimento] || [];
  };

  const handleInvest = () => {
    if (investmentAmount <= 0 || investmentAmount > saldoBancario) return;
    
    const newInvestment = {
      id: Date.now(),
      type: investmentType,
      amount: investmentAmount,
      days: investmentType === 'pre' ? investmentDays : null,
      diaInicio: diaAtualJogo,
      diaVencimento: investmentType === 'pre' ? diaAtualJogo + investmentDays : null,
      periodosProcessados: 0
    };
    
    // Reduzir o valor investido do saldo bancário
    atualizarEco('saldo', saldoBancario - investmentAmount);
    
    setActiveInvestments([...activeInvestments, newInvestment]);
    setInvestmentAmount(0);
  };

  const handleWithdraw = (investmentId) => {
    const investment = activeInvestments.find(inv => inv.id === investmentId);
    if (!investment) return;
    let valorResgate = 0;
    const diasDecorridos = diaAtualJogo - investment.diaInicio;
    const mesesCompletos = Math.floor(diasDecorridos / 30);

    if (investment.type === 'pos') {
      const taxaMensal = getPosTaxaMensal();
      const jurosGanhos = investment.amount * taxaMensal * mesesCompletos;
      valorResgate = investment.amount + jurosGanhos;
    } else {
      const isMatured = diaAtualJogo >= investment.diaVencimento;
      if (isMatured) {
        const jurosGanhos = getPreFixedReturn(investment.amount, investment.days);
        valorResgate = investment.amount + jurosGanhos;
      } else {
        valorResgate = investment.amount * 0.9;
      }
    }

    // Adicionar valor resgatado ao saldo bancário
    atualizarEco('saldo', saldoBancario + valorResgate);
    
    setActiveInvestments(activeInvestments.filter(inv => inv.id !== investmentId));
  };

  const handleAddFunds = (investmentId) => {
    const investment = activeInvestments.find(inv => inv.id === investmentId);
    if (!investment || investment.type !== 'pos') return;
    const additionalAmount = parseFloat(prompt('Quanto deseja adicionar?', '0'));
    if (isNaN(additionalAmount) || additionalAmount <= 0 || additionalAmount > saldoBancario) return;
    
    // Reduzir valor adicionado do saldo bancário
    atualizarEco('saldo', saldoBancario - additionalAmount);
    
    setActiveInvestments(activeInvestments.map(inv =>
      inv.id === investmentId ? { ...inv, amount: inv.amount + additionalAmount } : inv
    ));
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
    empresa: dados?.inicioGame?.nomeEmpresa ?? "Minha Empresa"
  });

  const cardData = {
    number: contrato1.numeroCard,
    holder: dados.inicioGame.nomeEmpresa,
    expiry: contrato1.dataFim,
    limit: 50000,
    available: 12350,
    used: 17050,
    faturaAtual: 2450.75
  };

  const patrimonio = 10000;
  
  const calcularProximoLimite = (patrimonioAtual) => {
    if (patrimonioAtual >= 10000000) return { novoLimite: 500000, patrimonioNecessario: 10000000 };
    if (patrimonioAtual >= 5000000) return { novoLimite: 250000, patrimonioNecessario: 10000000 };
    if (patrimonioAtual >= 1000000) return { novoLimite: 100000, patrimonioNecessario: 5000000 };
    if (patrimonioAtual >= 500000) return { novoLimite: 50000, patrimonioNecessario: 1000000 };
    if (patrimonioAtual >= 100000) return { novoLimite: 25000, patrimonioNecessario: 500000 };
    return { novoLimite: 10000, patrimonioNecessario: 100000 };
  };

  const proximoAumentoLimite = calcularProximoLimite(patrimonio);

  const GeometricChaosCard = ({ cartao }) => (
    <div className="w-[350px] h-[200px] rounded-3xl text-white relative overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 cursor-pointer"
      style={{ background: `linear-gradient(45deg, ${cartao.cor1} 0%, ${cartao.cor2} 25%, ${cartao.cor3} 50%, ${cartao.cor4} 75%, ${cartao.cor1} 100%)` }}>
      <div className="p-6 relative z-10">
        <div className="absolute top-4 right-4 px-3 py-2 rounded-full text-xs font-black"
          style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: cartao.cor1 }}>{cartao.cartaoNome}</div>
        <div className="w-12 h-8 bg-gradient-to-br from-white to-gray-200 rounded-lg mt-4 mb-6 relative shadow-lg">
          <div className="absolute inset-1 bg-gradient-to-br from-yellow-400 to-orange-500 rounded opacity-80"></div>
          <div className="absolute inset-2 bg-gray-800 rounded"></div>
        </div>
        <div className="text-xl font-mono tracking-widest mb-6">{cartao.numeroCard}</div>
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

  const renderCartao = (cartao) => <GeometricChaosCard cartao={cartao} />;

  const TabButton = ({ id, label, icon: Icon, active, onClick }) => (
    <button onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${active ? 'text-white shadow-lg' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
      style={active ? { backgroundColor: contrato1.cor1 } : {}}>
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div style={{ background: `linear-gradient(135deg, ${contrato1.cor4} 0%, ${contrato1.cor1} 50%, ${contrato1.cor4} 100%)` }}
      className="h-full w-full rounded-[20px] p-6">
      <div className="w-full">
        <header className="mb-8">
          <h1 style={{ color: contrato1.cor1 }} className="text-3xl font-bold text-white mb-2">{contrato1.bancoNome}</h1>
        </header>

        <div className="flex flex-wrap gap-3 mb-8">
          <TabButton id="overview" label="Visão Geral" icon={CreditCard} active={currentTab === 'overview'} onClick={setCurrentTab} />
          <TabButton id="loan" label="Empréstimo" icon={DollarSign} active={currentTab === 'loan'} onClick={setCurrentTab} />
          <TabButton id="investments" label="Investimentos" icon={TrendingUp} active={currentTab === 'investments'} onClick={setCurrentTab} />
          <TabButton id="cashback" label="Cashback" icon={Gift} active={currentTab === 'cashback'} onClick={setCurrentTab} />
        </div>

        {currentTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-start space-y-4">
              <div className="bg-white rounded-xl p-4 shadow-lg w-full">
                <h3 className="font-semibold text-gray-700 mb-3">Limite do Cartão</h3>
                <p className="text-3xl font-bold" style={{ color: contrato1.cor3 }}>
                  R$ {cardData.limit.toLocaleString('pt-BR')}
                </p>
                <p className="text-sm text-gray-500 mt-1">Limite atual</p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-lg w-full">
                <h3 className="font-semibold text-gray-700 mb-3">Fatura Atual</h3>
                <p className="text-2xl font-bold text-red-600">
                  R$ {cardData.faturaAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-gray-500 mt-1">Vencimento: Todo dia 10</p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-lg w-full">
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="h-4 rounded-full transition-all duration-1000"
                      style={{ width: `${(cardData.used / cardData.limit) * 100}%`, background: `linear-gradient(to right, ${contrato1.cor3}, ${contrato1.cor4})` }}></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-gray-600">Usado: R$ {cardData.used.toLocaleString('pt-BR')}</span>
                    <span className="text-gray-600">{((cardData.used / cardData.limit) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-lg w-full">
                <h3 className="font-semibold text-gray-700">Limite Disponível</h3>
                <p className="text-2xl font-bold" style={{ color: contrato1.cor3 }}>
                  R$ {cardData.available.toLocaleString('pt-BR')}
                </p>
                <p className="text-sm text-gray-500">de R$ {cardData.limit.toLocaleString('pt-BR')}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg shadow-lg" style={{ backgroundColor: '#f8f9fa', borderLeft: `4px solid ${contrato1.cor3}` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: contrato1.cor2 }}>
                    <DollarSign className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Empréstimo Ativo</h3>
                    <p className="text-gray-600 text-sm">
                      {activeLoan ? `Parcela ${activeLoan.parcelaAtual}/${activeLoan.parcelas}` : 'Nenhum empréstimo'}
                    </p>
                  </div>
                </div>
                {activeLoan ? (
                  <>
                    <p className="text-2xl font-bold" style={{ color: contrato1.cor3 }}>
                      R$ {activeLoan.valorParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Saldo devedor: R$ {activeLoan.saldoDevedor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Próximo vencimento:</span>
                        <span className="font-semibold">Dia {activeLoan.proximoVencimento}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Data:</span>
                        <span className="font-semibold">{formatarDiaJogo(activeLoan.proximoVencimento)}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-2xl font-bold text-gray-400">R$ 0,00</p>
                    <p className="text-sm text-gray-500 mt-1">Sem empréstimos ativos</p>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Limite disponível:</span>
                        <span className="font-semibold">R$ {availableLoan.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: contrato1.cor2 }}>
                    <TrendingUp className="text-white" size={20} />
                  </div>
                  <h3 className="font-bold text-gray-800">Pós-fixado</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">Valor Investido</p>
                <p className="text-xl font-bold text-gray-800">
                  R$ {investmentData.totalInvestidoPos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-gray-600 mt-3">Valor Atual</p>
                <p className="text-lg font-bold" style={{ color: contrato1.cor3 }}>
                  R$ {investmentData.valorAtualPos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Rendimento:</span>
                    <span className={`font-semibold ${investmentData.rendimentoPos >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {investmentData.rendimentoPos >= 0 ? '+' : ''}
                      R$ {Math.abs(investmentData.rendimentoPos).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>Taxa mensal:</span>
                    <span className="font-semibold">{(getPosTaxaMensal() * 100).toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>Investimentos ativos:</span>
                    <span className="font-semibold">{activeInvestments.filter(inv => inv.type === 'pos').length}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: contrato1.cor2 }}>
                    <Calendar className="text-white" size={20} />
                  </div>
                  <h3 className="font-bold text-gray-800">Pré-fixado</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">Valor Investido</p>
                <p className="text-xl font-bold text-gray-800">
                  R$ {investmentData.totalInvestidoPre.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-gray-600 mt-3">Valor Estimado</p>
                <p className="text-lg font-bold" style={{ color: contrato1.cor3 }}>
                  R$ {investmentData.valorAtualPre.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Rendimento previsto:</span>
                    <span className={`font-semibold ${investmentData.rendimentoPre >= 0 ? 'text-green-600' : 'text-gray-600'}`}>
                      {investmentData.rendimentoPre >= 0 ? '+' : ''}
                      R$ {Math.abs(investmentData.rendimentoPre).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1 mt-2">Taxas disponíveis:</p>
                  {contrato1 && obterTaxaInvestimento(contrato1, 'pre').map((taxa, idx) => (
                    <div key={idx} className="flex justify-between text-xs text-gray-600">
                      <span>{taxa.prazo} dias:</span>
                      <span className="font-semibold">{taxa.valor}%</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-xs text-gray-600 mt-2 pt-2 border-t">
                    <span>Investimentos ativos:</span>
                    <span className="font-semibold">{activeInvestments.filter(inv => inv.type === 'pre').length}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-center p-2 bg-gray-50 rounded-lg mb-3">
                  <h3 style={{ color: contrato1.cor3 }} className="font-bold">Cashback Acumulado</h3>
                  <p className="text-2xl font-bold text-gray-800">
                    R$ {cashbackData.accumulated.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tipo:</span>
                    <span className="font-semibold text-gray-800 capitalize">
                      {cashbackData.tipo === 'nenhum' ? 'Sem cashback' : cashbackData.tipo === 'todos' ? 'Todas compras' : `Setor: ${cashbackData.setor}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Percentual:</span>
                    <span className="font-semibold" style={{ color: '#0C9123' }}>{cashbackData.percentual}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Este mês:</span>
                    <span className="font-semibold text-gray-800">
                      R$ {cashbackData.currentMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
                <button className="w-full text-white py-2 rounded-lg font-semibold hover:scale-105 transition-all duration-500"
                  style={{ backgroundColor: contrato1.cor3 }} disabled={cashbackData.accumulated === 0}>
                  Resgatar Cashback
                </button>
              </div>
            </div>
          </div>
        )}

        {currentTab === 'loan' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-xl p-6 max-h-[65vh] overflow-y-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: contrato1.cor2 }}>
                  <DollarSign className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Empréstimo Pré-aprovado</h3>
                  <p className="text-gray-600 text-sm">Taxa especial para você</p>
                </div>
              </div>

              <div className="p-4 rounded-lg" style={{ backgroundColor: contrato1.cor4 }}>
                <p className="text-3xl font-bold text-white">
                  R$ {availableLoan.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-white opacity-90">Valor disponível</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Valor do Empréstimo</label>
                <input type="number" min="0" max={availableLoan} value={loanAmount}
                  onChange={(e) => setLoanAmount(Math.min(Number(e.target.value), availableLoan))}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
                  placeholder={`Máx: R$ ${availableLoan.toLocaleString('pt-BR')}`} disabled={!!activeLoan} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Número de Parcelas</label>
                <div className="grid grid-cols-3 gap-2">
                  {[3, 6, 12].map(option => (
                    <button key={option} onClick={() => setSelectedInstallments(option)}
                      className={`p-3 rounded-lg border-2 transition-colors font-semibold ${selectedInstallments === option ? "text-white border-transparent" : "text-gray-700 border-gray-300 hover:border-gray-400"}`}
                      style={selectedInstallments === option ? { backgroundColor: contrato1.cor3 } : {}} disabled={!!activeLoan}>
                      {option}x
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={handleRequestLoan}
                className={`w-full text-white py-3 rounded-lg font-semibold transition-colors ${activeLoan || loanAmount <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{ backgroundColor: contrato1.cor2 }} disabled={activeLoan || loanAmount <= 0}>
                {activeLoan ? 'Já existe empréstimo ativo' : 'Solicitar Empréstimo'}
              </button>
            </div>

            <div className="space-y-4">
              {!activeLoan && (
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="font-bold text-gray-800 mb-4">Simulação do Empréstimo</h3>
                  <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: "#f8f9fa", borderLeft: `4px solid ${contrato1.cor3}` }}>
                    <p className="text-sm text-gray-600">Valor da parcela</p>
                    <p className="text-2xl font-bold" style={{ color: contrato1.cor3 }}>
                      R$ {valorParcelaSimulacao.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Total a pagar: R$ {dadosSimulacao.montante.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Juros total: R$ {dadosSimulacao.jurosTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Taxa mensal: {(dadosSimulacao.taxaMensal * 100).toFixed(2)}%
                    </p>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <h4 className="font-semibold text-gray-700">Taxas por Parcelamento</h4>
                    </div>
                    <div className="divide-y">
                      {opcoesParcelamento.map(opcao => (
                        <div key={opcao.parcelas} className="p-3 flex justify-between items-center hover:bg-gray-50">
                          <div>
                            <p className="font-medium text-gray-800">{opcao.parcelas}x</p>
                            <p className="text-xs text-gray-600">{opcao.taxaMensal}% a.m.</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Juros:</p>
                            <p className="font-semibold" style={{ color: contrato1.cor3 }}>
                              R$ {parseFloat(opcao.jurosTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
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
                    <h3 className="font-bold text-gray-800">Empréstimo Ativo</h3>
                  </div>

                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600">Saldo devedor atual</p>
                    <p className="text-3xl font-bold text-gray-800 my-2">
                      R$ {activeLoan.saldoDevedor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm text-gray-600">Parcela {activeLoan.parcelaAtual} de {activeLoan.parcelas}</p>
                  </div>

                  <div className="bg-gray-100 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-600">Próxima parcela</p>
                    <p className="text-2xl font-bold" style={{ color: contrato1.cor3 }}>
                      R$ {activeLoan.valorParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <div className="mt-2 pt-2 border-t border-gray-300">
                      <p className="text-xs text-gray-600">Vencimento</p>
                      <p className="text-sm font-semibold text-gray-700">
                        Dia {activeLoan.proximoVencimento} ({formatarDiaJogo(activeLoan.proximoVencimento)})
                      </p>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden mb-4">
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <h4 className="font-semibold text-gray-700">Cronograma de Pagamentos</h4>
                    </div>
                    <div className="divide-y max-h-48 overflow-y-auto">
                      {Array.from({ length: activeLoan.parcelas }, (_, i) => {
                        const numeroParcela = i + 1;
                        const diaVencimento = activeLoan.diaInicio + (30 * numeroParcela);
                        const isPaga = numeroParcela < activeLoan.parcelaAtual;
                        const isProxima = numeroParcela === activeLoan.parcelaAtual;

                        return (
                          <div key={i} className={`p-3 flex justify-between items-center ${isProxima ? 'bg-yellow-50' : isPaga ? 'bg-green-50' : ''}`}>
                            <div>
                              <p className={`font-medium ${isPaga ? 'text-green-600' : isProxima ? 'text-yellow-600' : 'text-gray-800'}`}>
                                {numeroParcela}ª parcela {isPaga ? '✓' : isProxima ? '→' : ''}
                              </p>
                              <p className="text-xs text-gray-600">Dia {diaVencimento} ({formatarDiaJogo(diaVencimento)})</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-800">
                                R$ {activeLoan.valorParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
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
                          R$ {activeLoan.valorOriginal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div>
                        <p className="text-blue-600 text-xs">Juros Total</p>
                        <p className="font-semibold text-blue-800">
                          R$ {activeLoan.jurosTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div>
                        <p className="text-blue-600 text-xs">Início</p>
                        <p className="font-semibold text-blue-800">Dia {activeLoan.diaInicio}</p>
                      </div>
                      <div>
                        <p className="text-blue-600 text-xs">Fim</p>
                        <p className="font-semibold text-blue-800">Dia {activeLoan.dataFinal}</p>
                      </div>
                    </div>
                  </div>

                  <button onClick={handlePayEarly} className="w-full text-white py-3 rounded-lg font-semibold transition-colors"
                    style={{ backgroundColor: contrato1.cor2 }}>
                    Pagar Antecipado (Liquidar Dívida)
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {currentTab === 'investments' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 scrollbar-custom rounded-xl p-6 max-h-[65vh] overflow-y-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: contrato1.cor2 }}>
                  <TrendingUp className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Novo Investimento</h3>
                  <p className="text-gray-600 text-sm">Escolha a melhor opção</p>
                </div>
              </div>

              <div className="p-4 rounded-lg" style={{ backgroundColor: contrato1.cor3 }}>
                <p className="text-3xl font-bold text-white">
                  R$ {saldoBancario.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-white opacity-90">Saldo disponível para investir</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Investimento</label>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setInvestmentType('pos')}
                    className={`p-4 rounded-lg border-2 transition-all ${investmentType === 'pos' ? 'text-white border-transparent' : 'text-gray-700 border-gray-300 hover:border-gray-400'}`}
                    style={investmentType === 'pos' ? { backgroundColor: contrato1.cor3 } : {}}>
                    <div className="font-semibold">Pós-fixado</div>
                    <div className="text-xs mt-1 opacity-90">Liquidez diária</div>
                  </button>
                  <button onClick={() => setInvestmentType('pre')}
                    className={`p-4 rounded-lg border-2 transition-all ${investmentType === 'pre' ? 'text-white border-transparent' : 'text-gray-700 border-gray-300 hover:border-gray-400'}`}
                    style={investmentType === 'pre' ? { backgroundColor: contrato1.cor3 } : {}}>
                    <div className="font-semibold">Pré-fixado</div>
                    <div className="text-xs mt-1 opacity-90">Maior retorno</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Valor do Investimento</label>
                <input type="number" min="0" max={saldoBancario} value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Math.min(Number(e.target.value), saldoBancario))}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                  placeholder={`Máx: R$ ${saldoBancario.toLocaleString('pt-BR')}`} />
              </div>

              {investmentType === 'pre' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prazo de Resgate</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[90, 180, 360].map(days => {
                      const taxa = ((getPreFixedReturn(1000, days) / 1000) * 100).toFixed(2);
                      return (
                        <button key={days} onClick={() => setInvestmentDays(days)}
                          className={`p-3 rounded-lg border-2 transition-colors ${investmentDays === days ? 'text-white border-transparent' : 'text-gray-700 border-gray-300 hover:border-gray-400'}`}
                          style={investmentDays === days ? { backgroundColor: contrato1.cor3 } : {}}>
                          <div className="font-semibold">{days} dias</div>
                          <div className="text-xs mt-1">+{taxa}%</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="p-4 rounded-lg" style={{ backgroundColor: '#f8f9fa', borderLeft: `4px solid ${contrato1.cor3}` }}>
                <p className="text-sm text-gray-600 mb-2">
                  {investmentType === 'pos' 
                    ? `Rendimento Mensal: ${(getPosTaxaMensal() * 100).toFixed(2)}%` 
                    : `Rendimento Total: ${((getPreFixedReturn(1000, investmentDays) / 1000) * 100).toFixed(2)}%`}
                </p>
                <p className="text-lg font-bold" style={{ color: contrato1.cor3 }}>
                  Retorno estimado: R${' '}
                  {investmentType === 'pos'
                    ? (investmentAmount * getPosTaxaMensal()).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
                    : getPreFixedReturn(investmentAmount, investmentDays).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                {investmentType === 'pos' && (
                  <p className="text-xs text-gray-500 mt-1">Pode adicionar ou retirar a qualquer momento</p>
                )}
                {investmentType === 'pre' && (
                  <p className="text-xs text-gray-500 mt-1">Resgate antecipado: perda de 10% + sem rendimentos</p>
                )}
              </div>

              <button onClick={handleInvest}
                className={`w-full text-white py-3 rounded-lg font-semibold transition-colors ${investmentAmount <= 0 || investmentAmount > saldoBancario ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{ backgroundColor: contrato1.cor3 }} disabled={investmentAmount <= 0 || investmentAmount > saldoBancario}>
                Investir Agora
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
              <h3 className="font-bold text-gray-800 mb-4">Meus Investimentos</h3>
              {activeInvestments.map(inv => {
                const diasDecorridos = diaAtualJogo - inv.diaInicio;
                const mesesCompletos = Math.floor(diasDecorridos / 30);
                const isMatured = inv.type === 'pre' && diaAtualJogo >= inv.diaVencimento;
                const taxaMensalPos = getPosTaxaMensal();
                
                let jurosGanhos, valorTotalResgate, percentualRendimento;
                
                if (inv.type === 'pos') {
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
                
                const diasRestantes = inv.type === 'pre' && !isMatured ? inv.diaVencimento - diaAtualJogo : 0;

                return (
                  <div key={inv.id} className="p-4 border-2 border-gray-200 rounded-lg transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-semibold text-gray-800">
                          {inv.type === 'pos' ? 'Pós-fixado' : 'Pré-fixado'}
                        </span>
                        {inv.type === 'pre' && (
                          <span className="ml-2 text-xs px-2 py-1 rounded" style={{ backgroundColor: isMatured ? '#4CAF50' : '#FFA726', color: 'white' }}>
                            {isMatured ? 'Vencido' : `${inv.days} dias`}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-2xl font-bold" style={{ color: contrato1.cor3 }}>
                      R$ {inv.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-gray-500">Valor investido</p>

                    <div className="mt-3 p-3 bg-gray-50 rounded-lg space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Rendimento:</span>
                        <span className={`font-semibold ${percentualRendimento >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                          {percentualRendimento >= 0 ? '+' : ''}{percentualRendimento.toFixed(2)}%
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Juros ganhos:</span>
                        <span className={`font-semibold ${jurosGanhos >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {jurosGanhos >= 0 ? '+' : ''} R$ {Math.abs(jurosGanhos).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                        <span className="text-gray-600 font-medium">Valor a receber:</span>
                        <span className="font-bold text-lg" style={{ color: inv.type === 'pre' && !isMatured ? '#d32f2f' : '#0C9123' }}>
                          R$ {valorTotalResgate.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>

                      {inv.type === 'pos' && (
                        <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                          <span className="text-gray-600">Meses decorridos:</span>
                          <span className="font-semibold text-gray-800">{mesesCompletos} meses</span>
                        </div>
                      )}

                      {inv.type === 'pre' && !isMatured && (
                        <>
                          <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                            <span className="text-gray-600">Faltam:</span>
                            <span className="font-semibold text-orange-600">
                              {diasRestantes} dias (Dia {inv.diaVencimento})
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Início:</span>
                            <span className="font-medium text-gray-700">Dia {inv.diaInicio}</span>
                          </div>
                          <div className="text-xs text-red-600 mt-2 p-2 bg-red-50 rounded">
                            ⚠️ Resgate antecipado: perde 10% do valor investido + sem rendimentos
                          </div>
                        </>
                      )}

                      {inv.type === 'pre' && isMatured && (
                        <div className="text-center pt-2 border-t border-gray-200">
                          <span className="text-xs text-green-600 font-medium">
                            ✓ Investimento vencido (Dia {inv.diaVencimento}) - Resgate disponível
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 mt-3">
                      {inv.type === 'pos' && (
                        <button onClick={() => handleAddFunds(inv.id)}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium transition-colors text-sm">
                          + Adicionar
                        </button>
                      )}
                      <button onClick={() => handleWithdraw(inv.id)}
                        className="flex-1 text-white py-2 rounded-lg font-medium transition-colors text-sm"
                        style={{ backgroundColor: inv.type === 'pre' && !isMatured ? '#d32f2f' : '#0C9123' }}>
                        {inv.type === 'pre' && !isMatured ? 'Resgatar (-10%)' : 'Resgatar'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {currentTab === 'cashback' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-800 mb-4">Seu Cartão</h3>
                <div className="flex justify-center mb-4">
                  {contrato1 && renderCartao(contratoParaCartao(contrato1, dados))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-800 mb-4">Informações do Cartão</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Limite Atual:</span>
                    <span className="font-bold text-lg" style={{ color: contrato1.cor3 }}>
                      R$ {cardData.limit.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Limite Disponível:</span>
                    <span className="font-bold text-lg text-green-600">
                      R$ {cardData.available.toLocaleString('pt-BR')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                    <span className="text-gray-600">Fatura Atual:</span>
                    <span className="font-bold text-lg text-red-600">
                      R$ {cardData.faturaAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Próximo Aumento de Limite</h4>
                    <p className="text-sm text-blue-700 mb-1">
                      Quando seu patrimônio atingir <span className="font-bold">R$ {proximoAumentoLimite.patrimonioNecessario.toLocaleString('pt-BR')}</span>
                    </p>
                    <p className="text-sm text-blue-700">
                      Seu novo limite será: <span className="font-bold">R$ {proximoAumentoLimite.novoLimite.toLocaleString('pt-BR')}</span>
                    </p>
                    <div className="mt-3 bg-white rounded p-2">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Patrimônio Atual: R$ {patrimonio.toLocaleString('pt-BR')}</span>
                        <span>{((patrimonio / proximoAumentoLimite.patrimonioNecessario) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="h-2 rounded-full bg-blue-600 transition-all"
                          style={{ width: `${Math.min((patrimonio / proximoAumentoLimite.patrimonioNecessario) * 100, 100)}%` }}>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: contrato1.cor2 }}>
                    <Gift className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Cashback Acumulado</h3>
                    <p className="text-gray-600 text-sm">Seus benefícios</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-center p-4 rounded-lg" style={{ background: `linear-gradient(135deg, ${contrato1.cor4}, ${contrato1.cor3})` }}>
                    <p className="text-sm text-white opacity-90">Este Mês</p>
                    <p className="text-3xl font-bold text-white">
                      R$ {cashbackData.currentMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>

                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Acumulado</p>
                    <p className="text-2xl font-bold text-gray-800">
                      R$ {cashbackData.accumulated.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-3">Configuração do Cashback</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tipo:</span>
                        <span className="font-semibold text-gray-800 capitalize">
                          {cashbackData.tipo === 'nenhum' ? 'Sem cashback' : cashbackData.tipo === 'todos' ? 'Todas compras' : `Setor: ${cashbackData.setor}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Percentual:</span>
                        <span className="font-semibold" style={{ color: '#0C9123' }}>{cashbackData.percentual}%</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full text-white py-3 rounded-lg font-semibold transition-colors"
                    style={{ backgroundColor: contrato1.cor3 }} disabled={cashbackData.accumulated === 0}>
                    Resgatar Cashback
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-800 mb-4">Próximo Resgate</h3>
                <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: '#f1f8e9', borderLeft: `4px solid ${contrato1.cor4}` }}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700">Disponível em:</span>
                    <span className="text-2xl font-bold" style={{ color: contrato1.cor3 }}>
                      {cashbackData.daysUntilWithdrawal} dias
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Todo mês você pode resgatar seu cashback acumulado</p>
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