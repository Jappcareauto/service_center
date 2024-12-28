import NotificationView from "@/modules/notification/ui/NotificationView"
import { ModalEventKey } from "@/shared/helpers/hooks/ModalEventKey"
import { ModalEvents } from "@/shared/helpers/hooks/useModal"
import { Outlet } from "react-router-dom"
import NotificationIcon from "../icons/NotificationIcon"
import SettingIcon from "../icons/SettingIcon"
import SideMenu from "../menu/SideMenu"

const DashboardLayout = () => {
  return (
    <div className="grid grid-cols-[270px_auto]">
      <SideMenu />
      <div className="">
        <div className="h-[72px] w-full flex items-center justify-end gap-x-4 px-[58px]">
          <NotificationIcon
            onClick={() => ModalEvents.open(ModalEventKey.NOTIFICATION)}
            className="cursor-pointer text-grey2" />
          <SettingIcon className="cursor-pointer text-grey2" />
        </div>
        <div className="overflow-y-auto h-[calc(100vh-72px)] px-[58px]">
          <Outlet />
        </div>
      </div>
      <NotificationView />
    </div>
  )
}

export default DashboardLayout
