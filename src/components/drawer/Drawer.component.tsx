import { Drawer as DrawerComponent } from "antd";
import React, { useMemo } from "react";
import { DrawerType } from "./types";
import Expended2Icon from "@/assets/icons/Expended2Icon";
import { XMarkIcon } from "@heroicons/react/24/solid";

const Drawer: React.FC<DrawerType> = ({
  children,
  open,
  onClose,
  loading,
  title,
  onNavigate,
  ...props
}) => {
  // Responsive width calculation
  const drawerWidth = useMemo(() => {
    if (typeof window === "undefined") return 400; // SSR safety
    const w = window.innerWidth;
    if (w < 640) return "100%"; // mobile
    if (w < 1024) return w * 0.8; // tablet
    return w * 0.26; // desktop
  }, [open]);

  return (
    <DrawerComponent
      closable
      destroyOnClose
      title={
        <div className="flex justify-between items-center">
          <p className="ml-2 font-medium">{title}</p>
          {onNavigate && (
            <Expended2Icon className="cursor-pointer" onClick={onNavigate} />
          )}
        </div>
      }
      placement="right"
      open={open}
      loading={loading}
      onClose={onClose}
      width={drawerWidth}
      closeIcon={<XMarkIcon className="text-black w-5 h-5" />}
      {...props}
    >
      <div className="flex flex-col">{children}</div>
    </DrawerComponent>
  );
};

export default Drawer;
