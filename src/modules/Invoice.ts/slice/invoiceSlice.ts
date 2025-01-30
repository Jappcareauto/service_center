import { Invoice } from "@/modules/Invoice.ts/model/Invoice";
import { findAllInvoiceAsync } from "@/modules/Invoice.ts/useCase/findAllInvoice/FindAllInvoiceAsync";
import { LoadingState } from "@/shared/enums/LoadingState";
import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ServiceItem } from "../model/ServiceItem";
import { createInvoiceAsync } from "../useCase/createInvoice/createInvoiceAsync";

interface InitialState {
  createInvoceState: {
    loading: LoadingState;
    invoice?: Invoice;
  };
  collections: {
    ids: string[];
    entities: Record<string, Invoice>;
  };
  invoicesState: {
    loading: LoadingState;
    invoices?: Invoice[];
  };
  AddInvoiceForm: {
    totalAmountState: {
      taux: number;
      totalAmount: number;
      tauxAmount: number;
      isTaux: boolean;
    };
    serviceState: {
      item: ServiceItem[];
      totalItems: number;
      totalPrices: number;
    };
  };
  activeInvoice?: Invoice;
}

const initialState: InitialState = {
  createInvoceState: {
    loading: LoadingState.idle,
  },
  invoicesState: {
    loading: LoadingState.idle,
  },
  AddInvoiceForm: {
    totalAmountState: {
      taux: 0,
      totalAmount: 0,
      tauxAmount: 0,
      isTaux: false,
    },
    serviceState: {
      item: [],
      totalItems: 0,
      totalPrices: 0,
    },
  },
  collections: {
    entities: {},
    ids: [],
  },
};

const sortComparer = (a: Invoice, b: Invoice) =>
  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

export const invoiceAdapter = createEntityAdapter<Invoice, string>({
  sortComparer,
  selectId: (invoice) => invoice.number,
});

export const InvoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    addOne: (state, action: PayloadAction<{ invoice: Invoice }>) => {
      invoiceAdapter.addOne(state.collections, {
        ...action.payload.invoice,
        createdAt: new Date(),
      });
    },
    findOneInvoice: (state, action: PayloadAction<{ id: string }>) => {
      state.activeInvoice = state.invoicesState.invoices?.find(
        (invoice) => invoice.id === action.payload.id
      );
    },
    //
    updateInvoices: (state, action: PayloadAction<{ invoices: Invoice[] }>) => {
      state.invoicesState.invoices = action.payload.invoices;
    },

    //
    //
    //
    addServiceToForm: (state, action: PayloadAction<ServiceItem>) => {
      const totalItemPrice = action.payload.price * action.payload.quantity;
      const totalPrice =
        state.AddInvoiceForm.serviceState.totalPrices + totalItemPrice;
      const totalItems = state.AddInvoiceForm.serviceState.totalItems + 1;
      state.AddInvoiceForm.serviceState = {
        ...state.AddInvoiceForm.serviceState,
        item: [
          ...state.AddInvoiceForm.serviceState.item,
          {
            ...action.payload,
            price: action.payload.price * 1,
            quantity: action.payload.quantity * 1,
            totalPrice: totalItemPrice,
          },
        ],
        totalItems: totalItems,
        totalPrices: totalPrice,
      };

      // state.AddInvoiceForm.serviceState.totalItems + 1;
      // state.AddInvoiceForm.serviceState.totalPrices =
    },
    deleteFormServiceItem: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.AddInvoiceForm.serviceState.item;

      // Filter out the item to be deleted
      const updatedItems = item.filter((item) => item.id !== action.payload.id);

      const newTotalPrices = updatedItems.reduce((total, currentItem) => {
        // if (!currentItem) {
        //   return total;
        // }
        return total + currentItem.totalPrice!;
      }, 0);

      // Update the state with the new items and total prices
      state.AddInvoiceForm.serviceState.item = updatedItems;
      state.AddInvoiceForm.serviceState.totalPrices = newTotalPrices;
      state.AddInvoiceForm.serviceState.totalItems = updatedItems.length;
    },

    handleFormTotalPrice: (state, action: PayloadAction<{ taux: number }>) => {
      const serviceState = state.AddInvoiceForm.serviceState;
      const totalAmountState = state.AddInvoiceForm.totalAmountState;
      const taux = action.payload.taux;
      state.AddInvoiceForm.totalAmountState.taux = taux;

      const tauxAmount = !isNaN(taux)
        ? (serviceState.totalPrices * taux * 1) / 100
        : 0;
      const totalAmount =
        totalAmountState.isTaux && !isNaN(taux)
          ? serviceState.totalPrices * 1 + tauxAmount * 1
          : serviceState.totalPrices;
      state.AddInvoiceForm.totalAmountState = {
        ...state.AddInvoiceForm.totalAmountState,
        tauxAmount,
        totalAmount,
      };
    },
    toogleFormTaux: (state, action: PayloadAction<{ isTaux: boolean }>) => {
      state.AddInvoiceForm.totalAmountState.isTaux = action.payload.isTaux;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(findAllInvoiceAsync.pending, (state) => {
      state.invoicesState.loading = LoadingState.pending;
    });
    builder.addCase(findAllInvoiceAsync.rejected, (state) => {
      state.invoicesState.loading = LoadingState.failed;
    });
    builder.addCase(findAllInvoiceAsync.fulfilled, (state, action) => {
      state.invoicesState.invoices = action.payload.data;
      state.invoicesState.loading = LoadingState.success;
      invoiceAdapter.setAll(state.collections, action.payload.data);
    });

    //adInvoice

    builder.addCase(createInvoiceAsync.pending, (state) => {
      state.createInvoceState.loading = LoadingState.pending;
    });

    builder.addCase(createInvoiceAsync.rejected, (state) => {
      state.createInvoceState.loading = LoadingState.failed;
    });

    builder.addCase(createInvoiceAsync.fulfilled, (state, { payload }) => {
      state.createInvoceState.invoice = payload;
      invoiceAdapter.addOne(state.collections, payload);
      state.createInvoceState.loading = LoadingState.success;
    });
  },
});

export const invoiceSliceAction = InvoicesSlice.actions;
export const invoiceFormAction = {
  addService: invoiceSliceAction.addServiceToForm,
  toogleTaux: invoiceSliceAction.toogleFormTaux,
  handleTotalPrice: invoiceSliceAction.handleFormTotalPrice,
  deleteService: invoiceSliceAction.deleteFormServiceItem,
};
