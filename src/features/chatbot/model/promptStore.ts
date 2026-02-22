import { create } from "zustand";
import { MessageSessionId, MessageStore } from "../types/userChatBox";

export const useMessageBoxStore = create<MessageStore>((set) => ({
  sessions: {},
  addMessage: (sessionId, msg) =>
    set((state) => {
      const existing = state.sessions[sessionId] || [];
      return {
        sessions: {
          ...state.sessions,
          [sessionId]: [...existing, msg],
        },
      };
    }),

  resetSession: (sessionId) =>
    set((state) => {
      const newSessions = { ...state.sessions };
      delete newSessions[sessionId];
      return { sessions: newSessions };
    }),

  resetAll: () => set({ sessions: {} }),
}));

export const useSessionIdStore = create<MessageSessionId>((set) => ({
  sessionId: null,
  setSessionId: (id) => set({ sessionId: id }),
  clearSessionId: () => set({ sessionId: null }),
}));
