import React, { useState, useContext } from 'react';
import { ChevronLeft, ChevronRight, DollarSign, Calendar, CreditCard, AlertCircle } from 'lucide-react';
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";

const LoanCarousel = () => {
  const { dados } = useContext(CentraldeDadosContext);
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const diaAtualJogo = dados.dia || 1000;
  const saldoAtual = economiaSetores?.saldo ?? 0;
  const contratosBancos = economiaSetores?.contratosBancos || [];
  const activeLoans = economiaSetores?.activeLoans || {};
  const availableLoans = economiaSetores?.availableLoans || {};

  // Filtra apenas contratos válidos (não null) que têm empréstimos ativos
  const contratosComEmprestimos = contratosBancos
    .map((contrato, index) => ({
      contrato,
      index,
      loan: activeLoans[index] || null
    }))
    .filter(({ contrato, loan }) => contrato !== null && loan !== null);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? contratosComEmprestimos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === contratosComEmprestimos.length - 1 ? 0 : prev + 1));
  };

  const handlePayInstallment = (contratoIndex) => {
    const activeLoan = activeLoans[contratoIndex];
    if (!activeLoan) return;

    const valorParcela = activeLoan.valorParcela ?? 0;
    const vencimento = activeLoan.proximoVencimento;

    // Validações
    if (diaAtualJogo < vencimento || saldoAtual < valorParcela) return;

    // Desconta o valor da parcela
    const novoSaldo = saldoAtual - valorParcela;
    atualizarEco("saldo", novoSaldo);

        atualizarEco("despesasEmprestimo", {
          ...economiaSetores.despesas,
          diaPagarDespesas: true,
          despesasPagas: true,
          proximoPagamento: "30",
        });


    const parcelaAntes = activeLoan.parcelaAtual || 1;
    const novoSaldoDevedor = Math.max(
      0,
      (activeLoan.saldoDevedor ?? activeLoan.totalComJuros) - valorParcela
    );

    // Se foi a última parcela, quita o empréstimo
    if (parcelaAntes >= activeLoan.parcelas) {
      const novosLoans = { ...activeLoans };
      delete novosLoans[contratoIndex];
      atualizarEco("activeLoans", novosLoans);

      // Restaura o limite disponível
      const availableLoan = availableLoans[contratoIndex] ?? 0;
      atualizarEco("availableLoans", {
        ...availableLoans,
        [contratoIndex]: availableLoan + activeLoan.valorOriginal,
      });
    } else {
      // Atualiza para próxima parcela
      atualizarEco("activeLoans", {
        ...activeLoans,
        [contratoIndex]: {
          ...activeLoan,
          parcelaAtual: parcelaAntes + 1,
          saldoDevedor: novoSaldoDevedor,
          proximoVencimento: vencimento + 30,
        },
      });
    }
  };

  // Se não há empréstimos ativos
  if (contratosComEmprestimos.length === 0) {
    return (
      <div className="w-full bg-gradient-to-br from-[#290064] to-[#350973] rounded-3xl min-h-[220px] p-6 flex items-center justify-center shadow-2xl">
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <div className="p-3 rounded-full bg-white/10">
              <AlertCircle className="text-gray-300" size={32} />
            </div>
          </div>
          <p className="text-xl font-bold text-gray-300">Nenhum empréstimo ativo</p>
          <p className="text-sm text-gray-400 mt-2">Você está livre de dívidas!</p>
        </div>
      </div>
    );
  }

  const { contrato: currentContrato, index: currentContratoIndex, loan: currentLoan } = contratosComEmprestimos[currentIndex];

  const podeAbrirPagamento = () => {
    if (!currentLoan) return false;
    return diaAtualJogo >= currentLoan.proximoVencimento && saldoAtual >= currentLoan.valorParcela;
  };

  const getStatusMensagem = () => {
    if (!currentLoan) return '';
    if (diaAtualJogo < currentLoan.proximoVencimento) {
      const diasRestantes = currentLoan.proximoVencimento - diaAtualJogo;
      return `Vence em ${diasRestantes} ${diasRestantes === 1 ? 'dia' : 'dias'}`;
    }
    if (saldoAtual < currentLoan.valorParcela) {
      return 'Saldo insuficiente';
    }
    return 'Pagamento disponível';
  };

  const isAtrasado = currentLoan && diaAtualJogo > currentLoan.proximoVencimento;
  const isProximoVencimento = currentLoan && (currentLoan.proximoVencimento - diaAtualJogo) <= 5 && (currentLoan.proximoVencimento - diaAtualJogo) > 0;

  return (
    <div className="w-full relative">
      <div
        className="rounded-3xl min-h-[220px] p-6 shadow-2xl relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${currentContrato.cor1} 0%, ${currentContrato.cor3} 100%)`,
        }}
      >
        {/* Background decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full -ml-16 -mb-16" />
        </div>

        {/* Alerta de atraso */}
        {isAtrasado && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse z-10">
            ⚠️ ATRASADO
          </div>
        )}

        {/* Alerta de vencimento próximo */}
        {isProximoVencimento && !isAtrasado && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-yellow-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full animate-pulse z-10">
            ⏰ VENCE EM BREVE
          </div>
        )}

        {/* Conteúdo */}
        <div className="relative h-full flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                <CreditCard className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">{currentContrato.bancoNome}</h3>
                <p className="text-white/80 text-xs">{currentContrato.cartaoNome}</p>
              </div>
            </div>
            
            {/* Indicador de contratos - só aparece se tiver mais de 1 */}
            {contratosComEmprestimos.length > 1 && (
              <div className="flex gap-1">
                {contratosComEmprestimos.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentIndex ? 'bg-white w-4' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Conteúdo da fatura */}
          <div className="flex-1 flex flex-col justify-center mt-2">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
              <p className="text-white/70 text-xs mb-1">Próxima parcela</p>
              <p className="text-3xl font-bold text-white mb-3">
                R$ {currentLoan.valorParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              
              <div className="space-y-2 mb-3">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1 text-white/80">
                    <Calendar size={12} />
                    <span>Vencimento:</span>
                  </div>
                  <span className="font-semibold text-white">
                    Dia {currentLoan.proximoVencimento}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/80">Parcela:</span>
                  <span className="font-semibold text-white">
                    {currentLoan.parcelaAtual}/{currentLoan.parcelas}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs pb-2 border-b border-white/20">
                  <span className="text-white/80">Saldo devedor:</span>
                  <span className="font-semibold text-white">
                    R$ {currentLoan.saldoDevedor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handlePayInstallment(currentContratoIndex)}
                disabled={!podeAbrirPagamento()}
                className={`w-full py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm ${
                  podeAbrirPagamento()
                    ? 'bg-white text-gray-800 hover:scale-[1.02] hover:shadow-lg'
                    : 'bg-white/20 text-white/50 cursor-not-allowed'
                }`}
              >
                <DollarSign size={16} />
                {getStatusMensagem()}
              </button>
            </div>
          </div>
        </div>

        {/* Botões de navegação - só aparecem se tiver mais de 1 empréstimo */}
        {contratosComEmprestimos.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all"
            >
              <ChevronLeft className="text-white" size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all"
            >
              <ChevronRight className="text-white" size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoanCarousel;