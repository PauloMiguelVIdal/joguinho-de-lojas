import React, { useContext, useCallback, lazy, Suspense, useEffect, useState } from "react";
import Notificação from "./notificação.jsx";
import Informations from "./components/Informations.jsx";
// import Dashboard from "./components/Dashboard.jsx";
import Buttons from "./components/Buttons.jsx";
import Buy from "./components/buy.jsx";
import Day from "./components/day.jsx";
import finishGame from '../public/outrasImagens/finish.png';
import { CentraldeDadosContext } from "./centralDeDadosContext.jsx";
import DashboardDraft from "./components/DashboardDraft.jsx";
import { LicenceModalBusiness } from "./components/licenseButton.jsx";
import { BusinessLicenceModal } from "./components/BusinessLicenseModal.jsx";
import DashboardMiniDraft from "./components/DashboardMiniDrafts.jsx";
import { ModalShop } from "./components/ModalShop.jsx";
import LojaGImg from "../public/outrasImagens/lojaG.png";
import { PlusInventory } from "./components/PlusInventory.jsx";
import ObjectiveTracker from "./components/ObjetiveTracker.jsx";
import { SystemTurn } from "./components/SystemTurn.jsx";
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
import { ModalCartasRecebidas } from "./components/ModalCartasRecebidas.jsx";
import { PackOpeningWithRarity } from "./components/PackOpeningWithRarity.jsx";
import RelatorioFinal from "./components/RelatorioFinal.jsx";

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

  // ─── ESTADO PARA O PACOTE ──────────────────────────────────
  const [packModalOpen, setPackModalOpen] = useState(false);
  const [packRaridade, setPackRaridade] = useState(null);

  const handlePackReceived = useCallback((raridade = null) => {
    setPackRaridade(raridade);
    setPackModalOpen(true);
  }, []);

  const handlePackClose = useCallback(() => {
    setPackModalOpen(false);
    setPackRaridade(null);
  }, []);

  const [showRelatorio, setShowRelatorio] = useState(false);

  useEffect(() => {
    if (dados.dia >= 360 && !showRelatorio) {
      setShowRelatorio(true);
    }
  }, [dados.dia, showRelatorio]);

  // ── Visibilidade das camadas ──────────────────────────────
  const [sidebarEsqAberta, setSidebarEsqAberta] = useState(false);
  const [dashboardAberto, setDashboardAberto] = useState(true);
  const [sidebarDirAberta, setSidebarDirAberta] = useState(true);
  const [businessLicenceModal, setBusinessLicenceModal] = useState(false);

  const [cartasModalOpen, setCartasModalOpen] = useState(false);
  const [cartasParaMostrar, setCartasParaMostrar] = useState([]);
  const [modalShopOpen, setModalShopOpen] = useState(false);
  const jogoIniciado = dados.jogoIniciado || false;
  const renderizando = dados.dia % 30 !== 0 || dados.dia === 0
  const ajusteLargura = renderizando
  const [modalFalenciaOpen, setModalFalenciaOpen] = useState(false);

  // ─── HANDLE CARTAS RECEBIDAS ──────────────────────────────
  const handleCartasRecebidas = useCallback((cartas) => {
    setCartasParaMostrar(cartas);
    setCartasModalOpen(true);
  }, []);

  // ─── HANDLE CARTAS MODAL CLOSE ────────────────────────────
  const handleCartasModalClose = useCallback(() => {
    setCartasModalOpen(false);
    setCartasParaMostrar([]);
  }, []);

  // ─── DETECTAR MOBILE PELA ALTURA ────────────────────────────
  const [isMobile, setIsMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      // MOBILE: altura da tela < 600px (celular)
      const mobile = window.innerHeight < 600;
      // PAISAGEM: largura > altura e é mobile
      const landscape = window.innerWidth > window.innerHeight && mobile;

      setIsMobile(mobile);
      setIsLandscape(landscape);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', () => {
      setTimeout(checkDevice, 300);
    });

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  // ─── CONFIGURAÇÕES RESPONSIVAS ──────────────────────────────
  const isDesktop = !isMobile;

  // Altura da topbar
  const topbarHeight = isDesktop ? '120px' : (isLandscape ? '60px' : '80px');

  // Largura do dashboard principal
  const dashboardWidth = isDesktop ? '80vw' : '100vw';

  // Largura dos dashboards laterais
  const sidebarWidth = isDesktop ? '20vw' : '0vw';

  // Tamanho do botão LOJA
  const buttonWidth = isDesktop ? '100px' : (isLandscape ? '60px' : '70px');
  const buttonHeight = isDesktop ? '80%' : (isLandscape ? '80%' : '70%');
  const buttonFontSize = isDesktop ? '12px' : (isLandscape ? '8px' : '10px');
  const buttonText = isDesktop ? 'ABRIR LOJA' : (isLandscape ? '' : 'LOJA');

  // Padding da topbar
  const topbarPadding = isDesktop ? '4px' : (isLandscape ? '2px 8px' : '4px 8px');

  // Border radius da topbar
  const topbarRadius = isDesktop ? '20px' : (isLandscape ? '8px' : '12px');

  // Gap entre elementos
  const gap = isDesktop ? '10px' : (isLandscape ? '4px' : '6px');

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
      {packModalOpen && (
        <PackOpeningWithRarity
          onClose={handlePackClose}
          onSorteio={() => {
            console.log("🎁 Pacote aberto com sucesso!");
          }}
          raridade={packRaridade}
          autoOpen={true}
        />
      )}
      {cartasModalOpen && (
        <ModalCartasRecebidas
          isOpen={cartasModalOpen}
          onClose={handleCartasModalClose}
          cartas={cartasParaMostrar}
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
      {showRelatorio && (
        <RelatorioFinal onClose={() => {
          setShowRelatorio(false);
        }} />
      )}

      {/* ═══════════════════════════════════════════════════════
          CAMADA 5 — TOPBAR (sempre sobrepõe tudo)
      ════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: topbarHeight,
          width: dados.dia % 30 !== 0 || dados.dia === 360 ? '100vw' : (isDesktop ? '80vw' : '100vw'),
          zIndex: 50,
          display: jogoIniciado ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: topbarPadding,
          background: 'linear-gradient(180deg, #350973, #350973)',
          borderBottom: '1px solid rgba(147,76,255,0.3)',
          borderBottomRightRadius: topbarRadius,
          boxShadow: '0 2px 5vh rgba(0,0,0,0.5)',
          overflowX: 'auto',
        }}
      >
        {!isDesktop && (
          <button
            onClick={() => setDashboardAberto(!dashboardAberto)}
            style={{

              background: 'linear-gradient(135deg,rgba(53, 9, 115, 1) 50%, rgba(242, 116, 5, 1) 100%)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 6,
              left: 0,
              padding: isLandscape ? '2px 8px' : '0px 10px',
              color: '#fff',
              fontSize: isLandscape ? '10px' : '12px',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              height: isLandscape ? '80%' : 'auto',
              aspectRatio: 1 / 1
            }}
          >
            {dashboardAberto ? '💻' : '💼'}
          </button>
        )}
        <div className="flex h-full w-full items-center justify-center col-start-8 col-end-9 mr-[10px]" style={{
          gap: gap,
          marginRight: isDesktop ? '10px' : (isLandscape ? '4px' : '8px'),
        }}>
          {/* ─── MOBILE: BOTÃO DE TOGGLE ────────────────────── */}


          <Informations />
          <Day />
          <SystemTurn />

          <EconomyGlobal />

          <div style={{
            width: "1px",
            height: isDesktop ? "35px" : (isLandscape ? "20px" : "25px"),
            background: "rgba(255,255,255,0.1)",
            flexShrink: 0,
          }} />

          <div className="h-full flex items-center">
            <SidebarFinancas onOpen={() => setBusinessLicenceModal(true)} />
          </div>

          <div style={{
            width: "1px",
            height: isDesktop ? "35px" : (isLandscape ? "20px" : "25px"),
            background: "rgba(255,255,255,0.1)",
            flexShrink: 0,
          }} />

          <button
            disabled={dados.dia === 360 || dados.dia % 30 !== 0}
            onClick={() => setModalShopOpen(true)}
            style={{
              height: buttonHeight,
              width: buttonWidth,
              flexShrink: 0,
              background: dados.dia === 360 || dados.dia % 30 !== 0
                ? 'rgba(255,165,0,0.2)'
                : 'rgba(255,165,0,0.7)',
              cursor: dados.dia === 360 || dados.dia % 30 !== 0 ? 'not-allowed' : 'pointer',
              opacity: dados.dia === 360 || dados.dia % 30 !== 0 ? 0.6 : 1,
              borderRadius: '5px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: isLandscape ? '2px' : '4px',
            }}
          >
            <div className="h-[100%] aspect-square flex-col bg-laranja rounded-[10px] flex items-center justify-center active:scale-95" style={{
              background: dados.dia === 360 || dados.dia % 30 !== 0 ? 'rgba(255,165,0,0.2)' : '#FF8C00',
              borderRadius: isDesktop ? '10px' : (isLandscape ? '6px' : '8px'),
              width: '100%',
            }}>
              <img src={LojaGImg} alt="" style={{
                height: isDesktop ? '40%' : (isLandscape ? '70%' : '35%'),
                objectFit: 'contain',
              }} />

              {isDesktop && (<div className="flex justify-center items-center">
                <p className="text-white pt-2 fonteBold text-space-[10px] leading-none" style={{
                  fontSize: buttonFontSize,
                  fontWeight: 700,
                }}>{buttonText}</p>
              </div>)}
            </div>
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          CAMADA 2 — DASHBOARDS
      ════════════════════════════════════════════════════════ */}

      {/* ─── QUANDO DASHBOARD ESTÁ FECHADO (📋) ────────────── */}
      {!dashboardAberto && (
        <div
          style={{
            position: 'fixed',
            top: topbarHeight,
            left: 0,
            height: `calc(100vh - ${topbarHeight})`,
            width: '100vw',
            zIndex: 20,
            borderRadius: 0,
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

      {/* ─── QUANDO DASHBOARD ESTÁ ABERTO (📊) ──────────────── */}
      {dashboardAberto && (
        <>
          {/* ─── DESKTOP: LAYOUT ORIGINAL ────────────────────────── */}
          {isDesktop && (
            <>
              {/* DashboardMiniDraft */}
              <div
                style={{
                  position: 'fixed',
                  height: '25vh',
                  top: dados.dia <= 240 ? '25vh' : '25vh',
                  right: '0',
                  width: '20vw',
                  zIndex: 20,
                  borderRadius: 0,
                  overflow: 'hidden',
                  background: 'linear-gradient(to bottom, #6411D9, #350973)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
                }}
              >
                <DashboardMiniDraft />
              </div>

              {/* ObjectiveTracker */}
              <div
                style={{
                  position: 'fixed',
                  height: '35vh',
                  top: '50vh',
                  right: '0',
                  width: '20vw',
                  zIndex: 20,
                  borderRadius: 0,
                  overflow: 'hidden',
                  background: 'linear-gradient(to bottom, #6411D9, #350973)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
                }}
              >
                <ObjectiveTracker
                  onPackReceived={handlePackReceived}
                  onCartasRecebidas={handleCartasRecebidas}
                  setorInicial={dados.setorEscolhido || "comercio"}
                />
              </div>

              {/* PlusInventory */}
              <div
                style={{
                  position: 'fixed',
                  height: '15vh',
                  bottom: '0vh',
                  right: '0vw',
                  width: '20vw',
                  zIndex: 20,
                  borderRadius: 20,
                  overflow: 'hidden',
                  background: 'linear-gradient(to bottom, #6411D9, #350973)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
                }}
              >
                <PlusInventory />
              </div>

              {/* DisplayInformations */}
              <div
                style={{
                  position: 'fixed',
                  top: '0vh',
                  height: '25vh',
                  maxHeight: '32vh',
                  width: '20vw',
                  right: 0,
                  zIndex: 20,
                  borderRadius: 0,
                  overflow: 'hidden',
                  background: 'linear-gradient(to bottom, #6411D9, #350973)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
                }}
              >
                <DisplayInformations />
              </div>

              {/* DashboardDraft (principal) */}
              <div
                style={{
                  position: 'fixed',
                  top: topbarHeight,
                  left: 0,
                  height: `calc(100vh - ${topbarHeight})`,
                  width: '80vw',
                  zIndex: 20,
                  borderRadius: 0,
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
            </>
          )}

          {/* ─── MOBILE: 3 COLUNAS ───────────────────────────────── */}
          {!isDesktop && (
            <div
              style={{
                position: 'fixed',
                top: topbarHeight,
                left: 0,
                height: `calc(100vh - ${topbarHeight})`,
                width: '100vw',
                zIndex: 20,
                display: 'flex',
                gap: '4px',
                padding: '4px',
                background: 'transparent',
              }}
            >
              {/* ─── COLUNA 1: DisplayInformations ──────────────── */}
              <div
                style={{
                  flex: '0 0 30vw',
                  height: '100%',
                  borderRadius: 12,
                  overflow: 'hidden',
                  background: 'linear-gradient(to bottom, #6411D9, #350973)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
                }}
              >
                <DisplayInformations />
              </div>

              {/* ─── COLUNA 2: DashboardMiniDraft ───────────────── */}
              <div
                style={{
                  flex: '0 0 40vw',
                  height: '100%',
                  borderRadius: 12,
                  overflow: 'hidden',
                  background: 'linear-gradient(to bottom, #6411D9, #350973)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
                }}
              >
                <DashboardMiniDraft />
              </div>

              {/* ─── COLUNA 3: ObjectiveTracker + PlusInventory ── */}
              <div
                style={{
                  flex: '0 0 30vw',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                {/* ObjectiveTracker - parte superior */}
                <div
                  style={{
                    flex: '0 0 70%',
                    borderRadius: 12,
                    overflow: 'hidden',
                    background: 'linear-gradient(to bottom, #6411D9, #350973)',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
                  }}
                >
                  <ObjectiveTracker
                    onPackReceived={handlePackReceived}
                    onCartasRecebidas={handleCartasRecebidas}
                    setorInicial={dados.setorEscolhido || "comercio"}
                  />
                </div>

                {/* PlusInventory - parte inferior */}
                <div
                  style={{
                    flex: 1,
                    borderRadius: 12,
                    overflow: 'hidden',
                    background: 'linear-gradient(to bottom, #6411D9, #350973)',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
                  }}
                >
                  <PlusInventory />
                </div>
              </div>
            </div>
          )}
        </>
      )}

    </Suspense>
  )
}

export default Interface