import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
// import { CentraldeDadosContext } from "../centralDeDadosContext";
import React from "react";
import { useContext, useState } from "react";
import expandir from '../../public/outrasImagens/expandir business.png'
import { BusinessLicence } from "./BusinessLicence";
import { motion } from "framer-motion";
import fechar from "../../public/outrasImagens/fechar.png";
import openAudio from "../../public/sounds/openAudio.mp3";
import useSound from "use-sound";
import { useCentralStore, EDIFICIOS_BASE_DINAMICOS, EDIFICIOS_FINAIS_DINAMICOS_INICIAL, LICENCAS_DINAMICAS_GLOBAIS } from "../stores/useCentralStore";
import {
    EDIFICIOS_FINAIS_ESTATICOS,
    LICENCAS_ESTATICAS,
    EDIFICIOS_BASE_ESTATICOS,
    LICENCAS_ESTATICAS_GLOBAIS,
} from "../stores/dadosEstáticos";

import { createPortal } from "react-dom";

export const LicenceModalBusiness = () => {
    const { economiaSetores } = useContext(DadosEconomyGlobalContext);
    // const { dados, atualizarDadosProf2, atualizarDados } = useContext(
    //     CentraldeDadosContext
    // );

    const dia = useCentralStore((s) => s.dia);
    const [businessLicenceModal, setBusinessLicenceModal] = useState(false);
    const [buttonOpenAudio] = useSound(openAudio);
    const [ativo, setAtivo] = useState("carteira");

    // 1. TRAVA DE DIA: Se for antes do dia 270, o componente não renderiza nada
    if (dia < 270) return null;

    const setores = [
        {
            id: "carteira",
            corClasse: "bg-[#934CFF]",
            cor1: "#360974 ",
            cor2: "#4C14A9 ",
            cor3: "#6A00FF ",
            cor4: "#934CFF ",
        },
    ];

    const setorCarteira = setores.find((setor) => setor.id === "carteira");
    const dadosCarteiraEdificios = economiaSetores.centralEdificios;
    const edAtual = dadosCarteiraEdificios.quantidadeEdificiosAtual || 0;
    const edMax = dadosCarteiraEdificios.quantidadeEdificiosMax || 1;

    if (businessLicenceModal === true) {
        return createPortal(
            <div
                className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 sm:p-6 md:p-8"
                style={{
                    width: "100vw",
                    height: "100dvh",
                }}
            >
                {/* Container relativo que segura o modal + botão sobressalente */}
                <div className="relative w-full h-full max-w-[1400px] max-h-full">

                    {/* Botão fechar — FORA do overflow-hidden, sobressaindo */}
                    <button
                        className="
                        bg-laranja
                        absolute z-[60]
                        top-[-14px] right-[-14px]
                        sm:top-[-18px] sm:right-[-18px]
                        md:top-[-20px] md:right-[-20px]
                        w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] md:w-[44px] md:h-[44px]
                        flex justify-center items-center
                        rounded-[10px]
                        hover:bg-[#E56100] active:scale-95
                        shadow-lg
                    "
                        onClick={() => setBusinessLicenceModal(false)}
                    >
                        <img src={fechar} alt="Fechar" className="w-[60%]" />
                    </button>

                    <motion.div
                        style={{ backgroundColor: setorCarteira.cor4 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="
                        relative
                        w-full h-full
                        p-3 sm:p-4 md:p-[20px]
                        gap-3 sm:gap-4 md:gap-[20px]
                        rounded-[10px]
                        flex flex-col items-center
                        overflow-hidden
                    "
                    >
                        <div
                            style={{ backgroundColor: setorCarteira.cor1 }}
                            className="
                            flex shadow-xl justify-center items-center
                            w-full
                            shrink-0
                            h-[12%] min-h-[60px] sm:min-h-[70px]
                            rounded-[20px]
                        "
                        >
                            <h1 className="text-center text-white text-[22px] sm:text-[28px] md:text-[36px] lg:text-[40px] fonteBold px-2">
                                Licenças empresariais
                            </h1>
                        </div>

                        <div className="
                        flex-1 min-h-0
                        w-full
                        overflow-y-auto overflow-x-hidden
                        scrollbar-custom
                    ">
                            {economiaSetores.porteEmpresa.map((e, index) => (
                                <BusinessLicence
                                    key={index}
                                    setor={ativo}
                                    nomeLicença={e.nome}
                                    index={index}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>,
            document.body
        );
    }
    
    const atingiuLimite = edAtual >= edMax;
    const estaPerto = edMax - edAtual <= 2 && !atingiuLimite;

    return (
        <button
            onClick={() => { setBusinessLicenceModal(true); buttonOpenAudio(); }}
            data-tooltip-id="saldo-tip"
            data-tooltip-content="Observe os objetivos e limites de expansão"
            className="relative bg-gradient-to-br border border-[#350973] from-[#6A00FF] to-[#350973] min-h-[50px] hover:bg-[#E56100] active:scale-95 hover:scale-[1.05] max-h-[70px] min-w-[50px] max-w-[70px] aspect-square rounded-[10px] flex items-center justify-center transition-all"
        >
            {(atingiuLimite || estaPerto) && (
                <div className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${atingiuLimite ? 'bg-red-500' : 'bg-orange-400'}`}></span>
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${atingiuLimite ? 'bg-red-600' : 'bg-orange-500'}`}></span>
                </div>
            )}

            <img
                className="w-[60%] max-w-[58px] aspect-square"
                src={expandir}
                alt="Objetivos"
            />
        </button>
    );
}









