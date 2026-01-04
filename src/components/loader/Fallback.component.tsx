import { Skeleton } from "antd";
import logo_short from "../../assets/images/logo_short.png";

export const AppLoader = () => {
  return (
    <div className="relative w-24 h-24 overflow-hidden justify-center flex items-center">
      <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={logo_short} // or "/logo.png" or replace with text
          alt="Logo"
          className="w-10 h-10"
        />
      </div>
      <Skeleton.Avatar
        active
        size={90}
        shape="circle"
        style={{
          backgroundColor: "#ffffff",
        }}
      />
    </div>
  );
};

const Fallback = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <AppLoader />
    </div>
  );
};

export default Fallback;
