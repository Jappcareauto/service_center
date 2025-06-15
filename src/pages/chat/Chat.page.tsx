/* eslint-disable @typescript-eslint/no-explicit-any */
import ChatIcon from "@/assets/icons/ChatIcon";
import SearchIcon from "@/assets/icons/SearchIcon";
import Avatar from "@/components/avatar/Avatar.component";
import ChatInvoice from "@/components/chat-item/ChatInvoice.component";
import ChatItem from "@/components/chat-item/ChatItem.component";
import MessageComponent from "@/components/chat-item/Message.component";
import FilterBar from "@/components/filter-bar/FilterBar.component";
import Input from "@/components/inputs/Input.component";
import Skeleton from "@/components/skeletons/Skeleton.component";
import { ChatStatuses } from "@/constants";
import { MessageType } from "@/enums";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useGetAppointmentByChatroomQuery,
  useGetAppointmentQuery,
  useGetChatroomMessagesQuery,
  useGetInvoiceByAppointmentQuery,
  useGetUserChatRoomsQuery,
  useGetUserQuery,
} from "@/redux/api";
import { setChatroomId } from "@/redux/features/chat/chatSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { Message } from "@/types";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Client, IMessage, Stomp } from "@stomp/stompjs";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";

const wsUrl = "https://bpi.jappcare.com/ws";

const Chat = () => {
  const { user_info, user } = useAppSelector((state: RootState) => state.auth);
  const { chatroomId } = useAppSelector((state: RootState) => state.chat);
  const { appointmentId } = useAppSelector((state) => state.appointment);
  const [room, setRoom] = useState("");
  const { data: chatrooms } = useGetUserChatRoomsQuery(user?.id, {
    skip: !user?.id,
  });
  const roomId = chatroomId ?? room;
  const { data: appointment, refetch } = useGetAppointmentByChatroomQuery(
    roomId,
    {
      skip: !roomId,
    }
  );

  const { data: chatroomMessages, refetch: refetchChatroomMessages } =
    useGetChatroomMessagesQuery(roomId as string, {
      skip: !roomId,
    });
  const { data, isLoading } = useGetAppointmentQuery(appointmentId as string, {
    skip: !appointmentId,
  });
  const { data: receiver } = useGetUserQuery(data?.data?.createdBy as string, {
    skip: !appointmentId || !data?.data?.createdBy,
  });
  const dispatch = useAppDispatch();
  const { data: invoice, isLoading: invoiceLoading } =
    useGetInvoiceByAppointmentQuery(appointmentId as string);
  const navigate = useNavigate();

  const bottomRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const stompClientRef = useRef<Client | null | any>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (chatroomMessages?.data && chatroomMessages?.data?.length > 0) {
      const newMessages = chatroomMessages?.data;
      setMessages((prev) => [...prev, ...newMessages]);
    }
  }, [chatroomMessages]);

  useEffect(() => {
    // Cleanup existing connection if already connected
    if (stompClientRef.current?.connected) {
      stompClientRef.current.disconnect();
    }

    const socket = new SockJS(wsUrl);
    const stompClient = Stomp.over(socket);
    stompClientRef.current = stompClient;

    stompClient.connect({}, () => {
      stompClient.subscribe(
        `/topic/chatroom/${roomId}`,
        (messageOutput: IMessage) => {
          const newMessage: Message = JSON.parse(messageOutput.body);
          setMessages((prev) => [...prev, newMessage]);
        }
      );
    });

    return () => {
      stompClient.disconnect(() => {
        console.log("Disconnected from WebSocket");
      });
    };
  }, [roomId]);

  const handleSendMessage = () => {
    if (message && stompClientRef.current?.connected) {
      const payload = {
        senderId: user_info?.userId,
        content: message,
        chatRoomId: roomId,
        type: MessageType.IMAGE,
      };
      stompClientRef.current?.send(
        "/app/chat/message",
        {},
        JSON.stringify(payload)
      );
      setMessage("");
    }
  };

  return (
    <DashboardLayout showBack={false}>
      <div className="grid grid-cols-[370px_auto]">
        <div className="border-r border-r-borderColor overflow-y-auto max-h-screen">
          <div className="pr-4 flex flex-col gap-y-6">
            <div className="flex items-center gap-x-4">
              <ChatIcon />
              <h2 className="font-[600]">Chat</h2>
            </div>
            <div className="flex justify-between">
              <FilterBar
                onFilter={() => {}}
                filters={ChatStatuses}
                hideLayoutButtons
              />
            </div>
            <Input
              className="rounded-full bg-primaryAccent border-none"
              placeholder="Search"
              prefixIcon={<SearchIcon />}
            />
          </div>
          <div className="flex flex-col gap-y-7 mt-6 pr-3 pb-10">
            {chatrooms?.data?.map((room) => {
              return (
                <ChatItem
                  key={room.id}
                  onClick={() => {
                    setRoom(room.id);
                    dispatch(setChatroomId(room?.id));
                    refetch();
                    refetchChatroomMessages();
                  }}
                  active={roomId === room.id}
                  time={dayjs(room.createdAt).format("h:mm a")}
                  label={`${room?.name}`}
                  name={room?.name}
                />
              );
            })}
          </div>
        </div>
        <div className="relative">
          <div className="w-full border-b border-b-borderColor py-2 px-6 bg-background">
            <Avatar
              className="w-11 h-11"
              name={receiver?.data?.name}
              label={receiver?.data?.email}
            />
          </div>
          <div className="relative w-full pl-6 py-4 overflow-y-auto pb-16">
            {isLoading || invoiceLoading ? (
              <>
                <Skeleton paragraph={{ rows: 4 }} />
                <Skeleton paragraph={{ rows: 4 }} />
                <Skeleton paragraph={{ rows: 4 }} />
              </>
            ) : (
              <>
                <ChatInvoice
                  vehicle={appointment?.data?.vehicle}
                  amount={
                    invoice?.data?.money &&
                    `${invoice?.data?.money?.amount} ${invoice?.data?.money?.currency}`
                  }
                  dueDate={invoice?.data?.dueDate}
                  service={appointment?.data?.service}
                  onView={() =>
                    navigate(`/appointment/${appointment?.data?.id}`)
                  }
                  timeOfDay={appointment?.data?.timeOfDay}
                  onInvoice={() =>
                    navigate(`/create-invoice/${appointment?.data?.id}`)
                  }
                  hasInvoice={invoice?.data !== undefined}
                  location={appointment?.data?.location?.name}
                  description={appointment?.data?.serviceCenter?.location?.description}
                />
                {messages?.map((msg, index) => (
                  <MessageComponent
                    key={`${msg?.id} ${index}`}
                    content={msg?.content}
                    image={msg.image}
                    reply={msg.reply}
                    isMe={msg?.createdBy === user_info?.userId}
                    // type={msg.type}
                  />
                ))}
                <div ref={bottomRef} />
              </>
            )}
          </div>
          <div className="py-3 px-6 fixed bottom-0 w-[55%] bg-background flex items-center gap-x-8">
            <Input
              placeholder="write your message..."
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <button className="bg-primary rounded-full p-2 hover:opacity-80">
              <PaperAirplaneIcon className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chat;
