import Image from "next/image";
import { User } from "lucide-react";
import { HistoryMessageProps } from "../types/userChatBox/userChatBot";
import pinguImage from "@/src/assets/image/pingu.jpeg";
import pinga from "@/src/assets/image/pinga.jpeg";

export const ChatHistory = ({ message }: HistoryMessageProps) => {
  return (
    <div
      key={message.id}
      className={`flex gap-2 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
    >
      <div className="flex-shrink-0 mt-1">
        {message.role === "user" ? (
          <div className="w-7 h-7 rounded-full flex items-center justify-center bg-gray-800">
            <User className="w-4 h-4 text-white" strokeWidth={2.5} />
            <Image
              src={pinga}
              alt="핑구 어시스턴트"
              width={28}
              height={28}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        ) : (
          <div className="w-7 h-7 rounded-full overflow-hidden bg-blue-100">
            <Image
              src={pinguImage}
              alt="핑구 어시스턴트"
              width={28}
              height={28}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        )}
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
