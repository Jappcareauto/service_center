import { vehicleGateWay } from "./../modules/vehicle/gateway/VehicleGateway";
import { AppointementGetway } from "./../modules/appointment/gateway/AppointmentGateway";
import { AuthGateway } from "@/modules/auth/gateway/AuthGateway";

export interface Dependencies {
  authGateway: AuthGateway;
  AppointementGetway: AppointementGetway;
  vehicleGateWay: vehicleGateWay;
}
