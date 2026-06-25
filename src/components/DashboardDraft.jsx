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

// 🔥 RANKS DOS EDIFÍCIOS
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
  "Fábrica De Consoles De Jogos", "Fábrica De Dispositivos Vestiveis",
  "Centro De Pesquisa Em Fusão Nuclear", "Centro De Pesquisa Aeroespacial",
  "Centro De Pesquisa Em Materiais Avançados", "Centro De Pesquisa Em IA",
  "Mineradora De Pedras Preciosas", "Mega Mercado", "Prédio De Alto Padrão",
  "Tanque De Armazenamento Biocombustível", "Fábrica De Plásticos",
  "Fábrica De Químicos Especializados", "Alto-Forno", "Usina Siderúrgica",
  "Fundição De Alumínio", "Fábrica De Ligas Metálicas", "Fábrica De Peças Automotivas",
  "Refinaria De Biocombustíveis", "Biofábrica", "Fábrica De Eletrônicos",
  "Empresa De Automação Industrial", "Estaleiro"
];

const RankB = [
  "Centro De Comércio De Plantações", "Empresa De Comercio Energético",
  "Empresa De Consultoria Energética", "Centro De Pesquisa Em Energias Renováveis",
  "Centro De Pesquisa Energética", "Usina Termelétrica A Biocombustíveis",
  "Usina De Biomassa", "Usina Termolétrica", "Joalheria", "Concessionária De Veículos",
  "Centro De Distribuição", "Armazém Logístico", "Servidor Em Nuvem", "Data Center",
  "Empresa De Desenvolvimento De Software", "Empresa De Jogos Digitais",
  "Empresa De Telecomunicações", "Plataforma De Redes Sociais", "Marketplace Online",
  "Instituto De Tecnologia Alimentar", "Centro De Pesquisa Agrícola",
  "Instituto De Biotecnologia", "Laboratório De Nanotecnologia",
  "Centro De Pesquisa Em Eletrônicos", "Laboratório De Design De Produtos",
  "Laboratório De Novos Combustíveis", "Centro De Engenharia Avançada",
  "Centro De Pesquisa Em Robótica", "Construtora", "Imobiliária Residencial",
  "Imobiliária Comercial", "Mineradora", "Centro De Coleta De Biomassa",
  "Fábrica De Fertilizante", "Fábrica De Medicamentos", "Laboratório Farmacêutico",
  "Fábrica De Plásticos", "Alto-Forno", "Indústria De Componentes Mecânicos",
  "Fábrica De Chapas Metálicas", "Fábrica De Estruturas Metálicas",
  "Fábrica De Peças Automotivas", "Fábrica De Placas Eletrônicas", "Fábrica De Eletrônicos"
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
  "Loja De Conveniência", "Posto De Combustíveis", "Redes De Fast-food", "Petshop",
  "Farmácia", "Cafeteria", "Loja De Departamentos", "Loja De Calçados",
  "Loja De Vestuário", "Loja De Gadgets E Wearables", "Loja De Games",
  "Loja De Celulares", "Loja De Informática", "Loja De Eletrônicos",
  "Centro De Transporte E Entrega", "Startup", "Centro De Pesquisa Química",
  "Cartório E Licenças", "Terraplanagem E Pavimentação", "Construtora De Pequenas Obras",
  "Escritório De Design De Interiores", "Escritório De Arquitetura",
  "Consultoria Em Engenharia Civil", "Fábrica De Móveis", "Fábrica De Ração",
  "Fábrica De Embalagem", "Fábrica De Bebidas", "Fábrica De Pães", "Fábrica Textil",
  "Fábrica De Calçados", "Fábrica De Roupas", "Fábrica De Celulose",
  "Fábrica De Papel", "Fábrica De Livros"
];

// 🔥 FUNÇÃO PARA OBTER O RANK DE UM EDIFÍCIO
const getRankDoEdificio = (nomeEdificio) => {
  if (RankS.includes(nomeEdificio)) return { rank: "S", cor: "#FFD700", label: "S", ordem: 1 };
  if (RankA.includes(nomeEdificio)) return { rank: "A", cor: "#C0C0C0", label: "A", ordem: 2 };
  if (RankB.includes(nomeEdificio)) return { rank: "B", cor: "#CD7F32", label: "B", ordem: 3 };
  if (RankC.includes(nomeEdificio)) return { rank: "C", cor: "#8B8B8B", label: "C", ordem: 4 };
  return { rank: "C", cor: "#8B8B8B", label: "C", ordem: 4 };
};

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

const calcularValorTotalEdificio = (ed, dados) => {
  if (!ed) return 0;

  const mapaEdificios = criarMapaEdificios(dados);
  const calcularCustoRecurso = criarCalculadoraCustoRecurso(mapaEdificios, dados);

  // Custo base do edifício
  const custoBase = ed.custoConstrucao || 0;

  // Lojas necessárias
  const tNec = ed.lojasNecessarias?.terrenos || 0;
  const pNec = ed.lojasNecessarias?.lojasP || 0;
  const mNec = ed.lojasNecessarias?.lojasM || 0;
  const gNec = ed.lojasNecessarias?.lojasG || 0;

  let custoLojas = 0;
  if (tNec > 0) {
    custoLojas += tNec * (dados.terrenos?.preçoConstrução || 0);
  }
  if (pNec > 0) {
    custoLojas += pNec * ((dados.lojasP?.preçoConstrução || 0) + (dados.lojasP?.quantidadeNecTerreno || 0) * (dados.terrenos?.preçoConstrução || 0));
  }
  if (mNec > 0) {
    custoLojas += mNec * ((dados.lojasM?.preçoConstrução || 0) + (dados.lojasM?.quantidadeNecTerreno || 0) * (dados.terrenos?.preçoConstrução || 0));
  }
  if (gNec > 0) {
    custoLojas += gNec * ((dados.lojasG?.preçoConstrução || 0) + (dados.lojasG?.quantidadeNecTerreno || 0) * (dados.terrenos?.preçoConstrução || 0));
  }

  // Recursos de construção
  let custoRecursos = 0;
  if (Array.isArray(ed.recursoDeConstrução)) {
    ed.recursoDeConstrução.forEach(nome => {
      custoRecursos += calcularCustoRecurso(nome);
    });
  }

  // Valor total = custo base + lojas + recursos
  const valorTotal = custoBase + custoLojas + custoRecursos;

  return valorTotal;
};

const calcularLucroLiquido = (ed, dados, economiaSetor) => {
  if (!ed || ed.quantidade <= 0) return 0;

  try {
    const fatorEconomico = FATOR_ECONOMIA[economiaSetor] || 1;
    const quantidade = ed.quantidade || 0;

    // Power-ups
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

    // Valores base
    const faturamentoUnitario = ed?.finanças?.faturamentoUnitário || 0;
    const impostoFixo = ed?.finanças?.impostoFixo || 0;
    const impostoFatu = ed?.finanças?.impostoSobreFatu || 0;

    // Aplica power-ups
    const faturamentoFinal = faturamentoUnitario * (1 + aumFatu / 100) * fatorEconomico;
    const impostoFixoFinal = impostoFixo * (1 - redCusto / 100);
    const impostoFatuFinal = impostoFatu * (1 - redCusto / 100);

    // Cálculo mensal
    const faturamentoMensal = faturamentoFinal * 30 * quantidade;
    const impostoFaturamento = faturamentoMensal * impostoFatuFinal;
    const impostoFixoTotal = impostoFixoFinal * quantidade;

    // Lucro líquido = faturamento - impostos
    const lucro = faturamentoMensal - impostoFaturamento - impostoFixoTotal;

    return lucro;

  } catch (err) {
    console.error("Erro no calcularLucroLiquido:", err);
    return 0;
  }
};

const calcROI = (ed, dados, economiaSetor, mapaEdificios, calcularCustoRecurso) => {
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

    // Usa a função de valor total
    const custoTotal = calcularValorTotalEdificio(ed, dados);

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

    const economiaSetor = economiaSetores[setor]?.economiaSetor?.estadoAtual || 'estável';

    const resultado = calcROI(ed, dados, economiaSetor, mapaEdificios, calcularCustoRecurso);
    cacheROI.set(chave, resultado);
    return resultado;
  };

  let todosEdificios = [];
  setoresArr.forEach(s => {
    dados[s]?.edificios?.forEach((ed, idx) => {
      if (ed.quantidade > 0) {
        const rankInfo = getRankDoEdificio(ed.nome);
        const economiaSetor = economiaSetores[s]?.economiaSetor?.estadoAtual || 'estável';
        const lucroLiquido = calcularLucroLiquido(ed, dados, economiaSetor);
        const valorTotal = calcularValorTotalEdificio(ed, dados) * ed.quantidade;

        // 🔥 CALCULA OS POWER-UPS AQUI
        const quantidade = ed.quantidade || 0;
        const qtdMin2 = ed?.powerUp?.nível2?.quantidadeMínima ?? Infinity;
        const qtdMin3 = ed?.powerUp?.nível3?.quantidadeMínima ?? Infinity;
        const nivelPU = quantidade >= qtdMin3 ? "powerUpNv3"
          : quantidade >= qtdMin2 ? "powerUpNv2"
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

        // 🔥 FATURAMENTO - independente do fator econômico (apenas para ordenação)
        const faturamento = (ed.finanças?.faturamentoUnitário || 0) * 30 * ed.quantidade;

        // 🔥 TOTAL DE POWER-UPS
        const totalPowerUp = (aumFatu || 0) + (redCusto || 0);

        todosEdificios.push({
          ed,
          idx,
          setor: s,
          roi: calcularROI(ed, s),
          categoria: getCategoria(ed.nome),
          rank: rankInfo,
          lucroLiquido: lucroLiquido,
          valor: valorTotal,
          faturamento: faturamento,
          totalPowerUp: totalPowerUp,
          // 🔥 GUARDA OS VALORES INDIVIDUAIS PARA USO FUTURO
          aumFatu: aumFatu,
          redCusto: redCusto
        });
      }
    });
  });

  if (carteiraFiltroSetor !== "todos") {
    todosEdificios = todosEdificios.filter(e => e.setor === carteiraFiltroSetor);
  }

  // 🔥 ORDENAÇÕES - CORRIGIDAS
  if (carteiraOrdem === "roi_desc") todosEdificios.sort((a, b) => b.roi - a.roi);
  else if (carteiraOrdem === "roi_asc") todosEdificios.sort((a, b) => a.roi - b.roi);
  else if (carteiraOrdem === "lucro_desc") todosEdificios.sort((a, b) => b.lucroLiquido - a.lucroLiquido);
  else if (carteiraOrdem === "lucro_asc") todosEdificios.sort((a, b) => a.lucroLiquido - b.lucroLiquido);
  else if (carteiraOrdem === "valor_desc") todosEdificios.sort((a, b) => b.valor - a.valor);
  else if (carteiraOrdem === "valor_asc") todosEdificios.sort((a, b) => a.valor - b.valor);
  else if (carteiraOrdem === "setor") todosEdificios.sort((a, b) => a.setor.localeCompare(b.setor));
  else if (carteiraOrdem === "nome") todosEdificios.sort((a, b) => a.ed.nome.localeCompare(b.ed.nome));
  else if (carteiraOrdem === "categoria") todosEdificios.sort((a, b) => a.categoria.localeCompare(b.categoria));
  else if (carteiraOrdem === "rank_desc") todosEdificios.sort((a, b) => a.rank.ordem - b.rank.ordem);
  else if (carteiraOrdem === "rank_asc") todosEdificios.sort((a, b) => b.rank.ordem - a.rank.ordem);
  // 🔥 NOVAS ORDENAÇÕES - AGORA FUNCIONANDO
  else if (carteiraOrdem === "fatu_desc") todosEdificios.sort((a, b) => b.faturamento - a.faturamento);
  else if (carteiraOrdem === "fatu_asc") todosEdificios.sort((a, b) => a.faturamento - b.faturamento);
  else if (carteiraOrdem === "powerup_desc") todosEdificios.sort((a, b) => b.totalPowerUp - a.totalPowerUp);
  else if (carteiraOrdem === "powerup_asc") todosEdificios.sort((a, b) => a.totalPowerUp - b.totalPowerUp);
  // 🔥 ORDENAÇÃO POR QUANTIDADE (para o filtro)
  else if (carteiraOrdem === "qtd_desc") todosEdificios.sort((a, b) => b.ed.quantidade - a.ed.quantidade);
  else if (carteiraOrdem === "qtd_asc") todosEdificios.sort((a, b) => a.ed.quantidade - b.ed.quantidade);

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

  // 🔥 CALCULA O LIMITE ATUAL E EXCEDENTE
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
};

export default function DashboardDraft() {
  const { dados, atualizarDadosProf2, atualizarDados } = useContext(CentraldeDadosContext);
  const { economiaSetores, setEconomiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);
  const [ativo, setAtivo] = useState("carteira");
  const [carteiraOrdem, setCarteiraOrdem] = useState("setor");
  const [carteiraFiltroSetor, setCarteiraFiltroSetor] = useState("todos");
  const [carteiraKey, setCarteiraKey] = useState(0);
  const [modalConclusao, setModalConclusao] = useState(false);
  const [cartasParaVender, setCartasParaVender] = useState([]);
  const [modoVendaRapida, setModoVendaRapida] = useState(false);

  const verificarSlots = useSlotVerification();

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
  const verificarAcao = useSlotVerification();

  const snapshotDados = JSON.stringify(
    ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"].map(s =>
      (dados[s]?.edificios || []).map(ed => ({ nome: ed.nome, q: ed.quantidade }))
    )
  );

  const [cartasSelecionadas, setCartasSelecionadas] = useState([]);
  const [filtroQuantidade, setFiltroQuantidade] = useState("todos");
  const [filtroSelecionados, setFiltroSelecionados] = useState(false);

  const getLimiteSelecao = useCallback(() => {
    const dia = dados.dia || 0;
    if (dia > 300) return 20;
    if (dia > 270) return 16;
    if (dia > 180) return 12;
    if (dia > 90) return 8;
    return 5;
  }, [dados.dia]);

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
    const patrimonioHistoricoTotal = setoresArr.reduce((total, setor) => {
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

  useEffect(() => {
    if (dados.dia >= 360 && !modalConclusao) {
      setModalConclusao(true);
    }
  }, [dados.dia, modalConclusao]);

  const fecharModalConclusao = useCallback(() => {
    setModalConclusao(false);
  }, []);

  // 🔥 FUNÇÃO PARA ALTERNAR SELEÇÃO DE CARTA PARA VENDA RÁPIDA
  const toggleSelecaoVenda = useCallback((setor, index, nomeEdificio) => {
    const chave = `${setor}-${index}`;
    setCartasParaVender(prev => {
      const jaSelecionado = prev.some(item => item.chave === chave);
      if (jaSelecionado) {
        return prev.filter(item => item.chave !== chave);
      } else {
        return [...prev, { chave, setor, index, nome: nomeEdificio }];
      }
    });
  }, []);

  // 🔥 FUNÇÃO PARA EXECUTAR VENDA RÁPIDA
  // 🔥 FUNÇÃO PARA EXECUTAR VENDA RÁPIDA - SEM ALERTS
  const executarVendaRapida = useCallback(async () => {
    if (cartasParaVender.length === 0) return;

    let totalRecebido = 0;
    let vendidos = [];

    for (const item of cartasParaVender) {
      const edificio = dados[item.setor]?.edificios?.[item.index];
      if (!edificio || edificio.quantidade <= 0) continue;

      const valorVenda = (edificio.custoConstrucao || 0) * 0.7 * edificio.quantidade;
      totalRecebido += valorVenda;

      vendidos.push({
        nome: edificio.nome,
        quantidade: edificio.quantidade,
        valor: valorVenda
      });

      const path = [item.setor, "edificios", item.index, "quantidade"];
      await atualizarDadosProf2(path, 0);
    }

    const saldoAtual = economiaSetores.saldo || 0;
    await atualizarEco("saldo", saldoAtual + totalRecebido);

    setCartasParaVender([]);
    setModoVendaRapida(false);
    setCarteiraKey(prev => prev + 1);

    // Mostra um toast ou notificação rápida
    console.log(`✅ Venda rápida: ${vendidos.length} itens, R$ ${totalRecebido.toFixed(2)}`);
  }, [cartasParaVender, dados, atualizarDadosProf2, atualizarEco, economiaSetores.saldo]);


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

  useEffect(() => {
    if (dados.cartasSelecionadas) {
      setCartasSelecionadas(dados.cartasSelecionadas);
    }
  }, [dados.cartasSelecionadas]);

  const limparSelecoes = useCallback(() => {
    setCartasSelecionadas([]);
    atualizarDados("cartasSelecionadas", []);
  }, [atualizarDados]);

  const getQuantidadeEdificio = (ed) => {
    return ed.quantidade || 0;
  };

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

  const getLabelQuantidade = (filtro) => {
    switch (filtro) {
      case "1": return "1";
      case "2": return "2";
      case "3": return "3";
      default: return "Todos";
    }
  };

  useEffect(() => {
    if (ativo === "carteira") {
      setCarteiraKey(prev => prev + 1);
    }
  }, [snapshotDados]);

  const [modalSell, setModalSell] = useState(false);
  const patrimonioTotal = economiaSetores.patrimonio;
  const vision = dados.vision.visionAtual;
  const [changeAudio] = useSound(changeSectoryAudio);
  const [buttonCloseAudio] = useSound(closeAudio);
  const [buttonOpenAudio] = useSound(openAudio);
  const [buttonWalletOpenAudio] = useSound(walletOpenAudio);
  const [selecionarButton] = useSound(audioSel);

  const setVision = (newVision) => {
    atualizarDados("vision", {
      ...dados.vision,
      visionAtual: newVision,
    });
  };
  const abrirMapa = () => setVision("mapa");
  const abrirBanco = () => setVision("bank");

  const [modalSellOpen, setModalSellOpen] = useState(false);
  const [modalProps, setModalProps] = useState({
    setor: "",
    nomeLicença: "",
    index: 0,
  });

  useEffect(() => {
    if (ativo === "carteira") {
      const novosDados = processarCarteira(dados, economiaSetores, carteiraFiltroSetor, carteiraOrdem);
      setCarteiraDados(novosDados);
    }
  }, [dados, economiaSetores, carteiraFiltroSetor, carteiraOrdem, ativo]);

  const abrirModalSell = (setor, index) => {
    setModalProps({ setor, index });
    setModalSellOpen(true);
  };

  const controls = useAnimation();

  const gradientes = [
    "linear-gradient(to top, #ff9966, #ff5e62, #2c3e50)",
    "linear-gradient(to top, #141e30, #243b55, #0f2027)",
    "linear-gradient(to top, #0f2027, #203a43, #2c5364)",
    "linear-gradient(to top, #2c5364, #203a43, #fbb034)",
    "linear-gradient(to top, #fbb034, #ffdd00, #ffeeee)",
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
    if (num >= 1e12) return (num / 1e12).toFixed(1).replace(".0", "") + "T";
    if (num >= 1e9) return (num / 1e9).toFixed(1).replace(".0", "") + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(1).replace(".0", "") + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1).replace(".0", "") + "K";
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
            top: ref.current.getBoundingClientRect().top - 40,
            left:
              ref.current.getBoundingClientRect().left +
              ref.current.offsetWidth / 2,
            transform: "translateX(-50%)",
            backgroundColor: "#FFFFFF",
            color: "#350973",
            padding: "6px 10px",
            borderRadius: "6px",
            ontWeight: "600",
            whiteSpace: "pre-line",
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
      descLicença: "Com a Licença Global de Agricultura, você terá acesso a cultivos exclusivos, otimização de produções e melhorias que aumentarão sua rentabilidade. Liberte o potencial do setor agrícola agora mesmo!",
      cor1: "#003816",
      cor2: "#4CAF50",
      cor3: "#0C9123",
      cor4: "#4CAF50",
    },
    {
      id: "tecnologia",
      corClasse: "bg-[#FF8C42]",
      img: tecnologia,
      descLicença: "Com a Licença Global de Tecnologia, você desbloqueia inovações que podem transformar sua infraestrutura, otimizar processos e maximizar os lucros. Invista no futuro agora!",
      cor1: "#A64B00 ",
      cor2: "#D45A00 ",
      cor3: "#FF6F00 ",
      cor4: "#FF8C42 ",
    },
    {
      id: "industria",
      corClasse: "bg-[#B3B3B3]",
      img: industria,
      descLicença: "Com a Licença Global de Indústria, você acessa fábricas avançadas e processos de produção que aceleram sua evolução e aumentam a eficiência. Não fique para trás!",
      cor1: "#1A1A1A ",
      cor2: "#4D4D4D  ",
      cor3: "#808080  ",
      cor4: "#B3B3B3  ",
    },
    {
      id: "comercio",
      corClasse: "bg-[#FF4D4D]",
      img: comercio,
      descLicença: "Com a Licença Global de Comércio, você tem acesso a novos mercados, estratégias de vendas e expansão que podem levar seus negócios a um novo nível. Não perca essa oportunidade!",
      cor1: "#660000  ",
      cor2: "#A31919  ",
      cor3: "#E60000  ",
      cor4: "#FF4D4D  ",
    },
    {
      id: "imobiliario",
      corClasse: "bg-[#6666FF]",
      img: imobiliario,
      descLicença: "Com a Licença Global Imobiliária, você pode investir em novos terrenos, expandir suas construções e maximizar os retornos do mercado imobiliário. Abra as portas para grandes lucros!",
      cor1: "#000066  ",
      cor2: "#1A1A8C  ",
      cor3: "#3333CC  ",
      cor4: "#6666FF  ",
    },
    {
      id: "energia",
      corClasse: "bg-[#FFD966]",
      img: energia,
      descLicença: "Com a Licença Global de Energia, você ativa fontes de energia sustentáveis e de alta performance, garantindo uma operação eficiente e lucrativa. Potencialize seu setor energético agora!",
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
    {
      id: "grafico",
      corClasse: "bg-gradient-to-br from-[#6A00FF] to-[#E60000]",
      img: grafico,
      cor1: "#6A00FF ",
      cor2: "#6A00FF ",
      cor3: "#6A00FF ",
      cor4: "#6A00FF ",
    },
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
  }, [ativo, dados.dia, dados.terrenos, dados.lojasP, dados.lojasM, dados.lojasG]);

  const alterarEconomiaSetor = () => {
    atualizarDadosProf2([ativo, "economiaSetor", "estadoAtual"], "recessão");
  };

  const setorAtivo = setores.find((setor) => setor.id === ativo);
  const setorInfo = setores.find((setor) => setor.id === setorAtivo);
  const setorCarteira = setores.find((setor) => setor.id === "carteira");
  const setorGerenciamento = setores.find((setor) => setor.id === "gerenciamento");

  const corClasse = setorAtivo ? setorAtivo.corClasse : "bg-[#358Q973]";

  const setorDados = dados[ativo];
  const licençaComprada = setorDados.licençaGlobal.comprado;
  const licenciaValor = setorDados.licençaGlobal.valor;

  const licençasNecessárias = ["Silo", "Plantação De Legumes"];
  const arrayLicenseNece = licençasNecessárias;

  const dadosDia = dados.terrenos.arrayFatu.map((_, index) => index + 1);
  const dadosFatu = dados.faturamento.arrayFatuDiário.map((_, index) => index + 1);
  const dadosDiaSetores = economiaSetores.agricultura.economiaSetor.ArrayFatuHistory.map((_, index) => index + 270);

  const chartRefSetores = useRef(null);

  useEffect(() => {
    if (ativo === "grafico" && dados.dia > 270 && chartRefSetores.current) {
      const ctx = chartRefSetores.current.getContext("2d");

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

        const dadosSetor = economiaSetores[setorSelecionado]?.economiaSetor?.ArrayFatuMonth || [];

        return {
          label: setorSelecionado.toUpperCase(),
          data: dadosSetor,
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

      const labelsMeses = dadosSetor.map((_, index) => {
        const dia = (index + 1) * 30;
        return `Dia ${dia}`;
      });

      const configSetores = {
        type: "line",
        data: {
          labels: labelsMeses,
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
      borderColor: coresDespesasFatu[categoriaFinanceira]?.replace("0.5", "1") || "#000000",
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

  if (vision === "dashboard") {
    return (
      <>
        <div
          className={`${corClasse} w-full h-full border-[#350973] rounded-[20px] flex justify-between`}
        >
          <div
            className={`h-full rounded-[0px] items-center justify-center transition-all rounded-[40px] duration-300 bg-[${setorAtivo.cor2}] ${dados.dia >= 270 ? "w-[calc(100%)]" : "w-[calc(100%)]"}`}
          >
            {licençaComprada ? (
              <div className="w-full h-full p-4 flex flex-col" style={{ minHeight: 0, overflow: "hidden" }}>
                {ativo === "grafico" && <TechTree />}

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
                    setoresComEdificios,
                    limiteAtual,
                    excedente
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

                      {/* ── CONTAINER ÚNICO: FILTROS + CAPACIDADE ── */}
                      <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                        background: "rgba(0,0,0,.25)",
                        border: "1px solid rgba(255,255,255,.07)",
                        borderRadius: 12,
                        padding: "12px 16px",
                        flexShrink: 0,
                        marginBottom: "8px",
                      }}>

                        {/* ── LINHA 1: ORDENAÇÃO ── */}
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          flexWrap: "wrap",
                        }}>
                          <span style={{
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: ".1em",
                            color: "rgba(255,255,255,.4)",
                            marginRight: 4,
                            minWidth: "55px",
                          }}>
                            Ordenar
                          </span>
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
                                background: carteiraOrdem === key ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.05)",
                                color: carteiraOrdem === key ? "#fff" : "rgba(255,255,255,.4)",
                              }}>
                              {label}
                            </button>
                          ))}
                        </div>

                        {/* ── LINHA 2: SETOR E QUANTIDADE ── */}
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          flexWrap: "wrap",
                        }}>
                          <span style={{
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: ".1em",
                            color: "rgba(255,255,255,.4)",
                            marginRight: 4,
                            minWidth: "55px",
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
                                }}>
                                {s === "todos" ? "Todos" : setoresNomes[s].slice(0, 3)}
                              </button>
                            );
                          })}

                          <div style={{
                            width: 1,
                            height: 24,
                            background: "rgba(255,255,255,.1)",
                            margin: "0 6px",
                            flexShrink: 0,
                          }} />

                          <span style={{
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: ".1em",
                            color: "rgba(255,255,255,.4)",
                            marginRight: 4,
                          }}>
                            Qtd
                          </span>
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
                              }}>
                              {label}
                            </button>
                          ))}
                        </div>

                        {/* ── LINHA 3: AÇÕES E CAPACIDADE ── */}
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          flexWrap: "wrap",
                          paddingTop: "4px",
                          borderTop: "1px solid rgba(255,255,255,.06)",
                        }}>

                          {/* ── AÇÕES (ESQUERDA) ── */}
                          {/* ── AÇÕES (ESQUERDA) ── */}
                          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                            {/* Seleção */}
                            <button
                              onClick={() => setFiltroSelecionados(!filtroSelecionados)}
                              style={{
                                border: "none",
                                borderRadius: 6,
                                padding: "5px 14px",
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
                              }}>
                              <span style={{ fontSize: 12 }}>⭐</span>
                              {filtroSelecionados ? "Sel." : "Todos"}
                            </button>

                            {cartasSelecionadas.length > 0 && (
                              <button
                                onClick={limparSelecoes}
                                style={{
                                  border: "none",
                                  borderRadius: 6,
                                  padding: "5px 14px",
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
                                }}>
                                ✕ {cartasSelecionadas.length}
                              </button>
                            )}

                            <div style={{
                              width: 1,
                              height: 26,
                              background: "rgba(255,255,255,.1)",
                              flexShrink: 0,
                            }} />

                            {/* Venda Rápida - com valor total */}
                            <button
                              onClick={() => {
                                if (modoVendaRapida && cartasParaVender.length > 0) {
                                  executarVendaRapida();
                                } else if (modoVendaRapida) {
                                  setModoVendaRapida(false);
                                  setCartasParaVender([]);
                                } else {
                                  setModoVendaRapida(true);
                                  setCartasParaVender([]);
                                }
                              }}
                              style={{
                                border: "none",
                                borderRadius: 6,
                                padding: "5px 18px",
                                cursor: "pointer",
                                fontFamily: "'Rajdhani',sans-serif",
                                fontSize: 12,
                                fontWeight: 700,
                                transition: "all .15s",
                                whiteSpace: "nowrap",
                                background: modoVendaRapida ? "rgba(255, 77, 77, .25)" : "rgba(255,255,255,.05)",
                                color: modoVendaRapida ? "#ff4d4d" : "rgba(255,255,255,.4)",
                                border: modoVendaRapida ? "1px solid #ff4d4d" : "1px solid transparent",
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                minWidth: "100px",
                                justifyContent: "center",
                              }}>
                              <span style={{ fontSize: 14 }}>🗑️</span>
                              {modoVendaRapida ? (
                                <>
                                  {cartasParaVender.length > 0 ? (
                                    // 🔥 MOSTRA QUANTIDADE E VALOR TOTAL
                                    <span>
                                      ({cartasParaVender.length}) por R$ {
                                        cartasParaVender.reduce((total, item) => {
                                          const edificio = dados[item.setor]?.edificios?.[item.index];
                                          return total + ((edificio?.custoConstrucao || 0) * 0.7 * (edificio?.quantidade || 0));
                                        }, 0).toFixed(0)
                                      }
                                    </span>
                                  ) : (
                                    <span>Vender</span>
                                  )}
                                </>
                              ) : (
                                "Venda Rápida"
                              )}
                            </button>

                            {/* Botão "Todos" - seleciona todas as cartas visíveis para venda */}
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
                                  border: "none",
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
                                Todos
                              </button>
                            )}
                          </div>

                          {/* ── CAPACIDADE (DIREITA) ── */}
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            marginLeft: "auto",
                            padding: "4px 16px",
                            background: "rgba(0,0,0,.2)",
                            borderRadius: 8,
                            border: "1px solid rgba(255,255,255,.06)",
                            flexShrink: 0,
                          }}>

                            {/* Setores Ativos */}
                            <div style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              padding: "2px 8px",
                              backgroundColor: setorAtivo.cor3,
                              borderRadius: 4,
                              height: "28px",
                            }}>
                              <div style={{
                                backgroundColor: setorAtivo.cor4,
                                width: "18px",
                                height: "18px",
                                borderRadius: 3,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}>
                                <img src={setoresImg} className="h-[50%] aspect-square" />
                              </div>
                              <span className="text-white fonteBold text-[13px]">{setoresComEdificios}</span>
                            </div>

                            {/* Total de Edifícios */}
                            <div style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              padding: "2px 8px",
                              backgroundColor: setorAtivo.cor3,
                              borderRadius: 4,
                              height: "28px",
                            }}>
                              <div style={{
                                backgroundColor: setorAtivo.cor4,
                                width: "18px",
                                height: "18px",
                                borderRadius: 3,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}>
                                <img src={soma} className="h-[50%] aspect-square" />
                              </div>
                              <span className="text-white fonteBold text-[13px]">{edAtual}</span>
                            </div>

                            <div style={{
                              width: 1,
                              height: 24,
                              background: "rgba(255,255,255,.1)",
                              flexShrink: 0,
                            }} />

                            {/* Capacidade de Inventário */}
                            <div style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              padding: "2px 6px",
                            }}>
                              <span style={{ fontSize: 14, color: "rgba(255,255,255,.5)" }}>📦</span>
                              <span style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>
                                {tiposUnicos}
                              </span>
                              <span style={{ fontSize: 13, color: "rgba(255,255,255,.3)" }}>/</span>
                              <span style={{ fontSize: 15, fontWeight: 800, color: "rgba(255,255,255,.5)" }}>
                                {limiteAtual}
                              </span>

                              {/* 🔥 EXCEDENTE - MUITO VISÍVEL */}
                              {excedente > 0 && (
                                <div style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 6,
                                  padding: "2px 14px",
                                  background: "rgba(255, 0, 0, 0.2)",
                                  borderRadius: 6,
                                  border: "2px solid #ff0000",
                                  animation: "pulse-red 1.5s infinite",
                                }}>
                                  <span style={{ fontSize: 16 }}>⚠️</span>
                                  <span style={{ fontSize: 14, fontWeight: 900, color: "#ff0000" }}>
                                    +{excedente}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Botão Liquidar - só aparece quando tem excedente */}
                            {excedente > 0 && (
                              <button
                                onClick={async () => {
                                  const confirmar = confirm(`⚠️ Você está com ${excedente} carta(s) excedente(s)! Deseja liquidar?`);
                                  if (confirmar) {
                                    await executarLiquidacaoAutomatica(dados, atualizarDadosProf2, economiaSetores, atualizarEco);
                                    setCarteiraKey(prev => prev + 1);
                                  }
                                }}
                                style={{
                                  padding: "4px 16px",
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
                                  height: "32px",
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
                                🗑️ Liquidar
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      <style>{`
  @keyframes pulse-red {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`}</style>

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
                                    {/* 🔥 BADGE DE RANK - Superior Direito */}
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

                                    {/* 🔥 BADGE DE VALOR - Superior Esquerdo */}
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

                                    {/* Badge de quantidade excedente */}
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

                                    {/* Card */}
                                    <CardDraft index={idx} setor={setor} abrirModalSell={abrirModalSell} />

                                    {/* ── BOTÕES DE AÇÃO ── */}
                                    <div style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      marginTop: "4px",
                                      marginBottom: "2px",
                                      gap: "4px",
                                    }}>
                                      {/* Botão Selecionar - maior altura */}
                                      <button
                                        className="w-[45%] mt-2 mb-4"
                                        onClick={() => {
                                          toggleSelecao(setor, idx, ed.nome);
                                          selecionarButton();
                                        }}
                                        style={{
                                          padding: "8px 12px",
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

                                      {/* Botão Venda Rápida - ícone 🗑️ */}
{/* Botão Venda Rápida - ícone 🗑️ */}
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
                background: "linear-gradient(to top, #fbb034, #ffdd00, #ffeeee)",
              }}
              className="gradiente w-full flex-1 rounded-[20px] flex justify-center items-center relative overflow-hidden"
            >
              <img
                src={solo}
                alt="Terreno"
                className="w-[700px] h-[600px] top-[100px] relative z-[1]"
              />
              <div className="absolute bottom-[-100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5]">
                <img
                  src={buildBusiness}
                  alt="Prédio"
                  className="w-[400px] h-auto"
                />
              </div>
              <motion.div
                animate={controls}
                initial={{ background: gradientes[0] }}
                className="absolute inset-0 z-[15] opacity-[30%] pointer-events-none mix-blend-soft-light"
              />
              <div className="absolute top-4 left-4 z-[5] flex flex-col gap-2">
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