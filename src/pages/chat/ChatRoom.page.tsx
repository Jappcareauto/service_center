/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ChatRoom.tsx
import { useChatService } from "@/hooks/useChatService";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useGetChatroomMessagesQuery,
  useGetUserChatRoomsQuery
} from "@/redux/api";
import { setChatroomId } from "@/redux/features/chat/chatSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useCallback, useEffect, useState } from "react";

const ChatRoom = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { user, accessToken } = useAppSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useAppDispatch();
  const { chatroomId } = useAppSelector((state: RootState) => state.chat);
  const { data: chatroomMessages, isLoading } = useGetChatroomMessagesQuery(
    chatroomId as string,
    {
      skip: !chatroomId,
    }
  );
  const { data: chatrooms } = useGetUserChatRoomsQuery(user?.id, {
    skip: !user?.id,
  });

  const handleMessageReceived = useCallback((message: any) => {
    setMessages((prev) => [...prev, message]);
  }, []);
  
  const { connected, error, connect, disconnect, sendMessage, markAsRead } =
    useChatService({
      chatId: chatroomId,
      token: accessToken,
      onMessageReceived: handleMessageReceived,
    });
  useEffect(() => {
    if (chatroomMessages?.data) {
      setMessages(chatroomMessages.data || []);
    }
    connect();

    return () => {
      disconnect();
    };
  }, [chatroomId, accessToken, connect, disconnect, chatroomMessages]);

  // Send message handler
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const success = sendMessage(newMessage, user?.id, "TEXT");
    if (success) {
      setNewMessage("");
    }
  };

  // Mark messages as read when viewed
  useEffect(() => {
    messages.forEach((msg) => {
      if (msg.senderId !== user?.id) {
        markAsRead(msg.id, user?.id);
      }
    });
  }, [messages, user?.id, markAsRead]);

  if (isLoading) return <div>Loading messages...</div>;

  return (
    <DashboardLayout showBack={false}>
      <div className="chat-room">
        {/* Connection Status */}
        <div className={`status ${connected ? "connected" : "disconnected"}`}>
          {connected ? "🟢 Connected" : "🔴 Disconnected"}
          {error && <span className="error">{error}</span>}
        </div>

        {/* Messages List */}
        <div className="messages-container">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${
                msg.senderId === user?.id ? "sent" : "received"
              }`}
            >
              <div className="content">{msg.content}</div>
              <div className="timestamp">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="message-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage} disabled={!connected}>
            Send
          </button>
        </div>
        {/* create chatrooms list */}
        <div className="mt-4 bg-red-500 p-2">
          {chatrooms?.data?.map((chatroom) => (
            <div
              key={chatroom.id}
              onClick={() => dispatch(setChatroomId(chatroom?.id))}
            >
              <h3>{chatroom?.id}</h3>
              {/* <h3>{chatroom?.name ?? chatroom?.id}</h3> */}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChatRoom;
