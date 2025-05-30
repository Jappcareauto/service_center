import React from "react";
import { twMerge } from "tailwind-merge";
import Loader from "../loader/Loader";
import { ButtonProps, variantStyles } from "./types";

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  isLoading,
  variant = "primary",
  leftIcon,
  rightIcon,
  ...props
}) => {
  const isInactive =props.disabled || isLoading
  return (
    <button
      {...props}
      className={twMerge(
        "flex items-center justify-center h-[46px] px-6 transition-all duration-300 ease-in-out rounded-lg w-auto",
        variantStyles[variant],
        className,
        (isInactive) && "opacity-50 cursor-not-allowed bg-gray-500",
      )}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
