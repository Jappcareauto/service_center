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
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useGetAppointmentByChatroomQuery,
  useGetAppointmentQuery,
  useGetChatroomMessagesQuery,
  useGetInvoiceByAppointmentQuery,
  useGetUserChatRoomsQuery,
  useGetUserQuery,
  useUploadChatFilesMutation,
} from "@/redux/api";
import { setChatroomId } from "@/redux/features/chat/chatSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { Message } from "@/types";
import { LoadingOutlined } from "@ant-design/icons";
import {
  CameraIcon,
  MicrophoneIcon,
  PaperAirplaneIcon,
  StopIcon,
} from "@heroicons/react/24/outline";
import { Client, IMessage, Stomp } from "@stomp/stompjs";
import { Image, Spin } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { twMerge } from "tailwind-merge";

import Lottie from "lottie-react";
import waveAnimation from "../../assets/lotties/voice_wave.json"; // Adjust path

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

  const [uploadFiles, { isLoading: filesUploading }] =
    useUploadChatFilesMutation();

  const bottomRef = useRef<HTMLDivElement>(null);
  const stompClientRef = useRef<Client | null | any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const audioChunks = useRef<Blob[]>([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [sending, setSending] = useState(false);

  const lottieRef = useRef<any>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [roomId, messages]);

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

          setMessages((prevMessages) => {
            const exists = prevMessages.some((m) => m.id === newMessage.id);
            if (exists) return prevMessages;

            return [...prevMessages, newMessage];
          });

          bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
      );
    });

    return () => {
      stompClient.disconnect(() => {
        console.log("Disconnected from WebSocket");
      });
    };
  }, [chatroomMessages, roomId]);

  const handleUploadFiles = async (files: File[]): Promise<string[]> => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const result = await uploadFiles(formData).unwrap();
      const fileIds = result?.data?.map((file: any) => {
        const segments = file?.url.split("/");
        return segments[segments.length - 1];
      });

      return fileIds || [];
    } catch (error) {
      console.error("File upload error:", error);
      return [];
    } finally {
      setSending(false);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleSendMessage = async () => {
    setSending(true);
    console.log("selectedFiles", selectedFiles);

    const fileIds =
      selectedFiles.length > 0 ? await handleUploadFiles(selectedFiles) : [];

    const payload: any = {
      senderId: user_info?.userId,
      content: message,
      chatRoomId: roomId,
      type: fileIds.length > 0 ? "IMAGE" : "TEXT",
      ...(fileIds.length > 0 && { fileIds }),
    };

    console.log("payload", payload);

    if (stompClientRef.current?.connected) {
      stompClientRef.current.send(
        "/app/chat/message",
        {},
        JSON.stringify(payload)
      );
      setMessage("");
      setSelectedFiles([]);
      setSending(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...newFiles]);
      e.target.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    const updated = [...selectedFiles];
    updated.splice(index, 1);
    setSelectedFiles(updated);
  };

  const startRecording = async () => {
    lottieRef.current?.play();

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);
    setIsRecording(true);

    recorder.start();

    recorder.ondataavailable = (e) => {
      audioChunks.current.push(e.data);
    };

    recorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
      const audioFile = new File([audioBlob], "voice-note.webm", {
        type: "audio/webm",
      });

      audioChunks.current = [];

      // Upload audio file and send message
      const fileIds = await handleUploadFiles([audioFile]);

      const payload: any = {
        senderId: user_info?.userId,
        content: message,
        chatRoomId: roomId,
        type: "AUDIO",
        ...(fileIds.length > 0 && { fileIds }),
      };

      if (stompClientRef.current?.connected) {
        stompClientRef.current.send(
          "/app/chat/message",
          {},
          JSON.stringify(payload)
        );
      }
      setMessage("");
      setSelectedFiles([]);
      setIsRecording(false);
      setMediaRecorder(null);
      lottieRef.current?.stop();
    };
  };

  const stopRecording = () => {
    lottieRef.current?.stop();
    mediaRecorder?.stop();
    setIsRecording(false);
  };

  const isSending = sending || filesUploading;
  const disabledSendButton =
    (!message && selectedFiles?.length === 0) || isSending || isRecording;

  return (
    <DashboardLayout showBack={false}>
      <div className="grid grid-cols-[370px_auto]">
        <div className="border-r border-r-borderColor fixed w-[20vw] overflow-y-auto h-[87vh] pb-2">
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
              className="rounded-full bg-primaryAccent border-none h-10"
              placeholder="Search"
              prefixIcon={<SearchIcon className="w-5 h-5" />}
            />
          </div>
          <div className="flex flex-col gap-y-4 w-auto mt-6 pr-3">
            {chatrooms?.data?.map((room) => {
              return (
                <ChatItem
                  key={room.id}
                  onClick={() => {
                    setRoom(room.id);
                    dispatch(setChatroomId(room?.id));
                    setMessages([]);
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
        <div
          className={twMerge(
            "fixed bg-background w-[61vw] pr-4 h-[78vh] overflow-x-hidden overflow-y-scroll ml-[20vw]",
            selectedFiles.length > 0 && "h-[62vh]",
            isRecording && "h-[58vh]"
          )}
        >
          <div className="w-full border-b border-b-borderColor py-2 px-6">
            <Avatar
              className="w-11 h-11"
              name={receiver?.data?.name}
              label={receiver?.data?.email}
            />
          </div>
          <div
            className={twMerge(
              "relative w-full pl-6 py-4 overflow-y-auto pb-2"
            )}
          >
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
                  description={
                    appointment?.data?.serviceCenter?.location?.description
                  }
                />
                {messages?.map((msg, index) => (
                  <MessageComponent
                    key={`${msg?.id} ${index}`}
                    content={msg?.content}
                    image={msg.image}
                    reply={msg.reply}
                    isMe={msg?.createdBy === user_info?.userId}
                    mediaUrls={msg?.mediaUrls}
                    // type={msg.type}
                  />
                ))}
              </>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="py-3 px-6 fixed bottom-0 w-[61vw] bg-background">
            {selectedFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 my-2">
                {selectedFiles?.map((file, index) => {
                  const objectUrl = URL.createObjectURL(file);
                  return (
                    <div
                      key={index}
                      className="relative rounded-md overflow-hidden bg-gray-50 border border-gray-200"
                    >
                      <Image
                        src={objectUrl}
                        alt={`preview-${index}`}
                        className="w-full h-full object-cover"
                        width={100}
                        height={100}
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-0 right-0 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-bl-md hover:bg-opacity-75 z-50"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
            {isRecording && (
              <div className="w-full flex justify-center items-center animate-bounce">
                <Lottie
                  lottieRef={lottieRef}
                  animationData={waveAnimation}
                  loop
                  autoplay
                  style={{ width: "150px" }}
                />
              </div>
            )}
            <div className=" flex items-center gap-x-8">
              <Input
                placeholder="write your message..."
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                disabled={isSending || filesUploading || isRecording}
                suffixIcon={
                  <div className="flex items-center -right-3 relative">
                    <button
                      className="w-10 flex justify-center items-center  rounded-md h-9 hover:bg-white transition-all duration-300"
                      onClick={handleCameraClick}
                      type="button"
                    >
                      <CameraIcon className="w-5 h-5 text-grey2" />
                    </button>
                    {!isRecording ? (
                      <button
                        className="w-10 flex justify-center items-center rounded-md h-9 hover:bg-white transition-all duration-300"
                        onClick={startRecording}
                        type="button"
                        disabled={
                          isSending ||
                          filesUploading ||
                          !navigator.mediaDevices?.getUserMedia
                        }
                      >
                        <MicrophoneIcon className="w-5 h-5 text-grey2" />
                      </button>
                    ) : (
                      <button
                        className="w-10 flex justify-center items-center rounded-md h-9 hover:bg-white transition-all duration-300"
                        onClick={stopRecording}
                        type="button"
                      >
                        <StopIcon className="w-5 h-5 text-grey2" />
                      </button>
                    )}
                  </div>
                }
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                style={{ display: "none" }}
              />
              <button
                className={twMerge(
                  "bg-primary flex justify-center items-center w-11 h-10 rounded-full hover:opacity-80",
                  disabledSendButton && " bg-gray-300 cursor-not-allowed"
                )}
                type="button"
                onClick={handleSendMessage}
                disabled={disabledSendButton || isSending}
              >
                {isSending ? (
                  <Spin
                    indicator={<LoadingOutlined className="text-white" spin />}
                  />
                ) : (
                  <PaperAirplaneIcon className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chat;
