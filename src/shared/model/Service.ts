import { Audit } from "./Audit";
import { ServiceCenter } from "./ServiceCenter";

export interface Service extends Audit {
    title: string;
    description: string;
    definition: string;
    serviceCenter: ServiceCenter;
}
