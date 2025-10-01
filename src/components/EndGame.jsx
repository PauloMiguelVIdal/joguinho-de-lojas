import { useEffect, useState, useContext } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";

const useFimDeJogo = (objetosSelecionados) => {
    const { economiaSetores, setEconomiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);
  const { dados } = useContext(CentraldeDadosContext);
  const [fimJogoModalOpen, setFimJogoModalOpen] = useState(false);

  useEffect(() => {
    if (!objetosSelecionados || objetosSelecionados.length === 0) return;

    // Verifica se todos os objetos selecionados têm quantidade > 0
    const todosPossuidos = objetosSelecionados.every(obj => {
      const setor = obj.setor; // assumindo que cada objeto tem a propriedade setor
      const edificioAtual = dados[setor]?.edificios.find(ed => ed.nome === obj.nome);
      return edificioAtual && edificioAtual.quantidade > 0;
    });

    if (todosPossuidos) {
      setFimJogoModalOpen(true);
      atualizarEco("fimGame", true);
    }
  }, [dados, objetosSelecionados]);

  return { fimJogoModalOpen, setFimJogoModalOpen };
};

export default useFimDeJogo;



