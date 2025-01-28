import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { invoiceSelector } from "../../slice/selectors";
import { useEffect, useState } from "react";
import { findAllInvoiceAsync } from "./FindAllInvoiceAsync";
import { AppointementSelector } from "@/modules/appointment/slices/AppointenmentSelector";
import { FindAllUserAsync } from "@/modules/user/usecase/findAllUser/findAllUserAsync";
import { Invoice } from "../../model/Invoice";
import { invoiceSliceAction } from "../../slice/invoiceSlice";
import { LoadingState } from "@/shared/enums/LoadingState";

export const useFindAllInvoice = () => {
  const dispatch = useAppDispatch();
  const invoices = useAppSelector(invoiceSelector.invoices);
  const appointments = useAppSelector(AppointementSelector.appointments);
  const [loading, setLoading] = useState<LoadingState>(LoadingState.idle);
  const handleFetch = async () => {
    try {
      setLoading(LoadingState.pending);
      const invoicesRes = await dispatch(findAllInvoiceAsync()).unwrap();

      const userRes = await dispatch(FindAllUserAsync()).unwrap();
      const user = userRes.data;

      const updatedInvoices: Invoice[] = invoicesRes.data.map((invoice) => {
        const billedToUser = user.find(
          (user) => user.id === invoice.billedToUserId
        );
        const billedFromUser = user.find(
          (user) => user.id === invoice.billedFromUserId
        );
        const appointment = appointments?.find(
          (appointment) => appointment.id === invoice.appointmentId
        );

        return {
          ...invoice,
          billedFromUser,
          billedToUser,
          appointment,
        };
      });
      dispatch(
        invoiceSliceAction.updateInvoices({ invoices: updatedInvoices })
      );
      setLoading(LoadingState.success);
      console.log("updatedInvoces", updatedInvoices);
    } catch (error) {
      setLoading(LoadingState.failed);
      console.log("error", error);
    }
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
