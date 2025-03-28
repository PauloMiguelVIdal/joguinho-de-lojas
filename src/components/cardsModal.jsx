import React from "react";
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
import ResourcesConstruction from "./ResourcesConstruction";
import LicenseNec from "./licenseNec";
import fechar from "../imagens/fechar.png"
import plantação from "../../public/imagens/Plantação De Grãos.png"
//nome [setorAtivo].edificios[nome]


export default function CardModal() {

    const { dados, AtualizarDados } = useContext(CentraldeDadosContext);


    const setores = [
        { id: "agricultura", cor3: "#0C9123", corClasse: "bg-[#4CAF50]", img: agricultura, descLicença: "Com a Licença Global de Agricultura, você terá acesso a cultivos exclusivos, otimização de produções e melhorias que aumentarão sua rentabilidade. Liberte o potencial do setor agrícola agora mesmo!", cor1: "#003816", cor2: "#1A5E2A", cor3: "#0C9123", cor4: "#4CAF50", },
        { id: "tecnologia", cor3: "#FF6F00 ", corClasse: "bg-[#FF8C42]", img: tecnologia, descLicença: "Com a Licença Global de Tecnologia, você desbloqueia inovações que podem transformar sua infraestrutura, otimizar processos e maximizar os lucros. Invista no futuro agora!", cor1: "#A64B00 ", cor2: "#D45A00 ", cor3: "#FF6F00 ", cor4: "#FF8C42 ", },
        { id: "industria", cor3: "#808080  ", corClasse: "bg-[#B3B3B3]", img: industria, descLicença: "Com a Licença Global de Indústria, você acessa fábricas avançadas e processos de produção que aceleram sua evolução e aumentam a eficiência. Não fique para trás!", cor1: "#1A1A1A ", cor2: "#4D4D4D  ", cor3: "#808080  ", cor4: "#B3B3B3  ", },
        { id: "comercio", cor3: "#E60000  ", corClasse: "bg-[#FF4D4D]", img: comercio, descLicença: "Com a Licença Global de Comércio, você tem acesso a novos mercados, estratégias de vendas e expansão que podem levar seus negócios a um novo nível. Não perca essa oportunidade!", cor1: "#660000  ", cor2: "#A31919  ", cor3: "#E60000  ", cor4: "#FF4D4D  ", },
        { id: "imobiliario", cor3: "#3333CC  ", corClasse: "bg-[#6666FF]", img: imobiliario, descLicença: "Com a Licença Global Imobiliária, você pode investir em novos terrenos, expandir suas construções e maximizar os retornos do mercado imobiliário. Abra as portas para grandes lucros!", cor1: "#000066  ", cor2: "#1A1A8C  ", cor3: "#3333CC  ", cor4: "#6666FF  " },
        { id: "energia", cor3: "#E6B800", corClasse: "bg-[#FFD966]", img: energia, descLicença: "Com a Licença Global de Energia, você ativa fontes de energia sustentáveis e de alta performance, garantindo uma operação eficiente e lucrativa. Potencialize seu setor energético agora!", cor1: "#665200   ", cor2: "#A37F19   ", cor3: "#E6B800", cor4: "#FFD966" },
        { id: "grafico", cor3: "#FF6F00 ", corClasse: "bg-[#6A00FF]", img: grafico, cor1: "#6A00FF ", cor2: "#6A00FF ", cor3: "#6A00FF ", cor4: "#6A00FF ", },
    ];


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visibleId, setVisibleId] = useState('powerUp');
    const [modalPowerup, setModalPowerUp] = useState(true)




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
        }, 800);
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

    const setorAtivo = dados.setorAtivo;
    const setorInfo = setores.find(setor => setor.id === setorAtivo);

    const columnStyleNv1 = { backgroundColor: "#8F5ADA" };
    const columnStyleNv2 = { backgroundColor: "#6411D9" };
    const columnStyleNv3 = { backgroundColor: "#350973" };

    const corPadrão = { backgroundColor: setorInfo.cor2 };

    const quantidadeAtivo = dados[setorAtivo].edificios[0].quantidade;
    const quantidadeMinimaPowerUpNv2 = dados[setorAtivo].edificios[0].powerUp.nível2.quantidadeMínima;
    const quantidadeMinimaPowerUpNv3 = dados[setorAtivo].edificios[0].powerUp.nível3.quantidadeMínima;

    const powerUpSelecionado =
        quantidadeAtivo > quantidadeMinimaPowerUpNv3
            ? "powerUpNv3"
            : quantidadeAtivo > quantidadeMinimaPowerUpNv2
                ? "powerUpNv2"
                : "powerUpNv1";

    const corPowerUp = powerUp => {
        switch (powerUp) {
            case "powerUpNv1":
                return "#8F5ADA";
            case "powerUpNv2":
                return "#6411D9";
            case "powerUpNv3":
                return "#350973";
            default:
                return corPadrão.backgroundColor;
        }
    };

    const corPowerUpAtual = corPowerUp(powerUpSelecionado);
    const corColunaAtual = corPadrão.backgroundColor; // Definição da variável antes de usá-la

    const corColuna = corColunaAtual === corPowerUpAtual ? corPowerUpAtual : corPadrão.backgroundColor;
    const corLinha = quantidadeAtivo > 0 ? corPowerUpAtual : corPadrão.backgroundColor;

    const lineStyle = { background: corLinha }

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
                    <div style={{ backgroundColor: setorInfo.cor1 }} className="w-[95%] h-[15%] rounded-[20px] self-center">

                    </div >


                    <div style={{ backgroundColor: setorInfo.cor2 }} className="w-[95%] h-[75%] rounded-[20px] self-center">
                        <div style={{ backgroundColor: setorInfo.cor1 }} className="flex justify-around h-full w-full">
                            <div style={{ backgroundColor: setorInfo.cor3 }} className="w-[45%] h-[95%] flex justiy-around flex-col items-center">
                                <div className="w-full h-[15%] bg-white">Fornece</div>
                                <div className="w-full flex justify-around">
                                    <table className="w-full mt-[10px]">
                                        <thead>
                                            <tr>
                                                <th style={{ backgroundColor: setorInfo.cor1 }} className="text-white rounded-[10px]">Red. custo</th>
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
                                                <th style={{ backgroundColor: setorInfo.cor1 }} className="text-white rounded-[10px]">Aumento fatu</th>
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
                                        <tbody className="rounded-[2px]">
                                            <tr style={{ backgroundColor: setorInfo.cor4 }} className="pt-[20px] border-[1px] rounded-[2px] border-white">
                                                <td style={lineStyle} className="text-white pl-[5px]">Ana</td>
                                                <td style={{ ...lineStyle, ...columnStyleNv1 }} className="text-center text-white border-[1px] border-white">25</td>
                                                <td style={{ ...lineStyle, ...columnStyleNv2 }} className="text-center text-white border-[1px] border-white">12</td>
                                                <td style={{ ...lineStyle, ...columnStyleNv3 }} className="text-center text-white border-[1px] border-white">12</td>
                                                <td style={lineStyle} className="text-white pl-[5px]">Ana</td>
                                                <td style={{ ...lineStyle, ...columnStyleNv1 }} className="text-center text-white border-[1px] border-white">25</td>
                                                <td style={{ ...lineStyle, ...columnStyleNv2 }} className="text-center text-white border-[1px] border-white">12</td>
                                                <td style={{ ...lineStyle, ...columnStyleNv3 }} className="text-center text-white border-[1px] border-white">12</td>
                                            </tr>
                                            <tr style={{ backgroundColor: setorInfo.cor4 }} className="pt-[20px] border-[1px] rounded-[2px] border-white">
                                                <td style={lineStyle} className="text-white pl-[5px]">Ana</td>
                                                <td style={{ ...lineStyle, ...columnStyleNv1 }} className="text-center text-white border-[1px] border-white">25</td>
                                                <td style={{ ...lineStyle, ...columnStyleNv2 }} className="text-center text-white border-[1px] border-white">12</td>
                                                <td style={{ ...lineStyle, ...columnStyleNv3 }} className="text-center text-white border-[1px] border-white">12</td>
                                                <td style={lineStyle} className="text-white pl-[5px]">Ana</td>
                                                <td style={{ ...lineStyle, ...columnStyleNv1 }} className="text-center text-white border-[1px] border-white">25</td>
                                                <td style={{ ...lineStyle, ...columnStyleNv2 }} className="text-center text-white border-[1px] border-white">12</td>
                                                <td style={{ ...lineStyle, ...columnStyleNv3 }} className="text-center text-white border-[1px] border-white">12</td>
                                            </tr>
                                            <tr style={{ backgroundColor: setorInfo.cor4 }} className="pt-[20px] border-[1px] rounded-[2px] border-white">
                                                <td style={lineStyle} className="text-white pl-[5px]">Ana</td>
                                                <td style={{ ...lineStyle, ...columnStyleNv1 }} className="text-center text-white border-[1px] border-white">25</td>
                                                <td style={{ ...lineStyle, ...columnStyleNv2 }} className="text-center text-white border-[1px] border-white">12</td>
                                                <td style={{ ...lineStyle, ...columnStyleNv3 }} className="text-center text-white border-[1px] border-white">12</td>
                                                <td style={lineStyle} className="text-white pl-[5px]">Ana</td>
                                                <td style={{ ...lineStyle, ...columnStyleNv1 }} className="text-center text-white border-[1px] border-white">25</td>
                                                <td style={{ ...lineStyle, ...columnStyleNv2 }} className="text-center text-white border-[1px] border-white">12</td>
                                                <td style={{ ...lineStyle, ...columnStyleNv3 }} className="text-center text-white border-[1px] border-white">12</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div style={{ backgroundColor: setorInfo.cor3 }} className="w-[45%] h-[95%]">3</div>
                        </div>
                    </div>



                </motion.div>
            </div>
        );
    }





    if (isModalOpen && visibleId === 'constNece') {
        return (
   
            <div className="absolute w-full h-full flex items-center justify-center rounded-xl"
            style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}>
                <div style={{ backgroundColor: setorInfo.cor1 }} className="w-[90%] h-[28%] rounded-[20px] p-[10px] flex justify-around items-center gap-[2px] ml-[2px]">
                    <div style={{ backgroundColor: setorInfo.cor3 }} className="h-[100%] aspect-square rounded-[10px] flex items-center justify-center">
                        <img className="h-[70%]" src={constNece} alt="" />
                    </div>
                    <div className="flex  p-[5px]">
                        <h1 className="text-white fonteBold text-[12px]">Construções necessárias</h1>
                    </div>
                </div>
                <div className="h-[27%] flex flex-col items-center justify-center">
                    <div className="h-[35%] w-[90%] flex flex-col justify-center  ">
                        <h1 className="FonteBold text-white text-[11px] text-start">Recursos de Construção</h1>
                    </div>
                    <div style={{ backgroundColor: setorInfo.cor3 }} className=" flex items-center justify-around h-[65%] w-[90%]  z-[20] rounded-[10px]">
                        <ResourcesConstruction />
                    </div>
                </div>
                <div className="h-[27%] flex flex-col items-center justify-center">
                    <div className="h-[35%] w-[90%] flex flex-col  justify-center">
                        <h1 className="FonteBold text-white text-[11px] text-start">Construções pré-requisito</h1>
                    </div>
                    <div style={{ backgroundColor: setorInfo.cor3 }} className=" flex items-center justify-around h-[65%] w-[90%]  z-[20] rounded-[10px]">
                        <SelectorImage />
                    </div>
                </div>



            </div>)
    } else if (isModalOpen && visibleId === 'powerUp') {
        return (
            <div
                style={{ background: `linear-gradient(135deg, ${setorInfo.cor3} 0%, #350973 70%, #000000 100%)` }} onMouseLeave={handleMouseLeaveFinal} className="w-[22%] w-min-[275px] h-min-[260px] h-[40%] bg-white rounded-[20px] flex flex-col justify-around items-center hover:scale-[1.20] duration-700 ease-in-out delay-[0.3s]" >
                <div style={{ backgroundColor: setorInfo.cor1 }} className="w-[90%] h-[28%] rounded-[20px] p-[10px] flex justify-between items-center gap-[2px] ml-[2px]">
                    <div style={{ backgroundColor: setorInfo.cor3 }} className="h-[100%] aspect-square rounded-[10px] flex items-center justify-center">
                        <img className="h-[70%] rotate-[270deg]" src={PróximoImg} alt="" />
                    </div>
                    <div className="flex  p-[5px] justify-center items-center">
                        <h1 className="text-white fonteBold text-[12px]">Power Up</h1>
                    </div>
                </div>
                <div style={{ backgroundColor: setorInfo.cor3 }} className=" flex items-center justify-between h-[20%] w-[90%] p-[4px] z-[20] rounded-[10px]">
                    <div className="h-full w-full aspect-square flex justify-center items-center gap-[3px]">
                        <div style={{ backgroundColor: setorInfo.cor2 }} className="flex justify-around items-center w-full h-full rounded-[10px] p-[2px]"> {/* Adicionei o `relative` aqui */}
                            <div className="bg-[#8F5ADA] w-[50%] h-[80%] w-[80%] aspect-square rounded-[7px] flex items-center justify-center hover:scale-[1.20] duration-300 ease-in-out delay-[0.1s] cursor-pointer">
                                <img className="h-[70%] aspect-square rotate-[270deg]" src={PróximoImg} />
                            </div>
                            <div className="flex justify-center items-center w-full">
                                <h2 className="text-white text-[10px] fonteBold">{dados[setorAtivo].edificios[0].quantidade}
                                </h2>
                            </div>
                        </div>
                        <div style={{ backgroundColor: setorInfo.cor2 }} className="flex justify-around items-center w-full h-full rounded-[10px] p-[2px]"> {/* Adicionei o `relative` aqui */}
                            <div className="bg-[#8F5ADA] w-[50%] h-[80%] w-[80%] aspect-square rounded-[7px] flex items-center justify-center hover:scale-[1.20] duration-300 ease-in-out delay-[0.1s] cursor-pointer">
                                <img className="h-[70%] aspect-square rotate-[270deg]" src={PróximoImg} />
                            </div>
                            <div className="flex justify-center items-center w-full">
                                <h2 className="text-white text-[10px] fonteBold">{dados[setorAtivo].edificios[0].quantidade}
                                </h2>
                            </div>
                        </div>
                        <div style={{ backgroundColor: setorInfo.cor2 }} className="flex justify-around items-center w-full h-full rounded-[10px] p-[2px]"> {/* Adicionei o `relative` aqui */}
                            <div className="bg-[#8F5ADA] w-[50%] h-[80%] w-[80%] aspect-square rounded-[7px] flex items-center justify-center hover:scale-[1.20] duration-300 ease-in-out delay-[0.1s] cursor-pointer">
                                <img className="h-[70%] aspect-square rotate-[270deg]" src={PróximoImg} />
                            </div>
                            <div className="flex justify-center items-center w-full">
                                <h2 className="text-white text-[10px] fonteBold">{dados[setorAtivo].edificios[0].quantidade}
                                </h2>
                            </div>
                        </div>

                    </div>
                </div>
                <div style={{ backgroundColor: setorInfo.cor3 }} className="h-[35%] w-[90%] rounded-[10px] flex flex-col items-center justify-around">
                    <p className="text-white text-[8px] p-[5px]">Dara power up principalemente
                        em industria alimenticia e rações </p>
                    <button onClick={openModalPowerUps} className="Todos power Ups w-[80%] h-[25%] text-white text-[10px] bg-[#8F5ADA] rounded-[10px]">Todos power ups</button>
                </div>
            </div>)
    }






    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={resetRotation}
            onClick={handleFlip}  // Flip ao clicar
            style={{
                background: `linear-gradient(135deg, ${setorInfo.cor1} 0%, #6411D9 80%, #350973 100%)`
            }}
            className="w-[22%] min-w-[215px] min-h-[230px] h-[40%] bg-white rounded-[20px] flex flex-col justify-center items-center cursor-pointer shadow-lg"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            animate={{ rotateX, rotateY }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
            {/* Card com Efeito de Flip */}
            <motion.div
                className="relative w-full h-full perspective cursor-pointer"
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                }}
            >
                {/* Frente do Card */}
                <div className="absolute w-full h-full flex items-center justify-center rounded-xl">
                    <div className="w-[90%] h-[90%] flex items-center flex-col justify-around self-center">
                        <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full h-[22%] rounded-[10px] flex justify-between ">
                            <div style={{ background: `linear-gradient(135deg, ${setorInfo.cor3} 0%,${setorInfo.cor1} 100%)` }} className="h-[100%] aspect-square rounded-[10px] flex items-center justify-center">
                                <img className="h-[70%]" src={plantação} alt="" />
                            </div>

                            <div className="flex p-[10px] justify-center">
                                <h1 className="text-white fonteBold text-[12px]">{dados[setorAtivo].edificios[0].nome}</h1>
                            </div>
                        </div>


                        {/* <div className="h-[20%] w-[90%] flex justify-center items-center relative">
                <h1 className="fonteLight text-white text-[10px]">{dados[setorAtivo].edificios[0].desc} </h1>

                {visibleId === 'lojasNec' && <div style={{ backgroundColor: setorInfo.cor3 }} className=" flex items-center justify-around w-full h-[90%] absolute z-[20] rounded-[10px]">
                    <div style={{ backgroundColor: setorInfo.cor4 }} className="w-[20%] flex items-center justify-center aspect-square bg-white rounded-[10px] relative"><img className="h-[70%]" src={terrenoImg} alt="" /><div style={{ color: setorInfo.cor1 }} className="absolute fonteBold">{dados[setorAtivo].edificios[0].lojasNecessarias.terrenos}</div></div>
                    <div style={{ backgroundColor: setorInfo.cor4 }} className="w-[20%] flex items-center justify-center aspect-square bg-white rounded-[10px] relative"><img className="h-[70%]" src={LojaPImg} alt="" /><div style={{ color: setorInfo.cor1 }} className="absolute fonteBold">{dados[setorAtivo].edificios[0].lojasNecessarias.lojasP}</div></div>
                    <div style={{ backgroundColor: setorInfo.cor4 }} className="w-[20%] flex items-center justify-center aspect-square bg-white rounded-[10px] relative"><img className="h-[70%]" src={LojaMImg} alt="" /><div style={{ color: setorInfo.cor1 }} className="absolute fonteBold">{dados[setorAtivo].edificios[0].lojasNecessarias.lojasM}</div></div>
                    <div style={{ backgroundColor: setorInfo.cor4 }} className="w-[20%] flex items-center justify-center aspect-square bg-white rounded-[10px] relative"><img className="h-[70%]" src={LojaGImg} alt="" /><div style={{ color: setorInfo.cor1 }} className="absolute fonteBold">{dados[setorAtivo].edificios[0].lojasNecessarias.lojasG}</div></div>
                </div>}
                {visibleId === 'licenca' && <div style={{ backgroundColor: setorInfo.cor3 }} className=" flex items-center justify-around w-full h-[90%] absolute z-[20] rounded-[10px]">
                    <LicenseNec />
                </div>}

            </div> */}
                        <div className="h-[25%] w-full flex justify-around flex-col  items-center">

                            <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full flex items-center justify-center rounded-[10px] p-[5px] gap-[5px] h-full">

                                <div className="w-[100%] rounded-[20px] flex justify-around items-center  h-full">
                                    <div style={{ backgroundColor: setorInfo.cor3 }} onMouseEnter={() => handleShow('lojasNec')}
                                        onMouseLeave={handleHide}
                                        className=" hover:scale-[1.20] ease-in-out cursor-pointer h-[80%] aspect-square rounded-[8px] flex items-center justify-center relative">
                                        <img className="h-[70%] aspect-square" src={terrenoImg} alt="" />
                                        <div className="absolute bottom-[-2px] right-[-2px]">
                                            <span className="relative flex size-2">
                                                <span className="absolute inline-flex h-full w-full rounded-full bg-[#FFFFFF] opacity-75"></span>
                                                <span className="relative inline-flex size-2 rounded-full bg-[#FFFFFF]"></span>
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ backgroundColor: setorInfo.cor3 }} className="h-[80%] aspect-square rounded-[8px] flex items-center justify-center relative hover:scale-[1.20] duration-300 ease-in-out delay-[0.1s] cursor-pointer">
                                        <img className="h-[70%] aspect-square" src={constNece} onClick={() => { handleMouseEnter(), handleShow('constNece') }}
                                            alt="" />
                                        <div className="absolute bottom-[-2px] right-[-2px]">
                                            <span className="relative flex size-2">
                                                <span className="absolute inline-flex h-full w-full rounded-full bg-[#FFFFFF] opacity-75"></span>
                                                <span className="relative inline-flex size-2 rounded-full bg-[#FFFFFF]"></span>
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ backgroundColor: setorInfo.cor3 }} onMouseEnter={() => handleShow('licenca')}
                                        onMouseLeave={handleHide} className="h-[80%] aspect-square rounded-[8px] flex items-center justify-center relative hover:scale-[1.20] ease-in-out cursor-pointer">
                                        <img className="h-[70%] aspect-square" src={licença} alt="" />
                                        <div className="absolute bottom-[-2px] right-[-2px]">
                                            <span className="relative flex size-2">
                                                <span className="absolute inline-flex h-full w-full rounded-full bg-[#FF0000] opacity-75"></span>
                                                <span className="relative inline-flex size-2 rounded-full bg-[#FFFFFF]"></span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="flex flex-col justify-between items-center h-[25%] w-full">
                            <div className="w-full flex h-[45%] flex justify-between items-center">
                                <div className="w-full h-full rounded-[5px] ">
                                    <div style={{ backgroundColor: setorInfo.cor3 }} className=" rounded-[10px] flex items-center justify-between h-full ">
                                        <div className="flex items-center justify-center h-full">
                                            <img src={DolarImg} className="h-[60%] ml-[2px]" />
                                            <h1 className="text-white fonteBold text-[15px] ml-2">{dados[setorAtivo].edificios[0].financas.fatuMensal}</h1>
                                        </div>
                                        <div className="flex items-center justify-center h-full">
                                            <h1 className="text-white font-bold mr-2 text-[15px]">{dados[setorAtivo].edificios[0].financas.rent}</h1>
                                            <img src={porcem} alt="porcentagem" className="h-[60%] mr-[5px]" />
                                        </div>
                                    </div>
                                </div>
                            </div >
                            <div className="w-full h-[45%] flex justify-between">
                                <div style={{ backgroundColor: setorInfo.cor3 }} className="w-[55%] h-full flex items-center justify-around rounded-[5px]">
                                    <img src={ConstuirImg} className="h-[60%] aspect-square ml-[5px]" />
                                    <h1 className="text-white fonteBold text-[15px] ml-2">{dados[setorAtivo].edificios[0].custoConstrucao}</h1>
                                </div>
                                <div onMouseEnter={() => { handleMouseEnter(), handleShow('powerUp') }} onMouseLeave={handleMouseLeave} className="w-[42%] h-full flex justify-center items-center ">
                                    <div className="h-full w-full aspect-square flex justify-center items-center">
                                        <div style={{ backgroundColor: setorInfo.cor3 }} className="flex justify-center items-center w-full h-full rounded-[10px] "> {/* Adicionei o `relative` aqui */}
                                            <div style={{ backgroundColor: setorInfo.cor2 }} className="h-full aspect-square rounded-[10px] flex items-center justify-center hover:scale-[1.20] duration-300 ease-in-out delay-[0.1s] cursor-pointer">
                                                <img className="h-[70%] aspect-square rotate-[270deg]" src={PróximoImg} />
                                            </div>
                                            <div className="flex justify-center items-center w-full">
                                                <h2 className="text-white text-[15px] fonteBold">{dados[setorAtivo].edificios[0].quantidade}
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center w-[90%] h-[13%] drop-shadow-md">
                            <button className="bg-[#6411D9] rounded-[20px] w-full fonteBold text-white"> Comprar</button>
                        </div>
                    </div>
                </div>

                {/* Verso do Card */}
                <div className="absolute w-full h-full flex items-center justify-center rounded-xl"
                    style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}>

                    <div className="w-[90%] h-[90%] flex items-center flex-col justify-around self-center">
                        <div style={{ backgroundColor: setorInfo.cor1 }} className="w-full h-[22%] rounded-[10px] flex justify-between ">
                            <div style={{ background: `linear-gradient(135deg, ${setorInfo.cor3} 0%,${setorInfo.cor1} 100%)` }} className="h-[100%] aspect-square rounded-[10px] flex items-center justify-center">
                                <img className="h-[70%]" src={constNece} alt="" />
                            </div>

                            <div className="flex p-[10px] justify-center">
                                <h1 className="text-white fonteBold text-[12px]">construções necessárias</h1>
                            </div>
                        </div>


                        {/* <div className="h-[20%] w-[90%] flex justify-center items-center relative">
                <h1 className="fonteLight text-white text-[10px]">{dados[setorAtivo].edificios[0].desc} </h1>

                {visibleId === 'lojasNec' && <div style={{ backgroundColor: setorInfo.cor3 }} className=" flex items-center justify-around w-full h-[90%] absolute z-[20] rounded-[10px]">
                    <div style={{ backgroundColor: setorInfo.cor4 }} className="w-[20%] flex items-center justify-center aspect-square bg-white rounded-[10px] relative"><img className="h-[70%]" src={terrenoImg} alt="" /><div style={{ color: setorInfo.cor1 }} className="absolute fonteBold">{dados[setorAtivo].edificios[0].lojasNecessarias.terrenos}</div></div>
                    <div style={{ backgroundColor: setorInfo.cor4 }} className="w-[20%] flex items-center justify-center aspect-square bg-white rounded-[10px] relative"><img className="h-[70%]" src={LojaPImg} alt="" /><div style={{ color: setorInfo.cor1 }} className="absolute fonteBold">{dados[setorAtivo].edificios[0].lojasNecessarias.lojasP}</div></div>
                    <div style={{ backgroundColor: setorInfo.cor4 }} className="w-[20%] flex items-center justify-center aspect-square bg-white rounded-[10px] relative"><img className="h-[70%]" src={LojaMImg} alt="" /><div style={{ color: setorInfo.cor1 }} className="absolute fonteBold">{dados[setorAtivo].edificios[0].lojasNecessarias.lojasM}</div></div>
                    <div style={{ backgroundColor: setorInfo.cor4 }} className="w-[20%] flex items-center justify-center aspect-square bg-white rounded-[10px] relative"><img className="h-[70%]" src={LojaGImg} alt="" /><div style={{ color: setorInfo.cor1 }} className="absolute fonteBold">{dados[setorAtivo].edificios[0].lojasNecessarias.lojasG}</div></div>
                </div>}
                {visibleId === 'licenca' && <div style={{ backgroundColor: setorInfo.cor3 }} className=" flex items-center justify-around w-full h-[90%] absolute z-[20] rounded-[10px]">
                    <LicenseNec />
                </div>}

            </div> */}


                    </div>
                </div>
            </motion.div>
        </motion.div>

    )

}

