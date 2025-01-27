import { Audit } from "./Audit";

export interface InvoiceItem extends Audit {
    name: string;
    price: number;
    quantity: number;
}
