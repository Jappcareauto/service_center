import IMAGES from "@/assets/images"
import Avatar from "@/shared/generics/Avatar"
import { Message, MessageType } from "../../models/Message"
import ChatCarComponent from "../components/ChatCarComponent"
import MessageComponent from "../components/MessageComponent"

const groupedMessages: { date: string, messages: Message[] }[] = [
  {
    date: '',
    messages: [{ message: "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate?", type: MessageType.BASIC, }]
  },
  {
    date: '',
    messages: [
      { message: "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate?", isMe: true, type: MessageType.BASIC, },
      { message: "Yorem ipsum dolor sit amet,", isMe: true, type: MessageType.BASIC, }
    ]
  },
  {
    date: '',
    messages: [
      {
        message: "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate?",
        image: IMAGES.food, type: MessageType.BASIC,
      },
    ]
  },
  {
    date: '',
    messages: [
      {
        message: "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate?",
        reply: "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate?",
        isMe: true, type: MessageType.BASIC,
      },
      { message: "Yorem ipsum dolor sit amet,", isMe: true, type: MessageType.VOICE, },
      { message: "", isMe: true, type: MessageType.INVOICE, },
      {
        message: "",
        isMe: true,
        type: MessageType.IMAGE,
        image: IMAGES.food2,
      },
    ]
  },
]

const ChatMessagesView = () => {
  return (
    <div className="">
      <div className="w-full border-b border-b-borderColor py-2 px-6 bg-background">
        <Avatar className="w-11 h-11" name="Sara" />
      </div>
      <div className="h-[calc(100vh-140px)] w-full pl-6 py-4 overflow-y-auto">
        <ChatCarComponent />
        {
          groupedMessages.map((group, index) => {
            return <div
              key={'group-' + index}
              className="flex flex-col gap-y-1 mb-4">
              {
                group.messages.map((message, index) => {
                  return <MessageComponent
                    key={'message-' + index}
                    msg={message}
                  />
                })
              }
            </div>
          })
        }
      </div>
    </div>
  )
}

export default ChatMessagesView
