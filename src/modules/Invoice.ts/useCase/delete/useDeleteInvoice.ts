import { useAppDispatch } from "@/app/hooks";
import  { useState } from "react";
import { DeleteInvoiceAsync } from "./deleteInvoiceAsync";
import { LoadingState } from "@/shared/enums/LoadingState";

export const useDeleteInvoice = () => {
  const [loading, setLoading] = useState<LoadingState>(LoadingState.idle);
  const dispatch = useAppDispatch();

  const onDelete = async (id: string) => {
    try {
      setLoading(LoadingState.pending);
      await dispatch(DeleteInvoiceAsync(id)).unwrap();
      setLoading(LoadingState.success);

    } catch (error) {
        setLoading(LoadingState.failed);
      return error;
    }
  };

  return {
    action: { onDelete },
    state: {
      loading,
    },
  };
};
