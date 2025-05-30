import { LanguageType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  languages: LanguageType[];
}

const initialState: AppState = {
  languages: []
};

const authSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLanguages: (state, { payload }) => {
      state.languages = payload;
    }
  }
});

export const { setLanguages } = authSlice.actions;
export default authSlice.reducer;
