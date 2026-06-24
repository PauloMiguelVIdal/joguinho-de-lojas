import React, { useContext, useCallback, useMemo, useEffect, useRef, useState } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { Line } from "react-chartjs-2";
import agricultura from "../../public/outrasImagens/setores/agricultura.png";
import tecnologia from "../../public/outrasImagens/setores/tecnologia.png";
import comercio from "../../public/outrasImagens/setores/comercio.png";
import industria from "../../public/outrasImagens/setores/industria.png";
import imobiliario from "../../public/outrasImagens/setores/imobiliário.png";
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
// import Map from "../Map";
import { Tooltip } from "react-tooltip";
import solo from "../../public/outrasImagens/solo.png";
import buildBusiness from "../../public/outrasImagens/business.png";
//imagens cena escritório
// import imgChefePé from "../../public/outrasImagens/chefe em pé.png";
// import imgchefeIcon from "../../public/outrasImagens/chefe.png";
import imgFuncionarioIcon from "../../public/outrasImagens/funcionário 1.png";
// import imgFuncionarioPé from "../../public/outrasImagens/funcionário 1 em pé.png";
import imgMesa from "../../public/outrasImagens/mesa de trabalho.png";
import imgCadeira from "../../public/outrasImagens/cadeira.png";
// import { Office } from "./Office";
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
import ecossistema from '../../public/outrasImagens/setores/ecossistema.png'
import { CardDraftMini } from "./CardDraftMini.jsx";
import { SlotDisplay, executarLiquidacaoAutomatica, useSlotVerification } from "./SlotManager";
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

// ===== CONSTANTES E FUNÇÕES DE CÁLCULO DA CARTEIRA (FORA DO COMPONENTE) =====

const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];



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

const FATOR_ECONOMIA = {
  recessão: 0.4,
  declinio: 0.8,
  estável: 1,
  progressiva: 1.1,
  aquecida: 1.25
};




const getCategoria = (nome) => {
  if (ESTOQUES.has(nome)) return "estoque";
  if (PRODUCOES.has(nome)) return "producao";
  if (VENDAS_FINAIS.has(nome)) return "venda";
  return "passiva";
};

const criarMapaEdificios = (dados) => {
  const mapa = new Map();
  setoresArr.forEach(setor => {
    if (dados[setor]?.edificios) {
      dados[setor].edificios.forEach(ed => {
        mapa.set(ed.nome, ed);
      });
    }
  });
  return mapa;
};

const criarCalculadoraCustoRecurso = (mapaEdificios, dados) => {
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
};

const calcROI = (ed, dados, economiaSetor, mapaEdificios, calcularCustoRecurso) => {
  if (!ed || !dados) return 0;

  try {
    // ===== ECONOMIA (USA O ESTADO ATUAL DO SETOR) =====
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

    const custoBase =
      (ed?.lojasNecessarias?.terrenos || 0) * (dados?.terrenos?.preçoConstrução || 0) +
      (ed?.lojasNecessarias?.lojasP || 0) * ((dados?.lojasP?.preçoConstrução || 0) + (dados?.lojasP?.quantidadeNecTerreno || 0) * (dados?.terrenos?.preçoConstrução || 0)) +
      (ed?.lojasNecessarias?.lojasM || 0) * ((dados?.lojasM?.preçoConstrução || 0) + (dados?.lojasM?.quantidadeNecTerreno || 0) * (dados?.terrenos?.preçoConstrução || 0)) +
      (ed?.lojasNecessarias?.lojasG || 0) * ((dados?.lojasG?.preçoConstrução || 0) + (dados?.lojasG?.quantidadeNecTerreno || 0) * (dados?.terrenos?.preçoConstrução || 0));

    let custoRecursos = 0;
    if (Array.isArray(ed?.recursoDeConstrução)) {
      ed.recursoDeConstrução.forEach((nome) => {
        custoRecursos += calcularCustoRecurso(nome);
      });
    }

    const custoTotal = custoBase + custoRecursos + (ed?.custoConstrucao || 0);

    return custoTotal > 0 ? (lucro / custoTotal) * 100 : 0;

  } catch (err) {
    console.error("Erro no calcROI:", err);
    return 0;
  }
};

const processarCarteira = (dados, economiaSetores, carteiraFiltroSetor, carteiraOrdem) => {
  const mapaEdificios = criarMapaEdificios(dados);
  const calcularCustoRecurso = criarCalculadoraCustoRecurso(mapaEdificios, dados);
  const cacheROI = new Map();

  const calcularROI = (ed, setor) => {
    const chave = `${ed.nome}_${ed.quantidade}`;
    if (cacheROI.has(chave)) return cacheROI.get(chave);

    // 🔥 CORREÇÃO: Usa o estado atual da economia do setor
    const economiaSetor = economiaSetores[setor]?.economiaSetor?.estadoAtual || 'estável';

    const resultado = calcROI(ed, dados, economiaSetor, mapaEdificios, calcularCustoRecurso);
    cacheROI.set(chave, resultado);
    return resultado;
  };

  let todosEdificios = [];
  setoresArr.forEach(s => {
    dados[s]?.edificios?.forEach((ed, idx) => {
      if (ed.quantidade > 0) {
        todosEdificios.push({
          ed,
          idx,
          setor: s,
          roi: calcularROI(ed, s),
          categoria: getCategoria(ed.nome)
        });
      }
    });
  });

  if (carteiraFiltroSetor !== "todos") {
    todosEdificios = todosEdificios.filter(e => e.setor === carteiraFiltroSetor);
  }
if (carteiraOrdem === "fatu_desc") todosEdificios.sort((a, b) => {
  const fatA = (a.ed.finanças?.faturamentoUnitário || 0) * (a.ed.quantidade || 0);
  const fatB = (b.ed.finanças?.faturamentoUnitário || 0) * (b.ed.quantidade || 0);
  return fatB - fatA;
});
else if (carteiraOrdem === "fatu_asc") todosEdificios.sort((a, b) => {
  const fatA = (a.ed.finanças?.faturamentoUnitário || 0) * (a.ed.quantidade || 0);
  const fatB = (b.ed.finanças?.faturamentoUnitário || 0) * (b.ed.quantidade || 0);
  return fatA - fatB;
});
  if (carteiraOrdem === "roi_desc") todosEdificios.sort((a, b) => b.roi - a.roi);
  else if (carteiraOrdem === "roi_asc") todosEdificios.sort((a, b) => a.roi - b.roi);
  else if (carteiraOrdem === "categoria") todosEdificios.sort((a, b) => a.categoria.localeCompare(b.categoria));
  else if (carteiraOrdem === "setor") todosEdificios.sort((a, b) => a.setor.localeCompare(b.setor));
  else if (carteiraOrdem === "nome") todosEdificios.sort((a, b) => a.ed.nome.localeCompare(b.ed.nome));

  let receitaMensalTotal = 0, impostosTotais = 0;
  setoresArr.forEach(s => {
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
  const edAtual = setoresArr.reduce((total, s) =>
    total + (dados[s]?.edificios || []).reduce((sum, ed) =>
      sum + (ed.quantidade > 0 ? ed.quantidade : 0), 0)
    , 0);

  const tiposUnicos = new Set(
    setoresArr.flatMap(s =>
      (dados[s]?.edificios || []).filter(ed => ed.quantidade > 0).map(ed => ed.nome)
    )
  ).size;

  const setoresComEdificios = setoresArr.filter(s =>
    (dados[s]?.edificios || []).some(ed => ed.quantidade > 0)
  ).length;

  return {
    todosEdificios,
    receitaMensalTotal,
    impostosTotais,
    lucroLiquido,
    setoresAtivosSet,
    edAtual,
    tiposUnicos,
    setoresComEdificios
  };
};


export default function DashboardDraft() {


  const { dados, atualizarDadosProf2, atualizarDados } = useContext(
    CentraldeDadosContext
  );
  const { economiaSetores, setEconomiaSetores,atualizarEco } = useContext(
    DadosEconomyGlobalContext
  );
  const [ativo, setAtivo] = useState("carteira");
  const [carteiraOrdem, setCarteiraOrdem] = useState("setor");
  const [carteiraFiltroSetor, setCarteiraFiltroSetor] = useState("todos");
  const [carteiraKey, setCarteiraKey] = useState(0);
  const [modalConclusao, setModalConclusao] = useState(false);

const verificarSlots = useSlotVerification();

  // ===== NOVO: Estado para os dados da carteira =====
  const [carteiraDados, setCarteiraDados] = useState({
    todosEdificios: [],
    receitaMensalTotal: 0,
    impostosTotais: 0,
    lucroLiquido: 0,
    setoresAtivosSet: new Set(),
    edAtual: 0,
    tiposUnicos: 0,
    setoresComEdificios: 0
  });

const verificarAcao = useSlotVerification();

  // useEffect(() => {
  //   setAtivo('carteira');
  // }, [dados.dia])
  // const [graficoView, setGraficoView] = useState('ecossistema'); // 'grafico' | 'techtree' | 'producao' | 'ecossistema'

  // No topo do Dashboard, APÓS os outros useState:
  const snapshotDados = JSON.stringify(
    ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"].map(s =>
      (dados[s]?.edificios || []).map(ed => ({ nome: ed.nome, q: ed.quantidade }))
    )
  );

  // Adicione este useEffect logo abaixo:

  const [cartasSelecionadas, setCartasSelecionadas] = useState([]);
  const [filtroQuantidade, setFiltroQuantidade] = useState("todos"); // "todos", "1", "2-5", "6-10", "10+"
  const [filtroSelecionados, setFiltroSelecionados] = useState(false); // true = mostrar apenas selecionados

  // Função para calcular o limite de cartas baseado no dia
  const getLimiteSelecao = useCallback(() => {
    const dia = dados.dia || 0;
    if (dia > 300) return 20;
    if (dia > 270) return 16;
    if (dia > 180) return 12;
    if (dia > 90) return 8;
    return 5;
  }, [dados.dia]);

  const calcularDadosFinais = useCallback(() => {
  // 1. Faturamento total durante todo o jogo
  const faturamentoTotal = dados.faturamento?.arrayFatuDiário?.reduce((acc, val) => acc + val, 0) || 0;

  // 2. Soma de todas as pontuações de powerUp (aum fatu e red custo)
  const powerUpsAumFatu = economiaSetores.powerUps?.aumentoFaturamentoDiario || [];
  const powerUpsRedCusto = economiaSetores.powerUps?.reducaoCustoDiario || [];
  const somaPowerUpsAumFatu = powerUpsAumFatu.reduce((acc, val) => acc + val, 0);
  const somaPowerUpsRedCusto = powerUpsRedCusto.reduce((acc, val) => acc + val, 0);
  const totalPowerUps = somaPowerUpsAumFatu + somaPowerUpsRedCusto;

  // 3. ROE médio de todo o jogo (Retorno sobre o Patrimônio)
  const patrimonioHistorico = economiaSetores.patrimonioInventarioHistorico || [];
  const roeMedio = patrimonioHistorico.length > 0 
    ? (patrimonioHistorico.reduce((acc, val) => acc + val, 0) / patrimonioHistorico.length) 
    : 0;

  // 4. Soma total de inventário histórico durante o jogo
  const inventarioHistorico = economiaSetores.patrimonioInventarioHistorico || [];
  const somaInventarioHistorico = inventarioHistorico.reduce((acc, val) => acc + val, 0);

  // 5. Soma total de patrimônio histórico
  const patrimonioHistoricoTotal = setoresArr.reduce((total, setor) => {
    const historico = economiaSetores[setor]?.economiaSetor?.patrimonioHistorico || [];
    return total + historico.reduce((acc, val) => acc + val, 0);
  }, 0);

  // 6. Total de dinheiro disponível de saldo
  const saldoTotal = economiaSetores.saldo || 0;

  return {
    faturamentoTotal,
    somaPowerUpsAumFatu,
    somaPowerUpsRedCusto,
    totalPowerUps,
    roeMedio,
    somaInventarioHistorico,
    patrimonioHistoricoTotal,
    saldoTotal
  };
}, [dados, economiaSetores]);

// Adicione este useEffect para monitorar o fim do jogo:

useEffect(() => {
  if (dados.dia >= 360 && !modalConclusao) {
    setModalConclusao(true);
  }
}, [dados.dia, modalConclusao]);

// Funções para os botões do modal:

const fecharModalConclusao = useCallback(() => {
  setModalConclusao(false);
  // Aqui você pode adicionar lógica para reiniciar o jogo ou redirecionar
}, []);

  // Função para alternar seleção de uma carta
  const toggleSelecao = useCallback((setor, index, nomeEdificio) => {
    const chave = `${setor}-${index}`;
    const limite = getLimiteSelecao();

    setCartasSelecionadas(prev => {
      const jaSelecionado = prev.some(item => item.chave === chave);

      if (jaSelecionado) {
        const novaLista = prev.filter(item => item.chave !== chave);
        atualizarDados("cartasSelecionadas", novaLista);
        return novaLista;
      } else {
        if (prev.length >= limite) {
          alert(`Limite de ${limite} cartas selecionadas atingido!`);
          return prev;
        }
        const novaLista = [...prev, {
          chave,
          setor,
          index,
          nome: nomeEdificio,
          dataSelecao: new Date().toISOString()
        }];
        atualizarDados("cartasSelecionadas", novaLista);
        return novaLista;
      }
    });
  }, [getLimiteSelecao, atualizarDados]);

  // Carregar seleções salvas ao iniciar
  useEffect(() => {
    if (dados.cartasSelecionadas) {
      setCartasSelecionadas(dados.cartasSelecionadas);
    }
  }, [dados.cartasSelecionadas]);

  // Função para limpar todas as seleções
  const limparSelecoes = useCallback(() => {
    setCartasSelecionadas([]);
    atualizarDados("cartasSelecionadas", []);
  }, [atualizarDados]);

  // Função para obter a quantidade de um edifício
  const getQuantidadeEdificio = (ed) => {
    return ed.quantidade || 0;
  };

  // Função para filtrar por quantidade
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

  // Função para obter o label do filtro de quantidade
  const getLabelQuantidade = (filtro) => {
    switch (filtro) {
      case "1": return "1";
      case "2": return "2";
      case "3": return "3";
      default: return "Todos";
    }
  };
  useEffect(() => {
    // console.log("[Dashboard] snapshot mudou, ativo:", ativo, "carteiraKey antes:", carteiraKey);
    if (ativo === "carteira") {
      setCarteiraKey(prev => prev + 1);
    }
  }, [snapshotDados]);


  // { id: "ecossistema", img: ecossistemaImg, cor3: "#4C14A9", cor4: "#6411D9" }

  // {ativo === "ecossistema" && (
  //   <div className="w-full h-full">
  //     <EcosystemMap />
  //   </div>
  // )}


  const [modalSell, setModalSell] = useState(false);
  // const economiaSetor = dados[ativo].economiaSetor.estadoAtual
  // console.log(economiaSetor)
  const patrimonioTotal = economiaSetores.patrimonio
  const vision = dados.vision.visionAtual;
  const [changeAudio] = useSound(changeSectoryAudio);
  const [buttonCloseAudio] = useSound(closeAudio);
  const [buttonOpenAudio] = useSound(openAudio);
  const [buttonWalletOpenAudio] = useSound(walletOpenAudio);
  // Adicione este estado no início do componente Dashboard (junto com os outros useState):


  const setVision = (newVision) => {
    atualizarDados("vision", {
      ...dados.vision,
      visionAtual: newVision,
    });
  };
  const abrirMapa = () => setVision("mapa");
  // const abrirDashboard = () => setVision("dashboard")
  const abrirBanco = () => setVision("bank");

  const [modalSellOpen, setModalSellOpen] = useState(false);
  const [modalProps, setModalProps] = useState({
    setor: "",
    nomeLicença: "",
    index: 0,
  });


  useEffect(() => {
    if (ativo === "carteira") {
      // console.log("[Carteira] Recalculando dados...");
      const novosDados = processarCarteira(dados, economiaSetores, carteiraFiltroSetor, carteiraOrdem);
      setCarteiraDados(novosDados);
    }
  }, [dados, economiaSetores, carteiraFiltroSetor, carteiraOrdem, ativo]);


  // useEffect(() => {
  //   if (dados.dia >= 270) {

  //     setAtivo("carteira")

  //   }
  // }, [dados.dia])





  const abrirModalSell = (setor, index) => {
    setModalProps({ setor, index });
    setModalSellOpen(true);
  };

  const controls = useAnimation();

  const gradientes = [
    "linear-gradient(to top, #ff9966, #ff5e62, #2c3e50)", // pôr do sol
    "linear-gradient(to top, #141e30, #243b55, #0f2027)", // noite
    "linear-gradient(to top, #0f2027, #203a43, #2c5364)", // madrugada
    "linear-gradient(to top, #2c5364, #203a43, #fbb034)", // nascer do sol
    "linear-gradient(to top, #fbb034, #ffdd00, #ffeeee)", // meio-dia
  ];

  const animarCicloDia = async () => {
    await controls.start({
      background: gradientes,
      transition: {
        duration: 1,
        ease: "linear",
      },
    });
  };

  // disponibiliza no contexto para o botão usar
  // useEffect(() => {
  //   atualizarDados("animarCicloDia", animarCicloDia);
  // }, [dados.dia]);

  const tooltipStyle = {
    backgroundColor: "#FFFFFF",
    color: "#350973",
    border: "1px solid #350973",
    borderRadius: "6px",
    padding: "6px 10px",
    fontWeight: "600",
    fontSize: "14px",
  };

  const ativoConvertido = (ativo) => {
    switch (ativo) {
      case "agricultura":
        return "Agricultura";
      case "tecnologia":
        return "Tecnologia";
      case "industria":
        return "Industria";
      case "comercio":
        return "Comercio";
      case "imobiliario":
        return "imobiliario";
      case "energia":
        return "Energia";
      case "carteira":
        return "Carteira";
      case "gerenciamento":
        return "Gerenciamento";
      case "mapa":
        return "Mapa";
    }
  };

  const formatarNumero = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(1).replace(".0", "") + "T"; // Trilhões
    if (num >= 1e9) return (num / 1e9).toFixed(1).replace(".0", "") + "B"; // Bilhões
    if (num >= 1e6) return (num / 1e6).toFixed(1).replace(".0", "") + "M"; // Milhões
    if (num >= 1e3) return (num / 1e3).toFixed(1).replace(".0", "") + "K"; // Milhares
    return num.toString();
  };

  function Tooltip({ text, children }) {
    const [show, setShow] = useState(false);
    const ref = useRef();

    const tooltip =
      show &&
      ref.current &&
      createPortal(
        <div
          style={{
            position: "absolute",
            top: ref.current.getBoundingClientRect().top - 40, // sobe o tooltip
            left:
              ref.current.getBoundingClientRect().left +
              ref.current.offsetWidth / 2,
            transform: "translateX(-50%)",
            backgroundColor: "#FFFFFF",
            color: "#350973",
            padding: "6px 10px",
            borderRadius: "6px",
            ontWeight: "600",
            whiteSpace: "pre-line", // respeita \n como quebra de linha
            zIndex: 2147483647,
            pointerEvents: "none",
            maxWidth: "400px",
          }}
        >
          {text}
        </div>,
        document.body
      );

    return (
      <>
        <div
          ref={ref}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          className="relative flex items-center justify-center"
        >
          {children}
        </div>
        {tooltip}
      </>
    );
  }

  const setores = [
    {
      id: "agricultura",
      corClasse: "bg-[#4CAF50]",
      img: agricultura,
      descLicença:
        "Com a Licença Global de Agricultura, você terá acesso a cultivos exclusivos, otimização de produções e melhorias que aumentarão sua rentabilidade. Liberte o potencial do setor agrícola agora mesmo!",
      cor1: "#003816",
      cor2: "#4CAF50",
      cor3: "#0C9123",
      cor4: "#4CAF50",
    },
    {
      id: "tecnologia",
      corClasse: "bg-[#FF8C42]",
      img: tecnologia,
      descLicença:
        "Com a Licença Global de Tecnologia, você desbloqueia inovações que podem transformar sua infraestrutura, otimizar processos e maximizar os lucros. Invista no futuro agora!",
      cor1: "#A64B00 ",
      cor2: "#D45A00 ",
      cor3: "#FF6F00 ",
      cor4: "#FF8C42 ",
    },
    {
      id: "industria",
      corClasse: "bg-[#B3B3B3]",
      img: industria,
      descLicença:
        "Com a Licença Global de Indústria, você acessa fábricas avançadas e processos de produção que aceleram sua evolução e aumentam a eficiência. Não fique para trás!",
      cor1: "#1A1A1A ",
      cor2: "#4D4D4D  ",
      cor3: "#808080  ",
      cor4: "#B3B3B3  ",
    },
    {
      id: "comercio",
      corClasse: "bg-[#FF4D4D]",
      img: comercio,
      descLicença:
        "Com a Licença Global de Comércio, você tem acesso a novos mercados, estratégias de vendas e expansão que podem levar seus negócios a um novo nível. Não perca essa oportunidade!",
      cor1: "#660000  ",
      cor2: "#A31919  ",
      cor3: "#E60000  ",
      cor4: "#FF4D4D  ",
    },
    {
      id: "imobiliario",
      corClasse: "bg-[#6666FF]",
      img: imobiliario,
      descLicença:
        "Com a Licença Global Imobiliária, você pode investir em novos terrenos, expandir suas construções e maximizar os retornos do mercado imobiliário. Abra as portas para grandes lucros!",
      cor1: "#000066  ",
      cor2: "#1A1A8C  ",
      cor3: "#3333CC  ",
      cor4: "#6666FF  ",
    },
    {
      id: "energia",
      corClasse: "bg-[#FFD966]",
      img: energia,
      descLicença:
        "Com a Licença Global de Energia, você ativa fontes de energia sustentáveis e de alta performance, garantindo uma operação eficiente e lucrativa. Potencialize seu setor energético agora!",
      cor1: "#665200   ",
      cor2: "#A37F19   ",
      cor3: "#E6B800",
      cor4: "#FFD966",
    },
    {
      id: "carteira",
      corClasse: "bg-[#934CFF]",
      img: Carteira,
      cor1: "#350973 ",
      cor2: "#4C14A9 ",
      cor3: "#6A00FF ",
      cor4: "#934CFF ",
    },
    // {
    //   id: "mercado",
    //   corClasse: "bg-[#6A00FF]",
    //   img: mercado,
    //   cor1: "#6A00FF ",
    //   cor2: "#6A00FF ",
    //   cor3: "#6A00FF ",
    //   cor4: "#6A00FF ",
    // },
    // {
    //   id: "gerenciamento",
    //   corClasse: "bg-[#934CFF]",
    //   img: gerenciamento,
    //   cor1: "#7c7879ff ",
    //   cor2: "#4C14A9 ",
    //   cor3: "#6A00FF ",
    //   cor4: "#934CFF ",
    // },
    {
      id: "grafico",
      corClasse: "bg-gradient-to-br from-[#6A00FF] to-[#E60000]",
      img: grafico,
      cor1: "#6A00FF ",
      cor2: "#6A00FF ",
      cor3: "#6A00FF ",
      cor4: "#6A00FF ",
    },
    // {
    //   id: "ecossistema",
    //   corClasse: "bg-[#6A00FF]",
    //   img: ecossistema,
    //   cor1: "#6A00FF ",
    //   cor2: "#6A00FF ",
    //   cor3: "#6A00FF ",
    //   cor4: "#6A00FF ",
    // },
    // { id: "mapa", corClasse: "bg-[#E60000]", img: maps, cor1: "#6A00FF ", cor2: "#6A00FF ", cor3:  "bg-gradient-to-br from-[#6A00FF] to-[#E60000]", cor4: "#6A00FF ", },
  ];

  const corEconomia = (cor) => {
    switch (cor) {
      case "recessão":
        return "bg-[#FF0000]";
      case "declinio":
        return "bg-[#FF8000]";
      case "estável":
        return "bg-[#EEAD2D]";
      case "progressiva":
        return "bg-[#9ACD32]";
      case "aquecida":
        return "bg-[#006400]";
    }
  };



  const coresEdificiosGradiente = {
    terrenos: {
      start: "#FF7F32",
      middle: "#FF9955",
      end: "#FFB377",
      glow: "rgba(255, 127, 50, 0.3)",
    },
    lojasP: {
      start: "#6411D9",
      middle: "#7B33E8",
      end: "#9355F7",
      glow: "rgba(100, 17, 217, 0.3)",
    },
    lojasM: {
      start: "#F27405",
      middle: "#FF8C1A",
      end: "#FFA64D",
      glow: "rgba(242, 116, 5, 0.3)",
    },
    lojasG: {
      start: "#3A0E8C",
      middle: "#5020B0",
      end: "#6833D4",
      glow: "rgba(58, 14, 140, 0.3)",
    },
  };



  const createGradientEdificios = (ctx, edificio) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    const cores = coresEdificiosGradiente[edificio];
    gradient.addColorStop(0, cores.start);
    gradient.addColorStop(0.5, cores.middle);
    gradient.addColorStop(1, cores.end);
    return gradient;
  };

  const chartRefEdificios = useRef(null);

  useEffect(() => {
    if (ativo === "grafico" && dados.dia <= 270 && chartRefEdificios.current) {
      const ctx = chartRefEdificios.current.getContext("2d");

      const datasetsEdificios = ["terrenos", "lojasP", "lojasM", "lojasG"].map(
        (edificioSelecionado) => {
          const gradient = createGradientEdificios(ctx, edificioSelecionado);
          const cores = coresEdificiosGradiente[edificioSelecionado];

          return {
            label: edificioSelecionado.toUpperCase(),
            data: dados[edificioSelecionado]?.arrayFatu || [],
            borderColor: cores.end,
            backgroundColor: gradient,
            tension: 0.4,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: cores.end,
            pointHoverBorderColor: "#FFFFFF",
            pointHoverBorderWidth: 3,
            borderWidth: 3,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 20,
            shadowColor: cores.glow,
          };
        }
      );

      const configEdificios = {
        type: "line",
        data: {
          labels: dadosDia,
          datasets: datasetsEdificios,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: "index",
            intersect: false,
          },
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                color: "#FFFFFF",
                font: {
                  size: 12,
                  weight: "bold",
                  family: "Inter, system-ui, sans-serif",
                },
                padding: 15,
                usePointStyle: true,
                pointStyle: "circle",
              },
            },
            tooltip: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(10px)",
              titleColor: "#FFFFFF",
              bodyColor: "#C79FFF",
              borderColor: "rgba(255, 255, 255, 0.2)",
              borderWidth: 1,
              padding: 12,
              displayColors: true,
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || "";
                  if (label) {
                    label += ": ";
                  }
                  label +=
                    "R$ " +
                    context.parsed.y.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    });
                  return label;
                },
              },
            },
          },
          scales: {
            x: {
              display: true,
              stacked: true,
              grid: {
                display: true,
                color: "rgba(255, 255, 255, 0.1)",
                lineWidth: 1,
              },
              ticks: {
                color: "#C79FFF",
                font: {
                  size: 11,
                  weight: "500",
                },
              },
              border: {
                display: false,
              },
            },
            y: {
              display: true,
              stacked: true,
              position: "right",
              grid: {
                display: true,
                color: "rgba(255, 255, 255, 0.1)",
                lineWidth: 1,
              },
              ticks: {
                color: "#C79FFF",
                font: {
                  size: 11,
                  weight: "500",
                },
                callback: function (value) {
                  return "R$ " + formatarNumero(value);
                },
              },
              border: {
                display: false,
              },
            },
          },
          elements: {
            line: {
              borderJoinStyle: "round",
            },
          },
        },
      };

      if (window.chartInstanceEdificios) {
        window.chartInstanceEdificios.destroy();
      }
      window.chartInstanceEdificios = new ChartJS(ctx, configEdificios);
    }

    return () => {
      if (window.chartInstanceEdificios) {
        window.chartInstanceEdificios.destroy();
      }
    };
  }, [
    ativo,
    dados.dia,
    dados.terrenos,
    dados.lojasP,
    dados.lojasM,
    dados.lojasG,
  ]);

  const alterarEconomiaSetor = () => {
    atualizarDadosProf2([ativo, "economiaSetor", "estadoAtual"], "recessão");
  };

  // Pegando o setor ativo
  const setorAtivo = setores.find((setor) => setor.id === ativo);
  const setorInfo = setores.find((setor) => setor.id === setorAtivo);
  const setorCarteira = setores.find((setor) => setor.id === "carteira");
  const setorGerenciamento = setores.find(
    (setor) => setor.id === "gerenciamento"
  );


  // console.log("setorAtivo:", setorAtivo);
  // console.log("edificios:", dados[setorAtivo]?.edificios);
  // console.log("edificios length:", dados[setorAtivo]?.edificios?.length);
  // console.log("setorAtivo:", setorAtivo, "| dados keys:", Object.keys(dados));



  // Definindo as cores dinâmicas
  const corClasse = setorAtivo ? setorAtivo.corClasse : "bg-[#358Q973]";

  // Pegando os dados do setor ativo
  const setorDados = dados[ativo]; // Dados do setor ativo
  const licençaComprada = setorDados.licençaGlobal.comprado;
  const licenciaValor = setorDados.licençaGlobal.valor;

  // Dados do gráfico
  const licençasNecessárias = ["Silo", "Plantação De Legumes"];
  const arrayLicenseNece = licençasNecessárias;

  const dadosDia = dados.terrenos.arrayFatu.map((_, index) => index + 1);
  const dadosFatu = dados.faturamento.arrayFatuDiário.map(
    (_, index) => index + 1
  );
  const dadosDiaSetores =
    economiaSetores.agricultura.economiaSetor.ArrayFatuHistory.map(
      (_, index) => index + 270
    );

  const chartRefSetores = useRef(null);

  useEffect(() => {
    if (ativo === "grafico" && dados.dia > 270 && chartRefSetores.current) {
      const ctx = chartRefSetores.current.getContext("2d");

      // 🔥 MODIFICAÇÃO: Usar ArrayFatuMonth em vez de ArrayFatuHistory
      const datasetsSetores = [
        "agricultura",
        "tecnologia",
        "industria",
        "comercio",
        "imobiliario",
        "energia",
      ].map((setorSelecionado) => {
        const gradient = createGradient(ctx, setorSelecionado);
        const cores = coresSetoresGradiente[setorSelecionado];

        // 🔥 MUDANÇA AQUI: ArrayFatuMonth em vez de ArrayFatuHistory
        const dadosSetor = economiaSetores[setorSelecionado]?.economiaSetor?.ArrayFatuMonth || [];

        return {
          label: setorSelecionado.toUpperCase(),
          data: dadosSetor, // ✅ Agora usando ArrayFatuMonth
          borderColor: cores.end,
          backgroundColor: gradient,
          tension: 0.4,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: cores.end,
          pointHoverBorderColor: "#FFFFFF",
          pointHoverBorderWidth: 3,
          borderWidth: 3,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 20,
          shadowColor: cores.glow,
        };
      });
      const dadosSetor = economiaSetores.agricultura?.economiaSetor?.ArrayFatuMonth || [];

      // 🔥 MODIFICAÇÃO: Labels agora representam meses, não dias
      const labelsMeses = dadosSetor.map((_, index) => {
        const dia = (index + 1) * 30;
        return `Dia ${dia}`;
      });

      // Configuração do gráfico futurista
      const configSetores = {
        type: "line",
        data: {
          labels: labelsMeses, // ✅ Agora usando labels mensais
          datasets: datasetsSetores,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: "index",
            intersect: false,
          },
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                color: "#FFFFFF",
                font: {
                  size: 12,
                  weight: "bold",
                  family: "Inter, system-ui, sans-serif",
                },
                padding: 15,
                usePointStyle: true,
                pointStyle: "circle",
              },
            },
            tooltip: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(10px)",
              titleColor: "#FFFFFF",
              bodyColor: "#C79FFF",
              borderColor: "rgba(255, 255, 255, 0.2)",
              borderWidth: 1,
              padding: 12,
              displayColors: true,
              callbacks: {
                title: function (items) {
                  // Mostra o mês e o dia correspondente
                  const index = items[0].dataIndex;
                  const dia = (index + 1) * 30;
                  return `Mês ${index + 1} (Dia ${dia})`;
                },
                label: function (context) {
                  let label = context.dataset.label || "";
                  if (label) {
                    label += ": ";
                  }
                  label +=
                    "R$ " +
                    context.parsed.y.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    });
                  return label;
                },
              },
            },
          },
          scales: {
            x: {
              display: true,
              stacked: true,
              grid: {
                display: true,
                color: "rgba(255, 255, 255, 0.1)",
                lineWidth: 1,
              },
              ticks: {
                color: "#C79FFF",
                font: {
                  size: 11,
                  weight: "500",
                },
                // Mostra a cada 3 meses para não poluir
                stepSize: 3,
              },
              border: {
                display: false,
              },
            },
            y: {
              display: true,
              stacked: true,
              position: "right",
              grid: {
                display: true,
                color: "rgba(255, 255, 255, 0.1)",
                lineWidth: 1,
              },
              ticks: {
                color: "#C79FFF",
                font: {
                  size: 11,
                  weight: "500",
                },
                callback: function (value) {
                  return "R$ " + formatarNumero(value);
                },
              },
              border: {
                display: false,
              },
            },
          },
          elements: {
            line: {
              borderJoinStyle: "round",
            },
          },
        },
      };

      // Criar o gráfico
      if (window.chartInstanceSetores) {
        window.chartInstanceSetores.destroy();
      }
      window.chartInstanceSetores = new ChartJS(ctx, configSetores);
    }

    return () => {
      if (window.chartInstanceSetores) {
        window.chartInstanceSetores.destroy();
      }
    };
  }, [ativo, dados.dia, economiaSetores]);


  const cores = {
    terrenos: "#FF7F32 ",
    lojasP: "#6411D9",
    lojasM: "#F27405",
    lojasG: "#3A0E8C ",
  };

  const datasets = ["terrenos", "lojasP", "lojasM", "lojasG"].map(
    (edificioSelecionado) => ({
      label: edificioSelecionado,
      data: dados[edificioSelecionado]?.arrayFatu || [],
      borderColor: cores[edificioSelecionado]?.replace("0.5", "1") || "#000000",
      backgroundColor: cores[edificioSelecionado] || "#000000",
      tension: 0.4,
      fill: true,
      pointRadius: 0,
      pointHoverRadius: 5,
      pointBorderWidth: 1,
    })
  );

  const coresSetoresGradiente = {
    agricultura: {
      start: "#4CAF50",
      middle: "#66BB6A",
      end: "#81C784",
      glow: "rgba(76, 175, 80, 0.3)",
    },
    tecnologia: {
      start: "#FF6F00",
      middle: "#FF8C42",
      end: "#FFA726",
      glow: "rgba(255, 140, 66, 0.3)",
    },
    industria: {
      start: "#1A1A1A",
      middle: "#4D4D4D",
      end: "#808080",
      glow: "rgba(77, 77, 77, 0.3)",
    },
    comercio: {
      start: "#A31919",
      middle: "#E60000",
      end: "#FF4D4D",
      glow: "rgba(255, 77, 77, 0.3)",
    },
    imobiliario: {
      start: "#1A1A8C",
      middle: "#3333CC",
      end: "#6666FF",
      glow: "rgba(102, 102, 255, 0.3)",
    },
    energia: {
      start: "#A37F19",
      middle: "#E6B800",
      end: "#FFD966",
      glow: "rgba(255, 217, 102, 0.3)",
    },
  };

  const createGradient = (ctx, setor) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    const cores = coresSetoresGradiente[setor];
    gradient.addColorStop(0, cores.start);
    gradient.addColorStop(0.5, cores.middle);
    gradient.addColorStop(1, cores.end);
    return gradient;
  };

  // const datasetsSetores = ["agricultura", "tecnologia", "industria", "comercio", "imobiliario", "energia"].map(
  //   (setorSelecionado) => ({
  //     label: setorSelecionado,
  //     data: economiaSetores[setorSelecionado]?.economiaSetor.ArrayFatuHistory || [],
  //     borderColor: coresSetores[setorSelecionado]?.replace("0.5", "1") || "#000000",
  //     backgroundColor: coresSetores[setorSelecionado] || "#000000",
  //     tension: 0.4,
  //     fill: true,
  //     pointRadius: 0,
  //     pointHoverRadius: 5,
  //     pointBorderWidth: 1,
  //   })
  // );

  // const dataSetores = {
  //   labels: dadosDiaSetores,
  //   datasets: datasetsSetores,
  // };

  const data = {
    labels: dadosDia,
    datasets: datasets,
  };

  const coresSetores = {
    agricultura: "#4CAF50 ",
    tecnologia: "#D45A00",
    industria: "#4D4D4D",
    comercio: "#A31919 ",
    imobiliario: "#1A1A8C ",
    energia: "#A37F19 ",
  };

  const datasetsFinal = ["terrenos", "lojasP", "lojasM", "lojasG"].map(
    (edificioSelecionado) => ({
      label: edificioSelecionado,
      data: dados[edificioSelecionado]?.arrayFatu || [],
      borderColor: cores[edificioSelecionado]?.replace("0.5", "1") || "#000000",
      backgroundColor: cores[edificioSelecionado] || "#000000",
      tension: 0.4,
      fill: true,
      pointRadius: 0,
      pointHoverRadius: 5,
      pointBorderWidth: 1,
    })
  );

  const dataFinal = {
    labels: dadosDia,
    datasets: datasetsFinal,
  };

  const coresDespesasFatu = {
    despesas: "#FF7F32 ",
    faturamento: "#6411D9",
  };

  const despesasArrays = economiaSetores.imposto.arrayImpostoDiário || [];
  const faturamentoArrays = dados.faturamento.arrayFatuDiário || [];

  const arraysFinanceiros = {
    despesas: despesasArrays,
    faturamento: faturamentoArrays,
  };

  const datasetsDespesasFatu = ["despesas", "faturamento"].map(
    (categoriaFinanceira) => ({
      label: categoriaFinanceira,
      data: arraysFinanceiros[categoriaFinanceira] || [],
      borderColor:
        coresDespesasFatu[categoriaFinanceira]?.replace("0.5", "1") ||
        "#000000",
      backgroundColor: coresDespesasFatu[categoriaFinanceira] || "#000000",
      tension: 0.4,
      fill: true,
      pointRadius: 0,
      pointHoverRadius: 5,
      pointBorderWidth: 1,
    })
  );

  const dataDespesasFatu = {
    labels: dadosFatu,
    datasets: datasetsDespesasFatu,
  };

  const getImageUrl = (nomeArquivo) => `/imagens/${nomeArquivo}.png`;

  const dadosCarteiraEdificios = economiaSetores.centralEdificios;

  const LiberarLicença = () => {
    if (economiaSetores.saldo >= licenciaValor) {
      if (licençaComprada) {
        return alert("Licença já comprada.");
      } else {
        const novoSaldo = economiaSetores.saldo - licenciaValor;
        atualizarDados("saldo", novoSaldo);
        atualizarDadosProf2([ativo, "licençaGlobal", "comprado"], true);
        // Liberar licenças específicas
        arrayLicenseNece.forEach((licenca) => {
          const licençaIndex = dados[ativo].licençasSetor.findIndex(
            (l) => l.nome === licenca
          );
          if (licençaIndex !== -1) {
            atualizarDadosProf2(
              [ativo, "licençasSetor", licençaIndex, "status"],
              true
            );
          }
        });
        // alert("Licença comprada com sucesso!");
      }
    } else {
      alert("Saldo insuficiente para comprar a licença.");
    }
  };

  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          font: { size: 20, weight: "bold", family: "Inter" },
        },
        legend: {
          labels: { color: "white", font: { size: 14 } },
        },
      },
      scales: {
        x: {
          display: true,
          stacked: true,
          grid: { display: true },
          beginAtZero: false,
          ticks: { color: "white" },
        },
        y: {
          display: true,
          stacked: true,
          grid: { display: true },
          beginAtZero: true,
          ticks: { color: "white" },
        },
      },
      elements: {
        line: { fill: true },
      },
    },
  };



  const configDespesasFatu = {
    type: "line",
    data: dataDespesasFatu,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          font: { size: 20, weight: "bold", family: "Inter" },
        },
        legend: {
          labels: { color: "white", font: { size: 14 } },
        },
      },
      scales: {
        x: {
          display: true,
          stacked: true,
          grid: { display: true },
          beginAtZero: false,
          ticks: { color: "white" },
        },
        y: {
          display: true,
          stacked: true,
          grid: { display: true },
          beginAtZero: true,
          ticks: { color: "white" },
        },
      },
      elements: {
        line: { fill: true },
      },
    },
  };

  const configSetores = {
    type: "line",
    data: dataDespesasFatu,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          font: { size: 20, weight: "bold", family: "Inter" },
        },
        legend: {
          labels: { color: "white", font: { size: 14 } },
        },
      },
      scales: {
        x: {
          display: true,
          stacked: true,
          grid: { display: true },
          beginAtZero: false,
          ticks: { color: "white" },
        },
        y: {
          display: true,
          stacked: true,
          grid: { display: true },
          beginAtZero: true,
          ticks: { color: "white" },
        },
      },
      elements: {
        line: { fill: true },
      },
    },
  };


  const [licencaModal, setLicencaModal] = useState({ open: false, scrollToIndex: null });
  const [businessLicenceModal, setBusinessLicenceModal] = useState(false);

  const setorAtivoId = typeof dados.setorAtivo === 'object'
    ? dados.setorAtivo.id
    : dados.setorAtivo;

  const edificiosPorNome = useMemo(() => {
    // console.count("edificiosPorNome recriado"); // ← deve ser raro
    const mapa = {};
    ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"].forEach(setor => {
      if (!dados[setor]?.edificios) return;
      dados[setor].edificios.forEach(ed => {
        mapa[ed.nome] = { ...ed, setor };
      });
    });
    return mapa;
  }, [dados]);


  useEffect(() => {
    const sinal = dados.abrirModalLicencas;
    if (!sinal) return;
    if (sinal.setor !== ativo) {
      setAtivo(sinal.setor);
      atualizarDadosProf2(["setorAtivo"], sinal.setor);
    }
    setLicencaModal({ open: true, scrollToIndex: sinal.scrollToIndex });
  }, [dados.abrirModalLicencas?.timestamp]);

  useEffect(() => {
    if (!licencaModal.open) return;
    if (licencaModal.scrollToIndex === null || licencaModal.scrollToIndex === undefined) return;
    const timer = setTimeout(() => {
      const el = document.getElementById(`licenca-item-${licencaModal.scrollToIndex}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
    return () => clearTimeout(timer);
  }, [licencaModal.open, licencaModal.scrollToIndex]);






  {
    modalSell && (
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/90">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-[80vw] h-[80vh] bg-[#350973] rounded-[20px] relative flex flex-col items-center justify-around"
        >
          <h1 className="text-center text-white p-[10px] text-[50px] fonteBold">
            Fim
          </h1>

          <div className="w-[80%] h-[15px] bg-gradient-to-l from-laranja to-roxo rounded-[7px]"></div>

          <h2 className="text-center text-white opacity-80 text-[35px] fonteLight"></h2>

          <button
            className="absolute right-[20px] bottom-[20px] text-white bg-laranja px-[25px] py-[15px] rounded-[40px] fonteBold hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]"
            onClick={() => {
              setModalSell(false), buttonCloseAudio();
            }}
          >
            entendido
          </button>
        </motion.div>
      </div>
    );
  }

  if (vision === "dashboard") {
    return (
      <>
        <div
          className={`${corClasse} w-full h-full border-[#350973] rounded-[20px] flex justify-between`}
        >
          {/* Dashboard */}
          <div
            className={`h-full rounded-[0px] items-center justify-center transition-all rounded-[40px] duration-300 bg-[${setorAtivo.cor2
              }] ${dados.dia >= 270 ? "w-[calc(100%)]" : "w-[calc(100%)]"}`}
          >
            {/* Renderiza o conteúdo baseado no estado da licença */}
            {licençaComprada ? (
              // Container com licença comprada
              <div className="w-full h-full p-4 flex flex-col" style={{ minHeight: 0, overflow: "hidden" }}>
                {ativo === "grafico" && <TechTree />}

                {ativo === "teste" && (() => {
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

                  const dadosCarteiraEdificios = economiaSetores.centralEdificios;

                  const {
                    todosEdificios,
                    receitaMensalTotal,
                    impostosTotais,
                    lucroLiquido,
                    setoresAtivosSet,
                    edAtual,
                    tiposUnicos,
                    setoresComEdificios
                  } = processarCarteira(dados, economiaSetores, carteiraFiltroSetor, carteiraOrdem);

                  const edMax = dadosCarteiraEdificios.quantidadeEdificiosMax || 1;
                  const percCapacidade = Math.min((edAtual / edMax) * 100, 100);
                  const corBarra = percCapacidade >= 90 ? "#ff4d4d" : percCapacidade >= 70 ? "#FFD700" : "#7aff9a";

                  const btnBase = {
                    border: "none", borderRadius: 8, padding: "5px 12px", cursor: "pointer",
                    fontFamily: "'Rajdhani',sans-serif", fontSize: 11, fontWeight: 700,
                    letterSpacing: ".06em", transition: "all .15s", whiteSpace: "nowrap",
                  };
                  const btnAtivo = { ...btnBase, background: "rgba(255,255,255,.18)", color: "#fff" };
                  const btnInativo = { ...btnBase, background: "rgba(255,255,255,.06)", color: "rgba(255,255,255,.4)" };

                  return (
                    <div key={carteiraKey} className="flex-1 w-full rounded-[20px] flex flex-col gap-[10px]" style={{ minHeight: 0 }}>
                      <Tooltip style={tooltipStyle} id="tooltip-carteira" />

                      {/* ── HEADER ─────────────────────────────────────── */}
                      <div className="h-[50px] w-full flex gap-[10px] items-center">
                        <div style={{ backgroundColor: setorAtivo.cor3 }}
                          className="rounded-[20px] px-4 h-full fonteBold text-white flex items-center justify-center text-[20px] sombra shrink-0">
                          Carteira
                        </div>
                        <div style={{ backgroundColor: setorAtivo.cor3 }}
                          className="rounded-[20px] px-4 h-full fonteBold text-white flex items-center text-[15px] sombra shrink-0">
                          {dadosCarteiraEdificios.classificacaoPorteEmpresa}
                        </div>
                        <div className="w-full flex gap-[10px]" style={{ height: 44 }}>
                          {[
                            { icon: limitar, tip: "Limite por tipo", val: String(dadosCarteiraEdificios.quantidadeUnicoMax) },
                            { icon: setoresImg, tip: "Setores ativos", val: `${setoresComEdificios}/${dadosCarteiraEdificios.quantidadeSetoresMax}` },
                            { icon: diversidade, tip: "Tipos de edifícios", val: `${tiposUnicos}/${dadosCarteiraEdificios.quantidadeDiversosEdificiosMax}` },
                            { icon: soma, tip: "Total de edifícios", val: `${edAtual}/${dadosCarteiraEdificios.quantidadeEdificiosMax}` },
                          ].map(({ icon, tip, val }, i) => (
                            <div key={i} data-tooltip-id="tooltip-carteira" data-tooltip-html={tip}
                              style={{ backgroundColor: setorAtivo.cor3 }}
                              className="flex-1 rounded-[12px] h-full fonteBold text-white flex items-center justify-between sombra px-[4px]">
                              <div style={{ backgroundColor: setorAtivo.cor4 }} className="h-[80%] aspect-square rounded-[10px] flex items-center justify-center">
                                <img src={icon} className="h-[55%] aspect-square" />
                              </div>
                              <span className="text-white fonteBold text-[15px] mr-[8px]">{val}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* ── BARRA DE FILTROS E ORDENAÇÃO ───────────────── */}
                      <div style={{
                        display: "flex", alignItems: "center", gap: 8,
                        background: "rgba(0,0,0,.25)", border: "1px solid rgba(255,255,255,.07)",
                        borderRadius: 12, padding: "7px 12px", flexShrink: 0, flexWrap: "wrap",
                      }}>
                        <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".14em", color: "rgba(255,255,255,.3)", marginRight: 4 }}>
                          Ordenar
                        </span>
                        {[
                          { key: "setor", label: "Por setor" },
                          { key: "roi_desc", label: "ROI ↓" },
                          { key: "roi_asc", label: "ROI ↑" },
                          { key: "categoria", label: "Categoria" },
                          { key: "nome", label: "A–Z" },
                        ].map(({ key, label }) => (
                          <button key={key}
                            onClick={() => setCarteiraOrdem(key)}
                            style={carteiraOrdem === key ? btnAtivo : btnInativo}>
                            {label}
                          </button>
                        ))}

                        <div style={{ width: 1, height: 20, background: "rgba(255,255,255,.1)", margin: "0 4px" }} />
                        <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".14em", color: "rgba(255,255,255,.3)", marginRight: 4 }}>
                          Setor
                        </span>

                        {["todos", ...setoresArr].map(s => {
                          const sc = s !== "todos" ? setoresCores[s] : null;
                          const isAtivo = carteiraFiltroSetor === s;
                          const temCards = s === "todos" || setoresAtivosSet.has(s);
                          return (
                            <button key={s}
                              onClick={() => setCarteiraFiltroSetor(s)}
                              style={{
                                ...btnBase,
                                background: isAtivo ? (sc ? sc.cor3 : "rgba(255,255,255,.2)") : "rgba(255,255,255,.05)",
                                color: isAtivo ? "#fff" : temCards ? "rgba(255,255,255,.45)" : "rgba(255,255,255,.15)",
                                border: isAtivo && sc ? `1px solid ${sc.cor4}` : "1px solid transparent",
                                opacity: temCards ? 1 : 0.5,
                              }}>
                              {setoresNomes[s]}
                            </button>
                          );
                        })}


                        <span style={{ marginLeft: "auto", fontSize: 10, color: "rgba(255,255,255,.3)", fontFamily: "'Rajdhani',sans-serif" }}>
                          {todosEdificios.length} edifício{todosEdificios.length !== 1 ? "s" : ""}
                        </span>
                      </div>

                      {/* ── GRID DE CARDS ──────────────────────────────── */}
                      <div
                        style={{ background: `linear-gradient(135deg, ${setorAtivo.cor1} 0%, ${setorAtivo.cor4} 100%)` }}
                        className="flex-1 overflow-y-auto mt-0 scrollbar-custom rounded-[10px]"
                      >
                        {todosEdificios.length === 0 ? (
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 8, opacity: .4 }}>
                            <span style={{ fontSize: 22 }}>📭</span>
                            <span style={{ color: "#fff", fontSize: 13, fontFamily: "'Rajdhani',sans-serif" }}>
                              {carteiraFiltroSetor !== "todos" ? `Nenhum edifício em ${setoresNomes[carteiraFiltroSetor]}` : "Nenhum edifício na carteira ainda"}
                            </span>
                          </div>
                        ) : (
                          <div className="w-full gap-y-[20px] grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] h-[400px] pt-[20px] pl-[20px]">
                            {todosEdificios.map(({ ed, idx, setor, roi, categoria }) => {
                              const chave = `${setor}-${idx}`;
                              const estaSelecionado = cartasSelecionadas.some(item => item.chave === chave);
                              const limite = getLimiteSelecao();
                              const atingiuLimite = cartasSelecionadas.length >= limite && !estaSelecionado;

                              return (
                                <div key={`${setor}-${idx}`} style={{ position: "relative" }}>
                                  <div style={{
                                    position: "absolute", top: -8, right: 10, zIndex: 2,
                                    background: roi >= 10 ? "#1a4a1a" : roi >= 0 ? "#2a2a1a" : "#4a1a1a",
                                    border: `1px solid ${roi >= 10 ? "#7aff9a" : roi >= 0 ? "#FFD700" : "#ff9090"}`,
                                    borderRadius: 6, padding: "1px 8px", display: "flex", alignItems: "center", gap: 4,
                                  }}>
                                    <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 11, fontWeight: 800, color: roi >= 10 ? "#7aff9a" : roi >= 0 ? "#FFD700" : "#ff9090" }}>
                                      {roi >= 0 ? "+" : ""}{roi.toFixed(1)}%
                                    </span>
                                  </div>

                                  {/* Card */}
                                  <CardDraft index={idx} setor={setor} abrirModalSell={abrirModalSell} />

                                  {/* Botão de Seleção - abaixo do card */}
                                  <div style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "4px",
                                    marginBottom: "2px",
                                  }}>
                                    <button
                                      onClick={() => toggleSelecao(setor, idx, ed.nome)}
                                      style={{
                                        padding: "6px 12px",
                                        borderRadius: "6px",
                                        border: "none",
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
                                        border: estaSelecionado
                                          ? "1px solid #34d399"
                                          : "1px solid rgba(255,255,255,0.1)",
                                        transform: estaSelecionado ? "scale(1.02)" : "scale(1)",
                                        pointerEvents: atingiuLimite && !estaSelecionado ? "none" : "auto",
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
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* ── CONTADOR DE SELEÇÕES ── */}
                      <span style={{
                        marginLeft: "auto",
                        fontSize: 10,
                        color: "rgba(255,255,255,.3)",
                        fontFamily: "'Rajdhani',sans-serif",
                        marginRight: "12px",
                      }}>
                        {cartasSelecionadas.length}/{getLimiteSelecao()} selecionados
                      </span>
                      {modalSellOpen && (
                        <SellModal
                          setor={modalProps.setor}
                          nomeLicença={modalProps.nomeLicença}
                          index={modalProps.index}
                          onClose={() => setModalSellOpen(false)}
                        />
                      )}

                      {/* ── BARRA DE CAPACIDADE ────────────────────────── */}
                      <div style={{
                        background: "rgba(0,0,0,.3)", border: "1px solid rgba(255,255,255,.08)",
                        borderRadius: 10, padding: "8px 14px", flexShrink: 0,
                        display: "flex", alignItems: "center", gap: 12,
                      }}>
                        <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "rgba(255,255,255,.35)", whiteSpace: "nowrap" }}>
                          Capacidade
                        </span>
                        <div style={{ flex: 1, height: 7, background: "rgba(255,255,255,.08)", borderRadius: 4, overflow: "hidden" }}>
                          <div style={{
                            height: "100%", width: `${percCapacidade}%`,
                            background: corBarra, borderRadius: 4,
                            transition: "width .4s ease",
                            boxShadow: `0 0 8px ${corBarra}88`,
                          }} />
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.5)", whiteSpace: "nowrap" }}>
                          {edAtual} / {edMax} edifícios
                        </span>
                        {percCapacidade >= 80 && (
                          <button onClick={() => { setBusinessLicenceModal(true); buttonOpenAudio(); }}
                            style={{
                              background: "linear-gradient(135deg,#4C14A9,#6411D9)",
                              border: "none", borderRadius: 7, padding: "4px 12px",
                              fontFamily: "'Rajdhani',sans-serif", fontSize: 11, fontWeight: 700,
                              color: "#fff", cursor: "pointer", whiteSpace: "nowrap", letterSpacing: ".06em",
                            }}>
                            Evoluir empresa →
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })()}

                {ativo === "ecossistema" && (
                  <div className="w-full h-full">
                    <Techtree/>
                  </div>
                )}
                {ativo === "carteira" && (() => {
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

                  const dadosCarteiraEdificios = economiaSetores.centralEdificios;

                  const {
                    todosEdificios,
                    receitaMensalTotal,
                    impostosTotais,
                    lucroLiquido,
                    setoresAtivosSet,
                    edAtual,
                    tiposUnicos,
                    setoresComEdificios
                  } = processarCarteira(dados, economiaSetores, carteiraFiltroSetor, carteiraOrdem);

                  const edMax = dadosCarteiraEdificios.quantidadeEdificiosMax || 1;
                  const percCapacidade = Math.min((edAtual / edMax) * 100, 100);
                  const corBarra = percCapacidade >= 90 ? "#ff4d4d" : percCapacidade >= 70 ? "#FFD700" : "#7aff9a";

                  const btnBase = {
                    border: "none", borderRadius: 8, padding: "5px 12px", cursor: "pointer",
                    fontFamily: "'Rajdhani',sans-serif", fontSize: 11, fontWeight: 700,
                    letterSpacing: ".06em", transition: "all .15s", whiteSpace: "nowrap",
                  };
                  const btnAtivo = { ...btnBase, background: "rgba(255,255,255,.18)", color: "#fff" };
                  const btnInativo = { ...btnBase, background: "rgba(255,255,255,.06)", color: "rgba(255,255,255,.4)" };

                  return (
                    <div key={carteiraKey} className="flex-1 w-full rounded-[20px] flex flex-col gap-[10px]" style={{ minHeight: 0 }}>
                      <Tooltip style={tooltipStyle} id="tooltip-carteira" />

                      {/* ── BARRA DE FILTROS E ORDENAÇÃO ───────────────── */}
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        background: "rgba(0,0,0,.25)",
                        border: "1px solid rgba(255,255,255,.07)",
                        borderRadius: 12,
                        padding: "7px 12px",
                        flexShrink: 0,
                        flexWrap: "wrap",
                      }}>
                        {/* ── ORDENAR ── */}
                        <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
                          <span style={{
                            fontSize: 8,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: ".1em",
                            color: "rgba(255,255,255,.3)",
                            marginRight: 2
                          }}>
                            Ordenar
                          </span>
                          {[
                            { key: "setor", label: "Setor" },
                            { key: "roi_desc", label: "ROI ↓" },
                            { key: "roi_asc", label: "ROI ↑" },
                            { key: "fatu_desc", label: "Fatu ↓" },
                            { key: "fatu_asc", label: "Fatu ↑" },
                          ].map(({ key, label }) => (
                            <button key={key}
                              onClick={() => setCarteiraOrdem(key)}
                              style={{
                                ...btnBase,
                                padding: "3px 7px",
                                fontSize: 8,
                                background: carteiraOrdem === key ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.05)",
                                color: carteiraOrdem === key ? "#fff" : "rgba(255,255,255,.4)",
                              }}>
                              {label}
                            </button>
                          ))}
                        </div>

                        <div style={{
                          width: 1,
                          height: 20,
                          background: "rgba(255,255,255,.1)",
                          margin: "0 4px",
                          flexShrink: 0,
                        }} />

                        {/* ── QUANTIDADE ── */}
                        <div style={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
                          <span style={{
                            fontSize: 8,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: ".1em",
                            color: "rgba(255,255,255,.3)",
                            marginRight: 2
                          }}>
                            Qtd
                          </span>
                          {["todos", "1", "2", "3"].map(q => (
                            <button key={q}
                              onClick={() => setFiltroQuantidade(q)}
                              style={{
                                ...btnBase,
                                padding: "3px 7px",
                                fontSize: 8,
                                background: filtroQuantidade === q ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.05)",
                                color: filtroQuantidade === q ? "#fff" : "rgba(255,255,255,.4)",
                              }}>
                              {getLabelQuantidade(q)}
                            </button>
                          ))}
                        </div>

                        <div style={{
                          width: 1,
                          height: 20,
                          background: "rgba(255,255,255,.1)",
                          margin: "0 4px",
                          flexShrink: 0,
                        }} />

                        {/* ── SETOR ── */}
                        <div style={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap", flex: "1 1 auto" }}>
                          <span style={{
                            fontSize: 8,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: ".1em",
                            color: "rgba(255,255,255,.3)",
                            marginRight: 2
                          }}>
                            Setor
                          </span>
                          {["todos", ...setoresArr].map(s => {
                            const sc = s !== "todos" ? setoresCores[s] : null;
                            const isAtivo = carteiraFiltroSetor === s;
                            const temCards = s === "todos" || setoresAtivosSet.has(s);
                            return (
                              <button key={s}
                                onClick={() => setCarteiraFiltroSetor(s)}
                                style={{
                                  ...btnBase,
                                  padding: "3px 7px",
                                  fontSize: 8,
                                  background: isAtivo ? (sc ? sc.cor3 : "rgba(255,255,255,.2)") : "rgba(255,255,255,.05)",
                                  color: isAtivo ? "#fff" : temCards ? "rgba(255,255,255,.45)" : "rgba(255,255,255,.15)",
                                  opacity: temCards ? 1 : 0.5,
                                }}>
                                {setoresNomes[s].slice(0, 4)}
                              </button>
                            );
                          })}
                        </div>

                        <div style={{
                          width: 1,
                          height: 20,
                          background: "rgba(255,255,255,.1)",
                          margin: "0 4px",
                          flexShrink: 0,
                        }} />

                        {/* ── SELEÇÃO ── */}
                        <div style={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
                          <button
                            onClick={() => setFiltroSelecionados(!filtroSelecionados)}
                            style={{
                              ...btnBase,
                              padding: "3px 8px",
                              fontSize: 8,
                              background: filtroSelecionados ? "rgba(52, 211, 153, .2)" : "rgba(255,255,255,.05)",
                              color: filtroSelecionados ? "#34d399" : "rgba(255,255,255,.4)",
                              border: filtroSelecionados ? "1px solid #34d399" : "1px solid transparent",
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}>
                            <span style={{ fontSize: 10 }}>⭐</span>
                            {filtroSelecionados ? "Sel." : "Todos"}
                          </button>

                          {cartasSelecionadas.length > 0 && (
                            <button
                              onClick={limparSelecoes}
                              style={{
                                ...btnBase,
                                padding: "3px 6px",
                                fontSize: 8,
                                background: "rgba(255,77,77,.15)",
                                color: "#ff4d4d",
                                border: "1px solid rgba(255,77,77,.2)",
                              }}>
                              ✕
                            </button>
                          )}
                        </div>

                        {/* ── CONTADORES ── */}
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          marginLeft: "auto",
                          flexWrap: "wrap",
                        }}>
                          <div style={{
                            display: "flex",
                            gap: 6,
                            flexWrap: "wrap",
                            marginLeft: "auto",
                            flex: "0 1 auto",
                          }}>
                            {[
                              { icon: setoresImg, tip: "Setores ativos", val: `${setoresComEdificios}` },
                              { icon: soma, tip: "Total de edifícios", val: `${edAtual}` },
                            ].map(({ icon, tip, val }, i) => (
                              <div
                                key={i}
                                data-tooltip-id="tooltip-carteira"
                                data-tooltip-html={tip}
                                style={{
                                  backgroundColor: setorAtivo.cor3,
                                  minWidth: "50px",
                                  flex: "0 1 auto",
                                }}
                                className="rounded-[8px] h-[28px] fonteBold text-white flex items-center justify-between sombra px-[4px]"
                              >
                                <div style={{
                                  backgroundColor: setorAtivo.cor4,
                                  width: "20px",
                                  height: "20px",
                                  minWidth: "16px",
                                }}
                                  className="rounded-[6px] flex items-center justify-center">
                                  <img
                                    src={icon}
                                    className="h-[50%] aspect-square"
                                    style={{ minWidth: "8px" }}
                                  />
                                </div>
                                <span className="text-white fonteBold text-[11px] ml-[3px]">{val}</span>
                              </div>
                            ))}
                          </div>

                          {/* ── SEPARADOR ── */}
                          <div style={{
                            width: 1,
                            height: 20,
                            background: "rgba(255,255,255,.1)",
                            margin: "0 4px",
                            flexShrink: 0,
                          }} />
                          <div className="flex items-center justify-between gap-4 px-2">
                            <SlotDisplay />
                            {verificarSlots().estaAcimaDoLimite && (
                              <button
                                onClick={async () => {
                                  const confirmar = confirm("⚠️ Você está com cartas excedentes! Deseja liquidar automaticamente as cartas com pior desempenho?");
                                  if (confirmar) {
                                    await executarLiquidacaoAutomatica(dados, atualizarDadosProf2, economiaSetores, atualizarEco);
                                    setCarteiraKey(prev => prev + 1);
                                  }
                                }}
                                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all"
                              >
                                🗑️ Liquidar Excedentes
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* ── GRID DE CARDS ──────────────────────────────── */}
                      <div
                        style={{ background: `linear-gradient(135deg, ${setorAtivo.cor1} 0%, ${setorAtivo.cor4} 100%)` }}
                        className="flex-1 overflow-y-auto mt-0 scrollbar-custom rounded-[10px]"
                      >
                        {todosEdificios.length === 0 ? (
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 8, opacity: .4 }}>
                            <span style={{ fontSize: 22 }}>📭</span>
                            <span style={{ color: "#fff", fontSize: 13, fontFamily: "'Rajdhani',sans-serif" }}>
                              {carteiraFiltroSetor !== "todos" ? `Nenhum edifício em ${setoresNomes[carteiraFiltroSetor]}` : "Nenhum edifício na carteira ainda"}
                            </span>
                          </div>
                        ) : (
                          <div className="w-full gap-y-[20px] grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] h-[400px] pt-[20px] pl-[20px]">
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
                              .map(({ ed, idx, setor, roi, categoria }) => {
                                const chave = `${setor}-${idx}`;
                                const estaSelecionado = cartasSelecionadas.some(item => item.chave === chave);
                                const limite = getLimiteSelecao();
                                const atingiuLimite = cartasSelecionadas.length >= limite && !estaSelecionado;
                                const quantidade = getQuantidadeEdificio(ed);

                                // 🔥 REGRA: Se quantidade > 3, mostra alerta
                                const excedeLimite = quantidade > 3;

                                return (
                                  <div key={`${setor}-${idx}`} style={{ position: "relative" }}>
                                    <div style={{
                                      position: "absolute", top: -8, right: 10, zIndex: 2,
                                      background: roi >= 10 ? "#1a4a1a" : roi >= 0 ? "#2a2a1a" : "#4a1a1a",
                                      border: `1px solid ${roi >= 10 ? "#7aff9a" : roi >= 0 ? "#FFD700" : "#ff9090"}`,
                                      borderRadius: 6, padding: "1px 8px", display: "flex", alignItems: "center", gap: 4,
                                    }}>
                                      <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 11, fontWeight: 800, color: roi >= 10 ? "#7aff9a" : roi >= 0 ? "#FFD700" : "#ff9090" }}>
                                        {roi >= 0 ? "+" : ""}{roi.toFixed(1)}%
                                      </span>
                                    </div>

                                    {/* Badge de quantidade excedente */}
                                    {excedeLimite && (
                                      <div style={{
                                        position: "absolute", top: -8, left: 10, zIndex: 2,
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

                                    {/* Card */}
                                    <CardDraft index={idx} setor={setor} abrirModalSell={abrirModalSell} />

                                    {/* Botão de Seleção */}
                                    <div style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      marginTop: "4px",
                                      marginBottom: "2px",
                                    }}>
                                      <button
                                        className="w-[90%] mt-2 mb-4"
                                        onClick={() => toggleSelecao(setor, idx, ed.nome)}
                                        style={{
                                          padding: "3px 12px",
                                          borderRadius: "6px",
                                          border: "none",
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
                                          border: estaSelecionado
                                            ? "1px solid #34d399"
                                            : "1px solid rgba(255,255,255,0.1)",
                                          transform: estaSelecionado ? "scale(1.02)" : "scale(1)",
                                          pointerEvents: atingiuLimite && !estaSelecionado ? "none" : "auto",
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
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        )}
                      </div>
                      {modalSellOpen && (
                        <SellModal
                          setor={modalProps.setor}
                          nomeLicença={modalProps.nomeLicença}
                          index={modalProps.index}
                          onClose={() => setModalSellOpen(false)}
                        />
                      )}
                    </div>
                  );
                })()}
              </div>
            ) : (
              // Container sem licença comprada
              <div className="w-full h-full flex flex-col items-center justify-center p-4">
                <div
                  className="p-4 rounded-[30px] w-[90%] h-[90%] flex flex-col self-center items-center justify-between"
                  style={{ backgroundColor: setorAtivo.cor2 }}
                >
                  <div
                    className="w-[90%] text-center rounded-[10px]"
                    style={{ backgroundColor: setorAtivo.cor3 }}
                  >
                    <h1 className="text-white text-3xl fonteBold text-[40px]">
                      Licença Global de {ativo}{" "}
                    </h1>
                  </div>
                  <p className="text-white p-[40px]">{setorAtivo.descLicença}</p>
                  <div className="flex justify-center gap-[20px] w-full ">
                    <div
                      className="text-white flex items-center justify-around w-[20%] rounded-[10px]"
                      style={{ backgroundColor: setorAtivo.cor1 }}
                    >
                      <img className="w-[20px]" src={DolarImg} />
                      <h1 className="fonteBold">{licenciaValor}</h1>
                    </div>
                    <div className="w-[20%]">
                      <button
                        onClick={LiberarLicença}
                        className="bg-[#350973] text-white fonteBold w-full rounded-[10px] h-[40px]"
                      >
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 🔥 MODAL DE CONCLUSÃO - FORA DO DASHBOARD E FORA DE QUALQUER BLOCO CONDICIONAL */}
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

                  {/* Grid de estatísticas */}
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

                  {/* Botão único para encerrar */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={fecharModalConclusao}
                    className="w-full max-w-[300px] bg-gradient-to-r from-[#F27405] to-[#FF8C00] text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
                  >
                    Encerrar Jogo
                  </motion.button>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </>
    );
  }
  if (vision === "mapa") {
    return (
      <div className="w-full h-full border-[#350973] rounded-[20px] flex">

        <MapWorld />
      </div>
    )
  }

  if (vision === "outro") {
    return (
      <div className="w-full h-full border-[#350973] rounded-[20px] flex">
        <div className="w-full flex-1 p-4 flex flex-col">
          <div className="flex-1 w-full rounded-[20px] flex flex-col">
            <motion.div
              animate={controls}
              initial={{
                background:
                  "linear-gradient(to top, #fbb034, #ffdd00, #ffeeee)",
              }}
              className="gradiente w-full flex-1 rounded-[20px] flex justify-center items-center relative overflow-hidden"
            >
              {/* Terreno */}
              <img
                src={solo}
                alt="Terreno"
                className="w-[700px] h-[600px] top-[100px] relative z-[1]"
              />

              {/* Prédio */}
              <div className="absolute bottom-[-100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5]">
                <img
                  src={buildBusiness}
                  alt="Prédio"
                  className="w-[400px] h-auto"
                />
              </div>

              {/* Camada de luz */}
              <motion.div
                animate={controls}
                initial={{ background: gradientes[0] }}
                className="absolute inset-0 z-[15] opacity-[30%] pointer-events-none mix-blend-soft-light"
              />

              {/* Container dos botões no canto inferior direito */}
              <div className="absolute top-4 left-4 z-[5] flex flex-col gap-2">
                {/* Botão do Computador */}
                <button
                  onClick={() => {
                    abrirBanco(), buttonOpenAudio();
                  }}
                  data-tooltip-id="saldo-tip"
                  data-tooltip-content="Abrir Bancos"
                  className="w-[100px] h-[100px] bg-laranja rounded-[15px] flex items-center justify-center hover:bg-[#E56100] active:scale-95 hover:scale-[1.05] transition-transform"
                >
                  <img
                    className="w-[70px] h-[70px]"
                    src={bank}
                    alt="Abrir Bancos"
                  />
                </button>
              </div>
              <div className="absolute top-4 right-4 z-[5] flex flex-col gap-2">
                {/* Botão do Computador */}
                <button
                  onClick={() => {
                    setBusinessLicenceModal(true);
                    buttonOpenAudio();
                  }}
                  data-tooltip-id="saldo-tip"
                  data-tooltip-content="Abrir Licenças Empresariais"
                  className="w-[100px] h-[100px] bg-laranja rounded-[15px] flex items-center justify-center hover:bg-[#E56100] active:scale-95 hover:scale-[1.05] transition-transform"
                >
                  <img
                    className="w-[70px] h-[70px]"
                    src={licença}
                    alt="Abrir dashboard"
                  />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }
  if (vision === "bank") {
    return (
      <div className="w-full h-full border-[#350973] rounded-[20px] flex">
        <BankDetailsInterface />
      </div>
    );
  }
  if (vision === "bankInterface") {
    return (
      <div className="w-full h-full border-[#350973] rounded-[20px] flex">
        <BankInterface />
      </div>
    );
  }
  if (vision === "licençaEmpre") {
    return (
      <div className="w-full h-full border-[#350973] rounded-[20px] flex">
        <BusinessLicence setor={"carteira"} />
      </div>
    );
  }
  if (vision === "financas") {
    return (
      <div className="w-full h-full border-[#350973] rounded-[20px] flex">
        <CorporateFinanceInterface />
      </div>
    );
  }
}