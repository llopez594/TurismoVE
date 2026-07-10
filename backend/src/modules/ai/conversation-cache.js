import { randomUUID } from "node:crypto";
import NodeCache from "node-cache";

const CONVERSATION_TTL_SECONDS = 30 * 60;
const MAX_HISTORY_MESSAGES = 8;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const MAX_RECOMMENDED_IDS = 40;

const conversationCache = new NodeCache({
    stdTTL: CONVERSATION_TTL_SECONDS,
    checkperiod: 5 * 60,
    useClones: true
});

export function resolveConversationId(value) {
    if (typeof value === "string" && UUID_PATTERN.test(value)) {
        return value;
    }

    return randomUUID();
}

export function getConversationState(conversationId) {
    return conversationCache.get(conversationId) ?? {
        messages: [],
        recommendedPlaceIds: [],
        lastSearch: null
    };
}

export function saveConversationState(conversationId, state) {
    conversationCache.set(conversationId, {
        messages: state.messages.slice(-MAX_HISTORY_MESSAGES),
        recommendedPlaceIds: [...new Set(state.recommendedPlaceIds)]
            .slice(-MAX_RECOMMENDED_IDS),
        lastSearch: state.lastSearch ?? null
    });
}
