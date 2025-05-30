import { Switch as AntdSwitch } from "antd";
import { FC } from "react";
import { AntdSwitchProps } from "./types";

const Switch: FC<AntdSwitchProps> = ({
  onToggle,
}: {
  onToggle?: (value: boolean) => void;
}) => {
  const onChange = (checked: boolean) => {
    onToggle?.(checked);
  };

  return <AntdSwitch onChange={onChange} />;
};

export default Switch;
