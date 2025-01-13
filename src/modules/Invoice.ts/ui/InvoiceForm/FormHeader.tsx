import InvoiceIcon from "@/shared/generics/menu/icons/InvoiceIcon";
import { FC } from "react";
import ButtonStatus from "../components/ButtonStatus";
import { InvoiceStatus } from "../../model/InvoiceStatus";

const InvoiceFormHeader: FC = () => {
  return (
    <div className="space-y-2">
      <div className="flex gap-x-4">
        <InvoiceIcon  />
        <h2 className="font-medium">Create Invoice</h2>
      </div>
      <div className="flex justify-end">
        <ButtonStatus status={InvoiceStatus.UnPaid} />
      </div>
    </div>
  );
};

export default InvoiceFormHeader;
