import { useMessageBoxStore } from "@/src/features/chatbot/model";

export const MessageBox = () => {
  const { sessions } = useMessageBoxStore();
  console.log(sessions);
  // console.log(message);
  return (
    <div>
      {Object.keys(sessions).map((item) => (
        <>
          <div>{item}</div>
          <div>
            {sessions[item].map((item) => (
              <div key={item.id}>{item.content}</div>
            ))}
          </div>
        </>
      ))}
    </div>
  );
};
