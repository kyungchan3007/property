import { Send } from "lucide-react";
import { HistoryMessage, MessageSumitButtonPros } from "../model/userChatBot";
import { useChatAI } from "../model/userChatAI";

export const SumitButton = ({
  input,
  setInput,
  isLoading,
  setMessage,
  setIsLoading,
}: MessageSumitButtonPros) => {
  const { sendChat, isGptLoading, error } = useChatAI();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: HistoryMessage = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessage((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    try {
      const reply = await sendChat([
        { role: "user", content: input, id: userMessage.id, timestamp: new Date() },
      ]);

      const assistantMessage: HistoryMessage = {
        id: (Date.now() + 1).toString(),
        content: reply || "응답이 없습니다 😅",
        role: "assistant",
        timestamp: new Date(),
      };

      setMessage((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: HistoryMessage = {
        id: (Date.now() + 2).toString(),
        content: "⚠️ 서버 응답에 문제가 있습니다. 잠시 후 다시 시도해주세요.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessage((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-white border-t border-gray-100 px-5 py-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex gap-2 items-end">
          <div className="flex-1 bg-gray-50 rounded-3xl border border-gray-200 focus-within:border-blue-500 transition-colors">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="메시지를 입력해주세요"
              className="w-full px-5 py-3 bg-transparent focus:outline-none resize-none text-[15px] text-gray-900 placeholder-gray-400 font-medium"
              rows={1}
              style={{
                minHeight: "44px",
                maxHeight: "120px",
              }}
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading}
            className="w-11 h-11 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center flex-shrink-0"
          >
            <Send className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};
