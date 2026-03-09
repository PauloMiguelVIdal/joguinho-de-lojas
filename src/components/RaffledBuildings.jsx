import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import fechar from "../../public/outrasImagens/fechar.png";
import { Localizador } from "./localizador";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import alvo from "../../public/outrasImagens/alvo.png";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import MisteryCard from "./MisteryCard";
import { CircleQuestionMark, Plus } from "lucide-react";
import { use } from "react";
import { useEffectEvent } from "react";
import useSound from "use-sound";
import closeAudio from "../../public/sounds/closeAudio.mp3";
import openAudio from "../../public/sounds/openAudio.mp3";

import newStageAudio from "../../public/sounds/newStageAudio.mp3";  

const RaffledBuildings = () => {
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  const [ModalObjOpen, setIsModalObjOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [campanhaSelecionada, setCampanhaSelecionada] = useState(null);
  const [modalConclusao, setModalConclusao] = useState(false);
  const [objetivoConcluido, setObjetivoConcluido] = useState(false);
  const [quantidadeExtras, setQuantidadeExtras] = useState(0);
  const [buttonCloseAudio] = useSound(closeAudio);
  const [buttonOpenAudio] = useSound(openAudio);
  const [buttonNewStageAudio] = useSound(newStageAudio);

  useEffect(() => {
    if (dados.dia === 400) {
      setIsModalObjOpen(true);
      buttonOpenAudio();
      buttonNewStageAudio();
    }
  }, [dados.dia]);

  const setoresArr = [
    "agricultura",
    "tecnologia",
    "comercio",
    "industria",
    "imobiliario",
    "energia",
  ];

  const tooltipStyle = {
    backgroundColor: "#FFFFFF",
    color: "#350973",
    borderRadius: "6px",
    padding: "6px 10px",
    fontWeight: "600",
    fontSize: "14px",
  };

  const TooltipPadrao = ({ id }) => (
  <Tooltip
    id={id}
    style={tooltipStyle}
    border="1px solid #350973"
  />
);


  // Arrays de rank
  const RankS = [
    "Usina Hidrelétrica",
    "Reator Nuclear Convencional",
    "Usina De Fusão Nuclear",
    "Shopping Popular",
    "Shopping Center",
    "Fábrica De Computadores",
    "Construtora De Infraestruturas",
    "Aeroporto",
    "Porto",
    "Mineradora Radioativa",
    "Plataforma De Petróleo",
    "Montadora De Veículos Elétricos",
    "Fábrica De Automóveis",
    "Refinaria",
    "Fábrica De Chips",
    "Fábrica De Semicondutores",
    "Fábrica De Robôs",
    "Fábrica De Motores",
    "Fábrica De Foguetes",
    "Fábrica De Aeronaves",
  ];

  const RankA = [
    "Cooperativa Agrícola",
    "Usina De Biomassa",
    "Transporte Petrolífero",
    "Marketplace Online",
    "Plataforma De Streaming",
    "Fábrica De Smartphones",
    "Fábrica De Consoles De Jogos",
    "Fábrica De Dispositivos Vestiveis",
    "Centro De Pesquisa Em Fusão Nuclear",
    "Centro De Pesquisa Aeroespacial",
    "Centro De Engenharia Avançada",
    "Centro De Pesquisa Em Materiais",
    "Centro De Pesquisa Em IA",
    "Mineradora De Pedras Preciosas",
    "Mega Mercado",
    "Prédio De Alto Padrão",
    "Tanque De Armazenamento Biocombustível",
    "Fábrica De Plásticos",
    "Fábrica De Químicos Especializados",
    "Alto-Forno",
    "Usina Siderúrgica",
    "Fundição De Alumínio",
    "Fábrica De Ligas Metálicas",
    "Fábrica De Peças Automotivas",
    "Refinaria De Biocombustíveis",
    "Biofábrica",
    "Fábrica De Eletrônicos",
    "Empresa De Automação Industrial",
    "Estaleiro",
  ];

  const RankB = [
    "Centro De Comércio De Plantações",
    "Empresa De Comercio Energético",
    "Empresa De Consultoria Energética",
    "Centro De Pesquisa Em Energias Renováveis",
    "Centro De Pesquisa Energética",
    "Usina Termelétrica A Biocombustíveis",
    "Usina De Biomassa",
    "Usina Termolétrica",
    "Joalheria",
    "Concessionária De Veículos",
    "Centro De Distribuição",
    "Armazém Logístico",
    "Servidor Em Nuvem",
    "Data Center",
    "Empresa De Desenvolvimento De Software",
    "Empresa De Jogos Digitais",
    "Empresa De Telecomunicações",
    "Plataforma De Redes Sociais",
    "Marketplace Online",
    "Instituto De Tecnologia Alimentar",
    "Centro De Pesquisa Agrícola",
    "Instituto De Biotecnologia",
    "Laboratório De Nanotecnologia",
    "Centro De Pesquisa Em Eletrônicos",
    "Laboratório De Design De Produtos",
    "Laboratório De Novos Combustíveis",
    "Centro De Engenharia Avançada",
    "Centro De Pesquisa Em Robótica",
    "Construtora",
    "Imobiliária Residencial",
    "Imobiliária Comercial",
    "Mineradora",
    "Centro De Coleta De Biomassa",
    "Fábrica De Fertilizante",
    "Fábrica De Medicamentos",
    "Laboratório Farmacêutico",
    "Fábrica De Plásticos",
    "Alto-Forno",
    "Indústria De Componentes Mecânicos",
    "Fábrica De Chapas Metálicas",
    "Fábrica De Estruturas Metálicas",
    "Fábrica De Peças Automotivas",
    "Fábrica De Placas Eletrônicas",
    "Fábrica De Eletrônicos",
  ];

  const RankC = [
    "Plantação De Grãos",
    "Plantação De Vegetais",
    "Pomares",
    "Fazenda Administrativa",
    "Fazenda De Vacas",
    "Granja De Aves",
    "Criação De Ovinos",
    "Armazém",
    "Silo",
    "Depósito De Resíduos Orgânicos",
    "Madeireira",
    "Área Florestal",
    "Terreno De Mineração",
    "Plantação De Eucalipto",
    "Plantação De Plantas Medicinais",
    "Subestação De Energia",
    "Rede De Distribuição Elétrica",
    "Usina Solar",
    "Fábrica De Turbinas Eólicas",
    "Fábrica De Painéis Solares",
    "Fábrica De Baterias",
    "Estação De Carregamento",
    "Centro De Reciclagem De Baterias",
    "Parque Eólico",
    "Feira",
    "Loja De Móveis",
    "Restaurante",
    "Livraria",
    "Mercado",
    "Adega",
    "Padaria",
    "Açougue",
    "Loja De Conveniência",
    "Posto De Combustíveis",
    "Redes De Fast-food",
    "Petshop",
    "Farmácia",
    "Cafeteria",
    "Loja De Departamentos",
    "Loja De Calçados",
    "Loja De Vestuário",
    "Loja De Gadgets E Wearables",
    "Loja De Games",
    "Loja De Celulares",
    "Loja De Informática",
    "Loja De Eletrônicos",
    "Centro De Transporte E Entrega",
    "Startup",
    "Centro De Pesquisa Química",
    "Cartório E Licenças",
    "Terraplanagem E Pavimentação",
    "Construtora De Pequenas Obras",
    "Escritório De Design De Interiores",
    "Escritório De Arquitetura",
    "Consultoria Em Engenharia Civil",
    "Fábrica De Móveis",
    "Fábrica De Rações",
    "Fábrica De Embalagem",
    "Fábrica De Bebidas",
    "Fábrica De Pães",
    "Fábrica Têxtil",
    "Fábrica De Calçados",
    "Fábrica De Roupas",
    "Fábrica De Celulose",
    "Fábrica De Papel",
    "Fábrica De Livros",
  ];

  // Campanhas pré-definidas
  const Campanhas = [
    {
      nome: "Tesla",
      descricao: "Se torne um empreendedor no ramo de carros elétricos",
      obrigatorios: [
        "Montadora De Veículos Elétricos",
        "Fábrica De Baterias",
        "Estação De Carregamento",
      ],
    },






    {
      nome: "Apple",
      descricao: "Se torne um empreendedor no ramo de celulares e computadores",
      obrigatorios: [
        "Fábrica De Smartphones",
        "Fábrica De Computadores",
        "Loja De Celulares",
      ],
    },

    {
      nome: "BioFuture",
      descricao: "Lidere a revolução da biotecnologia e energias renováveis",
      obrigatorios: [
        "Biofábrica",
        "Usina De Biomassa",
        "Instituto De Biotecnologia",
        "Refinaria De Biocombustíveis",
      ],
    },

    {
      nome: "FoodNetwork",
      descricao: "Controle a cadeia produtiva de alimentos",
      obrigatorios: [
        "Cooperativa Agrícola",
        "Mega Mercado",
        "Restaurante",
        "Fábrica De Rações",
      ],
    },








    {
      nome: "TechResearch",
      descricao:
        "Torne-se referência em pesquisa e desenvolvimento tecnológico",
      obrigatorios: [
        "Centro De Pesquisa Em IA",
        "Centro De Pesquisa Em Materiais",
        "Laboratório De Nanotecnologia",
        "Centro De Pesquisa Em Eletrônicos",
      ],
    },

    {
      nome: "PetLove",
      descricao:
        "Crie o maior ecossistema de produtos para animais de estimação",
      obrigatorios: [
        "Petshop",
        "Fábrica De Rações",
        "Fazenda De Vacas",
        "Granja De Aves",
        "Centro De Distribuição",
        "Mercado",
        "Farmácia",
        "Fábrica De Medicamentos",
      ],
    },

    {
      nome: "EduTech",
      descricao: "Revolucione o mercado educacional com tecnologia",
      obrigatorios: [
        "Empresa De Desenvolvimento De Software",
        "Livraria",
        "Data Center",
        "Centro De Pesquisa Em IA",
      ],
    },











    {
      nome: "Construtora Elite",
      descricao:
        "Torne-se referência em construções de alto padrão e design sofisticado",
      obrigatorios: [
        "Fábrica De Móveis",
        "Prédio De Alto Padrão",
        "Escritório De Arquitetura",
        "Escritório De Design De Interiores",
        "Terraplanagem E Pavimentação",
      ],
    },
    {
      nome: "Galaxy Tech",
      descricao:
        "Domine a tecnologia aeroespacial com foguetes, pesquisa avançada e propulsão",
      obrigatorios: [
        "Fábrica De Foguetes",
        "Fábrica De Motores",
        "Centro De Engenharia Avançada",
        "Centro De Pesquisa Em Materiais",
        "Centro De Pesquisa Em Robótica",
        "Laboratório De Novos Combustíveis",
        "Centro De Pesquisa Aeroespacial",
      ],
    },
    {
      nome: "Naval Force",
      descricao:
        "Lidere a construção naval com estaleiros de ponta e engenharia avançada",
      obrigatorios: [
        "Estaleiro",
        "Centro De Pesquisa Em Materiais",
        "Centro De Engenharia Avançada",
        "Indústria De Componentes Mecânicos",
        "Fábrica De Estruturas Metálicas",
      ],
    },
        {
      nome: "FashionStyle",
      descricao: "Torne-se líder no mercado de moda e vestuário",
      obrigatorios: [
        "Fábrica Têxtil",
        "Fábrica De Roupas",
        "Fábrica De Calçados",
        "Loja De Vestuário",
      ],
    },
        {
      nome: "SpaceX", //certo
      descricao: "Se torne um empreendedor no ramo espacial",
      obrigatorios: [
        "Fábrica De Foguetes",
        "Centro De Pesquisa Aeroespacial",
        "Aeroporto",
      ],
    },
        {
      nome: "TecnoAgro",
      descricao:
        "Implemente a agricultura 4.0 com pesquisa de ponta e automação",
      obrigatorios: [
        "Centro De Pesquisa Agrícola",
        "Instituto De Biotecnologia",
        "Instituto De Tecnologia Alimentar",
        "Empresa De Automação Industrial",
        "Biofábrica",
        "Cooperativa Agrícola",
        "Armazém Logístico",
        "Fazenda Administrativa",
      ],
    },
        {
      nome: "Aço & Alumínio",
      descricao:
        "Monopolize a produção metalúrgica desde a mineração até a fabricação",
      obrigatorios: [
        "Alto-Forno",
        "Usina Siderúrgica",
        "Fundição De Alumínio",
        "Mineradora",
        "Terreno De Mineração",
      ],
    },
        {
      nome: "HealthCare Brasil",
      descricao: "Controle a cadeia completa de saúde e farmácias",
      obrigatorios: [
        "Farmácia",
        "Laboratório Farmacêutico",
        "Fábrica De Medicamentos",
        "Plantação De Plantas Medicinais",
        "Biofábrica",
        "Centro De Pesquisa Química",
        "Centro De Distribuição",
        "Instituto De Biotecnologia",
      ],
    },

    {
      nome: "AgroTech", //certo
      descricao: "Domine a indústria agrícola moderna",
      obrigatorios: [
        "Cooperativa Agrícola",
        "Centro De Pesquisa Agrícola",
        "Plantação De Grãos",
        "Fazenda De Vacas",
      ],
    },
    {
      nome: "Energia Sustentável", //certo
      descricao: "Controle fontes de energia limpa",
      obrigatorios: [
        "Usina Solar",
        "Parque Eólico",
        "Centro De Pesquisa Em Energias Renováveis",
        "Usina De Fusão Nuclear",
      ],
    },
    {
      nome: "Cidade Inteligente", //certo
      descricao: "Desenvolva infraestrutura e serviços urbanos",
      obrigatorios: [
        "Shopping Center",
        "Posto De Combustíveis",
        "Rede De Distribuição Elétrica",
        "Estação De Carregamento",
      ],
    },
    {
      nome: "Amazonia Tech", //certo
      descricao: "Domine o mercado de varejo online e tecnologia",
      obrigatorios: [
        "Marketplace Online",
        "Data Center",
        "Centro De Distribuição",
        "Fábrica De Eletrônicos",
      ],
    },
    {
      nome: "PetroGlobal", //certo
      descricao: "Controle o mercado de energia e combustíveis fósseis",
      obrigatorios: [
        "Plataforma De Petróleo",
        "Refinaria",
        "Transporte Petrolífero",
        "Posto De Combustíveis",
      ],
    }, //limpo
        {
      nome: "MetaVerse Inc",
      descricao: "Crie o império de entretenimento digital e realidade virtual",
      obrigatorios: [
        "Fábrica De Chips",
        "Plataforma De Streaming",
        "Empresa De Jogos Digitais",
        "Loja De Games",
      ],
    },
    {
      nome: "ConstruMax",
      descricao: "Torne-se líder em construção e desenvolvimento urbano",
      obrigatorios: [
        "Construtora De Infraestruturas",
        "Construtora",
        "Imobiliária Comercial",
        "Prédio De Alto Padrão",
      ],
    }, //////errado
    {
      nome: "HealthPlus", //certo
      descricao: "Domine o mercado farmacêutico e de saúde",
      obrigatorios: [
        "Fábrica De Medicamentos",
        "Laboratório Farmacêutico",
        "Farmácia",
        "Plantação De Plantas Medicinais",
      ],
    },
    {
      nome: "AutoGroup", //certo
      descricao: "Lidere a indústria automotiva e de mobilidade",
      obrigatorios: [
        "Montadora De Veículos Elétricos",
        "Fábrica De Peças Automotivas",
        "Concessionária De Veículos",
        "Estação De Carregamento",
      ],
    },
        {
      nome: "EcoPower", //certo
      descricao: "Lidere a transição para energias renováveis",
      obrigatorios: [
        "Usina Solar",
        "Parque Eólico",
        "Fábrica De Painéis Solares",
        "Fábrica De Turbinas Eólicas",
      ],
    },
    {
      nome: "SteelIndustry", //certo
      descricao: "Domine a produção de aço e metais",
      obrigatorios: [
        "Alto-Forno",
        "Usina Siderúrgica",
        "Mineradora",
        "Fábrica De Estruturas Metálicas",
      ],
    },
    {
      nome: "RoboTech", //certo
      descricao:
        "Revolutionize a indústria com automação, robótica e inteligência artificial",
      obrigatorios: [
        "Fábrica De Robôs",
        "Fábrica De Placas Eletrônicas",
        "Fábrica De Chips",
        "Indústria De Componentes Mecânicos",
        "Centro De Pesquisa Em IA",
        "Centro De Pesquisa Em Eletrônicos",
        "Centro De Pesquisa Em Robótica",
        "Fábrica De Eletrônicos",
      ],
    },
    {
      nome: "Verde & Papel", //certo
      descricao:
        "Monte o ecossistema completo de produção de papel desde a floresta até as livrarias",
      obrigatorios: [
        "Fábrica De Celulose",
        "Fábrica De Papel",
        "Madeireira",
        "Área Florestal",
        "Plantação De Eucalipto",
        "Centro De Pesquisa Química",
        "Empresa De Automação Industrial",
        "Livraria",
      ],
    },
    {
      nome: "AgroPower Brasil", //certo
      descricao:
        "Domine toda a cadeia produtiva do agronegócio brasileiro, desde a plantação até a exportação",
      obrigatorios: [
        "Plantação De Grãos",
        "Plantação De Vegetais",
        "Cooperativa Agrícola",
        "Centro De Comércio De Plantações",
        "Fazenda Administrativa",
        "Armazém",
        "Silo",
        "Centro De Distribuição",
      ],
    },
        {
      nome: "Home&Decor",
      descricao: "Domine o mercado de móveis e decoração para residências",
      obrigatorios: [
        "Loja De Móveis",
        "Fábrica De Móveis",
        "Madeireira",
        "Plantação De Eucalipto",
        "Escritório De Design De Interiores",
        "Centro De Distribuição",
        "Construtora",
        "Prédio De Alto Padrão",
      ],
    },
    {
      nome: "EntregaExpress", //certo
      descricao: "Monte a maior rede de logística e entregas do país",
      obrigatorios: [
        "Centro De Transporte E Entrega",
        "Centro De Distribuição",
        "Armazém Logístico",
        "Aeroporto",
        "Porto",
        "Marketplace Online",
        "Empresa De Telecomunicações",
        "Servidor Em Nuvem",
      ],
    },
    {
      nome: "NetConnect",
      descricao: "Controle as redes de comunicação e telecomunicações",
      obrigatorios: [
        "Empresa De Telecomunicações",
        "Servidor Em Nuvem",
        "Plataforma De Redes Sociais",
        "Loja De Celulares",
      ],
    },
    {
      nome: "BioCombustíveis Nacional", //certo
      descricao:
        "Lidere a produção de energia renovável a partir de biomassa e resíduos agrícolas",
      obrigatorios: [
        "Plantação De Grãos",
        "Plantação De Vegetais",
        "Depósito De Resíduos Orgânicos",
        "Centro De Coleta De Biomassa",
        "Refinaria De Biocombustíveis",
        "Usina Termelétrica A Biocombustíveis",
        "Biofábrica",
        "Fazenda Administrativa",
      ],
    },

    {
      nome: "Madeira & Papel", //certo
      descricao: "Controle a cadeia completa de produção madeireira e de papel",
      obrigatorios: [
        "Plantação De Eucalipto",
        "Madeireira",
        "Área Florestal",
        "Fábrica De Celulose",
        "Fábrica De Papel",
        "Fábrica De Móveis",
        "Terraplanagem E Pavimentação",
        "Fazenda Administrativa",
      ],
    },

    {
      nome: "Shopping Brasil", //certo
      descricao: "Domine o varejo nacional com shoppings populares e centers",
      obrigatorios: [
        "Shopping Center",
        "Shopping Popular",
        "Mega Mercado",
        "Loja De Departamentos",
        "Loja De Vestuário",
        "Loja De Calçados",
        "Restaurante",
        "Cafeteria",
      ],
    },
    {
      nome: "TechMall", //certo
      descricao: "Crie o maior centro de tecnologia e gadgets do país",
      obrigatorios: [
        "Loja De Eletrônicos",
        "Loja De Celulares",
        "Loja De Informática",
        "Loja De Games",
        "Loja De Gadgets E Wearables",
        "Fábrica De Smartphones",
        "Fábrica De Computadores",
        "Marketplace Online",
      ],
    },

    {
      nome: "AutoShopping", //certo
      descricao: "Integre concessionárias e centros automotivos",
      obrigatorios: [
        "Concessionária De Veículos",
        "Posto De Combustíveis",
        "Fábrica De Peças Automotivas",
        "Montadora De Veículos Elétricos",
        "Fábrica De Automóveis",
        "Centro De Distribuição",
        "Escritório De Design De Interiores",
        "Consultoria Em Engenharia Civil",
      ],
    },

    {
      nome: "Átomo Avançado", //certo
      descricao:
        "Lidere a revolução da energia nuclear com pesquisa de ponta e mineração radioativa",
      obrigatorios: [
        "Terreno De Mineração",
        "Mineradora Radioativa",
        "Usina De Fusão Nuclear",
        "Consultoria Em Engenharia Civil",
        "Centro De Pesquisa Em Fusão Nuclear",
        "Centro De Pesquisa Química",
      ],
    },
        {
      nome: "Diamond Empire", //certo
      descricao:
        "Domine o mercado de joias luxuosas e mineração de pedras preciosas",
      obrigatorios: [
        "Mineradora De Pedras Preciosas",
        "Joalheria",
        "Terreno De Mineração",
        "Laboratório De Design De Produtos",
        "Terraplanagem E Pavimentação",
        "Consultoria Em Engenharia Civil",
      ],
    },

  ];

  // 🔹 Função para sortear itens
  const getRandomItems = (array, n) => {
    const copy = [...array];
    const result = [];
    for (let i = 0; i < n && copy.length > 0; i++) {
      const idx = Math.floor(Math.random() * copy.length);
      result.push(copy[idx]);
      copy.splice(idx, 1);
    }
    return result;
  };

  // 🔹 Gerar campanha completa
  const gerarCampanha = (campanhaNome) => {
    const campanha = Campanhas.find((c) => c.nome === campanhaNome);
    if (!campanha) return;

    const copyS = [...RankS];
    const copyA = [...RankA];
    const copyB = [...RankB];
    const copyC = [...RankC];

    const removeFromArray = (arr, nome) => {
      const idx = arr.indexOf(nome);
      if (idx !== -1) arr.splice(idx, 1);
    };

    let obrigatoriosS = 0,
      obrigatoriosA = 0,
      obrigatoriosB = 0,
      obrigatoriosC = 0;
    campanha.obrigatorios.forEach((nome) => {
      if (RankS.includes(nome)) obrigatoriosS++;
      if (RankA.includes(nome)) obrigatoriosA++;
      if (RankB.includes(nome)) obrigatoriosB++;
      if (RankC.includes(nome)) obrigatoriosC++;
      [copyS, copyA, copyB, copyC].forEach((arr) => removeFromArray(arr, nome));
    });

    const qtdS = Math.max(0, 2 - obrigatoriosS);
    const qtdA = Math.max(0, 3 - obrigatoriosA);
    const qtdB = Math.max(0, 5 - obrigatoriosB);
    const qtdC = Math.max(0, 8 - obrigatoriosC);

    // 🔹 CALCULAR TOTAL DE EXTRAS
    const totalExtras = qtdS + qtdA + qtdB + qtdC;
    setQuantidadeExtras(totalExtras);

    const sorteados = [
      ...getRandomItems(copyS, qtdS),
      ...getRandomItems(copyA, qtdA),
      ...getRandomItems(copyB, qtdB),
      ...getRandomItems(copyC, qtdC),
    ];

    const nomesFinais = [...campanha.obrigatorios, ...sorteados];

    const objetosSelecionados = nomesFinais
      .map((nome) => {
        for (const setor of setoresArr) {
          const edificio = dados[setor]?.edificios?.find(
            (ed) => ed.nome === nome
          );
          if (edificio) return edificio;
        }
        return null;
      })
      .filter(Boolean);

    setSelectedItems(objetosSelecionados);
    setCampanhaSelecionada(campanhaNome);
    atualizarDados("itensSorteados", { itensSorteados: nomesFinais });

    console.log(
      `🎯 Campanha: ${campanhaNome} | Edifícios selecionados:`,
      nomesFinais,
      `| Extras: ${totalExtras}`
    );
  };

  const fecharModal = () => {setIsModalObjOpen(false) };

  // 🔹 Verificar se todos os objetivos foram concluídos
  const verificarConclusao = () => {
    if (!campanhaSelecionada || selectedItems.length === 0) return false;

    const todosCompletos = selectedItems.every((ed) => {
      const setores = [
        "agricultura",
        "tecnologia",
        "comercio",
        "industria",
        "imobiliario",
        "energia",
      ];

      for (const setor of setores) {
        const edificio = dados[setor]?.edificios?.find(
          (e) => e.nome === ed.nome
        );
        if (edificio && edificio.quantidade > 0) {
          return true;
        }
      }
      return false;
    });

    return todosCompletos;
  };

  // 🔹 useEffect para verificar conclusão automaticamente
  useEffect(() => {
    if (campanhaSelecionada && !objetivoConcluido) {
      const concluido = verificarConclusao();
      if (concluido) {
        setObjetivoConcluido(true);
        setModalConclusao(true);
      }
    }
  }, [dados, campanhaSelecionada, selectedItems, objetivoConcluido]);

  const continuarJogo = () => {
    setModalConclusao(false);
  };

  const encerrarJogo = () => {
    window.location.reload();
  };

  {
    /* 🎉 MODAL DE CONCLUSÃO */
  }

  if (dados.dia < 270) return null;

  if (dados.dia >= 270) {
    // 🔹 Função para calcular extras de uma campanha específica
    const calcularExtras = (campanhaNome) => {
      const campanha = Campanhas.find((c) => c.nome === campanhaNome);
      if (!campanha) return 0;

      let obrigatoriosS = 0,
        obrigatoriosA = 0,
        obrigatoriosB = 0,
        obrigatoriosC = 0;

      campanha.obrigatorios.forEach((nome) => {
        if (RankS.includes(nome)) obrigatoriosS++;
        if (RankA.includes(nome)) obrigatoriosA++;
        if (RankB.includes(nome)) obrigatoriosB++;
        if (RankC.includes(nome)) obrigatoriosC++;
      });

      const qtdS = Math.max(0, 2 - obrigatoriosS);
      const qtdA = Math.max(0, 3 - obrigatoriosA);
      const qtdB = Math.max(0, 5 - obrigatoriosB);
      const qtdC = Math.max(0, 8 - obrigatoriosC);

      return qtdS + qtdA + qtdB + qtdC;
    };

    return (
      <div>
        {dados.dia >= 400 &&

          <button
          onClick={() => { setIsModalObjOpen(true), buttonOpenAudio(); }}
          data-tooltip-id="saldo-tip"
          data-tooltip-content="Observe os objetivos do jogo"
          className="bg-laranja min-h-[50px] hover:bg-[#E56100] active:scale-95 hover:scale-[1.05] max-h-[70px] min-w-[50px] max-w-[70px] aspect-square rounded-[10px] flex w-[50px] items-center justify-center"
          >
          <img
            className="w-[60%] max-w-[58px] aspect-square"
            src={alvo}
            alt="Economia"
            />
        </button>
          }
        <TooltipPadrao
          id="saldo-tip"
          style={tooltipStyle}
        />
        {ModalObjOpen && (
          <div className="flex justify-center items-center z-50 bg-black bg-opacity-90 w-[100vw] h-[100vh] fixed top-0 left-0 select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-[90vw] max-w-[1600px] h-[90vh] bg-[#1a0a3b] rounded-[20px] z-20 relative flex flex-col"
            >
              {campanhaSelecionada && (
                <button
                  className="bg-laranja absolute top-[-20px] right-[-20px] w-[40px] h-[40px] flex justify-center items-center rounded-[10px] hover:bg-[#E56100] active:scale-95"
                  onClick={() => { fecharModal(); buttonCloseAudio(); }}
                >
                  <img src={fechar} alt="Fechar" className="w-[60%]" />
                </button>
              )}

              {!campanhaSelecionada && (
                <h1 className="text-center text-white py-4 text-[30px] fonteBold">
                  Selecione sua campanha de jogo
                </h1>
              )}
              {campanhaSelecionada && (
                <h1 className="text-center text-white py-4 text-[30px] fonteBold">
                  Objetivos do jogo
                </h1>
              )}
              <div className="w-[60%] h-[10px] bg-gradient-to-l from-[#F27405] to-[#6A00FF] rounded-[5px] mx-auto mb-6"></div>

              <div className="overflow-y-auto flex-1 px-8 py-6 space-y-6 flex flex-col items-center scrollbar-custom">
                {/* 🔹 Mostrar opções somente se nenhuma campanha foi selecionada */}
                {!campanhaSelecionada &&
                  getRandomItems(Campanhas, 3).map((c, i) => {
                    const extrasParaEstaCampanha = calcularExtras(c.nome); // 🔹 CALCULAR AQUI

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col md:flex-row items-center justify-between bg-[#2a0f50] rounded-2xl p-6 w-full max-w-[1600px]"
                      >
                        <div className="flex -space-x-6 h-[230px] mb-4 md:mb-0">
                          {c.obrigatorios.map((nome, j) => (
                            <div key={j} className="w-[90px] h-[120px]">
                              {Localizador(nome)}
                            </div>
                          ))}
                          <Plus
                            color="#FFFFFF"
                            className="z-50 relative left-[150px] top-[90px]"
                            size={48}
                          />
                          <div className="relative left-[180px]">
                            <MisteryCard quantidade={extrasParaEstaCampanha} />{" "}
                            {/* 🔹 USAR VALOR CALCULADO */}
                          </div>
                        </div>

                        <div className="flex flex-col justify-evenly text-center md:text-left w-full md:w-[35%] gap-4">
                          <div className="w-full py-2 px-4 rounded-xl bg-white/10 backdrop-blur-sm">
                            <h2 className="text-2xl font-bold text-white">
                              {c.nome}
                            </h2>
                          </div>

                          <p className="text-sm text-white">{c.descricao}</p>

                          <button
                            onClick={() => { gerarCampanha(c.nome); buttonNewStageAudio(); }}
                            className="bg-gradient-to-r from-[#F27405] to-[#6A00FF] text-white px-6 py-2 rounded-xl font-bold hover:scale-105 transition-transform duration-200 shadow-md"
                          >
                            Selecionar
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}

                {/* 🔹 Renderiza todos os edifícios da campanha selecionada */}
                {campanhaSelecionada && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-wrap gap-6 justify-center mt-4"
                  >
                    {selectedItems.map((ed, i) => {
                      const setores = [
                        "agricultura",
                        "tecnologia",
                        "comercio",
                        "industria",
                        "imobiliario",
                        "energia",
                      ];
                      let setorEncontrado = null;
                      let indice = -1;

                      for (const setor of setores) {
                        indice = dados[setor].edificios.findIndex(
                          (e) => e.nome === ed.nome
                        );
                        if (indice !== -1) {
                          setorEncontrado = setor;
                          break;
                        }
                      }

                      const quantidade =
                        setorEncontrado && indice !== -1
                          ? dados[setorEncontrado].edificios[indice].quantidade
                          : 0;

                      const gradienteDourado = `
                    linear-gradient(45deg, #b8860b, #8b7500 25%, #daa520 50%, #cfa200 75%, #b8860b 100%),
                    linear-gradient(135deg, #8b6914, #ffd700 25%, #bfa600 50%, #806000 75%, #b8860b 100%)
                    `;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{
                            delay: i * 0.1,
                            type: "spring",
                            stiffness: 120,
                          }}
                          className="w-[300px] h-[300px] p-2 rounded-xl flex items-center justify-center shadow-lg"
                          style={{
                            background:
                              quantidade > 0 ? gradienteDourado : "#ffffff10",
                            backgroundBlendMode:
                              quantidade > 0 ? "overlay" : "normal",
                          }}
                        >
                          {Localizador(ed.nome)}
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
        {modalConclusao && (
          <div className="flex justify-center items-center z-[60] bg-black bg-opacity-95 w-[100vw] h-[100vh] fixed top-0 left-0 select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: -100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
              className="w-[90vw] max-w-[600px] bg-gradient-to-br from-[#6A00FF] via-[#8B00FF] to-[#F27405] rounded-[30px] p-8 relative shadow-2xl"
            >
              <div className="bg-[#1a0a3b] rounded-[20px] p-8 flex flex-col items-center gap-6">
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
                  className="text-white text-xl text-center fonteBold"
                >
                  Você completou todos os objetivos da campanha
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="text-[#F27405] text-3xl font-bold text-center"
                >
                  {campanhaSelecionada}
                </motion.p>

                <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-[#F27405] to-transparent"></div>

                <div className="flex gap-4 w-full mt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={continuarJogo}
                    className="flex-1 bg-gradient-to-r from-[#6A00FF] to-[#8B00FF] text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                  >
                    Continuar Jogo
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={encerrarJogo}
                    className="flex-1 bg-gradient-to-r from-[#F27405] to-[#FF8C00] text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
                  >
                    Encerrar Jogo
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    );
  }
};

export default RaffledBuildings;
