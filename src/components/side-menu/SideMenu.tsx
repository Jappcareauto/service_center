import { menuItems } from "@/constants";
import { apiSlice, useGetUserQuery } from "@/redux/api";
import {
  setAppointment,
  setAppointmentId,
  setInvoice,
} from "@/redux/features/appointment/appointmentSlice";
import { logoutUser, setUser } from "@/redux/features/auth/authSlice";
import { setChatroomId, setReceiver } from "@/redux/features/chat/chatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { paths } from "@/routes/paths";
import { getTimeOfDay } from '@/utils';
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Avatar from "../avatar/Avatar.component";
import Loader from "../loader/Loader";

const SideMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user_info } = useAppSelector((state) => state.auth);
  const effectRef = useRef(true);
  const { data, isLoading } = useGetUserQuery(user_info?.userId, {
    skip: !user_info?.userId,
  });

  useEffect(() => {
    if (effectRef) {
      effectRef.current = false;
      if (data?.data) {
        dispatch(setUser(data?.data));
      }
    }
  }, [data]);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(setChatroomId(""));
    dispatch(setReceiver(null));
    dispatch(setAppointment(null));
    dispatch(setAppointmentId(""));
    dispatch(setInvoice(null));
    navigate(paths.index);
    dispatch(apiSlice.util.resetApiState());
  };

  return (
    <div className="bg-white border-r border-r-borderColor h-screen fixed left-0 overflow-y-auto no-scrollbar px-3 py-6 w-[60px] sm:w-[70px] md:w-[250px] transition-all duration-300 z-50">
      {/* Greeting & Avatar only visible on md+ */}
      <p className="mb-4 hidden md:block">Good {getTimeOfDay()}</p>
      <button
        className="items-center p-3 border border-borderColor rounded-2xl w-full gap-x-4 mb-6 font-medium hidden md:flex"
        onClick={() => navigate(paths.profile)}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <Avatar name={data?.data?.name} className="w-9 h-9" />
        )}
      </button>

      {/* Menu */}
      <div className="flex flex-col gap-y-2 pb-11">
        {menuItems.map((item, index) => {
          const isSelected = location?.pathname?.includes(item?.route);
          return (
            <button
              onClick={() => navigate(item.route)}
              key={item.title}
              className={twMerge(
                "flex items-center h-14 rounded-xl px-2 md:px-5 font-light hover:bg-primaryAccent hover:text-primary gap-x-0 md:gap-x-4 justify-center md:justify-start",
                isSelected ? "bg-primaryAccent text-primary" : "",
                !index ? "mb-2" : ""
              )}
            >
              {item?.icon(isSelected)}
              {/* Hide text on small screens */}
              <span className="hidden md:block text-sm text-textColor">
                {item.title}
              </span>
            </button>
          );
        })}
      </div>
      <div
        onClick={handleLogout}
        className="flex items-center justify-center md:justify-center gap-x-4 mt-10 h-[50px] hover:cursor-pointer rounded-xl px-2 hover:bg-red-50
         bottom-3 w-full transition-all duration-300 bg-white sm:w-auto"
      >
        <div>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 3.09502C13.543 3.03241 13.0755 3 12.6 3C7.29807 3 3 7.02944 3 12C3 16.9706 7.29807 21 12.6 21C13.0755 21 13.543 20.9676 14 20.905"
              stroke="#ff6d5a"
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
        <h4 className="hidden md:block text-red-500">Logout</h4>
      </div>
    </div>
  );
};

export default SideMenu;
