import { HistoryMessage } from "../types/userChatBox";
import { ChatRequestMessage } from "./chatTypes";

export type OutboundMessage = Omit<HistoryMessage, "timestamp" | "sessionId">;

export const toChatRequestMessages = (messages: OutboundMessage[]): ChatRequestMessage[] => {
  return messages.map((message) => ({
    id: message.id,
    role: message.role,
    content: message.content,
  }));
};

export const createUserMessage = (sessionId: string, content: string): HistoryMessage => {
  return {
    sessionId,
    id: `msg_${Date.now().toString()}`,
    content,
    role: "user",
    timestamp: new Date(),
  };
};

export const createAssistantMessage = (sessionId: string, content: string): HistoryMessage => {
  return {
    sessionId,
    id: (Date.now() + 1).toString(),
    content,
    role: "assistant",
    timestamp: new Date(),
  };
};

export const createAssistantErrorMessage = (sessionId: string): HistoryMessage => {
  return {
    sessionId,
    id: (Date.now() + 2).toString(),
    content: "⚠️ 서버 응답에 문제가 있습니다. 잠시 후 다시 시도해주세요.",
    role: "assistant",
    timestamp: new Date(),
  };
};
