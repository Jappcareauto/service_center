import { createAppAsyncThunk } from "@/app/createAppAsyncThunk";
import { FormInvoiceSubmitModel } from "../../validations/FormInvoiceSubmitModel";
import { Invoice } from "../../model/Invoice";
import { InvoiceApiRoute } from "../../infra/routes/ApiRoutes";
import { getErrorState } from "@/shared/errors/getErrorState";

export const createInvoiceAsync = createAppAsyncThunk<
  Invoice,
  FormInvoiceSubmitModel
>(
  InvoiceApiRoute.createOne(),
  async (command, { extra: { invoiceGateway }, rejectWithValue }) => {
    try {
      const response = await invoiceGateway.createOneInvoice(command);
      console.log('invoiceRes', response)
      return response;
    } catch (error) {
      return rejectWithValue(getErrorState(error));
    }
  }
);
