import { AuthSlice } from "@/modules/auth/slices/AuthSlice";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  [AuthSlice.name]: AuthSlice.reducer,
});