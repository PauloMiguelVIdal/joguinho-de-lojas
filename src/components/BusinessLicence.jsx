import React, { useContext } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import DolarImg from "../imagens/simbolo-do-dolar.png";

export const BusinessLicence = ({ setor, nomeLicenca, index }) => {
  const { dados, atualizarDadosProf } = useContext(CentraldeDadosContext);
  const { economiaSetores, setEconomiaSetores,atualizarEcoProf } = useContext(DadosEconomyGlobalContext);

  const nivelEmpresa = economiaSetores.porteEmpresa[index]; // pega o nível atual do array

  const formatarNumero = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(1).replace(".0", "") + "T";
    if (num >= 1e9) return (num / 1e9).toFixed(1).replace(".0", "") + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(1).replace(".0", "") + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1).replace(".0", "") + "K";
    return num.toString();
  };

  // Função para liberar o próximo nível
  const liberaProximoNivel = () => {
setEconomiaSetores(prev => {
  const novoArray = prev.porteEmpresa.map((nivel, i) =>
    i === index ? { ...nivel, status: true } : nivel
  );

  const nivelAtual = novoArray[index];

  return {
    ...prev,
    saldo: prev.saldo - nivelAtual.custoUpgrade,
    centralEdificios: {
      ...prev.centralEdificios,
      classificacaoPorteEmpresa: nivelAtual.nome,
      quantidadeUnicoMax: nivelAtual.edificiosUnicosMax,
      quantidadeSetoresMax: nivelAtual.qtdMaxSetores,
      quantidadeDiversosEdificiosMax: nivelAtual.qtdMaxDiversificar,
      quantidadeEdificiosMax: nivelAtual.totalMaxEdificios
    },
    porteEmpresa: novoArray
  };
});
  }
const comprarLicenca = () => {
  if (nivelEmpresa.status) return; // já ativo

  if (economiaSetores.saldo < nivelEmpresa.custoUpgrade) {
    alert("Você não tem dinheiro suficiente para comprar essa licença");
    return;
  }

  // Ativa a licença
  atualizarEcoProf(["licençasSetor", index, "status"], true);

  // Libera os edifícios (já desconta o saldo lá dentro)
  liberaProximoNivel();

  console.log("Licença comprada e edifícios liberados");
};

return (
  <div className="w-full pb-[30px]">
    <div className="w-full h-[300px] rounded-[20px] shadow-xl flex flex-col">
      
      {/* Cabeçalho com nome do nível */}
      <div className="w-full flex items-center h-[15%] rounded-t-[20px] p-[5px] bg-purple-800 text-white text-[30px] font-bold">
        {nivelEmpresa.nome}
      </div>

      <div className="w-full h-[85%] flex justify-between items-center p-4">

        {/* Parte principal com liberação */}
        <div className="w-[80%] h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 to-purple-900 rounded-bl-[20px] p-4 text-white font-bold">
          <h2 className="text-lg mb-2">Liberações deste nível:</h2>
          <p className="text-center">{nivelEmpresa.textoLiberacao}</p>
        </div>

        {/* Lateral com descrição, custo e botão */}
        <div className="w-[20%] h-full flex flex-col justify-around items-center rounded-br-[20px] bg-gradient-to-b from-purple-900 to-purple-700 p-2">
          
          {/* Descrição */}
          <div className="h-[65%] w-[90%] text-white p-[10px] font-bold rounded-[20px] text-center">
            {nivelEmpresa.descricao}
          </div>

          {/* Custo */}
          <div className="flex items-center justify-between p-[5px] rounded-[20px] h-[10%] w-[90%] bg-purple-800 drop-shadow-2xl">
            <img src={DolarImg} className="h-[100%]" />
            <h1 className="text-white font-bold text-[15px] mr-[2px]">
              {formatarNumero(nivelEmpresa.custoUpgrade)}
            </h1>
          </div>

          {/* Botão de compra */}
          <button
            onClick={comprarLicenca}
            className="h-[13%] w-[90%] bg-gradient-to-br from-purple-700 to-purple-900 text-white font-bold rounded-[20px] hover:scale-110 duration-300"
          >
            Comprar
          </button>
        </div>

      </div>
    </div>
  </div>
);
};
