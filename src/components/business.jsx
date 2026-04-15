import React, { useEffect, useContext } from "react";
import acordo from "../../public/outrasImagens/negocios-internacionais.png";
// import { CentraldeDadosContext } from "../centralDeDadosContext";

// Tooltip
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useCentralStore, EDIFICIOS_BASE_DINAMICOS, EDIFICIOS_FINAIS_DINAMICOS_INICIAL,LICENCAS_DINAMICAS_GLOBAIS } from "../stores/useCentralStore";
import {
  EDIFICIOS_FINAIS_ESTATICOS,
  LICENCAS_ESTATICAS,
  EDIFICIOS_BASE_ESTATICOS,
  LICENCAS_ESTATICAS_GLOBAIS,
} from "../stores/dadosEstáticos";


export default function Business() {
  // const { dados, atualizarDados } = useContext(CentraldeDadosContext);

  const atualizarDados = useCentralStore((s) => s.atualizarDados);
  const dia = useCentralStore((s) => s.dia);
  const modalOfertas = useCentralStore((s) => s.modalOfertas);
  const modalDespesas = useCentralStore((s) => s.modalDespesas);
  const botãoOfertas = useCentralStore((s) => s.botãoOfertas);
  const proximaOferta = useCentralStore((s) => s.proximaOferta);

  const abrirModal = () => {
    if (dia < 30) return;
    atualizarDados('modalOfertas', { ...modalOfertas, estadoModal: true });
  };

  const abrirModalNotificado = () => {
    if (dia < 30) return;
    atualizarDados('modalOfertas', { ...modalOfertas, estadoModal: true });
    atualizarDados("botãoOfertas", "btnNormal");
  };

  useEffect(() => {
    const proximoDiaChegar = (n) => ((n % 30 === 0 ? n : n + (30 - (n % 30))) - dia);
    const proximoDia = proximoDiaChegar(dia);
    atualizarDados("proximaOferta", proximoDia);
  }, [dia]);

  useEffect(() => {
    atualizarDados("botãoOfertas", "btnNoti");
    if (dia < 30) atualizarDados("botãoOfertas", "btnNormal");
  }, [modalDespesas]);

  const tooltipContent =
    dia < 30
      ? "Ofertas disponíveis a partir do dia 30"
      : botãoOfertas === "btnNoti"
        ? `Clique para abrir as ofertas <br/><br/>
        <div>
          <p>Depreciação conforme economia:</p>
          <ul style="margin-left:10px;">
            <li><b>Recessão:</b> 35% - 40%</li>
            <li><b>Declínio:</b> 27% - 32%</li>
            <li><b>Estável:</b> 15% - 25%</li>
            <li><b>Progressiva:</b> 7% - 12%</li>
            <li><b>Aquecida:</b> 1% - 5%</li>
          </ul>
        </div>`
        : "Clique para abrir as ofertas";


  return (
    <div className="relative">
      {/* 🔘 BOTÃO PADRÃO */}
      <button
        data-tooltip-id="ofertas-tip"
        {...(botãoOfertas === "btnNoti"
          ? { "data-tooltip-html": tooltipContent }
          : { "data-tooltip-content": tooltipContent })}
        onClick={
          botãoOfertas === "btnNoti"
            ? abrirModalNotificado
            : abrirModal
        }
        className={`
          h-[50px] aspect-square rounded-[10px]
          flex items-center justify-center
          transition-all duration-200
          ${dia < 30
            ? "bg-[#F4CCB6]"
            : "bg-laranja hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]"
          }
        `}
      >
        <img className="h-[70%] aspect-square" src={acordo} />
      </button>

      {/* 🔔 BADGE (notificação) */}
      {botãoOfertas === "btnNoti" && dia >= 30 && (
        <div className="absolute bottom-[-2px] right-[-2px]">
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-white"></span>
          </span>
        </div>
      )}

      {/* ⏱️ CONTADOR (pequeno, opcional mas recomendado) */}
      {dia < 30 && (
        <div className="absolute -top-2 -right-2 bg-[#290064] text-white text-[10px] px-1 rounded">
          {proximaOferta}
        </div>
      )}

      {/* Tooltip */}
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
