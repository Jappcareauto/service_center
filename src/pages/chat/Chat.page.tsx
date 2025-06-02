/* eslint-disable @typescript-eslint/no-explicit-any */
import ChatIcon from "@/assets/icons/ChatIcon";
import SearchIcon from "@/assets/icons/SearchIcon";
import Appointment from "@/components/appointment/Appointment.component";
import { AppointmentType } from "@/components/appointment/types";
import Avatar from "@/components/avatar/Avatar.component";
import Button from "@/components/button/Button.component";
import ChatInvoice from "@/components/chat-item/ChatInvoice.component";
import ChatItem from "@/components/chat-item/ChatItem.component";
import MessageComponent from "@/components/chat-item/Message.component";
import Drawer from "@/components/drawer/Drawer.component";
import FilterBar from "@/components/filter-bar/FilterBar.component";
import Input from "@/components/inputs/Input.component";
import NoData from "@/components/no-data/NoData.component";
import Skeleton from "@/components/skeletons/Skeleton.component";
import { ChatStatuses } from "@/constants";
import { MessageType } from "@/enums";
import {
  useGetAppointmentQuery,
  useGetAppointmentsMutation,
  useGetInvoiceByAppointmentQuery,
  useGetServiceCentersMutation,
  useGetUserQuery,
} from "@/redux/api";
import { setAppointmentId } from "@/redux/features/appointment/appointmentSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Message } from "@/types";
import {
  ChatBubbleLeftEllipsisIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Chat = () => {
  const { user_info } = useAppSelector((state) => state.auth);
  const { appointmentId } = useAppSelector((state) => state.appointment);

  const [active, setActive] = useState("");
  // const { appointmentId } = useParams();
  const { data, isLoading } = useGetAppointmentQuery(appointmentId as string, {
    skip: !appointmentId,
  });
  const [activeAppointment, setActiveAppointment] = useState(appointmentId);
  const [getServiceCenters, { data: serviceCenter }] =
    useGetServiceCentersMutation();
  const [getAppointments] =
    useGetAppointmentsMutation();
  const [open, setOpen] = useState(false);
  const [appointmentsList, setAppointmentsList] = useState<AppointmentType[]>(
    []
  );
  const dispatch = useAppDispatch();
  const { data: invoice, isLoading: invoiceLoading } =
    useGetInvoiceByAppointmentQuery(appointmentId as string);
  const { data: user } = useGetUserQuery(
    invoice?.data?.billedFromUserId as string,
    {
      skip: !invoice?.data?.billedFromUserId,
    }
  );
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<any[]>([]);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // Scroll when messages change
  useEffect(() => {
    if (invoice?.data?.billedFromUserId) {
      if (user?.data) {
        const newUser = {
          name: user.data?.name,
          numberOfUnreadMessage: 1,
          time: "9:45 am",
          id: user?.data?.id,
        };
        setCustomers((prevCustomers) => {
          const exists = prevCustomers.some(
            (customer) => customer.id === newUser.id
          );
          if (exists) return prevCustomers;
          return [...prevCustomers, newUser];
        });
      }
    }
  }, [customers, invoice, user]);

  useEffect(() => {
    getAppointments({
      ownerId: serviceCenter?.data?.[0]?.id,
    })
      .unwrap()
      .then((res) => {
        setAppointmentsList(res.data);
      });
    getServiceCenters({
      ownerId: user_info?.userId,
    });
  }, []);
  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: uuidv4(),
      message: input,
      type: MessageType.TEXT,
      isMe: true,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="grid grid-cols-[370px_auto]">
      <div className="border-r border-r-borderColor overflow-y-auto max-h-screen">
        <div className="pr-4 flex flex-col gap-y-6">
          <div className="flex items-center gap-x-4">
            <ChatIcon />
            <h2 className="font-[600]">Chat</h2>
          </div>
          <FilterBar
            onFilter={() => {}}
            filters={ChatStatuses}
            hideLayoutButtons
          />
          <Input
            className="rounded-full bg-primaryAccent border-none"
            placeholder="Search"
            prefixIcon={<SearchIcon />}
          />
        </div>
        <div className="flex flex-col gap-y-7 mt-6 pr-3 pb-10">
          {customers?.map((chat) => {
            return (
              <ChatItem
                {...chat}
                key={chat.name}
                onClick={() => setActive(chat.name)}
                active={active === chat.name}
              />
            );
          })}
        </div>
      </div>
      <div className="relative">
        <div className="w-full border-b border-b-borderColor py-2 px-6 bg-background">
          <Avatar className="w-11 h-11" name="Sara" />
        </div>
        <div className="relative w-full pl-6 py-4 overflow-y-auto pb-16">
          {isLoading || invoiceLoading ? (
            <>
              <Skeleton paragraph={{ rows: 4 }} />
              <Skeleton paragraph={{ rows: 4 }} />
              <Skeleton paragraph={{ rows: 4 }} />
            </>
          ) : !invoice?.data ? (
            <div className="w-full justify-center items-center flex-col flex mt-[20%]">
              <ChatBubbleLeftEllipsisIcon className="text-gray-300 w-16" />
              <p className="text-gray-400 mt-2 text-sm">No chat session started</p>
              <Button
                className="text-sm mt-3 px-8 text-primary bg-background font-bold hover:bg-primaryAccent"
                variant="secondary"
                onClick={() => setOpen(true)}
              >
                See Appointments
              </Button>
            </div>
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
              {messages.map((msg) => (
                <MessageComponent key={msg?.id} msg={msg} />
              ))}
              <div ref={bottomRef} />
            </>
          )}
        </div>
        <div className="py-3 px-6 fixed bottom-0 w-[55%] bg-background flex items-center gap-x-8">
          <Input
            placeholder="write your message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button className="bg-primary rounded-full p-2 hover:opacity-80">
            <PaperAirplaneIcon className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
      <Drawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        title="Select Appointment"
        width={window.innerWidth * 0.4}
      >
        <div className="flex flex-col space-y-4">
          {appointmentsList && appointmentsList?.length > 0 ? (
            appointmentsList?.map((appointment) => (
              <Appointment
                key={appointment.id}
                onClick={() => {
                  setActiveAppointment(appointment?.id);
                  dispatch(setAppointmentId(appointment?.id));
                  navigate(`/chat/${appointment?.id}`);
                  setOpen(false);
                }}
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
      </Drawer>
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
