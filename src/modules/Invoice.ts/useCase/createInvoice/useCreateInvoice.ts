import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { FormInvoiceSubmitModel } from "../../validations/FormInvoiceSubmitModel";

import { createInvoiceAsync } from "./createInvoiceAsync";
import { invoiceSelector } from "../../slice/selectors";

export const useCreateInvoice = () => {
  const state = useAppSelector((state) =>
    invoiceSelector.createInvoiceState(state)
  );
  const dispatch = useAppDispatch();

  const onCreateInvoce = async (invoice: FormInvoiceSubmitModel) => {
    return await dispatch(createInvoiceAsync(invoice)).unwrap();
  };

  return {
    state,
    action: {
      onCreateInvoce,
    },
  };
};
