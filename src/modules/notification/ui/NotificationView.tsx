import { RightModal } from "@/shared/generics/modals/RightModal";
import { ModalEventKey } from "@/shared/helpers/hooks/ModalEventKey";
import { useModal } from "@/shared/helpers/hooks/useModal";
import NotificationComponent from "./components/NotificationComponent";

const NotificationView = () => {
  const modalBehavior = useModal({
    eventName: ModalEventKey.NOTIFICATION,
  });

  return (
    <RightModal
      isOpen={modalBehavior.isOpen}
      close={modalBehavior.close}
      className="pt-[65px] px-6"
    >

      <h2 className="font-medium mb-4">Notifications</h2>
      <NotificationComponent />
    </RightModal>
  )
}

export default NotificationView
