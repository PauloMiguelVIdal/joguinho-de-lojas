import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import porcem from "../../public/outrasImagens/simbolo-de-porcentagem.png";
import terrenoImg from "../../public/outrasImagens/terreno.png";
import constNece from "../../public/outrasImagens/construção necessária.png";
import PróximoImg from "../../public/outrasImagens/proximo.png";
import ConstuirImg from "../../public/outrasImagens/martelo.png";
import licença from "../../public/outrasImagens/licença.png";
import agricultura from "./setores/agricultura.png";
import tecnologia from "./setores/tecnologia.png";
import comercio from "./setores/comercio.png";
import industria from "./setores/industria.png";
import imobiliario from "./setores/Imobiliário.png";
import energia from "./setores/torre-eletrica.png";
import grafico from "./setores/grafico.png";
import DolarImg from "../../public/outrasImagens/simbolo-do-dolar.png";
import { motion } from "framer-motion";
import LojaPImg from "../../public/outrasImagens/lojaP.png";
import LojaMImg from "../../public/outrasImagens/lojaM.png";
import LojaGImg from "../../public/outrasImagens/lojaG.png";
import SelectorImage from "./selectorImage";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import LicenseNec from "./licenseNec";
import fechar from "../../public/outrasImagens/fechar.png";
import plantação from "../../public/imagens/Plantação De Grãos.png";
import { Localizador } from "./localizador";
import { CardLocalization } from "./cardLocalization";
import imgLucro from "../../public/outrasImagens/imgLucroLiquido.png";
import imgFatuMensal from "../../public/outrasImagens/imgFaturamentoMensal.png";
import imgPercFatu from "../../public/outrasImagens/imgPercFaturamento.png";
import imgSomaImposto from "../../public/outrasImagens/imgSomaImpostos.png";
import imgImpostoFixo from "../../public/outrasImagens/imgImpostoFixo.png";
import imgFaturamentoDiario from "../../public/outrasImagens/imgFaturamentoDiario.png";
import imgImpostoSFatu from "../../public/outrasImagens/imgImpostoSfatu.png";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useRef } from "react";
import { createPortal } from "react-dom";
import useSound from "use-sound";
import purchaseEdifAudio from "../../public/sounds/purchaseEdifAudio.mp3";

export const CardModal = ({ index }) => {
  const {
    economiaSetores,
    setEconomiaSetores,
    atualizarEco,
    verificarLimites,
  } = useContext(DadosEconomyGlobalContext);

  const {
    dados,
    atualizarDados,
    atualizarDadosProf2,
    atualizarDadosProf3,
    atualizarDadosProf,
  } = useContext(CentraldeDadosContext);
  const setorAtivo = dados.setorAtivo;
  const economiaSetor = economiaSetores[setorAtivo].economiaSetor.estadoAtual;
  // useEffect(() => {
  //     const economiaSetor = dados[setorAtivo].economiaSetor.estadoAtual
  //     // console.log(economiaSetor)
  // }, [dados[setorAtivo].economiaSetor])

  const [buttonPurchaseEdifAudio] = useSound(purchaseEdifAudio);

  const setores = [
    {
      id: "agricultura",
      corClasse: "bg-[#4CAF50]",
      img: agricultura,
      descLicença:
        "Com a Licença Global de Agricultura, você terá acesso a cultivos exclusivos, otimização de produções e melhorias que aumentarão sua rentabilidade. Liberte o potencial do setor agrícola agora mesmo!",
      cor1: "#003816",
      cor2: "#1A5E2A",
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
      id: "grafico",
      corClasse: "bg-[#6A00FF]",
      img: grafico,
      cor1: "#6A00FF ",
      cor2: "#6A00FF ",
      cor3: "#6A00FF ",
      cor4: "#6A00FF ",
    },
  ];

  const [rent, setRent] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [visibleId, setVisibleId] = useState("lojasNec");
  const [modalPowerup, setModalPowerUp] = useState(false);

  const [verificadorDeLojasNecessárias, setVerificador] = useState(true);

  const [verificadorDeConstruçõesNecessárias, setVerificadorConstr] =
    useState(true);

  const contabilidadeDeFalta = (edificio) => {
    const qtdAtual = dados[edificio].quantidade;
    const qtdNecessaria =
      dados[setorAtivo].edificios[index].lojasNecessarias[edificio];

    const qtdFalta = qtdAtual >= qtdNecessaria ? 0 : qtdNecessaria - qtdAtual;
    const custoTotalConst =
      edificio === "terrenos"
        ? dados[edificio].preçoConstrução
        : edificio === "lojasP"
        ? dados[edificio].preçoConstrução + dados.terrenos.preçoConstrução
        : edificio === "lojasM"
        ? dados[edificio].preçoConstrução + 2 * dados.terrenos.preçoConstrução
        : edificio === "lojasG"
        ? dados[edificio].preçoConstrução + 3 * dados.terrenos.preçoConstrução
        : "lascou";
    const edificioSuficiente =
      edificio === "terrenos"
        ? "terrenosSuficientes"
        : edificio === "lojasP"
        ? "lojasPSuficientes"
        : edificio === "lojasM"
        ? "lojasMSuficientes"
        : edificio === "lojasG"
        ? "lojasGSuficientes"
        : "lascou";

    return qtdFalta * custoTotalConst;
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

  const tooltipStyle = {
    backgroundColor: "#FFFFFF",
    color: "#350973",
    border: "1px solid #350973",
    borderRadius: "6px",
    padding: "6px 10px",
    fontWeight: "600",
    fontSize: "14px",
    zIndex: 10, // 👈 garante que vai ficar por cima de tudo
  };

  const mapaEdificioParaSetor = {
    // Agricultura
    "Plantação De Grãos": "agricultura",
    "Plantação De Vegetais": "agricultura",
    "Fazenda Administrativa": "agricultura",
    Pomares: "agricultura",
    "Cooperativa Agrícola": "agricultura",
    "Centro De Comércio De Plantações": "agricultura",
    "Fazenda De Vacas": "agricultura",
    "Granja De Aves": "agricultura",
    "Criação De Ovinos": "agricultura",
    Armazém: "agricultura",
    Silo: "agricultura",
    "Depósito De Resíduos Orgânicos": "agricultura",
    Madeireira: "agricultura",
    "Área Florestal": "agricultura",
    "Terreno De Mineração": "agricultura",
    "Plantação De Eucalipto": "agricultura",
    "Plantação De Plantas Medicinais": "agricultura",

    // Indústria
    "Fábrica De Móveis": "industria",
    "Fábrica De Ração": "industria",
    "Fábrica De Embalagem": "industria",
    "Fábrica De Fertilizante": "industria",
    "Fábrica De Bebidas": "industria",
    "Fábrica De Pães": "industria",
    "Fábrica Textil": "industria",
    "Fábrica De Calçados": "industria",
    "Fábrica De Roupas": "industria",
    "Fábrica De Celulose": "industria",
    "Fábrica De Papel": "industria",
    "Fábrica De Livros": "industria",
    "Fábrica De Medicamentos": "industria",
    "Laboratório Farmacêutico": "industria",
    "Fábrica De Plasticos": "industria",
    "Fábrica De Químicos Especializados": "industria",
    "Alto-Forno": "industria",
    "Usina Siderúrgica": "industria",
    "Fundição de Alumínio": "industria",
    "Fábrica De Ligas Metálicas": "industria",
    "Indústria De Componentes Mecânicos": "industria",
    "Fábrica De Chapas Metálicas": "industria",
    "Fábrica De Estruturas Metálicas": "industria",
    "Fábrica De Peças Automotivas": "industria",
    "Montadora De Veículos Elétricos": "industria",
    "Fábricas De Automóveis": "industria",
    "Refinaria de Biocombustíveis": "industria",
    Refinaria: "industria",
    Biofábrica: "industria",
    "Fábrica De Chips": "industria",
    "Fábrica De Placas Eletrônicas": "industria",
    "Fábrica De Semicondutores": "industria",
    "Fábrica De Eletrônicos": "industria",
    "Fábrica De Robôs": "industria",
    "Empresa De Automação Industrial": "industria",
    "Fábrica De Motores": "industria",
    "Fábrica De Foguetes": "industria",
    "Fábrica De Aeronaves": "industria",
    Estaleiro: "industria",

    // Pesquisa
    Startup: "tecnologia",
    "Servidor Em Nuvem": "tecnologia",
    "Data Center": "tecnologia",
    "Empresa De Desenvolvimento De Software": "tecnologia",
    "Empresa De Telecomunicações": "tecnologia",

    "Plataforma De Redes Sociais": "tecnologia",
    "Marketplace Online": "tecnologia",
    "Plataforma De Streaming": "tecnologia",
    "Fábrica De Smartphones": "tecnologia",
    "Fábrica De Computadores": "tecnologia",
    "Fábrica De Consoles de Jogos": "tecnologia",
    "Fábrica De Dispositivos Vestiveis": "tecnologia",
    "Instituto De Tecnologia Alimentar ": "tecnologia",
    "Centro De Pesquisa Agrícola": "tecnologia",
    "Instituto de Biotecnologia": "tecnologia",
    "Laboratório De Nanotecnologia": "tecnologia",
    "Centro De Pesquisa Em Eletrônicos": "tecnologia",
    "Laboratório De Design De Produtos": "tecnologia",
    "Centro de Pesquisa Química": "tecnologia",
    "Centro De Pesquisa Em Fusão Nuclear": "tecnologia",
    "Laboratório De Novos Combustíveis": "tecnologia",
    "Centro De Pesquisa Aeroespacial": "tecnologia",
    "Centro de Engenharia Avançada ": "tecnologia",
    "Centro de Pesquisa em Materiais Avançados": "tecnologia",
    "Centro De Pesquisa Em Robótica": "tecnologia",
    "Centro De Pesquisa Em IA": "tecnologia",

    // Comércio
    Feira: "comercio",
    "Loja De Móveis": "comercio",
    Restaurante: "comercio",
    Livraria: "comercio",
    Mercado: "comercio",
    Adega: "comercio",
    Padaria: "comercio",
    Açougue: "comercio",
    "Loja De Conveniência": "comercio",
    "Posto De Combustíveis": "comercio",
    "Redes De Fast-food": "comercio",
    Petshop: "comercio",
    Farmácia: "comercio",
    Cafeteria: "comercio",
    "Loja De Departamentos": "comercio",
    "Loja De Calçados": "comercio",
    "Loja De Vestuário": "comercio",
    "Loja de Gadgets e Wearables": "comercio",
    "Loja De Games": "comercio",
    "Loja De Celulares": "comercio",
    "Loja De Informática": "comercio",
    "Loja De Eletrônicos": "comercio",
    Joalheria: "comercio",
    "Concessionária De Veículos": "comercio",
    "Shopping Popular": "comercio",
    "Shopping Center": "comercio",
    "Centro De Transporte e Entrega": "comercio",
    "Centro De Distribuição": "comercio",
    "Armazém Logístico": "comercio",
    "Transporte Petrolífero": "comercio",

    // Infraestrutura
    "Cartório E Licenças": "imobiliario",
    "Terraplanagem E Pavimentação": "imobiliario",
    "Construtora De Pequenas Obras": "imobiliario",
    "Escritório De Design De Interiores": "imobiliario",
    "Escritório De Arquitetura ": "imobiliario",
    "Consultoria Em Engenharia Civil": "imobiliario",
    Construtora: "imobiliario",
    "Imobiliária Residencial": "imobiliario",
    "Imobiliária Comercial ": "imobiliario",
    "Construtora De Infraestruturas": "imobiliario",
    Aeroporto: "imobiliario",
    Porto: "imobiliario",
    Mineradora: "imobiliario",
    "Mineradora Radioativa": "imobiliario",
    "Mineradora De Pedras Preciosas": "imobiliario",
    "Mega Mercado": "imobiliario",
    "Prédio De Alto Padrão": "imobiliario",
    "Centro De Coleta De Biomassa": "imobiliario",
    "Tanque De Armazenamento Biocombustível": "imobiliario",
    "Plataforma De Petróleo": "imobiliario",

    // Energia
    "Subestação De Energia": "energia",
    "Rede De Distribuição Elétrica": "energia",
    "Usina Solar": "energia",
    "Fábrica De Turbinas Eólicas": "energia",
    "Fábrica De Painéis Solares": "energia",
    "Fábrica De Baterias": "energia",
    "Empresa De Comercio Energético": "energia",
    "Empresa De Consultoria Energética": "energia",
    "Estação De Carregamento": "energia",
    "Centro de Pesquisa Em Energias Renováveis": "energia",
    "Centro De Pesquisa Energética": "energia",
    "Centro De Reciclagem De Baterias": "energia",
    "Usina Termelétrica A Biocombustíveis": "energia",
    "Usina De Biomassa": "energia",
    "Usina Hidrelétrica": "energia",
    "Parque Eólico": "energia",
    "Usina Termolétrica": "energia",
    "Reator Nuclear Convencional": "energia",
    "Usina De Fusão Nuclear": "energia",
  };

  // const podeComprar = (
  //     verificadorDeConstruçõesNecessárias &&
  //     verificadorDeLojasNecessárias &&
  //     verificadorDeRecursosNecessários &&
  //     dados.saldo > dados[setorAtivo].edificios[index].custoConstrucao
  // );

  // console.log("Pode comprar?", podeComprar);
  // console.log("verificadorDeConstruçõesNecessárias", verificadorDeConstruçõesNecessárias);
  // console.log("verificadorDeLojasNecessárias", verificadorDeLojasNecessárias);
  // console.log("verificadorDeRecursosNecessários", verificadorDeRecursosNecessários);
  // console.log("Saldo:", dados.saldo);
  // console.log("Custo:", dados[setorAtivo].edificios[index].custoConstrucao);
  // console.log("✅ Pode Comprar?", podeComprar);
  // const [verificadorDeRecursosNecessários, setVerificadorRec] = useState(true)

  const valorEconomiaSetor = {
    recessão: 0.4,
    declinio: 0.8,
    estável: 1,
    progressiva: 1.1,
    aquecida: 1.25,
  }[economiaSetor];

  // console.log(valorEconomiaSetor)
  useEffect(() => {
    const quantidadeTerrenos =
      dados[setorAtivo].edificios[index].lojasNecessarias.terrenos;
    const quantidadeLojasP =
      dados[setorAtivo].edificios[index].lojasNecessarias.lojasP;
    const quantidadeLojasM =
      dados[setorAtivo].edificios[index].lojasNecessarias.lojasM;
    const quantidadeLojasG =
      dados[setorAtivo].edificios[index].lojasNecessarias.lojasG;

    const quantidadeTerrenosAtual = dados.terrenos.quantidade;
    const quantidadeLojasPAtual = dados.lojasP.quantidade;
    const quantidadeLojasMAtual = dados.lojasM.quantidade;
    const quantidadeLojasGAtual = dados.lojasG.quantidade;

    const todosSuficientes =
      quantidadeTerrenosAtual >= quantidadeTerrenos &&
      quantidadeLojasPAtual >= quantidadeLojasP &&
      quantidadeLojasMAtual >= quantidadeLojasM &&
      quantidadeLojasGAtual >= quantidadeLojasG;

    setVerificador(todosSuficientes);
  }, [dados, setorAtivo]);

  useEffect(() => {
    const edificio = "lojasP";
    const qtdAtual = dados[edificio]?.quantidade;
    const qtdNecessaria =
      dados[setorAtivo]?.edificios?.[index]?.lojasNecessarias?.[edificio];

    const edificioSuficiente =
      edificio === "terrenos"
        ? "terrenosSuficientes"
        : edificio === "lojasP"
        ? "lojasPSuficientes"
        : edificio === "lojasM"
        ? "lojasMSuficientes"
        : edificio === "lojasG"
        ? "lojasGSuficientes"
        : "lascou";

    if (qtdAtual >= qtdNecessaria) {
      const novoEdificio = {
        ...dados[setorAtivo].edificios[index],
        lojasNecessarias: {
          ...dados[setorAtivo].edificios[index].lojasNecessarias,
          [edificioSuficiente]: true,
        },
      };

      const novaLista = [...dados[setorAtivo].edificios];
      novaLista[index] = novoEdificio;

      atualizarDados({
        ...dados,
        [setorAtivo]: {
          ...dados[setorAtivo],
          edificios: novaLista,
        },
      });
    }
  }, [dados.dia]);

  const [caixaTexto, setCaixaTexto] = useState(false);

  const edificio = {
    nome: dados[setorAtivo].edificios[index].nome,
    recursoDeConstrução: dados[setorAtivo].edificios[index].recursoDeConstrução,
    construNece: dados[setorAtivo].edificios[index].construçõesNecessárias,
  };
  const arrayConstResources = edificio.recursoDeConstrução;
  const arrayConstNece = edificio.construNece;

  const formatarNumero = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(1).replace(".0", "") + "T"; // Trilhões
    if (num >= 1e9) return (num / 1e9).toFixed(1).replace(".0", "") + "B"; // Bilhões
    if (num >= 1e6) return (num / 1e6).toFixed(1).replace(".0", "") + "M"; // Milhões
    if (num >= 1e3) return (num / 1e3).toFixed(1).replace(".0", "") + "K"; // Milhares
    return num.toString();
  };
  const setoresArr = [
    "agricultura",
    "tecnologia",
    "comercio",
    "industria",
    "imobiliario",
    "energia",
  ];

  const booleanPreReq = (nomeEd) => {
    for (const setor of setoresArr) {
      const idx = dados[setor].edificios.findIndex((ed) => ed.nome === nomeEd);
      if (idx !== -1) {
        return dados[setor].edificios[idx].quantidade > 0;
      }
    }
    return false;
  };

  let timer;

  const openModalPowerUps = () => {
    setModalPowerUp(true);
  };

  const fecharModalPowerUp = () => {
    setModalPowerUp(false);
  };

  const handleMouseEnter = () => {
    // Aguardar 1 segundo (1000ms) após o mouse entrar
    timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 0);
  };

  const handleMouseLeave = () => {
    // Se o mouse sair antes de 1 segundo, cancela a ação
    clearTimeout(timer);
  };

  const handleMouseLeaveFinal = () => {
    // Aguardar 1 segundo (1000ms) após o mouse entrar
    timer = setTimeout(() => {
      setIsModalOpen(false);
    }, 1200);
  };

  // const [rotateX, setRotateX] = useState(0);
  // const [rotateY, setRotateY] = useState(0);

  // const handleMouseMove = (e) => {
  //     const { clientX, clientY, currentTarget } = e;
  //     const { left, top, width, height } = currentTarget.getBoundingClientRect();

  //     const x = (clientX - left) / width - 0.5;
  //     const y = (clientY - top) / height - 0.5;

  //     setRotateX(y * 30);
  //     setRotateY(x * 30);
  // };

  // const resetRotation = () => {
  //     setRotateX(0);
  //     setRotateY(0);
  // };

  function calcularCustoRecurso(nomeRecurso, nivel = 1) {
    //   console.log("🔍".repeat(nivel), `Verificando recurso: ${nomeRecurso}`);

    for (const setor of setoresArr) {
      const edificioEncontrado = dados[setor]?.edificios?.find(
        (e) => e.nome === nomeRecurso
      );

      if (edificioEncontrado) {
        //   console.log("✅".repeat(nivel), `Edifício encontrado: ${edificioEncontrado.nome}, no setor: ${setor}`);

        const custoConstrucaoRecurso = edificioEncontrado.custoConstrucao || 0;
        //   console.log("🏗️".repeat(nivel), `Custo da construção: ${custoConstrucaoRecurso}`);

        const quantidadeTerrenosNec =
          edificioEncontrado.lojasNecessarias.terrenos || 0;
        const quantidadeLojasPNec =
          edificioEncontrado.lojasNecessarias.lojasP || 0;
        const quantidadeLojasMNec =
          edificioEncontrado.lojasNecessarias.lojasM || 0;
        const quantidadeLojasGNec =
          edificioEncontrado.lojasNecessarias.lojasG || 0;

        //   console.log("📦".repeat(nivel), `Lojas necessárias → Terrenos: ${quantidadeTerrenosNec}, P: ${quantidadeLojasPNec}, M: ${quantidadeLojasMNec}, G: ${quantidadeLojasGNec}`);

        const custoTotalTerrenos =
          quantidadeTerrenosNec * dados.terrenos.preçoConstrução;

        const custoTotalLojasP =
          quantidadeLojasPNec *
          (dados.lojasP.preçoConstrução +
            dados.lojasP.quantidadeNecTerreno * dados.terrenos.preçoConstrução);

        const custoTotalLojasM =
          quantidadeLojasMNec *
          (dados.lojasM.preçoConstrução +
            dados.lojasM.quantidadeNecTerreno * dados.terrenos.preçoConstrução);

        const custoTotalLojasG =
          quantidadeLojasGNec *
          (dados.lojasG.preçoConstrução +
            dados.lojasG.quantidadeNecTerreno * dados.terrenos.preçoConstrução);

        //   console.log("💰".repeat(nivel), `Custo total → Terrenos: ${custoTotalTerrenos}, LojasP: ${custoTotalLojasP}, LojasM: ${custoTotalLojasM}, LojasG: ${custoTotalLojasG}`);

        // Soma do próprio custo de construção + lojas
        let custoTotalRecurso =
          custoConstrucaoRecurso +
          custoTotalTerrenos +
          custoTotalLojasP +
          custoTotalLojasM +
          custoTotalLojasG;

        // Recursão para os recursos de construção desse edifício
        if (
          Array.isArray(edificioEncontrado.recursoDeConstrução) &&
          edificioEncontrado.recursoDeConstrução.length > 0
        ) {
          // console.log("🔁".repeat(nivel), `Iniciando cálculo de recursos de construção para: ${edificioEncontrado.nome}`);

          edificioEncontrado.recursoDeConstrução.forEach((subRecurso) => {
            const custoSub = calcularCustoRecurso(subRecurso, nivel + 1);
            //   console.log("➕".repeat(nivel), `Adicionando custo do sub-recurso ${subRecurso}: ${custoSub}`);
            custoTotalRecurso += custoSub;
          });
        } else {
          // console.log("✅".repeat(nivel), `${edificioEncontrado.nome} não possui recursos adicionais.`);
        }

        //   console.log("📊".repeat(nivel), `Custo total calculado de ${nomeRecurso} = ${custoTotalRecurso}`);

        return custoTotalRecurso; // retorna o total desse recurso
      }
    }

    //   console.warn("⚠️".repeat(nivel), `Recurso não encontrado: ${nomeRecurso}`);
    return 0; // Caso não encontrado
  }

  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const getImageUrl = (nomeArquivo) => `/imagens/${nomeArquivo}.png`;

  const handleShow = (id) => setVisibleId(id);
  const handleHide = () => setVisibleId(null);

  const powerUps = [
    { nivel1: "qtd", cor: "#8F5ADA" },
    { nivel2: "qtd", cor: "#6411D9" },
    { nivel3: "qtd", cor: "#350973" },
  ];

  const setorInfo = setores.find((setor) => setor.id === setorAtivo);
  // const nomeAtivo = dados[setorAtivo].edificios[index].nome
  // const quantidadeAtivo = dados[setorAtivo].edificios[index].quantidade;

  const quantidadeMinimaPowerUpNv2 =
    dados[setorAtivo].edificios[index].powerUp.nível2.quantidadeMínima;
  const quantidadeMinimaPowerUpNv3 =
    dados[setorAtivo].edificios[index].powerUp.nível3.quantidadeMínima;
  const corPadrão = { backgroundColor: setorInfo.cor2 };

  const corPowerUp = (powerUp) => {
    switch (powerUp) {
      case "powerUpNv1":
        return "#8F5ADA";
      case "powerUpNv2":
        return "#6411D9";
      case "powerUpNv3":
        return "#350973";
      default:
        return corPadrão;
    }
  };

  // Atualiza sempre que arrayConstResources ou dados mudarem
  useEffect(() => {
    const setoresArr = [
      "agricultura",
      "tecnologia",
      "comercio",
      "industria",
      "imobiliario",
      "energia",
    ];

    const verificarEdificios = (listaEdificios) => {
      return listaEdificios.some((nomeEdificio) => {
        const setor = setoresArr.find((s) =>
          dados[s]?.edificios?.some((ed) => ed.nome === nomeEdificio)
        );
        if (!setor) return true;

        const index = dados[setor].edificios.findIndex(
          (ed) => ed.nome === nomeEdificio
        );
        return dados[setor].edificios[index]?.quantidade <= 0;
      });
    };

    const faltandoRecurso = verificarEdificios(arrayConstResources || []);
    const faltandoConstrucao = verificarEdificios(arrayConstNece || []);

    setVerificadorConstr(faltandoRecurso || faltandoConstrucao);
  }, [arrayConstResources, arrayConstNece, dados]);

  const quantidadeTerrenosNec =
    dados[setorAtivo].edificios[index].lojasNecessarias.terrenos;
  const quantidadeLojasPNec =
    dados[setorAtivo].edificios[index].lojasNecessarias.lojasP;
  const quantidadeLojasMNec =
    dados[setorAtivo].edificios[index].lojasNecessarias.lojasM;
  const quantidadeLojasGNec =
    dados[setorAtivo].edificios[index].lojasNecessarias.lojasG;

  const custoTotalTerrenos =
    quantidadeTerrenosNec * dados.terrenos.preçoConstrução;
  const custoTotalLojasP =
    quantidadeLojasPNec *
    (dados.lojasP.preçoConstrução +
      dados.lojasP.quantidadeNecTerreno * dados.terrenos.preçoConstrução);

  const custoTotalLojasM =
    quantidadeLojasMNec *
    (dados.lojasM.preçoConstrução +
      dados.lojasM.quantidadeNecTerreno * dados.terrenos.preçoConstrução);

  const custoTotalLojasG =
    quantidadeLojasGNec *
    (dados.lojasG.preçoConstrução +
      dados.lojasG.quantidadeNecTerreno * dados.terrenos.preçoConstrução);

  const CustoTotalSomadoLojas =
    custoTotalTerrenos + custoTotalLojasP + custoTotalLojasM + custoTotalLojasG;
  // console.log(custoTotalTerrenos)
  // console.log(custoTotalLojasP)
  // console.log(custoTotalLojasM)
  // console.log(custoTotalLojasG)
  // console.log(CustoTotalSomadoLojas)

  const podeComprarCard = (edif, setorAtivo) => {
    const setoresArr = [
      "agricultura",
      "tecnologia",
      "comercio",
      "industria",
      "imobiliario",
      "energia",
    ];

    const localizador = (nomeEdificio) => {
      for (const setor of setoresArr) {
        const index = dados[setor]?.edificios?.findIndex(
          (e) => e.nome === nomeEdificio
        );
        if (index !== -1) return dados[setor].edificios[index];
      }
      return null;
    };

    // 🔹 1. Edifício válido
    if (!edif) return { ok: false, motivo: "Edifício não encontrado" };

    // 🔹 2. Limites
    const carteira = economiaSetores?.carteira?.carteiraAtual ?? [];
    const resultado = verificarLimites(edif, setorAtivo, carteira);
    if (resultado !== true) return { ok: false, motivo: resultado };

    // 🔹 3. Saldo suficiente
    const custo = Number(edif.custoConstrucao ?? 0);
    if (economiaSetores.saldo < custo)
      return { ok: false, motivo: "Saldo insuficiente" };

    // 🔹 4. Lojas / Terrenos necessários
    const {
      terrenos = 0,
      lojasP = 0,
      lojasM = 0,
      lojasG = 0,
    } = edif.lojasNecessarias || {};
    const temTerrenos = (dados.terrenos?.quantidade ?? 0) >= terrenos;
    const temP = (dados.lojasP?.quantidade ?? 0) >= lojasP;
    const temM = (dados.lojasM?.quantidade ?? 0) >= lojasM;
    const temG = (dados.lojasG?.quantidade ?? 0) >= lojasG;
    if (!temTerrenos || !temP || !temM || !temG)
      return {
        ok: false,
        motivo: "Você não tem lojas ou terrenos suficientes",
      };

    // 🔹 5. Construções necessárias
    if (edif.construçõesNecessárias?.length) {
      for (const nome of edif.construçõesNecessárias) {
        const ref = localizador(nome);
        if (!ref)
          return {
            ok: false,
            motivo: `Construção necessária "${nome}" não encontrada`,
          };
        if (ref.quantidade <= 0)
          return {
            ok: false,
            motivo: `Você precisa de pelo menos 1 unidade de "${nome}"`,
          };
      }
    }

    // 🔹 6. Recursos de construção
    if (edif.recursoDeConstrução?.length) {
      for (const nome of edif.recursoDeConstrução) {
        const ref = localizador(nome);
        if (!ref)
          return {
            ok: false,
            motivo: `Recurso de construção "${nome}" não encontrado`,
          };
        if (ref.quantidade <= 0)
          return {
            ok: false,
            motivo: `Você precisa de pelo menos 1 unidade de "${nome}"`,
          };
      }
    }

    return { ok: true };
  };

  const edif = dados?.[setorAtivo]?.edificios?.[index];
  const { ok: podeComprar, motivo } = podeComprarCard(edif, setorAtivo);

  const comprarCard = () => {
    console.log("=== comprarCard START ===");

    const setoresArr = [
      "agricultura",
      "tecnologia",
      "comercio",
      "industria",
      "imobiliario",
      "energia",
    ];

    // 🔹 Função para localizar edifícios
    const localizador = (nomeEdificio) => {
      for (const setor of setoresArr) {
        const index = dados[setor]?.edificios?.findIndex(
          (e) => e.nome === nomeEdificio
        );
        if (index !== -1) {
          return { setor, index, edificio: dados[setor].edificios[index] };
        }
      }
      return null;
    };

    // 🔹 Edifício que está sendo comprado
    const edif = dados?.[setorAtivo]?.edificios?.[index];
    if (!edif) {
      console.error("Edifício não encontrado", { setorAtivo, index, dados });
      atualizarDados("modalAlert", {
        ...dados.modalAlert,
        estadoModal: true,
        head: "Erro",
        content: "Erro: edifício não encontrado.",
      });
      return;
      //   alert("Erro: edifício não encontrado.");
    }
    console.log(
      "Tentando comprar:",
      edif.nome,
      "quantidade atual:",
      edif.quantidade
    );

    // 🔹 Carteira atual
    const carteira = economiaSetores?.carteira?.carteiraAtual ?? [];
    console.log("Carteira atual antes da compra:", carteira);

    // 🔹 Verificar limites
    const resultado = verificarLimites(edif, setorAtivo, carteira);
    if (resultado !== true) {
      console.warn("Compra bloqueada:", resultado);

      return;
      //alert(resultado);
    }
    console.log("Verificações de limite ok");

    // 🔹 Verificar saldo
    const custo = Number(edif.custoConstrucao ?? 0);
    if (economiaSetores.saldo < custo) {
      atualizarDados("modalAlert", {
        ...dados.modalAlert,
        estadoModal: true,
        head: "Erro na construção",
        content: "Você não tem dinheiro suficiente para construir.",
      });
      return;
      // alert("Você não tem dinheiro suficiente para construir.");
    }

    // 🔹 Verificar lojas/terrenos
    const {
      terrenos: qTerrenos = 0,
      lojasP: qP = 0,
      lojasM: qM = 0,
      lojasG: qG = 0,
    } = edif.lojasNecessarias || {};
    const qTerrenosAtual = Number(dados?.terrenos?.quantidade ?? 0);
    const qPAtual = Number(dados?.lojasP?.quantidade ?? 0);
    const qMAtual = Number(dados?.lojasM?.quantidade ?? 0);
    const qGAtual = Number(dados?.lojasG?.quantidade ?? 0);

    if (
      qTerrenos > qTerrenosAtual ||
      qP > qPAtual ||
      qM > qMAtual ||
      qG > qGAtual
    ) {
      atualizarDados("modalAlert", {
        ...dados.modalAlert,
        estadoModal: true,
        head: "Falta edifícios base de construção",
        content: "Você não tem lojas/terrenos suficientes.",
      });
      return;
    }
    //   return alert("Você não tem lojas/terrenos suficientes.");

    // 🔹 Construções necessárias
    if (edif.construçõesNecessárias?.length) {
      for (const nome of edif.construçõesNecessárias) {
        const res = localizador(nome);
        if (!res) {
          atualizarDados("modalAlert", {
            ...dados.modalAlert,
            estadoModal: true,
            head: `Falta ${nome} para construir`,
            content: `Construção necessária "${nome}" não encontrada.`,
          });
          return;
        }
        //   return alert(`Construção necessária "${nome}" não encontrada.`);
        if (res.edificio.quantidade <= 0) {
          atualizarDados("modalAlert", {
            ...dados.modalAlert,
            estadoModal: true,
            head: `Falta ${nome} para construir`,
            content: `Você precisa de pelo menos 1 unidade de "${nome}".`,
          });
          return;
        }
        //   return alert(`Você precisa de pelo menos 1 unidade de "${nome}".`);
      }
    }

    // 🔹 Recursos de construção
    if (edif.recursoDeConstrução?.length) {
      for (const nome of edif.recursoDeConstrução) {
        const res = localizador(nome);
        if (!res) {
          atualizarDados("modalAlert", {
            ...dados.modalAlert,
            estadoModal: true,
            head: `Erro ao encontrar a construção`,
            content: `Recurso de construção "${nome}" não encontrado.`,
          });
          return;
        }

        //   return alert(`Recurso de construção "${nome}" não encontrado.`);
        if (res.edificio.quantidade <= 0) {
          atualizarDados("modalAlert", {
            ...dados.modalAlert,
            estadoModal: true,
            head: `Você precisa ter essa construção`,
            content: `Você precisa de pelo menos 1 unidade de "${nome}".`,
          });
          return;
        }

        //   return alert(`Você precisa de pelo menos 1 unidade de "${nome}".`);
      }
    }

    // === Compra aprovada ===
    console.log("Compra aprovada. Aplicando atualizações...");
    buttonPurchaseEdifAudio();
    // 🔹 1) Deduz saldo
    atualizarEco("saldo", economiaSetores.saldo - custo);

    // 🔹 2) Incrementa quantidade do edifício
    const novaQuantidade = (edif.quantidade || 0) + 1;
    atualizarDadosProf2(
      [setorAtivo, "edificios", index, "quantidade"],
      novaQuantidade
    );

    // 🔹 3) Deduz lojas/terrenos
    atualizarDadosProf2(["terrenos", "quantidade"], qTerrenosAtual - qTerrenos);
    atualizarDadosProf2(["lojasP", "quantidade"], qPAtual - qP);
    atualizarDadosProf2(["lojasM", "quantidade"], qMAtual - qM);
    atualizarDadosProf2(["lojasG", "quantidade"], qGAtual - qG);

    const custosEdBase =
      qTerrenos * dados.terrenos.preçoConstrução +
      qP *
        (dados.lojasP.preçoConstrução +
          dados.lojasP.quantidadeNecTerreno * dados.terrenos.preçoConstrução) +
      qM *
        (dados.lojasM.preçoConstrução +
          dados.lojasM.quantidadeNecTerreno * dados.terrenos.preçoConstrução) +
      qG *
        (dados.lojasG.preçoConstrução +
          dados.lojasG.quantidadeNecTerreno * dados.terrenos.preçoConstrução);

    // 🔹 4) Deduz recursos de construção
    if (edif.recursoDeConstrução?.length) {
      for (const nome of edif.recursoDeConstrução) {
        const {
          setor: sRec,
          index: iRec,
          edificio: edifRec,
        } = localizador(nome) || {};
        if (edifRec)
          atualizarDadosProf2(
            [sRec, "edificios", iRec, "quantidade"],
            (edifRec.quantidade || 0) - 1
          );
      }
    }

    // 🔹 5) Atualiza carteira imediatamente
    const setorIndex = setoresArr.indexOf(setorAtivo);
    const novaCarteira = [...carteira];
    if (!novaCarteira[setorIndex]) novaCarteira[setorIndex] = [];
    novaCarteira[setorIndex] = [
      ...novaCarteira[setorIndex],
      { ...edif, quantidade: 1 },
    ]; // adiciona 1 unidade
    atualizarEco("carteira", {
      ...economiaSetores.carteira,
      carteiraAtual: novaCarteira,
    });

    console.log("Carteira atualizada:", novaCarteira);

    atualizarEco(
      "patrimonio",
      economiaSetores.patrimonio + custosEdBase + custo
    );
    // atualizarEco(
    //   "economiaSetor",
    //     {...economiaSetores[setorAtivo].economiaSetor,patrimonio: + custosEdBase + custo}
    // );

    atualizarEco("patrimônio", {
      ...economiaSetores[setorAtivo].economiaSetor,
      patrimonio:
        economiaSetores[setorAtivo].economiaSetor.patrimonio +
        custosEdBase +
        custo,
    });

    console.log(economiaSetores[setorAtivo].economiaSetor, "patrimonio");

    // atualizarEco("patrimônio", {
    //   ...economiaSetores,
    //   [setorAtivo]: {
    //     ...economiaSetores[setorAtivo],
    //     economiaSetor: {
    //       ...economiaSetores[setorAtivo].economiaSetor,
    //       patrimonio:
    //         economiaSetores[setorAtivo].economiaSetor.patrimonio +
    //         custosEdBase +
    //         custo,
    //     },
    //   },
    // });

    // atualizarEco("patrimonio", economiaSetores.agricultura.economiaSetor.patrimonio + custosEdBase + custo);

    // 🔹 6) Atualiza centralEdificios
    const atualizarCentralEdificios = () => {
      const carteiraNorm = setoresArr.map((_, i) =>
        Array.isArray(novaCarteira[i]) ? novaCarteira[i] : []
      );
      let totalEdificios = 0;
      const nomesSet = new Set();
      carteiraNorm.forEach((arr) => {
        arr.forEach((item) => {
          if (!item) return;
          nomesSet.add(item.nome);
          totalEdificios += Number(item.quantidade ?? 1);
        });
      });
      const setoresAtivos = carteiraNorm.reduce(
        (acc, arr) => acc + (arr.length > 0 ? 1 : 0),
        0
      );

      const novosCentral = {
        ...economiaSetores.centralEdificios,
        quantidadeSetoresAtual: setoresAtivos,
        QuantidadeEdifíciosAtual: totalEdificios,
        QuantidadeDiversosEdificiosAtual: nomesSet.size,
      };

      atualizarEco("centralEdificios", novosCentral);
      console.log("centralEdificios atualizado:", novosCentral);
    };

    atualizarCentralEdificios();

    console.log("=== comprarCard END ===");
  };

  const nomeFatu = dados[setorAtivo].edificios[index].nome;

  // console.log(nomeFatu)
  // const columnStyleNv1 =  { backgroundColor: bgColuna };

  // const columnStyleNv2 = { backgroundColor: "#6411D9" };
  // const columnStyleNv3 = { backgroundColor: "#350973" };
  // if(temAtivo){

  // } else{
  //     corLinha:
  // }
  // const [acumuladorPowerUpRedCustoFornece, setAcumuladorPowerUpRedCustoFornece] = useState(0);
  // const [acumuladorPowerUpAumFatuFornece, setAcumuladorPowerUpAumFatuFornece] = useState(0);

  // const [acumuladorPowerUpRedCustoRecebe, setAcumuladorPowerUpRedCustoRecebe] = useState(0);
  // const [acumuladorPowerUpAumFatuRecebe, setAcumuladorPowerUpAumFatuRecebe] = useState(0);

  let setorEncontrado = null;

  let indice = -1;
  const quantidadeAtivoAtual = dados[setorAtivo].edificios[index].quantidade;

  const powerUpSelecionado =
    quantidadeAtivoAtual >= quantidadeMinimaPowerUpNv3
      ? "powerUpNv3"
      : quantidadeAtivoAtual >= quantidadeMinimaPowerUpNv2
      ? "powerUpNv2"
      : "powerUpNv1";

  const corPowerUpAtual = corPowerUp(powerUpSelecionado);
  const corColunaAtual = corPadrão; // Definição da variável antes de usá-la

  const corColuna =
    corColunaAtual === corPowerUpAtual ? corPowerUpAtual : corPadrão;
  const corLinha = quantidadeAtivoAtual > 0 ? corPowerUpAtual : corPadrão;

  const lineStyle = { background: corLinha };
  // const bgColuna1 = powerUpSelecionado === "powerUpNv1" ? corPowerUp("powerUpNv1"):  powerUpSelecionado === "powerUpNv2" ? corPowerUp("powerUpNv2") : corPowerUp("powerUpNv3");
  const bgColuna1 =
    corLinha === "#8F5ADA"
      ? corPowerUp("powerUpNv1")
      : powerUpSelecionado === "powerUpNv2"
      ? corPowerUp("powerUpNv2")
      : powerUpSelecionado === "powerUpNv3"
      ? corPowerUp("powerUpNv3")
      : corPadrão;

  const bgColuna2 =
    powerUpSelecionado === "powerUpNv1"
      ? corPadrão
      : powerUpSelecionado === "powerUpNv2"
      ? corPowerUp("powerUpNv2")
      : corPowerUp("powerUpNv3");

  const bgColuna3 =
    powerUpSelecionado === "powerUpNv1"
      ? corPadrão
      : powerUpSelecionado === "powerUpNv2"
      ? corPadrão
      : corPowerUp("powerUpNv3");
  const columnStyleNv1 = { backgroundColor: bgColuna1 };
  const columnStyleNv2 = { backgroundColor: bgColuna2 };
  const columnStyleNv3 = { backgroundColor: bgColuna3 };

  // console.log(dados[setorAtivo].edificios[index])

  // dados[setorAtivo].edificios[index].RecebeMelhoraEficiencia.map((edMelhorado, i) => {

  //         // Se não achou nenhum, loga o erro e evita travamento
  //         console.warn(`❌ Edifício "${edMelhorado}" não encontrado em nenhum setor.`);
  //       // ou null, se quiser deixar explícito

  //       function descobrirSetor(edMelhorado) {
  //         return mapaEdificioParaSetor[edMelhorado] || null;
  //       }

  //     console.log(valorFinalMês)
  //     console.log(rentabilidade)
  //     console.log(impostoSobreFatuFinal)
  //     console.log(valorFatuFinal)
  //     console.log(valorImpostoFixoFinal)
  //     console.log(acumuladorPowerUpAumFatuRecebe)
  //     console.log(acumuladorPowerUpRedCustoRecebe)

  // })

  // useEffect(() => {
  //     atualizarDadosProf2([setorAtivo, "edificios", index, "powerUp", "aumFatuAtual"], acumuladorPowerUpAumFatuFornece);
  // }, [acumuladorPowerUpAumFatuFornece]);

  // useEffect(() => {
  //     atualizarDadosProf2([setorAtivo, "edificios", index, "powerUp", "aumFatuAtual"], acumuladorPowerUpRedCustoFornece);
  // }, [acumuladorPowerUpRedCustoFornece]);

  // useEffect(() => {
  //     atualizarDadosProf2([setorAtivo, "edificios", index, "powerUp", "aumFatuAtual"], acumuladorPowerUpAumFatuRecebe);
  // }, [acumuladorPowerUpAumFatuRecebe]);

  // useEffect(() => {
  //     atualizarDadosProf2([setorAtivo, "edificios", index, "powerUp", "aumFatuAtual"], acumuladorPowerUpRedCustoRecebe);
  // }, [acumuladorPowerUpRedCustoRecebe]);

  const [
    acumuladorPowerUpRedCustoFornece,
    setAcumuladorPowerUpRedCustoFornece,
  ] = useState(0);
  const [acumuladorPowerUpAumFatuFornece, setAcumuladorPowerUpAumFatuFornece] =
    useState(0);
  const [acumuladorPowerUpRedCustoRecebe, setAcumuladorPowerUpRedCustoRecebe] =
    useState(0);
  const [acumuladorPowerUpAumFatuRecebe, setAcumuladorPowerUpAumFatuRecebe] =
    useState(0);

  // Aqui sim, fazemos o cálculo num useEffect:
  useEffect(() => {
    let novoAcumuladorRedCusto = 0;
    let novoAcumuladorAumFatu = 0;

    dados[setorAtivo].edificios[index].ForneceMelhoraEficiencia.forEach(
      (edMelhorado) => {
        let setorEncontrado = null;
        let indice = -1;
        const quantidadeAtivo = (nomeEd) => {
          for (const setor of setoresArr) {
            setorEncontrado = setor;
            indice = dados[setorEncontrado].edificios.findIndex(
              (ed) => ed.nome === nomeEd
            );
            if (indice !== -1) {
              return dados[setor].edificios[indice].quantidade;
            }
          }
          return 0;
        };

        const qtdMelhorado = quantidadeAtivo(edMelhorado.nome);
        const qtd = quantidadeAtivo(dados[setorAtivo].edificios[index].nome);
        const economiaSetor =
          economiaSetores[setorAtivo]?.economiaSetor?.estadoAtual || "estável";
        const fatorEconomico = {
          recessão: 0.4,
          declinio: 0.8,
          estável: 1,
          progressiva: 1.1,
          aquecida: 1.25,
        }[economiaSetor];
        const powerUpSelecionado =
          qtd >= quantidadeMinimaPowerUpNv3
            ? "powerUpNv3"
            : qtd >= quantidadeMinimaPowerUpNv2
            ? "powerUpNv2"
            : "powerUpNv1";

        if (qtdMelhorado > 0) {
          const ValorpowerUpAtualRedCustoFornece =
            powerUpSelecionado === "powerUpNv1"
              ? edMelhorado.redCusto.nível1
              : powerUpSelecionado === "powerUpNv2"
              ? edMelhorado.redCusto.nível2
              : edMelhorado.redCusto.nível3;

          novoAcumuladorRedCusto += ValorpowerUpAtualRedCustoFornece;

          const ValorpowerUpAtualAumFatuFornece =
            powerUpSelecionado === "powerUpNv1"
              ? edMelhorado.aumFatu.nível1
              : powerUpSelecionado === "powerUpNv2"
              ? edMelhorado.aumFatu.nível2
              : edMelhorado.aumFatu.nível3;

          novoAcumuladorAumFatu += ValorpowerUpAtualAumFatuFornece;
        }
      }
    );

    setAcumuladorPowerUpRedCustoFornece(novoAcumuladorRedCusto);
    setAcumuladorPowerUpAumFatuFornece(novoAcumuladorAumFatu);
  }, [
    dados,
    setorAtivo,
    index,
    setoresArr,
    quantidadeMinimaPowerUpNv2,
    quantidadeMinimaPowerUpNv3,
  ]);

  useEffect(() => {
    let novoAcumuladorRedCusto = 0;
    let novoAcumuladorAumFatu = 0;

    dados[setorAtivo].edificios[index].RecebeMelhoraEficiencia.forEach(
      (edMelhorado) => {
        let setorEncontrado = null;
        let indice = -1;
        const quantidadeAtivo = (nomeEd) => {
          for (const setor of setoresArr) {
            setorEncontrado = setor;
            indice = dados[setorEncontrado].edificios.findIndex(
              (ed) => ed.nome === nomeEd
            );
            if (indice !== -1) {
              return dados[setor].edificios[indice].quantidade;
            }
          }
          return 0;
        };

        const qtdMelhorado = quantidadeAtivo(edMelhorado.nome);
        const qtd = quantidadeAtivo(dados[setorAtivo].edificios[index].nome);

        const powerUpSelecionado =
          qtd >= quantidadeMinimaPowerUpNv3
            ? "powerUpNv3"
            : qtd >= quantidadeMinimaPowerUpNv2
            ? "powerUpNv2"
            : "powerUpNv1";

        if (qtdMelhorado > 0) {
          const ValorpowerUpAtualRedCustoFornece =
            powerUpSelecionado === "powerUpNv1"
              ? edMelhorado.redCusto.nível1
              : powerUpSelecionado === "powerUpNv2"
              ? edMelhorado.redCusto.nível2
              : edMelhorado.redCusto.nível3;

          novoAcumuladorRedCusto += ValorpowerUpAtualRedCustoFornece;

          const ValorpowerUpAtualAumFatuFornece =
            powerUpSelecionado === "powerUpNv1"
              ? edMelhorado.aumFatu.nível1
              : powerUpSelecionado === "powerUpNv2"
              ? edMelhorado.aumFatu.nível2
              : edMelhorado.aumFatu.nível3;

          novoAcumuladorAumFatu += ValorpowerUpAtualAumFatuFornece;
        }
      }
    );

    setAcumuladorPowerUpRedCustoRecebe(novoAcumuladorRedCusto);
    setAcumuladorPowerUpAumFatuRecebe(novoAcumuladorAumFatu);
    // console.log(acumuladorPowerUpAumFatuRecebe)
    // console.log(acumuladorPowerUpRedCustoRecebe)
  }, [
    dados,
    setorAtivo,
    index,
    setoresArr,
    quantidadeMinimaPowerUpNv2,
    quantidadeMinimaPowerUpNv3,
  ]);

  const valorFatu =
    dados[setorAtivo].edificios[index].finanças.faturamentoUnitário;
  const valorImpostoFixo =
    dados[setorAtivo].edificios[index].finanças.impostoFixo;
  const impostoSobreFatu =
    dados[setorAtivo].edificios[index].finanças.impostoSobreFatu;
  const custoConstrução = dados[setorAtivo].edificios[index].custoConstrucao;

      const fatorEconomico = {
        "recessão": 0.4,
        "declinio": 0.8,
        "estável": 1,
        "progressiva": 1.1,
        "aquecida": 1.25,
    }[economiaSetor];
  const impostoSobreFatuFinal =
    impostoSobreFatu -
    impostoSobreFatu * (acumuladorPowerUpRedCustoRecebe / 100);
  const valorFatuFinal =
    valorFatu + valorFatu * (acumuladorPowerUpAumFatuRecebe / 100);
  // * valorEconomiaSetor
  const valorImpostoFixoFinal =
    valorImpostoFixo -
    valorImpostoFixo * (acumuladorPowerUpRedCustoRecebe / 100);

  let custoRecursos = 0;

  // Função recursiva para calcular custo total de um recurso
  function calcularCustoRecurso(nomeRecurso, nivel = 1) {
    //   console.log("🔍".repeat(nivel), `Verificando recurso: ${nomeRecurso}`);

    for (const setor of setoresArr) {
      const edificioEncontrado = dados[setor]?.edificios?.find(
        (e) => e.nome === nomeRecurso
      );

      if (edificioEncontrado) {
        //   console.log("✅".repeat(nivel), `Edifício encontrado: ${edificioEncontrado.nome}, no setor: ${setor}`);

        const custoConstrucaoRecurso = edificioEncontrado.custoConstrucao || 0;
        //   console.log("🏗️".repeat(nivel), `Custo da construção: ${custoConstrucaoRecurso}`);

        const quantidadeTerrenosNec =
          edificioEncontrado.lojasNecessarias.terrenos || 0;
        const quantidadeLojasPNec =
          edificioEncontrado.lojasNecessarias.lojasP || 0;
        const quantidadeLojasMNec =
          edificioEncontrado.lojasNecessarias.lojasM || 0;
        const quantidadeLojasGNec =
          edificioEncontrado.lojasNecessarias.lojasG || 0;

        //   console.log("📦".repeat(nivel), `Lojas necessárias → Terrenos: ${quantidadeTerrenosNec}, P: ${quantidadeLojasPNec}, M: ${quantidadeLojasMNec}, G: ${quantidadeLojasGNec}`);

        const custoTotalTerrenos =
          quantidadeTerrenosNec * dados.terrenos.preçoConstrução;

        const custoTotalLojasP =
          quantidadeLojasPNec *
          (dados.lojasP.preçoConstrução +
            dados.lojasP.quantidadeNecTerreno * dados.terrenos.preçoConstrução);

        const custoTotalLojasM =
          quantidadeLojasMNec *
          (dados.lojasM.preçoConstrução +
            dados.lojasM.quantidadeNecTerreno * dados.terrenos.preçoConstrução);

        const custoTotalLojasG =
          quantidadeLojasGNec *
          (dados.lojasG.preçoConstrução +
            dados.lojasG.quantidadeNecTerreno * dados.terrenos.preçoConstrução);

        //   console.log("💰".repeat(nivel), `Custo total → Terrenos: ${custoTotalTerrenos}, LojasP: ${custoTotalLojasP}, LojasM: ${custoTotalLojasM}, LojasG: ${custoTotalLojasG}`);

        // Soma do próprio custo de construção + lojas
        let custoTotalRecurso =
          custoConstrucaoRecurso +
          custoTotalTerrenos +
          custoTotalLojasP +
          custoTotalLojasM +
          custoTotalLojasG;

        // Recursão para os recursos de construção desse edifício
        if (
          Array.isArray(edificioEncontrado.recursoDeConstrução) &&
          edificioEncontrado.recursoDeConstrução.length > 0
        ) {
          // console.log("🔁".repeat(nivel), `Iniciando cálculo de recursos de construção para: ${edificioEncontrado.nome}`);

          edificioEncontrado.recursoDeConstrução.forEach((subRecurso) => {
            const custoSub = calcularCustoRecurso(subRecurso, nivel + 1);
            //   console.log("➕".repeat(nivel), `Adicionando custo do sub-recurso ${subRecurso}: ${custoSub}`);
            custoTotalRecurso += custoSub;
          });
        } else {
          // console.log("✅".repeat(nivel), `${edificioEncontrado.nome} não possui recursos adicionais.`);
        }

        //   console.log("📊".repeat(nivel), `Custo total calculado de ${nomeRecurso} = ${custoTotalRecurso}`);

        return custoTotalRecurso; // retorna o total desse recurso
      }
    }

    //   console.warn("⚠️".repeat(nivel), `Recurso não encontrado: ${nomeRecurso}`);
    return 0; // Caso não encontrado
  }

  // Início do cálculo principal com a lista original
  arrayConstResources?.forEach((nomeRecurso) => {
    const custo = calcularCustoRecurso(nomeRecurso);
    //   console.log("💼 Custo acumulado do recurso", nomeRecurso, "=", custo);
    custoRecursos += custo;
  });

  // console.log("🔚 Custo total acumulado de todos os recursos:", custoRecursos);

  let fatuMensal = valorFatuFinal * 30 * fatorEconomico;
  let valorImpostoSobreFatu = fatuMensal * impostoSobreFatuFinal;
  // console.log("custoRecursos", custoRecursos)
  // console.log("custo de lojas", CustoTotalSomadoLojas)
  // console.log("custo de construção", custoConstrução)
  // console.log("custo total", custoRecursos + CustoTotalSomadoLojas + custoConstrução)

  const valorFinalMês =
    fatuMensal - valorImpostoSobreFatu - valorImpostoFixoFinal;
  const rentabilidade =
    (valorFinalMês /
      (CustoTotalSomadoLojas + custoRecursos + custoConstrução)) *
    100;

  // console.log("faturamento mensal", fatuMensal)
  // console.log("imposto sobre faturamento", valorImpostoSobreFatu)
  // console.log("valor final mês", valorFinalMês)
  // console.log("rentabilidade", rentabilidade)
  // console.log("valor fatu ", valorFatuFinal)
  // console.log(valorFatu)
  // console.log(acumuladorPowerUpAumFatuRecebe)
  // console.log(valorImpostoFixoFinal)
  // useEffect(()=>{atualizarDadosProf2([setorAtivo, "edificios", index, "powerUp", "aumFatuAtual"], ResultFinalAcumuladorRedCusto)},[ResultFinalAcumuladorRedCusto])
  // console.log("esse é o custos de recursos do",edificio.nome,custoRecursos)

  // useEffect(() => {
  //     console.log("saldo", dados.saldo)
  //     console.log(edificio.nome, "Faturamento diário:", valorFatuFinal);
  //     console.log("foooooooiiiiiiiiii")
  // }, [dados.dia])

  // const calcularFaturamento = () => {
  //     let faturamentoDiario = 0;

  //     const novasLojas = todasLojas.map((loja) => {
  //         const valorUnitário = dados[loja].faturamentoUnitárioPadrão;
  //         const valorVariável = parseFloat(
  //             (valorUnitário * (1 + (Math.random() * 0.6 - 0.3))).toFixed(2)
  //         );

  //         const faturamentoTotal = parseFloat((valorVariável * dados[loja].quantidade).toFixed(2));

  //         faturamentoDiario += faturamentoTotal;

  //         return {
  //             ...dados[loja],
  //             faturamentoUnitário: valorVariável,
  //             faturamentoTotal,
  //         };
  //     });

  //     // Verifica se é o início de um novo mês e reseta o faturamento mensal
  //     const novoFaturamentoMensal = dados.dia % 30 === 0 ? faturamentoDiario : dados.faturamento.faturamentoMensal + faturamentoDiario;

  //     atualizarDados("saldo", dados.saldo + faturamentoDiario);

  //     atualizarDados("faturamento", {
  //         ...dados.faturamento,
  //         faturamentoDiário: faturamentoDiario,
  //         faturamentoMensal: novoFaturamentoMensal,
  //         arrayFatuDiário: [...dados.faturamento.arrayFatuDiário, faturamentoDiario],
  //     });

  //     todasLojas.forEach((loja, index) => {
  //         atualizarDados(loja, novasLojas[index]);
  //     });
  // };

  //alterado mudanças no modais

  //alterar o modal
  //ajustar as finançãs
  if (modalPowerup === true) {
    return (
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/90">
        <motion.div
          style={{ backgroundColor: setorInfo.cor4 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-[80vw] h-[80vh] bg-[#F52623] rounded-[10px] flex flex-col justify-around items-center relative"
        >
          <button
            className="bg-laranja absolute top-[-20px] right-[-20px] w-[40px] h-[40px] flex justify-center items-center rounded-[10px] hover:bg-[#E56100] active:scale-95"
            onClick={fecharModalPowerUp}
          >
            <img src={fechar} alt="Fechar" className="w-[60%]" />
          </button>
          <div
            style={{ backgroundColor: setorInfo.cor1 }}
            className="flex w-[95%] text-[50px] fonteBold text-white h-[15%] rounded-[20px] justify-center items-center "
          >
            {dados[setorAtivo].edificios[index].nome}
          </div>

          <div
            style={{ backgroundColor: setorInfo.cor2 }}
            className="w-[95%] h-[75%] rounded-[20px] self-center"
          >
            <div
              style={{ backgroundColor: setorInfo.cor1 }}
              className="flex justify-around h-full rounded-[20px] w-full p-[5px]"
            >
              <div className="w-[49%] h-full flex flex-col items-center justify-between">
                <div
                  style={{ backgroundColor: setorInfo.cor2 }}
                  className="w-full h-[15%] bg-white fonteBold text-white mt-[10px] pl-[10px] rounded-[10px] text-[40px]"
                >
                  Fornece
                </div>
                <div className="w-full h-[70%] overflow-y-auto">
                  <table className="w-full mt-[10px]">
                    <thead>
                      <tr>
                        <th
                          style={{ backgroundColor: setorInfo.cor3 }}
                          className="text-white rounded-[10px]"
                        >
                          Red. custo
                        </th>
                        <th>
                          <div className="bg-[#8F5ADA] w-[20%] h-[40px] w-[40px] m-auto aspect-square rounded-[7px] flex items-center justify-center cursor-pointer">
                            <img
                              className="h-[70%] aspect-square rotate-[270deg]"
                              src={PróximoImg}
                            />
                          </div>
                        </th>
                        <th>
                          <div className="bg-[#6411D9] w-[20%] h-[40px] w-[40px] m-auto aspect-square rounded-[7px] flex items-center justify-center cursor-pointer">
                            <img
                              className="h-[70%] aspect-square rotate-[270deg]"
                              src={PróximoImg}
                            />
                          </div>
                        </th>
                        <th>
                          <div className="bg-[#350973] w-[20%] h-[40px] w-[40px] m-auto aspect-square rounded-[7px] flex items-center justify-center cursor-pointer">
                            <img
                              className="h-[70%] aspect-square rotate-[270deg]"
                              src={PróximoImg}
                            />
                          </div>
                        </th>
                        <th
                          style={{ backgroundColor: setorInfo.cor3 }}
                          className="text-white rounded-[10px]"
                        >
                          Aumento fatu
                        </th>
                        <th>
                          <div className="bg-[#8F5ADA] w-[20%] h-[40px] w-[40px] m-auto aspect-square rounded-[7px] flex items-center justify-center cursor-pointer">
                            <img
                              className="h-[70%] aspect-square rotate-[270deg]"
                              src={PróximoImg}
                            />
                          </div>
                        </th>
                        <th>
                          <div className="bg-[#6411D9] w-[20%] h-[40px] w-[40px] m-auto aspect-square rounded-[7px] flex items-center justify-center cursor-pointer">
                            <img
                              className="h-[70%] aspect-square rotate-[270deg]"
                              src={PróximoImg}
                            />
                          </div>
                        </th>
                        <th>
                          <div className="bg-[#350973] w-[20%] h-[40px] w-[40px] m-auto aspect-square rounded-[7px] flex items-center justify-center cursor-pointer">
                            <img
                              className="h-[70%] aspect-square rotate-[270deg]"
                              src={PróximoImg}
                            />
                          </div>
                        </th>
                      </tr>
                    </thead>

                    {dados[setorAtivo].edificios[
                      index
                    ].ForneceMelhoraEficiencia.map((edMelhorado, i) => {
                      let setorEncontrado = null;

                      let indice = -1;
                      const quantidadeAtivo = (nomeEd) => {
                        for (const setor of setoresArr) {
                          setorEncontrado = setor;
                          indice = dados[setorEncontrado].edificios.findIndex(
                            (ed) => ed.nome === nomeEd
                          );
                          if (indice !== -1) {
                            return dados[setor].edificios[indice].quantidade;
                          }
                        }
                        return 0;
                      };

                      const qtdMelhorado = quantidadeAtivo(edMelhorado.nome);

                      const qtd = quantidadeAtivo(
                        dados[setorAtivo].edificios[index].nome
                      );

                      const powerUpSelecionado =
                        qtd >= quantidadeMinimaPowerUpNv3
                          ? "powerUpNv3"
                          : qtd >= quantidadeMinimaPowerUpNv2
                          ? "powerUpNv2"
                          : "powerUpNv1";

                      if (qtdMelhorado > 0) {
                        powerUpSelecionado === "powerUpNv1"
                          ? edMelhorado.redCusto.nível1
                          : powerUpSelecionado === "powerUpNv2"
                          ? edMelhorado.redCusto.nível2
                          : edMelhorado.redCusto.nível3;

                        powerUpSelecionado === "powerUpNv1"
                          ? edMelhorado.aumFatu.nível1
                          : powerUpSelecionado === "powerUpNv2"
                          ? edMelhorado.aumFatu.nível2
                          : edMelhorado.aumFatu.nível3;

                        // atualizarDadosProf2([setorAtivo, "edificios", index, "powerUp","aumFatuAtual"],ResultFinalAcumuladorRedCusto)
                        // console.log(index)
                        // console.log(setorAtivo)
                      }

                      const descobrirSetor = (nomeEdificio) => {
                        return mapaEdificioParaSetor[nomeEdificio] || null;
                      };

                      const corPowerUpAtual = corPowerUp(powerUpSelecionado);
                      const corColunaAtual = corPadrão; // Definição da variável antes de usá-la

                      const corColuna =
                        corColunaAtual === corPowerUpAtual
                          ? corPowerUpAtual
                          : corPadrão;
                      const corLinha =
                        qtdMelhorado > 0 ? corPowerUpAtual : corPadrão;

                      const lineStyle = { background: corLinha };
                      // const bgColuna1 = powerUpSelecionado === "powerUpNv1" ? corPowerUp("powerUpNv1"):  powerUpSelecionado === "powerUpNv2" ? corPowerUp("powerUpNv2") : corPowerUp("powerUpNv3");
                      const bgColuna1 =
                        corLinha === "#8F5ADA"
                          ? corPowerUp("powerUpNv1")
                          : powerUpSelecionado === "powerUpNv2"
                          ? corPowerUp("powerUpNv2")
                          : powerUpSelecionado === "powerUpNv3"
                          ? corPowerUp("powerUpNv3")
                          : corPadrão;

                      const bgColuna2 =
                        powerUpSelecionado === "powerUpNv1"
                          ? corPadrão
                          : powerUpSelecionado === "powerUpNv2"
                          ? corPowerUp("powerUpNv2")
                          : corPowerUp("powerUpNv3");

                      const bgColuna3 =
                        powerUpSelecionado === "powerUpNv1"
                          ? corPadrão
                          : powerUpSelecionado === "powerUpNv2"
                          ? corPadrão
                          : corPowerUp("powerUpNv3");
                      const columnStyleNv1 = { backgroundColor: bgColuna1 };
                      const columnStyleNv2 = { backgroundColor: bgColuna2 };
                      const columnStyleNv3 = { backgroundColor: bgColuna3 };

                      quantidadeAtivo(edMelhorado.nome);
                      // console.log(quantidadeAtivo(edMelhorado.nome))
                      return (
                        <tbody key={i} className="rounded-[2px]">
                          <tr
                            style={{
                              backgroundColor: setorInfo.cor4,
                              borderColor: setorInfo.cor2,
                            }}
                            className="mt-[20px] border-[1px] rounded-[2px] "
                          >
                            <td
                              style={lineStyle}
                              className="text-white pl-[5px]"
                            >
                              {edMelhorado.nome}
                            </td>
                            <td
                              style={{
                                ...columnStyleNv1,
                                borderColor: setorInfo.cor2,
                              }}
                              className="text-center text-white border-[1px] border-white"
                            >
                              {edMelhorado.redCusto.nível1}
                            </td>
                            <td
                              style={{
                                ...columnStyleNv2,
                                borderColor: setorInfo.cor2,
                              }}
                              className="text-center text-white border-[1px] border-white"
                            >
                              {edMelhorado.redCusto.nível2}
                            </td>
                            <td
                              style={{
                                ...columnStyleNv3,
                                borderColor: setorInfo.cor2,
                              }}
                              className="text-center text-white border-[1px] border-white"
                            >
                              {edMelhorado.redCusto.nível3}
                            </td>
                            <td
                              style={lineStyle}
                              className="text-white pl-[5px]"
                            >
                              {edMelhorado.nome}
                            </td>
                            <td
                              style={{
                                ...columnStyleNv1,
                                borderColor: setorInfo.cor2,
                              }}
                              className="text-center text-white border-[1px] border-white"
                            >
                              {edMelhorado.aumFatu.nível1}
                            </td>
                            <td
                              style={{
                                ...columnStyleNv2,
                                borderColor: setorInfo.cor2,
                              }}
                              className="text-center text-white border-[1px] border-white"
                            >
                              {edMelhorado.aumFatu.nível2}
                            </td>
                            <td
                              style={{
                                ...columnStyleNv3,
                                borderColor: setorInfo.cor2,
                              }}
                              className="text-center text-white border-[1px] border-white"
                            >
                              {edMelhorado.aumFatu.nível3}
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>
                <div className="flex w-full h-[10%]">
                  <div className="flex w-full justify-evenly">
                    <div
                      style={{ backgroundColor: setorInfo.cor2 }}
                      className="flex w-[49%] rounded-[10px] items-end text-white self-center justify-center fonteBold text-[20px]"
                    >
                      Redução total: {acumuladorPowerUpRedCustoFornece}%
                    </div>
                    <div
                      style={{ backgroundColor: setorInfo.cor2 }}
                      className="flex w-[49%] rounded-[10px] items-end text-white self-center justify-center fonteBold text-[20px]"
                    >
                      Aumento total: {acumuladorPowerUpAumFatuFornece}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[49%] h-full flex flex-col items-center justify-between">
                <div
                  style={{ backgroundColor: setorInfo.cor2 }}
                  className="w-full h-[15%] bg-white fonteBold text-white mt-[10px] pl-[10px] rounded-[10px] text-[40px]"
                >
                  Recebe
                </div>
                <div className="w-full h-[70%] overflow-y-auto">
                  <table className="w-full mt-[10px]">
                    <thead>
                      <tr>
                        <th
                          style={{ backgroundColor: setorInfo.cor3 }}
                          className="text-white rounded-[10px]"
                        >
                          Red. custo
                        </th>
                        <th>
                          <div className="bg-[#8F5ADA] w-[20%] h-[40px] w-[40px] m-auto aspect-square rounded-[7px] flex items-center justify-center cursor-pointer">
                            <img
                              className="h-[70%] aspect-square rotate-[270deg]"
                              src={PróximoImg}
                            />
                          </div>
                        </th>
                        <th>
                          <div className="bg-[#6411D9] w-[20%] h-[40px] w-[40px] m-auto aspect-square rounded-[7px] flex items-center justify-center cursor-pointer">
                            <img
                              className="h-[70%] aspect-square rotate-[270deg]"
                              src={PróximoImg}
                            />
                          </div>
                        </th>
                        <th>
                          <div className="bg-[#350973] w-[20%] h-[40px] w-[40px] m-auto aspect-square rounded-[7px] flex items-center justify-center cursor-pointer">
                            <img
                              className="h-[70%] aspect-square rotate-[270deg]"
                              src={PróximoImg}
                            />
                          </div>
                        </th>
                        <th
                          style={{ backgroundColor: setorInfo.cor3 }}
                          className="text-white rounded-[10px]"
                        >
                          Aumento fatu
                        </th>
                        <th>
                          <div className="bg-[#8F5ADA] w-[20%] h-[40px] w-[40px] m-auto aspect-square rounded-[7px] flex items-center justify-center cursor-pointer">
                            <img
                              className="h-[70%] aspect-square rotate-[270deg]"
                              src={PróximoImg}
                            />
                          </div>
                        </th>
                        <th>
                          <div className="bg-[#6411D9] w-[20%] h-[40px] w-[40px] m-auto aspect-square rounded-[7px] flex items-center justify-center cursor-pointer">
                            <img
                              className="h-[70%] aspect-square rotate-[270deg]"
                              src={PróximoImg}
                            />
                          </div>
                        </th>
                        <th>
                          <div className="bg-[#350973] w-[20%] h-[40px] w-[40px] m-auto aspect-square rounded-[7px] flex items-center justify-center cursor-pointer">
                            <img
                              className="h-[70%] aspect-square rotate-[270deg]"
                              src={PróximoImg}
                            />
                          </div>
                        </th>
                      </tr>
                    </thead>
                    {dados[setorAtivo].edificios[
                      index
                    ].RecebeMelhoraEficiencia.map((edMelhorado, i) => {
                      let setorEncontrado = null;

                      let indice = -1;
                      const quantidadeAtivo = (nomeEd) => {
                        for (const setor of setoresArr) {
                          setorEncontrado = setor;
                          indice = dados[setorEncontrado].edificios.findIndex(
                            (ed) => ed.nome === nomeEd
                          );
                          if (indice !== -1) {
                            return dados[setor].edificios[indice].quantidade;
                          }
                        }
                        return 0;
                      };

                      const qtdMelhorado = quantidadeAtivo(edMelhorado.nome);

                      const qtd = quantidadeAtivo(
                        dados[setorAtivo].edificios[index].nome
                      );

                      const powerUpSelecionado =
                        qtd >= quantidadeMinimaPowerUpNv3
                          ? "powerUpNv3"
                          : qtd >= quantidadeMinimaPowerUpNv2
                          ? "powerUpNv2"
                          : "powerUpNv1";

                      if (qtdMelhorado > 0) {
                        powerUpSelecionado === "powerUpNv1"
                          ? edMelhorado.redCusto.nível1
                          : powerUpSelecionado === "powerUpNv2"
                          ? edMelhorado.redCusto.nível2
                          : edMelhorado.redCusto.nível3;

                        powerUpSelecionado === "powerUpNv1"
                          ? edMelhorado.aumFatu.nível1
                          : powerUpSelecionado === "powerUpNv2"
                          ? edMelhorado.aumFatu.nível2
                          : edMelhorado.aumFatu.nível3;
                      }
                      const corPowerUpAtual = corPowerUp(powerUpSelecionado);
                      const corColunaAtual = corPadrão; // Definição da variável antes de usá-la

                      const corColuna =
                        corColunaAtual === corPowerUpAtual
                          ? corPowerUpAtual
                          : corPadrão;
                      const corLinha =
                        qtdMelhorado > 0 ? corPowerUpAtual : corPadrão;

                      const lineStyle = { background: corLinha };
                      // const bgColuna1 = powerUpSelecionado === "powerUpNv1" ? corPowerUp("powerUpNv1"):  powerUpSelecionado === "powerUpNv2" ? corPowerUp("powerUpNv2") : corPowerUp("powerUpNv3");
                      const bgColuna1 =
                        corLinha === "#8F5ADA"
                          ? corPowerUp("powerUpNv1")
                          : powerUpSelecionado === "powerUpNv2"
                          ? corPowerUp("powerUpNv2")
                          : powerUpSelecionado === "powerUpNv3"
                          ? corPowerUp("powerUpNv3")
                          : corPadrão;

                      const bgColuna2 =
                        powerUpSelecionado === "powerUpNv1"
                          ? corPadrão
                          : powerUpSelecionado === "powerUpNv2"
                          ? corPowerUp("powerUpNv2")
                          : corPowerUp("powerUpNv3");

                      const bgColuna3 =
                        powerUpSelecionado === "powerUpNv1"
                          ? corPadrão
                          : powerUpSelecionado === "powerUpNv2"
                          ? corPadrão
                          : corPowerUp("powerUpNv3");
                      const columnStyleNv1 = { backgroundColor: bgColuna1 };
                      const columnStyleNv2 = { backgroundColor: bgColuna2 };
                      const columnStyleNv3 = { backgroundColor: bgColuna3 };

                      quantidadeAtivo(edMelhorado.nome);
                      // console.log(quantidadeAtivo(edMelhorado.nome))
                      return (
                        <tbody key={i} className="rounded-[2px]">
                          <tr
                            style={{
                              backgroundColor: setorInfo.cor4,
                              borderColor: setorInfo.cor2,
                            }}
                            className="mt-[20px] border-[1px] rounded-[2px] "
                          >
                            <td
                              style={lineStyle}
                              className="text-white pl-[5px]"
                            >
                              {edMelhorado.nome}
                            </td>
                            <td
                              style={{
                                ...columnStyleNv1,
                                borderColor: setorInfo.cor2,
                              }}
                              className="text-center text-white border-[1px] border-white"
                            >
                              {edMelhorado.redCusto.nível1}
                            </td>
                            <td
                              style={{
                                ...columnStyleNv2,
                                borderColor: setorInfo.cor2,
                              }}
                              className="text-center text-white border-[1px] border-white"
                            >
                              {edMelhorado.redCusto.nível2}
                            </td>
                            <td
                              style={{
                                ...columnStyleNv3,
                                borderColor: setorInfo.cor2,
                              }}
                              className="text-center text-white border-[1px] border-white"
                            >
                              {edMelhorado.redCusto.nível3}
                            </td>
                            <td
                              style={lineStyle}
                              className="text-white pl-[5px]"
                            >
                              {edMelhorado.nome}
                            </td>
                            <td
                              style={{
                                ...columnStyleNv1,
                                borderColor: setorInfo.cor2,
                              }}
                              className="text-center text-white border-[1px] border-white"
                            >
                              {edMelhorado.aumFatu.nível1}
                            </td>
                            <td
                              style={{
                                ...columnStyleNv2,
                                borderColor: setorInfo.cor2,
                              }}
                              className="text-center text-white border-[1px] border-white"
                            >
                              {edMelhorado.aumFatu.nível2}
                            </td>
                            <td
                              style={{
                                ...columnStyleNv3,
                                borderColor: setorInfo.cor2,
                              }}
                              className="text-center text-white border-[1px] border-white"
                            >
                              {edMelhorado.aumFatu.nível3}
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>
                <div className="flex w-full h-[10%]">
                  <div className="flex w-full justify-evenly">
                    <div
                      style={{ backgroundColor: setorInfo.cor2 }}
                      className="flex w-[49%] rounded-[10px] items-end text-white self-center justify-center fonteBold text-[20px]"
                    >
                      Redução total: {acumuladorPowerUpRedCustoRecebe}%
                    </div>
                    <div
                      style={{ backgroundColor: setorInfo.cor2 }}
                      className="flex w-[49%] rounded-[10px] items-end text-white self-center justify-center fonteBold text-[20px]"
                    >
                      Aumento total: {acumuladorPowerUpAumFatuRecebe}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      // onMouseMove={handleMouseMove}
      // onMouseLeave={resetRotation}
      // onClick={handleFlip} // Flip ao clicar
      style={{
        background: `linear-gradient(135deg, ${setorInfo.cor2} 0%,${setorInfo.cor3} 35%,${setorInfo.cor1} 100%)`,
      }}
      className="w-[215px] h-[230px] bg-white rounded-[20px] flex flex-col justify-center items-center shadow-lg perspective"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      // animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      {/* Container do Card */}
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Frente do Card */}

        {dados[setorAtivo].edificios[index].licençaLiberado.liberado ===
          false && (
          <motion.div
            style={{
              background: `transparent`, // fundo transparente para o container principal
            }}
            className="w-[215px] h-[230px] rounded-[20px] flex flex-col justify-center items-center shadow-lg perspective z-[2] cursor-pointer absolute"
            initial={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            {/* Camada de fundo com opacidade */}
            <div
              className="absolute inset-0 rounded-[20px] z-0"
              style={{
                background: `linear-gradient(135deg, ${setorInfo.cor1} 0%, ${setorInfo.cor2} 70%, ${setorInfo.cor4} 100%)`,
                opacity: 0.9,
              }}
            />

            {/* Container do Card */}
            <motion.div
              className="relative flex justify-center items-center w-full h-full z-[2]"
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <div
                style={{ backgroundColor: setorInfo.cor1 }}
                className="h-[40%] flex justify-center items-center aspect-square rounded-[20px] relative z-[2]"
              >
                <div
                  style={{ backgroundColor: setorInfo.cor3 }}
                  className="flex items-center justify-center h-[95%] aspect-square rounded-[20px] absolute z-[2]"
                >
                  <div
                    style={{ backgroundColor: setorInfo.cor1 }}
                    className="flex items-center justify-center h-[95%] aspect-square rounded-[20px] absolute z-[2]"
                  >
                    <div
                      style={{ backgroundColor: setorInfo.cor2 }}
                      className="flex items-center justify-center h-[95%] aspect-square rounded-[30px] absolute z-[2]"
                    >
                      <div
                        style={{
                          background: `linear-gradient(135deg, ${setorInfo.cor1} 0%, ${setorInfo.cor4} 100%)`,
                        }}
                        className="flex items-center justify-center h-[95%] aspect-square rounded-[60px] absolute z-[2] relative"
                      >
                        <img
                          className="h-[70%] aspect-square absolute"
                          src={getImageUrl(
                            dados[setorAtivo].edificios[index].licençaLiberado
                              .licença
                          )}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        <div className="absolute w-full h-full flex items-center justify-center rounded-xl">
          <div className="w-[90%] h-[90%] flex items-center flex-col justify-between self-center">
            <div
              style={{ backgroundColor: setorInfo.cor1 }}
              className="w-full h-[35%] rounded-[10px] flex justify-between drop-shadow-xs"
            >
              <div
                style={{
                  background: `linear-gradient(135deg, ${setorInfo.cor3} 0%,${setorInfo.cor1} 100%)`,
                }}
                className="h-[100%] aspect-square rounded-[10px] flex items-center justify-center"
              >
                <img
                  className="h-[70%]"
                  src={getImageUrl(dados[setorAtivo].edificios[index].nome)}
                  alt=""
                />
              </div>

              <div
                data-tooltip-id="tooltip-faturado"
                data-tooltip-html="Nome do edifício"
                className="flex p-[10px] justify-center"
              >
                <h1 className="text-white fonteBold text-[12px]">
                  {dados[setorAtivo].edificios[index].nome}
                </h1>
              </div>
            </div>
            {/* <div className="h-[05%] w-full flex justify-around flex-col  items-center drop-shadow-xs">
                            <h2 className="text-[10px] text-white">teste vamos continuar asdkfasdjfçlajsdçf slkdçfjasçdlfj saldkjf sdkj lkjasd çaksjd</h2>
                        </div> */}
            <div className="h-[25%] w-full flex justify-around flex-col  items-center drop-shadow-xs">
              <div
                style={{ backgroundColor: setorInfo.cor1 }}
                className="w-full flex items-center justify-center rounded-[10px] p-[5px] gap-[5px] h-full"
              >
                <div className="w-[100%] rounded-[20px] flex justify-around items-center h-full ">
                  <div
                    style={{ backgroundColor: setorInfo.cor3 }}
                    onClick={() => {
                      handleShow("lojasNec"), handleFlip();
                    }}
                    // onMouseLeave={handleHide}
                    className=" hover:scale-[1.20] ease-in-out cursor-pointer h-[80%] aspect-square rounded-[8px] flex items-center justify-center relative"
                  >
                    <img
                      data-tooltip-id="tooltip-faturado"
                      data-tooltip-html={`

  <div style="max-width: 600px;">
    <b>Imóveis Necessários</b> <br/><br/>
    <p>
      Para construir este edifício, você precisará ter previamente alguns imóveis básicos que servem como base:
    </p>
    <ul style="margin-left: 15px; padding-left: 0; list-style-type: disc;">
      <li><b>Terreno:</b> Necessário para plantações.</li>
      <li><b>Imóvel Pequeno :</b> Necessário para edifícios de pequeno porte.</li>
      <li><b>Imóvel Médio:</b> Necessário para edifícios de porte médio.</li>
      <li><b>Imóvel Grande :</b> Necessário para edifícios de grande porte.</li>
    </ul>
    <p>
      Certifique-se de possuir os imóveis exigidos antes de iniciar a construção. Sem essas bases, o edifício não poderá ser erguido, mesmo que você tenha dinheiro suficiente.
    </p>
    <p>
      Dica: Planeje sua evolução estratégica construindo primeiro os imóveis básicos certos para desbloquear edifícios mais avançados.
    </p>
        <p>
      <b>Obs:</b> Caso tenha uma bolinha branca, significa que você não possui imóvel necessário para a construção.
    </p>
  </div>

`}
                      className="h-[70%] aspect-square"
                      src={terrenoImg}
                      alt=""
                    />

                    {verificadorDeLojasNecessárias === false && (
                      <div className="absolute bottom-[-2px] right-[-2px]">
                        <span className="relative flex size-2">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-[#FFFFFF] opacity-75"></span>
                          <span className="relative inline-flex size-2 rounded-full bg-[#FFFFFF]"></span>
                        </span>
                      </div>
                    )}
                  </div>
                  <Tooltip style={tooltipStyle} id="tooltip-faturado" />
                  <div
                    style={{ backgroundColor: setorInfo.cor3 }}
                    className="h-[80%] aspect-square rounded-[8px] flex items-center justify-center relative hover:scale-[1.20] duration-300 ease-in-out delay-[0.1s] cursor-pointer"
                  >
                    <img
                      data-tooltip-id="tooltip-faturado"
                      data-tooltip-html={`
  <div style="max-width: 400px;">
    <b>Construções Necessárias</b> <br/><br/>
    <p>
Dependendo para construir este edifício, você precisa já possuir previamente um ou mais edifícios específicos. Sem eles, não será possível construir.
    </p>
  </div>
  <b>Obs:</b> Caso tenha uma bolinha branca, significa que você não possui alguma construção necessária para a construção.
`}
                      className="h-[70%] aspect-square"
                      src={constNece}
                      onClick={() => {
                        handleMouseEnter(),
                          handleShow("constNece"),
                          handleFlip();
                      }}
                      alt=""
                    />
                    <div className="absolute bottom-[-2px] right-[-2px]">
                      {verificadorDeConstruçõesNecessárias === true && (
                        <span className="relative flex size-2">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-[#FFFFFF] opacity-75"></span>
                          <span className="relative inline-flex size-2 rounded-full bg-[#FFFFFF]"></span>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-[35%] h-full aspect-square flex justify-between items-center">
                    <div
                      onClick={() => {
                        handleMouseEnter(), handleShow("powerUp");
                      }}
                      className="w-full h-[80%] flex justify-center items-center drop-shadow-2xl"
                    >
                      <div className="h-full w-full aspect-square flex justify-center items-center">
                        <div
                          style={{ backgroundColor: setorInfo.cor3 }}
                          className="flex justify-center items-center w-full h-full rounded-[10px] "
                        >
                          {" "}
                          {/* Adicionei o `relative` aqui */}
                          <div
                            style={{
                              background: `linear-gradient(135deg,${setorInfo.cor4} 0%, ${corPowerUpAtual} 50%,${setorInfo.cor1} 100%)`,
                            }}
                            onClick={() => handleFlip()}
                            className="h-full aspect-square rounded-[10px] flex items-center justify-center hover:scale-[1.20] duration-300 ease-in-out delay-[0.1s] cursor-pointer"
                          >
                            <img
                              data-tooltip-id="tooltip-faturado"
                              data-tooltip-html={`
<div style="max-width: 600px;">
  <b>Power-Ups</b> <br/><br/>
  <p>
    Power-Ups são <b>bônus especiais</b> que aumentam o desempenho dos seus edifícios. Eles podem afetar o faturamento, reduzir custos ou melhorar outras características do edifício.
  </p>
  <p>
    Existem diferentes tipos de Power-Ups:
  </p>
  <ul style="margin-left: 15px; padding-left: 0; list-style-type: disc;">
    <li><b>Aumento de Faturamento:</b> Eleva o lucro gerado pelo edifício.</li>
    <li><b>Redução de custos:</b> Diminui o valor de custos pagos pelo edifício.</li>
  </ul>
  <p>
    <b>Como obter:</b> Basta possuir <b>uma unidade do edifício</b> que fornece o Power-Up para ter acesso ao efeito. Você pode aumentar o potencial desses bônus atingindo quantidades específicas do mesmo edifício, aumentando o nível do Power-Up em até <b>3 níveis</b>.
  </p>
  <p>
    Dica: Planeje a construção de seus edifícios estratégicos para maximizar os efeitos acumulativos dos Power-Ups e potencializar sua estratégia de lucro.
  </p>
</div>

`}
                              className="h-[70%] aspect-square rotate-[270deg]"
                              src={PróximoImg}
                            />
                          </div>
                          <div
                            data-tooltip-id="tooltip-faturado"
                            data-tooltip-html="Quantidade atual de edifícios"
                            className="flex justify-center items-center w-full"
                          >
                            <h2 className="text-white text-[15px] fonteBold">
                              {dados[setorAtivo].edificios[index].quantidade}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Tooltip style={tooltipStyle} id="tooltip-faturado" />
            <Tooltip style={tooltipStyle} id="tooltip-constru" />
            <div className="flex  justify-between items-center h-[20%] w-full">
              <div className="w-full flex h-full flex justify-between items-center">
                <Tooltip style={tooltipStyle} id="tooltip-faturado" />
                <div className="w-[20%] h-[80%] rounded-[5px] flex items-center justify-center">
                  <div
                    style={{ backgroundColor: setorInfo.cor3 }}
                    className=" rounded-[10px] flex items-center justify-between  h-full"
                  >
                    <button
                      data-tooltip-id="tooltip-faturado"
                      data-tooltip-html="Informações financeiras do edifício"
                      style={{ backgroundColor: setorInfo.cor1 }}
                      onClick={() => {
                        handleShow("finançasEd"), handleFlip();
                      }}
                      className=" hover:scale-[1.10] ease-in-out cursor-pointer flex items-center justify-center w-min-[20%] aspect-square rounded-[10px] h-full drop-shadow-2xl"
                    >
                      <img
                        src={DolarImg}
                        className="h-[60%] flex items-center justify-center"
                      />
                    </button>
                  </div>
                </div>
                <div
                  style={{ backgroundColor: setorInfo.cor3 }}
                  className="w-[30%] h-[80%] rounded-[5px] items-center justify-center flex"
                >
                  <div
                    data-tooltip-id="tooltip-faturado"
                    data-tooltip-html="Rentabilidade do edifício na economia do setor estável"
                    className="flex items-center justify-center h-full"
                  >
                    <h1 className="text-white font-bold mr-2 text-[17px]">
                      {rentabilidade.toFixed(0)}
                    </h1>
                    {/* <Tooltip text={"valor do imposto sobre o faturamento mensal\nO imposto sobre o faturamento é um percentual cobrado sobre o faturamento mensal."}
                                         
                                        >
                                            
                                        </Tooltip> */}
                    <img
                      src={porcem}
                      alt="porcentagem"
                      className="h-[45%] mr-[0px]"
                    />
                  </div>
                </div>
                <div
                  data-tooltip-id="tooltip-faturado"
                  data-tooltip-html={`
  <b>Valor gasto para construir o edifício</b> <br/><br/>
  <div style="max-width: 600px;">
    <p>
      Para construir qualquer edifício, você precisa de <b>imóveis base</b>: Terreno, Imóvel Pequeno, Imóvel Médio e Imóvel Grande. Cada edifício exige uma combinação desses imóveis e tem um <b>custo de construção</b> específico, que representa o dinheiro necessário para finalizar a obra.
    </p>
    <p>
      Quanto mais complexo ou lucrativo for o edifício, maior será o preço de construção. Planeje bem quais imóveis base você possui antes de construir, porque cada edifício consome esses recursos e o dinheiro gasto não pode ser recuperado.
    </p>
    <p>
      Alguns edifícios podem reduzir os custos de construção:
    </p>
    <ul style="margin-left: 15px; padding-left: 0; list-style-type: disc;">
      <li><b>Terraplanagem e Pavimentação:</b> reduzem o custo de plantações.</li>
      <li><b>Construtora Pequena:</b> reduz o custo de edifícios com valor total menor que 300.000.</li>
      <li><b>Construtora:</b> reduz o custo de edifícios com valor total entre 300.000 e 1.000.000.</li>
      <li><b>Construtora de Infraestruturas:</b> reduz o custo de edifícios com valor total maior que 1.000.000.</li>
    </ul>
    <p>
      Dica: planeje sua estratégia considerando tanto os imóveis base quanto os edifícios que podem reduzir custos. Isso ajuda a economizar dinheiro e construir mais eficientemente.
    </p>
  </div>
`}
                  style={{ backgroundColor: setorInfo.cor3 }}
                  className=" w-[40%] h-[80%] flex items-center justify-around rounded-[5px]"
                >
                  <img
                    src={ConstuirImg}
                    className="h-[60%] aspect-square ml-[5px]"
                  />
                  <h1 className="text-white fonteBold text-[15px] ml-2">
                    {formatarNumero(
                      dados[setorAtivo].edificios[index].custoConstrucao
                    )}
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center w-[90%] h-[10%] drop-shadow-md">
              <button
                onClick={comprarCard}
                style={{
                  backgroundColor: podeComprar ? "#6411D9" : "#B0A7C0",
                  color: "#fff",
                  cursor: podeComprar ? "pointer" : "not-allowed",
                }}
                className={` rounded-[20px] w-full fonteBold text-white`}
                title={!podeComprar ? motivo : ""}
              >
                Comprar
              </button>
            </div>
            {/* {podeComprar ? (
    
) : (
  <div className="flex items-center justify-center w-[90%] h-[10%] drop-shadow-md">
    <button className="bg-black rounded-[20px] w-full fonteBold text-white hover:scale-[1.10] duration-300 ease-in-out cursor-pointer">
      Comprar
    </button>
  </div>
)} */}
          </div>
        </div>
        {/* {visibleId === 'cadeado' && isModalOpen === true &&  
            <div className="relative w-full h-full flex items-center justify-center rounded-xl">
                <div className="w-[90%] h-[90%] flex items-center flex-col justify-between self-center">} */}
        {/* Verso do Card */}
        <div
          className={`absolute w-full h-full flex items-center justify-center rounded-[20px] text-white transform cursor-pointer rotate-y-180 ${
            flipped ? "pointer-events-auto z-50" : "pointer-events-none"
          }`}
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            background: `linear-gradient(135deg, ${setorInfo.cor2} 0%,${setorInfo.cor3} 35%,${setorInfo.cor1} 100%)`,
          }}
        >
          {/* {visibleId === "constNece" && isModalOpen === true &&
                        (
                            <div className="w-[90%] h-[90%] flex items-center flex-col justify-around self-center">

                            </div>
                        )
                    } */}
          {visibleId === "constNece" && isModalOpen === true && (
            <div
              onClick={() => handleFlip()}
              className="w-[90%] h-[90%] flex items-center flex-col justify-between self-center "
            >
              <div
                style={{ backgroundColor: setorInfo.cor1 }}
                className="w-full h-[20%] rounded-[10px] flex justify-between drop-shadow-xs
"
              >
                <div
                  style={{
                    background: `linear-gradient(135deg, ${setorInfo.cor3} 0%,${setorInfo.cor1} 100%)`,
                  }}
                  className="h-[100%] aspect-square rounded-[10px] flex items-center justify-center"
                >
                  <img className="h-[70%]" src={constNece} alt="" />
                </div>

                <div className="flex p-[10px] justify-center items-center">
                  <h1 className="text-white fonteBold text-[12px]">
                    Construções necessárias
                  </h1>
                </div>
              </div>

              <div className="h-[35%] w-full flex flex-col items-center justify-center drop-shadow-xs ">
                <div
                  style={{
                    background: `linear-gradient(135deg, ${setorInfo.cor3} 0%,${setorInfo.cor4} 100%)`,
                  }}
                  className="h-full flex flex-col w-full items-center justify-around rounded-[10px]"
                >
                  <div className="h-[20%] w-[90%] flex flex-col justify-center ">
                    <h1 className=" text-white text-[11px] text-start fonteBold">
                      Recursos de Construção
                    </h1>
                  </div>
                  <div
                    style={{ backgroundColor: setorInfo.cor2 }}
                    className=" flex items-center justify-around h-[65%] w-[90%]  z-[20] rounded-[10px]"
                  >
                    <div
                      data-tooltip-id="tooltip-faturado"
                      data-tooltip-html={`
      <b>Recursos de Construção</b><br/><br/>
      <div style="max-width: 600px;">
        <p>
          Diferente dos pré-requisitos, aqui você precisa de <b>edifícios que serão usados como material</b>
          para erguer outro.
        </p>
        <p>
          Esses recursos são <b>consumidos</b> no processo da obra, deixando de estar disponíveis depois.
        </p>
        <p>
          Exemplo: Para erguer um <i>Shopping popular</i>, pode ser necessário gastar <i>Mercado</i> e <i>Loja De Departementos</i>.
        </p>
        <p><b>Dica:</b> Pense bem antes de usar recursos valiosos, porque uma vez gastos, não voltam.</p>
      </div>
    `}
                      className="flex justify-start ml-[5px] gap-[5px] items-center h-full w-full"
                    >
                      {arrayConstResources.map((nomeEdificio) => (
                        <div
                          key={`${nomeEdificio}-${index}`}
                          style={{ backgroundColor: setorInfo.cor3 }}
                          onMouseEnter={() => setCaixaTexto(true)}
                          onMouseLeave={() => setCaixaTexto(false)}
                          className="cursor-pointer h-[80%] aspect-square rounded-[8px] flex items-center justify-center relative"
                        >
                          {caixaTexto && (
                            <div
                              style={{ backgroundColor: setorInfo.cor1 }}
                              className="absolute inset-0 flex items-center justify-center text-white text-[7px] p-2 rounded-[8px]"
                            >
                              {nomeEdificio}
                            </div>
                          )}
                          <img
                            className="h-[70%] aspect-square"
                            src={getImageUrl(nomeEdificio)}
                            alt={nomeEdificio}
                          />
                          <div className="absolute bottom-[-2px] right-[-2px]">
                            {booleanPreReq(nomeEdificio) === false && (
                              <span className="relative flex size-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-[#FFFFFF] opacity-75"></span>
                                <span className="relative inline-flex size-2 rounded-full bg-[#FFFFFF]"></span>
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[35%] w-full flex flex-col items-center justify-center drop-shadow-xs ">
                <div
                  style={{
                    background: `linear-gradient(135deg, ${setorInfo.cor3} 0%,${setorInfo.cor4} 100%)`,
                  }}
                  className="h-full flex flex-col w-full items-center justify-around rounded-[10px]"
                >
                  <div className="h-[20%] w-[90%] flex flex-col justify-center  ">
                    <h1 className=" text-white text-[11px] text-start fonteBold">
                      Construções necessárias
                    </h1>
                  </div>
                  <div
                    style={{ backgroundColor: setorInfo.cor2 }}
                    className=" flex items-center justify-around h-[65%] w-[90%]  z-[20] rounded-[10px]"
                  >
                    <div
                      data-tooltip-id="tooltip-faturado"
                      data-tooltip-html={`
      <b>Construções Necessárias</b><br/><br/>
      <div style="max-width: 600px;">
        <p>
          Algumas construções só podem ser erguidas se você já possuir <b>outros edifícios</b> prontos.
          Esses edifícios funcionam como <b>pré-requisitos</b>.
        </p>
        <p>
          Exemplo: Para construir uma <i>Fábrica de Roupas</i>, pode ser necessário já possuir uma <i>Fábrica Têxtil</i>.
        </p>
        <p><b>Dica:</b> Planeje o crescimento da sua empresa pensando nos pré-requisitos para não travar seu progresso.</p>
      </div>
    `}
                      className="flex justify-start ml-[5px] gap-[5px] items-center h-full w-full"
                    >
                      {arrayConstNece.map((nomeEdificio) => (
                        <div
                          key={nomeEdificio}
                          style={{ backgroundColor: setorInfo.cor3 }}
                          onMouseEnter={() => setCaixaTexto(true)}
                          onMouseLeave={() => setCaixaTexto(false)}
                          className="cursor-pointer h-[80%] aspect-square rounded-[8px] flex items-center justify-center relative"
                        >
                          {caixaTexto && (
                            <div
                              style={{ backgroundColor: setorInfo.cor1 }}
                              className="absolute inset-0 flex items-center justify-center text-white text-[7px] p-2 rounded-[8px]"
                            >
                              {nomeEdificio}
                            </div>
                          )}
                          <img
                            className="h-[70%] aspect-square"
                            src={getImageUrl(nomeEdificio)}
                            alt={nomeEdificio}
                          />
                          <div className="absolute bottom-[-2px] right-[-2px]">
                            {booleanPreReq(nomeEdificio) === false && (
                              <span className="relative flex size-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-[#FFFFFF] opacity-75"></span>
                                <span className="relative inline-flex size-2 rounded-full bg-[#FFFFFF]"></span>
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {visibleId === "lojasNec" && isModalOpen === true && (
            <div
              onClick={() => handleFlip()}
              className="w-[90%] h-[90%] flex items-center flex-col justify-between self-center"
            >
              <div
                style={{ backgroundColor: setorInfo.cor1 }}
                className="w-full h-[20%] rounded-[10px] flex justify-between "
              >
                <div
                  style={{
                    background: `linear-gradient(135deg, ${setorInfo.cor3} 0%,${setorInfo.cor1} 100%)`,
                  }}
                  className="h-[100%] aspect-square rounded-[10px] flex items-center justify-center"
                >
                  <img className="h-[70%]" src={terrenoImg} alt="" />
                </div>

                <div className="flex p-[10px] justify-center items-center">
                  <h1 className="text-white fonteBold text-[12px]">
                    Imóveis necessários
                  </h1>
                </div>
              </div>
              <div className=" flex items-center justify-around w-full h-[70%]  rounded-[10px] flex-col">
                <Tooltip style={tooltipStyle} id="tooltip-faturado" />
                <div className="w-full h-[22%] flex justify-around items-center ">
                  <div className="h-full w-full aspect-square flex justify-around items-center ">
                    <div
                      style={{ backgroundColor: setorInfo.cor1 }}
                      data-tooltip-id="tooltip-faturado"
                      data-tooltip-html="Terrenos"
                      className="w-[15%] h-full flex items-center justify-center aspect-square bg-white rounded-[10px] relative"
                    >
                      <img className="h-[70%]" src={terrenoImg} alt="" />
                    </div>
                    <div
                      style={{ backgroundColor: setorInfo.cor2 }}
                      className="flex justify-around items-center w-[35%] h-full rounded-[5px] "
                    >
                      {" "}
                      {/* Adicionei o `relative` aqui */}
                      <h2
                        data-tooltip-id="tooltip-faturado"
                        data-tooltip-html="Quantidade de terrenos necessários"
                        style={{ backgroundColor: setorInfo.cor2 }}
                        className="text-white text-center text-[15px] w-full fonteBold rounded-[5px]"
                      >
                        {
                          dados[setorAtivo].edificios[index].lojasNecessarias
                            .terrenos
                        }
                      </h2>
                      <div
                        data-tooltip-id="tooltip-faturado"
                        data-tooltip-html="Quantidade de terrenos atual"
                        style={{ backgroundColor: setorInfo.cor4 }}
                        className="flex justify-center items-center h-full w-full rounded-[5px]"
                      >
                        <h2 className="text-white text-[15px] fonteBold">
                          {dados.terrenos.quantidade}
                        </h2>
                      </div>
                    </div>

                    <div
                      data-tooltip-id="tooltip-faturado"
                      data-tooltip-html="Valor necessário para comprar os terrenos que faltam"
                      style={{ backgroundColor: setorInfo.cor2 }}
                      className="flex justify-center rounded-[10px] items-center h-full w-[40%]"
                    >
                      <h2
                        style={{ backgroundColor: setorInfo.cor2 }}
                        className="text-white text-[15px] fonteBold"
                      >
                        {" "}
                        {formatarNumero(contabilidadeDeFalta("terrenos"))}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="w-full h-[22%] flex justify-around items-center ">
                  <div className="h-full w-full aspect-square flex justify-around items-center ">
                    <div
                      data-tooltip-id="tooltip-faturado"
                      data-tooltip-html="Imóveis pequenos"
                      style={{ backgroundColor: setorInfo.cor1 }}
                      className="w-[15%] h-full flex items-center justify-center aspect-square bg-white rounded-[10px] relative"
                    >
                      <img className="h-[70%]" src={LojaPImg} alt="" />
                    </div>
                    <div
                      style={{ backgroundColor: setorInfo.cor2 }}
                      className="flex justify-around items-center w-[35%] h-full rounded-[5px] "
                    >
                      {" "}
                      {/* Adicionei o `relative` aqui */}
                      <h2
                        data-tooltip-id="tooltip-faturado"
                        data-tooltip-html=" Quantidade de imóveis pequenos necessários"
                        style={{ backgroundColor: setorInfo.cor2 }}
                        className="text-white text-center text-[15px] w-full fonteBold rounded-[5px]"
                      >
                        {
                          dados[setorAtivo].edificios[index].lojasNecessarias
                            .lojasP
                        }
                      </h2>
                      <div
                        data-tooltip-id="tooltip-faturado"
                        data-tooltip-html="Quantidade de imóveis pequenos atual "
                        style={{ backgroundColor: setorInfo.cor4 }}
                        className="flex justify-center items-center h-full w-full rounded-[5px]"
                      >
                        <h2 className="text-white text-[15px] fonteBold">
                          {dados.lojasP.quantidade}
                        </h2>
                      </div>
                    </div>

                    <div
                      data-tooltip-id="tooltip-faturado"
                      data-tooltip-html="Valor necessário para comprar os imóveis pequenos que faltam"
                      style={{ backgroundColor: setorInfo.cor2 }}
                      className="flex justify-center rounded-[10px] items-center h-full w-[40%]"
                    >
                      <h2
                        style={{ backgroundColor: setorInfo.cor2 }}
                        className="text-white text-[15px] fonteBold"
                      >
                        {formatarNumero(contabilidadeDeFalta("lojasP"))}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="w-full h-[22%] flex justify-around items-center ">
                  <div className="h-full w-full aspect-square flex justify-around items-center ">
                    <div
                      data-tooltip-id="tooltip-faturado"
                      data-tooltip-html="Imóveis médios"
                      style={{ backgroundColor: setorInfo.cor1 }}
                      className="w-[15%] h-full flex items-center justify-center aspect-square bg-white rounded-[10px] relative"
                    >
                      <img className="h-[70%]" src={LojaMImg} alt="" />
                    </div>
                    <div
                      style={{ backgroundColor: setorInfo.cor2 }}
                      className="flex justify-around items-center w-[35%] h-full rounded-[5px] "
                    >
                      {" "}
                      {/* Adicionei o `relative` aqui */}
                      <h2
                        data-tooltip-id="tooltip-faturado"
                        data-tooltip-html="Quantidade de Imóveis médios necessários "
                        style={{ backgroundColor: setorInfo.cor2 }}
                        className="text-white text-center text-[15px] w-full fonteBold rounded-[5px]"
                      >
                        {
                          dados[setorAtivo].edificios[index].lojasNecessarias
                            .lojasM
                        }
                      </h2>
                      <div
                        data-tooltip-id="tooltip-faturado"
                        data-tooltip-html="Quantidade de Imóveis médios atual "
                        style={{ backgroundColor: setorInfo.cor4 }}
                        className="flex justify-center items-center h-full w-full rounded-[5px]"
                      >
                        <h2 className="text-white text-[15px] fonteBold">
                          {dados.lojasM.quantidade}
                        </h2>
                      </div>
                    </div>

                    <div
                      data-tooltip-id="tooltip-faturado"
                      data-tooltip-html="Valor necessário para comprar os imóveis médios que faltam"
                      style={{ backgroundColor: setorInfo.cor2 }}
                      className="flex justify-center rounded-[10px] items-center h-full w-[40%]"
                    >
                      <h2
                        style={{ backgroundColor: setorInfo.cor2 }}
                        className="text-white text-[15px] fonteBold"
                      >
                        {" "}
                        {formatarNumero(contabilidadeDeFalta("lojasM"))}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="w-full h-[22%] flex justify-around items-center ">
                  <div className="h-full w-full aspect-square flex justify-around items-center ">
                    <div
                      data-tooltip-id="tooltip-faturado"
                      data-tooltip-html="Imóveis grandes"
                      style={{ backgroundColor: setorInfo.cor1 }}
                      className="w-[15%] h-full flex items-center justify-center aspect-square bg-white rounded-[10px] relative"
                    >
                      <img className="h-[70%]" src={LojaGImg} alt="" />
                    </div>
                    <div
                      style={{ backgroundColor: setorInfo.cor2 }}
                      className="flex justify-around items-center w-[35%] h-full rounded-[5px] "
                    >
                      {" "}
                      {/* Adicionei o `relative` aqui */}
                      <h2
                        data-tooltip-id="tooltip-faturado"
                        data-tooltip-html=" Quantidade de imóveis grandes necessários"
                        style={{ backgroundColor: setorInfo.cor2 }}
                        className="text-white text-center text-[15px] w-full fonteBold rounded-[5px]"
                      >
                        {
                          dados[setorAtivo].edificios[index].lojasNecessarias
                            .lojasG
                        }
                      </h2>
                      <div
                        data-tooltip-id="tooltip-faturado"
                        data-tooltip-html="Quantidade de imóveis grandes atual"
                        atual
                        style={{ backgroundColor: setorInfo.cor4 }}
                        className="flex justify-center items-center h-full w-full rounded-[5px]"
                      >
                        <h2 className="text-white text-[15px] fonteBold">
                          {dados.lojasG.quantidade}
                        </h2>
                      </div>
                    </div>

                    <div
                      data-tooltip-id="tooltip-faturado"
                      data-tooltip-html="Valor necessário para comprar os imóveis grandes que faltam"
                      style={{ backgroundColor: setorInfo.cor2 }}
                      className="flex justify-center rounded-[10px] items-center h-full w-[40%]"
                    >
                      <h2
                        style={{ backgroundColor: setorInfo.cor2 }}
                        className="text-white text-[15px] fonteBold"
                      >
                        {" "}
                        {formatarNumero(contabilidadeDeFalta("lojasG"))}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div style={{ backgroundColor: setorInfo.cor3 }} className="w-[100%] flex rounded-[10px]">
                                    <div style={{ backgroundColor: setorInfo.cor3 }} className=" flex items-center justify-around w-full h-full text-white rounded-[10px]">Comprar Restante
                                    </div>
                                    <div style={{ backgroundColor: setorInfo.cor2 }} className="flex justify-center rounded-[10px] items-center h-full w-[40%]">
                                        <h2 style={{ backgroundColor: setorInfo.cor2 }} className="text-white text-[15px] fonteBold"> 2.2 M</h2>
                                    </div>
                                </div> */}
            </div>
          )}
          {visibleId === "licenca" && isModalOpen === true && (
            <div
              onClick={() => handleFlip()}
              className="w-[90%] h-[90%] flex items-center flex-col justify-between self-center"
            >
              <div
                style={{ backgroundColor: setorInfo.cor1 }}
                className="w-full h-[15%] rounded-[10px] flex justify-between "
              >
                <div
                  style={{
                    background: `linear-gradient(135deg, ${setorInfo.cor3} 0%,${setorInfo.cor1} 100%)`,
                  }}
                  className="h-[100%] aspect-square rounded-[10px] flex items-center justify-center"
                >
                  <img className="h-[70%]" src={licença} alt="" />
                </div>

                <div className="flex p-[10px] justify-center items-center">
                  <h1 className="text-white fonteBold text-[12px]">
                    Licenças Necessárias
                  </h1>
                </div>
              </div>
              <div className="h-[75%] w-full"></div>
              <LicenseNec />
            </div>
          )}
          {visibleId === "powerUp" && isModalOpen === true && (
            <div
              onClick={() => handleFlip()}
              className="w-[90%] h-[90%] flex items-center flex-col justify-around self-center"
            >
              <div
                style={{ backgroundColor: setorInfo.cor1 }}
                className="w-full h-[20%] rounded-[10px] flex justify-between "
              >
                <div
                  style={{
                    background: `linear-gradient(135deg,${setorInfo.cor4} 0%,${corPowerUpAtual} 30%, #350973 70%,${setorInfo.cor1} 100%)`,
                  }}
                  className="h-[100%] aspect-square rounded-[10px] flex items-center justify-center"
                >
                  <img
                    className="h-[70%] rotate-[270deg]"
                    src={PróximoImg}
                    alt=""
                  />
                </div>

                <div className="flex p-[10px] justify-center items-center">
                  <h1 className="text-white fonteBold text-[12px]">
                    Power Ups
                  </h1>
                </div>
              </div>
              <div className="h-[20%] w-full flex justify-between flex-col items-center">
                <div
                  style={{ backgroundColor: setorInfo.cor1 }}
                  className="w-full flex items-center justify-center rounded-[10px] p-[5px] h-full"
                >
                  <div className="w-[100%] rounded-[20px] flex justify-around items-center  h-full">
                    <div
                      data-tooltip-id="tooltip-faturado"
                      data-tooltip-html="Quantidade mínima de edifícios para <b>Power Up Nível 1</b>"
                      style={{ backgroundColor: setorInfo.cor2 }}
                      className="flex justify-around items-center w-[30%] h-full rounded-[10px] p-[2px]"
                    >
                      {" "}
                      {/* Adicionei o `relative` aqui */}
                      <div className="bg-[#8F5ADA] w-[50%] h-full w-[80%] aspect-square rounded-[7px] flex items-center justify-center hover:scale-[1.20] duration-300 ease-in-out delay-[0.1s] cursor-pointer">
                        <img
                          className="h-[70%] aspect-square rotate-[270deg]"
                          src={PróximoImg}
                        />
                      </div>
                      <div className="flex justify-center items-center w-full">
                        <h2 className="text-white text-[10px] fonteBold">
                          {
                            dados[setorAtivo].edificios[index].powerUp.nível1
                              .quantidadeMínima
                          }
                        </h2>
                      </div>
                    </div>
                    <div
                      data-tooltip-id="tooltip-faturado"
                      data-tooltip-html="Quantidade mínima de edifícios para <b>Power Up Nível 2</b>"
                      style={{ backgroundColor: setorInfo.cor2 }}
                      className="flex justify-around items-center w-[30%] h-full rounded-[10px] p-[2px]"
                    >
                      {" "}
                      {/* Adicionei o `relative` aqui */}
                      <div className="bg-[#6411D9] w-[50%] h-full w-[80%] aspect-square rounded-[7px] flex items-center justify-center hover:scale-[1.20] duration-300 ease-in-out delay-[0.1s] cursor-pointer">
                        <img
                          className="h-[70%] aspect-square rotate-[270deg]"
                          src={PróximoImg}
                        />
                      </div>
                      <div className="flex justify-center items-center h-full w-full">
                        <h2 className="text-white text-[10px]  fonteBold">
                          {
                            dados[setorAtivo].edificios[index].powerUp.nível2
                              .quantidadeMínima
                          }
                        </h2>
                      </div>
                    </div>
                    <div
                      data-tooltip-id="tooltip-faturado"
                      data-tooltip-html="Quantidade mínima de edifícios para <b>Power Up Nível 3</b>"
                      style={{ backgroundColor: setorInfo.cor2 }}
                      className="flex justify-around items-center w-[30%] h-full rounded-[10px] p-[2px]"
                    >
                      {" "}
                      {/* Adicionei o `relative` aqui */}
                      <div className="bg-[#350973] w-[50%] h-full w-[80%] aspect-square rounded-[7px] flex items-center justify-center hover:scale-[1.20] duration-300 ease-in-out delay-[0.1s] cursor-pointer">
                        <img
                          className="h-[70%] aspect-square rotate-[270deg]"
                          src={PróximoImg}
                        />
                      </div>
                      <div className="flex justify-center items-center w-full">
                        <h2 className="text-white text-[10px] fonteBold">
                          {
                            dados[setorAtivo].edificios[index].powerUp.nível3
                              .quantidadeMínima
                          }
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{ backgroundColor: setorInfo.cor2 }}
                className="h-[50%] w-full rounded-[10px] flex flex-col items-center justify-around"
              >
                <p className="text-white text-[10px] h-[65%] p-[5px]">
                  {dados[setorAtivo].edificios[index].desc}.{" "}
                </p>
                <button
                  data-tooltip-id="tooltip-faturado"
                  data-tooltip-html="Exibe uma tabela com todos os edifícios que concedem ou recebem power-ups deste edifício."
                  onClick={openModalPowerUps}
                  className=" w-[85%] h-[25%] z-50 text-white text-[10px] bg-[#6411D9] rounded-[10px] hover:scale-[1.10] duration-300 ease-in-out"
                >
                  Todos power ups
                </button>
              </div>
            </div>
          )}
          {visibleId === "finançasEd" && isModalOpen === true && (
            <div
              onClick={() => handleFlip()}
              className="w-[90%] h-[90%] flex items-center flex-col justify-between self-center relative z-[20] overflow-visible"
              style={{ pointerEvents: "auto" }}
            >
              {/* Barra superior */}
              <div
                style={{ backgroundColor: setorInfo.cor1 }}
                className="w-full h-[20%] rounded-[10px] flex justify-between"
              >
                {/* Ícone */}
                <div
                  className="h-[100%] aspect-square rounded-[10px] flex items-center justify-center relative group overflow-visible"
                  style={{
                    background: `linear-gradient(135deg, ${setorInfo.cor3} 0%, ${setorInfo.cor1} 100%)`,
                  }}
                >
                  <img className="h-[70%]" src={DolarImg} alt="" />
                  <div
                    className="absolute group-hover:flex hidden items-center justify-center px-3 py-1 text-sm rounded-md whitespace-nowrap pointer-events-none"
                    style={{
                      top: "-40px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      backgroundColor: "#222",
                      color: "#fff",
                      zIndex: 2147483647,
                    }}
                  ></div>
                </div>

                {/* Título */}
                <div className="flex p-[10px] justify-center items-center relative group overflow-visible">
                  <h1 className="text-white fonteBold text-[12px]">
                    Finanças do edifício
                  </h1>
                  <div
                    className="absolute group-hover:flex hidden items-center justify-center px-3 py-1 text-sm rounded-md whitespace-nowrap pointer-events-none"
                    style={{
                      top: "-34px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      backgroundColor: "#222",
                      color: "#fff",
                      zIndex: 2147483647,
                    }}
                  ></div>
                </div>
              </div>

              {/* Linha 1 */}
              <div className="flex w-full h-[15%] justify-around">
                {/* Faturamento mensal */}
                <div
                  style={{ backgroundColor: setorInfo.cor2 }}
                  className="flex justify-between rounded-[10px] items-center h-full w-[45%]"
                >
                  <div
                    className="h-full flex items-center justify-center aspect-square rounded-[10px] relative group overflow-visible"
                    style={{ backgroundColor: setorInfo.cor1 }}
                  >
                    <Tooltip
                      text={
                        "Faturamento mensal estimado\n caso você detenha o edifício por um mês inteiro."
                      }
                      className=" items-center justify-center px-2 py-1 text-xs rounded-md whitespace-nowrap pointer-events-none"
                    >
                      <img className="h-[20px]" src={imgFatuMensal} alt="" />
                    </Tooltip>
                  </div>
                  <h2 className="text-white mr-[8px] text-[15px] fonteBold">
                    {formatarNumero(
                      dados[setorAtivo].edificios[index].finanças
                        .faturamentoUnitário * 30
                    )}
                  </h2>
                </div>

                {/* Imposto mensal */}
                <div
                  style={{ backgroundColor: setorInfo.cor2 }}
                  className="flex justify-between rounded-[10px] items-center h-full w-[45%]"
                >
                  <div
                    className="h-full flex items-center justify-center aspect-square rounded-[10px] relative group overflow-visible"
                    style={{ backgroundColor: setorInfo.cor1 }}
                  >
                    <Tooltip
                      text={
                        "Imposto fixo mensal\nO imposto fixo mensal tem um valor fixo que é cobrado se você detém o edifício até o fim do mês."
                      }
                      className=" items-center justify-center px-2 py-1 text-xs rounded-md whitespace-nowrap pointer-events-none"
                    >
                      <img className="h-[20px]" src={imgImpostoFixo} alt="" />
                    </Tooltip>
                  </div>
                  <h2 className="text-white mr-[8px] text-[15px] fonteBold">
                    {formatarNumero(
                      dados[setorAtivo].edificios[index].finanças.impostoFixo
                    )}
                  </h2>
                </div>
              </div>

              {/* Linha 2 */}
              <div className="flex w-full h-[15%] justify-around">
                {/* Rentabilidade */}
                <div
                  style={{ backgroundColor: setorInfo.cor2 }}
                  className="flex justify-between rounded-[10px] items-center h-full w-[45%]"
                >
                  <div
                    className="h-full flex items-center justify-center aspect-square rounded-[10px] relative group overflow-visible"
                    style={{ backgroundColor: setorInfo.cor1 }}
                  >
                    <Tooltip
                      text={
                        "Faturamento diário médio\nEsse valor é estimado caso você esteja com a economia do setor estável."
                      }
                      className=" items-center justify-center px-2 py-1 text-xs rounded-md whitespace-nowrap pointer-events-none"
                    >
                      <img
                        className="h-[15px]"
                        src={imgFaturamentoDiario}
                        alt=""
                      />
                    </Tooltip>
                  </div>
                  <h2 className="text-white mr-[8px] text-[15px] fonteBold">
                    {formatarNumero(
                      dados[setorAtivo].edificios[index].finanças
                        .faturamentoUnitário
                    )}
                  </h2>
                </div>

                {/* Lucro mensal */}
                <div
                  style={{ backgroundColor: setorInfo.cor2 }}
                  className="flex justify-between rounded-[10px] items-center h-full w-[45%]"
                >
                  <div
                    className="h-full flex items-center justify-center aspect-square rounded-[10px] relative group overflow-visible"
                    style={{ backgroundColor: setorInfo.cor1 }}
                  >
                    <Tooltip
                      text={
                        "valor do imposto sobre o faturamento mensal\nO imposto sobre o faturamento é um percentual cobrado sobre o faturamento mensal."
                      }
                      className=" items-center justify-center px-2 py-1 text-xs rounded-md whitespace-nowrap pointer-events-none"
                    >
                      <img className="h-[20px]" src={imgImpostoSFatu} alt="" />
                    </Tooltip>
                  </div>
                  <h2 className="text-white mr-[8px] text-[15px] fonteBold">
                    {formatarNumero(
                      dados[setorAtivo].edificios[index].finanças
                        .faturamentoUnitário *
                        30 *
                        dados[setorAtivo].edificios[index].finanças
                          .impostoSobreFatu
                    )}
                  </h2>
                </div>
              </div>

              {/* Linha 3 */}
              <div className="flex w-full h-[15%] justify-around">
                {/* Custos Fixos */}
                <div
                  style={{ backgroundColor: setorInfo.cor2 }}
                  className="flex justify-between rounded-[10px] items-center h-full w-[45%]"
                >
                  <div
                    className="h-full flex items-center justify-center aspect-square rounded-[10px] relative group overflow-visible"
                    style={{ backgroundColor: setorInfo.cor1 }}
                  >
                    <Tooltip
                      text={
                        "Rentabilidade do edifício\nA rentabilidade é a porcentagem do lucro líquido em relação ao faturamento mensal. esse valor pode variar conforme as condições econômicas do setor."
                      }
                      className=" items-center justify-center px-2 py-1 text-xs rounded-md whitespace-nowrap pointer-events-none"
                    >
                      <img className="h-[16px]" src={porcem} alt="" />
                    </Tooltip>
                  </div>
                  <h2 className="text-white mr-[8px] text-[15px] fonteBold">
                    {rentabilidade.toFixed(0)}%
                  </h2>
                </div>

                {/* Manutenção */}
                <div
                  style={{ backgroundColor: setorInfo.cor2 }}
                  className="flex justify-between rounded-[10px] items-center h-full w-[45%]"
                >
                  <div
                    className="h-full flex items-center justify-center aspect-square rounded-[10px] relative group overflow-visible"
                    style={{ backgroundColor: setorInfo.cor1 }}
                  >
                    <Tooltip
                      text="essa é a porcentagem do imposto sobre o faturamento mensal"
                      className=" items-center justify-center px-2 py-1 text-xs rounded-md whitespace-nowrap pointer-events-none"
                    >
                      <img className="h-[20px]" src={imgPercFatu} alt="" />
                    </Tooltip>
                  </div>
                  <h2 className="text-white mr-[8px] text-[15px] fonteBold">
                    {(
                      dados[setorAtivo].edificios[index].finanças
                        .impostoSobreFatu * 100
                    ).toFixed(0)}
                    %
                  </h2>
                </div>
              </div>

              {/* Linha 4 */}
              <div className="flex w-full h-[15%] justify-around">
                {/* Receita bruta */}
                <div
                  style={{ backgroundColor: setorInfo.cor2 }}
                  className="flex justify-between rounded-[10px] items-center h-full w-[45%]"
                >
                  <div
                    className="h-full flex items-center justify-center aspect-square rounded-[10px] relative group overflow-visible"
                    style={{ backgroundColor: setorInfo.cor1 }}
                  >
                    <Tooltip
                      text={
                        "O valor do lucro líquido mensal\nO lucro líquido mensal é o valor que sobra após deduzir todos os custos e impostos do faturamento mensal."
                      }
                      className=" items-center justify-center px-2 py-1 text-xs rounded-md whitespace-nowrap pointer-events-none"
                    >
                      <img className="h-[20px]" src={imgLucro} alt="" />
                    </Tooltip>
                  </div>
                  <h2 className="text-white mr-[8px] text-[15px] fonteBold">
                    {formatarNumero(
                      dados[setorAtivo].edificios[index].finanças
                        .faturamentoUnitário *
                        30 -
                        (dados[setorAtivo].edificios[index].finanças
                          .faturamentoUnitário *
                          30 *
                          dados[setorAtivo].edificios[index].finanças
                            .impostoSobreFatu +
                          dados[setorAtivo].edificios[index].finanças
                            .impostoFixo)
                    )}
                  </h2>
                </div>
                <div
                  style={{ backgroundColor: setorInfo.cor2 }}
                  className="flex justify-between rounded-[10px] items-center h-full w-[45%]"
                >
                  <div
                    className="h-full flex items-center justify-center aspect-square rounded-[10px] relative group overflow-visible"
                    style={{ backgroundColor: setorInfo.cor1 }}
                  >
                    <Tooltip
                      text={
                        "Esse é o valor total de impostos mensais\nO valor total de impostos mensais é a soma do imposto fixo mensal com o imposto sobre o faturamento mensal."
                      }
                      className=" items-center justify-center px-2 py-1 text-xs rounded-md whitespace-nowrap pointer-events-none"
                    >
                      <img className="h-[20px]" src={imgSomaImposto} alt="" />
                    </Tooltip>
                  </div>
                  <h2 className="text-white mr-[8px] text-[15px] fonteBold">
                    {formatarNumero(
                      dados[setorAtivo].edificios[index].finanças
                        .faturamentoUnitário *
                        30 *
                        dados[setorAtivo].edificios[index].finanças
                          .impostoSobreFatu +
                        dados[setorAtivo].edificios[index].finanças.impostoFixo
                    )}
                  </h2>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
