import { createAppAsyncThunk } from "@/app/createAppAsyncThunk";
import { findInvoiceResponse } from "./findAllInvoiceResponse";
import { getErrorState } from "@/shared/errors/getErrorState";

export const findAllInvoiceAsync = createAppAsyncThunk<findInvoiceResponse>(
  "invoice/all",
  async (_, { extra: { invoiceGateway }, rejectWithValue }) => {
    try {
      const response = await invoiceGateway.findAllInvoice();
      return response;
    } catch (error) {
      return rejectWithValue(getErrorState(error));
    }
  }
);
