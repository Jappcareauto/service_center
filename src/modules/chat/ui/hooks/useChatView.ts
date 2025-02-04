import { useFindAllChatRoom } from "@/modules/chat/useCase/findAllChatRoom/useFindAllChatRoom";

export const useChatView = () => {
  const { state: chatRoomsState } = useFindAllChatRoom();
  return {
    state: {
       chatRoomsState,
    },
  };
};
