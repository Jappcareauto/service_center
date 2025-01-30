import type { TypedAddListener, TypedStartListening } from "@reduxjs/toolkit";
import { addListener, createListenerMiddleware } from "@reduxjs/toolkit";
import { Dependencies } from "./Dependencies";
import { AppDispatch, RootState } from "./store";
import { authMiddleware } from "@/modules/auth/infra/middlewares/authMiddleware";
import { invoiceMiddleware } from "@/modules/Invoice.ts/middleware/invoiceMiddleware";
import { appointmentMiddleware } from "@/modules/appointment/infra/middlewares/findAllappointmentMiddleware";
import { updateAppointmentStatusMiddleware } from "@/modules/appointment/infra/middlewares/updateAppointmentStatusMiddleWare";
export const listenerMiddleware = createListenerMiddleware<
  RootState,
  AppDispatch,
  Dependencies
>();

export type AppStartListening = TypedStartListening<
  RootState,
  AppDispatch,
  Dependencies
>;

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening;

export const addAppListener = addListener as TypedAddListener<
  RootState,
  AppDispatch
>;

appointmentMiddleware(startAppListening);
authMiddleware(startAppListening);
invoiceMiddleware(startAppListening);
updateAppointmentStatusMiddleware(startAppListening);
