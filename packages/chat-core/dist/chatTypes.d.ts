export type ChatRole = "user" | "assistant";
export type ChatRequestMessage = {
    id: string;
    role: ChatRole;
    content: string;
};
export type ChatHistoryMessage = {
    id: string;
    content: string;
    role: ChatRole;
    sessionId: string;
    timestamp: Date;
};
//# sourceMappingURL=chatTypes.d.ts.map