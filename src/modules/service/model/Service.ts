import { Audit } from "../../../shared/model/Audit";
import { ServiceCenter } from "./ServiceCenter";

export interface Service extends Audit {
  title: string;
  image: string;
  definition: string;
  serviceCenterId: string;
  serviceCenter?: ServiceCenter;
}
