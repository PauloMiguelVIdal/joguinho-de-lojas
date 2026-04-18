
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
    let   central   = safeParse(safeGet(KEYS.central),   null);
    const economy   = safeParse(safeGet(KEYS.economy),   null);
    const pipelines = safeParse(safeGet(KEYS.pipelines), null);

    // ── Migração de saves antigos ────────────────────────────
    if (central) {
        // edificiosFinais: corrige estrutura velha (array direto → { edificios: [] })
        // e completa índices faltando
        if (central.edificiosFinais) {
            const { EDIFICIOS_FINAIS_DINAMICOS_INICIAL } = require('./useCentralStore');
            
            for (const setor of Object.keys(EDIFICIOS_FINAIS_DINAMICOS_INICIAL)) {
                const inicial    = EDIFICIOS_FINAIS_DINAMICOS_INICIAL[setor].edificios;
                const salvoSetor = central.edificiosFinais[setor];

                // Estrutura velha era array direto
                if (Array.isArray(salvoSetor)) {
                    central.edificiosFinais[setor] = { edificios: salvoSetor };
                }

                // Se não existe de jeito nenhum, inicializa
                if (!central.edificiosFinais[setor]?.edificios) {
                    central.edificiosFinais[setor] = { edificios: [...inicial] };
                }

                // Completa índices faltando
                const atual = central.edificiosFinais[setor].edificios;
                if (atual.length < inicial.length) {
                    central.edificiosFinais[setor].edificios = [
                        ...atual,
                        ...inicial.slice(atual.length),
                    ];
                }
            }
        }

        // licençasStatus: completa arrays menores que o inicial
        if (central.licençasStatus) {
            const { LICENCAS_STATUS_INICIAL } = require('./useCentralStore');

            for (const setor of Object.keys(LICENCAS_STATUS_INICIAL)) {
                const inicial = LICENCAS_STATUS_INICIAL[setor];
                if (!central.licençasStatus[setor]) {
                    central.licençasStatus[setor] = [...inicial];
                } else if (central.licençasStatus[setor].length < inicial.length) {
                    central.licençasStatus[setor] = [
                        ...central.licençasStatus[setor],
                        ...inicial.slice(central.licençasStatus[setor].length),
                    ];
                }
            }
        }
    }
    // ────────────────────────────────────────────────────────

    const temSave = game !== null || central !== null || economy !== null;
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