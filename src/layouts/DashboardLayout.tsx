import NotificationIcon from "@/assets/icons/NotificationIcon";
import SettingIcon from "@/assets/icons/SettingIcon";
import Drawer from "@/components/drawer/Drawer.component";
import NotificationItem from "@/components/notification-item/NotificationItem.component";
import SideMenu from "@/components/side-menu/SideMenu";
import { notificationItems } from "@/constants";
import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import { ReactNode, useState } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { Search } = Input;
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <div className="flex">
      <SideMenu />
      <div className="w-full pl-[260px]">
        <div className="h-[90px] w-full flex items-center justify-between px-[40px]">
          <Search
            placeholder="search appointment"
            onSearch={onSearch}
            style={{ width: 350 }}
            size='large'
          />
          <div className='flex flex-row gap-x-6'>
            <NotificationIcon
              onClick={() => setOpen(true)}
              className="cursor-pointer text-grey2"
            />
            <SettingIcon
              onClick={() => console.log("any")}
              className="cursor-pointer text-grey2"
            />
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-72px)] px-[40px] pb-9">
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
