import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { invoiceSelector } from "../../slice/selectors";
import { useEffect } from "react";
import { findAllInvoiceAsync } from "./FindAllInvoiceAsync";

export const useFindAllInvoice = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => invoiceSelector.allInvoiceloading(state));
  const invoices = useAppSelector((state) => invoiceSelector.invoiceWithAll(state));
  const handleFetch = async () => {
    await dispatch(findAllInvoiceAsync()).unwrap();
  };  

  useEffect(() => {
    handleFetch();
  }, []);

  return {
    state: {
      loading,
      invoices,
    },
  };
};
