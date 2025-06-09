import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "./api";
import app from "./features/app/appSlice";
import auth from "./features/auth/authSlice";
import appointment from "./features/appointment/appointmentSlice";
import chat from "./features/chat/chatSlice";


const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth,
  appointment,
  app,
  chat
});

export default rootReducer;
