import { twMerge } from "tailwind-merge";
import Avatar from "../avatar/Avatar.component";

type Props = {
  onClick?: () => void;
  numberOfUnreadMessage?: number;
  time?: string;
  name?: string;
  active?: boolean;
};
const ChatItem: React.FC<Props> = ({
  onClick,
  name = "Loius",
  numberOfUnreadMessage = 10,
  time = "3:32 pm",
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
        label="Last Sent Message akjsncalskcnalskc laksncalksnlknlknsc"
        labelClassName="line-clamp-1"
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
