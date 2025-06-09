/* eslint-disable @typescript-eslint/no-explicit-any */
import ChatIcon from "@/assets/icons/ChatIcon";
import SearchIcon from "@/assets/icons/SearchIcon";
import Appointment from "@/components/appointment/Appointment.component";
import { AppointmentType } from "@/components/appointment/types";
import Avatar from "@/components/avatar/Avatar.component";
import ChatInvoice from "@/components/chat-item/ChatInvoice.component";
import ChatItem from "@/components/chat-item/ChatItem.component";
import MessageComponent from "@/components/chat-item/Message.component";
import FilterBar from "@/components/filter-bar/FilterBar.component";
import Input from "@/components/inputs/Input.component";
import Modal from "@/components/modals/Modal.component";
import NoData from "@/components/no-data/NoData.component";
import Skeleton from "@/components/skeletons/Skeleton.component";
import { ChatStatuses } from "@/constants";
import { MessageType } from "@/enums";
import {
  useGetAppointmentQuery,
  useGetAppointmentsMutation,
  useGetChatroomByAppointmentQuery,
  useGetInvoiceByAppointmentQuery,
  useGetServiceCentersMutation,
  useGetUserQuery,
} from "@/redux/api";
import { setAppointmentId } from "@/redux/features/appointment/appointmentSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Message } from "@/types";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Client, IMessage, Stomp } from "@stomp/stompjs";
import dayjs from "dayjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";

const wsUrl = "https://bpi.jappcare.com/ws";

const Chat = () => {
  const { user_info } = useAppSelector((state) => state.auth);
  const { appointmentId } = useAppSelector((state) => state.appointment);
  const [activeAppointment, setActiveAppointment] = useState("");
  const appId = appointmentId ?? activeAppointment;
  const { data: chatroom } = useGetChatroomByAppointmentQuery(appId, {
    skip: !appId,
  });
  // const { data: chatroomMessages } = useGetChatroomMessagesQuery(
  //   chatroom?.data?.id as string,
  //   {
  //     skip: !chatroom?.data?.id,
  //   }
  // );
  // const { appointmentId } = useParams();
  const { data, isLoading } = useGetAppointmentQuery(appointmentId as string, {
    skip: !appointmentId,
  });
  const { data: receiver } = useGetUserQuery(data?.data?.createdBy as string, {
    skip: !appointmentId || !data?.data?.createdBy,
  });
  const [getServiceCenters, { data: serviceCenter }] =
    useGetServiceCentersMutation();
  const [getAppointments] = useGetAppointmentsMutation();
  const [open, setOpen] = useState(false);
  const [appointmentsList, setAppointmentsList] = useState<AppointmentType[]>(
    []
  );
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
    getServiceCenters({
      ownerId: user_info?.userId,
    }).then(() => {
      getAppointments({
        ownerId: serviceCenter?.data?.[0]?.id,
      })
        .unwrap()
        .then((res) => {
          setAppointmentsList(res.data);
        });
    });
  }, []);

  useEffect(() => {
    const socket = new SockJS(wsUrl);
    const stompClient = Stomp.over(socket);
    stompClientRef.current = stompClient;

    stompClient.connect({}, () => {
      console.log(`Connected to WebSocket`);
      stompClient.subscribe(
        `/topic/chatroom/${chatroom?.data?.id}`,
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
  }, [chatroom?.data?.id]);

  const handleSendMessage = useCallback(() => {
    if (message && stompClientRef.current?.connected) {
      const payload = {
        senderId: user_info?.userId,
        content: message,
        chatRoomId: chatroom?.data?.id,
        type: MessageType.TEXT,
      };
      stompClientRef.current?.send(
        "/app/chat/message",
        {},
        JSON.stringify(payload)
      );
      setMessage("");
    }
  }, [chatroom?.data?.id, message, user_info?.userId]);

  return (
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
            <button
              className="text-sm text-primary bg-background space-x-2 font-semibold hover:opacity-95 flex items-center"
              onClick={() => setOpen(true)}
            >
              <span>Select Appointments</span>
              <PlusIcon className="w-5 h-5" />
            </button>
          </div>
          <Input
            className="rounded-full bg-primaryAccent border-none"
            placeholder="Search"
            prefixIcon={<SearchIcon />}
          />
        </div>
        <div className="flex flex-col gap-y-7 mt-6 pr-3 pb-10">
          {appointmentsList?.map((appt) => {
            return (
              <ChatItem
                key={appt.id}
                onClick={() => {
                  setActiveAppointment(appt.id as string);
                  dispatch(setAppointmentId(appt?.id));
                }}
                active={activeAppointment === appt.id}
                time={dayjs(appt.createdAt).format("h:mm a")}
                label={`${appt?.vehicle?.description}`}
                name={appt?.vehicle?.name}
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
                vehicle={data?.data?.vehicle}
                amount={`${invoice?.data?.money?.amount} ${invoice?.data?.money?.currency}`}
                dueDate={invoice?.data?.dueDate}
                service={data?.data?.service}
                onView={() => navigate(`/appointment/${appointmentId}`)}
                timeOfDay={data?.data?.timeOfDay}
              />
              {messages?.map((msg, index) => (
                <MessageComponent
                  key={`${msg?.id} ${index}`}
                  content={msg?.content}
                  image={msg.image}
                  reply={msg.reply}
                  isMe={msg?.createdBy === user_info?.userId}
                  type={msg.type}
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
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        title="Select Appointment"
        width={window.innerWidth * 0.42}
      >
        <div className="flex flex-col space-y-4 mt-4">
          {appointmentsList && appointmentsList?.length > 0 ? (
            appointmentsList?.map((appointment) => (
              <Appointment
                key={appointment.id}
                onClick={() => {
                  setActiveAppointment(appointment?.id as string);
                  dispatch(setAppointmentId(appointment?.id));
                  navigate(`/chat/${appointment?.id}`);
                  setOpen(false);
                }}
                isSmall
                active={activeAppointment === appointment?.id}
                {...appointment}
              />
            ))
          ) : (
            <NoData
              title="No Appointments"
              message="You haven’t scheduled any appointments yet."
              isLoading={isLoading}
              dataLength={appointmentsList?.length}
            />
          )}
        </div>
      </Modal>
    </div>
    // <>
    //   {" "}
    //   <div>
    //     <h1>Chat</h1>
    //     <Chatroom appointmentId={appointmentId} userId={user_info?.userId} />
    //   </div>
    // </>
  );
};

export default Chat;
