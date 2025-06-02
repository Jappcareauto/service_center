import { Modal as ModalComponent } from "antd";
import React from "react";
import { ModalType } from "./types";

const Modal: React.FC<ModalType> = ({
  children,
  open,
  loading,
  onClose,
  ...props
}) => {
  return (
    <>
      <ModalComponent
        closable
        open={open}
        loading={loading}
        destroyOnHidden
        onOk={onClose}
        onCancel={onClose}
        width={window.innerWidth * 0.6}
        centered
        {...props}
      >
        <div>{children}</div>
      </ModalComponent>
    </>
  );
};

export default Modal;
