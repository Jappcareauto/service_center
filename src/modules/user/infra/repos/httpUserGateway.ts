import { HttpProvider } from "@/shared/gateway/HttpProvider";
import { UserGateway } from "../../gateway/userGateWay";
import { FindAllUserResponse } from "../../usecase/findAllUser/findAllUserResponse";
import { UserRouteApi } from "../routes/ApiRoute";
import { FindSelfResponse } from "../../usecase/findSelf/findSelfResponse";

export class HttpUserGateWay extends HttpProvider implements UserGateway {
  async findAllUser(): Promise<FindAllUserResponse> {
    const response = await this.getWithResult({ url: UserRouteApi.fetchAll() });
    return response;
  }
  async findSelf(): Promise<FindSelfResponse> {
    const response = await this.getWithResult({ url: UserRouteApi.findSelf() });
    return response;
  }
}
