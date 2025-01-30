import { useEffect } from "react";

import { findAllChatRoomAsync } from "./findAllChatRoomAsync";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { chatRoomSelector } from "../../slice/selector";

export const useFindAllChatRoom = () => {
  const dispatch = useAppDispatch();
  const chatRooms = useAppSelector((state) =>
    chatRoomSelector.selectAll(state)
  );
  // const loading =
  const findAll = async () => {
    const chatRoomRes = await dispatch(findAllChatRoomAsync()).unwrap();
    console.log("chatRoomRes", chatRoomRes);
  };

  useEffect(() => {
    findAll();
  }, []);
  return { state: { chatRooms } };
};
