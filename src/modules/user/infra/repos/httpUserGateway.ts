import { HttpProvider } from "@/shared/gateway/HttpProvider";
import { UserGateway } from "../../gateway/userGateWay";
import { FindAllUserResponse } from "../../usecase/findAllUser/findAllUserResponse";
import { UserRouteApi } from "../routes/ApiRoute";

export class HttpUserGateWay extends HttpProvider implements UserGateway {
  async findAllUser(): Promise<FindAllUserResponse> {
    const response = await this.getWithResult({ url: UserRouteApi.fetchAll() });
    return response;
  }
}
