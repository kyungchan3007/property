import { useEffect } from "react";
import { useSessionIdStore } from "./promptStore";
import { SessionGateway } from "./sessionGateway";

export const useChatSession = (gateway: SessionGateway) => {
  const { sessionId, setSessionId } = useSessionIdStore();

  useEffect(() => {
    if (sessionId) {
      return;
    }
    setSessionId(gateway.getOrCreateSessionId());
  }, [gateway, sessionId, setSessionId]);

  return sessionId;
};
