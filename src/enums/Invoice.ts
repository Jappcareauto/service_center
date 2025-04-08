// // import { InvoiceStatus } from "./InvoiceStatus";

// // export interface Invoice {
// //   name: string;
// //   price: number;
// //   startDate: string;
// //   endDate: string;
// //   status: InvoiceStatus;
// // }
// import { IAppointment } from "@/types";
// import { InvoiceItem } from "@/shared/model/InvoiceItem";
// import { Audit } from "@/shared/model/Audit";
// import { Money } from "@//model/Money";
// import { User } from "@/modules/user/models/User";

// export interface Invoice extends Audit {
//   number: string;
//   money?: Money;
//   issueDate: string;
//   dueDate: string;
//   paidDate: string;
//   appointment?: IAppointment;
//   appointmentId: string;
//   items?: InvoiceItem[];
//   billedFromUserId: string;
//   billedToUserId: string;
//   vehicleId:string,
//   billedFromUser?: User;
//   billedToUser?: User;
//   isPaid: boolean;
// }
