import { useMemo } from "react";
import { useCentralStore } from "../stores/useCentralStore";
import { EDIFICIOS_FINAIS_ESTATICOS } from "../stores/dadosEstáticos";

export function useBuildingFromFormula(formula, quantidadeForcada = null) {
  const edificiosFinais = useCentralStore((s) => s.edificiosFinais);

  const { quantidadeAtiva, nivel, maxAcoesSimultaneas, edificio } = useMemo(() => {
    let quantidade = quantidadeForcada;

    if (quantidade === null || quantidade === undefined) {
      let setorEncontrado = null;
      let indexEncontrado = -1;

      for (const setor of Object.keys(EDIFICIOS_FINAIS_ESTATICOS)) {
        const edificiosEstaticos = EDIFICIOS_FINAIS_ESTATICOS[setor]?.edificios || [];
        const idx = edificiosEstaticos.findIndex(e => e.nome === formula?.nomeEdificio);
        if (idx !== -1) {
          setorEncontrado = setor;
          indexEncontrado = idx;
          break;
        }
      }

      if (setorEncontrado !== null) {
        quantidade = edificiosFinais?.[setorEncontrado]?.edificios?.[indexEncontrado]?.quantidade ?? 0;
      } else {
        quantidade = 0;
      }
    }

    const edEst = Object.values(EDIFICIOS_FINAIS_ESTATICOS)
      .flatMap(s => s.edificios || [])
      .find(e => e.nome === formula?.nomeEdificio);
    
    const qtdMin2 = edEst?.powerUp?.nível2?.quantidadeMínima ?? Infinity;
    const qtdMin3 = edEst?.powerUp?.nível3?.quantidadeMínima ?? Infinity;
    
    const nivelCalculado = quantidade >= qtdMin3 ? 3 : quantidade >= qtdMin2 ? 2 : 1;

    const maxAcoes = formula?.maxAcoesSimultaneasPorNivel?.[nivelCalculado] || 1;

    return {
      quantidadeAtiva: quantidade,
      nivel: nivelCalculado,
      maxAcoesSimultaneas: maxAcoes,
      edificio: edEst,
    };
  }, [formula, edificiosFinais, quantidadeForcada]);

  return { quantidadeAtiva, nivel, maxAcoesSimultaneas, edificio };
}