import { FC, HtmlHTMLAttributes, useEffect, useRef } from "react";
interface Props extends HtmlHTMLAttributes<HTMLDialogElement> {
  isOpen: boolean;
  autoClose?: () => void;
}
const ModalUI: FC<Props> = ({
  isOpen,
  className,
  autoClose,
  children,
  ...props
}) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modalRef = ref.current;
    if (isOpen) {
      modalRef?.showModal();
    }
    return () => {
      modalRef?.close();
    };
  }, [isOpen]);

  const handleClose = () => {
    if (autoClose) {
      autoClose();
    }
  };

  return (
    <dialog
      ref={ref}
      onClose={handleClose}
      className={`  z-50 bg-primaryAccent2 outline active:outline focus:outline m-auto  bg-inherit max-w-xl max-h-screen rounded-xl ${className} `}
      {...props}
    >
      {children}
    </dialog>
  );
};

export default ModalUI;
