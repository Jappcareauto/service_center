/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "app", "appointment"],
};

const persistedReducer = persistReducer<any>(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);

export const persistor = persistStore(store);
export default store;
