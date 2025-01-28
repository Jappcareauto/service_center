import { HttpProvider } from "@/shared/gateway/HttpProvider";
import { ChatGateway } from "../../gateway/chatGateway";
import { findAllChatRoomResponse } from "../../useCase/findAllChatRoom/findAllChatRoomResponse";
import { ChatApiRoutes } from "../router/ApiRoutes";

export class HttpChatGateway extends HttpProvider implements ChatGateway {
  async findallCHatRoom(): Promise<findAllChatRoomResponse> {
    const response = await this.getWithResult({
      url: ChatApiRoutes.findAllChatRoom(),
    });
    return response;
  }
}
