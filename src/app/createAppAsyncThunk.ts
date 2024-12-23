import { createAsyncThunk } from "@reduxjs/toolkit";
import { Dependencies } from "./Dependencies";
import { AppDispatch, RootState } from "./store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState,
  dispatch: AppDispatch,
  extra: Dependencies
}>()