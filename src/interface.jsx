import React, { useContext, lazy, Suspense, useState } from "react";
import Notificação from "./notificação.jsx";
import Informations from "./components/Informations.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Buttons from "./components/Buttons.jsx";
import Buy from "./components/buy.jsx";
import Day from "./components/day.jsx";
import finishGame from '../public/outrasImagens/finish.png'
import { CentraldeDadosContext } from "./centralDeDadosContext.jsx";
import DashboardDraft from "./components/DashboardDraft.jsx";
import { LicenceModalBusiness } from "./components/licenseButton.jsx";
import { BusinessLicenceModal } from "./components/BusinessLicenseModal.jsx";
import DashboardMiniDraft from "./components/DashboardMiniDrafts.jsx";
import { ModalShop } from "./components/ModalShop.jsx";
import LojaGImg from "../public/outrasImagens/lojaG.png";
import { PlusInventory } from "./components/PlusInventory.jsx";
// const PayTexes = lazy(() => import("./components/PayTexes.jsx"));
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
// const Mapworld = lazy(() => import("./components/MapWorld.jsx"));
const SidebarFinancas = lazy(() => import("./components/SidebarFinancas.jsx"));
import { PackOpening } from "./components/PackOpening.jsx";
import { PackOpeningDraft } from "./components/PackOpeningDraft.jsx";
import { ModalFalencia } from "./notificação.jsx";
import DisplayInformations from "./components/DisplayInformations.jsx";
// import { DraftSystem, useDraftSystem, DraftButton } from "./components/DraftSystem";

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
  const { dados, atualizarDados } = useContext(CentraldeDadosContext)
  const vision = dados.vision.visionAtual

  const [modalFalenciaOpen, setModalFalenciaOpen] = useState(false);

  // ── Visibilidade das camadas ──────────────────────────────
  const [sidebarEsqAberta, setSidebarEsqAberta] = useState(false);
  const [dashboardAberto, setDashboardAberto] = useState(true);
  const [sidebarDirAberta, setSidebarDirAberta] = useState(true);
  const [businessLicenceModal, setBusinessLicenceModal] = useState(false);

  const [modalShopOpen, setModalShopOpen] = useState(false);
  const jogoIniciado = dados.jogoIniciado || false;
  const renderizando = dados.dia % 30 !== 0 || dados.dia === 0
  const ajusteLargura = renderizando 
  // || jogoIniciado

    // const { draftAberto, draftConcluido, cartasSelecionadas, abrirDraft, fecharDraft, handleComplete } = useDraftSystem();
  return (
    <Suspense fallback={<div className="w-screen h-screen bg-gray-900" />}>

      {/* ═══════════════════════════════════════════════════════
          MODAIS / OVERLAYS (z-index alto — acima de tudo)
      ════════════════════════════════════════════════════════ */}
      {modalFalenciaOpen && (
        <ModalFalencia
          onConfirmar={() => { limparSalvo(); window.location.reload(); }}
          onCancelar={() => setModalFalenciaOpen(false)}
        />
      )}
      {modalShopOpen && (
        <ModalShop onCancelar={() => setModalShopOpen(false)} />
      )}
      <InputName />
      <PackOpeningDraft onClose={() => setAbrirPack(false)} />

      {businessLicenceModal && (
        <BusinessLicenceModal
          onClose={() => setBusinessLicenceModal(false)}
          onSorteio={() => console.log('Sorteio realizado!')}
        />
      )}
          {/* {draftAberto && (
      <DraftSystem 
        onClose={fecharDraft}
        onComplete={handleComplete}
        numeroRodadasC={4}
        numeroRodadasB={1}
        quantidadeOpcoes={3}
      />
    )} */}

      {/* ═══════════════════════════════════════════════════════
          CAMADA 5 — TOPBAR (sempre sobrepõe tudo)
      ════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '80px',
          width: dados.dia<=240 ? '100vw' : '75vw',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 px',
          background: 'linear-gradient(180deg, #350973, #6411D9',
          borderBottom: '1px solid rgba(147,76,255,0.3)',
          boxShadow: '0 2px 5vh rgba(0,0,0,0.5)',
        }}
      >
        <div className="grid gap-[10px] col-start-1 col-end-8 w-full place-items-center">
          <Informations className="grid col-start-1 col-end-8" />
        </div>
        <div className="flex w-full items-center justify-center col-start-8 col-end-9 gap-[10px]">
          <Day />
          <button className="h-[50px] aspect-square bg-laranja rounded-[10px] flex items-center justify-center hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]"
            onClick={() => setModalShopOpen(true)}>
            <img className="w-[60%]" src={LojaGImg} alt="" />
          </button>
          <EconomyGlobal />
              {/* <DraftButton onOpen={abrirDraft} /> */}
          <SidebarFinancas onOpen={() => setBusinessLicenceModal(true)} />
          <Buttons />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          CAMADA 2 — DASHBOARD CENTRAL (DashboardMiniDraft)
      ════════════════════════════════════════════════════════ */}
      {dashboardAberto && (
        <div
          style={{
            position: 'fixed',
            height: '60vh',
            top: dados.dia<=240?'80px':'0px',
            right: '0',
            width: '25vw',
            zIndex: 20,
            borderRadius: 20,
            overflow: 'hidden',
            background: 'linear-gradient(to bottom, #6411D9, #350973)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
          }}
        >
          <DashboardMiniDraft />
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          PlusInventory - só renderiza se dashboardAberto for true
      ════════════════════════════════════════════════════════ */}
      {dashboardAberto && (
        <div
          style={{
            position: 'fixed',
            height: '20vh',
            bottom: '0px',
            right: '15vw',
            width: '10vw',
            zIndex: 20,
            borderRadius: 20,
            overflow: 'hidden',
            background: 'linear-gradient(to bottom, #6411D9, #350973)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
          }}
        >
          <PlusInventory />
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          DisplayInformations - só renderiza se dashboardAberto for true
      ════════════════════════════════════════════════════════ */}
      {dashboardAberto && (
        <div
          style={{
            position: 'fixed',
            top: '60vh',
            height: '24vh',
            maxHeight: '32vh',
            minHeight: '200px',
            width: '25vw',
            right: 0,
            zIndex: 20,
            borderRadius: 20,
            overflow: 'hidden',
            background: 'linear-gradient(to bottom, #6411D9, #350973)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
          }}
        >
          <DisplayInformations />
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          DashboardDraft (principal) - só renderiza se dashboardAberto for true
      ════════════════════════════════════════════════════════ */}
      {dashboardAberto && (
        <div
          style={{
            position: 'fixed',
            top: '80px',
            left: 0,
            height: 'calc(100vh - 80px)',
            width: '75vw',
            zIndex: 20,
            borderRadius: 20,
            overflow: 'hidden',
            background: 'linear-gradient(to bottom, #6411D9, #350973)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
          }}
        >
          {vision === "financas" ? (
            <PatrimonioInterface />
          ) : (
            <DashboardDraft />
          )}
        </div>
      )}

    </Suspense>
  )
}

export default Interface