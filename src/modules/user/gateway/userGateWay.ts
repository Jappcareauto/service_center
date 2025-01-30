import { FindAllUserResponse } from "../usecase/findAllUser/findAllUserResponse";
import { FindSelfResponse } from "../usecase/findSelf/findSelfResponse";

export interface UserGateway {
  findAllUser: () => Promise<FindAllUserResponse>;
  findSelf: () => Promise<FindSelfResponse>;
}
