import { Dispatch, SetStateAction } from "react";

type Role = "user" | "assistant";

export interface HistoryMessage {
  id: string;
  content: string;
  role: Role;
  sessionId: string;
  timestamp: Date;
}

export interface HistoryMessageProps {
  message: HistoryMessage;
}

export interface MessageStore {
  sessions: Record<string, HistoryMessage[]>;
  addMessage: (sessionId: string, msg: HistoryMessage) => void;
  resetSession: (sessionId: string) => void;
  resetAll: () => void;
}

export interface MessageSessionId {
  sessionId: string | null;
  setSessionId: (sessionId: string) => void;
  clearSessionId: () => void;
}

export interface MessageSumitButtonPros {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setMessage: Dispatch<SetStateAction<HistoryMessage[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
