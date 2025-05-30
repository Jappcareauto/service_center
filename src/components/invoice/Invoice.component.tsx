import { getFormattedDate } from "@/utils";
import Avatar from "../avatar/Avatar.component";
import Button from "../button/Button.component";
import { InvoiceProps } from "./types";

const Invoice = ({
  email,
  name,
  invoiceNumber,
  issueDate,
  money,
  service,
  onClick,
}: InvoiceProps) => {
  return (
    <div className="rounded-xl p-4 border border-borderColor">
      <div className="flex justify-between items-center">
        <p className="text-grey4">Billed to</p>
        <div className="bg-redAccent px-4 text-red p-2 rounded-2xl text-sm">
          Pending
        </div>
      </div>
      <div className="flex mt-3">
        <Avatar name={name} label={email} isName={false} />
      </div>
      <div className="flex flex-col gap-y-4 mt-5">
        <div className="flex justify-between items-center">
          <p className="text-grey4">Service</p>
          <p className="font-semibold">{service}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-grey4">Invoice Number</p>
          <p className="font-semibold">{invoiceNumber}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-grey4">Date Issued</p>
          <p className="font-semibold">
            {issueDate && getFormattedDate(issueDate)}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-grey4">Amount</p>
          <p className="text-primary font-semibold">
            {money?.amount} {money?.currency}
          </p>
        </div>
      </div>

      <Button
        className="rounded-full text-sm float-right self-end w-auto px-7 mt-10"
        variant="tertiary"
        onClick={onClick}
      >
        View Invoice
      </Button>
    </div>
  );
};

export default Invoice;
