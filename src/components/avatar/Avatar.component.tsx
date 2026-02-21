/* eslint-disable @typescript-eslint/no-explicit-any */
import EditIcon from "@/assets/icons/EditIcon";
import { getInitials } from "@/utils/getInitials";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React, { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface OwnProps {
  className?: string;
  parentClassName?: string;
  name?: string;
  disabledBorder?: boolean;
  url?: string;
  isName?: boolean;
  label?: string;
  nameClassName?: string;
  profileImageUrl?: string;
  labelClassName?: string;
  namesClassName?: string;
  id?: string;
  allowUpload?: boolean;
  onSelect?: (file: any) => void;
  isLoading?: boolean;
  showEdit?: boolean;
  imageClassName?: string;
}

const Avatar: React.FC<OwnProps> = ({
  className,
  name,
  parentClassName,
  disabledBorder,
  isName = true,
  label,
  profileImageUrl,
  nameClassName,
  labelClassName,
  namesClassName,
  id,
  allowUpload = false,
  onSelect,
  isLoading,
  showEdit,
  imageClassName
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      onSelect?.(file);
    }
  };

  const triggerUpload = () => {
    inputRef.current?.click();
  };

  const imageSource = preview || profileImageUrl;

  return (
    <div className="flex items-center gap-x-2 font-normal">
      <div
        className={twMerge(
          "rounded-full flex justify-center items-center overflow-hidden border-[2px] border-primary p-[1.5px]",
          disabledBorder ? "border-none p-0" : "",
          "w-11 h-11",
          parentClassName
        )}
      >
        {isLoading ? (
          <Spin
            indicator={
              <LoadingOutlined
                style={{ fontSize: 30 }}
                className="text-primary"
                spin
              />
            }
          />
        ) : imageSource ? (
          <img
            src={imageSource}
            className={twMerge("rounded-full w-full h-full", imageClassName)}
            id={id}
          />
        ) : (
          <div
            className={twMerge(
              "w-full h-full flex items-center uppercase font-bold justify-center text-sm bg-black text-primary rounded-full",
              className
            )}
          >
            {getInitials(name as string)}
          </div>
        )}
        {allowUpload && (
          <input
            ref={inputRef}
            type="file"
            id="avatar-upload"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        )}
        {showEdit && (
          <button
            className="absolute bottom-1 right-3 rounded-full flex items-center justify-center bg-primary w-9 h-9"
            onClick={allowUpload ? triggerUpload : undefined}
          >
            <EditIcon />
          </button>
        )}
      </div>
      {isName && (
        <div className={twMerge("flex-col ml-1", namesClassName)}>
          <p className={twMerge("font-semibold", nameClassName)}>{name}</p>
          {label && (
            <p className={twMerge("text-grey4 flex-nowrap", labelClassName)}>
              {label}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Avatar;
