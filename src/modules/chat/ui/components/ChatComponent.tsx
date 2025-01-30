import Avatar from "@/shared/generics/Avatar";
import { ChatRoomModel } from "../../models/ChatRoomModel";
type Props = {
  onClick?: () => void;
  chatRoom: ChatRoomModel;
};
const ChatComponent: React.FC<Props> = ({ onClick ,chatRoom}) => {
  return (
    <div onClick={onClick} className="flex gap-x-2 cursor-pointer">
      <div className="w-16">
        <Avatar className="w-11 h-11" />
      </div>
      <div className=" w-full flex">
        <div className="w-full pt-2">
          <h2 className="text-sm"> {chatRoom.name} </h2>
          <p className="text-xs text-grey4">Last Sent Message</p>
        </div>
        <div className="flex items-center gap-x-1.5">
          <div>
            <p className="w-5 h-5 rounded-full bg-primary text-white text-xs text-center">
              2
            </p>
          </div>
          <span className="text-xs text-grey4 whitespace-nowrap">3:32 pm</span>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
