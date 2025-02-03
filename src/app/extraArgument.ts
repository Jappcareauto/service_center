import HttpAuthGateway from "@/modules/auth/infra/repo/HttpAuthGateway";
import { Dependencies } from "./Dependencies";
import { HttpAppointenmentGetAway } from "@/modules/appointment/infra/repo/httpAppointementGetAway";
import { httpVehicleGateway } from "@/modules/vehicle/infra/repo/httpVehicleGateway";
import { HttpStatsGateWay } from "@/modules/statistics/infra/repos/httpStatsGateway";
import { HttpInvoiceGateway } from "@/modules/Invoice.ts/infra/repo/HttpInvoiceGateway";
import { HttpServiceGateway } from "@/modules/service/infra/repos/httpServiceCenterGateway";
import { HttpUserGateWay } from "@/modules/user/infra/repos/httpUserGateway";
import { HttpChatGateway } from "@/modules/chat/infra/repo/httpChatGateway";
import { HttpEmergencygateway } from "@/modules/emergency/infra/repo/httpEmergencyGateway";

export const extraArgument: Dependencies = {
  authGateway: new HttpAuthGateway(),
  AppointementGetway: new HttpAppointenmentGetAway(),
  vehicleGateWay: new httpVehicleGateway(),
  statsGateWay: new HttpStatsGateWay(),
  invoiceGateway: new HttpInvoiceGateway(),
  serviceGateway: new HttpServiceGateway(),
  UserGateway: new HttpUserGateWay(),
  chatGateway: new HttpChatGateway(),
  emergencyGateway: new HttpEmergencygateway(),
};
