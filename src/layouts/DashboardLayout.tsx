import NotificationIcon from "@/assets/icons/NotificationIcon";
import Drawer from "@/components/drawer/Drawer.component";
import NotificationItem from "@/components/notification-item/NotificationItem.component";
import SideMenu from "@/components/side-menu/SideMenu";
import { notificationItems } from "@/constants";
import { useAppSelector } from "@/redux/store";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Avatar, Input } from "antd";
import { SearchProps } from "antd/es/input";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
interface Iprops {
  onSearch?: (value: string) => void;
  children: ReactNode;
  showBack?: boolean;
}
const DashboardLayout = ({ children, onSearch, showBack = true }: Iprops) => {
  const [open, setOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { Search } = Input;
  const handleSearch: SearchProps["onSearch"] = (value) => {
    onSearch?.(value);
  };

  return (
    <div className="flex">
      <SideMenu />
      <div className="w-full pl-[40px] md:pl-[220px] lg:pl-[220px]">
        <div className="h-[90px] bg-background z-40 md:w-[calc(100vw-274px)] fixed float-right flex items-center justify-between pl-[40px] pr-[10px] md:ml-5">
          <div className="flex space-x-8 md:w-[25%]">
            {showBack && (
              <button
                className="pr-3 hover:opacity-60"
                onClick={() => navigate(-1)}
              >
                <ArrowLeftIcon className="w-5 text-gray-400" />
              </button>
            )}
            <Search
              placeholder="search appointment"
              onSearch={handleSearch}
              size="large"
              width={"100%"}
            />
          </div>
          <div className="flex flex-row gap-x-7 bg-white p-3 rounded-full px-4">
            <NotificationIcon
              onClick={() => setOpen(true)}
              className="cursor-pointer text-gray-500 pt-1"
              width={"28"}
              height={"28"}
            />
            {/* <SettingIcon
              onClick={() => navigate(paths.profile)}
              className="cursor-pointer text-gray-500 pt-1"
              width={"28"}
              height={"28"}
            /> */}
            <div className="rounded-full border border-primaryAccent bg-red-300">
              <Avatar src={user?.profileImageUrl} />
            </div>
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-10px)] px-[12px] pl-[30px] md:pl-[59px] lg:pl-[59px] pt-[90px] pb-9">
          {children}
        </div>
      </div>
      <Drawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        title="Notifications"
      >
        <div className="gap-y-4 flex flex-col" data-aos="fade-down">
          {notificationItems?.map((item) => (
            <NotificationItem
              key={item.id}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default DashboardLayout;
