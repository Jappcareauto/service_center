import { UserGateway } from "./../modules/user/gateway/userGateWay";
import { ServiceGateway } from "../modules/service/gateway/serviceCenterGateway";
import { VehicleGateWay } from "./../modules/vehicle/gateway/VehicleGateway";
import { AppointementGetway } from "./../modules/appointment/gateway/AppointmentGateway";
import { AuthGateway } from "@/modules/auth/gateway/AuthGateway";
import { StatsGateway } from "@/modules/statistics/gateway/statsGateway";
import { InvoiceGateway } from "@/modules/Invoice.ts/gateway/InvoiceGateway";
import { ChatGateway } from "@/modules/chat/gateway/chatGateway";

export interface Dependencies {
  authGateway: AuthGateway;
  AppointementGetway: AppointementGetway;
  vehicleGateWay: VehicleGateWay;
  statsGateWay: StatsGateway;
  invoiceGateway: InvoiceGateway;
  serviceGateway: ServiceGateway;
  UserGateway: UserGateway;
  chatGateway:ChatGateway
}
