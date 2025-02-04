import { Audit } from "./Audit";

export interface Phone extends Audit {
    code: string;
    number: string;
    user: string;
}
