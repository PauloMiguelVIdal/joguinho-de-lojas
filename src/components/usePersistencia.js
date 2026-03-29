
const KEYS = {
    game:     "econoGame_gameState",
    central:  "econoGame_centralDados",
    economy:  "econoGame_economy",
    pipelines:"econoGame_pipelines",
};

// ─── Helpers seguros ──────────────────────────────────────────────────────────

function safeParse(raw, fallback = null) {
    // Proteção contra null, undefined, "undefined", strings inválidas
    if (raw == null || raw === "undefined" || raw === "null" || raw === "") return fallback;
    try {
        return JSON.parse(raw);
    } catch (e) {
        console.warn("[Persistencia] JSON.parse falhou para:", raw?.slice?.(0, 60), e.message);
        return fallback;
    }
}

function safeStringify(value) {
    // Nunca salva undefined — usa null como fallback
    if (value === undefined) return null;
    try {
        return JSON.stringify(value);
    } catch (e) {
        console.warn("[Persistencia] JSON.stringify falhou:", e.message);
        return null;
    }
}

function safeGet(key) {
    try {
        return localStorage.getItem(key);
    } catch (e) {
        console.warn("[Persistencia] localStorage.getItem falhou:", key, e.message);
        return null;
    }
}

function safeSet(key, value) {
    const str = safeStringify(value);
    if (str == null) {
        console.warn("[Persistencia] Ignorando save inválido para:", key);
        return false;
    }
    try {
        localStorage.setItem(key, str);
        return true;
    } catch (e) {
        console.warn("[Persistencia] localStorage.setItem falhou:", key, e.message);
        return false;
    }
}

function safeRemove(key) {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.warn("[Persistencia] localStorage.removeItem falhou:", key, e.message);
    }
}

// ─── API pública ──────────────────────────────────────────────────────────────

/**
 * Salva o estado completo do jogo.
 * Todos os parâmetros são opcionais — só salva o que for fornecido.
 */
export function salvarNoStorage(gameState, centralState, economyState, pipelinesState) {
    if (gameState  !== undefined) safeSet(KEYS.game,      gameState);
    if (centralState !== undefined) safeSet(KEYS.central,  centralState);
    if (economyState !== undefined) safeSet(KEYS.economy,  economyState);
    if (pipelinesState !== undefined) safeSet(KEYS.pipelines, pipelinesState);

    console.log("[Persistencia] Estado salvo:", {
        game:      gameState !== undefined,
        central:   centralState !== undefined,
        economy:   economyState !== undefined,
        pipelines: pipelinesState !== undefined,
    });
}

/**
 * Carrega o estado salvo.
 * Retorna null para cada campo que não existir ou estiver corrompido.
 */
export function carregarSalvo() {
    const game      = safeParse(safeGet(KEYS.game),      null);
    const central   = safeParse(safeGet(KEYS.central),   null);
    const economy   = safeParse(safeGet(KEYS.economy),   null);
    const pipelines = safeParse(safeGet(KEYS.pipelines), null);

    const temSave = game !== null || central !== null || economy !== null;

    if (!temSave) {
        console.log("[Persistencia] Nenhum save encontrado — iniciando novo jogo");
    } else {
        console.log("[Persistencia] Save carregado:", {
            game:      game !== null,
            central:   central !== null,
            economy:   economy !== null,
            pipelines: pipelines !== null,
        });
    }

    return { game, central, economy, pipelines };
}

/**
 * Verifica se existe um save.
 */
export function temSaveExistente() {
    const raw = safeGet(KEYS.game);
    return raw != null && raw !== "undefined" && raw !== "null" && raw !== "";
}

/**
 * Limpa todos os dados salvos.
 * PRESERVADO — usado em interface.jsx linha 11.
 */
export function limparSalvo() {
    Object.values(KEYS).forEach(safeRemove);
    console.log("[Persistencia] Save limpo.");
}

/**
 * Limpa apenas os pipelines (útil para reset de automações sem perder o jogo).
 */
export function limparPipelines() {
    safeRemove(KEYS.pipelines);
    console.log("[Persistencia] Pipelines limpos.");
}