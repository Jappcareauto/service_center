import { AuthSlice } from "@/modules/auth/slices/AuthSlice";
import { AppointmentSlice } from "@/modules/appointment/slices/AppointementSlice";

import { combineReducers } from "@reduxjs/toolkit";
import { VehicleSlice } from "@/modules/vehicle/slice/vehicleSlice";
import { StatsSlice } from "@/modules/statistics/slice/statsSlice";
import { InvoicesSlice } from "@/modules/Invoice.ts/slice/invoiceSlice";
import { ServicesSlice } from "@/modules/service/slice/serviceSlice";
import { UserSlice } from "@/modules/user/slice/userSlice";

export const rootReducer = combineReducers({
  [AuthSlice.name]: AuthSlice.reducer,
  [AppointmentSlice.name]: AppointmentSlice.reducer,
  [VehicleSlice.name]: VehicleSlice.reducer,
  [StatsSlice.name]: StatsSlice.reducer,
  [InvoicesSlice.name]: InvoicesSlice.reducer,
  [ServicesSlice.name]: ServicesSlice.reducer,
  [UserSlice.name]:UserSlice.reducer
});
