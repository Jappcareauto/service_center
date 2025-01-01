export enum MessageType {
  BASIC = 'BASIC',
  VOICE = 'VOICE',
  INVOICE = 'INVOICE',
  IMAGE = 'IMAGE',
}

export interface Message {
  message?: string;
  image?: string;
  reply?: string;
  isMe?: boolean;
  type: MessageType;
}