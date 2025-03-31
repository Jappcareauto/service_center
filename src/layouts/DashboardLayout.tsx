import NotificationView from "@/components/notifications/NotificationView"
import { ModalEventKey } from "@/hooks/ModalEventKey"
import { ModalEvents } from "@/hooks/useModal"
import { Outlet, useNavigate } from "react-router-dom"
import NotificationIcon from "@/components/icons/NotificationIcon"
import SettingIcon from "@/components/icons/SettingIcon"
import SideMenu from "@/components/menu/SideMenu"
import { DashboardRoutes } from "@/routes/Navigation"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { setErrorMessage } from "@/redux/messagesSlice"

const DashboardLayout = () => {
  const dispatch = useAppDispatch();
  const navigate=useNavigate()

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  
  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate("/login");
      dispatch(setErrorMessage("You must login to access this"))
    }
    
  }
    , [isAuthenticated, user, navigate]);

  return (
    <div className="grid grid-cols-[270px_auto]">
      <SideMenu />
      <div className="">
        <div className="h-[72px] w-full flex items-center justify-end gap-x-4 px-[58px]">
            <button className="bg-primary text-white rounded-2xl py-2 px-4">Available</button>
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
