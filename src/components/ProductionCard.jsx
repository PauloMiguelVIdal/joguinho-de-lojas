import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useGame } from "../components/GameContext";

export default function ProductionCard({ formula }) {
  const { stock, startProduction } = useGame();
  const [quantidade, setQuantidade] = useState(1);

  // Calcular máximo possível
  const calcularMaximo = () => {
    const limites = Object.entries(formula.input).map(
      ([produto, qtd]) => Math.floor((stock[produto] || 0) / qtd)
    );
    return Math.max(0, Math.min(...limites, 1000000000000000000000000));
  };

  const maximo = calcularMaximo();
  const podeIniciar = maximo >= quantidade;

  // Ajustar quantidade
  const ajustarQuantidade = (operacao) => {
    if (operacao === 'aumentar' && quantidade < maximo) {
      setQuantidade(quantidade + 1);
    } else if (operacao === 'diminuir' && quantidade > 1) {
      setQuantidade(quantidade - 1);
    } else if (operacao === 'max') {
      setQuantidade(maximo);
    }
  };

  function iniciar() {
    if (!podeIniciar) return;
    startProduction({
      formula,
      quantidade,
    });
    setQuantidade(1); // Reset após iniciar
  }

  // Obter emoji/ícone baseado no tipo de produção
  const getIcone = () => {
    if (formula.id.includes('reproducao')) return '🐄';
    if (formula.id.includes('abate')) return '🥩';
    return '⚙️';
  };

  // Obter cor baseada no tipo
  const getCor = () => {
    if (formula.id.includes('reproducao')) return '#CD853F';
    if (formula.id.includes('abate')) return '#DC2626';
    return '#3B82F6';
  };

  // Formatar nome do produto para exibição
  const formatarNome = (produto) => {
    const nomes = {
      vaca: 'Vaca',
      racaoDeVacas: 'Ração',
      couro: 'Couro',
      carneBovina: 'Carne Bovina'
    };
    return nomes[produto] || produto;
  };

  // Obter emoji do produto
  const getEmojiProduto = (produto) => {
    const emojis = {
      vaca: '🐄',
      racaoDeVacas: '🌾',
      couro: '🦌',
      carneBovina: '🥩'
    };
    return emojis[produto] || '📦';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        {getIcone()} {formula.nome}
      </h3>

      {/* Fórmula Visual */}
      <div 
        className="border-2 rounded-lg p-3 mb-4"
        style={{
          backgroundColor: `${getCor()}15`,
          borderColor: `${getCor()}40`
        }}
      >
        <p className="text-center text-sm font-semibold mb-1" style={{ color: getCor() }}>
          Fórmula
        </p>
        <p className="text-center text-gray-700 text-sm">
          {Object.entries(formula.input).map(([produto, qtd], idx, arr) => (
            <span key={produto}>
              <span className="font-bold">{qtd * quantidade} {formatarNome(produto)}</span>
              {idx < arr.length - 1 && ' + '}
            </span>
          ))}
          {' = '}
          {Object.entries(formula.output).map(([produto, qtd], idx, arr) => (
            <span key={produto}>
              <span className="font-bold text-green-600">
                {qtd * quantidade} {formatarNome(produto)}
              </span>
              {idx < arr.length - 1 && ' + '}
            </span>
          ))}
        </p>
      </div>

      {/* Seletor de Quantidade */}
      <div className="mb-4">
        <div className="flex items-center justify-center gap-3 mb-3">
          <button
            onClick={() => ajustarQuantidade('diminuir')}
            disabled={quantidade <= 1}
            className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            <Minus size={18} />
          </button>

          <div className="text-center">
            <input
              type="number"
              value={quantidade}
              onChange={(e) => {
                const valor = parseInt(e.target.value) || 1;
                const valorLimitado = Math.max(1, Math.min(maximo, valor));
                setQuantidade(valorLimitado);
              }}
              onBlur={(e) => {
                if (!e.target.value || parseInt(e.target.value) < 1) {
                  setQuantidade(1);
                }
              }}
              className="w-24 text-4xl font-bold text-gray-800 text-center border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              min="1"
              max={maximo}
            />
            <div className="text-xs text-gray-500 mt-1">
              máx: {maximo}
            </div>
          </div>

          <button
            onClick={() => ajustarQuantidade('aumentar')}
            disabled={quantidade >= maximo}
            className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>

        <button
          onClick={() => ajustarQuantidade('max')}
          disabled={maximo === 0}
          className="w-full py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold rounded-lg transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Máximo ({maximo})
        </button>
      </div>

      {/* Detalhes de Recursos */}
      <div className="space-y-2 mb-4">
        {/* Necessário */}
        <div className="flex justify-between text-sm bg-red-50 p-2 rounded">
          <span>Necessário:</span>
          <span className="font-bold">
            {Object.entries(formula.input).map(([produto, qtd], idx, arr) => (
              <span key={produto}>
                {getEmojiProduto(produto)} {qtd * quantidade}
                {idx < arr.length - 1 && ' | '}
              </span>
            ))}
          </span>
        </div>

        {/* Estoque Disponível */}
        <div className="flex justify-between text-sm bg-gray-50 p-2 rounded">
          <span>Disponível:</span>
          <span className="font-bold text-gray-600">
            {Object.entries(formula.input).map(([produto], idx, arr) => (
              <span key={produto}>
                {getEmojiProduto(produto)} {stock[produto] || 0}
                {idx < arr.length - 1 && ' | '}
              </span>
            ))}
          </span>
        </div>

        {/* Receberá */}
        <div className="flex justify-between text-sm bg-green-50 p-2 rounded">
          <span>Receberá:</span>
          <span className="font-bold text-green-600">
            {Object.entries(formula.output).map(([produto, qtd], idx, arr) => (
              <span key={produto}>
                {getEmojiProduto(produto)} {qtd * quantidade}
                {idx < arr.length - 1 && ' | '}
              </span>
            ))}
          </span>
        </div>

        {/* Tempo */}
        <div className="text-center text-xs text-gray-500 pt-1">
          ⏱️ Tempo: {formula.duracao} dias
        </div>
      </div>

      {/* Botão de Ação */}
      <button
        onClick={iniciar}
        disabled={!podeIniciar}
        className="w-full py-3 rounded-lg font-bold text-white transition-colors"
        style={{
          backgroundColor: podeIniciar ? getCor() : '#6C757D',
          cursor: podeIniciar ? 'pointer' : 'not-allowed'
        }}
      >
        {maximo === 0 ? '❌ Recursos Insuficientes' : `${getIcone()} Iniciar Produção`}
      </button>
    </div>
  );
}