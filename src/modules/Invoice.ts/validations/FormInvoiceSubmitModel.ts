import { z } from "zod";

const validItem = z.array(
  z.object({
    name: z.string({ message: "service item name must be a string" }),
    price: z.number({ message: "invalide service price " }),
    quantity: z.number({ message: "invalide service price " }),
  })
);

const validMoney = z.object({
  amount: z.number({ message: "Invalid payment amount " }),
  currency: z.string({ message: "Invalid Currency" }),
});

export const ValidateFormAddInvoice = z.object({
  appointmentId: z.string({ message: "invalide appointment " }),
  billedFromUserId: z.string({ message: "invalide manager  " }),
  billedToUserId: z.string({ message: "invalide user " }),
  dueDate: z.string({ message: "invalide dueDate" }).optional(),
  issueDate: z.string({ message: "invalide dueDate" }),
  items: validItem,
  money: validMoney,
  vehicleId: z.string({ message: "invalide dueDate" }),
});
export type FormInvoiceSubmitModel = z.infer<typeof ValidateFormAddInvoice>;
