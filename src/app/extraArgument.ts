import HttpAuthGateway from "@/modules/auth/infra/repo/HttpAuthGateway";
import { Dependencies } from "./Dependencies";
import { httpAppointenmentGetAway } from "@/modules/appointment/infra/repo/httpAppointementGetAway";
import { httpVehicleGateway } from "@/modules/vehicle/infra/repo/httpVehicleGateway";
import { HttpStatsGateWay } from "@/modules/statistics/infra/repos/httpStatsGateway";

export const extraArgument: Dependencies = {
  authGateway: new HttpAuthGateway(),
  AppointementGetway: new httpAppointenmentGetAway(),
  vehicleGateWay: new httpVehicleGateway(),
  statsGateWay: new HttpStatsGateWay(),
};
