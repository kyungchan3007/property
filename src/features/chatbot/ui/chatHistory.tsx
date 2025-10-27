import { Bot, User } from "lucide-react";
import { HistoryMessage, HistoryMessageProps } from "../model/userChatBot";

export const ChatHistory = ({ message }: HistoryMessageProps) => {
  return (
    <div
      key={message.id}
      className={`flex gap-2 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
    >
      <div className="flex-shrink-0 mt-1">
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center ${
            message.role === "user" ? "bg-gray-800" : "bg-blue-500"
          }`}
        >
          {message.role === "user" ? (
            <User className="w-4 h-4 text-white" strokeWidth={2.5} />
          ) : (
            <Bot className="w-4 h-4 text-white" strokeWidth={2.5} />
          )}
        </div>
      </div>

      <div
        className={`flex flex-col ${
          message.role === "user" ? "items-end" : "items-start"
        } max-w-xs sm:max-w-md`}
      >
        <div
          className={`px-4 py-3 ${
            message.role === "user"
              ? "bg-blue-500 text-white rounded-3xl rounded-tr-lg"
              : "bg-white text-gray-900 rounded-3xl rounded-tl-lg border border-gray-200"
          }`}
        >
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap font-medium">
            {message.content}
          </p>
        </div>
        <span className="text-xs text-gray-400 mt-1 px-1 font-medium">
          {message.timestamp.toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};
