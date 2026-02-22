import { useState } from "react";
import { HistoryMessage } from "../types/userChatBox";
import { detectPromptType, PROMPT_RULES } from "./promptRule";
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
    const promptRuleString = detectPromptType(userContent);
    const promptRule = PROMPT_RULES[promptRuleString];

    try {
      setIsGptLoading(true);
      setError(null);

      const data = await gateway.send({
        messages: messages.map((m) => ({
          id: m.id,
          role: m.role,
          content: m.content,
        })),
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
