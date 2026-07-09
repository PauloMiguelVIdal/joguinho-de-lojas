import React, { useContext, useState, useEffect, useCallback, useRef, useMemo } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { motion, AnimatePresence } from "framer-motion";
import fechar from "../../public/outrasImagens/fechar.png";
import { CardDraft } from "./CardDraft.jsx";

// ============================================================
// CONSTANTES DOS RANKS
// ============================================================
const RankS = [
  "Usina Hidrelétrica", "Reator Nuclear Convencional", "Usina De Fusão Nuclear",
  "Shopping Popular", "Shopping Center", "Fábrica De Computadores",
  "Construtora De Infraestruturas", "Aeroporto", "Porto", "Mineradora Radioativa",
  "Plataforma De Petróleo", "Montadora De Veículos Elétricos", "Fábrica De Automóveis",
  "Refinaria", "Fábrica De Chips", "Fábrica De Semicondutores", "Fábrica De Robôs",
  "Fábrica De Motores", "Fábrica De Foguetes", "Fábrica De Aeronaves"
];

const RankA = [
  "Cooperativa Agrícola", "Usina De Biomassa", "Transporte Petrolífero",
  "Marketplace Online", "Plataforma De Streaming", "Fábrica De Smartphones",
  "Fábrica De Consoles De Jogos", "Fábrica De Dispositivos Vestíveis",
  "Centro De Pesquisa Em Fusão Nuclear", "Centro De Pesquisa Aeroespacial",
  "Centro De Engenharia Avançada", "Centro De Pesquisa Em Materiais",
  "Centro De Pesquisa Em IA", "Mineradora De Pedras Preciosas", "Mega Mercado",
  "Prédio De Alto Padrão", "Tanque De Armazenamento Biocombustível", "Fábrica De Químicos Especializados", "Alto-Forno",
  "Usina Siderúrgica", "Fundição De Alumínio", "Fábrica De Ligas Metálicas",
  "Fábrica De Peças Automotivas", "Refinaria De Biocombustíveis", "Biofábrica",
  "Fábrica De Eletrônicos", "Empresa De Automação Industrial", "Estaleiro"
];

const RankB = [
  "Centro De Comércio De Plantações", "Empresa De Comércio Energético",
  "Empresa De Consultoria Energética", "Centro De Pesquisa Em Energias Renováveis",
  "Centro De Pesquisa Energética", "Usina Termelétrica A Biocombustíveis", "Usina Termelétrica", "Joalheria", "Concessionária De Veículos",
  "Centro De Distribuição", "Armazém Logístico", "Servidor Em Nuvem", "Data Center",
  "Empresa De Desenvolvimento De Software", "Empresa De Jogos Digitais",
  "Empresa De Telecomunicações", "Plataforma De Redes Sociais", "Marketplace Online",
  "Instituto De Tecnologia Alimentar", "Centro De Pesquisa Agrícola",
  "Instituto De Biotecnologia", "Laboratório De Nanotecnologia",
  "Centro De Pesquisa Em Eletrônicos", "Laboratório De Design De Produtos",
  "Laboratório De Novos Combustíveis", "Centro De Engenharia Avançada",
  "Centro De Pesquisa Em Robótica", "Construtora", "Imobiliária Residencial",
  "Imobiliária Comercial", "Mineradora", "Centro De Coleta De Biomassa",
  "Fábrica De Fertilizantes", "Fábrica De Medicamentos", "Laboratório Farmacêutico",
  "Fábrica De Plásticos", "Indústria De Componentes Mecânicos",
  "Fábrica De Chapas Metálicas", "Fábrica De Estruturas Metálicas",
  "Fábrica De Placas Eletrônicas",
];

const RankC = [
  "Plantação De Grãos", "Plantação De Vegetais", "Pomares", "Fazenda Administrativa",
  "Fazenda De Vacas", "Granja De Aves", "Criação De Ovinos", "Armazém", "Silo",
  "Depósito De Resíduos Orgânicos", "Madeireira", "Área Florestal", "Terreno De Mineração",
  "Plantação De Eucalipto", "Plantação De Plantas Medicinais", "Subestação De Energia",
  "Rede De Distribuição Elétrica", "Usina Solar", "Fábrica De Turbinas Eólicas",
  "Fábrica De Painéis Solares", "Fábrica De Baterias", "Estação De Carregamento",
  "Centro De Reciclagem De Baterias", "Parque Eólico", "Feira", "Loja De Móveis",
  "Restaurante", "Livraria", "Mercado", "Adega", "Padaria", "Açougue",
  "Loja De Conveniência", "Posto De Combustíveis", "Rede De Fast-Food", "Petshop",
  "Farmácia", "Cafeteria", "Loja De Departamentos", "Loja De Calçados",
  "Loja De Vestuário", "Loja De Gadgets E Wearables", "Loja De Games",
  "Loja De Celulares", "Loja De Informática", "Loja De Eletrônicos",
  "Centro De Transporte E Entrega", "Startup", "Centro De Pesquisa Química",
  "Cartório E Licenças", "Terraplanagem E Pavimentação", "Construtora De Pequenas Obras",
  "Escritório De Design De Interiores", "Escritório De Arquitetura",
  "Consultoria Em Engenharia Civil", "Fábrica De Móveis", "Fábrica De Rações",
  "Fábrica De Embalagens", "Fábrica De Bebidas", "Fábrica De Pães", "Fábrica Têxtil",
  "Fábrica De Calçados", "Fábrica De Roupas", "Fábrica De Celulose",
  "Fábrica De Papel", "Fábrica De Livros"
];

// 🔥 MAPA DE RANKS PARA ACESSO DINÂMICO
const RANKS_MAP = {
  C: { lista: RankC, label: "Classe C", cor: "#8B8B8B", emoji: "🟢", desc: "Edifícios básicos" },
  B: { lista: RankB, label: "Classe B", cor: "#CD7F32", emoji: "🟡", desc: "Edifícios intermediários" },
  A: { lista: RankA, label: "Classe A", cor: "#C0C0C0", emoji: "🔵", desc: "Edifícios avançados" },
  S: { lista: RankS, label: "Classe S", cor: "#FFD700", emoji: "🟣", desc: "Edifícios lendários" }
};

const RANKS_ORDEM = ['C', 'B', 'A', 'S'];
const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

// ─── DETECTAR MOBILE ──────────────────────────────────────────────
function useDeviceDetection() {
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
    window.addEventListener('orientationchange', () => {
      setTimeout(checkDevice, 300);
    });

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  return { isMobile, isLandscape, isDesktop: !isMobile };
}

// ============================================================
// FUNÇÃO PARA OBTER O RANK BASEADO NO DIA
// ============================================================
export const getRankPorDia = (dia) => {
  if (dia <= 90) return 'C';
  if (dia <= 180) return 'B';
  if (dia <= 270) return 'A';
  return 'S';
};

// ============================================================
// COMPONENTE DE DICAS
// ============================================================
const DicasDraft = ({ dicas, titulo = "💡 Dicas", isMobile }) => {
  if (!dicas || dicas.length === 0) return null;

  return (
    <div className={`${isMobile ? 'hidden' : 'block'} bg-[#6A00FF]/10 border border-[#6A00FF]/20 rounded-xl p-2.5 mb-2 flex-shrink-0`}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[#8B00FF] text-sm">💡</span>
        <span className="text-white/60 text-[9px] font-bold uppercase tracking-wider">{titulo}</span>
      </div>
      <ul className="space-y-0.5">
        {dicas.map((dica, index) => (
          <li key={index} className="flex items-start gap-2 text-white/70 text-[11px]">
            <span className="text-[#8B00FF] text-[9px] mt-0.5">▸</span>
            <span>{dica}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ============================================================
// COMPONENTE PARA DRAFT INICIAL (4C + 1B)
// ============================================================
export const DraftSystemInicial = ({
  onClose,
  onComplete,
  quantidadeOpcoes = 3,
  titulo = "📋 Draft Inicial",
  instrucao = "📌 Escolha as suas cartas para começar sua jornada!"
}) => {
  const { isMobile, isLandscape, isDesktop } = useDeviceDetection();
  const { dados, atualizarDadosProf2 } = useContext(CentraldeDadosContext);
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);

  // ── ESTADOS ────────────────────────────────────────────────
  const [rodadaAtual, setRodadaAtual] = useState(0);
  const [tipoRodadaAtual, setTipoRodadaAtual] = useState('C');
  const [opcoes, setOpcoes] = useState([]);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
  const [cartasEscolhidas, setCartasEscolhidas] = useState([]);
  const [cartasUsadas, setCartasUsadas] = useState(new Set());
  const [draftFinalizado, setDraftFinalizado] = useState(false);
  const [animando, setAnimando] = useState(false);

  const cartasUsadasRef = useRef(new Set());
  const totalRodadas = 5;

  // ── DICAS PARA O DRAFT INICIAL ──────────────────────────────
  const dicasIniciais = [
    "📈 Foque no Faturamento Mensal (lado esquerdo da carta) — é a principal fonte de lucro!",
    "⚡ Power-ups na parte inferior podem turbinar seus outros edifícios, gerando sinergias poderosas.",
    "🎯 Concentre-se no setor que você escolheu para desbloquear recompensas mais rápido.",
    "🏆 Cartas de Rank S são raras e valiosas — priorize-as quando aparecerem!"
  ];

  // ── CONFIGURAÇÕES RESPONSIVAS ──────────────────────────────
  const gridCols = isMobile ? (isLandscape ? 'grid-cols-3' : 'grid-cols-3') : 'grid-cols-3';
  const cardPadding = isMobile ? 'p-2' : 'p-2.5';
  const gapCards = isMobile ? 'gap-2' : 'gap-3';
  const fontSizeTitulo = isMobile ? 'text-base' : 'text-xl';
  const fontSizeInstrucao = isMobile ? 'text-xs' : 'text-base';
  const paddingModal = isMobile ? 'p-2.5' : 'p-4';
  const larguraHistorico = isMobile ? (isLandscape ? '140px' : '0px') : '200px';
  const mostrarHistorico = isDesktop || isLandscape;
  const maxWidthModal = isMobile ? '98vw' : '1100px';
  const maxHeightModal = isMobile ? '98vh' : '92vh';
  const tamanhoBotao = isMobile ? 'py-1.5 text-[11px]' : 'py-2 text-sm';

  // ── FUNÇÕES AUXILIARES ─────────────────────────────────────
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const getListaPorRank = useCallback((rank) => {
    return RANKS_MAP[rank]?.lista || [];
  }, []);

  const getSetorDaCarta = useCallback((nomeCarta) => {
    for (const setor of setoresArr) {
      const idx = dados[setor]?.edificios?.findIndex(e => e.nome === nomeCarta);
      if (idx !== -1 && idx !== undefined) {
        return { setor, index: idx };
      }
    }
    return null;
  }, [dados]);

  const jogadorPossuiCarta = useCallback((nomeCarta) => {
    for (const setor of setoresArr) {
      const encontrado = dados[setor]?.edificios?.find(e => e.nome === nomeCarta);
      if (encontrado && encontrado.quantidade > 0) {
        return true;
      }
    }
    return false;
  }, [dados]);

  const getCartasDisponiveis = useCallback((rank) => {
    const lista = getListaPorRank(rank);
    const disponiveis = lista.filter(nome => {
      if (cartasUsadasRef.current.has(nome)) return false;
      if (jogadorPossuiCarta(nome)) return false;
      return true;
    });
    return disponiveis;
  }, [getListaPorRank, jogadorPossuiCarta]);

  const gerarOpcoesRodada = useCallback((rank) => {
    const disponiveis = getCartasDisponiveis(rank);
    const listaCompleta = getListaPorRank(rank);

    let opcoesGeradas = [];

    if (disponiveis.length >= quantidadeOpcoes) {
      const embaralhadas = shuffleArray(disponiveis);
      opcoesGeradas = embaralhadas.slice(0, quantidadeOpcoes);
    } else {
      const disponiveisCompletas = [...disponiveis];
      for (const nome of listaCompleta) {
        if (!disponiveisCompletas.includes(nome) && !cartasUsadasRef.current.has(nome)) {
          disponiveisCompletas.push(nome);
        }
        if (disponiveisCompletas.length >= quantidadeOpcoes) break;
      }
      const embaralhadas = shuffleArray(disponiveisCompletas);
      opcoesGeradas = embaralhadas.slice(0, quantidadeOpcoes);
    }
    return opcoesGeradas;
  }, [getCartasDisponiveis, getListaPorRank, quantidadeOpcoes]);

  const aplicarCartaAoJogo = useCallback((nomeCarta) => {
    const info = getSetorDaCarta(nomeCarta);
    if (info) {
      const quantidadeAtual = dados[info.setor].edificios[info.index].quantidade || 0;
      atualizarDadosProf2(
        [info.setor, "edificios", info.index, "quantidade"],
        quantidadeAtual + 1
      );
      return true;
    }
    return false;
  }, [dados, setoresArr, atualizarDadosProf2, getSetorDaCarta]);

  // ── LÓGICA DO DRAFT ────────────────────────────────────────
  const iniciarProximaRodada = useCallback(() => {
    const rodadaCAtual = cartasEscolhidas.filter(c => c.tipo === 'C').length;
    const rodadaBAtual = cartasEscolhidas.filter(c => c.tipo === 'B').length;

    if (rodadaCAtual >= 4 && rodadaBAtual >= 1) {
      setDraftFinalizado(true);
      setAnimando(false);
      if (onComplete) {
        onComplete(cartasEscolhidas);
      }
      return;
    }

    let tipo = 'C';
    if (rodadaCAtual >= 4) {
      tipo = 'B';
    }

    setTipoRodadaAtual(tipo);
    setOpcaoSelecionada(null);
    setAnimando(false);

    const novasOpcoes = gerarOpcoesRodada(tipo);
    setOpcoes(novasOpcoes);
    setRodadaAtual(prev => prev + 1);
  }, [cartasEscolhidas, gerarOpcoesRodada, onComplete]);

  const iniciarDraft = useCallback(() => {
    cartasUsadasRef.current = new Set();
    setCartasUsadas(new Set());
    setCartasEscolhidas([]);
    setRodadaAtual(0);
    setDraftFinalizado(false);
    setOpcaoSelecionada(null);

    const primeirasOpcoes = gerarOpcoesRodada('C');
    setOpcoes(primeirasOpcoes);
    setTipoRodadaAtual('C');
    setRodadaAtual(1);
  }, [gerarOpcoesRodada]);

  const selecionarCarta = useCallback((carta) => {
    if (animando || opcaoSelecionada) return;

    setAnimando(true);
    setOpcaoSelecionada(carta);

    cartasUsadasRef.current.add(carta);
    setCartasUsadas(prev => new Set(prev).add(carta));

    const novaCarta = {
      nome: carta,
      tipo: tipoRodadaAtual,
      rodada: rodadaAtual
    };

    setCartasEscolhidas(prev => [...prev, novaCarta]);
    aplicarCartaAoJogo(carta);

    setTimeout(() => {
      iniciarProximaRodada();
    }, 800);
  }, [animando, opcaoSelecionada, tipoRodadaAtual, rodadaAtual, cartasEscolhidas, iniciarProximaRodada, aplicarCartaAoJogo]);

  // ── INICIAR DRAFT AUTOMATICAMENTE ──────────────────────
  useEffect(() => {
    if (opcoes.length === 0 && !draftFinalizado) {
      iniciarDraft();
    }
  }, [opcoes.length, draftFinalizado, iniciarDraft]);

  // ── FUNÇÃO PARA OBTER INFORMAÇÕES DO RANK ──────────────
  const getRankInfo = useCallback((rank) => {
    return RANKS_MAP[rank] || RANKS_MAP['C'];
  }, []);

  // ── RENDER ──────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a1a]/95 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 120 }}
        className="relative bg-[#1a0a3b] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col"
        style={{
          width: '96vw',
          maxWidth: maxWidthModal,
          maxHeight: maxHeightModal,
          padding: isMobile ? '10px' : '16px',
        }}
      >
        {/* ─── HEADER ── */}
        <div className="flex items-center justify-between mb-2 flex-shrink-0">
          <div className="min-w-0">
            <h2 className={`${fontSizeTitulo} font-bold text-white truncate`}>
              {draftFinalizado ? "🎉 Draft Inicial Concluído!" : titulo}
            </h2>
            {!draftFinalizado && (
              <p className="text-white/50 text-xs mt-0.5 flex flex-wrap items-center gap-1">
                <span>Rodada {rodadaAtual} de {totalRodadas}</span>
                <span className="text-white/20">•</span>
                <span style={{ color: getRankInfo(tipoRodadaAtual).cor }}>
                  {getRankInfo(tipoRodadaAtual).emoji} {getRankInfo(tipoRodadaAtual).label}
                </span>
              </p>
            )}
          </div>
        </div>

        {/* ─── DICAS ── */}
        <DicasDraft dicas={dicasIniciais} titulo="💡 Dicas para o Draft Inicial" isMobile={isMobile} />

        {/* ─── CONTEÚDO PRINCIPAL ── */}
        <div className="flex-1 flex gap-3 min-h-0">
          {/* ─── COLUNA ESQUERDA: OPÇÕES ── */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="text-center mb-2 flex-shrink-0">
              <p className={`text-white/70 ${fontSizeInstrucao} font-medium`}>{instrucao}</p>
              <p className="text-white/30 text-[10px] mt-0.5">
                {cartasEscolhidas.filter(c => c.tipo === 'C').length} Classe C • {cartasEscolhidas.filter(c => c.tipo === 'B').length} Classe B
              </p>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-custom pr-1">
              <div className={`grid grid-cols-1 ${gridCols} ${gapCards} pb-1`}>
                {opcoes.map((carta, index) => {
                  const isSelecionada = opcaoSelecionada === carta;
                  const isDesabilitada = animando || !!opcaoSelecionada;
                  const info = getSetorDaCarta(carta);
                  const rankInfo = getRankInfo(tipoRodadaAtual);

                  return (
                    <div 
                      key={index} 
                      className={`flex flex-col items-center bg-white/5 rounded-xl ${cardPadding} border transition-all duration-300 ${
                        isSelecionada 
                          ? 'border-[#34d399]/50 shadow-lg shadow-[#34d399]/20' 
                          : 'border-white/5 hover:border-white/20'
                      }`}
                    >
                      {info && (
                        <div 
                          className={`w-full flex items-center justify-center transition-all duration-300 ${
                            isDesabilitada && !isSelecionada ? 'opacity-40 pointer-events-none' : 'cursor-pointer'
                          } ${isSelecionada ? 'scale-105' : 'hover:scale-102'}`}
                          onClick={() => !isDesabilitada && selecionarCarta(carta)}
                          style={{
                            boxShadow: isSelecionada ? `0 0 30px ${rankInfo.cor}44` : 'none'
                          }}
                        >
                          <CardDraft 
                            index={info.index} 
                            setor={info.setor} 
                            abrirModalSell={() => {}}
                          />
                        </div>
                      )}

                      <button
                        onClick={() => !isDesabilitada && selecionarCarta(carta)}
                        disabled={isDesabilitada}
                        className={`w-full ${tamanhoBotao} rounded-lg font-bold transition-all ${
                          isSelecionada 
                            ? 'bg-[#34d399] text-[#1a1a1a] shadow-lg shadow-[#34d399]/30'
                            : isDesabilitada
                              ? 'bg-white/5 text-white/30 cursor-not-allowed'
                              : 'bg-[#6A00FF] hover:bg-[#8B00FF] text-white hover:scale-[1.02]'
                        }`}
                      >
                        {isSelecionada ? '✓ Selecionado' : 'Selecionar'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ─── COLUNA DIREITA: HISTÓRICO ── */}
          {mostrarHistorico && (
            <div className={`flex-shrink-0 bg-white/5 rounded-xl p-2 flex flex-col border border-white/5`} style={{ width: larguraHistorico }}>
              <h3 className="text-white font-bold text-center text-[10px] uppercase tracking-wider mb-1.5 border-b border-white/5 pb-1.5">
                📜 Cartas Escolhidas ({cartasEscolhidas.length})
              </h3>

              <div className="flex-1 overflow-y-auto scrollbar-custom space-y-1 pr-1">
                {cartasEscolhidas.length === 0 ? (
                  <div className="text-white/20 text-center text-[10px] mt-2">
                    Nenhuma carta escolhida
                  </div>
                ) : (
                  cartasEscolhidas.map((carta, idx) => {
                    const info = getSetorDaCarta(carta.nome);
                    const rankInfo = getRankInfo(carta.tipo);
                    return (
                      <div
                        key={idx}
                        className="p-1.5 rounded-lg flex items-center gap-1.5 transition-all border"
                        style={{
                          backgroundColor: `${rankInfo.cor}10`,
                          borderColor: `${rankInfo.cor}20`
                        }}
                      >
                        <div className="w-6 h-6 rounded-lg bg-black/30 flex items-center justify-center flex-shrink-0">
                          {info && (
                            <img
                              src={`/imagens/${carta.nome}.png`}
                              alt={carta.nome}
                              className="w-4 h-4 object-contain"
                              onError={(e) => e.target.style.display = 'none'}
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-[10px] font-bold truncate">
                            {carta.nome}
                          </p>
                          <p className="text-white/30 text-[8px]">
                            {rankInfo.emoji} {rankInfo.label}
                          </p>
                        </div>
                        <span className="text-[8px] font-bold px-1 py-0.5 rounded bg-white/5 text-white/30">
                          #{idx + 1}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// ============================================================
// DRAFT CONTÍNUO
// ============================================================
export const DraftSystemContinuo = ({
  onClose,
  onComplete,
  diaAtual,
  quantidadeOpcoes = 3,
  titulo = "📋 Draft de Edifícios",
  instrucao = "📌 Escolha a carta que mais se adequa à sua estratégia."
}) => {
  const { isMobile, isLandscape, isDesktop } = useDeviceDetection();
  const { dados, atualizarDadosProf2 } = useContext(CentraldeDadosContext);
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);

  // ── ESTADOS ────────────────────────────────────────────────
  const [rodadaAtual, setRodadaAtual] = useState(0);
  const [tipoRodadaAtual, setTipoRodadaAtual] = useState('C');
  const [opcoes, setOpcoes] = useState([]);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
  const [cartasEscolhidas, setCartasEscolhidas] = useState([]);
  const [cartasUsadas, setCartasUsadas] = useState(new Set());
  const [draftFinalizado, setDraftFinalizado] = useState(false);
  const [animando, setAnimando] = useState(false);
  const [inventarioAtualizado, setInventarioAtualizado] = useState(0);

  const cartasUsadasRef = useRef(new Set());

  // ── DICAS PARA O DRAFT CONTÍNUO ──────────────────────────────
  const dicasContinuas = [
    "📊 O Faturamento Mensal (lado esquerdo) é sua principal fonte de renda — priorize cartas com alto valor!",
    "⚡ Power-ups acumulam e podem transformar seu negócio — fique de olho nos bônus que eles oferecem.",
    "🎯 Manter o foco no setor escolhido acelera seu progresso e desbloqueia recompensas exclusivas.",
    "🏅 Ranks mais altos (S > A > B > C) geralmente trazem melhores retornos no longo prazo.",
    "🔄 Diversificar seu portfólio pode gerar sinergias inesperadas entre edifícios diferentes."
  ];

  // ── CONFIGURAÇÕES RESPONSIVAS ──────────────────────────────
  const gridCols = isMobile ? (isLandscape ? 'grid-cols-3' : 'grid-cols-3') : 'grid-cols-3';
  const cardPadding = isMobile ? 'p-2' : 'p-2.5';
  const gapCards = isMobile ? 'gap-2' : 'gap-3';
  const fontSizeTitulo = isMobile ? 'text-base' : 'text-xl';
  const fontSizeInstrucao = isMobile ? 'text-xs' : 'text-base';
  const paddingModal = isMobile ? 'p-2.5' : 'p-4';
  const maxWidthModal = isMobile ? '98vw' : '1100px';
  const maxHeightModal = isMobile ? '98vh' : '92vh';
  const tamanhoBotao = isMobile ? 'py-1.5 text-[11px]' : 'py-2 text-sm';

  // ── FUNÇÕES AUXILIARES ─────────────────────────────────────
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const getListaPorRank = useCallback((rank) => {
    return RANKS_MAP[rank]?.lista || [];
  }, []);

  const getSetorDaCarta = useCallback((nomeCarta) => {
    for (const setor of setoresArr) {
      const idx = dados[setor]?.edificios?.findIndex(e => e.nome === nomeCarta);
      if (idx !== -1 && idx !== undefined) {
        return { setor, index: idx };
      }
    }
    return null;
  }, [dados]);

  const jogadorPossuiCarta = useCallback((nomeCarta) => {
    for (const setor of setoresArr) {
      const encontrado = dados[setor]?.edificios?.find(e => e.nome === nomeCarta);
      if (encontrado && encontrado.quantidade > 0) {
        return true;
      }
    }
    return false;
  }, [dados]);

  const getCartasDisponiveis = useCallback((rank) => {
    const lista = getListaPorRank(rank);
    const disponiveis = lista.filter(nome => {
      if (cartasUsadasRef.current.has(nome)) return false;
      if (jogadorPossuiCarta(nome)) return false;
      return true;
    });
    return disponiveis;
  }, [getListaPorRank, jogadorPossuiCarta]);

  const gerarOpcoesRodada = useCallback((rank) => {
    const disponiveis = getCartasDisponiveis(rank);
    const listaCompleta = getListaPorRank(rank);

    let opcoesGeradas = [];

    if (disponiveis.length >= quantidadeOpcoes) {
      const embaralhadas = shuffleArray(disponiveis);
      opcoesGeradas = embaralhadas.slice(0, quantidadeOpcoes);
    } else {
      const disponiveisCompletas = [...disponiveis];
      for (const nome of listaCompleta) {
        if (!disponiveisCompletas.includes(nome) && !cartasUsadasRef.current.has(nome)) {
          disponiveisCompletas.push(nome);
        }
        if (disponiveisCompletas.length >= quantidadeOpcoes) break;
      }
      let tentativas = 0;
      while (disponiveisCompletas.length < quantidadeOpcoes && tentativas < 100) {
        const extra = listaCompleta[Math.floor(Math.random() * listaCompleta.length)];
        if (!disponiveisCompletas.includes(extra)) {
          disponiveisCompletas.push(extra);
        }
        tentativas++;
      }
      const embaralhadas = shuffleArray(disponiveisCompletas);
      opcoesGeradas = embaralhadas.slice(0, quantidadeOpcoes);
    }
    return opcoesGeradas;
  }, [getCartasDisponiveis, getListaPorRank, quantidadeOpcoes]);

  const aplicarCartaAoJogo = useCallback((nomeCarta) => {
    const info = getSetorDaCarta(nomeCarta);
    if (info) {
      const quantidadeAtual = dados[info.setor].edificios[info.index].quantidade || 0;
      atualizarDadosProf2(
        [info.setor, "edificios", info.index, "quantidade"],
        quantidadeAtual + 1
      );
      setInventarioAtualizado(prev => prev + 1);
      return true;
    }
    return false;
  }, [dados, setoresArr, atualizarDadosProf2, getSetorDaCarta]);

  // ── LÓGICA DO DRAFT ────────────────────────────────────────
  const iniciarProximaRodada = useCallback(() => {
    const rank = getRankPorDia(diaAtual);
    setTipoRodadaAtual(rank);
    setOpcaoSelecionada(null);
    setAnimando(false);
    const novasOpcoes = gerarOpcoesRodada(rank);
    setOpcoes(novasOpcoes);
    setRodadaAtual(prev => prev + 1);
    if (novasOpcoes.length === 0) {
      setDraftFinalizado(true);
      if (onComplete) onComplete(cartasEscolhidas);
    }
  }, [diaAtual, gerarOpcoesRodada, onComplete, cartasEscolhidas]);

  const iniciarDraft = useCallback(() => {
    const rank = getRankPorDia(diaAtual);
    cartasUsadasRef.current = new Set();
    setCartasUsadas(new Set());
    setCartasEscolhidas([]);
    setRodadaAtual(0);
    setDraftFinalizado(false);
    setOpcaoSelecionada(null);
    setInventarioAtualizado(0);
    const primeirasOpcoes = gerarOpcoesRodada(rank);
    setOpcoes(primeirasOpcoes);
    setTipoRodadaAtual(rank);
    setRodadaAtual(1);
    if (primeirasOpcoes.length === 0) {
      setDraftFinalizado(true);
      if (onComplete) onComplete([]);
    }
  }, [diaAtual, gerarOpcoesRodada, onComplete]);

  const selecionarCarta = useCallback((carta) => {
    if (animando || opcaoSelecionada) return;
    setAnimando(true);
    setOpcaoSelecionada(carta);
    cartasUsadasRef.current.add(carta);
    setCartasUsadas(prev => new Set(prev).add(carta));
    const novaCarta = {
      nome: carta,
      tipo: tipoRodadaAtual,
      rodada: rodadaAtual,
      dia: diaAtual
    };
    setCartasEscolhidas(prev => [...prev, novaCarta]);
    aplicarCartaAoJogo(carta);
    setTimeout(() => {
      setDraftFinalizado(true);
      setAnimando(false);
      if (onComplete) {
        onComplete([...cartasEscolhidas, novaCarta]);
      }
      if (onClose) {
        onClose();
      }
    }, 800);
  }, [animando, opcaoSelecionada, tipoRodadaAtual, rodadaAtual, diaAtual, cartasEscolhidas, onComplete, onClose, aplicarCartaAoJogo]);

  // ── INICIAR DRAFT AUTOMATICAMENTE ──────────────────────
  useEffect(() => {
    if (opcoes.length === 0 && !draftFinalizado) {
      iniciarDraft();
    }
  }, [opcoes.length, draftFinalizado, iniciarDraft]);

  // ── FUNÇÃO PARA OBTER INFORMAÇÕES DO RANK ──────────────
  const getRankInfo = useCallback((rank) => {
    return RANKS_MAP[rank] || RANKS_MAP['C'];
  }, []);

  // ── RENDER ──────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a1a]/95 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 120 }}
        className="relative bg-[#1a0a3b] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col"
        style={{
          width: '96vw',
          maxWidth: maxWidthModal,
          maxHeight: maxHeightModal,
          padding: isMobile ? '10px' : '16px',
        }}
      >
        {/* ─── HEADER ── */}
        <div className="flex items-center justify-between mb-2 flex-shrink-0">
          <div className="min-w-0">
            <h2 className={`${fontSizeTitulo} font-bold text-white truncate`}>{titulo}</h2>
            <div className="flex items-center flex-wrap gap-1 mt-0.5">
              <span 
                className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                style={{
                  backgroundColor: `${getRankInfo(tipoRodadaAtual).cor}25`,
                  color: getRankInfo(tipoRodadaAtual).cor,
                  border: `1px solid ${getRankInfo(tipoRodadaAtual).cor}30`
                }}
              >
                {getRankInfo(tipoRodadaAtual).emoji} {getRankInfo(tipoRodadaAtual).label}
              </span>
              <span className="text-white/30 text-[10px] hidden sm:inline">{getRankInfo(tipoRodadaAtual).desc}</span>
              <span className="text-white/20 text-[10px]">•</span>
              <span className="text-white/20 text-[10px]">Dia {diaAtual}</span>
            </div>
          </div>
        </div>

        {/* ─── DICAS ── */}
        <DicasDraft dicas={dicasContinuas} titulo="💡 Dicas para o Draft Contínuo" isMobile={isMobile} />

        {/* ─── TEXTO DE INSTRUÇÃO ── */}
        <div className="text-center mb-2 flex-shrink-0">
          <p className={`text-white/70 ${fontSizeInstrucao} font-medium`}>{instrucao}</p>
        </div>

        {/* ─── OPÇÕES EM CARDS ── */}
        <div className="flex-1 overflow-y-auto scrollbar-custom pr-1">
          <div className={`grid grid-cols-1 ${gridCols} ${gapCards} pb-1`}>
            {opcoes.map((carta, index) => {
              const isSelecionada = opcaoSelecionada === carta;
              const isDesabilitada = animando || !!opcaoSelecionada;
              const info = getSetorDaCarta(carta);
              const rankInfo = getRankInfo(tipoRodadaAtual);

              return (
                <div 
                  key={index} 
                  className={`flex flex-col items-center bg-white/5 rounded-xl ${cardPadding} border transition-all duration-300 ${
                    isSelecionada 
                      ? 'border-[#34d399]/50 shadow-lg shadow-[#34d399]/20' 
                      : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  {info && (
                    <div 
                      className={`w-full flex items-center justify-center transition-all duration-300 ${
                        isDesabilitada && !isSelecionada ? 'opacity-40 pointer-events-none' : 'cursor-pointer'
                      } ${isSelecionada ? 'scale-105' : 'hover:scale-102'}`}
                      onClick={() => !isDesabilitada && selecionarCarta(carta)}
                      style={{
                        boxShadow: isSelecionada ? `0 0 30px ${rankInfo.cor}44` : 'none'
                      }}
                    >
                      <CardDraft 
                        index={info.index} 
                        setor={info.setor} 
                        abrirModalSell={() => {}}
                      />
                    </div>
                  )}

                  <button
                    onClick={() => !isDesabilitada && selecionarCarta(carta)}
                    disabled={isDesabilitada}
                    className={`w-full ${tamanhoBotao} rounded-lg font-bold transition-all ${
                      isSelecionada 
                        ? 'bg-[#34d399] text-[#1a1a1a] shadow-lg shadow-[#34d399]/30'
                        : isDesabilitada
                          ? 'bg-white/5 text-white/30 cursor-not-allowed'
                          : 'bg-[#6A00FF] hover:bg-[#8B00FF] text-white hover:scale-[1.02]'
                    }`}
                  >
                    {isSelecionada ? '✓ Selecionado' : 'Selecionar'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── INDICADOR DE PROGRESSO ── */}
        <div className="flex-shrink-0 mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-white/30 text-[10px] flex-wrap gap-1">
          <span>{cartasEscolhidas.length} carta(s) escolhida(s)</span>
          <span>Dia {diaAtual}</span>
        </div>
      </motion.div>
    </div>
  );
};

// ============================================================
// HOOK PARA GERENCIAR O DRAFT CONTÍNUO
// ============================================================
export const useDraftContinuo = () => {
  const [draftAberto, setDraftAberto] = useState(false);
  const [draftConcluido, setDraftConcluido] = useState(false);
  const [cartasSelecionadas, setCartasSelecionadas] = useState([]);
  const [ultimoDiaDraft, setUltimoDiaDraft] = useState(-1);

  const abrirDraft = useCallback((dia) => {
    setDraftAberto(true);
    setDraftConcluido(false);
    setUltimoDiaDraft(dia);
  }, []);

  const fecharDraft = useCallback(() => {
    setDraftAberto(false);
  }, []);

  const handleComplete = useCallback((cartas) => {
    setCartasSelecionadas(cartas);
    setDraftConcluido(true);
  }, []);

  return {
    draftAberto,
    draftConcluido,
    cartasSelecionadas,
    ultimoDiaDraft,
    abrirDraft,
    fecharDraft,
    handleComplete,
  };
};

// ============================================================
// STYLES GLOBAIS PARA SCROLLBAR
// ============================================================
const styles = `
  .scrollbar-custom::-webkit-scrollbar {
    width: 3px;
  }
  .scrollbar-custom::-webkit-scrollbar-track {
    background: rgba(255,255,255,0.05);
    border-radius: 4px;
  }
  .scrollbar-custom::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.2);
    border-radius: 4px;
  }
  .scrollbar-custom::-webkit-scrollbar-thumb:hover {
    background: rgba(255,255,255,0.3);
  }
`;

// Aplica os estilos
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);
}