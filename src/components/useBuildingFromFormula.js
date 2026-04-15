import { useContext, useMemo } from "react";
// import { CentraldeDadosContext } from "../centralDeDadosContext";
import { FORMULAS_EDIFICIOS } from "./productionFormulasConfig";
import { useCentralStore, EDIFICIOS_BASE_DINAMICOS, EDIFICIOS_FINAIS_DINAMICOS_INICIAL,LICENCAS_DINAMICAS_GLOBAIS } from "../stores/useCentralStore";
import {
  EDIFICIOS_FINAIS_ESTATICOS,
  LICENCAS_ESTATICAS,
  EDIFICIOS_BASE_ESTATICOS,
  LICENCAS_ESTATICAS_GLOBAIS,
} from "../stores/dadosEstáticos";

const SETORES = [
  "agricultura",
  "industria",
  "comercio",
  "tecnologia",
  "imobiliario",
  "energia",
];

export function useBuildingFromFormula(formula) {
  // const { dados } = useContext(CentraldeDadosContext);

  return useMemo(() => {
    if (!formula || !EDIFICIOS_FINAIS_DINAMICOS_INICIAL) {
      return {
        setor: null,
        quantidadeAtiva: 0,
        nivel: 1,
        edificio: null,
        maxAcoesSimultaneas: 0,
      };
    }

    // 🔗 achar config do edifício pela fórmula
    const edificioConfig = FORMULAS_EDIFICIOS.find(ed =>
      ed.formulas.some(f => f.id === formula.id)
    );

    if (!edificioConfig) {
      return {
        setor: null,
        quantidadeAtiva: 0,
        nivel: 1,
        edificio: null,
        maxAcoesSimultaneas: 0,
      };
    }

    const setor = edificioConfig.setor;

    const edificiosSetor = EDIFICIOS_FINAIS_ESTATICOS?.[setor]?.edificios || [];

    const edificioReal = edificiosSetor.find(
      ed => ed.nome === edificioConfig.nomeEdificio
    );

    if (!edificioReal) {
      return {
        setor,
        quantidadeAtiva: 0,
        nivel: 1,
        edificio: null,
        maxAcoesSimultaneas: 0,
      };
    }





    const quantidadeAtiva = edificioReal.quantidade || 0;
    
    
    
    
    const quantidadeMinimaPowerUpNv3 = edificioReal.powerUp.nível3.quantidadeMínima;
    const quantidadeMinimaPowerUpNv2 =  edificioReal.powerUp.nível2.quantidadeMínima;
    
    
    const powerUpSelecionado =
    quantidadeAtiva >= quantidadeMinimaPowerUpNv3
    ? "powerUpNv3"
    : quantidadeAtiva >= quantidadeMinimaPowerUpNv2
    ? "powerUpNv2"
    : "powerUpNv1";
    
      const powerUpFinal = (powerUp) => {
        switch (powerUp) {
          case "powerUpNv1":
            return 1;
          case "powerUpNv2":
            return 2;
          case "powerUpNv3":
            return 3;
          default:
            return 1;
        }
      };

    const nivel = powerUpFinal(powerUpSelecionado);
    





    const maxAcoesSimultaneas =
      edificioConfig.maxAcoesSimultaneasPorNivel?.[nivel] || 0;

    return {
      setor,
      quantidadeAtiva,
      nivel,
      edificio: edificioReal,
      maxAcoesSimultaneas,
    };
  }, [EDIFICIOS_FINAIS_DINAMICOS_INICIAL, formula]);
}
