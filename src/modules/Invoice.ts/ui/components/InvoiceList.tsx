import { FC } from "react";
import { Invoice } from "../../model/Invoice";
import InvoiceItem from "./invoiceItem";

type Props = {
  invoices?: Invoice[];
};
const InvoiceListItem: FC<Props> = ({ invoices }) => {
  return invoices?.map((invoice, index) => (
    <div >
      <InvoiceItem invoice={invoice} key={invoice.id || index} />
    </div>
  ));
};

export default InvoiceListItem;
