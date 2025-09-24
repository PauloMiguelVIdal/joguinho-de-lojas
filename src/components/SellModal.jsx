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
import circularEconomia from "../../public/outrasImagens/circular-economy.png"
import DolarImg from "../../public/outrasImagens/simbolo-do-dolar.png"
import licença from "../../public/outrasImagens/licença.png"
import { Localizador } from "./localizador";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { motion } from "framer-motion";
import fechar from "../../public/outrasImagens/fechar.png"
import mais from "../../public/outrasImagens/botao-de-simbolo-de-mais.png"
import menos from "../../public/outrasImagens/simbolo-de-menos.png"
import { Statistic } from './statistic'
import { Box, Grid, IconButton, Paper, Typography } from '@mui/material'
import { styled } from '@mui/system';


export const SellModal = ({ setor, index, onClose }) => {
  const { dados, atualizarDados, atualizarDadosProf,atualizarDadosProf2 } = useContext(CentraldeDadosContext);
  const { economiaSetores, setEconomiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);


  const setorAtivo = setor

  const economiaSetoresAtual = economiaSetores[setor].economiaSetor.estadoAtual

  const base = dados[setorAtivo].edificios[index]

  const qtdEd = base.quantidade

  const [quantidadeMarcador, setQuantidadeMarcador] = useState(1)

  const aumentarQuantidadeMarcador = () => {
    if (qtdEd === quantidadeMarcador) { return }
    setQuantidadeMarcador(quantidadeMarcador + 1)
  }

if(quantidadeMarcador>qtdEd){
  setQuantidadeMarcador(qtdEd)
}


  const diminuirQuantidadeMarcador = () => {
    if (quantidadeMarcador === 1) { return }
    setQuantidadeMarcador(quantidadeMarcador - 1)
  }
  const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

  function calcularCustoEdificio(setorAtivo, index, nivel = 1) {
    const base = dados[setorAtivo].edificios[index];
    if (!base) return 0;

    // custo direto da construção
    const custoConstrucaoRecurso = base.custoConstrucao || 0;

    // lojas necessárias
    const quantidadeTerrenosNec = base.lojasNecessarias?.terrenos || 0;
    const quantidadeLojasPNec = base.lojasNecessarias?.lojasP || 0;
    const quantidadeLojasMNec = base.lojasNecessarias?.lojasM || 0;
    const quantidadeLojasGNec = base.lojasNecessarias?.lojasG || 0;

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

    let custoTotalRecurso = custoConstrucaoRecurso + custoTotalTerrenos + custoTotalLojasP + custoTotalLojasM + custoTotalLojasG;

    // recursão para sub-recursos
    if (Array.isArray(base.recursoDeConstrução) && base.recursoDeConstrução.length > 0) {
      base.recursoDeConstrução.forEach(subRecurso => {
        // aqui preciso localizar o setor e index do recurso
        for (const setor of setoresArr) {
          const i = dados[setor]?.edificios?.findIndex(e => e.nome === subRecurso);
          if (i !== -1 && i !== undefined) {
            const custoSub = calcularCustoEdificio(setor, i, nivel + 1);
            custoTotalRecurso += custoSub;
            break;
          }
        }
      });
    }

    return custoTotalRecurso;
  }
  const percSetor = (setorAtivo) => {
    switch (setorAtivo) {
      case "recessão": return 20;
      case "declinio": return 25;
      case "estável": return 30;
      case "progressiva": return 35;
      case "aquecida": return 40;
    }
  }
  const patrimônioAtual = calcularCustoEdificio(setorAtivo, index)
  const patrimônioDepreciado = (patrimônioAtual * (percSetor(economiaSetoresAtual) / 100)).toFixed(2);
  
  const venderEdificio = () => {
    if(quantidadeMarcador > qtdEd){
      alert("Quantidade a ser vendida é maior que a quantidade disponível.")
      return
    }
    const novoValorQuantidadeEd  = qtdEd - quantidadeMarcador
atualizarDadosProf2([setorAtivo, "edificios", index, "quantidade"], novoValorQuantidadeEd);
atualizarEco("saldo",economiaSetores.saldo + (patrimônioDepreciado * quantidadeMarcador))
  }


  const formatarNumero = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(1).replace('.0', '') + 'T'; // Trilhões
    if (num >= 1e9) return (num / 1e9).toFixed(1).replace('.0', '') + 'B';   // Bilhões
    if (num >= 1e6) return (num / 1e6).toFixed(1).replace('.0', '') + 'M';   // Milhões
    if (num >= 1e3) return (num / 1e3).toFixed(1).replace('.0', '') + 'K';   // Milhares
    return num.toString();
  };


  const setores = [
    { id: "agricultura", corClasse: "bg-[#4CAF50]", img: agricultura, descLicença: "Com a Licença Global de Agricultura, você terá acesso a cultivos exclusivos, otimização de produções e melhorias que aumentarão sua rentabilidade. Liberte o potencial do setor agrícola agora mesmo!", cor1: "#003816", cor2: "#1A5E2A", cor3: "#0C9123", cor4: "#4CAF50", },
    { id: "tecnologia", corClasse: "bg-[#FF8C42]", img: tecnologia, descLicença: "Com a Licença Global de Tecnologia, você desbloqueia inovações que podem transformar sua infraestrutura, otimizar processos e maximizar os lucros. Invista no futuro agora!", cor1: "#A64B00 ", cor2: "#D45A00 ", cor3: "#FF6F00", cor4: "#FF8C42 ", },
    { id: "industria", corClasse: "bg-[#B3B3B3]", img: industria, descLicença: "Com a Licença Global de Indústria, você acessa fábricas avançadas e processos de produção que aceleram sua evolução e aumentam a eficiência. Não fique para trás!", cor1: "#1A1A1A ", cor2: "#4D4D4D  ", cor3: "#808080  ", cor4: "#B3B3B3", },
    { id: "comercio", corClasse: "bg-[#FF4D4D]", img: comercio, descLicença: "Com a Licença Global de Comércio, você tem acesso a novos mercados, estratégias de vendas e expansão que podem levar seus negócios a um novo nível. Não perca essa oportunidade!", cor1: "#660000  ", cor2: "#A31919  ", cor3: "#E60000", cor4: "#FF4D4D  ", },
    { id: "imobiliario", corClasse: "bg-[#6666FF]", img: imobiliario, descLicença: "Com a Licença Global Imobiliária, você pode investir em novos terrenos, expandir suas construções e maximizar os retornos do mercado imobiliário. Abra as portas para grandes lucros!", cor1: "#000066  ", cor2: "#1A1A8C  ", cor3: "#3333CC", cor4: "#6666FF  " },
    { id: "energia", corClasse: "bg-[#FFD966]", img: energia, descLicença: "Com a Licença Global de Energia, você ativa fontes de energia sustentáveis e de alta performance, garantindo uma operação eficiente e lucrativa. Potencialize seu setor energético agora!", cor1: "#665200   ", cor2: "#A37F19   ", cor3: "#E6B800", cor4: "#FFD966" },

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
  <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/90 ">
    <motion.div
      style={{
        background: `linear-gradient(135deg, ${setorInfo.cor1} 0%, ${setorInfo.cor4} 100%)`
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-[85vw] h-[80vh] p-[20px] gap-[20px] rounded-[20px] flex flex-col items-center relative shadow-2xl"
    >
      {/* Botão Fechar */}
      <button
        className="bg-laranja absolute top-[-20px] right-[-20px] w-[40px] h-[40px] flex justify-center items-center rounded-[10px] hover:bg-[#E56100] active:scale-95"
        onClick={onClose}
      >
        <img src={fechar} alt="Fechar" className="w-[60%]" />
      </button>

      {/* Cabeçalho */}
      <div
        style={{ backgroundColor: setorInfo.cor1 }}
        className="flex shadow-xl justify-center items-center w-[100%] h-[15%] rounded-[20px] self-center"
      >
        <h1 className="text-center text-white text-[40px] fonteBold">
          {dados[setorAtivo].edificios[index].nome}
        </h1>
      </div>

      {/* Corpo - 2 Colunas */}
      <div className="flex flex-1 w-full gap-6 mt-4">
        {/* ESQUERDA */}
        <div
          style={{ backgroundColor: setorInfo.cor3, opacity: 0.85 }}
          className="flex-1 rounded-[15px] p-6 text-white text-[22px] flex flex-col"
        >
          {/* CardLocalization que você tinha adicionado */}
        

          <p className="mb-6 leading-relaxed">
            A economia do setor{" "}
            <span className="fonteBold text-[#6A00FF]">{setor}</span> está{" "}
            <span className="fonteBold">{economiaSetoresAtual}</span>.
          </p>

          <p className="mb-6 leading-relaxed">
            O valor a ser pago será referente a{" "}
            <span className="text-[#6A00FF] fonteBold">
              {percSetor(economiaSetoresAtual)}%
            </span>{" "}
            do valor de mercado atual.
          </p>

          <div className="space-y-4">
            <p>
              Valor de mercado:{" "}
              <span className="fonteBold">
                {calcularCustoEdificio(setorAtivo, index)}
              </span>
            </p>
            <p>
              Valor ofertado:{" "}
              <span className="fonteBold">{patrimônioDepreciado}</span>
            </p>
            <p>
              Total:{" "}
              <span className="fonteBold text-[#6A00FF]">
                {patrimônioDepreciado * quantidadeMarcador}
              </span>
            </p>
          </div>
        </div>

        {/* DIREITA */}
        <div
          style={{ backgroundColor: setorInfo.cor2, opacity: 0.85 }}
          className="w-[260px] flex flex-col items-center justify-between rounded-[15px] p-6"
        >
            <div className="mb-6">{Localizador(dados[setorAtivo].edificios[index].nome)}</div>
          {/* Marcador com cores originais */}
          <Box display="flex" alignItems="center" className="mb-6">
            <IconButton
              onClick={diminuirQuantidadeMarcador}
              sx={{
                bgcolor: "#6411D9",
                width: 36,
                height: 36,
                borderRadius: "8px",
                "&:hover": { bgcolor: "#834EDB" }
              }}
            >
              <img src={menos} width={16} height={16} />
            </IconButton>

            <Box
              sx={{
                mx: 2,
                bgcolor: "#350973",
                width: 36,
                height: 36,
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Typography variant="body2" color="white" fontWeight="bold">
                {quantidadeMarcador}
              </Typography>
            </Box>

            <IconButton
              onClick={aumentarQuantidadeMarcador}
              sx={{
                bgcolor: "#6411D9",
                width: 36,
                height: 36,
                borderRadius: "8px",
                "&:hover": { bgcolor: "#834EDB" }
              }}
            >
              <img src={mais} width={16} height={16} />
            </IconButton>
          </Box>

          {/* Botão Vender */}
          <button
            onClick={venderEdificio}
            className="w-full py-3 bg-gradient-to-r from-[#6411D9] to-[#934CFF] text-white rounded-[12px] fonteBold hover:scale-105 transition duration-300 shadow-md"
          >
            Vender
          </button>
        </div>
      </div>
    </motion.div>
  </div>
);




}