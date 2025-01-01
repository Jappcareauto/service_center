import { DashboardRoutes } from "@/modules/dashboard/infra/routes/Router"
import FilterBar from "@/modules/dashboard/ui/components/FilterBar"
import SearchIcon from "@/shared/generics/icons/SearchIcon"
import Input from "@/shared/generics/inputs/Input"
import ChatIcon from "@/shared/generics/menu/icons/ChatIcon"
import { Outlet, useNavigate } from "react-router-dom"
import ChatComponent from "../components/ChatComponent"

const ChatView = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-[370px_auto] h-[calc(100vh-75px)]">
      <div className="border-r border-r-borderColor">
        <div className="pr-6 flex flex-col gap-y-6">
          <div className="flex items-center gap-x-4">
            <ChatIcon className="" />
            <h2 className="font-[600]">Chat</h2>
          </div>
          <FilterBar
            labels={['All', 'Unread', 'Read']}
            disableDisposition
          />
          <Input
            className="rounded-full bg-primaryAccent border-none"
            placeholder="Search"
            prefixIcon={<SearchIcon className="" />}
          />
        </div>
        <div className="flex flex-col gap-y-4 mt-6 h-[calc(100vh-260px)] overflow-y-auto pr-6 pb-10">
          {
            Array(5).fill(0).map((_, index) => {
              return <ChatComponent
                onClick={() => navigate(DashboardRoutes.chatDetails.replace(':id', (index + 1).toString()))}
                key={'chat-key-' + index}
              />
            })
          }
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default ChatView
