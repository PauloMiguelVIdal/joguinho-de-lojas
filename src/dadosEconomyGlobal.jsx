import React, { createContext, useContext, useState } from 'react';

// Criação do contexto
const DadosEconomyGlobalContext = createContext();

// Provedor do contexto
const DadosEconomyGlobalProvider = ({ children }) => {

    const [economiaSetores, setEconomiaSetores] = useState({
        saldo: 90000,
        fimGame: false,
        economiaGlobal: "estável",
        valorImpostoAnual:0,
        despesasImpostoAnual: {
          diaPagarImpostoAnual: false,
          impostoAnualPago: false,
          proximoPagamento: ""
        },
        modalImpostoAnual: {
          estadoModal: false,
          head: "",
          content: ""
        },
        imposto: {
            impostoFixoMensal: 0,
            impostoDiário: 0,
            impostoMensal: 0,
            impostoSobreFaturamentoDiário: 0
        },
        agricultura: {
            economiaSetor: {
                estadoAtual: "estável",
                percImpostoAnualAtual: 12,
                ArrayFatu: [],
                arrValorImpostoAnualPorMes: [],
                valorImpostoAnualAtual: 0,
                RelatórioMensalImpostoAnual: {}
              }
              
        },
        tecnologia: {
            economiaSetor: {
                estadoAtual: "estável",
                percImpostoAnualAtual: 14,
                ArrayFatu: [],
                arrValorImpostoAnualPorMes: [],
                valorImpostoAnualAtual: 0,
                RelatórioMensalImpostoAnual: {}
              }
        },
        comercio: {
            economiaSetor: {
                estadoAtual: "estável",
                percImpostoAnualAtual: 13,
                ArrayFatu: [],
                arrValorImpostoAnualPorMes: [],
                valorImpostoAnualAtual: 0,
                RelatórioMensalImpostoAnual: {}
              }
        },
        industria: {
            economiaSetor: {
                estadoAtual: "estável",
                percImpostoAnualAtual: 12,
                ArrayFatu: [],
                arrValorImpostoAnualPorMes: [],
                valorImpostoAnualAtual: 0,
                RelatórioMensalImpostoAnual: {}
              }
        },
        imobiliario: {
            economiaSetor: {
                estadoAtual: "estável",
                percImpostoAnualAtual: 12,
                ArrayFatu: [],
                arrValorImpostoAnualPorMes: [],
                valorImpostoAnualAtual: 0,
                RelatórioMensalImpostoAnual: {}
              }
        },
        energia: {
            economiaSetor: {
                estadoAtual: "estável",
                percImpostoAnualAtual: 12,
                ArrayFatu: [],
                arrValorImpostoAnualPorMes: [],
                valorImpostoAnualAtual: 0,
                RelatórioMensalImpostoAnual: {}
              }
        },
        // carteira: {
        //     economiaSetor: {
        //         estadoAtual: "estável",
        //         percImpostoAnualAtual: 12,
        //         ArrayFatu: [],
        //         arrValorImpostoAnualPorMes: [],
        //         valorImpostoAnualAtual: 0,
        //         RelatórioMensalImpostoAnual: {}
        //       }
        // },
    });

    const atualizarDadosEconomy = (caminho, novoValor) => {
        setEconomiaSetores(prevState => {
            const novosDados = JSON.parse(JSON.stringify(prevState)); // cópia profunda
            let ref = novosDados;

            for (let i = 0; i < caminho.length - 1; i++) {
                if (!ref[caminho[i]]) {
                    console.error(`Caminho inválido em atualizarDadosProf2: ${caminho[i]} está undefined no passo ${i}`);
                    return prevState;
                }
                ref = ref[caminho[i]];
            }

            ref[caminho[caminho.length - 1]] = novoValor;

            return novosDados;
        });
    }

    const atualizarEco = (chave, novoValor) => {
        setEconomiaSetores(prevState => ({
            ...prevState,
            [chave]: novoValor
        }));
    };

    const atualizarEcoProf = (caminho, novoValor) => {
        setEconomiaSetores(prevState => {
          const novosDados = JSON.parse(JSON.stringify(prevState)); // cópia profunda
          let ref = novosDados;
    
          for (let i = 0; i < caminho.length - 1; i++) {
            console.log(`Ref antes do passo ${i}:`, ref);
            console.log(`Acessando chave:`, caminho[i]);
    
            if (ref === undefined || ref === null) {
              console.warn(`❌ ERRO: ref é undefined na etapa ${i}, chave: ${caminho[i]}`);
              console.warn(`CAMINHO COMPLETO:`, caminho);
              return prevState; // não altera nada
            }
    
            ref = ref[caminho[i]];
          }
    
          const ultimaChave = caminho[caminho.length - 1];
          console.log(`🔧 Atualizando chave final '${ultimaChave}' com valor:`, novoValor);
          ref[ultimaChave] = novoValor;
    
          return novosDados;
        });
      };

      const atualizarEcoProfSeguro = (caminho, valorOuFunc) => {
        if (!Array.isArray(caminho) || caminho.length === 0) {
          console.warn("❌ Caminho inválido passado para atualizarEcoProfSeguro:", caminho);
          return;
        }
      
        atualizarEcoProf(prevState => {
          const novosDados = JSON.parse(JSON.stringify(prevState));
          let ref = novosDados;
      
          for (let i = 0; i < caminho.length - 1; i++) {
            const chave = caminho[i];
            if (chave === undefined || chave === null) {
              console.warn("❌ Chave indefinida no caminho em atualizarEcoProfSeguro:", caminho, "passo", i);
              return prevState;
            }
            if (!ref[chave]) ref[chave] = {}; // cria objeto se não existir
            ref = ref[chave];
          }
      
          const ultimaChave = caminho[caminho.length - 1];
          if (ultimaChave === undefined || ultimaChave === null) {
            console.warn("❌ Última chave indefinida em atualizarEcoProfSeguro:", caminho);
            return prevState;
          }
      
          if (typeof valorOuFunc === "function") {
            ref[ultimaChave] = valorOuFunc(ref[ultimaChave] || {});
          } else {
            ref[ultimaChave] = valorOuFunc;
          }
      
          console.log("🔧 Atualização segura:", caminho, "->", ref[ultimaChave]);
          return novosDados;
        });
      };
      

    return (
        <DadosEconomyGlobalContext.Provider value={{ economiaSetores, atualizarEco, setEconomiaSetores, atualizarDadosEconomy, atualizarEcoProf,atualizarEcoProfSeguro }}>
            {children}
        </DadosEconomyGlobalContext.Provider>
    );
};

// Hook para usar o contexto
export { DadosEconomyGlobalProvider, DadosEconomyGlobalContext };