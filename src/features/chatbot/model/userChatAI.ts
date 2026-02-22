import { useState } from "react";
import { resolvePromptRule, toChatRequestMessages } from "../core";
import { HistoryMessage } from "../types/userChatBox";
import { useMessageBoxStore } from "./promptStore";
import { ChatGateway } from "./chatGateway";

export const useChatAI = (gateway: ChatGateway) => {
  const [isGptLoading, setIsGptLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addMessage } = useMessageBoxStore();

  const sendChat = async (
    messages: Omit<HistoryMessage, "timestamp" | "sessionId">[],
    sessionId: string,
  ) => {
    const lastMessage = messages.findLast((m) => m.role === "user");
    const userContent = lastMessage?.content || "";
    const promptRule = resolvePromptRule(userContent);

    try {
      setIsGptLoading(true);
      setError(null);

      const data = await gateway.send({
        messages: toChatRequestMessages(messages),
        promptType: promptRule,
      });

      addMessage(sessionId, {
        sessionId,
        id: data.thread_id,
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      });

      return data.message;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsGptLoading(false);
    }
  };

  return { sendChat, isGptLoading, error };
};
