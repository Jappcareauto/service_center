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
      <div className="px-[58px]">
        <div className="h-[72px] w-full flex items-center justify-end gap-x-4">
          <NotificationIcon
            onClick={() => ModalEvents.open(ModalEventKey.NOTIFICATION)}
            className="cursor-pointer text-grey2" />
          <SettingIcon className="cursor-pointer text-grey2" />
        </div>
        <Outlet />
      </div>
      <NotificationView />
    </div>
  )
}

export default DashboardLayout
