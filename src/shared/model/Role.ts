import { Audit } from "./Audit";

export interface Role extends Audit {
    definition: string;
    expired: string;
}
