/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ChatRoom.tsx
import { useGetChatroomByAppointmentQuery } from "@/redux/api";
import React, { useEffect, useState } from "react";
import {
  connectStomp,
  disconnectStomp,
  sendMessage,
  subscribeToChatroom,
} from "../../utils/stompClient";

interface ChatRoomProps {
  appointmentId: string;
  userId: string;
}

const Chatroom: React.FC<ChatRoomProps> = ({ appointmentId, userId }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState<string>("");
  const { data } = useGetChatroomByAppointmentQuery(appointmentId, {
    skip: !appointmentId,
  });

  useEffect(() => {
    if (!data?.data?.id) return;
    connectStomp(() => {
      subscribeToChatroom(data?.data?.id, (msg: any) => {
        console.log("Received message:", msg);
        setMessages((prev) => [...prev, msg]);
      });
    });

    return () => {
      disconnectStomp();
    };
  }, [data]);

  const handleSend = () => {
    if (!input.trim() || !data?.data?.id) return;

    const messageObj: any = {
      senderId: userId,
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };
console.log("Sending message:", messageObj);
    sendMessage(data?.data?.id, messageObj);
    setMessages((prev) => [...prev, messageObj]);
    setInput("");
  };

  return (
    <div className="chat-container">
      <div
        className="messages"
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: "8px" }}>
            <strong>{msg.senderId === userId ? "You" : "Other"}:</strong>{" "}
            {msg.content}
          </div>
        ))}
      </div>
      <div className="input-section" style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ width: "80%" }}
        />
        <button onClick={handleSend} style={{ width: "18%", marginLeft: "2%" }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatroom;
