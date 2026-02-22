import { ChatRequestMessage } from "@property/chat-core";

export type ChatRequest = {
  messages: ChatRequestMessage[];
  promptType: string;
};

export type ChatResponse = {
  message: string;
  thread_id: string;
};

export interface ChatGateway {
  send(request: ChatRequest): Promise<ChatResponse>;
}
