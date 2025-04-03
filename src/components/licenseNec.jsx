import React, { useContext, useEffect, useState } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import agricultura from "./setores/agricultura.png"
import tecnologia from "./setores/tecnologia.png"
import comercio from "./setores/comercio.png"
import industria from "./setores/industria.png"
import imobiliario from "./setores/Imobiliário.png"
import energia from "./setores/torre-eletrica.png"
import grafico from "./setores/grafico.png"


export default function LicenseNec() {
  const { dados, AtualizarDados } = useContext(CentraldeDadosContext);





  const setores = [
    { id: "agricultura", cor3: "#0C9123", corClasse: "bg-[#4CAF50]", img: agricultura, descLicença: "Com a Licença Global de Agricultura, você terá acesso a cultivos exclusivos, otimização de produções e melhorias que aumentarão sua rentabilidade. Liberte o potencial do setor agrícola agora mesmo!", cor1: "#003816", cor2: "#1A5E2A", cor3: "#0C9123", cor4: "#4CAF50", },
    { id: "tecnologia", cor3: "#FF6F00 ", corClasse: "bg-[#FF8C42]", img: tecnologia, descLicença: "Com a Licença Global de Tecnologia, você desbloqueia inovações que podem transformar sua infraestrutura, otimizar processos e maximizar os lucros. Invista no futuro agora!", cor1: "#A64B00 ", cor2: "#D45A00 ", cor3: "#FF6F00 ", cor4: "#FF8C42 ", },
    { id: "industria", cor3: "#808080  ", corClasse: "bg-[#B3B3B3]", img: industria, descLicença: "Com a Licença Global de Indústria, você acessa fábricas avançadas e processos de produção que aceleram sua evolução e aumentam a eficiência. Não fique para trás!", cor1: "#1A1A1A ", cor2: "#4D4D4D  ", cor3: "#808080  ", cor4: "#B3B3B3  ", },
    { id: "comercio", cor3: "#E60000  ", corClasse: "bg-[#FF4D4D]", img: comercio, descLicença: "Com a Licença Global de Comércio, você tem acesso a novos mercados, estratégias de vendas e expansão que podem levar seus negócios a um novo nível. Não perca essa oportunidade!", cor1: "#660000  ", cor2: "#A31919  ", cor3: "#E60000  ", cor4: "#FF4D4D  ", },
    { id: "imobiliario", cor3: "#3333CC  ", corClasse: "bg-[#6666FF]", img: imobiliario, descLicença: "Com a Licença Global Imobiliária, você pode investir em novos terrenos, expandir suas construções e maximizar os retornos do mercado imobiliário. Abra as portas para grandes lucros!", cor1: "#000066  ", cor2: "#1A1A8C  ", cor3: "#3333CC  ", cor4: "#6666FF  " },
    { id: "energia", cor3: "#E6B800", corClasse: "bg-[#FFD966]", img: energia, descLicença: "Com a Licença Global de Energia, você ativa fontes de energia sustentáveis e de alta performance, garantindo uma operação eficiente e lucrativa. Potencialize seu setor energético agora!", cor1: "#665200   ", cor2: "#A37F19   ", cor3: "#E6B800", cor4: "#FFD966" },
    { id: "grafico", cor3: "#FF6F00 ", corClasse: "bg-[#6A00FF]", img: grafico, cor1: "#6A00FF ", cor2: "#6A00FF ", cor3: "#6A00FF ", cor4: "#6A00FF ", },
  ];

  //   const getImageUrl = (nomeArquivo) => `/imagens/${nomeArquivo}.png`;
  const getImageUrl = (nomeArquivo) => `../../public/imagens/${nomeArquivo}.png`;
  const setorAtivo = dados.setorAtivo
  const setorInfo = setores.find(setor => setor.id === setorAtivo);
  console.log(setorInfo)


  const edificio = { nome: dados[setorAtivo].edificios[0].nome, licenseNece: dados[setorAtivo].edificios[0].licençasNecessárias };
  const arrayLicenseNece = edificio.licenseNece


  return (
    <div className="flex flex-col justify-start gap-[5px] w-full h-[80%] items-center">
      {arrayLicenseNece.map((nomeEdificio) => (
        <div className="w-full flex justify-between h-[20%]">
          <div
            key={nomeEdificio}
            style={{ backgroundColor: setorInfo.cor1 }}
            className="w-[20%] flex items-center justify-center aspect-square rounded-[20px]"
          >
            <div style={{ backgroundColor: setorInfo.cor3 }} className="flex items-center justify-center h-[95%] aspect-square rounded-[20px]">

              <div style={{ backgroundColor: setorInfo.cor1 }} className="flex items-center justify-center h-[95%] aspect-square rounded-[20px]">

                <div style={{ backgroundColor: setorInfo.cor2 }} className="flex items-center justify-center h-[95%] aspect-square rounded-[30px]">

                  <div style={{ background: `linear-gradient(135deg, ${setorInfo.cor1} 0%,${setorInfo.cor4}  100%)` }} className="flex items-center justify-center relative h-[95%] aspect-square rounded-[60px]">
                    <img
                      className="h-[70%] w-[] aspect-square"
                      src={getImageUrl(nomeEdificio)}
                      alt={nomeEdificio}
                    />
                    <div className="absolute bottom-[-2px] right-[-2px]">
  <span className="relative flex size-2">
    <span className="absolute inline-flex h-full w-full rounded-full bg-[#FFFFFF] opacity-75"></span>
    <span className="relative inline-flex size-2 rounded-full bg-[#FFFFFF]"></span>
  </span>
</div>
                  </div>
                </div>
              </div>
            </div>








          </div>
          <div
            key={nomeEdificio}
            style={{ backgroundColor: setorInfo.cor3 }}
            className="w-[75%] flex items-center justify-center aspect-square rounded-[10px] p-[10px]"
          >
            <h1 className="text-white text-[12px] fonteBold">{nomeEdificio}</h1>
          </div>
        </div>

      ))}
    </div>
  )
}