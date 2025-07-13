import { menuItems } from "@/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Avatar from "../avatar/Avatar.component";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { logoutUser, setUser } from "@/redux/features/auth/authSlice";
import { paths } from "@/routes/paths";
import { apiSlice, useGetUserQuery } from "@/redux/api";
import Loader from "../loader/Loader";
import { useEffect, useRef } from "react";

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
    navigate(paths.index);
    dispatch(apiSlice.util.resetApiState());
  };
  return (
    <div className="w-[270px] border-r border-r-borderColor h-screen fixed left-0 top-0 no-scrollbar overflow-y-auto px-4 pt-6">
      <p className="mb-4">Good Morning</p>
      <button className="flex items-center p-3 border border-borderColor rounded-2xl w-full gap-x-4 mb-6 font-medium" onClick={() => navigate(paths.profile)}>
        {isLoading ? (
          <Loader />
        ) : (
          <Avatar name={data?.data?.name} className="w-9 h-9" />
        )}
      </button>
      <div className="flex flex-col gap-y-2">
        {menuItems.map((item, index) => {
          const isSelected = location?.pathname?.includes(item?.route);
          return (
            <button
              onClick={() => navigate(item.route)}
              key={item.title}
              className={twMerge(
                "flex gap-x-4 h-14 rounded-xl items-center px-5 font-light hover:bg-primaryAccent hover:text-primary",
                isSelected ? "bg-primaryAccent text-primary" : "",
                !index ? "mb-2" : ""
              )}
            >
              {item?.icon(isSelected)}
              <span className="text-textColor text-sm">{item.title}</span>
            </button>
          );
        })}
      </div>
      <div
        onClick={handleLogout}
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
        <h4 className="text-red-500 ">Log Out</h4>
      </div>
    </div>
  );
};

export default SideMenu;
