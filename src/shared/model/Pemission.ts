import { Audit } from "./Audit";

export interface Permission extends Audit {
    definition: string;
    expired: string;
}