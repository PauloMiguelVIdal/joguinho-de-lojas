import React, { createContext, useContext, useState } from 'react';

// Criação do contexto
const DadosEconomyGlobalContext = createContext();

// Provedor do contexto
 const DadosEconomyGlobalProvider = ({ children }) => {

    const [economiaSetores, setEconomiaSetores] = useState({
        saldo: 900000000,
        fimGame: false,
        economiaGlobal:"estável",
        imposto: {
            impostoFixoMensal: 0,
            impostoDiário: 0,
            impostoMensal: 0,
            impostoSobreFaturamentoDiário: 0
          },
        agricultura: {
            economiaSetor: {
                estadoAtual: "estável"
            },
        },
        tecnologia: {
            economiaSetor: {
                estadoAtual: "estável"
            },
        },
        comercio: {
            economiaSetor: {
                estadoAtual: "estável"
            },
        },
        industria: {
            economiaSetor: {
                estadoAtual: "estável"
            },
        },
        imobiliario: {
            economiaSetor: {
                estadoAtual: "estável"
            },
        },
        energia: {
            economiaSetor: {
                estadoAtual: "estável"
            },
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
    

    return (
        <DadosEconomyGlobalContext.Provider value={{economiaSetores,atualizarEco,setEconomiaSetores,atualizarDadosEconomy}}>
            {children}
        </DadosEconomyGlobalContext.Provider>
    );
};

// Hook para usar o contexto
export {DadosEconomyGlobalProvider, DadosEconomyGlobalContext};