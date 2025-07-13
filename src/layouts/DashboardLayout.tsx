import NotificationIcon from "@/assets/icons/NotificationIcon";
import SettingIcon from "@/assets/icons/SettingIcon";
import Drawer from "@/components/drawer/Drawer.component";
import NotificationItem from "@/components/notification-item/NotificationItem.component";
import SideMenu from "@/components/side-menu/SideMenu";
import { notificationItems } from "@/constants";
import { paths } from "@/routes/paths";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Input } from "antd";
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
  const navigate = useNavigate();
  const { Search } = Input;
  const handleSearch: SearchProps["onSearch"] = (value) => {
    onSearch?.(value);
  };

  return (
    <div className="flex">
      <SideMenu />
      <div className="w-full pl-[250px]">
        <div className="h-[90px] bg-background z-50 w-[calc(100vw-274px)] fixed float-right flex items-center justify-between px-[40px] ml-5">
          <div className="flex space-x-8" style={{ width: 380 }}>
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
          <div className="flex flex-row gap-x-6">
            <NotificationIcon
              onClick={() => setOpen(true)}
              className="cursor-pointer text-grey2"
            />
            <SettingIcon
              onClick={() => navigate(paths.profile)}
              className="cursor-pointer text-grey2"
            />
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-10px)] px-[38px] pt-[90px] pb-9">
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
          {notificationItems.map((item) => (
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
