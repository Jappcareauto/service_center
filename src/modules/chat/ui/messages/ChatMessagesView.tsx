import IMAGES from "@/assets/images";
import Avatar from "@/shared/generics/Avatar";
import { Message, MessageType } from "../../models/Message";
import ChatCarComponent from "../components/ChatCarComponent";
import MessageComponent from "../components/MessageComponent";

const groupedMessages: { date: string; messages: Message[] }[] = [
  {
    date: "",
    messages: [
      {
        message:
          "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate?",
        type: MessageType.BASIC,
      },
    ],
  },
  {
    date: "",
    messages: [
      {
        message:
          "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate?",
        isMe: true,
        type: MessageType.BASIC,
      },
      {
        message: "Yorem ipsum dolor sit amet,",
        isMe: true,
        type: MessageType.BASIC,
      },
    ],
  },
  {
    date: "",
    messages: [
      {
        message:
          "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate?",
        image: IMAGES.food,
        type: MessageType.BASIC,
      },
    ],
  },
  {
    date: "",
    messages: [
      {
        message:
          "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate?",
        reply:
          "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate?",
        isMe: true,
        type: MessageType.BASIC,
      },
      {
        message: "Yorem ipsum dolor sit amet,",
        isMe: true,
        type: MessageType.VOICE,
      },
      { message: "", isMe: true, type: MessageType.INVOICE },
      {
        message: "",
        isMe: true,
        type: MessageType.IMAGE,
        image: IMAGES.food2,
      },
    ],
  },
];

const ChatMessagesView = () => {
  return (
    <div className="">
      <div className="w-full border-b border-b-borderColor py-2 px-6 bg-background">
        <Avatar className="w-11 h-11" name="Sara" />
      </div>
      <div className="h-[calc(100vh-220px)] relative w-full pl-6 py-4 overflow-y-auto">
        <ChatCarComponent />
        {groupedMessages.map((group, index) => {
          return (
            <div key={"group-" + index} className="flex flex-col gap-y-1 mb-4">
              {group.messages.map((message, index) => {
                return (
                  <MessageComponent key={"message-" + index} msg={message} />
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="py-2 px-4   ">
        <div className="flex gap-x-2 items-center mb-4  w-full   z-10 bottom-0 ">
          <div className=" w-full min-h-12 bg-primaryAccent  rounded-full px-4 flex items-center justify-between">
            <input className="h-full w-full bg-inherit outline-none" />
            <div className="flex items-center gap-x-3 ">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.82841 10.4848L10.4853 4.8279C11.6568 3.65633 13.5563 3.65633 14.7279 4.8279C15.8995 5.99947 15.8995 7.89897 14.7279 9.07054L8.01039 15.7881C7.4246 16.3738 6.47485 16.3738 5.88907 15.7881C5.30328 15.2023 5.30328 14.2525 5.88907 13.6667L11.8995 7.65633C12.0947 7.46106 12.0947 7.14448 11.8995 6.94922C11.7042 6.75396 11.3876 6.75396 11.1924 6.94922L5.18196 12.9596C4.20565 13.9359 4.20565 15.5189 5.18196 16.4952C6.15827 17.4715 7.74118 17.4715 8.71749 16.4952L15.435 9.77765C16.9971 8.21555 16.9971 5.68289 15.435 4.12079C13.8729 2.55869 11.3403 2.55869 9.77815 4.12079L4.1213 9.77765C3.92604 9.97291 3.92604 10.2895 4.1213 10.4848C4.31656 10.68 4.63315 10.68 4.82841 10.4848Z"
                  fill="#111111"
                />
              </svg>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.99994 6.00003C7.7908 6.00003 5.99994 7.79089 5.99994 10C5.99994 12.2092 7.7908 14 9.99994 14C12.2091 14 13.9999 12.2092 13.9999 10C13.9999 7.79089 12.2091 6.00003 9.99994 6.00003ZM6.99994 10C6.99994 8.34318 8.34308 7.00003 9.99994 7.00003C11.6568 7.00003 12.9999 8.34318 12.9999 10C12.9999 11.6569 11.6568 13 9.99994 13C8.34308 13 6.99994 11.6569 6.99994 10ZM8.12387 2C7.55682 2 7.03824 2.31977 6.78361 2.82643L6.19412 3.9994H4.50464C3.12393 3.9994 2.00464 5.11868 2.00464 6.4994V14.5C2.00464 15.8807 3.12393 17 4.50464 17H15.5046C16.8854 17 18.0046 15.8807 18.0046 14.5V6.4994C18.0046 5.11869 16.8854 3.9994 15.5046 3.9994H13.8147L13.2298 2.8293C12.9757 2.32106 12.4563 2 11.8881 2H8.12387ZM7.67712 3.27548C7.762 3.10659 7.93486 3 8.12387 3H11.8881C12.0775 3 12.2506 3.10702 12.3353 3.27643L13.0584 4.72296C13.1431 4.89238 13.3162 4.9994 13.5056 4.9994H15.5046C16.3331 4.9994 17.0046 5.67097 17.0046 6.4994V14.5C17.0046 15.3284 16.3331 16 15.5046 16H4.50464C3.67621 16 3.00464 15.3284 3.00464 14.5V6.4994C3.00464 5.67097 3.67621 4.9994 4.50464 4.9994H6.50243C6.69145 4.9994 6.86431 4.89281 6.94919 4.72392L7.67712 3.27548Z"
                  fill="#111111"
                />
              </svg>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 13C11.6569 13 13 11.6568 13 9.99998V5C13 3.34315 11.6569 2 10 2C8.34315 2 7 3.34315 7 5V9.99998C7 11.6568 8.34315 13 10 13ZM10 12C8.89543 12 8 11.1046 8 9.99998V5C8 3.89543 8.89543 3 10 3C11.1046 3 12 3.89543 12 5V9.99998C12 11.1046 11.1046 12 10 12ZM5 9.49998C5.27614 9.49998 5.5 9.72384 5.5 9.99998C5.5 12.4853 7.51472 14.5 10 14.5C12.4853 14.5 14.5 12.4853 14.5 9.99998C14.5 9.72384 14.7239 9.49998 15 9.49998C15.2761 9.49998 15.5 9.72384 15.5 9.99998C15.5 12.869 13.3033 15.2249 10.5 15.4776V17.5C10.5 17.7761 10.2761 18 10 18C9.72386 18 9.5 17.7761 9.5 17.5V15.4776C6.69675 15.2249 4.5 12.869 4.5 9.99998C4.5 9.72384 4.72386 9.49998 5 9.49998Z"
                  fill="#111111"
                />
              </svg>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33325 15.5375V6.71123C3.33325 4.33289 3.33325 3.14372 4.06549 2.40487C4.79772 1.66602 5.97623 1.66602 8.33325 1.66602H11.6666C14.0236 1.66602 15.2021 1.66602 15.9343 2.40487C16.6666 3.14372 16.6666 4.33289 16.6666 6.71123V15.5375C16.6666 16.7973 16.6666 17.4271 16.2816 17.675C15.6525 18.0803 14.68 17.2305 14.1908 16.9221C13.7867 16.6672 13.5847 16.5398 13.3603 16.5324C13.118 16.5244 12.9123 16.6467 12.4757 16.9221L10.8833 17.9263C10.4537 18.1972 10.2389 18.3327 9.99992 18.3327C9.76092 18.3327 9.54617 18.1972 9.11658 17.9263L7.52419 16.9221C7.12004 16.6672 6.91797 16.5398 6.69369 16.5324C6.45135 16.5244 6.24569 16.6467 5.80898 16.9221C5.31988 17.2305 4.34731 18.0803 3.71821 17.675C3.33325 17.4271 3.33325 16.7973 3.33325 15.5375Z"
                  stroke="#111111"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.16675 9.16602H6.66675"
                  stroke="#111111"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.6667 5.83398H6.66675"
                  stroke="#111111"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="h-12 w-12 bg-primary rounded-full flex justify-center items-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.18412 2.11244C2.33657 1.98818 2.54771 1.96483 2.72363 2.05279L17.7236 9.55279C17.893 9.63749 18 9.81062 18 10C18 10.1894 17.893 10.3625 17.7236 10.4472L2.72363 17.9472C2.54771 18.0352 2.33657 18.0118 2.18412 17.8876C2.03167 17.7633 1.96623 17.5612 2.0169 17.3712L3.98255 10L2.0169 2.62884C1.96623 2.4388 2.03167 2.2367 2.18412 2.11244ZM4.88416 10.5L3.26911 16.5564L16.382 10L3.26911 3.44357L4.88416 9.5H11.5C11.7762 9.5 12 9.72386 12 10C12 10.2761 11.7762 10.5 11.5 10.5H4.88416Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessagesView;
