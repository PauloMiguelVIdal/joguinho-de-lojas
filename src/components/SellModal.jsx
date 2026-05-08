import React, { useContext, useEffect, useState, useRef } from "react";
// import { CentraldeDadosContext } from "../centralDeDadosContext";
import { Localizador } from "./localizador"; // Se o localizador for o que gera o CardLocalization
import { CardLocalization } from "./cardLocalization"; // Importe direto se for o caso
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { motion, AnimatePresence } from "framer-motion";
import { X, DollarSign, TrendingDown, Plus, Minus, Check, AlertCircle } from "lucide-react";
import closeAudio from "../../public/sounds/closeAudio.mp3";
import useSound from "use-sound";
import payTerrain from "../../public/sounds/payTerrainAudio.mp3";
import { useCentralStore, EDIFICIOS_BASE_DINAMICOS, EDIFICIOS_FINAIS_DINAMICOS_INICIAL, LICENCAS_DINAMICAS_GLOBAIS } from "../stores/useCentralStore";
import {
  EDIFICIOS_FINAIS_ESTATICOS,
  LICENCAS_ESTATICAS,
  EDIFICIOS_BASE_ESTATICOS,
  LICENCAS_ESTATICAS_GLOBAIS,
} from "../stores/dadosEstáticos";

export const SellModal = ({ setor, index, onClose }) => {
  // const { dados, atualizarDadosProf } = useContext(CentraldeDadosContext);
  const { economiaSetores, setEconomiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);
  const setorAtivo = setor;
  const edificioBase = useCentralStore((s) => s.edificiosBase);          // terrenos/lojasP/M/G dinâmico
  const edificiosDin = useCentralStore((s) => s.edificiosFinais[setorAtivo]); // array dinâmico do setor
  const atualizarDados = useCentralStore((s) => s.atualizarDados);
  const atualizarDadosProf = useCentralStore((s) => s.atualizarDadosProf);
  const atualizarLote = useCentralStore((s) => s.atualizarLote);
  // ── Dados estáticos — zero reatividade ───────────────────
  const edificioEstatico = EDIFICIOS_FINAIS_ESTATICOS[setorAtivo]?.edificios[index];
  const edificioDinamico = edificiosDin?.edificios?.[index];// { liberado, quantidade, powerUp }

  const [buttonPayTerrain] = useSound(payTerrain);
  const [buttonCloseAudio] = useSound(closeAudio);


  const economiaSetoresAtual = economiaSetores[setor].economiaSetor.estadoAtual;
  const base = EDIFICIOS_FINAIS_ESTATICOS[setorAtivo].edificios[index];
  const qtdEd = edificiosDin?.edificios?.[index]?.quantidade ?? 0;
  const [quantidadeMarcador, setQuantidadeMarcador] = useState(1);

  // --- MANTENHA SUA FUNÇÃO DE CÁLCULO ORIGINAL AQUI ---
  function calcularCustoEdificio(setorAtivo, index, nivel = 1) {
    const base = EDIFICIOS_FINAIS_ESTATICOS[setorAtivo].edificios[index];
    if (!base) return 0;
    const custoConstrucaoRecurso = base.custoConstrucao || 0;
    const quantidadeTerrenosNec = base.lojasNecessarias?.terrenos || 0;
    const quantidadeLojasPNec = base.lojasNecessarias?.lojasP || 0;
    const quantidadeLojasMNec = base.lojasNecessarias?.lojasM || 0;
    const quantidadeLojasGNec = base.lojasNecessarias?.lojasG || 0;
    const custoTotalTerrenos = quantidadeTerrenosNec * edificioBase.terrenos.preçoConstrução;
    const custoTotalLojasP = quantidadeLojasPNec * (edificioBase.lojasP.preçoConstrução + (EDIFICIOS_BASE_ESTATICOS.lojasP.quantidadeNecTerreno * edificioBase.terrenos.preçoConstrução));
    const custoTotalLojasM = quantidadeLojasMNec * (edificioBase.lojasM.preçoConstrução + (EDIFICIOS_BASE_ESTATICOS.lojasM.quantidadeNecTerreno * edificioBase.terrenos.preçoConstrução));
    const custoTotalLojasG = quantidadeLojasGNec * (edificioBase.lojasG.preçoConstrução + (EDIFICIOS_BASE_ESTATICOS.lojasG.quantidadeNecTerreno * edificioBase.terrenos.preçoConstrução));
    let custoTotalRecurso = custoConstrucaoRecurso + custoTotalTerrenos + custoTotalLojasP + custoTotalLojasM + custoTotalLojasG;
    return custoTotalRecurso;
  }

  const percSetor = (setorAtivo) => {
    switch (setorAtivo) {
      case "recessão": return 50;
      case "declinio": return 60;
      case "estável": return 70;
      case "progressiva": return 75;
      case "aquecida": return 80;
      default: return 10;
    }
  };

  const patrimônioAtual = calcularCustoEdificio(setorAtivo, index);
  const patrimônioDepreciado = (patrimônioAtual * (percSetor(economiaSetoresAtual) / 100)).toFixed(2);
  const totalVenda = Number(patrimônioDepreciado) * quantidadeMarcador;

  const venderEdificio = () => {
    console.log("🟡 [venderEdificio] START", { setorAtivo, index, quantidadeMarcador, qtdEd });

    if (quantidadeMarcador > qtdEd) {
      console.warn("❌ [venderEdificio] BLOQUEADO: quantidadeMarcador > qtdEd", { quantidadeMarcador, qtdEd });
      return;
    }

    const novoValorQuantidadeEd = qtdEd - quantidadeMarcador;
    console.log("🔢 [venderEdificio] novoValorQuantidadeEd:", novoValorQuantidadeEd);

    const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

    // 1. Snapshot antes
    const { edificiosFinais, atualizarEdificio } = useCentralStore.getState();
    console.log("📦 [venderEdificio] edificiosFinais ANTES:", JSON.stringify(edificiosFinais[setorAtivo]?.edificios?.[index]));
    console.log("🔧 [venderEdificio] atualizarEdificio existe?", typeof atualizarEdificio);

    // 2. Atualiza Zustand
    atualizarEdificio(setorAtivo, index, { quantidade: novoValorQuantidadeEd });

    // Verifica se o Zustand atualizou de fato
    const depois = useCentralStore.getState().edificiosFinais[setorAtivo]?.edificios?.[index];
    console.log("📦 [venderEdificio] edificiosFinais DEPOIS:", JSON.stringify(depois));

    // 3. Saldo
    console.log("💰 [venderEdificio] saldo ANTES:", economiaSetores.saldo, "| totalVenda:", totalVenda);
    atualizarEco("saldo", economiaSetores.saldo + totalVenda);

    // 4. Monta carteira
    const novaCarteira = setoresArr.map((s) => {
      const listaEst = EDIFICIOS_FINAIS_ESTATICOS[s]?.edificios || [];
      const listaDin = edificiosFinais[s]?.edificios || [];

      const resultado = listaEst
        .map((edEst, i) => {
          const qtd = (s === setorAtivo && i === index)
            ? novoValorQuantidadeEd
            : (listaDin[i]?.quantidade ?? 0);
          if (qtd <= 0) return null;
          return { nome: edEst.nome, quantidade: qtd };
        })
        .filter(Boolean);

      if (resultado.length > 0) {
        console.log(`🗂️ [carteira] setor ${s}:`, resultado);
      }

      return resultado;
    });

    console.log("🗂️ [venderEdificio] novaCarteira completa:", JSON.stringify(novaCarteira));

    // 5. Atualiza contexto
    setEconomiaSetores(prev => {
      console.log("🔄 [setEconomiaSetores] carteira ANTES:", JSON.stringify(prev.carteira?.carteiraAtual));
      return {
        ...prev,
        carteira: { ...prev.carteira, carteiraAtual: novaCarteira }
      };
    });

    console.log("✅ [venderEdificio] DONE | novoValorQuantidadeEd:", novoValorQuantidadeEd);

    if (novoValorQuantidadeEd === 0) onClose();
  };

  const aumentarQuantidadeMarcador = () => { if (qtdEd > quantidadeMarcador) setQuantidadeMarcador(quantidadeMarcador + 1); };
  const diminuirQuantidadeMarcador = () => { if (quantidadeMarcador > 1) setQuantidadeMarcador(quantidadeMarcador - 1); };

  // Cores do setor para o brilho dinâmico
  const coresSetores = {
    agricultura: "#4CAF50", tecnologia: "#FF8C42", industria: "#B3B3B3",
    comercio: "#FF4D4D", imobiliario: "#6666FF", energia: "#FFD966"
  };
  const corSetor = coresSetores[setorAtivo] || "#6A00FF";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex justify-center items-center z-[120] bg-black/90 backdrop-blur-sm select-none">

        {/* Brilho de fundo dinâmico */}
        <div className="absolute inset-0 blur-[120px] opacity-10 pointer-events-none" style={{ backgroundColor: corSetor }} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          className="relative w-[85vw] max-w-[1100px] h-[80vh] bg-gradient-to-br from-[#350973] to-[#1a053d] rounded-[32px] border border-laranja/30 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
        >
          {/* Linha de brilho superior */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-laranja/40 to-transparent" />

          {/* Header */}
          <div className="p-8 flex justify-between items-start">
            <div>
              <span className="text-laranja text-xs font-black uppercase tracking-[0.3em] mb-2 block">Ordem de Desinvestimento</span>
              <h1 className="text-white text-4xl font-extrabold tracking-tight italic">
                {base.nome}
              </h1>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => { onClose(); buttonCloseAudio(); }}
              className="text-white/20 hover:text-laranja transition-colors"
            >
              <X className="w-8 h-8" />
            </motion.button>
          </div>

          {/* Conteúdo Principal */}
          <div className="flex-1 flex gap-8 p-8 pt-0 overflow-hidden">

            {/* LADO ESQUERDO: Dados e Economia */}
            <div className="flex-1 flex flex-col gap-6">

              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <p className="text-white/80 text-lg font-light leading-relaxed">
                  O setor de <span className="text-white font-bold uppercase" style={{ color: corSetor }}>{setorAtivo}</span> opera em ciclo <span className="text-white font-bold">{economiaSetoresAtual}</span>.
                </p>
                <div className="mt-4 flex items-center gap-3 text-laranja/80 text-sm italic">
                  <AlertCircle className="w-4 h-4" />
                  <span>Taxa de liquidez atual: {percSetor(economiaSetoresAtual)}% do valor de construção.</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                  <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-2">Avaliação de Unidade</p>
                  <div className="flex items-center gap-2">
                    <TrendingDown className="text-white/20 w-5 h-5" />
                    <span className="text-white text-xl font-light">R$ {patrimônioAtual.toLocaleString()}</span>
                  </div>
                </div>
                <div className="bg-laranja/5 border border-laranja/20 p-5 rounded-2xl">
                  <p className="text-laranja/60 text-[10px] uppercase tracking-widest font-bold mb-2">Oferta por Unidade</p>
                  <div className="flex items-center gap-2">
                    <DollarSign className="text-laranja w-5 h-5" />
                    <span className="text-laranja text-xl font-bold">R$ {Number(patrimônioDepreciado).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* CardLocalization Renderizado aqui com destaque */}
              <div className="flex-1 bg-black/20 rounded-2xl border border-white/5 p-4 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-grid-white/[0.02]" />
                {/* Renderizando o seu componente CardLocalization aqui. 
                  Como ele costuma vir via função localizador ou import, use conforme seu projeto:
                */}
                {Localizador(base.nome, null, index, setor)}
              </div>
            </div>

            {/* LADO DIREITO: Painel de Ação */}
            <div className="w-[320px] bg-white/5 border border-white/10 rounded-[24px] p-8 flex flex-col justify-between">

              <div className="space-y-6">
                <p className="text-center text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold">Quantidade para Venda</p>

                <div className="flex items-center justify-between bg-[#1a053d] border border-white/10 rounded-2xl p-2">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={diminuirQuantidadeMarcador}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </motion.button>

                  <div className="text-center">
                    <span className="text-white text-4xl font-black">{quantidadeMarcador}</span>
                    <p className="text-white/20 text-[10px] mt-1">Disponível: {qtdEd}</p>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={aumentarQuantidadeMarcador}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">Total Estimado</p>
                  <span className="text-white text-3xl font-light">R$ </span>
                  <span className="text-laranja text-4xl font-black tracking-tighter">
                    {totalVenda.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { venderEdificio(); buttonPayTerrain(); }}
                  className="w-full py-5 bg-gradient-to-r from-laranja to-[#E56100] rounded-2xl text-white font-black uppercase tracking-widest text-sm shadow-[0_20px_40px_rgba(229,97,0,0.2)] flex items-center justify-center gap-3 transition-all"
                >
                  <Check className="w-5 h-5" />
                  Confirmar Venda
                </motion.button>

                <p className="text-center text-white/20 text-[9px] uppercase tracking-widest font-medium">
                  Ação processada via economia global
                </p>
              </div>

            </div>
          </div>

          {/* Footer visual sutil */}
          <div className="h-2 w-full bg-laranja/10 mt-auto" />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};