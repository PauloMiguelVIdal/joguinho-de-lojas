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
//nome [setorAtivo].edificios[nome]


export const CardLocalization = ({ index, setor,abrirModalSell }) => {
    const { economiaSetores, setEconomiaSetores, } = useContext(DadosEconomyGlobalContext);
    const { dados, atualizarDados } = useContext(CentraldeDadosContext);
    const setorAtivo = setor;
    const setorAtualContext = dados.setorAtivo;


    const setores = [
        { id: "agricultura", cor3: "#0C9123", corClasse: "bg-[#4CAF50]", img: agricultura, descLicença: "Com a Licença Global de Agricultura, você terá acesso a cultivos exclusivos, otimização de produções e melhorias que aumentarão sua rentabilidade. Liberte o potencial do setor agrícola agora mesmo!", cor1: "#003816", cor2: "#1A5E2A", cor3: "#0C9123", cor4: "#4CAF50", },
        { id: "tecnologia", cor3: "#FF6F00 ", corClasse: "bg-[#FF8C42]", img: tecnologia, descLicença: "Com a Licença Global de Tecnologia, você desbloqueia inovações que podem transformar sua infraestrutura, otimizar processos e maximizar os lucros. Invista no futuro agora!", cor1: "#A64B00 ", cor2: "#D45A00 ", cor3: "#FF6F00 ", cor4: "#FF8C42 ", },
        { id: "industria", cor3: "#808080  ", corClasse: "bg-[#B3B3B3]", img: industria, descLicença: "Com a Licença Global de Indústria, você acessa fábricas avançadas e processos de produção que aceleram sua evolução e aumentam a eficiência. Não fique para trás!", cor1: "#1A1A1A ", cor2: "#4D4D4D  ", cor3: "#808080  ", cor4: "#B3B3B3  ", },
        { id: "comercio", cor3: "#E60000  ", corClasse: "bg-[#FF4D4D]", img: comercio, descLicença: "Com a Licença Global de Comércio, você tem acesso a novos mercados, estratégias de vendas e expansão que podem levar seus negócios a um novo nível. Não perca essa oportunidade!", cor1: "#660000  ", cor2: "#A31919  ", cor3: "#E60000  ", cor4: "#FF4D4D  ", },
        { id: "imobiliario", cor3: "#3333CC  ", corClasse: "bg-[#6666FF]", img: imobiliario, descLicença: "Com a Licença Global Imobiliária, você pode investir em novos terrenos, expandir suas construções e maximizar os retornos do mercado imobiliário. Abra as portas para grandes lucros!", cor1: "#000066  ", cor2: "#1A1A8C  ", cor3: "#3333CC  ", cor4: "#6666FF  " },
        { id: "energia", cor3: "#E6B800", corClasse: "bg-[#FFD966]", img: energia, descLicença: "Com a Licença Global de Energia, você ativa fontes de energia sustentáveis e de alta performance, garantindo uma operação eficiente e lucrativa. Potencialize seu setor energético agora!", cor1: "#665200   ", cor2: "#A37F19   ", cor3: "#E6B800", cor4: "#FFD966" },
        { id: "grafico", cor3: "#FF6F00 ", corClasse: "bg-[#6A00FF]", img: grafico, cor1: "#6A00FF ", cor2: "#6A00FF ", cor3: "#6A00FF ", cor4: "#6A00FF ", },
    ];


    const [isModalOpen, setIsModalOpen] = useState(true);
    const [visibleId, setVisibleId] = useState('lojasNec');
    const [modalPowerup, setModalPowerUp] = useState(false)
  

    const contabilidadeDeFalta = (edificio) => {
        const qtdAtual = dados[edificio].quantidade
        const qtdNecessaria = dados[setorAtivo].edificios[index].lojasNecessarias[edificio]

        const qtdFalta = qtdAtual >= qtdNecessaria ? 0 : qtdNecessaria - qtdAtual;
        const custoTotalConst = edificio === "terrenos" ? dados[edificio].preçoConstrução : edificio === "lojasP" ? dados[edificio].preçoConstrução + dados.terrenos.preçoConstrução : edificio === "lojasM" ? dados[edificio].preçoConstrução + 2 * dados.terrenos.preçoConstrução : edificio === "lojasG" ? dados[edificio].preçoConstrução + 3 * dados.terrenos.preçoConstrução : "lascou"
        const edificioSuficiente = edificio === "terrenos" ? "terrenosSuficientes" : edificio === "lojasP" ? "lojasPSuficientes" : edificio === "lojasM" ? "lojasMSuficientes" : edificio === "lojasG" ? "lojasGSuficientes" : "lascou"

        return qtdFalta * custoTotalConst

    }

    const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];


    useEffect(() => {
        const edificio = "lojasP";
        const qtdAtual = dados[edificio]?.quantidade;
        const qtdNecessaria = dados[setorAtivo]?.edificios?.[index]?.lojasNecessarias?.[edificio];

        const edificioSuficiente =
            edificio === "terrenos" ? "terrenosSuficientes" :
                edificio === "lojasP" ? "lojasPSuficientes" :
                    edificio === "lojasM" ? "lojasMSuficientes" :
                        edificio === "lojasG" ? "lojasGSuficientes" :
                            "lascou";

        if (qtdAtual >= qtdNecessaria) {
            const novoEdificio = {
                ...dados[setorAtivo].edificios[index],
                lojasNecessarias: {
                    ...dados[setorAtivo].edificios[index].lojasNecessarias,
                    [edificioSuficiente]: true
                }
            };

            const novaLista = [...dados[setorAtivo].edificios];
            novaLista[index] = novoEdificio;

            atualizarDados({
                ...dados,
                [setorAtivo]: {
                    ...dados[setorAtivo],
                    edificios: novaLista
                }
            });
        }

    }, [dados.dia]);



    const formatarNumero = (num) => {
        if (num >= 1e12) return (num / 1e12).toFixed(1).replace('.0', '') + 'T'; // Trilhões
        if (num >= 1e9) return (num / 1e9).toFixed(1).replace('.0', '') + 'B';   // Bilhões
        if (num >= 1e6) return (num / 1e6).toFixed(1).replace('.0', '') + 'M';   // Milhões
        if (num >= 1e3) return (num / 1e3).toFixed(1).replace('.0', '') + 'K';   // Milhares
        return num.toString();
    };

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







    const handleShow = (id) => setVisibleId(id);
    const handleHide = () => setVisibleId(null);

    const powerUps = [
        { nivel1: "qtd", cor: "#8F5ADA", },
        { nivel2: "qtd", cor: "#6411D9", },
        { nivel3: "qtd", cor: "#350973", },
    ];
    const [caixaTexto, setCaixaTexto] = useState(false)

    const setorInfo = setores.find(setor => setor.id === setorAtivo);
    const nomeAtivo = dados[setorAtivo]?.edificios[index]?.nome;
    const arrayConstResources = dados[setorAtivo]?.edificios[index]?.recursoDeConstrução
    const arrayConstNece = dados[setorAtivo]?.edificios[index]?.construçõesNecessárias


    console.log("Setor Ativo:", setorAtivo);
    console.log("Edifícios:", dados[setorAtivo]?.edificios);

    // Verificar o índice
    console.log("Índice:", index);
    console.log("Edifício:", dados[setorAtivo]?.edificios[index]);

    // Verificar o nome

    console.log("Nome do Edifício Ativo:", nomeAtivo);
    const quantidadeAtivo = dados[setorAtivo].edificios[index].quantidade;
    const quantidadeMinimaPowerUpNv2 = dados[setorAtivo].edificios[index].powerUp.nível2.quantidadeMínima;
    const quantidadeMinimaPowerUpNv3 = dados[setorAtivo].edificios[index].powerUp.nível3.quantidadeMínima;
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
    const [verificadorDeLojasNecessárias, setVerificador] = useState(false)
    const [verificadorDeConstruçõesNecessárias, setVerificadorConstr] = useState(true);

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


    useEffect(() => {
        const quantidadeTerrenos = dados[setorAtivo].edificios[index].lojasNecessarias.terrenos
        const quantidadeLojasP = dados[setorAtivo].edificios[index].lojasNecessarias.lojasP
        const quantidadeLojasM = dados[setorAtivo].edificios[index].lojasNecessarias.lojasM
        const quantidadeLojasG = dados[setorAtivo].edificios[index].lojasNecessarias.lojasG
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





    const powerUpSelecionado =
        quantidadeAtivo >= quantidadeMinimaPowerUpNv3
            ? "powerUpNv3"
            : quantidadeAtivo >= quantidadeMinimaPowerUpNv2
                ? "powerUpNv2"
                : "powerUpNv1";


    const corPowerUpAtual = corPowerUp(powerUpSelecionado);
    const corColunaAtual = corPadrão // Definição da variável antes de usá-la

    const corColuna = corColunaAtual === corPowerUpAtual ? corPowerUpAtual : corPadrão;
    const corLinha = quantidadeAtivo > 0 ? corPowerUpAtual : corPadrão;

    const lineStyle = { background: corLinha }
    // const bgColuna1 = powerUpSelecionado === "powerUpNv1" ? corPowerUp("powerUpNv1"):  powerUpSelecionado === "powerUpNv2" ? corPowerUp("powerUpNv2") : corPowerUp("powerUpNv3");
    const bgColuna1 = corLinha === "#8F5ADA" ? corPowerUp("powerUpNv1") : powerUpSelecionado === "powerUpNv2" ? corPowerUp("powerUpNv2") : powerUpSelecionado === "powerUpNv3" ? corPowerUp("powerUpNv3") : corPadrão

    const bgColuna2 = powerUpSelecionado === "powerUpNv1" ? corPadrão : powerUpSelecionado === "powerUpNv2" ? corPowerUp("powerUpNv2") : corPowerUp("powerUpNv3");

    const bgColuna3 = powerUpSelecionado === "powerUpNv1" ? corPadrão : powerUpSelecionado === "powerUpNv2" ? corPadrão : corPowerUp("powerUpNv3");
    const columnStyleNv1 = { backgroundColor: bgColuna1 };
    const columnStyleNv2 = { backgroundColor: bgColuna2 };
    const columnStyleNv3 = { backgroundColor: bgColuna3 };
    // const columnStyleNv1 =  { backgroundColor: bgColuna };


    // const columnStyleNv2 = { backgroundColor: "#6411D9" };
    // const columnStyleNv3 = { backgroundColor: "#350973" };
    // if(temAtivo){

    // } else{
    //     corLinha:
    // }







    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();

        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;

        setRotateX(y * 30);
        setRotateY(x * 30);
    };

    const resetRotation = () => {
        setRotateX(0);
        setRotateY(0);
    };

    const [flipped, setFlipped] = useState(false);

    const handleFlip = () => {
        setFlipped(!flipped);
    };

const getImageUrl = (nomeArquivo) => `/imagens/${nomeArquivo}.png`;

    const quantidadeTerrenosNec = dados[setorAtivo].edificios[index].lojasNecessarias.terrenos
    const quantidadeLojasPNec = dados[setorAtivo].edificios[index].lojasNecessarias.lojasP
    const quantidadeLojasMNec = dados[setorAtivo].edificios[index].lojasNecessarias.lojasM
    const quantidadeLojasGNec = dados[setorAtivo].edificios[index].lojasNecessarias.lojasG


    const custoTotalTerrenos = quantidadeTerrenosNec * dados.terrenos.preçoConstrução
    const custoTotalLojasP = quantidadeLojasPNec * (dados.lojasP.preçoConstrução + (dados.terrenos.preçoConstrução * dados.lojasP.quantidadeNecTerreno))
    const custoTotalLojasM = quantidadeLojasMNec * (dados.lojasM.preçoConstrução + (dados.terrenos.preçoConstrução * dados.lojasM.quantidadeNecTerreno))
    const custoTotalLojasG = quantidadeLojasGNec * (dados.lojasG.preçoConstrução + (dados.terrenos.preçoConstrução * dados.lojasG.quantidadeNecTerreno))
    const CustoTotalSomadoLojas = custoTotalTerrenos + custoTotalLojasP + custoTotalLojasM + custoTotalLojasG


    const [acumuladorPowerUpRedCustoFornece, setAcumuladorPowerUpRedCustoFornece] = useState(0);
    const [acumuladorPowerUpAumFatuFornece, setAcumuladorPowerUpAumFatuFornece] = useState(0);
    const [acumuladorPowerUpRedCustoRecebe, setAcumuladorPowerUpRedCustoRecebe] = useState(0);
    const [acumuladorPowerUpAumFatuRecebe, setAcumuladorPowerUpAumFatuRecebe] = useState(0);
    console.log("acumuladorPowerUpRedCustoRecebe", acumuladorPowerUpRedCustoRecebe)
    console.log("acumuladorPowerUpAumFatuRecebe", acumuladorPowerUpAumFatuRecebe)
    console.log("acumuladorPowerUpRedCustoFornece", acumuladorPowerUpRedCustoFornece)
    console.log("acumuladorPowerUpAumFatuFornece", acumuladorPowerUpAumFatuFornece)
    // Aqui sim, fazemos o cálculo num useEffect:
    useEffect(() => {
        let novoAcumuladorRedCusto = 0;
        let novoAcumuladorAumFatu = 0;

        dados[setorAtivo].edificios[index].ForneceMelhoraEficiencia.forEach((edMelhorado) => {
            let setorEncontrado = null;
            let indice = -1;
            const quantidadeAtivo = (nomeEd) => {
                for (const setor of setoresArr) {
                    setorEncontrado = setor;
                    indice = dados[setorEncontrado].edificios.findIndex(ed => ed.nome === nomeEd);
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
                    powerUpSelecionado === "powerUpNv1" ? edMelhorado.redCusto.nível1 :
                        powerUpSelecionado === "powerUpNv2" ? edMelhorado.redCusto.nível2 :
                            edMelhorado.redCusto.nível3;

                novoAcumuladorRedCusto += ValorpowerUpAtualRedCustoFornece;

                const ValorpowerUpAtualAumFatuFornece =
                    powerUpSelecionado === "powerUpNv1" ? edMelhorado.aumFatu.nível1 :
                        powerUpSelecionado === "powerUpNv2" ? edMelhorado.aumFatu.nível2 :
                            edMelhorado.aumFatu.nível3;

                novoAcumuladorAumFatu += ValorpowerUpAtualAumFatuFornece;
            }
        });

        setAcumuladorPowerUpRedCustoFornece(novoAcumuladorRedCusto);
        setAcumuladorPowerUpAumFatuFornece(novoAcumuladorAumFatu);
    }, [dados, setorAtivo, index, setoresArr, quantidadeMinimaPowerUpNv2, quantidadeMinimaPowerUpNv3]);


    useEffect(() => {
        let novoAcumuladorRedCusto = 0;
        let novoAcumuladorAumFatu = 0;

        dados[setorAtivo].edificios[index].RecebeMelhoraEficiencia.forEach((edMelhorado) => {
            let setorEncontrado = null;
            let indice = -1;
            const quantidadeAtivo = (nomeEd) => {
                for (const setor of setoresArr) {
                    setorEncontrado = setor;
                    indice = dados[setorEncontrado].edificios.findIndex(ed => ed.nome === nomeEd);
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
                    powerUpSelecionado === "powerUpNv1" ? edMelhorado.redCusto.nível1 :
                        powerUpSelecionado === "powerUpNv2" ? edMelhorado.redCusto.nível2 :
                            edMelhorado.redCusto.nível3;

                novoAcumuladorRedCusto += ValorpowerUpAtualRedCustoFornece;

                const ValorpowerUpAtualAumFatuFornece =
                    powerUpSelecionado === "powerUpNv1" ? edMelhorado.aumFatu.nível1 :
                        powerUpSelecionado === "powerUpNv2" ? edMelhorado.aumFatu.nível2 :
                            edMelhorado.aumFatu.nível3;

                novoAcumuladorAumFatu += ValorpowerUpAtualAumFatuFornece;
            }
        });

        setAcumuladorPowerUpRedCustoRecebe(novoAcumuladorRedCusto);
        setAcumuladorPowerUpAumFatuRecebe(novoAcumuladorAumFatu);
        // console.log(acumuladorPowerUpAumFatuRecebe)
        // console.log(acumuladorPowerUpRedCustoRecebe)

    }, [dados, setorAtivo, index, setoresArr, quantidadeMinimaPowerUpNv2, quantidadeMinimaPowerUpNv3]);
    const economiaSetor = economiaSetores[setor]?.economiaSetor?.estadoAtual || "estável";
    const fatorEconomico = {
        "recessão": 0.4,
        "declinio": 0.8,
        "estável": 1,
        "progressiva": 1.1,
        "aquecida": 1.25,
    }[economiaSetor];

    const valorFatu = dados[setorAtivo].edificios[index].finanças.faturamentoUnitário
    const valorImpostoFixo = dados[setorAtivo].edificios[index].finanças.impostoFixo
    const impostoSobreFatu = dados[setorAtivo].edificios[index].finanças.impostoSobreFatu
    const custoConstrução = dados[setorAtivo].edificios[index].custoConstrucao;

    const impostoSobreFatuFinal = impostoSobreFatu - (impostoSobreFatu * (acumuladorPowerUpRedCustoRecebe / 100))
    const valorFatuFinal = ((valorFatu + (valorFatu * (acumuladorPowerUpAumFatuRecebe / 100)))
        // * valorEconomiaSetor
    )
    const valorImpostoFixoFinal = valorImpostoFixo - (valorImpostoFixo * (acumuladorPowerUpRedCustoRecebe / 100))

    let custoRecursos = 0;

    // Função recursiva para calcular custo total de um recurso
    function calcularCustoRecurso(nomeRecurso, nivel = 1) {
        console.log("🔍".repeat(nivel), `Verificando recurso: ${nomeRecurso}`);

        for (const setor of setoresArr) {
            const edificioEncontrado = dados[setor]?.edificios?.find(e => e.nome === nomeRecurso);

            if (edificioEncontrado) {
                console.log("✅".repeat(nivel), `Edifício encontrado: ${edificioEncontrado.nome}, no setor: ${setor}`);

                const custoConstrucaoRecurso = edificioEncontrado.custoConstrucao || 0;
                console.log("🏗️".repeat(nivel), `Custo da construção: ${custoConstrucaoRecurso}`);

                const quantidadeTerrenosNec = edificioEncontrado.lojasNecessarias.terrenos || 0;
                const quantidadeLojasPNec = edificioEncontrado.lojasNecessarias.lojasP || 0;
                const quantidadeLojasMNec = edificioEncontrado.lojasNecessarias.lojasM || 0;
                const quantidadeLojasGNec = edificioEncontrado.lojasNecessarias.lojasG || 0;

                console.log("📦".repeat(nivel), `Lojas necessárias → Terrenos: ${quantidadeTerrenosNec}, P: ${quantidadeLojasPNec}, M: ${quantidadeLojasMNec}, G: ${quantidadeLojasGNec}`);

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

                console.log("💰".repeat(nivel), `Custo total → Terrenos: ${custoTotalTerrenos}, LojasP: ${custoTotalLojasP}, LojasM: ${custoTotalLojasM}, LojasG: ${custoTotalLojasG}`);

                // Soma do próprio custo de construção + lojas
                let custoTotalRecurso = custoConstrucaoRecurso + custoTotalTerrenos + custoTotalLojasP + custoTotalLojasM + custoTotalLojasG;

                // Recursão para os recursos de construção desse edifício
                if (Array.isArray(edificioEncontrado.recursoDeConstrução) && edificioEncontrado.recursoDeConstrução.length > 0) {
                    console.log("🔁".repeat(nivel), `Iniciando cálculo de recursos de construção para: ${edificioEncontrado.nome}`);

                    edificioEncontrado.recursoDeConstrução.forEach(subRecurso => {
                        const custoSub = calcularCustoRecurso(subRecurso, nivel + 1);
                        console.log("➕".repeat(nivel), `Adicionando custo do sub-recurso ${subRecurso}: ${custoSub}`);
                        custoTotalRecurso += custoSub;
                    });
                } else {
                    console.log("✅".repeat(nivel), `${edificioEncontrado.nome} não possui recursos adicionais.`);
                }

                console.log("📊".repeat(nivel), `Custo total calculado de ${nomeRecurso} = ${custoTotalRecurso}`);

                return custoTotalRecurso; // retorna o total desse recurso
            }
        }

        console.warn("⚠️".repeat(nivel), `Recurso não encontrado: ${nomeRecurso}`);
        return 0; // Caso não encontrado
    }

    // Início do cálculo principal com a lista original
    arrayConstResources?.forEach(nomeRecurso => {
        const custo = calcularCustoRecurso(nomeRecurso);
        console.log("💼 Custo acumulado do recurso", nomeRecurso, "=", custo);
        custoRecursos += custo;
    });

    console.log("🔚 Custo total acumulado de todos os recursos:", custoRecursos);


    let fatuMensal = valorFatuFinal * 30 * fatorEconomico
    let valorImpostoSobreFatu = fatuMensal * impostoSobreFatuFinal
    // console.log("custoRecursos", custoRecursos)
    // console.log("custo de lojas", CustoTotalSomadoLojas)
    // console.log("custo de construção", custoConstrução)
    // console.log("custo total", custoRecursos + CustoTotalSomadoLojas + custoConstrução)

    const valorFinalMês = (((fatuMensal) - (valorImpostoSobreFatu)) - valorImpostoFixoFinal)
    const rentabilidade = (valorFinalMês / (CustoTotalSomadoLojas + custoRecursos + custoConstrução)) * 100





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
                        {dados[setorAtivo].edificios[index].nome}
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

                                        {dados[setorAtivo].edificios[index].ForneceMelhoraEficiencia.map((edMelhorado, i) => {

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

                                            const qtd = quantidadeAtivo(dados[setorAtivo].edificios[index].nome);

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
                                                console.log(index)
                                                console.log(setorAtivo)

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
                                            console.log(quantidadeAtivo(edMelhorado.nome))
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
                                        {dados[setorAtivo].edificios[index].RecebeMelhoraEficiencia.map((edMelhorado, i) => {

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

                                            const qtd = quantidadeAtivo(dados[setorAtivo].edificios[index].nome);

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
                                            console.log(quantidadeAtivo(edMelhorado.nome))
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
            onMouseMove={handleMouseMove}
            onMouseLeave={resetRotation}
            // onClick={handleFlip} // Flip ao clicar
            style={{
                background: `linear-gradient(135deg, ${setorInfo.cor2} 0%,${setorInfo.cor3} 35%,${setorInfo.cor1} 100%)`
            }}
            className="w-[215px] h-[230px] bg-white rounded-[20px] flex flex-col justify-center items-center shadow-lg perspective"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            animate={{ rotateX, rotateY }}
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






                {dados[setorAtivo].edificios[index].licençaLiberado.liberado === false && (
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
                                                    src={getImageUrl(dados[setorAtivo].edificios[index].licençaLiberado.licença)}
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
                        <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full h-[25%] rounded-[10px] flex justify-between drop-shadow-xs">
                            <div style={{ background: `linear-gradient(135deg, ${setorInfo.cor3} 0%,${setorInfo.cor1} 100%)` }} className="h-[100%] aspect-square rounded-[10px] flex items-center justify-center">
                                <img className="h-[70%]" src={getImageUrl(dados[setorAtivo].edificios[index].nome)} alt="" />
                            </div>

                            <div className="flex p-[10px] justify-center">
                                <h1 className="text-white fonteBold text-[12px]">{dados[setorAtivo].edificios[index].nome}</h1>
                            </div>
                        </div>
                        <div className="h-[35%] w-full flex justify-around flex-col  items-center drop-shadow-xs">
                            <h2 style={{ color: setorInfo.cor1 }} className="text-[12px] fonteBold text-[#003816]">{dados[setorAtivo].edificios[index].desc}</h2>
                        </div>

                        {setorAtualContext !== "carteira" && <div className="h-[25%] w-full flex justify-around flex-col  items-center drop-shadow-xs">

                            <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full flex items-center justify-center rounded-[10px] p-[5px] gap-[5px] h-full">

                                <div className="w-[100%] rounded-[20px] flex justify-around items-center h-full ">
                                    <div style={{ backgroundColor: setorInfo.cor3 }} onClick={() => { handleShow('lojasNec'), handleFlip() }}
                                        // onMouseLeave={handleHide}
                                        className=" hover:scale-[1.20] ease-in-out cursor-pointer h-[80%] aspect-square rounded-[8px] flex items-center justify-center relative">
                                        <img className="h-[70%] aspect-square" src={terrenoImg} alt="" />

                                        {verificadorDeLojasNecessárias === true &&
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
                                                        <h2 className="text-white text-[15px] fonteBold">{dados[setorAtivo].edificios[index].quantidade}
                                                        </h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        }
                        <div className="flex  justify-between items-center h-[15%] w-full">
                            <div className="w-full flex h-full flex justify-between items-center">
                                <div className="w-[55%] h-[80%] rounded-[5px] ">
                                    <div style={{ backgroundColor: setorInfo.cor3 }} className=" rounded-[10px] flex items-center justify-between  h-full">
                                        <div className="flex items-center justify-center h-full drop-shadow-2xl">
                                            <img src={DolarImg} className="h-[60%] ml-[2px] " />
                                            <h1 className=" text-white fonteBold text-[15px] ml-2">{formatarNumero(dados[setorAtivo].edificios[index].finanças.faturamentoUnitário)}</h1>
                                        </div>
                                        <div className="flex items-center justify-center h-full">
                                            <h1 className="text-white font-bold mr-2 text-[15px]">{rentabilidade.toFixed(0)}</h1>
                                            <img src={porcem} alt="porcentagem" className="h-[45%] mr-[5px]" />
                                        </div>
                                    </div>
                                </div>
                                <div style={{ backgroundColor: setorInfo.cor3 }} className=" w-[40%] h-[80%] flex items-center justify-around rounded-[5px]">
                                    <img src={ConstuirImg} className="h-[60%] aspect-square ml-[5px]" />
                                    <h1 className="text-white fonteBold text-[15px] ml-2">{formatarNumero(dados[setorAtivo].edificios[index].custoConstrucao)}</h1>
                                </div>
                            </div >

                        </div>
                        {setorAtualContext === "carteira" && <div className="h-[25%] w-full flex justify-around flex-col  items-center drop-shadow-xs">

                            <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full flex items-center justify-center rounded-[10px] p-[5px] gap-[5px] h-full">

                                <div className="w-[100%] rounded-[20px] flex justify-around items-center h-full ">

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
                                                        <h2 className="text-white text-[15px] fonteBold">{dados[setorAtivo].edificios[index].quantidade}
                                                        </h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => abrirModalSell(setor , index)}
                                        style={{
                                            "--cor4": setorInfo.cor4,
                                            "--cor1": setorInfo.cor1,
                                        }}
                                        className={`bg-gradient-to-br to-[#6411D9] from-[#6411D9] rounded-[12px] h-[80%] w-[60%] fonteBold text-white hover:scale-[1.10] hover:to-[--cor1] hover:via-[#6411D9] hover:from-[--cor4] duration-300 ease-in-out cursor-pointer`}
                                    >
                                        Vender
                                    </button>
                                </div>

                            </div>
                        </div>

                        }

                        {/* <div className="flex items-center justify-center w-[90%] h-[10%] drop-shadow-md">
                            <button
                                // onClick={comprarCard}
                                style={{
                                    "--cor4": setorInfo.cor4,
                                    "--cor1": setorInfo.cor1,
                                }}
                                className={`bg-gradient-to-br to-[#6411D9] from-[#6411D9] rounded-[20px] w-[50%] fonteBold text-white hover:scale-[1.10] hover:to-[--cor1] hover:via-[#6411D9] hover:from-[--cor4] duration-300 ease-in-out cursor-pointer`}
                            >
                                Vender
                            </button>
                        </div> */}

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
                                            <h1 className=" text-white text-[11px] text-start fonteBold">Construções pré-requisito</h1>
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
                                                <h2 style={{ backgroundColor: setorInfo.cor2 }} className="text-white text-center text-[15px] w-full fonteBold rounded-[5px]">{dados[setorAtivo].edificios[index].lojasNecessarias.terrenos}</h2>
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
                                                <h2 style={{ backgroundColor: setorInfo.cor2 }} className="text-white text-center text-[15px] w-full fonteBold rounded-[5px]">{dados[setorAtivo].edificios[index].lojasNecessarias.lojasP}</h2>
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
                                                <h2 style={{ backgroundColor: setorInfo.cor2 }} className="text-white text-center text-[15px] w-full fonteBold rounded-[5px]">{dados[setorAtivo].edificios[index].lojasNecessarias.lojasM}</h2>
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
                                                <h2 style={{ backgroundColor: setorInfo.cor2 }} className="text-white text-center text-[15px] w-full fonteBold rounded-[5px]">{dados[setorAtivo].edificios[index].lojasNecessarias.lojasG}</h2>
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
                                                    <h2 className="text-white text-[10px] fonteBold">{dados[setorAtivo].edificios[index].powerUp.nível1.quantidadeMínima}
                                                    </h2>
                                                </div>
                                            </div>
                                            <div style={{ backgroundColor: setorInfo.cor2 }} className="flex justify-around items-center w-[30%] h-full rounded-[10px] p-[2px]"> {/* Adicionei o `relative` aqui */}
                                                <div className="bg-[#6411D9] w-[50%] h-full w-[80%] aspect-square rounded-[7px] flex items-center justify-center hover:scale-[1.20] duration-300 ease-in-out delay-[0.1s] cursor-pointer">
                                                    <img className="h-[70%] aspect-square rotate-[270deg]" src={PróximoImg} />
                                                </div>
                                                <div className="flex justify-center items-center h-full w-full">
                                                    <h2 className="text-white text-[10px]  fonteBold">{dados[setorAtivo].edificios[index].powerUp.nível2.quantidadeMínima}
                                                    </h2>
                                                </div>
                                            </div>
                                            <div style={{ backgroundColor: setorInfo.cor2 }} className="flex justify-around items-center w-[30%] h-full rounded-[10px] p-[2px]"> {/* Adicionei o `relative` aqui */}
                                                <div className="bg-[#350973] w-[50%] h-full w-[80%] aspect-square rounded-[7px] flex items-center justify-center hover:scale-[1.20] duration-300 ease-in-out delay-[0.1s] cursor-pointer">
                                                    <img className="h-[70%] aspect-square rotate-[270deg]" src={PróximoImg} />
                                                </div>
                                                <div className="flex justify-center items-center w-full">
                                                    <h2 className="text-white text-[10px] fonteBold">{dados[setorAtivo].edificios[index].powerUp.nível3.quantidadeMínima}
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div style={{ backgroundColor: setorInfo.cor2 }} className="h-[50%] w-full rounded-[10px] flex flex-col items-center justify-around">
                                    <p className="text-white text-[10px] h-[65%] p-[5px]">{dados[setorAtivo].edificios[index].desc}</p>
                                    <button onClick={openModalPowerUps} className=" w-[85%] h-[25%] z-50 text-white text-[10px] bg-[#6411D9] rounded-[10px] hover:scale-[1.10] duration-300 ease-in-out">Todos power ups</button>
                                </div>
                            </div>)

                    }
                </div>



            </motion.div>
        </motion.div>

    )

}

