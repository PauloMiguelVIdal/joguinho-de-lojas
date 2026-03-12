import React, { useContext, lazy, Suspense } from "react";
import { CentraldeDadosContext } from "./centralDeDadosContext.jsx";

// Componentes que carregam imediatamente (sempre visíveis)
import Notificação from "./notificação.jsx";
import Informations from "./components/Informations.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Buttons from "./components/Buttons.jsx";
import Buy from "./components/buy.jsx";
import Day from "./components/day.jsx";

// Componentes carregados sob demanda (lazy)
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
const CardSpecials = lazy(() => import("./components/cardsSpecials.jsx").then(m => ({ default: m.CardSpecials })));
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

function Interface() {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext)

    const vision = dados.vision.visionAtual
    const setorAtivo = dados.setorAtivo

    const setVision = (newVision) => {
        atualizarDados("vision", {
            ...dados.vision, visionAtual: newVision
        });
    }

    return (
        <Suspense fallback={<div className="w-screen h-screen bg-gray-900" />}>
            <div className="w-[100vw] bg-[#7317F3] h-[100vh] flex justify-around items-center">
                <NewStage />
                <ModalExcesso />
                <Achievements />
                <CardSpecials />
                <InputName />
                <Offers />
                <Events />
                <Employees />
                <Notificação />
                <ModalAlert />
                <ModalPerson />
                <ModalInfo />

                <div className="w-[20vw] h-[100vh] flex items-center justify-around">
                    <Buy />
                </div>
                <div className="w-[75vw] h-[95vh] shadow-2xl rounded-[20px] bg-gradient-to-b from-[#6411D9] to-[#350973] grid grid-rows-10 grid-cols-10 gap-[20px] p-[20px]">

                    <div className="grid col-start-1 col-end-9 row-start-2 row-end-11 h-full w-full ">
                        <Dashboard className="h-full" />
                    </div>
                    <div className="grid col-start-1 col-end-9 row-1 w-full h-full">
                        <div className="grid gap-[10px] col-start-1 col-end-8 w-full place-items-center">
                            <Informations className="grid col-start-1 col-end-8" />
                        </div>
                        <div className="flex w-full items-center justify-center col-start-8 col-end-9 gap-[10px]">
                            <Day />
                            <TaxesYear />
                            <EconomyGlobal />
                            <RaffledBuildings />
                            {/* <UpgradeCards /> */}
                        </div>
                    </div>

                    <div className="grid col-start-9 col-end-11 row-start-1 row-end-3 ml-[10px]">
                    </div>
                    <div className="grid col-start-9 col-end-11 row-start-1 row-end-3 ml-[10px]">
                        <Buttons />
                    </div>
                    {vision === "financas" && (
                        <div className="grid col-start-9 col-end-11 row-start-3 row-end-11 flex justify-center items-center">
                            <PatrimonioInterface />
                        </div>
                    )}

                    {vision !== "financas" && (
                        <div className="col-start-9 col-end-11 row-start-3 row-end-11 grid grid-rows-[auto_auto_1fr] gap-4 p-2 overflow-y-auto">
                            <div className="w-full bg-white bg-opacity-10 rounded-2xl shadow-lg p-3">
                                <Economys />
                            </div>
                            <div className="w-full bg-white bg-opacity-10 rounded-2xl shadow-lg p-3">
                                <Taxes />
                            </div>
                            <div className="w-full bg-white bg-opacity-10 rounded-2xl shadow-lg p-3 min-h-0 overflow-y-auto">
                                <ActiveEvents />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Suspense>
    )
}

export default Interface