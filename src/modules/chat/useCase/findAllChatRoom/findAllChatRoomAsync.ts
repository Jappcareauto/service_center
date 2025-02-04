import { createAppAsyncThunk } from "@/app/createAppAsyncThunk";
import { findAllChatRoomResponse } from "./findAllChatRoomResponse";
import { ChatApiRoutes } from "../../infra/router/ApiRoutes";
import { getErrorState } from "@/shared/errors/getErrorState";

export const findAllChatRoomAsync =
  createAppAsyncThunk<findAllChatRoomResponse>(
    ChatApiRoutes.findAllChatRoom(),
    async (_, { extra: { chatGateway }, rejectWithValue }) => {
      try {
        const response = await chatGateway.findallCHatRoom();
        return response;
      } catch (err) {
        return rejectWithValue(getErrorState(err));
      }
    }
  );
