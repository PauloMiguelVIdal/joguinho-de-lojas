// RelatorioFinal.jsx - Com animações melhoradas e tempo prolongado
import React, { useState, useEffect, useCallback, useMemo, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { Line } from "react-chartjs-2";
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
  Filler,
  Legend,
  LineController
);

// ─── CONSTANTES ──────────────────────────────────────────────────
const SETORES_ARR = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

const SETORES_NOMES = {
  agricultura: "🌾 Agricultura",
  tecnologia: "💻 Tecnologia",
  comercio: "🛒 Comércio",
  industria: "🏭 Indústria",
  imobiliario: "🏢 Imobiliário",
  energia: "⚡ Energia"
};

// ─── FUNÇÕES AUXILIARES ─────────────────────────────────────────
const formatarNumero = (num) => {
  if (num >= 1e12) return (num / 1e12).toFixed(1).replace(".0", "") + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(1).replace(".0", "") + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(1).replace(".0", "") + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1).replace(".0", "") + "K";
  return num.toString();
};

// ─── COMPONENTE PRINCIPAL ──────────────────────────────────────
export default function RelatorioFinal({ onClose }) {
  const { dados } = useContext(CentraldeDadosContext);
  const { economiaSetores } = useContext(DadosEconomyGlobalContext);

  // ─── ESTADOS ──────────────────────────────────────────────────
  const [fase, setFase] = useState("capa");
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [mostrarRelatorio, setMostrarRelatorio] = useState(false);
  const [progressoAbertura, setProgressoAbertura] = useState(0);

  // ─── NOME DA EMPRESA ──────────────────────────────────────────
  const nomeEmpresa = useMemo(() => {
    return dados?.inicioGame?.nomeEmpresa || "HHGJ Holding Empresarial";
  }, [dados]);

  // ─── DADOS DAS MISSÕES ──────────────────────────────────────
  const missoesData = useMemo(() => {
    const missoes = economiaSetores?.missoes || { concluidas: 0, total: 3 };
    return {
      concluidas: missoes.concluidas || 0,
      total: missoes.total || 3,
      porSetor: missoes.porSetor || {},
      historico: missoes.historico || []
    };
  }, [economiaSetores]);

  // ─── CALCULAR DADOS DO RELATÓRIO ────────────────────────────
  const dadosRelatorio = useMemo(() => {
    const patrimonioFinal = economiaSetores?.patrimonioInventarioAtual || 0;

    let lucroLiquido = 0;
    SETORES_ARR.forEach(setor => {
      const arrayFatu = economiaSetores?.[setor]?.economiaSetor?.ArrayFatu || [];
      if (arrayFatu.length > 0) {
        lucroLiquido += arrayFatu[arrayFatu.length - 1] || 0;
      }
    });

    let roeMedio = 0;
    const todosPatrimonios = [];
    
    SETORES_ARR.forEach(setor => {
      const historico = economiaSetores?.[setor]?.economiaSetor?.patrimonioHistorico || [];
      if (historico.length > 0) {
        historico.forEach((valor, index) => {
          if (!todosPatrimonios[index]) todosPatrimonios[index] = 0;
          todosPatrimonios[index] += valor;
        });
      }
    });

    if (todosPatrimonios.length > 1) {
      const retornos = [];
      for (let i = 1; i < todosPatrimonios.length; i++) {
        const anterior = todosPatrimonios[i - 1] || 1;
        const atual = todosPatrimonios[i] || 0;
        if (anterior > 0) {
          const retorno = ((atual - anterior) / anterior) * 100;
          retornos.push(retorno);
        }
      }
      roeMedio = retornos.length > 0 
        ? retornos.reduce((a, b) => a + b, 0) / retornos.length 
        : 0;
    }

    let valorInventario = 0;
    SETORES_ARR.forEach(setor => {
      if (dados[setor]?.edificios) {
        dados[setor].edificios.forEach(ed => {
          if (ed.quantidade > 0) {
            valorInventario += (ed.custoConstrucao || 0) * ed.quantidade;
          }
        });
      }
    });

    let setorPredominante = "Nenhum";
    let maiorPatrimonio = 0;
    SETORES_ARR.forEach(setor => {
      const patrimonio = economiaSetores?.[setor]?.economiaSetor?.patrimonioAtual || 0;
      if (patrimonio > maiorPatrimonio) {
        maiorPatrimonio = patrimonio;
        setorPredominante = setor;
      }
    });

    const setoresComEdificios = SETORES_ARR.filter(setor => {
      if (dados[setor]?.edificios) {
        return dados[setor].edificios.some(ed => ed.quantidade > 0);
      }
      return false;
    });
    const tipoEmpresa = setoresComEdificios.length <= 2 ? "Especializada" : "Diversificada";

    let cartaMaisValiosa = { nome: "Nenhuma", valor: 0 };
    SETORES_ARR.forEach(setor => {
      if (dados[setor]?.edificios) {
        dados[setor].edificios.forEach(ed => {
          if (ed.quantidade > 0) {
            const valor = (ed.custoConstrucao || 0) * ed.quantidade;
            if (valor > cartaMaisValiosa.valor) {
              cartaMaisValiosa = { nome: ed.nome, valor };
            }
          }
        });
      }
    });

    const TOTAL_MISSOES = 3;
    
    const patrimonioScore = Math.min((patrimonioFinal / 10000000) * 30, 30);
    const lucroScore = Math.min((lucroLiquido / 1000000) * 10, 10);
    const roiScore = Math.min((Math.abs(roeMedio) / 100) * 20, 20);
    const estrategiaScore = Math.min((missoesData.concluidas / TOTAL_MISSOES) * 40, 40);
    const indiceCorporativo = Math.round(patrimonioScore + lucroScore + roiScore + estrategiaScore);

    let rating = "D";
    let ratingDescricao = "Gestão Insatisfatória";
    if (indiceCorporativo >= 90) { rating = "AAA"; ratingDescricao = "Excelência Empresarial"; }
    else if (indiceCorporativo >= 80) { rating = "AA"; ratingDescricao = "Gestão de Alto Nível"; }
    else if (indiceCorporativo >= 70) { rating = "A"; ratingDescricao = "Boa Gestão Empresarial"; }
    else if (indiceCorporativo >= 60) { rating = "BBB"; ratingDescricao = "Gestão Sólida"; }
    else if (indiceCorporativo >= 50) { rating = "BB"; ratingDescricao = "Gestão Moderada"; }
    else if (indiceCorporativo >= 40) { rating = "B"; ratingDescricao = "Gestão Regular"; }
    else if (indiceCorporativo >= 30) { rating = "CCC"; ratingDescricao = "Gestão Fragilizada"; }
    else if (indiceCorporativo >= 20) { rating = "CC"; ratingDescricao = "Gestão Crítica"; }
    else { rating = "C"; ratingDescricao = "Gestão em Risco"; }

    const estrelas = "⭐".repeat(Math.min(Math.floor(indiceCorporativo / 20), 5));

    const dataEncerramento = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    return {
      patrimonioFinal,
      lucroLiquido,
      roeMedio,
      valorInventario,
      setorPredominante,
      tipoEmpresa,
      cartaMaisValiosa,
      missoesConcluidas: missoesData.concluidas,
      totalMissoes: TOTAL_MISSOES,
      indiceCorporativo,
      rating,
      ratingDescricao,
      estrelas,
      dataEncerramento,
      setoresComEdificios,
      patrimonioScore: Math.round(Math.min(patrimonioScore, 30)),
      lucroScore: Math.round(Math.min(lucroScore, 10)),
      roiScore: Math.round(Math.min(roiScore, 20)),
      estrategiaScore: Math.round(Math.min(estrategiaScore, 40)),
    };
  }, [dados, economiaSetores, missoesData]);

  // ─── DADOS PARA GRÁFICO ──────────────────────────────────────
  const dadosGrafico = useMemo(() => {
    const historico = economiaSetores?.patrimonioInventarioHistorico || [];
    
    let labels = [];
    let dadosPatrimonio = [];
    
    if (historico.length > 0) {
      labels = historico.map((_, i) => `Rodada ${i + 1}`);
      dadosPatrimonio = historico;
    } else {
      const maxLength = Math.max(
        ...SETORES_ARR.map(setor => 
          economiaSetores?.[setor]?.economiaSetor?.patrimonioHistorico?.length || 0
        )
      );
      
      for (let i = 0; i < maxLength; i++) {
        let total = 0;
        SETORES_ARR.forEach(setor => {
          const hist = economiaSetores?.[setor]?.economiaSetor?.patrimonioHistorico || [];
          if (i < hist.length) {
            total += hist[i] || 0;
          }
        });
        dadosPatrimonio.push(total);
        labels.push(`Rodada ${i + 1}`);
      }
    }

    return {
      labels,
      datasets: [
        {
          label: "Patrimônio Total",
          data: dadosPatrimonio,
          borderColor: "#6A00FF",
          backgroundColor: "rgba(106, 0, 255, 0.1)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#6A00FF",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 4,
        }
      ]
    };
  }, [economiaSetores]);

  const opcoesGrafico = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "#fff", font: { size: 12, family: "'Inter', sans-serif" } }
      }
    },
    scales: {
      x: {
        ticks: { color: "rgba(255,255,255,0.5)", font: { size: 10 } },
        grid: { color: "rgba(255,255,255,0.05)" }
      },
      y: {
        ticks: {
          color: "rgba(255,255,255,0.5)",
          font: { size: 10 },
          callback: (value) => formatarNumero(value)
        },
        grid: { color: "rgba(255,255,255,0.05)" }
      }
    }
  };

  // ─── GERAR TEXTOS ─────────────────────────────────────────────
  const gerarResumoExecutivo = useCallback(() => {
    const { setorPredominante, tipoEmpresa, missoesConcluidas, totalMissoes, patrimonioFinal, indiceCorporativo } = dadosRelatorio;
    const nomeSetor = SETORES_NOMES[setorPredominante] || setorPredominante;

    let texto = `Ao longo de 12 rodadas, a ${nomeEmpresa} consolidou sua posição no mercado com uma gestão `;

    if (indiceCorporativo >= 70) {
      texto += "excelente, demonstrando capacidade estratégica e visão de longo prazo. ";
    } else if (indiceCorporativo >= 50) {
      texto += "sólida, com decisões equilibradas e crescimento consistente. ";
    } else if (indiceCorporativo >= 30) {
      texto += "moderada, enfrentando desafios mas mantendo operações estáveis. ";
    } else {
      texto += "crítica, com necessidade de reestruturação e novas estratégias. ";
    }

    texto += `O setor predominante foi ${nomeSetor}, com uma abordagem ${tipoEmpresa.toLowerCase()}. `;

    if (missoesConcluidas > 0) {
      texto += `Foram concluídas ${missoesConcluidas} de ${totalMissoes} missões estratégicas, `;
      if (missoesConcluidas / totalMissoes > 0.7) {
        texto += "demonstrando forte engajamento com os objetivos corporativos. ";
      } else if (missoesConcluidas / totalMissoes > 0.4) {
        texto += "com desempenho moderado em objetivos estratégicos. ";
      } else {
        texto += "indicando oportunidades para melhorar o alinhamento estratégico. ";
      }
    } else {
      texto += "Nenhuma missão estratégica foi concluída, indicando oportunidades de melhoria no planejamento. ";
    }

    texto += `O patrimônio final alcançou R$ ${formatarNumero(patrimonioFinal)}, `;
    texto += `resultado de decisões de investimento e gestão de recursos. `;
    texto += `O Índice Corporativo de ${indiceCorporativo} pontos reflete a performance geral da empresa.`;

    return texto;
  }, [dadosRelatorio, nomeEmpresa]);

  const gerarParecerConselho = useCallback(() => {
    const { indiceCorporativo } = dadosRelatorio;

    if (indiceCorporativo >= 80) {
      return "O Conselho de Administração parabeniza a gestão pelo excelente desempenho, demonstrando visão estratégica, eficiência operacional e forte capacidade de gerar valor. Recomenda-se manter o ritmo de crescimento e explorar novas oportunidades de mercado.";
    } else if (indiceCorporativo >= 60) {
      return "O Conselho reconhece o bom desempenho da gestão, com resultados consistentes e evolução positiva. Sugere-se intensificar as estratégias de crescimento e otimizar a alocação de recursos para alcançar melhores resultados.";
    } else if (indiceCorporativo >= 40) {
      return "O Conselho avalia que a empresa apresenta desempenho moderado. Recomenda-se revisar as estratégias atuais, focar na eficiência operacional e buscar novas oportunidades de negócio para impulsionar o crescimento.";
    } else {
      return "O Conselho expressa preocupação com o desempenho da empresa. Recomenda-se uma reestruturação urgente, revisão completa das estratégias e foco em medidas corretivas para recuperar a competitividade e solvência.";
    }
  }, [dadosRelatorio]);

  const gerarProximoObjetivo = useCallback(() => {
    const { indiceCorporativo } = dadosRelatorio;

    if (indiceCorporativo >= 90) {
      return "🏆 Novo Recorde! \nAlcance o Índice Corporativo máximo de 100 pontos. \nMeta: 100 IC - Você está a apenas 10 pontos!";
    } else if (indiceCorporativo >= 70) {
      return "🚀 Avançar para Excelência! \nBusque o rating AAA. \nMeta: 90+ IC - Foque em estratégia e crescimento.";
    } else if (indiceCorporativo >= 50) {
      return "📈 Elevar o Padrão! \nAlcance o rating A. \nMeta: 70+ IC - Consolide sua gestão e expanda operações.";
    } else {
      return "🔄 Reconstrução Estratégica! \nFoque em recuperação e crescimento. \nMeta: 50+ IC - Reestruture e planeje melhor.";
    }
  }, [dadosRelatorio]);

  // ─── PÁGINAS DO RELATÓRIO ────────────────────────────────────
  const paginas = useMemo(() => [
    {
      titulo: "📄 RESUMO EXECUTIVO",
      conteudo: (
        <div className="flex flex-col gap-4 h-full">
          <p className="text-white/80 text-sm leading-relaxed font-light">
            {gerarResumoExecutivo()}
          </p>
          <div className="mt-auto pt-4 border-t border-white/10">
            <p className="text-white/40 text-xs">
              Relatório elaborado em {dadosRelatorio.dataEncerramento}
            </p>
          </div>
        </div>
      )
    },
    {
      titulo: "📊 INDICADORES FINANCEIROS",
      conteudo: (
        <div className="flex flex-col gap-4 h-full">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-white/40 text-xs uppercase tracking-wider">Patrimônio Final</p>
              <p className="text-white text-2xl font-bold mt-1">R$ {formatarNumero(dadosRelatorio.patrimonioFinal)}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-white/40 text-xs uppercase tracking-wider">Lucro Líquido</p>
              <p className="text-green-400 text-2xl font-bold mt-1">R$ {formatarNumero(dadosRelatorio.lucroLiquido)}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-white/40 text-xs uppercase tracking-wider">ROI Médio</p>
              <p className="text-[#FFD700] text-2xl font-bold mt-1">{dadosRelatorio.roeMedio.toFixed(2)}%</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-white/40 text-xs uppercase tracking-wider">Valor do Inventário</p>
              <p className="text-[#6A00FF] text-2xl font-bold mt-1">R$ {formatarNumero(dadosRelatorio.valorInventario)}</p>
            </div>
          </div>
        </div>
      )
    },
    {
      titulo: "🏢 PERFIL DA EMPRESA",
      conteudo: (
        <div className="flex flex-col gap-4 h-full">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-white/40 text-xs uppercase tracking-wider">Setor Predominante</p>
            <p className="text-white text-xl font-bold mt-1">
              {SETORES_NOMES[dadosRelatorio.setorPredominante] || dadosRelatorio.setorPredominante}
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-white/40 text-xs uppercase tracking-wider">Tipo de Empresa</p>
            <p className="text-white text-xl font-bold mt-1">{dadosRelatorio.tipoEmpresa}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-white/40 text-xs uppercase tracking-wider">Estratégia</p>
            <p className="text-white text-lg mt-1">
              {dadosRelatorio.missoesConcluidas} / {dadosRelatorio.totalMissoes} missões concluídas
            </p>
            <div className="w-full h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#6A00FF] to-[#FF6F00] rounded-full transition-all duration-1000"
                style={{ width: `${(dadosRelatorio.missoesConcluidas / Math.max(dadosRelatorio.totalMissoes, 1)) * 100}%` }}
              />
            </div>
            <p className="text-white/30 text-xs mt-1">
              {dadosRelatorio.missoesConcluidas === 0 && "🎯 Nenhuma missão concluída ainda"}
              {dadosRelatorio.missoesConcluidas === 1 && "📋 Você concluiu 1 missão, continue!"}
              {dadosRelatorio.missoesConcluidas === 2 && "⭐ Quase lá! Complete a última missão!"}
              {dadosRelatorio.missoesConcluidas === 3 && "🏆 Excelente! Todas as missões concluídas!"}
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-white/40 text-xs uppercase tracking-wider">Carta Mais Valiosa</p>
            <p className="text-[#FFD700] text-lg font-bold mt-1">
              {dadosRelatorio.cartaMaisValiosa.nome}
              <span className="text-white/40 text-sm font-normal ml-2">
                (R$ {formatarNumero(dadosRelatorio.cartaMaisValiosa.valor)})
              </span>
            </p>
          </div>
        </div>
      )
    },
    {
      titulo: "📈 EVOLUÇÃO PATRIMONIAL",
      conteudo: (
        <div className="flex flex-col h-full">
          <div className="flex-1" style={{ height: "calc(100% - 40px)" }}>
            <Line data={dadosGrafico} options={opcoesGrafico} />
          </div>
          <p className="text-white/40 text-xs text-center mt-2">
            Evolução do patrimônio ao longo das 12 rodadas
          </p>
        </div>
      )
    },
    {
      titulo: "🎯 ÍNDICE CORPORATIVO",
      conteudo: (
        <div className="flex flex-col gap-4 h-full">
          <div className="text-center">
            <div className="text-7xl font-bold text-[#FFD700] mb-2">
              {dadosRelatorio.indiceCorporativo}
            </div>
            <div className="text-4xl mb-2">{dadosRelatorio.estrelas}</div>
            <p className="text-white/60 text-sm">Índice Corporativo</p>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Patrimônio</span>
                <span className="text-white font-bold">{dadosRelatorio.patrimonioScore}/30</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mt-1">
                <div className="h-full bg-gradient-to-r from-[#6A00FF] to-[#4CAF50] rounded-full" 
                     style={{ width: `${(dadosRelatorio.patrimonioScore / 30) * 100}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Lucro</span>
                <span className="text-white font-bold">{dadosRelatorio.lucroScore}/10</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mt-1">
                <div className="h-full bg-gradient-to-r from-[#6A00FF] to-[#FF6F00] rounded-full"
                     style={{ width: `${(dadosRelatorio.lucroScore / 10) * 100}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">ROI Médio</span>
                <span className="text-white font-bold">{dadosRelatorio.roiScore}/20</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mt-1">
                <div className="h-full bg-gradient-to-r from-[#6A00FF] to-[#FF4D4D] rounded-full"
                     style={{ width: `${(dadosRelatorio.roiScore / 20) * 100}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Estratégia</span>
                <span className="text-white font-bold">{dadosRelatorio.estrategiaScore}/40</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mt-1">
                <div className="h-full bg-gradient-to-r from-[#6A00FF] to-[#FFD700] rounded-full"
                     style={{ width: `${(dadosRelatorio.estrategiaScore / 40) * 100}%` }} />
              </div>
              <div className="flex justify-between text-xs text-white/30 mt-1">
                <span>0 missões</span>
                <span>{dadosRelatorio.missoesConcluidas} de {dadosRelatorio.totalMissoes} missões</span>
                <span>{dadosRelatorio.totalMissoes} missões</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      titulo: "⭐ RATING EMPRESARIAL",
      conteudo: (
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <div className="text-8xl font-bold text-[#FFD700]">
            {dadosRelatorio.rating}
          </div>
          <div className="text-3xl">{dadosRelatorio.estrelas}</div>
          <p className="text-white text-xl font-semibold">{dadosRelatorio.ratingDescricao}</p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />
          <p className="text-white/40 text-sm text-center">
            Avaliação baseada no Índice Corporativo de {dadosRelatorio.indiceCorporativo} pontos
          </p>
        </div>
      )
    },
    {
      titulo: "📋 PARECER DO CONSELHO",
      conteudo: (
        <div className="flex flex-col h-full">
          <div className="flex-1 flex items-center">
            <p className="text-white/80 text-lg leading-relaxed font-light italic">
              "{gerarParecerConselho()}"
            </p>
          </div>
          <div className="mt-auto pt-4 border-t border-white/10">
            <p className="text-white/30 text-xs text-right">
              Conselho de Administração • {dadosRelatorio.dataEncerramento}
            </p>
          </div>
        </div>
      )
    },
    {
      titulo: "🎯 PRÓXIMO OBJETIVO",
      conteudo: (
        <div className="flex flex-col items-center justify-center h-full text-center gap-4">
          <div className="text-5xl mb-2">🚀</div>
          <p className="text-white text-2xl font-bold leading-relaxed">
            {gerarProximoObjetivo().split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < 2 && <br />}
              </React.Fragment>
            ))}
          </p>
          <div className="w-48 h-1 bg-gradient-to-r from-transparent via-[#6A00FF] to-transparent" />
          <p className="text-white/40 text-sm">
            Meta para a próxima partida
          </p>
        </div>
      )
    }
  ], [dadosRelatorio, dadosGrafico, opcoesGrafico, gerarResumoExecutivo, gerarParecerConselho, gerarProximoObjetivo]);

  // ─── ANIMAÇÃO DE ABERTURA COM 5 SEGUNDOS ────────────────────
  useEffect(() => {
    setFase("capa");
    setProgressoAbertura(0);

    // Animação de progresso mais lenta (5 segundos para completar)
    const interval = setInterval(() => {
      setProgressoAbertura(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Aumenta mais lentamente para durar 5 segundos
        return prev + 1.2;
      });
    }, 50);

    // Fase 2: Abrir relatório após 4.5 segundos
    const timer1 = setTimeout(() => {
      setFase("abrir");
    }, 4500);

    // Fase 3: Relatório aberto após 5.5 segundos
    const timer2 = setTimeout(() => {
      setFase("aberto");
      setMostrarRelatorio(true);
    }, 5500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // ─── NAVEGAÇÃO ─────────────────────────────────────────────────
  const proximaPagina = useCallback(() => {
    if (paginaAtual < paginas.length - 1) {
      setPaginaAtual(paginaAtual + 1);
    }
  }, [paginaAtual, paginas.length]);

  const paginaAnterior = useCallback(() => {
    if (paginaAtual > 0) {
      setPaginaAtual(paginaAtual - 1);
    }
  }, [paginaAtual]);

  // ─── RENDER ──────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center select-none overflow-hidden">
      {/* Efeito de partículas de fundo */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#6A00FF]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
              y: [0, -50 - Math.random() * 100],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ─── CAPA DO RELATÓRIO ──────────────────────────────── */}
        {(fase === "capa" || fase === "abrir") && (
          <motion.div
            key="capa"
            className="relative"
            initial={{ opacity: 0, scale: 0.6, rotateY: 30 }}
            animate={{ 
              opacity: fase === "abrir" ? 0 : 1,
              scale: fase === "abrir" ? 0.7 : 1,
              rotateY: fase === "abrir" ? -30 : 0,
              y: fase === "abrir" ? -80 : 0,
            }}
            transition={{ 
              duration: 0.9, 
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <motion.div 
              className="relative w-[600px] bg-gradient-to-br from-[#1a0a3b] to-[#2a1a5a] rounded-2xl p-12 shadow-2xl border border-white/10"
              animate={{
                boxShadow: fase === "capa" 
                  ? [
                      "0 0 40px rgba(106, 0, 255, 0.2)",
                      "0 0 80px rgba(106, 0, 255, 0.5)",
                      "0 0 40px rgba(106, 0, 255, 0.2)",
                    ]
                  : "0 0 40px rgba(106, 0, 255, 0.1)",
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              {/* Linha decorativa superior animada */}
              <motion.div 
                className="w-24 h-1 bg-gradient-to-r from-[#6A00FF] to-[#FF6F00] mx-auto mb-8 rounded-full"
                animate={fase === "capa" ? {
                  width: ["96px", "160px", "96px"],
                } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="text-center">
                <motion.p 
                  className="text-white/40 text-sm tracking-[0.3em] uppercase mb-4"
                  animate={fase === "capa" ? {
                    opacity: [0.4, 0.9, 0.4],
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Relatório Anual
                </motion.p>

                {/* Logo com efeito de brilho */}
                <motion.div 
                  className="relative w-32 h-32 mx-auto mb-6"
                  animate={fase === "capa" ? {
                    y: [0, -8, 0],
                  } : {}}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6A00FF] to-[#FF6F00] rounded-full blur-2xl opacity-30" />
                  <div className="relative w-full h-full bg-gradient-to-br from-[#6A00FF] to-[#FF6F00] rounded-full flex items-center justify-center shadow-2xl shadow-[#6A00FF]/30">
                    <motion.span 
                      className="text-5xl"
                      animate={fase === "capa" ? {
                        scale: [1, 1.08, 1],
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      📊
                    </motion.span>
                  </div>
                </motion.div>

                <motion.h1 
                  className="text-4xl font-bold text-white mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  {nomeEmpresa}
                </motion.h1>

                <motion.div 
                  className="w-48 h-[2px] bg-gradient-to-r from-transparent via-[#6A00FF] to-transparent mx-auto my-6"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                />

                <motion.p 
                  className="text-white/60 text-sm tracking-widest uppercase"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  Exercício Fiscal
                </motion.p>
                <motion.p 
                  className="text-white text-2xl font-bold mt-1"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5, type: "spring" }}
                >
                  Ano 270
                </motion.p>

                <motion.div 
                  className="w-48 h-[2px] bg-gradient-to-r from-transparent via-[#FF6F00] to-transparent mx-auto my-6"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                />

                <motion.p 
                  className="text-white/40 text-sm uppercase tracking-wider"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                >
                  Patrimônio Final
                </motion.p>
                
                <motion.p 
                  className="text-[#FFD700] text-4xl font-bold mt-1"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6, duration: 0.6, type: "spring" }}
                >
                  R$ {formatarNumero(dadosRelatorio.patrimonioFinal)}
                </motion.p>

                <motion.div 
                  className="w-24 h-1 bg-gradient-to-r from-[#FF6F00] to-[#6A00FF] mx-auto mt-8 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.8, duration: 0.6 }}
                />

                <motion.p 
                  className="text-white text-xs tracking-[0.3em] uppercase mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  transition={{ delay: 2, duration: 0.5 }}
                >
                  CONFIDENCIAL
                </motion.p>
              </div>

              {/* Linha decorativa inferior animada */}
                <motion.div 
                  className="w-48 h-[2px] bg-gradient-to-r from-transparent via-[#FF6F00] to-transparent mx-auto my-6"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                />

              {fase === "capa" && (
                <motion.div className="text-center mt-6">
                  <motion.p 
                    className="text-white/20 text-xs tracking-widest"
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    📄 Preparando relatório...
                  </motion.p>
                  <div className="w-48 h-1 bg-white/10 rounded-full mx-auto mt-2 overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-[#6A00FF] to-[#FF6F00] rounded-full"
                      style={{ width: `${progressoAbertura}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                  <motion.p 
                    className="text-white/10 text-[10px] mt-2 tracking-widest"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {Math.round(progressoAbertura)}%
                  </motion.p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── RELATÓRIO ABERTO ────────────────────────────────── */}
        {fase === "aberto" && mostrarRelatorio && (
          <motion.div
            key="relatorio"
            initial={{ 
              opacity: 0, 
              scale: 0.85, 
              y: 80,
              rotateX: 15,
            }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              rotateX: 0,
            }}
            transition={{ 
              duration: 0.7, 
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="w-[90vw] max-w-[1200px] h-[85vh] max-h-[800px] bg-[#1a0a3b] rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col"
          >
            {/* ─── HEADER ──────────────────────────────────────── */}
            <motion.div 
              className="flex items-center justify-between p-4 border-b border-white/10 bg-[#0a0a1a]/50"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="flex items-center gap-4">
                <motion.span 
                  className="text-2xl"
                  animate={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                >
                  📖
                </motion.span>
                <span className="text-white font-bold">{nomeEmpresa}</span>
                <span className="text-white/30">|</span>
                <span className="text-white/40 text-sm">Ano 270 • Relatório Anual</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/30 text-sm">
                  Página {paginaAtual + 1} / {paginas.length}
                </span>
                <motion.button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all text-white/40 hover:text-white"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </div>
            </motion.div>

            {/* ─── CORPO DO RELATÓRIO ──────────────────────────── */}
            <div className="flex-1 flex overflow-hidden">
              {/* PÁGINA ESQUERDA */}
              <motion.div 
                className="w-1/2 p-6 overflow-y-auto bg-[#0a0a1a]/30 border-r border-white/5 scrollbar-custom"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <motion.h2 
                  className="text-[#FFD700] text-xl font-bold mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  {paginas[paginaAtual].titulo}
                </motion.h2>
                <motion.div 
                  className="min-h-[calc(100%-40px)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {paginas[paginaAtual].conteudo}
                </motion.div>
              </motion.div>

              {/* PÁGINA DIREITA */}
              <motion.div 
                className="w-1/2 p-6 overflow-y-auto scrollbar-custom"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {paginaAtual < paginas.length - 1 ? (
                  <>
                    <motion.h2 
                      className="text-[#FFD700] text-xl font-bold mb-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                    >
                      {paginas[paginaAtual + 1].titulo}
                    </motion.h2>
                    <motion.div 
                      className="min-h-[calc(100%-40px)]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      {paginas[paginaAtual + 1].conteudo}
                    </motion.div>
                  </>
                ) : (
                  <motion.div 
                    className="flex flex-col items-center justify-center h-full text-center gap-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
                  >
                    <motion.div 
                      className="text-6xl"
                      animate={{ 
                        rotate: [0, -10, 10, -10, 0],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      🏁
                    </motion.div>
                    <h2 className="text-white text-2xl font-bold">Fim do Relatório</h2>
                    <p className="text-white/40 text-sm">Obrigado por participar desta jornada empresarial!</p>
                    <motion.button
                      onClick={onClose}
                      className="mt-4 px-8 py-3 bg-gradient-to-r from-[#6A00FF] to-[#FF6F00] rounded-xl text-white font-bold shadow-lg shadow-[#6A00FF]/30"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(106, 0, 255, 0.5)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Encerrar Jogo
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* ─── FOOTER COM NAVEGAÇÃO ─────────────────────────── */}
            <motion.div 
              className="flex items-center justify-between p-3 border-t border-white/10 bg-[#0a0a1a]/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.button
                onClick={paginaAnterior}
                disabled={paginaAtual === 0}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  paginaAtual === 0
                    ? "text-white/20 cursor-not-allowed"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
                whileHover={paginaAtual !== 0 ? { scale: 1.05 } : {}}
                whileTap={paginaAtual !== 0 ? { scale: 0.95 } : {}}
              >
                ← Anterior
              </motion.button>

              <div className="flex gap-1">
                {paginas.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setPaginaAtual(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === paginaAtual
                        ? "bg-[#6A00FF] w-6"
                        : "bg-white/20 hover:bg-white/40"
                    }`}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.8 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={proximaPagina}
                disabled={paginaAtual >= paginas.length}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  paginaAtual >= paginas.length - 1
                    ? "text-white/20 cursor-not-allowed"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
                whileHover={paginaAtual < paginas.length - 1 ? { scale: 1.05 } : {}}
                whileTap={paginaAtual < paginas.length - 1 ? { scale: 0.95 } : {}}
              >
                {paginaAtual >= paginas.length - 1 ? "Fim" : "Próxima →"}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}