import React, { useContext, useCallback, useMemo, useEffect, useRef, useState, memo } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { Line } from "react-chartjs-2";
import agricultura from "../../public/outrasImagens/setores/agricultura.png";
import tecnologia from "../../public/outrasImagens/setores/tecnologia.png";
import comercio from "../../public/outrasImagens/setores/comercio.png";
import industria from "../../public/outrasImagens/setores/industria.png";
import imobiliario from "../../public/outrasImagens/setores/imobiliario.png";
import energia from "../../public/outrasImagens/setores/torre-eletrica.png";
import grafico from "../../public/outrasImagens/setores/grafico.png";
import gerenciamento from "../../public/outrasImagens/setores/gerenciamento.png";
import circularEconomia from "../../public/outrasImagens/circular-economy.png";
import DolarImg from "../../public/outrasImagens/simbolo-do-dolar.png";
import { CardModal } from "./cardsModal";
import licença from "../../public/outrasImagens/licença.png";
import Carteira from "../../public/imagens/Carteira.png";
import { motion, useAnimation } from "framer-motion";
import fechar from "../../public/outrasImagens/fechar.png";
import { LicenseModal } from "./licenseModal";
import { Localizador } from "./localizador";
import { CarteiraLocalizador } from "./CarteiraLocalizador";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import patrimônio from "../../public/imagens/patrimônio.png";
import impostoAnual from "../../public/imagens/impostoAnual.png";
import { BusinessLicence } from "./BusinessLicence";
import limitar from "../../public/outrasImagens/limite.png";
import soma from "../../public/outrasImagens/Soma.png";
import setoresImg from "../../public/outrasImagens/setores.png";
import diversidade from "../../public/outrasImagens/diversidade.png";
import { SellModal } from "./SellModal";
import { Tooltip } from "react-tooltip";
import solo from "../../public/outrasImagens/solo.png";
import buildBusiness from "../../public/outrasImagens/business.png";
import imgFuncionarioIcon from "../../public/outrasImagens/funcionário 1.png";
import imgMesa from "../../public/outrasImagens/mesa de trabalho.png";
import imgCadeira from "../../public/outrasImagens/cadeira.png";
import maps from "../../public/outrasImagens/maps.png";
import computador from "../../public/outrasImagens/computer-screen.png";
import CreditCard from "./CreditCard";
import bank from "../../public/outrasImagens/bank.png";
import BankDetailsInterface from "./BankModel";
import BankInterface from "./BankInterface.jsx";
import MicroModel from "./MicroModel.jsx";
import CorporateFinanceInterface from "./FinançasDashboard.jsx";
import useSound from "use-sound";
import changeSectoryAudio from "../../public/sounds/changeSectoryAudio.mp3";
import closeAudio from "../../public/sounds/closeAudio.mp3";
import openAudio from "../../public/sounds/openAudio.mp3";
import walletOpenAudio from "../../public/sounds/walletOpenAudio.mp3";
import audioSel from "../../public/sounds/nextDayAudio.mp3";
import clock from "../../public/sounds/freesound_community-kitchen-timer-87485.mp3";
import { PackOpening } from "./PackOpening.jsx";
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
import MapWorld from "./MapWorld.jsx";
import { CardLocalization } from "./cardLocalization.jsx";
import { CardDraft } from "./CardDraft.jsx";
import TechTree from "./Techtree.jsx";
import ecossistema from '../../public/outrasImagens/setores/ecossistema.png';
import { CardDraftMini } from "./CardDraftMini.jsx";
import { SlotDisplay, executarLiquidacaoAutomatica, useSlotVerification } from "./SlotManager";
import { createPortal } from "react-dom";
import DisplayInformations from "./DisplayInformations.jsx";
// import DashboardMiniDraft from "./DashboardMiniDraft.jsx";
import { PlusInventory } from "./PlusInventory.jsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  LineController,
  Filler,
  Legend
);

// ─── CONSTANTES (FORA DO COMPONENTE) ──────────────────────────────
const SETORES_ARR = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

const FATOR_ECONOMIA = {
  recessão: 0.4,
  declinio: 0.8,
  estável: 1,
  progressiva: 1.1,
  aquecida: 1.25
};

// ─── RANKS DOS EDIFÍCIOS ──────────────────────────────────────────
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

const ESTOQUES = new Set([
  "Armazém", "Silo", "Depósito De Resíduos Orgânicos", "Data Center",
  "Servidor Em Nuvem", "Armazém Logístico", "Centro De Distribuição",
  "Fábrica De Tanque De Armazenamento Biocombustível", "Centro De Coleta De Biomassa",
  "Campo De Estocagem", "Armazém De Materiais Brutos", "Câmara Fria",
  "Container Modular", "Pátio De Veículos", "Armazém Industrial",
  "Armazém De Materiais Sensíveis", "Hangar", "Pátio De Mineração"
]);

const PRODUCOES = new Set([
  "Plantação De Grãos", "Fazenda De Vacas", "Plantação De Eucalipto",
  "Granja De Aves", "Criação De Ovinos", "Serraria", "Fábrica De Smartphones",
  "Fábrica De Computadores", "Fábrica De Consoles De Jogos",
  "Fábrica De Dispositivos Vestíveis", "Fábrica De Rações", "Fábrica De Embalagens",
  "Fábrica De Fertilizantes", "Fábrica Têxtil", "Fábrica De Calçados",
  "Fábrica De Roupas", "Fábrica De Celulose", "Fábrica De Papel",
  "Fábrica De Livros", "Fábrica De Medicamentos", "Laboratório Farmacêutico",
  "Fábrica De Plásticos", "Fábrica De Químicos Especializados", "Alto-Forno",
  "Usina Siderúrgica", "Fundição De Alumínio", "Fábrica De Ligas Metálicas",
  "Indústria De Componentes Mecânicos", "Fábrica De Chapas Metálicas",
  "Fábrica De Estruturas Metálicas", "Fábrica De Peças Automotivas",
  "Montadora De Veículos Elétricos", "Fábrica De Automóveis", "Refinaria",
  "Biofábrica", "Fábrica De Chips", "Fábrica De Placas Eletrônicas",
  "Fábrica De Semicondutores", "Fábrica De Robôs", "Fábrica De Motores",
  "Fábrica De Foguetes", "Fábrica De Aeronaves", "Estaleiro",
  "Fábrica De Turbinas Eólicas", "Fábrica De Painéis Solares", "Fábrica De Baterias"
]);

const VENDAS_FINAIS = new Set([
  "Livraria", "Mercado", "Açougue", "Petshop", "Farmácia", "Loja De Calçados",
  "Loja De Vestuário", "Loja De Gadgets E Wearables", "Loja De Games",
  "Loja De Celulares", "Loja De Informática", "Loja De Eletrônicos",
  "Concessionária De Veículos"
]);

// ─── FUNÇÕES AUXILIARES (PUROS) ───────────────────────────────────
const getCategoria = (nome) => {
  if (ESTOQUES.has(nome)) return "estoque";
  if (PRODUCOES.has(nome)) return "producao";
  if (VENDAS_FINAIS.has(nome)) return "venda";
  return "passiva";
};

const getRankDoEdificio = (nomeEdificio) => {
  if (RankS.includes(nomeEdificio)) return { rank: "S", cor: "#FFD700", label: "S", ordem: 1 };
  if (RankA.includes(nomeEdificio)) return { rank: "A", cor: "#C0C0C0", label: "A", ordem: 2 };
  if (RankB.includes(nomeEdificio)) return { rank: "B", cor: "#CD7F32", label: "B", ordem: 3 };
  if (RankC.includes(nomeEdificio)) return { rank: "C", cor: "#8B8B8B", label: "C", ordem: 4 };
  return { rank: "C", cor: "#8B8B8B", label: "C", ordem: 4 };
};

const criarMapaEdificios = (dados) => {
  const mapa = new Map();
  SETORES_ARR.forEach(setor => {
    if (dados[setor]?.edificios) {
      dados[setor].edificios.forEach(ed => {
        mapa.set(ed.nome, ed);
      });
    }
  });
  return mapa;
};

const formatarNumero = (num) => {
  if (num >= 1e12) return (num / 1e12).toFixed(1).replace(".0", "") + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(1).replace(".0", "") + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(1).replace(".0", "") + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1).replace(".0", "") + "K";
  return num.toString();
};

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────
export default function DashboardDraft() {
  const { dados, atualizarDadosProf2, atualizarDados } = useContext(CentraldeDadosContext);
  const { economiaSetores, setEconomiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);

  // ─── SOUNDS ──────────────────────────────────────────────────────
  const [changeAudio] = useSound(changeSectoryAudio);
  const [buttonCloseAudio] = useSound(closeAudio);
  const [buttonOpenAudio] = useSound(openAudio);
  const [buttonWalletOpenAudio] = useSound(walletOpenAudio);
  const [selecionarButton] = useSound(audioSel);

  // ─── STATES ──────────────────────────────────────────────────────
  const [ativo, setAtivo] = useState("carteira");
  const [carteiraOrdem, setCarteiraOrdem] = useState("setor");
  const [carteiraFiltroSetor, setCarteiraFiltroSetor] = useState("todos");
  const [carteiraKey, setCarteiraKey] = useState(0);
  const [modalConclusao, setModalConclusao] = useState(false);
  const [cartasParaVender, setCartasParaVender] = useState([]);
  const [modoVendaRapida, setModoVendaRapida] = useState(true);
  const [cartasSelecionadas, setCartasSelecionadas] = useState([]);
  const [filtroQuantidade, setFiltroQuantidade] = useState("todos");
  const [filtroSelecionados, setFiltroSelecionados] = useState(false);
  const [modalSellOpen, setModalSellOpen] = useState(false);
  const [modalProps, setModalProps] = useState({ setor: "", nomeLicença: "", index: 0 });
  const [licencaModal, setLicencaModal] = useState({ open: false, scrollToIndex: null });
  const [businessLicenceModal, setBusinessLicenceModal] = useState(false);
  const [modalLiquidacaoOpen, setModalLiquidacaoOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("carteira");

  // ─── FUNÇÕES DO MODAL DE LIQUIDAÇÃO ─────────────────────────────
  const abrirModalLiquidacao = useCallback(() => {
    setModalLiquidacaoOpen(true);
  }, []);

  const fecharModalLiquidacao = useCallback(() => {
    setModalLiquidacaoOpen(false);
  }, []);

  const [carteiraDados, setCarteiraDados] = useState({
    todosEdificios: [],
    receitaMensalTotal: 0,
    impostosTotais: 0,
    lucroLiquido: 0,
    setoresAtivosSet: new Set(),
    edAtual: 0,
    tiposUnicos: 0,
    setoresComEdificios: 0,
    limiteAtual: 0,
    excedente: 0
  });

  // ─── FUNÇÃO PARA EXECUTAR A LIQUIDAÇÃO ──────────────────────────
  const executarLiquidacao = useCallback(async () => {
    const { excedente } = carteiraDados;
    if (excedente <= 0) {
      return;
    }

    try {
      const resultado = await executarLiquidacaoAutomatica(
        dados,
        atualizarDadosProf2,
        economiaSetores,
        atualizarEco
      );

      if (resultado.sucesso && resultado.liquidados > 0) {
        setCarteiraKey(prev => prev + 1);
      }
    } catch (error) {
      console.error("❌ Erro na liquidação:", error);
    }
  }, [dados, atualizarDadosProf2, economiaSetores, atualizarEco, carteiraDados]);

  const verificarSlots = useSlotVerification();

  // ─── REFS ────────────────────────────────────────────────────────
  const chartRefSetores = useRef(null);
  const chartRefEdificios = useRef(null);
  const controls = useAnimation();

  // ─── MEMO: SETORES ──────────────────────────────────────────────
  const setores = useMemo(() => [
    { id: "agricultura", corClasse: "bg-[#4CAF50]", img: agricultura, descLicença: "Com a Licença Global de Agricultura, você terá acesso a cultivos exclusivos, otimização de produções e melhorias que aumentarão sua rentabilidade. Liberte o potencial do setor agrícola agora mesmo!", cor1: "#003816", cor2: "#4CAF50", cor3: "#0C9123", cor4: "#4CAF50" },
    { id: "tecnologia", corClasse: "bg-[#FF8C42]", img: tecnologia, descLicença: "Com a Licença Global de Tecnologia, você desbloqueia inovações que podem transformar sua infraestrutura, otimizar processos e maximizar os lucros. Invista no futuro agora!", cor1: "#A64B00", cor2: "#D45A00", cor3: "#FF6F00", cor4: "#FF8C42" },
    { id: "industria", corClasse: "bg-[#B3B3B3]", img: industria, descLicença: "Com a Licença Global de Indústria, você acessa fábricas avançadas e processos de produção que aceleram sua evolução e aumentam a eficiência. Não fique para trás!", cor1: "#1A1A1A", cor2: "#4D4D4D", cor3: "#808080", cor4: "#B3B3B3" },
    { id: "comercio", corClasse: "bg-[#FF4D4D]", img: comercio, descLicença: "Com a Licença Global de Comércio, você tem acesso a novos mercados, estratégias de vendas e expansão que podem levar seus negócios a um novo nível. Não perca essa oportunidade!", cor1: "#660000", cor2: "#A31919", cor3: "#E60000", cor4: "#FF4D4D" },
    { id: "imobiliario", corClasse: "bg-[#6666FF]", img: imobiliario, descLicença: "Com a Licença Global Imobiliária, você pode investir em novos terrenos, expandir suas construções e maximizar os retornos do mercado imobiliário. Abra as portas para grandes lucros!", cor1: "#000066", cor2: "#1A1A8C", cor3: "#3333CC", cor4: "#6666FF" },
    { id: "energia", corClasse: "bg-[#FFD966]", img: energia, descLicença: "Com a Licença Global de Energia, você ativa fontes de energia sustentáveis e de alta performance, garantindo uma operação eficiente e lucrativa. Potencialize seu setor energético agora!", cor1: "#665200", cor2: "#A37F19", cor3: "#E6B800", cor4: "#FFD966" },
    { id: "carteira", corClasse: "bg-[#934CFF]", img: Carteira, cor1: "#350973", cor2: "#4C14A9", cor3: "#6A00FF", cor4: "#934CFF" },
    { id: "grafico", corClasse: "bg-gradient-to-br from-[#6A00FF] to-[#E60000]", img: grafico, cor1: "#6A00FF", cor2: "#6A00FF", cor3: "#6A00FF", cor4: "#6A00FF" },
  ], []);

  const setorAtivo = useMemo(() => setores.find((s) => s.id === ativo), [setores, ativo]);

  // ─── MEMO: SNAPSHOT DADOS ──────────────────────────────────────
  const snapshotDados = useMemo(() =>
    JSON.stringify(SETORES_ARR.map(s =>
      (dados[s]?.edificios || []).map(ed => ({ nome: ed.nome, q: ed.quantidade }))
    )),
    [dados]
  );

  // ─── MEMO: CALCULAR DADOS FINAIS ──────────────────────────────
  const calcularDadosFinais = useCallback(() => {
    const faturamentoTotal = dados.faturamento?.arrayFatuDiário?.reduce((acc, val) => acc + val, 0) || 0;
    const powerUpsAumFatu = economiaSetores.powerUps?.aumentoFaturamentoDiario || [];
    const powerUpsRedCusto = economiaSetores.powerUps?.reducaoCustoDiario || [];
    const somaPowerUpsAumFatu = powerUpsAumFatu.reduce((acc, val) => acc + val, 0);
    const somaPowerUpsRedCusto = powerUpsRedCusto.reduce((acc, val) => acc + val, 0);
    const patrimonioHistorico = economiaSetores.patrimonioInventarioHistorico || [];
    const roeMedio = patrimonioHistorico.length > 0
      ? (patrimonioHistorico.reduce((acc, val) => acc + val, 0) / patrimonioHistorico.length)
      : 0;
    const inventarioHistorico = economiaSetores.patrimonioInventarioHistorico || [];
    const somaInventarioHistorico = inventarioHistorico.reduce((acc, val) => acc + val, 0);
    const patrimonioHistoricoTotal = SETORES_ARR.reduce((total, setor) => {
      const historico = economiaSetores[setor]?.economiaSetor?.patrimonioHistorico || [];
      return total + historico.reduce((acc, val) => acc + val, 0);
    }, 0);
    const saldoTotal = economiaSetores.saldo || 0;

    return {
      faturamentoTotal,
      somaPowerUpsAumFatu,
      somaPowerUpsRedCusto,
      roeMedio,
      somaInventarioHistorico,
      patrimonioHistoricoTotal,
      saldoTotal
    };
  }, [dados, economiaSetores]);

  // ─── CALLBACK: GET LIMITE SELEÇÃO ──────────────────────────────
  const getLimiteSelecao = useCallback(() => {
    const dia = dados.dia || 0;
    if (dia > 300) return 20;
    if (dia > 270) return 16;
    if (dia > 180) return 12;
    if (dia > 90) return 8;
    return 5;
  }, [dados.dia]);

  // ─── CALLBACK: TOGGLE SELEÇÃO VENDA ────────────────────────────
  const toggleSelecaoVenda = useCallback((setor, index, nomeEdificio) => {
    const chave = `${setor}-${index}`;
    setCartasParaVender(prev => {
      const jaSelecionado = prev.some(item => item.chave === chave);
      if (jaSelecionado) {
        return prev.filter(item => item.chave !== chave);
      }
      return [...prev, { chave, setor, index, nome: nomeEdificio }];
    });
  }, []);

  // ─── CALLBACK: EXECUTAR VENDA RÁPIDA ───────────────────────────
  const executarVendaRapida = useCallback(async () => {
    if (cartasParaVender.length === 0) return;

    let totalRecebido = 0;
    const vendidos = [];

    for (const item of cartasParaVender) {
      const edificio = dados[item.setor]?.edificios?.[item.index];
      if (!edificio || edificio.quantidade <= 0) continue;

      const valorVenda = (edificio.custoConstrucao || 0) * 0.7 * edificio.quantidade;
      totalRecebido += valorVenda;
      vendidos.push({ nome: edificio.nome, quantidade: edificio.quantidade, valor: valorVenda });

      const path = [item.setor, "edificios", item.index, "quantidade"];
      await atualizarDadosProf2(path, 0);
    }

    const saldoAtual = economiaSetores.saldo || 0;
    await atualizarEco("saldo", saldoAtual + totalRecebido);

    setCartasParaVender([]);
    setModoVendaRapida(true);
    setCarteiraKey(prev => prev + 1);
  }, [cartasParaVender, dados, atualizarDadosProf2, atualizarEco, economiaSetores.saldo]);

  // ─── CALLBACK: TOGGLE SELEÇÃO ──────────────────────────────────
  const toggleSelecao = useCallback((setor, index, nomeEdificio) => {
    const chave = `${setor}-${index}`;
    const limite = getLimiteSelecao();

    setCartasSelecionadas(prev => {
      const jaSelecionado = prev.some(item => item.chave === chave);

      if (jaSelecionado) {
        const novaLista = prev.filter(item => item.chave !== chave);
        atualizarDados("cartasSelecionadas", novaLista);
        return novaLista;
      }

      if (prev.length >= limite) {
        return prev;
      }

      const novaLista = [...prev, { chave, setor, index, nome: nomeEdificio, dataSelecao: new Date().toISOString() }];
      atualizarDados("cartasSelecionadas", novaLista);
      return novaLista;
    });
  }, [getLimiteSelecao, atualizarDados]);

  // ─── CALLBACK: LIMPAR SELEÇÕES ─────────────────────────────────
  const limparSelecoes = useCallback(() => {
    setCartasSelecionadas([]);
    atualizarDados("cartasSelecionadas", []);
  }, [atualizarDados]);

  // ─── CALLBACK: ABRIR MODAL SELL ────────────────────────────────
  const abrirModalSell = useCallback((setor, index) => {
    setModalProps({ setor, index, nomeLicença: "" });
    setModalSellOpen(true);
  }, []);

  // ─── EFFECT: CARREGAR CARTAS SELECIONADAS ──────────────────────
  useEffect(() => {
    if (dados.cartasSelecionadas) {
      setCartasSelecionadas(dados.cartasSelecionadas);
    }
  }, [dados.cartasSelecionadas]);

  // ─── EFFECT: MODAL CONCLUSÃO ────────────────────────────────────
  useEffect(() => {
    if (dados.dia >= 360 && !modalConclusao) {
      setModalConclusao(true);
    }
  }, [dados.dia, modalConclusao]);

  // ─── EFFECT: ATUALIZAR CARTEIRA ────────────────────────────────
  useEffect(() => {
    if (ativo === "carteira") {
      setCarteiraKey(prev => prev + 1);
    }
  }, [snapshotDados, ativo]);

  // ─── EFFECT: PROCESSAR CARTEIRA ────────────────────────────────
  useEffect(() => {
    if (ativo === "carteira") {
      const novosDados = processarCarteira(dados, economiaSetores, carteiraFiltroSetor, carteiraOrdem);
      setCarteiraDados(novosDados);
    }
  }, [dados, economiaSetores, carteiraFiltroSetor, carteiraOrdem, ativo]);

  // ─── EFFECT: ABRIR MODAL LICENÇAS ──────────────────────────────
  useEffect(() => {
    const sinal = dados.abrirModalLicencas;
    if (!sinal) return;
    if (sinal.setor !== ativo) {
      setAtivo(sinal.setor);
      atualizarDadosProf2(["setorAtivo"], sinal.setor);
    }
    setLicencaModal({ open: true, scrollToIndex: sinal.scrollToIndex });
  }, [dados.abrirModalLicencas?.timestamp, ativo, atualizarDadosProf2]);

  // ─── EFFECT: SCROLL PARA LICENÇA ──────────────────────────────
  useEffect(() => {
    if (!licencaModal.open || licencaModal.scrollToIndex === null) return;
    const timer = setTimeout(() => {
      const el = document.getElementById(`licenca-item-${licencaModal.scrollToIndex}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
    return () => clearTimeout(timer);
  }, [licencaModal.open, licencaModal.scrollToIndex]);

  // ─── FUNÇÕES LOCAIS ─────────────────────────────────────────────
  const getQuantidadeEdificio = (ed) => ed.quantidade || 0;

  const filtrarPorQuantidade = (ed, filtro) => {
    const qtd = getQuantidadeEdificio(ed);
    switch (filtro) {
      case "1": return qtd === 1;
      case "2": return qtd === 2;
      case "3": return qtd === 3;
      case "3+": return qtd > 3;
      default: return true;
    }
  };

  const getImageUrl = (nomeArquivo) => `/imagens/${nomeArquivo}.png`;

  // ─── MEMO: DADOS PARA GRÁFICOS ─────────────────────────────────
  const dadosDia = useMemo(() => dados.terrenos?.arrayFatu?.map((_, index) => index + 1) || [], [dados.terrenos?.arrayFatu]);
  const dadosFatu = useMemo(() => dados.faturamento?.arrayFatuDiário?.map((_, index) => index + 1) || [], [dados.faturamento?.arrayFatuDiário]);

  const coresSetoresGradiente = useMemo(() => ({
    agricultura: { start: "#4CAF50", middle: "#66BB6A", end: "#81C784", glow: "rgba(76, 175, 80, 0.3)" },
    tecnologia: { start: "#FF6F00", middle: "#FF8C42", end: "#FFA726", glow: "rgba(255, 140, 66, 0.3)" },
    industria: { start: "#1A1A1A", middle: "#4D4D4D", end: "#808080", glow: "rgba(77, 77, 77, 0.3)" },
    comercio: { start: "#A31919", middle: "#E60000", end: "#FF4D4D", glow: "rgba(255, 77, 77, 0.3)" },
    imobiliario: { start: "#1A1A8C", middle: "#3333CC", end: "#6666FF", glow: "rgba(102, 102, 255, 0.3)" },
    energia: { start: "#A37F19", middle: "#E6B800", end: "#FFD966", glow: "rgba(255, 217, 102, 0.3)" },
  }), []);

  // ─── FUNÇÃO PROCESSAR CARTEIRA ─────────────────────────────────
  const processarCarteira = useCallback((dados, economiaSetores, filtroSetor, ordem) => {
    const mapaEdificios = criarMapaEdificios(dados);
    const cacheROI = new Map();

    const calcularROI = (ed, setor) => {
      const chave = `${ed.nome}_${ed.quantidade}`;
      if (cacheROI.has(chave)) return cacheROI.get(chave);
      const economiaSetor = economiaSetores[setor]?.economiaSetor?.estadoAtual || 'estável';
      const resultado = calcROI(ed, dados, economiaSetor, mapaEdificios, criarCalculadoraCustoRecurso(mapaEdificios, dados));
      cacheROI.set(chave, resultado);
      return resultado;
    };

    let todosEdificios = [];
    SETORES_ARR.forEach(s => {
      dados[s]?.edificios?.forEach((ed, idx) => {
        if (ed.quantidade > 0) {
          const rankInfo = getRankDoEdificio(ed.nome);
          const economiaSetor = economiaSetores[s]?.economiaSetor?.estadoAtual || 'estável';
          const lucroLiquido = calcularLucroLiquido(ed, dados, economiaSetor);
          const valorTotal = calcularValorTotalEdificio(ed, dados) * ed.quantidade;

          const quantidade = ed.quantidade || 0;
          const qtdMin2 = ed?.powerUp?.nível2?.quantidadeMínima ?? Infinity;
          const qtdMin3 = ed?.powerUp?.nível3?.quantidadeMínima ?? Infinity;
          const nivelPU = quantidade >= qtdMin3 ? "powerUpNv3"
            : quantidade >= qtdMin2 ? "powerUpNv2"
              : "powerUpNv1";

          let redCusto = 0, aumFatu = 0;
          if (Array.isArray(ed?.RecebeMelhoraEficiencia)) {
            ed.RecebeMelhoraEficiencia.forEach((rel) => {
              const outroEd = mapaEdificios.get(rel.nome);
              if (outroEd && outroEd.quantidade > 0) {
                const nivel = nivelPU === "powerUpNv1" ? "nível1"
                  : nivelPU === "powerUpNv2" ? "nível2"
                    : "nível3";
                redCusto += rel?.redCusto?.[nivel] || 0;
                aumFatu += rel?.aumFatu?.[nivel] || 0;
              }
            });
          }

          const faturamento = (ed.finanças?.faturamentoUnitário || 0) * 30 * ed.quantidade;
          const totalPowerUp = (aumFatu || 0) + (redCusto || 0);

          todosEdificios.push({
            ed, idx, setor: s,
            roi: calcularROI(ed, s),
            categoria: getCategoria(ed.nome),
            rank: rankInfo,
            lucroLiquido,
            valor: valorTotal,
            faturamento,
            totalPowerUp,
            aumFatu,
            redCusto
          });
        }
      });
    });

    if (filtroSetor !== "todos") {
      todosEdificios = todosEdificios.filter(e => e.setor === filtroSetor);
    }

    // Ordenações
    const ordenacoes = {
      roi_desc: (a, b) => b.roi - a.roi,
      roi_asc: (a, b) => a.roi - b.roi,
      lucro_desc: (a, b) => b.lucroLiquido - a.lucroLiquido,
      lucro_asc: (a, b) => a.lucroLiquido - b.lucroLiquido,
      valor_desc: (a, b) => b.valor - a.valor,
      valor_asc: (a, b) => a.valor - b.valor,
      setor: (a, b) => a.setor.localeCompare(b.setor),
      nome: (a, b) => a.ed.nome.localeCompare(b.ed.nome),
      categoria: (a, b) => a.categoria.localeCompare(b.categoria),
      rank_desc: (a, b) => a.rank.ordem - b.rank.ordem,
      rank_asc: (a, b) => b.rank.ordem - a.rank.ordem,
      fatu_desc: (a, b) => b.faturamento - a.faturamento,
      fatu_asc: (a, b) => a.faturamento - b.faturamento,
      powerup_desc: (a, b) => b.totalPowerUp - a.totalPowerUp,
      powerup_asc: (a, b) => a.totalPowerUp - b.totalPowerUp,
      qtd_desc: (a, b) => b.ed.quantidade - a.ed.quantidade,
      qtd_asc: (a, b) => a.ed.quantidade - b.ed.quantidade,
    };

    if (ordenacoes[ordem]) {
      todosEdificios.sort(ordenacoes[ordem]);
    }

    let receitaMensalTotal = 0, impostosTotais = 0;
    SETORES_ARR.forEach(s => {
      dados[s]?.edificios?.forEach(ed => {
        if (ed.quantidade > 0) {
          const fatu = (ed.finanças?.faturamentoUnitário || 0) * 30 * ed.quantidade;
          const imp = fatu * (ed.finanças?.impostoSobreFatu || 0) + (ed.finanças?.impostoFixo || 0) * ed.quantidade;
          receitaMensalTotal += fatu;
          impostosTotais += imp;
        }
      });
    });

    const lucroLiquido = receitaMensalTotal - impostosTotais;
    const setoresAtivosSet = new Set(todosEdificios.map(e => e.setor));
    const edAtual = SETORES_ARR.reduce((total, s) =>
      total + (dados[s]?.edificios || []).reduce((sum, ed) =>
        sum + (ed.quantidade > 0 ? ed.quantidade : 0), 0)
      , 0);

    const tiposUnicos = new Set(
      SETORES_ARR.flatMap(s =>
        (dados[s]?.edificios || []).filter(ed => ed.quantidade > 0).map(ed => ed.nome)
      )
    ).size;

    const setoresComEdificios = SETORES_ARR.filter(s =>
      (dados[s]?.edificios || []).some(ed => ed.quantidade > 0)
    ).length;

    const dia = dados.dia || 0;
    const limiteBase = dia <= 90 ? 15 : dia <= 180 ? 20 : dia <= 270 ? 25 : 30;
    const slotsExtras = dados.slotsExtrasComprados || 0;
    const limiteAtual = limiteBase + slotsExtras;
    const excedente = Math.max(0, tiposUnicos - limiteAtual);

    return {
      todosEdificios,
      receitaMensalTotal,
      impostosTotais,
      lucroLiquido,
      setoresAtivosSet,
      edAtual,
      tiposUnicos,
      setoresComEdificios,
      limiteAtual,
      excedente
    };
  }, []);

  // ─── FUNÇÃO DE LIBERAR LICENÇA ─────────────────────────────────
  const LiberarLicença = useCallback(() => {
    const licenciaValor = dados[ativo]?.licençaGlobal?.valor || 0;
    const licençaComprada = dados[ativo]?.licençaGlobal?.comprado || false;
    const arrayLicenseNece = dados[ativo]?.licençasSetor || [];

    if (economiaSetores.saldo >= licenciaValor) {
      if (licençaComprada) {
        return;
      }
      const novoSaldo = economiaSetores.saldo - licenciaValor;
      atualizarDados("saldo", novoSaldo);
      atualizarDadosProf2([ativo, "licençaGlobal", "comprado"], true);
      arrayLicenseNece.forEach((licenca, idx) => {
        atualizarDadosProf2([ativo, "licençasSetor", idx, "status"], true);
      });
    }
  }, [dados, ativo, economiaSetores.saldo, atualizarDados, atualizarDadosProf2]);

  // ─── RENDER ──────────────────────────────────────────────────────
  if (dados.vision?.visionAtual !== "dashboard") return null;

  return (
    <>
      {/* ─── LAYOUT PRINCIPAL ────────────────────────────────────── */}
      <div className="w-full h-full flex gap-2 p-2 bg-[#0a0a1a]">
        {/* ─── LADO ESQUERDO: TABS E CONTEÚDO ─────────────────────── */}
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          {/* ─── TABS ────────────────────────────────────────────── */}
          {/* <div className="flex gap-1 bg-[#1a0a3b] rounded-xl border border-white/10 p-1 flex-shrink-0">
            {[
              { id: "carteira", label: "📋 Carteira" },
              { id: "grafico", label: "📊 Análise" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedTab(tab.id);
                  setAtivo(tab.id);
                }}
                className={`
                  flex-1 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200
                  ${selectedTab === tab.id
                    ? 'bg-[#6A00FF] text-white shadow-lg shadow-purple-500/20'
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div> */}

          {/* ─── CONTEÚDO DA TAB ─────────────────────────────────── */}
          <div className="flex-1 min-h-0">
            {selectedTab === "carteira" ? (
              <DashboardDraftCarteira 
                dados={dados}
                economiaSetores={economiaSetores}
                setorAtivo={setorAtivo}
                carteiraDados={carteiraDados}
                carteiraKey={carteiraKey}
                carteiraFiltroSetor={carteiraFiltroSetor}
                setCarteiraFiltroSetor={setCarteiraFiltroSetor}
                carteiraOrdem={carteiraOrdem}
                setCarteiraOrdem={setCarteiraOrdem}
                filtroQuantidade={filtroQuantidade}
                setFiltroQuantidade={setFiltroQuantidade}
                filtroSelecionados={filtroSelecionados}
                setFiltroSelecionados={setFiltroSelecionados}
                cartasSelecionadas={cartasSelecionadas}
                setCartasSelecionadas={setCartasSelecionadas}
                cartasParaVender={cartasParaVender}
                setCartasParaVender={setCartasParaVender}
                modoVendaRapida={modoVendaRapida}
                setModoVendaRapida={setModoVendaRapida}
                toggleSelecao={toggleSelecao}
                toggleSelecaoVenda={toggleSelecaoVenda}
                executarVendaRapida={executarVendaRapida}
                limparSelecoes={limparSelecoes}
                abrirModalSell={abrirModalSell}
                abrirModalLiquidacao={abrirModalLiquidacao}
                getLimiteSelecao={getLimiteSelecao}
                getQuantidadeEdificio={getQuantidadeEdificio}
                filtrarPorQuantidade={filtrarPorQuantidade}
                formatarNumero={formatarNumero}
                modalSellOpen={modalSellOpen}
                setModalSellOpen={setModalSellOpen}
                modalProps={modalProps}
                setModalProps={setModalProps}
                selecionarButton={selecionarButton}
              />
            ) : (
              <DisplayInformations />
            )}
          </div>
        </div>

        {/* ─── LADO DIREITO: MINI DRAFT E EXPANSÃO ────────────────── */}
        {/* <div className="w-[320px] flex flex-col gap-2 flex-shrink-0">
          <div className="flex-1 min-h-0">
            <DashboardMiniDraft />
          </div>
          <div className="h-[100px] flex-shrink-0">
            <PlusInventory />
          </div>
        </div> */}
      </div>

      {/* ─── MODAL DE CONFIRMAÇÃO DE LIQUIDAÇÃO ──────────────────── */}
      <ModalConfirmacaoLiquidacao
        isOpen={modalLiquidacaoOpen}
        onClose={fecharModalLiquidacao}
        onConfirm={executarLiquidacao}
        excedente={carteiraDados.excedente}
      />

      {/* ─── MODAL DE CONCLUSÃO ───────────────────────────────────── */}
      {modalConclusao && (() => {
        const dadosFinais = calcularDadosFinais();

        return (
          <div className="flex justify-center items-center z-[9999] bg-black bg-opacity-95 w-[100vw] h-[100vh] fixed top-0 left-0 select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: -100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
              className="w-[90vw] max-w-[800px] bg-gradient-to-br from-[#6A00FF] via-[#8B00FF] to-[#F27405] rounded-[30px] p-8 relative shadow-2xl"
            >
              <div className="bg-[#1a0a3b] rounded-[20px] p-8 flex flex-col items-center gap-6 max-h-[80vh] overflow-y-auto">
                <motion.h1
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F27405] to-[#FFD700] text-center"
                >
                  🎉 PARABÉNS! 🎉
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="text-white text-xl text-center font-bold"
                >
                  Você completou 360 dias de jogo!
                </motion.p>

                <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-[#F27405] to-transparent"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
                  <div className="bg-[#2a0a5a] rounded-[15px] p-4">
                    <p className="text-[#C79FFF] text-sm font-medium">💰 Faturamento Total</p>
                    <p className="text-white text-2xl font-bold">R$ {formatarNumero(dadosFinais.faturamentoTotal)}</p>
                  </div>

                  <div className="bg-[#2a0a5a] rounded-[15px] p-4">
                    <p className="text-[#C79FFF] text-sm font-medium">⚡ Power-Ups</p>
                    <p className="text-white text-2xl font-bold">
                      ↑ +{dadosFinais.somaPowerUpsAumFatu.toFixed(1)}%
                    </p>
                    <p className="text-white text-lg font-bold">
                      ↓ -{dadosFinais.somaPowerUpsRedCusto.toFixed(1)}%
                    </p>
                  </div>

                  <div className="bg-[#2a0a5a] rounded-[15px] p-4">
                    <p className="text-[#C79FFF] text-sm font-medium">📊 ROE Médio</p>
                    <p className="text-white text-2xl font-bold">
                      {dadosFinais.roeMedio > 0 ? '+' : ''}{dadosFinais.roeMedio.toFixed(2)}%
                    </p>
                  </div>

                  <div className="bg-[#2a0a5a] rounded-[15px] p-4">
                    <p className="text-[#C79FFF] text-sm font-medium">🏦 Patrimônio Histórico</p>
                    <p className="text-white text-2xl font-bold">R$ {formatarNumero(dadosFinais.patrimonioHistoricoTotal)}</p>
                  </div>

                  <div className="bg-[#2a0a5a] rounded-[15px] p-4">
                    <p className="text-[#C79FFF] text-sm font-medium">📦 Inventário Histórico</p>
                    <p className="text-white text-2xl font-bold">R$ {formatarNumero(dadosFinais.somaInventarioHistorico)}</p>
                  </div>

                  <div className="bg-[#2a0a5a] rounded-[15px] p-4">
                    <p className="text-[#C79FFF] text-sm font-medium">💎 Saldo Disponível</p>
                    <p className="text-white text-2xl font-bold">R$ {formatarNumero(dadosFinais.saldoTotal)}</p>
                  </div>
                </div>

                <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-[#F27405] to-transparent"></div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setModalConclusao(false)}
                  className="w-full max-w-[300px] bg-gradient-to-r from-[#F27405] to-[#FF8C00] text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
                >
                  Encerrar Jogo
                </motion.button>
              </div>
            </motion.div>
          </div>
        );
      })()}

      {/* ─── MODAL SELL ───────────────────────────────────────────── */}
      {modalSellOpen && (
        <SellModal
          setor={modalProps.setor}
          nomeLicença={modalProps.nomeLicença}
          index={modalProps.index}
          onClose={() => setModalSellOpen(false)}
        />
      )}
    </>
  );
}

// ─── COMPONENTE DASHBOARD CARTEIRA (EXTRAÍDO) ─────────────────────
function DashboardDraftCarteira({
  dados,
  economiaSetores,
  setorAtivo,
  carteiraDados,
  carteiraKey,
  carteiraFiltroSetor,
  setCarteiraFiltroSetor,
  carteiraOrdem,
  setCarteiraOrdem,
  filtroQuantidade,
  setFiltroQuantidade,
  filtroSelecionados,
  setFiltroSelecionados,
  cartasSelecionadas,
  setCartasSelecionadas,
  cartasParaVender,
  setCartasParaVender,
  modoVendaRapida,
  setModoVendaRapida,
  toggleSelecao,
  toggleSelecaoVenda,
  executarVendaRapida,
  limparSelecoes,
  abrirModalSell,
  abrirModalLiquidacao,
  getLimiteSelecao,
  getQuantidadeEdificio,
  filtrarPorQuantidade,
  formatarNumero,
  modalSellOpen,
  setModalSellOpen,
  modalProps,
  setModalProps,
  selecionarButton,
}) {
  const setoresCores = {
    agricultura: { cor1: "#003816", cor3: "#0C9123", cor4: "#4CAF50" },
    tecnologia: { cor1: "#A64B00", cor3: "#FF6F00", cor4: "#FF8C42" },
    industria: { cor1: "#1A1A1A", cor3: "#808080", cor4: "#B3B3B3" },
    comercio: { cor1: "#660000", cor3: "#E60000", cor4: "#FF4D4D" },
    imobiliario: { cor1: "#000066", cor3: "#3333CC", cor4: "#6666FF" },
    energia: { cor1: "#665200", cor3: "#E6B800", cor4: "#FFD966" },
  };
  const setoresNomes = {
    agricultura: "Agricultura",
    tecnologia: "Tecnologia",
    industria: "Indústria",
    comercio: "Comércio",
    imobiliario: "Imobiliário",
    energia: "Energia",
    todos: "Todos"
  };

  const {
    todosEdificios,
    receitaMensalTotal,
    impostosTotais,
    lucroLiquido,
    setoresAtivosSet,
    edAtual,
    tiposUnicos,
    setoresComEdificios,
    limiteAtual,
    excedente
  } = carteiraDados;

  const SETORES_ARR = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

  return (
    <div key={carteiraKey} className="flex-1 w-full rounded-[20px] flex gap-[10px]" style={{ minHeight: 0, height: '100%' }}>
      <Tooltip style={{ backgroundColor: "#FFFFFF", color: "#350973", border: "1px solid #350973", borderRadius: "6px", padding: "6px 10px", fontWeight: "600", fontSize: "14px" }} id="tooltip-carteira" />

      {/* ── FILTROS LATERAL ESQUERDA ── */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        background: "rgba(0,0,0,.25)",
        border: "1px solid rgba(255,255,255,.07)",
        borderRadius: 12,
        padding: "12px 14px",
        flexShrink: 0,
        width: "200px",
        height: "100%",
        overflowY: "auto",
      }}>
        {/* ── ORDENAÇÃO ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "rgba(255,255,255,.4)" }}>
            Ordenar
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {[
              { key: "setor", label: "Setor" },
              { key: "roi_desc", label: "ROI ↓" },
              { key: "roi_asc", label: "ROI ↑" },
              { key: "lucro_desc", label: "Lucro ↓" },
              { key: "lucro_asc", label: "Lucro ↑" },
              { key: "valor_desc", label: "Valor ↓" },
              { key: "valor_asc", label: "Valor ↑" },
              { key: "fatu_desc", label: "Fatu ↓" },
              { key: "fatu_asc", label: "Fatu ↑" },
              { key: "rank_desc", label: "Rank (S→C)" },
              { key: "rank_asc", label: "Rank (C→S)" },
              { key: "powerup_desc", label: "P.Up ↓" },
              { key: "powerup_asc", label: "P.Up ↑" },
              { key: "qtd_desc", label: "Qtd ↓" },
              { key: "qtd_asc", label: "Qtd ↑" },
            ].map(({ key, label }) => (
              <button key={key}
                onClick={() => setCarteiraOrdem(key)}
                style={{
                  borderRadius: 6,
                  padding: "4px 10px",
                  cursor: "pointer",
                  fontFamily: "'Rajdhani',sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: ".04em",
                  transition: "all .15s",
                  whiteSpace: "nowrap",
                  background: carteiraOrdem === key ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.05)",
                  color: carteiraOrdem === key ? "#fff" : "rgba(255,255,255,.4)",
                  border: "none",
                  flex: "1 0 auto",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,.06)" }} />

        {/* ── SETOR ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "rgba(255,255,255,.4)" }}>
            Setor
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {["todos", ...SETORES_ARR].map(s => {
              const sc = s !== "todos" ? setoresCores[s] : null;
              const isAtivo = carteiraFiltroSetor === s;
              const temCards = s === "todos" || setoresAtivosSet.has(s);
              return (
                <button key={s}
                  onClick={() => setCarteiraFiltroSetor(s)}
                  style={{
                    border: "none",
                    borderRadius: 6,
                    padding: "4px 12px",
                    cursor: "pointer",
                    fontFamily: "'Rajdhani',sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: ".04em",
                    transition: "all .15s",
                    whiteSpace: "nowrap",
                    background: isAtivo ? (sc ? sc.cor3 : "rgba(255,255,255,.2)") : "rgba(255,255,255,.05)",
                    color: isAtivo ? "#fff" : temCards ? "rgba(255,255,255,.45)" : "rgba(255,255,255,.15)",
                    opacity: temCards ? 1 : 0.5,
                    flex: "1 0 auto",
                  }}>
                  {s === "todos" ? "Todos" : setoresNomes[s].slice(0, 3)}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,.06)" }} />

        {/* ── QUANTIDADE ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "rgba(255,255,255,.4)" }}>
            Quantidade
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            {[
              { key: "todos", label: "Todos" },
              { key: "qtd_desc", label: "Maior" },
              { key: "qtd_asc", label: "Menor" },
            ].map(({ key, label }) => (
              <button key={key}
                onClick={() => setFiltroQuantidade(key)}
                style={{
                  border: "none",
                  borderRadius: 6,
                  padding: "4px 12px",
                  cursor: "pointer",
                  fontFamily: "'Rajdhani',sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: ".04em",
                  transition: "all .15s",
                  whiteSpace: "nowrap",
                  background: filtroQuantidade === key ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.05)",
                  color: filtroQuantidade === key ? "#fff" : "rgba(255,255,255,.4)",
                  flex: 1,
                }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,.06)" }} />

        {/* ── AÇÕES ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "rgba(255,255,255,.4)" }}>
            Ações
          </span>
          <button
            onClick={() => setFiltroSelecionados(!filtroSelecionados)}
            style={{
              borderRadius: 6,
              padding: "6px 14px",
              cursor: "pointer",
              fontFamily: "'Rajdhani',sans-serif",
              fontSize: 11,
              fontWeight: 700,
              transition: "all .15s",
              whiteSpace: "nowrap",
              background: filtroSelecionados ? "rgba(52, 211, 153, .2)" : "rgba(255,255,255,.05)",
              color: filtroSelecionados ? "#34d399" : "rgba(255,255,255,.4)",
              border: filtroSelecionados ? "1px solid #34d399" : "1px solid transparent",
              display: "flex",
              alignItems: "center",
              gap: 4,
              justifyContent: "center",
            }}>
            <span style={{ fontSize: 12 }}>⭐</span>
            {filtroSelecionados ? "Selecionados" : "Todos"}
          </button>

          {cartasSelecionadas.length > 0 && (
            <button
              onClick={limparSelecoes}
              style={{
                borderRadius: 6,
                padding: "6px 14px",
                cursor: "pointer",
                fontFamily: "'Rajdhani',sans-serif",
                fontSize: 11,
                fontWeight: 700,
                transition: "all .15s",
                whiteSpace: "nowrap",
                background: "rgba(255,77,77,.15)",
                color: "#ff4d4d",
                border: "1px solid rgba(255,77,77,.2)",
                display: "flex",
                alignItems: "center",
                gap: 4,
                justifyContent: "center",
              }}>
              ✕ Limpar ({cartasSelecionadas.length})
            </button>
          )}

          <button
            onClick={() => {
              if (modoVendaRapida && cartasParaVender.length > 0) {
                executarVendaRapida();
              } else if (modoVendaRapida) {
                setModoVendaRapida(true);
                setCartasParaVender([]);
              } else {
                setModoVendaRapida(true);
                setCartasParaVender([]);
              }
            }}
            style={{
              borderRadius: 6,
              padding: "6px 14px",
              cursor: "pointer",
              fontFamily: "'Rajdhani',sans-serif",
              fontSize: 11,
              fontWeight: 700,
              transition: "all .15s",
              whiteSpace: "nowrap",
              background: modoVendaRapida ? "rgba(255, 77, 77, .25)" : "rgba(255,255,255,.05)",
              color: modoVendaRapida ? "#ff4d4d" : "rgba(255,255,255,.4)",
              border: modoVendaRapida ? "1px solid #ff4d4d" : "1px solid transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}>
            <span style={{ fontSize: 14 }}>🗑️</span>
            {modoVendaRapida && cartasParaVender.length > 0 ? (
              <span>
                Vender ({cartasParaVender.length}) - R$ {
                  cartasParaVender.reduce((total, item) => {
                    const edificio = dados[item.setor]?.edificios?.[item.index];
                    return total + ((edificio?.custoConstrucao || 0) * 0.7 * (edificio?.quantidade || 0));
                  }, 0).toFixed(0)
                }
              </span>
            ) : modoVendaRapida ? "Selecionar para Vender" : "Venda Rápida"}
          </button>

          {modoVendaRapida && todosEdificios.length > 0 && (
            <button
              onClick={() => {
                const novasSelecoes = todosEdificios.map(({ setor, idx, ed }) => ({
                  chave: `${setor}-${idx}`,
                  setor,
                  index: idx,
                  nome: ed.nome
                }));
                setCartasParaVender(novasSelecoes);
              }}
              style={{
                borderRadius: 6,
                padding: "4px 12px",
                cursor: "pointer",
                fontFamily: "'Rajdhani',sans-serif",
                fontSize: 10,
                fontWeight: 700,
                transition: "all .15s",
                whiteSpace: "nowrap",
                background: "rgba(255,255,255,.1)",
                color: "rgba(255,255,255,.6)",
                border: "1px solid rgba(255,255,255,.1)",
              }}>
              Selecionar Todos
            </button>
          )}
        </div>

        <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,.06)" }} />

        {/* ── CAPACIDADE ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "rgba(255,255,255,.4)" }}>
            Capacidade
          </span>
          
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "4px 8px",
            background: "rgba(0,0,0,.2)",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,.06)",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "2px 8px",
              backgroundColor: setorAtivo?.cor3 || "#350973",
              borderRadius: 4,
              height: "28px",
              flex: 1,
            }}>
              <div style={{
                backgroundColor: setorAtivo?.cor4 || "#6A00FF",
                width: "18px",
                height: "18px",
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <img src={setoresImg} className="h-[50%] aspect-square" alt="" />
              </div>
              <span className="text-white fonteBold text-[13px]">{setoresComEdificios}</span>
            </div>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "2px 8px",
              backgroundColor: setorAtivo?.cor3 || "#350973",
              borderRadius: 4,
              height: "28px",
              flex: 1,
            }}>
              <div style={{
                backgroundColor: setorAtivo?.cor4 || "#6A00FF",
                width: "18px",
                height: "18px",
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <img src={soma} className="h-[50%] aspect-square" alt="" />
              </div>
              <span className="text-white fonteBold text-[13px]">{edAtual}</span>
            </div>
          </div>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "4px 8px",
            background: "rgba(0,0,0,.2)",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,.06)",
          }}>
            <span style={{ fontSize: 14, color: "rgba(255,255,255,.5)" }}>📦</span>
            <span style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>
              {tiposUnicos}
            </span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,.3)" }}>/</span>
            <span style={{ fontSize: 15, fontWeight: 800, color: "rgba(255,255,255,.5)" }}>
              {limiteAtual}
            </span>

            {excedente > 0 && (
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "2px 10px",
                background: "rgba(255, 0, 0, 0.2)",
                borderRadius: 6,
                border: "2px solid #ff0000",
                animation: "pulse-red 1.5s infinite",
              }}>
                <span style={{ fontSize: 14 }}>⚠️</span>
                <span style={{ fontSize: 14, fontWeight: 900, color: "#ff0000" }}>
                  +{excedente}
                </span>
              </div>
            )}
          </div>

          {excedente > 0 && (
            <button
              onClick={abrirModalLiquidacao}
              style={{
                padding: "8px 16px",
                borderRadius: 6,
                border: "none",
                background: "linear-gradient(135deg, #ff0000, #cc0000)",
                color: "#fff",
                fontSize: 12,
                fontWeight: 800,
                cursor: "pointer",
                fontFamily: "'Rajdhani',sans-serif",
                transition: "all 0.2s ease",
                boxShadow: "0 0 25px rgba(255,0,0,0.3)",
                animation: "pulse-red 1.5s infinite",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 0 35px rgba(255,0,0,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 0 25px rgba(255,0,0,0.3)";
              }}
            >
              🗑️ Liquidar Excedente
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse-red {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      {/* ── GRID DE CARDS (OCUPA O RESTO DO ESPAÇO) ── */}
      <div
        style={{ 
          background: `linear-gradient(135deg, ${ "#6411D9"} 0%, ${ "#502602"} 100%)`,
          flex: 1,
          borderRadius: "10px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div className="flex-1 overflow-y-auto scrollbar-custom p-[20px]">
          {todosEdificios.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 8, opacity: .4 }}>
              <span style={{ fontSize: 22 }}>📭</span>
              <span style={{ color: "#fff", fontSize: 13, fontFamily: "'Rajdhani',sans-serif" }}>
                {carteiraFiltroSetor !== "todos" ? `Nenhum edifício em ${setoresNomes[carteiraFiltroSetor]}` : "Nenhum edifício na carteira ainda"}
              </span>
            </div>
          ) : (
            <div className="w-full gap-y-[20px] grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-x-[20px]">
              {todosEdificios
                .filter(({ ed }) => {
                  if (filtroQuantidade !== "todos") {
                    return filtrarPorQuantidade(ed, filtroQuantidade);
                  }
                  return true;
                })
                .filter(({ ed, setor, idx }) => {
                  if (filtroSelecionados) {
                    const chave = `${setor}-${idx}`;
                    return cartasSelecionadas.some(item => item.chave === chave);
                  }
                  return true;
                })
                .map(({ ed, idx, setor, roi, categoria, rank, lucroLiquido, valor }) => {
                  const chave = `${setor}-${idx}`;
                  const estaSelecionado = cartasSelecionadas.some(item => item.chave === chave);
                  const estaSelecionadoVenda = cartasParaVender.some(item => item.chave === chave);
                  const limite = getLimiteSelecao();
                  const atingiuLimite = cartasSelecionadas.length >= limite && !estaSelecionado;
                  const quantidade = getQuantidadeEdificio(ed);
                  const excedeLimite = quantidade > 3;

                  return (
                    <div key={`${setor}-${idx}`} style={{ position: "relative" }}>
                      {/* BADGE DE RANK */}
                      <div style={{
                        position: "absolute", top: -8, right: 10, zIndex: 2,
                        background: rank.cor,
                        border: `2px solid ${rank.cor}`,
                        borderRadius: 6, padding: "1px 8px",
                        display: "flex", alignItems: "center", gap: 4,
                        boxShadow: `0 0 15px ${rank.cor}55`,
                      }}>
                        <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 11, fontWeight: 800, color: "#fff", textShadow: "0 0 8px rgba(0,0,0,0.5)" }}>
                          {rank.label}
                        </span>
                      </div>

                      {/* BADGE DE VALOR */}
                      <div style={{
                        position: "absolute", top: -8, left: 10, zIndex: 2,
                        background: "rgba(0,0,0,0.7)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: 6, padding: "1px 8px",
                        display: "flex", alignItems: "center", gap: 4,
                      }}>
                        <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 9, fontWeight: 700, color: "#C79FFF" }}>
                          R$ {formatarNumero(valor)}
                        </span>
                      </div>

                      {excedeLimite && (
                        <div style={{
                          position: "absolute", top: 20, left: 10, zIndex: 2,
                          background: "#ff4d4d",
                          border: "1px solid #ff4d4d",
                          borderRadius: 6, padding: "1px 8px",
                          display: "flex", alignItems: "center", gap: 4,
                        }}>
                          <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 9, fontWeight: 800, color: "#fff" }}>
                            ⚠️ {quantidade}/3
                          </span>
                        </div>
                      )}

                      <CardDraft index={idx} setor={setor} abrirModalSell={abrirModalSell} />

                      <div style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "4px",
                        marginBottom: "2px",
                        gap: "4px",
                      }}>
                        <button
                          className="w-[45%] mt-2 mb-4"
                          onClick={() => {
                            toggleSelecao(setor, idx, ed.nome);
                            selecionarButton();
                          }}
                          style={{
                            padding: "8px 12px",
                            borderRadius: "6px",
                            border: estaSelecionado ? "1px solid #34d399" : "1px solid rgba(255,255,255,0.1)",
                            fontFamily: "'Rajdhani',sans-serif",
                            fontSize: "10px",
                            fontWeight: 700,
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            background: estaSelecionado
                              ? "linear-gradient(135deg, #7aff9a, #34d399)"
                              : atingiuLimite
                                ? "rgba(255,255,255,0.1)"
                                : "rgba(255,255,255,0.15)",
                            color: estaSelecionado
                              ? "#1a1a1a"
                              : atingiuLimite
                                ? "rgba(255,255,255,0.3)"
                                : "rgba(255,255,255,0.7)",
                            boxShadow: estaSelecionado
                              ? "0 0 15px rgba(52, 211, 153, 0.4)"
                              : "none",
                            transform: estaSelecionado ? "scale(1.02)" : "scale(1)",
                            pointerEvents: atingiuLimite && !estaSelecionado ? "none" : "auto",
                            height: "32px",
                          }}
                          onMouseEnter={(e) => {
                            if (!estaSelecionado && !atingiuLimite) {
                              e.currentTarget.style.background = "rgba(255,255,255,0.25)";
                              e.currentTarget.style.transform = "scale(1.05)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!estaSelecionado && !atingiuLimite) {
                              e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                              e.currentTarget.style.transform = "scale(1)";
                            }
                          }}
                        >
                          {estaSelecionado ? "✓ Selecionado" : "Selecionar"}
                        </button>

                        <button
                          className="w-[45%] mt-2 mb-4"
                          onClick={() => {
                            if (modoVendaRapida) {
                              toggleSelecaoVenda(setor, idx, ed.nome);
                            }
                          }}
                          style={{
                            padding: "8px 12px",
                            borderRadius: "6px",
                            border: estaSelecionadoVenda
                              ? "1px solid #ff4d4d"
                              : "1px solid rgba(255,255,255,0.1)",
                            fontFamily: "'Rajdhani',sans-serif",
                            fontSize: "10px",
                            fontWeight: 700,
                            transition: "all 0.2s ease",
                            background: estaSelecionadoVenda
                              ? "linear-gradient(135deg, #ff4d4d, #cc0000)"
                              : modoVendaRapida
                                ? "rgba(255,77,77,0.2)"
                                : "rgba(255,255,255,0.05)",
                            color: estaSelecionadoVenda
                              ? "#fff"
                              : modoVendaRapida
                                ? "rgba(255,77,77,0.7)"
                                : "rgba(255,255,255,0.3)",
                            boxShadow: estaSelecionadoVenda
                              ? "0 0 15px rgba(255,77,77,0.4)"
                              : "none",
                            transform: estaSelecionadoVenda ? "scale(1.02)" : "scale(1)",
                            height: "32px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "4px",
                            cursor: modoVendaRapida ? "pointer" : "not-allowed",
                            pointerEvents: modoVendaRapida ? "auto" : "none",
                          }}
                          onMouseEnter={(e) => {
                            if (!estaSelecionadoVenda && modoVendaRapida) {
                              e.currentTarget.style.background = "rgba(255,77,77,0.3)";
                              e.currentTarget.style.transform = "scale(1.05)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!estaSelecionadoVenda && modoVendaRapida) {
                              e.currentTarget.style.background = "rgba(255,77,77,0.2)";
                              e.currentTarget.style.transform = "scale(1)";
                            }
                          }}
                        >
                          <span>🗑️</span>
                          {estaSelecionadoVenda ? "Vender" : "Vender"}
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MODAL DE CONFIRMAÇÃO DE LIQUIDAÇÃO ──────────────────────────
const ModalConfirmacaoLiquidacao = memo(({ isOpen, onClose, onConfirm, excedente }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-[9999] bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-[#1a0a3b] rounded-[24px] p-6 max-w-[420px] w-full border-2 border-red-500/30 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-bold">⚠️ Confirmar Liquidação</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all"
          >
            <img src={fechar} className="w-4 h-4" alt="Fechar" />
          </button>
        </div>

        <div className="text-white/80 text-sm leading-relaxed mb-6">
          <p className="mb-2">
            Você está com <span className="text-red-400 font-bold">{excedente}</span> carta(s) excedente(s)!
          </p>
          <p className="mb-2">
            ⚠️ As cartas com <span className="text-yellow-400 font-bold">menor ROI</span> serão vendidas primeiro.
          </p>
          <p>
            💰 Você receberá <span className="text-green-400 font-bold">70%</span> do valor de construção de cada carta.
          </p>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-400 text-white font-bold text-sm hover:scale-105 transition-all shadow-lg hover:shadow-red-500/30"
          >
            🗑️ Liquidar {excedente} carta(s)
          </button>
        </div>
      </motion.div>
    </div>
  );
});

// ─── FUNÇÕES DE CÁLCULO (FORA DO COMPONENTE) ─────────────────────

function criarCalculadoraCustoRecurso(mapaEdificios, dados) {
  const cache = new Map();

  const calcularCustoRecurso = (nomeRecurso) => {
    if (cache.has(nomeRecurso)) return cache.get(nomeRecurso);

    const edEncontrado = mapaEdificios.get(nomeRecurso);
    if (!edEncontrado) return 0;

    const c = edEncontrado.custoConstrucao || 0;
    const tNec = edEncontrado.lojasNecessarias?.terrenos || 0;
    const pNec = edEncontrado.lojasNecessarias?.lojasP || 0;
    const mNec = edEncontrado.lojasNecessarias?.lojasM || 0;
    const gNec = edEncontrado.lojasNecessarias?.lojasG || 0;

    let total = c
      + tNec * (dados.terrenos?.preçoConstrução || 0)
      + pNec * ((dados.lojasP?.preçoConstrução || 0) + (dados.lojasP?.quantidadeNecTerreno || 0) * (dados.terrenos?.preçoConstrução || 0))
      + mNec * ((dados.lojasM?.preçoConstrução || 0) + (dados.lojasM?.quantidadeNecTerreno || 0) * (dados.terrenos?.preçoConstrução || 0))
      + gNec * ((dados.lojasG?.preçoConstrução || 0) + (dados.lojasG?.quantidadeNecTerreno || 0) * (dados.terrenos?.preçoConstrução || 0));

    if (Array.isArray(edEncontrado.recursoDeConstrução) && edEncontrado.recursoDeConstrução.length > 0) {
      edEncontrado.recursoDeConstrução.forEach((sub) => {
        total += calcularCustoRecurso(sub);
      });
    }

    cache.set(nomeRecurso, total);
    return total;
  };

  return calcularCustoRecurso;
}

function calcularValorTotalEdificio(ed, dados) {
  if (!ed) return 0;

  const mapaEdificios = criarMapaEdificios(dados);
  const calcularCustoRecurso = criarCalculadoraCustoRecurso(mapaEdificios, dados);

  const custoBase = ed.custoConstrucao || 0;

  const tNec = ed.lojasNecessarias?.terrenos || 0;
  const pNec = ed.lojasNecessarias?.lojasP || 0;
  const mNec = ed.lojasNecessarias?.lojasM || 0;
  const gNec = ed.lojasNecessarias?.lojasG || 0;

  let custoLojas = 0;
  if (tNec > 0) custoLojas += tNec * (dados.terrenos?.preçoConstrução || 0);
  if (pNec > 0) custoLojas += pNec * ((dados.lojasP?.preçoConstrução || 0) + (dados.lojasP?.quantidadeNecTerreno || 0) * (dados.terrenos?.preçoConstrução || 0));
  if (mNec > 0) custoLojas += mNec * ((dados.lojasM?.preçoConstrução || 0) + (dados.lojasM?.quantidadeNecTerreno || 0) * (dados.terrenos?.preçoConstrução || 0));
  if (gNec > 0) custoLojas += gNec * ((dados.lojasG?.preçoConstrução || 0) + (dados.lojasG?.quantidadeNecTerreno || 0) * (dados.terrenos?.preçoConstrução || 0));

  let custoRecursos = 0;
  if (Array.isArray(ed.recursoDeConstrução)) {
    ed.recursoDeConstrução.forEach(nome => {
      custoRecursos += calcularCustoRecurso(nome);
    });
  }

  return custoBase + custoLojas + custoRecursos;
}

function calcularLucroLiquido(ed, dados, economiaSetor) {
  if (!ed || ed.quantidade <= 0) return 0;

  try {
    const fatorEconomico = FATOR_ECONOMIA[economiaSetor] || 1;
    const quantidade = ed.quantidade || 0;

    const qtdMin2 = ed?.powerUp?.nível2?.quantidadeMínima ?? Infinity;
    const qtdMin3 = ed?.powerUp?.nível3?.quantidadeMínima ?? Infinity;
    const nivelPU = quantidade >= qtdMin3 ? "powerUpNv3"
      : quantidade >= qtdMin2 ? "powerUpNv2"
        : "powerUpNv1";

    let redCusto = 0;
    let aumFatu = 0;
    const mapaEdificios = criarMapaEdificios(dados);

    if (Array.isArray(ed?.RecebeMelhoraEficiencia)) {
      ed.RecebeMelhoraEficiencia.forEach((rel) => {
        const outroEd = mapaEdificios.get(rel.nome);
        if (outroEd && outroEd.quantidade > 0) {
          const nivel = nivelPU === "powerUpNv1" ? "nível1"
            : nivelPU === "powerUpNv2" ? "nível2"
              : "nível3";
          redCusto += rel?.redCusto?.[nivel] || 0;
          aumFatu += rel?.aumFatu?.[nivel] || 0;
        }
      });
    }

    const faturamentoUnitario = ed?.finanças?.faturamentoUnitário || 0;
    const impostoFixo = ed?.finanças?.impostoFixo || 0;
    const impostoFatu = ed?.finanças?.impostoSobreFatu || 0;

    const faturamentoFinal = faturamentoUnitario * (1 + aumFatu / 100) * fatorEconomico;
    const impostoFixoFinal = impostoFixo * (1 - redCusto / 100);
    const impostoFatuFinal = impostoFatu * (1 - redCusto / 100);

    const faturamentoMensal = faturamentoFinal * 30 * quantidade;
    const impostoFaturamento = faturamentoMensal * impostoFatuFinal;
    const impostoFixoTotal = impostoFixoFinal * quantidade;

    return faturamentoMensal - impostoFaturamento - impostoFixoTotal;
  } catch (err) {
    console.error("Erro no calcularLucroLiquido:", err);
    return 0;
  }
}

function calcROI(ed, dados, economiaSetor, mapaEdificios, calcularCustoRecurso) {
  if (!ed || !dados) return 0;

  try {
    const fatorEconomico = FATOR_ECONOMIA[economiaSetor] || 1;
    const quantidadeAtual = ed.quantidade || 0;
    const qtdMin2 = ed?.powerUp?.nível2?.quantidadeMínima ?? Infinity;
    const qtdMin3 = ed?.powerUp?.nível3?.quantidadeMínima ?? Infinity;

    const nivelPU = quantidadeAtual >= qtdMin3 ? "powerUpNv3"
      : quantidadeAtual >= qtdMin2 ? "powerUpNv2"
        : "powerUpNv1";

    let redCusto = 0;
    let aumFatu = 0;

    if (Array.isArray(ed?.RecebeMelhoraEficiencia)) {
      ed.RecebeMelhoraEficiencia.forEach((rel) => {
        const outroEd = mapaEdificios.get(rel.nome);
        if (outroEd && outroEd.quantidade > 0) {
          const nivel = nivelPU === "powerUpNv1" ? "nível1"
            : nivelPU === "powerUpNv2" ? "nível2"
              : "nível3";
          redCusto += rel?.redCusto?.[nivel] || 0;
          aumFatu += rel?.aumFatu?.[nivel] || 0;
        }
      });
    }

    const valorFatu = ed?.finanças?.faturamentoUnitário || 0;
    const impostoFixo = ed?.finanças?.impostoFixo || 0;
    const impostoFatu = ed?.finanças?.impostoSobreFatu || 0;

    const valorFatuFinal = valorFatu * (1 + aumFatu / 100);
    const impostoFixoFinal = impostoFixo * (1 - redCusto / 100);
    const impostoFatuFinal = impostoFatu * (1 - redCusto / 100);

    const fatuMensal = valorFatuFinal * 30 * fatorEconomico;
    const impostoSobreFatuValor = fatuMensal * impostoFatuFinal;
    const lucro = fatuMensal - impostoSobreFatuValor - impostoFixoFinal;

    const custoTotal = calcularValorTotalEdificio(ed, dados);
    return custoTotal > 0 ? (lucro / custoTotal) * 100 : 0;
  } catch (err) {
    console.error("Erro no calcROI:", err);
    return 0;
  }
}