import { Audit } from "./Audit";
import { MobileMoney } from "./MobileMoney";

export interface PaymentOption extends Audit {
    user: string;
    paymentMethod: string;
    approved: string;
    mobileMoney: MobileMoney;
}