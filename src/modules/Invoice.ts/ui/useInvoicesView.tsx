import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { findAllInvoiceAsync } from "../useCase/findAllInvoice/FindAllInvoiceAsync";
import { invoiceSelector } from "../slice/selectors";
import { FindAllUserAsync } from "@/modules/user/usecase/findAllUser/findAllUserAsync";

export const useInvoicesView = () => {
  const dispatch = useAppDispatch();
  const invoices = useAppSelector(invoiceSelector.invoice);
  console.log("invoices", invoices);
  const loading = useAppSelector(invoiceSelector.allInvoiceloading);
  const navigate = useNavigate();
  const handleNavigation = (link: string) => {
    navigate(link);
  };

  useEffect(() => {
    dispatch(findAllInvoiceAsync())
      .unwrap()
      .then((result) => {
        console.log("result invoice", result);
      })
      .catch(() => {});
    dispatch(FindAllUserAsync())
      .then((result) => console.log("result", result))
      .catch((error) => console.log("error", error));
  }, []);
  console.log("invoices", invoices);
  return {
    handleNavigation,
    invoiceState: { invoices, loading },
  };
};
