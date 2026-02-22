import { ChatHistoryMessage, ChatRequestMessage } from "./chatTypes";
export type OutboundMessage = Omit<ChatHistoryMessage, "timestamp" | "sessionId">;
export declare const toChatRequestMessages: (messages: OutboundMessage[]) => ChatRequestMessage[];
export declare const createUserMessage: (sessionId: string, content: string) => ChatHistoryMessage;
export declare const createAssistantMessage: (sessionId: string, content: string) => ChatHistoryMessage;
export declare const createAssistantErrorMessage: (sessionId: string) => ChatHistoryMessage;
//# sourceMappingURL=messages.d.ts.map