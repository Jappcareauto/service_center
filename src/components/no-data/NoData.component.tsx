import { Skeleton } from "antd";
import React from "react";
import { twMerge } from "tailwind-merge";
import images from "./../../assets/images/index";

interface NoDataProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  className?: string;
  dataLength?: number | undefined | null;
  isLoading?: boolean;
}

const NoData: React.FC<NoDataProps> = ({
  title = "Oops! nothing here!",
  message = "There's nothing to show here right now.",
  icon,
  className = "",
  isLoading,
  dataLength,
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 rounded-xl border border-dashed border-gray-300 h-44 my-3">
        <Skeleton active paragraph={{ rows: 2 }} />
      </div>
    );
  }
  if (!isLoading && (!dataLength || dataLength === 0 || undefined)) {
    return (
      <div
        className={twMerge(
          "flex flex-col items-center justify-center text-center p-8 rounded-xl border border-dashed border-gray-200 h-44 my-3",
          className
        )}
      >
        {icon || <img src={images.bgService} className="w-24 h-24" />}
        <div className="mt-5">
          {title && <p className="text-gray-400 text-sm">{title}</p>}
          {message && (
            <p className="text-gray-300 font-light text-sm mt-1">{message}</p>
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default NoData;
