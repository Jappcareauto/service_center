import React, { FC } from "react";
import { Invoice } from "../../model/Invoice";
import { formatDateToMedium } from "@/shared/utils/dateFormat";
import Calendar2Icon from "@/shared/generics/menu/icons/Calendar2Icon";
import { ArrowDown } from "@/shared/generics/menu/icons/ArrowDown";
import Trash2 from "@/shared/generics/menu/icons/Trash2";
import { ArrowRight } from "@/shared/generics/menu/icons/ArrowRight";
import ButtonStatus from "./ButtonStatus";
import { InvoiceStatus } from "../../model/InvoiceStatus";
import Avatar from "@/shared/generics/Avatar";

type Props = {
  invoice: Invoice;
};

const InvoiceItem: FC<Props> = ({ invoice }) => {
  const startDate = formatDateToMedium(invoice.startDate);
  const endDate = formatDateToMedium(invoice.endDate);
  return (
    <div className="border-y-2 border-grey3 px-4 h-12 flex items-center justify-between ">
      <div className="flex items-center gap-10 ">
        <div className="flex gap-4 items-center">
          <Avatar className="h-7 w-7" />
          <h2 className="first-letter:uppercase font-normal">Sarah Maya</h2>
        </div>
        <h3 className="">20 500 Frs</h3>
        <div className="flex gap-x-1">
          <Calendar2Icon />
          <h3>{startDate}</h3>
        </div>
        <div className="flex gap-x-1">
          <Calendar2Icon />

          <h3>{endDate}</h3>
        </div>
        <ButtonStatus status={InvoiceStatus.Decline} />
      </div>
      <div className="flex gap-5">
        <ArrowDown />
        <Trash2 />
        <ArrowRight />
      </div>
    </div>
  );
};
export default InvoiceItem;
