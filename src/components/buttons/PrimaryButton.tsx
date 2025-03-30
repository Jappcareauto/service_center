import React from "react";
import { twMerge } from "tailwind-merge";

type OwnProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const PrimaryButton: React.FC<OwnProps> = ({
  children, className, ...props
}) => {
  return (
    <button
      {...props}
      className={
        twMerge(
          "bg-black text-white font-medium h-[52px] px-5 rounded-xl",
          className
        )
      }
    >
      {children}
    </button>
  );
};

export default PrimaryButton;