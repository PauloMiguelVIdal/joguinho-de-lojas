// ObjectiveTracker.jsx - Responsivo para Mobile
import React, { useContext, useEffect, useState, useCallback, useMemo, useRef } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";

// ─── CONSTANTES ──────────────────────────────────────────────
const SETORES_ARR = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

const ICONES_SETORES = {
  agricultura: "🌾",
  tecnologia: "💻",
  comercio: "🛒",
  industria: "🏭",
  imobiliario: "🏢",
  energia: "⚡"
};

// ─── CONDITION FACTORY ──────────────────────────────────────
const CONDICOES = {
  diferentes: (meta) => ({
    condicao: (edificios) => {
      const diferentes = new Set();
      edificios.forEach(ed => {
        if (ed.quantidade > 0) diferentes.add(ed.nome);
      });
      return diferentes.size >= meta;
    },
    progresso: (edificios) => {
      const diferentes = new Set();
      edificios.forEach(ed => {
        if (ed.quantidade > 0) diferentes.add(ed.nome);
      });
      return diferentes.size;
    }
  }),
  
  total: (meta) => ({
    condicao: (edificios) => {
      const total = edificios.reduce((sum, ed) => sum + ed.quantidade, 0);
      return total >= meta;
    },
    progresso: (edificios) => {
      return edificios.reduce((sum, ed) => sum + ed.quantidade, 0);
    }
  }),
};

// ─── CONFIGURAÇÃO DOS OBJETIVOS ──────────────────────────────
const OBJETIVOS = {
  agricultura: [
    {
      id: "agricultura_4_diferentes",
      descricao: "4 edifícios diferentes do setor Agricultura",
      meta: 4,
      condicao: "diferentes",
      recompensa: {
        tipo: "pacote",
        raridade: "comum",
        quantidade: 1,
        label: "1 Pacote Comum"
      }
    },
    {
      id: "agricultura_7_diferentes",
      descricao: "7 edifícios diferentes do setor Agricultura",
      meta: 7,
      condicao: "diferentes",
      recompensa: {
        tipo: "cartas",
        cartas: ["Cooperativa Agrícola", "Fazenda Administrativa"],
        label: "Cooperativa Agrícola + Fazenda Administrativa"
      }
    },
    {
      id: "agricultura_10_diferentes",
      descricao: "10 edifícios diferentes do setor Agricultura",
      meta: 10,
      condicao: "diferentes",
      recompensa: {
        tipo: "cartas",
        cartas: ["Centro De Comércio De Plantações", "Plantação De Plantas Medicinais", "Plantação De Eucalipto"],
        label: "Centro Comércio + Plantação Medicinal + Eucalipto"
      }
    }
  ],
  
  energia: [
    {
      id: "energia_4_diferentes",
      descricao: "4 edifícios diferentes do setor Energia",
      meta: 4,
      condicao: "diferentes",
      recompensa: {
        tipo: "pacote",
        raridade: "comum",
        quantidade: 1,
        label: "1 Pacote Comum"
      }
    },
    {
      id: "energia_7_diferentes",
      descricao: "7 edifícios diferentes do setor Energia",
      meta: 7,
      condicao: "diferentes",
      recompensa: {
        tipo: "cartas",
        cartas: ["Usina De Biomassa", "Empresa De Consultoria Energética"],
        label: "Usina De Biomassa + Empresa De Consultoria Energética"
      }
    },
    {
      id: "energia_10_diferentes",
      descricao: "10 edifícios diferentes do setor Energia",
      meta: 10,
      condicao: "diferentes",
      recompensa: {
        tipo: "cartas",
        cartas: ["Usina Hidrelétrica"],
        label: "Usina Hidrelétrica"
      }
    }
  ],
  
  comercio: [
    {
      id: "comercio_7_diferentes",
      descricao: "7 edifícios diferentes do setor Comércio",
      meta: 7,
      condicao: "diferentes",
      recompensa: {
        tipo: "pacote",
        raridade: "comum",
        quantidade: 1,
        label: "1 Pacote Comum"
      }
    },
    {
      id: "comercio_10_diferentes",
      descricao: "10 edifícios diferentes do setor Comércio",
      meta: 10,
      condicao: "diferentes",
      recompensa: {
        tipo: "cartas",
        cartas: ["Posto De Combustíveis", "Concessionária De Veículos", "Escritório De Design De Interiores"],
        label: "Posto De Combustíveis + Concessionária + Design De Interiores"
      }
    },
    {
      id: "comercio_15_diferentes",
      descricao: "15 edifícios diferentes do setor Comércio",
      meta: 15,
      condicao: "diferentes",
      recompensa: {
        tipo: "cartas",
        cartas: ["Shopping Popular"],
        label: "Shopping Popular"
      }
    }
  ],
  
  imobiliario: [
    {
      id: "imobiliario_4_diferentes",
      descricao: "4 edifícios diferentes do setor Imobiliário",
      meta: 4,
      condicao: "diferentes",
      recompensa: {
        tipo: "pacote",
        raridade: "comum",
        quantidade: 1,
        label: "1 Pacote Comum"
      }
    },
    {
      id: "imobiliario_7_diferentes",
      descricao: "7 edifícios diferentes do setor Imobiliário",
      meta: 7,
      condicao: "diferentes",
      recompensa: {
        tipo: "cartas",
        cartas: ["Consultoria Em Engenharia Civil", "Escritório De Arquitetura"],
        label: "Consultoria Engenharia Civil + Escritório Arquitetura"
      }
    },
    {
      id: "imobiliario_10_diferentes",
      descricao: "10 edifícios diferentes do setor Imobiliário",
      meta: 10,
      condicao: "diferentes",
      recompensa: {
        tipo: "cartas",
        cartas: ["Prédio De Alto Padrão"],
        label: "Prédio De Alto Padrão"
      }
    }
  ],
  
  industria: [
    {
      id: "industria_8_diferentes",
      descricao: "8 edifícios diferentes do setor Indústria",
      meta: 8,
      condicao: "diferentes",
      recompensa: {
        tipo: "pacote",
        raridade: "comum",
        quantidade: 1,
        label: "1 Pacote Comum"
      }
    },
    {
      id: "industria_12_diferentes",
      descricao: "12 edifícios diferentes do setor Indústria",
      meta: 12,
      condicao: "diferentes",
      recompensa: {
        tipo: "cartas",
        cartas: ["Fundição De Alumínio", "Alto-Forno", "Usina Siderúrgica"],
        label: "Fundição Alumínio + Alto-Forno + Usina Siderúrgica"
      }
    },
    {
      id: "industria_18_diferentes",
      descricao: "18 edifícios diferentes do setor Indústria",
      meta: 18,
      condicao: "diferentes",
      recompensa: {
        tipo: "cartas",
        cartas: ["Empresa De Automação Industrial"],
        label: "Empresa De Automação Industrial"
      }
    }
  ],
  
  tecnologia: [
    {
      id: "tecnologia_6_diferentes",
      descricao: "6 edifícios diferentes do setor Tecnologia",
      meta: 6,
      condicao: "diferentes",
      recompensa: {
        tipo: "pacote",
        raridade: "comum",
        quantidade: 1,
        label: "1 Pacote Comum"
      }
    },
    {
      id: "tecnologia_10_diferentes",
      descricao: "10 edifícios diferentes do setor Tecnologia",
      meta: 10,
      condicao: "diferentes",
      recompensa: {
        tipo: "cartas",
        cartas: ["Centro De Pesquisa Em Eletrônicos", "Fábrica De Consoles De Jogos"],
        label: "Centro Pesquisa Eletrônicos + Fábrica Consoles"
      }
    },
    {
      id: "tecnologia_14_diferentes",
      descricao: "14 edifícios diferentes do setor Tecnologia",
      meta: 14,
      condicao: "diferentes",
      recompensa: {
        tipo: "cartas",
        cartas: ["Fábrica De Computadores", "Laboratório De Design De Produtos"],
        label: "Fábrica Computadores + Laboratório Design"
      }
    }
  ]
};

// ─── FUNÇÃO PARA RESOLVER CONDIÇÕES ─────────────────────────
const resolverCondicao = (objetivo) => {
  const condicaoConfig = CONDICOES[objetivo.condicao];
  if (!condicaoConfig) {
    console.warn(`❌ Condição "${objetivo.condicao}" não encontrada!`);
    return {
      condicao: () => false,
      progresso: () => 0
    };
  }
  return condicaoConfig(objetivo.meta);
};

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────
export default function ObjectiveTracker({ 
  onPackReceived, 
  onCartasRecebidas,
  setorInicial 
}) {
  const { dados, atualizarDadosProf2 } = useContext(CentraldeDadosContext);
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);
  
  const [setorSelecionado, setSetorSelecionado] = useState(setorInicial || "comercio");
  const [recompensasPendentes, setRecompensasPendentes] = useState({});
  
  // 🔥 REF para controlar a primeira execução da verificação
  const isFirstRun = useRef(true);
  // 🔥 REF para evitar verificações duplicadas
  const isVerifying = useRef(false);

  // ─── DETECTAR MOBILE ──────────────────────────────────────────
  const [isMobile, setIsMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerHeight < 600;
      const landscape = window.innerWidth > window.innerHeight && mobile;
      setIsMobile(mobile);
      setIsLandscape(landscape);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', () => setTimeout(checkDevice, 300));
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  // ─── FUNÇÃO PARA OBTER EDIFÍCIOS DE UM SETOR ──────────────
  const getEdificiosDoSetor = useCallback((setor) => {
    if (!dados[setor]?.edificios) return [];
    return dados[setor].edificios.filter(ed => ed.quantidade > 0);
  }, [dados]);

  // ─── FUNÇÃO PARA VERIFICAR SE UMA MISSÃO ESTÁ COMPLETA ────
  const isMissaoCompleta = useCallback((chave) => {
    if (!economiaSetores?.missoes?.historico) return false;
    return economiaSetores.missoes.historico.some(m => m.id === chave);
  }, [economiaSetores?.missoes?.historico]);

  const adicionarCartaAoInventario = useCallback((nomeCarta) => {
    let setorEncontrado = null;
    let edificeIndex = -1;

    for (const setor of SETORES_ARR) {
      const edificios = dados[setor]?.edificios || [];
      const index = edificios.findIndex(ed => ed.nome === nomeCarta);
      if (index !== -1) {
        setorEncontrado = setor;
        edificeIndex = index;
        break;
      }
    }

    if (setorEncontrado === null || edificeIndex === -1) {
      console.warn(`❌ Carta "${nomeCarta}" não encontrada!`);
      return false;
    }

    const edificio = dados[setorEncontrado].edificios[edificeIndex];
    const novaQuantidade = (edificio.quantidade || 0) + 1;
    atualizarDadosProf2([setorEncontrado, "edificios", edificeIndex, "quantidade"], novaQuantidade);
    return true;
  }, [dados, atualizarDadosProf2]);

  // ─── FUNÇÃO PARA ATUALIZAR MISSÕES NO CONTEXT ─────────────
  const atualizarMissoesContext = useCallback((novaMissao) => {
    const missoesAtuais = economiaSetores?.missoes || { 
      concluidas: 0, 
      total: Object.values(OBJETIVOS).reduce((acc, obj) => acc + obj.length, 0),
      porSetor: {}, 
      historico: [] 
    };

    // Atualiza o contador de missões concluídas
    const novasConcluidas = (missoesAtuais.concluidas || 0) + 1;
    
    // Atualiza o histórico
    const novoHistorico = [...(missoesAtuais.historico || []), novaMissao];
    
    // Atualiza o contador por setor
    const porSetor = { ...(missoesAtuais.porSetor || {}) };
    porSetor[novaMissao.setor] = (porSetor[novaMissao.setor] || 0) + 1;

    // 🔥 SALVA NO CONTEXT USANDO atualizarEco
    atualizarEco("missoes", {
      concluidas: novasConcluidas,
      total: missoesAtuais.total,
      porSetor: porSetor,
      historico: novoHistorico
    });
  }, [economiaSetores?.missoes, atualizarEco]);

  // ─── PEGAR RECOMPENSA ──────────────────────────────────────
  const pegarRecompensa = useCallback((setor, objetivoId) => {
    const chave = `${setor}_${objetivoId}`;
    if (!recompensasPendentes[chave]) return;
    
    const objetivo = OBJETIVOS[setor]?.find(obj => obj.id === objetivoId);
    if (!objetivo) return;
    
    const recompensa = objetivo.recompensa;

    // 🔥 CRIA A MISSÃO COMPLETA
    const missaoCompleta = {
      id: chave,
      setor: setor,
      descricao: objetivo.descricao,
      recompensa: recompensa.label,
      data: new Date().toISOString()
    };

    // 🔥 ATUALIZA O CONTEXT
    atualizarMissoesContext(missaoCompleta);

    // ─── APLICA RECOMPENSA ──────────────────────────────────
    if (recompensa.tipo === "pacote") {
      if (onPackReceived) {
        onPackReceived(recompensa.raridade);
      }
      setRecompensasPendentes(prev => {
        const novo = { ...prev };
        delete novo[chave];
        return novo;
      });
    } else if (recompensa.tipo === "cartas") {
      recompensa.cartas.forEach(nome => {
        adicionarCartaAoInventario(nome);
      });
      if (onCartasRecebidas) {
        onCartasRecebidas(recompensa.cartas);
      }
      setRecompensasPendentes(prev => {
        const novo = { ...prev };
        delete novo[chave];
        return novo;
      });
    }
  }, [recompensasPendentes, onPackReceived, onCartasRecebidas, adicionarCartaAoInventario, atualizarMissoesContext]);

  // ─── VERIFICAÇÃO DE OBJETIVOS ──────────────────────────────
  const verificarTodosObjetivos = useCallback(() => {
    // 🔥 EVITA EXECUÇÕES CONCORRENTES
    if (isVerifying.current) return;
    isVerifying.current = true;

    const novasPendentes = { ...recompensasPendentes };
    let hasChanges = false;

    for (const [setor, objetivos] of Object.entries(OBJETIVOS)) {
      for (const objetivo of objetivos) {
        const chave = `${setor}_${objetivo.id}`;
        
        // 🔥 PULA SE JÁ ESTIVER COMPLETO NO CONTEXT
        if (isMissaoCompleta(chave)) {
          continue;
        }
        
        // 🔥 PULA SE JÁ ESTIVER PENDENTE
        if (recompensasPendentes[chave]) continue;
        
        const { condicao } = resolverCondicao(objetivo);
        const edificios = getEdificiosDoSetor(setor);
        
        if (condicao(edificios)) {
          novasPendentes[chave] = {
            setor,
            objetivo,
            atingidoEm: Date.now()
          };
          hasChanges = true;
        }
      }
    }

    if (hasChanges) {
      setRecompensasPendentes(novasPendentes);
    }
    
    isVerifying.current = false;
  }, [recompensasPendentes, getEdificiosDoSetor, isMissaoCompleta]);

  // ─── EFFECTS ──────────────────────────────────────────────────
  
  // 🔥 VERIFICAÇÃO INICIAL - APENAS UMA VEZ
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      verificarTodosObjetivos();
    }
  }, [verificarTodosObjetivos]);

  // 🔥 VERIFICA QUANDO OS DADOS MUDAM
  useEffect(() => {
    if (!isFirstRun.current) {
      verificarTodosObjetivos();
    }
  }, [dados, verificarTodosObjetivos]);

  // 🔥 VERIFICA QUANDO O DIA MUDA
  useEffect(() => {
    if (!isFirstRun.current && dados.dia > 0) {
      verificarTodosObjetivos();
    }
  }, [dados.dia, verificarTodosObjetivos]);

  // 🔥 RECALCULA PENDENTES QUANDO O HISTÓRICO MUDA
  useEffect(() => {
    if (!isFirstRun.current) {
      // Remove das pendentes as que já estão no histórico
      const pendentesAtualizadas = { ...recompensasPendentes };
      let hasChanges = false;
      
      Object.keys(pendentesAtualizadas).forEach(chave => {
        if (isMissaoCompleta(chave)) {
          delete pendentesAtualizadas[chave];
          hasChanges = true;
        }
      });
      
      if (hasChanges) {
        setRecompensasPendentes(pendentesAtualizadas);
      }
    }
  }, [economiaSetores?.missoes?.historico, isMissaoCompleta]);

  // ─── SETOR INICIAL ──────────────────────────────────────────
  useEffect(() => {
    if (setorInicial) {
      setSetorSelecionado(setorInicial);
    }
  }, [setorInicial]);

  const objetivosSetor = useMemo(() => {
    return OBJETIVOS[setorSelecionado] || [];
  }, [setorSelecionado]);

  const edificiosSetor = useMemo(() => {
    return getEdificiosDoSetor(setorSelecionado);
  }, [setorSelecionado, getEdificiosDoSetor]);

  const calcularProgresso = useCallback((objetivo) => {
    const { progresso } = resolverCondicao(objetivo);
    const atual = progresso(edificiosSetor);
    const total = objetivo.meta;
    return Math.min(atual / total, 1);
  }, [edificiosSetor]);

  // ─── CONFIGURAÇÕES RESPONSIVAS ──────────────────────────────
  const alturaContainer = isMobile ? '100%' : '40vh';
  const larguraContainer = isMobile ? '100%' : '20vw';
  const paddingHeader = isMobile ? '2px 8px' : '16px';
  const paddingLista = isMobile ? '2px 6px' : '16px';
  const fontSizeTitulo = isMobile ? '12px' : '18px';
  const fontSizeDescricao = isMobile ? '10px' : '14px';
  const fontSizeBadge = isMobile ? '7px' : '10px';
  const fontSizeProgresso = isMobile ? '8px' : '10px';
  const tamanhoCirculo = isMobile ? '16px' : '24px';
  const paddingItem = isMobile ? '2px 6px' : '12px';
  const borderRadiusItem = isMobile ? '6px' : '12px';

  // ─── DADOS DO CONTEXT PARA EXIBIÇÃO ────────────────────────
  const missoesData = economiaSetores?.missoes || { concluidas: 0, total: 0, porSetor: {}, historico: [] };
  const totalCompletas = missoesData.concluidas || 0;
  const totalMissoes = missoesData.total || Object.values(OBJETIVOS).reduce((acc, obj) => acc + obj.length, 0);
  const totalPendentes = Object.keys(recompensasPendentes).length;

  return (
    <div className="h-full w-full bg-[#1a0a3b] border border-white/10 shadow-2xl overflow-hidden flex flex-col" style={{
      height: alturaContainer,
      width: larguraContainer,
    }}>
      {/* ─── HEADER ────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(to bottom, #6411D9, #350973)',
        padding: paddingHeader,
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }} className="flex-shrink-0">
        <h2 className="text-white font-bold flex items-center gap-2" style={{
          fontSize: fontSizeTitulo,
        }}>
          <span style={{ fontSize: isMobile ? '14px' : '20px' }}>🎯</span> Objetivos
        </h2>
      </div>

      {/* ─── LISTA DE OBJETIVOS ──────────────────────────────── */}
      <div className="flex-1 overflow-y-auto scrollbar-custom" style={{
        padding: paddingLista,
        gap: isMobile ? '4px' : '12px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {objetivosSetor.length === 0 ? (
          <div className="text-white/40 text-center py-8" style={{
            fontSize: isMobile ? '10px' : '14px',
          }}>
            Nenhum objetivo disponível para este setor
          </div>
        ) : (
          objetivosSetor.map((objetivo) => {
            const chave = `${setorSelecionado}_${objetivo.id}`;
            
            // 🔥 VERIFICA COMPLETO NO CONTEXT
            const completo = isMissaoCompleta(chave);
            const pendente = !completo && !!recompensasPendentes[chave];
            
            const { progresso } = resolverCondicao(objetivo);
            const progressoValue = calcularProgresso(objetivo);
            const atual = progresso(edificiosSetor);
            const meta = objetivo.meta;
            
            // PRÓXIMO: primeiro objetivo não completo e não pendente
            const isProximo = !completo && !pendente && 
              objetivosSetor.filter(obj => {
                const ch = `${setorSelecionado}_${obj.id}`;
                return !isMissaoCompleta(ch) && !recompensasPendentes[ch];
              })[0]?.id === objetivo.id;

            return (
              <div 
                key={objetivo.id}
                className="transition-all" style={{
                  padding: paddingItem,
                  borderRadius: borderRadiusItem,
                  background: completo 
                    ? 'rgba(74, 222, 128, 0.1)' 
                    : pendente
                      ? 'rgba(234, 179, 8, 0.2)'
                      : isProximo 
                        ? 'rgba(106, 0, 255, 0.2)'
                        : 'rgba(255,255,255,0.05)',
                  border: completo 
                    ? '1px solid rgba(74, 222, 128, 0.3)' 
                    : pendente
                      ? '2px solid rgba(234, 179, 8, 0.5)'
                      : isProximo 
                        ? '1px solid rgba(106, 0, 255, 0.3)'
                        : '1px solid rgba(255,255,255,0.05)',
                  boxShadow: pendente ? '0 0 20px rgba(234, 179, 8, 0.2)' : 'none',
                }}
              >
                <div className="flex items-start gap-2" style={{
                  gap: isMobile ? '6px' : '12px',
                }}>
                  {/* ─── CHECK / PROGRESSO ────────────────────── */}
                  <div className="flex-shrink-0 mt-0.5">
                    {completo ? (
                      <div className="rounded-full bg-green-500 flex items-center justify-center" style={{
                        width: tamanhoCirculo,
                        height: tamanhoCirculo,
                        boxShadow: '0 0 20px rgba(74, 222, 128, 0.3)',
                      }}>
                        <span className="text-white" style={{ fontSize: isMobile ? '10px' : '14px' }}>✓</span>
                      </div>
                    ) : pendente ? (
                      <div className="rounded-full bg-yellow-500 flex items-center justify-center animate-pulse" style={{
                        width: tamanhoCirculo,
                        height: tamanhoCirculo,
                        boxShadow: '0 0 20px rgba(234, 179, 8, 0.3)',
                      }}>
                        <span className="text-white" style={{ fontSize: isMobile ? '10px' : '14px' }}>⭐</span>
                      </div>
                    ) : (
                      <div className="relative" style={{
                        width: tamanhoCirculo,
                        height: tamanhoCirculo,
                      }}>
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="50%"
                            cy="50%"
                            r={isMobile ? '6' : '10'}
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth={isMobile ? '2' : '3'}
                          />
                          <circle
                            cx="50%"
                            cy="50%"
                            r={isMobile ? '6' : '10'}
                            fill="none"
                            stroke={isProximo ? "#8B00FF" : "rgba(255,255,255,0.3)"}
                            strokeWidth={isMobile ? '2' : '3'}
                            strokeDasharray={`${progressoValue * (isMobile ? 37.7 : 62.83)} ${isMobile ? 37.7 : 62.83}`}
                            strokeLinecap="round"
                            className="transition-all duration-500"
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-white/60" style={{
                          fontSize: isMobile ? '7px' : '10px',
                          fontWeight: 'bold',
                        }}>
                          {Math.round(progressoValue * 100)}%
                        </span>
                      </div>
                    )}
                  </div>

                  {/* ─── INFORMAÇÕES ──────────────────────────── */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap" style={{
                      gap: isMobile ? '2px' : '4px',
                    }}>
                      <span className="font-bold" style={{
                        fontSize: fontSizeDescricao,
                        color: completo ? '#4ade80' : pendente ? '#facc15' : isProximo ? '#ffffff' : 'rgba(255,255,255,0.6)',
                      }}>
                        {objetivo.descricao}
                      </span>
                      {pendente && (
                        <span className="rounded-full bg-yellow-500/30 text-yellow-300 font-bold animate-pulse" style={{
                          fontSize: fontSizeBadge,
                          padding: '1px 6px',
                        }}>
                          RECOMPENSA DISPONÍVEL!
                        </span>
                      )}
                      {isProximo && !completo && !pendente && (
                        <span className="rounded-full bg-purple-500/30 text-purple-300 font-bold animate-pulse" style={{
                          fontSize: fontSizeBadge,
                          padding: '1px 6px',
                        }}>
                          PRÓXIMO
                        </span>
                      )}
                      {completo && (
                        <span className="rounded-full bg-green-500/30 text-green-400 font-bold" style={{
                          fontSize: fontSizeBadge,
                          padding: '1px 6px',
                        }}>
                          COMPLETO
                        </span>
                      )}
                    </div>
                    
                    {/* ─── BARRA DE PROGRESSO ──────────────────── */}
                    <div className="w-full bg-white/10 rounded-full overflow-hidden" style={{
                      height: isMobile ? '3px' : '6px',
                      marginTop: isMobile ? '2px' : '6px',
                    }}>
                      <div 
                        className="h-full rounded-full transition-all duration-500" style={{
                          width: `${Math.min(progressoValue * 100, 100)}%`,
                          background: completo 
                            ? '#4ade80' 
                            : pendente 
                              ? '#facc15' 
                              : isProximo 
                                ? 'linear-gradient(90deg, #6A00FF, #8B00FF)'
                                : 'rgba(255,255,255,0.3)',
                        }}
                      />
                    </div>

                    {/* ─── PROGRESSO TEXTUAL ──────────────────── */}
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-white/40" style={{
                        fontSize: fontSizeProgresso,
                      }}>
                        {atual} / {meta} {objetivo.condicao === 'diferentes' ? 'diferentes' : 'totais'}
                      </span>
                      <span className="text-white/40" style={{
                        fontSize: fontSizeProgresso,
                      }}>
                        🎁 {objetivo.recompensa.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ─── BOTÃO PEGAR RECOMPENSA ────────────────── */}
                {pendente && (
                  <button
                    onClick={() => pegarRecompensa(setorSelecionado, objetivo.id)}
                    className="mt-2 w-full py-1.5 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold animate-pulse hover:scale-[1.02] transition-all" style={{
                      fontSize: isMobile ? '10px' : '14px',
                      boxShadow: '0 0 30px rgba(234, 179, 8, 0.3)',
                    }}
                  >
                    ⭐ Pegar Recompensa!
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ─── FOOTER ────────────────────────────────────────────── */}
      <div className="p-2 border-t border-white/5 flex-shrink-0 bg-white/5">
        <div className="flex items-center justify-between text-white/40" style={{
          fontSize: isMobile ? '7px' : '10px',
        }}>
          <span>📦 {totalCompletas} recompensas</span>
          <span>🎯 {totalCompletas} / {totalMissoes} completos</span>
          {totalPendentes > 0 && (
            <span className="text-yellow-400">⭐ {totalPendentes} pendente(s)</span>
          )}
        </div>
      </div>

      <style>{`
        .scrollbar-custom::-webkit-scrollbar {
          width: 3px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 10px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.3);
        }
      `}</style>
    </div>
  );
}