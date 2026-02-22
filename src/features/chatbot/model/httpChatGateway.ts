import { ChatGateway, ChatRequest, ChatResponse } from "./chatGateway";

export class HttpChatGateway implements ChatGateway {
  async send(request: ChatRequest): Promise<ChatResponse> {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    if (!res.ok) {
      throw new Error("요청 실패");
    }

    return res.json();
  }
}
