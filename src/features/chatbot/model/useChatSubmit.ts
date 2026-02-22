import { Dispatch, KeyboardEvent, SetStateAction, useCallback } from "react";
import {
  createAssistantErrorMessage,
  createAssistantMessage,
  createUserMessage,
} from "../core";
import { HistoryMessage } from "../types/userChatBox";

type UseChatSubmitParams = {
  input: string;
  isLoading: boolean;
  sessionId: string | null;
  setInput: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setMessage: Dispatch<SetStateAction<HistoryMessage[]>>;
  sendChat: (
    messages: Omit<HistoryMessage, "timestamp" | "sessionId">[],
    sessionId: string,
  ) => Promise<string>;
};

export const useChatSubmit = ({
  input,
  isLoading,
  sessionId,
  setInput,
  setIsLoading,
  setMessage,
  sendChat,
}: UseChatSubmitParams) => {
  const handleSubmit = useCallback(async () => {
    if (!input.trim() || isLoading || !sessionId) {
      return;
    }

    const userMessage = createUserMessage(sessionId, input);

    setMessage((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const reply = await sendChat(
        [{ role: "user", content: userMessage.content, id: userMessage.id }],
        sessionId,
      );

      const assistantMessage = createAssistantMessage(sessionId, reply || "응답이 없습니다 😅");
      setMessage((prev) => [...prev, assistantMessage]);
    } catch (_error) {
      const errorMessage = createAssistantErrorMessage(sessionId);
      setMessage((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, sendChat, sessionId, setInput, setIsLoading, setMessage]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        void handleSubmit();
      }
    },
    [handleSubmit],
  );

  return { handleSubmit, handleKeyDown };
};
