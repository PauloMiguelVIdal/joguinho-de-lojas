const KEYS = {
  game: "econoGame_gameContext",
  central: "econoGame_centralDados",
  economy: "econoGame_economyGlobal",
};

// ← função normal, não hook
export function salvarNoStorage(gameState, centralState, economyState) {
  try {
    localStorage.setItem(KEYS.game, JSON.stringify(gameState));
    localStorage.setItem(KEYS.central, JSON.stringify(centralState));
    localStorage.setItem(KEYS.economy, JSON.stringify(economyState));
  } catch (e) {
    console.warn("Erro ao salvar:", e);
  }
}

export function carregarSalvo() {
  try {
    return {
      game: JSON.parse(localStorage.getItem(KEYS.game)) ?? null,
      central: JSON.parse(localStorage.getItem(KEYS.central)) ?? null,
      economy: JSON.parse(localStorage.getItem(KEYS.economy)) ?? null,
    };
  } catch (e) {
    console.warn("Erro ao carregar:", e);
    return { game: null, central: null, economy: null };
  }
}

export function limparSalvo() {
  Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
}