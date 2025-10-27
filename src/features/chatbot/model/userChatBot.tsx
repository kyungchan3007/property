import { Dispatch, SetStateAction } from "react";

type Role = "user" | "assistant";

interface Message {
  role: Role;
  content: string;
}

interface ChateState {
  messages: Message[];
  isLoading: Boolean;
  addMessage: (msg: Message) => void;
  reseChat: () => void;
  setLoading: (state: boolean) => void;
}

export interface HistoryMessage {
  id: string;
  content: string;
  role: Role;
  timestamp: Date;
}

export interface HistoryMessageProps {
  message: HistoryMessage;
}

export interface MessageSumitButtonPros {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setMessage: Dispatch<SetStateAction<HistoryMessage[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
