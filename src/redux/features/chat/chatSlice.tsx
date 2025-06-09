import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  chatroomId: string;
}

const initialState: AuthState = {
  chatroomId: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatroomId: (state, { payload }) => {
      state.chatroomId = payload;
    },
  },
});

export const { setChatroomId } = chatSlice.actions;
export default chatSlice.reducer;
