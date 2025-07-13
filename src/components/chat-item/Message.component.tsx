import { twMerge } from "tailwind-merge";
// import MessageInvoiceComponent from "./MessageInvoiceComponent.component";
// import { MessageType } from "@/enums";
import { AUDIO_TYPES, IMAGE_TYPES, Message } from "@/types";
import CustomAudioPlayer from "../custom-audio-player/CustomAudioPlayer.component";

interface OwnProps extends Message {
  className?: string;
}

const MessageComponent: React.FC<OwnProps> = ({
  className,
  content,
  mediaUrls,
  reply,
  isMe,
}) => {
  return (
    <div
      className={twMerge(
        "flex w-full my-4",
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

        {mediaUrls && mediaUrls.length > 0 && (
          <div className="flex flex-col gap-2 p-1">
            {mediaUrls.map((file, index) => {
              if (IMAGE_TYPES.includes(file?.type)) {
                return (
                  <img
                    key={file?.url + index}
                    src={file?.url}
                    alt={file?.name}
                    className="w-full max-w-[330px] rounded-xl max-h-[200px] object-cover"
                  />
                );
              }

              if (AUDIO_TYPES.includes(file?.type)) {
                return (
                  <CustomAudioPlayer key={file?.url + index} src={file?.url} />
                );
              }
              return (
                <div
                  key={file?.url + index}
                  className="text-sm text-red-500 bg-white p-2 rounded"
                >
                  Unsupported file type: {file?.type}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageComponent;
