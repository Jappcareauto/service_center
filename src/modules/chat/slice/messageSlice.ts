import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ChatRoomModel } from "../models/ChatRoomModel";
import { LoadingState } from "@/shared/enums/LoadingState";
import { findAllChatRoomAsync } from "../useCase/findAllChatRoom/findAllChatRoomAsync";

interface InitialState {
  chatRooms: {
    ids: string[];
    entities: Record<string, ChatRoomModel>;
  };
  loading: LoadingState;
}

const initialState: InitialState = {
  chatRooms: {
    ids: [],
    entities: {},
  },
  loading: LoadingState.idle,
};

// Define the sortComparer function
const sortComparer = (a: ChatRoomModel, b: ChatRoomModel) =>
  a.name.localeCompare(b.name);

export const chatRoomAdapter = createEntityAdapter<ChatRoomModel>({
  sortComparer,
});

export const chatRoomSlice = createSlice({
  name: "chatRoom",
  initialState,
  reducers: {
    addChatRoom: (state, action: PayloadAction<ChatRoomModel>) => {
      chatRoomAdapter.addOne(state.chatRooms, action.payload);
    },
    updateChatRoom: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<ChatRoomModel> }>
    ) => {
      chatRoomAdapter.updateOne(state.chatRooms, action.payload);
    },
    removeChatRoom: (state, action: PayloadAction<string>) => {
      chatRoomAdapter.removeOne(state.chatRooms, action.payload);
    },
    updateChatRooms: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<ChatRoomModel> }[]>
    ) => {
      chatRoomAdapter.updateMany(state.chatRooms, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(findAllChatRoomAsync.pending, (state) => {
      state.loading = LoadingState.pending;
    });
    builder.addCase(findAllChatRoomAsync.rejected, (state) => {
      state.loading = LoadingState.failed;
    });
    builder.addCase(findAllChatRoomAsync.fulfilled, (state, action) => {
      state.loading = LoadingState.success;
      chatRoomAdapter.setAll(state.chatRooms, action.payload);
    });
  },
});

export const { addChatRoom, updateChatRoom, removeChatRoom, updateChatRooms } =
  chatRoomSlice.actions;

export default chatRoomSlice.reducer;
