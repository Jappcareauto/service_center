import { FindAllUserResponse } from "../usecase/findAllUser/findAllUserResponse";

export interface UserGateway {
    findAllUser:()=>Promise<FindAllUserResponse>
}