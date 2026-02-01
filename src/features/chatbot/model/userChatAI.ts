import { useState } from "react";
import { HistoryMessage } from "../types/userChatBox";
import { detectPromptType, PROMPT_RULES } from "./promptRule";
import { useMessageBoxStore, useSessionIdStore } from "./promptStore";

export const useChatAI = () => {
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

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages,
          promptType: promptRule,
        }),
      });

      if (!res.ok) throw new Error("요청 실패");

      const data = await res.json();

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
