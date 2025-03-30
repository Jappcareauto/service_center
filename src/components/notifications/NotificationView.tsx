import { RightModal } from "@/components/modals/RightModal";
import { ModalEventKey } from "@/hooks/ModalEventKey";
import { useModal } from "@/hooks/useModal";
import NotificationComponent from "@/components/notifications/NotificationComponent";

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
