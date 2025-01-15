import { Audit } from "../../../shared/model/Audit";
import { ServiceCenter } from "./ServiceCenter";

export interface Service extends Audit {
    title: string;
    description: string;
    definition: string;
    serviceCenter: ServiceCenter;
}
