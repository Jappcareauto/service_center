import HttpAuthGateway from "@/modules/auth/infra/repo/HttpAuthGateway";
import { Dependencies } from "./Dependencies";

export const extraArgument: Dependencies = {
  authGateway: new HttpAuthGateway(),
};