import { VehicleGateWay } from "./../modules/vehicle/gateway/VehicleGateway";
import { AppointementGetway } from "./../modules/appointment/gateway/AppointmentGateway";
import { AuthGateway } from "@/modules/auth/gateway/AuthGateway";
import { StatsGateway } from "@/modules/statistics/gateway/statsGateway";
import { InvoiceGateway } from "@/modules/Invoice.ts/gateway/InvoiceGateway";

export interface Dependencies {
  authGateway: AuthGateway;
  AppointementGetway: AppointementGetway;
  vehicleGateWay: VehicleGateWay;
  statsGateWay: StatsGateway;
  invoiceGateway: InvoiceGateway;
}
