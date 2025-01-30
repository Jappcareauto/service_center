import { findAllChatRoomResponse } from "../useCase/findAllChatRoom/findAllChatRoomResponse";

export interface ChatGateway {
    findallCHatRoom:()=>Promise<findAllChatRoomResponse>
}