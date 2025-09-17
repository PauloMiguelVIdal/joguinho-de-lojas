import React, { useEffect, useContext } from "react";
import acordo from "../imagens/negocios-internacionais.png";
import { CentraldeDadosContext } from "../centralDeDadosContext";

// Tooltip
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function Business() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext);

    const abrirModal = () => {
        if (dados.dia < 30) return;
        atualizarDados('modalOfertas', { ...dados.modalOfertas, estadoModal: true });
    };

    const abrirModalNotificado = () => {
        if (dados.dia < 30) return;
        atualizarDados('modalOfertas', { ...dados.modalOfertas, estadoModal: true });
        atualizarDados("botãoOfertas", "btnNormal");
    };

    useEffect(() => {
        const proximoDiaChegar = (n) => ((n % 30 === 0 ? n : n + (30 - (n % 30))) - dados.dia);
        const proximoDia = proximoDiaChegar(dados.dia);
        atualizarDados("proximaOferta", proximoDia);
    }, [dados.dia]);

    useEffect(() => {
        atualizarDados("botãoOfertas", "btnNoti");
        if (dados.dia < 30) atualizarDados("botãoOfertas", "btnNormal");
    }, [dados.modalDespesas.estadoModal]);

    if (dados.dia < 30) {
        return (
            <div className="flex bg-[#290064] w-full rounded-[10px] relative">
                <div className="flex justify-center items-center w-full rounded-[10px]">
                    <h2 className={`text-white text-[20px] fonteBold`}>{dados.proximaOferta}</h2>
                </div>
                <button
                    data-tooltip-id="ofertas-tip"
                    data-tooltip-content="Ofertas disponíveis a partir do dia 30"
                    className="w-[50%] max-w-[70px] h-full min-h-[50px] aspect-square bg-[#F4CCB6] rounded-[10px] flex items-center justify-center"
                    onClick={abrirModalNotificado}
                >
                    <img className="h-[70%] aspect-square" src={acordo} />
                </button>

                <Tooltip
                    id="ofertas-tip"
                    style={{
                        backgroundColor: "#FFFFFF",
                        color: "#350973",
                        border: "1px solid #350973",
                        borderRadius: "6px",
                        padding: "6px 10px",
                        fontWeight: "600",
                        fontSize: "14px",
                    }}
                />
            </div>
        );
    } else if (dados.botãoOfertas === "btnNoti") {
        return (
            <div className="flex bg-[#290064] w-full rounded-[10px] relative">
                <div className="flex justify-center items-center w-full rounded-[10px]">
                    <h2 className={`text-white text-[20px] fonteBold`}>{dados.proximaOferta}</h2>
                </div>
                <button
                    data-tooltip-id="ofertas-tip"

                    data-tooltip-html={`Clique para abrir as ofertas <br/> <br/>    <div>
      <p>O valor de depreciação das ofertas varia de acordo com a economia global:</p>
      <ul style={{ marginLeft: "15px", marginTop: "5px" }}>
        <li><b>Recessão:</b> 35% - 40% de depreciação</li>
        <li><b>Declínio:</b> 27% - 32% de depreciação</li>
        <li><b>Estável:</b> 15% - 25% de depreciação</li>
        <li><b>Progressiva:</b> 7% - 12% de depreciação</li>
        <li><b>Aquecida:</b> 1% - 5% de depreciação</li>
      </ul>
    </div>`}
                    className="w-[50%] max-w-[70px] h-full min-h-[50px] aspect-square bg-laranja rounded-[10px] flex items-center justify-center hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]"
                    onClick={abrirModalNotificado}
                >
                    <img className="max-w-[58px] h-[70%] aspect-square" src={acordo} />
                </button>
                <div className="absolute bottom-[-2px] right-[-2px]">
                    <span className="relative flex size-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex size-3 rounded-full bg-white"></span>
                    </span>
                </div>

                <Tooltip
                    id="ofertas-tip"
                    style={{
                        backgroundColor: "#FFFFFF",
                        color: "#350973",
                        border: "1px solid #350973",
                        borderRadius: "6px",
                        padding: "6px 10px",
                        fontWeight: "600",
                        fontSize: "14px",
                    }}
                />
            </div>
        );
    } else {
        return (
            <div className="flex bg-[#290064] w-full rounded-[10px] relative">
                <div className="flex justify-center items-center w-full rounded-[10px]">
                    <h2 className={`text-white text-[20px] fonteBold`}>{dados.proximaOferta}</h2>
                </div>
                <button
                    data-tooltip-id="ofertas-tip"
                    data-tooltip-content="Clique para abrir as ofertas"
                    className="w-[50%] max-w-[70px] h-full min-h-[50px] aspect-square bg-laranja rounded-[10px] flex items-center justify-center hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]"
                    onClick={abrirModal}
                >
                    <img className="max-w-[58px] h-[70%] aspect-square" src={acordo} />
                </button>

                <Tooltip
                    id="ofertas-tip"
                    style={{
                        backgroundColor: "#FFFFFF",
                        color: "#350973",
                        border: "1px solid #350973",
                        borderRadius: "6px",
                        padding: "6px 10px",
                        fontWeight: "600",
                        fontSize: "14px",
                    }}
                />
            </div>
        );
    }
}
