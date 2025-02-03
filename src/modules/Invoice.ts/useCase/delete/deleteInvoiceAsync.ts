import { createAppAsyncThunk } from "@/app/createAppAsyncThunk";
import { InvoiceApiRoute } from "../../infra/routes/ApiRoutes";
import { getErrorState } from "@/shared/errors/getErrorState";
import { DeleteInvoiceResponse } from "./deleteInvoiceResponse";

export const DeleteInvoiceAsync = createAppAsyncThunk<
  DeleteInvoiceResponse,
  string
>(
  InvoiceApiRoute.delete(""),
  async (id, { extra: { invoiceGateway }, rejectWithValue }) => {
    try {
      const response =await invoiceGateway.deleteInvoice(id);

      console.log("response", response);
      return response;
    } catch (error) {
      return rejectWithValue(getErrorState(error));
    }
  }
);
