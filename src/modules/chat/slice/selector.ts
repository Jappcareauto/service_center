import { RootState } from "@/app/store";
import { chatRoomAdapter } from "./messageSlice";

export const loading = (state: RootState) => state.chatRoom.loading;
const chatRoomAdapterSelector = chatRoomAdapter.getSelectors<RootState>(
  (state) => state.chatRoom.chatRooms
);

export const chatRoomSelector = {
  loading,
  ...chatRoomAdapterSelector,
};
