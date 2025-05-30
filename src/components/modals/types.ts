import { ModalProps } from "antd";
import { ReactNode } from "react";

export interface ModalType extends ModalProps {
  children: ReactNode | ReactNode[];
  onNavigate?: () => void;
  onClose?: () => void;
}
