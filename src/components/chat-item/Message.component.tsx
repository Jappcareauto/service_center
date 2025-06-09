import { twMerge } from "tailwind-merge";
import MessageInvoiceComponent from "./MessageInvoiceComponent.component";
import { MessageType } from "@/enums";
import { Message } from "@/types";

interface OwnProps extends Message {
  className?: string;
}

const MessageComponent: React.FC<OwnProps> = ({ className, content, image, reply, isMe, type }) => {

  if (type === MessageType.INVOICE) {
    return (
      <div
        className={twMerge(
          "flex w-full",
          isMe ? "justify-end" : "justify-start",
          className
        )}
      >
        <MessageInvoiceComponent type="Pending" />
      </div>
    );
  }

  return (
    <div
      className={twMerge(
        "flex w-full mb-4",
        isMe ? "justify-end" : "justify-start",
        className
      )}
    >
      <div
        className={twMerge(
          "max-w-[330px] rounded-2xl p-1",
          isMe ? "bg-primaryAccent" : "bg-grey3"
        )}
      >
        {reply && (
          <p className="text-xs text-grey4 bg-white rounded-t-2xl p-2">
            {reply}
          </p>
        )}
        {content && <p className="p-2 text-sm">{content}</p>}
        {image && (
          <img
            src={image}
            alt=""
            className="w-full max-w-[330px] rounded-xl max-h-[200px] object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default MessageComponent;
