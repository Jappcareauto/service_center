import { DashboardRoutes } from "@/modules/dashboard/infra/routes/Router";
import FilterBar from "@/modules/dashboard/ui/components/FilterBar";
import SearchIcon from "@/shared/generics/icons/SearchIcon";
import Input from "@/shared/generics/inputs/Input";
import ChatIcon from "@/shared/generics/menu/icons/ChatIcon";
import { Outlet, useNavigate } from "react-router-dom";
import ChatComponent from "../components/ChatComponent";
import { useChatView } from "../hooks/useChatView";
import Loader from "@/shared/generics/loader/Loader";
import { LoadingState } from "@/shared/enums/LoadingState";

const ChatView = () => {
  const navigate = useNavigate();
  const {
    state: { chatRoomsState },
  } = useChatView();
  return (
    <div className="grid grid-cols-[370px_auto] h-[calc(100vh-75px)]">
      <div className="border-r border-r-borderColor">
        <div className="pr-6 flex flex-col gap-y-6">
          <div className="flex items-center gap-x-4">
            <ChatIcon className="" />
            <h2 className="font-[600]">Chat</h2>
          </div>
          <FilterBar onFilter={()=>{}} labels={["All", "Unread", "Read"]} disableDisposition />
          <Input
            className="rounded-full bg-primaryAccent border-none"
            placeholder="Search"
            prefixIcon={<SearchIcon className="" />}
          />
        </div>
        <div className="flex flex-col gap-y-4 mt-6 h-[calc(100vh-260px)] overflow-y-auto pr-6 pb-10">
         {chatRoomsState.loading===LoadingState.pending&& <div className="flex justify-center my-2 w-full"><Loader/></div>}
          {chatRoomsState.chatRooms.map((chatRoom, index) => {
            return (
              <ChatComponent
              chatRoom={chatRoom}
                onClick={() =>
                  navigate(
                    DashboardRoutes.chatDetails.replace(
                      ":id",
                      (index + 1).toString()
                    )
                  )
                }
                key={"chat-key-" + index}
              />
            );
          })}
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default ChatView;
