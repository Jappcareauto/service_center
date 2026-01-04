# JapCare Chat System - Frontend Integration Guide

**Version:** 1.0  
**Last Updated:** December 19, 2025  
**Backend API Version:** v1

---

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [REST API Endpoints](#rest-api-endpoints)
4. [WebSocket Integration](#websocket-integration)
5. [Data Models](#data-models)
6. [React.js Integration](#reactjs-integration)
7. [Flutter Integration](#flutter-integration)
8. [Error Handling](#error-handling)
9. [Best Practices](#best-practices)

---

## Overview

The JapCare Chat System supports:
- **One-to-One Chat (Single)**: Private messaging between two users
- **Group Chat**: Multiple participants in a shared conversation
- **Real-time Messaging**: Via WebSocket/STOMP protocol
- **Message Types**: Text, images, videos, audio, files, and invoices
- **Delivery Tracking**: Sent, delivered, and read status

### Architecture

```
┌─────────────────┐     REST API      ┌─────────────────┐
│   Frontend      │ ←───────────────→ │   Backend       │
│  (React/Flutter)│                   │   (Spring Boot) │
│                 │     WebSocket     │                 │
│                 │ ←───────────────→ │                 │
└─────────────────┘    (STOMP/SockJS) └─────────────────┘
```

---

## Authentication

All API requests require a valid JWT token in the `Authorization` header.

### Header Format
```
Authorization: Bearer <your_jwt_token>
```

### WebSocket Authentication
For WebSocket connections, pass the token in STOMP headers during connection:
```javascript
{ Authorization: "Bearer <your_jwt_token>" }
```

---

## REST API Endpoints

**Base URL:** `https://bpi.jappcare.com` (Production)  
**Base URL:** `http://localhost:8555` (Development)

### Chat Room Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/chatroom` | Create a new chat room |
| GET | `/api/v1/chatroom/list` | List all chat rooms (paginated) |
| GET | `/api/v1/chatroom/{id}` | Get chat room by ID |
| GET | `/api/v1/chatroom/user/{userId}` | Get user's chat rooms |
| GET | `/api/v1/chatroom/participant/{participantId}` | Get participant's chat rooms |
| GET | `/api/v1/chatroom/appointment/{appointmentId}` | Get chat room by appointment |
| PUT | `/api/v1/chatroom/{id}` | Update chat room |
| DELETE | `/api/v1/chatroom/{id}` | Delete chat room |

### Message Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/chat/{chatId}/sendMessage/other` | Send message via REST |
| GET | `/api/v1/chat/message/chatroom/{chatRoomId}` | Get messages in chat room |
| DELETE | `/api/v1/chat/message/{messageId}` | Delete a message |

---

### 1. Create Chat Room

**POST** `/api/v1/chatroom`

**Request Body:**
```json
{
  "chatName": "Support Chat",
  "chatDescription": "Customer support conversation",
  "type": "SINGLE",
  "userIds": ["USR-xxx-001", "USR-xxx-002"],
  "creatorId": "USR-xxx-001",
  "appointmentId": "APT-xxx-001"
}
```

**Chat Types:**
- `SINGLE` - One-to-one chat (requires exactly 2 userIds)
- `GROUP` - Group chat (requires 2+ userIds)
- `BROADCAST` - Broadcast channel

**Response (201 Created):**
```json
{
  "meta": {
    "statusCode": 201,
    "statusDescription": "CREATED",
    "message": "Chat room created successfully."
  },
  "data": {
    "id": "SL-CHAT-20251219120000000-1A2B",
    "name": "Support Chat",
    "participantIds": ["USR-xxx-001", "USR-xxx-002"],
    "appointmentDTO": null,
    "createdAt": "2025-12-19T12:00:00",
    "updatedAt": "2025-12-19T12:00:00",
    "createdBy": "USR-xxx-001",
    "updatedBy": "USR-xxx-001"
  },
  "errors": null,
  "pagination": null
}
```

---

### 2. Get User's Chat Rooms

**GET** `/api/v1/chatroom/user/{userId}`

**Response (200 OK):**
```json
{
  "meta": {
    "statusCode": 200,
    "statusDescription": "OK",
    "message": "User chat rooms retrieved successfully."
  },
  "data": [
    {
      "id": "SL-CHAT-20251219120000000-1A2B",
      "name": "Support Chat",
      "participantIds": ["USR-xxx-001", "USR-xxx-002"],
      "appointmentDTO": null,
      "createdAt": "2025-12-19T12:00:00",
      "updatedAt": "2025-12-19T12:00:00"
    }
  ],
  "errors": null,
  "pagination": null
}
```

---

### 3. Send Message (REST API)

**POST** `/api/v1/chat/{chatId}/sendMessage/other`

**Request Body:**
```json
{
  "senderId": "USR-xxx-001",
  "content": "Hello, how can I help you?",
  "chatId": "SL-CHAT-20251219120000000-1A2B",
  "type": "TEXT",
  "fileIds": []
}
```

**Message Types:**
| Type | Description |
|------|-------------|
| `TEXT` | Plain text message |
| `TEXT_AND_OTHERS` | Text with file attachments |
| `IMAGE` | Image message |
| `VIDEO` | Video message |
| `AUDIO` | Audio message |
| `FILE` | File attachment |
| `INVOICE` | Invoice reference |
| `TEXT_INVOICE` | Text with invoice reference |

**Response (201 Created):**
```json
{
  "meta": {
    "statusCode": 201,
    "statusDescription": "CREATED",
    "message": "Message sent successfully."
  },
  "data": {
    "id": "MSG-20251219120000000-ABC1",
    "senderId": "USR-xxx-001",
    "content": "Hello, how can I help you?",
    "chatId": "SL-CHAT-20251219120000000-1A2B",
    "timestamp": "2025-12-19T12:00:00",
    "type": "TEXT",
    "mediaUrls": [],
    "createdAt": "2025-12-19T12:00:00",
    "updatedAt": "2025-12-19T12:00:00"
  },
  "errors": null,
  "pagination": null
}
```

---

### 4. Get Messages in Chat Room

**GET** `/api/v1/chat/message/chatroom/{chatRoomId}`

**Response (200 OK):**
```json
{
  "meta": {
    "statusCode": 200,
    "statusDescription": "OK",
    "message": "Messages retrieved successfully."
  },
  "data": [
    {
      "id": "MSG-20251219120000000-ABC1",
      "senderId": "USR-xxx-001",
      "content": "Hello, how can I help you?",
      "chatId": "SL-CHAT-20251219120000000-1A2B",
      "timestamp": "2025-12-19T12:00:00",
      "type": "TEXT",
      "mediaUrls": []
    },
    {
      "id": "MSG-20251219120100000-ABC2",
      "senderId": "USR-xxx-002",
      "content": "I need help with my car service",
      "chatId": "SL-CHAT-20251219120000000-1A2B",
      "timestamp": "2025-12-19T12:01:00",
      "type": "TEXT",
      "mediaUrls": []
    }
  ],
  "errors": null,
  "pagination": null
}
```

---

## WebSocket Integration

### Connection Details

| Environment | WebSocket URL |
|-------------|---------------|
| Production | `wss://bpi.jappcare.com/ws` |
| Development | `ws://localhost:8555/ws` |

### STOMP Destinations

| Destination | Type | Description |
|-------------|------|-------------|
| `/app/chat/{chatId}/sendMessage` | SEND | Send a message to a chat room |
| `/app/chat/{chatId}/message/{messageId}/delivered` | SEND | Mark message as delivered |
| `/app/chat/{chatId}/message/{messageId}/read` | SEND | Mark message as read |
| `/topic/chat/{chatId}` | SUBSCRIBE | Receive messages for a chat room |
| `/topic/chat/{chatId}/delivery` | SUBSCRIBE | Receive delivery status updates |

### Connection Flow

```
1. Connect to WebSocket with JWT token
2. Subscribe to chat room topics
3. Send/receive messages
4. Handle delivery confirmations
```

---

### Send Message via WebSocket

**Destination:** `/app/chat/{chatId}/sendMessage`

**Payload:**
```json
{
  "senderId": "USR-xxx-001",
  "content": "Hello from WebSocket!",
  "type": "TEXT",
  "fileIds": []
}
```

> **Important:** Do NOT include `chatId` in the payload - it's extracted from the destination path.

### Received Message Format

**Topic:** `/topic/chat/{chatId}`

```json
{
  "id": "MSG-20251219120000000-ABC1",
  "senderId": "USR-xxx-001",
  "content": "Hello from WebSocket!",
  "chatId": "SL-CHAT-20251219120000000-1A2B",
  "timestamp": "2025-12-19T12:00:00",
  "type": "TEXT",
  "mediaUrls": []
}
```

### Mark Message as Delivered

**Destination:** `/app/chat/{chatId}/message/{messageId}/delivered`

**Payload:**
```json
{
  "userId": "USR-xxx-002",
  "deviceId": "device-123"
}
```

### Mark Message as Read

**Destination:** `/app/chat/{chatId}/message/{messageId}/read`

**Payload:**
```json
{
  "userId": "USR-xxx-002",
  "deviceId": "device-123"
}
```

---

## Data Models

### ChatRoomDTO
```typescript
interface ChatRoom {
  id: string;
  name: string;
  participantIds: string[];
  appointmentDTO: Appointment | null;
  createdAt: string;      // ISO 8601 format
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}
```

### ChatMessageDTO (Send)
```typescript
interface ChatMessageSend {
  senderId: string;       // Required
  content: string;        // Required
  type: MessageType;      // Required
  fileIds: string[];      // Optional - file attachment IDs
}
```

### ChatMessageReadDTO (Receive)
```typescript
interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  chatId: string;
  timestamp: string;      // ISO 8601 format
  type: MessageType;
  mediaUrls: FileMetadata[];
  createdAt: string;
  updatedAt: string;
}
```

### MessageType Enum
```typescript
type MessageType = 
  | 'TEXT'
  | 'TEXT_AND_OTHERS'
  | 'IMAGE'
  | 'VIDEO'
  | 'AUDIO'
  | 'FILE'
  | 'INVOICE'
  | 'TEXT_INVOICE';
```

### ChatType Enum
```typescript
type ChatType = 'SINGLE' | 'GROUP' | 'BROADCAST';
```

### FileMetadata
```typescript
interface FileMetadata {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
}
```

---

## React.js Integration

### Installation

```bash
npm install sockjs-client stompjs axios
# or
yarn add sockjs-client stompjs axios
```

### Chat Service Hook

```typescript
// hooks/useChatService.ts
import { useCallback, useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp, { Client, Message } from 'stompjs';

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
  baseUrl: string;
  onMessageReceived?: (message: ChatMessage) => void;
  onDeliveryUpdate?: (update: any) => void;
}

export const useChatService = ({
  chatId,
  token,
  baseUrl,
  onMessageReceived,
  onDeliveryUpdate,
}: UseChatServiceProps) => {
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const stompClient = useRef<Client | null>(null);

  // Connect to WebSocket
  const connect = useCallback(() => {
    if (!token || !chatId) {
      setError('Token and chatId are required');
      return;
    }

    const socket = new SockJS(`${baseUrl}/ws`);
    stompClient.current = Stomp.over(socket);
    
    // Disable debug logging in production
    stompClient.current.debug = process.env.NODE_ENV === 'development' 
      ? console.log 
      : () => {};

    stompClient.current.connect(
      { Authorization: `Bearer ${token}` },
      () => {
        setConnected(true);
        setError(null);

        // Subscribe to chat messages
        stompClient.current?.subscribe(
          `/topic/chat/${chatId}`,
          (message: Message) => {
            const body = JSON.parse(message.body);
            onMessageReceived?.(body);
          }
        );

        // Subscribe to delivery updates
        stompClient.current?.subscribe(
          `/topic/chat/${chatId}/delivery`,
          (message: Message) => {
            const body = JSON.parse(message.body);
            onDeliveryUpdate?.(body);
          }
        );
      },
      (err: any) => {
        setConnected(false);
        setError(`Connection failed: ${err}`);
        console.error('WebSocket connection error:', err);
      }
    );
  }, [chatId, token, baseUrl, onMessageReceived, onDeliveryUpdate]);

  // Disconnect from WebSocket
  const disconnect = useCallback(() => {
    if (stompClient.current?.connected) {
      stompClient.current.disconnect(() => {
        setConnected(false);
      });
    }
  }, []);

  // Send a message
  const sendMessage = useCallback(
    (content: string, senderId: string, type: string = 'TEXT', fileIds: string[] = []) => {
      if (!stompClient.current?.connected) {
        setError('Not connected to WebSocket');
        return false;
      }

      const payload = {
        senderId,
        content,
        type,
        fileIds,
      };

      stompClient.current.send(
        `/app/chat/${chatId}/sendMessage`,
        { 'content-type': 'application/json' },
        JSON.stringify(payload)
      );

      return true;
    },
    [chatId]
  );

  // Mark message as delivered
  const markAsDelivered = useCallback(
    (messageId: string, userId: string, deviceId?: string) => {
      if (!stompClient.current?.connected) return;

      stompClient.current.send(
        `/app/chat/${chatId}/message/${messageId}/delivered`,
        { 'content-type': 'application/json' },
        JSON.stringify({ userId, deviceId })
      );
    },
    [chatId]
  );

  // Mark message as read
  const markAsRead = useCallback(
    (messageId: string, userId: string, deviceId?: string) => {
      if (!stompClient.current?.connected) return;

      stompClient.current.send(
        `/app/chat/${chatId}/message/${messageId}/read`,
        { 'content-type': 'application/json' },
        JSON.stringify({ userId, deviceId })
      );
    },
    [chatId]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    connected,
    error,
    connect,
    disconnect,
    sendMessage,
    markAsDelivered,
    markAsRead,
  };
};
```

### Chat API Service

```typescript
// services/chatApi.ts
import axios, { AxiosInstance } from 'axios';

interface ApiResponse<T> {
  meta: {
    statusCode: number;
    statusDescription: string;
    message: string;
  };
  data: T;
  errors: any;
  pagination: any;
}

interface CreateChatRoomRequest {
  chatName: string;
  chatDescription?: string;
  type: 'SINGLE' | 'GROUP';
  userIds: string[];
  creatorId: string;
  appointmentId?: string;
}

export class ChatApiService {
  private api: AxiosInstance;

  constructor(baseUrl: string, token: string) {
    this.api = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Create a chat room
  async createChatRoom(request: CreateChatRoomRequest) {
    const response = await this.api.post<ApiResponse<any>>(
      '/api/v1/chatroom',
      request
    );
    return response.data;
  }

  // Get user's chat rooms
  async getUserChatRooms(userId: string) {
    const response = await this.api.get<ApiResponse<any[]>>(
      `/api/v1/chatroom/user/${userId}`
    );
    return response.data;
  }

  // Get chat room by ID
  async getChatRoomById(chatRoomId: string) {
    const response = await this.api.get<ApiResponse<any>>(
      `/api/v1/chatroom/${chatRoomId}`
    );
    return response.data;
  }

  // Get messages in chat room
  async getMessages(chatRoomId: string) {
    const response = await this.api.get<ApiResponse<any[]>>(
      `/api/v1/chat/message/chatroom/${chatRoomId}`
    );
    return response.data;
  }

  // Send message via REST (fallback)
  async sendMessage(
    chatId: string,
    senderId: string,
    content: string,
    type: string = 'TEXT',
    fileIds: string[] = []
  ) {
    const response = await this.api.post<ApiResponse<any>>(
      `/api/v1/chat/${chatId}/sendMessage/other`,
      {
        senderId,
        content,
        chatId,
        type,
        fileIds,
      }
    );
    return response.data;
  }

  // Delete message
  async deleteMessage(messageId: string) {
    const response = await this.api.delete<ApiResponse<null>>(
      `/api/v1/chat/message/${messageId}`
    );
    return response.data;
  }
}
```

### React Chat Component Example

```tsx
// components/ChatRoom.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useChatService } from '../hooks/useChatService';
import { ChatApiService } from '../services/chatApi';

interface ChatRoomProps {
  chatId: string;
  currentUserId: string;
  token: string;
}

export const ChatRoom: React.FC<ChatRoomProps> = ({
  chatId,
  currentUserId,
  token,
}) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8555';

  // Handle new message received
  const handleMessageReceived = useCallback((message: any) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  // Initialize WebSocket
  const {
    connected,
    error,
    connect,
    disconnect,
    sendMessage,
    markAsRead,
  } = useChatService({
    chatId,
    token,
    baseUrl,
    onMessageReceived: handleMessageReceived,
  });

  // Load initial messages and connect
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const api = new ChatApiService(baseUrl, token);
        const response = await api.getMessages(chatId);
        setMessages(response.data || []);
      } catch (err) {
        console.error('Failed to load messages:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
    connect();

    return () => {
      disconnect();
    };
  }, [chatId, token, baseUrl, connect, disconnect]);

  // Send message handler
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const success = sendMessage(newMessage, currentUserId, 'TEXT');
    if (success) {
      setNewMessage('');
    }
  };

  // Mark messages as read when viewed
  useEffect(() => {
    messages.forEach((msg) => {
      if (msg.senderId !== currentUserId) {
        markAsRead(msg.id, currentUserId);
      }
    });
  }, [messages, currentUserId, markAsRead]);

  if (loading) return <div>Loading messages...</div>;

  return (
    <div className="chat-room">
      {/* Connection Status */}
      <div className={`status ${connected ? 'connected' : 'disconnected'}`}>
        {connected ? '🟢 Connected' : '🔴 Disconnected'}
        {error && <span className="error">{error}</span>}
      </div>

      {/* Messages List */}
      <div className="messages-container">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${
              msg.senderId === currentUserId ? 'sent' : 'received'
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
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage} disabled={!connected}>
          Send
        </button>
      </div>
    </div>
  );
};
```

---

## Flutter Integration

### Dependencies (pubspec.yaml)

```yaml
dependencies:
  flutter:
    sdk: flutter
  stomp_dart_client: ^1.0.0
  http: ^1.1.0
  web_socket_channel: ^2.4.0
```

### Chat Service

```dart
// lib/services/chat_service.dart
import 'dart:convert';
import 'package:stomp_dart_client/stomp.dart';
import 'package:stomp_dart_client/stomp_config.dart';
import 'package:stomp_dart_client/stomp_frame.dart';

class ChatMessage {
  final String id;
  final String senderId;
  final String content;
  final String chatId;
  final DateTime timestamp;
  final String type;
  final List<dynamic> mediaUrls;

  ChatMessage({
    required this.id,
    required this.senderId,
    required this.content,
    required this.chatId,
    required this.timestamp,
    required this.type,
    required this.mediaUrls,
  });

  factory ChatMessage.fromJson(Map<String, dynamic> json) {
    return ChatMessage(
      id: json['id'] ?? '',
      senderId: json['senderId'] ?? '',
      content: json['content'] ?? '',
      chatId: json['chatId'] ?? '',
      timestamp: DateTime.parse(json['timestamp'] ?? DateTime.now().toIso8601String()),
      type: json['type'] ?? 'TEXT',
      mediaUrls: json['mediaUrls'] ?? [],
    );
  }
}

class ChatService {
  late StompClient _stompClient;
  final String baseUrl;
  final String token;
  final String chatId;
  
  bool _isConnected = false;
  Function(ChatMessage)? onMessageReceived;
  Function(dynamic)? onDeliveryUpdate;
  Function(String)? onError;
  Function()? onConnected;
  Function()? onDisconnected;

  ChatService({
    required this.baseUrl,
    required this.token,
    required this.chatId,
    this.onMessageReceived,
    this.onDeliveryUpdate,
    this.onError,
    this.onConnected,
    this.onDisconnected,
  });

  bool get isConnected => _isConnected;

  /// Connect to WebSocket server
  void connect() {
    _stompClient = StompClient(
      config: StompConfig.sockJS(
        url: '$baseUrl/ws',
        stompConnectHeaders: {
          'Authorization': 'Bearer $token',
        },
        webSocketConnectHeaders: {
          'Authorization': 'Bearer $token',
        },
        onConnect: _onConnect,
        onWebSocketError: (dynamic error) {
          _isConnected = false;
          onError?.call('WebSocket error: $error');
        },
        onStompError: (StompFrame frame) {
          _isConnected = false;
          onError?.call('STOMP error: ${frame.body}');
        },
        onDisconnect: (StompFrame frame) {
          _isConnected = false;
          onDisconnected?.call();
        },
      ),
    );
    
    _stompClient.activate();
  }

  void _onConnect(StompFrame frame) {
    _isConnected = true;
    onConnected?.call();

    // Subscribe to chat messages
    _stompClient.subscribe(
      destination: '/topic/chat/$chatId',
      callback: (StompFrame frame) {
        if (frame.body != null) {
          final message = ChatMessage.fromJson(jsonDecode(frame.body!));
          onMessageReceived?.call(message);
        }
      },
    );

    // Subscribe to delivery updates
    _stompClient.subscribe(
      destination: '/topic/chat/$chatId/delivery',
      callback: (StompFrame frame) {
        if (frame.body != null) {
          final update = jsonDecode(frame.body!);
          onDeliveryUpdate?.call(update);
        }
      },
    );
  }

  /// Send a message
  void sendMessage({
    required String senderId,
    required String content,
    String type = 'TEXT',
    List<String> fileIds = const [],
  }) {
    if (!_isConnected) {
      onError?.call('Not connected to WebSocket');
      return;
    }

    final payload = {
      'senderId': senderId,
      'content': content,
      'type': type,
      'fileIds': fileIds,
    };

    _stompClient.send(
      destination: '/app/chat/$chatId/sendMessage',
      body: jsonEncode(payload),
      headers: {'content-type': 'application/json'},
    );
  }

  /// Mark message as delivered
  void markAsDelivered({
    required String messageId,
    required String userId,
    String? deviceId,
  }) {
    if (!_isConnected) return;

    _stompClient.send(
      destination: '/app/chat/$chatId/message/$messageId/delivered',
      body: jsonEncode({
        'userId': userId,
        'deviceId': deviceId,
      }),
      headers: {'content-type': 'application/json'},
    );
  }

  /// Mark message as read
  void markAsRead({
    required String messageId,
    required String userId,
    String? deviceId,
  }) {
    if (!_isConnected) return;

    _stompClient.send(
      destination: '/app/chat/$chatId/message/$messageId/read',
      body: jsonEncode({
        'userId': userId,
        'deviceId': deviceId,
      }),
      headers: {'content-type': 'application/json'},
    );
  }

  /// Disconnect from WebSocket
  void disconnect() {
    _stompClient.deactivate();
    _isConnected = false;
  }
}
```

### Chat API Service

```dart
// lib/services/chat_api_service.dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiResponse<T> {
  final int statusCode;
  final String message;
  final T? data;
  final dynamic errors;

  ApiResponse({
    required this.statusCode,
    required this.message,
    this.data,
    this.errors,
  });
}

class ChatApiService {
  final String baseUrl;
  final String token;

  ChatApiService({required this.baseUrl, required this.token});

  Map<String, String> get _headers => {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer $token',
  };

  /// Create a chat room
  Future<ApiResponse<Map<String, dynamic>>> createChatRoom({
    required String chatName,
    required String type,
    required List<String> userIds,
    required String creatorId,
    String? chatDescription,
    String? appointmentId,
  }) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/v1/chatroom'),
      headers: _headers,
      body: jsonEncode({
        'chatName': chatName,
        'chatDescription': chatDescription,
        'type': type,
        'userIds': userIds,
        'creatorId': creatorId,
        'appointmentId': appointmentId,
      }),
    );

    final json = jsonDecode(response.body);
    return ApiResponse(
      statusCode: json['meta']['statusCode'],
      message: json['meta']['message'],
      data: json['data'],
      errors: json['errors'],
    );
  }

  /// Get user's chat rooms
  Future<ApiResponse<List<dynamic>>> getUserChatRooms(String userId) async {
    final response = await http.get(
      Uri.parse('$baseUrl/api/v1/chatroom/user/$userId'),
      headers: _headers,
    );

    final json = jsonDecode(response.body);
    return ApiResponse(
      statusCode: json['meta']['statusCode'],
      message: json['meta']['message'],
      data: json['data'],
    );
  }

  /// Get messages in a chat room
  Future<ApiResponse<List<dynamic>>> getMessages(String chatRoomId) async {
    final response = await http.get(
      Uri.parse('$baseUrl/api/v1/chat/message/chatroom/$chatRoomId'),
      headers: _headers,
    );

    final json = jsonDecode(response.body);
    return ApiResponse(
      statusCode: json['meta']['statusCode'],
      message: json['meta']['message'],
      data: json['data'],
    );
  }

  /// Send message via REST (fallback)
  Future<ApiResponse<Map<String, dynamic>>> sendMessage({
    required String chatId,
    required String senderId,
    required String content,
    String type = 'TEXT',
    List<String> fileIds = const [],
  }) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/v1/chat/$chatId/sendMessage/other'),
      headers: _headers,
      body: jsonEncode({
        'senderId': senderId,
        'content': content,
        'chatId': chatId,
        'type': type,
        'fileIds': fileIds,
      }),
    );

    final json = jsonDecode(response.body);
    return ApiResponse(
      statusCode: json['meta']['statusCode'],
      message: json['meta']['message'],
      data: json['data'],
    );
  }

  /// Delete message
  Future<ApiResponse<void>> deleteMessage(String messageId) async {
    final response = await http.delete(
      Uri.parse('$baseUrl/api/v1/chat/message/$messageId'),
      headers: _headers,
    );

    final json = jsonDecode(response.body);
    return ApiResponse(
      statusCode: json['meta']['statusCode'],
      message: json['meta']['message'],
    );
  }
}
```

### Flutter Chat Screen Example

```dart
// lib/screens/chat_screen.dart
import 'package:flutter/material.dart';
import '../services/chat_service.dart';
import '../services/chat_api_service.dart';

class ChatScreen extends StatefulWidget {
  final String chatId;
  final String currentUserId;
  final String token;
  final String baseUrl;

  const ChatScreen({
    Key? key,
    required this.chatId,
    required this.currentUserId,
    required this.token,
    required this.baseUrl,
  }) : super(key: key);

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  late ChatService _chatService;
  late ChatApiService _apiService;
  
  final TextEditingController _messageController = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  
  List<ChatMessage> _messages = [];
  bool _isConnected = false;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _initServices();
    _loadMessages();
  }

  void _initServices() {
    _apiService = ChatApiService(
      baseUrl: widget.baseUrl,
      token: widget.token,
    );

    _chatService = ChatService(
      baseUrl: widget.baseUrl,
      token: widget.token,
      chatId: widget.chatId,
      onMessageReceived: (message) {
        setState(() {
          _messages.add(message);
        });
        _scrollToBottom();
      },
      onConnected: () {
        setState(() => _isConnected = true);
      },
      onDisconnected: () {
        setState(() => _isConnected = false);
      },
      onError: (error) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(error)),
        );
      },
    );

    _chatService.connect();
  }

  Future<void> _loadMessages() async {
    try {
      final response = await _apiService.getMessages(widget.chatId);
      if (response.data != null) {
        setState(() {
          _messages = (response.data as List)
              .map((m) => ChatMessage.fromJson(m))
              .toList();
          _isLoading = false;
        });
        _scrollToBottom();
      }
    } catch (e) {
      setState(() => _isLoading = false);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to load messages: $e')),
      );
    }
  }

  void _sendMessage() {
    final content = _messageController.text.trim();
    if (content.isEmpty) return;

    _chatService.sendMessage(
      senderId: widget.currentUserId,
      content: content,
      type: 'TEXT',
    );

    _messageController.clear();
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  void dispose() {
    _chatService.disconnect();
    _messageController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Chat'),
        actions: [
          Icon(
            _isConnected ? Icons.wifi : Icons.wifi_off,
            color: _isConnected ? Colors.green : Colors.red,
          ),
          const SizedBox(width: 16),
        ],
      ),
      body: Column(
        children: [
          // Messages List
          Expanded(
            child: _isLoading
                ? const Center(child: CircularProgressIndicator())
                : ListView.builder(
                    controller: _scrollController,
                    padding: const EdgeInsets.all(16),
                    itemCount: _messages.length,
                    itemBuilder: (context, index) {
                      final message = _messages[index];
                      final isSent = message.senderId == widget.currentUserId;
                      
                      return Align(
                        alignment: isSent
                            ? Alignment.centerRight
                            : Alignment.centerLeft,
                        child: Container(
                          margin: const EdgeInsets.only(bottom: 8),
                          padding: const EdgeInsets.symmetric(
                            horizontal: 16,
                            vertical: 10,
                          ),
                          decoration: BoxDecoration(
                            color: isSent ? Colors.blue : Colors.grey[300],
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: [
                              Text(
                                message.content,
                                style: TextStyle(
                                  color: isSent ? Colors.white : Colors.black,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                _formatTime(message.timestamp),
                                style: TextStyle(
                                  fontSize: 10,
                                  color: isSent
                                      ? Colors.white70
                                      : Colors.black54,
                                ),
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
          ),
          
          // Message Input
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: Colors.white,
              boxShadow: [
                BoxShadow(
                  color: Colors.grey.withOpacity(0.2),
                  blurRadius: 4,
                  offset: const Offset(0, -2),
                ),
              ],
            ),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _messageController,
                    decoration: const InputDecoration(
                      hintText: 'Type a message...',
                      border: OutlineInputBorder(),
                      contentPadding: EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 8,
                      ),
                    ),
                    onSubmitted: (_) => _sendMessage(),
                  ),
                ),
                const SizedBox(width: 8),
                IconButton(
                  onPressed: _isConnected ? _sendMessage : null,
                  icon: const Icon(Icons.send),
                  color: Colors.blue,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  String _formatTime(DateTime dateTime) {
    return '${dateTime.hour.toString().padLeft(2, '0')}:${dateTime.minute.toString().padLeft(2, '0')}';
  }
}
```

---

## Error Handling

### API Error Response Format

```json
{
  "meta": {
    "statusCode": 400,
    "statusDescription": "BAD_REQUEST",
    "message": "Validation error message"
  },
  "data": null,
  "errors": {
    "field": "error description"
  },
  "pagination": null
}
```

### Common HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 204 | No Content - Deletion successful |
| 400 | Bad Request - Validation error |
| 401 | Unauthorized - Invalid or missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |

### WebSocket Error Handling

```typescript
// React Example
stomp.connect(
  { Authorization: "Bearer " + token },
  (frame) => { /* success */ },
  (error) => {
    // Handle connection errors
    if (error.includes("Authentication")) {
      // Token expired - refresh and reconnect
    } else {
      // Network error - retry with exponential backoff
    }
  }
);
```

---

## Best Practices

### 1. Connection Management
- Implement automatic reconnection with exponential backoff
- Disconnect WebSocket when leaving chat screen
- Handle app backgrounding/foregrounding

### 2. Message Handling
- Load initial messages via REST API on screen mount
- Use WebSocket for real-time updates only
- Implement optimistic UI updates for sent messages

### 3. Performance
- Implement message pagination for large chat histories
- Use virtualized lists for message rendering
- Cache chat room data locally

### 4. Security
- Store JWT tokens securely (Keychain/Keystore)
- Validate message sender matches current user
- Handle token expiration gracefully

### 5. Offline Support
- Queue messages when offline
- Sync on reconnection
- Show connection status to users

---

## Testing with Postman

### WebSocket Testing

1. Create a new WebSocket request in Postman
2. URL: `ws://localhost:8555/ws/websocket`
3. After connecting, send STOMP frames manually

**Connect Frame:**
```
CONNECT
Authorization:Bearer YOUR_JWT_TOKEN
accept-version:1.2
heart-beat:10000,10000

^@
```

**Subscribe Frame:**
```
SUBSCRIBE
id:sub-0
destination:/topic/chat/YOUR_CHAT_ID

^@
```

**Send Message Frame:**
```
SEND
destination:/app/chat/YOUR_CHAT_ID/sendMessage
content-type:application/json

{"senderId":"YOUR_USER_ID","content":"Hello!","type":"TEXT","fileIds":[]}
^@
```

> Note: `^@` represents NULL character (Ctrl+@)

### Using the HTML Test Page

Open `/templates/html/test_message.html` in a browser:
1. Enter Chat ID and User ID
2. Paste your JWT token
3. Click Connect
4. Type message and click Send

---

## Support

For questions or issues, contact the JapCare Development Team.

**API Documentation:** Swagger UI available at `/swagger-ui.html`

