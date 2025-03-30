import { AppointmentRoutes } from "@/modules/appointment/infra/routes/Router";
import { DashboardRoutes } from "@/modules/dashboard/infra/routes/Router";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import CalendarIcon from "./icons/CalendarIcon";
import ChatIcon from "./icons/ChatIcon";
import HomeIcon from "./icons/HomeIcon";
import InvoiceIcon from "./icons/InvoiceIcon";
import ProfileIcon from "./icons/ProfileIcon";
import StatisticIcon from "./icons/StatisticIcon";
import { InvoiceRoutes } from "@/modules/Invoice.ts/infra/routes/Router";
import { useAppSelector } from "@/app/hooks";
import { userSelector } from "@/modules/user/slice/selectors";
import { LoadingState } from "@/shared/enums/LoadingState";
import Loader from "../loader/Loader";
import Avatar from "../Avatar";
import { PaymentRoutes } from "@/modules/payment/infra/router/Router";
import { PaymentIcon } from "./icons/PaymentIcon";
import { handleCleanStoreAndNavigateToLogin } from "@/shared/gateway/handleCleanStoreAndNavigateToLogin";

interface MenuItem {
  title: string;
  icon: React.ReactElement;
  route: string;
}

const menuItems = (): MenuItem[] => [
  {
    title: "Dashboard",
    icon: <HomeIcon />,
    route: DashboardRoutes.dashboard,
  },
  {
    title: "Appointments",
    icon: <CalendarIcon />,
    route: AppointmentRoutes.appointment,
  },
  {
    title: "Emergency Assistance",
    icon: <CalendarIcon />,
    route: DashboardRoutes.emergency,
  },
  {
    title: "Chats",
    icon: <ChatIcon />,
    route: DashboardRoutes.chat,
  },
  {
    title: "Statistics",
    icon: <StatisticIcon />,
    route: DashboardRoutes.statistics,
  },
  {
    title: "Invoices",
    icon: <InvoiceIcon />,
    route: InvoiceRoutes.invoices(),
  },
  {
    title: "Profile",
    icon: <ProfileIcon />,
    route: DashboardRoutes.profile,
  },
  {
    title: "Payment",
    icon: <PaymentIcon />,
    route: PaymentRoutes.payment(),
  },
];

const SideMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loading, mySelf } = useAppSelector((state) =>
    userSelector.mySelfState(state)
  );
  return (
    <div className="w-[270px] border-r border-r-borderColor h-screen px-4 pt-10">
      <p className="mb-4">Good Morning</p>
      <button className="flex items-center px-4 py-3 border border-borderColor rounded-2xl w-full gap-x-4 mb-6 font-medium">
        {loading === LoadingState.pending ? (
          <Loader />
        ) :  (
          <Avatar name={mySelf?.name} className="" />
        )}
      </button>

      <div className="flex flex-col gap-y-2">
        {menuItems().map((item, index) => {
          const isSelected = location.pathname.includes(item.route);

          return (
            <button
              onClick={() => navigate(item.route)}
              key={"menu-item-" + index}
              className={twMerge(
                "flex gap-x-4 h-14 rounded-xl items-center px-5 font-light hover:bg-primaryAccent hover:text-primary",
                isSelected ? "bg-primaryAccent text-primary" : "",
                !index ? "mb-" : ""
              )}
            >
              {item.icon}
              <span className="text-textColor text-sm">{item.title}</span>
            </button>
          );
        })}
      </div>
      <div
        onClick={() => handleCleanStoreAndNavigateToLogin()}
        className="flex mt-10 h-[50px] gap-x-4 hover:cursor-pointer rounded-xl items-center px-2 hover:bg-redAccent "
      >
        <div className="">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 3.09502C13.543 3.03241 13.0755 3 12.6 3C7.29807 3 3 7.02944 3 12C3 16.9706 7.29807 21 12.6 21C13.0755 21 13.543 20.9676 14 20.905"
              stroke="#F1351B"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M21 12H11M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5"
              stroke="#F1351B"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h4 className="text-red ">Log Out</h4>
      </div>
    </div>
  );
};

export default SideMenu;
