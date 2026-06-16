import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import fechar from "../../public/outrasImagens/fechar.png";
import { Localizador } from "./localizador";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import upgrade from "../../public/outrasImagens/upgrade.png";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import MisteryCard from "./MisteryCard";
import { CircleQuestionMark, Plus } from "lucide-react";
import { use } from "react";
import { useEffectEvent } from "react";
import useSound from "use-sound";
import closeAudio from "../../public/sounds/closeAudio.mp3";
import openAudio from "../../public/sounds/openAudio.mp3";
import { LocalizadorUpgrade } from "./LocalizadorUpgrade";
import newStageAudio from "../../public/sounds/newStageAudio.mp3";

const UpgradeCards = () => {
  const { dados, atualizarDados, atualizarDadosProf2 } = useContext(CentraldeDadosContext);
  const [ModalObjOpen, setIsModalObjOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [campanhaSelecionada, setCampanhaSelecionada] = useState(null);

  const [buttonCloseAudio] = useSound(closeAudio);
  const [buttonOpenAudio] = useSound(openAudio);
  const [buttonNewStageAudio] = useSound(newStageAudio);

  const CardsSorteados = dados.CardsSorteados

  console.log(CardsSorteados)

  useEffect(() => {
    if (dados.dia === 380) {
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
    "Centro De Pesquisa Em Materiais Avançados",
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
    "Fábrica De Ração",
    "Fábrica De Embalagem",
    "Fábrica De Bebidas",
    "Fábrica De Pães",
    "Fábrica Textil",
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
      nome: "SpaceX",
      descricao: "Se torne um empreendedor no ramo espacial",
      obrigatorios: [
        "Fábrica De Foguetes",
        "Centro De Pesquisa Aeroespacial",
        "Aeroporto",
      ],
    },
    {
      nome: "Energia Sustentável",
      descricao: "Controle fontes de energia limpa",
      obrigatorios: [
        "Usina Solar",
        "Parque Eólico",
        "Centro De Pesquisa Em Energias Renováveis",
      ],
    },
    {
      nome: "PetroGlobal",
      descricao: "Controle o mercado de energia e combustíveis fósseis",
      obrigatorios: [
        "Plataforma De Petróleo",
        "Refinaria",
        "Transporte Petrolífero",
        "Posto De Combustíveis",
      ],
    }, //limpo
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
      nome: "HealthPlus",
      descricao: "Domine o mercado farmacêutico e de saúde",
      obrigatorios: [
        "Fábrica De Medicamentos",
        "Laboratório Farmacêutico",
        "Farmácia",
        "Plantação De Plantas Medicinais",
      ],
    },
    {
      nome: "AutoGroup",
      descricao: "Lidere a indústria automotiva e de mobilidade",
      obrigatorios: [
        "Montadora De Veículos Elétricos",
        "Fábrica De Peças Automotivas",
        "Concessionária De Veículos",
        "Estação De Carregamento",
      ],
    },
    {
      nome: "TechResearch",
      descricao:
        "Torne-se referência em pesquisa e desenvolvimento tecnológico",
      obrigatorios: [
        "Centro De Pesquisa Em IA",
        "Centro De Pesquisa Em Materiais Avançados",
        "Laboratório De Nanotecnologia",
        "Centro De Pesquisa Em Eletrônicos",
      ],
    },
    {
      nome: "EcoPower",
      descricao: "Lidere a transição para energias renováveis",
      obrigatorios: [
        "Usina Solar",
        "Parque Eólico",
        "Fábrica De Painéis Solares",
        "Fábrica De Turbinas Eólicas",
      ],
    },
    {
      nome: "SteelIndustry",
      descricao: "Domine a produção de aço e metais",
      obrigatorios: [
        "Alto-Forno",
        "Usina Siderúrgica",
        "Mineradora",
        "Fábrica De Estruturas Metálicas",
      ],
    },
    {
      nome: "NetConnect",
      descricao: "Controle as redes de comunicação e telecomunicações",
      obrigatorios: [
        "Empresa De Telecomunicações",
        "Servidor Em Nuvem",
        "Plataforma De Redes Sociais",
      ],
    },
    {
      nome: "Diamond Empire",
      descricao:
        "Domine o mercado de joias luxuosas e mineração de pedras preciosas",
      obrigatorios: [
        "Mineradora De Pedras Preciosas",
        "Joalheria",
        "Terreno De Mineração",
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
        "Centro De Pesquisa Aeroespacial",
      ],
    },
    {
      nome: "RoboTech",
      descricao:
        "Revolutionize a indústria com automação, robótica e inteligência artificial",
      obrigatorios: [
        "Fábrica De Robôs",
        "Fábrica De Placas Eletrônicas",
        "Fábrica De Chips",
        "Centro De Pesquisa Em Robótica",
      ],
    },
    {
      nome: "Verde & Papel",
      descricao:
        "Monte o ecossistema completo de produção de papel desde a floresta até as livrarias",
      obrigatorios: [
        "Fábrica De Celulose",
        "Fábrica De Papel",
        "Área Florestal",
      ],
    },
    {
      nome: "TecnoAgro",
      descricao:
        "Implemente a agricultura 4.0 com pesquisa de ponta e automação",
      obrigatorios: [
        "Centro De Pesquisa Agrícola",
        "Instituto De Biotecnologia",
        "Biofábrica",
      ],
    },
    {
      nome: "Shopping Brasil",
      descricao: "Domine o varejo nacional com shoppings populares e centers",
      obrigatorios: [
        "Shopping Center",
        "Shopping Popular",
        "Mega Mercado",
      ],
    },
    {
      nome: "HealthCare Brasil",
      descricao: "Controle a cadeia completa de saúde e farmácias",
      obrigatorios: [
        "Farmácia",
        "Laboratório Farmacêutico",
        "Fábrica De Medicamentos",
      ],
    },
    {
      nome: "FashionStyle",
      descricao: "Torne-se líder no mercado de moda e vestuário",
      obrigatorios: [
        "Fábrica Textil",
        "Fábrica De Roupas",
        "Fábrica De Calçados",
      ],
    },
    {
      nome: "Bebidas",
      descricao: "Torne-se líder no mercado de bebidas",
      obrigatorios: [
        "Adega",
        "Fábrica De Bebidas",
        "Fábrica De Calçados",
        "Instituto De Tecnologia Alimentar",
        "Plantação De Grãos",
        "Pomares"
      ],
    },
    {
      nome: "Pães",
      descricao: "Torne-se líder no mercado de Pães",
      obrigatorios: [
        "Padaria",
        "Fábrica De Pães",
        "Instituto De Tecnologia Alimentar",
        "Plantação De Grãos",
      ],
    },
    {
      nome: "Carne",
      descricao: "Torne-se líder no mercado de Pães",
      obrigatorios: [
        "Açougue",
        "Fazenda De Vacas",
        "Granja De Aves",
        "Instituto De Tecnologia Alimentar",
        "Criação De Ovinos",
      ],
    },
    {
      nome: "Livros",
      descricao: "Torne-se líder no mercado de Livros",
      obrigatorios: [
        "Livraria",
        "Fábrica De Papel",
        "Fábrica De Celulose",
        "Fábrica De Livros",
        "Plantação De Eucalipto"
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







    const nomesFinais = [...campanha.obrigatorios];

    const objetosSelecionados = nomesFinais
      .map((nome) => {
        for (const setor of setoresArr) {
          const edificio = dados[setor]?.edificios?.find(
            (ed) => ed.nome === nome
          );
          const index = dados[setor]?.edificios?.findIndex(
            (ed) => ed.nome === nome
          );

          const valorFatuUnitárioAntigo =
            dados[setor]?.edificios?.[index]?.finanças?.faturamentoUnitário ?? 0;

          const novoValorFatu =
            valorFatuUnitárioAntigo + valorFatuUnitárioAntigo / 10;

          const valorImpostoFixoAntigo =
            dados[setor]?.edificios?.[index]?.finanças?.impostoFixo ?? 0;

          const novoImpostoFixo =
            valorImpostoFixoAntigo - valorImpostoFixoAntigo / 10;



          atualizarDadosProf2(
            [setor, "edificios", index, "finanças", "faturamentoUnitário"],
            novoValorFatu
          )

          atualizarDadosProf2(
            [setor, "edificios", index, "finanças", "impostoFixo"],
            novoImpostoFixo
          )




          if (edificio) return edificio;
        }
        return null;





        const verificadorLocalizado = indice === -1 ? "não achou" : "achou";

        atualizarDadosProf2([setorModificar, "edificios", indexModificar, "nomeEditável"],
          inputNome)
      })
      .filter(Boolean);



    setSelectedItems(objetosSelecionados);
    setCampanhaSelecionada(campanhaNome);
    atualizarDados("itensSorteados", { itensSorteados: nomesFinais });

    console.log(
      `🎯 Campanha: ${campanhaNome} | Edifícios selecionados:`,
      nomesFinais,

    );





  };

  const fecharModal = () => { setIsModalObjOpen(false) };

  // 🔹 Verificar se todos os objetivos foram concluídos


  // 🔹 useEffect para verificar conclusão automaticamente





  if (dados.dia < 270) return null;

  if (dados.dia >= 270) {
    // 🔹 Função para calcular extras de uma campanha específica


    return (
      <div>
        {dados.dia >= 380 &&

          <button
            onClick={() => { setIsModalObjOpen(true), buttonOpenAudio(); }}
            data-tooltip-id="saldo-tip"
            data-tooltip-content="Observe os objetivos do jogo"
            className="bg-laranja min-h-[50px] hover:bg-[#E56100] active:scale-95 hover:scale-[1.05] max-h-[70px] min-w-[50px] max-w-[70px] aspect-square rounded-[10px] flex w-[50px] items-center justify-center"
          >
            <img
              className="w-[60%] max-w-[58px] aspect-square"
              src={upgrade}
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
              {dados.dia > 270 && (
                <button
                  className="bg-laranja absolute top-[-20px] right-[-20px] w-[40px] h-[40px] flex justify-center items-center rounded-[10px] hover:bg-[#E56100] active:scale-95"
                  onClick={() => { fecharModal(); buttonCloseAudio(); }}
                >
                  <img src={fechar} alt="Fechar" className="w-[60%]" />
                </button>
              )}


              {dados.dia > 270 && (
                <h1 className="text-center text-white py-4 text-[30px] fonteBold">
                  Edifícios Melhorados
                </h1>
              )}
              <div className="w-[60%] h-[10px] bg-gradient-to-l from-[#F27405] to-[#6A00FF] rounded-[5px] mx-auto mb-6"></div>

              <div className="overflow-y-auto flex-1 px-8 py-6 space-y-6 flex flex-col items-center scrollbar-custom">
                {/* 🔹 Mostrar opções somente se nenhuma campanha foi selecionada */}




                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col md:flex-row items-center justify-around bg-[#2a0f50] rounded-2xl p-6 w-full max-w-[1600px] h-full"
                >

                    {CardsSorteados.map((carta, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        whileHover={{ y: -10, transition: { duration: 0.2 } }}
                        transition={{
                          delay: i * 0.05,
                          type: "spring",
                          stiffness: 100,
                        }}
                        className={`relative w-[250px] h-[350px] p-[2px] rounded-[20px] flex items-center justify-center overflow-hidden shadow-2xl transition-all duration-500`}
                        style={{
                          background
                            : "rgba(255, 255, 255, 0.05)",
                          border
                            : "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        {LocalizadorUpgrade(
                          carta.nome,
                          carta.redImposto,
                          carta.fatu
                        )}
                      </motion.div>
                    ))}



                </motion.div>

              </div>
            </motion.div>
          </div>
        )}
      </div>
    );
  }
};

export default UpgradeCards;
