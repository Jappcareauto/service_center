import { User } from '@/types';
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  chatroomId: string;
  receiver: User | null
}

const initialState: AuthState = {
  chatroomId: "",
  receiver: null
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatroomId: (state, { payload }) => {
      state.chatroomId = payload;
    },
    setReceiver: (state, { payload }) => {
      state.receiver = payload;
    },
  },
});

export const { setChatroomId, setReceiver } = chatSlice.actions;
export default chatSlice.reducer;
