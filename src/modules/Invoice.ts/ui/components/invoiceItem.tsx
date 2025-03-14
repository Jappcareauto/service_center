import { FC } from "react";
import { Invoice } from "../../model/Invoice";
import { formatDateToMedium } from "@/shared/utils/dateFormat";
import Calendar2Icon from "@/shared/generics/menu/icons/Calendar2Icon";
import { ArrowDown } from "@/shared/generics/menu/icons/ArrowDown";
import Trash2 from "@/shared/generics/menu/icons/Trash2";
import { ArrowRight } from "@/shared/generics/menu/icons/ArrowRight";
import ButtonStatus from "./ButtonStatus";
import { InvoiceStatus } from "../../model/InvoiceStatus";
import Avatar from "@/shared/generics/Avatar";
import { useNavigate } from "react-router-dom";
import { InvoiceRoutes } from "../../infra/routes/Router";
import { useDonwloadInvoice } from "../../useCase/download/useDonwloadInvoice";
import { useDeleteInvoice } from "../../useCase/delete/useDeleteInvoice";
import { LoadingState } from "@/shared/enums/LoadingState";
import Loader from "@/shared/generics/loader/Loader";

type Props = {
  invoice: Invoice;
};

const InvoiceItem: FC<Props> = ({ invoice }) => {
  const navigate = useNavigate();
  const issueDate = formatDateToMedium(invoice.issueDate);
  const endDate = formatDateToMedium(invoice.dueDate);
  const { action } = useDonwloadInvoice();
  const {
    action: deleteAction,
    state: { loading: deleteLoading },
  } = useDeleteInvoice();
  return (
    <div className="border-y-2 hover:cursor-pointer border-grey3 px-4 min-h-12 flex items-center justify-between rounded-xl hover:bg-primaryAccent ">
      <div
        onClick={() => navigate(InvoiceRoutes.invoiceDetail(invoice.id))}
        className="flex  items-center justify-items-start lg:gap-10 "
      >
        <div className="flex min-w-36 overflow-x-hidden  gap-4 items-center">
          <Avatar className="h-7 w-7" name={invoice.billedToUser?.name} />
        </div>
        <h3 className="min-w-24 ">
          {invoice?.money?.amount} {invoice.money?.currency}
        </h3>
        <div className="flex min-w-36 gap-x-1">
          <Calendar2Icon />
          <h3>{issueDate}</h3>
        </div>
        <div className="flex min-w-36 gap-x-1">
          <Calendar2Icon />

          <h3>{endDate}</h3>
        </div>
        <ButtonStatus status={InvoiceStatus.Paid} />
      </div>
      <div className="flex gap-5">
        <div>
          <ArrowDown
            className=" hover:bg-primary rounded  "
            onClick={() => action.onDownload(invoice.id)}
          />
        </div>

        {deleteLoading === LoadingState.pending ? (
          <Loader />
        ) : (
          <Trash2 onClick={() => deleteAction.onDelete(invoice.id)} />
        )}
        <ArrowRight />
      </div>
    </div>
  );
};
export default InvoiceItem;
