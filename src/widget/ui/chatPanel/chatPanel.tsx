"use client";
import { useState, useRef, useEffect } from "react";
import { Bot } from "lucide-react";
import { Header } from "@/src/features/header";
import { ChatHistory, SumitButton } from "@/src/features/chatbot";
import { HistoryMessage } from "@/src/features/chatbot/types/userChatBox/userChatBot";
import { MessageBox } from "@/src/shared/ui/messageBox";
import { useSessionIdStore } from "@/src/features/chatbot/model";

export default function ChatbotUI() {
  const { sessionId, setSessionId } = useSessionIdStore();
  const [messages, setMessages] = useState<HistoryMessage[]>([
    {
      sessionId: sessionId ?? "",
      id: "1",
      content: "안녕하세요!\n무엇을 도와드릴까요? 😊",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    const existingId = localStorage.getItem("chatSessionId");
    if (existingId) {
      setSessionId(existingId);
    } else {
      const newId = crypto.randomUUID();
      localStorage.setItem("chatSessionId", newId);
      setSessionId(newId);
    }
  }, [messages, setSessionId]);

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="flex-1 overflow-y-auto px-5 py-6 bg-gray-50">
        <div className="flex justify-center">
          <div className="w-screen">
            <MessageBox />
          </div>
          <div className="w-screen">
            <div className="flex-1 max-w-3xl mx-auto space-y-4">
              {messages.map((message) => (
                <ChatHistory key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div className="bg-white px-4 py-3 rounded-3xl rounded-tl-lg border border-gray-200">
                    <div className="flex gap-1">
                      <span
                        className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="w-screen">
            <MessageBox />
          </div>
        </div>
      </div>
      <SumitButton
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setMessage={setMessages}
      />
    </div>
  );
}
