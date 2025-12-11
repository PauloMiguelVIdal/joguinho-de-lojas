import { useContext, React, useState } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { motion, AnimatePresence } from "framer-motion";
import fechar from "../../public/outrasImagens/fechar.png";
import closeAudio from "../../public/sounds/closeAudio.mp3";
import useSound from "use-sound";
import imgTeste from "../../public/imagens/Armazém.png";
import { SquaresIntersect } from "lucide-react";

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
    { id: 17, nome: "Primeiros 270 Dias", icone: "⌛" },
    { id: 22, nome: "Guia Inicial, dia 271", icone: "📘 " },
    { id: 19, nome: "Dicas Avançadas", icone: "🚀" },
    {
      id: 20,
      nome: "Mapa Dos Setores",
      icone: "🗺️",
      subsecoes: [
        { id: "20.1", nome: "Mapa Do Comércio", icone: "🛒" },
        { id: "20.2", nome: "Mapa Do Imobiliário", icone: "🏢" },
        { id: "20.3", nome: "Mapa Da Energia", icone: "⚡" },
        { id: "20.4", nome: "Mapa Da Teconologia", icone: "🧑‍💻" },
        { id: "20.5", nome: "Mapa Da Indústria", icone: "🏭" },
        { id: "20.6", nome: "Mapa Da Agricultura", icone: "🌱" },
      ],
    },
    // {
    //   id: 3,
    //   nome: "P",
    //   icone: "📄",
    //   subsecoes: [
    //     { id: "3.1", nome: "Saldo Bancário", icone: "🏦" },
    //     { id: "3.2", nome: "Licenças", icone: "📜" },
    //     { id: "3.3", nome: "Empréstimos", icone: "💳" },
    //   ],
    // },
    // {
    //   id: 4,
    //   nome: "Empresas",
    //   icone: "🏢",
    //   subsecoes: [
    //     { id: "4.1", nome: "Companhia Local", icone: "🏪" },
    //     { id: "4.2", nome: "Corporação", icone: "🏭" },
    //     { id: "4.3", nome: "Conglomerado", icone: "🌐" },
    //   ],
    // },
    {
      id: 5,
      nome: "Licenças",
      icone: "📜",
      subsecoes: [
        { id: "5.1", nome: "Licenças De Setores", icone: "🏭" },
        { id: "5.2", nome: "Licenças Empresariais", icone: "🌐" },
      ],
    },

    { id: 7, nome: "Objetivos Do Jogo", icone: "🎯" },
    {
      id: 9,
      nome: "Despesas",
      icone: "💸",
      subsecoes: [
        { id: "9.1", nome: "Imposto fixo", icone: "⚙️" },
        { id: "9.2", nome: "Impostos Sobre Faturamento", icone: "🛃" },
        { id: "9.3", nome: "Imposto Anual", icone: "📉" },
      ],
    },
    {
      id: 10,
      nome: "Eventos",
      icone: "🌪️",
      subsecoes: [
        { id: "10.1", nome: "Faturamento", icone: "📈" },
        { id: "10.2", nome: "Imposto fixo", icone: "🧾" },
        { id: "10.3", nome: "Imposto sobre faturamento", icone: "🧾" },
        { id: "10.4", nome: "Custo de construção", icone: "🧱" },
        { id: "10.5", nome: "Imposto Anual", icone: "🧾" },
      ],
    },
    {
      id: 11,
      nome: "Banco",
      icone: "🏦",
      subsecoes: [
        { id: "11.1", nome: "Cartão", icone: "💳" },
        { id: "11.2", nome: "Empréstimo", icone: "💵" },
        { id: "11.3", nome: "Investimentos", icone: "📈" },
      ],
    },
    {
      id: 12,
      nome: "Economia",
      icone: "📈",
      subsecoes: [
        { id: "12.1", nome: "Economia Global", icone: "🌐" },
        { id: "12.2", nome: "Economia De Setores", icone: "🏭" },
      ],
    },
    {
      id: 13,
      nome: "Informações de Edifícios",
      icone: "ℹ️",
      subsecoes: [
        { id: "13.1", nome: "Imóveis Necessários ", icone: "🧱" },
        { id: "13.2", nome: "Edifícios Necessários", icone: "🏢" },
        { id: "13.3", nome: "Power Ups", icone: "⚡" },
        { id: "13.4", nome: "Informações Financeiras", icone: "💲" },
        { id: "13.5", nome: "Rentabilidade", icone: "📊 " },
        { id: "13.6", nome: "Preço de Construção", icone: "💰" },
      ],
    },
    {
      id: 14,
      nome: "Carteira",
      icone: "💼",
    },
    {
      id: 15,
      nome: "Central de Gerenciamento",
      icone: "🧑‍💼",
    },
    {
      id: 16,
      nome: "Gráfico",
      icone: "📈",
    },
    {
      id: 6,
      nome: "Edifícios Especiais",
      icone: "⭐",
      subsecoes: [
        { id: "6.1", nome: "Terraplanagem e Pavimentação", icone: "🚧" },
        { id: "6.2", nome: "Construtora de Pequenas Obras", icone: "🚧" },
        { id: "6.3", nome: "Construtora", icone: "🏗️" },
        {
          id: "6.4",
          nome: "Construtora de Grandes Infraestruturas",
          icone: "🏢 ",
        },
      ],
    },

    { id: 18, nome: "Valores de mercado", icone: "💹" },
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
      titulo: "🎯 Objetivos do Jogo",
      texto:
        "Os objetivos definem o rumo da sua estratégia dentro do jogo. Ao chegar no dia 270, você será obrigado a selecionar quais edifícios precisará construir para vencer a partida. Esses objetivos fornecem uma direção clara sobre quais setores ou caminhos você deve priorizar a partir desse ponto.\n\n📌 Como acessar os seus objetivos:\nNa barra superior, toque no botão 🎯 para abrir a interface dedicada aos seus objetivos.\n\n💡 Dica estratégica:\nNão tente cumprir os objetivos imediatamente no início. Primeiro, busque estabilidade financeira — foque em construir uma base sólida de renda. Depois, adquira as licenças necessárias e vá se adaptando às mudanças da economia para alcançar seus objetivos com mais segurança.",
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

    9.1: {
      titulo: "💸 Imposto Fixo",
      texto:
        'O 💸 **Imposto Fixo** representa a soma de todos os custos mensais da sua empresa. Esse valor é atualizado sempre que você compra um novo edifício, porém não sofre oscilações com a economia — permanecendo estável após cada atualização.\n\n⚠️ **Atenção nas crises econômicas**\nDurante períodos de 📉 recessão, o Imposto Fixo pode se tornar seu maior vilão, já que ele continua sendo cobrado mesmo quando seus lucros diminuem.\n\n🧾 **Como pagar o Imposto Fixo**\nA cada 30 dias, você deve pagar suas despesas mensais tocando no botão **🧾 Pagar Despesas Mensais**, localizado no canto superior direito do dashboard.\n\n🖱️ **Dica:**\nPasse o mouse sobre o botão "Pagar Despesas Mensais" para visualizar um resumo detalhado de todos os custos daquele mês, incluindo a origem de cada despesa.',
    },
    9.2: {
      titulo: "📊 Imposto sobre Faturamento",
      texto:
        'O 📊 **Imposto sobre Faturamento** é um percentual aplicado ao faturamento diário de cada edifício e pode ser consultado na aba de Informações Financeiras de cada um deles.\n\nEmbora seja um imposto relativamente simples, ele pode ter grande impacto em edifícios que geram faturamentos muito altos. Por isso, fique sempre atento: em alguns casos, esse imposto pode consumir uma parcela significativa do seu lucro mensal.\n\n🧾 **Pagamento do Imposto sobre Faturamento**\nAssim como o Imposto Fixo, o Imposto sobre Faturamento é cobrado a cada 30 dias. Para pagá-lo, basta tocar no botão **🧾 Pagar Despesas Mensais**, localizado no canto superior direito do dashboard.\n\n🖱️ **Dica:**\nAo passar o mouse sobre o botão "Pagar Despesas Mensais", você verá um resumo completo das despesas do mês — incluindo quanto foi cobrado de Imposto sobre Faturamento e de onde cada custo se originou.',
    },
    9.3: {
      titulo: "🗓️ Imposto Anual",
      texto:
        "O 🗓️ **Imposto Anual** é um tributo cobrado a cada 360 dias (1 ano completo dentro do jogo). Cada edifício possui seu próprio percentual de imposto anual baseado no patrimônio que ele gera dentro do setor correspondente.\n\n🔄 **Como ele é calculado**\nTodos os meses, uma fração desse imposto é somada ao total anual. No fim do ano, você deverá pagar o valor acumulado. Por isso, é essencial acompanhar como cada setor está tributando seu patrimônio.\n\n⚠️ **Atenção nos últimos meses do ano**\nDurante o último ciclo econômico (os últimos 3 meses do ano), é recomendado evitar grandes investimentos e focar em acumular caixa. Isso ajuda a evitar surpresas desagradáveis quando chegar o momento de pagar o imposto anual.\n\n📊 **Como verificar o percentual praticado por cada setor**\nNo dashboard, abra o setor desejado. Na parte superior, você verá o símbolo **🧾** seguido do percentual correspondente ao imposto anual daquele setor.\n\nFique sempre atento — setores com impostos altos podem comprometer significativamente sua economia anual.",
    },
    10: {
      titulo: "🌪️ Eventos",
      texto:
        "Os Eventos são o coração das mudanças do jogo. Eles provocam efeitos permanentes e alteram diretamente a economia, custos e impostos. No entanto, cada evento ocupa um espaço temporário, impedindo que novos eventos sejam sorteados até que ele expire.\n\n📍 Onde visualizar os eventos ativos?\nNo Dashboard, no canto inferior direito da barra lateral direita. Sempre que ocorre uma mudança, uma janela informativa aparece mostrando a alteração.\n\n🔄 Tipos de eventos\n📆 Até o dia 269 podem ocorrer:\n\n📈 Faturamento\n🧾 Imposto Fixo\n💸 Imposto sobre Faturamento\n🧱 Custo de Construção\n\n📆 Após o dia 270 podem ocorrer:\n\n🧱 Custo de Construção\n🧾 Imposto Anual\n\nPara ver detalhes de cada evento, acesse a aba lateral de Eventos.",
    },
    10.1: {
      titulo: "📈 Faturamento",
      texto:
        "🔒 Disponível apenas até o dia 269.\nEste evento altera o faturamento base de um dos imóveis:\n🏡 Terreno | 🏠 Imóvel Pequeno | 🏢 Imóvel Médio | 🏭 Imóvel Grande\n➡️ O impacto é direto na rentabilidade do imóvel durante os 269 primeiros dias.\n\n",
    },
    10.2: {
      titulo: "🧾 Imposto fixo",
      texto:
        "🔒 Disponível apenas até o dia 269.\nAltera o imposto fixo mensal de:\n🏡 Terreno | 🏠 Imóvel Pequeno | 🏢 Imóvel Médio | 🏭 Imóvel Grande\n➡️ Afeta a rentabilidade bruta desses imóveis nos primeiros 269 dias.",
    },
    10.3: {
      titulo: "💸 Imposto sobre faturamento",
      texto:
        "🔒Disponível apenas até o dia 269.\nAltera o imposto sobre faturamento de:\n🏡 Terreno | 🏠 Imóvel Pequeno | 🏢 Imóvel Médio | 🏭 Imóvel Grande\n\nAltera o percentual de imposto cobrado sobre o faturamento dos imóveis.\n➡️ Impacto direto na rentabilidade diária até o dia 269.",
    },
    10.4:{
      titulo: "🧱 Custo de construção",
      texto:"🔥 ÚNICO evento presente durante TODO o jogo.\nAltera o custo para construir:\n🏡 Terrenos | 🏠 Imóvel P | 🏢 Imóvel M | 🏭 Imóvel G\n\n📌 Impactos:\nAté dia 269 → afeta apenas imóveis básicos\nApós dia 270 → afeta todos os edifícios avançados, tornando-se o evento mais importante e mais impactante do jogo\n✨ Se ocorrer redução de custos, é uma oportunidade rara e extremamente valiosa.\n\n"
    },10.5:{
      titulo: "🧾 Imposto Anual",
      texto:"🔓 Disponível apenas após o dia 270.\nAltera o imposto anual dos setores:\n🌾 Agricultura | ⚙️ Indústria | 🧬 Tecnologia | 🏬 Comércio | 🏠 Imobiliário | ⚡ Energia\n\n⚠️ Importante acompanhar:\nValor inicial do imposto do setor\nValor atual modificado pelo evento\nAssim você sabe se está sendo beneficiado ou prejudicado.\n\n📊 Valores Base — Imposto Anual por Setor\n🌾 Agricultura — 1,67% ao mês\n⚡ Energia — 1,67% ao mês\n🏬 Comércio — 1,83% ao mês\n🏠 Imobiliário — 1,83% ao mês\n🧬 Tecnologia — 2,00% ao mês\n⚙️ Indústria — 2,00% ao mês\n\n📉 Da maior oscilação para a menor:\n🏬 Comércio\n⚙️ Indústria\n🏠 Imobiliário\n🧬 Tecnologia\n🌾 Agricultura\n⚡ Energia\n\n📌 Para visualizar o imposto atual:\nAcesse o Dashboard, clique no setor → no topo haverá o ícone 🧾 com a taxa atual."
    },
    11:{titulo: "🏦 Banco"
      ,texto:"📅 Disponível apenas após o dia 270.\n\nPara acessar:\n➡️ Home → Ícone do Banco (parte superior direita da interface central)\n\nDentro do banco você verá:\n💳 Quantos cartões possui\n🪪 Quantos slots estão disponíveis\n📝 Propostas de cartões de cada banco\n\n🏦 COMO ESCOLHER UM BANCO\n\nEscolha o banco conforme sua estratégia de jogo. Cada banco oferece vantagens diferentes:\n\n💰 Maior valor de empréstimo → normalmente com juros maiores\n📉 Menor taxa de juros\n📈 Melhor rendimento em investimentos\n\n✔️ O valor do empréstimo depende:\n→ do seu patrimônio total × multiplicador do banco.\n\n"
    },
    11.1:{
      titulo: "💳 Cartão de crédito",
      texto:"Cada cartão oferece um tipo de vantagem:\n💳 Cartão com maior limite\n📉 Cartão com menor taxa de juros\n📈 Cartão com melhor taxa de investimento\n\n📌 Recomendações gerais:\nPara empréstimos altos → Mega Credit\nPara juros baixos → Energy Bank\nPara investimentos → Crypto Bank\n\n"
    },
11.2:{
  titulo: "💵 Empréstimos",
  texto:"O empréstimo é um dos recursos mais poderosos do jogo. Serve para:\n📈 Aproveitar aquecimento econômico\n🏚️ Fugir da falência em recessões\n🚀 Acelerar crescimento estratégico\n\nQuanto maior seu patrimônio, maiores serão os valores liberados.\n\nComo pegar um empréstimo:\nVá na Home\nClique no cartão (barra lateral esquerda)\nAbra o banco\nVá na aba Empréstimos\nSelecione:\n💵 Valor do empréstimo\n📅 Número de parcelas\nClique em Solicitar Empréstimo\n✔️ Todos os empréstimos ativos ficam visíveis na barra lateral.\n\n"
},
11.3:{
  titulo:" 📈 Investimentos",
texto:"O banco oferece dois tipos:\n\n🟦 1. Investimento Pré-Fixado\nVocê define uma data de resgate\nRecebe o valor + lucro ao final\nSe retirar antes → perde parte do lucro\n\n🟩 2. Investimento Pós-Fixado\nNão tem data fixa\nA cada 30 dias o investimento gera rendimento\nPode retirar sem perder lucro acumulado\n\n📌 Recomenda-se investir quando:\nOs setores onde você joga estão em recessão\nVocê não quer arriscar a compra de um novo edifício\n✨ O objetivo do investimento não é enriquecer, mas proteger o patrimônio."
},
12:{
  titulo:" Economia",
texto:"A economia é o termômetro que define as mudanças e os rumos do jogo, podendo trazer uma maré de sorte ou de azar. Seus efeitos são totalmente aleatórios, tornando cada partida imprevisível."

},
12.1:{
  título:"Economia Global",
  texto:"🌐 ECONOMIA GLOBAL\n\nA Economia Global define a chance de ocorrerem eventos positivos ou negativos durante a partida.\nSempre que a economia entra em recessão, aumentam as probabilidades de surgirem eventos prejudiciais, capazes de alterar completamente o rumo do jogo — especialmente para quem estiver despreparado.\n\n🔄 Ciclo da Economia Global\nA cada 90 dias, uma nova economia global é sorteada aleatoriamente, sem padrão ou tendência.\nIsso força o jogador a acompanhar o cenário constantemente e ajustar sua estratégia conforme as mudanças.\n\n📍 Onde ver a Economia Global?\nEla aparece no topo da tela com o ícone de globo 🌐, que muda de cor de acordo com o estado econômico:\n\nCor\tEstado\tProbabilidades\n🟩 Verde escuro\tEconomia aquecida\t65% eventos positivos • 35% negativos\n🟩 Verde claro\tEconomia progressiva\t55% positivos • 45% negativos\n🟨 Amarelo\tEconomia estável\t50% positivos • 50% negativos\n🟧 Laranja claro\tEconomia em declínio\t45% positivos • 55% negativos\n🟥 Vermelho\tEconomia recessiva\t35% positivos • 65% negativos\n\n💡 Resumo prático:\nQuanto mais “quente” a economia → mais chances de bônus.\nQuanto mais “fria” → maior risco de prejuízos."
},
12.2:{
  título:" Economia Setorial",
texto:"🏭 ECONOMIA DE SETORES\n\nA Economia de Setor define o faturamento final dos edifícios.\nQuando um setor entra em recessão, seu faturamento cai drasticamente — podendo comprometer todo o planejamento econômico do jogador.\n\n🔄 Ciclo da Economia Setorial\nAssim como a global, ela muda a cada 90 dias, de forma totalmente aleatória, exigindo constante adaptação estratégica.\n\n📊 Modificadores de Faturamento por Estado Econômico\n\nEstado\tModificador\n🟥 Recessão\t40% do faturamento\n🟧 Declínio\t80% do faturamento\n🟨 Estável\t100% do faturamento\n🟩 Progressiva\t110% do faturamento\n🟩 Aquecida\t125% do faturamento\n\n💡 Ou seja: o mesmo edifício pode variar MUITO seu desempenho dependendo da saúde do setor.\n\n📉 Oscilação dos Setores\n\nAlém dos modificadores acima, cada setor possui um nível próprio de instabilidade, o que influencia a variação da rentabilidade ao longo do jogo.\n\n📉 Da maior oscilação para a menor:\n\n🏬 Comércio — o mais volátil\n\n⚙️ Indústria\n\n🏠 Imobiliário\n\n🧬 Tecnologia\n\n🌾 Agricultura\n\n⚡ Energia — o mais estável"
},

    13: {
      titulo: "ℹ️ Informações de Edifícios",
      texto:
        "Lembre-se: estas informações se aplicam apenas às cartas de edifícios exibidas no Dashboard.\n\nFique atento: se houver uma bolinha branca em qualquer botão da aba de requisitos, como Imóveis Necessários ou Edifícios Necessários, isso significa que você ainda não possui todos os requisitos para realizar a construção desejada.",
    },
    13.1: {
      titulo: "🧱 Imóveis Necessários ",
      texto:
        "Lembre-se: esta seção se refere apenas aos imóveis exigidos pelas cartas de edifícios presentes no Dashboard.\n\nPara verificar quais imóveis são exigidos para construir um determinado edifício, basta tocar no botão com o símbolo de terreno. Isso abrirá uma interface detalhada mostrando a quantidade de cada imóvel necessária, além do valor total para adquirir todos eles.\n\nFique atento: se uma bolinha branca aparecer no botão de Imóveis Necessários, significa que ainda está faltando comprar um ou mais imóveis essenciais para liberar a construção.",
    },
    13.2: {
      titulo: "🏢 Edifícios Necessários",
      texto:
        "Ao tocar no botão de Edifícios Necessários dentro da carta do edifício (lembre-se: isso se refere apenas às cartas de edifícios do dashboard), você poderá visualizar dois tipos de requisitos: Construções Necessárias e Recursos de Construção.\n\n• Construções Necessárias são edifícios que você apenas precisa possuir para liberar a compra do edifício desejado. Por exemplo: para construir a Plantação de Grãos, é obrigatório já ter adquirido o Silo.\n\n• Recursos de Construção são edifícios que serão consumidos durante a construção de algo mais avançado — ou seja, eles deixam de existir após serem usados. Por exemplo: para construir uma Empresa de Desenvolvimento de Software, é necessário entregar uma Startup, já que ela funciona como a base evolutiva para esse novo edifício.\n\nSe estiver faltando qualquer um desses requisitos, uma bolinha branca aparecerá no botão de Edifícios Necessários para avisar que ainda há pendências antes que a construção seja liberada.",
    },
    13.3: {
      titulo: "⚡ Power Ups",
      texto:
        'Os Power Ups são responsáveis por gerar as sinergias entre os edifícios e aumentar sua rentabilidade ao atingir certos marcos de quantidade. Eles funcionam como melhorias progressivas que deixam sua empresa mais eficiente.\n\nPara acessar os Power Ups dentro da carta do edifício (📌 lembre-se: estamos falando apenas das cartas do dashboard), basta tocar no botão com a seta para cima ⬆️. Isso irá virar o card e mostrar informações básicas, incluindo quantos edifícios são necessários para que este edifício alcance o Nível 2 ⭐ ou Nível 3 ⭐⭐.\n\nSe quiser ver detalhes mais avançados, toque no botão "Todos os Power Ups" 📊. Isso abrirá uma interface completa com uma tabela contendo:\n• 🏭 Edifícios que ESTE fornece Power Ups\n• 🏢 Edifícios que ESTE recebe Power Ups\n• 📈 Níveis necessários para cada bônus\n• 📊 Percentuais acumulativos que afetam faturamento ou custo\n\nEsses efeitos são cumulativos e podem, por exemplo, reduzir o custo de operação ou aumentar o faturamento de outro edifício. Exemplo: se você possui a Fábrica de Pães 🍞, ela reduz o custo da Padaria 🥐 e, ao mesmo tempo, aumenta o faturamento dela.\n\nNa tabela, quando você possuir determinado edifício, a linha correspondente mudará de cor 🎨 para indicar o nível atual.\n\n💡 Dica: fique sempre atento aos edifícios que mais impactam o seu ecossistema atual. Comprar edifícios que fornecem bons Power Ups para aqueles que você já possui pode gerar vantagens enormes em rentabilidade 📈, melhorar sua estratégia e ajudar na gestão da sua empresa.',
    },

    13.4: {
      titulo: "💲 Informações Financeiras",
      texto:
        "As Informações Financeiras exibem todos os dados contábeis relacionados ao edifício (📌 apenas nas cartas do dashboard). Ao abrir essa interface, você poderá visualizar detalhes como:\n• 🧾 Imposto fixo do edifício\n• 💸 Imposto sobre faturamento\n• 📅 Faturamento diário\n• 📆 Faturamento mensal\n• 📉 Custos operacionais e outros dados importantes\n\nEssas informações ajudam você a entender exatamente como cada edifício contribui para a saúde financeira da sua empresa.",
    },
    13.5: {
      titulo: "📊 Rentabilidade",
      texto:
        "A rentabilidade exibida no dashboard é sempre calculada considerando um cenário econômico estável ⚖️. Porém, ela pode mudar dependendo da economia atual do setor.\n\nPara ver a rentabilidade real e atualizada daquele edifício (📌 lembrando: estamos falando das cartas do dashboard), basta abrir a interface de Licenças do setor correspondente 🏷️. Nessa tela, a rentabilidade é recalculada com base na economia setorial do momento — seja recessão 📉, estabilidade ⚖️ ou aquecimento 📈.\n\nAssim, você sempre terá uma visão fiel do desempenho real dos seus edifícios.",
    },
    13.6: {
      titulo: "💰 Preço de Construção",
      texto:
        'O Preço de Construção representa o valor necessário para erguer a estrutura do edifício (📌 lembrete: estamos falando das cartas do dashboard).\n\nEsse custo pode ser reduzido caso você possua alguns dos Edifícios Especiais capazes de diminuir gastos de construção 🏗️⬇️. São eles:\n• 🟫 Terraplanagem e Pavimentação\n• 🧱 Construtora de Pequenas Obras\n• 🏠 Construtora\n• 🏗️ Construtora de Grandes Infraestruturas\n\nCada um deles pode oferecer reduções progressivas conforme seu nível.\n\nSe quiser entender melhor como cada Edifício Especial funciona e quais custos eles reduzem, basta acessar a seção "⭐ Edifícios Especiais" aqui na aba de ajuda.',
    },
    14: {
      titulo: "💼 Carteira",
      texto:
        "A aba Carteira reúne todas as informações essenciais sobre a sua empresa e os edifícios que você possui no momento.\n\n📊 **Edifícios Atuais**\nAqui você pode visualizar todos os seus edifícios, junto com a rentabilidade atualizada baseada no cenário econômico dos setores naquele instante.\n\n🏢 **Informações Empresariais**\nNesta aba você também encontra um resumo completo do estado atual da sua empresa, incluindo:\n• 🔢 Quantidade máxima total de edifícios permitidos\n• 🏙️ Quantidade máxima de um único tipo de edifício\n• 🌐 Quantos setores diferentes você está habilitado a investir\n• 🧩 Diversidade máxima de edifícios permitida\n• 🏛️ Porte empresarial atual\n\nA Carteira funciona como um painel geral da sua expansão, ideal para acompanhar sua evolução, ajustar a estratégia e decidir seus próximos passos.",
    },
    15: {
      titulo: "🧑‍💼 Central de Gerenciamento",
      texto:
        "A Central de Gerenciamento é o local onde você pode administrar ativamente certos negócios do seu império. Porém, nem todos os edifícios possuem opções de gerenciamento.\n\n🏢 **Edifícios Gerenciáveis**\nOs edifícios que permitem gerenciamento oferecem vantagens estratégicas e oportunidades de aumentar sua renda. Neles, você pode decidir onde investir, quais melhorias priorizar e como direcionar o crescimento do seu patrimônio — o que pode gerar avanços significativos dependendo da estrutura do seu ecossistema.\n\n🔍 **Como saber quais edifícios podem ser gerenciados?**\nBasta acessar a aba da 🧑‍💼 Central de Gerenciamento no Dashboard. Lá você encontrará uma lista completa de todos os edifícios atualmente gerenciáveis.\n\nUse essa ferramenta para potencializar seus resultados e tomar decisões mais inteligentes ao longo da partida!",
    },
    16: {
      titulo: "📈 Gráfico",
      texto:
        "Na aba 📈 Gráfico, você pode visualizar a evolução do faturamento de cada setor e entender como eles estão reagindo às mudanças da economia.\n\n💹 **Análise de desempenho**\nO gráfico permite acompanhar sua evolução patrimonial ao longo do tempo, destacando os momentos de crescimento, estabilidade ou queda.\n\n🧭 **Direção estratégica**\nCom essas informações, fica muito mais fácil identificar quais setores estão trazendo os melhores resultados e qual segmento pode ser o mais vantajoso para continuar investindo.\n\nUse o gráfico para ajustar sua estratégia e maximizar seus ganhos conforme a economia se transforma!",
    },
    17: {
      titulo: "⏳ Primeiros 270 Dias",
      texto:
        "Durante os PRIMEIROS 270 DIAS você passará por uma fase introdutória do jogo. Esse período existe para ajudar você a entender o funcionamento da economia, os ciclos e os prazos que exigem mais atenção.\n\n📉 ALTERAÇÕES DA ECONOMIA\nA cada 90 DIAS a economia global muda, afetando diretamente a rentabilidade dos setores. Prepare-se para adaptar sua estratégia conforme o cenário econômico se altera.\n\n🧾 DESPESAS MENSAIS\nA cada 30 DIAS você deve pagar suas despesas mensais. Planeje seu capital com cuidado — evitar ficar sem caixa é fundamental.\n\n⚠️ DICA IMPORTANTE\nSe faltarem 10 DIAS OU MENOS para o próximo pagamento de despesas, EVITE fazer investimentos arriscados. Pode não haver tempo suficiente para recuperar o valor gasto.\n\n🏗️ CUSTO DE CONSTRUÇÃO\nFique atento aos indicadores de custo de construção — eles podem oscilar de maneira significativa, ajudando ou prejudicando seu avanço dependendo do momento.\n\n🏠 IMÓVEIS BASE (Terreno, Loja P, Loja M e Loja G)\nDurante os primeiros 270 dias esses imóveis GERAM FATURAMENTO. Após esse período, eles deixam de gerar lucro e passam a servir apenas como componentes para construir edifícios mais avançados.\n\n💡 ESTRATÉGIA RECOMENDADA\nCompre o máximo de imóveis PEQUENOS que puder no início — eles ajudam muito na sua renda inicial.\n\n⚠️ EXCEÇÃO ESTRATÉGICA\nSe a economia global estiver AQUECIDA logo no início, pode valer a pena VENDER seus imóveis (na aba 🤝 OFERTAS, no canto superior direito) para reinvestir em edifícios com rentabilidade superior.",
    },
    18: {
      titulo: "Valores de mercado",
      texto:
        "VALORES DE MERCADO — SEMPRE TENHA ISSO EM MENTE\n\nEsses são os valores-base que você deve considerar ao avaliar oportunidades de compra:\n\n🏡 TERRENO\nValor padrão: 40.000\n\n🏠 IMÓVEL PEQUENO\nConstrução: 50.000\nCusto total: 90.000\n\n🏢 IMÓVEL MÉDIO\nConstrução: 100.000\nCusto total: 180.000\n\n🏬 IMÓVEL GRANDE\nConstrução: 240.000\nCusto total: 360.000\n\n----------------------------------------\n\nPOR QUE ISSO IMPORTA?\n\nSe algum desses imóveis estiver ABAIXO DO VALOR BASE, normalmente é uma boa oportunidade — especialmente o TERRENO, pois ele impacta diretamente o custo dos imóveis maiores.\n\nIsso acontece porque:\n• IMÓVEL PEQUENO → usa 1 TERRENO\n• IMÓVEL MÉDIO → usa 2 TERRENOS\n• IMÓVEL GRANDE → usa 3 TERRENOS\n\nQuanto maior o preço do terreno e da construção, maior será o custo final de edifícios avançados, reduzindo sua rentabilidade.\n\n----------------------------------------\n\nEXEMPLO PRÁTICO — IMPACTO DO PREÇO DO TERRENO\n\nPara construir uma FAZENDA DE VACAS, você precisa de:\n• 3 TERRENOS\n• 1 IMÓVEL MÉDIO\n\nCENÁRIO ORIGINAL:\n3 Terrenos = 120.000\n1 Imóvel Médio = 180.000\nCUSTO TOTAL = 300.000\n\nCENÁRIO COM TERRENO A 50.000:\n3 Terrenos = 150.000\n1 Imóvel Médio ajustado = 200.000\nCUSTO TOTAL = 350.000\n\nIsso representa quase 20% DE AUMENTO, reduzindo diretamente sua margem de lucro.\n\n",
    },
    20: { titulo: "🗺️ Mapa Dos Setores", texto: "" },
    20.1: {
      titulo: "🛒 Comércio",
      texto:
        "O setor de Comércio é o mais lucrativo do jogo, mas também o mais instável. É nele que ocorrem as maiores flutuações econômicas, trazendo ótimos resultados em épocas favoráveis — e grandes prejuízos em períodos de recessão. Além disso, é o setor com menor barreira de entrada, pois a maioria de seus edifícios não exige muitos pré-requisitos para começar a render.\n\n⚠️ Instabilidade e Adaptabilidade\n\nPor ser altamente volátil, o setor exige atenção e adaptabilidade. Em determinados períodos, ele pode gerar rendimentos impressionantes; em outros, pode trazer prejuízos significativos. Apesar desse risco, o setor possui uma grande vantagem: a maioria dos seus edifícios é rentável mesmo de forma isolada, sem depender de cadeias complexas.\n\n🧑‍💼 Edifícios Gerenciáveis do Comércio\n\nLembre-se: edifícios gerenciáveis são aqueles que permitem gerenciamento ativo. Para gerenciá-los, basta ir até o Dashboard, tocar na aba 🧑‍💼 e, no topo da tela, escolher o edifício que deseja administrar.\n\nOs edifícios gerenciáveis do setor de Comércio são:\n- Açougue\n- Concessionária de Veículos\n\nEsse gerenciamento ativo permite extrair uma rentabilidade mais alta deles quando você quiser atuar mais diretamente.\n\n🥩 O Melhor Edifício Para Começar\n\nO edifício mais recomendado para iniciantes é o Açougue. Ele custa aproximadamente 90.000 e oferece gerenciamento ativo, permitindo aumentar sua rentabilidade manualmente sempre que desejar. Ainda assim, vale reforçar que todos os edifícios geram faturamento automaticamente todos os dias, mesmo sem sua intervenção.\n\n🏷️ Licenças de Baixo Custo\n\nO setor de comércio também se destaca por ter licenças mais baratas quando comparadas ao valor dos edifícios que elas desbloqueiam. Isso torna o comércio ideal para jogadores que desejam expansão rápida sem grandes investimentos iniciais.\n\n🏆 Rumo ao Topo do Setor\n\nOs edifícios mais avançados do setor exigem recursos de construção, então será necessário desbloquear diversas licenças para chegar até eles. Apesar disso, o retorno costuma compensar muito bem, tornando o setor extremamente lucrativo no longo prazo.\n\n🧩 Posição do Comércio no Ecossistema\n\nO comércio normalmente se encontra na ponta final da maioria dos ecossistemas produtivos. Por isso, é importante observar possíveis sinergias com os edifícios que você já possui, para potencializar ainda mais seus resultados.\n\n💰 Estimativa de Custo para um Ecossistema Comercial Inicial\n\nCaso você não possua nenhuma licença ou imóvel, aqui está uma base aproximada de investimento necessário para iniciar no setor:\n\n🥕 Edifícios Básicos\nFeira — 70k\nLoja de Móveis — 160k\nRestaurantes — 140k\n\n🍞 Alimentos\nPadaria — 120k\nAçougue — 120k\n\n🐾 Saúde e Bem-estar\nPetshop — 140k\nFarmácias — 230k\nCafeteria — 130k\n\n📚 Varejo Geral\nLivraria — 160k\nMercado — 900k\nAdega — 160k\n\n⛽ Conveniência e Serviços\nLoja de Conveniência — 350k\nPosto de Gasolina — 1.5M\nRedes de Fast-Food — 130k–280k\n\n👔 Moda e Varejo Especializado\nLoja de Departamentos — 300k\nLoja de Calçados — 180k\nLoja de Vestuário — 160k\n\n💻 Tecnologia e Games\nLoja de Gadgets e Wearables — 680k\nLoja de Games — 600k\nLoja de Celulares — 500k\nLoja de Informática — 650k\n\n🚚 Logística e Transporte\nCentro de Transporte e Entrega — 1.4M\nCentros de Distribuição — 1.4M\nArmazéns Logísticos — 1.6M\nTransporte Petrolífero — 5.6M\n\n⚡ Alto Valor\nLoja de Eletrônicos — 700k\nJoalheria — 1.4M\nConcessionária de Veículos — 2.5M\n\n🏬 Megaestruturas\nShopping Popular — 12M\nShopping Center — 80M\n\nEsses valores não são fixos — são apenas uma referência para que você tenha uma noção clara do investimento necessário no setor.\n\n🏗️ Limites de Construção\n\nAntes de montar seu ecossistema, verifique se sua empresa possui espaço suficiente no limite de construção. Se não tiver, será necessário realizar uma expansão.\n\n✅ Recomendação Final\n\nCom essas informações e uma noção do investimento total, recomendo que você compre primeiro a licença do edifício que deseja focar. Assim, você poderá visualizar todos os pré-requisitos diretamente na carta e planejar seu ecossistema com muito mais precisão.",
    },

    20.2: {
      titulo: "🏢 Mapa Do Imobiliário",
      texto:
        "🏙️ O setor de IMOBILIÁRIO é um dos mais importantes do jogo, pois abriga edifícios especiais que REDUZEM custos de construção e oferecem uma das maiores rentabilidades disponíveis.\n\n💰 É um setor que exige um bom capital inicial, mas que tende a se AUTOSSUSTENTAR graças aos edifícios especiais que geram redução de custos e aumentam a eficiência dos demais setores aliados — tornando-o um dos setores mais robustos e escaláveis do jogo.\n\n🧱 EDIFÍCIO BASE RECOMENDADO\nO melhor ponto de partida é o 🟫 TERRAPLANAGEM E PAVIMENTAÇÃO. Ele é um edifício gerenciável que pode gerar lucros elevados por meio de licitações e ainda reduz custos de construção de plantações e terrenos.\n\nPara mais detalhes sobre ele e outros edifícios especiais, acesse a aba lateral ⭐ EDIFÍCIOS ESPECIAIS neste mesmo menu de ajuda.\n\n📊 A seguir, valores aproximados para entender o custo inicial de um ecossistema imobiliário (considerando que você NÃO possui imóveis nem licenças):\n\n📜 Cartório e Licenças — 300.000\n🟫 Terraplanagem e Pavimentação — 500.000\n🏗️ Construtora de Pequenas Obras — 1.000.000\n\n🎨 Design de Interiores — 650.000\n🏛️ Arquitetura — 750.000\n📐 Consultoria Civil — 1.000.000\n\n🏠 Construtora — 1.900.000\n🏘️ Imobiliária Residencial — 1.600.000\n🏢 Imobiliária Comercial — 1.850.000\n\n🏗️ Grandes Infraestruturas — 42.000.000\n✈️ Aeroportos — 100.000.000\n⚓ Portos — 120.000.000\n\n⛏️ Mineradora — 14.000.000\n☢️ Mineradora de Radioativos — 72.000.000\n💎 Mineradora de Pedras Preciosas — 18.000.000\n\n🛒 Mega Mercado — 7.000.000\n🏙️ Prédio de Alto Padrão — 9.000.000\n\n🌿 Centro de Biomassa — 8.000.000\n🛢️ Tanque de Biocombustíveis — 11.000.000\n🛢️ Plataforma de Petróleo — 35.000.000\n\n⚙️ EDIFÍCIOS GERENCIÁVEIS DO SETOR\nAtualmente, o setor imobiliário possui a MAIOR quantidade de edifícios gerenciáveis:\n• 🟫 Terraplanagem e Pavimentação\n• 🏗️ Construtora\n• ⛏️ Mineradora\n\n💡 DICAS IMPORTANTES\nFoque principalmente nas CONSTRUTORAS, pois além de serem edifícios especiais, elas reduzem custos de construção:\n• Construtora de Pequenas Obras — para edifícios até 300.000\n• Construtora — para edifícios entre 300.000 e 1.000.000\n• Grandes Infraestruturas — acima de 1.000.000\n\nPara saber tudo sobre os edifícios especiais, acesse ⭐ EDIFÍCIOS ESPECIAIS na barra lateral do menu de ajuda.\n\n📌 Esses valores não são fixos — servem apenas como referência para estimar o capital necessário para investir neste setor.\n\n🏢 Antes de iniciar seu ecossistema, verifique se sua empresa possui LIMITE DE CONSTRUÇÃO suficiente. Caso não tenha, será necessário expandir sua empresa.\n\n🎯 RECOMENDAÇÃO FINAL\nAgora que você tem uma noção dos custos, comece adquirindo a LICENÇA do edifício que deseja focar. Isso facilita o planejamento, pois a própria carta mostrará todos os requisitos para evoluir seu ecossistema imobiliário.",
    },
    20.3: {
      titulo: "⚡ Mapa Da Energia",
      texto:
        "⚡ O setor de ENERGIA é conhecido por sua grande ESTABILIDADE e pelo impacto amplo que exerce sobre praticamente todos os edifícios do jogo, sendo um setor extremamente versátil para quase qualquer estratégia.\n\n🛡️ Mesmo em cenários de crise econômica, este setor raramente apresenta prejuízo, funcionando como um excelente pilar de segurança e equilíbrio.\n\n🌞 EDIFÍCIO GERENCIÁVEL DO SETOR\nA opção gerenciável é a 🏭 FÁBRICA DE PLACAS SOLARES, responsável pela produção e venda de painéis solares.\n\n🚀 OBJETIVO MÁXIMO\nA 🧬 USINA DE FUSÃO NUCLEAR é o edifício mais caro e desafiador de TODO o jogo — muitos jogadores a encaram como um objetivo pessoal a ser conquistado.\n\n🔌 SINERGIAS DO SETOR\nAs usinas de energia reduzem custos de MUITOS edifícios do jogo, pois fornecem a infraestrutura energética necessária para operações mais eficientes.\n\n📡 IMPORTANTE!\nPara operar usinas, é OBRIGATÓRIO ter:\n• ⚡ SUBESTAÇÃO DE ENERGIA\n• 🔌 REDE DE DISTRIBUIÇÃO ELÉTRICA\nSomando esses dois itens + licenças, o investimento inicial fica próximo de 1.100.000.\n\n📊 VALORES APROXIMADOS DE ENTRADA NO SETOR (considerando que você NÃO possui imóveis nem licenças):\n\n⚡ Subestação de Energia — 550.000\n🔌 Rede de Distribuição — 750.000\n🌞 Usina Solar — 1.600.000\n\n🌬️ Fábrica de Turbinas Eólicas — 850.000\n🔆 Fábrica de Painéis Solares — 780.000\n🔋 Fábrica de Baterias — 1.100.000\n\n🏢 Empresa de Comércio Energético — 1.700.000\n📊 Consultoria Energética — 1.500.000\n🔋 Estação de Carregamento — 750.000\n\n🔬 Centro de Pesquisa em Energias Renováveis — 1.500.000\n🔬 Centro de Pesquisa Energética — 1.500.000\n♻️ Centro de Reciclagem de Baterias — 1.000.000\n\n🔥 Usina Termelétrica a Biocombustíveis — 4.000.000\n🌿 Usina de Biomassa — 4.200.000\n\n💧 Usina Hidrelétrica — 19.000.000\n🌬️ Parque Eólico — 4.200.000\n🔥 Usina Termoelétrica — 55.000.000\n\n☢️ Reator Nuclear Convencional — 300.000.000\n🧬 Usina de Fusão Nuclear — 3.200.000.000\n\n📉 RENTABILIDADE\nO setor de energia não é o mais lucrativo em números diretos, mas fornece um forte SUPORTE estrutural ao reduzir custos, trazendo estabilidade ao longo da partida.\n\n📌 Esses valores não são fixos — servem apenas como referência para estimar o capital necessário.\n\n🏢 Antes de iniciar seu ecossistema energético, verifique se sua empresa possui LIMITE DE CONSTRUÇÃO suficiente. Caso não tenha, será necessário expandir sua empresa.\n\n🎯 RECOMENDAÇÃO FINAL\nAgora que você sabe o investimento necessário, adquira primeiro a LICENÇA do edifício que deseja focar. Assim, a própria carta mostrará todos os requisitos necessários para desenvolver seu ecossistema energético.",
    },

    20.4: {
      titulo: "🧑‍💻 Mapa Da Tecnologia",
      texto:
        "O setor de TECNOLOGIA se destaca por oferecer edifícios capazes de aumentar significativamente o faturamento de construções específicas.\n\nO edifício fundamental desse setor é a STARTUP, pois ela serve como base para grande parte das construções avançadas, especialmente os Centros de Pesquisa.\n\nÉ um setor que exige muito capital para criar ecossistemas realmente eficientes. Abaixo estão valores aproximados para você ter uma noção dos investimentos necessários ao focar em um único edifício:\n\n• Startup — 1.200.000\n• Desenvolvimento de Software — 3.500.000\n• Jogos Digitais — 3.800.000\n• Telecomunicações — 4.500.000\n• Redes Sociais — 6.500.000\n• Marketplace Online — 7.000.000\n• Plataforma de Streaming — 7.500.000\n• Fábrica de Smartphones — 12.000.000\n• Fábrica de Computadores — 15.000.000\n• Fábrica de Consoles — 14.000.000\n• Fábrica de Dispositivos Vestíveis — 9.000.000\n• Instituto de Tecnologia Alimentar — 2.500.000\n• Centro de Pesquisa Agrícola — 2.500.000\n• Instituto de Biotecnologia — 3.700.000\n• Nanotecnologia — 4.000.000\n• Eletrônicos — 3.000.000\n• Design de Produtos — 3.000.000\n• Química — 2.500.000\n• Fusão Nuclear — 6.000.000\n• Novos Combustíveis — 3.500.000\n• Pesquisa Aeroespacial — 7.500.000\n• Engenharia Avançada — 5.500.000\n• Materiais Avançados — 5.500.000\n• Robótica — 5.000.000\n• Inteligência Artificial — 6.000.000\n\nEsses valores não são fixos, mas servem como referência para estimar quanto você precisará investir nesse setor.\n\nVerifique também se sua empresa possui LIMITE DE CONSTRUÇÃO suficiente para montar o ecossistema desejado. Caso não tenha, será necessário expandir sua empresa antes.\n\nRECOMENDAÇÃO: após ter uma noção do custo total, compre primeiro a LICENÇA do edifício que você deseja focar. Assim, você poderá consultar todos os pré-requisitos diretamente na carta e planejar seu ecossistema com precisão.",
    },
    20.5: {
      titulo: "🏭 Mapa Da Indústria",
      texto:
        "🏭 O setor de INDÚSTRIA é um dos mais intensos e estratégicos do jogo. Ele se destaca pelos ALTOS volumes de faturamento, mas também pelos custos fixos elevados — o que o torna muito sensível a recessões econômicas.\n\n💥 Apesar disso, é o setor com MAIOR IMPACTO no jogo inteiro graças à quantidade enorme de SINERGIAS. Com apenas UMA licença, você libera tudo o que precisa para construir um ecossistema industrial completo.\n\n🥖 RECOMENDAÇÃO DE INÍCIO\nO melhor ponto de partida é a 🥐 FÁBRICA DE PÃES. Ela possui forte sinergia com a PADARIA do setor de comércio e oferece rentabilidade muito boa no início da partida.\n\n🎮 DIVERSÃO E ESTRATÉGIAS\nA indústria é um dos setores mais divertidos do jogo por permitir inúmeros caminhos diferentes — desde alimentos até robôs, aviões, medicamentos, eletrônicos, semicondutores e muito mais.\n\n📊 A seguir, valores aproximados para entender o custo inicial de um ecossistema industrial (considerando que você NÃO possui imóveis nem licenças):\n\n🪑 Fábrica de Móveis — 350.000\n🐾 Fábrica de Rações — 280.000\n📦 Fábrica de Embalagens — 320.000\n\n🌾 Fábrica de Fertilizantes — 2.900.000\n🥤 Fábrica de Bebidas — 470.000\n🥐 Fábrica de Pães — 390.000\n\n👕 Fábrica Têxtil — 570.000\n👟 Fábrica de Calçados — 520.000\n👗 Fábrica de Roupas — 570.000\n\n🌲 Fábrica de Celulose — 850.000\n📄 Fábrica de Papel — 760.000\n📚 Fábrica de Livros — 680.000\n\n💊 Fábrica de Medicamentos — 2.000.000\n🧪 Laboratório Farmacêutico — 2.000.000\n🧫 Fábrica de Plásticos — 4.600.000\n🧬 Químicos Especializados — 5.200.000\n\n🔥 Alto-Forno — 5.700.000\n🏗️ Usina Siderúrgica — 7.700.000\n🔩 Fundição de Alumínio — 6.700.000\n⚙️ Ligas Metálicas — 7.200.000\n\n🛠️ Componentes Mecânicos — 2.000.000\n🧱 Chapas Metálicas — 2.200.000\n🏗️ Estruturas Metálicas — 2.500.000\n\n🚗 Peças Automotivas — 6.300.000\n🔋 Montadora de Veículos Elétricos — 14.000.000\n🚙 Fábrica de Automóveis — 12.000.000\n\n🛢️ Refinaria de Biocombustíveis — 67.000.000\n🛢️ Refinaria — 12.000.000\n🧫 Biofábrica — 57.000.000\n\n💽 Fábrica de Chips — 25.000.000\n📟 Placas Eletrônicas — 3.500.000\n🔌 Semicondutores — 45.000.000\n\n📱 Eletrônicos — 9.000.000\n🤖 Fábrica de Robôs — 36.000.000\n🏭 Automação Industrial — 10.000.000\n\n⚙️ Motores — 47.000.000\n🚀 Fábrica de Foguetes — 150.000.000\n✈️ Fábrica de Aeronaves — 85.000.000\n🛳️ Fábrica de Navios — 40.000.000\n\n📉 Estes valores NÃO são fixos — servem como referência para que você tenha noção do capital necessário para montar um ecossistema industrial.\n\n🏢 VERIFIQUE O LIMITE DA SUA EMPRESA\nAntes de construir seu ecossistema industrial, confirme se sua empresa possui LIMITE DE CONSTRUÇÃO suficiente. Caso não tenha, será necessário expandir.\n\n Atualmente, a Fábrica de Automóveis é o único edifício gerenciável do setor. Por conta de seu alto volume de faturamento, pode ser uma excelente opção estratégica para quem deseja maximizar resultados.\n\n🎯 RECOMENDAÇÃO FINAL\nApós entender os custos, adquira primeiro a LICENÇA do edifício que deseja focar. Assim, a própria carta exibirá todos os requisitos e caminhos necessários para desenvolver seu ecossistema industrial.\n\n🏭⚙️📈",
    },
    20.6: {
      titulo: "🌱 Mapa Da Agricultura",
      texto:
        "O setor de AGRICULTURA depende de vários edifícios e licenças para formar um ecossistema básico de produção.\n\nA maioria das construções agrícolas exige a FAZENDA ADMINISTRATIVA como pré-requisito, e algumas plantações também precisam do SILO.\n\nExemplo: para produzir GRÃOS, você precisará tanto do SILO quanto da FAZENDA ADMINISTRATIVA.\n\nAbaixo está uma estimativa de quanto custaria iniciar um ecossistema agrícola completo caso você não possua nenhuma licença nem imóveis:\n• PLANTAÇÃO DE GRÃOS — 600.000\n• PLANTAÇÃO DE VEGETAIS — 600.000\n• POMARES — 500.000\n• FAZENDA DE VACAS — 1.000.000\n• GRANJA DE AVES — 400.000\n• CRIAÇÃO DE OVINOS — 500.000\n• MADEIREIRA — 550.000\n• ÁREA FLORESTAL — 400.000\n• TERRENOS DE MINERAÇÃO — 1.000.000\n• PLANTAÇÃO DE EUCALIPTO — 400.000\n• PLANTAS MEDICINAIS — 500.000\n\nEsses valores não são fixos, mas servem como referência do investimento necessário para operar nesse setor.\n\nLembre-se também de verificar se sua empresa possui LIMITE DE CONSTRUÇÃO suficiente para erguer todos os edifícios do ecossistema; caso contrário, será preciso expandir sua empresa.\n\nRECOMENDAÇÃO: após ter uma noção do valor necessário, compre primeiro a LICENÇA do edifício que deseja focar. Assim, você poderá ver na carta todos os requisitos e será mais fácil montar o ecossistema desejado.",
    },
    22: {
      titulo: "📘✨ Guia Inicial — Primeiros Passos",
      texto:
        "🚀 **Começando sua jornada**\nA primeira atitude é definir em qual setor você irá investir inicialmente. Os melhores setores para começar são: 🛒 Comércio, 🌾 Agricultura e 🏭 Indústria.\n\n📊 **Como escolher o melhor setor agora**\nNo Dashboard, observe na barra lateral direita (logo abaixo do botão de passar o dia ▶️) os ícones dos seis setores. Cada ícone possui uma borda colorida que indica sua economia:\n- 🟩 Verde escuro = economia muito favorável\n- 🟨 Amarelo = economia neutra\n- 🟥 Vermelho escuro = recessão\n\nEscolha o setor que estiver mais próximo do 🟩 verde. Para mais detalhes, abra a barra lateral do menu de ajuda e procure por **📍 Mapa dos Setores**.\n\n🧾 **Liberando os edifícios do setor**\nDepois de escolher o setor, vá ao Dashboard e selecione-o. Como você está no início, todos os edifícios estarão bloqueados. Para desbloqueá-los:\n1. Toque no botão de licença 🧾 no canto superior direito.\n2. Escolha e compre a licença do setor.\n3. Pronto! Os edifícios daquela licença ficam disponíveis.\n\nSe quiser aprofundar, procure no menu de ajuda a aba **📑 LICENÇAS** — lá estão explicadas as licenças de setor e também as licenças empresariais, que serão essenciais mais adiante.\n\n🏗️ **Preparando-se para construir**\nPara construir um edifício, você precisa antes obter:\n- 🧱 **Construções Necessárias**\n- 🧰 **Recursos de Construção**\n\nSe não souber o que é cada item, vá no menu de ajuda e abra **🏢 INFORMAÇÕES DE EDIFÍCIOS**.\n\nDepois de comprar todos os pré-requisitos, basta tocar no botão **Comprar** e o edifício será adicionado à sua carteira.\n\n💼 **Acessando sua Carteira**\nPara visualizar seus edifícios:\n1. Vá ao Dashboard.\n2. Toque no ícone da maleta 💼.\n\nAli você verá seus edifícios construídos e informações da sua empresa. Para mais detalhes, consulte no menu de ajuda a aba **💼 CARTEIRA**.\n\n📈 **Agora é ver o faturamento crescer**\nPasse os dias ▶️ e acompanhe o crescimento dos seus lucros. Fique atento à barra lateral direita, onde estão as informações financeiras mais importantes 💹.\n\n⚠️ **Dica essencial**\nNo começo, seja conservador. Esse é o momento com maior risco de falência ❗. Invista com cuidado e planeje bem.\n\n🎯 **Recomendação final**\nExplore as demais seções do menu de ajuda 📚. Quanto mais conhecimento tiver sobre o jogo, mais estratégicas e eficientes serão suas decisões — aumentando suas chances de chegar ao topo 🏆.",
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
