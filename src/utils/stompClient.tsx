/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/stompClient.ts
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export interface ChatMessage {
  senderId: string;
  content: string;
  timestamp: string;
}

let stompClient: Client | null = null;

// const socketUrl = 'http://localhost:8080/ws'
const socketUrl = 'https://bpi.jappcare.com/ws';
export const connectStomp = (
  onConnected: () => void,
  onError?: (err: any) => void
): Client => {
  const client = new Client({
    webSocketFactory: () => new SockJS(socketUrl),
    reconnectDelay: 5000,
    onConnect: () => {
      console.log("Connected to WebSocket");
      onConnected();
    },
    onStompError: (frame) => {
      console.error("STOMP Error", frame);
      onError?.(frame);
    },
  });

  client.activate();
  stompClient = client;

  return client;
};

export const subscribeToChatroom = (
  chatroomId: string,
  onMessageReceived: (message: ChatMessage) => void
) => {
  if (stompClient?.connected) {
    stompClient.subscribe(
      `/chat/chatroom/${chatroomId}`,
      (message: IMessage) => {
        const body: ChatMessage = JSON.parse(message.body);
        onMessageReceived(body);
      }
    );
  }
};

export const sendMessage = (chatroomId: string, message: ChatMessage) => {
  if (stompClient?.connected) {
    console.log("Sending message:", message);
    stompClient.publish({
      destination: `/chat/chatroom/${chatroomId}`,
      body: JSON.stringify(message),
    });
  }
};

export const disconnectStomp = () => {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
  }
};
