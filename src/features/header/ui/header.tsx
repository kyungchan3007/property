import { Bot } from "lucide-react";

export const Header = () => {
  return (
    <div className="bg-white px-5 py-4 border-b border-gray-100">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-500 rounded-2xl flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">부동산 봇</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
