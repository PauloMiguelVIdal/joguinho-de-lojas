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

import newStageAudio from "../../public/sounds/newStageAudio.mp3";

const BanCards = () => {
  const { dados, atualizarDados, atualizarDadosProf2 } = useContext(CentraldeDadosContext);
  const [ModalObjOpen, setIsModalObjOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const [buttonCloseAudio] = useSound(closeAudio);
  const [buttonOpenAudio] = useSound(openAudio);
  const [buttonNewStageAudio] = useSound(newStageAudio);

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
  const todasCartas = [
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


const cartaSelecionada = todasCartas[0]

const arrayBan = []

arrayBan.push(cartaSelecionada)






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
                  Selecione os edifícios melhorados
                </h1>
              )}
              {campanhaSelecionada && (
                <h1 className="text-center text-white py-4 text-[30px] fonteBold">
                  Edifícios Melhorados
                </h1>
              )}
              <div className="w-[60%] h-[10px] bg-gradient-to-l from-[#F27405] to-[#6A00FF] rounded-[5px] mx-auto mb-6"></div>

              <div className="overflow-y-auto flex-1 px-8 py-6 space-y-6 flex flex-col items-center scrollbar-custom">
                {/* 🔹 Mostrar opções somente se nenhuma campanha foi selecionada */}
                {!campanhaSelecionada &&
                  getRandomItems(Campanhas, 3).map((c, i) => {


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
                            <div key={j} className="w-[200px] h-[120px]">
                              {Localizador(nome)}
                            </div>
                          ))}


                        </div>

                        <div className="flex flex-col justify-evenly text-center md:text-left w-full md:w-[35%] gap-4">
                          <div className="w-full py-2 px-4 rounded-xl bg-white/10 backdrop-blur-sm">
                            <h2 className="text-2xl font-bold text-white">
                              {c.nome}
                            </h2>
                          </div>

                          <p className="text-sm text-white">{c.descricao}</p>

                          <button
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
      </div>
    );
  }


export default BanCards;
