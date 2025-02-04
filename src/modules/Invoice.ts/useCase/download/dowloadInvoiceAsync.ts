import { createAppAsyncThunk } from "@/app/createAppAsyncThunk";
import { InvoiceApiRoute } from "../../infra/routes/ApiRoutes";
import { getErrorState } from "@/shared/errors/getErrorState";

export const downloadInvoiceAsync = createAppAsyncThunk<
  unknown,
  string
>(
  InvoiceApiRoute.download(""),
  async (id, { extra: { invoiceGateway }, rejectWithValue }) => {
    try {
      const response = await invoiceGateway.downloadInvoice(id);
      console.log("response", response);
      return response;
    } catch (error) {
      return rejectWithValue(getErrorState(error));
    }
  }
);
