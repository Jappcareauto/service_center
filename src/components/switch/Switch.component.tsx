import { Switch as AntdSwitch } from "antd";
import { FC } from "react";
import { AntdSwitchProps } from "./types";

const Switch: FC<AntdSwitchProps> = ({ onToggle }) => {
  const onChange = (checked: boolean) => {
    onToggle?.(checked);
  };

  return <AntdSwitch onChange={onChange} />;
};

export default Switch;
