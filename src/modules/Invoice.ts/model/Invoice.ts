// import { InvoiceStatus } from "./InvoiceStatus";

// export interface Invoice {
//   name: string;
//   price: number;
//   startDate: string;
//   endDate: string;
//   status: InvoiceStatus;
// }
import { Appointment } from "@/modules/appointment/model/Appointment";
import { InvoiceItem } from "@/shared/model/InvoiceItem";
import { Audit } from "@/shared/model/Audit";
import { Money } from "@/shared/model/Money";
import { User } from "@/modules/user/models/User";

export interface Invoice extends Audit {
  number: string;
  money?: Money;
  issueDate: string;
  dueDate: string;
  paidDate: string;
  appointment?: Appointment;
  appointmentId: string;
  items?: InvoiceItem[];
  billedFromUserId: string;
  billedToUserId: string;
  vehicleId:string,
  billedFromUser?: User;
  billedToUser?: User;
  isPaid: boolean;
}
