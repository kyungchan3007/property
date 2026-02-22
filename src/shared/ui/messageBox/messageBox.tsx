import { useMessageBoxStore } from "@/src/features/chatbot/model";

export const MessageBox = () => {
  const { sessions } = useMessageBoxStore();
  const currentTime = new Date().toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="space-y-5 pr-4">
      {Object.entries(sessions).map(([sessionId, history]) => (
        <div key={sessionId} className="bg-white border border-gray-100 rounded-3xl p-4 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 flex items-center gap-2">
            <span>Pingu</span>
            <span className="text-[11px] text-gray-300 normal-case">{currentTime}</span>
          </div>
          <div className="mt-3 space-y-2">
            {history.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`inline-block max-w-xs px-4 py-2 rounded-2xl text-sm font-medium ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white rounded-br-sm"
                      : "bg-gray-100 text-gray-800 rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
