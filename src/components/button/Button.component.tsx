import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from "react";
import { twMerge } from "tailwind-merge";
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
  const isInactive = props.disabled || isLoading;
  return (
    <button
      {...props}
      className={twMerge(
        "flex items-center justify-center h-[40px] px-5 transition-all duration-300 ease-in-out rounded-lg w-auto",
        variantStyles[variant],
        className,
        isInactive && variantStyles["disabled"]
      )}
    >
      {isLoading ? (
        <Spin indicator={<LoadingOutlined className="text-primary" spin />} />
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
