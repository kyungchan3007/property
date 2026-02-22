import { Send } from "lucide-react";
import { useMemo } from "react";

import {
  HttpChatGateway,
  useChatAI,
  useChatSubmit,
  useSessionIdStore,
} from "../model";
import { MessageSumitButtonPros } from "../types/userChatBox";

export const SumitButton = ({
  input,
  setInput,
  isLoading,
  setMessage,
  setIsLoading,
}: MessageSumitButtonPros) => {
  const gateway = useMemo(() => new HttpChatGateway(), []);
  const { sendChat } = useChatAI(gateway);
  const { sessionId } = useSessionIdStore();
  const { handleKeyDown, handleSubmit } = useChatSubmit({
    input,
    isLoading,
    sessionId,
    setInput,
    setIsLoading,
    setMessage,
    sendChat,
  });

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
            onClick={() => void handleSubmit()}
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
