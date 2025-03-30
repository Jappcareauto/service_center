import NotificationView from "@/components/notifications/NotificationView"
import { ModalEventKey } from "@/hooks/ModalEventKey"
import { ModalEvents } from "@/hooks/useModal"
import { Outlet, useNavigate } from "react-router-dom"
import NotificationIcon from "@/components/icons/NotificationIcon"
import SettingIcon from "@/components/icons/SettingIcon"
import SideMenu from "@/components/menu/SideMenu"
import { DashboardRoutes } from "@/routes/Navigation"

const DashboardLayout = () => {
  const navigate=useNavigate()
  return (
    <div className="grid grid-cols-[270px_auto]">
      <SideMenu />
      <div className="">
        <div className="h-[72px] w-full flex items-center justify-end gap-x-4 px-[58px]">
          <NotificationIcon
            onClick={() => ModalEvents.open(ModalEventKey.NOTIFICATION)}
            className="cursor-pointer text-grey2" />
          <SettingIcon onClick={() => navigate(DashboardRoutes.setting())} className="cursor-pointer text-grey2" />
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
