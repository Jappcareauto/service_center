import { AUDIO_TYPES, IMAGE_TYPES, Message } from "@/types";
import {
  ArrowDownCircleIcon,
  ChevronDownIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Dropdown, Image, MenuProps } from "antd";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import CustomAudioPlayer from "../custom-audio-player/CustomAudioPlayer.component";

interface OwnProps extends Message {
  className?: string;
  onDelete: (id: string) => void;
}

const MessageComponent: React.FC<OwnProps> = ({
  id,
  className,
  content,
  mediaUrls,
  reply,
  isMe,
  status,
  timestamp,
  onDelete
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
        link.download = file.name || "download";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Download failed:", error);
      }
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "delete",
      label: "Delete Message",
      danger: true,
      icon: <TrashIcon className="w-4 h-4" />,
      onClick: () => onDelete?.(id as string),
    },
  ];

  return (
    <div
      className={twMerge(
        "flex w-full my-4 group/msg", // 'group/msg' for hover logic
        isMe ? "justify-end" : "justify-start",
        className
      )}
    >
      <div
        className={twMerge(
          "max-w-[330px] rounded-2xl p-1 relative", // Added 'relative'
          isMe ? "bg-primaryAccent" : "bg-grey3"
        )}
      >
        {/* Dropdown Icon - Visible only on hover */}
        <div className="absolute top-2 right-2 opacity-0 group-hover/msg:opacity-100 transition-opacity z-10">
          <Dropdown menu={{ items }} trigger={["click"]}>
            <button className="p-1">
              <ChevronDownIcon className="w-4 h-4" />
            </button>
          </Dropdown>
        </div>

        {reply && (
          <p className="text-xs text-grey4 bg-white rounded-t-2xl p-2 mr-6">
            {reply}
          </p>
        )}

        {content && <p className="p-2 text-sm pr-8">{content}</p>}

        {mediaUrls && mediaUrls?.length > 0 && (
          <div className="flex flex-col gap-2 p-1">
            {mediaUrls?.map((file, index) => {
              if (IMAGE_TYPES.includes(file?.type)) {
                return (
                  <Image
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

        <div className="flex gap-x-3 justify-end items-center px-2 pb-1 pt-2">
          {mediaUrls && mediaUrls?.length > 0 && (
            <button
              onClick={handleDownloadAll}
              className="flex items-center rounded-full gap-1 text-xs text-gray-400"
            >
              <ArrowDownCircleIcon className="w-4 h-4 text-gray-400 hover:scale-110" />
            </button>
          )}
          <p className="text-xs text-gray-400 text-right">
            {timestamp && dayjs(timestamp).format("h:mm a")}
          </p>
          {isMe && (
            <p className="text-xs text-gray-400 text-right">
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
