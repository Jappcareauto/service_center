import type { TypedAddListener, TypedStartListening } from "@reduxjs/toolkit";
import { addListener, createListenerMiddleware } from "@reduxjs/toolkit";
import { Dependencies } from "./Dependencies";
import { AppDispatch, RootState } from "./store";

export const listenerMiddleware = createListenerMiddleware<RootState, AppDispatch, Dependencies>();

export type AppStartListening = TypedStartListening<RootState, AppDispatch, Dependencies>;

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening;

export const addAppListener = addListener as TypedAddListener<
  RootState,
  AppDispatch
>;