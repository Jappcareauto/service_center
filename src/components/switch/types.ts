import { SwitchProps } from 'antd';

export interface AntdSwitchProps extends SwitchProps {
  onToggle: (value: boolean) => void;
}
