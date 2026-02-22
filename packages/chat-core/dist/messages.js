export const toChatRequestMessages = (messages) => {
    return messages.map((message) => ({
        id: message.id,
        role: message.role,
        content: message.content,
    }));
};
export const createUserMessage = (sessionId, content) => {
    return {
        sessionId,
        id: `msg_${Date.now().toString()}`,
        content,
        role: "user",
        timestamp: new Date(),
    };
};
export const createAssistantMessage = (sessionId, content) => {
    return {
        sessionId,
        id: (Date.now() + 1).toString(),
        content,
        role: "assistant",
        timestamp: new Date(),
    };
};
export const createAssistantErrorMessage = (sessionId) => {
    return {
        sessionId,
        id: (Date.now() + 2).toString(),
        content: "⚠️ 서버 응답에 문제가 있습니다. 잠시 후 다시 시도해주세요.",
        role: "assistant",
        timestamp: new Date(),
    };
};
//# sourceMappingURL=messages.js.map