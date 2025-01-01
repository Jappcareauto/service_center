import React from 'react';
import { UseFormRegister } from "react-hook-form";
import { twMerge } from 'tailwind-merge';

export type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  register?: UseFormRegister<any>;
  name?: string;
  label?: string;
  errorMessage?: string;
  prefixIcon?: React.ReactElement;
};


const Input: React.FC<CustomInputProps> = ({
  register, name,
  errorMessage,
  className, label,
  prefixIcon,
  ...props
}) => {
  return (
    <div className='relative'>
      {label && <label htmlFor="" className='mb-2 block'>{label}</label>}
      {prefixIcon && <div className='absolute left-4 top-1/2 transform -translate-y-1/2'>{prefixIcon}</div>}
      <input
        className={
          twMerge(
            'h-12 rounded-xl w-full px-4 focus:placeholder-primary border focus:border-primary focus:outline-none',
            'focus:bg-primaryAccent',
            prefixIcon ? 'pl-12' : '',
            className,
          )
        }
        {...(register
          ? register(name ?? '', {
            onChange: props.onChange,
          })
          : {
            onChange: props.onChange,
            value: props.value,
          })
        }
        {...props}
        autoComplete="off"
      />
      {errorMessage && <p className='text-primary text-xs mt-1'>{errorMessage}</p>}
    </div>
  )
}

export default Input
