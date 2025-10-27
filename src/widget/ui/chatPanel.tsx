// "use client";
// import { useState } from "react";
// import { useUIStore } from "@/src/shared/store/ui.store";

// export function ChatPanel() {
//   const [q, setQ] = useState("");
//   const toggle = useUIStore((s) => s.toggleSidebar);

//   const handleMessage = async () => {
//     const res = await fetch("/api/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         messages: [
//           { role: "system", content: "You are a helpful assistant." },
//           { role: "user", content: "안녕! 지금 잘 작동하고 있니?" },
//         ],
//       }),
//     });
//     const data = await res.json();
//     console.log(data);
//   };

//   return (
//     <div className="flex items-center gap-2 w-full max-w-xl">
//       <input
//         value={q}
//         onChange={(e) => setQ(e.target.value)}
//         placeholder="지역, 매물명으로 검색"
//         className="flex-1 rounded border px-3 py-2"
//       />
//       <button onClick={handleMessage} className="rounded bg-black text-white px-3 py-2">
//         검색
//       </button>
//     </div>
//   );
// }

"use client";
import { useState, useRef, useEffect } from "react";
import { Bot } from "lucide-react";
import { Header } from "@/src/features/header";
import { ChatHistory, SumitButton } from "@/src/features/chatbot";
import { HistoryMessage } from "@/src/features/chatbot/model/userChatBot";

export default function ChatbotUI() {
  const [messages, setMessages] = useState<HistoryMessage[]>([
    {
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
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="flex-1 overflow-y-auto px-5 py-6 bg-gray-50">
        <div className="max-w-3xl mx-auto space-y-4">
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
