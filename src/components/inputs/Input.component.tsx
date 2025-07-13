/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  register?: UseFormRegister<any>;
  name?: string;
  label?: string;
  errorMessage?: string;
  prefixIcon?: React.ReactElement;
  suffixIcon?: React.ReactElement;
};

const Input: React.FC<CustomInputProps> = ({
  register,
  name,
  errorMessage,
  className,
  label,
  prefixIcon,
  suffixIcon,
  ...props
}) => {
  return (
    <div className="relative w-full">
      {label && (
        <label htmlFor="" className="mb-2 block text-sm">
          {label}
        </label>
      )}
      <div className="relative">
        {prefixIcon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            {prefixIcon}
          </div>
        )}
        <input
          className={twMerge(
            "h-11 rounded-lg w-full px-4 focus:placeholder-primary border focus:border-primary focus:outline-none",
            "focus:bg-primaryAccentLight bg-white",
            prefixIcon && "pl-14",
            suffixIcon && "pr-14",
            className
          )}
          {...(register
            ? register(name ?? "", {
                onChange: props.onChange,
              })
            : {
                onChange: props.onChange,
                value: props.value,
              })}
          {...props}
          // autoComplete="off"
        />
        {suffixIcon && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            {suffixIcon}
          </div>
        )}
      </div>
      {errorMessage && (
        <p className="text-primary text-xs mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
