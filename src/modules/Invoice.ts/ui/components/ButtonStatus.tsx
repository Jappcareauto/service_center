import React, { ButtonHTMLAttributes, FC } from "react";
import { InvoiceStatus } from "../../model/InvoiceStatus";

type Props = {
  status: InvoiceStatus;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonStatus: FC<Props> = ({ status, ...props }) => {
  let style: string;

  switch (status) {
    case InvoiceStatus.Paid:
      style = "bg-greenAccent text-green";
      break;
    case InvoiceStatus.UnPaid:
      style = "bg-redAccent text-red";

      break;
    case InvoiceStatus.Decline:
      style = "bg-redAccent text-red";

      break;

    default:
      style = "bg-primaryAccent text-primary";

      break;
  }

  return (
    <button
      {...props}
      className={`h-8 bggre px-3 font-medium ${style}   rounded-2xl`}
    >
      {status}
    </button>
  );
};
export default ButtonStatus;
