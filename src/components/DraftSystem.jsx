import React, { useContext, useState, useEffect, useCallback, useRef, useMemo } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { motion, AnimatePresence } from "framer-motion";
import fechar from "../../public/outrasImagens/fechar.png";
import { CardDraft } from "./CardDraft.jsx";

// ============================================================
// CONSTANTES DOS RANKS
// ============================================================
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

const RankB = [
  "Centro De Comércio De Plantações", "Empresa De Comércio Energético",
  "Empresa De Consultoria Energética", "Centro De Pesquisa Em Energias Renováveis",
  "Centro De Pesquisa Energética", "Usina Termelétrica A Biocombustíveis",
  "Usina De Biomassa", "Usina Termelétrica", "Joalheria", "Concessionária De Veículos",
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
  "Fábrica De Plásticos", "Alto-Forno", "Indústria De Componentes Mecânicos",
  "Fábrica De Chapas Metálicas", "Fábrica De Estruturas Metálicas",
  "Fábrica De Peças Automotivas", "Fábrica De Placas Eletrônicas", "Fábrica De Eletrônicos"
];

const RankA = [
  "Cooperativa Agrícola", "Usina De Biomassa", "Transporte Petrolífero",
  "Marketplace Online", "Plataforma De Streaming", "Fábrica De Smartphones",
  "Fábrica De Consoles De Jogos", "Fábrica De Dispositivos Vestiveis",
  "Centro De Pesquisa Em Fusão Nuclear", "Centro De Pesquisa Aeroespacial",
  "Centro De Pesquisa Em Materiais", "Centro De Pesquisa Em IA",
  "Mineradora De Pedras Preciosas", "Mega Mercado", "Prédio De Alto Padrão",
  "Tanque De Armazenamento Biocombustível", "Fábrica De Plásticos",
  "Fábrica De Químicos Especializados", "Alto-Forno", "Usina Siderúrgica",
  "Fundição De Alumínio", "Fábrica De Ligas Metálicas", "Fábrica De Peças Automotivas",
  "Refinaria De Biocombustíveis", "Biofábrica", "Fábrica De Eletrônicos",
  "Empresa De Automação Industrial", "Estaleiro"
];

const RankS = [
  "Usina Hidrelétrica", "Reator Nuclear Convencional", "Usina De Fusão Nuclear",
  "Shopping Popular", "Shopping Center", "Fábrica De Computadores",
  "Construtora De Infraestruturas", "Aeroporto", "Porto", "Mineradora Radioativa",
  "Plataforma De Petróleo", "Montadora De Veículos Elétricos", "Fábrica De Automóveis",
  "Refinaria", "Fábrica De Chips", "Fábrica De Semicondutores", "Fábrica De Robôs",
  "Fábrica De Motores", "Fábrica De Foguetes", "Fábrica De Aeronaves"
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
// COMPONENTE PRINCIPAL DO DRAFT - VERSÃO CONTÍNUA
// ============================================================
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
  const totalRodadas = 5; // 4 C + 1 B

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
  // No DraftSystemInicial, substitua a função iniciarProximaRodada:

  const iniciarProximaRodada = useCallback(() => {
    const rodadaCAtual = cartasEscolhidas.filter(c => c.tipo === 'C').length;
    const rodadaBAtual = cartasEscolhidas.filter(c => c.tipo === 'B').length;

    // Se já temos 4 Rank C e 1 Rank B, finaliza e FECHA IMEDIATAMENTE
    if (rodadaCAtual >= 4 && rodadaBAtual >= 1) {
      setDraftFinalizado(true);
      setAnimando(false);
      // 🔥 FECHA IMEDIATAMENTE E CHAMA onComplete
      if (onComplete) {
        onComplete(cartasEscolhidas);
      }
      return;
    }

    // Se ainda não temos 4 Rank C, continua com Rank C
    let tipo = 'C';
    if (rodadaCAtual >= 4) {
      // Se já temos 4 Rank C, mas ainda não temos Rank B
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
        className="relative w-[95vw] max-w-[1400px] max-h-[92vh] bg-gradient-to-br flex items-center flex-col justify-around  from-[#350973] via-[#6411D9] to-[#8F5ADA] rounded-[30px] p-6 shadow-2xl border-2 border-[#C79FFF]/30 overflow-hidden"
      >


        {/* ── HEADER ── */}
        <div className="text-center mb-3">
          <h2 className="text-2xl font-bold text-white">
            {draftFinalizado ? "🎉 Draft Inicial Concluído!" : titulo}
          </h2>
          {!draftFinalizado && (
            <p className="text-white/70 text-sm mt-1">
              Rodada {rodadaAtual} de {totalRodadas} •
              <span style={{ color: getRankInfo(tipoRodadaAtual).cor }}>
                {getRankInfo(tipoRodadaAtual).emoji} {getRankInfo(tipoRodadaAtual).label}
              </span>
            </p>
          )}
          {draftFinalizado && (
            <p className="text-white/60 text-sm mt-1">
              Você escolheu {cartasEscolhidas.length} cartas!
            </p>
          )}
        </div>


        {/* ── CONTEÚDO PRINCIPAL ── */}
        <div className="flex gap-4 h-[calc(92vh-120px)]">
          {/* ── COLUNA ESQUERDA: OPÇÕES ── */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col h-full">
              {/* ── TEXTO DE INSTRUÇÃO ── */}
              <div className="text-center mb-4 flex-shrink-0">
                <p className="text-white/80 text-[20px] font-medium">
                  {instrucao}
                </p>
                <p className="text-white/40 text-xs mt-1">
                  {getRankInfo(tipoRodadaAtual).emoji} {getRankInfo(tipoRodadaAtual).label} - {getRankInfo(tipoRodadaAtual).desc}
                </p>
                <p className="text-white/30 text-xs mt-1">
                  {cartasEscolhidas.filter(c => c.tipo === 'C').length} Classe C • {cartasEscolhidas.filter(c => c.tipo === 'B').length} Classe B
                </p>
              </div>

              {/* ── OPÇÕES EM CARDS ── */}
        <div className="h-[calc(92vh-220px)] overflow-y-auto flex items-center scrollbar-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
            {opcoes.map((carta, index) => {
              const isSelecionada = opcaoSelecionada === carta;
              const isDesabilitada = animando || !!opcaoSelecionada;
              const info = getSetorDaCarta(carta);
              const rankInfo = getRankInfo(tipoRodadaAtual);

              return (
                <div 
                  key={index} 
                  className="flex flex-col items-center gap-3 bg-black/20 rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  {info && (
                    <div 
                      className={`w-full flex items-center justify-center transition-all duration-300 ${
                        isDesabilitada && !isSelecionada ? 'opacity-40 pointer-events-none' : 'cursor-pointer'
                      } ${isSelecionada ? 'scale-105' : 'hover:scale-102'}`}
                      onClick={() => !isDesabilitada && selecionarCarta(carta)}
                      style={{
                        boxShadow: isSelecionada ? `0 0 30px ${rankInfo.cor}66` : 'none'
                      }}
                    >
                      <CardDraft 
                        index={info.index} 
                        setor={info.setor} 
                        abrirModalSell={() => {}}
                      />
                    </div>
                  )}

                  {/* ── NOME DA CARTA ── */}
                  <p className="text-white/80 text-sm font-medium text-center truncate w-full px-2">
                    {/* {carta} */}
                  </p>

                  {/* ── BOTÃO SELECIONAR ── */}
                  <button
                    onClick={() => !isDesabilitada && selecionarCarta(carta)}
                    disabled={isDesabilitada}
                    className={`w-full py-2.5 rounded-lg font-bold text-sm transition-all ${
                      isSelecionada 
                        ? 'bg-[#34d399] text-[#1a1a1a] shadow-lg shadow-[#34d399]/30'
                        : isDesabilitada
                          ? 'bg-white/10 text-white/30 cursor-not-allowed'
                          : `bg-gradient-to-r from-[#6411D9] to-[#8F5ADA] hover:from-[#8F5ADA] hover:to-[#6411D9] text-white hover:scale-105`
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
          </div>

          {/* ── COLUNA DIREITA: HISTÓRICO ── */}
          <div className="w-[320px] flex-shrink-0 bg-black/30 rounded-2xl p-4 flex flex-col border border-white/10">
            <h3 className="text-white font-bold text-center text-sm uppercase tracking-wider mb-3 border-b border-white/10 pb-2">
              📜 Cartas Escolhidas ({cartasEscolhidas.length})
            </h3>

            <div className="flex-1 overflow-y-auto scrollbar-custom">
              {cartasEscolhidas.length === 0 ? (
                <div className="text-white/30 text-center text-sm mt-8">
                  Nenhuma carta escolhida ainda
                </div>
              ) : (
                <div className="space-y-2">
                  {cartasEscolhidas.map((carta, idx) => {
                    const info = getSetorDaCarta(carta.nome);
                    const rankInfo = getRankInfo(carta.tipo);
                    return (
                      <div
                        key={idx}
                        className={`p-2 rounded-lg flex items-center gap-3 transition-all border`}
                        style={{
                          backgroundColor: `${rankInfo.cor}15`,
                          borderColor: `${rankInfo.cor}30`
                        }}
                      >
                        <div className="w-8 h-8 rounded-lg bg-black/30 flex items-center justify-center flex-shrink-0">
                          {info && (
                            <img
                              src={`/imagens/${carta.nome}.png`}
                              alt={carta.nome}
                              className="w-6 h-6 object-contain"
                              onError={(e) => e.target.style.display = 'none'}
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-xs font-bold truncate">
                            {carta.nome}
                          </p>
                          <p className="text-white/40 text-[10px]">
                            {rankInfo.emoji} {rankInfo.label}
                          </p>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-white/60">
                          #{idx + 1}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ── RESUMO ── */}
            <div className="mt-3 pt-3 border-t border-white/10">
              <div className="flex justify-between text-xs text-white/60">
                <span>Classe C: {cartasEscolhidas.filter(c => c.tipo === 'C').length}</span>
                <span>Classe B: {cartasEscolhidas.filter(c => c.tipo === 'B').length}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};



export const DraftSystemContinuo = ({
  onClose,
  onComplete,
  diaAtual,
  quantidadeOpcoes = 3,
  titulo = "📋 Draft de Edifícios",
  instrucao = "📌 Dentre as opções abaixo, escolha a que mais se adequa à sua estratégia."
}) => {
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

  // ── REFS ──────────────────────────────────────────────────
  const cartasUsadasRef = useRef(new Set());
  const totalRodadas = 1;

  // ── FUNÇÃO PARA EMBARALHAR ──────────────────────────────
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // ── FUNÇÃO PARA OBTER A LISTA DE CARTAS DE UM RANK ──────
  const getListaPorRank = useCallback((rank) => {
    return RANKS_MAP[rank]?.lista || [];
  }, []);

  // ── FUNÇÃO PARA OBTER O SETOR DE UMA CARTA ──────────────
  const getSetorDaCarta = useCallback((nomeCarta) => {
    for (const setor of setoresArr) {
      const idx = dados[setor]?.edificios?.findIndex(e => e.nome === nomeCarta);
      if (idx !== -1 && idx !== undefined) {
        return { setor, index: idx };
      }
    }
    return null;
  }, [dados]);

  // ── FUNÇÃO PARA VERIFICAR SE O JOGADOR JÁ POSSUI A CARTA ──
  const jogadorPossuiCarta = useCallback((nomeCarta) => {
    for (const setor of setoresArr) {
      const encontrado = dados[setor]?.edificios?.find(e => e.nome === nomeCarta);
      if (encontrado && encontrado.quantidade > 0) {
        return true;
      }
    }
    return false;
  }, [dados]);

  // ── FUNÇÃO PARA OBTER CARTAS DISPONÍVEIS ──────────────────
  const getCartasDisponiveis = useCallback((rank) => {
    const lista = getListaPorRank(rank);
    const disponiveis = lista.filter(nome => {
      if (cartasUsadasRef.current.has(nome)) return false;
      if (jogadorPossuiCarta(nome)) return false;
      return true;
    });
    return disponiveis;
  }, [getListaPorRank, jogadorPossuiCarta]);

  // ── FUNÇÃO PARA GERAR OPÇÕES DA RODADA ────────────────────
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

  // ── FUNÇÃO PARA APLICAR CARTA AO JOGO ──────────────────
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

  // ── INICIAR PRÓXIMA RODADA ────────────────────────────────
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

  // ── INICIAR DRAFT ──────────────────────────────────────────
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

  // ── SELECIONAR CARTA ──────────────────────────────────────
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
        className="relative w-[95vw] flex justify-between flex-col items-center max-w-[1400px] max-h-[92vh] bg-gradient-to-br from-[#350973] via-[#6411D9] to-[#8F5ADA] rounded-[30px] p-6 shadow-2xl border-2 border-[#C79FFF]/30 overflow-hidden"
      >
        {/* ── BOTÃO FECHAR ── */}
        {/* <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 transition-all flex items-center justify-center z-10"
        >
          <img src={fechar} alt="Fechar" className="w-5 h-5 invert" />
        </button> */}

        {/* ── HEADER ── */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-white">
            {titulo}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-1">
            <span 
              className="px-4 py-1 rounded-full text-sm font-bold"
              style={{
                backgroundColor: `${getRankInfo(tipoRodadaAtual).cor}33`,
                color: getRankInfo(tipoRodadaAtual).cor,
                border: `1px solid ${getRankInfo(tipoRodadaAtual).cor}55`
              }}
            >
              {getRankInfo(tipoRodadaAtual).emoji} {getRankInfo(tipoRodadaAtual).label}
            </span>
            <span className="text-white/40 text-sm">
              {getRankInfo(tipoRodadaAtual).desc}
            </span>
          </div>
        </div>

        {/* ── TEXTO DE INSTRUÇÃO ── */}
        <div className="text-center mb-4">
          <p className="text-white/80 text-lg font-medium">
            {instrucao}
          </p>
        </div>

        {/* ── OPÇÕES EM CARDS - GRID 3 COLUNAS ── */}
        <div className="h-[calc(92vh-220px)] overflow-y-auto flex items-center pr-2 scrollbar-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
            {opcoes.map((carta, index) => {
              const isSelecionada = opcaoSelecionada === carta;
              const isDesabilitada = animando || !!opcaoSelecionada;
              const info = getSetorDaCarta(carta);
              const rankInfo = getRankInfo(tipoRodadaAtual);

              return (
                <div 
                  key={index} 
                  className="flex flex-col items-center gap-3 bg-black/20 rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  {info && (
                    <div 
                      className={`w-full flex items-center justify-center transition-all duration-300 ${
                        isDesabilitada && !isSelecionada ? 'opacity-40 pointer-events-none' : 'cursor-pointer'
                      } ${isSelecionada ? 'scale-105' : 'hover:scale-102'}`}
                      onClick={() => !isDesabilitada && selecionarCarta(carta)}
                      style={{
                        boxShadow: isSelecionada ? `0 0 30px ${rankInfo.cor}66` : 'none'
                      }}
                    >
                      <CardDraft 
                        index={info.index} 
                        setor={info.setor} 
                        abrirModalSell={() => {}}
                      />
                    </div>
                  )}

                  {/* ── NOME DA CARTA ── */}
                  <p className="text-white/80 text-sm font-medium text-center truncate w-full px-2">
                    {/* {carta} */}
                  </p>

                  {/* ── BOTÃO SELECIONAR ── */}
                  <button
                    onClick={() => !isDesabilitada && selecionarCarta(carta)}
                    disabled={isDesabilitada}
                    className={`w-full py-2.5 rounded-lg font-bold text-sm transition-all ${
                      isSelecionada 
                        ? 'bg-[#34d399] text-[#1a1a1a] shadow-lg shadow-[#34d399]/30'
                        : isDesabilitada
                          ? 'bg-white/10 text-white/30 cursor-not-allowed'
                          : `bg-gradient-to-r from-[#6411D9] to-[#8F5ADA] hover:from-[#8F5ADA] hover:to-[#6411D9] text-white hover:scale-105`
                    }`}
                  >
                    {isSelecionada ? '✓ Selecionado' : 'Selecionar'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── INDICADOR DE PROGRESSO ── */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-white/40 text-xs">
          <span>Dia {diaAtual}</span>
          <span className="w-1 h-1 rounded-full bg-white/20"></span>
          <span>{cartasEscolhidas.length} carta(s) escolhida(s)</span>
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
    // Não fecha automaticamente, deixa o jogador ver o resultado
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
    width: 4px;
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