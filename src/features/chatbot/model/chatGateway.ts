export type ChatRole = "user" | "assistant";

export type ChatRequestMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

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
