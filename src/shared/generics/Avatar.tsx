import React from "react";
import { twMerge } from "tailwind-merge";
import { getFirtsLetters } from "../utils/getFirtsLetters";

interface OwnProps {
  className?: string;
  parentClassName?: string;
  name?: string;
  disabledBorder?: boolean;
  url?: string;
  isName?: boolean;
}

const Avatar: React.FC<OwnProps> = ({
  className,
  name,
  parentClassName,
  disabledBorder,
  isName = true,
}) => {
  const profilText = getFirtsLetters(name || "Anonyme");

  return (
    <div className="flex items-center gap-x-4 font-normal">
      <div
        className={twMerge(
          "rounded-full flex justify-center items-center  border-[2px] border-primary p-[1.5px]",
          disabledBorder ? "border-none p-0" : "",
          parentClassName
        )}
      >
        <div
          // src={url ?? IMAGES.avatar}
          // alt=""
          className={twMerge(
            "w-12 h-12 flex items-center  uppercase font-bold justify-center text-sm bg-black text-primary rounded-full",
            className
          )}
        >
          {profilText[0]} {profilText[1]}
        </div>
      </div>
      {isName && !!name && <p>{name}</p>}
    </div>
  );
};

export default Avatar;
