import React, { createContext, useContext, useState } from 'react';

// Criação do contexto
const DadosEconomyGlobalContext = createContext();

// Provedor do contexto
const DadosEconomyGlobalProvider = ({ children }) => {

    const [economiaSetores, setEconomiaSetores] = useState({
        saldo: 900000000,
        fimGame: false,
        economiaGlobal: "estável",
        valorImpostoAnual:0,
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

    return (
        <DadosEconomyGlobalContext.Provider value={{ economiaSetores, atualizarEco, setEconomiaSetores, atualizarDadosEconomy, atualizarEcoProf }}>
            {children}
        </DadosEconomyGlobalContext.Provider>
    );
};

// Hook para usar o contexto
export { DadosEconomyGlobalProvider, DadosEconomyGlobalContext };