/* eslint-disable @typescript-eslint/no-explicit-any */
import { getInitials } from "@/utils/getInitials";
import { twMerge } from "tailwind-merge";

type Props = {
  onClick?: () => void;
  numberOfUnreadMessage?: number;
  time?: string;
  name?: string;
  lastMessage?: string;
  active?: boolean;
  [x: string]: any;
};
const ChatItem: React.FC<Props> = ({
  onClick,
  name = "",
  numberOfUnreadMessage,
  time = "",
  lastMessage,
  active,
}) => {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        "flex gap-x-2 justify-between cursor-pointer rounded-xl p-2",
        active && "bg-primaryAccent shadow-sm",
        "hover:bg-primaryAccent hover:shadow-sm transition-all duration-500 ease-in-out"
      )}
    >
      <div className="flex space-x-3 min-w-0">
        <div className="flex items-center justify-center">
          <div
            className={twMerge(
              "w-11 h-11 rounded-full flex items-center justify-center border-[3px] border-primary",
              active ? "bg-white" : "bg-black text-primary font-bold"
            )}
          >
            {getInitials(name)}
          </div>
        </div>
        <div className="flex flex-col min-w-0">
          <p className="text-sm font-semibold text-textColor line-clamp-1 whitespace-nowrap overflow-hidden text-ellipsis">
            {name}
          </p>
          {lastMessage && (
            <p className="text-xs text-grey4 whitespace-nowrap line-clamp-1 overflow-hidden text-ellipsis">
              {lastMessage}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-x-1.5 flex-shrink-0">
        {numberOfUnreadMessage && (
          <p className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
            {numberOfUnreadMessage}
          </p>
        )}

        <span className="text-xs text-grey4 whitespace-nowrap">{time}</span>
      </div>
    </div>
  );
};

export default ChatItem;
