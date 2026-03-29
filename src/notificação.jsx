import React, { useContext, useEffect, useState } from "react";
import { CentraldeDadosContext } from "./centralDeDadosContext";
import { motion } from "framer-motion";
import { DadosEconomyGlobalContext } from "../src/dadosEconomyGlobal";
import useSound from "use-sound";
import closeAudio from "../public/sounds/closeAudio.mp3";
import eventAudio from "../public/sounds/newEventAudio.mp3";
import { useHotkeys } from "react-hotkeys-hook";
import terreno from "../public/outrasImagens/terreno.png"
import imovelPeq from "../public/outrasImagens/lojaP.png"
import passarDia from "../public/outrasImagens/proximo.png"
import { AnimatePresence } from "framer-motion";

export function ModalFalencia({ onConfirmar, onCancelar }) {
  const [digitado, setDigitado] = useState("");
  const confirmacaoTexto = "FALÊNCIA";
  const podeConfirmar = digitado === confirmacaoTexto;

  return (
    <AnimatePresence>
      <div style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(0,0,0,0.92)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1,    y: 0  }}
          exit={{    opacity: 0, scale: 0.85, y: 20  }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            width: "min(420px, 92%)",
            background: "linear-gradient(160deg, #350973, #1a053d)",
            border: "1px solid rgba(255,138,0,0.4)",
            borderRadius: 20,
            padding: "36px 32px 32px",
            boxShadow: "0 0 0 1px rgba(255,138,0,0.15), 0 30px 80px rgba(0,0,0,0.8)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Linha Laranja topo */}
          <div style={{
            position: "absolute", top: 0, left: "50%",
            transform: "translateX(-50%)",
            width: 100, height: 2,
            background: "linear-gradient(90deg, transparent, #FF8A00, transparent)",
          }} />

          {/* Ícone */}
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "rgba(255,138,0,0.12)",
            border: "1px solid rgba(255,138,0,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
            fontSize: 24,
          }}>
            📉
          </div>

          {/* Título */}
          <h2 style={{
            fontFamily: "serif", fontSize: 22, fontWeight: 900,
            color: "#fff", textAlign: "center", marginBottom: 8,
          }} className="fonteBold">
            Declarar <span style={{ color: "#FF8A00" }}>Falência</span>
          </h2>

          {/* Subtítulo */}
          <p style={{
            fontSize: 13, color: "rgba(255,255,255,.4)",
            textAlign: "center", lineHeight: 1.6, marginBottom: 24,
          }} className="fonteLight">
            Esta ação é <strong style={{ color: "rgba(255,255,255,.6)" }}>irreversível</strong>.
            Seu progresso será encerrado e o jogo reiniciará do início.
          </p>

          {/* Divisor */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10, marginBottom: 20,
          }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,138,0,0.2)" }} />
            <span style={{ fontSize: 10, color: "rgba(255,255,255,.25)", letterSpacing: ".15em", textTransform: "uppercase" }}>
              confirmação necessária
            </span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,138,0,0.2)" }} />
          </div>

          {/* Input de confirmação */}
          <p style={{
            fontSize: 11, color: "rgba(255,255,255,.35)",
            letterSpacing: ".1em", textTransform: "uppercase",
            marginBottom: 8,
          }}>
            Digite <strong style={{ color: "rgba(255,138,0,.7)" }}>FALÊNCIA</strong> para confirmar
          </p>
          <input
            type="text"
            value={digitado}
            onChange={e => setDigitado(e.target.value.toUpperCase())}
            placeholder="FALÊNCIA"
            style={{
              width: "100%", height: 48, borderRadius: 10,
              padding: "0 16px",
              background: "rgba(0,0,0,0.3)",
              border: `1px solid ${podeConfirmar ? "#FF8A00" : "rgba(255,138,0,0.25)"}`,
              fontFamily: "inherit", fontSize: 15, fontWeight: 700,
              color: podeConfirmar ? "#FF8A00" : "#fff",
              outline: "none",
              letterSpacing: ".08em",
              transition: "all .2s",
              marginBottom: 20,
              boxSizing: "border-box",
            }}
          />

          {/* Botões */}
          <div style={{ display: "flex", gap: 10 }}>
            {/* Cancelar */}
            <button
              onClick={onCancelar}
              style={{
                flex: 1, height: 46, borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,.6)", fontSize: 13, fontWeight: 700,
                cursor: "pointer", letterSpacing: ".05em",
                transition: "background .15s",
              }}
              onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.1)"}
              onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.05)"}
            >
              Cancelar
            </button>

            {/* Confirmar */}
            <button
              onClick={podeConfirmar ? onConfirmar : undefined}
              disabled={!podeConfirmar}
              style={{
                flex: 1, height: 46, borderRadius: 10, border: "none",
                background: podeConfirmar
                  ? "linear-gradient(135deg, #E56100, #FF8A00)"
                  : "rgba(255,138,0,0.12)",
                color: podeConfirmar ? "#fff" : "rgba(255,138,0,0.3)",
                fontSize: 13, fontWeight: 700,
                cursor: podeConfirmar ? "pointer" : "not-allowed",
                letterSpacing: ".05em",
                transition: "all .2s",
                boxShadow: podeConfirmar ? "0 4px 20px rgba(255,138,0,0.3)" : "none",
              }}
            >
              Declarar falência
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default function Notificação() {
  const [isNKeyDown, setIsNKeyDown] = useState(false);
  const { economiaSetores, setEconomiaSetores } = useContext(DadosEconomyGlobalContext);
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  const [buttonCloseAudio] = useSound(closeAudio);
  const [buttonEventAudio] = useSound(eventAudio);

  useHotkeys(
    "f",
    () => {
      if (isNKeyDown) return;
      setIsNKeyDown(true);
      if (dados.modalDespesas.estadoModal) { fecharModalDespesas(); return; }
      if (dados.modalEconomiaGlobal.estadoModal) { fecharModalEconomiaGlobal(); return; }
      if (dados.modal.estadoModal) { fecharModal(); }
    },
    { keydown: true, keyup: false, enableOnTags: ["INPUT", "TEXTAREA", "SELECT"] }
  );

  useHotkeys(
    "f",
    () => { setIsNKeyDown(false); },
    { keydown: false, keyup: true, enableOnTags: ["INPUT", "TEXTAREA", "SELECT"] }
  );

  const fecharModal = () => {
    buttonCloseAudio();
    atualizarDados("modal", { ...dados.modal, estadoModal: false });
  };

  const fecharModalDespesas = () => {
    buttonCloseAudio();
    atualizarDados("modalDespesas", { ...dados.modalDespesas, estadoModal: false });
  };

  const fecharModalInicio = () => {
    buttonCloseAudio();
    atualizarDados("modalInicio", { ...dados.modalInicio, estadoModal: false });
  };

  const fecharModalContinuarDias = () => {
    buttonCloseAudio();
    atualizarDados("modalContinuarDias", { ...dados.modalContinuarDias, estadoModal: false });
  };

  const fecharModalCompraTerrenos = () => {
    buttonCloseAudio();
    atualizarDados("modalCompraTerrenos", { ...dados.modalCompraTerrenos, estadoModal: false });
  };

  const fecharModalEconomiaGlobal = () => {
    buttonCloseAudio();
    atualizarDados("modalEconomiaGlobal", { ...dados.ModalEconomiaGlobal, estadoModal: false });
  };

  let head = `${dados.eventoAtual.julgamento}`;
  let content = `${dados.eventoAtual.title}`;

  useEffect(() => {}, [dados.fimGame]);

  // Estilo Base para os Modais do Jogo (Adaptado para Roxo e Laranja)
  const containerStyle = "flex justify-center items-center z-[100] bg-black/95 w-screen h-screen fixed inset-0 select-none backdrop-blur-sm";
  const modalStyle = "w-[min(600px,90%)] min-h-[40vh] bg-gradient-to-br from-[#350973] to-[#1a053d] border border-laranja/30 rounded-[24px] z-[110] relative p-8 shadow-2xl overflow-hidden";
  const barStyle = "w-full h-[4px] bg-gradient-to-r from-transparent via-laranja to-transparent mb-6";
  const buttonStyle = "absolute right-6 bottom-6 text-white bg-gradient-to-r from-laranja to-[#E56100] px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-laranja/20";

  if (dados.fimGame === true) {
    return (
      <div className={containerStyle}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={modalStyle}>
          <div className="absolute top-0 left-0 w-full h-1 bg-laranja shadow-[0_0_15px_rgba(255,138,0,0.5)]" />
          <h1 className="text-center text-white text-4xl font-black mb-2 uppercase tracking-tighter italic">GAME OVER</h1>
          <div className={barStyle}></div>
          <h2 className="text-center text-laranja text-2xl font-light mb-4">Você foi à falência</h2>
          <p className="text-white/60 text-center px-4">Sua jornada administrativa chegou ao fim. Os débitos superaram sua capacidade de gestão.</p>
          <button className={buttonStyle} onClick={fecharModal}>Reiniciar</button>
        </motion.div>
      </div>
    );
  }

  if (dados.dia % 30 === 0 && dados.modalDespesas.estadoModal && !dados.despesas.despesasPagas) {
    buttonEventAudio();
    return (
      <div className={containerStyle}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={modalStyle}>
          <h1 className="text-center text-white text-3xl font-bold mb-2">Dívidas a Pagar</h1>
          <div className="w-1/2 h-[2px] bg-laranja/50 mx-auto mb-6" />
          <h2 className="text-center text-white/80 text-xl font-light leading-relaxed">
            Atenção, administrador! <br/> Pague suas contas pendentes para continuar operando.
          </h2>
          <button className={buttonStyle} onClick={fecharModalDespesas}>Entendido</button>
        </motion.div>
      </div>
    );
  }

  if (dados.modalEconomiaGlobal.estadoModal) {
    let contentEconomiaGlobal = "";
    let headEconomiaGlobal = "";
    switch (economiaSetores.economiaGlobal) {
      case "aquecida": contentEconomiaGlobal = "O mercado está fervendo! Alta demanda e custos de construção reduzidos. Aproveite."; headEconomiaGlobal = "Economia Aquecida"; break;
      case "progressiva": contentEconomiaGlobal = "Crescimento constante. Ótimas perspectivas de faturamento e incentivos fiscais."; headEconomiaGlobal = "Em Crescimento"; break;
      case "estável": contentEconomiaGlobal = "Equilíbrio total. Riscos e oportunidades dividem o mesmo espaço."; headEconomiaGlobal = "Economia Estável"; break;
      case "declinio": contentEconomiaGlobal = "Sinais de alerta. Impostos podem subir e o faturamento cair."; headEconomiaGlobal = "Em Declínio"; break;
      case "recessão": contentEconomiaGlobal = "Cenário crítico. Sobrevivência é a palavra de ordem."; headEconomiaGlobal = "Recessão"; break;
      default: contentEconomiaGlobal = "Informações indisponíveis."; headEconomiaGlobal = "Estado Desconhecido";
    }

    return (
      <div className={containerStyle}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={modalStyle}>
          <div className="text-xs text-white/30 tracking-[0.3em] uppercase mb-2 text-center">Relatório Global</div>
          <h1 className="text-center text-white text-3xl font-black mb-4 uppercase">{headEconomiaGlobal}</h1>
          <div className={barStyle} />
          <h2 className="text-center text-white/70 text-lg font-light leading-relaxed px-6">{contentEconomiaGlobal}</h2>
          <button className={buttonStyle} onClick={fecharModalEconomiaGlobal}>Fechar Relatório</button>
        </motion.div>
      </div>
    );
  }

  const renderTutorial = (titulo, texto, img, acao, obs) => (
    <div className={containerStyle}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} 
        className="w-[min(800px,95%)] min-h-[60vh] bg-[#1a053d] border-2 border-laranja/30 rounded-[30px] p-10 relative overflow-hidden shadow-[0_0_50px_rgba(255,138,0,0.1)]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-laranja/10 blur-[80px]" />
        <h1 className="text-white text-4xl font-black mb-6 italic tracking-tight uppercase border-b border-laranja/20 pb-4">{titulo}</h1>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h2 className="text-white/80 text-xl font-light leading-relaxed mb-6">{texto}</h2>
            <div className="flex items-center gap-4 bg-black/30 p-4 rounded-2xl border border-laranja/20">
              <div className="w-20 h-20 flex items-center justify-center rounded-xl bg-gradient-to-br from-laranja to-[#E56100] shadow-lg">
                <img className="w-[70%] h-[70%] object-contain" src={img} alt="ícone" />
              </div>
              <p className="text-laranja text-sm font-bold uppercase tracking-widest">{obs}</p>
            </div>
          </div>
        </div>
        <button className="absolute right-8 bottom-8 text-white bg-laranja px-10 py-4 rounded-2xl font-black uppercase hover:bg-[#E56100] transition-colors shadow-xl" onClick={acao}>Entendido</button>
      </motion.div>
    </div>
  );

  if (dados.modalInicio.estadoModal) return renderTutorial("Expansão Inicial", "Para construir seu império, você precisa de espaço físico. Adquira seu primeiro lote.", terreno, fecharModalInicio, "Barra Lateral Esquerda");
  if (dados.modalCompraTerrenos.estadoModal) return renderTutorial("Primeira Obra", "Terreno pronto! Agora levante as paredes do seu primeiro imóvel pequeno.", imovelPeq, fecharModalCompraTerrenos, "Barra Lateral Esquerda");
  if (dados.modalContinuarDias.estadoModal) return renderTutorial("Ciclo de Caixa", "Aguarde o faturamento. Passe os dias para acumular capital e expandir.", passarDia, fecharModalContinuarDias, "Topo Superior Direito");

  if (dados.modal.estadoModal) {
    return (
      <div className={containerStyle}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={modalStyle}>
          <h1 className="text-center text-white text-3xl font-bold mb-4 italic uppercase tracking-tighter">{head}</h1>
          <div className={barStyle} />
          <h2 className="text-center text-white/70 text-xl font-light px-6">{content}</h2>
          <button className={buttonStyle} onClick={fecharModal}>Confirmar</button>
        </motion.div>
      </div>
    );
  }

  return null;
}