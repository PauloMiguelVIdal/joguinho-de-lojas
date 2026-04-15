import { React, createContext, useContext, useEffect } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import terrenoImg from "../../public/outrasImagens/terreno.png"
import LojaPImg from "../../public/outrasImagens/lojaP.png"
import LojaMImg from "../../public/outrasImagens/lojaM.png"
import LojaGImg from "../../public/outrasImagens/lojaG.png"
import { motion } from "framer-motion";
import { useCentralStore } from "../stores/useCentralStore";
export const Achievements = () => {
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  // if (CentraldeDadosContext.lojasP.quantidade === 10) {
  //     alert("parabens 10 lojas")
  // }
const setModalAtivo = useCentralStore((s) => s.setModalAtivo);
const limparModalAtivo = useCentralStore((s) => s.limparModalAtivo);

  //achievements
  //const modalAchievements = () =>{
  //  let imgLoja = `${dados.eventoAtual.julgamento}`;
  //  let content = Parabéns, você atingiu {conquistaSelecionada}{nomeLoja};
  //}
  // if(lojaSelecionada) +> filtra ========> const lojaSelecionadaAchievement 
  // (lojaSelecionadaAchievement)
  //  

  const todasLojas = [
    "terrenos",
    "lojasP"
    , "lojasM",
    "lojasG"
  ];



  let conversorLojas = dados.modalAchievements.lojaConquistada

  const conversorTodasLojas = (selecionarLoja) => {
    switch (selecionarLoja) {
      case "terrenos": return " Terrenos";
      case "lojasP": return " Lojas Pequenas";
      case "lojasM": return "Lojas Médias";
      case "lojasG": return "Lojas Grandes";
      default: return "nada";
    }
  };

  const lojaConquista = conversorTodasLojas(conversorLojas)

  useEffect(() => {
  const temLojaSuficiente =
    dados.terrenos.quantidade >= 5 ||
    dados.lojasP.quantidade >= 5 ||
    dados.lojasM.quantidade >= 5 ||
    dados.lojasG.quantidade >= 5;

  if (!temLojaSuficiente) return;
if(dados.modalAchievements.conquista===undefined) return;


  for (const lojaSelecionada of todasLojas) {
    const quantidadeLojas = dados[lojaSelecionada].quantidade;
    // console.log(quantidadeLojas);
    
    const arrayConquistas = [5, 10, 20, 50, 100, 200, 500, 1000];
    const conquistaSelecionada = arrayConquistas.findLast(num => num <= quantidadeLojas) || arrayConquistas[0];
    // console.log(conquistaSelecionada);

    if (!dados[lojaSelecionada].achievements[conquistaSelecionada]) {
      atualizarDados(`${lojaSelecionada}`, {
        ...dados[lojaSelecionada], 
        achievements: { 
          ...dados[lojaSelecionada].achievements, 
          [conquistaSelecionada]: true 
        }
      });

if (!dados.modalAchievements.estadoModal) {
  atualizarDados("modalAchievements", {
    ...dados.modalAchievements, 
    estadoModal: true, 
    lojaConquistada: lojaSelecionada, 
    conquista: conquistaSelecionada
  });

  setModalAtivo("modalAchievements"); // 👈 ADICIONAR
}

      break; // Para no primeiro que atingir a condição
    }
  }
}, [dados.terrenos.quantidade, dados.lojasP.quantidade, dados.lojasM.quantidade, dados.lojasG.quantidade]);


  useEffect(() => {
    //caso tenha alguma nova conquista ele chama o return com o modal
    // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
    // console.log("useEffect chamado2!");
  }, [dados.terrenos.achievements, dados.lojasP.achievements, dados.lojasM.achievements, dados.lojasG.achievements])


  useEffect(() => {
    atualizarDados("modalAchievements", { 
  ...dados.modalAchievements, 
  estadoModal: false, 
  lojaConquistada: null,
  conquista: null 
});

limparModalAtivo(); // 👈 ADICIONAR
  }, [dados.modalAchievements.estadoModal]);
  


  if (dados.modalAchievements.estadoModal) {
    return (
      <div className="flex top-[50px]  absolute">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className='flex w-[30vw] h-[10vh] rounded-[20px] border-[2px] border-roxo z-[100] p-2 bg-[#350973] relative'
        >
          <div className="flex justify-center items-center aspect-square bg-roxo rounded-[10px] h-full">
            <img src={terrenoImg} className="aspect-square h-[80%] " />
          </div>
          <div className="flex justify-center items-center w-full aspect-square h-full">
            <h1 className="text-white fonteBold">Incrível! Você alcançou {dados.modalAchievements.conquista} {lojaConquista}. Continue assim!
             
            </h1>
          </div>
        </motion.div>
      </div>
    )
  }

  //}
  // if(lojaSelecionada>=5)
  // if(lojaSelecionada>=10)
  // if(lojaSelecionada>=20)
  // if(lojaSelecionada>=50)
  // if(lojaSelecionada>=100)
  // if(lojaSelecionada>=200)
  // if(lojaSelecionada>=500)
  // if(lojaSelecionada>=1000)
  //
  // {
  // 1: false
  // 5: false
  // }
  //1 5 10 20 50 100 1000

}