import { useState } from "react";
import { HistoryMessage } from "./userChatBot";
import { detectPromptType, PROMPT_RULES } from "./promptRule";

export const useChatAI = () => {
  const [isGptLoading, setIsGptLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendChat = async (messages: HistoryMessage[]) => {
    const lastMessage = messages.filter((m) => m.role === "user").slice(-1)[0];
    const userContent = lastMessage?.content || "";
    const promptRuleString = detectPromptType(userContent);
    const prompotRule = PROMPT_RULES[promptRuleString];

    try {
      setIsGptLoading(true);
      setError(null);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, promptType: prompotRule }),
      });

      if (!res.ok) throw new Error("GPT 요청 실패");
      const data = await res.json();
      console.log(data);
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
