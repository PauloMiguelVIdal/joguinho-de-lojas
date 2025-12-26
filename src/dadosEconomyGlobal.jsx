import React, { createContext, useContext, useState } from "react";

// Criação do contexto
const DadosEconomyGlobalContext = createContext();

// Provedor do contexto
const DadosEconomyGlobalProvider = ({ children }) => {
  const [economiaSetores, setEconomiaSetores] = useState({
    saldo: 10000000,
    fimGame: false,
    economiaGlobal: "estável",
    valorImpostoAnual: 0,
    patrimonio:0,
    despesasImpostoAnual: {
      diaPagarImpostoAnual: false,
      impostoAnualPago: false,
      proximoPagamento: "",
    },
    negocios: {
      PlantacaoNegocio: {
        setor: "agricultura",
        produzir: {
          ofertasAtivas: [
            {
              id: 1,
              nome: "Milho",
              custo: 7000,
              sacas: 100,
              valorPorSaca: 100,
              duracao: 80,
              icon: "🌽",
            },
            {
              id: 2,
              nome: "Soja",
              custo: 5000,
              sacas: 50,
              valorPorSaca: 135,
              duracao: 120,
              icon: "🫘",
            },
            {
              id: 3,
              nome: "Trigo",
              custo: 3000,
              sacas: 50,
              valorPorSaca: 80,
              duracao: 180,
              icon: "🌾",
            },
            {
              id: 4,
              nome: "Cevada",
              custo: 3500,
              sacas: 50,
              valorPorSaca: 100,
              duracao: 90,
              icon: "🌱",
            },
          ],
          producaoAtual: null, // ou { grao: "milho", qtdSacas: 20, diaColher: 1200 }
          proximoCiclo: 30,
        },
        mercado: {
          ofertasAtivas: [
            {
              id: 1,
              name: "milho",
              sacas: 50,
              pricePerSack: 105,
              totalPrice: 5250,
            },
            {
              id: 2,
              name: "milho",
              sacas: 100,
              pricePerSack: 112,
              totalPrice: 11200,
            },
            {
              id: 3,
              name: "milho",
              sacas: 150,
              pricePerSack: 118,
              totalPrice: 17700,
            },
            {
              id: 4,
              name: "milho",
              sacas: 200,
              pricePerSack: 119,
              totalPrice: 23800,
            },
          ],
          vendasRealizadas: [], // ⬅️ ADICIONE ESTA LINHA
          proximoCiclo: 30,
        },
        estoque: {
          estoqueAtual: { soja: 0, milho: 0, cevada: 0, trigo: 0 },
          capacidadeEstoque: 500,
        },
      },
      AcougueNegocio: {
        setor: "comercio",
        compras: {
          ofertasAtivas: [
            {
              id: 1,
              nome: "Frigorífico Regional",
              tipo: "beef",
              quantidade: 80,
              preco: 2000,
              precoKg: 25,
              qualidade: "Premium",
              icon: "🥩",
            },
            {
              id: 2,
              nome: "Granja Feliz",
              tipo: "chicken",
              quantidade: 100,
              preco: 800,
              precoKg: 8,
              qualidade: "Orgânico",
              icon: "🍗",
            },
            {
              id: 3,
              nome: "Fazenda Suína Boa Terra",
              tipo: "pork",
              quantidade: 60,
              preco: 1080,
              precoKg: 18,
              qualidade: "Tradicional",
              icon: "🥓",
            },
            {
              id: 4,
              nome: "Fábrica de Embutidos SaborSul",
              tipo: "sausage",
              quantidade: 40,
              preco: 1000,
              precoKg: 25,
              qualidade: "Artesanal",
              icon: "🌭",
            },
          ],
          proximoCiclo: 30,
        },
        mercado: {
          ofertasAtivas: [
            {
              id: 1,
              nome: "beef",
              precoKg: 30,
              quantidade: 20,
              icon: "🥩",
              duracao: 120,
            },
            {
              id: 2,
              nome: "chicken",
              precoKg: 12,
              quantidade: 15,
              icon: "🍗",
              duracao: 120,
            },
            {
              id: 3,
              nome: "pork",
              precoKg: 18,
              quantidade: 10,
              icon: "🥓",
              duracao: 30,
            },
            {
              id: 4,
              nome: "sausage",
              precoKg: 22,
              quantidade: 8,
              icon: "🌭",
              duracao: 10,
            },
          ],
          vendasRealizadas: [],
          vendaAtual: null, // ou { nome, quantidade, precoKg, diaInicio, diaFim }
          proximoCiclo: 30,
        },
        estoque: {
          estoqueAtual: { beef: 0, pork: 0, chicken: 0, sausage: 0 },
          capacidadeEstoque: 5000,
        },
      },
      PainelSolarNegocio: {
        setor: "energia",
        produzir: {
          ofertasAtivas: [
            {
              id: 1,
              nome: "Residencial",
              tipo: "residencial",
              custo: 15000,
              unidades: 10,
              valorPorUnidade: 2000,
              duracao: 45,
              icon: "🏠",
            },
            {
              id: 7,
              nome: "Industrial",
              tipo: "industrial",
              custo: 80000,
              unidades: 10,
              valorPorUnidade: 10000,
              duracao: 90,
              icon: "🏭",
            },
            {
              id: 8,
              nome: "Industrial",
              tipo: "industrial",
              custo: 150000,
              unidades: 20,
              valorPorUnidade: 10000,
              duracao: 95,
              icon: "🏭",
            },
            {
              id: 10,
              nome: "Premium",
              tipo: "premium",
              custo: 50000,
              unidades: 5,
              valorPorUnidade: 12000,
              duracao: 75,
              icon: "⚡",
            },
          ],
          producaoAtual: null, // ou { nome, tipo, unidades, diaInicio, diaFim, icon }
          proximoCiclo: 30,
        },
        mercado: {
          ofertasAtivas: [
            {
              id: 1,
              name: "residencial",
              unidades: 5,
              pricePerUnit: 2250,
              totalPrice: 11250,
            },
            {
              id: 5,
              name: "comercial",
              unidades: 5,
              pricePerUnit: 5250,
              totalPrice: 26250,
            }, // +50%
            {
              id: 6,
              name: "comercial",
              unidades: 10,
              pricePerUnit: 5600,
              totalPrice: 56000,
            },
            {
              id: 9,
              name: "industrial",
              unidades: 3,
              pricePerUnit: 12000,
              totalPrice: 36000,
            },
          ],
          vendasRealizadas: [],
          proximoCiclo: 30,
        },
        estoque: {
          estoqueAtual: {
            residencial: 0,
            comercial: 0,
            industrial: 0,
            premium: 0,
          },
          capacidadeEstoque: 200,
        },
      },
      FabricaVeiculosNegocio: {
        setor: "industria",
        produzir: {
          ofertasAtivas: [
            {
              id: 1,
              nome: "Popular",
              tipo: "popular",
              custo: 45000,
              unidades: 5,
              valorPorUnidade: 12000,
              duracao: 60,
              icon: "🚗",
            },
            {
              id: 2,
              nome: "Popular",
              tipo: "popular",
              custo: 84000,
              unidades: 10,
              valorPorUnidade: 12000,
              duracao: 65,
              icon: "🚗",
            },
            {
              id: 4,
              nome: "Sedan",
              tipo: "sedan",
              custo: 80000,
              unidades: 5,
              valorPorUnidade: 20000,
              duracao: 75,
              icon: "🚙",
            },
            {
              id: 9,
              nome: "SUV",
              tipo: "suv",
              custo: 308000,
              unidades: 12,
              valorPorUnidade: 35000,
              duracao: 100,
              icon: "🚐",
            },
            {
              id: 14,
              nome: "Caminhonete",
              tipo: "caminhonete",
              custo: 180000,
              unidades: 8,
              valorPorUnidade: 30000,
              duracao: 90,
              icon: "🛻",
            },
            {
              id: 18,
              nome: "Van",
              tipo: "van",
              custo: 226800,
              unidades: 12,
              valorPorUnidade: 27000,
              duracao: 90,
              icon: "🚚",
            },
          ],
          producaoAtual: null, // ou { nome, tipo, unidades, diaInicio, diaFim, icon }
          proximoCiclo: 1200,
        },
        mercado: {
          ofertasAtivas: [
            {
              id: 1,
              name: "popular",
              unidades: 3,
              pricePerUnit: 15000,
              totalPrice: 45000,
            },
            {
              id: 2,
              name: "popular",
              unidades: 5,
              pricePerUnit: 16000,
              totalPrice: 80000,
            },
            {
              id: 10,
              name: "suv",
              unidades: 3,
              pricePerUnit: 48000,
              totalPrice: 144000,
            },
            {
              id: 11,
              name: "suv",
              unidades: 5,
              pricePerUnit: 51000,
              totalPrice: 255000,
            },
            {
              id: 12,
              name: "suv",
              unidades: 6,
              pricePerUnit: 50400,
              totalPrice: 302400,
            },
            {
              id: 23,
              name: "van",
              unidades: 6,
              pricePerUnit: 38250,
              totalPrice: 229500,
            },
            {
              id: 24,
              name: "van",
              unidades: 8,
              pricePerUnit: 37800,
              totalPrice: 302400,
            },
            {
              id: 18,
              name: "caminhonete",
              unidades: 4,
              pricePerUnit: 40000,
              totalPrice: 160000,
            },
          ],
          vendasRealizadas: [],
          proximoCiclo: 1200,
        },
        estoque: {
          estoqueAtual: {
            popular: 0,
            sedan: 0,
            suv: 0,
            luxo: 0,
            caminhonete: 0,
            van: 0,
          },
          capacidadeEstoque: 100,
        },
      },
      FabricaSmartphonesNegocio: {
        setor: "tecnologia",
        produzir: {
          ofertasAtivas: [
            {
              id: 1,
              nome: "Básico",
              tipo: "basico",
              custo: 20000,
              unidades: 20,
              valorPorUnidade: 1200,
              duracao: 40,
              icon: "📱",
            },
            {
              id: 16,
              nome: "Dobrável",
              tipo: "dobravel",
              custo: 200000,
              unidades: 8,
              valorPorUnidade: 30000,
              duracao: 100,
              icon: "📴",
            },
            {
              id: 13,
              nome: "Gamer",
              tipo: "gamer",
              custo: 120000,
              unidades: 12,
              valorPorUnidade: 12000,
              duracao: 75,
              icon: "🎮",
            },
            {
              id: 7,
              nome: "Premium",
              tipo: "premium",
              custo: 100000,
              unidades: 15,
              valorPorUnidade: 8000,
              duracao: 70,
              icon: "📳",
            },
            {
              id: 8,
              nome: "Premium",
              tipo: "premium",
              custo: 180000,
              unidades: 30,
              valorPorUnidade: 8000,
              duracao: 75,
              icon: "📳",
            },
            {
              id: 9,
              nome: "Premium",
              tipo: "premium",
              custo: 252000,
              unidades: 45,
              valorPorUnidade: 8000,
              duracao: 80,
              icon: "📳",
            },
          ],
          producaoAtual: null, // ou { nome, tipo, unidades, diaInicio, diaFim, icon }
          proximoCiclo: 1200,
        },
        mercado: {
          ofertasAtivas: [
            {
              id: 1,
              name: "basico",
              unidades: 10,
              pricePerUnit: 1500,
              totalPrice: 15000,
            },
            {
              id: 22,
              name: "dobravel",
              unidades: 6,
              pricePerUnit: 40000,
              totalPrice: 240000,
            }, // +60%
            {
              id: 23,
              name: "dobravel",
              unidades: 8,
              pricePerUnit: 42500,
              totalPrice: 340000,
            }, // +70%
            {
              id: 24,
              name: "dobravel",
              unidades: 10,
              pricePerUnit: 42000,
              totalPrice: 420000,
            }, // +68%
            {
              id: 18,
              name: "gamer",
              unidades: 10,
              pricePerUnit: 16000,
              totalPrice: 160000,
            }, // +60%
            {
              id: 19,
              name: "gamer",
              unidades: 12,
              pricePerUnit: 17000,
              totalPrice: 204000,
            }, // +70%
            {
              id: 20,
              name: "gamer",
              unidades: 15,
              pricePerUnit: 16800,
              totalPrice: 252000,
            }, // +68%
            {
              id: 8,
              name: "intermediario",
              unidades: 25,
              pricePerUnit: 4200,
              totalPrice: 105000,
            },
            // ... (12 ofertas sorteadas)
          ],
          vendasRealizadas: [],
          proximoCiclo: 1200,
        },
        estoque: {
          estoqueAtual: {
            basico: 0,
            intermediario: 0,
            premium: 0,
            flagship: 0,
            gamer: 0,
            dobravel: 0,
          },
          capacidadeEstoque: 150,
        },
      },
      // No seu dadosEconomyGlobal.jsx, adicione:

      ConstrutoraInfraestruturaNegocio: {
        setor: "imobiliario",
        licitacoes: {
          ofertasAtivas: [
            // 4 licitações sorteadas do array base
          ],
          obraAtual: null,
          proximoCiclo: 60, // dias
        },
        equipamentos: {
          maquinarios: {
            escavadeira: 0,
            betoneira: 0,
            guindaste: 0,
            retroescavadeira: 0,
            rolo: 0,
            perfuratriz: 0,
          },
        },
      },
      TerraplagagemPavimentacaoNegocio: {
        setor: "imobiliario",
        licitacoes: {
          ofertasAtivas: [
            {
              id: 1,
              nome: "Pavimentação Avenida Principal",
              tipo: "Pavimentação",
              localizacao: "São Paulo - SP",
              custo: 5500000,
              duracao: 90,
              requisitos: {
                motoniveladora: 2,
                compactador: 2,
                vibroacabadora: 2,
                rolo_compressor: 2,
              },
              icon: "🛣️",
              descricao:
                "Recapeamento asfáltico de 5km em avenida de grande movimento",
              lucro: 1200000,
            },
            {
              id: 2,
              nome: "Terraplenagem Loteamento Residencial",
              tipo: "Terraplenagem",
              localizacao: "Campinas - SP",
              custo: 3200000,
              duracao: 60,
              requisitos: {
                motoniveladora: 2,
                compactador: 1,
                caminhao_basculante: 3,
              },
              icon: "⛰️",
              descricao: "Preparação de terreno para 200 lotes residenciais",
              lucro: 750000,
            },
            {
              id: 3,
              nome: "Rodovia Vicinal Pavimentação",
              tipo: "Pavimentação",
              localizacao: "Ribeirão Preto - SP",
              custo: 12000000,
              duracao: 150,
              requisitos: {
                motoniveladora: 3,
                compactador: 3,
                vibroacabadora: 3,
                rolo_compressor: 3,
                caminhao_basculante: 2,
              },
              icon: "🚧",
              descricao:
                "Pavimentação de 15km de rodovia vicinal com sinalização",
              lucro: 2800000,
            },
            {
              id: 4,
              nome: "Pátio Industrial",
              tipo: "Terraplenagem",
              localizacao: "Jundiaí - SP",
              custo: 2800000,
              duracao: 45,
              requisitos: {
                motoniveladora: 1,
                compactador: 2,
                caminhao_basculante: 2,
              },
              icon: "🏭",
              descricao: "Terraplanagem e nivelamento de pátio para indústria",
              lucro: 620000,
            },
          ],
          obraAtual: null,
          proximoCiclo: 1200,
        },
        equipamentos: {
          maquinarios: {
            motoniveladora: 0,
            compactador: 0,
            caminhao_basculante: 0,
            fresadora: 0,
            vibroacabadora: 0,
            rolo_compressor: 0,
          },
        },
      },
      MineradoraNegocio: {
        setor: "industria",
        exploracao: {
          jazidasAtivas: [
            {
              id: 1,
              nome: "Mina de Cobre Serra Verde",
              tipo: "cobre",
              localizacao: "Carajás - PA",
              custo: 8500000,
              duracao: 120,
              toneladas: 500,
              requisitos: {
                escavadeira_mineracao: 3,
                perfuratriz_mineracao: 2,
                caminhao_fora_estrada: 3,
                britador: 2,
              },
              icon: "🟠",
              descricao: "Jazida de cobre de alta pureza em região montanhosa",
            },
            {
              id: 2,
              nome: "Depósito de Cobre Vale Dourado",
              tipo: "cobre",
              localizacao: "Itabira - MG",
              custo: 6200000,
              duracao: 90,
              toneladas: 350,
              requisitos: {
                escavadeira_mineracao: 2,
                perfuratriz_mineracao: 2,
                caminhao_fora_estrada: 2,
                britador: 1,
              },
              icon: "🟠",
              descricao: "Depósito superficial de cobre com fácil acesso",
            },
            {
              id: 3,
              nome: "Jazida de Cobre Rio Azul",
              tipo: "cobre",
              localizacao: "Altamira - PA",
              custo: 12000000,
              duracao: 150,
              toneladas: 800,
              requisitos: {
                escavadeira_mineracao: 4,
                perfuratriz_mineracao: 3,
                caminhao_fora_estrada: 4,
                britador: 3,
                carregadeira: 2,
              },
              icon: "🟠",
              descricao: "Grande reserva de cobre em área de floresta",
            },
            {
              id: 4,
              nome: "Mina de Cobre Planalto",
              tipo: "cobre",
              localizacao: "Goiás - GO",
              custo: 4500000,
              duracao: 70,
              toneladas: 250,
              requisitos: {
                escavadeira_mineracao: 2,
                caminhao_fora_estrada: 2,
                britador: 1,
              },
              icon: "🟠",
              descricao: "Pequena jazida de cobre com alto teor metálico",
            },
          ],
          exploracaoAtual: null, // ou { nome, tipo, localizacao, custo, duracao, toneladas, requisitos, icon, descricao, diaInicio, diaFim }
          proximoCiclo: 1200,
        },
        mercado: {
          ofertasAtivas: [
            {
              id: 6,
              name: "ferro",
              toneladas: 200,
              pricePerTon: 17500,
              totalPrice: 3500000,
            }, // +40%
            {
              id: 7,
              name: "ferro",
              toneladas: 400,
              pricePerTon: 18750,
              totalPrice: 7500000,
            }, // +50%
            {
              id: 8,
              name: "ferro",
              toneladas: 600,
              pricePerTon: 20000,
              totalPrice: 12000000,
            }, // +60%
            {
              id: 9,
              name: "ferro",
              toneladas: 350,
              pricePerTon: 19000,
              totalPrice: 6650000,
            }, // +52%
            {
              id: 10,
              name: "ferro",
              toneladas: 500,
              pricePerTon: 19500,
              totalPrice: 9750000,
            }, // +56%

            // BAUXITA (custo médio: ~11.000/ton → venda: 15.400-17.600)
            {
              id: 11,
              name: "bauxita",
              toneladas: 150,
              pricePerTon: 15400,
              totalPrice: 2310000,
            }, // +40%
            {
              id: 12,
              name: "bauxita",
              toneladas: 300,
              pricePerTon: 16500,
              totalPrice: 4950000,
            }, // +50%
            {
              id: 13,
              name: "bauxita",
              toneladas: 450,
              pricePerTon: 17600,
              totalPrice: 7920000,
            }, // +60%
          ],
          vendasRealizadas: [],
          proximoCiclo: 1200,
        },
        equipamentos: {
          maquinarios: {
            escavadeira_mineracao: 0,
            perfuratriz_mineracao: 0,
            caminhao_fora_estrada: 0,
            britador: 0,
            carregadeira: 0,
            draga: 0,
          },
        },
        estoque: {
          minerios: {
            cobre: 0,
            ferro: 0,
            bauxita: 0,
          },
          capacidade: 5000, // toneladas
        },
      },
    },
    idContrato: 0,
    contratosBancos: [],
    despesasEmprestimo: {
      diaPagarDespesas: false,
      despesasPagas: true,
      proximoPagamento: "30",
    },
    centralEdificios: {
      classificacaoPorteEmpresa: "Micro Empresa",
      quantidadeUnicoMax: 3,
      quantidadeSetoresMax: 2,
      quantidadeDiversosEdificiosMax: 5,
      quantidadeEdificiosMax: 7,
      quantidadeUnicoAtual: 0,
      quantidadeSetoresAtual: 0,
      quantidadeDiversosEdificiosAtual: 0,
      quantidadeEdificiosAtual: 0,
    },
    porteEmpresa: [
      {
        chave: "empreendimento_individual",
        nome: "Empreendimento Individual",
        qtdMaxSetores: 2,
        edificiosUnicosMax: 3,
        qtdMaxDiversificar: 3,
        totalMaxEdificios: 5,
        custoUpgrade: 0,
        status: true,
        descricao:
          "Uma pequena operação para iniciar seu negócio com recursos limitados.",
        textoLiberacao:
          "Você poderá ter até 3 tipos de edifícios diferentes, 2 unidades por tipo, totalizando 5 edifícios.",
      },
      {
        chave: "sociedade_limitada",
        nome: "Sociedade Limitada",
        qtdMaxSetores: 3,
        edificiosUnicosMax: 5,
        qtdMaxDiversificar: 5,
        totalMaxEdificios: 15,
        custoUpgrade: 200000,
        status: false,
        descricao: "Uma empresa com capacidade maior de investimento e gestão.",
        textoLiberacao:
          "Agora você pode ter até 5 tipos de edifícios diferentes, 5 unidades por tipo, totalizando 15 edifícios.",
      },
      {
        chave: "empresa_regional",
        nome: "Empresa Regional",
        qtdMaxSetores: 3,
        edificiosUnicosMax: 7,
        qtdMaxDiversificar: 7,
        totalMaxEdificios: 25,
        custoUpgrade: 500000,
        status: false,
        descricao:
          "Expansão para atuação em toda a região, com maior diversidade de edificações.",
        textoLiberacao:
          "Você poderá ter até 7 tipos de edifícios, 7 unidades por tipo, totalizando 25 edifícios.",
      },
      {
        chave: "companhia_local",
        nome: "Companhia Local",
        qtdMaxSetores: 4,
        edificiosUnicosMax: 10,
        qtdMaxDiversificar: 9,
        totalMaxEdificios: 40,
        custoUpgrade: 1000000,
        status: false,
        descricao:
          "Um porte sólido para consolidar presença local e maior faturamento.",
        textoLiberacao:
          "Agora pode possuir até 9 tipos de edifícios, 10 unidades por tipo, totalizando 40 edifícios.",
      },
      {
        chave: "empresa_estadual",
        nome: "Empresa Estadual",
        qtdMaxSetores: 5,
        edificiosUnicosMax: 12,
        qtdMaxDiversificar: 12,
        totalMaxEdificios: 60,
        custoUpgrade: 2500000,
        status: false,
        descricao:
          "Capacidade para expandir em todo o estado, com grande diversidade de negócios.",
        textoLiberacao:
          "Você terá até 12 tipos de edifícios, 12 unidades por tipo, totalizando 60 edifícios.",
      },
      {
        chave: "companhia_nacional",
        nome: "Companhia Nacional",
        qtdMaxSetores: 5,
        edificiosUnicosMax: 20,
        qtdMaxDiversificar: 40,
        totalMaxEdificios: 100,
        custoUpgrade: 5000000,
        status: false,
        descricao:
          "Empresa com alcance nacional, gerando grande volume de operações.",
        textoLiberacao:
          "Até 15 tipos de edifícios, 15 unidades por tipo, totalizando 90 edifícios.",
      },
      {
        chave: "corporacao_multissetorial",
        nome: "Corporação Multissetorial",
        qtdMaxSetores: 6,
        edificiosUnicosMax: 40,
        qtdMaxDiversificar: 50,
        totalMaxEdificios: 300,
        custoUpgrade: 10000000,
        status: false,
        descricao:
          "Corporação de grande porte, com atuação em múltiplos setores e alto faturamento.",
        textoLiberacao:
          "Você poderá ter até 18 tipos de edifícios, 20 unidades por tipo, totalizando 130 edifícios.",
      },
      {
        chave: "grupo_empresarial",
        nome: "Grupo Empresarial",
        qtdMaxSetores: 6,
        edificiosUnicosMax: 55,
        qtdMaxDiversificar: 70,
        totalMaxEdificios: 500,
        custoUpgrade: 20000000,
        status: false,
        descricao:
          "Grupo com alcance estratégico nacional e diversificação de negócios.",
        textoLiberacao:
          "Agora você pode possuir até 22 tipos de edifícios, 25 unidades por tipo, totalizando 180 edifícios.",
      },
      {
        chave: "conglomerado_global",
        nome: "Conglomerado Global",
        qtdMaxSetores: 6,
        edificiosUnicosMax: 70,
        qtdMaxDiversificar: 100,
        totalMaxEdificios: 1000,
        custoUpgrade: 40000000,
        status: false,
        descricao:
          "Empresa de alcance internacional, com domínio de múltiplos mercados.",
        textoLiberacao:
          "Você poderá ter até 26 tipos de edifícios, 35 unidades por tipo, totalizando 250 edifícios.",
      },
      {
        chave: "mega_holding",
        nome: "Mega Holding",
        qtdMaxSetores: 6,
        edificiosUnicosMax: 100,
        qtdMaxDiversificar: 160,
        totalMaxEdificios: 1000000,
        custoUpgrade: 80000000,
        status: false,
        descricao:
          "Holding máxima, sem limites de operação, capaz de dominar todo o mercado.",
        textoLiberacao:
          "Não há limites de tipos ou quantidade de edifícios. Você tem liberdade total para expandir sua holding.",
      },
    ],

    modalImpostoAnual: {
      estadoModal: false,
      head: "",
      content: "",
    },
    imposto: {
      impostoFixoMensal: 0,
      impostoDiário: 0,
      impostoMensal: 0,
      impostoSobreFaturamentoDiário: 0,
            arrayimpostoDiário: [],
    },
    agricultura: {
      economiaSetor: {
        patrimonio: 0,
        estadoAtual: "estável",
        percImpostoAnualAtual: 20,
        ArrayFatu: [],
        ArrayFatuHistory: [],
        arrValorImpostoAnualPorMes: [],
        valorImpostoAnualAtual: 0,
        RelatórioMensalImpostoAnual: {},
      },
    },
    tecnologia: {
      economiaSetor: {
        patrimonio: 0,
        estadoAtual: "estável",
        percImpostoAnualAtual: 24,
        ArrayFatu: [],
        ArrayFatuHistory: [],
        arrValorImpostoAnualPorMes: [],
        valorImpostoAnualAtual: 0,
        RelatórioMensalImpostoAnual: {},
      },
    },
    comercio: {
      economiaSetor: {
        patrimonio: 0,
        estadoAtual: "estável",
        percImpostoAnualAtual: 22,
        ArrayFatu: [],
        ArrayFatuHistory: [],
        arrValorImpostoAnualPorMes: [],
        valorImpostoAnualAtual: 0,
        RelatórioMensalImpostoAnual: {},
      },
    },
    industria: {
      economiaSetor: {
        patrimonio: 0,
        estadoAtual: "estável",
        percImpostoAnualAtual: 24,
        ArrayFatu: [],
        ArrayFatuHistory: [],
        arrValorImpostoAnualPorMes: [],
        valorImpostoAnualAtual: 0,
        RelatórioMensalImpostoAnual: {},
      },
    },
    imobiliario: {
      economiaSetor: {
        patrimonio: 0,
        estadoAtual: "estável",
        percImpostoAnualAtual: 22,
        ArrayFatu: [],
        ArrayFatuHistory: [],
        arrValorImpostoAnualPorMes: [],
        valorImpostoAnualAtual: 0,
        RelatórioMensalImpostoAnual: {},
      },
    },
    energia: {
      economiaSetor: {
        patrimonio: 0,
        estadoAtual: "estável",
        percImpostoAnualAtual: 20,
        ArrayFatu: [], 
        ArrayFatuHistory: [], 
        arrValorImpostoAnualPorMes: [],
        valorImpostoAnualAtual: 0,
        RelatórioMensalImpostoAnual: {},
      },
    },
    carteira: {
      carteiraAtual: [],
      // economiaSetor: {
      //     estadoAtual: "estável",
      //     percImpostoAnualAtual: 12,
      //     ArrayFatu: [],
      //     arrValorImpostoAnualPorMes: [],
      //     valorImpostoAnualAtual: 0,
      //     RelatórioMensalImpostoAnual: {}
      //   }
    },
      patrimonioGlobal: 0,
  valorImpostoAnual: 0,

      despesasImpostoAnual: {
    diaPagarImpostoAnual: false,
    impostoAnualPago: false,
    proximoPagamento: 360,
  },
  });

  const atualizarDadosEconomy = (caminho, novoValor) => {
    setEconomiaSetores((prevState) => {
      const novosDados = JSON.parse(JSON.stringify(prevState)); // cópia profunda
      let ref = novosDados;

      for (let i = 0; i < caminho.length - 1; i++) {
        if (!ref[caminho[i]]) {
          console.error(
            `Caminho inválido em atualizarDadosProf2: ${caminho[i]} está undefined no passo ${i}`
          );
          return prevState;
        }
        ref = ref[caminho[i]];
      }

      ref[caminho[caminho.length - 1]] = novoValor;

      return novosDados;
    });
  };

  const atualizarEco = (chave, novoValor) => {
    setEconomiaSetores((prevState) => ({
      ...prevState,
      [chave]: novoValor,
    }));
  };

  const atualizarEcoCallback = (chave, novoValor) => {
    setEconomiaSetores((prevState) => ({
      ...prevState,
      [chave]:
        typeof novoValor === "function"
          ? novoValor(prevState[chave])
          : novoValor,
    }));
  };

  const atualizarEcoProf = (caminho, novoValor) => {
    setEconomiaSetores((prevState) => {
      const novosDados = JSON.parse(JSON.stringify(prevState)); // cópia profunda
      let ref = novosDados;

      for (let i = 0; i < caminho.length - 1; i++) {
        // console.log(`Ref antes do passo ${i}:`, ref);
        // console.log(`Acessando chave:`, caminho[i]);

        if (ref === undefined || ref === null) {
          // console.warn(`❌ ERRO: ref é undefined na etapa ${i}, chave: ${caminho[i]}`);
          // console.warn(`CAMINHO COMPLETO:`, caminho);
          return prevState; // não altera nada
        }

        ref = ref[caminho[i]];
      }

      const ultimaChave = caminho[caminho.length - 1];
      // console.log(`🔧 Atualizando chave final '${ultimaChave}' com valor:`, novoValor);
      ref[ultimaChave] = novoValor;

      return novosDados;
    });
  };

  const atualizarEcoProfSeguro = (caminho, valorOuFunc) => {
    if (!Array.isArray(caminho) || caminho.length === 0) {
      console.warn(
        "❌ Caminho inválido passado para atualizarEcoProfSeguro:",
        caminho
      );
      return;
    }

    atualizarEcoProf((prevState) => {
      const novosDados = JSON.parse(JSON.stringify(prevState));
      let ref = novosDados;

      for (let i = 0; i < caminho.length - 1; i++) {
        const chave = caminho[i];
        if (chave === undefined || chave === null) {
          console.warn(
            "❌ Chave indefinida no caminho em atualizarEcoProfSeguro:",
            caminho,
            "passo",
            i
          );
          return prevState;
        }
        if (!ref[chave]) ref[chave] = {}; // cria objeto se não existir
        ref = ref[chave];
      }

      const ultimaChave = caminho[caminho.length - 1];
      if (ultimaChave === undefined || ultimaChave === null) {
        console.warn(
          "❌ Última chave indefinida em atualizarEcoProfSeguro:",
          caminho
        );
        return prevState;
      }

      if (typeof valorOuFunc === "function") {
        ref[ultimaChave] = valorOuFunc(ref[ultimaChave] || {});
      } else {
        ref[ultimaChave] = valorOuFunc;
      }

      // console.log("🔧 Atualização segura:", caminho, "->", ref[ultimaChave]);
      return novosDados;
    });
  };

  // dentro do provider do contexto
  // dentro do DadosEconomyGlobalProvider
  const verificarLimites = (edificio, setor, carteiraParam) => {
    // console.log("=== verificarLimites START ===");
    // console.log(
    //   "edificio (nome, quantidade):",
    //   edificio?.nome,
    //   edificio?.quantidade
    // );
    // console.log("setor pedido:", setor);

    const setoresArr = [
      "agricultura",
      "tecnologia",
      "comercio",
      "industria",
      "imobiliario",
      "energia",
    ];

    // pega carteira passada ou do estado
    const carteiraRaw = Array.isArray(carteiraParam)
      ? carteiraParam
      : economiaSetores?.carteira?.carteiraAtual ?? [];
    // console.log("carteira raw (entrada):", carteiraRaw);

    // Garantir que carteira tenha uma posição para cada setor (normaliza)
    const carteira = setoresArr.map((_, i) => {
      const v = carteiraRaw[i];
      if (Array.isArray(v)) return v;
      if (v === undefined || v === null) return [];
      if (typeof v === "object") return [v]; // se vier objeto único
      return [];
    });
    // console.log("carteira normalizada:", carteira);

    // leitura tolerante dos limites no centralEdificios
    const ce = economiaSetores?.centralEdificios ?? {};
    const quantidadeUnicoMax = Number(ce.quantidadeUnicoMax ?? 999);
    const quantidadeSetoresMax = Number(ce.quantidadeSetoresMax ?? 999);
    const quantidadeDiversosEdificiosMax = Number(
      ce.quantidadeDiversosEdificiosMax ?? 999
    );
    const quantidadeEdificiosMax = Number(ce.quantidadeEdificiosMax ?? 999);

    // console.log("limites lidos:", {
    //   quantidadeUnicoMax,
    //   quantidadeSetoresMax,
    //   quantidadeDiversosEdificiosMax,
    //   quantidadeEdificiosMax,
    // });

    // índice do setor
    const setorIndex = setoresArr.indexOf(setor);
    if (setorIndex === -1) {
      // console.warn("setor inválido passado para verificador:", setor);
      return `Setor inválido: ${setor}`;
    }

    // 1) Limite unidades do mesmo edifício
    const quantidadeAtualEdif = Number(edificio?.quantidade ?? 0);
    // console.log(
    //   "quantidadeAtualEdif:",
    //   quantidadeAtualEdif,
    //   "-> max:",
    //   quantidadeUnicoMax
    // );
    if (quantidadeAtualEdif + 1 > quantidadeUnicoMax) {
      // console.log("-> falha: ultrapassa limite único");
      return `Você não pode ter mais que ${quantidadeUnicoMax} unidades do mesmo edifício.`;
    }

    // 2) setores ativos
    const setoresAtivos = carteira.reduce(
      (acc, arr) => acc + (Array.isArray(arr) && arr.length > 0 ? 1 : 0),
      0
    );
    const setorJaAtivo =
      Array.isArray(carteira[setorIndex]) && carteira[setorIndex].length > 0;
    const novosSetoresAtivos = setorJaAtivo ? setoresAtivos : setoresAtivos + 1;
    // console.log(
    //   "setoresAtivos:",
    //   setoresAtivos,
    //   "setorJaAtivo:",
    //   setorJaAtivo,
    //   "novosSetoresAtivos:",
    //   novosSetoresAtivos,
    //   "max:",
    //   quantidadeSetoresMax
    // );
    if (novosSetoresAtivos > quantidadeSetoresMax) {
      // console.log("-> falha: ultrapassa limite de setores ativos");
      return `Você não pode ter mais que ${quantidadeSetoresMax} setores ativos.`;
    }

    // 3) diversidade: tipos diferentes de edifícios (contagem por nome único)
    const nomesSet = new Set();
    carteira.forEach((arr) => {
      if (!Array.isArray(arr)) return;
      arr.forEach((item) => {
        if (!item) return;
        if (typeof item === "string") nomesSet.add(item);
        else if (typeof item === "object" && item.nome)
          nomesSet.add(String(item.nome));
      });
    });

    // console.log("nomes únicos atuais na carteira:", Array.from(nomesSet));
    const jaExisteTipo = nomesSet.has(String(edificio?.nome));
    const novosTipos = jaExisteTipo ? nomesSet.size : nomesSet.size + 1;

    // atualiza centralEdificios
    if (economiaSetores?.centralEdificios) {
      economiaSetores.centralEdificios.quantidadeDiversosEdificiosAtual =
        nomesSet.size;
    }

    // console.log(
    //   "jaExisteTipo:",
    //   jaExisteTipo,
    //   "novosTipos:",
    //   novosTipos,
    //   "max:",
    //   quantidadeDiversosEdificiosMax
    // );
    if (novosTipos > quantidadeDiversosEdificiosMax) {
      // console.log("-> falha: ultrapassa limite de diversidade");
      return `Você não pode ter mais que ${quantidadeDiversosEdificiosMax} tipos diferentes de edifícios.`;
    }

    // 4) limite total de edifícios (soma de todas as quantidades)
    const totalEdificiosAtuais = carteira.reduce((sum, arr) => {
      if (!Array.isArray(arr)) return sum;
      return sum + arr.reduce((s, e) => s + Number(e?.quantidade ?? 0), 0);
    }, 0);
    const novosTotalEdificios = totalEdificiosAtuais + 1; // compra adiciona 1 unidade

    // atualiza centralEdificios
    if (economiaSetores?.centralEdificios) {
      economiaSetores.centralEdificios.quantidadeEdificiosAtual =
        totalEdificiosAtuais;
    }

    // console.log(
    //   "totalEdificiosAtuais:",
    //   totalEdificiosAtuais,
    //   "novosTotalEdificios:",
    //   novosTotalEdificios,
    //   "max:",
    //   quantidadeEdificiosMax
    // );
    if (novosTotalEdificios > quantidadeEdificiosMax) {
      // console.log("-> falha: ultrapassa limite total de edifícios");
      return `Você não pode ter mais que ${quantidadeEdificiosMax} edifícios no total.`;
    }

    // console.log("=== verificarLimites OK ===");
    return true;
  };

  // Função para liberar o próximo nível
  const liberaProximoNivel = () => {
    setEconomiaSetores((prev) => {
      const novoArray = prev.porteEmpresa.map((nivel, i) =>
        i === index ? { ...nivel, status: true } : nivel
      );

      const nivelAtual = novoArray[index];

      return {
        ...prev,
        centralEdificios: {
          ...prev.centralEdificios,
          classificacaoPorteEmpresa:
            nivelAtual.nome ?? prev.centralEdificios.classificacaoPorteEmpresa,
          quantidadeUnicoMax:
            prev.centralEdificios.quantidadeUnicoMax +
            (nivelAtual.edificiosUnicosMax ?? 0),
          quantidadeSetoresMax:
            prev.centralEdificios.quantidadeSetoresMax +
            (nivelAtual.qtdMaxSetores ?? 0),
          quantidadeDiversosEdificiosMax:
            prev.centralEdificios.quantidadeDiversosEdificiosMax +
            (nivelAtual.qtdMaxDiversificar ?? 0),
          quantidadeEdificiosMax:
            prev.centralEdificios.quantidadeEdificiosMax +
            (nivelAtual.totalMaxEdificios ?? 0),
        },
        porteEmpresa: novoArray,
      };
    });
  };

const atualizarEcoSafely = (chave, patch) => {
  setEconomiaSetores((prev) => {
    const prevItem = prev?.[chave] || {};
    const prevEco = prevItem?.economiaSetor || {};

    // determina o patch real
    const patchObj =
      typeof patch === "function" ? patch(prevEco, prevItem, prev) : patch || {};

    // ✅ CORREÇÃO: Merge profundo do economiaSetor
    const novoEconomiaSetor = { 
      ...prevEco, 
      ...patchObj 
    };

    return {
      ...prev,
      [chave]: { 
        ...prevItem, 
        economiaSetor: novoEconomiaSetor 
      },
    };
  });
};
  const salvarContrato = (novoContrato) => {
    setContratos((prev) => [...prev, novoContrato]);
  };

  return (
    <DadosEconomyGlobalContext.Provider
      value={{
        economiaSetores,
        atualizarEco,
        setEconomiaSetores,
        atualizarDadosEconomy,
        atualizarEcoProf,
        atualizarEcoProfSeguro,
        verificarLimites,
        liberaProximoNivel,
        salvarContrato,
        atualizarEcoCallback,
        atualizarEcoSafely
      }}
    >
      {children}
    </DadosEconomyGlobalContext.Provider>
  );
};

// Hook para usar o contexto
export { DadosEconomyGlobalProvider, DadosEconomyGlobalContext };
