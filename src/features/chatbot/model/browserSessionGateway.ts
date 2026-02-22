import { SessionGateway } from "./sessionGateway";

export class BrowserSessionGateway implements SessionGateway {
  constructor(private readonly storageKey = "chatSessionId") {}

  getSessionId(): string | null {
    return localStorage.getItem(this.storageKey);
  }

  setSessionId(sessionId: string): void {
    localStorage.setItem(this.storageKey, sessionId);
  }

  getOrCreateSessionId(): string {
    const existingId = this.getSessionId();
    if (existingId) {
      return existingId;
    }

    const newId = crypto.randomUUID();
    this.setSessionId(newId);
    return newId;
  }
}
