import { InvoiceStatus } from "./InvoiceStatus";

export interface Invoice {
  name: string;
  price: number;
  startDate: string;
  endDate: string;
  status: InvoiceStatus;
}
// import { Appointment } from "@/modules/appointment/model/Appointment";
// import { InvoiceStatus } from "./InvoiceStatus";
// import { InvoiceItem } from "@/shared/model/InvoiceItem";
// import { User } from "@/shared/model/User";
// import { Audit } from "@/shared/model/Audit";
// import { Money } from "@/shared/model/Money";

// export interface Invoice extends Audit {
//   number: string;
//   money?: Money;
//   issueDate: string;
//   dueDate: string;
//   paidDate: string;
//   appointment?: Appointment;
//   items?: InvoiceItem[];
//   billedFromUser?: User;
//   billedToUser?: User;
//   isPaid: boolean;

//   status: InvoiceStatus;
// }
