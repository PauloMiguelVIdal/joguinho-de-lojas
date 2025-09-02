import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import porcem from "../imagens/simbolo-de-porcentagem.png"
import terrenoImg from "../imagens/terreno.png"
import constNece from "../imagens/construção necessária.png"
import PróximoImg from "../imagens/proximo.png";
import ConstuirImg from "../imagens/martelo.png"
import licença from "../imagens/licença.png"
import agricultura from "./setores/agricultura.png"
import tecnologia from "./setores/tecnologia.png"
import comercio from "./setores/comercio.png"
import industria from "./setores/industria.png"
import imobiliario from "./setores/Imobiliário.png"
import energia from "./setores/torre-eletrica.png"
import grafico from "./setores/grafico.png"
import DolarImg from "../imagens/simbolo-do-dolar.png"
import { motion } from "framer-motion";
import LojaPImg from "../imagens/lojaP.png"
import LojaMImg from "../imagens/lojaM.png"
import LojaGImg from "../imagens/lojaG.png"
import SelectorImage from "./selectorImage";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import LicenseNec from "./licenseNec";
import fechar from "../imagens/fechar.png"
import plantação from "../../public/imagens/Plantação De Grãos.png"
import { Localizador } from "./localizador";
import { CardLocalization } from "./cardLocalization";
import { useSetor } from "./Redirector"
import { useAgricultura } from "./AgriculturaContext";
import { useComercio } from "./ComercioContext";
import { useIndustria } from "./IndustriaContext";
import { useEnergia } from "./EnergiaContext";
import { useImobiliario } from "./ImobiliarioContext";
import { useTecnologia } from "./TecnologiaContext";

export const CardModal = ({ index }) => {
    const { economiaSetores, setEconomiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);
    const { setorAtivo, dadosSetor } = useSetor();

    const setorSelecionado = (setorAtivo) => {
        switch (setorAtivo) {
            case "agricultura": return "dadosAgricultura";
            case "tecnologia": return "dadosTecnologia";
            case "industria": return "dadosIndustria";
            case "comercio": return "dadosComercio";
            case "imobiliario": return "dadosImobiliario";
            case "energia": return "dadosEnergia";
            case "carteira": return "dadosCarteira";
        }
    }
    const setorDados = dadosSetor; // pegando os dados completos do setor
    const baseSetor = setorDados[setorSelecionado(setorAtivo)][setorAtivo]
    const { dados, atualizarDados, atualizarDadosProf2, atualizarDadosProf3, atualizarDadosProf } = useContext(CentraldeDadosContext);
    const economiaSetor = baseSetor.economiaSetor.estadoAtual
    //   console.log(setorDados.dadosAgricultura.agricultura.edificios[0].nome)
    console.log(baseSetor)
    // useEffect(() => {
    //     const economiaSetor = dadosSetor.economiaSetor.estadoAtual
    //     // console.log(economiaSetor)
    // }, [dadosSetor.economiaSetor])

    const setores = [
        { id: "agricultura", cor3: "#0C9123", corClasse: "bg-[#4CAF50]", img: agricultura, descLicença: "Com a Licença Global de Agricultura, você terá acesso a cultivos exclusivos, otimização de produções e melhorias que aumentarão sua rentabilidade. Liberte o potencial do setor agrícola agora mesmo!", cor1: "#003816", cor2: "#1A5E2A", cor3: "#0C9123", cor4: "#4CAF50", },
        { id: "tecnologia", cor3: "#FF6F00 ", corClasse: "bg-[#FF8C42]", img: tecnologia, descLicença: "Com a Licença Global de Tecnologia, você desbloqueia inovações que podem transformar sua infraestrutura, otimizar processos e maximizar os lucros. Invista no futuro agora!", cor1: "#A64B00 ", cor2: "#D45A00 ", cor3: "#FF6F00 ", cor4: "#FF8C42 ", },
        { id: "industria", cor3: "#808080  ", corClasse: "bg-[#B3B3B3]", img: industria, descLicença: "Com a Licença Global de Indústria, você acessa fábricas avançadas e processos de produção que aceleram sua evolução e aumentam a eficiência. Não fique para trás!", cor1: "#1A1A1A ", cor2: "#4D4D4D  ", cor3: "#808080  ", cor4: "#B3B3B3  ", },
        { id: "comercio", cor3: "#E60000  ", corClasse: "bg-[#FF4D4D]", img: comercio, descLicença: "Com a Licença Global de Comércio, você tem acesso a novos mercados, estratégias de vendas e expansão que podem levar seus negócios a um novo nível. Não perca essa oportunidade!", cor1: "#660000  ", cor2: "#A31919  ", cor3: "#E60000  ", cor4: "#FF4D4D  ", },
        { id: "imobiliario", cor3: "#3333CC  ", corClasse: "bg-[#6666FF]", img: imobiliario, descLicença: "Com a Licença Global Imobiliária, você pode investir em novos terrenos, expandir suas construções e maximizar os retornos do mercado imobiliário. Abra as portas para grandes lucros!", cor1: "#000066  ", cor2: "#1A1A8C  ", cor3: "#3333CC  ", cor4: "#6666FF  " },
        { id: "energia", cor3: "#E6B800", corClasse: "bg-[#FFD966]", img: energia, descLicença: "Com a Licença Global de Energia, você ativa fontes de energia sustentáveis e de alta performance, garantindo uma operação eficiente e lucrativa. Potencialize seu setor energético agora!", cor1: "#665200   ", cor2: "#A37F19   ", cor3: "#E6B800", cor4: "#FFD966" },
        { id: "grafico", cor3: "#FF6F00 ", corClasse: "bg-[#6A00FF]", img: grafico, cor1: "#6A00FF ", cor2: "#6A00FF ", cor3: "#6A00FF ", cor4: "#6A00FF ", },
    ];

    const [rent, setRent] = useState(0)

    const [isModalOpen, setIsModalOpen] = useState(true);
    const [visibleId, setVisibleId] = useState('lojasNec');
    const [modalPowerup, setModalPowerUp] = useState(false)

    const [verificadorDeLojasNecessárias, setVerificador] = useState(true)

    const [verificadorDeConstruçõesNecessárias, setVerificadorConstr] = useState(true);

    const contabilidadeDeFalta = (edificio) => {
        const qtdAtual = dados[edificio].quantidade
        const qtdNecessaria = baseSetor.edificios[index].lojasNecessarias[edificio]

        const qtdFalta = qtdAtual >= qtdNecessaria ? 0 : qtdNecessaria - qtdAtual;
        const custoTotalConst = edificio === "terrenos" ? dados[edificio].preçoConstrução : edificio === "lojasP" ? dados[edificio].preçoConstrução + dados.terrenos.preçoConstrução : edificio === "lojasM" ? dados[edificio].preçoConstrução + 2 * dados.terrenos.preçoConstrução : edificio === "lojasG" ? dados[edificio].preçoConstrução + 3 * dados.terrenos.preçoConstrução : "lascou"
        const edificioSuficiente = edificio === "terrenos" ? "terrenosSuficientes" : edificio === "lojasP" ? "lojasPSuficientes" : edificio === "lojasM" ? "lojasMSuficientes" : edificio === "lojasG" ? "lojasGSuficientes" : "lascou"

        return qtdFalta * custoTotalConst

    }





    const mapaEdificioParaSetor = {
        // Agricultura
        "Plantação De Grãos": "agricultura",
        "Plantação De Vegetais": "agricultura",
        "Fazenda Administrativa": "agricultura",
        "Pomares": "agricultura",
        "Cooperativa Agrícola": "agricultura",
        "Centro De Comércio De Plantações": "agricultura",
        "Fazenda De Vacas": "agricultura",
        "Granja De Aves": "agricultura",
        "Criação De Ovinos": "agricultura",
        "Armazém": "agricultura",
        "Silo": "agricultura",
        "Depósito De Resíduos Orgânicos": "agricultura",
        "Madeireira": "agricultura",
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
        "Refinaria": "industria",
        "Biofábrica": "industria",
        "Fábrica De Chips": "industria",
        "Fábrica De Placas Eletrônicas": "industria",
        "Fábrica De Semicondutores": "industria",
        "Fábrica De Eletrônicos": "industria",
        "Fábrica De Robôs": "industria",
        "Empresa De Automação Industrial": "industria",
        "Fábrica De Motores": "industria",
        "Fábrica De Foguetes": "industria",
        "Fábrica De Aeronaves": "industria",
        "Estaleiro": "industria",

        // Pesquisa
        "Startup": "tecnologia",
        "Servidor Em Nuvem": "tecnologia",
        "Data Center": "tecnologia",
        "Empresa De Desenvolvimento De Software": "tecnologia",
        "Empresa De Telecomunicações": "tecnologia",
        "Empresa De Desenvolvimento De Software": "tecnologia",
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
        "Feira": "comercio",
        "Loja De Móveis": "comercio",
        "Restaurante": "comercio",
        "Livraria": "comercio",
        "Mercado": "comercio",
        "Adega": "comercio",
        "Padaria": "comercio",
        "Açougue": "comercio",
        "Loja De Conveniência": "comercio",
        "Posto De Combustíveis": "comercio",
        "Redes De Fast-food": "comercio",
        "Petshop": "comercio",
        "Farmácia": "comercio",
        "Cafeteria": "comercio",
        "Loja De Departamentos": "comercio",
        "Loja De Calçados": "comercio",
        "Loja De Vestuário": "comercio",
        "Loja de Gadgets e Wearables": "comercio",
        "Loja De Games": "comercio",
        "Loja De Celulares": "comercio",
        "Loja De Informática": "comercio",
        "Loja De Eletrônicos": "comercio",
        "Joalheria": "comercio",
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
        "Construtora": "imobiliario",
        "Imobiliária Residencial": "imobiliario",
        "Imobiliária Comercial ": "imobiliario",
        "Construtora De Infraestruturas": "imobiliario",
        "Aeroporto": "imobiliario",
        "Porto": "imobiliario",
        "Mineradora": "imobiliario",
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
        "Usina De Fusão Nuclear": "energia"
    };

    // const podeComprar = (
    //     verificadorDeConstruçõesNecessárias &&
    //     verificadorDeLojasNecessárias &&
    //     verificadorDeRecursosNecessários &&
    //     dados.saldo > dadosSetor.edificios[index].custoConstrucao
    // );


    // console.log("Pode comprar?", podeComprar);
    // console.log("verificadorDeConstruçõesNecessárias", verificadorDeConstruçõesNecessárias);
    // console.log("verificadorDeLojasNecessárias", verificadorDeLojasNecessárias);
    // console.log("verificadorDeRecursosNecessários", verificadorDeRecursosNecessários);
    // console.log("Saldo:", dados.saldo);
    // console.log("Custo:", dadosSetor.edificios[index].custoConstrucao);
    // console.log("✅ Pode Comprar?", podeComprar);
    // const [verificadorDeRecursosNecessários, setVerificadorRec] = useState(true)

    const valorEconomiaSetor = {
        "recessão": 0.6,
        "declinio": 0.85,
        "estável": 1,
        "progressiva": 1.1,
        "aquecida": 1.25,
    }[economiaSetor];

    // console.log(valorEconomiaSetor)
    useEffect(() => {
        const quantidadeTerrenos = baseSetor.edificios[index].lojasNecessarias.terrenos
        const quantidadeLojasP = baseSetor.edificios[index].lojasNecessarias.lojasP
        const quantidadeLojasM = baseSetor.edificios[index].lojasNecessarias.lojasM
        const quantidadeLojasG = baseSetor.edificios[index].lojasNecessarias.lojasG

        const quantidadeTerrenosAtual = dados.terrenos.quantidade
        const quantidadeLojasPAtual = dados.lojasP.quantidade
        const quantidadeLojasMAtual = dados.lojasM.quantidade
        const quantidadeLojasGAtual = dados.lojasG.quantidade

        const todosSuficientes =
            quantidadeTerrenosAtual >= quantidadeTerrenos &&
            quantidadeLojasPAtual >= quantidadeLojasP &&
            quantidadeLojasMAtual >= quantidadeLojasM &&
            quantidadeLojasGAtual >= quantidadeLojasG

        setVerificador(todosSuficientes)
    }, [dados, setorAtivo])




    useEffect(() => {
        const edificio = "lojasP"; // isso está errado
        const qtdAtual = dados[edificio]?.quantidade;
        const qtdNecessaria = dadosSetor?.edificios?.[index]?.lojasNecessarias?.[edificio];

        const edificioSuficiente =
            edificio === "terrenos" ? "terrenosSuficientes" :
                edificio === "lojasP" ? "lojasPSuficientes" :
                    edificio === "lojasM" ? "lojasMSuficientes" :
                        edificio === "lojasG" ? "lojasGSuficientes" :
                            "lascou";



        if (qtdAtual >= qtdNecessaria) {
            const novoEdificio = {
                ...dadosSetor.edificios[index],
                lojasNecessarias: {
                    ...dadosSetor.edificios[index].lojasNecessarias,
                    [edificioSuficiente]: true
                }
            };

            const novaLista = [...dadosSetor.edificios];
            novaLista[index] = novoEdificio;

            atualizarDados({
                ...dados,
                [setorAtivo]: {
                    ...dadosSetor,
                    edificios: novaLista
                }
            });
        }

    }, [dados.dia]);



    const [caixaTexto, setCaixaTexto] = useState(false)

    const edificio = { nome: baseSetor.edificios[index].nome, recursoDeConstrução: baseSetor.edificios[index].recursoDeConstrução, construNece: baseSetor.edificios[index].construçõesNecessárias };
    const arrayConstResources = edificio.recursoDeConstrução
    const arrayConstNece = edificio.construNece


    const formatarNumero = (num) => {
        if (num >= 1e12) return (num / 1e12).toFixed(1).replace('.0', '') + 'T'; // Trilhões
        if (num >= 1e9) return (num / 1e9).toFixed(1).replace('.0', '') + 'B';   // Bilhões
        if (num >= 1e6) return (num / 1e6).toFixed(1).replace('.0', '') + 'M';   // Milhões
        if (num >= 1e3) return (num / 1e3).toFixed(1).replace('.0', '') + 'K';   // Milhares
        return num.toString();
    };
    const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

    const booleanPreReq = (nomeEd) => {
        for (const setor of setoresArr) {
            const idx = dados[setor].edificios.findIndex(ed => ed.nome === nomeEd);
            if (idx !== -1) {
                return dados[setor].edificios[idx].quantidade > 0;
            }
        }
        return false;
    };






    let timer;



    const openModalPowerUps = () => {
        setModalPowerUp(true)
    }

    const fecharModalPowerUp = () => {
        setModalPowerUp(false)
    }



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

    const [flipped, setFlipped] = useState(false);

    const handleFlip = () => {
        setFlipped(!flipped);
    };

    const getImageUrl = (nomeArquivo) => `../../public/imagens/${nomeArquivo}.png`;


    const handleShow = (id) => setVisibleId(id);
    const handleHide = () => setVisibleId(null);

    const powerUps = [
        { nivel1: "qtd", cor: "#8F5ADA", },
        { nivel2: "qtd", cor: "#6411D9", },
        { nivel3: "qtd", cor: "#350973", },
    ];

    const setorInfo = setores.find(setor => setor.id === setorAtivo);
    // const nomeAtivo = dadosSetor.edificios[index].nome
    // const quantidadeAtivo = dadosSetor.edificios[index].quantidade;





    const quantidadeMinimaPowerUpNv2 = baseSetor.edificios[index].powerUp.nível2.quantidadeMínima;
    const quantidadeMinimaPowerUpNv3 = baseSetor.edificios[index].powerUp.nível3.quantidadeMínima;
    const corPadrão = { backgroundColor: setorInfo.cor2 };


    const corPowerUp = powerUp => {
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
        const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

        const verificarEdificios = (listaEdificios) => {
            return listaEdificios.some((nomeEdificio) => {
                const setor = setoresArr.find((s) => dados[s]?.edificios?.some((ed) => ed.nome === nomeEdificio));
                if (!setor) return true;

                const index = dados[setor].edificios.findIndex((ed) => ed.nome === nomeEdificio);
                return dados[setor].edificios[index]?.quantidade <= 0;
            });
        };

        const faltandoRecurso = verificarEdificios(arrayConstResources || []);
        const faltandoConstrucao = verificarEdificios(arrayConstNece || []);

        setVerificadorConstr(faltandoRecurso || faltandoConstrucao);
    }, [arrayConstResources, arrayConstNece, dados]);



    const quantidadeTerrenosNec = baseSetor.edificios[index].lojasNecessarias.terrenos
    const quantidadeLojasPNec = baseSetor.edificios[index].lojasNecessarias.lojasP
    const quantidadeLojasMNec = baseSetor.edificios[index].lojasNecessarias.lojasM
    const quantidadeLojasGNec = baseSetor.edificios[index].lojasNecessarias.lojasG


    const custoTotalTerrenos = quantidadeTerrenosNec * dados.terrenos.preçoConstrução
    const custoTotalLojasP = quantidadeLojasPNec * (
        dados.lojasP.preçoConstrução +
        (dados.lojasP.quantidadeNecTerreno * dados.terrenos.preçoConstrução)
    );

    const custoTotalLojasM = quantidadeLojasMNec * (
        dados.lojasM.preçoConstrução +
        (dados.lojasM.quantidadeNecTerreno * dados.terrenos.preçoConstrução)
    );

    const custoTotalLojasG = quantidadeLojasGNec * (
        dados.lojasG.preçoConstrução +
        (dados.lojasG.quantidadeNecTerreno * dados.terrenos.preçoConstrução)
    );

    const CustoTotalSomadoLojas = custoTotalTerrenos + custoTotalLojasP + custoTotalLojasM + custoTotalLojasG
    // console.log(custoTotalTerrenos)
    // console.log(custoTotalLojasP)
    // console.log(custoTotalLojasM)
    // console.log(custoTotalLojasG)
    // console.log(CustoTotalSomadoLojas)

    const comprarCard = () => {
        const localizador = (nomeEdificio) => {
            const setores = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];
            for (const setor of setores) {
                const index = baseSetor?.edificios?.findIndex((e) => e.nome === nomeEdificio);
                if (index !== -1) {
                    return {
                        setor,
                        index,
                        edificio: baseSetor.edificios[index],
                    };
                }
            }
            return null;
        };

        const edif = baseSetor.edificios[index];

        const quantidadeTerrenosNec = edif.lojasNecessarias.terrenos;
        const quantidadeLojasPNec = edif.lojasNecessarias.lojasP;
        const quantidadeLojasMNec = edif.lojasNecessarias.lojasM;
        const quantidadeLojasGNec = edif.lojasNecessarias.lojasG;

        const quantidadeTerrenosAtual = dados.terrenos.quantidade;
        const quantidadeLojasPAtual = dados.lojasP.quantidade;
        const quantidadeLojasMAtual = dados.lojasM.quantidade;
        const quantidadeLojasGAtual = dados.lojasG.quantidade;

        const custo = edif.custoConstrucao;

        if (economiaSetores.saldo < custo) {
            return alert("Você não tem dinheiro suficiente para construir.");
        }

        if (
            quantidadeTerrenosNec > quantidadeTerrenosAtual ||
            quantidadeLojasPNec > quantidadeLojasPAtual ||
            quantidadeLojasMNec > quantidadeLojasMAtual ||
            quantidadeLojasGNec > quantidadeLojasGAtual
        ) {
            return alert("Você não tem lojas suficientes.");
        }

        // 🔍 Verificação de construções NECESSÁRIAS (sem deduzir)
        if (edif.construçõesNecessárias && edif.construçõesNecessárias.length > 0) {
            for (const nomeConstrucao of edif.construçõesNecessárias) {
                const resultado = localizador(nomeConstrucao);

                if (!resultado) {
                    return alert(`Construção necessária "${nomeConstrucao}" não encontrada.`);
                }

                if (resultado.edificio.quantidade <= 0) {
                    return alert(`Você precisa de pelo menos 1 unidade de "${nomeConstrucao}".`);
                }
            }
        }

        // 🔍 Verificação de recursos de construção (com dedução posterior)
        if (edif.recursoDeConstrução && edif.recursoDeConstrução.length > 0) {
            for (const nomeConstrucao of edif.recursoDeConstrução) {
                const resultado = localizador(nomeConstrucao);

                if (!resultado) {
                    return alert(`Recurso de construção "${nomeConstrucao}" não encontrado.`);
                }

                if (resultado.edificio.quantidade <= 0) {
                    return alert(`Você precisa de pelo menos 1 unidade de "${nomeConstrucao}".`);
                }
            }
        }

        // ✅ Compra aprovada
        atualizarEco("saldo", economiaSetores.saldo - custo);
        atualizarDadosProf2([baseSetor, "edificios", index, "quantidade"], edif.quantidade + 1);

        atualizarDadosProf2(["terrenos", "quantidade"], quantidadeTerrenosAtual - quantidadeTerrenosNec);
        atualizarDadosProf2(["lojasP", "quantidade"], quantidadeLojasPAtual - quantidadeLojasPNec);
        atualizarDadosProf2(["lojasM", "quantidade"], quantidadeLojasMAtual - quantidadeLojasMNec);
        atualizarDadosProf2(["lojasG", "quantidade"], quantidadeLojasGAtual - quantidadeLojasGNec);

        // 🔻 Dedução dos recursos de construção
        if (edif.recursoDeConstrução && edif.recursoDeConstrução.length > 0) {
            for (const nomeConstrucao of edif.recursoDeConstrução) {
                const { setor, index, edificio } = localizador(nomeConstrucao);
                atualizarDadosProf2([setor, "edificios", index, "quantidade"], edificio.quantidade - 1);
            }
        }

        // console.log("Compra concluída com sucesso.");
    };







    const nomeFatu = baseSetor.edificios[index].nome

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

    let indice = -1
    const quantidadeAtivoAtual = baseSetor.edificios[index].quantidade;



    const powerUpSelecionado =
        quantidadeAtivoAtual >= quantidadeMinimaPowerUpNv3
            ? "powerUpNv3"
            : quantidadeAtivoAtual >= quantidadeMinimaPowerUpNv2
                ? "powerUpNv2"
                : "powerUpNv1";


    const corPowerUpAtual = corPowerUp(powerUpSelecionado);
    const corColunaAtual = corPadrão // Definição da variável antes de usá-la

    const corColuna = corColunaAtual === corPowerUpAtual ? corPowerUpAtual : corPadrão;
    const corLinha = quantidadeAtivoAtual > 0 ? corPowerUpAtual : corPadrão;

    const lineStyle = { background: corLinha }
    // const bgColuna1 = powerUpSelecionado === "powerUpNv1" ? corPowerUp("powerUpNv1"):  powerUpSelecionado === "powerUpNv2" ? corPowerUp("powerUpNv2") : corPowerUp("powerUpNv3");
    const bgColuna1 = corLinha === "#8F5ADA" ? corPowerUp("powerUpNv1") : powerUpSelecionado === "powerUpNv2" ? corPowerUp("powerUpNv2") : powerUpSelecionado === "powerUpNv3" ? corPowerUp("powerUpNv3") : corPadrão

    const bgColuna2 = powerUpSelecionado === "powerUpNv1" ? corPadrão : powerUpSelecionado === "powerUpNv2" ? corPowerUp("powerUpNv2") : corPowerUp("powerUpNv3");

    const bgColuna3 = powerUpSelecionado === "powerUpNv1" ? corPadrão : powerUpSelecionado === "powerUpNv2" ? corPadrão : corPowerUp("powerUpNv3");
    const columnStyleNv1 = { backgroundColor: bgColuna1 };
    const columnStyleNv2 = { backgroundColor: bgColuna2 };
    const columnStyleNv3 = { backgroundColor: bgColuna3 };


    // console.log(dadosSetor.edificios[index])


    // dadosSetor.edificios[index].RecebeMelhoraEficiencia.map((edMelhorado, i) => {




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


    // const meDaSetor = (setor) => {
    //     switch (setor) {
    //       case "agricultura":
    //         return useAgricultura();
    //       case "comercio":
    //         return useComercio();
    //       case "industria":
    //         return useIndustria();
    //       case "energia":
    //         return useEnergia();
    //       case "imobiliario":
    //         return useImobiliario();
    //       case "tecnologia":
    //         return useTecnologia();
    //       default:
    //         return null;
    //     }
    //   };

    //   const descobrirSetor = (edMelhorado) => mapaEdificioParaSetor[edMelhorado];


              
    //   // exemplo de uso
    // //   const setorDescoberto = descobrirSetor("Restaurante"); 
    //   const dadosCorretosSetor = meDaSetor(setorDescoberto);

    //   console.log("Setor descoberto:", setorDescoberto);
    //   console.log("Contexto retornado:", dadosCorretosSetor);


    const [acumuladorPowerUpRedCustoFornece, setAcumuladorPowerUpRedCustoFornece] = useState(0);
    const [acumuladorPowerUpAumFatuFornece, setAcumuladorPowerUpAumFatuFornece] = useState(0);
    const [acumuladorPowerUpRedCustoRecebe, setAcumuladorPowerUpRedCustoRecebe] = useState(0);
    const [acumuladorPowerUpAumFatuRecebe, setAcumuladorPowerUpAumFatuRecebe] = useState(0);

    // Aqui sim, fazemos o cálculo num useEffect:

    // useEffect(() => {
    //         let novoAcumuladorRedCusto = 0;
    //         let novoAcumuladorAumFatu = 0;

    //         const setorDef = (setorDef) => {
    //             switch (setorDef) {
    //               case "agricultura": return "dadosAgricultura";
    //               case "tecnologia": return "dadosTecnologia";
    //               case "industria": return "dadosIndustria";
    //               case "comercio": return "dadosComercio";
    //               case "imobiliario": return "dadosImobiliario";
    //               case "energia": return "dadosEnergia";
    //               case "carteira": return "dadosCarteira";
    //             }
    //           }


              

    //         baseSetor.edificios[index].ForneceMelhoraEficiencia.forEach((edMelhorado) => {
    //             let setorEncontrado = null;
    //             let indice = -1;

    //             // Função que procura o edifício pelo nome em todos os setores
    //             const quantidadeAtivo = (nomeEd) => {
    //                 for (const setor of setoresArr) {

    //                     // const dadosCorretosSetor = meDaSetor(setorDescoberto);


    //                   const chave = setorDef(setor);
                      
    //                   if (!chave) continue;
                      
    //                   const setorDescoberto = descobrirSetor(nomeEd); 
    //                 //   descobrirSetor(nomeEd)
                      
    //                 console.log(dadosCorretosSetor)
    //                 const dadosCorretosSetor = meDaSetor(setorDescoberto);
    //                   console.log(nomeEd)
    //                   console.log(setorDescoberto)
    //                   const idx = dadosCorretosSetor[setorDescoberto].edificios.findIndex(ed => ed.nome === nomeEd);
                      
    //                   console.log(idx)

    //                   if (idx !== -1) {
    //                     setorEncontrado = setor;
    //                     console.log(setorEncontrado)
    //                     indice = idx;
    //                     return [chave][setor].edificios[idx].quantidade;
    //                   }
    //                 }
    //                 return 0;
    //               };

    //             // Quantidade do edifício que recebe o benefício
    //             const qtdMelhorado = quantidadeAtivo(edMelhorado.nome);

    //             // Quantidade do edifício que fornece o benefício
    //             const qtdFornecedor = quantidadeAtivo(baseSetor.edificios[index].nome);

    //             // Define qual nível de power-up usar
    //             const powerUpSelecionado =
    //                 qtdFornecedor >= quantidadeMinimaPowerUpNv3
    //                     ? "powerUpNv3"
    //                     : qtdFornecedor >= quantidadeMinimaPowerUpNv2
    //                         ? "powerUpNv2"
    //                         : "powerUpNv1";

    //             // Só acumula se realmente existe quem recebe o benefício
    //             if (qtdMelhorado > 0) {
    //                 const ValorpowerUpAtualRedCustoFornece =
    //                     powerUpSelecionado === "powerUpNv1" ? edMelhorado.redCusto.nível1 :
    //                     powerUpSelecionado === "powerUpNv2" ? edMelhorado.redCusto.nível2 :
    //                     edMelhorado.redCusto.nível3;

    //                 novoAcumuladorRedCusto += ValorpowerUpAtualRedCustoFornece;

    //                 const ValorpowerUpAtualAumFatuFornece =
    //                     powerUpSelecionado === "powerUpNv1" ? edMelhorado.aumFatu.nível1 :
    //                     powerUpSelecionado === "powerUpNv2" ? edMelhorado.aumFatu.nível2 :
    //                     edMelhorado.aumFatu.nível3;

    //                 novoAcumuladorAumFatu += ValorpowerUpAtualAumFatuFornece;
    //             }
    //         });

    //         setAcumuladorPowerUpRedCustoFornece(novoAcumuladorRedCusto);
    //         setAcumuladorPowerUpAumFatuFornece(novoAcumuladorAumFatu);
    //     }, [dados, setorAtivo, index, setoresArr, quantidadeMinimaPowerUpNv2, quantidadeMinimaPowerUpNv3]);

    //     useEffect(() => {
    //         let novoAcumuladorRedCusto = 0;
    //         let novoAcumuladorAumFatu = 0;

    //         baseSetor.edificios[index].RecebeMelhoraEficiencia.forEach((edMelhorado) => {
    //             let setorEncontrado = null;
    //             let indice = -1;
    //             const quantidadeAtivo = (nomeEd) => {
    //                 for (const setor of setoresArr) {
    //                     setorEncontrado = setor;
    //                     indice = dados[setorEncontrado].edificios.findIndex(ed => ed.nome === nomeEd);
    //                     if (indice !== -1) {
    //                         return dados[setor].edificios[indice].quantidade;
    //                     }
    //                 }
    //                 return 0;
    //             };

    //             const qtdMelhorado = quantidadeAtivo(edMelhorado.nome);
    //             const qtd = quantidadeAtivo(baseSetor.edificios[index].nome);

    //             const powerUpSelecionado =
    //                 qtd >= quantidadeMinimaPowerUpNv3
    //                     ? "powerUpNv3"
    //                     : qtd >= quantidadeMinimaPowerUpNv2
    //                         ? "powerUpNv2"
    //                         : "powerUpNv1";

    //             if (qtdMelhorado > 0) {
    //                 const ValorpowerUpAtualRedCustoFornece =
    //                     powerUpSelecionado === "powerUpNv1" ? edMelhorado.redCusto.nível1 :
    //                         powerUpSelecionado === "powerUpNv2" ? edMelhorado.redCusto.nível2 :
    //                             edMelhorado.redCusto.nível3;

    //                 novoAcumuladorRedCusto += ValorpowerUpAtualRedCustoFornece;

    //                 const ValorpowerUpAtualAumFatuFornece =
    //                     powerUpSelecionado === "powerUpNv1" ? edMelhorado.aumFatu.nível1 :
    //                         powerUpSelecionado === "powerUpNv2" ? edMelhorado.aumFatu.nível2 :
    //                             edMelhorado.aumFatu.nível3;

    //                 novoAcumuladorAumFatu += ValorpowerUpAtualAumFatuFornece;
    //             }
    //         });

    //         setAcumuladorPowerUpRedCustoRecebe(novoAcumuladorRedCusto);
    //         setAcumuladorPowerUpAumFatuRecebe(novoAcumuladorAumFatu);
    //         // console.log(acumuladorPowerUpAumFatuRecebe)
    //         // console.log(acumuladorPowerUpRedCustoRecebe)

    //     }, [dados, setorAtivo, index, setoresArr, quantidadeMinimaPowerUpNv2, quantidadeMinimaPowerUpNv3]);


    const valorFatu = baseSetor.edificios[index].finanças.faturamentoUnitário
    const valorImpostoFixo = baseSetor.edificios[index].finanças.impostoFixo
    const impostoSobreFatu = baseSetor.edificios[index].finanças.impostoSobreFatu
    const custoConstrução = baseSetor.edificios[index].custoConstrucao;

    const impostoSobreFatuFinal = impostoSobreFatu - (impostoSobreFatu * (acumuladorPowerUpRedCustoRecebe / 100))
    const valorFatuFinal = ((valorFatu + (valorFatu * (acumuladorPowerUpAumFatuRecebe / 100)))
        // * valorEconomiaSetor
    )
    const valorImpostoFixoFinal = valorImpostoFixo - (valorImpostoFixo * (acumuladorPowerUpRedCustoRecebe / 100))

    let custoRecursos = 0;

    // Função recursiva para calcular custo total de um recurso
    function calcularCustoRecurso(nomeRecurso, nivel = 1) {
        //   console.log("🔍".repeat(nivel), `Verificando recurso: ${nomeRecurso}`);

        for (const setor of setoresArr) {
            const edificioEncontrado = dados[setor]?.edificios?.find(e => e.nome === nomeRecurso);

            if (edificioEncontrado) {
                //   console.log("✅".repeat(nivel), `Edifício encontrado: ${edificioEncontrado.nome}, no setor: ${setor}`);

                const custoConstrucaoRecurso = edificioEncontrado.custoConstrucao || 0;
                //   console.log("🏗️".repeat(nivel), `Custo da construção: ${custoConstrucaoRecurso}`);

                const quantidadeTerrenosNec = edificioEncontrado.lojasNecessarias.terrenos || 0;
                const quantidadeLojasPNec = edificioEncontrado.lojasNecessarias.lojasP || 0;
                const quantidadeLojasMNec = edificioEncontrado.lojasNecessarias.lojasM || 0;
                const quantidadeLojasGNec = edificioEncontrado.lojasNecessarias.lojasG || 0;

                //   console.log("📦".repeat(nivel), `Lojas necessárias → Terrenos: ${quantidadeTerrenosNec}, P: ${quantidadeLojasPNec}, M: ${quantidadeLojasMNec}, G: ${quantidadeLojasGNec}`);

                const custoTotalTerrenos = quantidadeTerrenosNec * dados.terrenos.preçoConstrução;

                const custoTotalLojasP = quantidadeLojasPNec * (
                    dados.lojasP.preçoConstrução +
                    (dados.lojasP.quantidadeNecTerreno * dados.terrenos.preçoConstrução)
                );

                const custoTotalLojasM = quantidadeLojasMNec * (
                    dados.lojasM.preçoConstrução +
                    (dados.lojasM.quantidadeNecTerreno * dados.terrenos.preçoConstrução)
                );

                const custoTotalLojasG = quantidadeLojasGNec * (
                    dados.lojasG.preçoConstrução +
                    (dados.lojasG.quantidadeNecTerreno * dados.terrenos.preçoConstrução)
                );

                //   console.log("💰".repeat(nivel), `Custo total → Terrenos: ${custoTotalTerrenos}, LojasP: ${custoTotalLojasP}, LojasM: ${custoTotalLojasM}, LojasG: ${custoTotalLojasG}`);

                // Soma do próprio custo de construção + lojas
                let custoTotalRecurso = custoConstrucaoRecurso + custoTotalTerrenos + custoTotalLojasP + custoTotalLojasM + custoTotalLojasG;

                // Recursão para os recursos de construção desse edifício
                if (Array.isArray(edificioEncontrado.recursoDeConstrução) && edificioEncontrado.recursoDeConstrução.length > 0) {
                    // console.log("🔁".repeat(nivel), `Iniciando cálculo de recursos de construção para: ${edificioEncontrado.nome}`);

                    edificioEncontrado.recursoDeConstrução.forEach(subRecurso => {
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
    arrayConstResources?.forEach(nomeRecurso => {
        const custo = calcularCustoRecurso(nomeRecurso);
        //   console.log("💼 Custo acumulado do recurso", nomeRecurso, "=", custo);
        custoRecursos += custo;
    });

    // console.log("🔚 Custo total acumulado de todos os recursos:", custoRecursos);

    let fatuMensal = valorFatuFinal * 30
    let valorImpostoSobreFatu = fatuMensal * impostoSobreFatuFinal
    // console.log("custoRecursos", custoRecursos)
    // console.log("custo de lojas", CustoTotalSomadoLojas)
    // console.log("custo de construção", custoConstrução)
    // console.log("custo total", custoRecursos + CustoTotalSomadoLojas + custoConstrução)

    const valorFinalMês = (((fatuMensal) - (valorImpostoSobreFatu)) - valorImpostoFixoFinal)
    const rentabilidade = (valorFinalMês / (CustoTotalSomadoLojas + custoRecursos + custoConstrução)) * 100

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
                <motion.div style={{ backgroundColor: setorInfo.cor4 }}
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
                    <div style={{ backgroundColor: setorInfo.cor1 }} className="flex w-[95%] text-[50px] fonteBold text-white h-[15%] rounded-[20px] justify-center items-center ">
                        {baseSetor.edificios[index].nome}
                    </div >

                    <div style={{ backgroundColor: setorInfo.cor2 }} className="w-[95%] h-[75%] rounded-[20px] self-center">
                        <div style={{ backgroundColor: setorInfo.cor1 }} className="flex justify-around h-full rounded-[20px] w-full p-[5px]">
                            <div className="w-[49%] h-full flex flex-col items-center justify-between">
                                <div style={{ backgroundColor: setorInfo.cor2 }} className="w-full h-[15%] bg-white fonteBold text-white mt-[10px] pl-[10px] rounded-[10px] text-[40px]">
                                    Fornece
                                </div>
                                <div className="w-full h-[70%] overflow-y-auto">
                                    <table className="w-full mt-[10px]">
                                        <thead>
                                            <tr>
                                                <th style={{ backgroundColor: setorInfo.cor3 }} className="text-white rounded-[10px]">Red. custo</th>
                                                <th>
                                                    <div className="bg-[#8F5ADA] w-[20%] h-[40px] w-[40px] m-auto aspect-square rounded-[7px] flex items-center justify-center cursor-pointer">
                                                        <img className="h-[70%] aspect-square rotate-[270deg]" src={PróximoImg} />
                                                    </div>
                                                </th>
                                                <th>
                                                    <div className="bg-[#6411D9] w-[20%] h-[40px] w-[40px] m-auto aspect-square rounded-[7px] flex items-center justify-center cursor-pointer">
                                                        <img className="h-[70%] aspect-square rotate-[270deg]" src={PróximoImg} />
                                                    </div>
                                                </th>
                                                <th>
                                                    <div className="bg-[#350973] w-[20%] h-[40px] w-[40px] m-auto aspect-square rounded-[7px] flex items-center justify-center cursor-pointer">
                                                        <img className="h-[70%] aspect-square rotate-[270deg]" src={PróximoImg} />
                                                    </div>
                                                </th>
                                                <th style={{ backgroundColor: setorInfo.cor3 }} className="text-white rounded-[10px]">Aumento fatu</th>
                                                <th>
                                                    <div className="bg-[#8F5ADA] w-[20%] h-[40px] w-[40px] m-auto aspect-square rounded-[7px] flex items-center justify-center cursor-pointer">
                                                        <img className="h-[70%] aspect-square rotate-[270deg]" src={PróximoImg} />
                                                    </div>
                                                </th>
                                                <th>
                                                    <div className="bg-[#6411D9] w-[20%] h-[40px] w-[40px] m-auto aspect-square rounded-[7px] flex items-center justify-center cursor-pointer">
                                                        <img className="h-[70%] aspect-square rotate-[270deg]" src={PróximoImg} />
                                                    </div>
                                                </th>
                                                <th>
                                                    <div className="bg-[#350973] w-[20%] h-[40px] w-[40px] m-auto aspect-square rounded-[7px] flex items-center justify-center cursor-pointer">
                                                        <img className="h-[70%] aspect-square rotate-[270deg]" src={PróximoImg} />
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>

                                        {baseSetor.edificios[index].ForneceMelhoraEficiencia.map((edMelhorado, i) => {

                                            let setorEncontrado = null;

                                            let indice = -1
                                            const quantidadeAtivo = (nomeEd) => {
                                                for (const setor of setoresArr) {
                                                    setorEncontrado = setor;
                                                    indice = dados[setorEncontrado].edificios.findIndex(ed => ed.nome === nomeEd);
                                                    if (indice !== -1) {
                                                        return dados[setor].edificios[indice].quantidade;
                                                    }
                                                }
                                                return 0
                                            }

                                            const qtdMelhorado = quantidadeAtivo(edMelhorado.nome);

                                            const qtd = quantidadeAtivo(baseSetor.edificios[index].nome);

                                            const powerUpSelecionado =
                                                qtd >= quantidadeMinimaPowerUpNv3
                                                    ? "powerUpNv3"
                                                    : qtd >= quantidadeMinimaPowerUpNv2
                                                        ? "powerUpNv2"
                                                        : "powerUpNv1";

                                            if (qtdMelhorado > 0) {
                                                powerUpSelecionado === "powerUpNv1" ? edMelhorado.redCusto.nível1 :
                                                    powerUpSelecionado === "powerUpNv2" ? edMelhorado.redCusto.nível2 :
                                                        edMelhorado.redCusto.nível3;

                                                powerUpSelecionado === "powerUpNv1" ? edMelhorado.aumFatu.nível1 :
                                                    powerUpSelecionado === "powerUpNv2" ? edMelhorado.aumFatu.nível2 :
                                                        edMelhorado.aumFatu.nível3;

                                                // atualizarDadosProf2([setorAtivo, "edificios", index, "powerUp","aumFatuAtual"],ResultFinalAcumuladorRedCusto)
                                                // console.log(index)
                                                // console.log(setorAtivo)

                                            }

                                            const descobrirSetor = (nomeEdificio) => {
                                                return mapaEdificioParaSetor[nomeEdificio] || null;
                                            }






                                            const corPowerUpAtual = corPowerUp(powerUpSelecionado);
                                            const corColunaAtual = corPadrão // Definição da variável antes de usá-la

                                            const corColuna = corColunaAtual === corPowerUpAtual ? corPowerUpAtual : corPadrão;
                                            const corLinha = qtdMelhorado > 0 ? corPowerUpAtual : corPadrão;

                                            const lineStyle = { background: corLinha }
                                            // const bgColuna1 = powerUpSelecionado === "powerUpNv1" ? corPowerUp("powerUpNv1"):  powerUpSelecionado === "powerUpNv2" ? corPowerUp("powerUpNv2") : corPowerUp("powerUpNv3");
                                            const bgColuna1 = corLinha === "#8F5ADA" ? corPowerUp("powerUpNv1") : powerUpSelecionado === "powerUpNv2" ? corPowerUp("powerUpNv2") : powerUpSelecionado === "powerUpNv3" ? corPowerUp("powerUpNv3") : corPadrão

                                            const bgColuna2 = powerUpSelecionado === "powerUpNv1" ? corPadrão : powerUpSelecionado === "powerUpNv2" ? corPowerUp("powerUpNv2") : corPowerUp("powerUpNv3");

                                            const bgColuna3 = powerUpSelecionado === "powerUpNv1" ? corPadrão : powerUpSelecionado === "powerUpNv2" ? corPadrão : corPowerUp("powerUpNv3");
                                            const columnStyleNv1 = { backgroundColor: bgColuna1 };
                                            const columnStyleNv2 = { backgroundColor: bgColuna2 };
                                            const columnStyleNv3 = { backgroundColor: bgColuna3 };


                                            quantidadeAtivo(edMelhorado.nome)
                                            // console.log(quantidadeAtivo(edMelhorado.nome))
                                            return (
                                                <tbody key={i} className="rounded-[2px]">
                                                    <tr style={{ backgroundColor: setorInfo.cor4, borderColor: setorInfo.cor2 }} className="mt-[20px] border-[1px] rounded-[2px] ">
                                                        <td style={lineStyle} className="text-white pl-[5px]">
                                                            {edMelhorado.nome}
                                                        </td>
                                                        <td style={{ ...columnStyleNv1, borderColor: setorInfo.cor2 }} className="text-center text-white border-[1px] border-white">{edMelhorado.redCusto.nível1}</td>
                                                        <td style={{ ...columnStyleNv2, borderColor: setorInfo.cor2 }} className="text-center text-white border-[1px] border-white">{edMelhorado.redCusto.nível2}</td>
                                                        <td style={{ ...columnStyleNv3, borderColor: setorInfo.cor2 }} className="text-center text-white border-[1px] border-white">{edMelhorado.redCusto.nível3}</td>
                                                        <td style={lineStyle} className="text-white pl-[5px]">{edMelhorado.nome}</td>
                                                        <td style={{ ...columnStyleNv1, borderColor: setorInfo.cor2 }} className="text-center text-white border-[1px] border-white">{edMelhorado.aumFatu.nível1}</td>
                                                        <td style={{ ...columnStyleNv2, borderColor: setorInfo.cor2 }} className="text-center text-white border-[1px] border-white">{edMelhorado.aumFatu.nível2}</td>
                                                        <td style={{ ...columnStyleNv3, borderColor: setorInfo.cor2 }} className="text-center text-white border-[1px] border-white">{edMelhorado.aumFatu.nível3}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        })}
                                    </table>
                                </div>
                                <div className="flex w-full h-[10%]">
                                    <div className="flex w-full justify-evenly">
                                        <div style={{ backgroundColor: setorInfo.cor2 }} className="flex w-[49%] rounded-[10px] items-end text-white self-center justify-center fonteBold text-[20px]">
                                            Redução total: {acumuladorPowerUpRedCustoFornece}%
                                        </div>
                                        <div style={{ backgroundColor: setorInfo.cor2 }} className="flex w-[49%] rounded-[10px] items-end text-white self-center justify-center fonteBold text-[20px]">
                                            Aumento total: {acumuladorPowerUpAumFatuFornece}%
                                        </div>
                                    </div>
                                </div>
                            </div>






                            <div className="w-[49%] h-full flex flex-col items-center justify-between">
                                <div style={{ backgroundColor: setorInfo.cor2 }} className="w-full h-[15%] bg-white fonteBold text-white mt-[10px] pl-[10px] rounded-[10px] text-[40px]">
                                    Recebe</div>
                                <div className="w-full h-[70%] overflow-y-auto">
                                    <table className="w-full mt-[10px]">
                                        <thead>
                                            <tr>
                                                <th style={{ backgroundColor: setorInfo.cor3 }} className="text-white rounded-[10px]">Red. custo</th>
                                                <th>
                                                    <div className="bg-[#8F5ADA] w-[20%] h-[40px] w-[40px] m-auto aspect-square rounded-[7px] flex items-center justify-center cursor-pointer">
                                                        <img className="h-[70%] aspect-square rotate-[270deg]" src={PróximoImg} />
                                                    </div>
                                                </th>
                                                <th>
                                                    <div className="bg-[#6411D9] w-[20%] h-[40px] w-[40px] m-auto aspect-square rounded-[7px] flex items-center justify-center cursor-pointer">
                                                        <img className="h-[70%] aspect-square rotate-[270deg]" src={PróximoImg} />
                                                    </div>
                                                </th>
                                                <th>
                                                    <div className="bg-[#350973] w-[20%] h-[40px] w-[40px] m-auto aspect-square rounded-[7px] flex items-center justify-center cursor-pointer">
                                                        <img className="h-[70%] aspect-square rotate-[270deg]" src={PróximoImg} />
                                                    </div>
                                                </th>
                                                <th style={{ backgroundColor: setorInfo.cor3 }} className="text-white rounded-[10px]">Aumento fatu</th>
                                                <th>
                                                    <div className="bg-[#8F5ADA] w-[20%] h-[40px] w-[40px] m-auto aspect-square rounded-[7px] flex items-center justify-center cursor-pointer">
                                                        <img className="h-[70%] aspect-square rotate-[270deg]" src={PróximoImg} />
                                                    </div>
                                                </th>
                                                <th>
                                                    <div className="bg-[#6411D9] w-[20%] h-[40px] w-[40px] m-auto aspect-square rounded-[7px] flex items-center justify-center cursor-pointer">
                                                        <img className="h-[70%] aspect-square rotate-[270deg]" src={PróximoImg} />
                                                    </div>
                                                </th>
                                                <th>
                                                    <div className="bg-[#350973] w-[20%] h-[40px] w-[40px] m-auto aspect-square rounded-[7px] flex items-center justify-center cursor-pointer">
                                                        <img className="h-[70%] aspect-square rotate-[270deg]" src={PróximoImg} />
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        {baseSetor.edificios[index].RecebeMelhoraEficiencia.map((edMelhorado, i) => {

                                            let setorEncontrado = null;

                                            let indice = -1
                                            const quantidadeAtivo = (nomeEd) => {
                                                for (const setor of setoresArr) {
                                                    setorEncontrado = setor;
                                                    indice = dados[setorEncontrado].edificios.findIndex(ed => ed.nome === nomeEd);
                                                    if (indice !== -1) {
                                                        return dados[setor].edificios[indice].quantidade;
                                                    }
                                                }
                                                return 0
                                            }

                                            const qtdMelhorado = quantidadeAtivo(edMelhorado.nome);

                                            const qtd = quantidadeAtivo(baseSetor.edificios[index].nome);

                                            const powerUpSelecionado =
                                                qtd >= quantidadeMinimaPowerUpNv3
                                                    ? "powerUpNv3"
                                                    : qtd >= quantidadeMinimaPowerUpNv2
                                                        ? "powerUpNv2"
                                                        : "powerUpNv1";

                                            if (qtdMelhorado > 0) {

                                                powerUpSelecionado === "powerUpNv1" ? edMelhorado.redCusto.nível1 :
                                                    powerUpSelecionado === "powerUpNv2" ? edMelhorado.redCusto.nível2 :
                                                        edMelhorado.redCusto.nível3;



                                                powerUpSelecionado === "powerUpNv1" ? edMelhorado.aumFatu.nível1 :
                                                    powerUpSelecionado === "powerUpNv2" ? edMelhorado.aumFatu.nível2 :
                                                        edMelhorado.aumFatu.nível3;


                                            }
                                            const corPowerUpAtual = corPowerUp(powerUpSelecionado);
                                            const corColunaAtual = corPadrão // Definição da variável antes de usá-la

                                            const corColuna = corColunaAtual === corPowerUpAtual ? corPowerUpAtual : corPadrão;
                                            const corLinha = qtdMelhorado > 0 ? corPowerUpAtual : corPadrão;

                                            const lineStyle = { background: corLinha }
                                            // const bgColuna1 = powerUpSelecionado === "powerUpNv1" ? corPowerUp("powerUpNv1"):  powerUpSelecionado === "powerUpNv2" ? corPowerUp("powerUpNv2") : corPowerUp("powerUpNv3");
                                            const bgColuna1 = corLinha === "#8F5ADA" ? corPowerUp("powerUpNv1") : powerUpSelecionado === "powerUpNv2" ? corPowerUp("powerUpNv2") : powerUpSelecionado === "powerUpNv3" ? corPowerUp("powerUpNv3") : corPadrão

                                            const bgColuna2 = powerUpSelecionado === "powerUpNv1" ? corPadrão : powerUpSelecionado === "powerUpNv2" ? corPowerUp("powerUpNv2") : corPowerUp("powerUpNv3");

                                            const bgColuna3 = powerUpSelecionado === "powerUpNv1" ? corPadrão : powerUpSelecionado === "powerUpNv2" ? corPadrão : corPowerUp("powerUpNv3");
                                            const columnStyleNv1 = { backgroundColor: bgColuna1 };
                                            const columnStyleNv2 = { backgroundColor: bgColuna2 };
                                            const columnStyleNv3 = { backgroundColor: bgColuna3 };


                                            quantidadeAtivo(edMelhorado.nome)
                                            // console.log(quantidadeAtivo(edMelhorado.nome))
                                            return (
                                                <tbody key={i} className="rounded-[2px]">
                                                    <tr style={{ backgroundColor: setorInfo.cor4, borderColor: setorInfo.cor2 }} className="mt-[20px] border-[1px] rounded-[2px] ">
                                                        <td style={lineStyle} className="text-white pl-[5px]">
                                                            {edMelhorado.nome}
                                                        </td>
                                                        <td style={{ ...columnStyleNv1, borderColor: setorInfo.cor2 }} className="text-center text-white border-[1px] border-white">{edMelhorado.redCusto.nível1}</td>
                                                        <td style={{ ...columnStyleNv2, borderColor: setorInfo.cor2 }} className="text-center text-white border-[1px] border-white">{edMelhorado.redCusto.nível2}</td>
                                                        <td style={{ ...columnStyleNv3, borderColor: setorInfo.cor2 }} className="text-center text-white border-[1px] border-white">{edMelhorado.redCusto.nível3}</td>
                                                        <td style={lineStyle} className="text-white pl-[5px]">{edMelhorado.nome}</td>
                                                        <td style={{ ...columnStyleNv1, borderColor: setorInfo.cor2 }} className="text-center text-white border-[1px] border-white">{edMelhorado.aumFatu.nível1}</td>
                                                        <td style={{ ...columnStyleNv2, borderColor: setorInfo.cor2 }} className="text-center text-white border-[1px] border-white">{edMelhorado.aumFatu.nível2}</td>
                                                        <td style={{ ...columnStyleNv3, borderColor: setorInfo.cor2 }} className="text-center text-white border-[1px] border-white">{edMelhorado.aumFatu.nível3}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        })}
                                    </table>
                                </div>
                                <div className="flex w-full h-[10%]">
                                    <div className="flex w-full justify-evenly">
                                        <div style={{ backgroundColor: setorInfo.cor2 }} className="flex w-[49%] rounded-[10px] items-end text-white self-center justify-center fonteBold text-[20px]">

                                            Redução total: {acumuladorPowerUpRedCustoRecebe}%
                                        </div>
                                        <div style={{ backgroundColor: setorInfo.cor2 }} className="flex w-[49%] rounded-[10px] items-end text-white self-center justify-center fonteBold text-[20px]">
                                            Aumento total: {acumuladorPowerUpAumFatuRecebe}%</div>
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
                background: `linear-gradient(135deg, ${setorInfo.cor2} 0%,${setorInfo.cor3} 35%,${setorInfo.cor1} 100%)`
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
                    transformStyle: "preserve-3d"
                }}
            >

                {/* Frente do Card */}




                {baseSetor.edificios[index].licençaLiberado.liberado === false && (
                    <motion.div
                        style={{
                            background: `transparent`, // fundo transparente para o container principal
                        }}
                        className="w-[215px] h-[230px] rounded-[20px] flex flex-col justify-center items-center shadow-lg perspective z-10 cursor-pointer absolute"
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
                            className="relative flex justify-center items-center w-full h-full z-10"
                            animate={{ rotateY: flipped ? 180 : 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            style={{
                                transformStyle: "preserve-3d",
                            }}
                        >
                            <div
                                style={{ backgroundColor: setorInfo.cor1 }}
                                className="h-[40%] flex justify-center items-center aspect-square rounded-[20px] relative z-10"
                            >
                                <div
                                    style={{ backgroundColor: setorInfo.cor3 }}
                                    className="flex items-center justify-center h-[95%] aspect-square rounded-[20px] absolute z-10"
                                >
                                    <div
                                        style={{ backgroundColor: setorInfo.cor1 }}
                                        className="flex items-center justify-center h-[95%] aspect-square rounded-[20px] absolute z-10"
                                    >
                                        <div
                                            style={{ backgroundColor: setorInfo.cor2 }}
                                            className="flex items-center justify-center h-[95%] aspect-square rounded-[30px] absolute z-10"
                                        >
                                            <div
                                                style={{
                                                    background: `linear-gradient(135deg, ${setorInfo.cor1} 0%, ${setorInfo.cor4} 100%)`,
                                                }}
                                                className="flex items-center justify-center h-[95%] aspect-square rounded-[60px] absolute z-10 relative"
                                            >
                                                <img
                                                    className="h-[70%] aspect-square absolute"
                                                    src={getImageUrl(baseSetor.edificios[index].licençaLiberado.licença)}
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
                        <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full h-[35%] rounded-[10px] flex justify-between drop-shadow-xs">
                            <div style={{ background: `linear-gradient(135deg, ${setorInfo.cor3} 0%,${setorInfo.cor1} 100%)` }} className="h-[100%] aspect-square rounded-[10px] flex items-center justify-center">
                                <img className="h-[70%]" src={getImageUrl(baseSetor.edificios[index].nome)} alt="" />
                            </div>

                            <div className="flex p-[10px] justify-center">
                                <h1 className="text-white fonteBold text-[12px]">{baseSetor.edificios[index].nome}</h1>
                            </div>
                        </div>
                        {/* <div className="h-[05%] w-full flex justify-around flex-col  items-center drop-shadow-xs">
                            <h2 className="text-[10px] text-white">teste vamos continuar asdkfasdjfçlajsdçf slkdçfjasçdlfj saldkjf sdkj lkjasd çaksjd</h2>
                        </div> */}
                        <div className="h-[25%] w-full flex justify-around flex-col  items-center drop-shadow-xs">
                            <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full flex items-center justify-center rounded-[10px] p-[5px] gap-[5px] h-full">
                                <div className="w-[100%] rounded-[20px] flex justify-around items-center h-full ">
                                    <div style={{ backgroundColor: setorInfo.cor3 }} onClick={() => { handleShow('lojasNec'), handleFlip() }}
                                        // onMouseLeave={handleHide}
                                        className=" hover:scale-[1.20] ease-in-out cursor-pointer h-[80%] aspect-square rounded-[8px] flex items-center justify-center relative">
                                        <img className="h-[70%] aspect-square" src={terrenoImg} alt="" />

                                        {verificadorDeLojasNecessárias === false &&
                                            <div className="absolute bottom-[-2px] right-[-2px]">
                                                <span className="relative flex size-2">
                                                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#FFFFFF] opacity-75"></span>
                                                    <span className="relative inline-flex size-2 rounded-full bg-[#FFFFFF]"></span>
                                                </span>
                                            </div>
                                        }
                                    </div>
                                    <div style={{ backgroundColor: setorInfo.cor3 }} className="h-[80%] aspect-square rounded-[8px] flex items-center justify-center relative hover:scale-[1.20] duration-300 ease-in-out delay-[0.1s] cursor-pointer">
                                        <img className="h-[70%] aspect-square" src={constNece} onClick={() => { handleMouseEnter(), handleShow('constNece'), handleFlip() }}
                                            alt="" />
                                        <div className="absolute bottom-[-2px] right-[-2px]">
                                            {verificadorDeConstruçõesNecessárias === true &&
                                                <span className="relative flex size-2">
                                                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#FFFFFF] opacity-75"></span>
                                                    <span className="relative inline-flex size-2 rounded-full bg-[#FFFFFF]"></span>
                                                </span>
                                            }
                                        </div>
                                    </div>
                                    <div className="w-[35%] h-full aspect-square flex justify-between items-center">
                                        <div
                                            onClick={() => { handleMouseEnter(), handleShow('powerUp') }}
                                            className="w-full h-[80%] flex justify-center items-center drop-shadow-2xl">
                                            <div className="h-full w-full aspect-square flex justify-center items-center">
                                                <div style={{ backgroundColor: setorInfo.cor3 }} className="flex justify-center items-center w-full h-full rounded-[10px] "> {/* Adicionei o `relative` aqui */}
                                                    <div style={{ background: `linear-gradient(135deg,${setorInfo.cor4} 0%, ${corPowerUpAtual} 50%,${setorInfo.cor1} 100%)` }} onClick={() => handleFlip()} className="h-full aspect-square rounded-[10px] flex items-center justify-center hover:scale-[1.20] duration-300 ease-in-out delay-[0.1s] cursor-pointer">
                                                        <img className="h-[70%] aspect-square rotate-[270deg]" src={PróximoImg} />
                                                    </div>
                                                    <div className="flex justify-center items-center w-full">
                                                        <h2 className="text-white text-[15px] fonteBold">{baseSetor.edificios[index].quantidade}
                                                        </h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="flex  justify-between items-center h-[15%] w-full">
                            <div className="w-full flex h-full flex justify-between items-center">
                                <div className="w-[55%] h-[80%] rounded-[5px] ">
                                    <div style={{ backgroundColor: setorInfo.cor3 }} className=" rounded-[10px] flex items-center justify-between  h-full">
                                        <div className="flex items-center justify-center h-full drop-shadow-2xl">
                                            <img src={DolarImg} className="h-[60%] ml-[2px] " />
                                            <h1 className=" text-white fonteBold text-[13px] ml-2">{formatarNumero(valorFatuFinal)}</h1>
                                        </div>
                                        <div className="flex items-center justify-center h-full">
                                            <h1 className="text-white font-bold mr-2 text-[15px]">{rentabilidade.toFixed(0)}</h1>
                                            <img src={porcem} alt="porcentagem" className="h-[45%] mr-[5px]" />
                                        </div>
                                    </div>
                                </div>
                                <div style={{ backgroundColor: setorInfo.cor3 }} className=" w-[40%] h-[80%] flex items-center justify-around rounded-[5px]">
                                    <img src={ConstuirImg} className="h-[60%] aspect-square ml-[5px]" />
                                    <h1 className="text-white fonteBold text-[15px] ml-2">{formatarNumero(baseSetor.edificios[index].custoConstrucao)}</h1>
                                </div>
                            </div >

                        </div>

                        <div className="flex items-center justify-center w-[90%] h-[10%] drop-shadow-md">
                            <button onClick={comprarCard}
                                style={{
                                    "--cor4": setorInfo.cor4,
                                    "--cor1": setorInfo.cor1,
                                }}
                                className={`bg-gradient-to-br to-[#6411D9] from-[#6411D9] rounded-[20px] w-full fonteBold text-white hover:scale-[1.10] hover:to-[--cor1] hover:via-[#6411D9] hover:from-[--cor4] duration-300 ease-in-out cursor-pointer`}
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
                <div className={`absolute w-full h-full flex items-center justify-center rounded-[20px] text-white transform cursor-pointer rotate-y-180 ${flipped ? "pointer-events-auto z-50" : "pointer-events-none"}`}
                    style={{
                        transform: "rotateY(180deg)", backfaceVisibility: "hidden",
                        background: `linear-gradient(135deg, ${setorInfo.cor2} 0%,${setorInfo.cor3} 35%,${setorInfo.cor1} 100%)`
                    }}
                >
                    {/* {visibleId === "constNece" && isModalOpen === true &&
                        (
                            <div className="w-[90%] h-[90%] flex items-center flex-col justify-around self-center">

                            </div>
                        )
                    } */}
                    {visibleId === "constNece" && isModalOpen === true &&
                        (
                            <div onClick={() => handleFlip()} className="w-[90%] h-[90%] flex items-center flex-col justify-between self-center ">
                                <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full h-[20%] rounded-[10px] flex justify-between drop-shadow-xs
">
                                    <div style={{ background: `linear-gradient(135deg, ${setorInfo.cor3} 0%,${setorInfo.cor1} 100%)` }} className="h-[100%] aspect-square rounded-[10px] flex items-center justify-center">
                                        <img className="h-[70%]" src={constNece} alt="" />
                                    </div>

                                    <div className="flex p-[10px] justify-center items-center">
                                        <h1 className="text-white fonteBold text-[12px]">Construções necessárias</h1>
                                    </div>
                                </div>

                                <div className="h-[35%] w-full flex flex-col items-center justify-center drop-shadow-xs ">
                                    <div style={{ background: `linear-gradient(135deg, ${setorInfo.cor3} 0%,${setorInfo.cor4} 100%)` }} className="h-full flex flex-col w-full items-center justify-around rounded-[10px]">
                                        <div className="h-[20%] w-[90%] flex flex-col justify-center  ">
                                            <h1 className=" text-white text-[11px] text-start fonteBold">Recursos de Construção</h1>
                                        </div>
                                        <div style={{ backgroundColor: setorInfo.cor2 }} className=" flex items-center justify-around h-[65%] w-[90%]  z-[20] rounded-[10px]">

                                            <div className="flex justify-start ml-[5px] gap-[5px] items-center h-full w-full">
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
                                                        <img className="h-[70%] aspect-square" src={getImageUrl(nomeEdificio)} alt={nomeEdificio} />
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
                                    <div style={{ background: `linear-gradient(135deg, ${setorInfo.cor3} 0%,${setorInfo.cor4} 100%)` }} className="h-full flex flex-col w-full items-center justify-around rounded-[10px]">
                                        <div className="h-[20%] w-[90%] flex flex-col justify-center  ">
                                            <h1 className=" text-white text-[11px] text-start fonteBold">Construções necessárias</h1>
                                        </div>
                                        <div style={{ backgroundColor: setorInfo.cor2 }} className=" flex items-center justify-around h-[65%] w-[90%]  z-[20] rounded-[10px]">

                                            <div className="flex justify-start ml-[5px] gap-[5px] items-center h-full w-full">
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
                                                        <img className="h-[70%] aspect-square" src={getImageUrl(nomeEdificio)} alt={nomeEdificio} />
                                                        <div className="absolute bottom-[-2px] right-[-2px]">
                                                            {
                                                                booleanPreReq(nomeEdificio) === false &&
                                                                <span className="relative flex size-2">
                                                                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#FFFFFF] opacity-75"></span>
                                                                    <span className="relative inline-flex size-2 rounded-full bg-[#FFFFFF]"></span>
                                                                </span>
                                                            }
                                                        </div>
                                                    </div>


                                                ))}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {visibleId === 'lojasNec' && isModalOpen === true &&
                        (
                            <div onClick={() => handleFlip()} className="w-[90%] h-[90%] flex items-center flex-col justify-between self-center">
                                <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full h-[20%] rounded-[10px] flex justify-between ">
                                    <div style={{ background: `linear-gradient(135deg, ${setorInfo.cor3} 0%,${setorInfo.cor1} 100%)` }} className="h-[100%] aspect-square rounded-[10px] flex items-center justify-center">
                                        <img className="h-[70%]" src={constNece} alt="" />
                                    </div>

                                    <div className="flex p-[10px] justify-center items-center">
                                        <h1 className="text-white fonteBold text-[12px]">Lojas necessárias</h1>
                                    </div>
                                </div>

                                <div className=" flex items-center justify-around w-full h-[70%]  rounded-[10px] flex-col">
                                    <div className="w-full h-[22%] flex justify-around items-center ">
                                        <div className="h-full w-full aspect-square flex justify-around items-center ">
                                            <div style={{ backgroundColor: setorInfo.cor1 }} className="w-[15%] h-full flex items-center justify-center aspect-square bg-white rounded-[10px] relative">
                                                <img className="h-[70%]" src={terrenoImg} alt="" />

                                            </div>
                                            <div style={{ backgroundColor: setorInfo.cor2 }} className="flex justify-around items-center w-[35%] h-full rounded-[5px] "> {/* Adicionei o `relative` aqui */}
                                                <h2 style={{ backgroundColor: setorInfo.cor2 }} className="text-white text-center text-[15px] w-full fonteBold rounded-[5px]">{baseSetor.edificios[index].lojasNecessarias.terrenos}</h2>
                                                <div style={{ backgroundColor: setorInfo.cor4 }} className="flex justify-center items-center h-full w-full rounded-[5px]">
                                                    <h2 className="text-white text-[15px] fonteBold">{dados.terrenos.quantidade}</h2>
                                                </div>
                                            </div>

                                            <div style={{ backgroundColor: setorInfo.cor2 }} className="flex justify-center rounded-[10px] items-center h-full w-[40%]">
                                                <h2 style={{ backgroundColor: setorInfo.cor2 }} className="text-white text-[15px] fonteBold"> {formatarNumero(contabilidadeDeFalta("terrenos"))}</h2>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="w-full h-[22%] flex justify-around items-center ">
                                        <div className="h-full w-full aspect-square flex justify-around items-center ">
                                            <div style={{ backgroundColor: setorInfo.cor1 }} className="w-[15%] h-full flex items-center justify-center aspect-square bg-white rounded-[10px] relative">
                                                <img className="h-[70%]" src={LojaPImg} alt="" />

                                            </div>
                                            <div style={{ backgroundColor: setorInfo.cor2 }} className="flex justify-around items-center w-[35%] h-full rounded-[5px] "> {/* Adicionei o `relative` aqui */}
                                                <h2 style={{ backgroundColor: setorInfo.cor2 }} className="text-white text-center text-[15px] w-full fonteBold rounded-[5px]">{baseSetor.edificios[index].lojasNecessarias.lojasP}</h2>
                                                <div style={{ backgroundColor: setorInfo.cor4 }} className="flex justify-center items-center h-full w-full rounded-[5px]">
                                                    <h2 className="text-white text-[15px] fonteBold">{dados.lojasP.quantidade}</h2>
                                                </div>
                                            </div>

                                            <div style={{ backgroundColor: setorInfo.cor2 }} className="flex justify-center rounded-[10px] items-center h-full w-[40%]">
                                                <h2 style={{ backgroundColor: setorInfo.cor2 }} className="text-white text-[15px] fonteBold">{formatarNumero(contabilidadeDeFalta("lojasP"))}</h2>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="w-full h-[22%] flex justify-around items-center ">
                                        <div className="h-full w-full aspect-square flex justify-around items-center ">
                                            <div style={{ backgroundColor: setorInfo.cor1 }} className="w-[15%] h-full flex items-center justify-center aspect-square bg-white rounded-[10px] relative">
                                                <img className="h-[70%]" src={LojaMImg} alt="" />

                                            </div>
                                            <div style={{ backgroundColor: setorInfo.cor2 }} className="flex justify-around items-center w-[35%] h-full rounded-[5px] "> {/* Adicionei o `relative` aqui */}
                                                <h2 style={{ backgroundColor: setorInfo.cor2 }} className="text-white text-center text-[15px] w-full fonteBold rounded-[5px]">{baseSetor.edificios[index].lojasNecessarias.lojasM}</h2>
                                                <div style={{ backgroundColor: setorInfo.cor4 }} className="flex justify-center items-center h-full w-full rounded-[5px]">
                                                    <h2 className="text-white text-[15px] fonteBold">{dados.lojasM.quantidade}</h2>
                                                </div>
                                            </div>

                                            <div style={{ backgroundColor: setorInfo.cor2 }} className="flex justify-center rounded-[10px] items-center h-full w-[40%]">
                                                <h2 style={{ backgroundColor: setorInfo.cor }} className="text-white text-[15px] fonteBold"> {formatarNumero(contabilidadeDeFalta("lojasM"))}</h2>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="w-full h-[22%] flex justify-around items-center ">
                                        <div className="h-full w-full aspect-square flex justify-around items-center ">
                                            <div style={{ backgroundColor: setorInfo.cor1 }} className="w-[15%] h-full flex items-center justify-center aspect-square bg-white rounded-[10px] relative">
                                                <img className="h-[70%]" src={LojaGImg} alt="" />

                                            </div>
                                            <div style={{ backgroundColor: setorInfo.cor2 }} className="flex justify-around items-center w-[35%] h-full rounded-[5px] "> {/* Adicionei o `relative` aqui */}
                                                <h2 style={{ backgroundColor: setorInfo.cor2 }} className="text-white text-center text-[15px] w-full fonteBold rounded-[5px]">{baseSetor.edificios[index].lojasNecessarias.lojasG}</h2>
                                                <div style={{ backgroundColor: setorInfo.cor4 }} className="flex justify-center items-center h-full w-full rounded-[5px]">
                                                    <h2 className="text-white text-[15px] fonteBold">{dados.lojasG.quantidade}</h2>
                                                </div>
                                            </div>

                                            <div style={{ backgroundColor: setorInfo.cor2 }} className="flex justify-center rounded-[10px] items-center h-full w-[40%]">
                                                <h2 style={{ backgroundColor: setorInfo.cor2 }} className="text-white text-[15px] fonteBold"> {formatarNumero(contabilidadeDeFalta("lojasG"))}</h2>
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

                        )
                    }
                    {visibleId === "licenca" && isModalOpen === true &&
                        (
                            <div onClick={() => handleFlip()} className="w-[90%] h-[90%] flex items-center flex-col justify-between self-center">
                                <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full h-[15%] rounded-[10px] flex justify-between ">
                                    <div style={{ background: `linear-gradient(135deg, ${setorInfo.cor3} 0%,${setorInfo.cor1} 100%)` }} className="h-[100%] aspect-square rounded-[10px] flex items-center justify-center">
                                        <img className="h-[70%]" src={licença} alt="" />
                                    </div>

                                    <div className="flex p-[10px] justify-center items-center">
                                        <h1 className="text-white fonteBold text-[12px]">Licenças Necessárias</h1>
                                    </div>
                                </div>
                                <div className="h-[75%] w-full"></div>
                                <LicenseNec />
                            </div>
                        )
                    }
                    {visibleId === 'powerUp' && isModalOpen === true &&
                        (
                            <div onClick={() => handleFlip()} className="w-[90%] h-[90%] flex items-center flex-col justify-around self-center">
                                <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full h-[20%] rounded-[10px] flex justify-between ">
                                    <div style={{ background: `linear-gradient(135deg,${setorInfo.cor4} 0%,${corPowerUpAtual} 30%, #350973 70%,${setorInfo.cor1} 100%)` }} className="h-[100%] aspect-square rounded-[10px] flex items-center justify-center">
                                        <img className="h-[70%] rotate-[270deg]" src={PróximoImg} alt="" />
                                    </div>

                                    <div className="flex p-[10px] justify-center items-center">
                                        <h1 className="text-white fonteBold text-[12px]">Power Ups</h1>
                                    </div>
                                </div>
                                <div className="h-[20%] w-full flex justify-between flex-col items-center">

                                    <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full flex items-center justify-center rounded-[10px] p-[5px] h-full">

                                        <div className="w-[100%] rounded-[20px] flex justify-around items-center  h-full">
                                            <div style={{ backgroundColor: setorInfo.cor2 }} className="flex justify-around items-center w-[30%] h-full rounded-[10px] p-[2px]"> {/* Adicionei o `relative` aqui */}
                                                <div className="bg-[#8F5ADA] w-[50%] h-full w-[80%] aspect-square rounded-[7px] flex items-center justify-center hover:scale-[1.20] duration-300 ease-in-out delay-[0.1s] cursor-pointer">
                                                    <img className="h-[70%] aspect-square rotate-[270deg]" src={PróximoImg} />
                                                </div>
                                                <div className="flex justify-center items-center w-full">
                                                    <h2 className="text-white text-[10px] fonteBold">{baseSetor.edificios[index].powerUp.nível1.quantidadeMínima}
                                                    </h2>
                                                </div>
                                            </div>
                                            <div style={{ backgroundColor: setorInfo.cor2 }} className="flex justify-around items-center w-[30%] h-full rounded-[10px] p-[2px]"> {/* Adicionei o `relative` aqui */}
                                                <div className="bg-[#6411D9] w-[50%] h-full w-[80%] aspect-square rounded-[7px] flex items-center justify-center hover:scale-[1.20] duration-300 ease-in-out delay-[0.1s] cursor-pointer">
                                                    <img className="h-[70%] aspect-square rotate-[270deg]" src={PróximoImg} />
                                                </div>
                                                <div className="flex justify-center items-center h-full w-full">
                                                    <h2 className="text-white text-[10px]  fonteBold">{baseSetor.edificios[index].powerUp.nível2.quantidadeMínima}
                                                    </h2>
                                                </div>
                                            </div>
                                            <div style={{ backgroundColor: setorInfo.cor2 }} className="flex justify-around items-center w-[30%] h-full rounded-[10px] p-[2px]"> {/* Adicionei o `relative` aqui */}
                                                <div className="bg-[#350973] w-[50%] h-full w-[80%] aspect-square rounded-[7px] flex items-center justify-center hover:scale-[1.20] duration-300 ease-in-out delay-[0.1s] cursor-pointer">
                                                    <img className="h-[70%] aspect-square rotate-[270deg]" src={PróximoImg} />
                                                </div>
                                                <div className="flex justify-center items-center w-full">
                                                    <h2 className="text-white text-[10px] fonteBold">{baseSetor.edificios[index].powerUp.nível3.quantidadeMínima}
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div style={{ backgroundColor: setorInfo.cor2 }} className="h-[50%] w-full rounded-[10px] flex flex-col items-center justify-around">
                                    <p className="text-white text-[10px] h-[65%] p-[5px]">Dara power up principalemente
                                        em industria alimenticia e rações. </p>
                                    <button onClick={openModalPowerUps} className=" w-[85%] h-[25%] z-50 text-white text-[10px] bg-[#6411D9] rounded-[10px] hover:scale-[1.10] duration-300 ease-in-out">Todos power ups</button>
                                </div>
                            </div>)

                    }
                </div>



            </motion.div>
        </motion.div>

    )

}

