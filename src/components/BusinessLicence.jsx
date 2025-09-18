import React, { useContext } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import DolarImg from "../imagens/simbolo-do-dolar.png";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import limitar from "../imagens/limite.png";
import soma from "../imagens/Soma.png"
import setoresImg from "../imagens/setores.png"
import diversidade from "../imagens/diversidade.png"

export const BusinessLicence = ({ setor, nomeLicenca, index }) => {
  const { dados, atualizarDadosProf } = useContext(CentraldeDadosContext);
  const { economiaSetores, setEconomiaSetores, atualizarEcoProf } = useContext(DadosEconomyGlobalContext);

  const nivelEmpresa = economiaSetores.porteEmpresa[index]; // pega o nível atual do array

  const formatarNumero = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(1).replace(".0", "") + "T";
    if (num >= 1e9) return (num / 1e9).toFixed(1).replace(".0", "") + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(1).replace(".0", "") + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1).replace(".0", "") + "K";
    return num.toString();
  };

  const tooltipStyle = {
    backgroundColor: "#FFFFFF",
    color: "#350973",
    border: "1px solid #350973",
    borderRadius: "6px",
    padding: "6px 10px",
    fontWeight: "600",
    fontSize: "14px",
  };

  const setores = [
    { id: "agricultura", cor3: "#0C9123", corClasse: "bg-[#4CAF50]", descLicença: "Com a Licença Global de Agricultura, você terá acesso a cultivos exclusivos, otimização de produções e melhorias que aumentarão sua rentabilidade. Liberte o potencial do setor agrícola agora mesmo!", cor1: "#003816", cor2: "#1A5E2A", cor3: "#0C9123", cor4: "#4CAF50", },
    { id: "tecnologia", cor3: "#FF6F00 ", corClasse: "bg-[#FF8C42]", descLicença: "Com a Licença Global de Tecnologia, você desbloqueia inovações que podem transformar sua infraestrutura, otimizar processos e maximizar os lucros. Invista no futuro agora!", cor1: "#A64B00 ", cor2: "#D45A00 ", cor3: "#FF6F00 ", cor4: "#FF8C42 ", },
    { id: "industria", cor3: "#808080  ", corClasse: "bg-[#B3B3B3]", descLicença: "Com a Licença Global de Indústria, você acessa fábricas avançadas e processos de produção que aceleram sua evolução e aumentam a eficiência. Não fique para trás!", cor1: "#1A1A1A ", cor2: "#4D4D4D  ", cor3: "#808080  ", cor4: "#B3B3B3  ", },
    { id: "comercio", cor3: "#E60000  ", corClasse: "bg-[#FF4D4D]", descLicença: "Com a Licença Global de Comércio, você tem acesso a novos mercados, estratégias de vendas e expansão que podem levar seus negócios a um novo nível. Não perca essa oportunidade!", cor1: "#660000  ", cor2: "#A31919  ", cor3: "#E60000  ", cor4: "#FF4D4D  ", },
    { id: "imobiliario", cor3: "#3333CC  ", corClasse: "bg-[#6666FF]", descLicença: "Com a Licença Global Imobiliária, você pode investir em novos terrenos, expandir suas construções e maximizar os retornos do mercado imobiliário. Abra as portas para grandes lucros!", cor1: "#000066  ", cor2: "#1A1A8C  ", cor3: "#3333CC  ", cor4: "#6666FF  " },
    { id: "energia", cor3: "#E6B800", corClasse: "bg-[#FFD966]", descLicença: "Com a Licença Global de Energia, você ativa fontes de energia sustentáveis e de alta performance, garantindo uma operação eficiente e lucrativa. Potencialize seu setor energético agora!", cor1: "#665200   ", cor2: "#A37F19   ", cor3: "#E6B800", cor4: "#FFD966" },
    { id: "carteira", cor3: "#4C14A9 ", corClasse: "bg-[#934CFF]", cor1: "#350973 ", cor2: "#4C14A9 ", cor3: "#6A00FF ", cor4: "#934CFF ", },
    { id: "grafico", cor3: "#FF6F00 ", corClasse: "bg-[#6A00FF]", cor1: "#6A00FF ", cor2: "#6A00FF ", cor3: "#6A00FF ", cor4: "#6A00FF ", },
  ];

  const setorAtivo = setores.find((setor) => setor.id === "carteira");

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
        <div
          className="w-full flex items-center h-[15%] rounded-t-[20px] p-[5px] bg-purple-800 text-white text-[30px] font-bold"
          data-tooltip-id="tooltip-nivel-nome"
          data-tooltip-html={`Nome do nível da empresa: ${nivelEmpresa.nome}`}
        >
          {nivelEmpresa.nome}
        </div>

        <div className="w-full h-[85%] flex justify-between items-center p-4">

          {/* Parte principal com liberação */}
          <div
            className="w-[80%] h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 to-purple-900 rounded-bl-[20px] p-4 text-white font-bold"
            data-tooltip-id="tooltip-nivel-liberacoes"
            data-tooltip-html={`Liberações deste nível: <br/> ${nivelEmpresa.textoLiberacao}`}
          >
            <h2 className="text-lg mb-2">Liberações deste nível:</h2>
            <br />
            <h2 className="text-center text-[14px] mt-2"> Você poderá ter até {nivelEmpresa.qtdMaxDiversificar} tipos de edifícios, {nivelEmpresa.edificiosUnicosMax} unidades por tipo, atuar em {nivelEmpresa.qtdMaxSetores} setores, e totalizar até {nivelEmpresa.totalMaxEdificios} edifícios.</h2>

            <div className="h-[50px] w-full flex justify-between pt-[10px] gap-[10px] items-start">
              {/* Limite por edifício único */}
              <div
                data-tooltip-id="tooltip-limiteUnico"
                data-tooltip-html="Limite máximo de unidades do mesmo edifício"
                style={{ backgroundColor: setorAtivo.cor3 }}
                className="w-[25%] rounded-[20px] h-full fonteBold text-white flex items-center justify-between text-[30px] sombra"
              >
                <div
                  style={{ backgroundColor: setorAtivo.cor4 }}
                  className="h-full aspect-square rounded-[20px] border-[2px] flex items-center justify-center"
                >
                  <img src={limitar} className="h-[60%] aspect-square" />
                </div>
                <h1 className="text-white fonteBold text-[20px] mr-[10px]">
                  {nivelEmpresa.edificiosUnicosMax}
                </h1>
              </div>

              {/* Setores ativos */}
              <div
                data-tooltip-id="tooltip-setores"
                data-tooltip-html="Quantidade de setores ativos vs máximo disponível"
                style={{ backgroundColor: setorAtivo.cor3 }}
                className="w-[25%] rounded-[20px] h-full fonteBold text-white flex items-center justify-between text-[30px] sombra"
              >
                <div
                  style={{ backgroundColor: setorAtivo.cor4 }}
                  className="h-full aspect-square rounded-[20px] border-[2px] flex items-center justify-center"
                >
                  <img src={setoresImg} className="h-[60%] aspect-square" />
                </div>
                <h1 className="text-white fonteBold text-[20px] mr-[10px]">
                  {nivelEmpresa.qtdMaxSetores}
                </h1>
              </div>

              {/* Diversidade de edifícios */}
              <div
                data-tooltip-id="tooltip-diversidade"
                data-tooltip-html="Número de tipos diferentes de edifícios construídos"
                style={{ backgroundColor: setorAtivo.cor3 }}
                className="w-[25%] rounded-[20px] h-full fonteBold text-white flex items-center justify-between text-[30px] sombra"
              >
                <div
                  style={{ backgroundColor: setorAtivo.cor4 }}
                  className="h-full aspect-square rounded-[20px] border-[2px] flex items-center justify-center"
                >
                  <img src={diversidade} className="h-[60%] aspect-square" />
                </div>
                <h1 className="text-white fonteBold text-[20px] mr-[10px]">
                  {nivelEmpresa.qtdMaxDiversificar}
                </h1>
              </div>

              {/* Total de edifícios */}
              <div
                data-tooltip-id="tooltip-totalEdificios"
                data-tooltip-html="Quantidade total de edifícios construídos"
                style={{ backgroundColor: setorAtivo.cor3 }}
                className="w-[25%] rounded-[20px] h-full fonteBold text-white flex items-center justify-between text-[30px] sombra"
              >
                <div
                  style={{ backgroundColor: setorAtivo.cor4 }}
                  className="h-full aspect-square rounded-[20px] border-[2px] flex items-center justify-center"
                >
                  <img src={soma} className="h-[60%] aspect-square" />
                </div>
                <h1 className="text-white fonteBold text-[20px] mr-[10px]">
                  {nivelEmpresa.totalMaxEdificios}
                </h1>
              </div>

              {/* Tooltips globais */}
              <Tooltip id="tooltip-limiteUnico" style={tooltipStyle} />
              <Tooltip id="tooltip-setores" style={tooltipStyle} />
              <Tooltip id="tooltip-diversidade" style={tooltipStyle} />
              <Tooltip id="tooltip-totalEdificios" style={tooltipStyle} />

            </div>



          </div>

          {/* Lateral com descrição, custo e botão */}
          <div
            className="w-[20%] h-full flex flex-col justify-around items-center rounded-br-[20px] bg-gradient-to-b from-purple-900 to-purple-700 p-2"
          >
            {/* Descrição */}
            <div
              className="h-[65%] w-[90%] text-white p-[10px] font-bold rounded-[20px] text-center"
              data-tooltip-id="tooltip-nivel-desc"
              data-tooltip-html={nivelEmpresa.descricao}
            >
              {nivelEmpresa.descricao}
            </div>

            {/* Custo */}
            <div
              className="flex items-center justify-between p-[5px] rounded-[20px] h-[10%] w-[90%] bg-purple-800 drop-shadow-2xl"
              data-tooltip-id="tooltip-nivel-valor"
              data-tooltip-html={
                nivelEmpresa.status
                  ? "Licença já adquirida"
                  : `Custo para upgrade: R$ ${formatarNumero(nivelEmpresa.custoUpgrade)}`
              }
            >
              <img src={DolarImg} className="h-[100%]" />
              <h1 className="text-white font-bold text-[15px] mr-[2px]">
                {nivelEmpresa.status ? "Comprado" : formatarNumero(nivelEmpresa.custoUpgrade)}
              </h1>
            </div>

            {/* Botão de compra */}
            <button
              onClick={comprarLicenca}
              disabled={nivelEmpresa.status}
              className={`h-[13%] w-[90%] rounded-[20px] font-bold text-white 
      ${nivelEmpresa.status
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-br from-purple-700 to-purple-900 hover:scale-110 duration-300"
                }`}
              data-tooltip-id="tooltip-nivel-comprar"
              data-tooltip-html={
                nivelEmpresa.status
                  ? "Você já adquiriu esta licença"
                  : "Clique para comprar o upgrade deste nível"
              }
            >
              {nivelEmpresa.status ? "Comprado" : "Comprar"}
            </button>
          </div>

        </div>
      </div>

      {/* Tooltips globais */}
      <Tooltip id="tooltip-nivel-nome" style={tooltipStyle} />
      <Tooltip id="tooltip-nivel-liberacoes" style={tooltipStyle} />
      <Tooltip id="tooltip-nivel-desc" style={tooltipStyle} />
      <Tooltip id="tooltip-nivel-valor" style={tooltipStyle} />
      <Tooltip id="tooltip-nivel-comprar" style={tooltipStyle} />
    </div>
  );
};
