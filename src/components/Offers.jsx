import React, { useContext, useEffect } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";

import ListaDeOfertas from "./ListCards";
import fechar from "../../public/outrasImagens/fechar.png"
import { motion } from "framer-motion";
export default function Offers() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext)
    const { economiaSetores, setEconomiaSetores, } = useContext(DadosEconomyGlobalContext);

    const todasLojas = [
        "terrenos",
        "lojasP"
        , "lojasM",
        "lojasG"
    ];

    const fecharModal = () => {
        atualizarDados('modalOfertas', { ...dados.modalOfertas, estadoModal: false });
    }

    const ofertasNovas = () =>
        todasLojas.map(edificioSelecionado =>
            Array.from({ length: 4 }, () => {
                const quantidadeMax = dados[edificioSelecionado].quantidade;
                const quantidadeMin = 0;
                const quantidadeTerreno = (dados[edificioSelecionado].quantidadeNecTerreno)
                const preçoTerrenoAtual = (dados.terrenos.preçoConstrução)
                const construçãoAtual = (dados[edificioSelecionado].preçoConstrução)
                const valorImóvelAtual = (preçoTerrenoAtual * quantidadeTerreno) + construçãoAtual

                const economiaAtual = economiaSetores.economiaGlobal
                const cenariosEconomicos = [[1, 5], [7, 12], [15, 25], [27, 32], [35, 40]]
                const economiaSelecionada = (economia) => {
                    switch (economia) {
                        case "aquecida": return cenariosEconomicos[0]
                        case "progressiva" : return cenariosEconomicos[1]
                        case "estável": return cenariosEconomicos[2]
                        case "declinio": return cenariosEconomicos[3]
                        case "recessão": return cenariosEconomicos[4]
                        default: return "nada"
                    }
                }
                const valoresDepreciação = economiaSelecionada(economiaAtual)
                const depreciaçãoMax = valoresDepreciação[1]
                const depreciaçãoMin = valoresDepreciação[0]

                const sorteador = (min, max) => {
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                }

                const sorteadorDepre = (min, max) => {
                    return (Math.floor(Math.random() * (max - min + 1)) + min) / 100;
                }



                const conversorTodasLojas = (selecionarLoja) => {
                    switch (selecionarLoja) {
                        case "terrenos": return "Terrenos";
                        case "lojasP": return "Lojas Pequenas";
                        case "lojasM": return "Lojas Médias";
                        case "lojasG": return "Lojas Grandes";
                        default: return "nada";
                    }
                };

                const depreciaçãoSorteada = sorteadorDepre(depreciaçãoMin, depreciaçãoMax)
                const quantidadeSorteada = sorteador(quantidadeMin, quantidadeMax);


                const valorOferta = ((valorImóvelAtual - (valorImóvelAtual * depreciaçãoSorteada)) * quantidadeSorteada)

                return {
                    loja: conversorTodasLojas(edificioSelecionado),
                    quantidade: quantidadeSorteada,
                    depreciação: depreciaçãoSorteada,
                    valor: valorOferta,
                    estado: true
                }
            })
        );



    const arrOfertas = ofertasNovas().flat();

    useEffect(() => {
        if (dados.dia%30===0) {
            atualizarDados("ofertas", arrOfertas);
          
        }
    }, [dados.dia])

    // console.log(arrOfertas)

    if (dados.modalOfertas.estadoModal) {
        return (
          <div className="flex justify-center items-center z-10 bg-black opacity-[98%] w-[100vw] h-[100vh] absolute">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-[80vw] h-[80vh] z-40 absolute bg-[#F52623] rounded-[10px]"
            >
              <button
                className="bg-laranja absolute top-[-20px] right-[-20px] w-[40px] h-[40px] flex justify-center items-center rounded-[10px] hover:bg-[#E56100] active:scale-95"
                onClick={fecharModal}
              >
                <img src={fechar} alt="" className="w-[60%]" />
              </button>
              <ListaDeOfertas />
            </motion.div>
          </div>
        );
    } else {
        return null
    }
}