import React, { useContext, useEffect, useState } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import agricultura from "./setores/agricultura.png"
import tecnologia from "./setores/tecnologia.png"
import comercio from "./setores/comercio.png"
import industria from "./setores/industria.png"
import imobiliario from "./setores/Imobiliário.png"
import energia from "./setores/torre-eletrica.png"
import { CardModal } from "./cardsModal";
import { CardLocalization } from "./cardLocalization";
import circularEconomia from "../imagens/circular-economy.png"
import DolarImg from "../imagens/simbolo-do-dolar.png"
import licença from "../imagens/licença.png"
import { Localizador } from "./localizador";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";


export const LicenseModal = ({ setor, nomeLicença, index }) => {
    const { dados, atualizarDados, atualizarDadosProf } = useContext(CentraldeDadosContext);
    const { economiaSetores, setEconomiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);

    const tooltipStyle = {
        backgroundColor: "#FFFFFF",
        color: "#350973",
        border: "1px solid #350973",
        borderRadius: "6px",
        padding: "6px 10px",
        fontWeight: "600",
        fontSize: "14px",
    };

    const setorAtivo = setor

    const formatarNumero = (num) => {
        if (num >= 1e12) return (num / 1e12).toFixed(1).replace('.0', '') + 'T'; // Trilhões
        if (num >= 1e9) return (num / 1e9).toFixed(1).replace('.0', '') + 'B';   // Bilhões
        if (num >= 1e6) return (num / 1e6).toFixed(1).replace('.0', '') + 'M';   // Milhões
        if (num >= 1e3) return (num / 1e3).toFixed(1).replace('.0', '') + 'K';   // Milhares
        return num.toString();
    };


    const setores = [
        { id: "agricultura", cor3: "#0C9123", corClasse: "bg-[#4CAF50]", img: agricultura, descLicença: "Com a Licença Global de Agricultura, você terá acesso a cultivos exclusivos, otimização de produções e melhorias que aumentarão sua rentabilidade. Liberte o potencial do setor agrícola agora mesmo!", cor1: "#003816", cor2: "#1A5E2A", cor3: "#0C9123", cor4: "#4CAF50", },
        { id: "tecnologia", cor3: "#FF6F00 ", corClasse: "bg-[#FF8C42]", img: tecnologia, descLicença: "Com a Licença Global de Tecnologia, você desbloqueia inovações que podem transformar sua infraestrutura, otimizar processos e maximizar os lucros. Invista no futuro agora!", cor1: "#A64B00 ", cor2: "#D45A00 ", cor3: "#FF6F00 ", cor4: "#FF8C42 ", },
        { id: "industria", cor3: "#808080  ", corClasse: "bg-[#B3B3B3]", img: industria, descLicença: "Com a Licença Global de Indústria, você acessa fábricas avançadas e processos de produção que aceleram sua evolução e aumentam a eficiência. Não fique para trás!", cor1: "#1A1A1A ", cor2: "#4D4D4D  ", cor3: "#808080  ", cor4: "#B3B3B3  ", },
        { id: "comercio", cor3: "#E60000  ", corClasse: "bg-[#FF4D4D]", img: comercio, descLicença: "Com a Licença Global de Comércio, você tem acesso a novos mercados, estratégias de vendas e expansão que podem levar seus negócios a um novo nível. Não perca essa oportunidade!", cor1: "#660000  ", cor2: "#A31919  ", cor3: "#E60000  ", cor4: "#FF4D4D  ", },
        { id: "imobiliario", cor3: "#3333CC  ", corClasse: "bg-[#6666FF]", img: imobiliario, descLicença: "Com a Licença Global Imobiliária, você pode investir em novos terrenos, expandir suas construções e maximizar os retornos do mercado imobiliário. Abra as portas para grandes lucros!", cor1: "#000066  ", cor2: "#1A1A8C  ", cor3: "#3333CC  ", cor4: "#6666FF  " },
        { id: "energia", cor3: "#E6B800", corClasse: "bg-[#FFD966]", img: energia, descLicença: "Com a Licença Global de Energia, você ativa fontes de energia sustentáveis e de alta performance, garantindo uma operação eficiente e lucrativa. Potencialize seu setor energético agora!", cor1: "#665200   ", cor2: "#A37F19   ", cor3: "#E6B800", cor4: "#FFD966" },

    ];

    const comprarLicença = () => {
        if (dados[setorAtivo].licençasSetor[index].status === true) { return }

        else if (economiaSetores.saldo < (dados[setorAtivo].licençasSetor[index].valor)) {
            alert("Você não tem dinheiro suficiente para comprar essa licença");
        } else {
            atualizarDadosProf(["licençasSetor", index, "status"], true);
            liberarEdificios();
            console.log("Licença comprada e edifícios liberados");
            atualizarEco('saldo', economiaSetores.saldo - (dados[setorAtivo].licençasSetor[index].valor));
        }
    };


    const liberarEdificios = () => {
        const edificiosLiberados = dados[setorAtivo].licençasSetor[index].edifíciosLiberados;

        edificiosLiberados.forEach(nomeEd => {
            const indice = dados[setorAtivo].edificios.findIndex(ed => ed.nome === nomeEd);
            if (indice === -1) return;

            atualizarDadosProf(["edificios", indice, "licençaLiberado"], {
                ...dados[setorAtivo].edificios[indice].licençaLiberado,
                liberado: true
            });



        });
    };

    const setorInfo = setores.find(setor => setor.id === setorAtivo);
    const getImageUrl = (nomeArquivo) => `/imagens/${nomeArquivo}.png`;

    return (
        <div className="w-full pb-[30px]">
            <div
                style={{ backgroundColor: setorInfo.cor3 }}
                className="w-[100%] h-[300px] rounded-[20px] self-center justify-between shadow-xl"
            >
                {/* Barra superior */}
                <div
                    style={{ backgroundColor: setorInfo.cor2 }}
                    className="w-full flex items-center h-[15%] rounded-t-[20px] self-center p-[5px]"
                >
                    <div
                        style={{ backgroundColor: setorInfo.cor1 }}
                        className="h-[100%] flex items-center justify-center aspect-square rounded-[20px]"
                        data-tooltip-id="tooltip-licenca-imagem"
                        data-tooltip-html="Imagem da licença"
                    >
                        <div style={{ backgroundColor: setorInfo.cor3 }} className="flex items-center justify-center h-[95%] aspect-square rounded-[20px]">
                            <div style={{ backgroundColor: setorInfo.cor1 }} className="flex items-center justify-center h-[95%] aspect-square rounded-[20px]">
                                <div style={{ backgroundColor: setorInfo.cor2 }} className="flex items-center justify-center h-[95%] aspect-square rounded-[30px]">
                                    <div
                                        style={{ background: `linear-gradient(135deg, ${setorInfo.cor1} 0%,${setorInfo.cor4} 100%)` }}
                                        className="flex items-center justify-center relative h-[95%] aspect-square rounded-[60px]"
                                    >
                                        <img
                                            className="h-[70%] w-[] aspect-square"
                                            src={getImageUrl(nomeLicença)}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="text-white text-[30px] ml-[20px] fonteBold"
                        data-tooltip-id="tooltip-licenca-nome"
                        data-tooltip-html={`Nome da licença: ${nomeLicença}`}
                    >
                        {nomeLicença}
                    </div>
                </div>

                {/* Área principal */}
                <div className="w-full h-[85%] flex">
                    {/* Edifícios liberados */}
                    <div
                        style={{
                            background: `linear-gradient(20deg,${setorInfo.cor1} 0%, ${setorInfo.cor3} 20%, ${setorInfo.cor3} 40%, ${setorInfo.cor4} 60%,${setorInfo.cor2} 100%)`
                        }}
                        className="flex h-full w-[80%] justify-around rounded-bl-[20px] items-center"
                        data-tooltip-id="tooltip-edificios-liberados"
                        data-tooltip-html="Edifícios liberados por esta licença"
                    >
                        {dados[setorAtivo].licençasSetor[index].edifíciosLiberados.map((e) => (
                            <React.Fragment key={e}>
                                {Localizador(e)}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Informações e botão */}
                    <div
                        style={{
                            background: `linear-gradient(180deg, ${setorInfo.cor2} 0%, ${setorInfo.cor1} 100%)`
                        }}
                        className="h-full w-[20%] flex flex-col justify-around items-center rounded-br-[20px]"
                    >
                        {/* Descrição */}
                        <div
                            style={{ backgroundColor: setorInfo.cor3 }}
                            className="h-[65%] w-[90%] text-white p-[10px] fonteBold rounded-[20px]"
                            data-tooltip-id="tooltip-licenca-desc"
                            data-tooltip-html={dados[setorAtivo].licençasSetor[index].desc}
                        >
                            {dados[setorAtivo].licençasSetor[index].desc}
                        </div>

                        {/* Valor */}
                        <div
                            style={{ backgroundColor: setorInfo.cor3 }}
                            className="flex items-center justify-between p-[5px] rounded-[20px] h-[10%] w-[90%] drop-shadow-2xl"
                            data-tooltip-id="tooltip-licenca-valor"
                            data-tooltip-html={
                                dados[setorAtivo].licençasSetor[index].status
                                    ? "Licença já adquirida"
                                    : `Valor da licença: R$ ${formatarNumero(dados[setorAtivo].licençasSetor[index].valor)}`
                            }
                        >
                            <img src={DolarImg} className="h-[100%]" />
                            <h1 className="text-white fonteBold text-[15px] mr-[2px]">
                                {dados[setorAtivo].licençasSetor[index].status
                                    ? "Comprado"
                                    : formatarNumero(dados[setorAtivo].licençasSetor[index].valor)}
                            </h1>
                        </div>

                        {/* Botão comprar */}
                        <div
                            className="flex items-center justify-center w-[90%] h-[13%] drop-shadow-md"
                            data-tooltip-id="tooltip-licenca-comprar"
                            data-tooltip-html={
                                dados[setorAtivo].licençasSetor[index].status
                                    ? "Você já adquiriu esta licença"
                                    : "Clique para comprar esta licença"
                            }
                        >
                            <button
                                onClick={comprarLicença}
                                disabled={dados[setorAtivo].licençasSetor[index].status}
                                style={{ "--cor4": setorInfo.cor4, "--cor1": setorInfo.cor1 }}
                                className={`rounded-[20px] w-full fonteBold text-white duration-300 ease-in-out 
              ${dados[setorAtivo].licençasSetor[index].status
                                        ? "bg-gray-500 cursor-not-allowed"
                                        : "bg-gradient-to-br to-[#6411D9] from-[#6411D9] hover:scale-[1.10] hover:to-[--cor1] hover:via-[#6411D9] hover:from-[--cor4]"
                                    }`}
                            >
                                {dados[setorAtivo].licençasSetor[index].status ? "Comprado" : "Comprar"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tooltips globais */}
            <Tooltip id="tooltip-licenca-imagem" style={tooltipStyle} />
            <Tooltip id="tooltip-licenca-nome" style={tooltipStyle} />
            <Tooltip id="tooltip-edificios-liberados" style={tooltipStyle} />
            <Tooltip id="tooltip-licenca-desc" style={tooltipStyle} />
            <Tooltip id="tooltip-licenca-valor" style={tooltipStyle} />
            <Tooltip id="tooltip-licenca-comprar" style={tooltipStyle} />
        </div>

    );
}