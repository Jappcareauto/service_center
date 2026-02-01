import { twMerge } from "tailwind-merge";
// import MessageInvoiceComponent from "./MessageInvoiceComponent.component";
// import { MessageType } from "@/enums";
import { AUDIO_TYPES, IMAGE_TYPES, Message } from "@/types";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { Image } from "antd";
import dayjs from "dayjs";
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
  status,
  timestamp,
}) => {
  const handleDownloadAll = async () => {
    if (!mediaUrls || mediaUrls?.length === 0) return;

    for (const file of mediaUrls) {
      try {
        const response = await fetch(file.url);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = file.name || file.url.split("/").pop() || "download";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Download failed for:", file.url, error);
      }
    }
  };
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

        {content && <p className="p-2 text-sm">{content} </p>}

        {mediaUrls && mediaUrls.length > 0 && (
          <div className="flex flex-col gap-2 p-1">
            {mediaUrls.map((file, index) => {
              if (IMAGE_TYPES.includes(file?.type)) {
                return (
                  <Image
                    key={file?.url + index}
                    src={file?.url}
                    alt={file?.name}
                    className="w-full max-w-[330px] rounded-xl max-h-[200px] object-cover hover:bg-red-400"
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
        <div className="flex gap-x-3 justify-end px-2 pb-1 pt-2">
          {mediaUrls && mediaUrls?.length > 0 && (
            <button
              onClick={handleDownloadAll}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-500 transition-colors"
            >
              Save
              <ArrowDownCircleIcon className="w-4 h-4 text-gray-400 hover:text-gray-500" />
            </button>
          )}
          <p className="text-xs text-gray-400 text-right relative">
            {timestamp && dayjs(timestamp).format("h:mm a")}
          </p>
          {isMe && (
            <p className="text-xs text-gray-400 text-right relative">
              {status === "READ"
                ? "✓✓ Read"
                : status === "DELIVERED"
                ? "✓✓ Delivered"
                : "✓ Sent"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
