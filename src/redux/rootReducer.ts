import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "./api";
import app from "./features/app/appSlice";
import auth from "./features/auth/authSlice";
import appointment from "./features/appointment/appointmentSlice";


const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth,
  appointment,
  app
});

export default rootReducer;
