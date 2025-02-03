import { useAppDispatch } from "@/app/hooks";
import { downloadInvoiceAsync } from "./dowloadInvoiceAsync";

export const useDonwloadInvoice = () => {
  const dispatch = useAppDispatch();

  const onDownload = async (id: string) => {
    await dispatch(downloadInvoiceAsync(id)).unwrap();
  };

  return {
    action: {
      onDownload,
    },
  };
};
