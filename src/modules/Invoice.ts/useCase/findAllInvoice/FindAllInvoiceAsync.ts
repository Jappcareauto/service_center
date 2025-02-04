import { createAppAsyncThunk } from "@/app/createAppAsyncThunk";
import { findInvoiceResponse } from "./findAllInvoiceResponse";
import { getErrorState } from "@/shared/errors/getErrorState";
import { FindAllUserAsync } from "@/modules/user/usecase/findAllUser/findAllUserAsync";
import { InvoiceApiRoute } from "../../infra/routes/ApiRoutes";

export const findAllInvoiceAsync = createAppAsyncThunk<findInvoiceResponse>(
  InvoiceApiRoute.findAll(),
  async (_, { extra: { invoiceGateway }, rejectWithValue,dispatch }) => {
    try {
      const response = await invoiceGateway.findAllInvoice();
      console.log('response', response)
   const res =    await  dispatch(FindAllUserAsync()).unwrap()


   console.log('res', res)
      return response;
    } catch (error) {
      return rejectWithValue(getErrorState(error));
    }
  }
);
