import { Pagination } from "@/shared/model/Pagination";
import { ChatRoomModel } from "./../../models/ChatRoomModel";
export interface findAllChatRoomResponse {
  data: ChatRoomModel[];
  pagination: Pagination;
}
