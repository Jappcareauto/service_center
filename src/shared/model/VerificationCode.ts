import { Audit } from "./Audit";

export interface VerificationCode extends Audit {
    code: string;
    user: string;
    expiryDate: string;
    complete: string;
    type: string;
}