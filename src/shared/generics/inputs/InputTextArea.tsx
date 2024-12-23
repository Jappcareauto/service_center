import React from 'react';
import { UseFormRegister } from "react-hook-form";
import { twMerge } from 'tailwind-merge';

export type CustomInputProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  register?: UseFormRegister<any>;
  name?: string;
  label?: string;
  errorMessage?: string;
};


const InputTextArea: React.FC<CustomInputProps> = ({
  register, name,
  errorMessage, rows,
  className, label,
  ...props
}) => {
  return (
    <div className=''>
      {label && <label htmlFor="" className='mb-2 block'>{label}</label>}
      <textarea
        rows={rows ?? 6}
        className={
          twMerge(
            'rounded-xl w-full px-4 focus:placeholder-primary border focus:border-primary focus:outline-none py-2',
            'focus:bg-primaryAccent bg-white resize-none',
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
      ></textarea>
      {errorMessage && <p className='text-primary text-xs mt-1'>{errorMessage}</p>}
    </div>
  )
}

export default InputTextArea
