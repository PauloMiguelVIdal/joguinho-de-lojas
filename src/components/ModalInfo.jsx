import { useContext, React, useState } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { motion, AnimatePresence } from "framer-motion";
import fechar from "../../public/outrasImagens/fechar.png";
import closeAudio from "../../public/sounds/closeAudio.mp3";
import useSound from "use-sound";
import imgTeste from "../../public/imagens/Armazém.png";

const ModalInfo = ({ isOpen, message }) => {
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);

  const [buttonCloseAudio] = useSound(closeAudio);

  const fecharModalInfo = () => {
    buttonCloseAudio();
    atualizarDados("modalAjuda", {
      ...dados.modalAjuda,
      estadoModal: false,
    });
  };

  const categorias = [
    { id: 1, nome: "Introdução", icone: "📖" },
    { id: 2, nome: "Como Jogar", icone: "🎮" },
    {
      id: 3,
      nome: "Recursos",
      icone: "📄",
      subsecoes: [
        { id: "3.1", nome: "Saldo Bancário", icone: "🏦" },
        { id: "3.2", nome: "Licenças", icone: "📜" },
        { id: "3.3", nome: "Empréstimos", icone: "💳" },
      ],
    },
    {
      id: 4,
      nome: "Empresas",
      icone: "🏢",
      subsecoes: [
        { id: "4.1", nome: "Companhia Local", icone: "🏪" },
        { id: "4.2", nome: "Corporação", icone: "🏭" },
        { id: "4.3", nome: "Conglomerado", icone: "🌐" },
      ],
    },
    {
      id: 5,
      nome: "Licenças",
      icone: "📜",
      subsecoes: [
        { id: "5.1", nome: "Licenças De Setores", icone: "🏭" },
        { id: "5.2", nome: "Licenças Empresariais", icone: "🌐" },
      ],
    },
    { id: 6, nome: "Edifícios Especiais", icone: "⭐", subsecoes: [
        { id: "6.1", nome: "Terraplanagem e Pavimentação", icone: "🚧" },
        { id: "6.2", nome: "Construtora de Pequenas Obras", icone: "🚧" },
        { id: "6.3", nome: "Construtora", icone: "🏗️" },
        { id: "6.4", nome: "Construtora de Grandes Infraestruturas", icone: "🏢 " },
      ],
    },
    { id: 7, nome: "Objetivos Do Jogo", icone: "🎯" },
    { id: 9, nome: "Despesas", icone: "💸",  subsecoes: [
        { id: "9.1", nome: "Despesas Fixas", icone: "⚙️" },
        { id: "9.2", nome: "Impostos Sobre Faturamento", icone: "🛃" },
        { id: "9.3", nome: "Imposto Anual", icone: "📉" },
      ]},
    { id: 10, nome: "Eventos", icone: "🎉",subsecoes: [
        { id: "10.1", nome: "Imposto fixo", icone: "💳" },
        { id: "10.2", nome: "Custo de construção", icone: "💵" },
        { id: "10.3", nome: "Imposto Anual", icone: "📈" },
      ] },
    { id: 11, nome: "Banco", icone: "🏦", subsecoes: [
        { id: "11.1", nome: "Cartão", icone: "💳" },
        { id: "11.2", nome: "Empréstimo", icone: "💵" },
        { id: "11.3", nome: "Investimentos", icone: "📈" },
      ],},
    { id: 12, nome: "Economia", icone: "📈" ,subsecoes: [
        { id: "12.1", nome: "Economia Global", icone: "💳" },
        { id: "12.2", nome: "Economia De Setores", icone: "💵" },
      ],},

    { id: 8, nome: "Dicas", icone: "💡" },
  ];

  const [categoriaAtiva, setCategoriaAtiva] = useState(1);
  const [subsecaoAtiva, setSubsecaoAtiva] = useState(null);
  const [categoriasExpandidas, setCategoriasExpandidas] = useState([]);

  // Função para selecionar categoria ou subseção
  const selecionarItem = (catId, subsecaoId = null) => {
    const categoria = categorias.find((c) => c.id === catId);

    // Se clicou em uma categoria diferente, fecha todas as outras
    if (catId !== categoriaAtiva) {
      // Se a nova categoria tem subseções, expande ela
      if (categoria?.subsecoes) {
        setCategoriasExpandidas([catId]);
      } else {
        setCategoriasExpandidas([]);
      }
      setSubsecaoAtiva(null);
    } else {
      // Se clicou na mesma categoria
      if (subsecaoId) {
        // Se clicou em uma subseção, apenas atualiza a subseção ativa
        setSubsecaoAtiva(subsecaoId);
      } else {
        // Se clicou na categoria principal, alterna a expansão
        if (categoria?.subsecoes) {
          if (categoriasExpandidas.includes(catId)) {
            setCategoriasExpandidas(
              categoriasExpandidas.filter((id) => id !== catId)
            );
          } else {
            setCategoriasExpandidas([catId]);
          }
        }
        setSubsecaoAtiva(null);
      }
    }

    setCategoriaAtiva(catId);
  };

  // Conteúdo para cada categoria e subseção
  const conteudos = {
    1: {
      titulo: "Bem-vindo ao Jogo!",
      texto:
        "Este é um jogo de simulação empresarial onde você constrói e gerencia seu império de negócios. Comece pequeno, expanda suas operações e torne-se o maior empresário da cidade!",
    },
    2: {
      titulo: "Como Jogar",
      texto:
        "Use os menus laterais para navegar entre diferentes seções. Gerencie seus recursos, tome decisões estratégicas e invista sabiamente para expandir seus negócios. Fique atento às oportunidades que surgem!",
    },
    3: {
      titulo: "Recursos do Jogo",
      texto:
        "O jogo oferece diversos recursos financeiros e administrativos para gerenciar seu império empresarial. Cada recurso tem sua importância estratégica:\n\n💰 Saldo Bancário - Seu dinheiro disponível\n📜 Licenças - Autorizações para operar\n💳 Empréstimos - Capital para investimentos\n\nClique nas subseções ao lado para saber mais detalhes sobre cada recurso!",
    },
    3.1: {
      titulo: "💰 Saldo Bancário",
      texto:
        "O saldo bancário é seu dinheiro disponível para realizar investimentos, pagar despesas e expandir seus negócios.\n\n📊 Como funciona:\n• Receba lucros das suas empresas automaticamente\n• Use para comprar novos negócios e upgrades\n• Mantenha sempre uma reserva de emergência\n• O saldo é atualizado em tempo real\n\n⚠️ Dica: Nunca deixe seu saldo zerar! Mantenha pelo menos 20% como reserva de segurança.",
    },
    3.2: {
      titulo: "📜 Licenças",
      texto:
        "Licenças são autorizações necessárias para operar determinados tipos de negócios e realizar expansões.\n\n📋 Tipos de Licenças:\n• Licença Comercial - Negócios básicos\n• Licença Industrial - Fábricas e produção\n• Licença Internacional - Operações globais\n\n🔓 Como obter:\n• Comprando na seção de Licenças\n• Desbloqueando através de conquistas\n• Recebendo como recompensa de eventos\n\n💡 Cada licença abre novas oportunidades de negócios!",
    },
    3.3: {
      titulo: "💳 Empréstimos",
      texto:
        "Empréstimos permitem que você obtenha capital rapidamente para realizar grandes investimentos.\n\n💰 Como funcionam:\n• Solicite empréstimos de diferentes valores\n• Pague juros mensais sobre o valor\n• Prazo de pagamento variável\n• Taxa de juros depende do seu histórico\n\n⚠️ Cuidado:\n• Use com sabedoria - juros acumulam rápido\n• Não pegue mais empréstimos do que pode pagar\n• Priorize pagar empréstimos com juros mais altos\n\n✅ Ideal para: Aproveitar oportunidades urgentes ou acelerar expansões estratégicas.",
    },
    4: {
      titulo: "Tipos de Empresas",
      texto:
        "Você pode gerenciar diferentes tipos de empresas, cada uma com características únicas. Comece pequeno e evolua:\n\n🏪 Companhia Local - Negócios de bairro\n🏭 Corporação - Operações regionais\n🌐 Conglomerado - Império internacional\n\nClique nas subseções para entender melhor cada tipo!",
    },
    4.1: {
      titulo: "🏪 Companhia Local",
      texto:
        "A Companhia Local é o ponto de partida perfeito para novos empresários!\n\n✨ Características:\n• Baixo custo inicial\n• Retorno estável e previsível\n• Fácil de gerenciar\n• Ideal para aprender o jogo\n\n🎯 Benefícios:\n• Gera renda passiva constante\n• Menos riscos financeiros\n• Base sólida para crescimento\n\n🚀 Expansão:\n• Companhia Local → Libera +1 slot de cartão de crédito\n• Total de 2 slots após expansão\n\n💡 Perfeita para construir sua base econômica!",
    },
    4.2: {
      titulo: "🏭 Corporação Multissetorial",
      texto:
        "A Corporação representa o próximo nível em seu império empresarial!\n\n✨ Características:\n• Operações em múltiplos setores\n• Maior capacidade de lucro\n• Requer gestão estratégica\n• Acesso a mercados regionais\n\n🎯 Vantagens:\n• Diversificação de receitas\n• Maior resistência a crises\n• Sinergias entre setores\n\n🚀 Expansão:\n• Corporação → Libera +1 slot de cartão de crédito\n• Total de 3 slots após expansão\n\n⚠️ Requer: Experiência em gestão e capital significativo",
    },
    4.3: {
      titulo: "🌐 Conglomerado Internacional",
      texto:
        "O nível máximo de expansão empresarial - domine mercados globais!\n\n✨ Características:\n• Operações em vários países\n• Lucros massivos potenciais\n• Gestão complexa e desafiadora\n• Influência no mercado global\n\n🎯 Vantagens:\n• Receitas em múltiplas moedas\n• Acesso a recursos exclusivos\n• Prestigio e reconhecimento\n• Bônus de marca global\n\n💼 Desafios:\n• Gestão de múltiplos mercados\n• Flutuações cambiais\n• Competição internacional\n\n🏆 Para mestres da gestão empresarial!",
    },
    5: {
      titulo: "Introdução às Licenças",
      texto:
        "As Licenças permitem que você expanda seu negócio para novos setores do jogo (Licenças de Setores) ou amplie a capacidade de crescimento interno da sua empresa (Licenças Empresariais).\n\nNo início da partida, é importante escolher cuidadosamente qual licença liberar.\nLembre-se: a licença apenas autoriza a construção de determinados edifícios, mas você ainda precisará possuir todos os recursos e requisitos necessários para concluí-los.\n\nPara acessar setores mais avançados, será necessário adquirir novas licenças, ampliando o seu alcance como empreendedor em diferentes áreas da economia.",
    },
    5.1: {
      titulo: "🏷️ Licenças de Setores",
      texto:
        "As Licenças de Setores permitem que você desbloqueie novos ramos da economia dentro do jogo. Cada setor possui seus próprios edifícios, cadeias produtivas e sinergias, tornando a escolha da licença uma decisão estratégica.\n\nAo adquirir uma licença, você apenas libera a possibilidade de construir aqueles edifícios — ainda será necessário possuir todos os requisitos e recursos para concluí-los.\n\n🔓 O que uma Licença de Setor libera:\n\n• Novos edifícios do setor\n• Cadeias produtivas exclusivas\n• Power-ups e sinergias específicas\n• Estratégias de expansão mais profundas\n\n💼 Como adquirir:\n1. Acesse o Dashboard.\n2. Selecione o setor desejado.\n3. Clique no ícone do papel com selo no canto superior direito.\n4. Todas as licenças disponíveis para aquele subsetor serão exibidas.\n\nCada licença possui um custo fixo e, após adquirida, libera imediatamente todos os edifícios daquele subsetor.\n\n🎯 Importância estratégica:\nAs Licenças de Setores controlam seu ritmo de progresso, incentivam variedade e evitam que você dependa apenas de um único edifício poderoso.",
    },
5.2: {
  titulo: "🏢 Licenças Empresariais",
  texto:
    "As Licenças Empresariais ampliam diretamente a capacidade estrutural da sua empresa, permitindo que você cresça de forma mais organizada e eficiente.\n\n🔧 O que elas expandem:\n\n• 🏗️ Quantidade máxima de um mesmo edifício\n• 🧱 Diversificação — quantidade de tipos diferentes de edifícios que você pode ter\n• 🏭 Quantidade de setores diferentes em que você pode atuar\n• 🏙️ Quantidade total de edifícios permitidos\n\n📇 Sistema de Cartões:\n\n• Você começa com apenas 1 cartão de crédito.\n• Ao atingir o porte Companhia Local, recebe +1 cartão.\n• Ao atingir o porte Companhia Nacional, recebe mais +1 cartão, totalizando 3 cartões de crédito.\n\n💼 Como adquirir:\n\n1. Acesse a aba Home.\n2. Clique no botão Licenças Empresariais.\n3. Selecione a licença desejada.\n\nTodas as licenças possuem custo fixo e aplicam seus efeitos imediatamente após a compra.",
},
 6: {
  titulo: "⭐ Edifícios Especiais",
  texto:
    "Os Edifícios Especiais são construções únicas que geram efeitos significativos no andamento da partida. Cada um deles oferece vantagens estratégicas que impactam diretamente a economia e o desenvolvimento da sua empresa.\n\n📍 Terraplanagem e Pavimentação\nEste edifício reduz o custo de construção de terrenos e plantações.\n\nEdifícios afetados:\n• Plantação de Grãos\n• Plantação de Vegetais\n• Pomares\n• Plantação de Eucalipto\n• Plantações de Plantas Medicinais\n• Área Florestal\n• Terreno de Mineração\n\n📊 Bônus por nível:\n• Nível 1: redução de 5% no custo de construção dos edifícios afetados\n• Nível 2: redução de 10%\n• Nível 3: redução de 15%\n\nEsses bônus tornam o edifício de Terraplanagem e Pavimentação uma escolha estratégica para jogadores que desejam focar em agricultura, mineração ou expansão territorial.",
},
 6.1: {
  titulo: "🚧 Terraplanagem e Pavimentação",
  texto:
    "Este edifício reduz o custo de construção de terrenos e plantações.\n\nEdifícios afetados:\n• Plantação de Grãos\n• Plantação de Vegetais\n• Pomares\n• Plantação de Eucalipto\n• Plantações de Plantas Medicinais\n• Área Florestal\n• Terreno de Mineração\n\n📊 Bônus por nível:\n• Nível 1: redução de 5% no custo de construção dos edifícios afetados\n• Nível 2: redução de 10%\n• Nível 3: redução de 15%\n\nEsses bônus tornam o edifício de Terraplanagem e Pavimentação uma escolha estratégica para jogadores que desejam focar em agricultura, mineração ou expansão territorial.",
},
6.2: {
  titulo: "🚧 Construtora de Pequenas Obras",
  texto:
    "Este edifício reduz o custo de construção de uma ampla variedade de empreendimentos de pequeno e médio porte.\n\nEdifícios afetados:\n• Fazenda Administrativa\n• Granja de Aves\n• Criação de Ovinos\n• Armazém\n• Silo\n• Depósito de Resíduos Orgânicos\n• Subestação de Energia\n• Estação de Carregamento\n• Feira\n• Loja de Móveis\n• Restaurantes\n• Livraria\n• Loja de Bebidas\n• Padaria\n• Açougue\n• Loja de Conveniência\n• Redes de Fast-Food\n• Petshop\n• Farmácias\n• Cafeteria\n• Loja de Departamentos\n• Loja de Calçados\n• Loja de Vestuário\n• Loja de Celulares\n• Loja de Eletrônicos\n• Cartório e Licenças\n• Terraplanagem e Pavimentação\n• Fábrica de Móveis\n• Fábrica de Rações\n• Fábrica de Embalagens\n• Fábrica de Bebidas\n• Fábrica de Pães\n• Fábrica de Calçados\n• Fábrica de Roupas\n• Fazenda de Vacas\n• Madeireira\n• Redes de Distribuição de Energia\n• Usina Solar\n• Fábrica de Turbinas Eólicas\n• Fábrica de Painéis Solares\n• Fábrica de Baterias\n• Centro de Reciclagem de Baterias\n• Parque Eólico\n• Mercado\n• Loja de Gadgets e Wearables\n• Loja de Games\n• Loja de Informática\n• Centro de Transporte e Entrega\n• Centros de Distribuição\n• Startup\n• Centro de Pesquisa Química\n• Construtora de Pequenas Obras\n• Escritório de Design de Interiores\n• Escritório de Arquitetura\n• Consultoria em Engenharia Civil\n• Fábrica Têxtil\n• Fábrica de Celulose\n• Fábrica de Papel\n• Fábrica de Livros\n• Empresa de Comércio Energético\n• Empresa de Consultoria Energética\n• Centro de Pesquisa em Energias Renováveis\n• Centro de Pesquisa em Eficiência Energética\n• Posto de Gasolina\n• Joalheria\n• Armazéns Logísticos\n• Servidores de Nuvem\n• Data Centers\n• Instituto de Tecnologia Alimentar\n• Centro de Pesquisa Agrícola\n• Imobiliária Residencial\n• Fábrica de Medicamentos\n\n📊 Bônus por nível:\n• Nível 1: redução de 5% no custo de construção dos edifícios afetados\n• Nível 2: redução de 10%\n• Nível 3: redução de 15%\n\nUm edifício extremamente versátil, reduzindo custos em múltiplas áreas e facilitando o crescimento geral da empresa.",
},
6.3: {
  titulo: "🏗️ Construtora",
  texto:
    "A *Construtora* reduz o custo de edificações de médio porte, essenciais para o avanço tecnológico, energético e comercial.\n\nEdifícios afetados:\n• Centro de Comércio de Plantações\n• Usina Termoelétrica\n• Concessionária de Veículos\n• Empresa de Desenvolvimento de Software\n• Empresa de Jogos Digitais\n• Empresa de Telecomunicações\n• Plataforma de Redes Sociais\n• Instituto de Biotecnologia\n• Laboratório de Nanotecnologia\n• Centro de Pesquisa em Eletrônicos\n• Laboratório de Design de Produtos\n• Laboratório de Novos Combustíveis\n• Centro de Pesquisa em Robótica\n• Construtora\n• Imobiliária Comercial\n• Mineradora\n• Centro de Coleta de Biomassa\n• Laboratório Farmacêutico\n• Indústria de Componentes Mecânicos\n• Fábrica de Chapas Metálicas\n• Fábrica de Estruturas Metálicas\n• Fábrica de Placas Eletrônicas\n• Usina Termelétrica Movida a Biocombustíveis\n• Usina de Biomassa\n• Marketplace Online\n• Plataforma de Streaming\n• Fábrica de Dispositivos Vestíveis\n• Centro de Engenharia Avançada\n• Centro de Pesquisa em Materiais Avançados\n• Centro de Pesquisa em Inteligência Artificial\n• Fábrica de Fertilizante\n• Fábrica de Plásticos\n• Fábrica de Químicos Especializados\n• Alto-Forno\n• Fábrica de Peças Automotivas\n• Fábrica de Eletrônicos\n• Centro de Pesquisa em Fusão Nuclear\n• Tanque de Armazenamento de Biocombustíveis\n• Fundição de Alumínio\n• Fábrica de Ligas Metálicas\n• Biofábrica\n• Empresa de Automação Industrial\n\n📊 Bônus por nível:\n• Nível 1: redução de 5% no custo dos edifícios afetados\n• Nível 2: redução de 10%\n• Nível 3: redução de 15%\n\nUma escolha estratégica para quem deseja fortalecer indústrias de média complexidade e acelerar avanços tecnológicos.",
},
6.4: {
  titulo: "🏢 Construtora de Grandes Infraestruturas",
  texto:
    "A *Construtora de Grandes Infraestruturas* reduz o custo de megaprojetos e edificações de altíssimo impacto, essenciais para a fase avançada do jogo.\n\nEdifícios afetados:\n• Cooperativa Agrícola\n• Shopping Popular\n• Transporte Petrolífero\n• Fábrica de Smartphones\n• Fábrica de Computadores\n• Fábrica de Consoles de Jogos\n• Centro de Pesquisa Aeroespacial\n• Mineradora de Pedras Preciosas\n• Mega Mercado\n• Prédio de Alto Padrão\n• Usina Siderúrgica\n• Montadora de Veículos Elétricos\n• Fábrica de Automóveis\n• Refinaria de Biocombustíveis\n• Refinaria\n• Fábrica de Navios\n• Usina Hidrelétrica\n• Construtora de Grandes Infraestruturas\n• Aeroportos\n• Mineradora de Minérios Radioativos\n• Plataforma de Petróleo\n• Fábrica de Chips\n• Fábricas de Semicondutores\n• Fábricas de Robôs\n• Fábrica de Motores\n• Fábrica de Aeronaves\n• Reator Nuclear Convencional\n• Usina de Fusão Nuclear\n• Shopping Center\n• Portos\n• Fábrica de Foguetes\n\n📊 Bônus por nível:\n• Nível 1: redução de 5% no custo dos edifícios afetados\n• Nível 2: redução de 10%\n• Nível 3: redução de 15%\n\nIndispensável para jogadores focados em megaprojetos, setores avançados e expansão massiva do império.",
},
    7: {
      titulo: "Conquistas",
      texto:
        "Complete desafios e desbloqueie conquistas especiais! Cada conquista oferece recompensas únicas que podem ajudar no seu progresso. Acompanhe seu progresso no menu de conquistas.",
    },
    8: {
      titulo: "Dicas Importantes",
      texto:
        "⭐ Comece investindo em negócios estáveis\n⭐ Não expanda muito rápido\n⭐ Mantenha sempre uma reserva de emergência\n⭐ Aproveite as oportunidades limitadas\n⭐ Diversifique seus investimentos",
    },
    9: {
      titulo: "Licenças",
      texto:
        "⭐ As Licenças permitem que você expanda seu negócio para novos setores do jogo.\n⭐ Não expanda muito rápido\n⭐ Mantenha sempre uma reserva de emergência\n⭐ Aproveite as oportunidades limitadas\n⭐ Diversifique seus investimentos",
    },
  };

  if (dados.modalAjuda.estadoModal) {
    return (
      <div className="flex h-screen absolute z-[40] w-screen bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex w-[95vw] max-w-[1200px] h-[85vh] rounded-[20px] border-[3px] border-[#883EF0] z-[100] bg-[#1a0438] m-auto overflow-hidden shadow-2xl shadow-purple-900/50 relative"
        >
          {/* Botão Fechar */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-br from-[#FF7A00] to-[#E56100] absolute top-[-15px] right-[-15px] w-[45px] h-[45px] flex justify-center items-center rounded-[12px] shadow-lg z-[100] border-2 border-white/20"
            onClick={fecharModalInfo}
          >
            <img src={fechar} alt="Fechar" className="w-[55%]" />
          </motion.button>

          {/* Menu Lateral */}
          <div className="w-[280px] bg-[#2a0a50] border-r-2 border-[#883EF0] p-4 overflow-y-auto">
            <h2 className="text-white text-[24px] font-bold mb-6 text-center bg-gradient-to-r from-[#883EF0] to-[#A473E9] py-3 rounded-lg">
              📚 Menu de Ajuda
            </h2>

            <div className="space-y-2">
              {categorias.map((cat) => (
                <div key={cat.id}>
                  {/* Botão principal da categoria */}
                  <motion.button
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => selecionarItem(cat.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 text-[16px] ${
                      categoriaAtiva === cat.id && !subsecaoAtiva
                        ? "bg-gradient-to-r from-[#883EF0] to-[#8F5ADA] text-white font-bold shadow-lg"
                        : "bg-[#350973] text-white/70 hover:bg-[#4a1080] hover:text-white"
                    }`}
                  >
                    <span className="text-[20px]">{cat.icone}</span>
                    <span className="flex-1">{cat.nome}</span>

                    {/* Indicador de subseções */}
                    {cat.subsecoes && (
                      <motion.span
                        animate={{
                          rotate: categoriasExpandidas.includes(cat.id)
                            ? 90
                            : 0,
                        }}
                        transition={{ duration: 0.2 }}
                        className="text-[16px]"
                      >
                        ▶
                      </motion.span>
                    )}

                    {/* Indicador de ativo sem subseções */}
                    {categoriaAtiva === cat.id &&
                      !subsecaoAtiva &&
                      !cat.subsecoes && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-[20px]"
                        >
                          ▶
                        </motion.span>
                      )}
                  </motion.button>

                  {/* Subseções (accordion) */}
                  {cat.subsecoes && categoriasExpandidas.includes(cat.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-4 mt-2 space-y-2 overflow-hidden"
                    >
                      {cat.subsecoes.map((sub) => (
                        <motion.button
                          key={sub.id}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => selecionarItem(cat.id, sub.id)}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-3 text-[14px] ${
                            subsecaoAtiva === sub.id
                              ? "bg-gradient-to-r from-[#A473E9] to-[#8F5ADA] text-white font-bold shadow-md"
                              : "bg-[#2a0a50] text-white/60 hover:bg-[#3a1060] hover:text-white/90"
                          }`}
                        >
                          <span className="text-[16px]">{sub.icone}</span>
                          <span className="flex-1">{sub.nome}</span>
                          {subsecaoAtiva === sub.id && (
                            <span className="text-[14px]">•</span>
                          )}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Área de Conteúdo */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={subsecaoAtiva || categoriaAtiva}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-[#350973] to-[#2a0a50] rounded-[20px] p-8 border-2 border-[#8F5ADA] shadow-xl"
                >
                  {/* Título */}
                  <h1 className="text-white text-[36px] font-bold mb-6 bg-gradient-to-r from-[#883EF0] to-[#A473E9] bg-clip-text text-transparent">
                    {conteudos[subsecaoAtiva || categoriaAtiva]?.titulo}
                  </h1>

                  {/* Conteúdo */}
                  <div className="text-white/90 text-[20px] leading-relaxed whitespace-pre-line">
                    {conteudos[subsecaoAtiva || categoriaAtiva]?.texto}
                  </div>

                  {/* Decoração */}
                  <div className="mt-8 pt-6 border-t border-[#8F5ADA]/30">
                    <p className="text-white/60 text-[16px] italic">
                      {subsecaoAtiva
                        ? "💡 Use o menu lateral para explorar outras subseções ou voltar à categoria principal."
                        : "💡 Use os botões laterais para navegar entre as diferentes seções de ajuda."}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Rodapé informativo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 bg-gradient-to-r from-[#883EF0]/20 to-[#A473E9]/20 rounded-lg p-4 border border-[#883EF0]/30"
              >
                <p className="text-white/70 text-[14px] text-center">
                  ⚡ Pressione ESC ou clique no botão ✕ para fechar esta janela
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
};

export default ModalInfo;
