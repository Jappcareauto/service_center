/* eslint-disable @typescript-eslint/no-explicit-any */
import { twMerge } from "tailwind-merge";
import Avatar from "../avatar/Avatar.component";

type Props = {
  onClick?: () => void;
  numberOfUnreadMessage?: number;
  time?: string;
  name?: string;
  label?: string;
  active?: boolean;
  [x: string]: any;
};
const ChatItem: React.FC<Props> = ({
  onClick,
  name = "",
  numberOfUnreadMessage = 10,
  time = "",
  label,
  active,
}) => {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        "flex gap-x-2 justify-between cursor-pointer rounded-xl p-2",
        active && "bg-primaryAccent"
      )}
    >
      <Avatar
        className="w-11 h-11"
        name={name}
        label={label}
        nameClassName="line-clamp-1"
      />
      <div className="flex">
        <div className="flex items-center gap-x-1.5">
          <div>
            <p className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
              {numberOfUnreadMessage}
            </p>
          </div>
          <span className="text-xs text-grey4 whitespace-nowrap">{time}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
