import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import fechar from "../../public/outrasImagens/fechar.png";
import { Localizador } from "./localizador";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import alvo from "../../public/outrasImagens/alvo.png";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";


const RaffledBuildings = () => {
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  const [ModalObjOpen, setIsModalObjOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [campanhaSelecionada, setCampanhaSelecionada] = useState(null);

  const setoresArr = [
    "agricultura",
    "tecnologia",
    "comercio",
    "industria",
    "imobiliario",
    "energia",
  ];


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
        "Fábrica De Aeronaves"
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
        "Estaleiro"
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
        "Fábrica De Eletrônicos"
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
        "Fábrica De Livros"
    ];

    // Campanhas pré-definidas
    const Campanhas = [
        { nome: "Tesla", descricao: "Se torne um empreendedor no ramo de carros elétricos", obrigatorios: ["Montadora De Veículos Elétricos", "Fábrica De Baterias", "Estação De Carregamento"] },
        { nome: "Apple", descricao: "Se torne um empreendedor no ramo de celulares e computadores", obrigatorios: ["Fábrica De Smartphones", "Fábrica De Computadores", "Loja De Celulares"] },
        { nome: "SpaceX", descricao: "Se torne um empreendedor no ramo espacial", obrigatorios: ["Fábrica De Foguetes", "Centro De Pesquisa Aeroespacial", "Aeroporto"] },
        { nome: "AgroTech", descricao: "Domine a indústria agrícola moderna", obrigatorios: ["Cooperativa Agrícola", "Centro De Pesquisa Agrícola", "Plantação De Grãos", "Fazenda De Vacas"] },
        { nome: "Energia Sustentável", descricao: "Controle fontes de energia limpa", obrigatorios: ["Usina Solar", "Parque Eólico", "Centro De Pesquisa Em Energias Renováveis", "Usina De Fusão Nuclear"] },
        { nome: "Cidade Inteligente", descricao: "Desenvolva infraestrutura e serviços urbanos", obrigatorios: ["Shopping Center", "Posto De Combustíveis", "Rede De Distribuição Elétrica", "Estação De Carregamento"] },
        { nome: "Amazonia Tech", descricao: "Domine o mercado de varejo online e tecnologia", obrigatorios: ["Marketplace Online", "Data Center", "Centro De Distribuição", "Fábrica De Eletrônicos"] },
        { nome: "PetroGlobal", descricao: "Controle o mercado de energia e combustíveis fósseis", obrigatorios: ["Plataforma De Petróleo", "Refinaria", "Transporte Petrolífero", "Posto De Combustíveis"] }, //limpo
        { nome: "BioFuture", descricao: "Lidere a revolução da biotecnologia e energias renováveis", obrigatorios: ["Biofábrica", "Usina De Biomassa", "Instituto De Biotecnologia", "Refinaria De Biocombustíveis"] },
        { nome: "MetaVerse Inc", descricao: "Crie o império de entretenimento digital e realidade virtual", obrigatorios: ["Fábrica De Chips", "Plataforma De Streaming", "Empresa De Jogos Digitais", "Loja De Games"] },
        { nome: "ConstruMax", descricao: "Torne-se líder em construção e desenvolvimento urbano", obrigatorios: ["Construtora De Infraestruturas", "Construtora", "Imobiliária Comercial", "Prédio De Alto Padrão"] },  //////errado
        { nome: "HealthPlus", descricao: "Domine o mercado farmacêutico e de saúde", obrigatorios: ["Fábrica De Medicamentos", "Laboratório Farmacêutico", "Farmácia", "Plantação De Plantas Medicinais"] },
        { nome: "AutoGroup", descricao: "Lidere a indústria automotiva e de mobilidade", obrigatorios: ["Montadora De Veículos Elétricos", "Fábrica De Peças Automotivas", "Concessionária De Veículos", "Estação De Carregamento"] },
        { nome: "FoodNetwork", descricao: "Controle a cadeia produtiva de alimentos", obrigatorios: ["Cooperativa Agrícola", "Mega Mercado", "Restaurante", "Fábrica De Ração"] },
        { nome: "TechResearch", descricao: "Torne-se referência em pesquisa e desenvolvimento tecnológico", obrigatorios: ["Centro De Pesquisa Em IA", "Centro De Pesquisa Em Materiais Avançados", "Laboratório De Nanotecnologia", "Centro De Pesquisa Em Eletrônicos"] },
        { nome: "EcoPower", descricao: "Lidere a transição para energias renováveis", obrigatorios: ["Usina Solar", "Parque Eólico", "Fábrica De Painéis Solares", "Fábrica De Turbinas Eólicas"] },
        { nome: "SteelIndustry", descricao: "Domine a produção de aço e metais", obrigatorios: ["Alto-Forno", "Usina Siderúrgica", "Mineradora", "Fábrica De Estruturas Metálicas"] },
        { nome: "PetLove", descricao: "Crie o maior ecossistema de produtos para animais de estimação", obrigatorios: ["Petshop", "Fábrica De Ração", "Fazenda De Vacas", "Granja De Aves", "Centro De Distribuição", "Mercado", "Farmácia", "Fábrica De Medicamentos"] },
        { nome: "Home&Decor", descricao: "Domine o mercado de móveis e decoração para residências", obrigatorios: ["Loja De Móveis", "Fábrica De Móveis", "Madeireira", "Plantação De Eucalipto", "Escritório De Design De Interiores", "Centro De Distribuição", "Construtora", "Prédio De Alto Padrão"] },
        { nome: "EntregaExpress", descricao: "Monte a maior rede de logística e entregas do país", obrigatorios: ["Centro De Transporte E Entrega", "Centro De Distribuição", "Armazém Logístico", "Aeroporto", "Porto", "Marketplace Online", "Empresa De Telecomunicações", "Servidor Em Nuvem"] },
        { nome: "NetConnect", descricao: "Controle as redes de comunicação e telecomunicações", obrigatorios: ["Empresa De Telecomunicações", "Servidor Em Nuvem", "Plataforma De Redes Sociais", "Loja De Celulares"] },
        { nome: "EduTech", descricao: "Revolucione o mercado educacional com tecnologia", obrigatorios: ["Empresa De Desenvolvimento De Software", "Livraria", "Data Center", "Centro De Pesquisa Em IA"] },
        { nome: "Diamond Empire", descricao: "Domine o mercado de joias luxuosas e mineração de pedras preciosas", obrigatorios: ["Mineradora De Pedras Preciosas", "Joalheria", "Terreno De Mineração", "Laboratório De Design De Produtos", "Terraplanagem E Pavimentação", "Consultoria Em Engenharia Civil"] },
        { nome: "Construtora Elite", descricao: "Torne-se referência em construções de alto padrão e design sofisticado", obrigatorios: ["Fábrica De Móveis", "Prédio De Alto Padrão", "Escritório De Arquitetura", "Escritório De Design De Interiores", "Terraplanagem E Pavimentação"] },
        { nome: "Galaxy Tech", descricao: "Domine a tecnologia aeroespacial com foguetes, pesquisa avançada e propulsão", obrigatorios: ["Fábrica De Foguetes", "Fábrica De Motores", "Centro De Engenharia Avançada", "Centro De Pesquisa Em Materiais Avançados", "Centro De Pesquisa Em Robótica", "Laboratório De Novos Combustíveis", "Centro De Pesquisa Aeroespacial"] },
        { nome: "Naval Force", descricao: "Lidere a construção naval com estaleiros de ponta e engenharia avançada", obrigatorios: ["Estaleiro", "Centro De Pesquisa Em Materiais Avançados", "Centro De Engenharia Avançada", "Indústria De Componentes Mecânicos", "Fábrica De Estruturas Metálicas"] },
        { nome: "RoboTech", descricao: "Revolutionize a indústria com automação, robótica e inteligência artificial", obrigatorios: ["Fábrica De Robôs", "Fábrica De Placas Eletrônicas", "Fábrica De Chips", "Indústria De Componentes Mecânicos", "Centro De Pesquisa Em IA", "Centro De Pesquisa Em Eletrônicos", "Centro De Pesquisa Em Robótica", "Fábrica De Eletrônicos"] },
        { nome: "Verde & Papel", descricao: "Monte o ecossistema completo de produção de papel desde a floresta até as livrarias", obrigatorios: ["Fábrica De Celulose", "Fábrica De Papel", "Madeireira", "Área Florestal", "Plantação De Eucalipto", "Centro De Pesquisa Química", "Empresa De Automação Industrial", "Livraria"] },
        { nome: "AgroPower Brasil", descricao: "Domine toda a cadeia produtiva do agronegócio brasileiro, desde a plantação até a exportação", obrigatorios: ["Plantação De Grãos", "Plantação De Vegetais", "Cooperativa Agrícola", "Centro De Comércio De Plantações", "Fazenda Administrativa", "Armazém", "Silo", "Centro De Distribuição"] },
        { nome: "BioCombustíveis Nacional", descricao: "Lidere a produção de energia renovável a partir de biomassa e resíduos agrícolas", obrigatorios: ["Plantação De Grãos", "Plantação De Vegetais", "Depósito De Resíduos Orgânicos", "Centro De Coleta De Biomassa", "Refinaria De Biocombustíveis", "Usina Termelétrica A Biocombustíveis", "Biofábrica", "Fazenda Administrativa"] },
        { nome: "FarmaVerde", descricao: "Monopolize a produção de plantas medicinais e produtos farmacêuticos naturais", obrigatorios: ["Plantação De Plantas Medicinais", "Biofábrica", "Laboratório Farmacêutico", "Fábrica De Medicamentos", "Fábrica De Químicos Especializados", "Instituto De Biotecnologia", "Depósito De Resíduos Orgânicos", "Centro De Pesquisa Agrícola"] },
        { nome: "Madeira & Papel", descricao: "Controle a cadeia completa de produção madeireira e de papel", obrigatorios: ["Plantação De Eucalipto", "Madeireira", "Área Florestal", "Fábrica De Celulose", "Fábrica De Papel", "Fábrica De Móveis", "Terraplanagem E Pavimentação", "Fazenda Administrativa"] },
        { nome: "TecnoAgro", descricao: "Implemente a agricultura 4.0 com pesquisa de ponta e automação", obrigatorios: ["Centro De Pesquisa Agrícola", "Instituto De Biotecnologia", "Instituto De Tecnologia Alimentar", "Empresa De Automação Industrial", "Biofábrica", "Cooperativa Agrícola", "Armazém Logístico", "Fazenda Administrativa"] },
        { nome: "Shopping Brasil", descricao: "Domine o varejo nacional com shoppings populares e centers", obrigatorios: ["Shopping Center", "Shopping Popular", "Mega Mercado", "Loja De Departamentos", "Loja De Vestuário", "Loja De Calçados", "Restaurante", "Cafeteria"] },
        { nome: "TechMall", descricao: "Crie o maior centro de tecnologia e gadgets do país", obrigatorios: ["Loja De Eletrônicos", "Loja De Celulares", "Loja De Informática", "Loja De Games", "Loja De Gadgets E Wearables", "Fábrica De Smartphones", "Fábrica De Computadores", "Marketplace Online"] },
        { nome: "HealthCare Brasil", descricao: "Controle a cadeia completa de saúde e farmácias", obrigatorios: ["Farmácia", "Laboratório Farmacêutico", "Fábrica De Medicamentos", "Plantação De Plantas Medicinais", "Biofábrica", "Centro De Pesquisa Química", "Centro De Distribuição", "Instituto De Biotecnologia"] },
        { nome: "AutoShopping", descricao: "Integre concessionárias e centros automotivos", obrigatorios: ["Concessionária De Veículos", "Posto De Combustíveis", "Fábrica De Peças Automotivas", "Montadora De Veículos Elétricos", "Fábrica De Automóveis", "Centro De Distribuição", "Escritório De Design De Interiores", "Consultoria Em Engenharia Civil"] },
        { nome: "FashionStyle", descricao: "Torne-se líder no mercado de moda e vestuário", obrigatorios: ["Fábrica Textil", "Fábrica De Roupas", "Fábrica De Calçados", "Loja De Vestuário"] },
        { nome: "Átomo Avançado", descricao: "Lidere a revolução da energia nuclear com pesquisa de ponta e mineração radioativa", obrigatorios: ["Terreno De Mineração", "Mineradora Radioativa", "Usina De Fusão Nuclear", "Consultoria Em Engenharia Civil", "Centro De Pesquisa Em Fusão Nuclear", "Centro De Pesquisa Química"] },
        { nome: "Aço & Alumínio", descricao: "Monopolize a produção metalúrgica desde a mineração até a fabricação", obrigatorios: ["Alto-Forno", "Usina Siderúrgica", "Fundição De Alumínio", "Mineradora", "Terreno De Mineração"] },
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
          const edificio = dados[setor]?.edificios?.find((ed) => ed.nome === nome);
          if (edificio) return edificio;
        }
        return null;
      })
      .filter(Boolean);

    setSelectedItems(objetosSelecionados);
    setCampanhaSelecionada(campanhaNome); // Bloqueia seleção de outras campanhas
    atualizarDados("itensSorteados", { itensSorteados: nomesFinais });

    console.log(
      `🎯 Campanha: ${campanhaNome} | Edifícios selecionados:`,
      nomesFinais
    );
  };

  const fecharModal = () => setIsModalObjOpen(false);
  
if(dados.dia<270) return null;
if(dados.dia>=270){

  return (
    <div>
      <button
        onClick={() => setIsModalObjOpen(true)}
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
            <Tooltip
                id="saldo-tip"
                style={{
                  backgroundColor: "#FFFFFF",   // fundo branco
                  color: "#350973",            // texto roxo
                  border: "1px solid #350973", // borda fina
                  borderRadius: "6px",         // cantos arredondados
                  padding: "6px 10px",         // espaçamento interno
                  fontWeight: "600",           // deixa a fonte mais destacada
                  fontSize: "14px"
                }}/>
      {ModalObjOpen && (
        <div className="flex justify-center items-center z-50 bg-black bg-opacity-90 w-[100vw] h-[100vh] fixed top-0 left-0 select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-[90vw] max-w-[1600px] h-[90vh] bg-[#1a0a3b] rounded-[20px] z-20 relative flex flex-col"
            >
            <button
              className="bg-laranja absolute top-[-20px] right-[-20px] w-[40px] h-[40px] flex justify-center items-center rounded-[10px] hover:bg-[#E56100] active:scale-95"
              onClick={fecharModal}
              >
              <img src={fechar} alt="Fechar" className="w-[60%]" />
            </button>

            <h1 className="text-center text-white py-4 text-[30px] fonteBold">
              Objetivos do jogo
            </h1>

            <div className="w-[60%] h-[10px] bg-gradient-to-l from-[#F27405] to-[#6A00FF] rounded-[5px] mx-auto mb-6"></div>

            <div className="overflow-y-auto flex-1 px-8 py-6 space-y-6 flex flex-col items-center">
              {/* 🔹 Mostrar opções somente se nenhuma campanha foi selecionada */}
              {!campanhaSelecionada &&
                getRandomItems(Campanhas, 3).map((c, i) => (
                  <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col md:flex-row items-center justify-between bg-[#2a0f50] rounded-2xl p-6 w-full max-w-[1400px]"
                  >
                    <div className="flex -space-x-6 h-[230px] mb-4 md:mb-0">
                      {c.obrigatorios.map((nome, j) => (
                        <div key={j} className="w-[90px] h-[120px]">
                          {Localizador(nome)}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col justify-evenly text-center md:text-left w-full md:w-[35%] gap-4">
                      <div className="w-full py-2 px-4 rounded-xl bg-white/10 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold text-white">{c.nome}</h2>
                      </div>

                      <p className="text-sm text-white">{c.descricao}</p>

                      <button
                        onClick={() => gerarCampanha(c.nome)}
                        className="bg-gradient-to-r from-[#F27405] to-[#6A00FF] text-white px-6 py-2 rounded-xl font-bold hover:scale-105 transition-transform duration-200 shadow-md"
                        >
                        Selecionar
                      </button>
                    </div>
                  </motion.div>
                ))}

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
                      transition={{ delay: i * 0.1, type: "spring", stiffness: 120 }}
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
};

export default RaffledBuildings;
