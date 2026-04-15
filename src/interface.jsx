// Interface.jsx — refatorado com camadas independentes
import React, { useContext, lazy, Suspense, useState } from "react";
// import { CentraldeDadosContext } from "./centralDeDadosContext.jsx";

import Notificação from "./notificação.jsx";
import Informations from "./components/Informations.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Buttons from "./components/Buttons.jsx";
import Buy from "./components/buy.jsx";
import Day from "./components/day.jsx";
import { limparSalvo } from "./components/usePersistencia.js";
import finishGame from '../public/outrasImagens/finish.png'
import { LicenceModalBusiness } from "./components/licenseButton.jsx";
import { useCentralStore, EDIFICIOS_BASE_DINAMICOS, EDIFICIOS_FINAIS_DINAMICOS_INICIAL,LICENCAS_DINAMICAS_GLOBAIS } from "./stores/useCentralStore";
import {
  EDIFICIOS_FINAIS_ESTATICOS,
  LICENCAS_ESTATICAS,
  EDIFICIOS_BASE_ESTATICOS,
  LICENCAS_ESTATICAS_GLOBAIS,
} from "./stores/dadosEstáticos.js";




const PayTexes = lazy(() => import("./components/PayTexes.jsx"));
const ButtonChange = lazy(() => import("./components/ButtonChange.jsx"));
const Events = lazy(() => import("./components/events.jsx"));
const Employees = lazy(() => import("./components/employees.jsx"));
const Taxes = lazy(() => import("./components/Taxes.jsx"));
const Sorteio = lazy(() => import("./components/Sorteio.jsx"));
const ActiveEvents = lazy(() => import("./components/ActiveEvents.jsx"));
const MoreOptions = lazy(() => import("./components/MoreOptions.jsx"));
const Offers = lazy(() => import("./components/Offers.jsx"));
const EconomyGlobal = lazy(() => import("./components/EconomyGlobal.jsx"));
const InputName = lazy(() => import("./components/inputName.jsx"));
const Achievements = lazy(() => import("./components/Achievements.jsx").then(m => ({ default: m.Achievements })));
const Economys = lazy(() => import("./components/Economys.jsx"));
const RaffledBuildings = lazy(() => import("./components/RaffledBuildings.jsx"));
// const CardSpecials = lazy(() => import("./components/cardsSpecials.jsx").then(m => ({ default: m.CardSpecials })));
const TaxesYear = lazy(() => import("./components/TaxesYear.jsx").then(m => ({ default: m.TaxesYear })));
const ModalAlert = lazy(() => import("./components/ModalAlert.jsx"));
const PatrimonioInterface = lazy(() => import("./components/PatrimonioInterface.jsx"));
const NewStage = lazy(() => import("./components/NewStage.jsx"));
const ModalPerson = lazy(() => import("./components/ModalPerson.jsx"));
const ToggleButton = lazy(() => import("./components/ToggleButton.jsx"));
const InfoPage = lazy(() => import("./components/Info.jsx").then(m => ({ default: m.InfoPage })));
const ModalInfo = lazy(() => import("./components/ModalInfo.jsx"));
const UpgradeCards = lazy(() => import("./components/UpgradeCards.jsx"));
const StorageMonolithDemo = lazy(() => import("./components/StorageInterface.jsx"));
const MarketplaceSystem = lazy(() => import("./components/MarketInterface.jsx"));
const MercadoGlobal = lazy(() => import("./components/TablePrice.jsx").then(m => ({ default: m.MercadoGlobal })));
const ModalExcesso = lazy(() => import("./components/ModalExcesso.jsx"));
const SidebarStorage = lazy(() => import("./components/SidebarStorage.jsx"));
const SidebarFinancas = lazy(() => import("./components/SidebarFinancas.jsx"));
const Mapworld = lazy(() => import("./components/MapWorld.jsx"));

import { ModalFalencia } from "./notificação.jsx";

// Ícone de toggle simples (chevron)
const IconToggle = ({ aberto, horizontal = false }) => (
  <svg
    width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round"
    style={{
      transform: horizontal
        ? aberto ? 'rotate(180deg)' : 'rotate(0deg)'
        : aberto ? 'rotate(270deg)' : 'rotate(90deg)',
      transition: 'transform 0.25s ease',
    }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

function Interface() {
  // const { dados, atualizarDados } = useContext(CentraldeDadosContext)
  const vision = useCentralStore((s) => s.vision?.visionAtual ?? "dashboard");

  const [modalFalenciaOpen, setModalFalenciaOpen] = useState(false);

  // ── Visibilidade das camadas ──────────────────────────────
  const [sidebarEsqAberta, setSidebarEsqAberta] = useState(true);
  const [dashboardAberto, setDashboardAberto]   = useState(true);
  const [sidebarDirAberta, setSidebarDirAberta] = useState(true);

  // const setorAtivo = dados.setorAtivo

  // const setVision = (newVision) => {
  //   atualizarDados("vision", { ...dados.vision, visionAtual: newVision });
  // }

  // Altura da topbar para que as outras camadas não fiquem atrás dela
  const TOP_H = 64; // px — ajuste se a sua Informations tiver altura diferente

  return (
    <Suspense fallback={<div className="w-screen h-screen bg-gray-900" />}>

      {/* ═══════════════════════════════════════════════════════
          CAMADA 0 — MAPA (fundo fixo, ocupa tela toda)
      ════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
        }}
      >
        <Mapworld />
      </div>

      {/* ═══════════════════════════════════════════════════════
          MODAIS / OVERLAYS (z-index alto — acima de tudo)
      ════════════════════════════════════════════════════════ */}
      {modalFalenciaOpen && (
        <ModalFalencia
          onConfirmar={() => { limparSalvo(); window.location.reload(); }}
          onCancelar={() => setModalFalenciaOpen(false)}
        />
      )}
      <NewStage />
      <ModalExcesso />
      {/* <CardSpecials /> */}
      <InputName />
      <Offers />
      <Events />
      {/* <Employees /> */}
      <Notificação />
      <ModalAlert />
      <ModalPerson />
      <ModalInfo />

      {/* ═══════════════════════════════════════════════════════
          CAMADA 5 — TOPBAR (sempre sobrepõe tudo)
          Posição: fixa no topo, largura total
      ════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: TOP_H,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          background: 'linear-gradient(180deg, rgba(53,9,115,0.97) 0%, rgba(53,9,115,0.85) 100%)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(147,76,255,0.3)',
          boxShadow: '0 2px 20px rgba(0,0,0,0.5)',
        }}
      >
        {/* Informações centrais (nome empresa, saldo, dia...) */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Informations />
        </div>

        {/* Controles da direita */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Day />
          <TaxesYear />
          <EconomyGlobal />
          <RaffledBuildings />
          <LicenceModalBusiness />

          {/* Botão Falência */}
          <button
          className="h-[50px] relative aspect-square bg-laranja rounded-[10px] flex items-center justify-center"
            onClick={() => setModalFalenciaOpen(true)}
            data-tooltip-content="Declarar falência"
            style={{
              background: '#FF0000',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'transform 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img className="h-[70%] aspect-square" src={finishGame} alt="Falência" />
          </button>

          {/* Botão toggle Dashboard */}
          <button
            onClick={() => setDashboardAberto(v => !v)}
            title={dashboardAberto ? 'Ocultar painel' : 'Mostrar painel'}
            style={{
              background: dashboardAberto
                ? 'linear-gradient(135deg, #4C14A9, #6411D9)'
                : 'rgba(255,255,255,0.1)',
              border: dashboardAberto
                ? '1px solid rgba(199,159,255,0.4)'
                : '1px solid rgba(255,255,255,0.15)',
              borderRadius: 8,
              padding: '6px 10px',
              cursor: 'pointer',
              color: '#fff',
              display: 'flex', alignItems: 'center', gap: 5,
              fontSize: 11, fontWeight: 700,
              fontFamily: "'Rajdhani', sans-serif",
              letterSpacing: '.06em',
              transition: 'all 0.2s',
            }}
          >
            <IconToggle aberto={dashboardAberto} horizontal />
            Painel
          </button>

          {/* Botão toggle Sidebar Direita */}
          <button
            onClick={() => setSidebarDirAberta(v => !v)}
            title={sidebarDirAberta ? 'Ocultar sidebar direita' : 'Mostrar sidebar direita'}
            style={{
              background: sidebarDirAberta
                ? 'linear-gradient(135deg, #4C14A9, #6411D9)'
                : 'rgba(255,255,255,0.1)',
              border: sidebarDirAberta
                ? '1px solid rgba(199,159,255,0.4)'
                : '1px solid rgba(255,255,255,0.15)',
              borderRadius: 8,
              padding: '6px 10px',
              cursor: 'pointer',
              color: '#fff',
              display: 'flex', alignItems: 'center', gap: 5,
              fontSize: 11, fontWeight: 700,
              fontFamily: "'Rajdhani', sans-serif",
              letterSpacing: '.06em',
              transition: 'all 0.2s',
            }}
          >
            <IconToggle aberto={sidebarDirAberta} />
            Dados
          </button>

          <Buttons />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          CAMADA 3 — SIDEBAR ESQUERDA (Buy) — bg transparente
          Botão de toggle flutua na borda
      ════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'fixed',
          top: TOP_H,
          left: 0,
          bottom: 0,
          width: sidebarEsqAberta ? '20vw' : 0,
          zIndex: 30,
          overflow: 'hidden',
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Conteúdo com backdrop-blur para "ver" o mapa atrás */}
        <div
          style={{
            width: '20vw', // largura real sempre 20vw, o pai que oclui
            height: '100%',
            background: 'rgba(30, 8, 60, 0.55)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRight: '1px solid rgba(147,76,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Buy />
        </div>
      </div>

      {/* Botão toggle da sidebar esquerda — flutua na borda */}
      <button
        onClick={() => setSidebarEsqAberta(v => !v)}
        title={sidebarEsqAberta ? 'Ocultar sidebar' : 'Mostrar sidebar'}
        style={{
          position: 'fixed',
          top: '50%',
          left: sidebarEsqAberta ? 'calc(20vw - 1px)' : 0,
          transform: 'translateY(-50%)',
          zIndex: 35,
          background: 'linear-gradient(135deg, #4C14A9, #6411D9)',
          border: '1px solid rgba(199,159,255,0.35)',
          borderLeft: sidebarEsqAberta ? 'none' : '1px solid rgba(199,159,255,0.35)',
          borderRadius: sidebarEsqAberta ? '0 8px 8px 0' : '0 8px 8px 0',
          width: 20,
          height: 60,
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'rgba(255,255,255,0.7)',
          transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '2px 0 12px rgba(0,0,0,0.3)',
        }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: sidebarEsqAberta ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s' }}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* ═══════════════════════════════════════════════════════
          CAMADA 2 — DASHBOARD CENTRAL
          Flutua entre as sidebars
      ════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'fixed',
          top: TOP_H + 8,
          // Respeita a sidebar esquerda se estiver aberta
          left: sidebarEsqAberta ? 'calc(20vw + 8px)' : 8,
          // Respeita a sidebar direita se estiver aberta
          right: sidebarDirAberta ? 'calc(20vw + 8px)' : 8,
          bottom: 8,
          zIndex: 20,
          borderRadius: 20,
          overflow: 'hidden',
          transition: 'left 0.3s cubic-bezier(0.4,0,0.2,1), right 0.3s cubic-bezier(0.4,0,0.2,1)',
          // Quando fechado, reduz opacidade e escala
          opacity: dashboardAberto ? 1 : 0,
          pointerEvents: dashboardAberto ? 'auto' : 'none',
          transform: dashboardAberto ? 'scale(1)' : 'scale(0.97)',
          transformOrigin: 'top center',
          background: 'linear-gradient(to bottom, #6411D9, #350973)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
        }}
      >
        {vision === "financas" ? (
          <PatrimonioInterface />
        ) : (
          <Dashboard />
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════
          CAMADA 3 — SIDEBAR DIREITA
      ════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'fixed',
          top: TOP_H,
          right: 0,
          bottom: 0,
          width: sidebarDirAberta ? '20vw' : 0,
          zIndex: 30,
          overflow: 'hidden',
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div
          style={{
            width: '20vw',
            height: '100%',
            background: 'rgba(20, 6, 50, 0.65)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderLeft: '1px solid rgba(147,76,255,0.2)',
            paddingTop: 30,
            overflow: 'hidden',
          }}
        >
          <SidebarFinancas />
        </div>
      </div>

      {/* Botão toggle da sidebar direita — flutua na borda */}
      <button
        onClick={() => setSidebarDirAberta(v => !v)}
        title={sidebarDirAberta ? 'Ocultar dados' : 'Mostrar dados'}
        style={{
          position: 'fixed',
          top: '50%',
          right: sidebarDirAberta ? 'calc(20vw - 1px)' : 0,
          transform: 'translateY(-50%)',
          zIndex: 35,
          background: 'linear-gradient(135deg, #4C14A9, #6411D9)',
          border: '1px solid rgba(199,159,255,0.35)',
          borderRadius: '8px 0 0 8px',
          width: 20,
          height: 60,
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'rgba(255,255,255,0.7)',
          transition: 'right 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '-2px 0 12px rgba(0,0,0,0.3)',
        }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: sidebarDirAberta ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.25s' }}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

    </Suspense>
  )
}

export default Interface