import { RightModal } from "@/components/modals/RightModal";
import { ModalEventKey } from "@/hooks/ModalEventKey";
import { useModal } from "@/hooks/useModal";
import NotificationComponent from "@/components/notifications/NotificationComponent";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setErrorMessage } from "@/redux/messagesSlice";
import httpClient from "@/services/api-client";
import Loader from "../loader/Loader";

const NotificationView = () => {
  const modalBehavior = useModal({
    eventName: ModalEventKey.NOTIFICATION,
  });

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [notifications, setNotifications] = useState<{ message: string; title: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    console.log("Fetching notifications for user:", user?.id);
    try {
      const response = await httpClient.get("/notification/user/"+user?.id);
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      dispatch(setErrorMessage("Failed to fetch notifications."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (modalBehavior.isOpen && user?.id) {
      fetchNotifications();
    }
  }, [modalBehavior.isOpen, user?.id]);

  return (
    <RightModal
      isOpen={modalBehavior.isOpen}
      close={modalBehavior.close}
      className="pt-[65px] px-6"
    >

      <h2 className="font-medium mb-4">Notifications</h2>
      <div className="overflow-y-auto h-[calc(100vh-65px)]">
        {loading ? (
          <Loader className="h-[calc(100vh-65px)]" />
        ) : notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <NotificationComponent
              key={index}
              message={notification.message}
              title={notification.title}
            />
          ))
        ) : (
          <p>No notifications available.</p>
        )}
      </div>
    </RightModal>
  )
}

export default NotificationView
