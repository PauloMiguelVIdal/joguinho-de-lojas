import React, { useState, createContext } from 'react';

const CarteiraContext = createContext();

const CarteiraProvider = ({ children }) => {

const [dados, setDados] = useState({
    carteira: {
        economiaSetor: {
          estadoAtual: "estável"
        },
        licençaGlobal: {
          comprado: true,
          valor: 20000
        },
        licençasSetor: {
  
        },
        produtos: {
          plantaçãoDeGrãos: {
            quantidade: 60,
            lojasNecessárias: {
              terrenos: 20,
              lojasP: 1,
              lojasM: 0,
              lojasG: 0,
            },
  
            construçõesNecessárias: [],
  
            licençasNecessárias: [{ construção: "fazendaAdministrativa" }],
  
            melhoraEficiencia: [
              "Fábrica De Ração",
              "Biofábrica",
              "Mercado",
              "Feira Livre",
            ],
  
            receitas: [
              { construção: "depósitoDeResíduosOrgânicos", quantidade: 0 }
            ],
  
            dependências: [
              { construção: "fazendaAdministrativa", quantidade: 0 }
            ],
  
            powerUp: {
              redCustoAtual: 0,
              aumFatuAtual: 0,
              nível1: { status: true, quantidadeMínima: 1, impacto: 5 },
              nível2: { status: true, quantidadeMínima: 10, impacto: 10 },
              nível3: { status: true, quantidadeMínima: 50, impacto: 15 },
            }
          }
        }
      },

        })
        
          const atualizarDados = (chave, novoValor) => {
            setDados(prevState => ({
              ...prevState,
              [chave]: novoValor
            }));
          };
        
          const atualizarDadosProf = (caminho, novoValor) => {
            setDados(prevState => {
              const novosDados = JSON.parse(JSON.stringify(prevState)); // cópia profunda
              let ref = novosDados[dados.setorAtivo];
        
              for (let i = 0; i < caminho.length - 1; i++) {
                ref = ref[caminho[i]];
              }
        
              ref[caminho[caminho.length - 1]] = novoValor;
        
              return {
                ...prevState,
                [dados.setorAtivo]: novosDados[dados.setorAtivo]
              };
            });
          };
        
          const atualizarDadosProf2 = (caminho, novoValor) => {
            setDados(prevState => {
              const novosDados = JSON.parse(JSON.stringify(prevState)); // cópia profunda
              let ref = novosDados;
        
              for (let i = 0; i < caminho.length - 1; i++) {
                if (!ref[caminho[i]]) {
                  console.error(`Caminho inválido em atualizarDadosProf2: ${caminho[i]} está undefined no passo ${i}`);
                  return prevState; // Não faz nada e evita quebrar o app
                }
                ref = ref[caminho[i]];
              }
        
              ref[caminho[caminho.length - 1]] = novoValor;
        
              return novosDados;
            });
          }
        
          const atualizarDadosProf3 = (caminho, novoValor) => {
            setDados(prevState => {
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
        
          const atualizarDadosVariados = (chave, novoValor) => {
            setDados(prevState => ({
              ...prevState,
              [chave]: novoValor
            }));
          };
        
        
        
          return (
            <CarteiraContext.Provider value={{ dados, atualizarDados, atualizarDadosProf, atualizarDadosProf2, atualizarDadosProf3, atualizarDadosVariados }}>
              {children}
            </CarteiraContext.Provider>
          );
        };
        
        
        
        export { CarteiraContext, CarteiraProvider };