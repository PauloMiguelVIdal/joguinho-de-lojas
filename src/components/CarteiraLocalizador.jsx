import React, { useContext,useEffect } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { CardLocalization } from "./cardLocalization";
import { Localizador } from "./localizador";
import agricultura from "./setores/agricultura.png"
import tecnologia from "./setores/tecnologia.png"
import comercio from "./setores/comercio.png"
import industria from "./setores/industria.png"
import imobiliario from "./setores/Imobiliário.png"
import energia from "./setores/torre-eletrica.png"
import grafico from "./setores/grafico.png"

export const CarteiraLocalizador = (edificioProcurado) => {
  const { dados,atualizarDados } = useContext(CentraldeDadosContext);

  const setores = [
    { id: "agricultura", cor3: "#0C9123", corClasse: "bg-[#4CAF50]", img: agricultura, descLicença: "Com a Licença Global de Agricultura, você terá acesso a cultivos exclusivos, otimização de produções e melhorias que aumentarão sua rentabilidade. Liberte o potencial do setor agrícola agora mesmo!", cor1: "#003816", cor2: "#1A5E2A", cor3: "#0C9123", cor4: "#4CAF50", },
    { id: "tecnologia", cor3: "#FF6F00 ", corClasse: "bg-[#FF8C42]", img: tecnologia, descLicença: "Com a Licença Global de Tecnologia, você desbloqueia inovações que podem transformar sua infraestrutura, otimizar processos e maximizar os lucros. Invista no futuro agora!", cor1: "#A64B00 ", cor2: "#D45A00 ", cor3: "#FF6F00 ", cor4: "#FF8C42 ", },
    { id: "industria", cor3: "#808080  ", corClasse: "bg-[#B3B3B3]", img: industria, descLicença: "Com a Licença Global de Indústria, você acessa fábricas avançadas e processos de produção que aceleram sua evolução e aumentam a eficiência. Não fique para trás!", cor1: "#1A1A1A ", cor2: "#4D4D4D  ", cor3: "#808080  ", cor4: "#B3B3B3  ", },
    { id: "comercio", cor3: "#E60000  ", corClasse: "bg-[#FF4D4D]", img: comercio, descLicença: "Com a Licença Global de Comércio, você tem acesso a novos mercados, estratégias de vendas e expansão que podem levar seus negócios a um novo nível. Não perca essa oportunidade!", cor1: "#660000  ", cor2: "#A31919  ", cor3: "#E60000  ", cor4: "#FF4D4D  ", },
    { id: "imobiliario", cor3: "#3333CC  ", corClasse: "bg-[#6666FF]", img: imobiliario, descLicença: "Com a Licença Global Imobiliária, você pode investir em novos terrenos, expandir suas construções e maximizar os retornos do mercado imobiliário. Abra as portas para grandes lucros!", cor1: "#000066  ", cor2: "#1A1A8C  ", cor3: "#3333CC  ", cor4: "#6666FF  " },
    { id: "energia", cor3: "#E6B800", corClasse: "bg-[#FFD966]", img: energia, descLicença: "Com a Licença Global de Energia, você ativa fontes de energia sustentáveis e de alta performance, garantindo uma operação eficiente e lucrativa. Potencialize seu setor energético agora!", cor1: "#665200   ", cor2: "#A37F19   ", cor3: "#E6B800", cor4: "#FFD966" },
    { id: "grafico", cor3: "#FF6F00 ", corClasse: "bg-[#6A00FF]", img: grafico, cor1: "#6A00FF ", cor2: "#6A00FF ", cor3: "#6A00FF ", cor4: "#6A00FF ", },
  ];

  let setorEncontrado = null;
  let arrFiltrado = "";
  let indice = -1
  const carteiraArr = []
  const nomesFiltrados = []
  const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];
  for (const setor of setoresArr) {
    setorEncontrado = setor;

    arrFiltrado = dados[setor].edificios.filter(ed => ed.quantidade > 0 ? ed.nome : "");
    arrFiltrado.forEach((e) => nomesFiltrados.push(e.nome))

    const testeNomes = arrFiltrado.forEach(nomeEd => {
      indice = dados[setorEncontrado].edificios.findIndex(ed => ed.nome === nomeEd)
    }
    )
    console.log(nomesFiltrados)


    console.log(arrFiltrado)
    console.log(setorEncontrado)
    // console.log(edificio)
    carteiraArr.push(arrFiltrado)
    console.log("essa é a carteira atual", carteiraArr)

    // useEffect(() => {
    //   let faturamentoTotalDiario = 0;
    //   const novaCarteira = [];
    
    //   setoresArr.forEach((setor) => {
    //     const edificiosNoSetor = dados[setor]?.edificios || [];
    
    //     // Filtra apenas os edifícios com quantidade > 0
    //     const edificiosAtivos = edificiosNoSetor.filter((ed) => ed.quantidade > 0);
    
    //     // Armazena os edifícios da carteira
    //     novaCarteira.push(edificiosAtivos);
    
    //     // Soma o faturamento diário desses edifícios
    //     edificiosAtivos.forEach((ed) => {
    //       const faturamentoUnitario = ed?.finanças?.faturamentoUnitário || 0;
    //       const quantidade = ed.quantidade || 0;
    
    //       faturamentoTotalDiario += faturamentoUnitario * quantidade;
    //     });
    //   });
    
    //   console.log("Carteira atual:", novaCarteira);
    //   console.log("Faturamento diário total:", faturamentoTotalDiario);
    
    //   // Atualiza o saldo com o faturamento diário total
    //   atualizarDados("saldo", dados.saldo + faturamentoTotalDiario);
    // }, [dados.dia]); // Executa todo dia
    






    // carteiraArr.forEach(nomeEd => 
    //    = dados[setorAtivo].edificios.find(ed => ed.nome === nomeEd);
    // });
  }
  const setorInfo = setores.find(setor => setor.id === setorEncontrado);




  return (
    <div className="w-full gap-y-[20px] grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] h-[400px]  ">
      {nomesFiltrados.map(e =>
        Localizador(e)
      )}
    </div>

  );
};