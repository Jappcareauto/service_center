/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useChatService.ts
import { Client, IMessage } from "@stomp/stompjs"; // Note the change here
import { useCallback, useRef, useState } from "react";
import SockJS from "sockjs-client";

interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  chatId: string;
  timestamp: string;
  type: string;
  mediaUrls: any[];
}

interface UseChatServiceProps {
  chatId: string;
  token: string;
  onMessageReceived?: (message: ChatMessage) => void;
  onDeliveryUpdate?: (update: any) => void;
}

export const useChatService = ({
  chatId,
  token,
  onMessageReceived,
  onDeliveryUpdate,
}: UseChatServiceProps) => {
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const stompClient = useRef<Client | null>(null);

  const connect = useCallback(() => {
    if (!token || !chatId) {
      setError("Token and chatId are required");
      return;
    }
    if (stompClient.current?.active) {
      return;
    }
    setLoading(true);

    const client = new Client({
      webSocketFactory: () => new SockJS(`https://bpi.jappcare.com/ws`),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (str) => {
        if (process.env.NODE_ENV !== "development") return;
        console.log(str);
      },
      reconnectDelay: 3000, // auto reconnect
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
    });

    client.onConnect = () => {
      setConnected(true);
      setError(null);
      setLoading(false);

      // Subscribe to chat messages
      client.subscribe(`/topic/chat/${chatId}`, (message: IMessage) => {
        const body = JSON.parse(message.body);
        onMessageReceived?.(body);
      });

      // Subscribe to delivery updates
      client.subscribe(
        `/topic/chat/${chatId}/delivery`,
        (message: IMessage) => {
          const body = JSON.parse(message.body);
          onDeliveryUpdate?.(body);
        }
      );
    };

    client.onStompError = (frame) => {
      setError(`Broker reported error: ${frame.headers["message"]}`);
      setConnected(false);
      setLoading(false);
    };

    client.activate();
    stompClient.current = client;
  }, [chatId, token, onMessageReceived, onDeliveryUpdate]);

  const disconnect = useCallback(() => {
    if (stompClient.current) {
      stompClient.current.deactivate();
      setConnected(false);
      setLoading(false);
    }
  }, []);

  const sendMessage = useCallback(
    (
      content: string,
      senderId: string,
      type: string = "TEXT",
      fileIds: string[] = []
    ) => {
      if (!stompClient.current?.connected) {
        setError("Not connected to WebSocket");
        return false;
      }

      const payload = { senderId, content, type, fileIds };

      stompClient.current.publish({
        destination: `/app/chat/${chatId}/sendMessage`,
        body: JSON.stringify(payload),
        headers: { "content-type": "application/json" },
      });

      return true;
    },
    [chatId]
  );

  const markAsDelivered = useCallback(
    (messageId: string, userId: string, deviceId?: string) => {
      if (!stompClient.current?.connected) return;

      stompClient.current.publish({
        destination: `/app/chat/${chatId}/message/${messageId}/delivered`,
        body: JSON.stringify({ userId, deviceId }),
        headers: { "content-type": "application/json" },
      });
    },
    [chatId]
  );

  // Mark message as read
  const markAsRead = useCallback(
    (messageId: string, userId: string, deviceId?: string) => {
      if (!stompClient.current?.connected) {
        console.warn("Cannot mark as read: STOMP client is not connected");
        return;
      }

      stompClient.current.publish({
        destination: `/app/chat/${chatId}/message/${messageId}/read`,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ userId, deviceId }),
      });
    },
    [chatId]
  );

  return {
    connected,
    error,
    connect,
    disconnect,
    sendMessage,
    markAsDelivered,
    markAsRead,
    loading,
  };
};
