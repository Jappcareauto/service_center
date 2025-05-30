import { Drawer as DrawerComponent } from "antd";
import React from "react";
import { DrawerType } from "./types";
import Expended2Icon from "@/assets/icons/Expended2Icon";
import { XMarkIcon } from '@heroicons/react/24/solid';

const Drawer: React.FC<DrawerType> = ({
  children,
  open,
  onClose,
  loading,
  title,
  onNavigate,
}) => {
  return (
    <>
      <DrawerComponent
        closable
        destroyOnClose
        title={
          <div className="flex justify-between items-center">
            <p className='ml-2 font-medium'>{title}</p>
            {onNavigate && (
              <Expended2Icon className="cursor-pointer" onClick={onNavigate} />
            )}
          </div>
        }
        placement="right"
        open={open}
        loading={loading}
        onClose={onClose}
        width={window.innerWidth * 0.26}
        closeIcon={<XMarkIcon className='text-black' />}
      >
        <div className="flex flex-col">{children}</div>
      </DrawerComponent>
    </>
  );
};

export default Drawer;
