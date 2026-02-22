export type ChatRole = "user" | "assistant";

export type ChatRequestMessage = {
  id: string;
  role: ChatRole;
  content: string;
};
