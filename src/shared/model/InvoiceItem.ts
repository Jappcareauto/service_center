import { Audit } from "./Audit";

export interface InvoiceItem extends Audit {
    invoice: string;
    name: string;
    price: number;
    quantity: number;
}
