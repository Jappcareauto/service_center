import { DrawerProps } from "antd";
import { ReactNode } from "react";

export interface DrawerType extends DrawerProps {
  children?: ReactNode | ReactNode[];
  onNavigate?: () => void;
}
