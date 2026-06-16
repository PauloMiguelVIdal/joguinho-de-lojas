
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import React from "react";
import { useContext, useState } from "react";
import expandir from '../../public/outrasImagens/expandir business.png'
import { BusinessLicence } from "./BusinessLicence";
import { motion } from "framer-motion";
import fechar from "../../public/outrasImagens/fechar.png";
import openAudio from "../../public/sounds/openAudio.mp3";
import useSound from "use-sound";


export const BusinessLicenceModal = ({ onClose }) => {

    const { economiaSetores } = useContext(DadosEconomyGlobalContext);
    const { dados, atualizarDadosProf2, atualizarDados } = useContext(
        CentraldeDadosContext
    );

    const dia = dados.dia
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



    return (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center">
            <motion.div
                style={{ backgroundColor: setorCarteira.cor4 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-[80vw] h-[80vh] p-[20px] gap-[20px] rounded-[10px] flex flex-col items-center relative "
            >
                <button
                    className="bg-laranja absolute top-[-20px] right-[-20px] w-[40px] h-[40px] flex justify-center items-center rounded-[10px] hover:bg-[#E56100] active:scale-95"
            onClick={onClose}
                >
                    <img src={fechar} alt="Fechar" className="w-[60%]" />
                </button>
                <div
                    style={{ backgroundColor: setorCarteira.cor1 }}
                    className="flex shadow-xl justify-center items-center w-[100%] h-[15%] rounded-[20px] self-center "
                >
                    <h1 className="text-center text-white text-[40px] fonteBold">
                        Licenças empresariais
                    </h1>
                </div>
                <div className="overflow-y-visible overflow-x-hidden w-full scrollbar-custom ">
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
    );
}