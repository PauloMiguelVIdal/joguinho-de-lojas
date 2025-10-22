import { useState, useRef, useEffect } from "react";
import {
    CreditCard,
    DollarSign,
    TrendingUp,
    Gift,
    BarChart3,
    Building2,
    AlertCircle,
    CheckCircle,
    Clock,
    Target,
    Wallet,
    X,
    Calendar,
    ArrowUpRight
} from "lucide-react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Legend,
  LineController,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
LineController,
 Tooltip,
  Filler,
  Legend
);



const CorporateFinanceInterface = () => {
    const [currentTab, setCurrentTab] = useState('overview');
    const chartRef = useRef(null);
    const liquidityChartRef = useRef(null);
    const chartInstance = useRef(null);
    const liquidityChartInstance = useRef(null);

    // Dados corporativos mockados
    const overviewData = {
        netProfit: 1250000,
        cashFlow: 223000,
        trend: 20,
        debt: 40
    };

    const bankRelationsData = [
        {
            name: "Banco Safra",
            affinity: 70,
            daysRemaining: 300,
            benefits: ["Cashback 3%", "-1% juros"],
            color: "#0066cc"
        },
        {
            name: "Banco Santander",
            affinity: 50,
            daysRemaining: 180,
            benefits: ["Crédito rápido", "Invest. Exclusivo"],
            color: "#e60000"
        },
        {
            name: "Banco BTG",
            affinity: 30,
            daysRemaining: 90,
            benefits: ["Melhor rendimento", "Tech Focus"],
            color: "#000000"
        }
    ];

    const monthlyPaymentsData = [
        {
            bank: "Banco Safra",
            amount: 25000,
            dueDate: "15/10/2025"
        },
        {
            bank: "Banco Santander",
            amount: 18500,
            dueDate: "22/10/2025"
        }
    ];

    const loanData = [
        {
            bank: "Banco Safra",
            amount: 500000,
            installmentsCurrent: 10,
            installmentsTotal: 24,
            interestRate: 12
        },
        {
            bank: "Banco Santander",
            amount: 200000,
            installmentsCurrent: 3,
            installmentsTotal: 12,
            interestRate: 8
        }
    ];

    const investmentData = [
        {
            type: "Renda Fixa - Prazo",
            invested: 150000,
            monthlyReturn: 5,
            daysToWithdraw: 60,
            hasDeadline: true,
            description: "Resgate em 60 dias - 5% ao mês"
        },
        {
            type: "Setor Tech - Flexível",
            invested: 300000,
            monthlyReturn: 3,
            daysToWithdraw: null,
            hasDeadline: false,
            description: "3% ao mês - Resgate a qualquer momento"
        }
    ];

    const cashbackData = {
        available: 1200,
        totalRedeemed: 3800,
        nextCycleProjection: 500,
        banks: [
            { name: "Banco Safra", amount: 450 },
            { name: "Banco Santander", amount: 380 },
            { name: "Banco BTG", amount: 370 }
        ]
    };

    // Criar gráfico de faturamento vs despesas
    useEffect(() => {
        if (currentTab === 'overview' && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');

            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            chartInstance.current = new Chart.Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                    datasets: [
                        {
                            label: 'Faturamento',
                            data: [820000, 850000, 780000, 920000, 880000, 950000, 1000000, 980000, 1100000, 1050000, 1200000, 1250000],
                            borderColor: '#00FF88',
                            backgroundColor: 'rgba(0, 255, 136, 0.1)',
                            tension: 0.4,
                            fill: true,
                            pointRadius: 0,
                            pointHoverRadius: 6,
                            borderWidth: 3
                        },
                        {
                            label: 'Despesas',
                            data: [650000, 680000, 620000, 720000, 680000, 750000, 800000, 780000, 850000, 820000, 900000, 950000],
                            borderColor: '#FF4081',
                            backgroundColor: 'rgba(255, 64, 129, 0.1)',
                            tension: 0.4,
                            fill: true,
                            pointRadius: 0,
                            pointHoverRadius: 6,
                            borderWidth: 3
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                usePointStyle: true,
                                padding: 20,
                                color: '#C79FFF'
                            }
                        }
                    },
                    scales: {
                        x: {
                            display: true,
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: '#C79FFF',
                                font: {
                                    size: 10
                                }
                            },
                            border: {
                                display: false
                            }
                        },
                        y: {
                            display: true,
                            position: 'right',
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: '#C79FFF',
                                font: {
                                    size: 10
                                },
                                callback: function (value) {
                                    return 'R$ ' + (value / 1000) + 'k';
                                }
                            },
                            border: {
                                display: false
                            }
                        }
                    },
                    elements: {
                        point: {
                            radius: 0,
                            hoverRadius: 6
                        }
                    }
                }
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [currentTab]);

    // Criar gráfico de liquidez
    useEffect(() => {
        if (currentTab === 'overview' && liquidityChartRef.current) {
            const ctx = liquidityChartRef.current.getContext('2d');

            if (liquidityChartInstance.current) {
                liquidityChartInstance.current.destroy();
            }

            liquidityChartInstance.current = new Chart.Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                    datasets: [
                        {
                            label: 'Lucro Líquido',
                            data: [120000, 140000, 110000, 180000, 160000, 190000, 220000, 200000, 250000, 230000, 280000, 300000],
                            borderColor: '#00BFFF',
                            backgroundColor: 'rgba(0, 191, 255, 0.2)',
                            tension: 0.4,
                            fill: true,
                            pointRadius: 0,
                            pointHoverRadius: 6,
                            borderWidth: 3
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            display: true,
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: '#C79FFF',
                                font: {
                                    size: 10
                                }
                            },
                            border: {
                                display: false
                            }
                        },
                        y: {
                            display: true,
                            position: 'right',
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: '#C79FFF',
                                font: {
                                    size: 10
                                },
                                callback: function (value) {
                                    return 'R$ ' + (value / 1000) + 'k';
                                }
                            },
                            border: {
                                display: false
                            }
                        }
                    },
                    elements: {
                        point: {
                            radius: 0,
                            hoverRadius: 6
                        }
                    }
                }
            });
        }

        return () => {
            if (liquidityChartInstance.current) {
                liquidityChartInstance.current.destroy();
            }
        };
    }, [currentTab]);

    const TabButton = ({ id, label, icon: Icon, active, onClick }) => (
        <button
            onClick={() => onClick(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${active ? 'text-white shadow-lg bg-white/20 backdrop-blur-md border border-white/30' : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white backdrop-blur-md'
                }`}
        >
            <Icon size={18} />
            {label}
        </button>
    );

    const ProgressBar = ({ percentage, color }) => (
        <div className="w-full bg-white/20 rounded-full h-2">
            <div
                className="h-2 rounded-full transition-all duration-1000"
                style={{
                    width: `${percentage}%`,
                    backgroundColor: color
                }}
            ></div>
        </div>
    );

    return (
        <div
            className="h-full w-full rounded-[20px] p-6"
            style={{
                background: `linear-gradient(135deg, #290064 0%, #350973 25%, #4C14A9 50%, #6A00FF 75%, #934CFF 100%)`
            }}
        >
            <div className="w-full flex flex-col justify-around">
                <header className="mb-3">
                    <h1 className="text-3xl font-bold text-white mb-2">GESTÃO FINANCEIRA CORPORATIVA</h1>
                </header>

                {/* Navigation Tabs */}
                <div className="flex flex-wrap gap-3 mb-5">
                    <TabButton id="overview" label="Visão Geral" icon={BarChart3} active={currentTab === 'overview'} onClick={setCurrentTab} />
                    {/* <TabButton id="banking" label="Relações Bancárias" icon={Building2} active={currentTab === 'banking'} onClick={setCurrentTab} /> */}
                    <TabButton id="loans" label="Empréstimos" icon={DollarSign} active={currentTab === 'loans'} onClick={setCurrentTab} />
                    <TabButton id="investments" label="Investimentos" icon={TrendingUp} active={currentTab === 'investments'} onClick={setCurrentTab} />
                    {/* <TabButton id="cashback" label="Cashback" icon={Gift} active={currentTab === 'cashback'} onClick={setCurrentTab} /> */}
                </div>

                {/* Overview Tab */}
                {currentTab === 'overview' && (
                    <div className=" border border-white/20 rounded-xl p-6  overflow-y-auto max-h-[65vh] scrollbar-custom flex flex-col gap-6">

                        {/* KPI Cards - 2x2 Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-lg">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 rounded-lg bg-green-500/80 backdrop-blur-sm">
                                            <Target className="text-white" size={20} />
                                        </div>
                                        <span className="text-sm font-medium text-white/80">LUCRO LÍQUIDO</span>
                                    </div>
                                    <p className="text-2xl font-bold text-white">
                                        {overviewData.netProfit.toLocaleString('pt-BR')}
                                    </p>
                                </div>

                                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-lg">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 rounded-lg bg-blue-500/80 backdrop-blur-sm">
                                            <Wallet className="text-white" size={20} />
                                        </div>
                                        <span className="text-sm font-medium text-white/80">FLUXO DE CAIXA</span>
                                    </div>
                                    <p className="text-2xl font-bold text-green-300">
                                        + {overviewData.cashFlow.toLocaleString('pt-BR')}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-lg">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 rounded-lg bg-purple-500/80 backdrop-blur-sm">
                                            <TrendingUp className="text-white" size={20} />
                                        </div>
                                        <span className="text-sm font-medium text-white/80">TENDÊNCIA</span>
                                    </div>
                                    <p className="text-2xl font-bold text-green-300">+ {overviewData.trend}%</p>
                                </div>

                                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-lg">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 rounded-lg bg-orange-500/80 backdrop-blur-sm">
                                            <AlertCircle className="text-white" size={20} />
                                        </div>
                                        <span className="text-sm font-medium text-white/80">ENDIVIDAMENTO</span>
                                    </div>
                                    <p className="text-2xl font-bold text-orange-300">{overviewData.debt}%</p>
                                </div>
                            </div>
                        </div>

                        {/* Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
                                <h3 className="font-bold text-white mb-4">FATURAMENTO X DESPESAS</h3>
                                <div className="h-64">
                                    <canvas ref={chartRef}></canvas>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
                                <h3 className="font-bold text-white mb-4">LUCRO LÍQUIDO</h3>
                                <div className="h-64">
                                    <canvas ref={liquidityChartRef}></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Banking Relations Tab */}
                {currentTab === 'banking' && (
                    <div className=" border border-white/20 rounded-xl p-6  overflow-y-auto max-h-[65vh] scrollbar-custom flex flex-col gap-6">
                        <h3 className="font-bold text-white mb-6 text-xl">Contratos e Relacionamentos Bancários</h3>

                        <div className="space-y-6">
                            {bankRelationsData.map((bank, index) => (
                                <div key={index} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="text-xl font-bold text-white">{bank.name}</h4>
                                            <p className="text-white/70">Contrato válido por {bank.daysRemaining} dias</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <span className="text-sm text-white/70">Afinidade</span>
                                                <p className="text-2xl font-bold text-white">{bank.affinity}%</p>
                                            </div>
                                            <button className="flex items-center gap-2 px-4 py-2 bg-red-500/80 hover:bg-red-600/80 text-white rounded-lg transition-colors backdrop-blur-sm">
                                                <X size={16} />
                                                Encerrar Contrato
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm text-white/70">Relacionamento</span>
                                            <span className="text-sm text-white">{bank.affinity}%</span>
                                        </div>
                                        <ProgressBar percentage={bank.affinity} color={bank.color} />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-white/80 mb-2">Benefícios:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {bank.benefits.map((benefit, idx) => (
                                                <span key={idx} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white">
                                                    {benefit}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="mt-6 p-4 bg-purple-500/20 backdrop-blur-sm border border-purple-300/30 rounded-lg">
                                <p className="font-semibold text-white">
                                    Ranking: Banco Safra &gt; Banco Santander &gt; Banco BTG
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Loans Tab */}
                {currentTab === 'loans' && (
                    <div className=" border border-white/20 rounded-xl p-6  overflow-y-auto max-h-[65vh] scrollbar-custom flex flex-col gap-6">

                        {/* Container 1: Pagamentos deste mês e métricas */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Coluna Esquerda: Pagamentos deste mês */}
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
                                <h3 className="font-bold text-white mb-6 text-xl">Pagamentos deste Mês</h3>

                                <div className="space-y-4">
                                    {monthlyPaymentsData.map((payment, index) => (
                                        <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h4 className="font-semibold text-white">{payment.bank}</h4>
                                                    <p className="text-sm text-white/70">Vencimento: {payment.dueDate}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold text-red-300">
                                                        R$ {payment.amount.toLocaleString('pt-BR')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Coluna Direita: Métricas */}
                            <div className="space-y-4">
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
                                    <h4 className="font-semibold text-white/80 mb-2">% Receita Comprometida</h4>
                                    <p className="text-3xl font-bold text-orange-300">25%</p>
                                </div>

                                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
                                    <h4 className="font-semibold text-white/80 mb-2">Tempo Médio Quitação</h4>
                                    <p className="text-3xl font-bold text-blue-300">14 meses</p>
                                </div>

                                <div className="bg-red-500/20 backdrop-blur-md border border-red-300/30 rounded-xl p-6 shadow-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <AlertCircle className="text-red-300" size={20} />
                                        <h4 className="font-semibold text-red-300">ALERTA</h4>
                                    </div>
                                    <p className="text-sm text-red-200">Acima de 30% do faturamento mensal!</p>
                                </div>
                            </div>
                        </div>

                        {/* Container 2: Empréstimos ativos - largura completa */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
                            <h3 className="font-bold text-white mb-6 text-xl">Empréstimos Ativos</h3>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b-2 border-white/20">
                                            <th className="text-left py-3 px-2 font-semibold text-white/80">Banco</th>
                                            <th className="text-right py-3 px-2 font-semibold text-white/80">Valor</th>
                                            <th className="text-center py-3 px-2 font-semibold text-white/80">Parc. Rest.</th>
                                            <th className="text-right py-3 px-2 font-semibold text-white/80">Juros</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loanData.map((loan, index) => (
                                            <tr key={index} className="border-b border-white/10">
                                                <td className="py-4 px-2 font-medium text-white">{loan.bank}</td>
                                                <td className="py-4 px-2 text-right font-bold text-white">
                                                    R$ {loan.amount.toLocaleString('pt-BR')}
                                                </td>
                                                <td className="py-4 px-2 text-center">
                                                    <span className="px-2 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full text-sm text-white">
                                                        {loan.installmentsCurrent}/{loan.installmentsTotal}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-2 text-right font-semibold text-red-300">
                                                    {loan.interestRate}%
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Investments Tab */}
                {currentTab === 'investments' && (
                        <div className=" border border-white/20 rounded-xl p-6  overflow-y-auto max-h-[65vh] scrollbar-custom flex flex-col gap-6">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
                            <h3 className="font-bold text-white mb-6 text-xl">Portfólio de Investimentos</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                {investmentData.map((investment, index) => (
                                    <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="text-lg font-bold text-white">{investment.type}</h4>
                                                <p className="text-sm text-white/70">{investment.description}</p>
                                            </div>
                                            {investment.hasDeadline && (
                                                <div className="flex items-center gap-2 px-3 py-1 bg-orange-500/20 backdrop-blur-sm rounded-full">
                                                    <Calendar size={16} className="text-orange-300" />
                                                    <span className="text-sm text-orange-300">{investment.daysToWithdraw} dias</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                                                <p className="text-sm text-white/70">Valor Investido</p>
                                                <p className="text-2xl font-bold text-white">
                                                    R$ {investment.invested.toLocaleString('pt-BR')}
                                                </p>
                                            </div>

                                            <div className="p-3 bg-green-500/20 backdrop-blur-sm rounded-lg">
                                                <p className="text-sm text-white/70">Rendimento</p>
                                                <p className="text-xl font-bold text-green-300">
                                                    {investment.monthlyReturn}% ao mês
                                                </p>
                                            </div>

                                            <button className="w-full bg-green-500/80 hover:bg-green-600/80 text-white py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm flex items-center justify-center gap-2">
                                                <ArrowUpRight size={20} />
                                                {investment.hasDeadline ?
                                                    `Resgatar em ${investment.daysToWithdraw} dias` :
                                                    "Resgatar Agora"
                                                }
                                            </button>

                                            {!investment.hasDeadline && (
                                                <div className="p-2 bg-yellow-500/20 backdrop-blur-sm rounded-lg">
                                                    <p className="text-xs text-yellow-200">
                                                        ⚠️ Resgate antes do fim do mês: sem rendimento mensal
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 bg-green-500/20 backdrop-blur-sm border border-green-300/30 rounded-lg text-center">
                                    <p className="text-sm text-white/70">Rentabilidade Média</p>
                                    <p className="text-2xl font-bold text-green-300">4,0%</p>
                                </div>

                                <div className="p-4 bg-blue-500/20 backdrop-blur-sm border border-blue-300/30 rounded-lg text-center">
                                    <p className="text-sm text-white/70">Melhor Banco</p>
                                    <p className="text-lg font-bold text-blue-300">Banco BTG (5%)</p>
                                </div>

                                <div className="p-4 bg-purple-500/20 backdrop-blur-sm border border-purple-300/30 rounded-lg text-center">
                                    <p className="text-sm text-white/70">Projeção 90 dias</p>
                                    <p className="text-2xl font-bold text-purple-300">+R$ 13.500</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Cashback Tab */}
                {currentTab === 'cashback' && (
                                           <div className=" border border-white/20 rounded-xl p-6  overflow-y-auto max-h-[65vh] scrollbar-custom flex flex-col gap-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="p-4 bg-green-500/20 backdrop-blur-sm border border-green-300/30 rounded-lg">
                                        <p className="text-sm text-white/70">Saldo Disponível</p>
                                        <p className="text-3xl font-bold text-green-300">
                                            R$ {cashbackData.available.toLocaleString('pt-BR')}
                                        </p>
                                    </div>

                                    <div className="p-4 bg-blue-500/20 backdrop-blur-sm border border-blue-300/30 rounded-lg">
                                        <p className="text-sm text-white/70">Resgatado Total</p>
                                        <p className="text-2xl font-bold text-blue-300">
                                            R$ {cashbackData.totalRedeemed.toLocaleString('pt-BR')}
                                        </p>
                                    </div>

                                    <div className="p-4 bg-purple-500/20 backdrop-blur-sm border border-purple-300/30 rounded-lg">
                                        <p className="text-sm text-white/70">Projeção Próximo Ciclo</p>
                                        <p className="text-2xl font-bold text-purple-300">
                                            R$ {cashbackData.nextCycleProjection.toLocaleString('pt-BR')}
                                        </p>
                                    </div>

                                    <button className="w-full bg-green-500/80 hover:bg-green-600/80 text-white py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm">
                                        Resgatar Agora
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
                                <h4 className="font-bold text-white mb-4">Cashback por Banco</h4>
                                <div className="space-y-4">
                                    {cashbackData.banks.map((bank, index) => (
                                        <div key={index} className="flex justify-between items-center p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                                            <span className="font-medium text-white">{bank.name}</span>
                                            <span className="font-bold text-green-300">
                                                R$ {bank.amount.toLocaleString('pt-BR')}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 p-4 bg-blue-500/20 backdrop-blur-sm border border-blue-300/30 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="text-blue-300" size={20} />
                                        <span className="font-semibold text-blue-300">Dica Estratégica</span>
                                    </div>
                                    <p className="text-sm text-blue-200">
                                        Concentre gastos no Banco Safra para maximizar o cashback corporativo
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

export default CorporateFinanceInterface;