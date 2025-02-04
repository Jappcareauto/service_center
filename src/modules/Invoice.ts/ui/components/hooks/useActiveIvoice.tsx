import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { invoiceSliceAction } from "@/modules/Invoice.ts/slice/invoiceSlice";
import { invoiceSelector } from "@/modules/Invoice.ts/slice/selectors";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const useActiveInvoice = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  useEffect(() => {
    dispatch(invoiceSliceAction.findOneInvoice({ id: params.id! }));
  }, [params]);
  const activeInvoice = useAppSelector(invoiceSelector.activeInvoice);
  const upDateInvoice = {
    ...activeInvoice,
    items: activeInvoice?.items?.map((item) => {
      const totalPrice = item.quantity * 1 * item.price * 1;

      return {
        name: item.name,
        id: item.name,
        quantity: item.quantity,
        price: item.price,
        totalPrice,
      };
    }),
  };

  // export interface ServiceItem {
  //   name: string;
  //   quantity: number;
  //   price: number;
  //   id: string;
  //   totalPrice?: number;
  // }

  return {
    state: {
      activeInvoice: upDateInvoice,
    },
  };
};
