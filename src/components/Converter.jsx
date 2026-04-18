import { useEffect, useContext } from "react";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import { useCentralStore } from "../stores/useCentralStore";
import {
  EDIFICIOS_BASE_ESTATICOS
} from "../stores/dadosEstáticos";

export default function Converter() {
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);

  const dia = useCentralStore((s) => s.dia);
  const edificiosBase = useCentralStore((s) => s.edificiosBase);

  const lojas = ["terrenos", "lojasP", "lojasM", "lojasG"];

  useEffect(() => {
    if (dia !== 270) return;

    let patrimonio = 0;

    lojas.forEach((loja) => {
      const dadosDin = edificiosBase[loja];
      const dadosEst = EDIFICIOS_BASE_ESTATICOS[loja];

      if (!dadosDin || !dadosEst) return;

      const quantidade = dadosDin.quantidade;
      const precoConstrucao = dadosDin.preçoConstrução;

      // 🔥 Agora vem do estático
      const terrenosNec = dadosEst.quantidadeNecTerreno;

      // 🔥 Terreno vem do dinâmico (preço atual)
      const custoTerreno = edificiosBase.terrenos.preçoConstrução;

      const custoTotal =
        quantidade * precoConstrucao +
        quantidade * terrenosNec * custoTerreno;

      patrimonio += custoTotal;
    });

    atualizarEco("saldo", economiaSetores.saldo + patrimonio);

    console.log("💰 Patrimônio convertido:", patrimonio);
  }, [dia]);
}