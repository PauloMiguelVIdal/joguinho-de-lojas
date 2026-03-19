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
        background: "rgba(0,0,0,0.85)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1,    y: 0  }}
          exit={{    opacity: 0, scale: 0.85, y: 20  }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            width: "min(420px, 92%)",
            background: "linear-gradient(160deg, #0d0a1f, #1a0a1a)",
            border: "1px solid rgba(220,38,38,0.4)",
            borderRadius: 20,
            padding: "36px 32px 32px",
            boxShadow: "0 0 0 1px rgba(220,38,38,0.15), 0 30px 80px rgba(0,0,0,0.8)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Linha vermelha topo */}
          <div style={{
            position: "absolute", top: 0, left: "50%",
            transform: "translateX(-50%)",
            width: 100, height: 2,
            background: "linear-gradient(90deg, transparent, #dc2626, transparent)",
          }} />

          {/* Ícone */}
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "rgba(220,38,38,0.12)",
            border: "1px solid rgba(220,38,38,0.3)",
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
          }}>
            Declarar <span style={{ color: "#dc2626" }}>Falência</span>
          </h2>

          {/* Subtítulo */}
          <p style={{
            fontSize: 13, color: "rgba(255,255,255,.4)",
            textAlign: "center", lineHeight: 1.6, marginBottom: 24,
          }}>
            Esta ação é <strong style={{ color: "rgba(255,255,255,.6)" }}>irreversível</strong>.
            Seu progresso será encerrado e o jogo reiniciará do início.
          </p>

          {/* Divisor */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10, marginBottom: 20,
          }}>
            <div style={{ flex: 1, height: 1, background: "rgba(220,38,38,0.2)" }} />
            <span style={{ fontSize: 10, color: "rgba(255,255,255,.25)", letterSpacing: ".15em", textTransform: "uppercase" }}>
              confirmação necessária
            </span>
            <div style={{ flex: 1, height: 1, background: "rgba(220,38,38,0.2)" }} />
          </div>

          {/* Input de confirmação */}
          <p style={{
            fontSize: 11, color: "rgba(255,255,255,.35)",
            letterSpacing: ".1em", textTransform: "uppercase",
            marginBottom: 8,
          }}>
            Digite <strong style={{ color: "rgba(220,38,38,.7)" }}>FALÊNCIA</strong> para confirmar
          </p>
          <input
            type="text"
            value={digitado}
            onChange={e => setDigitado(e.target.value.toUpperCase())}
            placeholder="FALÊNCIA"
            style={{
              width: "100%", height: 48, borderRadius: 10,
              padding: "0 16px",
              background: "rgba(220,38,38,0.08)",
              border: `1px solid ${podeConfirmar ? "rgba(220,38,38,0.7)" : "rgba(220,38,38,0.25)"}`,
              fontFamily: "inherit", fontSize: 15, fontWeight: 700,
              color: podeConfirmar ? "#fca5a5" : "#fff",
              outline: "none",
              letterSpacing: ".08em",
              transition: "border-color .2s, color .2s",
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
                  ? "linear-gradient(135deg, #7f1d1d, #dc2626)"
                  : "rgba(220,38,38,0.12)",
                color: podeConfirmar ? "#fff" : "rgba(220,38,38,0.3)",
                fontSize: 13, fontWeight: 700,
                cursor: podeConfirmar ? "pointer" : "not-allowed",
                letterSpacing: ".05em",
                transition: "all .2s",
                boxShadow: podeConfirmar ? "0 4px 20px rgba(220,38,38,0.4)" : "none",
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
  //   if (novoEventoSelecionado === "modalDespesas") {
  //     // Lógica para o evento modal de despesas
  // } else if (novoEventoSelecionado === "modalFaturamento") {
  //   novoEvento.periodoSelecionado = selecionarItem(periodo);
  //   novoEvento.LojaSelecionada = selecionarItem(todasLojas);
  //   novoEvento.situacaoSelecionada = selecionarItem(situacao);
  //   novoEvento.porcentagemSelecionada = selecionarItem(porcentagem);
  //   const novaDataFinal = parseInt(novaDataInicial) + novoEvento.periodoSelecionado;      // Lógica para o evento modal de faturamento
  //     novoEvento.diaInicial = novaDataInicial;
  //     novoEvento.diaFinal = novaDataFinal
  //     novoEvento.title = `As ${novoEvento.LojaSelecionada} terão ${novoEvento.situacaoSelecionada} de faturamento de ${novoEvento.porcentagemSelecionada}% durante o período de ${novoEvento.periodoSelecionado} dias`;
  //     console.log(novoEvento.periodoSelecionado)

  //   const events = ['pagarDespesas', 'faturamento', 'impostosFixos', 'impostosVariáveis'];

  useHotkeys(
    "f",
    () => {
      if (
        isNKeyDown // 2. Se já estiver pressionada, ignora o auto-repeat
      )
        return;
      setIsNKeyDown(true);
      if (dados.modalDespesas.estadoModal) {
        fecharModalDespesas();
        return;
      }

      if (dados.modalEconomiaGlobal.estadoModal) {
        fecharModalEconomiaGlobal();
        return;
      }
      if (dados.modal.estadoModal) {
        fecharModal();
      }
    },
    {
      keydown: true,
      keyup: false,
      enableOnTags: ["INPUT", "TEXTAREA", "SELECT"],
    }
  );
  useHotkeys(
    "f",
    () => {
      setIsNKeyDown(false);
    },
    {
      keydown: false,
      keyup: true,
      enableOnTags: ["INPUT", "TEXTAREA", "SELECT"],
    }
  );

  const { economiaSetores, setEconomiaSetores } = useContext(
    DadosEconomyGlobalContext
  );

  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  // console.log(dados.estadoModal);

  const [buttonCloseAudio] = useSound(closeAudio);
  const [buttonEventAudio] = useSound(eventAudio);

  const fecharModal = () => {
    buttonCloseAudio();
    atualizarDados("modal", { ...dados.modal, estadoModal: false });
  };



  const fecharModalDespesas = () => {
    buttonCloseAudio();
    atualizarDados("modalDespesas", {
      ...dados.modalDespesas,
      estadoModal: false,
    });
  };

  const fecharModalInicio = () => {
    buttonCloseAudio();
    atualizarDados("modalInicio", {
      ...dados.modalInicio,
      estadoModal: false,
    });
  };

  const fecharModalContinuarDias = () => {
    buttonCloseAudio();
    atualizarDados("modalContinuarDias", {
      ...dados.modalContinuarDias,
      estadoModal: false,
    });
  };
  const fecharModalCompraTerrenos = () => {
    buttonCloseAudio();
    atualizarDados("modalCompraTerrenos", {
      ...dados.modalCompraTerrenos,
      estadoModal: false,
    });
  };

  const fecharModalEconomiaGlobal = () => {
    buttonCloseAudio();
    atualizarDados("modalEconomiaGlobal", {
      ...dados.ModalEconomiaGlobal,
      estadoModal: false,
    });
  };

  // useEffect(() => console.log("chamou evento")), [dados.eventoAtual]

  // console.log("useEffect chamado11!");

  let head = `${dados.eventoAtual.julgamento}`;
  let content = `${dados.eventoAtual.title}`;

  let headEconomiaGlobal = `${dados.economiaGlobal}`;
  let contentEconomiaGlobal = `${dados.economiaGlobal}`;

  useEffect(() => {}, [dados.fimGame]);
  if (dados.fimGame === true) {
    return (
      <div className="flex justify-center items-center z-10 bg-black opacity-[98%] w-[100vw] h-[100vh] absolute select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-[35vw] h-[35vh] bg-[#350973] rounded-[20px] z-20 relative"
        >
          <h1 className="text-center text-white p-[10px] text-[30px] fonteBold">
            Fim
          </h1>
          <div className="w-[80%] h-[10px] bg-gradient-to-l from-laranja to-roxo flex rounded-[5px] relative m-auto"></div>
          <div>
            <h2 className="text-start text-white opacity-[70%] pl-[20px] pt-[20px] text-[25px] fonteLight">
              você foi a falencia
            </h2>
          </div>
          <button
            className="absolute right-[10px] bottom-[10px] text-white bg-laranja p-[10px] rounded-[40px] z-30 fonteBold hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]"
            onClick={fecharModal}
          >
            <h3>entendido</h3>
          </button>
        </motion.div>
      </div>
    );
  } else if (
    dados.dia % 30 === 0 &&
    dados.modalDespesas.estadoModal &&
    !dados.despesas.despesasPagas
  ) {
    buttonEventAudio();
    return (
      <div className="flex justify-center items-center z-10 bg-black opacity-[98%] w-[100vw] h-[100vh] absolute select-none select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-[30vw] h-[30vh] bg-[#350973] rounded-[20px] z-20 relative"
        >
          <h1 className="text-center text-white p-[10px] text-[30px] fonteBold">
            Dívidas a pagar
          </h1>
          <div className="w-[80%] h-[10px] bg-white flex rounded-[5px] relative m-auto"></div>
          <div>
            <h2 className="text-start text-white opacity-[70%] pl-[20px] text-[25px] pt-[20px] fonteLight">
              Pague suas dívidas para poder continuar
            </h2>
          </div>
          <button
            className="absolute right-[10px] bottom-[10px] text-white bg-laranja p-[10px] rounded-[40px] z-30 fonteBold hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]"
            onClick={fecharModalDespesas}
          >
            <h3>Entendido</h3>
          </button>
        </motion.div>
      </div>
    );
  } else if (dados.modalEconomiaGlobal.estadoModal) {
    let contentEconomiaGlobal = "";
    let headEconomiaGlobal = "";

    switch (economiaSetores.economiaGlobal) {
      case "aquecida":
        contentEconomiaGlobal =
          "O mercado está aquecido, com alta demanda e grandes chances de crescimento no faturamento, favorecimento fiscal e redução nos custos de construção. Ainda assim, riscos negativos podem surgir.";
        headEconomiaGlobal = "Economia Aquecida";
        break;
      case "progressiva":
        contentEconomiaGlobal =
          "A economia avança de forma constante, com boas perspectivas de aumento de faturamento, incentivos fiscais e queda nos custos de obras. Pequenos riscos ainda estão presentes.";
        headEconomiaGlobal = "Economia em Crescimento";
        break;
      case "estável":
        contentEconomiaGlobal =
          "O cenário está equilibrado, com igual probabilidade de incentivos ou dificuldades, como variação nos impostos, no faturamento e nos custos de construção.";
        headEconomiaGlobal = "Economia Estável";
        break;
      case "declinio":
        contentEconomiaGlobal =
          "A economia mostra sinais de enfraquecimento, com maior risco de perdas financeiras, aumento de impostos e encarecimento de obras, embora ainda existam oportunidades pontuais.";
        headEconomiaGlobal = "Economia em Declínio";
        break;
      case "recessão":
        contentEconomiaGlobal =
          "A recessão traz um cenário adverso, com alta probabilidade de quedas no faturamento, carga tributária elevada e custos de construção maiores. Benefícios são raros, mas possíveis.";
        headEconomiaGlobal = "Economia em Recessão";
        break;
      default:
        contentEconomiaGlobal = "Informações econômicas indisponíveis.";
        headEconomiaGlobal = "Estado econômico desconhecido";
    }

    return (
      <div className="flex justify-center items-center z-10 bg-black opacity-[95%] w-[100vw] h-[100vh] absolute select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="w-[45vw] h-[45vh] bg-[#350973] p-1 rounded-[20px] z-20 relative">
            <h1 className="text-center text-white p-[10px] text-[30px] fonteBold">
              {headEconomiaGlobal}
            </h1>
            <div className="w-[80%] h-[10px] bg-gradient-to-l from-laranja to-roxo flex rounded-[5px] relative m-auto"></div>
            <div>
              <h2 className="text-start text-white opacity-[70%] text-[25px] pl-[20px] pt-[20px] fonteLight">
                {contentEconomiaGlobal}
              </h2>
            </div>
            <button
              className="absolute right-[10px] bottom-[10px] text-white bg-laranja p-[10px] rounded-[40px] z-30 fonteBold"
              onClick={fecharModalEconomiaGlobal}
            >
              <h3>entendido</h3>
            </button>
          </div>
        </motion.div>
      </div>
    );
  } else if (dados.modalObjetivos.estadoModal) {
    return (
      <div className="flex justify-center items-center z-10 bg-black opacity-[98%] w-[100vw] h-[100vh] absolute select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-[45vw] h-[45vh] bg-[#350973] rounded-[20px] z-20 relative"
        >
          <h1 className="text-center text-white p-[10px] text-[30px] fonteBold">
            Infelizmente você foi a falencia
          </h1>
          <div className="w-[80%] h-[10px] bg-gradient-to-l from-laranja to-roxo flex rounded-[5px] relative m-auto"></div>
          <div>
            <h2 className="text-start text-white opacity-[70%] pl-[20px] pt-[20px] text-[25px] fonteLight">
              Tente realizar o pagamento das suas dívidas, caso não seja
              possível reinicie o jogo.
            </h2>
          </div>
          <button
            className="absolute right-[10px] bottom-[10px] text-white bg-laranja p-[10px] rounded-[40px] z-30 fonteBold hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]"
            onClick={fecharModal}
          >
            <h3>entendido</h3>
          </button>
        </motion.div>
      </div>
    );
  }
  //  else if (dados.modalExcesso.estadoModal) {
  //  return (
  //   <div className="flex justify-center items-center z-50 bg-black/95 w-screen h-screen fixed select-none">
  //     <motion.div
  //       initial={{ opacity: 0, scale: 0.8 }}
  //       animate={{ opacity: 1, scale: 1 }}
  //       exit={{ opacity: 0, scale: 0.8 }}
  //       transition={{ duration: 0.3, ease: "easeOut" }}
  //     >
  //       <div className="w-[45vw] min-h-[40vh] bg-[#350973] p-4 rounded-[20px] relative">
  //         <h1 className="text-center text-white text-[30px] fonteBold">
  //           {modal.head}
  //         </h1>

  //         <div className="w-[80%] h-[10px] bg-gradient-to-l from-laranja to-roxo rounded-[5px] m-auto my-3" />

  //         <h2 className="text-white opacity-[70%] text-[22px] fonteLight px-4">
  //           {modal.content}
  //         </h2>

  //         {/* Área dinâmica */}
  //         {modal.tipo === "excesso" && (
  //           <div className="text-white px-4 mt-4">
  //             <p>Excesso: {modal.extra.quantidadeExcesso}</p>
  //             <p>Oferta: ${modal.extra.ofertaExcesso}</p>
  //           </div>
  //         )}

  //         <button
  //           className="absolute right-4 bottom-4 text-white bg-laranja px-4 py-2 rounded-[40px] fonteBold"
  //           onClick={fecharModal}
  //         >
  //           Entendido
  //         </button>
  //       </div>
  //     </motion.div>
  //   </div>
  // );
  // }
  if (dados.modalInicio.estadoModal) {
    return (
      <div className="flex justify-center items-center z-10 bg-black opacity-[98%] w-[100vw] h-[100vh] absolute select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-[75vw] h-[75vh] bg-[#350973] rounded-[20px] z-20 relative"
        >
          <h1 className="text-center text-white p-[10px] text-[30px] fonteBold">
           Construa um Imóvel Pequeno
          </h1>
          <div className="w-[80%] h-[10px] bg-gradient-to-l from-laranja to-roxo flex rounded-[5px] relative m-auto"></div>
          <div>
            <h2 className="text-start text-white opacity-[70%] pl-[20px] pt-[20px] text-[25px] fonteLight">
            Para que você construa um imóvel pequeno primeiramente é necessário que você tenha um terreno.
            <br/>
            
            <br/>
            <strong className="">COMPRE UM TERRENO</strong>
            <br/>
            
            Para comprar um terreno é necessário clicar no botão:
            <br/>
            
             <br/>
            <div className="w-[100px] h-[100px] flex items-center justify-center rounded-[10px] bg-orange-700">
              
              <img className="w-[70%] h-[70%]" src={terreno}/>
              </div> 
              *está localizado na barra lateral da esquerda
            
             <br/>
             <br/>
            
            </h2>
          </div>
          <button
            className="absolute right-[10px] bottom-[10px] text-white bg-laranja p-[10px] rounded-[40px] z-30 fonteBold hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]"
            onClick={fecharModalInicio}
          >
            <h3>entendido</h3>
          </button>
        </motion.div>
      </div>
    );
  } else
  if (dados.modalCompraTerrenos.estadoModal) {
    return (
      <div className="flex justify-center items-center z-10 bg-black opacity-[98%] w-[100vw] h-[100vh] absolute select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-[75vw] h-[75vh] bg-[#350973] rounded-[20px] z-20 relative"
        >
          <h1 className="text-center text-white p-[10px] text-[30px] fonteBold">
           Construa um Imóvel Pequeno
          </h1>
          <div className="w-[80%] h-[10px] bg-gradient-to-l from-laranja to-roxo flex rounded-[5px] relative m-auto"></div>
          <div>
            <h2 className="text-start text-white opacity-[70%] pl-[20px] pt-[20px] text-[25px] fonteLight">
           Agora que você possui o terreno necessário, construa o imóvel pequeno
            <br/>
            
            <br/>
            <strong className="">CONTRUA O IMÓVEL PEQUENO</strong>
            <br/>
            
            Para construir um imóvel pequeno é necessário clicar no botão:
            <br/>
            
             <br/>
            <div className="w-[100px] h-[100px] flex items-center justify-center rounded-[10px] bg-orange-700">
              
              <img className="w-[70%] h-[70%]" src={imovelPeq}/>
              </div> 
              *está localizado na barra lateral da esquerda
            
             <br/>
             <br/>
            
            </h2>
          </div>
          <button
            className="absolute right-[10px] bottom-[10px] text-white bg-laranja p-[10px] rounded-[40px] z-30 fonteBold hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]"
            onClick={fecharModalCompraTerrenos}
          >
            <h3>entendido</h3>
          </button>
        </motion.div>
      </div>
    );
  } else
  if (dados.modalContinuarDias.estadoModal) {
    return (
      <div className="flex justify-center items-center z-10 bg-black opacity-[98%] w-[100vw] h-[100vh] absolute select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-[75vw] h-[75vh] bg-[#350973] rounded-[20px] z-20 relative"
        >
          <h1 className="text-center text-white p-[10px] text-[30px] fonteBold">
           Passe para o próximo dia
          </h1>
          <div className="w-[80%] h-[10px] bg-gradient-to-l from-laranja to-roxo flex rounded-[5px] relative m-auto"></div>
          <div>
            <h2 className="text-start text-white opacity-[70%] pl-[20px] pt-[20px] text-[25px] fonteLight">
           Agora que você possui um imóvel pequeno, passe para o próximo dia até que tenha dinheiro suficiente para que possa comprar um novo terreno e continuar expandindo os seus imóveis.
            <br/>
            
            <br/>
            <strong className="">PASSE O DIA</strong>
            <br/>
            
            Para passar o dia é necessário clicar no botão:
            <br/>
            
             <br/>
            <div className="w-[100px] h-[100px] flex items-center justify-center rounded-[10px] bg-orange-700">
              
              <img className="w-[70%] h-[70%]" src={passarDia}/>
              </div> 
              *está localizado na barra superior da direita
            
             <br/>
             <br/>
            
            </h2>
          </div>
          <button
            className="absolute right-[10px] bottom-[10px] text-white bg-laranja p-[10px] rounded-[40px] z-30 fonteBold hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]"
            onClick={fecharModalContinuarDias}
          >
            <h3>entendido</h3>
          </button>
        </motion.div>
      </div>
    );
  } else
  // if (dados.modalFalencia.estadoModal) {
  //   return (
  //     <div className="flex justify-center items-center z-10 bg-black opacity-[98%] w-[100vw] h-[100vh] absolute select-none">
  //       <motion.div
  //         initial={{ opacity: 0, scale: 0.8 }}
  //         animate={{ opacity: 1, scale: 1 }}
  //         exit={{ opacity: 0, scale: 0.8 }}
  //         transition={{ duration: 0.3, ease: "easeOut" }}
  //         className="w-[75vw] h-[75vh] bg-[#350973] rounded-[20px] z-20 relative"
  //       >
  //         <h1 className="text-center text-white p-[10px] text-[30px] fonteBold">
  //          Passe para o próximo dia
  //         </h1>
  //         <div className="w-[80%] h-[10px] bg-gradient-to-l from-laranja to-roxo flex rounded-[5px] relative m-auto"></div>
  //         <div>
  //           <h2 className="text-start text-white opacity-[70%] pl-[20px] pt-[20px] text-[25px] fonteLight">
  //          Agora que você possui um imóvel pequeno, passe para o próximo dia até que tenha dinheiro suficiente para que possa comprar um novo terreno e continuar expandindo os seus imóveis.
  //           <br/>
            
  //           <br/>
  //           <strong className="">PASSE O DIA</strong>
  //           <br/>
            
  //           Para passar o dia é necessário clicar no botão:
  //           <br/>
            
  //            <br/>
  //           <div className="w-[100px] h-[100px] flex items-center justify-center rounded-[10px] bg-orange-700">
              
  //             <img className="w-[70%] h-[70%]" src={passarDia}/>
  //             </div> 
  //             *está localizado na barra superior da direita
            
  //            <br/>
  //            <br/>
            
  //           </h2>
  //         </div>
  //         <button
  //           className="absolute right-[10px] bottom-[10px] text-white bg-laranja p-[10px] rounded-[40px] z-30 fonteBold hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]"
  //           onClick={fecharModalContinuarDias}
  //         >
  //           <h3>entendido</h3>
  //         </button>
  //       </motion.div>
  //     </div>
  //   );
  // } else
  if (dados.modal.estadoModal) {
    return (
      <div className="flex justify-center items-center z-10 bg-black opacity-[98%] w-[100vw] h-[100vh] absolute select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-[35vw] h-[35vh] bg-[#350973] rounded-[20px] z-20 relative"
        >
          <h1 className="text-center text-white p-[10px] text-[30px] fonteBold">
            {head}
          </h1>
          <div className="w-[80%] h-[10px] bg-gradient-to-l from-laranja to-roxo flex rounded-[5px] relative m-auto"></div>
          <div>
            <h2 className="text-start text-white opacity-[70%] pl-[20px] pt-[20px] text-[25px] fonteLight">
              {content}
            </h2>
          </div>
          <button
            className="absolute right-[10px] bottom-[10px] text-white bg-laranja p-[10px] rounded-[40px] z-30 fonteBold hover:bg-[#E56100] active:scale-95 hover:scale-[1.05]"
            onClick={fecharModal}
          >
            <h3>entendido</h3>
          </button>
        </motion.div>
      </div>
    );
  } 

  else {
    return null;
  }
}
