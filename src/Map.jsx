import { useState, useEffect, useContext } from "react";
import lote from "../public/outrasImagens/lote.png";
import lote2 from "../public/outrasImagens/lote2.png";
import buildingA from "../public/outrasImagens/building-a.png";
import buildingB from "../public/outrasImagens/building-b.png";
import buildingC from "../public/outrasImagens/building-c.png";
import plantacaoDeGraosImg from "../public/outrasImagens/Plantação De Grãos.png";
import { CentraldeDadosContext } from "./centralDeDadosContext";

export default function Map() {
  const { dados } = useContext(CentraldeDadosContext);

  const tileWidth = 64;
  const tileHeight = 32;
  const mapSize = 30;

  // mapa fixo inicial
  const initialMap = Array.from({ length: mapSize }, (_, i) =>
    Array.from({ length: mapSize }, (_, j) => ({
      terreno: Math.random() < 0.5 ? "lote" : "lote2",
      edificio: "empty",
      pos: [i, j], // <- posição fixa
    }))
  );

  const [map, setMap] = useState(initialMap);
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // câmera

  const terrenos = { lote, lote2 };
  const tiles = { house: buildingA, factory: buildingB, store: buildingC };

  // compra fixa (não resorteia posições antigas)
  function comprarEdificio(tipo) {
    setMap(prev => {
      // procura terrenos vazios
      const vazios = [];
      prev.forEach((row, i) =>
        row.forEach((cell, j) => {
          if (cell.edificio === "empty") vazios.push([i, j]);
        })
      );

      if (vazios.length === 0) return prev;

      // escolhe um vazio aleatório
      const [i, j] = vazios[Math.floor(Math.random() * vazios.length)];

      // clona e atualiza o mapa
      const novoMapa = prev.map(row => row.map(cell => ({ ...cell })));
      novoMapa[i][j].edificio = tipo;

      return novoMapa;
    });
  }
  //               <div className="flex-1 w-full rounded-[20px] flex flex-col">


//               <div className="relative flex justify-center items-center">
//                 {/* Terreno (solo) em forma de losango (como uma imagem) */}
//                 <img
//                   src={solo}
//                   alt="Terreno"
//                   className="w-[100%] h-auto" // A imagem do solo já tem a forma de losango
//                 />

//                 {/* Prédio */}
//                 <div className="absolute bottom-[-300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//                   <img
//                     src={buildBusiness}
//                     alt="Prédio"
//                     className="w-[500px] h-auto"
//                   />
//                 </div>
//               </div>
// </div>

  // efeito de compra automática pela lógica do contexto
  useEffect(() => {
    if (dados.agricultura.edificios[0].quantidade > 0) {
      // conta quantas plantações já existem no mapa
      const qtdPlantacoes = map.flat().filter(c => c.edificio === "plantacao").length;

      // só adiciona se ainda não tiver todas
      if (qtdPlantacoes < dados.agricultura.edificios[0].quantidade) {
        comprarEdificio("plantacao");
      }
    }
  }, [dados.agricultura.edificios[0].quantidade, map]);

  // movimentação da câmera com o mouse
  useEffect(() => {
    function handleMouseMove(e) {
      const margin = 50; // px de margem da tela
      const speed = 20;

      if (e.clientX < margin) {
        setOffset(prev => ({ ...prev, x: prev.x + speed }));
      } else if (e.clientX > window.innerWidth - margin) {
        setOffset(prev => ({ ...prev, x: prev.x - speed }));
      }

      if (e.clientY < margin) {
        setOffset(prev => ({ ...prev, y: prev.y + speed }));
      } else if (e.clientY > window.innerHeight - margin) {
        setOffset(prev => ({ ...prev, y: prev.y - speed }));
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-[100vw] h-[100vh] bg-green-200 overflow-hidden">
      {/* botões de compra */}
      <div className="absolute top-2 left-2 z-50 flex gap-2">
        <button onClick={() => comprarEdificio("house")}>Comprar Casa</button>
        <button onClick={() => comprarEdificio("factory")}>Comprar Fábrica</button>
        <button onClick={() => comprarEdificio("store")}>Comprar Loja</button>
        <button onClick={() => comprarEdificio("plantacao")}>
          Comprar Plantação
        </button>
      </div>


      
      {map.map((row, i) =>
        row.map((cell, j) => {
          const isoX = (j - i) * (tileWidth / 2) + 500 + offset.x;
          const isoY = (j + i) * (tileHeight / 2) + offset.y;

          return (
            <div key={`${cell.pos[0]}-${cell.pos[1]}`} className="absolute" style={{ left: isoX, top: isoY }}>
              {/* terreno */}
              <img
                src={terrenos[cell.terreno]}
                alt={cell.terreno}
                style={{
                  width: tileWidth,
                  height: tileHeight,
                  zIndex: isoY,
                }}
              />

              {/* plantação */}
              {cell.edificio === "plantacao" && (
                <img
                  src={plantacaoDeGraosImg}
                  alt="plantacao"
                  style={{
                    width: tileWidth / 2, // reduzido 50%
                    height: tileHeight,
                    position: "absolute",
                    top: -tileHeight / 2,
                    left: tileWidth / 4,
                    zIndex: isoY + 2,
                  }}
                />
              )}

              {/* edifícios comuns */}
              {cell.edificio !== "empty" &&
                cell.edificio !== "plantacao" && (
                  <img
                    src={tiles[cell.edificio]}
                    alt={cell.edificio}
                    style={{
                      width: tileWidth,
                      height: tileHeight * 2,
                      position: "absolute",
                      top: -tileHeight,
                      zIndex: isoY + 1,
                    }}
                  />
                )}
            </div>
          );
        })
      )}
    </div>
  );
}
