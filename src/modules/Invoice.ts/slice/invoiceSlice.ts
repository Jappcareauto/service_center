import { Invoice } from "@/modules/Invoice.ts/model/Invoice";
import { findAllInvoiceAsync } from "@/modules/Invoice.ts/useCase/findAllInvoice/FindAllInvoiceAsync";
import { LoadingState } from "@/shared/enums/LoadingState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServiceItem } from "../model/ServiceItem";

interface InitialState {
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
}

const initialState: InitialState = {
  invoicesState: {
    loading: LoadingState.idle,
  },
  AddInvoiceForm: {
    totalAmountState: {
      taux: 1,
      totalAmount: 0,
      tauxAmount: 0,
      isTaux: false,
    },
    serviceState: {
      item: [
        {
          name: "service",
          price: 2000,
          quantity: 2,
          totalPrice: 4000,
          id: "111",
        },
      ],
      totalItems: 0,
      totalPrices: 4000,
    },
  },
};

export const InvoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    addServiceToForm: (state, action: PayloadAction<ServiceItem>) => {
      const totalItemPrice = action.payload.price * action.payload.quantity;
      const totalPrice =
        state.AddInvoiceForm.serviceState.totalPrices + totalItemPrice;
      const totalItems = state.AddInvoiceForm.serviceState.totalItems + 1;
      state.AddInvoiceForm.serviceState = {
        ...state.AddInvoiceForm.serviceState,
        item: [
          ...state.AddInvoiceForm.serviceState.item,
          { ...action.payload, totalPrice: totalItemPrice },
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
      state.invoicesState.invoices = action.payload;
      state.invoicesState.loading = LoadingState.success;
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
