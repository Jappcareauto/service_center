import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import EyeIcon from "../icons/EyeIcon";
import Input, { CustomInputProps } from "./Input";

type OwnProps = CustomInputProps;

const InputPasseord: React.FC<OwnProps> = ({
  ...props
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative text-grey">
      <Input
        type={visible ? "text" : "password"}
        className={
          twMerge(
            "pr-12",
            props.className,
          )
        }
        {...props}
      />
      <EyeIcon className="absolute top-11 right-4" />
    </div>
  )
}

export default InputPasseord
