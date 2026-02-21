/* eslint-disable @typescript-eslint/no-explicit-any */
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
  useDeleteMessageMutation,
  useGetAppointmentQuery,
  useGetChatContactsQuery,
  useGetChatroomMessagesQuery,
  useGetInvoiceByAppointmentQuery,
  useUploadChatFilesMutation,
} from "@/redux/api";
import { setChatroomId, setReceiver } from "@/redux/features/chat/chatSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { Message, User } from "@/types";
import { LoadingOutlined } from "@ant-design/icons";
import {
  ArrowUpIcon,
  CameraIcon,
  MicrophoneIcon,
  PaperAirplaneIcon,
  StopIcon,
} from "@heroicons/react/24/outline";
import { Image, Spin } from "antd";
import dayjs from "dayjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import images from "@/assets/images";
import Button from "@/components/button/Button.component";
import { AppLoader } from "@/components/loader/Fallback.component";
import Modal from "@/components/modals/Modal.component";
import { useToast } from '@/context/ToastContext';
import { MessageType, ToastType } from "@/enums";
import { useChatService } from "@/hooks/useChatService";
import { formatAmount } from "@/utils";
import Lottie from "lottie-react";
import waveAnimation from "../../assets/lotties/voice_wave.json"; // Adjust path

const Chat = () => {
  const { user_info, accessToken } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { chatroomId, receiver } = useAppSelector(
    (state: RootState) => state.chat
  );
  const [room, setRoom] = useState("");
  const roomId = chatroomId ?? room;

  const { data: chatroomMessages } = useGetChatroomMessagesQuery(
    roomId as string,
    {
      skip: !roomId,
    }
  );
  const { data, isLoading } = useGetAppointmentQuery(
    receiver?.appointmentId as string,
    {
      skip: !receiver?.appointmentId,
    }
  );
  const dispatch = useAppDispatch();
  const { data: invoice, isLoading: invoiceLoading } =
    useGetInvoiceByAppointmentQuery(receiver?.appointmentId as string, {
      skip: !receiver?.appointmentId,
    });
  const navigate = useNavigate();

  const [uploadFiles, { isLoading: filesUploading }] =
    useUploadChatFilesMutation();

  const { data: chatContacts, isLoading: chatContactsLoading } =
    useGetChatContactsQuery(undefined);

  const [deleteMessage, { isLoading: deleteLoading }] =
    useDeleteMessageMutation();

  const bottomRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
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
  const [deleteId, setDeleteId] = useState("");
  const { toast } = useToast();

  const lottieRef = useRef<any>(null);

  const handleMessageReceived = useCallback((message: any) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const {
    connected,
    error,
    connect,
    loading,
    disconnect,
    sendMessage,
    // markAsRead,
  } = useChatService({
    chatId: roomId,
    token: accessToken,
    onMessageReceived: handleMessageReceived,
  });
  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatroomMessages, messages, loading]);

  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView();
    }
  };
  useEffect(() => {
    if (chatroomMessages?.data) {
      setMessages(chatroomMessages.data);
    }
  }, [chatroomMessages]);

  useEffect(() => {
    const currentUser = chatContacts?.data?.customers?.find((item: User) => {
      return item?.chatRoomId === roomId;
    });
    if (currentUser) {
      dispatch(setReceiver(currentUser as User));
      setMessage("");
      scrollToBottom();
    }
  }, [chatContacts, connect, dispatch, roomId]);
  // // Mark messages as read when viewed
  // useEffect(() => {
  //   messages.forEach((msg) => {
  //     if (msg.senderId !== user?.id) {
  //       markAsRead(msg.id, user?.id);
  //     }
  //   });
  // }, [messages, user?.id, markAsRead]);
  useEffect(() => {
    if (!roomId || !accessToken) return;
    connect();
    return () => disconnect();
  }, [accessToken, connect, disconnect, roomId]);

  const handleSendMessage = useCallback(() => {
    if (!roomId || !user_info?.userId) return;

    const hasFiles = selectedFiles.length > 0;
    const hasText = message.trim().length > 0;
    if (!hasFiles && !hasText) return;

    if (hasFiles) {
      setSending(true);
      const firstFile = selectedFiles[0];
      let fileType = MessageType.IMAGE;
      if (firstFile.type.startsWith("video/")) fileType = MessageType.VIDEO;
      if (firstFile.type.startsWith("audio/")) fileType = MessageType.AUDIO;
      uploadFiles({
        chatId: roomId,
        senderId: user_info.userId,
        type: fileType,
        content: hasText ? message : "NO_TEXT",
        files: selectedFiles,
      })
        .unwrap()
        .then((res) => {
          if (res?.data) {
            setMessages((prev) => [...prev, res.data]);
          }
          setSelectedFiles([]);
          setMessage("");
          scrollToBottom();
        })
        .catch((err) => {
          console.error("Upload Error:", err);
        })
        .finally(() => {
          setSending(false);
        });
    } else {
      const success = sendMessage(message, user_info.userId, "TEXT");
      if (success) {
        setMessage("");
        scrollToBottom();
      } else {
        console.error("Socket message failed");
      }
    }
  }, [roomId, user_info, message, selectedFiles, uploadFiles, sendMessage]);

  const onDelete = () => {
    deleteMessage(deleteId)
      .unwrap()
      .then((res) => {
        if (res?.meta?.message) {
          toast(ToastType.SUCCESS, res?.meta?.message as string);
        }
      })
      .catch((err) => {
        const validationErrors = err?.data?.errors;
        if (validationErrors) {
          Object.values(validationErrors).forEach((errorMessage) => {
            toast(ToastType.ERROR, errorMessage as string);
          });
        } else if (err?.data?.message || err?.message) {
          toast(ToastType.ERROR, err?.data?.message || err?.message);
        } else {
          toast(ToastType.ERROR, "Update failed!");
        }
      })
      .finally(() => {
        setDeleteId("");
      });
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

      try {
        setSending(true);
        await uploadFiles({
          chatId: roomId,
          senderId: user_info?.userId,
          type: MessageType.AUDIO,
          content: "Voice Note",
          files: [audioFile],
        }).unwrap();

        setMessage("");
        setIsRecording(false);
        setMediaRecorder(null);
        lottieRef.current?.stop();
      } catch (error) {
        console.error("Voice note upload failed", error);
      } finally {
        setSending(false);
      }
    };
  };

  const stopRecording = () => {
    lottieRef.current?.stop();
    mediaRecorder?.stop();
    setIsRecording(false);
  };

  const onUserClick = (cus: User) => {
    if (!cus.chatRoomId) return;
    setRoom(cus.chatRoomId as string);
    dispatch(setChatroomId(cus?.chatRoomId));
    dispatch(setReceiver(cus as User));
    setMessage("");
    if (roomId === cus.chatRoomId && connected) return;
    connect();
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
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
    if (index === 0) {
      setSelectedFiles([]);
      return;
    }
    setSelectedFiles(updated);
  };

  const isSending = filesUploading || sending;

  const disabledSendButton =
    (!message.trim() && selectedFiles.length === 0) ||
    isSending ||
    isRecording ||
    !connected;

  return (
    <DashboardLayout showBack={false}>
      <div className="grid grid-cols-[370px_auto]">
        <div className="border-r border-r-gray-200 fixed w-[20vw] overflow-y-auto h-[87vh] pb-2">
          <div className="pr-4 flex flex-col gap-y-6">
            <div className="flex justify-between">
              <FilterBar
                onFilter={() => {}}
                filters={ChatStatuses}
                hideLayoutButtons
              />
            </div>
            <Input
              className="rounded-full bg-white border border-primaryLight h-10"
              placeholder="Search"
              prefixIcon={<SearchIcon className="w-5 h-5" color="#b4b4b4" />}
            />
          </div>
          <div className="flex flex-col gap-y-4 w-auto mt-6 pr-3">
            {chatContactsLoading ? (
              <Skeleton paragraph={{ rows: 8 }} />
            ) : (
              chatContacts?.data?.customers?.map((cus, index) => {
                return (
                  cus?.chatRoomId && (
                    <ChatItem
                      key={`${cus.id} - ${cus.chatRoomId} - ${index}`}
                      onClick={() => {
                        onUserClick(cus);
                      }}
                      active={roomId === cus.chatRoomId}
                      time={dayjs(cus.createdAt).format("h:mm a")}
                      // lastMessage={`${cus?.email}`}
                      name={cus?.name ?? "Unknown Name"}
                    />
                  )
                );
              })
            )}
          </div>
        </div>
        <>
          {!receiver ? (
            <div className="fixed bg-background flex flex-col justify-center items-center w-[61vw] pr-4 h-[78vh] overflow-x-hidden ml-[20vw]">
              <div className="w-32">
                <img src={images.logo} alt="Logo" className="h-full w-full" />
              </div>
              <div className="mt-4">
                {!loading && receiver ? (
                  <AppLoader />
                ) : (
                  <p className="text-gray-400">Start Chatting With Customers</p>
                )}
              </div>
            </div>
          ) : (
            <div
              className={twMerge(
                "fixed bg-background w-[61vw] pr-4 h-[78vh] overflow-x-hidden ml-[20vw]",
                selectedFiles.length > 0 && "h-[62vh]",
                isRecording && "h-[58vh]"
              )}
            >
              <div className="w-full border-b border-b-gray-100 flex justify-between pb-4 px-6">
                <Avatar
                  name={receiver?.name}
                  // label={receiver?.email}
                />
                <div
                  className={twMerge(
                    "flex space-x-4 items-center",
                    loading && "hidden"
                  )}
                >
                  <Button
                    className={twMerge(
                      "text-sm border border-primaryAccent bg-white rounded-full"
                    )}
                    variant="tertiary"
                    onClick={scrollToTop}
                    rightIcon={<ArrowUpIcon className="w-3 h-3 text-grey2" />}
                  >
                    Pinned Appointment
                  </Button>
                  <div className="text-xs">
                    {connected ? "🟢" : "🔴"}
                    {!loading && error && (
                      <span className="error">{error}</span>
                    )}
                  </div>
                </div>
              </div>
              <div
                className={twMerge(
                  "fixed bg-background w-[61vw] pr-4 overflow-x-hidden overflow-y-scroll",
                  selectedFiles?.length > 0 ? "h-[50vh]" : "h-[70vh]"
                )}
              >
                {loading && (
                  <div className="fixed flex justify-center items-center z-50 bg-lightBg flex-col w-[61vw] h-[80vh]">
                    <AppLoader />
                    <p className="mt-4 text-gray-400">
                      Connecting Please Wait...
                    </p>
                  </div>
                )}
                <div ref={topRef} />
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
                    data?.data && (
                      <>
                        <ChatInvoice
                          vehicle={data?.data?.vehicle}
                          amount={
                            invoice?.data?.money &&
                            `${formatAmount(
                              invoice?.data?.money?.amount.toString()
                            )} ${invoice?.data?.money?.currency}`
                          }
                          dueDate={invoice?.data?.dueDate}
                          service={data?.data?.service}
                          onView={() =>
                            navigate(`/appointment/${data?.data?.id}`)
                          }
                          timeOfDay={data?.data?.timeOfDay}
                          onInvoice={() =>
                            navigate(`/create-invoice/${data?.data?.id}`)
                          }
                          onInvoiceDetails={() =>
                            navigate(`/invoice/${invoice?.data?.id}`)
                          }
                          hasInvoice={invoice?.data !== undefined}
                          location={data?.data?.location?.name}
                          description={
                            data?.data?.serviceCenter?.location?.description
                          }
                        />
                        {messages?.map((msg, index) => (
                          <MessageComponent
                            key={`${msg?.id} ${index}`}
                            content={msg.content}
                            image={msg.image}
                            reply={msg.reply}
                            isMe={msg?.createdBy === user_info?.userId}
                            mediaUrls={msg?.mediaUrls}
                            timestamp={msg?.timestamp}
                            id={msg?.id}
                            onDelete={(id) => setDeleteId(id)}
                          />
                        ))}
                      </>
                    )
                  )}
                </div>
                <div ref={bottomRef} />
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
                      className="pr-24"
                      placeholder="write your message..."
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
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
                                isSending || filesUploading
                                // || !navigator.mediaDevices?.getUserMedia
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
                          indicator={
                            <LoadingOutlined className="text-white" spin />
                          }
                        />
                      ) : (
                        <PaperAirplaneIcon className="w-6 h-6 text-white" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      </div>
      <Modal
        open={deleteId.length > 0}
        onCancel={() => setDeleteId("")} // Note: antd uses onCancel for the 'x' and backdrop
        title="Delete Message"
        onOk={onDelete}
        width={window.innerWidth < 768 ? "90%" : "30%"}
        okText="Delete"
        okButtonProps={{ danger: true }}
        confirmLoading={deleteLoading}
      >
        <p>
          Are you sure you want to delete this message? This action cannot be
          undone.
        </p>
      </Modal>
    </DashboardLayout>
  );
};

export default Chat;
