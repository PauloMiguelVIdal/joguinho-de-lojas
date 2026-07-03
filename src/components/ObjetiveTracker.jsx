// ObjectiveTracker.jsx
import React, { useContext, useEffect, useState, useCallback, useMemo } from "react";
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
  
  // Adicione mais condições aqui conforme necessário
  // ex: especificas: (nomes) => ({ ... })
};

// ─── CONFIGURAÇÃO DOS OBJETIVOS ──────────────────────────────
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

  const [objetivosCompletos, setObjetivosCompletos] = useState(new Set());
  const [recompensasRecebidas, setRecompensasRecebidas] = useState([]);

  
  // ─── ESTADO PARA RECOMPENSAS PENDENTES ──────────────────────
  const [recompensasPendentes, setRecompensasPendentes] = useState({});

  // ─── FUNÇÃO PARA OBTER EDIFÍCIOS DE UM SETOR ──────────────
  const getEdificiosDoSetor = useCallback((setor) => {
    if (!dados[setor]?.edificios) return [];
    return dados[setor].edificios.filter(ed => ed.quantidade > 0);
  }, [dados]);

  // ─── FUNÇÃO PARA ADICIONAR CARTA AO INVENTÁRIO ─────────────
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

  // ─── FUNÇÃO PARA VERIFICAR SE UM OBJETIVO FOI ATINGIDO ─────
  const verificarObjetivo = useCallback((setor, objetivoId) => {
    const chave = `${setor}_${objetivoId}`;
    
    if (objetivosCompletos.has(chave)) return false;
    if (recompensasPendentes[chave]) return false;
    
    const objetivo = OBJETIVOS[setor]?.find(obj => obj.id === objetivoId);
    if (!objetivo) return false;
    
    const { condicao } = resolverCondicao(objetivo);
    const edificios = getEdificiosDoSetor(setor);
    return condicao(edificios);
  }, [objetivosCompletos, recompensasPendentes, getEdificiosDoSetor]);

  // ─── FUNÇÃO PARA PEGAR RECOMPENSA ──────────────────────────
  const pegarRecompensa = useCallback((setor, objetivoId) => {
    const chave = `${setor}_${objetivoId}`;
    
    if (!recompensasPendentes[chave]) return;
    
    const objetivo = OBJETIVOS[setor]?.find(obj => obj.id === objetivoId);
    if (!objetivo) return;
    
    const recompensa = objetivo.recompensa;
    
    if (recompensa.tipo === "pacote") {
      if (onPackReceived) {
        onPackReceived();
      }
      
      setObjetivosCompletos(prev => new Set(prev).add(chave));
      setRecompensasPendentes(prev => {
        const novo = { ...prev };
        delete novo[chave];
        return novo;
      });
      setRecompensasRecebidas(prev => [...prev, {
        id: chave,
        setor,
        descricao: objetivo.descricao,
        recompensa: recompensa.label
      }]);
      
    } else if (recompensa.tipo === "cartas") {
      recompensa.cartas.forEach(nome => {
        adicionarCartaAoInventario(nome);
      });
      
      if (onCartasRecebidas) {
        onCartasRecebidas(recompensa.cartas);
      }
      
      setObjetivosCompletos(prev => new Set(prev).add(chave));
      setRecompensasPendentes(prev => {
        const novo = { ...prev };
        delete novo[chave];
        return novo;
      });
      setRecompensasRecebidas(prev => [...prev, {
        id: chave,
        setor,
        descricao: objetivo.descricao,
        recompensa: recompensa.label
      }]);
    }
  }, [recompensasPendentes, onPackReceived, onCartasRecebidas, adicionarCartaAoInventario]);

  // ─── FUNÇÃO PARA VERIFICAR TODOS OS OBJETIVOS ──────────────
  const verificarTodosObjetivos = useCallback(() => {
    const novasPendentes = { ...recompensasPendentes };
    let hasChanges = false;

    for (const [setor, objetivos] of Object.entries(OBJETIVOS)) {
      for (const objetivo of objetivos) {
        const chave = `${setor}_${objetivo.id}`;
        
        if (objetivosCompletos.has(chave)) continue;
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
  }, [objetivosCompletos, recompensasPendentes, getEdificiosDoSetor]);

  // ─── EFFECT: VERIFICAR QUANDO DADOS MUDAM ─────────────────
  useEffect(() => {
    verificarTodosObjetivos();
  }, [dados, verificarTodosObjetivos]);

  // ─── EFFECT: VERIFICAR A CADA DIA ─────────────────────────
  useEffect(() => {
    if (dados.dia > 0) {
      verificarTodosObjetivos();
    }
  }, [dados.dia, verificarTodosObjetivos]);

  useEffect(() => {
    if (setorInicial) {
      setSetorSelecionado(setorInicial);
    }
  }, [setorInicial]);


  // ─── MEMO: OBJETIVOS DO SETOR SELECIONADO ─────────────────
  const objetivosSetor = useMemo(() => {
    return OBJETIVOS[setorSelecionado] || [];
  }, [setorSelecionado]);

  // ─── MEMO: EDIFÍCIOS DO SETOR SELECIONADO ─────────────────
  const edificiosSetor = useMemo(() => {
    return getEdificiosDoSetor(setorSelecionado);
  }, [setorSelecionado, getEdificiosDoSetor]);

  // ─── CALCULAR PROGRESSO ────────────────────────────────────
  const calcularProgresso = useCallback((objetivo) => {
    const { progresso } = resolverCondicao(objetivo);
    const atual = progresso(edificiosSetor);
    const total = objetivo.meta;
    return Math.min(atual / total, 1);
  }, [edificiosSetor]);

  // ─── VERIFICAR SE OBJETIVO ESTÁ COMPLETO ──────────────────
  const isObjetivoCompleto = useCallback((setor, id) => {
    const chave = `${setor}_${id}`;
    return objetivosCompletos.has(chave);
  }, [objetivosCompletos]);

  // ─── VERIFICAR SE OBJETIVO ESTÁ PENDENTE ──────────────────
  const isObjetivoPendente = useCallback((setor, id) => {
    const chave = `${setor}_${id}`;
    return !!recompensasPendentes[chave];
  }, [recompensasPendentes]);

  // ─── RENDER ─────────────────────────────────────────────────
  return (
    <>
      <div className="h-[40vh] w-[25vw] bg-[#1a0a3b] rounded-[20px] border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        {/* ─── HEADER ────────────────────────────────────────────── */}
        <div className="p-4 border-b border-white/10 flex-shrink-0">
          <h2 className="text-white font-bold text-lg flex items-center gap-2">
            <span>🎯</span> Objetivos
          </h2>
        </div>

        {/* ─── LISTA DE OBJETIVOS ──────────────────────────────── */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-custom">
          {objetivosSetor.length === 0 ? (
            <div className="text-white/40 text-center text-sm py-8">
              Nenhum objetivo disponível para este setor
            </div>
          ) : (
            objetivosSetor.map((objetivo) => {
              const chave = `${setorSelecionado}_${objetivo.id}`;
              const completo = objetivosCompletos.has(chave);
              const pendente = !!recompensasPendentes[chave];
              const { progresso } = resolverCondicao(objetivo);
              const progressoValue = calcularProgresso(objetivo);
              const atual = progresso(edificiosSetor);
              const meta = objetivo.meta;
              
              const isProximo = !completo && !pendente && 
                objetivosSetor.filter(obj => {
                  const ch = `${setorSelecionado}_${obj.id}`;
                  return !objetivosCompletos.has(ch) && !recompensasPendentes[ch];
                })[0]?.id === objetivo.id;

              return (
                <div 
                  key={objetivo.id}
                  className={`p-3 rounded-xl transition-all ${
                    completo 
                      ? 'bg-green-500/10 border border-green-500/30' 
                      : pendente
                        ? 'bg-yellow-500/20 border-2 border-yellow-500/50 shadow-lg shadow-yellow-500/20'
                        : isProximo 
                          ? 'bg-gradient-to-r from-[#6A00FF]/20 to-[#8B00FF]/20 border border-purple-500/30 shadow-lg shadow-purple-500/10' 
                          : 'bg-white/5 border border-white/5'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* ─── CHECK / PROGRESSO ────────────────────── */}
                    <div className="flex-shrink-0 mt-0.5">
                      {completo ? (
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      ) : pendente ? (
                        <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-500/30 animate-pulse">
                          <span className="text-white text-sm">⭐</span>
                        </div>
                      ) : (
                        <div className="relative w-6 h-6">
                          <svg className="w-6 h-6 transform -rotate-90">
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              fill="none"
                              stroke="rgba(255,255,255,0.1)"
                              strokeWidth="3"
                            />
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              fill="none"
                              stroke={isProximo ? "#8B00FF" : "rgba(255,255,255,0.3)"}
                              strokeWidth="3"
                              strokeDasharray={`${progressoValue * 62.83} 62.83`}
                              strokeLinecap="round"
                              className="transition-all duration-500"
                            />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white/60">
                            {Math.round(progressoValue * 100)}%
                          </span>
                        </div>
                      )}
                    </div>

                    {/* ─── INFORMAÇÕES ──────────────────────────── */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-sm font-bold ${
                          completo ? 'text-green-400' : pendente ? 'text-yellow-400' : isProximo ? 'text-white' : 'text-white/60'
                        }`}>
                          {objetivo.descricao}
                        </span>
                        {pendente && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/30 text-yellow-300 font-bold animate-pulse">
                            RECOMPENSA DISPONÍVEL!
                          </span>
                        )}
                        {isProximo && !completo && !pendente && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-300 font-bold animate-pulse">
                            PRÓXIMO
                          </span>
                        )}
                        {completo && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/30 text-green-400 font-bold">
                            COMPLETO
                          </span>
                        )}
                      </div>
                      
                      {/* ─── BARRA DE PROGRESSO ──────────────────── */}
                      <div className="mt-1.5 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            completo ? 'bg-green-500' : pendente ? 'bg-yellow-500' : isProximo ? 'bg-gradient-to-r from-[#6A00FF] to-[#8B00FF]' : 'bg-white/30'
                          }`}
                          style={{ width: `${Math.min(progressoValue * 100, 100)}%` }}
                        />
                      </div>

                      {/* ─── PROGRESSO TEXTUAL ──────────────────── */}
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] text-white/40">
                          {atual} / {meta} {objetivo.condicao === 'diferentes' ? 'diferentes' : 'totais'}
                        </span>
                        <span className="text-[10px] text-white/40">
                          🎁 {objetivo.recompensa.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ─── BOTÃO PEGAR RECOMPENSA ────────────────── */}
                  {pendente && (
                    <button
                      onClick={() => pegarRecompensa(setorSelecionado, objetivo.id)}
                      className="mt-3 w-full py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold text-sm hover:scale-[1.02] transition-all shadow-lg shadow-yellow-500/30 animate-pulse"
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
        <div className="p-3 border-t border-white/5 flex-shrink-0 bg-white/5">
          <div className="flex items-center justify-between text-white/40 text-xs">
            <span>📦 {recompensasRecebidas.length} recompensas recebidas</span>
            <span>🎯 {Array.from(objetivosCompletos).length} objetivos completos</span>
            {Object.keys(recompensasPendentes).length > 0 && (
              <span className="text-yellow-400">⭐ {Object.keys(recompensasPendentes).length} pendente(s)</span>
            )}
          </div>
        </div>

        <style>{`
          .scrollbar-custom::-webkit-scrollbar {
            width: 4px;
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
    </>
  );
}