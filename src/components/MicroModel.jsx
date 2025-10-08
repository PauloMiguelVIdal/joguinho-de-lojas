import React, { useState, useContext, useEffect } from 'react';
import { Clock, DollarSign, Package, Warehouse, Users, Building2, Sun, TrendingUp, Zap, Car, Truck, Smartphone, Cpu, HardHat, AlertTriangle, MapPin } from 'lucide-react';
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";
import plantacao from "../../public/imagens/Plantação De Grãos.png"
import açougue from "../../public/imagens/Açougue.png"
import painel from "../../public/imagens/Fábrica De Painéis Solares.png"
import automovel from "../../public/imagens/Fábrica De Automóveis.png"
import smartphone from "../../public/imagens/Fábrica De Smartphones.png"
import construtora from "../../public/imagens/Construtora De Infraestruturas.png"
import terraplanagem from "../../public/imagens/Terraplanagem E Pavimentação.png"

// ==================== CONFIGURAÇÃO DE SETORES ====================
const SETORES_CONFIG = {
  agricultura: {
    id: "agricultura",
    nome: "Agricultura",
    cores: { primary: '#003816', secondary: '#1A5E2A', accent: '#0C9123', light: '#4CAF50' },
    icon: '🌾'
  },
  comercio: {
    id: "comercio",
    nome: "Comércio",
    cores: { primary: '#660000', secondary: '#A31919', accent: '#E60000', light: '#FF4D4D' },
    icon: '🏪'
  },
  tecnologia: {
    id: "tecnologia",
    nome: "Tecnologia",
    cores: { primary: '#A64B00', secondary: '#D45A00', accent: '#FF6F00', light: '#FF8C42' },
    icon: '💻'
  },
  industria: {
    id: "industria",
    nome: "Indústria",
    cores: { primary: '#1A1A1A', secondary: '#4D4D4D', accent: '#808080', light: '#B3B3B3' },
    icon: '🏭'
  },
  imobiliario: {
    id: "imobiliario",
    nome: "Imobiliário",
    cores: { primary: '#000066', secondary: '#1A1A8C', accent: '#3333CC', light: '#6666FF' },
    icon: '🏢'
  },
  energia: {
    id: "energia",
    nome: "Energia",
    cores: { primary: '#665200', secondary: '#A37F19', accent: '#E6B800', light: '#FFD966' },
    icon: '⚡'
  }
};

// ==================== FUNÇÃO AUXILIAR PARA SORTEAR ITENS ====================
const sortearItens = (baseData, quantidade) => {
  const copia = [...baseData];
  const sorteados = [];
  for (let i = 0; i < quantidade && copia.length > 0; i++) {
    const idx = Math.floor(Math.random() * copia.length);
    sorteados.push(copia.splice(idx, 1)[0]);
  }
  return sorteados;
};

// ==================== COMPONENTE BASE ====================
const BaseBusinessInterface = ({ negocio, tabs, renderTabContent, headerExtra, footerExtra }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const cores = negocio.cores;

  const TabButton = ({ id, label, icon: Icon, info }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-semibold ${activeTab === id
        ? 'text-white shadow-lg'
        : 'text-gray-700 hover:bg-gray-200'}`}
      style={activeTab === id ? { backgroundColor: cores.accent } : { backgroundColor: '#FFFFFF' }}
    >
      <Icon size={16} />
      <span>{label}</span>
      {info && <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">{info}</span>}
    </button>
  );

  const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', {
    style: 'currency', currency: 'BRL', minimumFractionDigits: 0
  }).format(value);

  return (
    <div
      className="w-full h-[70vh] rounded-[20px] p-6 overflow-auto"
      style={{ background: `linear-gradient(135deg, ${cores.primary}, ${cores.secondary}, ${cores.accent})` }}
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-white">
            <Building2 className="w-6 h-6" style={{ color: cores.accent }} />
          </div>
          <h1 className="text-2xl font-bold text-white">{negocio.nome}</h1>
        </div>

        {headerExtra && <div className="mt-4">{headerExtra}</div>}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map(tab => <TabButton key={tab.id} {...tab} />)}
      </div>

      <div className=''>{renderTabContent(activeTab, cores, formatCurrency)}</div>
      {footerExtra && (
        <div className="text-center text-white mt-4 text-sm opacity-90 bg-black/20 py-2 rounded-lg">
          {footerExtra(activeTab)}
        </div>
      )}
    </div>
  );
};

// ==================== PLANTAÇÃO ====================
const PlantacaoNegocio = () => {
  const { dados } = useContext(CentraldeDadosContext);
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);

  const getProductIcon = (type) => {
    const icons = {
      beef: '🥩',
      pork: '🥓',
      chicken: '🍗',
      sausage: '🌭',
      milho: '🌽',
      soja: '🫘',
      trigo: '🌾',
      cevada: '🌱'
    };
    return icons[type] || '📦';
  };

  const graosBase = [
    { id: 1, nome: "Milho", custo: 7000, sacas: 100, valorPorSaca: 100, duracao: 80, icon: "🌽" },
    { id: 2, nome: "Soja", custo: 5000, sacas: 50, valorPorSaca: 135, duracao: 120, icon: "🫘" },
    { id: 3, nome: "Trigo", custo: 3000, sacas: 50, valorPorSaca: 80, duracao: 180, icon: "🌾" },
    { id: 4, nome: "Cevada", custo: 3500, sacas: 50, valorPorSaca: 100, duracao: 90, icon: "🌱" },
    { id: 5, nome: "Milho", custo: 10500, sacas: 150, valorPorSaca: 100, duracao: 85, icon: "🌽" },
    { id: 6, nome: "Milho", custo: 14700, sacas: 200, valorPorSaca: 100, duracao: 90, icon: "🌽" },
    { id: 7, nome: "Soja", custo: 7200, sacas: 75, valorPorSaca: 135, duracao: 130, icon: "🫘" },
    { id: 8, nome: "Soja", custo: 9600, sacas: 100, valorPorSaca: 135, duracao: 140, icon: "🫘" },
    { id: 9, nome: "Trigo", custo: 4200, sacas: 75, valorPorSaca: 80, duracao: 190, icon: "🌾" },
    { id: 10, nome: "Trigo", custo: 5600, sacas: 100, valorPorSaca: 80, duracao: 200, icon: "🌾" },
    { id: 11, nome: "Cevada", custo: 4950, sacas: 75, valorPorSaca: 100, duracao: 95, icon: "🌱" },
    { id: 12, nome: "Cevada", custo: 6650, sacas: 100, valorPorSaca: 100, duracao: 100, icon: "🌱" },
    { id: 13, nome: "Milho", custo: 18900, sacas: 250, valorPorSaca: 100, duracao: 95, icon: "🌽" },
    { id: 14, nome: "Soja", custo: 11800, sacas: 125, valorPorSaca: 135, duracao: 150, icon: "🫘" },
    { id: 15, nome: "Trigo", custo: 6900, sacas: 125, valorPorSaca: 80, duracao: 210, icon: "🌾" },
    { id: 16, nome: "Cevada", custo: 9100, sacas: 125, valorPorSaca: 100, duracao: 105, icon: "🌱" },
  ];

  const marketOffersBase = [
    { id: 1, name: "milho", sacas: 50, pricePerSack: 105, totalPrice: 5250 },
    { id: 2, name: "milho", sacas: 100, pricePerSack: 112, totalPrice: 11200 },
    { id: 3, name: "milho", sacas: 150, pricePerSack: 118, totalPrice: 17700 },
    { id: 4, name: "milho", sacas: 200, pricePerSack: 119, totalPrice: 23800 },
    { id: 5, name: "soja", sacas: 50, pricePerSack: 150, totalPrice: 7500 },
    { id: 6, name: "soja", sacas: 100, pricePerSack: 160, totalPrice: 16000 },
    { id: 7, name: "soja", sacas: 150, pricePerSack: 166, totalPrice: 24900 },
    { id: 8, name: "soja", sacas: 200, pricePerSack: 172, totalPrice: 34400 },
    { id: 9, name: "trigo", sacas: 50, pricePerSack: 90, totalPrice: 4500 },
    { id: 10, name: "trigo", sacas: 100, pricePerSack: 96, totalPrice: 9600 },
    { id: 11, name: "trigo", sacas: 150, pricePerSack: 102, totalPrice: 15300 },
    { id: 12, name: "trigo", sacas: 200, pricePerSack: 101, totalPrice: 20200 },
    { id: 13, name: "cevada", sacas: 50, pricePerSack: 105, totalPrice: 5250 },
    { id: 14, name: "cevada", sacas: 100, pricePerSack: 112, totalPrice: 11200 },
    { id: 15, name: "cevada", sacas: 150, pricePerSack: 118, totalPrice: 17700 },
    { id: 16, name: "cevada", sacas: 200, pricePerSack: 119, totalPrice: 23800 },
  ];

  // ==================== INICIALIZAÇÃO DO NEGÓCIO NO CONTEXT ====================
  useEffect(() => {
    // Garantir que vendasRealizadas existe na estrutura
    if (economiaSetores.negocios?.PlantacaoNegocio &&
      !economiaSetores.negocios.PlantacaoNegocio.mercado?.vendasRealizadas) {
      atualizarEco("negocios", {
        ...economiaSetores.negocios,
        PlantacaoNegocio: {
          ...economiaSetores.negocios.PlantacaoNegocio,
          mercado: {
            ...economiaSetores.negocios.PlantacaoNegocio.mercado,
            vendasRealizadas: []
          }
        }
      });
    }
  }, []);

  // Atalho para o negócio
  const negocio = economiaSetores.negocios?.PlantacaoNegocio;

  // Se ainda não foi inicializado, retorna loading
  if (!negocio) {
    return <div className="text-white text-center p-8">Carregando negócio...</div>;
  }

  // ==================== ATUALIZAÇÃO DE CICLOS ====================
  useEffect(() => {
    if (!negocio) return;

    let precisaAtualizar = false;
    let novoNegocio = { ...negocio };

    // Verificar e atualizar ciclo de produção
    if (dados.dia >= negocio.produzir.proximoCiclo) {
      console.log("🔄 Atualizando ciclo de produção - Dia atual:", dados.dia, "Próximo ciclo era:", negocio.produzir.proximoCiclo);

      novoNegocio.produzir = {
        ...negocio.produzir,
        ofertasAtivas: sortearItens(graosBase, 4),
        proximoCiclo: dados.dia + 30
      };
      precisaAtualizar = true;
    }

    // Verificar e atualizar ciclo de mercado
    if (dados.dia >= negocio.mercado.proximoCiclo) {
      console.log("🔄 Atualizando ciclo de mercado - Dia atual:", dados.dia, "Próximo ciclo era:", negocio.mercado.proximoCiclo);

      novoNegocio.mercado = {
        ofertasAtivas: sortearItens(marketOffersBase, 8),
        vendasRealizadas: [],
        proximoCiclo: dados.dia + 90
      };
      precisaAtualizar = true;
    }

    // Só atualiza se realmente mudou algo
    if (precisaAtualizar) {
      atualizarEco("negocios", {
        ...economiaSetores.negocios,
        PlantacaoNegocio: novoNegocio
      });
    }
  }, [dados.dia, negocio?.produzir?.proximoCiclo, negocio?.mercado?.proximoCiclo]);

  // ==================== HANDLERS ====================
  const handlePlantar = (grao) => {
    if (economiaSetores.saldo < grao.custo) {
      alert("Saldo insuficiente!");
      return;
    }
    if (negocio.produzir.producaoAtual) {
      alert("Já existe uma produção em andamento!");
      return;
    }

    const novaProducao = {
      grao: grao.nome.toLowerCase(),
      qtdSacas: grao.sacas,
      diaInicio: dados.dia,
      diaColher: dados.dia + grao.duracao,
      icon: grao.icon
    };

    // Atualiza saldo
    atualizarEco("saldo", economiaSetores.saldo - grao.custo);

    // Atualiza produção atual
    atualizarEco("negocios", {
      ...economiaSetores.negocios,
      PlantacaoNegocio: {
        ...negocio,
        produzir: {
          ...negocio.produzir,
          producaoAtual: novaProducao
        }
      }
    });
  };

  const handleColheita = () => {
    if (!negocio.produzir.producaoAtual) return;

    const prod = negocio.produzir.producaoAtual;
    const novoEstoque = {
      ...negocio.estoque.estoqueAtual,
      [prod.grao]: (negocio.estoque.estoqueAtual[prod.grao] || 0) + prod.qtdSacas
    };

    atualizarEco("negocios", {
      ...economiaSetores.negocios,
      PlantacaoNegocio: {
        ...negocio,
        produzir: {
          ...negocio.produzir,
          producaoAtual: null
        },
        estoque: {
          ...negocio.estoque,
          estoqueAtual: novoEstoque
        }
      }
    });
  };

  const handleVender = (offer) => {
    const estoqueAtual = negocio.estoque.estoqueAtual[offer.name] || 0;
    if (offer.sacas > estoqueAtual) {
      alert("Você não tem sacas suficientes!");
      return;
    }

    const novoEstoque = {
      ...negocio.estoque.estoqueAtual,
      [offer.name]: estoqueAtual - offer.sacas
    };

    // Atualiza saldo
    atualizarEco("saldo", economiaSetores.saldo + offer.totalPrice);

    // Atualiza estoque e marca venda como realizada
    atualizarEco("negocios", {
      ...economiaSetores.negocios,
      PlantacaoNegocio: {
        ...negocio,
        estoque: {
          ...negocio.estoque,
          estoqueAtual: novoEstoque
        },
        mercado: {
          ...negocio.mercado,
          vendasRealizadas: [...(negocio.mercado.vendasRealizadas || []), offer.id]
        }
      }
    });
  };

  // ==================== RENDER TAB CONTENT ====================
  const renderTabContent = (tab, cores, formatCurrency) => {
    if (tab === 'produzir') {
      return (
        <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
          {negocio.produzir.ofertasAtivas.map((grao) => {
            const podeEscolher = !negocio.produzir.producaoAtual && economiaSetores.saldo >= grao.custo;
            return (
              <div key={grao.id} className="rounded-lg shadow-md p-4 bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{grao.icon}</span>
                  <h3 className="text-base font-bold" style={{ color: cores.primary }}>
                    {grao.nome}
                  </h3>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm"><span>Custo:</span><span>{formatCurrency(grao.custo)}</span></div>
                  <div className="flex justify-between text-sm"><span>Sacas:</span><span>{grao.sacas}</span></div>
                  <div className="flex justify-between text-sm"><span>Custo/Saca:</span><span>{formatCurrency(grao.custo / grao.sacas)}</span></div>
                  <div className="flex justify-between text-sm"><span>Duração:</span><span>{grao.duracao} dias</span></div>
                </div>
                <button
                  onClick={() => handlePlantar(grao)}
                  disabled={!podeEscolher}
                  className="w-full py-3 rounded font-bold text-white transition-colors"
                  style={{ backgroundColor: podeEscolher ? cores.accent : '#6C757D', cursor: podeEscolher ? 'pointer' : 'not-allowed' }}
                >
                  {negocio.produzir.producaoAtual ? 'Plantando...' : 'Plantar'}
                </button>
              </div>
            );
          })}
        </div>
      );
    }

    if (tab === 'mercado') {
      const ofertasDisponiveis = negocio.mercado.ofertasAtivas.filter(
        (offer) => !(negocio.mercado.vendasRealizadas || []).includes(offer.id)
      );

      return (
        <div className="grid grid-cols-4 gap-4 w-full mx-auto text-center">
          {ofertasDisponiveis.map((offer) => (
            <div key={offer.id} className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="font-bold text-gray-800 mb-2 capitalize text-2xl">{getProductIcon(offer.name)}</h3>
              <h3 className="font-bold text-gray-800 mb-2 capitalize">{offer.name}</h3>
              <p className="text-sm mb-1">{offer.sacas} sacas</p>
              <p className="text-xs text-gray-500 mb-3">R$ {offer.pricePerSack}/saca</p>
              <button
                onClick={() => handleVender(offer)}
                className="py-2 px-4 rounded font-bold text-white text-sm bg-green-600 hover:bg-green-700 transition-colors"
              >
                Vender por {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(offer.totalPrice)}
              </button>
            </div>
          ))}

          {ofertasDisponiveis.length === 0 && (
            <p className="col-span-4 text-white text-lg mt-4 bg-white/20 p-4 rounded-lg">
              ✅ Todos os compradores já foram atendidos neste ciclo!
            </p>
          )}
        </div>
      );
    }

    if (tab === 'estoque') {
      const estoqueTotal = Object.values(negocio.estoque.estoqueAtual).reduce((a, b) => a + b, 0);
      const percentualOcupado = ((estoqueTotal / negocio.estoque.capacidadeEstoque) * 100).toFixed(1);

      return (
        <div>
          <div className="text-center text-white mb-6 bg-white/20 rounded-lg p-4">
            <p className="text-xl font-bold mb-2">Capacidade do Estoque</p>
            <p className="text-2xl">{estoqueTotal} / {negocio.estoque.capacidadeEstoque} sacas</p>
            <p className="text-sm opacity-80 mt-1">{percentualOcupado}% ocupado</p>

            {/* Barra de progresso */}
            <div className="w-full bg-white/30 rounded-full h-3 mt-3">
              <div
                className="bg-green-400 h-3 rounded-full transition-all duration-300"
                style={{ width: `${percentualOcupado}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {Object.entries(negocio.estoque.estoqueAtual).map(([type, qtd]) => (
              <div key={type} className="text-center text-white bg-white/20 rounded-xl p-4 hover:bg-white/30 transition-colors">
                <h3 className="text-4xl mb-3">{getProductIcon(type)}</h3>
                <h3 className="text-3xl font-bold mb-2 capitalize">{type}</h3>
                <div className="text-xl mb-3 opacity-80">{qtd} sacas</div>
                {qtd === 0 && (
                  <p className="text-xs opacity-60">Estoque vazio</p>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  const estoqueTotal = Object.values(negocio.estoque.estoqueAtual).reduce((a, b) => a + b, 0);

  const tabs = [
    { id: 'produzir', label: 'Produzir', icon: Warehouse, info: null },
    { id: 'mercado', label: 'Mercado', icon: TrendingUp, info: null },
    { id: 'estoque', label: 'Estoque', icon: Package, info: `${estoqueTotal} Sacas` },
  ];

  const plantacaoProntaParaColher = negocio.produzir.producaoAtual &&
    dados.dia >= negocio.produzir.producaoAtual.diaColher;

  const negocioConfig = {
    nome: 'Plantação de Grãos',
    cores: SETORES_CONFIG.agricultura.cores
  };

  // Calcular dias restantes para os ciclos
  const diasRestantesProduzir = Math.max(0, negocio.produzir.proximoCiclo - dados.dia);
  const diasRestantesMercado = Math.max(0, negocio.mercado.proximoCiclo - dados.dia);

  return (
    <BaseBusinessInterface
      negocio={negocioConfig}
      tabs={tabs}
      renderTabContent={renderTabContent}
      headerExtra={
        negocio.produzir.producaoAtual && (
          <div className="bg-white bg-opacity-20 rounded-lg p-3 text-white text-sm">
            {plantacaoProntaParaColher ? (
              <div className="flex items-center justify-between">
                <span className="text-base">
                  {negocio.produzir.producaoAtual.icon} <strong className="capitalize">{negocio.produzir.producaoAtual.grao}</strong> pronto para colheita!
                </span>
                <button
                  onClick={handleColheita}
                  className="px-4 py-2 rounded font-bold bg-green-500 hover:bg-green-600 text-white transition-colors"
                >
                  Colher ({negocio.produzir.producaoAtual.qtdSacas} sacas)
                </button>
              </div>
            ) : (
              <div className="text-center">
                🌱 Cultivando <strong className="capitalize">{negocio.produzir.producaoAtual.grao}</strong> — Colheita no dia <strong>{negocio.produzir.producaoAtual.diaColher}</strong>
                <div className="text-xs opacity-80 mt-1">
                  ({negocio.produzir.producaoAtual.diaColher - dados.dia} dias restantes)
                </div>
              </div>
            )}
          </div>
        )
      }
      footerExtra={(tab) => {
        if (tab === 'produzir') {
          return diasRestantesProduzir === 0
            ? `🔄 Novas ofertas disponíveis!`
            : `Próximo ciclo de produção em ${diasRestantesProduzir} dias`;
        }
        if (tab === 'mercado') {
          return diasRestantesMercado === 0
            ? `🔄 Novos compradores disponíveis!`
            : `Próximo ciclo de mercado em ${diasRestantesMercado} dias`;
        }
        return null;
      }}
    />
  );
};


// ==================== EXEMPLO: AÇOUGUE ====================
const AcougueNegocio = () => {
  const { dados } = useContext(CentraldeDadosContext);
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);

  const getProductIcon = (type) => {
    const icons = {
      beef: '🥩',
      pork: '🥓',
      chicken: '🍗',
      sausage: '🌭'
    };
    return icons[type] || '📦';
  };

  const fornecedoresBase = [
    { id: 1, nome: "Frigorífico Regional", tipo: "beef", quantidade: 80, preco: 2000, precoKg: 25, qualidade: "Premium", icon: "🥩" },
    { id: 2, nome: "Granja Feliz", tipo: "chicken", quantidade: 100, preco: 800, precoKg: 8, qualidade: "Orgânico", icon: "🍗" },
    { id: 3, nome: "Fazenda Suína Boa Terra", tipo: "pork", quantidade: 60, preco: 1080, precoKg: 18, qualidade: "Tradicional", icon: "🥓" },
    { id: 4, nome: "Fábrica de Embutidos SaborSul", tipo: "sausage", quantidade: 40, preco: 1000, precoKg: 25, qualidade: "Artesanal", icon: "🌭" },
    { id: 5, nome: "Frigorífico Premium", tipo: "beef", quantidade: 120, preco: 3200, precoKg: 26.67, qualidade: "Premium Plus", icon: "🥩" },
    { id: 6, nome: "Avícola Campestre", tipo: "chicken", quantidade: 150, preco: 1350, precoKg: 9, qualidade: "Caipira", icon: "🍗" },
    { id: 7, nome: "Suínos do Vale", tipo: "pork", quantidade: 90, preco: 1710, precoKg: 19, qualidade: "Premium", icon: "🥓" },
    { id: 8, nome: "Embutidos Casa Grande", tipo: "sausage", quantidade: 60, preco: 1620, precoKg: 27, qualidade: "Gourmet", icon: "🌭" }
  ];

  const ofertasVendaBase = [
    { id: 1, nome: "beef", precoKg: 30, quantidade: 20, icon: "🥩", duracao: 120 },
    { id: 2, nome: "chicken", precoKg: 12, quantidade: 15, icon: "🍗", duracao: 120 },
    { id: 3, nome: "pork", precoKg: 18, quantidade: 10, icon: "🥓", duracao: 30 },
    { id: 4, nome: "sausage", precoKg: 22, quantidade: 8, icon: "🌭", duracao: 10 },
    { id: 5, nome: "beef", precoKg: 45, quantidade: 15, icon: "🥩", duracao: 60 },
    { id: 6, nome: "chicken", precoKg: 15, quantidade: 30, icon: "🍗", duracao: 50 },
    { id: 7, nome: "pork", precoKg: 32, quantidade: 25, icon: "🥓", duracao: 90 },
    { id: 8, nome: "sausage", precoKg: 48, quantidade: 15, icon: "🌭", duracao: 100 },
    { id: 9, nome: "beef", precoKg: 50, quantidade: 20, icon: "🥩", duracao: 120 },
    { id: 10, nome: "chicken", precoKg: 18, quantidade: 40, icon: "🍗", duracao: 110 },
    { id: 11, nome: "pork", precoKg: 35, quantidade: 18, icon: "🥓", duracao: 75 },
    { id: 12, nome: "sausage", precoKg: 52, quantidade: 12, icon: "🌭", duracao: 85 },
    { id: 13, nome: "beef", precoKg: 55, quantidade: 25, icon: "🥩", duracao: 130 },
    { id: 14, nome: "chicken", precoKg: 20, quantidade: 50, icon: "🍗", duracao: 95 },
    { id: 15, nome: "pork", precoKg: 38, quantidade: 30, icon: "🥓", duracao: 105 },
    { id: 16, nome: "sausage", precoKg: 55, quantidade: 20, icon: "🌭", duracao: 115 }
  ];

  // ==================== INICIALIZAÇÃO DO NEGÓCIO NO CONTEXT ====================
  useEffect(() => {
    // Garantir que a estrutura existe e tem vendasRealizadas
    if (economiaSetores.negocios?.AcougueNegocio) {
      let precisaAtualizar = false;
      const negocioAtual = economiaSetores.negocios.AcougueNegocio;
      const novoNegocio = { ...negocioAtual };

      // Garantir vendas realizadas no mercado
      if (!negocioAtual.mercado?.vendasRealizadas) {
        novoNegocio.mercado = {
          ...negocioAtual.mercado,
          vendasRealizadas: []
        };
        precisaAtualizar = true;
      }

      // Garantir vendaAtual se não existir
      if (!negocioAtual.mercado?.vendaAtual) {
        novoNegocio.mercado = {
          ...novoNegocio.mercado,
          vendaAtual: null
        };
        precisaAtualizar = true;
      }

      if (precisaAtualizar) {
        atualizarEco("negocios", {
          ...economiaSetores.negocios,
          AcougueNegocio: novoNegocio
        });
      }
    }
  }, []);

  // Atalho para o negócio
  const negocio = economiaSetores.negocios?.AcougueNegocio;

  // Se ainda não foi inicializado, retorna loading
  if (!negocio) {
    return <div className="text-white text-center p-8">Carregando negócio...</div>;
  }

  // ==================== ATUALIZAÇÃO DE CICLOS ====================
  useEffect(() => {
    if (!negocio) return;

    let precisaAtualizar = false;
    let novoNegocio = { ...negocio };

    // Verificar e atualizar ciclo de fornecedores
    if (dados.dia >= negocio.compras.proximoCiclo) {
      console.log("🔄 Atualizando ciclo de fornecedores - Dia atual:", dados.dia, "Próximo ciclo era:", negocio.compras.proximoCiclo);

      novoNegocio.compras = {
        ...negocio.compras,
        ofertasAtivas: sortearItens(fornecedoresBase, 4),
        proximoCiclo: dados.dia + 30
      };
      precisaAtualizar = true;
    }

    // Verificar e atualizar ciclo de mercado (vendas)
    if (dados.dia >= negocio.mercado.proximoCiclo) {
      console.log("🔄 Atualizando ciclo de mercado - Dia atual:", dados.dia, "Próximo ciclo era:", negocio.mercado.proximoCiclo);

      novoNegocio.mercado = {
        ofertasAtivas: sortearItens(ofertasVendaBase, 8),
        vendasRealizadas: [],
        vendaAtual: null,
        proximoCiclo: dados.dia + 90
      };
      precisaAtualizar = true;
    }

    // Só atualiza se realmente mudou algo
    if (precisaAtualizar) {
      atualizarEco("negocios", {
        ...economiaSetores.negocios,
        AcougueNegocio: novoNegocio
      });
    }
  }, [dados.dia, negocio?.compras?.proximoCiclo, negocio?.mercado?.proximoCiclo]);

  // ==================== HANDLERS ====================
  const handleCompra = (fornecedor) => {
    const { preco, tipo, quantidade } = fornecedor;

    if (economiaSetores.saldo < preco) {
      alert("💰 Saldo insuficiente!");
      return;
    }

    const estoqueTotal = Object.values(negocio.estoque.estoqueAtual).reduce((a, b) => a + b, 0);
    if (estoqueTotal + quantidade > negocio.estoque.capacidadeEstoque) {
      alert("📦 Sem espaço no estoque!");
      return;
    }

    const novoEstoque = {
      ...negocio.estoque.estoqueAtual,
      [tipo]: (negocio.estoque.estoqueAtual[tipo] || 0) + quantidade
    };

    // Atualiza saldo
    atualizarEco("saldo", economiaSetores.saldo - preco);

    // Atualiza estoque
    atualizarEco("negocios", {
      ...economiaSetores.negocios,
      AcougueNegocio: {
        ...negocio,
        estoque: {
          ...negocio.estoque,
          estoqueAtual: novoEstoque
        }
      }
    });
  };

  const handleVenda = (oferta) => {
    if (negocio.mercado.vendaAtual) {
      alert("⚠️ Você já tem uma venda em andamento!");
      return;
    }

    const estoqueAtual = negocio.estoque.estoqueAtual[oferta.nome] || 0;
    if (oferta.quantidade > estoqueAtual) {
      alert("⚠️ Estoque insuficiente!");
      return;
    }

    const novoEstoque = {
      ...negocio.estoque.estoqueAtual,
      [oferta.nome]: estoqueAtual - oferta.quantidade
    };

    const novaVenda = {
      ...oferta,
      diaInicio: dados.dia,
      diaFim: dados.dia + oferta.duracao
    };

    // Atualiza estoque, marca venda como realizada e define venda atual
    atualizarEco("negocios", {
      ...economiaSetores.negocios,
      AcougueNegocio: {
        ...negocio,
        estoque: {
          ...negocio.estoque,
          estoqueAtual: novoEstoque
        },
        mercado: {
          ...negocio.mercado,
          vendaAtual: novaVenda,
          vendasRealizadas: [...(negocio.mercado.vendasRealizadas || []), oferta.id]
        }
      }
    });
  };

  const handleReceber = () => {
    if (!negocio.mercado.vendaAtual) return;

    const totalVenda = negocio.mercado.vendaAtual.precoKg * negocio.mercado.vendaAtual.quantidade;

    // Atualiza saldo e limpa venda atual
    atualizarEco("saldo", economiaSetores.saldo + totalVenda);
    atualizarEco("negocios", {
      ...economiaSetores.negocios,
      AcougueNegocio: {
        ...negocio,
        mercado: {
          ...negocio.mercado,
          vendaAtual: null
        }
      }
    });
  };

  // ==================== RENDER TAB CONTENT ====================
  const renderTabContent = (tab, cores, formatCurrency) => {
    if (tab === "compras") {
      return (
        <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
          {negocio.compras.ofertasAtivas.map((f) => {
            const podeComprar = economiaSetores.saldo >= f.preco;
            const estoqueTotal = Object.values(negocio.estoque.estoqueAtual).reduce((a, b) => a + b, 0);
            const temEspaco = (estoqueTotal + f.quantidade) <= negocio.estoque.capacidadeEstoque;
            const podeComprarCompleto = podeComprar && temEspaco;

            return (
              <div key={f.id} className="rounded-lg shadow-md p-4 bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{f.icon}</span>
                  <h3 className="text-sm font-bold" style={{ color: cores.primary }}>{f.nome}</h3>
                </div>
                <div className="text-sm space-y-1 mb-3">
                  <div className="flex justify-between">
                    <span>Qualidade:</span>
                    <span className="font-semibold text-green-600">{f.qualidade}</span>
                  </div>
                  <div className="flex justify-between"><span>Qtd:</span><span>{f.quantidade}kg</span></div>
                  <div className="flex justify-between"><span>Preço/kg:</span><span>{formatCurrency(f.precoKg)}</span></div>
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span style={{ color: cores.accent }}>{formatCurrency(f.preco)}</span>
                  </div>
                </div>
                {!temEspaco && (
                  <p className="text-xs text-red-500 mb-2">⚠️ Sem espaço no estoque</p>
                )}
                <button
                  onClick={() => handleCompra(f)}
                  disabled={!podeComprarCompleto}
                  className="w-full py-3 rounded font-bold text-white transition-colors"
                  style={{
                    backgroundColor: podeComprarCompleto ? cores.primary : "#6C757D",
                    cursor: podeComprarCompleto ? 'pointer' : 'not-allowed'
                  }}
                >
                  Comprar
                </button>
              </div>
            );
          })}
        </div>
      );
    }

    if (tab === "vendas") {
      const ofertasDisponiveis = negocio.mercado.ofertasAtivas.filter(
        (offer) => !(negocio.mercado.vendasRealizadas || []).includes(offer.id)
      );

      return (
        <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
          {ofertasDisponiveis.map((oferta) => {
            const estoqueAtual = negocio.estoque.estoqueAtual[oferta.nome] || 0;
            const podeVender = !negocio.mercado.vendaAtual && estoqueAtual >= oferta.quantidade;
            const total = oferta.precoKg * oferta.quantidade;

            return (
              <div key={oferta.id} className="rounded-lg shadow-md p-4 bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{oferta.icon}</span>
                  <h3 className="text-sm font-bold" style={{ color: cores.primary }}>
                    Venda de {oferta.nome.toUpperCase()}
                  </h3>
                </div>
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between"><span>Qtd:</span><span>{oferta.quantidade}kg</span></div>
                  <div className="flex justify-between"><span>Preço/kg:</span><span>{formatCurrency(oferta.precoKg)}</span></div>
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span className="text-green-600">{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>⏱️ Tempo para receber:</span><span>{oferta.duracao} dias</span>
                  </div>
                </div>
                {estoqueAtual < oferta.quantidade && (
                  <p className="text-xs text-red-500 mb-2">
                    ⚠️ Estoque insuficiente (você tem {estoqueAtual}kg)
                  </p>
                )}
                <button
                  onClick={() => handleVenda(oferta)}
                  disabled={!podeVender}
                  className="w-full py-3 rounded font-bold text-white transition-colors"
                  style={{
                    backgroundColor: podeVender ? cores.accent : "#6C757D",
                    cursor: podeVender ? 'pointer' : 'not-allowed'
                  }}
                >
                  {negocio.mercado.vendaAtual ? "Vendendo..." : "Vender"}
                </button>
              </div>
            );
          })}

          {ofertasDisponiveis.length === 0 && (
            <p className="col-span-2 text-white text-lg mt-4 bg-white/20 p-4 rounded-lg text-center">
              ✅ Todos os compradores já foram atendidos neste ciclo!
            </p>
          )}
        </div>
      );
    }

    if (tab === "estoque") {
      const produtos = {
        beef: { nome: "Carne Bovina", icon: "🥩" },
        pork: { nome: "Carne Suína", icon: "🥓" },
        chicken: { nome: "Frango", icon: "🍗" },
        sausage: { nome: "Embutidos", icon: "🌭" }
      };

      const estoqueTotal = Object.values(negocio.estoque.estoqueAtual).reduce((a, b) => a + b, 0);
      const percentualOcupado = ((estoqueTotal / negocio.estoque.capacidadeEstoque) * 100).toFixed(1);

      return (
        <div>
          <div className="text-center text-white mb-6 bg-white/20 rounded-lg p-4">
            <p className="text-xl font-bold mb-2">Capacidade do Estoque</p>
            <p className="text-2xl">{estoqueTotal}kg / {negocio.estoque.capacidadeEstoque}kg</p>
            <p className="text-sm opacity-80 mt-1">{percentualOcupado}% ocupado</p>

            {/* Barra de progresso */}
            <div className="w-full bg-white/30 rounded-full h-3 mt-3">
              <div
                className="bg-red-400 h-3 rounded-full transition-all duration-300"
                style={{ width: `${percentualOcupado}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {Object.entries(negocio.estoque.estoqueAtual).map(([tipo, quantidade]) => (
              <div key={tipo} className="text-center text-white bg-white/20 rounded-xl p-4 hover:bg-white/30 transition-colors">
                <div className="text-4xl mb-3">{produtos[tipo]?.icon || "📦"}</div>
                <div className="text-3xl font-bold mb-2">{quantidade}kg</div>
                <div className="text-sm mb-3 opacity-80">{produtos[tipo]?.nome || tipo}</div>
                {quantidade === 0 && (
                  <p className="text-xs opacity-60">Estoque vazio</p>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  const estoqueTotal = Object.values(negocio.estoque.estoqueAtual).reduce((a, b) => a + b, 0);

  const tabs = [
    { id: "compras", label: "Fornecedores", icon: Warehouse, info: null },
    { id: "vendas", label: "Mercado", icon: Users, info: null },
    { id: "estoque", label: "Estoque", icon: Package, info: `${estoqueTotal}kg` }
  ];

  const pedidoProntoParaReceber = negocio.mercado.vendaAtual &&
    dados.dia >= negocio.mercado.vendaAtual.diaFim;

  const negocioConfig = {
    nome: 'Açougue Bom Corte',
    cores: SETORES_CONFIG.comercio.cores
  };

  // Calcular dias restantes para os ciclos
  const diasRestantesCompras = Math.max(0, negocio.compras.proximoCiclo - dados.dia);
  const diasRestantesMercado = Math.max(0, negocio.mercado.proximoCiclo - dados.dia);

  return (
    <BaseBusinessInterface
      negocio={negocioConfig}
      tabs={tabs}
      renderTabContent={renderTabContent}
      headerExtra={
        negocio.mercado.vendaAtual && (
          <div className="bg-white bg-opacity-20 rounded-lg p-3 text-white text-sm">
            {pedidoProntoParaReceber ? (
              <div className="flex items-center justify-between">
                <span className="text-base">
                  💵 Venda de <strong className="uppercase">{negocio.mercado.vendaAtual.nome}</strong> concluída!
                </span>
                <button
                  onClick={handleReceber}
                  className="px-4 py-2 rounded font-bold bg-green-500 hover:bg-green-600 text-white transition-colors"
                >
                  Receber {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0
                  }).format(negocio.mercado.vendaAtual.precoKg * negocio.mercado.vendaAtual.quantidade)}
                </button>
              </div>
            ) : (
              <div className="text-center">
                💼 Vendendo <strong className="uppercase">{negocio.mercado.vendaAtual.nome}</strong> — Recebimento no dia <strong>{negocio.mercado.vendaAtual.diaFim}</strong>
                <div className="text-xs opacity-80 mt-1">
                  ({negocio.mercado.vendaAtual.diaFim - dados.dia} dias restantes)
                </div>
              </div>
            )}
          </div>
        )
      }
      footerExtra={(tab) => {
        if (tab === 'compras') {
          return diasRestantesCompras === 0
            ? `🔄 Novos fornecedores disponíveis!`
            : `Próximo ciclo de fornecedores em ${diasRestantesCompras} dias`;
        }
        if (tab === 'vendas') {
          return diasRestantesMercado === 0
            ? `🔄 Novos compradores disponíveis!`
            : `Próximo ciclo de mercado em ${diasRestantesMercado} dias`;
        }
        return null;
      }}
    />
  );
};

const PainelSolarNegocio = () => {
  const { dados } = useContext(CentraldeDadosContext);
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);

  const getProductIcon = (type) => {
    const icons = {
      residencial: '🏠',
      comercial: '🏢',
      industrial: '🏭',
      premium: '⚡'
    };
    return icons[type] || '☀️';
  };

  // Dados de produção de painéis
  const paineisBase = [
    // Residencial
    { id: 1, nome: "Residencial", tipo: "residencial", custo: 15000, unidades: 10, valorPorUnidade: 2000, duracao: 45, icon: "🏠" },
    { id: 2, nome: "Residencial", tipo: "residencial", custo: 28000, unidades: 20, valorPorUnidade: 2000, duracao: 50, icon: "🏠" },
    { id: 3, nome: "Residencial", tipo: "residencial", custo: 39000, unidades: 30, valorPorUnidade: 2000, duracao: 55, icon: "🏠" },

    // Comercial
    { id: 4, nome: "Comercial", tipo: "comercial", custo: 35000, unidades: 10, valorPorUnidade: 4500, duracao: 60, icon: "🏢" },
    { id: 5, nome: "Comercial", tipo: "comercial", custo: 66000, unidades: 20, valorPorUnidade: 4500, duracao: 65, icon: "🏢" },
    { id: 6, nome: "Comercial", tipo: "comercial", custo: 94500, unidades: 30, valorPorUnidade: 4500, duracao: 70, icon: "🏢" },

    // Industrial
    { id: 7, nome: "Industrial", tipo: "industrial", custo: 80000, unidades: 10, valorPorUnidade: 10000, duracao: 90, icon: "🏭" },
    { id: 8, nome: "Industrial", tipo: "industrial", custo: 150000, unidades: 20, valorPorUnidade: 10000, duracao: 95, icon: "🏭" },
    { id: 9, nome: "Industrial", tipo: "industrial", custo: 210000, unidades: 30, valorPorUnidade: 10000, duracao: 100, icon: "🏭" },

    // Premium
    { id: 10, nome: "Premium", tipo: "premium", custo: 50000, unidades: 5, valorPorUnidade: 12000, duracao: 75, icon: "⚡" },
    { id: 11, nome: "Premium", tipo: "premium", custo: 90000, unidades: 10, valorPorUnidade: 12000, duracao: 80, icon: "⚡" },
    { id: 12, nome: "Premium", tipo: "premium", custo: 126000, unidades: 15, valorPorUnidade: 12000, duracao: 85, icon: "⚡" },
  ];

  // Ofertas de mercado com margens de 50-70%
  const marketOffersBase = [
    // RESIDENCIAL 🏠
    { id: 1, name: "residencial", unidades: 5, pricePerUnit: 2250, totalPrice: 11250 },
    { id: 2, name: "residencial", unidades: 10, pricePerUnit: 2400, totalPrice: 24000 },
    { id: 3, name: "residencial", unidades: 15, pricePerUnit: 2550, totalPrice: 38250 },
    { id: 4, name: "residencial", unidades: 20, pricePerUnit: 2500, totalPrice: 50000 },

    // COMERCIAL 🏢
    { id: 5, name: "comercial", unidades: 5, pricePerUnit: 5250, totalPrice: 26250 },
    { id: 6, name: "comercial", unidades: 10, pricePerUnit: 5600, totalPrice: 56000 },
    { id: 7, name: "comercial", unidades: 15, pricePerUnit: 5950, totalPrice: 89250 },
    { id: 8, name: "comercial", unidades: 20, pricePerUnit: 5850, totalPrice: 117000 },

    // INDUSTRIAL 🏭
    { id: 9, name: "industrial", unidades: 3, pricePerUnit: 12000, totalPrice: 36000 },
    { id: 10, name: "industrial", unidades: 5, pricePerUnit: 12800, totalPrice: 64000 },
    { id: 11, name: "industrial", unidades: 8, pricePerUnit: 13600, totalPrice: 108800 },
    { id: 12, name: "industrial", unidades: 10, pricePerUnit: 13400, totalPrice: 134000 },

    // PREMIUM ⚡
    { id: 13, name: "premium", unidades: 3, pricePerUnit: 15000, totalPrice: 45000 },
    { id: 14, name: "premium", unidades: 5, pricePerUnit: 16000, totalPrice: 80000 },
    { id: 15, name: "premium", unidades: 8, pricePerUnit: 17000, totalPrice: 136000 },
    { id: 16, name: "premium", unidades: 10, pricePerUnit: 16800, totalPrice: 168000 },
  ];

  // ==================== INICIALIZAÇÃO DO NEGÓCIO NO CONTEXT ====================
  useEffect(() => {
    // Garantir que vendasRealizadas existe na estrutura
    if (economiaSetores.negocios?.PainelSolarNegocio &&
      !economiaSetores.negocios.PainelSolarNegocio.mercado?.vendasRealizadas) {
      atualizarEco("negocios", {
        ...economiaSetores.negocios,
        PainelSolarNegocio: {
          ...economiaSetores.negocios.PainelSolarNegocio,
          mercado: {
            ...economiaSetores.negocios.PainelSolarNegocio.mercado,
            vendasRealizadas: []
          }
        }
      });
    }
  }, []);

  // Atalho para o negócio
  const negocio = economiaSetores.negocios?.PainelSolarNegocio;

  // Se ainda não foi inicializado, retorna loading
  if (!negocio) {
    return <div className="text-white text-center p-8">Carregando negócio...</div>;
  }

  // ==================== ATUALIZAÇÃO DE CICLOS ====================
  useEffect(() => {
    if (!negocio) return;

    let precisaAtualizar = false;
    let novoNegocio = { ...negocio };

    // Verificar e atualizar ciclo de produção
    if (dados.dia >= negocio.produzir.proximoCiclo) {
      console.log("🔄 Atualizando ciclo de produção - Dia atual:", dados.dia, "Próximo ciclo era:", negocio.produzir.proximoCiclo);

      novoNegocio.produzir = {
        ...negocio.produzir,
        ofertasAtivas: sortearItens(paineisBase, 4),
        proximoCiclo: dados.dia + 30
      };
      precisaAtualizar = true;
    }

    // Verificar e atualizar ciclo de mercado
    if (dados.dia >= negocio.mercado.proximoCiclo) {
      console.log("🔄 Atualizando ciclo de mercado - Dia atual:", dados.dia, "Próximo ciclo era:", negocio.mercado.proximoCiclo);

      novoNegocio.mercado = {
        ofertasAtivas: sortearItens(marketOffersBase, 8),
        vendasRealizadas: [],
        proximoCiclo: dados.dia + 90
      };
      precisaAtualizar = true;
    }

    // Só atualiza se realmente mudou algo
    if (precisaAtualizar) {
      atualizarEco("negocios", {
        ...economiaSetores.negocios,
        PainelSolarNegocio: novoNegocio
      });
    }
  }, [dados.dia, negocio?.produzir?.proximoCiclo, negocio?.mercado?.proximoCiclo]);

  // ==================== HANDLERS ====================
  const handleProduzir = (painel) => {
    if (economiaSetores.saldo < painel.custo) {
      alert("💰 Saldo insuficiente!");
      return;
    }
    if (negocio.produzir.producaoAtual) {
      alert("⚠️ Já existe uma produção em andamento!");
      return;
    }

    const novaProducao = {
      nome: painel.nome,
      tipo: painel.tipo,
      unidades: painel.unidades,
      diaInicio: dados.dia,
      diaFim: dados.dia + painel.duracao,
      icon: painel.icon
    };

    // Atualiza saldo
    atualizarEco("saldo", economiaSetores.saldo - painel.custo);

    // Atualiza produção atual
    atualizarEco("negocios", {
      ...economiaSetores.negocios,
      PainelSolarNegocio: {
        ...negocio,
        produzir: {
          ...negocio.produzir,
          producaoAtual: novaProducao
        }
      }
    });
  };

  const handleColetar = () => {
    if (!negocio.produzir.producaoAtual) return;

    const prod = negocio.produzir.producaoAtual;
    const novoEstoque = {
      ...negocio.estoque.estoqueAtual,
      [prod.tipo]: (negocio.estoque.estoqueAtual[prod.tipo] || 0) + prod.unidades
    };

    atualizarEco("negocios", {
      ...economiaSetores.negocios,
      PainelSolarNegocio: {
        ...negocio,
        produzir: {
          ...negocio.produzir,
          producaoAtual: null
        },
        estoque: {
          ...negocio.estoque,
          estoqueAtual: novoEstoque
        }
      }
    });
  };

  const handleVender = (offer) => {
    const estoqueAtual = negocio.estoque.estoqueAtual[offer.name] || 0;
    if (offer.unidades > estoqueAtual) {
      alert("⚠️ Você não tem unidades suficientes!");
      return;
    }

    const novoEstoque = {
      ...negocio.estoque.estoqueAtual,
      [offer.name]: estoqueAtual - offer.unidades
    };

    // Atualiza saldo
    atualizarEco("saldo", economiaSetores.saldo + offer.totalPrice);

    // Atualiza estoque e marca venda como realizada
    atualizarEco("negocios", {
      ...economiaSetores.negocios,
      PainelSolarNegocio: {
        ...negocio,
        estoque: {
          ...negocio.estoque,
          estoqueAtual: novoEstoque
        },
        mercado: {
          ...negocio.mercado,
          vendasRealizadas: [...(negocio.mercado.vendasRealizadas || []), offer.id]
        }
      }
    });
  };

  // ==================== RENDER TAB CONTENT ====================
  const renderTabContent = (tab, cores, formatCurrency) => {
    if (tab === 'produzir') {
      return (
        <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
          {negocio.produzir.ofertasAtivas.map((painel) => {
            const podeEscolher = !negocio.produzir.producaoAtual && economiaSetores.saldo >= painel.custo;
            return (
              <div key={painel.id} className="rounded-lg shadow-md p-4 bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{painel.icon}</span>
                  <h3 className="text-base font-bold" style={{ color: cores.primary }}>
                    {painel.nome}
                  </h3>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Custo:</span>
                    <span>{formatCurrency(painel.custo)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Unidades:</span>
                    <span>{painel.unidades}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Custo/Unidade:</span>
                    <span>{formatCurrency(painel.custo / painel.unidades)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Duração:</span>
                    <span>{painel.duracao} dias</span>
                  </div>
                </div>
                <button
                  onClick={() => handleProduzir(painel)}
                  disabled={!podeEscolher}
                  className="w-full py-3 rounded font-bold text-white transition-colors"
                  style={{
                    backgroundColor: podeEscolher ? cores.accent : '#6C757D',
                    cursor: podeEscolher ? 'pointer' : 'not-allowed'
                  }}
                >
                  {negocio.produzir.producaoAtual ? 'Produzindo...' : 'Produzir'}
                </button>
              </div>
            );
          })}
        </div>
      );
    }

    if (tab === 'mercado') {
      const ofertasDisponiveis = negocio.mercado.ofertasAtivas.filter(
        (offer) => !(negocio.mercado.vendasRealizadas || []).includes(offer.id)
      );

      return (
        <div className="grid grid-cols-4 gap-4 w-full mx-auto text-center">
          {ofertasDisponiveis.map((offer) => (
            <div key={offer.id} className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="font-bold text-gray-800 mb-2 capitalize text-3xl">
                {getProductIcon(offer.name)}
              </h3>
              <h3 className="font-bold text-gray-800 mb-2 capitalize">{offer.name}</h3>
              <p className="text-sm mb-1">{offer.unidades} unidades</p>
              <p className="text-xs text-gray-500 mb-3">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 0
                }).format(offer.pricePerUnit)}/un
              </p>
              <button
                onClick={() => handleVender(offer)}
                className="py-2 px-4 rounded font-bold text-white text-sm bg-green-600 hover:bg-green-700 transition-colors"
              >
                Vender por {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 0
                }).format(offer.totalPrice)}
              </button>
            </div>
          ))}

          {ofertasDisponiveis.length === 0 && (
            <p className="col-span-4 text-white text-lg mt-4 bg-white/20 p-4 rounded-lg">
              ✅ Todos os compradores já foram atendidos neste ciclo!
            </p>
          )}
        </div>
      );
    }

    if (tab === 'estoque') {
      const estoqueTotal = Object.values(negocio.estoque.estoqueAtual).reduce((a, b) => a + b, 0);
      const percentualOcupado = ((estoqueTotal / negocio.estoque.capacidadeEstoque) * 100).toFixed(1);

      return (
        <div>
          <div className="text-center text-white mb-6 bg-white/20 rounded-lg p-4">
            <p className="text-xl font-bold mb-2">Capacidade do Estoque</p>
            <p className="text-2xl">{estoqueTotal} / {negocio.estoque.capacidadeEstoque} unidades</p>
            <p className="text-sm opacity-80 mt-1">{percentualOcupado}% ocupado</p>

            {/* Barra de progresso */}
            <div className="w-full bg-white/30 rounded-full h-3 mt-3">
              <div
                className="bg-yellow-400 h-3 rounded-full transition-all duration-300"
                style={{ width: `${percentualOcupado}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {Object.entries(negocio.estoque.estoqueAtual).map(([type, qtd]) => (
              <div key={type} className="text-center text-white bg-white/20 rounded-xl p-6 hover:bg-white/30 transition-colors">
                <h3 className="text-4xl mb-3">{getProductIcon(type)}</h3>
                <h3 className="text-2xl font-bold mb-2 capitalize">{type}</h3>
                <div className="text-lg mb-3 opacity-80">{qtd} unidades</div>
                {qtd === 0 && (
                  <p className="text-xs opacity-60">Estoque vazio</p>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  const estoqueTotal = Object.values(negocio.estoque.estoqueAtual).reduce((a, b) => a + b, 0);

  const tabs = [
    { id: 'produzir', label: 'Produzir', icon: Sun, info: null },
    { id: 'mercado', label: 'Mercado', icon: TrendingUp, info: null },
    { id: 'estoque', label: 'Estoque', icon: Package, info: `${estoqueTotal} Unidades` },
  ];

  const producaoPronta = negocio.produzir.producaoAtual &&
    dados.dia >= negocio.produzir.producaoAtual.diaFim;

  const negocioConfig = {
    nome: 'Fábrica de Painéis Solares',
    cores: SETORES_CONFIG.energia.cores
  };

  // Calcular dias restantes para os ciclos
  const diasRestantesProduzir = Math.max(0, negocio.produzir.proximoCiclo - dados.dia);
  const diasRestantesMercado = Math.max(0, negocio.mercado.proximoCiclo - dados.dia);

  return (
    <BaseBusinessInterface
      negocio={negocioConfig}
      tabs={tabs}
      renderTabContent={renderTabContent}
      headerExtra={
        negocio.produzir.producaoAtual && (
          <div className="bg-white bg-opacity-20 rounded-lg p-3 text-white text-sm">
            {producaoPronta ? (
              <div className="flex items-center justify-between">
                <span className="text-base">
                  ☀️ <strong>{negocio.produzir.producaoAtual.nome}</strong> pronto para coleta!
                </span>
                <button
                  onClick={handleColetar}
                  className="px-4 py-2 rounded font-bold bg-green-500 hover:bg-green-600 text-white transition-colors"
                >
                  Coletar ({negocio.produzir.producaoAtual.unidades} un)
                </button>
              </div>
            ) : (
              <div className="text-center">
                ⚡ Produzindo <strong>{negocio.produzir.producaoAtual.nome}</strong> — Finaliza no dia <strong>{negocio.produzir.producaoAtual.diaFim}</strong>
                <div className="text-xs opacity-80 mt-1">
                  ({negocio.produzir.producaoAtual.diaFim - dados.dia} dias restantes)
                </div>
              </div>
            )}
          </div>
        )
      }
      footerExtra={(tab) => {
        if (tab === 'produzir') {
          return diasRestantesProduzir === 0
            ? `🔄 Novas ofertas disponíveis!`
            : `Próximo ciclo de produção em ${diasRestantesProduzir} dias`;
        }
        if (tab === 'mercado') {
          return diasRestantesMercado === 0
            ? `🔄 Novos compradores disponíveis!`
            : `Próximo ciclo de mercado em ${diasRestantesMercado} dias`;
        }
        return null;
      }}
    />
  );
};

const FabricaVeiculosNegocio = () => {
  const { dados } = useContext(CentraldeDadosContext);
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);

  const getProductIcon = (type) => {
    const icons = {
      popular: '🚗',
      sedan: '🚙',
      suv: '🚐',
      luxo: '🏎️',
      caminhonete: '🛻',
      van: '🚚'
    };
    return icons[type] || '🚗';
  };

  // Dados de produção de veículos
  const veiculosBase = [
    // Popular
    { id: 1, nome: "Popular", tipo: "popular", custo: 45000, unidades: 5, valorPorUnidade: 12000, duracao: 60, icon: "🚗" },
    { id: 2, nome: "Popular", tipo: "popular", custo: 84000, unidades: 10, valorPorUnidade: 12000, duracao: 65, icon: "🚗" },
    { id: 3, nome: "Popular", tipo: "popular", custo: 117000, unidades: 15, valorPorUnidade: 12000, duracao: 70, icon: "🚗" },

    // Sedan
    { id: 4, nome: "Sedan", tipo: "sedan", custo: 80000, unidades: 5, valorPorUnidade: 20000, duracao: 75, icon: "🚙" },
    { id: 5, nome: "Sedan", tipo: "sedan", custo: 150000, unidades: 10, valorPorUnidade: 20000, duracao: 80, icon: "🚙" },
    { id: 6, nome: "Sedan", tipo: "sedan", custo: 210000, unidades: 15, valorPorUnidade: 20000, duracao: 85, icon: "🚙" },

    // SUV
    { id: 7, nome: "SUV", tipo: "suv", custo: 120000, unidades: 4, valorPorUnidade: 35000, duracao: 90, icon: "🚐" },
    { id: 8, nome: "SUV", tipo: "suv", custo: 224000, unidades: 8, valorPorUnidade: 35000, duracao: 95, icon: "🚐" },
    { id: 9, nome: "SUV", tipo: "suv", custo: 308000, unidades: 12, valorPorUnidade: 35000, duracao: 100, icon: "🚐" },

    // Luxo
    { id: 10, nome: "Luxo", tipo: "luxo", custo: 200000, unidades: 3, valorPorUnidade: 80000, duracao: 110, icon: "🏎️" },
    { id: 11, nome: "Luxo", tipo: "luxo", custo: 360000, unidades: 6, valorPorUnidade: 80000, duracao: 115, icon: "🏎️" },
    { id: 12, nome: "Luxo", tipo: "luxo", custo: 480000, unidades: 9, valorPorUnidade: 80000, duracao: 120, icon: "🏎️" },

    // Caminhonete
    { id: 13, nome: "Caminhonete", tipo: "caminhonete", custo: 100000, unidades: 4, valorPorUnidade: 30000, duracao: 85, icon: "🛻" },
    { id: 14, nome: "Caminhonete", tipo: "caminhonete", custo: 180000, unidades: 8, valorPorUnidade: 30000, duracao: 90, icon: "🛻" },
    { id: 15, nome: "Caminhonete", tipo: "caminhonete", custo: 252000, unidades: 12, valorPorUnidade: 30000, duracao: 95, icon: "🛻" },

    // Van
    { id: 16, nome: "Van", tipo: "van", custo: 90000, unidades: 4, valorPorUnidade: 27000, duracao: 80, icon: "🚚" },
    { id: 17, nome: "Van", tipo: "van", custo: 162000, unidades: 8, valorPorUnidade: 27000, duracao: 85, icon: "🚚" },
    { id: 18, nome: "Van", tipo: "van", custo: 226800, unidades: 12, valorPorUnidade: 27000, duracao: 90, icon: "🚚" },
  ];

  // Ofertas de mercado com margens de 50-70%
  const marketOffersBase = [
    // POPULAR 🚗
    { id: 1, name: "popular", unidades: 3, pricePerUnit: 15000, totalPrice: 45000 },
    { id: 2, name: "popular", unidades: 5, pricePerUnit: 16000, totalPrice: 80000 },
    { id: 3, name: "popular", unidades: 8, pricePerUnit: 17000, totalPrice: 136000 },
    { id: 4, name: "popular", unidades: 10, pricePerUnit: 16800, totalPrice: 168000 },

    // SEDAN 🚙
    { id: 5, name: "sedan", unidades: 2, pricePerUnit: 24000, totalPrice: 48000 },
    { id: 6, name: "sedan", unidades: 4, pricePerUnit: 25600, totalPrice: 102400 },
    { id: 7, name: "sedan", unidades: 6, pricePerUnit: 27200, totalPrice: 163200 },
    { id: 8, name: "sedan", unidades: 8, pricePerUnit: 26800, totalPrice: 214400 },

    // SUV 🚐
    { id: 9, name: "suv", unidades: 2, pricePerUnit: 45000, totalPrice: 90000 },
    { id: 10, name: "suv", unidades: 3, pricePerUnit: 48000, totalPrice: 144000 },
    { id: 11, name: "suv", unidades: 5, pricePerUnit: 51000, totalPrice: 255000 },
    { id: 12, name: "suv", unidades: 6, pricePerUnit: 50400, totalPrice: 302400 },

    // LUXO 🏎️
    { id: 13, name: "luxo", unidades: 1, pricePerUnit: 100000, totalPrice: 100000 },
    { id: 14, name: "luxo", unidades: 2, pricePerUnit: 106000, totalPrice: 212000 },
    { id: 15, name: "luxo", unidades: 3, pricePerUnit: 113000, totalPrice: 339000 },
    { id: 16, name: "luxo", unidades: 4, pricePerUnit: 112000, totalPrice: 448000 },

    // CAMINHONETE 🛻
    { id: 17, name: "caminhonete", unidades: 2, pricePerUnit: 37500, totalPrice: 75000 },
    { id: 18, name: "caminhonete", unidades: 4, pricePerUnit: 40000, totalPrice: 160000 },
    { id: 19, name: "caminhonete", unidades: 6, pricePerUnit: 42500, totalPrice: 255000 },
    { id: 20, name: "caminhonete", unidades: 8, pricePerUnit: 42000, totalPrice: 336000 },

    // VAN 🚚
    { id: 21, name: "van", unidades: 2, pricePerUnit: 33750, totalPrice: 67500 },
    { id: 22, name: "van", unidades: 4, pricePerUnit: 36000, totalPrice: 144000 },
    { id: 23, name: "van", unidades: 6, pricePerUnit: 38250, totalPrice: 229500 },
    { id: 24, name: "van", unidades: 8, pricePerUnit: 37800, totalPrice: 302400 },
  ];

  // ==================== INICIALIZAÇÃO DO NEGÓCIO NO CONTEXT ====================
  useEffect(() => {
    // Garantir que vendasRealizadas existe na estrutura
    if (economiaSetores.negocios?.FabricaVeiculosNegocio &&
      !economiaSetores.negocios.FabricaVeiculosNegocio.mercado?.vendasRealizadas) {
      atualizarEco("negocios", {
        ...economiaSetores.negocios,
        FabricaVeiculosNegocio: {
          ...economiaSetores.negocios.FabricaVeiculosNegocio,
          mercado: {
            ...economiaSetores.negocios.FabricaVeiculosNegocio.mercado,
            vendasRealizadas: []
          }
        }
      });
    }
  }, []);

  // Atalho para o negócio
  const negocio = economiaSetores.negocios?.FabricaVeiculosNegocio;

  // Se ainda não foi inicializado, retorna loading
  if (!negocio) {
    return <div className="text-white text-center p-8">Carregando negócio...</div>;
  }

  // ==================== ATUALIZAÇÃO DE CICLOS ====================
  useEffect(() => {
    if (!negocio) return;

    let precisaAtualizar = false;
    let novoNegocio = { ...negocio };

    // Verificar e atualizar ciclo de produção
    if (dados.dia >= negocio.produzir.proximoCiclo) {
      console.log("🔄 Atualizando ciclo de produção - Dia atual:", dados.dia, "Próximo ciclo era:", negocio.produzir.proximoCiclo);

      novoNegocio.produzir = {
        ...negocio.produzir,
        ofertasAtivas: sortearItens(veiculosBase, 6),
        proximoCiclo: dados.dia + 45
      };
      precisaAtualizar = true;
    }

    // Verificar e atualizar ciclo de mercado
    if (dados.dia >= negocio.mercado.proximoCiclo) {
      console.log("🔄 Atualizando ciclo de mercado - Dia atual:", dados.dia, "Próximo ciclo era:", negocio.mercado.proximoCiclo);

      novoNegocio.mercado = {
        ofertasAtivas: sortearItens(marketOffersBase, 12),
        vendasRealizadas: [],
        proximoCiclo: dados.dia + 90
      };
      precisaAtualizar = true;
    }

    // Só atualiza se realmente mudou algo
    if (precisaAtualizar) {
      atualizarEco("negocios", {
        ...economiaSetores.negocios,
        FabricaVeiculosNegocio: novoNegocio
      });
    }
  }, [dados.dia, negocio?.produzir?.proximoCiclo, negocio?.mercado?.proximoCiclo]);

  // ==================== HANDLERS ====================
  const handleProduzir = (veiculo) => {
    if (economiaSetores.saldo < veiculo.custo) {
      alert("💰 Saldo insuficiente!");
      return;
    }
    if (negocio.produzir.producaoAtual) {
      alert("⚠️ Já existe uma produção em andamento!");
      return;
    }

    const novaProducao = {
      nome: veiculo.nome,
      tipo: veiculo.tipo,
      unidades: veiculo.unidades,
      diaInicio: dados.dia,
      diaFim: dados.dia + veiculo.duracao,
      icon: veiculo.icon
    };

    // Atualiza saldo
    atualizarEco("saldo", economiaSetores.saldo - veiculo.custo);

    // Atualiza produção atual
    atualizarEco("negocios", {
      ...economiaSetores.negocios,
      FabricaVeiculosNegocio: {
        ...negocio,
        produzir: {
          ...negocio.produzir,
          producaoAtual: novaProducao
        }
      }
    });
  };

  const handleColetar = () => {
    if (!negocio.produzir.producaoAtual) return;

    const prod = negocio.produzir.producaoAtual;
    const novoEstoque = {
      ...negocio.estoque.estoqueAtual,
      [prod.tipo]: (negocio.estoque.estoqueAtual[prod.tipo] || 0) + prod.unidades
    };

    atualizarEco("negocios", {
      ...economiaSetores.negocios,
      FabricaVeiculosNegocio: {
        ...negocio,
        produzir: {
          ...negocio.produzir,
          producaoAtual: null
        },
        estoque: {
          ...negocio.estoque,
          estoqueAtual: novoEstoque
        }
      }
    });
  };

  const handleVender = (offer) => {
    const estoqueAtual = negocio.estoque.estoqueAtual[offer.name] || 0;
    if (offer.unidades > estoqueAtual) {
      alert("⚠️ Você não tem veículos suficientes!");
      return;
    }

    const novoEstoque = {
      ...negocio.estoque.estoqueAtual,
      [offer.name]: estoqueAtual - offer.unidades
    };

    // Atualiza saldo
    atualizarEco("saldo", economiaSetores.saldo + offer.totalPrice);

    // Atualiza estoque e marca venda como realizada
    atualizarEco("negocios", {
      ...economiaSetores.negocios,
      FabricaVeiculosNegocio: {
        ...negocio,
        estoque: {
          ...negocio.estoque,
          estoqueAtual: novoEstoque
        },
        mercado: {
          ...negocio.mercado,
          vendasRealizadas: [...(negocio.mercado.vendasRealizadas || []), offer.id]
        }
      }
    });
  };

  // ==================== RENDER TAB CONTENT ====================
  const renderTabContent = (tab, cores, formatCurrency) => {
    if (tab === 'produzir') {
      return (
        <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto">
          {negocio.produzir.ofertasAtivas.map((veiculo) => {
            const podeEscolher = !negocio.produzir.producaoAtual && economiaSetores.saldo >= veiculo.custo;
            return (
              <div key={veiculo.id} className="rounded-lg shadow-md p-4 bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{veiculo.icon}</span>
                  <h3 className="text-base font-bold" style={{ color: cores.primary }}>
                    {veiculo.nome}
                  </h3>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Custo:</span>
                    <span>{formatCurrency(veiculo.custo)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Unidades:</span>
                    <span>{veiculo.unidades}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Custo/Unidade:</span>
                    <span>{formatCurrency(veiculo.custo / veiculo.unidades)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Duração:</span>
                    <span>{veiculo.duracao} dias</span>
                  </div>
                </div>
                <button
                  onClick={() => handleProduzir(veiculo)}
                  disabled={!podeEscolher}
                  className="w-full py-3 rounded font-bold text-white transition-colors"
                  style={{
                    backgroundColor: podeEscolher ? cores.accent : '#6C757D',
                    cursor: podeEscolher ? 'pointer' : 'not-allowed'
                  }}
                >
                  {negocio.produzir.producaoAtual ? 'Produzindo...' : 'Produzir'}
                </button>
              </div>
            );
          })}
        </div>
      );
    }

    if (tab === 'mercado') {
      const ofertasDisponiveis = negocio.mercado.ofertasAtivas.filter(
        (offer) => !(negocio.mercado.vendasRealizadas || []).includes(offer.id)
      );

      return (
        <div className="grid grid-cols-4 gap-4 w-full mx-auto text-center">
          {ofertasDisponiveis.map((offer) => (
            <div key={offer.id} className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="font-bold text-gray-800 mb-2 capitalize text-3xl">
                {getProductIcon(offer.name)}
              </h3>
              <h3 className="font-bold text-gray-800 mb-2 capitalize">{offer.name}</h3>
              <p className="text-sm mb-1">{offer.unidades} unidades</p>
              <p className="text-xs text-gray-500 mb-3">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 0
                }).format(offer.pricePerUnit)}/un
              </p>
              <button
                onClick={() => handleVender(offer)}
                className="py-2 px-4 rounded font-bold text-white text-sm bg-green-600 hover:bg-green-700 transition-colors"
              >
                Vender por {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 0
                }).format(offer.totalPrice)}
              </button>
            </div>
          ))}

          {ofertasDisponiveis.length === 0 && (
            <p className="col-span-4 text-white text-lg mt-4 bg-white/20 p-4 rounded-lg">
              ✅ Todos os compradores já foram atendidos neste ciclo!
            </p>
          )}
        </div>
      );
    }

    if (tab === 'estoque') {
      const estoqueTotal = Object.values(negocio.estoque.estoqueAtual).reduce((a, b) => a + b, 0);
      const percentualOcupado = ((estoqueTotal / negocio.estoque.capacidadeEstoque) * 100).toFixed(1);

      return (
        <div>
          <div className="text-center text-white mb-6 bg-white/20 rounded-lg p-4">
            <p className="text-xl font-bold mb-2">Capacidade do Estoque</p>
            <p className="text-2xl">{estoqueTotal} / {negocio.estoque.capacidadeEstoque} unidades</p>
            <p className="text-sm opacity-80 mt-1">{percentualOcupado}% ocupado</p>

            {/* Barra de progresso */}
            <div className="w-full bg-white/30 rounded-full h-3 mt-3">
              <div
                className="bg-gray-400 h-3 rounded-full transition-all duration-300"
                style={{ width: `${percentualOcupado}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {Object.entries(negocio.estoque.estoqueAtual).map(([type, qtd]) => (
              <div key={type} className="text-center text-white bg-white/20 rounded-xl p-6 hover:bg-white/30 transition-colors">
                <h3 className="text-4xl mb-3">{getProductIcon(type)}</h3>
                <h3 className="text-xl font-bold mb-2 capitalize">{type}</h3>
                <div className="text-lg mb-3 opacity-80">{qtd} unidades</div>
                {qtd === 0 && (
                  <p className="text-xs opacity-60">Estoque vazio</p>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  const estoqueTotal = Object.values(negocio.estoque.estoqueAtual).reduce((a, b) => a + b, 0);

  const tabs = [
    { id: 'produzir', label: 'Produzir', icon: Car, info: null },
    { id: 'mercado', label: 'Mercado', icon: TrendingUp, info: null },
    { id: 'estoque', label: 'Estoque', icon: Package, info: `${estoqueTotal} Unidades` },
  ];

  const producaoPronta = negocio.produzir.producaoAtual &&
    dados.dia >= negocio.produzir.producaoAtual.diaFim;

  const negocioConfig = {
    nome: 'Fábrica de Veículos',
    cores: SETORES_CONFIG.industria.cores
  };

  // Calcular dias restantes para os ciclos
  const diasRestantesProduzir = Math.max(0, negocio.produzir.proximoCiclo - dados.dia);
  const diasRestantesMercado = Math.max(0, negocio.mercado.proximoCiclo - dados.dia);

  return (
    <BaseBusinessInterface
      negocio={negocioConfig}
      tabs={tabs}
      renderTabContent={renderTabContent}
      headerExtra={
        negocio.produzir.producaoAtual && (
          <div className="bg-white bg-opacity-20 rounded-lg p-3 text-white text-sm">
            {producaoPronta ? (
              <div className="flex items-center justify-between">
                <span className="text-base">
                  🚗 <strong>{negocio.produzir.producaoAtual.nome}</strong> pronto para coleta!
                </span>
                <button
                  onClick={handleColetar}
                  className="px-4 py-2 rounded font-bold bg-green-500 hover:bg-green-600 text-white transition-colors"
                >
                  Coletar ({negocio.produzir.producaoAtual.unidades} un)
                </button>
              </div>
            ) : (
              <div className="text-center">
                🏭 Produzindo <strong>{negocio.produzir.producaoAtual.nome}</strong> — Finaliza no dia <strong>{negocio.produzir.producaoAtual.diaFim}</strong>
                <div className="text-xs opacity-80 mt-1">
                  ({negocio.produzir.producaoAtual.diaFim - dados.dia} dias restantes)
                </div>
              </div>
            )}
          </div>
        )
      }
      footerExtra={(tab) => {
        if (tab === 'produzir') {
          return diasRestantesProduzir === 0
            ? `🔄 Novas ofertas disponíveis!`
            : `Próximo ciclo de produção em ${diasRestantesProduzir} dias`;
        }
        if (tab === 'mercado') {
          return diasRestantesMercado === 0
            ? `🔄 Novos compradores disponíveis!`
            : `Próximo ciclo de mercado em ${diasRestantesMercado} dias`;
        }
        return null;
      }}
    />
  );
};

const FabricaSmartphonesNegocio = () => {
  const { dados } = useContext(CentraldeDadosContext);
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);

  const getProductIcon = (type) => {
    const icons = {
      basico: '📱',
      intermediario: '📲',
      premium: '📳',
      flagship: '🔥',
      gamer: '🎮',
      dobravel: '📴'
    };
    return icons[type] || '📱';
  };

  // Dados de produção de smartphones
  const smartphonesBase = [
    // Básico
    { id: 1, nome: "Básico", tipo: "basico", custo: 20000, unidades: 20, valorPorUnidade: 1200, duracao: 40, icon: "📱" },
    { id: 2, nome: "Básico", tipo: "basico", custo: 36000, unidades: 40, valorPorUnidade: 1200, duracao: 45, icon: "📱" },
    { id: 3, nome: "Básico", tipo: "basico", custo: 50400, unidades: 60, valorPorUnidade: 1200, duracao: 50, icon: "📱" },

    // Intermediário
    { id: 4, nome: "Intermediário", tipo: "intermediario", custo: 50000, unidades: 20, valorPorUnidade: 3000, duracao: 55, icon: "📲" },
    { id: 5, nome: "Intermediário", tipo: "intermediario", custo: 90000, unidades: 40, valorPorUnidade: 3000, duracao: 60, icon: "📲" },
    { id: 6, nome: "Intermediário", tipo: "intermediario", custo: 126000, unidades: 60, valorPorUnidade: 3000, duracao: 65, icon: "📲" },

    // Premium
    { id: 7, nome: "Premium", tipo: "premium", custo: 100000, unidades: 15, valorPorUnidade: 8000, duracao: 70, icon: "📳" },
    { id: 8, nome: "Premium", tipo: "premium", custo: 180000, unidades: 30, valorPorUnidade: 8000, duracao: 75, icon: "📳" },
    { id: 9, nome: "Premium", tipo: "premium", custo: 252000, unidades: 45, valorPorUnidade: 8000, duracao: 80, icon: "📳" },

    // Flagship
    { id: 10, nome: "Flagship", tipo: "flagship", custo: 150000, unidades: 10, valorPorUnidade: 18000, duracao: 85, icon: "🔥" },
    { id: 11, nome: "Flagship", tipo: "flagship", custo: 270000, unidades: 20, valorPorUnidade: 18000, duracao: 90, icon: "🔥" },
    { id: 12, nome: "Flagship", tipo: "flagship", custo: 378000, unidades: 30, valorPorUnidade: 18000, duracao: 95, icon: "🔥" },

    // Gamer
    { id: 13, nome: "Gamer", tipo: "gamer", custo: 120000, unidades: 12, valorPorUnidade: 12000, duracao: 75, icon: "🎮" },
    { id: 14, nome: "Gamer", tipo: "gamer", custo: 216000, unidades: 24, valorPorUnidade: 12000, duracao: 80, icon: "🎮" },
    { id: 15, nome: "Gamer", tipo: "gamer", custo: 302400, unidades: 36, valorPorUnidade: 12000, duracao: 85, icon: "🎮" },

    // Dobrável
    { id: 16, nome: "Dobrável", tipo: "dobravel", custo: 200000, unidades: 8, valorPorUnidade: 30000, duracao: 100, icon: "📴" },
    { id: 17, nome: "Dobrável", tipo: "dobravel", custo: 360000, unidades: 16, valorPorUnidade: 30000, duracao: 105, icon: "📴" },
    { id: 18, nome: "Dobrável", tipo: "dobravel", custo: 504000, unidades: 24, valorPorUnidade: 30000, duracao: 110, icon: "📴" },
  ];

  // Ofertas de mercado com margens de 50-70%
  const marketOffersBase = [
    // BÁSICO 📱
    { id: 1, name: "basico", unidades: 10, pricePerUnit: 1500, totalPrice: 15000 },
    { id: 2, name: "basico", unidades: 20, pricePerUnit: 1600, totalPrice: 32000 },
    { id: 3, name: "basico", unidades: 30, pricePerUnit: 1700, totalPrice: 51000 },
    { id: 4, name: "basico", unidades: 40, pricePerUnit: 1680, totalPrice: 67200 },

    // INTERMEDIÁRIO 📲
    { id: 5, name: "intermediario", unidades: 10, pricePerUnit: 3750, totalPrice: 37500 },
    { id: 6, name: "intermediario", unidades: 15, pricePerUnit: 4000, totalPrice: 60000 },
    { id: 7, name: "intermediario", unidades: 20, pricePerUnit: 4250, totalPrice: 85000 },
    { id: 8, name: "intermediario", unidades: 25, pricePerUnit: 4200, totalPrice: 105000 },

    // PREMIUM 📳
    { id: 9, name: "premium", unidades: 8, pricePerUnit: 10000, totalPrice: 80000 },
    { id: 10, name: "premium", unidades: 12, pricePerUnit: 10666, totalPrice: 127992 },
    { id: 11, name: "premium", unidades: 15, pricePerUnit: 11333, totalPrice: 169995 },
    { id: 12, name: "premium", unidades: 20, pricePerUnit: 11200, totalPrice: 224000 },

    // FLAGSHIP 🔥
    { id: 13, name: "flagship", unidades: 5, pricePerUnit: 22500, totalPrice: 112500 },
    { id: 14, name: "flagship", unidades: 8, pricePerUnit: 24000, totalPrice: 192000 },
    { id: 15, name: "flagship", unidades: 10, pricePerUnit: 25500, totalPrice: 255000 },
    { id: 16, name: "flagship", unidades: 12, pricePerUnit: 25200, totalPrice: 302400 },

    // GAMER 🎮
    { id: 17, name: "gamer", unidades: 6, pricePerUnit: 15000, totalPrice: 90000 },
    { id: 18, name: "gamer", unidades: 10, pricePerUnit: 16000, totalPrice: 160000 },
    { id: 19, name: "gamer", unidades: 12, pricePerUnit: 17000, totalPrice: 204000 },
    { id: 20, name: "gamer", unidades: 15, pricePerUnit: 16800, totalPrice: 252000 },

    // DOBRÁVEL 📴
    { id: 21, name: "dobravel", unidades: 4, pricePerUnit: 37500, totalPrice: 150000 },
    { id: 22, name: "dobravel", unidades: 6, pricePerUnit: 40000, totalPrice: 240000 },
    { id: 23, name: "dobravel", unidades: 8, pricePerUnit: 42500, totalPrice: 340000 },
    { id: 24, name: "dobravel", unidades: 10, pricePerUnit: 42000, totalPrice: 420000 },
  ];

  // ==================== INICIALIZAÇÃO DO NEGÓCIO NO CONTEXT ====================
  useEffect(() => {
    // Garantir que vendasRealizadas existe na estrutura
    if (economiaSetores.negocios?.FabricaSmartphonesNegocio &&
      !economiaSetores.negocios.FabricaSmartphonesNegocio.mercado?.vendasRealizadas) {
      atualizarEco("negocios", {
        ...economiaSetores.negocios,
        FabricaSmartphonesNegocio: {
          ...economiaSetores.negocios.FabricaSmartphonesNegocio,
          mercado: {
            ...economiaSetores.negocios.FabricaSmartphonesNegocio.mercado,
            vendasRealizadas: []
          }
        }
      });
    }
  }, []);

  // Atalho para o negócio
  const negocio = economiaSetores.negocios?.FabricaSmartphonesNegocio;

  // Se ainda não foi inicializado, retorna loading
  if (!negocio) {
    return <div className="text-white text-center p-8">Carregando negócio...</div>;
  }

  // ==================== ATUALIZAÇÃO DE CICLOS ====================
  useEffect(() => {
    if (!negocio) return;

    let precisaAtualizar = false;
    let novoNegocio = { ...negocio };

    // Verificar e atualizar ciclo de produção
    if (dados.dia >= negocio.produzir.proximoCiclo) {
      console.log("🔄 Atualizando ciclo de produção - Dia atual:", dados.dia, "Próximo ciclo era:", negocio.produzir.proximoCiclo);

      novoNegocio.produzir = {
        ...negocio.produzir,
        ofertasAtivas: sortearItens(smartphonesBase, 6),
        proximoCiclo: dados.dia + 40
      };
      precisaAtualizar = true;
    }

    // Verificar e atualizar ciclo de mercado
    if (dados.dia >= negocio.mercado.proximoCiclo) {
      console.log("🔄 Atualizando ciclo de mercado - Dia atual:", dados.dia, "Próximo ciclo era:", negocio.mercado.proximoCiclo);

      novoNegocio.mercado = {
        ofertasAtivas: sortearItens(marketOffersBase, 12),
        vendasRealizadas: [],
        proximoCiclo: dados.dia + 90
      };
      precisaAtualizar = true;
    }

    // Só atualiza se realmente mudou algo
    if (precisaAtualizar) {
      atualizarEco("negocios", {
        ...economiaSetores.negocios,
        FabricaSmartphonesNegocio: novoNegocio
      });
    }
  }, [dados.dia, negocio?.produzir?.proximoCiclo, negocio?.mercado?.proximoCiclo]);

  // ==================== HANDLERS ====================
  const handleProduzir = (smartphone) => {
    if (economiaSetores.saldo < smartphone.custo) {
      alert("💰 Saldo insuficiente!");
      return;
    }
    if (negocio.produzir.producaoAtual) {
      alert("⚠️ Já existe uma produção em andamento!");
      return;
    }

    const novaProducao = {
      nome: smartphone.nome,
      tipo: smartphone.tipo,
      unidades: smartphone.unidades,
      diaInicio: dados.dia,
      diaFim: dados.dia + smartphone.duracao,
      icon: smartphone.icon
    };

    // Atualiza saldo
    atualizarEco("saldo", economiaSetores.saldo - smartphone.custo);

    // Atualiza produção atual
    atualizarEco("negocios", {
      ...economiaSetores.negocios,
      FabricaSmartphonesNegocio: {
        ...negocio,
        produzir: {
          ...negocio.produzir,
          producaoAtual: novaProducao
        }
      }
    });
  };

  const handleColetar = () => {
    if (!negocio.produzir.producaoAtual) return;

    const prod = negocio.produzir.producaoAtual;
    const novoEstoque = {
      ...negocio.estoque.estoqueAtual,
      [prod.tipo]: (negocio.estoque.estoqueAtual[prod.tipo] || 0) + prod.unidades
    };

    atualizarEco("negocios", {
      ...economiaSetores.negocios,
      FabricaSmartphonesNegocio: {
        ...negocio,
        produzir: {
          ...negocio.produzir,
          producaoAtual: null
        },
        estoque: {
          ...negocio.estoque,
          estoqueAtual: novoEstoque
        }
      }
    });
  };

  const handleVender = (offer) => {
    const estoqueAtual = negocio.estoque.estoqueAtual[offer.name] || 0;
    if (offer.unidades > estoqueAtual) {
      alert("⚠️ Você não tem smartphones suficientes!");
      return;
    }

    const novoEstoque = {
      ...negocio.estoque.estoqueAtual,
      [offer.name]: estoqueAtual - offer.unidades
    };

    // Atualiza saldo
    atualizarEco("saldo", economiaSetores.saldo + offer.totalPrice);

    // Atualiza estoque e marca venda como realizada
    atualizarEco("negocios", {
      ...economiaSetores.negocios,
      FabricaSmartphonesNegocio: {
        ...negocio,
        estoque: {
          ...negocio.estoque,
          estoqueAtual: novoEstoque
        },
        mercado: {
          ...negocio.mercado,
          vendasRealizadas: [...(negocio.mercado.vendasRealizadas || []), offer.id]
        }
      }
    });
  };

  // ==================== RENDER TAB CONTENT ====================
  const renderTabContent = (tab, cores, formatCurrency) => {
    if (tab === 'produzir') {
      return (
        <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto">
          {negocio.produzir.ofertasAtivas.map((smartphone) => {
            const podeEscolher = !negocio.produzir.producaoAtual && economiaSetores.saldo >= smartphone.custo;
            return (
              <div key={smartphone.id} className="rounded-lg shadow-md p-4 bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{smartphone.icon}</span>
                  <h3 className="text-base font-bold" style={{ color: cores.primary }}>
                    {smartphone.nome}
                  </h3>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Custo:</span>
                    <span>{formatCurrency(smartphone.custo)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Unidades:</span>
                    <span>{smartphone.unidades}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Custo/Unidade:</span>
                    <span>{formatCurrency(smartphone.custo / smartphone.unidades)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Duração:</span>
                    <span>{smartphone.duracao} dias</span>
                  </div>
                </div>
                <button
                  onClick={() => handleProduzir(smartphone)}
                  disabled={!podeEscolher}
                  className="w-full py-3 rounded font-bold text-white transition-colors"
                  style={{
                    backgroundColor: podeEscolher ? cores.accent : '#6C757D',
                    cursor: podeEscolher ? 'pointer' : 'not-allowed'
                  }}
                >
                  {negocio.produzir.producaoAtual ? 'Produzindo...' : 'Produzir'}
                </button>
              </div>
            );
          })}
        </div>
      );
    }

    if (tab === 'mercado') {
      const ofertasDisponiveis = negocio.mercado.ofertasAtivas.filter(
        (offer) => !(negocio.mercado.vendasRealizadas || []).includes(offer.id)
      );

      return (
        <div className="grid grid-cols-4 gap-4 w-full mx-auto text-center">
          {ofertasDisponiveis.map((offer) => (
            <div key={offer.id} className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="font-bold text-gray-800 mb-2 capitalize text-3xl">
                {getProductIcon(offer.name)}
              </h3>
              <h3 className="font-bold text-gray-800 mb-2 capitalize">{offer.name}</h3>
              <p className="text-sm mb-1">{offer.unidades} unidades</p>
              <p className="text-xs text-gray-500 mb-3">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 0
                }).format(offer.pricePerUnit)}/un
              </p>
              <button
                onClick={() => handleVender(offer)}
                className="py-2 px-4 rounded font-bold text-white text-sm bg-green-600 hover:bg-green-700 transition-colors"
              >
                Vender por {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 0
                }).format(offer.totalPrice)}
              </button>
            </div>
          ))}

          {ofertasDisponiveis.length === 0 && (
            <p className="col-span-4 text-white text-lg mt-4 bg-white/20 p-4 rounded-lg">
              ✅ Todos os compradores já foram atendidos neste ciclo!
            </p>
          )}
        </div>
      );
    }

    if (tab === 'estoque') {
      const estoqueTotal = Object.values(negocio.estoque.estoqueAtual).reduce((a, b) => a + b, 0);
      const percentualOcupado = ((estoqueTotal / negocio.estoque.capacidadeEstoque) * 100).toFixed(1);

      return (
        <div>
          <div className="text-center text-white mb-6 bg-white/20 rounded-lg p-4">
            <p className="text-xl font-bold mb-2">Capacidade do Estoque</p>
            <p className="text-2xl">{estoqueTotal} / {negocio.estoque.capacidadeEstoque} unidades</p>
            <p className="text-sm opacity-80 mt-1">{percentualOcupado}% ocupado</p>

            {/* Barra de progresso */}
            <div className="w-full bg-white/30 rounded-full h-3 mt-3">
              <div
                className="bg-orange-400 h-3 rounded-full transition-all duration-300"
                style={{ width: `${percentualOcupado}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {Object.entries(negocio.estoque.estoqueAtual).map(([type, qtd]) => (
              <div key={type} className="text-center text-white bg-white/20 rounded-xl p-6 hover:bg-white/30 transition-colors">
                <h3 className="text-4xl mb-3">{getProductIcon(type)}</h3>
                <h3 className="text-xl font-bold mb-2 capitalize">{type}</h3>
                <div className="text-lg mb-3 opacity-80">{qtd} unidades</div>
                {qtd === 0 && (
                  <p className="text-xs opacity-60">Estoque vazio</p>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  const estoqueTotal = Object.values(negocio.estoque.estoqueAtual).reduce((a, b) => a + b, 0);

  const tabs = [
    { id: 'produzir', label: 'Produzir', icon: Smartphone, info: null },
    { id: 'mercado', label: 'Mercado', icon: TrendingUp, info: null },
    { id: 'estoque', label: 'Estoque', icon: Package, info: `${estoqueTotal} Unidades` },
  ];

  const producaoPronta = negocio.produzir.producaoAtual &&
    dados.dia >= negocio.produzir.producaoAtual.diaFim;

  const negocioConfig = {
    nome: 'Fábrica de Smartphones',
    cores: SETORES_CONFIG.tecnologia.cores
  };

  // Calcular dias restantes para os ciclos
  const diasRestantesProduzir = Math.max(0, negocio.produzir.proximoCiclo - dados.dia);
  const diasRestantesMercado = Math.max(0, negocio.mercado.proximoCiclo - dados.dia);

  return (
    <BaseBusinessInterface
      negocio={negocioConfig}
      tabs={tabs}
      renderTabContent={renderTabContent}
      headerExtra={
        negocio.produzir.producaoAtual && (
          <div className="bg-white bg-opacity-20 rounded-lg p-3 text-white text-sm">
            {producaoPronta ? (
              <div className="flex items-center justify-between">
                <span className="text-base">
                  📱 <strong>{negocio.produzir.producaoAtual.nome}</strong> pronto para coleta!
                </span>
                <button
                  onClick={handleColetar}
                  className="px-4 py-2 rounded font-bold bg-green-500 hover:bg-green-600 text-white transition-colors"
                >
                  Coletar ({negocio.produzir.producaoAtual.unidades} un)
                </button>
              </div>
            ) : (
              <div className="text-center">
                🏭 Produzindo <strong>{negocio.produzir.producaoAtual.nome}</strong> — Finaliza no dia <strong>{negocio.produzir.producaoAtual.diaFim}</strong>
                <div className="text-xs opacity-80 mt-1">
                  ({negocio.produzir.producaoAtual.diaFim - dados.dia} dias restantes)
                </div>
              </div>
            )}
          </div>
        )
      }
      footerExtra={(tab) => {
        if (tab === 'produzir') {
          return diasRestantesProduzir === 0
            ? `🔄 Novas ofertas disponíveis!`
            : `Próximo ciclo de produção em ${diasRestantesProduzir} dias`;
        }
        if (tab === 'mercado') {
          return diasRestantesMercado === 0
            ? `🔄 Novos compradores disponíveis!`
            : `Próximo ciclo de mercado em ${diasRestantesMercado} dias`;
        }
        return null;
      }}
    />
  );
};

const ConstrutoraInfraestruturaNegocio = () => {
  const { dados } = useContext(CentraldeDadosContext);
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);

  const { negocio, saldo, estoque: maquinarios, adicionarSaldo, removerSaldo, adicionarEstoque, removerEstoque, setDiaAtual } =
    useNegocio({
      id: 'construtora-1',
      nome: 'Construtora de Infraestruturas',
      setor: 'imobiliario',
      saldoInicial: 15000000,
      estoqueInicial: {
        escavadeira: 0,
        betoneira: 0,
        guindaste: 0,
        retroescavadeira: 0,
        rolo: 0,
        perfuratriz: 0
      },
      capacidadeEstoque: 30,
      diaAtual: dados.dia
    });

  const getEquipmentIcon = (type) => {
    const icons = {
      escavadeira: '🚜',
      betoneira: '🏗️',
      guindaste: '🏗️',
      retroescavadeira: '🚜',
      rolo: '🚧',
      perfuratriz: '⚙️'
    };
    return icons[type] || '🚜';
  };

  // Licitações disponíveis
  const licitacoes = [
    {
      id: 1,
      nome: "Hospital Regional Norte",
      tipo: "Saúde",
      localizacao: "São Paulo - SP",
      custo: 45000000,
      duracao: 180,
      requisitos: { escavadeira: 3, betoneira: 4, guindaste: 2, retroescavadeira: 2, rolo: 2, perfuratriz: 2 },
      icon: "🏥",
      descricao: "Construção de hospital com 200 leitos, UTI e centro cirúrgico",
      lucro: 8500000
    },
    {
      id: 2,
      nome: "Ponte Rodoviária BR-101",
      tipo: "Infraestrutura",
      localizacao: "Santos - SP",
      custo: 32000000,
      duracao: 120,
      requisitos: { escavadeira: 2, betoneira: 3, guindaste: 2, retroescavadeira: 1, rolo: 1, perfuratriz: 1 },
      icon: "🌉",
      descricao: "Ponte de 800m sobre rio com pistas duplas",
      lucro: 6200000
    },
    {
      id: 3,
      nome: "Porto de Contêineres",
      tipo: "Portuário",
      localizacao: "Guarujá - SP",
      custo: 78000000,
      duracao: 240,
      requisitos: { escavadeira: 5, betoneira: 4, guindaste: 4, retroescavadeira: 3, rolo: 2, perfuratriz: 2 },
      icon: "⚓",
      descricao: "Terminal portuário para 500 mil TEUs/ano",
      lucro: 14500000
    },
    {
      id: 4,
      nome: "Escola Técnica Estadual",
      tipo: "Educação",
      localizacao: "Campinas - SP",
      custo: 18000000,
      duracao: 90,
      requisitos: { escavadeira: 1, betoneira: 2, guindaste: 1, retroescavadeira: 1, rolo: 1, perfuratriz: 1 },
      icon: "🏫",
      descricao: "Complexo educacional para 1200 alunos",
      lucro: 3200000
    },
    {
      id: 5,
      nome: "Estádio Municipal",
      tipo: "Esportivo",
      localizacao: "Ribeirão Preto - SP",
      custo: 25000000,
      duracao: 150,
      requisitos: { escavadeira: 2, betoneira: 3, guindaste: 2, retroescavadeira: 2, rolo: 2, perfuratriz: 1 },
      icon: "🏟️",
      descricao: "Estádio para 35 mil pessoas com cobertura",
      lucro: 4800000
    },
    {
      id: 6,
      nome: "Metrô Linha Verde",
      tipo: "Transporte",
      localizacao: "São Paulo - SP",
      custo: 100000000,
      duracao: 360,
      requisitos: { escavadeira: 6, betoneira: 5, guindaste: 3, retroescavadeira: 4, rolo: 3, perfuratriz: 4 },
      icon: "🚇",
      descricao: "15km de linha subterrânea com 12 estações",
      lucro: 22000000
    },
    {
      id: 7,
      nome: "Shopping Center",
      tipo: "Comercial",
      localizacao: "Sorocaba - SP",
      custo: 35000000,
      duracao: 140,
      requisitos: { escavadeira: 2, betoneira: 3, guindaste: 2, retroescavadeira: 1, rolo: 2, perfuratriz: 1 },
      icon: "🏬",
      descricao: "Centro comercial com 200 lojas e cinema",
      lucro: 6500000
    },
    {
      id: 8,
      nome: "Condomínio Residencial",
      tipo: "Residencial",
      localizacao: "Jundiaí - SP",
      custo: 28000000,
      duracao: 110,
      requisitos: { escavadeira: 2, betoneira: 2, guindaste: 2, retroescavadeira: 1, rolo: 1, perfuratriz: 1 },
      icon: "🏘️",
      descricao: "5 torres com 400 apartamentos",
      lucro: 5200000
    },
    // --- novas 22 licitações ---
    {
      id: 9,
      nome: "Clínica Popular Municipal",
      tipo: "Saúde",
      localizacao: "Piracicaba - SP",
      custo: 8000000,
      duracao: 60,
      requisitos: { escavadeira: 1, betoneira: 1, guindaste: 1, retroescavadeira: 1 },
      icon: "🩺",
      descricao: "Construção de clínica de atendimento básico e emergencial",
      lucro: 1500000
    },
    {
      id: 10,
      nome: "Viaduto Central",
      tipo: "Infraestrutura",
      localizacao: "Campinas - SP",
      custo: 27000000,
      duracao: 130,
      requisitos: { escavadeira: 2, betoneira: 3, guindaste: 2, rolo: 1 },
      icon: "🛣️",
      descricao: "Viaduto de 600m conectando avenidas principais",
      lucro: 5000000
    },
    {
      id: 11,
      nome: "Aeroporto Regional",
      tipo: "Transporte",
      localizacao: "Presidente Prudente - SP",
      custo: 85000000,
      duracao: 300,
      requisitos: { escavadeira: 5, betoneira: 4, guindaste: 3, rolo: 3, perfuratriz: 3 },
      icon: "✈️",
      descricao: "Pista de pouso e terminal para voos regionais",
      lucro: 16000000
    },
    {
      id: 12,
      nome: "Prédio Administrativo Municipal",
      tipo: "Infraestrutura",
      localizacao: "Franca - SP",
      custo: 12000000,
      duracao: 80,
      requisitos: { escavadeira: 1, betoneira: 2, guindaste: 1 },
      icon: "🏢",
      descricao: "Sede administrativa e de atendimento ao público",
      lucro: 2200000
    },
    {
      id: 13,
      nome: "Centro de Convenções",
      tipo: "Comercial",
      localizacao: "Santos - SP",
      custo: 40000000,
      duracao: 160,
      requisitos: { escavadeira: 3, betoneira: 3, guindaste: 2, rolo: 2 },
      icon: "🏛️",
      descricao: "Espaço multiuso para eventos empresariais e culturais",
      lucro: 7500000
    },
    {
      id: 14,
      nome: "Habitação Popular",
      tipo: "Residencial",
      localizacao: "Limeira - SP",
      custo: 15000000,
      duracao: 100,
      requisitos: { escavadeira: 2, betoneira: 2, rolo: 1 },
      icon: "🏠",
      descricao: "Construção de 300 unidades habitacionais populares",
      lucro: 2800000
    },
    {
      id: 15,
      nome: "Rodovia Estadual SP-230",
      tipo: "Infraestrutura",
      localizacao: "Bauru - SP",
      custo: 95000000,
      duracao: 340,
      requisitos: { escavadeira: 6, betoneira: 4, guindaste: 3, rolo: 4, perfuratriz: 3 },
      icon: "🚧",
      descricao: "Duplicação e pavimentação de 50 km da rodovia",
      lucro: 18500000
    },
    {
      id: 16,
      nome: "Terminal de Ônibus Urbano",
      tipo: "Transporte",
      localizacao: "São José dos Campos - SP",
      custo: 12000000,
      duracao: 90,
      requisitos: { escavadeira: 2, betoneira: 2, rolo: 1 },
      icon: "🚍",
      descricao: "Terminal moderno com 20 plataformas de embarque",
      lucro: 2500000
    },
    {
      id: 17,
      nome: "Centro Esportivo Comunitário",
      tipo: "Esportivo",
      localizacao: "Marília - SP",
      custo: 6000000,
      duracao: 60,
      requisitos: { escavadeira: 1, betoneira: 1, rolo: 1 },
      icon: "🤾",
      descricao: "Quadras, piscina e ginásio poliesportivo comunitário",
      lucro: 1200000
    },
    {
      id: 18,
      nome: "Centro Tecnológico de Inovação",
      tipo: "Educação",
      localizacao: "Campinas - SP",
      custo: 48000000,
      duracao: 200,
      requisitos: { escavadeira: 3, betoneira: 4, guindaste: 2, perfuratriz: 2 },
      icon: "💻",
      descricao: "Laboratórios e escritórios de startups em parceria com universidades",
      lucro: 9000000
    },
    {
      id: 19,
      nome: "Parque Municipal Ecológico",
      tipo: "Infraestrutura",
      localizacao: "Atibaia - SP",
      custo: 7000000,
      duracao: 70,
      requisitos: { escavadeira: 1, betoneira: 1, rolo: 1 },
      icon: "🌳",
      descricao: "Criação de parque urbano com trilhas e áreas verdes",
      lucro: 1300000
    },
    {
      id: 20,
      nome: "Expansão do Porto Seco",
      tipo: "Portuário",
      localizacao: "Campinas - SP",
      custo: 55000000,
      duracao: 210,
      requisitos: { escavadeira: 4, betoneira: 3, guindaste: 3, retroescavadeira: 2 },
      icon: "🚢",
      descricao: "Ampliação da capacidade logística e armazenagem",
      lucro: 10500000
    },
    {
      id: 21,
      nome: "Estação de Tratamento de Água",
      tipo: "Infraestrutura",
      localizacao: "Mogi das Cruzes - SP",
      custo: 20000000,
      duracao: 120,
      requisitos: { escavadeira: 2, betoneira: 2, rolo: 1, perfuratriz: 2 },
      icon: "💧",
      descricao: "Nova estação de tratamento e rede de abastecimento",
      lucro: 3800000
    },
    {
      id: 22,
      nome: "Linha de VLT Metropolitano",
      tipo: "Transporte",
      localizacao: "Santos - SP",
      custo: 90000000,
      duracao: 330,
      requisitos: { escavadeira: 6, betoneira: 5, guindaste: 4, rolo: 3, perfuratriz: 3 },
      icon: "🚈",
      descricao: "Linha de 18km de Veículo Leve sobre Trilhos",
      lucro: 18000000
    },
    {
      id: 23,
      nome: "Museu de Arte Moderna",
      tipo: "Cultural",
      localizacao: "São Paulo - SP",
      custo: 25000000,
      duracao: 150,
      requisitos: { escavadeira: 2, betoneira: 2, guindaste: 1, perfuratriz: 1 },
      icon: "🎨",
      descricao: "Espaço cultural com galerias e auditório",
      lucro: 4700000
    },
    {
      id: 24,
      nome: "Centro de Distribuição Logístico",
      tipo: "Comercial",
      localizacao: "Guarulhos - SP",
      custo: 38000000,
      duracao: 150,
      requisitos: { escavadeira: 3, betoneira: 3, guindaste: 2, rolo: 2 },
      icon: "📦",
      descricao: "Galpão com sistema automatizado de logística e carga",
      lucro: 7200000
    },
    {
      id: 25,
      nome: "Complexo Habitacional Verde Vida",
      tipo: "Residencial",
      localizacao: "Americana - SP",
      custo: 22000000,
      duracao: 120,
      requisitos: { escavadeira: 2, betoneira: 2, rolo: 1 },
      icon: "🏡",
      descricao: "Conjunto habitacional sustentável com energia solar",
      lucro: 4100000
    },
    {
      id: 26,
      nome: "Pavilhão de Exposições Agroindustrial",
      tipo: "Comercial",
      localizacao: "Ribeirão Preto - SP",
      custo: 16000000,
      duracao: 100,
      requisitos: { escavadeira: 2, betoneira: 2, guindaste: 1 },
      icon: "🐄",
      descricao: "Espaço para eventos e feiras agroindustriais",
      lucro: 3000000
    },
    {
      id: 27,
      nome: "Centro Integrado de Segurança",
      tipo: "Infraestrutura",
      localizacao: "São Bernardo do Campo - SP",
      custo: 12000000,
      duracao: 80,
      requisitos: { escavadeira: 1, betoneira: 2, guindaste: 1 },
      icon: "🚔",
      descricao: "Instalação para polícias civil e militar com tecnologia integrada",
      lucro: 2300000
    },
    {
      id: 28,
      nome: "Usina de Energia Solar Municipal",
      tipo: "Energia",
      localizacao: "Araraquara - SP",
      custo: 50000000,
      duracao: 220,
      requisitos: { escavadeira: 3, betoneira: 3, guindaste: 2, perfuratriz: 2 },
      icon: "☀️",
      descricao: "Planta de geração solar fotovoltaica de 50MW",
      lucro: 9500000
    },
    {
      id: 29,
      nome: "Centro de Reciclagem Sustentável",
      tipo: "Infraestrutura",
      localizacao: "Pirassununga - SP",
      custo: 9000000,
      duracao: 70,
      requisitos: { escavadeira: 1, betoneira: 1, rolo: 1 },
      icon: "♻️",
      descricao: "Instalação para triagem e reaproveitamento de resíduos sólidos",
      lucro: 1600000
    },
    {
      id: 30,
      nome: "Ampliação do Aeroporto Internacional",
      tipo: "Transporte",
      localizacao: "Guarulhos - SP",
      custo: 95000000,
      duracao: 350,
      requisitos: { escavadeira: 6, betoneira: 5, guindaste: 4, retroescavadeira: 3, perfuratriz: 4 },
      icon: "🛫",
      descricao: "Expansão do terminal de passageiros e pista adicional",
      lucro: 19500000
    }
  ];


  const [cicloLicitacoes] = useState(() =>
    new CicloDeOfertas({
      baseData: licitacoes,
      quantidadeSorteio: 4,
      duracaoDias: 60,
      chaveStorage: "ciclo_licitacoes"
    })
  );

  useEffect(() => {
    cicloLicitacoes.atualizarDia(dados.dia);
  }, [dados.dia]);

  const licitacoesAtuais = cicloLicitacoes.getItensDisponiveis();

  const [obraAtiva, setObraAtiva] = useState(null);
  const [showBidModal, setShowBidModal] = useState(false);
  const [licitacaoSelecionada, setLicitacaoSelecionada] = useState(null);

  const obraPronta = obraAtiva && dados.dia >= obraAtiva.diaFim;

  const podeParticipar = (licitacao) => {
    if (obraAtiva) return false;
    if (saldo < licitacao.custo) return false;

    return Object.entries(licitacao.requisitos).every(([equip, qtd]) => {
      return (maquinarios[equip] || 0) >= qtd;
    });
  };

  const handleParticiparLicitacao = (licitacao) => {
    if (removerSaldo(licitacao.custo)) {
      atualizarEco("saldo", economiaSetores.saldo - licitacao.custo);
      setObraAtiva({
        ...licitacao,
        diaInicio: dados.dia,
        diaFim: dados.dia + licitacao.duracao
      });
      setShowBidModal(false);
      setLicitacaoSelecionada(null);
    }
  };

  const handleColetarLucro = () => {
    if (obraAtiva) {
      const recebimento = obraAtiva.custo + obraAtiva.lucro;
      adicionarSaldo(recebimento);
      atualizarEco("saldo", economiaSetores.saldo + recebimento);
      setObraAtiva(null);
      setDiaAtual(dados.dia);
    }
  };

  const handleComprarEquipamento = (equipamento) => {
    if (saldo >= equipamento.preco) {
      if (removerSaldo(equipamento.preco)) {
        atualizarEco("saldo", economiaSetores.saldo - equipamento.preco);
        adicionarEstoque(equipamento.tipo, 1);
      }
    }
  };

  const getProjectTypeColor = (tipo) => {
    const cores = {
      'Saúde': '#ef4444',
      'Infraestrutura': '#3b82f6',
      'Portuário': '#0ea5e9',
      'Educação': '#10b981',
      'Esportivo': '#f59e0b',
      'Transporte': '#8b5cf6',
      'Comercial': '#ec4899',
      'Residencial': '#06b6d4'
    };
    return cores[tipo] || '#6c757d';
  };

  const renderTabContent = (tab, cores, formatCurrency) => {
    if (tab === 'licitacoes') {
      return (
        <div className="grid grid-cols-2 gap-4 max-w-6xl mx-auto">
          {licitacoesAtuais.map((licitacao) => {
            const canBid = podeParticipar(licitacao);

            return (
              <div
                key={licitacao.id}
                className={`rounded-lg shadow-md p-4 transition-all ${canBid ? 'hover:shadow-lg' : 'opacity-60'
                  }`}
                style={{ backgroundColor: '#ffffff' }}
              >
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{licitacao.icon}</span>
                      <div>
                        <h3 className="text-sm font-bold" style={{ color: cores.primary }}>
                          {licitacao.nome}
                        </h3>
                        <div
                          className="text-xs px-2 py-1 rounded text-white inline-block"
                          style={{ backgroundColor: getProjectTypeColor(licitacao.tipo) }}
                        >
                          {licitacao.tipo}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-600">{licitacao.localizacao}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Investimento:</span>
                        <span className="font-bold text-red-600">{formatCurrency(licitacao.custo)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Lucro:</span>
                        <span className="font-bold text-green-600">{formatCurrency(licitacao.lucro)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Duração:</span>
                        <span className="font-semibold">{licitacao.duracao} dias</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="space-y-1 mb-3">
                      <div className="text-xs text-gray-600 mb-1">Equipamentos necessários:</div>
                      {Object.entries(licitacao.requisitos).map(([equip, qtd]) => (
                        <div key={equip} className="flex justify-between text-xs">
                          <span className="capitalize">{equip}:</span>
                          <span className={
                            (maquinarios[equip] || 0) >= qtd ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'
                          }>
                            {maquinarios[equip] || 0}/{qtd}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-xs mb-3 p-2 bg-gray-50 rounded text-gray-600">
                  {licitacao.descricao}
                </div>

                <button
                  onClick={() => {
                    if (canBid) {
                      setLicitacaoSelecionada(licitacao);
                      setShowBidModal(true);
                    }
                  }}
                  disabled={!canBid}
                  className="w-full py-3 rounded font-bold text-white text-sm"
                  style={{
                    backgroundColor: canBid ? cores.accent : '#6c757d',
                    cursor: canBid ? 'pointer' : 'not-allowed'
                  }}
                >
                  {obraAtiva
                    ? 'Obra em Andamento'
                    : !canBid
                      ? 'Requisitos Insuficientes'
                      : 'Participar da Licitação'
                  }
                </button>
              </div>
            );
          })}
        </div>
      );
    }


    if (tab === 'equipamentos') {
      return (
        <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto">
          {equipamentosDisponiveis.map((equipamento, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-center mb-3">
                <div className="text-3xl mb-2">{getEquipmentIcon(equipamento.tipo)}</div>
                <h3 className="font-bold text-gray-800 text-sm">{equipamento.nome}</h3>
                <p className="text-xs text-gray-500 mb-1">{equipamento.categoria}</p>
                <p className="text-xs text-gray-600 mt-2">
                  Você possui: <span className="font-bold">{maquinarios[equipamento.tipo] || 0}</span>
                </p>
              </div>
              <div
                className="py-2 px-3 rounded font-bold text-white text-sm text-center mb-3"
                style={{ backgroundColor: cores.primary }}
              >
                {formatCurrency(equipamento.preco)}
              </div>
              <button
                onClick={() => handleComprarEquipamento(equipamento)}
                disabled={saldo < equipamento.preco}
                className="w-full py-2 px-3 rounded text-sm font-bold text-white"
                style={{
                  backgroundColor: saldo >= equipamento.preco ? '#10b981' : '#6c757d',
                  cursor: saldo >= equipamento.preco ? 'pointer' : 'not-allowed'
                }}
              >
                Comprar
              </button>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  const tabs = [
    { id: 'licitacoes', label: 'Licitações', icon: Building2, info: null },
    { id: 'equipamentos', label: 'Equipamentos', icon: Truck, info: `${Object.values(maquinarios).reduce((a, b) => a + b, 0)} total` }
  ];

  const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', {
    style: 'currency', currency: 'BRL', minimumFractionDigits: 0
  }).format(value);

  return (
    <>
      <BaseBusinessInterface
        negocio={negocio}
        tabs={tabs}
        renderTabContent={renderTabContent}
        headerExtra={
          obraAtiva && (
            <div className="bg-white bg-opacity-20 rounded-lg p-3 text-white text-sm">
              {obraPronta ? (
                <div className="flex items-center justify-between">
                  <span>✅ {obraAtiva.nome} concluída!</span>
                  <button
                    onClick={handleColetarLucro}
                    className="px-4 py-2 rounded font-bold bg-green-500 text-white hover:bg-green-600"
                  >
                    Coletar {formatCurrency(obraAtiva.custo + obraAtiva.lucro)}
                  </button>
                </div>
              ) : (
                <div>
                  🏗️ Construindo {obraAtiva.nome} — Conclusão no dia {obraAtiva.diaFim}
                </div>
              )}
            </div>
          )
        }
        footerExtra={(tab) => {
          if (tab === 'licitacoes') return `Próximo ciclo de licitações em ${cicloLicitacoes.getFimCiclo() - dados.dia} dias`;
          return null;
        }}
      />

      {/* Modal de Confirmação */}
      {showBidModal && licitacaoSelecionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Confirmar Participação
            </h3>

            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-bold text-gray-800 mb-2">
                {licitacaoSelecionada.icon} {licitacaoSelecionada.nome}
              </h4>
              <p className="text-sm text-gray-600 mb-3">{licitacaoSelecionada.descricao}</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Investimento:</span>
                  <span className="font-bold text-red-600">{formatCurrency(licitacaoSelecionada.custo)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lucro estimado:</span>
                  <span className="font-bold text-green-600">{formatCurrency(licitacaoSelecionada.lucro)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duração:</span>
                  <span className="font-semibold">{licitacaoSelecionada.duracao} dias</span>
                </div>
              </div>
            </div>

            <div className="mb-6 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">Atenção</span>
              </div>
              <p className="text-sm text-yellow-700">
                O valor de {formatCurrency(licitacaoSelecionada.custo)} será debitado imediatamente.
                Você receberá {formatCurrency(licitacaoSelecionada.custo + licitacaoSelecionada.lucro)} após a conclusão da obra.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowBidModal(false);
                  setLicitacaoSelecionada(null);
                }}
                className="flex-1 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-bold"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleParticiparLicitacao(licitacaoSelecionada)}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const TerraplagagemPavimentacaoNegocio = () => {
  const { dados } = useContext(CentraldeDadosContext);
  const { economiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);

  const { negocio, saldo, estoque: equipamentos, adicionarSaldo, removerSaldo, adicionarEstoque, removerEstoque, setDiaAtual } =
    useNegocio({
      id: 'terraplanagem-1',
      nome: 'Terraplanagem e Pavimentação',
      setor: 'imobiliario',
      saldoInicial: 8000000,
      estoqueInicial: {
        motoniveladora: 0,
        compactador: 0,
        caminhao_basculante: 0,
        fresadora: 0,
        vibroacabadora: 0,
        rolo_compressor: 0
      },
      capacidadeEstoque: 25,
      diaAtual: dados.dia
    });

  const getEquipmentIcon = (type) => {
    const icons = {
      motoniveladora: '🚜',
      compactador: '🚧',
      caminhao_basculante: '🚛',
      fresadora: '⚙️',
      vibroacabadora: '🛣️',
      rolo_compressor: '🚧'
    };
    return icons[type] || '🚜';
  };

  // Equipamentos disponíveis para compra
  const equipamentosDisponiveis = [
    { nome: 'Motoniveladora', tipo: 'motoniveladora', categoria: 'Nivelamento', preco: 850000 },
    { nome: 'Compactador Vibrátorio', tipo: 'compactador', categoria: 'Compactação', preco: 380000 },
    { nome: 'Caminhão Basculante', tipo: 'caminhao_basculante', categoria: 'Transporte', preco: 420000 },
    { nome: 'Fresadora de Asfalto', tipo: 'fresadora', categoria: 'Pavimentação', preco: 920000 },
    { nome: 'Vibroacabadora', tipo: 'vibroacabadora', categoria: 'Pavimentação', preco: 780000 },
    { nome: 'Rolo Compressor', tipo: 'rolo_compressor', categoria: 'Compactação', preco: 520000 }
  ];

  // Licitações disponíveis
  const licitacoes = [
    {
      id: 1,
      nome: "Pavimentação Avenida Principal",
      tipo: "Pavimentação",
      localizacao: "São Paulo - SP",
      custo: 5500000,
      duracao: 90,
      requisitos: { motoniveladora: 2, compactador: 2, vibroacabadora: 2, rolo_compressor: 2 },
      icon: "🛣️",
      descricao: "Recapeamento asfáltico de 5km em avenida de grande movimento",
      lucro: 1200000
    },
    {
      id: 2,
      nome: "Terraplenagem Loteamento Residencial",
      tipo: "Terraplenagem",
      localizacao: "Campinas - SP",
      custo: 3200000,
      duracao: 60,
      requisitos: { motoniveladora: 2, compactador: 1, caminhao_basculante: 3 },
      icon: "⛰️",
      descricao: "Preparação de terreno para 200 lotes residenciais",
      lucro: 750000
    },
    {
      id: 3,
      nome: "Rodovia Vicinal Pavimentação",
      tipo: "Pavimentação",
      localizacao: "Ribeirão Preto - SP",
      custo: 12000000,
      duracao: 150,
      requisitos: { motoniveladora: 3, compactador: 3, vibroacabadora: 3, rolo_compressor: 3, caminhao_basculante: 2 },
      icon: "🚧",
      descricao: "Pavimentação de 15km de rodovia vicinal com sinalização",
      lucro: 2800000
    },
    {
      id: 4,
      nome: "Pátio Industrial",
      tipo: "Terraplenagem",
      localizacao: "Jundiaí - SP",
      custo: 2800000,
      duracao: 45,
      requisitos: { motoniveladora: 1, compactador: 2, caminhao_basculante: 2 },
      icon: "🏭",
      descricao: "Terraplanagem e nivelamento de pátio para indústria",
      lucro: 620000
    },
    {
      id: 5,
      nome: "Recapeamento Bairro Central",
      tipo: "Pavimentação",
      localizacao: "Santos - SP",
      custo: 4200000,
      duracao: 70,
      requisitos: { fresadora: 2, vibroacabadora: 2, rolo_compressor: 2 },
      icon: "🏘️",
      descricao: "Recapeamento de 32 ruas do centro histórico",
      lucro: 950000
    },
    {
      id: 6,
      nome: "Aeroporto Pista Auxiliar",
      tipo: "Pavimentação",
      localizacao: "Guarulhos - SP",
      custo: 18000000,
      duracao: 200,
      requisitos: { motoniveladora: 4, compactador: 4, vibroacabadora: 3, rolo_compressor: 4, caminhao_basculante: 3 },
      icon: "✈️",
      descricao: "Construção de pista auxiliar com 2.5km e taxiway",
      lucro: 4200000
    },
    {
      id: 7,
      nome: "Condomínio Logístico Terraplanagem",
      tipo: "Terraplenagem",
      localizacao: "Barueri - SP",
      custo: 6500000,
      duracao: 100,
      requisitos: { motoniveladora: 3, compactador: 2, caminhao_basculante: 4 },
      icon: "📦",
      descricao: "Preparação de terreno de 80 mil m² para galpões",
      lucro: 1450000
    },
    {
      id: 8,
      nome: "Via Marginal Duplicação",
      tipo: "Pavimentação",
      localizacao: "Sorocaba - SP",
      custo: 8900000,
      duracao: 120,
      requisitos: { motoniveladora: 3, compactador: 2, vibroacabadora: 2, rolo_compressor: 3, fresadora: 1 },
      icon: "🛤️",
      descricao: "Duplicação de 8km de via marginal com ciclovia",
      lucro: 1950000
    },
    {
      id: 9,
      nome: "Estacionamento Shopping",
      tipo: "Pavimentação",
      localizacao: "Limeira - SP",
      custo: 1800000,
      duracao: 35,
      requisitos: { compactador: 1, vibroacabadora: 1, rolo_compressor: 1 },
      icon: "🅿️",
      descricao: "Pavimentação de estacionamento para 800 vagas",
      lucro: 420000
    },
    {
      id: 10,
      nome: "Terraplenagem Distrito Industrial",
      tipo: "Terraplenagem",
      localizacao: "Americana - SP",
      custo: 5200000,
      duracao: 85,
      requisitos: { motoniveladora: 2, compactador: 2, caminhao_basculante: 3 },
      icon: "🏗️",
      descricao: "Preparação de área de 120 mil m² para polo industrial",
      lucro: 1100000
    },
    {
      id: 11,
      nome: "Ciclovias Urbanas Integradas",
      tipo: "Pavimentação",
      localizacao: "Campinas - SP",
      custo: 3600000,
      duracao: 65,
      requisitos: { motoniveladora: 1, compactador: 2, vibroacabadora: 2 },
      icon: "🚴",
      descricao: "Construção de 12km de ciclovias interligadas",
      lucro: 820000
    },
    {
      id: 12,
      nome: "Acesso Rodoviário Condomínio",
      tipo: "Pavimentação",
      localizacao: "Atibaia - SP",
      custo: 2400000,
      duracao: 50,
      requisitos: { motoniveladora: 1, vibroacabadora: 1, rolo_compressor: 1, caminhao_basculante: 1 },
      icon: "🏡",
      descricao: "Pavimentação de 3km de acesso a condomínio fechado",
      lucro: 560000
    },
    {
      id: 13,
      nome: "Porto Terminal Terrestre",
      tipo: "Terraplenagem",
      localizacao: "Santos - SP",
      custo: 9800000,
      duracao: 140,
      requisitos: { motoniveladora: 4, compactador: 3, caminhao_basculante: 5 },
      icon: "⚓",
      descricao: "Aterro e nivelamento para expansão portuária",
      lucro: 2150000
    },
    {
      id: 14,
      nome: "Ruas do Bairro Popular",
      tipo: "Pavimentação",
      localizacao: "Guarujá - SP",
      custo: 2900000,
      duracao: 55,
      requisitos: { compactador: 2, vibroacabadora: 2, rolo_compressor: 2 },
      icon: "🏘️",
      descricao: "Pavimentação de 18 ruas em bairro popular",
      lucro: 680000
    },
    {
      id: 15,
      nome: "Rodovia Estadual Restauração",
      tipo: "Pavimentação",
      localizacao: "Piracicaba - SP",
      custo: 15000000,
      duracao: 180,
      requisitos: { motoniveladora: 3, fresadora: 3, vibroacabadora: 3, rolo_compressor: 4, compactador: 2 },
      icon: "🛣️",
      descricao: "Restauração completa de 20km de rodovia estadual",
      lucro: 3500000
    },
    {
      id: 16,
      nome: "Platô para Centro Comercial",
      tipo: "Terraplenagem",
      localizacao: "Mogi das Cruzes - SP",
      custo: 4100000,
      duracao: 70,
      requisitos: { motoniveladora: 2, compactador: 2, caminhao_basculante: 3 },
      icon: "🏬",
      descricao: "Criação de platô de 45 mil m² para shopping center",
      lucro: 920000
    },
    {
      id: 17,
      nome: "Parque Linear Pavimentação",
      tipo: "Pavimentação",
      localizacao: "São Bernardo do Campo - SP",
      custo: 3300000,
      duracao: 60,
      requisitos: { motoniveladora: 1, compactador: 2, vibroacabadora: 1 },
      icon: "🌳",
      descricao: "Pavimentação de vias e trilhas em parque de 8km",
      lucro: 750000
    },
    {
      id: 18,
      nome: "Acostamento Rodovia Federal",
      tipo: "Pavimentação",
      localizacao: "Taubaté - SP",
      custo: 6800000,
      duracao: 95,
      requisitos: { motoniveladora: 2, compactador: 2, vibroacabadora: 2, rolo_compressor: 2 },
      icon: "🚛",
      descricao: "Construção de acostamento pavimentado em 18km",
      lucro: 1480000
    },
    {
      id: 19,
      nome: "Campus Universitário Vias Internas",
      tipo: "Pavimentação",
      localizacao: "São Carlos - SP",
      custo: 2600000,
      duracao: 50,
      requisitos: { compactador: 1, vibroacabadora: 2, rolo_compressor: 1 },
      icon: "🎓",
      descricao: "Pavimentação de 5km de vias internas do campus",
      lucro: 600000
    },
    {
      id: 20,
      nome: "Terraplanagem Campo de Futebol",
      tipo: "Terraplenagem",
      localizacao: "Franca - SP",
      custo: 1200000,
      duracao: 30,
      requisitos: { motoniveladora: 1, compactador: 1, caminhao_basculante: 2 },
      icon: "⚽",
      descricao: "Nivelamento e drenagem para complexo esportivo",
      lucro: 280000
    },
    {
      id: 21,
      nome: "Binário Central Recapeamento",
      tipo: "Pavimentação",
      localizacao: "Presidente Prudente - SP",
      custo: 4800000,
      duracao: 75,
      requisitos: { fresadora: 2, vibroacabadora: 2, rolo_compressor: 2, compactador: 1 },
      icon: "🚦",
      descricao: "Recapeamento de binário de 6km no centro da cidade",
      lucro: 1050000
    },
    {
      id: 22,
      nome: "Área Industrial Terraplenagem",
      tipo: "Terraplenagem",
      localizacao: "Sumaré - SP",
      custo: 7200000,
      duracao: 110,
      requisitos: { motoniveladora: 3, compactador: 3, caminhao_basculante: 4 },
      icon: "🏭",
      descricao: "Preparação de 150 mil m² para distrito industrial",
      lucro: 1600000
    },
    {
      id: 23,
      nome: "Corredor de Ônibus BRT",
      tipo: "Pavimentação",
      localizacao: "São José dos Campos - SP",
      custo: 9500000,
      duracao: 130,
      requisitos: { motoniveladora: 3, compactador: 3, vibroacabadora: 3, rolo_compressor: 3 },
      icon: "🚌",
      descricao: "Construção de 10km de corredor exclusivo BRT",
      lucro: 2100000
    },
    {
      id: 24,
      nome: "Condomínio Empresarial Acessos",
      tipo: "Pavimentação",
      localizacao: "Indaiatuba - SP",
      custo: 3100000,
      duracao: 55,
      requisitos: { motoniveladora: 1, vibroacabadora: 2, rolo_compressor: 2 },
      icon: "🏢",
      descricao: "Pavimentação de vias internas e acessos de 4km",
      lucro: 710000
    },
    {
      id: 25,
      nome: "Aterro Sanitário Preparação",
      tipo: "Terraplenagem",
      localizacao: "Marília - SP",
      custo: 5800000,
      duracao: 90,
      requisitos: { motoniveladora: 3, compactador: 2, caminhao_basculante: 4 },
      icon: "♻️",
      descricao: "Terraplanagem e impermeabilização para aterro sanitário",
      lucro: 1250000
    },
    {
      id: 26,
      nome: "Viaduto Acesso Pavimentação",
      tipo: "Pavimentação",
      localizacao: "Bauru - SP",
      custo: 4500000,
      duracao: 80,
      requisitos: { compactador: 2, vibroacabadora: 2, rolo_compressor: 2, fresadora: 1 },
      icon: "🌉",
      descricao: "Pavimentação de viaduto e alças de acesso totalizando 2.5km",
      lucro: 980000
    },
    {
      id: 27,
      nome: "Estradas Rurais Recuperação",
      tipo: "Terraplenagem",
      localizacao: "Araraquara - SP",
      custo: 2200000,
      duracao: 50,
      requisitos: { motoniveladora: 2, compactador: 1, caminhao_basculante: 2 },
      icon: "🚜",
      descricao: "Recuperação e nivelamento de 25km de estradas rurais",
      lucro: 510000
    },
    {
      id: 28,
      nome: "Terminal Intermodal Pátios",
      tipo: "Pavimentação",
      localizacao: "Campinas - SP",
      custo: 11000000,
      duracao: 145,
      requisitos: { motoniveladora: 3, compactador: 3, vibroacabadora: 3, rolo_compressor: 4 },
      icon: "🚆",
      descricao: "Pavimentação de pátios de carga para terminal intermodal",
      lucro: 2450000
    },
    {
      id: 29,
      nome: "Loteamento Alto Padrão",
      tipo: "Terraplenagem",
      localizacao: "Valinhos - SP",
      custo: 8400000,
      duracao: 125,
      requisitos: { motoniveladora: 3, compactador: 3, caminhao_basculante: 4 },
      icon: "🏰",
      descricao: "Terraplanagem completa para 150 lotes de alto padrão",
      lucro: 1850000
    },
    {
      id: 30,
      nome: "Via Expressa Metropolitana",
      tipo: "Pavimentação",
      localizacao: "São Paulo - SP",
      custo: 22000000,
      duracao: 240,
      requisitos: { motoniveladora: 4, fresadora: 3, vibroacabadora: 4, rolo_compressor: 5, compactador: 3, caminhao_basculante: 2 },
      icon: "🏙️",
      descricao: "Construção de 12km de via expressa com 4 pistas",
      lucro: 5200000
    }
  ];

  const [cicloLicitacoes] = useState(() =>
    new CicloDeOfertas({
      baseData: licitacoes,
      quantidadeSorteio: 4,
      duracaoDias: 60,
      chaveStorage: "ciclo_licitacoes_terraplanagem"
    })
  );

  useEffect(() => {
    cicloLicitacoes.atualizarDia(dados.dia);
  }, [dados.dia]);

  const licitacoesAtuais = cicloLicitacoes.getItensDisponiveis();

  const [obraAtiva, setObraAtiva] = useState(null);
  const [showBidModal, setShowBidModal] = useState(false);
  const [licitacaoSelecionada, setLicitacaoSelecionada] = useState(null);

  const obraPronta = obraAtiva && dados.dia >= obraAtiva.diaFim;

  const podeParticipar = (licitacao) => {
    if (obraAtiva) return false;
    if (saldo < licitacao.custo) return false;

    return Object.entries(licitacao.requisitos).every(([equip, qtd]) => {
      return (equipamentos[equip] || 0) >= qtd;
    });
  };

  const handleParticiparLicitacao = (licitacao) => {
    if (removerSaldo(licitacao.custo)) {
      atualizarEco("saldo", economiaSetores.saldo - licitacao.custo);
      setObraAtiva({
        ...licitacao,
        diaInicio: dados.dia,
        diaFim: dados.dia + licitacao.duracao
      });
      setShowBidModal(false);
      setLicitacaoSelecionada(null);
    }
  };

  const handleColetarLucro = () => {
    if (obraAtiva) {
      const recebimento = obraAtiva.custo + obraAtiva.lucro;
      adicionarSaldo(recebimento);
      atualizarEco("saldo", economiaSetores.saldo + recebimento);
      setObraAtiva(null);
      setDiaAtual(dados.dia);
    }
  };

  const handleComprarEquipamento = (equipamento) => {
    if (saldo >= equipamento.preco) {
      if (removerSaldo(equipamento.preco)) {
        atualizarEco("saldo", economiaSetores.saldo - equipamento.preco);
        adicionarEstoque(equipamento.tipo, 1);
      }
    }
  };

  const getProjectTypeColor = (tipo) => {
    const cores = {
      'Pavimentação': '#f59e0b',
      'Terraplenagem': '#8b4513'
    };
    return cores[tipo] || '#6c757d';
  };

  const renderTabContent = (tab, cores, formatCurrency) => {
    if (tab === 'licitacoes') {
      return (
        <div className="grid grid-cols-2 gap-4 max-w-6xl mx-auto">
          {licitacoesAtuais.map((licitacao) => {
            const canBid = podeParticipar(licitacao);

            return (
              <div
                key={licitacao.id}
                className={`rounded-lg shadow-md p-4 transition-all ${canBid ? 'hover:shadow-lg' : 'opacity-60'
                  }`}
                style={{ backgroundColor: '#ffffff' }}
              >
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{licitacao.icon}</span>
                      <div>
                        <h3 className="text-sm font-bold" style={{ color: cores.primary }}>
                          {licitacao.nome}
                        </h3>
                        <div
                          className="text-xs px-2 py-1 rounded text-white inline-block"
                          style={{ backgroundColor: getProjectTypeColor(licitacao.tipo) }}
                        >
                          {licitacao.tipo}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-600">{licitacao.localizacao}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Investimento:</span>
                        <span className="font-bold text-red-600">{formatCurrency(licitacao.custo)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Lucro:</span>
                        <span className="font-bold text-green-600">{formatCurrency(licitacao.lucro)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Duração:</span>
                        <span className="font-semibold">{licitacao.duracao} dias</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="space-y-1 mb-3">
                      <div className="text-xs text-gray-600 mb-1">Equipamentos necessários:</div>
                      {Object.entries(licitacao.requisitos).map(([equip, qtd]) => (
                        <div key={equip} className="flex justify-between text-xs">
                          <span className="capitalize">{equip.replace(/_/g, ' ')}:</span>
                          <span className={
                            (equipamentos[equip] || 0) >= qtd ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'
                          }>
                            {equipamentos[equip] || 0}/{qtd}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-xs mb-3 p-2 bg-gray-50 rounded text-gray-600">
                  {licitacao.descricao}
                </div>

                <button
                  onClick={() => {
                    if (canBid) {
                      setLicitacaoSelecionada(licitacao);
                      setShowBidModal(true);
                    }
                  }}
                  disabled={!canBid}
                  className="w-full py-3 rounded font-bold text-white text-sm"
                  style={{
                    backgroundColor: canBid ? cores.accent : '#6c757d',
                    cursor: canBid ? 'pointer' : 'not-allowed'
                  }}
                >
                  {obraAtiva
                    ? 'Obra em Andamento'
                    : !canBid
                      ? 'Requisitos Insuficientes'
                      : 'Participar da Licitação'
                  }
                </button>
              </div>
            );
          })}
        </div>
      );
    }

    if (tab === 'equipamentos') {
      return (
        <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto">
          {equipamentosDisponiveis.map((equipamento, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-center mb-3">
                <div className="text-3xl mb-2">{getEquipmentIcon(equipamento.tipo)}</div>
                <h3 className="font-bold text-gray-800 text-sm">{equipamento.nome}</h3>
                <p className="text-xs text-gray-500 mb-1">{equipamento.categoria}</p>
                <p className="text-xs text-gray-600 mt-2">
                  Você possui: <span className="font-bold">{equipamentos[equipamento.tipo] || 0}</span>
                </p>
              </div>
              <div
                className="py-2 px-3 rounded font-bold text-white text-sm text-center mb-3"
                style={{ backgroundColor: cores.primary }}
              >
                {formatCurrency(equipamento.preco)}
              </div>
              <button
                onClick={() => handleComprarEquipamento(equipamento)}
                disabled={saldo < equipamento.preco}
                className="w-full py-2 px-3 rounded text-sm font-bold text-white"
                style={{
                  backgroundColor: saldo >= equipamento.preco ? '#10b981' : '#6c757d',
                  cursor: saldo >= equipamento.preco ? 'pointer' : 'not-allowed'
                }}
              >
                Comprar
              </button>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  const tabs = [
    { id: 'licitacoes', label: 'Licitações', icon: Building2, info: null },
    { id: 'equipamentos', label: 'Equipamentos', icon: Truck, info: `${Object.values(equipamentos).reduce((a, b) => a + b, 0)} total` }
  ];

  const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', {
    style: 'currency', currency: 'BRL', minimumFractionDigits: 0
  }).format(value);

  return (
    <>
      <BaseBusinessInterface
        negocio={negocio}
        tabs={tabs}
        renderTabContent={renderTabContent}
        headerExtra={
          obraAtiva && (
            <div className="bg-white bg-opacity-20 rounded-lg p-3 text-white text-sm">
              {obraPronta ? (
                <div className="flex items-center justify-between">
                  <span>✅ {obraAtiva.nome} concluída!</span>
                  <button
                    onClick={handleColetarLucro}
                    className="px-4 py-2 rounded font-bold bg-green-500 text-white hover:bg-green-600"
                  >
                    Coletar {formatCurrency(obraAtiva.custo + obraAtiva.lucro)}
                  </button>
                </div>
              ) : (
                <div>
                  🚧 Executando {obraAtiva.nome} — Conclusão no dia {obraAtiva.diaFim}
                </div>
              )}
            </div>
          )
        }
        footerExtra={(tab) => {
          if (tab === 'licitacoes') return `Próximo ciclo de licitações em ${cicloLicitacoes.getFimCiclo() - dados.dia} dias`;
          return null;
        }}
      />
      {showBidModal && licitacaoSelecionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Confirmar Participação
            </h3>

            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-bold text-gray-800 mb-2">
                {licitacaoSelecionada.icon} {licitacaoSelecionada.nome}
              </h4>
              <p className="text-sm text-gray-600 mb-3">{licitacaoSelecionada.descricao}</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Investimento:</span>
                  <span className="font-bold text-red-600">{formatCurrency(licitacaoSelecionada.custo)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lucro estimado:</span>
                  <span className="font-bold text-green-600">{formatCurrency(licitacaoSelecionada.lucro)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duração:</span>
                  <span className="font-semibold">{licitacaoSelecionada.duracao} dias</span>
                </div>
              </div>
            </div>

            <div className="mb-6 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">Atenção</span>
              </div>
              <p className="text-sm text-yellow-700">
                O valor de {formatCurrency(licitacaoSelecionada.custo)} será debitado imediatamente.
                Você receberá {formatCurrency(licitacaoSelecionada.custo + licitacaoSelecionada.lucro)} após a conclusão da obra.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowBidModal(false);
                  setLicitacaoSelecionada(null);
                }}
                className="flex-1 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-bold"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleParticiparLicitacao(licitacaoSelecionada)}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
// ==================== APP PRINCIPAL ====================

const getImageUrl = (nomeArquivo) => `/imagens/${nomeArquivo}.png`;


const App = () => {
  const [negocioAtivo, setNegocioAtivo] = useState('');
  const { economiaSetores, setEconomiaSetores, atualizarEco, verificarLimites } = useContext(DadosEconomyGlobalContext);
  const { dados, atualizarDados } = useContext(CentraldeDadosContext);
  return (
    <div className="flex-1 w-full rounded-[20px] flex flex-col">


      <div className="w-full flex flex-col justify-between items-center h-full rounded-xl m-auto">
        <div className=" mx-auto flex h-full mb-[10px]">
          <div className="flex gap-2 h-full">

            {dados.agricultura.edificios[0].quantidade > 0 &&
              <button
                onClick={() => setNegocioAtivo('plantacao')}
                className={`p-2 rounded-xl w-[70px] h-[70px] font-bold ${negocioAtivo === 'plantacao'
                  ? 'bg-[#4CAF50] text-white border solid'
                  : 'bg-[#350973] text-gray-700'
                  }`}
              >
                <img src={plantacao} />
              </button>
            }

            {dados.comercio.edificios[7].quantidade > 0 && <button
              onClick={() => setNegocioAtivo('acougue')}
              className={`p-2 rounded-xl w-[70px] h-[70px] font-bold ${negocioAtivo === 'acougue'
                ? 'bg-[#FF4D4D] text-white border solid'
                : 'bg-[#350973] text-gray-700'
                }`}
            >
              <img src={açougue} />
            </button>
            }

            {dados.energia.edificios[4].quantidade > 0 &&
              <button
                onClick={() => setNegocioAtivo('painel')}
                className={`p-2 rounded-xl w-[70px] h-[70px] font-bold ${negocioAtivo === 'painel'
                  ? 'bg-[#E6B800] text-white border solid'
                  : 'bg-[#350973] text-gray-700'
                  }`}
              >
                <img src={painel} />
              </button>
            }
            {dados.industria.edificios[25].quantidade > 0 &&
              <button
                onClick={() => setNegocioAtivo('automóveis')}
                className={`p-2 rounded-xl w-[70px] h-[70px] font-bold ${negocioAtivo === 'automóveis'
                  ? 'bg-[#B3B3B3] text-white border solid '
                  : 'bg-[#350973] text-gray-700'
                  }`}
              >
                <img src={automovel} />
              </button>
            }

            {dados.tecnologia.edificios[15].quantidade > 0 &&
              <button
                onClick={() => setNegocioAtivo('smartphone')}
                className={`p-2 rounded-xl w-[70px] h-[70px] font-bold ${negocioAtivo === 'smartphone'
                  ? 'bg-[#FF8C42] text-white border solid'
                  : 'bg-[#350973] text-gray-700'
                  }`}
              >
                <img src={smartphone} />
              </button>
            }

            {dados.imobiliario.edificios[9].quantidade > 0 &&
              <button
                onClick={() => setNegocioAtivo('construtora')}
                className={`p-2 rounded-xl w-[70px] h-[70px] font-bold ${negocioAtivo === 'construtora'
                  ? 'bg-[#6666FF] text-white border solid'
                  : 'bg-[#350973] text-gray-700'
                  }`}
              >

                <img src={construtora} />
              </button>
            }

            {dados.imobiliario.edificios[1].quantidade > 0 &&
              <button
                onClick={() => setNegocioAtivo('terraplanagem')}
                className={`p-2 rounded-xl w-[70px] h-[70px] font-bold ${negocioAtivo === 'terraplanagem'
                  ? 'bg-[#6666FF] text-white border solid'
                  : 'bg-[#350973] text-gray-700'
                  }`}
              >
                <img src={terraplanagem} />
              </button>
            }
          </div>
        </div>

        <div className="w-full mx-auto h-[calc(80vh-100px)]">
          {negocioAtivo === '' && <div className='flex items-center justify-center'>adquira algum ativo</div>}
          {negocioAtivo === 'plantacao' && <PlantacaoNegocio />}
          {negocioAtivo === 'acougue' && <AcougueNegocio />}
          {negocioAtivo === 'painel' && <PainelSolarNegocio />}
          {negocioAtivo === 'automóveis' && <FabricaVeiculosNegocio />}
          {negocioAtivo === 'smartphone' && <FabricaSmartphonesNegocio />}
          {negocioAtivo === 'construtora' && <ConstrutoraInfraestruturaNegocio />}
          {negocioAtivo === 'terraplanagem' && <TerraplagagemPavimentacaoNegocio />}
        </div>
      </div>
    </div>
  );
};

export default App;