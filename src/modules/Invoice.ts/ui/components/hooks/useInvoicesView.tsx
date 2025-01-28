import { useNavigate } from "react-router-dom";
import { useFindAllInvoice } from "@/modules/Invoice.ts/useCase/findAllInvoice/useFindAllInvoice";

export const useInvoicesView = () => {
  const { state } = useFindAllInvoice();
  const navigate = useNavigate();
  const handleNavigation = (link: string) => {
    navigate(link);
  };

  return {
    handleNavigation,
    invoiceState: { invoices: state.invoices, loading: state.loading },
  };
};
