export interface SessionGateway {
  getSessionId(): string | null;
  setSessionId(sessionId: string): void;
  getOrCreateSessionId(): string;
}
